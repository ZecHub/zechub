<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Unified_Addresses.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Endereços unificados

> Um endereço para todo o Zcash. Compartilhe-o, e a carteira do remetente encontra a forma mais privada de pagar você.

Um endereço unificado (UA) é um único endereço do Zcash que reúne vários receptores em um só. Os receptores são as partes de um endereço que aceitam fundos em um pool de valor específico: Ironwood, Sapling e transparente. Um UA começa com `u1` na mainnet e foi definido em [ZIP 316](https://zips.z.cash/zip-0316), introduzido com a atualização da rede NU5 em 31 de maio de 2022.

Antes dos endereços unificados, receber ZEC significava pensar em tipos de endereço. Um endereço `zs` recebia fundos Sapling, um endereço `t` recebia fundos transparentes, e enviar entre tipos exigia etapas adicionais. Um UA acaba com isso. Você compartilha um endereço, e as carteiras cuidam do resto.

## Como funciona

Quando alguém envia para o seu UA, a carteira dessa pessoa lê os receptores dentro dele e escolhe o pool mais privado compatível com ambas as carteiras:

1. Se ambas as carteiras forem compatíveis com o pool blindado atual, o pagamento chega blindado. Nada público toca a chain.
2. Se o remetente só puder enviar de um pool mais antigo, a carteira recorre ao melhor receptor que ambos compartilham, como Sapling.
3. Se o remetente só puder enviar fundos transparentes, o pagamento chega ao receptor transparente do seu UA, e a sua carteira pode blindá-lo a partir daí.

Você nunca precisa gerenciar isso pessoalmente. O endereço permanece o mesmo; o roteamento acontece dentro dele.

## Por que é importante agora

O Zcash continua evoluindo. Quando o pool Ironwood foi ativado com NU6.3 em 28 de julho de 2026, os detentores de UAs não precisaram de um novo endereço: as carteiras simplesmente começaram a escolher o receptor Ironwood dentro dos endereços que as pessoas já tinham. Os usuários com endereços independentes mais antigos tiveram de migrar. Os detentores de UAs não fizeram nada.

Este é o objetivo do design. Novos pools chegam com futuras atualizações da rede, e um endereço unificado os absorve sem que ninguém precise compartilhar novamente endereços ou mover fundos manualmente. Consulte os [pools de valor do Zcash](/using-zcash/shielded-pools) para ver a lista atual de pools.

## Um endereço novo para cada remetente

As carteiras podem gerar muitos endereços unificados diversificados para uma conta. Cada um paga para os mesmos fundos, mas nenhum par deles pode ser associado on-chain. Dê um UA diferente a cada pessoa ou serviço que paga você, e nenhum par poderá comparar endereços para descobrir que paga para a mesma carteira.

## Ferramentas relacionadas

- **Chaves de visualização.** Cada conta tem chaves de visualização unificadas que compartilham o que um UA recebe (ou tudo o que envia) sem compartilhar autoridade de gastos. Prefixos `uview` e `uivk`. Consulte [chaves de visualização](/zcash-tech/viewing-keys).
- **Endereços TEX.** Algumas corretoras, atualmente a Binance, exigem que os depósitos cheguem de uma origem transparente. Um endereço TEX ([ZIP 320](https://zips.z.cash/zip-0320)) é um complemento somente transparente do seu UA precisamente para esse caso. Consulte [endereços transparentes de corretoras](/using-zcash/transparent-exchange-addresses).
- **Solicitações de pagamento.** Um UA pode ser incorporado em um URI de solicitação de pagamento com um valor e um memorando preenchidos previamente. Consulte [URIs de solicitação de pagamento](/using-zcash/payment-request-uris).

## Fatos rápidos

| | |
|---|---|
| Prefix | `u1` (mainnet) |
| Encoding | bech32m |
| Defined in | [ZIP 316](https://zips.z.cash/zip-0316) |
| Introduced | NU5, 31 de maio de 2022 |
| Contains | Receptores Ironwood, Sapling e transparentes |
| Spending key | Uma por conta, compartilhada por todos os seus UAs |

Veja quais carteiras são compatíveis com endereços unificados na página de [carteiras](/wallets).
