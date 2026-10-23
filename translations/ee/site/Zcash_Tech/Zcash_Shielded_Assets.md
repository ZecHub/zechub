
<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zcash_Shielded_Assets.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>
<a href="">
    <img src="/content-images/image-2023-11-18-160742427-658dda69c0.webp" alt="" width="800" height="500"/>
</a>

# Zcash Nunɔamesi Siwo Wokpɔna

## TL;DR

Zcash Shielded Assets (ZSA) nye ɖoɖowɔɖi ƒe kekeɖenudɔ si wodo ɖa si ana nunɔamesiwo **siwo menye ZEC** o — stablecoins, dziɖuɖu ƒe dzesiwo, alo nunɔamesi ɖesiaɖe si wowɔ ɖe ɖoɖo nu — nanɔ Zcash's shielded pool me, eye woadzra ame si ɖoe ɖa, amesi xɔe, kple ga homea ɖe ame ŋutɔ ƒe nyawo me.

- **Nusi wònye:** ERC-20-style custom nunɔamesiwo, gake wokpɔ ta na le gɔmedzedzea me.
- **Amekae le etum:** [QEDIT](https://qed-it.com/), le gakpekpeɖeŋu si tso Zcash Foundation, le nuwɔwɔ aduadu kple Electric Coin Company.
- **Alesi wogblɔe:** [ZIP 226 ƒe xexlẽdzesi](https://zips.z.cash/zip-0226) (tsɔe yi teƒe bubu eye nàtɔ dzoe) ɖekae kple [ZIP 227 ƒe xexlẽdzesi](https://zips.z.cash/zip-0227) (si woɖe ɖe go).
- **Nɔnɔme:** mele agbe le mainnet dzi o eye menye Network Upgrade 7 (NU7). [ZIP 259 ƒe xexlẽdzesi](https://zips.z.cash/zip-0259), si yɔ nusianu si NU7 zãna la, melɔ ZIP 226 alo ZIP 227 ɖe eme o, eye womeɖo ZSA ƒe dɔwɔwɔ ƒe ŋkeke aɖeke o.
- **Fewo:** woxenɛ ɣesiaɣi le ZEC, eɖanye nunɔamesi ka kee wole ʋuʋum o.

---

## Numeɖeɖe Vevitɔ

Zcash Shielded Assets (ZSA) nye ŋgɔyiyi si wodo ɖa le Zcash ƒe ɖoɖowɔɖia ŋu si ana woate ŋu awɔ, atsɔ wo ayi teƒe bubu, eye woatɔ dzo nunɔamesi siwo wowɔ ɖe ɖoɖo nu le Zcash kɔsɔkɔsɔa dzi.

Ne ènya nu tso.. [ERC-20 ƒe agbalẽa](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/) dzesi dzidzenu le Ethereum blockchain, ZSAwo nye na Zcash abe alesi ERC-20 dzesiwo le na Ethereum ene.

Zcash Shielded Assets ana woate ŋu awɔ dzesi siwo wowɔ ɖe ɖoɖo nu le Zcash blockchain la dzi, si ana woaɖe mɔ na dzesi siwo menye [ZEC](/guides/using-zec-privately) be woakpɔ viɖe tso adzɔnu siwo wokpɔ ta na ƒe ŋkɔmaɖemaɖe kple adzamenyawo me le Zcash blockchain la dzi.

ZSAwo zazã vevi aɖe si ate ŋu anye be woaɖe stablecoins ɖe Zcash ɖoɖowɔɖia dzi. Stablecoins nye cryptocurrencies siwo tsɔa woƒe asixɔxɔ dea ga fiat, abe United States Dollar alo Euro ene. Fifia la, stablecoins siwo wokakana wu dometɔ aɖewo nye ERC-20 tokens abe [USDC](https://www.circle.com/en/usdc) kple [Dai](https://docs.makerdao.com/).

ZSAwo zazã bubu si ate ŋu anye dziɖuɖu ƒe dzesiwo nana. Le kpɔɖeŋu me, ZecHub (wiki sia tala) nye Decentralized Autonomous Organization (DAO) eye ateŋu awɔ ZSA eye wòana eƒe hameviwo hena akɔdada le aɖaŋuɖoɖowo kple dziɖuɖu ŋuti nyametsotsowo ŋu.

Wole ZSAwo wɔm to.. [QEDIT](https://qed-it.com/), le gakpekpeɖeŋu gã aɖe si tso [Zcash Foundation](/zcash-organizations/zcash-foundation) le nuwɔwɔ aduadu kple.. [Electric Coin Company](/zcash-organizations/electric-coin-company). Esi wogale dɔ sia wɔm vevie ta la, wodaa nyatakaka yeyewo ɖe edzi [ka sia](https://forum.zcashcommunity.com/t/grant-update-zcash-shielded-assets-monthly-updates/41153) ƒe Zcash ƒe nyamedzroƒea. The [ZSA ƒe kpekpeɖeŋunana ƒe biabiawo](https://zcashgrants.org/gallery/25215916-53ea-4041-a3b2-6d00c487917d/33106640/) by QEDIT la le Zcash Foundation kpekpeɖeŋunana ƒe nyatakakadzraɖoƒe.

---

## Nukpɔkpɔ / Nusɔsrɔ̃

### Agbalẽkotoku si wotre nu na la

Kpɔ asitsatsa si wotsɔ Zcash ta kpɔ la ɖa abe agbalẽkotoku gbadza si wotu nu ɖo si wotsɔ ƒu gbe ɖe dutoƒo posuɖaka me ene. Ame sia ame ate ŋu akpɔe be woda agbalẽkotoku aɖe ɖe afima. Ame aɖeke mate ŋu akpɔ amesi ɖoe ɖa, amesi ƒoe nu ƒu, alo nusi le eme o — eye agbalẽkotoku ɖesiaɖe ƒe dzedzeme sɔ kple bubu ɖesiaɖe.

Egbea la, nu ɖeka koe ate ŋu atsɔ agbalẽkotoku si le Zcash network la dzi: ZEC.

ZSA metrɔa agbalẽkotokua o. Etrɔa **nusi woɖe mɔ na le eme**. Le ZSA megbe la, agbalẽkotoku ma ke si wotre nu na ate ŋu atsɔ stablecoin, DAO ƒe dziɖuɖu ƒe dzesi, alo dɔwɔƒe ƒe nuteƒewɔwɔ ƒe teƒe — eye ne èkpɔe la, adze abe agbalẽkotoku bubu ɖesiaɖe si le network la dzi pɛpɛpɛ kokoko.

Nya ɖeka si sɔ be nàlé ɖe asi: **woxea posufe ɣesiaɣi le ZEC**, eɖanye nuka kee le agbalẽkotokua me o.

### Nusi gotagome eteƒekpɔla ate ŋu akpɔ

| Eteƒekpɔla ate ŋu akpɔ... | ERC-20 le Ethereum dzi | ZSA le Zcash |
| --- | --- | --- |
| Ame si ɖoe ɖa | Amedome | Wotsɔ akpoxɔnu na |
| Ame si xɔe | Amedome | Wotsɔ akpoxɔnu na |
| Aleke gbegbee woʋãe nye si | Amedome | Wotsɔ akpoxɔnu na |
| Ame ɖekaɖekawo ƒe dadasɔ | Amedome | Wotsɔ akpoxɔnu na |
| Nusiwo woatsɔ ana nunɔamesiawo katã | Amedome | **Dutoƒo — eɖoe koŋ** |
| Ga si me woxea fetu la le | ETH | ZEC |

### Nusitae nuzazãwo ƒe fli la menye nudzodzoe o

Fli eve siwo le ete le kplɔ̃a dzi lae nye afisi ZSA doa dzidzɔ na ame le.

ZIP 227 ɖoe koŋ na **eɖeɖe ɖe go le gaglãgbe**, ale be woate ŋu alé ŋku ɖe nunɔamesi ɖesiaɖe ƒe nusiwo le tsatsam ŋu le kɔsɔkɔsɔ me. Ame ɖekaɖekawo ƒe nunɔamesiwo kple ame ɖekaɖekawo ƒe fexexe nɔa ame ŋutɔ si; dzesi siwo katã li la ƒe xexlẽme mewɔa esia o.

Le stablecoin nana gome la, ƒuƒoƒo mae nye nya la tsɔ wu be wòanye nugblẽfexexe. Woate ŋu adzro ga si wodzra ɖo ɖi me ɖe nusi dzi woate ŋu aka ɖo le dutoƒo nu, evɔ ame siwo zãa dzesia ŋutɔŋutɔ ya tsɔa woƒe ga si susɔ kple ga si woxena la naa wo ɖokui.

### Nusiwo nye nunɔamesi ɖeka, dzesidenu ɖeka

Nu ɖesiaɖe xɔa **Nunɔamesi ƒe Dzesidenu** tɔxɛ aɖe, si woɖe tso amesi tsɔe na ƒe safui me kpe ɖe nunɔamesi la ŋuti nuŋlɔɖi si woŋlɔ ɖe agbalẽ me ŋu. Nudzɔdzɔdɔwɔƒe vovovo eve mate ŋu awɔ dzesidenu ɖeka o, eye nunɔamesi aɖe wɔwɔ alo tɔtrɔ bia be woaɖe mɔ ɖe nya ɣaɣlawo ŋu tso edzɔla gbɔ. Le agbalẽkotoku ƒe nya nu la: amesiame ate ŋu aɖo agbalẽkotoku ɖe Internet dzi, gake gakotoku si si nunɔamesi aɖe le koe ate ŋu ata eƒe akpa gãtɔ.

---

## Deep Dive (Tsi me tsi goglo)

### ZSA Demo le Zebra

[![Video Thumbnail](/content-images/hqdefault-3ae84de424.webp)](https://youtu.be/1MZMGC9ViyA)

**Ƒo demo la na ɖokuiwò!**

Klo zcash-tx-tool ƒe nudzraɖoƒea ƒe nɔnɔmetata: [https://github.com/QED-it/zcash_tx_tool](https://github.com/QED-it/zcash_tx_tool)

### Zcash ƒe Ŋgɔyiyi ƒe Aɖaŋuɖoɖowo (ZIPs)

- [ZIP 226 ƒe xexlẽdzesi](https://zips.z.cash/zip-0226): Zcash Shielded Assets ƒe Asitɔtrɔ Kple Wo Dzodzo
- [ZIP 227 ƒe xexlẽdzesi](https://zips.z.cash/zip-0227): Zcash Shielded Assets ƒe nana
- [ZIP 230 ƒe xexlẽdzesi](https://zips.z.cash/zip-0230): Version 6 Asitsatsa ƒe Nɔnɔme

> **De dzesii le ZIP 230 ŋu:** Woɖe ZIP 230 ɖa tso ɣemaɣi eye womawɔe o. Fifia woɖe asitsatsa ƒe tɔtrɔ 6 gɔme to [ZIP 229 ƒe xexlẽdzesi](https://zips.z.cash/zip-0229). Kpɔ gbeƒãɖeɖe si le etame [ZIP 230 ƒe xexlẽdzesi](https://zips.z.cash/zip-0230) axa 10.

ZIP 226 ɖe OrchardZSA ɖoɖowɔɖi gɔme — Orchard ɖoɖowɔɖi ƒe kekeɖenudɔwɔwɔ si tsɔa nunɔamesi siwo wowɔ ɖe ɖoɖo nu ƒe asitɔtrɔ kple wo dzodzo. ZIP 227 ɖe alesi wowɔa nunɔamesi mawoe le gɔmedzedzea me, eye ɖeko wòle be woawɔe kpe ɖe ZIP 226 ŋu.

### ZSA ƒe Gakpekpeɖeŋunana ƒe Aɖaŋuɖoɖo

ZSA ƒe aɖaŋuɖoɖo si nye Shielded Assets (ZSA/UDA) la nye esi [QEDIT](https://qed-it.com/) ƒuƒoƒo be woatu generic shielded nunɔamesiwo ɖe Zcash blockchain dzi. Zi geɖe la, woyɔa esiawo be Zãla ƒe Nunɔamesiwo (UDA) alo be Zcash Shielded Assets (ZSA).

Le aɖaŋuɖoɖo sia ta la, ƒuƒoƒo si le.. [QEDIT](https://qed-it.com/) ɖoe be yeatsɔ DeFi ava Zcash lãwo ƒe agbenɔnɔ ƒe ɖoɖoa me eye le ɣeyiɣi ma ke me la, yeana woate ŋu azã ameŋunyatakakawo ŋuti mɔ̃ɖaŋununya nyuitɔ kekeake le DeFi lãwo ƒe agbenɔnɔ ƒe ɖoɖo si li fifia me. Le numekuku aɖe si wowɔ le numekuku aɖe me la, ƒuƒoƒoa bia, eye nutoa me tɔwo ɖo nya ma ŋu [generic shielded assets (ZSA/UDA) ye nye nusi wobia wu fifia](https://twitter.com/BenarrochDaniel/status/1428327864034791429).

Aɖaŋuɖoɖo siawo wɔ ɖe mɔ̃ɖaŋununya dzi le.. [Zcash Ŋgɔyiyi ƒe Aɖaŋuɖoɖo (ZIP)](https://zips.z.cash/zip-0000) specification eye woɖe wo gɔme le ZIP 226 & ZIP 227 me.

1. [ZIP 226 ƒe xexlẽdzesi](https://zips.z.cash/zip-0226): Zcash Shielded Assets ƒe Asitɔtrɔ Kple Wo Dzodzo
2. [ZIP 227 ƒe xexlẽdzesi](https://zips.z.cash/zip-0227): Zcash Shielded Assets ƒe nana

---

## Nusiwo wòfia ŋutɔŋutɔ

**Ne èlé ZEC**

- Woɖe ZSAwo gɔme be wonye Orchard ("OrchardZSA") ƒe kekeɖenudɔwɔwɔ, eyata woama mɔ̃ siwo wotsɔ akpoxɔnu wɔe siwo ZEC zãna xoxo. Wò gakotokua ahiã ZSA ƒe kpekpeɖeŋu si dze ƒã hafi wòate ŋu alé wo alo aɖo wo ɖa.
- Àhiã ZEC aɖewo le asiwò ɣesiaɣi. Woxea fe siwo woxena ɖe ZSA nana kple etsɔtsɔ yi teƒe bubu ta le ZEC, ke menye le nunɔamesi la ŋutɔ me o.
- Naneke metrɔna le wò ZEC asitsatsa siwo li fifia ŋu o.

**Ne ènye amesi ate ŋu ana — stablecoin, DAO, dɔwɔƒe**

- Nunɔamesi aɖe nana bia be nàna mɔɖeɖe ɖe nya ɣaɣlawo ŋu si wobla ɖe asiɖeɖe le nu ŋu ƒe safui ŋu, eyata wò ɖeka koe ate ŋu awɔ wò ŋutɔ wò nunɔamesi ƒe nɔnɔmewo alo atrɔ wo.
- Woate ŋu adzro wò nunɔamesi ƒe nusiwo le tsatsam la me le dutoƒo evɔ wò zãlawo ƒe ga si susɔ kple esiwo wotsɔ yi na ame bubuwo ya ya mate ŋu awɔe o. Le gadzɔdzɔdɔwɔƒe si ŋu wowɔ ɖoɖo ɖo gome la, zi geɖe la, esiae nyea nuƒoƒoƒu si tututu hiã.
- Asiɖeɖe le gadodo ɖeka ŋu ate ŋu ana nunɔamesi siwo wu ɖeka nado zi ɖeka.

**Na lãwo ƒe agbenɔnɔ ƒe ɖoɖo**

- Esi wònye be woŋlɔ ZSA ƒe fe ɖesiaɖe ɖe ZEC, dɔwɔna le nunɔamesi ɖesiaɖe si woaɖe ɖe go le Zcash dzi le etsɔme me hea didi vɛ na ZEC ŋutɔ.

---

## Vodada Siwo Bɔ

| Dzixɔse si bɔ | Nuka tututue nye nyateƒe |
| --- | --- |
| "ZSAwo le agbe le Zcash dzi egbea." | Menye nenemae o. ZSA menye Network Upgrade 7 (NU7), si.. [ZIP 259 ƒe xexlẽdzesi](https://zips.z.cash/zip-0259) ɖe egɔme ZIP 226 alo ZIP 227 manɔmee, eye wogale ŋku lém ɖe eŋu hele edom kpɔ kokoko. |
| "ZSA tsɔa smart contractwo vaa Zcash." | ZSA gblɔa nunɔamesiwo nana, wo tsɔtsɔ yi na ame bubuwo kple wo tsɔtsɔ dzoe. Menye nubabla ƒe ƒuƒoƒo si woate ŋu awɔ ɖoɖo ɖe eŋu na taɖodzinu gbadzaae wònye o. |
| "Àteŋu axe ZSA ƒe fewo le ZSA ƒe dzesi ŋutɔ me." | Woxea fewo le ZEC. |
| "Ne wokpɔ akpoxɔnu ta la, ele be dzesi ƒe nunana hã nanye adzame." | ZIP 227 na woɖoe koŋ ɖe ga si woɖe ɖe go la le gaglãgbe, eyata woate ŋu alé ŋku ɖe nunɔamesi ɖesiaɖe ƒe tsɔtsɔ ŋu le dutoƒo. Ga si susɔ kple ga si wotsɔ dea ame bubu me la nɔa ame ŋutɔ si; nusiwo wotsɔna naa amewo mewɔa esia o. |
| "ZIP 230 nye tɔtrɔ 6 ƒe asitsatsa ƒe ɖoɖo si li fifia." | Woɖe ZIP 230 ɖa. Fifia woɖe Version 6 gɔme to ZIP 229 dzi. |

---

## Axa Siwo Do Ƒome Kplii

- [Halo](/zcash-tech/halo) — kpeɖodziɖoɖo si le megbe na Orchard, ɖoɖowɔɖi ZSA kekena ɖe enu
- [zk-SNARKs](/zcash-tech/zk-snarks) — sidzedze zero-sidzedze ƒe kpeɖodzi siwo na woɖo kpe asiɖeɖe le ame ŋu si ŋu akpoxɔnu le dzi evɔ womeɖee fia o
- [Ta Siwo Wotsɔ Akpoxɔnu Wɔe](/using-zcash/shielded-pools) — afisi ZSAwo anɔ kpe ɖe ZEC ŋu le
- [Adzɔnuwo ƒe asitsatsa](/using-zcash/transactions) — alesi wotsɔa Zcash asitsatsa aɖe ƒoa ƒui
- [Zebra Node Bliboe](/zcash-tech/zebra-full-node) — node ƒe dɔwɔwɔ si wozã le ZSA ƒe wɔwɔfia si le etame me
