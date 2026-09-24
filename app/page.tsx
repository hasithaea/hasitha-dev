import Link from "next/link";
import PageShell from "@/components/PageShell";
import Footer from "@/components/Footer";
import {
  FaGithub,
  FaLinkedin,
  FaXTwitter,
  FaDiscord,
  FaDocker,
} from "react-icons/fa6";

const socials = [
  { name: "GitHub", href: "https://github.com/hasithaea", Icon: FaGithub },
  { name: "LinkedIn", href: "https://linkedin.com/in/hasithaea", Icon: FaLinkedin },
  { name: "Docker Hub", href: "https://hub.docker.com/u/hasithaea", Icon: FaDocker },
  { name: "X", href: "https://x.com/hasithaea", Icon: FaXTwitter },
  { name: "Discord", href: "https://discord.com/users/hasithaea", Icon: FaDiscord },
];

type Project = {
  title: string;
  summary: string;
  stack: string[];
  repo: string;
  live: string | null;
};

// Add real projects here as they're finished. The section only renders
// when this array is non-empty (see below) - no placeholder entries.
const projects: Project[] = [
  {
    title: "Majesty",
    summary: "e commerce clothing site",
    stack:["HTML", "CSS", "Docker"],
    repo: "https://github.com/hasithaea/Majesty_project",
    live: null
  },
];

const skills = [
  { group: "Languages", items: ["C", "Python", "Java", "JavaScript", "TypeScript", "PHP"] },
  { group: "Web", items: ["React", "Next.js", "Tailwind CSS", "HTML", "CSS"] },
  { group: "DevOps and cloud", items: ["Docker", "GitHub Actions", "Linux", "Bash", "Azure"] },
  { group: "Data and hosting", items: ["MySQL", "Supabase", "Vercel", "Render"] },
];

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="flex items-center gap-3 text-xl font-semibold tracking-tight mb-6">
      <span aria-hidden="true" className="h-5 w-px bg-accent-gold" />
      {children}
    </h2>
  );
}

export default function Home() {
  return (
    <PageShell footer={<Footer />}>
      {/* hero */}
      <section className="relative min-h-[100dvh] flex flex-col justify-center py-16 sm:py-24">
        <div className="relative inline-block">
          {/* glow scoped to the headline only, not the whole hero */}
          <div
            className="pointer-events-none absolute -z-10 w-[320px] h-[140px] rounded-full bg-orb-color-1/45 blur-[60px]"
            style={{ top: "-20px", left: "-20px", animation: "heroGlow 8s ease-in-out infinite" }}
            aria-hidden="true"
          />
          <style>{`
            @keyframes heroGlow {
              0%, 100% { opacity: 0.8; transform: scale(1); }
              50% { opacity: 1; transform: scale(1.08); }
            }
            @media (prefers-reduced-motion: reduce) {
              @keyframes heroGlow { 0%, 100% { transform: none; } }
            }
          `}</style>

          <h1 className="relative text-4xl sm:text-5xl font-semibold tracking-tight leading-tight">
            Hasitha Amarasinghe
          </h1>
        </div>
        <p className="mt-4 max-w-xl text-lg text-text-muted leading-relaxed">
          Computer science undergraduate in Sri Lanka, learning to build and ship
          software the way teams actually do it: version control, pipelines, and
          infrastructure that holds up.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href={projects.length > 0 ? "#projects" : "#about"}
            className="inline-flex items-center text-sm font-medium text-bg-primary rounded-full px-5 py-2.5 transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2563EB]"
            style={{
              background:
                "linear-gradient(135deg, #F4D06F 0%, #C9A24B 50%, #E8B33D 100%)",
            }}
          >
            See what I&apos;ve built
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center text-sm font-medium rounded-full px-5 py-2.5 border border-[#334155] text-text-muted transition-all duration-300 hover:border-[#2563EB] hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2563EB]"
          >
            Get in touch
          </Link>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          {socials.map(({ name, href, Icon }) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={name}
              className="group relative p-3 rounded-full border border-[#334155] bg-[#111827] transition-all duration-300 hover:border-[#2563EB] hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2563EB]"
            >
              <span className="absolute inset-0 rounded-full bg-[#2563EB]/0 group-hover:bg-[#2563EB]/20 blur-md transition-all duration-300" />
              <Icon className="w-5 h-5 relative z-10 text-text-muted group-hover:text-[#2563EB] transition-colors duration-300" />
            </a>
          ))}
        </div>
      </section>

      {/* about */}
      <section id="about" className="scroll-mt-24 py-14 border-t border-[#1E293B]">
        <SectionHeading>About</SectionHeading>
        <div className="max-w-2xl space-y-4 text-text-muted leading-relaxed">
          <p>
            I&apos;m a computer science student at the University of Ruhuna, working
            toward a career in DevOps. Most of what I know outside coursework comes
            from building things end to end and breaking them in the process.
          </p>
          <p>
            That means the work here isn&apos;t just code. It&apos;s branch protection and
            pull requests, CI pipelines that actually gate merges, DNS and email
            records configured by hand, and documentation written so someone else
            can follow it. I&apos;d rather have a few projects done properly than a
            long list done halfway.
          </p>
        </div>

        <dl className="mt-8 grid gap-x-8 gap-y-4 sm:grid-cols-3 text-sm">
          <div>
            <dt className="text-text-muted">Based in</dt>
            <dd className="mt-1">Sri Lanka</dd>
          </div>
          <div>
            <dt className="text-text-muted">Studying</dt>
            <dd className="mt-1">BSc Computer Science, University of Ruhuna</dd>
          </div>
          <div>
            <dt className="text-text-muted">Focused on</dt>
            <dd className="mt-1">DevOps, CI/CD, infrastructure</dd>
          </div>
        </dl>
      </section>

      {/* projects */}
      {projects.length > 0 && (
        <section id="projects" className="scroll-mt-24 py-14 border-t border-[#1E293B]">
          <SectionHeading>Projects</SectionHeading>
          <div className="grid gap-4 sm:grid-cols-2">
            {projects.map((project) => (
              <article
                key={project.title}
                className="rounded-lg border border-[#1E293B] bg-white/[0.02] p-5 transition-colors duration-300 hover:border-[#334155]"
              >
                <h3 className="text-base font-semibold tracking-tight">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm text-text-muted leading-relaxed">
                  {project.summary}
                </p>

                <ul className="mt-4 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full border border-[#1E293B] px-2.5 py-1 text-xs text-text-muted"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex items-center gap-4 text-sm">
                  <a
                    href={project.repo}
                    className="text-[#60A5FA] hover:text-[#93C5FD] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2563EB] rounded-sm"
                  >
                    Source
                  </a>
                  {project.live && (
                    <a
                      href={project.live}
                      className="text-[#60A5FA] hover:text-[#93C5FD] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2563EB] rounded-sm"
                    >
                      Live site
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* skills */}
      <section id="skills" className="scroll-mt-24 py-14 border-t border-[#1E293B]">
        <SectionHeading>Skills</SectionHeading>
        <div className="space-y-6">
          {skills.map(({ group, items }) => (
            <div key={group} className="sm:flex sm:gap-8">
              <h3 className="text-sm text-text-muted sm:w-44 sm:shrink-0 sm:pt-1">
                {group}
              </h3>
              <ul className="mt-2 sm:mt-0 flex flex-wrap gap-2">
                {items.map((item) => (
                  <li
                    key={item}
                    className="rounded-md border border-[#1E293B] bg-white/[0.02] px-3 py-1.5 text-sm"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* contact */}
      <section className="py-14 border-t border-[#1E293B]">
        <SectionHeading>Get in touch</SectionHeading>
        <p className="max-w-xl text-text-muted leading-relaxed">
          Open to internships and collaboration. The contact form is the fastest
          way to reach me, or email works just as well.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center text-sm font-medium text-bg-primary rounded-full px-5 py-2.5 transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2563EB]"
            style={{
              background:
                "linear-gradient(135deg, #F4D06F 0%, #C9A24B 50%, #E8B33D 100%)",
            }}
          >
            Send a message
          </Link>
          <a
            href="mailto:hello@hasitha.dev"
            className="text-sm text-text-muted hover:text-text-primary transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2563EB] rounded-sm"
          >
            hello@hasitha.dev
          </a>
        </div>
      </section>

    </PageShell>
  );
}