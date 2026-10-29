<a href="https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/GrapheneOS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Graphene OS

## TL;DR

- **GrapheneOS** jẹ́ ètò ìṣiṣẹ́ fóònù alágbéka tí kìí ṣe èrè, tí ó ṣí sílẹ̀ tí ó dojúkọ ìpamọ́ àti ààbò, pẹ̀lú ìbáramu pípé pẹ̀lú àwọn ohun èlò Android ojoojúmọ́
- Àwọn agbára pàtàkì: àpótí àpò ìfọ̀rọ̀wérọ̀ tó le koko, kódì tó ní ààbò ìrántí àti àwọn ìdínkù tó ń lo agbára, bata tó ní àtìlẹ́yìn ẹ̀rọ, àwọn àṣẹ tó ní ìpele tó dára, àti ààbò ibudo USB-C nígbà tí ẹ̀rọ náà bá ti pa
- Fifi sori ẹrọ wa nipasẹ olufisi ẹrọ **WebUSB** osise (a ṣeduro fun ọpọlọpọ awọn olumulo) tabi **ila aṣẹ-ila** fun awọn olumulo imọ-ẹrọ
- Fún olùlò Zcash, ó jẹ́ ìpìlẹ̀ tó lágbára fún ìtọ́jú ara ẹni lórí fóònù: so ó pọ̀ mọ́ àpò ìpamọ́ tí a tọ́jú àti ìmọ́tótó OPSEC déédéé

GrapheneOS jẹ́ iṣẹ́ àkànṣe tí kìí ṣe ti èrè, tí ó ṣí sílẹ̀ tí a yà sọ́tọ̀ láti mú kí ìpamọ́ àti ààbò pọ̀ sí i lórí àwọn ẹ̀rọ alágbèéká nígbàtí a ń pa ìbáramu mọ́ pẹ̀lú àwọn ohun èlò Android. Ètò ìṣiṣẹ́ yìí gbé àfiyèsí gíga sí ìlọsíwájú nínú ìmọ̀ ẹ̀rọ ìpamọ́ àti ààbò, pẹ̀lú àfiyèsí pàtàkì lórí fífún àpótí sandboxing lágbára, lílo àwọn ìdènà, àti àtúnṣe àwòṣe àṣẹ. A bí i ní ọdún 2014 lábẹ́ orúkọ náà **CopperheadOS**, láti ìgbà náà ni ó ti di olùtọ́jú ìpamọ́ àti ààbò oní-nọ́ńbà rẹ tí ó lágbára.

Ète pàtàkì GrapheneOS ni láti mú kí àwọn ààlà ààbò, bíi àpótí ìṣàfilọ́lẹ̀ náà lágbára sí i, láìsí ìpalára búburú lórí ìrírí olùlò. 

GrapheneOS le ṣe agbekalẹ awọn toggles oriṣiriṣi fun awọn ẹya kan pato, gẹgẹbi awọn igbanilaaye Nẹtiwọọki, awọn igbanilaaye Sensọ, tabi awọn ihamọ nigbati ẹrọ naa ba wa ni titiipa (bo awọn apakan bii awọn ẹya ara ẹrọ USB, iwọle kamẹra, ati awọn tiles iyara). Ni afikun, awọn ẹya ikọkọ ati aabo ti o nira julọ ti olumulo koju ni a ṣe apẹrẹ pẹlu ironu lati ṣetọju iriri ti o rọrun lati lo, ọkọọkan pẹlu awọn imudara wiwo olumulo tirẹ.

## **Awọn ẹya ara ẹrọ ti GrapheneOS**

**Ìmúdàgba Ààbò** GrapheneOS ní àwọn àfikún ààbò tó pọ̀, bíi àwọn èdè ètò ìṣiṣẹ́ tó ní ààbò ìrántí àti àwọn ẹ̀yà ààbò tó dá lórí àkójọpọ̀ láti dín àwọn àìlera tó wọ́pọ̀ kù.

**Ṣíṣe Sandboxing** Ó ń mú kí iṣẹ́ sandboxing app lágbára láti ya àwọn app sọ́tọ̀ kúrò lọ́dọ̀ ara wọn, ó sì ń dín àwọn ohun tó lè fa ìkọlù kù.

**Bọ́ọ̀tì tí a ti fìdí rẹ̀ múlẹ̀** GrapheneOS ń lo àwọn kọ́kọ́rọ́ tí a fi ẹ̀rọ ṣe àti ìlànà ìbọ́ọ̀tì tí a lè fìdí rẹ̀ múlẹ̀ láti rí i dájú pé ètò ìṣiṣẹ́ náà jẹ́ èyí tí ó péye.

**Àwọn Ìyọ̀nda Tí A Mú Dára Jù** Ó ń pèsè ìṣàkóso tí ó dára jù lórí àwọn ìyọ̀nda àpù, èyí tí ó ń jẹ́ kí àwọn olùlò ṣàtúnṣe àti ṣàkóso ohun tí àwọn àpù dátà lè wọlé sí.

**Páásítì Ìpamọ́** Àwọn olùlò lè ṣe àbójútó àti ṣàkóso ìwà àpù nípasẹ̀ páásítì ìpamọ́, èyí tí yóò mú kí wọ́n mọ̀ nípa lílo dátà.

**Àwọn Ìmúdàgbàsókè Ààbò Tí A Gbé Kalẹ̀** GrapheneOS ń fúnni ní àwọn àmúdàgbàsókè ààbò ní àkókò tó yẹ, ó sì ń rí i dájú pé àwọn olùlò ní ààbò tuntun lòdì sí àwọn àìlera.

**Ìfipamọ́ tó lágbára** Ó ń lo ìfipamọ́ díìsìkì gbogbo-nínú nípa àìyípadà, ó sì ń dáàbò bo dátà tó wà lórí ẹ̀rọ náà.

**Ààbò Ẹ̀rọ Aṣàwárí Tí Ó Dára Jù** A ṣètò ẹ̀rọ aṣàwárí àìyípadà fún ààbò tí ó pọ̀ sí i, pẹ̀lú ààbò lòdì sí títẹ̀lé.

**Àwọn Ohun Èlò Tí A Ti Fi Sílẹ̀ Kéré Jùlọ** GrapheneOS wá pẹ̀lú àwọn ohun èlò tí a ti fi sílẹ̀ díẹ̀, èyí tí ó ń dín ewu ààbò àti ìpamọ́ kù.

**Ààbò Ibudo Ibudo Odi USB** Ó ń pèsè ààbò lòdì sí wíwọlé láìgbàṣẹ sí ẹ̀rọ náà nípasẹ̀ àwọn ibudo USB nígbà tí ẹ̀rọ náà bá wà ní títìpa.

**Ààbò Àwọn Ààbò Àwọn Àìlera** GrapheneOS ní àwọn ẹ̀yà ara láti ṣàwárí àti láti dènà àwọn àṣìlò tí a mọ̀.

**A dojukọ ìpamọ́** A ṣe apẹrẹ OS naa pẹlu ifojusi pataki lori aṣiri olumulo, ni idinku gbigba data ati ifihan.

**Orísun Ṣíṣí** Iṣẹ́ àgbékalẹ̀ orísun ṣíṣí ni, èyí tó ń jẹ́ kí àṣírí àti àfikún àwùjọ sunwọ̀n síi láti mú ààbò sunwọ̀n síi.

**Àwọn Ìlànà Ààbò Tó Ṣeé Ṣe Àtúnṣe** Àwọn olùlò ní agbára láti ṣe àtúnṣe onírúurú ìlànà ààbò láti bá àwọn ohun tí wọ́n fẹ́ mu.

**Ìbáramu** GrapheneOS ń gbìyànjú láti pa ìbáramu mọ́ àwọn ohun èlò Android, kí àwọn olùlò lè máa lo àwọn ohun èlò ayanfẹ wọn nígbà tí wọ́n ń jàǹfààní láti inú àwọn ààbò àti àwọn ẹ̀yà ara ìpamọ́ tí a ti mú sunwọ̀n síi.

## **Fifi sori ẹrọ GrapheneOS**

Gẹ́gẹ́ bí a ti sọ ní apá ìṣe tó dára jùlọ, a gbani nímọ̀ràn láti lo ìwé ìtọ́nisọ́nà ìfisẹ́lé tí a dámọ̀ràn. Ọ̀nà méjì ló wà láti fi GrapheneOS sílẹ̀, èyí tí a lè lò láti fi [Olùfi sori ẹrọ WebUSB-based](https://grapheneos.org/install/web) tabi lo awọn [itọsọna fifi sori ẹrọ laini aṣẹ](https://grapheneos.org/install/cli)

**Fifi sori ẹrọ ti o da lori USB lori ayelujara** Lati fi GrapheneOS sori ẹrọ nipa lilo ọna fifi sori ẹrọ lori ayelujara, iwọ yoo nilo awọn ohun elo ati awọn orisun wọnyi nigbagbogbo:

- 2GB ti iranti ọfẹ ati 32GB ti aaye ibi ipamọ ọfẹ.
- Okùn USB (A tabi C)
- Ẹ̀rọ Ìṣiṣẹ́ Tí A Ṣe Àtìlẹ́yìn: Windows 10, Windows 11, macOS Big Sur (11-13), Arch Linux, Debian (10-12), Ubuntu (22.04, 22.10 àti 23.04), ChromeOS, GrapheneOS, Google Android (ilé ìpamọ́ Pixel OS)
- Àwọn ẹ̀rọ alágbékalẹ̀ tí a ṣe àtìlẹ́yìn: Chromium (kò sí lábẹ́ àtìlẹ́yìn Ubuntu), Vanadium (GrapheneOS), Google Chrome, Microsoft Edge, Brave Browser.

Ṣayẹwo Itọsọna fifi sori ẹrọ nipasẹ ọna asopọ ni isalẹ ki o tẹle ilana fifi sori ẹrọ

[Ìtọ́sọ́nà fún Olùfisẹ́lé Wẹ́ẹ̀bù GrapheneOS](https://grapheneos.org/install/web#prerequisites)

**Fifi sori ẹrọ laini aṣẹ** A ko ṣeduro fifi sori ẹrọ laini aṣẹ fun awọn olumulo ti ko ni itọsọna imọ-ẹrọ ati pe awọn irinṣẹ ati awọn orisun isalẹ nilo fun Fifi sori ẹrọ laini aṣẹ;

- O yẹ ki o ni o kere ju 2GB ti iranti ọfẹ ati 32GB ti aaye ibi ipamọ ọfẹ
- Okùn USB (A tabi C)
- Ẹ̀rọ Ìṣiṣẹ́ Tí A Tẹ́wọ́gbà Windows 10 Windows 11 macOS Big Sur (11) macOS Monterey (12) macOS Ventura (13) Arch Linux Debian 10 (buster) Debian 11 (bullseye) Debian 12 (bookworm) Ubuntu 20.04 LTS Ubuntu 22.04 LTS Ubuntu 22.10 Ubuntu 23.04
- Olùfi sori ẹrọ wẹẹbu lati Android, ChromeOS tabi GrapheneOS

Ṣayẹwo Itọsọna fifi sori ẹrọ nipasẹ ọna asopọ ni isalẹ ki o tẹle ilana fifi sori ẹrọ 

[Fifi sori ẹrọ laini aṣẹ](https://grapheneos.org/install/cli#prerequisites)

## **Àwọn Ìlànà Tó Dáa Jùlọ**

**Jẹ́ kí OS náà máa wà ní ìgbà tuntun** Máa ṣe àtúnṣe GrapheneOS déédéé láti rí i dájú pé o ní àwọn àtúnṣe ààbò tuntun àti àwọn àtúnṣe.

**Lo Awọn Ọrọigbaniwọle to lagbara** Ṣeto awọn ọrọ igbaniwọle to lagbara, alailẹgbẹ fun fifi ẹnọ kọ nkan ẹrọ ati iwọle app lati dena iwọle laigba aṣẹ.

**Ìyọ̀nda Ohun èlò** Ṣe àtúnyẹ̀wò àti ṣàkóso àwọn àṣẹ ohun èlò pẹ̀lú ìṣọ́ra, kí o sì fún wọn ní ohun tí ó yẹ kí ohun èlò kọ̀ọ̀kan ṣiṣẹ́ nìkan.

**Awọn afẹyinti deede** Ṣe afẹyinti deede ti data rẹ ti o ba sọnu ẹrọ tabi ibajẹ data.

**Àkójọ ìpamọ́** Tí a kò bá ṣiṣẹ́ nípa àìyípadà, fi àkójọ ìpamọ́ ẹ̀rọ rẹ pamọ́ láti dáàbò bo dátà rẹ tí ẹ̀rọ náà bá sọnù tàbí tí a jí i.

**Ibojú Títìpa Ààbò** Lo ibojú títìpa ààbò, bíi PIN, ọ̀rọ̀ìpamọ́, tàbí ìfọwọ́sowọ́pọ̀ bíẹ́kítírìkì, láti dènà wíwọlé láìgbàṣẹ.

**Yẹra fún lílo ẹ̀rọ Android rẹ** Yẹra fún lílo bootloader tàbí ṣíṣí bootloader náà, nítorí èyí lè dín ààbò ẹ̀rọ náà kù.

**Ṣàyẹ̀wò Àwọn Orísun Ohun Èlò** Ṣàyẹ̀wò òótọ́ àwọn ohun èlò àti àwọn orísun wọn láti yẹra fún fífi software búburú sílẹ̀.

**Fi ẹ̀rọ lilọ kiri ayelujara ti o dojukọ asiri sori ẹrọ** Ronu nipa lilo ẹ̀rọ lilọ kiri ayelujara ti o dojukọ asiri gẹgẹbi Brave browser, Firefox tabi Bromite fun lilọ kiri ayelujara ti o ni aabo.

**Ṣe àyẹ̀wò àwọn ohun èlò déédéé** Ṣe àtúnyẹ̀wò àti yọ àwọn ohun èlò tí o kò lò tàbí gbẹ́kẹ̀lé mọ́ kúrò láti dín ojú ìkọlù kù.

**Mu Ijẹrisi-Okunfa Meji (2FA) ṣiṣẹ** Mu 2FA ṣiṣẹ fun awọn akọọlẹ ori ayelujara rẹ lati ṣafikun ipele aabo afikun.

**Yẹra fún Wi-Fi Gbogbogbò** Ṣọ́ra nígbà tí o bá ń sopọ̀ mọ́ àwọn nẹ́tíwọ́ọ̀kì Wi-Fi gbogbogbò, nítorí pé wọ́n lè má ní ààbò tó pọ̀. Lo VPN nígbà tí ó bá yẹ.

**Ṣọ́ra pẹ̀lú Dátà Ibùdó** Dín ìtọ́pinpin ibi tí àwọn àpù ń lò kù kí o sì ronú nípa lílo ohun èlò ìtanràn ibi tí o bá mọyì ìpamọ́.

**Yẹra fún Àwọn Ìsopọ̀ àti Àwọn Àfikún Àìmọ̀** Ṣọ́ra fún àwọn ìjápọ̀ tí a kò béèrè fún àti àwọn àfikún ìmeeli, nítorí wọ́n lè jẹ́ ìgbìyànjú ìfiranṣẹ́ tàbí malware.

**Ṣe àtúnyẹ̀wò Àwọn Ètò Àìyípadà** Ṣàtúnyẹ̀wò kí o sì ṣàtúnṣe àwọn Ètò Àìyípadà láti bá àwọn ìfẹ́ ọkàn ìpamọ́ rẹ mu.

**Àtìlẹ́yìn Àwùjọ** Ṣe àjọṣepọ̀ pẹ̀lú àwùjọ GrapheneOS àti àwọn ibi ìpàdé fún àwọn ìmọ̀ràn, àwọn ìròyìn tuntun, àti ìmọ̀ràn ààbò. O lè kàn sí ẹgbẹ́ náà kí o sì máa tẹ̀síwájú láti ní ìròyìn tuntun [Nibi](https://grapheneos.org/contact) láti ṣe àwárí àwọn ìbáṣepọ̀ míràn.

**Lo Ọ̀nà Ìfisílẹ̀ Olóṣèlú** GrapheneOS ní ọ̀nà ìfisílẹ̀ méjì tí ìjọba fọwọ́ sí. Àwọn olùlò lè yan olùfisílẹ̀ WebUSB-based, èyí tí a gbà nímọ̀ràn fún ọ̀pọ̀lọpọ̀ ènìyàn, tàbí wọ́n lè tẹ̀lé ìtọ́nisọ́nà ìfisílẹ̀ àṣẹ, tí a ṣe fún àwọn olùlò tí ó ní ìfẹ́ sí ìmọ̀ ẹ̀rọ.

## **Ìparí**

Ní ṣókí, GrapheneOS fẹ́ láti pèsè ètò ìṣiṣẹ́ alágbéka mìíràn tí ó ṣe pàtàkì sí ìpamọ́ àti ààbò àwọn olùlò rẹ̀, tí ó fún wọn ní ìṣàkóso tó ga jù lórí ìgbésí ayé oní-nọ́ńbà wọn nígbà tí ó ń fún wọn ní ìbáramu pẹ̀lú àwọn àpù tí wọ́n gbẹ́kẹ̀lé. Ó jẹ́ iṣẹ́ àgbékalẹ̀ kan tí ó ń gbìyànjú láti gbé ìlànà gíga kalẹ̀ fún ààbò àti ìpamọ́ ẹ̀rọ alágbéka ní àkókò tí àwọn àníyàn wọ̀nyí jẹ́ pàtàkì jùlọ.

## Àwọn ojú ìwé tó jọra

- [Àwọn Ońṣẹ́ Ààbò](Secure_Messengers.md) — ibaraẹnisọrọ ikọkọ lori ẹrọ ti o nira
- [Ìfipamọ́ PGP](PGP_Encryption.md) — mail ti paroko ati paṣipaarọ faili
- [VPN ati DVPN](VPN_and_DVPN.md) — ìpamọ́ ìpele nẹtiwọọki lórí alagbeka
- [Àwọn ẹ̀rọ aṣàwákiri wẹ́ẹ̀bù](Web_Browsers.md) — yiyan ati lile ẹrọ lilọ kiri ayelujara alagbeka kan
