<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Payment_Request_URIs.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash Arịrịọ Kwụọ ụhwọ [Payment] URI

## TL;DR

* Arịrịọ Kwụọ ụhwọ URI bụ njikọ na-amalite na `zcash:` ma na-ebu nkọwa Kwụọ ụhwọ: Adreesị akpa ego [address], ego ole, na memo nhọrọ.
* Mgbe e kesara ya dịka koodu QR ma ọ bụ njikọ a pụrụ pịa, ọ na-enye e-akpa ego [wallet] gị ohere imeju Kwụọ ụhwọ ahụ maka gị. Ị na-enyocha nkọwa ndị ahụ ma kwado ya.
* [ZIP 321](https://zips.z.cash/zip-0321) na-akọwa usoro ahụ. O sitere na BIP 21 nke Bitcoin.
* Otu arịrịọ nwere ike ịkwụ ọtụtụ ndị nnata n'otu Azụmahia [transaction].
* ZecHub na-akwado wijet Kwụọ ụhwọ na ihe nrụpụta, ka ụlọ ahịa nwee ike itinye bọtịnụ Kwụọ ụhwọ Zcash na-edeghị URI ahụ n'aka.

## Nkọwa Isi

Arịrịọ Kwụọ ụhwọ URI bụ njikọ `zcash:` nke [ZIP 321](https://zips.z.cash/zip-0321) kọwara. E-akpa ego ndị dakọtara na-agụ Adreesị akpa ego, ego ole, na memo nhọrọ site na njikọ ahụ ma ọ bụ QR ma bujupụta Azụmahia. Ọ dịghị akaụntụ ọzọ, ọ dịghị onye nhazi n'etiti.

<div className="my-6 flex flex-wrap items-center gap-3">
  <a
    href="/zcash-payment-uri"
    className="inline-flex items-center justify-center rounded-xl bg-[#F4B728] px-5 py-3 text-sm font-semibold text-zinc-900 no-underline shadow-sm hover:bg-[#e5a420]"
  >
    Mepee wijet Kwụọ ụhwọ
  </a>
  <a
    href="/tools"
    className="inline-flex items-center justify-center rounded-xl border border-slate-300 dark:border-zinc-600 px-5 py-3 text-sm font-semibold text-slate-800 dark:text-zinc-100 no-underline hover:bg-slate-50 dark:hover:bg-zinc-800"
  >
    Mepụta arịrịọ Kwụọ ụhwọ
  </a>
</div>

Ngosipụta wijet ahụ bụ modal ZIP-321 dị ndụ: QR, detuo Adreesị akpa ego/URI, njikọ mkpirikpi, na Mepee na Wallet. Peeji ngwá ọrụ bụ ihe nrụpụta ma ọ bụrụ na ịchọrọ ibu ụzọ tọọ Adreesị akpa ego na ego ole nke gị.

### Nhazi

```
zcash:<address>?amount=<zec>&memo=<base64url>&label=<text>
```

| Mpaghara | Achọrọ | Ndetu |
| --- | --- | --- |
| address | ee | Họrọ Adreesị Njikọtara ọnụ (`u1` / `utest1`) |
| amount | mba | Ọnụọgụ desimal ZEC nke `.` bụ nkewa ya, ma nwee ihe ruru ebe desimal 8 (`0.5`, ọ bụghị `0,5`) |
| memo | mba | Naanị Adreesị akpa ego nke e chebere echebe [shielded]. Baiti UTF-8 nke memo ahụ (ihe ruru 512), ejiri base64url dozie ya na-enweghị ndokọrịta `=`: `Thanks!` na-aghọ `VGhhbmtzIQ`, ọ bụghị ederede nkịtị |
| label | mba | Aha mmadụ nwere ike ịgụ nke ụfọdụ e-akpa ego na-egosi. Jiri percent-encode dozie oghere na mkpụrụedemede echekwara (`Coffee%20shop`); `+` bụ plus nkịtị, ọ bụghị oghere |

Iwu zuru ezu: [ZIP 321](https://zips.z.cash/zip-0321).

### Ojiji [Use cases]

- Nkwụnye ego: bujupụta ọnụahịa na memo iwu ka onye ahịa kwado naanị na e-akpa ego ya
- Akwụkwọ ọnụahịa: kesaa otu njikọ ma ọ bụ QR
- Onyinye: tinye wijet ahụ n'ime saịtị
- P2P: ziga njikọ `zcash:` na nkata

### Tinye n'ime saịtị

Tụọ skripti a na Adreesị akpa ego nke e chebere echebe nke gị. Mbipụta a kwadoro dị na ZecHub:

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

Achọrọ: `data-address`, `data-amount`, `data-target`.

Buru ụzọ nwalee bọtịnụ a kwadoro: [Mepee wijet Kwụọ ụhwọ](/zcash-payment-uri).

### Vidio

Otu esi eme Arịrịọ Kwụọ ụhwọ na Zcash:

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

Ịgbakwunye Wijet Onyinye Zcash na Weebụsaịtị Gị:

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

## Anya / Ntụnyere

Chee maka fọm mbufe ego ụlọ akụ nwere mpaghara maka nọmba akaụntụ, ego ole, na note [note] na-ekwu ihe Kwụọ ụhwọ ahụ bụ maka ya. Iji aka dejupụta ya na-ewe oge, otu ọnụọgụ na-ezighi ezi ga-ezigakwa ego ahụ n'ebe na-ezighi ezi.

Arịrịọ Kwụọ ụhwọ URI bụ fọm ahụ, nke ụlọ ahịa dejupụtaworo. Koodu QR bụ foto nke fọm ahụ. Igwefoto ekwentị gị na-agụ foto ahụ, e-akpa ego na-edetuo mpaghara ọ bụla n'ebe ya, ị na-enyochakwa ọnụọgụ ndị ahụ ma bịanye aka.

Njikọ dị na ibe weebụ na-arụkwa otu ọrụ ahụ. Ịpị ya na-enyefe e-akpa ego gị fọm ahụ ejupụtarala.

## Nyocha Miri Emi

### Ezi ihe atụ

Nke a bụ ihe atụ sitere na ZIP 321, e dere ya maka testnet:

```
zcash:ztestsapling10yy2ex5dcqkclhc7z7yrnjq2z6feyjad56ptwlfgmy77dmaqqrl9gyhprdx59qgmsnyfska2kez?amount=1&memo=VGhpcyBpcyBhIHNpbXBsZSBtZW1vLg&message=Thank%20you%20for%20your%20purchase
```

Ọ na-arịọ 1 ZEC maka otu Adreesị akpa ego nke e chebere echebe Sapling. Memo ahụ na-akọwapụta dịka "This is a simple memo." Ozi "Thank you for your purchase" bụ ederede e-akpa ego na-egosi na ihuenyo.

### Iwu e-akpa ego na-enyocha

Usoro ego ole siri ike. `amount=0.5` na `amount=50` dị irè. `amount=50,000.00`, `amount=.5`, na `amount=0.123456789` adịghị irè: ntụpọ bụ naanị nkewa desimal, ma ọ pụghị inwe ihe karịrị ọnụọgụ 8 n'azụ ya. Ego ole ọbụla enweghị ike ịgafe 21,000,000 ZEC.

Na URI raw, a na-eji base64url dozie memo ahụ, ọ pụkwara ijide ihe ruru baiti 512 mgbe akọwapụtachara ya. Memo e tinyere na Adreesị akpa ego Oha [transparent] na-eme arịrịọ ahụ dum ghara ịdị irè, n'ihi na Adreesị akpa ego Oha enweghị ike ibu memo. A naghị ekwe Adreesị akpa ego Sprout ma ọlị, a ghaghị ịjụkwa arịrịọ na-adịghị agbaso gramà ZIP 321.

Mpaghara abụọ ọzọ dị karịa tebụl dị n'elu. `message` bụ nkọwa Kwụọ ụhwọ maka e-akpa ego igosi. `req-asset` ka e debeere Custom Assets, dịka ZIP 227 kọwara.

### Ịkwụ ọtụtụ mmadụ n'otu oge

Kwụọ ụhwọ ọ bụla ọzọ na-enweta nọmba ndepụta agbakwunyere n'aha parameeta ya, dịka ọmụmaatụ `address.1`, `amount.1` na `memo.1`. E-akpa ego na-ewu otu Azụmahia nke na-akwụ onye ọ bụla nọ na ndepụta ahụ. Nke a bara uru maka nkwụnye ego nke kewara Kwụọ ụhwọ, ma ọ bụ maka otu onyinye ezitere ọnụ.

### Ebe usoro ahụ siri bịa

Bitcoin nwere ụkpụrụ abụọ ochie maka arịrịọ Kwụọ ụhwọ: BIP 21, njikọ dị mfe maka otu onye nnata, na BIP 70, protokọl ka arọ maka Kwụọ ụhwọ dị mgbagwoju anya. ZIP 321 na-ewere ụzọ etiti, usoro njikọ nwere ohere maka ọtụtụ ndị nnata. Mkparịta ụka ahụ malitere na 2018 na ebe nchekwa ZIPs Zcash, ebe a họpụtara nọmba 321 ka ọ daba na BIP 21, e mekwara ZIP n'onwe ya n'Ọgọọst 2020.

## Peeji Ndị Metụtara

- [Memo](/using-zcash/memos): ihe mpaghara memo dị n'arịrịọ Kwụọ ụhwọ bụ maka ya.
- [Ndị Nhazi Kwụọ ụhwọ](/using-zcash/payment-processors): ọrụ na-ahụ Kwụọ ụhwọ maka ụlọ ahịa.
- [E-akpa ego](/using-zcash/wallets): jiri nzacha Payment Request chọta e-akpa ego na-agụ njikọ ndị a.
- [Zcash Ngwá Ọrụ nke e chebere echebe](/zcash-tech/zcash-shielded-assets): Custom Assets ndị `req-asset` na-ekwu maka ha.
- [Gịnị bụ Zcash Adreesị TEX?](/using-zcash/transparent-exchange-addresses): iwu Adreesị akpa ego ọzọ e-akpa ego gị na-agụ tupu ọ kwụọ.

**Emelitere ikpeazụ:** Ọktoba 2026
