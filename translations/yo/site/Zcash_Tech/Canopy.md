<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Canopy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Àgbàlá ilé

> Canopy lọ si igbesi aye lori Zcash mainnet ni bulọọki 1,046,400 (November 18, 2020 UTC).

Ohun tí ẹ óo mú lọ: bí Zcash ṣe ń bá ìdàgbàsókè rẹ̀ nìṣó lẹ́yìn èrè àwọn olùdásílẹ̀ ti parí, àti bí Canopy ṣe dá ìpín owó sílẹ̀ èyí táwọn àtúnṣe tó tẹ̀ lé e ṣì gbé kalẹ̀.

Canopy jẹ igbesoke nẹtiwọọki karun ti Zcash, tun ṣe aami Network Upgrade 4 (NU4). O wa ni igbasilẹ nipasẹ [ZIP 251](https://zips.z.cash/zip-0251), and it activated at mainnet block 1,046,400 on November 18, 2020 (UTC), the same moment as Zcash's first block reward halving. Canopy was mainly a governance and monetary upgrade. It ended the original founders reward and started the new Zcash Development Fund, which pays the Electric Coin Company, the Zcash Foundation, and independent grant recipients. The policy behind that fund came out of an extended community governance process in 2019.

Why this matters. Zcash funds its own development from block rewards, because it has no company behind it. The founders reward that paid for its early years was set to end at the first halving. Canopy was the replacement: it routed a fixed share of each block reward into a Development Fund and set who receives it. That model was refined by later upgrades, up to [NU6.1](../zcash-tech/nu6-1).

![Before Canopy the founders reward funded development and was set to end at the first halving. After Canopy the Development Fund takes 20 percent of each block reward and runs to the second halving in 2024](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/canopy-founders-to-devfund.png)

## Ìpèsè fún ìdàgbàsókè

Canopy pari ẹbun awọn oludasile atilẹba ati rọpo rẹ pẹlu Owo Idagbasoke Zcash. Iyipada naa de ni bulọọki kanna bi idaji akọkọ ti Zcash, nigbati ere fun bulọọgi ṣubu lati 6.25 ZEC si 3.125 ZEC. Nitorinaa awọn oniwakiri ri pe a ge owo-ori wọn ni idaji ni ọjọ kanna apakan tuntun ti o kere ju bẹrẹ ṣiṣan si idagbasoke.

Owó náà ni wọ́n dá sílẹ̀ láti máa lò fún ọdún mẹrin, látìgbà tí wọn ti kọkọ fi ìdajì owó yìí ṣòfò ní oṣù Kọkànlá Ọdún 2020 títí dìgbà tí a ó tún ṣe é lẹ́ẹ̀kejì lọ́dún 2024. [ZIP 1014 Àwọn ojúewé wọ̀nyí jápọ̀:](https://zips.z.cash/zip-1014)Ẹrọ ifọkanbalẹ ti o n gbe owo naa ni ọna iṣan-owo: [ZIP 207 - Àwọn èèyàn tó ń gbé ibẹ̀.](https://zips.z.cash/zip-0207) ó ṣètò ọ̀nà tí yóò gbà darí apá kan lára owó ìrànwọ́ náà fún àwọn olùkópa tó ti ṣe pàtó, àti pé [ZIP 214](https://zips.z.cash/zip-0214) ó ṣètò àwọn ìlànà pàtó àti àdírẹ́sì ẹni tó máa gba owó náà fún Ìpèsè Àkànṣe.

## Bí wọ́n ṣe pín owó náà sí méjì

The Development Fund takes 20 percent of each block reward. Miners keep the other 80 percent. That 20 percent is then split three ways, following ZIP 1014.

1. 35 percent to the Bootstrap Project, the parent organization of the Electric Coin Company.
2. 25 percent to the Zcash Foundation.
3. 40 percent to Major Grants, which funds independent work and is administered by the Zcash Foundation. Major Grants later became Zcash Community Grants (ZCG).

Ti a ba fi iye ti gbogbo owó náà dípò tí yóò fi jẹ́ ìsúná, ìpín yẹn á tó ìdá méje nínú ọgọ́rùn-ún fún ilé iṣẹ́ Electric Coin Company, ìdá márùn ún sí Zcash Foundation àti ìdá mẹjọ sí Major Grants. àwọn ọnà méjèèjì yìí bára mu gan an ni.

![The Development Fund is 20 percent of each block reward, split 35 percent to Bootstrap and the Electric Coin Company, 25 percent to the Zcash Foundation, and 40 percent to Major Grants](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/canopy-dev-fund-split.png)

## Ìyípadà nínú pápá ìgbafẹ́ Sprout

Canopy tun bẹrẹ lati yọ kuro ninu adagun ti o ni aabo julọ. Sprout jẹ adagun ideri akọkọ Zcash, ati pe Canopy bẹrẹ si fi i silẹ nipasẹ awọn ohun elo iṣakoso rẹ pẹlu lilo owo-ori kan (Odin) fun gbogbo iṣowo wọn. [ZIP 211 (ìyẹn ilé ìfowópamọ́)](https://zips.z.cash/zip-0211).

From the moment Canopy activated, no new value can be added into the Sprout pool. In technical terms, the vpub_old field of every JoinSplit must be zero. Funds already in Sprout can still be withdrawn, so nobody is locked out, but the pool can only shrink from here. This is a first step toward eventually deprecating the legacy Sprout pool in favor of newer shielded pools.

![Before Canopy, value could both enter and leave the Sprout pool. After Canopy, no new value can enter but withdrawals are still allowed](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/canopy-sprout-pool.png)

## Àwọn àfikún ẹ̀rọ-ìmọ́ra

Ni pẹkipẹki pẹlu awọn ayipada owo, Canopy gbe meji kere imọ ZIPs. [ZIP 212](https://zips.z.cash/zip-0212) yí bí ẹni tó ń gbà á ṣe máa rí àṣírí Sapling tí kì í pẹ́ lọ títí padà, nípa fífi ohun tó wà nínú ìwé náà hàn án. [ZIP 215](https://zips.z.cash/zip-0215) kọ àwọn ìlànà tó ṣe kedere sílẹ̀ fún gbígbé ìmúṣẹ Ed25519 síi, nítorí náà gbogbo nóòdù gbà pé irú ìwé tí wọ́n fi ń fọwọ́ sí ni ó yẹ.

## Àkójọ àwọn ọ̀rọ̀

Ọ̀rọ̀-ìtumọ̀ èdè Gẹ̀ẹ́sì tó rọrùn.
|---|---|
ígba owó àwọn olùdásílẹ̀. Àpẹẹrẹ ìtìlẹ́yìn àkọ́kọ́ tí ó sanwó fún àdàgbàsókè Zcash, èyí ti a yàn láti parí ní ìdámẹ́wàá àkójọpọ̀ náà ni:
ípo ìdàgbàsókè. 20% ìpín nínú èrè àkànṣe tí Canopy fi síbi ètò, tó ń lọ sókè dé apá kejì ti ẹ̀ka náà.
ì£1⁄4ë¡ ì ¤í ¬ (block reward) ZEC tuntun tí a dá àti ti ó san bí block kọ̀ọ̀kan bá ṣe ń wa mined.
Halving Ìṣẹ̀lẹ̀ tí a ṣètò níbi ti èrè ìdìbò náà fi ń dín kù sí méjì.
íṣàn owó. Ẹ̀rọ ìfọwọ́sowọ́pọ (ZIP 207) tí ó darí apá kan ti àkànṣe ìrànwó sí àwọn adirẹsi olùgba pàtó.
 Sprout pool Zcash's original shielded pool, tí Canopy dáwọ́ gbígba iye tuntun wọlé sí.

## Àwọn ìbéèrè tí a sábà máa ń béèrè

Does Canopy change my ZEC or my privacy? No. Canopy is about how development is funded, plus a few technical rules. Your balances and your shielded transactions are unaffected.

Ṣe Canopy ge ẹbun bulọọki?Canopy ṣiṣẹ ni bulọọgi kanna bi idaji akọkọ ti Zcash, eyiti o dinku ere lati 6.25 ZEC si 3.125 ZEC.Idiwọn naa jẹ apakan ti eto imulo owo-owo Zcash.Aṣiṣe kanopi ni lati pinnu bii ipin ti ẹsan kekere yẹn ṣe lo.Ni akoko yii a le sọ pe awọn idiyele fun iye to kere julọ ninu gbogbo nkan wa ati pe wọn ko ṣee lo nipasẹ eyikeyi ọna miiran ju lilo Bitcoin lọ.

What is the Development Fund for? It funds the people building Zcash. The money goes to the Electric Coin Company (through the Bootstrap Project), the Zcash Foundation, and Major Grants, which supports independent work.

ṣé mo ṣì lè lo owó ní agbègbè Sprout? bẹ́ẹ̀ ni. o le máa yọ àwọn owó tí ó ti wà nínú Sprout sílẹ̀, kò sí bí a ṣe lè fi iye tuntun kún un lẹ́yìn Canopy.

Ṣé owó ìdàgbàsókè náà wà títí lọ? Rárá o. Ó ti ṣètò láti ṣiṣẹ fún ọdún mẹ́rin, látìgbà tí wọ́n bá kọ̀ọ̀kan pín in ní ìdá méjì nínú oṣù Kọkànlá Oṣù 2020 sí ìgbà kejì tó máa wáyé lọ́dún 2024, èyí á jẹ kí àwùjọ lè rí bí ó ṣe ń ṣiṣẹ́ kó to di pé wọn tún un wò lẹ́ẹ̀kejì.

Bawo ni Canopy ṣe jẹmọ si NU6 ati NU6.1?Canopy ṣeto pinpin owo-ọna mẹta ati ẹrọ ṣiṣan inawo. Awọn igbesoke nigbamii, pẹlu NU6 àti NU6.1, tun ṣayẹwo ki o tún kọ Ẹrọ Idagbasoke ti a kọ lori oke ipilẹ yẹn.

## Wádìí òye rẹ wò

Canopy ti ṣiṣẹ ni bulọọki kanna gangan bi idaji akọkọ Zcash. Kí nìdí tí a fi yan àkókò yẹn, kí ló sì máa ṣẹlẹ̀ sí ìdàgbàsókè owó láìsí Canopy?

<details>
<summary>Answer</summary>

Àkójọ àwọn olùdásílẹ̀ tí wọ́n ń sanwó fún ní ìpilẹ̀ṣẹ̀ ni a ṣètò láti parí nígbà ìdádì àkọkọ. Láìsí Canopy, gbogbo owó-òdiwọ̀n kékeré lẹ́yìn dídá ìpín náà yóò ti lọ sí ọwọ́ àwọn oníṣé àgbékalẹ̀, kò sì fi ètò kankan sílẹ̀ fún ìtèsíwájú. Canopy rọpò èrè oludasile pẹlú Ìpèsè Ètò Atunṣe níbi idà yẹn gan an, nítorí náà ìṣúnná owó tẹsiwaju láìní òkùnkùn kan.
</details>

### Àwọn Owó-ìṣúnná owó

[ZIP 251: Ifilọlẹ ti Àtúnṣe Nẹtiwọki Canopy](https://zips.z.cash/zip-0251)

[ZIP 1014: Ṣiṣẹda Owo Idagbasoke fun ECC, ZF ati Awọn Ifunni pataki](https://zips.z.cash/zip-1014)

[ZIP 207: Àwọn Ìṣàn Owó-ìpamọ́](https://zips.z.cash/zip-0207)

[ZIP 214: Àwọn ìlànà ìfọwọ́sowọ́pọ̀ fún Ìpèsè Àkànṣe ti Zcash](https://zips.z.cash/zip-0214)

[ZIP 211: Ṣiṣiṣẹda Afikun ti Iye Tuntun si Awọn ẹka iye Ẹya Agbara Ọja](https://zips.z.cash/zip-0211)

[Àtúnṣe sípínlẹ̀-ìmọ́ra Canopy Network Upgrade](https://z.cash/upgrade/canopy/)

### Ẹ tún wo:

[Àwọn Àtúnṣe sí Ìpínlẹ̀ Zcash](../start-here/network-upgrades)

[Ìpèsè fún Àjọṣe](../start-here/development-fund)

[Ìṣèlú owó Zcash](../start-here/zcash-monetary-policy)

[Àwọn Erékùṣù Tó Ń Wà Níbi Ààbò](../using-zcash/shielded-pools)

[NU6.1](../zcash-tech/nu6-1)

[Ìdarí Zcash](../zcash-community/zcash-governance)

---

Àtòjọ: [Atọka Awọn igbesoke Nẹtiwọki](../start-here/network-upgrades) · Àwọn tó ṣáájú: [Igi àyà igi](../zcash-tech/heartwood) · Àtúnṣe: [NU5](../zcash-tech/nu5)
