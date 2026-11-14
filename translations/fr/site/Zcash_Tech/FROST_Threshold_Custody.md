<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/FROST_Threshold_Custody.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# FROST et garde à seuil pour les ZEC protégés

> Pour tous les détails cryptographiques du protocole FROST, consultez la [page technique FROST](FROST.md).

La garde à seuil FROST revient sans cesse dans les discussions autour de Zcash : c'était la catégorie phare du Hackathon ZecHub 2026. Pourtant, le concept n'est pas toujours expliqué en termes simples. Cette page explique ce qu'elle signifie, dans quels cas vous en avez réellement besoin, quels compromis elle implique et quels outils la prennent en charge aujourd'hui.

---

## En bref

- **FROST** permet à un groupe de détenteurs de clés de contrôler collectivement une adresse Zcash protégée sans qu'aucune personne ne détienne à elle seule la clé privée complète.
- Un seuil **t-sur-n** signifie que t personnes doivent cosigner pour dépenser ; t-1 personnes ou moins ne peuvent pas déplacer les fonds seules.
- Les transactions ressemblent à n'importe quelle autre transaction protégée : aucune trace on-chain ne révèle qu'une signature à seuil a été utilisée.
- C'est fondamentalement différent de la multisignature transparente (publique on-chain, et prise en charge depuis longtemps par Zcash) : FROST fonctionne à l'intérieur du pool protégé.
- C'est utile pour les DAO, les exchanges, les services de garde, l'épargne commune et les trésoreries d'équipe, partout où un point de défaillance unique au niveau des clés est inacceptable.

---

## Qu'est-ce que FROST, en termes simples ?

Imaginez trois associés qui détiennent chacun un morceau d'une clé. Pour dépenser depuis leur portefeuille commun, deux des trois doivent se mettre d'accord et cosigner. La transaction obtenue est identique à un envoi individuel ordinaire : aucun observateur ne peut déduire de la blockchain que plusieurs personnes y ont participé.

FROST (**Flexible Round-Optimized Schnorr Threshold Signatures**) est le protocole cryptographique qui rend cela possible pour les Zcash protégés. Il a été créé par Chelsea Komlo (Université de Waterloo / Zcash Foundation) et Ian Goldberg.

Ses propriétés essentielles :

- **Seuil** : seuls t signataires sur n doivent participer (p. ex. 2 sur 3, 3 sur 5)
- **Protégé** : fonctionne à l'intérieur du pool de confidentialité Orchard ; les montants, l'expéditeur et le destinataire restent confidentiels
- **Indiscernable** : la signature finale ressemble à celle de n'importe quelle autre transaction protégée Zcash
- **Non dépositaire** : aucune partie ne détient jamais la clé complète, pas même le coordinateur

---

## Quand utiliser la garde à seuil ?

La garde à seuil est pertinente lorsque **la perte d'une clé ou d'une personne ne doit pas entraîner la perte des fonds**.

| Situation | Pourquoi la garde à seuil est utile |
|-----------|----------------------------|
| **DAO ou trésorerie d'équipe** | Aucun administrateur ne peut vider les fonds unilatéralement ; un consensus est requis |
| **Exchange ou dépositaire** | Répartit le risque lié aux clés entre plusieurs zones de sécurité ou employés |
| **Stockage à froid personnel (avec des proches de confiance)** | 2 sur 3 entre vous et deux membres de votre famille : en cas de décès ou de perte d'accès, les fonds ne sont pas perdus |
| **Séquestre** | L'acheteur, le vendeur et l'arbitre détiennent chacun une part ; les fonds sont libérés lorsque deux d'entre eux sont d'accord |
| **Versement de subventions importantes** | À la manière de ZCG : plusieurs signataires indépendants sont requis avant tout paiement |
| **Gestion des clés des développeurs** | Prévient la menace interne : aucun ingénieur ne peut vider seul les fonds d'un protocole |

Vous n'avez probablement **pas** besoin de la garde à seuil pour un portefeuille personnel que vous contrôlez seul, pour de petits montants, ou lorsque la charge de coordination supplémentaire l'emporte sur la réduction du risque.

---

## En quoi diffère-t-elle de la multisignature transparente ?

Zcash prend en charge depuis longtemps la multisignature transparente, qui exige plusieurs clés pour dépenser depuis une adresse t. Mais la multisignature transparente a un coût important en matière de confidentialité : **la structure multisignature, toutes les clés publiques et tous les signataires sont visibles sur la blockchain**.

FROST résout ce problème en fonctionnant à l'intérieur du pool protégé :

| | Multisignature transparente | Seuil FROST (protégé) |
|--|---------------------|--------------------------|
| Pool | Transparent (public) | Orchard (protégé) |
| Signataires visibles on-chain | Oui : toutes les clés publiques sont exposées | Non : indiscernable d'une dépense à signataire unique |
| Montants visibles | Oui | Non |
| Coordination requise | Script on-chain | Échange de messages hors chaîne |
| Confidentialité | Aucune | Confidentialité protégée complète |

---

## Compromis et limites

FROST est puissant, mais implique de réels compromis que vous devez comprendre avant de l'utiliser :

### Charge de coordination
Les signataires doivent être en ligne simultanément (ou presque) pour mener à bien une session de signature. Si vos t signataires sont répartis sur plusieurs fuseaux horaires ou disposent de connexions peu fiables, chaque dépense exige une coordination dont un portefeuille individuel se passe.

### Aucune signature possible sans quorum
Si trop de détenteurs de clés sont indisponibles (malades, en voyage, injoignables), les fonds sont temporairement impossibles à dépenser. Choisissez soigneusement votre seuil et le nombre de parts : 2 sur 3 est plus résilient que 2 sur 2.

### Cérémonie de génération des clés
La mise en place de FROST nécessite une cérémonie de génération distribuée de clés (DKG) au cours de laquelle les n participants sont en ligne ensemble. Il s'agit d'un événement unique, mais il doit être mené avec soin : si des participants sont compromis pendant la DKG, la sécurité est affaiblie.

### Des outils encore en maturation
FROST pour les Zcash protégés est relativement récent. La norme de l'IETF (draft-irtf-cfrg-frost) est mature, mais les intégrations dans les portefeuilles restent limitées. Attendez-vous à quelques imperfections par rapport à un portefeuille standard à clé unique.

### Complexité de la récupération
Perdre une part n'est pas une catastrophe (c'est tout l'intérêt du seuil), mais les plans de récupération doivent être documentés à l'avance. Qui détient les sauvegardes ? Que se passe-t-il si deux parts sont perdues simultanément ?

---

## Qui développe avec FROST sur Zcash ?

### Zcash Foundation — frost.zfnd.org
La Zcash Foundation a publié une implémentation fonctionnelle de FROST ainsi qu'un site de démonstration. Il s'agit de l'implémentation de référence utilisée pour les tests et le développement.

### Démo Ywallet FROST
Ywallet disposait d'une première intégration de démonstration de FROST, présentée pas à pas dans le [guide de la démo Ywallet FROST](/guides/Ywallet_FROST_Demo). Ywallet n'est plus maintenu et ne sera pas mis à jour pour Ironwood : lisez donc ce guide à titre de contexte plutôt que comme une procédure à suivre aujourd'hui. Zkool, du même développeur, en est le successeur maintenu et compte la multisignature FROST parmi ses fonctionnalités.

### Hackathon ZecHub 2026 — projets de la catégorie FROST

La catégorie FROST a été la plus disputée du Hackathon ZecHub 2026. Projets notables :

- **ZecVault** — séquestre protégé 2 sur 3 réglé sur le réseau principal (seuil FROST)
- **Steward** — garde à seuil pour les Zcash protégés, avec une expérience utilisateur axée sur la récupération

### Coinbase
Coinbase a développé une implémentation de production de FROST pour ses systèmes de signature à seuil (pour Bitcoin), avec des modifications qui suppriment l'étape de prétraitement et répartissent le rôle d'agrégateur entre tous les participants. Son expérience valide le modèle de sécurité de FROST à l'échelle de la production.

---

## Comment se déroule une session de signature (version simplifiée)

1. **Mise en place (une seule fois) :** les n participants mènent une cérémonie de génération distribuée de clés (DKG). Chacun obtient une part privée ; une clé publique commune en est dérivée. Aucune partie ne connaît la clé privée complète.

2. **Coordination des signataires :** lorsqu'une dépense est nécessaire, un coordinateur (qui peut être l'un des signataires) recueille les engagements de t participants disposés à signer.

3. **Tour 1 :** chaque signataire participant génère un nonce et diffuse un engagement (public, non sensible).

4. **Tour 2 :** chaque signataire participant calcule sa signature partielle à l'aide de sa part privée et la diffuse.

5. **Agrégation :** le coordinateur combine les t signatures partielles en une signature Schnorr finale, indiscernable on-chain d'une signature à partie unique.

6. **Diffusion :** la transaction est diffusée sur le réseau Zcash comme d'habitude.

Si un signataire envoie une signature partielle invalide, le protocole l'identifie et s'interrompt (le signataire est exclu des sessions suivantes). La coordination a lieu hors chaîne : la blockchain ne voit que la transaction finale.

---

## Choisir vos paramètres de seuil

| Configuration | Résilience | Risque |
|-------|-----------|------|
| 1 sur 1 | Aucune résilience : point de défaillance unique | Perte de la clé = perte définitive |
| 2 sur 2 | Les deux signataires sont indispensables : aucune tolérance aux pannes | Un signataire indisponible = fonds gelés |
| 2 sur 3 | Une part peut être perdue ou indisponible | Marge de sécurité inférieure à 3 sur 5 |
| 3 sur 5 | Deux parts peuvent être perdues ; sécurité élevée | Charge de coordination plus importante |
| 3 sur 7 | Niveau institutionnel ; tolère deux défaillances | Coût de coordination élevé |

Un point de départ pratique pour la plupart des équipes : **2 sur 3** (résilient, coordination minimale) ou **3 sur 5** (institutionnel, sécurité accrue).

---

## Pages connexes

- [FROST — analyse technique approfondie](FROST.md) — détails cryptographiques du protocole (DKG, tours de signature, preuves de sécurité)
- [Guide de la démo Ywallet FROST](/guides/Ywallet_FROST_Demo) — contexte, Ywallet n'est plus maintenu
- [Clés pour lecture seule](Viewing_Keys.md) — accès en lecture seule aux adresses protégées (complémentaire de la garde à seuil)
- [Actifs protégés Zcash](Zcash_Shielded_Assets.md) — FROST est également une infrastructure clé pour l'émission de ZSA

## Ressources

- [Article de recherche sur FROST (Komlo & Goldberg, 2020)](https://eprint.iacr.org/2020/852.pdf)
- [Projet de norme FROST de l'IETF (draft-irtf-cfrg-frost)](https://datatracker.ietf.org/doc/draft-irtf-cfrg-frost/)
- [Implémentation FROST de la Zcash Foundation](https://frost.zfnd.org)
- [Chelsea Komlo — Que sont les signatures à seuil ? (Zcon3)](https://youtu.be/cAfTTfblzoU?t=110)
- [Coinbase — Signatures numériques à seuil](https://www.coinbase.com/blog/threshold-digital-signatures)
- [ROAST — Robust Async Schnorr Threshold Signatures (Blockstream)](https://eprint.iacr.org/2022/550.pdf)
