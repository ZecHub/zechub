---
<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Blossom.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Blossom

> Blossom entrou em funcionamento na mainnet da Zcash no bloco 653,600 (11 de dezembro de 2019 UTC).

O que vais aprender: como a Blossom fez com que os blocos da Zcash chegassem cerca de duas vezes mais depressa sem alterar a quantidade de ZEC que a rede cria ao longo do tempo.

Blossom é uma [atualização de rede](../start-here/network-upgrades) da Zcash. Foi implementada pela [ZIP 206](https://zips.z.cash/zip-0206), e a sua principal alteração de consenso está definida na [ZIP 208](https://zips.z.cash/zip-0208). Blossom foi uma atualização de escalabilidade: reduziu o tempo-alvo entre blocos de 150 segundos para 75 segundos, por isso os blocos chegam cerca de duas vezes mais frequentemente. A Electric Coin Company liderou e anunciou a Blossom.

Porque isto importa. Quando envias ZEC, esperas que a rede confirme a transação num bloco. Se os blocos forem lentos, esperas mais tempo. Antes da Blossom, era esperado um novo bloco aproximadamente a cada 150 segundos. A Blossom reduziu esse alvo para metade, para 75 segundos, por isso as confirmações chegam mais cedo e a cadeia pode transportar mais transações no mesmo período de tempo. Fê-lo sem criar mais ZEC nem alterar o momento dos futuros halvings.

## Blocos mais rápidos

A principal alteração da Blossom é simples. O espaçamento-alvo entre blocos da Zcash, o tempo que a rede procura manter entre um bloco e o seguinte, caiu de 150 segundos para 75 segundos ([ZIP 208](https://zips.z.cash/zip-0208)). Os blocos são encontrados por prova de trabalho, por isso o intervalo real entre eles varia, mas a rede agora aponta para um bloco aproximadamente a cada 75 segundos em vez de a cada 150.

Daqui resultam duas coisas:

1. Os blocos chegam cerca de duas vezes mais frequentemente, por isso a cadeia pode transportar aproximadamente o dobro das transações por unidade de tempo.
2. A tua transação recebe a primeira confirmação mais cedo, porque não esperas tanto pelo próximo bloco.

![Antes da Blossom, o alvo de bloco era de 150 segundos, com confirmações mais lentas e menor capacidade de processamento. Depois da Blossom, o alvo é de 75 segundos, com confirmações mais rápidas e aproximadamente o dobro da capacidade de processamento](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/blossom-block-spacing.png)

## Manter a emissão estável

Blocos mais rápidos levantam uma questão. Se a Zcash produzisse o dobro dos blocos e cada bloco continuasse a pagar a mesma recompensa, a rede criaria ZEC duas vezes mais depressa. A Blossom evita isso. Reduziu para metade a recompensa paga por bloco e duplicou o intervalo de halving da recompensa de bloco de 840,000 para 1,680,000 blocos ([ZIP 208](https://zips.z.cash/zip-0208)). O dobro dos blocos, cada um a pagar metade, resulta na mesma quantidade de ZEC criada por unidade de tempo. O calendário de oferta total e o momento dos futuros halvings, medidos em tempo real, não mudaram.

![Como a Blossom mantém a emissão estável: blocos de 75 segundos chegam duas vezes mais frequentemente, a recompensa por bloco é reduzida para metade, o intervalo de halving é duplicado, por isso a emissão total ao longo do tempo permanece a mesma](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/blossom-emission-balance.png)

## Uma atualização obrigatória

Blossom foi uma alteração bilateral de consenso, o que significa que todos os nós tinham de atualizar para continuarem a seguir a cadeia ([ZIP 206](https://zips.z.cash/zip-0206)). Não era opcional para um operador de nó que quisesse manter-se sincronizado. A Blossom ativou no bloco 653,600 da mainnet e tem o seu próprio consensus branch id, uma etiqueta que permite aos nós e às transações confirmar que estão sob as regras da Blossom. A atualização utilizou o mecanismo padrão de atualização de rede da Zcash ([ZIP 200](https://zips.z.cash/zip-0200)).

## Onde a Blossom se enquadra

Blossom foi a terceira atualização de rede da Zcash. Veio depois de Overwinter e Sapling, e antes de Heartwood e Canopy. Ao contrário da Sapling, que reformulou a criptografia shielded da Zcash, a Blossom esteve focada em escala e velocidade. A sua principal função era a temporização dos blocos, não novas funcionalidades de privacidade.

## Glossário

| Termo | Significado em linguagem simples |
|---|---|
| Espaçamento-alvo entre blocos | O tempo que a rede procura manter entre um bloco e o seguinte |
| Recompensa de bloco | O novo ZEC criado e distribuído à medida que cada bloco é minerado |
| Intervalo de halving | Quantos blocos passam entre cada halving da recompensa de bloco |
| Consensus branch id | Uma etiqueta que indica qual conjunto de regras da rede um nó ou uma transação está a seguir |
| Alteração bilateral de consenso | Uma alteração de regras que todos os nós têm de adotar para permanecerem na rede |
| Atualização de rede (NU) | Uma alteração coordenada às regras de consenso da Zcash, ativada numa determinada altura de bloco |

## FAQ

A Blossom altera a quantidade de ZEC que existe ou quando os halvings acontecem? Não. A recompensa por bloco foi reduzida para metade e o intervalo de halving foi duplicado ao mesmo tempo, por isso a quantidade de ZEC criada por unidade de tempo, e o momento dos futuros halvings, manteve-se igual.

A Blossom altera o meu ZEC ou a minha privacidade? Não. A Blossom alterou a temporização dos blocos e a matemática das recompensas. Não mexeu nos teus saldos nem nas tuas transações shielded.

O que significam realmente 75 segundos? É um alvo, não uma garantia. Os blocos são encontrados por prova de trabalho, por isso o intervalo real entre blocos varia. A rede procura um bloco aproximadamente a cada 75 segundos em vez de a cada 150.

Tive de fazer alguma coisa quando a Blossom ativou? Se executavas um nó completo, precisavas de o atualizar, porque a Blossom era obrigatória. Se usavas uma wallet, precisavas de uma versão que suportasse as novas regras.

Porque reduzir para metade a recompensa de bloco? Porque os blocos agora chegam duas vezes mais depressa. Reduzir para metade a recompensa por bloco impede que a rede crie ZEC duas vezes mais rapidamente.

Quando é que a Blossom ativou? No bloco 653,600 da mainnet, em 11 de dezembro de 2019 UTC.

## Testa a tua compreensão

A Blossom fez com que os blocos da Zcash chegassem cerca de duas vezes mais frequentemente. Porque é que isso não duplicou o ritmo a que novos ZEC são criados?

<details>
<summary>Resposta</summary>

Porque a Blossom também reduziu para metade a recompensa paga por bloco e duplicou o intervalo de halving de 840,000 para 1,680,000 blocos. O dobro dos blocos, cada um a pagar metade, soma a mesma quantidade de ZEC por unidade de tempo, por isso o calendário de emissão medido em tempo real não mudou.
</details>

### Recursos

[ZIP 208: Espaçamento-alvo entre blocos mais curto](https://zips.z.cash/zip-0208)

[ZIP 206: Implementação da atualização de rede Blossom](https://zips.z.cash/zip-0206)

[Atualização de rede Blossom](https://z.cash/upgrade/blossom/)

[Atualização Blossom melhora a velocidade, a escalabilidade e a capacidade (Electric Coin Company)](https://electriccoin.co/blog/blossom-upgrade-improves-speed-scalability-capacity/)

### Ver também

[Atualizações de rede da Zcash](../start-here/network-upgrades)

[Política monetária da Zcash](../start-here/zcash-monetary-policy)

[O que são ZEC e Zcash](../start-here/what-is-zec-and-zcash)

[Nós completos](../zcash-tech/full-nodes)

[NU6.1](../zcash-tech/nu6-1)

---

Série: [Índice de atualizações de rede](../start-here/network-upgrades) · Anterior: [Sapling](../zcash-tech/sapling) · Seguinte: [Heartwood](../zcash-tech/heartwood)
