import Footer from "@/components/footer/footer";
import PageHeader from "@/components/PageHeader/PageHeader";
import ProductGrid from "@/components/ProductGrid/ProductGrid";
import ShowAllButton from "@/components/ShowAllButton/ShowAllButton";
import { getCollectionProducts } from "@/lib/shopify";
import styles from "./apparels.module.scss";

export default async function ApparelsPage() {
  const apparelItems = await getCollectionProducts({
    collection: "apparel",
  });

  return (
    <div className={styles.apparelPage}>
      <PageHeader
        title="APPAREL"
        backgroundImage="/images/apparels/cover.jpg"
        backgroundAlt="Apparel Background"
      />
      <ProductGrid products={apparelItems} basePath="/apparel" />
      <ShowAllButton />
      <Footer color="var(--darkRed)" />
    </div>
  );
}
