import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FundoVideo } from "@/components/fundo-video";
import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";
import { BeachTennisGallery } from "@/components/beach-tennis-gallery";
import { ExpandableGallery, type GalleryImage } from "@/components/ui/gallery-animation";
import { YouTubeEmbed } from "@/components/ui/youtube-embed";
import { EncontroRegionalGallery } from "@/components/encontro-regional-gallery";
import { GloboplayCard } from "@/components/ui/globoplay-card";
import { VoltarAosCases } from "@/components/voltar-aos-cases";
import { OdsGallery } from "@/components/ods-gallery";
import { IPhoneVideo } from "@/components/ui/iphone";
import { DiaDaMulherGallery } from "@/components/dia-da-mulher-gallery";

/* Páginas individuais dos cases de campanha (cards 4 a 12 do carrossel).

   Todo o conteúdo abaixo foi extraído das páginas do site atual da WordCom —
   um link por case, informado pelo dono. Nada aqui é inferido: onde a fonte
   não declara um dado (objetivo, número, período), o campo simplesmente não
   existe e o bloco correspondente não é renderizado.

   O texto é curto de propósito. O pedido foi "objetiva e clara", com o mais
   relevante de cada fonte, sem parede de texto.

   IMAGENS: entram depois. Cada case declara quantos espaços de imagem tem e
   a legenda de cada um; enquanto o arquivo não existir, o espaço aparece
   marcado para revisão. O caminho esperado é /cases/paginas/<slug>/<n>.png */

type Numero = { valor: string; rotulo: string };

type Case = {
  nome: string;
  cliente?: string;
  ano?: string;
  resumo: string;
  textoDetalhado?: ReactNode;
  destaqueResumo?: string;
  heroSomenteVideo?: boolean;
  heroExpansao?: boolean;
  imagemHero?: string;
  preencherImagemHero?: boolean;
  proporcaoImagemHero?: number;
  proporcaoImagemHeroMobile?: number;
  ocultarTituloHero?: boolean;
  fundoHero?: string;
  linhasTituloHero?: [string, string];
  destaqueTituloHero?: 0 | 1;
  youtubeVideoId?: string;
  videoCelular?: { src: string; poster: string; title: string };
  globoplayVideos?: { href: string; title: string; posterSrc: string }[];
  desafio?: string;
  entregas: string[];
  destaques?: { titulo: string; texto: string }[];
  numeros?: Numero[];
  canais?: string[];
  citacao?: string;
  imagens: string[];
  galeria?: GalleryImage[];
  /* Vídeo de fundo do hero — entra atrás do título.

     Enquanto não existir, o brilho da marca segura o fundo sozinho, então a
     página não fica quebrada esperando o arquivo. Para ligar, basta apontar:
       video: "/cases/paginas/<slug>/hero.mp4"
       posterVideo: "/cases/paginas/<slug>/hero-poster.webp"
     O poster é o quadro que aparece antes do vídeo carregar e para quem
     pediu menos movimento. */
  video?: string;
  posterVideo?: string;
  videoMobile?: { src: string; poster: string };
};

const cases: Record<string, Case> = {
  "liceu-sao-paulo": {
    nome: "Liceu São Paulo",
    heroExpansao: true,
    video: "/cases/LiceuSaoPaulo/hero.mp4",
    posterVideo: "/cases/LiceuSaoPaulo/hero-poster.webp",
    fundoHero: "/cases/campanhas/liceu-sao-paulo.png",
    linhasTituloHero: ["Liceu", "São Paulo"],
    videoCelular: {
      src: "/cases/LiceuSaoPaulo/matriculas.mp4",
      poster: "/cases/LiceuSaoPaulo/matriculas-poster.webp",
      title: "Campanha O futuro é hoje! - Liceu São Paulo",
    },
    cliente: "Liceu São Paulo",
    resumo: "No início de cada ano letivo a “briga” entre as escolas por mais matrículas sempre é acirrada. Aqui, usando como inspiração o mote do cliente (Formando o futuro todo dia!), usamos a insinuação de que se deve pensar no futuro hoje. Garantir sua matrícula para o ano que vem tem que ser uma ação feita antes de o ano terminar. Pulverizando a campanha por totens, Redes Sociais e até uma landing page, a WordCom conseguiu converter algumas matrículas a mais para a escola.",
    textoDetalhado: <>
      <div className="casePagFicha">
        <h2>Campanha: O futuro é hoje!</h2>
        <h2>Cliente: Liceu São Paulo</h2>
      </div>
      <p>No início de cada ano letivo a “briga” entre as escolas por mais matrículas sempre é acirrada. Aqui, usando como inspiração o mote do cliente (Formando o futuro todo dia!), usamos a insinuação de que se deve pensar no futuro hoje. Garantir sua matrícula para o ano que vem tem que ser uma ação feita antes de o ano terminar. Pulverizando a campanha por totens, Redes Sociais e até uma landing page, a WordCom conseguiu converter algumas matrículas a mais para a escola.</p>
    </>,
    entregas: [],
    imagens: [],
  },

  "tudo-bem": {
    nome: "Tudo Bem",
    heroExpansao: true,
    imagemHero: "/cases/TudoBem/hero-logo.png",
    preencherImagemHero: true,
    proporcaoImagemHero: 1598 / 984,
    fundoHero: "/cases/TudoBem/fundo-hero.png",
    youtubeVideoId: "NIY_XNiY90M",
    linhasTituloHero: ["Tudo", "Bem"],
    ocultarTituloHero: true,
    cliente: "TV Thati Band Litoral (afiliada da Band em Santos)",
    resumo: "“Tudo Bem” é uma revista semanal eletrônica com 30 minutos de produção e que aborda vários aspectos da qualidade de vida.",
    textoDetalhado: <>
      <div className="casePagFicha">
        <h2>Produto: Tudo Bem</h2>
        <h2>Cliente: TV Thati Band Litoral (afiliada da Band em Santos)</h2>
      </div>
      <p>“Tudo Bem” é uma revista semanal eletrônica com 30 minutos de produção e que aborda vários aspectos da qualidade de vida. Saúde, alimentação, comportamento, entretenimento, pets, psicologia e tantos outros assuntos que podem ser abordados sob o aspecto de trazer mais qualidade de vida para as pessoas de maneira geral, serão desenvolvidos em matérias leves, descontraídas e com muita informação.</p>
      <p>Usando o formato de reportagens com entrevistas, conduzidas pela própria apresentadora do programa, “Tudo Bem” vai usar algumas seções fixas que vão se alternar a cada edição de assuntos recorrentes. Por exemplo, as seções “Orelha e Capa Dura”, com dicas de leitura e “Dica Pet!”, com matérias sobre pet.</p>
      <p>Além disso, o programa quer despertar nos telespectadores a vontade de se cuidar mais, de ter mais atenção para com o próprio corpo e a mente. No entanto, o “Tudo Bem” não é um programa de saúde e nem voltado, exclusivamente, para o público da terceira idade – embora, muitas vezes, vá dialogar diretamente com esse target – , mas é dirigido a todos e todas que queiram ter mais informação de maneira leve aos finais de semana.</p>
      <p>Confira ao lado um de nossos programas.</p>
    </>,
    entregas: [],
    imagens: [],
  },

  "vai-nessa": {
    nome: "Vai Nessa",
    heroExpansao: true,
    imagemHero: "/cases/VaiNessa/hero-logo.png",
    proporcaoImagemHeroMobile: 1376 / 1143,
    fundoHero: "/cases/VaiNessa/fundo-hero.png",
    linhasTituloHero: ["Vai", "Nessa"],
    ocultarTituloHero: true,
    globoplayVideos: [
      { href: "https://globoplay.globo.com/v/10799450/?s=0s", title: "Vai Nessa - Edição de 30/07/2022", posterSrc: "/cases/VaiNessa/entrevista-veleiro.png" },
      { href: "https://globoplay.globo.com/v/10783085/?s=0s", title: "Vai Nessa - Edição de 23/07/2022", posterSrc: "/cases/VaiNessa/conversa-drift.png" },
    ],
    cliente: "TV Tribuna (afiliada da Rede Globo em Santos)",
    resumo:
      "Desta vez o desafio era criar um programa de TV que fosse leve, descontraído e, ao mesmo tempo, informativo para ocupar o espaço local na grade da Rede Globo, sábado à tarde, depois do Jornal Hoje. Convidamos a jornalista e apresentadora Vanessa Martins, com boa identificação regional para chefiar a atração. Numa brincadeira com seu nome, batizamos o programa de Vai Nessa.",
    textoDetalhado: <>
      <div className="casePagFicha">
        <h2>Produto: Vai Nessa!</h2>
        <h2>Cliente: TV Tribuna (afiliada da Rede Globo em Santos)</h2>
      </div>
      <p>Desta vez o desafio era criar um programa de TV que fosse leve, descontraído e, ao mesmo tempo, informativo para ocupar o espaço local na grade da Rede Globo, sábado à tarde, depois do Jornal Hoje. Convidamos a jornalista e apresentadora Vanessa Martins, com boa identificação regional para chefiar a atração. Numa brincadeira com seu nome, batizamos o programa de Vai Nessa.</p>
      <p>Logo na primeira edição, o produto se mostrou um enorme sucesso com largas possibilidades comerciais. Através da WordCom Produtora, fizemos a criação, captação, produção, edição, direção e pós-produção do programa. Ficamos responsáveis pelas primeiras temporadas e, atualmente, a atração segue seu próprio caminho. Uma demonstração da capacidade de criação de conteúdo de qualidade da WordCom.</p>
    </>,
    entregas: [],
    imagens: [],
  },

  "porto-360": {
    nome: "Porto360",
    heroExpansao: true,
    video: "/cases/Porto360/hero.mp4",
    posterVideo: "/cases/Porto360/hero-poster.webp",
    videoMobile: { src: "/cases/Porto360/hero-mobile.mp4", poster: "/cases/Porto360/hero-mobile-poster.webp" },
    fundoHero: "/cases/Porto360/fundo-hero.png",
    linhasTituloHero: ["Porto", "360"],
    destaqueTituloHero: 1,
    globoplayVideos: [
      { href: "https://globoplay.globo.com/v/10118512/?s=0s", title: "Porto 360º — Edição de 11/12/2021", posterSrc: "/cases/Porto360/terminal-itajai.png" },
      { href: "https://globoplay.globo.com/v/10138891/?s=0s", title: "Porto 360º — Edição de 18/12/2021", posterSrc: "/cases/Porto360/navio-tanque.png" },
    ],
    cliente: "TV Tribuna",
    resumo:
      "Aqui, o desafio da WordCom foi pegar um produto que já existia e dar-lhe uma nova dinâmica. Levado ao ar como um programa semanal somente com temáticas sobre o maior porto da América Latina, o Porto de Santos, o “Porto 360º” é apresentado pelo jornalista Maxwell Rodrigues. A WordCom modificou a estrutura do programa, apostando mais em matérias jornalísticas e menos exposição do apresentador. Acreditamos que nossa breve passagem pela atração tenha dado bons frutos e deixado um legado seguido até hoje.",
    entregas: [],
    imagens: [],
  },

  "dia-da-mulher": {
    nome: "Dia Internacional da Mulher",
    heroExpansao: true,
    imagemHero: "/cases/DiaDaMulher/hero-homenagem.png",
    proporcaoImagemHeroMobile: 1,
    preencherImagemHero: true,
    fundoHero: "/cases/DiaDaMulher/fundo-hero.png",
    linhasTituloHero: ["Dia Internacional", "da Mulher"],
    youtubeVideoId: "ahAEXPmOkIw",
    cliente: "Piacentini do Brasil",
    ano: "2022",
    resumo:
      "Para esta campanha, criamos um mote em cima do slogan do cliente (Construindo desafios!): “Ser mulher é construir sua liberdade todos os dias!”. Também desenvolvemos uma identidade visual específica, usando a imagem das várias colaboradoras da empresa. Uma campanha que fez muito sucesso junto ao cliente e nas redes sociais.",
    entregas: [],
    imagens: [],
  },

  "beach-tennis": {
    nome: "Iº Torneio Beach Tennis WordCom",
    resumo:
      "A WordCom Publicidade criou a identidade visual, planejou e divulgou o Iº Torneio Beach Tennis Wordcom Praia Grande. Nesta primeira edição, o torneio foi limitado a 100 participantes, separados em três categorias: B, C e Iniciante; divididas entre masculino, feminina e mista. Tivemos 114 inscrições, 98 participantes, quase 100 jogos disputados, um público estimado em mais de mil pessoas e um alcance de mídia de mais de 1 milhão de pessoas.",
    destaqueResumo: "Iº Torneio Beach Tennis Wordcom Praia Grande",
    heroSomenteVideo: true,
    entregas: [],
    imagens: [],
    video: "/cases/BeachTennis/Create_professional_event_video_1080p_20261014111658.mp4",
    posterVideo: "/cases/BeachTennis/hero-poster.webp",
  },

  "outubro-rosa": {
    nome: "Outubro Rosa",
    heroExpansao: true,
    video: "/cases/OutubroRosa/hero.mp4",
    posterVideo: "/cases/OutubroRosa/hero-poster.webp",
    fundoHero: "/cases/OutubroRosa/fundo-rosa-elegante.png",
    linhasTituloHero: ["Outubro", "Rosa"],
    destaqueTituloHero: 1,
    youtubeVideoId: "IZTIGQzl-EU",
    cliente: "Piacentini do Brasil",
    ano: "2022",
    resumo:
      "Para alertar sobre a importância da prevenção ao câncer de mama, dentro da campanha nacional do Outubro Rosa, criamos a campanha “Chegou a época do ano de vestir rosa…”. Utilizando comunicação direta em forma de e-mail Marketing e por Whatsapp, chamamos a atenção para o autoexame e outras medidas preventivas.",
    entregas: [],
    imagens: [],
    galeria: [
      { src: "/cases/OutubroRosa/cartaz-1.jpg", alt: "Cartaz da campanha Outubro Rosa da Piacentini do Brasil", width: 1158, height: 1637 },
      { src: "/cases/OutubroRosa/post.jpg", alt: "Post da campanha Outubro Rosa da Piacentini do Brasil", width: 1080, height: 1080 },
      { src: "/cases/OutubroRosa/Prancheta-4-copy-4.png", alt: "Peça horizontal da campanha Outubro Rosa da Piacentini do Brasil", width: 1920, height: 1080 },
    ],
  },

  "encontro-regional": {
    nome: "Iº Encontro Regional Indústria Porto",
    heroExpansao: true,
    imagemHero: "/cases/EncontroRegional/logo-2022.png",
    proporcaoImagemHeroMobile: 1774 / 887,
    fundoHero: "/cases/EncontroRegional/fundo-hero.png",
    linhasTituloHero: ["Iº Encontro Regional", "Indústria Porto"],
    youtubeVideoId: "B0OHTT04UGc",
    resumo:
      "Criado a partir de uma iniciativa de André Ursini, CEO da WordCom Brasil, o Iº Encontro Regional Indústria Porto nasceu com o propósito de aproximar indústria, setor portuário, especialistas e lideranças, promovendo discussões sobre os desafios e oportunidades de uma das regiões mais estratégicas para a economia brasileira.",
    textoDetalhado: <>
      <h2>Iº Encontro Regional Indústria Porto</h2>
      <p>Criado a partir de uma iniciativa de <strong>André Ursini, CEO da WordCom Brasil</strong>, o Iº Encontro Regional Indústria Porto nasceu com o propósito de aproximar <strong>indústria, setor portuário, especialistas e lideranças</strong>, promovendo discussões sobre os desafios e oportunidades de uma das regiões mais estratégicas para a economia brasileira.</p>
      <p>Realizado na Baixada Santista, o encontro colocou em pauta temas como <strong>investimentos, inovação, desenvolvimento regional e integração com o cenário econômico global</strong>, considerando a importância do Porto de Santos e do polo industrial da região.</p>
      <p>Para garantir profundidade ao conteúdo, o projeto contou com uma <strong>Comissão Técnica formada por profissionais ligados aos setores portuário, industrial, acadêmico e institucional</strong>, além da participação de especialistas convidados.</p>
      <p>A <strong>WordCom Brasil foi responsável pela estrutura de comunicação e divulgação do projeto</strong>, incluindo o desenvolvimento da presença digital e do site utilizado para as inscrições do evento.</p>
    </>,
    entregas: [],
    imagens: [],
  },

  "ods-baixada-santista": {
    nome: "1º Seminário de ODS da Baixada Santista",
    heroExpansao: true,
    video: "/cases/ODS/hero.mp4",
    posterVideo: "/cases/ODS/hero-poster.webp",
    videoMobile: { src: "/cases/ODS/hero-mobile.mp4", poster: "/cases/ODS/hero-mobile-poster.webp" },
    fundoHero: "/cases/ODS/fundo-hero.jpg",
    linhasTituloHero: ["1º Seminário de ODS", "da Baixada Santista"],
    resumo:
      "O 1° Seminário de ODS da Baixada Santista discutiu as principais tendências e desafios de aplicação dos Objetivos de Desenvolvimento Sustentável na Região da Baixada Santista.",
    textoDetalhado: <div className="casePagOdsTexto">
      <h2>1° Seminário de ODS da Baixada Santista</h2>
      <p>Em uma iniciativa da Universidade Católica de Santos e da TV Thathi Band Litoral, foi realizado o 1° Seminário de ODS da Baixada Santista. O evento, que contou com o apoio do Sebrae e da Prefeitura Municipal de Santos, discutiu as principais tendências e desafios de aplicação dos Objetivos de Desenvolvimento Sustentável na Região da Baixada Santista, com apresentação de painéis do poder público e da iniciativa privada que servirão de modelo para a sociedade avançar nas questões de Sustentabilidade nos últimos anos.</p>
      <p>O Seminário reuniu especialistas do poder público e da iniciativa privada que apresentaram iniciativas bem-sucedidas relacionadas ao tema, bem como discutiram os desafios dos últimos anos dentro do contexto da Região da Baixada Santista e como envolver os diversos stakeholders no caminho dos 17 ODS propostos pela ONU.</p>
      <h3>PRINCIPAIS TEMAS ABORDADOS NO EVENTO:</h3>
      <ul className="casePagLista">
        <li>Indústria, inovação e infraestrutura com trabalho descente e crescimento econômico;</li>
        <li>Igualdade de gênero e Redução das desigualdades;</li>
        <li>Energia Limpa e acessível e ação contra a mudança global do clima;</li>
        <li>Cidades e comunidades sustentáveis;</li>
        <li>Erradicação da Pobreza e Fome Zero;</li>
        <li>Saúde e Bem-estar e o consumo e produção responsáveis;</li>
        <li>Educação de Qualidade;</li>
        <li>Água potável, saneamento e vida na água.</li>
      </ul>
      <h3>FORMATO DO EVENTO</h3>
      <p>O evento foi realizado presencialmente no auditório principal da Unisantos em Santos no formato de painéis de 1h30 com intervalo de 10 minutos entre um e outro debate. Os participantes fizeram suas apresentações em painéis temáticos com duração de 15 minutos para cada, com 04 participantes, e após as explanações individuais foi realizado o debate com perguntas do público sempre mediado por um professor da Unisantos.</p>
    </div>,
    entregas: [],
    imagens: [],
  },
};

export function generateStaticParams() {
  return Object.keys(cases).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = cases[slug];
  if (!c) return {};
  return {
    title: `${c.nome} — Case WordCom`,
    description: c.resumo || undefined,
    openGraph: {
      title: `${c.nome} — Case WordCom`,
      description: c.resumo || undefined,
      locale: "pt_BR",
      type: "article",
    },
  };
}

export default async function PaginaCase({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = cases[slug];
  if (!c) notFound();

  const preservarMidiaMobile = slug === "vai-nessa";
  const composicaoImagemMobile = slug === "encontro-regional" ? "light" : ["dia-da-mulher", "tudo-bem"].includes(slug) ? "original" : undefined;

  const contexto = [c.cliente, c.ano].filter(Boolean).join(" · ");
  const inicioDestaque = c.destaqueResumo ? c.resumo.indexOf(c.destaqueResumo) : -1;
  const resumo = c.destaqueResumo && inicioDestaque >= 0 ? (
    <>
      {c.resumo.slice(0, inicioDestaque)}
      <strong>{c.destaqueResumo}</strong>
      {c.resumo.slice(inicioDestaque + c.destaqueResumo.length)}
    </>
  ) : c.resumo;

  return (
    <main className={`product casePag${slug === "beach-tennis" ? " casePagBeach" : slug === "outubro-rosa" ? " casePagOutubro" : slug === "encontro-regional" ? " casePagEncontro" : slug === "porto-360" ? " casePagPorto" : slug === "dia-da-mulher" ? " casePagMulher" : slug === "vai-nessa" ? " casePagVai" : slug === "ods-baixada-santista" ? " casePagOds" : slug === "tudo-bem" ? " casePagTudoBem" : slug === "liceu-sao-paulo" ? " casePagLiceu" : ""}`}>
      {/* mesmo cabeçalho das páginas de projeto */}
      <header className="nav">
        <Link href="/">
          <Image src="/marca/wordcom-logo.png" alt="WordCom" width={135} height={56} priority />
        </Link>
        <Link href={`/?case=${encodeURIComponent(slug)}#cases`} className="under" aria-label="Voltar ao site">
          Voltar ao site ←
        </Link>
      </header>

      {/* Hero igual ao do Empreenda Sim: o vídeo roda ao fundo sob a camada
          de contraste. Sem vídeo, entra o brilho da marca — exatamente o que
          a página de projetos faz nos slugs que ainda não têm filme. */}
      {c.heroExpansao && c.imagemHero && c.fundoHero && c.linhasTituloHero ? (
        <ScrollExpandMedia mediaType="image" mediaSrc={c.imagemHero} bgImageSrc={c.fundoHero}
          title={c.nome} titleLines={c.linhasTituloHero} imageFit={c.preencherImagemHero ? "cover" : "contain"} imageAspectRatio={c.proporcaoImagemHero} mobileImageAspectRatio={composicaoImagemMobile ? 9 / 16 : c.proporcaoImagemHeroMobile} mobileImageComposition={composicaoImagemMobile} preserveMobileMedia={preservarMidiaMobile} hideTitle={c.ocultarTituloHero} />
      ) : (c.heroSomenteVideo || c.heroExpansao) && c.video && c.posterVideo ? (
        <ScrollExpandMedia
          mediaSrc={c.video}
          posterSrc={c.posterVideo}
          bgImageSrc={c.fundoHero ?? "/cases/BeachTennis/trofeus-beach-tennis.png"}
          title={c.nome}
          titleLines={c.linhasTituloHero ?? ["Iº Torneio", "Beach Tennis WordCom"]}
          highlightLine={c.destaqueTituloHero}
          mobileVideo={c.videoMobile}
          mobileImageAspectRatio={c.videoMobile ? 9 / 16 : undefined}
          preserveMobileMedia={preservarMidiaMobile}
        />
      ) : <section className={`productHero${c.video ? " productHeroVideo" : ""}`}>
        {c.video ? (
          <FundoVideo
            src={c.video}
            poster={c.posterVideo}
            className="productBackgroundVideo"
          />
        ) : (
          <div className="glow productGlow" aria-hidden />
        )}
        {!c.heroSomenteVideo ? <>
        <h1>{c.nome}</h1>
        {contexto ? <p className="casePagContexto">{contexto}</p> : null}
        <p>{resumo}</p>
        <a href="#conheca" className="btn" aria-label={`Ver o case ${c.nome}`}>
          Ver o case ↓
        </a>
        </> : null}
      </section>}

      <div className={`casePagContent${slug === "beach-tennis" ? " casePagBeachContent" : slug === "outubro-rosa" ? " casePagOutubroContent" : slug === "encontro-regional" ? " casePagEncontroContent" : slug === "porto-360" ? " casePagPortoContent" : slug === "dia-da-mulher" ? " casePagMulherContent" : slug === "vai-nessa" ? " casePagVaiContent" : slug === "ods-baixada-santista" ? " casePagOdsContent" : slug === "tudo-bem" ? " casePagTudoBemContent" : slug === "liceu-sao-paulo" ? " casePagLiceuContent" : ""}`}>
      <article id="conheca">
        {(c.heroSomenteVideo || c.heroExpansao) && (c.resumo || c.textoDetalhado) ? (
          <section className="casePagBloco casePagIntroducao">
            <div className="casePagIntroducaoTexto">
            {slug === "outubro-rosa" || slug === "dia-da-mulher" ? <div className="casePagFicha">
              <h2>Cliente: {c.cliente}</h2>
              <h2>Campanha: {slug === "dia-da-mulher" ? "Dia da Mulher" : c.nome} ({c.ano})</h2>
            </div> : null}
            {slug === "porto-360" ? <div className="casePagFicha">
              <h2>Produto: Porto 360º</h2>
              <h2>Cliente: TV Tribuna</h2>
            </div> : null}
            {c.textoDetalhado ?? <p>{resumo}</p>}
            </div>
            {c.videoCelular ? <div className="casePagVideoColuna casePagVideoCelular">
              <IPhoneVideo {...c.videoCelular} />
            </div> : null}
            {c.youtubeVideoId ? <div className="casePagVideoColuna">
              <YouTubeEmbed videoId={c.youtubeVideoId} title={c.cliente ? `Campanha ${c.nome} — ${c.cliente}` : c.nome}
                posterSrc={c.posterVideo ?? c.fundoHero} />
              {slug === "encontro-regional" ? <section className="casePagEvento" aria-labelledby="case-evento-titulo">
                <h3 id="case-evento-titulo">O evento</h3>
                <p>O encontro recebeu <strong>495 inscrições e 290 participantes presenciais</strong> no Parque Balneário Hotel. A estrutura contou com <strong>transmissão ao vivo no YouTube, som profissional, iluminação cênica, painel de LED, coffee break, coquetel e espaço para networking</strong>.</p>
                <p>Também foram montados estandes para entrevistas com autoridades e convidados, em parceria com a <strong>Record TV Litoral e Vale</strong> e a <strong>TV Thathi Band Litoral</strong>.</p>
              </section> : null}
            </div> : null}
            {c.globoplayVideos ? <div className="casePagVideoColuna casePagVideosEmpilhados">
              {c.globoplayVideos.map(video => <GloboplayCard key={video.href} href={video.href}
                title={video.title} posterSrc={video.posterSrc} />)}
            </div> : null}
          </section>
        ) : null}
        {c.desafio ? (
          <section className="casePagBloco">
            <h2>O desafio</h2>
            <p>{c.desafio}</p>
          </section>
        ) : null}

        {c.entregas.length > 0 ? <section className="casePagBloco">
          <h2>O que a WordCom fez</h2>
          <ul className="casePagLista">
            {c.entregas.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section> : null}

        {c.numeros ? (
          <section className="casePagBloco">
            <h2>Resultados</h2>
            <dl className="casePagNumeros">
              {c.numeros.map((n) => (
                <div key={n.rotulo}>
                  <dt>{n.valor}</dt>
                  <dd>{n.rotulo}</dd>
                </div>
              ))}
            </dl>
          </section>
        ) : null}

        {c.destaques ? (
          <section className="casePagBloco">
            <div className="casePagDestaques">
              {c.destaques.map((d) => (
                <div key={d.titulo} className="casePagDestaque">
                  <h3>{d.titulo}</h3>
                  <p>{d.texto}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {c.canais ? (
          <section className="casePagBloco">
            <h2>Onde circulou</h2>
            <ul className="casePagCanais">
              {c.canais.map((canal) => (
                <li key={canal}>{canal}</li>
              ))}
            </ul>
          </section>
        ) : null}

        {/* espaços de imagem — os arquivos entram depois, em
            /cases/paginas/<slug>/<n>.png, mantendo esta mesma ordem */}
        {c.imagens.length > 0 ? <section className="casePagBloco">
          <h2>Peças</h2>
          <div className="casePagGaleria">
            {c.imagens.map((legenda, i) => (
              <figure key={legenda} className="casePagVaga">
                <div className="casePagVagaArea" aria-hidden="true">
                  <span>{`${slug}/${String(i + 1).padStart(2, "0")}.png`}</span>
                </div>
                <figcaption>{legenda}</figcaption>
              </figure>
            ))}
          </div>
        </section> : null}

        {c.citacao ? (
          <section className="casePagBloco">
            <blockquote className="casePagCitacao">{c.citacao}</blockquote>
          </section>
        ) : null}

        {slug !== "beach-tennis" && slug !== "encontro-regional" && slug !== "porto-360" && slug !== "dia-da-mulher" && slug !== "vai-nessa" && slug !== "ods-baixada-santista" && slug !== "tudo-bem" && slug !== "liceu-sao-paulo" && !c.galeria ? <section className="casePagFim">
          <h2>Quer um resultado assim?</h2>
          <Link href="/#contato" className="casePagBotao">
            Falar com a WordCom
          </Link>
        </section> : null}
      </article>
      {slug === "beach-tennis" ? <BeachTennisGallery /> : null}
      {slug === "encontro-regional" ? <EncontroRegionalGallery /> : null}
      {slug === "ods-baixada-santista" ? <OdsGallery /> : null}
      {slug === "dia-da-mulher" ? <DiaDaMulherGallery /> : null}
      {c.galeria ? <ExpandableGallery images={c.galeria} /> : null}
      </div>

      {/* última coisa do DOM: quem navega por teclado chega nela depois de
          ter percorrido a página, não antes de começar a ler */}
      <VoltarAosCases slug={slug} nome={c.nome} />
    </main>
  );
}
