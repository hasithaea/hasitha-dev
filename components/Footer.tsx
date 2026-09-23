import Link from "next/link";
import Button from "./Button";

type FooterVariant = "full" | "compact";

interface FooterProps {
  variant?: FooterVariant;
}

const navigationLinks = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "sitemap.xml", href: "/sitemap.xml" },
];

const connectLinks = [
  { label: "LinkedIn", href: "https://linkedin.com/in/hasithaea" },
  { label: "GitHub", href: "https://github.com/hasithaea"},
  { label: "X (Twitter)", href: "https://x.com/hasithaea" },
  { label: "Docker Hub", href: "https://hub.docker.com/u/hasithaea" },
  { label: "Discord", href: "https://discord.com/users/hasithaea" },
];

export function Footer({ variant = "full" }: FooterProps) {
  const year = new Date().getFullYear();

  if (variant === "compact") {
    return (
      <footer className="mt-auto py-6 text-center">
        <p className="text-sm text-text-muted">
          © {year} Hasitha Amarasinghe
        </p>
      </footer>
    );
  }

  return (
    <footer className="glass mt-auto w-full border-t border-text-primary/6 py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-4">

          {/* Brand Column */}
          <div className="flex flex-col gap-2 max-w-md lg:mr-40">

            <Link href="/" className="text-3xl font-semibold tracking-tight">
              <span className="text-accent-gold">hasitha</span>
              <span className="text-text-muted">.dev</span>
            </Link>


            <h2 className="text-base">
              <span className="font-bold text-text-primary">Hasitha</span>{" "}
              <span className="font-semibold text-text-muted">Amarasinghe</span>
            </h2>

            <p className="text-sm leading-relaxed text-text-muted">
              Building, deliberately.
            </p>
            <div className="mt-4 inline-flex items-center flex-wrap gap-4">
              <Button href="/contact">
                Contact
              </Button>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="lg:flex-1">
            <h3 className="mb-3 text-sm font-semibold tracking-widest text-text-primary/80">NAVIGATION</h3>
            <ul className="flex flex-col gap-2">
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-text-muted transition-colors hover:text-text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Policy Column */}
          <div className="lg:flex-1">
            <h3 className="mb-3 text-sm font-semibold tracking-widest text-text-primary/80">LEGAL & POLICY</h3>
            <ul className="flex flex-col gap-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-text-muted transition-colors hover:text-text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Column */}
          <div className="lg:flex-1">
            <h3 className="mb-3 text-sm font-semibold tracking-widest text-text-primary/80">CONNECT</h3>
            <div className="flex flex-col gap-2">
              {connectLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-text-muted transition-colors hover:text-text-primary"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-5 flex flex-col items-center justify-center gap-4 border-t border-[#1E293B] pt-4 sm:flex-row">
          <p className="text-sm text-text-muted">
            © {year} Hasitha Amarasinghe
          </p>
        </div>

      </div>
    </footer>
  );
}