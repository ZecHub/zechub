<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Lightwallet_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Àwọn Nódù Zcash Lightwallet

## TL;DR

* Ọpọlọpọ eniyan lo Zcash nipasẹ apamọwọ ina, eyi ti ko ṣe igbasilẹ gbogbo blockchain. Dipo, o ba olupin kan sọrọ ti o ti ṣe iṣẹ yẹn tẹlẹ.
* Awọn ẹya sọfitiwia meji lo awọn apamọwọ ina loni: ** lightwalletd, iṣẹ atilẹba ti a kọ ni Go, ati Zaino**, itọka tuntun kan ti a ṣe ni Rust.
* Àwọn kókó rẹ kò ní kúrò nínú ẹ̀rọ, àti pé àwọn sàràkò ò lè ná owó tàbí ka iye tí ó wà lábẹ́ ìsòwò tó ni ààbò.
* Ohun tí àwọn server ń rí kókó rẹ̀ nínú ni IP address àti àkókò ìgbòkègbodò ẹ  Àwọn ìnáwó tó ní ààbò máa n dáàbò bo ohun tó wà lórí blockchain, kì í ṣe asopọ yín sí servers.
* Tor yọ idamo IP kuro; o wa ninu awọn apamọwọ ti a ṣe lori rẹ. `zcash_client_backend`, ati ni ZODL o jẹ iṣeto ninu Awọn eto to ti ni ilọsiwaju.
* O le yi serveri ti apamọwọ rẹ nlo pada, tabi ṣiṣe tirẹ  lightwalletd ati Zaino jẹ orisun ṣiṣi.

## Àlàyé Ìpilẹ̀ṣẹ̀

Most people use Zcash through a light wallet, which does not download the whole blockchain. Instead, it talks to a server that has already done that work. This page explains what those servers are, what they can and cannot see about you, how to route your connection over Tor, and how to change the server your wallet uses.

Two pieces of software serve light wallets today. **lightwalletd** is the original service, written in Go. **Zaino** is a newer indexer written in Rust, built as part of the zcashd deprecation work.

### Ohun tí àpamọ́ owó kékeré ń ṣe

Olùpèsè àpò owó tí ó rọ̀rọ̀ ńgbé láàrin àpò rẹ àti Zcash blockchain, tó sì fún un ní ìran ti kò gba agbára láti lo òpó-ìkànnì náà. Ó ṣe nǹkan mẹ́ta fún ọ.

Dípò kí ó máa fi gbogbo àlàfo ránṣẹ́, ńṣe ló ń fi ìwé kékeré kan tí wọ́n kọ nǹkan tó yẹ kó wà nínú rẹ̀ ránṣẹ́ sí pópó láti lè mọ iye owó téèyàn bá san sórí àdírẹ́sì wọn. Ó tún lè mọ̀ bóyá àwọn èèyàn ti náwó lórí ẹyọ owó náà tàbí kò ṣe bẹ́ẹ̀, á sì sọ fún ẹni tó rí i pé òun lo owó yẹn.

Ó máa ń ṣe àtúnṣe àwọn ìnáwó rẹ. Nígbà tí o bá fi ránṣẹ́, pọ́ò̀lù ẹ á gbé owó náà lọ sí sẹẹfù tó ti parí rèé, èyí yóò sì tún sọ fún gbogbo ayélujára pé kí wọ́n wá rí i.

Ó ń dáhùn àwọn ìbéèrè tí ó wà ní ìsopọ̀, bíi bí o ṣe ga tó àti iye owó ti àpò rẹ nílò.

Àpò rẹ ṣì ń ṣe iṣẹ́ ìkọ̀ǹkò-ara ẹni ní àdúgbò. Ó máa ń gbé kókó ọ, ó máa ń tú àwọn ìwé kíkà láti wá àkọsílẹ̀ ẹ wò, àti pé yóò kọ ìṣòwò sí orí ẹrọ yín tí á sì fọwọ́ sí i lórí rèé.

### Ohun tí olùpèsè lè rí àti ohun tí kò le rí

Eyi ni apa ti o rọrun lati ṣe aṣiṣe. Awọn bọtini rẹ ko fi ẹrọ rẹ silẹ, ṣugbọn iyẹn kii ṣe kanna bi olupin naa ko kọ nkankan nipa rẹ.

Àkọlé tó wà níbí yìí ni: [Àpẹẹrẹ ìparun ohun elo àpò Zcash](https://zcash.readthedocs.io/en/latest/rtd_pages/wallet_threat_model.html), which is worth reading in full if you care about this. It sets out several kinds of adversary. The one that matters for this page is an adversary who can watch traffic between your wallet and the internet, and between the server and the internet. Whoever runs the server is inherently in part of that position, because your wallet connects to them directly.

Start with what is protected. Against every adversary in the model, including one who has compromised the server, it "can't learn any of the user's cryptographic key material (spending keys, viewing keys, seed phrase, etc.)", cannot steal your funds, and cannot make you send funds you did not intend to send. The amounts and memos inside fully shielded transactions stay encrypted.

Àwọn ohun tí a kò dáàbò bò ni àwọn nǹkan wọ̀nyí. Àpẹẹrẹ ìparun náà ṣe àkọsílẹ̀ wọn gẹ́gẹ́ bí àìlera tó mọ sí ọta-ìjàpá:

Àìlera. Báwo ni?
|:--|:--|
"Ẹni tó ń ṣe àtakò náà mọ àdírẹ́sì IP tí oníṣe rẹ̀, èyí lè mú kí wọ́n rí ẹni gidi onítọ̀hún".
Ó ń sọ ibi tí o wà ní ìlàlóye, ó sì ń wo IP rẹ nínú àpamọ́ ìṣàmúlò láti mọ ibì tó ti wá.
í sọ èyí àti ìgbà tí o rán tàbí gbà ìsòwò ààbò kan. "ìránṣẹ́ ńlo àmúṣọrán púpọ̀, tó hàn bí ó tilẹ̀ jẹ pé a ti fi àkọọ́lẹ̀ dídá asopọ náà". Àpẹẹrẹ yìí ṣàkíyèsí wípé ìgbésẹ̀ rírán àti gbígba ni ìránṣẹ́ fúnra rẹ̀ rí.
ìṣírò iye àwọn ìnáwó tí o ti ṣe ní àkókò kan. Ìwàláàyè àyè bákan náà, a rí i fún ìgbà pípẹ́ síi.
◯ Ṣíṣàmúlò àwọn ìlànà ìsanwó tó ń wáyé léraléra. ▪ Kíyè sí ìgbà tí ìgbésẹ̀ kan bá ṣẹlẹ̀.
◯ Ṣíṣayẹwo bóyá adirẹsi kan jẹ́ tìrẹ. Ẹnìkan tó bá mọ àdírẹsì náà "lè fi owó ránṣẹ́ sí i kó sì máa wò ó láti ríi bí àyè ìsọfúnni rẹ ṣe ń pọ̀ sí i" látinú pọ́ọ̀lù ẹ tí yóò mú un wá.

Awoṣe naa tun ṣe akiyesi pe ọran ti o wọpọ gba "ibasepo igbẹkẹle laarin olumulo ati oniṣẹ olupin lightwalletd".

nítorí náà, àlàyé tí ó ṣe kedere ni pé. àwọn ohun èlò ìpamọ́ owó kò lè náwó rẹ àti kó ka iye tàbí àkọsílẹ̀ nínú ètò ìdánwò ìṣójútó ẹ. èyí tó dára láti mọ ní íńtánẹ́ẹ̀tì yín (IP address) àti àkókò ìgbòkègbodò yín, nǹkan méjì yìí pa pọ̀ sì le sọ púpọ̀ nípa ẹnì kan. ìlànà ìdánwọlé ń dáàbò bo gbogbo ohun tó wà lórí kọǹpútà alágbèéká. wọn kì í fi ìbátan yín sí ìránṣẹ́ pamọ́ fúnra wọn. bí o bá rí i pé òótọ́ lohun táwọn èèyàn ti máa ń sọ fún ọ nígbà míì, kí ló dé? a tún wá gbé e yẹ wò báyìí: ṣé wàá fẹ́ káwọn oníṣòwò wọ̀nyí gba irú ìwé ìròyìn bẹ́ẹ̣ jáde láìjẹ́ pé ìwọ gan-an lòun

## Ìran / Àfiwé

Think of a public library that holds every newspaper ever printed. A full node is a reader who takes home the entire archive. A light wallet is a reader who asks the librarian for a daily digest instead — a thin sheet carrying just enough to spot whether anything concerns them.

Àkójọ náà ti di títì: olùtọ́jú ìwé á kó o jọ láì lè ka àwọn ohun tó ṣe pàtàkì sí ọ, ìwọ yóò sì ṣí i nílé pẹ̀lú kọǹpútà rẹ. Èyí ni àpamọ́ ìdìpọ̀ tí a fi ń ṣii rèé, àti wípé ìṣípayá-ẹ̀rọ lórí ẹ̀rọ rẹ ló wà fún ìdánwò.

ṣùgbọ́n olùkọ́ ìwé ṣì rí ẹni tó wọlé, ìgbà wo ni ó dé àti bí ìdìpọ̀ náà ṣe díjú tó. ìyẹn ni àdírésì IP àti àkókò tí a lè fi wò ọ láti orí àtẹ láìka bó ti dì dáadáa sí. tor dàbí kí o rán oníṣẹ́ kan lọ láìsí orúkọ: òṣìṣẹ́ ilé-ìwé ń fúnni ní ìdìpọ̀ kan náà, àmọ́ kò mọ ibi tí yóò máa tọ́ sí mó.

## Wọlé Lọ Jìnnà

### Ṣíṣe ìyípòsókè lórí Tor

Tor máa ń tú ìjápọ̀ tó wà láàárín IP address rẹ àti àpòòwò ẹrù, èyí tí ó mú ìdánimọ́ lílágbára jùlọ kúrò nínú tábìlì lókè.

Atilẹyin wa ninu awọn ile-ikawe Rust ti ọpọlọpọ awọn apamọwọ Zcash kọ lori. zcash_client_backend pẹlu modulu Tor kan ti a ṣe sori rẹ [Àwọn ẹ̀ka:](https://tpo.pages.torproject.net/core/arti/), ìmúṣẹ Rust ti Tor, kí apamọwọ lè darí àpapọ̀-ìṣàmúlò àti wíwo iye owó nípasẹ̀ Tor láì fi oníṣe Tor tó yàtọ̀ ránṣé́.

The Zaino developers make the same argument, citing the threat model directly: there is "a need to use anonymous transport protocols (such as Nym or Tor) to obfuscate clients' identities from Zcash's indexing servers".

Ni **ZODL**, Tor jẹ eto ninu Awọn Eto to ti ni ilọsiwaju. awọn apamọwọ ká Tu akọsilẹ itọkasi olumulo si ọwọ asopọ mode "plus enable Tor in Advanced Settings" bi wọn ba "fẹ lati din metadata ifihan", ati app nfunni lati tan lori Tọọ ṣaaju ki o to mu pada a apamọwọ , eyi ti o jẹ akoko kan titun IP yoo bibẹkọ ti wa ni so fun gbogbo apamọwọ itan .

Awọn ifitonileti meji. Tor fi IP rẹ pamọ lati ọdọ olupin, ṣugbọn ko yi ohun ti olupin naa kọ ẹkọ lati awọn ibeere ti o ṣe pada. Ati fifiranṣẹ alubosa n ṣafikun akoko idaduro, nitorinaa isọdọkan gba to gun ju bẹ lọ. Ṣiṣiṣẹ olupin tirẹ yago fun ibeere igbẹkẹle ni ọna miiran, nitori lẹhinna oniṣẹ jẹ iwọ.

### Zaino, olùṣàmúlò Ìdàrọ́jẹ̀

[Zaino (ìyẹn)](/zcash-tech/zaino) jẹ́ àtòjọ tí a kọ ní Rust láti ọwọ̀ ẹgbẹ Zingo, ti a ṣe lati rọpo lightwalletd gẹ́gẹ́ bí apá kan iṣẹ́ ìmúdi zcashd. Ó ń ṣiṣẹ́ fún àwọn oníṣe-òwò kékeré, àti olùwádìí àwárí ìdínà (block explorer), kíkà data ẹ̀ka tó wà lábẹ́ "yálà Zebra tàbí aláyẹsẹ Zcashd".

O ti wa ni labẹ idagbasoke lọwọlọwọ, pẹlu ẹya 0.8.0 tu silẹ ni Oṣu Kẹjọ ọdun 2026. o n ṣe ifọkansi lati duro pada ibaramu pẹlu lightwalletd nibiti o ba ṣeeṣe, nitorinaa awọn apamọwọ le tọka si rẹ laisi kikọ lẹẹkansii.

Zaino ní ojúewé tirẹ̀ pẹlú àwọn àwòrán ìṣẹ́ ọnà, nítorí náà ojúewè yìí nìkan ni ó bo ipa rẹ gẹ́gẹ́ bí olùpèsè àpò owó tí kò lágbára.

### Wàá máa dá bójú tó ara rẹ.

Aṣayan ti o lagbara julọ ni lati jẹ oniṣẹ tirẹ, eyiti o yọ ibeere igbẹkẹle kuro patapata. Awọn olupin mejeeji wa orisun ṣiṣi: [lightwalletd ì í ë ¤ì 'ë¦¬í ¬](https://github.com/zcash/lightwalletd) ní Go àti [Zaino (ìyẹn)](https://github.com/zingolabs/zaino) Ni Rust. Mejeeji ka lati kan ni kikun validator, ki o yoo tun fẹ [Zebra](/zcash-tech/zebra-full-node).

## Àwọn Ohun Tó Lè Yọrí sí Lóòótọ́

### Àtòjọ àwọn sẹẹfù

Àwọn ohun tó ń ṣẹlẹ̀: [hosh.zec.rocks (ìyẹn àwọn òkúta)](https://hosh.zec.rocks/zec) dashboard ń tọpinpin àwọn ààrò gbogbo ènìyàn àti ìlera wọn, ó sì jẹ́ ibi láti ṣayẹwo ohun tí o wà nídìí rẹ̀. [status.zec.rocks (ì í ì ë§)](https://status.zec.rocks/) ó fi ipò iṣẹ́ hàn.

Àwọn àkànṣe ìsọfúnni tí ó wà nínú àkọsílẹ̀ náà ní àkókò ti a kọ ọ́:

Àgbàlá. Àwọn àkọsílẹ̀.
|:--|:--|
Àwọn àgbègbè tí ó wà ní ìhà ọ̀tún rẹ̀ ni a ṣe àkọsílẹ̀ lẹ́gbẹ̀ẹ́ rèé: na.zec.rocks, eu.zec .rocks , ap.zec rocks àti sa.zec Rocks
zec-node.cakewallet.com:443 ní ìkápá Cake Wallet's domain, tí ó wà lórí àkànṣe rẹ̀:
 zec.0xrpc.io:443 0xRPC ló ń ṣètò rẹ̀, ó sì máa ń fún àwọn ẹrù ìlépa ní àyè ọ̀fẹ́ tí kò sí owó lórí wọn àti pé wọ́n á fẹ́ kí gbogbo èèyàn wá fi ọrẹ ṣe é láti lè lo agbára tó wà nínú ẹ̀rọ náà.
| zaino.unsafe.zec.rocks:443 | A Zaino instance. Note the hostname, treat it as experimental |
testnet.zec.rocks:443 Testnet, pẹlu ohun ti Zaino testnet ṣe akojọ ni zaino.testnet.unsafe.zec . rocks

Ṣayẹwo ibi ìsọfúnni dípò kí o fọkàn tán ìwé àkọsílẹ̀ yìí. Àwọn oníṣẹ́ ń wá, àwọn sì máa lọ, ojúewé bíi èyí á sì di arúgbó.

### Yíyípòsò sí àwọn ààrọ̀ nínú apamọwọ rẹ

Worth doing if you want to pick an operator you trust, spread activity across operators, or point at your own.

Àwọn ojúewé ìtòlẹ́sẹẹsẹ nísàlè yìí tọ̀nà nígbà tí a ṣe àtúnṣe sí ojúewè, ṣùgbọ́n àwọn agbójútó apamọwọ ń ṣí lọ. Nítorí náà wo wọn gẹ́gẹ́ bí ìmọ̀ràn dípò ọ̀nà tó tòótọ́. Wá fún Àyípadà Ìpèsè tàbí yíyàn aṣàmúlò-ìránisẹ́ kan.

#### ZODL (ì í ì ë ¤)

ZODL tun nfunni ni ọna asopọ olupin Switch nigbati ikuna isọdọkan ba ṣẹlẹ nitori pe olupin ti kọja ọjọ.

#### Ywallet

Ìlànà tó wà ní igun òkè ọ̀tún, àti ìlà Zcash.

![Ywallet server settings](/content-images/b0a2910b-dbdf-4292-8e69-af5a386aa183-f51f098d19.webp)

#### Zingo

Àtòjọ hamburger ní igun òsì òkè, lẹ́yìn náà Àwọn àyípadà, lẹ́yìn náà lọ sí ìsàlẹ̀.

![Zingo server settings](/content-images/ea8f7672-e644-41a5-a422-db131740404a-2626f5fa79.webp)

#### Èdè ìbílẹ̀: eZcash

Àtòjọ hamburger ní igun òsì òkè, lẹ́yìn náà Ìṣètò, lẹ́yìn náà Gíga.

![eZcash server settings](/content-images/655c0172-61a0-4322-b8cf-4eee4bb53b51-0b93df2e71.webp)

Àwọn àwòrán náà ni wọ́n ya ní March 2025, àwọn ohun èlò sì ti fi àtúnṣe ránṣẹ́ látìgbà yẹn, nítorí náà ìpéè lè yí padà.

## Àwọn Àṣìṣe Tó Máa Ń Ṣẹlẹ̀ Lóde Òní

**rírò pé àwọn ààrán lè ka ìsàmúlò rẹ**. Kò le ṣe bẹ́ẹ̀ o. Àwọn kókó ọ̀rọ̀ yín wà lórí ẹ̀rọ, àti iye owó àtàwọn ìwé ìrántí inú ètò ìdásílẹ̀ tí ó ní dídíjú pátápátá ń jẹ́ kí wọ́n pa mọ́  kódà lòdì sí alátakò tó ti fi ohun èlò náà pamọ́.

**Ka "ìpamọ́" gẹ́gẹ́ bíi "isopọ̀ tí a kò mọ orúkọ rẹ**. àwọn ìnáwó ààbò ń dáàbò bo ohun tó wà nínú ẹyọ-àkọsílẹ̀ náà IP adirẹsi yín àti àkókò ìgbésè yín jẹ́ òdìkejì, ète yìí gan an ni sàrù rí.

**Ti o ba ro pe Tor yọ gbogbo ami**. Tor fi IP rẹ pamọ lati ọdọ olupin, ṣugbọn ko yi ohun ti olupin naa kọ ẹkọ lati awọn ibeere ti o ṣe pada, ati pe o ṣafikun akoko idaduro si isopọmọ.

**Gbígbé orúkọ àwọn sàrù lórí ojúewé wiki kan kalẹ̀** Àwọn oníṣẹ́ ń wá, wọ́n sì ń lọ. Ṣayẹwo [hosh.zec.rocks (ìyẹn àwọn òkúta)](https://hosh.zec.rocks/zec) fún ohun tó ń lọ ní tòótọ́ kí o to fi àpò rẹ sí ohunkóhun.

## Àkópọ̀ rèé:

Light wallets give you the shielded pool without the disk space, which is a good trade. Just be clear about what you are trading. The server cannot take your funds or read your shielded amounts, but it is well placed to see your IP address and when you transact. Route over Tor, choose your operator deliberately, or run your own.

## Àwọn ojúewé tó ní í ṣe pẹ̀lú rẹ̀

- [Àwọn wo ló lè rí owó tí o bá san lórí Zcash?](/start-here/who-can-see-your-zcash-payment)  ojú ìwòye tí àwọn tó ṣẹ̀ṣẹ̀ ń kópa nínú ìdánwò náà fi wo ìbéèrè kan náà.
- [Ohun Tí Ẹni Tó Ń Ṣàyẹ̀wò Àlàfo Lè Rí](/zcash-tech/what-a-block-explorer-can-see)  ohun ti o han lori-agbelebu, bi idakeji si ni olupin.
- [Zaino (ìyẹn)](/zcash-tech/zaino)  awọn aworan apẹrẹ ati ipa ti o gbooro sii ti olutọpa Rust.
- [Zebra Ìkànnì Pípéye](/zcash-tech/zebra-full-node)  Olùmúṣẹ tí àwọn àkáǹtì owó-ìpamọ́ ń kà láti inú rẹ̀.
- [Ìṣètò Ọ̀rọ̀-ìpamọ́ Zcash Wallet](/zcash-tech/zcash-wallet-syncing)  bí àwọn ìdìpọ̀ tí a ṣe ní àpapọ̀ ti séréfò ránṣẹ́ ni wó n gbà láti inú pópó rẹ.

** Àtúnṣe ìkẹyìn:** August 2026
