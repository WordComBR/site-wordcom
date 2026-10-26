import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ConsentimentoCookies } from "@/components/consentimento-cookies";
import { ConsentimentoGtm } from "@/components/consentimento-gtm";
import { NavbarWordcom } from "@/components/navbar-wordcom";


/* A mesma Montserrat que o site já usa. Via next/font ela é self-hosted no
   build, com preload e font-display: swap — sem requisição a terceiro e sem
   texto invisível durante o carregamento.
   O nome da variável é o que o CSS do site espera: --font-wordcom. */
const montserrat = Montserrat({
  subsets: ["latin", "latin-ext"],
  variable: "--font-wordcom",
  display: "swap",
});

export const metadata: Metadata = {
  title: "WordCom — A última PALAVRA em comunicação",
  description:
    "Publicidade, marketing, conteúdo, audiovisual e eventos em uma comunicação integrada.",
  icons: {
    icon: "/marca/favicon.svg",
    shortcut: "/marca/favicon.svg",
    apple: "/marca/favicon.svg",
  },
  openGraph: {
    title: "WordCom — A última PALAVRA em comunicação",
    description:
      "Publicidade, marketing, conteúdo, audiovisual e eventos em uma comunicação integrada.",
    locale: "pt_BR",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  /* sem viewport-fit=cover, env(safe-area-inset-*) devolve 0px e o botão
     flutuante do WhatsApp fica sobre a barra de gestos do iPhone */
  viewportFit: "cover",
  /* o teclado do Android passa a encolher o viewport, como já faz no iOS */
  interactiveWidget: "resizes-content",
  /* a cor da barra do navegador acompanha o topo real da página (hero #212121) */
  themeColor: "#212121",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={montserrat.variable}>
      <head>
        {/* ---- Consent Mode v2: o estado PRECISA existir antes do GTM ----

           `beforeInteractive` de proposito: o script entra no HTML servido e
           roda durante a analise dele, antes do contentor do GTM, que usa
           `afterInteractive`. Se a ordem se inverter, as tags disparam antes
           de haver estado de consentimento e o aviso vira decoracao.

           Com `<script>` cru em vez de `next/script` o React reclama —
           "Encountered a script tag while rendering React component" — porque
           script dentro de componente nao executa em render de cliente. No
           HTML inicial ele funcionava, mas o aviso era legitimo e some assim.

           Nao importa de `@/lib/cookies`: o bundle so executa depois, tarde
           demais. A validacao abaixo e a mesma de `interpretarPreferencias`,
           repetida aqui por necessidade — se a regra mudar la, muda aqui.

           O servidor nunca sabe a escolha (ela mora no localStorage), entao
           sem registro valido tudo comeca em `denied`. Negar por padrao e o
           comportamento exigido, nao uma limitacao.

           Os tres sinais de publicidade sao o que diferencia a v2 da v1:
           omitir `ad_user_data` e `ad_personalization` e o erro mais comum. */}
        <Script
          id="consent-default"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                window.dataLayer=window.dataLayer||[];
                function gtag(){window.dataLayer.push(arguments)}
                window.gtag=gtag;
                var a=false,p=false;
                try{
                  var r=JSON.parse(window.localStorage.getItem('wordcom:consentimento:v1'));
                  var agora=Date.now();
                  if(r&&r.versao===1&&typeof r.analise==='boolean'&&typeof r.publicidade==='boolean'
                    &&typeof r.atualizadoEm==='number'&&isFinite(r.atualizadoEm)
                    &&r.atualizadoEm<=agora&&agora-r.atualizadoEm<15552000000){
                    a=r.analise;p=r.publicidade;
                  }
                }catch(e){}
                gtag('consent','default',{
                  analytics_storage:a?'granted':'denied',
                  ad_storage:p?'granted':'denied',
                  ad_user_data:p?'granted':'denied',
                  ad_personalization:p?'granted':'denied',
                  security_storage:'granted',
                  functionality_storage:'granted',
                  wait_for_update:500
                });
                window.dataLayer.push({event:'wordcom_consentimento',analise:a,publicidade:p});
              })();
            `,
          }}
        />
        {/* Google Tag Manager Script */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-NPMMSFKF');
            `,
          }}
        />
      </head>
      <body>
        {/* camada unica de fundo do site; o CSS explica a opacidade medida */}
        <div className="fundoSite" aria-hidden="true" />
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NPMMSFKF"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        {/* quem navega por teclado pulava o menu inteiro em cada carga */}
        <a href="#inicio" className="pularConteudo">
          Pular para o conteúdo
        </a>
        {/* Navbar do site inteiro. Depois do "Pular para o conteúdo" de
            propósito: o skip link tem de continuar sendo o primeiro foco da
            página, antes da navegação. */}
        <NavbarWordcom />
        {children}
        <ConsentimentoCookies />
        <ConsentimentoGtm />
      </body>
    </html>
  );
}