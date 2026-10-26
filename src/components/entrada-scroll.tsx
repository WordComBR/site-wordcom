"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef, useState, useSyncExternalStore, type ReactNode } from "react";

const subscribeHydration = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

const tags = { div: motion.div, h2: motion.h2, p: motion.p, article: motion.article };

export function EntradaScroll({
  children, className, delay = 0, destaque = false, as = "div", id, deslocamento,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  destaque?: boolean;
  as?: keyof typeof tags;
  id?: string;
  deslocamento?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const [focused, setFocused] = useState(false);
  const inView = useInView(ref, { once: true, amount: 0.08 });
  const reducedMotion = useReducedMotion();
  const hydrated = useSyncExternalStore(subscribeHydration, clientSnapshot, serverSnapshot);
  const visible = !hydrated || reducedMotion || inView || focused;
  const Tag = tags[as];
  const distance = deslocamento ?? (destaque ? 24 : 16);

  return (
    <Tag
      ref={(element) => { ref.current = element; }}
      className={className}
      id={id}
      data-entrada-scroll
      data-entrada-state={visible ? "visible" : "waiting"}
      onFocusCapture={() => setFocused(true)}
      initial={false}
      animate={{
        opacity: visible ? 1 : destaque ? 0.12 : 0.3,
        transform: distance === 0 ? "none" : visible ? "translateY(0px)" : `translateY(${distance}px)`,
      }}
      transition={{
        duration: reducedMotion || focused ? 0 : destaque ? 1.35 : 1.1,
        delay: visible && !reducedMotion && !focused ? delay : 0,
        ease: [0.33, 1, 0.68, 1],
      }}
    >
      {children}
    </Tag>
  );
}
