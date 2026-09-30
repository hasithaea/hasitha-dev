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
      "Dockerized a Node.js/Express app and built the pipeline around it. Every push to main builds the image, pushes it to Docker Hub, and triggers a redeploy on Render.",
    stack: ["Docker", "GitHub Actions", "Docker Hub", "Render", "Node.js"],
    repo: "https://github.com/hasithaea/DevOps-with-Docker/tree/main/express-ci-cd-demo",
    live: "https://ci-cd-demo-of6g.onrender.com",
  },
  {
    title: "Majesty",
    summary:
      "An e-commerce clothing website developed as a team project for the Internet Services and Web Development course at the University of Ruhuna.",
    stack: ["HTML", "CSS", "JavaScript", "PHP", "Docker"],
    repo: "https://github.com/hasithaea/Majesty_project",
    live: null,
  },
  {
    title: "80% Attendance Tracker",
    summary:
      "A mobile app UI design that helps students track attendance and predict how many classes they can miss while staying above 80%. Built in under 2 hours for a UI/UX poster challenge.",
    stack: ["Figma", "Canva"],
    repo: "https://github.com/hasithaea/80-attendance-tracker-ui",
    live: null,
  },
];