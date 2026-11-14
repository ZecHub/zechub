<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Blossom.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Blossom

> O Blossom entrou em operação na mainnet do Zcash no bloco 653.600 (11 de dezembro de 2019 UTC).

O que você vai aprender: como o Blossom fez os blocos do Zcash chegarem cerca de duas vezes mais rápido sem mudar a quantidade de ZEC que a rede cria ao longo do tempo.

O Blossom é uma [atualização da rede](../start-here/network-upgrades) do Zcash. Ele foi implantado pela [ZIP 206](https://zips.z.cash/zip-0206), e sua principal mudança de consenso está definida na [ZIP 208](https://zips.z.cash/zip-0208). O Blossom foi uma atualização de escalabilidade: ele reduziu o tempo-alvo entre blocos de 150 segundos para 75 segundos, de modo que os blocos chegam cerca de duas vezes mais frequentemente. A Electric Coin Company liderou e anunciou o Blossom.

Por que isso importa. Quando você envia ZEC, você espera que a rede confirme a transação em um bloco. Se os blocos são lentos, você espera mais. Antes do Blossom, esperava-se um novo bloco a cada 150 segundos, aproximadamente. O Blossom reduziu esse alvo pela metade, para 75 segundos, então as confirmações chegam mais cedo e a chain pode processar mais transações no mesmo intervalo de tempo. Ele fez isso sem criar mais ZEC e sem alterar o momento dos futuros halvings. (O NU7, ativado em novembro de 2026, reduziu o alvo novamente para 25 segundos sob a [ZIP 218](https://zips.z.cash/zip-0218), usando a mesma abordagem.)

## Resumo

- O Blossom foi a terceira atualização da rede do Zcash, ativada no bloco 653.600 da mainnet (11 de dezembro de 2019 UTC), implantada pela ZIP 206, com sua mudança central na ZIP 208.
- Ele reduziu o espaçamento-alvo entre blocos de 150 segundos para 75 segundos: os blocos chegam cerca de duas vezes mais frequentemente, então as primeiras confirmações chegam mais cedo e a capacidade de processamento praticamente dobra.
- Para manter a emissão estável, ele reduziu pela metade a recompensa por bloco e dobrou o intervalo de halving de 840.000 para 1.680.000 blocos.
- O total de ZEC criado por unidade de tempo e o momento real dos futuros halvings não mudaram.
- Foi uma mudança bilateral obrigatória: todos os nós precisaram ser atualizados para permanecer na chain.

## Analogia visual

O Blossom é como uma rede de ônibus que dobra suas partidas. Os ônibus agora passam a cada 75 segundos em vez de a cada 150, então você espera metade do tempo (confirmações mais rápidas) e a rede transporta o dobro de passageiros (capacidade de processamento). Para manter a mesma folha de pagamento dos motoristas, o pagamento por viagem de cada motorista é reduzido pela metade: o mesmo gasto total com salários, apenas distribuído em duas vezes mais viagens.


## Blocos mais rápidos

A mudança central do Blossom é simples. O espaçamento-alvo entre blocos do Zcash, o tempo que a rede busca entre um bloco e o seguinte, caiu de 150 segundos para 75 segundos ([ZIP 208](https://zips.z.cash/zip-0208)). Os blocos são encontrados por prova de trabalho, então o intervalo real entre eles varia, mas agora a rede busca um bloco a cada 75 segundos, aproximadamente, em vez de a cada 150.

Duas consequências decorrem disso:

1. Os blocos chegam cerca de duas vezes mais frequentemente, então a chain pode processar aproximadamente o dobro de transações por unidade de tempo.
2. Sua transação recebe a primeira confirmação mais cedo, porque você não espera tanto pelo próximo bloco.

![Antes do Blossom, o tempo-alvo de bloco era de 150 segundos, com confirmações mais lentas e menor capacidade. Depois do Blossom, o alvo é de 75 segundos, com confirmações mais rápidas e cerca do dobro da capacidade](/content-images/blossom-block-spacing-50b6bfbacc.webp)

## Mantendo a emissão estável

Blocos mais rápidos levantam uma questão. Se o Zcash produzisse o dobro de blocos e cada bloco continuasse pagando a mesma recompensa, a rede criaria ZEC duas vezes mais rápido. O Blossom evita isso. Ele reduziu pela metade a recompensa paga por bloco e dobrou o intervalo de halving da recompensa de bloco de 840.000 para 1.680.000 blocos ([ZIP 208](https://zips.z.cash/zip-0208)). O dobro de blocos, cada um pagando a metade, resulta na mesma quantidade de ZEC criada por unidade de tempo. O cronograma total de oferta e o momento dos futuros halvings, medidos em tempo real, não mudaram.

![Como o Blossom mantém a emissão estável: blocos de 75 segundos chegam com o dobro da frequência, a recompensa por bloco é reduzida pela metade e o intervalo do halving é dobrado, então a emissão total ao longo do tempo permanece a mesma](/content-images/blossom-emission-balance-f2443e29ab.webp)

## Uma atualização obrigatória

O Blossom foi uma mudança de consenso bilateral, o que significa que todos os nós precisaram ser atualizados para continuar seguindo a chain ([ZIP 206](https://zips.z.cash/zip-0206)). Ela não era opcional para um operador de nó que quisesse permanecer sincronizado. O Blossom foi ativado no bloco 653.600 da mainnet e tem seu próprio ID de ramo de consenso, uma marcação que permite que nós e transações confirmem que estão seguindo as regras do Blossom. A atualização usou o mecanismo padrão de atualização da rede do Zcash ([ZIP 200](https://zips.z.cash/zip-0200)).

## Onde o Blossom se encaixa

O Blossom foi a terceira atualização da rede do Zcash. Ele veio depois do Overwinter e do Sapling, e antes do Heartwood e do Canopy. Ao contrário do Sapling, que reformulou a criptografia blindada do Zcash, o Blossom foi focado em escala e velocidade. Sua função principal era o tempo entre blocos, não novos recursos de privacidade.

## Erros comuns

- **Pensar que blocos mais rápidos significavam mais ZEC.** Reduzir pela metade a recompensa por bloco enquanto se dobra a taxa de blocos mantém a emissão exatamente igual por unidade de tempo.
- **Supor que os halvings acontecem mais cedo em tempo real.** O intervalo de halving dobrou de 840.000 para 1.680.000 blocos, então as datas dos halvings em tempo real não mudaram.
- **Interpretar "75 segundos" como uma garantia.** É um alvo de prova de trabalho; os intervalos reais entre blocos variam em torno dele.
- **Tratar o Blossom como uma atualização de privacidade.** Sua função era o tempo entre blocos e a escala; ao contrário do Sapling, ele não alterou nenhuma criptografia.
- **Pensar que operadores de nó poderiam ignorá-lo.** O Blossom foi uma mudança de consenso bilateral; um nó não atualizado se separa da rede por um fork.


## Glossário

| Termo | Significado em linguagem simples |
|---|---|
| Block target spacing | O tempo que a rede busca entre um bloco e o seguinte |
| Block reward | Os novos ZEC criados e pagos à medida que cada bloco é minerado |
| Halving interval | Quantos blocos se passam entre cada halving da recompensa de bloco |
| Consensus branch id | Uma marcação que indica qual conjunto de regras da rede um nó ou uma transação está seguindo |
| Bilateral consensus change | Uma mudança de regra que todos os nós devem adotar para permanecer na rede |
| Network upgrade (NU) | Uma mudança coordenada nas regras de consenso do Zcash, ativada em uma altura de bloco definida |

## Perguntas frequentes

O Blossom muda a quantidade de ZEC existente ou quando os halvings acontecem? Não. A recompensa por bloco foi reduzida pela metade e o intervalo de halving foi dobrado ao mesmo tempo, então a quantidade de ZEC criada por unidade de tempo e o momento dos futuros halvings permaneceram os mesmos.

O Blossom muda meus ZEC ou minha privacidade? Não. O Blossom mudou o tempo entre blocos e o cálculo das recompensas. Ele não afetou seus saldos nem suas transações blindadas.

O que 75 segundos significa na prática? É um alvo, não uma garantia. Os blocos são encontrados por prova de trabalho, então o intervalo real entre blocos varia. A rede busca um bloco a cada 75 segundos, aproximadamente, em vez de a cada 150.

Eu precisei fazer alguma coisa quando o Blossom foi ativado? Se você operava um nó integral, precisou atualizá-lo, porque o Blossom era obrigatório. Se você usava uma carteira, precisava de uma versão compatível com as novas regras.

Por que reduzir a recompensa de bloco pela metade? Porque agora os blocos chegam duas vezes mais rápido. Reduzir pela metade a recompensa por bloco impede que a rede crie ZEC duas vezes mais rápido.

Quando o Blossom foi ativado? No bloco 653.600 da mainnet, em 11 de dezembro de 2019 UTC.

## Teste seu entendimento

O Blossom fez os blocos do Zcash chegarem cerca de duas vezes mais frequentemente. Por que isso não dobrou a taxa de criação de novos ZEC?

<details>
<summary>Answer</summary>

Porque o Blossom também reduziu pela metade a recompensa paga por bloco e dobrou o intervalo de halving de 840.000 para 1.680.000 blocos. O dobro de blocos, cada um pagando a metade, soma a mesma quantidade de ZEC por unidade de tempo, então o cronograma de emissão medido em tempo real não mudou.
</details>

### Recursos

[ZIP 208: Espaçamento-alvo entre blocos mais curto](https://zips.z.cash/zip-0208)

[ZIP 206: Implantação da atualização da rede Blossom](https://zips.z.cash/zip-0206)

[Atualização da rede Blossom](https://z.cash/upgrade/blossom/)

[Atualização Blossom melhora velocidade, escalabilidade e capacidade (Electric Coin Company)](https://electriccoin.co/blog/blossom-upgrade-improves-speed-scalability-capacity/)

### Veja também

[Atualizações da rede do Zcash](../start-here/network-upgrades)

[Política monetária do Zcash](../start-here/zcash-monetary-policy)

[O que é ZEC e Zcash](../start-here/what-is-zec-and-zcash)

[Nós integrais](../zcash-tech/full-nodes)

[NU6.1](../zcash-tech/nu6-1)

---

## Páginas relacionadas

- [Sapling](./Sapling.md) — a atualização anterior (criptografia, não tempo entre blocos)
- [Heartwood](./Heartwood.md) — a próxima atualização da série
- [Nós integrais](./Full_Nodes.md) — o que envolve operar um nó durante atualizações obrigatórias
- [Índice de atualizações da rede](../start-here/network-upgrades) — a linha do tempo completa das atualizações


Série: [Índice de atualizações da rede](../start-here/network-upgrades) · Anterior: [Sapling](../zcash-tech/sapling) · Próxima: [Heartwood](../zcash-tech/heartwood)
