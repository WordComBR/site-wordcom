# Ordem de publicação: site primeiro, contêiner depois

Passo a passo do que falta depois das 5 alterações já feitas no contêiner
(ver `gtm-consentimento-passo-a-passo.md`).

## A regra que não pode ser invertida

São duas metades que precisam existir juntas:

- **O site** define `gtag('consent','default', …)` — quem *informa* o estado.
- **O contêiner** exige `ad_storage` / `analytics_storage` — quem *obedece*.

Se o **contêiner for publicado primeiro**, o site no ar ainda não informa
estado nenhum. O GTM trata consentimento não informado como **não concedido**,
e as três tags param de disparar. Resultado: **perda total de medição** até o
site subir. Não é um risco teórico — é o comportamento projetado da
verificação de consentimento adicional.

Se o **site for publicado primeiro**, com o contêiner ainda antigo, não quebra
nada: o GA4 já tem permissão integrada e passa a respeitar a negativa; o Pixel
continua disparando como hoje, porque o `Consent Granted (GDPR)` só muda quando
o contêiner for publicado. É uma melhora parcial, sem interrupção.

**Portanto: site primeiro, contêiner logo depois.**

---

## Etapa 1 — Testar as duas metades juntas, antes de publicar qualquer uma

O ambiente de teste junta o código novo (que está em `localhost`) com o
contêiner novo (que está no rascunho do GTM). Dá para testar os dois sem
publicar nenhum.

1. Subir o site local:

   ```bash
   npm.cmd run dev
   ```

2. No GTM, contêiner **wordcom.com.br**, clicar em **Visualizar** (canto
   superior direito).
3. No campo do Tag Assistant, informar `http://localhost:3000` e **Connect**.
   Abre uma janela com o site rodando o **rascunho** do contêiner.
4. **Importante:** antes de medir, limpar o consentimento guardado. No console
   da janela do site:

   ```bash
   localStorage.removeItem('wordcom:consentimento:v1'); location.reload()
   ```

   Sem isso, o teste repete o erro de medição que já aconteceu uma vez: cookie
   gravado numa aceitação anterior continua lá e parece gravação nova.

### O que conferir em cada caminho

| caminho | Tag Assistant | console do site |
|---|---|---|
| sem escolher nada | nenhuma das 3 tags em "Tags Fired" | nada de `facebook`/`on.aws` |
| rejeitar opcionais | idem | idem |
| aceitar só análise | GA4 dispara, Pixel **não** | sem `facebook.com/tr` |
| aceitar todos | as 3 disparam | `facebook.com/tr` aparece |
| mudar com a página aberta | o `update` aparece na aba Consent | — |

O comando para a checagem de rede, no console do site:

```bash
performance.getEntriesByType('resource').map(e=>e.name).filter(u=>/facebook|on\.aws|\/g\/collect/.test(u))
```

Com tudo rejeitado, **não pode** haver `facebook` nem `on.aws`. O `/g/collect`
do GA4 pode aparecer: é o ping sem cookie do Consent Mode, comportamento
esperado e correto.

E a checagem de cookie, também com tudo rejeitado:

```bash
document.cookie.split(';').map(c => c.trim().split('=')[0])
```

Não pode ter `_fbp`, `_ga`, `_ga_N3QZDQSE3J` nem `_gcl_au`.

---

## Etapa 2 — Excluir o preview da métrica do GA4

A propriedade `G-N3QZDQSE3J` é a mesma do site antigo. Testar sem isolar suja o
histórico.

**GA4 → Administrador → Streams de dados →** o stream do site **→ Configurar
definições de tag → Mostrar mais → Definir tráfego interno → Criar**:

- Nome: `Preview e local`
- `traffic_type` = `internal`
- Condição: **Hostname** · **contém** · `vercel.app`
- Adicionar uma segunda condição com **Hostname** · **contém** · `localhost`

Depois, em **Administrador → Configurações de dados → Filtros de dados**, o
filtro "Internal Traffic" costuma vir em modo **Testando**. Deixar assim
durante os testes e só então mudar para **Ativo**.

---

## Etapa 3 — Publicar o site

```bash
git switch main
git merge lp/versao-final
git push
```

A Vercel publica sozinha ao receber o push na `main`.

Antes do merge, remover do commit `0ec6d58` o aviso de "não publicar" não é
possível (mensagem de commit é imutável sem reescrever história) — fica como
registro histórico de que o aviso existiu e foi resolvido nesta ordem.

Depois do deploy, confirmar no site no ar que o `default` sai antes do GTM:

```bash
curl -s https://wordcom.com.br/ | grep -o "consent','default'\|googletagmanager" | head -4
```

A ordem tem de ser `consent','default'` **antes** de `googletagmanager`.

---

## Etapa 4 — Publicar o contêiner

Só depois que a etapa 3 estiver no ar.

No GTM: **Enviar** → nome da versão, por exemplo
`Consentimento LGPD — Consent Mode v2` → descrição com o que mudou → **Publicar**.

---

## Etapa 5 — Medir no site publicado

Repetir as checagens da etapa 1, agora em `https://wordcom.com.br`, **em janela
anônima**. É a única medição que vale como prova: preview não é produção.

Se o `on.aws` continuar aparecendo com consentimento rejeitado, o envio está
saindo do contêiner de servidor **SERVER WORDCOM** (`GTM-N8WZMGR5`), e aí há
trabalho lá dentro — a CAPI manda do servidor, e bloqueio no navegador não
alcança o que já saiu.

---

## Etapa 6 — Se precisar voltar atrás

- **Contêiner:** GTM → **Versões** → abrir a versão anterior → **Publicar**.
- **Site:** `git revert` do merge, ou na Vercel promover o deployment anterior.

As duas são independentes e podem ser desfeitas em qualquer ordem — exceto que
voltar só o site, mantendo o contêiner novo, reproduz a perda de medição
descrita no topo.
