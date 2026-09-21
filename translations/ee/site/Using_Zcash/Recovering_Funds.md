<a href="https://github.com/Zechub/zechub/edit/main/site/Using_Zcash/Recovering_Funds.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash Gadzraɖoƒe ƒe Ga Gbɔ Kpɔkpɔ

** Nukatae wòle be nàdzra wò nu siwo nèfɔ la ɖo?**

Seeds, expense keys (ƒle nu), viewing keys kple wallet files menye wo nɔewo tɔ o. A seed phrase ate ŋu ana woazu gaƒoɖokuigbalẽvi na gaƒoɖewo geɖe gake meɖɔa xoxo ɖe sia ɖe ɖo o. Eye a view key tea ŋu ɖea nusiwo le dedie fiana evɔ mate ŋu ade asi gazazã dzi o.

Gbugbɔgaxɔ nɔ te ɖe ga si ame aɖe zãna ƒe ŋusẽ kple mɔ siwo dzi wotona kpɔa gaawo ta la ŋu. Mègana amewo nanya nu tso nusiwo nèzã na wò o, eye mègatsɔ nudzidzenuwo, gazazã ŋuti safuiwo alo gakpɔgbalẽviwo ɖo asii gbeɖe kple amesi meka ɖe dziwò o.

# Dedienɔnɔ Kple Agbanɔamedziwɔwɔ

Ele vevie be amesiwo zãa mɔnu sia nanya afɔku siwo le eme ne wole nu wɔm kple woƒe private keys eye woana woakpɔ mɔ na nya siawo. Ame bubuwo ƒe ga ŋuti dedienɔnɔ nɔ te ɖe alesi ame si zãm la akpɔ eƒe private key dzii ŋu.

## Legacy shielded funds: Sprout, Sapling and Orchard

Ate ŋu ahiã be woatrɔ asi le ZEC siwo dzi wotrɔ ɖo xoxo la ŋu ne wole agbagba dzem be yewoagbugbɔ ga siawo aɖo teƒe ɖeka. Mɔ si nu woawɔ esia ato anɔ te ɖe ale si nudzraɖoƒe aɖe ƒe gadzraɖoƒea léa ga mawo me ɖe asii dzi.

> ** NU7 le ɖoɖo nu be yeava November 5, 2026.** Ne eɖe mɔ ko la, ʋuʋu ƒe mɔnu si li fifia tso Sprout tsiƒula xoxoa me adzudzɔ dɔwɔwɔ.
>
> Ne ZEC gale wò Sprout ƒukpo me la, trɔe hafi nàtrɔ asi le eŋu. Le eƒe dɔwɔwɔ vɔ megbe la, dɔwɔnu siwo li fifia magate ŋu atrɔa ga si tso Sprout gbɔ ayi Sapling alo adrɛs bubu aɖeke o.
>
> Ne èle axa sia kpɔm le NU7 ƒe dɔwɔwɔ megbe la, ekema ** Woɖo dzudzɔ ɖe eƒe tsetsea me va se ɖe esime woagava zãe atsɔ akee emegbe o. Gake womele ɖoɖo wɔm fifia be woawɔ esia hafi o.

## Ŋuɖoɖoa le axa ɖeka dzi.

Wò ga le ʋɔtruwo me. Nu kae wòle be nàwɔ?
| --- | --- | --- |
| **Sprout** | **Sprout → Sapling → Ironwood** | If you have `wallet.dat` alo Sprout ƒe gaƒleƒe si le eɖokui si, dze agbagba be yeazã Argos-mɔ̃a gbã. Ne Argos mesɔ o la, zã mɔnu xoxo siwo dzi wotona yia teƒe bubuwo to mɔ sia me. Ele na Sprout be wòadze ɖe Sapling gbã hafi ayi Ironwood. Mɔ sia hiã ɣeyiɣi geɖe elabena NU7 li".
**Sapling**. **Sappling → Ironwood** . No Sprout recovery environment is needed. Use an current wallet that can both recover or spend your specific Sapling account and construct Ironwood transactions. Ironwood ƒe kpekpeɖeŋu ɖeɖe dzaa mefia be woxɔna ɖe blema-Saplin gbɔkpɔnu dzi o.
**Orchard**. **Orcord → Ironwood.* Orchard nye exit-only. Zã wallet si le eme fifia ƒe orchard yi ironwood migration flow la nàkpɔe: [Ga siwo woxɔ kple Ironwood ƒe gaƒoƒoa](#recovered-funds-and-the-ironwood-pool). |

### Nyabiase atɔ̃ ƒe nyametsotsowɔwɔ le ɖoɖo nu

1. **Is it Sprout?** A seed phrase alone points to a later Sapling/Orchard-era recovery path, not Sprout. A `zc...` dɔdzikpɔlawo ƒe dɔwɔƒe si le woƒe nutoa me, alo gaɖaka aɖe si ŋu woɖɔ ɖo eye wòna nyatakaka be Sprout tɔ kpɔtɔ la fiaa mɔ ɖe Sprout.
2. ** Nukawoe le asiwò siwo ŋu woate ŋu awɔ dɔ ɖo?** Di wo. `wallet.dat`, kɔmpiuta xoxoa alo nyatakakawo dzraɖoƒe, a. `z_exportwallet` Aɖewo hã le eme. `zc...` Nyatakakadzraɖoƒea ɖeɖe mesɔ gbɔ o.
3. **Argos alo ʋua ƒe akpa si le megbe na ʋu la?** Ne ènyae be ame aɖe li, ke nya lae nye: `wallet.dat` alo eya ŋutɔ ƒe Sprout-ƒleɖevi eye nèdi be yeaxe ga la ko, te kpɔ [Argos](#zecwallet-lite-and-legacy-wallet-recovery-with-argos) gbã. Zã mɔ si dzi wotrɔ ɖo le teƒe siwo woato la ne Argos mate ŋu awɔ nu kple nua o alo be wò ŋutɔ nàkpɔ nuwo gbɔ nyuie hafi ate ŋu atso ɖe eŋu.
4. ** Èle zcashd datadir si womedzra ɖo o la ŋua?** Esia le vevie na sidecar mɔ xoxoa ko. Kɔli nuƒolanɔƒe ƒe nyatakakawo ne woxe dɔ me nyuie vɔ; ne menye nenema o, teƒefiagbalẽa aƒo nya ta ɖe foto/tso gɔmedzedze ŋuti tiatiawo ŋu.
5. Afikae ga la yina? Atikutsetsewo toa Sapling dzi gbã elabena dɔ aɖeke meli si tso Sprout yi Ironwood me tẽ o. Mègayi ɖe Sapling gbɔ ko o.

### ZEC Ƒuƒoƒo ƒe Ʋunuwɔwɔ Ŋuti Mɔfiagbalẽ Blibo la

Ne èdi be yeakpɔ ʋuʋu ŋuti nyatakakawo katã, siwo me nuwo ɖɔɖɔɖo ƒe mɔ vovovoawo le, sededewo, fewo, dɔwɔnu si hiã la, ameɖokui ŋu nya gbɔ kpɔkpɔ, kuxiwo gbɔ kpɔname kple nuŋlɔɖi tso afisi woxɔa nyawo tsoe hã le la, xlẽ agbalẽ bliboa.

** Version 1.1 · Updated September 18, 2026** Eʋegbe me tɔ siwo le afisia ƒe ŋkɔwo nye:

[Xlẽ ZEC ƒe Mɔfiamenuwo katã le ZecHub dzi.](/research/zec-pool-migration/view)

> ** Hafi nàdze egɔme:** gbã la, ɖo nu siwo le dzadzraɖo me kple nusiwo ŋu nègale nuwo ɖɔlim ɖo ɖi. Aƒletɔ ƒe domenyinu si li fifia alo esiwo menye Sprout-wo o ateŋu ahiã be woadzrae ake ko. Nu xoxo aɖewo abe ZecWallet Lite dome tɔ ene, aɖi tso blema ke `wallet.dat`, alo Sapling alo Sprout ƒe nuxexlẽdzesi si le eɖokui si  ate ŋu ahiã be woazɔ mɔ aɖe dzi atsɔ ake ɖe eŋu.
>
> Ne èbu be ga la le "Sprout" me la, ke kpɔ egbɔ be ŋusẽ kpɔtɔ le asiwò nàzãe hafi nàwɔ ɖoɖo ɖe eŋu. `zc...` me alo nu siwo dzi woakpɔ la ɖeɖe mesɔ gbɔ be woatsɔ gaawo ayii o.
>
> **YWallet megawɔa Zcash dzi o le Ironwood megbe.** Zãa **Zkool** na ame siwo menye Sprout-dɔlawo ƒe dzadzraɖo tso nuku kple safuiwo si ŋu wowɔ ɖoɖo ɖo la me. zãa **Argos** na ZecWallet Lite recovery, legacy wallet files, and standalone Sapling/Sprout spending keys. Le Sprout gome la Argos ye nye mɔ gbãtɔ si woadze; agbalẽ sia ƒo nu tso sidecar fallback xoxoawo ŋuti.
>
> Zã nu siwo le asiwò ŋutɔŋutɔ la nàtsɔ adzra ɖo ɖe esiwo nèŋlɔ ɖi ŋu, ke menye dɔwɔnu si dzi nèkpɔtɔ ɖoa ŋkui be yezãe o.

Èkpɔe. Dze egɔme tso afi sia.
| --- | --- |
◯ Nyagbe alo kpeɖeŋutɔ si menye Sprout o tso gaɖaka aɖe me, eye YWallet Zcash ƒe nu xoxowo hã le eme. [Zkool](#fund-recovery-with-zkool) |
A **viewing key only**. Zkool ate ŋu axɔ viewing keys siwo dzi woda asi ɖo be woaxlẽ ko, gake viewing key mate ŋu ana ŋusẽ ga si wozãna le nuwo xɔxɔ me o. Di nu gbãtɔ alo exɔlawo ƒe safui si sɔ nɛ la.
Nya 24 ƒe **ZecWallet Lite** si nye nuku. [Argos](#zecwallet-lite-and-legacy-wallet-recovery-with-argos) |
ZecWallet Lite alo zcashd `wallet.dat`, or a standalone Sapling / Sprout spending key | [Argos](#zecwallet-lite-and-legacy-wallet-recovery-with-argos). Tso September 18, 2026 dzi la, v1.3.0 ye li fifia eye eyae nye nyuitɔ; zã v1.2.0 alo esi va yi wu hena: `wallet.dat` Eye woɖɔ nuwo ɖo.
❑ Ŋlɔ nu siwo ŋu Argos mate ŋu awɔ naneke le o, alo nàŋlɔ nusiwo nèdi be yeawɔ la ɖe wò ŋutɔ tɔwò me. ▪ Zã teƒe si woazã mɔ̃ xoxoa ɖo atsɔ ato ʋua dzi ne èle ʋu kum to afi aɖe si ame bubuwo ate ŋu akpɔe le bɔbɔe wu. [Dɔwɔƒe Ŋuti Mɔfiagbalẽ Blibo aɖe](/research/zec-pool-migration/view). |
Nyatakakadzraɖoƒe alo nuƒleƒe aɖeke mele dɔ wɔm o, gake mɔ̃ si dzi woxe la le ʋuʋu ge, woŋlɔ adzameɖoɖo be, alo agba gblẽ. [Dɔwɔƒe si wɔa dɔ tso lãmesẽnyawo gbɔ kpɔkpɔ ŋu](#professional-recovery-when-you-do-not-have-the-seed)Mègaɖo dɔwɔɖui alo ga si nèzãna ƒe safui ɖe ame aɖe si ka asi ŋuwò le manyamanya me la gbeɖe o.

## Gaxɔle ɖe Zkool gbɔ

[Zkool](https://github.com/hhanh00/zkool2/releases) enye Zcash si va xɔ ɖe YWallet teƒe tso developer ma ke gbɔ. Edaa asi ɖe nu siwo me kɔna kple egbegbe nuwo ŋu, eye woxɔa Sapling-ƒlewo hã le eme gake **mehea Sprout o**.

Míadzro nɔnɔme eve aɖewo me le afisia:

1. **Akpaɖoɖo ƒe gbugbɔɖoanyi** tso nyagbe, private key alo viewing key dzi
2. **Axɔ ga le gakotoku si me wotea ŋu ʋua adrɛs siwo dzi woate ŋu akpɔ nu ɖo ko la me**

### 1) Akɔnta Ðɔɖɔɖo

1. Ðo Zkool le Internet dzi. [Nyatakakawo ƒe axa](https://github.com/hhanh00/zkool2/releases) eye nàʋui.
2. Le ** Account Manager** (ƒe akpa gãtɔ dzi) la, ka asi kpukpui si nye **+** ŋu be nàkpɔ nu siwo le afi sia.
3. Ŋlɔ **Adzesi si me Nudzraɖoƒe le** be nàde dzesi nyatakaka sia.
4. Ʋu **Gbugbɔ Account ɖo?**. Esia ana nàkpɔ nu vevi kple dzidzi ƒe kɔkɔme teƒewo
5. Mido mia key ɖe **Key (Seed Phrase, Private Key, or Viewing Key) me. Zkool lɔ̃na na seed phraseswo, Sapling secret keyswo, transparent extended keys kple supported viewing keys siwo le dzi la. A view key nye read-only eye mate ŋu ana mɔxeɖenu aɖeke o.
6. Ŋlɔ **Birth Height** ɖe wò blematɔ ƒe ŋkɔ me. Zkool medzroa blɔkiwo do ŋgɔ na dzidze sia o, eyata tia kɔkɔƒe aɖe si va yi hafi gaɖaka la nava wɔ dɔ zi gbãtɔ ne mèka ɖe edzi o. Dzidzi dzi didi le megbe akpa ate ŋu ana be adzɔnu ŋutɔŋutɔ nanɔ anyi abe esi mele eme o ene.

![Zkool New Account screen with Restore Account and Advanced Options both turned on](/content-images/zkool-restore-account-60b1d2777e.webp)

7. Dzra nyatakaka la ɖo, eyome wɔ ɖeka kplii

### Nuku aɖe gbugbɔgaɖoanyi tso gaɖaka bubu me

Ne ga la tso gakotoku si dze ZIP 316  siwo dometɔ aɖewoe nye ZODL (si woyɔna tsã be Zashi), Zingo, alo zcashd me  lɔ̃ **Advanced Options** eye nàʋu mɔ na **Use Internal Change** hafi adzra.

ZIP 316 zãa internɛt/trɔ̃ adrɛs si to vovo. Ne ègbugbɔ ɖo akɔnta siawo dometɔ ɖeka me evɔ mèzãe o la, ate ŋu ana be tɔtrɔ siwo wowɔ le gaŋutiɖoɖowo dzi nadze abe ɖe womele eme ene togbɔ be gakɔnuawo gale anyi hã.

Nudzɔdzɔ eve bubu le **Advanced Options**:

- **Extra Passphrase (ele be nàtiae)**, ne gaɖaba gbãtɔ zã ɖeka ko la koe wòate ŋu awɔ esia.
- **Adzesiwo ƒe Numedzodzro**, ne ga si le gakotoku gbãtɔa me la nye esi nɔ akɔntabubu geɖewo dzi ɖe nu ɖeka aɖe ŋu. Ga siwo anɔ eme ate ŋu anye esiwo woazã na numekɔkɔ bubu

> **Eƒe eve siawo dzena ne nyagbe si nye nuƒle le Key la me.** Ne teƒea mele ɖeke o, alo ameɖokui tɔ loo alo ŋkuʋuʋua li ko la, Zkool ɖea mɔ̃ siwo nye "Use Internal Change" kple "H/W Ledger" dzi. Tsɔe de kɔme gbã eye nàke ɖe Advanced Options ŋu.

### 2) Gawo Tsɔtsɔ Yi Gadzɛ aɖe si Dzi Nu Kekeake Le La Me

Ne gaɖaka alo akɔnta xoxoa nɔ **ZEC si me dza ko** la, gbugbɔ axa gbãtɔ ɖo anyi, di adrɛs siwo katã zãna eye nàtsɔ wo ayi teƒe bubu aɖe. Mègabu be gaƒoka xoxotɔ ƒe ŋkɔwo nye esiwo dzi dzena le gotagome ɖeɖe ko o; dɔwɔnu aɖewo tsɔ kpeɖeŋutɔ na nu bubuwo ɖe woƒe kɔpi yeyeawo ŋu.

1. Zã afɔɖeɖe siwo le etame nàtsɔ agbugbɔ axa la aɖo te
2. Ʋu wò account eye nàyi le axa si nye **Xɔ Ga** dzi.
3. Ʋu ʋeʋẽ si le dziƒoxɔ la ƒe akpa aɖe (** Find other transparent addresses **) Gaɖaka siwo trɔna ɖe adrɛswo ŋu, abe Ledger kple Exodus ene, wɔa dɔ tso nuku ɖeka me tsɔ dea dzesi adres gbogbo aɖewo eye esia kpena ɖe wo dometɔ siwo léa ga ɖi la ŋu.
4. **Gbugbɔ ɖoɖoa kple kadodoa me le ema megbe.** Adrɛs siwo ŋu woke ɖo ye nye esiwo ƒe ga susɔna la koe woakplɔ ayii ne wodzro eme ake, eya ta to esia dzi wɔwɔ ana wòadze abe naneke meli si wokpɔ o ene.
5. Yi ɖe axa si nye **Send**. Àkpɔ dzesivi etɔ̃ le teƒe siwo sɔ gbɔ na wo la ŋu. Womeŋlɔa nu aɖeke o, eyata zi edzi nàtsɔ nutrenu alo aɖabaƒoƒo didi aɖe aɖɔli woƒe ŋkɔwo:
   - **Kpɔkplɔ̃ Gbãtɔ** (kpɔkplɔa ƒe akpa si woɖe) ʋuna adrɛs ɖeka le ɣeyiɣi aɖe me
   - **Shield All** (ʋɔ̃kpo sesẽ) ʋuna nuwo katã tso adrɛs siwo me wodzena le la dometɔ ɖesiaɖe gbɔ zi ɖeka
   - **Menye Akɔkpae O All** (akpoxɔnu si le ʋuʋu) yia akpa bubu, yi adrɛs aɖe dzi.

> **Shield One nye tiatia si me ame aɖeke mele o.** Ne ètsɔ adrɛs geɖe le nu ɖeka aɖe wɔwɔ me la, ana amewo nakpɔe be amea tɔ ɖekae wonye. Zkool ŋutɔ xlɔ̃a nu tso esia ŋu hafi wòazã Shield All.

6. Dzro nu si nèwɔ la me eye nàɖoe ɖa.

Unshield All enye nu nyui aɖe ne èle ga ɖem le asitsaƒe si xɔa adrɛs siwo me kɔna ko. Ne address la nye esi dzi wotrɔ asi ɖo o, ke boŋ eƒe ŋkɔa ƒe akpa suewo koe wòɖea ɖe go eye unshield all hã ya ɖea dzesi nenye be ele eme tututu.

## ZecWallet Lite kple gakpɔtɔ ƒe gaɖabawo gbugbɔgaɖoanyi le Argos me

[ZecWallet Lite (Adzraɖoƒevi)](https://github.com/adityapk00/zecwallet-lite) eƒe nuŋɔŋlɔwo to vovo na esi wozãna le gaƒoɖokuigbalẽ siwo li egbea me, eya ta ne ètsɔ nyagbe ma ke yi ɖe egbegbe gaƒokplo aɖe me la àte ŋu abu ga si nɔ ZecWallet Lite ƒe adrɛs bubuwo dzi. [Argos](https://argos.sovright.com), tso Sovright, enye dɔwɔƒe si wowɔna na kɔmpiuta dzi nuwo ƒe dzadzraɖo le dɔdzikpɔƒea be wòatsɔ awɔ esia kple esiwo nɔ anyi tsã la.

Argos xlẽa ZecWallet Lite ƒe nukuwo kple gaɖaba me nuŋlɔɖiwo, zcashd `wallet.dat`, standalone Sapling extended spending keys, kple Sprout expenditure material. Le Sprout gome la ZecWallet Lite ƒe seed ɖeɖe mesɔ gbɔ o elabena wota nya siawo ɖe vovo. Argos nye recovery tool, menye gbe sia gbe wallet: dzro source materials le teƒea me kpɔ, scan eye emegbe nàyi gaɖaba si dzi nèdzra ɖo la me.

Ŋusẽ Kɔkɔtɔ Si Le Wo Ŋu [woɖɔe kpɔ](https://argos.sovright.com/assets/least-authority-argos-audit-2026-06-29.pdf) Ne èdi be yeawɔ nunana aɖe na Sovright la, àte ŋu awɔe le afi sia.

> **Mègaŋlɔ nuku ɖe nyatakakadzraɖoƒe aɖeke o.** Argos-ƒe nyatakakadziwo nye download kple nu siwo woɖena le Internet dzi ko. [Ameƒolawo ƒe Mɔfiagbalẽ](https://argos.sovright.com/guide.html). Aʋatenuwo nɔa dɔdzesidenu si dzi woŋlɔ ŋkɔ ɖo la me. Wodzea agbagba be yewoakpɔe ɖa le BIP-39 ƒe numekuku nu ne wole wo dzrom kpɔ ko. Ne ame aɖe ŋlɔa nyatakaka na wò bia be nàna "wò ga" ye la, efia be ele fefenya wɔm ɖe ŋuwò.

### Hafi nàʋu Argos la,

1. Wɔ kɔmpiuta dzi dɔwɔɖoɖo la ƒe kɔpi le Internet-ʋunu si nye . [Argos ƒe nyatakakadzraɖoƒe si le se nu](https://argos.sovright.com) alo le afi si woɖui ɖo. [GitHub ɖe axawo le go me](https://github.com/sovright/argos/releases)Ne wole agbalẽ aɖe me ɖem la, woalé ŋku ɖe eŋu.
2. Zã Argos ƒe egbeŋkekea me tɔ. Tso September 18, 2026 dzi la, **v1.3.0** nye esi li fifia eye eyae dze nyuie wu. Zã **v2.0 alo esiwo va yi hena: `wallet.dat` kple Sprout recovery**. Build siwo tsi wu 1.1.0 ate ŋu akeke nu gake woatu Ironwood ƒe akpa si dzi wolɔ̃ ɖo xoxo la; update eye nàdze agbagba ake.
3. Wɔ dɔ le kɔmpiuta si dzi nèka ɖo me. Zã disk blibo ƒe kodzidzemɔnu la boŋ. Mègawɔ screen-share o esime nukpɔƒe, mɔ̃dzesi alo gaƒleɖevi aɖe li.
4. Have a destination Unified Address ready from a maintained wallet you control, such as [ZODL](https://zodl.app/)Kpɔe ɖa be adrɛs si le gaɖaba ma me la nye ema hafi nàtsɔe ade Argos.

### Nukuwo gbugbɔgafɔ

1. Ʋu Argos eye nàtia **Mexɔ nya 24 siwo nye atikemenuwo**. Atiku ƒe agbɔsɔsɔ mehiã gaɖaka o.
2. Mide nyagbe la eye miaƒoe ɖe **Validate seed** dzi. Ne egblɔ be atiku si le eme nyo la, miyi edzi.
3. Ŋlɔ dzigbe ƒe agbɔsɔsɔme alo ɣeyiɣi si tututu nèɖo be yeadzra gaɖakavi la ɖo. Etsɔtsɔe nyea, gake enɔa dedie wu esi nàgblɔe le megbe akpa.
4. Le server controls te la, zã current-server preset alo de lightwalletd URLwo. Wodzea agbagba be yewoade comma separated URL le ɖoɖo nu. Public examples:

   `https://zec.rocks:443,https://zec-node.cakewallet.com:443,https://na.zec.rocks:443`

5. Paste the destination Unified Address.
6. Ʋu **dze numekuku gɔme**. Esia ate ŋu axɔ miniti alo ŋkeke geɖe le wò dzigbe ƒe kɔkɔme nu. Àte ŋu atsii eye nàʋu dɔwɔƒe ma ke; woagayi numekukua dzi ake.
7. Ne numekuku la wu enu la, dzro ga si susɔ ɖe eme kple teƒe si woayi me eye nàzi **sweep** dzi.

Ne èɖe ga le wò kotokume la, àte ŋu adzudzɔ edodo. Mègagblẽe o. Dzra wallet gbãtɔa ɖo va se ɖe esime nèdzro akpa siwo katã hiã me eye nàkpɔ be ga si nèle mɔ kpɔm na lae nye esi le wo dzi. Esi nu sia wu enu vɔ ko la, dzraa nya ɣaɣla xoxoawo da ɖi tsɔ wu be nànɔ zãm atsɔ awɔ dɔ yeyewo.

### Gaxɔ me files kple standalone keys (dzesi siwo le wo ɖokui si)

Le welcome screen dzi la, **Mele gaɖaba me file** le ZecWallet Lite ƒe fail ŋu, zcashd `wallet.dat`, alo standalone Sapling gbadzaa ƒe expense keys. Standalone Sprout expenditure-key recovery la nye Argos's Sprout recovery path/CLI si wɔa dɔ le eŋu.

Argos xlẽa gaɖakawo me nyawo le wo ŋu eye megatrɔna o. Ne gaɖakaa nye esi wode kododo nu la, ke de eƒe nyagbe si wòabia ne wobia tso asiwò; wozãnɛ ɖe susu me eye womeŋlɔe ɖe agba dzi o. Dzro nusi woyɔna be transparent (fiafianu), Sapling kple Sprout ƒe xexlẽdzesi me hafi nàdze numekuku gɔme.

Womexɔa dzesi siwo wotsɔ kpɔa nu me la le numekukuwo wɔwɔ ta o elabena womate ŋu ana ŋusẽ ame be wòazã ga o.

### Dzogbenyawo

ZecWallet Lite ƒe nuku mehea Sprout safuiwo vɛ o. Wowɔ wo ɖekaɖekae. Gbugbɔ fɔfɔ tso zcashd me le Sprout dzii `wallet.dat`, alo le gazazã ƒe safui si li ke ɖe wo nɔewo ŋu me.

Ne nuŋɔŋlɔ siwo woate ŋu azã kple ɖasefo si le nudzraɖoƒe xoxo la li na wo, Argos ateŋu ana **Sweep Sprout funds** ne womele asitelefon me tom o. Ne menye nenema o la, etea ŋu wɔa numekuku blibo ƒe akpa ɖeka to P2P-dzedzemɔ dzi. Numekukua lolo eye wònɔa blewu. Nuɖusi si woŋlɔna nye esi wozãna, eyata kpɔ eta abe gaɖɔli gbãtɔ ene.

Ne woxɔ ga le Sapling la, ke ele be woaɖee ayi Ironwood dzi eye woatsɔe ade gakotoku si li fifia me. Mègagblẽ ɖe Sapling ŋu o.

## Ga siwo woxɔ kple Ironwood ƒe gaƒoƒoa

Esi Ironwood (NU6.3) upgrade la dze dɔwɔwɔ gɔme le 28 July 2026 dzi ta, ga yeye aɖeke mate ŋu age ɖe Orchard pool me o. Ga si li xoxoa dona to tourniquet yi Ironwood me.

Ne ga siwo nèxɔ le Orchard me la, zã wo nàtsɔ atrɔe ayi Ironwood dzi to "aƒletɔ ƒe ʋuʋu si wowɔ ɖe eƒe gakotokuwo ŋu" zazã me. Le NU6.3 megbe ko hafi woate ŋu ado tso Orchard-me.

Zkool 6.30.0 is current as of September 18, 2026 and supports Ironwood. Its migration design is privacy-focused but is not the same thing as claiming ZIP 318 conformance. Other current wallets may use ZIP 318-style staged migration. Follow the installed wallet's current migration screen and release notes rather than inventing a manual amount or schedule.

Ne wole ʋuʋum ɖe akpa vovovowo me la, woate ŋu awɔ nu geɖe le wo nɔewo dome ale be ga si woaxe na ame ɖekaɖekawo ƒe ʋiʋli dzi ko wòahe.

> **Migation amounts are public.** Ne ga la to tourniquet dzi, eƒe home kple block height nɔa dzedzem le chain me togbɔ be ame si ɖo eŋu kple amesi xɔe ƒe ŋkɔa kpɔtɔ nɔ dedie hã. Zã wallet-awo ƒe built-in private/staged migration policy ne privacy nyawo li eye nàzã network level privacy abe Tor alo trusted privacy layer bubu ene nenye ɖe wòsɔ nyuie. Network privacy ate ŋu aɣla IP link; mele ɣaɣlamɔ̃ siwo amewo toa edzi o.

## Kɔmpiuta si wotsɔna ɖea nu me le eme to ZExCavator dzi

[ZExCavator (Agbatsɔtsɔtsonuŋɔŋlɔ)](https://github.com/zingolabs/zexcavator) enye Zingo Labs ƒe agbadzraɖoƒe si le dɔ wɔm fifia eye eƒe akpa aɖe nye ZecWallet Lite gaɖabaŋuti-faɛlwo kple gaƒlegbalẽvi ŋuti ʋuʋu. Eƒe README la fiaa mɔ gadzraɖoƒe siwo ŋu wotrɔ asi le be woagbugbɔ ga aƒlee na ame sia ame ne woaɖoe ɖe **Zingolib** me esime wole agbagba dzem kokoko be yewoana kpekpeɖeŋu bliboe tso ZeWIF gbɔ.

Wɔe abe mɔ̃ si de ŋgɔ/gbedzedze le esi teƒe be wòanye agbemɔzɔzɔnya. Le ZecWallet Lite ƒe nukuwo, gaɖaba me nuŋlɔɖiwo kple zcashd ŋu la: `wallet.dat`, eye wodoa gaƒle ƒe safuiwo dzi, dze agbagba be yeatsɔ Argos gbã. Kpɔ nusianu si ZExCavator fɔ le gakotoku siwo ŋu wowɔ ɖoɖo ɖo me la ɖa hafi nàɖo ŋu ɖe eŋu.

## Ne lãmenugbagbevi si nèdi la mele asiwò o la, ke àte ŋu awɔ dɔ tso eŋu.

Ne nuku alo safui megali o la, ame siwo le nɔnɔme sia me dometɔ aɖewo zãa dɔwɔƒe si wɔa numekɔkɔ na nyatakakawo ƒe mɔ̃ɖaŋunuwo be woadzra woƒe adzɔgbeɖenuŋu ɖo ne woŋlɔ eƒe ŋkɔ ɖe eme, nuzazã gblẽna, alo diski aɖe meganya xlẽna o.

Mɔ ma to vovo na ale si nàgbugbɔ akɔbli siwo le asiwò la aɖɔ ɖo. Mègaɖe asi ɖe wo ŋu ame aɖeke ne wòagblɔ be yeawɔ dɔ atsɔ "axɔ" wo o. Ame geɖe wɔa nu sia abe alakpanuwɔwɔ ene.

[Womeŋlɔe ɖe agbalẽ me o.](https://unciphered.com) enye dɔwɔƒe aɖe si wɔa dɔ sia le aƒeme eye woƒo nu tso eŋu na ame bubuwo abe: [Kɔmpiutawo le eŋu.](https://www.wired.com/story/unciphered-crypto-wallet-recovery/). Wonye crypto recovery service gbogbotɔ, menye Zcash-specific tool o eye woxɔa fe ɖe dɔ sia ta. ZecHub medea asi kple Recovery firm aɖeke o. Ne èto mɔ sia dzi la, kpɔ egbɔ be ye ŋutɔ yele eƒe domen si nye esi le se nu me eye nàbui be ame siwo katã ŋlɔe na wò gbã enye ameflunuwɔlawo.

Ne agblemenuku alo gaƒleƒe ƒe mɔ aɖe le asiwò la, dze egɔme kple alesi nàkpɔ nuwo gbɔ abe Zkool alo Argos ene.

## YWallet megale edzi o.

YWallet nyea agblenu si ŋu woƒo nu tsoe le axa sia me ɣeyiɣi didi aɖe, eye agbalẽ xoxo geɖe gakpɔtɔ fia asi eŋu.

Ewɔla gblɔna fifia be YWallet megakpe ɖe Zcash ŋu o tso Ironwood ƒe update la dzi eye wòfiaa mɔ Zcash zãlawo yi **Zkool**, si nye eƒe dzidzimevi. Wodzraa ywallet xoxowo ɖo gake womegaɖoa zcash yeye le YWallat me o.

If you already have Zcash recovery material from YWallet, restore it in Zkool using the supported seed/key path above.

## Axa siwo do ƒome kplii

- [Gaɖakawo](/using-zcash/wallets) - Gaɖaka siwo woɖɔna ɖo kple alesi Ironwood-gaxɔawo le dzadzraɖoɖi, Argos hã nɔ emee.
- [Atikpowo](/zcash-tech/ironwood) - nusi tɔtrɔ si wowɔ le ŋgɔyiyi sia me kple nusita gawo ʋuna ɖo
- [Ŋkuɖodzinyawo](/using-zcash/memos) - ale si nyatakaka siwo ŋu wotrɔ asi le la wɔa dɔe
- [Kpɔkplɔtiwo](/zcash-tech/viewing-keys) - Xlẽ nu ko ƒe mɔɖeɖe le ŋusẽ zazã manɔmee
- [Lightwallet Nodes (Adzagba Kpoƒe)](/zcash-tech/lightwallet-nodes) - amewo ƒe lightwalletd nuƒleƒe siwo Argos ate ŋu azã.
- [Argos ƒe dɔwɔnu ŋuti mɔfiamewo](https://argos.sovright.com/guide.html) - Sovright ƒe dɔdzikpɔlawoe le dɔa dzi kpɔm.
- [Naomi Brockwell le nu siwo ŋu woatrɔ asi le la ŋuti nya gblɔm](https://x.com/naomibrockwell/status/2079146521405333526) - Argos ƒe mɔfiamewo kple nyatakaka aɖe tso dɔ si me wòto kpɔ ŋusẽ ɖe eƒe agbe dzi ŋu.
