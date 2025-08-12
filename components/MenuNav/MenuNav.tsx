"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { gsap } from "gsap";
import styles from "./menuNav.module.scss";
import { BackIcon } from "../icons";

const menuItems = [
  { href: "/apparels", label: "Apparel" },
  { href: "/accessories", label: "Accessories" },
  { href: "/about", label: "About" },
  { href: "/media", label: "Media" },
  { href: "/faq", label: "FAQ" },
];

export default function MenuNav() {
  const pathname = usePathname();

  useEffect(() => {
    // MenuNav link hover animations with scale and opacity effect
    const menuLinks = document.querySelectorAll(".menu-link");

    menuLinks.forEach((link) => {
      const handleMouseEnter = () => {
        gsap
          .to(link, {
            scale: 1.05,
            opacity: 0.8,
            duration: 0.2,
            ease: "power4.inOut",
          })
          .timeScale(3);
      };

      const handleMouseLeave = () => {
        gsap
          .to(link, {
            scale: 1,
            opacity: 1,
            duration: 0.2,
            ease: "power4.inOut",
          })
          .timeScale(3);
      };

      link.addEventListener("mouseenter", handleMouseEnter);
      link.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      menuLinks.forEach((link) => {
        link.removeEventListener("mouseenter", () => {});
        link.removeEventListener("mouseleave", () => {});
      });
    };
  }, []);

  return (
    <div className={styles.menu}>
      <Link href={"/"} className={styles.menu__backButton}>
        <BackIcon />
      </Link>
      <div className={styles.menu__options}>
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`${styles.menu__option} ${
              pathname.startsWith(item.href) ? styles.menu__option_selected : ""
            } menu-link`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
