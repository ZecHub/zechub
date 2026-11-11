<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Z3_Stack.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Stack Z3

El **Stack Z3** es la plataforma de nodos empaquetada de Zcash Foundation: **Zebra** (nodo completo [full node]) + **Zallet** (billetera de nodo completo [full-node wallet]), con un indexador [indexer] opcional **Zaino**. Es el reemplazo previsto para un proceso `zcashd` independiente, que agrupaba el consenso y una billetera en un solo binario y llegó al final de su vida útil el 18 de julio de 2026.

La implementación de referencia es el proyecto Compose de Docker en [github.com/ZcashFoundation/z3](https://github.com/ZcashFoundation/z3).

---

## En resumen

* Z3 **no es un nuevo cliente de consenso**. Es la forma de ejecutar conjuntamente el stack posterior a `zcashd`: Zebra valida la red [chain], Zallet guarda las claves y ofrece RPC de billetera, y Zaino (opcional) utiliza el protocolo gRPC de lightwalletd.
* `zcashd` agrupaba nodo + billetera. Z3 **separa esas funciones**. Los exchanges, pools de minado y otros operadores de billeteras de nodos completos migran a esta combinación en lugar de hacerlo únicamente a Zebra.
* Tres proyectos Compose aislados pueden ejecutarse en un solo host: **mainnet**, **testnet** y **regtest**.
* La primera sincronización de mainnet tarda aproximadamente **24–72 horas** y ocupa unos **300 GB**. Regtest se inicia en segundos y es el lugar adecuado para aprender a usar el stack.
* Zallet incorpora las bibliotecas de indexador de Zaino y se comunica con Zebra mediante JSON-RPC. El servicio Zaino independiente solo es necesario si desea un endpoint compatible con lightwalletd para billeteras externas.
* Zallet está en **beta**. Los cambios incompatibles pueden requerir eliminar y recrear la billetera. No lo trate como software de custodia terminado para grandes sumas.

---

## Por qué existe Z3

Durante la mayor parte de la vida de Zcash, `zcashd` era tanto el nodo completo de referencia como la única billetera de nodo completo de producción. Ese diseño es con el que se integraron exchanges, pools y custodios.

`zcashd` está retirado. El consenso pasó a [Zebra](/zcash-tech/zebra-full-node) (y ahora también a [Zakura](/zcash-tech/zakura-node)). La billetera integrada pasó a [Zallet](https://github.com/zcash/zallet). El servicio para billeteras ligeras está migrando de [lightwalletd](/zcash-tech/lightwallet-nodes) a [Zaino](/zcash-tech/zaino).

Esas tres piezas son repositorios separados, tienen ciclos de lanzamiento separados y configuraciones separadas. Z3 es el pegamento: imágenes fijadas, comprobaciones de estado que mantienen la billetera inactiva hasta que el nodo se sincronice, puertos y volúmenes por red, y una ruta documentada para operadores.

El nombre es una abreviatura informal del ecosistema — Zebra, Zaino, Zallet — aunque el archivo Compose predeterminado solo inicia Zebra y Zallet. Zaino es un perfil de Compose, no un tercer proceso obligatorio.

---

## Arquitectura

```
                    ┌──────────────────────── Z3 (per network) ────────────────────────┐
                    │                                                                  │
  peers ◄──P2P──►  Zebra (zebrad)  ──JSON-RPC──►  Zallet                                │
                    │   full node                    │  embeds Zaino libraries          │
                    │                                │  wallet RPC for operators        │
                    │                                └─────────────────────────────────┤
                    │                                                                  │
                    │   Zaino (optional, --profile indexer)                            │
                    │     lightwalletd-compatible gRPC + JSON-RPC proxy                │
                    │            │                                                     │
                    └────────────┼─────────────────────────────────────────────────────┘
                                 ▼
                        light wallets / explorers
```

| Componente | Función en Z3 | ¿Obligatorio? |
| --- | --- | --- |
| **Zebra** | Sincroniza y valida la red, difusión, JSON-RPC, endpoint de estado | Sí |
| **Zallet** | Billetera de nodo completo. Incorpora las bibliotecas de Zaino. Se conecta directamente al JSON-RPC de Zebra. **No** llama al contenedor Zaino independiente | Sí |
| **Zaino** | Indexador independiente. gRPC compatible con lightwalletd para clientes ligeros externos, además de un proxy JSON-RPC para exploradores y faucets | No — `--profile indexer` |

Z3 fija las versiones de las imágenes en `docker-compose.yml`. Sobrescriba con `Z3_ZEBRA_IMAGE`, `Z3_ZAINO_IMAGE` o `Z3_ZALLET_IMAGE` si necesita una etiqueta diferente.

---

## En qué se diferencia de zcashd

| | zcashd | Z3 |
| --- | --- | --- |
| Lenguaje | C++ (fork de Bitcoin) | Servicios de Rust, orquestados con Compose de Docker |
| Modelo de proceso | Un binario: nodo + billetera | Contenedores de nodo y billetera separados |
| Consenso | Retirado (fin de vida útil el 18 de julio de 2026) | Zebra (u otro nodo compatible) |
| Billetera | `wallet.dat` integrada | Zallet, directorio de datos cifrado con age |
| Clientes ligeros | Normalmente un lightwalletd separado | Perfil Zaino opcional |
| Configuración | `zcash.conf` | Archivos por red en `config/<network>/` más archivos de entorno de Compose |
| Redes en un host | Conflictos de puertos difíciles | De primera clase: `z3-mainnet`, `z3-testnet`, `z3-regtest` |

Si todavía tiene una billetera `zcashd`, utilice la guía de migración de ZecHub [migration guide](/guides/migration-guide-zcashd-to-zebrad-zallet) y el comando `migrate-zcashd-wallet` de Zallet en lugar de copiar `wallet.dat` al volumen de Z3.

---

## Redes

Z3 son tres proyectos Compose independientes. No comparten puertos ni volúmenes.

| Red | Nombre del proyecto | Úsela para | Primera sincronización | Fondos reales |
| --- | --- | --- | --- | --- |
| **mainnet** | `z3-mainnet` | Producción | 24–72 horas | Sí |
| **testnet** | `z3-testnet` | Entorno de pruebas en la red pública de pruebas | 2–12 horas | No (ZEC de prueba) |
| **regtest** | `z3-regtest` | Práctica local: bloques instantáneos, sin pares | Segundos | No |

Los nuevos operadores deberían empezar con **regtest**, confirmar los flujos de RPC y de billetera, y luego pasar a testnet o mainnet.

---

## Puertos de host predeterminados

Las tres redes están diseñadas para coexistir en una sola máquina. Los valores siguientes son los predeterminados publicados; todos pueden sobrescribirse mediante la variable de entorno `Z3_*` correspondiente. La matriz canónica es [`z3-contract.yaml`](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml).

| Servicio | Mainnet | Testnet | Regtest |
| --- | --- | --- | --- |
| JSON-RPC de Zebra | 8232 | 18232 | 29232 |
| P2P de Zebra | 8233 | 18233 | (no publicado) |
| Estado de Zebra (`/ready`) | 8080 | 18080 | 28080 |
| gRPC de Zaino (perfil de indexador) | 8137 | 18137 | 28137 |
| JSON-RPC de Zaino (perfil de indexador) | 8237 | 18237 | 28237 |
| RPC de Zallet | 28232 | 40232 | 50232 |

Dentro de la red Compose, los servicios se resuelven por nombre (`zebra`, `zaino`, `zallet`).

---

## Datos y copias de seguridad

| Volumen | Qué contiene | ¿Hacer copia de seguridad? |
| --- | --- | --- |
| `z3-<network>-chain` | Estado de la red de Zebra (~300 GB en mainnet) | Opcional — se puede resincronizar |
| `z3-<network>-zallet` | Base de datos de la billetera cifrada **y** la identidad age que la desbloquea | **Sí — este es el único volumen del que se debe hacer copia de seguridad** |
| `z3-<network>-zaino` | Estado del indexador (solo con el perfil de indexador) | Opcional — se puede reconstruir |
| `z3-<network>-cookie` | Cookie RPC de Zebra | No — se regenera |

Para colocar el estado de la red en otro disco antes del primer inicio:

```bash
export Z3_CHAIN_DATA_PATH=/mnt/ssd/zebra-state
./scripts/fix-permissions.sh zebra /mnt/ssd/zebra-state
```

`docker compose --env-file .env.<network> --profile "*" down` detiene el stack y conserva los volúmenes. Agregar `-v` los elimina y fuerza una resincronización completa. Incluya `--profile "*"` para que los servicios restringidos por perfil (indexador, supervisión) se desmonten realmente.

---

## Primeros pasos

Requisitos previos: Engine de Docker, Compose de Docker v2.24.4+, Git. `openssl` solo es obligatorio para regtest.

### Regtest (la forma más rápida de ver el stack)

```bash
git clone https://github.com/ZcashFoundation/z3 && cd z3
./scripts/regtest-init.sh
docker compose --env-file .env.regtest up -d
```

Consulte [docs/regtest.md](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md) para ver los comandos de prueba.

### Mainnet (inicio en dos fases)

Zebra debe terminar de sincronizarse antes de que Zallet sea útil. Iniciar Zallet antes hace que se reinicie en bucle hasta que `/ready` sea verdadero.

```bash
git clone https://github.com/ZcashFoundation/z3 && cd z3

# 1. One-time setup: local config + Zallet wallet identity
./scripts/setup-network.sh mainnet

# 2. Start Zebra and wait until it is synced
docker compose --env-file .env.mainnet up -d zebra
./scripts/check-zebra-readiness.sh

# 3. Start Zallet (and anything else in the default profile)
docker compose --env-file .env.mainnet up -d
```

Testnet sigue el mismo flujo con `.env.testnet` y `./scripts/check-zebra-readiness.sh 18080`.

Las ediciones en `config/<network>/` permanecen locales y sobreviven a `git pull`.

### Perfiles opcionales

```bash
# Lightwalletd-compatible gRPC + JSON-RPC proxy
docker compose --env-file .env.mainnet --profile indexer up -d

# Prometheus, Grafana, Jaeger, Alertmanager
docker compose --env-file .env.mainnet --profile monitoring up -d
```

Los puertos predeterminados de Grafana son 3000 (mainnet), 13000 (testnet), 23000 (regtest).

---

## Notas para operadores

* **Imágenes fijadas.** Z3 no cambia silenciosamente a `:latest`. Actualice una fijación en un cambio revisado o establezca `Z3_<SERVICE>_IMAGE`.
* **Contenedores sin root.** Las capacidades de Linux se descartan. Las comprobaciones de estado retrasan la billetera hasta que Zebra esté listo. La política de reinicio está activada de forma predeterminada.
* **Registros.** Z3 no fija un controlador de registros. Establezca límites de tamaño en la configuración del daemon de Docker o los registros crecerán sin límite en un nodo activo 24/7.
* **P2P.** Mainnet y testnet publican el puerto P2P de Zebra. Detrás de NAT, establezca `ZEBRA_NETWORK__EXTERNAL_ADDR` en la dirección a la que los pares deben conectarse. Regtest no tiene pares.
* **Zaino en ARM.** La imagen ascendente de Zaino es solo `linux/amd64`. En Apple Silicon se ejecuta mediante emulación, a menos que compile desde el código fuente. Zebra y Zallet son multiarquitectura.
* **Hosts compartidos.** No se establecen límites de CPU ni memoria de forma predeterminada. Agregue `deploy.resources.limits` en un archivo de sobrescritura si la máquina no está dedicada al nodo.

Lista de comprobación y preguntas frecuentes orientadas a producción: [docs/faq.md](https://github.com/ZcashFoundation/z3/blob/main/docs/faq.md), [docs/docker-architecture.md](https://github.com/ZcashFoundation/z3/blob/main/docs/docker-architecture.md).

---

## Quién debería ejecutar Z3

**Buena opción**

* Exchanges, custodios y pools de minado que usaban `zcashd` como nodo más billetera
* Operadores que desean un RPC de billetera de nodo completo compatible contra un Zebra sincronizado
* Desarrolladores que necesitan mainnet, testnet y regtest en paralelo
* Cualquiera que establezca un endpoint privado compatible con lightwalletd mediante el perfil Zaino

**Normalmente, la herramienta equivocada**

* Usuarios finales que solo necesitan enviar y recibir ZEC — utilicen una billetera ligera, como ZODL / Zashi, Zingo o YWallet
* Personas que solo desean validar la red — ejecuten únicamente Zebra (o Zakura)
* Personas que solo desean servir bloques compactos — ejecuten Zebra + Zaino, o Zebra + lightwalletd, sin Zallet

---

## Páginas relacionadas

* [Zebra Nodo completo](/zcash-tech/zebra-full-node) — nodo de consenso que Z3 encapsula
* [Zaino](/zcash-tech/zaino) — perfil de indexador opcional
* [Nodos completos](/zcash-tech/full-nodes) — Zebra, Zakura y el zcashd retirado
* [Nodos de billeteras ligeras](/zcash-tech/lightwallet-nodes) — con qué se comunican los clientes ligeros
* [Zakura Nodo](/zcash-tech/zakura-node) — nodo completo alternativo; no es el que Z3 incluye actualmente
* [Guía de migración: zcashd a Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet)
* [Recursos para desarrolladores](/start-here/developer-resources)

---

## Recursos

* [Repositorio de Z3](https://github.com/ZcashFoundation/z3)
* [Contrato de Z3 (puertos, volúmenes, nombres de proyectos)](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml)
* [Zebra](https://github.com/ZcashFoundation/zebra) · [El libro de Zebra](https://zebra.zfnd.org/)
* [Zaino](https://github.com/zingolabs/zaino)
* [Zallet](https://github.com/zcash/zallet) · [El libro de Zallet](https://zcash.github.io/zallet/)
* [ZcashForo de la comunidad — actualizaciones de Z3](https://forum.zcashcommunity.com/t/zcash-z3-updates-formerly-zcashd-deprecation/48965)
* [Lanzador de Z3](https://github.com/Jubrilabdulazeez/z3-launcher) — plano de control comunitario sobre el stack Compose oficial (Hackathon de ZecHub)
