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

export default function ProductGrid({ products, basePath }: ProductGridProps) {
  console.log("basePath:", basePath);

  return (
    <main className={styles.productGrid}>
      {products.map((product) => (
        <Link
          key={product.id}
          className={styles.productCard}
          href={`${basePath}/${product.handle}`}
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
      ))}
    </main>
  );
}
