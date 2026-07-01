<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/zimppy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifier la page"/>
</a>

# Zimppy.xyz

## TL;DR

- **Zimppy** est une infrastructure de paiement axée sur la confidentialité pour les agents IA utilisant le Machine Payment Protocol (MPP) de Zcash
- **Déposez une seule fois** on-chain (~75 secondes), puis effectuez des **requêtes instantanées illimitées** sans interaction avec la blockchain pour chaque requête
- Prend en charge les paiements **Zcash entièrement shielded (Orchard)** — l’expéditeur, le destinataire, le montant et le mémo sont tous chiffrés
- Fonctionne avec des **SDK TypeScript et Rust** pour une intégration facile dans les pipelines IA et les serveurs d’API
- Parfait pour les **API LLM, places de marché de données, serveurs d’outils MCP** et tout cas d’usage de paiement M2M

---

> **Zimppy** est la méthode de paiement Machine Payment Protocol (MPP) pour Zcash, prenant en charge les paiements shielded et transparents. Déposez une seule fois on-chain, puis effectuez des requêtes au porteur instantanées et illimitées sans interaction avec la chaîne pour chaque requête.

---

## Table des matières

1. [Qu’est-ce que Zimppy.xyz ?](#what-is-zimppyxyz)
2. [Pourquoi les paiements shielded pour les agents IA ?](#why-shielded-payments-for-ai-agents)
3. [Machine Payment Protocol (MPP)](#machine-payment-protocol-mpp)
4. [Comment fonctionne Zimppy](#how-zimppy-works)
   - [Sessions (recommandé)](#sessions-recommended)
   - [Streaming](#streaming)
   - [Facturation](#charge)
5. [Cas d’usage et exemples](#use-cases--examples)
6. [Installation](#installation)
7. [Configuration du portefeuille Zimppy](#setting-up-the-zimppy-wallet)
8. [Intégration de Zimppy](#integrating-zimppy--typescript-sdk)
   - [Serveur (Shielded)](#typescript-server--shielded)
   - [Serveur (Transparent)](#typescript-server--transparent)
   - [Client](#typescript-client)
9. [Intégration de Zimppy - SDK Rust](#integrating-zimppy--rust-sdk)
   - [Serveur (Axum)](#rust-server-axum)
   - [Client](#rust-client)
10. [Référence CLI](#cli-reference)
11. [Fonctionnalités clés](#key-features)
12. [Architecture](#architecture)
13. [Exemples et démos](#examples--demos)

---

## Qu’est-ce que Zimppy.xyz ?

**Zimppy.xyz** est une infrastructure de paiement axée sur la confidentialité conçue spécifiquement pour les agents IA et les flux de travail automatisés de machine à machine (M2M). Elle implémente le **Machine Payment Protocol (MPP)** en utilisant **Zcash** comme devise sous-jacente, permettant des modes de paiement shielded (entièrement privés) et transparents.

Contrairement aux systèmes de paiement blockchain traditionnels, où chaque transaction est publiquement visible on-chain, Zimppy est conçu autour d’une architecture basée sur des sessions qui élimine la latence par requête tout en préservant la confidentialité cryptographique. Cela le rend particulièrement adapté aux agents IA qui doivent payer des API, des données, de la puissance de calcul ou des outils d’IA de manière programmatique, sans divulguer de métadonnées comportementales.

### Propriétés principales

- **Déposez une seule fois** on-chain (~75 secondes pour la confirmation Zcash)
- **Requêtes instantanées illimitées** après l’ouverture de la session, zéro interaction avec la chaîne par requête
- Les **paiements shielded** chiffrent l’expéditeur, le destinataire, le montant et le mémo à l’aide du protocole Orchard de Zcash
- Les **paiements transparents** utilisent des adresses T par challenge pour la prévention du rejeu sans confidentialité complète
- **Conforme aux spécifications**, challenges HMAC-SHA256, erreurs RFC 9457, découverte `/.well-known/payment`

---

## Pourquoi les paiements shielded pour les agents IA ?

Pour les agents IA qui gèrent des flux de travail sensibles, des recherches juridiques, des requêtes médicales, des analyses financières, de l’intelligence concurrentielle, **chaque paiement public est une fuite de métadonnées**. Zimppy est la seule méthode de paiement MPP qui soit **privée par défaut**.

### Tableau de comparaison de la confidentialité

| Property | Public Chains (USDC, ETH) | Zimppy Shielded | Zimppy Transparent |
|---|---|---|---|
| **Expéditeur** | Visible | Chiffré | Visible |
| **Destinataire** | Visible | Chiffré | Par challenge (non corrélable) |
| **Montant** | Visible | Chiffré | Visible |
| **Mémo** | Visible | Chiffré | N/A |
| **Protection contre le rejeu** | Aucune | Liaison du mémo | Adresse T par challenge |
| **Modèle d’utilisation du service** | Corrélable | Privé | Non corrélable (adresse fraîche) |

### Le problème de latence, résolu par les sessions

> *"Mais Zcash a des temps de bloc de 75 secondes."*

**Les sessions résolvent cela.** L’attente on-chain n’a lieu qu’**une seule fois** au moment du dépôt. Chaque requête suivante est instantanée.

```
Agent  ->  deposit 100,000 zat           (one on-chain tx, ~75s)
Agent  ->  open session                  (bearer token issued)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
           ... hundreds of requests ...
Agent  ->  close session                 (refund unused balance)
```

**Payez une fois, appelez instantanément, récupérez la monnaie.** La latence par requête est nulle.

---

## Machine Payment Protocol (MPP)

Le **Machine Payment Protocol (MPP)** est un protocole standardisé qui permet à des agents logiciels autonomes (agents IA, bots, scripts) de découvrir, négocier et satisfaire des exigences de paiement pour l’accès aux API, le tout sans intervention humaine.

### Comment MPP s’intègre aux API

MPP suit le flux HTTP **402 Payment Required** :

1. **L’agent demande** une ressource à un endpoint d’API payant.
2. **Le serveur répond** avec `402 Payment Required` + un challenge signé (montant, destinataire, mémo).
3. **L’agent paie** à l’aide d’une méthode de paiement compatible (par ex., Zimppy shielded Zcash).
4. **L’agent réessaie** la requête avec `Authorization: Payment {txid}`.
5. **Le serveur vérifie** cryptographiquement le paiement (déchiffrement Orchard IVK, vérification du montant + mémo).
6. **Le serveur répond** avec `200 OK` + un en-tête `Payment-Receipt`.
### Conformité à la spécification

- signature de défi **HMAC-SHA256**
- réponses d’erreur structurées **RFC 9457**
- endpoint **`/.well-known/payment`** pour la découverte automatique des méthodes de paiement
- **Orchard IVK** (Incoming Viewing Key) pour la vérification côté serveur des paiements sans exposer les clés de dépense

---

## Comment fonctionne Zimppy

### Sessions (Recommandé)

Les sessions constituent le modèle d’interaction principal. L’agent dépose un solde on-chain une seule fois, reçoit un jeton porteur, et l’utilise pour toutes les requêtes suivantes avec une latence nulle.

```
Agent  ->  deposit 100,000 zat           (on-chain, ~75s one-time)
Agent  ->  open session                  (bearer token issued)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  close session                 (refund unused balance on-chain)
```

**Idéal pour :** appels API à haute fréquence, inférence LLM, requêtes de données répétées.

---

### Streaming

Contenu facturé au token et diffusé via **Server-Sent Events (SSE)**. Le serveur déduit du solde de la session chaque mot ou token diffusé.

```
Agent  ->  open session with deposit
Agent  ->  GET /api/stream (SSE)
Server ->  stream word by word, deducting per token
Agent  ->  close session, refund remaining
```

**Idéal pour :** réponses LLM en streaming, flux de données en temps réel, outils d’IA facturés au token.

---

### Charge

Un seul paiement blindé par requête. Le flux HTTP 402 complet est exécuté pour chaque appel. Convient lorsque les requêtes sont peu fréquentes ou à forte valeur.

```
Agent  ->  GET /api/resource
Server ->  402 + challenge (amount, recipient, memo)
Agent  ->  shielded ZEC with memo "zimppy:{challenge_id}"
Agent  ->  GET /api/resource + Authorization: Payment {txid}
Server ->  decrypt with Orchard IVK, verify amount + memo
Server ->  200 OK + Payment-Receipt
```

**Idéal pour :** requêtes unitaires à forte valeur, appels API peu fréquents, endpoints de données premium.

---

## Cas d’utilisation et exemples

### 1. Agent IA

Un agent IA juridique interroge une base de données payante de jurisprudence. En utilisant les sessions blindées Zimppy, ni l’identité du cabinet d’avocats ni les requêtes spécifiques ne sont visibles on-chain, ce qui protège le secret professionnel au niveau de l’infrastructure.

```
Agent opens session (100,000 zat deposit)
-> GET /api/cases?q=patent+infringement+2024     (instant)
-> GET /api/cases?q=prior+art+semiconductor      (instant)
-> GET /api/document/US11234567B2                (instant)
Session closed, unused balance refunded
```

### 2. Agent IA pour pipeline de requêtes médicales

Un agent de diagnostic médical interroge plusieurs bases de données cliniques. Les paiements blindés garantissent que les schémas de requêtes des patients ne peuvent pas être corrélés entre les fournisseurs.

### 3. Agent d’analyse financière

Un agent de trading algorithmique paie pour des API de données de marché en temps réel. Les paiements transparents utilisent de nouvelles T-addresses pour chaque défi, empêchant la corrélation des schémas d’utilisation entre les vendeurs de données.

### 4. Serveur d’outils MCP, outils IA payants

Un serveur MCP (Model Context Protocol) expose des outils IA payants. Chaque invocation d’outil déclenche une charge Zimppy, permettant un marché de capacités IA monétisées.

### 5. Résumeur LLM, paiement au token

Un service de résumé LLM facture les agents par token de sortie via le streaming SSE, avec déduction automatique du solde et remboursement du solde prépayé inutilisé.

---

## Installation

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

## Configuration du portefeuille Zimppy

La CLI Zimppy fournit une interface complète de portefeuille. Toutes les commandes sont disponibles via `npx zimppy`.

### Étape 1 : Créer un portefeuille

```bash
npx zimppy wallet create
```

Génère des clés cryptographiques et affiche votre **phrase de récupération**. Conservez-la en lieu sûr : elle ne peut pas être récupérée si elle est perdue.

### Étape 2 : Vérifier votre adresse et votre solde

```bash
npx zimppy wallet whoami
```

Affiche votre **Unified Address (UA)**, votre **T-address**, votre solde actuel et le réseau actif.

```bash
npx zimppy wallet balance --all
```

Affiche une ventilation du solde par compte sur tous les comptes ZIP-32.

### Étape 3 : Approvisionner votre portefeuille

Envoyez des ZEC à votre Unified Address depuis n’importe quel portefeuille ou plateforme d’échange compatible Zcash. Les dépôts blindés vont directement sur votre compte Orchard.

### Étape 4 : Envoyer et blinder des fonds

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

### Étape 5 : Effectuer une requête Auto-Pay

```bash
npx zimppy request <url>
```

Gère automatiquement l’ensemble du flux 402 -> pay -> retry. Les sessions sont ouvertes et gérées de manière transparente.

---

## Intégrer Zimppy - SDK TypeScript

### Serveur TypeScript - Blindé

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

**Points clés :**
- `zcash({ wallet: 'server' })` charge le portefeuille blindé du serveur
- `mppx.charge()` gère l’ensemble du cycle de vie défi 402 / vérification
- `result.withReceipt()` joint le reçu de paiement cryptographique à la réponse

---
### Serveur TypeScript - Transparent

```typescript
import { Mppx } from 'mppx/server'
import { zcashTransparent } from 'zimppy-ts/server'

const mppx = Mppx.create({
  methods: [await zcashTransparent({ wallet: 'server' })],
  // per-challenge T-address generated automatically (replay-safe)
})
```

Chaque challenge génère une **nouvelle T-address**, ce qui rend les demandes de paiement non corrélables entre les sessions.

---

### Client TypeScript

```typescript
import { Mppx } from 'mppx/client'
import { zcash } from 'zimppy-ts/client'

const mppx = Mppx.create({ methods: [zcash({ wallet: 'default' })] })

// Session opened automatically; 402 is handled transparently
const res = await mppx.fetch('https://api.example.com/resource')
```

Le client intercepte les réponses `402`, ouvre automatiquement une session et réessaie la requête - le code appelant ne nécessite aucune logique spécifique au paiement.

---

## Intégration de Zimppy - SDK Rust

### Serveur Rust (Axum)

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

**Points clés :**
- `MppCharge<Price>` est un extracteur Axum qui vérifie le paiement avant l'exécution du handler
- `WithReceipt` enveloppe la réponse avec un reçu de paiement cryptographique
- `ChargeConfig` définit la logique de tarification - elle peut être dynamique en fonction des paramètres de la requête

---

### Client Rust

```rust
use mpp::client::Fetch;
use zimppy_rs::ZcashPaymentProvider;

let provider = ZcashPaymentProvider::new(wallet_config, &rpc);

let resp = client
    .get("https://api.example.com/resource")
    .send_with_payment(&provider)
    .await?;
```

`send_with_payment` étend n'importe quel client HTTP avec une gestion automatique des `402`, la gestion de session et l'exécution des paiements Zcash.

---

## Référence CLI

| Command | Description |
|---|---|
| `npx zimppy wallet create` | Générer les clés et afficher la phrase de récupération |
| `npx zimppy wallet whoami` | Afficher l'adresse (UA + T-addr), le solde et le réseau |
| `npx zimppy wallet balance --all` | Détail du solde par compte |
| `npx zimppy wallet send <addr> <zat>` | Envoyer des ZEC blindés ou transparents |
| `npx zimppy wallet transfer <from> <to> <zat>` | Transfert interne inter-comptes |
| `npx zimppy wallet shield` | Déplacer les fonds transparents vers Orchard (blindé) |
| `npx zimppy wallet use <name>` | Changer d'identité de portefeuille active |
| `npx zimppy request <url>` | Auto 402 -> payer -> réessayer la requête |

---

## Fonctionnalités clés

### Portefeuilles natifs pour agents

Les portefeuilles Zimppy sont conçus pour un usage programmatique par des agents IA - et non comme des extensions de navigateur gérées par des humains. Les clés sont gérées via la CLI ou les SDK, les comptes peuvent être renouvelés via la **dérivation de comptes ZIP-32**, et le portefeuille prend en charge des flux de paiement entièrement automatisés sans approbation humaine pour chaque transaction.

### Prise en charge multi-agents

Plusieurs agents peuvent opérer à partir du même portefeuille grâce à la **rotation de comptes ZIP-32** - chaque agent dispose de son propre compte avec un suivi de solde isolé, une capacité de transfert inter-comptes et des rapports de solde par compte. Cela permet la gestion d'une flotte de nombreux agents à partir d'une infrastructure de portefeuille unique.

### Transactions Zcash entièrement blindées (Orchard)

Les paiements blindés utilisent le **protocole Orchard** de Zcash - le pool blindé le plus récent et le plus sécurisé. Le serveur vérifie les paiements à l'aide d'une **Incoming Viewing Key (IVK)**, qui peut déchiffrer les notes reçues sans exposer la clé de dépense. Les attaques par rejeu sont empêchées via la **liaison par mémo** - chaque challenge intègre un mémo unique `zimppy:{challenge_id}` qui est vérifié cryptographiquement.

### Sessions , aucune latence par requête

L'architecture de session dissocie l'attente de confirmation on-chain de la latence par requête. Après un dépôt unique (~75 secondes), toutes les requêtes ultérieures avec bearer token sont servies instantanément sans interaction avec la blockchain jusqu'à la fermeture de la session.

### Streaming , paiement par token

La prise en charge native de **SSE (Server-Sent Events)** permet un contenu mesuré avec paiement par token. Idéal pour les API d'inférence de LLM où la longueur de sortie est variable et où la facturation doit refléter la consommation réelle.

### Conformité à la spécification

- Les challenges signés **HMAC-SHA256** empêchent la falsification
- Format d'erreur structuré **RFC 9457** pour une gestion interopérable des erreurs
- **`/.well-known/payment`** pour la découverte automatique des méthodes de paiement par tout agent conforme à MPP

---

## Architecture

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

### Responsabilités des composants

**`zimppy-core`** - Le cœur cryptographique. Gère le déchiffrement des notes Orchard à l'aide de l'IVK du serveur, l'analyse des mémos, la logique de protection contre le rejeu et la vérification des challenges. Écrit en Rust pour les performances et la correction.

**`zimppy-wallet`** - Un portefeuille Zcash natif propulsé par `zingolib`. Gère les clés, les comptes, les soldes blindés/transparents et la soumission des transactions.

**`zimppy-rs`** - Le SDK Rust. Fournit les traits `ChargeMethod`, `SessionMethod` et `PaymentProvider`, ainsi que des extracteurs Axum (`MppCharge`, `WithReceipt`) pour une intégration ergonomique côté serveur.

**`zimppy-napi`** - Les bindings NAPI-RS qui exposent le cœur Rust à Node.js, permettant au SDK TypeScript d'utiliser le même moteur cryptographique sans réimplémenter les primitives Zcash en JavaScript.

**`zimppy-ts`** - Le SDK TypeScript. Enveloppe les bindings NAPI avec des API idiomatiques async/await pour les flux de charge, de session et de streaming SSE.

**`zimppy-cli`** - Le portefeuille en ligne de commande et l'outil de requêtes. Prend en charge l'auto-paiement (402 -> payer -> réessayer), la gestion de session et toutes les opérations du portefeuille.

---
## Exemples et démos

| Exemple | Description |
|---|---|
| `examples/fortune-teller/` | Démonstrations de facturation, de session et de streaming - serveur Rust + client |
| `examples/llm-summarizer/` | Démonstration de streaming LLM avec paiement par jeton |
| `examples/mcp-server/` | Serveur d’outils MCP avec outils d’IA payants |
| `examples/ts-server/` | Implémentation de référence du serveur MPP en TypeScript |

---

## Ce qui est inclus - Résumé des fonctionnalités

| Fonctionnalité | Description |
|---|---|
| **Sessions** | Dépôt unique, requêtes instantanées au porteur, remboursement à la fermeture |
| **Streaming** | Contenu mesuré avec paiement par jeton via SSE |
| **Facturation** | Paiement blindé ou transparent par requête HTTP (flux 402) |
| **Paiements transparents** | Adresses T avec prévention de rejeu par défi + commande de blindage |
| **Multi-comptes** | Rotation des comptes ZIP-32, transferts inter-comptes, soldes par compte |
| **Portefeuille CLI** | Envoyer, blinder, transférer, solde `--all`, whoami, paiement automatique |
| **Double SDK** | TypeScript et Rust |
| **Conforme aux spécifications** | Défis HMAC-SHA256, erreurs RFC 9457, découverte `/.well-known/payment` |

---

*Pour plus d’informations, visitez [zimppy.xyz](https://zimppy.xyz)*

---

## Pages associées

- [Portefeuilles](/using-zcash/wallets) — Portefeuilles Zcash prenant en charge les transactions blindées
- [Pools blindés](/using-zcash/shielded-pools) — Comment les transactions blindées Orchard protègent les données de paiement
- [Processeurs de paiement](/using-zcash/payment-processors) — D’autres moyens d’accepter les paiements en Zcash
- [Actifs blindés Zcash](/zcash-tech/zcash-shielded-assets) — Les ZSA et l’avenir de la programmabilité de Zcash
- [Projets communautaires](/zcash-community/community-projects) — Davantage de projets de l’écosystème Zcash
