"use client";

import Image from "next/image";
import { useContext } from "react";
import { EntradaScroll } from "@/components/entrada-scroll";
import { CardsParallax } from "@/components/ui/scroll-cards";
import { ProcessSequenceCard, ProcessSequenceContext } from "@/components/ui/smooth-scroll-hero";

export type Etapa = {
  etapa: string;
  titulo: string;
  texto: string;
  nota: string;
  imagem: string;
  largura: number;
  altura: number;
};

export function MetodoJornada({ etapas }: { etapas: Etapa[] }) {
  const sequence = useContext(ProcessSequenceContext);
  if (sequence && !sequence.reducedMotion) {
    return (
      <>
        <ol className="soLeitor" aria-label="Etapas do processo WordCom">
          {etapas.map(etapa => <li key={etapa.etapa}>{etapa.etapa}. {etapa.titulo}. {etapa.texto} {etapa.nota}.</li>)}
        </ol>
        <ol className="metodoArtes" data-process-sequence aria-hidden="true">
          {etapas.map((etapa, index) => {
            const start = sequence.openingDistance + sequence.titleDistance + index * sequence.cardDistance;
            return <ProcessSequenceCard key={etapa.etapa} progress={sequence.progress}
              start={start} end={start + sequence.cardDistance} index={index} count={etapas.length}>
              <div className="metodoDestaque">
                <Image src={etapa.imagem} alt="" width={etapa.largura} height={etapa.altura}
                  sizes="(max-width: 600px) 90vw, 420px" loading="eager" />
              </div>
            </ProcessSequenceCard>;
          })}
        </ol>
      </>
    );
  }
  return (
    <CardsParallax
      className="metodoArtes"
      itemClassName="metodoArte"
      label="Etapas do processo WordCom"
    >
      {etapas.map((etapa, index) => (
        <EntradaScroll key={etapa.etapa} delay={index * 0.06}>
          <div className="metodoDestaque">
            <Image
              src={etapa.imagem}
              alt={`${etapa.etapa}. ${etapa.titulo}. ${etapa.texto} ${etapa.nota}.`}
              width={etapa.largura}
              height={etapa.altura}
              sizes="(max-width: 600px) 90vw, (max-width: 1100px) 42vw, 22vw"
            />
          </div>
        </EntradaScroll>
      ))}
    </CardsParallax>
  );
}
