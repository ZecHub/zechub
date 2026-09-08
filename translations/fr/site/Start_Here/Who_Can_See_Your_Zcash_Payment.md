<a href="https://github.com/zechub/zechub/edit/main/site/Start_Here/Who_Can_See_Your_Zcash_Payment.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Qui peut voir votre paiement Zcash ?

## En bref

- Zcash vous offre **deux types d’adresse** : transparentes (`t`) et protégées (`z` ou `u`).
- Ce que le public peut voir dépend du type d’adresses entre lesquelles votre paiement circule.
- Seul un paiement **protégé vers protégé** masque l’expéditeur, le destinataire et le montant.
- Une adresse protégée n’est pas une seule clé. C’est un petit ensemble de clés, et vous pouvez fournir un **accès en lecture seule sans donner la possibilité de dépenser**.
- Une viewing key **ne peut pas être retirée** une fois que vous l’avez partagée.

---

## La première chose à comprendre

Sur la plupart des blockchains, il n’y a pas de choix à faire. Tout ce que vous envoyez est public, pour toujours, pour toute personne qui regarde.

Zcash vous donne au contraire le choix. Ce choix se fait deux fois : **une première fois lorsque vous choisissez à quelle adresse envoyer, et une seconde fois lorsque vous décidez qui reçoit une clé pour lire votre historique.**

L’illustration ci-dessous couvre les deux.

![Types de clés Zcash et ce qu’un explorateur de blocs peut voir pour chacun des quatre chemins de transaction](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Start_Here/assets/who-can-see-your-zcash-payment.png)

---

## Premier choix : quelle adresse

Chaque paiement Zcash circule entre deux adresses, et chacune peut être transparente ou protégée. Cela donne quatre chemins, et chacun laisse fuiter une quantité différente d’informations.

Le principe est plus simple qu’il n’y paraît : **tout ce qui touche une adresse transparente devient public.** Un paiement qui reste entièrement dans la réserve protégée ne révèle rien, à part les frais.

C’est particulièrement important lorsque vous retirez des fonds d’un exchange. De nombreux exchanges n’envoient que vers des adresses transparentes, donc le retrait est public. Protégez vous-même les fonds dès leur arrivée, avant de les dépenser.

Pour un examen plus approfondi de ce qu’un explorateur lit exactement, consultez [Ce qu’un explorateur de blocs peut voir](/zcash-tech/what-a-block-explorer-can-see).

---

## Deuxième choix : qui reçoit une clé

Une confidentialité qu’on ne peut jamais lever n’est pas utile. Il arrive que vous ayez besoin de prouver quelque chose à un comptable, à un auditeur ou à l’administration fiscale. Zcash gère cela sans vous demander de renoncer au contrôle.

**Clé de dépense.** Voit tout et déplace les fonds. C’est l’argent. Elle reste avec vous et n’est jamais partagée avec qui que ce soit, pour aucune raison.

**Full viewing key.** Lecture seule. Elle montre l’activité entrante et sortante ainsi que les soldes, mais ne permet pas de dépenser un seul zatoshi. C’est ce que vous remettez à un auditeur ou à un comptable.

**Incoming viewing key.** Encore plus restreinte : elle ne montre que les paiements entrants. Un exchange ou un commerçant peut l’utiliser pour confirmer que votre dépôt est bien arrivé, tandis que la clé de dépense reste sur un matériel qui ne touche jamais Internet.

L’ordre a son importance. Donnez la clé la plus restreinte qui permet d’accomplir la tâche, pas la plus large que vous avez sous la main.

---

## La partie que les débutants manquent souvent

**Une viewing key ne peut pas être révoquée.** Il n’existe pas de bouton « annuler le partage ». Une fois que quelqu’un l’a, cette personne peut lire cette adresse aussi longtemps qu’elle existe. Si vous devez couper l’accès, vous déplacez vos fonds vers une nouvelle adresse.

**Les frais sont publics même dans un paiement entièrement protégé.** Le montant est masqué ; les frais ne le sont pas.

**Ce qui est public l’est de façon permanente.** Tout ce que la chaîne montre aujourd’hui, elle le montrera encore dans vingt ans. Décider de protéger un paiement *après* l’avoir envoyé n’est pas quelque chose que vous pouvez faire.

---

## Passez à la pratique

- Utilisez un wallet qui protège par défaut, comme [Zodl](https://zodl.com) ou [Ywallet](https://ywallet.app/).
- Protégez les fonds dès leur arrivée depuis un exchange, avant de les dépenser.
- Payez vers des adresses protégées chaque fois que le destinataire en prend en charge une.
- Avant de partager une viewing key, demandez quelle est la plus petite clé qui permet de répondre à la question posée.

---

## Ressources

- [Explication des viewing keys (Electric Coin Company)](https://electriccoin.co/blog/explaining-viewing-keys/)
- [Divulgation sélective et viewing keys (Electric Coin Company)](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ZIP 310 : Viewing keys](https://zips.z.cash/zip-0310)
- [Comment fonctionne la technologie Zcash](https://z.cash/technology/)

## Pages connexes

- [Les bases de Zcash](/start-here/what-is-zec-and-zcash)
- [Guide Zcash pour les nouveaux utilisateurs](/start-here/new-user-guide)
- [Ce qu’un explorateur de blocs peut voir](/zcash-tech/what-a-block-explorer-can-see)
- [Viewing keys](/zcash-tech/viewing-keys)
- [Transactions](/using-zcash/transactions)

---

*Si vous souhaitez ajouter ou proposer des modifications à cette page du wiki, rendez-vous sur le [dépôt GitHub de ZecHub](https://github.com/ZecHub/zechub) et soumettez une pull request.*
