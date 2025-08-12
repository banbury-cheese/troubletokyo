"use client";
import Link from "next/link";
import { useEffect } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import styles from "./header.module.scss";

gsap.registerPlugin(SplitText);
import { BackIcon } from "@/components/icons";
import { Logo } from "@/components/logo";

export default function Header() {
  useEffect(() => {
    // Header link hover animations with character-based opacity effect
    const headerLinks = document.querySelectorAll(".header-link");

    headerLinks.forEach((link) => {
      let linkChars = new SplitText(link, {
        type: "chars",
        charsClass: "char-header",
      });

      const handleMouseEnter = () => {
        const headerLinkAni = gsap
          .fromTo(
            linkChars.chars,
            { opacity: 1 },
            {
              stagger: 0.05,
              opacity: 0.7,
              duration: 0.5,
              ease: "power4.inOut",
            }
          )
          .timeScale(2);
      };

      const handleMouseLeave = () => {
        const headerLinkAni = gsap
          .to(linkChars.chars, {
            stagger: 0.05,
            opacity: 1,
            duration: 0.5,
            ease: "power4.inOut",
          })
          .timeScale(2);
      };

      link.addEventListener("mouseenter", handleMouseEnter);
      link.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      headerLinks.forEach((link) => {
        link.removeEventListener("mouseenter", () => {});
        link.removeEventListener("mouseleave", () => {});
      });
    };
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.navigation}>
        <Link href={"/"} className={styles.backButton}>
          <BackIcon />
        </Link>
        <div className={styles.logo}>
          <Link href="/">
            <Logo />
          </Link>
        </div>
        <nav className={styles.menu}>
          <Link href="/apparels" className={`${styles.menuItem} header-link`}>
            APPAREL
          </Link>
          <Link href="/media" className={`${styles.menuItem} header-link`}>
            MEDIA
          </Link>
          <Link
            href="/accessories"
            className={`${styles.menuItem} header-link`}
          >
            ACCESSORIES
          </Link>
          <Link href="/about" className={`${styles.menuItem} header-link`}>
            ABOUT
          </Link>
          <Link href="/cart" className={`${styles.menuItem} header-link`}>
            CART
          </Link>
        </nav>
      </div>
    </header>
  );
}
