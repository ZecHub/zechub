<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zcash_Node_RPC_and_Indexing.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Guia prático: RPC de nó Zcash e indexação da blockchain

Esta página é um livro de receitas para se comunicar com um nó integral Zcash em execução via JSON-RPC e para conectar um indexador que carteiras leves e exploradores possam consultar. Ela **não** é um segundo guia de instalação.

Para saber como subir a stack pós-`zcashd` (Zebra + Zallet, Zaino opcional, portas, volumes, inicialização em duas fases), use a página [Stack Z3](/zcash-tech/z3-stack) e o [repositório Z3](https://github.com/ZcashFoundation/z3). Para informações sobre nós de consenso, veja [Nós integrais](/zcash-tech/full-nodes) e [Nó integral Zebra](/zcash-tech/zebra-full-node).

O `zcashd` chegou ao fim da vida útil em 18 de julho de 2026. Novos trabalhos de operadores devem ter como alvo o Zebra (ou [Zakura](/zcash-tech/zakura-node)) mais uma carteira/indexador, e não o `zcashd`.

---

## Resumo

* **JSON-RPC** é a forma como operadores e carteiras consultam um nó sobre a ponta da chain, os pares e (em um processo de carteira) os saldos. No Z3, o Zebra atende o RPC do nó; a Zallet atende o RPC da carteira.
* **Regtest** é o lugar certo para aprender as chamadas. O rpc-router do Z3 em `http://127.0.0.1:8181` aceita `zebra` / `zebra` e encaminha os métodos de nó para o Zebra e os métodos de carteira para a Zallet.
* **Mainnet e testnet** usam autenticação por cookie em Zebra. Não copie o usuário/senha do regtest para um nó público.
* **Indexação** é uma tarefa separada da validação. O Zebra valida. O [Zaino](/zcash-tech/zaino) (`--profile indexer` do Z3) atende gRPC compatível com lightwalletd. O [Ztreamer](https://github.com/zcashlabs/ztreamer) é um indexador baseado em Zakura; não é o que o Z3 distribui.
* O JSON-RPC do Zaino e o gRPC opcional do indexador do Zebra são para loopback ou para uma rede confiável. Não os exponha sem autenticação na internet pública.

---

## Qual processo responde a qual chamada

| Você quer | Fale com | Porta do host na mainnet do Z3 | Observações |
| --- | --- | --- | --- |
| Ponta da chain, pares, `getblockchaininfo` | JSON-RPC do Zebra | 8232 | Autenticação por cookie |
| Saldo da carteira, endereços, envio | RPC da Zallet | 28232 | Processo separado; software beta |
| Blocos compactos para carteiras leves | gRPC do Zaino | 8137 | Somente com `--profile indexer`; h2c em texto simples |
| Proxy JSON-RPC para explorador / faucet | JSON-RPC do Zaino | 8237 | Somente em rede confiável |
| Praticar tudo isso sem sincronização | rpc-router do regtest do Z3 | 8181 | Usuário `zebra` / senha `zebra` |

Matriz de portas e nomes de projetos do Compose: [Stack Z3](/zcash-tech/z3-stack) e [`z3-contract.yaml`](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml).

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

Um resultado saudável de `getblockchaininfo` inclui `"blocks"` e um mapa `"upgrades"`. Se o curl travar, o router não está ativo; se você receber `401`, está acessando o Zebra diretamente em vez do router (o Zebra direto no regtest é `29232` e ainda espera as credenciais do router, a menos que você as tenha alterado).

Fluxo completo do regtest, incluindo a mineração dos blocos de ativação: [`docs/regtest.md` do Z3](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md).

---

## JSON-RPC na mainnet / testnet (autenticação por cookie)

Na mainnet e na testnet, o Zallet e o serviço opcional Zaino leem um **volume de cookie compartilhado**. Esse cookie é regenerado na inicialização; não é algo a ser incluído em backup.

**Não** publique o JSON-RPC do Zebra na internet pública. Chame-o a partir da rede do Compose (`zebra:8232`) ou a partir do host somente se você o tiver vinculado ao loopback.

Verificações típicas do operador depois que o Zebra estiver `/ready`:

```bash
# Wait until Zebra is synced (Z3 helper)
./scripts/check-zebra-readiness.sh

# Then start Zallet
docker compose --env-file .env.mainnet up -d
```

`getblocktemplate` / `getmininginfo` são RPCs de mineração. Pools que ainda esperavam um único processo `zcashd` precisam do Zebra (ou Zakura) para os templates, mais a carteira que usarem para o coinbase. Veja [Pools de mineração Zcash](/using-zcash/zcash-mining-pools) e o [guia de migração](/guides/migration-guide-zcashd-to-zebrad-zallet).

---

## Conecte um indexador

Validação e indexação são tarefas diferentes.

### Zaino (o que o Z3 distribui)

O Zaino lê o Zebra e atende uma API gRPC compatível com lightwalletd, além de um proxy JSON-RPC. A Zallet **não** precisa do contêiner independente Zaino; ela incorpora bibliotecas do Zaino e se comunica com o Zebra via JSON-RPC. Inicie o Zaino independente quando quiser carteiras leves, exploradores ou faucets externos:

```bash
docker compose --env-file .env.mainnet --profile indexer up -d
```

Espere até que o Zebra esteja sincronizado antes de apontar clientes para o Zaino. Um indexador em massa em recuperação com alta concorrência de busca pode deixar o verificador do Zebra mais lento; mantenha `fetch_concurrency` em um dígito baixo até que o indexador tenha alcançado a ponta.

gRPC no regtest (texto simples; porta `28137`):

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

O gRPC do Zaino é h2c em texto simples em todas as redes. Encerre o TLS em um proxy reverso se algo fora do host for se conectar. Detalhes: [Zaino](/zcash-tech/zaino) e [`docs/regtest.md` do Z3](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md).

### Outros indexadores (fora do Z3)

* **lightwalletd** — o servidor de blocos compactos mais antigo. Ainda está implantado por aí; o Zaino é o caminho sucessor para essa função.
* **Ztreamer** — um indexador baseado em Zakura e uma implementação de `CompactTxStreamer`. Não é um serviço do Z3. Veja o [repositório Ztreamer](https://github.com/zcashlabs/ztreamer).
* **Zebra `rpc.indexer_listen_addr`** — um listener gRPC opcional *dentro* do Zebra. O Z3 não o exige e não o publica no host.

---

## Erros comuns

**Chamar métodos de carteira no Zebra.** `getwalletinfo` e os RPCs de envio pertencem à Zallet (ou a outra carteira), não ao nó de consenso.

**Iniciar o Zallet antes que o Zebra esteja `/ready`.** O Zallet entrará em loop de reinicialização. Use `scripts/check-zebra-readiness.sh` na mainnet/testnet.

**Copiar `zebra`/`zebra` do regtest para a mainnet.** A autenticação por cookie é o padrão na mainnet/testnet por um motivo.

**Tratar o Zaino como um nó integral.** O Zebra (ou Zakura) valida. O Zaino indexa.

**Expor publicamente o JSON-RPC do Zaino ou o gRPC do indexador do Zebra.** Esses endpoints são para loopback ou para uma rede privada confiável.

**Presumir que toda carteira leve já fala Zaino.** Verifique a versão atual da carteira em relação ao protocolo que ela realmente implementa.

---

## Páginas relacionadas

* [Stack Z3](/zcash-tech/z3-stack) — instalação, portas, volumes, inicialização em duas fases
* [Zaino](/zcash-tech/zaino) — função do indexador e notas para operadores
* [Nós integrais](/zcash-tech/full-nodes)
* [Nó integral Zebra](/zcash-tech/zebra-full-node)
* [Nós de carteira leve](/zcash-tech/lightwallet-nodes)
* [Guia de migração: do zcashd para Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet)
* [Tutorial de Zingolib e Zaino](/guides/zingolib-and-zaino-tutorial)

## Recursos

* [Repositório Z3](https://github.com/ZcashFoundation/z3)
* [Livro de receitas do regtest do Z3 (curl / grpcurl)](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md)
* [FAQ do Z3](https://github.com/ZcashFoundation/z3/blob/main/docs/faq.md)
* [Zebra](https://zebra.zfnd.org/)
* [Zaino](https://github.com/zingolabs/zaino)
* [Livro do Zallet](https://zcash.github.io/zallet/)
* [Ztreamer](https://github.com/zcashlabs/ztreamer)

**Última atualização:** setembro de 2026
