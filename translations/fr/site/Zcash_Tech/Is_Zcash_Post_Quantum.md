<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Is_Zcash_Post_Quantum.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash est-il post-quantique ?

## Réponse courte

Non, pas encore.

Depuis la mise à niveau Ironwood, Zcash est **récupérable face au quantique** pour les fonds détenus dans le pool Ironwood. C’est une véritable avancée, mais ce n’est pas la même chose qu’une sécurité post-quantique. ZIP 2005, la spécification sur laquelle elle repose, le dit clairement : ce changement « ne rend pas à lui seul le protocole sûr face à des adversaires quantiques ». Il prépare les fonds Ironwood afin qu’ils puissent être déplacés au moyen d’un futur protocole de récupération une fois la cryptographie actuelle désactivée.

Cette page distingue ce que Zcash protège aujourd’hui, ce que Ironwood a changé, ce qui reste exposé et ce qui n’est encore qu’une proposition. Le [tableau de statut](#status-table) vers la fin indique où en est chaque élément et à quelle date cela a été vérifié pour la dernière fois.

<br/>

## À qui s’adresse cette page

- À toute personne qui a lu « récupérable face au quantique » et l’a compris comme « à l’épreuve du quantique »
- Aux détenteurs qui se demandent s’ils doivent déplacer leurs fonds vers Ironwood
- Aux rédacteurs et modérateurs qui ont besoin d’une réponse sourcée vers laquelle orienter les gens

Pour des notions de base sur l’informatique quantique elle-même, commencez par [La sécurité post-quantique dans Zcash](/zcash-tech/post-quantum-security).

<br/>

## Pourquoi la question prête à confusion

On emploie « post-quantique » comme s’il s’agissait d’une seule propriété. Pour Zcash, cela recouvre au moins quatre questions distinctes, dont les réponses diffèrent :

1. **Confidentialité.** Un attaquant quantique peut-il voir qui a payé qui, et combien ?
2. **Dépense.** Un attaquant quantique peut-il dépenser des pièces qui ne lui appartiennent pas ?
3. **Inflation.** Un attaquant quantique peut-il créer des ZEC à partir de rien ?
4. **Récupération.** Si la cryptographie actuelle doit être désactivée, les utilisateurs honnêtes peuvent-ils encore récupérer leurs fonds ?

Ironwood ne change la réponse qu’à la quatrième question, et uniquement pour les notes du pool Ironwood.

La menace derrière tout cela est un attaquant capable de calculer des logarithmes discrets sur les courbes elliptiques qu’utilise Zcash. Un ordinateur quantique suffisamment puissant exécutant l’algorithme de Shor serait un moyen d’y parvenir. ZIP 2005 souligne que trouver un **seul** logarithme discret suffit pour provoquer une inflation arbitraire ou voler des fonds.

<br/>

## Ce que Zcash protège aujourd’hui

Ce tableau décrit le protocole tel qu’il fonctionne actuellement, face à un attaquant capable de casser les logarithmes discrets. Il s’applique à tous les pools protégés, Ironwood compris, car Ironwood utilise le même circuit Orchard, les mêmes preuves Halo 2 et les mêmes signatures RedPallas que Orchard.

| Propriété | Face à un attaquant quantique aujourd’hui | Ce que Ironwood a changé |
|---|---|---|
| Confidentialité | Préservée si l’attaquant ne connaît pas votre adresse protégée. Les preuves et les signatures re-randomisées ne divulguent rien de plus. Si l’attaquant connaît l’adresse, il peut déchiffrer les notes qui lui sont envoyées, y compris les anciennes enregistrées depuis la chaîne. | Rien. ZIP 2005 : « La situation concernant la confidentialité est inchangée pour tous les pools. » |
| Dépense | Non protégée. Un attaquant pourrait falsifier des preuves ou des signatures de dépense et voler dans n’importe quel pool protégé, même pour des adresses qu’il n’a jamais vues. | Rien pour l’instant. La protection n’arrivera qu’après un futur basculement vers le protocole de récupération. |
| Inflation | Non protégée. Un attaquant pourrait falsifier une preuve d’apparence valide et créer des ZEC dans n’importe quel pool protégé, éventuellement sans que personne ne s’en aperçoive. La seule limite est le [sas comptable](/zcash-tech/the-turnstile) : aucun pool ne peut verser plus que son solde enregistré. | Rien pour l’instant. Les notes Ironwood s’engagent désormais sur l’ensemble de leur contenu d’une manière qu’un attaquant quantique ne devrait pas pouvoir falsifier, ce dont un futur protocole de récupération a besoin pour garantir l’intégrité de l’offre. |
| Récupération | Les notes Sprout, Sapling et Orchard n’ont aucune voie de récupération. Une fois leurs protocoles désactivés, tout ce qui y resterait deviendrait inaccessible. | Toute note Ironwood est récupérable en principe. Aucune note Sapling ou Orchard ne l’est. |

Le ZEC transparent est un cas à part. Ses signatures ECDSA peuvent être falsifiées dès que la clé publique est connue. Pour une adresse transparente ordinaire, cela se produit la première fois que vous dépensez depuis celle-ci, et il existe aussi une courte fenêtre pendant laquelle une transaction attend sa confirmation dans le mempool. ZIP 2005 ne change rien à cela.

<br/>

## Ce que Ironwood a changé

Ironwood est la mise à niveau du réseau NU6.3. Elle a été activée sur le Mainnet au bloc 3 428 143 le 28 juillet 2026. Son objectif principal était l’intégrité de l’offre après le bogue de solidité de Orchard (voir la page [Ironwood](/zcash-tech/ironwood)), et la récupérabilité face au quantique issue de ZIP 2005 en faisait partie.

- **Un nouveau format de note.** Chaque note de sortie Ironwood utilise le format récupérable face au quantique (octet de tête du texte clair de la note `0x03`). L’aléa de la note est désormais dérivé de tous ses champs, de sorte que la note est liée à son contenu par un hachage et non plus uniquement par les mathématiques des courbes elliptiques.
- **Une voie de récupération pour les seules notes Ironwood.** ZIP 326 indique explicitement que toute note Ironwood est récupérable et qu’aucune note Orchard ne l’est. Un réglage du portefeuille n’y change rien.
- **Orchard n’accepte plus de nouvelle valeur.** Les récompenses Coinbase ne peuvent plus être versées vers Orchard, et Orchard ne peut plus envoyer vers une autre adresse Orchard ; la nouvelle valeur protégée arrive donc dans Ironwood.
- **Les portefeuilles sont invités à tout déplacer.** ZIP 2005 indique que les portefeuilles DEVRAIENT déplacer tous les fonds qu’ils contrôlent, y compris les fonds transparents, Sprout et Sapling, vers des notes Ironwood dès que possible, et continuer à le faire à mesure que de nouveaux fonds arrivent.

Ce que Ironwood n’a pas changé : la cryptographie utilisée aujourd’hui pour dépenser et prouver, le chiffrement des notes, et quoi que ce soit concernant le ZEC transparent.

<br/>

## Limites qui subsistent

**Il existe une fenêtre d’exposition.** Entre l’activation de Ironwood et la désactivation des anciens protocoles, un attaquant quantique pourrait encore voler, gonfler ou bloquer des fonds dans tous les pools protégés. ZIP 2005 l’appelle la « période d’exposition critique » et avertit qu’une attaque pendant cette période pourrait encore compromettre la capacité d’un détenteur à récupérer ses fonds par la suite. C’est pourquoi elle indique que Zcash doit désactiver Orchard, Sapling et Sprout **avant** que les attaques quantiques ne deviennent réalisables.

**La désactivation n’a pas de date, sauf pour Sprout.** Aucune ZIP ne planifie la désactivation de Orchard ou de Sapling. Sprout est un cas différent : [ZIP 259](https://zips.z.cash/zip-0259) compte ZIP 2003 parmi les changements que NU7 déploie ; depuis l’activation de NU7, les transactions de version 4 sont donc invalides et les ZEC restés dans le pool Sprout ne peuvent plus être dépensés. NU7 a été activée sur le Mainnet au bloc 3 543 405 le 6 novembre 2026 UTC ([ZIP 259](https://zips.z.cash/zip-0259), [annonce sur le forum](https://forum.zcashcommunity.com/t/nu7-timeline/57655)). Une discussion sur le passage de Sapling en retrait seul a été lancée sur le forum en avril 2026.

**Le protocole de récupération n’est pas terminé.** ZIP 2005 n’en donne qu’une ébauche et précise que les détails « sont susceptibles de changer ». Rien n’en est déployé.

**Récolter maintenant, déchiffrer plus tard.** Les textes chiffrés des notes pour Ironwood, Orchard, Sapling et Sprout sont tous publics sur la chaîne. Quelqu’un peut les enregistrer aujourd’hui et les déchiffrer plus tard, s’il connaît aussi l’adresse de réception. Chaque adresse que vous publiez ou communiquez fait partie de ce risque. ZIP 2005 indique que « d’autres modifications du protocole sont à l’étude » pour les transferts futurs.

**Les fonds transparents ne sont pas couverts.** Les adresses depuis lesquelles des fonds ont été dépensés, ou qui ont été réutilisées, ont des clés publiques exposées. La récupérabilité de certaines adresses transparentes n’est pour l’instant qu’une idée (ZIP 2007, voir ci-dessous).

**Les configurations FROST comportent une réserve supplémentaire.** Avec FROST, chaque participant détient une clé de dépense quantique (`qsk`), et un attaquant quantique qui la détiendrait pourrait être en mesure de voler des fonds. ZIP 2005 recommande de déplacer les fonds FROST vers un protocole entièrement post-quantique prenant en charge les seuils, dès qu’il en existera un.

<br/>

## Propositions et recherche

Aucun de ces éléments n’est en service.

- **Protocole de récupération.** Le mécanisme qui permettrait réellement de dépenser les fonds Ironwood après le basculement. Esquissé dans ZIP 2005, non spécifié.
- **ZIP 2007, récupérabilité de certaines adresses transparentes.** Seulement un numéro ZIP réservé, avec une discussion dans [zips#1302](https://github.com/zcash/zips/issues/1302). L’idée est que les sorties P2PKH et P2SH dont les clés publiques n’ont jamais été révélées pourraient être récupérables, avec des garanties plus faibles que Ironwood.
- **Confidentialité post-quantique pour les adresses connues.** Question ouverte depuis 2022 dans [zips#1133](https://github.com/zcash/zips/issues/1133), qui note que Zcash est « déjà conçu pour être confidentiel face au quantique » lorsque les adresses restent secrètes, et se demande comment étendre cela aux adresses connues, par exemple avec un mécanisme d’encapsulation de clé post-quantique comme Kyber (aujourd’hui ML-KEM). En juin 2026, [zips#1307](https://github.com/zcash/zips/issues/1307) a proposé une ZIP pour documenter les propriétés de confidentialité actuelles et les correctifs possibles.
- **Projet Tachyon.** Une proposition de mise à niveau de mise à l’échelle. Son site indique qu’elle obtiendrait une « confidentialité post-quantique complète » en effet secondaire, en déplaçant la transmission des paiements hors chaîne et en utilisant un échange de clés post-quantique. Sa bibliothèque de données porteuses de preuves, Ragu, est décrite comme « encore en construction ». Voir [Projet Tachyon](/zcash-tech/project-tachyon).
- **Un Zcash entièrement post-quantique.** Des preuves, des signatures et des engagements post-quantiques réunis. Suivi dans [zips#1134](https://github.com/zcash/zips/issues/1134), ouvert depuis 2016. Il n’existe ni spécification ni calendrier.

<br/>

## Tableau de statut

Dernière vérification le 13 septembre 2026, sauf pour la ligne Sprout, mise à jour le 13 novembre 2026 après l’activation de NU7. Le statut indiqué dans l’en-tête d’une ZIP et son statut sur le réseau sont deux choses différentes : l’en-tête de ZIP 2005 indique toujours « Proposed », alors que ses règles sont appliquées sur le Mainnet depuis juillet 2026.

| Élément | Statut ZIP | Statut sur le réseau | Date | Source |
|---|---|---|---|---|
| Pool Ironwood avec des notes récupérables face au quantique (NU6.3) | ZIP 2005 Proposed, ZIP 229 et ZIP 258 Draft | **Activé** sur le Mainnet | 28 juil. 2026, bloc 3 428 143 | [ZIP 2005](https://zips.z.cash/zip-2005), [ZIP 258](https://zips.z.cash/zip-0258) |
| Orchard fermé à toute nouvelle valeur | ZIP 2006 Reserved, règles dans ZIP 258 | **Activé** sur le Mainnet | 28 juil. 2026 | [ZIP 258](https://zips.z.cash/zip-0258) |
| Portefeuilles déplaçant les fonds vers Ironwood | Recommandations dans ZIP 2005, ZIP 318 et ZIP 326 (Draft) | Recommandé, dépend de votre portefeuille | Depuis le 28 juil. 2026 | [ZIP 318](https://zips.z.cash/zip-0318), [ZIP 326](https://zips.z.cash/zip-0326) |
| Protocole de récupération | Seulement esquissé dans ZIP 2005 | **Non implémenté** | Aucune date | [ZIP 2005](https://zips.z.cash/zip-2005) |
| Désactivation de Orchard et de Sapling | Aucune ZIP | **Non planifiée** | Discussion sur Sapling depuis avr. 2026 | [Forum](https://forum.zcashcommunity.com/t/sapling-withdraw-only-discussion-kickoff/55223) |
| Désactivation des dépenses Sprout (ZIP 2003) | Proposed, déployée par NU7 selon ZIP 259 (Proposed) | **Activée** sur le Mainnet | 6 nov. 2026, bloc 3 543 405 | [ZIP 2003](https://zips.z.cash/zip-2003), [ZIP 259](https://zips.z.cash/zip-0259) |
| Récupérabilité transparente (ZIP 2007) | Reserved | **Proposition** | ZIP réservée le 5 juil. 2025, discussion ouverte le 17 juin 2026 | [zips#1302](https://github.com/zcash/zips/issues/1302) |
| Confidentialité post-quantique pour les adresses connues | Tickets ouverts, aucune ZIP | **Recherche** | #1133 ouvert le 18 août 2022, #1307 ouvert le 23 juin 2026 | [zips#1133](https://github.com/zcash/zips/issues/1133), [zips#1307](https://github.com/zcash/zips/issues/1307) |
| Projet Tachyon | Aucune ZIP | **Proposition**, en développement | Première publication en avr. 2025 | [tachyon.z.cash](https://tachyon.z.cash/roadmap/) |
| Protocole entièrement post-quantique | Ticket ouvert, aucune ZIP | **Travaux futurs** | #1134 ouvert le 28 mars 2016 | [zips#1134](https://github.com/zcash/zips/issues/1134) |

Lors du sondage d’opinion NU7 de Zcash Foundation (février 2026), la récupérabilité face au quantique a recueilli 90,5 % de soutien auprès de ZCAP et 94,6 % auprès des détenteurs de pièces, et Tachyon a bénéficié d’un soutien quasi unanime. Il s’agissait de sondages d’opinion, et non de décisions sur le contenu de NU7.

<br/>

## Ce que vous pouvez faire dès maintenant

- **Déplacez vos fonds vers Ironwood.** Les notes Sapling et Orchard ne seront jamais récupérables. Déplacer de la valeur entre pools révèle le montant on-chain ; c’est pourquoi ZIP 318 prévoit que les portefeuilles divisent les soldes en montants fixes et les transfèrent progressivement. Laissez votre portefeuille s’en charger plutôt que de tout déplacer d’un coup.
- **Ne publiez pas d’adresses protégées sans nécessité.** La confidentialité face à un futur attaquant quantique dépend du fait qu’il ne connaisse pas votre adresse. Les adresses unifiées sont faciles à générer : donnez-en une nouvelle à chaque payeur. ZIP 229 recommande la rotation des adresses pour cette raison.
- **Ne réutilisez pas les adresses transparentes.** Dès que vous dépensez depuis l’une d’elles, sa clé publique reste sur la chaîne pour toujours.
- **Conservez votre phrase de récupération en lieu sûr.** Dans le protocole de récupération tel qu’il est esquissé, une dépense de récupération doit prouver que vous connaissez votre clé de dépense, et les portefeuilles ordinaires dérivent cette clé de la phrase de récupération.
- **Ignorez les affirmations selon lesquelles « Zcash est à l’épreuve du quantique ».** Ce n’est pas encore le cas, et les auteurs des spécifications le disent eux-mêmes.

<br/>

## Idées reçues courantes

- **« Ironwood est post-quantique. »** Non. Il utilise la même cryptographie Orchard, et ZIP 2005 indique que cette fonctionnalité « ne rend pas le protocole Orchard sûr face aux attaques quantiques ».
- **« Récupérable face au quantique signifie à l’abri des ordinateurs quantiques dès aujourd’hui. »** Non. Cela signifie que les fonds Ironwood pourraient être récupérés après un futur basculement, à condition que ce basculement ait lieu à temps.
- **« Le Zcash protégé est déjà confidentiel face au quantique. »** Uniquement lorsque l’attaquant ne connaît pas votre adresse. Les adresses connues sont exposées dans tous les pools.
- **« Tachyon a déjà ajouté la confidentialité post-quantique. »** Tachyon est une proposition. Rien n’en est en service.
- **« Les ordinateurs quantiques cassent toutes les briques de Zcash. »** Les fonctions de hachage sont seulement affaiblies, et non cassées, par les attaques quantiques connues. La récupérabilité face au quantique repose précisément sur cette différence.

<br/>

## Pages connexes

- [La sécurité post-quantique dans Zcash](/zcash-tech/post-quantum-security)
- [Ironwood](/zcash-tech/ironwood)
- [Le sas comptable](/zcash-tech/the-turnstile)
- [Projet Tachyon](/zcash-tech/project-tachyon)
- [FROST](/zcash-tech/frost)
- [Pools protégés](/using-zcash/shielded-pools)

<br/>

## Sources

- [ZIP 2005 : récupérabilité face au quantique de Ironwood](https://zips.z.cash/zip-2005)
- [ZIP 229 : format de transaction version 6](https://zips.z.cash/zip-0229)
- [ZIP 258 : déploiement de la mise à niveau du réseau NU6.3](https://zips.z.cash/zip-0258)
- [ZIP 318 : migration de Orchard vers Ironwood](https://zips.z.cash/zip-0318)
- [ZIP 326 : conséquences de NU6.3 pour les portefeuilles](https://zips.z.cash/zip-0326)
- [ZIP 2003 : interdire les transactions de version 4](https://zips.z.cash/zip-2003)
- [ZIP 209 : interdire les soldes négatifs des pools de valeur de la chaîne protégés](https://zips.z.cash/zip-0209)
- [zips#1302 : récupérabilité face au quantique d’un sous-ensemble du protocole transparent](https://github.com/zcash/zips/issues/1302)
- [zips#1133 : confidentialité post-quantique pour Zcash](https://github.com/zcash/zips/issues/1133)
- [zips#1307 : confidentialité de Zcash face aux adversaires quantiques et capables de casser le logarithme discret](https://github.com/zcash/zips/issues/1307)
- [zips#1134 : Zcash entièrement post-quantique](https://github.com/zcash/zips/issues/1134)
- [Feuille de route du projet Tachyon](https://tachyon.z.cash/roadmap/)
- [Résultats du sondage NU7 : ce que nous avons entendu et la suite](https://forum.zcashcommunity.com/t/nu7-polling-results-what-we-heard-and-where-we-go-from-here/54775)
- [Bloc 3 428 143 sur ZecBlock](https://zecblock.com/block/3428143)
- [Demande sur le forum : Zcash est-il post-quantique ?](https://forum.zcashcommunity.com/t/is-zcash-post-quantum-help-wanted-d-proposal/57154)
