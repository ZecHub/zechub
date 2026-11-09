<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Zimppy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zimppy.xyz

## TL;DR

- **Zimppy** es una infraestructura de pago [payment] centrada en la privacidad [privacy] para agentes de IA que utiliza el Machine Payment Protocol (MPP) de Zcash
- **Deposita una vez** on-chain (~75 segundos) y luego realiza **solicitudes instantáneas ilimitadas** sin interacción con la blockchain por solicitud
- Admite pagos de Zcash (Orchard) **completamente blindados [shielded]**: el remitente, el destinatario, el importe y el memo están cifrados
- Funciona con los SDK de **TypeScript y Rust** para facilitar la integración en pipelines de IA y servidores de API
- Perfecto para **API de LLM, marketplaces de datos, servidores de herramientas MCP** y cualquier caso de uso [use case] de pagos M2M

---

> **Zimppy** es el método de pago del Machine Payment Protocol (MPP) para Zcash que admite pagos blindados y transparentes [transparent]. Deposita una vez on-chain y luego realiza solicitudes de portador instantáneas ilimitadas sin interacción con la red [chain] por solicitud.

---

## Tabla de contenidos

1. [¿Qué es Zimppy.xyz?](#what-is-zimppyxyz)
2. [¿Por qué pagos blindados para agentes de IA?](#why-shielded-payments-for-ai-agents)
3. [Machine Payment Protocol (MPP)](#machine-payment-protocol-mpp)
4. [Cómo funciona Zimppy](#how-zimppy-works)
   - [Sesiones (recomendado)](#sessions-recommended)
   - [Streaming](#streaming)
   - [Cargo](#charge)
5. [Casos de uso y ejemplos](#use-cases--examples)
6. [Instalación](#installation)
7. [Configuración de la billetera Zimppy](#setting-up-the-zimppy-wallet)
8. [Integración de Zimppy](#integrating-zimppy--typescript-sdk)
   - [Servidor (blindado)](#typescript-server--shielded)
   - [Servidor (transparente)](#typescript-server--transparent)
   - [Cliente](#typescript-client)
9. [Integración de Zimppy - SDK de Rust](#integrating-zimppy--rust-sdk)
   - [Servidor (Axum)](#rust-server-axum)
   - [Cliente](#rust-client)
10. [Referencia de la CLI](#cli-reference)
11. [Características clave](#key-features)
12. [Arquitectura](#architecture)
13. [Ejemplos y demostraciones](#examples--demos)

---

## ¿Qué es Zimppy.xyz?

**Zimppy.xyz** es una infraestructura de pagos centrada en la privacidad diseñada específicamente para agentes de IA y flujos de trabajo automatizados de máquina a máquina (M2M). Implementa el **Machine Payment Protocol (MPP)** utilizando **Zcash** como moneda subyacente, lo que permite modos de pago tanto blindados (completamente privados) como transparentes.

A diferencia de los sistemas tradicionales de pago con blockchain, donde cada transacción [transaction] es visible públicamente on-chain, Zimppy está diseñado en torno a una arquitectura basada en sesiones que elimina la latencia por solicitud mientras preserva la privacidad criptográfica. Esto lo hace especialmente adecuado para agentes de IA que necesitan pagar programáticamente por API, datos, computación o herramientas de IA, sin filtrar metadatos de comportamiento.

### Propiedades principales

- **Deposita una vez** on-chain (~75 segundos para la confirmación de Zcash)
- **Solicitudes instantáneas ilimitadas** tras abrir una sesión, con cero interacción con la red por solicitud
- Los **pagos blindados** cifran el remitente, el destinatario, el importe y el memo mediante el protocolo Orchard de Zcash
- Los **pagos transparentes** utilizan direcciones T por desafío para evitar repeticiones sin privacidad total
- **Compatible con la especificación**, desafíos HMAC-SHA256, errores RFC 9457 y descubrimiento de `/.well-known/payment`

---

## ¿Por qué pagos blindados para agentes de IA?

Para los agentes de IA que gestionan flujos de trabajo sensibles, investigación jurídica, consultas médicas, análisis financiero e inteligencia competitiva, **cada pago público es una filtración de metadatos**. Zimppy es el único método de pago MPP que es **privado por defecto**.

### Tabla comparativa de privacidad

| Propiedad | Redes públicas (USDC, ETH) | Zimppy blindado | Zimppy transparente |
|---|---|---|---|
| **Remitente** | Visible | Cifrado | Visible |
| **Destinatario** | Visible | Cifrado | Por desafío (invinculable [unlinkable]) |
| **Importe** | Visible | Cifrado | Visible |
| **Memo** | Visible | Cifrado | N/A |
| **Protección contra repeticiones** | Ninguna | Vinculación de memo | Dirección T por desafío |
| **Patrón de uso del servicio** | Vinculable | Privado | Invinculable (dirección nueva) |

### El problema de la latencia, resuelto mediante sesiones

> *«Pero Zcash tiene tiempos de bloque de 75 segundos».*

**Las sesiones resuelven esto.** La espera on-chain ocurre exactamente **una vez** durante el depósito. Cada solicitud posterior es instantánea.

```
Agent  ->  deposit 100,000 zat           (one on-chain tx, ~75s)
Agent  ->  open session                  (bearer token issued)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
           ... hundreds of requests ...
Agent  ->  close session                 (refund unused balance)
```

**Paga una vez, llama al instante y recupera el cambio.** La latencia por solicitud es cero.

---

## Machine Payment Protocol (MPP)

El **Machine Payment Protocol (MPP)** es un protocolo estandarizado que permite a agentes de software autónomos (agentes de IA, bots, scripts) descubrir, negociar y satisfacer requisitos de pago para el acceso a API, todo ello sin intervención humana.

### Cómo se integra MPP con las API

MPP sigue el flujo HTTP **402 Payment Required**:

1. **El agente solicita** un recurso desde un endpoint de API de pago.
2. **El servidor responde** con `402 Payment Required` + un desafío firmado (importe, destinatario, memo).
3. **El agente paga** utilizando un método de pago compatible (por ejemplo, Zcash blindado de Zimppy).
4. **El agente vuelve a intentar** la solicitud con `Authorization: Payment {txid}`.
5. **El servidor verifica** criptográficamente el pago (descifrado IVK de Orchard, comprobación de importe + memo).
6. **El servidor responde** con `200 OK` + un encabezado `Payment-Receipt`.

### Compatibilidad con la especificación

- Firma de desafíos **HMAC-SHA256**
- Respuestas de error estructuradas **RFC 9457**
- Endpoint **`/.well-known/payment`** para el descubrimiento automático de métodos de pago
- **IVK de Orchard** (Incoming Viewing Key) para la verificación de pagos del lado del servidor sin exponer claves de gasto [spending key]

---

## Cómo funciona Zimppy

### Sesiones (recomendado)

Las sesiones son el patrón de interacción principal. El agente deposita un saldo on-chain una vez, recibe un token de portador y lo utiliza para todas las solicitudes posteriores sin latencia.

```
Agent  ->  deposit 100,000 zat           (on-chain, ~75s one-time)
Agent  ->  open session                  (bearer token issued)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  close session                 (refund unused balance on-chain)
```

**Ideal para:** Llamadas de API de alta frecuencia, inferencia de LLM y consultas repetidas de datos.

---

### Streaming

Contenido medido por token entregado mediante **Server-Sent Events (SSE)**. El servidor deduce del saldo de la sesión por cada palabra o token transmitido.

```
Agent  ->  open session with deposit
Agent  ->  GET /api/stream (SSE)
Server ->  stream word by word, deducting per token
Agent  ->  close session, refund remaining
```

**Ideal para:** Respuestas de LLM en streaming, fuentes de datos en tiempo real y herramientas de IA de pago por token.

---

### Cargo

Un único pago blindado por solicitud. El flujo HTTP 402 completo se ejecuta por llamada. Adecuado cuando las solicitudes son poco frecuentes o de alto valor.

```
Agent  ->  GET /api/resource
Server ->  402 + challenge (amount, recipient, memo)
Agent  ->  shielded ZEC with memo "zimppy:{challenge_id}"
Agent  ->  GET /api/resource + Authorization: Payment {txid}
Server ->  decrypt with Orchard IVK, verify amount + memo
Server ->  200 OK + Payment-Receipt
```

**Ideal para:** Solicitudes únicas de alto valor, llamadas de API poco frecuentes y endpoints de datos prémium.

---

## Casos de uso y ejemplos

### 1. Agente de IA

Un agente jurídico de IA consulta una base de datos de jurisprudencia de pago. Al utilizar sesiones blindadas de Zimppy, ni la identidad del bufete de abogados ni las consultas específicas son visibles on-chain, lo que protege el privilegio abogado-cliente a nivel de infraestructura.

```
Agent opens session (100,000 zat deposit)
-> GET /api/cases?q=patent+infringement+2024     (instant)
-> GET /api/cases?q=prior+art+semiconductor      (instant)
-> GET /api/document/US11234567B2                (instant)
Session closed, unused balance refunded
```

### 2. Agente de IA para un pipeline de consultas médicas

Un agente de diagnóstico médico consulta múltiples bases de datos clínicas. Los pagos blindados garantizan que los patrones de consulta de los pacientes no puedan vincularse entre proveedores.

### 3. Agente de análisis financiero

Un agente de trading algorítmico paga por API de datos de mercado en tiempo real. Los pagos transparentes utilizan direcciones T nuevas por desafío, lo que evita la correlación de patrones de uso entre proveedores de datos.

### 4. Servidor de herramientas MCP, herramientas de IA de pago

Un servidor MCP (Model Context Protocol) expone herramientas de IA de pago. Cada invocación de herramienta activa un cargo de Zimppy, lo que permite un marketplace de capacidades de IA monetizadas.

### 5. Resumidor LLM, pago por token

Un servicio de resumen con LLM cobra a los agentes por token de salida mediante streaming SSE, con deducción automática del saldo y reembolso del saldo prepagado no utilizado.

---

## Instalación

### Node.js / TypeScript

```bash
npm install zimppy          # CLI + wallet
npm install zimppy-ts       # TypeScript SDK
```

### Rust

```toml
[dependencies]
zimppy-core = "0.5"         # Rust verification engine
zimppy-rs = "0.5"           # Rust SDK (charge, session, axum)
```

---

## Configuración de la billetera Zimppy

La CLI de Zimppy proporciona una interfaz completa de billetera. Todos los comandos están disponibles mediante `npx zimppy`.

### Paso 1 : Crear una billetera

```bash
npx zimppy wallet create
```

Genera claves criptográficas y muestra tu **frase semilla [seed phrase]**. Guárdala de forma segura: no podrá recuperarse si se pierde.

### Paso 2 : Consultar tu dirección y saldo

```bash
npx zimppy wallet whoami
```

Muestra tu **dirección unificada (UA)**, **dirección T**, saldo actual y red activa.

```bash
npx zimppy wallet balance --all
```

Muestra un desglose del saldo por cuenta en todas las cuentas ZIP-32.

### Paso 3 : Financiar tu billetera

Envía ZEC a tu dirección unificada desde cualquier billetera o exchange compatible con Zcash. Los depósitos blindados van directamente a tu cuenta Orchard.

### Paso 4 : Enviar y blindar fondos

```bash
# Send ZEC to any address (shielded or transparent)
npx zimppy wallet send <addr> 42000

# Move transparent funds into Orchard (shielded)
npx zimppy wallet shield

# Transfer between your own accounts
npx zimppy wallet transfer 0 1 50000

# Switch active wallet identity
npx zimppy wallet use work
```

### Paso 5 : Realizar una solicitud de pago automático

```bash
npx zimppy request <url>
```

Gestiona automáticamente el flujo completo 402 -> pagar -> reintentar. Las sesiones se abren y administran de forma transparente.

---

## Integración de Zimppy - SDK de TypeScript

### Servidor de TypeScript - Blindado

```typescript
import { Mppx } from 'mppx/server'
import { zcash } from 'zimppy-ts/server'

const mppx = Mppx.create({
  methods: [await zcash({ wallet: 'server' })],
  realm: 'my-api',
  secretKey: process.env.MPP_SECRET_KEY,
})

const result = await mppx.charge({
  amount: '42000',
  currency: 'zec',
})(request)

if (result.status === 402) return result.challenge

return result.withReceipt(Response.json({ data }))
```

**Puntos clave:**
- `zcash({ wallet: 'server' })` carga la billetera blindada del servidor
- `mppx.charge()` gestiona el ciclo de vida completo de desafío/verificación 402
- `result.withReceipt()` adjunta el recibo de pago criptográfico a la respuesta

---

### Servidor de TypeScript - Transparente

```typescript
import { Mppx } from 'mppx/server'
import { zcashTransparent } from 'zimppy-ts/server'

const mppx = Mppx.create({
  methods: [await zcashTransparent({ wallet: 'server' })],
  // per-challenge T-address generated automatically (replay-safe)
})
```

Cada desafío genera una **dirección T nueva**, lo que hace que las solicitudes de pago sean invinculables entre sesiones.

---

### Cliente de TypeScript

```typescript
import { Mppx } from 'mppx/client'
import { zcash } from 'zimppy-ts/client'

const mppx = Mppx.create({ methods: [zcash({ wallet: 'default' })] })

// Session opened automatically; 402 is handled transparently
const res = await mppx.fetch('https://api.example.com/resource')
```

El cliente intercepta las respuestas `402`, abre una sesión automáticamente y vuelve a intentar la solicitud; el código de llamada no requiere lógica específica de pago.

---

## Integración de Zimppy - SDK de Rust

### Servidor de Rust (Axum)

```rust
use mpp::server::axum::*;
use zimppy_rs::ZcashChallenger;

struct Price;

impl ChargeConfig for Price {
    fn amount() -> &'static str { "42000" }
}

async fn handler(charge: MppCharge<Price>) -> WithReceipt<Json<Value>> {
    WithReceipt {
        receipt: charge.receipt,
        body: Json(data),
    }
}
```

**Puntos clave:**
- `MppCharge<Price>` es un extractor de Axum que verifica el pago antes de que se ejecute el controlador
- `WithReceipt` envuelve la respuesta con un recibo de pago criptográfico
- `ChargeConfig` define la lógica de precios; puede ser dinámica según los parámetros de la solicitud

---

### Cliente de Rust

```rust
use mpp::client::Fetch;
use zimppy_rs::ZcashPaymentProvider;

let provider = ZcashPaymentProvider::new(wallet_config, &rpc);

let resp = client
    .get("https://api.example.com/resource")
    .send_with_payment(&provider)
    .await?;
```

`send_with_payment` amplía cualquier cliente HTTP con gestión automática de 402, gestión de sesiones y cumplimiento de pagos Zcash.

---

## Referencia de la CLI

| Comando | Descripción |
|---|---|
| `npx zimppy wallet create` | Generar claves y mostrar la frase semilla |
| `npx zimppy wallet whoami` | Mostrar dirección (UA + dirección T), saldo y red |
| `npx zimppy wallet balance --all` | Desglose de saldo por cuenta |
| `npx zimppy wallet send <addr> <zat>` | Enviar ZEC blindado o transparente |
| `npx zimppy wallet transfer <from> <to> <zat>` | Transferencia interna entre cuentas |
| `npx zimppy wallet shield` | Mover fondos transparentes a Orchard (blindado) |
| `npx zimppy wallet use <name>` | Cambiar la identidad activa de la billetera |
| `npx zimppy request <url>` | Solicitud automática 402 -> pagar -> reintentar |

---

## Características clave

### Billeteras nativas para agentes

Las billeteras Zimppy están diseñadas para uso programático por agentes de IA, no para extensiones de navegador gestionadas por personas. Las claves se gestionan mediante la CLI o los SDK, las cuentas pueden rotarse mediante la derivación de cuentas **ZIP-32**, y la billetera admite flujos de pago completamente automatizados sin aprobación humana por transacción.

### Compatibilidad con múltiples agentes

Varios agentes pueden operar desde la misma billetera mediante la rotación de cuentas **ZIP-32**: cada agente obtiene su propia cuenta con seguimiento de saldo aislado, capacidad de transferencia entre cuentas e informes de saldo por cuenta. Esto permite gestionar flotas de muchos agentes desde una única infraestructura de billetera.

### Transacciones de Zcash completamente blindadas (Orchard)

Los pagos blindados utilizan el **protocolo Orchard** de Zcash, el pool [pool] blindado introducido por NU5. El servidor verifica los pagos mediante una **Incoming Viewing Key (IVK)**, que puede descifrar notas recibidas sin exponer la clave de gasto. Los ataques de repetición se evitan mediante la **vinculación de memo**: cada desafío incorpora un memo único de `zimppy:{challenge_id}` que se verifica criptográficamente.

### Sesiones, cero latencia por solicitud

La arquitectura de sesiones desacopla la espera de confirmación on-chain de la latencia por solicitud. Tras un único depósito (~75 segundos), todas las solicitudes posteriores con token de portador se atienden al instante sin interacción con la blockchain hasta el cierre de la sesión.

### Streaming, pago por token

La compatibilidad nativa con **SSE (Server-Sent Events)** permite contenido medido por pago por token. Es ideal para API de inferencia de LLM donde la longitud de salida es variable y la facturación debe reflejar el consumo real.

### Compatibilidad con la especificación

- Los desafíos firmados con **HMAC-SHA256** evitan falsificaciones
- El formato de error estructurado **RFC 9457** permite una gestión de errores interoperable
- **`/.well-known/payment`** permite el descubrimiento automático de métodos de pago por cualquier agente compatible con MPP

---

## Arquitectura

```
crates/
  zimppy-core/       Zcash verification engine (Orchard decryption, replay protection)
  zimppy-wallet/     Native Zcash wallet (zingolib)
  zimppy-rs/         Rust SDK (ChargeMethod, SessionMethod, PaymentProvider, axum extractors)
  zimppy-napi/       Node.js native bindings (NAPI-RS)

packages/
  zimppy-ts/         TypeScript SDK (charge, session, SSE)
  zimppy-cli/        CLI with auto-pay and session management
```

### Responsabilidades de los componentes

**`zimppy-core`** - El núcleo criptográfico. Gestiona el descifrado de notas de Orchard mediante la IVK del servidor, el análisis de memos, la lógica de protección contra repeticiones y la verificación de desafíos. Está escrito en Rust para obtener rendimiento y corrección.

**`zimppy-wallet`** - Una billetera nativa de Zcash impulsada por `zingolib`. Gestiona claves, cuentas, saldos blindados/transparentes y envío de transacciones.

**`zimppy-rs`** - El SDK de Rust. Proporciona los traits `ChargeMethod`, `SessionMethod` y `PaymentProvider`, además de extractores de Axum (`MppCharge`, `WithReceipt`) para una integración ergonómica del servidor.

**`zimppy-napi`** - Enlaces NAPI-RS que exponen el núcleo de Rust a Node.js, lo que permite al SDK de TypeScript utilizar el mismo motor criptográfico sin reimplementar primitivas de Zcash en JavaScript.

**`zimppy-ts`** - El SDK de TypeScript. Envuelve los enlaces NAPI con API idiomáticas async/await para flujos de cargo, sesión y streaming SSE.

**`zimppy-cli`** - La billetera de línea de comandos y herramienta de solicitudes. Admite pago automático (402 -> pagar -> reintentar), gestión de sesiones y todas las operaciones de billetera.

---

## Ejemplos y demostraciones

| Ejemplo | Descripción |
|---|---|
| `examples/fortune-teller/` | Demostraciones de cargo, sesión y streaming: servidor + cliente de Rust |
| `examples/llm-summarizer/` | Demostración de streaming LLM de pago por token |
| `examples/mcp-server/` | Servidor de herramientas MCP con herramientas de IA de pago |
| `examples/ts-server/` | Implementación de referencia del servidor MPP de TypeScript |

---

## Qué incluye: resumen de características

| Característica | Descripción |
|---|---|
| **Sesiones** | Deposita una vez, solicitudes instantáneas de portador, reembolso al cerrar |
| **Streaming** | Contenido medido por pago por token mediante SSE |
| **Cargo** | Pago blindado o transparente por solicitud HTTP (flujo 402) |
| **Pagos transparentes** | Direcciones T con prevención de repetición por desafío + comando de blindaje |
| **Multicuenta** | Rotación de cuentas ZIP-32, transferencias entre cuentas y saldos por cuenta |
| **Billetera CLI** | Enviar, blindar, transferir, saldo --all, whoami, pago automático |
| **SDK dual** | TypeScript y Rust |
| **Compatible con la especificación** | Desafíos HMAC-SHA256, errores RFC 9457, descubrimiento de `/.well-known/payment` |

---

*Para más información, visita [zimppy.xyz](https://zimppy.xyz)*

---

## Páginas relacionadas

- [Billeteras](/using-zcash/wallets) — Zcash billeteras que admiten transacciones blindadas
- [Pools blindados](/using-zcash/shielded-pools) — Cómo las transacciones blindadas de Orchard protegen los datos de pago
- [Procesadores de pagos](/using-zcash/payment-processors) — Otras formas de aceptar pagos de Zcash
- [Activos blindados de Zcash](/zcash-tech/zcash-shielded-assets) — Los ZSA y el futuro de la programabilidad de Zcash
- [Proyectos comunitarios](/zcash-community/community-projects) — Más proyectos del ecosistema Zcash
