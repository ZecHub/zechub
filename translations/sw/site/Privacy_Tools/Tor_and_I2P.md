<a href="https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/Tor_and_I2P.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Kwa Nini Faragha Ni Muhimu

## Kwa Ufupi

- **Tor** huelekeza trafiki yako kupitia relaya tatu na hufanya kazi kwa wavuti wa kawaida na huduma za onion — leo hii ndiyo chaguo la vitendo kwa kuficha utambulisho wa miunganisho ya pochi na kuvinjari
- **I2P** ni mtandao wa juu wa rika-kwa-rika uliosimbwa fiche kikamilifu, ulioundwa kwa ajili ya huduma zake za ndani; **hakuna node ya sasa ya Zcash inayozungumza I2P kiasili**
- **Kwenye simu ya mkononi:** Elekeza pochi ya Zcash kupitia Tor kwa miguso michache ukitumia Orbot (“Programu Zilizowezeshwa za Tor”)
- **Kuendesha node ya Zcash kupitia Tor hakuwezekani kwa sasa:** `zcashd` ilifikia mwisho wa usaidizi tarehe 18 Julai 2026, na kipengele cha Tor cha Zebra bado kimezimwa kwenye chanzo kikuu
- Tor huficha *mahali ulipo*, si *unachofanya on-chain* — miamala ya uwazi [transparent transactions] hubaki ya umma

Katika enzi ya kidijitali, kulinda [faragha](https://www.privacyguides.org/en/) yako [privacy] kumekuwa muhimu zaidi. Ingawa wengine wanaweza kuona faragha kama jambo lililopotea, sivyo ilivyo. Faragha yako iko hatarini na inapaswa kukuhusu. Faragha ina thamani kubwa kwa kuwa inahusiana na mamlaka, na ni muhimu kuhakikisha mamlaka hayo yanatumiwa kwa uwajibikaji.

## Teknolojia za Tor & I2P

## Tor

[Tor](https://www.privacyguides.org/en/tor/?h=tor) ni kifaa cha proksi kinachotumia mtandao wa Tor kuanzisha miunganisho kwa programu. Tor hutimiza hili kwa kuelekeza trafiki yake kupitia Tor, hivyo kuimarisha [faragha na kutotambulika](https://www.torproject.org/) kwa programu hizi.

## Mtandao wa I2P

Mtandao wa I2P, unaojulikana pia kama [Mradi wa Mtandao Usioonekana](https://geti2p.net/en/about/intro), ni mtandao wa juu wa rika-kwa-rika uliosimbwa fiche kikamilifu. Unahakikisha kwamba maudhui, chanzo na lengwa la ujumbe vinafichwa dhidi ya waangalizi. Kwa maneno mengine, hakuna anayeweza kuona asili au lengwa la trafiki, wala maudhui halisi ya ujumbe unaotumwa. Usimbaji fiche unaotumiwa katika I2P huhakikisha kiwango cha juu cha faragha na kutotambulika kwa watumiaji wake.

### Kusakinisha I2P

Kuna utekelezaji miwili. [Java I2P](https://geti2p.net/en/download) asilia hufanya kazi kwenye Windows, macOS, Linux na Android. [i2pd](https://i2pd.website/), iliyoandikwa kwa C++, ni nyepesi zaidi na ndiyo chaguo la kawaida kwenye seva au mashine yenye uwezo mdogo.

Baada ya kuanza kufanya kazi, I2P hutoa dashibodi ya ndani kwenye `127.0.0.1:7657` na proksi kwenye `127.0.0.1:4444` (HTTP) na `127.0.0.1:4447` (SOCKS). Tarajia kuchukua dakika kadhaa inapowashwa kwa mara ya kwanza: I2P lazima ijenge handaki kupitia mtandao kabla ya jambo lolote kufanya kazi, na huwa haraka zaidi kadiri inavyoendelea kuwa mtandaoni.

### Kutumia I2P na Zcash

Fahamu kwamba **hakuna node ya sasa ya Zcash inayozungumza I2P kiasili.** Zebra haina usaidizi wa I2P, na wala zcashd haikuwa nao. Ukiona mwongozo unaodai kuendesha node ya Zcash kupitia I2P, unaelezea jambo ambalo programu hiyo haifanyi.

Kile ambacho I2P ni muhimu nacho kwa kweli hapa ni kila kitu kinachozunguka pochi: kufikia tovuti, jukwaa au huduma bila kufichua anwani yako. Kwa kuficha utambulisho wa muunganisho wa pochi yenyewe, Tor ndiyo chaguo la vitendo leo, na sehemu zilizo hapa chini zinalielezea.

## Tor na I2P zina vipengele vya pamoja lakini pia zina tofauti kubwa. 

Zote mbili, Tor na I2P, ni mitandao ya rika-kwa-rika iliyogatuliwa na isiyotambulisha watumiaji, lakini I2P hutoa viwango vya juu zaidi vya usalama ikilinganishwa na Tor. Hata hivyo, I2P imeundwa hasa kwa kufikia huduma kama barua pepe, gumzo na upakuaji wa torrent ndani ya mtandao wake na haiwezi kutumiwa kufikia intaneti ya kawaida. Kwa upande mwingine, Tor huwaruhusu watumiaji kufikia deep web, kama I2P, lakini pia hufanya kazi kama kivinjari cha kawaida cha kufikia tovuti kwenye surface web.

*Dokezo: Kwa maelezo zaidi kuhusu ufanano na tofauti za Tor & I2P, tembelea [hapa](https://geti2p.net/en/comparison/tor)*

## Kuelekeza pochi ya simu ya mkononi kupitia Tor ukitumia Orbot

Orbot ni mtandao pepe wa kibinafsi (VPN) wa bure ulioundwa kwa simu janja, unaoelekeza trafiki kutoka programu zote kwenye kifaa chako kupitia mtandao wa Tor.

Fuata maelekezo haya ili kuelekeza pochi ya Zcash kupitia Tor. Fahamu kwamba YWallet, ambayo matoleo ya awali ya mwongozo huu yalitumia, haitunzwe tena na haitafuata mtandao baada ya Ironwood, kwa hiyo chagua pochi inayotunzwa kutoka ukurasa wa [Pochi](/using-zcash/wallets).

1.  Pakua na usakinishe *Orbot* kutoka kwenye duka la programu.

2.  Baada ya usakinishaji, ujumbe wa salamu utaonekana. Endelea hadi ukurasa mkuu wa *Orbot* na ubofye *“Programu Zilizowezeshwa za Tor”.*              

3. Hii itafungua ukurasa kwenye skrini unaoonyesha programu zinazooana na Tor. Tafuta pochi yako ya Zcash kwenye orodha na uhakikishe imechaguliwa.

4. Ombi la muunganisho la kusanidi VPN litaonekana, litakaloruhusu *Orbot* kufuatilia trafiki ya mtandao. *Orbot* itaanzishwa baada ya ruhusa hii kuidhinishwa. 

5. Angalia upau wa kazi au ukurasa mkuu wa Orbot ili kuthibitisha kwamba Tor inafanya kazi; hili linathibitishwa unapoona “Imeunganishwa kwenye mtandao wa Tor”.

*Dokezo: Ikiwa Tor imezuiwa na mtandao wako wa simu, unaweza kutumia Seva ya Daraja kama njia mbadala ya kuunganisha.*


## Kusakinisha Tor kwenye PC au kompyuta ya mezani

* Kivinjari cha Tor kinaweza kupakuliwa kutoka tovuti rasmi; unaweza kufikia kiungo [hapa](https://download.torproject.org/).

 Njia rahisi zaidi ya kusakinisha Tor ni kupitia Kifurushi cha Kivinjari cha Tor. Ukipendelea usakinishaji usio na kiolesura, unaweza kuchagua kusakinisha daemoni ya Tor kando. 

*Dokezo: Kwa chaguo-msingi, kifurushi cha Kivinjari cha Tor hutoa msikilizaji wa SOCKS kwenye tcp/9150 na daemoni ya Tor hutoa msikilizaji wa SOCKS kwenye tcp/9050.*

* Rejelea maelekezo ya [usakinishaji](https://support.torproject.org/little-t-tor/getting-started/installing/) mahususi kwa mfumo wako wa uendeshaji kama yanavyotolewa na Mradi wa Tor.

## Kuendesha node kupitia Tor

Hii ndiyo sehemu iliyobadilika zaidi, na jibu la kweli ni kwamba kwa sasa ni gumu zaidi kuliko lilivyokuwa.

**zcashd haipo tena.** Ilifikia mwisho wa usaidizi na kusimama tarehe 18 Julai 2026 kwenye block 3,417,100. Haitaanza upya, ukurasa wake wa kupakua hurejesha 404, na hazina ya apt haitolewi tena. Maelekezo yoyote yanayokuambia uendeshe `zcashd -proxy=127.0.0.1:9050` hayatumiki tena kwa jambo lolote.

**Zebra haiwezi kufanya hivyo bado pia.** Zebra ndiyo node inayotunzwa, na crate yake ya mtandao ina msimbo wa miunganisho iliyotengwa kwa Tor, lakini kipengele hiki kimewekewa maoni katika `zebra-network/Cargo.toml`:

```
# tor = ["arti-client", "tor-rtcompat"]
```

Nyaraka za crate zinasema jambo lilelile kwa uwazi: *“Miunganisho ya Tor imezimwa kwa sasa hadi utegemezi wa `arti-client` wa `x25519-dalek v1.2.0` usasishwe.”* Kitendakazi cha `connect_isolated_tor` pia kimewekewa maoni pamoja nacho. Kwa hiyo, hakuna njia inayoungwa mkono ya kuendesha node ya Zcash kupitia Tor leo.

Ukihitaji kutotambulika katika kiwango cha node sasa, mbinu inayofanya kazi ni kuweka mashine nzima nyuma ya Tor au VPN katika kiwango cha mfumo wa uendeshaji, badala ya kusanidi node yenyewe. Hilo hulinda eneo lako la mtandao bila kutegemea vipengele vya node ambavyo havijajengwa.

### Unachoweza bado kufanya leo

- **Elekeza pochi yako kupitia Tor** ukitumia Orbot kwenye simu ya mkononi, kama ilivyoelezwa hapo juu. Hili ndilo chaguo la vitendo kwa watu wengi, na huficha IP yako kutoka kwa seva ya lightwalletd ambayo pochi yako huzungumza nayo
- **Tumia Kivinjari cha Tor** kwa vichunguzi vya block, majukwaa na kitu kingine chochote ambacho hungependa kuhusishwa nacho kwa anwani
- **Kumbuka kile ambacho Tor haifichi.** Huficha utambulisho wa eneo lako la mtandao, si shughuli zako za on-chain. Kutuma kutoka anwani ya uwazi bado ni kwa umma, na thamani inayovuka kati ya mabwawa ya faragha bado huchapisha kiasi hicho. Tazama [Mabwawa ya Faragha](/using-zcash/shielded-pools) ili kujua kinachobaki kuonekana

## Kurasa zinazohusiana

- [VPN na DVPN](VPN_and_DVPN.md) — Mbadala wa VPN na jinsi zinavyolinganishwa
- [Vivinjari vya Wavuti](Web_Browsers.md) — Uimarishaji wa kivinjari kwa faragha ya kila siku
- [Wajumbe Salama](Secure_Messengers.md) — Vifaa vya mawasiliano ya faragha
- [Kile Kichunguzi cha Block Kinaweza Kuona](../Zcash_Tech/What_a_Block_Explorer_Can_See.md) — Kile ambacho faragha yako ya kiwango cha node inalinda na kisicholinda
- [Mabwawa ya Faragha](/using-zcash/shielded-pools) — Kile kinachobaki kuonekana on-chain hata kwa kutotambulika kwa kiwango cha mtandao
