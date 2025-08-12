"use client";

import Image from "next/image";
import MenuNav from "@/components/MenuNav/MenuNav";
import styles from "./PageHeader.module.scss";

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
  return (
    <header className={styles.header}>
      <Image
        src={backgroundImage}
        alt={backgroundAlt}
        width={1512}
        height={945}
        className={styles.bgImage}
      />
      <MenuNav />
      <h1 className={styles.title}>{title}</h1>
    </header>
  );
}
