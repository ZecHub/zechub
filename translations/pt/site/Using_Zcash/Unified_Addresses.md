<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Unified_Addresses.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# Endereços unificados

> Um endereço para todo o Zcash. Compartilhe-o, e a carteira do remetente encontrará a forma mais privada de fazer um pagamento para você.

## Resumo

* Um endereço unificado (UA) é um endereço Zcash que reúne vários receivers: Ironwood, Sapling e transparente.
* Os UAs da mainnet começam com `u1`. A ZIP 316 os definiu, e eles chegaram com a atualização NU5 em 31 de maio de 2022.
* A carteira do remetente escolhe o pool mais privado que ambas as carteiras suportam. Você nunca escolhe um pool por conta própria.
* Seu UA continuou funcionando quando o pool Ironwood entrou em operação em julho de 2026. Você não precisou compartilhar um novo endereço.
* Sua carteira pode criar um UA novo para cada remetente, e todos eles fazem pagamentos para a mesma conta.

## Explicação principal

Um endereço unificado (UA) é um único endereço Zcash que reúne vários receivers em um só. Receivers são as partes de um endereço que aceitam fundos em um pool de valor específico: Ironwood, Sapling e transparente. Um UA começa com `u1` na mainnet e foi definido na [ZIP 316](https://zips.z.cash/zip-0316), introduzida com a atualização da rede NU5 em 31 de maio de 2022.

Antes dos endereços unificados, receber ZEC significava pensar nos tipos de endereço. Um endereço `zs` recebia fundos Sapling, um endereço `t` recebia fundos transparentes, e enviar entre tipos exigia etapas extras. Um UA acaba com isso. Você compartilha um endereço, e as carteiras resolvem o restante.

### Como funciona

Quando alguém envia para seu UA, a carteira dessa pessoa lê os receivers dentro dele e escolhe o pool mais privado que ambas as carteiras suportam:

1. Se ambas as carteiras suportam o pool blindado atual, o pagamento chega blindado. Nada público toca a chain.
2. Se o remetente só puder enviar de um pool mais antigo, a carteira recorre ao melhor receiver que vocês dois compartilham, como Sapling.
3. Se o remetente só puder enviar fundos transparentes, o pagamento chega ao receiver transparente do seu UA, e sua carteira pode blindá-lo a partir dali.

Você nunca gerencia isso por conta própria. O endereço permanece o mesmo; o roteamento acontece dentro dele.

### Por que isso importa agora

O Zcash continua recebendo atualizações. Quando o pool Ironwood foi ativado com a NU6.3 em 28 de julho de 2026, os detentores de UA não precisaram de um novo endereço: as carteiras simplesmente começaram a escolher o receiver Ironwood dentro dos endereços que já possuíam. Usuários que mantinham endereços independentes mais antigos tiveram de migrar. Os detentores de UA não fizeram nada.

Este é o objetivo do design. Novos pools chegam com futuras atualizações da rede, e um endereço unificado os absorve sem que ninguém precise compartilhar novamente endereços ou mover fundos manualmente. Consulte [Zcash pools de valor](/using-zcash/shielded-pools) para ver a composição atual dos pools.

### Um endereço novo para cada remetente

As carteiras podem gerar muitos endereços unificados diversificados para uma conta. Cada um deles faz pagamentos para os mesmos fundos, mas nenhum par deles pode ser vinculado on-chain. Dê um UA diferente a cada pessoa ou serviço que faz pagamentos para você, e nenhum par poderá comparar endereços para descobrir que paga para a mesma carteira.

## Visual / Analogia

Imagine uma porta de entrada com três aberturas para correspondências. A abertura mais nova deixa as cartas em um cofre trancado (Ironwood). A segunda as deixa em uma gaveta trancada (Sapling). A terceira as deixa em uma bandeja aberta que qualquer pessoa pode ler pela janela (transparente).

O carteiro é a carteira do remetente. Ela usa a abertura mais privada pela qual consegue passar. Você fornece um endereço para a porta e, quando a casa ganha um novo cofre, o endereço na porta permanece o mesmo.

## Análise detalhada

### Ferramentas relacionadas

- **Chaves de visualização.** Cada conta tem chaves de visualização unificadas que compartilham o que um UA recebe (ou tudo o que ele envia) sem compartilhar autoridade de gastos. Prefixos `uview` e `uivk`. Consulte [chaves de visualização](/zcash-tech/viewing-keys).
- **Endereços TEX.** Algumas corretoras, atualmente Binance, exigem que os depósitos cheguem de uma origem transparente. Um endereço TEX ([ZIP 320](https://zips.z.cash/zip-0320)) é um acompanhante exclusivamente transparente do seu UA exatamente para esse caso. Consulte [endereços transparentes para corretoras](/using-zcash/transparent-exchange-addresses).
- **Solicitações de pagamento.** Um UA pode ser incorporado em uma URI de solicitação de pagamento com um valor e um memorando preenchidos previamente. Consulte [URIs de solicitação de pagamento](/using-zcash/payment-request-uris).

### Fatos rápidos

| | |
|---|---|
| Prefixo | `u1` (mainnet) |
| Codificação | bech32m |
| Definido na | [ZIP 316](https://zips.z.cash/zip-0316) |
| Introduzido | NU5, 31 de maio de 2022 |
| Contém | Receivers Ironwood, Sapling e transparentes |
| Chave de gastos | Uma por conta, compartilhada por todos os seus UAs |

Verifique quais carteiras suportam endereços unificados na página de [carteiras](/wallets).

## Erros comuns

- **Compartilhar um endereço `zs` ou `t` antigo.** Um endereço independente alcança apenas um pool e não inclui os novos. Compartilhe seu UA.
- **Dar o mesmo UA para todos.** Duas pessoas que fazem pagamentos para você podem comparar notes e ver o mesmo endereço. Dê a cada remetente um UA novo da sua carteira.
- **Esperar que todo pagamento para um UA seja privado.** Um remetente que só pode enviar fundos transparentes paga para seu receiver transparente, e esse pagamento é público. Depois, blinde-o pela sua carteira.

## Páginas relacionadas

- [Pools blindados](/using-zcash/shielded-pools): os pools de valor por trás de cada receiver em um UA.
- [Endereços unificados (técnico)](/zcash-tech/unified-addresses): como a ZIP 316 cria e codifica um UA.
- [Chaves de visualização](/zcash-tech/viewing-keys): compartilhe o que um UA recebe sem compartilhar autoridade de gastos.
- [Endereços transparentes para corretoras](/using-zcash/transparent-exchange-addresses): o formato TEX para corretoras que precisam de uma origem transparente.
- [URIs de solicitação de pagamento](/using-zcash/payment-request-uris): um UA com o valor e o memorando preenchidos.
- [Carteiras](/using-zcash/wallets): quais carteiras criam e fazem pagamentos para endereços unificados.
- [Corretoras não custodiantes](/using-zcash/non-custodial-exchanges): o que verificar quando uma conversão paga ZEC para sua carteira.
- [Quem pode ver seu pagamento Zcash](/start-here/who-can-see-your-zcash-payment): o que permanece visível quando um pagamento usa cada receiver.

**Última atualização:** outubro de 2026
