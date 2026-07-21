<a href="https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/Tor_and_I2P.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Kwa Nini Faragha Ni ya Maana

Katika umri digital, kulinda yako [faragha](https://www.privacyguides.org/en/) has become increasingly vital. While some may view privacy as a lost cause, it is not. Your privacy is at stake and should be a concern. Privacy holds significant value as it relates to power, and ensuring that power is wielded responsibly is crucial.

## Tor & I2P Teknolojia

## Tor

[Tor](https://www.privacyguides.org/en/tor/?h=tor) ni chombo cha wakala kwamba uttilizes mtandao Tor kuanzisha uhusiano kwa ajili ya maombi. Torbot mafanikio hii kwa routing trafiki yao kupitia Tor, hivyo kuongeza [usiri na kutojulikana](https://www.torproject.org/) kwa ajili ya maombi haya.

## I2P Mtandao

Mtandao I2P, pia inajulikana kama [Invisible Internet Project](https://geti2p.net/en/about/intro), ni kikamilifu encrypted peer-to-peer overlay mtandao. Ni kuhakikisha kwamba maudhui, chanzo, na marudio ya ujumbe ni siri kutoka kwa watazamaji. Kwa maneno mengine, hakuna mtu anaweza kuona asili au marudio wa trafiki au maudhui halisi ya ujumbe kuwa kuambukizwa. encryption kutumika katika I2P kuhakikisha kiwango cha juu cha faragha na kutokujulikana kwa watumiaji wake.

## Tor na I2P kushiriki sifa za kawaida lakini pia kuwa na tofauti kubwa. 

Both Tor and I2P are decentralized and anonymous peer-to-peer networks, but I2P provides higher levels of security compared to Tor. However, I2P is primarily designed for accessing services like email, chat, and torrenting within its network and cannot be used to access the regular internet. On the other hand, Tor allows users to access the deep web, just like I2P, but it also functions as a regular browser for accessing websites on the surface web.

* Kumbuka: Kwa habari zaidi juu ya kufanana na tofauti ya Tor & I2P ziara [hapa](https://geti2p.net/en/comparison/tor)*

## Kuunganisha Tor na Ywallet kwenye Smartphone

Orbot ni bure virtual binafsi mtandao (VPN) iliyoundwa kwa ajili ya smartphones ambayo inaelekeza trafiki kutoka maombi yote kwenye kifaa chako kupitia mtandao Tor.

Fuata maelekezo haya hapa chini kuunganisha Tor kwa Zcash Wallet *(Ywallet) *:

1.  Pakua na usakinishe *Orbot* kutoka duka la programu.

2.  Baada ya insatllation, ujumbe wa salamu itaonekana. Endelea kwa * Orbot * ukurasa wa nyumbani na bonyeza * 'Tor Enabled Apps'.* 

3. Hii itakuwa kuuliza ukurasa kwenye screen kuonyesha Tor-sambamba maombi. Tafuta * Ywallet * App na kuhakikisha ni kuchaguliwa.

4. ombi la uhusiano kuanzisha VPN itaonekana, ambayo itawawezesha * Orbot * kufuatilia mtandao trafiki. * Orbit * itaanza mara moja ruhusa hii imekubaliwa. 

5. Angalia taskbar au Orbot homepage kuthibitisha kwamba Tor ni runnung, hii ni alithibitisha wakati unaweza kuona 'Kushikamana na mtandao Tor'.

* Kwa video mafunzo wacth [hapa](https://drive.google.com/file/d/12ODTLrjgSzYFeAOTrv-P9LvfBVOvrSXK/view?usp=sharing)

*Kumbuka: Kama Tor ni kuzuiwa na mtandao wako mkononi, unaweza kutumia Bridge Server kama njia mbadala ya kuungana.*


## Jinsi ya kuanzisha mkoba wa Zcash na Torbot kwenye PC / Desktop

## Tor msaada katika Zcash?

* Tor browser inaweza kupakuliwa kutoka tovuti rasmi, unaweza kupata kiungo [hapa](https://www.torproject.org/download/).

 Njia rahisi zaidi kwa ajili ya kufunga Tor ni kupitia Tor Browser Bundle. Kama unapendelea mitambo headless, unaweza kuchagua kufunga Tor daemon tofauti. 

*Kumbuka: Kwa default, Tor Browser mfuko exposes SOCKS listtener juu ya tcp/9150 na Tor daemon exposes SoCKS msikilizaji juu ya Tcp/9050.*

* Rejea ufungaji [maagizo](https://support.torproject.org/apt/) maalum kwa mfumo wako wa uendeshaji kama zinazotolewa na Mradi wa Tor.

## Kufunga Zcashd mkoba

Zcashd is the official linux-based full-node wallet which is updated and maintained by core developers from the Electric coin Co. It is intended for users who may want to mine and validate zcash transactions, as well as sending and receing Zcash.

* Tovuti rasmi ya kupakua Zcashd Wallet inaweza kupatikana [hapa](https://electriccoin.co/zcashd/) 

* Kufunga mkoba: Kiungo cha video ya mafunzo [hapa](https://www.youtube.com/watch?v=hTKL0jPu7X0) zinazotolewa na watengenezaji wa mkoba wa Zcash.

##  Run Zcashd juu ya Tor 

* Ili Configure Zcashd kutumia Tor SOCKS wakala, unaweza kuongeza -proxy amri mstari hoja kwa amri daemon.

 Kwa mfano:

  $ zcashd -proxy=127.0.0.1:9050
      
Vinginevyo, kuongeza mstari zifuatazo kwa faili zcash.conf:

  proxy=127.0.0.1:9050

Kwa mabadiliko ya Configuration kuchukua athari, inashauriwa kuanzisha upya zcashd.

Kumbuka kwamba hii inachukua kwamba Tor daemon inatumiwa. Katika kesi Tor Browser Bundle inatumiwa, badilisha 9050 na 9150.

Aidha, unaweza kuongeza amri line hoja -listenonion kufanya daemon kuzalisha anwani .onion ambayo node yako inaweza kufikiwa.
