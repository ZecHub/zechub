# Zinder indexeur

Zinder est un indexeur Zcash auto-hébergé, écrit en Rust et publié par la Zcash Foundation. Il lit une fois la chaîne depuis un nœud complet Zebra ou Zakura, en stocke une vue cohérente et fournit cette vue à plusieurs portefeuilles, applications et explorateurs simultanément. Les portefeuilles légers existants peuvent y accéder au moyen d’un adaptateur compatible avec lightwalletd.

> **Zinder est en alpha.** Son propre README indique que l’API native, la surface de compatibilité lightwalletd, les structures de stockage et la topologie de déploiement changeront, et qu’une version étiquetée ne constitue pas une promesse de stabilité. Épinglez des versions exactes et attendez-vous à des mises à niveau incompatibles.

## En bref

* **Zebra** ou **Zakura** valide la chaîne. **Zinder** indexe ce que possède le nœud et le fournit aux clients.
* Deux moyens d’accès : l’API gRPC `WalletQuery` propre à Zinder, et un adaptateur distinct qui parle le protocole `CompactTxStreamer` de lightwalletd, afin que les portefeuilles conçus pour lightwalletd puissent s’y connecter sans modification du code.
* Chaque lecture est épinglée à un état de chaîne unique (une « époque »), de sorte qu’un lot de synchronisation ne mélange jamais des données de deux sommets de chaîne concurrents. Les clés et l’analyse protégée restent dans le portefeuille.
* Il est conçu pour qu’un opérateur exécute un nœud et serve de nombreux consommateurs. Placez les points de terminaison publics derrière vos propres mécanismes TLS, d’authentification et de limitation de débit.
* Les versions sont publiées rapidement (de 0.7.0 à 0.12.0 entre le 10 et le 14 novembre 2026), et plusieurs étaient incompatibles. Lisez le journal des modifications avant chaque mise à niveau.

## Où Zinder s’insère

Les portefeuilles légers ne communiquent jamais directement avec un nœud complet. Ils demandent à un indexeur des blocs compacts, des états d’arbres et des données de transaction (voir [Nœuds Lightwallet](/zcash-tech/lightwallet-nodes)). L’écosystème Zcash compte désormais plusieurs indexeurs pouvant faire cela :

| Indexeur | Langage | Responsable | Communique avec | Notes |
|:--|:--|:--|:--|:--|
| lightwalletd | Go | Communauté ECC / Zcash | Zebra ou zcashd | Le serveur de portefeuille léger d’origine |
| [Zaino](/zcash-tech/zaino) | Rust | Zingo Labs | Zebra ou zcashd | Profil d’indexeur facultatif dans la pile Z3 |
| [Ztreamer](https://github.com/zcashlabs/ztreamer) | Rust | zcashlabs | Nœud Zakura intégré | Voir le benchmark [Zaino contre Ztreamer](/zcash-tech/indexer-benchmark-zaino-vs-ztreamer) |
| **Zinder** | Rust | Zcash Foundation | Zebra 7.0.0 ou Zakura 1.8.6 (nœud d’archive) | Alpha. API native, adaptateur lightwalletd et lectures facultatives pour explorateur |

La documentation de Zinder indique clairement quand il s’agit du bon choix : il est particulièrement adapté lorsque l’accès à la chaîne doit survivre à un processus de portefeuille, servir plusieurs consommateurs indépendants ou rester séparé du code d’un portefeuille donné. Pour un portefeuille unique étroitement couplé, un indexeur intégré peut être plus simple, et un consommateur qui n’a besoin que des données déjà détenues par le nœud peut utiliser directement le RPC de Zebra.

## Comment il est construit

Zinder répartit le travail entre des processus distincts, chacun ayant une tâche :

| Exécution | Rôle |
|:--|:--|
| `zinder-ingest` | Le seul écrivain du magasin de chaîne canonique (RocksDB). Suit le nœud, gère les réorganisations et maintient l’état actif du mempool |
| `zinder-projector` | Le seul écrivain du magasin de portefeuilles. Construit et suit la vue de la chaîne façonnée pour les portefeuilles |
| `zinder-query` | Fournit l’API gRPC native `WalletQuery` |
| `zinder-compat-lightwalletd` | Fournit l’API `CompactTxStreamer` de lightwalletd sur les mêmes données |

Un plan d’explorateur facultatif (`zinder-explorer` avec `ExplorerQuery`) fournit des résumés de blocs, des détails de transactions, des vues du mempool et une fonction de recherche, et un adaptateur facultatif fournit l’API REST et l’API WebSocket de l’explorateur CipherScan. Aucun ne fait partie des images de version.

Chaque exécution expose `/healthz`, `/readyz` et `/metrics`. Les lecteurs ne signalent leur disponibilité que lorsque leurs copies du magasin de chaîne et du magasin de portefeuilles pointent exactement vers le même état de chaîne.

## Moyens de connexion

* Les **portefeuilles légers existants** conservent leur intégration lightwalletd et la dirigent vers `zinder-compat-lightwalletd`. La documentation de Zinder distingue la compatibilité de protocole de la prise en charge : un portefeuille nommé n’est considéré comme pris en charge qu’après que sa version actuelle a passé une certification de bout en bout. La version 0.10.0 a corrigé le champ de version du protocole `GetLightdInfo` afin que Zingo puisse se synchroniser.
* Les **clients natifs** appellent `zinder-query` pour des lectures épinglées, des blocs compacts, des flux d’événements de chaîne et de mempool, ainsi que des résultats de diffusion avec des raisons de rejet typées.
* Les **applications Rust** utilisent le crate `zinder-client`, un SDK conçu d’abord pour l’accès distant qui se connecte à `zinder-query` sans lier la pile de stockage.
* Les **explorateurs et backends** combinent les lectures de portefeuille avec le plan facultatif `ExplorerQuery`.

## Exécution

Le guide de démarrage rapide amont lance un nœud avec la pile [Z3](/zcash-tech/z3-stack), puis Zinder avec Docker Compose depuis le dépôt Zinder :

```bash
# In the Z3 checkout
Z3_NETWORK=testnet docker compose up -d

# In the Zinder checkout
docker compose --env-file deploy/.env.testnet \
  -f deploy/docker-compose.yml up -d --build
```

Les fichiers d’environnement pour Mainnet et pour un nœud Zakura (`deploy/.env.zakura-mainnet`, `deploy/.env.zakura-testnet`) se trouvent à côté. Depuis la version 0.11.0, le fichier Compose ne suppose plus Z3 : le fichier d’environnement doit indiquer le réseau du nœud, le volume de cookie et l’adresse RPC.

Ports hôtes par défaut (Testnet ajoute 10000) :

| Service | Mainnet | Testnet |
|:--|:--|:--|
| gRPC natif `WalletQuery` | 9102 | 19102 |
| gRPC compatible avec lightwalletd | 9067 | 19067 |
| Disponibilité : ingestion / projecteur / requête / compatibilité | 9105 / 9110 / 9106 / 9107 | 19105 / 19110 / 19106 / 19107 |

Les deux ports de portefeuille sont liés à la boucle locale. Vérifiez-les avec :

```bash
grpcurl -plaintext -d '{}' 127.0.0.1:19102 zinder.v1.wallet.WalletQuery/ServerInfo
grpcurl -plaintext -d '{}' 127.0.0.1:19067 cash.z.wallet.sdk.rpc.CompactTxStreamer/GetLightdInfo
```

Autres moyens de déploiement :

* **Images de version** sur `ghcr.io/zcashfoundation/` : les quatre exécutions, ainsi que `zinder-wallet-serving` (ingestion, projecteur et requête native dans un conteneur pour les hôtes pouvant attacher un volume à un conteneur ; sans adaptateur lightwalletd) et `zinder-canonical-runtime` (ingestion uniquement).
* **Binaires Linux** pour x86-64 (nécessite un processeur x86-64-v3) et AArch64, avec glibc 2.34 ou une version plus récente. Debian 12 est la base certifiée. Chaque version fournit un SBOM et une provenance SLSA signée.

### Ce que le nœud doit fournir

* Un **nœud d’archive**. Depuis la version 0.11.0, `zinder-ingest` refuse de démarrer avec un nœud élagué.
* Zebra **7.0.0** ou Zakura **1.8.6**. Ce sont les deux versions de nœud certifiées par les canaux de version.
* Pour l’image `zinder-wallet-serving`, le **point de terminaison gRPC de l’indexeur** du nœud (`ZINDER_NODE__INDEXER_GRPC_ADDR`, `indexer_listen_addr` de Zebra, port 8155 sur Mainnet). Un indexeur Zakura sur une adresse autre que la boucle locale nécessite le TLS mutuel, pris en charge par Zinder depuis la version 0.11.0.

### Dimensionnement pour Mainnet

D’après le guide d’exploitation de service de portefeuilles :

* Au moins **8 Go de mémoire**. Pics mesurés : ingestion environ 2,6 Gio, projecteur environ 2,7 Gio pendant la construction, requête jusqu’à environ 1,4 Gio.
* Conservez environ **130 Go libres** sur le volume lors de la construction du magasin de portefeuilles Mainnet.
* Une construction Mainnet mesurée depuis le genesis a pris environ **quatre heures** pour le magasin de chaîne (préparation proche de 310 Go) et **plus de deux heures** pour le magasin de portefeuilles. Les délais de construction fournis ne conviennent qu’à Testnet : augmentez-les à au moins 24 h et 12 h pour Mainnet, sinon la construction redémarre et ne se termine jamais.

## Notes de version à connaître

| Version | Date | Changements pour les opérateurs |
|:--|:--|:--|
| 0.7.0 | 2026-11-10 | Fenêtre de réorganisation par défaut portée à 1000 blocs, la profondeur à laquelle Zebra 7 et Zakura finalisent les blocs. Irréversible : les anciennes versions ne peuvent pas ouvrir les magasins agrandis |
| 0.9.0 | 2026-11-12 | Nouvelles images `zinder-wallet-serving` et `zinder-canonical-runtime` |
| 0.10.0 | 2026-11-13 | **Première version qui décode les blocs NU7.** Les versions 0.9.0 et antérieures s’arrêtent au premier bloc NU7. Révision 8 du protocole natif : mettez à niveau l’ingestion et la requête ensemble, ainsi que les clients natifs |
| 0.11.1 | 2026-11-14 | Zakura 1.8.6 certifié aux côtés de Zebra 7.0.0 ; TLS mutuel vers l’indexeur du nœud ; nœuds élagués refusés. La version 0.11.0 n’a été publiée que sous forme de crates, déployez donc la version 0.11.1 |
| 0.12.0 | 2026-11-14 | Correctifs de disponibilité et d’arrêt ; la relecture de l’explorateur est plus rapide et se met en pause lorsque l’espace disque devient insuffisant |

## Erreurs fréquentes

**Le traiter comme un logiciel de production.** Le projet se définit comme alpha. Un déploiement Compose local au vert n’est, selon ses propres termes, « pas à lui seul une certification de production ».

**Le diriger vers un nœud élagué.** L’ingestion quitte au démarrage. Utilisez un nœud d’archive Zebra ou Zakura.

**Exposer directement les ports gRPC.** Les deux ports de portefeuille sont liés à la boucle locale pour une raison. Placez TLS, l’authentification, les limites de débit et les quotas dans un proxy que vous contrôlez avant de les ouvrir à internet.

**Mettre à niveau une exécution à la fois.** Plusieurs versions modifient la révision du protocole natif ou le format du magasin. Mettez à niveau ensemble les services Zinder et actualisez les clients natifs lors de la même bascule.

**Supposer qu’un portefeuille est pris en charge parce que le protocole l’est.** L’adaptateur lightwalletd parle le protocole, mais Zinder ne revendique la prise en charge d’un portefeuille nommé qu’après certification de bout en bout de la version actuelle de ce portefeuille.

## Pages connexes

* [Nœuds Lightwallet](/zcash-tech/lightwallet-nodes) — ce que fait un serveur de portefeuille léger et ce qu’il peut voir
* [Zaino](/zcash-tech/zaino) — l’indexeur Rust de Zingo Labs
* [Benchmark d’indexeurs : Zaino contre Ztreamer](/zcash-tech/indexer-benchmark-zaino-vs-ztreamer)
* [Pile Z3](/zcash-tech/z3-stack) — Zebra + Zallet, la configuration de nœud utilisée par le guide de démarrage rapide Zinder
* [Zebra Nœud complet](/zcash-tech/zebra-full-node) et [Zakura Nœud](/zcash-tech/zakura-node) — les deux nœuds certifiés par Zinder

## Où puis-je en apprendre davantage ?

* Dépôt [Zinder GitHub](https://github.com/ZcashFoundation/zinder)
* Versions [Zinder](https://github.com/ZcashFoundation/zinder/releases) et [journal des modifications](https://github.com/ZcashFoundation/zinder/blob/main/CHANGELOG.md)
* [Ce qu’est et ce que n’est pas Zinder](https://github.com/ZcashFoundation/zinder/blob/main/docs/architecture/indexer-wallet-boundary.md)
* Guides d’exploitation [Déploiement sur une VM](https://github.com/ZcashFoundation/zinder/blob/main/docs/runbooks/deploying-on-a-vm.md) et [image de service de portefeuilles](https://github.com/ZcashFoundation/zinder/blob/main/docs/runbooks/deploying-wallet-serving.md)

**Dernière mise à jour :** novembre 2026
