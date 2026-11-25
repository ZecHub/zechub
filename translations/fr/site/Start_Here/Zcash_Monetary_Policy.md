<a href="https://github.com/zechub/zechub/edit/main/site/Start_Here/Zcash_Monetary_Policy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Politique monétaire de Zcash

## En bref

* Zcash a une offre fixe de 21 millions de ZEC, le même plafond que Bitcoin.
* Depuis l’activation de NU7 le 6 novembre 2026, un nouveau bloc est créé environ toutes les 25 secondes et génère 0.52083333 ZEC.
* Cela représente environ 1 800 nouveaux ZEC par jour, soit la même quantité quotidienne qu’avant NU7.
* Chaque récompense de bloc est répartie ainsi : 80 % pour le mineur, 8 % pour Zcash Community Grants et 12 % pour le lockbox.
* La récompense de bloc est divisée par deux environ tous les quatre ans. Le prochain halving est attendu vers la fin novembre 2028.

## Explication principale

### Quelle est l’économie de Zcash ?

La base monétaire de Zcash est identique à l’offre fixe de 21 millions d’unités monétaires ZEC de Bitcoin. En moyenne, toutes les 25 secondes (contre 75 secondes avant l’activation de NU7 le 6 novembre 2026), un nouveau [bloc](https://zcash.readthedocs.io/en/latest/rtd_pages/glossary.html#:~:text=Block,mempool%20in%20an%20unconfirmed%20state.) est miné sur la blockchain Zcash et une récompense de bloc de 0.52083333 ZEC entre en circulation. Avant NU7, la récompense était de 1.5625 ZEC par bloc ; [ZIP 218](https://zips.z.cash/zip-0218) l’a divisée par trois, tout comme le temps entre les blocs, de sorte que la quantité de nouveaux ZEC par jour n’a pas changé. Depuis NU7, les 0.52083333 ZEC sont répartis ainsi : 80 % pour le mineur (0.41666668 ZEC, plus les frais de transaction), 8 % pour Zcash Community Grants (0.04166666 ZEC) et 12 % pour le lockbox (0.06249999 ZEC), conformément à [ZIP 1015](https://zips.z.cash/zip-1015).

Le montant de la récompense de bloc est réduit de moitié environ tous les quatre ans, jusqu’à ce que les 21 millions de ZEC soient tous en circulation. L’inflation de Zcash reproduit presque exactement celle de Bitcoin. Il est important de noter qu’à mesure que de nouvelles pièces sont créées, l’inflation diminue et, à chaque halving, son taux baisse considérablement.

## Illustration / Analogie

Imaginez un distributeur de pièces devant un coffre-fort scellé. Le coffre contient au total 21 millions de ZEC, et personne ne peut y ajouter la moindre pièce.

Toutes les 25 secondes, le distributeur libère une petite poignée de nouvelles pièces, soit 0.52083333 ZEC. Le mineur qui a trouvé le bloc prend 80 % de la poignée. Zcash Community Grants en reçoit 8 %. Les 12 % restants vont dans le lockbox.

Environ tous les quatre ans, la poignée est réduite de moitié. C’est le halving.

NU7 a rendu les distributions trois fois plus fréquentes et chacune trois fois plus petite. Le nombre de nouvelles pièces par jour est resté le même.

## Approfondissement

### Nouveaux ZEC par jour, période par période

Les halvings réduisent la récompense par bloc. Des blocs plus rapides (Blossom en 2019, NU7 en 2026) réduisent également la récompense par bloc, ainsi que le temps entre les blocs, ce qui maintient la quantité quotidienne à son niveau précédent.

| Période | Temps entre les blocs | Récompense par bloc | Nouveaux ZEC par jour |
|:--|:--|:--|:--|
| Période de lancement, de 2016 à 2019 | 150 secondes | 12.5 ZEC | 7 200 |
| [Blossom](/zcash-tech/blossom), de décembre 2019 à novembre 2020 | 75 secondes | 6.25 ZEC | 7 200 |
| Premier halving ([Canopy](/zcash-tech/canopy)), de novembre 2020 à novembre 2024 | 75 secondes | 3.125 ZEC | 3 600 |
| Deuxième halving ([NU6](/zcash-tech/nu6)), de novembre 2024 à novembre 2026 | 75 secondes | 1.5625 ZEC | 1 800 |
| [NU7](/zcash-tech/nu7), de novembre 2026 à fin 2028 | 25 secondes | 0.52083333 ZEC | 1 800 |
| Troisième halving, attendu fin novembre 2028 | 25 secondes | La moitié de la récompense actuelle | Environ 900 |

Chaque valeur quotidienne correspond à la récompense par bloc multipliée par le nombre de blocs dans une journée (86 400 secondes divisées par le temps entre les blocs). Les temps réels entre les blocs varient légèrement ; l’émission quotidienne réelle fluctue donc légèrement autour de ces valeurs.

### Date du prochain halving

NU7 a rendu les blocs trois fois plus fréquents ; le numéro de bloc du prochain halving a donc changé. Le prochain halving est prévu au bloc 6,132,390, vers la fin novembre 2028 ([ZIP 259](https://zips.z.cash/zip-0259)). Les articles plus anciens indiquent le bloc 4,406,400. Ce numéro était correct avant NU7.

### Frais et mécanisme de durabilité du réseau

Depuis NU7, 60 % des frais de transaction de chaque bloc sont retirés de la circulation et conservés dans une réserve publique. À partir du bloc 8,939,664, prévu vers février 2031, chaque bloc versera aux mineurs une part fixe de cette réserve, en plus de la récompense de bloc habituelle. Le plafond de 21 millions ne change pas. La page [Mécanisme de durabilité du réseau](/zcash-tech/network-sustainability-mechanism) explique son fonctionnement.

## Pages connexes

- [NU7](/zcash-tech/nu7) : la mise à niveau qui a introduit les blocs de 25 secondes et la récompense de bloc actuelle.
- [Mécanisme de durabilité du réseau](/zcash-tech/network-sustainability-mechanism) : la destination des 60 % des frais de chaque bloc et le moment où ils reviennent.
- [Fonds de développement](/start-here/development-fund) : l’historique de la part de la récompense de bloc consacrée au développement.
- [Mises à niveau du réseau](/start-here/network-upgrades) : chaque mise à niveau de Zcash, avec ses dates et hauteurs de bloc.
- [Zcash Community Grants](/zcash-organizations/zcash-community-grants) : l’organisation qui reçoit la part de 8 %.
- [Pools de minage de Zcash](/using-zcash/zcash-mining-pools) : là où la plupart des mineurs perçoivent leur part de la récompense de bloc.

### Ressources

[Quelle est l'économie de Zcash ?](https://z.cash/support/faq/#:~:text=Zcash's%20monetary%20base%20is%20the,3.125%20ZEC%20comes%20into%20circulation.)

[ZIP 218 : espacement cible de 25 secondes entre les blocs](https://zips.z.cash/zip-0218)

[ZIP 259 : déploiement de la NU7 mise à niveau du réseau](https://zips.z.cash/zip-0259)

[ZIP 1015](https://zips.z.cash/zip-1015)

**Dernière mise à jour :** novembre 2026
