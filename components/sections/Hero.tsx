import Link from "next/link";
import Button from "@/components/Button";
import GitHubActivityCard from "@/components/sections/GitHubActivityCard";
import { getGitHubActivity } from "@/lib/github-activity";
import { socials } from "@/data/socials";
import { FaGithub, FaLinkedin, FaXTwitter, FaDiscord, FaDocker } from "react-icons/fa6";

const iconMap = {
  GitHub: FaGithub,
  LinkedIn: FaLinkedin,
  "Docker Hub": FaDocker,
  X: FaXTwitter,
  Discord: FaDiscord,
};

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

export default async function Hero() {
  const activity = await getGitHubActivity();

  return (
    <section className="relative isolate flex flex-col justify-center pt-28 pb-16 sm:py-24 min-h-dvh">
      <div
        className={
          activity
            ? "grid w-full items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16"
            : "w-full"
        }
      >
        <div>
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-tight">
            <span className="line-mask">
              <span style={delay(0)}>Hasitha</span>
            </span>{" "}
            <span className="line-mask">
              <span style={delay(100)}>Amarasinghe</span>
            </span>
          </h1>

          <p
            style={delay(300)}
            className="hero-rise mt-4 max-w-xl text-lg text-text-muted leading-relaxed"
          >
            Computer science undergraduate at the University of Ruhuna,
            interested in DevOps, software development, and the systems behind
            shipping reliable software.
          </p>

          <div
            style={delay(450)}
            className="hero-rise mt-8 flex flex-wrap items-center gap-3"
          >
            <Button href="#projects">See what I&apos;ve built</Button>

            <Link
              href="/contact"
              className="inline-flex items-center text-sm font-medium rounded-full px-5 py-2.5 border border-border-color text-text-muted transition-colors duration-300 hover:border-accent hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              Get in touch
            </Link>
          </div>

          <div
            style={delay(740)}
            className="hero-rise mt-10 flex flex-wrap items-center gap-4"
          >
            {socials.map(({ name, href }, i) => {
              const Icon = iconMap[name as keyof typeof iconMap];
              return (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  style={{ "--i": i } as React.CSSProperties}
                  className="touch-hint group relative p-3 rounded-full border border-border-color bg-bg-surface transition-[transform,border-color] duration-300 hover:border-accent hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  <span className="absolute inset-0 rounded-full bg-accent/0 group-hover:bg-accent/20 blur-md transition-colors duration-300" />
                  <Icon className="w-5 h-5 relative z-10 text-text-muted group-hover:text-accent transition-colors duration-300" />
                </a>
              );
            })}
          </div>
        </div>

        {activity && (
          <div style={delay(400)} className="hero-slide">
            <GitHubActivityCard data={activity} />
          </div>
        )}
      </div>
    </section>
  );
}
