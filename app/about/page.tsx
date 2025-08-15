"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/all";
import styles from "./about.module.scss";
import Footer from "@/components/footer/footer";
import { Logo } from "@/components/logo";
import MenuNav from "@/components/MenuNav/MenuNav";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

export default function AboutPage() {
  const logoRef = useRef<HTMLDivElement>(null);
  const mainDescRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const italicRef = useRef<HTMLParagraphElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(
        [
          mainDescRef.current,
          descRef.current,
          italicRef.current,
          faqRef.current,
        ],
        {
          opacity: 0,
          y: 30,
        }
      );

      gsap.set(backgroundRef.current, {
        scale: 1.1,
        opacity: 0,
      });

      // Set initial states for logo animation
      gsap.set(".logo-outline", {
        drawSVG: 0,
      });
      gsap.set(".logo-text", {
        opacity: 0,
        y: 30,
      });
      gsap.set(logoRef.current, {
        opacity: 1, // Make sure logo container is visible
      });

      // Create main timeline
      const tl = gsap.timeline({ delay: 0.3 });

      // Animate background image
      tl.to(backgroundRef.current, {
        opacity: 0.3,
        scale: 1,
        duration: 1.5,
        ease: "power2.out",
      })
        // Animate logo outlines drawing
        .to(
          ".logo-outline",
          {
            drawSVG: "100%",
            duration: 2,
            ease: "power2.out",
            stagger: 0.2,
          },
          "-=1"
        )
        // Animate logo text appearing
        .to(
          ".logo-text",
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.1,
          },
          "-=0.5"
        )
        // Animate main description
        .to(
          mainDescRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.4"
        )
        // Animate other content with stagger
        .to(
          [descRef.current, italicRef.current],
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.2,
          },
          "-=0.2"
        )
        // Animate FAQ section
        .to(
          faqRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.2"
        );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.aboutPage}>
      {/* <Header />     */}

      <main className={styles.mainContent}>
        {/* Background Image Placeholder */}
        <div className={styles.backgroundImageContainer}>
          {/* Space for background image - you can add the image here */}
          <div ref={backgroundRef} className={styles.imagePlaceholder}>
            <Image
              src="/images/about/bg-cover.jpg"
              alt="About background"
              fill
              //   className={styles.sectionBg}
            />
          </div>
        </div>

        {/* Content Overlay */}
        <div className={styles.contentOverlay}>
          <MenuNav />

          {/* Main Content Area */}
          <div className={styles.mainContentArea}>
            {/* Trouble Logo */}
            <div className={styles.logoContainer}>
              <div ref={logoRef} className={styles.troubleLogo}>
                <Logo />
              </div>
            </div>

            {/* Main Text Content */}
            <div className={styles.textContent}>
              <p ref={mainDescRef} className={styles.mainDescription}>
                At the heart of every innovation is a Troublemaker, someone who
                dared to dream, challenged the status quo, and relentlessly
                forged a path that ultimately reshaped the world as we know it.
                Pursuing your dreams demands persistence to pave new roads,
                leading you to a future no one else has imagined.
              </p>

              <div className={styles.additionalContent}>
                <p ref={descRef} className={styles.description}>
                  TroubleTokyo is a multimedia platform that captures the
                  Japanese automotive scene from our unique perspective while
                  creating premium experiences and products.
                </p>

                <p ref={italicRef} className={styles.italicText}>
                  We pay homage to the icons and eras that shaped the past, all
                  while racing towards the future on full throttle.
                </p>
              </div>

              {/* FAQ Section */}
              {/* <div ref={faqRef} className={styles.faqSection}>
                <p className={styles.faqPrompt}>GOT A QUESTION? CLICK HERE:</p>
                <Link href="/returns" className={styles.faqLink}>
                  Returns Policy
                </Link>
              </div> */}
            </div>
          </div>

          <Footer color="var(--white)" />
        </div>
      </main>
    </div>
  );
}
