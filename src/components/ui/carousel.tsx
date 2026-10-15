"use client";

import { createContext, useCallback, useContext, useSyncExternalStore, type HTMLAttributes } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaCarouselType } from "embla-carousel";
import { useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./carousel.module.css";

type CarouselState = {
  viewportRef: ReturnType<typeof useEmblaCarousel>[0];
  api?: EmblaCarouselType;
  selected: number;
  reduced: boolean;
};
const CarouselContext = createContext<CarouselState | null>(null);
export function useCarousel() {
  const context = useContext(CarouselContext);
  if (!context) throw new Error("Carousel controls must be inside Carousel.");
  return context;
}

export function Carousel({ children, className = "", loop = true, ...props }: HTMLAttributes<HTMLDivElement> & { loop?: boolean }) {
  const reduced = useReducedMotion() === true;
  const [viewportRef, api] = useEmblaCarousel({ loop, align: "start", duration: reduced ? 0 : 25 });
  const subscribe = useCallback((onChange: () => void) => {
    if (!api) return () => {};
    api.on("select", onChange).on("reInit", onChange);
    return () => { api.off("select", onChange).off("reInit", onChange); };
  }, [api]);
  const snapshot = useCallback(() => api?.selectedScrollSnap() ?? 0, [api]);
  const selected = useSyncExternalStore(subscribe, snapshot, () => 0);

  return <CarouselContext.Provider value={{ viewportRef, api, selected, reduced }}>
    <div className={`${styles.carousel} ${className}`} role="region" aria-roledescription="carrossel" tabIndex={0}
      {...props} onKeyDown={event => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          if (event.key === "ArrowLeft") api?.scrollPrev(reduced);
          else api?.scrollNext(reduced);
        }
        props.onKeyDown?.(event);
      }}>{children}</div>
  </CarouselContext.Provider>;
}

export function CarouselContent({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  const { viewportRef } = useCarousel();
  return <div className={styles.viewport} ref={viewportRef}><div className={`${styles.track} ${className}`} {...props} /></div>;
}

export function CarouselSlide({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`${styles.slide} ${className}`} role="group" aria-roledescription="slide" {...props} />;
}

export function CarouselPrev() {
  const { api, reduced } = useCarousel();
  return <button type="button" className={`${styles.arrow} ${styles.previous}`} aria-label="Foto anterior" title="Foto anterior"
    disabled={!api?.canScrollPrev()} onClick={() => api?.scrollPrev(reduced)}><ChevronLeft size={24} aria-hidden="true" /></button>;
}

export function CarouselNext() {
  const { api, reduced } = useCarousel();
  return <button type="button" className={`${styles.arrow} ${styles.next}`} aria-label="Próxima foto" title="Próxima foto"
    disabled={!api?.canScrollNext()} onClick={() => api?.scrollNext(reduced)}><ChevronRight size={24} aria-hidden="true" /></button>;
}

export function CarouselPagination() {
  const { api, selected, reduced } = useCarousel();
  const count = api?.scrollSnapList().length ?? 0;
  return <div className={styles.pagination}>
    <div className={styles.dots} role="group" aria-label="Selecionar foto">
      {Array.from({ length: count }, (_, index) => <button type="button" key={index} className={styles.dot}
        aria-label={`Ver foto ${index + 1}`} aria-current={index === selected ? "true" : undefined}
        title={`Foto ${index + 1}`} onClick={() => api?.scrollTo(index, reduced)}><span /></button>)}
    </div>
    <span className={styles.counter} role="status" aria-live="polite">{count > 0 ? `${selected + 1} / ${count}` : ""}</span>
  </div>;
}
