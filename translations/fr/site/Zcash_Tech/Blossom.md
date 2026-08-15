---
<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Blossom.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Blossom

> Blossom a été activée sur le mainnet de Zcash au bloc 653 600 (11 décembre 2019 UTC).

Ce que vous allez retenir : comment Blossom a permis aux blocs Zcash d’arriver environ deux fois plus vite sans changer la quantité de ZEC que le réseau crée au fil du temps.

Blossom est une [mise à niveau du réseau](../start-here/network-upgrades) Zcash. Elle a été déployée par [ZIP 206](https://zips.z.cash/zip-0206), et son principal changement de consensus est défini dans [ZIP 208](https://zips.z.cash/zip-0208). Blossom était une mise à niveau de scalabilité : elle a réduit le temps cible entre les blocs de 150 secondes à 75 secondes, de sorte que les blocs arrivent environ deux fois plus souvent. Electric Coin Company a dirigé et annoncé Blossom.

Pourquoi c’est important. Lorsque vous envoyez des ZEC, vous attendez que le réseau les confirme dans un bloc. Si les blocs sont lents, vous attendez plus longtemps. Avant Blossom, un nouveau bloc était attendu environ toutes les 150 secondes. Blossom a réduit cet objectif de moitié, à 75 secondes, de sorte que les confirmations arrivent plus tôt et que la chaîne peut transporter davantage de transactions pendant la même durée. Elle l’a fait sans créer plus de ZEC ni déplacer le calendrier des futures réductions de moitié.

## Des blocs plus rapides

Le changement central de Blossom est simple. L’espacement cible des blocs de Zcash, c’est-à-dire le temps que le réseau vise entre un bloc et le suivant, est passé de 150 secondes à 75 secondes ([ZIP 208](https://zips.z.cash/zip-0208)). Les blocs sont trouvés par preuve de travail, donc l’intervalle réel entre eux varie, mais le réseau vise désormais un bloc environ toutes les 75 secondes au lieu de toutes les 150.

Il en découle deux choses :

1. Les blocs arrivent environ deux fois plus souvent, donc la chaîne peut transporter approximativement deux fois plus de transactions par unité de temps.
2. Votre transaction reçoit sa première confirmation plus tôt, car vous n’attendez pas aussi longtemps le bloc suivant.

![Avant Blossom, l’objectif de bloc était de 150 secondes, avec des confirmations plus lentes et un débit plus faible. Après Blossom, l’objectif est de 75 secondes, avec des confirmations plus rapides et un débit approximativement doublé](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/blossom-block-spacing.png)

## Maintenir l’émission stable

Des blocs plus rapides soulèvent une question. Si Zcash produisait deux fois plus de blocs et que chaque bloc versait toujours la même récompense, le réseau créerait des ZEC deux fois plus vite. Blossom évite cela. Elle a réduit de moitié la récompense versée par bloc, et elle a doublé l’intervalle de réduction de moitié de la récompense de bloc, le faisant passer de 840 000 à 1 680 000 blocs ([ZIP 208](https://zips.z.cash/zip-0208)). Deux fois plus de blocs, chacun versant deux fois moins, reviennent à créer la même quantité de ZEC par unité de temps. Le calendrier de l’offre totale et le moment des futures réductions de moitié, mesurés en temps réel, n’ont pas changé.

![Comment Blossom maintient l’émission stable : les blocs de 75 secondes arrivent deux fois plus souvent, la récompense par bloc est divisée par deux, l’intervalle de réduction de moitié est doublé, donc l’émission totale au fil du temps reste la même](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/blossom-emission-balance.png)

## Une mise à niveau obligatoire

Blossom était un changement bilatéral du consensus, ce qui signifie que chaque nœud devait être mis à niveau pour continuer à suivre la chaîne ([ZIP 206](https://zips.z.cash/zip-0206)). Ce n’était pas facultatif pour un opérateur de nœud qui voulait rester synchronisé. Blossom s’est activée au bloc 653 600 du mainnet et possède son propre identifiant de branche de consensus, une étiquette qui permet aux nœuds et aux transactions de confirmer qu’ils suivent les règles de Blossom. La mise à niveau a utilisé le mécanisme standard de mise à niveau du réseau de Zcash ([ZIP 200](https://zips.z.cash/zip-0200)).

## Où se situe Blossom

Blossom était la troisième mise à niveau du réseau de Zcash. Elle a suivi Overwinter et Sapling, et elle est arrivée avant Heartwood et Canopy. Contrairement à Sapling, qui a retravaillé la cryptographie protégée de Zcash, Blossom était axée sur l’échelle et la rapidité. Son rôle principal concernait le timing des blocs, pas de nouvelles fonctionnalités de confidentialité.

## Glossaire

| Terme | Signification en langage simple |
|---|---|
| Espacement cible des blocs | Le temps que le réseau vise entre un bloc et le suivant |
| Récompense de bloc | Les nouveaux ZEC créés et versés à mesure que chaque bloc est miné |
| Intervalle de réduction de moitié | Le nombre de blocs qui s’écoulent entre chaque réduction de moitié de la récompense de bloc |
| Identifiant de branche de consensus | Une étiquette qui indique quel ensemble de règles du réseau un nœud ou une transaction suit |
| Changement bilatéral du consensus | Un changement de règle que chaque nœud doit adopter pour rester sur le réseau |
| Mise à niveau du réseau (NU) | Un changement coordonné des règles de consensus de Zcash, activé à une hauteur de bloc définie |

## FAQ

Blossom change-t-elle la quantité de ZEC existante ou le moment où les réductions de moitié se produisent ? Non. La récompense par bloc a été divisée par deux et l’intervalle de réduction de moitié a été doublé en même temps, de sorte que la quantité de ZEC créée par unité de temps, ainsi que le calendrier des futures réductions de moitié, sont restés identiques.

Blossom change-t-elle mes ZEC ou ma confidentialité ? Non. Blossom a modifié le timing des blocs et le calcul des récompenses. Elle n’a pas touché à vos soldes ni à vos transactions protégées.

Que signifient concrètement 75 secondes ? C’est un objectif, pas une garantie. Les blocs sont trouvés par preuve de travail, donc l’intervalle réel entre les blocs varie. Le réseau vise un bloc environ toutes les 75 secondes au lieu de toutes les 150.

Devais-je faire quelque chose lorsque Blossom s’est activée ? Si vous exploitiez un nœud complet, vous deviez le mettre à niveau, car Blossom était obligatoire. Si vous utilisiez un wallet, vous aviez besoin d’une version prenant en charge les nouvelles règles.

Pourquoi réduire de moitié la récompense de bloc ? Parce que les blocs arrivent désormais deux fois plus vite. Réduire de moitié la récompense par bloc évite que le réseau crée des ZEC deux fois plus rapidement.

Quand Blossom s’est-elle activée ? Au bloc 653 600 du mainnet, le 11 décembre 2019 UTC.

## Testez votre compréhension

Blossom a fait arriver les blocs Zcash environ deux fois plus souvent. Pourquoi cela n’a-t-il pas doublé le rythme auquel de nouveaux ZEC sont créés ?

<details>
<summary>Réponse</summary>

Parce que Blossom a également divisé par deux la récompense versée par bloc et doublé l’intervalle de réduction de moitié, le faisant passer de 840 000 à 1 680 000 blocs. Deux fois plus de blocs, chacun versant deux fois moins, donnent au total la même quantité de ZEC par unité de temps, de sorte que le calendrier d’émission mesuré en temps réel n’a pas changé.
</details>

### Ressources

[ZIP 208 : Espacement cible des blocs plus court](https://zips.z.cash/zip-0208)

[ZIP 206 : Déploiement de la mise à niveau réseau Blossom](https://zips.z.cash/zip-0206)

[Mise à niveau réseau Blossom](https://z.cash/upgrade/blossom/)

[La mise à niveau Blossom améliore la vitesse, la scalabilité et la capacité (Electric Coin Company)](https://electriccoin.co/blog/blossom-upgrade-improves-speed-scalability-capacity/)

### Voir aussi

[Mises à niveau du réseau Zcash](../start-here/network-upgrades)

[Politique monétaire de Zcash](../start-here/zcash-monetary-policy)

[Qu’est-ce que ZEC et Zcash](../start-here/what-is-zec-and-zcash)

[Nœuds complets](../zcash-tech/full-nodes)

[NU6.1](../zcash-tech/nu6-1)

---

Série : [Index des mises à niveau du réseau](../start-here/network-upgrades) · Précédent : [Sapling](../zcash-tech/sapling) · Suivant : [Heartwood](../zcash-tech/heartwood)
