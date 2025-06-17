"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import styles from "./imageCarousel.module.scss";

if (typeof window !== "undefined") {
  gsap.registerPlugin(Draggable);
}

interface CarouselImage {
  id: number;
  src: string;
  alt: string;
}

const images: CarouselImage[] = [
  {
    id: 1,
    src: "/images/apparels/shirts/Advan T-shirt/closeup.jpg",
    alt: "Carousel Image 1",
  },
  {
    id: 2,
    src: "/images/apparels/shirts/Chicano T-shirt/closeup.png",
    alt: "Carousel Image 2",
  },
  {
    id: 3,
    src: "/images/apparels/shirts/FC t-shirt/closeup.png",
    alt: "Carousel Image 3",
  },
  {
    id: 4,
    src: "/images/apparels/shirts/Rarri T-shirt/closeup.png",
    alt: "Carousel Image 4",
  },
  {
    id: 5,
    src: "/images/apparels/shirts/TE 37 T-shirt/closeup.png",
    alt: "Carousel Image 5",
  },
  {
    id: 6,
    src: "/images/apparels/shirts/Advan T-shirt/closeup.jpg",
    alt: "Carousel Image 6",
  },
  {
    id: 7,
    src: "/images/apparels/shirts/Chicano T-shirt/closeup.png",
    alt: "Carousel Image 7",
  },
  {
    id: 8,
    src: "/images/apparels/shirts/FC t-shirt/closeup.png",
    alt: "Carousel Image 8",
  },
  {
    id: 9,
    src: "/images/apparels/shirts/Rarri T-shirt/closeup.png",
    alt: "Carousel Image 9",
  },
  {
    id: 10,
    src: "/images/apparels/shirts/TE 37 T-shirt/closeup.png",
    alt: "Carousel Image 10",
  },
];

export default function ImageCarousel() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLUListElement>(null);
  const dragProxyRef = useRef<HTMLDivElement>(null);
  const animationRefs = useRef<any>({});

  useEffect(() => {
    if (!cardsRef.current || typeof window === "undefined") return;

    /**
     * SEAMLESS INFINITE CAROUSEL SETUP
     * Based on GSAP's seamless loop demo - creates an infinite draggable carousel
     * without scroll trigger functionality, only drag interactions
     */

    // Counter for infinite loop iterations - tracks how many complete cycles we've gone through
    let iteration = 0;

    // Set initial state of all carousel cards (hidden and positioned off-screen)
    gsap.set(".carousel-card", { xPercent: 400, scale: 0.4, opacity: 0.5 });

    // Configuration constants
    const spacing = 0.1; // Time spacing between card animations (stagger)
    const snapTime = gsap.utils.snap(spacing); // Utility to snap playhead to nearest card position
    const cards = gsap.utils.toArray(".carousel-card"); // Get all carousel card elements

    /**
     * Animation function for each card
     * Creates a timeline that handles the card's appearance, movement, and disappearance
     * @param element - The DOM element to animate
     * @returns GSAP timeline for the element
     */
    const animateFunc = (element: any) => {
      const tl = gsap.timeline();

      // Scale and fade animation (appears, reaches full size, then disappears)
      tl.fromTo(
        element,
        { scale: 0.4, opacity: 0.5 },
        {
          scale: 1,
          opacity: 1,
          zIndex: 100,
          duration: 0.5,
          yoyo: true, // Reverses the animation (scale back to 0)
          repeat: 1, // Repeats once (so it plays forward, then backward)
          ease: "power1.in",
          immediateRender: false,
        }
      )
        // Horizontal movement animation (moves from right to left across screen)
        .fromTo(
          element,
          { xPercent: 400 }, // Starts 400% to the right (off-screen)
          {
            xPercent: -400, // Ends 400% to the left (off-screen)
            duration: 1,
            ease: "none",
            immediateRender: true,
          },
          0 // Starts at the same time as the scale animation
        );

      return tl;
    };

    /**
     * Creates a seamless infinite loop timeline
     * This is the core function that enables infinite scrolling without visible seams
     * @param items - Array of DOM elements to animate
     * @param spacing - Time spacing between animations
     * @param animateFunc - Function that returns animation for each item
     * @returns Seamless loop timeline
     */
    const buildSeamlessLoop = (
      items: any[],
      spacing: number,
      animateFunc: Function
    ) => {
      // Raw sequence contains all the actual animations
      let rawSequence = gsap.timeline({ paused: true });

      // Seamless loop controls the playhead of rawSequence for infinite looping
      let seamlessLoop = gsap.timeline({
        paused: true,
        repeat: -1, // Infinite repeat
        onRepeat() {
          // Bug fix for GSAP edge case
          this._time === this._dur && (this._tTime += this._dur - 0.01);
        },
        onReverseComplete() {
          // Enables seamless backwards looping
          this.totalTime(this.rawTime() + this.duration() * 100);
        },
      });

      let cycleDuration = spacing * items.length; // Duration for one complete cycle
      let dur: number = 0; // Duration of individual animation

      // Create 3 cycles of animations (beginning buffer, main cycle, end buffer)
      // This allows seamless looping by having extra animations at start/end
      items
        .concat(items) // Add second cycle
        .concat(items) // Add third cycle
        .forEach((item, i) => {
          let anim = animateFunc(items[i % items.length]); // Use modulo to reference original items
          rawSequence.add(anim, i * spacing); // Add animation to timeline with stagger
          dur || (dur = anim.duration()); // Store duration of first animation
        });

      // Set up the seamless loop playhead animation
      // This animates from start of second cycle to end of second cycle
      // The first and third cycles act as buffers for seamless wrapping
      seamlessLoop.fromTo(
        rawSequence,
        {
          time: cycleDuration + dur / 2, // Start at beginning of second cycle
        },
        {
          time: "+=" + cycleDuration, // Animate through one complete cycle
          duration: cycleDuration,
          ease: "none",
        }
      );

      return seamlessLoop;
    };

    // Create the seamless loop timeline
    const seamlessLoop = buildSeamlessLoop(cards, spacing, animateFunc);

    // Playhead proxy object - allows infinite offset values while wrapping timeline time
    const playhead = { offset: 0 };

    // Utility to wrap any time value to valid timeline duration
    const wrapTime = gsap.utils.wrap(0, seamlessLoop.duration());

    /**
     * Scrub animation - smoothly updates the seamless loop timeline
     * This tween is reused for performance instead of creating new tweens
     */
    const scrub = gsap.to(playhead, {
      offset: 0,
      onUpdate() {
        // Convert infinite offset to valid timeline time
        seamlessLoop.time(wrapTime(playhead.offset));
      },
      duration: 0.5,
      ease: "power3",
      paused: true,
    });

    /**
     * Snaps playhead to nearest card position and updates animation
     * @param offset - Target offset position
     */
    const scrollToOffset = (offset: number) => {
      let snappedTime = snapTime(offset); // Snap to nearest card position
      scrub.vars.offset = snappedTime; // Update scrub target
      scrub.invalidate().restart(); // Restart scrub animation
    };

    /**
     * DRAG FUNCTIONALITY
     * Enables touch and mouse dragging to control carousel
     */
    const draggable = Draggable.create(dragProxyRef.current, {
      type: "x", // Only horizontal dragging
      trigger: cardsRef.current, // Drag area is the cards container

      onPress() {
        // Store starting offset when drag begins
        this.startOffset = scrub.vars.offset;
      },

      onDrag() {
        // Update offset based on drag distance
        // The 0.001 multiplier controls drag sensitivity
        scrub.vars.offset = this.startOffset + (this.startX - this.x) * 0.0005;
        scrub.invalidate().restart(); // Update animation immediately
      },

      onDragEnd() {
        // Snap to nearest card when drag ends
        scrollToOffset(scrub.vars.offset);
      },
    });

    // Store animation references for cleanup
    animationRefs.current = { scrub, seamlessLoop, draggable };

    // Cleanup function - prevents memory leaks
    return () => {
      scrub.kill();
      seamlessLoop.kill();
      if (draggable[0]) draggable[0].kill();
    };
  }, []);

  return (
    <div className={styles.carouselSection}>
      <div ref={galleryRef} className={styles.gallery}>
        <ul ref={cardsRef} className={styles.cards}>
          {images.map((image) => (
            <li key={image.id} className={`${styles.card} carousel-card`}>
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className={styles.cardImage}
                sizes="300px"
              />
            </li>
          ))}
        </ul>
        {/* Hidden element that acts as drag proxy for better performance */}
        <div ref={dragProxyRef} className={styles.dragProxy}></div>
      </div>
    </div>
  );
}
