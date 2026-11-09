<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zcash_Node_RPC_and_Indexing.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Guía práctica: RPC de nodo Zcash e indexación de blockchain

Esta página es un recetario para comunicarse con un nodo completo Zcash en ejecución mediante JSON-RPC y para conectar un indexador que puedan consultar las billeteras ligeras y los exploradores. **No** es una segunda guía de instalación.

Para saber cómo poner en marcha la pila posterior a `zcashd` (Zebra + Zallet, Zaino opcional, puertos, volúmenes, arranque en dos fases), utiliza la página [Pila Z3](/zcash-tech/z3-stack) y el [repositorio de Z3](https://github.com/ZcashFoundation/z3). Para información sobre nodos de consenso, consulta [Nodos completos](/zcash-tech/full-nodes) y [Nodo completo Zebra](/zcash-tech/zebra-full-node).

`zcashd` llegó al final de su vida útil el 18 de julio de 2026. El nuevo trabajo de operadores debe orientarse a Zebra (o [Zakura](/zcash-tech/zakura-node)) más una billetera/indexador, no a `zcashd`.

---

## En resumen

* **JSON-RPC** es la forma en que los operadores y las billeteras preguntan a un nodo por la punta de la red [chain], los pares y, en un proceso de billetera, los saldos. En Z3, Zebra proporciona RPC de nodo; Zallet proporciona RPC de billetera.
* **Regtest** es el lugar adecuado para aprender las llamadas. El rpc-router de Z3 en `http://127.0.0.1:8181` acepta `zebra` / `zebra` y reenvía los métodos de nodo a Zebra y los métodos de billetera a Zallet.
* **Mainnet y testnet** usan autenticación por cookie en Zebra. No copies el nombre de usuario/contraseña de regtest en un nodo público.
* **La indexación** es una tarea independiente de la validación. Zebra valida. [Zaino](/zcash-tech/zaino) (Z3 `--profile indexer`) proporciona gRPC compatible con lightwalletd. [Ztreamer](https://github.com/distractedm1nd/ztreamer) es un indexador respaldado por Zakura; no es lo que incluye Z3.
* El JSON-RPC de Zaino y el gRPC opcional del indexador de Zebra son para loopback o una red de confianza. No los expongas sin autenticación en la internet pública.

---

## Qué proceso responde a cada llamada

| Lo que quieres | Comunícate con | Puerto de host de mainnet de Z3 | Notas |
| --- | --- | --- | --- |
| Punta de la red, pares, `getblockchaininfo` | JSON-RPC de Zebra | 8232 | Autenticación por cookie |
| Saldo de billetera, direcciones, envío | RPC de Zallet | 28232 | Proceso independiente; software beta |
| Bloques compactos para billeteras ligeras | gRPC de Zaino | 8137 | Solo con `--profile indexer`; h2c en texto plano |
| Proxy JSON-RPC para explorador / faucet | JSON-RPC de Zaino | 8237 | Solo red de confianza |
| Practicar todo lo anterior sin sincronización | rpc-router de regtest de Z3 | 8181 | Nombre de usuario `zebra` / contraseña `zebra` |

Matriz de puertos y nombres de proyectos Compose: [Pila Z3](/zcash-tech/z3-stack) y [`z3-contract.yaml`](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml).

---

## Practica primero en regtest

Desde una extracción de Z3, después de `./scripts/regtest-init.sh` y `docker compose --env-file .env.regtest up -d`:

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

Un resultado saludable de `getblockchaininfo` incluye `"blocks"` y un mapa de `"upgrades"`. Si curl se bloquea, el router no está activo; si obtienes `401`, estás accediendo a Zebra directamente en lugar de al router (el Zebra directo en regtest está en `29232` y aún espera las credenciales del router, a menos que las hayas cambiado).

Flujo de trabajo completo de regtest, incluido el minado [mining] de los bloques de activación: [Z3 `docs/regtest.md`](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md).

---

## JSON-RPC de mainnet / testnet (autenticación por cookie)

En mainnet y testnet, Zallet y el servicio opcional Zaino leen un **volumen de cookies compartido**. Esa cookie se regenera al arrancar; no es un destino de respaldo.

**No** publiques el JSON-RPC de Zebra en la internet pública. Llámalo desde la red Compose (`zebra:8232`) o desde el host solo si lo vinculaste a loopback.

Comprobaciones típicas del operador después de que Zebra esté `/ready`:

```bash
# Wait until Zebra is synced (Z3 helper)
./scripts/check-zebra-readiness.sh

# Then start Zallet
docker compose --env-file .env.mainnet up -d
```

`getblocktemplate` / `getmininginfo` son RPC de minado. Los pools que aún esperaban un único proceso `zcashd` necesitan Zebra (o Zakura) para las plantillas, además de cualquier billetera que usen para coinbase. Consulta [Pools de minado Zcash](/using-zcash/zcash-mining-pools) y la [guía de migración](/guides/migration-guide-zcashd-to-zebrad-zallet).

---

## Conecta un indexador

La validación y la indexación son tareas diferentes.

### Zaino (lo que incluye Z3)

Zaino lee Zebra y proporciona una API gRPC compatible con lightwalletd, además de un proxy JSON-RPC. Zallet **no** necesita el contenedor independiente Zaino; incorpora bibliotecas de Zaino y se comunica con Zebra mediante JSON-RPC. Inicia Zaino independiente cuando quieras billeteras ligeras, exploradores o faucets externos:

```bash
docker compose --env-file .env.mainnet --profile indexer up -d
```

Espera hasta que Zebra esté sincronizado antes de dirigir clientes a Zaino. Un indexador masivo que se esté poniendo al día con alta concurrencia de obtención puede ralentizar el verificador de Zebra; mantén `fetch_concurrency` en los dígitos bajos hasta que el indexador se haya puesto al día.

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

El gRPC de Zaino es h2c en texto plano en todas las redes. Finaliza TLS en un proxy inverso si algo fuera del host se conectará. Detalles: [Zaino](/zcash-tech/zaino) y [Z3 `docs/regtest.md`](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md).

### Otros indexadores (no Z3)

* **lightwalletd** — el servidor de bloques compactos más antiguo. Sigue desplegado en la práctica; Zaino es la ruta sucesora para esta función.
* **Ztreamer** — un indexador respaldado por Zakura y una implementación de `CompactTxStreamer`. No es un servicio de Z3. Consulta el [repositorio de Ztreamer](https://github.com/distractedm1nd/ztreamer).
* **Zebra `rpc.indexer_listen_addr`** — un listener gRPC opcional *dentro* de Zebra. Z3 no lo requiere ni lo publica en el host.

---

## Errores comunes

**Llamar métodos de billetera en Zebra.** `getwalletinfo` y los RPC de envío pertenecen a Zallet (u otra billetera), no al nodo de consenso.

**Iniciar Zallet antes de que Zebra esté `/ready`.** Zallet entrará en un ciclo de reinicios. Usa `scripts/check-zebra-readiness.sh` en mainnet/testnet.

**Copiar `zebra`/`zebra` de regtest en mainnet.** La autenticación por cookie es el valor predeterminado de mainnet/testnet por una razón.

**Tratar Zaino como un nodo completo.** Zebra (o Zakura) valida. Zaino indexa.

**Exponer públicamente el JSON-RPC de Zaino o el gRPC del indexador de Zebra.** Esos endpoints son para loopback o una red privada de confianza.

**Suponer que toda billetera ligera ya habla Zaino.** Comprueba la versión actual de la billetera frente al protocolo que realmente implementa.

---

## Páginas relacionadas

* [Pila Z3](/zcash-tech/z3-stack) — instalación, puertos, volúmenes, arranque en dos fases
* [Zaino](/zcash-tech/zaino) — función del indexador y notas para operadores
* [Nodos completos](/zcash-tech/full-nodes)
* [Nodo completo Zebra](/zcash-tech/zebra-full-node)
* [Nodos de billeteras ligeras](/zcash-tech/lightwallet-nodes)
* [Guía de migración: de zcashd a Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet)
* [Zingolib y tutorial de Zaino](/guides/zingolib-and-zaino-tutorial)

## Recursos

* [Repositorio de Z3](https://github.com/ZcashFoundation/z3)
* [Recetario de regtest de Z3 (curl / grpcurl)](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md)
* [Preguntas frecuentes de Z3](https://github.com/ZcashFoundation/z3/blob/main/docs/faq.md)
* [Zebra](https://zebra.zfnd.org/)
* [Zaino](https://github.com/zingolabs/zaino)
* [Libro de Zallet](https://zcash.github.io/zallet/)
* [Ztreamer](https://github.com/distractedm1nd/ztreamer)

**Última actualización:** Septiembre de 2026
