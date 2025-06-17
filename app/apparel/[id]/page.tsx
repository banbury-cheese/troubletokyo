import Image from "next/image";
import Link from "next/link";
import styles from "./apparel.module.scss";
import { BackIcon } from "@/components/icons";
import Footer from "@/components/footer/footer";
import { Logo } from "@/components/logo";
import ImageCarousel from "@/components/imageCarousel/imageCarousel";

// This would typically come from your API or database
interface ApparelProduct {
  id: string;
  name: string;
  price: string;
  description: string;
  imageUrl: string;
  sizes: string[];
}

// Mock data - replace with actual data fetching
const getProduct = (id: string): ApparelProduct => {
  return {
    id: id,
    name: "CHICANO T-SHIRT",
    price: "$30 CAD",
    description:
      "Hvhndhsndvgjsfrbjsnfb nsLnbsFB HlSlBjssjbksnbl kLSlDbj djb sjf isbgjhso bgspsfahdvdrvaeughyobshgvbajv haOlwbvahviabfahuhvoaviahahhdhd",
    imageUrl: "/images/apparels/shirts/Chicano T-shirt/full.png",
    sizes: ["XS", "S", "M", "L", "XL", "2XL"],
  };
};

export default function ApparelProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = getProduct(params.id);

  return (
    <div className={styles.productPage}>
      {/* Header */}
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

      {/* Main Content */}
      <main className={styles.main}>
        <div className={styles.productContainer}>
          {/* Product Image */}
          <div className={styles.productImageSection}>
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={400}
              height={500}
              className={styles.productImage}
            />
          </div>

          {/* Product Details */}
          <div className={styles.productDetails}>
            <h1 className={styles.productTitle}>{product.name}</h1>
            <p className={styles.productPrice}>{product.price}</p>

            <div className={styles.productDescription}>
              <p>{product.description}</p>
              <p>
                Hvhndhsndvgjsfrbjsnfb nsLnbsFB HlSlBjssjbksnbl kLSlDbj djb sjf
                isbgjhso awfnangyeakengvanboamedbaewfnahndnvb;ONB0S
                NB0;WlOJEFlPGBNPNS FsvltEvJgbspsfadhvdrvaeughyobshgvbajv
                haOlwbvahviabfahuhvo
              </p>
            </div>

            {/* Size Selection */}
            <div className={styles.sizeSelection}>
              <div className={styles.sizeButtons}>
                {product.sizes.map((size) => (
                  <button key={size} className={styles.sizeButton}>
                    {size}
                  </button>
                ))}
              </div>
              <Link href="#" className={styles.sizeChart}>
                Sizing Chart / Reference
              </Link>
            </div>

            {/* Add to Cart Button */}
            <button className={styles.addToCartButton}>ADD TO CART</button>
          </div>
        </div>
      </main>

      <ImageCarousel />

      <Footer color="var(--black)" />
    </div>
  );
}
