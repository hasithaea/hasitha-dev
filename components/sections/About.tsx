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
          <dt className="text-text-muted">Based in</dt>
          <dd className="mt-1">Sri Lanka</dd>
        </div>
        <div>
          <dt className="text-text-muted">Studying</dt>
          <dd className="mt-1">Bachelor of Computer Science</dd>
        </div>
        <div>
          <dt className="text-text-muted">Focused on</dt>
          <dd className="mt-1">DevOps, software &amp; infrastructure</dd>
        </div>
      </dl>
    </section>
  );
}