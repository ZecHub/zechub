# Détecter les paiements protégés : coût du scan

Une entreprise qui accepte des ZEC protégés doit détecter ses paiements entrants. Dans le pool transparent, il suffit de consulter un index. Dans les pools protégés, personne ne peut indexer les paiements par adresse : le portefeuille ou le système dorsal doit donc vérifier chaque sortie protégée de la chaîne avec ses propres clés. Cette page explique comment cela fonctionne, ce que cela coûte et comment choisir une conception de comptes qui maîtrise ce coût.

## En bref

* Le coût de la détection des paiements protégés augmente avec le nombre de **clés pour lecture seule** que vous surveillez, et non avec le nombre d’adresses que vous distribuez
* Un compte peut générer une **adresse diversifiée** fraîche et impossible à relier pour chaque client ou facture, sans coût de scan supplémentaire
* Une clé pour lecture seule révèle **l’ensemble du compte**. Si un auditeur ne doit voir qu’un seul client, ce client a besoin de son propre compte, et chaque compte ajoute du travail de scan à chaque bloc
* Dimensionnez un scanner pour les **blocs pleins**, pas pour la moyenne. Le réseau principal produit déjà des séries de blocs presque pleins
* Mesurez le coût par tentative sur votre propre matériel avant de dimensionner quoi que ce soit

## Pourquoi les paiements protégés ne peuvent pas être indexés

Avec les adresses transparentes, un nœud peut lire l’adresse de chaque sortie et créer un index reliant les adresses aux sorties. Zebra expose cette fonctionnalité par `getaddressutxos` et `getaddresstxids`.

Une action protégée ne contient aucune adresse lisible. Elle comporte un engagement de note, une clé publique éphémère et une note chiffrée. Rien dans ces octets n’indique le destinataire du paiement : ni le nœud ni un [indexeur](Lightwallet_Nodes.md) ne peuvent donc créer d’index par adresse.

La découverte fonctionne donc à l’inverse. Le portefeuille prend chaque sortie protégée et demande « est-ce à moi ? » en essayant de la déchiffrer. C’est ce qu’on appelle le **déchiffrement par essais**. [Viewing keys](Viewing_Keys.md) explique ce que révèlent les clés, et [Zcash la synchronisation des portefeuilles](Zcash_Wallet_Syncing.md) décrit comment les portefeuilles organisent ce travail.

## Comment fonctionne une tentative

Pour le format d’action du protocole Orchard, utilisé par les pools Orchard et Ironwood :

1. **Accord de clé :** multipliez la clé publique éphémère de l’action par votre clé pour lecture seule entrante. Il s’agit d’une multiplication scalaire sur la courbe Pallas, qui représente l’essentiel du coût
2. **Dérivation de clé :** hachez le secret partagé pour obtenir une clé symétrique
3. **Déchiffrez les 52 premiers octets** de la note : le diversificateur, la valeur et `rseed`
4. **Reconstruisez l’engagement de note** à partir des données déchiffrées
5. **Comparez-le** à `cmx` de l’action. S’ils correspondent, la note vous appartient

Vous ne découvrez si la note vous appartient qu’à l’étape 5 : **un échec coûte donc à peu près autant qu’une réussite**. Presque toutes les actions de la chaîne appartiennent à quelqu’un d’autre, si bien que presque tout le travail correspond à des échecs.

## La formule du coût

```text
work per block = K × I × A × t

K  accounts you watch
I  incoming viewing keys per account (2: external and internal)
A  shielded actions in the block
t  time for one trial on one core
```

La formule ne comporte aucun terme lié aux adresses. Les portefeuilles essaient à la fois la clé externe (les adresses que vous distribuez) et la clé interne (la monnaie rendue), ce qui explique pourquoi `I = 2`. Vous pouvez le voir dans les boucles `for scope in [Scope::External, Scope::Internal]` de librustzcash, dans `zcash_client_backend/src/scanning.rs`.

[ZIP 218](https://zips.z.cash/zip-0218) limite le nombre d’actions protégées à **330 par bloc** ; `A` est donc au maximum de 330.

## Adresses diversifiées : de nombreuses adresses, une seule clé

Une adresse du protocole Orchard est composée d’un diversificateur `d` (11 octets) et d’une clé de transmission dérivée de la même clé pour lecture seule entrante. [ZIP 32](https://zips.z.cash/zip-0032) dérive chaque diversificateur d’un index de 88 bits au moyen du chiffrement FF1. Ainsi, un compte possède **2^88 adresses**, toutes valides pour le protocole Orchard.

Cela confère deux propriétés utiles à un système dorsal de paiements :

* **Il est impossible de relier les adresses entre elles.** Sans la clé pour lecture seule, deux adresses diversifiées d’un même compte semblent appartenir à deux portefeuilles différents
* **Les paiements sont associés aux factures sans table de correspondance.** Lorsqu’un déchiffrement par essais réussit, la note déchiffrée contient `d`. La clé de diversificateur du compte déchiffre `d` pour retrouver son index ; si cet index correspond au numéro de votre facture, vous savez quelle facture a été payée

Avant de la présenter à un client, enveloppez chaque adresse dans une [adresse unifiée](../Using_Zcash/Unified_Addresses.md) ([ZIP 316](https://zips.z.cash/zip-0316)).

## Le revers : une clé pour lecture seule révèle l’ensemble du compte

Vous ne pouvez pas restreindre une clé pour lecture seule à une seule adresse diversifiée, car toutes les adresses du compte utilisent la même clé. Le compte est donc aussi l’unité de divulgation. Toute personne qui obtient la clé pour lecture seule d’un compte voit chaque paiement effectué à chacune de ses adresses.

Trois décisions sont ainsi liées :

| Conception | Coût du scan | Ce qu’un auditeur peut voir |
|:--|:--|:--|
| Un compte, une adresse diversifiée par client | Une clé, quel que soit le nombre de clients | Tout ou rien |
| Un compte par client | Une clé par client, à chaque bloc | Un client à la fois |
| Un compte par client et par période | Une clé par client et par période | Un client pour une période |

Choisissez la conception des comptes dès le départ. Scinder un compte par la suite implique de transférer ses fonds vers de nouveaux comptes, ce qui entraîne des frais et crée un motif visible.

## Ce que cela coûte en pratique

Ces chiffres ont été obtenus sur un cœur d’ordinateur portable (Apple M3 Pro, compilation de production), avec `try_compact_note_decryption` de `zcash_note_encryption` 0.5.1 et de vraies actions Ironwood provenant du réseau de test :

| Mesure | Valeur |
|:--|:--|
| Une tentative, une clé à la fois | environ 82 µs |
| Une tentative, traitée par lots de 10 ou 100 clés | environ 42 µs |

Le traitement par lots réduit le coût de moitié environ, et le scanner de librustzcash traite les actions par lots pour la même raison.

Avec `t = 42 µs` et des blocs pleins de 330 actions :

| Comptes surveillés | Temps processeur par bloc plein | Cœurs nécessaires pour suivre le rythme des blocs pleins |
|:--|:--|:--|
| 1 | 28 ms | 0,001 |
| 1 000 000 (un par client) | 7,7 heures | environ 1 109 |

Les mêmes 1 000 000 clients, avec des adresses diversifiées réunies dans un seul compte, coûtent 28 ms par bloc plein. Seule la limite entre les comptes change.

## Dimensionnez pour les pics, pas pour les moyennes

Sur les 5 000 blocs du réseau principal jusqu’à la hauteur 3 582 677 (échantillon relevé le 17 novembre 2026) :

* 62 % des blocs ne contenaient aucune sortie protégée, et la médiane était de zéro
* La moyenne était de 12,3 sorties protégées par bloc
* 153 blocs entre les hauteurs 3 579 935 et 3 580 346, soit environ trois heures de chaîne, comptaient chacun plus de 250 sorties, souvent à la suite. Ils contenaient 75 % de toutes les sorties de l’échantillon

Un scanner dimensionné pour la moyenne prend du retard lors d’une telle série. Prévoyez une marge (par exemple, comptez n’utiliser que la moitié des 25 secondes séparant les blocs) et dimensionnez-le pour la limite maximale.

## Les blocs compacts réduisent la bande passante, pas le nombre de tentatives

Les portefeuilles légers analysent les blocs compacts provenant d’un serveur lightwallet. Une action compacte pèse 148 octets, contre 820 pour l’action complète. Elle ne conserve que les données nécessaires à une tentative : la clé éphémère, les 52 premiers octets du texte chiffré, le nullifier et `cmx`. Les données transparentes ne sont envoyées que si le client les demande.

Les blocs compacts réduisent la taille des téléchargements. Ils ne réduisent pas le nombre de tentatives, car chaque action doit toujours être vérifiée avec chaque clé.

## Liste de contrôle pour un système dorsal de paiements

* Décidez qui devra pouvoir voir quoi avant de créer les comptes
* Dans la mesure où les règles de divulgation le permettent, attribuez une adresse diversifiée par facture à partir d’un seul compte
* Mesurez `t` sur votre propre matériel en activant le traitement par lots
* Dimensionnez l’analyse des blocs récents pour 330 actions par bloc, avec une marge
* Répartissez les réanalyses par plages de hauteurs entre plusieurs processus. L’historique est fixe, ce qui permet de paralléliser facilement cette tâche
* N’oubliez pas que chaque nouveau compte doit aussi être analysé depuis sa hauteur de création

## Pour en savoir plus

* [ZIP 218 : intervalle cible de 25 secondes entre les blocs](https://zips.z.cash/zip-0218), y compris les limites d’actions par bloc
* [ZIP 32 : portefeuilles protégés à dérivation hiérarchique](https://zips.z.cash/zip-0032)
* [ZIP 316 : adresses unifiées et clés unifiées pour lecture seule](https://zips.z.cash/zip-0316)
* [Protocole Lightwallet : compact_formats.proto](https://github.com/zcash/lightwallet-protocol/tree/main/walletrpc)
* [librustzcash](https://github.com/zcash/librustzcash) : scan `zcash_client_backend` et `zcash_note_encryption`
* [Une clé pour lecture seule, un million de clients](https://udokaam.dev/writing/one-viewing-key-a-million-customers/) : mesures complètes et code de laboratoire pour les reproduire
