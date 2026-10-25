<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Unified_Addresses.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Endereços Unificados

> Um endereço para todo o Zcash. Partilhe-o, e a wallet do remetente encontra a forma mais privada de lhe pagar.

Um endereço unificado (UA) é um único endereço Zcash que reúne vários recetores num só. Os recetores são as partes de um endereço que aceitam fundos num conjunto de valor específico: Ironwood, Sapling e transparente. Um UA começa por `u1` na mainnet e foi definido em [ZIP 316](https://zips.z.cash/zip-0316), introduzido com a atualização de rede NU5 a 31 de maio de 2022.

Antes dos endereços unificados, receber ZEC significava pensar em tipos de endereço. Um endereço `zs` recebia fundos Sapling, um endereço `t` recebia fundos transparentes, e enviar entre tipos exigia passos adicionais. Um UA acaba com isso. Partilha um endereço, e as wallets tratam do resto.

## Como funciona

Quando alguém envia para o seu UA, a wallet dessa pessoa lê os recetores no seu interior e escolhe o conjunto mais privado suportado por ambas as wallets:

1. Se ambas as wallets suportarem o conjunto blindado atual, o pagamento chega blindado. Nada público toca na cadeia.
2. Se o remetente apenas puder enviar a partir de um conjunto mais antigo, a wallet recorre ao melhor recetor que ambos partilham, como Sapling.
3. Se o remetente apenas puder enviar fundos transparentes, o pagamento chega ao recetor transparente do seu UA, e a sua wallet pode blindá-lo a partir daí.

Nunca tem de gerir isto pessoalmente. O endereço mantém-se igual; o encaminhamento acontece no seu interior.

## Porque é importante agora

Zcash continua a evoluir. Quando o conjunto Ironwood foi ativado com NU6.3 a 28 de julho de 2026, os detentores de UAs não precisaram de um novo endereço: as wallets simplesmente começaram a escolher o recetor Ironwood dentro dos endereços que as pessoas já tinham. Os utilizadores com endereços autónomos mais antigos tiveram de migrar. Os detentores de UAs não fizeram nada.

Este é o objetivo do design. Novos conjuntos chegam com futuras atualizações de rede, e um endereço unificado absorve-os sem que ninguém tenha de voltar a partilhar endereços ou mover fundos manualmente. Consulte os [conjuntos de valorZcash atuais](/using-zcash/shielded-pools) para ver a lista atual de conjuntos.

## Um endereço novo para cada remetente

As wallets podem gerar muitos endereços unificados diversificados para uma conta. Cada um deposita nos mesmos fundos, mas nenhum par deles pode ser associado na cadeia. Dê um UA diferente a cada pessoa ou serviço que lhe pague, e nenhum par poderá comparar endereços para descobrir que paga para a mesma wallet.

## Ferramentas relacionadas

- **Chaves de visualização.** Cada conta tem chaves de visualização unificadas que partilham o que um UA recebe (ou tudo o que envia) sem partilhar autoridade de gasto. Prefixos `uview` e `uivk`. Consulte [chaves de visualização](/zcash-tech/viewing-keys).
- **Endereços TEX.** Algumas exchanges, atualmente a Binance, exigem que os depósitos cheguem de uma origem transparente. Um endereço TEX ([ZIP 320](https://zips.z.cash/zip-0320)) é um complemento apenas transparente do seu UA precisamente para esse caso. Consulte [endereços transparentes para exchanges](/using-zcash/transparent-exchange-addresses).
- **Pedidos de pagamento.** Um UA pode ser incorporado num URI de pedido de pagamento com um montante e uma nota pré-preenchidos. Consulte [URIs de pedido de pagamento](/using-zcash/payment-request-uris).

## Factos rápidos

| | |
|---|---|
| Prefixo | `u1` (mainnet) |
| Codificação | bech32m |
| Definido em | [ZIP 316](https://zips.z.cash/zip-0316) |
| Introduzido | NU5, 31 de maio de 2022 |
| Contém | Recetores Ironwood, Sapling e transparentes |
| Chave de gasto | Uma por conta, partilhada por todos os seus UAs |

Veja quais as wallets que suportam endereços unificados na página de [wallets](/wallets).
