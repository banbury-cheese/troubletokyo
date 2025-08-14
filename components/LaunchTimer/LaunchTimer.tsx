"use client";
import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { LAUNCH_TIMER_CONFIG } from "@/lib/constants";
import { Logo } from "../logo";
import styles from "./LaunchTimer.module.scss";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function LaunchTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isLaunched, setIsLaunched] = useState(false);
  const [localLaunchTime, setLocalLaunchTime] = useState<string>("");
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  // Launch date from configuration
  const launchDate = new Date(LAUNCH_TIMER_CONFIG.LAUNCH_DATE).getTime();

  // Format launch date in user's local timezone
  useEffect(() => {
    const launchDateTime = new Date(LAUNCH_TIMER_CONFIG.LAUNCH_DATE);
    const localTime = launchDateTime.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      timeZoneName: 'short'
    });
    setLocalLaunchTime(localTime);
  }, []);

  // Don't render timer if disabled in config
  if (!LAUNCH_TIMER_CONFIG.ENABLE_TIMER) {
    return null;
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = launchDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setIsLaunched(true);
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [launchDate]);

  useEffect(() => {
    if (containerRef.current && logoRef.current) {
      // Initial animation
      gsap.set([containerRef.current, logoRef.current], { opacity: 0 });

      const tl = gsap.timeline();
      tl.to(logoRef.current, {
        opacity: 1,
        duration: 1,
        ease: "power3.out",
      }).to(
        containerRef.current,
        {
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.5"
      );
    }
  }, []);

  if (isLaunched) {
    return (
      <div className={styles.launched}>
        <div className={styles.launchedLogo} ref={logoRef}>
          <Logo />
        </div>
        <p className={styles.launchedText}>Now Live</p>
      </div>
    );
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        <div className={styles.logo} ref={logoRef}>
          <Logo />
        </div>

        <div className={styles.comingSoon}>Coming Soon</div>

        <div className={styles.timer} ref={containerRef}>
          <div className={styles.timeGroup}>
            <div className={styles.timeValue}>
              {String(timeLeft.days).padStart(2, "0")}
            </div>
            <div className={styles.timeLabel}>Days</div>
          </div>

          <div className={styles.separator}>:</div>

          <div className={styles.timeGroup}>
            <div className={styles.timeValue}>
              {String(timeLeft.hours).padStart(2, "0")}
            </div>
            <div className={styles.timeLabel}>Hours</div>
          </div>

          <div className={styles.separator}>:</div>

          <div className={styles.timeGroup}>
            <div className={styles.timeValue}>
              {String(timeLeft.minutes).padStart(2, "0")}
            </div>
            <div className={styles.timeLabel}>Minutes</div>
          </div>

          <div className={styles.separator}>:</div>

          <div className={styles.timeGroup}>
            <div className={styles.timeValue}>
              {String(timeLeft.seconds).padStart(2, "0")}
            </div>
            <div className={styles.timeLabel}>Seconds</div>
          </div>
        </div>

        <div className={styles.launchDate}>
          {localLaunchTime}
        </div>
      </div>
    </div>
  );
}
