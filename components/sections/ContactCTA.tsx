import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";

export default function ContactCTA() {
  return (
    <section
      id="contact"
      className="relative isolate scroll-mt-24 border-t border-border-color py-20 md:py-28"
    >
      {/* top right glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_90%_at_90%_0%,rgba(255,107,53,0.10),transparent_70%)]"
      />

      <SectionHeading>Contact</SectionHeading>

      <div className="mt-8 grid gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] md:items-center md:gap-12 lg:gap-16">
        {/* Statement */}
        <div>
          <h3 className="text-2xl font-medium leading-snug tracking-tight text-text-primary md:text-3xl md:leading-snug">
            <span className="block">Let&apos;s build something </span>
            <span className="block">
              <span className="text-accent">reliable.</span>
            </span>
          </h3>
          <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-text-muted">
            Questions, collaborations, or opportunities. The inbox is open.
          </p>
        </div>

        {/* Action */}
        <div className="flex flex-col md:border-l md:border-border-color md:pl-10">
          <a
            href="mailto:hello@hasitha.dev"
            className="group inline-flex items-center gap-3 self-start rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-bg-primary"
          >
            <span className="relative pb-1.5 font-mono text-2xl tracking-tight text-text-primary sm:text-3xl lg:text-4xl xl:text-5xl">
              hello@hasitha.dev
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-px bg-border-color"
              />
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none"
              />
            </span>
            <span
              aria-hidden
              className="text-lg text-text-muted transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent motion-reduce:transition-none sm:text-xl lg:text-2xl xl:text-3xl"
            >
              &#8599;
            </span>
          </a>

          <div className="mt-8">
            <Button variant="link" href="/contact" className="px-0">
              Prefer a form?
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
