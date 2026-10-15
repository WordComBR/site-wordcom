"use client";

import { getImageProps } from "next/image";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useId, useLayoutEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { useReducedMotion } from "motion/react";
import styles from "./carousel-circular-image-gallery.module.css";

gsap.registerPlugin(MotionPathPlugin);

export type CircularGalleryImage = { src: string; alt: string; width: number; height: number };
type Position = { cx: number; cy: number; r: number };
const subscribeHydration = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;
const smallPosition = (index: number, total: number): Position => ({ cx: 200 - (total * 24 - 10) / 2 + index * 24, cy: 370, r: 7 });

function GallerySlide({ image, index, total, prefix, open, inPlace, reduced, onInPlace }: {
  image: { src: string; alt: string }; index: number; total: number; prefix: string;
  open: boolean; inPlace: boolean; reduced: boolean; onInPlace: (index: number) => void;
}) {
  const clip = useRef<SVGCircleElement>(null);
  const firstLoad = useRef(true);
  const small = smallPosition(index, total);

  useLayoutEffect(() => {
    const circle = clip.current;
    if (!circle) return;
    const initial = firstLoad.current;
    firstLoad.current = false;
    const target = smallPosition(index, total);
    if (reduced) {
      gsap.set(circle, { attr: target });
      if (open) onInPlace(index);
      return;
    }

    // Animate the reference's SVG geometry, including its outgoing bounce path.
    // Mobile keeps the reveal inside its SVG viewport instead of using huge offscreen circles.
    const mobile = window.matchMedia("(max-width: 900px)").matches;
    const expanded = mobile ? { cx: 200, cy: 200, r: 285 } : { cx: -4700, cy: 200, r: 4900 };
    const outgoing = mobile ? expanded : { cx: 5100, cy: 200, r: 4900 };
    const position = { ...target };
    const render = () => { gsap.set(circle, { attr: position }); };
    const flip = initial ? 0 : 0.4;
    const timeline = gsap.timeline({ onUpdate: render });
    if (open) {
      timeline.set(position, target)
        .to(position, { cx: 200, cy: 200, r: 49, duration: initial ? 0 : 0.2, ease: "power3.inOut" })
        .to(position, { ...expanded, duration: flip, ease: "power4.in", onComplete: () => onInPlace(index) });
    } else {
      timeline.set(position, outgoing)
        .to(position, { cx: 200, cy: 200, r: 49, delay: initial ? 0 : 0.6, duration: flip, ease: "power4.out" })
        .to(position, {
          motionPath: { path: [{ cx: target.cx, cy: 200, r: 14 }, target], curviness: 1 },
          duration: initial ? 0.01 : 1, ease: "bounce.out",
        });
    }
    return () => { timeline.kill(); };
  }, [open, reduced, index, total, onInPlace]);

  const circleId = `${prefix}-${index}-circle`;
  const squareId = `${prefix}-${index}-square`;
  return (
    <svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice" className={styles.slide}
      style={{ zIndex: inPlace ? index : total + 1 }} data-circular-slide
      aria-hidden={!open} role={open ? "img" : undefined} aria-label={open ? image.alt : undefined}>
      <defs>
        <clipPath id={circleId} clipPathUnits="userSpaceOnUse"><circle ref={clip} cx={small.cx} cy={small.cy} r={small.r} data-circular-clip /></clipPath>
        <clipPath id={squareId} clipPathUnits="userSpaceOnUse"><rect width="400" height="400" /></clipPath>
      </defs>
      <g clipPath={`url(#${inPlace ? squareId : circleId})`}>
        <image href={image.src} width="400" height="400" preserveAspectRatio="xMidYMid slice" />
      </g>
    </svg>
  );
}

export function ImageGallery({ images, label = "Galeria de imagens" }: { images: CircularGalleryImage[]; label?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const prefix = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const [opened, setOpened] = useState(0);
  const [inPlace, setInPlace] = useState(0);
  const [visible, setVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const preference = useReducedMotion();
  const hydrated = useSyncExternalStore(subscribeHydration, clientSnapshot, serverSnapshot);
  const reduced = hydrated && preference === true;
  const sources = useMemo(() => images.map(image => ({ ...image,
    src: getImageProps({ src: image.src, alt: image.alt, width: 600, height: 600 }).props.src,
  })), [images]);
  const move = useCallback((direction: number) => {
    if (images.length > 1) setOpened(current => (current + direction + images.length) % images.length);
  }, [images.length]);
  const onInPlace = useCallback((index: number) => setInPlace(index), []);

  useEffect(() => {
    const node = root.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting && entry.intersectionRatio >= 0.2), { threshold: 0.2 });
    const onVisibility = () => setPageVisible(!document.hidden);
    observer.observe(node);
    document.addEventListener("visibilitychange", onVisibility);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", onVisibility); };
  }, []);

  useEffect(() => {
    if (images.length < 2 || reduced || !visible || !pageVisible || hovered || focused) return;
    const timer = window.setTimeout(() => move(1), 4500);
    return () => window.clearTimeout(timer);
  }, [images.length, opened, reduced, visible, pageVisible, hovered, focused, move]);

  if (!images.length) return null;

  return (
    <div ref={root} className={styles.gallery} role="region" aria-roledescription="carrossel" aria-label={label}
      tabIndex={0} data-circular-gallery data-active={opened} data-in-place={inPlace}
      data-autoplay={!reduced && visible && pageVisible && !hovered && !focused}
      onPointerEnter={event => { if (event.pointerType === "mouse") setHovered(true); }} onPointerLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}
      onKeyDown={event => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault(); move(event.key === "ArrowRight" ? 1 : -1);
        }
      }}>
      <div className={styles.frame} data-circular-frame
        onTouchStart={event => { touch.current = { x: event.touches[0].clientX, y: event.touches[0].clientY }; }}
        onTouchEnd={event => {
          if (!touch.current) return;
          const x = event.changedTouches[0].clientX - touch.current.x;
          const y = event.changedTouches[0].clientY - touch.current.y;
          if (Math.abs(x) > 45 && Math.abs(x) > Math.abs(y)) move(x < 0 ? 1 : -1);
          touch.current = null;
        }}>
        {sources.map((image, index) => <GallerySlide key={images[index].src} image={image} index={index} total={images.length}
          prefix={prefix} open={opened === index} inPlace={inPlace === index} reduced={reduced} onInPlace={onInPlace} />)}
        {images.length > 1 && <div className={styles.tabs} role="group" aria-label="Selecionar imagem">
          <svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            {sources.map((image, index) => {
              const { cx, cy, r } = smallPosition(index, images.length);
              const id = `${prefix}-tab-${index}`;
              return <g key={image.src}>
                <defs><clipPath id={id}><circle cx={cx} cy={cy} r={r} /></clipPath></defs>
                <image x={cx - r} y={cy - r} width={r * 2} height={r * 2} href={image.src} clipPath={`url(#${id})`} preserveAspectRatio="xMidYMid slice" />
              </g>;
            })}
          </svg>
          {images.map((image, index) => {
            const { cx, cy } = smallPosition(index, images.length);
            return <button key={image.src} type="button" className={styles.thumbnail} style={{ left: `${cx / 4}%`, top: `${cy / 4}%` }}
              aria-label={`Mostrar imagem ${index + 1}: ${image.alt}`} aria-pressed={index === opened}
              title={`Imagem ${index + 1}`} onClick={() => setOpened(index)} />;
          })}
        </div>}
      </div>
      {images.length > 1 && <>
        <button type="button" className={`${styles.control} ${styles.previous}`} onClick={() => move(-1)}
          aria-label="Imagem anterior" title="Imagem anterior"><ChevronLeft size={28} /></button>
        <button type="button" className={`${styles.control} ${styles.next}`} onClick={() => move(1)}
          aria-label="Próxima imagem" title="Próxima imagem"><ChevronRight size={28} /></button>
      </>}
    </div>
  );
}
