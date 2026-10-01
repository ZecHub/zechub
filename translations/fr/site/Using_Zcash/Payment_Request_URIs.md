<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Payment_Request_URIs.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifier la page"/>
</a>

# Zcash URI de demande de paiement

Une URI de demande de paiement est un lien `zcash:` défini par [ZIP 321](https://zips.z.cash/zip-0321). Les wallets compatibles lisent l’adresse, le montant et le mémo facultatif depuis le lien ou le QR, puis préremplissent une transaction. Aucun compte supplémentaire, aucun prestataire intermédiaire.

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

La démo du widget est une fenêtre modale ZIP-321 en direct : QR, copier l’adresse/l’URI, lien court et Ouvrir dans le wallet. La page d’outils est le générateur si vous souhaitez d’abord définir votre propre adresse et montant.

## Anatomie

```
zcash:<address>?amount=<zec>&memo=<text>&label=<text>
```

| Champ | Obligatoire | Remarques |
| --- | --- | --- |
| address | oui | Préférez une Unified Address (`u1` / `utest1`) |
| amount | non | ZEC décimal |
| memo | non | Transferts protégés uniquement |
| label | non | Nom lisible par les humains affiché par certains wallets |

Règles complètes : [ZIP 321](https://zips.z.cash/zip-0321).

## Cas d’utilisation

- **Paiement** — préremplissez le prix et un mémo de commande afin que le client n’ait plus qu’à confirmer dans son wallet
- **Factures** — partagez un lien unique ou un QR
- **Dons** — intégrez le widget sur un site
- **P2P** — envoyez un lien `zcash:` dans un chat

## Intégrer sur un site

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

Obligatoire : `data-address`, `data-amount`, `data-target`.

Essayez d’abord le bouton hébergé : [Ouvrir le widget de paiement](/zcash-payment-uri).

## Vidéos

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

Ajouter un widget de don Zcash à votre site web :

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/NbP4BcHC0uM"
    title="Ajouter un widget de don Zcash à votre site web"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
