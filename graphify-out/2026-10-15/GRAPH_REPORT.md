# Graph Report - site-wordcom  (2026-10-13)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 329 nodes · 517 edges · 17 communities (16 shown, 1 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 12 edges (avg confidence: 0.85)
- Token cost: 33,274 input · 316 output

## Graph Freshness
- Built from commit: `f1e9c0d7`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Dependências e Config ESLint
- Páginas Institucionais e Legais
- Home e Seções da Landing
- Layout Raiz e Consentimento de Cookies
- Componentes Visuais WebGL e Carrosséis
- Manifesto de Frames Desktop
- API de Contato por Email
- Páginas Dinâmicas de Projetos
- Configuração TypeScript
- Engine de Scroll da Sequência Hero
- Dependências de Desenvolvimento
- Manifesto de Frames Mobile Polvo
- Manifesto de Frames Mobile Teste
- Acordeão de FAQs com Reveal
- Anel 3D de Soluções
- Cards Empilhados com GSAP
- Configuração PostCSS

## God Nodes (most connected - your core abstractions)
1. `react` - 23 edges
2. `next` - 21 edges
3. `HeroSequencia()` - 16 edges
4. `compilerOptions` - 16 edges
5. `Home()` - 15 edges
6. `EntradaScroll()` - 10 edges
7. `ConsentimentoCookies()` - 10 edges
8. `SolucoesAnel()` - 9 edges
9. `lucide-react` - 9 edges
10. `FAQs()` - 8 edges

## Surprising Connections (you probably didn't know these)
- `PoliticaDeCookies()` --calls--> `BotaoPreferenciasCookies()`  [EXTRACTED]
  src/app/politica-de-cookies/page.tsx → src/components/consentimento-cookies.tsx
- `Home()` --calls--> `FooterWordcom()`  [EXTRACTED]
  src/app/page.tsx → src/components/footer-wordcom.tsx
- `FooterWordcom()` --calls--> `EntradaScroll()`  [EXTRACTED]
  src/components/footer-wordcom.tsx → src/components/entrada-scroll.tsx
- `PaginaInstitucional()` --calls--> `FooterWordcom()`  [EXTRACTED]
  src/components/pagina-institucional.tsx → src/components/footer-wordcom.tsx
- `Home()` --calls--> `FAQs()`  [EXTRACTED]
  src/app/page.tsx → src/components/ui/text-reveal-faqs.tsx

## Import Cycles
- None detected.

## Communities (17 total, 1 thin omitted)

### Community 0 - "Dependências e Config ESLint"
Cohesion: 0.06
Nodes (33): eslintConfig, dependencies, gsap, lucide-react, motion, next, nodemailer, ogl (+25 more)

### Community 1 - "Páginas Institucionais e Legais"
Cohesion: 0.09
Nodes (16): nextConfig, lucide-react, motion, next, DocumentosInstitucionais(), metadata, metadata, PoliticaDeCookies() (+8 more)

### Community 2 - "Home e Seções da Landing"
Cohesion: 0.10
Nodes (25): clientes, eventos, Home(), metodo, projetos, servicos, setores, Case (+17 more)

### Community 3 - "Layout Raiz e Consentimento de Cookies"
Cohesion: 0.11
Nodes (23): metadata, montserrat, RootLayout(), viewport, ConsentimentoCookies(), abrir(), fechar(), salvar() (+15 more)

### Community 4 - "Componentes Visuais WebGL e Carrosséis"
Cohesion: 0.09
Nodes (14): ogl, react, cases, FundoOndas(), CENTROS, MarcaCliente, MarcasMarquee(), ICONES (+6 more)

### Community 5 - "Manifesto de Frames Desktop"
Cohesion: 0.07
Nodes (26): created, desktop, actual_count, avg_frame_bytes, resolution, total_bytes, total_mb, frames (+18 more)

### Community 6 - "API de Contato por Email"
Cohesion: 0.14
Nodes (17): nodemailer, maxDuration, permitirEnvio(), POST(), runtime, tentativas, Contato, DESTINATARIO_CONTATO (+9 more)

### Community 7 - "Páginas Dinâmicas de Projetos"
Cohesion: 0.13
Nodes (12): @radix-ui/react-accordion, PaginaProjeto(), Projeto, projetos, FundoVideo(), FundoVideoProps, categories, QuemSomos() (+4 more)

### Community 8 - "Configuração TypeScript"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 9 - "Engine de Scroll da Sequência Hero"
Cohesion: 0.36
Nodes (14): HeroSequencia(), atualizarCapitulos(), carregar(), carregarEmLotes(), construirLut(), desenhar(), iniciar(), maisProximoPronto() (+6 more)

### Community 10 - "Dependências de Desenvolvimento"
Cohesion: 0.17
Nodes (12): devDependencies, eslint, eslint-config-next, ffmpeg-static, ffprobe-static, tailwindcss, @tailwindcss/postcss, @types/node (+4 more)

### Community 11 - "Manifesto de Frames Mobile Polvo"
Cohesion: 0.18
Nodes (10): duration, format, fps, frameCount, namingPattern, purpose, quality, resolution (+2 more)

### Community 12 - "Manifesto de Frames Mobile Teste"
Cohesion: 0.18
Nodes (10): duration, format, fps, frameCount, namingPattern, purpose, quality, resolution (+2 more)

### Community 13 - "Acordeão de FAQs com Reveal"
Cohesion: 0.38
Nodes (9): Accordion, AccordionContent(), AccordionItem(), AccordionTrigger(), BlurredStagger(), FAQs(), getReducedMotionSnapshot(), SetorFAQ (+1 more)

### Community 14 - "Anel 3D de Soluções"
Cohesion: 0.33
Nodes (9): girarX(), girarY(), limitar(), projetar(), Props, saidaQuinta(), Servico, SolucoesAnel() (+1 more)

### Community 15 - "Cards Empilhados com GSAP"
Cohesion: 0.32
Nodes (6): gsap, Card(), CardProps, StackedCards(), cardData, CardItem

## Knowledge Gaps
- **11 isolated node(s):** `ffmpeg-static`, `ffprobe-static`, `react-dom`, `react-fast-marquee`, `tailwindcss` (+6 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 178 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `Páginas Institucionais e Legais` to `Dependências e Config ESLint`, `Home e Seções da Landing`, `Layout Raiz e Consentimento de Cookies`, `Componentes Visuais WebGL e Carrosséis`, `API de Contato por Email`, `Páginas Dinâmicas de Projetos`, `Anel 3D de Soluções`, `Cards Empilhados com GSAP`?**
  _High betweenness centrality (0.229) - this node is a cross-community bridge._
- **What connects `ffmpeg-static`, `ffprobe-static`, `react-dom` to the rest of the system?**
  _11 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Dependências e Config ESLint` be split into smaller, more focused modules?**
  _Cohesion score 0.058823529411764705 - nodes in this community are weakly interconnected._
- **Why does `react` connect `Componentes Visuais WebGL e Carrosséis` to `Dependências e Config ESLint`, `Páginas Institucionais e Legais`, `Home e Seções da Landing`, `Layout Raiz e Consentimento de Cookies`, `Páginas Dinâmicas de Projetos`, `Acordeão de FAQs com Reveal`, `Anel 3D de Soluções`, `Cards Empilhados com GSAP`?**
  _High betweenness centrality (0.168) - this node is a cross-community bridge._
- **Should `Páginas Institucionais e Legais` be split into smaller, more focused modules?**
  _Cohesion score 0.0928030303030303 - nodes in this community are weakly interconnected._
- **Why does `HeroSequencia()` connect `Engine de Scroll da Sequência Hero` to `Home e Seções da Landing`, `Componentes Visuais WebGL e Carrosséis`?**
  _High betweenness centrality (0.060) - this node is a cross-community bridge._
- **Should `Home e Seções da Landing` be split into smaller, more focused modules?**
  _Cohesion score 0.09659090909090909 - nodes in this community are weakly interconnected._