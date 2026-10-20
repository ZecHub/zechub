<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zcash_Node_RPC_and_Indexing.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Guide pratique : nœud RPC Zcash et indexation de la blockchain

Cette page est un guide pratique pour communiquer avec un nœud complet Zcash en cours d’exécution via JSON-RPC et pour y associer un indexeur que les portefeuilles légers et explorateurs peuvent interroger. Ce n’est **pas** un second guide d’installation.

Pour savoir comment démarrer la stack après `zcashd` (Zebra + Zallet, Zaino facultatif, ports, volumes, démarrage en deux phases), utilisez la page [Stack Z3](/zcash-tech/z3-stack) et le [dépôt Z3](https://github.com/ZcashFoundation/z3). Pour en savoir plus sur les nœuds de consensus, consultez [Nœuds complets](/zcash-tech/full-nodes) et [nœud complet Zebra](/zcash-tech/zebra-full-node).

`zcashd` a atteint sa fin de vie le 18 juillet 2026. Les nouveaux travaux d’exploitation doivent cibler Zebra (ou [Zakura](/zcash-tech/zakura-node)) avec un portefeuille/indexeur, et non `zcashd`.

---

## TL;DR

* **JSON-RPC** permet aux opérateurs et aux portefeuilles d’interroger un nœud sur le sommet de la chaîne, les pairs et, dans le cas d’un processus de portefeuille, les soldes. Sur Z3, Zebra fournit le RPC du nœud ; Zallet fournit le RPC du portefeuille.
* **Regtest** est l’endroit idéal pour apprendre les appels. Le rpc-router de Z3 sur `http://127.0.0.1:8181` accepte `zebra` / `zebra` et transfère les méthodes de nœud vers Zebra ainsi que les méthodes de portefeuille vers Zallet.
* **Mainnet et testnet** utilisent l’authentification par cookie sur Zebra. Ne copiez pas le nom d’utilisateur/mot de passe de regtest sur un nœud public.
* **L’indexation** est une tâche distincte de la validation. Zebra valide. [Zaino](/zcash-tech/zaino) (Z3 `--profile indexer`) fournit un gRPC compatible avec lightwalletd. [Ztreamer](https://github.com/distractedm1nd/ztreamer) est un indexeur reposant sur Zakura ; ce n’est pas ce que Z3 fournit.
* Le JSON-RPC de Zaino et le gRPC d’indexeur facultatif de Zebra sont destinés à la boucle locale ou à un réseau de confiance. Ne les exposez pas sans authentification sur Internet public.

---

## Quel processus répond à quel appel

| Vous voulez | Communiquer avec | Port hôte mainnet Z3 | Remarques |
| --- | --- | --- | --- |
| Sommet de la chaîne, pairs, `getblockchaininfo` | JSON-RPC de Zebra | 8232 | Authentification par cookie |
| Solde du portefeuille, adresses, envoi | RPC de Zallet | 28232 | Processus séparé ; logiciel bêta |
| Blocs compacts pour portefeuilles légers | gRPC de Zaino | 8137 | Uniquement avec `--profile indexer` ; h2c en clair |
| Proxy JSON-RPC pour explorateur / faucet | JSON-RPC de Zaino | 8237 | Réseau de confiance uniquement |
| S’exercer à tout ce qui précède sans synchronisation | rpc-router regtest Z3 | 8181 | Nom d’utilisateur `zebra` / mot de passe `zebra` |

Matrice des ports et noms de projets Compose : [Stack Z3](/zcash-tech/z3-stack) et [`z3-contract.yaml`](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml).

---

## Entraînez-vous d’abord sur regtest

Depuis un checkout Z3, après `./scripts/regtest-init.sh` et `docker compose --env-file .env.regtest up -d` :

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

Un résultat `getblockchaininfo` sain inclut `"blocks"` et une table `"upgrades"`. Si curl se bloque, le routeur n’est pas démarré ; si vous obtenez `401`, vous contactez Zebra directement au lieu du routeur (le Zebra direct sur regtest est `29232` et attend toujours les identifiants du routeur, sauf si vous les avez modifiés).

Flux de travail regtest complet, y compris le minage des blocs d’activation : [Z3 `docs/regtest.md`](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md).

---

## JSON-RPC mainnet / testnet (authentification par cookie)

Sur mainnet et testnet, Zallet et le service facultatif Zaino lisent un **volume de cookie partagé**. Ce cookie est régénéré au démarrage ; il ne doit pas être sauvegardé.

Ne publiez **pas** le JSON-RPC de Zebra sur Internet public. Appelez-le depuis le réseau Compose (`zebra:8232`) ou depuis l’hôte uniquement s’il est lié à la boucle locale.

Vérifications typiques de l’opérateur après que Zebra est `/ready` :

```bash
# Wait until Zebra is synced (Z3 helper)
./scripts/check-zebra-readiness.sh

# Then start Zallet
docker compose --env-file .env.mainnet up -d
```

`getblocktemplate` / `getmininginfo` sont des RPC de minage. Les pools qui attendaient encore un processus `zcashd` unique ont besoin de Zebra (ou Zakura) pour les modèles, ainsi que du portefeuille qu’ils utilisent pour la coinbase. Consultez [pools de minage Zcash](/using-zcash/zcash-mining-pools) et le [guide de migration](/guides/migration-guide-zcashd-to-zebrad-zallet).

---

## Associer un indexeur

La validation et l’indexation sont des tâches différentes.

### Zaino (ce que fournit Z3)

Zaino lit Zebra et fournit une API gRPC compatible avec lightwalletd ainsi qu’un proxy JSON-RPC. Zallet n’a **pas** besoin du conteneur autonome Zaino ; il intègre les bibliothèques Zaino et communique avec Zebra via JSON-RPC. Démarrez Zaino autonome lorsque vous souhaitez utiliser des portefeuilles légers, explorateurs ou faucets externes :

```bash
docker compose --env-file .env.mainnet --profile indexer up -d
```

Attendez que Zebra soit synchronisé avant de diriger les clients vers Zaino. Un indexeur en masse en rattrapage avec une forte concurrence de récupération peut ralentir le vérificateur de Zebra ; maintenez `fetch_concurrency` à quelques unités jusqu’à ce que l’indexeur ait rattrapé son retard.

gRPC regtest (en clair ; port `28137`) :

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

Le gRPC de Zaino est du h2c en clair sur tous les réseaux. Terminez TLS sur un proxy inverse si quoi que ce soit hors de l’hôte s’y connecte. Détails : [Zaino](/zcash-tech/zaino) et [Z3 `docs/regtest.md`](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md).

### Autres indexeurs (pas Z3)

* **lightwalletd** — l’ancien serveur de blocs compacts. Toujours déployé dans la nature ; Zaino est la voie successeur pour ce rôle.
* **Ztreamer** — un indexeur reposant sur Zakura et une implémentation de `CompactTxStreamer`. Ce n’est pas un service Z3. Consultez le [dépôt Ztreamer](https://github.com/distractedm1nd/ztreamer).
* **Zebra `rpc.indexer_listen_addr`** — un écouteur gRPC facultatif *à l’intérieur* de Zebra. Z3 ne l’exige pas et ne le publie pas sur l’hôte.

---

## Erreurs courantes

**Appeler des méthodes de portefeuille sur Zebra.** `getwalletinfo` et les RPC d’envoi appartiennent à Zallet (ou à un autre portefeuille), et non au nœud de consensus.

**Démarrer Zallet avant que Zebra soit `/ready`.** Zallet redémarrera en boucle. Utilisez `scripts/check-zebra-readiness.sh` sur mainnet/testnet.

**Copier `zebra`/`zebra` de regtest sur mainnet.** L’authentification par cookie est la valeur par défaut sur mainnet/testnet pour une bonne raison.

**Traiter Zaino comme un nœud complet.** Zebra (ou Zakura) valide. Zaino indexe.

**Exposer publiquement le JSON-RPC de Zaino ou le gRPC d’indexeur de Zebra.** Ces points d’accès sont destinés à la boucle locale ou à un réseau privé de confiance.

**Supposer que chaque portefeuille léger parle déjà Zaino.** Vérifiez la version actuelle du portefeuille par rapport au protocole qu’il implémente réellement.

---

## Pages associées

* [Stack Z3](/zcash-tech/z3-stack) — installation, ports, volumes, démarrage en deux phases
* [Zaino](/zcash-tech/zaino) — rôle de l’indexeur et notes destinées aux opérateurs
* [Nœuds complets](/zcash-tech/full-nodes)
* [nœud complet Zebra](/zcash-tech/zebra-full-node)
* [Nœuds Lightwallet](/zcash-tech/lightwallet-nodes)
* [Guide de migration : zcashd vers Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet)
* [Zingolib et tutoriel Zaino](/guides/zingolib-and-zaino-tutorial)

## Ressources

* [Dépôt Z3](https://github.com/ZcashFoundation/z3)
* [Guide pratique regtest Z3 (curl / grpcurl)](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md)
* [FAQ Z3](https://github.com/ZcashFoundation/z3/blob/main/docs/faq.md)
* [Zebra](https://zebra.zfnd.org/)
* [Zaino](https://github.com/zingolabs/zaino)
* [Livre Zallet](https://zcash.github.io/zallet/)
* [Ztreamer](https://github.com/distractedm1nd/ztreamer)

**Dernière mise à jour :** septembre 2026
