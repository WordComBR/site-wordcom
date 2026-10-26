"use client";

import { WorksWheel } from "./works-wheel";

const projects = [
  { title: "ENIP", slug: "enip", href: "https://encontroindustriaporto.com.br/", image: "/Cards-projetos/Banner Corporativo ENIP Azul e Laranja.png" },
  { title: "Jornal Portuário", slug: "jornal-portuario", href: "https://jornalportuario.com.br/", image: "/Cards-projetos/WhatsApp Image 2026-10-13 at 16.55.06.jpeg" },
  { title: "Empreenda Sim", slug: "empreenda-sim", href: "https://empreendasim.com.br/", image: "/Cards-projetos/WhatsApp Image 2026-10-13 at 16.55.15.jpeg" },
];

export function ImagesScrollingAnimation() {
  return <WorksWheel items={projects} logoSrc="/marca/polvo-plataformas-transparente.png" />;
}
