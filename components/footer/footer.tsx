"use client";
import Link from "next/link";
import { useEffect } from "react";
import { gsap } from "gsap";
import styles from "./footer.module.scss";
import { SplitText } from "gsap/SplitText";

interface FooterProps {
  color?: string;
}

export default function Footer({ color = "var(--white)" }: FooterProps) {
  useEffect(() => {
    // Footer link hover animations with scale and opacity effect
    const footerLinks = document.querySelectorAll(".footer-link");

    footerLinks.forEach((link) => {
      const linkChars = new SplitText(link, {
        type: "chars",
        charsClass: "char-footer",
      });

      const handleMouseEnter = () => {
        gsap
          .fromTo(
            linkChars.chars,
            { opacity: 1 },
            {
              stagger: 0.05,
              opacity: 0.5,
              duration: 0.5,
              ease: "power4.inOut",
            }
          )
          .timeScale(2);
      };

      const handleMouseLeave = () => {
        gsap
          .to(linkChars.chars, {
            stagger: 0.05,
            opacity: 1,
            duration: 0.5,
            ease: "power4.inOut",
          })
          .timeScale(2);
      };

      link.addEventListener("mouseenter", handleMouseEnter);
      link.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      footerLinks.forEach((link) => {
        link.removeEventListener("mouseenter", () => {});
        link.removeEventListener("mouseleave", () => {});
      });
    };
  }, []);

  return (
    <footer className={styles.footer} style={{ color: color }}>
      <div className={styles.footerContent}>
        <div className={styles.footerLeft}>
          <FooterLogo color={color} />
        </div>
        <div className={styles.footerRight}>
          <Link
            href="mailto:contact@trouble.tokyo"
            className={`${styles.footerLink} footer-link`}
          >
            CONTACT
          </Link>
          <Link
            href="https://www.instagram.com/troubletokyo/"
            className={`${styles.footerLink} footer-link`}
          >
            INSTAGRAM
          </Link>
          <Link href="/media" className={`${styles.footerLink} footer-link`}>
            MEDIA
          </Link>
          <Link href="/about" className={`${styles.footerLink} footer-link`}>
            ABOUT
          </Link>
        </div>
      </div>
    </footer>
  );
}

interface FooterLogoProps {
  color?: string;
}

const FooterLogo: React.FC<FooterLogoProps> = ({ color = "white" }) => {
  return (
    <svg
      width="915"
      height="180"
      viewBox="0 0 915 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.0345186 171.112L12.6954 25.1513C13.061 20.9603 16.5701 17.7456 20.7772 17.7456H65.0671C69.8257 17.7456 73.5675 21.8237 73.1488 26.5593L69.0149 73.8028C68.6028 78.545 72.338 82.6165 77.0966 82.6165H211.974C216.719 82.6165 220.454 86.668 220.062 91.397C219.71 95.6013 216.194 98.8359 211.974 98.8359H74.3119C70.1115 98.8359 66.609 102.037 66.2302 106.215L60.2553 172.54C59.8765 176.718 56.3739 179.92 52.1736 179.92H8.11624C3.35759 179.92 -0.377543 175.848 0.0345186 171.112Z"
        fill={color}
      />
      <path
        d="M379.064 169.153L396.045 83.6524C397.042 78.6378 393.201 73.962 388.083 73.962H236.657C231.912 73.962 228.177 69.9105 228.569 65.1815C228.921 60.9772 232.437 57.7426 236.657 57.7426H451.913C457.03 57.7426 460.865 62.4185 459.868 67.433L439.019 172.308C438.262 176.1 434.932 178.837 431.064 178.837H387.02C381.902 178.837 378.068 174.161 379.058 169.146L379.064 169.153ZM232.357 25.1776C232.71 20.9734 236.225 17.7388 240.446 17.7388H456.771C461.517 17.7388 465.252 21.7903 464.86 26.5193C464.507 30.7236 460.992 33.9582 456.771 33.9582H240.446C235.7 33.9582 231.965 29.9066 232.357 25.1776Z"
        fill={color}
      />
      <path
        d="M698.964 168.15L722.963 40.5669C723.681 36.7345 727.037 33.9583 730.938 33.9583H770.682C775.766 33.9583 779.595 38.5743 778.658 43.5624L754.658 171.146C753.94 174.978 750.584 177.754 746.683 177.754H706.939C701.855 177.754 698.026 173.138 698.964 168.15Z"
        fill={color}
      />
      <path
        d="M784.499 168.947L797.16 22.986C797.526 18.795 801.035 15.5803 805.242 15.5803H849.519C854.284 15.5803 858.026 19.6651 857.6 24.4073L846.189 152.714C845.77 157.457 849.505 161.541 854.271 161.541H906.37C911.115 161.541 914.85 165.593 914.458 170.322C914.106 174.526 910.59 177.761 906.37 177.761H792.588C787.829 177.761 784.094 173.689 784.506 168.954H784.499V168.947Z"
        fill={color}
      />
      <path
        d="M689.366 28.0137H691.52C694.59 28.0137 697.149 25.6758 697.422 22.6206L698.791 7.43731C699.103 3.97027 696.372 0.981445 692.889 0.981445C689.818 0.981445 687.26 3.31937 686.987 6.37462L685.04 28.0137"
        fill={color}
      />
      <path
        d="M708.76 28.0137H710.913C713.984 28.0137 716.543 25.6758 716.815 22.6206L718.184 7.43731C718.496 3.97027 715.765 0.981445 712.282 0.981445C709.212 0.981445 706.653 3.31937 706.381 6.37462L704.433 28.0137"
        fill={color}
      />
      <path
        d="M689.406 40.4474H672.18C670.093 40.4474 668.458 38.6674 668.631 36.5952L669.88 21.5979C670.053 19.5256 668.411 17.7456 666.331 17.7456H477.653C475.799 17.7456 474.257 19.167 474.104 21.0067L473.347 30.1061C473.174 32.1783 474.816 33.9583 476.896 33.9583H638.823C641.062 33.9583 642.75 36.004 642.318 38.2025L616.133 171.345C615.701 173.543 617.382 175.589 619.629 175.589H672.951C674.652 175.589 676.121 174.387 676.446 172.713L701.556 44.6849C701.988 42.4865 700.299 40.4408 698.06 40.4408H689.406V40.4474Z"
        fill={color}
      />
    </svg>
  );
};
