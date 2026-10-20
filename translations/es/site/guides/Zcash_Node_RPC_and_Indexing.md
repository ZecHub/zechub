<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zcash_Node_RPC_and_Indexing.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Guía práctica: RPC de nodo Zcash e indexación de blockchain

Esta página es una guía práctica para comunicarse con un nodo completo Zcash en ejecución mediante JSON-RPC y para conectar un indexador que puedan consultar wallets ligeras y exploradores. **No** es una segunda guía de instalación.

Para saber cómo poner en marcha la pila posterior a `zcashd` (Zebra + Zallet, Zaino opcional, puertos, volúmenes, arranque en dos fases), utiliza la página de la [pila Z3](/zcash-tech/z3-stack) y el [repositorio de Z3](https://github.com/ZcashFoundation/z3). Para información sobre nodos de consenso, consulta [nodos completos](/zcash-tech/full-nodes) y el [nodo completo Zebra](/zcash-tech/zebra-full-node).

`zcashd` llegó al final de su vida útil el 18 de julio de 2026. El nuevo trabajo de operadores debería orientarse a Zebra (o [Zakura](/zcash-tech/zakura-node)) junto con una wallet/indexador, no a `zcashd`.

---

## Resumen

* **JSON-RPC** es la forma en que los operadores y las wallets consultan a un nodo sobre la punta de la cadena, pares y, en un proceso de wallet, saldos. En Z3, Zebra proporciona RPC de nodo; Zallet proporciona RPC de wallet.
* **Regtest** es el lugar adecuado para aprender las llamadas. El rpc-router de Z3 en `http://127.0.0.1:8181` acepta `zebra` / `zebra` y reenvía los métodos de nodo a Zebra y los métodos de wallet a Zallet.
* **Mainnet y testnet** usan autenticación mediante cookie en Zebra. No copies el nombre de usuario/contraseña de regtest a un nodo público.
* **La indexación** es un trabajo distinto de la validación. Zebra valida. [Zaino](/zcash-tech/zaino) (Z3 `--profile indexer`) proporciona gRPC compatible con lightwalletd. [Ztreamer](https://github.com/distractedm1nd/ztreamer) es un indexador respaldado por Zakura; no es lo que incluye Z3.
* El JSON-RPC de Zaino y el gRPC opcional del indexador de Zebra son para loopback o una red de confianza. No los expongas sin autenticación en la internet pública.

---

## Qué proceso responde a cada llamada

| Lo que quieres | Conectarte a | Puerto del host de Z3 mainnet | Notas |
| --- | --- | --- | --- |
| Punta de la cadena, pares, `getblockchaininfo` | JSON-RPC de Zebra | 8232 | Autenticación mediante cookie |
| Saldo de wallet, direcciones, envío | RPC de Zallet | 28232 | Proceso independiente; software beta |
| Bloques compactos para wallets ligeras | gRPC de Zaino | 8137 | Solo con `--profile indexer`; h2c en texto plano |
| Proxy JSON-RPC de explorador / faucet | JSON-RPC de Zaino | 8237 | Solo red de confianza |
| Practicar todo lo anterior sin sincronización | rpc-router de regtest de Z3 | 8181 | Usuario `zebra` / contraseña `zebra` |

Matriz de puertos y nombres de proyectos Compose: [pila Z3](/zcash-tech/z3-stack) y [`z3-contract.yaml`](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml).

---

## Practica primero en regtest

Desde un checkout de Z3, después de `./scripts/regtest-init.sh` y `docker compose --env-file .env.regtest up -d`:

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

Un resultado correcto de `getblockchaininfo` incluye `"blocks"` y un mapa `"upgrades"`. Si curl se queda esperando, el router no está activo; si recibes `401`, estás accediendo a Zebra directamente en lugar de al router (el Zebra directo en regtest es `29232` y sigue esperando las credenciales del router, salvo que las hayas cambiado).

Flujo de trabajo completo de regtest, incluida la minería de los bloques de activación: [Z3 `docs/regtest.md`](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md).

---

## JSON-RPC de mainnet / testnet (autenticación mediante cookie)

En mainnet y testnet, Zallet y el servicio opcional Zaino leen un **volumen de cookies compartido**. Esa cookie se regenera al arrancar; no es un objetivo de respaldo.

**No** publiques el JSON-RPC de Zebra en la internet pública. Llámalo desde la red Compose (`zebra:8232`) o desde el host solo si lo has vinculado a loopback.

Comprobaciones típicas de operador después de que Zebra esté `/ready`:

```bash
# Wait until Zebra is synced (Z3 helper)
./scripts/check-zebra-readiness.sh

# Then start Zallet
docker compose --env-file .env.mainnet up -d
```

`getblocktemplate` / `getmininginfo` son RPC de minería. Los pools que todavía esperaban un único proceso `zcashd` necesitan Zebra (o Zakura) para las plantillas, además de la wallet que usen para coinbase. Consulta [pools de minería Zcash](/using-zcash/zcash-mining-pools) y la [guía de migración](/guides/migration-guide-zcashd-to-zebrad-zallet).

---

## Conectar un indexador

La validación y la indexación son trabajos diferentes.

### Zaino (lo que incluye Z3)

Zaino lee Zebra y proporciona una API gRPC compatible con lightwalletd, además de un proxy JSON-RPC. Zallet **no** necesita el contenedor independiente Zaino; incorpora bibliotecas de Zaino y se comunica con Zebra mediante JSON-RPC. Inicia Zaino independiente cuando quieras wallets ligeras, exploradores o faucets externos:

```bash
docker compose --env-file .env.mainnet --profile indexer up -d
```

Espera hasta que Zebra esté sincronizado antes de dirigir clientes a Zaino. Un indexador masivo en proceso de actualización, con alta concurrencia de obtención, puede ralentizar el verificador de Zebra; mantén `fetch_concurrency` en valores bajos de un solo dígito hasta que el indexador se haya actualizado.

gRPC de regtest (texto plano; puerto `28137`):

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

El gRPC de Zaino usa h2c en texto plano en todas las redes. Termina TLS en un proxy inverso si algo fuera del host se conectará. Detalles: [Zaino](/zcash-tech/zaino) y [Z3 `docs/regtest.md`](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md).

### Otros indexadores (no Z3)

* **lightwalletd** — el servidor de bloques compactos más antiguo. Sigue desplegado en el ecosistema; Zaino es la vía sucesora para esta función.
* **Ztreamer** — un indexador respaldado por Zakura y una implementación de `CompactTxStreamer`. No es un servicio de Z3. Consulta el [repositorio de Ztreamer](https://github.com/distractedm1nd/ztreamer).
* **Zebra `rpc.indexer_listen_addr`** — un listener gRPC opcional *dentro de* Zebra. Z3 no lo requiere ni lo publica en el host.

---

## Errores comunes

**Llamar métodos de wallet en Zebra.** `getwalletinfo` y los RPC de envío pertenecen a Zallet (u otra wallet), no al nodo de consenso.

**Iniciar Zallet antes de que Zebra esté `/ready`.** Zallet entrará en un bucle de reinicios. Usa `scripts/check-zebra-readiness.sh` en mainnet/testnet.

**Copiar `zebra`/`zebra` de regtest a mainnet.** La autenticación mediante cookie es el valor predeterminado en mainnet/testnet por una razón.

**Tratar Zaino como un nodo completo.** Zebra (o Zakura) valida. Zaino indexa.

**Exponer públicamente el JSON-RPC de Zaino o el gRPC del indexador de Zebra.** Esos endpoints son para loopback o una red privada de confianza.

**Suponer que todas las wallets ligeras ya hablan Zaino.** Comprueba la versión actual de la wallet frente al protocolo que realmente implementa.

---

## Páginas relacionadas

* [pila Z3](/zcash-tech/z3-stack) — instalación, puertos, volúmenes, arranque en dos fases
* [Zaino](/zcash-tech/zaino) — función del indexador y notas para operadores
* [nodos completos](/zcash-tech/full-nodes)
* [nodo completo Zebra](/zcash-tech/zebra-full-node)
* [nodos de Lightwallet](/zcash-tech/lightwallet-nodes)
* [guía de migración: de zcashd a Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet)
* [Zingolib y tutorial de Zaino](/guides/zingolib-and-zaino-tutorial)

## Recursos

* [repositorio de Z3](https://github.com/ZcashFoundation/z3)
* [guía práctica de regtest de Z3 (curl / grpcurl)](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md)
* [preguntas frecuentes de Z3](https://github.com/ZcashFoundation/z3/blob/main/docs/faq.md)
* [Zebra](https://zebra.zfnd.org/)
* [Zaino](https://github.com/zingolabs/zaino)
* [libro de Zallet](https://zcash.github.io/zallet/)
* [Ztreamer](https://github.com/distractedm1nd/ztreamer)

**Última actualización:** septiembre de 2026
