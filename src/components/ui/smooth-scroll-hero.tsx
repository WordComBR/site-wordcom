"use client";

import Image from "next/image";
import { motion, useMotionTemplate, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { createContext, useRef, useSyncExternalStore, type CSSProperties, type ReactNode } from "react";
import styles from "./smooth-scroll-hero.module.css";

const subscribeHydration = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

interface SmoothScrollHeroProps {
  scrollHeight?: number;
  desktopImage: string;
  mobileImage?: string;
  initialClipPercentage?: number;
  finalClipPercentage?: number;
  intro: ReactNode;
  cardCount: number;
  children: ReactNode;
}

export const ProcessSequenceContext = createContext<{
  progress: MotionValue<number>;
  openingDistance: number;
  titleDistance: number;
  cardDistance: number;
  reducedMotion: boolean;
} | null>(null);

export function ProcessSequenceCard({ progress, start, end, index, count, children }: {
  progress: MotionValue<number>;
  start: number;
  end: number;
  index: number;
  count: number;
  children: ReactNode;
}) {
  const remaining = count - index - 1;
  const opacity = useTransform(progress, [start, start + 260], [0, 1]);
  const translate = useTransform(progress, [start, start + 260], [64, index * 10]);
  const scale = useTransform(progress,
    remaining ? [start, start + 260, end, end + (end - start) * remaining] : [start, start + 260],
    remaining ? [0.96, 1, 1, 1 - remaining * 0.035] : [0.96, 1]);
  const transform = useMotionTemplate`translateY(${translate}px) scale(${scale})`;
  const pointerEvents = useTransform(progress, value => value >= start + 100 && (!remaining || value < end) ? "auto" : "none");
  return <motion.li className="metodoArte metodoEtapaSequencial" data-process-card
    style={{ opacity, transform, pointerEvents, zIndex: index + 1 }}>{children}</motion.li>;
}

export default function SmoothScrollHero({
  scrollHeight = 1500,
  desktopImage,
  mobileImage = desktopImage,
  initialClipPercentage = 25,
  finalClipPercentage = 75,
  intro,
  cardCount,
  children,
}: SmoothScrollHeroProps) {
  const container = useRef<HTMLDivElement>(null);
  const hydrated = useSyncExternalStore(subscribeHydration, clientSnapshot, serverSnapshot);
  const reducedMotionPreference = useReducedMotion();
  const reducedMotion = hydrated && reducedMotionPreference === true;
  const openingDistance = Math.max(1, scrollHeight);
  const titleDistance = 1000;
  const cardDistance = 900;
  const travel = openingDistance + titleDistance + Math.max(1, cardCount) * cardDistance;
  // Measure from this section, not from the top of the whole page.
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 240, damping: 32, mass: 0.5 });
  const progress = useTransform(smoothProgress, [0, 1], [0, travel]);
  const clipStart = useTransform(progress, [0, openingDistance], [initialClipPercentage, 0]);
  const clipEnd = useTransform(progress, [0, openingDistance], [finalClipPercentage, 100]);
  const clipPath = useMotionTemplate`polygon(${clipStart}% ${clipStart}%, ${clipEnd}% ${clipStart}%, ${clipEnd}% ${clipEnd}%, ${clipStart}% ${clipEnd}%)`;
  const imageScale = useTransform(progress, [0, openingDistance], [1.7, 1]);
  const imageTransform = useMotionTemplate`scale(${imageScale})`;
  const titleRange = [openingDistance, openingDistance + 300];
  const titleOpacity = useTransform(progress, titleRange, [0, 1]);
  const titleTranslate = useTransform(progress, titleRange, [28, 0]);
  const titleTransform = useMotionTemplate`translateY(${titleTranslate}px)`;

  return (
    <div ref={container} className={styles.scene} data-process-reveal
      style={{ "--process-travel": `${travel}px` } as CSSProperties}>
      <div className={styles.stage} data-process-stage>
      <div className={styles.backgroundLayer} aria-hidden="true">
        <motion.div className={styles.background} data-process-background
          style={{ clipPath: reducedMotion ? "none" : clipPath }}>
          <motion.div className={styles.image} style={{ transform: reducedMotion ? "none" : imageTransform }}>
            <Image className={styles.desktopImage} src={desktopImage} alt="" fill sizes="100vw" />
            {mobileImage !== desktopImage && <Image className={styles.mobileImage} src={mobileImage} alt="" fill sizes="100vw" />}
          </motion.div>
          <div className={styles.veil} />
        </motion.div>
      </div>
      <div className={styles.content} data-process-content>
        <motion.div className={styles.intro} data-process-title
          style={{ opacity: reducedMotion ? 1 : titleOpacity, transform: reducedMotion ? "none" : titleTransform }}>
          {intro}
        </motion.div>
        <ProcessSequenceContext.Provider value={{ progress, openingDistance, titleDistance, cardDistance, reducedMotion }}>
        {children}
        </ProcessSequenceContext.Provider>
      </div>
      </div>
    </div>
  );
}
