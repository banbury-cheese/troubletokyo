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
    title: "PRODUCTS",
    items: [
      {
        question: "WHAT IF MY ORDER ARRIVED DAMAGED?",
        answer:
          "We value your satisfaction. If you happen to encounter any issues with your product, such as discrepancies or damage as best as you can email us and we'll be happy to help resolve your order.",
      },
      {
        question: "HOW DO I TAKE CARE OF MY APPAREL?",
        answer:
          "To maintain the quality of your apparel, we recommend following the care instructions on the garment label. Generally, wash in cold water and air dry when possible.",
      },
      {
        question: "HOW DO I TAKE CARE OF MY LICENSE PLATE?",
        answer:
          "Clean your license plate with mild soap and water. Avoid abrasive cleaners that could damage the finish or graphics.",
      },
    ],
  },
  {
    title: "SHIPPING",
    items: [
      {
        question: "HOW LONG WILL IT TAKE TO SHIP MY ORDER?",
        answer:
          "We kindly ask that you allow up to 10 business days to process before shipment.",
      },
      {
        question: "HOW CAN I TRACK MY ORDER?",
        answer:
          "Once your order has been placed, we will send you a confirmation email. After the order is shipped, you will receive an email notification and tracking number.",
      },
      {
        question: "HOW DO I FIND MY CONFIRMATION EMAIL?",
        answer:
          "The order confirmation email including your order details will be sent to the email used on our website when purchasing the order. Before contacting us, be sure to check your junk mail folder as well.",
      },
      {
        question: "DO YOU SHIP INTERNATIONALLY?",
        answer:
          "Yes! We offer international shipping services; however, please note that shipping rates vary depending on the destination country.",
      },
      {
        question: "DO I HAVE TO PAY DUTIES AND TAXES?",
        answer:
          "The delivery charges do not include import costs that may be due when the package reaches your destination country. We are not responsible for the costs due after it has left our fulfillment center.",
      },
      {
        question: "WHAT IF I HAVEN'T RECEIVED MY PACKAGE?",
        answer:
          "We are very sorry if you haven't received your package within the expected delivery timeframe. We will investigate the matter and provide assistance in getting you your order or please feel free to reach out to our dedicated customer support team using our contact page.",
      },
      {
        question: "WHERE IS MY PACKAGE?",
        answer:
          "Please allow up to 72 hours after delivery on tracking before contacting us, as the tracking can sometimes be updated incorrectly.",
      },
    ],
  },
  {
    title: "PAYMENT",
    items: [
      {
        question: "WHICH PAYMENT METHODS DO YOU ACCEPT?",
        answer:
          "We accept payments through Amex, Mastercard, Visa, Shop Pay, and Apple Pay.",
      },
      {
        question: "WHICH CURRENCIES CAN I PAY IN?",
        answer:
          "Our website features a currency converter that allows you to view prices in your preferred currency from the drop-down in the bottom left of the website and make payments accordingly.",
      },
    ],
  },
  {
    title: "RETURNS",
    items: [
      {
        question: "WHAT IF I HAVE AN ISSUE WITH MY PRODUCT?",
        answer:
          "We value your satisfaction. At Trouble Tokyo, we strive to ensure the highest quality for every customer and member of Trouble and are satisfied. We aim to deliver a high-quality experience and product. If you happen to encounter any issues with your product, kindly reach out to us via email and we will investigate the matter to ensure your complete satisfaction with your purchase.",
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
        <h1 className={styles.title}>FREQUENTLY ASKED QUESTIONS</h1>

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
