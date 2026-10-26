"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import estilos from "./tubelight-navbar.module.css";

/* Navbar "tubelight": pílula flutuante com um indicador que desliza entre os
   itens, com o brilho de lâmpada acima do item ativo.

   DESVIOS DO PROMPT ORIGINAL, todos declarados

   1. `motion/react` no lugar de `framer-motion`. O projeto usa motion@14 e o
      CLAUDE.md proíbe framer-motion por nome; instalar os dois duplicaria a
      biblioteca de animação. A API de `layoutId` é a mesma.

   2. CSS Module no lugar das classes Tailwind. O Tailwind está no
      postcss.config.mjs mas nenhum arquivo o importa, então classe utilitária
      nova não gera CSS — o componente sairia sem estilo nenhum. Como efeito
      colateral bom, o módulo tira estas regras da disputa de especificidade
      com as 19 folhas globais do projeto.

   3. Sem o helper `cn` de "@/lib/utils": ele não existe neste projeto, e
      clsx/tailwind-merge não estão instalados. Com CSS Module a concatenação
      de classe é trivial e não precisa de helper.

   4. Sem os tokens do shadcn (bg-background, text-primary, border-border,
      bg-muted). Não existem aqui. As cores vêm das variáveis que o site já
      define, e os contrastes foram medidos sobre o fundo real da landing.

   5. O `isMobile` do original foi removido: era calculado num useEffect e
      nunca usado — a troca de rótulo por ícone é feita em CSS. Ele só causava
      re-render a cada resize.

   6. O item ativo deixou de ser estado local iniciado em `items[0]`. No
      original ele só mudava no clique, então numa página de case a barra
      marcaria "Home" como ativa — errado justamente onde navegar importa
      mais. Aqui ele acompanha a rota e, na home, a seção visível.

   7. No celular o original vira barra inferior (`bottom-0`). Ali já moram o
      botão flutuante de WhatsApp e o banner de cookies (fixed, z-index 1000).
      Por ora a barra fica no topo também no mobile; o comportamento mobile
      definitivo virá em prompt separado. */

export interface NavItem {
  name: string;
  /** âncora da home, sempre com "#". O componente resolve o prefixo por rota. */
  hash: string;
  icon: LucideIcon;
  imageSrc?: string;
}

export function NavBar({ items }: { items: NavItem[] }) {
  const rota = usePathname();
  const naHome = rota === "/";
  const semMovimento = useReducedMotion();
  const [ativo, setAtivo] = useState<string | null>(null);

  /* Fora da home nenhum item fica ativo: marcar um seria mentir sobre onde a
     pessoa está. Isso é DERIVADO e não um setAtivo(null) no efeito — setState
     síncrono dentro de efeito dispara render em cascata, e o lint do React
     recusa. Ao voltar para a home o IntersectionObserver dispara já na
     primeira observação, então o valor se corrige sozinho. */
  const ativoVisivel = naHome ? ativo : null;

  /* Na home, o item ativo segue a seção visível. */
  useEffect(() => {
    if (!naHome) return undefined;

    const alvos = items
      .map((item) => document.querySelector(item.hash))
      .filter((el): el is Element => el !== null);
    if (!alvos.length) return undefined;

    const observador = new IntersectionObserver(
      (entradas) => {
        /* a seção que ocupa mais da faixa central da tela vence; sem isso,
           duas seções visíveis ao mesmo tempo ficam trocando de ativo */
        const visivel = entradas
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visivel) return;
        const achado = items.find((i) => visivel.target.matches(i.hash));
        if (achado) setAtivo(achado.name);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    alvos.forEach((el) => observador.observe(el));
    return () => observador.disconnect();
  }, [naHome, items]);

  return (
    <nav className={estilos.barra} aria-label="Navegação principal">
      <ul className={estilos.pilula}>
        {items.map((item) => {
          const Icone = item.icon;
          const estaAtivo = ativoVisivel === item.name;
          /* fora da home a âncora precisa do prefixo, senão não sai do lugar */
          const destino = naHome ? item.hash : `/${item.hash}`;

          return (
            <li key={item.name} className={estilos.item}>
              <Link
                href={destino}
                className={`${estilos.link}${estaAtivo ? ` ${estilos.ativo}` : ""}`}
                aria-current={estaAtivo ? "true" : undefined}
                aria-label={item.imageSrc ? "WordCom — início" : item.name}
              >
                {item.imageSrc ? <Image src={item.imageSrc} alt="" width={28} height={32} className={estilos.marca}
                    /* a barra e fixa no topo: esta marca e o maior elemento
                       pintado na primeira dobra, e o Next apontou ela como LCP.
                       Sem priority ela entra com lazy load e atrasa a metrica. */
                    priority /> : <>
                <span className={estilos.rotulo}>{item.name}</span>
                <span className={estilos.icone} aria-hidden="true">
                  <Icone size={18} strokeWidth={2.5} />
                </span>
                </>}

                {estaAtivo ? (
                  <motion.span
                    layoutId="tubelight"
                    className={estilos.lampada}
                    aria-hidden="true"
                    initial={false}
                    transition={
                      semMovimento
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 300, damping: 30 }
                    }
                  >
                    <span className={estilos.facho} />
                  </motion.span>
                ) : null}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
