"use client";

import { createContext, forwardRef, useContext, useRef, type HTMLAttributes } from "react";
import { motion, useMotionTemplate, useReducedMotion, useScroll, useTransform, type HTMLMotionProps, type MotionValue } from "motion/react";
import styles from "./animated-gallery.module.css";

const GalleryScrollContext = createContext<MotionValue<number> | null>(null);

function useGalleryScroll() {
  const progress = useContext(GalleryScrollContext);
  if (!progress) throw new Error("Gallery components must be inside ContainerScroll.");
  return progress;
}

export function ContainerScroll({ className = "", children, ...props }: HTMLAttributes<HTMLDivElement>) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  return <GalleryScrollContext.Provider value={scrollYProgress}>
    <div ref={ref} className={`${styles.scroll} ${className}`} {...props}>{children}</div>
  </GalleryScrollContext.Provider>;
}

export function ContainerSticky({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`${styles.sticky} ${className}`} {...props} />;
}

export function GalleryContainer({ className = "", style, ...props }: HTMLMotionProps<"div">) {
  const progress = useGalleryScroll();
  const reduced = useReducedMotion();
  const rotate = useTransform(progress, [0, 0.5], [75, 0]);
  const scale = useTransform(progress, [0.5, 0.9], [1.2, 1]);
  const transform = useMotionTemplate`rotateX(${rotate}deg) scale(${scale})`;
  return <motion.div className={`${styles.gallery} ${className}`} data-animated-gallery
    style={{ transform: reduced ? "none" : transform, ...style }} {...props} />;
}

export function GalleryCol({ className = "", style, yRange = ["0%", "-10%"], ...props }: HTMLMotionProps<"div"> & { yRange?: [string, string] }) {
  const progress = useGalleryScroll();
  const reduced = useReducedMotion();
  const y = useTransform(progress, [0.5, 1], yRange);
  const transform = useMotionTemplate`translateY(${y})`;
  return <motion.div className={`${styles.column} ${className}`} data-gallery-column
    style={{ transform: reduced ? "none" : transform, ...style }} {...props} />;
}

export const ContainerStagger = forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
  ({ viewport, transition, ...props }, ref) => <motion.div ref={ref} initial="hidden" whileInView="visible"
    viewport={{ once: true, ...viewport }} transition={{ staggerChildren: 0.06, ...transition }} {...props} />,
);
ContainerStagger.displayName = "ContainerStagger";

export const ContainerAnimated = forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
  ({ transition, ...props }, ref) => {
    const reduced = useReducedMotion();
    return <motion.div ref={ref} variants={{ hidden: { opacity: reduced ? 1 : 0, filter: reduced ? "none" : "blur(10px)" }, visible: { opacity: 1, filter: "blur(0px)" } }}
      transition={{ type: "spring", stiffness: 100, damping: 16, mass: 0.75, ...transition }} {...props} />;
  },
);
ContainerAnimated.displayName = "ContainerAnimated";
