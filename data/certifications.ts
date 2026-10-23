export type Certification = {
  name: string;
  issuer: string;
  detail: string;
  description: string;
  links: { label: string; url: string }[] | null;
  images: { src: string; caption: string }[] | null;
  featured: boolean;
};

export const certifications: Certification[] = [
  {
    name: "DevOps with Docker",
    issuer: "University of Helsinki",
    detail: "Completed June 2026",
    description:
      "Completed all three modules covering Docker Basics, Docker Compose, and Security & Optimization. 3 ECTS.",
    links: [
      { label: "Verify Basics", url: "https://courses.mooc.fi/certificates/validate/qr67fa7ar2pjwtq" },
      { label: "Verify Compose", url: "https://courses.mooc.fi/certificates/validate/9qn83kjkhpkeatv" },
      { label: "Verify Security", url: "https://courses.mooc.fi/certificates/validate/7z25595n325qzbf" },
    ],
    images: [
      { src: "/certificates/Docker-Basics.png", caption: "Docker Basics" },
      { src: "/certificates/Docker-compose.png", caption: "Docker Compose" },
      { src: "/certificates/Security-and-optimization.png", caption: "Security and Optimization" },
    ],
    featured: true,
  },
  {
    name: "Microsoft Azure Fundamentals & Cloud Engineering",
    issuer: "NextGen Campus",
    detail: "Issued April 2026",
    description:
      "Hands on workshop focused on Microsoft Azure and cloud computing.",
    links: [
      { label: "Verify", url:"https://verify.nextgencampus.lk" },
    ],
    images: [
      { src: "/certificates/Microsoft-Azure-Fundamentals.png", caption:"Certificate of completion"},
    ],
    featured: true,
  },
  {
    name: "Python for Beginners",
    issuer: "University of Moratuwa",
    detail: "Issued April 2026",
    description:
      "Foundational Python programming and problem solving.",
    links: [
      { label:"Verify", url: "https://open.uom.lk/lms/mod/customcert/verify_certificate.php"},
    ],
    images: [
      { src: "/certificates/Python-for-Beginners.png", caption: "Certificate of completion"},
    ],
    featured: false,
  },
  {
    name: "ReactJS for Beginners",
    issuer: "Simplilearn",
    detail: "Issued May 2026",
    description:
      "Introductory learning in React.js and JavaScript.",
    links: [
      { label:"Verify", url: "https://simpli-web.app.link/e/zj42XLc2W2b"},
    ],
    images: [
      { src: "/certificates/ReactJS-for-Beginners.png", caption:"Certificate of completion"},
    ],
    featured: false,
  },
  {
    name: "API Beginner Learning Path",
    issuer: "Postman",
    detail: "Issued April 2026",
    description:
      "Foundational API concepts and API testing using Postman.",
    links: [
      { label:"Verify", url: "https://verify.skilljar.com/c/qgcwubc6p8qd"},
    ],
    images: [
      { src: "/certificates/API-Beginner-Learning-Path.png", caption:"Certificate of completion"},
    ],
    featured: false,
  },
    {
    name: "Capture The Flag (CTF) - Introduction to Cybersecurity",
    issuer: "VULNHAT",
    detail: "Issued June 2026",
    description:
      "Introductory cybersecurity and CTF workshop organized by CSSC, University of Ruhuna, with VULNHAT.",
    links: null,
    images: [
      { src: "/certificates/Introduction-to-Cybersecurity.png", caption:"Certificate of participation"},
    ],
    featured: false,
  },
];