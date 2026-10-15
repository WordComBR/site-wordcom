import { ImageGallery, type CircularGalleryImage } from "@/components/ui/carousel-circular-image-gallery";

const images: CircularGalleryImage[] = [
  { src: "/cases/DiaDaMulher/galeria/01.jpg", alt: "Arte de 8 de março com homenagem às colaboradoras da Piacentini do Brasil", width: 1080, height: 1080 },
  { src: "/cases/DiaDaMulher/galeria/02.jpg", alt: "Composição de retratos de colaboradoras da Piacentini do Brasil na campanha do Dia da Mulher", width: 1080, height: 1080 },
  { src: "/cases/DiaDaMulher/galeria/03.jpg", alt: "Aplicação da campanha do Dia Internacional da Mulher em uma embalagem", width: 876, height: 876 },
  { src: "/cases/DiaDaMulher/galeria/04.jpg", alt: "Peça da Piacentini do Brasil: Ser mulher é construir sua liberdade todos os dias", width: 876, height: 876 },
];

export function DiaDaMulherGallery() {
  return <ImageGallery images={images} label="Galeria da campanha Dia da Mulher" />;
}
