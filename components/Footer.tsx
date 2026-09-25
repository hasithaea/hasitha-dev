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
  { label: "GitHub", href: "https://github.com/hasithaea" },
  { label: "X (Twitter)", href: "https://x.com/hasithaea" },
  { label: "Docker Hub", href: "https://hub.docker.com/u/hasithaea" },
];

export default function Footer({ variant = "full" }: FooterProps) {
  const year = new Date().getFullYear();

  if (variant === "compact") {
    return (
      <footer className="mt-auto py-6 text-center">
        <p className="font-mono text-xs text-text-muted">
          © {year} Hasitha Amarasinghe
        </p>
      </footer>
    );
  }

  return (
    <footer className="w-full border-t border-border-color bg-bg-surface py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:gap-8">
          
          {/* Brand Column */}
          <div className="flex flex-col gap-2 max-w-md md:mr-8 lg:mr-32">
            <Link href="/" className="text-3xl font-semibold tracking-tight">
              <span className="text-accent">hasitha</span>
              <span className="text-text-muted">.dev</span>
            </Link>

            <h2 className="text-base">
              <span className="font-bold text-text-primary">Hasitha</span>{" "}
              <span className="font-semibold text-text-muted">Amarasinghe</span>
            </h2>

            <p className="text-sm leading-relaxed text-text-muted">
              Exploring Linux, DevOps, and automation.
            </p>
            
            <div className="mt-4 inline-flex items-center flex-wrap gap-4">
              <Button href="/contact">Contact</Button>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="md:flex-1">
            <h3 className="mb-3 font-mono text-xs tracking-widest text-text-muted">
              NAVIGATION
            </h3>
            <ul className="flex flex-col gap-1">
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="text-sm text-text-muted transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Policy Column */}
          <div className="md:flex-1">
            <h3 className="mb-3 font-mono text-xs tracking-widest text-text-muted">
              LEGAL
            </h3>
            <ul className="flex flex-col gap-1">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="text-sm text-text-muted transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Column */}
          <div className="md:flex-1">
            <h3 className="mb-3 font-mono text-xs tracking-widest text-text-muted">
              CONNECT
            </h3>
            <ul className="flex flex-col gap-1">
              {connectLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-text-muted transition-colors hover:text-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-center gap-4 border-t border-border-color pt-6 md:flex-row">
          <p className="font-mono text-xs text-text-muted">
            © {year} Hasitha Amarasinghe
          </p>
        </div>
      </div>
    </footer>
  );
}