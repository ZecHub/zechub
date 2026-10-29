<a href="https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/Tor_and_I2P.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Kwa Nini Faragha Ni Muhimu

## TL;DR

- **Tor** huelekeza trafiki yako kupitia rela tatu na inafanya kazi kwa huduma za kawaida za wavuti na onion — leo ni chaguo-msingi linalofaa kwa kuficha utambulisho wa miunganisho ya pochi na kuvinjari
- **I2P** ni mtandao wa kufunika wa rika-kwa-rika uliosimbwa kwa njia fiche kikamilifu ulioundwa kwa ajili ya huduma zake za ndani; **hakuna nodi ya sasa Zcash inayozungumza I2P ya asili**
- **Kwenye simu:** tumia pochi ya Zcash kupitia Tor kwa mibofyo michache ukitumia Orbot ("Tor ")
- **Kuendesha nodi Zcash juu ya Tor haiwezekani kwa sasa:** `zcashd` ilifikia mwisho wa usaidizi mnamo 18 Julai 2026, na kipengele cha Tor Zebra's bado kimezimwa juu ya mkondo
- Tor huficha *ulipo*, si *unachofanya kwenye mnyororo* — miamala ya uwazi hubaki hadharani

Katika enzi ya kidijitali, kulinda [faragha](https://www.privacyguides.org/en/) imekuwa muhimu zaidi. Ingawa wengine wanaweza kuona faragha kama sababu iliyopotea, sivyo ilivyo. Faragha yako iko hatarini na inapaswa kuwa jambo la kuhoji. Faragha ina thamani kubwa inapohusiana na mamlaka, na kuhakikisha kwamba mamlaka yanatumiwa kwa uwajibikaji ni muhimu.

## Teknolojia Tor na I2P

## Tor

[Tor](https://www.privacyguides.org/en/tor/?h=tor) ni zana ya proksi inayotumia mtandao Tor kuanzisha miunganisho ya programu. Tor inafanikisha hili kwa kuelekeza trafiki yao kupitia Tor, hivyo kuboresha [faragha na kutokujulikana](https://www.torproject.org/) kwa ajili ya matumizi haya.

## Mtandao wa I2P

Mtandao wa I2P, unaojulikana pia kama [Mradi wa Intaneti Usioonekana](https://geti2p.net/en/about/intro), ni mtandao uliosimbwa kwa njia fiche kabisa wa rika-kwa-rika. Unahakikisha kwamba maudhui, chanzo, na mwisho wa ujumbe umefichwa kutoka kwa waangalizi. Kwa maneno mengine, hakuna mtu anayeweza kuona asili au mwisho wa trafiki au maudhui halisi ya ujumbe unaotumwa. Usimbaji fiche unaotumika katika I2P unahakikisha kiwango cha juu cha faragha na kutokujulikana kwa watumiaji wake.

### Kusakinisha I2P

Kuna utekelezaji mbili. Asili [Java I2P](https://geti2p.net/en/download) inaendeshwa kwenye Windows, macOS, Linux na Android. [i2pd](https://i2pd.website/), iliyoandikwa kwa C++, ni nyepesi na ni chaguo la kawaida kwenye seva au mashine yenye nguvu ndogo.

Mara tu inapoanza kufanya kazi, I2P huonyesha kiweko cha ndani `127.0.0.1:7657` na proksi zimewashwa `127.0.0.1:4444` (HTTP) na `127.0.0.1:4447` (SOKSI). Tarajia itachukua dakika kadhaa mwanzoni: I2P lazima ijenge handaki kupitia mtandao kabla ya kitu chochote kufanya kazi, na inakuwa haraka kadri inavyokaa mtandaoni kwa muda mrefu.

### Kutumia I2P na Zcash

Fahamu kwamba **hakuna nodi Zcash ya sasa inayozungumza I2P asilia.** Zebra haina usaidizi wa I2P, na pia zcashd. Ukiona mwongozo unaodai kuendesha nodi Zcash juu ya I2P, unaelezea kitu ambacho programu haifanyi.

Kile ambacho I2P ina manufaa yake hapa ni kila kitu kinachohusu pochi: kufikia tovuti, jukwaa au huduma bila kufichua anwani yako. Kwa kutokutambulisha muunganisho wa pochi yenyewe, Tor ndiyo chaguo linalofaa leo, na sehemu zilizo hapa chini zinaishughulikia.

## Tor na I2P zina sifa zinazofanana lakini pia zina tofauti kubwa. 

Tor na I2P zote mbili ni mitandao ya rika-kwa-rika isiyo na majina na isiyojulikana, lakini I2P hutoa viwango vya juu vya usalama ikilinganishwa na Tor. Hata hivyo, I2P imeundwa kimsingi kwa ajili ya kufikia huduma kama vile barua pepe, gumzo, na mtiririko ndani ya mtandao wake na haiwezi kutumika kufikia intaneti ya kawaida. Kwa upande mwingine, Tor inaruhusu watumiaji kufikia mtandao wa kina, kama vile I2P, lakini pia inafanya kazi kama kivinjari cha kawaida cha kufikia tovuti kwenye mtandao wa juu.

*Kumbuka: Kwa maelezo zaidi kuhusu kufanana na tofauti za Tor na I2P tembelea [hapa](https://geti2p.net/en/comparison/tor)*

## Kuelekeza pochi ya simu kupitia Tor kwa kutumia Orbot

Orbot ni mtandao pepe wa kibinafsi (VPN) usio na gharama ulioundwa kwa ajili ya simu mahiri unaoongoza trafiki kutoka kwa programu zote kwenye kifaa chako kupitia mtandao Tor.

Fuata maagizo haya ili kuelekeza pochi Zcash kupitia Tor. Kumbuka kwamba YWallet, ambayo matoleo ya awali ya mwongozo huu yalitumia, haitumiki tena na haitafuata mtandao baada ya Ironwood, kwa hivyo chagua pochi inayodumishwa kutoka [Pochi](/using-zcash/wallets) ukurasa.

1.  Pakua na usakinishe *Orbot* kutoka duka la programu.

2.  Baada ya usakinishaji, ujumbe wa salamu utaonekana. Endelea hadi ukurasa wa nyumbani *Orbot* na ubofye *'Tor '.* 

3. Hii itaonyesha ukurasa kwenye skrini unaoonyesha programu Tor-compatible. Tafuta pochi yako ya Zcash kwenye orodha na uhakikishe kuwa imechaguliwa.

4. Ombi la muunganisho la kuanzisha VPN litaonekana, ambalo litaruhusu *Orbot* kufuatilia trafiki ya mtandao. *Orbot* itaanzisha mara tu ruhusa hii itakapoidhinishwa. 

5. Angalia upau wa kazi au ukurasa wa nyumbani Orbot ili kuthibitisha kwamba Tor inafanya kazi, hii inathibitishwa unapoona 'Imeunganishwa kwenye mtandao Tor '.

*Kumbuka: Ikiwa Tor imezuiwa na mtandao wako wa simu, unaweza kutumia Seva ya Bridge kama njia mbadala ya kuunganisha.*


## Kusakinisha Tor kwenye PC au desktop

* Kivinjari cha Tor kinaweza kupakuliwa kutoka kwa tovuti rasmi, unaweza kufikia kiungo [hapa](https://download.torproject.org/).

 Njia rahisi zaidi ya kusakinisha Tor ni kupitia Kifurushi cha Kivinjari cha Tor. Ukipendelea usakinishaji usio na kichwa, unaweza kuchagua kusakinisha daemon Tor kando. 

*Kumbuka: Kwa chaguo-msingi, kifurushi cha Tor Browser huonyesha msikilizaji wa SOCKS kwenye tcp/9150 na daemon Tor huonyesha msikilizaji wa SOCKS kwenye tcp/9050.*

* Rejelea usakinishaji [maelekezo](https://support.torproject.org/little-t-tor/getting-started/installing/) maalum kwa mfumo wako wa uendeshaji kama ilivyotolewa na Tor Project.

## Kuendesha nodi juu ya Tor

Hii ndiyo sehemu ambayo imebadilika zaidi, na jibu la kweli ni kwamba kwa sasa ni ngumu zaidi kuliko ilivyokuwa.

**zcashd imetoweka.** Ilifikia mwisho wa usaidizi na ikasimama tarehe 18 Julai 2026 katika kizuizi nambari 3,417,100. Haitaanza tena, ukurasa wake wa kupakua unarudisha 404, na hazina ya apt haitumiki tena. Maagizo yoyote yanayokuambia uendelee `zcashd -proxy=127.0.0.1:9050` haitumiki tena kwa chochote.

**Zebra pia haiwezi kufanya hivyo bado.** Zebra ni nodi inayodumishwa, na kreti yake ya mtandao ina msimbo wa muunganisho wa pekee kwa Tor, lakini kipengele hicho kimetolewa maoni katika `zebra-network/Cargo.toml`:

```
# tor = ["arti-client", "tor-rtcompat"]
```

Nyaraka za kreti zinasema jambo lile lile waziwazi: *"Tor kwa sasa imezimwa hadi `arti-client`utegemezi wa `x25519-dalek v1.2.0` imesasishwa."* The `connect_isolated_tor` Kitendakazi kinatolewa maoni pamoja nacho. Kwa hivyo hakuna njia inayoungwa mkono ya kuendesha nodi Zcash juu ya Tor leo.

Ikiwa unahitaji kutokujulikana kwa kiwango cha nodi sasa, mbinu inayofaa ni kuweka mashine nzima nyuma ya Tor au VPN katika kiwango cha mfumo endeshi badala ya kusanidi nodi yenyewe. Hiyo inalinda eneo la mtandao wako bila kutegemea vipengele vya nodi ambavyo havijajengwa.

### Unachoweza kufanya leo bado

- **Tumia pochi yako kupitia Tor** ukitumia Orbot kwenye simu, kama ilivyoelezwa hapo juu. Hii ndiyo chaguo linalofaa kwa watu wengi, na huficha IP yako kutoka kwa seva ya lightwalletd ambayo pochi yako inazungumza nayo
- **Tumia Tor Browser** kwa wachunguzi wa block, majukwaa na kitu kingine chochote ambapo hungependa kuunganishwa kwa anwani
- **Kumbuka kile ambacho Tor haifichi.** Huficha eneo la mtandao wako, si shughuli zako kwenye mnyororo. Kutuma kutoka kwa anwani iliyo wazi bado ni kwa umma, na uvukaji wa thamani kati ya mabwawa yaliyolindwa bado huchapisha kiasi hicho. Tazama [Mabwawa ya Kuogelea Yenye Ngao](/using-zcash/shielded-pools) kwa kile kinachobaki kuonekana

## Kurasa zinazohusiana

- [VPN na DVPN](VPN_and_DVPN.md) — Njia mbadala za VPN na jinsi zinavyolinganishwa
- [Vivinjari vya Wavuti](Web_Browsers.md) — ugumu wa kivinjari kwa faragha ya kila siku
- [Wajumbe Salama](Secure_Messengers.md) — zana za mawasiliano ya kibinafsi
- [Kile Kivinjari cha Block Anaweza Kuona](../Zcash_Tech/What_a_Block_Explorer_Can_See.md) — faragha yako ya kiwango cha nodi hufanya nini na hailindi nini
- [Mabwawa ya Kuogelea Yenye Ngao](/using-zcash/shielded-pools) — kinachoendelea kuonekana kwenye mnyororo hata kwa kutokujulikana kwa safu ya mtandao
