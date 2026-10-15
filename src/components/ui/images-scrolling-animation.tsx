"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";

const projects = [
  { title: "ENIP", slug: "enip", href: "https://encontroindustriaporto.com.br/", image: "/midia/projetos/enip-d87f8285f68e.png" },
  { title: "Jornal Portuário", slug: "jornal-portuario", href: "https://jornalportuario.com.br/", image: "/midia/projetos/jornal-portuario-6b6769e117f6.png" },
  { title: "Empreenda Sim", slug: "empreenda-sim", href: "https://empreendasim.com.br/", image: "/midia/projetos/empreenda-sim-6ae463d6ba87.png" },
];

type StickyCardProps = {
  i: number;
  title: string;
  slug: string;
  href: string;
  src: string;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
  reducedMotion: boolean;
};

export function StickyCard_001({
  i, title, slug, href, src, progress, range, targetScale, reducedMotion,
}: StickyCardProps) {
  const transform = useTransform(progress, range, ["scale(1)", `scale(${targetScale})`]);

  return (
    <div className="projectScrollSlot" style={{ top: reducedMotion ? 0 : `${110 + i * 20}px` }}>
      <motion.div
        className="projectScrollCard"
        style={{
          transform: reducedMotion ? "none" : transform,
        }}
      >
        <a href={href} target="_blank" rel="noopener noreferrer" data-project={slug} aria-label={`Conhecer o projeto ${title} (abre em nova aba)`}>
          <Image
            src={src}
            alt={`Projeto ${i + 1}: ${title}`}
            width={2172}
            height={724}
            sizes="(min-width: 1334px) 1120px, (max-width: 600px) 94vw, 84vw"
          />
        </a>
      </motion.div>
    </div>
  );
}

export function ImagesScrollingAnimation() {
  const container = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 35%", "end 35%"],
  });

  // Native page scroll keeps this effect local; no root smooth-scroll provider.
  return (
    <div ref={container} className="projectsScrollStack">
      {projects.map((project, i) => (
        <StickyCard_001
          key={project.slug}
          i={i}
          title={project.title}
          slug={project.slug}
          href={project.href}
          src={project.image}
          progress={scrollYProgress}
          range={[i * 0.2, 1]}
          targetScale={Math.max(0.6, 1 - (projects.length - i - 1) * 0.08)}
          reducedMotion={reducedMotion}
        />
      ))}
    </div>
  );
}
