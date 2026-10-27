<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Blossom.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Blossom

> Blossom entrou em funcionamento na mainnet do Zcash no bloco 653,600 (11 de dezembro de 2019 UTC).

O que você aprenderá: como a Blossom fez com que os blocos do Zcash chegassem cerca de duas vezes mais rápido sem alterar a quantidade de ZEC que a rede cria ao longo do tempo.

Blossom é uma [atualização da rede](../start-here/network-upgrades) do Zcash. Foi implementada pela [ZIP 206](https://zips.z.cash/zip-0206), e sua principal alteração de consenso está definida na [ZIP 208](https://zips.z.cash/zip-0208). Blossom foi uma atualização de escalabilidade: reduziu o tempo-alvo entre blocos de 150 segundos para 75 segundos, por isso os blocos chegam cerca de duas vezes mais frequentemente. A Electric Coin Company liderou e anunciou a Blossom.

Por que isso importa. Quando você envia ZEC, espera que a rede confirme a transação em um bloco. Se os blocos forem lentos, você espera mais tempo. Antes da Blossom, era esperado um novo bloco aproximadamente a cada 150 segundos. A Blossom reduziu esse alvo pela metade, para 75 segundos, por isso as confirmações chegam mais cedo e a chain pode transportar mais transações no mesmo período. Ela fez isso sem criar mais ZEC nem alterar o momento dos futuros halvings.

## Blocos mais rápidos

A principal alteração da Blossom é simples. O espaçamento-alvo entre blocos do Zcash, o tempo que a rede procura manter entre um bloco e o seguinte, caiu de 150 segundos para 75 segundos ([ZIP 208](https://zips.z.cash/zip-0208)). Os blocos são encontrados por prova de trabalho, por isso o intervalo real entre eles varia, mas a rede agora busca um bloco aproximadamente a cada 75 segundos em vez de a cada 150.

Duas coisas resultam disso:

1. Os blocos chegam cerca de duas vezes mais frequentemente, por isso a chain pode transportar aproximadamente o dobro das transações por unidade de tempo.
2. Sua transação recebe a primeira confirmação mais cedo, porque você não espera tanto pelo próximo bloco.

![Antes da Blossom, o alvo de bloco era de 150 segundos, com confirmações mais lentas e menor capacidade de processamento. Depois da Blossom, o alvo é de 75 segundos, com confirmações mais rápidas e aproximadamente o dobro da capacidade de processamento](/content-images/blossom-block-spacing-50b6bfbacc.webp)

## Manter a emissão estável

Blocos mais rápidos levantam uma questão. Se o Zcash produzisse o dobro dos blocos e cada bloco continuasse a pagar a mesma recompensa, a rede criaria ZEC duas vezes mais rápido. A Blossom evita isso. Reduziu pela metade a recompensa paga por bloco e duplicou o intervalo de halving da recompensa de bloco de 840,000 para 1,680,000 blocos ([ZIP 208](https://zips.z.cash/zip-0208)). O dobro dos blocos, cada um pagando metade, resulta na mesma quantidade de ZEC criada por unidade de tempo. O cronograma de oferta total e o momento dos futuros halvings, medidos em tempo real, não mudaram.

![Como a Blossom mantém a emissão estável: blocos de 75 segundos chegam duas vezes mais frequentemente, a recompensa por bloco é reduzida pela metade, o intervalo de halving é duplicado, portanto a emissão total ao longo do tempo permanece a mesma](/content-images/blossom-emission-balance-f2443e29ab.webp)

## Uma atualização obrigatória

Blossom foi uma alteração bilateral de consenso, o que significa que todos os nós tinham de atualizar para continuarem seguindo a chain ([ZIP 206](https://zips.z.cash/zip-0206)). Não era opcional para um operador de nó que quisesse se manter sincronizado. A Blossom foi ativada no bloco 653,600 da mainnet e tem seu próprio consensus branch id, uma etiqueta que permite aos nós e às transações confirmar que estão sob as regras da Blossom. A atualização utilizou o mecanismo padrão de atualização da rede do Zcash ([ZIP 200](https://zips.z.cash/zip-0200)).

## Onde a Blossom se encaixa

Blossom foi a terceira atualização da rede do Zcash. Veio depois de Overwinter e Sapling, e antes de Heartwood e Canopy. Ao contrário da Sapling, que reformulou a criptografia blindada do Zcash, a Blossom foi focada em escala e velocidade. Sua principal função era a temporização dos blocos, não novos recursos de privacidade.

## Glossário

| Termo | Significado em linguagem simples |
|---|---|
| Block target spacing | O tempo que a rede procura manter entre um bloco e o seguinte |
| Block reward | O novo ZEC criado e distribuído à medida que cada bloco é minerado |
| Halving interval | Quantos blocos passam entre cada halving da recompensa de bloco |
| Consensus branch id | Uma etiqueta que indica qual conjunto de regras da rede um nó ou uma transação está seguindo |
| Bilateral consensus change | Uma alteração de regras que todos os nós devem adotar para permanecer na rede |
| Network upgrade (NU) | Uma alteração coordenada nas regras de consenso do Zcash, ativada em determinada altura de bloco |

## Perguntas frequentes

A Blossom altera a quantidade de ZEC que existe ou quando os halvings acontecem? Não. A recompensa por bloco foi reduzida pela metade e o intervalo de halving foi duplicado ao mesmo tempo, por isso a quantidade de ZEC criada por unidade de tempo, e o momento dos futuros halvings, permaneceram iguais.

A Blossom altera meu ZEC ou minha privacidade? Não. A Blossom alterou a temporização dos blocos e a matemática das recompensas. Não mexeu em seus saldos nem em suas transações blindadas.

O que 75 segundos realmente significam? É um alvo, não uma garantia. Os blocos são encontrados por prova de trabalho, por isso o intervalo real entre blocos varia. A rede busca um bloco aproximadamente a cada 75 segundos em vez de a cada 150.

Eu tive de fazer alguma coisa quando a Blossom foi ativada? Se você executava um nó integral, precisava atualizá-lo, porque a Blossom era obrigatória. Se usava uma carteira, precisava de uma versão que suportasse as novas regras.

Por que reduzir pela metade a recompensa de bloco? Porque os blocos agora chegam duas vezes mais rápido. Reduzir pela metade a recompensa por bloco impede que a rede crie ZEC duas vezes mais rapidamente.

Quando a Blossom foi ativada? No bloco 653,600 da mainnet, em 11 de dezembro de 2019 UTC.

## Teste sua compreensão

A Blossom fez com que os blocos do Zcash chegassem cerca de duas vezes mais frequentemente. Por que isso não duplicou o ritmo com que novos ZEC são criados?

<details>
<summary>Resposta</summary>

Porque a Blossom também reduziu pela metade a recompensa paga por bloco e duplicou o intervalo de halving de 840,000 para 1,680,000 blocos. O dobro dos blocos, cada um pagando metade, soma a mesma quantidade de ZEC por unidade de tempo, por isso o cronograma de emissão medido em tempo real não mudou.
</details>

### Recursos

[ZIP 208: Espaçamento-alvo entre blocos mais curto](https://zips.z.cash/zip-0208)

[ZIP 206: Implementação da atualização da rede Blossom](https://zips.z.cash/zip-0206)

[Atualização da rede Blossom](https://z.cash/upgrade/blossom/)

[Atualização Blossom melhora a velocidade, a escalabilidade e a capacidade (Electric Coin Company)](https://electriccoin.co/blog/blossom-upgrade-improves-speed-scalability-capacity/)

### Ver também

[Atualizações da rede do Zcash](../start-here/network-upgrades)

[Política monetária do Zcash](../start-here/zcash-monetary-policy)

[O que são ZEC e Zcash](../start-here/what-is-zec-and-zcash)

[Nós integrais](../zcash-tech/full-nodes)

[NU6.1](../zcash-tech/nu6-1)

---

Série: [Índice de atualizações da rede](../start-here/network-upgrades) · Anterior: [Sapling](../zcash-tech/sapling) · Próximo: [Heartwood](../zcash-tech/heartwood)
