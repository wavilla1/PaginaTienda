"use client";

import Image from "next/image";
import { useState } from "react";

export function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [selected, setSelected] = useState(images[0]);

  return (
    <div>
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100">
        <Image
          src={selected}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
          priority
        />
      </div>

      <div className="mt-4 grid grid-cols-4 gap-3">
        {images.map((image) => (
          <button
            key={image}
            type="button"
            onClick={() => setSelected(image)}
            className={`relative aspect-square overflow-hidden rounded-xl border ${
              selected === image ? "border-[#0f766e]" : "border-slate-200"
            }`}
          >
            <Image src={image} alt={`${alt} miniatura`} fill sizes="120px" className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
