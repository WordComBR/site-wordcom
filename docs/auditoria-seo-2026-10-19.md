# Auditoria do novo site WordCom

Data: 19/10/2026. Endereco avaliado: https://site-wordcom.vercel.app/.

## Resposta direta

**O site tem uma boa base, funciona e navega rapido em uma conexao boa. Mas ainda nao esta totalmente otimizado para celulares lentos nem com o SEO tecnico completo. Nao precisa refazer o visual.**

O desktop obteve **93/100 de desempenho**. A home mobile variou entre **52 e 74/100** no Lighthouse. O SEO automatico da home marcou **100/100**, mas essa nota nao verifica todas as pendencias encontradas nesta auditoria e nao garante posicao no Google.

Nao foi alterado nenhum arquivo de funcionamento do site nesta auditoria. Nao houve deploy, alteracao de DNS, ativacao de rastreadores ou envio de formulario. Foram criados somente arquivos locais de diagnostico e este relatorio.

## Qual versao foi medida

- A versao publicada na Vercel, que ja inclui os enquadramentos mobile dos cases e a faixa de marcas ajustada.
- O efeito novo BlurText dos titulos ainda esta apenas no localhost. Ele nao faz parte destas notas de producao. Seus testes locais de layout e funcionamento passaram, mas sera necessario repetir a medicao de desempenho quando ele for publicado.
- O localhost esta usando o modo de desenvolvimento do Next.js. Nao usei a velocidade desse modo como pontuacao do site final.
- O dominio `wordcom.com.br` ainda respondeu com o site WordPress antigo nesta verificacao. Portanto, os numeros abaixo sao do site novo na Vercel, nao do antigo.

## Resultados padronizados

Ferramenta: Lighthouse 13.5.0 em Chrome headless. Mobile: tela simulada 412 x 823, modelo de rede com RTT de 150 ms e throughput de 1.638,4 Kbps, desaceleracao de CPU de 4 vezes. Desktop: preset desktop. Sao testes de laboratorio, nao visitas reais de clientes.

| Pagina e modo | Desempenho | SEO automatico | Acessibilidade | Boas praticas | LCP | TBT | CLS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Home mobile, primeira medicao exploratoria | 52 | 100 | 97 | 100 | 10,00 s | 760 ms | 0 |
| Home mobile, repeticao 2 | 56 | 100 | 97 | 100 | 9,91 s | 611 ms | 0 |
| Home mobile, repeticao 3 | 74 | 100 | 97 | 100 | 3,92 s | 543 ms | 0,032 |
| Home desktop | 93 | 100 | 97 | 100 | 1,77 s | 0 ms | 0,002 |
| Beach Tennis mobile | 74 | 100 | 98 | 100 | 7,00 s | 148 ms | 0 |
| ODS mobile | 93 | 100 | 98 | 100 | 3,05 s | 140 ms | 0 |

A primeira medicao da home foi exploratoria, enquanto outro navegador de auditoria ainda estava ativo. As duas repeticoes seguintes foram executadas sequencialmente, sem aquela auditoria simultanea. Nao se deve escolher apenas a melhor nota e desconsiderar a variacao: mesmo a melhor repeticao da home apresentou LCP acima da meta de referencia.

Em linguagem simples:

- **LCP:** tempo ate o maior conteudo principal ser apresentado. Referencia de bom resultado: ate 2,5 segundos.
- **TBT:** tempo de bloqueio de processamento no teste. Quanto menor, melhor. Nao e a mesma medida que INP.
- **CLS:** quanto o layout muda de lugar. Os resultados foram estaveis; a referencia de bom resultado e ate 0,1.
- **INP:** tempo de resposta a interacoes reais. Nao foi obtido um INP representativo de usuarios nesta auditoria. A referencia de bom resultado e ate 200 ms.

Essas referencias sao de [Core Web Vitals](https://web.dev/articles/vitals). Sua aprovacao real depende da experiencia de pelo menos 75% das visitas, nao apenas de uma execucao local. A API do PageSpeed Insights retornou HTTP 429 por cota; nao foi possivel obter dados de campo por esse caminho. Nao houve acesso ao Search Console.

## Conferencia pagina por pagina

Foram verificadas as 15 paginas de conteudo publicadas. Todas responderam HTTP 200 e entregaram titulo, meta description, um H1 e texto no HTML.

Esta tabela e de uma segunda modalidade de teste: navegador mobile simulado em 390 x 844, **sem limitar rede ou CPU**, com uma janela de observacao de cinco segundos apos o DOMContentLoaded. As visitas usaram contextos separados; a CDN e a maquina de teste podem estar aquecidas. Os valores nao sao pontuacoes Lighthouse nem prazos garantidos de carregamento. O volume e o observado naquela janela, nao o tamanho total de uma visita completa.

| Pagina | LCP observado sem limitacao | Transferencia observada | Observacao |
| --- | ---: | ---: | --- |
| Home | 1,35 s | 5,03 MiB | Rapida nessa conexao, mas precisa melhorar no teste mobile limitado. |
| Liceu Sao Paulo | 0,57 s | 4,36 MiB | Funcionando; video merece otimizacao de peso. |
| Tudo Bem | 0,48 s | 1,89 MiB | Funcionando. |
| Vai Nessa | 0,34 s | 1,65 MiB | Funcionando. |
| Porto 360 | 0,45 s | 4,53 MiB | Funcionando; volume inicial significativo. |
| Dia da Mulher | 0,52 s | 2,36 MiB | Funcionando. |
| Beach Tennis | 0,21 s | 7,03 MiB | Maior volume inicial entre os cases amostrados; LCP Lighthouse de 7 s. |
| Outubro Rosa | 0,21 s | 4,08 MiB | Funcionando; video merece otimizacao de peso. |
| Encontro Regional | 0,56 s | 2,25 MiB | Funcionando. |
| Seminario de ODS | 0,28 s | 2,31 MiB | Boa nota composta no Lighthouse; LCP de 3,05 s ainda acima da referencia. |
| Documentos institucionais | 0,78 s | 2,25 MiB | Funcionando; os dois PDFs tambem responderam HTTP 200. |
| Politica de cookies | 0,20 s | 0,38 MiB | Leve; descricao de SEO ainda herdada da home. |
| Projeto ENIP, pagina interna antiga | 0,35 s | 0,28 MiB | Leve, mas contem texto de desenvolvimento. |
| Projeto Jornal Portuario, pagina interna antiga | 0,69 s | 0,28 MiB | Leve, mas contem texto de desenvolvimento. |
| Projeto Empreenda Sim, pagina interna antiga | 1,20 s | 5,99 MiB | Video pesado e texto de desenvolvimento. |

Nas 15 amostras mobile, o CLS inicial e apos os saltos de rolagem foi zero. Nao foram observados erros JavaScript, respostas de recursos HTTP 400 ou superiores, imagens concluidas quebradas ou rolagem horizontal indevida nas sessoes medidas. Tambem foram medidas quatro sessoes desktop: home, Dia da Mulher, ODS e Porto 360, sem erros JavaScript ou excesso horizontal.

Isso nao certifica todos os aparelhos, Safari real, todos os estados dos carrosseis ou toda a duracao de uma navegacao. Os tempos do maior texto visivel tambem nao significam que o video inteiro ja terminou de baixar.

## O que esta bom

- Paginas principais e cases acessiveis por HTTPS e retornando HTTP 200.
- Titulos de pagina, descricoes, idioma `pt-BR` e viewport configurados.
- Conteudo relevante presente no HTML, nao apenas dentro de videos ou canvas.
- Todas as imagens HTML examinadas possuem atributo `alt`; imagens decorativas podem corretamente usar `alt=""`. A qualidade de cada descricao nao e certificada pela simples presenca do atributo.
- Um H1 por pagina valida examinada.
- Layout estavel e responsividade sem excesso horizontal nas amostras.
- Paginas inexistentes retornam HTTP 404 com `noindex`.
- `/codigodeetica`, `/procedimentosdecompliance` e `/preview/documentos` redirecionam com HTTP 308 para `/documentos-institucionais`.
- Fontes servidas pelo proprio site e imagens principais passando pelo otimizador do Next.js.
- Ha controles de movimento reduzido e pausa de videos fora da tela. O fundo WebGL tambem e montado somente quando a secao se aproxima.

## O que precisa melhorar

### Prioridade 1: carregamento da home no celular

A transferencia registrada pelo Lighthouse na home foi de aproximadamente **6,12 MiB**. A amostra de navegador sem limitacao registrou 5,03 MiB nos primeiros segundos e 5,64 MiB depois dos saltos de rolagem; sao janelas e ferramentas diferentes, nao resultados contraditorios.

O arquivo `/midia/fundo-institucional.png` sozinho tem cerca de **1,86 MiB** e aparece entre os maiores recursos baixados. A Hero possui 240 frames por variante e inicia o carregamento do restante depois dos quadros criticos. As 28 logos da faixa tambem usam carregamento eager, mesmo estando abaixo da Hero.

Oportunidades para um ajuste futuro, preservando a aparencia:

1. Comprimir ou converter o fundo institucional para formato mais eficiente e comparar a qualidade visual antes/depois.
2. Rever o agendamento e o volume inicial dos frames; priorizar o necessario para a primeira tela e a rolagem proxima, sem prejudicar a suavidade.
3. Adiar logos e midias de secoes distantes ate perto de sua entrada na tela, mantendo os espacos reservados para nao deslocar o layout.
4. Investigar o custo de renderizacao e os bloqueios de processamento com uma gravacao de desempenho antes de alterar as animacoes.

O elemento identificado como LCP nas medicoes da home foi o **texto do aviso de cookies**. Isso nao prova que o banner seja a causa unica da lentidao: ele disputa processamento e rede com o restante da pagina. Nao recomendo remove-lo para melhorar artificialmente a nota; o correto e investigar o caminho de renderizacao.

### Prioridade 2: peso das midias dos cases

Beach Tennis merece atencao primeiro: mais de 7 MiB observados e LCP de 7 s no Lighthouse mobile. Porto 360, Liceu e Outubro Rosa tambem possuem volumes relevantes na primeira visita.

Rever compressao, resolucao efetivamente necessaria para a tela, qualidade visual, poster e politica de carregamento. A conversao vertical do Porto 360 nao e, sozinha, garantia de otimizacao; o arquivo mobile aprovado tem cerca de 2,71 MiB.

### Prioridade 3: endereco oficial e descoberta pelo Google

Nas 15 paginas validas examinadas:

- **Nenhuma publicou `rel="canonical"`.** Planejar qual e o endereco oficial de cada pagina e como os aliases da Vercel se relacionarao com o dominio final.
- **`/sitemap.xml` retorna 404.** Preparar um sitemap das paginas oficiais relevantes.
- **`/robots.txt` retorna 404.** Definir intencionalmente as regras e, quando adequado, apontar o sitemap.

A ausencia de robots.txt nao bloqueia automaticamente a indexacao; sitemap tambem nao e obrigatorio para todo site pequeno. Aqui sao pendencias recomendadas de organizacao tecnica, especialmente pela migracao de dominio, e nao prova de que o site seja invisivel no Google.

Referencias: [sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap) e [enderecos canonicos](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls).

### Prioridade 4: preservar os links antigos antes da troca do DNS

No novo site:

| Caminho antigo | Resultado final |
| --- | --- |
| `/sobre/` | 308 para `/sobre`, depois 404 |
| `/contato/` | 308 para `/contato`, depois 404 |
| `/blog/` | 308 para `/blog`, depois 404 |

Isso nao impede a navegacao atual por secoes. O risco e para links ja existentes quando o dominio antigo passar a servir o novo site. E necessario inventariar as URLs reais e mapear cada uma para conteudo equivalente; nao redirecionar tudo indiscriminadamente para a home.

O dominio sem `www` ainda entregou WordPress nesta coleta. A tentativa de consultar a variante `www` falhou neste ambiente, sem diagnostico conclusivo da causa. O comportamento final de dominio, HTTPS e redirecionamentos deve ser verificado no momento da migracao.

Referencia: [migracao com mudancas de URL](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes).

### Prioridade 5: paginas internas antigas dos projetos

As paginas `/projetos/enip`, `/projetos/jornal-portuario` e `/projetos/empreenda-sim` continuam publicas e indexaveis com o texto **"Esta e a estrutura inicial da pagina individual..."**.

Os cards da home ja apontam para os sites externos aprovados, mas isso nao remove as rotas internas antigas. Decidir se essas paginas serao completadas, redirecionadas para seus destinos equivalentes ou retiradas da indexacao, conforme o objetivo de cada projeto.

### Ajustes complementares

- Sete descricoes dos cases ultrapassam 300 caracteres porque reutilizam o resumo completo. Criar descricoes concisas e especificas para busca, sem alterar o texto editorial aprovado. Nao existe uma penalidade automatica apenas por superar esse numero.
- A politica de cookies herda a meta description da home; criar uma descricao propria.
- Nenhuma pagina valida examinada apresentou imagem Open Graph ou JSON-LD. Sao oportunidades de apresentacao em compartilhamentos e de descricao estruturada da empresa, nao requisitos universais para aparecer no Google.
- O Lighthouse indicou contraste insuficiente em cerca de 52 ocorrencias na home. Parte dos exemplos corresponde a texto ainda reduzido em opacidade pela animacao de entrada, fora da primeira tela. Conferir depois da revelacao antes de concluir que todos sejam defeitos permanentes.
- O link global "Pular para o conteudo" aponta para `#inicio`, mas esse ID nao foi encontrado nos nove cases e nas tres paginas internas de projetos. E um ajuste de acessibilidade, nao um impedimento geral de indexacao.

## O que nao foi confirmado

- Indexacao real, posicao no Google, palavras-chave e trafego organico: dependem de Search Console e dados de visitas.
- Aprovacao dos Core Web Vitals em usuarios reais: nao ha dados de campo nesta auditoria.
- Rapidez em todos os celulares e redes: foram usadas simulacoes de navegador, nao testes em aparelho fisico.
- Preservacao de todas as URLs do site antigo: foi feita uma amostra de caminhos, nao um inventario completo.
- Entrega de emails: nenhum formulario foi enviado.
- Conformidade juridica integral de cookies ou privacidade: a nota SEO nao certifica isso.

## Proxima etapa recomendada

**Otimizar primeiro a home mobile e o Beach Tennis; depois organizar canonical, sitemap e os redirecionamentos da migracao.** Isso pode ser feito sem redesenhar o site. Manter o site antigo e o DNS intactos ate aprovar o plano de migracao.

## Evidencias locais

- `reference/auditoria-site-2026-10-19.json`: verificacao de URLs, HTML, recursos e 19 amostras de navegador.
- `reference/lighthouse-home-mobile-2026-10-19.json`: primeira medicao exploratoria.
- `reference/lighthouse-home-mobile-repeticao-2-2026-10-19.json` e `reference/lighthouse-home-mobile-repeticao-3-2026-10-19.json`: repeticoes sequenciais.
- `reference/lighthouse-home-desktop-2026-10-19.json`: home desktop.
- `reference/lighthouse-beach-mobile-2026-10-19.json`: Beach Tennis mobile.
- `reference/lighthouse-ods-mobile-2026-10-19.json`: ODS mobile.
