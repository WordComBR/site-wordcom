import Image from "next/image";
import { Carousel, CarouselContent, CarouselSlide, CarouselPrev, CarouselNext, CarouselPagination } from "@/components/ui/carousel";
import styles from "./encontro-regional-gallery.module.css";

const photos = [
  { file: "Painel do Encontro Regional Indústria Porto.png", alt: "Participantes de um painel no Encontro Regional Indústria Porto", width: 1536, height: 1024 },
  { file: "Palestrante no Encontro Regional da Indústria.png", alt: "Palestrante no palco do Encontro Regional", width: 1536, height: 1024 },
  { file: "Retrato Corporativo no Palco em Santos.png", alt: "Participante no palco do evento em Santos", width: 1752, height: 897 },
  { file: "Retrato de conferência com três profissionais felizes.png", alt: "Três participantes reunidos na conferência", width: 1536, height: 1024 },
  { file: "Retrato de equipe diante do skyline de Santos.png", alt: "Equipe reunida diante de um painel com a cidade de Santos", width: 1623, height: 969 },
  { file: "Retrato de mulheres no evento do Porto.png", alt: "Participantes reunidas no evento do Porto", width: 1649, height: 954 },
  { file: "Networking no Congresso Nacional de Municípios.png", alt: "Participantes conversando durante um encontro", width: 1536, height: 1024 },
  { file: "Músico Cantando ao Vivo com Violão.png", alt: "Músico cantando e tocando violão ao vivo", width: 1603, height: 981 },
];

export function EncontroRegionalGallery() {
  return <div className={styles.gallery} data-encontro-gallery>
    <Carousel loop aria-label="Fotos do Encontro Regional Indústria Porto">
      <CarouselContent>
        {photos.map((photo, index) => <CarouselSlide key={photo.file} aria-label={`Foto ${index + 1} de ${photos.length}`}>
          <Image src={`/cases/EncontroRegional/galeria/${photo.file}`} alt={photo.alt} width={photo.width} height={photo.height}
            sizes="(max-width: 960px) 92vw, 912px" />
        </CarouselSlide>)}
      </CarouselContent>
      <CarouselPrev /><CarouselNext /><CarouselPagination />
    </Carousel>
  </div>;
}
