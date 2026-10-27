<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Viewing_Keys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# Chaves de visualização

Os endereços blindados permitem que você faça transações revelando o mínimo possível na blockchain do Zcash. Então, o que acontece quando *você precisa* mostrar a uma parte específica o que possui ou o que enviou? Cada endereço blindado tem uma chave de visualização que concede acesso de leitura sem conceder a capacidade de gastar. As chaves de visualização foram introduzidas na [ZIP 310](https://zips.z.cash/zip-0310) e adicionadas ao protocolo na atualização da rede Sapling.

Uma chave de visualização é a ferramenta de divulgação seletiva: você escolhe quem vê o quê e nunca concede autoridade de gasto ao fazer isso.

## TL;DR

Uma chave de visualização concede acesso **somente de leitura** à atividade de um endereço ou conta blindada do Zcash: quem a detém pode ver transações recebidas (e, no caso de chaves de visualização completas, enviadas), mas nunca pode gastar.

- **O que é:** a ferramenta de divulgação seletiva dos pools blindados. Introduzida na [ZIP 310](https://zips.z.cash/zip-0310), adicionada ao protocolo na atualização da rede Sapling.
- **O que concede:** detecção de depósitos (chaves de entrada `uivk…`) ou visibilidade total de entradas/saídas para uma conta (chaves de visualização completas unificadas `uview…`), e chaves Sapling `zxviews…` legadas.
- **O que não concede:** autoridade de gasto. Nada que um detentor de chave de visualização faça pode mover fundos.
- **Onde funciona hoje:** exportação/importação no [Zallet](https://github.com/zcash/zallet) (v0.1.0-beta.2+, `z_exportviewingkey` / `z_importviewingkey`) e contas somente para consulta em carteiras como Zkool; consulte a página [Carteiras](/using-zcash/wallets) para a matriz de suporte atual.
- **A regra prática:** prefira a chave mais restrita que responda à pergunta feita e lembre-se de que uma chave fornecida não pode ser revogada — apenas superada movendo os fundos.

---

## Por que usar uma chave de visualização?

O texto da Electric Coin Company sobre o tema apresenta as situações que surgem com mais frequência e continuam sendo as mais comuns atualmente:

- **Uma corretora monitorando depósitos.** A corretora carrega uma chave de visualização de entrada em um nó de detecção exposto à Internet para poder detectar depósitos de clientes em um endereço blindado, enquanto a chave de gastos permanece em hardware que nunca se conecta à rede.
- **Um custodiante comprovando suas participações.** O custodiante fornece a um auditor uma chave de visualização completa para cada endereço blindado. O auditor pode verificar esses saldos e analisar a atividade passada de e para esses endereços, sem poder fazer mais nada.
- **Diligência prévia sobre uma contraparte.** Quando uma corretora precisa analisar o histórico blindado de um cliente no contexto de diligência prévia reforçada, pode pedir a chave de visualização em vez dos fundos.

## O que uma chave de visualização revela e não revela

Há mais de um tipo de chave, e a diferença determina o quanto ela divulga.

| Chave | Prefixo | Concede |
|---|---|---|
| Chave de visualização completa unificada (UFVK) | `uview…` | Vê transações recebidas **e** enviadas para todos os pools da conta |
| Chave de visualização de entrada unificada (UIVK) | `uivk…` | Vê apenas transações recebidas, para todos os pools da conta |
| Chave de visualização completa estendida Sapling | `zxviews…` | Vê atividade Sapling recebida e enviada para os endereços da chave |

Nenhuma delas pode gastar. Todas são permanentes no sentido que importa: uma chave que você forneceu não pode ser revogada, apenas superada movendo os fundos para uma conta cujas chaves a outra parte não detém.

Há duas armadilhas de divulgação que vale a pena conhecer antes de compartilhar algo.

**Entrada não significa restrita.** Uma chave de visualização de entrada unificada abrange toda a conta, não apenas o endereço sobre o qual perguntaram a você. Exportar uma UIVK para um único endereço Sapling ainda concede visibilidade de entradas em todos os pools dessa conta, portanto divulga mais do que o endereço que ela nomeia. O Livro [Zallet](https://zcash.github.io/zallet/zcashd/json_rpc.html) declara isso explicitamente.

**Um endereço publicado já expõe sua chave de visualização de entrada a um futuro adversário.** A [ZIP 326](https://zips.z.cash/zip-0326) observa que um adversário com um computador quântico poderia recuperar a chave de visualização de entrada a partir de um endereço diversificado publicado, algo viável de uma forma que a recuperação da chave de nulificador não é. Publicar um endereço não é o mesmo que publicar uma chave de visualização atualmente, mas os dois se aproximam ao longo de um horizonte suficientemente longo.

## Chaves de visualização após Ironwood

A NU6.3 introduziu o pool blindado Ironwood e tornou o pool Orchard somente para gastos, portanto os fundos migram de um para o outro ao longo do tempo. Consulte [Ironwood](/zcash-tech/ironwood) e [A catraca](/zcash-tech/the-turnstile) para a própria atualização.

**Uma chave de visualização emitida antes de Ironwood continua funcionando após a migração.** A ZIP 326 especifica que um receptor, e sua respectiva chave de visualização de entrada, está associado ao *protocolo* Orchard e não a um pool: a mesma chave de visualização de entrada realiza descriptografia experimental tanto de textos cifrados de notes do pool Orchard quanto do pool Ironwood. Zallet implementa isso dessa forma, descrevendo notes Ironwood como tendo formato Orchard e sendo descriptografadas experimentalmente com as chaves de visualização Orchard da conta sob o domínio de criptografia de notes Ironwood.

Três consequências para quem detém ou emite uma chave:

1. **Os saldos movem-se entre pools, e o observador vê isso acontecer.** A [ZIP 318](https://zips.z.cash/zip-0318) especifica a migração como uma série de pequenas transações Orchard-para-Ironwood deliberadamente uniformes, difundidas segundo um calendário aleatorizado, cada uma gastando uma note Orchard e produzindo uma saída Ironwood de denominação canônica. Um auditor que observa com uma chave de visualização vê as participações passarem de um pool para o outro em etapas ao longo de semanas, não em um único movimento. Uma carteira pode reconstruir seu próprio progresso de migração a partir dos dados da chain usando suas chaves de visualização.
2. **Cada etapa de migração revela o valor que move.** Isso é inerente a atravessar uma catraca e é o que torna a migração auditável. Dividir o saldo em denominações canônicas significa que nenhuma transação individual revela todo o saldo do pool Orchard.
3. **As contas criadas após Ironwood podem derivar suas chaves de forma diferente.** A [ZIP 2005](https://zips.z.cash/zip-2005) adiciona uma flag `use_qsk` para chaves recuperáveis por computação quântica e altera a forma como são derivadas as chaves de entrada, saída e diversificador, portanto as chaves `use_qsk = true` são genuinamente diferentes. A ZIP 326 exige que a flag seja uniforme em uma conta e proíbe a geração de chaves `use_qsk = true` antes da ativação da NU6.3 na Mainnet. Assim, uma chave exportada de uma conta que existia antes de Ironwood é uma chave `use_qsk = false` e permanece correta para essa conta. Não presuma que uma chave exportada de uma conta descreve outra.

## Exportar uma chave de visualização

### Zallet

[Zallet](https://github.com/zcash/zallet) é a carteira de nó integral que substituiu a carteira dentro do zcashd. A exportação e importação de chaves de visualização chegaram na **v0.1.0-beta.2 (28 de julho de 2026)**, então primeiro verifique sua versão; compilações anteriores não têm esses métodos. Cada argumento após o nome do método deve ser JSON válido, o que significa que os valores de texto mantêm suas próprias aspas duplas. O Guia de Referência Rápida [Zallet](/using-zcash/zallet-quick-reference-guide) aborda o estilo geral de comandos.

Liste o que a carteira detém:

```bash
zallet rpc listaddresses
```

Exporte a chave de visualização completa unificada da conta passando um endereço unificado:

```bash
zallet rpc z_exportviewingkey '"<unified address>"'
```

Exporte primeiro a chave de visualização de entrada unificada da conta, usando o argumento opcional `ivk`:

```bash
zallet rpc z_exportviewingkey '"<unified address>"' true
```

Passar um endereço Sapling retorna a chave de visualização completa estendida Sapling dessa conta (`zxviews…`), correspondendo ao comportamento antigo do zcashd. Dois limites documentados: os endereços Sprout são rejeitados e uma chave de visualização completa estendida Sapling não pode ser exportada de uma conta que tenha sido importada somente para consulta, porque a carteira não consegue reconstruí-la. A forma `ivk` funciona para contas importadas somente para consulta.

### Carteiras que exportam chaves de visualização pela própria interface

A página [Carteiras](/using-zcash/wallets) acompanha o suporte para chaves de visualização e a preparação para Ironwood de cada carteira. Na data da redação, as carteiras que indicam suporte para chaves de visualização e **Ironwood: Pronto** incluem ZODL, Zingo!, Zkool, Cake, Zallet, zecd e Nozy. Consulte essa página, em vez desta, antes de confiar em qualquer carteira específica, porque a preparação muda.

## Importar uma chave de visualização como conta somente para consulta

### Zkool

[Zkool](https://github.com/hhanh00/zkool2) é a opção mais flexível aqui, porque aceita chaves unificadas e também legadas. Seu README documenta contas somente para consulta criadas a partir de uma **chave de visualização unificada** ou de uma **chave de visualização estendida Sapling**, juntamente com chaves estendidas blindadas legadas exportadas do zcashd. Adicione uma nova conta, escolha a opção somente para consulta e cole a chave `uview…` ou `zxviews…`; a conta então sincroniza e apresenta saldos e histórico sem autoridade de gasto.

O suporte ao protocolo Ironwood e a migração de Orchard para Ironwood chegaram no Zkool 6.24.0 (20 de julho de 2026), e a 6.26.1 (2 de agosto de 2026) corrigiu a detecção de transações Ironwood no mempool. Use a 6.26.1 ou posterior.

### Zallet

```bash
zallet rpc z_importviewingkey '"<zxviews… key>"' '"whenkeyisnew"' 0
```

O segundo argumento é a política de nova análise: `"whenkeyisnew"` (o padrão), `"yes"` ou `"no"`. O terceiro é a altura do bloco a partir da qual fazer uma nova análise. Zallet importa a chave como conta somente para consulta e acompanha transações recebidas e enviadas para seus endereços sem autoridade de gasto.

**Zallet importa apenas chaves de visualização completas estendidas Sapling.** Não importa uma chave de visualização completa unificada `uview…`, apesar de poder exportar uma. Para conceder acesso de leitura a uma conta unificada inteira, exporte a UFVK do Zallet e importe-a para uma carteira que aceite chaves unificadas, como Zkool.

Para transformar uma chave importada em um arquivo completo de histórico de transações, com txids, taxas e memorandos, consulte [Exportar histórico de transações de uma Viewing Key](/guides/viewing-key-transaction-export).

## O que mudou e o que você deve deixar de procurar

Se você seguiu uma versão mais antiga desta página, ou uma tradução dela, três caminhos já não funcionam.

- **`zcash-cli z_exportviewingkey` e `z_importviewingkey`.** zcashd chegou ao fim do suporte em 18 de julho de 2026 e deixou de funcionar. Os métodos com o mesmo nome do Zallet são a substituição; consulte o guia de migração [](/guides/migration-guide-zcashd-to-zebrad-zallet).
- **O guia passo a passo Ywallet.** A página Wallets marca Ywallet como **Ironwood: Não pronto**, portanto não é a carteira para a qual você deve encaminhar as pessoas quanto a chaves de visualização da era Ironwood. Zkool, do mesmo desenvolvedor, aceita a mesma variedade de chaves e está marcada como Pronto.
- **zcashblockexplorer.com/vk.** O serviço retorna HTTP 503 com um certificado inválido e foi removido em vez de substituído. Colar uma chave de visualização em um website entrega todo o seu histórico de transações a quem opera esse website, o que sempre foi a mais fraca das três opções da página antiga. Em vez disso, importe a chave para uma carteira que você controla.

## Visual / Analogia

### A janela do auditor

Pense em uma conta blindada como uma sala de cofres em um banco:

- A **chave de gastos** é a chave da sala. Quem a detém pode abrir caixas e retirar conteúdos.
- Uma **chave de visualização** é a janela do auditor para essa sala. O auditor pode observar cada caixa entrando e saindo, ler as etiquetas e manter um registro — mas a janela não tem puxador. Nada dentro da sala pode ser movido pela pessoa que olha através dela.

### O que a janela não pode mostrar

A janela está voltada para a sala, não para o mundo exterior. Mostra a atividade blindada da conta observada; não transforma o observador em um observador de toda a blockchain, nem permite que ele correlacione a atividade da conta com o histórico não blindado de outra pessoa. E, como a janela está instalada no nível da conta, dar a alguém uma pequena janela para uma caixa de depósito (um único endereço) ainda dá a essa pessoa a visão de entradas de toda a sala — precisamente por isso existe a regra da chave mais restrita.

### Por que não é possível retirar a janela

Uma chave de visualização é uma informação, não uma entrada de permissão. Depois de copiada, ela existe até os fundos saírem da conta que observa. A solução prática é a rotação: mova os saldos para uma conta nova cujas chaves a outra parte nunca recebeu, e a janela antiga ficará voltada para uma sala vazia.

## Análise aprofundada

### Descriptografia experimental: como a visualização realmente funciona

Cada transação blindada criptografa os textos simples de suas notes para o destinatário pretendido. Uma carteira que detém uma chave de visualização realiza **descriptografia experimental**: para cada transação que encontra na chain, tenta descriptografar os textos cifrados das notes com a chave. Os acertos revelam o valor da note, o diversificador do destinatário e o memorando; as falhas não custam nada. É por isso que a mesma chave de visualização de entrada continua funcionando nos pools Orchard e Ironwood — a [ZIP 326](https://zips.z.cash/zip-0326) associa um receptor ao *protocolo* Orchard, portanto os textos cifrados das notes Ironwood têm formato Orchard e são descriptografados experimentalmente com as chaves de visualização Orchard da conta sob o domínio de criptografia de notes Ironwood.

### Completa versus entrada: o que a derivação decide

Uma chave de visualização **completa** pode derivar a capacidade de visualização de saída, que permite a um auditor reconstruir o lado do *remetente* de uma transferência depois que a transação é descriptografada. Uma chave de visualização de **entrada** para deliberadamente antes disso: detecta e descriptografa notes recebidas, mas não consegue reconstruir a ligação de saída. A derivação entre essas capacidades é unidirecional — a chave de entrada é derivada *da* chave completa, nunca o inverso — o que torna “somente entrada” uma redução real, e não uma promessa. A flag `use_qsk` da [ZIP 2005](https://zips.z.cash/zip-2005) altera a própria derivação, portanto as chaves recuperáveis por computação quântica são uma família de chaves inteiramente diferente, e não uma variante da antiga.

### Como a migração aparece para um observador

Como a migração [ZIP 318](https://zips.z.cash/zip-0318) é uma série aleatorizada de pequenas transações uniformes de Orchard para Ironwood, um observador que detém a chave vê uma escadaria: muitos degraus de valor de denominação canônica, em vez de um salto. Nenhum degrau individual revela o saldo total sendo migrado, mas o *padrão* é reconhecível — que é a contrapartida pretendida de uma catraca auditável.

## Implicações práticas

- **Para corretoras e processadores de pagamentos:** carregue a chave de visualização de entrada da conta (ou uma UFVK para cobertura completa) em um nó de detecção e reconcilie automaticamente os depósitos dos clientes, exatamente como faria com um endereço transparente — mas a chave de gastos do cliente nunca sai do armazenamento frio.
- **Para auditores e prova de reservas:** uma chave de visualização completa transforma “confie em nós” em “verifique isto”: saldos e histórico completo de transações das contas observadas, sem qualquer capacidade de tocá-las. Combine-a com [Divulgações de pagamentos](/zcash-tech/payment-disclosures) para provas pontuais sobre um único pagamento.
- **Para diligência prévia:** forneça a uma contraparte a chave da conta relevante para a relação, e não sua carteira inteira. Se a relação terminar, faça a rotação da conta.
- **Para escolhas de ferramentas:** Zallet exporta UFVKs e importa chaves de visualização completas estendidas Sapling; Zkool aceita chaves unificadas e legadas como contas somente para consulta. Consulte a página [Carteiras](/using-zcash/wallets) para a matriz atual de preparação para Ironwood antes de padronizar uma carteira.
- **O custo da divulgação é permanente:** cada detentor adicional de uma chave é uma linha de crédito de privacidade permanente que você não pode encerrar. Emita chaves por relação, limite-as a uma conta e documente quem detém o quê.

## Erros comuns

| Crença comum | O que realmente acontece |
| --- | --- |
| "Uma chave de visualização pode gastar os fundos se vazar." | Não pode. As chaves de visualização não têm autoridade de gasto; o pior que um vazamento pode fazer é divulgar o histórico. |
| "Posso revogar uma chave de visualização mais tarde." | Não pode. Uma chave fornecida funciona até os fundos serem movidos para uma conta cujas chaves a outra parte não detém. |
| "Exportar uma UIVK para um endereço mostra apenas esse endereço." | As chaves de visualização são associadas à conta. Uma UIVK mostra a atividade de entrada de todos os pools da conta. |
| "`zcash-cli z_exportviewingkey` ainda funciona." | Não. zcashd chegou ao fim do suporte em 18 de julho de 2026; use Zallet `z_exportviewingkey` / `z_importviewingkey`. |
| "Colar uma chave de visualização em uma ferramenta web é seguro porque é somente de leitura." | Somente de leitura ainda significa que todo o histórico de transações dessa conta é entregue a quem opera o site. Importe a chave para uma carteira que você controla. |
| "Zallet pode importar qualquer chave de visualização que Zallet pode exportar." | Não. Zallet importa apenas chaves de visualização completas estendidas Sapling; as chaves `uview…` unificadas devem ir para carteiras que aceitem chaves unificadas, como Zkool. |

## Páginas relacionadas

- [Divulgações de pagamentos](/zcash-tech/payment-disclosures) — comprovar detalhes selecionados de um pagamento sem conceder acesso contínuo a uma conta
- [Endereços unificados](/zcash-tech/unified-addresses) — a camada de endereços que contém receptores de chaves de visualização
- [Ironwood](/zcash-tech/ironwood) — o pool blindado NU6.3 para o qual Orchard migra
- [A catraca](/zcash-tech/the-turnstile) — o mecanismo de migração de Orchard para Ironwood que os observadores podem acompanhar
- [Carteiras](/using-zcash/wallets) — o diretório completo de carteiras, suporte para chaves de visualização e preparação para Ironwood
- [Exportar histórico de transações de uma chave de visualização](/guides/viewing-key-transaction-export) — transformar uma chave importada em um arquivo completo de histórico de txid/taxa/memorando

## Recursos

Use chaves de visualização conforme necessário e prefira a chave mais restrita que responda à pergunta feita.

- [Divulgações seletivas de pagamentos](/zcash-tech/payment-disclosures) - comprovar detalhes selecionados de um pagamento sem conceder acesso contínuo a uma conta
- [ZIP 326: Consequências da NU6.3 para carteiras](https://zips.z.cash/zip-0326) — como as chaves de visualização funcionam nos pools Orchard e Ironwood
- [ZIP 229: Formato de transação versão 6](https://zips.z.cash/zip-0229) — define os pools Orchard e Ironwood
- [ZIP 310](https://zips.z.cash/zip-0310) — especificação da chave de visualização
- [Zallet registro de alterações](https://github.com/zcash/zallet/blob/main/CHANGELOG.md) — qual lançamento adicionou qual método RPC
- [Zkool README](https://github.com/hhanh00/zkool2/blob/main/README.md) — tipos de conta e chave suportados
- [ECC, Explicar chaves de visualização](https://electriccoin.co/blog/explaining-viewing-keys/)
- [ECC, Divulgação seletiva e chaves de visualização](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ECC, Apresentação em vídeo Zcash Viewing Key](https://www.youtube.com/watch?v=NXjK_Ms7D5U&t=199s)
