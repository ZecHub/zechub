<a href="https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/Tor_and_I2P.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Nusita Ameŋunyatakakawo Ŋuti Nyatakaka Le Vevie

## TL;DR

- **Tor** kplɔa wò ʋuwo to relay etɔ̃ me eye wòwɔa dɔ na web kple onion subɔsubɔdɔ siwo sɔ siaa — egbea la, enye nusi wowɔna le gɔmedzedzea me na gakotoku ƒe kadodowo ƒe ŋkɔmaɖemaɖe kple ŋkuléle ɖe nu ŋu
- **I2P** nye hatiwo ƒe ƒuƒoƒo si wotsɔ nya ɣaɣlawo ŋlɔe bliboe si wowɔ na eya ŋutɔ ƒe ememe dɔwɔnawo; **Zcash node aɖeke si li fifia meƒoa nu I2P le dzɔdzɔme nu o**
- **Le asitelefon dzi:** tsɔ Zcash gakotoku to Tor dzi le asiƒoƒo ʋee aɖewo me kple Orbot ("Tor Enabled Apps")
- **Zcash node ƒe dɔwɔwɔ to Tor dzi mateŋu adzɔ fifia o:** `zcashd` ɖo kpekpeɖeŋu ƒe nuwuwu le 18 July 2026 dzi, eye Zebra's Tor nɔnɔme gakpɔtɔ nye nuwɔametɔ le dzigbe gome
- Tor ɣlaa *afisi nèle*, ke menye *nusi nèwɔna le kɔsɔkɔsɔ me o* — asitsatsa siwo me kɔ la gakpɔtɔ le dutoƒo

Le dijitaal ɣeyiɣia me la, takpɔkpɔ na wò [adzame](https://www.privacyguides.org/en/) va le vevie wu. Togbɔ be ame aɖewo abu ame ŋutɔ ƒe nyawo gbɔ kpɔkpɔ be enye nusi bu hã la, menye nenemae o. Wò adzamenyawo le afɔku me eye ele be wòanye nusi ŋu nàtsi dzi ɖo. Asixɔxɔ gã aɖe le ameŋunyatakakawo ŋu le esi wòku ɖe ŋusẽ ŋu ta, eye egbɔkpɔkpɔ be wozã ŋusẽa le agbanɔamedzi me le vevie ŋutɔ.

## Tor & I2P Mɔ̃ɖaŋununyawo

## Tor

[Tor](https://www.privacyguides.org/en/tor/?h=tor) nye proxy dɔwɔnu si zãa Tor network tsɔ ɖoa kadodowo na dɔwɔwɔwo. Tor te ŋu ɖoa esia gbɔ to woƒe ʋuwo ƒe mɔzɔzɔ to Tor, si wɔnɛ be wòdoa ŋusẽe [ame ŋutɔ ƒe nyawo gbɔgblɔ kple ame ƒe ŋkɔmaɖemaɖe](https://www.torproject.org/) na dɔbiagbalẽvi siawo.

## I2P Netwɔƒe

I2P network, si woyɔna hã be.. [Internet si Womekpɔna O ƒe Dɔwɔɖoɖo](https://geti2p.net/en/about/intro), nye hatiwo kple hatiwo ƒe nutsyɔtsyɔ ƒe kadodo si wotsɔ nya ɣaɣlawo ŋlɔ bliboe. Ekpɔa egbɔ be woɣla gbedasiwo me nyawo, afisi wotso, kple afisi woɖo wo ɖo ɖe eteƒekpɔlawo. Ne míagblɔe bubui la, ame aɖeke mate ŋu akpɔ afisi ʋuwo tso alo afisi woɖo tae alo gbedasi siwo woɖo ɖe amewo me ŋutɔŋutɔ o. Nya ɣaɣla si wozãna le I2P me kpɔa egbɔ be ezãlawo ƒe nya ɣaɣlawo kple ŋkɔmaɖemaɖe ƒe ɖoɖo gã aɖe nɔa wo ŋu.

### I2P ƒe ɖoɖowɔwɔ

Dɔwɔwɔ eve li. Gbãtɔa [Java I2P ƒe dɔwɔwɔ](https://geti2p.net/en/download) ewɔa dɔ le Windows, macOS, Linux kple Android. [i2pd](https://i2pd.website/), si woŋlɔ kple C++ la, le bɔbɔe wu eye wònye tiatia si wozãna zi geɖe le server alo mɔ̃ si me ŋusẽ boo mele o dzi.

Ne enya le dɔ wɔm ko la, I2P ɖea nutoa me console aɖe ɖe go `127.0.0.1:7657` kple proxywo le `127.0.0.1:4444` (HTTP) kple `127.0.0.1:4447` (AFƆWUI). Kpɔ mɔ be axɔ miniti geɖe le gɔmedzedze gbãtɔ me: Ele be I2P natu mɔ̃wo to network la dzi hafi nane nawɔ dɔ, eye zi alesi wònɔ Internet dzi ɣeyiɣi didi la, ewɔa dɔ kabakaba wu.

### I2P zazã kple Zcash

Nyae be **Zcash node si li fifia aɖeke meƒoa nu I2P le dzɔdzɔme nu o.** Zebra mekpɔ I2P ƒe kpekpeɖeŋu aɖeke o, eye zcashd. Ne èkpɔ mɔfiala aɖe si gblɔ be yewɔa Zcash node to I2P dzi la, ke ele nane si kɔmpiutadziɖoɖoa mewɔna o la ɖɔm.

Nusi I2P ɖea vi ŋutɔŋutɔ le afisia enye nusianu si ƒo xlã gakotokua: nyatakakadzraɖoƒe, nyamedzroƒe alo dɔwɔƒe aɖe gbɔ ɖoɖo evɔ màɖe wò adrɛs afia o. Le gakotokua ƒe kadodoa ŋutɔ ƒe ŋkɔmaɖemaɖe ta la, Tor ye nye tiatia nyuitɔ egbea, eye akpa siwo le ete la ƒo nu tso eŋu.

## Tor kple I2P ƒe nɔnɔmewo sɔ gake vovototo gã aɖe hã le wo dome. 

Tor kple I2P siaa nye hatiwo ƒe kadodo siwo woɖe ɖe vovo eye womeyɔa ŋkɔ o, gake I2P naa dedienɔnɔ ƒe ɖoɖo kɔkɔwo ne wotsɔe sɔ kple Tor. Ke hã, wotrɔ asi le I2P ŋu koŋ be wòakpɔ dɔwɔnawo abe email, chat, kple torrent le eƒe network me eye womate ŋu azãe atsɔ akpɔ internet si wozãna edziedzi o. Le go bubu me la, Tor ɖea mɔ na ezãlawo be woate ŋu age ɖe nyatakakadzraɖoƒe goglo la me, abe I2P ene, gake egawɔa dɔ abe nyatakakadzraɖoƒe siwo wozãna edziedzi ene hena nyatakakadzraɖoƒe siwo le nyatakakadzraɖoƒe si le anyigba dzi la dzi yiyi.

*De dzesii: Ne èdi nyatakaka bubuwo tso Tor & I2P ƒe nusiwo ɖi wo nɔewo kple vovototowo ŋu la, yi [afi sia](https://geti2p.net/en/comparison/tor)*

## Asitelefon dzi gakotoku ƒe mɔzɔzɔ to Tor dzi kple Orbot

Orbot nye virtual private network (VPN) si mexɔ asi o si wowɔ na smartphones si fiaa mɔ ʋuwo tso dɔwɔnu siwo katã le wò mɔ̃a dzi to Tor network dzi.

Wɔ ɖe mɔfiame siawo dzi nàtsɔ aɖo Zcash gakotoku to Tor. De dzesii be YWallet, si mɔfiame sia ƒe tɔtrɔ siwo do ŋgɔ zã la, megaléa be na o eye makplɔ network la ɖo le Ironwood, eyata tia gakotoku si wodzra ɖo tso.. [Gakotokuwo](/using-zcash/wallets) axa 10.

1.  Wɔ *Orbot* ƒe kɔpi eye nàdae ɖe wò kɔmpiuta dzi tso app store la me.

2.  Ne èdae vɔ la, gbedoname ƒe gbedasi aɖe adze. Yi *Orbot* ƒe gɔmedzedze ƒe axa dzi eye nàzi *'Tor Enabled Apps' dzi.* 

3. Esia abia axa aɖe le screen la dzi si aɖe Tor-compatible applications afia. Di wò Zcash gakotokua le xexlẽdzesiawo me eye nàkpɔ egbɔ be yetiae.

4. Kadodo ƒe biabiawo be woaɖo VPN adze, si ana *Orbot* nalé ŋku ɖe network ƒe ʋuʋu ŋu. *Orbot* adze egɔme ne wonya da asi ɖe mɔɖeɖe sia dzi ko. 

5. Kpɔ dɔwɔwɔ ƒe akpaa alo Orbot ƒe gɔmedzedze be nàkpɔe ɖa be Tor le dɔ wɔm hã, woɖo kpe esia dzi ne èkpɔ 'Do ka kple Tor network'.

*De dzesii: Ne wò asitelefon ƒe network xe mɔ na Tor, àte ŋu azã Bridge Server abe mɔ bubu si dzi nàto aƒo ka ene.*


## Tor ɖoɖo ɖe PC alo kɔmpiuta dzi

* Tor browser ateŋu awɔ kɔpi tso dziɖuɖua ƒe nyatakakadzraɖoƒe, àteŋu age ɖe kadodoa me [afi sia](https://download.torproject.org/).

 Mɔ si sɔ wu si dzi nàto aɖo Tor ɖe wò kɔmpiuta dzi enye to Tor Browser Bundle dzi. Ne èdi be yeawɔ ɖoɖo siwo me ta mele o la, àte ŋu atiae be yeaɖo Tor daemon ɖe vovo. 

*De dzesii: Le gɔmedzedzea me la, Tor Browser ƒe babla la ɖea SOCKS toɖola ɖe go le tcp/9150 dzi eye Tor daemon ɖea SOCKS toɖola ɖe go le tcp/9050 dzi.*

* Kpɔ alesi woɖoe ɖe mɔ̃a dzi [sedede](https://support.torproject.org/little-t-tor/getting-started/installing/) koŋ na wò dɔwɔɖoɖoa abe alesi Tor Dɔwɔɖoɖoa nae ene.

## Node aɖe ƒe duƒuƒu le Tor dzi

Esiae nye akpa si trɔ wu, eye ŋuɖoɖo anukwaretɔe nye be fifia esesẽ wu alesi wònɔ.

**zcashd megali o.** Eɖo kpekpeɖeŋunana ƒe nuwuwu eye wòtɔ le 18 July 2026 dzi le block 3,417,100. Magadze egɔme ake o, eƒe kɔpi ƒe axa atrɔ 404, eye womegawɔa dɔ le apt nudzraɖoƒea o. Mɔfiame ɖesiaɖe si gblɔ na wò be nàƒu du `zcashd -proxy=127.0.0.1:9050` megaku ɖe naneke ŋu o.

**Zebra hã mateŋu awɔe haɖe o.** Zebra nye node si wodzrana ɖo, eye eƒe network crate la me isolated-connection code le na Tor, gake woƒo nu tso nɔnɔmea ŋu le `zebra-network/Cargo.toml`:

```
# tor = ["arti-client", "tor-rtcompat"]
```

Crate ƒe nuŋlɔɖiwo gblɔ nya ma ke tẽ: *"Tor kadodowo le dɔ wɔm fifia vaseɖe esime." `arti-client`'s ƒe ŋuɖoɖo ɖe ame ŋu `x25519-dalek v1.2.0` wowɔe yeyee."* The `connect_isolated_tor` dɔwɔwɔ ŋuti nyatakakawo kpe ɖe eŋu. Eyata mɔ aɖeke meli si wodo alɔe be woatsɔ awɔ Zcash node ɖe Tor dzi egbea o.

Ne èhiã node-level anonymity fifia la, mɔnu si awɔ dɔ enye be nàtsɔ mɔ̃ bliboa ade Tor alo VPN megbe le operating-system level tsɔ wu be nàɖo node la ŋutɔ. Ema kpɔa wò network teƒe ta evɔ màɖo ŋu ɖe node ƒe nɔnɔme siwo wometu o ŋu o.

### Nusi nàte ŋu awɔ egbea

- **Tsɔ wò gakotoku to Tor** kple Orbot le asitelefon dzi, abe alesi míegblɔe le etame ene. Esia nye tiatia nyuitɔ na ame akpa gãtɔ, eye wòɣlaa wò IP ɖe lightwalletd server si wò gakotokua ƒoa nu kplii la me
- **Zã Tor Browser** na block explorers, forums kple nu bubu ɖesiaɖe si me nàdi be yeatsɔ adrɛs aƒo ka na wò o
- **Ðo ŋku nusi Tor meɣla o dzi.** Enaa wò network ƒe teƒe si nèle la menyaa ŋkɔ o, ke menye wò on-chain activity o. Dɔdɔ tso adrɛs si me kɔ dzi gakpɔtɔ nye dutoƒo, eye asixɔxɔ ƒe tsɔtsɔ le tadeaguƒe siwo wokpɔ ta na dome gakpɔtɔ taa ga homea. Kpɔ [Ta Siwo Wotsɔ Akpoxɔnu Wɔe](/using-zcash/shielded-pools) na nusi nɔa dzedzem

## Axa siwo do ƒome kplii

- [VPN kple DVPN](VPN_and_DVPN.md) — VPN ƒe mɔnu bubuwo kple alesi wotsɔa wo sɔna kple wo nɔewoe
- [Nyatakakadzraɖoƒewo ƒe Nyatakakadzraɖoƒewo](Web_Browsers.md) — browser hardening hena gbesiagbe nyatakakawo ƒe adzamenyawo
- [Dɔla Siwo Le Dedie](Secure_Messengers.md) — ame ŋutɔ ƒe kadodomɔnu
- [Nusi Block Explorer Ate Ŋu Akpɔ](../Zcash_Tech/What_a_Block_Explorer_Can_See.md) — nusi wò node-level privacy wɔna kple nusi mekpɔa eta o
- [Ta Siwo Wotsɔ Akpoxɔnu Wɔe](/using-zcash/shielded-pools) — nusi nɔa dzedzem le kɔsɔkɔsɔ me kple network-layer ƒe ŋkɔmaɖemaɖe gɔ̃ hã
