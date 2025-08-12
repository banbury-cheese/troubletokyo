import Footer from "@/components/footer/footer";
import PageHeader from "@/components/PageHeader/PageHeader";
import ProductGrid from "@/components/ProductGrid/ProductGrid";
import { getCollectionProducts } from "@/lib/shopify";
import styles from "./keychains.module.scss";

export default async function KeychainsPage() {
  const keychainItems = await getCollectionProducts({
    collection: "keychains",
  });

  return (
    <div className={styles.keychainsPage}>
      <PageHeader
        title="KEYCHAINS"
        backgroundImage="/images/accessories/keychains/cover.jpg"
        backgroundAlt="Keychains Background"
      />
      <ProductGrid products={keychainItems} basePath="/accessories/keychains" />
      <Footer color="var(--darkRed)" />
    </div>
  );
}
