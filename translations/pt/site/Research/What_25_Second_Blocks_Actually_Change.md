# ZIP 218: o que os blocos de 25 segundos realmente mudam

Na enquete de detentores de moedas do NU7, encerrada em 14 de setembro de 2026, cerca de 2.397.669 ZEC votaram a favor do ZIP 218 e 141,6 ZEC votaram contra, um resultado de 99,9%. A maior parte da cobertura resumiu a proposta como "os blocos do Zcash ficam mais rápidos". Isso é verdade, mas deixa de fora a maior parte do que a proposta faz e a maior parte do que ela deliberadamente mantém igual.

Esta página explica o ZIP 218 a partir do próprio texto: o que muda, o que não muda e quanto custa.

## A versão resumida

| | Antes do NU7 | Depois do ZIP 218 (NU7) |
|---|---|---|
| Espaçamento-alvo entre blocos | 75 segundos | 25 segundos |
| Blocos por dia | 1.152 | 3.456 |
| Subsídio por bloco (era de halving atual) | 1,5625 ZEC | 0,52083333 ZEC |
| Novos ZEC por dia | inalterado | inalterado |
| Intervalo de halving | 1.680.000 blocos | 5.040.000 blocos |
| Limites de ações blindadas por bloco | nenhum (apenas o limite de tamanho de 2 MB) | 330 no total, com limites por pool |
| Vazão do Orchard (transações de 2 ações) | cerca de 2,9 por segundo | cerca de 6,6 por segundo |

![O ZIP 218 reduz o espaçamento-alvo entre blocos de 75 para 25 segundos, triplicando os blocos diários de 1,152 para 3,456, enquanto divide o subsídio por bloco pelo mesmo fator de três, de 1.5625 para 0.52083333 ZEC, de modo que a emissão diária permanece em 1,800 ZEC e o intervalo do halving se estende de 1,680,000 para 5,040,000 blocos para manter fixas as datas dos halvings](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/nu7-block-timing.png)

Três vezes mais blocos, cada um pagando um terço do valor. O cronograma de emissão permanece onde estava.

## Por que mudar o tempo de bloco

O objetivo principal é **reduzir o tempo de espera**. Antes do NU7, um pagamento esperava em média 75 segundos pela primeira confirmação, independentemente da carga da rede. Com 25 segundos, isso cai para 25 segundos em média. O ZIP cita pagamentos em pontos de venda, depósitos em corretoras e pontes cross-chain como os usos que mais sentem essa diferença.

Vale a pena ter em mente dois pontos do ZIP:

- **Ele não recomenda a ninguém usar menos confirmações.** Para usuários que mantêm a mesma tolerância ao risco de reversão que têm hoje, o ZIP prevê que o tempo de confirmação melhore um pouco menos de três vezes.
- **Ele não substitui o trabalho de finalidade.** O ZIP se descreve como complementar a mecanismos de finalidade como o Crosslink. Blocos mais rápidos na camada base ajudam, seja uma camada de finalidade adicionada mais tarde ou não.

O ZIP também observa que uma vazão maior, por si só, poderia ter sido alcançada com um tamanho de bloco maior. A latência é o motivo para escolher blocos mais curtos.

## O que muda

### Emissão: os mesmos ZEC por dia

Triplicar o número de blocos triplicaria a emissão diária se nada mais mudasse. O ZIP 218 evita isso dividindo o subsídio por bloco por mais um fator de três quando o NU7 estiver ativo.

Na era de halving atual, isso leva o subsídio por bloco de **1,5625 ZEC para 0,52083333 ZEC** (52.083.333 zatoshi). Como 156.250.000 zatoshi não é divisível exatamente por três, cada bloco é arredondado para baixo em um terço de zatoshi. Ao longo de um intervalo de halving completo de 5.040.000 blocos, isso soma cerca de 0,0168 ZEC no total.

O subsídio é o total de novos ZEC criados por bloco. A parcela existente de financiamento do desenvolvimento continua sendo retirada dele, então os mineradores recebem menos que o valor integral, exatamente como hoje.

> **Uma observação sobre o valor de 0,26041666 ZEC.** A nota explicativa do rascunho do ZIP apresenta o subsídio pós-NU7 como floor(156250000 / 6) = 0,26041666 ZEC, e parte da cobertura jornalística repetiu esse número. Essa nota está errada por um fator de dois: 156.250.000 zatoshi já é o subsídio pós-Blossom, então dividi-lo por seis aplica o fator de dois do Blossom uma segunda vez, além do fator de três do NU7. A fórmula normativa dá floor(1.250.000.000 / (2 · 3 · 4)) = 52.083.333 zatoshi no índice de halving atual. A issue de implementação do Zebra para essa mudança ([#11463](https://github.com/ZcashFoundation/zebra/issues/11463)) registra que a nota conta o fator do Blossom duas vezes, orienta os implementadores a "implementar a fórmula, não a nota" e informa que uma correção foi registrada contra o ZIP. O valor correto na ativação é **0,52083333 ZEC**.

### Os halvings mantêm o seu momento

O intervalo de halving triplica, de 1.680.000 blocos para 5.040.000 blocos. Como os blocos chegam três vezes mais rápido, os halvings continuam ocorrendo aproximadamente no mesmo momento em que ocorreriam sem a mudança. O limite total de emissão não é afetado.

Isso é separado da outra questão de emissão da enquete do NU7, na qual os detentores de moedas votaram por manter os halvings em vez de substituí-los por uma curva suavizada. O ZIP 218 funciona com o modelo de halving existente e não o altera.

### Novos limites de ações blindadas por bloco

O ZIP 218 adiciona limites à quantidade de atividade blindada que um único bloco pode conter:

| Limite | Máximo por bloco |
|---|---|
| Todos os pools blindados combinados | 330 (cada Sprout JoinSplit conta como 2) |
| Ações Orchard | 330 |
| Entradas mais saídas Sapling | 300 |
| JoinSplits Sprout | 25 |

As partes transparentes das transações não são afetadas, e o limite de tamanho de bloco de 2 MB continua valendo.

Os limites existem porque, sem eles, mais blocos significariam mais trabalho para carteiras e nós. Com os limites, o pior caso fica de fato **melhor** do que hoje, mesmo com três vezes mais blocos:

- **Sincronização de carteiras:** a quantidade máxima de dados que uma carteira leve poderia ser forçada a baixar em um dia cai de cerca de 271 MB para cerca de 169 MB, uma redução de aproximadamente 38%. As descriptografias de teste no pior caso caem de cerca de 4,8 milhões para cerca de 2,3 milhões por dia.
- **Verificação de blocos:** os benchmarks do ZIP indicam que um bloco Orchard no pior caso leva cerca de 432 ms com os novos limites, contra cerca de 770 ms no pior caso atual. Para o Sapling a queda é maior, de cerca de 3.175 ms para cerca de 272 ms.

Os limites do Sapling e do Sprout são apertados de propósito. Em mai de 2026, o Orchard detinha 87,9% dos ZEC blindados, o Sapling 11,6% e o Sprout 0,5%, então os pools menores têm espaço suficiente para seu uso real, dando ao mesmo tempo menos margem de abuso a um atacante. Como as taxas do ZIP 317 cobram o mesmo valor por ação lógica em todos os pools, um atacante não ganha nada fazendo spam em um pool em vez de outro.

### Vazão

Com 330 ações Orchard por bloco, uma transação Orchard padrão de 2 ações cabe ⌊330 / 2⌋ = 165 vezes por bloco. Com um bloco a cada 25 segundos, isso dá cerca de **6,6 transações por segundo**, contra cerca de 2,9 hoje — o ZIP chama isso de um aumento de 2,3× na vazão normal do Orchard. O Sapling fica em cerca de 3,0 por segundo, ainda acima do que o Orchard alcança hoje.

### Ajuste de dificuldade

O algoritmo de dificuldade calcula a média sobre uma janela de blocos recentes. O ZIP 218 aumenta essa janela de 17 para 102 blocos, de modo que ela continue cobrindo cerca de 2.550 segundos de tempo real, o mesmo intervalo que cobria quando o Zcash foi lançado com blocos de 150 segundos. O ZIP dá dois motivos: evitar facilitar ataques de manipulação de dificuldade (ele cita o incidente MWEB do Litecoin em abr de 2026) e suavizar a variação de curto prazo nos tempos de bloco.

Logo após a ativação, os tempos de bloco levarão algum tempo para se estabilizar no novo alvo. Isso é esperado e repete o que aconteceu no Blossom, quando o Zcash passou de 150 para 75 segundos.

### Padrões para nós e carteiras

Estas são recomendações para as implementações, não regras de consenso:

- **Expiração de transações:** a expiração padrão sobe de 40 para 120 blocos, mantendo aproximadamente os mesmos 50 minutos.
- **Profundidade máxima de reorg:** o limite do Zebra sobe de 99 para 600 blocos, cerca de 4,2 horas a 25 segundos, a mesma janela que cobria no lançamento.
- **Profundidade de âncora para transações blindadas:** permanece em 3 blocos, então o atraso diminui de 3,75 minutos para 1,25 minuto. Aqui o ZIP segue o precedente do Blossom.
- **Diversas constantes de rede** medidas em blocos são multiplicadas por três para cobrir o mesmo intervalo de tempo.

## O que permanece igual

- Os ZEC emitidos por dia, o cronograma de halving e o limite de emissão
- O limite de tamanho de bloco de 2 MB
- As transações transparentes, que os novos limites de ações não afetam
- A maturidade do Coinbase em 100 blocos. Observe que isso agora significa cerca de 42 minutos em vez de cerca de 125, porque a contagem é feita em blocos, não em tempo.

## A contrapartida: mais blocos órfãos

Blocos mais rápidos não saem de graça. Um bloco órfão é um bloco válido que perde a corrida para ser incluído na chain porque outro bloco chegou primeiro à rede. Quanto menor o intervalo entre blocos, mais isso acontece, e o ZIP relaciona a taxa de blocos órfãos à propagação de blocos, ao tempo de verificação e ao risco de centralização da mineração.

- **Antes do NU7:** cerca de 0,4%, valor que, segundo o ZIP, pode subestimar a taxa real, porque o hashpower está concentrado em pools.
- **Teórica a 25 segundos:** cerca de 3,26%, com base nos atrasos de propagação medidos do Zcash.
- **Teste em devnet:** 99 nós Zebra distribuídos geograficamente, produzindo blocos completos de 2 MB com espaçamento de 25 segundos, mediram uma taxa de blocos órfãos de 4,86% e uma taxa de forks de 0,37%. O único ajuste necessário foi na configuração do TCP. Como essa devnet era mais descentralizada do que a mainnet atual, o ZIP trata esses números como próximos do pior caso.
- **Ponto de referência:** o ZIP usa como limite de segurança a taxa histórica de blocos órfãos do Ethereum na época do proof-of-work, de 5,4%. Os dois números da devnet ficam abaixo dela.

Há também dois custos menores. As carteiras leves baixam cerca de 200 KB a mais por dia em cabeçalhos de blocos compactos. E, como há três vezes mais blocos, um nó integral que ficou offline tem mais blocos para processar ao se atualizar, mesmo que cada bloco seja mais barato de verificar. O ZIP aceita ambos.

## Status e cronograma

- **Status do ZIP:** Proposto. Responsáveis: Dev Ojha e Evan Forbes; criado em 13 de março de 2026.
- **Enquete de detentores de moedas:** encerrada em 14 de setembro de 2026, com 99,9% de apoio. A enquete indica uma preferência; por si só, ela não altera as regras de consenso.
- **Cronograma:** em um anúncio no Community Forum do Zcash em 17 de setembro, as organizações de desenvolvimento acordaram um cronograma com código concluído até 30 de setembro, NU7 na testnet em 6 de outubro e decisão final em 20 de outubro. O NU7 foi ativado na mainnet na altura 3.543.405 ([ZIP 259](https://zips.z.cash/zip-0259)) em 6 de novembro de 2026 (UTC), portanto o alvo de 25 segundos já está em vigor.
- **Implementação:** acompanhada no Zebra ([#11440](https://github.com/ZcashFoundation/zebra/issues/11440)) e no Zakura ([PR #1066](https://github.com/zakura-core/zakura/pull/1066)).

## O que isso significa para você

- **Se você guarda ZEC:** não há nada a fazer. Seu saldo e o cronograma de emissão não são afetados.
- **Se você usa uma carteira:** atualize quando sua carteira lançar suporte ao NU7. As primeiras confirmações chegarão cerca de três vezes mais rápido.
- **Se você opera um nó, uma corretora ou um serviço:** planeje a atualização antes da ativação e revise todas as configurações medidas em blocos, já que uma contagem fixa de blocos agora cobre um terço do tempo que cobria antes.

## Fontes

- [ZIP 218: espaçamento-alvo de blocos de 25 segundos](https://zips.z.cash/zip-0218)
- [ZIP 208: espaçamento-alvo de blocos mais curto](https://zips.z.cash/zip-0208), o precedente do Blossom
- [Fórum: Proposta — reduzir o espaçamento-alvo de blocos do Zcash para 25 s](https://forum.zcashcommunity.com/t/proposal-lower-zcash-block-target-spacing-to-25s/54577)
- [Fórum: a redução do tempo de bloco do Zcash parece segura para o NU7 com devnet somente Zebra](https://forum.zcashcommunity.com/t/zcash-block-time-reduction-appears-safe-for-nu7-w-zebra-only-devnet/55586)
- [Issue #11463 do Zebra](https://github.com/ZcashFoundation/zebra/issues/11463), intervalo de halving e subsídio pós-NU7
- [Issue #11440 do Zebra](https://github.com/ZcashFoundation/zebra/issues/11440), acompanhamento da implementação do ZIP 218
- Resultados da enquete do NU7 e cronograma, conforme noticiado por Bitcoin.com News, crypto.news e KuCoin (16–19 de setembro de 2026)
