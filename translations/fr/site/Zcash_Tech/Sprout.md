<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Sprout.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifier la page"/>
</a>

# Sprout

> Zcash a été lancé le 28 octobre 2016 avec le pool protégé Sprout.

Ce que vous retiendrez : Sprout est le point de départ de Zcash, la première fois qu’une monnaie privée et vérifiable a fonctionné sur une blockchain en production.

Sprout correspond au lancement initial du réseau Zcash, et non à une [mise à niveau du réseau](../start-here/network-upgrades) ultérieure. Il a été activé au bloc genesis le 28 octobre 2016. Aucun ZIP numéroté ne définit Sprout : le processus ZIP a commencé plus tard avec Overwinter, donc Sprout est décrit par la spécification originale du protocole Zcash et par la construction Zerocash sur laquelle il a été bâti. L’[Electric Coin Company](../zcash-organizations/electric-coin-company) (alors appelée Zerocoin Electric Coin Company), dirigée par Zooko Wilcox, l’a conçu et déployé. Sprout a introduit les premières transactions protégées zk-SNARK réellement pratiques ainsi que le pool protégé d’origine, permettant d’envoyer des ZEC avec l’expéditeur, le destinataire et le montant cachés, tout en laissant le réseau vérifier que les soldes s’équilibrent. Son nom évoquait une jeune chaîne en train de germer, que l’équipe pensait voir grandir.

Pourquoi c’est important. Avant Sprout, toutes les blockchains publiques exposaient vos paiements : n’importe qui pouvait voir qui payait qui, et combien. Sprout a été le premier réseau en production, sans permission, à masquer ces informations tout en prouvant qu’aucune fraude n’avait lieu. Cela compte pour la confidentialité financière ordinaire, celle que l’on attend de l’argent liquide ou d’un relevé bancaire que personne d’autre ne peut lire. Cela a aussi prouvé qu’une forte confidentialité on-chain pouvait fonctionner en pratique, au-delà d’un simple concept théorique. La Ceremony de trusted setup qui l’a rendu possible est devenue une référence pour les travaux cryptographiques ultérieurs, et le système de génération de preuves lent et gourmand en mémoire livré avec Sprout est précisément ce qui a poussé l’équipe à construire Sapling deux ans plus tard.

## Premier pool protégé

Sprout a créé deux types d’adresses. Les adresses transparentes (t-addresses) fonctionnent comme dans Bitcoin, avec des détails visibles sur le registre public. Les adresses protégées (z-addresses) envoient les fonds dans le [pool protégé](../using-zcash/shielded-pools) Sprout, où l’expéditeur, le destinataire et le montant restent cachés. L’astuce repose sur les [zk-SNARKs](../zcash-tech/zk-snarks), des preuves à divulgation nulle de connaissance qui permettent à une transaction de montrer qu’elle est valide, sans double dépense et avec des soldes qui s’équilibrent, sans révéler aucun détail. Sprout a été la première fois que cela fonctionnait en production sur une cryptomonnaie en direct.

![Les transactions transparentes exposent l’expéditeur, le destinataire et le montant, tandis que les transactions protégées Sprout masquent les trois tout en restant vérifiables](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/sprout-shielded-vs-transparent.png)

## La Ceremony

Les zk-SNARKs de Sprout nécessitaient un ensemble de paramètres publics, et leur génération en toute sécurité demandait une configuration unique appelée la Ceremony. Six participants, dans des lieux séparés et éloignés, ont chacun généré une pièce secrète, appelée toxic waste. Si quelqu’un avait un jour réassemblé toutes les pièces, il aurait pu créer des ZEC à partir de rien. Le design a transformé ce risque en une règle simple : tant qu’au moins un participant détruisait sa pièce, le secret complet ne pouvait jamais être reconstitué, et la contrefaçon restait impossible. Les participants dont le nom a été rendu public incluent Zooko Wilcox, Andrew Miller, Peter Van Valkenburgh, Peter Todd et Derek Hinch de NCC Group. Un participant a choisi de rester anonyme.

![La Ceremony : six participants génèrent des fragments privés, puis détruisent le toxic waste, ne laissant que les paramètres publics de Sprout](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/sprout-ceremony-flow.png)

## L’origine

Sprout est la base sur laquelle repose chaque évolution ultérieure. Lorsque le mécanisme de mise à niveau du réseau est arrivé avec Overwinter, il a attribué aux règles d’origine l’identifiant de branche de consensus 0, ce qui signifie simplement qu’aucune mise à niveau n’a encore été appliquée. Tout ce qui a suivi (Overwinter, Sapling, Blossom, Heartwood, Canopy, NU5, NU6, et la suite) repose sur la chaîne lancée par Sprout. Le lancement a été annoncé en août 2016 pour une genèse au 28 octobre, la Ceremony s’est déroulée dans les semaines précédentes, et l’horodatage codé en dur du bloc genesis indique le 28 octobre 2016 à 07:56 UTC.

![Chronologie allant de l’annonce d’août 2016 à la Ceremony des paramètres jusqu’au lancement de Sprout le 28 octobre 2016](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/sprout-timeline.png)

## Glossaire

| Terme | Signification en langage simple |
|---|---|
| zk-SNARK | Une preuve à divulgation nulle de connaissance qui montre qu’une transaction est valide sans révéler l’expéditeur, le destinataire ni le montant |
| Pool protégé | La partie privée de Zcash où les montants et les parties sont cachés. Le pool Sprout était le premier |
| z-address et t-address | Une z-address est protégée et garde les détails privés. Une t-address est transparente et affiche les détails sur le registre public |
| La Ceremony | La configuration multipartite de 2016 qui a généré les paramètres publics de Sprout puis éliminé le toxic waste |
| Toxic waste | Les fragments de clé secrète issus de la Ceremony qui devaient être détruits pour empêcher la création frauduleuse de ZEC |
| Identifiant de branche de consensus 0 | L’étiquette des règles de Sprout, c’est-à-dire la base avant toute mise à niveau du réseau |

## FAQ

Sprout modifie-t-il mes ZEC ou ma confidentialité aujourd’hui ? Non. Sprout appartient à l’histoire, c’est le lancement qui a démarré la chaîne sur laquelle vos ZEC existent. Vos pièces et votre confidentialité aujourd’hui dépendent du wallet et du pool protégé que vous utilisez maintenant, pas d’une action à entreprendre au sujet de Sprout.

Pourquoi n’y a-t-il pas de numéro ZIP pour Sprout ? Le processus ZIP a commencé plus tard, avec la mise à niveau Overwinter. Sprout est le lancement d’origine, décrit par la spécification du protocole Zcash et par la construction Zerocash sur laquelle il reposait. ZIP 200 ne mentionne Sprout qu’a posteriori, comme l’identifiant de branche de consensus 0, la base avant toute mise à niveau.

Devais-je faire confiance aux six personnes de la Ceremony ? La configuration a été conçue de sorte qu’il suffisait qu’une seule d’entre elles soit honnête. Chacune détenait un fragment secret, et tant qu’un seul participant détruisait le sien, le secret complet ne pouvait jamais être reconstitué et personne ne pouvait créer frauduleusement des ZEC. Cinq participants ont été nommés publiquement et l’un est resté anonyme.

Le pool Sprout est-il celui que mon wallet utilise aujourd’hui ? Probablement pas. Sprout était le premier pool protégé, mais des mises à niveau ultérieures comme Sapling ont introduit un design protégé plus rapide, et la plupart des wallets utilisent aujourd’hui des pools plus récents. Sprout reste important comme démonstration que des transactions privées et vérifiables pouvaient fonctionner sur un réseau en production.

Qu’est-ce qui rendait Sprout différent de Bitcoin ? Bitcoin place chaque paiement sur un registre public où les montants et les adresses sont visibles. Sprout a ajouté des transactions protégées qui masquent l’expéditeur, le destinataire et le montant tout en permettant au réseau de confirmer que la transaction est valide. Il a aussi conservé les adresses transparentes, de sorte que les deux styles coexistent sur la même chaîne.

## Testez votre compréhension

Sprout est souvent présenté comme une mise à niveau du réseau avec une hauteur d’activation. Pourquoi est-ce inexact ?

<details>
<summary>Réponse</summary>

Sprout est le lancement d’origine de Zcash, et non une mise à niveau ultérieure. Il est actif depuis le bloc genesis (bloc 0) le 28 octobre 2016, il n’existe donc pas de hauteur d’activation à indiquer. Le mécanisme de mise à niveau du réseau est venu plus tard et a désigné les règles de Sprout comme l’identifiant de branche de consensus 0, la base avant toute mise à niveau.
</details>

### Ressources

[ZIP 200 : mécanisme de mise à niveau du réseau](https://zips.z.cash/zip-0200)

[Mises à niveau du réseau Zcash](https://z.cash/upgrade/)

[Electric Coin Company : lancement de Zcash Sprout](https://electriccoin.co/blog/zcash-sprout-launch/)

[Electric Coin Company : conception de la Ceremony](https://electriccoin.co/blog/the-design-of-the-ceremony/)

### Voir aussi

[Pools protégés](../using-zcash/shielded-pools)

[zk-SNARKS](../zcash-tech/zk-snarks)

[Mises à niveau du réseau Zcash](../start-here/network-upgrades)

[Qu’est-ce que ZEC et Zcash](../start-here/what-is-zec-and-zcash)

[Electric Coin Company](../zcash-organizations/electric-coin-company)

---

Série : [Index des mises à niveau du réseau](../start-here/network-upgrades) · Suivant : [Overwinter](../zcash-tech/overwinter)
