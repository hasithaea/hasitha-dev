import Image from "next/image";

export default function ProjectImage({
  title,
  src,
  sizes = "(min-width: 640px) 50vw, 100vw",
  priority = false,
}: {
  title: string;
  src?: string;
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
      className="object-cover"
    />
  );
}
