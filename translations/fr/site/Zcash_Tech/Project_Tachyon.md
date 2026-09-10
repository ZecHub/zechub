<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Project_Tachyon.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifier la page"/>
</a>

# Project Tachyon

## TL;DR

- Tachyon est une refonte proposée de la manière dont les wallets Zcash trouvent et dépensent des fonds protégés, conçue pour permettre au réseau de croître jusqu'à atteindre un très grand nombre d'utilisateurs
- Aujourd'hui, un wallet doit tenter de déchiffrer une part énorme de la blockchain pour découvrir quels paiements lui appartiennent, et c'est la principale raison pour laquelle la synchronisation protégée semble lente
- Tachyon remplace cela par la **synchronisation aveugle**, afin qu'un wallet récupère ce dont il a besoin sans tout analyser et sans indiquer à un serveur quelles parties il souhaitait
- Il déplace aussi les détails du paiement hors de la blockchain et dans la demande de paiement elle-même, ce qui simplifie le protocole mais transfère la responsabilité aux wallets
- Il s'agit d'une proposition, publiée pour la première fois en avril 2025 et désignée comme candidate pour NU7. Elle n'est **pas déployée**, et nécessite un effort d'ingénierie de l'ampleur de la mise à niveau Sapling

<br/>

## À qui cela s'adresse

- Toute personne ayant regardé un wallet protégé se synchroniser et s'étant demandé pourquoi cela prend autant de temps
- Les nouveaux venus qui voient constamment Tachyon mentionné aux côtés de NU7 et de la mise à l'échelle de Zcash
- Les lecteurs qui veulent d'abord comprendre l'idée, puis la cryptographie

<br/>

## Le problème que Tachyon résout

Zcash dissimule le destinataire d'un paiement. C'est tout l'intérêt, mais cela crée un problème délicat : si personne ne peut savoir à qui appartient un paiement, comment votre propre wallet trouve-t-il le vôtre ?

Dans Bitcoin, c'est simple. Les adresses sont publiques, donc un wallet peut demander à un serveur « qu'a-t-on envoyé à cette adresse ? » et obtenir une réponse. Un wallet Zcash ne peut pas poser cette question, car la poser révélerait précisément ce que le pool protégé est conçu pour dissimuler.

Zcash fait donc autrement. L'expéditeur chiffre les détails du paiement et les place dans la transaction elle-même. Votre wallet parcourt alors les transactions de la chaîne et tente de déchiffrer chacune d'elles. Presque toutes les tentatives échouent. Les quelques-unes qui réussissent sont vos paiements. Cela s'appelle le **déchiffrement par essai**, et c'est privé, correct et lent.

![Aujourd'hui, un wallet Zcash télécharge chaque transaction protégée et tente de déchiffrer chacune d'elles, presque toutes les tentatives échouant, afin de trouver les quelques paiements qui lui appartiennent](/content-images/tachyon-scanning-today.svg)

Le problème réside dans ce dont dépend ce travail. L'effort fourni par votre wallet est déterminé par la taille de la chaîne, et non par le nombre de paiements que vous avez réellement reçus. Une personne n'ayant jamais reçu un seul paiement effectue presque autant de travail qu'une autre en recevant quotidiennement. À mesure que Zcash grandit, cela empire pour tout le monde. Selon les termes de la proposition, cela « ne passe tout simplement pas à l'échelle ».

<br/>

## Ce que Tachyon change

Tachyon s'attaque au problème à sa racine : il cesse d'utiliser la blockchain comme canal de livraison des secrets de paiement.

À la place, les détails dont vous avez besoin accompagnent la demande de paiement elle-même, hors bande. Une demande de paiement, une URI ou un code QR transporte les informations qui étaient auparavant chiffrées dans la transaction. Sean Bowe décrit cela comme l'adoption, pour la première fois dans un protocole Zcash protégé, des **paiements hors bande**.

Une fois que la chaîne ne transporte plus ces informations, votre wallet n'a plus de raison de les rechercher, et le problème du déchiffrement par essai disparaît.

Votre wallet doit néanmoins connaître l'état actuel de la chaîne afin de dépenser des fonds. C'est la seconde moitié de la conception, la **synchronisation aveugle** : un moyen pour un wallet de récupérer les éléments spécifiques dont il a besoin sans révéler au serveur quels éléments il a demandés.

![Avec Tachyon, l'expéditeur transmet les détails du paiement au destinataire hors bande, et le wallet utilise la synchronisation aveugle pour récupérer uniquement les données dont il a besoin au lieu d'analyser toute la chaîne](/content-images/tachyon-oblivious-sync.svg)

<br/>

## Ce que cela signifierait pour quelqu'un qui utilise un wallet

- **La synchronisation ne croît plus avec la chaîne.** Le temps que votre wallet passe à se mettre à jour suivrait votre propre activité plutôt que la taille de Zcash.
- **Les paiements ressemblent davantage à la remise d'une facture.** La demande de paiement contient ce dont le destinataire a besoin, donc l'échange entre l'expéditeur et le destinataire compte davantage qu'aujourd'hui.
- **Les wallets assument davantage de responsabilités.** Puisque la chaîne ne contient plus de copie chiffrée des détails de votre paiement, perdre les données de votre wallet devient plus important. La sauvegarde et la récupération passent d'une fonctionnalité du protocole à un aspect que le logiciel de wallet doit correctement gérer.
- **Certains éléments familiers se déplacent ou disparaissent.** Tachyon retire du protocole central la diversification des clés, les viewing keys et les adresses de paiement, pour les laisser à la couche wallet. C'est l'une des parties les plus importantes de la proposition, et elle est encore en cours d'élaboration.

<br/>

## Un examen plus approfondi pour les lecteurs techniques

Tachyon est décrit comme une modification rétrocompatible du protocole Orchard. Il pourrait être déployé soit comme une mise à niveau du pool Orchard existant, soit comme un pool protégé séparé atteint par un [turnstile](https://zechub.wiki/zcash-tech/the-turnstile), le même mécanisme que Zcash a utilisé pour Ironwood. Le choix affecte le déploiement, pas la conception.

Il conserve plusieurs éléments d'Orchard : la re-randomisation des clés RedPallas, les engagements de valeur homomorphes et les signatures de liaison, ainsi que la structure de clés partitionnée qui permet à un appareil de déléguer la génération de preuves sans céder l'autorité de dépense.

Le travail de mise à l'échelle s'appuie sur les **données porteuses de preuves**, une technique dans laquelle les données voyagent avec une preuve de leur propre validité, de sorte que leur combinaison avec d'autres données porteuses de preuves produit un élément qui hérite de ces preuves et les étend. C'est ce qui permet de compresser une grande quantité de travail vérifié en quelque chose de petit et rapide à vérifier. Halo, découvert par l'équipe derrière Zcash, est ce qui a rendu les données porteuses de preuves suffisamment pratiques pour pouvoir s'appuyer dessus.

Le troisième volet concerne les **agrégats de transactions protégées**, qui modifient la manière dont les changements d'état protégés sont communiqués et ont des répercussions sur le fonctionnement de la signature.

<br/>

## Où en est le travail

Tachyon est une **proposition, et non une fonctionnalité déployée**. Elle a été publiée en avril 2025, et un billet de suivi en mai 2025 a étudié les implications pour le consensus. Elle est désignée comme candidate pour NU7, la prochaine mise à niveau majeure après Ironwood, mais le contenu de NU7 est décidé par un vote des détenteurs de coins et rien concernant Tachyon n'est arrêté.

Selon le propre cadrage de l'auteur, il s'agit d'un plan réalisable plutôt que d'une recherche spéculative, mais qui exige un effort d'ingénierie comparable à Sapling, certaines questions plus difficiles étant délibérément laissées pour plus tard.

Des travaux connexes sont déjà visibles. [Zakura](https://zechub.wiki/zcash-tech/zakura-node), un nœud complet publié en juillet 2026, est un effort conjoint entre Project Tachyon et le Valar Group et préfigure certains de ces changements au niveau du réseau. La recherche sur la [récupération privée d'informations](https://zechub.wiki/zcash-tech/private-information-retrieval) vise le même goulot d'étranglement d'analyse des wallets sous un angle différent.

<br/>

## Idées reçues courantes

- **Tachyon n'est pas actif.** Aucun wallet ne l'utilise aujourd'hui, et aucune mise à niveau ne l'a activé.
- **Tachyon n'est pas la même chose qu'Ironwood.** Ironwood a été activé en juillet 2026 et concernait le pool Orchard et le turnstile. Tachyon est une proposition distincte et ultérieure portant sur la mise à l'échelle.
- **Tachyon ne réduit pas la confidentialité.** L'objectif est de préserver l'indistinguabilité du registre tout en supprimant le coût de mise à l'échelle, et non d'échanger la confidentialité contre la vitesse.
- **La vérification des ZK-SNARK n'a jamais été le goulot d'étranglement.** La proposition précise que la partie lente est la façon dont les wallets découvrent et coordonnent l'état, et non le coût de vérification des preuves.
- **« Ciblé pour NU7 » n'est pas un engagement.** Ce qui entre dans NU7 est décidé par un vote.

<br/>

## Glossaire

| Terme | Signification |
|---|---|
| Déchiffrement par essai | Tenter de déchiffrer les transactions une par une afin de trouver celles qui vous sont adressées |
| Distribution de secrets dans la bande | Placer le secret de paiement dans la transaction sur la blockchain, comme le fait Zcash aujourd'hui |
| Paiement hors bande | Transmettre les détails du paiement directement entre l'expéditeur et le destinataire au lieu de passer par la chaîne |
| Synchronisation aveugle | Récupérer les données de la chaîne dont un wallet a besoin sans révéler quelles données ont été demandées |
| Données porteuses de preuves (PCD) | Données qui voyagent avec une preuve de leur propre validité, afin que les preuves puissent être combinées et compressées |
| Agrégat de transactions protégées | La manière dont Tachyon regroupe les changements d'état protégés, modifiant leur communication et leur signature |
| indistinguabilité du registre | La propriété selon laquelle les transactions protégées ne peuvent pas être distinguées les unes des autres |

<br/>

## FAQ

**Cela rendra-t-il la synchronisation de mon wallet plus rapide ?** C'est l'objectif. Le temps de synchronisation suivrait votre propre activité plutôt que la taille de la chaîne. Rien n'a encore été déployé, il n'existe donc pas encore de chiffre mesuré à citer.

**Dois-je faire quoi que ce soit maintenant ?** Non. Tachyon est une proposition. S'il est adopté, il arriverait par une mise à niveau du réseau avec le préavis habituel.

**La suppression des viewing keys signifie-t-elle perdre la possibilité de partager un accès en lecture ?** La proposition déplace cette capacité hors du protocole central et dans la couche wallet. Son fonctionnement concret est l'une des questions ouvertes.

**Mon argent est-il en danger si Tachyon est déployé ?** Le déploiement utiliserait soit une mise à niveau d'Orchard, soit un turnstile, tous deux conçus pour que la valeur se déplace selon des règles publiques de comptabilité. La page Ironwood explique le fonctionnement d'un turnstile.

<br/>

## Pages associées

- [Récupération privée d'informations](https://zechub.wiki/zcash-tech/private-information-retrieval) - une autre approche du même goulot d'étranglement d'analyse des wallets
- [Nœud Zakura](https://zechub.wiki/zcash-tech/zakura-node) - un nœud construit en partie grâce à l'effort d'ingénierie de Tachyon
- [Ironwood](https://zechub.wiki/zcash-tech/ironwood) - la mise à niveau activée en juillet 2026, souvent confondue avec Tachyon
- [Le Turnstile](https://zechub.wiki/zcash-tech/the-turnstile) - le mécanisme que Tachyon pourrait utiliser s'il était déployé comme son propre pool
- [Sécurité post-quantique](https://zechub.wiki/zcash-tech/post-quantum-security) - où Tachyon se situe parmi les travaux de protocole à plus long terme
- [Comment Zcash est organisé](https://zechub.wiki/start-here/how-zcash-is-organized) - qui réalise ce travail et comment l'écosystème s'articule

<br/>

## Ressources

- [Tachyon : mise à l'échelle de Zcash avec la synchronisation aveugle](https://seanbowe.com/blog/tachyon-scaling-zcash-oblivious-synchronization/) - Sean Bowe, 2 avril 2025, la proposition originale
- [Tachyaction à distance](https://seanbowe.com/blog/tachyaction-at-a-distance/) - Sean Bowe, 15 mai 2025, implications pour le consensus et le protocole, écrit pour les développeurs de protocoles
- [Le blog de Sean Bowe](https://seanbowe.com/blog/) - où la série Tachyon est publiée
- [tachyon.z.cash](https://tachyon.z.cash/) - site du projet
