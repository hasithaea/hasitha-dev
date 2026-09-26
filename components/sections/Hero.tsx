import Link from "next/link";
import Button from "@/components/Button";
import { socials } from "@/data/socials";
import { FaGithub, FaLinkedin, FaXTwitter, FaDiscord, FaDocker } from "react-icons/fa6";

const iconMap = {
  GitHub: FaGithub,
  LinkedIn: FaLinkedin,
  "Docker Hub": FaDocker,
  X: FaXTwitter,
  Discord: FaDiscord,
};

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex flex-col justify-center py-16 sm:py-24">
      <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-tight">
        Hasitha Amarasinghe
      </h1>

      <p className="mt-4 max-w-xl text-lg text-text-muted leading-relaxed">
        Computer science undergraduate at the University of Ruhuna,
        interested in DevOps, software development, and the systems behind
        shipping reliable software.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Button href="#projects">See what I&apos;ve built</Button>

        <Link
          href="/contact"
          className="inline-flex items-center text-sm font-medium rounded-full px-5 py-2.5 border border-border-color text-text-muted transition-all duration-300 hover:border-accent hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          Get in touch
        </Link>
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-4">
        {socials.map(({ name, href }) => {
          const Icon = iconMap[name as keyof typeof iconMap];
          return (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={name}
              className="group relative p-3 rounded-full border border-border-color bg-bg-surface transition-all duration-300 hover:border-accent hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              <span className="absolute inset-0 rounded-full bg-accent/0 group-hover:bg-accent/20 blur-md transition-all duration-300" />
              <Icon className="w-5 h-5 relative z-10 text-text-muted group-hover:text-accent transition-colors duration-300" />
            </a>
          );
        })}
      </div>
    </section>
  );
}