import Footer from "@/components/footer/footer";
import PageHeader from "@/components/PageHeader/PageHeader";
import ProductGrid from "@/components/ProductGrid/ProductGrid";
import { getCollectionProducts } from "@/lib/shopify";
import styles from "./stickers.module.scss";

export default async function StickersPage() {
  const stickerItems = await getCollectionProducts({
    collection: "stickers",
  });

  return (
    <div className={styles.stickersPage}>
      <PageHeader
        title="STICKERS"
        backgroundImage="/images/carousel/stickers/1.webp"
        backgroundAlt="Stickers Background"
      />
      <ProductGrid products={stickerItems} basePath="/accessories/stickers" />
      <Footer color="var(--darkRed)" />
    </div>
  );
}
