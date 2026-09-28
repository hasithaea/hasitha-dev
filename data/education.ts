export type Coursework = {
  name: string;
  repo: string | null;
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
        name: "Data Structures and Algorithms",
        repo: "https://github.com/hasithaea/C-DSA-assignments",
      },
      {
        name: "Object Oriented Programming",
        repo: "https://github.com/hasithaea/oop-with-java",
      },
      {
        name: "Database Management Systems",
        repo: "https://github.com/hasithaea/sql-learning",
      },
      {
        name: "MATLAB",
        repo: "https://github.com/hasithaea/matlab-learning",
      },
      { 
        name: "Operating Systems",
        repo: null,
      },
      { 
        name: "Data Communication & Computer Networks",
        repo: null,
      },
      { 
        name: "Software Engineering",
        repo: null 
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