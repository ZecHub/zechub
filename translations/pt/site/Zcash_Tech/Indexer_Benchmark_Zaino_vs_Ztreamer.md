# Benchmark de indexadores: Zaino vs Ztreamer

Zaino e Ztreamer são dois indexadores que servem o protocolo gRPC lightwallet, a API que as carteiras leves do Zcash usam para sincronizar. Esta página resume uma comparação independente e reproduzível entre os dois: se eles retornam as mesmas respostas, quanto tempo levam para construir o índice e com que rapidez atendem as carteiras.

## Resumo

* Os dois indexadores retornam dados corretos da chain. Todas as respostas que puderam ser conferidas com o Zebra bateram, então as carteiras podem usar qualquer um deles.
* As diferenças encontradas são convenções e casos extremos: códigos de erro, a ordem dos bytes de um hash, a forma como um endereço duplicado é contado e alguns formatos de resposta JSON-RPC.
* O Ztreamer constrói o índice cerca de 6× mais rápido na mesma CPU. O Zaino começa a responder após 6 segundos, repassando as requisições ao Zebra enquanto constrói o índice.
* O Ztreamer atende mais rápido em todos os cenários medidos: 13–17× mais blocos por segundo no download completo de uma carteira.
* Grande parte da latência do Zaino vem de uma única configuração de socket ausente (`TCP_NODELAY`), que adiciona cerca de 40 ms a muitas requisições. A correção é de uma linha.

## O que foi comparado

| Build | Nó de suporte | Motivo |
|:--|:--|:--|
| Zaino 0.10.1 | Zebra 6.4.2 (backend `direct`) | Versão estável mais recente do Zaino |
| Zaino 0.9.0 | Zebra 6.4.2 (backend `direct`) | A versão medida na comparação publicada pelo próprio Ztreamer |
| Ztreamer v0.1.0 | Nó Zakura embutido | Tag mais recente do Ztreamer |
| Ztreamer master | Zakura 1.5.1 embutido | O que as instruções de instalação do Ztreamer compilam |

Os dois usam arquiteturas diferentes:

* O **Zaino** roda como um processo separado ao lado de um nó integral [Zebra](Zebra_Full_Node.md), lê o estado do Zebra e mantém seu próprio índice. É o indexador da [stack Z3](Z3_Stack.md). Veja [Zaino](Zaino.md).
* O **Ztreamer** embute um nó [Zakura](Zakura_Node.md) (um fork do Zebra) no mesmo processo e mantém um índice de blocos compactos.

## Como foi medido

* **Os mesmos dados para todos.** Todos os builds partiram do mesmo snapshot da testnet do Zcash Foundation, congelado na altura 4.382.897, de modo que todos indexaram exatamente a mesma chain.
* **Qualquer pessoa pode repetir.** Tudo roda em runners gratuitos hospedados pelo GitHub: faça um fork do repositório e execute um workflow.
* **Três execuções por build**, cada uma a partir de um índice vazio. O servidor e o gerador de carga rodaram em núcleos de CPU separados.
* **Compatibilidade:** todos os 20 métodos gRPC do protocolo lightwallet (274 casos de teste), comparados byte a byte entre os builds e conferidos com o JSON-RPC do Zebra. Os 28 métodos JSON-RPC que o Zaino serve também foram verificados.
* **Desempenho:** tempo e recursos para construir o índice, latência por requisição, throughput de intervalos de blocos, de 1 a 128 clientes simultâneos e o download completo de uma carteira desde a ativação do Sapling até a ponta da chain.

## Resultados

### Construção do índice

Medianas de três execuções:

| Build | Índice completo | Primeira resposta | Tamanho do índice em disco |
|:--|--:|--:|--:|
| Zaino 0.10.1 | 1.395 s | 6 s | 22,06 GiB |
| Zaino 0.9.0 | 1.211 s | 6 s | 22,06 GiB |
| Ztreamer v0.1.0 | 216 s | 210 s | 1,44 GiB |
| Ztreamer master | 159 s | 158 s | 1,44 GiB |

O Zaino fica utilizável quase imediatamente porque encaminha as requisições ao Zebra enquanto constrói o índice. O Ztreamer não atende nada até que seu índice esteja completo. No mesmo modelo de CPU, o Zaino 0.10.1 levou 6–6,5× mais tempo que o Ztreamer v0.1.0 e usou 7,5–8× mais tempo de CPU (Zebra incluído).

### Atendimento

Medianas de três execuções, em blocos por segundo, salvo indicação em contrário:

| Cenário | Zaino 0.10.1 | Ztreamer v0.1.0 |
|:--|--:|--:|
| Intervalo de 1.000 blocos | 11.414 | 179.486 |
| Download completo da carteira (280.000 → ponta) | 11.124 | 189.041 |
| Intervalo de 1.000 blocos, 128 clientes | 110.093 | 229.527 |
| Bloco único, 128 clientes (requisições/s) | 6.843 | 11.044 |

Com 128 clientes, a diferença cai para cerca de 2×, porque os dois servidores estavam limitados a dois núcleos de CPU.

### O piso de 40 ms

No Zaino, seis de doze RPCs têm latência mediana de cerca de 40 ms, e todos os RPCs têm o percentil 99 em torno de 41 ms. A causa é a forma como o Zaino configura seu listener gRPC: a opção de socket `TCP_NODELAY` nunca é ativada, então o sistema operacional segura respostas pequenas por até 40 ms.

Ativar a opção externamente, sem alterar o binário do Zaino, eliminou o piso. Por exemplo, o `GetTreeState` caiu de 40,3 ms para 0,75 ms (Ztreamer: 0,63 ms). O streaming de blocos em massa não mudou, então a diferença de throughput mostrada acima é real.

### Diferenças de compatibilidade

* O **Zaino 0.9.0** inclui dados transparentes em `GetBlock` por padrão, enquanto o protocolo diz que o padrão é apenas dados blindados. Isso foi corrigido na 0.10.1.
* **`GetSubtreeRoots`:** o campo `completingBlockHash` usa ordens de bytes opostas nos dois indexadores. As carteiras atuais não leem esse campo.
* **Códigos de erro:** o Zaino retorna `INTERNAL` para entradas inválidas; o Ztreamer retorna `INVALID_ARGUMENT` ou `NOT_FOUND`.
* **Endereços duplicados** em `GetTaddressBalanceStream` são contados duas vezes, exceto no Ztreamer master.
* **JSON-RPC:** o `getrawtransaction` do Zaino com verbosity 0 retorna um objeto em vez de uma string hexadecimal, ao contrário do Zebra e do zcashd.

## Limitações

* **Somente testnet.** Os blocos da testnet são menores que os da mainnet, então os tempos e tamanhos absolutos não correspondem aos da mainnet. A comparação é relativa, com entradas idênticas.
* **Máquinas de CI compartilhadas** com vários modelos de CPU. O relatório completo traz comparações na mesma CPU para os números principais.
* **Não medido:** reorgs, acompanhamento da ponta de uma chain ativa, carga de mempool e TLS.

## Saiba mais

* Relatório completo: [zcash-indexer-bench/report/report.md](https://github.com/pearl-max468/zcash-indexer-bench/blob/main/report/report.md)
* Repositório do benchmark: [github.com/pearl-max468/zcash-indexer-bench](https://github.com/pearl-max468/zcash-indexer-bench)
* Dados brutos: [release results-2026-10-10](https://github.com/pearl-max468/zcash-indexer-bench/releases/tag/results-2026-10-10)
* Zaino: [github.com/zingolabs/zaino](https://github.com/zingolabs/zaino)
* Ztreamer: [ztreamer.sh](https://ztreamer.sh)
