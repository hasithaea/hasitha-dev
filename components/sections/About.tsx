import SectionHeading from "@/components/SectionHeading";

const facts = [
  { label: "Studying", value: "Computer Science", sub: "University of Ruhuna" },
  { label: "Focused on", value: "DevOps & Infrastructure", sub: "Linux, containers, CI/CD" },
  { label: "Currently", value: "Building hasitha.dev", sub: "Next.js, TypeScript, Actions", live: true },
  { label: "Based in", value: "Sri Lanka", sub: "Open to remote" },
];

export default function About() {
  return (
    <section id="about" className="scroll-mt-24 border-t border-border-color py-16 md:py-20">
      <SectionHeading>About</SectionHeading>

      <div className="mt-8 grid gap-10 md:grid-cols-[1fr_1.4fr] md:gap-16 lg:gap-24">
        {/* Hook */}
        <div className="md:sticky md:top-28 md:self-start">
          <h3 className="text-balance text-2xl font-medium leading-snug tracking-tight text-text-primary md:text-3xl md:leading-snug">
            I care about the{" "}
            <span className="text-accent">engineering behind the code.</span>
          </h3>
          <p className="mt-4 border-l-2 border-accent/60 pl-4 text-[15px] leading-relaxed text-text-muted">
            The gap between &ldquo;it works on my machine&rdquo; and software
            that holds up in production.
          </p>
        </div>

        {/* Narrative */}
        <div className="space-y-5 text-[15px] leading-relaxed text-text-muted md:text-base md:leading-relaxed">
          <p>
            I&apos;m a Computer Science undergraduate at the University of
            Ruhuna, Sri Lanka, building my foundation across software
            development, systems, and DevOps.
          </p>
          <p>
            I like understanding how things work underneath the surface, from
            programming and databases to Linux, containers, and CI/CD
            pipelines. Lately that curiosity has extended into cloud platforms
            and cybersecurity.
          </p>
        </div>
      </div>

      {/* Facts */}
      <div className="mt-14 overflow-hidden rounded-xl border border-border-color bg-border-color">
        <dl className="grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((f) => (
            <div key={f.label} className="bg-bg-surface px-5 py-5">
              <dt className="flex items-center gap-2 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-text-muted">
                {f.live && (
                  <span className="relative flex h-1.5 w-1.5" aria-hidden>
                    <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-60 motion-safe:animate-ping" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                  </span>
                )}
                {f.label}
              </dt>
              <dd className="mt-1.5 text-[15px] font-semibold tracking-tight text-text-primary">
                {f.value}
              </dd>
              <dd className="mt-0.5 text-[13px] text-text-muted">{f.sub}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}