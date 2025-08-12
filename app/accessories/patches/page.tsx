import Footer from "@/components/footer/footer";
import PageHeader from "@/components/PageHeader/PageHeader";
import ProductGrid from "@/components/ProductGrid/ProductGrid";
import { getCollectionProducts } from "@/lib/shopify";
import styles from "./patches.module.scss";

export default async function PatchesPage() {
  const patchItems = await getCollectionProducts({
    collection: "patches",
  });

  return (
    <div className={styles.patchesPage}>
      <PageHeader
        title="PATCHES"
        backgroundImage="/images/accessories/patches/cover.jpg"
        backgroundAlt="Patches Background"
      />
      <ProductGrid products={patchItems} basePath="/accessories/patches" />
      <Footer color="var(--darkRed)" />
    </div>
  );
}
