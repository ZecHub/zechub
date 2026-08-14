<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/FROST_Threshold_Custody.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifier la page"/>
</a>

# FROST et la garde à seuil pour les ZEC protégés

> Pour les détails cryptographiques complets du protocole FROST, voir la [page technique de FROST](FROST.md).

La garde à seuil FROST revient souvent dans les discussions sur Zcash — c’était le thème principal du ZecHub Hackathon 2026 — mais le concept n’est pas toujours expliqué en langage clair. Cette page explique ce que cela signifie, quand vous en avez réellement besoin, les compromis, et quels outils le prennent en charge aujourd’hui.

---

## En bref

- **FROST** permet à un groupe de détenteurs de clés de contrôler collectivement une adresse Zcash protégée sans qu’aucune personne ne détienne la clé privée complète.
- Un seuil **t-sur-n** signifie : t personnes doivent cosigner pour dépenser ; n’importe quel groupe de t-1 personnes ou moins ne peut pas déplacer les fonds seul.
- Les transactions ressemblent à n’importe quelle autre transaction protégée — aucune empreinte on-chain ne révèle qu’une signature à seuil a été utilisée.
- Cela est fondamentalement différent du multisig transparent (qui est public on-chain et que Zcash prend en charge depuis longtemps) — FROST fonctionne à l’intérieur du pool protégé.
- C’est utile pour les DAO, les exchanges, les services de garde, l’épargne commune et les trésoreries d’équipe — partout où un point unique de défaillance de clé est inacceptable.

---

## Qu’est-ce que FROST en langage clair ?

Imaginez que trois associés détiennent chacun une partie d’une clé. Pour dépenser depuis leur wallet commun, deux des trois doivent être d’accord et cosigner. La transaction résultante paraît identique à un envoi individuel classique — aucun observateur ne peut voir sur la blockchain que plusieurs personnes étaient impliquées.

FROST (**Flexible Round-Optimized Schnorr Threshold Signatures**) est le protocole cryptographique qui rend cela possible pour Zcash protégé. Il a été créé par Chelsea Komlo (University of Waterloo / Zcash Foundation) et Ian Goldberg.

Les propriétés clés :

- **Seuil** : seuls t signataires sur n doivent participer (par ex. 2-sur-3, 3-sur-5)
- **Protégé** : fonctionne dans le pool de confidentialité Orchard — les montants, l’expéditeur et le destinataire restent privés
- **Indiscernable** : la signature finale ressemble à n’importe quelle autre transaction Zcash protégée
- **Non-custodial** : aucune partie ne détient jamais la clé complète — pas même le coordinateur

---

## Quand faut-il utiliser la garde à seuil ?

La garde à seuil a du sens lorsque **perdre une clé ou perdre une personne ne doit pas signifier perdre les fonds**.

| Situation | Pourquoi la garde à seuil aide |
|-----------|----------------------------|
| **Trésorerie de DAO ou d’équipe** | Aucun administrateur unique ne peut vider les fonds unilatéralement ; un consensus est requis |
| **Exchange ou dépositaire** | Répartit le risque lié aux clés entre plusieurs zones de sécurité ou employés |
| **Stockage à froid personnel (avec une famille de confiance)** | 2-sur-3 entre vous + deux membres de la famille — en cas de décès ou de perte d’accès, les fonds ne sont pas perdus |
| **Escrow** | L’acheteur, le vendeur et l’arbitre détiennent chacun une part ; les fonds sont libérés quand deux sont d’accord |
| **Décaissement de subvention à forte valeur** | Style ZCG : exige plusieurs signataires indépendants avant tout paiement |
| **Gestion des clés des développeurs** | Empêche la menace interne — aucun ingénieur seul ne peut vider un fonds de protocole |

Vous n’avez probablement **pas** besoin de garde à seuil pour un wallet personnel que vous contrôlez seul, de petits montants, ou des situations où la surcharge de coordination dépasse la réduction du risque.

---

## En quoi cela diffère-t-il du multisig transparent ?

Zcash prend en charge depuis longtemps le multisig transparent — plusieurs clés requises pour dépenser depuis une t-address. Mais le multisig transparent a un coût important en matière de confidentialité : **la structure multisig, toutes les clés publiques et tous les signataires sont visibles sur la blockchain**.

FROST résout cela en opérant à l’intérieur du pool protégé :

| | Multisig transparent | Seuil FROST (protégé) |
|--|---------------------|--------------------------|
| Pool | Transparent (public) | Orchard (protégé) |
| Signataires visibles on-chain | Oui — toutes les clés publiques sont exposées | Non — indiscernable d’une dépense à signataire unique |
| Montants visibles | Oui | Non |
| Coordination requise | Script on-chain | Tour de communication off-chain |
| Confidentialité | Aucune | Confidentialité protégée complète |

---

## Compromis et limites

FROST est puissant, mais il comporte de vrais compromis que vous devez comprendre avant de l’utiliser :

### Surcharge de coordination
Les signataires doivent être en ligne simultanément (ou presque) pour terminer un tour de signature. Si vos t signataires sont répartis sur plusieurs fuseaux horaires ou ont des connexions peu fiables, dépenser exige une coordination qu’un wallet individuel n’a pas.

### Aucune signature si le quorum n’est pas disponible
Si un nombre suffisant de détenteurs de clés n’est pas disponible (malades, en voyage, non réactifs), les fonds sont temporairement impossibles à dépenser. Choisissez soigneusement votre seuil et le nombre de parts — 2-sur-3 est plus résilient que 2-sur-2.

### Cérémonie de génération de clé
La mise en place de FROST nécessite une cérémonie de génération distribuée de clé (DKG) où les n participants sont tous en ligne ensemble. C’est un événement unique, mais il doit être réalisé avec soin — si des participants sont compromis pendant le DKG, la sécurité est affaiblie.

### Les outils sont encore en maturation
FROST pour Zcash protégé est relativement nouveau. Le standard IETF (draft-irtf-cfrg-frost) est mature, mais les intégrations dans les wallets sont limitées. Attendez-vous à quelques aspérités par rapport à un wallet standard à clé unique.

### Complexité de récupération
Perdre un fragment n’est pas la fin du monde (c’est justement l’intérêt du seuil), mais les plans de récupération doivent être documentés à l’avance. Qui détient les sauvegardes ? Que se passe-t-il si deux fragments sont perdus simultanément ?

---

## Qui construit avec FROST sur Zcash ?

### Zcash Foundation — frost.zfnd.org
La Zcash Foundation a livré une implémentation FROST fonctionnelle ainsi qu’un site de démonstration. C’est l’implémentation de référence utilisée pour les tests et le développement.

### Démo FROST de YWallet
YWallet (un wallet Zcash haute performance) dispose d’une intégration de démonstration FROST précoce. Voir le [guide de démo FROST de YWallet](/guides/Ywallet_FROST_Demo) pour des instructions étape par étape.

### ZecHub Hackathon 2026 — Projets de la piste FROST

La piste FROST a été la plus compétitive du ZecHub Hackathon 2026. Projets notables :

- **ZecVault** — escrow protégé 2-sur-3 réglé sur le mainnet (seuil FROST)
- **Steward** — garde à seuil pour Zcash protégé avec une UX axée sur la récupération

### Coinbase
Coinbase a construit une implémentation FROST de production pour ses systèmes de signature à seuil (pour Bitcoin), avec des modifications qui suppriment l’étape de prétraitement et répartissent le rôle d’agrégateur entre tous les participants. Leur expérience valide le modèle de sécurité de FROST à l’échelle de la production.

---

## Comment fonctionne une session de signature (version simplifiée)

1. **Configuration (une seule fois) :** Les n participants exécutent une cérémonie de génération distribuée de clé (DKG). Chacun reçoit un fragment privé ; une clé publique partagée est dérivée. Aucune partie ne connaît la clé privée complète.

2. **Coordonner les signataires :** Lorsqu’une dépense est nécessaire, un coordinateur (qui peut être l’un des signataires) recueille les engagements de t participants prêts à signer.

3. **Round 1 :** Chaque signataire participant génère un nonce et diffuse un engagement (public, non sensible).

4. **Round 2 :** Chaque signataire participant calcule sa signature partielle à l’aide de son fragment privé et la diffuse.

5. **Agrégation :** Le coordinateur combine les t signatures partielles en une signature Schnorr finale — indiscernable on-chain d’une signature à partie unique.

6. **Diffusion :** La transaction est diffusée sur le réseau Zcash comme d’habitude.

Si un signataire envoie une mauvaise signature partielle, le protocole l’identifie et s’interrompt (il est exclu des sessions futures). La coordination se fait off-chain — la blockchain ne voit que la transaction finale.

---

## Choisir vos paramètres de seuil

| Setup | Résilience | Risque |
|-------|-----------|------|
| 1-sur-1 | Aucune résilience — point unique de défaillance | Perte de clé = perte permanente |
| 2-sur-2 | Les deux signataires sont nécessaires — aucune tolérance aux pannes | Un indisponible = fonds bloqués |
| 2-sur-3 | Un fragment peut être perdu ou indisponible | Marge de sécurité plus faible que 3-sur-5 |
| 3-sur-5 | Deux fragments peuvent être perdus ; sécurité forte | Plus de surcharge de coordination |
| 3-sur-7 | Niveau institutionnel ; tolère deux défaillances | Coût de coordination élevé |

Un point de départ pratique pour la plupart des équipes : **2-sur-3** (résilient, coordination minimale) ou **3-sur-5** (institutionnel, sécurité plus élevée).

---

## Pages liées

- [FROST — Analyse technique approfondie](FROST.md) — détails cryptographiques du protocole (DKG, rounds de signature, preuves de sécurité)
- [Guide de démo FROST de YWallet](/guides/Ywallet_FROST_Demo) — démonstration pratique étape par étape
- [Démo FROST (frostdemo)](/guides/frostdemo) — guide pas à pas de la démo de la Zcash Foundation
- [Viewing Keys](Viewing_Keys.md) — accès en lecture seule aux adresses protégées (complémentaire à la garde à seuil)
- [Actifs protégés Zcash](Zcash_Shielded_Assets.md) — FROST est aussi une infrastructure clé pour l’émission de ZSA

## Ressources

- [Article de recherche FROST (Komlo & Goldberg, 2020)](https://eprint.iacr.org/2020/852.pdf)
- [Projet de standard IETF FROST (draft-irtf-cfrg-frost)](https://datatracker.ietf.org/doc/draft-irtf-cfrg-frost/)
- [Implémentation FROST de la Zcash Foundation](https://frost.zfnd.org)
- [Chelsea Komlo — Que sont les Threshold Signatures ? (Zcon3)](https://youtu.be/cAfTTfblzoU?t=110)
- [Coinbase — Signatures numériques à seuil](https://www.coinbase.com/blog/threshold-digital-signatures)
- [ROAST — Signatures à seuil Schnorr asynchrones robustes (Blockstream)](https://eprint.iacr.org/2022/550.pdf)
