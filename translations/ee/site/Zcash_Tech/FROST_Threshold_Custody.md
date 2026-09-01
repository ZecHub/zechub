<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/FROST_Threshold_Custody.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# FROST & Threshold Dzikpɔkpɔ na Shielded ZEC

> Ne èdi FROST ƒe ɖoɖowɔɖia ƒe nya ɣaɣlawo ŋuti nyatakaka bliboa la, kpɔ... [FROST mɔ̃ɖaŋununya ƒe axa](FROST.md).

FROST threshold custody yi edzi le vavam le Zcash dzeɖoɖowo me — enye track top le ZecHub Hackathon 2026 — gake womeɖea susua me ɣesiaɣi le gbegbɔgblɔ bɔbɔe me o. Axa sia ƒo nu tso nusi wòfia, ɣeyiɣi si nèhiãe ŋutɔŋutɔ, asitsatsa, kple dɔwɔnu siwo doa alɔe egbea ŋu.

---

## TL;DR

- **FROST** na be safuitɔwo ƒe ƒuƒoƒo aɖe kpɔa ŋusẽ ɖe Zcash adrɛs si wokpɔ ta na dzi le ƒuƒoƒo me evɔ ame ɖeka aɖeke melé ame ŋutɔ ƒe safui bliboa ɖe asi o.
- **t-of-n** ƒe dzidzenu fia be: ele be t amewo nade asi ete be woazã ga; t-1 ɖesiaɖe alo esi mede nenema o mate ŋu aʋuʋu ga la ɖeɖeko o.
- Adzɔnuwo le abe asitsatsa bubu ɖesiaɖe si wokpɔ ta na ene — afɔti aɖeke si le kɔsɔkɔsɔ dzi si ɖee fia be wozã dzidzenu ƒe asidede agbalẽ te o.
- Esia to vovo kura tso multisig si me kɔ (si nye dutoƒo on-chain eye Zcash do alɔe ɣeyiɣi didi aɖee nye sia) — FROST wɔa dɔ le shielded pool la me.
- Eɖea vi na DAOwo, asitɔtrɔwo, vidzikpɔkpɔdɔwo, gadzadzraɖo ɖekae, kple ƒuƒoƒo ƒe gaxɔwo — afisiafi si kpododonu vevi ɖeka ƒe teƒe ɖeka si dzi womate ŋu alɔ̃ ɖo o.

---

## Nukae nye FROST le gbegbɔgblɔ si me kɔ me?

Kpɔe ɖa le susu me be asitsahabɔbɔ etɔ̃ siwo dometɔ ɖesiaɖe lé safui aɖe ɖe asi. Be woazã ga tso woƒe gakotoku si wozãna ɖekae me la, ele be ame etɔ̃awo dometɔ eve ɖesiaɖe nalɔ̃ ɖe edzi eye woade asi ete ɖekae. Asitsatsa si do tso eme la dze abe ɖe ame ɖekaɖeka dɔdɔ edziedzi ene — eteƒekpɔla aɖeke mate ŋu anya tso blockchain la me be ame geɖe kpɔ gome le eme o.

FROST (**Flexible Round-Optimized Schnorr Threshold Signatures**) nye nya ɣaɣlawo ƒe ɖoɖowɔɖi si na esia te ŋu dzɔna na Zcash si wokpɔ ta na. Chelsea Komlo (Waterloo Yunivɛsiti / Zcash Foundation) kple Ian Goldberg ye wɔe.

Nɔnɔme vevi siwo le eme:

- **Dzidzenu**: t-of-n ƒe asidedelawo koe wòle be woakpɔ gome le eme (e.g. 2-of-3, 3-of-5)
- **Shielded**: wɔa dɔ le Orchard ƒe ameŋunyatakakawo ƒe ta la me — ga homewo, ame si ɖoe ɖa, kple amesi xɔe la nɔa adzame
- **Womate ŋu ade vovototo wo dome o**: asidede agbalẽ te mamlɛtɔ le abe Zcash ƒe adzɔnu bubu ɖesiaɖe si wokpɔ ta na ene
- **Non-custodial**: akpa ɖeka aɖeke melé safui bliboa ɖe asi gbeɖe o — menye ɖoɖowɔla gɔ̃ hã o

---

## Ɣekaɣie wòle be nàzã threshold custody?

Susu le threshold custody me ne **mele be safui ɖeka alo ame ɖeka bu nafia be ga la bu o** o.

| Nɔnɔme | Nusita threshold custody kpena ɖe |
|-----------|----------------------------|
| **DAO alo ƒuƒoƒo ƒe gaxɔ** | Admin ɖeka aɖeke mate ŋu aɖe ga le akpa ɖeka o; bia be woalɔ̃ ɖe edzi |
| **Xɔɖɔli alo nudzrala** | Ma afɔku veviwo ɖe dedienɔnɔ ƒe teƒewo alo dɔwɔlawo |
| **Ame ŋutɔ ƒe nufamɔ̃ (kple ƒome si dzi woka ɖo)** | 2-of-3 le wò + ƒomea me tɔ eve dome — ku alo bu mɔɖeɖe, ga mebu o |
| **Escrow** ƒe agbalẽ | Nuƒlela, nudzrala, kple nyadrɔ̃la ɖesiaɖe ƒe gome le eme; gawo ɖea asi le wo ŋu ne ame eve lɔ̃ ɖe edzi |
| **Gakpekpeɖeŋunana si ƒe asixɔxɔ lolo** | ZCG-style: bia be woade asi agbalẽ te le wo ɖokui si geɖe hafi axe fe |
| **Developer safuiwo dzikpɔkpɔ** | Xɔ mɔ ɖe ŋɔdzidoname si tso ememe nu — mɔ̃ɖaŋudɔwɔla ɖeka aɖeke mate ŋu aɖe protocol fund |

Anɔ eme be **mehiã** be nàlé be na ame ŋutɔ ƒe gakotoku si dzi wò ɖeka nèkpɔ ŋusẽ ɖo o, ga suewo, alo nɔnɔme siwo me ɖoɖowɔwɔ ƒe gazazã si wotsɔ kpe ɖe eŋu la lolo wu afɔku dzi ɖeɖe kpɔtɔ.

---

## Aleke wòto vovo tso multisig si me kɔ gbɔe?

Zcash do alɔ multisig si me kɔ ɣeyiɣi didi aɖee nye sia — safui geɖe siwo hiã be woazã tso t-adrɛs dzi. Gake multisig si me kɔ la ƒe adzame gazazã gã aɖe le esi: **multisig ƒe ɖoɖoa, dutoƒo safuiwo katã, kple amesiwo katã de asi ete la dzena le blockchain la dzi**.

FROST kpɔa esia gbɔ to dɔwɔwɔ le ta si wokpɔ ta na la me me:

| | Multisign si me kɔ | FROST ƒe dzidzenu (si wotsɔ akpoxɔnu wɔe) |
|--|---------------------|--------------------------|
| Pool | Transparent (public) | Orchard (shielded) |
| Amesiwo de asi ete siwo wokpɔna le kɔsɔkɔsɔ me | Ẽ — dutoƒo safuiwo katã ɖe go | Ao — womate ŋu ade vovototo wo kple asidede agbalẽ te ɖeka ƒe gazazã |
| Ga home siwo wokpɔna | Ẽ | Ao |
| Nuwɔwɔ aduadu hiã | On-kɔsɔkɔsɔ ŋɔŋlɔdzesiwo | Off-kɔsɔkɔsɔ ƒoƒo ƒe kadodo |
| Adzamenyawo | Ðeke meli o | Adzamenyawo si wokpɔ ta na bliboe |

---

## Asitsatsa kple seɖoƒewo

Ŋusẽ le FROST ŋu, gake etsɔ asitsatsa ŋutɔŋutɔ siwo gɔme wòle be nàse hafi azãe la vɛ:

### Nuwɔwɔ aduadu ƒe gazazã dzi
Ele be amesiwo de asi ete la nanɔ Internet dzi le ɣeyiɣi ɖeka me (alo nenema kloe) hafi woate ŋu awu asidede agbalẽ te ƒe ɣeyiɣi aɖe nu. Ne wò t signers kaka ɖe ɣeyiɣi ƒe didimewo alo kadodo siwo dzi womate ŋu aka ɖo o me la, gazazã bia be woawɔ ɖeka si solo wallet mewɔna o.

### Asidede agbalẽ te aɖeke manɔmee ne quorum meli o
Ne safuixɔla siwo sɔ gbɔ meli o (dɔnɔ, mɔzɔla, womeɖoa nya ŋu o) la, womate ŋu azã ga hena ɣeyiɣi aɖe o. Tia wò dzidzenu kple gomekpɔkpɔ ƒe xexlẽme nyuie — 2-of-3 te ŋu nɔa te ɖe nɔnɔme sesẽwo nu wu 2-of-2.

### Dzidzime veviwo ƒe kɔnu
FROST ɖoɖo bia be woawɔ distributed key generation (DKG) ƒe wɔna si me n gomekpɔlawo katã le internet dzi ɖekae. Esia nye nudzɔdzɔ si wowɔna zi ɖeka, gake ele be woawɔe nyuie — ne wogblẽ gomekpɔlawo me le DKG wɔɣi la, dedienɔnɔ me gblẽna.

### Dɔwɔnuwo gakpɔtɔ le tsitsim
FROST na Zcash si wotsɔ akpoxɔnu wɔe nye nu yeye vie. IETF ƒe dzidzenu (draft-irtf-cfrg-frost) tsi, gake gakotoku ƒe ƒoƒo ɖekae se ɖe afi aɖe. Kpɔ mɔ na nugbɔ aɖewo siwo me mekɔ o ne wotsɔe sɔ kple gakotoku si me safui ɖeka le si wozãna ɖaa.

### Nusiwo me kɔ nyuie le hayahaya ŋu
Shard ƒe bu menye xexeame ƒe nuwuwu o (emae nye afisi woɖoe ɖo), gake ele be woaŋlɔ ɖoɖo siwo wowɔ be woagbugbɔ axɔ la ɖi do ŋgɔ. Amekae léa backups ɖe asi? Nukae dzɔna ne kakɛ eve bu le ɣeyiɣi ɖeka me?

---

## Amekae le xɔ tum kple FROST le Zcash dzi?

### Zcash Foundation — frost.zfnd.org
Zcash Foundation ɖo FROST ƒe dɔwɔwɔ si le dɔ wɔm kple demo site. Esia nye nufiame dɔwɔwɔ si wozãna hena dodokpɔ kple ŋgɔyiyi.

### YWallet FROST ƒe wɔwɔfia
YWallet (Zcash gakotoku si wɔa dɔ nyuie) ƒe FROST demo ƒe ɖekawɔwɔ gbãtɔ le esi. Kpɔ nya si [YWallet FROST Demo ƒe mɔfiame](/guides/Ywallet_FROST_Demo) hena mɔfiame siwo woana afɔɖeɖe ɖesiaɖe.

### ZecHub Hackathon 2026 — FROST Mɔzɔzɔ Dɔwɔnawo

FROST track lae nye esi hoʋiʋli le wu le ZecHub Hackathon 2026. Dɔ ɖedzesiwo:

- **ZecVault** — 2-of-3 akpoxɔnu escrow si woɖo ɖe mainnet (FROST dzidzenu)
- **Steward** — threshold custody na shielded Zcash kple UX si léa fɔ ɖe hayahaya ŋu

### Coinbase ƒe ƒuƒoƒo
Coinbase tu ewɔwɔ FROST dɔwɔwɔ na woƒe threshold signing systems (na Bitcoin), kple tɔtrɔ siwo ɖea preprocessing stage ɖa eye woma aggregator ƒe akpaa le gomekpɔlawo katã dome. Woƒe nuteƒekpɔkpɔ ɖo kpe FROST ƒe dedienɔnɔ ƒe kpɔɖeŋu dzi le ewɔwɔ ƒe dzidzenu nu.

---

## Alesi asidede agbalẽ te ƒe ɣeyiɣi aɖe wɔa dɔe (wowɔe bɔbɔe) .

1. **Ðoɖo (zi ɖeka):** Gomenɔla n katã wɔa dzidzime vevi si woma (DKG) ƒe wɔna. Wo dometɔ ɖesiaɖe xɔa shard si nye ame ŋutɔ tɔ; wokpɔa dutoƒo safui si woama. Akpa aɖeke menya ame ŋutɔ ƒe safui bliboa o.

2. **Kpɔ asidede agbalẽ te:** Ne ehiã be woazã ga aɖe la, ɖoɖowɔla (si ate ŋu anye amesiwo de asi ete dometɔ ɖeka) ƒoa adzɔgbeɖeɖewo nu ƒu tso gomekpɔla t siwo lɔ̃ be yewoade asi ete gbɔ.

3. **Round 1:** Amesiame si de asi ete si kpɔ gome le eme la wɔa nonce eye wòɖea gbeƒã adzɔgbeɖeɖe (dutoƒo, non-sensitive).

4. **Round 2:** Amesiame si de asi ete si kpɔ gome le eme la bua woƒe asidede agbalẽ te ƒe akpa aɖe to woƒe private shard zazã me eye wòkakanɛ.

5. **Aggregation:** Ðoɖowɔla la ƒoa t ƒe asidede agbalẽ te ƒe akpa aɖe nu ƒu ɖe Schnorr ƒe asidede agbalẽ te mamlɛtɔ ɖeka me — womate ŋu ade vovototo wo dome le kɔsɔkɔsɔ me tso akpa ɖeka ƒe asidede agbalẽ te o.

6. **Broadcast:** Woɖea asitsatsa la ɖe Zcash network la dzi abe alesi wòle dzɔdzɔmee ene.

Ne ame aɖe si de asi ete ɖo asidede agbalẽ te ƒe akpa aɖe ɖa la, ɖoɖowɔɖia dea dzesi wo eye wòdzudzɔa wo (woɖea wo ɖa le ɣeyiɣi siwo gbɔna me). Ðoɖowɔwɔ dzɔna le kɔsɔkɔsɔ godo — blockchain la koe kpɔa asitsatsa mamlɛtɔ.

---

## Wò threshold parameters tiatia

| Ðoɖowɔwɔ | Tenɔnɔ ɖe nɔnɔme sesẽwo nu | Afɔku |
|-------|-----------|------|
| 1-ɖe-1 me | No resilience — teƒe ɖeka si kpododonu le | Key loss = nusi bu tegbee |
| 2-ɖe-2 | Ele be asidede agbalẽ te eveawo siaa nanɔ esi — vodada dzi ɖeɖe kpɔtɔ aɖeke meli o | One unavailable = ga si wotu ɖe tsikpe me |
| 2-le-3 me | Shard ɖeka ateŋu abu alo makpɔe o | Dedienɔnɔ ƒe vovototo si bɔbɔ wu 3-of-5 |
| 3-le-5 me | Woate ŋu abu kakɛ eve; dedienɔnɔ sesẽ | Nuwɔwɔ aduadu geɖe wu le gazazã dzi |
| 3-le-7 me | Dɔwɔƒe ƒe dzeside; eɖea mɔ ɖe kpododonu eve ŋu | Nuwɔwɔ aduadu ƒe gazazã gã |

Gɔmedzedze nyui aɖe na ƒuƒoƒo akpa gãtɔ: **2-le-3** (si te ŋu nɔa te ɖe nɔnɔme sesẽwo nu, nuwɔwɔ aduadu suetɔ kekeake) alo **3-le-5** (habɔbɔ me, dedienɔnɔ si lolo wu).

---

## Axa Siwo Do Ƒome Kplii

- [FROST — Mɔ̃ɖaŋununya ƒe Deep Dive](FROST.md) — ɖoɖowɔɖia ŋuti nyatakaka ɣaɣlawo (DKG, asidede agbalẽ te, dedienɔnɔ ƒe kpeɖodziwo)
- [YWallet FROST Demo Mɔfiame](/guides/Ywallet_FROST_Demo) — afɔɖeɖe ɖesiaɖe ƒe asi-ɖe-ɖefia
- [FROST ƒe wɔwɔfia (frostdemo) .](/guides/ywallet-frost-demo) — Zcash Foundation ƒe wɔwɔfia ƒe azɔlizɔzɔ
- [Safuiwo Kpɔkpɔ](Viewing_Keys.md) — nuxexlẽ ɖeɖeko ƒe mɔɖeɖe ɖe adrɛs siwo ŋu wokpɔ ta na ŋu (etsɔ kpe ɖe threshold custody ŋu)
- [Zcash ƒe Nunɔamesi Siwo Wokpɔna](Zcash_Shielded_Assets.md) — FROST hã nye xɔtuɖoɖo veviwo na ZSA ƒe tata

## Nunɔamesiwo

- [FROST ƒe numekuku gbalẽ (Komlo & Goldberg, 2020)](https://eprint.iacr.org/2020/852.pdf)
- [IETF FROST ƒe ɖoɖowɔɖi ƒe dzidzenu (draft-irtf-cfrg-frost) .](https://datatracker.ietf.org/doc/draft-irtf-cfrg-frost/)
- [Zcash Foundation FROST ƒe dɔwɔwɔ](https://frost.zfnd.org)
- [Chelsea Komlo — Nukae nye Dzesidede Asi? (Zcon3) (Zcon3) .](https://youtu.be/cAfTTfblzoU?t=110)
- [Coinbase — Dzidzenu Digitál Dede Asi](https://www.coinbase.com/blog/threshold-digital-signatures)
- [ROAST — Async Schnorr ƒe Dzidzenu ƒe Asidede Asi Sesẽ (Blockstream) .](https://eprint.iacr.org/2022/550.pdf)
