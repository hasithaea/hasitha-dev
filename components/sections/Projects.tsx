import SectionHeading from "@/components/SectionHeading";
import ProjectCard from "@/components/sections/ProjectCard";
import { projects } from "@/data/projects";

export default function Projects() {
  return (
    <section id="projects" className="scroll-mt-24 py-14 border-t border-border-color">
      <SectionHeading>Projects</SectionHeading>

      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}