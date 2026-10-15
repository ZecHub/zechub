<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Payment_Request_URIs.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Arịrịọ Ịkwụ Ụgwọ Zcash URIs

## TL;DR

* Arịrịọ ịkwụ ụgwọ URI bụ njikọ nke na-amalite na `zcash:` ma na-ebu nkọwa nke ịkwụ ụgwọ: adreesị, ego ole a na-akwụ, na ihe edeturu nhọrọ.
* A na-ekekọrịta ya dị ka koodu QR ma ọ bụ njikọ a na-pịa, ọ na-enye gị ohere itinye ego gị. Ị na-enyocha nkọwa ndị ahụ ma nabata.
* [ZIP 321](https://zips.z.cash/zip-0321) na-akọwapụta usoro ahụ. O si na BIP 21 nke Bitcoin too.
* Otu arịrịọ nwere ike ịkwụ ọtụtụ ndị nnata ụgwọ n'otu azụmahịa.
* ZecHub nwere ngwaọrụ ịkwụ ụgwọ na ihe na-emepụta ihe, yabụ ụlọ ahịa nwere ike itinye bọtịnụ ịkwụ ụgwọ Zcash na-edeghị URI n'aka.

## Nkọwa Isi

Arịrịọ ịkwụ ụgwọ URI bụ `zcash:` njikọ akọwapụtara site na [ZIP 321](https://zips.z.cash/zip-0321). Obere akpa ego dakọtara na-agụ adreesị, ego, na ihe edeturu nhọrọ site na njikọ ma ọ bụ QR wee mejupụta azụmahịa tupu oge eruo. Enweghị akaụntụ ọzọ, enweghị ihe nhazi n'etiti.

<div className="my-6 flex flex-wrap items-center gap-3">
  <a
    href="/zcash-payment-uri"
    className="inline-flex items-center justify-center rounded-xl bg-[#F4B728] px-5 py-3 text-sm font-semibold text-zinc-900 no-underline shadow-sm hover:bg-[#e5a420]"
  >
    Mepee wijetị ịkwụ ụgwọ
  </a>
  <a
    href="/tools"
    className="inline-flex items-center justify-center rounded-xl border border-slate-300 dark:border-zinc-600 px-5 py-3 text-sm font-semibold text-slate-800 dark:text-zinc-100 no-underline hover:bg-slate-50 dark:hover:bg-zinc-800"
  >
    Wulite arịrịọ ịkwụ ụgwọ
  </a>
</div>

Ngosipụta wijetị ahụ bụ usoro ZIP-321 dị ndụ: QR, adreesị detuo/URI, njikọ dị mkpirikpi, na Mepee na obere akpa ego. Ibe ngwaọrụ bụ ihe na-emepụta ihe ma ọ bụrụ na ịchọrọ ịtọ adreesị na ego nke gị mbụ.

### Ọdịdị Ahụ́

```
zcash:<address>?amount=<zec>&memo=<base64url>&label=<text>
```

| Ubi | A chọrọ | Ihe ndetu |
| --- | --- | --- |
| address | ee | Họrọ Unified Address (`u1` / `utest1`) |
| amount | no | ZEC nke iri na abụọ na `.` dị ka ihe nkewa na ihe karịrị ebe decimal asatọ (`0.5`, ọ bụghị `0,5`) |
| memo | no | Naanị adreesị echekwara. Ogbe UTF-8 nke memo ahụ (ọkachasị 512), nke e tinyere koodu base64url na-enweghị `=` ihe mkpuchi: `Thanks!` na-aghọ `VGhhbmtzIQ`, ọ bụghị ederede nkịtị |
| label | no | Aha mmadụ na-agụ nke ụfọdụ obere akpa ego na-egosi. Pasentị - tinye oghere na mkpụrụedemede echekwara (`Coffee%20shop`); a `+` bụ ihe mgbakwunye nkịtị, ọ bụghị oghere |

Iwu zuru oke: [ZIP 321](https://zips.z.cash/zip-0321).

### Ihe eji eme ihe

- Ịkwụ ụgwọ: ọnụahịa ejuputara tupu oge eruo na ihe edeturu iwu ka onye ahịa wee kwenye naanị na obere akpa ha
- Akwụkwọ ọnụahịa: kesaa otu njikọ ma ọ bụ QR
- Onyinye: tinye wijetị ahụ na saịtị
- P2P: zipu a `zcash:` njikọ na nkata

### Tinye na saịtị

Tụnye edemede a n'adres nke gị echekwara. Nke a dị na ZecHub:

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

A chọrọ: `data-address`, `data-amount`, `data-target`.

Nwaa bọtịnụ a kwadoro mbụ: [Mepee wijetị ịkwụ ụgwọ](/zcash-payment-uri).

### Vidiyo

Otu esi eme arịrịọ ịkwụ ụgwọ na Zcash:

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

Ịtinye ngwaọrụ onyinye Zcash na weebụsaịtị gị:

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

## Anya / Ihe atụ

Chee echiche banyere fọm nnyefe ego ụlọ akụ nwere ubi maka nọmba akaụntụ, ego ole a na-akwụ, na akwụkwọ ndetu nke na-egosi ihe a ga-akwụ. Ijupụta ya n'aka na-ewe nwayọ, otu ọnụọgụgụ na-ezighi ezi na-ezigakwa ego ahụ n'ebe na-ekwesịghị ekwesị.

URI bụ akwụkwọ arịrịọ ịkwụ ụgwọ, nke ụlọ ahịa ahụ dejupụtara. Koodu QR bụ foto nke fọm ahụ. Igwefoto ekwentị gị na-agụ foto ahụ, obere akpa ahụ na-edetu ubi ọ bụla n'ọnọdụ ya, ị na-elele ọnụọgụgụ ahụ wee bịanye aka.

Njikọ dị na ibe weebụ na-arụ otu ọrụ ahụ. Ịpị ya na-enye fọm e dejupụtara na obere akpa gị.

## Mmiri miri emi

### Ezigbo ihe atụ

Lee ihe atụ sitere na ZIP 321, nke e dere maka testnet:

```
zcash:ztestsapling10yy2ex5dcqkclhc7z7yrnjq2z6feyjad56ptwlfgmy77dmaqqrl9gyhprdx59qgmsnyfska2kez?amount=1&memo=VGhpcyBpcyBhIHNpbXBsZSBtZW1vLg&message=Thank%20you%20for%20your%20purchase
```

Ọ na-arịọ maka otu ZEC n'otu adreesị Sapling echekwara. Mbido ahụ na-agbanwe gaa na "Nke a bụ ihe ndetu dị mfe." Ozi "Daalụ maka ịzụrụ ihe gị" bụ ederede obere akpa ego ahụ na-egosi na ihuenyo.

### Na-achịkwa ego a na-akwụ maka obere akpa ego

Usoro ego ahụ siri ike. `amount=0.5` na `amount=50` dị irè. `amount=50,000.00`, `amount=.5`, na `amount=0.123456789` adịghị mma: otu period bụ naanị ihe nkewa decimal, enwere ike ịnwe opekata mpe nọmba asatọ mgbe ọ gasịrị. Ọ dịghị ego ọ bụla nwere ike ịgafe 21,000,000 ZEC.

Na URI raw, a na-etinye ndetu ahụ na base64url, ọ nwekwara ike ịnwe ruo 512 bytes ozugbo e depụtachara koodu ahụ. Ihe ndetu ejikọtara na adreesị doro anya na-eme ka arịrịọ ahụ dum ghara ịdị irè, n'ihi na adreesị doro anya enweghị ike ibu ndetu. A naghị anabata adreesị Sprout ma ọlị, a ga-ajụkwa arịrịọ nke na-esoghị usoro asụsụ ZIP 321.

E nwere ubi abụọ ọzọ gafere tebụl dị n'elu. `message` bụ nkọwa nke ịkwụ ụgwọ maka obere akpa ahụ. `req-asset` e debere ya maka Akụ Omenala, dịka akọwara na ZIP 227.

### Ịkwụ ọtụtụ mmadụ ụgwọ n'otu oge

Ụgwọ ọ bụla ọzọ na-enweta nọmba ndeksi agbakwunyere na aha paramita ya, dịka ọmụmaatụ `address.1`, `amount.1` na `memo.1`Akpa ego ahụ na-ewulite otu azụmahịa nke na-akwụ onye ọ bụla nọ na ndepụta ahụ ụgwọ. Nke a bara uru maka ịkwụ ụgwọ nke na-ekewa ụgwọ, ma ọ bụ maka otu onyinye ezitere ọnụ.

### Ebe usoro ahụ si bịa

Bitcoin nwere ụkpụrụ abụọ ochie maka arịrịọ ịkwụ ụgwọ: BIP 21, njikọ dị mfe maka otu onye nnata, na BIP 70, usoro dị arọ maka ịkwụ ụgwọ dị mgbagwoju anya. ZIP 321 na-ewe ụzọ etiti, usoro njikọ nwere ohere maka ọtụtụ ndị nnata. Mkparịta ụka ahụ malitere na 2018 na ebe nchekwa Zcash ZIPs, ebe ahọpụtara nọmba 321 ka ọ na-eme ka BIP 21 dịghachi mma, e mekwara ZIP n'onwe ya na Ọgọst 2020.

## Peeji ndị metụtara ya

- [Ihe ncheta](/using-zcash/memos): ihe ubi ndetu dị na arịrịọ ịkwụ ụgwọ bụ maka ya.
- [Ndị Nhazi Ịkwụ Ụgwọ](/using-zcash/payment-processors)ọrụ ndị na-ahụ maka ịkwụ ụgwọ maka ụlọ ahịa.
- [Obere akpa](/using-zcash/wallets): jiri nzacha Arịrịọ Ịkwụ Ụgwọ chọta obere akpa ndị na-agụ njikọ ndị a.
- [Akụ Zcash Chebere](/zcash-tech/zcash-shielded-assets): Akụ Omenala nke `req-asset` na-ezo aka na.
- [Kedu adreesị Zcash TEX?](/using-zcash/transparent-exchange-addresses): iwu adreesị ọzọ nke obere akpa gị na-agụ tupu ọ kwụọ ụgwọ.

**Emelitere ikpeazụ:** Ọktoba 2026
