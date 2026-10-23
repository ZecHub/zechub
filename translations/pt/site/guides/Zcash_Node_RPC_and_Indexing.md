<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zcash_Node_RPC_and_Indexing.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Guia Prático: RPC de Nó Zcash e Indexação de Blockchain

Esta página é um guia prático para comunicar com um nó completo Zcash em execução através de JSON-RPC e para ligar um indexador que as carteiras leves e os exploradores possam consultar. **Não** é um segundo guia de instalação.

Para saber como iniciar a stack pós-`zcashd` (Zebra + Zallet, Zaino opcional, portas, volumes, arranque em duas fases), utilize a página [Z3 Stack](/zcash-tech/z3-stack) e o [repositório Z3](https://github.com/ZcashFoundation/z3). Para contexto sobre nós de consenso, consulte [Full Nodes](/zcash-tech/full-nodes) e [Zebra Nó Completo](/zcash-tech/zebra-full-node).

`zcashd` chegou ao fim de vida em 18 de julho de 2026. O novo trabalho de operadores deve visar Zebra (ou [Zakura](/zcash-tech/zakura-node)) mais uma carteira/indexador, e não `zcashd`.

---

## Resumo

* **JSON-RPC** é a forma como operadores e carteiras perguntam a um nó sobre a ponta da cadeia, pares e (num processo de carteira) saldos. No Z3, Zebra fornece RPC de nó; Zallet fornece RPC de carteira.
* **Regtest** é o local certo para aprender as chamadas. O rpc-router do Z3 em `http://127.0.0.1:8181` aceita `zebra` / `zebra` e encaminha métodos de nó para Zebra e métodos de carteira para Zallet.
* **Mainnet e testnet** utilizam autenticação por cookie em Zebra. Não copie o nome de utilizador/palavra-passe de regtest para um nó público.
* **Indexação** é uma tarefa separada da validação. Zebra valida. [Zaino](/zcash-tech/zaino) (Z3 `--profile indexer`) fornece gRPC compatível com lightwalletd. [Ztreamer](https://github.com/distractedm1nd/ztreamer) é um indexador baseado em Zakura; não é o que o Z3 disponibiliza.
* O JSON-RPC de Zaino e o gRPC opcional do indexador de Zebra destinam-se a loopback ou a uma rede fidedigna. Não os exponha sem autenticação na Internet pública.

---

## Que processo responde a cada chamada

| Pretende | Comunique com | Porta de anfitrião do Z3 mainnet | Notas |
| --- | --- | --- | --- |
| Ponta da cadeia, pares, `getblockchaininfo` | JSON-RPC de Zebra | 8232 | Autenticação por cookie |
| Saldo da carteira, endereços, envio | RPC de Zallet | 28232 | Processo separado; software beta |
| Blocos compactos para carteiras leves | gRPC de Zaino | 8137 | Apenas com `--profile indexer`; h2c em texto simples |
| Proxy JSON-RPC para explorador / faucet | JSON-RPC de Zaino | 8237 | Apenas rede fidedigna |
| Praticar tudo o acima sem sincronização | rpc-router regtest do Z3 | 8181 | Nome de utilizador `zebra` / palavra-passe `zebra` |

Matriz de portas e nomes de projetos Compose: [Z3 Stack](/zcash-tech/z3-stack) e [`z3-contract.yaml`](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml).

---

## Pratique primeiro em regtest

A partir de um checkout do Z3, depois de `./scripts/regtest-init.sh` e `docker compose --env-file .env.regtest up -d`:

```bash
# Node method (Zebra)
curl -s -X POST -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"getblockchaininfo","params":[],"id":1}' \
  http://127.0.0.1:8181

# Wallet method (Zallet)
curl -s -X POST -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"getwalletinfo","params":[],"id":2}' \
  http://127.0.0.1:8181
```

Um resultado saudável de `getblockchaininfo` inclui `"blocks"` e um mapa `"upgrades"`. Se curl bloquear, o router não está ativo; se receber `401`, está a contactar Zebra diretamente em vez do router (o Zebra direto em regtest é `29232` e continua a esperar as credenciais do router, a menos que as tenha alterado).

Fluxo de trabalho completo de regtest, incluindo a mineração dos blocos de ativação: [Z3 `docs/regtest.md`](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md).

---

## JSON-RPC de mainnet / testnet (autenticação por cookie)

Em mainnet e testnet, Zallet e o serviço opcional Zaino leem um **volume de cookie partilhado**. Esse cookie é regenerado no arranque; não é um destino de cópia de segurança.

**Não** publique o JSON-RPC de Zebra na Internet pública. Chame-o a partir da rede Compose (`zebra:8232`) ou apenas a partir do anfitrião se o associou a loopback.

Verificações típicas do operador depois de Zebra estar `/ready`:

```bash
# Wait until Zebra is synced (Z3 helper)
./scripts/check-zebra-readiness.sh

# Then start Zallet
docker compose --env-file .env.mainnet up -d
```

`getblocktemplate` / `getmininginfo` são RPCs de mineração. Pools que ainda esperavam um único processo `zcashd` precisam de Zebra (ou Zakura) para templates, além da carteira que utilizam para coinbase. Consulte [Zcash Mining Pools](/using-zcash/zcash-mining-pools) e o [guia de migração](/guides/migration-guide-zcashd-to-zebrad-zallet).

---

## Ligar um indexador

A validação e a indexação são tarefas diferentes.

### Zaino (o que o Z3 disponibiliza)

Zaino lê Zebra e fornece uma API gRPC compatível com lightwalletd, além de um proxy JSON-RPC. Zallet não necessita do contentor autónomo Zaino; incorpora bibliotecas Zaino e comunica com Zebra através de JSON-RPC. Inicie Zaino autónomo quando pretender carteiras leves externas, exploradores ou faucets:

```bash
docker compose --env-file .env.mainnet --profile indexer up -d
```

Aguarde até que Zebra esteja sincronizado antes de apontar clientes para Zaino. Um indexador em massa em atualização, com elevada concorrência de obtenção, pode abrandar o verificador de Zebra; mantenha `fetch_concurrency` nos dígitos baixos até que o indexador esteja atualizado.

gRPC de regtest (texto simples; porta `28137`):

```bash
# From the Z3 repo, after: scripts/vendor.sh zaino
# and: docker compose --env-file .env.regtest --profile indexer up -d zaino

grpcurl -plaintext \
  -import-path vendor/zaino/zaino-proto/proto \
  -proto service.proto \
  127.0.0.1:28137 \
  cash.z.wallet.sdk.rpc.CompactTxStreamer/GetLightdInfo

grpcurl -plaintext \
  -import-path vendor/zaino/zaino-proto/proto \
  -proto service.proto \
  -d '{}' \
  127.0.0.1:28137 \
  cash.z.wallet.sdk.rpc.CompactTxStreamer/GetLatestBlock
```

O gRPC de Zaino é h2c em texto simples em todas as redes. Termine TLS num proxy reverso se algo fora do anfitrião se for ligar. Detalhes: [Zaino](/zcash-tech/zaino) e [Z3 `docs/regtest.md`](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md).

### Outros indexadores (não Z3)

* **lightwalletd** — o servidor de blocos compactos mais antigo. Continua implementado no ecossistema; Zaino é o caminho sucessor para esta função.
* **Ztreamer** — um indexador baseado em Zakura e uma implementação de `CompactTxStreamer`. Não é um serviço Z3. Consulte o [Ztreamer repositório](https://github.com/distractedm1nd/ztreamer).
* **Zebra `rpc.indexer_listen_addr`** — um listener gRPC opcional *dentro* de Zebra. O Z3 não o requer nem o publica no anfitrião.

---

## Erros comuns

**Chamar métodos de carteira em Zebra.** `getwalletinfo` e os RPCs de envio pertencem a Zallet (ou a outra carteira), não ao nó de consenso.

**Iniciar Zallet antes de Zebra estar `/ready`.** Zallet entrará num ciclo de reinícios. Utilize `scripts/check-zebra-readiness.sh` em mainnet/testnet.

**Copiar `zebra`/`zebra` de regtest para mainnet.** A autenticação por cookie é a predefinição de mainnet/testnet por uma razão.

**Tratar Zaino como um nó completo.** Zebra (ou Zakura) valida. Zaino indexa.

**Expor publicamente o JSON-RPC de Zaino ou o gRPC do indexador de Zebra.** Esses endpoints destinam-se a loopback ou a uma rede privada fidedigna.

**Assumir que todas as carteiras leves já falam Zaino.** Verifique a versão atual da carteira em relação ao protocolo que ela realmente implementa.

---

## Páginas relacionadas

* [Z3 Stack](/zcash-tech/z3-stack) — instalação, portas, volumes, arranque em duas fases
* [Zaino](/zcash-tech/zaino) — função do indexador e notas para operadores
* [Full Nodes](/zcash-tech/full-nodes)
* [Zebra Nó Completo](/zcash-tech/zebra-full-node)
* [Lightwallet Nodes](/zcash-tech/lightwallet-nodes)
* [Guia de Migração: zcashd para Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet)
* [Zingolib e Tutorial Zaino](/guides/zingolib-and-zaino-tutorial)

## Recursos

* [Repositório Z3](https://github.com/ZcashFoundation/z3)
* [Guia prático de regtest Z3 (curl / grpcurl)](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md)
* [FAQ do Z3](https://github.com/ZcashFoundation/z3/blob/main/docs/faq.md)
* [Zebra](https://zebra.zfnd.org/)
* [Zaino](https://github.com/zingolabs/zaino)
* [Livro Zallet](https://zcash.github.io/zallet/)
* [Ztreamer](https://github.com/distractedm1nd/ztreamer)

**Última atualização:** setembro de 2026
