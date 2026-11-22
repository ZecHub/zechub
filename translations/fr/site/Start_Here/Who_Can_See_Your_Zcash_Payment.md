<a href="https://github.com/zechub/zechub/edit/main/site/Start_Here/Who_Can_See_Your_Zcash_Payment.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Qui peut voir votre paiement Zcash ?

## En bref

- Zcash vous offre **deux types d'adresse** : transparente (`t`) et protégée (`z` ou `u`).
- Ce que le public peut voir dépend des types d'adresse entre lesquels circule votre paiement.
- Seul un paiement **d'une adresse protégée vers une adresse protégée** masque l'expéditeur, le destinataire et le montant.
- Une adresse protégée ne correspond pas à une seule clé. Elle repose sur un petit ensemble de clés, et vous pouvez accorder **un accès en lecture seule sans céder la capacité de dépenser**.
- Une clé pour lecture seule **ne peut pas être reprise** une fois partagée.

---

## La première chose à comprendre

Sur la plupart des blockchains, il n'y a aucun choix à faire. Tout ce que vous envoyez est public, pour toujours, et visible par quiconque regarde.

Zcash, au contraire, vous laisse le choix. Ce choix se fait deux fois : **une première fois lorsque vous choisissez l'adresse vers laquelle envoyer, et une seconde fois lorsque vous décidez qui reçoit une clé permettant de lire votre historique.**

L'illustration ci-dessous couvre ces deux aspects.

![Types de clés Zcash et ce qu'un explorateur de blocs peut voir pour chacun des quatre parcours de transaction](/content-images/who-can-see-your-zcash-payment-04d41ac960.webp)

---

## Premier choix : quelle adresse

Chaque paiement Zcash circule entre deux adresses, et chacune peut être transparente ou protégée. Cela donne quatre trajets possibles, et chacun révèle une quantité d'informations différente.

Le principe est plus simple qu'il n'y paraît : **tout ce qui touche une adresse transparente devient public.** Un paiement qui reste dans le pool protégé du début à la fin ne révèle rien d'autre que les frais.

Cela compte surtout lorsque vous retirez des fonds d'un exchange. De nombreux exchanges n'envoient que vers des adresses transparentes, si bien que le retrait est public. Protégez vous-même les fonds dès leur arrivée, avant de les dépenser.

Pour savoir précisément ce qu'un explorateur peut lire, consultez [Ce qu'un explorateur de blocs peut voir](/zcash-tech/what-a-block-explorer-can-see).

---

## Second choix : qui reçoit une clé

Une confidentialité qu'il est impossible de lever n'est pas utile. Il vous arrive parfois de devoir prouver quelque chose à un comptable, à un auditeur ou à l'administration fiscale. Zcash gère cela sans vous demander de renoncer au contrôle.

**Clé de dépense.** Elle voit tout et permet de déplacer les fonds. C'est l'argent lui-même. Elle reste avec vous et n'est jamais partagée avec qui que ce soit, sous aucun prétexte.

**Full Viewing Key.** Lecture seule. Elle affiche l'activité entrante et sortante ainsi que les soldes, mais ne peut pas dépenser un seul zatoshi. C'est elle que vous remettez à un auditeur ou à un comptable.

**Incoming Viewing Key.** Encore plus restreinte : elle n'affiche que les paiements entrants. Un exchange ou un commerçant peut l'utiliser pour confirmer que votre dépôt est bien arrivé, tandis que la clé de dépense reste sur un appareil matériel qui n'est jamais connecté à Internet.

L'ordre compte. Donnez la clé la plus restreinte qui remplit la tâche, et non la plus large dont vous disposez.

---

## Ce que les débutants oublient

**Une clé pour lecture seule ne peut pas être révoquée.** Il n'existe aucun bouton « annuler le partage ». Une fois qu'une personne la détient, elle peut lire cette adresse tant que celle-ci existe. Si vous devez couper l'accès, transférez vos fonds vers une nouvelle adresse.

**Les frais sont publics, même dans un paiement entièrement protégé.** Le montant est masqué ; les frais ne le sont pas.

**Ce qui est public l'est pour toujours.** Tout ce que la chaîne affiche aujourd'hui, elle l'affichera encore dans vingt ans. Il est impossible de décider de protéger un paiement *après* l'avoir envoyé.

---

## Mettre en pratique

- Utilisez un portefeuille qui protège par défaut, comme [ZODL](https://zodl.com) ou [Zingo!](https://www.zingolabs.org/).
- Protégez les fonds dès qu'ils arrivent d'un exchange, avant de les dépenser.
- Payez vers des adresses protégées chaque fois que le destinataire en propose une.
- Avant de partager une clé pour lecture seule, demandez-vous quelle est la clé la plus restreinte qui répond à la question posée.

---

## Ressources

- [Explication des clés pour lecture seule (Electric Coin Company)](https://electriccoin.co/blog/explaining-viewing-keys/)
- [Divulgation sélective et clés pour lecture seule (Electric Coin Company)](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ZIP 310 : clés pour lecture seule](https://zips.z.cash/zip-0310)
- [Comment fonctionne la technologie Zcash](https://z.cash/technology/)

## Pages connexes

- [Les bases de Zcash](/start-here/what-is-zec-and-zcash)
- [Guide du nouvel utilisateur Zcash](/start-here/new-user-guide)
- [Ce qu'un explorateur de blocs peut voir](/zcash-tech/what-a-block-explorer-can-see)
- [Clés pour lecture seule](/zcash-tech/viewing-keys)
- [Transactions](/using-zcash/transactions)

---

*Si vous souhaitez ajouter du contenu ou suggérer des modifications à cette page du wiki, rendez-vous sur le [dépôt ZecHub GitHub](https://github.com/ZecHub/zechub) et soumettez une pull request.*
