<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/zimppy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# Zimppy.xyz

## TL;DR

- **Zimppy** es una infraestructura de pagos centrada en la privacidad para agentes de IA que utiliza el Machine Payment Protocol (MPP) de Zcash
- **Deposita una vez** on-chain (~75 segundos), luego realiza **solicitudes instantáneas ilimitadas** sin interacción con la blockchain por cada solicitud
- Compatible con pagos de **Zcash completamente blindados (Orchard)**: remitente, receptor, monto y memo están todos cifrados
- Funciona con **SDKs de TypeScript y Rust** para una integración sencilla en pipelines de IA y servidores de API
- Perfecto para **APIs de LLM, mercados de datos, servidores de herramientas MCP** y cualquier caso de uso de pagos M2M

---

> **Zimppy** es el método de pago Machine Payment Protocol (MPP) para Zcash que admite tanto pagos blindados como transparentes. Deposita una vez on-chain y luego realiza solicitudes instantáneas ilimitadas con portador, sin interacción con la cadena por cada solicitud.

---

## Tabla de contenidos

1. [¿Qué es Zimppy.xyz?](#what-is-zimppyxyz)
2. [¿Por qué pagos blindados para agentes de IA?](#why-shielded-payments-for-ai-agents)
3. [Machine Payment Protocol (MPP)](#machine-payment-protocol-mpp)
4. [Cómo funciona Zimppy](#how-zimppy-works)
   - [Sesiones (Recomendado)](#sessions-recommended)
   - [Streaming](#streaming)
   - [Charge](#charge)
5. [Casos de uso y ejemplos](#use-cases--examples)
6. [Instalación](#installation)
7. [Configuración de la billetera de Zimppy](#setting-up-the-zimppy-wallet)
8. [Integración de Zimppy](#integrating-zimppy--typescript-sdk)
   - [Servidor (Blindado)](#typescript-server--shielded)
   - [Servidor (Transparente)](#typescript-server--transparent)
   - [Cliente](#typescript-client)
9. [Integración de Zimppy - SDK de Rust](#integrating-zimppy--rust-sdk)
   - [Servidor (Axum)](#rust-server-axum)
   - [Cliente](#rust-client)
10. [Referencia de CLI](#cli-reference)
11. [Características clave](#key-features)
12. [Arquitectura](#architecture)
13. [Ejemplos y demos](#examples--demos)

---

## ¿Qué es Zimppy.xyz?

**Zimppy.xyz** es una infraestructura de pagos centrada en la privacidad diseñada específicamente para agentes de IA y flujos de trabajo automatizados de máquina a máquina (M2M). Implementa el **Machine Payment Protocol (MPP)** usando **Zcash** como moneda subyacente, permitiendo modos de pago tanto blindados (totalmente privados) como transparentes.

A diferencia de los sistemas tradicionales de pago en blockchain, donde cada transacción es públicamente visible on-chain, Zimppy está diseñado en torno a una arquitectura basada en sesiones que elimina la latencia por solicitud mientras preserva la privacidad criptográfica. Esto lo hace especialmente adecuado para agentes de IA que necesitan pagar por APIs, datos, cómputo o herramientas de IA de forma programática, sin filtrar metadatos de comportamiento.

### Propiedades principales

- **Deposita una vez** on-chain (~75 segundos para la confirmación de Zcash)
- **Solicitudes instantáneas ilimitadas** después de abrir la sesión, sin interacción con la cadena por solicitud
- Los **pagos blindados** cifran remitente, receptor, monto y memo usando el protocolo Orchard de Zcash
- Los **pagos transparentes** usan direcciones T por desafío para prevenir repeticiones sin privacidad total
- **Cumple con la especificación**, desafíos HMAC-SHA256, errores RFC 9457, descubrimiento `/.well-known/payment`

---

## ¿Por qué pagos blindados para agentes de IA?

Para agentes de IA que manejan flujos de trabajo sensibles, investigación legal, consultas médicas, análisis financieros, inteligencia competitiva para **cada pago público es una filtración de metadatos**. Zimppy es el único método de pago MPP que es **privado por defecto**.

### Tabla comparativa de privacidad

| Property | Public Chains (USDC, ETH) | Zimppy Shielded | Zimppy Transparent |
|---|---|---|---|
| **Sender** | Visible | Encrypted | Visible |
| **Receiver** | Visible | Encrypted | Per-challenge (unlinkable) |
| **Amount** | Visible | Encrypted | Visible |
| **Memo** | Visible | Encrypted | N/A |
| **Replay Protection** | None | Memo binding | Per-challenge T-address |
| **Service Usage Pattern** | Linkable | Private | Unlinkable (fresh addr) |

### El problema de la latencia, resuelto con sesiones

> *"Pero Zcash tiene tiempos de bloque de 75 segundos."*

**Las sesiones resuelven esto.** La espera on-chain ocurre exactamente **una vez** en el depósito. Cada solicitud posterior es instantánea.

```
Agent  ->  deposit 100,000 zat           (one on-chain tx, ~75s)
Agent  ->  open session                  (bearer token issued)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
           ... hundreds of requests ...
Agent  ->  close session                 (refund unused balance)
```

**Paga una vez, llama al instante, recupera el cambio.** La latencia por solicitud es cero.

---

## Machine Payment Protocol (MPP)

El **Machine Payment Protocol (MPP)** es un protocolo estandarizado que permite a agentes de software autónomos (agentes de IA, bots, scripts) descubrir, negociar y cumplir requisitos de pago para acceso a APIs, todo sin intervención humana.

### Cómo se integra MPP con las APIs

MPP sigue el flujo HTTP de **402 Payment Required**:

1. **El agente solicita** un recurso desde un endpoint de API de pago.
2. **El servidor responde** con `402 Payment Required` + un desafío firmado (monto, destinatario, memo).
3. **El agente paga** usando un método de pago compatible (p. ej., Zimppy shielded Zcash).
4. **El agente reintenta** la solicitud con `Authorization: Payment {txid}`.
5. **El servidor verifica** el pago criptográficamente (descifrado Orchard IVK, verificación de monto + memo).
6. **El servidor responde** con `200 OK` + un encabezado `Payment-Receipt`.
### Cumplimiento de especificaciones

- Firma de desafío **HMAC-SHA256**
- Respuestas de error estructuradas **RFC 9457**
- Endpoint **`/.well-known/payment`** para el descubrimiento automático del método de pago
- **Orchard IVK** (Incoming Viewing Key) para la verificación de pagos del lado del servidor sin exponer claves de gasto

---

## Cómo funciona Zimppy

### Sesiones (recomendado)

Las sesiones son el patrón principal de interacción. El agente deposita un saldo on-chain una vez, recibe un token bearer y lo usa para todas las solicitudes posteriores con latencia cero.

```
Agent  ->  deposit 100,000 zat           (on-chain, ~75s one-time)
Agent  ->  open session                  (bearer token issued)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  close session                 (refund unused balance on-chain)
```

**Ideal para:** llamadas frecuentes a la API, inferencia de LLM, consultas de datos repetidas.

---

### Streaming

Contenido medido por pago por token entregado mediante **Server-Sent Events (SSE)**. El servidor descuenta del saldo de la sesión por cada palabra o token transmitido.

```
Agent  ->  open session with deposit
Agent  ->  GET /api/stream (SSE)
Server ->  stream word by word, deducting per token
Agent  ->  close session, refund remaining
```

**Ideal para:** respuestas de streaming de LLM, feeds de datos en tiempo real, herramientas de IA de pago por token.

---

### Cargo

Un único pago blindado por solicitud. El flujo HTTP 402 completo se ejecuta por cada llamada. Adecuado cuando las solicitudes son poco frecuentes o de alto valor.

```
Agent  ->  GET /api/resource
Server ->  402 + challenge (amount, recipient, memo)
Agent  ->  shielded ZEC with memo "zimppy:{challenge_id}"
Agent  ->  GET /api/resource + Authorization: Payment {txid}
Server ->  decrypt with Orchard IVK, verify amount + memo
Server ->  200 OK + Payment-Receipt
```

**Ideal para:** solicitudes puntuales de alto valor, llamadas poco frecuentes a la API, endpoints de datos premium.

---

## Casos de uso y ejemplos

### 1. Agente de IA

Un agente de IA legal consulta una base de datos de jurisprudencia de pago. Al usar sesiones blindadas de Zimppy, ni la identidad del bufete ni las consultas específicas son visibles on-chain, lo que protege el privilegio abogado-cliente a nivel de infraestructura.

```
Agent opens session (100,000 zat deposit)
-> GET /api/cases?q=patent+infringement+2024     (instant)
-> GET /api/cases?q=prior+art+semiconductor      (instant)
-> GET /api/document/US11234567B2                (instant)
Session closed, unused balance refunded
```

### 2. Agente de IA para pipeline de consultas médicas

Un agente de diagnóstico médico consulta múltiples bases de datos clínicas. Los pagos blindados garantizan que los patrones de consulta de pacientes no puedan vincularse entre proveedores.

### 3. Agente de análisis financiero

Un agente de trading algorítmico paga por APIs de datos de mercado en tiempo real. Los pagos transparentes usan direcciones T nuevas por cada desafío, evitando la correlación de patrones de uso entre proveedores de datos.

### 4. Servidor de herramientas MCP, herramientas de IA de pago

Un servidor MCP (Model Context Protocol) expone herramientas de IA de pago. Cada invocación de herramienta activa un cargo de Zimppy, lo que habilita un mercado de capacidades de IA monetizadas.

### 5. Resumidor LLM, pago por token

Un servicio de resumen con LLM cobra a los agentes por token de salida mediante streaming SSE, con deducción automática del saldo y reembolso del saldo prepago no utilizado.

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

## Configuración de la wallet de Zimppy

La CLI de Zimppy proporciona una interfaz completa de wallet. Todos los comandos están disponibles mediante `npx zimppy`.

### Paso 1 : Crear una wallet

```bash
npx zimppy wallet create
```

Genera claves criptográficas y muestra tu **frase semilla**. Guárdala de forma segura: no puede recuperarse si se pierde.

### Paso 2 : Verificar tu dirección y saldo

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

### Paso 5 : Realizar una solicitud de pago automático

```bash
npx zimppy request <url>
```

Gestiona automáticamente el flujo completo 402 -> pay -> retry. Las sesiones se abren y administran de forma transparente.

---

## Integración de Zimppy - SDK de TypeScript

### Servidor TypeScript - Blindado

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
- `result.withReceipt()` adjunta el recibo criptográfico de pago a la respuesta

---
### Servidor TypeScript - Transparente

```typescript
import { Mppx } from 'mppx/server'
import { zcashTransparent } from 'zimppy-ts/server'

const mppx = Mppx.create({
  methods: [await zcashTransparent({ wallet: 'server' })],
  // per-challenge T-address generated automatically (replay-safe)
})
```

Cada desafío genera una **T-address nueva**, lo que hace que las solicitudes de pago no puedan vincularse entre sesiones.

---

### Cliente TypeScript

```typescript
import { Mppx } from 'mppx/client'
import { zcash } from 'zimppy-ts/client'

const mppx = Mppx.create({ methods: [zcash({ wallet: 'default' })] })

// Session opened automatically; 402 is handled transparently
const res = await mppx.fetch('https://api.example.com/resource')
```

El cliente intercepta las respuestas `402`, abre una sesión automáticamente y reintenta la solicitud; el código que llama no requiere ninguna lógica específica de pago.

---

## Integración de Zimppy - SDK de Rust

### Servidor Rust (Axum)

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

### Cliente Rust

```rust
use mpp::client::Fetch;
use zimppy_rs::ZcashPaymentProvider;

let provider = ZcashPaymentProvider::new(wallet_config, &rpc);

let resp = client
    .get("https://api.example.com/resource")
    .send_with_payment(&provider)
    .await?;
```

`send_with_payment` amplía cualquier cliente HTTP con manejo automático de 402, gestión de sesiones y cumplimiento de pagos con Zcash.

---

## Referencia de CLI

| Command | Description |
|---|---|
| `npx zimppy wallet create` | Generar claves y mostrar la frase semilla |
| `npx zimppy wallet whoami` | Mostrar dirección (UA + T-addr), saldo, red |
| `npx zimppy wallet balance --all` | Desglose de saldo por cuenta |
| `npx zimppy wallet send <addr> <zat>` | Enviar ZEC blindado o transparente |
| `npx zimppy wallet transfer <from> <to> <zat>` | Transferencia interna entre cuentas |
| `npx zimppy wallet shield` | Mover fondos transparentes a Orchard (blindado) |
| `npx zimppy wallet use <name>` | Cambiar la identidad activa de la wallet |
| `npx zimppy request <url>` | Auto 402 -> pagar -> reintentar solicitud |

---

## Características clave

### Wallets nativas para agentes

Las wallets de Zimppy están diseñadas para uso programático por agentes de IA, no para extensiones de navegador administradas por humanos. Las claves se gestionan mediante la CLI o los SDK, las cuentas pueden rotarse mediante **derivación de cuentas ZIP-32**, y la wallet admite flujos de pago totalmente automatizados sin aprobación humana por transacción.

### Soporte multiagente

Múltiples agentes pueden operar desde la misma wallet usando **rotación de cuentas ZIP-32**: cada agente obtiene su propia cuenta con seguimiento de saldo aislado, capacidad de transferencia entre cuentas e informes de saldo por cuenta. Esto permite gestionar flotas de muchos agentes desde una única infraestructura de wallet.

### Transacciones de Zcash totalmente blindadas (Orchard)

Los pagos blindados usan el **protocolo Orchard** de Zcash, el pool blindado más reciente y seguro. El servidor verifica los pagos mediante una **Incoming Viewing Key (IVK)**, que puede descifrar las notas recibidas sin exponer la clave de gasto. Los ataques de repetición se previenen mediante **memo binding**: cada desafío incrusta un memo único `zimppy:{challenge_id}` que se verifica criptográficamente.

### Sesiones , latencia cero por solicitud

La arquitectura de sesiones desacopla la espera de confirmación on-chain de la latencia por solicitud. Después de un único depósito (~75 segundos), todas las solicitudes posteriores con bearer token se atienden instantáneamente sin interacción con la blockchain hasta el cierre de la sesión.

### Streaming , pago por token

El soporte nativo de **SSE (Server-Sent Events)** permite contenido medido con pago por token. Ideal para APIs de inferencia de LLM donde la longitud de salida es variable y la facturación debe reflejar el consumo real.

### Cumplimiento de la especificación

- Los desafíos firmados con **HMAC-SHA256** previenen la falsificación
- Formato de error estructurado **RFC 9457** para un manejo de errores interoperable
- **`/.well-known/payment`** para el descubrimiento automático del método de pago por cualquier agente compatible con MPP

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

**`zimppy-core`** - El núcleo criptográfico. Maneja el descifrado de notas de Orchard usando la IVK del servidor, el análisis de memos, la lógica de protección contra repetición y la verificación de desafíos. Escrito en Rust para rendimiento y corrección.

**`zimppy-wallet`** - Una wallet nativa de Zcash impulsada por `zingolib`. Gestiona claves, cuentas, saldos blindados/transparentes y el envío de transacciones.

**`zimppy-rs`** - El SDK de Rust. Proporciona los traits `ChargeMethod`, `SessionMethod` y `PaymentProvider`, además de extractores de Axum (`MppCharge`, `WithReceipt`) para una integración ergonómica del servidor.

**`zimppy-napi`** - Enlaces NAPI-RS que exponen el núcleo de Rust a Node.js, permitiendo que el SDK de TypeScript use el mismo motor criptográfico sin reimplementar primitivas de Zcash en JavaScript.

**`zimppy-ts`** - El SDK de TypeScript. Envuelve los enlaces NAPI con APIs idiomáticas de async/await para flujos de charge, session y streaming SSE.

**`zimppy-cli`** - La wallet de línea de comandos y herramienta de solicitudes. Soporta auto-pago (402 -> pagar -> reintentar), gestión de sesiones y todas las operaciones de la wallet.

---
## Ejemplos y Demos

| Ejemplo | Descripción |
|---|---|
| `examples/fortune-teller/` | Demos de cobro, sesión y streaming - servidor Rust + cliente |
| `examples/llm-summarizer/` | Demo de streaming de LLM con pago por token |
| `examples/mcp-server/` | Servidor de herramientas MCP con herramientas de IA de pago |
| `examples/ts-server/` | Implementación de referencia del servidor MPP en TypeScript |

---

## Qué Incluye - Resumen de Funcionalidades

| Funcionalidad | Descripción |
|---|---|
| **Sessions** | Deposita una vez, solicitudes instantáneas con bearer, reembolso al cerrar |
| **Streaming** | Contenido medido con pago por token a través de SSE |
| **Charge** | Pago blindado o transparente por solicitud HTTP (flujo 402) |
| **Transparent Payments** | Direcciones T con prevención de repetición por desafío + comando shield |
| **Multi-Account** | Rotación de cuentas ZIP-32, transferencias entre cuentas, saldos por cuenta |
| **CLI Wallet** | Enviar, shield, transferir, balance --all, whoami, auto-pay |
| **Dual SDK** | TypeScript y Rust |
| **Spec-Compliant** | Desafíos HMAC-SHA256, errores RFC 9457, descubrimiento `/.well-known/payment` |

---

*Para más información, visita [zimppy.xyz](https://zimppy.xyz)*

---

## Páginas Relacionadas

- [Billeteras](/using-zcash/wallets) — Billeteras de Zcash que admiten transacciones blindadas
- [Pools Blindados](/using-zcash/shielded-pools) — Cómo las transacciones blindadas Orchard protegen los datos de pago
- [Procesadores de Pago](/using-zcash/payment-processors) — Otras formas de aceptar pagos en Zcash
- [Activos Blindados de Zcash](/zcash-tech/zcash-shielded-assets) — ZSAs y el futuro de la programabilidad de Zcash
- [Proyectos de la Comunidad](/zcash-community/community-projects) — Más proyectos del ecosistema de Zcash
