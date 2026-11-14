<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Outgoing_Viewing_Keys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Clés pour lecture seule sortantes (OVK)

Une clé pour lecture seule sortante (OVK) est une valeur de 32 octets utilisée uniquement pour chiffrer le texte chiffré *sortant* d'une sortie protégée. Elle permet à une partie de récupérer le texte en clair de la note envoyée (adresse du destinataire, montant et mémo) sans pouvoir dépenser les fonds ni voir les notes entrantes.

Le destinataire déchiffre toujours la note entrante avec sa propre clé pour lecture seule entrante. Le choix de l'OVK ne change rien à ce que voit le destinataire. Il n'existe pas d'encodage standard pour une OVK brute : il s'agit simplement de 32 octets.

## En bref

- Une OVK détermine uniquement qui peut récupérer le texte en clair sortant d'un paiement protégé.
- Les portefeuilles choisissent entre trois politiques : **Sender** (récupération normale avec la UFVK du compte), **Custom** (récupération avec une clé que vous fournissez) ou **Discard** (personne ne peut récupérer le texte en clair sortant à partir de la chaîne).
- Même avec Discard ou une OVK personnalisée, le détenteur d'une UFVK voit toujours quelles notes ont été dépensées et peut calculer le montant net sorti du compte.
- Le seul moyen fiable de rendre un montant invisible pour une UFVK donnée est de s'assurer que les notes n'ont jamais appartenu à ce compte (compte distinct ou portefeuille distinct).
- Les trois politiques existent déjà dans `zcash_client_backend` ; presque tous les portefeuilles actuels n'utilisent que la politique Sender par défaut.

---

## Les trois politiques

Les portefeuilles construits sur `zcash_client_backend` choisissent une `OvkPolicy` lorsqu'ils construisent une transaction :

| Politique | Textes chiffrés sortants | Qui peut ensuite récupérer le texte en clair sortant |
|--------|----------------------|----------------------------------------------|
| **Sender** (par défaut) | Chiffrés avec l'OVK normale du compte | La Unified Full Viewing Key du compte émetteur |
| **Custom** | Chiffrés avec la ou les clés que vous fournissez | Quiconque détient la ou les clés fournies |
| **Discard** | Aucune OVK n'est utilisée (`ovk = ⊥`) | Personne (pas même l'émetteur) |

Un constructeur pratique crée une politique `Custom` à partir d'une seule valeur de 32 octets, de sorte que l'OVK externe et l'OVK interne soient la même clé.

![Comparaison des politiques d'Outgoing Viewing Key](/content-images/ovk-policies.webp)

Consultez [OvkPolicy (documentation)](https://zcash.github.io/librustzcash/rustdoc/latest/zcash_client_backend/wallet/enum.OvkPolicy.html) et la [ZIP 310](https://zips.z.cash/zip-0310).

## À quoi sert chaque politique

**Sender** correspond au comportement ordinaire d'un portefeuille. Une fois la transaction minée, toute personne détenant la UFVK du compte peut déchiffrer les textes chiffrés sortants et récupérer les adresses des destinataires, les montants et les mémos.

**Custom** vous permet de donner à un tiers (auditeur, processeur de paiements, système de reçus ou appareil distinct) la possibilité de déchiffrer des paiements sortants précis sans lui confier la clé pour lecture seule complète. Vous pouvez également utiliser une clé éphémère que vous jetez après la transaction, ou des clés différentes pour différentes contreparties, afin qu'aucune clé ne voie à elle seule tous les paiements sortants.

**Discard** signifie que le portefeuille émetteur ne peut pas récupérer le texte en clair sortant à partir de la chaîne. C'est utile lorsque vous voulez limiter ce qui serait récupérable si la UFVK venait à être compromise, ou lorsque vous ne voulez délibérément aucun enregistrement on-chain que l'OVK du compte pourrait ouvrir.

## Ce que le détenteur d'une UFVK voit toujours

Même lorsque Discard ou une OVK personnalisée est utilisée, le détenteur de la UFVK du compte peut toujours :

- Détecter quelles notes du compte ont été dépensées (grâce aux nullifiers).
- Connaître les montants de ces notes d'entrée.
- Récupérer les éventuelles notes de monnaie rendue (elles sont chiffrées avec la clé pour lecture seule entrante interne, et non avec une OVK).
- Et donc calculer le montant net sorti du compte.

Ce qui n'est pas visible, ce sont les adresses individuelles des destinataires, la répartition du montant et les mémos. La documentation de `WalletWrite` avertit que les données relatives aux transactions créées avec Discard (ou avec une OVK personnalisée aléatoire) ne sont pas récupérables à partir des données de la chaîne si l'enregistrement local est perdu.

## Soustraire des montants à une UFVK donnée

`OvkPolicy` ne détermine que la récupération du texte en clair sortant. Elle ne cache ni les dépenses ni les montants nets à la propre UFVK du compte.

Le seul moyen fiable d'empêcher qu'un montant soit visible pour une UFVK donnée est de s'assurer que les notes qui portaient ce montant n'ont jamais appartenu au compte contrôlé par cette UFVK :

1. **Comptes ZIP-32 distincts** (même seed) — Créez un nouvel index de compte, transférez-y les fonds et n'exportez jamais la UFVK de ce compte. La UFVK du compte d'origine ne voit que le transfert vers le nouveau compte.
2. **Portefeuille entièrement distinct** (seed différente) — Approvisionnez un nouveau portefeuille, dépensez depuis celui-ci, puis détruisez la seed ou la UFVK. Le portefeuille d'origine n'enregistre que le transfert d'approvisionnement.
3. **Portefeuilles éphémères à usage unique** — Comme ci-dessus, mais en traitant le portefeuille de dépense comme jetable.

Une UFVK est propre à chaque compte. Les notes qui n'ont jamais résidé dans ce compte n'apparaissent jamais dans son solde ni dans ses totaux de sorties.

## Comment les portefeuilles utilisent les politiques aujourd'hui

Presque tous les portefeuilles en production n'utilisent que la politique **Sender** par défaut, de sorte que l'historique sortant complet est récupérable à partir de la UFVK. Les deux autres politiques existent dans la bibliothèque mais sont rarement proposées dans les interfaces utilisateur.

Parmi les options envisageables à l'avenir :

- Une option par transaction permettant à l'utilisateur de choisir Custom ou Discard pour un paiement donné.
- Un mode Discard permanent (une restauration à partir de la seed n'afficherait alors que les sorties nettes).
- Des OVK personnalisées pour la divulgation sélective de paiements individuels (plus légère qu'une divulgation de paiement complète selon la [ZIP 311](https://zips.z.cash/zip-0311)).
- Le maintien de la séparation des comptes ou des portefeuilles pour une isolation plus forte.

## Ressources

- [ZIP 310 : Propriétés de sécurité des Viewing Keys Sapling](https://zips.z.cash/zip-0310)
- [ZIP 316 : Adresses unifiées et Unified Viewing Keys](https://zips.z.cash/zip-0316)
- [ZIP 315 : Bonnes pratiques pour l'implémentation des portefeuilles](https://zips.z.cash/zip-0315)
- [OvkPolicy dans zcash_client_backend](https://zcash.github.io/librustzcash/rustdoc/latest/zcash_client_backend/wallet/enum.OvkPolicy.html)
- [librustzcash](https://github.com/zcash/librustzcash)
- [zingolib](https://github.com/zingolabs/zingolib)

## Pages associées

- [Viewing Keys](/zcash-tech/viewing-keys)
- [Divulgations de paiement](/zcash-tech/payment-disclosures)
- [Adresses unifiées](/zcash-tech/unified-addresses)
- [Ce qu'un explorateur de blocs peut voir](/zcash-tech/what-a-block-explorer-can-see)
