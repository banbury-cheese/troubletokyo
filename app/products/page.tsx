import Footer from "@/components/footer/footer";
import PageHeader from "@/components/PageHeader/PageHeader";
import ProductGrid from "@/components/ProductGrid/ProductGrid";
import { getProducts } from "@/lib/shopify";
import styles from "./products.module.scss";

export default async function AllProductsPage() {
  const allProducts = await getProducts({});

  return (
    <div className={styles.productsPage}>
      <PageHeader
        title="PRODUCTS"
        backgroundImage="/images/all/cover.png"
        backgroundAlt="All Products Background"
      />
      <ProductGrid products={allProducts} basePath="" />
      <Footer color="var(--darkRed)" />
    </div>
  );
}
