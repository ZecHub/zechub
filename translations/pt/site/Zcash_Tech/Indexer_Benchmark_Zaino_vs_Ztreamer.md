# Benchmark de Indexadores: Zaino vs Ztreamer

Zaino e Ztreamer são dois indexadores que disponibilizam o protocolo gRPC lightwallet, a API que as wallets leves Zcash utilizam para sincronizar. Esta página resume uma comparação independente e reproduzível dos dois: se devolvem as mesmas respostas, quanto tempo demoram a criar o seu índice e com que rapidez servem as wallets.

## Em resumo

* Ambos os indexadores devolvem dados corretos da cadeia. Todas as respostas que puderam ser verificadas face a Zebra corresponderam, pelo que as wallets podem usar qualquer um deles.
* As diferenças encontradas são convenções e casos limite: códigos de erro, a ordem dos bytes de um hash, a forma como um endereço duplicado é contado e algumas estruturas de resposta JSON-RPC.
* Ztreamer cria o seu índice cerca de 6× mais depressa no mesmo CPU. Zaino começa a responder após 6 segundos, encaminhando pedidos para Zebra enquanto o cria.
* Ztreamer serve mais depressa em todos os cenários medidos: 13–17× mais blocos por segundo numa transferência completa de uma wallet.
* Grande parte da latência de Zaino resulta de uma definição de socket em falta (`TCP_NODELAY`), que acrescenta cerca de 40 ms a muitos pedidos. É uma correção de uma linha.

## O que foi comparado

| Build | Nó de suporte | Motivo |
|:--|:--|:--|
| Zaino 0.10.1 | Zebra 6.4.2 (backend `direct`) | Versão estável mais recente de Zaino |
| Zaino 0.9.0 | Zebra 6.4.2 (backend `direct`) | A versão medida na própria comparação publicada de Ztreamer |
| Ztreamer v0.1.0 | Nó Zakura incorporado | Tag mais recente de Ztreamer |
| Ztreamer master | Zakura 1.5.1 incorporado | O que as instruções de instalação de Ztreamer compilam |

Os dois utilizam designs diferentes:

* **Zaino** é executado como um processo separado ao lado de um nó completo [Zebra](Zebra_Full_Node.md), lê o estado de Zebra e mantém o seu próprio índice. É o indexador na pilha [Z3](Z3_Stack.md). Consulte [Zaino](Zaino.md).
* **Ztreamer** incorpora um nó [Zakura](Zakura_Node.md) (um fork de Zebra) no mesmo processo e mantém um índice de blocos compactos.

## Como foi medido

* **Os mesmos dados para todos.** Cada build começou a partir do mesmo snapshot de testnet Zcash Foundation, congelado na altura 4.382.897, pelo que todos indexaram exatamente a mesma cadeia.
* **Qualquer pessoa pode repeti-lo.** Tudo é executado em runners gratuitos alojados por GitHub: faça um fork do repositório e execute um workflow.
* **Três execuções por build**, cada uma a partir de um índice vazio. O servidor e o gerador de carga foram executados em núcleos de CPU separados.
* **Compatibilidade:** todos os 20 métodos gRPC do protocolo lightwallet (274 casos de teste), comparados byte a byte entre builds e verificados face ao JSON-RPC de Zebra. Foram também verificados os 28 métodos JSON-RPC servidos por Zaino.
* **Desempenho:** tempo e recursos para criar o índice, latência por pedido, débito de intervalos de blocos, 1 a 128 clientes concorrentes e uma transferência completa de wallet desde a ativação de Sapling até à ponta.

## Resultados

### Criação do índice

Medianas de três execuções:

| Build | Índice concluído | Primeira resposta | Tamanho do índice em disco |
|:--|--:|--:|--:|
| Zaino 0.10.1 | 1.395 s | 6 s | 22,06 GiB |
| Zaino 0.9.0 | 1.211 s | 6 s | 22,06 GiB |
| Ztreamer v0.1.0 | 216 s | 210 s | 1,44 GiB |
| Ztreamer master | 159 s | 158 s | 1,44 GiB |

Zaino pode ser utilizado quase de imediato porque encaminha pedidos para Zebra enquanto cria o índice. Ztreamer não serve nada até o seu índice estar concluído. No mesmo modelo de CPU, Zaino 0.10.1 demorou 6–6,5× mais do que Ztreamer v0.1.0 e utilizou 7,5–8× mais tempo de CPU (Zebra incluído).

### Serviço

Medianas de três execuções, em blocos por segundo salvo indicação em contrário:

| Cenário | Zaino 0.10.1 | Ztreamer v0.1.0 |
|:--|--:|--:|
| Intervalo de 1.000 blocos | 11.414 | 179.486 |
| Transferência completa de wallet (280.000 → ponta) | 11.124 | 189.041 |
| Intervalo de 1.000 blocos, 128 clientes | 110.093 | 229.527 |
| Bloco único, 128 clientes (pedidos/s) | 6.843 | 11.044 |

Com 128 clientes, a diferença reduz-se para cerca de 2×, porque ambos os servidores estavam limitados a dois núcleos de CPU.

### O patamar de 40 ms

Em Zaino, seis de doze RPCs têm uma latência mediana de cerca de 40 ms, e cada RPC tem um percentil 99 em torno de 41 ms. A causa é a forma como Zaino configura o seu listener gRPC: a opção de socket `TCP_NODELAY` nunca é ativada, pelo que o sistema operativo retém respostas pequenas durante até 40 ms.

Ativar a opção externamente, sem alterar o binário de Zaino, eliminou o patamar. Por exemplo, `GetTreeState` desceu de 40,3 ms para 0,75 ms (Ztreamer: 0,63 ms). O streaming em massa de blocos não se alterou, pelo que a diferença de débito acima é real.

### Diferenças de compatibilidade

* **Zaino 0.9.0** inclui dados transparentes em `GetBlock` por predefinição, quando o protocolo indica que a predefinição é apenas dados blindados. Isto foi corrigido na versão 0.10.1.
* **`GetSubtreeRoots`:** o campo `completingBlockHash` utiliza ordens de bytes opostas nos dois indexadores. As wallets atuais não leem este campo.
* **Códigos de erro:** Zaino devolve `INTERNAL` para entrada inválida; Ztreamer devolve `INVALID_ARGUMENT` ou `NOT_FOUND`.
* **Endereços duplicados** em `GetTaddressBalanceStream` são contados duas vezes, exceto em Ztreamer master.
* **JSON-RPC:** Zaino de `getrawtransaction` com verbosidade 0 devolve um objeto em vez de uma string hexadecimal, ao contrário de Zebra e zcashd.

## Limitações

* **Apenas testnet.** Os blocos da testnet são menores do que os da mainnet, pelo que os tempos e tamanhos absolutos não representam valores da mainnet. A comparação é relativa, com entradas idênticas.
* **Máquinas de CI partilhadas** com vários modelos de CPU. O relatório completo fornece comparações com o mesmo CPU para os números principais.
* **Não medido:** reorganizações, acompanhamento da ponta de uma cadeia em direto, carga de mempool e TLS.

## Onde saber mais

* Relatório completo: [zcash-indexer-bench/report/report.md](https://github.com/pearl-max468/zcash-indexer-bench/blob/main/report/report.md)
* Repositório de benchmark: [github.com/pearl-max468/zcash-indexer-bench](https://github.com/pearl-max468/zcash-indexer-bench)
* Dados brutos: [results-2026-10-10 release](https://github.com/pearl-max468/zcash-indexer-bench/releases/tag/results-2026-10-10)
* Zaino: [github.com/zingolabs/zaino](https://github.com/zingolabs/zaino)
* Ztreamer: [ztreamer.sh](https://ztreamer.sh)
