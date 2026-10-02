<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Is_Zcash_Post_Quantum.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifier la page"/>
</a>

# Zcash est-il post-quantique ?

## Réponse courte

Non, pas encore.

Depuis la mise à niveau Ironwood, Zcash est **récupérable face au quantique** pour les fonds détenus dans le pool Ironwood. C'est une avancée réelle, mais ce n'est pas la même chose qu'être sécurisé contre le quantique. ZIP 2005, la spécification qui le sous-tend, le dit directement : le changement « ne rend pas à lui seul le protocole sécurisé contre les adversaires quantiques ». Il prépare les fonds Ironwood afin qu'ils puissent être déplacés via un futur protocole de récupération une fois la cryptographie actuelle désactivée.

Cette page distingue ce que Zcash protège aujourd'hui, ce que Ironwood a changé, ce qui reste exposé et ce qui n'est encore qu'une proposition. Le [tableau d'état](#status-table) vers la fin montre où en est chaque élément et quand cela a été vérifié pour la dernière fois.

<br/>

## À qui s'adresse cette page

- Toute personne ayant vu « récupérable face au quantique » et l'ayant compris comme « résistant au quantique »
- Les détenteurs qui décident s'ils doivent déplacer leurs fonds vers Ironwood
- Les rédacteurs et modérateurs qui ont besoin d'une réponse sourcée vers laquelle orienter les gens

Pour des informations générales sur l'informatique quantique elle-même, commencez par [Sécurité post-quantique dans Zcash](/zcash-tech/post-quantum-security).

<br/>

## Pourquoi cette question prête à confusion

« Post-quantique » est utilisé comme s'il s'agissait d'une propriété unique. Pour Zcash, il s'agit d'au moins quatre questions distinctes, auxquelles les réponses diffèrent :

1. **Confidentialité.** Un attaquant quantique peut-il voir qui a payé qui et quel montant ?
2. **Dépense.** Un attaquant quantique peut-il dépenser des pièces qui ne lui appartiennent pas ?
3. **Inflation.** Un attaquant quantique peut-il créer des ZEC à partir de rien ?
4. **Récupération.** Si la cryptographie actuelle doit être désactivée, les utilisateurs honnêtes peuvent-ils toujours récupérer leurs fonds ?

Ironwood ne modifie que la réponse à la quatrième question, et uniquement pour les notes du pool Ironwood.

La menace sous-jacente est un attaquant capable de calculer des logarithmes discrets sur les courbes elliptiques utilisées par Zcash. Un ordinateur quantique suffisamment grand exécutant l'algorithme de Shor serait une manière d'y parvenir. ZIP 2005 souligne que trouver un **seul** logarithme discret suffit pour provoquer une inflation arbitraire ou voler des fonds.

<br/>

## Ce que Zcash protège aujourd'hui

Ce tableau décrit le protocole tel qu'il fonctionne actuellement, face à un attaquant capable de casser les logarithmes discrets. Il s'applique à chaque pool protégé, y compris Ironwood, car Ironwood utilise le même circuit Orchard, les preuves Halo 2 et les signatures RedPallas que Orchard.

| Propriété | Face à un attaquant quantique aujourd'hui | Ce que Ironwood a changé |
|---|---|---|
| Confidentialité | Elle est préservée si l'attaquant ne connaît pas votre adresse protégée. Les preuves et signatures rerandomisées ne divulguent rien de plus. Si l'attaquant connaît l'adresse, il peut déchiffrer les notes qui lui sont envoyées, y compris les anciennes notes enregistrées depuis la chaîne. | Rien. ZIP 2005 : « La situation concernant la confidentialité est inchangée pour tout pool. » |
| Dépense | Non protégée. Un attaquant pourrait forger des preuves ou des signatures de dépense et voler depuis n'importe quel pool protégé, même pour des adresses qu'il n'a jamais vues. | Rien pour l'instant. La protection n'arrive qu'après un futur basculement vers le protocole de récupération. |
| Inflation | Non protégée. Un attaquant pourrait forger une preuve d'apparence valide et créer des ZEC dans n'importe quel pool protégé, potentiellement sans que personne ne s'en aperçoive. La seule limite est le [tourniquet](/zcash-tech/the-turnstile) : aucun pool ne peut verser plus que son solde enregistré. | Rien pour l'instant. Les notes Ironwood s'engagent désormais sur l'intégralité de leur contenu d'une manière qu'un attaquant quantique ne devrait pas pouvoir falsifier, ce dont un futur protocole de récupération a besoin pour préserver l'intégrité de l'offre. |
| Récupération | Les notes Sprout, Sapling et Orchard n'ont aucun chemin de récupération. Une fois leurs protocoles désactivés, tout ce qui y resterait serait inaccessible. | Chaque note Ironwood est récupérable en principe. Aucune note Sapling ou Orchard ne l'est. |

Les ZEC transparents constituent un cas distinct. Leurs signatures ECDSA peuvent être falsifiées une fois que la clé publique est connue. Pour une adresse transparente normale, cela se produit la première fois que vous dépensez depuis celle-ci, et il existe aussi une courte fenêtre lorsqu'une transaction reste non confirmée dans le mempool. ZIP 2005 ne modifie rien de cela.

<br/>

## Ce que Ironwood a changé

Ironwood est la mise à niveau réseau NU6.3. Elle a été activée sur Mainnet au bloc 3 428 143 le 28 juillet 2026. Son objectif principal était l'intégrité de l'offre après le bug de validité Orchard (voir la page [Ironwood](/zcash-tech/ironwood)), et la récupérabilité quantique issue de ZIP 2005 en faisait partie.

- **Un nouveau format de note.** Chaque note de sortie Ironwood utilise le format récupérable face au quantique (octet de tête du texte en clair de la note : `0x03`). L'aléa de la note est désormais dérivé de tous ses champs ; la note est donc liée à son contenu par un hash plutôt que seulement par les mathématiques des courbes elliptiques.
- **Un chemin de récupération uniquement pour les notes Ironwood.** ZIP 326 indique explicitement que chaque note Ironwood est récupérable et qu'aucune note Orchard ne l'est. Un réglage du wallet ne change pas cela.
- **Orchard n'accepte plus de nouvelle valeur.** Les récompenses Coinbase ne peuvent plus aller vers Orchard, et Orchard ne peut plus envoyer vers une autre adresse Orchard ; les nouvelles valeurs protégées arrivent donc dans Ironwood.
- **Les wallets sont invités à tout déplacer.** ZIP 2005 indique que les wallets DEVRAIENT déplacer dès que possible tous les fonds qu'ils contrôlent, y compris les fonds transparents, Sprout et Sapling, vers des notes Ironwood, et continuer à le faire à mesure que de nouveaux fonds arrivent.

Ce que Ironwood n'a pas changé : la cryptographie utilisée aujourd'hui pour dépenser et prouver, le chiffrement des notes, et tout ce qui concerne les ZEC transparents.

<br/>

## Limites qui subsistent

**Il existe une fenêtre d'exposition.** De l'activation de Ironwood jusqu'à la désactivation des anciens protocoles, un attaquant quantique pourrait toujours voler, gonfler ou bloquer des fonds dans chaque pool protégé. ZIP 2005 appelle cela la « période d'exposition critique » et avertit qu'une attaque durant celle-ci pourrait encore nuire à la capacité d'un détenteur à récupérer ses fonds ultérieurement. C'est pourquoi il indique que Zcash doit désactiver Orchard, Sapling et Sprout **avant** que les attaques quantiques deviennent réalisables.

**La désactivation n'a pas de date.** Aucun ZIP ne prévoit de désactiver Orchard ou Sapling. ZIP 2003, un Draft et un candidat NU7, désactiverait les dépenses Sprout en interdisant les transactions de version 4. Une discussion sur un mode de retrait uniquement pour Sapling a commencé sur le forum en avril 2026.

**Le protocole de récupération n'est pas terminé.** ZIP 2005 ne fait que l'esquisser et indique que les détails « sont susceptibles de changer ». Rien de tout cela n'est déployé.

**Récolter maintenant, déchiffrer plus tard.** Les textes chiffrés des notes pour Ironwood, Orchard, Sapling et Sprout sont tous publics sur la chaîne. Quelqu'un peut les enregistrer aujourd'hui et les déchiffrer plus tard, s'il connaît également l'adresse de réception. Chaque adresse que vous publiez ou communiquez fait partie de ce risque. ZIP 2005 indique que « d'autres modifications du protocole sont à l'étude » pour les futurs transferts.

**Les fonds transparents ne sont pas couverts.** Les adresses depuis lesquelles une dépense a été effectuée, ou qui ont été réutilisées, ont exposé leurs clés publiques. La récupérabilité de certaines adresses transparentes n'est encore qu'une idée (ZIP 2007, voir ci-dessous).

**Les configurations FROST présentent une mise en garde supplémentaire.** Avec FROST, chaque participant détient une clé de dépense quantique (`qsk`), et un attaquant quantique qui la détient pourrait être en mesure de voler. ZIP 2005 recommande de déplacer les fonds FROST vers un protocole entièrement post-quantique avec prise en charge des seuils dès qu'il en existera un.

<br/>

## Propositions et recherche

Aucune de ces propositions n'est active.

- **Protocole de récupération.** Le mécanisme qui permettrait effectivement de dépenser les fonds Ironwood après le basculement. Esquissé dans ZIP 2005, mais non spécifié.
- **ZIP 2007, récupérabilité de certaines adresses transparentes.** Seulement un numéro ZIP réservé, avec une discussion dans [zips#1302](https://github.com/zcash/zips/issues/1302). L'idée est que les sorties P2PKH et P2SH dont les clés publiques n'ont jamais été révélées pourraient être récupérables, avec des garanties plus faibles que Ironwood.
- **Confidentialité post-quantique pour les adresses connues.** Sujet ouvert depuis 2022 dans [zips#1133](https://github.com/zcash/zips/issues/1133), qui note que Zcash est « déjà destiné à être privé face au quantique » lorsque les adresses restent secrètes et demande comment étendre cela aux adresses connues, par exemple avec un mécanisme d'encapsulation de clé post-quantique tel que Kyber (désormais ML-KEM). En juin 2026, [zips#1307](https://github.com/zcash/zips/issues/1307) a proposé un ZIP pour documenter les propriétés de confidentialité actuelles et les correctifs possibles.
- **Projet Tachyon.** Une mise à niveau de mise à l'échelle proposée. Son site indique qu'il obtiendrait une « confidentialité post-quantique complète » comme effet secondaire, en déplaçant la livraison des paiements hors chaîne et en utilisant un échange de clés post-quantique. Sa bibliothèque de données porteuses de preuves, Ragu, est décrite comme étant « toujours en construction ». Voir [Projet Tachyon](/zcash-tech/project-tachyon).
- **Un Zcash entièrement post-quantique.** Des preuves, signatures et engagements post-quantiques réunis. Suivi dans [zips#1134](https://github.com/zcash/zips/issues/1134), ouvert depuis 2016. Il n'existe ni spécification ni calendrier.

<br/>

## Tableau d'état

Dernière vérification le 13 septembre 2026. Le statut dans l'en-tête d'un ZIP et son statut sur le réseau sont deux choses différentes : ZIP 2005 indique toujours « Proposed » dans son en-tête, bien que ses règles soient appliquées sur Mainnet depuis juillet 2026.

| Élément | Statut ZIP | Statut du réseau | Date | Source |
|---|---|---|---|---|
| Pool Ironwood avec des notes récupérables face au quantique (NU6.3) | ZIP 2005 Proposed, ZIP 229 et ZIP 258 Draft | **Activé** sur Mainnet | 28 juil. 2026, bloc 3 428 143 | [ZIP 2005](https://zips.z.cash/zip-2005), [ZIP 258](https://zips.z.cash/zip-0258) |
| Orchard fermé aux nouvelles valeurs | ZIP 2006 Reserved, règles dans ZIP 258 | **Activé** sur Mainnet | 28 juil. 2026 | [ZIP 258](https://zips.z.cash/zip-0258) |
| Wallets déplaçant les fonds vers Ironwood | Recommandations dans ZIP 2005, ZIP 318 et ZIP 326 (Draft) | Recommandé, dépend de votre wallet | Depuis le 28 juil. 2026 | [ZIP 318](https://zips.z.cash/zip-0318), [ZIP 326](https://zips.z.cash/zip-0326) |
| Protocole de récupération | Esquissé uniquement dans ZIP 2005 | **Non implémenté** | Aucune date | [ZIP 2005](https://zips.z.cash/zip-2005) |
| Désactivation de Orchard et Sapling | Aucun ZIP | **Non planifiée** | Discussion Sapling depuis avr. 2026 | [Forum](https://forum.zcashcommunity.com/t/sapling-withdraw-only-discussion-kickoff/55223) |
| Désactivation des dépenses Sprout (ZIP 2003) | Draft, candidat NU7 | **Non activée** | Aucune date | [ZIP 2003](https://zips.z.cash/zip-2003) |
| Récupérabilité transparente (ZIP 2007) | Reserved | **Proposition** | ZIP réservé le 5 juil. 2025, discussion ouverte le 17 juin 2026 | [zips#1302](https://github.com/zcash/zips/issues/1302) |
| Confidentialité post-quantique pour les adresses connues | Issues ouvertes, aucun ZIP | **Recherche** | #1133 ouvert le 18 août 2022, #1307 ouvert le 23 juin 2026 | [zips#1133](https://github.com/zcash/zips/issues/1133), [zips#1307](https://github.com/zcash/zips/issues/1307) |
| Projet Tachyon | Aucun ZIP | **Proposition**, en développement | Première publication en avr. 2025 | [tachyon.z.cash](https://tachyon.z.cash/roadmap/) |
| Protocole entièrement post-quantique | Issue ouverte, aucun ZIP | **Travail futur** | #1134 ouvert le 28 mars 2016 | [zips#1134](https://github.com/zcash/zips/issues/1134) |

Dans les sondages d'opinion Zcash Foundation de NU7 (février 2026), la récupérabilité quantique a reçu 90,5 % de soutien de la part de ZCAP et 94,6 % de la part des détenteurs de pièces, et Tachyon a reçu un soutien presque universel. Il s'agissait de sondages d'opinion, non de décisions sur ce qui sera intégré à NU7.

<br/>

## Ce que vous pouvez faire maintenant

- **Déplacez vos fonds vers Ironwood.** Les notes Sapling et Orchard ne seront jamais récupérables. Déplacer de la valeur entre les pools révèle le montant sur la chaîne ; ZIP 318 demande donc aux wallets de diviser les soldes en montants fixes et de les envoyer progressivement au fil du temps. Laissez votre wallet le faire plutôt que de tout déplacer d'un coup.
- **Ne publiez pas d'adresses protégées dont vous n'avez pas besoin.** La confidentialité face à un futur attaquant quantique dépend du fait qu'il ne connaisse pas votre adresse. Les adresses unifiées sont peu coûteuses à générer ; donnez-en une nouvelle à chaque payeur. ZIP 229 recommande la rotation des adresses pour cette raison.
- **Ne réutilisez pas les adresses transparentes.** Une fois que vous dépensez depuis une adresse, sa clé publique reste sur la chaîne pour toujours.
- **Protégez votre phrase de récupération.** Dans le protocole de récupération tel qu'il est esquissé, une dépense de récupération doit prouver que vous connaissez votre clé de dépense, et les wallets normaux dérivent cette clé de la phrase de récupération.
- **Ignorez les affirmations selon lesquelles « Zcash résiste au quantique ».** Ce n'est pas encore le cas, et les auteurs des spécifications le disent eux-mêmes.

<br/>

## Malentendus fréquents

- **« Ironwood est post-quantique. »** Non. Il utilise la même cryptographie Orchard, et ZIP 2005 indique que cette fonctionnalité « ne rend pas le protocole Orchard sécurisé contre les attaques quantiques ».
- **« Récupérable face au quantique signifie être à l'abri des ordinateurs quantiques aujourd'hui. »** Non. Cela signifie que les fonds Ironwood pourraient être récupérés après un futur basculement, à condition que ce basculement ait lieu à temps.
- **« Les Zcash protégés sont déjà privés face au quantique. »** Seulement lorsque l'attaquant ne connaît pas votre adresse. Les adresses connues sont exposées dans chaque pool.
- **« Tachyon a déjà ajouté la confidentialité post-quantique. »** Tachyon est une proposition. Rien de cela n'est actif.
- **« Les ordinateurs quantiques cassent chaque partie de Zcash. »** Les fonctions de hash sont seulement affaiblies, et non cassées, par les attaques quantiques connues. La récupérabilité quantique repose précisément sur cette différence.

<br/>

## Pages connexes

- [Sécurité post-quantique dans Zcash](/zcash-tech/post-quantum-security)
- [Ironwood](/zcash-tech/ironwood)
- [Le tourniquet](/zcash-tech/the-turnstile)
- [Projet Tachyon](/zcash-tech/project-tachyon)
- [FROST](/zcash-tech/frost)
- [Pools protégés](/using-zcash/shielded-pools)

<br/>

## Sources

- [ZIP 2005 : Ironwood Récupérabilité quantique](https://zips.z.cash/zip-2005)
- [ZIP 229 : Format de transaction version 6](https://zips.z.cash/zip-0229)
- [ZIP 258 : Déploiement de la mise à niveau réseau NU6.3](https://zips.z.cash/zip-0258)
- [ZIP 318 : Migration de Orchard vers Ironwood](https://zips.z.cash/zip-0318)
- [ZIP 326 : Conséquences de NU6.3 pour les wallets](https://zips.z.cash/zip-0326)
- [ZIP 2003 : Interdire les transactions de version 4](https://zips.z.cash/zip-2003)
- [ZIP 209 : Interdire les soldes négatifs des pools de valeur protégés de la chaîne](https://zips.z.cash/zip-0209)
- [zips#1302 : Récupérabilité quantique d'un sous-ensemble du protocole transparent](https://github.com/zcash/zips/issues/1302)
- [zips#1133 : Confidentialité post-quantique pour Zcash](https://github.com/zcash/zips/issues/1133)
- [zips#1307 : Confidentialité de Zcash face aux adversaires quantiques et capables de casser les logarithmes discrets](https://github.com/zcash/zips/issues/1307)
- [zips#1134 : Zcash entièrement post-quantique](https://github.com/zcash/zips/issues/1134)
- [Feuille de route du projet Tachyon](https://tachyon.z.cash/roadmap/)
- [NU7 Résultats du sondage : ce que nous avons entendu et où nous allons à partir de là](https://forum.zcashcommunity.com/t/nu7-polling-results-what-we-heard-and-where-we-go-from-here/54775)
- [Bloc 3 428 143 sur Blockchair](https://blockchair.com/zcash/block/3428143)
- [Demande sur le forum : Zcash est-il post-quantique ?](https://forum.zcashcommunity.com/t/is-zcash-post-quantum-help-wanted-d-proposal/57154)
