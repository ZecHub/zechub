# Atualizações da rede do Zcash

O Zcash melhora por meio de atualizações da rede: alterações coordenadas nas regras com as quais todos os nós concordam, cada uma ativada em uma altura de bloco definida. Cada atualização abaixo tem sua própria página, que explica, em linguagem simples, o que mudou e por quê. Você é novo no Zcash? Leia-as em ordem, de Sprout a Ironwood.

Para a história visual de como a privacidade do Zcash evoluiu ao longo dessas atualizações, consulte [A evolução da privacidade](https://zechub.wiki/zcash-evolution). Esta página é o índice. A outra é a linha do tempo.

| Atualização | Ativação (UTC) | Bloco | ID da ramificação | O que mudou |
|---|---|---|---|---|
| [Sprout](../zcash-tech/sprout) | 28 de outubro de 2016 | gênese | 00000000 | O lançamento: o primeiro pool blindado e transações privadas zk-SNARK |
| [Overwinter](../zcash-tech/overwinter) | 26 de junho de 2018 | 347,500 | 5ba81b19 | Proteção contra repetição, versionamento e expiração de transações, tornando possíveis atualizações seguras |
| [Sapling](../zcash-tech/sapling) | 29 de outubro de 2018 | 419,200 | 76b809bb | Transações blindadas eficientes, suficientemente rápidas para celulares e carteiras de hardware |
| [Blossom](../zcash-tech/blossom) | 11 de dezembro de 2019 | 653,600 | 2bb40e60 | Blocos mais rápidos, cerca de 75 segundos, e maior capacidade de processamento |
| [Heartwood](../zcash-tech/heartwood) | 16 de julho de 2020 | 903,000 | f5b9230b | Recompensas de mineração blindadas e clientes mais leves (FlyClient) |
| [Canopy](../zcash-tech/canopy) | 18 de novembro de 2020 | 1,046,400 | e9ff75a6 | O Fundo de Desenvolvimento, o primeiro halving e a descontinuação gradual do pool Sprout |
| [NU5](../zcash-tech/nu5) | 31 de maio de 2022 | 1,687,104 | c2d6d0b4 | O pool Orchard em Halo 2 (sem configuração confiável), endereços unificados e transações v5 |
| [NU6](../zcash-tech/nu6) | 23 de novembro de 2024 | 2,726,400 | c8e71055 | O Lockbox do Fundo de Desenvolvimento Diferido e uma nova divisão do financiamento para desenvolvimento |
| [NU6.1](../zcash-tech/nu6-1) | 24 de novembro de 2025 | 3,146,400 | 4dec4df0 | Governança da comunidade e dos detentores de moedas desse financiamento |
| [NU6.2](../zcash-tech/nu6-2) | 3 de junho de 2026 | 3,364,600 | 5437f330 | Uma correção de emergência que corrigiu o circuito Orchard |
| [Ironwood (NU6.3)](../zcash-tech/ironwood) | 28 de julho de 2026 | 3,428,143 | 37a5165b | O pool Ironwood e uma catraca pública que permite a qualquer pessoa auditar a oferta |
| **NU7** (em breve) | Testnet: 4 de outubro de 2026; Mainnet: prevista para 5 de novembro de 2026 | Testnet: 4,465,026; Mainnet: 3,543,405 | 77190ad9 | Blocos de 25 segundos (ZIP 218), reciclagem de taxas NSM (ZIP 235+237), descontinuação de Sprout (ZIP 2003) |

As datas são apresentadas em UTC. Alguns painéis as mostram na hora local, mas correspondem ao mesmo bloco e ao mesmo momento. O gatilho fixo para cada atualização é a altura de seu bloco de ativação, não a data do calendário.

### Status da NU7

NU7 está ativo na Testnet pública na altura **4,465,026** (ativado em 4 de outubro de 2026). A altura de ativação da Mainnet é **3,543,405** ([ZIP 259](https://zips.z.cash/zip-0259)), prevista para **5 de novembro de 2026**.

Escopo (ZIP 259):

- **Blocos de 25 segundos** (ZIP 218) — primeira confirmação cerca de 3× mais rápida; emissão diária de ZEC inalterada.
- **Mecanismo de Sustentabilidade da Rede** (ZIP 235 + ZIP 237) — 60% das taxas de transação são retiradas de circulação para uma reserva, sendo reemitidas aos mineradores segundo um calendário que preserva o halving, a partir de cerca de fevereiro de 2031.
- Descontinuação de **Sprout** (ZIP 2003) — as transações da versão 4 tornam-se inválidas; os fundos Sprout restantes tornam-se impossíveis de gastar.
- Limites de ações blindadas e uma janela de cálculo da dificuldade mais ampla (17 → 102 blocos).

Não é introduzido nenhum novo formato de transação. ID da ramificação de consenso: `0x77190ad9`.

Consulte a linha do tempo [A evolução da privacidade](https://zechub.wiki/zcash-evolution) e [ZIP 259](https://zips.z.cash/zip-0259) para todos os detalhes. Linha do tempo no fórum: [NU7 Timeline](https://forum.zcashcommunity.com/t/nu7-timeline/57655).
