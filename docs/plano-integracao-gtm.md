# WordCom: preparacao do rastreamento

Data: 13/10/2026.
Status: somente planejamento. Integracao ainda nao implementada.

## O que este documento significa

Vamos preparar o novo site para usar as ferramentas de medicao que a empresa ja possui. Nesta etapa, nenhum codigo, tag, configuracao de conta, deploy ou DNS sera alterado. Criar este documento nao ativa rastreamento nem modifica o site atual.

A analise usa a exportacao `GTM-NPMMSFKF_v5.json`. Ela e uma copia da versao 5 e nao comprova o funcionamento das ferramentas em tempo real ou que essa versao continue sendo a publicada no futuro.

## O que foi confirmado

| Ferramenta | Identificador | Configuracao na copia |
| --- | --- | --- |
| Google Tag Manager | GTM-NPMMSFKF | Conteiner Web existente, que sera reaproveitado. |
| Google Analytics 4 | G-N3QZDQSE3J | Tag do Google acionada em todas as paginas, com envio de visualizacao habilitado. |
| Meta Pixel | 1592142738245686 | Tag acionada quando o documento fica pronto e por eventos personalizados. |
| Vinculador de conversoes | Sem novo ID necessario nesta etapa | Tag acionada em todas as paginas. Sua presenca nao comprova conversoes do Google Ads configuradas. |

No codigo do novo site existe um banner que salva a escolha do visitante, mas GTM, Analytics e Meta ainda nao sao carregados. O formulario ja avisa sobre sucesso usando `lead_form_submit`, sem colocar seus campos pessoais no evento.

## O que precisamos preparar antes de ativar

### 1. Ligar o banner as ferramentas

O visitante escolhe as categorias separadamente:

| Escolha | Comportamento pretendido |
| --- | --- |
| Nao escolheu ou rejeitou | Nenhum rastreamento opcional. |
| Permitiu apenas analise | Medicao de visitas e acoes permitidas; publicidade bloqueada. |
| Permitiu apenas publicidade | Apenas ferramentas de publicidade autorizadas; analise bloqueada. |
| Permitiu ambas | Ferramentas autorizadas nas duas categorias. |
| Retirou uma permissao | Atualizar o consentimento e interromper novos disparos daquela categoria. |

Essa tabela e um requisito para testar, nao uma funcionalidade pronta. A implementacao deve respeitar as regras de cada ferramenta. O modelo do Meta exportado concede consentimento se seu parametro nao estiver explicitamente falso; por isso nao basta inserir o GTM no novo site. A politica e os textos precisam ser aprovados pelo responsavel de privacidade.

### 2. Contar somente acoes uteis

| Acao | Preparacao proposta |
| --- | --- |
| Abrir uma pagina ou navegar entre paginas | Registrar uma visualizacao, sem duplicacoes. |
| Enviar o formulario com sucesso | Manter o evento existente e configurar sua traducao para `generate_lead` no GA4 e `Lead` no Meta. |
| Clicar no WhatsApp | Registrar intencao de contato; nao apresentar como conversa ou venda confirmada. |
| Clicar em contato ou orcamento | Definir se a equipe considera essa interacao util antes de criar evento. |

O evento de formulario so deve acontecer quando o servidor confirmar sucesso. Rejeitar cookies opcionais nao deve impedir o envio de e-mail. Cada ferramenta so recebe eventos conforme a categoria autorizada. Nome, e-mail, telefone, mensagem e URLs com dados pessoais nao devem entrar no rastreamento.

### 3. Separar teste e producao

O conteiner exportado nao possui filtros de dominio nos acionadores examinados. Instala-lo na Vercel pode misturar nossas visitas de teste aos relatorios oficiais.

Antes de testar tags reais, definir isolamento por ambiente e destino de medicao, conforme os recursos e permissoes disponiveis. O modo de visualizacao do GTM, sozinho, nao garante que os dados deixem de chegar as ferramentas. Rascunhos e configuracoes de teste nao devem ser publicados no conteiner de producao.

## Como proteger o site atual

- Nao importar o JSON nem substituir o conteiner existente.
- Nao publicar alteracoes nas tags compartilhadas nesta etapa.
- Nao mudar DNS, IDs, acessos ou configuracoes de contas.
- Nao instalar GA4 ou Meta separadamente se continuarem gerenciados pelo GTM.
- Antes de qualquer futura mudanca compartilhada, revisar o impacto nos dois sites e planejar a reversao.

O estado `NOT_SET` das tags indica ausencia de verificacoes adicionais definidas, nao ausencia de toda protecao: tags do Google possuem verificacoes integradas. A exportacao tambem nao mostra eventual consentimento instalado fora do GTM no site antigo. Nao foi concluida uma auditoria juridica ou de rastreamento em tempo real desse site.

## Pendencias de verificacao externa

- Confirmar que a versao 5 continua sendo a versao publicada antes da implementacao.
- Conferir no GA4 a medicao aprimorada e as configuracoes de eventos para evitar duplicacao.
- Conferir no Meta os eventos recebidos, configuracoes automaticas e eventual API de Conversoes. O modelo menciona integracao relacionada a CAPI, mas nao comprova envio por servidor ou deduplicacao funcionando.
- Aprovar com a equipe quais acoes serao consideradas conversoes.
- Validar finalidades, fornecedores e politica com o responsavel de privacidade.

## Ordem das proximas etapas

1. Aprovar este roteiro e as finalidades de medicao.
2. Autorizar explicitamente a implementacao no codigo local, inicialmente desativada.
3. Preparar e revisar separadamente os ajustes necessarios no GTM, sem publicar na versao ao vivo.
4. Testar consentimento, eventos, duplicacoes, navegacao e desempenho em ambiente isolado. Usar Tag Assistant, GA4 DebugView e testes de eventos da Meta, alem de lint, TypeScript e build.
5. Somente com nova autorizacao, publicar o codigo e as configuracoes aprovadas, coordenando a ativacao e seu impacto no site atual.
6. Depois da futura troca de DNS, repetir os testes em `wordcom.com.br`. Preferencias salvas na Vercel nao se transferem automaticamente para esse dominio.

Referencia tecnica: [consentimento no GTM](https://support.google.com/tagmanager/answer/10718549?hl=pt-BR) e [Consent Mode](https://developers.google.com/tag-platform/security/guides/consent).

Conclusao: o planejamento esta preparado. Nenhuma integracao foi ativada, nenhuma mudanca de GTM foi publicada e nenhum DNS foi alterado.
