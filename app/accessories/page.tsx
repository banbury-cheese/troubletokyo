"useClient";

import Footer from "@/components/footer/footer";
import PageHeader from "@/components/PageHeader/PageHeader";
import FolderGrid from "@/components/FolderGrid/FolderGrid";
import styles from "./accessories.module.scss";

// Define the folder structure for accessories
const accessoryFolders = [
  {
    id: "plates",
    name: "Car Plates",
    slug: "plates",
    image: "/images/carousel/plates/4.webp",
    description: "Custom car plates for American/Canadian market",
  },
  {
    id: "stickers",
    name: "Stickers",
    slug: "stickers",
    image: "/images/carousel/stickers/2.webp",
    description: "High-quality vinyl stickers and decals",
  },
  // {
  //   id: "keychains",
  //   name: "Keychains",
  //   slug: "keychains",
  //   image: "/images/accessories/keychains/cover.jpg",
  //   description: "Premium keychains and accessories",
  // },
  // {
  //   id: "patches",
  //   name: "Patches",
  //   slug: "patches",
  //   image: "/images/accessories/patches/cover.jpg",
  //   description: "Embroidered patches and badges",
  // },
];

export default function AccessoriesPage() {
  return (
    <div className={styles.accessoriesPage}>
      <PageHeader
        title="accessories"
        backgroundImage="/images/accessories/cover.jpg"
        backgroundAlt="Accessories Background"
      />
      <FolderGrid folders={accessoryFolders} basePath="/accessories" />
      <Footer color="var(--darkRed)" />
    </div>
  );
}
