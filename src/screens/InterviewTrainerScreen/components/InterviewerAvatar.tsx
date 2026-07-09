import { useState } from 'react';

interface InterviewerAvatarProps {
  professionId: string;
}

export function InterviewerAvatar({ professionId }: InterviewerAvatarProps) {
  const [hidden, setHidden] = useState(false);
  const [isFallback, setIsFallback] = useState(false);

  if (isFallback) return null;

  return (
    <div className="interview-photo">
      <img
        src={`/art/${professionId}/interview_man.png`}
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
