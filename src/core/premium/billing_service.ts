/**
 * billing_service.ts — единственный файл, который обращается к
 * capacitor-plugin-cdv-purchase (`store`) напрямую. Ни один другой файл
 * в приложении не должен импортировать `store` — только функции отсюда.
 *
 * Архитектура (см. Доп материалы/Создание оплаты — код и руководство.md):
 *
 *   Google Play (источник истины)
 *           ↓
 *   billing_service.ts    ← этот файл
 *           ↓
 *   entitlements.ts        ← кэш "какие профессии куплены" + isProfessionOwned()
 *           ↓
 *   premium_state.ts / ui_state_mapper.ts  ← применяет к UI (locked chapters)
 *
 * Все продукты — NON_CONSUMABLE (куплено один раз = навсегда), не подписки:
 * покупка профессии не "истекает", поэтому здесь нет 3-дневных штампов
 * из руководства (те были для подписок Neyra/Moodos).
 */

import {
  ALL_PROFESSION_PRODUCT_IDS,
  BUNDLE_PRODUCT_ID,
  FALLBACK_PRICES,
  PROFESSION_TO_PRODUCT_ID,
  type BillingProductId,
} from './billing_products';
import { syncEntitlementsFromBilling, getOwnedProfessionIds } from './entitlements';
import { emit } from '../events/system_event_bus';

// store/ProductType/Platform типизированы `any` намеренно: плагин грузится
// только на нативной платформе (Android), а на вебе/в dev-превью его вообще
// нет в бандле — см. loadStoreModule() ниже.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let store: any = null;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let ProductType: any = null;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let Platform: any = null;

let storeReady = false;
let storeLoadFailed = false;

const ALL_PRODUCT_IDS: BillingProductId[] = [...ALL_PROFESSION_PRODUCT_IDS, BUNDLE_PRODUCT_ID];

export function isStoreReady(): boolean {
  return storeReady;
}

export function isNativeBillingAvailable(): boolean {
  return storeReady && !storeLoadFailed;
}

/** professionId -> registered product id, включая случай "владеет бандлом". */
function productIdForProfession(professionId: string): BillingProductId | undefined {
  return PROFESSION_TO_PRODUCT_ID[professionId];
}

async function loadStoreModule(): Promise<boolean> {
  try {
    // Динамический импорт: на вебе/без Android-платформы этот пакет либо
    // отсутствует, либо не должен инициализировать нативный billing client.
    const mod = await import('capacitor-plugin-cdv-purchase');
    store = mod.store;
    ProductType = mod.ProductType;
    Platform = mod.Platform;
    return true;
  } catch (e) {
    console.warn('[billing] capacitor-plugin-cdv-purchase not available:', e);
    return false;
  }
}

function ownedProductIds(): Set<string> {
    if (!store || !storeReady) return new Set();
    try {
      return new Set(
        ALL_PRODUCT_IDS.filter(id => {
          const p = store.get(id, Platform.GOOGLE_PLAY);
          return !!p && store.owned(p);
        })
      );
    } catch (e) {
      console.warn('[billing] ownedProductIds failed:', e);
      return new Set();
    }
}

/** Пересчитывает entitlements.ts из текущего состояния store и сохраняет кэш. */
function syncEntitlementsFromStore(): void {
  const owned = ownedProductIds();
  const ownsBundle = owned.has(BUNDLE_PRODUCT_ID);
  const ownedProfessionIds = Object.entries(PROFESSION_TO_PRODUCT_ID)
    .filter(([, productId]) => ownsBundle || owned.has(productId))
    .map(([professionId]) => professionId);

  syncEntitlementsFromBilling(ownedProfessionIds);
  emit('STATE_UPDATED', { source: 'billing' });
}

export async function initBilling(): Promise<void> {
  // Защита от двойного вызова (например HMR / повторный рендер App.tsx).
  if ((window as any)._billingInitialized) return;
  (window as any)._billingInitialized = true;

  const loaded = await loadStoreModule();
  if (!loaded) {
    storeLoadFailed = true;
    return; // Веб-превью / платформа без billing — работаем на офлайн-кэше entitlements.
  }

  store.register(
    ALL_PRODUCT_IDS.map((id: string) => ({
      id,
      type: ProductType.NON_CONSUMABLE,
      platform: Platform.GOOGLE_PLAY,
    }))
  );

  store.when()
    .approved((transaction: any) => {
      // approved = Google подтвердил покупку.
      try {
        syncEntitlementsFromStore();
      } catch (e) {
        console.error('[billing] syncEntitlementsFromStore failed in approved():', e);
      }
      transaction.finish(); // ОБЯЗАТЕЛЬНО — иначе approved будет срабатывать снова.
    })
    .verified((receipt: any) => {
      try {
        syncEntitlementsFromStore();
      } catch (e) {
        console.error('[billing] syncEntitlementsFromStore failed in verified():', e);
      }
      receipt.finish();
    });

  store.error((err: unknown) => {
    console.error('[billing] error:', err);
  });

  try {
    await store.initialize([Platform.GOOGLE_PLAY]);
    storeReady = true;
    await store.update();
    syncEntitlementsFromStore();
  } catch (err) {
    console.error('[billing] init failed:', err);
    storeLoadFailed = true;
  }
}

/** Локализованная цена из Google Play, либо fallback пока store не готов. */
export function getDisplayPrice(productId: BillingProductId): string {
  try {
    if (store && storeReady) {
      const product = store.get(productId, Platform.GOOGLE_PLAY);
      const offer = product?.getOffer?.();
      const price = offer?.pricingPhases?.[0]?.price;
      if (price) return price;
    }
  } catch (e) {
    console.warn('[billing] getDisplayPrice failed:', e);
  }
  return FALLBACK_PRICES[productId];
}

async function order(productId: BillingProductId): Promise<{ ok: boolean; error?: string }> {
  if (!store || !storeReady) {
    return { ok: false, error: 'Платёжная система загружается. Попробуйте через несколько секунд.' };
  }
  const product = store.get(productId, Platform.GOOGLE_PLAY);
  const offer = product?.getOffer?.();
  if (!offer) {
    return { ok: false, error: 'Товар недоступен. Проверьте подключение к интернету.' };
  }
  const error = await offer.order();
  if (error) {
    console.error('[billing] order error:', error);
    return { ok: false, error: error.message ?? 'Покупка не удалась.' };
  }
  return { ok: true };
}

/** Купить одну профессию за $9.99. */
export async function buyProfession(professionId: string): Promise<{ ok: boolean; error?: string }> {
  const productId = productIdForProfession(professionId);
  if (!productId) return { ok: false, error: 'Unknown profession' };
  return order(productId);
}

/** Купить бандл из всех 5 профессий (по $4.99 за каждую). */
export async function buyAllProfessionsBundle(): Promise<{ ok: boolean; error?: string }> {
  return order(BUNDLE_PRODUCT_ID);
}

/** Кнопка "Восстановить покупки" в настройках — обязательна по правилам Google Play. */
export async function restorePurchases(): Promise<{ ok: boolean; error?: string }> {
  if (!store || !storeReady) {
    return { ok: false, error: 'Платёжная система ещё загружается.' };
  }
  try {
    await store.restorePurchases();
    syncEntitlementsFromStore();
    return { ok: true };
  } catch (e) {
    console.warn('[billing] restorePurchases failed:', e);
    return { ok: false, error: 'Не удалось восстановить покупки.' };
  }
}

export { getOwnedProfessionIds };
