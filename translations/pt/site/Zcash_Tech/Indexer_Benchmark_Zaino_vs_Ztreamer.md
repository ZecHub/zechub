# Benchmark de indexadores: Zaino vs Ztreamer

Zaino e Ztreamer são dois indexadores que disponibilizam o protocolo gRPC lightwallet, a API que as carteiras leves do Zcash usam para sincronizar. Esta página resume uma comparação independente e reproduzível dos dois: se retornam as mesmas respostas, quanto tempo levam para criar seus índices e com que rapidez atendem às carteiras.

## Em resumo

* Ambos os indexadores retornam dados corretos da chain. Todas as respostas que puderam ser verificadas em relação ao Zebra corresponderam, portanto as carteiras podem usar qualquer um deles.
* As diferenças encontradas são convenções e casos extremos: códigos de erro, a ordem dos bytes de um hash, como um endereço duplicado é contabilizado e alguns formatos de resposta JSON-RPC.
* O Ztreamer cria seu índice cerca de 6× mais rápido na mesma CPU. O Zaino começa a responder após 6 segundos, encaminhando solicitações para o Zebra enquanto cria o índice.
* O Ztreamer atende mais rapidamente em todos os cenários medidos: 13–17× mais blocos por segundo em um download completo de carteira.
* Grande parte da latência do Zaino resulta de uma configuração de socket ausente (`TCP_NODELAY`), que adiciona cerca de 40 ms a muitas solicitações. É uma correção de uma linha.

## O que foi comparado

| Build | Nó de suporte | Motivo |
|:--|:--|:--|
| Zaino 0.10.1 | Zebra 6.4.2 (`direct` backend) | Versão estável mais recente do Zaino |
| Zaino 0.9.0 | Zebra 6.4.2 (`direct` backend) | A versão medida na própria comparação publicada do Ztreamer |
| Ztreamer v0.1.0 | Nó Zakura incorporado | Tag mais recente do Ztreamer |
| Ztreamer master | Zakura 1.5.1 incorporado | O que as instruções de instalação do Ztreamer compilam |

Os dois usam designs diferentes:

* **Zaino** é executado como um processo separado ao lado de um nó integral [Zebra](Zebra_Full_Node.md), lê o estado do Zebra e mantém seu próprio índice. É o indexador na pilha [Z3](Z3_Stack.md). Consulte [Zaino](Zaino.md).
* **Ztreamer** incorpora um nó [Zakura](Zakura_Node.md) (um fork do Zebra) no mesmo processo e mantém um índice de blocos compactos.

## Como foi medido

* **Os mesmos dados para todos.** Cada build começou a partir do mesmo snapshot de testnet da Zcash Foundation, congelado na altura 4.382.897, portanto todos indexaram exatamente a mesma chain.
* **Qualquer pessoa pode repetir.** Tudo é executado em runners gratuitos hospedados pelo GitHub: faça um fork do repositório e execute um workflow.
* **Três execuções por build**, cada uma a partir de um índice vazio. O servidor e o gerador de carga foram executados em núcleos de CPU separados.
* **Compatibilidade:** todos os 20 métodos gRPC do protocolo lightwallet (274 casos de teste), comparados byte a byte entre builds e verificados em relação ao JSON-RPC do Zebra. Os 28 métodos JSON-RPC atendidos pelo Zaino também foram verificados.
* **Desempenho:** tempo e recursos para criar o índice, latência por solicitação, throughput de intervalos de blocos, 1 a 128 clientes simultâneos e um download completo de carteira desde a ativação do Sapling até a ponta.

## Resultados

### Criação do índice

Medianas de três execuções:

| Build | Índice concluído | Primeira resposta | Tamanho do índice em disco |
|:--|--:|--:|--:|
| Zaino 0.10.1 | 1.395 s | 6 s | 22,06 GiB |
| Zaino 0.9.0 | 1.211 s | 6 s | 22,06 GiB |
| Ztreamer v0.1.0 | 216 s | 210 s | 1,44 GiB |
| Ztreamer master | 159 s | 158 s | 1,44 GiB |

O Zaino pode ser usado quase imediatamente porque encaminha solicitações para o Zebra enquanto cria o índice. O Ztreamer não atende nada até que seu índice esteja concluído. No mesmo modelo de CPU, o Zaino 0.10.1 levou 6–6,5× mais tempo que o Ztreamer v0.1.0 e usou 7,5–8× mais tempo de CPU (incluindo o Zebra).

### Atendimento

Medianas de três execuções, em blocos por segundo, salvo indicação em contrário:

| Scenario | Zaino 0.10.1 | Ztreamer v0.1.0 |
|:--|--:|--:|
| Block range of 1,000 blocks | 11.414 | 179.486 |
| Full wallet download (280,000 → tip) | 11.124 | 189.041 |
| Block range of 1,000 blocks, 128 clients | 110.093 | 229.527 |
| Single block, 128 clients (requests/s) | 6.843 | 11.044 |

Com 128 clientes, a diferença diminui para cerca de 2×, porque ambos os servidores estavam limitados a dois núcleos de CPU.

### O patamar de 40 ms

No Zaino, seis de doze RPCs têm latência mediana de cerca de 40 ms, e cada RPC tem percentil 99 em torno de 41 ms. A causa é a forma como o Zaino configura seu listener gRPC: a opção de socket `TCP_NODELAY` nunca é ativada, portanto o sistema operacional retém respostas pequenas por até 40 ms.

Ativar a opção externamente, sem alterar o binário do Zaino, eliminou o patamar. Por exemplo, `GetTreeState` caiu de 40,3 ms para 0,75 ms (Ztreamer: 0,63 ms). O streaming em massa de blocos não mudou, portanto a diferença de throughput acima é real.

### Diferenças de compatibilidade

* **Zaino 0.9.0** inclui dados transparentes em `GetBlock` por padrão, quando o protocolo diz que o padrão é apenas dados blindados. Isso foi corrigido na versão 0.10.1.
* **`GetSubtreeRoots`:** o campo `completingBlockHash` usa ordens de bytes opostas nos dois indexadores. As carteiras atuais não leem esse campo.
* **Códigos de erro:** o Zaino retorna `INTERNAL` para entradas inválidas; o Ztreamer retorna `INVALID_ARGUMENT` ou `NOT_FOUND`.
* **Endereços duplicados** em `GetTaddressBalanceStream` são contados duas vezes, exceto no Ztreamer master.
* **JSON-RPC:** o `getrawtransaction` do Zaino com verbosidade 0 retorna um objeto em vez de uma string hexadecimal, diferente do Zebra e do zcashd.

## Limitações

* **Apenas testnet.** Os blocos da testnet são menores que os da mainnet, portanto os tempos e tamanhos absolutos não representam valores da mainnet. A comparação é relativa, com entradas idênticas.
* **Máquinas de CI compartilhadas** com vários modelos de CPU. O relatório completo fornece comparações na mesma CPU para os números principais.
* **Não medido:** reorganizações, acompanhamento da ponta de uma chain em tempo real, carga de mempool e TLS.

## Onde saber mais

* Relatório completo: [zcash-indexer-bench/report/report.md](https://github.com/pearl-max468/zcash-indexer-bench/blob/main/report/report.md)
* Repositório do benchmark: [github.com/pearl-max468/zcash-indexer-bench](https://github.com/pearl-max468/zcash-indexer-bench)
* Dados brutos: [results-2026-10-10 release](https://github.com/pearl-max468/zcash-indexer-bench/releases/tag/results-2026-10-10)
* Zaino: [github.com/zingolabs/zaino](https://github.com/zingolabs/zaino)
* Ztreamer: [ztreamer.sh](https://ztreamer.sh)
