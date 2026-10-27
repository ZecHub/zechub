<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zcash_Node_RPC_and_Indexing.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Guia prático: RPC de nó do Zcash e indexação de blockchain

Esta página é um guia prático para se comunicar com um nó integral do Zcash em execução por JSON-RPC e conectar um indexador que carteiras leves e exploradores possam consultar. **Não** é um segundo guia de instalação.

Para saber como iniciar a stack pós-`zcashd` (Zebra + Zallet, Zaino opcional, portas, volumes, inicialização em duas fases), use a página [Stack Z3](/zcash-tech/z3-stack) e o [repositório Z3](https://github.com/ZcashFoundation/z3). Para obter contexto sobre nós de consenso, consulte [Nós integrais](/zcash-tech/full-nodes) e [Nó integral Zebra](/zcash-tech/zebra-full-node).

`zcashd` chegou ao fim de vida em 18 de julho de 2026. O novo trabalho de operadores deve ter como alvo o Zebra (ou [Zakura](/zcash-tech/zakura-node)) mais uma carteira/indexador, e não o `zcashd`.

---

## Resumo

* **JSON-RPC** é como operadores e carteiras perguntam a um nó sobre a ponta da chain, pares e (em um processo de carteira) saldos. No Z3, o Zebra fornece RPC de nó; o Zallet fornece RPC de carteira.
* **Regtest** é o lugar certo para aprender as chamadas. O rpc-router do Z3 em `http://127.0.0.1:8181` aceita `zebra` / `zebra` e encaminha métodos de nó para o Zebra e métodos de carteira para o Zallet.
* **Mainnet e testnet** usam autenticação por cookie no Zebra. Não copie o nome de usuário/senha do regtest para um nó público.
* **Indexação** é uma tarefa separada da validação. O Zebra valida. O [Zaino](/zcash-tech/zaino) (Z3 `--profile indexer`) fornece gRPC compatível com lightwalletd. O [Ztreamer](https://github.com/distractedm1nd/ztreamer) é um indexador baseado em Zakura; não é o que o Z3 disponibiliza.
* O JSON-RPC do Zaino e o gRPC opcional do indexador do Zebra destinam-se a loopback ou a uma rede confiável. Não os exponha sem autenticação na internet pública.

---

## Qual processo responde a cada chamada

| Pretende | Fale com | Porta do host Z3 mainnet | Observações |
| --- | --- | --- | --- |
| Ponta da chain, pares, `getblockchaininfo` | JSON-RPC do Zebra | 8232 | Autenticação por cookie |
| Saldo da carteira, endereços, envio | RPC do Zallet | 28232 | Processo separado; software beta |
| Blocos compactos para light clients | gRPC do Zaino | 8137 | Apenas com `--profile indexer`; h2c em texto simples |
| Proxy JSON-RPC para explorador / faucet | Proxy JSON-RPC do Zaino | 8237 | Apenas rede confiável |
| Praticar tudo o que foi dito acima sem sincronização | rpc-router regtest do Z3 | 8181 | Nome de usuário `zebra` / senha `zebra` |

Matriz de portas e nomes de projetos Compose: [Stack Z3](/zcash-tech/z3-stack) e [`z3-contract.yaml`](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml).

---

## Pratique primeiro no regtest

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

Um resultado saudável de `getblockchaininfo` inclui `"blocks"` e um mapa `"upgrades"`. Se curl bloquear, o router não está ativo; se receber `401`, você está consultando o Zebra diretamente em vez do router (o Zebra direto em regtest é `29232` e continua esperando as credenciais do router, a menos que você as tenha alterado).

Fluxo de trabalho completo do regtest, incluindo a mineração dos blocos de ativação: [Z3 `docs/regtest.md`](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md).

---

## JSON-RPC de mainnet / testnet (autenticação por cookie)

Na mainnet e na testnet, o Zallet e o serviço opcional Zaino leem um **volume de cookie compartilhado**. Esse cookie é regenerado na inicialização; ele não é um destino de backup.

**Não** publique o JSON-RPC do Zebra na internet pública. Chame-o a partir da rede Compose (`zebra:8232`) ou do host apenas se você o vinculou ao loopback.

Verificações típicas do operador depois que o Zebra estiver `/ready`:

```bash
# Wait until Zebra is synced (Z3 helper)
./scripts/check-zebra-readiness.sh

# Then start Zallet
docker compose --env-file .env.mainnet up -d
```

`getblocktemplate` / `getmininginfo` são RPCs de mineração. Pools que ainda esperavam um único processo `zcashd` precisam do Zebra (ou Zakura) para templates, além da carteira que usam para coinbase. Consulte [Pools de mineração do Zcash](/using-zcash/zcash-mining-pools) e o [guia de migração](/guides/migration-guide-zcashd-to-zebrad-zallet).

---

## Conecte um indexador

Validação e indexação são tarefas diferentes.

### Zaino (o que o Z3 disponibiliza)

Zaino lê Zebra e fornece uma API gRPC compatível com lightwalletd, além de um proxy JSON-RPC. Zallet não necessita do contentor autónomo Zaino; incorpora bibliotecas Zaino e comunica com Zebra através de JSON-RPC. Inicie Zaino autónomo quando pretender carteiras leves externas, exploradores ou faucets:

```bash
docker compose --env-file .env.mainnet --profile indexer up -d
```

Aguarde até que o Zebra esteja sincronizado antes de direcionar clientes ao Zaino. Um indexador em massa se atualizando, com alta concorrência de busca, pode desacelerar o verificador do Zebra; mantenha `fetch_concurrency` nos dígitos baixos até que o indexador esteja atualizado.

gRPC do regtest (texto simples; porta `28137`):

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

O gRPC do Zaino é h2c em texto simples em todas as redes. Termine o TLS em um proxy reverso se algo fora do host for se conectar. Detalhes: [Zaino](/zcash-tech/zaino) e [Z3 `docs/regtest.md`](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md).

### Outros indexadores (não Z3)

* **lightwalletd** — o servidor de blocos compactos mais antigo. Ainda é implantado no ecossistema; o Zaino é o caminho sucessor para essa função.
* **Ztreamer** — um indexador baseado em Zakura e uma implementação de `CompactTxStreamer`. Não é um serviço do Z3. Consulte o [repositório Ztreamer](https://github.com/distractedm1nd/ztreamer).
* **Zebra `rpc.indexer_listen_addr`** — um listener gRPC opcional *dentro* do Zebra. O Z3 não o exige nem o publica no host.

---

## Erros comuns

**Chamar métodos de carteira no Zebra.** `getwalletinfo` e os RPCs de envio pertencem ao Zallet (ou a outra carteira), não ao nó de consenso.

**Iniciar o Zallet antes de o Zebra estar `/ready`.** O Zallet entrará em um ciclo de reinicializações. Use `scripts/check-zebra-readiness.sh` na mainnet/testnet.

**Copiar `zebra`/`zebra` do regtest para a mainnet.** A autenticação por cookie é o padrão da mainnet/testnet por um motivo.

**Tratar o Zaino como um nó integral.** O Zebra (ou Zakura) valida. O Zaino indexa.

**Expor publicamente o JSON-RPC do Zaino ou o gRPC do indexador do Zebra.** Esses endpoints destinam-se a loopback ou a uma rede privada confiável.

**Presumir que todas as carteiras leves já falam Zaino.** Verifique a versão atual da carteira em relação ao protocolo que ela realmente implementa.

---

## Páginas relacionadas

* [Stack Z3](/zcash-tech/z3-stack) — instalação, portas, volumes, inicialização em duas fases
* [Zaino](/zcash-tech/zaino) — função do indexador e observações para operadores
* [Nós integrais](/zcash-tech/full-nodes)
* [Nó integral Zebra](/zcash-tech/zebra-full-node)
* [Nós de carteiras leves](/zcash-tech/lightwallet-nodes)
* [Guia de migração: zcashd para Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet)
* [Tutorial de Zingolib e Zaino](/guides/zingolib-and-zaino-tutorial)

## Recursos

* [Repositório Z3](https://github.com/ZcashFoundation/z3)
* [Guia prático do regtest Z3 (curl / grpcurl)](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md)
* [Perguntas frequentes do Z3](https://github.com/ZcashFoundation/z3/blob/main/docs/faq.md)
* [Zebra](https://zebra.zfnd.org/)
* [Zaino](https://github.com/zingolabs/zaino)
* [Livro do Zallet](https://zcash.github.io/zallet/)
* [Ztreamer](https://github.com/distractedm1nd/ztreamer)

**Última atualização:** setembro de 2026
