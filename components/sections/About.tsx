import SectionHeading from "@/components/SectionHeading";

export default function About() {
  return (
    <section id="about" className="scroll-mt-24 py-14 border-t border-border-color">
      <SectionHeading>About</SectionHeading>

      <div className="max-w-2xl space-y-4 text-text-muted leading-relaxed">
        <p>
          I&apos;m a Bachelor of Computer Science undergraduate at the
          University of Ruhuna, Sri Lanka, building my foundation across
          software development, systems, and DevOps.
        </p>
        <p>
          I enjoy understanding how things work underneath the surface, 
          from programming and databases to Linux, containers, and 
          CI/CD pipelines. Lately that curiosity has extended into cloud
          platforms and cybersecurity.
        </p>
        <p>
          What draws me in most is the engineering practice behind the code, 
          the tooling and discipline that let software be built, deployed, 
          and maintained reliably.
        </p>
      </div>

      <dl className="mt-8 grid gap-x-8 gap-y-4 sm:grid-cols-3 text-sm">
        <div>
          <dt className="font-mono text-xs tracking-widest text-text-muted uppercase">Based in</dt>
          <dd className="mt-1 text-text-primary">Sri Lanka</dd>
        </div>
        <div>
          <dt className="font-mono text-xs tracking-widest text-text-muted uppercase">Studying</dt>
          <dd className="mt-1 text-text-primary">Bachelor Computer Science</dd>
        </div>
        <div>
          <dt className="font-mono text-xs tracking-widest text-text-muted uppercase">Focused on</dt>
          <dd className="mt-1 text-text-primary">DevOps &amp; infrastructure</dd>
        </div>
      </dl>
    </section>
  );
}