<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/NU5.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# NU5

> A NU5 entrou em operação na mainnet do Zcash no bloco 1.687.104 (31 de maio de 2022 UTC).

O que você vai aprender: como a NU5 deu ao Zcash um novo pool blindado que não precisa de configuração confiável, além de um único tipo de endereço que funciona entre pools.

A NU5 (Atualização da rede 5) é a sexta [atualização da rede](../start-here/network-upgrades) do Zcash, implantada pela [ZIP 252](https://zips.z.cash/zip-0252). É uma grande atualização criptográfica. Ela introduziu o protocolo de pagamento blindado Orchard, construído sobre o sistema de provas Halo 2, junto com os Unified Addresses e um novo formato de transação versão 5. A NU5 foi lançada na versão v5.0.0 do zcashd da Electric Coin Company.

Por que isso importa. Um pool blindado só é tão confiável quanto a configuração que o criou. Os dois primeiros pools blindados do Zcash, Sprout e Sapling, precisaram cada um de uma cerimônia única de configuração confiável para gerar seus parâmetros secretos. Se esses parâmetros tivessem sido guardados em vez de destruídos, alguém poderia ter emitido ZEC falsificados sem que ninguém percebesse. O pool Orchard da NU5 elimina essa preocupação ao usar o sistema de provas Halo 2, que não precisa de nenhuma cerimônia desse tipo.

## A configuração confiável

O Orchard é o protocolo blindado introduzido pela NU5, definido na [ZIP 224](https://zips.z.cash/zip-0224). Ele é construído sobre o sistema de provas Halo 2, que usa uma técnica chamada aritmetização PLONKish no ciclo de curvas Pallas e Vesta. O benefício prático é simples: o Halo 2 não precisa de configuração confiável nem de string de referência estruturada, então não existe nenhum parâmetro secreto que possa ser usado indevidamente.

O Sprout e o Sapling dependiam de uma configuração confiável. Um grupo de pessoas realizou uma cerimônia para construir os parâmetros de cada pool, e todos precisavam confiar que pelo menos uma delas tinha destruído sua parte do segredo. O Orchard elimina essa suposição. Os pools mais antigos continuam existindo depois da NU5, então a garantia de ausência de configuração se aplica aos fundos que você mantém no pool Orchard.

![Antes do NU5, o Sprout e o Sapling precisavam de uma cerimônia de configuração confiável. Depois do NU5, o pool Orchard usa o sistema Halo 2 e não precisa de configuração confiável](/content-images/nu5-trusted-setup-5447dbe3f2.webp)

## O que a NU5 mudou

A NU5 reúne várias mudanças de consenso, todas ativadas juntas no bloco 1.687.104.

1. Ela adicionou o pool blindado Orchard (ZIP 224), o protocolo baseado no Halo 2 descrito acima.
2. Ela adicionou o formato de transação versão 5 (ZIP 225), um layout reestruturado com regiões separadas para dados transparentes, Sapling e os novos dados Orchard. Os campos Sprout foram removidos, e o formato mais antigo versão 4 continuou válido após a ativação.
3. Ela introduziu os Unified Addresses e as chaves de visualização unificadas (ZIP 316), abordados na próxima seção.
4. Ela adotou a não maleabilidade do identificador de transação (ZIP 244), uma nova forma de calcular o id de uma transação que separa o que a transação faz das provas e assinaturas que a autorizam.
5. Ela adotou codificações canônicas de pontos Jubjub (ZIP 216) para remover codificações não padronizadas e tornar mais rígidas as regras sobre o que conta como uma transação válida.
6. Ela habilitou a retransmissão de transações versão 5 pela rede peer-to-peer (ZIP 239).

A NU5 também atualizou várias ZIPs existentes (32, 203, 209, 212, 213, 221 e 401) para que levassem em conta o novo pool Orchard.

## Unified Addresses

Antes da NU5, cada pool tinha seu próprio tipo de endereço, e quem enviava precisava saber qual tipo você queria. Os Unified Addresses, definidos na [ZIP 316](https://zips.z.cash/zip-0316), mudam isso. Um único Unified Address pode reunir receptores para mais de um pool, então a carteira de quem envia simplesmente escolhe o melhor que ela suporta.

![Um endereço unificado agrupa receptores de vários pools: um receptor transparente, um receptor Sapling e um novo receptor Orchard](/content-images/nu5-unified-address-6e2c84f66e.webp)

As chaves de visualização unificadas funcionam da mesma forma para a visualização. Elas oferecem visibilidade somente leitura entre os pools que um endereço abrange. Para saber mais, consulte a página [Chaves de visualização](../zcash-tech/viewing-keys).

## Onde a NU5 se encaixa

A NU5 veio depois das atualizações anteriores do Zcash: Overwinter, Sapling, Blossom, Heartwood e Canopy. Ela foi ativada na mainnet em 31 de maio de 2022. O ciclo de curvas do Orchard foi escolhido porque suporta recursão, o que prepara o terreno para trabalhos futuros de escalabilidade. A NU5 é a antecessora direta da NU6 e da linha de atualizações NU6.x, que se basearam no pool Orchard e depois o corrigiram.

## TL;DR

- A NU5 foi ativada na mainnet no bloco 1.687.104 (31 de maio de 2022 UTC), a maior atualização criptográfica do Zcash desde o Sapling, implantada pela ZIP 252.
- Ela lançou o pool blindado Orchard, o primeiro pool do Zcash construído sobre o Halo 2, um sistema de provas que não precisa de nenhuma configuração confiável.
- Ela trouxe os Unified Addresses e as chaves de visualização unificadas (ZIP 316): uma única string de endereço que pode reunir receptores para vários pools.
- Ela migrou as transações para o formato versão 5 (ZIP 225) e tornou os ids de transação não maleáveis (ZIP 244).
- O Orchard roda no ciclo de curvas Pallas/Vesta, que suporta provas recursivas, preparando o terreno para trabalhos futuros de escalabilidade e para a linha NU6.x.

## Explicação principal

O problema da configuração confiável: o Sprout (2016) e o Sapling (2018) exigiram cada um uma cerimônia única para gerar parâmetros secretos, e a segurança dependia de pelo menos um participante destruir seu fragmento. Se todos os participantes tivessem guardado uma cópia em segredo, teria sido possível criar ZEC falsificados. O Orchard elimina completamente essa suposição: o Halo 2 não usa configuração confiável nem string de referência estruturada, então não existe nenhum segredo que possa ser usado indevidamente.

A NU5 reuniu várias mudanças de consenso, ativadas juntas: o pool Orchard (ZIP 224), o formato de transação versão 5 (ZIP 225), os Unified Addresses (ZIP 316), a não maleabilidade do id de transação (ZIP 244), as codificações canônicas de pontos Jubjub (ZIP 216) e a retransmissão peer-to-peer de transações v5 (ZIP 239). Ela também atualizou as ZIPs 32, 203, 209, 212, 213, 221 e 401 para levar em conta o novo pool.

## Analogia visual

Os pools mais antigos são como cofres cuja combinação foi gerada em uma cerimônia coletiva única: você confia que todos os participantes destruíram sua cópia dela. O Orchard é um cofre cuja fechadura se verifica novamente a cada uso: não há cerimônia, não há segredo mestre, não há nada que possa ter sido guardado. Os Unified Addresses são um cartão de visita que lista todas as entradas (transparente, Sapling, Orchard), e o visitante escolhe a porta que realmente consegue abrir.

## Aprofundamento

O Halo 2 usa aritmetização PLONKish no ciclo de curvas Pallas e Vesta, duas curvas compatíveis com pairing que se complementam, e é isso que permite a recursão: provas que verificam outras provas. Essa recursão é a base sobre a qual se constroem os trabalhos futuros de escalabilidade do Zcash. O layout de transação v5 separa as regiões transparente, Sapling e Orchard e elimina os campos Sprout; o formato mais antigo versão 4 continuou válido após a ativação. A ZIP 244 recalcula o id da transação a partir do que a transação faz, e não das provas e assinaturas que a autorizam, fechando vetores de maleabilidade.

## Erros comuns

- **Achar que a NU5 eliminou a configuração confiável de todos os pools.** Só o Orchard dispensa cerimônia; os parâmetros do Sapling ainda existem, então a garantia de ausência de configuração se aplica aos fundos mantidos no Orchard.
- **Supor que endereços ou carteiras antigos pararam de funcionar.** A NU5 adicionou opções; os tipos de endereço por pool e o formato de transação v4 continuaram válidos.
- **Confundir o Orchard com o Halo 2.** O Orchard é o protocolo/pool blindado; o Halo 2 é o sistema de provas sobre o qual ele roda.
- **Tratar os Unified Addresses como o único tipo de endereço.** Eles são um formato adicional que você pode adotar quando sua carteira der suporte a eles.
- **Acreditar que a NU5 mudou a emissão ou a privacidade existente.** Ela adicionou um pool e formatos; os ZEC existentes e a privacidade deles não foram afetados.


## Glossário

| Termo | Significado em linguagem simples |
|---|---|
| Network upgrade (NU) | Uma mudança coordenada nas regras de consenso do Zcash, ativada em uma altura de bloco definida |
| Orchard | O pool blindado que a NU5 introduziu, construído sobre o sistema de provas Halo 2 |
| Halo 2 | O sistema de provas por trás do Orchard que não precisa de configuração confiável |
| Trusted setup | Uma cerimônia única que gera os parâmetros secretos de um pool e na qual é preciso confiar que eles serão destruídos |
| Unified Address | Um único endereço que pode reunir receptores para mais de um pool (ZIP 316) |
| Consensus branch id | Um identificador que indica a qual conjunto de regras uma transação pertence |

## Perguntas frequentes

A NU5 altera meus ZEC ou minha privacidade? Não. A NU5 adicionou um novo pool blindado e um novo formato de endereço. Seus ZEC existentes não são afetados, e sua privacidade não é reduzida. Mover fundos para o Orchard dá a você um pool que não precisa de configuração confiável.

O que é o Orchard? O Orchard é o protocolo blindado do Zcash introduzido pela NU5. Ele roda sobre o sistema de provas Halo 2, então não precisa de cerimônia de configuração confiável.

Preciso fazer alguma coisa? Não. Uma carteira compatível cuida da NU5 para você. Você pode continuar usando endereços mais antigos e pode começar a usar Unified Addresses quando sua carteira oferecê-los.

O que é um Unified Address? Um único endereço que pode conter receptores para mais de um pool. A carteira de quem envia escolhe o pool que suporta, então você não precisa fornecer um endereço diferente para cada tipo.

A NU5 elimina a configuração confiável dos meus fundos mais antigos? Não retroativamente. O Orchard não precisa de configuração confiável, mas os parâmetros anteriores do pool Sapling ainda existem depois da NU5. A garantia de ausência de configuração se aplica aos fundos mantidos no pool Orchard.

O formato de transação antigo parou de funcionar? Não. A NU5 adicionou o formato versão 5, e o formato mais antigo versão 4 continuou válido após a ativação.

## Teste seu entendimento

O Sprout e o Sapling precisaram de uma cerimônia de configuração confiável. O que o pool Orchard da NU5 mudou nesse aspecto, e por que isso importa?

<details>
<summary>Resposta</summary>

O Orchard é construído sobre o sistema de provas Halo 2, que não precisa de configuração confiável nem de string de referência estruturada. Isso elimina o risco de que parâmetros secretos remanescentes possam ser usados para falsificar ZEC. A garantia se aplica aos fundos mantidos no pool Orchard. Os parâmetros mais antigos do Sapling ainda existem depois da NU5.
</details>

### Recursos

[ZIP 252: Implantação da atualização da rede NU5](https://zips.z.cash/zip-0252)

[ZIP 224: Protocolo blindado Orchard](https://zips.z.cash/zip-0224)

[ZIP 225: Formato de transação versão 5](https://zips.z.cash/zip-0225)

[ZIP 316: Unified Addresses e chaves de visualização unificadas](https://zips.z.cash/zip-0316)

[Atualização da rede 5](https://z.cash/upgrade/nu5/)

[Electric Coin Company: versão 5.0.0 do zcashd](https://electriccoin.co/blog/new-release-5-0-0/)

### Veja também

[Atualizações da rede do Zcash](../start-here/network-upgrades)

[Pools blindados](../using-zcash/shielded-pools)

[Halo](../zcash-tech/halo)

[zk-SNARKs](../zcash-tech/zk-snarks)

[Chaves de visualização](../zcash-tech/viewing-keys)

[NU6.1](../zcash-tech/nu6-1)

---

## Páginas relacionadas

- [Halo](./Halo.md): o sistema de provas sem configuração confiável por trás do Orchard
- [Unified Addresses](./Unified_Addresses.md): aprofundamento sobre o endereçamento da ZIP 316
- [Sapling](./Sapling.md): o pool blindado anterior, ainda vinculado à sua cerimônia
- [NU6](./NU6.md): a próxima atualização, construída sobre o pool Orchard
- [zk_SNARKS](./zk_SNARKS.md): a tecnologia de conhecimento zero por trás de tudo


Série: [Índice das atualizações da rede](../start-here/network-upgrades) · Anterior: [Canopy](../zcash-tech/canopy) · Próxima: [NU6](../zcash-tech/nu6)
