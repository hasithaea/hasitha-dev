import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "pill" | "solid" | "link";

const styles: Record<Variant, string> = {
  // pill button
  pill: "group inline-flex items-center text-sm font-medium text-bg-primary bg-accent hover:bg-accent-hover rounded-full px-5 py-2.5 transition-all duration-300 hover:-translate-y-0.5",
  // solid bar button
  solid:
    "w-full bg-accent hover:bg-accent-hover hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 text-bg-primary font-medium text-sm rounded-xl px-4 py-2.5 transition-all duration-200 shadow-[0_8px_24px_-8px_rgba(255,107,53,0.45)]",
  // link type button
  link: "text-sm text-text-muted hover:text-text-primary underline underline-offset-4 decoration-border-color hover:decoration-accent/60 transition-colors",
};

type Props = {
  variant?: Variant;
  href?: string;
  className?: string;
  children: ReactNode;
} & Omit<ComponentProps<"button">, "className" | "children">;

export default function Button({
  variant = "pill",
  href,
  className = "",
  children,
  ...rest
}: Props) {
  const cls = `${styles[variant]} ${className}`.trim();

  if (href === undefined) {
    return (
      <button {...rest} className={cls}>
        {children}
      </button>
    );
  }

  // Internal routes use next/link;
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  // anything else use <a> tag
  // external links opens in new tab (mailto, tel unaffected)
  const isExternal = !href.startsWith("mailto:") && !href.startsWith("tel:");
  return (
    <a
      href={href}
      className={cls}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  );
}