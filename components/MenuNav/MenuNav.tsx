"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./menuNav.module.scss";
import { BackIcon } from "../icons";

const menuItems = [
  { href: "/apparels", label: "Apparel" },
  { href: "/accessories", label: "Accessories" },
  { href: "/about", label: "About" },
  { href: "/media", label: "Media" },
  { href: "/faq", label: "FAQ" },
  { href: "/cart", label: "Cart" },
];

export default function MenuNav() {
  const pathname = usePathname();
  return (
    <div className={styles.menu}>
      <div className={styles.menu__backButton}>
        <BackIcon />
      </div>
      <div className={styles.menu__options}>
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`${styles.menu__option} ${
              pathname.startsWith(item.href) ? styles.menu__option_selected : ""
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
