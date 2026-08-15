<a href="https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/Tor_and_I2P.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Kwa Nini Ni Muhimu Kuweka Faragha Yako Yenyewe Hasa?

Katika enzi ya digital, kulinda yako [faragha](https://www.privacyguides.org/en/) Wakati baadhi ya watu wanaweza kuona faragha kama sababu waliopotea, si hivyo. Faragha yako ni hatarini na lazima kuwa wasiwasi. Faradhi ana thamani kubwa kwa vile inahusiana na nguvu, na kuhakikisha kwamba mamlaka inatumiwa wajibu ni muhimu sana.

## Tor & I2P Teknolojia

## Tor

[Tor](https://www.privacyguides.org/en/tor/?h=tor) ni chombo cha wakala ambacho hutumia mtandao wa Tor kuanzisha uhusiano kwa maombi. Torbot hutimiza hili kwa kusafirisha trafiki yao kupitia Tor, na hivyo kuongeza [faragha na kutojulikana jina lake](https://www.torproject.org/) kwa ajili ya maombi haya.

## I2P Mtandao

Mtandao I2P, pia inajulikana kama mtandao wa IP. [Invisible Internet Project (Mradi wa Mtandao usioonekana)](https://geti2p.net/en/about/intro), ni kikamilifu encrypted peer-to-peer overlay mtandao. Ni kuhakikisha kwamba maudhui, chanzo na marudio ya ujumbe zimefichwa kutoka kwa watazamaji. Kwa maneno mengine, hakuna mtu anaweza kuona asili au marudio wa trafiki au yaliyomo halisi ya ujumbe kuwa kuambukizwa. Encryption kutumika katika I2P inahakikisha kiwango cha juu cha faragha na kutokujulikana kwa watumiaji wake.

### Kufunga I2P

Kuna utekelezaji mbili. awali [Java I2P](https://geti2p.net/en/download) anaendesha kwenye Windows, MacOS, Linux na Android. [i2pd](https://i2pd.website/), iliyoandikwa katika C ++, ni nyepesi na ni chaguo la kawaida kwenye seva au mashine ya nguvu ndogo.

Mara baada ya ni mbio, I2P exposes console ndani juu ya `127.0.0.1:7657` na proxies juu ya `127.0.0.1:4444` (HTTP) na `127.0.0.1:4447` (SOCKS). Kutarajia kuchukua dakika kadhaa juu ya kuanza kwanza: I2P ina kujenga vichuguu kupitia mtandao kabla kitu chochote kazi, na inakuwa kasi zaidi ni kukaa online.

### Kutumia I2P na Zcash

Kuwa na ufahamu kwamba ** hakuna sasa Zcash node anaongea I2P natively.** Zebra hana msaada wa I2 P, wala zcashd. Kama unaweza kuona mwongozo kudai kukimbia Node Zcash juu ya I2 p, ni maelezo kitu programu haina kufanya.

Nini I2P ni kweli muhimu kwa hapa ni kila kitu karibu mkoba: kufikia tovuti, jukwaa au huduma bila ya kufunua anwani yako. Kwa anonymizing uhusiano mfuko yenyewe, Tor ni chaguo vitendo leo, na sehemu chini kufunika yake.

## Tor na I2P kushiriki sifa za kawaida lakini pia kuwa tofauti kubwa. 

Both Tor and I2P are decentralized and anonymous peer-to-peer networks, but I2P provides higher levels of security compared to Tor. However, I2P is primarily designed for accessing services like email, chat, and torrenting within its network and cannot be used to access the regular internet. On the other hand, Tor allows users to access the deep web, just like I2P, but it also functions as a regular browser for accessing websites on the surface web.

* Kumbuka: Kwa habari zaidi juu ya kufanana na tofauti za ziara Tor & I2P [hapa](https://geti2p.net/en/comparison/tor)*

## Routing mkononi mfuko wa fedha kupitia Tor na Orbot

Orbot ni mtandao wa kibinafsi (VPN) iliyoundwa kwa simu mahiri ambayo inaelekeza trafiki kutoka programu zote kwenye kifaa chako kupitia mtandao wa Tor.

Follow these instructions to route a Zcash wallet through Tor. Note that Ywallet, which earlier versions of this guide used, is no longer maintained and will not follow the network after Ironwood, so pick a maintained wallet from the [Mkoba](/using-zcash/wallets) ukurasa.

1.  Pakua na usakinishe *Orbot* kutoka duka la programu.

2.  Baada ya insatllation, ujumbe salamu itaonekana. Endelea kwa ukurasa wa nyumbani * Orbot* na bonyeza juu ya * 'Tor kuwezeshwa Apps'.* 

3. Hii itakuwa kuuliza ukurasa kwenye screen kuonyesha Tor-sambamba maombi. Tafuta mkoba wako Zcash katika orodha na kuhakikisha ni kuchaguliwa.

4. Ombi la uhusiano kuanzisha VPN itaonekana, ambayo itaruhusu * Orbot* kufuatilia trafiki mtandao. * Orbit * itakuwa Initialise mara moja ruhusa hii imekubaliwa. 

5. Angalia taskbar au Orbot homepage kuthibitisha kwamba Tor ni runnung, hii inathibitishwa wakati unaweza kuona 'Kushikamana na mtandao wa Tor'.

*Kumbuka: Kama Tor ni kuzuiwa na mtandao wako mkononi, unaweza kutumia Bridge Server kama njia mbadala ya kuungana.*


## Kufunga Tor kwenye PC au desktop

* Tor browser inaweza kupakuliwa kutoka tovuti rasmi, unaweza kupata kiungo [hapa](https://www.torproject.org/download/).

 Njia rahisi zaidi ya kufunga Tor ni kupitia Kifurushi cha Kivinjari cha Tor. Ikiwa unapendelea mitambo isiyo na kichwa, unaweza kuchagua kusanikisha daemon ya Tor kando. 

*Kumbuka: Kwa default, Tor Browser mfuko inaonyesha SOCKS msikilizaji juu ya tcp/9150 na daemon Tor unaonyesha SOCOKS msikiaji kwenye tc p/9050.*

* Rejea kwa ufungaji [maagizo](https://support.torproject.org/apt/) maalum kwa mfumo wako wa uendeshaji kama zinazotolewa na Mradi Tor.

## Kukimbia node juu ya Tor

Hii ni sehemu ambayo imebadilika zaidi, na jibu la uaminifu ni kwamba kwa sasa ni ngumu kuliko ilivyokuwa.

** zcashd ni gone.** Imefikia mwisho wa msaada na kusimamishwa tarehe 18 Julai 2026 katika block 3,417,100. Haitaanza tena, ukurasa wake wa kupakua unarudi 404, na hazina ya apt haitumiki tena. Maagizo yoyote yanayokuambia uendeshe `zcashd -proxy=127.0.0.1:9050` haitumiki tena kwa kitu chochote.

** Zebra hawezi kufanya hivyo bado ama.** Zebra ni kudumishwa node, na yake mtandao crate haina vyenye code ya kutengwa-uhusiano kwa ajili Tor, lakini kipengele cha maoni nje katika `zebra-network/Cargo.toml`:

```
# tor = ["arti-client", "tor-rtcompat"]
```

Crates nyaraka anasema kitu kimoja wazi: * "Tor uhusiano ni sasa walemavu mpaka `arti-client`ya kutegemea `x25519-dalek v1.2.0` ni updated. "* The `connect_isolated_tor` Hivyo hakuna njia mkono kuendesha node Zcash juu ya Tor leo.

Kama unahitaji node-kiwango cha kutokujulikana sasa, mbinu ya kazi ni kuweka mashine nzima nyuma Tor au VPN katika ngazi mfumo wa uendeshaji badala ya Configuring Node yenyewe. Hiyo inalinda eneo lako mtandao bila kutegemea vipengele node kwamba si kujengwa.

### Mambo unayoweza kufanya leo

- **Route mkoba wako kwa njia ya Tor** na Orbot kwenye simu, kama ilivyoelezwa hapo juu. Hii ni chaguo vitendo kwa watu wengi, na huficha IP yako kutoka server lightwalletd mfuko wa fedha mazungumzo yako kwa
- **Tumia Tor Browser** kwa block explorers, vikao na kitu kingine chochote ambapo wewe ingekuwa badala si wanaohusishwa na anwani
- **Kumbuka kile Tor haina kuficha.** Ni anonymize mtandao wako eneo, si shughuli yako juu ya mnyororo. Kutuma kutoka anwani uwazi bado ni umma, na thamani kuvuka kati ya hifadhi kulindwa bado kuchapisha kiasi hicho. Angalia [Vidimbwi Vilivyohifadhiwa kwa Kifaa cha Kuzuia Mlipuko](/using-zcash/shielded-pools) Na kwa yanayo onekana,
