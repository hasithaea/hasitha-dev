export type Project = {
    title: string;
    summary: string;
    stack: string[]; 
    repo: string;
    live: string | null;
};

export const projects: Project[] = [
  {
    title: "hasitha.dev",
    summary:
      "My personal website and portfolio, built to document my projects, learning, technical interests, and development journey.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    repo: "https://github.com/hasithaea/hasitha-dev",
    live: "https://hasitha.dev",
  },
  {
    title: "Express CI/CD Demo",
    summary:
      "A Node.js/Express app with a full GitHub Actions pipeline — build, test, and deploy stages running on every push.",
    stack: ["Node.js", "Express", "Docker", "GitHub Actions"],
    repo: "https://github.com/hasithaea/DevOps-with-Docker-express-cicd",
    live: null,
  },
  {
    title: "Majesty",
    summary:
      "An e-commerce clothing website developed as a team project for the Internet Services and Web Development course at the University of Ruhuna.",
    stack: ["HTML", "CSS", "JavaScript", "PHP", "Docker"],
    repo: "https://github.com/hasithaea/Majesty_project",
    live: null,
  },
];