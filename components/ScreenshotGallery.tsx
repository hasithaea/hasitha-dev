"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export type Shot = { src: string; caption: string; portrait?: boolean };

const btn =
  "rounded-full border border-border-color bg-bg-surface px-3 py-1.5 font-mono text-xs text-text-muted transition-colors hover:border-accent hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

const frameBase =
  "relative block w-full cursor-zoom-in overflow-hidden border border-border-color transition-colors hover:border-accent/40 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

type Entry = { shot: Shot; i: number };

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
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState<number | null>(null);
  const isOpen = index !== null;
  const current = index !== null ? shots[index] : null;

  const entries: Entry[] = shots.map((shot, i) => ({ shot, i }));
  const landscape = entries.filter((e) => !e.shot.portrait);
  const portrait = entries.filter((e) => e.shot.portrait);

  const open = (i: number) => {
    setIndex(i);
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();
  const step = (dir: number) =>
    setIndex((i) => (i === null ? i : (i + dir + shots.length) % shots.length));

  // Lock page scroll while the viewer is open.
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

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
          // Phone screenshots
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {portrait.map((e) => (
              <Thumb key={e.shot.src} entry={e} onOpen={open} />
            ))}
          </div>
        )}
      </div>

      {/* Native dialog */}
      <dialog
        ref={dialogRef}
        onClose={() => setIndex(null)}
        onClick={(e) => {
          // Clicks on the backdrop target the dialog element itself.
          if (e.target === e.currentTarget) close();
        }}
        onKeyDown={(e) => {
          if (shots.length < 2) return;
          if (e.key === "ArrowLeft") step(-1);
          if (e.key === "ArrowRight") step(1);
        }}
        aria-label="Screenshot viewer"
        className="m-auto w-[min(92vw,1100px)] max-w-none bg-transparent p-0 text-text-primary backdrop:bg-black/85"
      >
        {current && (
          <div className="flex flex-col gap-3">
            <div className="relative h-[78vh] w-full">
              <Image
                src={current.src}
                alt={current.caption}
                fill
                sizes="92vw"
                className="object-contain"
              />
            </div>

            <div className="flex items-center justify-between gap-4">
              <p className="text-sm text-text-muted">
                {current.caption}
                <span className="ml-3 font-mono text-xs">
                  {(index ?? 0) + 1} / {shots.length}
                </span>
              </p>
              <div className="flex shrink-0 gap-2">
                {shots.length > 1 && (
                  <>
                    <button type="button" onClick={() => step(-1)} className={btn}>
                      Prev
                    </button>
                    <button type="button" onClick={() => step(1)} className={btn}>
                      Next
                    </button>
                  </>
                )}
                <button type="button" onClick={close} className={btn}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
