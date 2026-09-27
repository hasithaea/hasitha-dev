export type SkillGroup = {
  group: string;
  items: string[];
};

export const skills: SkillGroup[] = [
  { group: "Languages", items: ["C", "Python", "Java", "JavaScript", "TypeScript", "PHP"] },
  { group: "Web", items: ["HTML", "CSS", "React", "Next.js", "Tailwind CSS"] },
  { group: "DevOps", items: ["Docker", "Docker Compose", "GitHub Actions", "Linux", "Bash"] },
  { group: "Cloud & Hosting", items: ["Azure", "Vercel", "Render", "Supabase"] },
  { group: "Data & Tools", items: ["MySQL", "Git", "GitHub", "Figma", "LaTeX"] },
];