<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Blossom.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Maua ya maua

> Blossom alienda kuishi kwenye Zcash mainnet katika block 653,600 (Desemba 11, 2019 UTC).

Nini wewe kuchukua mbali: jinsi Blossom alifanya Zcash vitalu kufika kuhusu mara mbili kwa kasi bila kubadilisha kiasi gani ZEC mtandao inajenga baada ya muda.

Blossom ni Zcash [kuboresha mtandao](../start-here/network-upgrades). Ilikuwa deployed na [ZIP 206 - Msaada wa posta.](https://zips.z.cash/zip-0206), na mabadiliko yake kuu makubaliano ni maalum katika [ZIP 208 - Ujumbe wa posta.](https://zips.z.cash/zip-0208)Blossom ilikuwa ni kuboresha scalability: ilifupisha muda lengo kati ya vitalu kutoka sekunde 150 kwa 75 sekunde, hivyo vitalu kufika juu mara mbili kama kawaida. Electric Coin Company aliongoza na alitangaza Blossum.

Kwa nini hii ni muhimu. Wakati kutuma ZEC, wewe kusubiri kwa mtandao kuthibitisha katika block. Kama vitalu ni polepole, unangojea muda mrefu zaidi. Kabla ya Blossom, kuzuia mpya ilitarajiwa kuhusu kila sekunde 150. maua kukata kwamba lengo nusu, hadi 75 sekunde hivyo uthibitisho kuja mapema na mlolongo inaweza kubeba shughuli zaidi katika kiasi hicho cha wakati. Ni alifanya hili bila kujenga zaidi ZEC au kuhamisha ratiba ya halving baadaye.

## Vitalu vya haraka zaidi

Blossom ya msingi mabadiliko ni rahisi. Zcash lengo block spacing, wakati mtandao inalenga kwa kati ya kuzuia moja na ijayo, imeshuka kutoka 150 sekunde 75 sekunde ([ZIP 208 - Ujumbe wa posta.](https://zips.z.cash/zip-0208)Vipande hupatikana kwa uthibitisho wa kazi, hivyo pengo halisi kati yao inatofautiana, lakini mtandao sasa unalenga kuzuia kuhusu kila sekunde 75 badala ya kila 150.

Mambo mawili yanafuata:

1. Vitalu kufika kuhusu mara mbili kama kawaida, hivyo mlolongo inaweza kubeba takriban mara mbili ya shughuli kwa kitengo cha muda.
2. shughuli yako anapata uthibitisho wake wa kwanza mapema, kwa sababu huna kusubiri muda mrefu kwa ajili ya kuzuia ijayo.

![Before Blossom the block target was 150 seconds with slower confirmations and lower throughput. After Blossom the target is 75 seconds with faster confirmations and roughly double the throughput](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/blossom-block-spacing.png)

## Kuweka utoaji imara

Kwa hivyo, ikiwa Zcash ilifanya vitalu mara mbili na kila block bado inalipa thawabu sawa, mtandao ungeunda ZEC haraka zaidi. Blossom anaepuka hiyo. Ilipunguza nusu ya tuzo iliyolipiwa kwa kila kizuizi, na ikaongeza maradufu muda wa kupunguzwa-mshahara kutoka 840,000 hadi 1,680,000 blocks (kwa mfano wakati ambapo mtu alipewa zawadi kubwa sana).[ZIP 208 - Ujumbe wa posta.](https://zips.z.cash/zip-0208)Mara mbili kama vitalu, kila kulipa nusu ya kiasi hicho, kazi nje kwa idadi sawa ya ZEC kuundwa kwa kitengo cha muda. jumla ugavi ratiba na wakati wa halving baadaye, kipimo katika muda halisi, si iliyopita.

![How Blossom keeps issuance steady: 75 second blocks arrive twice as often, the per-block reward is halved, the halving interval is doubled, so total emission over time stays the same](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/blossom-emission-balance.png)

## A lazima kuboresha

Blossom ilikuwa mabadiliko ya makubaliano pande mbili, ambayo ina maana kila node alikuwa na kuboresha kuendelea kufuata mlolongo ([ZIP 206 - Msaada wa posta.](https://zips.z.cash/zip-0206)Blossom ilianzishwa katika block ya msingi 653,600 na hubeba id yake mwenyewe ya tawi la makubaliano, lebo ambayo inaruhusu nodes na shughuli kuthibitisha kuwa ziko kwenye sheria za Blossum. Uboreshaji ulitumia utaratibu wa kawaida wa kuboresha mtandao wa Zcash ([ZIP 200 - Ujumbe wa posta.](https://zips.z.cash/zip-0200)).

## Mahali Ambapo Blossom Anafaa

Blossom was Zcash's third network upgrade. It followed Overwinter and Sapling, and it came before Heartwood and Canopy. Unlike Sapling, which reworked Zcash's shielded cryptography, Blossom was focused on scale and speed. Its main job was block timing, not new privacy features.

## Orodha ya maneno

Neno la Kiingereza lisilo na maana.
|---|---|
--Block lengo spacing-- muda mtandao inalenga kwa kati ya block moja na ijayo.
 Block malipo. ZEC mpya kuundwa na kulipwa nje kama kila block ni kuchimbwa.
Kupunguza kwa nusu muda wa mapumziko. Ni vipande vingapi vinavyopita kati ya kila kupunguzwa kwa malipo ya kipengele cha pili?
◯ Id ya tawi la makubaliano. Tag ambayo alama ni seti gani ya mtandao sheria node au shughuli inafuata.
◯ Mabadiliko ya makubaliano baina ya pande mbili. Badiliko la sheria ambayo kila node lazima ipitishe ili kubaki kwenye mtandao.
 Network Upgrade (NU)  mabadiliko uratibu kwa Zcash ya makubaliano sheria, ulioamilishwa katika block kuweka urefu.

## FAQs

Je, Blossom mabadiliko kiasi gani ZEC ipo au wakati halving kutokea? La. Tuzo kwa kila block ilikuwa nusu na katikati ya muda wa kupasuliwa mara mbili katika wakati huo huo, hivyo kiwango cha ZEC umba kwa kitengo cha muda, na ratiba ya Halvings baadaye, alibakia sawa.

Je, Blossom kubadilisha ZEC yangu au faragha? Hapana. Blossem iliyopita block muda na malipo ya hisabati. Si kugusa mizani yako au shughuli zako kulindwa.

Ni nini 75 sekunde kweli maana? ni lengo, si dhamana. vitalu hupatikana kwa ushahidi wa kazi, hivyo pengo halisi kati ya vitalu inatofautiana. mtandao ina lengo la moja kuhusu kila baada ya dakika 75 badala ya kila 150.

Je, mimi alikuwa na kufanya kitu chochote wakati Blossom kuanzishwa? Kama wewe mbio full node, unahitaji kuboresha ni kwa sababu Blossum ilikuwa lazima. kama matumizi mkoba, ulihitaji toleo kwamba mkono sheria mpya.

Kwa nini nusu block tuzo hata? kwa sababu vitalu sasa kuja mara mbili haraka. Halving per-block malipo anaendelea mtandao kutoka kujenga ZEC mara mbili kama haraka.

Wakati Blossom kuanzishwa? Katika block 653,600, Desemba 11, 2019 UTC.

## Jaribu uelewevu wako

Blossom alifanya Zcash vitalu kufika kuhusu mara mbili kama kawaida. Kwa nini kwamba si mara mbili kiwango ambacho mpya ZEC ni kuundwa?

<details>
<summary>Answer</summary>

Kwa sababu Blossom pia nusu tuzo kulipwa kwa block na mara mbili ya kupunguza muda wa kati kutoka 840,000 hadi 1,680,000 blocks. Blocks maradufu, kila kulipa nusu kiasi hicho, kuongeza juu ya kiasi sawa cha ZEC per unit of time, hivyo uzalishaji ratiba kipimo katika wakati halisi si iliyopita.
</details>

### Rasilimali

[ZIP 208: Shorter Block Target Spacing (Mbali ya Lengo la Mzunguko wa Muda mfupi)](https://zips.z.cash/zip-0208)

[ZIP 206: kupelekwa kwa Blossom Network Upgrade](https://zips.z.cash/zip-0206)

[Blossom Network Kuboresha](https://z.cash/upgrade/blossom/)

[Blossom Upgrade inaboresha kasi, Scalability, uwezo (Electric Coin Company)](https://electriccoin.co/blog/blossom-upgrade-improves-speed-scalability-capacity/)

### Angalia pia:

[Zcash Network Upgrades (Ubadilishaji wa Mtandao)](../start-here/network-upgrades)

[Zcash Sera ya Fedha](../start-here/zcash-monetary-policy)

[ZEC na Zcash ni nini?](../start-here/what-is-zec-and-zcash)

[Nodes kamili](../zcash-tech/full-nodes)

[NU6.1](../zcash-tech/nu6-1)

---

Mfululizo: [Kiwango cha Upgrades Network](../start-here/network-upgrades) · Zamani: [Sapling](../zcash-tech/sapling) · Kisha: [Miti ya moyo](../zcash-tech/heartwood)
