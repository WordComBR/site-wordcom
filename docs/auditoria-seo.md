# WordCom: auditoria inicial e plano de SEO

Data: 08/10/2026. Status: planejamento, sem implementacao.

## Objetivo e limites

Melhorar a descoberta da propria WordCom nas buscas e atrair contatos comerciais qualificados, preservando a identidade visual aprovada.

Esta auditoria combina leitura do codigo local e consulta ao site institucional atual. Nenhuma pagina, configuracao, DNS, integracao ou publicacao foi alterada. O documento nao certifica conformidade legal nem promete posicoes no Google.

Os achados de codigo descrevem o workspace, nao comprovam que a mesma versao esteja publicada. A consulta automatizada ao endereco da Vercel nao retornou conteudo nesta auditoria; isso, isoladamente, nao indica indisponibilidade do site.

Nao foram medidos trafego, palavras-chave, backlinks, indexacao real, Core Web Vitals ou pontuacao Lighthouse. Nao houve acesso ao Search Console, Analytics ou Perfil da Empresa no Google.

## Resumo executivo

Prioridades recomendadas:

1. Inventariar os enderecos do site antigo antes de trocar o DNS, para preservar paginas relevantes e seus acessos.
2. Completar os textos de projetos e definir titulos, descricoes e enderecos canonicos por pagina.
3. Medir carregamento e interatividade no celular, principalmente na hero e nos arquivos de midia.
4. Planejar conteudo de servicos e cases com base no publico e em dados reais de busca.
5. Acompanhar os resultados no Search Console e os contatos recebidos, sem confundir SEO com anuncios pagos.

## Base existente: pontos positivos confirmados

- O documento declara `lang="pt-BR"` e viewport responsivo em [layout.tsx](../src/app/layout.tsx).
- A home possui titulo e descricao nos metadados.
- A hero tem um `h1` e textos em HTML; a comunicacao nao depende apenas do canvas em [hero-sequencia.tsx](../src/components/hero-sequencia.tsx).
- Os tres projetos possuem titulo e descricao individuais, geracao estatica e tratamento de slug inexistente em [projetos/[slug]/page.tsx](../src/app/projetos/%5Bslug%5D/page.tsx).
- Documentos institucionais possuem metadados proprios.
- As antigas rotas de documentos usam `permanentRedirect` para a pagina consolidada.
- A fonte e servida pelo proprio site via `next/font`, com `display: swap`.

Esses pontos ajudam a estabelecer uma base tecnica, mas nao comprovam indexacao ou bom posicionamento.

## Achados e prioridades

P0 = validar antes da migracao; P1 = primeira rodada de melhorias; P2 = evolucao posterior. As prioridades sao uma avaliacao de risco, nao uma pontuacao de SEO.

| Prioridade | Evidencia confirmada | Acao futura proposta | Como validar |
| --- | --- | --- | --- |
| P0 | O site atual possui `/sobre/` e navegacao para produtora, cases, blog e contato; o novo concentra varias dessas areas na home. Nao foi localizado um mapa completo de migracao. | Inventariar URLs antigas, acessos e links; decidir quais manter e quais redirecionar para equivalentes reais. | Testar cada URL importante e o destino final, sem loops, cadeias desnecessarias ou redirecionamento indiscriminado para a home. |
| P0 | O dominio definitivo e o endereco `.vercel.app` fazem parte do processo de publicacao. O layout nao declara canonical. | Definir a URL oficial e uma politica para aliases e ambientes de teste, coordenada com a troca de DNS. | Conferir canonical, redirecionamentos e indexabilidade no HTML e nos cabecalhos publicados. |
| P1 | O layout nao define `metadataBase` ou `alternates.canonical`; o titulo principal privilegia o slogan. | Planejar metadados por pagina que identifiquem marca, atividade e assunto, sem repeticao artificial de palavras-chave. | Conferir o HTML de cada rota. Canonical deve apontar para sua equivalente oficial, nao todas para a home. |
| P1 | As paginas de projetos ainda exibem um paragrafo anunciando uma estrutura inicial, perto da linha 127. | Substituir o texto por conteudo real aprovado: contexto, atuacao da WordCom, entregas e resultados documentados. | Revisao editorial e comercial; nenhuma mensagem de desenvolvimento visivel. |
| P1 | Nao foram encontrados arquivos ou rotas de sitemap e robots na arvore examinada. | Planejar sitemap com URLs oficiais relevantes e revisar regras de rastreamento. | Consultar `/sitemap.xml`, `/robots.txt` e Search Console apos implementar. Ausencia de robots nao impede, por si so, indexacao; sitemap tambem nao garante indexacao. |
| P1 | Em `faq-tabs.tsx`, apenas a categoria selecionada e renderizada. As respostas da categoria inicial usam `forceMount`, mas a segunda categoria exige interacao. | Verificar se todo conteudo institucional importante esta disponivel no HTML renderizado sem depender de cliques, mantendo a aparencia aprovada. | Inspecao de HTML e teste de URL no Search Console. Um FAQ visual nao e, por si so, problema de SEO. |
| P1 | O acervo de `public` possui aproximadamente 55,96 MiB de PNG, 18,00 MiB de MP4 e 16,28 MiB de WebP. | Medir o que cada pagina realmente baixa antes de otimizar imagens, videos ou carregamento dos frames. | Registrar transferencias, LCP, INP e CLS em mobile e desktop; comparar antes/depois. Tamanho total do acervo nao equivale ao peso de uma visita. |
| P2 | Open Graph global nao define imagem ou URL; projetos definem titulo/descricao, sem Open Graph especifico. | Preparar compartilhamento coerente por pagina com imagens e enderecos absolutos. | Conferir metadados e previa de compartilhamento. Esta e sobretudo uma melhoria de apresentacao, nao garantia de ranking. |
| P2 | Nao foram encontrados dados estruturados JSON-LD no codigo examinado. | Avaliar `Organization` e, se adequado, dados locais e breadcrumbs, apenas com informacoes verificadas. | Validar sintaxe e elegibilidade nas ferramentas oficiais; nao inventar avaliacoes ou prometer resultados enriquecidos. |
| P2 | A politica de cookies declara titulo proprio, sem descricao especifica. | Revisar descricao dessa pagina na rodada de metadados. | Conferir descricao final no HTML. |

## Estrategia de conteudo

A navegacao por secoes pode continuar. Nao e necessario redesenhar a home para melhorar SEO.

Oportunidades a pesquisar, ainda sem volume de busca ou dificuldade medidos:

- Marca: WordCom, WordCom Publicidade e variacoes legitimas.
- Intencao comercial: agencia de publicidade, agencia de marketing e agencia 360.
- Servicos: branding, performance, audiovisual, eventos, imprensa e planejamento de midia.
- Intencao local: combinar servico e localidade apenas onde houver atuacao real e informacao util.

Antes de criar novas paginas, confirmar com a equipe quais servicos e regioes sao prioritarios. Cada pagina deve responder a uma necessidade concreta, com entregas, processo, exemplos e contato. Evitar paginas quase identicas por cidade ou repeticao de termos.

Cases podem explicar desafio, estrategia, execucao e resultados com autorizacao do cliente. Numeros, depoimentos e logos precisam de validacao interna. Os textos institucionais devem preservar o posicionamento aprovado da empresa, usando o [site atual como referencia](https://wordcom.com.br/sobre/), sem tratar dados antigos como automaticamente atualizados.

O blog antigo deve ser inventariado antes de decidir sua continuidade. Conteudo com acessos, links ou valor comercial nao deve desaparecer sem avaliacao.

## Plano de migracao

Este e um roteiro, nao uma instrucao para alterar DNS agora. Trocar hospedagem mantendo `wordcom.com.br` nao e necessariamente trocar dominio; mesmo assim, mudar caminhos exige planejamento.

| Origem | Situacao ou destino proposto | Pendencia |
| --- | --- | --- |
| `/` | Manter a pagina principal no dominio oficial. | Validar dominio preferido, HTTPS e variantes com/sem `www`. |
| `/sobre/` | Preservar pagina propria ou escolher equivalente institucional adequado. | Decisao editorial e analise de acessos; nao assumir que uma ancora substitui uma pagina independente. |
| `/codigodeetica` | Redirecionamento para `/documentos-institucionais` ja existe no codigo. | Testar tambem variantes com barra final e PDFs antigos. |
| `/procedimentosdecompliance` | Redirecionamento para `/documentos-institucionais` ja existe no codigo. | Testar variantes e relevancia do destino. |
| URLs de blog, produtora, cases e contato | Ainda sem mapeamento completo. | Extrair URLs exatas do site antigo, sitemap, Search Console e links internos. |
| Arquivos antigos, especialmente PDFs | Ainda sem inventario completo. | Preservar ou redirecionar arquivos importantes individualmente. |

Usar redirecionamentos permanentes para equivalentes relevantes. Se um conteudo foi realmente removido e nao tem substituto, avaliar resposta 404/410 em vez de mandar tudo para a home. Manter redirecionamentos por pelo menos um ano, preferencialmente mais, conforme o [guia de migracao do Google](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes).

Antes do lancamento: salvar uma linha de base de acessos e URLs; validar sitemap, canonical, status HTTP, links, imagens, PDFs e ausencia de bloqueios indevidos. Apos o lancamento: enviar o sitemap oficial e acompanhar indexacao, erros e desempenho.

## Medicao e acompanhamento

- Search Console: consultas, impressoes, cliques, CTR, posicao media e problemas de indexacao. Separar buscas pela marca das buscas por servico.
- Analytics: origem das visitas e comportamento, somente conforme a integracao e o consentimento definidos.
- Conversoes: contar formulario apenas quando o servidor confirmar envio; clique no WhatsApp indica intencao, nao necessariamente um contato concluido.
- Desempenho: testar home e paginas principais no PageSpeed Insights e em dispositivos reais; separar laboratorio de dados de campo. Referencia: [Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals).
- Negocio: acompanhar contatos organicos qualificados, nao apenas visitas. Comparar periodos equivalentes e considerar sazonalidade e campanhas.

O GTM administra tags; ele nao substitui Search Console nem melhora posicionamento sozinho. O banner de cookies tambem nao representa um selo de SEO ou conformidade legal. O estado das integracoes deve ser confirmado separadamente em [cookies.md](cookies.md).

## Ordem de execucao proposta

1. **Diagnostico:** obter dados do site antigo, inventario de URLs e prioridades comerciais; medir a versao publicada.
2. **Preparacao:** aprovar mapa de migracao, metadados, conteudo de projetos e politica de dominio.
3. **Implementacao autorizada:** aplicar correcoes tecnicas e editoriais em uma etapa separada, sem mudar o visual aprovado desnecessariamente.
4. **Validacao e lancamento:** testar rotas, indexabilidade, mobile e contato; publicar apenas apos aprovacao.
5. **Acompanhamento:** revisar Search Console e contatos apos o lancamento e mensalmente, sem esperar resultados imediatos garantidos.

## Informacoes ainda necessarias

- Acesso autorizado ou exportacoes do Search Console atual, preferencialmente dos ultimos 12 meses.
- Lista completa de paginas e arquivos do site antigo; sitemap, se existir.
- Servicos, localidades e perfis de cliente prioritarios, aprovados pela WordCom.
- Conteudos e resultados reais dos projetos, com permissoes de uso.
- Confirmacao dos dados empresariais e dos perfis locais oficiais.
- Decisao de quando migrar o DNS e qual sera a versao oficial de cada endereco.

Nao enviar senhas ou credenciais para preparar esse levantamento.

## Referencias

- [Guia inicial de SEO do Google](https://developers.google.com/search/docs/fundamentals/seo-starter-guide): fundamentos de conteudo, descoberta e organizacao.
- [Consolidacao de URLs duplicadas](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls): escolha de enderecos canonicos.
- [Migracoes e mudancas de URLs](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes): inventario, redirecionamentos e acompanhamento.
- [Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals): criterios de experiencia e medicao.

Conclusao: a primeira melhoria deve ser preservar o que a WordCom ja construiu no dominio atual e tornar o novo conteudo completo e tecnicamente consistente. Novas paginas e otimizacoes de desempenho devem seguir evidencias, nao uma mudanca estetica geral.
