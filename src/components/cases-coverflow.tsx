"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Pause, Play } from "lucide-react";
import { useInView, useReducedMotion } from "motion/react";
import { Suspense, useCallback, useEffect, useRef, useState, type CSSProperties } from "react";

/* O CTA do card central: vira navegação interna quando o case tem página
   própria. Fica num componente só para o JSX do card não crescer um ternário
   em volta do bloco inteiro do link, ícone e rótulo de leitor. */
function LinkDoCase({ slug, titulo }: { slug?: string; titulo: string }) {
  if (slug) {
    return (
      <Link className="cases3dCta" href={`/cases/${slug}`} aria-label={`Abrir case: ${titulo}`} />
    );
  }
  return (
    <a className="cases3dCta" href="#contato" aria-label={`Entrar em contato sobre: ${titulo}`} />
  );
}

/* Cases em coverflow 3D.

   As artes são imagens fechadas: o texto, a marca e até os controles do
   carrossel estão pintados dentro do bitmap. Por isso não há camada de texto
   aqui — ela duplicaria a que já está na arte.

   O preço disso é acessibilidade: texto dentro de imagem não é lido, não é
   selecionável e borra ao ampliar. O `alt` de cada card carrega o conteúdo
   integral, que é o máximo possível sem refazer as artes. O certo é regerar
   as imagens só com a ilustração e trazer o texto de volta para HTML.

   Diferenças deliberadas em relação ao componente de referência:
   - rotação automática solicitada pelo cliente, com pausa manual e durante
     a interação; respeita movimento reduzido e para fora da tela.
   - a seta do teclado NÃO é capturada no window. No original um listener
     global sequestrava ArrowLeft/ArrowRight da página inteira, inclusive de
     quem estivesse num formulário. Aqui ela só responde com o foco dentro
     do carrossel.
   - transições nomeadas em CSS, nunca `transition: all` em estilo inline. */

type Case = {
  arquivo: string;
  titulo: string;
  alt: string;
  /* quando existe, o CTA do card central leva à página própria do case em
     /cases/<slug>. Sem slug, o CTA continua levando ao formulário de contato,
     que é o comportamento antigo — os três primeiros cards ainda não têm
     página. */
  slug?: string;
  largura?: number;
  altura?: number;
  recorte?: [number, number, number, number];
  fundo?: string;
  raioRecorte?: string;
  formatoNatural?: boolean;
  encaixe?: "contain";
};

const cases: Case[] = [
  {
    arquivo: "/cases/case-01.png",
    titulo: "Construção e lançamento de marca",
    alt: "Case: Construção e lançamento de marca. Frentes: branding, embalagens e digital. Identidade aplicada em 90 dias. Da criação da marca aos rótulos, embalagens, site e materiais necessários para entrar no mercado com consistência.",
  },
  {
    arquivo: "/cases/case-02.png",
    titulo: "Presença integrada em múltiplos canais",
    alt: "Case: Presença integrada em múltiplos canais. Frentes: campanha, mídia e conteúdo. ON mais OFF na mesma direção. Planejamento, criação e distribuição conectados para ampliar presença e manter unidade em todos os pontos de contato.",
  },
  {
    arquivo: "/cases/case-03.png",
    titulo: "Conteúdo que constrói autoridade",
    alt: "Case: Conteúdo que constrói autoridade. Frentes: audiovisual, conteúdo e distribuição. Produção multiplataforma. Programas, filmes, entrevistas, podcasts e conteúdos digitais desenvolvidos para aproximar marcas de seus públicos.",
  },
  {
    arquivo: "/cases/campanhas/vai-nessa.png",
    slug: "vai-nessa",
    titulo: "Vai Nessa",
    alt: "Identidade visual Vai Nessa, com lettering roxo e rosa sobre uma composição amarela e branca.",
    recorte: [178, 46, 1092, 998],
    fundo: "#f7f7f7",
    raioRecorte: "9%",
    formatoNatural: true,
  },
  {
    arquivo: "/cases/campanhas/porto360.png",
    slug: "porto-360",
    titulo: "Porto360",
    alt: "Identidade visual Porto360, com símbolo circular e logotipo branco e azul sobre fundo azul.",
    recorte: [21, 20, 1408, 1045],
    fundo: "#005eaa",
  },
  {
    arquivo: "/cases/campanhas/dia-da-mulher.png",
    slug: "dia-da-mulher",
    titulo: "Dia Internacional da Mulher da Piacentini do Brasil",
    alt: "Campanha da Piacentini do Brasil para o Dia Internacional da Mulher, 8 de março. Ser mulher é construir sua liberdade todos os dias.",
    largura: 1484,
    altura: 1060,
    recorte: [80, 71, 1324, 925],
    fundo: "#850522",
  },
  {
    arquivo: "/cases/campanhas/beach-tennis.png",
    slug: "beach-tennis",
    titulo: "Beach Tennis WordCom Praia Grande",
    alt: "Aplicação da identidade Beach Tennis WordCom Praia Grande em ecobag e camisetas, com cores rosa e laranja em uma cena de praia.",
    recorte: [69, 47, 1312, 993],
    fundo: "#04b8dd",
    formatoNatural: true,
  },
  {
    arquivo: "/cases/campanhas/outubro-rosa.png",
    slug: "outubro-rosa",
    titulo: "Outubro Rosa",
    alt: "Campanha Outubro Rosa, com laço rosa e a escrita Outubro Rosa sobre fundo geométrico em tons de rosa.",
    recorte: [44, 16, 1380, 1035],
    fundo: "#e66aa4",
  },
  {
    arquivo: "/cases/campanhas/encontro-regional-2022.png",
    slug: "encontro-regional",
    titulo: "Encontro Regional Indústria Porto 2022",
    alt: "Sacolas institucionais do Encontro Regional Indústria Porto 2022, com identidade do evento e marcas de apoiadores em um ambiente de encontro empresarial.",
    largura: 1449,
    altura: 1085,
    recorte: [46, 27, 1359, 1031],
    formatoNatural: true,
  },
  {
    arquivo: "/cases/campanhas/ods-logo-arco-multicolorido.png",
    slug: "ods-baixada-santista",
    titulo: "Seminário de ODS da Baixada Santista",
    alt: "Marca ODS: Objetivos de Desenvolvimento Sustentável, com letras em azul, amarelo e verde e arco multicolorido.",
    largura: 2100,
    altura: 749,
    recorte: [0, 0, 2100, 749],
    encaixe: "contain",
    fundo: "#ffffff",
  },
  {
    arquivo: "/cases/campanhas/tudo-bem.png",
    slug: "tudo-bem",
    titulo: "Tudo Bem",
    alt: "Identidade Tudo Bem em uma colagem de televisão, entrevistas, estúdio e produção audiovisual, com as cores roxa e laranja.",
    recorte: [32, 33, 1384, 1019],
    fundo: "#6e21e8",
  },
  {
    arquivo: "/cases/campanhas/liceu-sao-paulo.png",
    slug: "liceu-sao-paulo",
    titulo: "Liceu São Paulo",
    alt: "Campanha do Liceu São Paulo: O futuro é hoje! Matrículas abertas 2023. Dois alunos realizando uma experiência de ciências sobre fundo vermelho.",
    largura: 1465,
    altura: 1073,
    recorte: [8, 5, 1449, 1068],
    fundo: "#ff0019",
  },
];

const TOTAL = cases.length;
const DISTANCIA_DE_ARRASTO = 45;
const INTERVALO_AUTOMATICO = 6000;

export function CasesCoverflow() {
  return (
    <Suspense fallback={<CarrosselCases />}>
      <CasesComRetorno />
    </Suspense>
  );
}

function CasesComRetorno() {
  const parametros = useSearchParams();
  const slug = parametros.get("case") ?? "";

  useEffect(() => {
    if (!slug || window.location.hash !== "#cases") return;
    const secao = document.getElementById("cases");
    if (!secao) return;

    // As seções animadas anteriores calculam sua altura após a hidratação.
    // Compensa apenas essa montagem inicial, sem prender a rolagem do visitante.
    let ativo = true;
    let posicaoAnterior = -1;
    let frame = 0;
    const reposicionar = () => {
      if (!ativo) return;
      const topo = secao.getBoundingClientRect().top + window.scrollY;
      if (Math.abs(topo - posicaoAnterior) < 1) return;
      posicaoAnterior = topo;
      window.scrollTo({ top: topo, behavior: "instant" });
    };
    const agendar = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(reposicionar);
    };
    const observador = new ResizeObserver(agendar);
    observador.observe(document.body);
    const interromper = () => {
      ativo = false;
      cancelAnimationFrame(frame);
      observador.disconnect();
    };
    const eventos = ["wheel", "touchstart", "pointerdown", "keydown"] as const;
    eventos.forEach((evento) => window.addEventListener(evento, interromper, { passive: true, once: true }));
    const limite = window.setTimeout(interromper, 3000);
    agendar();
    void document.fonts.ready.then(() => { if (ativo) agendar(); });

    return () => {
      interromper();
      clearTimeout(limite);
      eventos.forEach((evento) => window.removeEventListener(evento, interromper));
    };
  }, [slug]);

  return <CarrosselCases key={slug} slugInicial={slug} />;
}

function CarrosselCases({ slugInicial }: { slugInicial?: string }) {
  const [atual, setAtual] = useState(() =>
    Math.max(0, cases.findIndex((c) => c.slug === slugInicial && !!slugInicial)),
  );
  const carrossel = useRef<HTMLDivElement>(null);
  const toqueInicial = useRef({ x: 0, y: 0 });
  const ignorarClique = useRef(false);
  const visivel = useInView(carrossel, { amount: 0.2 });
  const movimentoReduzido = useReducedMotion();
  const [pausado, setPausado] = useState(false);
  const [mouseSobre, setMouseSobre] = useState(false);
  const [focoDentro, setFocoDentro] = useState(false);
  const [tocando, setTocando] = useState(false);

  const proximo = useCallback(() => setAtual((i) => (i + 1) % TOTAL), []);
  const anterior = useCallback(() => setAtual((i) => (i - 1 + TOTAL) % TOTAL), []);

  useEffect(() => {
    if (!visivel || movimentoReduzido || pausado || mouseSobre || focoDentro || tocando) return;
    let timer: ReturnType<typeof setTimeout>;
    const agendar = () => {
      clearTimeout(timer);
      if (!document.hidden) timer = setTimeout(proximo, INTERVALO_AUTOMATICO);
    };
    agendar();
    document.addEventListener("visibilitychange", agendar);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", agendar);
    };
    // Reinicia a contagem após qualquer troca manual ou automática.
  }, [atual, visivel, movimentoReduzido, pausado, mouseSobre, focoDentro, tocando, proximo]);

  /* posição de cada card em relação ao que está no centro */
  const posicao = (i: number) => {
    const d = (i - atual + TOTAL) % TOTAL;
    if (d === 0) return "centro";
    if (d === 1) return "direita";
    if (d === TOTAL - 1) return "esquerda";
    return "oculto";
  };

  const aoTeclar = (ev: React.KeyboardEvent) => {
    if (ev.key === "ArrowLeft") {
      ev.preventDefault();
      anterior();
    }
    if (ev.key === "ArrowRight") {
      ev.preventDefault();
      proximo();
    }
  };

  return (
    <div
      ref={carrossel}
      className="cases3d"
      role="group"
      aria-roledescription="carrossel"
      aria-label="Cases da WordCom"
      onKeyDown={aoTeclar}
      onPointerEnter={(ev) => { if (ev.pointerType === "mouse") setMouseSobre(true); }}
      onPointerLeave={(ev) => { if (ev.pointerType === "mouse") setMouseSobre(false); }}
      onPointerDownCapture={() => { ignorarClique.current = false; }}
      onFocusCapture={(ev) => setFocoDentro(ev.target.matches(":focus-visible"))}
      onBlurCapture={(ev) => {
        if (!ev.currentTarget.contains(ev.relatedTarget)) setFocoDentro(false);
      }}
      onClickCapture={(ev) => {
        if (!ignorarClique.current || ev.detail === 0) return;
        ev.preventDefault();
        ev.stopPropagation();
        ignorarClique.current = false;
      }}
    >
      <div
        className="cases3dPalco"
        onTouchStart={(ev) => {
          const toque = ev.touches[0];
          toqueInicial.current = { x: toque.clientX, y: toque.clientY };
          ignorarClique.current = false;
          setTocando(true);
        }}
        onTouchEnd={(ev) => {
          setTocando(false);
          const toque = ev.changedTouches[0];
          const d = toque.clientX - toqueInicial.current.x;
          const dy = toque.clientY - toqueInicial.current.y;
          ignorarClique.current = Math.max(Math.abs(d), Math.abs(dy)) > DISTANCIA_DE_ARRASTO;
          if (Math.abs(d) <= DISTANCIA_DE_ARRASTO || Math.abs(d) <= Math.abs(dy)) return;
          if (d < 0) proximo();
          else anterior();
        }}
        onTouchCancel={() => { setTocando(false); ignorarClique.current = true; }}
      >
        {cases.map((c, i) => {
          const pos = posicao(i);
          const noCentro = pos === "centro";
          const largura = c.largura ?? 1448;
          const altura = c.altura ?? 1086;
          const [x, y, cropWidth, cropHeight] = c.recorte ?? [32, 34, 1384, 1020];
          return (
            /* o card é um contêiner neutro. O que é interativo mora dentro
               dele e muda conforme a posição: o central tem o link do case,
               os laterais têm um botão que cobre a arte inteira e traz o
               card para o centro. Antes o próprio card era <button>, e aí
               o link do CTA ficaria aninhado dentro dele — HTML inválido. */
            <div key={c.arquivo} className="cases3dCard" data-pos={pos} data-formato={c.formatoNatural ? "natural" : undefined} data-encaixe={c.encaixe}
              aria-hidden={pos === "oculto" ? true : undefined} inert={pos === "oculto"}
              style={{ "--case-crop-ratio": cropWidth / cropHeight, background: c.fundo, borderRadius: c.formatoNatural ? c.raioRecorte : undefined } as CSSProperties}>
              <div className="cases3dMedia">
              <div className="cases3dCrop" style={{ aspectRatio: `${cropWidth} / ${cropHeight}`, borderRadius: c.formatoNatural ? undefined : c.raioRecorte }}>
              <Image
                src={c.arquivo}
                alt={noCentro ? c.alt : ""}
                width={largura}
                height={altura}
                sizes="(max-width: 760px) 86vw, 620px"
                priority={i === 0}
                style={c.encaixe === "contain" ? { inset: 0, width: "100%", height: "100%", objectFit: "contain", padding: "24px" } : { left: `${-x / cropWidth * 100}%`, top: `${-y / cropHeight * 100}%`, width: `${largura / cropWidth * 100}%`, height: `${altura / cropHeight * 100}%` }}
              />
              </div>
              </div>

              {noCentro ? (
                /* com página própria, navegação interna por Link (sem recarga
                   total); sem página, continua a âncora para o formulário */
                <LinkDoCase slug={c.slug} titulo={c.titulo} />
              ) : (
                <button
                  type="button"
                  className="cases3dIr"
                  aria-label={`Ver case: ${c.titulo}`}
                  onClick={() => setAtual(i)}
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="cases3dControles">
        <button type="button" onClick={anterior} aria-label="Case anterior">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M15 19 8 12l7-7" />
          </svg>
        </button>

        {/* aria-live: sem isso, quem usa leitor de tela aciona a seta e nada
            é anunciado — o controle parece não ter funcionado */}
        <span className="cases3dContador" aria-live={focoDentro || pausado ? "polite" : "off"}>
          <span aria-hidden="true">
            {String(atual + 1).padStart(2, "0")} / {String(TOTAL).padStart(2, "0")}
          </span>
          <span className="soLeitor">
            Case {atual + 1} de {TOTAL}
          </span>
        </span>

        <button type="button" onClick={proximo} aria-label="Próximo case">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m9 5 7 7-7 7" />
          </svg>
        </button>
        <button type="button" className="cases3dRotacao"
          aria-label={pausado ? "Retomar carrossel de cases" : "Pausar carrossel de cases"}
          title={pausado ? "Retomar carrossel de cases" : "Pausar carrossel de cases"}
          onClick={() => {
            setPausado((valor) => !valor);
            if (pausado) setFocoDentro(false);
          }}>
          {pausado ? <Play size={18} aria-hidden="true" /> : <Pause size={18} aria-hidden="true" />}
        </button>
      </div>
    </div>
  );
}
