export type Certification = {
  name: string;
  issuer: string;
  detail: string;
  description: string;
  link: string | null;
  linkText: string | null;
};

export const certifications: Certification[] = [
  {
    name: "DevOps with Docker",
    issuer: "University of Helsinki",
    detail: "3 ECTS · Completed June 2026",
    description:
      "Completed all three modules covering Docker Basics, Docker Compose, and Security & Optimization.",
    link: null,
    linkText: null,
  },
  {
    name: "Microsoft Azure Fundamentals & Cloud Engineering",
    issuer: "NextGen Campus",
    detail: "Issued April 2026",
    description:
      "Additional learning focused on Microsoft Azure and cloud computing.",
    link: null,
    linkText: null,
  },
  {
    name: "Python for Beginners",
    issuer: "University of Moratuwa",
    detail: "Issued April 2026",
    description:
      "Foundational Python programming and problem-solving.",
    link: null,
    linkText: null,
  },
  {
    name: "ReactJS for Beginners",
    issuer: "Simplilearn",
    detail: "Issued May 2026",
    description:
      "Introductory learning in React.js and JavaScript.",
    link: null,
    linkText: null,
  },
  {
    name: "API Beginner Learning Path",
    issuer: "Postman",
    detail: "Issued April 2026",
    description:
      "Foundational API concepts and API testing using Postman.",
    link: null,
    linkText: null,
  },
];