<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Canopy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Canopy

> O Canopy entrou em operação na mainnet do Zcash no bloco 1.046.400 (18 de novembro de 2020 UTC).

O que você vai aprender: como o Zcash continuou financiando o próprio desenvolvimento depois do fim da recompensa dos fundadores, e como o Canopy estabeleceu a divisão de recursos sobre a qual as atualizações posteriores ainda se baseiam.

O Canopy é a quinta atualização da rede do Zcash, também chamada de Network Upgrade 4 (NU4). Ele é implantado pela [ZIP 251](https://zips.z.cash/zip-0251) e foi ativado no bloco 1.046.400 da mainnet em 18 de novembro de 2020 (UTC), no mesmo momento do primeiro halving da recompensa de bloco do Zcash. O Canopy foi principalmente uma atualização de governança e monetária. Ele encerrou a recompensa original dos fundadores e criou o novo Fundo de Desenvolvimento do Zcash, que paga a Electric Coin Company, a Zcash Foundation e beneficiários independentes de subsídios. A política por trás desse fundo resultou de um longo processo de governança da comunidade em 2019.

Por que isso importa. O Zcash financia o próprio desenvolvimento com as recompensas de bloco, porque não há nenhuma empresa por trás dele. A recompensa dos fundadores, que pagou pelos primeiros anos, estava programada para terminar no primeiro halving. O Canopy foi o substituto: ele direcionou uma parcela fixa de cada recompensa de bloco para um Fundo de Desenvolvimento e definiu quem a recebe. Esse modelo foi aprimorado por atualizações posteriores, até o [NU6.1](../zcash-tech/nu6-1).

![Antes do Canopy, a recompensa dos fundadores financiava o desenvolvimento e terminaria no primeiro halving. Depois do Canopy, o Development Fund recebe 20 por cento de cada recompensa de bloco e vai até o segundo halving, em 2024](/content-images/canopy-founders-to-devfund-010676e799.webp)

## O fundo de desenvolvimento

O Canopy encerrou a recompensa original dos fundadores e a substituiu pelo Fundo de Desenvolvimento do Zcash. A mudança ocorreu no mesmo bloco do primeiro halving do Zcash, quando a recompensa de bloco caiu de 6,25 ZEC para 3,125 ZEC. Assim, os mineradores viram sua recompensa ser cortada pela metade no mesmo dia em que uma nova fatia dessa recompensa menor começou a ir para o desenvolvimento.

O fundo foi programado para durar quatro anos, desde esse primeiro halving em novembro de 2020 até o segundo halving em 2024. A política acordada foi registrada como [ZIP 1014](https://zips.z.cash/zip-1014). O mecanismo de consenso que efetivamente movimenta o dinheiro é o mecanismo de fluxos de financiamento: a [ZIP 207](https://zips.z.cash/zip-0207) introduziu a forma geral de direcionar parte do subsídio de bloco a destinatários definidos, e a [ZIP 214](https://zips.z.cash/zip-0214) estabeleceu as regras específicas e os endereços dos destinatários do Fundo de Desenvolvimento.

## Como o dinheiro é dividido

O Fundo de Desenvolvimento fica com 20 por cento de cada recompensa de bloco. Os mineradores ficam com os outros 80 por cento. Esses 20 por cento são então divididos em três partes, conforme a ZIP 1014.

1. 35 por cento para o Bootstrap Project, a organização controladora da Electric Coin Company.
2. 25 por cento para a Zcash Foundation.
3. 40 por cento para os Major Grants, que financiam trabalhos independentes e são administrados pela Zcash Foundation. Os Major Grants depois se tornaram a Zcash Community Grants (ZCG).

Medidas em relação à recompensa de bloco inteira, e não apenas ao fundo, essas parcelas correspondem a 7 por cento para a Electric Coin Company, 5 por cento para a Zcash Foundation e 8 por cento para os Major Grants. As duas formas de descrever são os mesmos números.

![O Development Fund corresponde a 20 por cento de cada recompensa de bloco, dividido em 35 por cento para a Bootstrap e a Electric Coin Company, 25 por cento para a Zcash Foundation e 40 por cento para Major Grants](/content-images/canopy-dev-fund-split-005bf6f2dd.webp)

## A mudança no pool Sprout

O Canopy também começou a aposentar o pool blindado mais antigo. O Sprout foi o primeiro pool blindado do Zcash, e o Canopy começou a desativá-lo gradualmente por meio da [ZIP 211](https://zips.z.cash/zip-0211).

A partir do momento em que o Canopy foi ativado, nenhum valor novo pode ser adicionado ao pool Sprout. Em termos técnicos, o campo vpub_old de toda JoinSplit deve ser zero. Os fundos que já estão no Sprout ainda podem ser sacados, então ninguém fica bloqueado, mas o pool só pode diminuir daqui em diante. Esse é um primeiro passo rumo à eventual descontinuação do pool legado Sprout em favor de pools blindados mais novos.

![Antes do Canopy, valores podiam tanto entrar quanto sair do pool Sprout. Depois do Canopy, nenhum valor novo pode entrar, mas os saques continuam permitidos](/content-images/canopy-sprout-pool-f5166aa049.webp)

## Os extras técnicos

Junto com as mudanças no financiamento, o Canopy trouxe duas ZIPs técnicas menores. A [ZIP 212](https://zips.z.cash/zip-0212) mudou a forma como um destinatário deriva o segredo efêmero do Sapling, derivando-o a partir do texto simples da note. A [ZIP 215](https://zips.z.cash/zip-0215) estabeleceu regras explícitas para validar assinaturas Ed25519, para que todos os nós concordem exatamente sobre quais assinaturas são válidas.

## TL;DR

- O Canopy (NU4) foi ativado no bloco 1.046.400 da mainnet (18 de novembro de 2020 UTC), o mesmo bloco do primeiro halving do Zcash, que cortou a recompensa de bloco de 6,25 para 3,125 ZEC.
- Ele aposentou a recompensa dos fundadores e criou o Fundo de Desenvolvimento do Zcash: 20% de cada recompensa de bloco por quatro anos, até o segundo halving em 2024 (política da ZIP 1014; mecanismo das ZIP 207/214).
- Os 20% do fundo são divididos em 35% para a Bootstrap (Electric Coin Company), 25% para a Zcash Foundation e 40% para os Major Grants, depois conhecidos como Zcash Community Grants.
- Ele fechou o pool Sprout para novos valores (ZIP 211): nenhum depósito novo pode entrar, mas os saques continuam funcionando.
- Duas ZIPs técnicas vieram junto: a ZIP 212 (segredo efêmero do Sapling derivado do texto simples da note) e a ZIP 215 (regras explícitas de validação Ed25519).

## Explicação principal

O Zcash financia o próprio desenvolvimento com as recompensas de bloco porque não há nenhuma empresa por trás dele. A recompensa dos fundadores cobriu os primeiros anos e estava programada para terminar no primeiro halving, então era preciso ter um substituto antes desse prazo. O Canopy foi esse substituto: a ZIP 207 introduziu o mecanismo geral de fluxos de financiamento, que direciona parte do subsídio de bloco a endereços de destinatários definidos, e a ZIP 214 estabeleceu as regras e os endereços específicos do Fundo de Desenvolvimento. Medidas em relação à recompensa inteira, e não apenas ao fundo, as parcelas são 7% para a ECC, 5% para a Zcash Foundation e 8% para os Major Grants: os mesmos números descritos de duas formas.

O Canopy também começou a aposentar o Sprout, o pool blindado mais antigo do Zcash: a partir da ativação, o campo vpub_old de toda JoinSplit deve ser zero, então o valor pode sair do Sprout, mas nunca voltar a entrar.

## Analogia visual

O Canopy é o momento em que termina a fase de salário dos fundadores de uma startup e uma constituição assume o controle: a partir daquele bloco, 20 centavos de cada dólar que a rede emite são reservados para manutenção e divididos na proporção 35/25/40 entre três departamentos. Ao mesmo tempo, o armazém legado (Sprout) é lacrado para novos armazenamentos: qualquer pessoa ainda pode retirar suas mercadorias, mas nada novo entra.

## Aprofundamento

O fluxo de financiamento é garantido pelo consenso, não pela confiança: os nós rejeitam blocos cuja coinbase não paga aos destinatários definidos as parcelas definidas. O Canopy foi propositalmente ativado no bloco do halving, de modo que os mineradores viram a recompensa ser cortada pela metade no mesmo momento em que uma nova fatia dessa recompensa menor começou a ir para o desenvolvimento. A ZIP 212 mudou a forma como o segredo efêmero do Sapling é derivado (a partir do texto simples da note), e a ZIP 215 estabeleceu regras explícitas de aceitação Ed25519 para que todos os nós validem as assinaturas de forma idêntica: pequenas mudanças que eliminaram classes inteiras de ambiguidade de consenso.

## Erros comuns

- **Pensar que o Canopy é o próprio halving.** Eles compartilharam o mesmo bloco de ativação, mas são mudanças separadas: a ZIP 251 (Canopy) versus o cronograma de emissão.
- **Entender os 20% como tirados da nova parcela dos mineradores.** Os mineradores ficaram com 80%; o fundo fica com 20% da recompensa de bloco.
- **Supor que os fundos no Sprout foram congelados ou destruídos.** Os saques continuam possíveis; apenas os novos depósitos foram interrompidos.
- **Tratar "35/25/40 do fundo" e "7/5/8 da recompensa" como divisões diferentes.** São os mesmos números medidos em relação a bases diferentes.
- **Chamar o Canopy de atualização criptográfica.** Ele foi principalmente uma questão de governança e política monetária; as ZIPs técnicas foram ajustes menores.


## Glossário

| Termo | Significado em linguagem simples |
|---|---|
| Founders reward | O modelo de financiamento original que pagou pelo desenvolvimento inicial do Zcash, programado para terminar no primeiro halving |
| Development Fund | A parcela de 20 por cento de cada recompensa de bloco que o Canopy direcionou para o desenvolvimento, válida até o segundo halving |
| Block reward (subsidy) | Os novos ZEC criados e pagos à medida que cada bloco é minerado |
| Halving | O evento programado em que a recompensa de bloco é cortada pela metade |
| Funding stream | O mecanismo de consenso (ZIP 207) que direciona parte do subsídio de bloco a endereços de destinatários definidos |
| Sprout pool | O pool blindado original do Zcash, que deixou de aceitar novos valores com o Canopy |

## Perguntas frequentes

O Canopy muda meus ZEC ou minha privacidade? Não. O Canopy trata de como o desenvolvimento é financiado, além de algumas regras técnicas. Seus saldos e suas transações blindadas não são afetados.

O Canopy cortou a recompensa de bloco? O Canopy foi ativado no mesmo bloco do primeiro halving do Zcash, que cortou a recompensa de 6,25 ZEC para 3,125 ZEC. O halving faz parte da política monetária do Zcash. O papel do Canopy foi decidir como uma parcela dessa recompensa menor seria usada.

Para que serve o Fundo de Desenvolvimento? Ele financia as pessoas que constroem o Zcash. O dinheiro vai para a Electric Coin Company (por meio do Bootstrap Project), para a Zcash Foundation e para os Major Grants, que apoiam trabalhos independentes.

Ainda posso usar fundos no pool Sprout? Sim. Você ainda pode sacar os fundos que já estão no Sprout. Você só não pode adicionar novos valores a ele depois do Canopy.

O Fundo de Desenvolvimento é permanente? Não. Ele foi programado para durar quatro anos, do primeiro halving em novembro de 2020 até o segundo halving em 2024, dando à comunidade tempo para ver como ele funciona antes de revisá-lo.

Qual é a relação do Canopy com o NU6 e o NU6.1? O Canopy estabeleceu a divisão do financiamento em três partes e o mecanismo de fluxos de financiamento. Atualizações posteriores, incluindo o NU6 e o NU6.1, revisaram e reformularam o Fundo de Desenvolvimento construído sobre essa base.

## Teste seu entendimento

O Canopy foi ativado exatamente no mesmo bloco do primeiro halving do Zcash. Por que esse momento foi escolhido, e o que teria acontecido com o financiamento do desenvolvimento sem o Canopy?

<details>
<summary>Resposta</summary>

A recompensa original dos fundadores estava programada para terminar no primeiro halving. Sem o Canopy, toda a recompensa de bloco, menor depois do halving, teria ido para os mineradores, sem deixar nenhum financiamento do desenvolvimento no nível do protocolo. O Canopy substituiu a recompensa dos fundadores pelo Fundo de Desenvolvimento exatamente nesse bloco, para que o financiamento continuasse sem interrupção.
</details>

### Recursos

[ZIP 251: Implantação da atualização da rede Canopy](https://zips.z.cash/zip-0251)

[ZIP 1014: Criação de um fundo de desenvolvimento para a ECC, a ZF e os Major Grants](https://zips.z.cash/zip-1014)

[ZIP 207: Fluxos de financiamento](https://zips.z.cash/zip-0207)

[ZIP 214: Regras de consenso para um fundo de desenvolvimento do Zcash](https://zips.z.cash/zip-0214)

[ZIP 211: Desativação da adição de novos valores ao pool de valor da chain Sprout](https://zips.z.cash/zip-0211)

[Atualização da rede Canopy](https://z.cash/upgrade/canopy/)

### Veja também

[Atualizações da rede do Zcash](../start-here/network-upgrades)

[Fundo de desenvolvimento](../start-here/development-fund)

[Política monetária do Zcash](../start-here/zcash-monetary-policy)

[Pools blindados](../using-zcash/shielded-pools)

[NU6.1](../zcash-tech/nu6-1)

[Governança do Zcash](../zcash-community/zcash-governance)

---

## Páginas relacionadas

- [Sprout](./Sprout.md): o pool que o Canopy fechou para novos depósitos
- [Heartwood](./Heartwood.md): a atualização anterior da série
- [NU5](./NU5.md): a próxima atualização, que lançou o Orchard
- [NU6.1](./NU6_1.md): o aprimoramento mais recente do financiamento do desenvolvimento


Série: [Índice das atualizações da rede](../start-here/network-upgrades) · Anterior: [Heartwood](../zcash-tech/heartwood) · Próxima: [NU5](../zcash-tech/nu5)
