<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Sprout.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Sprout

> Zcash a été lancé le 28 octobre 2016, avec le pool protégé Sprout.

> **Avertissement :** NU7 a été activé sur le réseau principal à la hauteur 3 543 405 le 6 novembre 2026 (UTC ; voir [ZIP 259](https://zips.z.cash/zip-0259)). Depuis, les ZEC encore présents dans le pool Sprout ne peuvent plus être dépensés, car les transactions de version 4 ne sont plus valides (ZIP 2003). Pour en savoir plus sur les options de récupération, lisez [Récupérer des fonds](../using-zcash/recovering-funds).

Ce que vous retiendrez : Sprout marque le début de Zcash, la première fois qu'une monnaie privée et vérifiable a fonctionné sur une blockchain en production.

Sprout est le lancement initial du réseau Zcash, et non une [mise à niveau du réseau](../start-here/network-upgrades) ultérieure. Il a été mis en service avec le bloc de genèse le 28 octobre 2016. Aucun ZIP numéroté ne définit Sprout : le processus ZIP a commencé plus tard avec Overwinter, si bien que Sprout est décrit par la spécification initiale du protocole Zcash et par la construction Zerocash sur laquelle il repose. L'[Electric Coin Company](../zcash-organizations/electric-coin-company) (alors appelée Zerocoin Electric Coin Company), dirigée par Zooko Wilcox, l'a conçu et livré. Sprout a introduit les premières transactions protégées zk-SNARK utilisables en pratique ainsi que le pool protégé d'origine, permettant ainsi d'envoyer des ZEC en masquant l'expéditeur, le destinataire et le montant, tout en laissant le réseau vérifier que les soldes concordaient. Le nom évoquait une chaîne jeune et en plein essor, que l'équipe s'attendait à voir grandir.

Pourquoi c'est important. Avant Sprout, chaque blockchain publique exposait vos paiements : n'importe qui pouvait voir qui avait payé qui, et combien. Sprout a été le premier réseau sans permission en production à masquer ces informations tout en prouvant que personne ne trichait. Cela compte pour la confidentialité financière ordinaire, celle que vous attendez de l'argent liquide ou d'un relevé bancaire que personne d'autre ne peut lire. Cela a aussi démontré qu'une confidentialité on-chain forte pouvait fonctionner en pratique, au-delà d'un concept sur papier. La cérémonie de configuration de confiance qui l'a rendu possible est devenue une référence pour les travaux cryptographiques ultérieurs, et le système de preuve lent et gourmand en mémoire avec lequel Sprout a été livré est précisément ce qui a poussé l'équipe à développer Sapling deux ans plus tard.

## Premier pool protégé

Sprout a créé deux types d'adresses. Les adresses transparentes (t-addresses) fonctionnent comme celles de Bitcoin, avec des informations visibles sur le registre public. Les adresses protégées (z-addresses) envoient les fonds dans le [pool protégé](../using-zcash/shielded-pools) Sprout, où l'expéditeur, le destinataire et le montant restent masqués. Le secret réside dans les [zk-SNARKs](../zcash-tech/zk-snarks), des preuves à divulgation nulle de connaissance qui permettent à une transaction de démontrer sa validité, sans double dépense et avec des soldes qui concordent, sans révéler aucune de ces informations. Sprout a été la première mise en production de ce mécanisme sur une cryptomonnaie en service.

![Les transactions transparentes exposent l'expéditeur, le destinataire et le montant, tandis que les transactions protégées Sprout masquent ces trois éléments tout en restant vérifiables](/content-images/sprout-shielded-vs-transparent-61d3b1980c.webp)

## La cérémonie

Les zk-SNARKs de Sprout nécessitaient un ensemble de paramètres publics, et leur génération sécurisée exigeait une configuration unique appelée la cérémonie. Six participants, situés dans des lieux distincts et éloignés, ont chacun généré un fragment secret, appelé déchet toxique. Si quelqu'un parvenait un jour à réassembler tous les fragments, il pourrait créer des ZEC à partir de rien. La conception a transformé ce risque en une règle simple : tant qu'au moins un participant détruisait son fragment, le secret complet ne pourrait jamais être reconstitué, et la contrefaçon restait donc impossible. Parmi les participants nommés publiquement figurent Zooko Wilcox, Andrew Miller, Peter Van Valkenburgh, Peter Todd et Derek Hinch de NCC Group. Un participant a choisi de rester anonyme.

![La Cérémonie : six participants génèrent des fragments privés, puis détruisent les déchets toxiques, ne laissant que les paramètres publics de Sprout](/content-images/sprout-ceremony-flow-ae16f6282a.webp)

## L'origine

Sprout constitue la base sur laquelle repose chaque modification ultérieure. Lorsque le mécanisme de mise à niveau du réseau est arrivé avec Overwinter, il a désigné les règles d'origine par l'identifiant de branche de consensus 0, ce qui signifie simplement qu'aucune mise à niveau n'a encore été appliquée. Tout ce qui a suivi (Overwinter, Sapling, Blossom, Heartwood, Canopy, NU5, NU6 et les suivantes) repose sur la chaîne lancée par Sprout. Le lancement a été annoncé en août 2016 pour une genèse le 28 octobre, la cérémonie s'est déroulée dans les semaines précédentes, et l'horodatage codé en dur du bloc de genèse indique le 28 octobre 2016 à 07:56 UTC.

![Chronologie de l'annonce d'août 2016 au lancement de Sprout le 28 octobre 2016, en passant par la Cérémonie des paramètres](/content-images/sprout-timeline-348766352a.webp)

## Glossaire

| Terme | Signification en langage courant |
|---|---|
| zk-SNARK | Une preuve à divulgation nulle de connaissance qui démontre qu'une transaction est valide sans révéler l'expéditeur, le destinataire ni le montant |
| Shielded pool | La partie privée de Zcash, où les montants et les parties sont masqués. Le pool Sprout a été le premier |
| z-address and t-address | Une z-address est protégée et préserve la confidentialité des informations. Une t-address est transparente et affiche les informations sur le registre public |
| The Ceremony | La configuration multipartite de 2016 qui a généré les paramètres publics de Sprout, puis éliminé les déchets toxiques |
| Toxic waste | Les fragments de clé secrète issus de la cérémonie qui devaient être détruits afin que les ZEC ne puissent pas être contrefaits |
| Consensus branch id 0 | La désignation des règles de Sprout, c'est-à-dire la base avant toute mise à niveau du réseau |

## FAQ

Sprout change-t-il aujourd'hui mes ZEC ou ma confidentialité ? Non. Sprout appartient à l'histoire : c'est le lancement qui a donné naissance à la chaîne sur laquelle vivent vos ZEC. Vos pièces et votre confidentialité dépendent aujourd'hui du portefeuille et du pool protégé que vous utilisez actuellement, et non d'une quelconque action de votre part concernant Sprout.

Pourquoi n'y a-t-il pas de numéro de ZIP pour Sprout ? Le processus ZIP a commencé plus tard, avec la mise à niveau Overwinter. Sprout est le lancement initial, décrit par la spécification du protocole Zcash et par la construction Zerocash sur laquelle il reposait. Le ZIP 200 ne mentionne Sprout qu'a posteriori, en tant qu'identifiant de branche de consensus 0, la base avant toute mise à niveau.

Fallait-il faire confiance aux six personnes de la cérémonie ? La configuration a été conçue pour qu'il suffise qu'une seule d'entre elles soit honnête. Chacune détenait un fragment secret, et tant qu'un seul participant détruisait le sien, le secret complet ne pouvait jamais être reconstitué et personne ne pouvait contrefaire de ZEC. Cinq participants ont été nommés publiquement et un est resté anonyme.

Le pool Sprout est-il celui qu'utilise mon portefeuille aujourd'hui ? Probablement pas. Sprout a été le premier pool protégé, mais des mises à niveau ultérieures comme Sapling ont introduit une conception protégée plus rapide, et la plupart des portefeuilles utilisent aujourd'hui des pools plus récents. Sprout reste important en tant que travail qui a prouvé que des transactions privées et vérifiables pouvaient fonctionner sur un réseau en production.

Qu'est-ce qui distinguait Sprout de Bitcoin ? Bitcoin inscrit chaque paiement sur un registre public où les montants et les adresses sont visibles. Sprout a ajouté des transactions protégées qui masquent l'expéditeur, le destinataire et le montant tout en permettant au réseau de confirmer la validité de la transaction. Il a également conservé les adresses transparentes, si bien que les deux modes coexistent sur la même chaîne.

## Testez vos connaissances

Sprout est souvent présenté comme une mise à niveau du réseau dotée d'une hauteur d'activation. Pourquoi n'est-ce pas tout à fait exact ?

<details>
<summary>Réponse</summary>

Sprout est le lancement initial de Zcash, et non une mise à niveau ultérieure. Il est actif depuis le bloc de genèse (bloc 0) du 28 octobre 2016 : il n'existe donc aucune hauteur d'activation à indiquer. Le mécanisme de mise à niveau du réseau est arrivé plus tard et a désigné les règles de Sprout par l'identifiant de branche de consensus 0, la base avant toute mise à niveau.
</details>

### Ressources

[ZIP 200 : mécanisme de mise à niveau du réseau](https://zips.z.cash/zip-0200)

[Mises à niveau du réseau Zcash](https://z.cash/upgrade/)

[Electric Coin Company : lancement de Zcash Sprout](https://electriccoin.co/blog/zcash-sprout-launch/)

[Electric Coin Company : la conception de la cérémonie](https://electriccoin.co/blog/the-design-of-the-ceremony/)

### Voir aussi

[Pools protégés](../using-zcash/shielded-pools)

[zk-SNARKs](../zcash-tech/zk-snarks)

[Mises à niveau du réseau Zcash](../start-here/network-upgrades)

[Que sont ZEC et Zcash](../start-here/what-is-zec-and-zcash)

[Electric Coin Company](../zcash-organizations/electric-coin-company)

---

Série : [Index des mises à niveau du réseau](../start-here/network-upgrades) · Suivant : [Overwinter](../zcash-tech/overwinter)
