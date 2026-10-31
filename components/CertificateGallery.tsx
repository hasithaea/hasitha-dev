"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Button from "@/components/Button";

export type CertificateImage = { src: string; caption: string };

const FRAME = "aspect-[842/595]";

const STACK = [
  { left: "34%", top: "36%", z: 30 },
  { left: "21%", top: "21%", z: 20 },
  { left: "8%", top: "6%", z: 10 },
];

const trigger =
  "relative block w-full cursor-zoom-in overflow-hidden rounded-lg border border-border-color bg-bg-primary transition-colors hover:border-accent/40 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

export default function CertificateGallery({
  images,
}: {
  images: CertificateImage[];
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState<number | null>(null);
  const isOpen = index !== null;
  const current = index !== null ? images[index] : null;
  const many = images.length > 1;

  const open = (i: number) => {
    setIndex(i);
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();
  const step = (dir: number) =>
    setIndex((i) => (i === null ? i : (i + dir + images.length) % images.length));

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  if (images.length === 0) return null;

  return (
    <>
      {many ? (
        <button
          type="button"
          onClick={() => open(0)}
          aria-label={`View all ${images.length} certificates`}
          className={`${trigger} ${FRAME}`}
        >
          {images.slice(0, STACK.length).map((img, d) => (
            <span
              key={img.src}
              style={{ left: STACK[d].left, top: STACK[d].top, zIndex: STACK[d].z }}
              className={`absolute block w-[58%] overflow-hidden rounded-md border border-border-color bg-white shadow-lg shadow-black/50 ${FRAME}`}
            >
              <Image
                src={img.src}
                alt={d === 0 ? images[0].caption : ""}
                fill
                sizes="(min-width: 640px) 250px, 60vw"
                className="object-cover"
              />
            </span>
          ))}
          <span className="absolute bottom-3 right-3 z-40 rounded-lg bg-black/70 px-3 py-1.5 font-mono text-xs text-text-primary backdrop-blur">
            {images.length} certificates
          </span>
        </button>
      ) : (
        <button
          type="button"
          onClick={() => open(0)}
          aria-label={`View larger: ${images[0].caption}`}
          className={`${trigger} ${FRAME}`}
        >
          <Image
            src={images[0].src}
            alt={images[0].caption}
            fill
            sizes="(min-width: 640px) 420px, 100vw"
            className="object-contain"
          />
        </button>
      )}

      {/* Native dialog */}
      <dialog
        ref={dialogRef}
        onClose={() => setIndex(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        onKeyDown={(e) => {
          if (!many) return;
          if (e.key === "ArrowLeft") step(-1);
          if (e.key === "ArrowRight") step(1);
        }}
        aria-label="Certificate viewer"
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
                  {(index ?? 0) + 1} / {images.length}
                </span>
              </p>
              <div className="flex shrink-0 gap-2">
                {many && (
                  <>
                    <Button variant="mono" type="button" onClick={() => step(-1)}>
                      Prev
                    </Button>
                    <Button variant="mono" type="button" onClick={() => step(1)}>
                      Next
                    </Button>
                  </>
                )}
                <Button variant="mono" type="button" onClick={close}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}