"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import MenuNav from "@/components/MenuNav/MenuNav";
import styles from "./PageHeader.module.scss";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

// Register the plugin
gsap.registerPlugin(SplitText);

interface PageHeaderProps {
  title: string;
  backgroundImage: string;
  backgroundAlt: string;
}

export default function PageHeader({
  title,
  backgroundImage,
  backgroundAlt,
}: PageHeaderProps) {
  const headerRef = useRef<HTMLElement>(null);
  const bgImageRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    const bgImage = bgImageRef.current;
    const titleElement = titleRef.current;

    if (!header || !bgImage || !titleElement) return;

    // Create SplitText instance for the title
    const splitText = new SplitText(titleElement, {
      type: "chars",
      charsClass: "char",
    });

    // Set initial states
    gsap.set(bgImage, {
      opacity: 0,
      scale: 1.1,
    });

    gsap.set(splitText.chars, {
      opacity: 0,
      y: 100,
      rotationX: -90,
    });

    // Create timeline for coordinated animations
    const tl = gsap.timeline({
      delay: 0.1,
    });

    // Animate background image
    tl.to(bgImage, {
      opacity: 1,
      scale: 1,
      duration: 1.2,
      ease: "power2.out",
    })
      // Animate letters with stagger
      .to(
        splitText.chars.reverse(),
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.8,
          ease: "power4.inOut",
          stagger: {
            amount: 0.2,
            from: "start",
          },
        },
        0
      );

    // Cleanup function
    return () => {
      splitText.revert();
      tl.kill();
    };
  }, []);

  return (
    <header ref={headerRef} className={styles.header}>
      <Image
        ref={bgImageRef}
        src={backgroundImage}
        alt={backgroundAlt}
        width={1512}
        height={945}
        className={styles.bgImage}
      />
      <MenuNav />
      <h1 ref={titleRef} className={styles.title}>
        {title}
      </h1>
    </header>
  );
}
