import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { generateStaticParams as paramsCases } from "./cases/[slug]/page";
import { generateStaticParams as paramsProjetos } from "./projetos/[slug]/page";

/* O site nao tinha sitemap. Sem ele o buscador depende de achar os links
   sozinho — e as paginas de case e de projeto so sao alcancaveis por carrossel
   e por roda, montados em JavaScript. Eram justamente as mais dificeis de achar.

   Os slugs vem do `generateStaticParams` das proprias paginas, nao copiados:
   case novo entra no sitemap sozinho. Importar a funcao, e nao uma lista nova,
   e o jeito que o Next permite — arquivo de pagina so aceita os exports que ele
   conhece, e um `export const slugs` ali quebra a checagem de tipos do build.

   `/bio` fica de fora de proposito: e a pagina de links para a bio do Instagram,
   feita para quem chega pelo perfil, nao por busca. `/preview/*` tambem, porque
   so redireciona — e o robots.ts ja o exclui. */

const PRIORIDADE: Record<string, number> = {
  "": 1,
  "documentos-institucionais": 0.5,
  "politica-de-cookies": 0.3,
  codigodeetica: 0.3,
  procedimentosdecompliance: 0.3,
};

export default function sitemap(): MetadataRoute.Sitemap {
  const agora = new Date();

  const estaticas = Object.keys(PRIORIDADE).map((rota) => ({
    url: rota ? `${SITE}/${rota}` : SITE,
    lastModified: agora,
    changeFrequency: (rota ? "yearly" : "monthly") as "yearly" | "monthly",
    priority: PRIORIDADE[rota],
  }));

  const dinamicas = [
    ...paramsCases().map(({ slug }) => `cases/${slug}`),
    ...paramsProjetos().map(({ slug }) => `projetos/${slug}`),
  ].map((rota) => ({
    url: `${SITE}/${rota}`,
    lastModified: agora,
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));

  return [...estaticas, ...dinamicas];
}
