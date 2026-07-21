<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/zimppy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar Página"/>
</a>

# Zimppy.xyz

## Resumo

- **Zimppy** é uma infraestrutura de pagamentos com privacidade em primeiro lugar para agentes de IA que usa o Machine Payment Protocol (MPP) do Zcash
- **Deposite uma vez** on-chain (~75 segundos) e depois faça **solicitações instantâneas ilimitadas** sem interação com a blockchain por solicitação
- Suporta pagamentos **Zcash totalmente blindados (Orchard)** — remetente, destinatário, valor e memo são todos criptografados
- Funciona com **SDKs em TypeScript e Rust** para fácil integração em pipelines de IA e servidores de API
- Perfeito para **APIs de LLM, mercados de dados, servidores de ferramentas MCP** e qualquer caso de uso de pagamento M2M

---

> **Zimppy** é o método de pagamento do Machine Payment Protocol (MPP) para Zcash, com suporte a pagamentos blindados e transparentes. Deposite uma vez on-chain e depois faça solicitações instantâneas ilimitadas com bearer token, sem interação com a chain por solicitação.

---

## Índice

1. [O que é Zimppy.xyz?](#what-is-zimppyxyz)
2. [Por que pagamentos blindados para agentes de IA?](#why-shielded-payments-for-ai-agents)
3. [Machine Payment Protocol (MPP)](#machine-payment-protocol-mpp)
4. [Como o Zimppy funciona](#how-zimppy-works)
   - [Sessões (Recomendado)](#sessions-recommended)
   - [Streaming](#streaming)
   - [Cobrança](#charge)
5. [Casos de uso e exemplos](#use-cases--examples)
6. [Instalação](#installation)
7. [Configurando a carteira Zimppy](#setting-up-the-zimppy-wallet)
8. [Integrando o Zimppy](#integrating-zimppy--typescript-sdk)
   - [Servidor (Blindado)](#typescript-server--shielded)
   - [Servidor (Transparente)](#typescript-server--transparent)
   - [Cliente](#typescript-client)
9. [Integrando o Zimppy - Rust SDK](#integrating-zimppy--rust-sdk)
   - [Servidor (Axum)](#rust-server-axum)
   - [Cliente](#rust-client)
10. [Referência da CLI](#cli-reference)
11. [Principais recursos](#key-features)
12. [Arquitetura](#architecture)
13. [Exemplos e demos](#examples--demos)

---

## O que é Zimppy.xyz?

**Zimppy.xyz** é uma infraestrutura de pagamentos com privacidade em primeiro lugar projetada especificamente para agentes de IA e fluxos de trabalho automatizados machine-to-machine (M2M). Ela implementa o **Machine Payment Protocol (MPP)** usando **Zcash** como moeda subjacente, permitindo modos de pagamento blindado (totalmente privado) e transparente.

Diferentemente dos sistemas tradicionais de pagamento em blockchain, nos quais cada transação é publicamente visível on-chain, o Zimppy foi projetado em torno de uma arquitetura baseada em sessões que elimina a latência por solicitação enquanto preserva a privacidade criptográfica. Isso o torna especialmente adequado para agentes de IA que precisam pagar por APIs, dados, computação ou ferramentas de IA de forma programática, sem vazar metadados comportamentais.

### Propriedades principais

- **Deposite uma vez** on-chain (~75 segundos para a confirmação do Zcash)
- **Solicitações instantâneas ilimitadas** após a abertura da sessão, com zero interação com a chain por solicitação
- **Pagamentos blindados** criptografam remetente, destinatário, valor e memo usando o protocolo Orchard do Zcash
- **Pagamentos transparentes** usam endereços T por desafio para prevenção de replay sem privacidade total
- **Compatível com a especificação**, desafios HMAC-SHA256, erros RFC 9457, descoberta em `/.well-known/payment`

---

## Por que pagamentos blindados para agentes de IA?

Para agentes de IA que lidam com fluxos de trabalho sensíveis, pesquisas jurídicas, consultas médicas, análises financeiras e inteligência competitiva, **cada pagamento público é um vazamento de metadados**. O Zimppy é o único método de pagamento MPP que é **privado por padrão**.

### Tabela de comparação de privacidade

| Property | Public Chains (USDC, ETH) | Zimppy Shielded | Zimppy Transparent |
|---|---|---|---|
| **Sender** | Visible | Encrypted | Visible |
| **Receiver** | Visible | Encrypted | Per-challenge (unlinkable) |
| **Amount** | Visible | Encrypted | Visible |
| **Memo** | Visible | Encrypted | N/A |
| **Replay Protection** | None | Memo binding | Per-challenge T-address |
| **Service Usage Pattern** | Linkable | Private | Unlinkable (fresh addr) |

### O problema da latência, resolvido por sessões

> *"Mas o Zcash tem tempos de bloco de 75 segundos."*

**As sessões resolvem isso.** A espera on-chain acontece exatamente **uma vez** no depósito. Cada solicitação subsequente é instantânea.

```
Agent  ->  deposit 100,000 zat           (one on-chain tx, ~75s)
Agent  ->  open session                  (bearer token issued)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
           ... hundreds of requests ...
Agent  ->  close session                 (refund unused balance)
```

**Pague uma vez, chame instantaneamente e receba o troco de volta.** A latência por solicitação é zero.

---

## Machine Payment Protocol (MPP)

O **Machine Payment Protocol (MPP)** é um protocolo padronizado que permite que agentes de software autônomos (agentes de IA, bots, scripts) descubram, negociem e cumpram requisitos de pagamento para acesso a APIs, tudo isso sem intervenção humana.

### Como o MPP se integra com APIs

O MPP segue o fluxo HTTP **402 Payment Required**:

1. **O agente solicita** um recurso de um endpoint de API pago.
2. **O servidor responde** com `402 Payment Required` + um desafio assinado (valor, destinatário, memo).
3. **O agente paga** usando um método de pagamento compatível (por exemplo, Zimppy shielded Zcash).
4. **O agente tenta novamente** a solicitação com `Authorization: Payment {txid}`.
5. **O servidor verifica** o pagamento criptograficamente (descriptografia Orchard IVK, verificação de valor + memo).
6. **O servidor responde** com `200 OK` + um cabeçalho `Payment-Receipt`.
### Conformidade com a Especificação

- assinatura de desafio **HMAC-SHA256**
- respostas de erro estruturadas **RFC 9457**
- endpoint **`/.well-known/payment`** para descoberta automática de método de pagamento
- **Orchard IVK** (Incoming Viewing Key) para verificação de pagamento no lado do servidor sem expor chaves de gasto

---

## Como o Zimppy Funciona

### Sessões (Recomendado)

As sessões são o principal padrão de interação. O agente deposita um saldo on-chain uma vez, recebe um bearer token e o usa para todas as solicitações subsequentes com latência zero.

```
Agent  ->  deposit 100,000 zat           (on-chain, ~75s one-time)
Agent  ->  open session                  (bearer token issued)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  close session                 (refund unused balance on-chain)
```

**Melhor para:** chamadas de API de alta frequência, inferência de LLM, consultas de dados repetidas.

---

### Streaming

Conteúdo medido por pagamento por token entregue por **Server-Sent Events (SSE)**. O servidor deduz do saldo da sessão por palavra ou token transmitido.

```
Agent  ->  open session with deposit
Agent  ->  GET /api/stream (SSE)
Server ->  stream word by word, deducting per token
Agent  ->  close session, refund remaining
```

**Melhor para:** respostas em streaming de LLM, feeds de dados em tempo real, ferramentas de IA com pagamento por token.

---

### Cobrança

Um único pagamento blindado por solicitação. O fluxo HTTP 402 completo é executado por chamada. Adequado quando as solicitações são pouco frequentes ou de alto valor.

```
Agent  ->  GET /api/resource
Server ->  402 + challenge (amount, recipient, memo)
Agent  ->  shielded ZEC with memo "zimppy:{challenge_id}"
Agent  ->  GET /api/resource + Authorization: Payment {txid}
Server ->  decrypt with Orchard IVK, verify amount + memo
Server ->  200 OK + Payment-Receipt
```

**Melhor para:** solicitações avulsas de alto valor, chamadas de API pouco frequentes, endpoints de dados premium.

---

## Casos de Uso e Exemplos

### 1. Agente de IA

Um agente jurídico de IA consulta um banco de dados pago de jurisprudência. Usando sessões blindadas do Zimppy, nem a identidade do escritório de advocacia nem as consultas específicas ficam visíveis on-chain — protegendo o sigilo advogado-cliente no nível da infraestrutura.

```
Agent opens session (100,000 zat deposit)
-> GET /api/cases?q=patent+infringement+2024     (instant)
-> GET /api/cases?q=prior+art+semiconductor      (instant)
-> GET /api/document/US11234567B2                (instant)
Session closed, unused balance refunded
```

### 2. Agente de IA para Pipeline de Consultas Médicas

Um agente de diagnóstico médico consulta múltiplos bancos de dados clínicos. Pagamentos blindados garantem que os padrões de consulta de pacientes não possam ser vinculados entre diferentes provedores.

### 3. Agente de Análise Financeira

Um agente de trading algorítmico paga por APIs de dados de mercado em tempo real. Pagamentos transparentes usam novos T-addresses para cada challenge, impedindo a correlação de padrões de uso entre fornecedores de dados.

### 4. Servidor de Ferramentas MCP, Ferramentas de IA Pagas

Um servidor MCP (Model Context Protocol) expõe ferramentas de IA pagas. Cada invocação de ferramenta dispara uma cobrança do Zimppy, viabilizando um mercado de capacidades de IA monetizadas.

### 5. Resumidor de LLM, Pagamento por Token

Um serviço de sumarização com LLM cobra agentes por token de saída via streaming SSE, com dedução automática de saldo e reembolso do saldo pré-pago não utilizado.

---

## Instalação

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

## Configurando a Carteira Zimppy

A CLI do Zimppy fornece uma interface completa de carteira. Todos os comandos estão disponíveis via `npx zimppy`.

### Etapa 1 : Criar uma Carteira

```bash
npx zimppy wallet create
```

Gera chaves criptográficas e exibe sua **frase-semente**. Armazene isso com segurança — não poderá ser recuperado se for perdido.

### Etapa 2 : Verificar Seu Endereço e Saldo

```bash
npx zimppy wallet whoami
```

Exibe seu **Unified Address (UA)**, **T-address**, saldo atual e rede ativa.

```bash
npx zimppy wallet balance --all
```

Mostra um detalhamento do saldo por conta em todas as contas ZIP-32.

### Etapa 3 : Financiar Sua Carteira

Envie ZEC para seu Unified Address a partir de qualquer carteira ou exchange compatível com Zcash. Depósitos blindados vão diretamente para sua conta Orchard.

### Etapa 4 : Enviar e Blindar Fundos

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

### Etapa 5 : Fazer uma Solicitação com Pagamento Automático

```bash
npx zimppy request <url>
```

Lida automaticamente com todo o fluxo 402 -> pay -> retry. As sessões são abertas e gerenciadas de forma transparente.

---

## Integrando o Zimppy - SDK TypeScript

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

**Pontos-chave:**
- `zcash({ wallet: 'server' })` carrega a carteira blindada do servidor
- `mppx.charge()` lida com todo o ciclo de vida de challenge/verificação do 402
- `result.withReceipt()` anexa o recibo criptográfico de pagamento à resposta

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

Cada desafio gera um **novo T-address**, tornando as solicitações de pagamento não vinculáveis entre sessões.

---

### Cliente TypeScript

```typescript
import { Mppx } from 'mppx/client'
import { zcash } from 'zimppy-ts/client'

const mppx = Mppx.create({ methods: [zcash({ wallet: 'default' })] })

// Session opened automatically; 402 is handled transparently
const res = await mppx.fetch('https://api.example.com/resource')
```

O cliente intercepta respostas `402`, abre uma sessão automaticamente e repete a solicitação - o código chamador não requer nenhuma lógica específica de pagamento.

---

## Integrando Zimppy - SDK Rust

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

**Pontos-chave:**
- `MppCharge<Price>` é um extractor do Axum que verifica o pagamento antes de o handler ser executado
- `WithReceipt` encapsula a resposta com um recibo de pagamento criptográfico
- `ChargeConfig` define a lógica de precificação - pode ser dinâmica com base nos parâmetros da solicitação

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

`send_with_payment` estende qualquer cliente HTTP com tratamento automático de 402, gerenciamento de sessão e liquidação de pagamentos em Zcash.

---

## Referência da CLI

| Comando | Descrição |
|---|---|
| `npx zimppy wallet create` | Gerar chaves e exibir a frase-semente |
| `npx zimppy wallet whoami` | Mostrar endereço (UA + T-addr), saldo, rede |
| `npx zimppy wallet balance --all` | Detalhamento de saldo por conta |
| `npx zimppy wallet send <addr> <zat>` | Enviar ZEC blindado ou transparente |
| `npx zimppy wallet transfer <from> <to> <zat>` | Transferência interna entre contas |
| `npx zimppy wallet shield` | Mover fundos transparentes para Orchard (blindado) |
| `npx zimppy wallet use <name>` | Alternar a identidade ativa da wallet |
| `npx zimppy request <url>` | Auto 402 -> pagar -> repetir solicitação |

---

## Principais Recursos

### Wallets Nativas para Agentes

As wallets do Zimppy são projetadas para uso programático por agentes de IA - não para extensões de navegador gerenciadas por humanos. As chaves são gerenciadas via CLI ou SDKs, as contas podem ser rotacionadas via **derivação de conta ZIP-32**, e a wallet oferece suporte a fluxos de pagamento totalmente automatizados sem aprovação humana por transação.

### Suporte Multiagente

Vários agentes podem operar a partir da mesma wallet usando **rotação de conta ZIP-32** - cada agente recebe sua própria conta com rastreamento de saldo isolado, capacidade de transferência entre contas e relatório de saldo por conta. Isso possibilita o gerenciamento de uma frota de muitos agentes a partir de uma única infraestrutura de wallet.

### Transações Zcash Totalmente Blindadas (Orchard)

Pagamentos blindados usam o **protocolo Orchard** do Zcash - o pool blindado mais recente e mais seguro. O servidor verifica pagamentos usando uma **Incoming Viewing Key (IVK)**, que pode descriptografar notas recebidas sem expor a chave de gasto. Ataques de repetição são evitados via **memo binding** - cada desafio incorpora um memo único `zimppy:{challenge_id}` que é verificado criptograficamente.

### Sessões , Zero Latência por Solicitação

A arquitetura de sessão desacopla a espera pela confirmação on-chain da latência por solicitação. Após um único depósito (~75 segundos), todas as solicitações subsequentes com bearer token são atendidas instantaneamente sem interação com a blockchain até o encerramento da sessão.

### Streaming , Pagamento por Token

O suporte nativo a **SSE (Server-Sent Events)** permite conteúdo medido com pagamento por token. Ideal para APIs de inferência de LLM, em que o tamanho da saída é variável e a cobrança deve refletir o consumo real.

### Conformidade com a Especificação

- Desafios assinados com **HMAC-SHA256** evitam falsificações
- Formato de erro estruturado **RFC 9457** para tratamento de erros interoperável
- **`/.well-known/payment`** para descoberta automática do método de pagamento por qualquer agente compatível com MPP

---

## Arquitetura

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

### Responsabilidades dos Componentes

**`zimppy-core`** - O núcleo criptográfico. Lida com a descriptografia de notas Orchard usando a IVK do servidor, análise de memo, lógica de proteção contra repetição e verificação de desafios. Escrito em Rust para desempenho e correção.

**`zimppy-wallet`** - Uma wallet Zcash nativa baseada em `zingolib`. Gerencia chaves, contas, saldos blindados/transparentes e envio de transações.

**`zimppy-rs`** - O SDK Rust. Fornece os traits `ChargeMethod`, `SessionMethod` e `PaymentProvider`, além de extractors do Axum (`MppCharge`, `WithReceipt`) para integração ergonômica no servidor.

**`zimppy-napi`** - Bindings NAPI-RS que expõem o núcleo Rust ao Node.js, permitindo que o SDK TypeScript use o mesmo mecanismo criptográfico sem reimplementar primitivas do Zcash em JavaScript.

**`zimppy-ts`** - O SDK TypeScript. Encapsula os bindings NAPI com APIs idiomáticas async/await para fluxos de cobrança, sessão e streaming SSE.

**`zimppy-cli`** - A wallet de linha de comando e ferramenta de solicitações. Suporta auto-pay (402 -> pagar -> repetir), gerenciamento de sessão e todas as operações da wallet.

---
## Exemplos e Demonstrações

| Exemplo | Descrição |
|---|---|
| `examples/fortune-teller/` | Demonstrações de cobrança, sessão e streaming - servidor Rust + cliente |
| `examples/llm-summarizer/` | Demonstração de streaming de LLM com pagamento por token |
| `examples/mcp-server/` | Servidor de ferramentas MCP com ferramentas de IA pagas |
| `examples/ts-server/` | Implementação de referência do servidor MPP em TypeScript |

---

## O que está Incluído - Resumo dos Recursos

| Recurso | Descrição |
|---|---|
| **Sessions** | Deposite uma vez, requisições instantâneas com bearer, reembolso ao encerrar |
| **Streaming** | Conteúdo medido com pagamento por token via SSE |
| **Charge** | Pagamento blindado ou transparente por requisição HTTP (fluxo 402) |
| **Transparent Payments** | T-addresses com prevenção de repetição por desafio + comando shield |
| **Multi-Account** | Rotação de contas ZIP-32, transferências entre contas, saldos por conta |
| **CLI Wallet** | Enviar, blindar, transferir, saldo `--all`, whoami, auto-pay |
| **Dual SDK** | TypeScript e Rust |
| **Spec-Compliant** | Desafios HMAC-SHA256, erros RFC 9457, descoberta `/.well-known/payment` |

---

*Para mais informações, visite [zimppy.xyz](https://zimppy.xyz)*

---

## Páginas Relacionadas

- [Carteiras](/using-zcash/wallets) — Carteiras Zcash que oferecem suporte a transações blindadas
- [Pools Blindados](/using-zcash/shielded-pools) — Como as transações blindadas Orchard protegem os dados de pagamento
- [Processadores de Pagamento](/using-zcash/payment-processors) — Outras formas de aceitar pagamentos em Zcash
- [Zcash Shielded Assets](/zcash-tech/zcash-shielded-assets) — ZSAs e o futuro da programabilidade do Zcash
- [Projetos da Comunidade](/zcash-community/community-projects) — Mais projetos do ecossistema Zcash
