# ZIP 218: O que os blocos de 25 segundos realmente mudam

Na votação de detentores de moedas da NU7, encerrada em 14 de setembro de 2026, cerca de 2.397.669 ZEC votaram a favor da ZIP 218 e 141,6 ZEC votaram contra, um resultado de 99,9%. A maior parte da cobertura resumiu isso como "os blocos do Zcash ficam mais rápidos". Isso é verdade, mas deixa de fora grande parte do que a proposta faz e do que mantém deliberadamente igual.

Esta página explica a ZIP 218 a partir do seu próprio texto: o que muda, o que não muda e qual é o seu custo.

## A versão curta

| | Hoje | Após a ZIP 218 |
|---|---|---|
| Espaçamento-alvo entre blocos | 75 segundos | 25 segundos |
| Blocos por dia | 1.152 | 3.456 |
| Subsídio por bloco (era de halving atual) | 1,5625 ZEC | 0,52083333 ZEC |
| Novos ZEC por dia | inalterado | inalterado |
| Intervalo de halving | 1.680.000 blocos | 5.040.000 blocos |
| Limites de ações blindadas por bloco | nenhum (apenas o limite de tamanho de 2 MB) | 330 no total, com limites por pool |
| Capacidade de processamento do Orchard (transações de 2 ações) | cerca de 2,9 por segundo | cerca de 6,6 por segundo |

![A ZIP 218 reduz o espaçamento alvo dos blocos de 75 segundos para 25, triplicando os blocos diários de 1.152 para 3.456, enquanto divide o subsídio por bloco pelo mesmo fator de três, de 1,5625 para 0,52083333 ZEC, para que a emissão diária permaneça em 1.800 ZEC e o intervalo de halving se estenda de 1.680.000 para 5.040.000 blocos, mantendo as datas de halving fixas](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/nu7-block-timing.png)

Três vezes mais blocos, cada um pagando um terço do valor. O cronograma de emissão permanece o mesmo.

## Por que mudar o tempo de bloco

O principal objetivo é **reduzir o tempo de espera**. Hoje, um pagamento espera em média 75 segundos pela primeira confirmação, independentemente da carga da rede. Com 25 segundos, esse valor cai para 25 segundos em média. A ZIP menciona pagamentos no ponto de venda, depósitos em corretoras e pontes cross-chain como os usos que mais sentem isso.

Vale a pena ter em mente dois pontos da ZIP:

- **Não diz a ninguém para usar menos confirmações.** Para os usuários que mantêm a mesma tolerância ao risco de reversão que têm hoje, a ZIP prevê que o tempo de confirmação melhore em um pouco menos de três vezes.
- **Não substitui o trabalho de finalidade.** A ZIP se descreve como complementar a mecanismos de finalidade como o Crosslink. Blocos mais rápidos na camada base ajudam, quer uma camada de finalidade seja adicionada mais tarde ou não.

A ZIP também observa que uma capacidade de processamento maior, por si só, poderia ter sido obtida com um tamanho de bloco maior. A latência é o motivo para escolher blocos mais curtos.

## O que muda

### Emissão: os mesmos ZEC por dia

Triplicar o número de blocos triplicaria a emissão diária se nada mais mudasse. A ZIP 218 evita isso dividindo o subsídio por bloco por mais um fator de três assim que a NU7 estiver ativa.

Na atual era de halving, isso reduz o subsídio por bloco de **1,5625 ZEC para 0,52083333 ZEC** (52.083.333 zatoshi). Como 156.250.000 zatoshi não é divisível exatamente por três, cada bloco é arredondado para baixo em um terço de zatoshi. Ao longo de um intervalo completo de halving de 5.040.000 blocos, isso totaliza cerca de 0,0168 ZEC.

O subsídio é o total de novos ZEC criados por bloco. A parcela existente de financiamento do desenvolvimento continua a ser retirada dele, portanto os mineradores recebem menos do que o valor total, exatamente como hoje.

> **Uma nota sobre o valor de 0,26041666 ZEC.** A nota explicativa do rascunho da ZIP mostra o subsídio pós-NU7 como floor(156250000 / 6) = 0,26041666 ZEC, e parte da cobertura noticiosa o repetiu. Essa nota está errada por um fator de dois: 156.250.000 zatoshi já é o subsídio pós-Blossom, portanto dividi-lo por seis aplica o fator de dois da Blossom uma segunda vez, além do fator de três da NU7. A fórmula normativa dá floor(1,250,000,000 / (2 · 3 · 4)) = 52.083.333 zatoshi no índice de halving atual. A issue de implementação da Zebra para essa alteração ([#11463](https://github.com/ZcashFoundation/zebra/issues/11463)) registra que a nota conta o fator da Blossom duas vezes, instrui os implementadores a "implementar a fórmula, não a nota" e diz que uma correção foi apresentada para a ZIP. O valor correto na ativação é **0,52083333 ZEC**.

### Os halvings mantêm seu cronograma

O intervalo de halving triplica de 1.680.000 blocos para 5.040.000 blocos. Como os blocos chegam três vezes mais frequentemente, os halvings continuam a ocorrer aproximadamente no mesmo momento em que ocorreriam sem a alteração. O limite total de oferta não é afetado.

Isso é separado da outra questão de emissão na votação da NU7, em que os detentores de moedas votaram por manter os halvings em vez de substituí-los por uma curva suavizada. A ZIP 218 funciona com o modelo de halving existente e não o altera.

### Novos limites de ações blindadas por bloco

A ZIP 218 adiciona limites à quantidade de atividade blindada que um único bloco pode conter:

| Limite | Máximo por bloco |
|---|---|
| Todos os pools blindados combinados | 330 (cada JoinSplit Sprout conta como 2) |
| Ações Orchard | 330 |
| Entradas mais saídas Sapling | 300 |
| JoinSplits Sprout | 25 |

As partes transparentes das transações não são afetadas, e o limite de tamanho de bloco de 2 MB continua a se aplicar.

Os limites existem porque mais blocos significariam, caso contrário, mais trabalho para carteiras e nós. Com os limites em vigor, o pior caso se torna efetivamente **melhor** do que hoje, mesmo com três vezes mais blocos:

- **Sincronização da carteira:** o máximo de dados que uma carteira leve poderia ser obrigada a baixar em um dia cai de cerca de 271 MB para cerca de 169 MB, uma redução de aproximadamente 38%. As descriptografias de teste no pior caso caem de cerca de 4,8 milhões para cerca de 2,3 milhões por dia.
- **Verificação de blocos:** os benchmarks da ZIP colocam um bloco Orchard no pior caso em cerca de 432 ms sob os novos limites, contra cerca de 770 ms no pior caso atual. Para Sapling, a redução é maior, de cerca de 3.175 ms para cerca de 272 ms.

Os limites de Sapling e Sprout são restritos de propósito. Em maio de 2026, Orchard detinha 87,9% dos ZEC blindados, Sapling 11,6% e Sprout 0,5%, portanto os pools menores têm espaço suficiente para seu uso real, ao mesmo tempo que dão menos margem para um atacante abusar. Como as taxas da ZIP 317 cobram o mesmo por ação lógica em todos os pools, um atacante não ganha nada ao fazer spam em um pool em vez de outro.

### Capacidade de processamento

Com 330 ações Orchard por bloco, uma transação Orchard padrão de 2 ações cabe ⌊330 / 2⌋ = 165 vezes por bloco. Com um bloco a cada 25 segundos, isso corresponde a cerca de **6,6 transações por segundo**, acima das cerca de 2,9 de hoje — a ZIP chama isso de um aumento de 2,3× na capacidade de processamento normal do Orchard. O Sapling fica em cerca de 3,0 por segundo, ainda acima do que o Orchard consegue hoje.

### Ajuste de dificuldade

O algoritmo de dificuldade calcula a média em uma janela de blocos recentes. A ZIP 218 aumenta essa janela de 17 blocos para 102, portanto ela continua a abranger cerca de 2.550 segundos de tempo real, o mesmo período que abrangia quando o Zcash foi lançado com blocos de 150 segundos. A ZIP apresenta duas razões: evitar tornar mais fáceis os ataques de manipulação da dificuldade (ela cita o incidente MWEB da Litecoin, em abril de 2026) e suavizar a variação de curto prazo nos tempos de bloco.

Imediatamente após a ativação, os tempos de bloco levarão algum tempo para se estabilizar no novo alvo. Isso é esperado e reflete o que aconteceu em Blossom, quando o Zcash passou de 150 para 75 segundos.

### Valores padrão para nós e carteiras

Estas são recomendações para implementações, em vez de regras de consenso:

- **Expiração de transações:** a expiração padrão aumenta de 40 para 120 blocos, mantendo aproximadamente os mesmos 50 minutos.
- **Profundidade máxima de reorganização:** o limite da Zebra aumenta de 99 para 600 blocos, cerca de 4,2 horas a 25 segundos, a mesma janela que abrangia no lançamento.
- **Profundidade de âncora para transações blindadas:** permanece em 3 blocos, portanto o atraso diminui de 3,75 minutos para 1,25 minutos. A ZIP segue aqui o precedente da Blossom.
- **Várias constantes de rede** medidas em blocos são multiplicadas por três para abranger a mesma quantidade de tempo.

## O que permanece igual

- ZEC emitidos por dia, o cronograma de halving e o limite de oferta
- O limite de tamanho de bloco de 2 MB
- Transações transparentes, que os novos limites de ações não afetam
- Maturidade de Coinbase aos 100 blocos. Observe que isso agora significa cerca de 42 minutos, em vez de cerca de 125, porque a contagem é em blocos, não em tempo.

## A contrapartida: mais blocos obsoletos

Blocos mais rápidos não são gratuitos. Um bloco obsoleto é um bloco válido que perde a corrida para ser incluído na chain porque outro bloco chegou primeiro à rede. Quanto menor for o intervalo entre blocos, mais frequentemente isso acontece, e a ZIP relaciona a taxa de blocos obsoletos com a propagação de blocos, o tempo de verificação e o risco de centralização da mineração.

- **Hoje:** cerca de 0,4%, valor que a ZIP observa poder subestimar a taxa subjacente porque o poder de hash está concentrado em pools.
- **Teórico a 25 segundos:** cerca de 3,26%, com base em atrasos medidos de propagação do Zcash.
- **Teste em devnet:** 99 nós Zebra geograficamente distribuídos, produzindo blocos completos de 2 MB com espaçamento de 25 segundos, mediram uma taxa de blocos obsoletos de 4,86% e uma taxa de forks de 0,37%. O único ajuste necessário foi a configuração de TCP. Como essa devnet era mais descentralizada do que a mainnet atual, a ZIP trata esses valores como próximos do pior caso.
- **Ponto de referência:** a ZIP usa a taxa histórica de blocos obsoletos de 5,4% do proof-of-work do Ethereum como seu limite de segurança. Ambos os valores da devnet ficam abaixo dele.

Há também dois custos menores. As carteiras leves baixam cerca de 200 KB adicionais por dia em cabeçalhos de blocos compactos. E, como há três vezes mais blocos, um nó integral que esteve offline tem mais blocos para processar quando se atualiza, embora cada bloco seja mais barato de verificar. A ZIP aceita ambos.

## Status e cronologia

- **Status da ZIP:** Proposta. Responsáveis: Dev Ojha e Evan Forbes; criada em 13 de março de 2026.
- **Votação de detentores de moedas:** encerrada em 14 de setembro de 2026, com 99,9% de apoio. A votação sinaliza preferência; não altera por si só as regras de consenso.
- **Cronologia:** em um anúncio no Zcash Community Forum em 17 de setembro, as organizações de desenvolvimento concordaram com um cronograma de código concluído até 30 de setembro, NU7 na testnet em 6 de outubro e uma decisão final em 20 de outubro. A altura de ativação na mainnet está agora definida em 3,543,405 ([ZIP 259](https://zips.z.cash/zip-0259)), prevista para cerca de 5 de novembro de 2026.
- **Implementação:** acompanhada na Zebra ([#11440](https://github.com/ZcashFoundation/zebra/issues/11440)) e na Zakura ([PR #1066](https://github.com/zakura-core/zakura/pull/1066)).

## O que isso significa para você

- **Manter ZEC:** você não precisa fazer nada. Seu saldo e o cronograma de oferta não são afetados.
- **Usar uma carteira:** atualize quando sua carteira disponibilizar suporte para a NU7. As primeiras confirmações chegarão cerca de três vezes mais rápido.
- **Operar um nó, corretora ou serviço:** planeje atualizar antes da ativação e revise quaisquer configurações medidas em blocos, pois uma contagem fixa de blocos agora abrange um terço do tempo que abrangia antes.

## Fontes

- [ZIP 218: Espaçamento-alvo de blocos de 25 segundos](https://zips.z.cash/zip-0218)
- [ZIP 208: Espaçamento-alvo de blocos mais curto](https://zips.z.cash/zip-0208), o precedente da Blossom
- [Forum: Proposta — Reduzir o espaçamento-alvo de blocos do Zcash para 25 s](https://forum.zcashcommunity.com/t/proposal-lower-zcash-block-target-spacing-to-25s/54577)
- [Forum: A redução do tempo de bloco do Zcash parece segura para a NU7 com devnet apenas da Zebra](https://forum.zcashcommunity.com/t/zcash-block-time-reduction-appears-safe-for-nu7-w-zebra-only-devnet/55586)
- [issue #11463 da Zebra](https://github.com/ZcashFoundation/zebra/issues/11463), intervalo e subsídio de halving pós-NU7
- [issue #11440 da Zebra](https://github.com/ZcashFoundation/zebra/issues/11440), acompanhamento da implementação da ZIP 218
- Resultados e cronologia da votação da NU7, conforme noticiado por Bitcoin.com News, crypto.news e KuCoin (16–19 de setembro de 2026)
