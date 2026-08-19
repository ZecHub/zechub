<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/NU6.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar Página"/>
</a>

# NU6

> A NU6 entrou em funcionamento na mainnet da Zcash no bloco 2,726,400 (23 de novembro de 2024 UTC).

O que vai aprender: como a Zcash continua a financiar o seu próprio desenvolvimento após um halving, porque reservou uma parcela que ainda não sabia como gastar, e como tornou o fornecimento total de ZEC exatamente previsível.

A NU6 é uma [atualização de rede](../start-here/network-upgrades) da Zcash, implementada pela [ZIP 253](https://zips.z.cash/zip-0253), que foi ativada na mainnet em novembro de 2024 no bloco 2,726,400. É uma atualização monetária e de [financiamento do desenvolvimento](../start-here/development-fund): manteve uma parte do subsídio de bloco destinada ao desenvolvimento para além do halving de novembro de 2024, criou uma reserva no próprio protocolo para uso futuro decidido pela comunidade, e tornou mais rigorosa a forma como o novo ZEC é contabilizado. A NU6 foi apoiada tanto pela Electric Coin Company como pela Zcash Foundation.

Porque isto importa. O [Development Fund](../zcash-tech/canopy) da Zcash estava previsto terminar por volta do halving de novembro de 2024, o segundo da sua história. A NU6 manteve esse financiamento, mas em vez de entregar cada moeda a destinatários fixos, reservou uma parte dentro do protocolo para que a comunidade pudesse decidir mais tarde o que fazer com ela. Também fechou uma discreta lacuna contabilística, pelo que a quantidade total de ZEC que alguma vez existirá pode agora ser prevista com exatidão.

## O que a NU6 alterou

A NU6 continuou a destinar 20% do subsídio de bloco ao financiamento do desenvolvimento após o halving de novembro de 2024, uma regra definida na [ZIP 1015](https://zips.z.cash/zip-1015). Dividiu esses 20% de duas formas.

1. 8% do subsídio de bloco vai para a Zcash Community Grants (ZCG), que financia trabalho feito pela e para a comunidade.
2. 12% vai para uma nova lockbox no próprio protocolo, mantida para uso futuro decidido pela comunidade.

O restante do subsídio de bloco, mais as taxas de transação, vai para os mineiros que asseguram a rede. A NU6 também atualizou as regras existentes dos funding streams e do dev fund (ZIP 207 e ZIP 214) para se ajustarem a esta nova estrutura.

![Divisão do development fund da NU6: 20 por cento do subsídio de bloco vai para o desenvolvimento, com 8 por cento para a Zcash Community Grants e 12 por cento para a Deferred Dev Fund Lockbox](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/nu6-dev-fund-split.png)

## A lockbox diferida

A parcela de 12% é a nova ideia da NU6. Em vez de ser paga a um endereço destinatário, esse valor é depositado diretamente num pool no próprio protocolo chamado Deferred Dev Fund Lockbox, definido na [ZIP 2001](https://zips.z.cash/zip-2001).

1. A lockbox é um novo tipo de funding stream (DEFERRED_POOL), em que o valor da recompensa de bloco vai para o próprio protocolo, não para uma pessoa ou organização.
2. A rede acompanha-o como o saldo do seu próprio pool de valor na chain, da mesma forma que acompanha os saldos dos pools shielded.
3. A NU6 criou a lockbox de propósito, mas deixou em aberto a questão difícil: quem controla esses fundos e como são libertados?

Essa questão foi respondida mais tarde pela [NU6.1](../zcash-tech/nu6-1), que definiu a governação: manteve o fluxo de 8% do subsídio de bloco para a Zcash Community Grants e direcionou um fluxo de 12% para um fundo controlado pelos detentores de moedas, alimentado pela lockbox.

## Equilibrar as contas

A NU6 também fechou uma lacuna contabilística na forma como o novo ZEC é criado, definida na [ZIP 236](https://zips.z.cash/zip-0236). As transações coinbase são as transações especiais que pagam o novo ZEC e as taxas de cada bloco.

1. Antes da NU6, uma transação coinbase apenas precisava de não reclamar mais do que lhe era devido. Um mineiro podia reclamar menos do que o subsídio total, queimando esse ZEC discretamente.
2. Depois da NU6, uma transação coinbase tem de equilibrar exatamente: o valor total de saída tem de ser igual ao subsídio do mineiro mais as taxas, nem mais nem menos.
3. Como os mineiros já não podem reclamar menos e queimar ZEC acidentalmente, a quantidade total de ZEC que alguma vez existirá pode agora ser prevista com exatidão.

![Equilíbrio da coinbase antes e depois da NU6: antes, a coinbase podia reclamar menos e queimar ZEC, pelo que o fornecimento não era exatamente previsível. Depois, a coinbase tem de equilibrar exatamente, pelo que a emissão é exatamente previsível](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/nu6-coinbase-balance.png)

## Como o financiamento evoluiu

A NU6 é um capítulo numa história mais longa sobre como a Zcash se financia.

1. A Canopy (2020) terminou a recompensa original dos fundadores e criou o [development fund](../start-here/development-fund).
2. A NU6 (novembro de 2024) reestruturou esse financiamento após o segundo halving e criou a Deferred Dev Fund Lockbox, reservando uma parte da emissão para futuras bolsas decididas pela comunidade.
3. A NU6.1 (2025) respondeu à questão que a NU6 deixou em aberto, quem controla os fundos reservados, mantendo 8% do subsídio de bloco para a Zcash Community Grants e direcionando 12% para um fundo controlado pelos detentores de moedas, alimentado pela lockbox.

![Como o financiamento da Zcash evoluiu: a Canopy criou o development fund, a NU6 criou a lockbox, e a NU6.1 definiu as regras sobre quem a controla](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/nu6-funding-timeline.png)

## Glossário

| Termo | Significado em linguagem simples |
|---|---|
| Subsídio de bloco | O novo ZEC criado com cada bloco minerado |
| Transação coinbase | A transação especial que paga o subsídio e as taxas de um bloco |
| Deferred Dev Fund Lockbox | Uma reserva no próprio protocolo que mantém uma parte da emissão para uso futuro decidido pela comunidade |
| Zcash Community Grants (ZCG) | Um comité que financia trabalho feito pela e para a comunidade Zcash |
| Id do ramo de consenso | O identificador que os nós usam para indicar quais as regras de atualização que um bloco segue |
| Atualização de rede (NU) | Uma alteração coordenada às regras de consenso da Zcash, ativada numa determinada altura de bloco |

## FAQ

A NU6 altera o meu ZEC ou a minha privacidade? Não. A NU6 trata de como o desenvolvimento é financiado e de como a emissão é contabilizada, não das suas transações nem da sua privacidade. Os seus fundos e as suas transações shielded não são afetados.

De onde vem o financiamento? Do subsídio de bloco, o novo ZEC emitido à medida que os blocos são minerados. Uma parcela de 20% é encaminhada para o desenvolvimento, em vez de ir toda para os mineiros.

Para que serve a lockbox? Reserva uma parte da emissão dentro do protocolo para que a comunidade possa decidir mais tarde como a usar. A NU6 separou essa reserva, e a NU6.1 definiu as regras sobre quem a controla.

A regra do equilíbrio exato altera as minhas moedas? Não. Apenas exige que a transação coinbase de cada bloco pague exatamente aquilo que lhe é devido. Afeta a contabilidade da nova emissão, não os saldos existentes.

O que define tecnicamente a NU6? A NU6 é implementada pela ZIP 253, que define a sua ativação na mainnet no bloco 2,726,400 e o seu id do ramo de consenso. As próprias alterações de consenso vêm da ZIP 236, ZIP 1015 e ZIP 2001, com a ZIP 207 e a ZIP 214 atualizadas para se ajustarem.

Em que é que a NU6 difere da NU6.1? A NU6 reestruturou o financiamento e criou a lockbox. A NU6.1 decidiu quem controla os fundos da lockbox e como a parcela reservada é dividida.

## Teste a sua compreensão

A NU6 criou a Deferred Dev Fund Lockbox mas não disse quem a controla. Porque razão uma atualização criaria uma reserva e deixaria deliberadamente a sua governação para mais tarde?

<details>
<summary>Resposta</summary>

Criar a reserva garantiu que uma parte da emissão seria separada dentro do protocolo, em vez de ser paga a destinatários fixos. Decidir quem controla esses fundos e como são libertados é uma questão de governação mais difícil. A NU6 deixou isso deliberadamente em aberto, e a NU6.1 respondeu-lhe: 8% do subsídio de bloco continua para a Zcash Community Grants, e 12% vai para um fundo controlado pelos detentores de moedas, alimentado pela lockbox.
</details>

### Recursos

[ZIP 253: Implementação da Atualização de Rede NU6](https://zips.z.cash/zip-0253)

[ZIP 236: Os blocos devem equilibrar exatamente](https://zips.z.cash/zip-0236)

[ZIP 1015: Alocação do Subsídio de Bloco para Financiamento de Desenvolvimento Não Direto](https://zips.z.cash/zip-1015)

[ZIP 2001: Funding Streams da Lockbox](https://zips.z.cash/zip-2001)

[Network Upgrade 6 (NU6)](https://z.cash/upgrade/nu6/)

### Ver também

[Atualizações de Rede da Zcash](../start-here/network-upgrades)

[Development Fund](../start-here/development-fund)

[Política Monetária da Zcash](../start-here/zcash-monetary-policy)

[NU6.1](../zcash-tech/nu6-1)

[NU6.2](../zcash-tech/nu6-2)

[O que é ZEC e Zcash](../start-here/what-is-zec-and-zcash)

---

Série: [Índice de Atualizações de Rede](../start-here/network-upgrades) · Anterior: [NU5](../zcash-tech/nu5) · Seguinte: [NU6.1](../zcash-tech/nu6-1)
