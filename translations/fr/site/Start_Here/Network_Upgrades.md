# Zcash Mises à niveau du réseau

Zcash s'améliore au fil des mises à niveau du réseau : des modifications coordonnées des règles sur lesquelles tous les nœuds s'accordent, chacune activée à une hauteur de bloc définie. Chaque mise à niveau ci-dessous dispose de sa propre page qui explique, en termes simples, ce qu'elle a modifié et pourquoi. Vous découvrez Zcash ? Lisez-les dans l'ordre, de Sprout à Ironwood.

Pour découvrir en images comment la confidentialité de Zcash a évolué au fil de ces mises à niveau, consultez [L'évolution de la confidentialité](https://zechub.wiki/zcash-evolution). Cette page-ci est l'index. Celle-là est la chronologie.

| Mise à niveau | Activation (UTC) | Bloc | Identifiant de branche | Ce qu'elle a modifié |
|---|---|---|---|---|
| [Sprout](../zcash-tech/sprout) | 28 octobre 2016 | genèse | 00000000 | Le lancement : le premier pool protégé et les transactions privées zk-SNARK |
| [Overwinter](../zcash-tech/overwinter) | 26 juin 2018 | 347 500 | 5ba81b19 | La protection contre la rejouabilité, le versionnage des transactions et leur expiration, rendant possibles des mises à niveau sûres |
| [Sapling](../zcash-tech/sapling) | 29 octobre 2018 | 419 200 | 76b809bb | Des transactions protégées efficaces, assez rapides pour les téléphones et les portefeuilles matériels |
| [Blossom](../zcash-tech/blossom) | 11 décembre 2019 | 653 600 | 2bb40e60 | Des blocs plus rapides, environ 75 secondes, et un débit plus élevé |
| [Heartwood](../zcash-tech/heartwood) | 16 juillet 2020 | 903 000 | f5b9230b | Des récompenses de minage protégées et des clients plus légers (FlyClient) |
| [Canopy](../zcash-tech/canopy) | 18 novembre 2020 | 1 046 400 | e9ff75a6 | Le Fonds de développement, le premier halving et l'abandon progressif du pool Sprout |
| [NU5](../zcash-tech/nu5) | 31 mai 2022 | 1 687 104 | c2d6d0b4 | Le pool Orchard sur Halo 2 (sans configuration de confiance), les adresses unifiées et les transactions v5 |
| [NU6](../zcash-tech/nu6) | 23 novembre 2024 | 2 726 400 | c8e71055 | Le coffre du Fonds de développement différé et une nouvelle répartition du financement du développement |
| [NU6.1](../zcash-tech/nu6-1) | 24 novembre 2025 | 3 146 400 | 4dec4df0 | La gouvernance de ce financement par la communauté et les détenteurs de pièces |
| [NU6.2](../zcash-tech/nu6-2) | 3 juin 2026 | 3 364 600 | 5437f330 | Un correctif d'urgence qui a corrigé le circuit Orchard |
| [Ironwood (NU6.3)](../zcash-tech/ironwood) | 28 juillet 2026 | 3 428 143 | 37a5165b | Le pool Ironwood et un sas comptable public qui permet à chacun d'auditer l'offre |
| [NU7](../zcash-tech/nu7) | 6 novembre 2026 | 3 543 405 | 77190ad9 | Des blocs de 25 secondes (ZIP 218), le recyclage des frais par le NSM (ZIP 235+237), le retrait de Sprout (ZIP 2003) |

Les dates sont indiquées en UTC. Certains tableaux de bord les affichent en heure locale, ce qui correspond au même bloc et au même moment. Le déclencheur fixe de chaque mise à niveau est sa hauteur de bloc d'activation, et non la date du calendrier.

### Statut de NU7

NU7 a été activée sur le Mainnet à la hauteur **3 543 405** ([ZIP 259](https://zips.z.cash/zip-0259)) le **6 novembre 2026** (02 h 34 UTC ; le soir du 5 novembre dans les fuseaux horaires des États-Unis). Elle avait été mise en service plus tôt sur le Testnet public, à la hauteur **4 465 026** (4 octobre 2026).

Périmètre (ZIP 259) :

- **Blocs de 25 secondes** (ZIP 218) : première confirmation environ 3 fois plus rapide ; émission quotidienne de ZEC inchangée.
- **Mécanisme de durabilité du réseau** (ZIP 235 + ZIP 237) : 60 % des frais de transaction sont retirés de la circulation et versés dans une réserve, puis réémis aux mineurs selon un calendrier qui préserve les halvings, à partir de février 2031 environ.
- **Retrait de Sprout** (ZIP 2003) : les transactions de version 4 deviennent invalides ; les fonds restants dans Sprout deviennent impossibles à dépenser.
- Des limites d'actions protégées et une fenêtre de calcul de la moyenne de difficulté élargie (17 → 102 blocs).

Aucun nouveau format de transaction n'est introduit. Identifiant de branche de consensus : `0x77190ad9`.

Consultez la chronologie [L'évolution de la confidentialité](https://zechub.wiki/zcash-evolution) et [ZIP 259](https://zips.z.cash/zip-0259) pour tous les détails. Chronologie sur le forum : [Chronologie de NU7](https://forum.zcashcommunity.com/t/nu7-timeline/57655).
