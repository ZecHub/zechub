<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Zimppy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zimppy.xyz

## TL;DR

- O **Zimppy** é uma infraestrutura de pagamentos com foco em privacidade para agentes de IA, usando o Machine Payment Protocol (MPP) do Zcash
- **Deposite uma vez** on-chain (~25 segundos por bloco desde o NU7) e depois faça **requisições instantâneas ilimitadas**, sem interação com a blockchain a cada requisição
- Suporta pagamentos **totalmente blindados em Zcash (Orchard)**: remetente, destinatário, valor e memorando são todos criptografados
- Funciona com **SDKs em TypeScript e Rust** para fácil integração em pipelines de IA e servidores de API
- Perfeito para **APIs de LLM, marketplaces de dados, servidores de ferramentas MCP** e qualquer caso de uso de pagamento M2M

---

> O **Zimppy** é o método de pagamento do Machine Payment Protocol (MPP) para Zcash, com suporte a pagamentos blindados e transparentes. Deposite uma vez on-chain e depois faça requisições bearer instantâneas ilimitadas, sem interação com a chain a cada requisição.

---

## Índice

1. [O que é o Zimppy.xyz?](#what-is-zimppyxyz)
2. [Por que pagamentos blindados para agentes de IA?](#why-shielded-payments-for-ai-agents)
3. [Machine Payment Protocol (MPP)](#machine-payment-protocol-mpp)
4. [Como o Zimppy funciona](#how-zimppy-works)
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
11. [Principais recursos](#key-features)
12. [Arquitetura](#architecture)
13. [Exemplos e demonstrações](#examples--demos)

---

## O que é o Zimppy.xyz?

O **Zimppy.xyz** é uma infraestrutura de pagamentos com foco em privacidade, projetada especificamente para agentes de IA e fluxos de trabalho automatizados máquina a máquina (M2M). Ele implementa o **Machine Payment Protocol (MPP)** usando **Zcash** como moeda subjacente, permitindo tanto o modo de pagamento blindado (totalmente privado) quanto o transparente.

Ao contrário dos sistemas tradicionais de pagamento em blockchain, nos quais cada transação fica publicamente visível on-chain, o Zimppy foi construído em torno de uma arquitetura baseada em sessões que elimina a latência por requisição e preserva a privacidade criptográfica. Isso o torna especialmente adequado para agentes de IA que precisam pagar por APIs, dados, poder computacional ou ferramentas de IA de forma programática, sem vazar metadados comportamentais.

### Propriedades principais

- **Deposite uma vez** on-chain (~25 segundos por bloco Zcash desde o NU7; 75 segundos antes)
- **Requisições instantâneas ilimitadas** após a abertura da sessão, sem nenhuma interação com a chain por requisição
- **Pagamentos blindados** criptografam remetente, destinatário, valor e memorando usando o protocolo Orchard do Zcash
- **Pagamentos transparentes** usam T-addresses por desafio para impedir ataques de repetição, sem privacidade total
- **Em conformidade com a especificação**: desafios HMAC-SHA256, erros RFC 9457, descoberta via `/.well-known/payment`

---

## Por que pagamentos blindados para agentes de IA?

Para agentes de IA que lidam com fluxos de trabalho sensíveis, como pesquisa jurídica, consultas médicas, análise financeira e inteligência competitiva, **cada pagamento público é um vazamento de metadados**. O Zimppy é o único método de pagamento MPP que é **privado por padrão**.

### Tabela comparativa de privacidade

| Propriedade | Chains públicas (USDC, ETH) | Zimppy blindado | Zimppy transparente |
|---|---|---|---|
| **Remetente** | Visível | Criptografado | Visível |
| **Destinatário** | Visível | Criptografado | Por desafio (não vinculável) |
| **Valor** | Visível | Criptografado | Visível |
| **Memorando** | Visível | Criptografado | N/A |
| **Proteção contra repetição** | Nenhuma | Vinculação ao memorando | T-address por desafio |
| **Padrão de uso do serviço** | Vinculável | Privado | Não vinculável (endereço novo) |

### O problema da latência, resolvido pelas sessões

> *"Mas os blocos do Zcash ainda levam 25 segundos (75 segundos antes do NU7)."*

**As sessões resolvem isso.** A espera on-chain acontece exatamente **uma vez**, no depósito. Todas as requisições seguintes são instantâneas.

```
Agent  ->  deposit 100,000 zat           (one on-chain tx, ~25s)
Agent  ->  open session                  (bearer token issued)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
           ... hundreds of requests ...
Agent  ->  close session                 (refund unused balance)
```

**Pague uma vez, chame instantaneamente e receba o troco.** A latência por requisição é zero.

---

## Machine Payment Protocol (MPP)

O **Machine Payment Protocol (MPP)** é um protocolo padronizado que permite que agentes de software autônomos (agentes de IA, bots, scripts) descubram, negociem e atendam a requisitos de pagamento para acesso a APIs, tudo sem intervenção humana.

### Como o MPP se integra às APIs

O MPP segue o fluxo HTTP **402 Payment Required**:

1. **O agente solicita** um recurso de um endpoint de API pago.
2. **O servidor responde** com `402 Payment Required` + um desafio assinado (valor, destinatário, memorando).
3. **O agente paga** usando um método de pagamento compatível (por exemplo, Zcash blindado via Zimppy).
4. **O agente repete** a requisição com `Authorization: Payment {txid}`.
5. **O servidor verifica** o pagamento criptograficamente (descriptografia com IVK do Orchard, verificação de valor + memorando).
6. **O servidor responde** com `200 OK` + um cabeçalho `Payment-Receipt`.

### Conformidade com a especificação

- Assinatura de desafios com **HMAC-SHA256**
- Respostas de erro estruturadas conforme a **RFC 9457**
- Endpoint **`/.well-known/payment`** para descoberta automática do método de pagamento
- **IVK do Orchard** (Incoming Viewing Key) para verificação de pagamentos no servidor sem expor as chaves de gastos

---

## Como o Zimppy funciona

### Sessões (recomendado)

As sessões são o principal padrão de interação. O agente deposita um saldo on-chain uma única vez, recebe um bearer token e o usa em todas as requisições seguintes, com latência zero.

```
Agent  ->  deposit 100,000 zat           (on-chain, ~75s one-time)
Agent  ->  open session                  (bearer token issued)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  close session                 (refund unused balance on-chain)
```

**Ideal para:** chamadas de API de alta frequência, inferência de LLM, consultas repetidas de dados.

---

### Streaming

Conteúdo medido com pagamento por token, entregue via **Server-Sent Events (SSE)**. O servidor desconta do saldo da sessão a cada palavra ou token transmitido.

```
Agent  ->  open session with deposit
Agent  ->  GET /api/stream (SSE)
Server ->  stream word by word, deducting per token
Agent  ->  close session, refund remaining
```

**Ideal para:** respostas de LLM em streaming, feeds de dados em tempo real, ferramentas de IA com pagamento por token.

---

### Cobrança

Um único pagamento blindado por requisição. O fluxo HTTP 402 completo é executado a cada chamada. Adequado quando as requisições são pouco frequentes ou de alto valor.

```
Agent  ->  GET /api/resource
Server ->  402 + challenge (amount, recipient, memo)
Agent  ->  shielded ZEC with memo "zimppy:{challenge_id}"
Agent  ->  GET /api/resource + Authorization: Payment {txid}
Server ->  decrypt with Orchard IVK, verify amount + memo
Server ->  200 OK + Payment-Receipt
```

**Ideal para:** requisições avulsas de alto valor, chamadas de API pouco frequentes, endpoints de dados premium.

---

## Casos de uso e exemplos

### 1. Agente de IA

Um agente de IA jurídico consulta um banco de dados pago de jurisprudência. Usando sessões blindadas do Zimppy, nem a identidade do escritório de advocacia nem as consultas específicas ficam visíveis on-chain, protegendo o sigilo entre advogado e cliente no nível da infraestrutura.

```
Agent opens session (100,000 zat deposit)
-> GET /api/cases?q=patent+infringement+2024     (instant)
-> GET /api/cases?q=prior+art+semiconductor      (instant)
-> GET /api/document/US11234567B2                (instant)
Session closed, unused balance refunded
```

### 2. Agente de IA para pipeline de consultas médicas

Um agente de diagnóstico médico consulta vários bancos de dados clínicos. Os pagamentos blindados garantem que os padrões de consulta dos pacientes não sejam vinculáveis entre os provedores.

### 3. Agente de análise financeira

Um agente de trading algorítmico paga por APIs de dados de mercado em tempo real. Os pagamentos transparentes usam T-addresses novos a cada desafio, impedindo a correlação de padrões de uso entre fornecedores de dados.

### 4. Servidor de ferramentas MCP, ferramentas de IA pagas

Um servidor MCP (Model Context Protocol) disponibiliza ferramentas de IA pagas. Cada invocação de ferramenta dispara uma cobrança do Zimppy, possibilitando um marketplace de recursos de IA monetizados.

### 5. Sumarizador LLM, pagamento por token

Um serviço de sumarização com LLM cobra os agentes por token de saída via streaming SSE, com desconto automático do saldo e reembolso do saldo pré-pago não utilizado.

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

A CLI do Zimppy oferece uma interface completa de carteira. Todos os comandos estão disponíveis via `npx zimppy`.

### Passo 1: crie uma carteira

```bash
npx zimppy wallet create
```

Gera as chaves criptográficas e exibe sua **frase semente**. Guarde-a em segurança: ela não pode ser recuperada se for perdida.

### Passo 2: verifique seu endereço e saldo

```bash
npx zimppy wallet whoami
```

Exibe seu **Unified Address (UA)**, seu **T-address**, o saldo atual e a rede ativa.

```bash
npx zimppy wallet balance --all
```

Mostra o detalhamento do saldo de cada conta em todas as contas ZIP-32.

### Passo 3: deposite fundos na sua carteira

Envie ZEC para o seu Unified Address a partir de qualquer carteira ou corretora compatível com Zcash. Os depósitos blindados vão diretamente para a sua conta Orchard.

### Passo 4: envie e blinde fundos

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

### Passo 5: faça uma requisição com pagamento automático

```bash
npx zimppy request <url>
```

Gerencia automaticamente todo o fluxo 402 -> pagar -> repetir. As sessões são abertas e gerenciadas de forma transparente.

---

## Integrando o Zimppy - SDK TypeScript

### Servidor TypeScript - blindado

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
- `mppx.charge()` gerencia todo o ciclo de vida de desafio/verificação do 402
- `result.withReceipt()` anexa o recibo criptográfico do pagamento à resposta

---

### Servidor TypeScript - transparente

```typescript
import { Mppx } from 'mppx/server'
import { zcashTransparent } from 'zimppy-ts/server'

const mppx = Mppx.create({
  methods: [await zcashTransparent({ wallet: 'server' })],
  // per-challenge T-address generated automatically (replay-safe)
})
```

Cada desafio gera um **T-address novo**, tornando as solicitações de pagamento não vinculáveis entre sessões.

---

### Cliente TypeScript

```typescript
import { Mppx } from 'mppx/client'
import { zcash } from 'zimppy-ts/client'

const mppx = Mppx.create({ methods: [zcash({ wallet: 'default' })] })

// Session opened automatically; 402 is handled transparently
const res = await mppx.fetch('https://api.example.com/resource')
```

O cliente intercepta as respostas `402`, abre uma sessão automaticamente e repete a requisição. O código que faz a chamada não precisa de nenhuma lógica específica de pagamento.

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

**Pontos-chave:**
- `MppCharge<Price>` é um extractor do Axum que verifica o pagamento antes da execução do handler
- `WithReceipt` envolve a resposta com um recibo criptográfico do pagamento
- `ChargeConfig` define a lógica de preços, que pode ser dinâmica com base nos parâmetros da requisição

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

`send_with_payment` estende qualquer cliente HTTP com tratamento automático do 402, gerenciamento de sessões e execução de pagamentos em Zcash.

---

## Referência da CLI

| Comando | Descrição |
|---|---|
| `npx zimppy wallet create` | Gera as chaves e exibe a frase semente |
| `npx zimppy wallet whoami` | Mostra o endereço (UA + T-addr), o saldo e a rede |
| `npx zimppy wallet balance --all` | Detalhamento do saldo por conta |
| `npx zimppy wallet send <addr> <zat>` | Envia ZEC blindado ou transparente |
| `npx zimppy wallet transfer <from> <to> <zat>` | Transferência interna entre contas |
| `npx zimppy wallet shield` | Move fundos transparentes para Orchard (blindado) |
| `npx zimppy wallet use <name>` | Alterna a identidade de carteira ativa |
| `npx zimppy request <url>` | Requisição automática 402 -> pagar -> repetir |

---

## Principais recursos

### Carteiras nativas para agentes

As carteiras Zimppy foram projetadas para uso programático por agentes de IA, e não como extensões de navegador gerenciadas por humanos. As chaves são gerenciadas pela CLI ou pelos SDKs, as contas podem ser rotacionadas via **derivação de contas ZIP-32**, e a carteira suporta fluxos de pagamento totalmente automatizados, sem aprovação humana a cada transação.

### Suporte a múltiplos agentes

Vários agentes podem operar a partir da mesma carteira usando a **rotação de contas ZIP-32**: cada agente recebe sua própria conta, com controle de saldo isolado, capacidade de transferência entre contas e relatórios de saldo por conta. Isso permite gerenciar uma frota de muitos agentes a partir de uma única infraestrutura de carteira.

### Transações Zcash totalmente blindadas (Orchard)

Os pagamentos blindados usam o **protocolo Orchard** do Zcash, a pool blindada introduzida pelo NU5. O servidor verifica os pagamentos usando uma **Incoming Viewing Key (IVK)**, que consegue descriptografar as notes recebidas sem expor a chave de gastos. Ataques de repetição são evitados por meio da **vinculação ao memorando**: cada desafio incorpora um memorando `zimppy:{challenge_id}` único, que é verificado criptograficamente.

### Sessões, latência zero por requisição

A arquitetura de sessões desvincula a espera pela confirmação on-chain da latência por requisição. Após um único depósito (~25 segundos desde o NU7), todas as requisições seguintes com bearer token são atendidas instantaneamente, sem nenhuma interação com a blockchain até o encerramento da sessão.

### Streaming, pagamento por token

O suporte nativo a **SSE (Server-Sent Events)** permite conteúdo medido com pagamento por token. Ideal para APIs de inferência de LLM, nas quais o tamanho da saída é variável e a cobrança deve refletir o consumo real.

### Conformidade com a especificação

- Desafios assinados com **HMAC-SHA256** impedem falsificações
- Formato de erro estruturado conforme a **RFC 9457** para um tratamento de erros interoperável
- **`/.well-known/payment`** para descoberta automática do método de pagamento por qualquer agente compatível com o MPP

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

**`zimppy-core`** - O núcleo criptográfico. Cuida da descriptografia das notes Orchard usando a IVK do servidor, da leitura dos memorandos, da lógica de proteção contra repetição e da verificação dos desafios. Escrito em Rust para garantir desempenho e correção.

**`zimppy-wallet`** - Uma carteira Zcash nativa baseada em `zingolib`. Gerencia chaves, contas, saldos blindados/transparentes e o envio de transações.

**`zimppy-rs`** - O SDK em Rust. Fornece os traits `ChargeMethod`, `SessionMethod` e `PaymentProvider`, além de extractors do Axum (`MppCharge`, `WithReceipt`) para uma integração ergonômica com o servidor.

**`zimppy-napi`** - Bindings NAPI-RS que expõem o núcleo em Rust ao Node.js, permitindo que o SDK em TypeScript use o mesmo motor criptográfico sem reimplementar as primitivas do Zcash em JavaScript.

**`zimppy-ts`** - O SDK em TypeScript. Envolve os bindings NAPI com APIs async/await idiomáticas para os fluxos de cobrança, sessão e streaming SSE.

**`zimppy-cli`** - A carteira de linha de comando e ferramenta de requisições. Suporta pagamento automático (402 -> pagar -> repetir), gerenciamento de sessões e todas as operações de carteira.

---

## Exemplos e demonstrações

| Exemplo | Descrição |
|---|---|
| `examples/fortune-teller/` | Demonstrações de cobrança, sessão e streaming - servidor + cliente Rust |
| `examples/llm-summarizer/` | Demonstração de streaming de LLM com pagamento por token |
| `examples/mcp-server/` | Servidor de ferramentas MCP com ferramentas de IA pagas |
| `examples/ts-server/` | Implementação de referência de servidor MPP em TypeScript |

---

## O que está incluído - resumo dos recursos

| Recurso | Descrição |
|---|---|
| **Sessões** | Deposite uma vez, requisições bearer instantâneas, reembolso no encerramento |
| **Streaming** | Conteúdo medido com pagamento por token via SSE |
| **Cobrança** | Pagamento blindado ou transparente por requisição HTTP (fluxo 402) |
| **Pagamentos transparentes** | T-addresses com prevenção de repetição por desafio + comando shield |
| **Múltiplas contas** | Rotação de contas ZIP-32, transferências entre contas, saldos por conta |
| **Carteira CLI** | Send, shield, transfer, balance --all, whoami, pagamento automático |
| **SDK duplo** | TypeScript e Rust |
| **Em conformidade com a especificação** | Desafios HMAC-SHA256, erros RFC 9457, descoberta via `/.well-known/payment` |

---

*Para mais informações, acesse [zimppy.xyz](https://zimppy.xyz)*

---

## Páginas relacionadas

- [Carteiras](/using-zcash/wallets) — Carteiras Zcash que suportam transações blindadas
- [Pools blindadas](/using-zcash/shielded-pools) — Como as transações blindadas do Orchard protegem os dados de pagamento
- [Processadores de pagamento](/using-zcash/payment-processors) — Outras formas de aceitar pagamentos em Zcash
- [Ativos blindados Zcash](/zcash-tech/zcash-shielded-assets) — ZSAs e o futuro da programabilidade do Zcash
- [Projetos da comunidade](/zcash-community/community-projects) — Mais projetos do ecossistema Zcash
