# Comparatif d'indexeurs : Zaino vs Ztreamer

Zaino et Ztreamer sont deux indexeurs qui fournissent le protocole gRPC lightwallet, l'API que les wallets légers Zcash utilisent pour se synchroniser. Cette page résume une comparaison indépendante et reproductible des deux : s'ils renvoient les mêmes réponses, le temps nécessaire pour construire leur index et la rapidité avec laquelle ils servent les wallets.

## En bref

* Les deux indexeurs renvoient des données de chaîne correctes. Chaque réponse pouvant être vérifiée par rapport à Zebra correspondait, donc les wallets peuvent utiliser l'un ou l'autre.
* Les différences constatées relèvent de conventions et de cas particuliers : codes d'erreur, ordre des octets d'un hash, manière dont une adresse dupliquée est comptée, et quelques formats de réponse JSON-RPC.
* Ztreamer construit son index environ 6× plus rapidement sur le même CPU. Zaino commence à répondre après 6 secondes en transmettant les requêtes à Zebra pendant la construction.
* Ztreamer sert plus rapidement dans tous les scénarios mesurés : 13 à 17× plus de blocs par seconde pour un téléchargement complet de wallet.
* Une grande partie de la latence de Zaino provient d'un paramètre de socket manquant (`TCP_NODELAY`), qui ajoute environ 40 ms à de nombreuses requêtes. La correction ne nécessite qu'une ligne.

## Éléments comparés

| Build | Nœud de support | Pourquoi |
|:--|:--|:--|
| Zaino 0.10.1 | Zebra 6.4.2 (backend `direct`) | Dernière version stable de Zaino |
| Zaino 0.9.0 | Zebra 6.4.2 (backend `direct`) | Version mesurée dans la comparaison publiée par Ztreamer |
| Ztreamer v0.1.0 | Nœud Zakura intégré | Dernier tag Ztreamer |
| Ztreamer master | Zakura 1.5.1 intégré | Ce que les instructions d'installation de Ztreamer construisent |

Les deux utilisent des conceptions différentes :

* **Zaino** s'exécute comme processus distinct à côté d'un nœud complet [Zebra](Zebra_Full_Node.md), lit l'état de Zebra et conserve son propre index. C'est l'indexeur de la pile [Z3](Z3_Stack.md). Voir [Zaino](Zaino.md).
* **Ztreamer** intègre un nœud [Zakura](Zakura_Node.md) (un fork de Zebra) dans le même processus et conserve un index de blocs compacts.

## Méthode de mesure

* **Mêmes données pour tous.** Chaque build a démarré depuis le même instantané testnet Zcash Foundation, figé à la hauteur 4 382 897, afin que tous indexent exactement la même chaîne.
* **Tout le monde peut reproduire l'expérience.** Tout s'exécute sur des runners hébergés par GitHub et gratuits : forkez le dépôt et lancez un workflow.
* **Trois exécutions par build**, chacune avec un index vide. Le serveur et le générateur de charge s'exécutaient sur des cœurs CPU distincts.
* **Compatibilité :** les 20 méthodes gRPC du protocole lightwallet (274 cas de test), comparées octet par octet entre les builds et vérifiées avec le JSON-RPC de Zebra. Les 28 méthodes JSON-RPC servies par Zaino ont également été vérifiées.
* **Performance :** temps et ressources nécessaires à la construction de l'index, latence par requête, débit des plages de blocs, de 1 à 128 clients simultanés, et téléchargement complet d'un wallet depuis l'activation de Sapling jusqu'au tip.

## Résultats

### Construction de l'index

Médianes de trois exécutions :

| Build | Index terminé | Première réponse | Taille de l'index sur disque |
|:--|--:|--:|--:|
| Zaino 0.10.1 | 1 395 s | 6 s | 22.06 GiB |
| Zaino 0.9.0 | 1 211 s | 6 s | 22.06 GiB |
| Ztreamer v0.1.0 | 216 s | 210 s | 1.44 GiB |
| Ztreamer master | 159 s | 158 s | 1.44 GiB |

Zaino est utilisable presque immédiatement, car il transmet les requêtes à Zebra pendant la construction. Ztreamer ne sert rien avant que son index soit terminé. Sur le même modèle de CPU, Zaino 0.10.1 a pris 6 à 6,5× plus de temps que Ztreamer v0.1.0 et a utilisé 7,5 à 8× plus de temps CPU (Zebra inclus).

### Service

Médianes de trois exécutions, en blocs par seconde sauf indication contraire :

| Scénario | Zaino 0.10.1 | Ztreamer v0.1.0 |
|:--|--:|--:|
| Plage de 1 000 blocs | 11 414 | 179 486 |
| Téléchargement complet de wallet (280 000 → tip) | 11 124 | 189 041 |
| Plage de 1 000 blocs, 128 clients | 110 093 | 229 527 |
| Bloc unique, 128 clients (requêtes/s) | 6 843 | 11 044 |

Avec 128 clients, l'écart se réduit à environ 2×, car les deux serveurs étaient limités à deux cœurs CPU.

### Le seuil de 40 ms

Sur Zaino, six des douze RPC ont une latence médiane d'environ 40 ms, et chaque RPC a un 99e percentile autour de 41 ms. La cause réside dans la manière dont Zaino configure son écouteur gRPC : l'option de socket `TCP_NODELAY` n'est jamais activée, donc le système d'exploitation retient les petites réponses pendant jusqu'à 40 ms.

L'activation de l'option depuis l'extérieur, sans modifier le binaire Zaino, a supprimé ce seuil. Par exemple, `GetTreeState` est passé de 40,3 ms à 0,75 ms (Ztreamer : 0,63 ms). Le streaming groupé de blocs n'a pas changé, donc l'écart de débit ci-dessus est réel.

### Différences de compatibilité

* **Zaino 0.9.0** inclut par défaut des données transparentes dans `GetBlock`, alors que le protocole indique que la valeur par défaut ne comprend que les données protégées. Cela est corrigé dans la version 0.10.1.
* **`GetSubtreeRoots` :** le champ `completingBlockHash` utilise des ordres d'octets opposés dans les deux indexeurs. Les wallets actuels ne lisent pas ce champ.
* **Codes d'erreur :** Zaino renvoie `INTERNAL` pour une entrée incorrecte ; Ztreamer renvoie `INVALID_ARGUMENT` ou `NOT_FOUND`.
* Les **adresses dupliquées** dans `GetTaddressBalanceStream` sont comptées deux fois, sauf avec Ztreamer master.
* **JSON-RPC :** Zaino de `getrawtransaction` avec la verbosité 0 renvoie un objet au lieu d'une chaîne hexadécimale, contrairement à Zebra et zcashd.

## Limites

* **Testnet uniquement.** Les blocs testnet sont plus petits que ceux du mainnet ; les temps et tailles absolus ne sont donc pas représentatifs du mainnet. La comparaison est relative, avec des entrées identiques.
* **Machines CI partagées** avec plusieurs modèles de CPU. Le rapport complet fournit des comparaisons sur le même CPU pour les chiffres principaux.
* **Non mesurés :** les réorganisations, le suivi d'un tip de chaîne en direct, la charge du mempool et TLS.

## Pour en savoir plus

* Rapport complet : [zcash-indexer-bench/report/report.md](https://github.com/pearl-max468/zcash-indexer-bench/blob/main/report/report.md)
* Dépôt du benchmark : [github.com/pearl-max468/zcash-indexer-bench](https://github.com/pearl-max468/zcash-indexer-bench)
* Données brutes : [version results-2026-10-10](https://github.com/pearl-max468/zcash-indexer-bench/releases/tag/results-2026-10-10)
* Zaino : [github.com/zingolabs/zaino](https://github.com/zingolabs/zaino)
* Ztreamer : [ztreamer.sh](https://ztreamer.sh)
