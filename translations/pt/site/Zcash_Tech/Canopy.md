<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Canopy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Canopy

> A Canopy entrou em funcionamento na mainnet da Zcash no bloco 1.046.400 (18 de novembro de 2020 UTC).

O que vais ficar a perceber: como a Zcash continuou a financiar o seu próprio desenvolvimento depois de a founders reward terminar, e como a Canopy definiu a divisão do financiamento sobre a qual as atualizações posteriores continuaram a assentar.

Canopy é a quinta atualização de rede da Zcash, também identificada como Network Upgrade 4 (NU4). É implementada pela [ZIP 251](https://zips.z.cash/zip-0251), e foi ativada no bloco 1.046.400 da mainnet em 18 de novembro de 2020 (UTC), no mesmo momento em que ocorreu a primeira redução para metade da recompensa por bloco da Zcash. A Canopy foi sobretudo uma atualização de governação e monetária. Terminou a founders reward original e iniciou o novo Zcash Development Fund, que paga à Electric Coin Company, à Zcash Foundation e a beneficiários de subsídios independentes. A política por detrás desse fundo resultou de um longo processo de governação comunitária em 2019.

Porque isto importa. A Zcash financia o seu próprio desenvolvimento a partir das recompensas por bloco, porque não tem uma empresa por trás. A founders reward que financiou os seus primeiros anos estava programada para terminar na primeira redução para metade. A Canopy foi a substituição: encaminhou uma percentagem fixa de cada recompensa por bloco para um Development Fund e definiu quem a recebe. Esse modelo foi refinado por atualizações posteriores, até à [NU6.1](../zcash-tech/nu6-1).

![Antes da Canopy, a founders reward financiava o desenvolvimento e estava programada para terminar na primeira redução para metade. Depois da Canopy, o Development Fund recebe 20 por cento de cada recompensa por bloco e vigora até à segunda redução para metade em 2024](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/canopy-founders-to-devfund.png)

## O fundo de desenvolvimento

A Canopy terminou a founders reward original e substituiu-a pelo Zcash Development Fund. A mudança ocorreu no mesmo bloco da primeira redução para metade da Zcash, quando a recompensa por bloco caiu de 6,25 ZEC para 3,125 ZEC. Assim, os mineiros viram a sua recompensa ser reduzida para metade no mesmo dia em que uma nova fatia dessa recompensa mais pequena começou a fluir para o desenvolvimento.

O fundo foi definido para funcionar durante quatro anos, desde esta primeira redução para metade em novembro de 2020 até à segunda redução para metade em 2024. A política acordada foi registada na [ZIP 1014](https://zips.z.cash/zip-1014). O mecanismo de consenso que efetivamente movimenta o dinheiro é o funding stream: a [ZIP 207](https://zips.z.cash/zip-0207) introduziu a forma geral de direcionar parte do subsídio por bloco para destinatários definidos, e a [ZIP 214](https://zips.z.cash/zip-0214) estabeleceu as regras específicas e os endereços dos destinatários para o Development Fund.

## Como o dinheiro é dividido

O Development Fund recebe 20 por cento de cada recompensa por bloco. Os mineiros ficam com os outros 80 por cento. Esses 20 por cento são depois divididos em três partes, seguindo a ZIP 1014.

1. 35 por cento para o Bootstrap Project, a organização-mãe da Electric Coin Company.
2. 25 por cento para a Zcash Foundation.
3. 40 por cento para Major Grants, que financia trabalho independente e é administrado pela Zcash Foundation. Major Grants passou mais tarde a chamar-se Zcash Community Grants (ZCG).

Medidas em relação à recompensa total por bloco em vez de apenas ao fundo, essas partes correspondem a 7 por cento para a Electric Coin Company, 5 por cento para a Zcash Foundation e 8 por cento para Major Grants. Ambas as formas de o descrever representam os mesmos números.

![O Development Fund corresponde a 20 por cento de cada recompensa por bloco, dividido em 35 por cento para Bootstrap e a Electric Coin Company, 25 por cento para a Zcash Foundation e 40 por cento para Major Grants](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/canopy-dev-fund-split.png)

## A mudança no pool Sprout

A Canopy também começou a retirar de circulação o pool shielded mais antigo. O Sprout foi o primeiro pool shielded da Zcash, e a Canopy iniciou o seu desmantelamento através da [ZIP 211](https://zips.z.cash/zip-0211).

A partir do momento em que a Canopy foi ativada, nenhum novo valor pode ser acrescentado ao pool Sprout. Em termos técnicos, o campo vpub_old de cada JoinSplit tem de ser zero. Os fundos já existentes em Sprout continuam a poder ser levantados, por isso ninguém fica impedido de aceder a eles, mas a partir daqui o pool só pode diminuir. Este é um primeiro passo rumo à eventual descontinuação do antigo pool Sprout em favor de pools shielded mais recentes.

![Antes da Canopy, o valor podia tanto entrar como sair do pool Sprout. Depois da Canopy, já não pode entrar novo valor, mas os levantamentos continuam a ser permitidos](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/canopy-sprout-pool.png)

## Os extras técnicos

Além das alterações de financiamento, a Canopy trouxe duas ZIPs técnicas mais pequenas. A [ZIP 212](https://zips.z.cash/zip-0212) alterou a forma como um destinatário deriva o segredo efémero Sapling, derivando-o do texto simples da nota. A [ZIP 215](https://zips.z.cash/zip-0215) definiu regras explícitas para validar assinaturas Ed25519, para que cada nó concorde exatamente sobre quais assinaturas contam como válidas.

## Glossário

| Termo | Significado em linguagem simples |
|---|---|
| Founders reward | O modelo de financiamento original que pagou o desenvolvimento inicial da Zcash, programado para terminar na primeira redução para metade |
| Development Fund | A percentagem de 20 por cento de cada recompensa por bloco que a Canopy direcionou para o desenvolvimento, até à segunda redução para metade |
| Recompensa por bloco (subsídio) | O novo ZEC criado e pago à medida que cada bloco é minerado |
| Halving | O evento programado em que a recompensa por bloco é reduzida para metade |
| Funding stream | O mecanismo de consenso (ZIP 207) que direciona parte do subsídio por bloco para endereços de destinatários definidos |
| Pool Sprout | O pool shielded original da Zcash, no qual a Canopy deixou de aceitar novo valor |

## FAQ

A Canopy altera o meu ZEC ou a minha privacidade? Não. A Canopy trata de como o desenvolvimento é financiado, além de algumas regras técnicas. Os teus saldos e as tuas transações shielded não são afetados.

A Canopy reduziu a recompensa por bloco? A Canopy foi ativada no mesmo bloco da primeira redução para metade da Zcash, que reduziu a recompensa de 6,25 ZEC para 3,125 ZEC. A redução para metade faz parte da política monetária da Zcash. O papel da Canopy foi decidir como é utilizada uma parte dessa recompensa mais pequena.

Para que serve o Development Fund? Financia as pessoas que estão a construir a Zcash. O dinheiro vai para a Electric Coin Company (através do Bootstrap Project), para a Zcash Foundation e para Major Grants, que apoia trabalho independente.

Ainda posso usar fundos no pool Sprout? Sim. Ainda podes levantar fundos que já estejam em Sprout. Apenas não podes acrescentar novo valor depois da Canopy.

O Development Fund é permanente? Não. Foi definido para funcionar durante quatro anos, desde a primeira redução para metade em novembro de 2020 até à segunda redução para metade em 2024, dando à comunidade tempo para ver como funciona antes de o voltar a avaliar.

Como se relaciona a Canopy com a NU6 e a NU6.1? A Canopy definiu a divisão tripartida do financiamento e o mecanismo de funding stream. Atualizações posteriores, incluindo a NU6 e a NU6.1, voltaram a analisar e reformular o Development Fund construído sobre essa base.

## Testa a tua compreensão

A Canopy foi ativada exatamente no mesmo bloco que a primeira redução para metade da Zcash. Porque foi escolhido esse momento, e o que teria acontecido ao financiamento do desenvolvimento sem a Canopy?

<details>
<summary>Resposta</summary>

A founders reward original estava programada para terminar na primeira redução para metade. Sem a Canopy, toda a recompensa por bloco mais pequena após a redução para metade teria ido para os mineiros, deixando de existir financiamento de desenvolvimento ao nível do protocolo. A Canopy substituiu a founders reward pelo Development Fund exatamente nesse bloco, por isso o financiamento continuou sem interrupção.
</details>

### Recursos

[ZIP 251: Implementação da Network Upgrade Canopy](https://zips.z.cash/zip-0251)

[ZIP 1014: Estabelecer um Dev Fund para ECC, ZF e Major Grants](https://zips.z.cash/zip-1014)

[ZIP 207: Funding Streams](https://zips.z.cash/zip-0207)

[ZIP 214: Regras de consenso para um Zcash Development Fund](https://zips.z.cash/zip-0214)

[ZIP 211: Desativar a Adição de Novo Valor ao Pool de Valor da Cadeia Sprout](https://zips.z.cash/zip-0211)

[Network Upgrade Canopy](https://z.cash/upgrade/canopy/)

### Ver também

[Network Upgrades da Zcash](../start-here/network-upgrades)

[Development Fund](../start-here/development-fund)

[Política Monetária da Zcash](../start-here/zcash-monetary-policy)

[Pools Shielded](../using-zcash/shielded-pools)

[NU6.1](../zcash-tech/nu6-1)

[Governação da Zcash](../zcash-community/zcash-governance)

---

Série: [índice de Network Upgrades](../start-here/network-upgrades) · Anterior: [Heartwood](../zcash-tech/heartwood) · Seguinte: [NU5](../zcash-tech/nu5)
