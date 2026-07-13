// BUGFIX (2026-07-13): the previous version of this file exported
// `InterviewQuestion[]` (id/text/category/difficulty/expectedDuration
// objects) importing a type — `@/core/interview/interview_question` —
// that doesn't exist anywhere in the codebase. That broke `tsc --noEmit`,
// and even if the type had existed, `interview_question_loader.ts` /
// `InterviewTrainerScreen` only ever read `string[]` (see
// SOFTWARE_ENGINEER_INTERVIEW_QUESTIONS / DATA_ANALYST_INTERVIEW_QUESTIONS
// for the shape actually consumed). Because 'cybersecurity' was never
// registered in `QUESTION_MAP`, the trainer silently fell back to the
// Software Engineer questions for Cybersecurity users. This file replaces
// it with the same plain string[] shape, and is now registered in
// `interview_question_loader.ts`.
export const CYBERSECURITY_INTERVIEW_QUESTIONS: string[] = [
  "Tell me about yourself.",
  "Why do you want to work in cybersecurity?",
  "Walk me through how you'd investigate a suspicious login alert.",
  "Explain the OSI model and where a firewall operates in it.",
  "Tell me about a time you found or fixed a security issue in a lab, CTF, or coursework project.",
  "How do you stay current with new vulnerabilities and threats?",
  "Describe your incident response process, step by step.",
  "Tell me about a time you had to explain a technical risk to a non-technical audience.",
  "What would you do if you were asked to do something outside your authorization?",
  "Do you have any questions for us?",
];
