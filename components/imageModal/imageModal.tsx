"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import styles from "./imageModal.module.scss";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  title: string;
  location: string;
  description: string;
  photographer: string;
  imageIndex: number;
  totalImages: number;
  onNext: () => void;
  onPrev: () => void;
  triggerElement?: HTMLElement | null;
}

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

export default function ImageModal({
  isOpen,
  onClose,
  imageSrc,
  title,
  location,
  description,
  photographer,
  imageIndex,
  totalImages,
  onNext,
  onPrev,
  triggerElement,
}: ImageModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const infoContainerRef = useRef<HTMLDivElement>(null);
  const infoItemsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (isOpen && modalRef.current && triggerElement) {
      // Get the position and size of the trigger element
      const triggerRect = triggerElement.getBoundingClientRect();

      // Check if we're on mobile/tablet
      const isMobile = window.innerWidth < 800; // tablet breakpoint

      // Set initial position and size to match trigger
      gsap.set(imageContainerRef.current, {
        position: "fixed",
        left: triggerRect.left,
        top: triggerRect.top,
        width: triggerRect.width,
        height: triggerRect.height,
        zIndex: 1000,
      });

      // Set backdrop to transparent initially
      gsap.set(backdropRef.current, {
        opacity: 0,
      });

      // Hide info container initially
      gsap.set(infoContainerRef.current, {
        opacity: 0,
        x: isMobile ? 0 : 50,
        y: isMobile ? 50 : 0,
      });

      // Hide info items initially
      gsap.set(infoItemsRef.current, {
        opacity: 0,
        y: 20,
      });

      // Create timeline for opening animation
      const tl = gsap.timeline();

      // Fade in backdrop
      tl.to(backdropRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });

      // Expand image to center of screen (different positioning for mobile)
      if (isMobile) {
        tl.to(
          imageContainerRef.current,
          {
            left: "50%",
            top: "25%",
            width: "90vw",
            height: "50vh",
            x: "-50%",
            y: "-50%",
            duration: 0.6,
            ease: "power3.out",
            onComplete: () => {
              // After animation, ensure proper mobile layout
              if (imageContainerRef.current) {
                gsap.set(imageContainerRef.current, {
                  position: "relative",
                  left: "auto",
                  top: "auto",
                  transform: "none",
                  x: 0,
                  y: 0,
                });
              }
            },
          },
          "-=0.1"
        );
      } else {
        tl.to(
          imageContainerRef.current,
          {
            left: "33%",
            top: "50%",
            width: "60vw",
            height: "80vh",
            x: "-50%",
            y: "-50%",
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.1"
        );
      }

      // Slide in info container (from bottom on mobile, from right on desktop)
      tl.to(
        infoContainerRef.current,
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.3"
      );

      // Animate info items with stagger
      tl.to(
        infoItemsRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          stagger: 0.1,
          ease: "power2.out",
        },
        "-=0.2"
      );
    }
  }, [isOpen, triggerElement]);

  const handleClose = () => {
    if (!modalRef.current || !triggerElement) return;

    const triggerRect = triggerElement.getBoundingClientRect();
    const isMobile = window.innerWidth < 800; // tablet breakpoint

    // Create timeline for closing animation
    const tl = gsap.timeline({
      onComplete: onClose,
    });

    // Hide info items first
    tl.to(infoItemsRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.2,
      stagger: 0.05,
      ease: "power2.in",
    });

    // Hide info container (slide down on mobile, slide right on desktop)
    tl.to(
      infoContainerRef.current,
      {
        opacity: 0,
        x: isMobile ? 0 : 50,
        y: isMobile ? 50 : 0,
        duration: 0.3,
        ease: "power2.in",
      },
      "-=0.1"
    );

    // Reset image container to fixed positioning for animation (after info is hidden)
    if (isMobile && imageContainerRef.current) {
      tl.call(() => {
        if (imageContainerRef.current) {
          const rect = imageContainerRef.current.getBoundingClientRect();
          gsap.set(imageContainerRef.current, {
            position: "fixed",
            left: rect.left,
            top: rect.top,
            width: rect.width,
            height: rect.height,
            x: 0,
            y: 0,
            transform: "none",
          });
        }
      });
    }

    // Shrink image back to trigger position
    tl.to(
      imageContainerRef.current,
      {
        left: triggerRect.left,
        top: triggerRect.top,
        width: triggerRect.width,
        height: triggerRect.height,
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "power3.in",
      },
      "-=0.1"
    );

    // Fade out backdrop
    tl.to(
      backdropRef.current,
      {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      },
      "-=0.4"
    );
  };

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !infoItemsRef.current.includes(el)) {
      infoItemsRef.current.push(el);
    }
  };

  if (!isOpen) return null;

  return (
    <div ref={modalRef} className={styles.modal}>
      <div
        ref={backdropRef}
        className={styles.backdrop}
        onClick={handleClose}
      />

      <div className={styles.modalContent}>
        <div ref={imageContainerRef} className={styles.imageContainer}>
          <Image
            src={imageSrc}
            alt={title}
            fill
            className={styles.modalImage}
            placeholder={`data:image/svg+xml;base64,${toBase64(
              shimmer(700, 475)
            )}`}
            priority
          />

          {/* Navigation buttons */}
          {totalImages > 1 && (
            <>
              <button
                className={`${styles.navButton} ${styles.prevButton}`}
                onClick={onPrev}
              >
                ←
              </button>
              <button
                className={`${styles.navButton} ${styles.nextButton}`}
                onClick={onNext}
              >
                →
              </button>
            </>
          )}
        </div>

        <div ref={infoContainerRef} className={styles.infoContainer}>
          <button className={styles.closeButton} onClick={handleClose}>
            ×
          </button>

          <div className={styles.infoContent}>
            <div ref={addToRefs} className={styles.infoItem}>
              <h2 className={styles.title}>{title}</h2>
            </div>

            <div ref={addToRefs} className={styles.infoItem}>
              <div className={styles.infoSection}>
                <label className={styles.label}>SHOOT LOCATION:</label>
                <span className={styles.value}>{location}</span>
              </div>
            </div>

            <div ref={addToRefs} className={styles.infoItem}>
              <div className={styles.infoSection}>
                <label className={styles.label}>DESCRIPTION:</label>
                <p className={styles.description}>{description}</p>
              </div>
            </div>

            <div ref={addToRefs} className={styles.infoItem}>
              <div className={styles.infoSection}>
                <label className={styles.label}>PHOTOGRAPHY BY:</label>
                <span className={styles.value}>{photographer}</span>
              </div>
            </div>

            {totalImages > 1 && (
              <div ref={addToRefs} className={styles.infoItem}>
                <div className={styles.imageCounter}>
                  {imageIndex + 1} / {totalImages}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
