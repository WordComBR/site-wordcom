"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef, useState, useSyncExternalStore } from "react";

const subscribe = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

export function TextoEstrutura() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const reduced = useReducedMotion();
  const hydrated = useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot);
  const [focused, setFocused] = useState(false);
  const visible = !hydrated || reduced || inView || focused;
  const immediate = !hydrated || reduced || focused;
  const reveal = (order: number) => ({
    initial: false as const,
    animate: { opacity: visible ? 1 : 0, transform: visible ? "translateY(0px)" : "translateY(24px)" },
    transition: {
      duration: immediate ? 0 : 1.35,
      delay: visible && !immediate ? 0.2 + order * 0.32 : 0,
      ease: [0.33, 1, 0.68, 1] as [number, number, number, number],
    },
  });

  return <div ref={ref} data-estrutura-texto data-state={visible ? "visible" : "waiting"} onFocusCapture={() => setFocused(true)}>
    <motion.p {...reveal(0)}>
      Somos uma agência 360º com núcleos de publicidade, marketing
      digital, conteúdo, produção audiovisual e eventos. Essa estrutura
      permite conduzir projetos integrados sem fragmentar a comunicação
      entre diferentes fornecedores.
    </motion.p>
    <motion.p {...reveal(1)}>
      Com escritórios em São Paulo, Santos e Campinas, reunimos
      atendimento, criação, redação, mídia, tráfego, tecnologia, foto,
      vídeo e produção.
    </motion.p>
    <motion.a {...reveal(2)} className="under" href="#contato" aria-label="Conheça a WordCom">
      Conheça a WordCom ↗
    </motion.a>
  </div>;
}
