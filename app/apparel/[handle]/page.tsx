// import Image from "next/image";
import Link from "next/link";
import styles from "./apparel.module.scss";
import { BackIcon } from "@/components/icons";
import Footer from "@/components/footer/footer";
import { Logo } from "@/components/logo";
import ImageCarousel from "@/components/imageCarousel/imageCarousel";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HIDDEN_PRODUCT_TAG } from "@/lib/constants";
import { Image } from "@/lib/shopify/types";
import { getProduct, getProductRecommendations } from "@/lib/shopify";
import { Suspense } from "react";
import Prose from "@/components/prose";
import { ProductProvider } from "@/components/product/product-context";
import Header from "@/components/header/header";
import { VariantSelector } from "@/components/variantSelector/variantSelector";
import { AddToCart } from "@/components/cart/add-to-cart";
import Price from "@/components/price-with-currency";
import SizeChartLink from "@/components/sizeChart/sizeChartLink";
import ProductImageSwitcher from "@/components/ProductImageSwitcher";

export async function generateMetadata(props: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const product = await getProduct(params.handle);

  if (!product) return notFound();

  const { url, width, height, altText: alt } = product.featuredImage || {};
  const indexable = !product.tags.includes(HIDDEN_PRODUCT_TAG);

  return {
    title: product.seo.title || product.title,
    description: product.seo.description || product.description,
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: {
        index: indexable,
        follow: indexable,
      },
    },
    openGraph: url
      ? {
          images: [
            {
              url,
              width,
              height,
              alt,
            },
          ],
        }
      : null,
  };
}

export default async function ApparelProductPage(props: {
  params: Promise<{ handle: string }>;
}) {
  const params = await props.params;
  const product = await getProduct(params.handle);

  if (!product) return notFound();

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.featuredImage.url,
    offers: {
      "@type": "AggregateOffer",
      availability: product.availableForSale
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      priceCurrency: product.priceRange.minVariantPrice.currencyCode,
      highPrice: product.priceRange.maxVariantPrice.amount,
      lowPrice: product.priceRange.minVariantPrice.amount,
    },
  };

  return (
    <ProductProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd),
        }}
      />
      <div className={styles.productPage}>
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className={styles.main}>
          <div className={styles.productContainer}>
            {/* Product Image */}
            <ProductImageSwitcher
              images={
                product.images as unknown as {
                  url: string;
                  altText?: string | null;
                }[]
              }
              title={product.title}
              sectionClassName={styles.productImageSection}
              imageClassName={styles.productImage}
              width={400}
              height={500}
            />

            {/* Product Details */}
            <div className={styles.productDetails}>
              <Suspense>
                <h1 className={styles.productTitle}>{product.title}</h1>
                <Price
                  className={styles.productPrice}
                  amount={product.priceRange.maxVariantPrice.amount}
                  currencyCode={product.priceRange.maxVariantPrice.currencyCode}
                  convertCurrency={true}
                />
                {product.descriptionHtml ? (
                  <Prose
                    className={styles.productDescription}
                    html={product.descriptionHtml}
                  />
                ) : null}
              </Suspense>

              {/* Size Selection */}
              <div className={styles.sizeSelection}>
                <VariantSelector
                  options={product.options}
                  variants={product.variants}
                />
                <SizeChartLink className={styles.sizeChart} />
              </div>

              {/* Add to Cart Button */}
              <AddToCart product={product} />
            </div>
          </div>
        </main>

        {(() => {
          const handle = params.handle;
          if (handle === "fc-t-shirt") {
            return (
              <ImageCarousel
                images={Array.from({ length: 17 }, (_, i) => ({
                  id: i + 1,
                  src: `/images/carousel/apparel/fc-t-shirt/${i + 1}.webp`,
                  alt: `FC T-shirt Image ${i + 1}`,
                }))}
              />
            );
          } else if (handle === "advan-t-shirt") {
            return (
              <ImageCarousel
                images={Array.from({ length: 2 }, (_, i) => ({
                  id: i + 1,
                  src: `/images/carousel/apparel/advan-t-shirt/${i + 1}.webp`,
                  alt: `Advan T-shirt Image ${i + 1}`,
                }))}
              />
            );
          } else if (handle === "chicano-t-shirt") {
            return (
              <ImageCarousel
                images={Array.from({ length: 7 }, (_, i) => ({
                  id: i + 1,
                  src: `/images/carousel/apparel/chicano-t-shirt/${i + 1}.webp`,
                  alt: `Chicano T-shirt Image ${i + 1}`,
                }))}
              />
            );
          } else if (handle === "collegiate-hoodie") {
            return (
              <ImageCarousel
                images={Array.from({ length: 4 }, (_, i) => ({
                  id: i + 1,
                  src: `/images/carousel/apparel/collegiate-hoodie/${
                    i + 1
                  }.webp`,
                  alt: `Collegiate Hoodie Image ${i + 1}`,
                }))}
              />
            );
          } else {
            return <ImageCarousel />;
          }
        })()}

        <Footer color="var(--black)" />
      </div>
    </ProductProvider>
  );
}
