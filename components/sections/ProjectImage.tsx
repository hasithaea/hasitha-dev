import Image from "next/image";

// fit=contain - for phone screenshots
// fit=cover - fills the box and crops (default, for landscape images)

export default function ProjectImage({
  title,
  src,
  fit = "cover",
  sizes = "(min-width: 640px) 50vw, 100vw",
  priority = false,
}: {
  title: string;
  src?: string;
  fit?: "cover" | "contain";
  sizes?: string;
  priority?: boolean;
}) {
  if (!src) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-bg-primary px-4 text-center font-mono text-xs text-text-muted">
        {title}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={`${title} screenshot`}
      fill
      sizes={sizes}
      priority={priority}
      className={
        fit === "contain"
          ? "bg-bg-primary object-contain p-3"
          : "object-cover"
      }
    />
  );
}