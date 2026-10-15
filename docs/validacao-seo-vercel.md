# Resultado da validacao do novo site WordCom

Data: 08/10/2026. Site testado: https://site-wordcom.vercel.app/

## Resposta direta

O novo site tem uma boa base tecnica de SEO e as paginas principais funcionam. Entretanto, ainda existem cuidados importantes antes de substituir o site antigo: preservar seus links, definir os enderecos oficiais e melhorar o carregamento em celulares mais lentos.

Nao foi alterado o site, o DNS ou o deploy. Foram criados apenas este relatorio e arquivos locais de diagnostico em `reference/`. Nenhum formulario foi enviado.

## Notas obtidas

Teste da HOME com Lighthouse 13.5.0, navegador Edge/Chromium, em simulacao mobile de 412 x 823, rede limitada e CPU com desaceleracao de 4 vezes. Uma execucao, nao uma media de varias visitas.

| Area | Nota | Significado simples |
| --- | --- | --- |
| SEO basico | 100/100 | Passou nas verificacoes automaticas basicas aplicaveis. |
| Boas praticas | 100/100 | Passou nas verificacoes aplicaveis desta categoria. |
| Acessibilidade | 97/100 | Resultado alto, com alertas de contraste para revisar. |
| Desempenho mobile | 57/100 | Precisa melhorar o carregamento em condicoes limitadas. |

**SEO 100 nao significa primeiro lugar no Google nem SEO completo.** Neste teste, canonical e robots ausentes foram considerados nao aplicaveis, nao falhas. A nota nao avalia qualidade comercial do conteudo, preservacao de URLs antigas, concorrencia, backlinks ou indexacao real.

A nota de desempenho nao contradiz a navegacao rapida percebida em um computador ou Wi-Fi. A simulacao representa uma primeira visita em condicoes mais limitadas. Nao foi feita uma comparacao de desempenho com o site antigo.

## O que passou nos testes

- HTTPS e resposta HTTP 200 na home, documentos, politica de cookies e nos tres projetos.
- As seis paginas possuem titulo, descricao e um `h1` no HTML recebido.
- O texto principal nao depende apenas da animacao da hero: existe conteudo em HTML.
- Nao foi identificado `noindex` nas seis paginas validas, nem cabecalho `X-Robots-Tag` impedindo indexacao. Isso nao comprova que o Google ja as indexou.
- Todas as imagens HTML examinadas possuem atributo `alt`; a qualidade descritiva exige revisao humana.
- Os links internos de paginas e PDFs extraidos dessas paginas foram verificados sem destino quebrado. Links externos nao foram auditados integralmente.
- Os dois PDFs responderam HTTP 200 e tipo `application/pdf`.
- Os antigos caminhos de etica e compliance chegaram a `/documentos-institucionais`. O codigo intermediario e a quantidade de saltos nao foram confirmados neste teste publicado.
- URLs inexistentes retornaram HTTP 404 e `noindex`, em vez de fingirem ser paginas validas.
- Na home e em documentos, nao houve largura extra horizontal em 390 px e 1440 px.
- Durante a navegacao automatizada pela home, nao houve excecoes JavaScript ou respostas de recursos com status 400 ou superior. Nenhuma imagem concluida estava quebrada nas amostras.
- Todos os destinos de ancoras da home existiam no DOM.

Esses testes cobrem as condicoes e os caminhos descritos, nao todos os aparelhos, navegadores e estados possiveis.

## O que falta ajustar

### 1. Preservar links do site antigo: antes de trocar o DNS

No novo site, `/sobre/`, `/blog/` e `/contato/` retornam 404. Isso nao quebra a navegacao atual por secoes, mas pode quebrar links antigos depois da troca do dominio.

Acao: levantar as URLs reais do site antigo e decidir quais manter e quais redirecionar para conteudo equivalente. Nao redirecionar tudo indiscriminadamente para a home. Referencia: [migracoes e URLs no Google](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes).

### 2. Definir o endereco oficial de cada pagina

Nenhuma das seis paginas publicou `rel="canonical"`. Como o site passa por uma transicao entre Vercel e dominio proprio, convem definir explicitamente qual endereco sera o oficial.

Acao: planejar canonical por pagina e politica de aliases. A home deve indicar sua URL oficial; cada projeto, a sua propria. Canonical e um sinal para o Google, nao uma garantia. Referencia: [enderecos canonicos](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls).

### 3. Preparar sitemap e regras de rastreamento

`/sitemap.xml` e `/robots.txt` retornaram 404 no site publicado.

Acao: criar sitemap com paginas oficiais relevantes e revisar a necessidade das regras de robots. A ausencia de robots nao bloqueia automaticamente o Google; sitemap ajuda na descoberta, mas nao garante indexacao.

### 4. Completar o conteudo dos projetos

As tres paginas de projetos ainda mostram o aviso de que a pagina e uma estrutura inicial. Esse texto foi confirmado no HTML publicado, nao apenas no codigo local.

Acao: substituir por informacoes reais e aprovadas, incluindo contexto, entregas e resultados da WordCom. Nao e preciso redesenhar as paginas.

### 5. Melhorar o carregamento mobile

Resultados da simulacao Lighthouse:

| Medida | Resultado | Interpretacao |
| --- | --- | --- |
| Primeiro conteudo visivel (FCP) | 1,9 s | O site comeca a apresentar conteudo antes de terminar todo o carregamento. |
| Maior conteudo visivel (LCP) | 15,9 s | Ponto de atencao importante na simulacao. |
| Bloqueio de processamento (TBT) | 540 ms | Ha trabalho de processamento a reduzir. Nao equivale ao INP real. |
| Mudanca de posicao do layout (CLS) | 0 | O layout ficou estavel durante essa medicao. |
| Transferencia observada pelo Lighthouse | Cerca de 6,4 MiB | Volume significativo para uma visita mobile limitada. |

O elemento registrado como LCP foi o texto do banner de cookies, nao o canvas da hero. A investigacao deve considerar o banner, o momento de renderizacao e a disputa por recursos; nao atribuir o resultado somente a uma imagem ou animacao sem teste controlado.

O arquivo `/midia/fundo-institucional.png` transferiu aproximadamente 1,86 MiB. O Lighthouse estimou economia potencial de cerca de 1,60 MiB com melhor compressao/formato. Essa economia e uma estimativa, nao uma alteracao realizada.

Em outra medicao, sem limitar a rede e aguardando sete segundos apos o evento de carregamento, foram observados cerca de 5,24 MiB no mobile e 8,30 MiB no desktop. O volume varia com viewport, tempo de observacao, cache e carregamento dos frames. Nao representa o total de uma visita completa.

Acao: testar compressao do fundo, prioridade de carregamento e carregamento progressivo dos frames e demais midias. Preservar a aparencia aprovada e comparar antes/depois em novas medicoes.

Metas de referencia para dados reais: LCP ate 2,5 s, INP abaixo de 200 ms e CLS abaixo de 0,1, conforme [Core Web Vitals do Google](https://developers.google.com/search/docs/appearance/core-web-vitals). Esta auditoria nao obteve dados de usuarios reais nem confirmou aprovacao em Core Web Vitals.

### 6. Revisar alertas e apresentacao

- O Lighthouse apontou contraste em 53 ocorrencias, incluindo numeros, solucoes e footer. Como ha animacoes de opacidade, revisar cada estado apos sua revelacao antes de tratar todos como problemas permanentes.
- Nenhuma pagina examinada publicou imagem Open Graph ou dados estruturados JSON-LD. Sao oportunidades de apresentacao e clareza, nao impedimentos automaticos de indexacao.
- A politica de cookies herda a descricao generica da home.
- O comportamento das abas institucionais merece verificacao do conteudo acessivel sem cliques e futura inspecao no Search Console.

## O que ainda nao pode ser confirmado

- Posicao no Google, palavras-chave que geram visitas e quantidade de paginas indexadas: dependem do Search Console e de dados reais.
- Preservacao de todo o historico do site antigo: exige inventario completo de URLs, artigos e arquivos.
- Comportamento final de `wordcom.com.br`, suas variantes e HTTPS no novo provedor: precisa ser validado quando houver a troca de DNS.
- Velocidade em todos os celulares e redes: exige mais amostras e acompanhamento de usuarios reais.
- Entrega de e-mails nesta rodada: nao foram enviados contatos para nao interferir na caixa comercial.
- Conformidade legal de cookies ou privacidade: nao faz parte de uma certificacao automatica de SEO.

O PageSpeed Insights via API retornou limite de cota (HTTP 429); por isso a pontuacao acima vem do Lighthouse executado localmente contra a URL publica. Nao foi obtida pontuacao Lighthouse de desktop ou de todas as paginas individuais.

## Recomendacao final

O novo site nao precisa ser refeito. A base de SEO esta boa, mas eu recomendo resolver o mapa de links antigos, os enderecos oficiais, o conteudo provisório e o carregamento mobile antes de concluir a migracao.

Evidencias tecnicas locais: `reference/seo-publicado-2026-10-08.json` e `reference/lighthouse-mobile-2026-10-08.json`. O plano mais amplo continua em [auditoria-seo.md](auditoria-seo.md).
