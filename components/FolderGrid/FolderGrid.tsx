"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./FolderGrid.module.scss";

interface FolderItem {
  id: string;
  name: string;
  slug: string;
  image: string;
  description?: string;
}

interface FolderGridProps {
  folders: FolderItem[];
  basePath: string;
}

export default function FolderGrid({ folders, basePath }: FolderGridProps) {
  return (
    <main className={styles.folderGrid}>
      {folders.map((folder) => (
        <Link
          key={folder.id}
          className={styles.folderCard}
          href={`${basePath}/${folder.slug}`}
        >
          <div className={styles.folderImageContainer}>
            <Image
              src={folder.image}
              alt={folder.name}
              fill
              className={styles.folderImage}
            />
            <div className={styles.folderOverlay}>
              <div className={styles.folderIcon}>
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                </svg>
              </div>
            </div>
          </div>
          <h2 className={styles.folderName}>{folder.name}</h2>
          {folder.description && (
            <p className={styles.folderDescription}>{folder.description}</p>
          )}
        </Link>
      ))}
    </main>
  );
}
