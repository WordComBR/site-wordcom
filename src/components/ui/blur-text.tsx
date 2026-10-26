"use client";

import { Children, cloneElement, isValidElement, useRef, useState, useSyncExternalStore, type HTMLAttributes, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import styles from "./blur-text.module.css";

const subscribeHydration = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

type BlurTextProps = HTMLAttributes<HTMLHeadingElement> & {
  children?: ReactNode;
  text?: string;
  delay?: number;
  stepDuration?: number;
  blur?: number;
  distance?: number;
  onAnimationComplete?: () => void;
};

function plainText(children: ReactNode): string {
  return Children.toArray(children).map(child => {
    if (typeof child === "string" || typeof child === "number") return String(child);
    if (isValidElement<{ children?: ReactNode }>(child)) return child.type === "br" ? " " : plainText(child.props.children);
    return "";
  }).join("");
}

// React Bits' word-by-word blur reveal, adapted to preserve existing heading markup.
export function BlurText({ children, text, delay = 220, stepDuration = 0.55, blur = 8, distance = 28, onAnimationComplete, ...props }: BlurTextProps) {
  const content = children ?? text;
  const ref = useRef<HTMLHeadingElement>(null);
  const hydrated = useSyncExternalStore(subscribeHydration, clientSnapshot, serverSnapshot);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const [complete, setComplete] = useState(false);
  const animate = hydrated && reduced === false && !complete;
  const label = plainText(content).replace(/\s+/g, " ").trim();
  const wordCount = label.split(/\s+/).filter(Boolean).length;
  let index = 0;

  function renderWords(nodes: ReactNode): ReactNode {
    return Children.map(nodes, child => {
      if (typeof child === "string" || typeof child === "number") {
        return String(child).split(/(\s+)/).map((word, part) => {
          if (!word || /^\s+$/.test(word)) return word;
          const rank = index++;
          return <motion.span
            key={`${rank}-${part}`}
            className={styles.word}
            data-blur-word
            aria-hidden="true"
            initial={{ filter: `blur(${Math.max(0, blur)}px)`, opacity: 0, transform: `translateY(${-distance}px)` }}
            animate={inView ? { filter: "blur(0px)", opacity: 1, transform: "translateY(0px)" } : { filter: `blur(${Math.max(0, blur)}px)`, opacity: 0, transform: `translateY(${-distance}px)` }}
            transition={{ duration: inView ? stepDuration * 2 : 0, delay: inView ? rank * Math.max(0, delay) / 1000 : 0, ease: [0.33, 1, 0.68, 1] }}
            onAnimationComplete={() => {
              if (inView && rank === wordCount - 1) {
                setComplete(true);
                onAnimationComplete?.();
              }
            }}
          >{word}</motion.span>;
        });
      }
      if (isValidElement<{ children?: ReactNode }>(child) && child.props.children !== undefined) {
        return cloneElement(child, undefined, renderWords(child.props.children));
      }
      return child;
    });
  }

  return <h2 {...props} ref={ref} aria-label={props["aria-label"] ?? label} data-blur-title data-blur-state={complete || reduced ? "complete" : inView && animate ? "revealing" : "waiting"}>
    {animate ? renderWords(content) : content}
  </h2>;
}
