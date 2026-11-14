<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Heartwood.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Heartwood

> Heartwood entrou em operação na mainnet do Zcash no bloco 903.000 (16 de julho de 2020 UTC).

O que você vai aprender: como o Heartwood permitiu que os mineradores recebessem as recompensas de bloco diretamente em endereços blindados e como ele tornou a prova de trabalho do Zcash verificável por clientes leves.

Heartwood é uma [atualização da rede](../start-here/network-upgrades) do Zcash, um hard fork das regras de consenso cuja implantação é definida na [ZIP 250](https://zips.z.cash/zip-0250). Ele reuniu duas mudanças de funcionalidade: a [ZIP 213](https://zips.z.cash/zip-0213) (Coinbase blindada) e a [ZIP 221](https://zips.z.cash/zip-0221) (FlyClient). O Heartwood foi a quarta grande atualização da rede do Zcash e contou com o apoio conjunto da [Electric Coin Company](../zcash-organizations/electric-coin-company) e da [Zcash Foundation](../zcash-organizations/zcash-foundation). Como toda atualização do Zcash, ele definiu um novo consensus branch id, uma marcação que oferece proteção contra replay nos dois sentidos, de modo que uma transação criada sob as novas regras não pode ser reproduzida na chain antiga, e vice-versa.

O Heartwood é ativado em uma altura de bloco definida (903.000), e não em um horário fixo, então o minuto exato que você vê em um painel pode variar um pouco de um lugar para outro. O bloco, e o momento, são os mesmos.

Por que isso importa. Os mineradores ganham ZEC recém-criados toda vez que mineram um bloco. Antes do Heartwood, essa renda precisava cair em um endereço transparente, que é público. Qualquer pessoa podia acompanhar quanto um minerador ganhava e para onde as moedas iam depois. O Heartwood permitiu que essa recompensa fosse direto para um endereço blindado, de modo que o pagamento de um minerador pode permanecer privado. Ele também tornou possível que carteiras leves e outras chains verifiquem a prova de trabalho do Zcash sem baixar a chain inteira.

## Coinbase blindada

A transação coinbase é a transação especial que paga a recompensa de um bloco. Antes do Heartwood, as saídas dela tinham de ser transparentes, então os ZEC recém-criados de um minerador sempre começavam a vida em um endereço público. O Heartwood alterou as regras de consenso para que, nas palavras da ZIP 213, as transações coinbase possam conter saídas Sapling. Em termos simples, os mineradores agora podem receber recompensas diretamente em endereços Sapling blindados. As saídas coinbase transparentes continuam sendo aceitas, então trata-se de uma nova opção, não de uma mudança obrigatória.

![Antes do Heartwood, a recompensa de bloco de um minerador tinha que ir para um endereço público transparente. Depois do Heartwood, as transações coinbase podem conter saídas Sapling, então a recompensa pode ir diretamente para um endereço blindado](/content-images/heartwood-shielded-coinbase-3bf38ae60d.webp)

## Por que Sapling primeiro

A coinbase blindada tem como alvo especificamente as saídas Sapling, e há um motivo para isso. A ZIP 213 explica que a atualização Sapling trouxe mudanças de arquitetura e melhorias de desempenho que tornaram viável blindar fundos diretamente na transação coinbase. O pool blindado original Sprout exigia recursos demais para blindar diretamente na coinbase. O sistema de provas mais eficiente e o formato de note do Sapling tornaram isso prático. O próprio Sapling havia ampliado a regra mais antiga que proibia saídas coinbase blindadas, para que ela também abrangesse as saídas Sapling, e o Heartwood flexibiliza essa regra para permiti-las. É um bom exemplo de como as atualizações do Zcash se apoiam umas nas outras: a infraestrutura de uma atualização se torna a base da seguinte.

## FlyClient

O Heartwood também alterou aquilo com que o cabeçalho de um bloco se compromete. O campo do cabeçalho antes chamado hashFinalSaplingRoot foi reaproveitado e renomeado para hashLightClientRoot. Agora ele se compromete com a raiz de uma Merkle Mountain Range (MMR), uma estrutura cumulativa construída sobre os dados de cabeçalho e os metadados dos blocos anteriores, como timestamps, alvos de dificuldade, raízes Sapling, trabalho acumulado e número de transações. Esse compromisso permite que um light client, ou uma chain externa, verifique a prova de trabalho do Zcash usando uma prova pequena, cujo tamanho cresce apenas de forma logarítmica com o comprimento da chain. O resultado são carteiras light client melhores e uma integração mais fácil com terceiros e cross-chain, porque um cliente não precisa mais baixar todos os blocos para confiar no trabalho por trás da chain.

![Fluxo do FlyClient: os dados do cabeçalho de cada bloco são comprometidos em uma raiz de Merkle Mountain Range (hashLightClientRoot), o que permite que um light client verifique a prova de trabalho com uma prova pequena, de tamanho logarítmico](/content-images/heartwood-flyclient-0c6b5bda0d.webp)

## Onde o Heartwood se encaixa

O Heartwood é um passo em uma sequência de atualizações do Zcash, cada uma adicionando uma peça da qual a próxima depende. O Overwinter e o Sapling chegaram em 2018, o Blossom em 2019 e o Heartwood em 2020, no bloco 903.000. O Canopy veio mais tarde em 2020, no bloco 1.046.400. O Sapling é o elo principal dessa cadeia para o Heartwood: seu mecanismo eficiente de transações blindadas foi a pré-condição técnica que tornou possível a coinbase blindada.

![Linha do tempo das atualizações do Zcash: Overwinter e Sapling em 2018, Blossom em 2019 e Heartwood em 2020](/content-images/heartwood-timeline-99bc79b6e9.webp)

## TL;DR

- O Heartwood foi ativado no bloco 903.000 da mainnet (16 de julho de 2020 UTC), implantado pela ZIP 250 com um novo consensus branch id para proteção contra replay nos dois sentidos.
- ZIP 213 (Coinbase blindada): as transações coinbase podem conter saídas Sapling, então os mineradores podem receber recompensas de bloco diretamente em um endereço blindado.
- ZIP 221 (FlyClient): o campo hashLightClientRoot do cabeçalho agora se compromete com uma Merkle Mountain Range, permitindo que light clients verifiquem a prova de trabalho com provas que crescem apenas de forma logarítmica.
- As saídas coinbase transparentes continuam totalmente aceitas — a coinbase blindada é uma nova opção, não uma obrigação.
- A ativação acontece em uma altura de bloco, não em um horário, então o minuto exato varia entre painéis e fusos horários.

## Explicação central

Antes do Heartwood, os ZEC recém-criados de um minerador tinham de começar a vida em um endereço transparente, então qualquer pessoa podia acompanhar a renda de um minerador e rastrear para onde ela ia. A ZIP 213 flexibilizou a regra de consenso para que a transação coinbase possa pagar saídas Sapling, mantendo o pagamento de um minerador privado desde o primeiro momento de existência. Ela tem como alvo especificamente o Sapling porque as provas eficientes do Sapling tornaram prática a blindagem dentro da coinbase; as provas pesadas do Sprout não eram viáveis ali.

A ZIP 221 reaproveitou o campo de cabeçalho hashFinalSaplingRoot como hashLightClientRoot. Agora ele se compromete com uma Merkle Mountain Range construída sobre os dados de cabeçalho dos blocos anteriores — timestamps, alvos de dificuldade, raízes Sapling, trabalho acumulado, número de transações. Assim, um light client ou outra chain pode verificar a prova de trabalho do Zcash com uma prova pequena, em vez de baixar todos os blocos.

## Analogia visual

Antes: o pagamento de cada minerador era afixado em um mural público — o valor e o rastro podiam ser lidos por qualquer pessoa. Depois: o pagamento pode chegar em um envelope lacrado. E cada novo bloco agora carrega um pequeno selo de cera que resume todos os blocos anteriores, para que um desconhecido possa confirmar toda a cadeia de trabalho com uma olhada, em vez de ler cada página.

## Aprofundamento

A mudança de regra tinha um histórico: o Sapling havia ampliado a proibição original de coinbase blindada para também abranger as saídas Sapling, e o Heartwood removeu essa restrição para permiti-las — um exemplo claro de como a infraestrutura de uma atualização se torna a base da seguinte. O compromisso MMR traz benefícios para carteiras leves e para a integração cross-chain, em que verificar o trabalho do Zcash antes exigia baixar a chain inteira. O consensus branch id adicionado na ativação oferece proteção contra replay nos dois sentidos: uma transação criada sob as novas regras não pode ser reproduzida na chain antiga, e vice-versa.

## Erros comuns

- **Pensar que a coinbase blindada se tornou obrigatória.** As saídas coinbase transparentes continuam válidas; os mineradores escolhem.
- **Supor que o Sprout pode receber coinbase blindada.** Somente saídas Sapling são permitidas — as provas do Sprout exigiam recursos demais.
- **Acreditar que o FlyClient elimina a necessidade de nós integrais.** Ele atende light clients e verificadores cross-chain; os nós integrais continuam sendo a base da rede.
- **Procurar um horário fixo de ativação.** A ativação foi definida no bloco 903.000, então o minuto no relógio varia.
- **Confundir hashLightClientRoot com o antigo hashFinalSaplingRoot.** O mesmo campo foi reaproveitado e renomeado.


## Glossário

| Termo | Significado em linguagem simples |
|---|---|
| Network upgrade (NU) | Uma mudança coordenada nas regras de consenso do Zcash, ativada em uma altura de bloco definida |
| Coinbase transaction | A transação especial em cada bloco que paga a recompensa do bloco |
| Shielded Sapling address | Um tipo de endereço Zcash privado introduzido pela atualização Sapling |
| Shielded coinbase | A mudança do Heartwood que permite que as recompensas de bloco sejam pagas em endereços Sapling blindados |
| FlyClient | Um método que permite que light clients verifiquem a prova de trabalho com provas pequenas |
| Merkle Mountain Range (MMR) | Um resumo cumulativo dos blocos anteriores com o qual o cabeçalho do bloco se compromete |
| Consensus branch id | Uma marcação que identifica quais regras de atualização uma transação segue, usada para proteção contra replay |

## Perguntas frequentes

O Heartwood altera meus ZEC ou minha privacidade? Não. O Heartwood não mexeu nos seus fundos existentes. Ele adicionou a opção de os mineradores receberem recompensas em endereços blindados e melhorou o suporte a light clients. Seus saldos e suas transações blindadas não são afetados.

O que é a coinbase blindada? A coinbase é a transação que paga a recompensa de um bloco. O Heartwood permite que essa recompensa vá para um endereço Sapling blindado em vez de um transparente, de modo que a renda dos mineradores pode permanecer privada.

Os mineradores agora são obrigados a receber as recompensas de forma blindada? Não. A coinbase blindada é opcional. As saídas coinbase transparentes continuam aceitas, então os mineradores podem escolher qualquer uma das duas.

Por que a coinbase blindada usa o Sapling e não o pool mais antigo Sprout? Porque o design mais eficiente do Sapling tornou prática a blindagem diretamente na coinbase. O pool Sprout anterior exigia recursos demais para isso.

O que mudou para os light clients? O cabeçalho do bloco agora se compromete com uma Merkle Mountain Range sobre os blocos anteriores por meio do campo hashLightClientRoot. Isso permite que light clients e outras chains verifiquem a prova de trabalho do Zcash com provas pequenas, de tamanho logarítmico, em vez da chain inteira.

## Teste seu entendimento

Antes do Heartwood, por que a recompensa de bloco paga a um minerador aparecia publicamente, e o que o Heartwood mudou?

<details>
<summary>Resposta</summary>

As saídas Coinbase tinham de ser transparentes, então a recompensa recém-criada de um minerador sempre caía em um endereço transparente público que qualquer pessoa podia inspecionar. O Heartwood alterou as regras de consenso (ZIP 213) para que as transações coinbase possam conter saídas Sapling, permitindo que os mineradores recebam suas recompensas diretamente em endereços blindados.
</details>

### Recursos

[ZIP 250: Implantação da atualização da rede Heartwood](https://zips.z.cash/zip-0250)

[ZIP 213: Coinbase blindada](https://zips.z.cash/zip-0213)

[ZIP 221: FlyClient - Mudanças na camada de consenso](https://zips.z.cash/zip-0221)

[Atualização da rede Heartwood](https://z.cash/upgrade/heartwood/)

### Veja também

[Atualizações da rede do Zcash](../start-here/network-upgrades)

[Pools blindados](../using-zcash/shielded-pools)

[Carteiras](../using-zcash/wallets)

[zk-SNARKs](../zcash-tech/zk-snarks)

[Electric Coin Company](../zcash-organizations/electric-coin-company)

[Zcash Foundation](../zcash-organizations/zcash-foundation)

---

## Páginas relacionadas

- [Sapling](./Sapling.md) — o mecanismo eficiente que tornou viável a coinbase blindada
- [Canopy](./Canopy.md) — a próxima atualização da série
- [Nós integrais](./Full_Nodes.md) — o que a verificação completa ainda oferece
- [O que um explorador de blocos pode ver](./What_a_Block_Explorer_Can_See.md) — o que a coinbase transparente e a blindada revelam


Série: [Índice das atualizações da rede](../start-here/network-upgrades) · Anterior: [Blossom](../zcash-tech/blossom) · Próxima: [Canopy](../zcash-tech/canopy)
