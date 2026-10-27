<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Heartwood.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Heartwood

> Heartwood entrou em funcionamento na mainnet do Zcash no bloco 903.000 (16 de julho de 2020 UTC).

O que você vai aprender: como o Heartwood permitiu que os mineradores recebessem suas recompensas de bloco diretamente em endereços blindados e como tornou a prova de trabalho do Zcash verificável por light clients.

Heartwood é uma [atualização da rede](../start-here/network-upgrades) do Zcash, um hard fork das regras de consenso cuja implementação está definida no [ZIP 250](https://zips.z.cash/zip-0250). Incluiu duas alterações de funcionalidade: [ZIP 213](https://zips.z.cash/zip-0213) (Shielded Coinbase) e [ZIP 221](https://zips.z.cash/zip-0221) (FlyClient). Heartwood foi a quarta grande atualização da rede do Zcash e contou com o suporte conjunto da [Electric Coin Company](../zcash-organizations/electric-coin-company) e da [Zcash Foundation](../zcash-organizations/zcash-foundation). Como todas as atualizações do Zcash, definiu um novo ID de ramificação de consenso, uma etiqueta que fornece proteção bidirecional contra replay, para que uma transação criada segundo as novas regras não possa ser repetida na chain antiga, e vice-versa.

Heartwood é ativado em uma determinada altura de bloco (903.000), e não em um horário fixo, por isso o minuto exato que você vê em um painel pode variar ligeiramente de um local para outro. O bloco e o momento são os mesmos.

Por que isso importa. Os mineradores ganham ZEC recém-criado sempre que mineram um bloco. Antes do Heartwood, essa renda tinha de chegar a um endereço transparente, que é público. Qualquer pessoa podia ver quanto um minerador ganhava e para onde as moedas iam em seguida. Heartwood permitiu que essa recompensa fosse diretamente para um endereço blindado, para que a remuneração de um minerador possa permanecer privada. Também tornou possível que carteiras de light client e outras chains verificassem a prova de trabalho do Zcash sem baixar a chain inteira.

## Coinbase blindado

A transação coinbase é a transação especial que paga a recompensa de um bloco. Antes do Heartwood, suas saídas tinham de ser transparentes, por isso o ZEC recém-criado de um minerador sempre começava em um endereço público. Heartwood alterou as regras de consenso para que, nas palavras do ZIP 213, as transações coinbase possam conter saídas Sapling. Em termos simples, os mineradores agora podem receber recompensas diretamente em endereços Sapling blindados. As saídas coinbase transparentes continuam sendo suportadas, por isso esta é uma nova opção, não uma alteração obrigatória.

![Antes da Heartwood, a recompensa de bloco de um minerador precisava ir para um endereço transparente. Depois da Heartwood, as transações coinbase podem conter saídas Sapling, portanto a recompensa pode ir diretamente para um endereço blindado](/content-images/heartwood-shielded-coinbase-3bf38ae60d.webp)

## Por que Sapling primeiro

O coinbase blindado visa especificamente saídas Sapling, e há uma razão para isso. O ZIP 213 explica que a atualização Sapling trouxe alterações arquitetônicas e melhorias de desempenho que tornaram viável blindar fundos diretamente na transação coinbase. O pool blindado original do Sprout exigia recursos demais para blindar diretamente na coinbase. O sistema de provas mais eficiente e o formato de notes do Sapling tornaram isso prático. O próprio Sapling tinha estendido a regra mais antiga que proibia saídas coinbase blindadas, de modo que essa regra também abrangesse saídas Sapling, e o Heartwood flexibiliza essa regra para permiti-las. É um bom exemplo de como as atualizações do Zcash se apoiam umas nas outras: a infraestrutura de uma atualização se torna a base da seguinte.

## FlyClient

Heartwood também alterou com o que o cabeçalho do bloco se compromete. O campo do cabeçalho anteriormente chamado hashFinalSaplingRoot foi reaproveitado e renomeado para hashLightClientRoot. Agora ele se compromete com a raiz de uma Merkle Mountain Range (MMR), uma estrutura contínua construída sobre os dados do cabeçalho e metadados de blocos anteriores, como timestamps, metas de dificuldade, raízes Sapling, trabalho acumulado e contagens de transações. Esse compromisso permite que um light client, ou uma chain externa, verifique a prova de trabalho do Zcash usando uma pequena prova cujo tamanho cresce apenas de forma logarítmica com o comprimento da chain. O benefício são melhores carteiras de light client e uma integração de terceiros e cross-chain mais fácil, porque um cliente não precisa mais baixar todos os blocos para confiar no trabalho por trás da chain.

![Fluxo do FlyClient: os dados do cabeçalho de cada bloco são comprometidos em uma raiz Merkle Mountain Range (hashLightClientRoot), o que permite a um light client verificar a prova de trabalho com uma pequena prova de tamanho logarítmico](/content-images/heartwood-flyclient-0c6b5bda0d.webp)

## Onde o Heartwood se encaixa

Heartwood é um passo em uma sequência de atualizações do Zcash, cada uma acrescentando uma peça da qual a seguinte depende. Overwinter e Sapling chegaram em 2018, Blossom em 2019 e Heartwood em 2020 no bloco 903.000. Canopy veio depois, em 2020, no bloco 1.046.400. Sapling é o elo-chave desta chain para o Heartwood: seu mecanismo eficiente de transações blindadas foi a pré-condição técnica que tornou possível o coinbase blindado.

![Linha do tempo das atualizações do Zcash: Overwinter e Sapling em 2018, Blossom em 2019 e Heartwood em 2020](/content-images/heartwood-timeline-99bc79b6e9.webp)

## Glossário

| Term | Significado em linguagem simples |
|---|---|
| Network upgrade (NU) | Uma alteração coordenada nas regras de consenso do Zcash, ativada em uma determinada altura de bloco |
| Coinbase transaction | A transação especial em cada bloco que paga a recompensa do bloco |
| Shielded Sapling address | Um tipo de endereço privado do Zcash introduzido pela atualização Sapling |
| Shielded coinbase | A alteração do Heartwood que permite que recompensas de bloco sejam pagas em endereços Sapling blindados |
| FlyClient | Um método que permite que light clients verifiquem a prova de trabalho com pequenas provas |
| Merkle Mountain Range (MMR) | Um resumo contínuo de blocos anteriores com o qual o cabeçalho do bloco se compromete |
| Consensus branch id | Uma etiqueta que identifica as regras de qual atualização uma transação segue, usada para proteção contra replay |

## FAQ

O Heartwood altera meu ZEC ou minha privacidade? Não. O Heartwood não mexeu nos seus fundos existentes. Adicionou a opção de os mineradores receberem recompensas em endereços blindados e melhorou o suporte para light clients. Seus próprios saldos e transações blindadas não são afetados.

O que é coinbase blindado? A coinbase é a transação que paga a recompensa de um bloco. O Heartwood permite que essa recompensa vá para um endereço Sapling blindado em vez de um transparente, para que a renda do minerador possa permanecer privada.

Os mineradores agora são obrigados a receber recompensas blindadas? Não. O coinbase blindado é opcional. As saídas coinbase transparentes continuam sendo suportadas, por isso os mineradores podem escolher qualquer uma das opções.

Por que o coinbase blindado usa Sapling e não o pool Sprout mais antigo? Porque o design mais eficiente do Sapling tornou prático blindar diretamente na coinbase. O pool Sprout anterior exigia recursos demais para isso.

O que mudou para os light clients? O cabeçalho do bloco agora se compromete com uma Merkle Mountain Range sobre blocos anteriores por meio do campo hashLightClientRoot. Isso permite que light clients e outras chains verifiquem a prova de trabalho do Zcash com pequenas provas de tamanho logarítmico em vez da chain inteira.

## Teste sua compreensão

Antes do Heartwood, por que a recompensa de bloco paga a um minerador aparecia publicamente e o que o Heartwood mudou?

<details>
<summary>Resposta</summary>

As saídas coinbase tinham de ser transparentes, por isso a recompensa recém-criada de um minerador sempre chegava a um endereço público transparente que qualquer pessoa podia inspecionar. O Heartwood alterou as regras de consenso (ZIP 213) para que as transações coinbase possam conter saídas Sapling, permitindo que os mineradores recebam suas recompensas diretamente em endereços blindados.
</details>

### Recursos

[ZIP 250: Deployment of the Heartwood Network Upgrade](https://zips.z.cash/zip-0250)

[ZIP 213: Shielded Coinbase](https://zips.z.cash/zip-0213)

[ZIP 221: FlyClient - Consensus-Layer Changes](https://zips.z.cash/zip-0221)

[Atualização da rede Heartwood](https://z.cash/upgrade/heartwood/)

### Ver também

[Atualizações da rede do Zcash](../start-here/network-upgrades)

[Pools blindados](../using-zcash/shielded-pools)

[Carteiras](../using-zcash/wallets)

[zk-SNARKs](../zcash-tech/zk-snarks)

[Electric Coin Company](../zcash-organizations/electric-coin-company)

[Zcash Foundation](../zcash-organizations/zcash-foundation)

---

Série: [Índice de atualizações da rede](../start-here/network-upgrades) · Anterior: [Blossom](../zcash-tech/blossom) · Próximo: [Canopy](../zcash-tech/canopy)
