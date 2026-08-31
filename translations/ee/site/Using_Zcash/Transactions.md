<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Transactions.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Asitsatsa

ZEC nye dijitaal nunɔamesi si wozãna le afisiafi hena fexexe, si naa ameŋunyatakakawo takpɔkpɔ ƒe mɔnu sesẽ siwo na wòsɔ na asitsatsa vovovowo abe xɔlɔ̃wo ƒe fexexe, nuƒle, alo nudzɔdzɔ ene. Be ame ŋutɔ ƒe nyatakakawo kple dedienɔnɔ nadzi ɖe edzi la, ele vevie be nàse alesi asitsatsa ƒomevi vovovowo wɔa dɔe le Zcash me gɔme.

## TL;DR

- Zcash doa alɔ asitsatsa ƒomevi eve: **shielded**, si naa nyatakakaawo nɔa ɣaɣla, kple **transparent**, si ŋlɔa wo ɖe dutoƒo.
- Adrɛs siwo wokpɔ ta na la dzea egɔme kple `u` or `z`. Adrɛs siwo me kɔ la dzea egɔme kple `t` eye wowɔa nu abe Bitcoin adrɛs ene.
- Tiatia la nye tɔwò le fe ɖesiaɖe si nàxe me. Ame ŋutɔ ƒe nyawo tsɔtsɔ aɣla nye tiatia si Zcash naa wò, ke menye nɔnɔme si ame bubu atso nya me na wò o.
- Asiɖeɖe le nudzraɖoƒe aɖe ŋue nye afisi amewo ƒe adzamenyawo buna le wu. Ne gaɖeɖe le gaglãgbe koe gaɖɔliƒea doa alɔe la, ke wò ŋutɔ kpɔ ga la ta ne wonya ɖo ko.
- Fewo kplɔnɛ ɖo [ZIP 317 ƒe xexlẽdzesi](https://zips.z.cash/zip-0317) eye wòatsi kple asitsatsa la ƒe lolome. Gakotoku siwo gakpɔtɔ le flat fee xoxoa ɖom ɖa la ate ŋu akpɔe be woƒe asitsatsa tsi megbe.
- Zcash ƒe asitsatsa akpa gãtɔ ƒe nuwuwu ƒe kɔkɔme le ete [ZIP 203 ƒe xexlẽdzesi](https://zips.z.cash/zip-0203). Ne asitsatsa aɖe wu enu hafi woɖe tome la, mate ŋu aɖo kpe edzi le eƒe nuwuwu ƒe kɔkɔme ma megbe o eye ate ŋu ahiã be woagaɖoe ɖa ake.

## Asitsatsa Siwo Ŋu Wokpɔ Akpoxɔnu Le

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/bZM3o_eIovU"
    title="Zcash Explained: Zcash Shielded Transactions"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    ɖe mɔ ɖeFullScreen ŋu
    loading="lazy"
  />
</div>

---

Asitsatsa siwo wokpɔ ta na la dzɔna ne ètsɔ ZEC yi wò gakotoku si ŋu wokpɔ ta na la me. Wò gakotoku ƒe adrɛs si ŋu woxe mɔ ɖo la dzea egɔme kple a `u` or `z`. Ne èle asitsatsa siwo ŋu wokpɔ ta na ɖom ɖa la, wò kple ame siwo nèwɔa asitsadɔ kplii la, miate ŋu alé adzamenyawo ƒe ɖoɖo aɖe si mate ŋu adzɔ le dutoƒo fexexe ƒe nyatakakadzraɖoƒewo o.

Asitsatsa si wokpɔ ta na ɖoɖo ɖa le bɔbɔe wu ne èzã gakotoku si doa alɔ Zcash network si li fifia kple ta siwo wokpɔ ta na fifia. Hafi nàɖo ŋu ɖe gakotoku ŋu hena ame ŋutɔ ƒe nyawo gbɔ kpɔkpɔ la, kpɔe ɖa be edoa alɔ dɔdɔ si wotsɔ akpoxɔnu ɖo, xɔxɔ si ŋu akpoxɔnu le, kple ta si nèɖo be yeazã hã. Ne èle ZEC ɖem le asitɔtrɔ aɖe me la, kpɔe ɖa be asitɔtrɔa doa alɔ gaɖeɖe siwo ŋu wokpɔa akpoxɔnu le alo esiwo woɖena le gaglãgbe hã. Ne gaɖeɖe le gaglãgbe koe wòdoa alɔ la, ke tsɔ gaawo yi gakotoku si me woate ŋu akpɔ akpoxɔnu le me ne wova ɖo.

Asitsatsa siwo ŋu wokpɔ ta na zazã atsɔ aɖo ga ɖa ahaxɔe nye mɔ nyuitɔ si dzi woato akpɔ ame ŋutɔ ƒe nyatakakawo ta eye woaɖe afɔku si le fexexe ŋuti nyatakakawo ƒe dodo me dzi akpɔtɔ.

## Asitsatsa Siwo Wowɔna le Gaglãgbe

Asitsatsa siwo me kɔ la wɔa dɔ abe alesi Bitcoin ƒe asitsatsa wɔa dɔe ene. Asitsatsa ŋuti nyatakakawo dzena le dutoƒo le blockchain la dzi, siwo dometɔ aɖewoe nye adrɛs siwo me kɔ kple asixɔxɔ siwo me kɔ. Ele be woaƒo asa na asitsatsa le gaglãgbe ne ame ŋutɔ ƒe nyawo gbɔ kpɔkpɔ nye nu vevitɔ.

Adrɛs siwo me kɔ la gakpɔtɔ ɖea vi le nɔnɔme aɖewo me, vevietɔ ne asitɔtrɔ alo dɔwɔƒe aɖe medoa alɔ adrɛs siwo wokpɔ ta na o. Ne èxɔ ZEC ɖe adrɛs si me kɔ la, bu eŋu kpɔ be yeakpɔ eta hafi axe fe emegbe.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/R-krX1UpsIg"
    title="Learn Zcash shielded wallets!"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    ɖe mɔ ɖeFullScreen ŋu
    loading="lazy"
  />
</div>

## Mɔ Blɔɖe Si Si Nàto Akpɔe le Nɔnɔmetata Me

Asitsatsa si me kɔ nye posugbalẽvi. Posudɔwɔla la tsɔnɛ yinae, gake amesiame si akpɔ egbɔ le mɔa dzi ate ŋu axlẽ gbedasi la, akpɔ amesi ɖoe ɖa eye wòakpɔ amesi axɔe.

Asitsatsa si wotsɔ akpoxɔnu wɔe nye agbalẽkotoku si wotre nu na. Posudɔwɔƒea gakpɔtɔ ɖo kpe edzi be lɛta ŋutɔŋutɔ si me posufe ŋutɔŋutɔ le la to ɖoɖoa me, eye ame aɖeke mate ŋu awɔ ɖeka alo aɖo lɛta ɖeka ɖa zi eve o. Nusi le agbalẽkotokua me nɔa amesi ɖoe ɖa kple amesi xɔe dome.

Akpa vevitɔe nye be Zcash na nètsoa nya me le esi nàɖo ɖa ŋu, fexexe to fexexe me.

## Zcash Fewo ƒe Fewo

Zcash mezãa gas-mɔ̃ siwo le abe Ethereum ene o. Woxea Zcash ƒe asitsatsa ƒe fewo le ZEC me, zi geɖe la, wodzidzenɛ le **zatoshis** me. ZEC ɖeka sɔ kple zatoshi 100,000,000.

[ZIP 317 ƒe xexlẽdzesi](https://zips.z.cash/zip-0317) ɖe fexexe ƒe mɔnu si bɔ si dzina ɖe edzi kple asitsatsa ƒe sesẽme. Le esi teƒe be woazã asitsatsa ɖesiaɖe si nye 1,000-zatoshi flat fe xoxoa la, wotu fe si wozãna ɖaa ɖe "nuwɔna siwo me susu le" abe nusiwo wotsɔ de eme, nusiwo woɖe tso eme, kple nuwɔna siwo wokpɔ ta na dzi. Zi geɖe la, asitsatsa bɔbɔewo dzea egɔme abe zatoshi 10,000, alo ZEC 0.0001 ene, eye asitsatsa siwo sesẽ wu ate ŋu abia geɖe wu.

Le gakotoku siwo li fifia ƒe akpa gãtɔ me la, mele be wòahiã be ezãlawo natsɔ asi abu ZIP 317 ƒe fewo o. Ele be gakotokua natia fe si sɔ le eɖokui si. Ne gakotoku aɖe gakpɔtɔ zãa flat fee xoxoa alo na nèɖoa fe si le ZIP 317 ƒe fetu si wozãna ɖaa teƒe sã la, ate ŋu ahe asitsatsa la ɖe megbe, aɖee le nu vevitɔ me, node aɖewo atsɔe aƒu gbe, alo ado kpo relay kakaɖedzitɔe.

## Kuxiwo Gbɔkpɔkpɔ le Asitsatsa Siwo Tsi Me

Zcash ƒe asitsatsa menye mamlɛtɔ le esi wòdze le wò gakotoku me ta ko o. Eva zua mamlɛtɔ na zazã dzro ko ne woɖee ɖe block me vɔ eye wòxɔ kpeɖodzi siwo sɔ na wò nɔnɔmea vɔ. Ðewohĩ asitɔtrɔ kple dɔwɔnawo abia kpeɖodzi geɖe wu alesi gakotoku aɖe ɖenɛ fiana le gɔmedzedzea me.

Zã nyametsotsoti sia hafi nàgbugbɔ aɖoe ɖa:

1. **Ðe wò gakotokua ɖea asitsatsa ƒe ID fianaa?**
   - Ne ao la, ke ɖewohĩ gakotokua mewɔ asitsatsa la alo ɖe gbeƒãe haɖe o. Kpɔ sync ƒe nɔnɔme, internet kadodo, gakotoku ƒe tɔtrɔ, kple gakotoku ƒe vodada ƒe gbedasi ɖesiaɖe ɖa.
   - Ne ègblɔ be ẽ la, kɔpi asitsatsa ƒe ID la eye nàyi edzi.
2. **Ðe woɖo kpe asitsatsa la dzi le block aɖe mea?**
   - Ne ẽ la, lala kpeɖodzi agbɔsɔsɔme si wò gakotoku, asitɔtrɔ, asitsala, alo dɔwɔƒe bia.
   - Ne ao la, ke yi edzi.
3. **Ðe asitsatsa la ɖo eƒe nuwuwu ƒe kɔkɔƒea?**
   - Ne ao la, mègatsɔ asi aɖo ga ma ke ɖe wò haɖe o. Ðewohĩ asitsatsa gbãtɔa aɖo kpe edzi kokoko.
   - Ne ẽ la, womate ŋu aku asitsatsa la le ɣeyiɣi ƒe didime ma megbe o. Wò gakotoku ate ŋu ade dzesii be ewu enu alo do kpo nu, eye ahiã be nàwɔ asitsatsa yeye aɖe.
4. **Ðe asitsatsa la dzena le server alo explorer ɖeka dzi gake medzena le bubu dzi oa?**
   - Bu esia abe network visibility nya ene, ke menye kpeɖodzi be asitsatsa la do kpo nu o. Node vovovowo ateŋu akpɔ mempool ƒe nukpɔkpɔ vovovowo.
   - Lala, gbugbɔ trɔ asi le wò gakotokua ŋu, alo trɔ ɖe server bubu si dzi nèka ɖo ŋu ne wò gakotokua do alɔ ema.
5. **Ðe asitsatsa la bu le edze abe woɖo kpe edzi vɔ megbea?**
   - Kɔsɔkɔsɔ kpui ƒe ɖoɖo yeye ate ŋu aɖe asitsatsa aɖe ɖa le kɔsɔkɔsɔ nyuitɔ kekeake me hena ɣeyiɣi aɖe.
   - Lala be woagawɔ block bubuwo. Ne asitsatsa la trɔ gbɔ la, yi edzi nànɔ lalam be woaɖo kpe edzi. Ne metrɔ gbɔ o eye emegbe wòwu enu la, wɔ asitsatsa yeye.
6. **Ðe gakotokua le biabiam tso asiwò be nàgbugbɔ aɖoe ɖaa?**
   - Wɔ ɖe gakotokua ƒe mɔfiame si li fifia dzi ne èkpɔe ɖa be asitsatsa si nèwɔ va yi ƒe ɣeyiɣia wu enu, do kpo nu, alo megale dɔ wɔm o vɔ ko.
   - Ne mèka ɖe edzi o la, bia kpekpeɖeŋu hafi nàgaɖoe ɖa ake.

## Wole Lalam, Woƒe Ɣeyiɣia Wu, Woda, Kple Wogbugbɔ Ðo Eŋlisigbe

- **Pending** fia be wowɔ asitsatsa la alo woɖe gbeƒãe gake womekue ɖe block me haɖe o.
- **Ewu enu** fia be asitsatsa la ƒe nuwuwu ƒe kɔkɔme va yi. Le ZIP 203 te la, womate ŋu aku asitsatsa si ƒe ɣeyiɣia wu enu ƒe kɔkɔme le kɔkɔme ma megbe o.
- **Dropped** fia be node ɖeka alo esi wu nenema megadzraa asitsatsa la ɖo ɖe woƒe mempool me o. Esia ateŋu adzɔ le ɣeyiɣi ƒe nuwuwu, fetu suewo, mempool ƒe ɖoɖo, gbugbɔgadzedze ƒe nuwɔna, alo relay ƒe vovototowo ta.
- **Reorged** fia be block si me asitsatsa la nɔ tsã la meganye kɔsɔkɔsɔ nyuitɔ ƒe akpa aɖeke o. Woate ŋu agaku asitsatsa la emegbe, alo ate ŋu atrɔ ava nɔ lalam ne egakpɔtɔ le dɔ wɔm.

## Ɣekaɣie Mele Be Woagaɖoe Ðe Amewo O

Mègagbugbɔe ɖo ɖa enumake le esi asitsatsa aɖe le ŋgɔ yim, ele blewu, alo bu le anyigbayeyedila ɖeka si ta ko o. Ne wogbugbɔ ɖoe ɖa kaba akpa ate ŋu ahe tɔtɔ vɛ eye le alesi gakotokua tu ga yeyeae nu la, ate ŋu ade afɔku me be woaxee zi eve.

Lala alo nàxɔ kpekpeɖeŋu gbã ne:

- Asitsatsa ƒe ID le asitsatsa la ŋu eye mewu enu o.
- Server ɖeka ɖenɛ fiana evɔ bubu ya meɖenɛ fiana o.
- Woɖe tome nɛ nyitsɔ laa gake kpeɖodzi siwo bu le eŋu le reorg si ate ŋu adzɔ megbe.
- Subɔsubɔha si xɔa nyatakakawo mewu kpeɖodzigbalẽwo xlẽxlẽ nu o.
- Wò gakotokua gakpɔtɔ le wɔwɔm ɖekae.

Zi geɖe la, enyo wu be woagbugbɔ aɖoe ɖa ne gakotokua de dzesii kɔte be asitsatsa la do alo do kpo nu vɔ, alo ne kpekpeɖeŋunana ɖo kpe edzi be asitsatsa gbãtɔa mate ŋu aɖo kpe edzi o.

## Ameŋunyatakakawo Ŋuti Dzesidede

Àte ŋu akpɔ asitsatsa ƒe nɔnɔme veviwo evɔ màɖe nyatakaka geɖe ɖe go wu alesi wòhiã o:

- Kpɔe ɖa be wò gakotokua wɔ ɖeka bliboe hã.
- Kpɔe ɖa be gakotokua ƒe dɔwɔnua le yeye hã.
- Kpɔe ɖa be asitsatsa ƒe ID le asitsatsa la ŋu hã.
- Kpɔe ɖa be woɖo kpe asitsatsa la dzi, wole lalam, eƒe ɣeyiɣia wu enu, alo do kpo nu hã.
- Kpɔ block ƒe kɔkɔme si li fifia eye nàtsɔe asɔ kple asitsatsa ƒe nuwuwu ƒe kɔkɔme ne wò gakotokua ɖee fia.
- Le asitsatsa siwo me kɔ gome la, block explorer ateŋu afia dutoƒo asitsatsa, adrɛswo, asixɔxɔwo, kple kpeɖodziwo.
- Le adzɔnuwɔna siwo wokpɔ ta na gome la, block explorer ateŋu aɖee afia be asitsatsa aɖe li, gake mateŋu aɖe ame si woɖo tae, amesi xɔe, ga home, alo nuŋlɔɖi ŋuti nyatakakawo afia o.

## Nusiwo Womagblɔ Le Dutoƒo O

Mègatsɔ esiawo da ɖe dutoƒo dzeɖoɖo, hadomenyatakakadzraɖoƒe, alo nyawo yometiti me gbeɖe o:

- Nuku ƒe nyagbe alo hayahaya ƒe nyagbe
- Gazazã ƒe safui, ame ŋutɔ ƒe safui, alo gakotoku ƒe kɔpi
- Nukpɔkpɔ ƒe safui bliboa
- Screenshots siwo ɖe ga si susɔ, adrɛs blibowo, nuŋlɔɖiwo, QR codewo, alo exchange account ŋuti nyatakakawo fia
- Ame ŋutɔ ƒe dzesidegbalẽviwo alo akɔntabubu gbugbɔgaxɔ ŋuti nuŋlɔɖiwo

Asitsatsa ƒe ID le dutoƒo le kɔsɔkɔsɔa dzi, gake ate ŋu atsɔ wò kpekpeɖeŋubiabia la aƒo ƒu kple wò dzesideŋkɔ kokoko. Ne ame ŋutɔ ƒe nyawo tsɔtsɔ aɣla le vevie la, ke gblɔe na kpekpeɖeŋunamɔ̃ si dzi nèka ɖo ko.

## Nusiwo Kpekpeɖeŋunahawo Hiã

Ne èle gakotoku, asitɔtrɔ, alo subɔsubɔdɔ ƒe kpekpeɖeŋu biam be woana kpekpeɖeŋu la, gblɔ nyatakaka suetɔ kekeake siwo ŋu viɖe le ko:

- Gakotoku alo subɔsubɔ ƒe ŋkɔ
- App ƒe tɔtrɔ kple dɔwɔɖoɖo
- Eɖanye asitsatsa la nye esi wokpɔ ta na, edze ƒã, alo le adrɛs siwo wokpɔ ta na kple esiwo me kɔ dome o
- Transaction ID, ne èvo le ɖokuiwò me be yeamae
- Ɣeyiɣi si woɖo ɖa si wobu
- Nenye be gakotokua wɔ ɖeka bliboe
- Fifia ƒe nɔnɔme si gakotokua ɖe fia
- Vodada ƒe gbedasi tututu, kple ame ŋutɔ ƒe nyatakakawo ɖeɖe ɖa
- Screenshot si me woɣla ga si susɔ, adrɛswo, nuŋlɔɖiwo, kple akɔntabubu ŋuti nyatakakawo

Kpekpeɖeŋunahawo mehiã wò nuku ƒe nyagbe, gazazã ƒe safui, ame ŋutɔ ƒe safui, alo nukpɔkpɔ blibo ƒe safui o.

## Vodada Siwo Wowɔna Zi geɖe

- **Ne míetsɔe be gakotoku ɖesiaɖe si ŋlɔ ZEC ateŋu aɖoe ɖa le adzame.** Gakotoku geɖe siwo me gaku geɖe le doa alɔ Zcash ƒe akpa si me kɔ la ɖeɖeko. Kpɔ gakotokua ƒe ta siwo wodo alɔe ɖa hafi nàɖo ŋu ɖe eŋu be nànya ame ŋutɔ ƒe nyawo. The [Gakotokuwo](https://zechub.wiki/using-zcash/wallets) axaa yɔ esia na tiatia ɖesiaɖe.
- **Gaɖeɖe yi adrɛs si me kɔ eye woagblẽ ga la ɖe afima.** Gaɖeɖea ŋutɔ nye dutoƒo, eye ʋuʋu ɖesiaɖe si ava emegbe tso adrɛs ma dzi hã nɔa dutoƒo. Kpɔ ga la ta ne wonya ɖo ko.
- **Adzamenyawo wɔwɔ abe nane si nèʋuna zi ɖeka ene.** Asitsatsa ɖesiaɖe nye tiatia si to vovo. Shielded ɖoɖo ɖa egbea meɖea ga si nèxe le gaglãgbe si nèxe le kwasiɖa si va yi me la ɖa o.
- **Adrɛs si me kɔ zazã ake na nusianu.** Esi wònye be dɔwɔna si me kɔ la dzena tegbee ta la, adrɛs ɖeka si wogbugbɔ zã la doa ka kple fexexe siwo me susu aɖeke menɔ be woatsɔ aƒo ka na wo o vivivi.
- **Nudɔdɔ kple fetu si do xoxo.** Gakotoku siwo mexɔ ZIP 317 o ate ŋu aɖo flat fe xoxoa ɖa kokoko, si ate ŋu ana asitsatsa aɖe nanɔ anyi si dzi womeɖo kpee o.
- **Resending before expiry.** Asitsatsa si le lalam ateŋu aɖo kpe edzi kokoko vaseɖe esime wòawu enu. Kpɔ nɔnɔme si me ɣeyiɣia wu enu le hafi nàwɔ fexexe bubu.

## Ɖo ŋku edzi

Taflatse de dzesii be mɔ si le dedie wu si dzi nàto azã ZEC enye asitsatsa siwo wokpɔ ta na zazã ɣesiaɣi si ame si ɖoe ɖa, amesi xɔe, gakotoku, kple dɔwɔƒea katã do alɔ wo. Gakotoku kple asitɔtrɔ aɖewo doa alɔe [adrɛs siwo wowɔ ɖekae](https://electriccoin.co/blog/unified-addresses-in-zcash-explained/#:~:text=The%20unified%20address%20(UA)%20is,within%20the%20broader%20Zcash%20ecosystem.), si ateŋu aƒo Zcash xɔla ƒomevi geɖewo nu ƒu ɖe adrɛs ɖeka me.

## Nunɔamesiwo

- [ZIP 203: Asitsatsa ƒe Nuwuwu](https://zips.z.cash/zip-0203)
- [ZIP 317: Fetu si Woxena Ðe Amewo ƒe Ðoɖo Nu](https://zips.z.cash/zip-0317)
- [Zcash ƒe ZIPwo](https://zips.z.cash/)

## Axa Siwo Do Ƒome Kplii

- [Gakotokuwo](/using-zcash/wallets) - gakotoku siwo doa alɔ shielded sending, eye esiwo me kɔ ko
- [Ta Siwo Wotsɔ Akpoxɔnu Wɔe](/using-zcash/shielded-pools) - Sapling kple Orchard, ta siwo me wò ga si wokpɔ ta na la le
- [Nuŋlɔɖiwo](/using-zcash/memos) - gbedasi siwo wotsɔ nya ɣaɣlawo ŋlɔe siwo ate ŋu azɔ mɔ kple asitsatsa si wokpɔ ta na
- [Adrɛs Siwo Wotsɔna Ðoa Nui Siwo Me Kɔkɔe](/using-zcash/transparent-exchange-addresses) - TEX adrɛswo kple nusita exchangewo zãa wo
- [Vidzikpɔkpɔ ƒe Asitɔtrɔ](/using-zcash/custodial-exchanges) - si exchanges doa alɔ shielded gaɖeɖe

## ZEC yi ZAT ƒe Trɔla
