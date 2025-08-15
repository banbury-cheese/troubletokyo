"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./ProductGrid.module.scss";
import type { Product } from "@/lib/shopify/types";
import Price from "../price";
import { gsap } from "gsap";

interface ProductGridProps {
  products: Product[];
  basePath: string;
}

function getProductPath(product: Product, basePath: string): string {
  // If basePath is provided, use it directly
  if (basePath) {
    return `${basePath}/${product.handle}`;
  }

  // For "show all" page (empty basePath), determine path based on product collections
  const collectionHandles = product.collections.map((collection) =>
    collection.handle.toLowerCase()
  );

  // Check collections first (more reliable than tags)
  if (
    collectionHandles.includes("apparel") ||
    collectionHandles.includes("clothing")
  ) {
    return `/apparel/${product.handle}`;
  } else if (
    collectionHandles.includes("stickers") ||
    collectionHandles.includes("sticker")
  ) {
    return `/accessories/stickers/${product.handle}`;
  } else if (
    collectionHandles.includes("plates") ||
    collectionHandles.includes("plate")
  ) {
    return `/accessories/plates/${product.handle}`;
  } else if (collectionHandles.includes("car")) {
    return `/car/${product.handle}`;
  }

  // Fallback to tags if collections don't match
  const tags = product.tags.map((tag) => tag.toLowerCase());

  if (
    tags.includes("apparel") ||
    tags.includes("clothing") ||
    tags.includes("shirt") ||
    tags.includes("hoodie")
  ) {
    return `/apparel/${product.handle}`;
  } else if (tags.includes("stickers") || tags.includes("sticker")) {
    return `/accessories/stickers/${product.handle}`;
  } else if (tags.includes("plates") || tags.includes("plate")) {
    return `/accessories/plates/${product.handle}`;
  }

  // Default fallback - check if it might be an accessory
  if (tags.some((tag) => ["accessory", "accessories"].includes(tag))) {
    return `/accessories/${product.handle}`;
  }

  // Final fallback
  return `/apparel/${product.handle}`;
}

// Helper function to check if a product is apparel
function isApparelProduct(product: Product): boolean {
  const collectionHandles = product.collections.map((collection) =>
    collection.handle.toLowerCase()
  );
  const tags = product.tags.map((tag) => tag.toLowerCase());

  // Check collections first
  if (
    collectionHandles.includes("apparel") ||
    collectionHandles.includes("clothing")
  ) {
    return true;
  }

  // Fallback to tags
  if (
    tags.includes("apparel") ||
    tags.includes("clothing") ||
    tags.includes("shirt") ||
    tags.includes("hoodie")
  ) {
    return true;
  }

  return false;
}

// Helper function to get product category for sorting
function getProductCategory(product: Product): number {
  const collectionHandles = product.collections.map((collection) =>
    collection.handle.toLowerCase()
  );
  const tags = product.tags.map((tag) => tag.toLowerCase());

  // Car first
  if (collectionHandles.includes("car")) {
    return 0; // Car first
  }

  // Apparel next
  if (
    collectionHandles.includes("apparel") ||
    collectionHandles.includes("clothing")
  ) {
    return 1; // Apparel second
  } else if (
    collectionHandles.includes("plates") ||
    collectionHandles.includes("plate")
  ) {
    return 2; // Plates third
  } else if (
    collectionHandles.includes("stickers") ||
    collectionHandles.includes("sticker")
  ) {
    return 3; // Stickers fourth
  }

  // Fallback to tags
  if (tags.includes("car")) {
    return 0; // Car first (by tag)
  } else if (
    tags.includes("apparel") ||
    tags.includes("clothing") ||
    tags.includes("shirt") ||
    tags.includes("hoodie")
  ) {
    return 1; // Apparel second
  } else if (tags.includes("plates") || tags.includes("plate")) {
    return 2; // Plates third
  } else if (tags.includes("stickers") || tags.includes("sticker")) {
    return 3; // Stickers fourth
  }

  return 4; // Everything else last
}

export default function ProductGrid({ products, basePath }: ProductGridProps) {
  console.log("basePath:", basePath);
  const gridRef = useRef<HTMLElement>(null);

  // Sort products: apparel first, then plates, then stickers, then everything else
  const sortedProducts = [...products].sort((a, b) => {
    const categoryA = getProductCategory(a);
    const categoryB = getProductCategory(b);
    return categoryA - categoryB;
  });

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const productCards = grid.querySelectorAll(`.${styles.productCard}`);

    // Set initial states
    gsap.set(productCards, {
      opacity: 0,
      y: 50,
      scale: 0.9,
    });

    // Create timeline for staggered animation
    const tl = gsap.timeline({
      delay: 0.2,
    });

    // Animate cards with stagger
    tl.to(productCards, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      ease: "power2.out",
      stagger: {
        amount: 0.8,
        grid: "auto",
        from: "start",
      },
    });

    // Add hover animations after cards are revealed
    tl.call(() => {
      productCards.forEach((card) => {
        const cardElement = card as HTMLElement;
        const imageContainer = cardElement.querySelector(
          `.${styles.productImageContainer}`
        );
        const productName = cardElement.querySelector(`.${styles.productName}`);
        const productPrice = cardElement.querySelector(
          `.${styles.productPrice}`
        );

        // Mouse enter animation
        const handleMouseEnter = () => {
          gsap.to(cardElement, {
            // y: -8,
            // scale: 1.02,
            // duration: 0.3,
            // ease: "power2.out",
          });

          if (imageContainer) {
            gsap.to(imageContainer, {
              scale: 1.05,
              duration: 0.4,
              ease: "power2.out",
            });
          }

          if (productName) {
            // gsap.to(productName, {
            //   y: -2,
            //   duration: 0.3,
            //   ease: "power2.out",
            // });
          }

          if (productPrice) {
            // gsap.to(productPrice, {
            //   y: -2,
            //   duration: 0.3,
            //   ease: "power2.out",
            // });
          }
        };

        // Mouse leave animation
        const handleMouseLeave = () => {
          gsap.to(cardElement, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });

          if (imageContainer) {
            gsap.to(imageContainer, {
              scale: 1,
              duration: 0.4,
              ease: "power2.out",
            });
          }

          if (productName) {
            gsap.to(productName, {
              y: 0,
              duration: 0.3,
              ease: "power2.out",
            });
          }

          if (productPrice) {
            gsap.to(productPrice, {
              y: 0,
              duration: 0.3,
              ease: "power2.out",
            });
          }
        };

        // Add event listeners
        cardElement.addEventListener("mouseenter", handleMouseEnter);
        cardElement.addEventListener("mouseleave", handleMouseLeave);

        // Store cleanup functions
        (cardElement as any).__cleanupHover = () => {
          cardElement.removeEventListener("mouseenter", handleMouseEnter);
          cardElement.removeEventListener("mouseleave", handleMouseLeave);
        };
      });
    });

    // Cleanup function
    return () => {
      // Clean up hover event listeners
      productCards.forEach((card) => {
        if ((card as any).__cleanupHover) {
          (card as any).__cleanupHover();
        }
      });
      tl.kill();
    };
  }, [sortedProducts]);

  return (
    <main ref={gridRef} className={styles.productGrid}>
      {sortedProducts.map((product) => {
        const productPath = getProductPath(product, basePath);
        const isApparel = isApparelProduct(product);

        return (
          <Link
            key={product.id}
            className={styles.productCard}
            href={productPath}
          >
            {isApparel ? (
              <div className={styles.productImageContainer}>
                <Image
                  src={product.images[0].url}
                  alt={`${product.title} closeup`}
                  fill
                  className={styles.productImageCloseup}
                />
                <Image
                  src={product.images[1]?.url || product.images[2].url}
                  alt={`${product.title} closeup`}
                  width={250}
                  height={250}
                  className={styles.productImage}
                />
              </div>
            ) : (
              <div className={styles.productImageContainer}>
                <Image
                  src={product.images[0].url}
                  alt={`${product.title} closeup`}
                  fill
                  className={styles.productImageCloseup}
                />
              </div>
            )}
            <h2 className={styles.productName}>{product.title}</h2>
            {/* <p className={styles.productPrice}> */}
            <Price
              className={styles.productPrice}
              amount={product.priceRange.maxVariantPrice.amount}
              currencyCode={product.priceRange.maxVariantPrice.currencyCode}
            />
            {/* </p> */}
          </Link>
        );
      })}
    </main>
  );
}
