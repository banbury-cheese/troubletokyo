import Link from "next/link";
import styles from "./header.module.scss";
import { BackIcon } from "@/components/icons";
import { Logo } from "@/components/logo";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.navigation}>
        <div className={styles.backButton}>
          <BackIcon />
        </div>
        <div className={styles.logo}>
          <Link href="/">
            <Logo />
          </Link>
        </div>
        <nav className={styles.menu}>
          <Link href="/apparels" className={styles.menuItem}>
            APPAREL
          </Link>
          <Link href="/media" className={styles.menuItem}>
            MEDIA
          </Link>
          <Link href="/accessories" className={styles.menuItem}>
            ACCESSORIES
          </Link>
          <Link href="/about" className={styles.menuItem}>
            ABOUT
          </Link>
          <Link href="/cart" className={styles.menuItem}>
            CART
          </Link>
        </nav>
      </div>
    </header>
  );
}
