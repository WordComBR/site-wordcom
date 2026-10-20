"use client";

import Image from "next/image";
import { motion, useMotionTemplate, useReducedMotion, useScroll, useSpring, useTransform, type MotionStyle } from "motion/react";
import { useRef, useSyncExternalStore, type CSSProperties } from "react";
import { FundoVideo } from "@/components/fundo-video";
import styles from "./scroll-expansion-hero.module.css";

const subscribeHydration = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

type ScrollExpandMediaProps = {
  mediaSrc: string;
  bgImageSrc: string;
  title: string;
  titleLines: [string, string];
  highlightLine?: 0 | 1;
  imageFit?: "contain" | "cover";
  imageAspectRatio?: number;
  mobileImageAspectRatio?: number;
  mobileVideo?: { src: string; poster: string };
  mobileImageComposition?: "original" | "light";
  preserveMobileMedia?: boolean;
  hideTitle?: boolean;
} & ({ mediaType?: "video"; posterSrc: string } | { mediaType: "image"; posterSrc?: never });

export default function ScrollExpandMedia({ mediaType = "video", mediaSrc, posterSrc, bgImageSrc, title, titleLines, highlightLine, imageFit = "contain", imageAspectRatio, mobileImageAspectRatio, mobileVideo, mobileImageComposition, preserveMobileMedia = false, hideTitle = false }: ScrollExpandMediaProps) {
  const section = useRef<HTMLElement>(null);
  const hydrated = useSyncExternalStore(subscribeHydration, clientSnapshot, serverSnapshot);
  const preference = useReducedMotion();
  const reduced = hydrated && preference === true;
  const initialImageHeight = mediaType === "image" && imageAspectRatio && Number.isFinite(imageAspectRatio) && imageAspectRatio > 0 ? 300 / imageAspectRatio : 400;
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 240, damping: 32, mass: 0.5 });
  const inset = useTransform(progress, [0, 1], [1, 0]);
  const radius = useTransform(progress, [0, 1], [16, 0]);
  const clipPath = useMotionTemplate`inset(calc(var(--expansion-y) * ${inset}) calc(var(--expansion-x) * ${inset}) round ${radius}px)`;
  const backgroundOpacity = useTransform(progress, [0, 1], [1, 0]);
  const titleOpacity = useTransform(progress, [0, 0.5, 0.75], [1, 1, 0]);
  const veilOpacity = useTransform(progress, [0, 0.55, 0.8, 1], [0.72, 0.72, 0.2, 0]);
  const left = useTransform(progress, [0, 1], [0, -110]);
  const right = useTransform(progress, [0, 1], [0, 110]);
  const firstTransform = useMotionTemplate`translateX(${left}vw)`;
  const secondTransform = useMotionTemplate`translateX(${right}vw)`;
  const imageWidth = useMotionTemplate`min(100%, calc(var(--media-start-width) + (100% - var(--media-start-width)) * ${progress}))`;
  const imageHeight = useMotionTemplate`min(100%, calc(var(--media-start-height) + (100% - var(--media-start-height)) * ${progress}))`;

  return (
    <section ref={section} className={styles.scene} aria-label={title} data-expansion-hero>
      <div className={styles.stage} data-expansion-stage data-mobile-media={mobileImageComposition ? "portrait" : preserveMobileMedia ? "complete" : undefined} data-mobile-tone={mobileImageComposition} style={{
        "--media-desktop-height": `${initialImageHeight}px`,
        "--media-aspect": mobileImageAspectRatio ?? imageAspectRatio ?? 16 / 9,
      } as CSSProperties}>
        <motion.div className={styles.background} aria-hidden="true" style={{ opacity: reduced ? 0 : backgroundOpacity }}>
          <Image src={bgImageSrc} alt="" fill sizes="100vw" />
        </motion.div>
        <motion.div className={styles.media} data-expansion-media style={{
          clipPath: reduced ? "none" : clipPath,
          "--media-width": reduced ? "100%" : imageWidth,
          "--media-height": reduced ? "100%" : imageHeight,
          "--media-progress": reduced ? 1 : progress,
        } as MotionStyle}>
          {mediaType === "image" ? <motion.div className={`${styles.imagePanel}${imageFit === "cover" ? ` ${styles.imageFill}` : ""}`}
            style={{ width: reduced ? "100%" : imageWidth, height: reduced ? "100%" : imageHeight }}>
            {mobileImageComposition ? <div className={styles.portraitBackdrop} aria-hidden="true"><Image src={bgImageSrc} alt="" fill sizes="(max-width: 900px) 100vw, 1px" /></div> : null}
            <Image src={mediaSrc} alt="" fill sizes="100vw" priority className={mobileImageComposition ? styles.portraitArtwork : undefined} />
          </motion.div> : <div className={styles.videoPanel}>
            <FundoVideo src={mediaSrc} poster={posterSrc} className={`${styles.video}${mobileVideo ? ` ${styles.desktopVideo}` : ""}`} />
            {mobileVideo ? <FundoVideo src={mobileVideo.src} poster={mobileVideo.poster} className={`${styles.video} ${styles.mobileVideo}`} /> : null}
          </div>}
          <motion.div className={styles.veil} aria-hidden="true" style={{ opacity: reduced ? 0.72 : veilOpacity }} />
        </motion.div>
        <motion.h1 className={hideTitle ? styles.hiddenTitle : styles.title} aria-label={title} style={{ opacity: reduced ? 1 : titleOpacity }}>
          <motion.span className={highlightLine === 0 ? styles.highlight : undefined} aria-hidden="true" style={{ transform: reduced ? "none" : firstTransform }}>{titleLines[0]}</motion.span>
          <motion.span className={highlightLine === 1 ? styles.highlight : undefined} aria-hidden="true" style={{ transform: reduced ? "none" : secondTransform }}>{titleLines[1]}</motion.span>
        </motion.h1>
      </div>
    </section>
  );
}
