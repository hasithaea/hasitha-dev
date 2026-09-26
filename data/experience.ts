export type Experience = {
    role: string;
    company: string;
    period: string;
    location: string;
    description: string;
    points: string[];
};

export const experience: Experience[] = [
  {
    role: "Internship Trainee",
    company: "People's Bank Sri Lanka",
    period: "Sep 2024 – Mar 2025",
    location: "Kandy, Sri Lanka",
    description:
      "Worked in a banking environment, performing cashier operations using the bank's core banking system and gaining exposure to live account and transaction management.",
    points: [
      "Processed customer transactions using the bank's core banking system",
      "Gained exposure to account and transaction records in a live banking environment",
      "Developed attention to detail, customer interaction, and problem-solving skills",
    ],
  },
];