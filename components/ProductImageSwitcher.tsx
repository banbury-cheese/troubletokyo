"use client";

import { useState, useCallback } from "react";
import styles from "./ProductImageSwitcher.module.scss";

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
  const [isFlipping, setIsFlipping] = useState(false);
  const [imageTransition, setImageTransition] = useState(false);
  const hasAltImage = !!images?.[2]?.url;

  const currentImage = images?.[index] ?? images?.[1] ?? images?.[0];
  const alt = currentImage?.altText || `${title} image`;

  const handleFlip = useCallback(() => {
    if (isFlipping) return; // Prevent multiple clicks during animation

    setIsFlipping(true);
    setImageTransition(true);

    // Change image index at the midpoint of the animation for smoother transition
    setTimeout(() => {
      setIndex((prev) => (prev === 1 ? 2 : 1));
    }, 200);

    // Reset animation states
    setTimeout(() => {
      setIsFlipping(false);
    }, 600);

    // Reset image transition slightly earlier to prevent jitter
    setTimeout(() => {
      setImageTransition(false);
    }, 400);
  }, [isFlipping]);

  return (
    <div className={`${styles.imageSwitcher} ${sectionClassName || ""}`}>
      {currentImage?.url ? (
        <div className={styles.imageContainer}>
          <img
            src={currentImage.url}
            alt={alt}
            width={width}
            height={height}
            className={`${styles.image} ${
              imageTransition ? styles.imageTransition : ""
            } ${imageClassName || ""}`}
          />
        </div>
      ) : null}

      {hasAltImage ? (
        <button
          type="button"
          onClick={handleFlip}
          disabled={isFlipping}
          aria-label={index === 1 ? "Show alternate image" : "Show first image"}
          className={`${styles.flipButton} ${
            isFlipping ? styles.flipping : ""
          }`}
        >
          {index === 1 ? "Flip" : "Flip"}
        </button>
      ) : null}
    </div>
  );
}
