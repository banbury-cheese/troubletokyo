import Image from "next/image";
import styles from "./apparels.module.scss";
import Link from "next/link";
import Footer from "@/components/footer/footer";
import { getCollectionProducts } from "@/lib/shopify";
import type { Product } from "@/lib/shopify/types";
import { Menu } from "@headlessui/react";
import MenuNav from "@/components/MenuNav/MenuNav";

export default async function ApparelsPage() {
  const apparelItems = await getCollectionProducts({
    collection: "apparel",
  });

  return (
    <div className={styles.apparelPage}>
      <header className={styles.header}>
        <Image
          src="/images/apparels/cover.jpg"
          alt="Apparel Background"
          width={1512}
          height={945}
          className={styles.apparel_bgImage}
        />
        <MenuNav />
        <h1>APPAREL</h1>
      </header>
      <main className={styles.productList}>
        {apparelItems.map((product) => (
          <Link
            key={product.id}
            className={styles.productCard}
            href={`/apparel/${product.handle}`}
          >
            <div className={styles.productImageContainer}>
              <Image
                src={product.images[0].url}
                alt={`${product.title} closeup`}
                fill
                className={styles.productImageCloseup}
              />
              <Image
                src={product.images[1].url}
                alt={`${product.title} closeup`}
                width={250}
                height={250}
                className={styles.productImage}
              />
            </div>
            <h2 className={styles.productName}>{product.title}</h2>
            <p className={styles.productPrice}>
              {product.priceRange.maxVariantPrice.amount}
            </p>
          </Link>
        ))}
      </main>
      <Footer color="var(--darkRed)" />
    </div>
  );
}
