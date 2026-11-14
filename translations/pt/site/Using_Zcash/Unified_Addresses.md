<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Unified_Addresses.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Endereços unificados

> Um único endereço para todo o Zcash. Compartilhe-o, e a carteira de quem envia encontra a forma mais privada de pagar você.

## TL;DR

* Um endereço unificado (UA) é um único endereço Zcash que contém vários receptores: Ironwood, Sapling e transparente.
* Os UAs da mainnet começam com `u1`. A ZIP 316 os definiu, e eles chegaram com a atualização NU5 em 31 de maio de 2022.
* A carteira de quem envia escolhe o pool mais privado que as duas carteiras suportam. Você nunca precisa escolher um pool.
* Seu UA continuou funcionando quando o pool Ironwood entrou no ar em julho de 2026. Você não precisou compartilhar um novo endereço.
* Sua carteira pode criar um UA novo para cada remetente, e todos eles pagam na mesma conta.

## Explicação principal

Um endereço unificado (UA) é um único endereço Zcash que reúne vários receptores em um só. Receptores são as partes de um endereço que aceitam fundos em um pool de valor específico: Ironwood, Sapling e transparente. Um UA começa com `u1` na mainnet e foi definido na [ZIP 316](https://zips.z.cash/zip-0316), introduzida com a atualização da rede NU5 em 31 de maio de 2022.

Antes dos endereços unificados, receber ZEC exigia pensar em tipos de endereço. Um endereço `zs` recebia fundos Sapling, um endereço `t` recebia fundos transparentes, e enviar entre tipos diferentes exigia etapas extras. Um UA acaba com isso. Você compartilha um único endereço, e as carteiras resolvem o resto.

### Como funciona

Quando alguém envia para o seu UA, a carteira dessa pessoa lê os receptores contidos nele e escolhe o pool mais privado que as duas carteiras suportam:

1. Se as duas carteiras suportam o pool blindado atual, o pagamento chega blindado. Nada público toca a chain.
2. Se quem envia só consegue enviar a partir de um pool mais antigo, a carteira recorre ao melhor receptor que vocês dois têm em comum, como o Sapling.
3. Se quem envia só consegue enviar fundos transparentes, o pagamento cai no receptor transparente do seu UA, e sua carteira pode blindá-lo a partir dali.

Você nunca precisa gerenciar isso. O endereço continua o mesmo; o roteamento acontece dentro dele.

### Por que isso importa agora

O Zcash continua sendo atualizado. Quando o pool Ironwood foi ativado com o NU6.3 em 28 de julho de 2026, quem tinha um UA não precisou de um novo endereço: as carteiras simplesmente passaram a escolher o receptor Ironwood dentro dos endereços que já existiam. Os usuários que tinham endereços avulsos mais antigos precisaram migrar. Quem tinha um UA não precisou fazer nada.

Esse é o objetivo do design. Novos pools chegam com futuras atualizações da rede, e um endereço unificado os absorve sem que ninguém precise compartilhar endereços de novo ou mover fundos manualmente. Veja [Zcash pools de valor](/using-zcash/shielded-pools) para conhecer os pools atuais.

### Um endereço novo para cada remetente

As carteiras podem gerar muitos endereços unificados diversificados para uma mesma conta. Cada um deles paga nos mesmos fundos, mas nenhum par deles pode ser vinculado on-chain. Dê um UA diferente para cada pessoa ou serviço que paga você, e nenhuma dupla deles conseguirá comparar endereços para descobrir que paga a mesma carteira.

## Visual / analogia

Imagine uma porta de entrada com três aberturas para cartas. A abertura mais nova deixa as cartas cair dentro de um cofre trancado (Ironwood). A segunda as deixa cair em uma gaveta trancada (Sapling). A terceira as deixa cair em uma bandeja aberta que qualquer pessoa pode ler pela janela (transparente).

O carteiro é a carteira de quem envia. Ele usa a abertura mais privada em que a carta cabe. Você divulga um único endereço para a porta e, quando a casa ganha um cofre novo, o endereço na porta continua o mesmo.

## Aprofundamento

### Ferramentas relacionadas

- **Chaves de visualização.** Toda conta tem chaves de visualização unificadas que compartilham o que um UA recebe (ou tudo o que ele envia) sem compartilhar a permissão de gasto. Prefixos `uview` e `uivk`. Veja [chaves de visualização](/zcash-tech/viewing-keys).
- **Endereços TEX.** Algumas corretoras, atualmente a Binance, exigem que os depósitos venham de uma origem transparente. Um endereço TEX ([ZIP 320](https://zips.z.cash/zip-0320)) é um complemento somente transparente do seu UA justamente para esse caso. Veja [endereços transparentes de corretora](/using-zcash/transparent-exchange-addresses).
- **Solicitações de pagamento.** Um UA pode ser incorporado a uma URI de solicitação de pagamento com valor e memorando preenchidos. Veja [URIs de solicitação de pagamento](/using-zcash/payment-request-uris).

### Fatos rápidos

| | |
|---|---|
| Prefixo | `u1` (mainnet) |
| Codificação | bech32m |
| Definido em | [ZIP 316](https://zips.z.cash/zip-0316) |
| Introduzido | NU5, 31 de maio de 2022 |
| Contém | Receptores Ironwood, Sapling e transparentes |
| Chave de gastos | Uma por conta, compartilhada por todos os seus UAs |

Confira quais carteiras suportam endereços unificados na página [carteiras](/wallets).

## Erros comuns

- **Compartilhar um endereço `zs` ou `t` antigo.** Um endereço avulso só alcança um pool e não acompanha os novos. Compartilhe seu UA.
- **Dar o mesmo UA para todo mundo.** Duas pessoas que pagam você podem trocar informações e ver o mesmo endereço. Dê a cada remetente um UA novo gerado pela sua carteira.
- **Esperar que todo pagamento para um UA seja privado.** Um remetente que só consegue enviar fundos transparentes paga no seu receptor transparente, e esse pagamento é público. Blinde-o depois pela sua carteira.

## Páginas relacionadas

- [Pools blindados](/using-zcash/shielded-pools): os pools de valor por trás de cada receptor de um UA.
- [Endereços unificados (técnico)](/zcash-tech/unified-addresses): como a ZIP 316 constrói e codifica um UA.
- [Chaves de visualização](/zcash-tech/viewing-keys): compartilhe o que um UA recebe sem compartilhar a permissão de gasto.
- [Endereços transparentes de corretora](/using-zcash/transparent-exchange-addresses): o formato TEX para corretoras que precisam de uma origem transparente.
- [URIs de solicitação de pagamento](/using-zcash/payment-request-uris): um UA com o valor e o memorando preenchidos.
- [Carteiras](/using-zcash/wallets): quais carteiras criam e pagam endereços unificados.
- [Corretoras não custodiantes](/using-zcash/non-custodial-exchanges): o que verificar quando uma conversão paga ZEC na sua carteira.
- [Quem pode ver seu pagamento em Zcash](/start-here/who-can-see-your-zcash-payment): o que fica visível quando um pagamento usa cada receptor.

**Última atualização:** outubro de 2026
