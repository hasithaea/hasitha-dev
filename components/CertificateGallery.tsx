"use client";

import { useRef } from "react";
import Image from "next/image";
import Lightbox, {
  type LightboxHandle,
  type LightboxItem,
} from "@/components/Lightbox";

export type CertificateImage = LightboxItem;

const FRAME = "aspect-842/595";

// stacked certificates
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
  const lightbox = useRef<LightboxHandle>(null);

  if (images.length === 0) return null;

  const many = images.length > 1;
  const open = () => lightbox.current?.open(0);

  return (
    <>
      {many ? (
        <button
          type="button"
          onClick={open}
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
          onClick={open}
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

      <Lightbox ref={lightbox} items={images} label="Certificate viewer" />
    </>
  );
}