<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Overwinter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar Página"/>
</a>

# Overwinter

> Overwinter entrou em funcionamento na mainnet do Zcash no bloco 347.500 (26 de junho de 2018 UTC).

O que você vai aprender: como o Zcash aprendeu a alterar suas próprias regras com segurança e por que essa base tornou possível todas as atualizações posteriores, começando com Sapling.

Overwinter é uma [atualização da rede](../start-here/network-upgrades) do Zcash, a primeira após o lançamento da rede. Está definida em várias Propostas de Melhoria do Zcash: [ZIP 200](https://zips.z.cash/zip-0200), [ZIP 201](https://zips.z.cash/zip-0201), [ZIP 202](https://zips.z.cash/zip-0202), [ZIP 203](https://zips.z.cash/zip-0203) e [ZIP 143](https://zips.z.cash/zip-0143). Overwinter não adicionou novos recursos blindados. Em vez disso, reforçou o protocolo para que futuras atualizações pudessem ser lançadas com segurança. A atualização é documentada pela [Electric Coin Company](../zcash-organizations/electric-coin-company) na página oficial de atualizações do Zcash.

Por que isso importa. Alterar as regras de uma blockchain em funcionamento é perigoso. Se algo der errado, duas versões da rede podem divergir, ou uma transação destinada a uma chain pode ser copiada para outra. Antes de Overwinter, o Zcash não tinha uma forma padronizada e segura contra replay de coordenar uma alteração de regras. Overwinter corrigiu isso. Deu ao Zcash um processo formal para atualizações e, tão importante quanto isso, proteção contra replay em ambos os sentidos, para que uma transação válida sob um conjunto de regras não possa sofrer replay sob outro. Foi essa base que tornou possível ativar Sapling e todas as atualizações posteriores de forma limpa.

![Antes e depois da Overwinter: antes, sem um caminho padrão para atualizações e sem proteção contra replay. Depois, um mecanismo de atualização de rede com proteção contra replay nos dois sentidos e atualizações futuras seguras](/content-images/overwinter-before-after-acf4f5d283.webp)

## O mecanismo de atualização

Overwinter introduziu o mecanismo de atualização da rede, definido em [ZIP 200](https://zips.z.cash/zip-0200). Cada atualização agora define duas coisas: um consensus branch id que identifica o conjunto atual de regras e uma altura de ativação, o bloco em que as novas regras entram em vigor. Isso dá a todos que executam software do Zcash uma janela clara para atualizar antes da mudança.

A própria Overwinter foi ativada na mainnet no bloco 347.500.

A [ZIP 201](https://zips.z.cash/zip-0201) trata de como os nós se comportam entre si durante uma atualização. Antes da ativação, os nós preferem conectar-se a pares que executam a mesma versão. No momento da ativação, um nó se desconecta de pares que estão em uma consensus branch diferente, para que a rede se separe de forma limpa pelas novas regras, em vez de ficar confusa.

## Proteção contra replay

Um replay acontece quando alguém pega uma transação que era válida em uma chain e a retransmite em outra. Overwinter fecha essa porta com um novo esquema de assinatura, definido em [ZIP 143](https://zips.z.cash/zip-0143). Quando uma carteira assina uma transação, a assinatura agora se compromete com o consensus branch id da chain atual. Uma transação assinada para uma branch simplesmente não é válida em nenhuma outra branch, em qualquer dos sentidos. É isso que significa proteção contra replay em ambos os sentidos.

Isso funciona lado a lado com o novo formato de transação versão 3 da [ZIP 202](https://zips.z.cash/zip-0202), por vezes chamado de formato Overwintered. Ele adiciona uma flag fOverwintered e um version group id que deixam claro a qual conjunto de regras de consenso uma transação pertence. Como benefício adicional, o novo esquema de assinatura também melhorou a rapidez com que as transações transparentes são validadas.

![Como funciona a proteção contra replay: uma carteira assina uma transação que se compromete com o consensus branch id atual, portanto a transação não pode ser reproduzida em nenhum outro branch](/content-images/overwinter-replay-flow-754ec8578a.webp)

## Expiração de transações

A [ZIP 203](https://zips.z.cash/zip-0203) adicionou a expiração de transações. Uma transação agora pode definir uma altura de bloco de expiração. Se não tiver sido minerada até essa altura, os nós a removem da mempool, a sala de espera das transações não confirmadas. Antes disso, uma transação podia ficar sem confirmação durante muito tempo. A expiração significa que uma transação travada acaba sendo removida sozinha, o que reduz a incerteza para você e evita que a mempool se encha de transações antigas não mineradas.

## Onde se encaixa

Overwinter foi a primeira atualização da rede do Zcash após o lançamento da mainnet em outubro de 2016 e foi lançada deliberadamente antes de Sapling. Seu papel era infraestrutura, não recursos. Ao instalar primeiro o mecanismo de atualização e a estrutura de proteção contra replay, deu a todas as atualizações posteriores (Sapling, Blossom, Heartwood, Canopy, NU5 e as seguintes) um caminho seguro para serem ativadas.

![Linha do tempo desde o lançamento de Sprout em outubro de 2016, passando pelo período de 2016 a 2018 sem um sistema de atualizações, até a Overwinter em junho de 2018](/content-images/overwinter-timeline-689d9bcf20.webp)

## Glossário

| Termo | Significado em linguagem simples |
|---|---|
| Network upgrade (NU) | Uma alteração coordenada nas regras de consenso do Zcash, ativada em uma altura de bloco definida |
| Consensus branch id | Um identificador curto que nomeia o conjunto atual de regras de consenso |
| Activation height | O bloco em que as novas regras de uma atualização da rede entram em vigor |
| Replay protection | Uma regra que impede que uma transação válida em uma chain seja reutilizada em outra |
| Mempool | O pool de transações que foram transmitidas, mas ainda não foram mineradas em um bloco |
| Transaction expiry | Uma altura de bloco de expiração após a qual uma transação não minerada é removida |

## FAQ

Overwinter alterou meu ZEC ou minha privacidade? Não. Overwinter não adicionou novos recursos e não alterou as transações blindadas. Foi infraestrutura para futuras atualizações seguras. Seus fundos e sua privacidade não foram afetados.

Overwinter adicionou Sapling ou endereços blindados? Não. Overwinter não adicionou recursos blindados. Preparou o terreno para que Sapling pudesse ser ativada com segurança mais tarde.

O que é um consensus branch id? É um rótulo curto que nomeia o conjunto atual de regras. As transações se comprometem com ele quando são assinadas, e é isso que dá ao Zcash sua proteção contra replay.

Por que algumas fontes dizem 25 de junho e outras 26 de junho? Overwinter foi ativada às 01:37 UTC de 26 de junho de 2018. Isso foi logo após a meia-noite UTC, por isso, em muitos fusos horários ocidentais, o relógio local ainda marcava 25 de junho. É o mesmo bloco e o mesmo momento.

Para que serve a expiração de transações? Significa que uma transação que nunca chega a ser minerada não fica pendurada para sempre. Depois de sua altura de expiração, os nós a removem, por isso você não fica sem saber o que aconteceu com um pagamento travado.

Preciso fazer alguma coisa? Não. Overwinter foi ativada em 2018. Qualquer carteira ou nó atual do Zcash já segue estas regras.

## Teste sua compreensão

Overwinter não adicionou novos recursos blindados. Então por que é considerada uma das atualizações mais importantes da história do Zcash?

<details>
<summary>Resposta</summary>

Porque construiu a estrutura da qual todas as atualizações posteriores dependem. Overwinter introduziu o mecanismo de atualização da rede e a proteção contra replay em ambos os sentidos, dando ao Zcash uma forma padronizada e segura de alterar suas regras de consenso. Sem essa base, Sapling e as atualizações seguintes não poderiam ter sido ativadas de forma limpa.
</details>

### Recursos

[ZIP 200: Network Upgrade Mechanism](https://zips.z.cash/zip-0200)

[ZIP 201: Network Peer Management for Overwinter](https://zips.z.cash/zip-0201)

[ZIP 202: Version 3 Transaction Format for Overwinter](https://zips.z.cash/zip-0202)

[ZIP 203: Transaction Expiry](https://zips.z.cash/zip-0203)

[ZIP 143: Transaction Signature Validation for Overwinter](https://zips.z.cash/zip-0143)

[Atualização da rede Overwinter](https://z.cash/upgrade/overwinter/)

### Ver também

[Atualizações da rede do Zcash](../start-here/network-upgrades)

[Pools blindados](../using-zcash/shielded-pools)

[Nós integrais](../zcash-tech/full-nodes)

[NU6.1](../zcash-tech/nu6-1)

[Electric Coin Company](../zcash-organizations/electric-coin-company)

[O que são ZEC e Zcash](../start-here/what-is-zec-and-zcash)

---

Série: [Índice de atualizações da rede](../start-here/network-upgrades) · Anterior: [Sprout](../zcash-tech/sprout) · Próximo: [Sapling](../zcash-tech/sapling)
