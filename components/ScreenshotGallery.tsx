"use client";

import { useRef } from "react";
import Image from "next/image";
import Lightbox, {
  type LightboxHandle,
  type LightboxItem,
} from "@/components/Lightbox";

export type Shot = LightboxItem & { portrait?: boolean };

type Entry = { shot: Shot; i: number };

const frameBase =
  "relative block w-full cursor-zoom-in overflow-hidden border border-border-color transition-colors hover:border-accent/40 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

function Thumb({
  entry,
  onOpen,
}: {
  entry: Entry;
  onOpen: (i: number) => void;
}) {
  const { shot, i } = entry;

  return (
    <figure>
      <button
        type="button"
        onClick={() => onOpen(i)}
        aria-label={`View larger: ${shot.caption}`}
        className={
          shot.portrait
            ? `${frameBase} aspect-9/19 rounded-xl bg-bg-primary`
            : `${frameBase} aspect-video rounded-lg`
        }
      >
        <Image
          src={shot.src}
          alt={shot.caption}
          fill
          sizes={
            shot.portrait
              ? "(min-width: 640px) 140px, 50vw"
              : "(min-width: 640px) 280px, 100vw"
          }
          className={shot.portrait ? "object-contain" : "object-cover"}
        />
      </button>
      <figcaption className="mt-2 text-xs text-text-muted">
        {shot.caption}
      </figcaption>
    </figure>
  );
}

export default function ScreenshotGallery({ shots }: { shots: Shot[] }) {
  const lightbox = useRef<LightboxHandle>(null);
  const open = (i: number) => lightbox.current?.open(i);

  const entries: Entry[] = shots.map((shot, i) => ({ shot, i }));
  const landscape = entries.filter((e) => !e.shot.portrait);
  const portrait = entries.filter((e) => e.shot.portrait);

  return (
    <>
      <div className="space-y-8">
        {landscape.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2">
            {landscape.map((e) => (
              <Thumb key={e.shot.src} entry={e} onOpen={open} />
            ))}
          </div>
        )}

        {portrait.length > 0 && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {portrait.map((e) => (
              <Thumb key={e.shot.src} entry={e} onOpen={open} />
            ))}
          </div>
        )}
      </div>

      <Lightbox ref={lightbox} items={shots} label="Screenshot viewer" />
    </>
  );
}