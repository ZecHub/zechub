<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Zimppy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zimppy.xyz

## TL;DR

- **Zimppy** é uma infraestrutura de pagamentos centrada na privacidade para agentes de IA que utiliza o Machine Payment Protocol (MPP) do Zcash
- **Deposite uma vez** on-chain (~75 segundos) e, em seguida, faça **pedidos instantâneos ilimitados** sem interação com a blockchain por pedido
- Suporta pagamentos **Zcash totalmente blindados (Orchard)** — remetente, destinatário, montante e memo são todos encriptados
- Funciona com **SDKs de TypeScript e Rust** para integração fácil em pipelines de IA e servidores de API
- Perfeito para **APIs de LLM, mercados de dados, servidores de ferramentas MCP** e qualquer caso de utilização de pagamentos M2M

---

> **Zimppy** é o método de pagamento Machine Payment Protocol (MPP) para Zcash, com suporte para pagamentos blindados e transparentes. Deposite uma vez on-chain e, em seguida, faça pedidos instantâneos ilimitados ao portador, sem interação com a cadeia por pedido.

---

## Índice

1. [O que é o Zimppy.xyz?](#what-is-zimppyxyz)
2. [Porquê pagamentos blindados para agentes de IA?](#why-shielded-payments-for-ai-agents)
3. [Machine Payment Protocol (MPP)](#machine-payment-protocol-mpp)
4. [Como funciona o Zimppy](#how-zimppy-works)
   - [Sessões (Recomendado)](#sessions-recommended)
   - [Streaming](#streaming)
   - [Cobrança](#charge)
5. [Casos de utilização e exemplos](#use-cases--examples)
6. [Instalação](#installation)
7. [Configurar a wallet Zimppy](#setting-up-the-zimppy-wallet)
8. [Integrar o Zimppy](#integrating-zimppy--typescript-sdk)
   - [Servidor (Blindado)](#typescript-server--shielded)
   - [Servidor (Transparente)](#typescript-server--transparent)
   - [Cliente](#typescript-client)
9. [Integrar o Zimppy - SDK Rust](#integrating-zimppy--rust-sdk)
   - [Servidor (Axum)](#rust-server-axum)
   - [Cliente](#rust-client)
10. [Referência da CLI](#cli-reference)
11. [Funcionalidades principais](#key-features)
12. [Arquitetura](#architecture)
13. [Exemplos e demonstrações](#examples--demos)

---

## O que é o Zimppy.xyz?

**Zimppy.xyz** é uma infraestrutura de pagamentos centrada na privacidade, concebida especificamente para agentes de IA e fluxos de trabalho automatizados de máquina para máquina (M2M). Implementa o **Machine Payment Protocol (MPP)** utilizando **Zcash** como moeda subjacente, permitindo modos de pagamento blindados (totalmente privados) e transparentes.

Ao contrário dos sistemas tradicionais de pagamento por blockchain, onde cada transação é visível publicamente on-chain, o Zimppy foi desenvolvido com uma arquitetura baseada em sessões que elimina a latência por pedido, preservando simultaneamente a privacidade criptográfica. Isto torna-o especialmente adequado para agentes de IA que precisam de pagar programaticamente por APIs, dados, computação ou ferramentas de IA, sem revelar metadados comportamentais.

### Propriedades principais

- **Deposite uma vez** on-chain (~75 segundos para confirmação de Zcash)
- **Pedidos instantâneos ilimitados** após a abertura de sessão, sem interação com a cadeia por pedido
- **Pagamentos blindados** encriptam remetente, destinatário, montante e memo através do protocolo Orchard do Zcash
- **Pagamentos transparentes** utilizam endereços T por desafio para prevenção de repetição sem privacidade total
- **Em conformidade com a especificação**, desafios HMAC-SHA256, erros RFC 9457, descoberta `/.well-known/payment`

---

## Porquê pagamentos blindados para agentes de IA?

Para agentes de IA que lidam com fluxos de trabalho sensíveis, investigação jurídica, consultas médicas, análise financeira ou inteligência competitiva, **cada pagamento público representa uma fuga de metadados**. Zimppy é o único método de pagamento MPP que é **privado por predefinição**.

### Tabela de comparação de privacidade

| Propriedade | Cadeias públicas (USDC, ETH) | Zimppy Blindado | Zimppy Transparente |
|---|---|---|---|
| **Remetente** | Visível | Encriptado | Visível |
| **Destinatário** | Visível | Encriptado | Por desafio (não associável) |
| **Montante** | Visível | Encriptado | Visível |
| **Memo** | Visível | Encriptado | N/D |
| **Proteção contra repetição** | Nenhuma | Vinculação de memo | Endereço T por desafio |
| **Padrão de utilização do serviço** | Associável | Privado | Não associável (endereço novo) |

### O problema da latência, resolvido por sessões

> *"Mas o Zcash tem tempos de bloco de 75 segundos."*

**As sessões resolvem isto.** A espera on-chain ocorre exatamente **uma vez**, no depósito. Todos os pedidos subsequentes são instantâneos.

```
Agent  ->  deposit 100,000 zat           (one on-chain tx, ~75s)
Agent  ->  open session                  (bearer token issued)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
           ... hundreds of requests ...
Agent  ->  close session                 (refund unused balance)
```

**Pague uma vez, chame instantaneamente, receba o troco.** A latência por pedido é zero.

---

## Machine Payment Protocol (MPP)

O **Machine Payment Protocol (MPP)** é um protocolo padronizado que permite a agentes de software autónomos (agentes de IA, bots, scripts) descobrir, negociar e cumprir requisitos de pagamento para acesso a APIs, tudo sem intervenção humana.

### Como o MPP se integra com APIs

O MPP segue o fluxo HTTP **402 Payment Required**:

1. O **agente pede** um recurso a um endpoint de API pago.
2. O **servidor responde** com `402 Payment Required` + um desafio assinado (montante, destinatário, memo).
3. O **agente paga** utilizando um método de pagamento compatível (por exemplo, Zcash blindado através do Zimppy).
4. O **agente tenta novamente** o pedido com `Authorization: Payment {txid}`.
5. O **servidor verifica** o pagamento criptograficamente (desencriptação Orchard IVK, verificação de montante + memo).
6. O **servidor responde** com `200 OK` + um cabeçalho `Payment-Receipt`.

### Conformidade com a especificação

- Assinatura de desafios **HMAC-SHA256**
- Respostas de erro estruturadas **RFC 9457**
- Endpoint **`/.well-known/payment`** para descoberta automática de métodos de pagamento
- **Orchard IVK** (Incoming Viewing Key) para verificação de pagamentos no servidor sem expor chaves de gasto

---

## Como funciona o Zimppy

### Sessões (Recomendado)

As sessões são o principal padrão de interação. O agente deposita um saldo on-chain uma vez, recebe um token ao portador e utiliza-o para todos os pedidos subsequentes sem latência.

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

Conteúdo medido por token, entregue através de **Server-Sent Events (SSE)**. O servidor deduz do saldo da sessão por cada palavra ou token transmitido.

```
Agent  ->  open session with deposit
Agent  ->  GET /api/stream (SSE)
Server ->  stream word by word, deducting per token
Agent  ->  close session, refund remaining
```

**Ideal para:** Respostas de streaming de LLM, feeds de dados em tempo real, ferramentas de IA pagas por token.

---

### Cobrança

Um único pagamento blindado por pedido. O fluxo HTTP 402 completo é executado em cada chamada. Adequado quando os pedidos são pouco frequentes ou de elevado valor.

```
Agent  ->  GET /api/resource
Server ->  402 + challenge (amount, recipient, memo)
Agent  ->  shielded ZEC with memo "zimppy:{challenge_id}"
Agent  ->  GET /api/resource + Authorization: Payment {txid}
Server ->  decrypt with Orchard IVK, verify amount + memo
Server ->  200 OK + Payment-Receipt
```

**Ideal para:** Pedidos pontuais de elevado valor, chamadas de API pouco frequentes, endpoints de dados premium.

---

## Casos de utilização e exemplos

### 1. Agente de IA

Um agente de IA jurídico consulta uma base de dados paga de jurisprudência. Utilizando sessões blindadas Zimppy, nem a identidade do escritório de advogados nem as consultas específicas são visíveis on-chain — protegendo o sigilo profissional entre advogado e cliente ao nível da infraestrutura.

```
Agent opens session (100,000 zat deposit)
-> GET /api/cases?q=patent+infringement+2024     (instant)
-> GET /api/cases?q=prior+art+semiconductor      (instant)
-> GET /api/document/US11234567B2                (instant)
Session closed, unused balance refunded
```

### 2. Agente de IA para pipeline de consultas médicas

Um agente de diagnóstico médico consulta várias bases de dados clínicas. Os pagamentos blindados garantem que os padrões de consulta dos pacientes não podem ser associados entre fornecedores.

### 3. Agente de análise financeira

Um agente de negociação algorítmica paga por APIs de dados de mercado em tempo real. Os pagamentos transparentes utilizam endereços T novos por desafio, evitando a correlação de padrões de utilização entre fornecedores de dados.

### 4. Servidor de ferramentas MCP, ferramentas de IA pagas

Um servidor MCP (Model Context Protocol) expõe ferramentas de IA pagas. Cada invocação de ferramenta desencadeia uma cobrança Zimppy, permitindo um mercado de capacidades de IA monetizadas.

### 5. Resumidor LLM, pagamento por token

Um serviço de resumo com LLM cobra aos agentes por cada token de saída através de streaming SSE, com dedução automática do saldo e reembolso do saldo pré-pago não utilizado.

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

## Configurar a wallet Zimppy

A CLI Zimppy disponibiliza uma interface completa de wallet. Todos os comandos estão disponíveis através de `npx zimppy`.

### Passo 1 : Criar uma wallet

```bash
npx zimppy wallet create
```

Gera chaves criptográficas e apresenta a sua **frase-semente**. Guarde-a em segurança — não pode ser recuperada se for perdida.

### Passo 2 : Verificar o seu endereço e saldo

```bash
npx zimppy wallet whoami
```

Apresenta o seu **Unified Address (UA)**, **endereço T**, saldo atual e rede ativa.

```bash
npx zimppy wallet balance --all
```

Mostra uma discriminação do saldo por conta em todas as contas ZIP-32.

### Passo 3 : Financiar a sua wallet

Envie ZEC para o seu Unified Address a partir de qualquer wallet ou exchange compatível com Zcash. Os depósitos blindados vão diretamente para a sua conta Orchard.

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

### Passo 5 : Fazer um pedido com pagamento automático

```bash
npx zimppy request <url>
```

Trata automaticamente do fluxo completo 402 -> pagar -> tentar novamente. As sessões são abertas e geridas de forma transparente.

---

## Integrar o Zimppy - SDK TypeScript

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
- `zcash({ wallet: 'server' })` carrega a wallet blindada do servidor
- `mppx.charge()` trata do ciclo de vida completo de desafio/verificação 402
- `result.withReceipt()` anexa o recibo de pagamento criptográfico à resposta

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

Cada desafio gera um **endereço T novo**, tornando os pedidos de pagamento não associáveis entre sessões.

---

### Cliente TypeScript

```typescript
import { Mppx } from 'mppx/client'
import { zcash } from 'zimppy-ts/client'

const mppx = Mppx.create({ methods: [zcash({ wallet: 'default' })] })

// Session opened automatically; 402 is handled transparently
const res = await mppx.fetch('https://api.example.com/resource')
```

O cliente interceta respostas `402`, abre automaticamente uma sessão e tenta novamente o pedido — o código que faz a chamada não requer lógica específica de pagamento.

---

## Integrar o Zimppy - SDK Rust

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
- `MppCharge<Price>` é um extrator Axum que verifica o pagamento antes de o handler ser executado
- `WithReceipt` envolve a resposta com um recibo de pagamento criptográfico
- `ChargeConfig` define a lógica de preços — pode ser dinâmica com base nos parâmetros do pedido

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

`send_with_payment` estende qualquer cliente HTTP com tratamento automático de 402, gestão de sessões e conclusão de pagamentos Zcash.

---

## Referência da CLI

| Comando | Descrição |
|---|---|
| `npx zimppy wallet create` | Gerar chaves e apresentar frase-semente |
| `npx zimppy wallet whoami` | Mostrar endereço (UA + endereço T), saldo, rede |
| `npx zimppy wallet balance --all` | Discriminação de saldo por conta |
| `npx zimppy wallet send <addr> <zat>` | Enviar ZEC blindado ou transparente |
| `npx zimppy wallet transfer <from> <to> <zat>` | Transferência interna entre contas |
| `npx zimppy wallet shield` | Mover fundos transparentes para Orchard (blindado) |
| `npx zimppy wallet use <name>` | Mudar a identidade ativa da wallet |
| `npx zimppy request <url>` | Pedido automático 402 -> pagar -> tentar novamente |

---

## Funcionalidades principais

### Wallets nativas para agentes

As wallets Zimppy foram concebidas para utilização programática por agentes de IA — e não para extensões de navegador geridas por pessoas. As chaves são geridas através da CLI ou dos SDKs, as contas podem ser rotacionadas através de **derivação de contas ZIP-32**, e a wallet suporta fluxos de pagamento totalmente automatizados sem aprovação humana por transação.

### Suporte multiagente

Vários agentes podem operar a partir da mesma wallet utilizando **rotação de contas ZIP-32** — cada agente recebe a sua própria conta com acompanhamento de saldo isolado, capacidade de transferência entre contas e relatórios de saldo por conta. Isto permite a gestão de frotas de muitos agentes a partir de uma única infraestrutura de wallet.

### Transações Zcash totalmente blindadas (Orchard)

Os pagamentos blindados utilizam o **protocolo Orchard** do Zcash — o pool blindado mais recente e seguro. O servidor verifica pagamentos utilizando uma **Incoming Viewing Key (IVK)**, que pode desencriptar notas recebidas sem expor a chave de gasto. Os ataques de repetição são evitados através de **vinculação de memo** — cada desafio incorpora um memo único `zimppy:{challenge_id}` que é verificado criptograficamente.

### Sessões , latência zero por pedido

A arquitetura de sessões desacopla a espera de confirmação on-chain da latência por pedido. Após um único depósito (~75 segundos), todos os pedidos subsequentes com token ao portador são processados instantaneamente, sem interação com a blockchain até ao encerramento da sessão.

### Streaming , pagamento por token

O suporte nativo para **SSE (Server-Sent Events)** permite conteúdo medido por token. Ideal para APIs de inferência de LLM, onde o comprimento da saída é variável e a faturação deve refletir o consumo real.

### Conformidade com a especificação

- Desafios assinados com **HMAC-SHA256** evitam falsificações
- Formato estruturado de erro **RFC 9457** para tratamento de erros interoperável
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

**`zimppy-core`** - O núcleo criptográfico. Trata da desencriptação de notas Orchard através da IVK do servidor, análise de memo, lógica de proteção contra repetição e verificação de desafios. Escrito em Rust para desempenho e correção.

**`zimppy-wallet`** - Uma wallet Zcash nativa baseada em `zingolib`. Gere chaves, contas, saldos blindados/transparentes e submissão de transações.

**`zimppy-rs`** - O SDK Rust. Disponibiliza traits `ChargeMethod`, `SessionMethod` e `PaymentProvider`, além de extratores Axum (`MppCharge`, `WithReceipt`) para uma integração ergonómica no servidor.

**`zimppy-napi`** - Bindings NAPI-RS que expõem o núcleo Rust ao Node.js, permitindo que o SDK TypeScript utilize o mesmo motor criptográfico sem reimplementar primitivas Zcash em JavaScript.

**`zimppy-ts`** - O SDK TypeScript. Envolve bindings NAPI com APIs idiomáticas async/await para fluxos de cobrança, sessão e streaming SSE.

**`zimppy-cli`** - A wallet de linha de comandos e ferramenta de pedidos. Suporta pagamento automático (402 -> pagar -> tentar novamente), gestão de sessões e todas as operações de wallet.

---

## Exemplos e demonstrações

| Exemplo | Descrição |
|---|---|
| `examples/fortune-teller/` | Demonstrações de cobrança, sessão e streaming - servidor + cliente Rust |
| `examples/llm-summarizer/` | Demonstração de streaming LLM pago por token |
| `examples/mcp-server/` | Servidor de ferramentas MCP com ferramentas de IA pagas |
| `examples/ts-server/` | Implementação de referência de servidor MPP TypeScript |

---

## O que está incluído - Resumo de funcionalidades

| Funcionalidade | Descrição |
|---|---|
| **Sessões** | Depositar uma vez, pedidos instantâneos ao portador, reembolso no encerramento |
| **Streaming** | Conteúdo medido por token através de SSE |
| **Cobrança** | Pagamento blindado ou transparente por pedido HTTP (fluxo 402) |
| **Pagamentos transparentes** | Endereços T com prevenção de repetição por desafio + comando shield |
| **Multiconta** | Rotação de contas ZIP-32, transferências entre contas, saldos por conta |
| **Wallet CLI** | Enviar, blindar, transferir, balance --all, whoami, pagamento automático |
| **SDK duplo** | TypeScript e Rust |
| **Em conformidade com a especificação** | Desafios HMAC-SHA256, erros RFC 9457, descoberta `/.well-known/payment` |

---

*Para mais informações, visite [zimppy.xyz](https://zimppy.xyz)*

---

## Páginas relacionadas

- [Wallets](/using-zcash/wallets) — Wallets Zcash que suportam transações blindadas
- [Pools blindados](/using-zcash/shielded-pools) — Como as transações blindadas Orchard protegem os dados de pagamento
- [Processadores de pagamentos](/using-zcash/payment-processors) — Outras formas de aceitar pagamentos Zcash
- [Zcash Shielded Assets](/zcash-tech/zcash-shielded-assets) — ZSAs e o futuro da programabilidade do Zcash
- [Projetos da comunidade](/zcash-community/community-projects) — Mais projetos do ecossistema Zcash
