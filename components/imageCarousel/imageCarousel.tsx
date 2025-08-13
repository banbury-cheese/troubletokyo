"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";
import { gsap } from "gsap";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import styles from "./imageCarousel.module.scss";

interface CarouselImage {
  id: number;
  src: string;
  alt: string;
}

interface ImageCarouselProps {
  images?: CarouselImage[];
}

const defaultImages: CarouselImage[] = [
  {
    id: 1,
    src: "/images/apparels/shirts/Advan T-shirt/closeup.jpg",
    alt: "Carousel Image 1",
  },
  {
    id: 2,
    src: "/images/apparels/shirts/Chicano T-shirt/closeup.png",
    alt: "Carousel Image 2",
  },
  {
    id: 3,
    src: "/images/apparels/shirts/FC t-shirt/closeup.png",
    alt: "Carousel Image 3",
  },
  {
    id: 4,
    src: "/images/apparels/shirts/Rarri T-shirt/closeup.png",
    alt: "Carousel Image 4",
  },
  {
    id: 5,
    src: "/images/apparels/shirts/TE 37 T-shirt/closeup.png",
    alt: "Carousel Image 5",
  },
  {
    id: 6,
    src: "/images/apparels/shirts/Advan T-shirt/closeup.jpg",
    alt: "Carousel Image 6",
  },
  {
    id: 7,
    src: "/images/apparels/shirts/Chicano T-shirt/closeup.png",
    alt: "Carousel Image 7",
  },
  {
    id: 8,
    src: "/images/apparels/shirts/FC t-shirt/closeup.png",
    alt: "Carousel Image 8",
  },
  {
    id: 9,
    src: "/images/apparels/shirts/Rarri T-shirt/closeup.png",
    alt: "Carousel Image 9",
  },
  {
    id: 10,
    src: "/images/apparels/shirts/TE 37 T-shirt/closeup.png",
    alt: "Carousel Image 10",
  },
];

export default function ImageCarousel({ images = defaultImages }: ImageCarouselProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<CarouselImage | null>(
    null
  );
  const [clickedElement, setClickedElement] = useState<HTMLElement | null>(
    null
  );

  const handleImageClick = (
    image: CarouselImage,
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();

    setSelectedImage(image);
    setClickedElement(target);
    setIsModalOpen(true);

    // Wait for modal to render, then animate
    setTimeout(() => {
      const modalElement = document.querySelector(`.${styles.modal}`);
      const imageElement = modalElement?.querySelector(`.${styles.modalImage}`);

      if (imageElement && modalElement) {
        // Set initial position and scale to match clicked image
        gsap.set(imageElement, {
          x: rect.left + rect.width / 2 - window.innerWidth / 2,
          y: rect.top + rect.height / 2 - window.innerHeight / 2,
          scale: 0.1,
        });

        gsap.set(modalElement, {
          opacity: 0,
        });

        // Animate modal appearance
        gsap.to(modalElement, {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        });

        // Animate image expansion
        gsap.to(imageElement, {
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "power3.out",
        });
      }
    }, 50);
  };

  const closeModal = () => {
    if (!selectedImage || !clickedElement) return;

    const modalElement = document.querySelector(`.${styles.modal}`);
    const imageElement = modalElement?.querySelector(`.${styles.modalImage}`);

    if (imageElement && clickedElement) {
      const clickedRect = clickedElement.getBoundingClientRect();

      gsap.to(imageElement, {
        x: clickedRect.left + clickedRect.width / 2 - window.innerWidth / 2,
        y: clickedRect.top + clickedRect.height / 2 - window.innerHeight / 2,
        scale: 0.1,
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
          setIsModalOpen(false);
          setSelectedImage(null);
          setClickedElement(null);
        },
      });

      gsap.to(modalElement, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  };

  return (
    <div className={styles.carouselContainer}>
      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView="auto"
        loop={false}
        initialSlide={Math.floor(images.length / 2)}
        coverflowEffect={{
          rotate: 0,
          stretch: 10,
          depth: 150,
          modifier: 1.5,
          slideShadows: false,
        }}
        // pagination={{
        //   clickable: true,
        // }}
        modules={[EffectCoverflow, Pagination]}
        className={styles.swiper}
      >
        {images.map((image, index) => (
          <SwiperSlide key={image.id} className={styles.swiperSlide}>
            <div
              className={styles.carouselItem}
              onClick={(e) => handleImageClick(image, e)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={300}
                height={200}
                className={styles.carouselImage}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Modal */}
      {isModalOpen && selectedImage && (
        <div className={styles.modal} onClick={closeModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.closeButton} onClick={closeModal}>
              ×
            </button>
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              width={800}
              height={600}
              className={styles.modalImage}
            />
          </div>
        </div>
      )}
    </div>
  );
}
