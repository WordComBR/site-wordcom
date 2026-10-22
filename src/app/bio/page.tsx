import type { Metadata, Viewport } from "next";
import { ArrowRight } from "lucide-react";
import styles from "./bio.module.css";

export const metadata: Metadata = {
  title: "WordCom | Nossos links",
  description: "Conheça a WordCom, explore nosso portfólio e converse com a agência pelo WhatsApp. Todos os nossos canais em um só lugar.",
  openGraph: {
    title: "WordCom | Nossos links",
    description: "A última palavra em comunicação. Encontre a WordCom nos nossos canais.",
    type: "website",
    locale: "pt_BR",
  },
};

export const viewport: Viewport = { themeColor: "#0a0710" };

/* A pilha percorre o gradiente da marca, do roxo ao laranja, com o destaque
   em papel na frente. Os tons e o porquê de cada um estão no bio.module.css. */
const links = [
  {
    title: "Nosso site",
    detail: "A agência por inteiro: soluções, cases e método.",
    href: "https://wordcom.com.br/",
    tom: "destaque",
  },
  {
    title: "Instagram",
    detail: "Criação, bastidores e os projetos no dia a dia da agência.",
    href: "https://www.instagram.com/wordcom.oficial/",
    tom: "roxo",
  },
  {
    title: "TikTok",
    detail: "Outro formato, outro ritmo: conteúdo curto sobre marca.",
    href: "https://www.tiktok.com/@wordcompublicidad",
    tom: "violeta",
  },
  {
    title: "Portfólio de vídeos",
    detail: "Campanhas, institucionais e cobertura de eventos.",
    href: "https://www.youtube.com/@wordcompublicidade360",
    tom: "magenta",
  },
  {
    title: "Vamos conversar",
    detail: "Conta o que a sua marca precisa e a gente responde pelo WhatsApp.",
    href: "https://api.whatsapp.com/send/?phone=5511974256616&text=Ol%C3%A1%21+Conheci+a+WordCom+pelo+site+e+gostaria+de+conversar+sobre+um+projeto+de+comunica%C3%A7%C3%A3o+para+a+minha+empresa.&type=phone_number&app_absent=0",
    tom: "laranja",
  },
];

export default function BioPage() {
  return (
    <main id="inicio" className={styles.page}>
      <div className={styles.content}>
        {/* A marca vive na camada de fundo, em tamanho real. O nome dela entra
            aqui só para o leitor de tela, e a assinatura é o título visível. */}
        <h1 className={styles.assinatura}>
          <span className={styles.srOnly}>WordCom — </span>
          A última palavra<br />em <strong>comunicação.</strong>
        </h1>

        <nav aria-label="Canais da WordCom" className={styles.links}>
          {links.map(({ title, detail, href, tom }) => (
            <a
              key={title}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.card} ${styles[tom]}`}
            >
              <span className={styles.corpo}>
                <h2 className={styles.titulo}>{title}</h2>
                <span className={styles.desc}>{detail}</span>
              </span>
              <ArrowRight className={styles.seta} size={22} aria-hidden="true" />
              <span className={styles.srOnly}> (abre em uma nova aba)</span>
            </a>
          ))}
        </nav>

        <footer className={styles.footer}>
          <span className={styles.brandLine} aria-hidden="true" />
          <p>Agência de publicidade e marketing 360º</p>
        </footer>
      </div>
    </main>
  );
}
