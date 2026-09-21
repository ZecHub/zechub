<a href="https://github.com/Zechub/zechub/edit/main/site/Using_Zcash/Recovering_Funds.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Gbigba pada Owo ti apo apamọwọ Zcash

** Kí nìdí tó fi yẹ kó o máa tọ́jú àwọn ohun tí wọ́n ti rí gbà?**

Seeds, spending keys, viewing keys, and wallet files are not interchangeable. A seed phrase can derive wallet keys for many wallets, but it does not replace every legacy key or wallet file. A viewing key can reveal shielded activity but cannot authorize a spend.

Àtúnṣe ìnáwó gbẹ̀lé wípé o ní àṣẹ tí ó tọ́ láti ná owó àti ọ̀nà tó ń tìdí rẹ̀ jáde fún àgbá ti ó ni àwọn owó náà. Pa ohun èlò ìdásílẹ̀ mọ́ láìsí ẹni to lè rí i, má sì ṣe pín irúgbìn tàbí kókó òwò pẹlú ẹnikẹ́ni tí ìwọ kò bá fọkàn tán.

# Ààbò àti Ojúṣe

It is crucial for users to understand the risks involved in dealing with private keys and to keep these keys protected from unauthorized access. The security of funds depends on the user's responsibility to safeguard their private keys.

## Àwọn owó tí a fi ààbò pa mọ́: Sprout, Sapling and Orchard.

ZEC ti o ni aabo atijọ le nilo lati gbe kiri bi apakan imularada. Ọna naa da lori eyiti iṣan omi ipamọ lọwọlọwọ mu awọn owo-owo naa.

> **NU7 ti wa ni eto fun November 5, 2026.** Lọgan ti o ba ṣiṣẹ, ọna gbigbe lọwọlọwọ lati inu adagun Sprout ogún yoo da iṣẹ duro.
>
> Ti o ba tun ni ZEC ninu agbada Sprout, gbe e lọ ṣaaju igbesoke. Lẹhin ti ifisilẹ, awọn irinṣẹ to wa tẹlẹ kii yoo le ṣe gbigbe owo-owo Sprout sinu Sapling, adirẹsi ṣiṣanwọle, tabi eyikeyi ibudo miiran.
>
> Bí o bá ń wo ojúewé yìí **lẹ́yìn tí NU7** ti ṣiṣẹ, **Sprout ni a fi sínú yìnyín títí di ìgbà tí ọ̀nà ìmúpadàbọ̀ sípò yóò wà lárọ̀ọ́wọ́tó. Èyí kò sì ní ètò kankan báyìí.

## Ìdáhùn náà wà ní ojú ìwé kan ṣoṣo.

íwó rẹ wà ní ìtòsí ìrìn àjò-ìṣilọ̀  Kí ni kí n ṣe?
| --- | --- | --- |
 *Sprout*  **Sproot → Sapling → Ironwood** Bí o bá ní àwọn ìlà tí ó wà nínú àwo náà, a lè fi òǹtẹ̀ yìí ránṣẹ́ sí ẹ. `wallet.dat` tàbí kó o lo ọ̀nà ìnáwó Sprout tó dá dúró, gbìyànjú láti gba òpópónà Argos tí ó wà nísinsìnyí. bí kò bá yẹ fún un, lo ojú-ọ̀nà àyíká ti ìgbà àtijọ́ nínú ìwé atọ́ka gbogbo rẹ̀. Sprout gbọdọ kọkọ dé sí Sapling, lẹ́yìn náà lọ síwájú si Ironwood. Ọna yìí jẹ́ àkókò díẹ̀ nítorí NU7.
**Sapling**. **Sappling → Ironwood**: Kò sí àyíká ìmúbọ̀sípò Sprout tí ó nílò. Lo apamọwọ kan tó wà nísinsìnyí èyí ti o lè mú padà tàbí ná owó rẹ pàtó Sapling account àti kọ àwọn ìṣiṣẹ́ Ironwood. Ìtìlẹyìn Ironwood nìkan kò fi hàn pé òun ń ṣe atilẹyin ìmúbọ̀sípò Sapling-àtijọ́.
**Orchard**. Orchard → Ironwood.* Orchard jẹ́ ìjáde-kìlọ̀ lo àpòòwé alágbàṣe tí ó wà nílẹ̀ láti máa ṣí kúrò nínú òpó owó sí Òrìsà lọ sínú ọjà oníke ti ironwood, wo: Àkọlé àwòrán Ìyípadà Orinwó (OW) ni ohun èlò tó ń mú kí o lè fi wọle àti yí padà àwọn ẹrù rẹ si Ọrọìwòye Ẹsẹ kan tàbí jù bẹ́ẹ̀ lọ. [Àwọn owó tí wọ́n gba padà àti àpò Ironwood](#recovered-funds-and-the-ironwood-pool). |

### Ìdájọ́ ìbéèrè márùn-ún tí ó ń lọ lókè yìí.

1. **Is it Sprout?** A seed phrase alone points to a later Sapling/Orchard-era recovery path, not Sprout. A `zc...` Adirẹsi, tabi apo-owo ti a tunṣe to ṣe ijabọ iwontunwonsi Sprout kan, tọka si Sprout.
2. ** Kí ni ohun èlò ìmúpadàbọ̀sípò tí ẹ ní?** Wá àwọn nǹkan tó lè mú kí o máa dáwọ́ dúró. `wallet.dat`, awọn atijọ kọmputa tabi datadir, a `z_exportwallet` afẹyinti, tabi a okeere Sprout inawo bọtini. A `zc...` àdírẹ́sì nìkan kò tó.
3. **Argos tabi àgbékalẹ̀ ìbílẹ̀?** Bí o bá ní `wallet.dat` tabi a standalone Sprout inawo bọtini ati ki o nìkan fẹ awọn owo jade, gbiyanju [Argos](#zecwallet-lite-and-legacy-wallet-recovery-with-argos) lo ipa ọna ọkọ̀ ojú-ọkọ́ ti o wà ninu ìwé itọsọna iṣẹ́ àgbègbè náà tó bá jẹ pé Argos kò lè ṣe àwọn ohun èlò tàbí tí ó bá fẹ́ kí gbogbo ìdìpọ̀ àwárí ní abẹ́ ìṣàkóso rẹ.
4. ** Ṣe o ti ni a synchronized, unpruned zcashd datadir?** Eleyi jẹ nikan fun awọn ogún sidecar ipa-ọna. Daakọ tẹlẹ node data nikan lẹhin kan mọ shutdown; bibẹkọ ti aaye guide bo snapshot / lati ibere aṣayan.
5. **Ibo ni owó náà ti ń parí sí?** **Ohun-igi irin.** Sprout máa n gba Sapling kọjá lákọ̀ọ́kọ́ nítorí kò si ìnáwó kan ṣoṣo tí ó tọkàntọkàn láti ọgbà igi irin. Má ṣe dúró ní Sapling.

### Atọka Iṣẹ-iṣẹ ZEC Pool Migration Field Guide ni kikun

Fun itọkasi gbigbe pipe, pẹlu awọn ọna imularada alaye, aṣẹ, owo-ori, ibeere ohun elo ẹrọ, iṣaro aṣiri, atunṣe iṣoro, ati awọn akọsilẹ orisun, ka iwe itọsọna ni kikun.

** Ẹya 1.1 · Ti a ṣe imudojuiwọn Oṣu Kẹsan Ọjọ 18, 2026**

[Ka gbogbo ìwé tí ZEC fi ń darí ìyípadà síbi tó yẹ ní ZecHub.](/research/zec-pool-migration/view)

> **Ká tóo bẹ̀rẹ̀:** kọ́kọ́ ṣètò ohun tí o ń gba padà àti àwọn nǹkan ìmúpadàsípò tí ó wà nílẹ̀. *Ìgbìn àpamọ́ kan tàbí kókó owó-ìṣúnnáṣe ti kò bá jẹ́ Sprut lè nílò ìgbàlà lásán. Àwọn ọ̀rọ̀ àgbàlagbà  bí irú ZecWallet Lite, ogún `wallet.dat`, tabi a standalone Sapling tabi Sprout inawo bọtini  le nilo kan ti o ya sọtọ imularada ọna.
>
> Bí o bá rò pé owó náà wà ní ìkápá, rí i dájú pé ó ṣì ṣeé ná kí ìwọ̀n àkókò tóo fi máa gba owó padà. A `zc...` adirẹsi tabi ohun elo wiwo nikan ko to lati gbe awọn owo naa.
>
> **YWallet ko tun ṣe atilẹyin Zcash lẹhin Ironwood.** Lo **Zkool** fun awọn atunṣe ti kii-Sprout deede lati irugbin ati bọtini ti o ni atilẹyin. Lilo **Argos** fun imularada ZecWallet Lite, awọn faili apamọwọ ogún, ati Sapling / Sprout lo awọn bọtini inawo ominira. Fun Sprout, Argos jẹ ọna akọkọ lati gbiyanju; itọsọna aaye kikun bo isọdọtun ẹgbẹ kẹkẹ ọtun.
>
> Lo tábìlì tó wà nísàlẹ̀ yìí lórí ohun tí o ní gan-an, kì í ṣe irinṣẹ́ ìmúbọ̀sípò ti o rántí pé ó lò.

Ẹ ní. Bẹrẹ láti ibí yìí.
| --- | --- |
 A gbólóhùn ìkókó tàbí a ṣe atilẹyin **kóòtun owó tí kò jẹ́ ti Sprout** láti inú àpamọ̀ kan tó wà nísinsìnyí tabi èyí tí wọ́n ṣetán láìpẹ, títí kan àwọn ohun èlò àtijọ́ YWallet Zcash. [Zkool](#fund-recovery-with-zkool) |
A ** wíwo kókó nìkan** Zkool le ṣe àtúnṣe àwọn kọ̀ǹpútà tí a gbà láti wo fún ìwífún-kìkà, ṣùgbọ́n kò lè fọwọ́ sí owó ìdásílẹ̀. Wá irúgbìn tàbí ọ̀rọ̀ ìṣúra tó bá yẹ kí o lò ó.
Ìkókó tí ó ní ọ̀rọ̀ 24 ni "ZecWallet Lite" [Argos](#zecwallet-lite-and-legacy-wallet-recovery-with-argos) |
A ZecWallet Lite tabi zcashd `wallet.dat`, tabi ọ̀kan tí ó dá dúró Sapling/ Sprout ìnáwó kókó. [Argos](#zecwallet-lite-and-legacy-wallet-recovery-with-argos)Lati ọjọ kẹsan-an, oṣu Kẹsán ọdun 2026, ẹya 1.3.0 ni o wa lọwọlọwọ ati ti a fẹ; lo v1.2.0 tabi nigbamii fun awọn ohun elo. `wallet.dat` àti ìmúbọ̀sípò Sprout.
ẹ̀rọ ìkọ́lé tí Argos kò lè bá lò, tàbí àtúnṣe níbi tóo ti fẹ́ kí àwọn ohun èlò ìgbàlódé wà lábẹ́ ìṣàkóso rẹ. lo ipa ọ̀nà ọkọ̀ ojú irin àtijọ́ nínú ẹ̀rọ náà láti fi ṣe iṣẹ́ yìí. [ìwé tó ń ṣàlàyé gbogbo ohun tí wọ́n ṣe ní pápá.](/research/zec-pool-migration/view). |
 Kò sí ìmúṣẹ tàbí kókó owó, ṣùgbọ́n ẹ̀rọ tí a fi dílẹ̀ ni ó wà, ọ̀rọ̀-ìfiwọlé ti gbàgbé, tabi disiki tó kùnà. [Iṣẹ́ ìmúbọ̀sípò oníṣe](#professional-recovery-when-you-do-not-have-the-seed). Má ṣe fi àgbélèwé tàbí kókó ìnáwó tí ó ń ṣiṣẹ́ ránṣẹ́ sí ẹnìkan tó bá kàn ọ láìṣe pé o béèrè fún un.

## Gbigba Owo pada pẹlu Zkool

[Zkool](https://github.com/hhanh00/zkool2/releases) jẹ́ àbínibí Zcash tí ó wà nípò láti YWallet látọ̀dọ̀ olùgbéejáde kan náà. Ó ń ṣe atilẹyin fún àwọn ọ̀nà ìmúpadà padà tó ni ìmọ àti òde òní, títí kan àwọn kókó Sapling ìgbàanì, ṣùgbọ́n kì í se Sprout** .

Ipò méjì la máa jíròrò nínú àpilẹ̀kọ yìí:

1. **Tíyí àkọọ́lẹ̀ padà sípò** láti inú gbólóhùn ìpilẹ̀ṣẹ̀, kókó àdáni tàbí kókó wíwo
2. **Gbígbé owó jáde** láti inú àpamọ́ tí ó ti ń ṣe ìtìlẹyìn fún àwọn àdírésì tó jẹ́ ojúlówó nìkan

### 1) Bá A Ṣe Lè Tún Àkáǹtì Kan Ṣẹ̀ Sípò

1. Fi Zkool sori ẹrọ lati inu awọn ohun elo ti o wa ni isalẹ. [ojúewé àwọn ìtẹ̀jáde](https://github.com/hhanh00/zkool2/releases) kí o sì ṣí i.
2. Lori ** Account Manager** (orílé ojúewé), tẹ bọtini **+** láti dé sí àtẹ̀wò́kọsílẹ̀ ** New Account**
3. Kọ ** Orukọ Àkáǹtì** láti dá àkáǹtà yìí mọ̀.
4. Ṣii **Tún Àkọsílẹ̀ ṣe?**. Èyí fi àwọn ìpamọ́ kókó àti ibi tí a bí wọn sí hàn
5. Fi kókó rẹ sínú **Key (Seed Phrase, Private Key, or Viewing Key)**. Zkool gba àwọn ọ̀rọ̀-ìmọ́ ìkókó, Sapling secret keys, transparent extended keys àti supported viewing keys. A rí kọ́kọ́sì láti ka nìkan ni kò sì lè fún àṣẹ àgbèrè kan láṣẹ.
6. Tẹ́ ẹ̀ka ìpilẹ̀ṣẹ ** Birth Height** fún àkọọlẹ àtijọ. Zkool kì í ṣàyẹwò àwọn àlàfo ṣáájú iye yìí, nítorí náà yan iye kan kí ìgbésẹ̀ àkókọ ti apamọwọ bá jẹ pé o kò mọ̀ dájú. Ìdìde gíga ìgbà tí a bí ẹni pẹ́ lè mú kí ojúlówó ìṣòfò dàbíi wípé ó ń sọnù.

![Zkool New Account screen with Restore Account and Advanced Options both turned on](/content-images/zkool-restore-account-60b1d2777e.webp)

7. Fi àkọọ́lẹ̀ náà pamọ́, lẹ́yìn náà ṣe àfikún rẹ̀

### Gbigba irugbin pada lati apamọwọ ti o yatọ si kan

Bí irúgbìn náà bá wá láti inú àpò tí ó tẹ̀lé ZIP 316  tó ní nínú ZODL (tí a mọ sí Zashi), Zingo, tàbí zcashd  ṣí **Advanced Options** àti gba **Use Internal Change** láàyè kí o to fi pamọ́.

ZIP 316 lo adirẹsi inu/iyipada ti o yatọ. Gbigba ọkan ninu awọn iroyin wọnyi laisi ** Lo Iyipada Inu** le jẹ ki awọn abajade iyipada han pe wọn ko si paapaa botilẹjẹpe awọn owo tun wa.

Àwọn àlàfo méjì míì wà lábẹ́ **Àwọn Àtúnṣe Tẹ̀lẹ̀**:

- **Ohun-ìfipamọ àfikún (oṣelọpọ)**, tí owó pópó ìpilẹ̀ṣẹ́ bá lo ọ̀kan nínú wọn nìkan.
- **Ìsọ̀rí Àkáǹtì**, bí àpò-ìpamọ́ ìpilẹ̀ṣẹ̀ bá ní àwọn àkọsílẹ̀ bíi mélòó kan lórí irúgbìn kan. Àwọn owó náà lè wà lábẹ́ àmì ìdánimọ̀ tó yàtọ̀ síra

> **Awon meji yi nikan han ni kete ti a wulo irugbin gbolohun jẹ ninu awọn Key aaye.** Pẹlu awọn oko ofo, tabi idaduro kan ikọkọ tabi wiwo bọtini, Zkool fihan o kan **Lilo Internal Change** ati **H / W Ledger**. Paste awọn irugbi akọkọ, ki o si ṣii Advanced Aṣayan .

### 2) Fífi Owó Àpapọ̀ Ránà Láti Ọ́fíìsì Tí Kò Ní Ẹnìkan Tó Ń Wá A Rí Lára Rẹ

If the old wallet or account held **transparent ZEC only**, restore the account first, find every used transparent address, then move the funds to a current shielded destination you control. Do not assume an old wallet brand was always transparent-only; some products added shielded support in later versions.

1. Mu àkọọlẹ naa pada nipa lilo awọn igbesẹ loke
2. Ṣii akọọlẹ naa ki o lọ si oju-iwe ** Gba Awọn Owo**.
3. Tap the magnifying glass in the top bar (**Find other transparent addresses**). Wallets that rotate addresses, such as Ledger and Exodus, generate many transparent addresses from one seed, and this finds the ones holding funds
4. **Tún-ṣeto àti ṣe àdàkọ àkọọ́lẹ̀ náà lẹ́yìn èyí.** Àwọn àdírẹ́sì tí a ṣẹ̀ṣẹ̀ rí nìkan ni ó gba ìsókè wọn ní ìgbà ìdánwò tó tẹ̀lé e, nítorí náà kíka yìí yóò jẹ́ kó dàbí wípé àwárí kò ri nǹkankan.
5. Lọ si oju-iwe **Gba**. Nitosi iwontunwonsi iwọ yoo ri awọn bọtini aami mẹta. Wọn ko ni awọn ami ọrọ, nitorinaa gbe ori tabi tẹ gigun lati wo orukọ wọn:
   - **Shield One** (àlàfo ààbò) ń gbé adirẹsi kan tí ó ṣe kedere ní ẹ̀kan.
   - **Shield All** (àwo n àwon ohun gbogbo láti inú adirẹsi tí ó wà ní ìta lé̩èkan náà.
   - **Unsheld Gbogbo** (ìdákò ṣí) lọ ni ọna miiran, sinu adirẹsi ti o han gbangba

> **Shield One ni yiyan ti o jẹ ikọkọ diẹ sii.** Ṣiṣakoso awọn adirẹsi pupọ ninu iṣowo kan n so wọn pọ bi ẹni pe o wa si eniyan kanna. Zkool kilọ nipa eyi funrararẹ ṣaaju ṣiṣe Shield Gbogbo .

6. Ṣayẹwo ìnáwó náà kí o sì fi ránṣẹ́.

Unshield All jẹ́ ohun tí ó wúlò nígbàtí o bá ń yọwó sí ibi ìnájà kan tó gba àwọn àdírẹ̀sì àyèwò nìkan. Àwọn kókó ìdánájú náà yóò hàn bí àkọọlẹ̀ náà ba ní adirẹsi aláàbò, àti unshield all kìkì bí ó bá ní èyí tí a lè rí kedere.

## ZecWallet Lite ati igbasilẹ apamọwọ ogún pẹlu Argos

[ZecWallet Lite (ì í ì ë§)](https://github.com/adityapk00/zecwallet-lite) kò sí àtúnṣe kankan mọ́, a sì ń tọjú àkọsílẹ̀ rẹ̀. Àdàkọ tí wọ́n fi ṣe ìsọfúnni nípa ẹyọ ọ̀rọ̀ náà yàtọ̀ sí bí àwọn pópó òde òní ti máa ń kọ nǹkan sílẹ̀, nítorí náà fífi gbólóhùn kan náà sínú póòpù alákòókò yìí lè mú kí owó tó wà ní orí adirẹsi míì tí ZecWallet Lite tún gbé kalẹ̀ máà ríbi gbà. [Argos](https://argos.sovright.com), lati Sovright, jẹ aaye iṣẹ imularada tabili ti a ṣe fun eyi ati awọn ọran imularadoko ogún miiran.

Argos ka ZecWallet Lite irugbin ati awọn faili apamọwọ, zcashd `wallet.dat`, standalone Sapling extended spending keys, and Sprout spending material. Fun sprout, a ZecWallet Lite seed nìkan ko to nitori awon bọtini won ti wa ni ipilẹṣẹ lọtọ. Argos jẹ ohun elo imularada kan, kii ṣe apamọwọ ojoojumọ: ṣayẹwo orisun ọrọ agbegbe, ọlọjẹ, lẹhinna fọ sinu apo-owo ti o tọju rẹ.

Àṣẹ tó kéré jù lọ [tí a ṣàyẹ̀wò rẹ̀](https://argos.sovright.com/assets/least-authority-argos-audit-2026-06-29.pdf) the tool. Recovery itself is free. An optional donation to Sovright can appear during the sweep.

> **Kò yẹ kí o tẹ irúgbìn sínú ìkànnì.** Ìkànnì Argos jẹ́ àdàkọ àti ẹ̀rọ tí a fi ń gba àwọn ohun èlò jáde nìkan. [ìwé tó ń ṣàlàyé bí a ṣe lè lo oògùn yìí.](https://argos.sovright.com/guide.html).Key wà ninu awọn wole tabili app. Ijẹrisi jẹ agbegbe lodi si BIP-39 checksum. Awọn irugbin aaye cleares ni kete ti o ba bẹrẹ iwarii. Ẹnikẹni ti o ifiranṣẹ fun ọ pe irúgbìn "lati ran bọsipọ rẹ owo" n scamming o.

### Ṣaaju ki o to ṣii Argos

1. Ṣe igbasilẹ ohun elo tabili lati inu awọn faili ti o wa ni isalẹ. [ojúewé Argos tí ó wà ní ìsopọ̀](https://argos.sovright.com) tàbí àwọn tó wà nínú [Ojúewé ìfilọ̀ GitHub](https://github.com/sovright/argos/releases). Ṣayẹwo awọn iṣiro tabi awọn ibuwọlu nigbati wọn ba tẹjade.
2. Lo igbasilẹ Argos lọwọlọwọ. Bi ti Oṣu Kẹsan ọjọ 18, 2026, **v1.3.0** jẹ bayi ati fẹràn. Lo **v2.0 tabi nigbamii fun awọn ohun elo miiran, bi o ṣe le lo * v1.4.1 tabi ẹya tuntun lati mu wọn ṣiṣẹ pẹlu rẹ. `wallet.dat` ati igbasilẹ Sprout**. Awọn ile-iṣẹ ti o dagba ju 1.1.0 le tun ṣawari ṣugbọn kọ awọn fifọ iṣaaju Ironwood pe nẹtiwọki ko da; imudojuiwọn ki o gbiyanju lẹẹkansi.
3. Ṣiṣẹ lori ẹrọ ti o gbẹkẹle. Gbadun ìdìkọ gbogbo disiki . Maṣe pin iboju nigba ti irugbin, ọrọigbaniwọle tabi bọtini inawo ba han.
4. Have a destination Unified Address ready from a maintained wallet you control, such as [ZODL](https://zodl.app/)Ẹ rí i pé ẹ mọ àdírẹ́sì tó wà nínú pọ́ọ̀lù náà kí ẹ tó fi sínú Argos.

### Àtúnlò irúgbìn

1. Ṣii Argos ki o si yan **Mo ni gbolohun ọrọ irugbin 24 mi**. Igbasilẹ irugbọn ko nilo faili apamọwọ kan.
2. Fi gbolohun naa kun ki o si tẹ **Fọwọsi irugbin** Ti o ba sọ pe irugbi jẹ to wulo, tẹsiwaju.
3. Fi iye ìlà ọjọ́ìbí wọlé, tàbí ìgbà tí àpòòwé náà ti dá. Ìlọ̀kọ̀ọ̀kan tó ṣáájú ni ó lọra jù ṣùgbọ́n èyí ní ìdánilójú ju wípé kí o mọ nígbàtí àkókò bá pé tán.
4. Labẹ awọn iṣakoso olupin, lo ipo-ipilẹ ti o wa lọwọlọwọ tabi tẹ URLs lightwalletd. Awọn URL ti a ya sọtọ nipasẹ koma ni idanwo ninu aṣẹ. Awọn apẹẹrẹ gbangba:

   `https://zec.rocks:443,https://zec-node.cakewallet.com:443,https://na.zec.rocks:443`

5. Paste the destination Unified Address.
6. Tẹ **bẹrẹ ìwòràwò**. Èyí lè gba iṣẹju tàbí ọjọ́ ní ìbámu pẹ̀lú bí ọmọ náà ṣe ga tó. O le jáwọ́, o sì tún ṣí àyè iṣẹ kannáà; ìwóràwò yóò padà bọ̀ sípò.
7. Nígbà tí ìwòràwò náà bá parí, ṣàyẹ̀wò àwọn àlàfo rẹ, iye owó tó o fẹ́ san àti ibi tí wàá lọ. Lé ewé kan **sweep** (fi nǹkan kọ́ra).

Broadcasting a sweep is irreversible. Keep the original wallet file until every relevant pool has been swept and the destination wallet shows the expected funds. Once recovery is complete, retire legacy secrets rather than continuing to use them for new activity.

### Àwọn fáìlì àpò-owó àti àwọn kókó tí ó dá dúró

Lori awọn itẹwọgba iboju, **Mo ni a apamọwọ faili** bo kan ZecWallet Lite faili, a zcashd `wallet.dat`, tabi awọn bọtini inawo Sapling ti o gbooro. Aṣayan igbasilẹ-igbega owo ọgbin ni a ṣe nipasẹ ọna imularada Sprout / CLI Argos's .

Argos reads wallet files without modifying them. If the wallet is encrypted, enter the passphrase when asked; it is used in memory and is not written to disk. Review the transparent, Sapling, and Sprout key counts before you start a scan.

A kò gba àwọn kókó ìwòran fún àyẹ̀wò nítorí wọn ò lè fọwọ́ sí owó ná.

### Àwọn àlàyé nípa àwọn èso tó ń hù jáde

A ZecWallet Lite irugbin ko ni gba awọn bọtini Sprout. Awọn wọnyi ti a ṣẹda lọtọ. Gba sprout pada lati inu zcashd kan `wallet.dat`, tàbí láti inú kókó ìnáwó tó dá dúró nínú CLI.

Ti faili ba ti ni data akọsilẹ to le lo ati ẹlẹri kan, Argos le funni ** Gbigba awọn owo Sprout** laisi ọlọjẹ pq. bibẹkọ o le ṣe iṣawari kikun-iboju lori nẹtiwọọki P2P. Ṣayẹwo yẹn tobi ati lọra. Iṣakoso ayẹwo ti o kọ jẹ agbara lilo, nitorinaa daabobo rẹ bi apamọwọ atilẹba.

Iye ẹ̀ka ìkápá lè dé sí Sapling nìkan. Lẹ́yìn tí owó Sapling bá ti jẹrisi àti pé ó ṣeé ná, gbé wọn lọ síwájú si **Ironwood** pẹlú àpò-ìpamọ́ kan tó wà nísinsìnyí tí yóò ṣe atilẹyin fún àkọsílẹ̀ Sapling tí a gba padà náà. Má dúró ni Sapling.

## Àwọn owó tí wọ́n gba padà àti àpò Ironwood

Niwon igbesoke Ironwood (NU6.3) ti muu ṣiṣẹ ni 28 Keje 2026, adagun Orchard jẹ lilo nikan. Ko si iye tuntun le wọle, ati pe iye to wa tẹlẹ n lọ nipasẹ awọn iyipada sinu Ironwood .

Ti awọn owo ti o gba pada rẹ ba wa ni Orchard, gbe wọn lọ si Ironwood nipa lilo ** iṣan gbigbe-gbigba inu apo apamọwọ lọwọlọwọ. Orchid jẹ ijade nikan lẹhin NU6.3.

Zkool 6.30.0 is current as of September 18, 2026 and supports Ironwood. Its migration design is privacy-focused but is not the same thing as claiming ZIP 318 conformance. Other current wallets may use ZIP 318-style staged migration. Follow the installed wallet's current migration screen and release notes rather than inventing a manual amount or schedule.

Ìyípadà tí a ṣe ní ìpele lè lo ọ̀pọ̀lọpọ̀ àwọn ìṣòwò, nítorí náà iye owó tó wà lápapọ̀ le ga ju ti àtúnṣe kan ṣoṣo lọ.

> **Iye gbigbe jẹ gbangba.** Nigbati iye ba kọja ọna-ọna, iye ati giga bulọọki ni o han lori pq paapaa ti oluranlowo ati olugba duro lati ṣe aabo. Lo eto imulo fifọ ikọkọ / ipele ti wallet nigbati awọn ọrọ aṣiri wa, ki o lo asiri ori nẹtiwọọki bii Tor tabi fẹlẹfẹlẹ aṣiri miiran igbẹkẹle nibiti o yẹ. Asiri nẹtẹẹsì le fi asopọ IP rẹ pamọ; ko tọju nọmba igbelewọn gbogbo eniyan.

## Ìmúpadàpọ̀ ní ìjìnlẹ̀ pẹlú ZExCavator

[ZExCavator ì í ë ¤ì 'í ¬ë¦¬](https://github.com/zingolabs/zexcavator) jẹ iṣẹ akanṣe imularada ** ti nlọ lọwọ** Zingo Labs ni ifojusi lori awọn faili apamọwọ ZecWallet Lite ati gbigbe-awọn ọna kika apamọwọ. README rẹ ngba awọn olumulo igbasilẹ owo si aṣayan okeere **Zingolib** lakoko atilẹyin kikun ZeWIF ṣi wa ni idagbasoke.

Ṣe itọju rẹ bi ọpa ti o ni ilọsiwaju / edge-case dipo ọna imularada aiyipada. Fun awọn irugbin ZecWallet Lite deede, faili apamọwọ, zcashd `wallet.dat`, ati atilẹyin awọn bọtini inawo iduroṣinṣin, gbiyanju Argos akọkọ. Ṣayẹwo ohunkohun ti o gba pada nipasẹ ZExCavator ninu apamọwọ itọju ṣaaju ki o to gbekele rẹ.

## Iṣẹ́ àtúnṣe tí ò mọ nídìí nígbà tó o kò bá rí irúgbìn náà gbà.

Bí ìpilẹ̀ṣẹ̀ tàbí kókó bá ti lọ, àtúnṣe tí ó ń gbé ara ẹni kò lè bẹ̀rẹ̀. Àwọn ènìyàn kan ní ipò yẹn máa nlo ilé iṣẹ́ atúnpadà ògbóǹkangí fún ọ̀rọ̀-ìfipamọ́ tó gbàgbé, àwọn àìṣedéédé ohun èlò, tabi disiki tí a kò le kà.

Ọ̀nà yẹn yàtọ̀ sí pé kó o dá irúgbìn tó ṣì wà lóko padà. Má ṣe fi irúgbín tí kò tíì bà jẹ́ fún ẹnikẹ́ni tó bá sọ pé òun á "wá" ọ wá, torí àwọn èèyàn sábà máa ń lo ọ̀nà èrú yìí láti rẹ́yìn ẹni náà.

[A kò ṣe àdàkọ rẹ̀.](https://unciphered.com) ni ọkan ile ti o se yi ise inu-ile ati awọn ti a ti bo ninu ibi bi [Àwọn tí ó ní okun.](https://www.wired.com/story/unciphered-crypto-wallet-recovery/). They are a general crypto recovery service, not a Zcash-specific tool, and they charge for the work. ZecHub does not endorse any recovery firm. If you go this route, confirm the official domain yourself and assume anyone who DMs you first is a scammer.

Ti o ba tun ni irugbin tabi bọtini inawo ti n ṣiṣẹ, bẹrẹ pẹlu ọna imularada ara ẹni bi Zkool tabi Argos lori ẹrọ tirẹ dipo.

## YWallet kò sí ní ìtọ́jú mọ́.

YWallet ni ohun èlò ìmúpadàbọ̀sípò tí a dámọ́ràn lórí ojú-ìwé yìí fún àkókò gígùn, àti pé ọ̀pọ̀lọpọ̀ àwọn ìwé atọ́nà tó ti pẹ́ ṣì ń tọka sí i.

Olùgbéejáde rẹ sọ pé YWallet kò tún ṣe atilẹyin Zcash mọ́ láti ìgbà tí Ironwood ti mú àtúnṣe náà jáde, ó sì darí àwọn oníṣẹ̀ẹ́ Zcash sí **Zkool** tó jẹ́ aṣojú. Ṣójútó ohun èlò ìpilẹ̀kọ/ọ̀rọ̀-ìpínlẹ̀ àtijọ́ fún YWallets ṣùgbọ́n máà bẹ̀rẹ̀ ìgbésẹ̀ tuntun nínu ṣíṣípòsí Zcash sínú YWallettí .

Ti o ba ti ni ohun elo imularada Zcash lati YWallet, mu pada si inu Zkool nipa lilo ọna irugbin / bọtini atilẹyin loke.

## Àwọn ojúewé tó ní í ṣe pẹ̀lú rẹ̀

- [Àwọn àpamọ́ owó](/using-zcash/wallets) - àwọn àpamọ́ tí a ń tọjú àti bí wọ́n ṣe wà ní sẹpẹ́ Ironwood, títí kan Argos.
- [Igi irin-igi](/zcash-tech/ironwood) - ohun tí àtúnṣe náà yí padà àti ìdí ti owó fi ń ṣí lọ síbòmíràn
- [Àwọn ìwé ìrántí](/using-zcash/memos) - bí àwọn ìwé ìránnilétí tí a fi kọ̀ǹpútà sí ṣe ń ṣiṣẹ́.
- [Àwọn Kókó Ìwòran](/zcash-tech/viewing-keys) - kà nikan wiwọle lai lilo agbara
- [Àwọn Ìkànnì Lightwallet Nodes](/zcash-tech/lightwallet-nodes) - lightwalletd ìparí àwọn àlàfo tí Argos lè lò.
- [Atọ́nà oníṣe Argos](https://argos.sovright.com/guide.html) - ìsọfúnni tó ṣe tààrà láti ọ̀dọ̀ Sovright.
- [Naomi Brockwell lórí àwọn irinṣẹ́ ìmúbọ̀sípò](https://x.com/naomibrockwell/status/2079146521405333526) - Àlàyé nípa Argos àti àfikún ìwé tó dá lórí ìmúbọ̀sípò nínú iṣẹ́ òṣìṣẹ́.
