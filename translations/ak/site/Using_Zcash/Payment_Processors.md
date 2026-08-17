<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Payment_Processors.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash Nneɛma a Wɔde Tua Ka

Akwan a wobɛfa so agye ZEC atom sɛ aguadifo, a wɔde toto ho wɔ nkyɛnkyɛn. Wɔhwɛɛ biribiara a wɔakyerɛw no de gyinaa ɔdemafoɔ no ankasa sait ne API so wɔ **29 July 2026**.

Mmoa a wɔde ma wɔ kokoam agyapade ho no taa sesa, enti row biara kura n’ankasa da a wɔagye atom. Sɛ worekenkan eyi asram bi akyi a, hwɛ ɔdemafo no wɛbsaet no so ansa na woaka abom.

<div class="processor-table">

| Processor a wɔde yɛ adwuma | Nhwɛsode | Wɔabɔ ho ban ZEC | Ɔno ankasa a ɔyɛ ahɔhoyɛfo | Aguadifo ho ka | Mpɔtam / KYC | Wɔagye atom |
|:--|:--|:--|:--|:--|:--|:--|
| [CipherPay a wɔde tua ho ka](https://www.cipherpay.app) | Nea ɛnyɛ afiase | Yiw, Orchard via Unified Addresses | Yiw, open source | 1% wɔ sikatua biara mu, sɛ obi ankasa gye ho a, wontua hwee | No KYC, mpɔtam a wɔankyerɛ | 2026-07-29 |
| [BTCPay Server a wɔde di dwuma](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin) | Ɛnyɛ custodial, hwɛ safoa nkutoo | Yiw, wɔabɔ ho ban nkutoo (Sapling, Orchard, UA) | Yiw, open source | Obiara nni hɔ, wotua network fees nkutoo | Wiase nyinaa, KYC biara nni hɔ | 2026-07-29 |
| [ZGo](https://zgo.cash/) | Non-custodial | Yes, Sapling and Orchard | No, hosted service | Prepaid session, price not published | No KYC stated, regions not stated | 2026-07-29 |
| [Flexa](https://flexa.co/) | Adetɔfo ankasa hwɛ, aguadifo si fiat | Customer sɛe sika shielded, gye afã a wɔankyerɛw | Dabi | 1% wɔ sikatua biara mu | US ne SEPA aman 37, ZEC a ɛwɔ EU no nsii so dua | 2026-07-29 |
| [MPREMPRENNtua a wotua](https://nowpayments.io/supported-coins/zcash-payments) | Nea ɛnyɛ afiase de default | Dabi, address a ɛda adi pefee nkutoo | Dabi | 0.5%, anaa 1% ne nsakrae | Global gye baabi a wɔabara, KYC biara nni hɔ a wode befi ase | 2026-07-29 |
| [Plisio na ɔkyerɛwee](https://plisio.net/accept-zcash) | Custodial, ɛmfa ho sɛ wɔtɔn | Wɔnkyerɛw nkyerɛwee | Dabi | 0.5% API, 1.5% fitaa nkyerɛwde | KYC biara nni hɔ a wobegye | 2026-07-29 |
| [Binance Akatua](https://pay.binance.com/en) | Custodial, off-nkɔnsɔnkɔnsɔn | Dabi, wɔpow sika a wɔde asie a wɔabɔ ho ban | Dabi | Free sika kotoku kɔ sika kotoku, 0.8% payouts | Geo-restricted, ZEC a wɔayi afi ne din mu wɔ FR, ES, IT, PL | 2026-07-29 |

</div>

### Nea adum no kyerɛ

**Custody** ne sɛ ebia processor no kura wo ZEC no. Non-custodial kyerɛ sɛ ɛkɔ sika kotoku bi a wohwɛ so mu.

**Shielded ZEC** ne sɛ ebia wobetumi atua wo ka akɔ shielded pool no mu. Transparent nkutoo kyerɛ sɛ sika dodow ne address ahorow no yɛ ɔmanfo wɔ blockchain no so.

**Self-host** ne sɛ ebia w'ankasa wobɛtumi ayɛ software no, a company biara nni mfimfini.

**Aguadifo ka** no nka Zcash network fees, a obi tua wɔ tebea biara mu no nka ho.

Baabi a ɔdemafoɔ bi ntintim biribi no, nsɛm a wɔakyerɛw no ka sɛ "wɔanka" anaa "wɔnkyerɛw" sen sɛ wɔbɛsusu. Ɛno ne "dabi" nyɛ ade koro.

### Emu nea ɛwɔ he na ɛsɛ sɛ wopaw

Sɛ wopɛ kokoamsɛm ne tumidi a ɛsen biara a, fa **BTCPay Server** anaa **CipherPay** a wo ankasa woagye no di dwuma. Wɔn baanu nyinaa yɛ shielded, open source, na wonni sika biara mma wo.

Sɛ wopɛ sɛ wogye sika wɔ sotɔɔ mu sen sɛ wobɛfa intanɛt so a, fa **Flexa** di dwuma.

Sɛ wopɛ hosted gateway a wogye sikatua a ɛda adi pefee tom a, fa **NOWPayments** anaa **Plisio** di dwuma.

Kɔkɔbɔ biako a ɛfata sɛ yɛsan yɛ bio: processor a ɛyɛ transparent-only tintim sika biara a wotua ne address wɔ blockchain no so. Na sɛ wowɔ hosted non-custodial processor biara a wode wo viewing key no ma, enti adwumakuw no betumi ahu wo sikatua ɛwom mpo sɛ wontumi nsɛe no de. Self-hosting ne ɔkwan biako pɛ a wobɛfa so akwati saa.

<div class="processor-note">

**ZGo dwumadie kɔkɔbɔ, 29 July 2026.** ZGo akyi a ɛwɔ api.zgo.cash no san de HTTP 503 baeɛ wɔ endpoint biara so berɛ a na wɔrehwɛ krataafa yi. Wɔnnyae adwuma no na nea ɔhwɛ so no yɛɛ nnam wɔ mpɔtam hɔ ɔsram yi, nanso si so dua sɛ ɔsom no rekɔ so ansa na wode wo ho ato so.

</div>

---

## [CipherPay](https://www.cipherpay.app) <img src="/content-images/cipherpay-mark.png" alt="CipherPay logo" class="processor-logo" />
- **Mmoa Type**: Wɔabɔ ho ban (Orchard, denam Address ahorow a Wɔaka abom so)
- **Nkyerɛkyerɛmu**: Gye Zcash tom wɔ simma mu, Ɛnyɛ custodial, Zero adetɔfo data, Mfinimfini biara nni hɔ.
- **URL**: 1. [CipherPay a wɔde tua ho ka](https://www.cipherpay.app)
<img src="/content-images/cipherpay-mark.png" alt="CipherPay logo" width="200" hidden />

Woma CipherPay safoa a wotumi hwɛ nkutoo, enti sikatua kɔ w’ankasa sika kotoku mu tẽẽ na enkura sika da. Ɛde address foforo di dwuma ma invoice biara.

Orchard only. There is no Sapling or transparent support, even though the repository README mentions Sapling.

Ɛyɛ 1% wɔ sikatua biara mu, na sɛ w’ankasa wo tu mmirika a, ɛnyɛ hwee koraa. Adeɛ no nyinaa yɛ open source, sɛ Rust binary a ɛwɔ SQLite anaa sɛ Docker mfonini. KYC biara nni hɔ, na adetɔfo nhia akontaabu.

Nkitahodi ahorow no kata Shopify, WooCommerce, REST API bi, sika a wɔde gye sika, sikatua nkitahodi, ne QR a ɛfa obi ankasa ho.

Nneɛma abien a ɛsɛ sɛ wɔkari. Ɛhyɛɛ aseɛ wɔ Ɔpɛpɔn 2026 mu na ɛnni ahobanbɔ ho akontabuo biara a wɔatintim. Na wɔ hosted tier no so no operator no kura wo viewing key, enti obetumi ahu wo payments. Self-hosting yi saa asɛm no fi hɔ. Sika a wɔabɔ ho ban nso yɛ nea etwa to, enti sika a wɔsan de ma no hia sɛ nea ɔtɔɔ no ma wo address.

**Wɔagye atom nea etwa to:** 2026-07-29

---

## [BTCPay Server](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin) <img src="/content-images/btcpay-mark.png" alt="BTCPay Server logo" class="processor-logo" />
- **Mmoa Type**: Wɔabɔ ho ban nkutoo (Sapling, Orchard, Unified Address)
- **Nkyerɛkyerɛmu**: BTCPay Server yɛ open-source, cryptocurrency sikatua dwumadie a ɛyɛ ne ho.
- **URL**: 1. [BTCPay Server a wɔde di dwuma](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
<img src="/content-images/btcpay-mark.png" alt="BTCPay Server logo" width="200" hidden />

Ɔkwan a emu yɛ den sen biara a wobetumi afa so wɔ mmofra a wɔbɛhwɛ no ho. Ne wallet backend no yɛ view-only na enkura seed anaa secret key biara, enti server a wɔayɛ no basaa mpo ntumi nsɛe wo sika.

Shielded nkutoo, ɛkata Sapling, Orchard ne Unified Addresses so. Fallback biara nni hɔ a ɛda adi pefee, enti nnyɛ nhyehyɛe ntwa biako ho nhyia.

Sɛ wopɛ sɛ wode hyɛ mu a, wuhia btcpay-zcash Docker fork a ɛwɔ feat/zec baa dwumadibea no so, ne hwɛbea safoa a wɔde fi sika kotoku te sɛ Ywallet anaa Zingo mu kɔ amannɔne. Sɛnea wɔahyɛ no, ɛne akyirikyiri lightwalletd kasa, anaasɛ wo ankasa wubetumi ayɛ Zebra na woayɛ lightwalletd.

Anohyeto biako a ɛsɛ sɛ wuhu ho asɛm: plugin no de Zcash sika kotoku biako di dwuma ma sotɔɔ biara a ɛwɔ instance bi so, enti nnyɛ no wɔ shared server so. Wɔreyɛ sika kotoku a wɔde di dwuma wɔ sotɔɔ biara mu ho adwuma.

Wɔntua sika biara wɔ software no ankasa ho. Wotua Zcash network fees ne nea wo hosting ka biara.

**Wɔagye atom nea etwa to:** 2026-07-29

---

## [ZGo](https://zgo.cash/) <img src="/content-images/zgo-prp2-497679039b.webp" alt="ZGo logo" class="processor-logo" />
- **Support Type**: Shielded (Sapling and Orchard)
- **Nkyerɛkyerɛmu**: ZGo yɛ kɔmputa so sikatua kwan a efi w’adetɔfo hɔ kɔ wo nkyɛn tẽẽ, a nnipa foforo biara nni mu.
- **URL**: 1. [ZGo](https://zgo.cash/)
<img src="/content-images/zgo-prp2-497679039b.webp" alt="ZGo logo" width="200" hidden />

A till wo run wɔ browser mu, enti laptop, tablet anaa fon bɛyɛ checkout. WooCommerce plugin ne REST API nso wɔ hɔ. Vergara Technologies na ɛsiiɛ na Zcash Community Grants na ɛde sika maeɛ, a nea ɛka ho ne sɛ wɔbɛtu afiri zcashd akɔ Zebra.

Sika fi adetɔfo no hɔ kɔ wo sika kotoku mu tẽẽ, na obiara nni ntam.

Shielded, covering Sapling and Orchard through Unified Addresses, and it follows ZIP 321. Mprempren fibea biara nni hɔ a ɛka sɛ ɛdi address a ɛda adi pefee ho dwuma, enti krataafa yi nkyerɛ bio sɛ ​​ɛyɛ saa.

Worentumi nyɛ wo ho ahɔho ankasa. ZGo di Zcash infrastructure no so ma wo na ɛntintim deployment guide biara. Fibea no yɛ ɔmanfoɔ wɔ ɔhwɛfoɔ no ankasa Git server so, ɛwom sɛ GitLab copy a nkurɔfoɔ taa hunu no yɛ 2022 ahwehwɛ a ayɛ dedaw.

Ɛnyɛ nea wɔde ma kwa nso. ZGo tɔn prepaid sessions na ɛhia Pro session ma WooCommerce, nanso mprempren boɔ krataafa no yɛ nea wontumi nkɔ hɔ, enti wɔamfa akontabuo biara aka wɔ ha.

**Wɔagye atom nea etwa to:** 2026-07-29

---

## [Flexa](https://flexa.co/) <img src="/content-images/flexa-mark.png" alt="Flexa logo" class="processor-logo" />
- **Mmoa Type**: Adetɔfo sɛe sika shielded, gye afã a wɔankyerɛw
- **Nkyerɛkyerɛmu**: Flexa yɛ sikatua ntam nkitahodi a ɛma adetɔfo sɛe dijitaal agyapade, a Zcash ka ho, wɔ mmeae a wɔtɔn nneɛma fi sika kotoku a wɔde hwɛ wɔn ankasa so.
- **URL**: 1. [Flexa](https://flexa.co/)
<img src="/content-images/flexa-mark.png" alt="Flexa logo" width="200" hidden />

Flexa nyɛ checkout gateway, enti ɛnyɛ swap ma afoforo a wɔwɔ ha no. Adetɔfoɔ no bue sika kotokuo a Flexa wɔ mu te sɛ Zodl, kyerɛ koodu a wɔde di dwuma pɛnkoro, na sotɔɔ no scan. ZEC invoice biara nni hɔ na e-commerce plugin biara nni hɔ.

Adetɔfo no de wɔn ankasa sika sie kosi bere a wobetua no. Wo sɛ oguadini no nnya ZEC da. Flexa ne wo siesie wɔ sika a wopaw no mu, enti wɔn na wodi crypto afã no ho dwuma.

Flexa ankasa dawurubɔ no ka Zcash nkabom no ho asɛm sɛ ɛde ZEC a wɔabɔ ho ban no tua. Address type bɛn na Flexa nya to no, wontintim wɔ baabiara.

Ɛka no yɛ 1% wɔ sikatua biara mu, a nsakraeɛ ne hwɛ a wɔbɛhwɛ no ka ho a wɔrentua hwee.

Ɛyɛ adwuma wɔ United States na efi July 2026 no, ɛyɛ adwuma wɔ SEPA aman ne nsasesin 37 mu. Wɔnka sɛ ebia wobetumi de ZEC titiriw adi dwuma wɔ Europa anaa.

**Wɔagye atom nea etwa to:** 2026-07-29

---

## [NOWPayments](https://nowpayments.io/supported-coins/zcash-payments) <img src="/content-images/nowpayments-wordmark.png" alt="NOWPayments logo" class="processor-logo processor-logo-wide" />
- **Mmoa Type**: Ɛyɛ nea ɛda adi nkutoo
- **Nkyerɛkyerɛmu**: NOWPayments yɛ crypto sikatua apon a ɛma aguadifo tumi gye Zcash sikatua ne ntoboa a ɛnyɛ den.
- **URL**: 1. [MPREMPRENNtua a wotua](https://nowpayments.io/supported-coins/zcash-payments)
<img src="/content-images/nowpayments-wordmark.png" alt="NOWPayments logo" width="200" hidden />

Nhyɛso biara nni hɔ a wɔabɔ ho ban. Wɔn nkrataa no ka kyerɛ wo sɛ hyehyɛ address a ɛda adi pefee ma Zcash, na ZEC nkutoo ne sika a wɔyi fi mu saa kwan no so. Ka biara a wubenya no yɛ baguam wɔ blockchain no so.

Ɛnyɛ custodial denam default so. Wɔn FAQ ka sɛ wɔmfa sika nsie na wɔnkura kokoam safe da. Sika a wode bɛhwɛ wo ho wɔ hɔ a wubetumi apaw, enti sɛ ɛho hia sɛ wugye di a, hwɛ wo akontaabu nhyehyɛe no mu.

Ɛka yɛ 0.5% ma sikatua tẽẽ, anaa 1% ma sika pii, fixed-rate, anaa "fee a ɔde di dwuma no tua" tua, a netɛw ho ka wɔ soro.

Ɛwɔ hɔ wɔ wiase nyinaa gye baabi a mmara bara no. Wonhia KYC na woafi ase agye crypto, na woatwe fiat nkutoo.

**Wɔagye atom nea etwa to:** 2026-07-29

---

## [Plisio](https://plisio.net/accept-zcash) <img src="/content-images/plisio-wordmark.png" alt="Plisio logo" class="processor-logo processor-logo-wide" />
- **Mmoa Type**: Transparent (wɔnkyerɛw) .
- **Nkyerɛkyerɛmu**: Plisio yɛ cryptocurrency sikatua apon a ɛma nnwuma tumi gye Zcash sikatua.
- **URL**: 1. [Plisio na ɔkyerɛwee](https://plisio.net/accept-zcash)
<img src="/content-images/plisio-wordmark.png" alt="Plisio logo" width="200" hidden />

Fa no sɛ nea wɔde hwɛ mmofra. Plisio aguadi frɛ no nea ɛnyɛ nea wɔde sie, nanso n’ankasa mmoa nkratafa kyerɛkyerɛ sika a ɛkari pɛ a wɔde sie wɔ asɛnka agua so, nneɛma a wɔkora so wɔ nwini mu ne ɔkwan a wɔfa so yi sika fi mu. Wɔantumi ankyerɛ sɛ wɔmfa wɔn nkɔto afiase.

Plisio nka da sɛ Zcash address ahorow bɛn na ɛde di dwuma, enti fa no sɛ ɛyɛ nea ɛda adi kosi sɛ obi besi so dua sɛ ɛnte saa.

Wallet no yɛ free, gateway ne API no bo yɛ 0.5%, na White Label yɛ 1.5%. White Label yɛ wɔn hosted service no rebrand, ɛnyɛ self-hosting.

Wonhia KYC na woanya sikatua, na wontintim aman a wɔabara wɔn din biara.

**Wɔagye atom nea etwa to:** 2026-07-29

---

## [Binance Pay](https://pay.binance.com/en) <img src="/content-images/binancepay-mark.png" alt="Binance Pay logo" class="processor-logo" />
- **Mmoa Type**: Transparent nkutoo, wɔpow sika a wɔde asie a wɔabɔ ho ban
- **Nkyerɛkyerɛmu**: Binance Pay yɛ cryptocurrency sikatua kwan a ɛboa Zcash sikatua.
- **URL**: 1. [Binance Akatua](https://pay.binance.com/en)
<img src="/content-images/binancepay-mark.png" alt="Binance Pay logo" width="200" hidden />

Binance dane ZEC a wɔde fi address ahorow a wɔabɔ ho ban so. Saa pow no ne nea enti a wɔyɛɛ TEX address ahorow no.

Ɛyɛ nea wɔde hwɛ mmofra koraa. Katua kɔ off-chain wɔ Binance Pay sika kotoku ntam, na wuhia Binance akontaabu a wɔagye atom.

Wallet-to-wallet transfers yɛ kwa, aguadifoɔ tua ho ka 0.8% a wɔahyɛ no 5 USD, na Mini Program aguadifoɔ tua 1%.

Hwɛ sɛ ɛwɔ baabi a wowɔ ansa na wode wo ho ato so. Wɔmfa Binance Pay mma wɔ aman ne nnwuma bi mu, wɔayi ZEC afi wɔn din mu ama wɔn a wɔde di dwuma wɔ France, Spain, Italy ne Poland fi afe 2023, na wɔasɛe ɔsom wɔ EEA wɔ MiCA ase.

**Wɔagye atom nea etwa to:** 2026-07-29

---

### Ɛnyɛ ZEC a wonnye ntom bio

Wɔabobɔ eyinom abien nyinaa din wɔ ha kan. Wɔhwɛɛ obiara a ɔde ma no ankasa live currency list wɔ 29 July 2026 na Zcash nni abien no nyinaa mu.

**CoinPayments** nkyerɛw ZEC wɔ ne v2 sika list, ne legacy list, anaa ne live currencies API, na ne Zcash asɛm no mprempren dan kɔ homepage no so.

**CoinGate** nkyerɛw ZEC wɔ ne sika a wɔboa no krataafa so anaa ne ɔmanfo API mu. Wɔammɔ amanneɛ sɛ wɔayi wɔn afi wɔn din mu, enti wonnim nea enti a wɔyɛɛ saa ne da a wɔyɛe.

Sɛ emu biara de Zcash san ba a, fa ka ho bio a date a wɔagye atom foforo ka ho.

### Kratafa yi a wɔbɛma ayɛ pɛpɛɛpɛ

Privacy coin support di akɔneaba, enti krataafa yi ye te sɛ ne check a etwa to no nkutoo. Sɛ wosan hwɛ mu a:

1. Hwɛ ɔdemafoɔ no ankasa sika a wɔahyehyɛ anaa API. Na nnipa a wɔto so abiɛsa din a wɔahyehyɛ no bere atwam wɔ processor abien a wɔayi afi hɔ wɔ atifi hɔ no nyinaa ho.
2. Hwɛ Zcash address ahorow a wɔboa. "Supports Zcash" taa kyerɛ address ahorow a ɛda adi pefee nkutoo.
3. Yɛ da a wɔagye atom no foforo wɔ pon no so ne saa ɔdemafo no fã hɔ.
