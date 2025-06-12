"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.scss";
import { Logo, FooterLogo } from "@/components/logo";
import { SoundOnIcon, SoundOffIcon } from "@/components/icons";

export default function Home() {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
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
        <div className={styles.heroContent}>
          <div className={styles.logo}>
            <Logo />
          </div>
          <p className={styles.tagline}>Trust in Trouble</p>
        </div>
        {/* Add hero background image here */}
      </section>

      {/* Navigation Sections */}
      <div className={styles.sectionsGrid}>
        {/* Apparel Section */}
        <Link href="/products" className={styles.section}>
          <div className={styles.sectionContent}>
            <h2 className={styles.sectionTitle}>APPAREL</h2>
          </div>
          <Image
            src="/images/landingPage/apparel.jpg"
            alt="About background"
            fill
            className={styles.sectionBg}
          />
        </Link>

        {/* Media Section */}
        <Link href="/media" className={styles.section}>
          <div className={styles.sectionContent}>
            <h2 className={styles.sectionTitle}>MEDIA</h2>
          </div>
          <Image
            src="/images/landingPage/media.jpg"
            alt="About background"
            fill
            className={styles.sectionBg}
          />
        </Link>

        {/* Accessories Section */}
        <Link href="/accessories" className={styles.section}>
          <div className={styles.sectionContent}>
            <h2 className={styles.sectionTitle}>ACCESSORIES</h2>
          </div>
          <Image
            src="/images/landingPage/accessories.jpg"
            alt="About background"
            fill
            className={styles.sectionBg}
          />
        </Link>

        {/* About Section */}
        <Link href="/about" className={styles.section}>
          <div className={styles.sectionContent}>
            <h2 className={styles.sectionTitle}>ABOUT</h2>
          </div>
          <Image
            src="/images/landingPage/about.jpg"
            alt="About background"
            fill
            className={styles.sectionBg}
          />{" "}
        </Link>
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerLeft}>
            <FooterLogo />
          </div>
          <div className={styles.footerRight}>
            <Link href="/contact" className={styles.footerLink}>
              CONTACT
            </Link>
            <Link href="/instagram" className={styles.footerLink}>
              INSTAGRAM
            </Link>
            <Link href="/media" className={styles.footerLink}>
              MEDIA
            </Link>
            <Link href="/culture" className={styles.footerLink}>
              CULTURE
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
