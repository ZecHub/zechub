# Atualizações da rede do Zcash

O Zcash evolui por meio de atualizações da rede: mudanças coordenadas nas regras com as quais todos os nós concordam, cada uma ativada em uma altura de bloco definida. Cada atualização abaixo tem sua própria página que explica, em linguagem simples, o que ela mudou e por quê. É novo no Zcash? Leia as páginas em ordem, do Sprout ao Ironwood.

Para a história visual de como a privacidade do Zcash evoluiu ao longo dessas atualizações, veja [A evolução da privacidade](https://zechub.wiki/zcash-evolution). Esta página é o índice. Aquela é a linha do tempo.

| Atualização | Ativação (UTC) | Bloco | Branch id | O que mudou |
|---|---|---|---|---|
| [Sprout](../zcash-tech/sprout) | 28 de outubro de 2016 | gênese | 00000000 | O lançamento: o primeiro pool blindado e as transações privadas zk-SNARK |
| [Overwinter](../zcash-tech/overwinter) | 26 de junho de 2018 | 347.500 | 5ba81b19 | Proteção contra replay, versionamento de transações e expiração, o que tornou possíveis atualizações seguras |
| [Sapling](../zcash-tech/sapling) | 29 de outubro de 2018 | 419.200 | 76b809bb | Transações blindadas eficientes, rápidas o suficiente para celulares e carteiras de hardware |
| [Blossom](../zcash-tech/blossom) | 11 de dezembro de 2019 | 653.600 | 2bb40e60 | Blocos mais rápidos, cerca de 75 segundos, e maior capacidade de processamento |
| [Heartwood](../zcash-tech/heartwood) | 16 de julho de 2020 | 903.000 | f5b9230b | Recompensas de mineração blindadas e clientes mais leves (FlyClient) |
| [Canopy](../zcash-tech/canopy) | 18 de novembro de 2020 | 1.046.400 | e9ff75a6 | O Fundo de Desenvolvimento, o primeiro halving e a desativação gradual do pool Sprout |
| [NU5](../zcash-tech/nu5) | 31 de maio de 2022 | 1.687.104 | c2d6d0b4 | O pool Orchard sobre o Halo 2 (sem configuração confiável), endereços unificados e transações v5 |
| [NU6](../zcash-tech/nu6) | 23 de novembro de 2024 | 2.726.400 | c8e71055 | O Deferred Dev Fund Lockbox e uma nova divisão do financiamento do desenvolvimento |
| [NU6.1](../zcash-tech/nu6-1) | 24 de novembro de 2025 | 3.146.400 | 4dec4df0 | Governança desse financiamento pela comunidade e pelos detentores de moedas |
| [NU6.2](../zcash-tech/nu6-2) | 3 de junho de 2026 | 3.364.600 | 5437f330 | Uma correção emergencial que corrigiu o circuito Orchard |
| [Ironwood (NU6.3)](../zcash-tech/ironwood) | 28 de julho de 2026 | 3.428.143 | 37a5165b | O pool Ironwood e uma catraca pública que permite a qualquer pessoa auditar a oferta |
| [NU7](../zcash-tech/nu7) | 6 de novembro de 2026 | 3.543.405 | 77190ad9 | Blocos de 25 segundos (ZIP 218), reciclagem de taxas pelo NSM (ZIP 235+237), aposentadoria do Sprout (ZIP 2003) |

As datas são mostradas em UTC. Alguns painéis as mostram no horário local, que corresponde ao mesmo bloco e ao mesmo momento. O gatilho fixo de cada atualização é a altura do bloco de ativação, não a data do calendário.

### Status do NU7

O NU7 foi ativado na Mainnet na altura **3.543.405** ([ZIP 259](https://zips.z.cash/zip-0259)) em **6 de novembro de 2026** (02:34 UTC; a noite de 5 de novembro nos fusos horários dos EUA). Ele entrou em operação antes na Testnet pública, na altura **4.465.026** (4 de outubro de 2026).

Escopo (ZIP 259):

- **Blocos de 25 segundos** (ZIP 218): primeira confirmação cerca de 3× mais rápida; a emissão diária de ZEC não muda.
- **Network Sustainability Mechanism** (ZIP 235 + ZIP 237): 60% das taxas de transação são retiradas de circulação e vão para uma reserva, sendo reemitidas aos mineradores em um cronograma que preserva o halving, a partir de cerca de fevereiro de 2031.
- **Aposentadoria do Sprout** (ZIP 2003): as transações da versão 4 se tornam inválidas; os fundos restantes em Sprout se tornam impossíveis de gastar.
- Limites de ações blindadas e uma janela maior para a média de dificuldade (17 → 102 blocos).

Nenhum novo formato de transação é introduzido. ID do branch de consenso: `0x77190ad9`.

Veja a linha do tempo [A evolução da privacidade](https://zechub.wiki/zcash-evolution) e o [ZIP 259](https://zips.z.cash/zip-0259) para todos os detalhes. Linha do tempo no fórum: [Linha do tempo do NU7](https://forum.zcashcommunity.com/t/nu7-timeline/57655).
