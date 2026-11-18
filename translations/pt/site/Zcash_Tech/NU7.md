<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/NU7.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# NU7

> A NU7 foi ativada na Mainnet do Zcash no bloco 3.543.405, em 6 de novembro de 2026 (02:34 UTC; noite de 5 de novembro nos fusos horários dos EUA), e está em vigor desde então.

O que você vai aprender: o que a NU7 mudou (blocos mais rápidos, limites de ações blindadas, reciclagem de taxas, o fim das transações da versão 4), o que ela deixou como estava e o que operadores de nós, carteiras, corretoras e mineradores precisaram fazer.

A NU7 é uma [atualização da rede](../start-here/network-upgrades) do Zcash, implantada por meio da [ZIP 259](https://zips.z.cash/zip-0259). Ela reduziu o tempo entre blocos de 75 segundos para 25 segundos, limitou quantas ações blindadas cabem em um bloco, começou a retirar de circulação 60% das taxas de transação para que possam ser reemitidas para futuros mineradores e tornou inválidas as transações da versão 4, o que aposentou o antigo pool Sprout. Ela não introduziu um novo formato de transação. O ID de ramificação de consenso dela é `0x77190ad9`.

Por que isso importa. Antes da NU7, você esperava em média 75 segundos pela primeira confirmação, o que é lento para o caixa de uma loja, um depósito em corretora ou uma conversão cross-chain. A NU7 reduziu esse tempo para cerca de 25 segundos sem emitir mais ZEC: a recompensa por bloco foi cortada para um terço, então a emissão diária continuou a mesma. Ela também é a primeira atualização que adiciona um mecanismo voltado a pagar pela segurança da rede depois que as recompensas de bloco diminuírem.

É novo no Zcash? Comece por [O que é ZEC e Zcash](../start-here/what-is-zec-and-zcash) e [Pools blindados](../using-zcash/shielded-pools) e depois volte aqui.

## TL;DR

Em termos simples: agora os blocos chegam a cada 25 segundos, a quantidade de novos ZEC por dia continua a mesma, parte de cada taxa é guardada para os mineradores do futuro e o antigo pool Sprout está fechado.

- **Blocos de 25 segundos** ([ZIP 218](https://zips.z.cash/zip-0218)): primeira confirmação em cerca de 25 segundos em vez de 75. O subsídio do bloco caiu de 1,5625 para 0,52083333 ZEC, então cerca de 1.800 ZEC continuam sendo emitidos por dia.
- **Limites de ações blindadas** (ZIP 218): no máximo 330 ações blindadas por bloco somando todos os pools, com limites por pool, para manter o custo de validação de bloco no pior caso e o custo de sincronização das carteiras abaixo do que eram antes.
- **Mecanismo de sustentabilidade da rede** ([ZIP 235](https://zips.z.cash/zip-0235) + [ZIP 237](https://zips.z.cash/zip-0237)): 60% das taxas de transação de cada bloco saem de circulação e são reemitidos para os mineradores mais tarde, a partir do bloco 8.939.664 (previsto para por volta de fevereiro de 2031). O limite de oferta de 21 milhões não mudou.
- **Transações da versão 4 são inválidas** ([ZIP 2003](https://zips.z.cash/zip-2003)): as carteiras precisam criar transações v5 ou v6. O Sprout só pode ser gasto com v4, então os fundos que ainda estão no Sprout agora estão congelados.
- **Software**: o [Zebra 7.0.0](https://github.com/ZcashFoundation/zebra/releases/tag/v7.0.0) e versões posteriores seguem a NU7. Não existe versão do `zcashd` com suporte à NU7.

## Analogia visual

Pense na chain como uma linha de trem. Antes da NU7, um trem partia a cada 75 segundos e podia levar tantos passageiros quanto coubessem em 2 MB. A NU7 faz partir um trem a cada 25 segundos, paga a cada maquinista um terço da tarifa antiga para que o total diário seja o mesmo e limita quantos dos passageiros mais pesados (ações blindadas) podem embarcar em um trem, para que nenhum trem leve tempo demais para ser verificado.

![NU7 in four panels: blocks are three times faster and new ZEC per day stays the same; 60% of fees go into a public reserve for rewards from 2031; the legacy Sprout pool from 2016 can no longer be spent; 98.9% of voting ZEC chose to keep halvings](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/nu7-four-changes.png)

## O que a NU7 mudou

### Espaçamento-alvo de 25 segundos entre blocos (ZIP 218)

- O ajuste de dificuldade agora mira um bloco a cada **25 segundos** em vez de 75, então um bloco chega com frequência três vezes maior.
- O subsídio do bloco foi dividido por três: **0,52083333 ZEC** por bloco no período de halving atual (antes era 1,5625 ZEC). A emissão diária continua em cerca de 1.800 ZEC (3.456 blocos por dia em vez de 1.152).
- Os halvings continuam acontecendo a cada quatro anos. Como os blocos são mais rápidos, o próximo halving passou para o bloco **6.132.390**, previsto para por volta do fim de novembro de 2028 com espaçamento de 25 segundos (ZIP 259).
- A janela de média da dificuldade aumentou de 17 para **102 blocos**, então o ajuste continua considerando um intervalo de tempo parecido.
- A expiração padrão das transações aumentou de 40 para **120 blocos**, o que a mantém em cerca de 50 minutos.

### Limites de ações blindadas (ZIP 218)

Cada bloco agora tem um orçamento compartilhado e limites por pool:

| Limite | Por bloco |
|---|---|
| Todas as ações blindadas somando os pools | 330 |
| Ações Orchard | 330 |
| Ações Ironwood | 330 |
| Entradas + saídas Sapling | 300 |
| JoinSplits Sprout | nenhum permitido |

Antes da NU7, um bloco cheio de 2 MB podia conter cerca de 617 ações Orchard ou Ironwood, ou cerca de 2.107 saídas Sapling, sem limites por pool. A ZIP 218 define os novos limites para que, mesmo com três vezes mais blocos, o pior caso para os nós e para as carteiras em sincronização seja menor do que antes (por exemplo, a largura de banda máxima de sincronização blindada de um light client cai de cerca de 271 para 169 MB por dia), enquanto a vazão do protocolo Orchard mais do que dobra (de cerca de 2,9 para 6,6 transações por segundo para transações de 2 ações).

### Mecanismo de sustentabilidade da rede (ZIP 235 + ZIP 237)

- **Remoção de taxas (ZIP 235):** 60% das taxas de transação de cada bloco são retirados de circulação; os outros 40% vão para o minerador, como antes. Diferente de uma queima, o ZEC removido é registrado para que possa ser emitido novamente mais tarde.
- **Reemissão (ZIP 237):** o ZEC removido fica guardado em um estado público de consenso chamado saldo de valor do NSM. Ele foi iniciado na NU7 com valores que os mineradores deixaram de reivindicar no passado. A partir do bloco **8.939.664** (previsto para por volta de fevereiro de 2031), cada bloco emite uma parcela fixa desse saldo, além do cronograma normal de halvings.
- O limite de oferta não aumenta. Quando o saldo é zero, a emissão segue exatamente o antigo cronograma de halvings.
- A NU7 **não** implantou a [ZIP 233](https://zips.z.cash/zip-0233) (remoção voluntária pelos usuários) nem a [ZIP 234](https://zips.z.cash/zip-0234) (substituição dos halvings por uma curva suave). Enquetes com os detentores de moedas escolheram o modelo que preserva os halvings, da ZIP 237.

### Transações da versão 4 proibidas (ZIP 2003)

- A partir da NU7, toda transação da versão 4 é inválida: não apenas as transferências Sprout, mas também as transações só transparentes e as transações Sapling criadas no formato v4. As transações da versão 5 (NU5) e da versão 6 ([Ironwood](../zcash-tech/ironwood)) não mudaram.
- As transferências Sprout existem apenas no formato v4, então o pool [Sprout](../zcash-tech/sprout) não pode mais ser gasto. Veja [Recuperação de fundos](../using-zcash/recovering-funds).

### Itens menores

- Revisões nas regras do fundo de desenvolvimento para que os fluxos de financiamento funcionem com blocos de 25 segundos ([ZIP 207](https://zips.z.cash/zip-0207) Revisão 2, [ZIP 214](https://zips.z.cash/zip-0214) Revisão 3) e uma atualização de uma lista de endereços de fluxo de financiamento ([ZIP 2008](https://zips.z.cash/zip-2008)).
- Os nós NU7 anunciam a versão de protocolo de rede **170190** na Mainnet e desconectam peers mais antigos após a ativação.

## O que a NU7 não fez

- **Nenhum novo formato de transação.** A NU7 evitou de propósito mais uma migração de carteiras e parsers logo depois que a Ironwood introduziu as transações v6.
- **Nenhuma mudança no limite de oferta nem no ritmo de halving a cada quatro anos.**
- **Nenhuma mudança na maturidade do coinbase.** As moedas mineradas ainda precisam de 100 blocos antes de poderem ser gastas (agora cerca de 42 minutos em vez de cerca de 2 horas).
- **Nenhum novo pool blindado.** O Ironwood (NU6.3) continua sendo o pool mais recente; o Orchard continua aceitando apenas gastos, como acontece desde a Ironwood.

## O que cada grupo precisou fazer

- **Operadores de nós:** executar o [Zebra 7.0.0](https://github.com/ZcashFoundation/zebra/releases/tag/v7.0.0) ou posterior. O Zebra 7 migra o banco de dados do formato v28 para o v29 na primeira inicialização, e o Zebra 6.x não consegue ler o v29, então faça backup do `state/v28` antes de atualizar. O `zcashd` não tem versão com NU7 (a versão mais recente é a 6.20.0, de junho de 2026); o [zcashdguia de migração de API](https://zebra.zfnd.org/user/zcashd-api-migration-guide.html) do livro do Zebra associa cada RPC do `zcashd` ao Zebra, ao [Zallet](../zcash-tech/zallet) ou ao seu substituto. Veja [Nós integrais](../zcash-tech/full-nodes) e o [guia de hardening do Zebra](../guides/hardened-zebrad).
- **Carteiras:** parar de criar transações v4, usar a expiração padrão de 120 blocos, manter a profundidade de âncora de 3 blocos (agora cerca de 1,25 minuto) e respeitar os limites de ações por bloco. Uma transação que sozinha ultrapassa um limite nunca poderá ser minerada.
- **Corretoras e serviços de pagamento:** uma confirmação agora leva 25 segundos, então o mesmo número de confirmações cobre um terço do tempo. Revise o número de confirmações de depósito com base no tempo e na segurança que você realmente quer, em vez de manter o número antigo por hábito.
- **Mineradores e pools:** os softwares e templates de mineração precisam usar o novo subsídio, a divisão das taxas e os limites de ações; blocos criados com as regras antigas são rejeitados.

## Erros comuns

- **"Meu nó antigo ainda está rodando, então está tudo bem."** Somente para a NU7, a ZIP 259 dispensou a regra habitual de que o software anterior à atualização se desliga sozinho antes da ativação. Um nó Zebra 6.x ou um nó `zcashd` pode continuar online com as regras antigas e sair silenciosamente da chain real. Verifique se o seu nó informa uma altura acima de 3.543.405 e se ela bate com um explorador de blocos.
- **"Blocos mais rápidos significam que mais ZEC é emitido."** Não. O subsídio por bloco caiu para um terço, então a emissão diária não mudou.
- **"60% das taxas são queimados para sempre."** Não. Eles são removidos e depois reemitidos para os mineradores pelo NSM; o limite de oferta não mudou.
- **"Só os usuários do Sprout são afetados pela mudança da v4."** Qualquer carteira ou script que ainda gerava transações v4, incluindo as só transparentes e as Sapling, parou de funcionar. Transações v4 pendentes se tornaram inválidas na ativação, e apenas assiná-las de novo não as torna válidas.
- **"As configurações baseadas em número de blocos continuam valendo."** Tudo o que é medido em blocos (confirmações, expiração, tempos de bloqueio, timeouts) agora passa três vezes mais rápido em tempo real.

## Glossário

| Termo | Significado em linguagem simples |
|---|---|
| Block target spacing | O tempo médio entre blocos que o ajuste de dificuldade busca atingir: 25 segundos desde a NU7 |
| Block subsidy | O novo ZEC criado em cada bloco, dividido entre o minerador e os fluxos do fundo de desenvolvimento |
| Shielded action | Uma unidade de trabalho blindado em uma transação (uma ação Orchard ou Ironwood, ou uma entrada ou saída Sapling) |
| Network Sustainability Mechanism (NSM) | As regras que retiram parte das taxas de circulação e as reemitem para futuros mineradores |
| NSM Value Balance | O total público acumulado de ZEC retirado de circulação e aguardando reemissão |
| Version 4 transaction | O formato de transação da Sapling, tornado inválido pela NU7; v5 e v6 continuam válidas |
| Consensus branch ID | O número que identifica um conjunto de regras de consenso; as assinaturas se comprometem com ele, então uma transação assinada para as regras antigas é inválida sob as novas |

## Perguntas frequentes

**Quando a NU7 foi ativada?** No bloco 3.543.405 da Mainnet, em 6 de novembro de 2026, às 02:34 UTC. A Testnet foi ativada antes, no bloco 4.465.026, em 4 de outubro de 2026.

**A recompensa de bloco mudou?** Por bloco, sim: 0,52083333 ZEC em vez de 1,5625 ZEC. Por dia, não: cerca de 1.800 ZEC em ambos os casos.

**Meu Sprout no ZEC foi perdido?** Ele não pode mais ser movimentado, porque os gastos Sprout precisam de transações v4, e elas agora são inválidas. Veja [Recuperação de fundos](../using-zcash/recovering-funds) para entender o que isso significa na prática.

**Preciso de uma nova carteira?** Você precisa de uma versão de carteira que suporte a NU7. A página [Carteiras](../using-zcash/wallets) do ZecHub mostra quais carteiras são compatíveis com a NU7.

**Quando começa a reemissão das taxas?** No bloco 8.939.664 da Mainnet, previsto para por volta de fevereiro de 2031 se os blocos mantiverem uma média de 25 segundos.

**Por que a NU7 não trouxe um novo formato de transação?** Para poupar carteiras e parsers de uma segunda migração logo depois do formato v6 da Ironwood, e porque a divisão das taxas é calculada por bloco, então nenhum novo campo de transação foi necessário.

## Teste seu entendimento

1. Por que a emissão diária de ZEC continua a mesma após a NU7?
2. O que acontece com os 60% das taxas retirados de circulação?
3. Por que os fundos no Sprout não podem ser gastos após a NU7?
4. Por que um nó que nunca foi atualizado é especialmente arriscado nesta atualização?

Respostas: (1) o subsídio por bloco foi cortado para um terço, enquanto os blocos passaram a ser três vezes mais frequentes; (2) eles vão para o saldo de valor do NSM e são reemitidos para os mineradores a partir do bloco 8.939.664; (3) os gastos Sprout existem apenas no formato v4, que a NU7 tornou inválido; (4) a ZIP 259 dispensou o desligamento automático, então um nó antigo pode continuar rodando na chain errada.

### Recursos

[ZIP 259: Implantação da atualização da rede NU7](https://zips.z.cash/zip-0259)

[ZIP 218: Espaçamento-alvo de 25 segundos entre blocos](https://zips.z.cash/zip-0218)

[ZIP 235: Retirar de circulação 60% das taxas de transação](https://zips.z.cash/zip-0235)

[ZIP 237: Mecanismo de sustentabilidade da rede: emissão que preserva os halvings](https://zips.z.cash/zip-0237)

[ZIP 2003: Proibir transações da versão 4](https://zips.z.cash/zip-2003)

[Notas de versão do Zebra 7.0.0](https://github.com/ZcashFoundation/zebra/releases/tag/v7.0.0)

[Fórum da comunidade Zcash: cronograma da NU7](https://forum.zcashcommunity.com/t/nu7-timeline/57655)

## Páginas relacionadas

| Página | Por que está relacionada |
|---|---|
| [Ironwood](./Ironwood.md) | a atualização anterior da série, que introduziu as transações v6 |
| [O que os blocos de 25 segundos realmente mudam](../research/what-25-second-blocks-actually-change) | uma análise mais aprofundada do tempo de bloco mais rápido |
| [Sprout](./Sprout.md) | o pool que a NU7 aposentou |
| [Recuperação de fundos](../using-zcash/recovering-funds) | o que o congelamento do Sprout significa para fundos antigos |
| [Transações](../using-zcash/transactions) | expiração e confirmações após a NU7 |

---

Série: [Índice de atualizações da rede](../start-here/network-upgrades) · Anterior: [Ironwood](../zcash-tech/ironwood)
