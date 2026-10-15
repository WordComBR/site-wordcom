"use client";

import Image from "next/image";
import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Marquee } from "@/components/ui/marquee";
import styles from "./image-auto-slider.module.css";

export type AutoSliderImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export function ImageAutoSlider({ images, label }: { images: AutoSliderImage[]; label: string }) {
  const gallery = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = gallery.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: "200px" });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  if (!images.length) return null;

  return (
    <div ref={gallery} className={styles.gallery} role="region" aria-label={label}
      data-image-auto-slider data-paused={paused || !visible}>
      <div className={styles.toolbar}>
        <button type="button" className={styles.control} onClick={() => setPaused(value => !value)}
          aria-label={paused ? "Retomar galeria" : "Pausar galeria"}
          title={paused ? "Retomar galeria" : "Pausar galeria"}>
          {paused ? <Play size={20} /> : <Pause size={20} />}
        </button>
      </div>
      <Marquee className={styles.slider} speed={images.length * 6} pauseOnHover={false}
        tabIndex={0} role="group" aria-label={label}>
        {images.map(image => (
          <figure key={image.src} className={styles.tile}>
            <Image src={image.src} alt={image.alt} width={image.width} height={image.height}
              sizes="(max-width: 767px) 192px, (max-width: 1023px) 256px, 320px" />
          </figure>
        ))}
      </Marquee>
    </div>
  );
}
