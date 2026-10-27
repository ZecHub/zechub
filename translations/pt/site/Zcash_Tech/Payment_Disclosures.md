<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Payment_Disclosures.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Prova de pagamento blindada e divulgações de pagamento

## TL;DR

- Um ID de transação identifica uma transação, mas não revela um destinatário blindado, valor ou memorando.
- Uma divulgação de pagamento foi concebida para permitir que o remetente prove detalhes selecionados de um pagamento sem expor o restante histórico da sua carteira.
- Uma chave de visualização concede acesso contínuo de leitura a um endereço ou conta. Use-a para auditorias contínuas, não para uma disputa sobre um único pagamento.
- Uma divulgação de pagamento não pode provar a entrega de bens, identificar uma pessoa por si só, reverter um pagamento nem substituir verificações de confirmação.
- [ZIP 311](https://zips.z.cash/zip-0311) ainda é um **Rascunho**. Seu texto atual deixa inacabados o suporte a Orchard, o suporte a entradas transparentes, a codificação, o versionamento e as regras de interface do usuário.

## Por que um ID de transação não é suficiente

Qualquer pessoa pode inspecionar os detalhes públicos de um pagamento transparente do Zcash. Um explorador de blocos pode mostrar seus endereços, valores e status de confirmação.

Um pagamento blindado funciona de forma diferente. A chain prova que a transação seguiu as regras do Zcash, mas não publica o remetente, o destinatário, o valor ou o memorando blindados. Compartilhar o ID da transação pode mostrar que uma transação foi minerada, mas não pode provar a um comerciante ou terceiro qual pagamento privado estava dentro dela.

Isso cria um problema prático. Um cliente pode precisar resolver uma disputa com um comerciante, uma corretora pode precisar provar que processou um saque, ou um doador pode querer provar uma contribuição. Compartilhar uma chave de visualização completa revelaria muito mais do que qualquer um desses casos exige.

[ZIP 311: Zcash Payment Disclosures](https://zips.z.cash/zip-0311) propõe uma resposta mais restrita: divulgar e autenticar informações selecionadas de uma transação.

![Um ID de transação prova que uma transação existe, mas não revela detalhes de pagamentos blindados. Uma divulgação de pagamento ZIP 311 permitiria que um verificador autenticasse apenas o destinatário, o valor, o memorando e os detalhes opcionais do remetente selecionados em relação à transação minerada.](/content-images/payment-disclosure-proof-flow-208c033e06.webp)

## Como funciona uma divulgação de pagamento

O fluxo básico é:

1. O verificador fornece ao remetente um desafio ou referência únicos, quando uma prova interativa é adequada.
2. O remetente seleciona a transação e a saída ou saídas blindadas a divulgar.
3. Um software de carteira compatível cria uma divulgação de pagamento vinculada a essa transação e, opcionalmente, ao desafio.
4. O remetente entrega a divulgação ao verificador.
5. O verificador obtém a transação real de um nó Zcash confiável, verifica que ela foi minerada e verifica a divulgação em relação a ela.
6. Um resultado válido confirma apenas as alegações contidas nessa divulgação.

O design Sapling do ZIP usa uma chave de cifra de saída para recuperar cada saída selecionada. Isso pode revelar o destinatário, o valor e o memorando da saída. Também requer prova de autoridade de gastos para pelo menos uma entrada da transação, portanto uma pessoa que apenas vê a transação não pode criar uma divulgação válida como se a tivesse enviado.

Uma divulgação de pagamento Sapling não precisa revelar um endereço do remetente. A autoridade de gastos pode controlar muitos endereços diversificados, portanto provar o controle dos gastos não identifica automaticamente um endereço. O ZIP 311 inclui uma prova de endereço opcional para casos em que é necessário vincular a prova a um endereço conhecido do remetente.

## Divulgação de pagamento ou chave de visualização?

| Método | Melhor uso | O que revela | Acesso contínuo? | Vinculado criptograficamente ao pagamento? |
| --- | --- | --- | --- | --- |
| Transaction ID | Verificar se uma transação foi minerada | Dados públicos da transação e confirmações | Não | Sim, mas os detalhes do pagamento blindado permanecem ocultos |
| Captura de tela ou recibo | Manutenção informal de registros | O que o remetente escolher exibir | Não | Não; a imagem pode ser editada |
| Divulgação de pagamento | Provar detalhes selecionados de um pagamento | Saídas selecionadas da transação e qualquer prova incluída do remetente ou desafio | Não, mas a prova compartilhada pode ser copiada | Sim |
| Incoming Viewing Key | Monitorar pagamentos recebidos por uma conta | Atividade recebida abrangida pela chave | Sim | Descriptografa pagamentos recebidos correspondentes |
| Full Viewing Key | Contabilidade ou auditoria de uma conta | Atividade recebida e enviada, valores, memorandos e saldos abrangidos pela chave | Sim | Descriptografa a atividade correspondente da conta |

Use a divulgação mais restrita que responda à pergunta. Uma disputa com um comerciante sobre um pagamento normalmente não justifica acesso a todos os pagamentos de uma conta. Um contador que precisa revisar um período completo de relatórios pode precisar de uma chave de visualização.

Nenhum dos métodos concede permissão para gastar. Nunca compartilhe uma frase semente, chave de gastos, chave privada ou backup da carteira como prova de pagamento.

![Um registro de transação está disponível hoje, mas não fornece nenhuma nova prova para terceiros. Uma divulgação de pagamento provaria detalhes selecionados de um pagamento. Uma chave de visualização oferece visibilidade mais ampla e contínua.](/content-images/payment-disclosure-scope-0585cdc075.webp)

## O que posso usar hoje?

Nenhuma carteira atual é identificada aqui como implementando a criação ou verificação de divulgações de pagamento do ZIP 311. O ZIP continua sendo um rascunho e lista sua implementação de referência como "TBD". As seguintes ferramentas mantidas ainda podem ajudar o remetente, o destinatário ou um auditor autorizado a inspecionar os registros disponíveis hoje:

| Aplicativo | Útil hoje para | Limitação importante |
| --- | --- | --- |
| [Zkool](https://github.com/hhanh00/zkool2) | Consultar metadados detalhados da transação, valores, entradas e saídas de pools e memorandos; importar chaves de visualização Unified ou Sapling para contas somente de visualização | Não anuncia criação ou verificação de divulgações do ZIP 311 |
| [Zingo PC](https://github.com/zingolabs/zingo-pc) | Revisar o histórico de transações blindadas e memorandos; importar uma Full Viewing Key Unified no modo somente leitura | Um registro de carteira ou conta somente leitura não é uma divulgação de pagamento com escopo seletivo |
| [Zallet](https://zcash.github.io/zallet/) | Fluxos de trabalho de operador usando `z_viewtransaction`, `z_exportviewingkey` e `z_importviewingkey` | Software beta; suas RPCs de chave de visualização e transação são registros mais amplos ou locais, não provas do ZIP 311 |

Use primeiro a carteira que enviou ou recebeu o pagamento. Verifique os detalhes da transação, o memorando, o ID da transação e as confirmações, depois peça à outra parte que compare esses detalhes com seus próprios registros. Não instale uma nova carteira nem insira uma frase semente apenas para produzir evidências. Se um auditor precisar de visibilidade contínua, considere uma conta compatível somente de visualização e compreenda o escopo da chave de visualização antes de compartilhá-la.

Estes aplicativos são alternativas práticas para verificar registros, não uma prova de que uma divulgação de pagamento padronizada está disponível. Uma captura de tela pode ajudar pessoas a comparar registros, mas pode ser editada e não é uma prova criptográfica.

## Onde as divulgações de pagamento se aplicam

### Disputas com comerciantes

Um cliente poderia provar que um valor específico foi enviado para o endereço blindado do comerciante. A prova não estabelece que os bens foram entregues, que um reembolso é devido ou que a pessoa que a apresenta tem uma identidade jurídica específica. Essas questões ainda dependem do registro do pedido e do acordo entre as partes.

### Saques blindados

O ZIP 311 lista saques blindados como um caso de uso pretendido: uma corretora provaria o destinatário e o valor sem publicar esses detalhes on-chain. Sua prova de entrada transparente ainda está inacabada, portanto isso ainda não é um fluxo de trabalho padronizado completo. O cliente também deve verificar independentemente o status de confirmação da transação.

### Doações

Um doador ou campanha poderia provar uma contribuição específica enquanto mantém privados pagamentos não relacionados. Publicar a divulgação torna seus detalhes selecionados públicos para todas as pessoas que receberem uma cópia, portanto um canal de verificação privado é mais seguro quando uma prova pública é desnecessária.

### Contabilidade

Use uma divulgação de pagamento quando um contador precisar de evidências para uma transação. Use a chave de visualização adequada mais restrita quando o contador precisar de acesso contínuo a muitas transações ou a um período completo de relatórios.

## Um fluxo de trabalho seguro para a privacidade

O ZIP 311 ainda não é um padrão de carteira concluído e amplamente implementável. Quando ferramentas compatíveis para remetente e verificador estiverem disponíveis, use esta lista de verificação:

1. **Confirme primeiro a compatibilidade.** Ambas as ferramentas devem suportar o mesmo formato de divulgação e o pool blindado usado pelo pagamento.
2. **Resolva primeiro os problemas comuns.** Verifique a sincronização da carteira, o ID da transação, a contagem de confirmações, o status de expiração e os registros do destinatário antes de revelar detalhes privados.
3. **Peça um desafio.** Para uma disputa, o verificador deve fornecer um novo número de pedido ou desafio aleatório para que a divulgação fique vinculada a essa solicitação.
4. **Selecione apenas a saída necessária.** Não inclua saídas não relacionadas da mesma transação.
5. **Visualize todos os campos revelados.** Verifique o destinatário, o valor, o memorando, a prova de endereço do remetente e o desafio antes de exportar.
6. **Compartilhe por um canal privado.** Uma divulgação não é uma chave secreta de gastos, mas qualquer pessoa que a receba pode reter ou redistribuir as informações que ela revela.
7. **Verifique em relação à chain.** O verificador deve buscar a transação exata de um nó confiável, confirmar que ela está na rede e no bloco pretendidos e, em seguida, validar a divulgação.
8. **Registre o resultado, não segredos adicionais.** Guarde apenas o que o processo de disputa, saque, doação ou contabilidade exige.

Se a carteira não conseguir gerar uma divulgação, não substitua por uma chave de visualização completa sem compreender seu escopo mais amplo e permanente. Pergunte se o destinatário consegue confirmar o pagamento a partir de seus próprios registros da carteira ou aceitar um registro menos sensível.

## O que uma divulgação válida não prova

Uma verificação bem-sucedida não prova:

- Que a transação tem confirmações suficientes para a política de risco do verificador
- Que uma reorganização da chain não pode remover uma transação recente
- Que os bens ou serviços foram entregues
- Que um reembolso ou estorno é necessário
- Que o remetente controla um endereço específico, a menos que uma prova de endereço apropriada esteja incluída
- Que a pessoa que apresenta a divulgação tem a identidade real reivindicada
- Que saídas não divulgadas, outras transações ou o saldo da carteira têm algum valor específico
- Que a divulgação permanece privada depois de ser compartilhada

O verificador deve verificar separadamente a inclusão na chain e o status de confirmação. O procedimento de verificação do ZIP 311 pressupõe que o chamador já obteve a transação minerada e a altura de seu bloco.

## Limitações atuais

Trate o ZIP 311 como um padrão proposto, não como uma promessa de que uma carteira atual tenha um botão **Provar pagamento** funcional.

O rascunho atualmente especifica gastos e saídas Sapling, mas ainda contém itens inacabados para Orchard, entradas transparentes, a codificação da divulgação, o versionamento e como as carteiras devem exibir diferentes níveis de validade. Sua implementação de referência também está listada como "TBD". Conforme está escrito, ele não define divulgações de pagamento para pagamentos Orchard ou Ironwood.

O remetente também pode não conseguir divulgar uma saída se a transação tiver sido deliberadamente criada sem uma chave de visualização de saída para essa saída. O ZIP 311 preserva essa escolha de privacidade em vez de criar um novo caminho de recuperação.

Documentação mais antiga descreve os comandos experimentais `z_getpaymentdisclosure` e `z_validatepaymentdisclosure` em `zcashd`. Esses comandos suportavam **apenas saídas Sprout JoinSplit**, não o design Sapling do ZIP 311, e foram descontinuados. `zcashd` chegou à sua interrupção final de fim de suporte em julho de 2026. Não use esse guia legado como instruções para fundos atuais.

Essas lacunas não tornam a ideia inútil. Elas explicam por que um guia cuidadoso deve separar o modelo de privacidade e os casos de uso do software que está pronto para usuários comuns.

## FAQ

### Posso provar um pagamento blindado apenas com o ID da transação?

Não. O ID pode identificar a transação e seu status de confirmação, mas o destinatário, o valor e o memorando blindados não são públicos.

### Uma divulgação de pagamento é o mesmo que uma chave de visualização?

Não. Uma divulgação é limitada a detalhes selecionados de uma transação. Uma chave de visualização pode revelar atividade correspondente de um endereço ou conta ao longo do tempo.

### O destinatário pode criar a prova do remetente?

Não segundo o design do ZIP 311. Uma divulgação válida deve provar autoridade de gastos para pelo menos uma entrada. O destinatário pode confirmar um pagamento usando seus próprios registros da carteira, mas essa é uma alegação diferente.

### Posso revogar uma divulgação depois de compartilhá-la?

Não. Ela não concede acesso futuro à conta como uma chave de visualização, mas os dados revelados e a prova podem ser copiados. Compartilhe-a com o mesmo cuidado que teria com qualquer registro financeiro privado.

### A verificação move ou bloqueia algum ZEC?

Não. Criar ou verificar uma divulgação não gasta, reembolsa, congela nem reverte fundos.

### O que devo usar hoje se minha carteira não tiver um recurso de divulgação?

Comece pelos registros da carteira do destinatário, pelo ID da transação e status de confirmação, por uma referência de fatura no memorando criptografado ou por outro recibo aceito mutuamente. Use uma chave de visualização apenas quando seu escopo mais amplo for realmente necessário e compreendido.

## Recursos

- [ZIP 311: Divulgações de pagamentos do Zcash](https://zips.z.cash/zip-0311) - o design em rascunho, requisitos, processo de verificação e considerações de privacidade
- [ZIP 310: Propriedades de segurança das chaves de visualização Sapling](https://zips.z.cash/zip-0310) - o que as chaves de visualização revelam e quais garantias fornecem
- [ZIP 304: Assinaturas de endereços Sapling](https://zips.z.cash/zip-0304) - o mecanismo opcional de prova de endereço referido pela ZIP 311
- [Especificação do protocolo Zcash](https://zips.z.cash/protocol/protocol.pdf) - criptografia de notes Sapling, chaves de visualização de saída e autorização de gastos
- [Documento arquivado de divulgação de pagamentos do zcashd](https://github.com/zcash/zcash/blob/master/doc/payment-disclosure.md) - implementação histórica apenas para Sprout, não um guia atual
- [Funcionalidades descontinuadas do zcashd](https://zcash.github.io/zcash/user/deprecation.html) - estado dos antigos comandos experimentais de divulgação

## Páginas relacionadas

- [Transações](/using-zcash/transactions) - pagamentos blindados, confirmações e resolução de problemas de transações
- [Chaves de visualização](/zcash-tech/viewing-keys) - acesso contínuo somente para leitura e opções atuais de exportação
- [O que um explorador de blocos pode ver](/zcash-tech/what-a-block-explorer-can-see) - campos públicos e privados de transações
- [Manter registros com ZEC blindado](/zcash-use-cases/keeping-records-with-shielded-zec) - contabilidade sem publicar o histórico da carteira
