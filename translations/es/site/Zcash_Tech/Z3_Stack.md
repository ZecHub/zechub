<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Z3_Stack.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Stack Z3

El **Stack Z3** es la plataforma empaquetada de nodos de Zcash Foundation: **Zebra** (nodo completo) + **Zallet** (wallet de nodo completo), con un indexador **Zaino** opcional. Es el reemplazo previsto para un proceso `zcashd` independiente, que agrupaba el consenso y una wallet en un binario y llegó al final de su vida útil el 18 de julio de 2026.

La implementación de referencia es el proyecto Docker Compose en [github.com/ZcashFoundation/z3](https://github.com/ZcashFoundation/z3).

---

## Resumen

* Z3 **no es un nuevo cliente de consenso**. Es la forma de ejecutar conjuntamente el stack posterior a `zcashd`: Zebra valida la cadena, Zallet conserva las claves y ofrece RPC de wallet, y Zaino (opcional) utiliza el protocolo gRPC de lightwalletd.
* `zcashd` agrupaba nodo + wallet. Z3 **separa esas funciones**. Los exchanges, pools de minería y otros operadores de wallets de nodo completo migran a esta combinación en lugar de usar únicamente Zebra.
* Tres proyectos Compose aislados pueden ejecutarse en un mismo host: **mainnet**, **testnet** y **regtest**.
* La primera sincronización de mainnet tarda aproximadamente **24–72 horas** y ocupa unos **300 GB**. Regtest se inicia en segundos y es el lugar adecuado para aprender a usar el stack.
* Zallet incorpora las bibliotecas de indexación de Zaino y se comunica con Zebra mediante JSON-RPC. El servicio independiente Zaino solo es necesario si quieres un endpoint compatible con lightwalletd para wallets externas.
* Zallet está en **beta**. Los cambios incompatibles pueden requerir eliminar y volver a crear la wallet. No lo consideres software de custodia finalizado para grandes cantidades.

---

## Por qué existe Z3

Durante la mayor parte de la vida de Zcash, `zcashd` fue tanto el nodo completo de referencia como la única wallet de nodo completo para producción. Ese diseño fue el que integraron exchanges, pools y custodios.

`zcashd` está retirado. El consenso se trasladó a [Zebra](/zcash-tech/zebra-full-node) (y ahora también a [Zakura](/zcash-tech/zakura-node)). La wallet integrada se trasladó a [Zallet](https://github.com/zcash/zallet). El servicio para wallets ligeras está migrando de [lightwalletd](/zcash-tech/lightwallet-nodes) a [Zaino](/zcash-tech/zaino).

Estas tres piezas son repositorios, ciclos de lanzamiento y configuraciones independientes. Z3 es el pegamento: imágenes fijadas, comprobaciones de estado que mantienen la wallet inactiva hasta que el nodo se sincronice, puertos y volúmenes por red, y una ruta documentada para operadores.

El nombre es una abreviatura informal del ecosistema — Zebra, Zaino, Zallet — aunque el archivo Compose predeterminado solo inicia Zebra y Zallet. Zaino es un perfil Compose, no un tercer proceso obligatorio.

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
| **Zebra** | Sincroniza y valida la cadena, gossip, JSON-RPC, endpoint de estado | Sí |
| **Zallet** | Wallet de nodo completo. Incorpora bibliotecas de Zaino. Se conecta directamente al JSON-RPC de Zebra. **No** llama al contenedor independiente de Zaino | Sí |
| **Zaino** | Indexador independiente. gRPC compatible con lightwalletd para clientes ligeros externos, además de un proxy JSON-RPC para exploradores y faucets | No — `--profile indexer` |

Z3 fija las versiones de las imágenes en `docker-compose.yml`. Sobrescríbelas con `Z3_ZEBRA_IMAGE`, `Z3_ZAINO_IMAGE` o `Z3_ZALLET_IMAGE` si necesitas una etiqueta diferente.

---

## En qué se diferencia de zcashd

| | zcashd | Z3 |
| --- | --- | --- |
| Lenguaje | C++ (fork de Bitcoin) | Servicios Rust, orquestados con Docker Compose |
| Modelo de procesos | Un binario: nodo + wallet | Contenedores separados para nodo y wallet |
| Consenso | Retirado (fin de vida útil: 18 de julio de 2026) | Zebra (u otro nodo compatible) |
| Wallet | `wallet.dat` integrada | Zallet, directorio de datos cifrado con age |
| Clientes ligeros | Normalmente un lightwalletd independiente | Perfil Zaino opcional |
| Configuración | `zcash.conf` | Archivos por red en `config/<network>/` más archivos de entorno Compose |
| Redes en un host | Conflictos de puertos molestos | De primera clase: `z3-mainnet`, `z3-testnet`, `z3-regtest` |

Si todavía tienes una wallet `zcashd`, utiliza la ZecHubguía de migración[ de ](/guides/migration-guide-zcashd-to-zebrad-zallet) y el comando `migrate-zcashd-wallet` de Zallet, en lugar de copiar `wallet.dat` al volumen de Z3.

---

## Redes

Z3 son tres proyectos Compose independientes. No comparten puertos ni volúmenes.

| Red | Nombre del proyecto | Úsala para | Primera sincronización | Fondos reales |
| --- | --- | --- | --- | --- |
| **mainnet** | `z3-mainnet` | Producción | 24–72 horas | Sí |
| **testnet** | `z3-testnet` | Entorno de pruebas en la red de prueba pública | 2–12 horas | No (ZEC de prueba) |
| **regtest** | `z3-regtest` | Práctica local: bloques instantáneos, sin pares | Segundos | No |

Los operadores nuevos deberían comenzar con **regtest**, confirmar los flujos de RPC y wallet, y luego pasar a testnet o mainnet.

---

## Puertos de host predeterminados

Las tres redes están diseñadas para coexistir en una misma máquina. Los valores a continuación son los predeterminados publicados; todos pueden sobrescribirse mediante la variable de entorno `Z3_*` correspondiente. La matriz canónica es [`z3-contract.yaml`](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml).

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
| `z3-<network>-chain` | Estado de la cadena de Zebra (~300 GB en mainnet) | Opcional — puede volver a sincronizarse |
| `z3-<network>-zallet` | Base de datos de wallet cifrada **y** la identidad age que la desbloquea | **Sí — este es el único volumen del que se debe hacer copia de seguridad** |
| `z3-<network>-zaino` | Estado del indexador (solo con el perfil de indexador) | Opcional — puede reconstruirse |
| `z3-<network>-cookie` | Cookie RPC de Zebra | No — se regenera |

Para colocar el estado de la cadena en otro disco antes del primer inicio:

```bash
export Z3_CHAIN_DATA_PATH=/mnt/ssd/zebra-state
./scripts/fix-permissions.sh zebra /mnt/ssd/zebra-state
```

`docker compose --env-file .env.<network> --profile "*" down` detiene el stack y conserva los volúmenes. Añadir `-v` los elimina y fuerza una resincronización completa. Incluye `--profile "*"` para que los servicios restringidos por perfil (indexador, monitorización) se detengan realmente.

---

## Primeros pasos

Requisitos previos: Docker Engine, Docker Compose v2.24.4+, Git. `openssl` solo es necesario para regtest.

### Regtest (la forma más rápida de ver el stack)

```bash
git clone https://github.com/ZcashFoundation/z3 && cd z3
./scripts/regtest-init.sh
docker compose --env-file .env.regtest up -d
```

Consulta [docs/regtest.md](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md) para ver los comandos de prueba.

### Mainnet (inicio en dos fases)

Zebra debe terminar de sincronizarse antes de que Zallet sea útil. Iniciar Zallet antes hará que entre en un bucle de reinicio hasta que `/ready` sea verdadero.

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

Las modificaciones en `config/<network>/` permanecen locales y sobreviven a `git pull`.

### Perfiles opcionales

```bash
# Lightwalletd-compatible gRPC + JSON-RPC proxy
docker compose --env-file .env.mainnet --profile indexer up -d

# Prometheus, Grafana, Jaeger, Alertmanager
docker compose --env-file .env.mainnet --profile monitoring up -d
```

Los puertos predeterminados de Grafana son 3000 (mainnet), 13000 (testnet) y 23000 (regtest).

---

## Notas para operadores

* **Imágenes fijadas.** Z3 no cambia silenciosamente a `:latest`. Actualiza una fijación mediante un cambio revisado o establece `Z3_<SERVICE>_IMAGE`.
* **Contenedores sin root.** Se eliminan las capacidades de Linux. Las comprobaciones de estado retienen la wallet hasta que Zebra esté listo. La política de reinicio está activada de forma predeterminada.
* **Registros.** Z3 no fija un controlador de registro. Establece límites de tamaño en la configuración del daemon de Docker, o los registros crecerán sin límite en un nodo que funciona 24/7.
* **P2P.** Mainnet y testnet publican el puerto P2P de Zebra. Detrás de NAT, establece `ZEBRA_NETWORK__EXTERNAL_ADDR` en la dirección que deberían marcar los pares. Regtest no tiene pares.
* **Zaino en ARM.** La imagen upstream de Zaino es solo para `linux/amd64`. En Apple Silicon se ejecuta bajo emulación a menos que compiles desde el código fuente. Zebra y Zallet son multi-arquitectura.
* **Hosts compartidos.** No se establecen límites de CPU ni memoria de forma predeterminada. Añade `deploy.resources.limits` en un archivo de sobrescritura si el equipo no está dedicado al nodo.

Lista de verificación con configuración de producción y preguntas frecuentes: [docs/faq.md](https://github.com/ZcashFoundation/z3/blob/main/docs/faq.md), [docs/docker-architecture.md](https://github.com/ZcashFoundation/z3/blob/main/docs/docker-architecture.md).

---

## Quién debería ejecutar Z3

**Buena opción**

* Exchanges, custodios y pools de minería que utilizaban `zcashd` como nodo y wallet
* Operadores que desean un RPC de wallet de nodo completo compatible contra un Zebra sincronizado
* Desarrolladores que necesitan mainnet, testnet y regtest en paralelo
* Cualquiera que establezca un endpoint privado compatible con lightwalletd mediante el perfil Zaino

**Normalmente es la herramienta equivocada**

* Usuarios finales que solo necesitan enviar y recibir ZEC — utilicen una wallet ligera como ZODL / Zashi, Zingo o YWallet
* Personas que solo quieren validar la cadena — ejecuten Zebra (o Zakura) por sí solo
* Personas que solo quieren servir bloques compactos — ejecuten Zebra + Zaino, o Zebra + lightwalletd, sin Zallet

---

## Páginas relacionadas

* [Zebra Nodo completo](/zcash-tech/zebra-full-node) — nodo de consenso que Z3 envuelve
* [Zaino](/zcash-tech/zaino) — perfil de indexador opcional
* [Nodos completos](/zcash-tech/full-nodes) — Zebra, Zakura y el retirado zcashd
* [Nodos de wallets ligeras](/zcash-tech/lightwallet-nodes) — con qué se comunican los clientes ligeros
* [Zakura Nodo](/zcash-tech/zakura-node) — nodo completo alternativo; no es lo que incluye Z3 actualmente
* [Guía de migración: zcashd a Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet)
* [Recursos para desarrolladores](/start-here/developer-resources)

---

## Recursos

* [Repositorio de Z3](https://github.com/ZcashFoundation/z3)
* [Contrato de Z3 (puertos, volúmenes, nombres de proyectos)](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml)
* [Zebra](https://github.com/ZcashFoundation/zebra) · [El libro de Zebra](https://zebra.zfnd.org/)
* [Zaino](https://github.com/zingolabs/zaino)
* [Zallet](https://github.com/zcash/zallet) · [El libro de Zallet](https://zcash.github.io/zallet/)
* [Zcash Foro comunitario — actualizaciones de Z3](https://forum.zcashcommunity.com/t/zcash-z3-updates-formerly-zcashd-deprecation/48965)
* [Lanzador de Z3](https://github.com/Jubrilabdulazeez/z3-launcher) — plano de control comunitario sobre el stack Compose oficial (Hackathon ZecHub)
