import { SOFTWARE_ENGINEER_INTERVIEW_QUESTIONS } from '@/professions/software_engineer/interview/questions';
import { DATA_ANALYST_INTERVIEW_QUESTIONS } from '@/professions/data_analyst/interview/questions';
import { CYBERSECURITY_INTERVIEW_QUESTIONS } from '@/professions/cybersecurity/interview/questions';

const QUESTION_MAP: Record<string, string[]> = {
  'software_engineer': SOFTWARE_ENGINEER_INTERVIEW_QUESTIONS,
  'data_analyst': DATA_ANALYST_INTERVIEW_QUESTIONS,
  'cybersecurity': CYBERSECURITY_INTERVIEW_QUESTIONS,
};

export function getInterviewQuestions(professionId: string): string[] {
  return QUESTION_MAP[professionId] || QUESTION_MAP['software_engineer'];
}
