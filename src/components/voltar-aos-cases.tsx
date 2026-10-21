import Link from "next/link";
import estilos from "./voltar-aos-cases.module.css";

/* Marca flutuante que devolve o visitante ao carrossel de cases.

   POR QUE UM LINK, E NÃO history.back()

   Quem chega numa página de case por link compartilhado no WhatsApp, por
   busca, ou abrindo em aba nova não tem página anterior. Ali o history.back()
   não faz nada, ou pior: joga a pessoa para fora do site. E são justamente
   esses os visitantes de um case compartilhado.

   O link para /?case=<slug>#cases funciona nos dois casos, e reusa um
   mecanismo que já existe: o cases-coverflow.tsx lê useSearchParams().get("case")
   e abre o carrossel exatamente neste case, reposicionando a rolagem.

   POR QUE O CANTO ESQUERDO

   Na home o canto inferior direito é do botão de WhatsApp. Deixar a marca à
   esquerda evita que o mesmo canto da tela signifique coisas diferentes
   conforme a página. */

export function VoltarAosCases({ slug, nome }: { slug: string; nome: string }) {
  return (
    <Link
      href={`/?case=${encodeURIComponent(slug)}#cases`}
      className={estilos.marca}
      /* nomeia o destino, não a direção: "voltar" sozinho não diz para onde */
      aria-label={`Voltar aos cases da WordCom, em ${nome}`}
    >
      {/* a seta é desenhada, não um caractere unicode: acompanha a espessura
          de traço dos outros controles do site */}
      <svg
        className={estilos.seta}
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M19 12H5m7-7-7 7 7 7" />
      </svg>
    </Link>
  );
}
