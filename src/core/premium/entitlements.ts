/**
 * Entitlements — "какие профессии куплены/доступны этому пользователю".
 *
 * КЛЮЧЕВОЕ ОТЛИЧИЕ от прогресса (JourneyRuntimeState / runtime_persistence.ts):
 * entitlements — это НЕ данные, которые можно свободно переносить между
 * пользователями через экспорт/бэкап прогресса. Прогресс отвечает на вопрос
 * "что пройдено", entitlements — на вопрос "что вообще разрешено открывать".
 * Смешивание этих двух вещей в одном файле сохранения — то, из-за чего
 * загрузка чужого save.json могла бы "разблокировать" чужую профессию.
 *
 * СТАТУС (2026-07-16): монетизация подключена (Google Play Billing через
 * capacitor-plugin-cdv-purchase, см. billing_service.ts). Источник истины —
 * Billing Library; ключ ниже (ENTITLEMENTS_KEY) — ТОЛЬКО оффлайн-кэш
 * последнего известного результата Billing-проверки, обновляемый при каждом
 * старте с сетью через store.update()/restorePurchases() (см.
 * billing_service.ts::syncEntitlementsFromStore). Это специально устроено
 * так, чтобы:
 *   1) юзер с уже купленной профессией видел её разблокированной сразу при
 *      холодном старте офлайн, ещё до ответа Google Play;
 *   2) backup_service.ts физически не включает ключ entitlements в
 *      экспортируемый файл (см. ENTITLEMENTS_KEY ниже и комментарий там) —
 *      save-файл, перенесённый на другое устройство/аккаунт, не может
 *      "разблокировать" чужую покупку.
 *
 * Первые 3 главы (FREE_CHAPTER_LIMIT, см. premium_state.ts) любой профессии
 * всегда доступны бесплатно независимо от entitlements — см. checkAccess()
 * в premium_gate.ts.
 */

const ENTITLEMENTS_KEY = 'career-navigator.entitlements.v1';

export type EntitlementsSnapshot = {
  /** ids профессий, доступных этому пользователю. */
  ownedProfessionIds: string[];
  /** Когда кэш последний раз сверялся с источником истины (Billing). */
  lastSyncedAt: number;
};

function readCache(): EntitlementsSnapshot | null {
  try {
    const raw = localStorage.getItem(ENTITLEMENTS_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.ownedProfessionIds)) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeCache(snapshot: EntitlementsSnapshot): void {
  try {
    localStorage.setItem(ENTITLEMENTS_KEY, JSON.stringify(snapshot));
  } catch (e) {
    console.warn('[entitlements] failed to persist cache:', e);
  }
}

/**
 * Возвращает true, если профессия доступна пользователю (полностью, все
 * главы). Первые FREE_CHAPTER_LIMIT глав любой профессии доступны всегда —
 * это НЕ проверяется здесь, см. checkAccess()/createPremiumState() в
 * premium_engine.ts/premium_state.ts, которые используют этот флаг только
 * для решения "открывать ли главы после бесплатного лимита".
 */
export function isProfessionOwned(professionId: string): boolean {
  const cached = readCache();
  if (!cached) return false;
  return cached.ownedProfessionIds.includes(professionId);
}

/**
 * Список купленных профессий. Если передан allRegisteredIds и кэша ещё нет
 * (первый холодный запуск до первой синхронизации с Billing) — ничего не
 * считается купленным, чтобы не выдавать бесплатный премиум до реального
 * ответа Google Play.
 */
export function getOwnedProfessionIds(allRegisteredIds?: string[]): string[] {
  const cached = readCache();
  if (cached) return cached.ownedProfessionIds;
  void allRegisteredIds;
  return [];
}

/**
 * Точка подключения будущей Billing-проверки: перезаписывает локальный
 * кэш entitlements результатом реального запроса к Google Play.
 * Сейчас нигде не вызывается — задел на будущее.
 */
export function syncEntitlementsFromBilling(ownedProfessionIds: string[]): void {
  writeCache({ ownedProfessionIds, lastSyncedAt: Date.now() });
}

export { ENTITLEMENTS_KEY };
