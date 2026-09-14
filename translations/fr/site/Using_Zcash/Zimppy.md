<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Zimppy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifier la page"/>
</a>

# Zimppy.xyz

## En bref

- **Zimppy** est une infrastructure de paiement axée sur la confidentialité pour les agents IA utilisant le Machine Payment Protocol (MPP) de Zcash
- **Déposez une seule fois** on-chain (~75 secondes), puis effectuez un **nombre illimité de requêtes instantanées** sans interaction avec la blockchain pour chaque requête
- Prend en charge les paiements **Zcash (Orchard) entièrement protégés** — l'expéditeur, le destinataire, le montant et le mémo sont tous chiffrés
- Fonctionne avec des SDK **TypeScript et Rust** pour une intégration facile dans les pipelines IA et les serveurs API
- Idéal pour les **API de LLM, les marketplaces de données, les serveurs d'outils MCP**, et tout cas d'utilisation de paiements M2M

---

> **Zimppy** est la méthode de paiement Machine Payment Protocol (MPP) pour Zcash prenant en charge les paiements protégés et transparents. Déposez une seule fois on-chain, puis effectuez un nombre illimité de requêtes instantanées au porteur sans interaction avec la chaîne pour chaque requête.

---

## Table des matières

1. [Qu'est-ce que Zimppy.xyz ?](#what-is-zimppyxyz)
2. [Pourquoi des paiements protégés pour les agents IA ?](#why-shielded-payments-for-ai-agents)
3. [Machine Payment Protocol (MPP)](#machine-payment-protocol-mpp)
4. [Fonctionnement de Zimppy](#how-zimppy-works)
   - [Sessions (recommandé)](#sessions-recommended)
   - [Streaming](#streaming)
   - [Charge](#charge)
5. [Cas d'utilisation et exemples](#use-cases--examples)
6. [Installation](#installation)
7. [Configuration du wallet Zimppy](#setting-up-the-zimppy-wallet)
8. [Intégration de Zimppy](#integrating-zimppy--typescript-sdk)
   - [Serveur (protégé)](#typescript-server--shielded)
   - [Serveur (transparent)](#typescript-server--transparent)
   - [Client](#typescript-client)
9. [Intégration de Zimppy - SDK Rust](#integrating-zimppy--rust-sdk)
   - [Serveur (Axum)](#rust-server-axum)
   - [Client](#rust-client)
10. [Référence CLI](#cli-reference)
11. [Fonctionnalités clés](#key-features)
12. [Architecture](#architecture)
13. [Exemples et démos](#examples--demos)

---

## Qu'est-ce que Zimppy.xyz ?

**Zimppy.xyz** est une infrastructure de paiement axée sur la confidentialité, conçue spécifiquement pour les agents IA et les flux de travail automatisés de machine à machine (M2M). Elle implémente le **Machine Payment Protocol (MPP)** en utilisant **Zcash** comme devise sous-jacente, permettant des modes de paiement protégés (entièrement privés) et transparents.

Contrairement aux systèmes de paiement blockchain traditionnels, où chaque transaction est publiquement visible on-chain, Zimppy est conçu autour d'une architecture basée sur les sessions qui élimine la latence par requête tout en préservant la confidentialité cryptographique. Cela le rend particulièrement adapté aux agents IA qui doivent payer des API, des données, du calcul ou des outils IA par programmation, sans divulguer de métadonnées comportementales.

### Propriétés fondamentales

- **Déposez une seule fois** on-chain (~75 secondes pour la confirmation Zcash)
- **Nombre illimité de requêtes instantanées** après l'ouverture d'une session, sans interaction avec la chaîne par requête
- Les **paiements protégés** chiffrent l'expéditeur, le destinataire, le montant et le mémo grâce au protocole Orchard de Zcash
- Les **paiements transparents** utilisent des adresses T par challenge pour prévenir les rejouements sans confidentialité totale
- **Conforme aux spécifications**, challenges HMAC-SHA256, erreurs RFC 9457, découverte `/.well-known/payment`

---

## Pourquoi des paiements protégés pour les agents IA ?

Pour les agents IA qui gèrent des flux de travail sensibles, la recherche juridique, les requêtes médicales, l'analyse financière ou l'intelligence concurrentielle, **chaque paiement public constitue une fuite de métadonnées**. Zimppy est la seule méthode de paiement MPP qui est **privée par défaut**.

### Tableau comparatif de la confidentialité

| Propriété | Chaînes publiques (USDC, ETH) | Zimppy protégé | Zimppy transparent |
|---|---|---|---|
| **Expéditeur** | Visible | Chiffré | Visible |
| **Destinataire** | Visible | Chiffré | Par challenge (non corrélable) |
| **Montant** | Visible | Chiffré | Visible |
| **Mémo** | Visible | Chiffré | N/A |
| **Protection contre le rejeu** | Aucune | Liaison par mémo | Adresse T par challenge |
| **Schéma d'utilisation du service** | Corrélable | Privé | Non corrélable (adresse fraîche) |

### Le problème de latence, résolu par les sessions

> *« Mais Zcash a des temps de bloc de 75 secondes. »*

**Les sessions résolvent ce problème.** L'attente on-chain ne se produit qu'**une seule fois**, lors du dépôt. Chaque requête suivante est instantanée.

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

Le **Machine Payment Protocol (MPP)** est un protocole standardisé qui permet aux agents logiciels autonomes (agents IA, bots, scripts) de découvrir, négocier et satisfaire les exigences de paiement pour l'accès aux API, le tout sans intervention humaine.

### Comment MPP s'intègre aux API

MPP suit le flux HTTP **402 Payment Required** :

1. **L'agent demande** une ressource à un endpoint API payant.
2. **Le serveur répond** avec `402 Payment Required` + un challenge signé (montant, destinataire, mémo).
3. **L'agent paie** à l'aide d'une méthode de paiement compatible (par exemple, Zcash protégé avec Zimppy).
4. **L'agent réessaie** la requête avec `Authorization: Payment {txid}`.
5. **Le serveur vérifie** cryptographiquement le paiement (déchiffrement Orchard IVK, vérification du montant + mémo).
6. **Le serveur répond** avec `200 OK` + un en-tête `Payment-Receipt`.

### Conformité aux spécifications

- Signature de challenge **HMAC-SHA256**
- Réponses d'erreur structurées **RFC 9457**
- Endpoint **`/.well-known/payment`** pour la découverte automatique des méthodes de paiement
- **Orchard IVK** (Incoming Viewing Key) pour la vérification côté serveur des paiements sans exposer les clés de dépense

---

## Fonctionnement de Zimppy

### Sessions (recommandé)

Les sessions sont le mode d'interaction principal. L'agent dépose une fois un solde on-chain, reçoit un jeton au porteur et l'utilise pour toutes les requêtes suivantes sans latence.

```
Agent  ->  deposit 100,000 zat           (on-chain, ~75s one-time)
Agent  ->  open session                  (bearer token issued)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  close session                 (refund unused balance on-chain)
```

**Idéal pour :** les appels API à haute fréquence, l'inférence LLM, les requêtes de données répétées.

---

### Streaming

Contenu facturé au token et diffusé via **Server-Sent Events (SSE)**. Le serveur déduit du solde de la session pour chaque mot ou token diffusé.

```
Agent  ->  open session with deposit
Agent  ->  GET /api/stream (SSE)
Server ->  stream word by word, deducting per token
Agent  ->  close session, refund remaining
```

**Idéal pour :** les réponses LLM en streaming, les flux de données en temps réel, les outils IA facturés au token.

---

### Charge

Un paiement protégé unique par requête. Le flux HTTP 402 complet est exécuté à chaque appel. Adapté lorsque les requêtes sont peu fréquentes ou de grande valeur.

```
Agent  ->  GET /api/resource
Server ->  402 + challenge (amount, recipient, memo)
Agent  ->  shielded ZEC with memo "zimppy:{challenge_id}"
Agent  ->  GET /api/resource + Authorization: Payment {txid}
Server ->  decrypt with Orchard IVK, verify amount + memo
Server ->  200 OK + Payment-Receipt
```

**Idéal pour :** les requêtes ponctuelles de grande valeur, les appels API peu fréquents, les endpoints de données premium.

---

## Cas d'utilisation et exemples

### 1. Agent IA

Un agent IA juridique consulte une base de données payante de jurisprudence. Avec les sessions protégées Zimppy, ni l'identité du cabinet d'avocats ni les requêtes spécifiques ne sont visibles on-chain, protégeant ainsi le secret professionnel avocat-client au niveau de l'infrastructure.

```
Agent opens session (100,000 zat deposit)
-> GET /api/cases?q=patent+infringement+2024     (instant)
-> GET /api/cases?q=prior+art+semiconductor      (instant)
-> GET /api/document/US11234567B2                (instant)
Session closed, unused balance refunded
```

### 2. Agent IA pour pipeline de requêtes médicales

Un agent de diagnostic médical interroge plusieurs bases de données cliniques. Les paiements protégés garantissent que les schémas de requêtes des patients ne peuvent pas être corrélés entre les fournisseurs.

### 3. Agent d'analyse financière

Un agent de trading algorithmique paie des API de données de marché en temps réel. Les paiements transparents utilisent des adresses T fraîches pour chaque challenge, empêchant la corrélation des schémas d'utilisation entre les fournisseurs de données.

### 4. Serveur d'outils MCP, outils IA payants

Un serveur MCP (Model Context Protocol) expose des outils IA payants. Chaque invocation d'outil déclenche une charge Zimppy, permettant un marketplace de capacités IA monétisées.

### 5. Résumeur LLM, paiement au token

Un service de résumé LLM facture les agents pour chaque token de sortie via le streaming SSE, avec déduction automatique du solde et remboursement du solde prépayé inutilisé.

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

## Configuration du wallet Zimppy

La CLI Zimppy fournit une interface de wallet complète. Toutes les commandes sont disponibles via `npx zimppy`.

### Étape 1 : Créer un wallet

```bash
npx zimppy wallet create
```

Génère des clés cryptographiques et affiche votre **phrase de récupération**. Conservez-la en sécurité : elle ne pourra pas être récupérée si elle est perdue.

### Étape 2 : Vérifier votre adresse et votre solde

```bash
npx zimppy wallet whoami
```

Affiche votre **Unified Address (UA)**, votre **adresse T**, votre solde actuel et le réseau actif.

```bash
npx zimppy wallet balance --all
```

Affiche une ventilation des soldes par compte pour tous les comptes ZIP-32.

### Étape 3 : Alimenter votre wallet

Envoyez des ZEC vers votre Unified Address depuis n'importe quel wallet ou plateforme d'échange compatible avec Zcash. Les dépôts protégés sont directement envoyés vers votre compte Orchard.

### Étape 4 : Envoyer et protéger des fonds

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

### Étape 5 : Effectuer une requête avec paiement automatique

```bash
npx zimppy request <url>
```

Gère automatiquement le flux complet 402 -> pay -> retry. Les sessions sont ouvertes et gérées de manière transparente.

---

## Intégration de Zimppy - SDK TypeScript

### Serveur TypeScript - Protégé

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
- `zcash({ wallet: 'server' })` charge le wallet protégé du serveur
- `mppx.charge()` gère le cycle de vie complet challenge/vérification 402
- `result.withReceipt()` attache le reçu de paiement cryptographique à la réponse

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

Chaque challenge génère une **adresse T fraîche**, rendant les demandes de paiement non corrélables entre les sessions.

---

### Client TypeScript

```typescript
import { Mppx } from 'mppx/client'
import { zcash } from 'zimppy-ts/client'

const mppx = Mppx.create({ methods: [zcash({ wallet: 'default' })] })

// Session opened automatically; 402 is handled transparently
const res = await mppx.fetch('https://api.example.com/resource')
```

Le client intercepte les réponses `402`, ouvre automatiquement une session et réessaie la requête ; le code appelant ne requiert aucune logique spécifique aux paiements.

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
- `MppCharge<Price>` est un extracteur Axum qui vérifie le paiement avant l'exécution du gestionnaire
- `WithReceipt` enveloppe la réponse avec un reçu de paiement cryptographique
- `ChargeConfig` définit la logique de tarification ; elle peut être dynamique selon les paramètres de la requête

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

`send_with_payment` étend tout client HTTP avec la gestion automatique de 402, la gestion de sessions et l'exécution des paiements Zcash.

---

## Référence CLI

| Commande | Description |
|---|---|
| `npx zimppy wallet create` | Générer des clés et afficher la phrase de récupération |
| `npx zimppy wallet whoami` | Afficher l'adresse (UA + adresse T), le solde, le réseau |
| `npx zimppy wallet balance --all` | Ventilation des soldes par compte |
| `npx zimppy wallet send <addr> <zat>` | Envoyer des ZEC protégés ou transparents |
| `npx zimppy wallet transfer <from> <to> <zat>` | Transfert interne entre comptes |
| `npx zimppy wallet shield` | Déplacer des fonds transparents vers Orchard (protégé) |
| `npx zimppy wallet use <name>` | Changer l'identité active du wallet |
| `npx zimppy request <url>` | Requête automatique 402 -> pay -> retry |

---

## Fonctionnalités clés

### Wallets natifs pour les agents

Les wallets Zimppy sont conçus pour une utilisation programmatique par des agents IA, et non comme des extensions de navigateur gérées par des humains. Les clés sont gérées via la CLI ou les SDK, les comptes peuvent être renouvelés grâce à la **dérivation de compte ZIP-32**, et le wallet prend en charge des flux de paiement entièrement automatisés sans approbation humaine pour chaque transaction.

### Prise en charge multi-agents

Plusieurs agents peuvent opérer depuis le même wallet grâce à la **rotation de comptes ZIP-32** : chaque agent obtient son propre compte avec un suivi isolé des soldes, une capacité de transfert entre comptes et un rapport de solde par compte. Cela permet la gestion d'une flotte de nombreux agents depuis une infrastructure de wallet unique.

### Transactions Zcash entièrement protégées (Orchard)

Les paiements protégés utilisent le **protocole Orchard** de Zcash, le pool protégé le plus récent et le plus sécurisé. Le serveur vérifie les paiements à l'aide d'une **Incoming Viewing Key (IVK)**, qui peut déchiffrer les notes reçues sans exposer la clé de dépense. Les attaques par rejeu sont empêchées grâce à la **liaison par mémo** : chaque challenge intègre un mémo unique `zimppy:{challenge_id}` qui est vérifié cryptographiquement.

### Sessions , aucune latence par requête

L'architecture de sessions dissocie l'attente de confirmation on-chain de la latence par requête. Après un seul dépôt (~75 secondes), toutes les requêtes suivantes avec jeton au porteur sont traitées instantanément sans interaction avec la blockchain jusqu'à la fermeture de la session.

### Streaming , paiement au token

La prise en charge native de **SSE (Server-Sent Events)** permet du contenu facturé au token. Idéal pour les API d'inférence LLM où la longueur de sortie est variable et la facturation doit refléter la consommation réelle.

### Conformité aux spécifications

- Les challenges signés **HMAC-SHA256** empêchent la falsification
- Le format d'erreur structuré **RFC 9457** permet une gestion interopérable des erreurs
- **`/.well-known/payment`** pour la découverte automatique de méthodes de paiement par tout agent conforme à MPP

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

**`zimppy-core`** - Le cœur cryptographique. Gère le déchiffrement des notes Orchard à l'aide de l'IVK du serveur, l'analyse des mémos, la logique de protection contre le rejeu et la vérification des challenges. Écrit en Rust pour les performances et la fiabilité.

**`zimppy-wallet`** - Un wallet Zcash natif alimenté par `zingolib`. Gère les clés, les comptes, les soldes protégés/transparents et la soumission de transactions.

**`zimppy-rs`** - Le SDK Rust. Fournit les traits `ChargeMethod`, `SessionMethod` et `PaymentProvider`, ainsi que des extracteurs Axum (`MppCharge`, `WithReceipt`) pour une intégration serveur ergonomique.

**`zimppy-napi`** - Des liaisons NAPI-RS qui exposent le cœur Rust à Node.js, permettant au SDK TypeScript d'utiliser le même moteur cryptographique sans réimplémenter les primitives Zcash en JavaScript.

**`zimppy-ts`** - Le SDK TypeScript. Enveloppe les liaisons NAPI avec des API async/await idiomatiques pour les flux de charge, de session et de streaming SSE.

**`zimppy-cli`** - Le wallet en ligne de commande et l'outil de requêtes. Prend en charge le paiement automatique (402 -> pay -> retry), la gestion de sessions et toutes les opérations de wallet.

---

## Exemples et démos

| Exemple | Description |
|---|---|
| `examples/fortune-teller/` | Démos de charge, de session et de streaming - serveur + client Rust |
| `examples/llm-summarizer/` | Démo de streaming LLM facturée au token |
| `examples/mcp-server/` | Serveur d'outils MCP avec outils IA payants |
| `examples/ts-server/` | Implémentation de référence d'un serveur MPP TypeScript |

---

## Ce qui est inclus - Résumé des fonctionnalités

| Fonctionnalité | Description |
|---|---|
| **Sessions** | Déposer une fois, requêtes instantanées au porteur, remboursement à la fermeture |
| **Streaming** | Contenu facturé au token via SSE |
| **Charge** | Paiement protégé ou transparent par requête HTTP (flux 402) |
| **Paiements transparents** | Adresses T avec prévention du rejeu par challenge + commande shield |
| **Multi-compte** | Rotation de comptes ZIP-32, transferts entre comptes, soldes par compte |
| **Wallet CLI** | Envoyer, protéger, transférer, balance --all, whoami, paiement automatique |
| **Double SDK** | TypeScript et Rust |
| **Conforme aux spécifications** | Challenges HMAC-SHA256, erreurs RFC 9457, découverte `/.well-known/payment` |

---

*Pour plus d'informations, consultez [zimppy.xyz](https://zimppy.xyz)*

---

## Pages connexes

- [Wallets](/using-zcash/wallets) — Wallets Zcash prenant en charge les transactions protégées
- [Pools protégés](/using-zcash/shielded-pools) — Comment les transactions protégées Orchard protègent les données de paiement
- [Processeurs de paiement](/using-zcash/payment-processors) — Autres moyens d'accepter les paiements Zcash
- [Actifs protégés Zcash](/zcash-tech/zcash-shielded-assets) — Les ZSA et l'avenir de la programmabilité de Zcash
- [Projets communautaires](/zcash-community/community-projects) — Davantage de projets de l'écosystème Zcash
