<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Outgoing_Viewing_Keys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Funguo za kutazama za utumaji (OVKs)

Ufunguo wa kutazama wa utumaji [outgoing viewing key, OVK] ni thamani ya baiti 32 inayotumiwa tu kusimba fiche maandishi fiche *ya utumaji* ya output ya faragha. Humwezesha mhusika kurejesha matini wazi ya dokezo iliyotumwa (anwani ya mpokeaji, thamani, na ujumbe) bila kuwa na uwezo wa kutumia fedha au kuona madokezo yanayoingia.

Mpokeaji husimbua fiche dokezo linaloingia kwa kutumia ufunguo wake wa kutazama wa kuingia. Chaguo la OVK halibadilishi kile mpokeaji anakiona. Hakuna usimbaji wa kawaida wa OVK ghafi; ni baiti 32 tu.

## Kwa ufupi

- OVK hudhibiti tu ni nani anayeweza kurejesha matini wazi ya utumaji ya malipo ya faragha [shielded payment].
- Pochi [wallets] huchagua kati ya sera tatu: **Sender** (urejeshaji wa kawaida kwa UFVK ya akaunti), **Custom** (urejeshaji kwa ufunguo unaotoa), au **Discard** (hakuna anayeweza kurejesha matini wazi ya utumaji kutoka kwenye mnyororo [chain]).
- Hata kwa Discard au OVK maalum, mmiliki wa UFVK bado huona madokezo yaliyotumika na anaweza kukokotoa kiasi halisi kilichoondoka kwenye akaunti.
- Njia pekee ya kuaminika ya kuweka kiasi kisichoonekana kwa UFVK fulani ni kuhakikisha kwamba madokezo hayakuwa kamwe mali ya akaunti hiyo (akaunti tofauti au pochi tofauti).
- Sera hizi tatu tayari zipo katika `zcash_client_backend`; karibu kila pochi leo hutumia tu sera chaguomsingi ya Sender.

---

## Sera hizi tatu

Pochi zilizojengwa kwenye `zcash_client_backend` huchagua `OvkPolicy` zinapounda muamala [transaction]:

| Sera | Maandishi fiche ya utumaji | Ni nani anayeweza kurejesha matini wazi ya utumaji baadaye |
|--------|----------------------|----------------------------------------------|
| **Sender** (chaguomsingi) | Husimbwa fiche kwa OVK ya kawaida ya akaunti | Unified Full Viewing Key ya akaunti inayotuma |
| **Custom** | Husimbwa fiche kwa funguo unazotoa | Yeyote anayeshikilia funguo zilizotolewa |
| **Discard** | Hakuna OVK inayotumika (`ovk = ⊥`) | Hakuna mtu (hata mtumaji) |

Kijenzi rahisi huunda sera ya `Custom` kutoka thamani moja ya baiti 32 ili OVK ya nje na ya ndani ziwe ufunguo mmoja.

![Outgoing Viewing Key policy comparison](/content-images/ovk-policies.webp)

Tazama nyaraka za [OvkPolicy](https://zcash.github.io/librustzcash/rustdoc/latest/zcash_client_backend/wallet/enum.OvkPolicy.html) na [ZIP 310](https://zips.z.cash/zip-0310).

## Matumizi ya kila sera

**Sender** ni tabia ya kawaida ya pochi. Baada ya muamala kuchimbwa, yeyote anayeshikilia UFVK ya akaunti anaweza kusimbua fiche maandishi fiche ya utumaji na kurejesha anwani za wapokeaji, kiasi, na jumbe [memos].

**Custom** hukuwezesha kumpa mhusika wa tatu (mkaguzi, mchakataji wa malipo, mfumo wa stakabadhi, au kifaa tofauti) uwezo wa kusimbua fiche malipo mahususi ya utumaji bila kumpa ufunguo kamili wa kutazama. Unaweza pia kutumia ufunguo wa muda mfupi unaoutupa baada ya muamala, au kutumia funguo tofauti kwa wahusika tofauti ili ufunguo mmoja usione kila malipo ya utumaji.

**Discard** inamaanisha pochi inayotuma haiwezi kurejesha matini wazi ya utumaji kutoka kwenye mnyororo. Hili ni muhimu unapotaka kupunguza kile kinachoweza kurejeshwa ikiwa UFVK itaathiriwa baadaye, au unapochagua kwa makusudi kutokuwa na rekodi ya on-chain ambayo OVK ya akaunti inaweza kufungua.

## Kile ambacho mmiliki wa UFVK bado huona

Hata wakati Discard au OVK maalum inatumiwa, mmiliki wa UFVK ya akaunti bado anaweza:

- Kugundua madokezo ya akaunti yaliyotumika (kupitia nullifiers).
- Kujua thamani za madokezo hayo ya ingizo.
- Kurejesha madokezo yoyote ya chenji (haya yamesimbwa fiche kwa ufunguo wa kutazama wa kuingia wa ndani, si kwa OVK).
- Kwa hiyo kukokotoa kiasi halisi kilichoondoka kwenye akaunti.

Kisichoonekana ni anwani binafsi za wapokeaji, mgawanyo wa kiasi, na jumbe. Nyaraka za `WalletWrite` zinaonya kwamba data kuhusu miamala iliyoundwa chini ya Discard (au OVK maalum ya nasibu) haiwezi kurejeshwa kutoka kwenye data ya mnyororo ikiwa rekodi ya ndani itapotea.

## Kuweka kiasi nje ya UFVK fulani

`OvkPolicy` hudhibiti tu urejeshaji wa matini wazi ya utumaji. Haifichi matumizi au kiasi halisi kutoka kwa UFVK ya akaunti yenyewe.

Njia pekee ya kuaminika ya kuzuia kiasi kisionekane kwa UFVK fulani ni kuhakikisha madokezo yaliyobeba kiasi hicho hayakuwa kamwe mali ya akaunti inayodhibitiwa na UFVK hiyo:

1. **Akaunti tofauti za ZIP-32** (seed ileile) — Unda faharasa mpya ya akaunti, hamisha fedha kwake, na usiwahi kuhamisha UFVK ya akaunti hiyo. UFVK ya akaunti ya awali huona tu uhamisho kwenda kwenye akaunti mpya.
2. **Pochi tofauti kabisa** (seed tofauti) — Weka fedha kwenye pochi mpya, tumia fedha kutoka humo, na utupe seed au UFVK. Pochi ya awali hurekodi tu uhamisho wa ufadhili.
3. **Pochi za muda za matumizi ya mara moja** — Sawa na hapo juu, lakini ichukulie pochi ya matumizi kuwa ya kutupwa.

UFVK ni ya kila akaunti. Madokezo ambayo hayakuwahi kuwepo katika akaunti hiyo hayaonekani kamwe kwenye salio lake au jumla za fedha zilizotoka.

## Jinsi pochi zinavyotumia sera leo

Karibu kila pochi ya uzalishaji hutumia tu sera chaguomsingi ya **Sender**, hivyo historia kamili ya utumaji inaweza kurejeshwa kutoka kwa UFVK. Sera nyingine mbili zipo katika maktaba lakini huwasilishwa mara chache katika violesura vya watumiaji.

Chaguo zinazowezekana siku zijazo zinajumuisha:

- Alama ya kila muamala inayomruhusu mtumiaji kuchagua Custom au Discard kwa malipo moja.
- Hali ya kudumu ya Discard (kurejesha seed kungeonyesha tu fedha halisi zilizotoka).
- OVK maalum kwa selective disclosure ya malipo binafsi (nyepesi zaidi kuliko ufichuzi kamili wa malipo wa [ZIP 311](https://zips.z.cash/zip-0311)).
- Kuendelea kutumia utenganishaji wa akaunti au pochi kwa ajili ya utengaji thabiti zaidi.

## Rasilimali

- [ZIP 310: Sifa za Usalama za Funguo za Kutazama za Sapling](https://zips.z.cash/zip-0310)
- [ZIP 316: Anwani Zilizounganishwa na Funguo za Kutazama Zilizounganishwa](https://zips.z.cash/zip-0316)
- [ZIP 315: Mbinu Bora za Utekelezaji wa Pochi](https://zips.z.cash/zip-0315)
- [OvkPolicy katika zcash_client_backend](https://zcash.github.io/librustzcash/rustdoc/latest/zcash_client_backend/wallet/enum.OvkPolicy.html)
- [librustzcash](https://github.com/zcash/librustzcash)
- [zingolib](https://github.com/zingolabs/zingolib)

## Kurasa zinazohusiana

- [Funguo za kutazama](/zcash-tech/viewing-keys)
- [Ufichuzi wa malipo](/zcash-tech/payment-disclosures)
- [Anwani zilizounganishwa](/zcash-tech/unified-addresses)
- [Kile ambacho Kivinjari cha Block Kinaweza Kuona](/zcash-tech/what-a-block-explorer-can-see)
