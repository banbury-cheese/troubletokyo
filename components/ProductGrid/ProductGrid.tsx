"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./ProductGrid.module.scss";
import type { Product } from "@/lib/shopify/types";
import Price from "../price";

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
  const collectionHandles = product.collections.map(collection => collection.handle.toLowerCase());
  
  // Check collections first (more reliable than tags)
  if (collectionHandles.includes('apparel') || collectionHandles.includes('clothing')) {
    return `/apparel/${product.handle}`;
  } else if (collectionHandles.includes('stickers') || collectionHandles.includes('sticker')) {
    return `/accessories/stickers/${product.handle}`;
  } else if (collectionHandles.includes('plates') || collectionHandles.includes('plate')) {
    return `/accessories/plates/${product.handle}`;
  }
  
  // Fallback to tags if collections don't match
  const tags = product.tags.map(tag => tag.toLowerCase());
  
  if (tags.includes('apparel') || tags.includes('clothing') || tags.includes('shirt') || tags.includes('hoodie')) {
    return `/apparel/${product.handle}`;
  } else if (tags.includes('stickers') || tags.includes('sticker')) {
    return `/accessories/stickers/${product.handle}`;
  } else if (tags.includes('plates') || tags.includes('plate')) {
    return `/accessories/plates/${product.handle}`;
  }
  
  // Default fallback - check if it might be an accessory
  if (tags.some(tag => ['accessory', 'accessories'].includes(tag))) {
    return `/accessories/${product.handle}`;
  }
  
  // Final fallback
  return `/apparel/${product.handle}`;
}

export default function ProductGrid({ products, basePath }: ProductGridProps) {
  console.log("basePath:", basePath);

  return (
    <main className={styles.productGrid}>
      {products.map((product) => {
        const productPath = getProductPath(product, basePath);
        
        return (
          <Link
            key={product.id}
            className={styles.productCard}
            href={productPath}
          >
            {basePath === "/apparel" ? (
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
