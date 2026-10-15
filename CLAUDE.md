# site-wordcom

Projeto **Next.js**. Stack definida pelo dono do projeto; não propor outra sem ele pedir.

---

# PROTOCOLO OBRIGATÓRIO — classificar antes de criar ou alterar qualquer UI

**Gatilho:** qualquer pedido para criar o site, criar/alterar página, componente, seção,
layout, tipografia, cor, animação ou copy. Inclui "cria o site", "faz a home",
"ajusta o hero", "deixa mais bonito".

**Não escrever uma linha de código de UI antes de classificar a tarefa (Passo 1).**

## Passo 1 — Classificar a tarefa, depois ler só o que ela exige

O mundo visual deste site está commitado. O `craft-floor.md` é explícito na primeira
linha: *"a pinned brief or the committed visual world overrides anything here; your own
habit does not."* Logo a leitura é **condicional**, não obrigatória — ler o processo de
design greenfield para mexer numa cor é gatilho errado, não zelo.

| A tarefa é | Ler | Custo |
|---|---|---|
| **Ajuste em seção existente** (cor, espaço, texto, bug, responsivo) | nada além deste arquivo — o piso abaixo é completo | 0 |
| **Motion novo** | `skills/emilkowalski-skills/skills/animate/RECIPES.md` (os números; a doutrina do `SKILL.md` já está resumida aqui) | ~2,1k |
| **Primeiro componente de uma superfície** | `skills/emilkowalski-skills/skills/mobile-native/SKILL.md` | ~4,3k |
| **Superfície ou mundo visual novo** | protocolo integral: `.agents/skills/frontend-design/SKILL.md` + `craft-floor.md` + `impeccable/.../new-work.md` + **Passo 2** | ~19k |
| **Dúvida se um default do piso pode ser reconquistado pelo brief** | `craft-floor.md`, seção *Refuse* | ~1,1k |
| **Eixo específico em superfície nova** | `impeccable/.../reference/{layout,typeset,colorize,animate}.md` | conforme |

**Passo 2 vale só para a linha "superfície ou mundo visual novo".** Para ajuste em seção existente o
plano de design é o mundo já commitado; refazer o plano é reabrir decisão fechada.

`skills/NOTAS-ESTUDO.md` (4.164 tokens) é consulta **pontual por índice**, nunca leitura
integral — achar um número não justifica carregar o resumo inteiro:
```bash
grep -nE "^#{1,4} " skills/NOTAS-ESTUDO.md     # índice
sed -n '20,28p' skills/NOTAS-ESTUDO.md          # só o trecho
```

Instrumento de verificação: **medição numérica diagnostica, screenshot mostra o
resultado.** O `frontend-design` endossa screenshot ("a picture is worth 1000 tokens"),
mas neste projeto os defeitos que importaram só apareceram medidos — `gridTemplateColumns`
computado, largura real por `offsetWidth` (e não `getBoundingClientRect`, que em elemento
rotacionado devolve a caixa projetada), contraste composto camada por camada com alfa. E o
painel do browser congela o `requestAnimationFrame` quando está oculto, o que já produziu
leitura falsa aqui. Quando precisar de screenshot, rodar as checagens numa **única
renderização** em lote, não uma viagem por item (`craft-floor`, seção *Verify*).

Consulta sob demanda (ui-ux-pro-max, Python 3.13 instalado e testado):
```bash
python skills/ui-ux-pro-max-skill/.claude/skills/ui-ux-pro-max/scripts/search.py "<query>" --domain <ux|color|typography|landing|icons|chart>
python skills/ui-ux-pro-max-skill/.claude/skills/ui-ux-pro-max/scripts/search.py "<query>" --stack nextjs
```

## Passo 2 — Plano de design antes do código (só em superfície nova)

Produzir e mostrar ao usuário, antes de codar:
- **Color:** 4–6 hex nomeados
- **Type:** 1 ou 2 famílias e seus papéis (se 2, claramente distintas)
- **Layout:** conceito em uma frase + wireframe ASCII + alinhamento
- **Principles:** o que torna esta página única

Depois **revisar o plano contra o brief**: se eu chegaria no mesmo resultado partindo de um
prompt genérico parecido, é default — revisar e dizer o que mudou e por quê. Só então codar.

## Passo 3 — Hierarquia na hora do conflito

As skills se contradizem. Ordem de precedência:

1. **frontend-design + impeccable** → identidade, direção, piso de craft (concordam entre si)
2. **emilkowalski** → números de motion e interação (os mais precisos)
3. **ui-ux-pro-max** → checklist de cobertura (a11y, forms, nav, perf) e consulta de dados.
   **Nunca** como fonte de direção estética — o catálogo dela (glassmorphism, gradientes,
   grids de card, fontes Google populares) é exatamente o que as duas primeiras proíbem.
4. **framer-motion-skills** → referência de API apenas

Conflitos já mapeados e como resolver:
- **Curva/duração:** emilkowalski para UI funcional (`cubic-bezier(0.23,1,0.32,1)`, <300ms);
  impeccable para o momento autoral da landing (`cubic-bezier(0.16,1,0.3,1)`, até 500–800ms)
- **Propriedades:** `transform`/`opacity` como base; blur/mask/clip-path/shadow liberados
  no momento focal, limitados a regiões isoladas
- **API Motion:** usar `motion` (`motion/react`), não `framer-motion`; usar a string
  `transform` completa, não os atalhos `x`/`y` (não são hardware-accelerated)

---

# ORDEM DE EXECUÇÃO — ortogonal ao protocolo de UI

`graph-orchestrator` ([skills.sh](https://skills.sh/VineeTagarwaL-code/graph-engineering),
MIT) decide **em que ordem** o trabalho roda; as skills acima decidem **o que** construir.
Por isso ela **não entra na hierarquia do Passo 3** e não pode contrariar o piso de craft:
não opina sobre fonte, cor, motion, layout ou copy.

**Escopo global** — mora em `~/.claude/skills/graph-orchestrator`, não em `skills/` nem em
`.agents/skills/`. Vale para todo projeto, não só este. Não aparece nas tabelas acima
de propósito.

**Quando usar:** 10+ arquivos ou fontes, muitas subtarefas parecidas, plano que ia sair como
"primeiro X, depois Y, depois Z" com mais de ~4 passos, ou tentativa anterior que perdeu
detalhe no fim. **Quando não usar:** menos de ~6 subtarefas sem paralelismo real — faz o
audit de dependências de cabeça e segue, sem vestir uma corrente de DAG.

O que ela exige e vale lembrar fora dela:
- **A pergunta do audit:** "o passo B lê a *saída* de A, ou só os *mesmos insumos*?" Se é a
  segunda, não há aresta — o "depois" era narrativa.
- **Arestas escondidas:** dois nós escrevendo o mesmo arquivo, rate limit, troca de
  assinatura/schema, e qualquer coisa irreversível. Se não achar nenhuma, dizer isso
  explicitamente — silêncio aqui quase sempre significa que não foi checado.
- **Fan-in em camadas de 20–30 itens**, contando recebidos vs esperados e **nomeando os que
  faltaram** em vez de sintetizar sobre o buraco.
- **Verificação em contexto novo**, recebendo as fontes e não a síntese — crítica sobre
  resumo só concorda com o resumo.
- **Ação irreversível sempre inline e atrás de aprovação humana concreta**, nunca em
  subagente. Neste projeto isso cobre deploy, publicar e apagar mídia de `public/midia/`.

Nota de auditoria: o instalador marcou `Critical Risk` (Snyk). Verificado e descartado —
o repositório tem 9 arquivos, nenhum executável (sem `package.json`, lockfile, workflow ou
script), e os markdowns não têm rede nem `exec`/`eval`. O alarme é de vocabulário
(*deploy, delete, send, irreversible*), que a skill usa para **exigir trava**, não para agir.
Reavaliar se uma versão futura trouxer código.

---

# PISO (completo — substitui a leitura do craft-floor em tarefa de ajuste)

## Ban absoluto — nenhum brief reconquista

- **Eyebrow/kicker acima de título.** O craft-floor marca este como ban, não default:
  *"no brief earns it back"*. O título carrega o próprio peso.
- **Ausência de `prefers-reduced-motion`** e **`user-scalable=no`**. Acessibilidade, não
  gosto: tirar o zoom ou ignorar quem pediu menos movimento exclui gente.

## Defaults a recusar — o brief pode reconquistar

Estes são **defaults da categoria, não proibições**. O craft-floor: *"the brief's own words
can earn any of them."* Pegar um deles quando o eixo está livre significa que não houve
decisão. Mas quando o dono pede, ele pede — registrar a decisão em comentário no código e
seguir, sem discutir duas vezes.

Mecânica: `transition: all` · `scale(0)` como entrada · `ease-in` em UI · animar atalho de
teclado ou ação 100+×/dia · animar `width`/`height`/`margin`/`top`/`left` ·
`transform-origin: center` em popover (modal é exceção) · keyframes em elemento disparado
rapidamente · hover sem `@media (hover: hover) and (pointer: fine)` · `100vh` em app shell ·
`user-select: none` no `body`

Estrutura: grid de cards iguais ícone+título+texto como estrutura da página · cards aninhados ·
template hero-métrica · numeração 01/02/03 sem sequência real · **modal para tarefa que não
exige interrupção nem foco protegido** · texto em gradiente · glass/blur decorativo ·
`border-left` colorido >1px · `box-shadow: 4px 4px 0` fora de neobrutalismo real ·
sparkline/progress ring como conteúdo · mono como fantasia de "técnico" · emoji/unicode como
ícone · fonte de sistema como voz display · acentuar uma palavra do título · ALL CAPS em
label · `→` colado no texto de botão · ponto médio em meta (`A · B · C`) · `#0B0B0B`/`#111`
no lugar de preto

- **Máscara geométrica no lugar de contorno orgânico.** Círculo, polígono ou corte em
  radial-gradient aproximando a borda de um sujeito fotográfico é a versão barata e lê pior
  que omitir. Derivar matte alfa da imagem real, ou pedir o asset recortado.
- **Claro ou escuro escolhido por categoria.** Vem da cena de uso: quem, onde, sob que luz
  ambiente — não de "site de agência é escuro".

Estéticas "cara de IA" (quando o brief deixa o eixo livre): creme `#F4F1EA` + serifa display +
terracota `#D97757` · quase-preto + um neon · broadsheet com fios capilares · kit SaaS-card ·
fade-and-slide-up em toda seção + hover em todo card

Fontes default de training data a evitar: Fraunces, Playfair Display, Cormorant, Lora,
Crimson, Newsreader, Syne, Space Grotesk, Space Mono, IBM Plex, Inter-as-display, DM Sans,
DM Serif, Outfit, Plus Jakarta Sans, Instrument Sans.

## Obrigatório
Contraste 4.5:1 (3:1 texto grande e não-texto) · foco de teclado visível · alvo de toque
44×44pt (web: 24×24px CSS) · body 16px · medida 65–75ch (nunca >80) · escala de espaço 4/8 ·
`100dvh` app shell / `100svh` hero · `env(safe-area-inset-*)` com `viewport-fit=cover` ·
`theme-color` por esquema de cor · estados hover/disabled/loading/error/empty · sombra com
offset **e** blur · mais espaço acima do título que abaixo · tematizar superfícies do browser
(seleção, caret, scrollbar, focus ring, underline-offset, `tabular-nums`) · **um** momento
de motion autoral, não um por seção · saída mais rápida que entrada · stagger 30–80ms ·
display máx 6rem · piso de tracking −0.04em · headings balanceados (`text-wrap: balance`) ·
**em superfície colorida, texto secundário tinge do matiz ou da cor de frente — nunca cinza**

Cada item acima é checagem no **resultado construído**, não intenção: ler o valor computado.
Rodar todas na mesma renderização, em lote.

## Copy
Voz ativa, nome do usuário e não do sistema ("Salvar alterações", não "Enviar").
A ação mantém o nome no fluxo inteiro: botão "Publicar" → toast "Publicado".
Erro diz o que aconteceu e como corrigir, na voz da interface; não se desculpa, nunca é vago.
Tela vazia é convite para agir. Sentence case, sem enchimento.

## Cuidado técnico
Especificidade de CSS: seletor de tipo (`.section`) vs de elemento (`.cta`) se cancelam,
principalmente em `padding`/`margin` entre seções.

---

# Ambiente

- Node 24 / npm 11 · Python 3.13 (user scope) · git 2.56
- `skills/` = material de referência clonado (4 repos git aninhados) e `reference/` já
  estão no `.gitignore` — pendência resolvida. Manter assim: os 4 `.git` aninhados
  entrariam como submódulo quebrado se versionados.
- `.agents/skills/frontend-design` = instalada via `npx skills add`, com symlink p/ Claude Code
- **Pendente:** o engine binário do `impeccable` não foi baixado (precisa de OK do dono
  ou `npx impeccable install`). Sem ele, `critique`/`audit`/`detect`/`live` não rodam — as
  referências `.md` continuam valendo como doutrina aplicada manualmente.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
