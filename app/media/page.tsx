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
    thumbnail: "/images/media/Photos/GinzaTrouble/1.jpg",
    date: "2024/07/01",
    type: "photo_folder",
    fullMedia: Array.from(
      { length: 10 },
      (_, i) => `/images/media/Photos/GinzaTrouble/${i + 1}.jpg`
    ),
    title: "GINZA TROUBLE",
    location: "GINZA, TOKYO",
    description:
      "A sleek automotive photoshoot capturing the essence of Japanese street culture in the heart of Tokyo's most prestigious district.",
    photographer: "TROUBLE TOKYO COLLECTIVE",
  },
  {
    id: 2,
    thumbnail: "/images/media/Photos/MclearnGrass/1.jpg",
    date: "2024/07/02",
    type: "photo_folder",
    fullMedia: Array.from(
      { length: 26 },
      (_, i) => `/images/media/Photos/MclearnGrass/${i + 1}.jpg`
    ),
    title: "MCLEARN GRASS",
    location: "TORONTO, CANADA",
    description:
      "An outdoor automotive session showcasing performance vehicles against natural landscapes, blending power with organic beauty.",
    photographer: "FULL NAME [@USERNAME]",
  },
  {
    id: 3,
    thumbnail: "/images/media/Photos/RWBGAS7/1.jpg",
    date: "2024/07/03",
    type: "photo_folder",
    fullMedia: Array.from(
      { length: 7 },
      (_, i) => `/images/media/Photos/RWBGAS7/${i + 1}.jpg`
    ),
    title: "RWB GAS7",
    location: "TOKYO, JAPAN",
    description:
      "Featuring the iconic RWB Porsche builds, this series captures the raw essence of Japanese tuning culture and craftsmanship.",
    photographer: "TROUBLE TOKYO COLLECTIVE",
  },
  {
    id: 4,
    thumbnail: "/images/media/Photos/GinzaTrouble/2.jpg",
    date: "2024/07/04",
    type: "photo_folder",
    fullMedia: Array.from(
      { length: 10 },
      (_, i) => `/images/media/Photos/GinzaTrouble/${i + 1}.jpg`
    ),
    title: "GINZA TROUBLE 2",
    location: "GINZA, TOKYO",
    description:
      "A continuation of the Ginza series, exploring different angles and lighting techniques in Tokyo's urban automotive scene.",
    photographer: "TROUBLE TOKYO COLLECTIVE",
  },
  {
    id: 5,
    thumbnail: "/images/media/Photos/MclearnGrass/5.jpg",
    date: "2024/07/05",
    type: "photo_folder",
    fullMedia: Array.from(
      { length: 26 },
      (_, i) => `/images/media/Photos/MclearnGrass/${i + 1}.jpg`
    ),
    title: "MCLEARN GRASS 2",
    location: "TORONTO, CANADA",
    description:
      "Second installment of the McLaren grass series, focusing on detail shots and environmental integration.",
    photographer: "FULL NAME [@USERNAME]",
  },
  {
    id: 6,
    thumbnail: "/images/media/Photos/RWBGAS7/3.jpg",
    date: "2024/07/06",
    type: "photo_folder",
    fullMedia: Array.from(
      { length: 7 },
      (_, i) => `/images/media/Photos/RWBGAS7/${i + 1}.jpg`
    ),
    title: "RWB GAS7 2",
    location: "TOKYO, JAPAN",
    description:
      "Extended coverage of the RWB build, showcasing the intricate details and aerodynamic modifications.",
    photographer: "TROUBLE TOKYO COLLECTIVE",
  },
  {
    id: 7,
    thumbnail: "/images/media/Photos/GinzaTrouble/7.jpg",
    date: "2024/07/07",
    type: "photo_folder",
    fullMedia: Array.from(
      { length: 10 },
      (_, i) => `/images/media/Photos/GinzaTrouble/${i + 1}.jpg`
    ),
    title: "GINZA TROUBLE 3",
    location: "GINZA, TOKYO",
    description:
      "Final chapter of the Ginza trilogy, capturing the nighttime aesthetic and neon-lit atmosphere of Tokyo streets.",
    photographer: "TROUBLE TOKYO COLLECTIVE",
  },
  {
    id: 8,
    thumbnail: "/images/landingPage/media.jpg",
    date: "2024/07/08",
    type: "video",
    fullMedia: "/images/media/videos/TroubleDriftmp4.mp4",
    title: "TROUBLE DRIFT",
    location: "TOKYO DRIFT CIRCUIT",
    description:
      "High-octane drift footage showcasing the skill and precision of Tokyo's underground drift scene.",
    photographer: "TROUBLE TOKYO COLLECTIVE",
  },
  {
    id: 9,
    thumbnail: "/images/landingPage/apparel.jpg",
    date: "2024/07/09",
    type: "video",
    fullMedia: "/images/media/videos/ImportREEL.mp4",
    title: "IMPORT REEL",
    location: "VARIOUS LOCATIONS",
    description:
      "A compilation reel featuring the best import vehicles from our extensive automotive photography sessions.",
    photographer: "TROUBLE TOKYO COLLECTIVE",
  },
  {
    id: 10,
    thumbnail: "/images/landingPage/media.jpg",
    date: "2024/07/10",
    type: "video",
    fullMedia: "/images/media/videos/RWBGrass2.mp4",
    title: "RWR GRASS 2",
    location: "OUTDOOR LOCATION",
    description:
      "Behind-the-scenes and highlight reel from the RWB grass photoshoot, showing the creative process.",
    photographer: "TROUBLE TOKYO COLLECTIVE",
  },
  {
    id: 11,
    thumbnail: "/images/landingPage/media.jpg",
    date: "2024/07/11",
    type: "video",
    fullMedia: "/images/media/videos/TamedVHS.mp4",
    title: "TAMED VHS",
    location: "VINTAGE GARAGE",
    description:
      "A nostalgic VHS-style video capturing the essence of classic automotive culture with a retro aesthetic.",
    photographer: "TROUBLE TOKYO COLLECTIVE",
  },
  {
    id: 12,
    thumbnail: "/images/landingPage/media.jpg",
    date: "2024/07/12",
    type: "video",
    fullMedia: "/images/media/videos/Troubleskaters.mp4",
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
            src="/images/media/camera.png"
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
                        quality={50}
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
