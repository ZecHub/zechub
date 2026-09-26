<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Sprout.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Sprout

> Zcash ti ṣe ifilọlẹ ni Oṣu Kẹwa Ọjọ 28, Ọdun 2016, pẹlu adagun-odo Sprout.

Ohun tí ẹ ó mú lọ: Sprout ni ibi ti Zcash bẹ̀rẹ̀, ìgbà àkọ́kọ́ táwọn owó tó ṣeé ṣètẹríba àti èyí tí kò ní àdáni ń ṣiṣẹ lórí ìsọ̀ǹpútà alágbèéká.

Sprout ni awọn atilẹba ifilole ti Zcash nẹtiwọki, ko kan nigbamii [àtúnṣe síra ẹ̀rọ](../start-here/network-upgrades)O lọ laaye ni ibere ti ipilẹṣẹ lori Oṣu Kẹwa Ọjọ 28, Ọdun 2016. Ko si nọmba ZIP ṣe apejuwe Sprout: ilana ZIP bẹrẹ nigbamii pẹlu Overwinter, nitorinaa a ṣalaye Sprout nipasẹ Aṣayan Ilana Zcash atilẹba ati ikole Zerocash eyiti o kọ. Awọn ohun elo naa jẹ awọn ẹya ara ẹrọ pataki fun lilo Bitcoin (BTC) bi wọn ṣe nlo lati lo owo-ori kan tabi diẹ sii ninu akọọlẹ rẹ. [Electric Coin Company](../zcash-organizations/electric-coin-company) (then the Zerocoin Electric Coin Company), led by Zooko Wilcox, built and shipped it. Sprout introduced the first practical zk-SNARK shielded transactions and the original shielded pool, so people could send ZEC with the sender, receiver, and amount hidden while the network still checked that the balances added up. The name signaled a young, budding chain that the team expected to grow.

Why this matters. Every public blockchain before Sprout put your payments on display: anyone could see who paid whom and how much. Sprout was the first live, permissionless network to hide those details and still prove no one was cheating. That matters for ordinary financial privacy, the kind you expect from cash or a bank statement no one else can read. It also proved that strong on-chain privacy could work in practice, beyond a paper design. The trusted-setup Ceremony that made it possible became a reference point for later cryptography work, and the slow, memory-heavy proving system Sprout shipped with is exactly what pushed the team to build Sapling two years later.

## Ewéko ìgbafẹ́ tí a fi ààbò ṣe àkọ́kọ́

Sprout dá oríṣi adirẹsi méjì. àwọn àdírẹ́sì tí ó ṣe kedere (t-addresses) ṣiṣẹ bí Bitcoin, pẹ̀lú ìsọfúnni tó hàn nínú ìwé àkọsílẹ̀ gbogbo ènìyàn. àwọn ìdáríjì àdíréìsì (z-adddresses) rán owó sínú Sprout [adágún tí a fi ọ̀pá ìdáàbòbò ṣe](../using-zcash/shielded-pools), nibi ti oluranlowo, olugba, ati iye naa wa ni pamọ. Ẹtan jẹ [àwọn zk-SNARKs](../zcash-tech/zk-snarks), èrí ìmọ-nǹkan tí ó jẹ́ kí ìsòwò kan fi hàn pé o léwu, láìsí owó méjì àti àlàfo tó ń pọ̀ sí i láìfi èyíkéyìí nínú àwọn kúlẹ̀kúlẹ̀ náà han. Sprout ni ìgbà àkọ́kọ́ tí èyí máa ṣiṣẹ nídìí iṣẹ́ lórí ẹyọ owó onídìgbòlù gidi.

![Transparent transactions expose sender, receiver, and amount, while Sprout shielded transactions hide all three yet stay verifiable](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/sprout-shielded-vs-transparent.png)

## Àjọṣe Ìgbéyàwó Náà

The zk-SNARKs in Sprout needed a set of public parameters, and generating them safely required a one-time setup called the Ceremony. Six participants in separate, distant locations each generated a secret piece, called toxic waste. If anyone ever reassembled all the pieces, they could forge ZEC out of nothing. The design turned that risk into a simple rule: as long as at least one participant destroyed their piece, the full secret could never be rebuilt, so counterfeiting stayed impossible. The participants who have been named publicly include Zooko Wilcox, Andrew Miller, Peter Van Valkenburgh, Peter Todd, and Derek Hinch of NCC Group. One participant chose to stay anonymous.

![The Ceremony: six participants generate private shards, then destroy the toxic waste, leaving only the public Sprout parameters](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/sprout-ceremony-flow.png)

## Orílẹ̀-èdè tí wọ́n ti wá ni.

Sprout is the baseline that every later change builds on. When the network-upgrade mechanism arrived with Overwinter, it labeled the original rules as consensus branch id 0, which simply means no upgrade has been applied yet. Everything since then (Overwinter, Sapling, Blossom, Heartwood, Canopy, NU5, NU6, and onward) sits on the chain Sprout started. The launch was announced in August 2016 for an October 28 genesis, the Ceremony ran in the weeks before, and the genesis block's hardcoded timestamp reads October 28, 2016, at 07:56 UTC.

![Timeline from the August 2016 announcement through the parameter Ceremony to the October 28, 2016 Sprout launch](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/sprout-timeline.png)

## Àkójọ àwọn ọ̀rọ̀

| Àkókò ìgba | Ìtumọ̀ Gẹ̀ẹ́sì lásán |
|---|---|
| zk-SNARK | Ẹ̀rí àìmọ̀ tí ó fi hàn pé ìṣòwò kan wúlò láìsí fífi olùránṣẹ́, olùgbà, tàbí iye tí ó fi hàn |
| Shielded pool | Apá ìkọ̀kọ̀ ti Zcash níbi tí a ti fi owó àti àwọn ayẹyẹ pamọ́ sí. Adágún Sprout ni àkọ́kọ́ |
| z-address and t-address | Àdírẹ́sì z ni a fi ààbò bo, àwọn àkọsílẹ̀ náà sì jẹ́ àṣírí. Àdírẹ́sì t náà ṣe kedere, ó sì fi àwọn àlàyé hàn lórí ledger gbogbogbòò |
| The Ceremony | Ètò ẹgbẹ́ olókìkí ti ọdún 2016 tí ó mú àwọn ìlànà gbogbogbòò Sprout's jáde, lẹ́yìn náà ó kó àwọn ìdọ̀tí olóró náà kúrò |
| Toxic waste | Àwọn kókó pàtàkì láti inú ayẹyẹ náà tí a ní láti parun kí a má baà lè ṣe àgbélébùú ZEC |
| Consensus branch id 0 | Àmì fún àwọn òfin Sprout's, tí ó túmọ̀ sí ìpìlẹ̀ ṣáájú àtúnṣe nẹ́tíwọ́ọ̀kì èyíkéyìí |

## Àwọn ìbéèrè tí a sábà máa ń béèrè

ṣé ọ̀rọ̀ náà "sprout" yí ZEC mi tàbí ìpamọ́ra mi padà lónìí? rárá. ìtàn ni Sprout, ìdásílẹ̀ tó bẹ̀rẹ̀ ẹ̀ka tí àwọn ohun èlò ìṣàmúlò rẹ ń gbé lórí wọn. owó-ìṣírà àti àṣírí ara ẹni yín lóde òní dá lórí àpò pẹpẹ àti pólù aláàbò tí ẹ fi nlo nísinsìnyí, kì í ṣe ohunkóhun tí ó yẹ kí ẹ se nípa Sprout. bí o bá ti rí i pé kò sí nǹkan kan pàtó láti ṣe fún un báyìí, a lè sọ wípé òun ló mú kó ṣeé ṣe fún wa láti máa lo irú ètò yìí títí di àkókò tá a wà nínú ayé tuntun.

Why is there no ZIP number for Sprout? The ZIP process began later, with the Overwinter upgrade. Sprout is the original launch, described by the Zcash Protocol Specification and the Zerocash construction it was based on. ZIP 200 only mentions Sprout in hindsight, as consensus branch id 0, the baseline before any upgrade.

ṣé ó yẹ kí n gbẹ́kẹ̀lé àwọn mẹ́fà tó wà nínú ayẹyẹ náà? a ṣe ètò yìí láti jẹ́ pé ẹnìkan ṣoṣo ló máa sọ òtítọ́. olúkúlùkù wọn ní ohun ìkọ̀kọ̀ kan, tí ẹni kan bá sì pa èyí tiwọn run, kò sí bí wọ́n á ṣe tún gbogbo àṣírí yẹn kọ àti ẹnikẹ́ni ò lè fi ZEC ṣẹ́gun. márùn-ún lára àwọn olùkópa ni orúkọ wọn fara hàn fún gbogbo ènìyàn nígbà tí ọ̀kan kì í dárúkọ rẹ̀ rárá.

Ṣé adágún Sprout ni àpò owó mi ń lò báyìí? Ó ṣeé ṣe kí ó máà rí bẹ́ẹ̀. Sprout ni adágún owó àkọ́kọ́ tí a fi ààbò pamọ́, ṣùgbọ́n àwọn àtúnṣe tó tẹ̀lé e bíi Sapling ṣe àgbékalẹ̀ àwòrán tí ó yára kánkán, àti pé ọ̀pọ̀lọpọ̀ àwọn adágún owó ló ń lo àwọn adágún tuntun lónìí. Sprout ṣì ṣe pàtàkì nítorí iṣẹ́ tí ó fi hàn pé àwọn ìṣòwò àdáni, tí a lè fìdí rẹ̀ múlẹ̀ lè ṣiṣẹ́ lórí nẹ́tíwọ́ọ̀kì aláàyè.

What made Sprout different from Bitcoin? Bitcoin puts every payment on a public ledger where amounts and addresses are visible. Sprout added shielded transactions that hide the sender, receiver, and amount while still letting the network confirm the transaction is valid. It kept transparent addresses too, so both styles live on the same chain.

## Wádìí òye rẹ wò

Sprout ni a maa n pe ni igbesoke eto-iṣẹ pẹlu giga ifilọlẹ. Kí ló dé tí èyí kò fi tọ́?

<details>
<summary>Answer</summary>

Sprout ni ipilẹṣẹ akọkọ ti Zcash, kii ṣe igbesoke nigbamii. O ti n ṣiṣẹ lati igba ibere ibilẹ (ibudo 0) ni Oṣu Kẹwa Ọjọ 28, ọdun 2016, nitorinaa ko si giga ifilọlẹ lati tọka si. Ẹrọ imudarasi nẹtiwọki wa lẹhinna o pe awọn ofin Sprout bi id iyasọtọ ajọṣepọ 0, ila-aaye ṣaaju eyikeyi igbesokuro .
</details>

### Àwọn Owó-ìṣúnná owó

[ZIP 200: Ètò Àtúnṣe Ìpínlẹ̀-Ìlú](https://zips.z.cash/zip-0200)

[Àtúnṣe sí àwọn ẹ̀rọ Zcash](https://z.cash/upgrade/)

[Electric Coin Company: Ìfilọlẹ Zcash Sprout](https://electriccoin.co/blog/zcash-sprout-launch/)

[Electric Coin Company: The Design of the Ceremony](https://electriccoin.co/blog/the-design-of-the-ceremony/)

### Ẹ tún wo:

[Àwọn Erékùṣù Tó Ń Wà Níbi Ààbò](../using-zcash/shielded-pools)

[àwọn ohun èlò tí wọ́n ń pè ní zk-SNARKS](../zcash-tech/zk-snarks)

[Àwọn Àtúnṣe sí Ìpínlẹ̀ Zcash](../start-here/network-upgrades)

[Kí ni ZEC àti Zcash?](../start-here/what-is-zec-and-zcash)

[Electric Coin Company](../zcash-organizations/electric-coin-company)

---

Àtòjọ: [Atọka Awọn igbesoke Nẹtiwọki](../start-here/network-upgrades) · Àtúnṣe: [Overwinter](../zcash-tech/overwinter)
