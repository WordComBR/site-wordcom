"use client";

import { useEffect } from "react";
import {
  assinarPreferenciasCookies,
  interpretarPreferencias,
  lerPreferenciasCookies,
} from "@/lib/cookies";

/* Leva a escolha da pessoa ate o GTM, a cada mudanca.

   O `default` do Consent Mode ja saiu no layout, sincrono, antes do contentor
   carregar. Este componente cuida da outra metade: o `update`, que precisa
   sair quando a pessoa aceita, rejeita ou troca de ideia COM A PAGINA ABERTA
   — sem recarregar.

   Nao existe canal novo aqui. `assinarPreferenciasCookies` ja escutava os dois
   eventos que importam: `storage` (escolha feita em outra aba) e
   `wordcom:consentimento` (escolha feita nesta aba, disparado pelo proprio
   `salvarPreferenciasCookies`). Este e so mais um assinante.

   Alem do `update`, empurra um evento nomeado para o dataLayer. E o que
   permite ao contentor acionar tag que NAO respeita o Consent Mode do Google
   — o Pixel do Meta e o caso concreto: ele ignora esses sinais, e o bloqueio
   dele tem de ser condicao explicita de acionador la dentro. */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function ConsentimentoGtm() {
  useEffect(() => {
    const enviar = () => {
      const preferencias = interpretarPreferencias(lerPreferenciasCookies());
      const analise = preferencias?.analise === true;
      const publicidade = preferencias?.publicidade === true;

      window.gtag?.("consent", "update", {
        analytics_storage: analise ? "granted" : "denied",
        ad_storage: publicidade ? "granted" : "denied",
        ad_user_data: publicidade ? "granted" : "denied",
        ad_personalization: publicidade ? "granted" : "denied",
      });

      window.dataLayer?.push({
        event: "wordcom_consentimento",
        analise,
        publicidade,
      });
    };

    /* Sem disparo no mount: o script sincrono do layout ja publicou o estado
       inicial, e repetir aqui so duplicaria o evento no dataLayer. */
    return assinarPreferenciasCookies(enviar);
  }, []);

  return null;
}
