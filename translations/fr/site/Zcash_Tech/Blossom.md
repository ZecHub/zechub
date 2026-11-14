<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Blossom.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Blossom

> Blossom a été activée sur le réseau principal de Zcash au bloc 653 600 (11 décembre 2019, UTC).

Ce que vous allez retenir : comment Blossom a permis aux blocs de Zcash d’arriver environ deux fois plus vite, sans modifier la quantité de ZEC que le réseau crée au fil du temps.

Blossom est une [mise à niveau du réseau](../start-here/network-upgrades) de Zcash. Elle a été déployée par [ZIP 206](https://zips.z.cash/zip-0206), et sa principale modification du consensus est définie dans [ZIP 208](https://zips.z.cash/zip-0208). Blossom était une mise à niveau axée sur la mise à l’échelle : elle a réduit le temps cible entre deux blocs de 150 secondes à 75 secondes, de sorte que les blocs arrivent environ deux fois plus souvent. La Electric Coin Company a dirigé et annoncé Blossom.

Pourquoi c’est important. Lorsque vous envoyez des ZEC, vous attendez que le réseau les confirme dans un bloc. Si les blocs sont lents, vous attendez plus longtemps. Avant Blossom, un nouveau bloc était attendu environ toutes les 150 secondes. Blossom a réduit cette cible de moitié, à 75 secondes, ce qui permet d’obtenir des confirmations plus rapidement et à la chaîne de traiter davantage de transactions dans le même laps de temps. Elle y est parvenue sans créer davantage de ZEC ni décaler le calendrier des futurs halvings. (NU7, activée en novembre 2026, a ensuite de nouveau réduit la cible à 25 secondes dans le cadre de [ZIP 218](https://zips.z.cash/zip-0218), selon la même approche.)

## En bref

- Blossom était la troisième mise à niveau du réseau de Zcash, activée au bloc 653 600 du réseau principal (11 décembre 2019, UTC), déployée par ZIP 206, sa modification centrale étant définie dans ZIP 208.
- Elle a réduit l’espacement cible des blocs de 150 secondes à 75 secondes : les blocs arrivent environ deux fois plus souvent, les premières confirmations sont donc plus rapides et le débit double à peu près.
- Pour maintenir une émission stable, elle a réduit de moitié la récompense par bloc et doublé l’intervalle entre halvings, qui est passé de 840 000 à 1 680 000 blocs.
- La quantité totale de ZEC créée par unité de temps et le calendrier réel des futurs halvings n’ont pas changé.
- Il s’agissait d’une modification bilatérale obligatoire : chaque nœud devait être mis à niveau pour rester sur la chaîne.

## Analogie visuelle

Blossom ressemble à un réseau de bus qui double ses départs. Les bus passent désormais toutes les 75 secondes au lieu de toutes les 150, vous attendez donc deux fois moins longtemps (confirmations plus rapides) et le réseau transporte deux fois plus de passagers (débit). Pour que la masse salariale des chauffeurs reste la même, la rémunération de chaque chauffeur par trajet est réduite de moitié : la dépense salariale totale est identique, simplement répartie sur deux fois plus de trajets.


## Des blocs plus rapides

La modification centrale de Blossom est simple. L’espacement cible des blocs de Zcash, c’est-à-dire le temps que le réseau vise entre un bloc et le suivant, est passé de 150 secondes à 75 secondes ([ZIP 208](https://zips.z.cash/zip-0208)). Les blocs sont trouvés par preuve de travail, de sorte que l’écart réel entre eux varie, mais le réseau vise désormais un bloc environ toutes les 75 secondes au lieu de toutes les 150.

Il en découle deux conséquences :

1. Les blocs arrivent environ deux fois plus souvent, de sorte que la chaîne peut traiter à peu près deux fois plus de transactions par unité de temps.
2. Votre transaction reçoit sa première confirmation plus tôt, car vous attendez moins longtemps le bloc suivant.

![Avant Blossom, l'intervalle cible entre les blocs était de 150 secondes, avec des confirmations plus lentes et un débit plus faible. Après Blossom, il est de 75 secondes, avec des confirmations plus rapides et un débit environ doublé](/content-images/blossom-block-spacing-50b6bfbacc.webp)

## Maintenir une émission stable

Des blocs plus rapides soulèvent une question. Si Zcash produisait deux fois plus de blocs et que chaque bloc versait toujours la même récompense, le réseau créerait des ZEC deux fois plus vite. Blossom évite cela. Elle a réduit de moitié la récompense versée par bloc et doublé l’intervalle de halving de la récompense de bloc, qui est passé de 840 000 à 1 680 000 blocs ([ZIP 208](https://zips.z.cash/zip-0208)). Deux fois plus de blocs, chacun rapportant deux fois moins, cela revient à la même quantité de ZEC créée par unité de temps. Le calendrier d’émission total et le calendrier des futurs halvings, mesurés en temps réel, n’ont pas changé.

![Comment Blossom maintient une émission stable : les blocs de 75 secondes arrivent deux fois plus souvent, la récompense par bloc est divisée par deux et l'intervalle entre les halvings est doublé, de sorte que l'émission totale dans le temps reste la même](/content-images/blossom-emission-balance-f2443e29ab.webp)

## Une mise à niveau obligatoire

Blossom était une modification bilatérale du consensus, ce qui signifie que chaque nœud devait être mis à niveau pour continuer à suivre la chaîne ([ZIP 206](https://zips.z.cash/zip-0206)). Elle n’était pas facultative pour un opérateur de nœud souhaitant rester synchronisé. Blossom a été activée au bloc 653 600 du réseau principal et possède son propre identifiant de branche de consensus, une étiquette qui permet aux nœuds et aux transactions de confirmer qu’ils suivent les règles de Blossom. La mise à niveau a utilisé le mécanisme standard de mise à niveau du réseau de Zcash ([ZIP 200](https://zips.z.cash/zip-0200)).

## La place de Blossom

Blossom était la troisième mise à niveau du réseau de Zcash. Elle a suivi Overwinter et Sapling, et a précédé Heartwood et Canopy. Contrairement à Sapling, qui a remanié la cryptographie protégée de Zcash, Blossom était axée sur la mise à l’échelle et la vitesse. Sa mission principale portait sur le rythme des blocs, et non sur de nouvelles fonctionnalités de confidentialité.

## Erreurs courantes

- **Penser que des blocs plus rapides signifiaient davantage de ZEC.** Réduire de moitié la récompense par bloc tout en doublant la cadence des blocs maintient exactement la même émission par unité de temps.
- **Supposer que les halvings surviennent plus tôt en temps réel.** L’intervalle entre halvings a doublé, passant de 840 000 à 1 680 000 blocs, de sorte que les dates des halvings en temps réel n’ont pas bougé.
- **Interpréter « 75 secondes » comme une garantie.** Il s’agit d’une cible de preuve de travail ; les écarts réels entre les blocs varient autour de cette valeur.
- **Considérer Blossom comme une mise à niveau de confidentialité.** Sa mission portait sur le rythme des blocs et la mise à l’échelle : contrairement à Sapling, elle n’a modifié aucune cryptographie.
- **Penser que les opérateurs de nœuds pouvaient l’ignorer.** Blossom était une modification bilatérale du consensus ; un nœud non mis à niveau se retrouve séparé du réseau par un fork.


## Glossaire

| Terme | Signification en langage simple |
|---|---|
| Block target spacing | Le temps que le réseau vise entre un bloc et le suivant |
| Block reward | Les nouveaux ZEC créés et versés à chaque bloc miné |
| Halving interval | Le nombre de blocs qui s’écoulent entre deux réductions de moitié de la récompense de bloc |
| Consensus branch id | Une étiquette qui indique quel ensemble de règles du réseau un nœud ou une transaction suit |
| Bilateral consensus change | Une modification des règles que chaque nœud doit adopter pour rester sur le réseau |
| Network upgrade (NU) | Une modification coordonnée des règles de consensus de Zcash, activée à une hauteur de bloc déterminée |

## FAQ

Blossom modifie-t-elle la quantité de ZEC existante ou le moment des halvings ? Non. La récompense par bloc a été réduite de moitié et l’intervalle entre halvings a été doublé en même temps, de sorte que la quantité de ZEC créée par unité de temps, ainsi que le calendrier des futurs halvings, sont restés les mêmes.

Blossom modifie-t-elle mes ZEC ou ma confidentialité ? Non. Blossom a modifié le rythme des blocs et le calcul des récompenses. Elle n’a touché ni à vos soldes ni à vos transactions protégées.

Que signifient réellement 75 secondes ? Il s’agit d’une cible, et non d’une garantie. Les blocs sont trouvés par preuve de travail, de sorte que l’écart réel entre les blocs varie. Le réseau vise un bloc environ toutes les 75 secondes au lieu de toutes les 150.

Deviez-vous faire quelque chose lors de l’activation de Blossom ? Si vous exploitiez un nœud complet, vous deviez le mettre à niveau, car Blossom était obligatoire. Si vous utilisiez un portefeuille, vous aviez besoin d’une version prenant en charge les nouvelles règles.

Pourquoi réduire de moitié la récompense de bloc ? Parce que les blocs arrivent désormais deux fois plus vite. Réduire de moitié la récompense par bloc empêche le réseau de créer des ZEC deux fois plus rapidement.

Quand Blossom a-t-elle été activée ? Au bloc 653 600 du réseau principal, le 11 décembre 2019 (UTC).

## Testez vos connaissances

Blossom a permis aux blocs de Zcash d’arriver environ deux fois plus souvent. Pourquoi cela n’a-t-il pas doublé le rythme de création de nouveaux ZEC ?

<details>
<summary>Réponse</summary>

Parce que Blossom a également réduit de moitié la récompense versée par bloc et doublé l’intervalle entre halvings, qui est passé de 840 000 à 1 680 000 blocs. Deux fois plus de blocs, chacun rapportant deux fois moins, cela donne la même quantité de ZEC par unité de temps : le calendrier d’émission mesuré en temps réel n’a donc pas changé.
</details>

### Ressources

[ZIP 208 : réduction de l’espacement cible des blocs](https://zips.z.cash/zip-0208)

[ZIP 206 : déploiement de la mise à niveau du réseau Blossom](https://zips.z.cash/zip-0206)

[Mise à niveau du réseau Blossom](https://z.cash/upgrade/blossom/)

[La mise à niveau Blossom améliore la vitesse, la mise à l’échelle et la capacité (Electric Coin Company)](https://electriccoin.co/blog/blossom-upgrade-improves-speed-scalability-capacity/)

### Voir aussi

[Mises à niveau du réseau de Zcash](../start-here/network-upgrades)

[Politique monétaire de Zcash](../start-here/zcash-monetary-policy)

[Qu’est-ce que ZEC et Zcash](../start-here/what-is-zec-and-zcash)

[Nœuds complets](../zcash-tech/full-nodes)

[NU6.1](../zcash-tech/nu6-1)

---

## Pages connexes

- [Sapling](./Sapling.md) : la mise à niveau précédente (cryptographie, et non rythme des blocs)
- [Heartwood](./Heartwood.md) : la mise à niveau suivante de la série
- [Nœuds complets](./Full_Nodes.md) : ce qu’implique l’exploitation d’un nœud lors des mises à niveau obligatoires
- [Index des mises à niveau du réseau](../start-here/network-upgrades) : la chronologie complète des mises à niveau


Série : [Index des mises à niveau du réseau](../start-here/network-upgrades) · Précédent : [Sapling](../zcash-tech/sapling) · Suivant : [Heartwood](../zcash-tech/heartwood)
