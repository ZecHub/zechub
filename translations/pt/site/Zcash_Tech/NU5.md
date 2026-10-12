<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/NU5.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# NU5

> NU5 entrou em funcionamento na mainnet de Zcash no bloco 1.687.104 (31 de maio de 2022 UTC).

O que vai aprender: como NU5 deu a Zcash um novo pool blindado que não requer configuração de confiança, além de um único tipo de endereço que funciona entre pools.

NU5 (Atualização de Rede 5) é a sexta Zcash [atualização de rede](../start-here/network-upgrades), implementada por [ZIP 252](https://zips.z.cash/zip-0252). É uma importante atualização criptográfica. Introduziu o protocolo de pagamentos blindados Orchard, construído sobre o sistema de prova Halo 2, juntamente com Endereços Unificados e um novo formato de transação versão 5. NU5 foi disponibilizado na versão zcashd v5.0.0 de Electric Coin Company.

Porque é importante. Um pool blindado só é tão fiável quanto a configuração que o criou. Os dois primeiros pools blindados de Zcash, Sprout e Sapling, necessitaram cada um de uma cerimónia única de configuração de confiança para gerar os seus parâmetros secretos. Se esses parâmetros tivessem sido guardados em vez de destruídos, alguém poderia ter criado ZEC falsificado sem que ninguém o detetasse. O pool Orchard de NU5 elimina essa preocupação ao usar o sistema de prova Halo 2, que não requer tal cerimónia.

## A configuração de confiança

Orchard é o protocolo blindado introduzido por NU5, definido em [ZIP 224](https://zips.z.cash/zip-0224). É construído sobre o sistema de prova Halo 2, que utiliza uma técnica chamada aritmetização PLONKish no ciclo de curvas Pallas e Vesta. A vantagem prática é simples: Halo 2 não requer configuração de confiança nem uma cadeia de referência estruturada, pelo que não existe nenhum parâmetro secreto que possa ser utilizado indevidamente.

Sprout e Sapling dependiam ambos de uma configuração de confiança. Um grupo de pessoas realizou uma cerimónia para criar os parâmetros de cada pool, e todos tinham de confiar que pelo menos uma delas destruíra a sua parte do segredo. Orchard elimina essa suposição. Os pools mais antigos continuam a existir após NU5, pelo que a garantia de não haver configuração aplica-se aos fundos que detém no pool Orchard.

![Before NU5, Sprout and Sapling needed a trusted setup ceremony. After NU5, the Orchard pool uses the Halo 2 system and needs no trusted setup](/content-images/nu5-trusted-setup-5447dbe3f2.webp)

## O que NU5 alterou

NU5 reúne várias alterações de consenso, todas ativadas em conjunto no bloco 1.687.104.

1. Adicionou o pool blindado Orchard (ZIP 224), o protocolo baseado em Halo 2 descrito acima.
2. Adicionou o formato de transação versão 5 (ZIP 225), uma estrutura reorganizada com regiões separadas para dados transparentes, Sapling e novos dados Orchard. Os campos Sprout foram removidos, e o formato mais antigo, versão 4, permaneceu válido após a ativação.
3. Introduziu Endereços Unificados e chaves de visualização unificadas (ZIP 316), abordados na secção seguinte.
4. Adotou a não maleabilidade do identificador de transação (ZIP 244), uma nova forma de calcular o id de uma transação que separa o que uma transação faz das provas e assinaturas que a autorizam.
5. Adotou codificações canónicas de pontos Jubjub (ZIP 216) para remover codificações não padronizadas e reforçar as regras sobre o que conta como uma transação válida.
6. Ativou a retransmissão de transações versão 5 pela rede peer-to-peer (ZIP 239).

NU5 também atualizou vários ZIPs existentes (32, 203, 209, 212, 213, 221 e 401) para que considerem o novo pool Orchard.

## Endereços Unificados

Antes de NU5, cada pool tinha o seu próprio tipo de endereço, e o remetente precisava de saber qual o tipo que pretendia. Os Endereços Unificados, definidos em [ZIP 316](https://zips.z.cash/zip-0316), alteram isso. Um único endereço unificado pode agrupar recetores de mais de um pool, pelo que a wallet do remetente simplesmente escolhe o melhor que suporta.

![A unified address bundles receivers for several pools: a transparent receiver, a Sapling receiver, and a new Orchard receiver](/content-images/nu5-unified-address-6e2c84f66e.webp)

As chaves de visualização unificadas funcionam da mesma forma para visualização. Dão visibilidade só de leitura sobre os pools abrangidos por um endereço. Para saber mais, consulte a página [Chaves de Visualização](../zcash-tech/viewing-keys).

## Onde se enquadra NU5

NU5 seguiu as atualizações anteriores de Zcash: Overwinter, Sapling, Blossom, Heartwood e Canopy. Foi ativada na mainnet em 31 de maio de 2022. O ciclo de curvas de Orchard foi escolhido porque suporta recursão, o que estabelece as bases para trabalho posterior de escalabilidade. NU5 é o antecessor direto das atualizações NU6 e NU6.x, que se basearam no pool Orchard e mais tarde o corrigiram.

## Glossário

| Termo | Significado em linguagem simples |
|---|---|
| Network upgrade (NU) | Uma alteração coordenada às regras de consenso de Zcash, ativada a uma altura de bloco definida |
| Orchard | O pool blindado introduzido por NU5, construído sobre o sistema de prova Halo 2 |
| Halo 2 | O sistema de prova por detrás de Orchard que não requer configuração de confiança |
| Trusted setup | Uma cerimónia única que cria os parâmetros secretos de um pool e na qual se deve confiar que estes sejam destruídos |
| Unified Address | Um único endereço que pode agrupar recetores de mais de um pool (ZIP 316) |
| Consensus branch id | Um identificador que assinala a que conjunto de regras pertence uma transação |

## Perguntas frequentes

NU5 altera o meu ZEC ou a minha privacidade? Não. NU5 adicionou um novo pool blindado e um novo formato de endereço. O seu ZEC existente não é afetado, e a sua privacidade não é reduzida. Mover fundos para Orchard dá-lhe um pool que não requer configuração de confiança.

O que é Orchard? Orchard é o protocolo blindado de Zcash introduzido por NU5. Funciona no sistema de prova Halo 2, pelo que não requer uma cerimónia de configuração de confiança.

Tenho de fazer alguma coisa? Não. Uma wallet compatível trata de NU5 por si. Pode continuar a usar endereços mais antigos e começar a usar Endereços Unificados quando a sua wallet os disponibilizar.

O que é um Endereço Unificado? Um único endereço que pode conter recetores para mais de um pool. A wallet do remetente escolhe o pool que suporta, pelo que não tem de fornecer um endereço diferente para cada tipo.

NU5 remove a configuração de confiança dos meus fundos mais antigos? Não retroativamente. Orchard não requer configuração de confiança, mas os parâmetros anteriores do pool Sapling continuam a existir após NU5. A garantia de não haver configuração aplica-se aos fundos mantidos no pool Orchard.

O formato de transação antigo deixou de funcionar? Não. NU5 adicionou o formato versão 5, e o formato mais antigo, versão 4, permaneceu válido após a ativação.

## Teste os seus conhecimentos

Sprout e Sapling necessitaram ambos de uma cerimónia de configuração de confiança. O que mudou o pool Orchard de NU5 quanto a isso e porque é importante?

<details>
<summary>Resposta</summary>

Orchard é construído sobre o sistema de prova Halo 2, que não requer configuração de confiança nem uma cadeia de referência estruturada. Isso elimina o risco de parâmetros secretos restantes poderem ser usados para falsificar ZEC. A garantia aplica-se aos fundos mantidos no pool Orchard. Os parâmetros mais antigos de Sapling continuam a existir após NU5.
</details>

### Recursos

[ZIP 252: Implementação da Atualização de Rede NU5](https://zips.z.cash/zip-0252)

[ZIP 224: Protocolo Blindado Orchard](https://zips.z.cash/zip-0224)

[ZIP 225: Formato de Transação Versão 5](https://zips.z.cash/zip-0225)

[ZIP 316: Endereços Unificados e Chaves de Visualização Unificadas](https://zips.z.cash/zip-0316)

[Atualização de Rede 5](https://z.cash/upgrade/nu5/)

[Electric Coin Company: lançamento da versão zcashd 5.0.0](https://electriccoin.co/blog/new-release-5-0-0/)

### Ver também

[Zcash Atualizações de Rede](../start-here/network-upgrades)

[Pools Blindados](../using-zcash/shielded-pools)

[Halo](../zcash-tech/halo)

[zk-SNARKs](../zcash-tech/zk-snarks)

[Chaves de Visualização](../zcash-tech/viewing-keys)

[NU6.1](../zcash-tech/nu6-1)

---

Série: [Índice de Atualizações de Rede](../start-here/network-upgrades) · Anterior: [Canopy](../zcash-tech/canopy) · Seguinte: [NU6](../zcash-tech/nu6)
