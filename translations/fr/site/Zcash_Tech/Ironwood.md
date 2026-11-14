<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Ironwood.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Ironwood

> Ironwood a été activé sur le mainnet de Zcash au bloc 3428143 le 28 juillet 2026 UTC, et il est en service depuis.

Ce que vous allez retenir : ce que Ironwood change, pourquoi un bug touchant de l'argent caché est grave, et comment le sas comptable permet à chacun de confirmer qu'aucun ZEC n'a été contrefait.

Ironwood est une [mise à niveau du réseau](../start-here/network-upgrades) de Zcash, officiellement NU6.3, qui introduit un nouveau pool protégé du même nom. Un [pool protégé](../using-zcash/shielded-pools) est l'ensemble des fonds dont les montants et les propriétaires restent cachés grâce à une [cryptographie à divulgation nulle de connaissance](../zcash-tech/zk-snarks). Ironwood existe pour contenir et auditer un bug de solidité découvert dans le pool protégé Orchard existant, et pour donner à la communauté un moyen plus fiable de vérifier que l'offre totale de ZEC est honnête. Ses règles de consensus sont spécifiées dans la [ZIP 258](https://zips.z.cash/zip-0258).

Pourquoi c'est important. Avec de l'argent transparent comme le Bitcoin, chacun peut vérifier qu'aucune pièce n'a été contrefaite en lisant le registre public. L'argent protégé cache les montants, vous ne pouvez donc pas simplement regarder. C'est la cryptographie elle-même qui doit garantir que personne ne peut créer de l'argent en secret. Ironwood est important parce qu'un bug a été découvert dans cette garantie pour le pool Orchard. La mise à niveau comble cette faille et donne à chacun un moyen de confirmer que l'offre totale de ZEC est toujours honnête.

Vous découvrez Zcash ? Commencez par [Qu'est-ce que ZEC et Zcash](../start-here/what-is-zec-and-zcash) et [Les pools protégés](../using-zcash/shielded-pools), puis revenez ici.

![Flux de migration de valeur vers Ironwood : la valeur quitte le pool Orchard, passe par le point de contrôle du sas comptable et entre dans le nouveau pool Ironwood](/content-images/ironwood-flow-8af7a58b99.webp)

## Pourquoi Ironwood était nécessaire

Fin mai 2026, le chercheur en sécurité indépendant Taylor Hornby, lors d'un audit du protocole pour [Shielded Labs](../zcash-organizations/shielded-labs), a divulgué de manière responsable un bug de solidité dans le pool protégé Orchard. Orchard était alors le pool protégé le plus récent de Zcash, et la faille se trouvait dans une partie à courbe elliptique de son circuit à divulgation nulle de connaissance, qui utilise le système de preuve [Halo](../zcash-tech/halo) 2.

1. Un bug de solidité signifie que les mathématiques qui prouvent qu'une transaction est valide ne le garantissent pas entièrement.
2. En théorie, un attaquant aurait pu exploiter la faille pour contrefaire une valeur invalide à l'intérieur du pool Orchard et dépenser des fonds qui ne lui appartenaient pas réellement, sans laisser de trace qu'un nœud ordinaire pourrait détecter.
3. Le sas comptable de Zcash plafonnait toujours la valeur pouvant sortir de Orchard, de sorte que l'offre totale ne pouvait pas être gonflée, mais la cryptographie propre au pool ne garantissait plus que chaque pièce cachée qu'il contenait était réelle.

![Le bug expliqué : une transaction reçoit 5 ZEC en entrée, mais la preuve défectueuse est quand même acceptée lorsque 7 ZEC en sortent, créant 2 ZEC à partir de rien](/content-images/ironwood-bug-8f689d6f61.webp)

Les chiffres ci-dessus sont une représentation simplifiée. La véritable faille se trouvait dans un élément précis des mathématiques du circuit, et non dans un décompte littéral des pièces entrantes et sortantes. Ce qu'il faut retenir, c'est seulement qu'un bug de solidité peut permettre de créer de la valeur à l'intérieur du pool sans être détecté.

Il est important de noter qu'il n'existe aucune preuve que le bug ait jamais été exploité, aucune preuve d'impact sur les fonds des utilisateurs, et aucune preuve que l'offre totale de ZEC ait changé. Il a été découvert grâce à la recherche en sécurité et corrigé avant tout dommage connu.

## La réponse

La communauté Zcash a déployé les correctifs par étapes plutôt qu'en une seule fois.

![Chronologie de la réponse Ironwood : le bug d'Orchard est découvert en mai 2026, le pool est suspendu en juin 2026, le circuit est corrigé dans NU6.2, et Ironwood est activé au bloc 3,428,143 le 28 juillet 2026](/content-images/ironwood-timeline-36243f0cd7.webp)

1. Début juin 2026, une mesure temporaire a désactivé le pool Orchard pendant la préparation d'un correctif complet.
2. La mise à niveau NU6.2 a corrigé le circuit Orchard lui-même, refermant la vulnérabilité de solidité sous-jacente.
3. La mise à niveau NU6.3, Ironwood, introduit un nouveau pool protégé et un point de contrôle public afin que la valeur puisse sortir de l'ancien pool Orchard sous audit complet.

![Le correctif de NU6.2 : la preuve corrigée exige que les entrées soient égales aux sorties, de sorte qu'une sortie valide de 5 ZEC est acceptée tandis qu'une tentative de sortie de 7 ZEC est rejetée](/content-images/ironwood-fix-bb4f70ddc9.webp)

## Ce que fait le pool Ironwood

NU6.2 a sécurisé le circuit Orchard pour toutes les nouvelles transactions, mais la valeur créée sous les anciennes règles se trouve toujours dans le pool Orchard. Ironwood offre à cette valeur une destination saine et un moyen de l'auditer lors de son déplacement.

Le pool Ironwood est le pool de valeur protégé créé par NU6.3 au bloc 3428143. Il repose sur le circuit corrigé et utilise un format de note récupérable face au quantique (une conception qui permet de récupérer les fonds si les [ordinateurs quantiques](../zcash-tech/post-quantum-security) venaient un jour à casser la cryptographie actuelle), défini dans la [ZIP 2005](https://zips.z.cash/zip-2005).

1. Après l'activation, l'ancien pool Orchard devient « dépense uniquement », de sorte qu'aucune nouvelle valeur ne peut y entrer.
2. La valeur nouvellement protégée afflue désormais vers Ironwood.
3. À l'intérieur de Ironwood, les ZEC protégés conservent la confidentialité qui cache l'expéditeur, le destinataire et le montant. Le transfert de ZEC de Orchard vers Ironwood révèle le montant transféré.

## Le sas comptable

L'idée clé de Ironwood est le sas comptable, un point de contrôle comptable que chaque pièce doit franchir lorsqu'elle passe de l'ancien pool Orchard à Ironwood.

> Un sas comptable fait pour l'argent caché ce qu'une porte vitrée fait pour un coffre-fort de banque. Vous ne pouvez toujours pas voir à l'intérieur, mais vous pouvez compter exactement ce qui entre et ce qui sort.

1. Les fonds qui quittent Orchard sont comptés à un point de vérification public avant d'entrer dans Ironwood.
2. Cela permet à chacun d'auditer la quantité de ZEC qui migre, renforçant la confiance dans l'offre réellement en circulation.
3. Si des ZEC contrefaits avaient été créés au moyen du bug antérieur, c'est dans cette comptabilité de migration qu'ils apparaîtraient.

Les sas comptables ne sont pas nouveaux pour Zcash. Le réseau les a déjà utilisés aux frontières entre les pools Sprout, Sapling et Orchard, afin que la valeur circulant entre les pools reste auditable et qu'aucun pool ne puisse libérer plus que ce qui y est légitimement entré.

Les règles de consensus maintiennent chaque pool de valeur, y compris Ironwood, dans la limite monétaire maximale du réseau, de sorte que les soldes des pools ne peuvent jamais devenir négatifs.

## Ce que les utilisateurs doivent faire

Les portefeuilles et les logiciels de nœud gèrent l'essentiel automatiquement, mais le changement pratique est simple : au fil du temps, transférez vos avoirs protégés de l'ancien pool Orchard vers le pool Ironwood en passant par le sas comptable. Chaque transfert révèle son montant sur la blockchain ; les portefeuilles qui suivent la [ZIP 318](https://zips.z.cash/zip-0318) le divisent donc en montants standard et les envoient progressivement. Suivez les recommandations du fournisseur de votre portefeuille et maintenez votre logiciel sur une version prise en charge.

## Glossaire

| Terme | Signification en langage simple |
|---|---|
| Shielded pool | L'ensemble des fonds dont les montants et les propriétaires sont cachés grâce à une cryptographie à divulgation nulle de connaissance |
| Soundness bug | Une faille qui permet à une transaction invalide de passer la vérification de preuve comme si elle était valide |
| Turnstile | Un point de contrôle public qui compte la valeur circulant entre les pools afin que l'offre reste auditable |
| Spend-only | Un pool depuis lequel vous pouvez dépenser, mais auquel vous ne pouvez pas ajouter de nouvelle valeur |
| Network upgrade (NU) | Une modification coordonnée des règles de consensus de Zcash, activée à une hauteur de bloc définie |
| Quantum-recoverable note | Un format de note conçu pour que les fonds puissent être récupérés si les ordinateurs quantiques venaient un jour à casser la cryptographie actuelle |

## FAQ

Mes ZEC ont-ils été affectés ? Non. Il n'existe aucune preuve que le bug ait jamais été utilisé, aucun impact sur les fonds des utilisateurs et aucune modification de l'offre totale.

Dois-je faire quelque chose ? Maintenez votre portefeuille et votre logiciel de nœud sur une version prise en charge. Dépenser des fonds Orchard les transfère vers Ironwood, et le montant qui traverse est public. Certains portefeuilles proposent une migration qui envoie des montants standard au fil du temps, ce qui rend votre solde plus difficile à relier. Suivez les recommandations du fournisseur de votre portefeuille.

Zcash est-il toujours confidentiel ? Oui. Les paiements à l'intérieur de Ironwood cachent l'expéditeur, le destinataire et le montant, comme le faisaient les paiements Orchard. Le montant qui circule entre les pools, par exemple de Orchard vers Ironwood, est public. Cette mise à niveau concerne l'intégrité de l'offre.

Le bug a-t-il déjà été exploité ? Rien ne prouve qu'il l'ait été. Il a été découvert grâce à la recherche en sécurité, divulgué de manière responsable et corrigé avant tout dommage connu.

Qu'advient-il de l'ancien pool Orchard ? Il devient « dépense uniquement ». Aucune nouvelle valeur ne peut y entrer, et la valeur existante est transférée vers Ironwood en passant par le sas comptable, où la migration est auditée publiquement.

## Testez vos connaissances

Si les ZEC à l'intérieur des pools protégés sont cachés, comment peut-on confirmer que le bug de Orchard n'a pas secrètement gonflé l'offre totale ?

<details>
<summary>Réponse</summary>

Grâce au sas comptable. Chaque pièce qui quitte l'ancien pool Orchard est comptée à un point de contrôle public lorsqu'elle entre dans Ironwood. Si une valeur supérieure à celle légitimement entrée tentait de sortir, la comptabilité ne serait pas équilibrée ; toute contrefaçon que le bug aurait pu créer apparaîtrait donc à ce point de passage.
</details>

### Ressources

[ZIP 258 : Déploiement de la mise à niveau du réseau NU6.3](https://zips.z.cash/zip-0258)

[ZIP 257 : Déploiement de l'atténuation temporaire de la vulnérabilité Orchard et de la mise à niveau du réseau NU6.2](https://zips.z.cash/zip-0257)

[ZIP 2005 : Récupérabilité quantique de Ironwood](https://zips.z.cash/zip-2005)

[ZIP 229 : Format de transaction version 6](https://zips.z.cash/zip-0229)

[ZIP 318 : Migration de Orchard vers Ironwood](https://zips.z.cash/zip-0318)

[Ironwood : un nouveau pool protégé pour Zcash](https://zodl.com/ironwood-a-new-shielded-pool-for-zcash/)

### Voir aussi

[Mises à niveau du réseau Zcash](../start-here/network-upgrades)

[Les pools protégés](../using-zcash/shielded-pools)

[Halo](../zcash-tech/halo)

[zk-SNARKs](../zcash-tech/zk-snarks)

[Sécurité post-quantique](../zcash-tech/post-quantum-security)

[Shielded Labs](../zcash-organizations/shielded-labs)

[Qu'est-ce que ZEC et Zcash](../start-here/what-is-zec-and-zcash)

---

Série : [Index des mises à niveau du réseau](../start-here/network-upgrades) · Précédent : [NU6.2](../zcash-tech/nu6-2) · Suivant : [NU7](../zcash-tech/nu7)
