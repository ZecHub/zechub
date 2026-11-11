<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/NU6.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar Página"/>
</a>

# NU6

> A NU6 entrou em funcionamento na mainnet do Zcash no bloco 2,726,400 (23 de novembro de 2024 UTC).

O que você vai aprender: como o Zcash continua a financiar seu próprio desenvolvimento após um halving, por que reservou uma parcela que ainda não sabia como gastar e como tornou o fornecimento total de ZEC exatamente previsível.

A NU6 é uma [atualização da rede](../start-here/network-upgrades) do Zcash, implementada pela [ZIP 253](https://zips.z.cash/zip-0253), que foi ativada na mainnet em novembro de 2024 no bloco 2,726,400. É uma atualização monetária e de [financiamento do desenvolvimento](../start-here/development-fund): manteve uma parte do subsídio de bloco destinada ao desenvolvimento após o halving de novembro de 2024, criou uma reserva no próprio protocolo para uso futuro decidido pela comunidade e tornou mais rigorosa a forma como o novo ZEC é contabilizado. A NU6 foi apoiada tanto pela Electric Coin Company quanto pela Zcash Foundation.

Por que isso importa. O [Development Fund](../zcash-tech/canopy) do Zcash estava previsto para terminar por volta do halving de novembro de 2024, o segundo de sua história. A NU6 manteve esse financiamento, mas, em vez de entregar cada moeda a destinatários fixos, reservou uma parte dentro do protocolo para que a comunidade pudesse decidir mais tarde o que fazer com ela. Também fechou uma discreta lacuna contábil, de modo que a quantidade total de ZEC que existirá pode agora ser prevista com exatidão.

## O que a NU6 mudou

A NU6 continuou a destinar 20% do subsídio de bloco ao financiamento do desenvolvimento após o halving de novembro de 2024, uma regra definida na [ZIP 1015](https://zips.z.cash/zip-1015). Ela dividiu esses 20% de duas formas.

1. 8% do subsídio de bloco vão para a Zcash Community Grants (ZCG), que financia trabalhos feitos pela e para a comunidade.
2. 12% vão para uma nova lockbox no próprio protocolo, mantida para uso futuro decidido pela comunidade.

O restante do subsídio de bloco, mais as taxas de transação, vai para os mineradores que protegem a rede. A NU6 também atualizou as regras existentes dos funding streams e do dev fund (ZIP 207 e ZIP 214) para se ajustarem a essa nova estrutura.

![Divisão do development fund da NU6: 20 por cento do subsídio de bloco vai para o desenvolvimento, com 8 por cento para a Zcash Community Grants e 12 por cento para a Deferred Dev Fund Lockbox](/content-images/nu6-dev-fund-split-08bc73e317.webp)

## A lockbox adiada

A parcela de 12% é a nova ideia da NU6. Em vez de ser paga a um endereço de destinatário, esse valor é depositado diretamente em um pool no próprio protocolo chamado Deferred Dev Fund Lockbox, definido na [ZIP 2001](https://zips.z.cash/zip-2001).

1. A lockbox é um novo tipo de funding stream (DEFERRED_POOL), no qual o valor da recompensa de bloco vai para o próprio protocolo, não para uma pessoa ou organização.
2. A rede a acompanha como o saldo de seu próprio pool de valor na chain, da mesma forma que acompanha os saldos dos pools blindados.
3. A NU6 criou a lockbox de propósito, mas deixou em aberto a questão difícil: quem controla esses fundos e como eles são liberados?

Essa questão foi respondida mais tarde pela [NU6.1](../zcash-tech/nu6-1), que definiu a governança: manteve o fluxo de 8% do subsídio de bloco para a Zcash Community Grants e direcionou um fluxo de 12% para um fundo controlado pelos detentores de moedas, abastecido pela lockbox.

## Equilibrando as contas

A NU6 também fechou uma lacuna contábil na forma como o novo ZEC é criado, definida na [ZIP 236](https://zips.z.cash/zip-0236). As transações coinbase são as transações especiais que pagam o novo ZEC e as taxas de cada bloco.

1. Antes da NU6, uma transação coinbase só precisava não reivindicar mais do que lhe era devido. Um minerador podia reivindicar menos do que o subsídio total, queimando esse ZEC discretamente.
2. Depois da NU6, uma transação coinbase deve se equilibrar exatamente: o valor total de saída deve ser igual ao subsídio do minerador mais as taxas, nem mais nem menos.
3. Como os mineradores não podem mais reivindicar menos e queimar ZEC acidentalmente, a quantidade total de ZEC que existirá pode agora ser prevista com exatidão.

![Equilíbrio da coinbase antes e depois da NU6: antes, a coinbase podia reivindicar menos e queimar ZEC, portanto a oferta não era exatamente previsível. Depois, a coinbase deve se equilibrar exatamente, portanto a emissão é exatamente previsível](/content-images/nu6-coinbase-balance-0fa2394799.webp)

## Como o financiamento evoluiu

A NU6 é um capítulo em uma história mais longa sobre como o Zcash se financia.

1. A Canopy (2020) encerrou a recompensa original dos fundadores e criou o [development fund](../start-here/development-fund).
2. A NU6 (novembro de 2024) reestruturou esse financiamento após o segundo halving e criou a Deferred Dev Fund Lockbox, reservando uma parte da emissão para futuros subsídios decididos pela comunidade.
3. A NU6.1 (2025) respondeu à questão que a NU6 deixou em aberto, quem controla os fundos reservados, mantendo 8% do subsídio de bloco para a Zcash Community Grants e direcionando 12% para um fundo controlado pelos detentores de moedas, abastecido pela lockbox.

![Como o financiamento do Zcash evoluiu: a Canopy criou o development fund, a NU6 criou a lockbox e a NU6.1 definiu as regras sobre quem a controla](/content-images/nu6-funding-timeline-2427db58c0.webp)

## Glossário

| Termo | Significado em linguagem simples |
|---|---|
| Block subsidy | O novo ZEC criado com cada bloco minerado |
| Coinbase transaction | A transação especial que paga o subsídio e as taxas de um bloco |
| Deferred Dev Fund Lockbox | Uma reserva no próprio protocolo que mantém uma parte da emissão para uso futuro decidido pela comunidade |
| Zcash Community Grants (ZCG) | Um comitê que financia trabalhos feitos pela e para a comunidade do Zcash |
| Consensus branch id | O identificador que os nós usam para indicar quais regras de atualização um bloco segue |
| Network upgrade (NU) | Uma alteração coordenada nas regras de consenso do Zcash, ativada em uma determinada altura de bloco |

## FAQ

A NU6 altera meu ZEC ou minha privacidade? Não. A NU6 trata de como o desenvolvimento é financiado e de como a emissão é contabilizada, não das suas transações nem da sua privacidade. Seus fundos e suas transações blindadas não são afetados.

De onde vem o financiamento? Do subsídio de bloco, o novo ZEC emitido à medida que os blocos são minerados. Uma parcela de 20% é encaminhada para o desenvolvimento, em vez de toda ela ir para os mineradores.

Para que serve a lockbox? Ela reserva uma parte da emissão dentro do protocolo para que a comunidade possa decidir mais tarde como usá-la. A NU6 separou essa reserva, e a NU6.1 definiu as regras sobre quem a controla.

A regra do equilíbrio exato altera minhas moedas? Não. Ela só exige que a transação coinbase de cada bloco pague exatamente o que lhe é devido. Ela afeta a contabilidade da nova emissão, não os saldos existentes.

O que define tecnicamente a NU6? A NU6 é implementada pela ZIP 253, que define sua ativação na mainnet no bloco 2,726,400 e seu id de ramificação de consenso. As próprias alterações de consenso vêm da ZIP 236, ZIP 1015 e ZIP 2001, com a ZIP 207 e a ZIP 214 atualizadas para se ajustarem.

Como a NU6 difere da NU6.1? A NU6 reestruturou o financiamento e criou a lockbox. A NU6.1 decidiu quem controla os fundos da lockbox e como a parcela reservada é dividida.

## Teste sua compreensão

A NU6 criou a Deferred Dev Fund Lockbox, mas não disse quem a controla. Por que uma atualização criaria uma reserva e deixaria deliberadamente sua governança para mais tarde?

<details>
<summary>Resposta</summary>

Criar a reserva garantiu que uma parte da emissão seria separada dentro do protocolo, em vez de ser paga a destinatários fixos. Decidir quem controla esses fundos e como eles são liberados é uma questão de governança mais difícil. A NU6 deixou isso deliberadamente em aberto, e a NU6.1 respondeu a isso: 8% do subsídio de bloco continuam para a Zcash Community Grants, e 12% vão para um fundo controlado pelos detentores de moedas, abastecido pela lockbox.
</details>

### Recursos

[ZIP 253: Deployment of the NU6 Network Upgrade](https://zips.z.cash/zip-0253)

[ZIP 236: Blocks should balance exactly](https://zips.z.cash/zip-0236)

[ZIP 1015: Block Subsidy Allocation for Non-Direct Development Funding](https://zips.z.cash/zip-1015)

[ZIP 2001: Lockbox Funding Streams](https://zips.z.cash/zip-2001)

[Network Upgrade 6 (NU6)](https://z.cash/upgrade/nu6/)

### Ver também

[Atualizações da rede do Zcash](../start-here/network-upgrades)

[Development Fund](../start-here/development-fund)

[Política monetária do Zcash](../start-here/zcash-monetary-policy)

[NU6.1](../zcash-tech/nu6-1)

[NU6.2](../zcash-tech/nu6-2)

[O que são ZEC e Zcash](../start-here/what-is-zec-and-zcash)

---

Série: [Índice de atualizações da rede](../start-here/network-upgrades) · Anterior: [NU5](../zcash-tech/nu5) · Próxima: [NU6.1](../zcash-tech/nu6-1)
