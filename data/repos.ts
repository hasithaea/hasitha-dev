import type { TagSlug } from "./tags";

// Repos that are not university coursework.
export type Repo = {
  name: string;
  repo: string;
  description: string;
  tags: TagSlug[];
};

export const repos: Repo[] = [
  {
    name: "DevOps with Docker",
    repo: "https://github.com/hasithaea/DevOps-with-Docker",
    description:
      "Exercises from the University of Helsinki DevOps with Docker course, covering Docker basics, Docker Compose, and security and optimization.",
    tags: ["docker", "docker-compose"],
  },
  {
    name: "DevOps with Docker: course applications",
    repo: "https://github.com/hasithaea/DevOps-with-Docker-materials-applications",
    description:
      "Course applications from University of Helsinki's DevOps with Docker, containerized with my own Dockerfiles.",
    tags: ["docker"],
  },
];
