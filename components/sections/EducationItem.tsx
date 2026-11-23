import Image from "next/image";
import { FaGithub } from "react-icons/fa6";
import type { Education } from "@/data/education";
import Button from "@/components/Button";
import Reveal from "@/components/Reveal";

export default function EducationItem({
  item,
  index = 0,
}: {
  item: Education;
  index?: number;
}) {
  const d = Math.min(index, 3) * 150;

  return (
    <Reveal as="article" bare delay={d} className="group relative pl-5">
      <span
        aria-hidden
        className="absolute inset-y-0 left-0 w-px origin-top scale-y-0 bg-border-color transition-transform duration-1000 ease-out delay-(--reveal-delay) group-data-[visible=true]:scale-y-100 motion-reduce:scale-y-100 motion-reduce:transition-none"
      />
      <span
        aria-hidden
        className="absolute inset-y-0 left-0 w-px bg-accent opacity-0 transition-opacity duration-300 group-hover:opacity-80"
      />

      <div className="flex items-start gap-4">
        {item.logo && (
          <Reveal
            delay={d + 100}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md overflow-hidden"
          >
            <Image
              src={item.logo}
              alt={`${item.institution} logo`}
              width={80}
              height={80}
              className="h-full w-full object-contain grayscale opacity-80 transition-opacity duration-300 group-hover:opacity-100"
            />
          </Reveal>
        )}

        <div className="flex-1">
          <Reveal delay={d + 100}>
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
              <div>
                <h3 className="font-semibold tracking-tight">
                  {item.qualification}
                </h3>
                <p className="mt-1 text-sm text-text-muted">
                  {item.institutionUrl ? (
                    <Button variant="link" href={item.institutionUrl}>
                      {item.institution}
                    </Button>
                  ) : (
                    item.institution
                  )}
                </p>
              </div>

              {item.period && (
                <span className="font-mono text-xs text-text-muted">
                  {item.period}
                </span>
              )}
            </div>
          </Reveal>

          {item.description && (
            <Reveal delay={d + 220} className="mt-3">
              <p className="max-w-2xl text-sm text-text-muted leading-relaxed">
                {item.description}
              </p>
            </Reveal>
          )}

          {item.coursework.length > 0 && (
            <div className="mt-4">
              <Reveal delay={d + 340}>
                <p className="font-mono text-xs text-text-muted uppercase tracking-widest mb-2">
                  coursework
                </p>
              </Reveal>

              <div className="flex flex-wrap gap-2">
                {item.coursework.map((course, i) => (
                  <Reveal
                    key={course.name}
                    delay={d + 440 + Math.min(i, 8) * 90}
                  >
                    {course.repo ? (
                      <a
                        href={course.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-md border border-border-color bg-bg-surface px-3 py-1.5 font-mono text-xs text-text-muted hover:border-accent/40 hover:text-text-primary transition-colors"
                      >
                        <FaGithub className="h-3.5 w-3.5" aria-hidden="true" />
                        {course.name}
                      </a>
                    ) : (
                      <span className="block rounded-md border border-border-color px-3 py-1.5 font-mono text-xs text-text-muted">
                        {course.name}
                      </span>
                    )}
                  </Reveal>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Reveal>
  );
}
