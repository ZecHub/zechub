<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Zimppy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zimppy.xyz

## En bref

- **Zimppy** est une infrastructure de paiement axée sur la confidentialité pour les agents d'IA, qui utilise le Machine Payment Protocol (MPP) de Zcash
- **Déposez une seule fois** on-chain (~25 secondes par bloc depuis NU7), puis effectuez des **requêtes instantanées illimitées** sans aucune interaction avec la blockchain à chaque requête
- Prend en charge les paiements **Zcash entièrement protégés (Orchard)** : l'expéditeur, le destinataire, le montant et le mémo sont tous chiffrés
- Fonctionne avec les **SDK TypeScript et Rust** pour une intégration facile dans les pipelines d'IA et les serveurs d'API
- Idéal pour les **API de LLM, les places de marché de données, les serveurs d'outils MCP** et tout cas d'utilisation de paiement M2M

---

> **Zimppy** est la méthode de paiement du Machine Payment Protocol (MPP) pour Zcash, qui prend en charge les paiements protégés comme transparents. Déposez une seule fois on-chain, puis effectuez des requêtes au porteur instantanées et illimitées, sans aucune interaction avec la chaîne à chaque requête.

---

## Table des matières

1. [Qu'est-ce que Zimppy.xyz ?](#what-is-zimppyxyz)
2. [Pourquoi des paiements protégés pour les agents d'IA ?](#why-shielded-payments-for-ai-agents)
3. [Machine Payment Protocol (MPP)](#machine-payment-protocol-mpp)
4. [Fonctionnement de Zimppy](#how-zimppy-works)
   - [Sessions (recommandé)](#sessions-recommended)
   - [Streaming](#streaming)
   - [Paiement unitaire](#charge)
5. [Cas d'utilisation et exemples](#use-cases--examples)
6. [Installation](#installation)
7. [Configurer le portefeuille Zimppy](#setting-up-the-zimppy-wallet)
8. [Intégrer Zimppy](#integrating-zimppy--typescript-sdk)
   - [Serveur (protégé)](#typescript-server--shielded)
   - [Serveur (transparent)](#typescript-server--transparent)
   - [Client](#typescript-client)
9. [Intégrer Zimppy - SDK Rust](#integrating-zimppy--rust-sdk)
   - [Serveur (Axum)](#rust-server-axum)
   - [Client](#rust-client)
10. [Référence de la CLI](#cli-reference)
11. [Fonctionnalités clés](#key-features)
12. [Architecture](#architecture)
13. [Exemples et démos](#examples--demos)

---

## Qu'est-ce que Zimppy.xyz ?

**Zimppy.xyz** est une infrastructure de paiement axée sur la confidentialité, conçue spécifiquement pour les agents d'IA et les flux de travail automatisés de machine à machine (M2M). Elle implémente le **Machine Payment Protocol (MPP)** en utilisant **Zcash** comme monnaie sous-jacente, et permet des modes de paiement aussi bien protégés (entièrement privés) que transparents.

Contrairement aux systèmes de paiement traditionnels sur blockchain, où chaque transaction est publiquement visible on-chain, Zimppy repose sur une architecture à base de sessions qui élimine la latence par requête tout en préservant la confidentialité cryptographique. Il est ainsi particulièrement adapté aux agents d'IA qui doivent payer des API, des données, de la puissance de calcul ou des outils d'IA de manière programmatique, sans divulguer de métadonnées comportementales.

### Propriétés fondamentales

- **Déposez une seule fois** on-chain (~25 secondes pour un bloc Zcash depuis NU7 ; 75 secondes auparavant)
- **Requêtes instantanées illimitées** après l'ouverture de la session, sans aucune interaction avec la chaîne à chaque requête
- Les **paiements protégés** chiffrent l'expéditeur, le destinataire, le montant et le mémo grâce au protocole Orchard de Zcash
- Les **paiements transparents** utilisent des adresses T propres à chaque challenge pour empêcher les rejeux, sans confidentialité complète
- **Conforme aux spécifications** : challenges HMAC-SHA256, erreurs RFC 9457, découverte via `/.well-known/payment`

---

## Pourquoi des paiements protégés pour les agents d'IA ?

Pour les agents d'IA qui gèrent des flux de travail sensibles (recherche juridique, requêtes médicales, analyse financière, veille concurrentielle), **chaque paiement public est une fuite de métadonnées**. Zimppy est la seule méthode de paiement MPP **confidentielle par défaut**.

### Tableau comparatif de la confidentialité

| Propriété | Chaînes publiques (USDC, ETH) | Zimppy protégé | Zimppy transparent |
|---|---|---|---|
| **Expéditeur** | Visible | Chiffré | Visible |
| **Destinataire** | Visible | Chiffré | Propre à chaque challenge (impossible à relier) |
| **Montant** | Visible | Chiffré | Visible |
| **Mémo** | Visible | Chiffré | N/A |
| **Protection contre le rejeu** | Aucune | Liaison par mémo | Adresse T propre à chaque challenge |
| **Schéma d'utilisation du service** | Reliable | Privé | Impossible à relier (adresse neuve) |

### Le problème de latence, résolu par les sessions

> *« Mais les blocs Zcash prennent toujours 25 secondes (75 secondes avant NU7). »*

**Les sessions résolvent ce problème.** L'attente on-chain n'a lieu qu'**une seule fois**, lors du dépôt. Chaque requête suivante est instantanée.

```
Agent  ->  deposit 100,000 zat           (one on-chain tx, ~25s)
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

Le **Machine Payment Protocol (MPP)** est un protocole standardisé qui permet à des agents logiciels autonomes (agents d'IA, bots, scripts) de découvrir, de négocier et de satisfaire les exigences de paiement pour l'accès à des API, le tout sans intervention humaine.

### Comment MPP s'intègre aux API

MPP suit le flux HTTP **402 Payment Required** :

1. **L'agent demande** une ressource à un point de terminaison d'API payant.
2. **Le serveur répond** avec `402 Payment Required` + un challenge signé (montant, destinataire, mémo).
3. **L'agent paie** à l'aide d'une méthode de paiement compatible (p. ex. Zcash protégé via Zimppy).
4. **L'agent relance** la requête avec `Authorization: Payment {txid}`.
5. **Le serveur vérifie** le paiement de manière cryptographique (déchiffrement par IVK Orchard, vérification du montant et du mémo).
6. **Le serveur répond** avec `200 OK` + un en-tête `Payment-Receipt`.

### Conformité aux spécifications

- Signature des challenges en **HMAC-SHA256**
- Réponses d'erreur structurées selon la **RFC 9457**
- Point de terminaison **`/.well-known/payment`** pour la découverte automatique des méthodes de paiement
- **IVK Orchard** (Incoming Viewing Key) pour la vérification des paiements côté serveur sans exposer les clés de dépense

---

## Fonctionnement de Zimppy

### Sessions (recommandé)

Les sessions constituent le mode d'interaction principal. L'agent dépose un solde on-chain une seule fois, reçoit un jeton au porteur et l'utilise pour toutes les requêtes suivantes avec une latence nulle.

```
Agent  ->  deposit 100,000 zat           (on-chain, ~75s one-time)
Agent  ->  open session                  (bearer token issued)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  close session                 (refund unused balance on-chain)
```

**Idéal pour :** les appels d'API à haute fréquence, l'inférence de LLM, les requêtes de données répétées.

---

### Streaming

Contenu facturé au jeton et diffusé via **Server-Sent Events (SSE)**. Le serveur déduit du solde de la session à chaque mot ou jeton diffusé.

```
Agent  ->  open session with deposit
Agent  ->  GET /api/stream (SSE)
Server ->  stream word by word, deducting per token
Agent  ->  close session, refund remaining
```

**Idéal pour :** les réponses de LLM en streaming, les flux de données en temps réel, les outils d'IA facturés au jeton.

---

### Paiement unitaire

Un seul paiement protégé par requête. Le flux HTTP 402 complet est exécuté à chaque appel. Adapté lorsque les requêtes sont peu fréquentes ou de valeur élevée.

```
Agent  ->  GET /api/resource
Server ->  402 + challenge (amount, recipient, memo)
Agent  ->  shielded ZEC with memo "zimppy:{challenge_id}"
Agent  ->  GET /api/resource + Authorization: Payment {txid}
Server ->  decrypt with Orchard IVK, verify amount + memo
Server ->  200 OK + Payment-Receipt
```

**Idéal pour :** les requêtes ponctuelles de valeur élevée, les appels d'API peu fréquents, les points de terminaison de données premium.

---

## Cas d'utilisation et exemples

### 1. Agent d'IA

Un agent d'IA juridique interroge une base de données de jurisprudence payante. Grâce aux sessions protégées de Zimppy, ni l'identité du cabinet d'avocats ni les requêtes précises ne sont visibles on-chain, ce qui protège le secret professionnel de l'avocat au niveau de l'infrastructure.

```
Agent opens session (100,000 zat deposit)
-> GET /api/cases?q=patent+infringement+2024     (instant)
-> GET /api/cases?q=prior+art+semiconductor      (instant)
-> GET /api/document/US11234567B2                (instant)
Session closed, unused balance refunded
```

### 2. Agent d'IA pour un pipeline de requêtes médicales

Un agent de diagnostic médical interroge plusieurs bases de données cliniques. Les paiements protégés garantissent que les schémas de requêtes concernant les patients ne peuvent pas être reliés d'un fournisseur à l'autre.

### 3. Agent d'analyse financière

Un agent de trading algorithmique paie des API de données de marché en temps réel. Les paiements transparents utilisent des adresses T neuves pour chaque challenge, ce qui empêche de corréler les schémas d'utilisation entre fournisseurs de données.

### 4. Serveur d'outils MCP, outils d'IA payants

Un serveur MCP (Model Context Protocol) expose des outils d'IA payants. Chaque appel d'outil déclenche un paiement Zimppy, ce qui permet une place de marché de capacités d'IA monétisées.

### 5. Résumeur LLM, paiement au jeton

Un service de résumé par LLM facture les agents à chaque jeton produit via le streaming SSE, avec déduction automatique du solde et remboursement du solde prépayé non utilisé.

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

## Configurer le portefeuille Zimppy

La CLI de Zimppy offre une interface de portefeuille complète. Toutes les commandes sont disponibles via `npx zimppy`.

### Étape 1 : créer un portefeuille

```bash
npx zimppy wallet create
```

Génère les clés cryptographiques et affiche votre **phrase de récupération**. Conservez-la en lieu sûr : elle ne peut pas être récupérée en cas de perte.

### Étape 2 : vérifier votre adresse et votre solde

```bash
npx zimppy wallet whoami
```

Affiche votre **adresse unifiée (UA)**, votre **adresse T**, votre solde actuel et le réseau actif.

```bash
npx zimppy wallet balance --all
```

Affiche la répartition du solde par compte pour tous les comptes ZIP-32.

### Étape 3 : approvisionner votre portefeuille

Envoyez des ZEC à votre adresse unifiée depuis n'importe quel portefeuille ou exchange compatible avec Zcash. Les dépôts protégés arrivent directement sur votre compte Orchard.

### Étape 4 : envoyer et protéger des fonds

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

### Étape 5 : effectuer une requête avec paiement automatique

```bash
npx zimppy request <url>
```

Gère automatiquement le flux complet 402 -> paiement -> nouvelle tentative. Les sessions sont ouvertes et gérées de manière transparente.

---

## Intégrer Zimppy - SDK TypeScript

### Serveur TypeScript - protégé

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
- `zcash({ wallet: 'server' })` charge le portefeuille protégé du serveur
- `mppx.charge()` gère l'intégralité du cycle de vie challenge/vérification du 402
- `result.withReceipt()` joint le reçu de paiement cryptographique à la réponse

---

### Serveur TypeScript - transparent

```typescript
import { Mppx } from 'mppx/server'
import { zcashTransparent } from 'zimppy-ts/server'

const mppx = Mppx.create({
  methods: [await zcashTransparent({ wallet: 'server' })],
  // per-challenge T-address generated automatically (replay-safe)
})
```

Chaque challenge génère une **adresse T neuve**, ce qui rend les demandes de paiement impossibles à relier d'une session à l'autre.

---

### Client TypeScript

```typescript
import { Mppx } from 'mppx/client'
import { zcash } from 'zimppy-ts/client'

const mppx = Mppx.create({ methods: [zcash({ wallet: 'default' })] })

// Session opened automatically; 402 is handled transparently
const res = await mppx.fetch('https://api.example.com/resource')
```

Le client intercepte les réponses `402`, ouvre automatiquement une session et relance la requête : le code appelant ne nécessite aucune logique propre au paiement.

---

## Intégrer Zimppy - SDK Rust

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
- `MppCharge<Price>` est un extracteur Axum qui vérifie le paiement avant l'exécution du gestionnaire
- `WithReceipt` enveloppe la réponse avec un reçu de paiement cryptographique
- `ChargeConfig` définit la logique de tarification, qui peut être dynamique selon les paramètres de la requête

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

`send_with_payment` étend n'importe quel client HTTP avec la gestion automatique du 402, la gestion des sessions et l'exécution des paiements Zcash.

---

## Référence de la CLI

| Commande | Description |
|---|---|
| `npx zimppy wallet create` | Générer les clés et afficher la phrase de récupération |
| `npx zimppy wallet whoami` | Afficher l'adresse (UA + adresse T), le solde, le réseau |
| `npx zimppy wallet balance --all` | Répartition du solde par compte |
| `npx zimppy wallet send <addr> <zat>` | Envoyer des ZEC de manière protégée ou transparente |
| `npx zimppy wallet transfer <from> <to> <zat>` | Transfert interne entre comptes |
| `npx zimppy wallet shield` | Déplacer des fonds transparents vers Orchard (protégés) |
| `npx zimppy wallet use <name>` | Changer l'identité de portefeuille active |
| `npx zimppy request <url>` | Requête automatique 402 -> paiement -> nouvelle tentative |

---

## Fonctionnalités clés

### Portefeuilles natifs pour agents

Les portefeuilles Zimppy sont conçus pour une utilisation programmatique par des agents d'IA, et non comme des extensions de navigateur gérées par des humains. Les clés sont gérées via la CLI ou les SDK, les comptes peuvent faire l'objet d'une rotation grâce à la **dérivation de comptes ZIP-32**, et le portefeuille prend en charge des flux de paiement entièrement automatisés, sans approbation humaine pour chaque transaction.

### Prise en charge de plusieurs agents

Plusieurs agents peuvent fonctionner à partir du même portefeuille grâce à la **rotation de comptes ZIP-32** : chaque agent dispose de son propre compte, avec un suivi de solde isolé, la possibilité de transferts entre comptes et un rapport de solde par compte. Cela permet de gérer une flotte de nombreux agents à partir d'une seule infrastructure de portefeuille.

### Transactions Zcash entièrement protégées (Orchard)

Les paiements protégés utilisent le **protocole Orchard** de Zcash, le pool protégé introduit par NU5. Le serveur vérifie les paiements à l'aide d'une **Incoming Viewing Key (IVK)**, qui peut déchiffrer les notes reçues sans exposer la clé de dépense. Les attaques par rejeu sont empêchées grâce à la **liaison par mémo** : chaque challenge intègre un mémo `zimppy:{challenge_id}` unique, vérifié de manière cryptographique.

### Sessions, latence nulle par requête

L'architecture à base de sessions dissocie l'attente de confirmation on-chain de la latence par requête. Après un seul dépôt (~25 secondes depuis NU7), toutes les requêtes suivantes avec jeton au porteur sont servies instantanément, sans aucune interaction avec la blockchain jusqu'à la clôture de la session.

### Streaming, paiement au jeton

La prise en charge native des **SSE (Server-Sent Events)** permet un contenu facturé au jeton. Idéal pour les API d'inférence de LLM, où la longueur des réponses est variable et où la facturation doit refléter la consommation réelle.

### Conformité aux spécifications

- Les challenges signés en **HMAC-SHA256** empêchent la falsification
- Format d'erreur structuré selon la **RFC 9457** pour une gestion des erreurs interopérable
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

### Rôle des composants

**`zimppy-core`** - Le cœur cryptographique. Gère le déchiffrement des notes Orchard à l'aide de l'IVK du serveur, l'analyse des mémos, la logique de protection contre le rejeu et la vérification des challenges. Écrit en Rust pour la performance et la fiabilité.

**`zimppy-wallet`** - Un portefeuille Zcash natif reposant sur `zingolib`. Gère les clés, les comptes, les soldes protégés et transparents ainsi que la soumission des transactions.

**`zimppy-rs`** - Le SDK Rust. Fournit les traits `ChargeMethod`, `SessionMethod` et `PaymentProvider`, ainsi que des extracteurs Axum (`MppCharge`, `WithReceipt`) pour une intégration serveur ergonomique.

**`zimppy-napi`** - Des liaisons NAPI-RS qui exposent le cœur Rust à Node.js, permettant au SDK TypeScript d'utiliser le même moteur cryptographique sans réimplémenter les primitives Zcash en JavaScript.

**`zimppy-ts`** - Le SDK TypeScript. Enveloppe les liaisons NAPI dans des API async/await idiomatiques pour les flux de paiement unitaire, de session et de streaming SSE.

**`zimppy-cli`** - Le portefeuille et outil de requête en ligne de commande. Prend en charge le paiement automatique (402 -> paiement -> nouvelle tentative), la gestion des sessions et toutes les opérations de portefeuille.

---

## Exemples et démos

| Exemple | Description |
|---|---|
| `examples/fortune-teller/` | Démos de paiement unitaire, de session et de streaming - serveur + client Rust |
| `examples/llm-summarizer/` | Démo de streaming LLM facturé au jeton |
| `examples/mcp-server/` | Serveur d'outils MCP avec des outils d'IA payants |
| `examples/ts-server/` | Implémentation de référence d'un serveur MPP en TypeScript |

---

## Contenu - résumé des fonctionnalités

| Fonctionnalité | Description |
|---|---|
| **Sessions** | Dépôt unique, requêtes au porteur instantanées, remboursement à la clôture |
| **Streaming** | Contenu facturé au jeton via SSE |
| **Paiement unitaire** | Paiement protégé ou transparent par requête HTTP (flux 402) |
| **Paiements transparents** | Adresses T avec prévention du rejeu propre à chaque challenge + commande de protection |
| **Multicompte** | Rotation de comptes ZIP-32, transferts entre comptes, soldes par compte |
| **Portefeuille CLI** | Send, shield, transfer, balance --all, whoami, paiement automatique |
| **Double SDK** | TypeScript et Rust |
| **Conforme aux spécifications** | Challenges HMAC-SHA256, erreurs RFC 9457, découverte via `/.well-known/payment` |

---

*Pour plus d'informations, rendez-vous sur [zimppy.xyz](https://zimppy.xyz)*

---

## Pages associées

- [Portefeuilles](/using-zcash/wallets) — Portefeuilles Zcash prenant en charge les transactions protégées
- [Pools protégés](/using-zcash/shielded-pools) — Comment les transactions protégées de Orchard protègent les données de paiement
- [Processeurs de paiement](/using-zcash/payment-processors) — Autres moyens d'accepter des paiements en Zcash
- [Actifs protégés Zcash](/zcash-tech/zcash-shielded-assets) — Les ZSA et l'avenir de la programmabilité de Zcash
- [Projets communautaires](/zcash-community/community-projects) — Davantage de projets de l'écosystème Zcash
