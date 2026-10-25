# Zcash Mises à niveau du réseau

Zcash s'améliore grâce à des mises à niveau du réseau : des modifications coordonnées des règles sur lesquelles chaque nœud s'accorde, chacune activée à une hauteur de bloc déterminée. Chaque mise à niveau ci-dessous possède sa propre page qui explique, en langage clair, ce qu'elle a changé et pourquoi. Vous découvrez Zcash ? Lisez-les dans l'ordre, de Sprout à Ironwood.

Pour suivre visuellement l'évolution de la confidentialité de Zcash à travers ces mises à niveau, consultez [L'évolution de la confidentialité](https://zechub.wiki/zcash-evolution). Cette page est l'index. Celle-ci est la chronologie.

| Mise à niveau | Activation (UTC) | Bloc | ID de branche | Ce qu'elle a changé |
|---|---|---|---|---|
| [Sprout](../zcash-tech/sprout) | 28 octobre 2016 | genesis | 00000000 | Le lancement : le premier pool blindé et les transactions privées zk-SNARK |
| [Overwinter](../zcash-tech/overwinter) | 26 juin 2018 | 347,500 | 5ba81b19 | Protection contre la relecture, versionnage et expiration des transactions, rendant possibles des mises à niveau sûres |
| [Sapling](../zcash-tech/sapling) | 29 octobre 2018 | 419,200 | 76b809bb | Transactions blindées efficaces, assez rapides pour les téléphones et les wallets matériels |
| [Blossom](../zcash-tech/blossom) | 11 décembre 2019 | 653,600 | 2bb40e60 | Des blocs plus rapides, d'environ 75 secondes, et un débit accru |
| [Heartwood](../zcash-tech/heartwood) | 16 juillet 2020 | 903,000 | f5b9230b | Récompenses de minage blindées et clients plus légers (FlyClient) |
| [Canopy](../zcash-tech/canopy) | 18 novembre 2020 | 1,046,400 | e9ff75a6 | Le Fonds de développement, le premier halving et l'abandon progressif du pool Sprout |
| [NU5](../zcash-tech/nu5) | 31 mai 2022 | 1,687,104 | c2d6d0b4 | Le pool Orchard sur Halo 2 (sans configuration de confiance), les adresses unifiées et les transactions v5 |
| [NU6](../zcash-tech/nu6) | 23 novembre 2024 | 2,726,400 | c8e71055 | La Deferred Dev Fund Lockbox et une nouvelle répartition du financement du développement |
| [NU6.1](../zcash-tech/nu6-1) | 24 novembre 2025 | 3,146,400 | 4dec4df0 | La gouvernance de ce financement par la communauté et les détenteurs de pièces |
| [NU6.2](../zcash-tech/nu6-2) | 3 juin 2026 | 3,364,600 | 5437f330 | Un correctif d'urgence qui a corrigé le circuit Orchard |
| [Ironwood (NU6.3)](../zcash-tech/ironwood) | 28 juillet 2026 | 3,428,143 | 37a5165b | Le pool Ironwood et un tourniquet public permettant à quiconque d'auditer l'offre |
| **NU7** (à venir) | Testnet : 4 oct. 2026 ; Mainnet : prévu le 5 nov. 2026 | Testnet : 4,465,026 ; Mainnet : TBD (fixé le 20 oct.) | 77190ad9 | Blocs de 25 secondes (ZIP 218), recyclage des frais NSM (ZIP 235+237), retrait de Sprout (ZIP 2003) |

Les dates sont indiquées en UTC. Certains tableaux de bord les affichent à l'heure locale, mais il s'agit du même bloc et du même moment. Le déclencheur fixe de chaque mise à niveau est sa hauteur de bloc d'activation, et non la date du calendrier.

### Statut de NU7

NU7 est actif sur le Testnet public à la hauteur **4,465,026** (activé le 4 octobre 2026). La hauteur d'activation du Mainnet sera choisie le **20 octobre 2026** ; la cible actuelle est le **5 novembre 2026**.

Portée (ZIP 259) :

- **Blocs de 25 secondes** (ZIP 218) — première confirmation environ 3× plus rapide ; l'émission quotidienne de ZEC est inchangée.
- **Mécanisme de durabilité du réseau** (ZIP 235 + ZIP 237) — 60 % des frais de transaction sont retirés de la circulation et placés dans une réserve, puis réémis aux mineurs selon un calendrier préservant les halvings à partir d'environ février 2031.
- **Retrait de Sprout** (ZIP 2003) — les transactions de version 4 deviennent invalides ; les fonds Sprout restants deviennent non dépensables.
- Limites d'actions blindées et fenêtre de calcul de la difficulté plus large (17 → 102 blocs).

Aucun nouveau format de transaction n'est introduit. ID de branche du consensus : `0x77190ad9`.

Consultez la chronologie [L'évolution de la confidentialité](https://zechub.wiki/zcash-evolution) et [ZIP 259](https://zips.z.cash/zip-0259) pour tous les détails. Chronologie du forum : [NU7 Chronologie](https://forum.zcashcommunity.com/t/nu7-timeline/57655).
