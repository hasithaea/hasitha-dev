import SectionHeading from "@/components/SectionHeading";
import ProjectCard from "@/components/sections/ProjectCard";
import Reveal from "@/components/Reveal";
import { projects } from "@/data/projects";

export default function Projects() {
  return (
    <section id="projects" className="scroll-mt-24 py-16 sm:py-20 border-t border-border-color">
      <SectionHeading>Projects</SectionHeading>
      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal key={project.title} delay={(i % 2) * 120} className="h-full">
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}