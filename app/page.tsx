"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import styles from "./page.module.scss";
import { Logo } from "@/components/logo";
import { SoundOnIcon, SoundOffIcon } from "@/components/icons";
import Footer from "@/components/footer/footer";
import { DrawSVGPlugin } from "gsap/all";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(DrawSVGPlugin);

export default function Home() {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const videoOverlayRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set initial states
    gsap.set(".logo-outline", {
      // strokeDasharray: "100%",
      // strokeDashoffset: "100%",
      drawSVG: 0,
    });
    gsap.set(".logo-text", {
      opacity: 0,
      y: 30,
    });
    gsap.set(taglineRef.current, {
      opacity: 0,
      y: 10,
    });
    gsap.set(videoOverlayRef.current, {
      opacity: 1,
    });
    gsap.set(scrollIndicatorRef.current, {
      opacity: 0,
      y: 20,
    });

    // Create main timeline
    const tl = gsap.timeline({ delay: 0.5 });

    // Animate red outlines drawing
    tl.to(".logo-outline", {
      // strokeDashoffset: "0%",
      drawSVG: "100%",
      duration: 2,
      ease: "power2.out",
      stagger: 0.2,
    })
      // Animate white text appearing
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
      // Animate tagline
      .to(
        taglineRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0"
      )
      // Animate scroll indicator
      .to(
        scrollIndicatorRef.current,
        {
          opacity: 0.8,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.2"
      )
      // Fade out video overlay to reveal video
      .to(
        videoOverlayRef.current,
        {
          opacity: 0,
          duration: 1,
          ease: "power2.out",
        },
        "-=0.3"
      );

    // Logo hover animation setup
    const logoElement = logoRef.current;
    if (logoElement) {
      const handleMouseEnter = () => {
        // gsap.to(".logo-text", {
        //   fill: "#FF0000",
        //   duration: 0.3,
        //   ease: "power2.out",
        // });
        gsap.to(".logo-outline", {
          stroke: "#fff",
          duration: 0.3,
          ease: "power2.out",
        });
      };

      const handleMouseLeave = () => {
        // gsap.to(".logo-text", {
        //   fill: "#fff",
        //   duration: 0.3,
        //   ease: "power2.out",
        // });
        gsap.to(".logo-outline", {
          stroke: "#FF0000",
          duration: 0.3,
          ease: "power2.out",
        });
      };

      logoElement.addEventListener("mouseenter", handleMouseEnter);
      logoElement.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        logoElement.removeEventListener("mouseenter", handleMouseEnter);
        logoElement.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, []);

  useEffect(() => {
    // Section hover animations with character roll effect
    const hEffects = document.querySelectorAll(".h-effect");

    hEffects.forEach((effect) => {
      const texts = effect.querySelectorAll(
        ".h-item"
      ) as NodeListOf<HTMLElement>;

      if (texts.length >= 2) {
        let text1 = new SplitText(texts[0], {
          type: "chars",
          charsClass: "char",
        });

        let text2 = new SplitText(texts[1], {
          type: "chars",
          charsClass: "char",
        });

        let menuHoverAni = gsap
          .timeline({
            paused: true,
            defaults: { duration: 0.5, stagger: 0.025, ease: "power1.out" },
          })
          .fromTo(
            text1.chars,
            { opacity: 1 },
            {
              yPercent: -100,
              opacity: 0,
            }
          )
          .fromTo(
            text2.chars,
            { opacity: 0 },
            {
              yPercent: -100,
              opacity: 1,
            },
            0
          )
          .timeScale(1);

        const sectionLink = effect.closest(".section-link");
        if (sectionLink) {
          const handleMouseEnter = () => {
            menuHoverAni.restart();

            // Image scale animation
            const image = sectionLink.querySelector("img");
            if (image) {
              gsap.to(image, {
                scale: 1.05,
                duration: 0.3,
                ease: "power2.out",
              });
            }
          };

          const handleMouseLeave = () => {
            // Reset character animation
            gsap.set(text1.chars, {
              yPercent: 0,
              opacity: 1,
              duration: 0.3,
              ease: "power2.out",
            });
            gsap.set(text2.chars, {
              yPercent: 0,
              opacity: 0,
              duration: 0.3,
              ease: "power2.out",
            });
            // menuHoverAni.progress(0);

            // Reset image scale
            const image = sectionLink.querySelector("img");
            if (image) {
              gsap.to(image, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out",
              });
            }
          };

          sectionLink.addEventListener("mouseenter", handleMouseEnter);
          sectionLink.addEventListener("mouseleave", handleMouseLeave);
        }
      }
    });

    return () => {
      hEffects.forEach((effect) => {
        const sectionLink = effect.closest(".section-link");
        if (sectionLink) {
          sectionLink.removeEventListener("mouseenter", () => {});
          sectionLink.removeEventListener("mouseleave", () => {});
        }
      });
    };
  }, []);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  const scrollToContent = () => {
    const sectionsGrid = document.querySelector(`.${styles.sectionsGrid}`);
    if (sectionsGrid) {
      sectionsGrid.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className={styles.container}>
      {/* Sound Toggle Button */}
      <button
        className={styles.soundToggle}
        onClick={toggleSound}
        aria-label={isMuted ? "Turn sound on" : "Turn sound off"}
      >
        {isMuted ? <SoundOffIcon /> : <SoundOnIcon />}
      </button>

      {/* Hero Section */}
      <section className={styles.hero}>
        <video
          ref={videoRef}
          className={styles.heroVideo}
          autoPlay
          muted
          loop
          playsInline
        >
          <source
            src="/videos/landingPage/TroubleDriftmp4.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <div ref={videoOverlayRef} className={styles.videoOverlay} />
        <div className={styles.heroContent}>
          <div ref={logoRef} className={styles.logo}>
            <Logo />
          </div>
          <p ref={taglineRef} className={styles.tagline}>
            {/* Trust in Trouble */}
          </p>
        </div>

        {/* Scroll Down Indicator */}
        <div
          ref={scrollIndicatorRef}
          className={styles.scrollIndicator}
          onClick={scrollToContent}
        >
          <div className={styles.scrollArrow}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M7 10L12 15L17 10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className={styles.scrollText}>SCROLL</span>
        </div>
      </section>

      {/* Navigation Sections */}
      <div className={styles.sectionsGrid}>
        {/* Apparel Section */}
        {/* <Link href="/apparels" className={`${styles.section} section-link`}>
          <div className={styles.sectionContent}>
            <div className={`${styles.sectionTitle} section-title h-effect`}>
              <h2 className="h-item">APPAREL</h2>
              <h2 className="h-item">APPAREL</h2>
            </div>
          </div>
          <Image
            src="/images/landingPage/apparel.jpg"
            alt="Apparel section"
            fill
            className={styles.sectionBg}
          />
        </Link> */}

        {/* All Section */}
        <Link href="/products" className={`${styles.section} section-link`}>
          <div className={styles.sectionContent}>
            <div className={`${styles.sectionTitle} section-title h-effect`}>
              <h2 className="h-item">PRODUCTS</h2>
              <h2 className="h-item">PRODUCTS</h2>
            </div>
          </div>
          <Image
            src="/images/landingPage/all.jpg"
            alt="Accessories section"
            fill
            className={styles.sectionBg}
          />
        </Link>

        {/* Media Section */}
        <Link href="/media" className={`${styles.section} section-link`}>
          <div className={styles.sectionContent}>
            <div className={`${styles.sectionTitle} section-title h-effect`}>
              <h2 className="h-item">MEDIA</h2>
              <h2 className="h-item">MEDIA</h2>
            </div>
          </div>
          <Image
            src="/images/landingPage/media.jpg"
            alt="Media section"
            fill
            className={styles.sectionBg}
          />
        </Link>

        {/* About Section */}
        <Link href="/about" className={`${styles.section} section-link`}>
          <div className={styles.sectionContent}>
            <div className={`${styles.sectionTitle} section-title h-effect`}>
              <h2 className="h-item">ABOUT</h2>
              <h2 className="h-item">ABOUT</h2>
            </div>
          </div>
          <Image
            src="/images/landingPage/about.jpg"
            alt="About section"
            fill
            className={styles.sectionBg}
          />
        </Link>
      </div>

      <Footer color="var(--white)" />
    </div>
  );
}
