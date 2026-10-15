"use client";

import { useEffect, useRef } from "react";
import styles from "./iphone.module.css";

type IPhoneVideoProps = {
  src: string;
  poster: string;
  title: string;
};

export function IPhoneVideo({ src, poster, title }: IPhoneVideoProps) {
  const player = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = player.current;
    if (!video) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    let manuallyPaused = false;
    let automaticallyPaused = false;

    function updatePlayback() {
      if (!video) return;
      if (!visible || document.hidden || motion.matches) {
        if (!video.paused) {
          automaticallyPaused = true;
          video.pause();
        }
      } else if (!manuallyPaused) {
        video.play().catch(() => {});
      }
    }
    function onPause() {
      if (automaticallyPaused) automaticallyPaused = false;
      else manuallyPaused = true;
    }
    function onPlay() {
      manuallyPaused = false;
      automaticallyPaused = false;
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && entry.intersectionRatio >= 0.2;
      updatePlayback();
    }, { threshold: 0.2 });
    video.addEventListener("pause", onPause);
    video.addEventListener("play", onPlay);
    motion.addEventListener("change", updatePlayback);
    document.addEventListener("visibilitychange", updatePlayback);
    observer.observe(video);
    return () => {
      observer.disconnect();
      motion.removeEventListener("change", updatePlayback);
      document.removeEventListener("visibilitychange", updatePlayback);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("play", onPlay);
      video.pause();
    };
  }, [src]);

  return (
    <figure className={styles.phone} aria-label={title} data-iphone-video>
      <span className={styles.notch} aria-hidden="true" />
      <span className={`${styles.sideButton} ${styles.volumeUp}`} aria-hidden="true" />
      <span className={`${styles.sideButton} ${styles.volumeDown}`} aria-hidden="true" />
      <span className={`${styles.sideButton} ${styles.power}`} aria-hidden="true" />
      <div className={styles.screen}>
        <video ref={player} poster={poster} controls muted loop playsInline preload="none" aria-label={title}>
          <source src={src} type="video/mp4" />
          <a href={src}>Abrir vídeo da campanha</a>
        </video>
      </div>
    </figure>
  );
}
