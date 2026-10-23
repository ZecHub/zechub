<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Payment_Request_URIs.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifier la page"/>
</a>

# Zcash URI de demande de paiement

## En bref

* Une URI de demande de paiement est un lien qui commence par `zcash:` et contient les détails d’un paiement : l’adresse, le montant et un mémo facultatif.
* Partagée sous forme de code QR ou de lien cliquable, elle permet à votre wallet de renseigner le paiement pour vous. Vous vérifiez les détails et approuvez.
* [ZIP 321](https://zips.z.cash/zip-0321) définit le format. Il est issu du BIP 21 de Bitcoin.
* Une même demande peut payer plusieurs destinataires dans une seule transaction.
* ZecHub héberge un widget de paiement et un générateur, afin qu’une boutique puisse ajouter un bouton de paiement Zcash sans écrire l’URI à la main.

## Explication principale

Une URI de demande de paiement est un lien `zcash:` défini par [ZIP 321](https://zips.z.cash/zip-0321). Les wallets compatibles lisent l’adresse, le montant et le mémo facultatif depuis le lien ou le QR, puis préremplissent une transaction. Aucun compte supplémentaire, aucun intermédiaire de traitement.

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

La démo du widget est une fenêtre modale ZIP-321 en direct : QR, copie de l’adresse/de l’URI, lien court et ouverture dans le wallet. La page des outils contient le générateur si vous souhaitez d’abord définir votre propre adresse et votre montant.

### Anatomie

```
zcash:<address>?amount=<zec>&memo=<base64url>&label=<text>
```

| Champ | Obligatoire | Notes |
| --- | --- | --- |
| address | oui | Préférez une Unified Address (`u1` / `utest1`) |
| amount | non | Valeur décimale en ZEC avec `.` comme séparateur et au plus 8 décimales (`0.5`, pas `0,5`) |
| memo | non | Adresses protégées uniquement. Les octets UTF-8 du mémo (512 au maximum), encodés en base64url sans remplissage `=` : `Thanks!` devient `VGhhbmtzIQ`, et non le texte brut |
| label | non | Nom lisible affiché par certains wallets. Encodez en pourcentage les espaces et les caractères réservés (`Coffee%20shop`) ; un `+` est un signe plus littéral, et non un espace |

Règles complètes : [ZIP 321](https://zips.z.cash/zip-0321).

### Cas d’utilisation

- Paiement : préremplissez le prix et un mémo de commande afin que le client n’ait plus qu’à confirmer dans son wallet
- Factures : partagez un lien ou un QR
- Dons : intégrez le widget à un site
- P2P : envoyez un lien `zcash:` dans une discussion

### Intégrer à un site

Faites pointer ce script vers votre propre adresse protégée. La copie hébergée se trouve sur ZecHub :

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

Essayez d’abord le bouton hébergé : [Ouvrir le widget de paiement](/zcash-payment-uri).

### Vidéos

Comment créer des demandes de paiement avec Zcash :

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/l5auYQIzYsQ"
    title="Comment créer des demandes de paiement avec Zcash"
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
    title="Ajouter un widget de dons Zcash à votre site web"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

## Visuel / Analogie

Imaginez un formulaire de virement bancaire avec des champs pour le numéro de compte, le montant et une note indiquant l’objet du paiement. Le remplir à la main est lent, et un seul chiffre erroné envoie l’argent au mauvais endroit.

Une URI de demande de paiement est ce formulaire, rempli par la boutique. Le code QR est une photo du formulaire. L’appareil photo de votre téléphone lit la photo, le wallet copie chaque champ au bon endroit, puis vous vérifiez les chiffres et signez.

Un lien sur une page web fait la même chose. Cliquer dessus remet le formulaire rempli à votre wallet.

## Approfondissement

### Un exemple réel

Voici un exemple issu de ZIP 321, rédigé pour testnet :

```
zcash:ztestsapling10yy2ex5dcqkclhc7z7yrnjq2z6feyjad56ptwlfgmy77dmaqqrl9gyhprdx59qgmsnyfska2kez?amount=1&memo=VGhpcyBpcyBhIHNpbXBsZSBtZW1vLg&message=Thank%20you%20for%20your%20purchase
```

Il demande 1 ZEC à une adresse Sapling protégée. Le mémo se décode en « This is a simple memo. ». Le message « Thank you for your purchase » est le texte que le wallet affiche à l’écran.

### Règles vérifiées par un wallet

Le format du montant est strict. `amount=0.5` et `amount=50` sont valides. `amount=50,000.00`, `amount=.5` et `amount=0.123456789` ne sont pas valides : le point est le seul séparateur décimal, et il ne peut y avoir plus de 8 chiffres après lui. Aucun montant ne peut dépasser 21 000 000 ZEC.

Dans l’URI brute, le mémo est encodé en base64url et peut contenir jusqu’à 512 octets une fois décodé. Un mémo attaché à une adresse transparente rend toute la demande invalide, car les adresses transparentes ne peuvent pas contenir de mémos. Les adresses Sprout ne sont pas du tout autorisées, et une demande qui ne respecte pas la grammaire de ZIP 321 doit être rejetée.

Deux champs supplémentaires existent au-delà du tableau ci-dessus. `message` est une description du paiement à afficher par le wallet. `req-asset` est réservé aux Custom Assets, telles que définies dans ZIP 227.

### Payer plusieurs personnes à la fois

Chaque paiement supplémentaire reçoit un numéro d’index ajouté à ses noms de paramètres, par exemple `address.1`, `amount.1` et `memo.1`. Le wallet construit une transaction unique qui paie toutes les personnes de la liste. Cela est utile pour un paiement qui répartit une somme, ou pour un groupe de dons envoyés ensemble.

### Origine du format

Bitcoin possède deux normes plus anciennes pour les demandes de paiement : BIP 21, un lien simple pour un destinataire, et BIP 70, un protocole plus lourd pour les paiements complexes. ZIP 321 adopte une voie intermédiaire, un format de lien pouvant accueillir plusieurs destinataires. La discussion a débuté en 2018 dans le dépôt de ZIPs Zcash, où le numéro 321 a été choisi en écho au BIP 21, et le ZIP lui-même a été créé en août 2020.

## Pages connexes

- [Mémos](/using-zcash/memos) : à quoi sert le champ mémo dans une demande de paiement.
- [Processeurs de paiement](/using-zcash/payment-processors) : services qui traitent les paiements pour les boutiques.
- [Wallets](/using-zcash/wallets) : utilisez le filtre Demande de paiement pour trouver les wallets qui lisent ces liens.
- [Zcash Actifs protégés](/zcash-tech/zcash-shielded-assets) : les Custom Assets auxquels `req-asset` fait référence.
- [Que sont les adresses TEX de Zcash ?](/using-zcash/transparent-exchange-addresses) : une autre règle d’adresse que votre wallet lit avant de payer.

**Dernière mise à jour :** octobre 2026
