<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Z3_Stack.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Z3 Stack

La **Z3 Stack** est la plateforme de nœud packagée de la Zcash Foundation : **Zebra** (nœud complet) + **Zallet** (portefeuille de nœud complet), avec un indexeur **Zaino** en option. Elle est destinée à remplacer un processus `zcashd` autonome, qui regroupait le consensus et un portefeuille dans un seul binaire et a atteint sa fin de vie le 18 juillet 2026.

L'implémentation de référence est le projet Docker Compose disponible sur [github.com/ZcashFoundation/z3](https://github.com/ZcashFoundation/z3).

> **Statut au 14 novembre 2026 : les versions épinglées par défaut sont antérieures à NU7.** La valeur `docker-compose.yml` de Z3 a été modifiée pour la dernière fois le 10 août 2026. Elle épingle toujours `zfnd/zebra:6.2.3` et `zodlinc/zallet:v0.1.0-beta.1`, lancés comme binaire `zallet-zaino`. [NU7](NU7.md) a été activé sur Mainnet au bloc 3,543,405 le 6 novembre 2026, et seuls Zebra 7.0.0 ou une version ultérieure le suivent : un Zebra 6.x reste soumis aux anciennes règles et se détache de la chaîne réelle. Zallet v0.1.0-beta.4, la première version qui suit NU7, ne fournit plus du tout `zallet-zaino`. Vérifiez le dépôt pour trouver des versions épinglées plus récentes avant le déploiement. Si vous remplacez vous-même les images, notez que le backend `zebra` restant de Zallet lit directement le répertoire d’état de Zebra, donc Zallet doit s’exécuter sur le même hôte et pouvoir accéder à ce répertoire ([Zallet](Zallet.md)).

---

## En bref

* Z3 n’est **pas un nouveau client de consensus**. C’est la façon d’exécuter ensemble la pile post-`zcashd` : Zebra valide la chaîne, Zallet détient les clés et fournit le RPC du portefeuille, et Zaino (facultatif) utilise le protocole gRPC lightwalletd.
* `zcashd` regroupe le nœud et le portefeuille. Z3 **sépare ces rôles**. Les exchanges, les pools de minage et les autres opérateurs de portefeuilles à nœud complet migrent vers cette combinaison plutôt que vers Zebra seul.
* Trois projets Compose isolés peuvent fonctionner sur un même hôte : **mainnet**, **testnet** et **regtest**.
* La première synchronisation du mainnet prend environ **24 à 72 heures** et nécessite environ **300 Go**. Regtest démarre en quelques secondes et constitue le bon environnement pour découvrir la pile.
* Dans l’image Z3 épinglée, Zallet utilise son backend `zallet-zaino` (les bibliothèques d’indexation de Zaino) et communique avec Zebra via JSON-RPC. Zallet a supprimé ce backend dans la version v0.1.0-beta.4 ; les versions actuelles de Zallet lisent directement l’état de Zebra. Le service Zaino autonome n’est nécessaire que si vous souhaitez un point de terminaison compatible avec lightwalletd pour des portefeuilles externes.
* Zallet est en **bêta**. Des changements incompatibles peuvent nécessiter la suppression et la recréation du portefeuille. Ne le considérez pas comme un logiciel de conservation de fonds abouti pour des sommes importantes.

---

## Pourquoi Z3 existe

Pendant la majeure partie de l'existence de Zcash, `zcashd` était à la fois le nœud complet de référence et le seul portefeuille de nœud complet en production. C'est sur cette conception que se sont appuyés les exchanges, les pools et les dépositaires pour leurs intégrations.

`zcashd` est retiré. Le consensus est passé à [Zebra](/zcash-tech/zebra-full-node) (et désormais aussi à [Zakura](/zcash-tech/zakura-node)). Le portefeuille intégré est passé à [Zallet](https://github.com/zcash/zallet). Le service des portefeuilles légers passe de [lightwalletd](/zcash-tech/lightwallet-nodes) à [Zaino](/zcash-tech/zaino).

Ces trois éléments ont des dépôts séparés, des cycles de publication séparés et des configurations séparées. Z3 fait le lien : images épinglées, contrôles de santé qui maintiennent le portefeuille arrêté tant que le nœud n'est pas synchronisé, ports et volumes propres à chaque réseau, et une procédure documentée pour les opérateurs.

Le nom est un raccourci informel de l'écosystème (Zebra, Zaino, Zallet), même si le fichier Compose par défaut ne démarre que Zebra et Zallet. Zaino est un profil Compose, pas un troisième processus obligatoire.

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
| **Zebra** | Synchronise et valide la chaîne, propage les informations au réseau, fournit JSON-RPC et un point de contrôle de santé | Oui |
| **Zallet** | Portefeuille de nœud complet. L’image beta.1 épinglée exécute le backend de la bibliothèque Zaino (`zallet-zaino`, supprimé dans la version beta.4 de Zallet) et se connecte directement à JSON-RPC de Zebra. N’appelle **pas** le conteneur autonome Zaino | Oui |
| **Zaino** | Indexeur autonome. gRPC compatible avec lightwalletd pour les clients légers externes, ainsi qu’un proxy JSON-RPC pour les explorateurs et les faucets | Non — `--profile indexer` |

Z3 épingle les versions des images dans `docker-compose.yml`. Remplacez-les avec `Z3_ZEBRA_IMAGE`, `Z3_ZAINO_IMAGE` ou `Z3_ZALLET_IMAGE` si vous avez besoin d'une autre étiquette.

---

## En quoi cela diffère de zcashd

| | zcashd | Z3 |
| --- | --- | --- |
| Langage | C++ (fork de Bitcoin) | Services Rust, orchestrés avec Docker Compose |
| Modèle de processus | Un seul binaire : nœud + portefeuille | Conteneurs séparés pour le nœud et le portefeuille |
| Consensus | Retiré (fin de support le 18 juillet 2026) | Zebra (ou un autre nœud compatible) |
| Portefeuille | `wallet.dat` intégré | Zallet, répertoire de données chiffré avec age |
| Clients légers | Généralement un lightwalletd séparé | Profil Zaino optionnel |
| Configuration | `zcash.conf` | Fichiers par réseau sous `config/<network>/` plus fichiers d'environnement Compose |
| Plusieurs réseaux sur un hôte | Conflits de ports pénibles | Pris en charge nativement : `z3-mainnet`, `z3-testnet`, `z3-regtest` |

Si vous avez encore un portefeuille `zcashd`, utilisez le [guide de migration](/guides/migration-guide-zcashd-to-zebrad-zallet) de ZecHub et la commande `migrate-zcashd-wallet` de Zallet plutôt que de copier `wallet.dat` dans le volume Z3.

---

## Réseaux

Z3 se compose de trois projets Compose indépendants. Ils ne partagent ni ports ni volumes.

| Réseau | Nom du projet | Utilisation | Première synchronisation | Fonds réels |
| --- | --- | --- | --- | --- |
| **mainnet** | `z3-mainnet` | Production | 24 à 72 heures | Oui |
| **testnet** | `z3-testnet` | Préproduction sur le réseau de test public | 2 à 12 heures | Non (ZEC de test) |
| **regtest** | `z3-regtest` | Pratique locale : blocs instantanés, aucun pair | Quelques secondes | Non |

Les nouveaux opérateurs devraient commencer par le **regtest**, vérifier le RPC et le fonctionnement du portefeuille, puis passer au testnet ou au mainnet.

---

## Ports par défaut de l'hôte

Les trois réseaux sont conçus pour coexister sur une même machine. Les valeurs ci-dessous sont les valeurs publiées par défaut ; chacune peut être remplacée via la variable d'environnement `Z3_*` correspondante. La matrice de référence se trouve dans [`z3-contract.yaml`](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml).

| Service | Mainnet | Testnet | Regtest |
| --- | --- | --- | --- |
| JSON-RPC Zebra | 8232 | 18232 | 29232 |
| P2P Zebra | 8233 | 18233 | (non publié) |
| Santé Zebra (`/ready`) | 8080 | 18080 | 28080 |
| gRPC Zaino (profil indexeur) | 8137 | 18137 | 28137 |
| JSON-RPC Zaino (profil indexeur) | 8237 | 18237 | 28237 |
| RPC Zallet | 28232 | 40232 | 50232 |

À l'intérieur du réseau Compose, les services sont résolus par leur nom (`zebra`, `zaino`, `zallet`).

---

## Données et sauvegardes

| Volume | Contenu | À sauvegarder ? |
| --- | --- | --- |
| `z3-<network>-chain` | État de la chaîne Zebra (~300 Go sur le mainnet) | Facultatif : resynchronisable |
| `z3-<network>-zallet` | Base de données chiffrée du portefeuille **et** l'identité age qui la déverrouille | **Oui : c'est le seul volume qui doit être sauvegardé** |
| `z3-<network>-zaino` | État de l'indexeur (uniquement avec le profil indexeur) | Facultatif : reconstructible |
| `z3-<network>-cookie` | Cookie RPC de Zebra | Non : régénéré |

Pour placer l'état de la chaîne sur un autre disque avant le premier démarrage :

```bash
export Z3_CHAIN_DATA_PATH=/mnt/ssd/zebra-state
./scripts/fix-permissions.sh zebra /mnt/ssd/zebra-state
```

`docker compose --env-file .env.<network> --profile "*" down` arrête la pile et conserve les volumes. Ajouter `-v` les supprime et force une resynchronisation complète. Incluez `--profile "*"` pour que les services liés à un profil (indexeur, supervision) soient réellement arrêtés.

---

## Prise en main

Prérequis : Docker Engine, Docker Compose v2.24.4+, Git. `openssl` n'est nécessaire que pour le regtest.

### Regtest (le moyen le plus rapide de découvrir la pile)

```bash
git clone https://github.com/ZcashFoundation/z3 && cd z3
./scripts/regtest-init.sh
docker compose --env-file .env.regtest up -d
```

Consultez [docs/regtest.md](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md) pour les commandes de test.

### Mainnet (démarrage en deux phases)

Zebra doit avoir terminé sa synchronisation avant que Zallet soit utile. Démarrer Zallet trop tôt le fait redémarrer en boucle jusqu'à ce que `/ready` soit vrai.

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

Pour le testnet, la procédure est la même avec `.env.testnet` et `./scripts/check-zebra-readiness.sh 18080`.

Les modifications effectuées sous `config/<network>/` restent locales et survivent à `git pull`.

### Profils optionnels

```bash
# Lightwalletd-compatible gRPC + JSON-RPC proxy
docker compose --env-file .env.mainnet --profile indexer up -d

# Prometheus, Grafana, Jaeger, Alertmanager
docker compose --env-file .env.mainnet --profile monitoring up -d
```

Les ports Grafana par défaut sont 3000 (mainnet), 13000 (testnet) et 23000 (regtest).

---

## Notes pour les opérateurs

* **Images épinglées.** Z3 ne bascule pas silencieusement vers `:latest`. Modifiez une version épinglée dans une modification examinée ou définissez `Z3_<SERVICE>_IMAGE`. Les versions épinglées n’ont pas changé depuis août 2026 et sont donc antérieures à NU7 (voir la note d’état en haut).
* **Conteneurs sans privilèges root.** Les capacités Linux sont supprimées. Les contrôles d’état empêchent le portefeuille de démarrer tant que Zebra n’est pas prêt. La politique de redémarrage est activée par défaut.
* **Journaux.** Z3 n’impose aucun pilote de journalisation. Définissez des limites de taille dans la configuration du démon Docker, sinon les journaux augmenteront sans limite sur un nœud qui fonctionne 24 h/24 et 7 j/7.
* **P2P.** Mainnet et testnet publient le port P2P de Zebra. Derrière un NAT, définissez `ZEBRA_NETWORK__EXTERNAL_ADDR` sur l’adresse que les pairs doivent contacter. Regtest n’a aucun pair.
* **Zaino sur ARM.** L’image Zaino en amont est uniquement `linux/amd64`. Sur Apple Silicon, elle s’exécute en émulation, sauf si vous la compilez à partir du code source. Zebra et Zallet sont multi-architecture.
* **Hôtes partagés.** Aucune limite de processeur ou de mémoire n’est définie par défaut. Ajoutez `deploy.resources.limits` dans un fichier de surcharge si la machine n’est pas réservée au nœud.

Liste de contrôle pour la production et FAQ : [docs/faq.md](https://github.com/ZcashFoundation/z3/blob/main/docs/faq.md), [docs/docker-architecture.md](https://github.com/ZcashFoundation/z3/blob/main/docs/docker-architecture.md).

---

## Qui devrait utiliser Z3

**Cas adaptés**

* Les exchanges, les dépositaires et les pools de minage qui utilisaient `zcashd` comme nœud et portefeuille
* Les opérateurs qui veulent un RPC de portefeuille de nœud complet pris en charge, connecté à un Zebra synchronisé
* Les développeurs qui ont besoin du mainnet, du testnet et du regtest côte à côte
* Toute personne qui met en place un point de terminaison privé compatible lightwalletd via le profil Zaino

**Généralement pas le bon outil**

* Utilisateurs finaux qui ont seulement besoin d’envoyer et de recevoir des ZEC — utilisez un client léger comme ZODL / Zashi, Zingo ou Zkool (le successeur maintenu de YWallet)
* Personnes qui veulent seulement valider la chaîne — exécutez Zebra (ou Zakura) seul
* Personnes qui veulent seulement servir des blocs compacts — exécutez Zebra + Zaino, ou Zebra + lightwalletd, sans Zallet

---

## Pages connexes

* [Nœud complet Zebra](/zcash-tech/zebra-full-node) : le nœud de consensus qu'encapsule Z3
* [Zaino](/zcash-tech/zaino) : profil indexeur optionnel
* [Nœuds complets](/zcash-tech/full-nodes) : Zebra, Zakura et le zcashd retiré
* [Nœuds pour portefeuilles légers](/zcash-tech/lightwallet-nodes) : ce avec quoi communiquent les clients légers
* [Nœud Zakura](/zcash-tech/zakura-node) : nœud complet alternatif ; ce n'est pas celui que Z3 fournit aujourd'hui
* [Guide de migration : de zcashd vers Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet)
* [Ressources pour les développeurs](/start-here/developer-resources)

---

## Ressources

* [Dépôt Z3](https://github.com/ZcashFoundation/z3)
* [Contrat Z3 (ports, volumes, noms de projets)](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml)
* [Zebra](https://github.com/ZcashFoundation/zebra) · [Le livre Zebra](https://zebra.zfnd.org/)
* [Zaino](https://github.com/zingolabs/zaino)
* [Zallet](https://github.com/zcash/zallet) · [Le livre Zallet](https://zcash.github.io/zallet/)
* [Forum de la communauté Zcash : actualités de Z3](https://forum.zcashcommunity.com/t/zcash-z3-updates-formerly-zcashd-deprecation/48965)
* [Z3 Launcher](https://github.com/Jubrilabdulazeez/z3-launcher) : plan de contrôle communautaire pour la pile Compose officielle (hackathon ZecHub)
