import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FundoVideo } from "@/components/fundo-video";

/* Páginas dos projetos — porte fiel das três páginas que já existem.
   Mesmas classes (.product, .productHero, .productInfo, .stats), mesmo
   conteúdo, mesmos números.

   Melhorias sem efeito visual:
   - title e description por projeto (as três páginas dividiam o mesmo <title>)
   - logo via next/image, com dimensões declaradas
   - aria-label nos links cujo rótulo termina em seta

   PENDÊNCIA DE CONTEÚDO: o último parágrafo das três páginas era um recado de
   desenvolvimento — "Esta é a estrutura inicial da página individual..." —
   publicado para o visitante. Removido antes do deploy: dizer ao público que a
   página está inacabada é pior do que a seção ficar mais curta.

   O buraco continua: falta história, programação, parceiros e resultados reais
   de cada projeto. O tipo `Projeto` não tem campo para isso, então é escrever o
   texto e acrescentar o campo. O mesmo vale para o <h2> desta seção, que hoje é
   igual nos três projetos. */

type Projeto = {
  nome: string;
  resumo: string;
  kicker: string;
  stats: string[];
};

const projetos: Record<string, Projeto> = {
  enip: {
    nome: "Encontro Nacional Indústria Porto",
    resumo:
      "O encontro que conecta indústria, infraestrutura e os diferentes modais que movimentam cargas no Brasil.",
    kicker: "Logística · Infraestrutura · Comércio exterior",
    stats: ["+4 mil participantes", "917 empresas", "Etapas nacionais"],
  },
  "jornal-portuario": {
    nome: "Jornal Portuário",
    resumo:
      "Informação relevante e audiência qualificada para as empresas e lideranças que movimentam o setor portuário brasileiro.",
    kicker: "Notícia · Conteúdo · Mídia",
    stats: [
      "+2 milhões no portal/mês",
      "+6 milhões no Instagram/mês",
      "Cobertura nacional",
    ],
  },
  "empreenda-sim": {
    nome: "Empreenda Sim",
    resumo:
      "Um ecossistema de conhecimento, encontros e conexões criado para aproximar quem empreende de conteúdo aplicável.",
    kicker: "Eventos · Educação · Comunidade",
    stats: ["Eventos presenciais", "Comunidade digital", "Conteúdo contínuo"],
  },
};

export function generateStaticParams() {
  return Object.keys(projetos).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = projetos[slug];
  if (!p) return { title: "Projeto não encontrado — WordCom" };
  return { title: `${p.nome} — WordCom`, description: p.resumo };
}

export default async function PaginaProjeto({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = projetos[slug];
  if (!p) notFound();

  return (
    <main className="product">
      {/* EXPERIMENTO (branch experimento/sem-navbar): faixa de logo e o link
          "Voltar ao site" removidos, mesma avaliação das páginas de case. */}

      <section className={`productHero${slug === "empreenda-sim" ? " productHeroVideo" : ""}`}>
        {slug === "empreenda-sim" ? (
          <FundoVideo
            src="/midia/empreenda-sim-fundo.mp4"
            poster="/midia/empreenda-sim-poster.webp"
            className="productBackgroundVideo"
          />
        ) : (
          <div className="glow productGlow" aria-hidden />
        )}
        <p className="eyebrow">Produto WordCom</p>
        <h1>{p.nome}</h1>
        <p>{p.resumo}</p>
        <a href="#conheca" className="btn" aria-label="Conheça o projeto">
          Conheça o projeto ↓
        </a>
      </section>

      <section className="productInfo" id="conheca">
        <p className="kicker">{p.kicker}</p>
        <h2>
          Uma plataforma criada
          <br />
          para <em>ampliar conexões</em>
        </h2>
        <div className="stats">
          {p.stats.map((s) => (
            <strong key={s}>{s}</strong>
          ))}
        </div>
        <Link
          href="/#contato"
          className="btn"
          aria-label="Falar com a WordCom"
        >
          Falar com a WordCom ↗
        </Link>
      </section>
    </main>
  );
}
