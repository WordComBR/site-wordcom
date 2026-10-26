# GTM `GTM-NPMMSFKF` — fazer as tags respeitarem o consentimento

Contêiner: **GTM-NPMMSFKF** · Propriedade GA4 do site: **G-N3QZDQSE3J**
(deduzida do cookie `_ga_N3QZDQSE3J`; confirmar no passo 0)

## Por que este documento existe

O código do site já está pronto e medido. Ele define o Consent Mode v2 com
tudo em `denied` **antes** de o contêiner carregar, e manda `consent/update`
quando a pessoa muda de ideia.

O que falta é dentro do contêiner. Medido em 26/10/2026 com o consentimento
**totalmente rejeitado**, o site ainda:

| o que aconteceu | evidência |
|---|---|
| Meta Pixel disparou 3× | `facebook.com/tr` |
| GA4 mandou coleta | `/g/collect` |
| 3 eventos para a CAPI da Meta | `xd-…on.aws/events` |
| gravou 4 cookies | `_ga`, `_ga_N3QZDQSE3J`, `_fbp`, `_gcl_au` |

As tags estão configuradas para disparar independentemente do consentimento.
Enquanto isso não mudar, a política de cookies do site afirma algo falso.

## O que o código já entrega para o contêiner usar

Em toda carga de página, e de novo a cada mudança de preferência, o site
empurra na camada de dados:

```js
{ event: 'wordcom_consentimento', analise: true|false, publicidade: true|false }
```

E os sinais do Consent Mode v2:

| categoria do aviso | sinais |
|---|---|
| `analise` | `analytics_storage` |
| `publicidade` | `ad_storage`, `ad_user_data`, `ad_personalization` |
| sempre concedidos | `security_storage`, `functionality_storage` |

---

## Passo 0 — Antes de mexer: a volta atrás

São três redes de proteção, da mais usada para a mais drástica. Na prática a
primeira resolve quase tudo.

### 1. Trabalhar num espaço de trabalho novo — é o que realmente protege

**Nada que você editar vai ao ar até clicar em Enviar → Publicar.** Tags,
acionadores e variáveis ficam presos ao espaço de trabalho enquanto você
mexe. O site publicado continua rodando a versão antiga o tempo inteiro.

No canto superior esquerdo, onde aparece o nome do espaço de trabalho atual,
clique e escolha **+** para criar um novo — por exemplo
`consentimento-lgpd`. Se desistir no meio, é só apagar o espaço de trabalho e
nada aconteceu.

### 2. Voltar para uma versão anterior — a reversão de verdade

O GTM **guarda sozinho** todas as versões publicadas. Não precisa de backup
para isso: em **Versões**, você acha a versão que estava no ar, abre e
clica em **Publicar**. O contêiner volta ao estado dela.

> Cuidado com o botão **Restaurar versão**: ele carrega a versão no espaço de
> trabalho em vez de publicar na hora. Para voltar ao ar mesmo, é **Publicar**.

Antes de começar, vale abrir **Versões** e anotar qual é a versão publicada
hoje (número e data). É para ela que você volta se der errado.

### 3. Exportar o JSON — para o caso catastrófico

Serve para o que as duas anteriores não cobrem: contêiner apagado, acesso
perdido, ou querer uma cópia fora do Google.

**Administrador → seção Contêiner → Exportar contêiner →
Escolher uma versão ou um espaço de trabalho** → selecionar a **versão
publicada** → **Fazer download**. Sai um `.json`; guarde junto deste projeto.

Para restaurar: **Administrador → Importar contêiner**, escolher o arquivo, um
espaço de trabalho **Novo**, e **Substituir** (apaga tudo e troca pelo do
arquivo) em vez de **Mesclar**. O GTM cria uma versão nova antes de substituir,
e ainda mostra uma prévia das alterações para você conferir antes de confirmar.

### 4. Ligar a visão geral do consentimento

**Administrador → Configurações do contêiner → Configurações adicionais →
marcar "Ativar Visão geral da permissão"**.

Sem isso a página de consentimento não aparece em **Tags**, e você fica sem a
tela que mostra, tag por tag, qual exige o quê — que é justamente como você vai
conferir o trabalho nos passos 3 e 4.

### 5. Anotar o que existe hoje

Em **Tags**, anotar quais existem e o ID de cada uma:
   - a tag do **GA4** e seu ID de métricas (`G-…`)
   - a tag do **Meta Pixel** e seu ID
   - se há tag da **CAPI da Meta** (é ela que manda para o endereço `on.aws`)
   - se há **Conversion Linker** (é a origem do `_gcl_au`)

---

## Passo 1 — Criar as duas variáveis da camada de dados

**Variáveis → Definidas pelo usuário → Nova → Variável da camada de dados**

| Nome da variável | Nome da variável da camada de dados | Versão |
|---|---|---|
| `dlv - analise` | `analise` | Versão 2 |
| `dlv - publicidade` | `publicidade` | Versão 2 |

Deixar **Valor padrão** em branco. Sem valor, a condição do passo 3 não bate,
e o comportamento seguro é justamente não disparar.

---

## Passo 2 — Criar o acionador de consentimento

**Acionadores → Novo → Evento personalizado**

- Nome: `Consentimento - publicidade permitida`
- Nome do evento: `wordcom_consentimento`
- **Este acionador é ativado em: Alguns eventos personalizados**
- Condição: `dlv - publicidade` · **é igual a** · `true`

Repetir para análise:

- Nome: `Consentimento - analise permitida`
- Nome do evento: `wordcom_consentimento`
- Condição: `dlv - analise` · **é igual a** · `true`

> O site empurra booleano `true`, e o GTM compara como texto. Confirmar no
> modo Visualizar que a condição realmente bate — se não bater, trocar a
> comparação para **contém** `true`.

---

## Passo 3 — Meta Pixel: é o caso mais grave

O Pixel **ignora o Consent Mode do Google**. Marcar a caixinha de
consentimento nele não basta: o bloqueio tem de ser condição de acionador.

Na tag do **Meta Pixel**:

1. **Remover o acionador `All Pages` / `Todas as páginas`.** Se ele ficar, a
   tag continua disparando e todo o resto é inútil.
2. Adicionar o acionador `Consentimento - publicidade permitida`.
3. Em **Configurações avançadas → Configurações de consentimento**, escolher
   **"Exigir consentimento adicional para disparar a tag"** e listar
   `ad_storage`. É cinto e suspensório: a condição do acionador é o que de
   fato segura.

**Fazer o mesmo na tag da CAPI da Meta**, se existir — ela manda do servidor e
não aparece no bloqueio do navegador.

---

## Passo 4 — GA4

Na tag de configuração do GA4 e nas de evento:

- **Configurações avançadas → Configurações de consentimento →
  "Exigir consentimento adicional para disparar a tag"**: `analytics_storage`.

  (O padrão de toda tag é **"Não definido"**, que não faz verificação nenhuma —
  é por isso que hoje elas disparam mesmo com o consentimento negado.)

Se houver **Conversion Linker**, exigir `ad_storage` nele — é de onde vem o
`_gcl_au`.

> Com `analytics_storage: denied`, o GA4 continua mandando um ping sem cookie.
> Isso é o comportamento projetado do Consent Mode e **não** é problema: o que
> não pode acontecer é gravar `_ga` e `_ga_N3QZDQSE3J`. É esse o teste.

---

## Passo 5 — Testar antes de publicar

1. **Visualizar** (Preview) → apontar para o site.
2. Na primeira carga, sem ter escolhido nada, conferir no Tag Assistant:
   - aba **Consent** → `default` com os quatro sinais em `denied`
   - **nenhuma** tag de Pixel ou GA4 em "Tags disparadas"
3. Aceitar tudo no aviso → o `update` aparece com os quatro em `granted` e as
   tags disparam.
4. Aceitar **só análise** → GA4 dispara, Pixel **não**.
5. Mudar a preferência com a página aberta → o `update` sai sem recarregar.

### A checagem que vale mais que o Tag Assistant

Com o consentimento **rejeitado**, abrir o console do navegador e rodar:

```js
document.cookie.split(';').map(c => c.trim().split('=')[0])
```

Não pode aparecer `_ga`, `_ga_N3QZDQSE3J`, `_fbp` nem `_gcl_au`.
Se aparecer, alguma tag ainda está escapando.

E para ver o que saiu na rede:

```js
performance.getEntriesByType('resource')
  .map(e => e.name)
  .filter(u => /facebook|google-analytics|\/g\/collect|on\.aws/.test(u))
```

Com tudo rejeitado, esta lista tem de vir **vazia**.

---

## Passo 6 — Isolar o tráfego de teste

A propriedade do GA4 é a mesma do site antigo, então medir em preview suja o
histórico.

**GA4 → Admin → Streams de dados → Configurar definições de tag →
Definir tráfego interno**: regra por `hostname` cobrindo o domínio de preview
da Vercel, ação **Excluir**. Criar em modo *Testando*, conferir no DebugView, e
só então ativar.

---

## Passo 7 — Publicar o contêiner e avisar

Depois de publicar, repetir as checagens do passo 5 **no site publicado**, não
só no preview.

Aí sim o site pode ir ao ar: a política passa a descrever o que de fato
acontece, e o commit `0ec6d58` deixa de carregar o aviso de "não publicar".

---

## O que fica fora deste documento

A redação final da política precisa de revisão de quem responde por
privacidade na empresa. Este passo a passo faz o site cumprir o que a política
diz; ele não é parecer de conformidade com a LGPD.
