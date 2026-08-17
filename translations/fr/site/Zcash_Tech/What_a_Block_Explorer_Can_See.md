<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/What_a_Block_Explorer_Can_See.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Ce qu’un explorateur de blocs peut voir sur Zcash

## TL;DR

- Sur Bitcoin, un explorateur de blocs montre tout : l’expéditeur, le destinataire et le montant.
- Sur Zcash, cela n’est vrai que pour l’activité transparente (adresse t).
- Un explorateur peut voir l’argent entrer et sortir du pool protégé, mais pas ce qui s’y passe à l’intérieur.
- Les transactions entièrement protégées (z vers z) ne révèlent ni expéditeur, ni destinataire, ni montant.
- Tout chiffre public sur le « shield rate » constitue un minimum, car l’activité entièrement privée est invisible depuis l’extérieur.

---

## Deux types d’adresses

Zcash possède deux types d’adresses.

Une **adresse transparente** commence par `t` et fonctionne comme une adresse Bitcoin. Les soldes et les paiements sont publics.

Une **adresse protégée** commence par `z` et est protégée par des preuves à divulgation nulle de connaissance. Le réseau peut confirmer qu’un paiement protégé est valide sans révéler l’expéditeur, le destinataire ou le montant.

Comme il existe deux types d’adresses, la valeur peut circuler de quatre façons : transparente vers transparente (t vers t), transparente vers protégée (t vers z, appelé shielding), protégée vers transparente (z vers t, appelé deshielding), et protégée vers protégée (z vers z, entièrement privé).

## Ce qu’un explorateur peut voir

Un explorateur public comme [Blockchair](https://blockchair.com/zcash) peut clairement lire :

- Tout paiement entièrement transparent (t vers t), de bout en bout.
- L’argent entrant dans le pool protégé (le côté transparent et le montant).
- L’argent sortant du pool protégé (le côté transparent et le montant).
- Le total de ZEC détenu dans chaque pool protégé, ce qui est public afin que le réseau puisse prouver qu’aucune pièce n’a été créée à partir de rien.

En bref, les bords du pool protégé sont visibles. Vous pouvez voir la valeur y entrer et en sortir.

## Ce qu’un explorateur ne peut pas voir

Un explorateur public ne peut pas lire :

- Les transactions entièrement protégées (z vers z). L’expéditeur, le destinataire et le montant restent cachés.
- L’expéditeur ou le destinataire derrière tout paiement protégé.
- Le solde d’une adresse protégée individuelle.
- Ce qu’il advient des fonds une fois qu’ils sont à l’intérieur du pool.

Si vous interrogez les données brutes, les champs de l’expéditeur et du destinataire protégés reviennent vides. L’explorateur ne cache pas cela par choix. Ces informations n’ont jamais figuré sur la chaîne publique sous une forme lisible. Elles sont chiffrées, et seule une personne disposant de la bonne Viewing Key peut les lire.

## Pourquoi c’est important

**Votre vie privée vient de la cryptographie, pas de la confiance accordée à une entreprise.** Un fournisseur de données ne peut pas regarder à l’intérieur d’une transaction protégée, même s’il le souhaite.

**Les chiffres publics du shield rate sous-estiment la confidentialité.** Les chercheurs ne peuvent mesurer que ce qui franchit la frontière publique, donc la quantité réelle d’activité privée est au moins égale à ce qu’ils rapportent, et généralement supérieure.

**Un pool protégé plus grand protège tout le monde.** Plus il y a de personnes qui utilisent des adresses protégées, plus la foule dans laquelle se dissimule un paiement privé individuel est grande. Utiliser une adresse protégée vous aide à vous protéger, vous, ainsi que toutes les autres personnes dans le pool.

## Mettez-le en pratique

- Utilisez un wallet qui utilise par défaut des adresses protégées, comme [ZODL](https://zodl.com) ou [Ywallet](https://ywallet.app/).
- Lorsque vous recevez des ZEC sur une adresse transparente, déplacez-les vers une adresse protégée avant de les dépenser.
- Payez vers des adresses protégées lorsque c’est possible. Chaque paiement transparent est entièrement public ; un paiement protégé ne l’est pas.

## Ressources

- [Zcash : recommandations de confidentialité et de sécurité](https://z.cash/support/security/privacy-security-recommendations/)
- [Un écosystème protégé (Electric Coin Company)](https://electriccoin.co/blog/shielded-ecosystem/)
- [Comment fonctionne la technologie Zcash](https://z.cash/technology/)
- [Explorateur Zcash de Blockchair](https://blockchair.com/zcash)

## Pages associées

- [Les bases de Zcash](/start-here/what-is-zec-and-zcash)
- [Wallets](/using-zcash/wallets)
- [Pools protégés](/using-zcash/shielded-pools)
- [ZK-SNARKs](/zcash-tech/zk-snarks)

---

*Si vous souhaitez ajouter ou proposer des modifications à cette page du wiki, rendez-vous sur le [repo GitHub de ZecHub](https://github.com/ZecHub/zechub) et soumettez une pull request.*
