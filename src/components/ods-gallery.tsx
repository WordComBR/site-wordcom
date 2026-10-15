import { ImageAutoSlider } from "@/components/ui/image-auto-slider";

const photos = [
  { file: "RRF05010-scaled.jpg", alt: "Participantes conversando na recepção do Seminário de ODS" },
  { file: "RRF05015-scaled.jpg", alt: "Entrevista em frente ao painel do Seminário de ODS" },
  { file: "RRF05018-scaled.jpg", alt: "Participantes reunidos no espaço do evento" },
  { file: "RRF05030-scaled.jpg", alt: "Entrevistada diante da identidade visual do Seminário de ODS" },
  { file: "RRF05035-scaled.jpg", alt: "Público acompanhando o Seminário de ODS no auditório" },
  { file: "RRF05037-scaled.jpg", alt: "Integrantes de um painel temático no palco do seminário" },
  { file: "RRF05041-scaled.jpg", alt: "Palestrante com microfone durante um painel do seminário" },
  { file: "RRF05048-scaled.jpg", alt: "Debate entre os participantes de um painel sobre sustentabilidade" },
  { file: "RRF05052-scaled.jpg", alt: "Apresentação no púlpito ao lado dos participantes do painel" },
  { file: "RRF05070-scaled.jpg", alt: "Vista do auditório durante uma apresentação do Seminário de ODS" },
  { file: "RRF05135-scaled.jpg", alt: "Dois participantes reunidos no evento" },
  { file: "RRF05145-scaled.jpg", alt: "Especialistas conversando em um painel do seminário" },
  { file: "RRF05158-scaled.jpg", alt: "Apresentação do Projeto Pemalmi no telão do evento" },
  { file: "RRF05181-scaled.jpg", alt: "Palestrante de camiseta amarela apresentando com microfone" },
  { file: "RRF05199-scaled.jpg", alt: "Três participantes diante do painel do Seminário de ODS da Baixada Santista" },
  { file: "RRF05202-scaled.jpg", alt: "Gravação de entrevista no espaço do Seminário de ODS" },
  { file: "RRF05337-scaled.jpg", alt: "Participantes debatendo diante do telão com a marca ODS" },
  { file: "RRF05400-scaled.jpg", alt: "Grupo de participantes reunidos no auditório do seminário" },
];

export function OdsGallery() {
  return <ImageAutoSlider label="Fotos do 1º Seminário de ODS da Baixada Santista"
    images={photos.map(photo => ({ src: `/cases/ODS/galeria/${photo.file}`, alt: photo.alt, width: 2560, height: 1707 }))} />;
}
