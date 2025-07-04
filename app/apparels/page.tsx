import Image from "next/image";
import styles from "./apparels.module.scss";
import Link from "next/link";
import { BackIcon } from "@/components/icons";
import Footer from "@/components/footer/footer";
import { getCollectionProducts } from "@/lib/shopify";
import type { Product } from "@/lib/shopify/types";


// Define an interface for your product data
// interface Product {
//   id: number;
//   name: string;
//   price: string;
//   imageUrl: string;
//   closeupUrl: string;
//   imageAlt: string;
// }

// Sample product data - replace with your actual data
// const products: Product[] = [
//   {
//     id: 1,
//     name: "ADVAN T-SHIRT",
//     price: "$30 CAD",
//     imageUrl: "/images/apparels/shirts/Advan T-shirt/full.png",
//     closeupUrl: "/images/apparels/shirts/Advan T-shirt/closeup.jpg",
//     imageAlt: "Advan T-Shirt",
//   },
//   {
//     id: 2,
//     name: "CHICANO T-SHIRT",
//     price: "$30 CAD",
//     imageUrl: "/images/apparels/shirts/Chicano T-shirt/full.png",
//     closeupUrl: "/images/apparels/shirts/Chicano T-shirt/closeup.png",
//     imageAlt: "Chicano T-Shirt",
//   },
//   {
//     id: 3,
//     name: "FC T-SHIRT",
//     price: "$30 CAD",
//     imageUrl: "/images/apparels/shirts/FC t-shirt/full.png",
//     closeupUrl: "/images/apparels/shirts/FC t-shirt/closeup.png",
//     imageAlt: "FC T-Shirt",
//   },
//   {
//     id: 4,
//     name: "RARRI T-SHIRT",
//     price: "$30 CAD",
//     imageUrl: "/images/apparels/shirts/Rarri T-shirt/full.png",
//     closeupUrl: "/images/apparels/shirts/Rarri T-shirt/closeup.png",
//     imageAlt: "Rarri T-Shirt",
//   },
//   {
//     id: 5,
//     name: "TE 37 T-SHIRT",
//     price: "$30 CAD",
//     imageUrl: "/images/apparels/shirts/TE 37 T-shirt/full.png",
//     closeupUrl: "/images/apparels/shirts/TE 37 T-shirt/closeup.png",
//     imageAlt: "TE 37 T-Shirt",
//   },
//   {
//     id: 6,
//     name: "COLLEGIATE HOODIE",
//     price: "$60 CAD",
//     imageUrl: "/images/apparels/shirts/Collegiate Hoodie/full.png",
//     closeupUrl: "/images/apparels/shirts/Collegiate Hoodie/closeup.png",
//     imageAlt: "Collegiate Hoodie",
//   },
// ];

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
        <div className={styles.menu}>
          <div className={styles.menu__backButton}>
            <BackIcon />
          </div>
          <div className={styles.menu__options}>
            <Link
              href="/apparels"
              className={`${styles.menu__option} ${styles.menu__option_selected}`}
            >
              Apparel
            </Link>
            <Link href="/accessories" className={styles.menu__option}>
              Accessories
            </Link>
            <Link href="/about" className={styles.menu__option}>
              About
            </Link>
            <Link href="/media" className={styles.menu__option}>
              Media
            </Link>
            <Link href="/cart" className={styles.menu__option}>
              Cart
            </Link>
          </div>
        </div>
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
