<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/What_a_Block_Explorer_Can_See.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Ce qu'un explorateur de blocs peut voir sur Zcash

## En bref

- Sur Bitcoin, un explorateur de blocs montre tout : l'expéditeur, le destinataire et le montant.
- Sur Zcash, cela n'est vrai que pour l'activité transparente (adresses t).
- Un explorateur peut voir l'argent entrer dans le pool protégé et en sortir, mais pas ce qui se passe à l'intérieur.
- Les transactions entièrement protégées (de z à z) ne révèlent ni l'expéditeur, ni le destinataire, ni le montant.
- Tout chiffre public de « taux de protection » est un minimum, car l'activité entièrement confidentielle est invisible de l'extérieur.

---

## Deux types d'adresses

Zcash dispose de deux types d'adresses.

Une **adresse transparente** commence par `t` et fonctionne comme une adresse Bitcoin. Les soldes et les paiements sont publics.

Une **adresse protégée** commence par `z` et est protégée par des preuves à divulgation nulle de connaissance. Le réseau peut confirmer qu'un paiement protégé est valide sans révéler l'expéditeur, le destinataire ni le montant.

Comme il existe deux types d'adresses, la valeur peut circuler de quatre façons : de transparent à transparent (de t à t), de transparent à protégé (de t à z, ce qu'on appelle la protection), de protégé à transparent (de z à t, ce qu'on appelle la déprotection) et de protégé à protégé (de z à z, entièrement confidentiel).

## Ce qu'un explorateur peut voir

Un explorateur public tel que [ZecBlock](https://zecblock.com/) peut lire clairement :

- Tout paiement entièrement transparent (de t à t), de bout en bout.
- L'argent qui entre dans le pool protégé (le côté transparent et le montant).
- L'argent qui sort du pool protégé (le côté transparent et le montant).
- Le total de ZEC détenu dans chaque pool protégé, qui est public afin que le réseau puisse prouver qu'aucune pièce n'a été créée à partir de rien.

En résumé, les bords du pool protégé sont visibles. Vous pouvez observer la valeur qui y entre et qui en sort.

## Ce qu'un explorateur ne peut pas voir

Un explorateur public ne peut pas lire :

- Les transactions entièrement protégées (de z à z). L'expéditeur, le destinataire et le montant restent cachés.
- L'expéditeur ou le destinataire derrière un paiement protégé.
- Le solde d'une adresse protégée individuelle.
- Ce qu'il advient des fonds une fois qu'ils se trouvent dans le pool.

Si vous interrogez les données brutes, les champs de l'expéditeur et du destinataire protégés reviennent vides. L'explorateur ne cache pas ces informations par choix. Elles n'ont jamais figuré sur la chaîne publique sous une forme lisible. Ces informations sont chiffrées, et seule une personne disposant de la bonne clé pour lecture seule peut les lire.

## Pourquoi c'est important

**Votre confidentialité repose sur la cryptographie, et non sur la confiance accordée à une entreprise.** Un fournisseur de données ne peut pas voir l'intérieur d'une transaction protégée, même s'il le souhaite.

**Les chiffres publics du taux de protection sous-estiment la confidentialité.** Les chercheurs ne peuvent mesurer que ce qui franchit la frontière publique ; le volume réel d'activité confidentielle est donc au moins égal à ce qu'ils rapportent, et généralement supérieur.

**Un pool protégé plus grand protège tout le monde.** Plus il y a de personnes qui utilisent des adresses protégées, plus la foule dans laquelle chaque paiement confidentiel se cache est grande. Utiliser une adresse protégée contribue à vous protéger, vous et tous les autres membres du pool.

## Mettez-le en pratique

- Utilisez un portefeuille qui utilise par défaut des adresses protégées, comme [ZODL](https://zodl.com) ou [Zingo!](https://www.zingolabs.org/).
- Lorsque vous recevez des ZEC sur une adresse transparente, transférez-les vers une adresse protégée avant de les dépenser.
- Payez vers des adresses protégées lorsque vous le pouvez. Chaque paiement transparent est entièrement public ; un paiement protégé ne l'est pas.

## Ressources

- [Zcash : recommandations en matière de confidentialité et de sécurité](https://z.cash/support/security/privacy-security-recommendations/)
- [Un écosystème protégé (Electric Coin Company)](https://web.archive.org/web/20260903010654/https://electriccoin.co/blog/shielded-ecosystem/)
- [Comment fonctionne la technologie Zcash](https://z.cash/technology/)
- [ZecBlock](https://zecblock.com/)

## Pages associées

- [Les bases de Zcash](/start-here/what-is-zec-and-zcash)
- [Portefeuilles](/using-zcash/wallets)
- [Pools protégés](/using-zcash/shielded-pools)
- [zk-SNARKs](/zcash-tech/zk-snarks)

---

*Si vous souhaitez ajouter du contenu à cette page du wiki ou suggérer des modifications, rendez-vous sur le [dépôt ZecHub GitHub](https://github.com/ZecHub/zechub) et soumettez une pull request.*
