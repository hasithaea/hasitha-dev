export type Area = "languages" | "web" | "devops" | "cloud" | "data";

export interface Tag {
  label: string;
  area: Area;
  learning?: boolean;
}

export const tags = {
  // Languages
  javascript: { label: "JavaScript", area: "languages" },
  typescript: { label: "TypeScript", area: "languages" },
  python: { label: "Python", area: "languages" },
  php: { label: "PHP", area: "languages" },
  c: { label: "C", area: "languages" },
  java: { label: "Java", area: "languages" },

  // Web
  "html-css": { label: "HTML/CSS", area: "web" },
  react: { label: "React", area: "web" },
  nextjs: { label: "Next.js", area: "web" },
  tailwindcss: { label: "Tailwind CSS", area: "web" },

  // DevOps
  docker: { label: "Docker", area: "devops" },
  "docker-compose": { label: "Docker Compose", area: "devops" },
  "github-actions": { label: "GitHub Actions", area: "devops" },
  render: { label: "Render", area: "devops" },
  linux: { label: "Linux", area: "devops" },
  bash: { label: "Bash", area: "devops" },

  // Cloud & hosting
  azure: { label: "Azure", area: "cloud", learning: true },
  vercel: { label: "Vercel", area: "cloud" },
  supabase: { label: "Supabase", area: "cloud" },

  // Data & tools
  mysql: { label: "MySQL", area: "data" },
  matlab: { label: "MATLAB", area: "data" },
  postman: { label: "Postman", area: "data" },
  figma: { label: "Figma", area: "data" },
} as const satisfies Record<string, Tag>;

export type TagSlug = keyof typeof tags;

export const areaOrder: Area[] = [
  "languages",
  "web",
  "devops",
  "cloud",
  "data",
];

export const areaLabels: Record<Area, string> = {
  languages: "Languages",
  web: "Web",
  devops: "DevOps",
  cloud: "Cloud & hosting",
  data: "Data & tools",
};