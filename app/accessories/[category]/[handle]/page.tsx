"useClient";

import styles from "./accessory.module.scss";
import Footer from "@/components/footer/footer";
import ImageCarousel from "@/components/imageCarousel/imageCarousel";
import PlateViewer3D from "@/components/PlateViewer3D/PlateViewer3D";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HIDDEN_PRODUCT_TAG } from "@/lib/constants";
import { getProduct } from "@/lib/shopify";
import { Suspense } from "react";
import Prose from "@/components/prose";
import { ProductProvider } from "@/components/product/product-context";
import Header from "@/components/header/header";
import { VariantSelector } from "@/components/variantSelector/variantSelector";
import { AddToCart } from "@/components/cart/add-to-cart";
import Price from "@/components/price";

export async function generateMetadata(props: {
  params: Promise<{ category: string; handle: string }>;
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

export default async function AccessoryProductPage(props: {
  params: Promise<{ category: string; handle: string }>;
}) {
  const params = await props.params;
  const product = await getProduct(params.handle);

  if (!product) return notFound();

  // Check if this is a car plate product
  const isCarPlate =
    params.category === "plates" ||
    params.handle.includes("plate") ||
    params.handle.includes("car-plate");

  // Check if this is a sticker product
  const isSticker =
    params.category === "stickers" || params.handle.includes("sticker");

  // Use the new FBX model from the Plates folder
  const modelSrc = "/Plates/Model/Plate.fbx";

  // Detect color from URL handle
  const getColorOptionFromHandle = (handle: string): number => {
    const handleLower = handle.toLowerCase();

    if (handleLower.includes("blue")) return 1;
    if (handleLower.includes("green")) return 2;
    if (handleLower.includes("red")) return 3;
    if (handleLower.includes("white")) return 4;
    if (handleLower.includes("yellow")) return 5;
    if (handleLower.includes("silver") || handleLower.includes("metallic"))
      return 6;

    // Default to blue if no color is detected
    return 1;
  };

  const plateColorOption = isCarPlate
    ? getColorOptionFromHandle(params.handle)
    : 1;

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
            <div
              className={`${styles.productImageSection} ${
                isSticker ? styles.stickerBackground : ""
              }`}
            >
              <img
                src={product.images[1]?.url || product.images[0]?.url}
                alt={`${product.title} image`}
                width={400}
                height={500}
                className={styles.productImage}
              />
            </div>

            {/* Product Details */}
            <div className={styles.productDetails}>
              <Suspense>
                <h1 className={styles.productTitle}>{product.title}</h1>
                <p className={styles.productPrice}>
                  <Price
                    className={styles.priceDisplay}
                    amount={product.priceRange.maxVariantPrice.amount}
                    currencyCode={
                      product.priceRange.maxVariantPrice.currencyCode
                    }
                  />
                </p>

                {product.descriptionHtml ? (
                  <Prose
                    className={styles.productDescription}
                    html={product.descriptionHtml}
                  />
                ) : null}
              </Suspense>

              {/* Variant Selection */}
              <div className={styles.variantSelection}>
                <VariantSelector
                  options={product.options}
                  variants={product.variants}
                />
              </div>

              {/* Add to Cart Button */}
              <AddToCart product={product} />
            </div>
          </div>
        </main>

        {/* Image Carousel - Use plate images for plate pages */}
        {isCarPlate ? (
          <ImageCarousel
            images={[
              {
                id: 1,
                src: "/images/carousel/plates/1.webp",
                alt: "Car Plate Design 1",
              },
              {
                id: 2,
                src: "/images/carousel/plates/2.webp",
                alt: "Car Plate Design 2",
              },
              {
                id: 3,
                src: "/images/carousel/plates/3.webp",
                alt: "Car Plate Design 3",
              },
              {
                id: 4,
                src: "/images/carousel/plates/4.webp",
                alt: "Car Plate Design 4",
              },
            ]}
          />
        ) : isSticker ? (
          <ImageCarousel
            images={[
              {
                id: 1,
                src: "/images/carousel/stickers/1.webp",
                alt: "Sticker 1",
              },
              {
                id: 2,
                src: "/images/carousel/stickers/2.webp",
                alt: "Sticker 2",
              },
              {
                id: 3,
                src: "/images/carousel/stickers/3.webp",
                alt: "Sticker 3",
              },
              {
                id: 4,
                src: "/images/carousel/stickers/4.webp",
                alt: "Sticker 4",
              },
            ]}
          />
        ) : (
          <ImageCarousel />
        )}

        {/* 3D Plate Viewer - Only show for car plates */}
        {isCarPlate && (
          <PlateViewer3D
            modelSrc={modelSrc}
            title={`${product.title} - Interactive 3D View`}
            colorOption={plateColorOption}
          />
        )}

        <Footer color="var(--black)" />
      </div>
    </ProductProvider>
  );
}
