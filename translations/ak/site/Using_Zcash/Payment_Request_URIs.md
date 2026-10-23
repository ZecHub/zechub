<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Payment_Request_URIs.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash Katua Abisade URI ahorow

## TL;DR

* URI a wɔde tua ho ka yɛ link a efi ase `zcash:` na ɛde sika a wotua ho nsɛm kɔ: address, sika dodow, ne krataa a obi betumi apaw.
* Wɔkyekyɛ sɛ QR code anaa link a wotumi klik so, na ɛma wo sika kotoku no hyɛ sika a wotua no ma ma wo. Wohwɛ nsɛm no mu na wopene so.
* [ZIP 321 na ɛwɔ hɔ](https://zips.z.cash/zip-0321) kyerɛkyerɛ ɔkwan a wɔfa so yɛ no mu. Ɛnyini firii Bitcoin BIP 21 mu.
* Adesrɛ biako betumi atua wɔn a wogye no pii ka wɔ asɛm biako mu.
* ZecHub gye sikatua widget ne generator, enti sotɔɔ bi betumi de Zcash sikatua bɔtn aka ho a ɔmfa nsa nkyerɛw URI no.

## Nkyerɛkyerɛmu Titiriw

URI a wɔde tua ho ka ne a `zcash:` link a wɔakyerɛkyerɛ mu denam [ZIP 321 na ɛwɔ hɔ](https://zips.z.cash/zip-0321). Sika kotoku a ɛne no hyia kenkan address, sika dodow, ne memo a wopɛ fi link anaa QR no so na edi kan hyɛ asɛm bi ma. Akontaabu foforo biara nni hɔ, processor biara nni mfinimfini.

<div className="my-6 flex flex-wrap items-center gap-3">
  <a
    href="/zcash-payment-uri"
    className="inline-flex items-center justify-center rounded-xl bg-[#F4B728] px-5 py-3 text-sm font-semibold text-zinc-900 no-underline shadow-sm hover:bg-[#e5a420]"
  >
    Bue sikatua widget
  </a>
  <a
    href="/tools"
    className="inline-flex items-center justify-center rounded-xl border border-slate-300 dark:border-zinc-600 px-5 py-3 text-sm font-semibold text-slate-800 dark:text-zinc-100 no-underline hover:bg-slate-50 dark:hover:bg-zinc-800"
  >
    Yɛ sikatua ho abisade
  </a>
</div>

Widget demo no yɛ ZIP-321 modal a ɛte ase: QR, copy address/URI, link tiawa, ne Open in Wallet. Nnwinnade krataafa no ne generator no sɛ wopɛ sɛ wodi kan hyehyɛ w’ankasa address ne sika dodow a.

### Anatomy ho adesua

```
zcash:<address>?amount=<zec>&memo=<base64url>&label=<text>
```

| Prama | Ɛhia | Nsɛm a Wɔahyɛ no Nsow |
| --- | --- | --- |
| address | Aane | Pɛ Unified Address (`u1` / `utest1`) |
| amount | no | Decimal ZEC ne `.` sɛ nea ɛpaapae mu na anyɛ yiye koraa no, ɛyɛ decimal mmeae 8 (`0.5`, n `0,5`) |
| memo | no | Address ahorow a wɔabɔ ho ban nkutoo. Memo no UTF-8 baiti (a ɛboro so 512), base64url-encoded a enni mu `=` padding: . `Thanks!` bɛyɛ `VGhhbmtzIQ`, ɛnyɛ nkyerɛwee a emu da hɔ no |
| label | no | Edin a nnipa betumi akenkan a sika kotoku bi kyerɛ. Ɔha biara mu nkyem-encode spaces ne nkyerɛwde a wɔakora so (`Coffee%20shop`); a `+` yɛ plus ankasa, ɛnyɛ ahunmu |

Mmara a edi mũ: [ZIP 321 na ɛwɔ hɔ](https://zips.z.cash/zip-0321).

### Fa nsɛm a wɔde di dwuma

- Checkout: prefill bo ne order memo enti adetɔfo no nkutoo si so dua wɔ wɔn sika kotoku mu
- Invoices: kyɛ link anaa QR biako
- Ntoboa: fa widget no hyɛ wɛbsaet bi so
- P2P: soma a `zcash:` link wɔ nkɔmmɔbɔ mu

### Fa hyɛ wɛbsaet bi so

Twe adwene si saa script yi so wɔ w’ankasa address a wɔabɔ ho ban no so. Hosted copy no te ase wɔ ZecHub:

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

Ɛhia: `data-address`, `data-amount`, `data-target`.

Sɔ hosted button no hwɛ kan: [Bue sikatua widget](/zcash-payment-uri).

### Video ahorow

Sɛnea wode Zcash:

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

Zcash Donation Widget a wode bɛka wo Wɛbsaet no ho:

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

## Aniwa so / Nsɛso

Susuw sikakorabea kratasin bi a wɔde akontaabu nɔma, sika dodow, ne krataa bi a ɛkyerɛ nea wɔde tua sika no ho nsɛm wom ho hwɛ. Sɛ wode nsa hyɛ mu ma a, ɛyɛ brɛoo, na akontaahyɛde biako a ɛnteɛ de sika no kɔ baabi a ɛnteɛ.

URI a wɔde tua ho ka ne saa kratasin no, a sotɔɔ no hyehyɛ. QR code no yɛ kratasin no mfonini. Wo fon so mfoninitwa afiri no kenkan mfonini no, sika kotoku no yɛ afuw biara ho mfonini kɔ baabi a ɛwɔ, na wohwɛ nɔma ahorow no na wode wo nsa hyɛ ase.

Link bi a ɛwɔ wɛbsaet krataafa bi so no yɛ adwuma koro no ara. Sɛ wobɔ so a, ɛde kratasin a wɔahyɛ no ma no hyɛ wo sika kotoku mu.

## Deep Dive a Wɔde Nsu Gu Mu

### Nhwɛso ankasa

Nhwɛsoɔ bi a ɛfiri ZIP 321, a wɔkyerɛw maa testnet ni:

```
zcash:ztestsapling10yy2ex5dcqkclhc7z7yrnjq2z6feyjad56ptwlfgmy77dmaqqrl9gyhprdx59qgmsnyfska2kez?amount=1&memo=VGhpcyBpcyBhIHNpbXBsZSBtZW1vLg&message=Thank%20you%20for%20your%20purchase
```

Ɛbisa sɛ wɔmfa ZEC 1 mma Sapling address baako a wɔabɔ ho ban. Memo no decodes to "Eyi yɛ memo a ɛnyɛ den." Nkrasɛm "Meda wo ase wɔ wo adetɔ ho" ne nsɛm a sika kotoku no kyerɛ wɔ screen so.

### Mmara a wallet checks

Sika dodow nhyehyɛe no yɛ katee. `amount=0.5` ne `amount=50` no yɛ nea ɛfata. `amount=50,000.00`, `amount=.5`, ne `amount=0.123456789` nyɛ adwuma: period nkutoo ne decimal separator, na anyɛ yiye koraa no, digit 8 betumi aba n’akyi. Sika biara ntumi ntra ZEC.

Wɔ raw URI no mu no, wɔde memo no ahyɛ base64url mu, na ɛtumi kura baiti 512 bere a wɔakyerɛ ase pɛnkoro no. Memo a wɔde abata address a ɛda adi ho no ma abisade no nyinaa yɛ nea enni mu, efisɛ address a ɛda adi pefee ntumi mfa memos nkɔ. Wɔmma Sprout address ho kwan koraa, na ɛsɛ sɛ wɔpo adesrɛ a ɛnni ZIP 321 kasa mmara no akyi.

Mfuw abien foforo wɔ hɔ a ɛboro pon a ɛwɔ atifi hɔ no so. `message` yɛ sika a wotua ma sika kotoku no de kyerɛ no ho nkyerɛkyerɛmu. `req-asset` wɔde asie ama Custom Assets, sɛnea wɔakyerɛkyerɛ mu wɔ ZIP 227 mu no.

### Nnipa pii a wotua wɔn ka prɛko pɛ

Sɛ nhwɛso no, sika biara a wotua foforo no nya index nɔma a wɔde ka ne parameter din ahorow ho `address.1`, `amount.1` ne `memo.1`. Wallet no kyekye asɛm baako a ɛtua obiara a ɔwɔ list no mu ka. Eyi ho wɔ mfaso ma sikakorabea a ɛkyekyɛ sika a wotua mu, anaasɛ ntoboa kuw bi a wɔbom de mena.

### Baabi a format no fi bae

Bitcoin wɔ gyinapɛn dedaw abien a ɛfa sikatua ho abisade ho: BIP 21, link a ɛnyɛ den ma obiako a ogye, ne BIP 70, protocol a emu yɛ duru ma sikatua a ɛyɛ den. ZIP 321 fa mfinimfini kwan so, link format a ɛwɔ baabi ma wɔn a wogye no pii. Nkɔmmɔbɔ no hyɛɛ aseɛ wɔ afe 2018 mu wɔ Zcash ZIPs akoraeɛ, baabi a wɔpaw nɔma 321 sɛ ɛnyɛ BIP 21, na wɔyɛɛ ZIP no ankasa wɔ Oforisuo 2020 mu.

## Nkratafa a Ɛfa Ho

- [Memos a wɔde kyerɛw nsɛm](/using-zcash/memos): nea memo field a ɛwɔ payment request mu no yɛ ma.
- [Wɔn a Wɔyɛ Katua Ho Nsiesiei](/using-zcash/payment-processors): nnwuma a edi sotɔɔ ahorow ho sikatua ho dwuma.
- [Sika kotoku](/using-zcash/wallets): fa Payment Request filter no di dwuma na hwehwɛ sika kotoku a ɛkenkan saa link ahorow yi.
- [Zcash Shielded Agyapadeɛ](/zcash-tech/zcash-shielded-assets): na Amanneɛbɔ Agyapade a `req-asset` kyerɛ.
- [Dɛn Ne Zcash TEX Address ahorow?](/using-zcash/transparent-exchange-addresses): address mmara foforo a wo sika kotoku kenkan ansa na atua.

**Wɔyɛɛ no foforo nea etwa to:** October 2026
