<a href="https://github.com/Zechub/zechub/edit/main/site/Using_Zcash/Recovering_Funds.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Axa Axewo"/>
</a>

# Zcash Gakotoku ƒe Ga Gbugbɔxɔxɔ

**Nu ka ta nàlé wò gbugbɔxɔnuwo ɖe asi?**

Gadzraɖoɖi nya [seed phrase], gazazãsafuiwo, nukpɔsafuiwo, kple gakotoku ƒe faɛlwo menye nu ma ke o. Gadzraɖoɖi nya ate ŋu adze gakotoku ƒe safuiwo na gakotoku geɖewo, gake wòmeɖe safui xoxowo katã alo gakotoku ƒe faɛl siawo katã o. Nukpɔsafui ate ŋu aɖe ɣaɣla ƒe nudzɔdzɔwo fia, gake mate ŋu aɖe mɔ na ga zazã o.

Gbugbɔxɔxɔ hiã be nànɔ gazazã ƒe mɔɖeɖe nyuitɔ kple mɔ si wole kpɔm fifia na gaƒuƒoƒo si le gaawo ɖe asi. Lé wò gbugbɔxɔnuwo ɖe ɣaɣla me eye mèna gadzraɖoɖi nyawo, gazazãsafuiwo, alo gakotoku ƒe faɛlwo na ame si nèle dzi o o.

# Dedie kple Dɔmeɖeɖe

Ele vevie be zazalawo nase afɔku siwo le asisi ƒe safuiwo wɔwɔ me la gɔme eye woalé safui siawo ɖe asi tso mɔxɔlawo ƒe adɔmeɖeɖe gbɔ. Gaawo ƒe dedie ɖo ɖe zazala la ƒe dɔmeɖeɖe be wòalé eƒe asisi ƒe safuiwo ɖe asi.

## Xoxotɔ ɣaɣla ƒe gaawo: Sprout, Sapling kple Orchard

Xoxotɔ ɣaɣla ZECwo ate ŋu ahiã be woatrɔ wo le gbugbɔxɔxɔ ƒe akpa me. Mɔ la ɖo ɖe ɣaɣla ƒe gaƒuƒoƒo si le gaawo ɖe asi fifia la ŋu.

> **Woɖo NU7 ɖe November 5, 2026.** Ne wòdze egɔme la, mɔ si le fifia be woato tso xoxotɔ Sprout gaƒuƒoƒo me la manɔ dɔ wɔm o.
>
> Ne Sprout gaƒuƒoƒo la me ZEC gale asiwò ha la, trɔe hafi woawɔ yeyetoto la. Ne wòdze egɔme vɔ la, dɔwɔnu siwo le fifia la mate ŋu atrɔ Sprout gaawo ayi Sapling, nuwo ƒe ʋuʋuɖi gaɖoƒe ƒe dzesiwo, alo afi bubu aɖeke o.
>
> Ne èle axa sia kpɔm **le NU7 wòdze egɔme vɔ** la, **Sprout tsɔ ɣe le tsi me** vaseɖe esime gbugbɔxɔxɔ ƒe mɔ bubu ava, si womeɖoe ɖeɖe fifia o.

## Ŋuɣi ɖeka ƒe ŋuɖoɖo

| Wò gaawo le | Trɔtrɔ ƒe mɔ | Nu si nàwɔ |
| --- | --- | --- |
| **Sprout** | **Sprout → Sapling → Ironwood** | Ne `wallet.dat` le asiwò alo Sprout gazazãsafui si le eɖokui ŋu la, kpɔ Argos gbugbɔxɔxɔ ƒe mɔ si le fifia la gbã. Ne Argos mesɔ o la, zã xoxotɔ sidecar mɔ la le field guide blibo la me. Sprout naɖo Sapling gbã, afi ma megbe wòayi Ironwood. Mɔ sia hiã be woawɔe kaba elabena NU7. |
| **Sapling** | **Sapling → Ironwood** | Sprout gbugbɔxɔxɔ ƒe nɔnɔme mehiã o. Zã gakotoku yeyetɔ si ate ŋu agbugbɔa alo azã wò Sapling akɔnt si tututu, eye wòate ŋu awɔ Ironwood gaɖoɖowo. Ironwood ƒe kpekpeɖeŋu ɖeka koe mele afia be xoxotɔ-Sapling gbugbɔxɔxɔ ƒe kpekpeɖeŋu le o. |
| **Orchard** | **Orchard → Ironwood** | Orchard nye mɔ si ato dzo ɖeko. Zã gakotoku si sɔ kplee ƒe Orchard-yi-Ironwood trɔtrɔ ƒe mɔ si wolé ɖe eme. Kpɔ [Gaawo si woɖe gbugbɔIronwood gaƒuƒoƒo la](#recovered-funds-and-the-ironwood-pool). |

### Biabia atɔ̃ ƒe ŋuɖoɖo ƒe mɔ

1. **E nye Sprouta?** Gadzraɖoɖi nya ɖeka fia be gbugbɔxɔxɔ ƒe mɔ si tso Sapling/Orchard-ƒe ɣeyiɣi me la koe, menye Sprout o. `zc...` gaɖoƒe ƒe dzesi, alo gakotoku si woɖe gbugbɔ eye wògblɔ be Sprout ƒe ga le eme la fia Sprout.
2. **Gbugbɔxɔnu kae le asiwò?** Di `wallet.dat`, kɔmputa xoxo alo datadir, `z_exportwallet` ƒe backup, alo Sprout gazazãsafui si woɖe tso eme. `zc...` gaɖoƒe ƒe dzesi ɖeka mede o.
3. **Argos alo xoxotɔ sidecar la?** Ne `wallet.dat` le asiwò alo Sprout gazazãsafui si le eɖokui ŋu, eye wòdi be gaawo nadzo ɖekaɖeka la, kpɔ [Argos](#zecwallet-lite-and-legacy-wallet-recovery-with-argos) gbã. Zã xoxotɔ sidecar mɔ la le field guide blibo la me ne Argos mate ŋu awɔ dɔ kple nuawo o, alo ne èdi be gbugbɔxɔxɔ ƒe ƒoƒo blibo la nanɔ wò ŋutɔ ƒe dzikpɔkpɔ te.
4. **zcashd datadir si woɖo ɖeɖe, eye womexɔ akpa aɖeke ɖa le edzi ha le asiwò?** Esia le vevie na xoxotɔ sidecar mɔ la ko. Kɔ node ƒe nyawo nenye be woɖo egɔme nyuie vɔ; ne menye nenema o la, field guide la ɖe snapshot/from-scratch mɔwo fia.
5. **Afika gaawo ayi?** **Ironwood.** Sprout toa Sapling me gbã elabena Sprout-yi-Ironwood gaɖoɖo ƒe mɔ tẽ ɖeka mele o. Mègatsi Sapling o.

### ZEC Pool Trɔtrɔ ƒe Field Guide Blibo

Na trɔtrɔ ƒe nusiwo katã ƒe nɔnɔme blibo, si me gbugbɔxɔxɔ ƒe mɔwo, sededewo, adzɔwo, hardware ƒe hiahiãwo, ɣaɣla ƒe nudzɔdzɔwo, fɔfɔwo ƒe dzɔdzɔ, kple nyaƒoɖoƒewo le la, xlẽ field guide blibo la.

**Version 1.1 · Woɖe yeyee September 18, 2026**

[Xlẽ ZEC Pool Trɔtrɔ ƒe Field Guide Blibo le ZecHub](/research/zec-pool-migration/view)

> **Hafi nàdze egɔme:** Ɖe ŋgɔ, nya **nu si nèle gbugbɔxɔm kple gbugbɔxɔnu siwo gale asiwò**. Gakotoku yeyetɔ ƒe gadzraɖoɖi nya alo gazazãsafui si sɔ si menye Sprout o ate ŋu ahiã gbugbɔxɔxɔ normale ko. Nu xoxowo — abe Zecwallet Lite gadzraɖoɖi nya, xoxotɔ `wallet.dat`, alo Sapling alo Sprout gazazãsafui si le eɖokui ŋu ene — ate ŋu ahiã gbugbɔxɔxɔ ƒe mɔ tɔxɛ.
>
> Ne èbu be gaawo le **Sprout** me la, kpɔ ɖa be gazazã ƒe mɔɖeɖe gale asiwò hafi nàtsɔ ɣeyiɣi ade gbugbɔxɔxɔ me. `zc...` gaɖoƒe ƒe dzesi alo nukpɔnu ɖeka mede be nàzã gaawo o.
>
> **YWallet megakpea ɖe Zcash ŋu o le Ironwood megbe.** Zã **Zkool** na gbugbɔxɔxɔ normale siwo menye Sprout o, tso gadzraɖoɖi nyawo kple safui siwo wole kpɔm me. Zã **Argos** na Zecwallet Lite gbugbɔxɔxɔ, gakotoku ƒe faɛl xoxowo, kple Sapling/Sprout gazazãsafui siwo le woɖokui ŋu. Na Sprout la, Argos nye mɔ gbã si nàkpɔ; field guide blibo la ƒo xoxotɔ sidecar mɔ si ate ŋu adze woƒe anyi.
>
> Zã kplɔ la le ete, ɖo ɖe **nu si tututu le asiwò** ŋu, menye gbugbɔxɔxɔ ƒe dɔwɔnu si nèɖo ŋku be èzã la o.

| Nu si le asiwò | Dze egɔme kple esia |
| --- | --- |
| Gadzraɖoɖi nya alo **gazazãsafui si wole kpɔm si menye Sprout o** tso gakotoku yeyetɔ alo gakotoku si wowɔ dɔ kple va yi, si me xoxotɔ YWallet Zcash nuwo hã le | [Zkool](#fund-recovery-with-zkool) |
| **Nukpɔsafui ɖeka ko** | Zkool ate ŋu aɖe nukpɔsafui siwo sɔ kplee wo ge eme na xlẽ ƒe mɔ ɖeka, gake nukpɔsafui mate ŋu aɖe mɔ na gbugbɔxɔxɔ ƒe gazazã o. Di gadzraɖoɖi nya alo gazazãsafui si sɔ kplee. |
| Nya 24 ƒe **Zecwallet Lite** gadzraɖoɖi nya | [Argos](#zecwallet-lite-and-legacy-wallet-recovery-with-argos) |
| Zecwallet Lite alo zcashd `wallet.dat`, alo Sapling / Sprout gazazãsafui si le eɖokui ŋu | [Argos](#zecwallet-lite-and-legacy-wallet-recovery-with-argos). Le September 18, 2026 la, v1.3.0 nye version yeyetɔ eye wòsɔ wu; zã v1.2.0 alo si le eƒe megbe na `wallet.dat` kple Sprout gbugbɔxɔxɔ. |
| Sprout nu si Argos mate ŋu awɔ dɔ kplee o, alo gbugbɔxɔxɔ si nèdi be xoxotɔ akpawoe nanɔ wò ŋutɔ ƒe dzikpɔkpɔ te | Zã xoxotɔ sidecar mɔ la le [field guide blibo la](/research/zec-pool-migration/view) me. |
| Gadzraɖoɖi nya alo gazazãsafui si wɔ dɔ mele o, gake mɔ̃ ƒe nu si woɖe kɔ, nyaŋlɔɖe si wogbeŋu, alo disk si gblẽ le asiwò | [Dɔwɔla ƒe gbugbɔxɔxɔ](#professional-recovery-when-you-do-not-have-the-seed). Mègana gadzraɖoɖi nya alo gazazãsafui si wɔ dɔ na ame si va ƒo nu kpliwò makpɔ o. |

## Ga Gbugbɔxɔxɔ kple Zkool

[Zkool](https://github.com/hhanh00/zkool2/releases) nye Zcash ƒe successor si wole kpɔm tso mɔ̃ ƒe ɖoɖoŋlɔla ma ke gbɔ, si nye YWallet. Ekpea ɖe nuwo ƒe ʋuʋuɖi kple ɣaɣla yeyetɔ ƒe gbugbɔxɔxɔ mɔwo ŋu, si me xoxotɔ Sapling safuiwo le, gake **menye Sprout o**.

Nɔnɔme eve koe woƒo le afii:

1. **Akɔnt gbugbɔxɔxɔ** tso gadzraɖoɖi nya, asisi ƒe safui, alo nukpɔsafui me
2. **Ga ƒoƒo** tso gakotoku si mekpena ɖe nuwo ƒe ʋuʋuɖi gaɖoƒe ƒe dzesiwo ŋu ko me

### 1) Akɔnt Gbugbɔxɔxɔ

1. Ɖo Zkool tso [releases axa](https://github.com/hhanh00/zkool2/releases) me eye nàʋu eme
2. Le **Account Manager** (axa gã) la dzi, ƒo asi le **+** button la ŋu be nàyi **New Account** screen la dzi
3. Ɖe **Account Name** eme be nàanya akɔnt sia
4. Ɖe **Restore Account?** dzi. Esia aɖe safui kple dzidzi ƒe kɔkɔƒe ƒe fieldwo afia
5. Ɖe wò safui la eme le **Key (Seed Phrase, Private Key, or Viewing Key)** me. Zkool xɔa gadzraɖoɖi nyawo, Sapling ƒe ɣaɣla safuiwo, nuwo ƒe ʋuʋuɖi safui didiwo, kple nukpɔsafui siwo sɔ kplee. Nukpɔsafui na xlẽ ƒe mɔ ko eye mate ŋu aɖe mɔ na gazazã o.
6. Ɖe **Birth Height** eme na akɔnt xoxo. Zkool metɔa gaɖoɖowo ŋkɔm le kɔkɔƒe sia ƒe ŋgɔ o, eyata tia kɔkɔƒe si le gakotoku la ƒe dɔwɔwɔ gbã ƒe ŋgɔ ne nèle nyaŋu o. Dzidzi ƒe kɔkɔƒe si woɖo le megbe akpa na gaɖoɖo nyuitɔwo awɔ abe woɣe o ene.

![Zkool New Account screen with Restore Account and Advanced Options both turned on](/content-images/zkool-restore-account-60b1d2777e.webp)

7. Ɖo akɔnt la ɖe asi, eye nàwɔ sync kplii

### Gadzraɖoɖi nya gbugbɔxɔxɔ tso gakotoku bubu me

Ne gadzraɖoɖi nya la tso gakotoku si wɔa ɖe ZIP 316 nu la me — si me ZODL (tsã Zashi), Zingo, alo zcashd le — ɖe **Advanced Options** dzi eye nàdɔ **Use Internal Change** hafi nàɖoe ɖe asi.

ZIP 316 zãa gaɖoƒe ƒe dzesi le eme tɔxɛ na internal/change. Ne èɖe akɔnt sia gbugbɔ meke **Use Internal Change** o la, change outputwo ate ŋu awɔ abe woɣe ene, gake gaawo gale afi ma.

Field eve bubu le **Advanced Options** te:

- **Extra Passphrase (optional)**, ne gakotoku gɔmedzedze tɔ la zãe ko
- **Account Index**, ne akɔnt geɖewo nɔ gadzraɖoɖi nya ɖeka dzi le gakotoku gɔmedzedze tɔ la me. Gaawo ate ŋu anɔ index bubu te

> **Eve sia doa afia ne gadzraɖoɖi nya nyui le Key field la me ko.** Ne field la mã, alo asisi safui alo nukpɔsafui le eme la, Zkool fiaa **Use Internal Change** kple **H/W Ledger** ko. Ɖe gadzraɖoɖi nya la eme gbã, eye nàʋu Advanced Options.

### 2) Ga Ƒoƒo Tso Gakotoku Si Zãa Nuwo Ƒe Ʋuʋuɖi Gaɖoƒe Ƒe Dzesi Ko Me

Ne gakotoku xoxo alo akɔnt la lé **nuwo ƒe ʋuʋuɖi ZEC ko** la, ɖe akɔnt la gbugbɔ gbã, di nuwo ƒe ʋuʋuɖi gaɖoƒe ƒe dzesi siwo katã woza, eye nàtrɔ gaawo ayi ɣaɣla ƒe afi yeyetɔ si nèkplɔ le. Mègabu be gakotoku ƒe ŋkɔ xoxo ɖeɖe zãa nuwo ƒe ʋuʋuɖi gaɖoƒe ƒe dzesi ko o; product aɖewo kpe ɖe ɣaɣla ƒe kpekpeɖeŋu ŋu le versionwo me megbe.

1. Ɖe akɔnt la gbugbɔ kple afɔɖeɖe siwo le etɔ̃
2. Ʋu akɔnt la eye nàyi **Receive Funds** axa dzi
3. Ƒo asi le magnifying glass si le xɔta la dzi (**Find other transparent addresses**). Gakotoku siwo trɔa gaɖoƒe ƒe dzesiwo, abe Ledger kple Exodus ene, wɔa nuwo ƒe ʋuʋuɖi gaɖoƒe ƒe dzesi geɖe tso gadzraɖoɖi nya ɖeka me, eye esia di esiwo le gaawo ɖe asi.
4. **Wɔ reset eye nàsync akɔnt la emegbe.** Gaɖoƒe ƒe dzesi yeye siwo woɖe kpɔ la akpɔ woƒe ga balancewo le scan si kplɔe ɖo ko, eyata ne èto afɔɖeɖe sia dzi la, wòawɔ abe sweep la mede nu aɖeke o ene.
5. Yi **Send** axa dzi. Le balance la ƒe ŋu la, icon button atọ le afi ma. Ŋkɔwo mele wo dzi o, eyata dzra asi ɖe wo dzi alo te asi didi be nàkpɔ woƒe ŋkɔwo:
   - **Shield One** (ɣaɣla ƒe dzesi si ŋɔm) trɔa nuwo ƒe ʋuʋuɖi gaɖoƒe ƒe dzesi ɖeka le ɣeyiɣi ɖeka me
   - **Shield All** (ɣaɣla ƒe dzesi si yɔ) trɔa nu katã tso nuwo ƒe ʋuʋuɖi gaɖoƒe ƒe dzesiwo katã me ɖe ɣeyiɣi ɖeka me
   - **Unshield All** (padlock si ʋu) trɔa nu la yi akpa bubu, ɖe nuwo ƒe ʋuʋuɖi gaɖoƒe ƒe dzesi me

> **Shield One nye tiaƒe si me ɣaɣla le wu.** Ne ètrɔ gaɖoƒe ƒe dzesi geɖe le gaɖoɖo ɖeka me la, amewo ate ŋu akpɔ le ɖoɖonu dzi be ame ma ke ƒe tɔwoe. Zkool ɖe ŋku dzedze ku ɖe esia ŋu le eɖokui ŋutɔ me hafi wòawɔ Shield All.

6. Kpɔ gaɖoɖo la nyuie eye nàɖoe ɖa

Unshield All le vevie ne nèdi ga le gatrɔƒe si xɔa nuwo ƒe ʋuʋuɖi gaɖoƒe ƒe dzesiwo ko me. Shielding buttonwo doa afia ne ɣaɣla ƒe gaɖoƒe ƒe dzesi le akɔnt la me, eye Unshield All doa afia ne nuwo ƒe ʋuʋuɖi tɔ le eme.

## Zecwallet Lite kple gakotoku xoxo ƒe gbugbɔxɔxɔ kple Argos

[Zecwallet Lite](https://github.com/adityapk00/zecwallet-lite) womaga kpɔm o eye woɖe eƒe repository ɖe archive me. Eƒe gadzraɖoɖi nya ƒe derivation to vovo na nɔnɔme si gakotoku yeyewo zãa, eyata ne èɖe nya ma ke eme le gakotoku yeyetɔ me la, wòate ŋu aɖi gaawo si le Zecwallet Lite ƒe gaɖoƒe ƒe dzesi bubu siwo woɖe tso eme me. [Argos](https://argos.sovright.com), tso Sovright, nye desktop gbugbɔxɔxɔ ƒe dɔwɔƒe si woɖo na esia kple xoxotɔ gbugbɔxɔxɔ ƒe nɔnɔme bubuwo.

Argos xlẽa Zecwallet Lite gadzraɖoɖi nyawo kple gakotoku ƒe faɛlwo, zcashd `wallet.dat`, Sapling extended gazazãsafui siwo le woɖokui ŋu, kple Sprout gazazã ƒe nuwo. Na Sprout la, Zecwallet Lite gadzraɖoɖi nya ɖeka mede o elabena woɖe safui siawo tso afi bubu. Argos nye gbugbɔxɔxɔ ƒe dɔwɔnu, menye gakotoku si nàzã gbe sia gbe o: kpɔ source nuwo le afi si nèle, scan wo, eye nàƒo wo ayi gakotoku si wole kpɔm si nèkplɔ le.

Least Authority [kpɔ dɔwɔnu la nyuie](https://argos.sovright.com/assets/least-authority-argos-audit-2026-06-29.pdf). Gbugbɔxɔxɔ ŋutɔ nye fɛɛ. Donation si wòdi o na Sovright ate ŋu ado afia le sweep la me.

> **Mègatsɔ gadzraɖoɖi nya ɖe website aɖeke me o.** Argos site la nye download kple [zazala ƒe mɔfia](https://argos.sovright.com/guide.html) ko. Safuiwo nɔ signed desktop app la me. Woƒea verification le afi si nèle ɖe BIP-39 checksum la ŋu. Gadzraɖoɖi nya ƒe field la ƒea ɖa ne scan la dze egɔme. Ame sia ame si aɖo gbe na wò bia gadzraɖoɖi nya ma be "wòakpe ɖe wò ŋu nàxɔ wò gaawo gbugbɔ" la le wòɖam.

### Hafi nàʋu Argos

1. Ɖo desktop app la tso [official Argos site](https://argos.sovright.com) alo [GitHub releases axa](https://github.com/sovright/argos/releases) me. Kpɔ checksumwo alo asidede agbalẽ tewo nyuie ne woɖe wo afia.
2. Zã Argos release yeyetɔ. Le September 18, 2026 la, **v1.3.0** nye version yeyetɔ eye wòsɔ wu. Zã **v1.2.0 alo si le eƒe megbe na `wallet.dat` kple Sprout gbugbɔxɔxɔ**. Build siwo le 1.1.0 ŋgɔ ate ŋu awɔ scan ha, gake wɔa sweep si le Ironwood ŋgɔ, si network la gbee; trɔ version la eye nàgage.
3. Wɔ dɔ le mɔ̃ si nèka ɖe edzi. Di full-disk encryption. Mègama screen-share ne gadzraɖoɖi nya, passphrase, alo gazazãsafui le afia o.
4. Ɖo Unified Address siwo ƒe afi le gakotoku si wole kpɔm si nèkplɔ le, abe [ZODL](https://zodl.com/) ene, ɖe asi. Ɖo kpe edzi le gakotoku ma me hafi nàɖe eme le Argos me.

### Gadzraɖoɖi nya ƒe gbugbɔxɔxɔ

1. Ʋu Argos eye nàtia **I have my 24-word seed phrase**. Gadzraɖoɖi nya ƒe gbugbɔxɔxɔ mehiã gakotoku ƒe faɛl o.
2. Ɖe nya la eme eye nàzi **Validate seed**. Ne wògblɔ be gadzraɖoɖi nya la nyo la, yi edzi.
3. Ɖe **birthday block height** eme, alo ɣeyiɣi si sɔ kple esia wu si wo wɔ gakotoku la. Kɔkɔƒe si le ŋgɔ wu la nana dɔ la hena yi, gake ele dedie wu be nàbu be ɣeyiɣi la late.
4. Le server controlwo te, zã current-server preset la, alo nàɖe lightwalletd URLwo eme. Woɖoa URL siwo woɖe kple comma ɖe teƒe nu le woƒe ɖoɖo me. Public kpɔɖeŋuwo:

   `https://zec.rocks:443,https://zec-node.cakewallet.com:443,https://na.zec.rocks:443`

5. Ɖe Unified Address si wòdi be gaawo nayii la eme.
6. Ƒo asi le **start scan** ŋu. Esia ate ŋu axɔ minutiwo alo ŋkeke, ɖo ɖe birthday height la ŋu. Àte ŋu atsɔ dɔ la aɖi eye nàʋu workspace ma ke ake; scan la agayi edzi.
7. Ne scan la wu la, kpɔ balancewo, adzɔ ƒe akaka, kple afi si gaawo ayi nyuie, eye nàƒo asi le **sweep** ŋu.

Sweep ƒe broadcast manɔ gbugbɔm o. Lé gakotoku ƒe faɛl gɔmedzedze tɔ ɖe asi vaseɖe esime woƒo gaƒuƒoƒo siawo katã eye gakotoku si gaawo yi la fia ga si wòlala. Ne gbugbɔxɔxɔ la wu la, ɖe xoxotɔ ɣaɣla ƒe nuwo ɖa le dɔ me tɔxɛ, ɖe teƒe be nàga zã wo na dɔ yeye.

### Gakotoku ƒe faɛlwo kple safui siwo le woɖokui ŋu

Le welcome screen la dzi, **I have a wallet file** kpea ɖe Zecwallet Lite faɛl, zcashd `wallet.dat`, alo Sapling extended gazazãsafui siwo le woɖokui ŋu ŋu. Sprout gazazãsafui ƒe gbugbɔxɔxɔ si le eɖokui ŋu woɔa wɔe kple Argos ƒe Sprout gbugbɔxɔxɔ ƒe mɔ/CLI.

Argos xlẽa gakotoku ƒe faɛlwo meke wòatrɔ wo o. Ne woɣla gakotoku la kple ɣaɣlaŋlɔŋlɔ la, ɖe passphrase la eme ne woɖabia; wozae le memory me eye wometsɔe ɖo disk dzi o. Kpɔ nuwo ƒe ʋuʋuɖi, Sapling, kple Sprout safui ƒe xexlẽwo nyuie hafi nàdzee egɔme.

Womexɔa nukpɔsafuiwo na sweep o elabena womate ŋu aɖe mɔ na gazazã o.

### Sprout ƒe didienuwo

Zecwallet Lite gadzraɖoɖi nya medzea Sprout safuiwo o. Woɖe safui siawo tso afi bubu. Xɔ Sprout gbugbɔ tso zcashd `wallet.dat`, alo tso gazazãsafui si le eɖokui ŋu le CLI me.

Ne file la xɔ didienu siwo ate ŋu woazã kple witness si woɖo ɖe cache me xoxo la, Argos ate ŋu ana **Sweep Sprout funds** be woawɔe meke chain scan o. Ne menye nenema o la, ate ŋu awɔ full-block scan si ate ŋu agayi edzi le P2P network la dzi. Scan ma gã eye wòle blewu. Checkpoint si wòŋlɔa la ate ŋu azã ga, eyata lé eɖe asi abe gakotoku gɔmedzedze tɔ ene.

Sprout ƒe ga ate ŋu aɖo Sapling me ko. Ne woɖo Sapling gaawo kpe edzi eye woate ŋu azã wo la, trɔ wo ayi **Ironwood** kple gakotoku yeyetɔ si kpea ɖe Sapling akɔnt si woɖe gbugbɔ la ŋu. Mègatsi Sapling o.

## Gaawo si woɖe gbugbɔ kple Ironwood gaƒuƒoƒo la

Tso esime Ironwood (NU6.3) yeyetoto la dze egɔme le July 28, 2026 la, Orchard gaƒuƒoƒo la nye ga zazã ko. Ga yeye aɖeke mate ŋu age eme o, eye ga si le eme la tsoa to gaɖoɖowo ƒe xexlẽdzikpɔɖeƒe la me yi Ironwood.

Ne wò gaawo si woɖe gbugbɔ le Orchard me la, trɔ wo ayi Ironwood kple **gakotoku yeyetɔ ƒe trɔtrɔ ƒe mɔ si wolé ɖe eme**. Orchard nye mɔ si ato dzo ɖeko le NU6.3 megbe.

Zkool 6.30.0 nye version yeyetɔ le September 18, 2026 eye wòkpea ɖe Ironwood ŋu. Eƒe trɔtrɔ ƒe nɔnɔme ɖo ɖe ɣaɣla ŋu, gake menye be wògblɔ be ZIP 318 ƒe nɔewo wɔe o. Gakotoku yeyetɔ bubuwo ate ŋu azã ZIP 318-ƒe nɔnɔme ƒe trɔtrɔ si woɛ ɖe akpaakpa me. Dze gakotoku si nèɖo la ƒe trɔtrɔ screen kple release note yeyewo yome, ɖe teƒe be nàwɔ ga ƒe home alo ɣeyiɣi ƒe ɖoɖo le asi.

Trɔtrɔ si woɛ ɖe akpaakpa me ate ŋu azã gaɖoɖo geɖe, eyata adzɔ ƒe katã ate ŋu agate wu transfer ɖeka ƒe tɔ.

> **Trɔtrɔ ƒe ga ƒe homewo nye duto ƒe nusiwo.** Ne ga toa gaɖoɖowo ƒe xexlẽdzikpɔɖeƒe la me la, ga ƒe home kple gaɖoɖowo ƒuƒoƒe ƒe kɔkɔƒe doa afia ɖoɖonu dzi, togbɔ be ame si dɔ ga la kple ame si xɔe la gale ɣaɣla me. Zã gakotoku la ƒe private/staged trɔtrɔ ƒe nɔnɔme si wolé ɖe eme ne ɣaɣla le vevie, eye nàzã network ƒe ɣaɣla abe Tor alo ɣaɣla ƒe akpa si nèka ɖe edzi ene, ne wòsɔ. Network ƒe ɣaɣla ate ŋu aɣla wò IP ƒe kadodo; megbea ga ƒe home si toa afi ma me o.

## Gbugbɔxɔxɔ Koko kple ZExCavator

[ZExCavator](https://github.com/zingolabs/zexcavator) nye Zingo Labs gbugbɔxɔxɔ ƒe dɔ si **wogale wɔm**, si ɖo ta fifia ɖe Zecwallet Lite gakotoku ƒe faɛlwo kple gakotoku ƒe format trɔtrɔ ŋu. Eƒe README fiaa ga gbugbɔxɔxɔ zazalawo be woazã **Zingolib** export option la, esi ZeWIF ƒe kpekpeɖeŋu blibo gale wuwum.

Bu be enye dɔwɔnu na nɔnɔme sesẽwo alo nɔnɔme siwo menye gbegbe o, menye mɔ gbugbã na gbugbɔxɔxɔ o. Na Zecwallet Lite gadzraɖoɖi nya normalewo, gakotoku ƒe faɛlwo, zcashd `wallet.dat`, kple gazazãsafui siwo le woɖokui ŋu si sɔ kplee la, kpɔ Argos gbã. Kpɔ nu sia ame si ZExCavator ɖe gbugbɔ la nyuie le gakotoku si wole kpɔm me hafi nàka ɖe edzi.

## Dɔwɔla ƒe gbugbɔxɔxɔ ne gadzraɖoɖi nya mele asiwò o

Ne gadzraɖoɖi nya alo safui la bu la, gbugbɔxɔxɔ si nàwɔ le wò ŋutɔ ƒe mɔ̃ dzi mate ŋu adze egɔme o. Ame aɖewo siwo le nɔnɔme ma me zãa dɔwɔla ƒe gbugbɔxɔxɔ ƒe company na nyaŋlɔɖe siwo woŋlɔ beŋu, hardware ƒe gbegblẽ, alo disk siwo womate ŋu axlẽ o.

Mɔ sia menye nu ma ke kple gadzraɖoɖi nya si gale asiwò gbugbɔxɔxɔ o. Mègana gadzraɖoɖi nya si wɔ dɔ na ame si gblɔ be yòaxɔe gbugbɔ na wò o. Service sia ƒe scam version le dzidzɔ.

[Unciphered](https://unciphered.com) nye company ɖeka si wɔa dɔ sia le eŋutɔ ƒe afi eye mediawo abe Wired ene ƒo nu tsoe. Wo nye crypto gbugbɔxɔxɔ ƒe service gbogbo, menye Zcash-tɔxɛ ƒe dɔwɔnu o, eye woɖe ga na dɔ la. ZecHub mekpea ɖe gbugbɔxɔxɔ ƒe company aɖeke ŋu o. Ne èto mɔ sia dzi la, kpɔ official domain la le wò ŋutɔ ƒe mɔ nu eye bu be ame sia ame si aɖo DM na wò gbã la nye scammer.

Ne gadzraɖoɖi nya alo gazazãsafui si wɔ dɔ gale asiwò la, dze egɔme kple gbugbɔxɔxɔ si nàwɔ le wò ŋutɔ ƒe mɔ̃ dzi abe Zkool alo Argos ene.

## YWallet womaga kpɔm o

YWallet nye gbugbɔxɔxɔ ƒe dɔwɔnu si woɖoe le axa sia dzi na ɣeyiɣi didi, eye mɔfia xoxowo geɖe galia eme.

Eƒe mɔ̃ ƒe ɖoɖoŋlɔla gblɔ fifia be YWallet megakpea ɖe Zcash ŋu o tso Ironwood yeyetoto la me, eye wòfia Zcash zazalawo be woazã **Zkool**, successor si wole kpɔm. Lé YWallet gadzraɖoɖi nya/safui ƒe nu xoxowo ɖe asi, gake megadze Zcash trɔtrɔ yeye egɔme le YWallet me o.

Ne YWallet ƒe Zcash gbugbɔxɔnu le asiwò xoxo la, ɖe egbugbɔ le Zkool me kple gadzraɖoɖi nya/safui ƒe mɔ si wòkpea ɖe edzi si le etɔ̃.

## Axawo si kplɔe ɖo

- [Gakotokuwo](/using-zcash/wallets) - gakotoku kae woɖe asi le eye woƒe Ironwood ƒe nɔewo, si me Argos le
- [Ironwood](/zcash-tech/ironwood) - nu si yeyetoto la trɔ kple nu ka ta gaawo trɔ
- [Nya kpuiwo](/using-zcash/memos) - ale si nya kpui si woɣla kple ɣaɣlaŋlɔŋlɔ wɔa dɔ ene
- [Nukpɔsafuiwo](/zcash-tech/viewing-keys) - xlẽ ƒe mɔ ɖeka meke gazazã ƒe ŋusẽ o
- [Lightwallet Nodes](/zcash-tech/lightwallet-nodes) - duto ƒe lightwalletd endpoint siwo Argos ate ŋu azã
- [Argos zazala ƒe mɔfia](https://argos.sovright.com/guide.html) - mɔfia official tso Sovright
- [Naomi Brockwell ku ɖe gbugbɔxɔxɔ ƒe dɔwɔnuwo ŋu](https://x.com/naomibrockwell/status/2079146521405333526) - Argos ƒe mɔfia kple nya kpui ku ɖe dɔwɔla ƒe gbugbɔxɔxɔ ŋu
