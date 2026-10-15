import Image from "next/image";
import { ExternalLink, Play } from "lucide-react";
import styles from "./globoplay-card.module.css";

export function GloboplayCard({ href, title, posterSrc }: { href: string; title: string; posterSrc: string }) {
  return <a className={styles.card} href={href} target="_blank" rel="noopener noreferrer"
    aria-label={`Assistir ${title} no Globoplay (abre em nova aba)`} data-globoplay-card>
    <div className={styles.preview}>
      <Image src={posterSrc} alt="" fill sizes="(max-width: 900px) 90vw, 45vw" />
      <span className={styles.play}><Play size={30} fill="currentColor" aria-hidden="true" /></span>
    </div>
    <div className={styles.caption}>
      <strong>{title}</strong>
      <span>Assistir no Globoplay <ExternalLink size={16} aria-hidden="true" /></span>
    </div>
  </a>;
}
