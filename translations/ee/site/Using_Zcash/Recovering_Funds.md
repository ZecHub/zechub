<a href="https://github.com/Zechub/zechub/edit/main/site/Using_Zcash/Recovering_Funds.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash Gadzraɖoƒe ƒe Ga Gbɔ Kpɔkpɔ

** Nu ka tae nèdzra wò dɔwɔƒegã ƒe safui ɖo?**

Aƒemɔ̃vi siwo le ame ŋutɔ si la nye nu vevi aɖe na wò kɔmpiuta dzi nuwo ƒe dedienɔnɔ. Ele vevie be nàdzra wo ɖo eye màgaƒo ka kpli wo gbeɖe o.

> Le go sia me la, woate ŋu abu **Seed Phrase** be enye nu si sɔ kple private key.

By maintaining control over your private keys, the recovery process is always possible. There are 2 types of Zcash private keys (transparent and shielded), you can easily import them into your wallet, whether by using the Sweep Funds function or importing them as a new account. By keeping control over your private keys, you maintain total control over your assets, ensuring ownership, security and peace of mind.

# Dedienɔnɔ Kple Agbanɔamedziwɔwɔ

Ele vevie be amesiwo zãa mɔnu sia nanya afɔku siwo le eme ne wole nu wɔm kple woƒe private keys eye woana woakpɔ mɔ na nya siawo. Ame bubuwo ƒe ga ŋuti dedienɔnɔ nɔ te ɖe alesi ame si zãm la akpɔ eƒe private key dzii ŋu.

> ** Hafi nàdze egɔme:** recovery guides used to point at Ywallet. Eƒe developer ɖo kpe edzi be womagaɖɔe ɖe Ironwood (NU6.3) network upgrade nu o, eyata mate ŋu anɔ kɔsɔkɔsɔa me azɔ o. Zã **Zkool** si tso developer ma ke gbɔ eye enye eƒe susɔxɔla siwo dzi wotena kpɔna la. Kpɔ [Ywallet is no longer maintained](#ywallet-is-no-longer-maintained) le axa sia ƒe ete.

## Gaxɔle ɖe Zkool gbɔ

[Zkool] Nyee nye ame si le wo dome.](https://github.com/hhanh00/zkool2/releases) enye Ywallet ƒe dzidzimevi, tso developer ma ke gbɔ eye ekpena ɖe gaglãgbe kple wo dzi kpɔkpɔ ŋu.

Míadzro nɔnɔme eve aɖewo me le afisia:

1. **Akpaɖoɖo ƒe gbugbɔɖoanyi** tso nyagbe, private key alo viewing key dzi
2. **Axɔ ga le gakotoku si me wotea ŋu ʋua adrɛs siwo dzi woate ŋu akpɔ nu ɖo ko la me**

### 1) Akɔnta Ðɔɖɔɖo

1. Ðo Zkool le [gbeɖeɖewo ƒe axa] dzi.](https://github.com/hhanh00/zkool2/releases) eye nàʋui.
2. Le ** Account Manager** (ƒe akpa gãtɔ dzi) la, ka asi kpukpui si nye **+** ŋu be nàkpɔ nu siwo le afi sia.
3. Ŋlɔ **Nudzraɖoƒe Ƒe Ŋkɔ** be nàde dzesi nyatakaka sia.
4. Ʋu **Gbugbɔ Account ɖo?**. Esia ana nàkpɔ nu vevi kple dzidzi ƒe kɔkɔme teƒewo
5. Mido miaƒlevi ɖe **Key (Seed Phrase, Private Key, or Viewing Key) me. Zkool lɔ̃na na ƒlevi aɖe ƒe nyagbewo, Sapling ɣaɣlaɖui, gaglãaɖe si dzi wotrɔ asi le la alo nuŋɔŋlɔawo kpɔkpɔ kpokploe
6. Ne ènya ɣeyiɣi si me wozã ga sia zi gbãtɔ la, ke de dzesi eƒe dzidzi ƒe kɔkɔme. Esia ana Zkool nanya afisi wòadze numekuku gɔme le eye esia aɖe ɣeyiɣi geɖe dzi akpɔtɔ na wo

![Zkool New Account screen with Restore Account and Advanced Options both turned on](/content-images/zkool-restore-account-60b1d2777e.webp)

> **Eƒe dzidzi ƒe kɔkɔme mele eme o?** Na wòatsi ƒuƒlu eye nàɖo kpe nuxlɔ̃amea dzi. Zkool adzro nuwo me tso woƒe dzɔdzɔmedzedze, si le blewu wu gake naneke matsi eŋu o la gbɔ. Ne ga siwo nètsɔ ɖo ɖe wo ŋu do ŋgɔ na Sapling tɔtrɔwo wɔwɔ le October 2018 me la, gblẽe ɖi tsɔ wu be nànɔ akɔnta bum tso eƒe tsitsi megbe loo alo scan ate ŋu asi miaƒe asitsatsawo katã dzi.

7. Dzra nyatakaka la ɖo, eyome wɔ ɖeka kplii

### Nuku aɖe gbugbɔgaɖoanyi tso gaɖaka bubu me

Ne ga si le kotoku bubu me la ƒe akpa aɖe gblẽ eye eƒe homea megadze abe ale si wòle ene o, zi geɖe la tɔtrɔ siwo wowɔna na adrɛswo gbɔe wòtsona.

Ʋu **Advanced Options** switch, yi ɖagadze New Account screen la dzi eye nàʋu **Use Internal Change** hafi adzra ɖo.

Gaxɔwo katã mehea tɔtrɔ ƒe adrɛs le mɔ ɖeka nu o. ZODL-dzidzime aɖe gbugbɔɖoanyi ɖe Zkool dzi ne ɖoɖo sia meli o la ate ŋu ana ga si susɔ na wò tɔtrɔwo, siwo adze abe ga búbu ene gake menye nenemae wonye o. Dɔwɔgbalẽvi si nye Zkoel's tooltip hena asitɔtrɔgaɖoa gakpɔtɔ yɔna be Zashi, eye eyae woyɔna tsã na ZOLD.

Nudzɔdzɔ eve bubu le **Advanced Options**:

- **Extra Passphrase (ele be nàtiae)**, ne gaɖaba gbãtɔ zã ɖeka ko la koe wòate ŋu awɔ esia.
- **Adzesiwo ƒe Numedzodzro**, ne ga si le gakotoku gbãtɔa me la nye esi nɔ akɔntabubu geɖewo dzi ɖe nu ɖeka aɖe ŋu. Ga siwo anɔ eme ate ŋu anye esiwo woazã na numekɔkɔ bubu

> **These two only appear once a valid seed phrase is in the Key field.** With the field empty, or holding a private or viewing key, Zkool shows just **Use Internal Change** and **H/W Ledger**. Paste the seed first, then open Advanced Options.

### 2) Gawo Tsɔtsɔ Yi Gadzɛ aɖe si Dzi Nu Kekeake Le La Me

Ne ga siwo le wò kotoku me mewɔ dɔ ɖe adrɛs si dzi wotona kpɔa wo ta o (Trust, Coinomi, Guarda kple bubuawo) la, gbugbɔ axaa ɖo gbã eye nàtsɔ gaawo ayi asrafodɔ ƒe akpa si wokpɔna.

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

## Ga siwo woxɔ kple Ironwood ƒe gaƒoƒoa

Esi Ironwood (NU6.3) upgrade la dze dɔwɔwɔ gɔme le 28 July 2026 dzi ta, ga yeye aɖeke mate ŋu age ɖe Orchard pool me o. Ga si li xoxoa dona to tourniquet yi Ironwood me.

Ne ga siwo nèxɔ le Orchard me la, ele be woatrɔ asie hafi wòava nɔ abe alesi wòle ene. Ʋu account menu eye nàtia **Note Migration**. Eʋɔnu sia dzena ne nane li ŋutɔŋutɔ si ŋu woaʋu ɖo ko.

Eŋkɔe nye **Orchard to Ironwood Migration** eye ekpena ɖe eŋu le akpa eve me. Gbã la, eɖea agbalẽ siwo menye esi sɔ o ƒe xexlẽme dea esiwo sɔ gbɔ wu dzi, eyome etrɔa wo ɖekaɖeka yia bubui. **Migration Speed** enye slider tso Ultra Fast yi Slow si trɔa ɣeyiɣi didi aɖe ɖi na afɔɖeɖewo. **Start Migration*** wɔa nu sia le megbe kple susu be yeate ŋu ava tu axa ahagawɔ edzi emegbe. **One Shot* wɔna esia zi ɖeka pɛ ko.

Afɔɖeɖe ɖe sia ɖe nye eƒe nuwɔwɔ, eyata wo dometɔ ɖesiaɖe xe fe.

> **Migation amounts are public.** Ne ga la to tourniquet dzi, eƒe home kple block height adze le chain me togbɔ be woɣla ame si ɖo eŋu ɖe edzi eye woaxɔe hã. Nume vovovo ate ŋu ana woanya wò, eyata tia migration ƒe ɖoɖowo wɔwɔ kabakaba wu ɖekawɔwɔa ko, eye bu mɔɖeɖe na wò kadodo via Tor alo VPN gbã alebe IP address manɔ te ɖe nu siwo nèʋu o.

## Kɔmpiuta si wotsɔna ɖea nu me le eme to ZExCavator dzi

[ZExCavator ƒe ŋkɔ](https://github.com/zingolabs/zexcavator) enye agbadzraɖoƒe tso Zingo Labs na afisiwo dzadzɛdzedze meɖea vi o, abe gaɖabaŋuti ƒe file si gblẽ alo eƒe akpa aɖe.

> Eƒe update mamlɛtɔ do ŋgɔ na network upgrades siwo va yi nyitsɔ laa, eyata wɔe abe mɔnu mamletɔ ene eye nàkpɔa nu sia nu si ŋu nèke ɖo le gaɖaba aɖe me la dzi hafi aka ɖe eƒe dzidzedzewo dzi.

## Ywallet megale edzi o.

Ywallet nye mɔ̃ si ŋu woƒo nu tsoe le axa sia dzi hena ɣeyiɣi didi aɖe, eye agbalẽ xoxo geɖe gakpɔtɔ fiaa asi eŋu.

Eƒe nufialaa ɖo kpe edzi be womagaɖɔe ɖe Ironwood o. Ga si meɖo to egbe ƒe ɖoɖowo mate ŋu awɔ dɔdada siwo sɔ o, eyata womagateŋu azãe atsɔ atrɔ ga agbɔ va aƒea mee azɔ o. **Zkool** la nye ame bubu aɖe si le ŋgɔ na esia eye eyae axa sia zãna fifia.

Ne ga le asiwò xoxo ɖe Ywallet me la, zã afɔɖeɖe siwo dze ŋgɔ nàtsɔ agbugbɔ nuŋɔŋlɔa aɖo Zkool.

## Axa siwo do ƒome kplii

- [Gbɔdzigbalẽvi siwo le ga me](/using-zcash/wallets) - Gaɖaka siwo woɖɔ ɖo kple alesi Ironwood dzraa woe.
- [Ati si wotsɔ ga wɔ la](/zcash-tech/ironwood) - nusi tɔtrɔ si wowɔ le ŋgɔyiyi sia me kple nusita gawo ʋuna ɖo
- [Nɔnɔmetatawo](/using-zcash/memos) - ale si nyatakaka siwo ŋu wotrɔ asi le la wɔa dɔe
- [Kpɔ Kpuiawo](/zcash-tech/viewing-keys) - Xlẽ nu ko ƒe mɔɖeɖe le ŋusẽ zazã manɔmee
