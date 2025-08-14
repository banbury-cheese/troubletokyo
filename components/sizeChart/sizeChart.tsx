"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import styles from "./sizeChart.module.scss";

interface SizeChartProps {
  isOpen: boolean;
  onClose: () => void;
}

const sizeData = [
  {
    size: "S",
    bodyLength: '28 1/2"',
    chestWidth: '18"',
    sleeveLength: '15 5/8"',
  },
  {
    size: "M",
    bodyLength: '29 1/2"',
    chestWidth: '20"',
    sleeveLength: '17 1/2"',
  },
  { size: "L", bodyLength: '30 1/2"', chestWidth: '22"', sleeveLength: '18"' },
  { size: "XL", bodyLength: '31 1/2"', chestWidth: '24"', sleeveLength: '20"' },
  {
    size: "2XL",
    bodyLength: '32 1/2"',
    chestWidth: '26"',
    sleeveLength: '21 1/2"',
  },
  {
    size: "3XL",
    bodyLength: '33 1/2"',
    chestWidth: '28"',
    sleeveLength: '22 7/8"',
  },
  {
    size: "4XL",
    bodyLength: '34 1/2"',
    chestWidth: '30"',
    sleeveLength: '24 1/4"',
  },
  {
    size: "5XL",
    bodyLength: '35 1/2"',
    chestWidth: '32"',
    sleeveLength: '25 3/8"',
  },
];

export default function SizeChart({ isOpen, onClose }: SizeChartProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLTableElement>(null);
  const rowsRef = useRef<HTMLTableRowElement[]>([]);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      // Set initial states
      gsap.set(backdropRef.current, { opacity: 0 });
      gsap.set(contentRef.current, {
        opacity: 0,
        scale: 0.8,
        y: 30,
      });
      gsap.set(rowsRef.current, {
        opacity: 0,
        x: -20,
      });

      // Animation timeline
      const tl = gsap.timeline();

      // Fade in backdrop
      tl.to(backdropRef.current, {
        opacity: 1,
        duration: 0.25,
        ease: "power2.out",
      });

      // Scale in content
      tl.to(
        contentRef.current,
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.35,
          ease: "back.out(1.7)",
        },
        "-=0.1"
      );

      // Animate table rows with stagger - start much earlier
      tl.to(
        rowsRef.current,
        {
          opacity: 1,
          x: 0,
          duration: 0.25,
          stagger: 0.03,
          ease: "power2.out",
        },
        "-=0.25"
      );
    }
  }, [isOpen]);

  const handleClose = () => {
    if (!modalRef.current) return;

    const tl = gsap.timeline({
      onComplete: onClose,
    });

    // Animate rows out
    tl.to(rowsRef.current, {
      opacity: 0,
      x: -20,
      duration: 0.2,
      stagger: 0.02,
      ease: "power2.in",
    });

    // Scale out content
    tl.to(
      contentRef.current,
      {
        opacity: 0,
        scale: 0.8,
        y: 30,
        duration: 0.3,
        ease: "power2.in",
      },
      "-=0.1"
    );

    // Fade out backdrop
    tl.to(
      backdropRef.current,
      {
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
      },
      "-=0.1"
    );
  };

  const addRowRef = (el: HTMLTableRowElement | null) => {
    if (el && !rowsRef.current.includes(el)) {
      rowsRef.current.push(el);
    }
  };

  if (!isOpen) return null;

  return (
    <div ref={modalRef} className={styles.modal}>
      <div
        ref={backdropRef}
        className={styles.backdrop}
        onClick={handleClose}
      />

      <div ref={contentRef} className={styles.modalContent}>
        <div className={styles.header}>
          <h2 className={styles.title}>SIZE CHART / REFERENCE</h2>
          <button className={styles.closeButton} onClick={handleClose}>
            ×
          </button>
        </div>

        <div className={styles.tableContainer}>
          <table ref={tableRef} className={styles.sizeTable}>
            <thead>
              <tr className={styles.headerRow}>
                <th className={styles.headerCell}>Size</th>
                <th className={styles.headerCell}>Body Length at Back</th>
                <th className={styles.headerCell}>Chest Width</th>
                <th className={styles.headerCell}>Sleeve Length</th>
              </tr>
            </thead>
            <tbody>
              {sizeData.map((row) => (
                <tr key={row.size} ref={addRowRef} className={styles.dataRow}>
                  <td className={styles.sizeCell}>{row.size}</td>
                  <td className={styles.dataCell}>{row.bodyLength}</td>
                  <td className={styles.dataCell}>{row.chestWidth}</td>
                  <td className={styles.dataCell}>{row.sleeveLength}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.note}>
          <p>
            All measurements are in inches. For the best fit, measure a similar
            garment you own and compare to the chart above.
          </p>
        </div>
      </div>
    </div>
  );
}
