import Image from "next/image";
import Button from "@/components/Button";
import Reveal from "@/components/Reveal";
import type { Experience } from "@/data/experience";

export default function ExperienceItem({
  item,
  index = 0,
}: {
  item: Experience;
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
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md overflow-hidden"
          >
            <Image
              src={item.logo}
              alt={`${item.company} logo`}
              width={96}
              height={96}
              className="h-full w-full object-contain grayscale opacity-80 transition-opacity duration-300 group-hover:opacity-100"
            />
          </Reveal>
        )}

        <div className="flex-1">
          <Reveal delay={d + 100}>
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
              <div>
                <h3 className="font-semibold tracking-tight">{item.role}</h3>
                <p className="mt-1 text-sm text-text-muted">
                  {item.companyUrl ? (
                    <Button variant="link" href={item.companyUrl}>
                      {item.company}
                    </Button>
                  ) : (
                    item.company
                  )}
                </p>
              </div>

              <div className="font-mono text-xs text-text-muted sm:text-right">
                <p>{item.period}</p>
                <p className="mt-1">{item.location}</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={d + 220} className="mt-3">
            <p className="max-w-2xl text-sm text-text-muted leading-relaxed">
              {item.description}
            </p>
          </Reveal>

          <Reveal delay={d + 340} className="mt-4">
            <ul className="space-y-2">
              {item.points.map((point) => (
                <li
                  key={point}
                  className="text-sm text-text-muted leading-relaxed pl-4 relative"
                >
                  <span className="absolute left-0">•</span>
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </Reveal>
  );
}