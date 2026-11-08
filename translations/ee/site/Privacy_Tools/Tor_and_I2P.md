<a href="https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/Tor_and_I2P.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Nu Ka Ta Ƒe Vevi

## TL;DR

- **Tor** kplɔa wò ƒe kadodoa to kadodonu atọ me eye wòate ŋu awɔ dɔ kple web normali kple onion subɔsubɔwo siaa — egbe la, eyae nye mɔ si wozãna kpuie be woaɣla gakotoku ƒe kadodo kple web dzi dzidodo
- **I2P** nye peer-to-peer kɔkɔe si woɣla blibo la ƒe network si wode be wòawɔ dɔ na eya ŋutɔ ƒe meɖeɖeawo; **Zcash ɣaɣla dzesi ŋɔŋlɔ aɖeke si li fifia meƒoa I2P le dzɔdzɔe me o**
- **Le mobile dzi:** Ɖo Zcash gakotoku to Tor me kple asiƒoƒo ʋee aɖewo kple Orbot ("Tor Enabled Apps")
- **Ʋu Zcash ɣaɣla dzesi ŋɔŋlɔ to Tor me mele ŋu fifia o:** `zcashd` va seƒoƒoƒe le 18 July 2026, eye Zebra ƒe Tor ŋutinya gale dzadzraƒeƒe me le upstream
- Tor ɣla *afi si nèle*, ke menye *nu si wɔm nèle ɖoɖonu dzi* o — nuwo ƒe ʋuʋuɖi gaɖoɖowo gale ŋkeke me

Le digital ƒe ƒomevi me la, wò ƒe [ɣaɣla privacy](https://www.privacyguides.org/en/) ɖe ɖe edzi vevie wu. Togbɔ be ame aɖewo ate ŋu abui be ɣaɣla nye nu si woɖe asi le, menye nenema o. Wò ƒe ɣaɣla le afɔku me eye ele be nàtsɔe anɔ dzodzro me. Ɣaɣla ƒe asixɔxɔ gã le, elabena eƒoa nu kple ŋusẽ, eye vevie be woazã ŋusẽ ma le mɔ nyui nu.

## Tor kple I2P Ƒe Teknolodziwo

## Tor

[Tor](https://www.privacyguides.org/en/tor/?h=tor) nye proxy dɔwɔnu si zãna Tor network be wòawɔ kadodo na applicationwo. Tor wɔa esia to woƒe kadodo kplɔkplɔ to Tor me, eye esia naa [ɣaɣla kple ame manyamanyam privacy and anonymity](https://www.torproject.org/) ƒe ŋusẽ sɔe na application siawo.

## I2P Network

I2P network, si woyɔna hã be [Invisible Internet Project](https://geti2p.net/en/about/intro), nye peer-to-peer kɔkɔe si woɣla blibo la ƒe network. Ena be woaɣla mesajewo ƒe emenyawo, afi si wotso kple afi si woyia na amesiwo le kpɔm. Le nya bubu me la, ame aɖeke mate ŋu akpɔ afi si kadodoa tsoa, afi si wòyia loo, alo mesaj siwo wom le ɖom ƒe emenyawo o. Ɣaɣlaŋlɔŋlɔ si I2P zãna naa ɣaɣla kple ame manyamanyam ƒe ƒomevi si le dziƒo na ezãlawo.

### I2P Ƒe Ɖoɖo

Wɔwɔ ƒomevi eve le. [Java I2P](https://geti2p.net/en/download) si nye gɔmedzedzea wɔa dɔ le Windows, macOS, Linux kple Android dzi. [i2pd](https://i2pd.website/), si wòŋlɔ le C++ me la, le bɔbɔe eye eyae wonaa be wozãna le server alo mɔ̃ si ŋusẽ me le sue dzi.

Ne wòle dɔ wɔm la, I2P ɖea local console aɖe fia le `127.0.0.1:7657` eye proxywo le `127.0.0.1:4444` (HTTP) kple `127.0.0.1:4447` (SOCKS). Ele be nàlala miniti aɖewo le gɔmedzedze gbãtɔ me: I2P fanele be wòatu tunnelwo to network la me hafi nu aɖeke awɔ dɔ, eye ewɔa dɔ kabakaba nenɔ online ɣe didi wu.

### I2P Ƒe Zã kple Zcash

Ɖo ŋku edzi be **Zcash ɣaɣla dzesi ŋɔŋlɔ aɖeke si li fifia meƒoa I2P le dzɔdzɔe me o.** Zebra mekpɔ I2P ƒe kpekpeɖeŋu o, eye zcashd hã mekpɔe o. Ne nèkpɔ mɔfiame aɖe si gblɔna be woɖua Zcash ɣaɣla dzesi ŋɔŋlɔ to I2P me la, ele nu si software la mewɔna o ŋutɔ gblɔm.

Nu si I2P nyateƒeŋutɔ wɔna nyuie le afi sia la nye nu sia nu si le gakotoku la ƒe xlã: site, forum alo subɔsubɔ aɖe gbɔ vaɖoɖo ne mèdia be woanya wò gaɖoƒe ƒe dzesi o. Na gakotoku ƒe kadodo ŋutɔ ƒe manyamanyam la, Tor nye mɔ si wɔnɔa dɔ nyuie egbe, eye akpa siwo le afisia megbe la ƒoa nu tsoe.

## Tor kple I2P le nɔnɔme siwo wɔnɔa ɖeka, gake vovototo gãwo hã le wo dome. 

Tor kple I2P siaa nye ha nuɖo agni kple ame manyamanyam peer-to-peer networkwo, gake I2P nana dedienɔnɔ ƒe ƒomevi si le dziƒo wu Tor. Ke I2P wowɔe vevie be wòanɔ subɔsubɔwo abe email, chat, kple torrenting le eƒe network me, eye womate ŋu azãe avaɖo internet normali dzi o. Ke le akpa bubu la, Tor naa ezãlawo ŋu vaɖo deep web, abe ale si I2P wɔna ene, gake ewɔa dɔ hã abe browser normali na websitewo siwo le surface web dzi.

*Ŋkuɖoɖo: Ne nàdi nyatakaka bubu tso Tor kple I2P ƒe nɔnɔme siwo wɔnɔa ɖeka kple woƒe vovototowo ŋu la, yi [afisia](https://geti2p.net/en/comparison/tor)*

## Ɖo mobile gakotoku to Tor me kple Orbot

Orbot nye virtual private network (VPN) si womebia ga ɖe eŋu o, si wowɔ na smartphonewo, eye wòkplɔa kadodo si tsoa applicationwo katã le wò mɔ̃ dzi to Tor network la me.

Dze ɖoɖo siawo yome be nàɖo Zcash gakotoku to Tor me. Ɖo ŋku edzi be YWallet, si mɔfiame sia ƒe version xoxoawo zãna la, womelẽe ɖe edzi o azɔ eye wòmeadzɔ network la yome le Ironwood megbe o, eya ta tia gakotoku si wolẽ ɖe edzi tso [Gakotokowo](/using-zcash/wallets) axa dzi.

1.  Download eye nàɖo *Orbot* tso app store.

2.  Le ɖoɖo megbe la, greetings mesaj aɖe ava. Yi edzi vaɖo *Orbot* ƒe home page dzi eye nàzi *'Tor Enabled Apps'.*              

3. Esia ana axa aɖe ava le screen la dzi si fia applicationwo si sɔ kple Tor. Di wò Zcash gakotoku le list la me eye nàkpɔe be wotia e.

4. Kadodo ƒe biabia aɖe ava be woaɖo VPN, si ana *Orbot* ŋu akpɔ network ƒe kadodo. *Orbot* adze egɔme awɔ dɔ ne woɖe mɔ na esia vɔ.

5. Kpɔ taskbar la alo Orbot ƒe homepage be nàkpe ɖe edzi be Tor le dɔ wɔm; woakpe ɖe edzi ne nàkpɔ 'Connected to the Tor network'.

*Ŋkuɖoɖo: Ne wò mobile network ƒe mɔxɔxɔ ɖe Tor tɔ la, àte ŋu azã Bridge Server abe mɔ bubu be nàwɔ kadodo ene.*


## Ɖo Tor le PC alo desktop dzi

* Tor browser la, àte ŋu aɖe tso official website; àte ŋu akpɔ link la [afisia](https://download.torproject.org/).

 Mɔ si le bɔbɔe wu na Tor ƒe ɖoɖo nye be nàzãe to Tor Browser Bundle me. Ne nèdi headless ɖoɖowo la, àte ŋu atia be nàɖo Tor daemon la vovo. 

*Ŋkuɖoɖo: Le gɔmedzedze me la, Tor Browser bundle naa SOCKS listener le tcp/9150, eye Tor daemon la naa SOCKS listener le tcp/9050.*

* Kpɔ ɖoɖo ƒe [mɔfiamewo](https://support.torproject.org/little-t-tor/getting-started/installing/) si sɔ kple wò operating system, abe ale si Tor Project la de asi le wo ŋu ene.

## Ʋu ɣaɣla dzesi ŋɔŋlɔ to Tor me

Eyae nye akpa si tɔtrɔ geɖe wu, eye ɖeɖeŋutɔ ƒe ŋuɖoɖo la nye be fifia ewɔa dɔ vɔ̃ wu tsã.

**zcashd megale o.** Eva seƒoƒoƒe eye wòtsi le 18 July 2026 le gaɖoɖowo ƒuƒoƒe 3,417,100. Womagbugbɔ adze egɔme o, eƒe download page trɔ ɖo 404, eye womagale apt repository la subɔm o. Mɔfiame aɖeke si gblɔ be nàƒu `zcashd -proxy=127.0.0.1:9050` megale be wòawɔ dɔ na nu aɖeke o.

**Zebra hã mate ŋu awɔe haɖe o.** Zebra nye ɣaɣla dzesi ŋɔŋlɔ si wolẽ ɖe edzi, eye eƒe network crate la me le isolated-connection code na Tor, gake woŋlɔe ɖe anyi le `zebra-network/Cargo.toml` me:

```
# tor = ["arti-client", "tor-rtcompat"]
```

Crate ƒe documentation la gblɔe kpuie hã: *"Tor ƒe kadodowo gale dzadzraƒeƒe me vaseɖe esime woatrɔ `arti-client` ƒe dependency `x25519-dalek v1.2.0`."* Woŋlɔ `connect_isolated_tor` function la hã ɖe anyi kplii. Eya ta, mɔ si wodzɔna be woaƒu Zcash ɣaɣla dzesi ŋɔŋlɔ to Tor me mele o egbe.

Ne nèhia manyamanyam le ɣaɣla dzesi ŋɔŋlɔ ƒe nudzraɖoƒe me fifia la, mɔ si wɔnɔa dɔ nye be nàɖo mɔ̃ blibo la ɖe Tor alo VPN megbe le operating-system ƒe nudzraɖoƒe me, le teƒe be nàɖo ɣaɣla dzesi ŋɔŋlɔ la ŋutɔ. Esia ɣla wò network ƒe nɔƒe manɔa ɖe ɣaɣla dzesi ŋɔŋlɔ ƒe ŋutinya si wometu o ŋu o.

### Nu si àte ŋu awɔ ha egbe

- **Ɖo wò gakotoku to Tor me** kple Orbot le mobile dzi, abe ale si woƒo nu tsoe le afi sia megbe ene. Eyae nye mɔ si wɔnɔa dɔ na ame geɖe, eye wòɣla wò IP tso lightwalletd server si wò gakotoku doa gbe na la gbɔ
- **Zã Tor Browser** na gaɖoɖowo ƒuƒoƒe ƒe didimekpɔlawo, forumwo kple nu bubu sia nu si nèdi be woagatsɔ gaɖoƒe ƒe dzesi aɖo wò ŋu o
- **Ɖo ŋku edzi be nu si Tor meɣlana o.** Enaa wò network ƒe nɔƒe manyamanyam, ke menye wò ɖoɖonu dzi ƒe dɔwɔwɔ o. Dɔɖoɖo tso nuwo ƒe ʋuʋuɖi gaɖoƒe ƒe dzesi me gale ŋkeke me, eye asixɔxɔ si tso ɣaɣla gaƒuƒoƒowo dome va la ɖe fiaa ga home. Kpɔ [Ɣaɣla Gaƒuƒoƒowo](/using-zcash/shielded-pools) be nànya nu si gale ŋkeke me

## Axawo si kplɔe ɖo

- [VPN kple DVPN](VPN_and_DVPN.md) — VPN ƒe mɔ bubuwo kple ale si woƒoa vovototo
- [Web Browserwo](Web_Browsers.md) — browser ƒe sesẽwɔwɔ na ɣaɣla le ŋkeke sia ŋkeke
- [Mesadɔlawo siwo le Dedie](Secure_Messengers.md) — kadodo ƒe dɔwɔnu siwo le ɣaɣla me
- [Nu Si Gaɖoɖowo Ƒuƒoƒe ƒe Didimekpɔla Aɖe Ate Ŋu Akpɔ](../Zcash_Tech/What_a_Block_Explorer_Can_See.md) — nu si wò ɣaɣla dzesi ŋɔŋlɔ ƒe ɣaɣla kpɔa ɖeŋu kple nu si wòmekpɔa ɖeŋu o
- [Ɣaɣla Gaƒuƒoƒowo](/using-zcash/shielded-pools) — nu si gale ŋkeke me ɖoɖonu dzi, togbɔ be network ƒe nudzraɖoƒe ƒe manyamanyam le hã
