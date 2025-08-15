"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import styles from "./media.module.scss";
import MenuNav from "@/components/MenuNav/MenuNav";
import Footer from "@/components/footer/footer";
import ImageModal from "@/components/imageModal/imageModal";

interface MediaItem {
  id: number;
  thumbnail: string;
  date: string;
  type: "photo_folder" | "video";
  fullMedia: string | string[]; // string for video, array for photo folders
  title: string;
  location: string;
  description: string;
  photographer: string;
}

// Media data with actual project images and videos
const mediaItems: MediaItem[] = [
  {
    id: 1,
    thumbnail: "/images/media/Photos/2024.08.14./2024.08.14. McLaren Grass1.webp",
    date: "2024/08/14",
    type: "photo_folder",
    fullMedia: [
      "/images/media/Photos/2024.08.14./2024.08.14. McLaren Grass1.webp",
      "/images/media/Photos/2024.08.14./2024.08.14. McLaren Grass2.webp",
      "/images/media/Photos/2024.08.14./2024.08.14. McLaren Grass3.webp",
    ],
    title: "MCLAREN ON GRASS",
    location: "TORONTO, CANADA",
    description:
      "Andy's (@tamed) McLaren 720s DarwinPRO sitting on the field of a local Scarborough school.",
    photographer: "TROUBLE TOKYO TEAM",
  },
  {
    id: 2,
    thumbnail: "/images/media/Photos/2024.09.06/RWB Grass1.webp",
    date: "2024/09/06",
    type: "photo_folder",
    fullMedia: [
      "/images/media/Photos/2024.09.06/RWB Grass1.webp",
      "/images/media/Photos/2024.09.06/RWB Grass2.webp",
      "/images/media/Photos/2024.09.06/RWB Grass3.webp",
    ],
    title: "RWB ON GRASS",
    location: "TORONTO, CANADA",
    description:
      "Local RWB Toronto Family posted up on a grassy field in Scarborough.",
    photographer: "TROUBLE TOKYO TEAM",
  },
  {
    id: 3,
    thumbnail: "/images/media/Photos/2024.10.15./Ginza Trouble1.webp",
    date: "2024/10/15",
    type: "photo_folder",
    fullMedia: [
      "/images/media/Photos/2024.10.15./Ginza Trouble1.webp",
    ],
    title: "TROUBLE IN GINZA",
    location: "GINZA, JAPAN",
    description:
      "Trouble 1987 930 911 posted up in Ginza.",
    photographer: "TROUBLE TOKYO TEAM",
  },
  {
    id: 4,
    thumbnail: "/images/media/Photos/2024.11.06./Skaterboard1.webp",
    date: "2024/11/06",
    type: "photo_folder",
    fullMedia: [
      "/images/media/Photos/2024.11.06./Skaterboard1.webp",
      "/images/media/Photos/2024.11.06./Skaterboard2.webp",
      "/images/media/Photos/2024.11.06./Skaterboard3.webp",
    ],
    title: "SKATEBOARD",
    location: "SHIBUYA, JAPAN",
    description:
      "The night before they banned street drinking in Shibuya a group of local skaters got together to drink and skate for one last time.",
    photographer: "TROUBLE TOKYO TEAM",
  },
  {
    id: 5,
    thumbnail: "/images/media/Photos/2024.11.07/TroubleGlilzz1_Cor.webp",
    date: "2024/11/07",
    type: "photo_folder",
    fullMedia: [
      "/images/media/Photos/2024.11.07/TroubleGlilzz1_Cor.webp",
      "/images/media/Photos/2024.11.07/TroubleGlizz2_Cor.webp",
      "/images/media/Photos/2024.11.07/TroubleGlizz3_Cor.webp",
      "/images/media/Photos/2024.11.07/TroubleGlizz4_Cor.webp",
      "/images/media/Photos/2024.11.07/TroubleGlizz5_Cor.webp",
    ],
    title: "GRILLZJEWELZ TETSUYA AKIYAMA",
    location: "TAITŌ, JAPAN",
    description:
      "Tetsuya of GrillzJewelz wearing our Chicano tee at his store in Tokyo.",
    photographer: "TROUBLE TOKYO TEAM",
  },
  {
    id: 6,
    thumbnail: "/images/media/Photos/2024.11.15./Killy1.webp",
    date: "2024/11/15",
    type: "photo_folder",
    fullMedia: [
      "/images/media/Photos/2024.11.15./Killy1.webp",
      "/images/media/Photos/2024.11.15./Killy2.webp",
    ],
    title: "KILLY",
    location: "TAITŌ, JAPAN",
    description:
      "Canadian Rapper Killy (@Killy) wearing our Chicano tee in front of GrillzJewelz storefront in Taito.",
    photographer: "TROUBLE TOKYO TEAM",
  },
  {
    id: 7,
    thumbnail: "/images/media/Photos/2024.11.26./Street Drifting1.webp",
    date: "2024/11/26",
    type: "photo_folder",
    fullMedia: [
      "/images/media/Photos/2024.11.26./Street Drifting1.webp",
      "/images/media/Photos/2024.11.26./Street Drifting2.webp",
      "/images/media/Photos/2024.11.26./Street Drifting3.webp",
    ],
    title: "STREET DRIFTING",
    location: "OTA, JAPAN",
    description:
      "",
    photographer: "TROUBLE TOKYO TEAM",
  },
  {
    id: 8,
    thumbnail: "/images/media/Photos/2024.12.19./ShibuyaCrossing1-.webp",
    date: "2024/12/19",
    type: "photo_folder",
    fullMedia: [
      "/images/media/Photos/2024.12.19./ShibuyaCrossing1-.webp",
      "/images/media/Photos/2024.12.19./ShibuyaCrossing2-.webp",
    ],
    title: "SHIBUYA CROSSING",
    location: "SHIBUYA, TOKYO",
    description:
      "Shooting Etushi Shoji's (@etu_1128) Lamborghini Diablo at Shibuya Crossing with our Trouble 930 911 in tow.",
    photographer: "TROUBLE TOKYO TEAM",
  },
  {
    id: 9,
    thumbnail: "/images/landingPage/media.jpg",
    date: "2024/07/08",
    type: "video",
    fullMedia: "/images/media/Videos/TroubleDriftmp4.mp4",
    title: "TROUBLE DRIFT",
    location: "TOKYO DRIFT CIRCUIT",
    description:
      "High-octane drift footage showcasing the skill and precision of Tokyo's underground drift scene.",
    photographer: "TROUBLE TOKYO COLLECTIVE",
  },
  {
    id: 10,
    thumbnail: "/images/landingPage/apparel.jpg",
    date: "2024/07/09",
    type: "video",
    fullMedia: "/images/media/Videos/ImportREEL.mp4",
    title: "IMPORT REEL",
    location: "VARIOUS LOCATIONS",
    description:
      "A compilation reel featuring the best import vehicles from our extensive automotive photography sessions.",
    photographer: "TROUBLE TOKYO COLLECTIVE",
  },
  {
    id: 11,
    thumbnail: "/images/landingPage/media.jpg",
    date: "2024/07/10",
    type: "video",
    fullMedia: "/images/media/Videos/RWBGrass2.mp4",
    title: "RWB GRASS 2",
    location: "OUTDOOR LOCATION",
    description:
      "Behind-the-scenes and highlight reel from the RWB grass photoshoot, showing the creative process.",
    photographer: "TROUBLE TOKYO COLLECTIVE",
  },
  {
    id: 12,
    thumbnail: "/images/landingPage/media.jpg",
    date: "2024/07/11",
    type: "video",
    fullMedia: "/images/media/Videos/TamedVHS.mp4",
    title: "TAMED VHS",
    location: "VINTAGE GARAGE",
    description:
      "A nostalgic VHS-style video capturing the essence of classic automotive culture with a retro aesthetic.",
    photographer: "TROUBLE TOKYO COLLECTIVE",
  },
  {
    id: 13,
    thumbnail: "/images/landingPage/media.jpg",
    date: "2024/07/12",
    type: "video",
    fullMedia: "/images/media/Videos/Troubleskaters.mp4",
    title: "TROUBLE SKATERS",
    location: "TOKYO SKATE PARKS",
    description:
      "Crossover content featuring skateboard culture intersecting with automotive lifestyle in Tokyo's urban landscape.",
    photographer: "TROUBLE TOKYO COLLECTIVE",
  },
];

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

export default function MediaPage() {
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [viewMode, setViewMode] = useState<"grid" | "viewer">("grid");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickedImageElement, setClickedImageElement] =
    useState<HTMLElement | null>(null);

  const handleMediaClick = (media: MediaItem) => {
    setSelectedMedia(media);
    setCurrentImageIndex(0);
    setViewMode("viewer");
  };

  const handleImageClick = (
    media: MediaItem,
    index: number,
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    event.preventDefault();
    setSelectedMedia(media);
    setCurrentImageIndex(index);
    setClickedImageElement(event.currentTarget as HTMLElement);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setClickedImageElement(null);
  };

  const nextModalImage = () => {
    if (
      selectedMedia &&
      selectedMedia.type === "photo_folder" &&
      Array.isArray(selectedMedia.fullMedia)
    ) {
      setCurrentImageIndex(
        (prev) => (prev + 1) % selectedMedia.fullMedia.length
      );
    }
  };

  const prevModalImage = () => {
    if (
      selectedMedia &&
      selectedMedia.type === "photo_folder" &&
      Array.isArray(selectedMedia.fullMedia)
    ) {
      setCurrentImageIndex(
        (prev) =>
          (prev - 1 + selectedMedia.fullMedia.length) %
          selectedMedia.fullMedia.length
      );
    }
  };

  const goBackToGrid = () => {
    setViewMode("grid");
    setSelectedMedia(null);
  };

  const nextImage = () => {
    if (
      selectedMedia &&
      selectedMedia.type === "photo_folder" &&
      Array.isArray(selectedMedia.fullMedia)
    ) {
      setCurrentImageIndex(
        (prev) => (prev + 1) % selectedMedia.fullMedia.length
      );
    }
  };

  const prevImage = () => {
    if (
      selectedMedia &&
      selectedMedia.type === "photo_folder" &&
      Array.isArray(selectedMedia.fullMedia)
    ) {
      setCurrentImageIndex(
        (prev) =>
          (prev - 1 + selectedMedia.fullMedia.length) %
          selectedMedia.fullMedia.length
      );
    }
  };

  return (
    <div className={styles.mediaPage}>
      <MenuNav />
      <div className={styles.cameraContainer}>
        <div className={styles.camera}>
          <Image
            src="/images/media/camera.webp"
            alt="Canon Camera"
            fill
            className={styles.cameraImage}
          />

          {/* Camera Screen */}
          <div className={styles.cameraScreen}>
            {viewMode === "grid" ? (
              <div className={styles.mediaGrid}>
                {mediaItems.map((item) => (
                  <div
                    key={item.id}
                    className={styles.mediaItem}
                    onClick={() => handleMediaClick(item)}
                  >
                    <div className={styles.thumbnailContainer}>
                      <Image
                        src={item.thumbnail}
                        alt={`Media ${item.id}`}
                        fill
                        className={styles.thumbnail}
                        placeholder={`data:image/svg+xml;base64,${toBase64(
                          shimmer(700, 475)
                        )}`}
                        quality={30}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      {item.type === "video" && (
                        <div className={styles.playIcon}>
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M8 5v14l11-7z"
                              fill="white"
                              stroke="white"
                              strokeWidth="2"
                            />
                          </svg>
                        </div>
                      )}
                      {item.type === "photo_folder" && (
                        <div className={styles.folderIcon}>
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M10 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2h-8l-2-2z"
                              fill="white"
                              stroke="white"
                              strokeWidth="2"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className={styles.mediaInfo}>
                      <span className={styles.mediaDate}>{item.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.mediaViewer}>
                <div className={styles.viewerHeader}>
                  <button className={styles.backButton} onClick={goBackToGrid}>
                    ← Back
                  </button>
                  <span className={styles.viewerTitle}>
                    {selectedMedia?.title}
                  </span>
                </div>

                <div className={styles.viewerContent}>
                  {selectedMedia?.type === "video" ? (
                    <video
                      src={selectedMedia.fullMedia as string}
                      loop
                      className={styles.viewerVideo}
                      autoPlay
                    />
                  ) : (
                    <div className={styles.imageCarousel}>
                      <div className={styles.carouselContainer}>
                        {selectedMedia?.type === "photo_folder" &&
                          Array.isArray(selectedMedia.fullMedia) && (
                            <a
                              href="#"
                              onClick={(e) =>
                                handleImageClick(
                                  selectedMedia,
                                  currentImageIndex,
                                  e
                                )
                              }
                              style={{
                                display: "block",
                                width: "100%",
                                height: "100%",
                                cursor: "pointer",
                              }}
                            >
                              <Image
                                src={selectedMedia.fullMedia[currentImageIndex]}
                                alt={`${selectedMedia.title} ${
                                  currentImageIndex + 1
                                }`}
                                fill
                                className={styles.carouselImage}
                                placeholder={`data:image/svg+xml;base64,${toBase64(
                                  shimmer(700, 475)
                                )}`}
                                quality={60}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                              />
                            </a>
                          )}
                      </div>

                      {selectedMedia?.type === "photo_folder" &&
                        Array.isArray(selectedMedia.fullMedia) &&
                        selectedMedia.fullMedia.length > 1 && (
                          <div className={styles.carouselControls}>
                            <button
                              className={styles.carouselButton}
                              onClick={prevImage}
                            >
                              ←
                            </button>
                            <span className={styles.imageCounter}>
                              {currentImageIndex + 1} /{" "}
                              {selectedMedia.fullMedia.length}
                            </span>
                            <button
                              className={styles.carouselButton}
                              onClick={nextImage}
                            >
                              →
                            </button>
                          </div>
                        )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer color="var(--white)" />

      {/* Image Modal */}
      {isModalOpen &&
        selectedMedia &&
        selectedMedia.type === "photo_folder" &&
        Array.isArray(selectedMedia.fullMedia) && (
          <ImageModal
            isOpen={isModalOpen}
            onClose={closeModal}
            imageSrc={selectedMedia.fullMedia[currentImageIndex]}
            title={selectedMedia.title}
            location={selectedMedia.location}
            description={selectedMedia.description}
            photographer={selectedMedia.photographer}
            imageIndex={currentImageIndex}
            totalImages={selectedMedia.fullMedia.length}
            onNext={nextModalImage}
            onPrev={prevModalImage}
            triggerElement={clickedImageElement}
          />
        )}
    </div>
  );
}
