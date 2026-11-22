<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Payment_Request_URIs.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# URI de demande de paiement Zcash

## TL;DR

* Une URI de demande de paiement est un lien qui commence par `zcash:` et qui contient les détails d'un paiement : l'adresse, le montant et un mémo facultatif.
* Partagée sous forme de QR code ou de lien cliquable, elle permet à votre portefeuille de remplir le paiement à votre place. Il vous suffit de vérifier les détails et d'approuver.
* La [ZIP 321](https://zips.z.cash/zip-0321) définit le format. Elle s'inspire du BIP 21 de Bitcoin.
* Une seule demande peut payer plusieurs destinataires en une seule transaction.
* ZecHub héberge un widget de paiement et un générateur, ce qui permet à une boutique d'ajouter un bouton de paiement Zcash sans écrire l'URI à la main.

## Explication essentielle

Une URI de demande de paiement est un lien `zcash:` défini par la [ZIP 321](https://zips.z.cash/zip-0321). Les portefeuilles compatibles lisent l'adresse, le montant et le mémo facultatif à partir du lien ou du QR code, puis préremplissent une transaction. Aucun compte supplémentaire, aucun intermédiaire de paiement.

<div className="my-6 flex flex-wrap items-center gap-3">
  <a
    href="/zcash-payment-uri"
    className="inline-flex items-center justify-center rounded-xl bg-[#F4B728] px-5 py-3 text-sm font-semibold text-zinc-900 no-underline shadow-sm hover:bg-[#e5a420]"
  >
    Ouvrir le widget de paiement
  </a>
  <a
    href="/tools"
    className="inline-flex items-center justify-center rounded-xl border border-slate-300 dark:border-zinc-600 px-5 py-3 text-sm font-semibold text-slate-800 dark:text-zinc-100 no-underline hover:bg-slate-50 dark:hover:bg-zinc-800"
  >
    Créer une demande de paiement
  </a>
</div>

La démo du widget est une fenêtre modale ZIP-321 fonctionnelle : QR code, copie de l'adresse ou de l'URI, lien court et bouton « Ouvrir dans le portefeuille ». La page des outils sert de générateur si vous souhaitez d'abord définir votre propre adresse et votre propre montant.

### Anatomie

```
zcash:<address>?amount=<zec>&memo=<base64url>&label=<text>
```

| Champ | Obligatoire | Détails |
| --- | --- | --- |
| address | oui | Privilégiez une adresse unifiée (`u1` / `utest1`) |
| amount | non | ZEC décimal avec `.` comme séparateur et au maximum 8 décimales (`0.5`, et non `0,5`) |
| memo | non | Adresses protégées uniquement. Les octets UTF-8 du mémo (512 au maximum), encodés en base64url sans remplissage `=` : `Thanks!` devient `VGhhbmtzIQ`, et non le texte brut |
| label | non | Nom lisible affiché par certains portefeuilles. Encodez en pourcentage les espaces et les caractères réservés (`Coffee%20shop`) ; un `+` est un signe plus littéral, et non un espace |

Règles complètes : [ZIP 321](https://zips.z.cash/zip-0321).

### Cas d'utilisation

- Paiement en ligne : préremplissez le prix et un mémo de commande afin que le client n'ait plus qu'à confirmer dans son portefeuille
- Factures : partagez un seul lien ou QR code
- Dons : intégrez le widget sur un site
- P2P : envoyez un lien `zcash:` dans une conversation

### Intégration sur un site

Configurez ce script avec votre propre adresse protégée. Une copie hébergée se trouve sur ZecHub :

```html
<div id="zcash-pay"></div>
<script
  src="https://zechub.wiki/zcash-payment-request-widget.embed.v2.js"
  data-target="#zcash-pay"
  data-address="u1..."
  data-amount="0.01"
  data-label="Pay with Zcash"
  data-memo="order-42"
  data-theme="dark"
  data-api-base="https://zechub.wiki/api"
></script>
```

Obligatoires : `data-address`, `data-amount`, `data-target`.

Essayez d'abord le bouton hébergé : [Ouvrir le widget de paiement](/zcash-payment-uri).

### Vidéos

Comment créer des demandes de paiement avec Zcash :

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/l5auYQIzYsQ"
    title="How to make Payment Requests with Zcash"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

Ajouter un widget de dons Zcash à votre site web :

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/NbP4BcHC0uM"
    title="Adding a Zcash Donation Widget to your Website"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

## Illustration / analogie

Imaginez un formulaire de virement bancaire avec des champs pour le numéro de compte, le montant et une mention indiquant l'objet du paiement. Le remplir à la main prend du temps, et un seul chiffre erroné envoie l'argent au mauvais endroit.

Une URI de demande de paiement, c'est ce formulaire, rempli par la boutique. Le QR code est une photo du formulaire. L'appareil photo de votre téléphone lit la photo, le portefeuille recopie chaque champ à sa place, et il ne vous reste qu'à vérifier les chiffres et à signer.

Un lien sur une page web remplit la même fonction. En cliquant dessus, vous transmettez le formulaire rempli à votre portefeuille.

## Approfondissement

### Un exemple concret

Voici un exemple tiré de la ZIP 321, rédigé pour le testnet :

```
zcash:ztestsapling10yy2ex5dcqkclhc7z7yrnjq2z6feyjad56ptwlfgmy77dmaqqrl9gyhprdx59qgmsnyfska2kez?amount=1&memo=VGhpcyBpcyBhIHNpbXBsZSBtZW1vLg&message=Thank%20you%20for%20your%20purchase
```

Il demande 1 ZEC à destination d'une adresse protégée Sapling. Le mémo se décode en « This is a simple memo. ». Le message « Thank you for your purchase » est le texte que le portefeuille affiche à l'écran.

### Règles vérifiées par un portefeuille

Le format du montant est strict. `amount=0.5` et `amount=50` sont valides. `amount=50,000.00`, `amount=.5` et `amount=0.123456789` ne le sont pas : le point est le seul séparateur décimal autorisé, et il ne peut être suivi que de 8 chiffres au maximum. Aucun montant ne peut dépasser 21 000 000 ZEC.

Dans l'URI brute, le mémo est encodé en base64url et peut contenir jusqu'à 512 octets une fois décodé. Un mémo associé à une adresse transparente rend toute la demande invalide, car les adresses transparentes ne peuvent pas transporter de mémos. Les adresses Sprout ne sont pas autorisées du tout, et une demande qui ne respecte pas la grammaire de la ZIP 321 doit être rejetée.

Deux autres champs existent en plus de ceux du tableau ci-dessus. `message` est une description du paiement que le portefeuille affiche. `req-asset` est réservé aux actifs personnalisés, tels que définis dans la ZIP 227.

### Payer plusieurs personnes à la fois

Chaque paiement supplémentaire reçoit un numéro d'index ajouté au nom de ses paramètres, par exemple `address.1`, `amount.1` et `memo.1`. Le portefeuille construit une seule transaction qui paie tous les destinataires de la liste. C'est utile pour un paiement en ligne qui répartit un montant, ou pour un ensemble de dons envoyés ensemble.

### Origine du format

Bitcoin dispose de deux standards plus anciens pour les demandes de paiement : le BIP 21, un simple lien pour un seul destinataire, et le BIP 70, un protocole plus lourd pour les paiements complexes. La ZIP 321 adopte une voie intermédiaire : un format de lien qui permet plusieurs destinataires. La discussion a commencé en 2018 dans le dépôt des ZIP de Zcash, où le numéro 321 a été choisi en écho au BIP 21, et la ZIP elle-même a été créée en août 2020.

## Pages associées

- [Mémos](/using-zcash/memos) : à quoi sert le champ mémo dans une demande de paiement.
- [Processeurs de paiement](/using-zcash/payment-processors) : des services qui gèrent les paiements pour les boutiques.
- [Portefeuilles](/using-zcash/wallets) : utilisez le filtre « Demande de paiement » pour trouver les portefeuilles qui lisent ces liens.
- [Actifs protégés Zcash](/zcash-tech/zcash-shielded-assets) : les actifs personnalisés auxquels `req-asset` fait référence.
- [Que sont les adresses TEX Zcash ?](/using-zcash/transparent-exchange-addresses) : une autre règle d'adresse que votre portefeuille lit avant de payer.

**Dernière mise à jour :** octobre 2026
