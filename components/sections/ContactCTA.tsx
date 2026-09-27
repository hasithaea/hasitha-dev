import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";

export default function ContactCTA() {
  return (
    <section className="py-14 border-t border-border-color">
      <SectionHeading>Get in touch</SectionHeading>

      <p className="max-w-xl text-text-muted leading-relaxed">
        Interested in internships, projects, or collaborating on something
        useful? Feel free to reach out.
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Button href="/contact">Send a message</Button>
        <a
          href="mailto:hello@hasitha.dev"
          className="text-sm text-text-muted hover:text-text-primary transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent rounded-sm"
        >
          hello@hasitha.dev
        </a>
      </div>
    </section>
  );
}