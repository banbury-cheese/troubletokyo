"useClient";

import Footer from "@/components/footer/footer";
import PageHeader from "@/components/PageHeader/PageHeader";
import FolderGrid from "@/components/FolderGrid/FolderGrid";
import styles from "./accessories.module.scss";

// Define the folder structure for accessories
const accessoryFolders = [
  {
    id: "plates",
    name: "Plates",
    slug: "plates",
    image: "/images/accessories/plates/cover.png",
    description: "Custom license plates and decorative plates",
  },
  {
    id: "stickers",
    name: "Stickers",
    slug: "stickers",
    image: "/images/accessories/cover.jpg",
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
        title="ACCESSORIES"
        backgroundImage="/images/accessories/cover.jpg"
        backgroundAlt="Accessories Background"
      />
      <FolderGrid folders={accessoryFolders} basePath="/accessories" />
      <Footer color="var(--darkRed)" />
    </div>
  );
}
