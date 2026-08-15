---
<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/ZECD.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# ZECD — Servidor de Wallet con prioridad en shielded

> 🇧🇷 [Versión en portugués](/zechubglobal/zcashbrasil/zcashtech/zecd)

ZECD es un servidor de wallet con prioridad en shielded para Zcash, construido sobre [librustzcash](https://github.com/zcash/librustzcash) y expuesto a través del dialecto JSON-RPC de Bitcoin Core. Ofrece a desarrolladores e integradores de pagos una API familiar, compatible con Bitcoin, para interactuar con Zcash, mientras hace que Orchard (el pool más privado) sea la opción predeterminada. Desarrollado por [zec.rocks](https://zec.rocks), ZECD está diseñado para reemplazar la funcionalidad de wallet de `zcashd` en implementaciones modernas y nativas de la nube.

**Versión actual:** 0.5.0-rc3 (13 de julio de 2026) — con soporte para Ironwood (NU6.3). Instálalo con `cargo install zecd` o usa la imagen oficial de Docker.

---

## TL;DR

- ZECD es un **daemon de wallet (servidor)**, no un nodo completo. Gestiona claves, escaneo, generación de pruebas y RPC sin hablar el protocolo P2P de Zcash.
- Habla el **dialecto JSON-RPC de Bitcoin Core**: mismos nombres de métodos, formas de campos, autenticación y códigos de error; muchos clientes RPC de Bitcoin funcionan con Zcash desde el primer momento.
- Las **direcciones Orchard (shielded) son la opción predeterminada**; el soporte para transparent (t-address) y Sapling requiere activación explícita por wallet.
- Se conecta a un **nodo completo [Zebra](Zebra_Full_Node.md) autoalojado** mediante JSON-RPC local; no necesita lightwalletd.
- **Sin estado por diseño**: toda la wallet puede recuperarse únicamente a partir de la frase semilla, lo que hace que el directorio de datos sea desechable.
- **No es un reemplazo directo de zcashd**: implementa solo un subconjunto de los métodos RPC de Zcash, con diferencias de diseño intencionales para privacidad y seguridad.
- Las comisiones siguen **ZIP-317** (cálculo determinista de comisiones); las comisiones especificadas por el usuario se rechazan.
- Soporta **memos shielded (ZIP-302)** a través de la interfaz RPC familiar de Bitcoin.

---

## ¿Qué problema resuelve ZECD?

`zcashd` fue el nodo original de Zcash y wallet combinados, derivado del código base en C++ de Bitcoin en 2016. Con el tiempo, esto generó fricción: el código es difícil de mantener, la wallet está fuertemente acoplada al nodo y las direcciones transparent se presentan como opciones de primera clase junto a las shielded.

ZECD separa la responsabilidad de la wallet del consenso. Es una **capa de wallet dedicada** que se sitúa entre las aplicaciones y un nodo completo Zebra, proporcionando:

- Una implementación limpia y moderna en Rust construida sobre librustzcash (la misma librería que impulsa Zodl y Zingo)
- Diseño con privacidad por defecto (direcciones Orchard salvo que se configure de otro modo)
- Una interfaz RPC compatible con Bitcoin que elimina la necesidad de aprender herramientas específicas de Zcash
- Arquitectura sin estado, recuperable desde la semilla, adecuada para implementaciones en contenedores y en la nube

---

## Arquitectura

ZECD opera en un modelo de tres capas:

```
Your app / Bitcoin RPC client
        ↓  JSON-RPC
       ZECD
   (keys, scanning, proving, RPC)
        ↓  JSON-RPC (local only)
       Zebra
   (full node — consensus, mempool, chain data)
```

ZECD se comunica con Zebra **exclusivamente a través de JSON-RPC local**: sin red peer-to-peer, sin indexadores de terceros, sin lightwalletd. La conexión con Zebra está deliberadamente limitada al entorno local: ZECD se negará a enviar credenciales a un host enrutable globalmente a menos que se configure explícitamente para un túnel seguro fuera de banda (por ejemplo, WireGuard o SSH).

---

## Características principales

### Shielded primero, Orchard por defecto

ZECD usa Unified Address de Orchard como el tipo de dirección predeterminado. Los pools Sapling y transparent (t-address) requieren configuración explícita por wallet. Este diseño reduce el riesgo de envíos transparent accidentales, un problema común de privacidad en herramientas antiguas de Zcash.

La política de privacidad puede configurarse por llamada o globalmente en `[spend] privacy_policy`:

| Política | Comportamiento |
|--------|----------|
| `AllowRevealedRecipients` (predeterminada) | Permite envíos a destinatarios transparent; revela el importe y el destinatario en la cadena |
| `AllowRevealedAmounts` | Permite envíos entre pools (Sapling↔Orchard) pero rechaza destinatarios transparent |
| `FullPrivacy` | Solo envíos completamente shielded dentro de un solo pool; rechaza destinatarios transparent y envíos entre pools |
| `AllowFullyTransparent` | También permite envíos t→t financiados desde UTXO transparent |

### Compatibilidad con Bitcoin Core RPC

ZECD implementa el dialecto JSON-RPC de Bitcoin Core con conformidad en:

- Nombres de métodos (por ejemplo, `getblockchaininfo`, `getbalance`, `getnewaddress`, `listtransactions`, `sendtoaddress`, `sendmany`)
- Nombres y tipos de campos en las respuestas
- Estructura del sobre JSON-RPC 1.0
- Autenticación básica, entradas `rpcauth` y autenticación mediante archivo cookie
- Códigos de error y mapeo de estado HTTP (HTTP 500 con cuerpo de error, semántica 401)

Esto significa que muchas librerías de pago, integraciones con exchanges y herramientas de monitoreo ya existentes para Bitcoin pueden interactuar con Zcash a través de ZECD con pocos o ningún cambio de código.

La suite de conformidad (más de 140 comprobaciones) se ejecuta en cada PR contra un daemon regtest en vivo y también fue validada contra la testnet pública.

### Memos shielded (ZIP-302)

ZECD expone la funcionalidad de memos shielded de Zcash a través de la interfaz RPC familiar de Bitcoin, algo no disponible en las herramientas estándar de Bitcoin:

- `sendtoaddress` acepta un memo hexadecimal opcional como parámetro adicional al final (hasta 512 bytes; se rechaza para destinatarios transparent)
- Las entradas del historial de transacciones de `listtransactions` y `gettransaction` incluyen los campos `memo` (hex) y `memoStr` (texto decodificado) cuando una salida lo contiene
- Se admiten envíos de importe cero a un destinatario shielded para casos de uso de solo memo (el patrón "memo-only-send" de `z_sendmany`)

Esto hace que ZECD sea adecuado para aplicaciones que necesitan mensajería privada on-chain junto con pagos.

### Sin estado por diseño

ZECD no persiste **ningún estado off-chain que una restauración solo desde la semilla no pudiera reconstruir**. La base de datos de la wallet (`data.sqlite`) se deriva por completo de la frase semilla: los fondos shielded se recuperan incondicionalmente; los fondos transparent se recuperan hasta el límite de gap configurado.

Para restaurar una wallet desde la semilla:

```sh
zecd init --restore --birthday <block-height>
```

Esto hace que el directorio de datos sea **desechable**: un contenedor sin volumen persistente, reconstruido desde la semilla en cada arranque, no pierde nada crítico. Los operadores son responsables de llevar el control de las direcciones que entregan: ZECD solo recuerda las direcciones una vez que han recibido fondos on-chain.

Las etiquetas están ausentes intencionadamente. Como las etiquetas no tienen una fuente on-chain y no pueden reconstruirse desde la semilla, ZECD simplemente no las soporta. Llamar a métodos de etiquetas devuelve un error `method-not-found` (`-32601`).

### Sin dependencia de lightwalletd

ZECD deriva bloques compactos, estado del árbol y visibilidad del mempool directamente del JSON-RPC de Zebra. No hay lightwalletd que operar o mantener, lo que reduce la complejidad operativa en implementaciones autoalojadas.

### Implementaciones nativas de la nube y en contenedores

La arquitectura sin estado de ZECD está diseñada para entornos Docker y Kubernetes:

- Stack completo de Docker Compose (`zebra → zecd`) disponible en el repositorio
- Endpoint de salud en el puerto `9233` con probes de readiness configurables (`synced` o `connected`)
- Opción de logging estructurado en JSON para pipelines de agregación de logs
- Comisiones deterministas ZIP-317: sin oráculo de comisiones ni configuración manual de comisiones
- `bootstrap_from_keys` (activado por defecto): un directorio de datos vacío junto a `keys.toml` reconstruye automáticamente la wallet al arrancar; despliega montando un solo Secret e iniciando con un PVC vacío

---

## Modelos de custodia

ZECD soporta tres modelos de custodia de claves, adecuados para distintos requisitos de implementación y seguridad:

### 1. Sin cifrar (Predeterminado — Desbloqueo automático)

La semilla mnemónica en `keys.toml` se encapsula en un **archivo de identidad age** (`identity.txt`). Con el valor predeterminado `auto_unlock = true`, la semilla se descifra en memoria al arrancar, por lo que los envíos son desatendidos y no se necesita ninguna llamada a `walletpassphrase`.

Ideal para: procesadores de pago automatizados, hot wallets de exchanges, entornos de desarrollo.

```sh
zecd init --datadir ./data --wallet default --account-name primary
```

> Guarda `identity.txt` **fuera** del directorio de datos en mainnet: cualquier persona que lea ambos archivos tendrá autoridad de gasto.

### 2. Cifrada (Protegida con frase de contraseña)

La mnemónica se encapsula con una frase de contraseña (age scrypt) en lugar de un archivo de identidad. La wallet se inicia bloqueada; `walletpassphrase "<pass>" <timeout>` la desbloquea durante el tiempo indicado y vuelve a bloquearse automáticamente al expirar, igual que el comportamiento de wallet cifrada de Bitcoin Core.

Ideal para: hot wallets donde no se requiere autoridad de gasto desatendida; flujos de trabajo interactivos de operador.

```sh
zecd init --datadir ./data --encrypt
# later: walletpassphrase "my-passphrase" 300
```

### 3. Solo observación (UFVK — Sin clave de gasto)

Se inicializa con una Unified Full Viewing Key (UFVK) exportada desde otra wallet. Puede recibir, escanear y reportar saldos, pero no puede firmar transacciones. Ideal para monitoreo, facturación o nodos de auditoría separados de la wallet firmante.

```sh
# On the signing wallet's host:
zecd export-ufvk

# On the watch-only host:
zecd init --datadir ./data-watch --ufvk "uview1..." --birthday <height>
```

---

## Copia de seguridad y recuperación

Los fondos se recuperan **solo con la mnemónica**. Todo lo demás es caché.

| Artefacto | Ubicación | Qué protege | ¿Hacer copia de seguridad? |
|----------|----------|-----------------|----------|
| **Mnemónica de 24 palabras** | Se muestra una vez en `zecd init` | Los fondos — perderla = pérdida permanente | **Sí — offline (papel/HSM)** |
| `keys.toml` | `<wallet dir>/keys.toml` | Semilla cifrada + birthday + red | **Sí — como Secret** |
| `identity.txt` | `[keys] age_identity` | Descifra `keys.toml` (autoridad de gasto) | **Sí — por separado de `keys.toml`** |
| Altura de birthday | Dentro de `keys.toml` | Hace que la restauración sea rápida (cualquier altura anterior a la primera tx) | Regístrala con la mnemónica |
| `data.sqlite` | `<wallet dir>/data.sqlite` | Caché de la wallet — se reconstruye desde la semilla al restaurar | No — desechable |
| `blocks/` | `<wallet dir>/blocks/` | Caché de bloques compactos | No — nunca lo distribuyas; puede crecer mucho |
| `.cookie` | `<datadir>/.cookie` | Cookie RPC efímera | No — se regenera al arrancar |

> **El directorio de datos debe ser local al host.** El bloqueo de instancia única de ZECD (`<datadir>/.lock`) es un bloqueo consultivo del sistema operativo; no se extiende entre hosts. Nunca compartas un directorio de datos en modo lectura-escritura entre máquinas (NFS, Kubernetes `ReadWriteMany`): dos instancias de ZECD corromperían la base de datos de la wallet. Usa volúmenes `ReadWriteOnce` en Kubernetes.

---

## Lista segura de métodos RPC

Para implementaciones donde una filtración de credenciales sería catastrófica, ZECD permite restringir la superficie RPC a un subconjunto elegido de métodos:

```toml
[rpc]
allowed_methods = ["getblockchaininfo", "getbalance", "getnewaddress", "listtransactions"]
```

Cualquier método que no esté en la lista devuelve `-32601` (HTTP 404), indistinguible de un método que no existe, de modo que un servidor bloqueado no revela nada sobre lo que deshabilitó. Un facturador solo de recepción puede deshabilitar `sendtoaddress`, `sendmany` y `stop` para minimizar el radio de impacto de un cliente comprometido.

---

## Diferencias clave con Bitcoin Core RPC

Los desarrolladores que migren desde herramientas de Bitcoin o zcashd deben tener en cuenta estas divergencias intencionales:

| Comportamiento | Bitcoin Core | ZECD |
|----------|-------------|------|
| Formato de dirección | `1...` / `bc1...` | `u1...` (Unified Address de Orchard) — no interpretable como dirección de Bitcoin por clientes que analizan strings |
| Etiquetas | Almacén completo de etiquetas | No implementado — `setlabel`, `listlabels`, etc. devuelven `-32601` |
| Comisiones | Configurables por el usuario; mercado de comisiones | Solo ZIP-317 determinista; `settxfee`, `fee_rate`, `subtractfeefromamount` se rechazan con `-8` |
| Memos | No soportados | `sendtoaddress` acepta memo hex; el historial tiene campos `memo` + `memoStr` |
| Confirmaciones para gastar | 1 | 3 (cambio propio) / 10 (terceros) — configurable mediante `trusted_confirmations` / `untrusted_confirmations` |
| `listsinceblock` en reorg | Retrocede hasta la bifurcación | Devuelve `-5` (Block not found) si el cursor fue eliminado por una reorg — restablece la base con una llamada sin parámetros |
| Destinatarios duplicados en `sendmany` | Error | El parser JSON colapsa duplicados (el último gana) antes de que ZECD los vea; no pongas la misma dirección dos veces |
| Saldo durante la sincronización inicial | Bloquea o warm-up | Sirve saldo parcial — condiciona la automatización a `GET /readyz` (devuelve 503 hasta que esté completamente sincronizado y se haya vaciado la cola de mejoras pendientes) |
| `minconf 0` en `getbalance` | Saldo con 0 confirmaciones | Se sirve como 1 — una nota shielded nunca puede gastarse sin minar |

---

## Inicio rápido

**Prerrequisitos:** Zebra ejecutándose localmente con `rpc.listen_addr = 127.0.0.1:18234` (testnet).

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

**Interactúa mediante Python (usando una librería Bitcoin RPC):**

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

**Restaurar desde la semilla:**

```sh
zecd --datadir ./data init --restore --birthday 2500000
# paste your 24-word mnemonic when prompted
```

---

## Puertos predeterminados

| Red | ZECD RPC | Zebra RPC (backend) | Salud |
|---------|----------|---------------------|--------|
| Mainnet | 8232 | 8234 | 9233 |
| Testnet | 18232 | 18234 | 9233 |

---

## ZECD vs. zcashd vs. Zaino

| | zcashd | Zaino | ZECD |
|--|--------|-------|------|
| Rol | Nodo completo + wallet | Indexador (reemplaza lightwalletd) | Solo servidor de wallet |
| Lenguaje | C++ | Rust | Rust |
| Estado | Obsoleto | Activo | Activo (v0.5.0-rc3, jul 2026) |
| Pool predeterminado | Transparent | N/A | Orchard (shielded) |
| Dialecto RPC | Específico de zcashd | gRPC (lightwalletd) | Bitcoin Core JSON-RPC |
| Requiere nodo completo | Sí (propio) | Zebra o zcashd | Zebra |
| Recuperación sin estado | No | N/A | Sí (solo semilla) |
| Memos shielded | Sí (`z_sendmany`) | N/A | Sí (interfaz Bitcoin RPC) |
| Solo observación (UFVK) | Sí | Sí | Sí |
| Nativo de la nube | No | Parcial | Sí |
| Instalación | Compilación/binario | Compilación | `cargo install zecd` |

---

## Páginas relacionadas

- [Nodo completo Zebra](Zebra_Full_Node.md) — el nodo completo al que se conecta ZECD
- [Indexador Zaino](Zaino.md) — enfoque alternativo de indexación (reemplaza lightwalletd)
- [Nodo Zakura](Zakura_Node.md) — otra implementación de nodo completo (fork de Zebra)
- [Viewing Keys](Viewing_Keys.md) — cómo ZECD escanea la cadena usando claves de visualización de cuenta
- [Wallets](/using-zcash/wallets) — visión general del ecosistema de wallets

## Recursos

- [ZECD GitHub (zecrocks/zecd)](https://github.com/zecrocks/zecd)
- [Runbook de operaciones de ZECD](https://github.com/zecrocks/zecd/blob/main/docs/OPERATIONS.md)
- [zec.rocks](https://zec.rocks)
- [librustzcash — librería central de criptografía de Zcash](https://github.com/zcash/librustzcash)
- [ZIP-317: Mecanismo proporcional de comisión por transferencia](https://zips.z.cash/zip-0317)
- [ZIP-302: Memos shielded](https://zips.z.cash/zip-0302)
- [Wallet Zodl (compatible con librustzcash)](https://github.com/zodl-inc/zodl-ios)
