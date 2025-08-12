import Footer from "@/components/footer/footer";
import PageHeader from "@/components/PageHeader/PageHeader";
import ProductGrid from "@/components/ProductGrid/ProductGrid";
import { getCollectionProducts } from "@/lib/shopify";
import styles from "./plates.module.scss";

export default async function PlatesPage() {
  const plateItems = await getCollectionProducts({ collection: "plates" });

  return (
    <div className={styles.platesPage}>
      <PageHeader
        title="PLATES"
        backgroundImage="/images/accessories/plates/cover.png"
        backgroundAlt="Plates Background"
      />
      <ProductGrid products={plateItems} basePath="/accessories/plates" />
      <Footer color="var(--darkRed)" />
    </div>
  );
}
