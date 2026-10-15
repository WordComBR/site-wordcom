"use client";

import Image from "next/image";
import { useSyncExternalStore } from "react";
import { ContainerScroll, ContainerSticky, GalleryCol, GalleryContainer } from "@/components/ui/animated-gallery";
import styles from "./beach-tennis-gallery.module.css";

const photos = [
  { file: "campea.png", alt: "Participante do torneio exibindo sua medalha de Beach Tennis.", width: 1567, height: 1004 },
  { file: "dupla-na-rede.png", alt: "Dupla de atletas com raquetes em uma partida de Beach Tennis.", width: 1592, height: 988 },
  { file: "entrega-de-sacolas.png", alt: "Entrega de sacolas do kit dos participantes do torneio.", width: 1536, height: 1024 },
  { file: "estrutura-do-evento.png", alt: "Estrutura do evento esportivo na praia, com frutas e bebidas.", width: 1584, height: 993 },
  { file: "partida-beira-mar.png", alt: "Partida de Beach Tennis em uma quadra à beira-mar.", width: 1607, height: 979 },
  { file: "partida-na-praia.png", alt: "Atletas disputando uma partida na praia.", width: 1536, height: 1024 },
  { file: "premiacao.png", alt: "Premiação do torneio de Beach Tennis na praia.", width: 1558, height: 1009 },
  { file: "participantes.png", alt: "Participantes sorrindo no torneio de Beach Tennis.", width: 1639, height: 960 },
  { file: "torneio-beira-mar.png", alt: "Quadras e participantes do torneio de Beach Tennis à beira-mar.", width: 1582, height: 994 },
];

function subscribeCompact(onChange: () => void) {
  const query = window.matchMedia("(max-width: 600px) and (min-height: 521px)");
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}
const compactSnapshot = () => window.matchMedia("(max-width: 600px) and (min-height: 521px)").matches;
const serverSnapshot = () => false;

export function BeachTennisGallery() {
  const compact = useSyncExternalStore(subscribeCompact, compactSnapshot, serverSnapshot);
  const columns = compact ? 2 : 3;
  return (
    <div className={styles.region} role="region" aria-label="Galeria do torneio Beach Tennis">
      <ContainerScroll data-beach-gallery>
        <ContainerSticky className={styles.backdrop}>
          <GalleryContainer>
            {Array.from({ length: columns }, (_, index) => (
              <GalleryCol key={index} yRange={index % 2 ? ["12%", "0%"] : ["-8%", "0%"]}>
                {photos.filter((_, photoIndex) => photoIndex % columns === index).map(photo => (
                  <figure className={styles.photo} key={photo.file}>
                    <Image src={`/cases/BeachTennis/galeria/${photo.file}`} alt={photo.alt}
                      width={photo.width} height={photo.height}
                      sizes="(max-width: 600px) 46vw, (max-width: 1200px) 31vw, 390px" />
                  </figure>
                ))}
              </GalleryCol>
            ))}
          </GalleryContainer>
        </ContainerSticky>
      </ContainerScroll>
    </div>
  );
}
