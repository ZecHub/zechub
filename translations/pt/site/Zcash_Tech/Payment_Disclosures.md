<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Payment_Disclosures.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# Prova de pagamento blindado e divulgações de pagamento

## TL;DR

- Um ID de transação identifica uma transação, mas não revela um destinatário blindado, um valor ou um memorando.
- Uma divulgação de pagamento foi projetada para permitir que o remetente prove detalhes selecionados de um pagamento sem expor o restante do histórico da carteira.
- Uma chave de visualização concede acesso contínuo de leitura a um endereço ou conta. Use-a para auditorias contínuas, não para uma disputa sobre um único pagamento.
- Uma divulgação de pagamento não pode provar a entrega de mercadorias, identificar uma pessoa por si só, reverter um pagamento ou substituir as verificações de confirmação.
- [ZIP 311](https://zips.z.cash/zip-0311) ainda é um **rascunho**. O texto atual deixa inacabados o suporte a Orchard, o suporte a entradas transparentes, a codificação, o versionamento e as regras de interface do usuário.

## Por que um ID de transação não é suficiente

Qualquer pessoa pode inspecionar os detalhes públicos de um pagamento Zcash transparente. Um explorador de blocos pode mostrar os endereços, os valores e o status de confirmação.

Um pagamento blindado funciona de outra forma. A chain prova que a transação seguiu as regras do Zcash, mas não publica o remetente blindado, o destinatário, o valor ou o memorando. Compartilhar o ID da transação pode mostrar que uma transação foi minerada, mas não pode provar a um comerciante ou a terceiros qual pagamento privado estava dentro dela.

Isso cria um problema prático. Um cliente pode precisar resolver uma disputa com um comerciante, uma corretora pode precisar provar que processou um saque ou um doador pode querer provar uma única contribuição. Compartilhar uma Full Viewing Key revelaria muito mais do que qualquer um desses casos exige.

[ZIP 311: Zcash Payment Disclosures](https://zips.z.cash/zip-0311) propõe uma resposta mais restrita: divulgar e autenticar informações selecionadas de uma única transação.

![Um ID de transação prova que uma transação existe, mas não revela os detalhes do pagamento blindado. Uma divulgação de pagamento ZIP 311 permitiria que um verificador autenticasse, em relação à transação minerada, apenas o destinatário, o valor, o memorando e os detalhes opcionais do remetente que foram selecionados.](/content-images/payment-disclosure-proof-flow-208c033e06.webp)

## Como funciona uma divulgação de pagamento

O fluxo básico é:

1. O verificador fornece ao remetente um desafio ou uma referência única, quando uma prova interativa for apropriada.
2. O remetente seleciona a transação e a saída ou as saídas blindadas a serem divulgadas.
3. Um software de carteira compatível cria uma divulgação de pagamento vinculada a essa transação e, opcionalmente, ao desafio.
4. O remetente entrega a divulgação ao verificador.
5. O verificador obtém a transação real de um nó Zcash confiável, confere se ela foi minerada e verifica a divulgação com base nela.
6. Um resultado válido confirma apenas as afirmações contidas nessa divulgação.

O design Sapling da ZIP usa uma chave de cifra de saída para recuperar cada saída selecionada. Isso pode revelar o destinatário, o valor e o memorando da saída. Ele também exige prova de autoridade de gasto para pelo menos uma entrada da transação, de modo que uma pessoa que apenas vê a transação não consegue criar uma divulgação válida como se a tivesse enviado.

Uma divulgação de pagamento Sapling não precisa revelar um endereço de remetente. A autoridade de gasto pode controlar muitos endereços diversificados, então provar o controle do gasto não identifica automaticamente um endereço. A ZIP 311 inclui uma prova de endereço opcional para os casos em que é necessário vincular a prova a um endereço de remetente conhecido.

## Divulgação de pagamento ou chave de visualização?

| Método | Melhor uso | O que revela | Acesso contínuo? | Vinculado criptograficamente ao pagamento? |
| --- | --- | --- | --- | --- |
| Transaction ID | Verificar se uma transação foi minerada | Dados públicos da transação e confirmações | Não | Sim, mas os detalhes do pagamento blindado continuam ocultos |
| Screenshot or receipt | Registro informal | O que o remetente escolher mostrar | Não | Não; a imagem pode ser editada |
| Payment disclosure | Provar detalhes selecionados de um pagamento | Saídas selecionadas da transação e qualquer prova de remetente ou de desafio incluída | Não, mas a prova compartilhada pode ser copiada | Sim |
| Incoming Viewing Key | Monitorar pagamentos recebidos por uma conta | Atividade de entrada coberta pela chave | Sim | Descriptografa os pagamentos de entrada correspondentes |
| Full Viewing Key | Contabilidade ou auditoria de uma conta | Atividade de entrada e de saída, valores, memorandos e saldos cobertos pela chave | Sim | Descriptografa a atividade correspondente da conta |

Use a menor divulgação que responda à pergunta. Uma disputa com um comerciante sobre um único pagamento normalmente não justifica o acesso a todos os pagamentos de uma conta. Um contador que precisa revisar um período de apuração completo pode precisar de uma chave de visualização.

Nenhum dos métodos concede permissão para gastar. Nunca compartilhe uma frase semente, uma chave de gastos, uma chave privada ou um backup da carteira como prova de pagamento.

![Um registro de transação já está disponível hoje, mas não fornece nenhuma nova prova a terceiros. Uma divulgação de pagamento provaria detalhes selecionados de um pagamento. Uma chave de visualização oferece uma visibilidade mais ampla e contínua.](/content-images/payment-disclosure-scope-0585cdc075.webp)

## O que posso usar hoje?

Nenhuma carteira atual é apontada aqui como implementando a criação ou a verificação de divulgações de pagamento da ZIP 311. A ZIP continua sendo um rascunho e indica sua implementação de referência como "TBD". As ferramentas mantidas a seguir ainda podem ajudar o remetente, o destinatário ou um auditor autorizado a inspecionar os registros disponíveis hoje:

| App | Útil hoje para | Limite importante |
| --- | --- | --- |
| [Zkool](https://github.com/hhanh00/zkool2) | Visualizar metadados detalhados de transações, valores, entradas e saídas de pool e memorandos; importar chaves de visualização Unified ou Sapling em contas somente leitura | Não anuncia a criação ou a verificação de divulgações da ZIP 311 |
| [Zingo PC](https://github.com/zingolabs/zingo-pc) | Revisar o histórico de transações blindadas e os memorandos; importar uma Full Viewing Key Unified em modo somente leitura | Um registro da carteira ou uma conta somente leitura não é uma divulgação de pagamento com escopo seletivo |
| [Zallet](https://zcash.github.io/zallet/) | Fluxos de trabalho de operadores usando `z_viewtransaction`, `z_exportviewingkey` e `z_importviewingkey` | Software beta; seus RPCs de chave de visualização e de transação são mais amplos ou são registros locais, não provas da ZIP 311 |

Use primeiro a carteira que enviou ou recebeu o pagamento. Confira os detalhes da transação, o memorando, o ID da transação e as confirmações e, em seguida, peça à outra parte que compare esses detalhes com os próprios registros. Não instale uma nova carteira e não digite uma frase semente apenas para produzir evidências. Se um auditor precisar de visibilidade contínua, considere uma conta somente leitura compatível e entenda o escopo da chave de visualização antes de compartilhá-la.

Esses apps são alternativas práticas para conferir registros, não uma prova de que uma divulgação de pagamento padronizada esteja disponível. Uma captura de tela pode ajudar as pessoas a comparar registros, mas ela é editável e não é uma prova criptográfica.

## Onde as divulgações de pagamento se aplicam

### Disputas com comerciantes

Um cliente poderia provar que um valor específico foi enviado ao endereço blindado do comerciante. A prova não estabelece que as mercadorias foram entregues, que um reembolso é devido ou que a pessoa que a apresenta tem uma determinada identidade legal. Essas questões continuam dependendo do registro do pedido e do acordo entre as partes.

### Saques blindados

A ZIP 311 lista os saques blindados como um caso de uso-alvo: uma corretora provaria o destinatário e o valor sem publicar esses detalhes on-chain. A prova de entradas transparentes ainda está inacabada, então esse ainda não é um fluxo de trabalho padronizado completo. O cliente também precisa verificar de forma independente o status de confirmação da transação.

### Doações

Um doador ou uma campanha poderia provar uma contribuição específica, mantendo privados os pagamentos não relacionados. Publicar a divulgação torna os detalhes selecionados públicos para todos que recebem uma cópia, então um canal de verificação privado é mais seguro quando uma prova pública não é necessária.

### Contabilidade

Use uma divulgação de pagamento quando um contador precisar de evidências de uma única transação. Use a chave de visualização adequada mais restrita quando o contador precisar de acesso contínuo a muitas transações ou a um período de apuração completo.

## Um fluxo de trabalho que preserva a privacidade

A ZIP 311 ainda não é um padrão de carteira finalizado e amplamente implantável. Quando ferramentas compatíveis de remetente e de verificador estiverem disponíveis, use esta lista de verificação:

1. **Confirme primeiro a compatibilidade.** As duas ferramentas precisam oferecer suporte ao mesmo formato de divulgação e à pool blindada usada pelo pagamento.
2. **Resolva primeiro os problemas comuns.** Verifique a sincronização da carteira, o ID da transação, o número de confirmações, o status de expiração e os registros do destinatário antes de revelar detalhes privados.
3. **Solicite um desafio.** Em uma disputa, o verificador deve fornecer um número de pedido novo ou um desafio aleatório, para que a divulgação fique vinculada a essa solicitação.
4. **Selecione apenas a saída necessária.** Não inclua saídas não relacionadas da mesma transação.
5. **Visualize cada campo revelado.** Confira o destinatário, o valor, o memorando, a prova de endereço do remetente e o desafio antes de exportar.
6. **Compartilhe por um canal privado.** Uma divulgação não é uma chave de gastos secreta, mas qualquer pessoa que a receba pode guardar ou redistribuir as informações que ela revela.
7. **Verifique com base na chain.** O verificador precisa buscar a transação exata em um nó confiável, confirmar que ela está na rede e no bloco pretendidos e, depois, validar a divulgação.
8. **Registre o resultado, não segredos extras.** Guarde apenas o que o processo de disputa, saque, doação ou contabilidade exige.

Se a carteira não conseguir gerar uma divulgação, não a substitua por uma Full Viewing Key sem entender o escopo mais amplo e permanente dela. Pergunte se o destinatário pode confirmar o pagamento pelos próprios registros da carteira ou aceitar um registro menos sensível.

## O que uma divulgação válida não prova

Uma verificação bem-sucedida não prova:

- Que a transação tem confirmações suficientes para a política de risco do verificador
- Que uma reorganização da chain não pode remover uma transação recente
- Que as mercadorias ou os serviços foram entregues
- Que um reembolso ou um estorno é necessário
- Que o remetente controla um determinado endereço, a menos que uma prova de endereço adequada esteja incluída
- Que a pessoa que apresenta a divulgação tem a identidade real que alega ter
- Que as saídas não divulgadas, outras transações ou o saldo da carteira têm algum valor específico
- Que a divulgação continua privada depois de ser compartilhada

O verificador precisa verificar separadamente a inclusão na chain e o status de confirmação. O procedimento de verificação da ZIP 311 pressupõe que quem o executa já obteve a transação minerada e a altura do bloco dela.

## Limitações atuais

Trate a ZIP 311 como um padrão proposto, não como uma promessa de que uma carteira atual tenha um botão **Provar pagamento** funcionando.

Atualmente, o rascunho especifica gastos e saídas Sapling, mas ainda contém itens inacabados para Orchard, entradas transparentes, a codificação da divulgação, o versionamento e a forma como as carteiras devem exibir diferentes níveis de validade. A implementação de referência também está indicada como "TBD". Do jeito que está escrito, o documento não define divulgações de pagamento para pagamentos Orchard ou Ironwood.

O remetente também pode não conseguir divulgar uma saída se a transação tiver sido criada deliberadamente sem uma chave de visualização de saída para ela. A ZIP 311 preserva essa escolha de privacidade, em vez de criar um novo caminho de recuperação.

Documentações mais antigas descrevem os comandos experimentais `z_getpaymentdisclosure` e `z_validatepaymentdisclosure` no `zcashd`. Esses comandos ofereciam suporte **somente a saídas Sprout JoinSplit**, e não ao design Sapling da ZIP 311, e foram descontinuados. O `zcashd` chegou à interrupção definitiva de fim de suporte em jul 2026. Não use esse passo a passo legado como instrução para fundos atuais.

Essas lacunas não tornam a ideia inútil. Elas explicam por que um guia cuidadoso precisa separar o modelo de privacidade e os casos de uso dos softwares que estão prontos para usuários comuns.

## Perguntas frequentes

### Posso provar um pagamento blindado apenas com o ID da transação?

Não. O ID pode identificar a transação e o status de confirmação dela, mas o destinatário blindado, o valor e o memorando não são públicos.

### Uma divulgação de pagamento é o mesmo que uma chave de visualização?

Não. Uma divulgação tem como escopo detalhes selecionados de uma transação. Uma chave de visualização pode revelar, ao longo do tempo, a atividade correspondente de um endereço ou de uma conta.

### O destinatário pode criar a prova do remetente?

Não no design da ZIP 311. Uma divulgação válida precisa provar a autoridade de gasto de pelo menos uma entrada. O destinatário pode confirmar um pagamento usando os próprios registros da carteira, mas essa é uma afirmação diferente.

### Posso revogar uma divulgação depois de compartilhá-la?

Não. Ela não concede acesso futuro à conta como uma chave de visualização, mas os dados revelados e a prova podem ser copiados. Compartilhe-a com o mesmo cuidado que qualquer registro financeiro privado.

### A verificação movimenta ou bloqueia algum ZEC?

Não. Criar ou verificar uma divulgação não gasta, reembolsa, congela nem reverte fundos.

### O que devo usar hoje se minha carteira não tiver um recurso de divulgação?

Comece pelos registros da carteira do destinatário, pelo ID e pelo status de confirmação da transação, por uma referência de fatura no memorando criptografado ou por outro recibo aceito por ambas as partes. Use uma chave de visualização apenas quando o escopo mais amplo dela for realmente necessário e compreendido.

## Recursos

- [ZIP 311: Zcash Payment Disclosures](https://zips.z.cash/zip-0311) - o design em rascunho, os requisitos, o processo de verificação e as considerações de privacidade
- [ZIP 310: Propriedades de segurança das Viewing Keys Sapling](https://zips.z.cash/zip-0310) - o que as chaves de visualização revelam e quais garantias oferecem
- [ZIP 304: Assinaturas de endereço Sapling](https://zips.z.cash/zip-0304) - o mecanismo opcional de prova de endereço citado pela ZIP 311
- [Especificação do protocolo Zcash](https://zips.z.cash/protocol/protocol.pdf) - criptografia de notes Sapling, chaves de visualização de saída e autorização de gasto
- [Documento arquivado de divulgação de pagamento do zcashd](https://github.com/zcash/zcash/blob/master/doc/payment-disclosure.md) - implementação histórica exclusiva para Sprout, não um guia atual
- [Recursos descontinuados do zcashd](https://zcash.github.io/zcash/user/deprecation.html) - status dos antigos comandos experimentais de divulgação

## Páginas relacionadas

- [Transações](/using-zcash/transactions) - pagamentos blindados, confirmações e solução de problemas de transações
- [Chaves de visualização](/zcash-tech/viewing-keys) - acesso contínuo somente leitura e opções atuais de exportação
- [O que um explorador de blocos consegue ver](/zcash-tech/what-a-block-explorer-can-see) - campos públicos e privados das transações
- [Como manter registros com ZEC blindado](/zcash-use-cases/keeping-records-with-shielded-zec) - contabilidade sem publicar o histórico da carteira
