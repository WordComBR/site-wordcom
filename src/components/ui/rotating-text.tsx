"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import styles from "./rotating-text.module.css";

interface RotatingTextProps {
  texts: string[];
  rotationInterval?: number;
  staggerDuration?: number;
  highlightColor?: string;
}

const subscribeHydration = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

// React Bits' flip preset, with last-letter-first stagger and the supplied timing.
export default function RotatingText({ texts, rotationInterval = 4100, staggerDuration = 0.1, highlightColor = "#790870" }: RotatingTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { amount: 0.2 });
  const reduced = useReducedMotion();
  const hydrated = useSyncExternalStore(subscribeHydration, clientSnapshot, serverSnapshot);
  const [index, setIndex] = useState(0);
  const [pageVisible, setPageVisible] = useState(true);
  const current = texts[index % Math.max(1, texts.length)] ?? "";
  const longest = texts.reduce((a, b) => a.length > b.length ? a : b, "");

  useEffect(() => {
    const sync = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, []);

  useEffect(() => {
    if (!hydrated || !inView || !pageVisible || reduced !== false || texts.length < 2) return;
    const timer = setTimeout(() => setIndex(previous => (previous + 1) % texts.length), rotationInterval);
    return () => clearTimeout(timer);
  }, [index, hydrated, inView, pageVisible, reduced, texts.length, rotationInterval]);

  return <span ref={ref} className={styles.slot} aria-hidden="true" data-rotating-text data-current-text={current}>
    {/* Reserve the longest word so neither the heading nor the cards jump. */}
    <span className={styles.measure}>{longest}</span>
    <motion.span className={styles.highlight} layout="size"
      style={{ backgroundColor: highlightColor }}
      transition={{ type: "spring", damping: 34, stiffness: 320 }}>
      {!hydrated || reduced !== false ? <span className={styles.word}>{current}</span> :
        <AnimatePresence mode="wait" initial={false}>
          <motion.span key={index} className={styles.word}>
            {Array.from(current).map((letter, position, letters) => {
              const delay = (letters.length - 1 - position) * staggerDuration;
              return <motion.span key={position} className={styles.letter}
                initial={{ rotateX: -90, opacity: 0, transformPerspective: 480 }}
                animate={{ rotateX: 0, opacity: 1, transformPerspective: 480 }}
                exit={{ rotateX: 90, opacity: 0, transformPerspective: 480, transition: { type: "tween", duration: 0.32, ease: [0.5, 0, 0.75, 0], delay } }}
                transition={{ type: "tween", duration: 0.6, ease: [0.34, 1.4, 0.64, 1], delay }}>
                {letter}
              </motion.span>;
            })}
          </motion.span>
        </AnimatePresence>}
    </motion.span>
  </span>;
}

export function TituloSolucoes() {
  return <h2 className={styles.title} data-rotating-title aria-label="Estratégia para conectar, comunicar e transformar.">
    <span className={styles.fixed} aria-hidden="true">Estratégia para</span>{" "}
    <RotatingText texts={["conectar", "comunicar", "transformar"]} />
  </h2>;
}
