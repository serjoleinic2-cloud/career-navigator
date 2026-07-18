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
  /** True if this profession is fully purchased (or part of the all-5
   * bundle). False just means "not yet purchased" — it does NOT mean
   * inaccessible: every profession's first FREE_CHAPTER_LIMIT chapters
   * are free regardless of this flag. Used by ProfileScreen to show a
   * lock badge on chapters beyond the free tier, not to hide the
   * profession from the switcher entirely. */
  owned: boolean;
};

/**
 * Built for ProfileScreen's profession switcher: one entry per REGISTERED
 * profession (not just owned ones), with how far along the user is in
 * each (if ever started) and whether it's the one currently open.
 *
 * BUGFIX (2026-07-19): this used to filter down to only professions in
 * getOwnedProfessionIds() — which, before real billing, was a stub that
 * returned every registered profession (so the switcher always showed
 * all of them), and after real billing correctly returns only purchased
 * ones. That flip silently broke the entire free-tier discovery flow: a
 * user who has bought nothing yet has zero "owned" professions, so this
 * list came back near-empty and ProfileScreen's `ownedProfessions.length
 * > 1` check hid the switcher completely — there was no way to even see,
 * let alone try, any profession other than the one picked during
 * onboarding. Free chapters exist specifically so people can sample a
 * profession before buying it; hiding the switcher defeated that
 * entirely. Now returns every registered profession, marked with `owned`
 * so the UI can still show which are fully unlocked vs. free-preview only
 * — access itself is still correctly enforced deeper in the stack
 * (checkNodeAccess/setActiveChapter/advanceChapter), this summary is only
 * about what to *list*.
 */
export function getOwnedProfessionsSummary(activeProfessionId: string | null): ProfessionProgressSummary[] {
  const all = getAllProfessions();
  const allIds = all.map(p => p.id);
  const ownedIds = getOwnedProfessionIds(allIds);

  return all.map(profession => {
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
      owned: ownedIds.includes(profession.id),
    };
  });
}
