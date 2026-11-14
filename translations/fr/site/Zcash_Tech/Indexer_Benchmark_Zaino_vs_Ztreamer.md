# Banc d'essai des indexeurs : Zaino contre Ztreamer

Zaino et Ztreamer sont deux indexeurs qui servent le protocole gRPC lightwallet, l'API que les portefeuilles légers Zcash utilisent pour se synchroniser. Cette page résume une comparaison indépendante et reproductible des deux : renvoient-ils les mêmes réponses, combien de temps leur faut-il pour construire leur index et à quelle vitesse servent-ils les portefeuilles.

## En bref

* Les deux indexeurs renvoient des données de chaîne correctes. Toutes les réponses qui ont pu être vérifiées par rapport à Zebra concordaient, les portefeuilles peuvent donc utiliser l'un ou l'autre.
* Les différences constatées relèvent de conventions et de cas limites : codes d'erreur, ordre des octets d'un hachage, façon de compter une adresse en double et quelques formats de réponse JSON-RPC.
* Ztreamer construit son index environ 6 fois plus vite sur le même processeur. Zaino commence à répondre au bout de 6 secondes en transmettant les requêtes à Zebra pendant la construction.
* Ztreamer sert plus vite dans tous les scénarios mesurés : 13 à 17 fois plus de blocs par seconde pour le téléchargement complet d'un portefeuille.
* Une grande partie de la latence de Zaino provient d'un seul réglage de socket manquant (`TCP_NODELAY`), qui ajoute environ 40 ms à de nombreuses requêtes. La correction tient en une ligne.

## Ce qui a été comparé

| Version | Nœud sous-jacent | Pourquoi |
|:--|:--|:--|
| Zaino 0.10.1 | Zebra 6.4.2 (backend `direct`) | Dernière version stable de Zaino |
| Zaino 0.9.0 | Zebra 6.4.2 (backend `direct`) | La version mesurée dans la comparaison publiée par Ztreamer |
| Ztreamer v0.1.0 | Nœud Zakura intégré | Dernier tag de Ztreamer |
| Ztreamer master | Zakura 1.5.1 intégré | Ce que compilent les instructions d'installation de Ztreamer |

Les deux reposent sur des conceptions différentes :

* **Zaino** s'exécute comme un processus distinct à côté d'un nœud complet [Zebra](Zebra_Full_Node.md), lit l'état de Zebra et tient son propre index. C'est l'indexeur de la [pile Z3](Z3_Stack.md). Voir [Zaino](Zaino.md).
* **Ztreamer** intègre un nœud [Zakura](Zakura_Node.md) (un fork de Zebra) dans le même processus et tient un index de blocs compacts.

## Méthode de mesure

* **Les mêmes données pour tous.** Chaque version est partie du même instantané du testnet Zcash Foundation, figé à la hauteur 4 382 897, de sorte que toutes ont indexé exactement la même chaîne.
* **Tout le monde peut le reproduire.** Tout s'exécute sur des runners gratuits hébergés par GitHub : forkez le dépôt et lancez un seul workflow.
* **Trois exécutions par version**, chacune à partir d'un index vide. Le serveur et le générateur de charge tournaient sur des cœurs de processeur distincts.
* **Compatibilité :** les 20 méthodes gRPC du protocole lightwallet (274 cas de test), comparées octet par octet entre les versions et vérifiées par rapport au JSON-RPC de Zebra. Les 28 méthodes JSON-RPC servies par Zaino ont également été vérifiées.
* **Performances :** temps et ressources nécessaires pour construire l'index, latence par requête, débit sur des plages de blocs, de 1 à 128 clients simultanés, et téléchargement complet d'un portefeuille depuis l'activation de Sapling jusqu'à la pointe de la chaîne.

## Résultats

### Construction de l'index

Médianes de trois exécutions :

| Version | Index terminé | Première réponse | Taille de l'index sur disque |
|:--|--:|--:|--:|
| Zaino 0.10.1 | 1 395 s | 6 s | 22,06 Gio |
| Zaino 0.9.0 | 1 211 s | 6 s | 22,06 Gio |
| Ztreamer v0.1.0 | 216 s | 210 s | 1,44 Gio |
| Ztreamer master | 159 s | 158 s | 1,44 Gio |

Zaino est utilisable presque immédiatement, car il transmet les requêtes à Zebra pendant la construction. Ztreamer ne sert rien tant que son index n'est pas terminé. Sur le même modèle de processeur, Zaino 0.10.1 a mis 6 à 6,5 fois plus de temps que Ztreamer v0.1.0 et a consommé 7,5 à 8 fois plus de temps processeur (Zebra compris).

### Service

Médianes de trois exécutions, en blocs par seconde sauf indication contraire :

| Scénario | Zaino 0.10.1 | Ztreamer v0.1.0 |
|:--|--:|--:|
| Plage de 1 000 blocs | 11 414 | 179 486 |
| Téléchargement complet d'un portefeuille (280 000 → pointe) | 11 124 | 189 041 |
| Plage de 1 000 blocs, 128 clients | 110 093 | 229 527 |
| Bloc unique, 128 clients (requêtes/s) | 6 843 | 11 044 |

Avec 128 clients, l'écart se réduit à environ 2 fois, car les deux serveurs étaient limités à deux cœurs de processeur.

### Le plancher de 40 ms

Sur Zaino, six RPC sur douze ont une latence médiane d'environ 40 ms, et toutes les RPC ont un 99e centile autour de 41 ms. La cause tient à la façon dont Zaino configure son écouteur gRPC : l'option de socket `TCP_NODELAY` n'est jamais activée, si bien que le système d'exploitation retient les petites réponses jusqu'à 40 ms.

L'activation de l'option depuis l'extérieur, sans modifier le binaire Zaino, a supprimé ce plancher. Par exemple, `GetTreeState` est passé de 40,3 ms à 0,75 ms (Ztreamer : 0,63 ms). Le streaming de blocs en masse n'a pas changé, l'écart de débit ci-dessus est donc réel.

### Différences de compatibilité

* **Zaino 0.9.0** inclut par défaut les données transparentes dans `GetBlock`, alors que le protocole prévoit par défaut les seules données protégées. Ce point est corrigé dans la version 0.10.1.
* **`GetSubtreeRoots` :** le champ `completingBlockHash` utilise des ordres d'octets opposés sur les deux indexeurs. Les portefeuilles actuels ne lisent pas ce champ.
* **Codes d'erreur :** Zaino renvoie `INTERNAL` en cas d'entrée invalide ; Ztreamer renvoie `INVALID_ARGUMENT` ou `NOT_FOUND`.
* **Les adresses en double** dans `GetTaddressBalanceStream` sont comptées deux fois, sauf sur Ztreamer master.
* **JSON-RPC :** `getrawtransaction` de Zaino avec une verbosité de 0 renvoie un objet au lieu d'une chaîne hexadécimale, contrairement à Zebra et zcashd.

## Limites

* **Testnet uniquement.** Les blocs du testnet sont plus petits que ceux du mainnet, les durées et tailles absolues ne correspondent donc pas aux chiffres du mainnet. La comparaison est relative, sur des entrées identiques.
* **Machines CI partagées** avec plusieurs modèles de processeur. Le rapport complet fournit des comparaisons à processeur identique pour les chiffres principaux.
* **Non mesuré :** réorganisations, suivi de la pointe d'une chaîne en direct, charge du mempool et TLS.

## Pour en savoir plus

* Rapport complet : [zcash-indexer-bench/report/report.md](https://github.com/pearl-max468/zcash-indexer-bench/blob/main/report/report.md)
* Dépôt du banc d'essai : [github.com/pearl-max468/zcash-indexer-bench](https://github.com/pearl-max468/zcash-indexer-bench)
* Données brutes : [version results-2026-10-10](https://github.com/pearl-max468/zcash-indexer-bench/releases/tag/results-2026-10-10)
* Zaino : [github.com/zingolabs/zaino](https://github.com/zingolabs/zaino)
* Ztreamer : [ztreamer.sh](https://ztreamer.sh)
