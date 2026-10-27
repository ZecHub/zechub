<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Zimppy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zimppy.xyz

## TL;DR

- **Zimppy** é uma infraestrutura de pagamentos centrada na privacidade para agentes de IA que utiliza o Machine Payment Protocol (MPP) do Zcash
- **Deposite uma vez** on-chain (~75 segundos) e, em seguida, faça **solicitações instantâneas ilimitadas** sem interação com a blockchain por solicitação
- Suporta pagamentos **Zcash totalmente blindados (Orchard)** — remetente, destinatário, valor e memorando são todos criptografados
- Funciona com **SDKs de TypeScript e Rust** para fácil integração com pipelines de IA e servidores de API
- Perfeito para **APIs de LLM, marketplaces de dados, servidores de ferramentas MCP** e qualquer caso de uso de pagamentos M2M

---

> **Zimppy** é o método de pagamento do Machine Payment Protocol (MPP) para o Zcash, com suporte a pagamentos blindados e transparentes. Deposite uma vez on-chain e, em seguida, faça solicitações instantâneas ilimitadas ao portador, sem interação com a chain por solicitação.

---

## Índice

1. [O que é o Zimppy.xyz?](#what-is-zimppyxyz)
2. [Por que pagamentos blindados para agentes de IA?](#why-shielded-payments-for-ai-agents)
3. [Machine Payment Protocol (MPP)](#machine-payment-protocol-mpp)
4. [Como funciona o Zimppy](#how-zimppy-works)
   - [Sessões (recomendado)](#sessions-recommended)
   - [Streaming](#streaming)
   - [Cobrança](#charge)
5. [Casos de uso e exemplos](#use-cases--examples)
6. [Instalação](#installation)
7. [Configurando a carteira Zimppy](#setting-up-the-zimppy-wallet)
8. [Integrando o Zimppy](#integrating-zimppy--typescript-sdk)
   - [Servidor (blindado)](#typescript-server--shielded)
   - [Servidor (transparente)](#typescript-server--transparent)
   - [Cliente](#typescript-client)
9. [Integrando o Zimppy - SDK Rust](#integrating-zimppy--rust-sdk)
   - [Servidor (Axum)](#rust-server-axum)
   - [Cliente](#rust-client)
10. [Referência da CLI](#cli-reference)
11. [Funcionalidades principais](#key-features)
12. [Arquitetura](#architecture)
13. [Exemplos e demonstrações](#examples--demos)

---

## O que é o Zimppy.xyz?

**Zimppy.xyz** é uma infraestrutura de pagamentos centrada na privacidade, projetada especificamente para agentes de IA e fluxos de trabalho automatizados de máquina para máquina (M2M). Implementa o **Machine Payment Protocol (MPP)** usando o **Zcash** como moeda subjacente, permitindo modos de pagamento blindados (totalmente privados) e transparentes.

Ao contrário dos sistemas tradicionais de pagamento por blockchain, nos quais cada transação é visível publicamente on-chain, o Zimppy foi desenvolvido com uma arquitetura baseada em sessões que elimina a latência por solicitação enquanto preserva a privacidade criptográfica. Isso o torna especialmente adequado para agentes de IA que precisam pagar programaticamente por APIs, dados, computação ou ferramentas de IA, sem revelar metadados comportamentais.

### Propriedades principais

- **Deposite uma vez** on-chain (~75 segundos para confirmação do Zcash)
- **Solicitações instantâneas ilimitadas** após a abertura da sessão, sem interação com a chain por solicitação
- **Pagamentos blindados** criptografam remetente, destinatário, valor e memorando usando o protocolo Orchard do Zcash
- **Pagamentos transparentes** usam endereços T por desafio para prevenção de repetição sem privacidade total
- **Em conformidade com a especificação**, desafios HMAC-SHA256, erros RFC 9457, descoberta `/.well-known/payment`

---

## Por que pagamentos blindados para agentes de IA?

Para agentes de IA que lidam com fluxos de trabalho sensíveis, pesquisas jurídicas, consultas médicas, análises financeiras ou inteligência competitiva, **cada pagamento público representa um vazamento de metadados**. Zimppy é o único método de pagamento MPP que é **privado por padrão**.

### Tabela de comparação de privacidade

| Property | Chains públicas (USDC, ETH) | Zimppy blindado | Zimppy transparente |
|---|---|---|---|
| **Sender** | Visível | Criptografado | Visível |
| **Receiver** | Visível | Criptografado | Por desafio (não vinculável) |
| **Amount** | Visível | Criptografado | Visível |
| **Memo** | Visível | Criptografado | N/D |
| **Replay Protection** | Nenhuma | Vinculação de memorando | Endereço T por desafio |
| **Service Usage Pattern** | Vinculável | Privado | Não vinculável (endereço novo) |

### O problema da latência, resolvido por sessões

> *"Mas o Zcash tem tempos de bloco de 75 segundos."*

**As sessões resolvem isso.** A espera on-chain ocorre exatamente **uma vez**, no depósito. Todas as solicitações subsequentes são instantâneas.

```
Agent  ->  deposit 100,000 zat           (one on-chain tx, ~75s)
Agent  ->  open session                  (bearer token issued)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
           ... hundreds of requests ...
Agent  ->  close session                 (refund unused balance)
```

**Pague uma vez, chame instantaneamente, receba o troco.** A latência por solicitação é zero.

---

## Machine Payment Protocol (MPP)

O **Machine Payment Protocol (MPP)** é um protocolo padronizado que permite que agentes de software autônomos (agentes de IA, bots, scripts) descubram, negociem e cumpram requisitos de pagamento para acesso a APIs, tudo sem intervenção humana.

### Como o MPP se integra com APIs

O MPP segue o fluxo HTTP **402 Payment Required**:

1. O **agente solicita** um recurso de um endpoint de API pago.
2. O **servidor responde** com `402 Payment Required` + um desafio assinado (valor, destinatário, memorando).
3. O **agente paga** usando um método de pagamento compatível (por exemplo, Zcash blindado pelo Zimppy).
4. O **agente tenta novamente** a solicitação com `Authorization: Payment {txid}`.
5. O **servidor verifica** o pagamento criptograficamente (descriptografia da Orchard IVK, verificação de valor + memorando).
6. O **servidor responde** com `200 OK` + um cabeçalho `Payment-Receipt`.

### Conformidade com a especificação

- Assinatura de desafios **HMAC-SHA256**
- Respostas de erro estruturadas **RFC 9457**
- Endpoint **`/.well-known/payment`** para descoberta automática de métodos de pagamento
- **Orchard IVK** (Incoming Viewing Key) para verificação de pagamentos no servidor sem expor chaves de gastos

---

## Como funciona o Zimppy

### Sessões (recomendado)

As sessões são o principal padrão de interação. O agente deposita um saldo on-chain uma vez, recebe um token ao portador e o usa para todas as solicitações subsequentes sem latência.

```
Agent  ->  deposit 100,000 zat           (on-chain, ~75s one-time)
Agent  ->  open session                  (bearer token issued)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  close session                 (refund unused balance on-chain)
```

**Ideal para:** Chamadas de API de alta frequência, inferência de LLM, consultas de dados repetidas.

---

### Streaming

Conteúdo medido por token, entregue por **Server-Sent Events (SSE)**. O servidor deduz do saldo da sessão por cada palavra ou token transmitido.

```
Agent  ->  open session with deposit
Agent  ->  GET /api/stream (SSE)
Server ->  stream word by word, deducting per token
Agent  ->  close session, refund remaining
```

**Ideal para:** Respostas de streaming de LLM, feeds de dados em tempo real, ferramentas de IA pagas por token.

---

### Cobrança

Um único pagamento blindado por solicitação. O fluxo HTTP 402 completo é executado a cada chamada. Adequado quando as solicitações são pouco frequentes ou de alto valor.

```
Agent  ->  GET /api/resource
Server ->  402 + challenge (amount, recipient, memo)
Agent  ->  shielded ZEC with memo "zimppy:{challenge_id}"
Agent  ->  GET /api/resource + Authorization: Payment {txid}
Server ->  decrypt with Orchard IVK, verify amount + memo
Server ->  200 OK + Payment-Receipt
```

**Ideal para:** Solicitações pontuais de alto valor, chamadas de API pouco frequentes, endpoints de dados premium.

---

## Casos de uso e exemplos

### 1. Agente de IA

Um agente jurídico de IA consulta uma base de dados paga de jurisprudência. Usando sessões blindadas do Zimppy, nem a identidade do escritório de advocacia nem as consultas específicas são visíveis on-chain — protegendo o sigilo entre advogado e cliente no nível da infraestrutura.

```
Agent opens session (100,000 zat deposit)
-> GET /api/cases?q=patent+infringement+2024     (instant)
-> GET /api/cases?q=prior+art+semiconductor      (instant)
-> GET /api/document/US11234567B2                (instant)
Session closed, unused balance refunded
```

### 2. Agente de IA para pipeline de consultas médicas

Um agente de diagnóstico médico consulta várias bases de dados clínicas. Os pagamentos blindados garantem que os padrões de consulta dos pacientes não sejam vinculáveis entre provedores.

### 3. Agente de análise financeira

Um agente de negociação algorítmica paga por APIs de dados de mercado em tempo real. Os pagamentos transparentes usam endereços T novos por desafio, evitando a correlação de padrões de uso entre fornecedores de dados.

### 4. Servidor de ferramentas MCP, ferramentas de IA pagas

Um servidor MCP (Model Context Protocol) expõe ferramentas de IA pagas. Cada invocação de ferramenta aciona uma cobrança Zimppy, permitindo um marketplace de capacidades de IA monetizadas.

### 5. Resumidor LLM, pagamento por token

Um serviço de resumo com LLM cobra dos agentes por cada token de saída por streaming SSE, com dedução automática do saldo e reembolso do saldo pré-pago não utilizado.

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

## Configurando a carteira Zimppy

A CLI Zimppy disponibiliza uma interface completa de carteira. Todos os comandos estão disponíveis por meio de `npx zimppy`.

### Passo 1 : Criar uma carteira

```bash
npx zimppy wallet create
```

Gera chaves criptográficas e exibe sua **frase semente**. Guarde-a em segurança — ela não poderá ser recuperada se for perdida.

### Passo 2 : Verificar seu endereço e saldo

```bash
npx zimppy wallet whoami
```

Exibe seu **Unified Address (UA)**, **endereço T**, saldo atual e rede ativa.

```bash
npx zimppy wallet balance --all
```

Mostra uma discriminação do saldo por conta em todas as contas ZIP-32.

### Passo 3 : Financiar sua carteira

Envie ZEC para seu Unified Address a partir de qualquer carteira ou corretora compatível com o Zcash. Os depósitos blindados vão diretamente para sua conta Orchard.

### Passo 4 : Enviar e blindar fundos

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

### Passo 5 : Fazer uma solicitação de pagamento automático

```bash
npx zimppy request <url>
```

Gerencia automaticamente todo o fluxo 402 -> pagar -> tentar novamente. As sessões são abertas e gerenciadas de forma transparente.

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

**Pontos principais:**
- `zcash({ wallet: 'server' })` carrega a carteira blindada do servidor
- `mppx.charge()` gerencia todo o ciclo de vida de desafio/verificação 402
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

Cada desafio gera um **endereço T novo**, tornando as solicitações de pagamento não vinculáveis entre sessões.

---

### Cliente TypeScript

```typescript
import { Mppx } from 'mppx/client'
import { zcash } from 'zimppy-ts/client'

const mppx = Mppx.create({ methods: [zcash({ wallet: 'default' })] })

// Session opened automatically; 402 is handled transparently
const res = await mppx.fetch('https://api.example.com/resource')
```

O cliente intercepta respostas `402`, abre uma sessão automaticamente e tenta novamente a solicitação — o código que faz a chamada não requer lógica específica de pagamento.

---

## Integrando o Zimppy - SDK Rust

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

**Pontos principais:**
- `MppCharge<Price>` é um extrator do Axum que verifica o pagamento antes de o handler ser executado
- `WithReceipt` envolve a resposta com um recibo criptográfico de pagamento
- `ChargeConfig` define a lógica de preços — ela pode ser dinâmica com base nos parâmetros da solicitação

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

`send_with_payment` estende qualquer cliente HTTP com tratamento automático de 402, gerenciamento de sessões e conclusão de pagamentos em Zcash.

---

## Referência da CLI

| Command | Descrição |
|---|---|
| `npx zimppy wallet create` | Gerar chaves e exibir frase semente |
| `npx zimppy wallet whoami` | Exibir endereço (UA + endereço T), saldo, rede |
| `npx zimppy wallet balance --all` | Discriminação de saldo por conta |
| `npx zimppy wallet send <addr> <zat>` | Enviar ZEC blindado ou transparente |
| `npx zimppy wallet transfer <from> <to> <zat>` | Transferência interna entre contas |
| `npx zimppy wallet shield` | Mover fundos transparentes para Orchard (blindado) |
| `npx zimppy wallet use <name>` | Mudar a identidade ativa da carteira |
| `npx zimppy request <url>` | Solicitação automática 402 -> pagar -> tentar novamente |

---

## Recursos principais

### Carteiras nativas para agentes

As carteiras Zimppy são projetadas para uso programático por agentes de IA — não para extensões de navegador gerenciadas por pessoas. As chaves são gerenciadas pela CLI ou pelos SDKs, as contas podem ser rotacionadas por meio da **derivação de contas ZIP-32**, e a carteira oferece suporte a fluxos de pagamento totalmente automatizados sem aprovação humana por transação.

### Suporte multiagente

Vários agentes podem operar a partir da mesma carteira usando a **rotação de contas ZIP-32** — cada agente recebe sua própria conta com acompanhamento de saldo isolado, capacidade de transferência entre contas e relatórios de saldo por conta. Isso permite o gerenciamento de frotas de muitos agentes a partir de uma única infraestrutura de carteira.

### Transações do Zcash totalmente blindadas (Orchard)

Os pagamentos blindados usam o **protocolo Orchard** do Zcash, o pool blindado introduzido pelo NU5. O servidor verifica pagamentos usando uma **Incoming Viewing Key (IVK)**, que pode descriptografar notes recebidas sem expor a chave de gastos. Os ataques de repetição são evitados por meio da **vinculação de memorando** — cada desafio incorpora um memorando único `zimppy:{challenge_id}` que é verificado criptograficamente.

### Sessões , latência zero por solicitação

A arquitetura de sessões desacopla a espera pela confirmação on-chain da latência por solicitação. Após um único depósito (~75 segundos), todas as solicitações subsequentes com token de portador são atendidas instantaneamente, sem interação com a blockchain até o encerramento da sessão.

### Streaming , pagamento por token

O suporte nativo a **SSE (Server-Sent Events)** permite conteúdo medido por token. Ideal para APIs de inferência de LLM, em que o tamanho da saída é variável e a cobrança deve refletir o consumo real.

### Conformidade com a especificação

- Desafios assinados com **HMAC-SHA256** evitam falsificações
- Formato estruturado de erro **RFC 9457** para tratamento interoperável de erros
- **`/.well-known/payment`** para descoberta automática de métodos de pagamento por qualquer agente compatível com MPP

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

### Responsabilidades dos componentes

**`zimppy-core`** - O núcleo criptográfico. Gerencia a descriptografia de notes Orchard usando a IVK do servidor, a análise de memorandos, a lógica de proteção contra repetição e a verificação de desafios. Escrito em Rust para desempenho e correção.

**`zimppy-wallet`** - Uma carteira nativa do Zcash baseada em `zingolib`. Gerencia chaves, contas, saldos blindados/transparentes e envio de transações.

**`zimppy-rs`** - O SDK Rust. Fornece as traits `ChargeMethod`, `SessionMethod` e `PaymentProvider`, além de extratores Axum (`MppCharge`, `WithReceipt`) para integração ergonômica ao servidor.

**`zimppy-napi`** - Bindings NAPI-RS que expõem o núcleo Rust ao Node.js, permitindo que o SDK TypeScript use o mesmo mecanismo criptográfico sem reimplementar primitivas do Zcash em JavaScript.

**`zimppy-ts`** - O SDK TypeScript. Envolve bindings NAPI com APIs idiomáticas async/await para fluxos de cobrança, sessão e streaming SSE.

**`zimppy-cli`** - A carteira de linha de comando e ferramenta de solicitações. Oferece suporte a pagamento automático (402 -> pagar -> tentar novamente), gerenciamento de sessões e todas as operações da carteira.

---

## Exemplos e demonstrações

| Example | Descrição |
|---|---|
| `examples/fortune-teller/` | Demonstrações de cobrança, sessão e streaming - servidor e cliente Rust |
| `examples/llm-summarizer/` | Demonstração de streaming LLM pago por token |
| `examples/mcp-server/` | Servidor de ferramentas MCP com ferramentas de IA pagas |
| `examples/ts-server/` | Implementação de referência de servidor MPP TypeScript |

---

## O que está incluído - Resumo de recursos

| Feature | Descrição |
|---|---|
| **Sessions** | Depositar uma vez, solicitações instantâneas com token de portador, reembolso no encerramento |
| **Streaming** | Conteúdo medido por token via SSE |
| **Charge** | Pagamento blindado ou transparente por solicitação HTTP (fluxo 402) |
| **Transparent Payments** | Endereços T com prevenção de repetição por desafio + comando shield |
| **Multi-Account** | Rotação de contas ZIP-32, transferências entre contas, saldos por conta |
| **CLI Wallet** | Enviar, blindar, transferir, balance --all, whoami, pagamento automático |
| **Dual SDK** | TypeScript e Rust |
| **Spec-Compliant** | Desafios HMAC-SHA256, erros RFC 9457, descoberta `/.well-known/payment` |

---

*Para mais informações, visite [zimppy.xyz](https://zimppy.xyz)*

---

## Páginas relacionadas

- [Carteiras](/using-zcash/wallets) — Carteiras do Zcash que oferecem suporte a transações blindadas
- [Pools blindados](/using-zcash/shielded-pools) — Como as transações blindadas Orchard protegem os dados de pagamento
- [Processadores de pagamentos](/using-zcash/payment-processors) — Outras formas de aceitar pagamentos em Zcash
- [Zcash Shielded Assets](/zcash-tech/zcash-shielded-assets) — ZSAs e o futuro da programabilidade do Zcash
- [Projetos da comunidade](/zcash-community/community-projects) — Mais projetos do ecossistema do Zcash
