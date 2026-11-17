"use client";

import { useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import type { Ref } from "react";
import Image from "next/image";
import Button from "@/components/Button";

export type LightboxItem = { src: string; caption: string };

export type LightboxHandle = {
  open: (i: number) => void;
  close: () => void;
  step: (dir: number) => void;
};

type Props = {
  items: LightboxItem[];
  label?: string;
  ref?: Ref<LightboxHandle>;
};

export default function Lightbox({ items, label = "Media viewer", ref }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState<number | null>(null);

  const isOpen = index !== null;
  const current = index !== null ? items[index] : null;
  const many = items.length > 1;

  // wraps around at both ends
  const step = useCallback(
    (dir: number) =>
      setIndex((i) => (i === null ? i : (i + dir + items.length) % items.length)),
    [items.length],
  );

  const close = () => dialogRef.current?.close();

  useImperativeHandle(
    ref,
    () => ({
      open: (i) => {
        setIndex(i);
        dialogRef.current?.showModal();
      },
      close: () => dialogRef.current?.close(),
      step,
    }),
    [step],
  );

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      aria-label={label}
      onClose={() => setIndex(null)}
      onClick={(e) => e.target === e.currentTarget && close()}
      onKeyDown={(e) => {
        if (!many) return;
        if (e.key === "ArrowLeft") step(-1);
        if (e.key === "ArrowRight") step(1);
      }}
      className="m-auto w-[min(92vw,1100px)] max-w-none bg-transparent p-0 text-text-primary backdrop:bg-black/85"
    >
      {current && (
        <div className="flex flex-col gap-3">
          <div className="relative h-[78vh] w-full">
            <Image
              src={current.src}
              alt={current.caption}
              fill
              sizes="(min-width: 1200px) 1100px, 92vw"
              className="object-contain"
            />
          </div>

          <div className="flex items-center justify-between gap-4">
            <p className="text-sm text-text-muted">
              {current.caption}
              <span className="ml-3 font-mono text-xs">
                {(index ?? 0) + 1} / {items.length}
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
  );
}
