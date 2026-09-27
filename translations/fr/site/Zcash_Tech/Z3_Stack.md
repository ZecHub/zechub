<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Z3_Stack.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifier la page"/>
</a>

# Stack Z3

La **Stack Z3** est la plateforme de nœud packagée de Zcash Foundation : **Zebra** (nœud complet) + **Zallet** (wallet de nœud complet), avec un indexeur **Zaino** facultatif. Elle est destinée à remplacer un processus `zcashd` autonome, qui regroupait le consensus et un wallet dans un seul binaire et a atteint sa fin de vie le 18 juillet 2026.

L’implémentation de référence est le projet Docker Compose disponible sur [github.com/ZcashFoundation/z3](https://github.com/ZcashFoundation/z3).

---

## TL;DR

* Z3 n’est **pas un nouveau client de consensus**. C’est la manière d’exécuter ensemble la stack post-`zcashd` : Zebra valide la chaîne, Zallet conserve les clés et fournit le RPC de wallet, et Zaino (facultatif) utilise le protocole gRPC de lightwalletd.
* `zcashd` regroupait nœud + wallet. Z3 **sépare ces rôles**. Les plateformes d’échange, pools de minage et autres opérateurs de wallets de nœuds complets migrent vers cette combinaison plutôt que vers Zebra seul.
* Trois projets Compose isolés peuvent fonctionner sur un même hôte : **mainnet**, **testnet** et **regtest**.
* La première synchronisation de mainnet prend environ **24 à 72 heures** et nécessite environ **300 Go**. Regtest démarre en quelques secondes et est l’endroit idéal pour découvrir la stack.
* Zallet intègre les bibliothèques d’indexeur de Zaino et communique avec Zebra via JSON-RPC. Le service Zaino autonome n’est nécessaire que si vous souhaitez un endpoint compatible avec lightwalletd pour des wallets externes.
* Zallet est en **bêta**. Des changements cassants peuvent nécessiter de supprimer et recréer le wallet. Ne le considérez pas comme un logiciel de conservation finalisé pour des montants importants.

---

## Pourquoi Z3 existe

Pendant la majeure partie de l’existence de Zcash, `zcashd` était à la fois le nœud complet de référence et le seul wallet de nœud complet en production. C’est cette conception à laquelle les plateformes d’échange, pools et dépositaires se sont intégrés.

`zcashd` est retiré. Le consensus est passé à [Zebra](/zcash-tech/zebra-full-node) (et désormais aussi à [Zakura](/zcash-tech/zakura-node)). Le wallet intégré est passé à [Zallet](https://github.com/zcash/zallet). Le service aux wallets légers passe de [lightwalletd](/zcash-tech/lightwallet-nodes) à [Zaino](/zcash-tech/zaino).

Ces trois éléments sont des dépôts distincts, avec des cycles de publication et des configurations distincts. Z3 est la colle qui les relie : images épinglées, vérifications d’état qui empêchent le wallet de démarrer avant la synchronisation du nœud, ports et volumes par réseau, et parcours documenté pour les opérateurs.

Le nom est un raccourci informel de l’écosystème — Zebra, Zaino, Zallet — même si le fichier Compose par défaut ne démarre que Zebra et Zallet. Zaino est un profil Compose, pas un troisième processus obligatoire.

---

## Architecture

```
                    ┌──────────────────────── Z3 (per network) ────────────────────────┐
                    │                                                                  │
  peers ◄──P2P──►  Zebra (zebrad)  ──JSON-RPC──►  Zallet                                │
                    │   full node                    │  embeds Zaino libraries          │
                    │                                │  wallet RPC for operators        │
                    │                                └─────────────────────────────────┤
                    │                                                                  │
                    │   Zaino (optional, --profile indexer)                            │
                    │     lightwalletd-compatible gRPC + JSON-RPC proxy                │
                    │            │                                                     │
                    └────────────┼─────────────────────────────────────────────────────┘
                                 ▼
                        light wallets / explorers
```

| Composant | Rôle dans Z3 | Obligatoire ? |
| --- | --- | --- |
| **Zebra** | Synchronise et valide la chaîne, gossip, JSON-RPC, endpoint d’état | Oui |
| **Zallet** | Wallet de nœud complet. Intègre les bibliothèques de Zaino. Se connecte directement au JSON-RPC de Zebra. N’appelle **pas** le conteneur Zaino autonome | Oui |
| **Zaino** | Indexeur autonome. gRPC compatible avec lightwalletd pour les clients légers externes, ainsi qu’un proxy JSON-RPC pour les explorateurs et les faucets | Non — `--profile indexer` |

Z3 épingle les versions d’images dans `docker-compose.yml`. Remplacez-les avec `Z3_ZEBRA_IMAGE`, `Z3_ZAINO_IMAGE` ou `Z3_ZALLET_IMAGE` si vous avez besoin d’un tag différent.

---

## En quoi cela diffère de zcashd

| | zcashd | Z3 |
| --- | --- | --- |
| Langage | C++ (fork de Bitcoin) | Services Rust, orchestrés avec Docker Compose |
| Modèle de processus | Un binaire : nœud + wallet | Conteneurs de nœud et de wallet séparés |
| Consensus | Retiré (fin de vie le 18 juillet 2026) | Zebra (ou un autre nœud compatible) |
| Wallet | `wallet.dat` intégré | Zallet, datadir chiffré avec age |
| Clients légers | Généralement un lightwalletd séparé | Profil Zaino facultatif |
| Configuration | `zcash.conf` | Fichiers par réseau sous `config/<network>/`, plus fichiers d’environnement Compose |
| Réseaux sur un même hôte | Conflits de ports pénibles | Fonctionnalité de premier ordre : `z3-mainnet`, `z3-testnet`, `z3-regtest` |

Si vous avez encore un wallet `zcashd`, utilisez le ZecHubguide de migration[ de ](/guides/migration-guide-zcashd-to-zebrad-zallet) et la commande `migrate-zcashd-wallet` de Zallet plutôt que de copier `wallet.dat` dans le volume Z3.

---

## Réseaux

Z3 regroupe trois projets Compose indépendants. Ils ne partagent ni ports ni volumes.

| Réseau | Nom du projet | Utilisation | Première synchronisation | Fonds réels |
| --- | --- | --- | --- | --- |
| **mainnet** | `z3-mainnet` | Production | 24 à 72 heures | Oui |
| **testnet** | `z3-testnet` | Préproduction sur le réseau de test public | 2 à 12 heures | Non (ZEC de test) |
| **regtest** | `z3-regtest` | Entraînement local : blocs instantanés, aucun pair | Secondes | Non |

Les nouveaux opérateurs devraient commencer sur **regtest**, confirmer les flux RPC et de wallet, puis passer à testnet ou mainnet.

---

## Ports hôte par défaut

Les trois réseaux sont conçus pour coexister sur une même machine. Les valeurs ci-dessous sont les valeurs par défaut publiées ; chacune peut être remplacée via la variable d’environnement `Z3_*` correspondante. La matrice canonique est [`z3-contract.yaml`](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml).

| Service | Mainnet | Testnet | Regtest |
| --- | --- | --- | --- |
| JSON-RPC de Zebra | 8232 | 18232 | 29232 |
| P2P de Zebra | 8233 | 18233 | (non publié) |
| État de Zebra (`/ready`) | 8080 | 18080 | 28080 |
| gRPC de Zaino (profil indexeur) | 8137 | 18137 | 28137 |
| JSON-RPC de Zaino (profil indexeur) | 8237 | 18237 | 28237 |
| RPC de Zallet | 28232 | 40232 | 50232 |

À l’intérieur du réseau Compose, les services se résolvent par leur nom (`zebra`, `zaino`, `zallet`).

---

## Données et sauvegardes

| Volume | Ce qu’il contient | Le sauvegarder ? |
| --- | --- | --- |
| `z3-<network>-chain` | État de la chaîne de Zebra (~300 Go sur mainnet) | Facultatif — peut être resynchronisé |
| `z3-<network>-zallet` | Base de données de wallet chiffrée **et** l’identité age qui la déverrouille | **Oui — c’est le seul volume qui doit être sauvegardé** |
| `z3-<network>-zaino` | État de l’indexeur (uniquement avec le profil indexeur) | Facultatif — reconstructible |
| `z3-<network>-cookie` | Cookie RPC de Zebra | Non — régénéré |

Pour placer l’état de la chaîne sur un autre disque avant le premier démarrage :

```bash
export Z3_CHAIN_DATA_PATH=/mnt/ssd/zebra-state
./scripts/fix-permissions.sh zebra /mnt/ssd/zebra-state
```

`docker compose --env-file .env.<network> --profile "*" down` arrête la stack et conserve les volumes. L’ajout de `-v` les supprime et force une resynchronisation complète. Incluez `--profile "*"` afin que les services contrôlés par profil (indexeur, supervision) soient réellement arrêtés.

---

## Pour commencer

Prérequis : Docker Engine, Docker Compose v2.24.4+, Git. `openssl` est requis uniquement pour regtest.

### Regtest (la manière la plus rapide de voir la stack)

```bash
git clone https://github.com/ZcashFoundation/z3 && cd z3
./scripts/regtest-init.sh
docker compose --env-file .env.regtest up -d
```

Consultez [docs/regtest.md](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md) pour les commandes de test.

### Mainnet (démarrage en deux phases)

Zebra doit terminer sa synchronisation avant que Zallet soit utile. Démarrer Zallet trop tôt le fait entrer dans une boucle de redémarrage jusqu’à ce que `/ready` soit vrai.

```bash
git clone https://github.com/ZcashFoundation/z3 && cd z3

# 1. One-time setup: local config + Zallet wallet identity
./scripts/setup-network.sh mainnet

# 2. Start Zebra and wait until it is synced
docker compose --env-file .env.mainnet up -d zebra
./scripts/check-zebra-readiness.sh

# 3. Start Zallet (and anything else in the default profile)
docker compose --env-file .env.mainnet up -d
```

Testnet suit le même processus avec `.env.testnet` et `./scripts/check-zebra-readiness.sh 18080`.

Les modifications sous `config/<network>/` restent locales et persistent après `git pull`.

### Profils facultatifs

```bash
# Lightwalletd-compatible gRPC + JSON-RPC proxy
docker compose --env-file .env.mainnet --profile indexer up -d

# Prometheus, Grafana, Jaeger, Alertmanager
docker compose --env-file .env.mainnet --profile monitoring up -d
```

Les ports Grafana par défaut sont 3000 (mainnet), 13000 (testnet), 23000 (regtest).

---

## Notes pour les opérateurs

* **Images épinglées.** Z3 ne bascule pas silencieusement vers `:latest`. Modifiez un épinglage dans un changement revu, ou définissez `Z3_<SERVICE>_IMAGE`.
* **Conteneurs non-root.** Les capacités Linux sont supprimées. Les vérifications d’état empêchent le wallet de démarrer tant que Zebra n’est pas prêt. La politique de redémarrage est activée par défaut.
* **Journaux.** Z3 n’épingle pas de pilote de journalisation. Définissez des limites de taille dans la configuration du démon Docker, sans quoi les journaux augmenteront sans limite sur un nœud fonctionnant 24 h/24 et 7 j/7.
* **P2P.** Mainnet et testnet publient le port P2P de Zebra. Derrière un NAT, définissez `ZEBRA_NETWORK__EXTERNAL_ADDR` sur l’adresse que les pairs doivent joindre. Regtest n’a aucun pair.
* **Zaino sur ARM.** L’image amont de Zaino est uniquement `linux/amd64`. Sur Apple Silicon, elle fonctionne sous émulation, sauf si vous la compilez depuis les sources. Zebra et Zallet sont multi-architecture.
* **Hôtes partagés.** Aucune limite CPU ou mémoire n’est définie par défaut. Ajoutez `deploy.resources.limits` dans un fichier de surcharge si la machine n’est pas dédiée au nœud.

Checklist orientée production et FAQ : [docs/faq.md](https://github.com/ZcashFoundation/z3/blob/main/docs/faq.md), [docs/docker-architecture.md](https://github.com/ZcashFoundation/z3/blob/main/docs/docker-architecture.md).

---

## Qui devrait exécuter Z3

**Bon choix**

* Les plateformes d’échange, dépositaires et pools de minage qui utilisaient `zcashd` comme nœud-plus-wallet
* Les opérateurs qui souhaitent un RPC de wallet de nœud complet pris en charge sur un Zebra synchronisé
* Les développeurs ayant besoin de mainnet, testnet et regtest côte à côte
* Toute personne déployant un endpoint privé compatible avec lightwalletd via le profil Zaino

**Généralement le mauvais outil**

* Les utilisateurs finaux qui doivent seulement envoyer et recevoir des ZEC — utilisez un wallet léger tel que ZODL / Zashi, Zingo ou YWallet
* Les personnes voulant uniquement valider la chaîne — exécutez Zebra (ou Zakura) seul
* Les personnes voulant uniquement fournir des blocs compacts — exécutez Zebra + Zaino, ou Zebra + lightwalletd, sans Zallet

---

## Pages connexes

* [Zebra Nœud complet](/zcash-tech/zebra-full-node) — nœud de consensus que Z3 encapsule
* [Zaino](/zcash-tech/zaino) — profil d’indexeur facultatif
* [Nœuds complets](/zcash-tech/full-nodes) — Zebra, Zakura et le zcashd retiré
* [Nœuds lightwallet](/zcash-tech/lightwallet-nodes) — ce à quoi les clients légers se connectent
* [Zakura Nœud](/zcash-tech/zakura-node) — nœud complet alternatif ; ce n’est pas celui que Z3 fournit aujourd’hui
* [Guide de migration : zcashd vers Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet)
* [Ressources pour développeurs](/start-here/developer-resources)

---

## Ressources

* [Dépôt Z3](https://github.com/ZcashFoundation/z3)
* [Contrat Z3 (ports, volumes, noms de projets)](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml)
* [Zebra](https://github.com/ZcashFoundation/zebra) · [Le livre de Zebra](https://zebra.zfnd.org/)
* [Zaino](https://github.com/zingolabs/zaino)
* [Zallet](https://github.com/zcash/zallet) · [Le livre de Zallet](https://zcash.github.io/zallet/)
* [Zcash Forum communautaire — mises à jour Z3](https://forum.zcashcommunity.com/t/zcash-z3-updates-formerly-zcashd-deprecation/48965)
* [Lanceur Z3](https://github.com/Jubrilabdulazeez/z3-launcher) — plan de contrôle communautaire au-dessus de la stack Compose officielle (Hackathon ZecHub)
