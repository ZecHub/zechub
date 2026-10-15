# Zcash Atualizações de rede

Zcash melhora através de atualizações de rede: alterações coordenadas às regras com as quais todos os nós concordam, cada uma ativada a uma altura de bloco definida. Cada atualização abaixo tem a sua própria página que explica, em linguagem simples, o que mudou e porquê. É novo em Zcash? Leia-as pela ordem, de Sprout a Ironwood.

Para a história visual de como a privacidade de Zcash evoluiu ao longo destas atualizações, consulte [A Evolução da Privacidade](https://zechub.wiki/zcash-evolution). Esta página é o índice. A outra é a cronologia.

| Atualização | Ativação (UTC) | Bloco | ID da ramificação | O que mudou |
|---|---|---|---|---|
| [Sprout](../zcash-tech/sprout) | 28 de outubro de 2016 | génese | 00000000 | O lançamento: o primeiro pool blindado e transações privadas zk-SNARK |
| [Overwinter](../zcash-tech/overwinter) | 26 de junho de 2018 | 347,500 | 5ba81b19 | Proteção contra repetição, versionamento e expiração de transações, tornando possíveis atualizações seguras |
| [Sapling](../zcash-tech/sapling) | 29 de outubro de 2018 | 419,200 | 76b809bb | Transações blindadas eficientes, suficientemente rápidas para telemóveis e hardware wallets |
| [Blossom](../zcash-tech/blossom) | 11 de dezembro de 2019 | 653,600 | 2bb40e60 | Blocos mais rápidos, cerca de 75 segundos, e maior capacidade de processamento |
| [Heartwood](../zcash-tech/heartwood) | 16 de julho de 2020 | 903,000 | f5b9230b | Recompensas de mineração blindadas e clientes mais leves (FlyClient) |
| [Canopy](../zcash-tech/canopy) | 18 de novembro de 2020 | 1,046,400 | e9ff75a6 | O Fundo de Desenvolvimento, a primeira redução para metade e a descontinuação gradual do pool Sprout |
| [NU5](../zcash-tech/nu5) | 31 de maio de 2022 | 1,687,104 | c2d6d0b4 | O pool Orchard em Halo 2 (sem configuração fidedigna), endereços unificados e transações v5 |
| [NU6](../zcash-tech/nu6) | 23 de novembro de 2024 | 2,726,400 | c8e71055 | O Lockbox do Fundo de Desenvolvimento Diferido e uma nova divisão do financiamento para desenvolvimento |
| [NU6.1](../zcash-tech/nu6-1) | 24 de novembro de 2025 | 3,146,400 | 4dec4df0 | Governação comunitária e dos detentores de moedas desse financiamento |
| [NU6.2](../zcash-tech/nu6-2) | 3 de junho de 2026 | 3,364,600 | 5437f330 | Uma correção de emergência que corrigiu o circuito Orchard |
| [Ironwood (NU6.3)](../zcash-tech/ironwood) | 28 de julho de 2026 | 3,428,143 | 37a5165b | O pool Ironwood e uma catraca pública que permite a qualquer pessoa auditar a oferta |
| **NU7** (em breve) | Testnet: 4 de outubro de 2026; Mainnet: prevista para 5 de novembro de 2026 | Testnet: 4,465,026; Mainnet: por definir (definido a 20 de outubro) | 77190ad9 | Blocos de 25 segundos (ZIP 218), reciclagem de taxas NSM (ZIP 235+237), descontinuação de Sprout (ZIP 2003) |

As datas são apresentadas em UTC. Alguns painéis mostram-nas na hora local, mas correspondem ao mesmo bloco e ao mesmo momento. O gatilho fixo para cada atualização é a altura do respetivo bloco de ativação, não a data de calendário.

### Estado de NU7

NU7 está ativo na Testnet pública à altura **4,465,026** (ativado em 4 de outubro de 2026). A altura de ativação da Mainnet será escolhida em **20 de outubro de 2026**; a meta atual é **5 de novembro de 2026**.

Âmbito (ZIP 259):

- **Blocos de 25 segundos** (ZIP 218) — primeira confirmação cerca de 3× mais rápida; emissão diária de ZEC inalterada.
- **Mecanismo de Sustentabilidade da Rede** (ZIP 235 + ZIP 237) — 60% das taxas de transação são retiradas de circulação para uma reserva, sendo reemitidas aos mineiros segundo um calendário que preserva as reduções para metade, a partir de cerca de fevereiro de 2031.
- Descontinuação de **Sprout** (ZIP 2003) — as transações da versão 4 tornam-se inválidas; os fundos Sprout restantes tornam-se impossíveis de gastar.
- Limites de ações blindadas e uma janela de cálculo da dificuldade mais ampla (17 → 102 blocos).

Não é introduzido nenhum novo formato de transação. ID da ramificação de consenso: `0x77190ad9`.

Consulte a cronologia [A Evolução da Privacidade](https://zechub.wiki/zcash-evolution) e [ZIP 259](https://zips.z.cash/zip-0259) para todos os detalhes. Cronologia no fórum: [Cronologia de NU7](https://forum.zcashcommunity.com/t/nu7-timeline/57655).
