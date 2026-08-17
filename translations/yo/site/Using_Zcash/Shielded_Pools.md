<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Shielded_Pools.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Àwọn Ìpín iye Zcash 

## TL;DR

- Zcash ní báyìí ni àwọn ìsọ̀rí iye tí ó tó márùn-ún: Sprout (àjogúnbá), Sapling, Orchard (ìṣòro owó nìkan), Ironwood àti Transparent.
- **Ironwood** ni adágún tí ó wà ní ìpamọ́, tó ti ń ṣiṣẹ láti ìgbà àtúnṣe NU6.3 lọ́jọ́ 28 July 2026.
- Orchard ti di ohun tí a ń náwó sí báyìí: kò si iye tuntun tó lè wọlé, àti owó to wà nísinsin yìí yóò ṣí lọ sínú Ironwood.
- **Sapling** (àwọn adirẹsi z tí ó bẹ̀rẹ̀ pẹlú: `zs`) ṣì ní ìtìlẹyìn tó gbòòrò, ó sì ń bá a lọ láti rí i pé àwọn ZEC tí wọ́n fi ààbò bo wà nínú iye kan.
- Àwọn àdírẹ́sì tí ó ṣe kedere (t...) kì í pèsè ìpamọ̀ fún àwọn ìdánwò, wọ́n sì ń ṣiṣẹ́ bíi ti Bitcoin.
- **Sprout** jẹ adágún omi tí a fi ààbò ṣe, èyí ti wọn kò lò mọ́.
- Ìlọsípò láti Orchard sí Ironwood ti ń lọ lọ́wọ́ báyìí, a sì ṣe àgbéyẹ̀wò rẹ ní gbangba nípa lílo ilé ìyípadà.
- Fun awọn iṣeduro aṣiri ti o lagbara julọ, awọn olumulo yẹ ki o tẹsiwaju lati fẹ ** shielded-to-shielded (z → z)** iṣowo nigbakugba ti o ba ṣeeṣe.


<br/>

## Mọ Awọn Apapo Iye Zcash

Zcash pín owó sí àwọn ètò ìsòwò tí ó yàtọ̀, èyí tí a mọ bí àpò iye. Àpótí kọ̀ọ̀kan ní ìlànà ìdánimọ́ àti ohun-ìní àṣírí tirẹ̀, nígbà ti àdéhùn náà ń tọpinpin gbogbo iye tó nlọ láàrin wọn.

Loni, nẹtiwọọki naa ni awọn adagun iye pataki marun:

- Transparent  Public ati ki o ni kikun han lori-ṣaja.
- Sapling  Ìsun omi tí a fi ọ̀pá ààbò ṣe, èyí tó kọ́kọ́ gbajúmọ̀ lóde òní. Ó ṣì wà títí dòní olónìí.
- Orchard  Èbúté tí a fi ààbò bo ni àkọ́kọ́, ní báyìí ìnáwó nìkan ló wà.
- Ironwood  Omi-omi akọkọ ti o ni aabo lọwọlọwọ, eyiti a ṣe nipasẹ NU6.3.
- Sprout  Ìkójọ ìpamọ́ tí ó jẹ́ ti àkọkọ ni a ṣe pẹ̀lú Zcash ní 2016.
  


Bi Zcash ṣe n dagbasoke, awọn adagun-odo tuntun ti o ni aabo le ṣee ṣafihan lati mu ilọsiwaju ailewu, asiri, lilo ati iṣayẹwo pọ si lakoko mimu ibaramu pẹlu awọn owo to wa tẹlẹ.

<br/>

![img1](/content-images/4ba8cca2-cea5-42d2-8ec2-2122b26f5144-9db37e245e.webp)
Àwòrán 1: Ìtòlẹ́sẹẹsẹ tó fi àwọn ìsọ̀rí 4 tí ó wà nísinsìnyí hàn láti oṣù October, 2025

<br/>

## Àwọn Ibi Ìwẹ̀ Tí Wọ́n Fi Ń Dáàbò Bo Ara Wọn 


1. <h3 id="ironwood" class="text-3xl font-bold my-4">Ironwood Pool</h3>

Ironwood ni adágún tí ó wà ní ìpamọ́ lákòókò yìí. Ó ti ṣiṣẹ̀ lọ́jọ́ 28 July 2026 ní block 3,428,143 gẹ́gẹ́ bí apá kan nínú àtúnṣe sí ẹ̀ka-ìpínlẹ̀ NU6.3, ibí sì ni iye tuntun tó ń gbé báyìí.

It exists because a vulnerability was found in Orchard's proving system in May 2026. There is no evidence it was ever exploited, but the flaw meant the shielded supply could not be proven sound by the proofs alone. Rather than patch in place, the network created a fresh pool with a corrected circuit and moved value across a turnstile that counts every coin in public. That accounting is what restores the guarantee that the shielded supply is fully backed.

Ironwood reuses Orchard ká Action awoṣe ati Halo 2 proofs, ki o si ma ṣe awọn kanna ona lati ọjọ. meji ohun ni titun: owo lo v6 kika, ati ironwood akọsilẹ ti wa ni ** quantum-recoverable** labẹ [ZIP 2005 Ìpínlẹ̀ Ọsirélíà](https://zips.z.cash/zip-2005), èyí túmọ̀ sí pé àkọsílẹ̀ owó orí ẹyọ kan yóò wà ní títún rí i padà bí kọ́ǹpútà kọnúmátì ọjọ́ iwájú bá fọ ìlànà ìkọwéránṣẹ́ òde òní. Ìyẹn ni ọ̀nà àtúnṣe, kì í ṣe resistance quantum, kò sì lè lò fún àwọn pólù tó ti pẹ́ jùlọ lọ.

O kò nílò adirẹsi tuntun. Adirẹsii ti o ni iṣọkan ṣepọ awọn olugba pupọ, ati pe awọn apamọwọ yan apapo to tọ fun ọ.

____

2. <h3 id="orchard" class="text-3xl font-bold my-4">Orchard Pool</h3>


![img2](/content-images/a672e001-6dbc-4e76-ab31-0ed7d7d2ff72-93b5a23e5d.webp)
Àwòrán 2: Ìtòlẹ́sẹẹsẹ tó fi àgbá Orchard hàn ní oṣù October, 2025

<br/>

A ṣe ifilọlẹ Orchard Shielded Pool ni Oṣu Karun ọjọ 31, Ọdun 2022 gẹgẹbi apakan ti igbesoke nẹtiwọki NU5. Orchid ṣafihan ilana aabo tuntun kan eyiti o yọkuro iwulo fun iṣeto igbẹkẹle ati di adagun idaabobo akọkọ ti a lo nipasẹ Awọn adirẹsi Iṣọkan (UA).

Orchard ṣe ilọsiwaju lilo, ṣiṣe ati asiri ni pataki nipa idinku idasilẹ metadata iṣowo ati ṣafihan awoṣe iṣiro ti o rọ diẹ sii da lori Awọn iṣe dipo awọn titẹsi ihamọra aṣa ati awọn abajade.

Lati igba ti igbesoke Ironwood ṣiṣẹ ni 28 Keje 2026, ** Orchard jẹ lilo-nikan. Ko si iye tuntun le wọ inu adagun naa. Awọn owo ti o wa tẹlẹ nibẹ tun le lo, ati pe wọn nlọ kiri sinu Ironwood nipasẹ awọn ọna iyipada. Wallets ṣe itọju eyi fun ọ, botilẹjẹpe ọpọlọpọ fi diẹ ninu iṣakoso lori iyara.

Bí o bá ní owó Orchard, wo: [Igi irin-igi](/zcash-tech/ironwood) nítorí ohun tí ṣíṣí lọ síbòmíràn túmọ̀ sí nínú ìwàláàyè.

____

3. <h3 id="sapling" class="text-3xl font-bold my-4">Sapling Pool</h3>


![img3](/content-images/b1c6bb71-9356-45eb-8e4a-19d7cf1790ae-5e3051b082.webp)
Àwòrán 3: Ìtòlẹ́sẹẹsẹ tó fi àgbègbè ìsun omi Sapling hàn ní oṣù October, 2025

<br/>

[Zcash Sapling (ìyẹn ìka tí wọ́n ń pè ní)](https://z.cash/upgrade/sapling) jẹ́ àtúnṣe sí ìlànà Zcash tí a ṣe ní ọjọ́ 28 oṣù kẹwàá, ọdún 2018. Ó jé ìyípadà ńlá lórí ẹ̀dà ti tẹlẹ èyí tí ó mọ̀ bí Sprout tó ni àwọn ìdíwọ́ kan nínú ọ̀rọ̀ àṣírí ẹni, òye àti lílò. 

Some of the upgrades include improved performance for shielded addresses, Improved viewing keys to enable users view incoming and outgoing transactions without exposing user private keys and Independent Zero Knowledge keys for hardware wallet during transaction signature. 

Zcash Sapling gba awọn olumulo laaye lati ṣe iṣowo ti ara ẹni ni iṣẹju diẹ nigbati a ba fiwe si iye akoko to gun julọ ninu Sprout Series. 

Ààbò ìsòwò ń mú kí àṣírí túbọ̀ jẹ́ àdáni, tí ó sì sọ ọ di aláìṣeé ṣe fún àwọn ẹgbẹ́ kẹta láti so ìṣàdálẹ̀ pọ̀ àti dípinnu iye ZEC ti a n gbe. Sapling tún mu ki ìlúlò sunwọ̀n sí i nípa yíyẹnu ohun-èlò tó nílò nípasẹ̀ kímọ òye ìdánimọ̀ fun ṣíṣe ètò ìbániṣiṣẹ́kọlẹ̀ láìsí ẹni to mọ̀ ọ́n dá lóhùn nípa jíjẹ́ kó rọrùn fáwọn onílò láti lòó.

Sapling wallet addresses begin with "zs" and this can be observed in all supported Zcash Shielded Wallet (YWallet, Zingo Wallet Nighthawk etc.) which has built-in Sapling addresses. Zcash Sapling represents a significant development in technology when it comes to privacy and efficiency of transactions which makes Zcash a practical and effective cryptocurrency for users who value privacy and security.

____

4. <h3 id="sprout" class="text-3xl font-bold my-4">Sprout Pool</h3>


![img4](/content-images/956eceed-f4d6-4087-99d0-32a770449dda-a3cc45305e.webp)
Àwòrán 4: Ìtòlẹ́sẹẹsẹ tó fi àgbá ìrẹ̀ǹgbẹ hàn ní oṣù October, 2025

Sprout ni àkọ́kọ́ nínú àwọn ìlànà ìpamọ̀ tí kò ní àṣẹ, Zero Knowledge. Ó ti bẹ̀rẹ̀ láti 28 October 2016.

Awọn adirẹsi Sprout ni a mọ nipasẹ awọn lẹta meji akọkọ wọn eyiti o jẹ "zc" nigbagbogbo. O ti pe orukọ rẹ ni "Sprout" fun idi pataki lati tẹnumọ pe sọfitiwia naa jẹ ọdọ, blockchain budding pẹlu agbara nla lati dagba ati ṣiṣi silẹ fun idagbasoke. 

A lo ọ̀pọ̀lọpò gẹ́gẹ́ bí irinṣẹ́ fún ìmúlẹ̀síwájú. [Zcash ìbẹ̀rẹ̀ díẹ̀ Mining](https://electriccoin.co/blog/slow-start-and-mining-ecosystem/) èyí tí ó mú kí ìfúnni ZEC àti èrè Block fún àwọn Miners. 

Bi eto ilolupo Zcash ti n tẹsiwaju lati faagun pẹlu nọmba awọn iṣowo ideri, o ṣe akiyesi pe jara Sprout Series di opin ati ṣiṣe to kere si nigbati o ba de asiri olumulo, iṣiro owo-owo ati sisẹ. Eyi yori si atunṣe ti nẹtiwọọki ati Sapling Upgrade . 

---
5. <h3 id="transparent" class="text-3xl font-bold my-4">Transparent Pool</h3>
<br/>

![img5](/content-images/01de2907-b62d-4421-83d7-ea4908faa828-6f74b724ed.webp)
Àwòrán 5: Ìtòlẹ́sẹẹsẹ tó fi àwọn ìsọ̀rí tí ó wà ní October, 2025 hàn.

<br/>

Àdírẹ́sì àpò owó tí ó ní ìmójútó lórí Zcash bẹ̀rẹ̀ pẹ̀lú lẹta "t", ìdánimọ̀ jẹ díẹ̀ nínú lílo irú àdíréìsì yìí fún àwọn ìṣàmúlò.

Transparent transactions in Zcash are similar to Bitcoin transactions which supports multi-signature transactions and make use of standard public addresses.

Awọn Zcash Transparent ni o wa julọ lo nipa centralized paṣipaarọ lati rii daju nibẹ ti jẹ ga transparency ati nẹtiwọki ijẹrisi nigba fifiranṣẹ ki o si gbigba ZEC laarin awọn olumulo.

It's also important to note that while Zcash Shielded addresses provides high privacy during transactions, they also require more computational resources to process transactions. Therefore, some users may adopt Transparent addresses for transactions which doesn't require the same level of privacy.

<br/>

## Ìlànà tí a dámọ̀ràn fún ìmúpòsíwájú nínú àwọn ẹgbẹ́-ìpínwó.

Nígbà tí ó bá di wíwo ìpamọ́ gíga nígbà ìṣòwò lórí Àjọ Zcash, a dábàá pé kí o tẹ̀lé àwọn ìlànà tó wà nísàlẹ;

Awọn iṣowo ti o waye laarin awọn apamọwọ "z si z" lori blockchain Zcash ni a ṣe aabo pupọ ati pe nigbakan wọn npe ni Iṣowo Ikọkọ nitori ipele giga ti Asiri. Eyi jẹ igbagbogbo ọna ti o dara julọ ati ọna iṣeduro lati firanṣẹ ati gbigba $ZEC nigbati aṣiri ba nilo. 

---

Nigba ti o ba firanṣẹ ZEC lati "Z-adiresi" si "T-address", o kan nfihan iru iṣowo Deshielding. Ni iru idunadura yii, ipele aṣiri ko ga nigbagbogbo bi diẹ ninu alaye yoo han lori blockchain nitori ipa fifiranṣẹ ZCE ni Adirẹsi Transparent . A ko ṣe iṣeduro adehun deshielded nigbati a nilo asiri giga. 

---

Gbigbe ZEC lati Adirẹsi Transparent (T-address) si adirẹti Z ni a mọ nikan bi Shielding. Ni iru iṣowo yii ipele ti asiri ko ga nigbagbogbo nigbati o ba ṣe afiwe pẹlu eyi ti idunadura z-z ṣugbọn o tun ṣeduro nigba ti aṣiri nilo. 

---

Fifiranṣẹ ZEC lati Adirẹsi Transparent (T-address) si Adirẹẹsi Transparant miiran (T -Address) lori Nẹtiwọọki Zcash (iṣowo T-T) jẹ iru pupọ si ti iṣowo Bitcoin ati pe eyi ni idi ti awọn iṣiro T-t lori Zcash nigbagbogbo npe ni Awọn idunadura gbangba nitori mejeeji oluranlowo ati alaye gbigbe olugba di han fun gbogbo eniyan eyiti o mu ki ipele Asiri kekere ninu iru iṣowo bẹẹ. 

Pupọ julọ Awọn paṣipaarọ Cryptocurrency ti a ṣepọ lo Adirẹsi Transparent ("T-address) nigbati o ba de si iṣowo lori blockchain Zcash ṣugbọn iru idunadura yii (T-T) kii yoo ni awọn ohun ini ikọkọ eyikeyi.

<br/>

## The Orchard to Ironwood Migration

The migration is happening now. Orchard is sealed to new deposits, and the value still sitting there is moving into Ironwood a transaction at a time. You can watch the totals at [igi irin. gbé e yè é](https://ironwood.live/).

Ohun tí èyí túmọ̀ sí sinmi lórí ibi ti owó rẹ wà:

1. "Ìṣẹ̀lẹ̀ tuntun tí a fi ààbò bo" wọlé sí Ironwood lóòtọ́. Kò sóhun tó yẹ kí n ṣe.
2. **Existing Orchard funds** need to migrate. Maintained wallets do this for you, usually in stages rather than all at once.
3. Ìlú Sapling kò ní ìṣòro kankan, ó sì ṣì ń gba owó. Orchard nìkan ni wọ́n ti pa mọ́.
4. **Ohun gbogbo ni ààlà ń kà** tí ó kọjá láàárín àwọn ìkùdu, èyí sì jẹ́ ẹ̀rí pé kò sí owó kankan tó ṣe é dá lójú ọ̀nà.

> **One privacy caveat worth knowing.** The turnstile publishes the *amount* that crosses between pools, along with the block height. Sender and receiver stay hidden as always, but a distinctive amount can be linked back to you. This is why wallets migrate in stages using standard denominations instead of moving your balance in one recognisable lump. Let your wallet pace itself, and consider using Tor or a VPN so your IP is not tied to the amounts you move.

Wo àwọn ojúewé yìí: [Igi irin-igi](/zcash-tech/ironwood) fún ìmúbọ̀sípò náà fúnra rẹ̀, àti [Òpó Ìrísí Iṣẹ́ Ọwọ́ Náà](/zcash-tech/the-turnstile) bí ìwé ìwádìí ṣe ń ṣiṣẹ́.

<br/>

## Àwọn Àṣìṣe Tó Yẹ Kó O Sá fún

- **Fífi ránṣẹ́ láti t-adiresi sí t-address**  gbangba pátápátá, kò ní ìpamọ́. Ẹ máa kókó fi owó pamọ́ nígbà gbogbo.
- ** Ifá pé Orchard ṣì ń gba owó**  ó ti jẹ́ ìnáwó-kì láti 28 July 2026. Iye lè kúrò, ṣùgbọ́n kò sí nǹkan tuntun tí yóò wọlé.
- **Ṣíṣe àdàkàdekè àwọn adirẹsi Sapling àti Unified**  Àwọn adirése Sapling máa ń bẹ̀rẹ̀ pẹlú: `zs`. Àwọn àdírẹ́sì tí ó wà ní ọ̀kan-ò-jọ̀kan bẹ̀rẹ̀ pẹlú: `u1` ati ki o apapo orisirisi olugba, ki awọn pool rẹ owo ilẹ ni pin lori eyi ti onigbọwọ wipe adirẹsi gbe
- ** Fi owó sílẹ̀ nínú pápá ìṣeré Sprout**  A ti sọ Sprout di ohun tí kò wúlò fún ọ̀pọ̀lọpò ọdún; kó àwọn ìnáwó wọnyìí jáde.
- **Rí pé ìyípadà kò ní hàn gbangba**  iye tó ń kọjá lórí àlàfo ni gbogbo èèyàn mọ̀, bó tilẹ̀ jẹ́ pé ẹni tí ó rán an àti ẹni tó gbà á kì í ṣe bẹ́ẹ̀.
- **Gbigba t → z (igbohunsafẹfẹ) jẹ aṣiri patapata**  iṣe ti igbohunsifa funrararẹ ni o han lori-ṣaja; awọn akoonu ko wa

---

## Àwọn ojúewé tó ní í ṣe pẹ̀lú rẹ̀

- [Igi irin-igi](/zcash-tech/ironwood)  Àtúnṣe tí ó dá àgbájọ ti òde òní sílẹ̀
- [Òpó Ìrísí Iṣẹ́ Ọwọ́ Náà](/zcash-tech/the-turnstile)  Bí a ṣe ń ṣàyẹ̀wò iye tí ó máa ń ṣí kiri láàárín àwọn àgbájọ owó náà.
- [Àwọn àpamọ́ owó](/using-zcash/wallets)  Àwọn àpamọ́ owó wo ni a tọjú tí Ironwood sì ṣetán?
- [Àwọn Àdéhùn Ìṣirò](/using-zcash/transactions)  Bí a ṣe ń fi àwọn ìnáwó tí ó ní ààbò ránṣẹ́
- [Rírà ZEC](/using-zcash/buying-zec)  Gbígba ZEC kí o tó lò ó nínú àwọn àgbájọ.
- [ZK-SNARKs (ì í ì ë°©í °)](/zcash-tech/zk-snarks)  Ìpilẹ̀kọ́ ìdìbò àwọn àgbá tí a fi ọṣọ bojú
- [Kí ni ZEC àti Zcash?](/start-here/what-is-zec-and-zcash)  Ìtàn nípa ìpamọ́ Zcash
