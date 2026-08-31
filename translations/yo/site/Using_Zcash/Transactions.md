<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Transactions.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Àwọn Àdéhùn Ìṣirò

ZEC is a widely-used digital asset for payments, offering strong privacy features that make it suitable for various transactions like paying friends, making purchases, or donating. To maximize privacy and security, it is essential to understand how different types of transactions work within Zcash.

## TL;DR

- Zcash ṣe atilẹyin awọn iru iṣowo meji: **shielded**, eyiti o tọju alaye naa ni ikọkọ, ati **transparent**, ti o gba wọn silẹ gbangba.
- Àwọn àdírésì tí a fi ààbò bo bẹ̀rẹ̀ pẹlú: `u` or `z`. Àwọn àdírẹ́sì tí ó ṣe kedere bẹ̀rẹ̀ pẹ̀lú: `t` ó sì máa ń ṣe bíi àdírẹ́sì Bitcoin.
- Ìpínlẹ̀ ìpamọ́ jẹ àyè tí Zcash fún ọ, kìí ṣe ipò ti ẹlòmíràn pinnu rẹ.
- Yíyọ kúrò nínú ilé ìfowópamọ́ jẹ́ ibi tí àwọn ènìyàn ti máa ń pàdánù ààbò ara ẹni. Bí ilé-ìfowópárò bá ṣe atilẹyin fún ṣíṣípadà owó lọ ní ọ̀nà tó mọlẹ, dáàbò bo owó náà fúnra rẹ nígbàtí wọ́n dé.
- Àwọn owó tó ń tẹ̀ lé e. [ZIP 317 ìyẹn àwọn tó ń gbé nílùú](https://zips.z.cash/zip-0317) àwọn àpamọ́ owó tí wọ́n ṣì ń fi iye kan pàtó ránṣẹ́ lè rí i pé ìnáwó wọn máa pẹ̀yìn.
- Ọpọlọpọ awọn Zcash iṣowo ni o wa kan ipari giga labẹ [ZIP 203 ìyẹn àwọn tó ń gbé nílùú](https://zips.z.cash/zip-0203). If a transaction expires before it is mined, it cannot confirm after that expiry height and may need to be sent again.

## Àwọn Àdéhùn tí a fi ààbò bo

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/bZM3o_eIovU"
    title="Zcash Explained: Zcash Shielded Transactions"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    gba Àwòrán-ìwòyí ní kíkún (FullScreen)
    loading="lazy"
  />
</div>

---

Awọn iṣowo ti a fi pamọ waye nigbati o ba gbe ZEC sinu apamọwọ rẹ. Adirẹsi apamọwọ aabo rẹ bẹrẹ pẹlu kan `u` or `z`Nigbati o ba n firanṣẹ awọn iṣowo ti a fi pamọ, iwọ ati awọn eniyan ti o ṣe pẹlu rẹ le tọju ipele aṣiri ko ṣeeṣe lori awọn nẹtiwọọki isanwo gbangba nipasẹ aiyipada.

Sending a shielded transaction is easiest when you use a wallet that supports the current Zcash network and current shielded pools. Before relying on a wallet for privacy, check whether it supports shielded sending, shielded receiving, and the pool you plan to use. When withdrawing ZEC from an exchange, check whether the exchange supports shielded or transparent withdrawals. If it only supports transparent withdrawals, move the funds into a shielded-capable wallet after they arrive.

Lílo àwọn ìsòwò tí a fi ààbò bo láti rán àti gbà owó ni ọ̀nà tó dára jùlọ láti pa àṣírí mọ́ kí o sì dín ewu dída àkọsílẹ̀ ìdániléèwé kù.

## Àwọn Ìṣirò Tó Ṣeé Ṣàlàyé Ní gbangba-gbàǹgbà

Transparent transactions work similarly to Bitcoin transactions. Transaction details are publicly visible on the blockchain, including transparent addresses and transparent values. Transparent transactions should be avoided when privacy is a priority.

Transparent addresses are still useful in some situations, especially when an exchange or service does not support shielded addresses. If you receive ZEC to a transparent address, consider shielding it before making later payments.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/R-krX1UpsIg"
    title="Learn Zcash shielded wallets!"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    gba Àwòrán-ìwòyí ní kíkún (FullScreen)
    loading="lazy"
  />
</div>

## Ọ̀nà Rírẹwà Láti Mọ Bí Ìṣẹ̀lẹ̀ Náà Ṣe Máa Rí Lójú Ẹnì Kan

A transparent transaction is a postcard. The postman delivers it, but anyone who handles it along the way can read the message, see who sent it and see who receives it.

Àdéhùn tí a fi ààbò ṣe jẹ́ envelopu tó ti di ìdákọ́ńkó. Ẹ̀ka ìfìwéránṣẹ́ náà ṣì ń fìdí rẹ múlẹ̀ pé lẹ́tà gidi kan pẹ̀lú owó ẹrù ojúlówó kọjá nípasẹ̀ ètò, kò sì séèyàn kankan tó lè forí kọ ọ̀kan tàbí kó rán ìwé kan náà lọ léèmejì. Ohun tí ó wà nínú àpòòwé máa dúró láàárín ẹni tó bá firanṣẹ àti onítìgbà.

Ohun tó ṣe pàtàkì ni pé Zcash jẹ́ kó o pinnu èyí tí wàá fi ránṣẹ́, ìsanwó nípasẹ̀ owó.

## Awọn Owo-ori Zcash

Zcash kò lo àwọn ẹ̀ka gas tí ó jẹ́ ti Ethereum. Owó ìnájà Zcash ni a san ní ZEC, èyí tí wọ́n sábà máa ń díwọ̀n sí **zatoshis** . Ọkan nínú wọn dọgba pẹ̀lú 100,000,000 zatoshi.

[ZIP 317 ìyẹn àwọn tó ń gbé nílùú](https://zips.z.cash/zip-0317) defines a conventional fee mechanism that scales with transaction complexity. Instead of every transaction using the old 1,000-zatoshi flat fee, the conventional fee is based on "logical actions" such as inputs, outputs, and shielded actions. Simple transactions commonly start around 10,000 zatoshis, or 0.0001 ZEC, and more complex transactions can require more.

Ni ọpọlọpọ awọn apamọwọ lọwọlọwọ, awọn olumulo ko yẹ ki o nilo lati ṣe iṣiro owo-ori ZIP 317. Iwe ifowopamọ naa gbọdọ yan idiyele ti o baamu laifọwọyi. Ti apamọwọ kan tun nlo ọya pẹlẹpẹlẹ atijọ tabi jẹ ki o ṣeto iye to kere ju oṣuwọn aṣa ZIP 31, iṣowo le ni idaduro, deprioritized, silẹ nipasẹ diẹ ninu awọn akopọ, tabi kuna lati tan kaakiri igbẹkẹle .

## Ìṣòro-ìdáhùn fún àwọn Àdéhùn tí kò ṣe é mú ṣẹ (Transactions Stuck)

A Zcash transaction is not final just because it appears in your wallet. It becomes final for ordinary use after it is mined into a block and receives enough confirmations for your situation. Exchanges and services may require more confirmations than a wallet shows by default.

Lo igi ìpinnu yìí kí o tó tún ránṣẹ́:

1. **Ṣé àpò rẹ ńfi ID ìnáwó hàn?**
   - Bí bẹ́ẹ̀ kọ́, àpò-ìpamọ́ náà lè máà tíì dá tàbí gbé ìsòwò jáde. Ṣayẹwo ipò ìṣàmúlò kannáanran, asopọ intanẹẹti, ẹdà àpò owó, àti gbogbo ifiranṣẹ aṣiṣe àpò tí ó bá wà.
   - Ti o ba jẹ bẹẹni, daakọ ID idunadura ki o tẹsiwaju.
2. **Ṣé ìnáwó náà ti jẹ́wọ́ nínú àdìpọ̀?**
   - Tó bá rí bẹ́ẹ̀, dúró de iye ìmúṣẹ tí àpamọ́wọ́ rẹ, ilé iṣẹ́ pàṣípààrọ̀ owó tàbí oníṣòwò tó ń ṣe é fún ọ nílò.
   - Bí kò bá rí bẹ́ẹ̀, máa bá a lọ.
3. **Ṣé ìnáwó náà ti dé ibi tí ó yẹ kó parí sí?**
   - Bí bẹ́ẹ̀ kọ́, má ṣe fi ọwọ́ tún owó náà ránṣẹ́. Àdéhùn ìnájà àkọkọ lè jẹ́ kí ó fìdí múlẹ̀.
   - Bí bẹ́ẹ̀ ni, ìnáwó náà kò lè di ohun tí a ń lò lẹ́yìn ìgbà tó bá pé. Àpò rẹ le fi àmì sí i gẹ́gẹ́ bí èyí ti ó kọjá tàbí àṣìṣe, o sì lè ní láti dá ìṣòwò tuntun kan sílẹ̀.
4. **Ṣé ìnáwó náà fara hàn lórí ọ̀kan nínú àwọn sẹẹ́fù tàbí explorer ṣùgbọ́n kò sí ní òmíràn?**
   - Ṣe itọju eyi bi ọrọ wiwo nẹtiwọọki, kii ṣe ẹri pe idunadura kuna. Awọn akopọ oriṣiriṣi le ni awọn iwo mempool ti o yatọ.
   - Dúró, tún àpò rẹ ṣe tàbí kó o yí lọ sí orí ẹ̀rọ mìíràn tí a fọkàn tán bí àpò yín bá ti lè gbà á.
5. **Ṣé ìnáwó náà ti parẹ́ lẹ́yìn tí ó hàn bí ẹni pé a fọwọ́ sí i?**
   - Àtúntò ẹ̀ka tí ó kúrú lè mú ìsòwò kúrò ní ìgbà díẹ̀ nínú ẹ̀kínní tó dára jùlọ.
   - Duro fun awọn bulọọki diẹ sii. Ti o ba ti idunadura pada, tẹsiwaju duro de ifọwọsi. Ti ko ba pada ati nigbamii pari, ṣẹda iṣowo tuntun kan.
6. **Ṣé àpò náà ń béèrè pé kí o tún rán an?**
   - Tẹ̀lé ìtọ́ni tí wọ́n fún ọ lásìkò yìí, kó o tó ṣàyẹ̀wò bóyá owó òfo náà ti pé tàbí kò tíì ṣe é.
   - Bí o kò bá mọ̀, béèrè fún ìrànlọ́wọ́ kí o tó tún ránṣẹ́.

## Ó Ṣì Wà Láti Ṣe, Àkókò Rẹ̀ Ti Pé, Wọ́n Pa Á Mọ́, Wó̀n sì Tún Fi Í Sílẹ̀ Ní Bákan Náà

- **Pending** túmọ̀ sí pé a ti dá ìsòwò náà tàbí tí ó ń jáde ṣùgbọ́n kò tíì di ohun èlò ìdánilẹ́kọ̀ọ́.
- **Expired** túmọ̀ sí pé iye tí ìnáwó náà ti kọjá. Ní abẹ́ ZIP 203, owó ìdókòwò kan pẹ̀lú iye tó ń parí kò lè ṣe minin lẹ́yìn iye yẹn.
- **dropped** túmọ̀ sí pé òǹdè kan tàbí jù bẹ́ẹ̀ lọ kò ní tọjú ìsòwò náà mọ́ nínú mempool wọn. Èyí lè ṣẹlẹ̀ nítorí ìgbà tí ó ti kọjá, owó dídára, ìlànà mempool, ìwà àtúnṣe ìṣiṣẹ́, tabi ìyàtọ̀ relé .
- **Reorged** túmọ̀ sí pé ìdìpò tí ó ní ìṣàmúlò náà nínú tẹ́lẹ̀ kò jẹ́ apá kan àgbájọ tó dára jùlọ mọ́. Ìṣamúlẹ̀ náà lè tún ṣe minin padà nígbà mìíràn, tàbí kó pa dà di pending bí o bá ṣì wúlò.

## Ìgbà Tí Kò Yẹ Kó O Tún Fi Í Síta

Má ṣe ránṣẹ́ lẹsẹkẹsẹ nítorí pé ìnáwó kan ti wà ní ìdákẹ́lẹ̀, ó lọra tàbí kò sí nínú olùwádìí. Rántí pẹ́ jù lè fa àdàkàdekè àti wípé bí owó pópó bá ṣe ń kọ ọ̀nà tí wọ́n fi n san owo tuntun náà ni yóò mú kí o máa ná iye tó pọ̀ ju ẹyọ méjì lọ.

Dúró tàbí kó o gba ìrànlọ́wọ́ lákọ̀ọ́kọ́ nígbà tí:

- Àdéhùn ìsàmúlò náà ní ID ìdẹ́kùn, kò sì tíì pé.
- Àgbàlà kan fi hàn án nígbà tí òmíràn kò ṣe é.
- A ṣẹ̀ṣẹ̀ gbẹ́mìí mì, ṣùgbọ́n a kò rí ìmúdájú rẹ̀ mọ́ lẹ́yìn àtúntò tí ó ṣeé ṣe.
- Iṣẹ́ tí ó gba kò tíì parí dídán àwọn ìmúdájú.
- Àpò rẹ ṣì ń ṣe àdàkọ.

O jẹ igbagbogbo ailewu lati tun firanṣẹ nikan lẹhin ti apamọwọ naa ṣe ami kedere iṣowo bi o pari tabi kuna, tabi lẹhin atilẹyin idaniloju pe idunadura atilẹba ko le fọwọsi.

## Àwọn Ìwádìí Tó Ń Dáàbò Bo Àṣírí Ẹni

O le ṣayẹwo ipo iṣowo ipilẹ laisi fi alaye diẹ sii han ju ti o nilo lọ:

- Ṣayẹwo boya apo-owo rẹ ti ni ibamu patapata.
- Ṣayẹwo bóyá ohun èlò àpò-ìpamọ́ náà ti wà ní ipò.
- Ṣayẹwo boya idunadura naa ni ID ti o jẹ iṣowo.
- Ṣayẹwo boya idunadura naa jẹrisi, ti o duro de, pari tabi kuna.
- Ṣayẹwo gíga ìdìpò̀ tó wà nísinsìnyí kí o sì fi wé pẹlú ìgbésẹ̀ tí ó ti parí bí àpamọ́ rẹ bá ṣe hàn.
- Fun awọn iṣowo ti o ni imuṣiṣẹ, oluwadii bulọọki le fi idiwọ gbangba han, adirẹsi, iye ati idaniloju.
- Fun awọn iṣowo ti a fi pamọ, oluwadii bulọọki le fihan pe idunadura kan wa, ṣugbọn ko le ṣe afihan oluranlowo aabo, olugba, iye tabi alaye memo.

## Ohun Tí Kò Yẹ Kó O Sọ fún Èèyàn Kan Ní gbangba

Má ṣe gbé àwọn èyí jáde nínú ìjíròrò ní gbangba, àjọlò orí ayélujára tàbí ohun èèlò tó ń tọpinlẹ̀ àbájáde:

- Àkọlé tàbí àtúnṣe ọ̀rọ̀-ìmọ̀
- Àkópamọ́ kọ́kó̀ ìnáwó, kọ́kọ́rọ́ tàbí àpò owó.
- Àkọlé wíwo kíkún
- Àwòrán tí ó fi àlàfo hàn, àwọn àdírésì tó kún rẹ́rẹ́, ìwé ìránnilétí, kóòdì QR tàbí ìsọfúnni nípa àkọọ́lẹ̀ owó paṣipaarọ.
- Àwọn ìwé ìdánimọ̀ tàbí àkọsílẹ̀ ìmúbọ̀sára owó orí.

Àmì ìsàmúlò jẹ́ ti gbogbo ènìyàn lórí ẹ̀ka, ṣùgbọ́n ó ṣì lè so ìbéèrè àtìlẹyìn rẹ mọ́ ìdánimọ̀ rẹ. Bí àṣírí bá ṣe pàtàkì, pín in pẹlú ọ̀nà ìrànlọ́wọ́ tí o gbẹkẹlé nìkan.

## Ohun Tí Àwọn Ẹgbẹ́ Tó Ń Ṣèrànwọ́ Nílò

Nígbà tí o bá ń béèrè owó, àdàkọ tàbí ìrànlọ́wọ́ láti inú ẹ̀ka iṣẹ́-ìpèsè fún ìtìlẹyìn, pín kìkì àwọn ìsọfúnni tó wúlò díẹ̀:

- Orúkọ àpò tàbí orúkọ iṣẹ́-ìpèsè náà.
- Ẹya ohun elo ati ẹrọ ṣiṣe
- Boya idunadura naa ni a fi bo, ti o han gbangba tabi laarin awọn adirẹsi ti a ṣe iboju ati ṣiṣanwọle.
- Àmì ìsàmúlò, bí o bá ní ìtùnú láti pín in.
- Àkókò tí a ránṣẹ́ sí i tó fẹrẹẹ̀ jẹ́.
- Bóyá àpò-ìpamọ́ náà ti wà ní ìmúṣiṣẹ́pọ̀ pátápátá
- Àmì ìsòkò tí àpò náà fi hàn nísinsìnyí.
- Ìsọfúnni àṣìṣe gangan, pẹ̀lú ìpamọ́ àwọn data ìdánimọ̀.
- Àwòrán ojú-ìwòye pẹ̀lú ìsókè, àdírẹ́sì, àwọn àlàyé àti àkọọlẹ̀ tí a fi pamọ́ síbi tó yẹ.

Àwọn ẹgbẹ́ àtìlẹyìn kò nílò gbólóhùn ìkókó rẹ, kókó owó tí o ná, kọ̀ǹpútà tàbí kókó wíwo gbogbo.

## Àwọn Àṣìṣe Tó Máa Ń Ṣẹlẹ̀ Lóde Òní

- **Assuming that any wallet listing ZEC can send it privately.** A number of multi-coin wallets support the transparent side of Zcash only. Check the wallet's supported pools before you rely on it for privacy. The [Àwọn àpamọ́ owó](https://zechub.wiki/using-zcash/wallets) ojúewé yìí ṣe àkójọ àwọn nǹkan wọ̀nyí fún àyè kọ̀ọ̀kan.
- **Gbígba owó lọ sí adirẹsi tí ó ṣe kedere àti fífi àwọn ìnáwó náà sílẹ̀ níbẹ̀.** Gbigba owó fúnra rẹ̀ jẹ́ ti gbogbo ènìyàn, ati pé gbogbo ìgbésè láti orí àdírẹsì yẹn yóò wà ní gbangba pẹlú. Ṣójútó owó nígbàtí wọ́n bá débẹ̀.
- **Ṣíṣe ìpamọ́ bí ohun tí o fi sílò lẹ̀ẹ̀kan.** Ìṣirò kọ̀ọ̀kan jẹ ìpinnu tó yàtọ̀. Fífi ààbò ránṣẹ́ lónìí kò yí owó ọjà kan padà, èyí ti ẹ san lọ́sẹ̀ to kọjá.
- **Lílo adirẹsi tí ó ṣe kedere fún ohun gbogbo.** Nítorí pé iṣẹ́ tó ń jẹ́ kí nǹkan hàn gbangba wà ní wíwà títí, àdírẹ́sì kan ṣoṣo tá a tún lò máa ń so àwọn ìsanwó pọ̀ síra wọn díèdíẹ̀.
- ** Ifiranṣẹ pẹlu owo ti o wa tẹlẹ.** Awọn apamọwọ ti ko gba ZIP 317 le tun firanṣẹ awọn agbalagba iye owo, eyi ti o le fi idunadura silẹ ni ijoko.
- **Tí a bá tún ṣe kó tó pé.** Àdánwò tí ó wà ní ìdúró ṣì lè jẹ́rìí títí yóò fi dópin. Ṣayẹwo ipò ìgbà-ìparí kí o to dá owó mìíràn sílẹ̀.

## Àkíyèsí

Jọwọ ṣe akiyesi pe ọna ti o ni aabo julọ lati lo ZEC jẹ lilo awọn iṣowo ipamọ nigbakugba ti oluranlowo, olugba, apamọ ati iṣẹ gbogbo wọn atilẹyin fun wọn. Diẹ ninu awọn apo-iwọle ati paṣipaarọ n ṣakoso [àwọn àdírẹ́sì tó wà níṣọ̀kan](https://electriccoin.co/blog/unified-addresses-in-zcash-explained/#:~:text=The%20unified%20address%20(UA)%20is,within%20the%20broader%20Zcash%20ecosystem.), tí ó lè pa onírúurú oríṣi àwọn olùgba Zcash pọ̀ sínú adirẹsi kan.

## Àwọn Owó-ìṣúnná owó

- [ZIP 203: Ìmúṣẹ Àdéhùn Iṣẹ́-òwò náà.](https://zips.z.cash/zip-0203)
- [ZIP 317: Ètò Owó-ìṣírò Ìpínlẹ̀ Tó Wà Níwọ̀ntúnwọ́nsí](https://zips.z.cash/zip-0317)
- [Àwọn ZIPs tí ó jẹ́ ti owó-aje (Zcash)](https://zips.z.cash/)

## Àwọn ojúewé tó ní í ṣe pẹ̀lú rẹ̀

- [Àwọn àpamọ́ owó](/using-zcash/wallets) - àwọn pọ́ò̀sì wo ló ń ṣe ìfọwọ́sí fífi ààbò ránṣẹ́, tí wọ́n sì jẹ́ èyí tó ṣeé fi ojú rí nìkan;
- [Àwọn Erékùṣù Tó Ń Wà Níbi Ààbò](/using-zcash/shielded-pools) - Sapling àti Orchard, àwọn adágún tí owó rẹ ń gbé nínú wọn.
- [Àwọn ìwé ìrántí](/using-zcash/memos) - awọn ifiranṣẹ ti a fi pamọ ti o le rin irin ajo pẹlu iṣowo aabo kan.
- [Àwọn Àdúgbò Ìpàdé Tí Kò Léwu](/using-zcash/transparent-exchange-addresses) - Àwọn àdírẹ́sì TEX àti ìdí tí àwọn ilé-ìṣàmúlò fi ń lò wọ́n
- [Àwọn Àdánwò Ìdáàbòbò Ẹrù](/using-zcash/custodial-exchanges) - àwọn ilé-ìtajà wo ló ń ṣètìlẹyìn fún ìsínwó tí a fi ààbò bo?

## ZEC sí Olùyípadà ZAT
