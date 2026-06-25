import './JourneyHeader.css';

type Props = {
  chapterTitle: string;
  readiness: string;
  confidence: string;
};

export function JourneyHeader({ chapterTitle, readiness, confidence }: Props) {
  return (
    <header className="journey-header">
      <div className="journey-header__menu">☰</div>
      <div className="journey-header__title">{chapterTitle || 'Your Journey'}</div>
      <div className="journey-header__badges">
        <span className="journey-header__badge">{readiness}</span>
        <span className="journey-header__badge">{confidence}</span>
      </div>
    </header>
  );
}
