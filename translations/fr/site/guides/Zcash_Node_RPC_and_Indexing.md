<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zcash_Node_RPC_and_Indexing.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Guide pratique : RPC du nœud Zcash et indexation de la blockchain

Cette page est un recueil de recettes pour dialoguer avec un nœud complet Zcash en fonctionnement via JSON-RPC et pour y raccorder un indexeur que les portefeuilles légers et les explorateurs peuvent interroger. Ce n'est **pas** un second guide d'installation.

Pour savoir comment démarrer la pile post-`zcashd` (Zebra + Zallet, Zaino en option, ports, volumes, démarrage en deux phases), consultez la page [Pile Z3](/zcash-tech/z3-stack) et le [dépôt Z3](https://github.com/ZcashFoundation/z3). Pour des notions de base sur les nœuds de consensus, consultez [Nœuds complets](/zcash-tech/full-nodes) et [Nœud complet Zebra](/zcash-tech/zebra-full-node).

`zcashd` a atteint sa fin de vie le 18 juillet 2026. Tout nouveau travail d'opérateur doit viser Zebra (ou [Zakura](/zcash-tech/zakura-node)) accompagné d'un portefeuille ou d'un indexeur, et non `zcashd`.

---

## En bref

* **JSON-RPC** est le moyen par lequel les opérateurs et les portefeuilles interrogent un nœud sur la tête de chaîne, les pairs et (sur un processus de portefeuille) les soldes. Sur Z3, Zebra fournit le RPC du nœud ; Zallet fournit le RPC du portefeuille.
* **Regtest** est l'endroit idéal pour apprendre les appels. Le rpc-router de Z3 sur `http://127.0.0.1:8181` accepte `zebra` / `zebra` et transmet les méthodes du nœud à Zebra et les méthodes du portefeuille à Zallet.
* **Mainnet et testnet** utilisent l'authentification par cookie sur Zebra. Ne recopiez pas le nom d'utilisateur et le mot de passe de regtest sur un nœud public.
* **L'indexation** est une tâche distincte de la validation. Zebra valide. [Zaino](/zcash-tech/zaino) (`--profile indexer` de Z3) fournit un gRPC compatible avec lightwalletd. [Ztreamer](https://github.com/zcashlabs/ztreamer) est un indexeur reposant sur Zakura ; ce n'est pas ce que fournit Z3.
* Le JSON-RPC de Zaino et le gRPC d'indexeur optionnel de Zebra sont destinés à la boucle locale ou à un réseau de confiance. Ne les exposez pas sans authentification sur l'internet public.

---

## Quel processus répond à quel appel

| Vous voulez | S'adresser à | Port hôte mainnet Z3 | Remarques |
| --- | --- | --- | --- |
| Tête de chaîne, pairs, `getblockchaininfo` | JSON-RPC de Zebra | 8232 | Authentification par cookie |
| Solde du portefeuille, adresses, envoi | RPC de Zallet | 28232 | Processus séparé ; logiciel en bêta |
| Blocs compacts pour les portefeuilles légers | gRPC de Zaino | 8137 | Uniquement avec `--profile indexer` ; h2c en clair |
| Proxy JSON-RPC pour explorateur / faucet | JSON-RPC de Zaino | 8237 | Réseau de confiance uniquement |
| S'exercer à tout ce qui précède sans synchronisation | rpc-router regtest de Z3 | 8181 | Nom d'utilisateur `zebra` / mot de passe `zebra` |

Matrice des ports et noms des projets Compose : [Pile Z3](/zcash-tech/z3-stack) et [`z3-contract.yaml`](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml).

---

## Exercez-vous d'abord sur regtest

Depuis une copie locale de Z3, après `./scripts/regtest-init.sh` et `docker compose --env-file .env.regtest up -d` :

```bash
# Node method (Zebra)
curl -s -X POST -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"getblockchaininfo","params":[],"id":1}' \
  http://127.0.0.1:8181

# Wallet method (Zallet)
curl -s -X POST -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"getwalletinfo","params":[],"id":2}' \
  http://127.0.0.1:8181
```

Un résultat `getblockchaininfo` sain contient `"blocks"` et une table `"upgrades"`. Si curl se bloque, le routeur n'est pas démarré ; si vous obtenez `401`, vous interrogez Zebra directement au lieu du routeur (l'accès direct à Zebra sur regtest se fait sur `29232` et attend toujours les identifiants du routeur, sauf si vous les avez modifiés).

Procédure regtest complète, y compris le minage des blocs d'activation : [Z3 `docs/regtest.md`](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md).

---

## JSON-RPC sur mainnet / testnet (authentification par cookie)

Sur mainnet et testnet, Zallet et le service optionnel Zaino lisent un **volume de cookie partagé**. Ce cookie est régénéré au démarrage ; il n'a pas à être sauvegardé.

Ne publiez **pas** le JSON-RPC de Zebra sur l'internet public. Appelez-le depuis le réseau Compose (`zebra:8232`) ou depuis l'hôte uniquement si vous l'avez lié à la boucle locale.

Vérifications habituelles de l'opérateur une fois que Zebra est `/ready` :

```bash
# Wait until Zebra is synced (Z3 helper)
./scripts/check-zebra-readiness.sh

# Then start Zallet
docker compose --env-file .env.mainnet up -d
```

`getblocktemplate` / `getmininginfo` sont des RPC de minage. Les pools qui s'attendaient encore à un processus `zcashd` unique ont besoin de Zebra (ou de Zakura) pour les modèles de blocs, ainsi que du portefeuille de leur choix pour la coinbase. Consultez [Pools de minage Zcash](/using-zcash/zcash-mining-pools) et le [guide de migration](/guides/migration-guide-zcashd-to-zebrad-zallet).

---

## Raccorder un indexeur

La validation et l'indexation sont des tâches différentes.

### Zaino (ce que fournit Z3)

Zaino lit Zebra et fournit une API gRPC compatible avec lightwalletd ainsi qu'un proxy JSON-RPC. Zallet n'a **pas** besoin du conteneur Zaino autonome ; il intègre les bibliothèques Zaino et communique avec Zebra via JSON-RPC. Démarrez Zaino en mode autonome lorsque vous voulez des portefeuilles légers, des explorateurs ou des faucets externes :

```bash
docker compose --env-file .env.mainnet --profile indexer up -d
```

Attendez que Zebra soit synchronisé avant de diriger des clients vers Zaino. Un indexeur en masse en cours de rattrapage avec une forte concurrence de récupération peut ralentir le vérificateur de Zebra ; gardez `fetch_concurrency` à une valeur basse, à un chiffre, jusqu'à ce que l'indexeur ait rattrapé son retard.

gRPC sur regtest (en clair ; port `28137`) :

```bash
# From the Z3 repo, after: scripts/vendor.sh zaino
# and: docker compose --env-file .env.regtest --profile indexer up -d zaino

grpcurl -plaintext \
  -import-path vendor/zaino/zaino-proto/proto \
  -proto service.proto \
  127.0.0.1:28137 \
  cash.z.wallet.sdk.rpc.CompactTxStreamer/GetLightdInfo

grpcurl -plaintext \
  -import-path vendor/zaino/zaino-proto/proto \
  -proto service.proto \
  -d '{}' \
  127.0.0.1:28137 \
  cash.z.wallet.sdk.rpc.CompactTxStreamer/GetLatestBlock
```

Le gRPC de Zaino est en h2c en clair sur tous les réseaux. Terminez le TLS au niveau d'un proxy inverse si quoi que ce soit en dehors de l'hôte doit s'y connecter. Détails : [Zaino](/zcash-tech/zaino) et [Z3 `docs/regtest.md`](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md).

### Autres indexeurs (hors Z3)

* **lightwalletd** — l'ancien serveur de blocs compacts. Toujours déployé en pratique ; Zaino est la voie qui lui succède pour ce rôle.
* **Ztreamer** — un indexeur reposant sur Zakura et une implémentation de `CompactTxStreamer`. Ce n'est pas un service Z3. Consultez le [dépôt Ztreamer](https://github.com/zcashlabs/ztreamer).
* **Zebra `rpc.indexer_listen_addr`** — un écouteur gRPC optionnel *intégré à* Zebra. Z3 ne l'exige pas et ne le publie pas sur l'hôte.

---

## Erreurs courantes

**Appeler des méthodes de portefeuille sur Zebra.** `getwalletinfo` et les RPC d'envoi relèvent de Zallet (ou d'un autre portefeuille), pas du nœud de consensus.

**Démarrer Zallet avant que Zebra soit `/ready`.** Zallet redémarrera en boucle. Utilisez `scripts/check-zebra-readiness.sh` sur mainnet/testnet.

**Recopier les `zebra`/`zebra` de regtest sur mainnet.** Ce n'est pas pour rien que l'authentification par cookie est la valeur par défaut sur mainnet/testnet.

**Considérer Zaino comme un nœud complet.** Zebra (ou Zakura) valide. Zaino indexe.

**Exposer publiquement le JSON-RPC de Zaino ou le gRPC d'indexeur de Zebra.** Ces points d'accès sont destinés à la boucle locale ou à un réseau privé de confiance.

**Supposer que tous les portefeuilles légers parlent déjà Zaino.** Vérifiez la version actuelle du portefeuille par rapport au protocole qu'il implémente réellement.

---

## Pages connexes

* [Pile Z3](/zcash-tech/z3-stack) — installation, ports, volumes, démarrage en deux phases
* [Zaino](/zcash-tech/zaino) — rôle de l'indexeur et notes pour les opérateurs
* [Nœuds complets](/zcash-tech/full-nodes)
* [Nœud complet Zebra](/zcash-tech/zebra-full-node)
* [Nœuds pour portefeuilles légers](/zcash-tech/lightwallet-nodes)
* [Guide de migration : de zcashd vers Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet)
* [Tutoriel Zingolib et Zaino](/guides/zingolib-and-zaino-tutorial)

## Ressources

* [Dépôt Z3](https://github.com/ZcashFoundation/z3)
* [Recueil de recettes regtest Z3 (curl / grpcurl)](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md)
* [FAQ Z3](https://github.com/ZcashFoundation/z3/blob/main/docs/faq.md)
* [Zebra](https://zebra.zfnd.org/)
* [Zaino](https://github.com/zingolabs/zaino)
* [Livre Zallet](https://zcash.github.io/zallet/)
* [Ztreamer](https://github.com/zcashlabs/ztreamer)

**Dernière mise à jour :** septembre 2026
