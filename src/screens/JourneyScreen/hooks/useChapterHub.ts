import { useState, useCallback } from 'react';

export type HubView = 'hub' | 'chapter' | 'chapterComplete';

interface UseChapterHubReturn {
  view: HubView;
  selectedChapter: string | null;
  selectChapter: (chapterId: string) => void;
  backToHub: () => void;
  completeChapter: () => void;
  dismissComplete: () => void;
}

export function useChapterHub(): UseChapterHubReturn {
  const [view, setView] = useState<HubView>('hub');
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null);

  const selectChapter = useCallback((chapterId: string) => {
    setSelectedChapter(chapterId);
    setView('chapter');
  }, []);

  const backToHub = useCallback(() => {
    setSelectedChapter(null);
    setView('hub');
  }, []);

  const completeChapter = useCallback(() => {
    setView('chapterComplete');
  }, []);

  const dismissComplete = useCallback(() => {
    setSelectedChapter(null);
    setView('hub');
  }, []);

  return { view, selectedChapter, selectChapter, backToHub, completeChapter, dismissComplete };
}
