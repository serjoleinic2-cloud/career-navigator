export interface CareerOption {
  id: string;
  title: string;
  steps: string[];
}

export const CAREER_DATA: CareerOption[] = [
  {
    id: "frontend",
    title: "Frontend Developer",
    steps: [
      "HTML/CSS basics",
      "JavaScript fundamentals",
      "React learning",
      "Projects",
      "Portfolio"
    ]
  },
  {
    id: "backend",
    title: "Backend Developer",
    steps: [
      "Programming basics",
      "Database fundamentals",
      "API design",
      "Server architecture",
      "Deployment"
    ]
  },
  {
    id: "fullstack",
    title: "Full Stack Developer",
    steps: [
      "Frontend basics",
      "Backend basics",
      "Database integration",
      "Full project",
      "Production deploy"
    ]
  }
];
