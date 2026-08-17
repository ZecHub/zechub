<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/NU5.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# NU5

> A NU5 entrou em funcionamento na mainnet da Zcash no bloco 1.687.104 (31 de maio de 2022 UTC).

O que vai aprender: como a NU5 deu à Zcash uma nova pool blindada que não precisa de trusted setup, além de um único tipo de endereço que funciona entre pools.

A NU5 (Network Upgrade 5) é a sexta [atualização de rede](../start-here/network-upgrades) da Zcash, implementada pela [ZIP 252](https://zips.z.cash/zip-0252). É uma grande atualização criptográfica. Introduziu o protocolo de pagamentos blindados Orchard, construído sobre o sistema de provas Halo 2, juntamente com endereços unificados e um novo formato de transação versão 5. A NU5 foi lançada na versão zcashd v5.0.0 da Electric Coin Company.

Porque isto importa. Uma pool blindada é tão fiável quanto a configuração que a criou. As duas primeiras pools blindadas da Zcash, Sprout e Sapling, precisaram cada uma de uma cerimónia única de trusted setup para gerar os seus parâmetros secretos. Se esses parâmetros alguma vez tivessem sido guardados em vez de destruídos, alguém poderia ter criado ZEC falsificados sem que ninguém desse por isso. A pool Orchard da NU5 elimina essa preocupação ao usar o sistema de provas Halo 2, que não precisa dessa cerimónia.

## O trusted setup

Orchard é o protocolo blindado mais recente da Zcash, definido na [ZIP 224](https://zips.z.cash/zip-0224). É construído sobre o sistema de provas Halo 2, que usa uma técnica chamada aritmetização PLONKish no ciclo de curvas Pallas e Vesta. O benefício prático é simples: o Halo 2 não precisa de trusted setup nem de structured reference string, por isso não existe nenhum parâmetro secreto que possa vir a ser usado indevidamente.

Tanto Sprout como Sapling dependiam de um trusted setup. Um grupo de pessoas realizou uma cerimónia para construir os parâmetros de cada pool, e todos tinham de confiar que pelo menos uma delas destruiu a sua parte do segredo. Orchard remove essa suposição. As pools mais antigas continuam a existir após a NU5, por isso a garantia de ausência de setup aplica-se aos fundos que detém na pool Orchard.

![Before NU5, Sprout and Sapling needed a trusted setup ceremony. After NU5, the Orchard pool uses the Halo 2 system and needs no trusted setup](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/nu5-trusted-setup.png)

## O que a NU5 mudou

A NU5 reúne várias alterações de consenso, todas ativadas em conjunto no bloco 1.687.104.

1. Adicionou a pool blindada Orchard (ZIP 224), o protocolo baseado em Halo 2 descrito acima.
2. Adicionou o formato de transação versão 5 (ZIP 225), uma estrutura reorganizada com regiões separadas para dados transparentes, Sapling e os novos dados Orchard. Os campos Sprout foram removidos, e o formato versão 4 mais antigo continuou válido após a ativação.
3. Introduziu endereços unificados e unified viewing keys (ZIP 316), abordados na secção seguinte.
4. Adotou a não maleabilidade do identificador de transação (ZIP 244), uma nova forma de calcular o id de uma transação que separa o que uma transação faz das provas e assinaturas que a autorizam.
5. Adotou codificações canónicas de pontos Jubjub (ZIP 216) para remover codificações não padronizadas e tornar mais rigorosas as regras sobre o que conta como uma transação válida.
6. Ativou a retransmissão de transações versão 5 através da rede peer-to-peer (ZIP 239).

A NU5 também atualizou várias ZIPs existentes (32, 203, 209, 212, 213, 221 e 401) para terem em conta a nova pool Orchard.

## Endereços unificados

Antes da NU5, cada pool tinha o seu próprio tipo de endereço, e um remetente tinha de saber qual o tipo que queria. Os endereços unificados, definidos na [ZIP 316](https://zips.z.cash/zip-0316), mudam isso. Um único endereço unificado pode agrupar receivers para mais de uma pool, por isso a wallet do remetente escolhe simplesmente o melhor que suporta.

![A unified address bundles receivers for several pools: a transparent receiver, a Sapling receiver, and a new Orchard receiver](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/nu5-unified-address.png)

As unified viewing keys funcionam da mesma forma para visualização. Dão visibilidade só de leitura entre as pools abrangidas por um endereço. Para saber mais sobre isso, consulte a página [Viewing Keys](../zcash-tech/viewing-keys).

## Onde a NU5 se insere

A NU5 seguiu-se às atualizações anteriores da Zcash: Overwinter, Sapling, Blossom, Heartwood e Canopy. Foi ativada na mainnet em 31 de maio de 2022. O ciclo de curvas de Orchard foi escolhido porque suporta recursão, o que serve de base para trabalho posterior de escalabilidade. A NU5 é a predecessora direta da linha de atualizações NU6 e NU6.x, que se basearam na pool Orchard e mais tarde a corrigiram.

## Glossário

| Termo | Significado em linguagem simples |
|---|---|
| Network upgrade (NU) | Uma alteração coordenada às regras de consenso da Zcash, ativada numa altura de bloco definida |
| Orchard | A pool blindada introduzida pela NU5, construída sobre o sistema de provas Halo 2 |
| Halo 2 | O sistema de provas por trás de Orchard que não precisa de trusted setup |
| Trusted setup | Uma cerimónia única que cria os parâmetros secretos de uma pool e em que é preciso confiar que esses parâmetros são destruídos |
| Unified address | Um único endereço que pode agrupar receivers para mais de uma pool (ZIP 316) |
| Consensus branch id | Um identificador que assinala a que conjunto de regras pertence uma transação |

## FAQ

A NU5 altera os meus ZEC ou a minha privacidade? Não. A NU5 adicionou uma nova pool blindada e um novo formato de endereço. Os seus ZEC existentes não são afetados, e a sua privacidade não é reduzida. Mover fundos para Orchard dá-lhe uma pool que não precisa de trusted setup.

O que é Orchard? Orchard é o protocolo blindado da Zcash introduzido pela NU5. Funciona sobre o sistema de provas Halo 2, por isso não precisa de uma cerimónia de trusted setup.

Tenho de fazer alguma coisa? Não. Uma wallet compatível trata da NU5 por si. Pode continuar a usar endereços antigos e pode começar a usar endereços unificados quando a sua wallet os disponibilizar.

O que é um endereço unificado? Um único endereço que pode conter receivers para mais de uma pool. A wallet do remetente escolhe a pool que suporta, por isso não tem de fornecer um endereço diferente para cada tipo.

A NU5 remove o trusted setup dos meus fundos antigos? Não retroativamente. Orchard não precisa de trusted setup, mas os parâmetros anteriores da pool Sapling continuam a existir após a NU5. A garantia de ausência de setup aplica-se aos fundos mantidos na pool Orchard.

O antigo formato de transação deixou de funcionar? Não. A NU5 adicionou o formato versão 5, e o formato versão 4 mais antigo continuou válido após a ativação.

## Teste a sua compreensão

Tanto Sprout como Sapling precisavam de uma cerimónia de trusted setup. O que mudou a pool Orchard da NU5 em relação a isso, e porque é que isso importa?

<details>
<summary>Resposta</summary>

Orchard é construída sobre o sistema de provas Halo 2, que não precisa de trusted setup nem de structured reference string. Isso elimina o risco de parâmetros secretos remanescentes poderem algum dia ser usados para falsificar ZEC. A garantia aplica-se aos fundos mantidos na pool Orchard. Os parâmetros mais antigos de Sapling continuam a existir após a NU5.
</details>

### Recursos

[ZIP 252: Implementação da Network Upgrade NU5](https://zips.z.cash/zip-0252)

[ZIP 224: Protocolo Blindado Orchard](https://zips.z.cash/zip-0224)

[ZIP 225: Formato de Transação Versão 5](https://zips.z.cash/zip-0225)

[ZIP 316: Endereços Unificados e Unified Viewing Keys](https://zips.z.cash/zip-0316)

[Network Upgrade 5](https://z.cash/upgrade/nu5/)

[Electric Coin Company: lançamento do zcashd 5.0.0](https://electriccoin.co/blog/new-release-5-0-0/)

### Ver também

[Atualizações de Rede da Zcash](../start-here/network-upgrades)

[Pools Blindadas](../using-zcash/shielded-pools)

[Halo](../zcash-tech/halo)

[zk-SNARKS](../zcash-tech/zk-snarks)

[Viewing Keys](../zcash-tech/viewing-keys)

[NU6.1](../zcash-tech/nu6-1)

---

Série: [Índice de Atualizações de Rede](../start-here/network-upgrades) · Anterior: [Canopy](../zcash-tech/canopy) · Seguinte: [NU6](../zcash-tech/nu6)
