<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Ironwood.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifier la page"/>
</a>

# Ironwood

> Ironwood s’active sur le mainnet de Zcash au bloc 3,428,143, prévu aux alentours du 28 juillet 2026 UTC.

Ce que vous allez retenir : ce que change Ironwood, pourquoi un bug dans de l’argent caché est grave, et comment le tourniquet permet à n’importe qui de confirmer qu’aucun ZEC n’a été forgé.

Ironwood est une [mise à niveau du réseau](../start-here/network-upgrades) Zcash, formellement NU6.3, qui introduit un nouveau pool shielded du même nom. Un [pool shielded](../using-zcash/shielded-pools) est l’ensemble des fonds dont les montants et les propriétaires restent cachés grâce à la [cryptographie à connaissance nulle](../zcash-tech/zk-snarks). Ironwood existe pour contenir et auditer un bug de solidité découvert dans le pool shielded Orchard existant, et pour donner à la communauté un moyen plus robuste de vérifier que l’offre totale de ZEC est honnête. Ses règles de consensus sont spécifiées dans la [ZIP 258](https://zips.z.cash/zip-0258).

Pourquoi cela compte. Avec de l’argent transparent comme Bitcoin, n’importe qui peut vérifier qu’aucune pièce n’a été forgée en lisant le registre public. L’argent shielded cache les montants, donc on ne peut pas simplement regarder. À la place, c’est la cryptographie elle-même qui doit garantir que personne ne peut créer de l’argent en secret. Ironwood est important parce qu’un bug a été trouvé dans cette garantie pour le pool Orchard. Cette mise à niveau comble cette faille et donne à chacun un moyen de confirmer que l’offre totale de ZEC reste honnête.

Nouveau sur Zcash ? Commencez par [Qu’est-ce que ZEC et Zcash](../start-here/what-is-zec-and-zcash) et [Pools Shielded](../using-zcash/shielded-pools), puis revenez ici.

![Flux de migration de valeur d’Ironwood : la valeur quitte le pool Orchard, passe par le point de contrôle du tourniquet, et entre dans le nouveau pool Ironwood](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/ironwood-flow.png)

## Pourquoi Ironwood était nécessaire

Fin mai 2026, le chercheur indépendant en sécurité Taylor Hornby, dans le cadre d’un audit du protocole pour [Shielded Labs](../zcash-organizations/shielded-labs), a divulgué de manière responsable un bug de solidité dans le pool shielded Orchard. Orchard était alors le plus récent pool shielded de Zcash, et la faille se trouvait dans une partie en courbe elliptique de son circuit à connaissance nulle, qui utilise le système de preuves [Halo](../zcash-tech/halo) 2.

1. Un bug de solidité signifie que les mathématiques qui prouvent qu’une transaction est valide ne le garantissent pas complètement.
2. En théorie, un attaquant aurait pu exploiter cette faille pour forger une valeur invalide à l’intérieur du pool Orchard et dépenser des fonds qui ne lui appartenaient pas réellement, sans laisser de trace qu’un nœud normal pourrait détecter.
3. Le tourniquet de Zcash limitait tout de même la quantité de valeur pouvant quitter Orchard, donc l’offre totale ne pouvait pas être gonflée, mais la cryptographie propre au pool ne garantissait plus que chaque pièce cachée à l’intérieur était réelle.

![Explication du bug : une transaction entre avec 5 ZEC, mais la preuve défectueuse passe quand même lorsque 7 ZEC sortent, créant 2 ZEC à partir de rien](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/ironwood-bug.png)

Les chiffres ci-dessus donnent une image simplifiée. La faille réelle se trouvait dans un élément précis des mathématiques du circuit, et non dans un comptage littéral des pièces entrant et sortant. L’idée essentielle à retenir est simplement qu’un bug de solidité peut permettre de créer de la valeur à l’intérieur du pool sans détection.

Il est important de noter qu’il n’existe aucune preuve que le bug ait jamais été exploité, aucune preuve d’impact sur les fonds des utilisateurs, et aucune preuve que l’offre totale de ZEC ait changé. Il a été découvert dans le cadre de recherches en sécurité et corrigé avant tout dommage connu.

## La réponse

La communauté Zcash a déployé les correctifs par étapes plutôt qu’en une seule fois.

![Chronologie de la réponse à Ironwood : le bug d’Orchard est découvert en mai 2026, le pool est mis en pause en juin 2026, le circuit est corrigé dans NU6.2, et Ironwood s’active aux alentours du 28 juillet 2026](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/ironwood-timeline.png)

1. Début juin 2026, une mesure temporaire a désactivé le pool Orchard pendant la préparation d’un correctif complet.
2. La mise à niveau NU6.2 a corrigé le circuit Orchard lui-même, comblant la vulnérabilité de solidité sous-jacente.
3. La mise à niveau NU6.3, Ironwood, introduit un nouveau pool shielded et un point de contrôle public afin que la valeur puisse sortir de l’ancien pool Orchard sous audit complet.

![Le correctif dans NU6.2 : la preuve corrigée exige que les entrées soient égales aux sorties, de sorte qu’une sortie valide de 5 ZEC passe, tandis qu’une tentative de sortie de 7 ZEC est rejetée](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/ironwood-fix.png)

## Ce que fait le pool Ironwood

NU6.2 a sécurisé le circuit Orchard pour toutes les nouvelles transactions, mais la valeur créée selon les anciennes règles se trouve encore dans le pool Orchard. Ironwood donne à cette valeur une destination propre et un moyen de l’auditer pendant son déplacement.

Le pool Ironwood est un nouveau pool de valeur shielded créé lors de l’activation de NU6.3. Il repose sur le circuit corrigé et utilise un format de note récupérable face au quantique (une conception qui permettrait de récupérer les fonds si les [ordinateurs quantiques](../zcash-tech/post-quantum-security) finissaient par casser la cryptographie actuelle), défini dans la [ZIP 2005](https://zips.z.cash/zip-2005).

1. Après l’activation, l’ancien pool Orchard devient spend-only, donc aucune nouvelle valeur ne peut y entrer.
2. La nouvelle valeur shielded entre désormais dans Ironwood.
3. Les ZEC shielded conservent les mêmes solides garanties de confidentialité qui cachent l’expéditeur, le destinataire et le montant.

## Le tourniquet

L’idée clé d’Ironwood est le tourniquet, un point de contrôle comptable que chaque pièce doit franchir lors de son passage de l’ancien pool Orchard vers Ironwood.

> Un tourniquet fait pour de l’argent caché ce qu’une porte vitrée fait pour la chambre forte d’une banque. On ne peut toujours pas voir à l’intérieur, mais on peut compter exactement ce qui entre et ce qui sort.

1. Les fonds quittant Orchard sont comptés à un point de vérification public avant d’entrer dans Ironwood.
2. Cela permet à n’importe qui d’auditer combien de ZEC migrent, renforçant la confiance dans l’offre circulante réelle.
3. Si des ZEC contrefaits avaient été créés par le bug précédent, c’est dans cette comptabilité de migration qu’ils apparaîtraient.

Les tourniquets ne sont pas nouveaux pour Zcash. Le réseau les a déjà utilisés auparavant, aux frontières entre les pools Sprout, Sapling et Orchard, afin que la valeur circulant entre les pools reste auditable et qu’aucun pool ne puisse libérer plus qu’il n’a légitimement reçu.

Les règles de consensus maintiennent chaque pool de valeur, y compris Ironwood, dans la limite monétaire maximale du réseau, de sorte que les soldes des pools ne peuvent jamais devenir négatifs.

## Ce que les utilisateurs doivent faire

Les wallets et les logiciels de nœud gèrent l’essentiel automatiquement, mais le changement pratique est simple : au fil du temps, déplacez vos avoirs shielded depuis l’ancien pool Orchard, via le tourniquet, vers le pool Ironwood. Suivez les indications de votre fournisseur de wallet, et mettez toujours à jour vers une version prise en charge avant le bloc d’activation.

## Glossaire

| Terme | Signification en langage clair |
|---|---|
| Pool shielded | L’ensemble des fonds dont les montants et les propriétaires sont cachés par la cryptographie à connaissance nulle |
| Bug de solidité | Une faille qui permet à une transaction invalide de passer la vérification de preuve comme si elle était valide |
| Tourniquet | Un point de contrôle public qui compte la valeur circulant entre les pools afin que l’offre reste auditable |
| Spend-only | Un pool depuis lequel on peut dépenser, mais auquel on ne peut pas ajouter de nouvelle valeur |
| Mise à niveau du réseau (NU) | Une modification coordonnée des règles de consensus de Zcash, activée à une hauteur de bloc donnée |
| Note récupérable face au quantique | Un format de note conçu pour que les fonds puissent être récupérés si les ordinateurs quantiques finissent par casser la cryptographie actuelle |

## FAQ

Mon ZEC a-t-il été affecté ? Non. Il n’existe aucune preuve que le bug ait jamais été utilisé, aucun impact sur les fonds des utilisateurs, et aucun changement dans l’offre totale.

Dois-je faire quelque chose ? Gardez votre wallet et votre logiciel de nœud à jour avec une version prise en charge avant le bloc d’activation. Votre wallet déplace progressivement les fonds vers Ironwood au fur et à mesure de vos dépenses, donc il n’y a rien d’urgent à faire manuellement. Suivez les indications de votre fournisseur de wallet.

Zcash est-il toujours privé ? Oui. Ironwood conserve la même confidentialité shielded qui cache l’expéditeur, le destinataire et le montant. Cette mise à niveau concerne l’intégrité de l’offre, pas la confidentialité.

Le bug a-t-il déjà été exploité ? Il n’existe aucune preuve que ce soit le cas. Il a été découvert dans le cadre de recherches en sécurité, divulgué de manière responsable, puis corrigé avant tout dommage connu.

Que devient l’ancien pool Orchard ? Il devient spend-only. Aucune nouvelle valeur ne peut y entrer, et la valeur existante passe vers Ironwood via le tourniquet, où la migration est auditée publiquement.

## Testez votre compréhension

Si les ZEC à l’intérieur des pools shielded sont cachés, comment quelqu’un peut-il confirmer que le bug d’Orchard n’a pas secrètement gonflé l’offre totale ?

<details>
<summary>Réponse</summary>

Grâce au tourniquet. Chaque pièce quittant l’ancien pool Orchard est comptée à un point de contrôle public lorsqu’elle entre dans Ironwood. Si davantage de valeur essayait de sortir que ce qui y était légitimement entré, la comptabilité ne s’équilibrerait pas ; ainsi, toute contrefaçon que le bug aurait pu créer apparaîtrait à ce passage.
</details>

### Ressources

[ZIP 258 : Déploiement de la mise à niveau réseau NU6.3](https://zips.z.cash/zip-0258)

[ZIP 257 : Déploiement de la mitigation temporaire de la vulnérabilité d’Orchard et de la mise à niveau réseau NU6.2](https://zips.z.cash/zip-0257)

[ZIP 2005 : Récupérabilité quantique d’Ironwood](https://zips.z.cash/zip-2005)

[Ironwood : un nouveau pool shielded pour Zcash](https://zodl.com/ironwood-a-new-shielded-pool-for-zcash/)

### Voir aussi

[Mises à niveau du réseau Zcash](../start-here/network-upgrades)

[Pools Shielded](../using-zcash/shielded-pools)

[Halo](../zcash-tech/halo)

[zk-SNARKS](../zcash-tech/zk-snarks)

[Sécurité post-quantique](../zcash-tech/post-quantum-security)

[Shielded Labs](../zcash-organizations/shielded-labs)

[Qu’est-ce que ZEC et Zcash](../start-here/what-is-zec-and-zcash)

---

Série : [Index des mises à niveau du réseau](../start-here/network-upgrades) · Précédent : [NU6.2](../zcash-tech/nu6-2)
