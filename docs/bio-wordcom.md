# Página de links WordCom

Rota local: `/bio`. Página para visitantes do Instagram acessarem os cinco canais da agência.
Implementação em `src/app/bio/page.tsx`, estilos isolados em `bio.module.css`, e o fundo é
gerado por `scripts/gera-fundo-bio.py`.

## A marca é o fundo

O dono pediu que a logo ocupasse o fundo inteiro e entregou um banner 16:9 (1672x941).
O banner **não serve cru**, por duas razões medidas:

- o pior pixel dele tem luminância 1,0 — é o próprio wordmark branco. Texto `#f6f4f8`
  em cima dele daria 1,05:1;
- num celular, `background-size: cover` escala pela altura e corta na horizontal. O
  wordmark ocupa 65% da largura da arte, então ele sai cortado ao meio. Nenhuma
  `background-position` resolve: a palavra é larga demais.

Por isso o fundo é um **retrato gerado a partir do banner**: a marca inteira no alto,
ocupando 80% da largura, e a mesma noite estrelada descendo — pela faixa de baixo
espelhada, sem costura — até virar `#0a0710` chapado.

O degradê é um teto de luminância, não um ajuste de gosto: abaixo do lockup a imagem é
rebaixada até 0,045, de forma que o texto passe no contraste sobre o **pior** pixel e não
sobre o médio. A tela termina onde a cor já é chapada, e o `background-color` continua dali
para baixo; as bordas laterais também morrem na cor base. Por isso o mesmo arquivo serve em
qualquer largura sem mostrar emenda — em telas largas ele vira um palco de 540px centrado.

| Papel | Valor |
| --- | --- |
| Base | `#0a0710` |
| Texto | `#f6f4f8` |
| Apoio fora dos cartões | `#c9c2d6` (lavanda, nunca cinza) |
| Tinta sobre superfície clara | `#140f1c` |
| Fundo | `/marca/bio-fundo.webp`, 1080x975, 22 KB |
| Master da marca | `scripts/fonte/wordcom-banner.webp`, 55 KB, fora de `public/` |
| Largura do conteúdo | `416px` |

O script reporta que o conteúdo é seguro a partir de `0,658 × largura do fundo`; o CSS usa
`0,700`, com folga. Medido na página montada, o pior pixel atrás da frase dá 7,8:1, e atrás
dos cartões o campo já é cor chapada: 19,2:1.

## Os cartões

O comportamento veio da referência enviada pelo dono (`edu.koko.ag/links`): blocos de cor
chapada, canto reto, fio da própria cor, seta à direita, e o hover que escurece o bloco e
o levanta.

A primeira tentativa errou em duas frentes, e o dono chamou de feia com razão:

- os cartões tinham 70px, ícone à esquerda e título de 15px. Isso é um item de Linktree
  vestido de cor. A referência são blocos de 111 a 148px, **sem ícone**, com título grande
  e um parágrafo de verdade. O ícone saiu porque o título já diz "Instagram", "TikTok" —
  ele só roubava a largura de que o texto precisa;
- eu tinha escurecido cada cor de marca até o texto passar no contraste, e o resultado
  virou lama (`#a7366f`, `#a32a93` — magentas sem convicção). A referência acerta porque usa
  cor **cheia** (amarelo puro, azul puro) e resolve o contraste pela tinta, não baixando a
  cor.

Agora a saturação de cada bloco fica entre 0,67 e 1,00. Só o magenta levou um empurrão
mínimo rumo ao preto — que preserva matiz e saturação — porque com papel em cima dava
4,48:1, dois centésimos abaixo do piso.

As cores são as da WordCom: o gradiente da marca é `#7d00ff → #be3f80 → #ff7d00` e a pilha
o percorre, um passo por cartão, terminando no laranja puro no WhatsApp. Medidos em repouso
**e** no hover, que é onde bloco colorido costuma reprovar:

| Cartão | Cor | Hover | Título | No hover | Apoio | Saturação |
| --- | --- | --- | --- | --- | --- | --- |
| Nosso site | `#f4f2f6` | `#d6d3d8` | 16,93:1 | 12,71:1 | 6,05:1 | — |
| Instagram | `#7d00ff` | `#6e01e0` | 5,69:1 | 6,88:1 | 4,52:1 | 1,00 |
| TikTok | `#a426b3` | `#90229e` | 5,38:1 | 6,49:1 | 4,57:1 | 0,79 |
| Portfólio | `#b83d7c` | `#a1366e` | 4,72:1 | 5,78:1 | 4,55:1 | 0,67 |
| WhatsApp | `#ff7d00` | `#df6e02` | 7,34:1 | 5,71:1 | 5,80:1 | 1,00 |

Um bloco preto, como o da referência, foi testado e descartado: lá ele funciona porque o
fundo é papel; aqui mede 1,07:1 contra a base e some.

O destaque do site é o único bloco claro — o peso dele vem da inversão, não de cor, que foi
o pedido do dono ao tirar o laranja do destaque. Dentro de cada cartão o apoio é a tinta
misturada à cor do próprio cartão: o máximo de tingimento que ainda dá 4,5:1 nos dois
estados. Sobre superfície colorida, cinza neutro lê como falha de impressão.

A copy das descrições foi medida, não só escrita: todas fecham em duas linhas a 390px, e os
cinco cartões saem com 120px exatos. Descrição que vazava para a terceira linha deixava a
pilha irregular.

### Movimento

Verificado no computado, não só no CSS:

| | Valor |
| --- | --- |
| Entrada | 250 ms `cubic-bezier(0.23, 1, 0.32, 1)` |
| Saída | 160 ms, na regra base — saída mais rápida que entrada |
| Hover no bloco | `translateY(-2px)` e a cor escurecida |
| Hover na seta | `translateX(4px)` |
| Toque | `:active` volta a `translateY(0)` com a cor escurecida |

Só `transform` e `background-color` animam. `prefers-reduced-motion` desliga transição e
transform. O hover fica atrás de `@media (hover: hover) and (pointer: fine)` — abaixo de
768px o painel do navegador emula toque, então o teste de hover tem de rodar em largura de
desktop, ou o resultado é falso-negativo.

### A assinatura

"A última palavra em comunicação." é o `h1` **visível** da página, não mais um parágrafo
decorativo. A logo está no fundo, em imagem, então quem carrega a hierarquia é a frase.
Ela subiu de 27 para 40px no máximo do clamp, a pedido do dono — e porque, com a marca logo
acima, 27px ficava sendo legenda de imagem. O nome da marca entra como texto só para leitor
de tela, no começo do `h1`.

### O que não veio da referência

A referência põe um kicker em caixa alta acima de cada título (`CURSO · NO KAMPUS`). Isso é
ban absoluto no piso de craft deste projeto — o título carrega o próprio peso. Ficaram
título e descrição.

E a referência usa serifa nos títulos. Aqui não: a voz display deste site é a Montserrat,
que é o que combina com o wordmark geométrico da marca. Uma serifa brigaria com a logo que
está logo acima, no fundo. O peso editorial vem do tamanho e do espaço, não de outra
família.

## Ordem e destinos

Site (destaque), Instagram, TikTok, portfólio no YouTube, WhatsApp — a ordem pedida pelo
dono. Todos abrem em nova aba, com indicação para leitor de tela e foco visível. A mensagem
pré-preenchida do WhatsApp foi preservada.

A logo vive na camada de fundo, então o `h1` da página é texto para leitor de tela e a
frase de assinatura é `aria-hidden` — ela repete o que o `h1` já diz.

O espaçamento inferior reserva lugar para o aviso de cookies compartilhado do site. O
rodapé assina "Agência de publicidade e marketing 360º" — o descritor que aparece no banner
da marca, em texto e não embutido em imagem.

## Validação

TypeScript: `npx tsc --noEmit` passou. Medido em 390x844 (iPhone 14/15): os cinco cartões
com 120px exatos, página com 1333px — 251px de rolagem, com três cartões acima da dobra.
`scrollWidth - clientWidth` em 0. Hover conferido no valor computado em largura de desktop:
fundo `#7d00ff → #6e01e0`, bloco em `translateY(-2px)`, seta em `translateX(4px)`.

Nada publicado: depende do deploy do projeto. Em produção o link do perfil aponta para
`wordcom.com.br/bio`.

## Regenerar o fundo

```bash
python scripts/gera-fundo-bio.py
```

Lê `scripts/fonte/wordcom-banner.webp` e escreve `public/marca/bio-fundo.webp`. Ao final
imprime a partir de que fração da largura o conteúdo é seguro; se esse número subir acima
de `0,700`, o `padding-top` do `.page` precisa acompanhar.
