import Image from "next/image";
import Link from "next/link";
import styles from "./about.module.scss";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import { Logo } from "@/components/logo";
import MenuNav from "@/components/MenuNav/MenuNav";

export default function AboutPage() {
  return (
    <div className={styles.aboutPage}>
      {/* <Header />     */}

      <main className={styles.mainContent}>
        {/* Background Image Placeholder */}
        <div className={styles.backgroundImageContainer}>
          {/* Space for background image - you can add the image here */}
          <div className={styles.imagePlaceholder}>
            <Image
              src="/images/about/bg-cover.jpg"
              alt="About background"
              fill
              //   className={styles.sectionBg}
            />
          </div>
        </div>

        {/* Content Overlay */}
        <div className={styles.contentOverlay}>
          <MenuNav />

          {/* Main Content Area */}
          <div className={styles.mainContentArea}>
            {/* Trouble Logo */}
            <div className={styles.logoContainer}>
              <div className={styles.troubleLogo}>
                <Logo />
              </div>
            </div>

            {/* Main Text Content */}
            <div className={styles.textContent}>
              <p className={styles.mainDescription}>
                At the heart of every innovation is a Troublemaker-- someone who
                dared to dream, challenged the status quo, and relentlessly
                forged a path that ultimately reshaped the world as we know it.
                Pursuing your dreams demands persistence to pave new roads,
                leading you to a future no one else has imagined. Our apparel,
                plates, stickers, and events represent our support in rebelling
                through your pursuit of passion. We acknowledge and embrace the
                Troubles that fuel creativity and inspire change.
              </p>

              <h2 className={styles.slogan}>LETS TROUBLE INTO TRIUMPH.</h2>

              <div className={styles.additionalContent}>
                <p className={styles.description}>
                  TroubleTokyo is a multimedia platform that captures the scene
                  from our unique perspective while creating premium products.
                  We live at the intersection of varied viewpoints, fostering a
                  culture and connecting with our community at eye level.
                </p>

                <p className={styles.italicText}>
                  Join Trouble as we pay homage to the icons and eras that
                  shaped the past, all while racing towards the future on full
                  throttle.
                </p>

                <p className={styles.description}>
                  When you purchase our goods, know that every dollar speaks
                  volumes. It's a payout for the copyrights to the creative
                  directors, project managers, and photographers we support and
                  collaborate with. We were all on our separate paths, honing
                  our skills, and now we've come together to create together,
                  pouring everything we have into the culture of our brand, and
                  we'd love for you to be part of the journey.
                </p>
              </div>

              {/* FAQ Section */}
              <div className={styles.faqSection}>
                <p className={styles.faqPrompt}>GOT A QUESTION? CLICK HERE:</p>
                <Link href="/faq" className={styles.faqLink}>
                  FREQUENTLY ASKED QUESTIONS
                </Link>
              </div>
            </div>
          </div>

          <Footer color="var(--white)" />
        </div>
      </main>
    </div>
  );
}
