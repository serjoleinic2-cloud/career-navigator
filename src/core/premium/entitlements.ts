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
 * СТАТУС (2026-07-13): монетизация ещё не реализована (Serj: "пока не делаю
 * premium"). Поэтому сейчас isProfessionOwned() возвращает true для всех
 * зарегистрированных профессий — эффективно ничего не меняется в поведении
 * приложения. Это специально сделано так, чтобы:
 *   1) структура была готова заранее и не пришлось переделывать формат
 *      сохранений/бэкапов позже;
 *   2) backup_service.ts уже сейчас физически не включает ключ entitlements
 *      в экспортируемый файл (см. ENTITLEMENTS_KEY ниже и комментарий там).
 *
 * КОГДА БУДЕТ ВНЕДРЯТЬСЯ ПОКУПКА (Google Play Billing):
 *   - Источником истины должен быть Billing Library (queryPurchases /
 *     восстановление покупок по Google-аккаунту), НЕ самодельный ключ,
 *     привязанный к инсталляции — такой ключ пропадает при удалении
 *     приложения, даже если покупка совершена честно.
 *   - Локальный ключ ниже (ENTITLEMENTS_KEY) в этом случае становится
 *     ТОЛЬКО оффлайн-кэшем результата Billing-проверки, а не истиной самой
 *     по себе. При каждом старте с сетью — кэш должен обновляться из Billing.
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
 * Возвращает true, если профессия доступна пользователю.
 *
 * TEMP (пока нет premium/Billing): всегда true для любой зарегистрированной
 * профессии — намеренная no-op заглушка, см. комментарий в шапке файла.
 */
export function isProfessionOwned(_professionId: string): boolean {
  return true;
}

/** Список доступных профессий. Заглушка: всё, что зарегистрировано. */
export function getOwnedProfessionIds(allRegisteredIds: string[]): string[] {
  const cached = readCache();
  if (cached) return cached.ownedProfessionIds;
  return allRegisteredIds;
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
