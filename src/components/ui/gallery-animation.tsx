"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import styles from "./gallery-animation.module.css";

export type GalleryImage = { src: string; alt: string; width: number; height: number };

export function ExpandableGallery({ images, className = "" }: { images: GalleryImage[]; className?: string }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const touchStart = useRef<number | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const node = dialog.current;
    if (selected === null || !node) return;
    if (!node.open) node.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [selected]);

  function close() {
    dialog.current?.close();
    setSelected(null);
  }

  function move(direction: number) {
    setSelected(current => current === null ? null : (current + direction + images.length) % images.length);
  }

  if (!images.length) return null;

  return (
    <div className={`${styles.gallery} ${className}`} data-expandable-gallery>
      <div className={styles.strip} onPointerLeave={() => setHovered(null)}>
        {images.map((image, index) => (
          <motion.button type="button" key={image.src} className={styles.tile}
            animate={{ flexGrow: hovered === null ? 1 : hovered === index ? 2 : 0.5 }}
            transition={{ duration: reduced ? 0 : 0.5, ease: "easeInOut" }}
            onPointerEnter={event => { if (event.pointerType === "mouse") setHovered(index); }}
            onFocus={() => setHovered(index)} onBlur={() => setHovered(null)}
            onClick={() => setSelected(index)} aria-label={`Ampliar: ${image.alt}`}>
            <Image src={image.src} alt={image.alt} width={image.width} height={image.height}
              sizes="(max-width: 600px) 90vw, 60vw" />
          </motion.button>
        ))}
      </div>
      <dialog ref={dialog} className={styles.dialog} aria-label="Galeria de peças da campanha"
        onClose={() => setSelected(null)} onCancel={close}
        onClick={event => { if (event.target === event.currentTarget) close(); }}
        onKeyDown={event => {
          if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
            event.preventDefault();
            move(event.key === "ArrowRight" ? 1 : -1);
          }
        }}>
        <button type="button" className={`${styles.control} ${styles.close}`} onClick={close}
          aria-label="Fechar galeria" title="Fechar galeria" autoFocus><X size={24} /></button>
        {selected !== null && <>
          <motion.div key={images[selected].src} className={styles.expanded}
            initial={{ opacity: reduced ? 1 : 0 }} animate={{ opacity: 1 }} transition={{ duration: reduced ? 0 : 0.25 }}
            onTouchStart={event => { touchStart.current = event.touches[0].clientX; }}
            onTouchEnd={event => {
              if (touchStart.current !== null) {
                const distance = event.changedTouches[0].clientX - touchStart.current;
                if (Math.abs(distance) > 45) move(distance < 0 ? 1 : -1);
              }
              touchStart.current = null;
            }}>
            <Image src={images[selected].src} alt={images[selected].alt}
              width={images[selected].width} height={images[selected].height} sizes="100vw" />
          </motion.div>
          {images.length > 1 && <>
            <button type="button" className={`${styles.control} ${styles.previous}`} onClick={() => move(-1)}
              aria-label="Imagem anterior" title="Imagem anterior"><ChevronLeft size={28} /></button>
            <button type="button" className={`${styles.control} ${styles.next}`} onClick={() => move(1)}
              aria-label="Próxima imagem" title="Próxima imagem"><ChevronRight size={28} /></button>
          </>}
          <span className={styles.counter} role="status" aria-live="polite">{selected + 1} / {images.length}</span>
        </>}
      </dialog>
    </div>
  );
}

export default ExpandableGallery;
