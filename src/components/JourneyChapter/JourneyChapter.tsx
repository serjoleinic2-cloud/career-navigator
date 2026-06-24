import { JourneyNodeView } from '@/components/JourneyNodeView/JourneyNodeView';
import type { JourneyChapter as ChapterType } from '@/core/career_journey_model';
import './JourneyChapter.css';

interface JourneyChapterProps {
  section: ChapterType;
}

export function JourneyChapter({ section }: JourneyChapterProps) {
  return (
    <div className="journey-chapter">
      <div className="journey-chapter__title">{section.chapter}</div>
      <div className="journey-chapter__nodes">
        {section.nodes.map((node) => (
          <JourneyNodeView key={node.id} node={node} />
        ))}
      </div>
    </div>
  );
}
