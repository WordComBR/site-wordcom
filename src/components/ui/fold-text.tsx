"use client";

import { useEffect, useRef, type HTMLAttributes } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./fold-text.module.css";

type FoldTextProps = HTMLAttributes<HTMLHeadingElement>;
type FoldPiece = { element: HTMLElement; t: number; r: number; aim: number };
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

// Keep the original heading in flow; only its visual copy folds into view.
export function FoldText({ children, className = "", ...props }: FoldTextProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const original = root.querySelector<HTMLElement>("[data-fold-original]")!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    gsap.registerPlugin(ScrollTrigger);
    let scrollTrigger: ScrollTrigger | undefined;
    let tween: gsap.core.Tween | undefined;
    let overlay: HTMLElement | undefined;
    let disposed = false;
    let entered = false;
    let generation = 0;
    let pieces: FoldPiece[] = [];
    let pointer: { x: number; y: number } | null = null;
    let centers: { x: number; y: number }[] | null = null;
    let measured = { width: 0, height: 0 };
    let relaxing = false;
    const unfoldEase = gsap.parseEase("power3.out");

    function reset() {
      tween?.kill();
      scrollTrigger?.kill();
      gsap.ticker.remove(relax);
      relaxing = false;
      overlay?.remove();
      original.style.opacity = "";
      centers = null;
      pieces = [];
    }

    function render() {
      pieces.forEach(piece => {
        const tilt = piece.r * 45;
        const progress = unfoldEase(piece.t);
        piece.element.style.transform = `rotateX(${-((1 - progress) * 92 + tilt)}deg)`;
        piece.element.style.opacity = String(clamp(progress, 0, 1));
        piece.element.style.setProperty("--fold-crease", String(0.55 * clamp(1 - progress + tilt / 90, 0, 1)));
      });
    }

    function relax(_time: number, deltaTime: number) {
      const step = Math.min(deltaTime, 64) / 1000;
      let moving = false;
      pieces.forEach(piece => {
        const rate = piece.aim > piece.r ? 14 : 6;
        piece.r += (piece.aim - piece.r) * (1 - Math.exp(-rate * step));
        if (Math.abs(piece.aim - piece.r) > 0.001) moving = true;
        else piece.r = piece.aim;
      });
      render();
      if (!moving) {
        gsap.ticker.remove(relax);
        relaxing = false;
      }
    }

    function aim() {
      if (!pieces.length || reduced.matches) return;
      const box = root!.getBoundingClientRect();
      const near = pointer && pointer.x > box.left - 140 && pointer.x < box.right + 140 &&
        pointer.y > box.top - 140 && pointer.y < box.bottom + 140;
      if (near && (!centers || Math.abs(box.width - measured.width) + Math.abs(box.height - measured.height) > 1)) {
        centers = pieces.map(piece => {
          const rect = piece.element.parentElement!.getBoundingClientRect();
          return { x: rect.left - box.left + rect.width / 2, y: rect.top - box.top + rect.height / 2 };
        });
        measured = { width: box.width, height: box.height };
      }
      let changed = false;
      pieces.forEach((piece, index) => {
        let value = 0;
        if (near && centers && pointer) {
          const center = centers[index];
          const distance = Math.hypot(box.left + center.x - pointer.x, box.top + center.y - pointer.y) / 140;
          if (distance < 1) value = 1 - distance * distance * (3 - 2 * distance);
        }
        if (value !== piece.aim) changed = true;
        piece.aim = value;
      });
      if (changed && !relaxing) {
        relaxing = true;
        gsap.ticker.add(relax);
      }
    }

    function handleMove(event: PointerEvent) {
      if (!finePointer.matches || event.pointerType === "touch") return;
      pointer = { x: event.clientX, y: event.clientY };
      aim();
    }

    function handleLeave() { pointer = null; aim(); }
    function handleScroll() { if (pointer) aim(); }

    function play() {
      entered = true;
      root!.dataset.foldState = "revealing";
      tween = gsap.fromTo(pieces, { t: 0 }, {
        t: 1, duration: 0.65, stagger: { each: 0.045, from: "start" }, ease: "none",
        onUpdate: render,
        onComplete: () => { root!.dataset.foldState = "complete"; },
      });
    }

    async function prepare() {
      const currentGeneration = ++generation;
      reset();
      if (reduced.matches) { root!.dataset.foldState = "complete"; return; }
      await document.fonts.ready;
      if (disposed || currentGeneration !== generation) return;
      const box = root!.getBoundingClientRect();
      overlay = document.createElement("span");
      overlay.className = styles.visual;
      overlay.setAttribute("aria-hidden", "true");
      const walker = document.createTreeWalker(original, NodeFilter.SHOW_TEXT);
      let node: Node | null;

      while ((node = walker.nextNode())) {
        const parent = node.parentElement!;
        const appearance = getComputedStyle(parent);
        const parentBox = parent.getBoundingClientRect();
        let offset = 0;
        for (const char of Array.from(node.textContent ?? "")) {
          const start = offset;
          offset += char.length;
          if (/\s/.test(char)) continue;
          const range = document.createRange();
          range.setStart(node, start);
          range.setEnd(node, offset);
          const rect = range.getBoundingClientRect();
          const segment = document.createElement("span");
          segment.className = styles.segment;
          Object.assign(segment.style, {
            left: `${rect.left - box.left}px`, top: `${rect.top - box.top}px`,
            width: `${rect.width}px`, height: `${rect.height}px`,
          });
          const piece = document.createElement("span");
          piece.className = styles.piece;
          piece.dataset.foldPiece = "";
          piece.dataset.foldText = char;
          piece.textContent = char;
          Object.assign(piece.style, {
            font: appearance.font, fontWeight: appearance.fontWeight,
            lineHeight: `${rect.height}px`, color: appearance.color,
          });
          if (appearance.backgroundImage !== "none") {
            Object.assign(piece.style, {
              backgroundImage: appearance.backgroundImage,
              backgroundSize: `${parentBox.width}px ${rect.height}px`,
              backgroundPosition: `${parentBox.left - rect.left}px 0px`,
              backgroundClip: "text", webkitBackgroundClip: "text", color: "transparent",
            });
          }
          segment.append(piece);
          overlay.append(segment);
          pieces.push({ element: piece, t: entered ? 1 : 0, r: 0, aim: 0 });
        }
      }
      root!.append(overlay);
      original.style.opacity = "0";
      render();
      if (entered) { root!.dataset.foldState = "complete"; return; }
      root!.dataset.foldState = "waiting";
      scrollTrigger = ScrollTrigger.create({ trigger: root, start: "top 82%", once: true, onEnter: play });
    }

    void prepare();
    window.addEventListener("resize", prepare);
    window.addEventListener("pointermove", handleMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true, capture: true });
    document.documentElement.addEventListener("pointerleave", handleLeave);
    reduced.addEventListener("change", prepare);
    return () => {
      disposed = true;
      reset();
      window.removeEventListener("resize", prepare);
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("scroll", handleScroll, { capture: true });
      document.documentElement.removeEventListener("pointerleave", handleLeave);
      reduced.removeEventListener("change", prepare);
    };
  }, []);

  return <h2 {...props} ref={ref} className={`${styles.root} ${className}`} data-fold-title>
    <span data-fold-original>{children}</span>
  </h2>;
}
