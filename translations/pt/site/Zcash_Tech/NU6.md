<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/NU6.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# NU6

> NU6 entrou em operação na mainnet do Zcash no bloco 2.726.400 (23 de novembro de 2024 UTC).

O que você vai aprender: como o Zcash continua financiando o próprio desenvolvimento após um halving, por que ele separou uma reserva que ainda não sabia como gastar e como ele tornou o fornecimento total de ZEC exatamente previsível.

NU6 é uma [atualização da rede](../start-here/network-upgrades) do Zcash, implantada pela [ZIP 253](https://zips.z.cash/zip-0253), que foi ativada na mainnet em novembro de 2024, no bloco 2.726.400. É uma atualização monetária e de [financiamento do desenvolvimento](../start-here/development-fund): ela manteve uma parcela do subsídio de bloco indo para o desenvolvimento após o halving de novembro de 2024, criou uma reserva dentro do protocolo para uso futuro decidido pela comunidade e tornou mais rigorosa a forma como o novo ZEC é contabilizado. NU6 foi endossada tanto pela Electric Coin Company quanto pela Zcash Foundation.

Por que isso importa. O [Fundo de Desenvolvimento](../zcash-tech/canopy) do Zcash estava programado para terminar perto do halving de novembro de 2024, o segundo da sua história. NU6 manteve esse financiamento, mas, em vez de entregar cada moeda a destinatários fixos, reservou uma parcela dentro do protocolo para que a comunidade pudesse decidir depois o que fazer com ela. Ela também fechou uma discreta lacuna contábil, de modo que a quantidade total de ZEC que um dia existirá agora pode ser prevista com exatidão.

## TL;DR

- NU6 foi ativada na mainnet no bloco 2.726.400 (23 de novembro de 2024 UTC), implantada pela ZIP 253.
- Ela manteve 20% do subsídio de bloco indo para o desenvolvimento após o halving de novembro de 2024: 8% para Zcash Community Grants (ZCG) e 12% para o novo Deferred Dev Fund Lockbox (ZIP 2001).
- O lockbox é uma reserva dentro do protocolo sem nenhum responsável definido para gastá-la: NU6 deixou a governança em aberto de propósito, e NU6.1 (2025) respondeu essa questão depois.
- A ZIP 236 agora exige que toda transação coinbase feche exatamente, então os mineradores não podem mais reivindicar menos do que têm direito e queimar ZEC acidentalmente; o fornecimento total futuro se torna exatamente previsível.
- Saldos, privacidade e regras de transação não foram alterados: NU6 é uma atualização de financiamento e contabilidade.

## Analogia visual

Pense no NU6 como uma família que vem pagando uma mesada fixa aos seus construtores e sabe que esse pagamento está programado para acabar. Em vez de interromper o pagamento, a NU6 divide a mesada: uma parte continua indo para o comitê de subsídios da comunidade, e outra parte vai para um cofre da família cuja combinação ainda não foi anunciada. O cofre mantém o dinheiro guardado até que a família concorde, mais tarde, com as regras para abri-lo; esse acordo é a NU6.1.


## O que a NU6 mudou

A NU6 continuou enviando 20% do subsídio de bloco para o financiamento do desenvolvimento após o halving de novembro de 2024, uma regra definida na [ZIP 1015](https://zips.z.cash/zip-1015). Ela dividiu esses 20% de duas formas.

1. 8% do subsídio de bloco vão para Zcash Community Grants (ZCG), que financia trabalhos feitos pela comunidade e para a comunidade.
2. 12% vão para um novo lockbox dentro do protocolo, mantido para uso futuro decidido pela comunidade.

O restante do subsídio de bloco, mais as taxas de transação, vai para os mineradores que protegem a rede. A NU6 também atualizou as regras existentes de fluxos de financiamento e do fundo de desenvolvimento (ZIP 207 e ZIP 214) para se adequarem a essa nova estrutura.

![Divisão do fundo de desenvolvimento no NU6: 20 por cento do subsídio de bloco vão para o desenvolvimento, sendo 8 por cento para a Zcash Community Grants e 12 por cento para o Deferred Dev Fund Lockbox](/content-images/nu6-dev-fund-split-08bc73e317.webp)

## O lockbox diferido

A parcela de 12% é a ideia nova da NU6. Em vez de ser paga a um endereço destinatário, esse valor é depositado diretamente em um pool dentro do protocolo chamado Deferred Dev Fund Lockbox, definido na [ZIP 2001](https://zips.z.cash/zip-2001).

1. O lockbox é um novo tipo de fluxo de financiamento (DEFERRED_POOL), no qual o valor da recompensa de bloco vai para o próprio protocolo, e não para uma pessoa ou organização.
2. A rede o acompanha como um saldo próprio de pool de valor da chain, da mesma forma que acompanha os saldos dos pools blindados.
3. A NU6 criou o lockbox de propósito, mas deixou em aberto a pergunta difícil: quem controla esses fundos e como eles são liberados?

Essa pergunta foi respondida depois pela [NU6.1](../zcash-tech/nu6-1), que definiu a governança: ela manteve o fluxo de 8% do subsídio de bloco para Zcash Community Grants e direcionou um fluxo de 12% para um fundo controlado pelos detentores de moedas, alimentado inicialmente pelo lockbox.

## Fechando as contas

A NU6 também fechou uma lacuna contábil na forma como o novo ZEC é criado, definida na [ZIP 236](https://zips.z.cash/zip-0236). As transações Coinbase são as transações especiais que pagam o novo ZEC e as taxas de cada bloco.

1. Antes da NU6, uma transação coinbase só precisava não reivindicar mais do que lhe era devido. Um minerador podia reivindicar menos do que o subsídio total, o que queimava discretamente esse ZEC.
2. Depois da NU6, uma transação coinbase precisa fechar exatamente: o valor total de saída deve ser igual ao subsídio do minerador mais as taxas, nem mais nem menos.
3. Como os mineradores não podem mais reivindicar menos do que têm direito e queimar ZEC acidentalmente, a quantidade total de ZEC que um dia existirá agora pode ser prevista com exatidão.

![Balanceamento da coinbase antes e depois do NU6: antes, a coinbase podia reivindicar menos do que o devido e queimar ZEC, então a oferta não era exatamente previsível. Depois, a coinbase deve se balancear exatamente, então a emissão é exatamente previsível](/content-images/nu6-coinbase-balance-0fa2394799.webp)

## Como o financiamento evoluiu

A NU6 é um capítulo de uma história mais longa sobre como o Zcash se financia.

1. A Canopy (2020) encerrou a recompensa original dos fundadores e criou o [fundo de desenvolvimento](../start-here/development-fund).
2. A NU6 (novembro de 2024) reestruturou esse financiamento após o segundo halving e criou o Deferred Dev Fund Lockbox, reservando uma parcela da emissão para futuros subsídios decididos pela comunidade.
3. A NU6.1 (2025) respondeu à pergunta que a NU6 deixou em aberto, sobre quem controla os fundos reservados, mantendo 8% do subsídio de bloco para Zcash Community Grants e direcionando 12% para um fundo controlado pelos detentores de moedas, alimentado inicialmente pelo lockbox.

![Como o financiamento do Zcash evoluiu: o Canopy criou o fundo de desenvolvimento, o NU6 estabeleceu o lockbox e o NU6.1 definiu as regras sobre quem o controla](/content-images/nu6-funding-timeline-2427db58c0.webp)

## Erros comuns

- **Pensar que a NU6 mudou a política monetária.** O cronograma de emissão e o momento do halving não foram alterados; a NU6 mudou quem recebe uma fatia do subsídio, e não quanto ZEC novo é emitido.
- **Confundir o lockbox com uma carteira de uma fundação.** O Deferred Dev Fund Lockbox é um pool de valor da chain acompanhado pelo consenso, e não um endereço do qual alguém possa gastar.
- **Supor que a NU6.1 e a NU6 são a mesma atualização.** A NU6 criou a reserva; a NU6.1 decidiu quem a controla: 8% para ZCG e 12% para um fundo controlado pelos detentores de moedas.
- **Acreditar que a regra de fechamento exato (ZIP 236) altera as moedas dos usuários.** Ela restringe as transações coinbase, ou seja, os pagamentos de emissão de cada bloco, e não os saldos existentes nem as transações comuns.
- **Interpretar a parcela de 20% para o desenvolvimento como algo novo.** O financiamento de 20% para o desenvolvimento existe desde a Canopy; a NU6 o manteve após o halving e o dividiu em 8% para ZCG e 12% para o lockbox.


## Glossário

| Termo | Significado em linguagem simples |
|---|---|
| Block subsidy | O novo ZEC criado a cada bloco minerado |
| Coinbase transaction | A transação especial que paga o subsídio e as taxas de um bloco |
| Deferred Dev Fund Lockbox | Uma reserva dentro do protocolo que guarda uma parcela da emissão para uso futuro decidido pela comunidade |
| Zcash Community Grants (ZCG) | Um comitê que financia trabalhos feitos pela comunidade do Zcash e para ela |
| Consensus branch id | O identificador que os nós usam para saber quais regras de atualização um bloco segue |
| Network upgrade (NU) | Uma mudança coordenada nas regras de consenso do Zcash, ativada em uma altura de bloco definida |

## Perguntas frequentes

A NU6 muda meu ZEC ou minha privacidade? Não. A NU6 trata de como o desenvolvimento é financiado e de como a emissão é contabilizada, não das suas transações ou da sua privacidade. Seus fundos e suas transações blindadas não são afetados.

De onde vem o financiamento? Do subsídio de bloco, o novo ZEC emitido à medida que os blocos são minerados. Uma parcela de 20% é direcionada ao desenvolvimento, em vez de tudo ir para os mineradores.

Para que serve o lockbox? Ele reserva uma parcela da emissão dentro do protocolo para que a comunidade possa decidir depois como usá-la. A NU6 separou a reserva, e a NU6.1 definiu as regras sobre quem a controla.

A regra de fechamento exato altera minhas moedas? Não. Ela apenas exige que a transação coinbase de cada bloco pague exatamente o que lhe é devido. Ela afeta a contabilidade da nova emissão, não os saldos existentes.

O que define tecnicamente a NU6? A NU6 é implantada pela ZIP 253, que define sua ativação na mainnet no bloco 2.726.400 e seu consensus branch id. As próprias mudanças de consenso vêm da ZIP 236, da ZIP 1015 e da ZIP 2001, com a ZIP 207 e a ZIP 214 atualizadas para se adequarem.

Qual é a diferença entre a NU6 e a NU6.1? A NU6 reestruturou o financiamento e criou o lockbox. A NU6.1 decidiu quem controla os fundos do lockbox e como a parcela reservada é dividida.

## Teste seu entendimento

A NU6 criou o Deferred Dev Fund Lockbox, mas não disse quem o controla. Por que uma atualização criaria uma reserva e deixaria sua governança para depois de propósito?

<details>
<summary>Resposta</summary>

Criar a reserva garantiu que uma parcela da emissão seria separada dentro do protocolo, em vez de ser paga a destinatários fixos. Decidir quem controla esses fundos e como eles são liberados é uma questão de governança mais difícil. A NU6 deixou isso em aberto de propósito, e a NU6.1 deu a resposta: 8% do subsídio de bloco continuam indo para Zcash Community Grants, e 12% vão para um fundo controlado pelos detentores de moedas, alimentado inicialmente pelo lockbox.
</details>

### Recursos

[ZIP 253: Implantação da atualização da rede NU6](https://zips.z.cash/zip-0253)

[ZIP 236: Os blocos devem fechar exatamente](https://zips.z.cash/zip-0236)

[ZIP 1015: Alocação do subsídio de bloco para financiamento de desenvolvimento não direto](https://zips.z.cash/zip-1015)

[ZIP 2001: Fluxos de financiamento do lockbox](https://zips.z.cash/zip-2001)

[Atualização da rede 6 (NU6)](https://z.cash/upgrade/nu6/)

### Veja também

[Atualizações da rede do Zcash](../start-here/network-upgrades)

[Fundo de Desenvolvimento](../start-here/development-fund)

[Política monetária do Zcash](../start-here/zcash-monetary-policy)

[NU6.1](../zcash-tech/nu6-1)

[NU6.2](../zcash-tech/nu6-2)

[O que são ZEC e Zcash](../start-here/what-is-zec-and-zcash)

---

## Páginas relacionadas

| Página | Por que está relacionada |
|---|---|
| [Canopy](./Canopy.md) | criou o fundo de desenvolvimento que a NU6 reestruturou |
| [NU6.1](./NU6_1.md) | decidiu quem controla os fundos do lockbox |
| [NU6.2](./NU6_2.md) | a atualização de reparo emergencial do Orchard na mesma série |
| [Fundo de Desenvolvimento](../start-here/development-fund) | o histórico de financiamento por trás da parcela de 20% |


Série: [Índice das atualizações da rede](../start-here/network-upgrades) · Anterior: [NU5](../zcash-tech/nu5) · Próxima: [NU6.1](../zcash-tech/nu6-1)
