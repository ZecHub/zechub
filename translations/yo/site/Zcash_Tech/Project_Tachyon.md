<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Project_Tachyon.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Iṣẹ́ Àkànṣe Tachyon

## TL;DR

- Tachyon jẹ àtúnṣe tí a dábàá nípa bí àwọn pọ́ò̀lù Zcash ṣe ń rí àti lo owó tó wà ní ìpamọ́, èyí ti ó túmọ̀ sí pé kí nẹtiwọọki náà dàgbà di ọ̀pọ̀lọpọ̀ ènìyàn.
- Loni, àpòòwé ní láti gbìyànjú àti tú ìlà ńlá kan nínú ẹ̀ka-ìpínlẹ̀ náà kí ó lè mọ àwọn owó tí wọ́n jẹ tirẹ̀. Ìdí pàtàkì nìyí tó fi dàbíi pé dídánwò ìṣọ̀kan ti pẹ́ jùlọ
- Tachyon rọpo eyi pẹlu **iṣakojọpọ aiṣe-riwo**, nitorinaa apamọwọ kan gba ohun ti o nilo laisi lilọ kiri gbogbo nkan ati lai sọ fun olupin awọn ẹya wo ni o fẹ
- O tun gbe awọn alaye sisanwo kuro ni blockchain ati sinu ibeere isanwo funrararẹ, eyiti o jẹ ki ilana naa rọrun ṣugbọn gbigbe ojuse si awọn apamọwọ.
- O jẹ imọran, ti a tẹjade ni akọkọ ni Oṣu Kẹrin ọdun 2025 ati orukọ bi oludije fun NU7. ** Ko ṣe ọkọ oju omi**, o si nilo igbiyanju imọ-ẹrọ lori iwọn igbesoke Sapling.

<br/>

## Ta ni èyí wà fún?

- Ẹnikẹni ti o ba wo a bo wallet sync ati ki o iyalẹnu idi ti o gba to gun
- Awọn tuntun ti o tẹsiwaju lati ri Tachyon mẹnuba lẹgbẹẹ NU7 ati Zcash scaling.
- Àwọn olùkà tí ó fẹ́ kí èrò náà wà nípò àkọ́kọ́ àti ẹ̀rọ ìdìwé-ìmọ̀ lẹ́yìn.

<br/>

## Ìṣòro tí Tachyon yanjú

Zcash máa ń fi ẹni tí owó náà jẹ́ fún pamọ. Èyí ni kókó, ó sì dá ìṣòro kan tó le: bí ẹnikẹ́ni kò bá lè mọ̀ pé ta ló gba owó yẹn, báwo wá ni àpò rẹ ṣe rí tìrẹ?

Ni Bitcoin eyi rọrun. Awọn adirẹsi jẹ gbangba, nitorinaa apamọwọ kan le beere olupin "kini o firanṣẹ si adiresi yii?" ati gba idahun Kan Zcash wallet ko le ṣe ibeere yẹn, nitori pe bibere rẹ yoo fi han gangan ohun ti a ṣe apẹrẹ adagun-odo lati farapamọ.

So Zcash does something different. The sender encrypts the payment details and tucks them inside the transaction itself. Your wallet then works through transactions on the chain and tries to decrypt each one. Almost every attempt fails. The few that succeed are your payments. This is called **trial decryption**, and it is private, correct, and slow.

![Today a Zcash wallet downloads every shielded transaction and tries to decrypt each one, with almost every attempt failing, to find the few payments that belong to it](/content-images/tachyon-scanning-today.svg)

The catch is what the work depends on. The effort your wallet spends is set by how big the chain is, not by how many payments you actually received. Someone who has never received a single payment does nearly as much work as someone who receives them daily. As Zcash grows, that gets worse for everybody. In the words of the proposal, it "simply does not scale."

<br/>

## Àwọn ìyípadà tí Tachyon ń ṣe

Tachyon kọlu iṣoro naa ni ipilẹ rẹ: o da lilo blockchain duro bi ikanni ifijiṣẹ fun awọn aṣiri isanwo.

dípò, àwọn ìsọfúnni tí o nílò máa ń rìnrìn àjò pẹ̀lú ìbéèrè owó fúnra rẹ̀. ó ní ìmọ̀ràn tó wà nínú àdéhùn ìdánwò náà láti ṣe é láìsí pé a fi kọ́ńsókò kan sí i lára tàbí kí wọ́n ti tú u sílẹ̀ fún ọ nígbà míì. èyí ni Sean Bowe ṣàpèjúwe bí gbígba "àwọn ètò ìṣúnnáwó láìṣe-ìdínà" lọ́wọ́ fún ìgbà àkọ́kọ́ nínú ìlànà Zcash tí kò léwu rárá.

Bí ẹní ń fi ìsọfúnni yìí ránṣẹ́ kò bá ní í ṣe pẹ̀lú rẹ mọ́, àpò owó yín ò tún ní ìdí láti wá a kiri mọ́. Ìṣòro dídídìkọ̀rọ̀ náà á sì pòórá pátápátá.

Àpò rẹ ṣì nílò láti mọ ipò ìsínà tí ó wà nísinsìnyìí kí o lè náwó, bó tilẹ̀ jẹ́ pé èyí ni apá kejì ti àwòkọ náà, **oblivious synchronization**: ọ̀nà fún àpò kan láti mú àwọn nǹkan pàtó tóun fẹ́ láìfi hàn sí sàràkí ohun tí òun béèrè.

![With Tachyon the sender passes payment details to the recipient out of band, and the wallet uses oblivious synchronization to retrieve only the data it needs instead of scanning the whole chain](/content-images/tachyon-oblivious-sync.svg)

<br/>

## Ohun tí yóò túmọ̀ sí fún ẹnìkan tó ń lo àpò-ìpamọ́ kan

- **Iṣọkan duro lati dagba pẹlu pq.** Akoko ti apamọwọ rẹ lo ni wiwa yoo tọpinpin iṣẹ tirẹ ju iwọn Zcash lọ.
- **Ìdáwọ́sílẹ̀ wá dà bí ìgbà téèyàn ń fún ẹnì kan níwèé.** Ohun tí ẹni tó fẹ́ san owó náà nílò ló wà nínú ìwé ẹ̀rí ìsanwó, nítorí náà àjọṣe àárín olùfìwéránṣẹ́ àti onígbàlà ṣe pàtàkì ju ti òde òní lọ.
- ** Awọn apamọwọ gbe ojuse diẹ sii.** Nitoripe pq ko tun ni ẹda ti a fi pamọ awọn alaye isanwo rẹ, pipadanu data apamọwọ rẹ ṣe pataki julọ. Atilẹba ati imupadabọ yipada lati jẹ ẹya ilana si nkan sọfitiwia apamọwọ gbọdọ gba ọtun.
- ** Diẹ ninu awọn nkan ti o mọ gbe tabi parun.** Tachyon gba iyatọ bọtini, wiwo awọn bọtini ati adirẹsi isanwo kuro ni ilana ipilẹ, fi wọn silẹ si ipele apamọwọ. Eyi jẹ ọkan ninu awọn apakan pataki julọ ti imọran naa ati pe a tun n ṣiṣẹ nipasẹ rẹ.

<br/>

## Àyẹ̀wò tó jinlẹ̀ fún àwọn òǹkàwé tí wọ́n mọ̀ nípa ẹ̀rọ kòmpútà.

Tachyon ni a ṣe apejuwe bi iyipada ti o wa ni idakeji si ilana Orchard. O le ṣee gbejade boya gẹgẹbi igbesoke si adagun-odo ti tẹlẹ tabi bi adugbo idaabobo ọtọtọ nipasẹ ọna kan . [àyíká ìlọ́nà](https://zechub.wiki/zcash-tech/the-turnstile), ọ̀nà kan náà tí Zcash lò fún Ironwood. Ìpinnu yìí ni ó ń nípa lórí ìmúṣẹ, kì í ṣe àwòkọ́ṣe rẹ̀.

O pa ọpọlọpọ awọn nkan kuro ni Orchard: RedPallas key re-randomization, homomorphic value commitments ati binding signatures, ati ilana bọtini ti o pinpin eyiti o jẹ ki ẹrọ kan ṣe aṣoju idaniloju laisi fifun aṣẹ lilo.

The scaling work leans on **proof-carrying data**, a technique in which data travels alongside a proof of its own correctness, so that combining it with other proof-carrying data produces something that inherits and extends those proofs. This is what allows a large amount of verified work to be compressed into something small and quick to check. Halo, discovered by the team behind Zcash, is what made proof-carrying data practical enough to build on.

Ẹya kẹta ni ** awọn iṣiro iṣowo ti a fi pamọ**, eyiti o yi ọna iyipada ipinlẹ aabo ṣe ibaraẹnisọrọ ati pe o ni ipa lori bi ibuwọlu ṣiṣẹ.

<br/>

## Ibi tí iṣẹ́ náà dúró sí

Tachyon jẹ **awuye, kii ṣe ẹya ti a firanṣẹ**. O tẹjade ni Oṣu Kẹrin ọdun 2025, ati ifiweranṣẹ atẹle kan ni May 2025 ṣiṣẹ nipasẹ awọn ipa ifọkanbalẹ. A pe o bi oludije fun NU7, igbesoke nla miiran lẹhin Ironwood, ṣugbọn akoonu NU7 pinnu nipa ibo owo-owo ati ko si nkankan nipa Tachyon ti yanju.

Àkọlé tí òǹkòwé fúnra rẹ̀ kọ ni pé èyí jẹ́ ètò tó ṣeé ṣe láti gbéṣẹ́ dípò ìwádìí àròsọ, ṣùgbọ́n ó nílò iṣẹ́ ọnà kan ti a lè fi wé Sapling, pẹ̀lú àwọn ìbéèrè líle koko mìíràn táa dìídì fà sílẹ̀ fún ọjọ́ iwájú.

Àwọn iṣẹ́ tó jẹ mọ́ ọn ti wà nílẹ̀ báyìí. [Zakura](https://zechub.wiki/zcash-tech/zakura-node), ìkànnì tí ó kún fún àwọn ohun tó wà nínú rẹ̀, èyí tí a ṣe ní July 2026, jẹ́ akitiyan àjọṣepọ̀ láàrin Project Tachyon àti Valar Group. Ó sì ń fi hàn bí àtúnṣe sí orí-ayé nẹtiwọọki yìí yóò ti rí. [Gbígba Ìsọfúnni Àdáni padà](https://zechub.wiki/zcash-tech/private-information-retrieval) ìwádìí náà ń wá ọ̀nà láti rí ibi tó jọ pé ó ti ní ìṣòro kan náà, àmọ́ tí kò fi bẹ́ẹ̀ bára mu.

<br/>

## Àwọn èrò òdì tó wọ́pọ̀ nípa àwọn èèyàn

- **Tachyon kò sí láàyè.** Kò sí àpò tí ó ń lòó lónìí, àti pé kò sí ìyípadà tó ti mú un ṣiṣẹ́.
- **Tachyon ko jẹ kanna bi Ironwood.**Ironwood ti ṣiṣẹ ni Oṣu Keje ọdun 2026 o si ṣe pẹlu adagun Orchard ati turnstile. Tachyon jẹ iyatọ, imọran nigbamii nipa titobi.
- **Tachyon kìí ṣe ìyípadà nínú àṣírí.** Ìlépa ni láti pa ìwé àkọsílẹ̀ mọ́ láìṣe àyè sí iye owó tí ó ń mú kí wọn pọ̀, kì í se pé kéèyàn fi ìṣójútó ṣòwò fún iyara.
- **zk-SNARK verification was never the bottleneck.** The proposal is explicit that the slow part is how wallets discover and coordinate state, not the cost of checking proofs.
- **"Awọn ti a fojusi si NU7 " kii ṣe adehun.** Ohun to ba wọle sinu NU7 ni wọn n pinnu nipa idibo.

<br/>

## Àkójọ àwọn ọ̀rọ̀

Ọ̀rò̀ náà... ìtumọ̀.
|---|---|
ìdánwò láti tú àdàkọ ìdìbò. Ìgbèrò láti tú àwọn àdírésì ọ̀kan-kò-jọ̀kan kí o lè rí èyí tí ó wà fún ẹ.
ì pínpín àṣírí inú-àlàfo. Fífi ààbò ìsanwó sínú ìdánwò náà lórí ẹ̀rọ alágbèéká, bí Zcash ṣe ń ṣe lónìí.
ísanwó láìsí ìsọfúnni. Fífi àlàyé owó sanwó ránṣẹ́ ní tààràtà láàárín ẹni tó ń fi nǹkan ranṣẹ àti onítọ̀hún dípò tí yóò fi máa gba gbogbo ẹ̀rọ lọ síbi kan náà.
ìmúṣiṣẹ́pọ̀ tí kò ṣe é rántí. Gbígba ìsọfúnni ẹ̀ka ti àpamọ́ kan nílò láìfi hàn àwọn ìsọfa tó béèrè fún wọn.
DATA tí ó ń gbé ẹ̀rí (PCD) Data tó máa ń rìnrìn àjò pẹlú èsì ti wípé òun tọ, nítorí náà àwọn ẹ̀jẹ́ lè di papọ̀ kí a sì kó wọn jọ.
ìkójọpọ ìsòwò tí a fi ààbò ṣe. Ọ̀nà Tachyon láti kó àwọn ìyípadà ipò ti ó ní ààbò jọ, yí bí wọ́n ṣe ń bára wọn sọ̀rọ̀ àti wípé wọ́n fọwọsi padà.
| Ledger indistinguishability | The property that shielded transactions cannot be told apart from one another |

<br/>

## Àwọn ìbéèrè tí a sábà máa ń béèrè

**Ṣé èyí yóò mú kí àpò mi ṣe ìfọwọ́sowọ̀pọ̀ ní kánjúkánjú?** Ìyẹn ni góńgó. Àkókò ìṣọ̀kan náà á tẹlé ìgbòkègbodò tìrẹ dípò tí ó fi jẹ́ ti bí ẹrù ọjà-ìpèsè tó wà nínú pákó yìí ṣe pọ̀ sí i. Kò tíì sí nǹkan kan táa ránṣẹ́, nítorí náà kò sí iye pàtó kankan láti sọ fún wa báyìí.

** ṣé mo nílò láti ṣe ohunkóhun nísinsin yìí?** rárá. tachyón jẹ́ àbá kan tí a gbé kalẹ̀, bí wọ́n bá gbà á láyè yóò dé nípa títún ẹ̀rọ náà sọ di tuntun pẹ̀lú ìkìlọ̀ tó máa ń wáyé nígbà gbogbo.

**Ṣé mímú àwọn kókó wíwo kúrò túmọ̀ sí pípàdánù agbára láti pínpín àyè fún kíka?** Àbá náà gbé òye yẹn jáde nínú ìlànà ìpilẹ̀ṣẹ àti sínú ẹ̀kúnrẹ́lẹ̀ wallet. Ohun tí èyí dà bí ní ìgbésè ni ọ̀kan lára ìbéèrè tó wà lárọ̀ọ́wọ́tó.

**Ṣe owó mi wà nínú ewu bí Tachyon bá wọ̀ ọkọ́ ojú omi?** Ìmúgbòòrò yóò lo ìyípadà Orchard tàbí àtúnṣe, àwọn méjèèjì ni a ṣe kí iye náà lè máa lọ lábẹ́ ìlànà ìṣírò àkọsílẹ̀. Ojúewé Ironwood ṣàlàyé bi àtúnse kan ti ń ṣiṣẹ́.

<br/>

## Àwọn ojúewé tó ní í ṣe pẹ̀lú rẹ̀

- [Gbígba Ìsọfúnni Àdáni Pa Dà](https://zechub.wiki/zcash-tech/private-information-retrieval) - ọ̀nà mìíràn láti yanjú ìṣòro ìwífún-àpò owó kan náà.
- [Ìkànnì Zakura](https://zechub.wiki/zcash-tech/zakura-node) - ìsọ̀rí kan tí a ṣe lábẹ́ iṣẹ́ ẹ̀rọ Tachyon.
- [Igi irin-igi](https://zechub.wiki/zcash-tech/ironwood) - ìyípadà tó bẹ̀rẹ̀ ní July 2026, tí àwọn èèyàn sábà máa ń dà á pọ̀ mọ́ Tachyon.
- [Òpó Ìrísí Iṣẹ́ Ọwọ́ Náà](https://zechub.wiki/zcash-tech/the-turnstile) - ohun tí Tachyon lè lò bí wọ́n bá fi ṣe àgbájọ rẹ̀.
- [Ààbò Lẹ́yìn Ìmúninímù-Ìwéko](https://zechub.wiki/zcash-tech/post-quantum-security) - níbi tí Tachyon ti ń jókòó pẹ̀lú iṣẹ́ àbáwọlé tó gùn-ún sí i.
- [Bí Wọ́n Ṣe Ṣètò Zcash](https://zechub.wiki/start-here/how-zcash-is-organized) - ẹni tó ń ṣe iṣẹ́ yìí àti bí ètò àyíká náà ṣe bára mu

<br/>

## Àwọn Owó-ìṣúnná owó

- [Tachyon: Ṣiṣipilẹ Zcash pẹlu Ajọpọ Imularada ti ko ni imọran](https://seanbowe.com/blog/tachyon-scaling-zcash-oblivious-synchronization/) - Sean Bowe, 2 April 2025, Àbá ìpilẹ̀ṣẹ̀ náà
- [Ìṣòro Tó Wà Láti Jìnnà sí I](https://seanbowe.com/blog/tachyaction-at-a-distance/) - Sean Bowe, 15 May 2025, ìfohùnmọ́ra àti ìlànà àwọn àbájáde rẹ̀, tí a kọ fún àwọn olùdàgbàsókè ètò ìṣàkóso.
- [Àkọlé àwòrán, Sean Bowe's blog](https://seanbowe.com/blog/) - níbi tí a ti tẹ àwọn ìwé Tachyon jáde.
- [tachyon.z.cash (ì í ì ë ¤)](https://tachyon.z.cash/) - ibi tí a ti ń ṣe ìwádìí náà.
