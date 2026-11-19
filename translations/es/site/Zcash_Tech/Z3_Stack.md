<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Z3_Stack.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# Z3 Stack

**Z3 Stack** es la plataforma de nodos empaquetada de Zcash Foundation: **Zebra** (nodo completo) + **Zallet** (billetera de nodo completo), con un indexador opcional **Zaino**. Está pensado para reemplazar un proceso independiente de `zcashd`, que incluía el consenso y una billetera en un solo binario y llegó al final de su vida útil el 18 de julio de 2026.

La implementación de referencia es el proyecto Compose de Docker en [github.com/ZcashFoundation/z3](https://github.com/ZcashFoundation/z3).

> **Estado al 14 de noviembre de 2026: las versiones fijadas por defecto son anteriores a NU7.** La `docker-compose.yml` de Z3 se modificó por última vez el 10 de agosto de 2026. Sigue fijando `zfnd/zebra:6.2.3` y `zodlinc/zallet:v0.1.0-beta.1`, que se iniciaron como el binario `zallet-zaino`. [NU7](NU7.md) se activó en Mainnet en el bloque 3,543,405 el 6 de noviembre de 2026, y solo Zebra 7.0.0 o posterior lo sigue: un Zebra 6.x se mantiene con las reglas antiguas y se queda fuera de la red real. Zallet v0.1.0-beta.4, la primera versión que sigue NU7, ya no incluye `zallet-zaino`. Comprueba el repositorio para ver si hay versiones fijadas más recientes antes de desplegar. Si sustituyes las imágenes por tu cuenta, ten en cuenta que el backend `zebra` restante de Zallet lee directamente el directorio de estado de Zebra, así que Zallet debe ejecutarse en el mismo host y tener acceso a ese directorio ([Zallet](Zallet.md)).

---

## Resumen

* Z3 **no es un nuevo cliente de consenso**. Es la forma de ejecutar juntos los componentes de la stack posterior a `zcashd`: Zebra valida la red, Zallet guarda las claves y ofrece RPC de billetera, y Zaino (opcional) usa el protocolo gRPC de lightwalletd.
* `zcashd` agrupaba el nodo y la billetera. Z3 **separa esas funciones**. Los exchanges, los pools de minado y otros operadores de billeteras de nodo completo migran a esta combinación en lugar de usar solo Zebra.
* Tres proyectos Compose aislados pueden ejecutarse en un mismo host: **mainnet**, **testnet** y **regtest**.
* La primera sincronización de Mainnet tarda aproximadamente **24–72 horas** y ocupa unos **300 GB**. Regtest se inicia en segundos y es el entorno indicado para aprender a usar la stack.
* En la imagen fijada de Z3, Zallet ejecuta su backend `zallet-zaino` (las bibliotecas de indexación de Zaino) y se comunica con Zebra mediante JSON-RPC. Zallet eliminó ese backend en la versión v0.1.0-beta.4; las versiones actuales de Zallet leen directamente el estado de Zebra. El servicio independiente Zaino solo se necesita si quieres un endpoint compatible con lightwalletd para billeteras externas.
* Zallet está en **beta**. Los cambios incompatibles pueden requerir eliminar y recrear la billetera. No lo consideres software de custodia terminado para guardar grandes cantidades.

---

## Por qué existe Z3

Durante la mayor parte de la vida de Zcash, `zcashd` fue tanto el nodo completo de referencia como la única billetera de nodo completo para producción. Exchanges, pools y custodios integraron sus sistemas con ese diseño.

`zcashd` está retirado. El consenso pasó a [Zebra](/zcash-tech/zebra-full-node) (y ahora también a [Zakura](/zcash-tech/zakura-node)). La billetera integrada pasó a [Zallet](https://github.com/zcash/zallet). El servicio para billeteras ligeras está pasando de [lightwalletd](/zcash-tech/lightwallet-nodes) a [Zaino](/zcash-tech/zaino).

Esos tres componentes están en repositorios, ciclos de versiones y configuraciones distintos. Z3 los conecta: imágenes fijadas, comprobaciones de estado que mantienen la billetera detenida hasta que el nodo se sincroniza, puertos y volúmenes por red, y un procedimiento documentado para operadores.

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
| **Zebra** | Sincroniza y valida la red, propaga mensajes entre pares, ofrece JSON-RPC y un endpoint de estado | Sí |
| **Zallet** | Billetera de nodo completo. La imagen beta.1 fijada ejecuta el backend de biblioteca Zaino (`zallet-zaino`, eliminado en Zallet beta.4) y se conecta directamente al JSON-RPC de Zebra. **No** llama al contenedor independiente Zaino | Sí |
| **Zaino** | Indexador independiente. gRPC compatible con lightwalletd para clientes ligeros externos, además de un proxy JSON-RPC para exploradores y faucets | No — `--profile indexer` |

Z3 fija las versiones de las imágenes en `docker-compose.yml`. Sustitúyelas con `Z3_ZEBRA_IMAGE`, `Z3_ZAINO_IMAGE` o `Z3_ZALLET_IMAGE` si necesitas otra etiqueta.

---

## En qué se diferencia de zcashd

| | zcashd | Z3 |
| --- | --- | --- |
| Lenguaje | C++ (bifurcación de Bitcoin) | Servicios Rust, orquestados con Compose de Docker |
| Modelo de procesos | Un binario: nodo + billetera | Contenedores independientes para el nodo y la billetera |
| Consenso | Retirado (fin del soporte el 18 de julio de 2026) | Zebra (u otro nodo compatible) |
| Billetera | `wallet.dat` integrada | Zallet, directorio de datos cifrado con age |
| Clientes ligeros | Por lo general, un lightwalletd independiente | Perfil Zaino opcional |
| Configuración | `zcash.conf` | Archivos por red en `config/<network>/` y archivos de entorno de Compose |
| Redes en un mismo host | Conflictos de puertos difíciles de resolver | Compatibilidad integrada: `z3-mainnet`, `z3-testnet`, `z3-regtest` |

Si todavía tienes una billetera `zcashd`, sigue la [guía de migración](/guides/migration-guide-zcashd-to-zebrad-zallet) de ZecHub y el comando `migrate-zcashd-wallet` de Zallet, en lugar de copiar `wallet.dat` al volumen de Z3.

---

## Redes

Z3 consta de tres proyectos Compose independientes. No comparten puertos ni volúmenes.

| Red | Nombre del proyecto | Uso | Primera sincronización | Fondos reales |
| --- | --- | --- | --- | --- |
| **mainnet** | `z3-mainnet` | Producción | 24–72 horas | Sí |
| **testnet** | `z3-testnet` | Entorno de pruebas en la red pública de pruebas | 2–12 horas | No (ZEC de prueba) |
| **regtest** | `z3-regtest` | Práctica local: bloques instantáneos, sin pares | Segundos | No |

Los operadores nuevos deberían empezar en **regtest**, confirmar el funcionamiento de RPC y de la billetera, y luego pasar a testnet o mainnet.

---

## Puertos predeterminados del host

Las tres redes están pensadas para coexistir en una misma máquina. Los valores siguientes son los predeterminados publicados; todos se pueden cambiar mediante la variable de entorno `Z3_*` correspondiente. La tabla canónica está en [`z3-contract.yaml`](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml).

| Servicio | Mainnet | Testnet | Regtest |
| --- | --- | --- | --- |
| JSON-RPC de Zebra | 8232 | 18232 | 29232 |
| P2P de Zebra | 8233 | 18233 | (no publicado) |
| Estado de Zebra (`/ready`) | 8080 | 18080 | 28080 |
| gRPC de Zaino (perfil de indexador) | 8137 | 18137 | 28137 |
| JSON-RPC de Zaino (perfil de indexador) | 8237 | 18237 | 28237 |
| RPC de Zallet | 28232 | 40232 | 50232 |

Dentro de la red Compose, los servicios se encuentran por nombre (`zebra`, `zaino`, `zallet`).

---

## Datos y copias de seguridad

| Volumen | Contenido | ¿Hacer una copia de seguridad? |
| --- | --- | --- |
| `z3-<network>-chain` | Estado de la red Zebra (~300 GB en mainnet) | Opcional: se puede volver a sincronizar |
| `z3-<network>-zallet` | Base de datos cifrada de la billetera **y** la identidad age que la desbloquea | **Sí: este es el único volumen del que se debe hacer una copia de seguridad** |
| `z3-<network>-zaino` | Estado del indexador (solo con el perfil de indexador) | Opcional: se puede reconstruir |
| `z3-<network>-cookie` | Cookie RPC de Zebra | No: se vuelve a generar |

Para guardar el estado de la red en otro disco antes del primer inicio:

```bash
export Z3_CHAIN_DATA_PATH=/mnt/ssd/zebra-state
./scripts/fix-permissions.sh zebra /mnt/ssd/zebra-state
```

`docker compose --env-file .env.<network> --profile "*" down` detiene la stack y conserva los volúmenes. Añadir `-v` los elimina y obliga a realizar una sincronización completa. Incluye `--profile "*"` para que los servicios condicionados por perfiles (indexador, monitoreo) también se detengan.

---

## Primeros pasos

Requisitos previos: Docker Engine, Compose de Docker v2.24.4+, Git. `openssl` solo es necesario para regtest.

### Regtest (la forma más rápida de ver la stack)

```bash
git clone https://github.com/ZcashFoundation/z3 && cd z3
./scripts/regtest-init.sh
docker compose --env-file .env.regtest up -d
```

Consulta [docs/regtest.md](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md) para ver los comandos de prueba.

### Mainnet (inicio en 2 fases)

Zebra debe terminar de sincronizarse antes de que Zallet sea útil. Si inicias Zallet demasiado pronto, entrará en un ciclo de reinicios hasta que se cumpla `/ready`.

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

Testnet sigue el mismo procedimiento con `.env.testnet` y `./scripts/check-zebra-readiness.sh 18080`.

Los cambios en `config/<network>/` se mantienen localmente y persisten tras `git pull`.

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

* **Imágenes fijadas.** Z3 no pasa silenciosamente a `:latest`. Actualiza una versión fijada mediante un cambio revisado o establece `Z3_<SERVICE>_IMAGE`. Las versiones fijadas no han cambiado desde agosto de 2026, por lo que son anteriores a NU7 (consulta la nota de estado al principio).
* **Contenedores sin privilegios de root.** Se eliminan las capacidades de Linux. Las comprobaciones de estado mantienen detenida la billetera hasta que Zebra esté listo. La política de reinicio está activada de forma predeterminada.
* **Registros.** Z3 no fija un controlador de registro. Establece límites de tamaño en la configuración del daemon de Docker, o los registros crecerán sin límite en un nodo que funciona las 24 horas del día, los 7 días de la semana.
* **P2P.** Mainnet y testnet publican el puerto P2P de Zebra. Si estás detrás de un NAT, establece `ZEBRA_NETWORK__EXTERNAL_ADDR` con la dirección a la que deben conectarse los pares. Regtest no tiene pares.
* **Zaino en ARM.** La imagen de Zaino es solo `linux/amd64`. En Apple Silicon se ejecuta mediante emulación, a menos que la compiles desde el código fuente. Zebra y Zallet admiten varias arquitecturas.
* **Hosts compartidos.** No se establecen límites de CPU ni de memoria de forma predeterminada. Añade `deploy.resources.limits` en un archivo de configuración adicional si la máquina no está dedicada al nodo.

Lista de verificación para producción y preguntas frecuentes: [docs/faq.md](https://github.com/ZcashFoundation/z3/blob/main/docs/faq.md), [docs/docker-architecture.md](https://github.com/ZcashFoundation/z3/blob/main/docs/docker-architecture.md).

---

## Para quién es Z3

**Buena opción**

* Exchanges, custodios y pools de minado que usaban `zcashd` como nodo y billetera
* Operadores que quieren una RPC de billetera de nodo completo compatible con una Zebra sincronizada
* Desarrolladores que necesitan usar mainnet, testnet y regtest al mismo tiempo
* Cualquiera que ponga en marcha un endpoint privado compatible con lightwalletd mediante el perfil Zaino

**Por lo general, no es la herramienta adecuada**

* Usuarios finales que solo necesitan enviar y recibir ZEC: pueden usar una billetera ligera como ZODL / Zashi, Zingo o Zkool (la sucesora mantenida de YWallet)
* Personas que solo quieren validar la red: pueden ejecutar solo Zebra (o Zakura)
* Personas que solo quieren servir bloques compactos: pueden ejecutar Zebra + Zaino, o Zebra + lightwalletd, sin Zallet

---

## Páginas relacionadas

* [Zebra Nodo completo](/zcash-tech/zebra-full-node) — el nodo de consenso que Z3 integra
* [Zaino](/zcash-tech/zaino) — perfil de indexador opcional
* [Nodos completos](/zcash-tech/full-nodes) — Zebra, Zakura y el retirado zcashd
* [Nodos para billeteras ligeras](/zcash-tech/lightwallet-nodes) — con qué se comunican los clientes ligeros
* [Zakura Nodo](/zcash-tech/zakura-node) — nodo completo alternativo; no es el que Z3 incluye actualmente
* [Guía de migración: de zcashd a Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet)
* [Recursos para desarrolladores](/start-here/developer-resources)

---

## Recursos

* [Repositorio de Z3](https://github.com/ZcashFoundation/z3)
* [Contrato de Z3 (puertos, volúmenes, nombres de proyecto)](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml)
* [Zebra](https://github.com/ZcashFoundation/zebra) · [El libro de Zebra](https://zebra.zfnd.org/)
* [Zaino](https://github.com/zingolabs/zaino)
* [Zallet](https://github.com/zcash/zallet) · [El libro de Zallet](https://zcash.github.io/zallet/)
* [Zcash Foro de la comunidad — novedades de Z3](https://forum.zcashcommunity.com/t/zcash-z3-updates-formerly-zcashd-deprecation/48965)
* [Lanzador de Z3](https://github.com/Jubrilabdulazeez/z3-launcher) — plano de control comunitario sobre la stack Compose oficial (ZecHub Hackathon)
