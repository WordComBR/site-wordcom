"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { Marquee } from "@/components/ui/marquee";
import { marcasEnquadramento } from "@/lib/marcas-enquadramento";

export type MarcaCliente = {
  nome: string;
  imagem: string;
  largura: number;
  altura: number;
};

export function MarcasMarquee({ marcas }: { marcas: MarcaCliente[] }) {

  return (
    <div className="clientsMarquee">
      <ul className="soLeitor" aria-label="Marcas que escolheram a WordCom">
        {marcas.map((marca) => <li key={marca.nome}>{marca.nome}</li>)}
      </ul>
      <Marquee aria-hidden="true" speed={180} pauseOnHover={false}>
          {marcas.map((marca) => {
            const nomeArquivo = marca.imagem.split("/").at(-1) ?? "";
            const arquivo = nomeArquivo.match(/(\d{2}_\d{2}_\d{2})\.png$/)?.[1] ?? nomeArquivo;
            const [x, y, largura, altura] = marcasEnquadramento[arquivo] ?? [0, 0, marca.largura, marca.altura];
            const proporcao = largura / altura;
            // Match visual area rather than shrinking every tall logo to a short strip.
            const enquadramento = {
              "--logo-width-desktop": `${Math.min(240, 144 * proporcao, Math.sqrt(16000 * proporcao))}px`,
              "--logo-width-mobile": `${Math.min(180, 112 * proporcao, Math.sqrt(10000 * proporcao))}px`,
              aspectRatio: `${largura} / ${altura}`,
            } as CSSProperties;
            return (
            <div key={marca.nome} className="clientBrand">
              <div className="clientBrandCrop" style={enquadramento}>
              <Image
                src={marca.imagem}
                alt={marca.nome}
                width={marca.largura}
                height={marca.altura}
                sizes="(max-width: 600px) 240px, 320px"
                loading="eager"
                style={{ width: `${marca.largura / largura * 100}%`, height: `${marca.altura / altura * 100}%`, left: `${-x / largura * 100}%`, top: `${-y /altura * 100}%` }}
              />
              </div>
            </div>
            );
          })}
      </Marquee>
    </div>
  );
}
