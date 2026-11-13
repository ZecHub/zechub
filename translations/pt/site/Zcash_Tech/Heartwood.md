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

## TL;DR

- O Heartwood foi ativado no bloco 903.000 da mainnet (16 jul 2020 UTC), implantado pela ZIP 250 com um novo consensus branch id para proteção bidirecional contra replay.
- ZIP 213 (Coinbase blindado): as transações coinbase podem conter saídas Sapling, para que os mineradores possam receber as recompensas de bloco diretamente em um endereço blindado.
- ZIP 221 (FlyClient): o hashLightClientRoot do cabeçalho agora se compromete com uma Merkle Mountain Range, permitindo que light clients verifiquem a prova de trabalho com provas que crescem apenas de forma logarítmica.
- As saídas coinbase transparentes continuam totalmente suportadas: o coinbase blindado é uma nova opção, não uma obrigação.
- A ativação acontece em uma altura de bloco, não em um horário do relógio, então o minuto exato varia entre painéis e fusos horários.

## Explicação principal

Antes do Heartwood, os ZEC recém-cunhados de um minerador tinham que começar a vida em um endereço transparente, de modo que qualquer pessoa podia observar a renda de um minerador e rastrear para onde ela ia. A ZIP 213 flexibilizou a regra de consenso para que a transação coinbase possa pagar saídas Sapling, mantendo o pagamento de um minerador privado desde o primeiro momento de sua existência. Ela tem como alvo o Sapling especificamente porque a geração eficiente de provas do Sapling tornou viável a blindagem dentro da coinbase; as provas pesadas do Sprout não eram viáveis ali.

ZIP 221 reaproveitou o campo de cabeçalho hashFinalSaplingRoot como hashLightClientRoot. Agora ele assume um compromisso com uma Merkle Mountain Range construída sobre os dados de cabeçalho dos blocos anteriores: timestamps, alvos de dificuldade, raízes Sapling, trabalho acumulado e contagens de transações. Assim, um light client ou outra chain pode verificar a prova de trabalho do Zcash com uma prova pequena, em vez de baixar todos os blocos.

## Analogia visual

Antes: o pagamento de cada minerador era publicado em um mural público, e qualquer pessoa podia ler o valor e o rastro. Depois: o pagamento pode chegar em um envelope lacrado. E agora cada novo bloco carrega um pequeno selo de cera que resume todos os blocos anteriores, então um desconhecido pode confirmar toda a chain de trabalho com um olhar, em vez de ler cada página.

## Análise detalhada

A mudança de regra tinha histórico: Sapling havia estendido a proibição original de coinbase blindado para cobrir também as saídas Sapling, e Heartwood suspendeu essa restrição para permiti-las. É um exemplo claro de como a infraestrutura de uma atualização se torna a base da próxima. O compromisso MMR traz benefícios para carteiras leves e para a integração cross-chain, onde verificar o trabalho do Zcash antes exigia baixar a chain inteira. O ID de ramo de consenso adicionado na ativação oferece proteção contra replay nos dois sentidos: uma transação construída sob as novas regras não pode ser reproduzida na chain antiga, e vice-versa.

## Erros comuns

- **Achar que o coinbase blindado se tornou obrigatório.** As saídas coinbase transparentes continuam válidas; os mineradores escolhem.
- **Supor que Sprout pode receber coinbase blindado.** Apenas saídas Sapling são permitidas, pois a geração de provas do Sprout exigia recursos demais.
- **Acreditar que o FlyClient elimina a necessidade de nós integrais.** Ele atende light clients e verificadores cross-chain; os nós integrais continuam sendo a base da rede.
- **Procurar um horário fixo de ativação.** A ativação foi definida no bloco 903.000, então o minuto exato no relógio varia.
- **Confundir hashLightClientRoot com o antigo hashFinalSaplingRoot.** O mesmo campo foi reaproveitado e renomeado.

## Glossário

| Termo | Significado em linguagem simples |
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

Os Coinbase outputs tinham que ser transparentes, então a recompensa recém-cunhada de um minerador sempre caía em um endereço transparente público que qualquer pessoa podia inspecionar. O Heartwood alterou as regras de consenso (ZIP 213) para que as transações coinbase possam conter outputs Sapling, permitindo que os mineradores recebam suas recompensas diretamente em endereços blindados.
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

## Páginas relacionadas

- [Sapling](./Sapling.md) — o mecanismo eficiente que tornou viável a coinbase blindada
- [Canopy](./Canopy.md) — a próxima atualização da série
- [Nós integrais](./Full_Nodes.md) — o que a verificação completa ainda oferece
- [O que um explorador de blocos pode ver](./What_a_Block_Explorer_Can_See.md) — o que a coinbase transparente revela em comparação com a blindada

Série: [Índice de atualizações da rede](../start-here/network-upgrades) · Anterior: [Blossom](../zcash-tech/blossom) · Próximo: [Canopy](../zcash-tech/canopy)
