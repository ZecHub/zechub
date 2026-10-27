<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Canopy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Canopy

> A Canopy entrou em funcionamento na mainnet do Zcash no bloco 1.046.400 (18 de novembro de 2020 UTC).

O que você aprenderá: como o Zcash continuou financiando seu próprio desenvolvimento após o fim da founders reward e como a Canopy definiu a divisão do financiamento sobre a qual as atualizações posteriores continuaram se baseando.

Canopy é a quinta atualização da rede do Zcash, também identificada como Network Upgrade 4 (NU4). É implementada pela [ZIP 251](https://zips.z.cash/zip-0251) e foi ativada no bloco 1.046.400 da mainnet em 18 de novembro de 2020 (UTC), no mesmo momento em que ocorreu o primeiro halving da recompensa por bloco do Zcash. A Canopy foi principalmente uma atualização de governança e monetária. Ela encerrou a founders reward original e iniciou o novo Zcash Development Fund, que paga a Electric Coin Company, a Zcash Foundation e beneficiários de subsídios independentes. A política por trás desse fundo surgiu de um extenso processo de governança comunitária em 2019.

Por que isso importa. O Zcash financia seu próprio desenvolvimento a partir das recompensas por bloco, porque não há uma empresa por trás dele. A founders reward que financiou seus primeiros anos estava programada para terminar no primeiro halving. A Canopy foi a substituta: direcionou uma parcela fixa de cada recompensa por bloco para um Development Fund e definiu quem o recebe. Esse modelo foi refinado por atualizações posteriores, até a [NU6.1](../zcash-tech/nu6-1).

![Antes da Canopy, a founders reward financiava o desenvolvimento e estava programada para terminar no primeiro halving. Depois da Canopy, o Development Fund recebe 20 por cento de cada recompensa de bloco e vigora até o segundo halving em 2024](/content-images/canopy-founders-to-devfund-010676e799.webp)

## O fundo de desenvolvimento

A Canopy encerrou a founders reward original e a substituiu pelo Zcash Development Fund. A mudança ocorreu no mesmo bloco do primeiro halving do Zcash, quando a recompensa por bloco caiu de 6,25 ZEC para 3,125 ZEC. Assim, os mineradores viram sua recompensa ser reduzida pela metade no mesmo dia em que uma nova parcela dessa recompensa menor começou a fluir para o desenvolvimento.

O fundo foi definido para funcionar durante quatro anos, desde esse primeiro halving em novembro de 2020 até o segundo halving em 2024. A política acordada foi registrada na [ZIP 1014](https://zips.z.cash/zip-1014). O mecanismo de consenso que efetivamente movimenta o dinheiro é o funding stream: a [ZIP 207](https://zips.z.cash/zip-0207) introduziu a forma geral de direcionar parte do subsídio por bloco para destinatários definidos, e a [ZIP 214](https://zips.z.cash/zip-0214) estabeleceu as regras específicas e os endereços dos destinatários para o Development Fund.

## Como o dinheiro é dividido

O Development Fund recebe 20 por cento de cada recompensa por bloco. Os mineradores ficam com os outros 80 por cento. Esses 20 por cento são então divididos em três partes, seguindo a ZIP 1014.

1. 35 por cento para o Bootstrap Project, a organização-mãe da Electric Coin Company.
2. 25 por cento para a Zcash Foundation.
3. 40 por cento para Major Grants, que financia trabalho independente e é administrado pela Zcash Foundation. Major Grants mais tarde passou a se chamar Zcash Community Grants (ZCG).

Medidas em relação à recompensa total por bloco, em vez de apenas ao fundo, essas parcelas correspondem a 7 por cento para a Electric Coin Company, 5 por cento para a Zcash Foundation e 8 por cento para Major Grants. As duas formas de descrevê-las representam os mesmos números.

![O Development Fund corresponde a 20 por cento de cada recompensa por bloco, dividido em 35 por cento para Bootstrap e Electric Coin Company, 25 por cento para a Zcash Foundation e 40 por cento para Major Grants](/content-images/canopy-dev-fund-split-005bf6f2dd.webp)

## A mudança no pool Sprout

A Canopy também começou a descontinuar o pool blindado mais antigo. O Sprout foi o primeiro pool blindado do Zcash, e a Canopy começou a desativá-lo por meio da [ZIP 211](https://zips.z.cash/zip-0211).

A partir do momento em que a Canopy foi ativada, nenhum novo valor pode ser adicionado ao pool Sprout. Em termos técnicos, o campo vpub_old de cada JoinSplit deve ser zero. Os fundos já existentes no Sprout ainda podem ser retirados, portanto ninguém fica impedido de acessá-los, mas a partir daqui o pool só pode diminuir. Este é um primeiro passo rumo à eventual descontinuação do pool Sprout legado em favor de pools blindados mais novos.

![Antes da Canopy, o valor podia entrar e sair do pool Sprout. Depois da Canopy, nenhum valor novo pode entrar, mas as retiradas continuam permitidas](/content-images/canopy-sprout-pool-f5166aa049.webp)

## Os extras técnicos

Além das mudanças no financiamento, a Canopy trouxe duas ZIPs técnicas menores. A [ZIP 212](https://zips.z.cash/zip-0212) alterou a forma como um destinatário deriva o segredo efêmero Sapling, derivando-o do texto simples da note. A [ZIP 215](https://zips.z.cash/zip-0215) definiu regras explícitas para validar assinaturas Ed25519, para que cada nó concorde exatamente sobre quais assinaturas são consideradas válidas.

## Glossário

| Termo | Significado em linguagem simples |
|---|---|
| Founders reward | O modelo de financiamento original que pagou pelo desenvolvimento inicial do Zcash, programado para terminar no primeiro halving |
| Development Fund | A parcela de 20 por cento de cada recompensa por bloco que a Canopy direcionou para o desenvolvimento, até o segundo halving |
| Block reward (subsidy) | O novo ZEC criado e pago à medida que cada bloco é minerado |
| Halving | O evento programado em que a recompensa por bloco é reduzida pela metade |
| Funding stream | O mecanismo de consenso (ZIP 207) que direciona parte do subsídio por bloco para endereços de destinatários definidos |
| Sprout pool | O pool blindado original do Zcash, no qual a Canopy deixou de aceitar novos valores |

## FAQ

A Canopy altera meu ZEC ou minha privacidade? Não. A Canopy trata de como o desenvolvimento é financiado, além de algumas regras técnicas. Seus saldos e suas transações blindadas não são afetados.

A Canopy reduziu a recompensa por bloco? A Canopy foi ativada no mesmo bloco do primeiro halving do Zcash, que reduziu a recompensa de 6,25 ZEC para 3,125 ZEC. O halving faz parte da política monetária do Zcash. O papel da Canopy foi decidir como uma parcela dessa recompensa menor é usada.

Para que serve o Development Fund? Ele financia as pessoas que estão construindo o Zcash. O dinheiro vai para a Electric Coin Company (por meio do Bootstrap Project), a Zcash Foundation e Major Grants, que apoia trabalho independente.

Ainda posso usar fundos no pool Sprout? Sim. Você ainda pode retirar fundos que já estão no Sprout. Apenas não pode adicionar novos valores a ele após a Canopy.

O Development Fund é permanente? Não. Ele foi definido para funcionar durante quatro anos, desde o primeiro halving em novembro de 2020 até o segundo halving em 2024, dando à comunidade tempo para ver como funciona antes de reavaliá-lo.

Como a Canopy se relaciona com a NU6 e a NU6.1? A Canopy definiu a divisão tripartida do financiamento e o mecanismo de funding stream. Atualizações posteriores, incluindo a NU6 e a NU6.1, revisitaram e reformularam o Development Fund construído sobre essa base.

## Teste sua compreensão

A Canopy foi ativada exatamente no mesmo bloco que o primeiro halving do Zcash. Por que esse momento foi escolhido e o que teria acontecido com o financiamento do desenvolvimento sem a Canopy?

<details>
<summary>Resposta</summary>

A founders reward original estava programada para terminar no primeiro halving. Sem a Canopy, toda a recompensa por bloco menor após o halving teria ido para os mineradores, deixando o desenvolvimento sem financiamento no nível do protocolo. A Canopy substituiu a founders reward pelo Development Fund exatamente nesse bloco, portanto o financiamento continuou sem interrupção.
</details>

### Recursos

[ZIP 251: Deployment of the Canopy Network Upgrade](https://zips.z.cash/zip-0251)

[ZIP 1014: Establishing a Dev Fund for ECC, ZF, and Major Grants](https://zips.z.cash/zip-1014)

[ZIP 207: Funding Streams](https://zips.z.cash/zip-0207)

[ZIP 214: Consensus rules for a Zcash Development Fund](https://zips.z.cash/zip-0214)

[ZIP 211: Disabling Addition of New Value to the Sprout Chain Value Pool](https://zips.z.cash/zip-0211)

[Atualização da rede Canopy](https://z.cash/upgrade/canopy/)

### Ver também

[Atualizações da rede do Zcash](../start-here/network-upgrades)

[Development Fund](../start-here/development-fund)

[Política monetária do Zcash](../start-here/zcash-monetary-policy)

[Pools blindados](../using-zcash/shielded-pools)

[NU6.1](../zcash-tech/nu6-1)

[Governança do Zcash](../zcash-community/zcash-governance)

---

Série: [índice de atualizações da rede](../start-here/network-upgrades) · Anterior: [Heartwood](../zcash-tech/heartwood) · Próximo: [NU5](../zcash-tech/nu5)
