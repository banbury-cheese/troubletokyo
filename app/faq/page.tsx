"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import styles from "./faq.module.scss";
import MenuNav from "@/components/MenuNav/MenuNav";
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSection {
  title: string;
  items: FAQItem[];
}

const faqData: FAQSection[] = [
  {
    title: "RETURN POLICY",
    items: [
      {
        question: "RETURNS",
        answer:
          "All sales are final. Please carefully review your order and verify your information prior to finalizing your purchase. There will be no returns or exchanges unless the item is damaged from defect. All shipping damages should be communicated and resolved with shipping company.",
      },
      {
        question: "EXCHANGES",
        answer:
          "NO EXCHANGES unless product is damaged from defect. Email info@trouble.tokyo to start an exchange request",
      },
      {
        question: "SHIPPING",
        answer:
          "We will only ship to the address provided upon checkout. Please verify your information prior to finalizing your purchase.\n\nTROUBLE TOKYO is not responsible for duties, taxes, or customs fees under any circumstance. Buyer is accountable for any restrictions, duties, taxes, and any other fees collected from the destination country.",
      },
      {
        question: "PAYMENTS",
        answer:
          "We accept Visa, MasterCard, and American Express credit cards.\n\nYou agree to pay the price for the merchandise in your order at the time you submitted your order and the delivery fees for the shipping service you select.\n\nWe reserve the right to accept, decline or cancel your order for any reason.",
      },
    ],
  },
];

export default function FAQPage() {
  const itemsRef = useRef<(HTMLDivElement | null)[][]>([]);
  const openItem = useRef<{ section: number; item: number } | null>(null);

  useEffect(() => {
    // Initialize all items as collapsed
    itemsRef.current.forEach((sectionItems) => {
      sectionItems.forEach((item) => {
        if (item) {
          const answer = item.querySelector(`.${styles.answer}`);
          if (answer) {
            gsap.set(answer, { height: 0, opacity: 0 });
          }
        }
      });
    });
  }, []);

  const closeItem = (sectionIndex: number, itemIndex: number) => {
    const item = itemsRef.current[sectionIndex]?.[itemIndex];
    if (!item) return;
    const answer = item.querySelector(`.${styles.answer}`) as HTMLElement;
    const icon = item.querySelector(`.${styles.itemToggleIcon}`) as HTMLElement;
    if (!answer || !icon) return;
    gsap.to(answer, {
      height: 0,
      opacity: 0,
      duration: 0.4,
      ease: "power2.inOut",
    });
    gsap.to(icon, {
      rotation: 0,
      duration: 0.1,
      ease: "power2.inOut",
    });
  };

  const toggleItem = (sectionIndex: number, itemIndex: number) => {
    const item = itemsRef.current[sectionIndex]?.[itemIndex];
    if (!item) return;

    const answer = item.querySelector(`.${styles.answer}`) as HTMLElement;
    const icon = item.querySelector(`.${styles.itemToggleIcon}`) as HTMLElement;

    if (!answer || !icon) return;

    const isOpen = answer.style.height !== "0px" && answer.style.height !== "";

    // Close any previously open item except the current one
    if (
      openItem.current &&
      (openItem.current.section !== sectionIndex ||
        openItem.current.item !== itemIndex)
    ) {
      closeItem(openItem.current.section, openItem.current.item);
      openItem.current = null;
    }

    if (isOpen) {
      closeItem(sectionIndex, itemIndex);
      openItem.current = null;
    } else {
      gsap.set(answer, { height: "auto" });
      const autoHeight = answer.offsetHeight;
      gsap.set(answer, { height: 0 });
      gsap.to(icon, {
        rotation: 90,
        duration: 0.1,
        ease: "power2.inOut",
      });
      gsap.to(answer, {
        height: autoHeight,
        opacity: 1,
        duration: 0.4,
        ease: "power2.inOut",
      });

      openItem.current = { section: sectionIndex, item: itemIndex };
    }
  };

  return (
    <div className={styles.faqPage}>
      <Header />

      <main className={styles.main}>
        {/* <h1 className={styles.title}>Returns Policy</h1> */}

        <div className={styles.faqSections}>
          {faqData.map((section, sectionIndex) => (
            <div key={section.title} className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>{section.title}</h2>
              </div>

              <div className={styles.sectionContent}>
                {section.items.map((item, itemIndex) => {
                  if (!itemsRef.current[sectionIndex]) {
                    itemsRef.current[sectionIndex] = [];
                  }

                  return (
                    <div
                      key={item.question}
                      className={styles.faqItem}
                      ref={(el) => {
                        itemsRef.current[sectionIndex][itemIndex] = el;
                      }}
                    >
                      <button
                        className={styles.question}
                        onClick={() => toggleItem(sectionIndex, itemIndex)}
                      >
                        <span className={styles.itemToggleIcon}>
                          <svg
                            width="23"
                            height="22"
                            viewBox="0 0 23 22"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clipPath="url(#clip0_414_24)">
                              <path
                                d="M11.8288 4.64527C13.7665 5.7961 15.8661 6.68684 17.7925 7.85445C18.353 8.19424 20.5582 9.52546 20.8638 9.86525C20.944 9.95474 21.0553 10.0009 21.0074 10.1561C20.8398 10.4833 20.209 11.7936 19.8189 11.7222C17.3672 9.78415 14.6508 8.19424 11.8302 6.84625L11.9992 21.5875L11.7232 21.9762L9.69258 22L9.85875 1.95627L0 2.02759L0.0858997 0H22.9986V2.12127L11.8288 1.95767V4.64667V4.64527Z"
                                fill="black"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_414_24">
                                <rect width="23" height="22" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </span>
                        <span className={styles.questionText}>
                          {item.question}
                        </span>
                      </button>
                      <div className={styles.answer}>
                        <p>{item.answer}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer color="var(--black)" />
    </div>
  );
}
