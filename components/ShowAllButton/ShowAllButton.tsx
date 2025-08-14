import Link from "next/link";
import styles from "./ShowAllButton.module.scss";

export default function ShowAllButton() {
  return (
    <div className={styles.showAllContainer}>
      <Link href="/products" className={styles.showAllButton}>
        SHOW ALL PRODUCTS
      </Link>
    </div>
  );
}
