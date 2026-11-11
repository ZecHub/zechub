<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zallet.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zallet

Zallet es una billetera [wallet] de nodo completo [full-node] Zcash escrita en Rust. Es el reemplazo de la billetera que solía estar integrada en `zcashd`. Después de que `zcashd` alcanzara su detención de fin de soporte el 18 de julio de 2026 a la altura de bloque 3417100, las funciones de consenso y billetera se dividieron: **Zebra** o **Zakura** validan la red [chain], y **Zallet** guarda las claves, escanea notas y expone el JSON-RPC de la billetera.

Zallet se encuentra actualmente en **beta**. No ha sido revisado por completo. Los cambios incompatibles pueden requerir eliminar y volver a crear la billetera. No lo trates como custodia de producción para grandes cantidades de ZEC sin leer las advertencias de seguridad en [El libro de Zallet](https://zcash.github.io/zallet/).

---

## Resumen

- Zallet es una **billetera RPC de nodo completo**, no una billetera móvil ligera ni un nodo de consenso.
- Reemplaza la parte de billetera de `zcashd`. La parte de nodo es [Zebra](Zebra_Full_Node.md) o [Zakura](Zakura_Node.md).
- Está escrito en **Rust**, tiene licencia dual MIT / Apache-2.0 y se mantiene en [zcash/zallet](https://github.com/zcash/zallet).
- La última versión publicada a finales de agosto de 2026: **v0.1.0-beta.3**.
- Se comunica con los datos de la red mediante uno de dos backends: **zebra-state** (`ReadStateService` directo contra un `zebrad` local) o **Zaino**.
- Expone un subconjunto de JSON-RPC **compatible con zcashd**. Algunos métodos cambiaron; otros se omitieron deliberadamente.
- El material de claves siempre se cifra con **age**. El historial de transacciones, las direcciones y las claves de visualización permanecen sin cifrar en `wallet.db`.
- Incluye tres binarios en un archivo firmado: `zallet` (iniciador), `zallet-zebra` y `zallet-zaino`.
- Documentación oficial: [El libro de Zallet](https://zcash.github.io/zallet/).

---

## Por qué existe Zallet

`zcashd` agrupaba un nodo de consenso derivado de Bitcoin Core y una billetera en un solo proceso. Ese diseño ya no existe.

| Función | Pila anterior | Pila actual |
|------|-----------|---------------|
| Consenso / P2P | `zcashd` | Zebra (`zebrad`) o Zakura |
| Billetera / claves / saldos | `zcashd` `wallet.dat` | **Zallet** (`wallet.db`) |
| Indexador de cliente ligero | `lightwalletd` | Zaino o `lightwalletd` |

Separar la billetera del nodo significa:

- El software del nodo puede intercambiarse (Zebra frente a Zakura) sin mover las claves.
- El escaneo de la billetera y la autoridad de gasto residen en un proceso que puede protegerse por separado.
- La semántica RPC puede evolucionar hacia cuentas ZIP 32, direcciones unificadas y PCZT en vez de permanecer congelada en las peculiaridades de `zcashd`.

Zallet es la billetera destinada a operadores que antes ejecutaban `zcashd` como billetera activa, backend de exchange, faucet o billetera de pagos de minado.

---

## Estado

Zallet está en **beta**.

Esto significa en la práctica:

- Los cambios incompatibles pueden llegar en cualquier beta. Quizá debas eliminar el directorio de datos y empezar de nuevo.
- No todos los RPC de billetera de `zcashd` han sido migrados.
- La semántica de algunos métodos migrados difiere de `zcashd`. Las integraciones deben leer la página de [semántica modificada](https://zcash.github.io/zallet/zcashd/json_rpc.html).
- Los crates están en desarrollo y no han sido revisados por completo.
- Zallet **no** es una biblioteca de Rust. No existen garantías si dependes de ella como tal.

Los comentarios se envían a los problemas de [GitHub](https://github.com/zcash/zallet/issues/new) o al canal `#wallet-dev` en el [Zcash de I+D Discord](https://discord.gg/xpzPR53xtU).

Se planea una fase estable posterior una vez que exista la superficie RPC prevista. Entonces se esperará que quienes llamen migren a los métodos de Zallet, incluidas las diferencias semánticas documentadas.

---

## Arquitectura

Zallet está dividido en tres espacios de trabajo de Cargo para que los dos backends de red puedan seguir distintos grafos de dependencias.

```
zallet            launcher: reads `backend` in zallet.toml (default "zebra")
                  and execs zallet-zebra or zallet-zaino
zallet-core       shared wallet: CLI, config, JSON-RPC, SQLite DB, sync
zallet-zebra      zebra-state backend (ReadStateService + Zebra JSON-RPC)
zallet-zaino      Zaino indexer backend
```

Los tres binarios abren la **misma** `wallet.db`. El iniciador elige un backend en tiempo de ejecución; no necesitas recompilar para cambiarlo.

Implementación típica:

```
zebrad  (or Zakura)
   │  JSON-RPC / ReadStateService
   ▼
Zallet  (zallet-zebra or zallet-zaino)
   │  JSON-RPC on 127.0.0.1
   ▼
Your application, exchange, faucet, or operator scripts
```

Zallet es una **billetera de nodo completo**: espera un nodo validador local. No es un cliente ligero. Para billeteras ligeras y servidores de bloques compactos, consulta [Zaino](Zaino.md) y [Nodos Lightwallet](Lightwallet_Nodes.md).

La pila compose [Z3](https://github.com/ZcashFoundation/z3) de Zcash Foundation ejecuta Zebra + Zallet juntos, con Zaino independiente opcional para clientes ligeros externos.

---

## Cuentas, direcciones y claves

Zallet se basa en cuentas ZIP 32, no en la única cuenta implícita de `zcashd`.

- Una billetera puede contener **múltiples mnemónicos BIP 39**. Cada mnemónico es una raíz de gasto independiente, identificada por una **huella digital de semilla** (`zip32seedfp1…`).
- Las **cuentas** se derivan de una semilla con un índice de cuenta ZIP 32. Dentro de una instancia de Zallet también tienen un **UUID** local. La identidad portable de una cuenta es `(seedfp, account index)`.
- Las direcciones son **direcciones unificadas ZIP 316**, producidas con `z_getaddressforaccount`. Una cuenta puede tener muchas direcciones diversificadas; los receptores blindados no pueden vincularse on-chain.
- Las claves de gasto importadas (`z_importkey`) y las direcciones de solo observación (`z_importaddress`) se convierten en cuentas UUID que ningún mnemónico cubre.
- Las claves de visualización pueden exportarse e importarse (`z_exportviewingkey`, `z_importviewingkey`), incluidas las claves de visualización completas unificadas y las claves de visualización entrantes.

`getnewaddress` no está implementado. Usa `z_getnewaccount` y `z_getaddressforaccount`.

Si `keystore.require_backup` está activado (la forma migrada del `walletrequirebackup` de `zcashd`), Zallet se niega a derivar nueva autoridad de gasto de un mnemónico cuya copia de seguridad no haya sido confirmada.

---

## Cifrado y copias de seguridad

El material de claves está **siempre** cifrado. No existe un modo sin cifrado ni un RPC `encryptwallet`; ese método de `zcashd` nunca fue completamente compatible.

- La configuración crea una identidad **age**, cuya ruta predeterminada es `{datadir}/encryption-identity.txt`.
- Los mnemónicos y las claves de gasto importadas se almacenan como textos cifrados age en `wallet.db`.
- El resto de la base de datos **no** está cifrado. El historial, las direcciones y las claves de visualización son legibles si alguien obtiene el archivo.
- La identidad puede envolverse con una frase de contraseña (`generate-encryption-identity -p`). Desbloquéala con el RPC `walletpassphrase`; bloquéala con `walletlock`.
- Perder el archivo de identidad o su frase de contraseña hace que las claves de gasto sean irrecuperables. Haz una copia de seguridad de la identidad, de cada mnemónico y, por separado y cifrada, de cualquier copia de `wallet.db` que conserves.

Copiar `wallet.db` mientras Zallet se está ejecutando no es una copia de seguridad segura. SQLite puede quedar incompleto. Prefiere un proceso detenido o espera un comando oficial de copia de seguridad en línea.

---

## JSON-RPC

Zallet implementa un subconjunto de los RPC de billetera de `zcashd` mediante HTTP con autenticación Basic. Enlázalo a loopback. El uso remoto debe pasar por un túnel cifrado. `rpc.allow_insecure_remote_bind` existe y no es seguro.

Diferencias destacables con respecto a `zcashd`:

- Los campos de saldo de `getwalletinfo` están vacíos. Usa `z_getbalances`, `z_getbalanceforaccount` y `z_gettotalbalance`.
- Las tarifas siguen **ZIP 317**. No hay `settxfee`.
- La construcción de gastos se está trasladando a **PCZT** (transacciones Zcash creadas parcialmente, ZIP 374). Los RPC de PCZT llegaron en la serie beta.
- Un **bloqueo global de sincronización** bloquea los RPC de saldo y gasto mientras la billetera se pone al día o se recupera de una reorganización (`ClientInInitialDownload` / `ForbiddenBySafeMode`).

Los métodos omitidos intencionalmente incluyen `createrawtransaction`, `fundrawtransaction`, `getnewaddress`, `getrawchangeaddress`, `keypoolrefill`, `importwallet` y `encryptwallet`. Los reemplazos se enumeran en el [Libro de Zallet](https://zcash.github.io/zallet/zcashd/json_rpc.html).

---

## Primeros pasos

Las rutas de instalación oficiales (paquetes Debian, Docker, binarios de lanzamiento) están en la [guía de instalación](https://zcash.github.io/zallet/guide/installation/index.html). Los archivos de lanzamiento se denominan `zallet-<version>-<arch>.tar.gz` y contienen los tres binarios.

Flujo mínimo para una billetera nueva:

```bash
# data directory; default is $HOME/.zallet
zallet -d /path/to/zallet/datadir example-config > /path/to/zallet/datadir/zallet.toml
# edit zallet.toml: network, backend, indexer / read-state, rpc.bind

zallet -d /path/to/zallet/datadir generate-encryption-identity
zallet -d /path/to/zallet/datadir init-wallet-encryption
zallet -d /path/to/zallet/datadir generate-mnemonic
zallet -d /path/to/zallet/datadir confirm-backup
zallet -d /path/to/zallet/datadir start
```

Apunta `[indexer]` a un endpoint JSON-RPC local de `zebrad`. El backend zebra también requiere `[indexer.read_state_service]` y un `zebrad` compilado con la función de indexador para que Zallet pueda leer directamente el estado de la red.

Las imágenes reproducibles pueden construirse con [StageX](https://codeberg.org/stagex/stagex/) (Docker 25+, almacén de imágenes containerd, GNU Make).

---

## Migración desde zcashd

Conserva el directorio de datos antiguo de `zcashd` hasta que hayas confirmado los saldos y probado una restauración.

```bash
zallet init-wallet-encryption
zallet migrate-zcash-conf --zcashd-datadir /path/to/zcashd/datadir \
  -o /path/to/zallet/datadir/zallet.toml
zallet migrate-zcashd-wallet --zcashd-datadir /path/to/zcashd/datadir
```

`migrate-zcashd-wallet` solo está disponible en compilaciones con la función `zcashd-import`. Leer `wallet.dat` requiere `db_dump` de **Berkeley DB 6.2**, la versión que usaba `zcashd`.

Notas paso a paso para operadores: [Guía de migración: de zcashd a Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet).

---

## Cómo se relaciona Zallet con otro software

| | Zallet | zecd | Zashi / ZODL / YWallet | Zebra / Zakura | Zaino |
|--|--------|------|------------------------|----------------|-------|
| Qué es | Billetera RPC de nodo completo | Servidor de billetera centrado en blindados | Billeteras para usuarios finales | Nodo de consenso | Reemplazo de indexador / lightwalletd |
| Reemplaza | Billetera de `zcashd` | No es un clon directo de `zcashd` | Aplicaciones móviles/de escritorio | Nodo de `zcashd` | `lightwalletd` |
| Necesita un nodo local | Sí | Sí (Zebra de forma predeterminada) | No (cliente ligero) | *Es* el nodo | Sí |
| Compatibilidad RPC de zcashd | Diseñada como la ruta de compatibilidad | Solo un pequeño subconjunto seleccionado | N/A | Modo de compatibilidad parcial / Zakura | API diferente |
| Modelo de custodia | El operador guarda las claves en `wallet.db` | Servidor recuperable mediante semilla | Claves en el dispositivo del usuario | Sin billetera | Sin claves |

Zallet y **zecd** pueden ubicarse ambos delante de Zebra. Elige Zallet cuando necesites la interfaz de billetera de `z_*` y una ruta de migración desde `wallet.dat`. Elige zecd cuando quieras un servidor centrado en blindados que explícitamente *no* sea un clon de `zcashd`.

Existe un producto de consumo independiente en [zallet.io](https://www.zallet.io/) que reutiliza el nombre. Esa aplicación no es este proyecto.

---

## Páginas relacionadas

- [Nodos completos](Full_Nodes.md) — Zebra, Zakura y el nodo `zcashd` retirado
- [Nodo completo Zebra](Zebra_Full_Node.md) — el nodo que lee el backend predeterminado de Zallet
- [Nodo Zakura](Zakura_Node.md) — nodo validador alternativo
- [Zaino](Zaino.md) — backend de indexador y servidor de cliente ligero
- [zecd](ZECD.md) — otro diseño de servidor de billetera sobre librustzcash
- [Sincronización de billeteras Zcash](Zcash_Wallet_Syncing.md) — cómo las billeteras blindadas escanean la red
- [Claves de visualización](Viewing_Keys.md)

## Recursos

- [El libro de Zallet](https://zcash.github.io/zallet/)
- [zcash/zallet en GitHub](https://github.com/zcash/zallet)
- [Lanzamientos](https://github.com/zcash/zallet/releases)
- [Semántica JSON-RPC modificada](https://zcash.github.io/zallet/zcashd/json_rpc.html)
- [Guía de migración de ZecHub](/guides/migration-guide-zcashd-to-zebrad-zallet)
- [Guía para Raspberry Pi de ZecHub (Zebra + Zallet)](/guides/raspberry-pi-4-full-node)
- [Z3 (pila compose de Zebra + Zallet)](https://github.com/ZcashFoundation/z3)
- [Zcash de I+D Discord](https://discord.gg/xpzPR53xtU) — `#wallet-dev`
