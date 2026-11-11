<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Outgoing_Viewing_Keys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Clés de visualisation sortantes (OVK)

Une clé de visualisation sortante (OVK) est une valeur de 32 octets utilisée uniquement pour chiffrer le texte chiffré *sortant* d’une sortie protégée. Elle permet à une partie de récupérer le texte en clair de la note envoyée (adresse du destinataire, valeur et mémo) sans pouvoir dépenser les fonds ni voir les notes entrantes.

Le destinataire déchiffre toujours la note entrante avec sa propre clé de visualisation entrante. Le choix de l’OVK ne change pas ce que voit le destinataire. Il n’existe pas d’encodage standard pour une OVK brute ; il s’agit simplement de 32 octets.

## TL;DR

- Une OVK contrôle uniquement qui peut récupérer le texte en clair sortant d’un paiement protégé.
- Les wallets choisissent parmi trois politiques : **Expéditeur** (récupération normale avec l’UFVK du compte), **Personnalisée** (récupération avec une clé que vous fournissez), ou **Discard** (personne ne peut récupérer le texte en clair sortant depuis la chaîne).
- Même avec Discard ou une OVK personnalisée, le détenteur d’un UFVK voit toujours quelles notes ont été dépensées et peut calculer le montant net sorti du compte.
- La seule manière fiable de garder un montant invisible pour un UFVK particulier est de s’assurer que les notes n’ont jamais appartenu à ce compte (compte séparé ou wallet séparé).
- Les trois politiques existent déjà dans `zcash_client_backend` ; presque tous les wallets utilisent aujourd’hui uniquement la politique Expéditeur par défaut.

---

## Les trois politiques

Les wallets fondés sur `zcash_client_backend` sélectionnent une `OvkPolicy` lorsqu’ils construisent une transaction :

| Politique | Textes chiffrés sortants | Qui peut récupérer ultérieurement le texte en clair sortant |
|--------|----------------------|----------------------------------------------|
| **Expéditeur** (par défaut) | Chiffrés avec l’OVK normale du compte | La clé de visualisation unifiée du compte expéditeur Full Viewing Key |
| **Personnalisée** | Chiffrés avec la ou les clés que vous fournissez | Toute personne détenant la ou les clés fournies |
| **Discard** | Aucune OVK n’est utilisée (`ovk = ⊥`) | Personne (pas même l’expéditeur) |

Un constructeur pratique crée une politique `Custom` à partir d’une seule valeur de 32 octets afin que les OVK externe et interne soient la même clé.

![Outgoing Viewing Key policy comparison](/content-images/ovk-policies.webp)

Consultez la documentation de [OvkPolicy](https://zcash.github.io/librustzcash/rustdoc/latest/zcash_client_backend/wallet/enum.OvkPolicy.html) et [ZIP 310](https://zips.z.cash/zip-0310).

## À quoi sert chaque politique

**Expéditeur** correspond au comportement habituel d’un wallet. Après l’extraction de la transaction, toute personne détenant l’UFVK du compte peut déchiffrer les textes chiffrés sortants et récupérer les adresses des destinataires, les montants et les mémos.

**Personnalisée** vous permet de donner à un tiers (auditeur, processeur de paiement, système de reçus ou appareil distinct) la capacité de déchiffrer certains paiements sortants sans lui donner la clé de visualisation complète. Vous pouvez aussi utiliser une clé éphémère que vous jetez après la transaction, ou utiliser différentes clés pour différents partenaires afin qu’aucune clé unique ne voie chaque paiement sortant.

**Discard** signifie que le wallet expéditeur ne peut pas récupérer le texte en clair sortant depuis la chaîne. Cela est utile lorsque vous souhaitez réduire au minimum ce qui est récupérable si l’UFVK est compromis ultérieurement, ou lorsque vous ne voulez délibérément pas d’un enregistrement on-chain que l’OVK du compte peut ouvrir.

## Ce que voit toujours un détenteur d’UFVK

Même lorsque Discard ou une OVK personnalisée est utilisée, le détenteur de l’UFVK du compte peut toujours :

- Détecter quelles notes du compte ont été dépensées (via les nullifiers).
- Connaître les valeurs de ces notes d’entrée.
- Récupérer les éventuelles notes de monnaie (elles sont chiffrées avec la clé de visualisation entrante interne, et non avec une OVK).
- Par conséquent, calculer le montant net sorti du compte.

Ce qui n’est pas visible, ce sont les adresses individuelles des destinataires, la répartition du montant et les mémos. La documentation de `WalletWrite` avertit que les données concernant les transactions créées sous Discard (ou avec une OVK personnalisée aléatoire) ne peuvent pas être récupérées à partir des données de la chaîne si l’enregistrement local est perdu.

## Garder des montants hors d’un UFVK particulier

`OvkPolicy` contrôle uniquement la récupération du texte en clair sortant. Cela ne masque ni les dépenses ni les montants nets à l’UFVK propre au compte.

La seule manière fiable d’empêcher qu’un montant soit visible pour un UFVK particulier est de veiller à ce que les notes ayant porté ce montant n’aient jamais appartenu au compte contrôlé par cet UFVK :

1. **Comptes ZIP-32 séparés** (même seed) — Créez un nouvel index de compte, déplacez-y des fonds et n’exportez jamais l’UFVK de ce compte. L’UFVK du compte d’origine ne voit que le transfert vers le nouveau compte.
2. **Wallet complètement séparé** (seed différent) — Financez un nouveau wallet, dépensez depuis celui-ci, puis jetez le seed ou l’UFVK. Le wallet d’origine n’enregistre que le transfert de financement.
3. **Wallets éphémères à usage unique** — Même principe que ci-dessus, mais traitez le wallet de dépense comme jetable.

Un UFVK est propre à chaque compte. Les notes qui n’ont jamais existé dans ce compte n’apparaissent jamais dans son solde ni dans ses totaux de sorties.

## Comment les wallets utilisent les politiques aujourd’hui

Presque tous les wallets de production utilisent uniquement la politique **Expéditeur** par défaut, de sorte que l’historique sortant complet est récupérable depuis l’UFVK. Les deux autres politiques existent dans la bibliothèque, mais sont rarement exposées dans les interfaces utilisateur.

Les options futures possibles comprennent :

- Un indicateur par transaction permettant à l’utilisateur de choisir Personnalisée ou Discard pour un paiement unique.
- Un mode Discard permanent (la restauration depuis le seed n’afficherait alors que les sorties nettes).
- Des OVK personnalisées pour la divulgation sélective de paiements individuels (plus légère qu’une divulgation complète de paiement [ZIP 311](https://zips.z.cash/zip-0311)).
- La poursuite de l’utilisation de la séparation des comptes ou des wallets pour une isolation plus forte.

## Ressources

- [ZIP 310 : Propriétés de sécurité des clés de visualisation Sapling](https://zips.z.cash/zip-0310)
- [ZIP 316 : Adresses unifiées et clés de visualisation unifiées](https://zips.z.cash/zip-0316)
- [ZIP 315 : Bonnes pratiques pour les implémentations de wallets](https://zips.z.cash/zip-0315)
- [OvkPolicy dans zcash_client_backend](https://zcash.github.io/librustzcash/rustdoc/latest/zcash_client_backend/wallet/enum.OvkPolicy.html)
- [librustzcash](https://github.com/zcash/librustzcash)
- [zingolib](https://github.com/zingolabs/zingolib)

## Pages associées

- [Clés de visualisation](/zcash-tech/viewing-keys)
- [Divulgations de paiement](/zcash-tech/payment-disclosures)
- [Adresses unifiées](/zcash-tech/unified-addresses)
- [Ce qu’un explorateur de blocs peut voir](/zcash-tech/what-a-block-explorer-can-see)
