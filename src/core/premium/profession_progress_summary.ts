import { getAllProfessions } from '@/professions/profession_registry';
import { getOwnedProfessionIds } from './entitlements';
import { loadRuntimeForProfession } from '../persistence/runtime_persistence';

export type ProfessionProgressSummary = {
  professionId: string;
  title: string;
  /** 0-100. 0 if the user owns this profession but never started it. */
  percent: number;
  /** True if there's at least a saved runtime for this profession (even
   * at 0% — e.g. right after switching to it once). */
  started: boolean;
  isActive: boolean;
};

/**
 * Built for ProfileScreen's profession switcher: one entry per profession
 * this user owns, with how far along they are in each and whether it's
 * the one currently open. Professions never started show 0% instead of
 * being omitted, so the user can see everything they own in one place.
 */
export function getOwnedProfessionsSummary(activeProfessionId: string | null): ProfessionProgressSummary[] {
  const all = getAllProfessions();
  const allIds = all.map(p => p.id);
  const ownedIds = getOwnedProfessionIds(allIds);

  return all
    .filter(p => ownedIds.includes(p.id))
    .map(profession => {
      const runtime = loadRuntimeForProfession(profession.id);
      const percent = runtime
        ? Math.round(
            profession.chapters.reduce((sum, ch) => sum + (runtime.chapterProgress[ch.id] ?? 0), 0) /
              Math.max(1, profession.chapters.length)
          )
        : 0;
      return {
        professionId: profession.id,
        title: profession.title,
        percent,
        started: !!runtime,
        isActive: profession.id === activeProfessionId,
      };
    });
}
