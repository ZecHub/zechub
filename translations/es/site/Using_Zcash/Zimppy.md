<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Zimppy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zimppy.xyz

## TL;DR

- **Zimppy** es una infraestructura de pagos centrada en la privacidad para agentes de IA que utiliza el Machine Payment Protocol (MPP) de Zcash
- **Deposita una vez** on-chain (~75 segundos), y luego realiza **solicitudes instantáneas ilimitadas** sin interacción con blockchain por solicitud
- Compatible con pagos de **Zcash (Orchard) totalmente blindados** — emisor, receptor, importe y memo están cifrados
- Funciona con SDKs de **TypeScript y Rust** para una integración sencilla en pipelines de IA y servidores de API
- Perfecto para **API de LLM, marketplaces de datos, servidores de herramientas MCP** y cualquier caso de uso de pagos M2M

---

> **Zimppy** es el método de pago Machine Payment Protocol (MPP) para Zcash que admite pagos tanto blindados como transparentes. Deposita una vez on-chain y después realiza solicitudes de portador instantáneas ilimitadas sin interacción con la cadena por solicitud.

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
7. [Configuración de la wallet Zimppy](#setting-up-the-zimppy-wallet)
8. [Integración de Zimppy](#integrating-zimppy--typescript-sdk)
   - [Servidor (blindado)](#typescript-server--shielded)
   - [Servidor (transparente)](#typescript-server--transparent)
   - [Cliente](#typescript-client)
9. [Integración de Zimppy - SDK de Rust](#integrating-zimppy--rust-sdk)
   - [Servidor de Rust (Axum)](#rust-server-axum)
   - [Cliente de Rust](#rust-client)
10. [Referencia de CLI](#cli-reference)
11. [Características clave](#key-features)
12. [Arquitectura](#architecture)
13. [Ejemplos y demostraciones](#examples--demos)

---

## ¿Qué es Zimppy.xyz?

**Zimppy.xyz** es una infraestructura de pagos centrada en la privacidad diseñada específicamente para agentes de IA y flujos de trabajo automatizados de máquina a máquina (M2M). Implementa el **Machine Payment Protocol (MPP)** utilizando **Zcash** como moneda subyacente, lo que permite modos de pago tanto blindados (totalmente privados) como transparentes.

A diferencia de los sistemas tradicionales de pagos con blockchain, donde cada transacción es visible públicamente on-chain, Zimppy está diseñado en torno a una arquitectura basada en sesiones que elimina la latencia por solicitud a la vez que preserva la privacidad criptográfica. Esto lo hace especialmente adecuado para agentes de IA que necesitan pagar programáticamente por API, datos, computación o herramientas de IA, sin filtrar metadatos de comportamiento.

### Propiedades principales

- **Deposita una vez** on-chain (~75 segundos para la confirmación de Zcash)
- **Solicitudes instantáneas ilimitadas** después de abrir una sesión, sin interacción con la cadena por solicitud
- Los **pagos blindados** cifran emisor, receptor, importe y memo usando el protocolo Orchard de Zcash
- Los **pagos transparentes** utilizan direcciones T por desafío para prevenir repeticiones sin privacidad total
- **Compatible con la especificación**, desafíos HMAC-SHA256, errores RFC 9457 y descubrimiento `/.well-known/payment`

---

## ¿Por qué pagos blindados para agentes de IA?

Para agentes de IA que manejan flujos de trabajo sensibles, investigaciones legales, consultas médicas, análisis financieros e inteligencia competitiva, **cada pago público es una filtración de metadatos**. Zimppy es el único método de pago MPP que es **privado por defecto**.

### Tabla comparativa de privacidad

| Propiedad | Cadenas públicas (USDC, ETH) | Zimppy blindado | Zimppy transparente |
|---|---|---|---|
| **Emisor** | Visible | Cifrado | Visible |
| **Receptor** | Visible | Cifrado | Por desafío (no vinculable) |
| **Importe** | Visible | Cifrado | Visible |
| **Memo** | Visible | Cifrado | N/A |
| **Protección contra repeticiones** | Ninguna | Vinculación de memo | Dirección T por desafío |
| **Patrón de uso del servicio** | Vinculable | Privado | No vinculable (dirección nueva) |

### El problema de latencia, resuelto mediante sesiones

> *"Pero Zcash tiene tiempos de bloque de 75 segundos."*

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

El **Machine Payment Protocol (MPP)** es un protocolo estandarizado que permite a los agentes de software autónomos (agentes de IA, bots, scripts) descubrir, negociar y cumplir requisitos de pago para acceder a API, todo ello sin intervención humana.

### Cómo se integra MPP con las API

MPP sigue el flujo HTTP **402 Payment Required**:

1. El **agente solicita** un recurso desde un endpoint de API de pago.
2. El **servidor responde** con `402 Payment Required` + un desafío firmado (importe, destinatario, memo).
3. El **agente paga** utilizando un método de pago compatible (por ejemplo, Zcash blindado de Zimppy).
4. El **agente reintenta** la solicitud con `Authorization: Payment {txid}`.
5. El **servidor verifica** criptográficamente el pago (descifrado de Orchard IVK, comprobación de importe + memo).
6. El **servidor responde** con `200 OK` + una cabecera `Payment-Receipt`.

### Compatibilidad con la especificación

- Firma de desafíos **HMAC-SHA256**
- Respuestas de error estructuradas **RFC 9457**
- Endpoint **`/.well-known/payment`** para el descubrimiento automático de métodos de pago
- **Orchard IVK** (Incoming Viewing Key) para la verificación de pagos del lado del servidor sin exponer claves de gasto

---

## Cómo funciona Zimppy

### Sesiones (recomendado)

Las sesiones son el patrón de interacción principal. El agente deposita un saldo on-chain una vez, recibe un token de portador y lo usa para todas las solicitudes posteriores sin latencia.

```
Agent  ->  deposit 100,000 zat           (on-chain, ~75s one-time)
Agent  ->  open session                  (bearer token issued)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  close session                 (refund unused balance on-chain)
```

**Ideal para:** Llamadas de API de alta frecuencia, inferencia de LLM, consultas repetidas de datos.

---

### Streaming

Contenido medido por pago por token entregado mediante **Server-Sent Events (SSE)**. El servidor descuenta del saldo de la sesión por cada palabra o token transmitido.

```
Agent  ->  open session with deposit
Agent  ->  GET /api/stream (SSE)
Server ->  stream word by word, deducting per token
Agent  ->  close session, refund remaining
```

**Ideal para:** Respuestas de LLM por streaming, fuentes de datos en tiempo real, herramientas de IA de pago por token.

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

**Ideal para:** Solicitudes puntuales de alto valor, llamadas de API poco frecuentes, endpoints de datos premium.

---

## Casos de uso y ejemplos

### 1. Agente de IA

Un agente de IA jurídico consulta una base de datos de jurisprudencia de pago. Con las sesiones blindadas de Zimppy, ni la identidad del despacho de abogados ni las consultas específicas son visibles on-chain, lo que protege el secreto profesional entre abogado y cliente a nivel de infraestructura.

```
Agent opens session (100,000 zat deposit)
-> GET /api/cases?q=patent+infringement+2024     (instant)
-> GET /api/cases?q=prior+art+semiconductor      (instant)
-> GET /api/document/US11234567B2                (instant)
Session closed, unused balance refunded
```

### 2. Agente de IA para pipeline de consultas médicas

Un agente de diagnóstico médico consulta varias bases de datos clínicas. Los pagos blindados garantizan que los patrones de consulta de los pacientes no puedan vincularse entre proveedores.

### 3. Agente de análisis financiero

Un agente de trading algorítmico paga por API de datos de mercado en tiempo real. Los pagos transparentes utilizan direcciones T nuevas por desafío, evitando la correlación de patrones de uso entre proveedores de datos.

### 4. Servidor de herramientas MCP, herramientas de IA de pago

Un servidor MCP (Model Context Protocol) expone herramientas de IA de pago. Cada invocación de herramienta activa un cargo de Zimppy, lo que permite un marketplace de capacidades de IA monetizadas.

### 5. Resumidor de LLM, pago por token

Un servicio de resumen con LLM cobra a los agentes por cada token de salida mediante streaming SSE, con descuento automático del saldo y reembolso del saldo prepagado no utilizado.

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

## Configuración de la wallet Zimppy

La CLI de Zimppy proporciona una interfaz completa de wallet. Todos los comandos están disponibles mediante `npx zimppy`.

### Paso 1 : Crear una wallet

```bash
npx zimppy wallet create
```

Genera claves criptográficas y muestra tu **frase semilla**. Guárdala de forma segura: no se puede recuperar si se pierde.

### Paso 2 : Consultar tu dirección y saldo

```bash
npx zimppy wallet whoami
```

Muestra tu **Unified Address (UA)**, **dirección T**, saldo actual y red activa.

```bash
npx zimppy wallet balance --all
```

Muestra un desglose del saldo por cuenta en todas las cuentas ZIP-32.

### Paso 3 : Financiar tu wallet

Envía ZEC a tu Unified Address desde cualquier wallet o exchange compatible con Zcash. Los depósitos blindados van directamente a tu cuenta Orchard.

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

### Paso 5 : Realizar una solicitud con pago automático

```bash
npx zimppy request <url>
```

Gestiona automáticamente el flujo completo 402 -> pago -> reintento. Las sesiones se abren y gestionan de forma transparente.

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
- `zcash({ wallet: 'server' })` carga la wallet blindada del servidor
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

Cada desafío genera una **dirección T nueva**, haciendo que las solicitudes de pago no sean vinculables entre sesiones.

---

### Cliente de TypeScript

```typescript
import { Mppx } from 'mppx/client'
import { zcash } from 'zimppy-ts/client'

const mppx = Mppx.create({ methods: [zcash({ wallet: 'default' })] })

// Session opened automatically; 402 is handled transparently
const res = await mppx.fetch('https://api.example.com/resource')
```

El cliente intercepta las respuestas `402`, abre una sesión automáticamente y reintenta la solicitud; el código de llamada no requiere lógica específica de pagos.

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
- `MppCharge<Price>` es un extractor de Axum que verifica el pago antes de que se ejecute el manejador
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

`send_with_payment` amplía cualquier cliente HTTP con gestión automática de 402, gestión de sesiones y cumplimiento de pagos con Zcash.

---

## Referencia de CLI

| Comando | Descripción |
|---|---|
| `npx zimppy wallet create` | Generar claves y mostrar frase semilla |
| `npx zimppy wallet whoami` | Mostrar dirección (UA + dirección T), saldo y red |
| `npx zimppy wallet balance --all` | Desglose del saldo por cuenta |
| `npx zimppy wallet send <addr> <zat>` | Enviar ZEC blindado o transparente |
| `npx zimppy wallet transfer <from> <to> <zat>` | Transferencia interna entre cuentas |
| `npx zimppy wallet shield` | Mover fondos transparentes a Orchard (blindado) |
| `npx zimppy wallet use <name>` | Cambiar la identidad activa de la wallet |
| `npx zimppy request <url>` | Solicitud automática 402 -> pago -> reintento |

---

## Características clave

### Wallets nativas para agentes

Las wallets de Zimppy están diseñadas para el uso programático por agentes de IA, no para extensiones de navegador gestionadas por humanos. Las claves se gestionan mediante la CLI o los SDK, las cuentas pueden rotarse mediante la **derivación de cuentas ZIP-32**, y la wallet admite flujos de pago totalmente automatizados sin aprobación humana por transacción.

### Compatibilidad con múltiples agentes

Varios agentes pueden operar desde la misma wallet mediante la **rotación de cuentas ZIP-32**: cada agente obtiene su propia cuenta con seguimiento de saldo aislado, capacidad de transferencia entre cuentas e informes de saldo por cuenta. Esto permite gestionar flotas de muchos agentes desde una única infraestructura de wallet.

### Transacciones de Zcash totalmente blindadas (Orchard)

Los pagos blindados usan el **protocolo Orchard** de Zcash, el pool blindado más reciente y seguro. El servidor verifica los pagos utilizando una **Incoming Viewing Key (IVK)**, que puede descifrar las notas recibidas sin exponer la clave de gasto. Los ataques de repetición se evitan mediante la **vinculación de memo**: cada desafío incorpora un memo único `zimppy:{challenge_id}` que se verifica criptográficamente.

### Sesiones, cero latencia por solicitud

La arquitectura de sesiones desacopla la espera de confirmación on-chain de la latencia por solicitud. Después de un único depósito (~75 segundos), todas las solicitudes posteriores con token de portador se atienden instantáneamente sin interacción con blockchain hasta el cierre de la sesión.

### Streaming, pago por token

La compatibilidad nativa con **SSE (Server-Sent Events)** permite contenido medido por pago por token. Es ideal para API de inferencia de LLM donde la longitud de salida es variable y la facturación debe reflejar el consumo real.

### Compatibilidad con la especificación

- Los desafíos firmados con **HMAC-SHA256** previenen falsificaciones
- Formato de error estructurado **RFC 9457** para una gestión interoperable de errores
- **`/.well-known/payment`** para el descubrimiento automático de métodos de pago por cualquier agente compatible con MPP

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

**`zimppy-core`** - El núcleo criptográfico. Gestiona el descifrado de notas Orchard utilizando la IVK del servidor, el análisis de memos, la lógica de protección contra repeticiones y la verificación de desafíos. Está escrito en Rust para ofrecer rendimiento y corrección.

**`zimppy-wallet`** - Una wallet nativa de Zcash impulsada por `zingolib`. Gestiona claves, cuentas, saldos blindados/transparentes y el envío de transacciones.

**`zimppy-rs`** - El SDK de Rust. Proporciona los traits `ChargeMethod`, `SessionMethod` y `PaymentProvider`, además de extractores de Axum (`MppCharge`, `WithReceipt`) para una integración ergonómica del servidor.

**`zimppy-napi`** - Enlaces NAPI-RS que exponen el núcleo de Rust a Node.js, permitiendo al SDK de TypeScript utilizar el mismo motor criptográfico sin reimplementar primitivas de Zcash en JavaScript.

**`zimppy-ts`** - El SDK de TypeScript. Envuelve los enlaces NAPI con API idiomáticas async/await para flujos de cargo, sesión y streaming SSE.

**`zimppy-cli`** - La wallet de línea de comandos y herramienta de solicitudes. Admite pago automático (402 -> pago -> reintento), gestión de sesiones y todas las operaciones de wallet.

---

## Ejemplos y demostraciones

| Ejemplo | Descripción |
|---|---|
| `examples/fortune-teller/` | Demostraciones de cargo, sesión y streaming - servidor + cliente de Rust |
| `examples/llm-summarizer/` | Demostración de streaming de LLM con pago por token |
| `examples/mcp-server/` | Servidor de herramientas MCP con herramientas de IA de pago |
| `examples/ts-server/` | Implementación de referencia de servidor MPP en TypeScript |

---

## Qué incluye - Resumen de características

| Característica | Descripción |
|---|---|
| **Sesiones** | Deposita una vez, solicitudes instantáneas con token de portador, reembolso al cerrar |
| **Streaming** | Contenido medido por pago por token mediante SSE |
| **Cargo** | Pago blindado o transparente por solicitud HTTP (flujo 402) |
| **Pagos transparentes** | Direcciones T con prevención de repeticiones por desafío + comando shield |
| **Multicuenta** | Rotación de cuentas ZIP-32, transferencias entre cuentas, saldos por cuenta |
| **Wallet CLI** | Enviar, blindar, transferir, saldo --all, whoami, pago automático |
| **SDK dual** | TypeScript y Rust |
| **Compatible con la especificación** | Desafíos HMAC-SHA256, errores RFC 9457, descubrimiento `/.well-known/payment` |

---

*Para más información, visita [zimppy.xyz](https://zimppy.xyz)*

---

## Páginas relacionadas

- [Wallets](/using-zcash/wallets) — Wallets de Zcash compatibles con transacciones blindadas
- [Pools blindados](/using-zcash/shielded-pools) — Cómo las transacciones blindadas de Orchard protegen los datos de pago
- [Procesadores de pagos](/using-zcash/payment-processors) — Otras formas de aceptar pagos con Zcash
- [Activos blindados de Zcash](/zcash-tech/zcash-shielded-assets) — ZSAs y el futuro de la programabilidad de Zcash
- [Proyectos de la comunidad](/zcash-community/community-projects) — Más proyectos del ecosistema Zcash
