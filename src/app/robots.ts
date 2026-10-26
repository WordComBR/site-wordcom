import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

/* O site nao tinha robots.txt. Sem ele o buscador rastreia tudo por padrao,
   inclusive paginas que nao deveriam ser indexadas.

   `/preview/` e um redirecionamento permanente para a pagina real: deixar o
   buscador rastreando nao quebra nada, mas gasta orcamento de rastreamento e
   pode competir com o destino. Fora do indice. */

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/preview/"],
    },
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
