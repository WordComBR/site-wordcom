"use client";

import Image from "next/image";
import { useState } from "react";
import { ExternalLink, Play } from "lucide-react";
import styles from "./youtube-embed.module.css";

interface YouTubeEmbedProps {
  videoId: string;
  title?: string;
  className?: string;
  posterSrc?: string;
}

export function YouTubeEmbed({ videoId, title = "Vídeo no YouTube", className = "", posterSrc }: YouTubeEmbedProps) {
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(true);

  return (
    <div className={`${styles.card} ${className}`} data-youtube-card>
      {!active ? <button type="button" className={styles.play} onClick={() => setActive(true)}
        aria-label={`Reproduzir: ${title}`} title="Reproduzir vídeo">
        {posterSrc && <Image src={posterSrc} alt="" fill sizes="(max-width: 900px) 90vw, 45vw" />}
        <span className={styles.playIcon}><Play size={32} fill="currentColor" aria-hidden="true" /></span>
      </button> : <>
        {loading && <div className={styles.loading} role="status" aria-label="Carregando vídeo"><span /></div>}
        <iframe src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?autoplay=1&rel=0`}
          title={title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin" allowFullScreen
          onLoad={() => setLoading(false)} className={loading ? styles.pending : undefined} />
        <a className={styles.external} href={`https://www.youtube.com/watch?v=${encodeURIComponent(videoId)}`}
          target="_blank" rel="noopener noreferrer" aria-label="Abrir vídeo no YouTube" title="Abrir no YouTube"><ExternalLink size={18} /></a>
      </>}
    </div>
  );
}

export default YouTubeEmbed;
