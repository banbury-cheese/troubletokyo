"use client";

import { useState } from "react";

type ImageLike = {
  url: string;
  altText?: string | null;
};

type Props = {
  images: ImageLike[] | undefined | null;
  title: string;
  sectionClassName?: string;
  imageClassName?: string;
  width?: number;
  height?: number;
};

export default function ProductImageSwitcher({
  images,
  title,
  sectionClassName,
  imageClassName,
  width = 400,
  height = 500,
}: Props) {
  // Default to index 1 to match existing behavior
  const [index, setIndex] = useState(1);
  const hasAltImage = !!images?.[2]?.url;

  const currentImage = images?.[index] ?? images?.[1] ?? images?.[0];
  const alt = currentImage?.altText || `${title} image`;

  return (
    <div className={sectionClassName} style={{ position: "relative", flexDirection: "column" }}>
      {currentImage?.url ? (
        <img
          src={currentImage.url}
          alt={alt}
          width={width}
          height={height}
          className={imageClassName}
        />
      ) : null}

      {hasAltImage ? (
        <button
          type="button"
          onClick={() => setIndex((prev) => (prev === 1 ? 2 : 1))}
          aria-label={index === 1 ? "Show alternate image" : "Show first image"}
          style={{
            marginTop: "-16vh",
            // background: "var(--red)",
            // border: "1px solid var(--black)",
            padding: "0.25rem 0.5rem",
            // rotate: "-30deg",
            cursor: "pointer",
          }}
          className="text-[var(--red)] underline"
        >
          {index === 1 ? "Flip" : "Flip"}
        </button>
      ) : null}
    </div>
  );
}
