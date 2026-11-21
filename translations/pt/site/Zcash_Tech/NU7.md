<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/NU7.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# NU7

> NU7 foi ativada na Mainnet em Zcash, no bloco 3,543,405, em 6 de novembro de 2026 (02:34 UTC; noite de 5 de novembro nos fusos horários dos EUA), e está ativa desde então.

O que você vai aprender: o que NU7 mudou (blocos mais rápidos, limites de ações blindadas, reciclagem de taxas e o fim das transações da versão 4), o que não mudou e o que operadores de nós, carteiras, corretoras e mineradores precisaram fazer.

NU7 é uma Zcash [atualização da rede](../start-here/network-upgrades), implantada por [ZIP 259](https://zips.z.cash/zip-0259). Ela reduziu o intervalo entre blocos de 75 para 25 segundos, limitou quantas ações blindadas cabem em um bloco, começou a retirar de circulação 60% das taxas de transação para que possam ser reemitidas a futuros mineradores e tornou inválidas as transações da versão 4, encerrando o pool antigo Sprout. Ela não introduziu um novo formato de transação. Seu ID de ramificação de consenso é `0x77190ad9`.

Por que isso importa. Antes de NU7, você esperava em média 75 segundos pela primeira confirmação, o que é lento para o caixa de uma loja, um depósito em uma corretora ou uma conversão cross-chain. NU7 reduziu esse tempo para cerca de 25 segundos sem emitir mais ZEC: a recompensa por bloco caiu para um terço, então a emissão diária permaneceu a mesma. Esta também é a primeira atualização a adicionar um mecanismo voltado a pagar pela segurança da rede depois que as recompensas por bloco diminuírem.

Você está começando agora no Zcash? Comece por [O que é ZEC e Zcash](../start-here/what-is-zec-and-zcash) e [Pools blindados](../using-zcash/shielded-pools) e depois volte para cá.

## Resumo

Em termos simples: agora os blocos chegam a cada 25 segundos, a quantidade de novos ZEC por dia permanece a mesma, parte de cada taxa é guardada para futuros mineradores e o pool antigo Sprout foi encerrado.

- **Blocos de 25 segundos** ([ZIP 218](https://zips.z.cash/zip-0218)): primeira confirmação em cerca de 25 segundos, em vez de 75. O subsídio por bloco caiu de 1.5625 para 0.52083333 ZEC, então ainda são emitidos cerca de 1.800 ZEC por dia.
- **Limites de ações blindadas** (ZIP 218): no máximo 330 ações blindadas por bloco, somando todos os pools, com limites para cada pool, para manter os custos de validação dos blocos e de sincronização das carteiras, nos piores casos, abaixo dos valores anteriores.
- **Mecanismo de sustentabilidade da rede** ([ZIP 235](https://zips.z.cash/zip-0235) + [ZIP 237](https://zips.z.cash/zip-0237)): 60% das taxas de transação de cada bloco saem de circulação e são reemitidas aos mineradores posteriormente, a partir do bloco 8,939,664 (com previsão para fevereiro de 2031). O limite de oferta de 21 milhões não mudou.
- **Transações da versão 4 são inválidas** ([ZIP 2003](https://zips.z.cash/zip-2003)): as carteiras precisam criar transações v5 ou v6. Sprout só pode ser gasto com v4, então os fundos que ainda estão em Sprout agora estão congelados.
- **Software**: [Zebra 7.0.0](https://github.com/ZcashFoundation/zebra/releases/tag/v7.0.0) e versões posteriores seguem NU7. Não há uma versão `zcashd` com suporte a NU7.

## Analogia visual

Imagine a chain como uma linha de trem. Antes de NU7, um trem partia a cada 75 segundos e podia levar tantos passageiros quantos coubessem em 2 MB. NU7 faz um trem partir a cada 25 segundos, paga a cada maquinista um terço da tarifa antiga, mantendo o mesmo total diário, e limita quantos dos passageiros mais pesados (ações blindadas) podem embarcar em cada trem, para que a verificação de um único trem não demore demais.

![NU7 in four panels: blocks are three times faster and new ZEC per day stays the same; 60% of fees go into a public reserve for rewards from 2031; the legacy Sprout pool from 2016 can no longer be spent; 98.9% of voting ZEC chose to keep halvings](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/nu7-four-changes.png)

## O que NU7 mudou

### Intervalo-alvo de 25 segundos entre blocos (ZIP 218)

- O ajuste de dificuldade agora tem como meta um bloco a cada **25 segundos**, em vez de 75, então os blocos chegam três vezes mais rápido.
- O subsídio por bloco foi dividido por três: **0.52083333 ZEC** por bloco no período atual de halving (antes era 1.5625 ZEC). A emissão diária continua em cerca de 1.800 ZEC (3,456 blocos por dia, em vez de 1,152).
- Os halvings continuam acontecendo a cada quatro anos. Como os blocos são mais rápidos, o próximo halving passou para o bloco **6,132,390**, com previsão para o fim de novembro de 2028, considerando intervalos de 25 segundos (ZIP 259).
- A janela de cálculo da dificuldade aumentou de 17 para **102 blocos**, então o ajuste continua considerando um período de tempo semelhante.
- O prazo de expiração padrão das transações aumentou de 40 para **120 blocos**, mantendo-o em cerca de 50 minutos.

### Limites de ações blindadas (ZIP 218)

Cada bloco agora tem um limite compartilhado e limites para cada pool:

| Limite | Por bloco |
|---|---|
| Todas as ações blindadas somadas entre os pools | 330 |
| Ações de Orchard | 330 |
| Ações de Ironwood | 330 |
| Entradas + saídas de Sapling | 300 |
| Sprout JoinSplits | nenhuma permitida |

Antes de NU7, um bloco cheio de 2 MB podia conter cerca de 617 Orchard ou ações de Ironwood, ou cerca de 2,107 saídas de Sapling, sem limites por pool. ZIP 218 define os novos limites para que, mesmo com três vezes mais blocos, o pior caso para os nós e para a sincronização das carteiras seja melhor que antes (por exemplo, a largura de banda máxima de sincronização blindada de light client cai de cerca de 271 para 169 MB por dia), enquanto o throughput do protocolo Orchard mais que dobra (de cerca de 2.9 para 6.6 transações por segundo para transações com 2 ações).

### Mecanismo de sustentabilidade da rede (ZIP 235 + ZIP 237)

- **Retirada de taxas (ZIP 235):** 60% das taxas de transação em cada bloco são retiradas de circulação; os outros 40% vão para o minerador, como antes. Ao contrário de uma queima, as ZEC retiradas são contabilizadas para que possam ser emitidas novamente mais tarde.
- **Reemissão (ZIP 237):** as ZEC retiradas são mantidas em um estado público de consenso chamado NSM Value Balance. Esse saldo recebeu um valor inicial em NU7, composto por valores que os mineradores deixaram sem reivindicar no passado. A partir do bloco **8,939,664** (com previsão para fevereiro de 2031), cada bloco emite uma parcela fixa desse saldo, além do cronograma normal de halving.
- O limite de oferta não aumenta. Quando o saldo chega a zero, a emissão segue exatamente o cronograma antigo de halving.
- NU7 **não** implantou [ZIP 233](https://zips.z.cash/zip-0233) (retirada voluntária pelos usuários) nem [ZIP 234](https://zips.z.cash/zip-0234) (substituição dos halvings por uma curva suave). As votações dos detentores de moedas escolheram o design que preserva o halving em ZIP 237.
- Os detalhes numéricos (o saldo inicial de 368.58 ZEC, a fração reemitida por bloco e o motivo para começar no bloco 8,939,664) estão na página sobre o [Mecanismo de sustentabilidade da rede](./Network_Sustainability_Mechanism.md).

### Transações da versão 4 desabilitadas (ZIP 2003)

- A partir de NU7, todas as transações da versão 4 são inválidas: não apenas transferências de Sprout, mas também transações somente transparentes e de Sapling criadas no formato v4. As transações da versão 5 (NU5) e da versão 6 ([Ironwood](../zcash-tech/ironwood)) não mudaram.
- As transferências de Sprout só existem no formato v4, então não é mais possível gastar do pool [Sprout](../zcash-tech/sprout). Consulte [Recuperação de fundos](../using-zcash/recovering-funds).

### Mudanças menores

- Revisões das regras do fundo de desenvolvimento para que os fluxos de financiamento funcionem com blocos de 25 segundos ([ZIP 207](https://zips.z.cash/zip-0207) Revisão 2, [ZIP 214](https://zips.z.cash/zip-0214) Revisão 3) e atualização da lista de endereços dos fluxos de financiamento ([ZIP 2008](https://zips.z.cash/zip-2008)).
- Os nós NU7 anunciam a versão de protocolo de rede **170190** na Mainnet e desconectam pares antigos após a ativação.

## O que NU7 não fez

- **Nenhum novo formato de transação.** NU7 evitou deliberadamente outra migração de carteiras e parsers logo após Ironwood introduzir as transações v6.
- **Nenhuma mudança no limite de oferta ou no ritmo de halving de quatro anos.**
- **Nenhuma mudança no prazo de maturação da coinbase.** As moedas mineradas ainda precisam de 100 blocos antes de poderem ser gastas (agora cerca de 42 minutos, em vez de cerca de 2 horas).
- **Nenhum novo pool blindado.** Ironwood (NU6.3) continua sendo o pool mais recente; Orchard continua permitindo apenas gastos, como tem sido desde Ironwood.

## O que cada grupo precisou fazer

- **Operadores de nós:** use [Zebra 7.0.0](https://github.com/ZcashFoundation/zebra/releases/tag/v7.0.0) ou uma versão posterior. Zebra 7 migra o banco de dados do formato v28 para v29 na primeira inicialização, e Zebra 6.x não consegue ler v29, então faça backup de `state/v28` antes de atualizar. `zcashd` não tem uma versão NU7 (sua versão mais recente é a 6.20.0, de junho de 2026); o guia de migração de API de Zebra[zcashd do livro ](https://zebra.zfnd.org/user/zcashd-api-migration-guide.html) mapeia cada RPC de `zcashd` para Zebra, [Zallet](../zcash-tech/zallet) ou um substituto. Consulte [Nós integrais](../zcash-tech/full-nodes) e o guia [Zebra Hardened](../guides/hardened-zebrad).
- **Carteiras:** pare de criar transações v4, use o prazo de expiração padrão de 120 blocos, mantenha a profundidade de ancoragem de 3 blocos (agora cerca de 1.25 minuto) e respeite os limites de ações por bloco. Uma transação que, por si só, ultrapasse um limite nunca poderá ser minerada.
- **Corretoras e serviços de pagamento:** agora uma confirmação leva 25 segundos, então o mesmo número de confirmações cobre um terço do tempo. Confira novamente a quantidade de confirmações exigida para depósitos, considerando o tempo e a segurança que você realmente quer, em vez de manter o número antigo por hábito.
- **Mineradores e pools:** o software de mineração e os templates precisam usar o novo subsídio, a divisão das taxas e os limites de ações; blocos criados segundo as regras antigas são rejeitados.

## Erros comuns

- **"Meu nó antigo ainda está funcionando, então está tudo certo."** Somente para NU7, ZIP 259 dispensou a regra habitual que faz o software anterior à atualização se encerrar antes da ativação. Um Zebra 6.x ou um nó `zcashd` pode continuar online seguindo as regras antigas e se afastar silenciosamente da chain real. Confira se o seu nó informa uma altura acima de 3,543,405 e corresponde a um explorador de blocos.
- **"Blocos mais rápidos significam que mais ZEC é emitido."** Não. O subsídio por bloco caiu para um terço, então a emissão diária não mudou.
- **"60% das taxas são queimadas para sempre."** Não. Elas são retiradas e depois reemitidas aos mineradores pelo NSM; o limite de oferta não mudou.
- **"Só os usuários de Sprout são afetados pela mudança do v4."** Qualquer carteira ou script que ainda produza transações v4 parou de funcionar, incluindo transações somente transparentes e de Sapling. As transações v4 pendentes se tornaram inválidas na ativação, e assiná-las novamente não é suficiente para torná-las válidas.
- **"As configurações baseadas na contagem de blocos continuam iguais."** Tudo o que é medido em blocos (confirmações, expiração, tempos de bloqueio e timeouts) agora passa três vezes mais rápido em tempo real.

## Glossário

| Termo | Significado em linguagem simples |
|---|---|
| Block target spacing | Tempo médio entre blocos que o ajuste de dificuldade busca alcançar: 25 segundos desde NU7 |
| Block subsidy | Os novos ZEC criados em cada bloco, compartilhados entre o minerador e os fluxos do fundo de desenvolvimento |
| Shielded action | Uma unidade de trabalho blindado em uma transação (uma ação de Orchard ou Ironwood, ou uma entrada ou saída de Sapling) |
| Network Sustainability Mechanism (NSM) | As regras que retiram parte das taxas de circulação e as reemitem a futuros mineradores |
| NSM Value Balance | O total acumulado público de ZEC retiradas de circulação e aguardando reemissão |
| Version 4 transaction | O formato de transação de Sapling, invalidado por NU7; v5 e v6 continuam válidos |
| Consensus branch ID | O número que identifica um conjunto de regras de consenso; as assinaturas se comprometem com ele, então uma transação assinada para regras antigas é inválida sob as novas |

## Perguntas frequentes

**Quando NU7 foi ativada?** No bloco 3,543,405 da Mainnet, em 6 de novembro de 2026, às 02:34 UTC. A Testnet foi ativada antes, no bloco 4,465,026, em 4 de outubro de 2026.

**A recompensa por bloco mudou?** Por bloco, sim: 0.52083333 ZEC em vez de 1.5625 ZEC. Por dia, não: cerca de 1.800 ZEC de qualquer forma.

**Meu Sprout ZEC desapareceu?** Ele não pode mais ser movimentado, porque os gastos de Sprout precisam de transações v4 e elas agora são inválidas. Consulte [Recuperação de fundos](../using-zcash/recovering-funds) para saber o que isso significa na prática.

**Preciso de uma carteira nova?** Você precisa de uma versão de carteira compatível com NU7. A página de ZecHub[Carteiras](../using-zcash/wallets) mostra quais carteiras são compatíveis com NU7.

**Quando começa a reemissão das taxas?** No bloco 8,939,664 da Mainnet, com previsão para fevereiro de 2031, se os blocos mantiverem uma média de 25 segundos.

**Por que NU7 não adotou um novo formato de transação?** Para poupar carteiras e parsers de uma segunda migração logo após o formato v6 de Ironwood e porque a divisão das taxas é calculada por bloco, então não foi necessário adicionar um novo campo à transação.

## Teste seus conhecimentos

1. Por que a emissão diária de ZEC permanece a mesma após NU7?
2. O que acontece com os 60% das taxas retirados de circulação?
3. Por que os fundos de Sprout não podem ser gastos após NU7?
4. Por que um nó que nunca foi atualizado é especialmente arriscado nesta atualização?

Respostas: (1) o subsídio por bloco foi reduzido a um terço enquanto os blocos passaram a chegar três vezes mais rápido; (2) as taxas entram no Saldo de valor do NSM e são reemitidas aos mineradores a partir do bloco 8,939,664; (3) os gastos de Sprout só existem no formato v4, que NU7 tornou inválido; (4) ZIP 259 dispensou o encerramento automático, então um nó antigo pode continuar funcionando na chain errada.

### Recursos

[ZIP 259: Implantação da atualização da rede NU7](https://zips.z.cash/zip-0259)

[ZIP 218: Intervalo-alvo de 25 segundos entre blocos](https://zips.z.cash/zip-0218)

[ZIP 235: Retirar 60% das taxas de transação de circulação](https://zips.z.cash/zip-0235)

[ZIP 237: Mecanismo de sustentabilidade da rede: emissão que preserva o halving](https://zips.z.cash/zip-0237)

[ZIP 2003: Desabilitar transações da versão 4](https://zips.z.cash/zip-2003)

[Zebra Notas da versão 7.0.0](https://github.com/ZcashFoundation/zebra/releases/tag/v7.0.0)

[Zcash Fórum da comunidade: NU7 cronograma](https://forum.zcashcommunity.com/t/nu7-timeline/57655)

## Páginas relacionadas

| Página | Por que ela é relacionada |
|---|---|
| [Ironwood](./Ironwood.md) | a atualização anterior da série, que introduziu as transações v6 |
| [O que os blocos de 25 segundos realmente mudam](../research/what-25-second-blocks-actually-change) | uma análise mais detalhada do intervalo menor entre blocos |
| [Mecanismo de sustentabilidade da rede](./Network_Sustainability_Mechanism.md) | como funcionam a retirada e a reemissão de taxas após NU7, com os números |
| [Sprout](./Sprout.md) | o pool NU7 que foi encerrado |
| [Recuperação de fundos](../using-zcash/recovering-funds) | o que o congelamento de Sprout significa para fundos antigos |
| [Transações](../using-zcash/transactions) | expiração e confirmações após NU7 |

---

Série: índice de [Atualizações da rede](../start-here/network-upgrades) · Anterior: [Ironwood](../zcash-tech/ironwood)
