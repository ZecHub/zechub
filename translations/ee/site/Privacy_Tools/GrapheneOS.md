<a href="https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/GrapheneOS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Graphene OS

## TL;DR

- **GrapheneOS** nye mobile operating system si menye hɔhɔ̃ ƒe dɔwɔƒe tɔ o, eye wotu le open-source dzi, si ɣe ɖe ɣaɣla [privacy] kple dedienyenye ŋu, eye wòate ŋu wɔ dɔ bliboa kple Android apps siwo wozãna gbe sia gbe
- Eƒe ŋusẽ veviwoe nye: app sandbox si wowɔ wòsesẽ, code si dedie le memory me kple mɔnu siwo wɔnɔa nu vɔ̃ ƒe zãzã ŋu, verified boot si hardware dea alɔ ɖo, mɔɖoɖowo siwo woate ŋu mama ɖe nyuie, kple USB-C port ƒe dedienyenye ne wowɔ device la ƒe xɔtutu
- Installation va to **WebUSB installer** si nye dɔwɔnu si nyo na amehawo geɖe, alo to **command-line flow** la me na amesiwo nya mɔ̃wu
- Na Zcash ƒe zazãla, eƒe anyiɖoƒe sesẽ na mobile self-custody; tsɔe kple ɣaɣla gakotoku [wallet] si wowɔa dɔ ɖe edzi kple OPSEC ƒe nɔnɔme nyuiwo

GrapheneOS nye dɔwɔƒe si menye hɔhɔ̃ ƒe tɔ o, eye wotu le open-source dzi, si ɖe eɖokuiŋu be yeana ɣaɣla kple dedienyenye nasẽ ɖe mobile devicewo ŋu, hafi wòagblɔa ɖekawɔwɔ kple Android apps. Operating system sia ɖe ŋku vevie ɖe ɣaɣla kple dedienyenye ƒe mɔnuwo ƒe ɖoɖo yi edzi, eye vevie tso sandboxing, mɔnu siwo wɔnɔa nu vɔ̃ ƒe zãzã ŋu, kple mɔɖoɖo ƒe nɔnɔme nyuitɔ wɔwɔ me. Wodzii le 2014 me le ŋkɔ **CopperheadOS** te, eye tso ɣeyiɣi ma me va se egbe la, wòtrɔ zu wò digital ɣaɣla kple dedienyenye ƒe dzikpɔla sesẽ.

GrapheneOS ƒe taɖodzinu vevitɔe nye be yeaɖe dedienyenye ƒe mɔɖoɖowo, abe app sandbox ene, ɖo anyi sesẽ wu, ke wòmagaɖe nu vɔ̃ aɖe va user experience la dzi o. 

GrapheneOS ate ŋu atsɔ toggles vovovo ava na feature aɖewo, abe Network permissions, Sensors permissions, alo mɔxexe siwo wɔa dɔ ne wowɔ device la ƒe xɔtutu (si me nuwo abe USB peripherals, camera ƒe mɔxexe, kple quick tiles le). Kpe ɖe eŋu la, ɣaɣla kple dedienyenye ƒe feature siwo hia nu dzadzra geɖe na userwo la, woɖo wo nyuie be wòanɔ bɔbɔe na zazãla, eye woƒe user interface ƒe nyonyo vovovo le wo katã si.

## **GrapheneOS ƒe Nɔnɔmewo**

**Dedienyenye Ƒe Ɖoɖo Sesẽ** GrapheneOS me dedienyenye ƒe nyonyo geɖe le, abe programming languages siwo dedie le memory me kple compiler-based dedienyenye ƒe featurewo ene, be woaɖe vodadawo siwo dzɔna zi geɖe dzi.

**Sandboxing** Eɖea app sandboxing ɖo anyi sesẽ be wòama appwo ɖe wo nɔewo gbɔ, eye wòana mɔ siwo dzi attackwo ate ŋu ava la nasẽ o.

**Verified Boot** GrapheneOS zãna keys siwo hardware dea alɔ ɖo kple boot ƒe mɔnu si woate ŋu akpɔ ɖe edzi be operating system la ƒe nɔnɔme le blibo.

**Mɔɖoɖo Siwo Nyo Wu** Enaa mɔ si nyo wu na app permissions ƒe dzikpɔkpɔ, eye eƒe mɔ le userwo si be woaɖo nuwo ɖe nyuie eye woakpɔ data kawɔe appwo ate ŋu akpɔ la dzi.

**Ɣaɣla Ɖoɖowo Ƒuƒopé [dashboard]** Userwo ate ŋu akpɔ eye woakpɔ appwo ƒe nɔnɔme dzi to ɣaɣla ɖoɖowo ƒuƒopé dzi, si naa wòle waziã tso data ƒe zãzã ŋu.

**Dedienyenye Ƒe Nyɔŋlɔɖiwo Siwo Le Eme** GrapheneOS naa dedienyenye ƒe nyɔŋlɔɖiwo le ɣeyiɣi nyuitɔ me, ale be userwo nakpɔ mɔxexe yeyetɔ si wɔnɔa vodadawo ŋu.

**Ɣaɣlaŋlɔŋlɔ Sesẽ [encryption]** Etsɔa disk bliboa ƒe ɣaɣlaŋlɔŋlɔ wɔa dɔ le gɔmedzedze me, eye eɖea data siwo le device la dzi ɣa.

**Browser Ƒe Dedienyenye Si Nyo Wu** Browser si wotsɔ de eme le gɔmedzedze me la, woɖoe be dedienyenye nanɔ eme wu, si me tracking ƒe mɔxexe hã le.

**Apps Ɖevi Siwo Woɖe ɖe Eme Xoxo** GrapheneOS va kple apps ɖevi siwo woɖe ɖe eme xoxo, eye esia ɖea dedienyenye kple ɣaɣla ƒe afɔku siwo ate ŋu ava la dzi.

**USB Hostile Port Ƒe Mɔxexe** Enaa mɔxexe tso mɔxexe si me ame aɖe atsɔ USB ports awɔ mɔ aɖe ava device la gbɔ ne wowɔe ƒe xɔtutu.

**Anti-Malware Ƒe Mɔxexewo** GrapheneOS me featurewo le siwo kpɔa malware siwo wanya xoxo la eye wogbɔna wo ŋu.

**Woɖe Ŋku Ɖe Ɣaɣla Ŋu** Woɖo OS la be wòaɖe ŋku vevie ɖe user ƒe ɣaɣla ŋu, eye wòana data ƒe xɔxɔ kple fiamafi nasẽ ɖe edzi.

**Open Source** E nye open-source ƒe dɔwɔƒe, si naa nuwo le waziã eye hamea ƒe amewo ate ŋu akpe ɖe eŋu be dedienyenye nadze edzi.

**Dedienyenye Ƒe Se Siwo Woate Ŋu Atrɔ** Userwo ate ŋu atrɔ dedienyenye ƒe se vovovowo be wòaɖo woƒe dzidzɔnuwo nu.

**Ɖekawɔwɔ** GrapheneOS ɖoe be yeawɔ dɔ ɖekae kple Android apps, ale be userwo nanɔ woƒe apps siwo wòlɔ̃ la zãm, eye woakpɔ dedienyenye kple ɣaɣla ƒe feature siwo nyo wu ƒe vi.

## **GrapheneOS Ƒe Installation**

Abe ale si woƒo nu tsoe le nɔnɔme nyuitɔ ƒe akpa me ene la, woɖe eŋu be wòazã official installation guide si woɖo. Mɔ eve le GrapheneOS ƒe installation me: ɖeka nye be wòazã [WebUSB-based installer](https://grapheneos.org/install/web), alo wòazã [command-line installation guide](https://grapheneos.org/install/cli)

**Web USB-Based Installation** Be nàɖo GrapheneOS to Web installer ƒe mɔnu me la, zi geɖe wòahiã nu kple agbalẽ siawo:

- Memory bliboa 2GB kple storage ƒe teƒe bliboa 32GB.
- USB Cable (A alo C)
- Operating System siwo wodea alɔ: Windows 10, Windows 11, macOS Big Sur (11 - 13), Arch Linux, Debian (10 - 12), Ubuntu (22.04, 22.10 kple 23.04), ChromeOS, GrapheneOS, Google Android (stock Pixel OS)
- Browser siwo wodea alɔ: Chromium (womedea alɔ le Ubuntu dzi o), Vanadium (GrapheneOS), Google Chrome, Microsoft Edge, Brave Browser.

Kpɔ installation Guide la to link si le ete la dzi, eye nàto installation ƒe mɔnu la me

[GrapheneOS Web Installer Guide](https://grapheneos.org/install/web#prerequisites)

**Command Line Ƒe Installation** Womedea ŋku command line ƒe installation ŋu na user siwo menya mɔ̃wu o, eye dɔwɔnu kple nu siwo le ete la hiã na Command Line ƒe Installation;

- Ele be memory bliboa 2GB kple storage ƒe teƒe bliboa 32GB nanɔ asiwò
- USB Cable (A alo C)
- Operating System siwo wodea alɔ Windows 10 Windows 11 macOS Big Sur (11) macOS Monterey (12) macOS Ventura (13) Arch Linux Debian 10 (buster) Debian 11 (bullseye) Debian 12 (bookworm) Ubuntu 20.04 LTS Ubuntu 22.04 LTS Ubuntu 22.10 Ubuntu 23.04
- Web Installer tso Android, ChromeOS alo GrapheneOS

Kpɔ installation Guide la to link si le ete la dzi, eye nàto installation ƒe mɔnu la me 

[Command Line Installation](https://grapheneos.org/install/cli#prerequisites)

## **Nɔnɔme Nyuitɔwo**

**Na OS La Nanɔ Yeyee** Ɖe GrapheneOS yeyee ɣesiaɣi be nàkpɔ dedienyenye ƒe patches kple nyonyo yeyewo.

**Zã Nyagbegbe Sesẽwo** Ɖo nyagbegbe sesẽ siwo to vovo na device ƒe ɣaɣlaŋlɔŋlɔ kple app ƒe gege me be nàxe mɔ na mɔkpɔmɔkpɔ si me mɔɖeɖe mele o.

**App Ƒe Mɔɖoɖowo** Kpɔ app ƒe mɔɖoɖowo dzi nyuie eye nàkpɔ wo, eye nàna nu si hiã be app siawo wɔ dɔ ko.

**Backup Ɣesiaɣi** Wɔ backup na wò data ɣesiaɣi ne device la bu alo data la gbã.

**Ɣaɣla Storage** Ne wometsɔ ɣaɣlaŋlɔŋlɔ wɔe le gɔmedzedze me o la, wɔ ɣaɣlaŋlɔŋlɔ na wò device ƒe storage be nàxɔ wò data ɖe asi ne device la bu alo wofi.

**Xɔtutu Screen Si Dedie** Zã xɔtutu screen si dedie, abe PIN, nyagbegbe, alo biometric authentication ene, be nàxe mɔ na mɔkpɔmɔkpɔ si me mɔɖeɖe mele o.

**Mègawɔ Root Na Wò Android Device O** Mègawɔ root alo mègavɔ bootloader la o, elabena esia ate ŋu ana device ƒe dedienyenye nasẽ o.

**Ɖe App Ƒe Dzɔƒewo Ɖe Edzi** Ɖe appwo kple woƒe dzɔƒewo ƒe nyateƒe ɖe edzi be nàxe mɔ na software vɔ̃ ƒe installation.

**Ɖo Browser Si Ɖe Ŋku Ɖe Ɣaɣla Ŋu** Bu browser si ɖe ŋku ɖe ɣaɣla ŋu, abe Brave browser, Firefox alo Bromite ene, zã be nàwɔ browsing dedie.

**Kpɔ Apps Dzi Ɣesiaɣi** Kpɔ apps dzi le ɣeyiɣi vovovo me, eye nàɖe apps siwo mèzã alo mèka ɖe wo ŋu o la ɖa be attack surface la nasẽ ɖe edzi.

**Ɖe Two-Factor Authentication (2FA) Dzi** Ɖe 2FA dzi na wò online accounts be dedienyenye ƒe akpa bubu nasɔ.

**Nàwɔ Kpɔkplɔ Na Public Wi-Fi** Wòanɔ kplɔm ne èle gege ɖe public Wi-Fi networkwo ŋu, elabena woƒe dedienyenye ate ŋu nasẽ o. Zã VPN ne ehiã.

**Nàwɔ Kpɔkplɔ Kple Location Data** Ɖe location tracking ƒe mɔxexe ɖe appwo ŋu, eye bu location spoofing dɔwɔnu [tools] aɖe zã ne ɣaɣla le wò nu vevie.

**Nàwɔ Kpɔkplɔ Kple Link Kple Attachment Si Mènya O** Nàwɔ kplɔm kple link kple email attachment siwo mèbia o, elabena woate ŋu anye phishing ƒe agbagba alo malware.

**Kpɔ Default Settings Dzi** Kpɔ default settings dzi nyuie eye nàtrɔ wo be woawɔ ɖeka kple wò ɣaɣla ƒe dzidzɔnuwo.

**Hamea Ƒe Kpekpeɖeŋu** Wɔ ɖeka kple GrapheneOS ƒe hamea kple forums be nàkpɔ aɖaŋu, nyɔŋlɔɖiwo, kple dedienyenye ƒe aɖaŋu. Àte ŋu aka ɖe team la ŋu eye nànɔ nyɔŋlɔɖiwo kpɔm to [afi](https://grapheneos.org/contact) dzi be nàkpɔ contacts bubuwo.

**Zã Official Installation Ƒe Mɔnu** GrapheneOS naa installation ƒe mɔnu eve si woɖea alɔ na wo oficiale. Userwo ate ŋu atia WebUSB-based installer la, si nyo na amehawo geɖe, alo woate ŋu ato command-line installation guide la me, si woɖo na amesiwo le mɔ̃wu ƒe nyanya me wu.

## **Nuƒoƒo Ƒe Ɖoɖo**

Le nyateƒe me la, GrapheneOS ƒe nu vevitɔe nye be wòana mobile operating system bubu si ɖea ŋku vevie ɖe eƒe userwo ƒe ɣaɣla kple dedienyenye ŋu, eye wòana wo nakpɔ ŋusẽ geɖe le woƒe digital agbe dzi, esi wònɔ apps siwo woɖo ɖe wo ŋu la kple ɖekawɔwɔ me. E nye dɔwɔƒe si ɖo eɖokui be yeatsɔ standard dzidzɔ aɖe aɖo mobile device ƒe dedienyenye kple ɣaɣla me le ɣeyiɣi sia si nyawo siawo le vevie ŋutɔ me.

## Ɖepewo Siwo Kplɔe ɖo

- [Secure Messengers](Secure_Messengers.md) — nyaɖoɖo ɣaɣla le device si woɖo anyi sesẽ dzi
- [PGP Encryption](PGP_Encryption.md) — email kple file ƒe maxɔmaxɔ si woɣla
- [VPN and DVPN](VPN_and_DVPN.md) — network-layer ɣaɣla le mobile dzi
- [Web Browsers](Web_Browsers.md) — mobile browser ƒe tiatia kple eƒe ɖoɖo sesẽ
