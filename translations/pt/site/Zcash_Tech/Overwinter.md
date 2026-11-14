<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Overwinter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Overwinter

> O Overwinter entrou em operação na mainnet do Zcash no bloco 347.500 (26 de junho de 2018 UTC).

O que você vai aprender: como o Zcash aprendeu a mudar as próprias regras com segurança e por que essa base tornou possível cada atualização posterior, a começar pelo Sapling.

O Overwinter é uma Zcash [atualização da rede](../start-here/network-upgrades), a primeira após o lançamento da rede. Ele é definido em várias Propostas de Melhoria do Zcash: [ZIP 200](https://zips.z.cash/zip-0200), [ZIP 201](https://zips.z.cash/zip-0201), [ZIP 202](https://zips.z.cash/zip-0202), [ZIP 203](https://zips.z.cash/zip-0203) e [ZIP 143](https://zips.z.cash/zip-0143). O Overwinter não adicionou nenhum recurso blindado novo. Em vez disso, ele reforçou o protocolo para que as atualizações futuras pudessem ser lançadas com segurança. A atualização é documentada pela [Electric Coin Company](../zcash-organizations/electric-coin-company) na página oficial da atualização Zcash.

Por que isso importa. Mudar as regras de uma blockchain em funcionamento é perigoso. Se algo der errado, duas versões da rede podem discordar, ou uma transação destinada a uma chain pode ser copiada para outra. Antes do Overwinter, o Zcash não tinha uma forma padronizada e protegida contra replay de coordenar uma mudança de regras. O Overwinter resolveu isso. Ele deu ao Zcash um processo formal para atualizações e, igualmente importante, proteção contra replay nos dois sentidos, de modo que uma transação válida sob um conjunto de regras não pode ser reproduzida sob outro. Foi essa base que tornou possível ativar de forma limpa o Sapling e todas as atualizações seguintes.

![Antes e depois do Overwinter: antes, não havia caminho padrão de atualização nem proteção contra replay. Depois, há um mecanismo de atualização da rede com proteção contra replay bidirecional e atualizações futuras seguras](/content-images/overwinter-before-after-acf4f5d283.webp)

## O mecanismo de atualização

O Overwinter introduziu o Mecanismo de Atualização da Rede, definido na [ZIP 200](https://zips.z.cash/zip-0200). Agora, cada atualização define duas coisas: um ID de ramo de consenso, que identifica o conjunto atual de regras, e uma altura de ativação, o bloco a partir do qual as novas regras entram em vigor. Isso dá a todos que executam o software do Zcash uma janela clara para atualizar antes da mudança.

O próprio Overwinter foi ativado na mainnet no bloco 347.500.

A [ZIP 201](https://zips.z.cash/zip-0201) trata de como os nós se relacionam entre si em torno de uma atualização. Antes da ativação, os nós preferem se conectar a pares que executam a mesma versão. Na ativação, um nó se desconecta dos pares que estão em um ramo de consenso diferente, para que a rede se divida de forma limpa segundo as novas regras, em vez de ficar confusa.

## Proteção contra replay

Um replay acontece quando alguém pega uma transação que era válida em uma chain e a retransmite em outra. O Overwinter fecha essa porta com um novo esquema de assinatura, definido na [ZIP 143](https://zips.z.cash/zip-0143). Quando uma carteira assina uma transação, a assinatura agora se compromete com o ID de ramo de consenso da chain atual. Uma transação assinada para um ramo simplesmente não é válida em nenhum outro ramo, em nenhuma das direções. É isso que significa proteção contra replay nos dois sentidos.

Isso funciona em conjunto com o novo formato de transação versão 3 da [ZIP 202](https://zips.z.cash/zip-0202), às vezes chamado de formato Overwintered. Ele adiciona uma flag fOverwintered e um ID de grupo de versão que deixam claro a qual conjunto de regras de consenso uma transação pertence. Como benefício adicional, o novo esquema de assinatura também melhorou a rapidez com que as transações transparentes são validadas.

![Como funciona a proteção contra replay: uma carteira assina uma transação que se compromete com o ID do branch de consenso atual, então a transação não pode ser reproduzida em nenhum outro branch](/content-images/overwinter-replay-flow-754ec8578a.webp)

## Expiração de transações

A [ZIP 203](https://zips.z.cash/zip-0203) adicionou a expiração de transações. Agora uma transação pode definir uma altura de bloco de expiração. Se ela não tiver sido minerada até essa altura, os nós a removem da mempool, a sala de espera das transações não confirmadas. Antes disso, uma transação podia ficar sem confirmação por muito tempo. A expiração significa que uma transação travada acaba sendo eliminada sozinha, o que reduz a incerteza para você e evita que a mempool se encha de transações antigas e não mineradas.

## Onde ele se encaixa

O Overwinter foi a primeira atualização da rede do Zcash após o lançamento da mainnet em outubro de 2016, e foi lançado propositalmente antes do Sapling. Sua função era de infraestrutura, não de recursos. Ao instalar primeiro o mecanismo de atualização e a estrutura de proteção contra replay, ele deu a cada atualização posterior (Sapling, Blossom, Heartwood, Canopy, NU5 e as seguintes) um caminho seguro para a ativação.

![Linha do tempo do lançamento do Sprout em outubro de 2016, passando pelo período de 2016 a 2018 sem uma estrutura de atualização, até o Overwinter em junho de 2018](/content-images/overwinter-timeline-689d9bcf20.webp)

## Glossário

| Termo | Significado em linguagem simples |
|---|---|
| Network upgrade (NU) | Uma mudança coordenada nas regras de consenso do Zcash, ativada em uma altura de bloco definida |
| Consensus branch id | Um identificador curto que nomeia o conjunto atual de regras de consenso |
| Activation height | O bloco a partir do qual as novas regras de uma atualização da rede entram em vigor |
| Replay protection | Uma regra que impede que uma transação válida em uma chain seja reutilizada em outra |
| Mempool | O pool de transações que foram transmitidas, mas ainda não mineradas em um bloco |
| Transaction expiry | Uma altura de bloco de expiração após a qual uma transação não minerada é descartada |

## Perguntas frequentes

O Overwinter mudou meu ZEC ou minha privacidade? Não. O Overwinter não adicionou novos recursos e não mexeu nas transações blindadas. Ele foi a "encanação" para atualizações futuras seguras. Seus fundos e sua privacidade não foram afetados.

O Overwinter adicionou Sapling ou endereços blindados? Não. O Overwinter não adicionou recursos blindados. Ele preparou o terreno para que o Sapling pudesse ser ativado com segurança depois.

O que é um ID de ramo de consenso? É um rótulo curto que nomeia o conjunto atual de regras. As transações se comprometem com ele quando são assinadas, e é isso que dá ao Zcash sua proteção contra replay.

Por que algumas fontes dizem 25 de junho e outras 26 de junho? O Overwinter foi ativado às 01:37 UTC de 26 de junho de 2018. Isso foi logo após a meia-noite UTC, então em muitos fusos horários ocidentais o relógio local ainda marcava 25 de junho. É o mesmo bloco e o mesmo momento.

Para que serve a expiração de transações? Ela garante que uma transação que nunca for minerada não fique pendente para sempre. Após a altura de expiração, os nós a descartam, para que você não fique na dúvida sobre um pagamento travado.

Preciso fazer alguma coisa? Não. O Overwinter foi ativado em 2018. Qualquer carteira ou nó atual do Zcash já segue essas regras.

## Teste seu entendimento

O Overwinter não adicionou nenhum recurso blindado novo. Então, por que ele é considerado uma das atualizações mais importantes da história do Zcash?

<details>
<summary>Resposta</summary>

Porque ele construiu a estrutura da qual todas as atualizações posteriores dependem. O Overwinter introduziu o Mecanismo de Atualização da Rede e a proteção contra replay nos dois sentidos, dando ao Zcash uma forma padronizada e segura de mudar suas regras de consenso. Sem essa base, o Sapling e as atualizações seguintes não poderiam ter sido ativados de forma limpa.
</details>

### Recursos

[ZIP 200: Mecanismo de atualização da rede](https://zips.z.cash/zip-0200)

[ZIP 201: Gerenciamento de pares da rede para o Overwinter](https://zips.z.cash/zip-0201)

[ZIP 202: Formato de transação versão 3 para o Overwinter](https://zips.z.cash/zip-0202)

[ZIP 203: Expiração de transações](https://zips.z.cash/zip-0203)

[ZIP 143: Validação de assinatura de transações para o Overwinter](https://zips.z.cash/zip-0143)

[Atualização da rede Overwinter](https://z.cash/upgrade/overwinter/)

### Veja também

[Atualizações da rede do Zcash](../start-here/network-upgrades)

[Pools blindados](../using-zcash/shielded-pools)

[Nós integrais](../zcash-tech/full-nodes)

[NU6.1](../zcash-tech/nu6-1)

[Electric Coin Company](../zcash-organizations/electric-coin-company)

[O que são ZEC e Zcash](../start-here/what-is-zec-and-zcash)

---

Série: [Índice de atualizações da rede](../start-here/network-upgrades) · Anterior: [Sprout](../zcash-tech/sprout) · Próximo: [Sapling](../zcash-tech/sapling)
