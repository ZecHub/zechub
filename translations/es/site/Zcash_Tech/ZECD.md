<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/ZECD.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# zecd — Servidor de billetera [wallet] con blindaje [shielded] primero

zecd es un servidor de billetera con blindaje primero para Zcash, construido sobre [librustzcash](https://github.com/zcash/librustzcash) y expuesto mediante el dialecto JSON-RPC de Bitcoin Core. Ofrece a desarrolladores [developers] e integradores de pagos [payment] una API familiar y compatible con Bitcoin para interactuar con Zcash, mientras hace que Orchard (el pool más privado) sea el predeterminado. Desarrollado por [zec.rocks](https://zec.rocks), zecd está diseñado para reemplazar la funcionalidad de billetera de `zcashd` en implementaciones modernas nativas de la nube.

**Versión actual:** 0.5.0-rc3 (13 de julio de 2026) — con soporte para Ironwood (NU6.3). Instálalo mediante `cargo install zecd` o utiliza la imagen oficial de Docker.

---

## En resumen

- zecd es un **daemon de billetera (servidor)**, no un nodo completo [full node]. Gestiona claves, escaneo, pruebas y RPC sin comunicarse mediante el protocolo P2P de Zcash.
- Habla el **dialecto JSON-RPC de Bitcoin Core**: mismos nombres de métodos, estructuras de campos, autenticación y códigos de error; muchos clientes RPC de Bitcoin funcionan con Zcash de inmediato.
- Las direcciones **Orchard (blindadas)** son las predeterminadas; el soporte para pools transparentes (dirección t) y Sapling requiere activación explícita para cada billetera.
- Se conecta a un **nodo completo de [Zebra](Zebra_Full_Node.md) autoalojado** mediante JSON-RPC local; no se necesita lightwalletd.
- **Sin estado por diseño**: toda la billetera se puede recuperar únicamente a partir de la frase semilla [seed phrase], lo que hace que el directorio de datos sea desechable.
- **No es un reemplazo directo de zcashd**: implementa solo un subconjunto de los métodos RPC de Zcash, con diferencias de diseño intencionales para privacidad [privacy] y seguridad.
- Las tarifas [fees] siguen ZIP-317 (cálculo determinista de tarifas); se rechazan las tarifas especificadas por el usuario.
- Admite **memos blindados (ZIP-302)** mediante la conocida superficie RPC de Bitcoin.

---

## ¿Qué problema resuelve zecd?

`zcashd` era el nodo y la billetera originales combinados de Zcash, bifurcados de la base de código C++ de Bitcoin en 2016. Con el tiempo, esto generó fricción: el código es difícil de mantener, la billetera está estrechamente acoplada al nodo y las direcciones transparentes se presentan como opciones de primera clase junto a las blindadas.

zecd separa la responsabilidad de la billetera del consenso [consensus]. Es una **capa de billetera dedicada** situada entre las aplicaciones y un nodo completo de Zebra, que proporciona:

- Una implementación limpia y moderna de Rust construida sobre librustzcash (la misma biblioteca que impulsa Zodl y Zingo)
- Diseño de privacidad de forma predeterminada (direcciones Orchard salvo que se configure de otro modo)
- Una interfaz RPC compatible con Bitcoin que elimina la necesidad de aprender herramientas específicas de Zcash
- Arquitectura sin estado, recuperable mediante semilla, adecuada para implementaciones en contenedores y en la nube

---

## Arquitectura

zecd funciona en un modelo de tres niveles:

```
Your app / Bitcoin RPC client
        ↓  JSON-RPC
       zecd
   (keys, scanning, proving, RPC)
        ↓  JSON-RPC (local only)
       Zebra
   (full node — consensus, mempool, chain data)
```

zecd se comunica con Zebra **exclusivamente mediante JSON-RPC local**: sin redes peer-to-peer, sin indexadores de terceros y sin lightwalletd. La conexión de Zebra es deliberadamente solo local: zecd se negará a enviar credenciales a un host enrutable globalmente, a menos que se configure explícitamente para un túnel seguro fuera de banda (por ejemplo, WireGuard o SSH).

---

## Características principales

### Blindado primero, Orchard de forma predeterminada

zecd utiliza direcciones unificadas Orchard como tipo de dirección predeterminado. Los pools Sapling y transparentes (dirección t) requieren configuración explícita por billetera. Este diseño reduce el riesgo de envíos transparentes accidentales, un problema común de privacidad en herramientas antiguas de Zcash.

La política de privacidad es configurable por llamada o globalmente en `[spend] privacy_policy`:

| Política | Comportamiento |
|--------|----------|
| `AllowRevealedRecipients` (predeterminada) | Permite envíos a destinatarios transparentes; revela el importe y el destinatario on-chain |
| `AllowRevealedAmounts` | Permite envíos entre pools (Sapling↔Orchard), pero rechaza destinatarios transparentes |
| `FullPrivacy` | Solo envíos totalmente blindados dentro de un pool; rechaza destinatarios transparentes y entre pools |
| `AllowFullyTransparent` | También permite envíos t→t financiados desde UTXO transparentes |

### Compatibilidad con RPC de Bitcoin Core

zecd implementa el dialecto JSON-RPC de Bitcoin Core con conformidad en:

- Nombres de métodos (por ejemplo, `getblockchaininfo`, `getbalance`, `getnewaddress`, `listtransactions`, `sendtoaddress`, `sendmany`)
- Nombres y tipos de campos en las respuestas
- Estructura de envoltorio JSON-RPC 1.0
- Autenticación básica, entradas `rpcauth` y autenticación mediante archivo cookie
- Códigos de error y asignación de estados HTTP (HTTP 500 con cuerpo de error, semántica 401)

Esto significa que muchas bibliotecas de pagos de Bitcoin, integraciones de exchanges y herramientas de monitorización existentes pueden interactuar con Zcash mediante zecd con pocos o ningún cambio de código.

La suite de conformidad (más de 140 comprobaciones) se ejecuta en cada PR contra un daemon regtest activo y también se validó frente a la testnet pública.

### Memos blindados (ZIP-302)

zecd expone la característica de memo blindado de Zcash mediante la conocida superficie RPC de Bitcoin, algo no disponible en las herramientas estándar de Bitcoin:

- `sendtoaddress` acepta un memo hexadecimal opcional como parámetro adicional final (hasta 512 bytes; rechazado para destinatarios transparentes)
- Las entradas del historial de transacciones de `listtransactions` y `gettransaction` incluyen los campos `memo` (hexadecimal) y `memoStr` (texto decodificado) cuando una salida contiene uno
- Se admiten envíos de importe cero a un destinatario blindado para casos de uso de solo memo (el patrón «memo-only-send» de `z_sendmany`)

Esto hace que zecd sea adecuado para aplicaciones que necesitan mensajería privada on-chain junto con pagos.

### Sin estado por diseño

zecd no conserva **ningún estado fuera de la cadena que una restauración solo con semilla no pudiera reconstruir**. La base de datos de la billetera (`data.sqlite`) se deriva completamente de la frase semilla: los fondos blindados se recuperan incondicionalmente; los fondos transparentes se recuperan hasta el límite de brecha configurado.

Para restaurar una billetera desde la semilla:

```sh
zecd init --restore --birthday <block-height>
```

Esto hace que el directorio de datos sea **desechable**: un contenedor sin volumen persistente, reconstruido desde la semilla en cada inicio, no pierde nada crítico. Los operadores son responsables de rastrear las direcciones que distribuyen; zecd solo recuerda direcciones una vez que han recibido fondos on-chain.

Las etiquetas están ausentes intencionalmente. Como las etiquetas no tienen una fuente on-chain y no pueden reconstruirse desde la semilla, zecd simplemente no las admite. Llamar a métodos de etiquetas devuelve un error `method-not-found` (`-32601`).

### Sin dependencia de lightwalletd

zecd deriva bloques compactos, estado del árbol y visibilidad del mempool directamente del JSON-RPC de Zebra. No hay ningún lightwalletd que operar o mantener, lo que reduce la complejidad operativa de las implementaciones autoalojadas.

### Implementaciones nativas de la nube y en contenedores

La arquitectura sin estado de zecd está diseñada para entornos Docker y Kubernetes:

- Stack completo de Compose de Docker (`zebra → zecd`) disponible en el repositorio
- Endpoint de salud en el puerto `9233` con sondeos de disponibilidad configurables (`synced` o `connected`)
- Opción de registro estructurado JSON para canalizaciones de agregación de registros
- Tarifas deterministas ZIP-317; sin oráculo de tarifas ni configuración manual de tarifas
- `bootstrap_from_keys` (activado de forma predeterminada): un directorio de datos vacío junto a `keys.toml` reconstruye automáticamente la billetera al iniciar; impleméntalo montando un Secret y arrancando con un PVC vacío

---

## Modelos de custodia

zecd admite tres modelos de custodia de claves, adecuados para distintos requisitos de implementación y seguridad:

### 1. Sin cifrado (predeterminado — desbloqueo automático)

La frase mnemónica en `keys.toml` se envuelve en un **archivo de identidad age** (`identity.txt`). Con `auto_unlock = true` predeterminado, la semilla se descifra en memoria al iniciar, por lo que los envíos no requieren supervisión y no se necesita una llamada a `walletpassphrase`.

Ideal para: procesadores de pagos automatizados, billeteras activas de exchanges, entornos de desarrollo.

```sh
zecd init --datadir ./data --wallet default --account-name primary
```

> Almacena `identity.txt` **fuera** del directorio de datos en mainnet: cualquiera que lea ambos archivos tiene autoridad para gastar.

### 2. Cifrado (protegido con frase de contraseña)

La mnemónica se envuelve con una frase de contraseña (age scrypt) en lugar de un archivo de identidad. La billetera comienza bloqueada; `walletpassphrase "<pass>" <timeout>` la desbloquea durante el tiempo indicado y la vuelve a bloquear automáticamente al expirar el plazo, igual que el comportamiento de una billetera cifrada de Bitcoin Core.

Ideal para: billeteras activas donde no se requiere autoridad de gasto sin supervisión; flujos de trabajo interactivos de operadores.

```sh
zecd init --datadir ./data --encrypt
# later: walletpassphrase "my-passphrase" 300
```

### 3. Solo observación (UFVK — sin clave de gasto)

Se inicializa con una Full Viewing Key unificada (UFVK) exportada desde otra billetera. Puede recibir, escanear e informar saldos, pero no puede firmar transacciones. Es ideal para monitorización, facturación o nodos de auditoría separados de la billetera de firma.

```sh
# On the signing wallet's host:
zecd export-ufvk

# On the watch-only host:
zecd init --datadir ./data-watch --ufvk "uview1..." --birthday <height>
```

---

## Copia de seguridad y recuperación

Los fondos se pueden recuperar **solo con la mnemónica**. Todo lo demás es una caché.

| Artefacto | Ubicación | Qué protege | ¿Hacer copia de seguridad? |
|----------|----------|-----------------|----------|
| **Mnemónica de 24 palabras** | Mostrada una vez en `zecd init` | Los fondos — pérdida = pérdida permanente | **Sí — sin conexión (papel/HSM)** |
| `keys.toml` | `<wallet dir>/keys.toml` | Semilla cifrada + cumpleaños + red | **Sí — como un Secret** |
| `identity.txt` | `[keys] age_identity` | Descifra `keys.toml` (autoridad de gasto) | **Sí — por separado de `keys.toml`** |
| Altura de cumpleaños | Dentro de `keys.toml` | Agiliza la restauración (cualquier altura anterior a la primera transacción) | Registrar con la mnemónica |
| `data.sqlite` | `<wallet dir>/data.sqlite` | Caché de la billetera — se reconstruye desde la semilla al restaurar | No — desechable |
| `blocks/` | `<wallet dir>/blocks/` | Caché de bloques compactos | No — nunca distribuir; puede crecer mucho |
| `.cookie` | `<datadir>/.cookie` | Cookie RPC efímera | No — se regenera al iniciar |

> **El directorio de datos debe ser local al host.** El bloqueo de instancia única de zecd (`<datadir>/.lock`) es un bloqueo consultivo del sistema operativo; no abarca hosts. Nunca compartas un directorio de datos en lectura-escritura entre máquinas (NFS, `ReadWriteMany` de Kubernetes): dos instancias de zecd corromperían la base de datos de la billetera. Usa volúmenes `ReadWriteOnce` en Kubernetes.

---

## Lista segura de métodos RPC

Para implementaciones donde una filtración de credenciales sería catastrófica, zecd admite restringir la superficie RPC a un subconjunto elegido de métodos:

```toml
[rpc]
allowed_methods = ["getblockchaininfo", "getbalance", "getnewaddress", "listtransactions"]
```

Cualquier método que no esté en la lista devuelve `-32601` (HTTP 404), indistinguible de un método inexistente, de modo que un servidor restringido no revela nada sobre lo que deshabilitó. Un facturador de solo recepción puede deshabilitar `sendtoaddress`, `sendmany` y `stop` para minimizar el radio de impacto de un cliente comprometido.

---

## Diferencias clave respecto al RPC de Bitcoin Core

Los desarrolladores que migren desde herramientas de Bitcoin o zcashd deben conocer estas divergencias intencionales:

| Comportamiento | Bitcoin Core | zecd |
|----------|-------------|------|
| Formato de dirección | `1...` / `bc1...` | `u1...` (dirección unificada Orchard) — no analizable como dirección Bitcoin por clientes que analizan cadenas |
| Etiquetas | Almacén completo de etiquetas | No implementado — `setlabel`, `listlabels`, etc. devuelven `-32601` |
| Tarifas | Configurables por el usuario; mercado de tarifas | Solo deterministas ZIP-317; `settxfee`, `fee_rate`, `subtractfeefromamount` se rechazan con `-8` |
| Memos | No admitidos | `sendtoaddress` acepta memo hexadecimal; el historial contiene los campos `memo` + `memoStr` |
| Confirmaciones para gastar | 1 | 3 (cambio propio) / 10 (terceros) — configurable mediante `trusted_confirmations` / `untrusted_confirmations` |
| `listsinceblock` en reorganización | Retrocede hasta la bifurcación | Devuelve `-5` (bloque no encontrado) si el cursor desaparece por una reorganización; restablece la línea base con una llamada sin parámetros |
| Destinatarios duplicados en `sendmany` | Error | El analizador JSON colapsa los duplicados (gana el último) antes de que zecd los vea; no enumeres la misma dirección dos veces |
| Saldo durante sincronización inicial | Bloquea o se calienta | Ofrece saldo parcial — condiciona la automatización a `GET /readyz` (devuelve 503 hasta sincronizarse completamente y vaciarse la cola de mejoras) |
| `minconf 0` en `getbalance` | Saldo sin confirmación | Se sirve como 1 — una nota blindada nunca se puede gastar sin minar |

---

## Inicio rápido

**Requisitos previos:** Zebra ejecutándose localmente con `rpc.listen_addr = 127.0.0.1:18234` (testnet).

Instala desde crates.io (0.4.3+):

```sh
cargo install zecd
```

O compila desde el código fuente:

```sh
git clone https://github.com/zecrocks/zecd && cd zecd
cargo build --release
```

```sh
# 1. Initialize a testnet wallet (generates a 24-word mnemonic and an account)
zecd --datadir ./data --testnet init --wallet default --account-name primary

# 2. Start the daemon (syncs in background, serves JSON-RPC on port 18232)
zecd --datadir ./data --testnet \
    --rpcuser zec --rpcpassword secret --rpcbind 127.0.0.1 --rpcport 18232
```

**Interactúa mediante curl:**

```sh
curl -s --user zec:secret --data-binary \
  '{"jsonrpc":"1.0","id":"1","method":"getblockchaininfo","params":[]}' \
  -H 'content-type: text/plain;' http://127.0.0.1:18232/
```

**Interactúa mediante Python (usando una biblioteca RPC de Bitcoin):**

```python
from bitcoinrpc.authproxy import AuthServiceProxy
rpc = AuthServiceProxy("http://zec:secret@127.0.0.1:18232")
print(rpc.getblockchaininfo())
addr = rpc.getnewaddress()          # returns a u1... Orchard Unified Address
print(rpc.getbalance())
print(rpc.listtransactions("*", 20))

# Send with a shielded memo
rpc.sendtoaddress(addr, 0.001, "", "", False, "48656c6c6f205a6563617368")  # hex memo
```

**Restaura desde la semilla:**

```sh
zecd --datadir ./data init --restore --birthday 2500000
# paste your 24-word mnemonic when prompted
```

---

## Puertos predeterminados

| Red | RPC de zecd | RPC de Zebra (backend) | Salud |
|---------|----------|---------------------|--------|
| Mainnet | 8232 | 8234 | 9233 |
| Testnet | 18232 | 18234 | 9233 |

---

## zecd frente a zcashd frente a Zaino

| | zcashd | Zaino | zecd |
|--|--------|-------|------|
| Rol | Nodo completo + billetera | Indexador (reemplaza lightwalletd) | Solo servidor de billetera |
| Lenguaje | C++ | Rust | Rust |
| Estado | Obsoleto | Activo | Activo (v0.5.0-rc3, jul. 2026) |
| Pool predeterminado | Transparente | N/A | Orchard (blindado) |
| Dialecto RPC | Específico de zcashd | gRPC (lightwalletd) | JSON-RPC de Bitcoin Core |
| Requiere nodo completo | Sí (propio) | Zebra o zcashd | Zebra |
| Recuperación sin estado | No | N/A | Sí (solo semilla) |
| Memos blindados | Sí (`z_sendmany`) | N/A | Sí (superficie RPC de Bitcoin) |
| Solo observación (UFVK) | Sí | Sí | Sí |
| Nativo de la nube | No | Parcial | Sí |
| Instalación | Compilación/binario | Compilación | `cargo install zecd` |

---

## Páginas relacionadas

- [Zebra Nodo completo](Zebra_Full_Node.md) — el nodo completo al que se conecta zecd
- [Zaino Indexador](Zaino.md) — enfoque de indexador alternativo (reemplaza lightwalletd)
- [Zakura Nodo](Zakura_Node.md) — otra implementación de nodo completo (bifurcación de Zebra)
- [Claves de visualización](Viewing_Keys.md) — cómo zecd escanea la red usando claves de visualización de cuentas
- [Billeteras](/using-zcash/wallets) — descripción general del ecosistema de billeteras

## Recursos

- [zecd GitHub (zecrocks/zecd)](https://github.com/zecrocks/zecd)
- [zecd Manual de operaciones](https://github.com/zecrocks/zecd/blob/main/docs/OPERATIONS.md)
- [zec.rocks](https://zec.rocks)
- [librustzcash — biblioteca criptográfica central de Zcash](https://github.com/zcash/librustzcash)
- [ZIP-317: Mecanismo de tarifa de transferencia proporcional](https://zips.z.cash/zip-0317)
- [ZIP-302: Memos blindados](https://zips.z.cash/zip-0302)
- [Zodl billetera (compatible con librustzcash)](https://github.com/zodl-inc/zodl-ios)
