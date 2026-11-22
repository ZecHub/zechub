<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Viewing_Keys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Chaves de visualização

Endereços blindados permitem que você faça transações revelando o mínimo possível na blockchain do Zcash. Então, o que acontece quando você *precisa* mostrar a uma parte específica o que você possui ou o que você enviou? Uma chave de visualização concede acesso de leitura sem conceder a capacidade de gastar. As chaves de visualização já existiam no Sprout; o Sapling adicionou recursos como detectar quando uma note recebida é gasta. O [ZIP 310](https://zips.z.cash/zip-0310) é um rascunho informativo que documenta as propriedades de segurança das chaves de visualização do Sapling, e não a atualização que introduziu as chaves de visualização.

Uma chave de visualização é a ferramenta para a divulgação seletiva: você escolhe quem vê o quê, e nunca entrega a autoridade de gasto para isso.

## TL;DR

Uma chave de visualização concede acesso **somente leitura** à atividade de um endereço ou conta Zcash blindado: quem a possui pode ver as transações recebidas (e, no caso das chaves de visualização completas, as enviadas), mas nunca pode gastar.

- **O que é:** a ferramenta de divulgação seletiva das pools blindadas, com recursos que variam conforme a pool e o tipo de chave. O [ZIP 310](https://zips.z.cash/zip-0310) documenta o que uma chave de visualização completa do Sapling revela e quais informações são garantidas, não verificadas, indefinidas ou não reveladas.
- **O que concede:** detecção de depósitos (chaves de entrada `uivk…`) ou visibilidade completa de entradas e saídas de uma conta (chaves de visualização completas unificadas `uview…`), além das chaves legadas Sapling `zxviews…`.
- **O que não concede:** autoridade de gasto. Nada do que o detentor de uma chave de visualização faça pode movimentar fundos.
- **Onde funciona hoje:** exportação/importação na [Zallet](https://github.com/zcash/zallet) (v0.1.0-beta.2+, `z_exportviewingkey` / `z_importviewingkey`) e contas somente de observação em carteiras como Zkool; consulte a página [Carteiras](/using-zcash/wallets) para ver a matriz de suporte atual.
- **A regra prática:** prefira a chave mais restrita que responda à pergunta feita, e lembre-se de que uma chave entregue não pode ser revogada — apenas superada pela movimentação dos fundos.

---

## Por que usar uma chave de visualização?

Os textos de Electric Coin Company sobre o assunto descrevem as situações que surgem com mais frequência, e elas ainda são as mais comuns hoje:

- **Uma corretora monitorando depósitos.** A corretora carrega uma chave de visualização de entrada em um nó de detecção conectado à internet para poder perceber os depósitos dos clientes em um endereço blindado, enquanto a chave de gastos permanece em um hardware que nunca toca a rede.
- **Um custodiante comprovando seus ativos.** O custodiante entrega a um auditor uma chave de visualização completa para cada endereço blindado. O auditor pode verificar esses saldos e revisar a atividade passada de entrada e saída desses endereços, e não pode fazer mais nada.
- **Due diligence de uma contraparte.** Quando uma corretora precisa revisar o histórico blindado de um cliente como parte de uma due diligence reforçada, ela pode pedir a chave de visualização em vez dos fundos.

## O que uma chave de visualização revela e o que não revela

Existe mais de um tipo de chave, e a diferença determina o quanto você expõe.

| Chave | Prefixo | Concede |
|---|---|---|
| Chave de visualização completa unificada (UFVK) | `uview…` | Vê transações recebidas **e** enviadas em todas as pools da conta |
| Chave de visualização de entrada unificada (UIVK) | `uivk…` | Vê apenas transações recebidas, em todas as pools da conta |
| Chave de visualização completa estendida Sapling | `zxviews…` | Vê a atividade Sapling de entrada e saída dos endereços da chave |

Nenhuma delas pode gastar. Todas são permanentes no sentido que importa: uma chave que você entregou não pode ser revogada, apenas superada, movendo os fundos para uma conta cujas chaves a outra parte não possui.

Vale a pena conhecer duas armadilhas de divulgação antes de compartilhar qualquer coisa.

**De entrada não significa restrita.** Uma chave de visualização de entrada unificada abrange a conta inteira, e não apenas o endereço sobre o qual você foi questionado. Exportar uma UIVK para um único endereço Sapling ainda concede visibilidade de entrada em todas as pools dessa conta, então ela revela mais do que o endereço que menciona. O [Zallet Book](https://zcash.github.io/zallet/zcashd/json_rpc.html) afirma isso explicitamente.

**Um endereço publicado já expõe sua chave de visualização de entrada a um adversário futuro.** O [ZIP 326](https://zips.z.cash/zip-0326) observa que um adversário com um computador quântico poderia recuperar a chave de visualização de entrada a partir de um endereço diversificado publicado, o que é viável de uma forma que recuperar a chave do nulificador não é. Publicar um endereço não é o mesmo que publicar uma chave de visualização hoje, mas os dois ficam mais próximos em um horizonte suficientemente longo.

## Chaves de visualização após o Ironwood

O NU6.3 introduziu a pool blindada Ironwood e tornou a pool Orchard somente de gasto, de modo que os fundos migram de uma para a outra ao longo do tempo. Consulte [Ironwood](/zcash-tech/ironwood) e [A catraca](/zcash-tech/the-turnstile) para saber mais sobre a atualização em si.

**Uma chave de visualização emitida antes do Ironwood continua funcionando após a migração.** O ZIP 326 especifica que um receptor, e sua chave de visualização de entrada correspondente, abrange o *protocolo* Orchard em vez de uma pool: a mesma chave de visualização de entrada faz a decriptação de teste dos textos cifrados de notes tanto da pool Orchard quanto da pool Ironwood. O Zallet implementa dessa forma, descrevendo as notes Ironwood como tendo o formato Orchard e sendo decriptadas por teste com as chaves de visualização Orchard da conta sob o domínio de criptografia de notes Ironwood.

Três consequências para quem possui ou emite uma chave:

1. **Os saldos se movem entre as pools, e quem observa vê isso acontecer.** O [ZIP 318](https://zips.z.cash/zip-0318) especifica a migração como uma série de pequenas transações Orchard-para-Ironwood, deliberadamente uniformes, transmitidas em um cronograma aleatório, cada uma gastando uma note Orchard e produzindo uma saída Ironwood de uma denominação canônica. Um auditor observando com uma chave de visualização vê os ativos passarem de uma pool para a outra em etapas ao longo de semanas, e não em um único movimento. Uma carteira pode reconstruir o próprio progresso da migração a partir dos dados da chain usando suas chaves de visualização.
2. **Cada etapa da migração revela o valor que movimenta.** Isso é inerente a atravessar uma catraca, e é o que torna a migração auditável. Dividir o saldo em denominações canônicas significa que nenhuma transação isolada revela o saldo total da pool Orchard.
3. **Contas criadas após o Ironwood podem derivar suas chaves de forma diferente.** O [ZIP 2005](https://zips.z.cash/zip-2005) adiciona uma flag `use_qsk` para chaves recuperáveis em cenário quântico, e ela altera a forma como as chaves de entrada, de saída e de diversificação são derivadas, de modo que as chaves `use_qsk = true` são realmente chaves diferentes. O ZIP 326 exige que a flag seja uniforme em toda a conta e proíbe gerar chaves `use_qsk = true` antes da ativação do NU6.3 na Mainnet. Uma chave exportada de uma conta que existia antes do Ironwood é, portanto, uma chave `use_qsk = false`, e continua correta para essa conta. Não presuma que uma chave exportada de uma conta descreve outra.

## Exportando uma chave de visualização

### Zallet

A [Zallet](https://github.com/zcash/zallet) é a carteira de nó integral que substituiu a carteira embutida no zcashd. A exportação e a importação de chaves de visualização chegaram na **v0.1.0-beta.2 (28 de julho de 2026)**, então verifique sua versão primeiro; builds anteriores não têm esses métodos. Todo argumento após o nome do método deve ser um JSON válido, o que significa que os valores de string mantêm suas próprias aspas duplas. O [Zallet Guia de referência rápida](/using-zcash/zallet-quick-reference-guide) aborda o estilo geral dos comandos.

Liste o que a carteira contém:

```bash
zallet rpc listaddresses
```

Exporte a chave de visualização completa unificada da conta passando um endereço unificado:

```bash
zallet rpc z_exportviewingkey '"<unified address>"'
```

Para exportar, em vez disso, a chave de visualização de entrada unificada da conta, use o argumento opcional `ivk`:

```bash
zallet rpc z_exportviewingkey '"<unified address>"' true
```

Passar um endereço Sapling retorna a chave de visualização completa estendida Sapling dessa conta (`zxviews…`), reproduzindo o comportamento antigo do zcashd. Há duas limitações documentadas: endereços Sprout são rejeitados, e uma chave de visualização completa estendida Sapling não pode ser exportada de uma conta que foi ela própria importada como somente visualização, porque a carteira não consegue reconstruí-la. A forma `ivk` funciona para contas importadas como somente visualização.

### Carteiras que exportam chaves de visualização pela própria interface

A página [Carteiras](/using-zcash/wallets) acompanha o suporte a chaves de visualização e a prontidão para o Ironwood de cada carteira. No momento em que este texto foi escrito, as carteiras que indicam tanto suporte a chaves de visualização quanto **Ironwood: Ready** incluem ZODL, Zingo!, Zkool, Cake, Zallet, zecd e Nozy. Consulte aquela página, e não esta, antes de confiar em uma carteira específica, porque a prontidão muda.

## Importando uma chave de visualização como conta somente de observação

### Zkool

A [Zkool](https://github.com/hhanh00/zkool2) é a opção mais flexível aqui, porque aceita chaves unificadas além das legadas. Seu README documenta contas somente de visualização criadas a partir de uma **chave de visualização unificada** ou de uma **chave de visualização estendida Sapling**, além de chaves estendidas blindadas legadas exportadas do zcashd. Adicione uma nova conta, escolha a opção somente de visualização e cole a chave `uview…` ou `zxviews…`; a conta então sincroniza e exibe saldos e histórico sem autoridade de gasto.

O suporte ao protocolo Ironwood e a migração Orchard-para-Ironwood chegaram na Zkool 6.24.0 (20 de julho de 2026), e a 6.26.1 (2 de agosto de 2026) corrigiu a detecção de transações Ironwood na mempool. Como NU7 foi ativado na Mainnet (bloco 3.543.405), use [6.35.0](https://github.com/hhanh00/zkool2/releases/tag/zkool-v6.35.0) (25 de outubro de 2026) ou posterior: é o primeiro lançamento Zkool criado com a altura de ativação da Mainnet NU7 ([zkool2#1388](https://github.com/hhanh00/zkool2/pull/1388)).

6.35.0 também aceita **chaves de visualização de entrada unificadas**. Cole uma chave `uivk…` em qualquer lugar onde uma chave possa ser inserida e Zkool cria uma conta somente de entrada: ela mostra o que a conta original recebe, incluindo memorandos, e nada do que envia ([zkool2#1348](https://github.com/hhanh00/zkool2/pull/1348)). Uma chave de entrada não consegue ver os gastos, então o saldo da conta corresponde ao total recebido, não ao que resta, e a conta não pode gastar. Zkool também pode exportar a UIVK de uma conta ([zkool2#1347](https://github.com/hhanh00/zkool2/pull/1347)).

### Zallet

```bash
zallet rpc z_importviewingkey '"<zxviews… key>"' '"whenkeyisnew"' 0
```

O segundo argumento é a política de reescaneamento: `"whenkeyisnew"` (o padrão), `"yes"` ou `"no"`. O terceiro é a altura de bloco a partir da qual reescanear. A Zallet importa a chave como uma conta somente de visualização e acompanha as transações recebidas e enviadas de seus endereços sem autoridade de gasto.

**A Zallet importa apenas chaves de visualização completas estendidas Sapling.** Ela não importa uma chave de visualização completa unificada `uview…`, embora consiga exportar uma. Para conceder acesso de leitura a uma conta unificada inteira, exporte a UFVK da Zallet e importe-a em uma carteira que aceite chaves unificadas, como a Zkool.

Para transformar uma chave importada em um arquivo completo de histórico de transações, com txids, taxas e memorandos, consulte [Exportando o histórico de transações de uma Viewing Key](/guides/viewing-key-transaction-export).

## O que mudou e o que deixar de procurar

Se você seguiu uma versão mais antiga desta página, ou uma tradução dela, três caminhos não funcionam mais.

- **`zcash-cli z_exportviewingkey` e `z_importviewingkey`.** O zcashd atingiu sua parada de fim de suporte em 18 de julho de 2026 e não funciona mais. Os métodos de mesmo nome da Zallet são o substituto; consulte o [guia de migração](/guides/migration-guide-zcashd-to-zebrad-zallet).
- **O passo a passo da Ywallet.** A página Carteiras marca a Ywallet como **Ironwood: Not Ready**, então ela não é a carteira a indicar para chaves de visualização da era Ironwood. A Zkool, do mesmo desenvolvedor, aceita a mesma variedade de chaves e está marcada como Ready.
- **zcashblockexplorer.com/vk.** O serviço retorna HTTP 503 com um certificado inválido, e foi removido em vez de substituído. Colar uma chave de visualização em um site entrega todo o seu histórico de transações a quem administra esse site, o que sempre foi a mais fraca das três opções da página antiga. Em vez disso, importe a chave em uma carteira que você mesmo executa.

## Visual / Analogia

### A janela do auditor

Pense em uma conta blindada como uma sala de cofres em um banco:

- A **chave de gastos** é a chave da sala. Quem a possui pode abrir os cofres e retirar o conteúdo.
- Uma **chave de visualização** é a janela do auditor para essa sala. O auditor pode observar cada cofre entrar e sair, ler as etiquetas e manter um livro-razão — mas a janela não tem maçaneta. Nada dentro da sala pode ser movido pela pessoa que olha através dela.

### O que a janela não consegue mostrar

A janela está voltada para a sala, não para o mundo lá fora. Ela mostra a atividade blindada da conta observada; ela não transforma o observador em alguém que vê a blockchain inteira, nem permite que ele correlacione a atividade da conta com o histórico não blindado de outras pessoas. E, como a janela é instalada no nível da conta, dar a alguém um olho mágico para um único cofre (um único endereço) ainda lhe dá a visão de entrada da sala inteira — e é exatamente por isso que existe a regra da chave mais restrita.

### Por que você não pode pegar a janela de volta

Uma chave de visualização é uma informação, não uma entrada de permissão. Uma vez copiada, ela existe até que os fundos saiam da conta que ela observa. A solução prática é a rotação: mova os saldos para uma conta nova cujas chaves a outra parte nunca recebeu, e a janela antiga passará a dar para uma sala vazia.

## Aprofundamento

### Decriptação de teste: como a visualização realmente funciona

Toda transação blindada criptografa os textos simples de suas notes para o destinatário pretendido. Uma carteira que possui uma chave de visualização realiza a **decriptação de teste**: para cada transação que encontra na chain, tenta decriptar os textos cifrados das notes com a chave. Os acertos revelam o valor da note, o diversificador do destinatário e o memorando. Um erro custa aproximadamente o mesmo que um acerto, porque a etapa mais custosa, um acordo de chaves, ocorre antes de a carteira conseguir identificar se a note é dela. Por isso, o custo da varredura aumenta com cada chave que a carteira monitora (consulte [Como detectar pagamentos blindados](Detecting_Shielded_Payments.md)). É por isso que a mesma chave de visualização de entrada continua funcionando nas pools Orchard e Ironwood — [ZIP 326](https://zips.z.cash/zip-0326) vincula um receptor ao Orchard *protocolo*, de modo que os textos cifrados de notes Ironwood têm o formato Orchard e são decriptados por teste com as chaves de visualização Orchard da conta sob o domínio de criptografia de notes Ironwood.

### Completa vs de entrada: o que a derivação determina

Uma chave de visualização **completa** pode derivar a capacidade de visualização de saída, que é o que permite a um auditor reconstruir o lado do *remetente* de uma transferência depois que a transação é decriptada. Uma chave de visualização **de entrada** para deliberadamente antes disso: ela detecta e decripta notes recebidas, mas não consegue reconstruir o vínculo de saída. A derivação entre essas capacidades é unidirecional — a chave de entrada é derivada *a partir* da chave completa, nunca o contrário — e é isso que torna "somente entrada" uma redução real, e não uma promessa. A flag `use_qsk` do [ZIP 2005](https://zips.z.cash/zip-2005) altera a própria derivação, então as chaves recuperáveis em cenário quântico são uma família de chaves totalmente diferente, e não uma variante da antiga.

### Como a migração aparece para quem observa

Como a migração do [ZIP 318](https://zips.z.cash/zip-0318) é uma série aleatória de pequenas transações uniformes Orchard-para-Ironwood, quem observa com a chave vê uma escada: muitos degraus de valor em denominações canônicas, em vez de um único salto. Nenhuma etapa isolada revela o saldo total sendo migrado, mas o *padrão* é reconhecível — esse é o compromisso pretendido de uma catraca auditável.

## Implicações práticas

- **Para corretoras e processadores de pagamento:** carregue a chave de visualização de entrada da conta (ou a UFVK, para cobertura completa) em um nó de detecção e concilie os depósitos dos clientes automaticamente, exatamente como você faria com um endereço transparente — mas a chave de gastos do cliente nunca sai do armazenamento a frio.
- **Para auditores e prova de reservas:** uma chave de visualização completa transforma "confie em nós" em "verifique isto": saldos e histórico completo de transações das contas observadas, sem nenhuma capacidade de tocá-los. Combine com [Divulgações de pagamento](/zcash-tech/payment-disclosures) para provas pontuais sobre um único pagamento.
- **Para due diligence:** entregue a uma contraparte a chave da conta relevante para o trabalho, não a sua carteira inteira. Se o relacionamento terminar, faça a rotação da conta.
- **Para a escolha de ferramentas:** a Zallet exporta UFVKs e importa chaves de visualização completas estendidas Sapling; a Zkool aceita chaves unificadas e legadas como contas somente de observação. Consulte a página [Carteiras](/using-zcash/wallets) para ver a matriz atual de prontidão para o Ironwood antes de padronizar o uso de uma carteira.
- **O custo da divulgação é permanente:** cada detentor adicional de uma chave é uma linha de crédito de privacidade permanente que você não consegue encerrar. Emita chaves por relacionamento, restrinja-as a uma conta e documente quem possui o quê.

## Erros comuns

| Crença comum | O que realmente acontece |
| --- | --- |
| "Uma chave de visualização pode gastar os fundos se vazar." | Não pode. As chaves de visualização não têm autoridade de gasto; o pior que um vazamento faz é revelar o histórico. |
| "Posso revogar uma chave de visualização depois." | Não pode. Uma chave entregue funciona até que os fundos sejam movidos para uma conta cujas chaves a outra parte não possui. |
| "Exportar uma UIVK para um endereço mostra apenas esse endereço." | As chaves de visualização abrangem a conta. Uma UIVK mostra a atividade de entrada de todas as pools da conta. |
| "O `zcash-cli z_exportviewingkey` ainda funciona." | Não. O zcashd atingiu sua parada de fim de suporte em 18 de julho de 2026; use os métodos `z_exportviewingkey` / `z_importviewingkey` da Zallet em vez disso. |
| "Colar uma chave de visualização em uma ferramenta web é seguro porque é somente leitura." | Somente leitura ainda significa que todo o seu histórico de transações daquela conta é entregue a quem administra o site. Importe a chave em uma carteira que você mesmo executa. |
| "A Zallet consegue importar qualquer chave de visualização que a Zallet consegue exportar." | Não. A Zallet importa apenas chaves de visualização completas estendidas Sapling; as chaves unificadas `uview…` devem ir para carteiras que aceitam chaves unificadas, como a Zkool. |

## Páginas relacionadas

- [Divulgações de pagamento](/zcash-tech/payment-disclosures) — comprovar detalhes selecionados de um pagamento sem conceder acesso contínuo a uma conta
- [Endereços unificados](/zcash-tech/unified-addresses) — a camada de endereços que carrega os receptores das chaves de visualização
- [Ironwood](/zcash-tech/ironwood) — a pool blindada do NU6.3 para a qual o Orchard migra
- [A catraca](/zcash-tech/the-turnstile) — o mecanismo de migração Orchard-para-Ironwood que os observadores podem acompanhar
- [Carteiras](/using-zcash/wallets) — o diretório completo de carteiras, suporte a chaves de visualização e prontidão para o Ironwood
- [Exportando o histórico de transações de uma Viewing Key](/guides/viewing-key-transaction-export) — transformar uma chave importada em um arquivo completo de histórico com txid, taxa e memorando

## Recursos

Use chaves de visualização apenas quando necessário e prefira a chave mais restrita que responda à pergunta feita.

- [Divulgações de pagamento](/zcash-tech/payment-disclosures) - comprovar detalhes selecionados de um pagamento sem conceder acesso contínuo a uma conta
- [ZIP 326: consequências do NU6.3 para carteiras](https://zips.z.cash/zip-0326) — como as chaves de visualização se comportam nas pools Orchard e Ironwood
- [ZIP 229: formato de transação versão 6](https://zips.z.cash/zip-0229) — define as pools Orchard e Ironwood
- [ZIP 310](https://zips.z.cash/zip-0310) — especificação das chaves de visualização
- [Changelog da Zallet](https://github.com/zcash/zallet/blob/main/CHANGELOG.md) — qual versão adicionou cada método RPC
- [README da Zkool](https://github.com/hhanh00/zkool2/blob/main/README.md) — tipos de conta e de chave suportados
- [ECC, Explicando as chaves de visualização](https://electriccoin.co/blog/explaining-viewing-keys/)
- [ECC, Divulgação seletiva e chaves de visualização](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ECC, apresentação em vídeo Zcash Viewing Key](https://www.youtube.com/watch?v=NXjK_Ms7D5U&t=199s)
