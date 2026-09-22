<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Payment_Disclosures.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Prova de pagamento blindada e divulgações de pagamento

## TL;DR

- Um ID de transação identifica uma transação, mas não revela um destinatário blindado, montante ou memo.
- Uma divulgação de pagamento foi concebida para permitir ao remetente provar detalhes selecionados de um pagamento sem expor o restante histórico da sua wallet.
- Uma viewing key concede acesso contínuo de leitura a um endereço ou conta. Utilize-a para auditorias contínuas, não para uma disputa relativa a um único pagamento.
- Uma divulgação de pagamento não pode provar a entrega de bens, identificar por si só uma pessoa, reverter um pagamento nem substituir verificações de confirmação.
- [ZIP 311](https://zips.z.cash/zip-0311) continua a ser um **Rascunho**. O seu texto atual deixa por concluir o suporte a Orchard, o suporte a entradas transparentes, a codificação, o versionamento e as regras de interface de utilizador.

## Porque é que um ID de transação não é suficiente

Qualquer pessoa pode inspecionar os detalhes públicos de um pagamento transparente em Zcash. Um explorador de blocos pode mostrar os seus endereços, montantes e estado de confirmação.

Um pagamento blindado funciona de forma diferente. A cadeia prova que a transação seguiu as regras de Zcash, mas não publica o remetente, destinatário, montante ou memo blindados. Partilhar o ID da transação pode mostrar que uma transação foi minerada, mas não pode provar a um comerciante ou terceiro qual o pagamento privado que continha.

Isto cria um problema prático. Um cliente pode precisar de resolver uma disputa com um comerciante, uma exchange pode precisar de provar que processou um levantamento, ou um doador pode querer provar uma contribuição. Partilhar uma viewing key completa revelaria muito mais do que qualquer um destes casos exige.

[ZIP 311: Zcash Divulgações de Pagamento](https://zips.z.cash/zip-0311) propõe uma resposta mais restrita: divulgar e autenticar informação selecionada de uma transação.

![A transaction ID proves that a transaction exists but does not reveal shielded payment details. A ZIP 311 payment disclosure would let a verifier authenticate only the selected recipient, amount, memo, and optional sender details against the mined transaction.](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/payment-disclosure-proof-flow.png)

## Como funciona uma divulgação de pagamento

O fluxo básico é:

1. O verificador fornece ao remetente um desafio ou referência únicos, quando uma prova interativa é adequada.
2. O remetente seleciona a transação e a saída ou saídas blindadas a divulgar.
3. Software de wallet compatível cria uma divulgação de pagamento associada a essa transação e, opcionalmente, ao desafio.
4. O remetente entrega a divulgação ao verificador.
5. O verificador obtém a transação real a partir de um nó Zcash fidedigno, verifica que foi minerada e verifica a divulgação contra ela.
6. Um resultado válido confirma apenas as alegações contidas nessa divulgação.

O design de ZIP Sapling utiliza uma chave de cifra de saída para recuperar cada saída selecionada. Isto pode revelar o destinatário, montante e memo da saída. Também requer prova de autoridade de gasto para pelo menos uma entrada da transação, pelo que uma pessoa que apenas veja a transação não pode criar uma divulgação válida como se a tivesse enviado.

Uma divulgação de pagamento Sapling não tem de revelar um endereço do remetente. A autoridade de gasto pode controlar muitos endereços diversificados, pelo que provar o controlo do gasto não identifica automaticamente um endereço. ZIP 311 inclui uma prova de endereço opcional para casos em que seja necessário associar a prova a um endereço conhecido do remetente.

## Divulgação de pagamento ou viewing key?

| Método | Melhor utilização | O que revela | Acesso contínuo? | Associado criptograficamente ao pagamento? |
| --- | --- | --- | --- | --- |
| ID de transação | Verificar que uma transação foi minerada | Dados públicos da transação e confirmações | Não | Sim, mas os detalhes do pagamento blindado permanecem ocultos |
| Captura de ecrã ou recibo | Manutenção informal de registos | O que quer que o remetente escolha apresentar | Não | Não; a imagem pode ser editada |
| Divulgação de pagamento | Provar detalhes selecionados de um pagamento | Saídas selecionadas da transação e qualquer prova incluída de remetente ou desafio | Não, mas a prova partilhada pode ser copiada | Sim |
| Incoming Viewing Key | Monitorizar pagamentos recebidos por uma conta | Atividade recebida abrangida pela chave | Sim | Desencripta pagamentos recebidos correspondentes |
| Full Viewing Key | Contabilidade ou auditoria de uma conta | Atividade recebida e enviada, montantes, memos e saldos abrangidos pela chave | Sim | Desencripta atividade da conta correspondente |

Utilize a divulgação mais restrita que responda à questão. Uma disputa com um comerciante sobre um pagamento não justifica normalmente o acesso a todos os pagamentos numa conta. Um contabilista que tenha de analisar um período completo de reporte poderá necessitar de uma viewing key.

Nenhum dos métodos concede permissão para gastar. Nunca partilhe uma frase-semente, chave de gasto, chave privada ou cópia de segurança da wallet como prova de pagamento.

![A transaction record is available today but provides no new third-party proof. A payment disclosure would prove selected details of one payment. A viewing key provides broader, ongoing visibility.](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/payment-disclosure-scope.png)

## O que posso utilizar hoje?

Nenhuma wallet atual é aqui identificada como implementando a criação ou verificação de divulgações de pagamento ZIP 311. O ZIP continua a ser um rascunho e lista a sua implementação de referência como "TBD". As seguintes ferramentas mantidas podem ainda ajudar o remetente, destinatário ou auditor autorizado a inspecionar os registos atualmente disponíveis:

| Aplicação | Útil hoje para | Limitação importante |
| --- | --- | --- |
| [Zkool](https://github.com/hhanh00/zkool2) | Consultar metadados detalhados da transação, montantes, entradas e saídas de pools e memos; importar viewing keys Unified ou Sapling para contas apenas de visualização | Não anuncia criação ou verificação de divulgações ZIP 311 |
| [Zingo PC](https://github.com/zingolabs/zingo-pc) | Rever histórico de transações blindadas e memos; importar uma Full Viewing Key Unified em modo apenas de leitura | Um registo de wallet ou conta apenas de leitura não é uma divulgação de pagamento com âmbito seletivo |
| [Zallet](https://zcash.github.io/zallet/) | Fluxos de trabalho de operador com `z_viewtransaction`, `z_exportviewingkey` e `z_importviewingkey` | Software beta; as suas RPC de viewing key e transação são registos mais amplos ou locais, não provas ZIP 311 |

Utilize primeiro a wallet que enviou ou recebeu o pagamento. Verifique os detalhes da transação, memo, ID da transação e confirmações, e depois peça à outra parte que compare esses detalhes com os seus próprios registos. Não instale uma nova wallet nem introduza uma frase-semente apenas para produzir evidência. Se um auditor necessitar de visibilidade contínua, considere uma conta compatível apenas de visualização e compreenda o âmbito da viewing key antes de a partilhar.

Estas aplicações são alternativas práticas para verificar registos, não prova de que esteja disponível uma divulgação de pagamento padronizada. Uma captura de ecrã pode ajudar pessoas a comparar registos, mas é editável e não constitui prova criptográfica.

## Onde se aplicam as divulgações de pagamento

### Disputas com comerciantes

Um cliente poderia provar que um montante específico foi enviado para o endereço blindado do comerciante. A prova não estabelece que os bens foram entregues, que é devido um reembolso, ou que a pessoa que a apresenta tem uma identidade legal específica. Essas questões continuam a depender do registo da encomenda e do acordo entre as partes.

### Levantamentos blindados

ZIP 311 lista os levantamentos blindados como um caso de utilização visado: uma exchange provaria o destinatário e o montante sem publicar esses detalhes on-chain. A sua prova de entrada transparente continua por concluir, pelo que isto ainda não é um fluxo de trabalho padronizado completo. O cliente deve também verificar independentemente o estado de confirmação da transação.

### Doações

Um doador ou campanha poderia provar uma contribuição específica mantendo privados pagamentos não relacionados. Publicar a divulgação torna os seus detalhes selecionados públicos para todas as pessoas que recebam uma cópia, pelo que um canal de verificação privado é mais seguro quando não é necessária prova pública.

### Contabilidade

Utilize uma divulgação de pagamento quando um contabilista necessitar de evidência para uma transação. Utilize a viewing key adequada mais restrita quando o contabilista necessitar de acesso contínuo a muitas transações ou a um período completo de reporte.

## Um fluxo de trabalho seguro para a privacidade

ZIP 311 ainda não é uma norma de wallet concluída e amplamente implementável. Quando estiverem disponíveis ferramentas compatíveis para remetente e verificador, utilize esta lista de verificação:

1. **Confirme primeiro a compatibilidade.** Ambas as ferramentas têm de suportar o mesmo formato de divulgação e o pool blindado utilizado pelo pagamento.
2. **Resolva primeiro os problemas comuns.** Verifique a sincronização da wallet, o ID da transação, a contagem de confirmações, o estado de expiração e os registos do destinatário antes de revelar detalhes privados.
3. **Peça um desafio.** Para uma disputa, o verificador deve fornecer um número de encomenda novo ou um desafio aleatório, para que a divulgação fique associada a esse pedido.
4. **Selecione apenas a saída necessária.** Não inclua saídas não relacionadas da mesma transação.
5. **Pré-visualize todos os campos revelados.** Verifique o destinatário, montante, memo, prova de endereço do remetente e desafio antes de exportar.
6. **Partilhe através de um canal privado.** Uma divulgação não é uma chave secreta de gasto, mas qualquer pessoa que a receba pode conservar ou redistribuir a informação que revela.
7. **Verifique contra a cadeia.** O verificador tem de obter a transação exata a partir de um nó fidedigno, confirmar que está na rede e bloco pretendidos e, em seguida, validar a divulgação.
8. **Registe o resultado, não segredos adicionais.** Guarde apenas aquilo de que o processo de disputa, levantamento, doação ou contabilidade necessita.

Se a wallet não conseguir gerar uma divulgação, não substitua por uma viewing key completa sem compreender o seu âmbito mais amplo e permanente. Pergunte se o destinatário consegue confirmar o pagamento a partir dos seus próprios registos de wallet ou aceitar um registo menos sensível.

## O que uma divulgação válida não prova

Uma verificação bem-sucedida não prova:

- Que a transação tem confirmações suficientes para a política de risco do verificador
- Que uma reorganização da cadeia não pode remover uma transação recente
- Que os bens ou serviços foram entregues
- Que é necessário um reembolso ou estorno
- Que o remetente controla um endereço específico, salvo se estiver incluída uma prova de endereço adequada
- Que a pessoa que apresenta a divulgação tem uma identidade real reivindicada
- Que saídas não divulgadas, outras transações ou o saldo da wallet têm algum valor específico
- Que a divulgação permanece privada depois de ser partilhada

O verificador tem de verificar separadamente a inclusão na cadeia e o estado de confirmação. O procedimento de verificação de ZIP 311 pressupõe que o chamador já obteve a transação minerada e a sua altura de bloco.

## Limitações atuais

Trate ZIP 311 como uma norma proposta, não como uma promessa de que uma wallet atual tenha um botão funcional **Provar pagamento**.

O rascunho especifica atualmente gastos e saídas Sapling, mas ainda contém itens por concluir para Orchard, entradas transparentes, a codificação da divulgação, o versionamento e a forma como as wallets devem apresentar diferentes níveis de validade. A sua implementação de referência também está listada como "TBD". Tal como está escrito, não define divulgações de pagamento para pagamentos Orchard ou Ironwood.

O remetente poderá também não conseguir divulgar uma saída se a transação tiver sido deliberadamente criada sem uma outgoing viewing key para essa saída. ZIP 311 preserva essa escolha de privacidade em vez de criar um novo caminho de recuperação.

Documentação mais antiga descreve os comandos experimentais `z_getpaymentdisclosure` e `z_validatepaymentdisclosure` em `zcashd`. Esses comandos suportavam **apenas saídas Sprout JoinSplit**, não o design Sapling em ZIP 311, e foram descontinuados. `zcashd` atingiu a sua interrupção final de fim de suporte em julho de 2026. Não utilize esse guia legado como instruções para fundos atuais.

Estas lacunas não tornam a ideia inútil. Explicam porque é que um guia cuidadoso deve separar o modelo de privacidade e os casos de utilização do software que está pronto para utilizadores comuns.

## FAQ

### Posso provar um pagamento blindado apenas com o ID da transação?

Não. O ID pode identificar a transação e o seu estado de confirmação, mas o destinatário, montante e memo blindados não são públicos.

### Uma divulgação de pagamento é o mesmo que uma viewing key?

Não. Uma divulgação limita-se a detalhes selecionados de uma transação. Uma viewing key pode revelar atividade correspondente de um endereço ou conta ao longo do tempo.

### O destinatário pode criar a prova do remetente?

Não segundo o design ZIP 311. Uma divulgação válida tem de provar autoridade de gasto para pelo menos uma entrada. O destinatário pode confirmar um pagamento utilizando os seus próprios registos de wallet, mas isso é uma alegação diferente.

### Posso revogar uma divulgação depois de a partilhar?

Não. Não concede acesso futuro à conta como uma viewing key, mas os dados revelados e a prova podem ser copiados. Partilhe-a com o mesmo cuidado que teria com qualquer registo financeiro privado.

### A verificação move ou bloqueia algum ZEC?

Não. Criar ou verificar uma divulgação não gasta, reembolsa, congela nem reverte fundos.

### O que devo utilizar hoje se a minha wallet não tiver uma funcionalidade de divulgação?

Comece pelos registos da wallet do destinatário, pelo ID da transação e estado de confirmação, por uma referência de fatura no memo encriptado ou por outro recibo mutuamente aceite. Utilize uma viewing key apenas quando o seu âmbito mais vasto for genuinamente necessário e compreendido.

## Recursos

- [ZIP 311: Zcash Divulgações de Pagamento](https://zips.z.cash/zip-0311) - o design em rascunho, requisitos, processo de verificação e considerações de privacidade
- [ZIP 310: Propriedades de Segurança das Sapling Viewing Keys](https://zips.z.cash/zip-0310) - o que as viewing keys revelam e que garantias fornecem
- [ZIP 304: Assinaturas de Endereço Sapling](https://zips.z.cash/zip-0304) - o mecanismo opcional de prova de endereço referido por ZIP 311
- [Zcash especificação do protocolo](https://zips.z.cash/protocol/protocol.pdf) - encriptação de notas Sapling, outgoing viewing keys e autorização de gasto
- [Documento arquivado de divulgação de pagamento zcashd](https://github.com/zcash/zcash/blob/master/doc/payment-disclosure.md) - implementação histórica apenas para Sprout, não um guia atual
- [zcashd funcionalidades descontinuadas](https://zcash.github.io/zcash/user/deprecation.html) - estado dos antigos comandos experimentais de divulgação

## Páginas relacionadas

- [Transações](/using-zcash/transactions) - pagamentos blindados, confirmações e resolução de problemas de transações
- [Viewing keys](/zcash-tech/viewing-keys) - acesso contínuo apenas de leitura e opções atuais de exportação
- [O que um explorador de blocos pode ver](/zcash-tech/what-a-block-explorer-can-see) - campos públicos e privados de transações
- [Manter registos com ZEC blindado](/zcash-use-cases/keeping-records-with-shielded-zec) - contabilidade sem publicar o histórico da wallet
