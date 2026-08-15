---
<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Heartwood.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Heartwood

> Heartwood entrou em funcionamento na mainnet da Zcash no bloco 903.000 (16 de julho de 2020 UTC).

O que vais aprender: como o Heartwood permitiu aos mineiros receber as suas recompensas de bloco diretamente em endereços shielded, e como tornou a prova de trabalho da Zcash verificável por clientes leves.

Heartwood é uma [atualização de rede](../start-here/network-upgrades) da Zcash, um hard fork das regras de consenso cuja implementação está definida no [ZIP 250](https://zips.z.cash/zip-0250). Incluiu duas alterações de funcionalidade: [ZIP 213](https://zips.z.cash/zip-0213) (Shielded Coinbase) e [ZIP 221](https://zips.z.cash/zip-0221) (FlyClient). Heartwood foi a quarta grande atualização de rede da Zcash e contou com o suporte conjunto da [Electric Coin Company](../zcash-organizations/electric-coin-company) e da [Zcash Foundation](../zcash-organizations/zcash-foundation). Como em todas as atualizações da Zcash, definiu um novo consensus branch id, uma etiqueta que fornece proteção bidirecional contra replay, para que uma transação criada segundo as novas regras não possa ser repetida na cadeia antiga, e vice-versa.

Heartwood ativa-se numa determinada altura de bloco (903.000), e não num horário fixo, por isso o minuto exato que vês num painel pode variar ligeiramente de um local para outro. O bloco, e o momento, são os mesmos.

Porque isto importa. Os mineiros ganham ZEC recém-criado sempre que mineram um bloco. Antes do Heartwood, esse rendimento tinha de chegar a um endereço transparente, que é público. Qualquer pessoa podia ver quanto um mineiro ganhava e para onde as moedas iam a seguir. Heartwood permitiu que essa recompensa fosse diretamente para um endereço shielded, para que a remuneração de um mineiro possa permanecer privada. Também tornou possível que wallets leves e outras cadeias verificassem a prova de trabalho da Zcash sem descarregar a cadeia inteira.

## Shielded coinbase

A transação coinbase é a transação especial que paga a recompensa de um bloco. Antes do Heartwood, as suas saídas tinham de ser transparentes, por isso o ZEC recém-criado de um mineiro começava sempre a sua vida num endereço público. Heartwood alterou as regras de consenso para que, nas palavras do ZIP 213, as transações coinbase possam conter saídas Sapling. Em termos simples, os mineiros podem agora receber recompensas diretamente em endereços Sapling shielded. As saídas coinbase transparentes continuam a ser suportadas, por isso esta é uma nova opção, não uma alteração obrigatória.

![Antes do Heartwood, a recompensa de bloco de um mineiro tinha de ir para um endereço público transparente. Depois do Heartwood, as transações coinbase podem conter saídas Sapling, por isso a recompensa pode ir diretamente para um endereço shielded](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/heartwood-shielded-coinbase.png)

## Porque primeiro Sapling

O shielded coinbase visa especificamente saídas Sapling, e há uma razão para isso. O ZIP 213 explica que a atualização Sapling trouxe alterações arquitetónicas e melhorias de desempenho que tornaram viável proteger fundos diretamente na transação coinbase. O pool shielded original Sprout exigia demasiados recursos para proteger diretamente na coinbase. O sistema de provas mais eficiente e o formato de notas do Sapling tornaram isso prático. O próprio Sapling tinha alargado a regra mais antiga que proibia saídas coinbase shielded, de modo a que essa regra também abrangesse saídas Sapling, e o Heartwood flexibiliza essa regra para as permitir. É um bom exemplo de como as atualizações da Zcash se apoiam umas nas outras: a infraestrutura de uma atualização torna-se a base da seguinte.

## FlyClient

Heartwood também alterou aquilo a que o cabeçalho de bloco se compromete. O campo do cabeçalho anteriormente chamado hashFinalSaplingRoot foi reaproveitado e renomeado para hashLightClientRoot. Agora compromete-se com a raiz de uma Merkle Mountain Range (MMR), uma estrutura contínua construída sobre os dados do cabeçalho e metadados de blocos anteriores, como timestamps, objetivos de dificuldade, raízes Sapling, trabalho acumulado e contagens de transações. Esse compromisso permite que um cliente leve, ou uma cadeia externa, verifique a prova de trabalho da Zcash usando uma prova pequena cujo tamanho cresce apenas de forma logarítmica com o comprimento da cadeia. O benefício é ter wallets de cliente leve melhores e uma integração de terceiros e entre cadeias mais fácil, porque um cliente já não precisa de descarregar todos os blocos para confiar no trabalho por detrás da cadeia.

![Fluxo do FlyClient: os dados do cabeçalho de cada bloco são comprometidos numa raiz Merkle Mountain Range (hashLightClientRoot), o que permite a um cliente leve verificar a prova de trabalho com uma pequena prova de tamanho logarítmico](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/heartwood-flyclient.png)

## Onde o Heartwood se enquadra

Heartwood é um passo numa sequência de atualizações da Zcash, cada uma acrescentando uma peça da qual a seguinte depende. Overwinter e Sapling chegaram em 2018, Blossom em 2019, e Heartwood em 2020 no bloco 903.000. Canopy seguiu-se mais tarde em 2020 no bloco 1.046.400. Sapling é o elo-chave desta cadeia para o Heartwood: o seu mecanismo eficiente de transações shielded foi a pré-condição técnica que tornou possível o shielded coinbase.

![Linha temporal das atualizações da Zcash: Overwinter e Sapling em 2018, Blossom em 2019 e Heartwood em 2020](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/heartwood-timeline.png)

## Glossário

| Termo | Significado em linguagem simples |
|---|---|
| Atualização de rede (NU) | Uma alteração coordenada às regras de consenso da Zcash, ativada numa determinada altura de bloco |
| Transação coinbase | A transação especial em cada bloco que paga a recompensa do bloco |
| Endereço Sapling shielded | Um tipo de endereço privado da Zcash introduzido pela atualização Sapling |
| Shielded coinbase | A alteração do Heartwood que permite que recompensas de bloco sejam pagas para endereços Sapling shielded |
| FlyClient | Um método que permite a clientes leves verificar a prova de trabalho com pequenas provas |
| Merkle Mountain Range (MMR) | Um resumo contínuo de blocos passados com o qual o cabeçalho de bloco se compromete |
| Consensus branch id | Uma etiqueta que identifica as regras de que atualização uma transação segue, usada para proteção contra replay |

## FAQ

O Heartwood altera o meu ZEC ou a minha privacidade? Não. O Heartwood não mexeu nos teus fundos existentes. Adicionou a opção de os mineiros receberem recompensas em endereços shielded e melhorou o suporte para clientes leves. Os teus próprios saldos e transações shielded não são afetados.

O que é shielded coinbase? A coinbase é a transação que paga a recompensa de um bloco. O Heartwood permite que essa recompensa vá para um endereço Sapling shielded em vez de um transparente, para que o rendimento do mineiro possa permanecer privado.

Os mineiros são agora obrigados a receber recompensas shielded? Não. O shielded coinbase é opcional. As saídas coinbase transparentes continuam a ser suportadas, por isso os mineiros podem escolher qualquer uma das opções.

Porque é que o shielded coinbase usa Sapling e não o pool Sprout mais antigo? Porque o design mais eficiente do Sapling tornou prático proteger diretamente na coinbase. O pool Sprout anterior exigia demasiados recursos para isso.

O que mudou para os clientes leves? O cabeçalho de bloco passa agora a comprometer-se com uma Merkle Mountain Range sobre blocos passados através do campo hashLightClientRoot. Isso permite que clientes leves e outras cadeias verifiquem a prova de trabalho da Zcash com pequenas provas de tamanho logarítmico em vez da cadeia inteira.

## Testa a tua compreensão

Antes do Heartwood, porque é que a recompensa de bloco paga a um mineiro aparecia publicamente, e o que é que o Heartwood mudou?

<details>
<summary>Resposta</summary>

As saídas coinbase tinham de ser transparentes, por isso a recompensa recém-criada de um mineiro chegava sempre a um endereço público transparente que qualquer pessoa podia inspecionar. O Heartwood alterou as regras de consenso (ZIP 213) para que as transações coinbase possam conter saídas Sapling, permitindo que os mineiros recebam as suas recompensas diretamente em endereços shielded.
</details>

### Recursos

[ZIP 250: Implementação da atualização de rede Heartwood](https://zips.z.cash/zip-0250)

[ZIP 213: Shielded Coinbase](https://zips.z.cash/zip-0213)

[ZIP 221: FlyClient - Alterações na camada de consenso](https://zips.z.cash/zip-0221)

[Atualização de rede Heartwood](https://z.cash/upgrade/heartwood/)

### Ver também

[Atualizações de Rede da Zcash](../start-here/network-upgrades)

[Pools Shielded](../using-zcash/shielded-pools)

[Wallets](../using-zcash/wallets)

[zk-SNARKS](../zcash-tech/zk-snarks)

[Electric Coin Company](../zcash-organizations/electric-coin-company)

[Zcash Foundation](../zcash-organizations/zcash-foundation)

---

Série: [Índice de Atualizações de Rede](../start-here/network-upgrades) · Anterior: [Blossom](../zcash-tech/blossom) · Seguinte: [Canopy](../zcash-tech/canopy)
