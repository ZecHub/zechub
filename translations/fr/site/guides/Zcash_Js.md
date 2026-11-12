# Guide du développeur JS Zcash

**zcash.js** (`@zcashlabs/zcash.js`) est un SDK TypeScript/JavaScript expérimental publié par Zcash Labs le 26 octobre 2026. Il permet aux développeurs de créer des portefeuilles, des clients légers, des tableaux de bord et des applications qui interagissent avec le réseau Zcash depuis Node.js et le navigateur.

> **Statut** : Expérimental (v0.1.1). Les portefeuilles Node persistants requièrent actuellement Linux + `flock`. L’envoi/réception complet dans un navigateur en direct et la migration historique de bases de données de portefeuilles ne sont pas encore entièrement qualifiés. Consultez toujours la documentation officielle avant une utilisation en production.

## Ce que fournit le SDK

- `createPublicClient` — requêtes JSON-RPC sans état et observation des transactions
- `createLightClient` — requêtes et flux lightwallet (gRPC natif sur Node, gRPC-Web dans le navigateur)
- `createWalletClient` — comptes locaux, analyse, propositions, signature, soumission et récupération des paiements enregistrés
- Montants `bigint` exacts, validation du réseau, outils de consultation/d’adresse et utilitaires PCZT
- Moteur de portefeuille de base, workers et ressources locales de preuve Sapling inclus (aucune installation Rust distincte requise)

## Installation

Utilisez **Node.js 22.23.4** (la version épinglée par le package).

```bash
npm install @zcashlabs/zcash.js@0.1.1
```

- Préférez TypeScript avec ESM (`"type": "module"` dans `package.json`).
- Les applications navigateur fonctionnent via un bundler ESM moderne. Le bundler émettra des ressources WASM, worker et de preuve chargées à la demande — elles doivent être déployées avec votre application.

## Première requête de chaîne (sans portefeuille)

```ts
import { createLightClient } from '@zcashlabs/zcash.js';

const light = await createLightClient('https://testnet.zec.rocks:443', {
  network: 'testnet',
});

const tip = await light.getTip();
console.log(tip.height, tip.hash);
```

- Omettre l’option `network` utilise mainnet par défaut (fournissez un endpoint correspondant).
- Un `createPublicClient` est également disponible pour une utilisation JSON-RPC pure.

## Ouvrir un portefeuille

```ts
import { createWalletClient } from '@zcashlabs/zcash.js';

const wallet = await createWalletClient('https://testnet.zec.rocks:443', {
  network: 'testnet',
  storage: { kind: 'node-filesystem', path: './my-wallet' }, // Linux only for durable storage
});

try {
  const accounts = await wallet.accounts.list();
  console.log(accounts);
} finally {
  await wallet.close();
}
```

### Options de stockage

| Environnement     | Option de stockage                                      |
|-----------------|-----------------------------------------------------|
| Node (durable)  | `{ kind: 'node-filesystem', path: './my-wallet' }`  |
| Navigateur         | `{ kind: 'browser-opfs', name: 'my-wallet' }`       |
| Jetable      | `{ kind: 'memory' }`                                |

**Valeurs par défaut importantes** (à compter de v0.1.1) :

- Les dépenses et la monnaie sont uniquement Ironwood par défaut
- Règle de frais : ZIP-317
- Confirmations : 3 fiables / 3 non fiables
- Appelez toujours `wallet.sync()` avant de proposer un paiement

## Flux de travail de portefeuille de haut niveau

1. Créez ou importez un compte mnémonique et attachez un signataire
2. Appelez `wallet.sync()`
3. Demandez une adresse de réception (préférez Unified / Ironwood)
4. Créez une proposition → examinez-la → appelez `wallet.send()`
5. Surveillez la confirmation ou utilisez les opérations enregistrées pour la récupération après un redémarrage

L’application est responsable des octets mnémoniques. Effacez-les de la mémoire lorsqu’ils ne sont plus nécessaires. Présentez toujours une interface d’approbation claire qui indique chaque destinataire, montant, frais, pool et expiration.

Consultez le guide officiel [Wallet](https://zcashlabs.github.io/zcashjs/api/walkthrough.html) pour un exemple complet et fonctionnel.

## Notes sur les plateformes et limitations actuelles

| Capacité            | Node                              | Navigateur                          |
|-----------------------|-----------------------------------|----------------------------------|
| Package               | Node 22.23.4 + ESM                | Bundler ESM moderne + WebAssembly |
| Requêtes légères         | gRPC natif                       | gRPC-Web + CORS                  |
| Stockage durable       | Linux + `flock` uniquement              | OPFS (contexte sécurisé)            |
| Stockage jetable    | mémoire                            | mémoire                           |

Limitations supplémentaires :

- Le stockage Node persistant est actuellement uniquement Linux
- Pas encore de coffre-fort de secrets géré, de service de preuve distant ou d’intégration de signataire matériel
- Le stockage n’est **pas** présenté comme étant chiffré au repos
- N’ouvrez pas simultanément le même stockage de portefeuille depuis plusieurs processus ou onglets de navigateur
- Fermez toujours le portefeuille proprement avec `await wallet.close()`

## Prochaines étapes

- Installation officielle et première requête : [Installation](https://zcashlabs.github.io/zcashjs/api/installation.html)
- Ouverture et configuration d’un portefeuille : [Ouvrir un portefeuille](https://zcashlabs.github.io/zcashjs/api/wallet-runtime.html)
- Flux de travail complet : [Guide du portefeuille](https://zcashlabs.github.io/zcashjs/api/walkthrough.html)
- Référence de l’API : [Référence de l’API](https://zcashlabs.github.io/zcashjs/api/reference.html)
- Limites des plateformes : [Configuration de Node et du navigateur](https://zcashlabs.github.io/zcashjs/api/platforms.html)


## Ressources officielles

- Livre du développeur : [https://zcashlabs.github.io/zcashjs/](https://zcashlabs.github.io/zcashjs/)
- Dépôt GitHub : [https://github.com/zcashlabs/zcashjs](https://github.com/zcashlabs/zcashjs)
- Package npm : `@zcashlabs/zcash.js`


---

*Ce guide est basé sur `@zcashlabs/zcash.js@0.1.1` (octobre 2026). Le SDK est en développement actif — privilégiez toujours la documentation officielle pour connaître les dernières API et limitations.*
