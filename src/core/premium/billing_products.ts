/**
 * billing_products.ts — единственное место, где перечислены product ID
 * Google Play и то, какую профессию/бандл каждый из них открывает.
 *
 * Продукты — NON_CONSUMABLE (одноразовая покупка "навсегда", не подписка):
 * пользователь покупает доступ к профессии один раз и владеет им, пока
 * привязан тот же Google-аккаунт (восстанавливается через restorePurchases()).
 *
 * Цены здесь — только то, что показывается в UI ДО того, как store вернёт
 * реальную локализованную цену от Google Play (offer.pricingPhases). Реальная
 * цена/валюта всегда берётся из store, см. getDisplayPrice() в billing_service.ts.
 * Эти значения — лишь fallback для первого рендера/офлайн.
 */

export type ProfessionProductId =
  | 'profession_software_engineer'
  | 'profession_data_analyst'
  | 'profession_cybersecurity'
  | 'profession_ai_ml_engineer'
  | 'profession_product_manager';

export const BUNDLE_PRODUCT_ID = 'profession_bundle_all' as const;

export type BillingProductId = ProfessionProductId | typeof BUNDLE_PRODUCT_ID;

/** professionId (из profession_registry) -> Google Play product ID. */
export const PROFESSION_TO_PRODUCT_ID: Record<string, ProfessionProductId> = {
  software_engineer: 'profession_software_engineer',
  data_analyst: 'profession_data_analyst',
  cybersecurity: 'profession_cybersecurity',
  ai_ml_engineer: 'profession_ai_ml_engineer',
  product_manager: 'profession_product_manager',
};

export const ALL_PROFESSION_PRODUCT_IDS: ProfessionProductId[] =
  Object.values(PROFESSION_TO_PRODUCT_ID);

/** Fallback-цены для первого рендера, пока store не загрузился. */
export const FALLBACK_PRICES: Record<BillingProductId, string> = {
  profession_software_engineer: '$9.99',
  profession_data_analyst: '$9.99',
  profession_cybersecurity: '$9.99',
  profession_ai_ml_engineer: '$9.99',
  profession_product_manager: '$9.99',
  profession_bundle_all: '$24.95',
};

export const SINGLE_PROFESSION_PRICE_USD = 9.99;
export const BUNDLE_PROFESSION_UNIT_PRICE_USD = 4.99;
export const BUNDLE_TOTAL_PRICE_USD =
  BUNDLE_PROFESSION_UNIT_PRICE_USD * ALL_PROFESSION_PRODUCT_IDS.length; // 24.95

/** "Экономия" бандла относительно покупки всех профессий по отдельности. */
export function getBundleSavingsUsd(): number {
  const buyAllSeparately = SINGLE_PROFESSION_PRICE_USD * ALL_PROFESSION_PRODUCT_IDS.length;
  return Math.round((buyAllSeparately - BUNDLE_TOTAL_PRICE_USD) * 100) / 100;
}

export function getProductIdForProfession(professionId: string): ProfessionProductId | undefined {
  return PROFESSION_TO_PRODUCT_ID[professionId];
}
