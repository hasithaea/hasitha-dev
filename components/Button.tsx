import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "pill" | "solid" | "link";

const GOLD_GRADIENT =
  "linear-gradient(135deg, #F4D06F 0%, #C9A24B 50%, #E8B33D 100%)";

const styles: Record<Variant, string> = {
  // pill button 
  pill: "group inline-flex items-center text-sm font-medium text-bg-primary rounded-full px-5 py-2.5 transition-transform duration-300 hover:-translate-y-0.5",
  // solid bar button 
  solid:
    "w-full bg-accent-gold hover:bg-[#dab566] hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 text-bg-primary font-medium text-sm rounded-xl px-4 py-2.5 transition-all duration-200 shadow-[0_8px_24px_-8px_rgba(201,162,75,0.55)]",
  // link type button
  link: "text-sm text-text-muted hover:text-text-primary underline underline-offset-4 decoration-[#1d2c47] hover:decoration-accent-gold/60 transition-colors",
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
  const style = variant === "pill" ? { background: GOLD_GRADIENT } : undefined;

  if (href === undefined) {
    return (
      <button {...rest} className={cls} style={style}>
        {children}
      </button>
    );
  }

  // Internal routes use next/link;
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={cls} style={style}>
        {children}
      </Link>
    );
  }
  // anything else use <a> tag
  return (
    <a href={href} className={cls} style={style}>
      {children}
    </a>
  );
}
