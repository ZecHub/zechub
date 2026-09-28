<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zallet.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zallet

Zallet es una wallet Zcash de nodo completo escrita en Rust. Es el reemplazo de la wallet que antes estaba integrada en `zcashd`. Después de que `zcashd` alcanzara su parada de fin de soporte el 18 de julio de 2026, en la altura de bloque 3417100, las funciones de consenso y wallet se separaron: **Zebra** o **Zakura** validan la cadena, y **Zallet** guarda las claves, escanea notas y expone el JSON-RPC de la wallet.

Zallet se encuentra actualmente en **beta**. No ha sido revisado por completo. Los cambios incompatibles podrían requerir eliminar y recrear la wallet. No lo consideres custodia de producción para grandes cantidades de ZEC sin leer las advertencias de seguridad en [El libro de Zallet](https://zcash.github.io/zallet/).

---

## En resumen

- Zallet es una **wallet RPC de nodo completo**, no una wallet móvil ligera ni un nodo de consenso.
- Reemplaza la parte de wallet de `zcashd`. La parte de nodo es [Zebra](Zebra_Full_Node.md) o [Zakura](Zakura_Node.md).
- Escrito en **Rust**, con doble licencia MIT / Apache-2.0, mantenido en [zcash/zallet](https://github.com/zcash/zallet).
- Última versión publicada a finales de agosto de 2026: **v0.1.0-beta.3**.
- Se comunica con los datos de la cadena mediante uno de dos backends: **zebra-state** (`ReadStateService` directo contra un `zebrad` local) o **Zaino**.
- Expone un subconjunto JSON-RPC compatible con **zcashd**. Algunos métodos cambiaron; otros se omitieron intencionalmente.
- El material de claves siempre se cifra con **age**. El historial de transacciones, las direcciones y las claves de visualización permanecen sin cifrar en `wallet.db`.
- Incluye tres binarios en un archivo firmado: `zallet` (iniciador), `zallet-zebra` y `zallet-zaino`.
- Documentación oficial: [El libro de Zallet](https://zcash.github.io/zallet/).

---

## Por qué existe Zallet

`zcashd` agrupaba un nodo de consenso derivado de Bitcoin Core y una wallet en un solo proceso. Ese diseño ya no existe.

| Función | Pila anterior | Pila actual |
|------|-----------|---------------|
| Consenso / P2P | `zcashd` | Zebra (`zebrad`) o Zakura |
| Wallet / claves / saldos | `zcashd` `wallet.dat` | **Zallet** (`wallet.db`) |
| Indexador de cliente ligero | `lightwalletd` | Zaino o `lightwalletd` |

Separar la wallet del nodo significa:

- El software del nodo se puede intercambiar (Zebra frente a Zakura) sin mover las claves.
- El escaneo de la wallet y la autoridad de gasto residen en un proceso que puede protegerse por separado.
- La semántica de RPC puede evolucionar hacia cuentas ZIP 32, Unified Addresses y PCZTs, en lugar de permanecer congelada en las particularidades de `zcashd`.

Zallet es la wallet destinada a operadores que anteriormente ejecutaban `zcashd` como wallet caliente, backend de exchange, faucet o wallet para pagos de minería.

---

## Estado

Zallet está en **beta**.

Lo que eso significa en la práctica:

- Pueden llegar cambios incompatibles en cualquier beta. Quizás tengas que eliminar el directorio de datos y empezar de nuevo.
- No todas las RPC de wallet de `zcashd` se han migrado.
- La semántica de algunos métodos migrados difiere de `zcashd`. Las integraciones deben leer la página [de semántica modificada](https://zcash.github.io/zallet/zcashd/json_rpc.html).
- Los crates están en desarrollo y no han sido revisados por completo.
- Zallet **no** es una biblioteca de Rust. No hay garantías si dependes de él como si lo fuera.

Los comentarios se envían a las [issues de GitHub](https://github.com/zcash/zallet/issues/new) o al canal `#wallet-dev` en el [Discord de I+D de Zcash](https://discord.gg/xpzPR53xtU).

Se prevé una fase estable posterior cuando exista la superficie RPC prevista. Entonces se esperará que quienes llamen migren a los métodos de Zallet, incluidas las diferencias semánticas documentadas.

---

## Arquitectura

Zallet se divide en tres espacios de trabajo Cargo para que los dos backends de cadena puedan seguir distintos grafos de dependencias.

```
zallet            launcher: reads `backend` in zallet.toml (default "zebra")
                  and execs zallet-zebra or zallet-zaino
zallet-core       shared wallet: CLI, config, JSON-RPC, SQLite DB, sync
zallet-zebra      zebra-state backend (ReadStateService + Zebra JSON-RPC)
zallet-zaino      Zaino indexer backend
```

Los tres binarios abren la **misma** `wallet.db`. El iniciador elige un backend en tiempo de ejecución; no necesitas recompilar para cambiarlo.

Despliegue típico:

```
zebrad  (or Zakura)
   │  JSON-RPC / ReadStateService
   ▼
Zallet  (zallet-zebra or zallet-zaino)
   │  JSON-RPC on 127.0.0.1
   ▼
Your application, exchange, faucet, or operator scripts
```

Zallet es una **wallet de nodo completo**: espera un nodo validador local. No es un cliente ligero. Para wallets ligeras y servidores de bloques compactos, consulta [Zaino](Zaino.md) y [Nodos Lightwallet](Lightwallet_Nodes.md).

La pila compose Zcash Foundation de [Z3](https://github.com/ZcashFoundation/z3) ejecuta Zebra + Zallet juntos, con Zaino independiente opcional para clientes ligeros externos.

---

## Cuentas, direcciones y claves

Zallet está construido en torno a cuentas ZIP 32, no a la única cuenta implícita de `zcashd`.

- Una wallet puede contener **múltiples mnemónicos BIP 39**. Cada mnemónico es una raíz de gasto independiente, identificada por una **huella digital de semilla** (`zip32seedfp1…`).
- Las **cuentas** se derivan de una semilla con un índice de cuenta ZIP 32. Dentro de una instancia de Zallet también tienen un **UUID** local. La identidad portátil de una cuenta es `(seedfp, account index)`.
- Las direcciones son **Unified Addresses ZIP 316**, producidas con `z_getaddressforaccount`. Una cuenta puede tener muchas direcciones diversificadas; los receptores blindados no pueden vincularse en la cadena.
- Las claves de gasto importadas (`z_importkey`) y las direcciones de solo visualización (`z_importaddress`) se convierten en cuentas UUID que ningún mnemónico cubre.
- Las claves de visualización se pueden exportar e importar (`z_exportviewingkey`, `z_importviewingkey`), incluidas las claves de visualización completas unificadas y las claves de visualización entrantes.

`getnewaddress` no está implementado. Usa `z_getnewaccount` y `z_getaddressforaccount`.

Si `keystore.require_backup` está activado (la forma migrada de `zcashd` de `walletrequirebackup`), Zallet se niega a derivar nueva autoridad de gasto de un mnemónico cuya copia de seguridad no se haya confirmado.

---

## Cifrado y copias de seguridad

El material de claves está **siempre** cifrado. No existe modo sin cifrar ni RPC `encryptwallet`; ese método de `zcashd` nunca fue totalmente compatible.

- La configuración crea una identidad **age**, con ruta predeterminada `{datadir}/encryption-identity.txt`.
- Los mnemónicos y las claves de gasto importadas se almacenan como textos cifrados age en `wallet.db`.
- El resto de la base de datos **no** está cifrado. El historial, las direcciones y las claves de visualización son legibles si alguien obtiene el archivo.
- La identidad se puede proteger con una frase de contraseña (`generate-encryption-identity -p`). Desbloquéala con la RPC `walletpassphrase`; bloquéala con `walletlock`.
- Perder el archivo de identidad o su frase de contraseña hace que las claves de gasto sean irrecuperables. Haz una copia de seguridad de la identidad, de cada mnemónico y, por separado y cifrada, de cualquier copia de `wallet.db` que conserves.

Copiar `wallet.db` mientras Zallet está ejecutándose no es una copia de seguridad segura. SQLite puede quedar incompleto. Prefiere un proceso detenido o espera un comando oficial de copia de seguridad en línea.

---

## JSON-RPC

Zallet implementa un subconjunto de las RPC de wallet de `zcashd` mediante HTTP con autenticación Basic. Enlázalo a loopback. El uso remoto debe realizarse mediante un túnel cifrado. `rpc.allow_insecure_remote_bind` existe y no es seguro.

Diferencias destacables respecto a `zcashd`:

- Los campos de saldo en `getwalletinfo` están vacíos. Usa `z_getbalances`, `z_getbalanceforaccount`, `z_gettotalbalance`.
- Las comisiones siguen **ZIP 317**. No existe `settxfee`.
- La construcción de gastos está migrando a **PCZTs** (transacciones Zcash creadas parcialmente, ZIP 374). Las RPC de PCZT llegaron en la serie beta.
- Un **bloqueo global de sincronización** bloquea las RPC de saldo y gasto mientras la wallet se pone al día o se recupera de una reorganización (`ClientInInitialDownload` / `ForbiddenBySafeMode`).

Los métodos omitidos intencionalmente incluyen `createrawtransaction`, `fundrawtransaction`, `getnewaddress`, `getrawchangeaddress`, `keypoolrefill`, `importwallet` y `encryptwallet`. Los reemplazos se enumeran en [El libro de Zallet](https://zcash.github.io/zallet/zcashd/json_rpc.html).

---

## Primeros pasos

Las rutas de instalación oficiales (paquetes Debian, Docker, binarios de lanzamiento) se encuentran en la [guía de instalación](https://zcash.github.io/zallet/guide/installation/index.html). Los archivos de lanzamiento se llaman `zallet-<version>-<arch>.tar.gz` y contienen los tres binarios.

Flujo mínimo para una nueva wallet:

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

Apunta `[indexer]` a un endpoint JSON-RPC local de `zebrad`. El backend zebra también necesita `[indexer.read_state_service]` y un `zebrad` compilado con la función de indexador para que Zallet pueda leer directamente el estado de la cadena.

Las imágenes reproducibles se pueden compilar con [StageX](https://codeberg.org/stagex/stagex/) (Docker 25+, almacén de imágenes containerd, GNU Make).

---

## Migración desde zcashd

Conserva el directorio de datos antiguo de `zcashd` hasta que hayas confirmado los saldos y probado una restauración.

```bash
zallet init-wallet-encryption
zallet migrate-zcash-conf --zcashd-datadir /path/to/zcashd/datadir \
  -o /path/to/zallet/datadir/zallet.toml
zallet migrate-zcashd-wallet --zcashd-datadir /path/to/zcashd/datadir
```

`migrate-zcashd-wallet` solo está en compilaciones con la función `zcashd-import`. Leer `wallet.dat` requiere `db_dump` de **Berkeley DB 6.2**, la versión que usaba `zcashd`.

Notas paso a paso para operadores: [Guía de migración: zcashd a Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet).

---

## Cómo se relaciona Zallet con otro software

| | Zallet | zecd | Zashi / ZODL / YWallet | Zebra / Zakura | Zaino |
|--|--------|------|------------------------|----------------|-------|
| Qué es | Wallet RPC de nodo completo | Servidor de wallet centrado en blindados | Wallets para usuarios finales | Nodo de consenso | Indexador / reemplazo de lightwalletd |
| Reemplaza | Wallet de `zcashd` | No es un clon directo de `zcashd` | Aplicaciones móviles/de escritorio | Nodo de `zcashd` | `lightwalletd` |
| Necesita un nodo local | Sí | Sí (Zebra de forma predeterminada) | No (cliente ligero) | *Es* el nodo | Sí |
| Compatibilidad RPC de zcashd | Diseñado como ruta de compatibilidad | Solo un pequeño subconjunto seleccionado | N/A | Modo de compatibilidad parcial / Zakura | API diferente |
| Modelo de custodia | El operador guarda las claves en `wallet.db` | Servidor recuperable mediante semilla | Claves en el dispositivo del usuario | Sin wallet | Sin claves |

Zallet y **zecd** pueden ambos situarse delante de Zebra. Elige Zallet cuando necesites la superficie de wallet de `z_*` y una ruta de migración desde `wallet.dat`. Elige zecd cuando quieras un servidor centrado en blindados que explícitamente *no* sea un clon de `zcashd`.

Hay un producto de consumo independiente en [zallet.io](https://www.zallet.io/) que reutiliza el nombre. Esa aplicación no es este proyecto.

---

## Páginas relacionadas

- [Nodos completos](Full_Nodes.md) — Zebra, Zakura y el nodo retirado `zcashd`
- [Nodo completo de Zebra](Zebra_Full_Node.md) — el nodo que lee el backend predeterminado de Zallet
- [Nodo Zakura](Zakura_Node.md) — nodo validador alternativo
- [Zaino](Zaino.md) — backend de indexador y servidor de cliente ligero
- [ZECD](ZECD.md) — otro diseño de servidor de wallet sobre librustzcash
- [Sincronización de wallets Zcash](Zcash_Wallet_Syncing.md) — cómo las wallets blindadas escanean la cadena
- [Claves de visualización](Viewing_Keys.md)

## Recursos

- [El libro de Zallet](https://zcash.github.io/zallet/)
- [zcash/zallet en GitHub](https://github.com/zcash/zallet)
- [Lanzamientos](https://github.com/zcash/zallet/releases)
- [Semántica JSON-RPC modificada](https://zcash.github.io/zallet/zcashd/json_rpc.html)
- [Guía de migración de ZecHub](/guides/migration-guide-zcashd-to-zebrad-zallet)
- [Guía para Raspberry Pi de ZecHub (Zebra + Zallet)](/guides/raspberry-pi-4-full-node)
- [Z3 (pila compose de Zebra + Zallet)](https://github.com/ZcashFoundation/z3)
- [Discord de I+D de Zcash](https://discord.gg/xpzPR53xtU) — `#wallet-dev`
