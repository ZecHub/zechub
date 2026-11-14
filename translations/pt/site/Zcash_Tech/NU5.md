<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/NU5.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# NU5

> NU5 entrou em funcionamento na mainnet do Zcash no bloco 1.687.104 (31 de maio de 2022 UTC).

O que você vai aprender: como o NU5 deu ao Zcash um novo pool blindado que não requer configuração confiável, além de um único tipo de endereço que funciona entre pools.

NU5 (Atualização da rede 5) é a sexta atualização da rede do Zcash [atualização da rede](../start-here/network-upgrades), implementada por [ZIP 252](https://zips.z.cash/zip-0252). É uma importante atualização criptográfica. Introduziu o protocolo de pagamentos blindados Orchard, construído sobre o sistema de provas Halo 2, juntamente com endereços unificados e um novo formato de transação versão 5. O NU5 foi disponibilizado na versão zcashd v5.0.0 da Electric Coin Company.

Por que isso importa. Um pool blindado só é tão confiável quanto a configuração que o criou. Os dois primeiros pools blindados do Zcash, Sprout e Sapling, precisaram cada um de uma cerimônia única de configuração confiável para gerar seus parâmetros secretos. Se esses parâmetros tivessem sido mantidos em vez de destruídos, alguém poderia ter criado ZEC falsificado sem que ninguém percebesse. O pool Orchard do NU5 elimina essa preocupação ao usar o sistema de provas Halo 2, que não requer tal cerimônia.

## A configuração confiável

Orchard é o protocolo blindado introduzido pelo NU5, definido em [ZIP 224](https://zips.z.cash/zip-0224). É construído sobre o sistema de provas Halo 2, que usa uma técnica chamada aritmetização PLONKish no ciclo de curvas Pallas e Vesta. A vantagem prática é simples: o Halo 2 não requer configuração confiável nem uma cadeia de referência estruturada, portanto não existe nenhum parâmetro secreto que possa ser usado indevidamente.

Sprout e Sapling dependiam ambos de uma configuração confiável. Um grupo de pessoas realizou uma cerimônia para criar os parâmetros de cada pool, e todos precisavam confiar que pelo menos uma delas destruiu sua parte do segredo. Orchard elimina essa suposição. Os pools mais antigos continuam existindo após o NU5, portanto a garantia de não haver configuração se aplica aos fundos que você mantém no pool Orchard.

![Antes da NU5, Sprout e Sapling precisavam de uma cerimônia de configuração confiável. Depois da NU5, o pool Orchard usa o sistema Halo 2 e não precisa de configuração confiável](/content-images/nu5-trusted-setup-5447dbe3f2.webp)

## O que o NU5 mudou

O NU5 reúne várias alterações de consenso, todas ativadas em conjunto no bloco 1.687.104.

1. Adicionou o pool blindado Orchard (ZIP 224), o protocolo baseado em Halo 2 descrito acima.
2. Adicionou o formato de transação versão 5 (ZIP 225), uma estrutura reorganizada com regiões separadas para dados transparentes, Sapling e novos dados Orchard. Os campos Sprout foram removidos, e o formato mais antigo, versão 4, permaneceu válido após a ativação.
3. Introduziu endereços unificados e chaves de visualização unificadas (ZIP 316), abordados na seção seguinte.
4. Adotou a não maleabilidade do identificador de transação (ZIP 244), uma nova forma de calcular o id de uma transação que separa o que uma transação faz das provas e assinaturas que a autorizam.
5. Adotou codificações canônicas de pontos Jubjub (ZIP 216) para remover codificações não padronizadas e reforçar as regras sobre o que conta como uma transação válida.
6. Ativou a retransmissão de transações versão 5 pela rede peer-to-peer (ZIP 239).

O NU5 também atualizou vários ZIPs existentes (32, 203, 209, 212, 213, 221 e 401) para que considerem o novo pool Orchard.

## Endereços unificados

Antes do NU5, cada pool tinha seu próprio tipo de endereço, e o remetente precisava saber qual tipo você queria. Os endereços unificados, definidos em [ZIP 316](https://zips.z.cash/zip-0316), mudam isso. Um único endereço unificado pode agrupar receptores de mais de um pool, portanto a carteira do remetente simplesmente escolhe o melhor que ela suporta.

![Um Unified Address agrupa receptores para vários pools: um receptor transparente, um receptor Sapling e um novo receptor Orchard](/content-images/nu5-unified-address-6e2c84f66e.webp)

As chaves de visualização unificadas funcionam da mesma forma para visualização. Elas dão visibilidade somente de leitura sobre os pools abrangidos por um endereço. Para saber mais, consulte a página [Chaves de visualização](../zcash-tech/viewing-keys).

## Onde o NU5 se encaixa

O NU5 seguiu as atualizações anteriores do Zcash: Overwinter, Sapling, Blossom, Heartwood e Canopy. Foi ativado na mainnet em 31 de maio de 2022. O ciclo de curvas de Orchard foi escolhido porque suporta recursão, o que estabelece as bases para trabalhos posteriores de escalabilidade. O NU5 é o antecessor direto das atualizações NU6 e NU6.x, que se basearam no pool Orchard e mais tarde o corrigiram.

## Resumo

- NU5 foi ativado na mainnet no bloco 1.687.104 (31 de mai de 2022 UTC) — a maior atualização criptográfica do Zcash desde Sapling, implantada pelo ZIP 252.
- Ele lançou o pool blindado Orchard, o primeiro pool Zcash construído sobre Halo 2 — um sistema de provas que não requer nenhuma configuração confiável.
- Ele introduziu Unified Addresses e chaves de visualização unificadas (ZIP 316): uma única sequência de endereço que pode agrupar receptores para vários pools.
- Ele transferiu as transações para o formato de versão 5 (ZIP 225) e tornou os identificadores de transação não maleáveis (ZIP 244).
- Orchard funciona no ciclo de curvas Pallas/Vesta, que oferece suporte a provas recursivas — base para trabalhos posteriores de escalabilidade e para a linha NU6.x.

## Explicação principal

O problema da configuração confiável: Sprout (2016) e Sapling (2018) exigiram, cada um, uma cerimônia única para gerar parâmetros secretos, e a segurança dependia de pelo menos um participante destruir seu fragmento. Se todos os participantes tivessem mantido secretamente uma cópia, a falsificação de ZEC teria sido possível. Orchard elimina totalmente essa suposição: Halo 2 não usa configuração confiável nem string de referência estruturada, portanto não há segredo que possa ser usado indevidamente.

NU5 reuniu diversas alterações de consenso, ativadas em conjunto: o pool Orchard (ZIP 224), o formato de transação versão 5 (ZIP 225), Unified Addresses (ZIP 316), a não maleabilidade do ID da transação (ZIP 244), as codificações canônicas de pontos Jubjub (ZIP 216) e a retransmissão ponto a ponto de transações v5 (ZIP 239). Também atualizou as ZIPs 32, 203, 209, 212, 213, 221 e 401 para considerar o novo pool.

## Analogia visual

Os pools mais antigos são como cofres cuja combinação foi gerada em uma cerimônia única em grupo — você confia que todos os participantes destruíram sua cópia dela. Orchard é um cofre cuja fechadura se verifica novamente a cada uso: não há cerimônia, segredo mestre ou algo que poderia ter sido guardado. Unified Addresses são um cartão de visita que lista todas as entradas — transparente, Sapling, Orchard — e o visitante escolhe a porta que consegue realmente abrir.

## Análise aprofundada

Halo 2 usa aritmetização PLONKish no ciclo de curvas Pallas e Vesta — duas curvas compatíveis com emparelhamento que se complementam, o que possibilita a recursão: provas que verificam outras provas. Essa recursão é a base sobre a qual se apoia o trabalho posterior de escalabilidade de Zcash. A estrutura da transação v5 separa regiões transparentes, Sapling e Orchard e remove campos Sprout; o formato mais antigo, versão 4, permaneceu válido após a ativação. ZIP 244 recalcula o ID da transação a partir do que uma transação faz, e não das provas e assinaturas que a autorizam, eliminando vetores de maleabilidade.

## Erros comuns

- **Achar que NU5 removeu a configuração confiável de todos os pools.** Somente Orchard não exige cerimônia; os parâmetros de Sapling ainda existem, portanto a garantia de não haver configuração se aplica aos fundos mantidos em Orchard.
- **Presumir que endereços ou carteiras antigos deixaram de funcionar.** NU5 adicionou opções; os tipos de endereço por pool e o formato de transação v4 permaneceram válidos.
- **Confundir Orchard com Halo 2.** Orchard é o protocolo/pool blindado; Halo 2 é o sistema de provas que ele executa.
- **Tratar Unified Addresses como o único tipo de endereço.** Elas são um formato adicional que você pode adotar quando sua carteira oferece suporte a elas.
- **Acreditar que NU5 mudou a emissão ou a privacidade existente.** Ele adicionou um pool e formatos; ZEC existente e sua privacidade permaneceram intactos.

## Glossário

| Termo | Significado em linguagem simples |
|---|---|
| Network upgrade (NU) | Uma alteração coordenada nas regras de consenso do Zcash, ativada em uma altura de bloco definida |
| Orchard | O pool blindado introduzido pelo NU5, construído sobre o sistema de provas Halo 2 |
| Halo 2 | O sistema de provas por trás do Orchard que não requer configuração confiável |
| Trusted setup | Uma cerimônia única que cria os parâmetros secretos de um pool e na qual se deve confiar que eles sejam destruídos |
| Unified Address | Um único endereço que pode agrupar receptores de mais de um pool (ZIP 316) |
| Consensus branch id | Um identificador que indica a qual conjunto de regras uma transação pertence |

## Perguntas frequentes

O NU5 altera meu ZEC ou minha privacidade? Não. O NU5 adicionou um novo pool blindado e um novo formato de endereço. Seu ZEC existente não é afetado, e sua privacidade não é reduzida. Mover fundos para o Orchard dá a você um pool que não requer configuração confiável.

O que é Orchard? Orchard é o protocolo blindado do Zcash introduzido pelo NU5. Ele funciona no sistema de provas Halo 2, portanto não requer uma cerimônia de configuração confiável.

Preciso fazer alguma coisa? Não. Uma carteira compatível cuida do NU5 para você. Você pode continuar usando endereços mais antigos e começar a usar endereços unificados quando sua carteira os disponibilizar.

O que é um endereço unificado? Um único endereço que pode conter receptores para mais de um pool. A carteira do remetente escolhe o pool que ela suporta, portanto você não precisa fornecer um endereço diferente para cada tipo.

O NU5 remove a configuração confiável dos meus fundos mais antigos? Não retroativamente. Orchard não requer configuração confiável, mas os parâmetros anteriores do pool Sapling continuam existindo após o NU5. A garantia de não haver configuração se aplica aos fundos mantidos no pool Orchard.

O formato de transação antigo deixou de funcionar? Não. O NU5 adicionou o formato versão 5, e o formato mais antigo, versão 4, permaneceu válido após a ativação.

## Teste seus conhecimentos

Sprout e Sapling precisaram ambos de uma cerimônia de configuração confiável. O que o pool Orchard do NU5 mudou quanto a isso e por que isso importa?

<details>
<summary>Resposta</summary>

Orchard é construído sobre o sistema de provas Halo 2, que não requer configuração confiável nem uma cadeia de referência estruturada. Isso elimina o risco de parâmetros secretos restantes poderem ser usados para falsificar ZEC. A garantia se aplica aos fundos mantidos no pool Orchard. Os parâmetros mais antigos de Sapling continuam existindo após o NU5.
</details>

### Recursos

[ZIP 252: Deployment of the NU5 Network Upgrade](https://zips.z.cash/zip-0252)

[ZIP 224: Orchard Shielded Protocol](https://zips.z.cash/zip-0224)

[ZIP 225: Version 5 Transaction Format](https://zips.z.cash/zip-0225)

[ZIP 316: Unified Addresses and Unified Viewing Keys](https://zips.z.cash/zip-0316)

[Network Upgrade 5](https://z.cash/upgrade/nu5/)

[Electric Coin Company: zcashd 5.0.0 release](https://electriccoin.co/blog/new-release-5-0-0/)

### Ver também

[Atualizações da rede do Zcash](../start-here/network-upgrades)

[Pools blindados](../using-zcash/shielded-pools)

[Halo](../zcash-tech/halo)

[zk-SNARKs](../zcash-tech/zk-snarks)

[Chaves de visualização](../zcash-tech/viewing-keys)

[NU6.1](../zcash-tech/nu6-1)

---

## Páginas relacionadas

- [Halo](./Halo.md) — o sistema de provas sem configuração confiável por trás de Orchard
- [Endereços unificados](./Unified_Addresses.md) — análise aprofundada do endereçamento 316 de ZIP
- [Sapling](./Sapling.md) — o pool blindado anterior, ainda vinculado à sua cerimônia
- [NU6](./NU6.md) — a próxima atualização, construída sobre o pool Orchard
- [zk_SNARKS](./zk_SNARKS.md) — a tecnologia de conhecimento zero subjacente

Série: [Índice de atualizações da rede](../start-here/network-upgrades) · Anterior: [Canopy](../zcash-tech/canopy) · Próximo: [NU6](../zcash-tech/nu6)
