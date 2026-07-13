import { useState } from 'react';

// NOTE (2026-07-13): there's only one interviewer photo in the app — Serj
// decided to use a single shared image for every profession instead of a
// separate one per profession (the other two professions previously had
// placeholder copies of this same photo). The `professionId` prop is kept
// (still used for other art in this screen/elsewhere) but is intentionally
// not used to build this particular path anymore.
const SHARED_INTERVIEWER_IMAGE = '/art/software_engineer/interview_man.jpg';

interface InterviewerAvatarProps {
  professionId: string;
}

export function InterviewerAvatar({ professionId: _professionId }: InterviewerAvatarProps) {
  const [hidden, setHidden] = useState(false);
  const [isFallback, setIsFallback] = useState(false);

  if (isFallback) return null;

  return (
    <div className="interview-photo">
      <img
        src={SHARED_INTERVIEWER_IMAGE}
        alt="Interviewer"
        onError={(e) => {
          if (!hidden) {
            e.currentTarget.style.display = 'none';
            setHidden(true);
            setIsFallback(true);
          }
        }}
      />
    </div>
  );
}
