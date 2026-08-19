<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Overwinter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar Página"/>
</a>

# Overwinter

> Overwinter entrou em funcionamento na mainnet da Zcash no bloco 347.500 (26 de junho de 2018 UTC).

O que vai aprender: como a Zcash aprendeu a alterar as suas próprias regras em segurança, e porque é que essa base tornou possível todas as atualizações posteriores, começando com Sapling.

Overwinter é uma [atualização de rede](../start-here/network-upgrades) da Zcash, a primeira após o lançamento da rede. Está definida em várias Propostas de Melhoria da Zcash: [ZIP 200](https://zips.z.cash/zip-0200), [ZIP 201](https://zips.z.cash/zip-0201), [ZIP 202](https://zips.z.cash/zip-0202), [ZIP 203](https://zips.z.cash/zip-0203) e [ZIP 143](https://zips.z.cash/zip-0143). Overwinter não adicionou novas funcionalidades shielded. Em vez disso, reforçou o protocolo para que futuras atualizações pudessem ser lançadas em segurança. A atualização é documentada pela [Electric Coin Company](../zcash-organizations/electric-coin-company) na página oficial de atualizações da Zcash.

Porque isto é importante. Alterar as regras de uma blockchain em funcionamento é perigoso. Se correr mal, duas versões da rede podem divergir, ou uma transação destinada a uma cadeia pode ser copiada para outra. Antes de Overwinter, a Zcash não tinha uma forma padronizada e segura contra replay de coordenar uma alteração de regras. Overwinter corrigiu isso. Deu à Zcash um processo formal para atualizações e, tão importante quanto isso, proteção contra replay em ambos os sentidos, para que uma transação válida sob um conjunto de regras não possa ser reproduzida sob outro. Foi essa base que tornou possível ativar Sapling, e todas as atualizações posteriores, de forma limpa.

![Antes e depois de Overwinter: antes, sem caminho padrão para atualizações e sem proteção contra replay. Depois, um mecanismo de atualização de rede com proteção contra replay em ambos os sentidos e atualizações futuras seguras](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/overwinter-before-after.png)

## O mecanismo de atualização

Overwinter introduziu o Mecanismo de Atualização de Rede, definido em [ZIP 200](https://zips.z.cash/zip-0200). Cada atualização define agora duas coisas: um consensus branch id que identifica o conjunto atual de regras, e uma altura de ativação, o bloco em que as novas regras entram em vigor. Isto dá a todos os que executam software da Zcash uma janela clara para atualizar antes da mudança.

A própria Overwinter foi ativada na mainnet no bloco 347.500.

A [ZIP 201](https://zips.z.cash/zip-0201) trata de como os nós se comportam entre si em torno de uma atualização. Antes da ativação, os nós preferem ligar-se a pares que executam a mesma versão. No momento da ativação, um nó desliga-se de pares que estão num consensus branch diferente, para que a rede se separe de forma limpa segundo as novas regras, em vez de ficar confusa.

## Proteção contra replay

Um replay acontece quando alguém pega numa transação que era válida numa cadeia e a retransmite noutra. Overwinter fecha essa porta com um novo esquema de assinatura, definido em [ZIP 143](https://zips.z.cash/zip-0143). Quando uma wallet assina uma transação, a assinatura passa agora a comprometer-se com o consensus branch id da cadeia atual. Uma transação assinada para um branch simplesmente não é válida em qualquer outro branch, em qualquer dos sentidos. É isso que significa proteção contra replay em ambos os sentidos.

Isto funciona lado a lado com o novo formato de transação versão 3 da [ZIP 202](https://zips.z.cash/zip-0202), por vezes chamado formato Overwintered. Adiciona uma flag fOverwintered e um version group id que deixam claro a que conjunto de regras de consenso uma transação pertence. Como benefício adicional, o novo esquema de assinatura também melhorou a rapidez com que as transações transparentes são validadas.

![Como funciona a proteção contra replay: uma wallet assina uma transação que se compromete com o consensus branch id atual, pelo que a transação não pode ser reproduzida em qualquer outro branch](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/overwinter-replay-flow.png)

## Expiração de transações

A [ZIP 203](https://zips.z.cash/zip-0203) adicionou a expiração de transações. Uma transação pode agora definir uma altura de bloco de expiração. Se não tiver sido minerada até essa altura, os nós removem-na da mempool, a sala de espera das transações não confirmadas. Antes disto, uma transação podia ficar por confirmar durante muito tempo. A expiração significa que uma transação bloqueada acaba por se resolver sozinha, o que reduz a incerteza para si e evita que a mempool se encha de transações antigas que nunca foram mineradas.

## Onde se enquadra

Overwinter foi a primeira atualização de rede da Zcash após o lançamento da mainnet em outubro de 2016, e foi lançada deliberadamente antes de Sapling. O seu papel era infraestrutura, não funcionalidades. Ao instalar primeiro o mecanismo de atualização e a maquinaria de proteção contra replay, deu a todas as atualizações posteriores (Sapling, Blossom, Heartwood, Canopy, NU5 e as seguintes) um caminho seguro para serem ativadas.

![Cronologia desde o lançamento de Sprout em outubro de 2016, passando pelo período de 2016 a 2018 sem um quadro de atualizações, até Overwinter em junho de 2018](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/overwinter-timeline.png)

## Glossário

| Termo | Significado em linguagem simples |
|---|---|
| Atualização de rede (NU) | Uma alteração coordenada às regras de consenso da Zcash, ativada numa altura de bloco definida |
| Consensus branch id | Um identificador curto que nomeia o conjunto atual de regras de consenso |
| Altura de ativação | O bloco em que as novas regras de uma atualização de rede entram em vigor |
| Proteção contra replay | Uma regra que impede que uma transação válida numa cadeia seja reutilizada noutra |
| Mempool | O conjunto de transações que foram transmitidas, mas ainda não foram mineradas para um bloco |
| Expiração de transação | Uma altura de bloco de expiração após a qual uma transação não minerada é removida |

## FAQ

Overwinter alterou o meu ZEC ou a minha privacidade? Não. Overwinter não adicionou novas funcionalidades e não mexeu nas transações shielded. Foi infraestrutura para futuras atualizações seguras. Os seus fundos e a sua privacidade não foram afetados.

Overwinter adicionou Sapling ou endereços shielded? Não. Overwinter não adicionou funcionalidades shielded. Preparou o terreno para que Sapling pudesse ser ativada em segurança mais tarde.

O que é um consensus branch id? É uma etiqueta curta que nomeia o conjunto atual de regras. As transações comprometem-se com ela quando são assinadas, e é isso que dá à Zcash a sua proteção contra replay.

Porque é que algumas fontes dizem 25 de junho e outras 26 de junho? Overwinter foi ativada às 01:37 UTC de 26 de junho de 2018. Isso é logo após a meia-noite UTC, por isso em muitos fusos horários ocidentais o relógio local ainda marcava 25 de junho. É o mesmo bloco e o mesmo momento.

Para que serve a expiração de transações? Significa que uma transação que nunca chega a ser minerada não fica pendurada para sempre. Depois da sua altura de expiração, os nós removem-na, por isso não fica sem saber o que aconteceu a um pagamento bloqueado.

Preciso de fazer alguma coisa? Não. Overwinter foi ativada em 2018. Qualquer wallet ou nó atual da Zcash já segue estas regras.

## Teste a sua compreensão

Overwinter não adicionou novas funcionalidades shielded. Então porque é considerada uma das atualizações mais importantes da história da Zcash?

<details>
<summary>Resposta</summary>

Porque construiu a maquinaria de que todas as atualizações posteriores dependem. Overwinter introduziu o Mecanismo de Atualização de Rede e a proteção contra replay em ambos os sentidos, dando à Zcash uma forma padronizada e segura de alterar as suas regras de consenso. Sem essa base, Sapling e as atualizações seguintes não poderiam ter sido ativadas de forma limpa.
</details>

### Recursos

[ZIP 200: Mecanismo de Atualização de Rede](https://zips.z.cash/zip-0200)

[ZIP 201: Gestão de Pares da Rede para Overwinter](https://zips.z.cash/zip-0201)

[ZIP 202: Formato de Transação Versão 3 para Overwinter](https://zips.z.cash/zip-0202)

[ZIP 203: Expiração de Transações](https://zips.z.cash/zip-0203)

[ZIP 143: Validação de Assinatura de Transações para Overwinter](https://zips.z.cash/zip-0143)

[Atualização de Rede Overwinter](https://z.cash/upgrade/overwinter/)

### Ver também

[Atualizações de Rede da Zcash](../start-here/network-upgrades)

[Pools Shielded](../using-zcash/shielded-pools)

[Nós Completos](../zcash-tech/full-nodes)

[NU6.1](../zcash-tech/nu6-1)

[Electric Coin Company](../zcash-organizations/electric-coin-company)

[O que são ZEC e Zcash](../start-here/what-is-zec-and-zcash)

---

Série: [Índice de Atualizações de Rede](../start-here/network-upgrades) · Anterior: [Sprout](../zcash-tech/sprout) · Seguinte: [Sapling](../zcash-tech/sapling)
