<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Project_Tachyon.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Projet Tachyon

## En bref

- Tachyon est une refonte proposée de la manière dont les portefeuilles Zcash trouvent et dépensent les fonds protégés, destinée à permettre au réseau d’accueillir un très grand nombre d’utilisateurs
- Aujourd’hui, un portefeuille doit tenter de déchiffrer une part énorme de la blockchain pour découvrir quels paiements lui appartiennent, et c’est la principale raison pour laquelle la synchronisation protégée paraît lente
- Tachyon remplace ce mécanisme par la **synchronisation oblivieuse**, afin qu’un portefeuille récupère ce dont il a besoin sans tout parcourir et sans indiquer à un serveur quelles parties il voulait
- Il déplace également les détails de paiement hors de la blockchain pour les placer dans la demande de paiement elle-même, ce qui simplifie le protocole mais transfère des responsabilités aux portefeuilles
- Il s’agit d’une proposition, publiée pour la première fois en avril 2025. Elle **ne fait pas partie de NU7** et **n’est pas déployée**, et elle nécessite un effort d’ingénierie comparable à celui de la mise à niveau Sapling

<br/>

## À qui s’adresse cette page

- À toute personne ayant observé la synchronisation d’un portefeuille protégé en se demandant pourquoi elle prend autant de temps
- Aux nouveaux venus qui voient sans cesse Tachyon mentionné à côté de NU7 et de la mise à l’échelle de Zcash
- Aux lecteurs qui veulent d’abord comprendre l’idée, puis la cryptographie

<br/>

## Le problème que résout Tachyon

Zcash cache le destinataire d’un paiement. C’est tout l’intérêt, et cela crée un problème délicat : si personne ne peut savoir à qui appartient un paiement, comment votre propre portefeuille trouve-t-il les vôtres ?

Avec Bitcoin, c’est facile. Les adresses sont publiques, donc un portefeuille peut demander à un serveur « qu’est-ce qui a été envoyé à cette adresse ? » et obtenir une réponse. Un portefeuille Zcash ne peut pas poser cette question, car la poser révélerait précisément ce que le pool protégé est conçu pour cacher.

Zcash procède donc autrement. L’expéditeur chiffre les détails du paiement et les glisse dans la transaction elle-même. Votre portefeuille parcourt ensuite les transactions de la chaîne et tente de déchiffrer chacune d’elles. Presque toutes les tentatives échouent. Les rares qui réussissent correspondent à vos paiements. C’est ce qu’on appelle le **déchiffrement par essai**, et il est confidentiel, correct et lent.

![Aujourd'hui, un portefeuille Zcash télécharge chaque transaction protégée et tente de la déchiffrer, presque toutes les tentatives échouant, afin de trouver les quelques paiements qui lui appartiennent](/content-images/tachyon-scanning-today.svg)

Le problème tient à ce dont dépend ce travail. L’effort fourni par votre portefeuille est déterminé par la taille de la chaîne, et non par le nombre de paiements que vous avez réellement reçus. Une personne qui n’a jamais reçu le moindre paiement fournit presque autant de travail qu’une personne qui en reçoit chaque jour. À mesure que Zcash grandit, la situation empire pour tout le monde. Selon les termes de la proposition, cela « ne passe tout simplement pas à l’échelle ».

<br/>

## Ce que change Tachyon

Tachyon s’attaque au problème à la racine : il cesse d’utiliser la blockchain comme canal de transmission des secrets de paiement.

À la place, les détails dont vous avez besoin voyagent avec la demande de paiement elle-même, hors bande. Une demande de paiement, une URI ou un code QR transporte les informations qui étaient auparavant chiffrées dans la transaction. Sean Bowe présente cela comme l’adoption, pour la première fois dans un protocole protégé Zcash, des **paiements hors bande**.

Dès lors que la chaîne ne transporte plus ces informations, votre portefeuille n’a plus de raison de la parcourir, et le problème du déchiffrement par essai disparaît.

Votre portefeuille doit néanmoins connaître l’état actuel de la chaîne pour pouvoir dépenser. C’est la seconde moitié de la conception, la **synchronisation oblivieuse** : un moyen pour un portefeuille de récupérer les éléments précis dont il a besoin sans révéler au serveur lesquels il a demandés.

![Avec Tachyon, l'expéditeur transmet les détails du paiement au destinataire hors bande, et le portefeuille utilise la synchronisation oblivieuse pour ne récupérer que les données dont il a besoin au lieu d'analyser toute la chaîne](/content-images/tachyon-oblivious-sync.svg)

<br/>

## Ce que cela signifierait pour les utilisateurs d’un portefeuille

- **La synchronisation cesse de croître avec la chaîne.** Le temps que votre portefeuille passe à se mettre à jour dépendrait de votre propre activité plutôt que de la taille de Zcash.
- **Les paiements ressemblent davantage à la remise d’une facture.** La demande de paiement contient ce dont le destinataire a besoin, si bien que l’échange entre l’expéditeur et le destinataire compte davantage qu’aujourd’hui.
- **Les portefeuilles portent davantage de responsabilités.** Comme la chaîne ne conserve plus de copie chiffrée de vos détails de paiement, la perte des données de votre portefeuille devient plus grave. La sauvegarde et la récupération cessent d’être une fonctionnalité du protocole pour devenir quelque chose que les logiciels de portefeuille doivent bien gérer.
- **Certains éléments familiers sont déplacés ou disparaissent.** Tachyon retire du protocole de base la diversification des clés, les clés pour lecture seule et les adresses de paiement, et les confie à la couche portefeuille. C’est l’un des aspects les plus lourds de conséquences de la proposition, et il est encore à l’étude.

<br/>

## Un regard plus approfondi pour les lecteurs techniques

Tachyon est présenté comme une modification rétrocompatible du protocole Orchard. Il pourrait être déployé soit comme une mise à niveau du pool Orchard existant, soit comme un pool protégé distinct accessible via un [sas comptable](https://zechub.wiki/zcash-tech/the-turnstile), le même mécanisme que Zcash a utilisé pour Ironwood. Ce choix concerne le déploiement, pas la conception.

Il conserve plusieurs éléments de Orchard : la re-randomisation des clés RedPallas, les engagements de valeur homomorphes et les signatures de liaison, ainsi que la structure de clés partitionnée qui permet à un appareil de déléguer la génération des preuves sans céder l’autorité de dépense.

Le travail de mise à l’échelle repose sur les **données porteuses de preuve**, une technique dans laquelle les données voyagent accompagnées d’une preuve de leur propre exactitude, de sorte que leur combinaison avec d’autres données porteuses de preuve produit un résultat qui hérite de ces preuves et les étend. C’est ce qui permet de compresser une grande quantité de travail vérifié en quelque chose de petit et de rapide à vérifier. Halo, découvert par l’équipe à l’origine de Zcash, est ce qui a rendu les données porteuses de preuve suffisamment pratiques pour servir de fondation.

Le troisième volet concerne les **agrégats de transactions protégées**, qui modifient la manière dont les changements d’état protégés sont communiqués et ont des répercussions sur le fonctionnement des signatures.

<br/>

## Où en sont les travaux

Tachyon est une **proposition, et non une fonctionnalité déployée**. Elle a été publiée en avril 2025, et un article de suivi publié en mai 2025 en a examiné les implications pour le consensus. Elle a été citée comme candidate pour NU7, la mise à niveau suivant Ironwood, mais le périmètre de NU7 convenu le 17 septembre 2026 ne l’inclut pas : la [ZIP 259](https://zips.z.cash/zip-0259) énumère ce que NU7 déploie, et l’[annonce sur le forum](https://forum.zcashcommunity.com/t/nu7-timeline/57655) indique qu’aucun nouveau format de transaction n’y figure. Aucune date d’activation n’a été fixée pour Tachyon.

Selon l’auteur lui-même, il s’agit d’un plan concret plutôt que de recherche spéculative, mais d’un plan qui nécessite un effort d’ingénierie comparable à Sapling, certaines questions plus difficiles étant délibérément laissées pour plus tard.

Des travaux connexes sont déjà visibles. [Zakura](https://zechub.wiki/zcash-tech/zakura-node), un nœud complet publié en juillet 2026, est le fruit d’un effort conjoint entre le projet Tachyon et Valar Group, et préfigure certains de ces changements au niveau du réseau. Les recherches sur la [récupération d’informations privée](https://zechub.wiki/zcash-tech/private-information-retrieval) s’attaquent au même goulet d’étranglement de l’analyse sous un autre angle.

<br/>

## Idées reçues courantes

- **Tachyon n’est pas en service.** Aucun portefeuille ne l’utilise aujourd’hui, et aucune mise à niveau ne l’a activé.
- **Tachyon n’est pas la même chose que Ironwood.** Ironwood a été activé en juillet 2026 et concernait le pool Orchard et le sas comptable. Tachyon est une proposition distincte et ultérieure portant sur la mise à l’échelle.
- **Tachyon ne réduit pas la confidentialité.** L’objectif est de préserver l’indiscernabilité du registre tout en supprimant le coût de la mise à l’échelle, et non de sacrifier la confidentialité au profit de la vitesse.
- **La vérification des zk-SNARK n’a jamais été le goulet d’étranglement.** La proposition indique clairement que la partie lente réside dans la manière dont les portefeuilles découvrent et coordonnent l’état, et non dans le coût de vérification des preuves.
- **Tachyon ne fait pas partie de NU7.** Il a un temps été cité comme candidat, mais le périmètre convenu en septembre 2026 couvre les blocs de 25 secondes, le recyclage des frais et la fin des transactions de version 4, sans nouveau format de transaction ([ZIP 259](https://zips.z.cash/zip-0259)).

<br/>

## Glossaire

| Terme | Signification |
|---|---|
| Trial decryption | Tenter de déchiffrer les transactions une par une pour trouver celles qui vous sont destinées |
| In-band secret distribution | Placer le secret de paiement à l’intérieur de la transaction sur la blockchain, comme le fait Zcash aujourd’hui |
| Out-of-band payment | Transmettre les détails du paiement directement entre l’expéditeur et le destinataire plutôt que par la chaîne |
| Oblivious synchronization | Récupérer les données de la chaîne dont un portefeuille a besoin sans révéler quelles données ont été demandées |
| Proof-carrying data (PCD) | Données accompagnées d’une preuve de leur propre exactitude, de sorte que les preuves peuvent être combinées et compressées |
| Shielded transaction aggregate | La manière dont Tachyon regroupe les changements d’état protégés, modifiant la façon dont ils sont communiqués et signés |
| ledger indistinguishability | La propriété selon laquelle les transactions protégées ne peuvent pas être distinguées les unes des autres |

<br/>

## FAQ

**Est-ce que cela accélérera la synchronisation de mon portefeuille ?** C’est l’objectif. Le temps de synchronisation dépendrait de votre propre activité plutôt que de la taille de la chaîne. Rien n’a encore été déployé, il n’existe donc pas encore de chiffre mesuré à citer.

**Dois-je faire quelque chose dès maintenant ?** Non. Tachyon est une proposition. S’il est adopté, il arrivera par le biais d’une mise à niveau du réseau, avec le préavis habituel.

**La suppression des clés pour lecture seule signifie-t-elle perdre la possibilité de partager un accès en lecture ?** La proposition déplace cette capacité hors du protocole de base, vers la couche portefeuille. Ce à quoi cela ressemblera en pratique fait partie des questions ouvertes.

**Mon argent est-il en danger si Tachyon est déployé ?** Le déploiement passerait soit par une mise à niveau d’Orchard, soit par un sas comptable, deux options conçues pour que la valeur circule selon des règles comptables publiques. La page Ironwood explique le fonctionnement d’un sas comptable.

<br/>

## Pages connexes

- [Récupération d’informations privée](https://zechub.wiki/zcash-tech/private-information-retrieval) - une autre approche du même goulet d’étranglement de l’analyse par les portefeuilles
- [Nœud Zakura](https://zechub.wiki/zcash-tech/zakura-node) - un nœud issu en partie de l’effort d’ingénierie de Tachyon
- [Ironwood](https://zechub.wiki/zcash-tech/ironwood) - la mise à niveau activée en juillet 2026, souvent confondue avec Tachyon
- [Le sas comptable](https://zechub.wiki/zcash-tech/the-turnstile) - le mécanisme que Tachyon pourrait utiliser s’il était déployé comme pool distinct
- [Sécurité post-quantique](https://zechub.wiki/zcash-tech/post-quantum-security) - la place de Tachyon aux côtés des travaux à plus long terme sur le protocole
- [Comment Zcash est organisé](https://zechub.wiki/start-here/how-zcash-is-organized) - qui mène ces travaux et comment l’écosystème s’articule

<br/>

## Ressources

- [Tachyon : mise à l’échelle de Zcash grâce à la synchronisation oblivieuse](https://seanbowe.com/blog/tachyon-scaling-zcash-oblivious-synchronization/) - Sean Bowe, 2 avril 2025, la proposition originale
- [Tachyaction at a Distance](https://seanbowe.com/blog/tachyaction-at-a-distance/) - Sean Bowe, 15 mai 2025, implications pour le consensus et le protocole, rédigé à l’intention des développeurs du protocole
- [Le blog de Sean Bowe](https://seanbowe.com/blog/) - où la série Tachyon est publiée
- [tachyon.z.cash](https://tachyon.z.cash/) - site du projet
