export type Coursework = {
  name: string;
  repo: string;
};

export type Education = {
  institution: string;
  qualification: string;
  period: string;
  description: string | null;
  coursework: Coursework[];
  logo?: string;
};

export const education: Education[] = [
  {
    institution: "University of Ruhuna",
    qualification: "Bachelor of Computer Science",
    period: "Sep 2025 – Present",
    description:
      "Building a foundation across programming, computer systems, databases, algorithms, software engineering, web development, and related areas of computer science.",
    coursework: [
      {
        name: "C & Data Structures",
        repo: "https://github.com/hasithaea/C-DSA-assignments",
      },
      {
        name: "Object-Oriented Programming with Java",
        repo: "https://github.com/hasithaea/oop-with-java",
      },
      {
        name: "DevOps with Docker",
        repo: "https://github.com/hasithaea/DevOps-with-Docker",
      },
    ],
    logo: "/logos/ruhuna.svg",
  },
  {
    institution: "Ranabima Royal College, Peradeniya",
    qualification: "Secondary Education",
    period: "2016 – 2024",
    description: null,
    coursework: [],
    logo: "/logos/ranabima.svg",
  },
];