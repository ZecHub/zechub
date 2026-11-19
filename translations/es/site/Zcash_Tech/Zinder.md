# Zinder Indexador

Zinder es un indexador Zcash autogestionado escrito en Rust y publicado por Zcash Foundation. Lee la red una vez desde un nodo completo Zebra o Zakura, almacena una vista coherente de ella y ofrece esa vista a varias billeteras, aplicaciones y exploradores al mismo tiempo. Las billeteras ligeras existentes pueden conectarse a él mediante un adaptador compatible con lightwalletd.

> **Zinder está en fase alfa.** Su propio README indica que la API nativa, la superficie de compatibilidad con lightwalletd, los formatos de almacenamiento y la topología de implementación cambiarán, y que una versión etiquetada no garantiza estabilidad. Fija versiones exactas y espera actualizaciones incompatibles.

## En resumen

* **Zebra** o **Zakura** valida la red. **Zinder** indexa los datos del nodo y se los ofrece a los clientes.
* Hay dos formas de conectarse: la API gRPC `WalletQuery` propia de Zinder y un adaptador independiente que habla el protocolo `CompactTxStreamer` de lightwalletd, para que las billeteras creadas para lightwalletd puedan conectarse sin cambios de código.
* Cada lectura queda fijada a un estado de la red (una «época»), por lo que un lote de sincronización nunca mezcla datos de dos puntas de la red en competencia. Las claves y el escaneo blindado permanecen en la billetera.
* Está diseñado para que un operador ejecute un nodo y preste servicio a muchos consumidores. Los endpoints públicos deben estar detrás de tu propio TLS, autenticación y límites de velocidad.
* Las versiones se publican rápido (de 0.7.0 a 0.12.0 entre el 10 y el 14 de noviembre de 2026) y varias incluyeron cambios incompatibles. Lee el registro de cambios antes de cada actualización.

## Dónde encaja Zinder

Las billeteras ligeras nunca se comunican directamente con un nodo completo. Solicitan bloques compactos, estados de los árboles y datos de transacciones a un indexador (consulta [Nodos Lightwallet](/zcash-tech/lightwallet-nodes)). El ecosistema Zcash cuenta ahora con varios indexadores capaces de hacerlo:

| Indexador | Lenguaje | Mantenedor | Se comunica con | Notas |
|:--|:--|:--|:--|:--|
| lightwalletd | Go | ECC / comunidad Zcash | Zebra o zcashd | El servidor original para billeteras ligeras |
| [Zaino](/zcash-tech/zaino) | Rust | Zingo Labs | Zebra o zcashd | Perfil de indexador opcional en la pila Z3 |
| [Ztreamer](https://github.com/zcashlabs/ztreamer) | Rust | zcashlabs | Nodo Zakura integrado | Consulta la comparación de rendimiento [Zaino frente a Ztreamer](/zcash-tech/indexer-benchmark-zaino-vs-ztreamer) |
| **Zinder** | Rust | Zcash Foundation | Zebra 7.0.0 o Zakura 1.8.6 (nodo de archivo) | Alfa. API nativa, además de un adaptador lightwalletd y lecturas opcionales para exploradores |

La documentación de Zinder explica claramente cuándo es la opción adecuada: es especialmente útil cuando el acceso a la red debe seguir disponible aunque cierre un proceso de billetera, atender a varios consumidores independientes o mantenerse separado del código de cualquier billetera. Para una sola billetera estrechamente integrada, un indexador integrado puede ser más sencillo; y un consumidor que solo necesita datos que el nodo ya tiene puede usar directamente la RPC de Zebra.

## Cómo está construido

Zinder divide el trabajo en procesos independientes, cada uno con una sola función:

| Entorno de ejecución | Función |
|:--|:--|
| `zinder-ingest` | Único proceso que escribe en el almacén canónico de la red (RocksDB). Sigue al nodo, gestiona reorganizaciones y mantiene el estado del mempool en tiempo real |
| `zinder-projector` | Único proceso que escribe en el almacén de la billetera. Construye y sigue una vista de la red adaptada a la billetera |
| `zinder-query` | Ofrece la API gRPC nativa de `WalletQuery` |
| `zinder-compat-lightwalletd` | Ofrece la API `CompactTxStreamer` de lightwalletd sobre los mismos datos |

Un plano opcional para exploradores (`zinder-explorer` con `ExplorerQuery`) ofrece resúmenes de bloques, detalles de transacciones, vistas del mempool y búsquedas; un adaptador opcional ofrece las API REST y WebSocket del explorador CipherScan. Ninguno forma parte de las imágenes de lanzamiento.

Cada entorno de ejecución expone `/healthz`, `/readyz` y `/metrics`. Los lectores solo indican que están listos cuando sus copias del almacén de la red y del almacén de la billetera apuntan exactamente al mismo estado de la red.

## Formas de conectarse

* **Las billeteras ligeras existentes** conservan su integración con lightwalletd y la conectan a `zinder-compat-lightwalletd`. La documentación de Zinder distingue la compatibilidad del protocolo de la asistencia técnica: una billetera se considera compatible solo después de que su versión actual supere la certificación integral. La versión 0.10.0 corrigió el campo de versión del protocolo `GetLightdInfo` para que Zingo pueda sincronizarse.
* **Los clientes nativos** llaman a `zinder-query` para realizar lecturas fijadas, obtener bloques compactos, recibir flujos de eventos de la red y del mempool, y consultar los resultados de difusión con motivos de rechazo tipificados.
* **Las aplicaciones Rust** usan el crate `zinder-client`, un SDK diseñado primero para conexiones remotas que se conecta a `zinder-query` sin enlazar la pila de almacenamiento.
* **Los exploradores y los backends** combinan las lecturas de la billetera con el plano opcional `ExplorerQuery`.

## Cómo ejecutarlo

La guía de inicio rápido del proyecto inicia un nodo con la [pila Z3](/zcash-tech/z3-stack) y luego ejecuta Zinder con Docker Compose desde el checkout de Zinder:

```bash
# In the Z3 checkout
Z3_NETWORK=testnet docker compose up -d

# In the Zinder checkout
docker compose --env-file deploy/.env.testnet \
  -f deploy/docker-compose.yml up -d --build
```

Los archivos de entorno para Mainnet y para un nodo Zakura (`deploy/.env.zakura-mainnet`, `deploy/.env.zakura-testnet`) están junto a él. Desde la versión 0.11.0, el archivo Compose ya no presupone que se use Z3: el archivo de entorno debe indicar la red del nodo, el volumen de cookies y la dirección RPC.

Puertos de host predeterminados (Testnet añade 10000):

| Servicio | Mainnet | Testnet |
|:--|:--|:--|
| gRPC nativo `WalletQuery` | 9102 | 19102 |
| gRPC compatible con lightwalletd | 9067 | 19067 |
| Disponibilidad: ingest / projector / query / compat | 9105 / 9110 / 9106 / 9107 | 19105 / 19110 / 19106 / 19107 |

Ambos puertos de billetera se enlazan a la interfaz de loopback. Compruébalos con:

```bash
grpcurl -plaintext -d '{}' 127.0.0.1:19102 zinder.v1.wallet.WalletQuery/ServerInfo
grpcurl -plaintext -d '{}' 127.0.0.1:19067 cash.z.wallet.sdk.rpc.CompactTxStreamer/GetLightdInfo
```

Otras formas de implementarlo:

* **Imágenes de lanzamiento** en `ghcr.io/zcashfoundation/`: los cuatro entornos de ejecución, además de `zinder-wallet-serving` (ingest, projector y native query en un contenedor para hosts que puedan montar un volumen en un solo contenedor; no incluye el adaptador lightwalletd) y `zinder-canonical-runtime` (solo ingest).
* **Binarios Linux** para x86-64 (requiere una CPU x86-64-v3) y AArch64, con glibc 2.34 o posterior. Debian 12 es la versión de referencia certificada. Cada versión incluye un SBOM y una procedencia SLSA firmada.

### Requisitos del nodo

* Un **nodo de archivo**. Desde la versión 0.11.0, `zinder-ingest` se niega a iniciar si se conecta a un nodo podado.
* Zebra **7.0.0** o Zakura **1.8.6**. Son las dos versiones de nodo certificadas para las versiones publicadas.
* Para la imagen `zinder-wallet-serving`, el nodo debe ofrecer el **endpoint gRPC del indexador** (`ZINDER_NODE__INDEXER_GRPC_ADDR`, `indexer_listen_addr` de Zebra, puerto 8155 en Mainnet). Un indexador Zakura en una dirección que no sea de loopback requiere TLS mutuo, compatible con Zinder desde la versión 0.11.0.

### Recursos para Mainnet

Según la guía de operaciones para servir billeteras:

* Al menos **8 GB de memoria**. Picos medidos: ingest, unos 2.6 GiB; projector, unos 2.7 GiB durante la construcción; query, hasta unos 1.4 GiB.
* Deja unos **130 GB libres** en el volumen cuando se haya construido el almacén de billeteras de Mainnet.
* Una construcción de Mainnet medida desde el bloque génesis tardó unas **cuatro horas** para el almacén de la red (con un espacio de preparación cercano a 310 GB) y **más de dos horas** para el almacén de la billetera. Los plazos de construcción incluidos solo sirven para Testnet: auméntalos al menos a 24 h y 12 h para Mainnet; de lo contrario, la construcción se reinicia y nunca termina.

## Notas de versión importantes

| Versión | Fecha | Cambios relevantes para operadores |
|:--|:--|:--|
| 0.7.0 | 2026-11-10 | El límite predeterminado de reorganización aumentó a 1000 bloques, la profundidad a la que Zebra 7 y Zakura finalizan bloques. El cambio es irreversible: las versiones anteriores no pueden abrir los almacenes actualizados |
| 0.9.0 | 2026-11-12 | Nuevas imágenes `zinder-wallet-serving` y `zinder-canonical-runtime` |
| 0.10.0 | 2026-11-13 | **Primera versión que decodifica bloques NU7.** La versión 0.9.0 y las anteriores se detienen en el primer bloque NU7. Revisión 8 del protocolo nativo: actualiza ingest y query al mismo tiempo, junto con los clientes nativos |
| 0.11.1 | 2026-11-14 | Zakura 1.8.6 certificado junto con Zebra 7.0.0; TLS mutuo con el indexador del nodo; se rechazan los nodos podados. La versión 0.11.0 solo se publicó como crates, así que implementa la 0.11.1 |
| 0.12.0 | 2026-11-14 | Correcciones de disponibilidad y apagado; la repetición de datos del explorador es más rápida y se pausa cuando queda poco espacio en disco |

## Errores comunes

**Tratarlo como software listo para producción.** El proyecto se define como alfa. En sus propias palabras, una implementación local de Compose que funcione «no constituye por sí sola una certificación para producción».

**Conectarlo a un nodo podado.** Ingest se cierra al iniciarse. Usa un nodo de archivo Zebra o Zakura.

**Exponer directamente los puertos gRPC.** Ambos puertos de billetera se enlazan a loopback por un motivo. Antes de abrirlos a internet, configura TLS, autenticación, límites de velocidad y cuotas en un proxy bajo tu control.

**Actualizar un entorno de ejecución a la vez.** Varias versiones modifican la revisión del protocolo nativo o el formato del almacén. Actualiza juntos los servicios Zinder y actualiza los clientes nativos en el mismo cambio.

**Dar por compatible una billetera porque el protocolo lo sea.** El adaptador lightwalletd habla el protocolo, pero Zinder solo declara compatible una billetera concreta después de certificar integralmente su versión actual.

## Páginas relacionadas

* [Nodos Lightwallet](/zcash-tech/lightwallet-nodes) — qué hace un servidor para billeteras ligeras y qué puede ver
* [Zaino](/zcash-tech/zaino) — el indexador Rust de Zingo Labs
* [Prueba de rendimiento de indexadores: Zaino frente a Ztreamer](/zcash-tech/indexer-benchmark-zaino-vs-ztreamer)
* [Pila Z3](/zcash-tech/z3-stack) — Zebra + Zallet, la configuración del nodo que usa la guía de inicio rápido de Zinder
* Nodo completo Zebra[](/zcash-tech/zebra-full-node) y nodo Zakura[](/zcash-tech/zakura-node) — los dos nodos que certifica Zinder

## ¿Dónde puedo obtener más información?

* Repositorio de GitHub [Zinder](https://github.com/ZcashFoundation/zinder)
* Versiones [Zinder](https://github.com/ZcashFoundation/zinder/releases) y [registro de cambios](https://github.com/ZcashFoundation/zinder/blob/main/CHANGELOG.md)
* [Qué es Zinder y qué no es](https://github.com/ZcashFoundation/zinder/blob/main/docs/architecture/indexer-wallet-boundary.md)
* [Implementación en una VM](https://github.com/ZcashFoundation/zinder/blob/main/docs/runbooks/deploying-on-a-vm.md) y guías de ejecución de la [imagen para servir billeteras](https://github.com/ZcashFoundation/zinder/blob/main/docs/runbooks/deploying-wallet-serving.md)

**Última actualización:** noviembre de 2026
