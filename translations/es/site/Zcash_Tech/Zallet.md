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
- Última versión publicada: **v0.1.0-beta.4** (2 de noviembre de 2026). Es posterior a [NU7](NU7.md) y requiere `zebrad` **7.0.0 o posterior**.
- Lee los datos de la red mediante un único backend, **zebra**: `ReadStateService` contra el directorio de estado de un `zebrad` en el mismo host, además del JSON-RPC de Zebra. El backend de Zaino se eliminó en v0.1.0-beta.4.
- Expone un subconjunto de JSON-RPC **compatible con zcashd**. Algunos métodos cambiaron; otros se omitieron deliberadamente.
- El material de claves siempre se cifra con **age**. El historial de transacciones, las direcciones y las claves de visualización permanecen sin cifrar en `wallet.db`.
- Incluye dos binarios en un archivo firmado: `zallet` (iniciador) y `zallet-zebra`. Solo Linux para sincronizar una billetera: todavía no se ejecuta ningún backend de red en macOS ni en Windows.
- `zallet backup` (nuevo en beta.4) toma una instantánea coherente de una billetera en ejecución o detenida.
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

Zallet está dividido en espacios de trabajo de Cargo para que cada backend de red pueda seguir su propio grafo de dependencias. Desde la versión v0.1.0-beta.4, solo se incluye el backend de zebra.

```
zallet            launcher: reads `backend` in zallet.toml (default "zebra")
                  and execs zallet-zebra
zallet-core       shared wallet: CLI, config, JSON-RPC, SQLite DB, sync
zallet-zebra      zebra-state backend (ReadStateService + Zebra JSON-RPC)
```

Ambos binarios abren la misma `wallet.db`. Hasta la versión v0.1.0-beta.3 también había un backend `zallet-zaino`. Si tu `zallet.toml` dice `backend = "zaino"`, cámbialo por `backend = "zebra"`. La base de datos de la billetera no necesita migración, y se puede eliminar la antigua carpeta `zaino` del directorio de datos.

El backend zebra lee directamente la base de datos de estado de `zebrad`, por lo que necesita un `zebrad` compilado con la función `indexer` y su directorio de estado **en el mismo host**. No existe una configuración compatible para que un Zallet en un contenedor se comunique por la red con un `zebrad` en otro, hasta que se incorpore un backend que funcione solo a través de la red ([zallet#900](https://github.com/zcash/zallet/pull/900)).

Implementación típica:

```
zebrad  (or Zakura)
   │  JSON-RPC / ReadStateService
   ▼
Zallet  (zallet-zebra)
   │  JSON-RPC on 127.0.0.1
   ▼
Your application, exchange, faucet, or operator scripts
```

Zallet es una **billetera de nodo completo**: espera un nodo validador local. No es un cliente ligero. Para billeteras ligeras y servidores de bloques compactos, consulta [Zaino](Zaino.md) y [Nodos Lightwallet](Lightwallet_Nodes.md).

El stack de composición Zcash Foundation de [Z3](https://github.com/ZcashFoundation/z3) ejecuta Zebra + Zallet en conjunto, con Zaino independiente opcional para clientes ligeros externos. Sus imágenes fijadas son anteriores a NU7 y a la beta.4 de Zallet: consulta [Stack Z3](Z3_Stack.md) antes de usarlo.

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

Copiar `wallet.db` a mano mientras Zallet está en ejecución no es una copia de seguridad segura: SQLite puede corromperse. Desde v0.1.0-beta.4, usa el comando [`backup`](https://github.com/zcash/zallet/blob/main/book/src/cli/backup.md).

```bash
zallet -d /path/to/zallet/datadir backup /path/to/backups/
```

Escribe una instantánea coherente con las transacciones y con la integridad verificada de una billetera en ejecución o detenida. Si se le proporciona un directorio, asigna al archivo el nombre `zallet-wallet-backup-<UTC time>.db` y nunca sobrescribe un archivo existente. Se detiene y lo informa claramente después de diez minutos si las escrituras constantes en la billetera (por ejemplo, durante la sincronización inicial) hacen que se reinicie la copia repetidamente: vuelve a intentarlo más tarde o detén primero la billetera. La copia de seguridad **no** incluye el archivo de identidad age. Haz una copia de seguridad de ese archivo una vez y guárdala aparte de las copias de seguridad de la base de datos, porque quien tenga ambos puede descifrar las claves.

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

Las rutas oficiales de instalación (paquetes de Debian, Docker, binarios de lanzamiento) están en la [guía de instalación](https://zcash.github.io/zallet/guide/installation/index.html). Los archivos de lanzamiento se llaman `zallet-v<version>-linux-<amd64|arm64>.tar.gz` y contienen `zallet` y `zallet-zebra`. Las imágenes de Docker se publican como `zodlinc/zallet`.

Flujo mínimo para una billetera nueva:

```bash
# data directory; default is $HOME/.zallet
zallet -d /path/to/zallet/datadir example-config > /path/to/zallet/datadir/zallet.toml
# edit zallet.toml: network, indexer.validator_address, [indexer.read_state_service], rpc.bind

zallet -d /path/to/zallet/datadir generate-encryption-identity
zallet -d /path/to/zallet/datadir init-wallet-encryption
zallet -d /path/to/zallet/datadir generate-mnemonic
zallet -d /path/to/zallet/datadir confirm-backup
zallet -d /path/to/zallet/datadir start
```

Apunta `[indexer]` al endpoint JSON-RPC local de `zebrad` con `validator_address`. Es obligatorio y no usa localhost como valor predeterminado. El backend zebra también necesita `[indexer.read_state_service]` y una versión 7.0.0 o posterior de `zebrad`, compilada con la función `indexer`, cuyo directorio de estado esté en el mismo host, para que Zallet pueda leer directamente el estado de la cadena. `indexer.db_path` solo configuraba el backend Zaino, que se eliminó; ahora se ignora y se muestra una advertencia.

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

| | Zallet | zecd | ZODL (Zashi) / Zingo / Zkool | Zebra / Zakura | Zaino |
|--|--------|------|------------------------------|----------------|-------|
| Qué es | Billetera RPC de nodo completo | Servidor de billetera que prioriza el blindado | Billeteras para usuarios finales | Nodo de consenso | Indexador / reemplazo de lightwalletd |
| Reemplaza | Billetera de `zcashd` | No es un clon `zcashd` intercambiable | Aplicaciones móviles/de escritorio | Nodo de `zcashd` | `lightwalletd` |
| Requiere un nodo local | Sí | Sí (Zebra de forma predeterminada) | No (cliente ligero) | Es el nodo | Sí |
| Compatibilidad con RPC de zcashd | Diseñado como vía de compatibilidad | Solo un subconjunto reducido y seleccionado | N/A | Modo de compatibilidad parcial / Zakura | API diferente |
| Modelo de custodia | El operador tiene las claves en `wallet.db` | Servidor recuperable mediante semilla | Claves en el dispositivo del usuario | Sin billetera | Sin claves |

Zallet y **zecd** pueden ubicarse ambos delante de Zebra. Elige Zallet cuando necesites la interfaz de billetera de `z_*` y una ruta de migración desde `wallet.dat`. Elige zecd cuando quieras un servidor centrado en blindados que explícitamente *no* sea un clon de `zcashd`.

Existe un producto de consumo independiente en [zallet.io](https://www.zallet.io/) que reutiliza el nombre. Esa aplicación no es este proyecto.

---

## Páginas relacionadas

- [Nodos completos](Full_Nodes.md) — Zebra, Zakura y el nodo retirado `zcashd`
- [Zebra Nodo completo](Zebra_Full_Node.md) — lecturas del backend predeterminado del nodo Zallet
- [Zakura Nodo](Zakura_Node.md) — nodo validador alternativo
- [Zaino](Zaino.md) — indexador y servidor de cliente ligero (ya no es un backend de Zallet desde beta.4)
- [Pila Z3](Z3_Stack.md) — pila de composición de Zebra + Zallet
- [zecd](ZECD.md) — otro diseño de servidor de billeteras en librustzcash
- [Zcash Sincronización de billeteras](Zcash_Wallet_Syncing.md) — cómo las billeteras blindadas escanean la cadena
- [Claves de visualización](Viewing_Keys.md)

## Recursos

- [El Zallet Libro](https://zcash.github.io/zallet/)
- [zcash/zallet en GitHub](https://github.com/zcash/zallet)
- [Lanzamientos](https://github.com/zcash/zallet/releases) · [registro de cambios de v0.1.0-beta.4](https://github.com/zcash/zallet/blob/v0.1.0-beta.4/CHANGELOG.md)
- [semántica alterada de JSON-RPC](https://zcash.github.io/zallet/zcashd/json_rpc.html)
- [ZecHub guía de migración](/guides/migration-guide-zcashd-to-zebrad-zallet)
- [ZecHub guía de Raspberry Pi (Zebra + Zallet)](/guides/raspberry-pi-4-full-node)
- [Z3 (Zebra + Zallet pila de compose)](https://github.com/ZcashFoundation/z3)
- [Zcash I+D Discord](https://discord.gg/xpzPR53xtU) — `#wallet-dev`
