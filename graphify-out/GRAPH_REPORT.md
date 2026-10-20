# Graph Report - site-wordcom  (2026-10-15)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 431 nodes · 741 edges · 18 communities (17 shown, 1 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 26 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `f1e9c0d7`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- app/page.tsx
- next
- cases/[slug]/page.tsx
- package.json
- consentimento-cookies.tsx
- scroll-expansion-hero.tsx
- source
- route.ts
- carousel-circular-image-gallery.tsx
- compilerOptions
- beach-tennis-gallery.tsx
- HeroSequencia
- carousel.tsx
- dependencies
- mobile-polvo/manifest.json
- mobile-teste-20261009/manifest.json
- text-reveal-faqs.tsx
- postcss.config.mjs

## God Nodes (most connected - your core abstractions)
1. `react` - 35 edges
2. `next` - 31 edges
3. `Home()` - 16 edges
4. `HeroSequencia()` - 16 edges
5. `lucide-react` - 16 edges
6. `compilerOptions` - 16 edges
7. `motion` - 13 edges
8. `PaginaCase()` - 11 edges
9. `FundoVideo()` - 11 edges
10. `EntradaScroll()` - 10 edges

## Surprising Connections (you probably didn't know these)
- `Home()` --calls--> `CasesCoverflow()`  [EXTRACTED]
  src/app/page.tsx → src/components/cases-coverflow.tsx
- `Home()` --calls--> `EntradaScroll()`  [EXTRACTED]
  src/app/page.tsx → src/components/entrada-scroll.tsx
- `Home()` --calls--> `FooterWordcom()`  [EXTRACTED]
  src/app/page.tsx → src/components/footer-wordcom.tsx
- `Home()` --calls--> `FormularioContato()`  [EXTRACTED]
  src/app/page.tsx → src/components/formulario-contato.tsx
- `Home()` --calls--> `FundoVideo()`  [EXTRACTED]
  src/app/page.tsx → src/components/fundo-video.tsx

## Import Cycles
- None detected.

## Communities (18 total, 1 thin omitted)

### Community 0 - "app/page.tsx"
Cohesion: 0.05
Nodes (41): ogl, react, clientes, eventos, Home(), metodo, projetos, servicos (+33 more)

### Community 1 - "next"
Cohesion: 0.07
Nodes (27): nextConfig, lucide-react, motion, next, DocumentosInstitucionais(), metadata, metadata, PoliticaDeCookies() (+19 more)

### Community 2 - "cases/[slug]/page.tsx"
Cohesion: 0.07
Nodes (22): Case, cases, Numero, PaginaCase(), DiaDaMulherGallery(), MarcaCliente, MarcasMarquee(), OdsGallery() (+14 more)

### Community 3 - "package.json"
Cohesion: 0.05
Nodes (36): eslintConfig, devDependencies, eslint, eslint-config-next, ffmpeg-static, ffprobe-static, tailwindcss, @tailwindcss/postcss (+28 more)

### Community 4 - "consentimento-cookies.tsx"
Cohesion: 0.11
Nodes (23): metadata, montserrat, RootLayout(), viewport, ConsentimentoCookies(), abrir(), fechar(), salvar() (+15 more)

### Community 5 - "scroll-expansion-hero.tsx"
Cohesion: 0.10
Nodes (17): @radix-ui/react-accordion, PaginaProjeto(), Projeto, projetos, FundoVideo(), FundoVideoProps, categories, QuemSomos() (+9 more)

### Community 6 - "source"
Cohesion: 0.07
Nodes (26): created, desktop, actual_count, avg_frame_bytes, resolution, total_bytes, total_mb, frames (+18 more)

### Community 7 - "route.ts"
Cohesion: 0.14
Nodes (17): nodemailer, maxDuration, permitirEnvio(), POST(), runtime, tentativas, Contato, DESTINATARIO_CONTATO (+9 more)

### Community 8 - "carousel-circular-image-gallery.tsx"
Cohesion: 0.15
Nodes (15): gsap, images, CircularGalleryImage, clientSnapshot(), GallerySlide(), ImageGallery(), Position, serverSnapshot() (+7 more)

### Community 9 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 10 - "beach-tennis-gallery.tsx"
Cohesion: 0.21
Nodes (13): BeachTennisGallery(), compactSnapshot(), photos, serverSnapshot(), subscribeCompact(), ContainerAnimated, ContainerScroll(), ContainerStagger (+5 more)

### Community 11 - "HeroSequencia"
Cohesion: 0.29
Nodes (15): CENTROS, HeroSequencia(), atualizarCapitulos(), carregar(), carregarEmLotes(), construirLut(), desenhar(), iniciar() (+7 more)

### Community 12 - "carousel.tsx"
Cohesion: 0.29
Nodes (11): EncontroRegionalGallery(), photos, Carousel(), CarouselContent(), CarouselContext, CarouselNext(), CarouselPagination(), CarouselPrev() (+3 more)

### Community 13 - "dependencies"
Cohesion: 0.15
Nodes (13): dependencies, embla-carousel, embla-carousel-react, gsap, lucide-react, motion, next, nodemailer (+5 more)

### Community 14 - "mobile-polvo/manifest.json"
Cohesion: 0.18
Nodes (10): duration, format, fps, frameCount, namingPattern, purpose, quality, resolution (+2 more)

### Community 15 - "mobile-teste-20261009/manifest.json"
Cohesion: 0.18
Nodes (10): duration, format, fps, frameCount, namingPattern, purpose, quality, resolution (+2 more)

### Community 16 - "text-reveal-faqs.tsx"
Cohesion: 0.38
Nodes (9): Accordion, AccordionContent(), AccordionItem(), AccordionTrigger(), BlurredStagger(), FAQs(), getReducedMotionSnapshot(), SetorFAQ (+1 more)

## Knowledge Gaps
- **11 isolated node(s):** `ffmpeg-static`, `ffprobe-static`, `react-dom`, `react-fast-marquee`, `tailwindcss` (+6 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 216 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `next` to `app/page.tsx`, `cases/[slug]/page.tsx`, `package.json`, `consentimento-cookies.tsx`, `scroll-expansion-hero.tsx`, `route.ts`, `carousel-circular-image-gallery.tsx`, `beach-tennis-gallery.tsx`, `carousel.tsx`?**
  _High betweenness centrality (0.247) - this node is a cross-community bridge._
- **What connects `ffmpeg-static`, `ffprobe-static`, `react-dom` to the rest of the system?**
  _11 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `app/page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.05480225988700565 - nodes in this community are weakly interconnected._
- **Why does `react` connect `app/page.tsx` to `next`, `cases/[slug]/page.tsx`, `package.json`, `consentimento-cookies.tsx`, `scroll-expansion-hero.tsx`, `carousel-circular-image-gallery.tsx`, `beach-tennis-gallery.tsx`, `HeroSequencia`, `carousel.tsx`, `text-reveal-faqs.tsx`?**
  _High betweenness centrality (0.223) - this node is a cross-community bridge._
- **Should `next` be split into smaller, more focused modules?**
  _Cohesion score 0.07188160676532769 - nodes in this community are weakly interconnected._
- **Why does `HeroSequencia()` connect `HeroSequencia` to `app/page.tsx`?**
  _High betweenness centrality (0.049) - this node is a cross-community bridge._
- **Should `cases/[slug]/page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.06755260243632337 - nodes in this community are weakly interconnected._