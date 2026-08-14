<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Shielded_Pools.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash Asixɔxɔ Tawo 

## TL;DR

- Zcash fifia ** asixɔxɔ ƒe ƒuƒoƒo 5** le esi: Sprout (domenyinu), Sapling, Orchard (gazazã ɖeɖeko), Ironwood, kple Transparent.
- **Ironwood** nye fifia gbãtɔ si wokpɔ ta na, si le agbe tso esime wowɔ NU6.3 ƒe tɔtrɔ le 28 July 2026.
- **Orchard** nye **zazã ɖeɖeko** fifia: asixɔxɔ yeye aɖeke mateŋu age ɖe eme o, eye ga siwo li xoxo la ʋuna yia Ironwood.
- **Sapling** (z-adrɛs siwo dzea egɔme kple `zs`) gakpɔtɔ le megbe na ame geɖe eye wòyi edzi le ZEC si ŋu wokpɔ ta na ƒe agbɔsɔsɔ gã aɖe kpɔm.
- **Adrɛs siwo me kɔ** (t...) menaa asitsatsa ƒe nya ɣaɣla aɖeke o eye wowɔa dɔ abe Bitcoin ene.
- **Sprout** nye domenyinu si wokpɔ ta na si woxɔ dzudzɔ le dɔwɔwɔ vevie me.
- Orchard yi Ironwood ʋuʋu le **le edzi yim** eye wole edzi kpɔm le dutoƒo to turnstile dzi.
- Le ameŋunyatakakawo ŋuti kakaɖedzi sesẽtɔ kekeake ta la, ele be ezãlawo nayi edzi alɔ̃ **shielded-to-shielded (z → z)** ƒe asitsatsa ɣesiaɣi si wòanya wɔ.


<br/>

## Zcash Value Pools gɔmesese

Zcash ma ga ɖe akɔntabubu ƒe ɖoɖo vovovo siwo woyɔna be asixɔxɔ ƒe ƒuƒoƒo me. Ta ɖesiaɖe kple eƒe nya ɣaɣlawo ƒe sewo kple ameŋunyatakakawo ƒe nɔnɔmewo, esime ɖoɖowɔɖia léa ŋku ɖe asixɔxɔ bliboa si le zɔzɔm le wo dome ŋu.

Egbea la, asixɔxɔ vevi atɔ̃ ƒe ƒuƒoƒo atɔ̃ le network la me:

- Transparent — Dutoƒo kple bliboe dzedze le kɔsɔkɔsɔ.
- Sapling — Egbegbe ta gbãtɔ si ame geɖe xɔna si ŋu wokpɔa akpoxɔnu le, si gakpɔtɔ le dɔ wɔm.
- Orchard — The previous primary shielded pool, now spend-only.
- Ironwood — Fifia gbãtɔ si wokpɔ ta na, si NU6.3 to vɛ.
- Sprout — Gbãtɔ si wotsɔ akpoxɔnu ta la dze egɔme kple Zcash le ƒe 2016 me.
  


Esi Zcash le ŋgɔ yim la, woate ŋu ato tadeaguƒe yeye siwo ŋu wokpɔ ta na vɛ be woatsɔ ana dedienɔnɔ, ame ŋutɔ ƒe nyawo gbɔ kpɔkpɔ, zazã, kple agbalẽdzikpɔkpɔ nanyo ɖe edzi esime wole ɖekawɔwɔ me kple ga siwo li fifia.

<br/>

![img1](/content-images/4ba8cca2-cea5-42d2-8ec2-2122b26f5144-9db37e245e.webp)
Fig 1: Tabla si ɖe ta 4 siwo li fifia le October, 2025 me fia

<br/>

## Ta Siwo Wotsɔ Akpoxɔnu Wɔe 


1. <h3 id="ironwood" class="text-3xl font-bold my-4">Ironwood Pool</h3>

Ironwood ye nye ta vevitɔ si ŋu wokpɔa akpoxɔnu le fifia. Ewɔ dɔ le 28 July 2026 dzi le block 3,428,143 abe NU6.3 network upgrade ƒe akpa aɖe ene, eye enye afisi shielded value yeye le fifia.

Eli elabena wokpɔ afɔku aɖe le Orchard ƒe kpeɖodziɖoɖoa me le May 2026. Kpeɖodzi aɖeke meli be wowɔ eŋudɔ kpɔ o, gake vodadaa fia be womate ŋu atsɔ kpeɖodziawo ɖeɖeko aɖo kpe edzi be nusi wotsɔ akpoxɔnu na la sɔ o. Le esi teƒe be woatsɔ patch aɖo teƒea la, network la wɔ ta yeye aɖe si me nutome sue si woɖɔ ɖo eye wòtsɔ asixɔxɔ to turnstile si xlẽa gaku ɖesiaɖe le dutoƒo la dzi. Akɔntabubu mae gbugbɔa kakaɖedzi si nye be woda megbe na nusiwo wotsɔ akpoxɔnu na la bliboe.

Ironwood gbugbɔ zãa Orchard ƒe Action model kple Halo 2 ƒe kpeɖodziwo, eyata ewɔa nu ɖekae gbesiagbe. Nu eve nye yeye: asitsatsa zãa v6 ƒe nɔnɔme, eye Ironwood ƒe nuŋlɔɖiwo nye **quantum-recoverable** te [ZIP ƒe 2005](https://zips.z.cash/zip-2005), si fia be gaku ƒe kɔsɔkɔsɔ me nuŋlɔɖi nɔa anyi si woate ŋu agbugbɔ axɔ ne quantum kɔmpiuta si ava va gblẽ egbegbe nya ɣaɣlawo me. Ema nye mɔ si dzi woato ahaya, ke menye quantum resistance o, eye meku ɖe ta xoxowo ŋu o.

Mehiã be nàzã adrɛs yeye o. Adrɛs siwo wowɔ ɖekae la ƒoa xɔla geɖe nu ƒu, eye gakotokuwo tiaa ta si sɔ na wò.

____

2. <h3 id="orchard" class="text-3xl font-bold my-4">Orchard Pool</h3>


![img2](/content-images/a672e001-6dbc-4e76-ab31-0ed7d7d2ff72-93b5a23e5d.webp)
Fig 2: Tabla si ɖe Orchard ta la fia tso October, 2025 me

<br/>

Wowɔ Orchard Shielded Pool la ŋudɔ le May 31, 2022 dzi abe NU5 ƒe network ƒe tɔtrɔ ƒe akpa aɖe ene. Orchard to shielded protocol yeye aɖe vɛ si ɖe ɖoɖo si dzi woka ɖo ƒe hiahiã ɖa eye wòva zu shielded pool vevitɔ si Unified Addresses (UAs) zãna.

Orchard na zazã, dɔwɔwɔ nyuie, kple adzamenyawo nyo ɖe edzi ŋutɔ to asitsatsa ƒe metadata ƒe sisi dzi ɖeɖe kpɔtɔ kple asitsatsa ƒe kpɔɖeŋu si te ŋu trɔna bɔbɔe wu si wotu ɖe Nuwɔnawo dzi tsɔ wu nusiwo wotsɔ de eme kple nusiwo woɖe tso eme siwo wokpɔ ta na tsã la dodo ɖe ŋgɔ me.

Tso esime Ironwood ƒe ɖɔɖɔɖoa dze dɔ le 28 July 2026 dzi la, **Orchard nye gazazã ɖeɖeko**. Asixɔxɔ yeye aɖeke mate ŋu age ɖe ta la me o. Woate ŋu azã ga siwo le afima xoxo la kokoko, eye wole ʋuʋum yina Ironwood to mɔ si dzi woatrɔ asi le la dzi. Gakotokuwo kpɔa esia gbɔ na wò, togbɔ be wo dometɔ akpa gãtɔ nana nèkpɔa ŋusẽ aɖe ɖe alesi nèle du dzii dzi hã.

Ne Orchard ƒe ga le asiwò la, kpɔ ɖa [Ironwood ƒe ati](/zcash-tech/ironwood) le nusi ʋuʋua fia le nuwɔna me ta.

____

3. <h3 id="sapling" class="text-3xl font-bold my-4">Sapling Pool</h3>


![img3](/content-images/b1c6bb71-9356-45eb-8e4a-19d7cf1790ae-5e3051b082.webp)
Fig 3: Tabla si fia Sapling ta la tso October, 2025 me

<br/>

[Zcash Sapling](https://z.cash/upgrade/sapling) nye tɔtrɔ gã aɖe na Zcash ɖoɖowɔɖi si woto vɛ le 28th of October, 2018. Enye ŋgɔyiyi gã aɖe wu esi woyɔna be Sprout ƒe tɔtrɔ si do ŋgɔ si seɖoƒe aɖewo nɔ le adzamenyawo, dɔwɔwɔ nyuie kple zazã gome. 

Dodoɖeŋgɔ aɖewo dometɔ aɖewoe nye dɔwɔwɔ nyuie wu na adrɛs siwo wokpɔ ta na, Nukpɔkpɔ ƒe safui siwo nyo wu be wòana zãlawo nate ŋu akpɔ asitsatsa siwo va kple esiwo dona evɔ womaɖe zãla ƒe safui ɣaɣlawo ɖe go o kple Independent Zero Knowledge safuiwo na hardware gakotoku le asitsatsa ƒe asidede agbalẽ te me. 

Zcash Sapling na be ezãlawo te ŋu wɔa ame ŋutɔ ƒe asitsatsa le sɛkɛnd ʋee aɖewo ko me ne wotsɔe sɔ kple ɣeyiɣi didi si wòxɔ le Sprout Series me. 

Asitsatsa ƒe ametakpɔkpɔ nana ame ŋutɔ ƒe nyatakakawo nyona ɖe edzi, si wɔnɛ be ame etɔ̃lia mate ŋu atsɔ asitsatsa aƒo ƒui ahanya ZEC ƒe agbɔsɔsɔ si woatsɔ aɖo ame bubu gbɔ o. Sapling hã naa zazã nyona ɖe edzi to akɔntabubu ƒe nudidi siwo hiã hena ame ŋutɔ ƒe asitsatsa wɔwɔ dzi ɖeɖe kpɔtɔ to ewɔwɔ be wòanɔ bɔbɔe na ezãlawo me.

Sapling gakotoku adrɛswo dzea egɔme kple "zs" eye woateŋu akpɔ esia le Zcash Shielded Wallet (YWallet, Zingo Wallet Nighthawk kple bubuawo) siwo katã wodo alɔe si me Sapling adrɛswo le la me. Zcash Sapling tsi tre ɖi na ŋgɔyiyi ɖedzesi aɖe le mɔ̃ɖaŋununya me ne wole nu ƒom tso adzamenyawo kple asitsatsa ƒe dɔwɔwɔ nyuie ŋu si na Zcash nye cryptocurrency si wɔa dɔ eye wòwɔa dɔ nyuie na ezãla siwo dea asixɔxɔ adzamenyawo kple dedienɔnɔ ŋu.

____

4. <h3 id="sprout" class="text-3xl font-bold my-4">Sprout Pool</h3>


![img4](/content-images/956eceed-f4d6-4087-99d0-32a770449dda-a3cc45305e.webp)
Fig 4: Tabla si ɖe Sprout ta la fia tso October, 2025 me

Sprout ye nye Zero Knowledge ƒe ameŋunyatakakawo ŋuti ɖoɖo gbãtɔ si ŋu mɔɖeɖe mele o si woʋu kpɔ. Wodze egɔme le October 28th, 2016 dzi.

Wodea dzesi sprout adrɛswo to woƒe ŋɔŋlɔdzesi eve gbãtɔ siwo nye "zc" ɣesiaɣi. Wotsɔ ŋkɔ nɛ be "Sprout" kple taɖodzinu vevitɔ be woate gbe ɖe edzi be kɔmpiutadziɖoɖoa nye sɔhɛ, blockchain si le tsitsim si si ŋutete gã aɖe le be wòatsi eye wòʋu na ŋgɔyiyi. 

Wozã Sprout abe dɔwɔnu gbãtɔ ene na... [Zcash blewu dze Mining gɔme](https://electriccoin.co/blog/slow-start-and-mining-ecosystem/) si he ZEC kple Block ƒe teƒeɖoɖowo mama na Tomenukulawo vɛ. 

Esi Zcash ƒe lãwo ƒe agbenɔnɔ ƒe ɖoɖoa yi edzi le kekem ɖe enu kple asitsatsa siwo wokpɔ ta na ƒe xexlẽme si le dzidzim ɖe edzi la, wode dzesii be Zcash Sprout Series va zu seɖoƒe eye megawɔa dɔ nyuie o ne wole nu ƒom tso zãla ƒe adzamenyawo, asitsatsa ƒe dzidziɖedzi kple dɔwɔwɔ ŋu. Esia na wotrɔ asi le network la ŋu eye wowɔ Sapling Upgrade. 

---
5. <h3 id="transparent" class="text-3xl font-bold my-4">Transparent Pool</h3>
<br/>

![img5](/content-images/01de2907-b62d-4421-83d7-ea4908faa828-6f74b724ed.webp)
Fig 5: Tabla si ɖe Transparent pool fia tso October, 2025 me

<br/>

Zcash Transparent ta la nye esi womekpɔ ta na o eye menye ame ŋutɔ tɔ o. Gakotoku ƒe adrɛs si me kɔ le Zcash dzi dzea egɔme kple ŋɔŋlɔdzesi "t", adzamenyawo le sue ŋutɔ le adrɛs ƒomevi sia zazã na asitsatsa me.

Asitsatsa siwo me kɔ le Zcash me sɔ kple Bitcoin ƒe asitsatsa si doa alɔ asitsatsa siwo me wode asi geɖe te eye wòwɔa dutoƒo adrɛs siwo wozãna ɖaa ŋudɔ.

Zcash Transparent la wozãna zi geɖe to centralized exchanges dzi be woakpɔ egbɔ be there’s high transparency and network confirmation ne wole ZEC ɖom ɖa hele exɔm le ezãlawo dome.

Ele vevie hã be míade dzesii be togbɔ be Zcash Shielded adrɛswo naa adzamenyawo gbɔ kpɔkpɔ deŋgɔ le asitsatsa me hã la, wohiãa akɔntabubu dɔwɔnu geɖe wu hã be woatsɔ awɔ asitsatsa ŋudɔ. Eyata, ezãla aɖewo ate ŋu axɔ Adrɛs siwo me kɔ na asitsatsa siwo mehiã be woatsɔ adzamenyawo ƒe ɖoɖo ɖeka ma ke o.

<br/>

## Pool Transfer Nuwɔna si Wokafu

Ne eva hiã be nàbu ameŋunyatakakawo ƒe ɖoƒe kɔkɔ ŋu le asitsatsa me le Zcash Network dzi la, eɖo aɖaŋu be nàwɔ ɖe nuwɔna siwo le ete dzi;

Asitsatsa si yia edzi le "z vaseɖe z" gakotokuwo dome le Zcash blockchain dzi la ƒe akpa gãtɔ nyea ametakpɔnu eye woyɔnɛ ɣeaɖewoɣi be Ame ŋutɔ ƒe Asitsatsa le Adzamenyawo ƒe ɖoɖo gã si wowɔ ta. Zi geɖe la, esiae nye mɔ nyuitɔ kple esi wokafu wu si dzi woato aɖo $ZEC ɖa ahaxɔe ne ehiã be woazã ame ŋutɔ ƒe nyawo. 

---

Ne èɖo ZEC tso "Z-adrɛs" dzi yi "T-adrɛs" dzi la, ɖeko wòfia Deshielding ƒe asitsatsa ƒomevi aɖe. Le asitsatsa sia ƒomevi me la, ameŋunyatakakawo ƒe seƒe mekɔna ɣesiaɣi o elabena nyatakaka aɖewo adze le blockchain la dzi le ŋusẽ si ZEC ɖoɖo ɖe Adrɛs si me kɔ dzi ta. Menye ɣesiaɣie wokafua adzɔnuwo ɖeɖeɖa ne ehiã be woaɣla ame ŋutɔ ƒe nyawo o. 

---

ZEC tsɔtsɔ tso Adrɛs si me kɔ (T-adrɛs) me yi Z-adrɛs dzi koe woyɔna be Shielding. Le asitsatsa sia ƒomevi me la, ameŋunyatakakawo ƒe seƒe mekɔna ɣesiaɣi ne wotsɔe sɔ kple z-z asitsatsa tɔ o gake wokafui hã ne wobia adzamenyawo. 

---

ZEC ɖoɖo tso Adrɛs si me kɔ (T-adrɛs) yi Adrɛs si me kɔ (T-adrɛs) bubu me le Zcash Network (T-T asitsatsa) dzi sɔ kple Bitcoin ƒe asitsatsa tɔ ŋutɔ eye esia tae woyɔa T-T asitsatsa le Zcash dzi ɣesiaɣi be Dutoƒo asitsatsa elabena amesi ɖoe ɖa kple amesi xɔe siaa ƒe asitsatsa ŋuti nyatakakawo va dzena na dukɔa si wɔnɛ be Ameŋunyatakakawo ƒe seƒe bɔbɔ ŋutɔ le asitsatsa ma tɔgbe me. 

Cryptocurrency Centralized exchange akpa gãtɔ wɔa Transparent Address ("T-address) ŋudɔ ne eva le asitsatsa le Zcash blockchain dzi gake asitsatsa sia ƒomevi (T-T) makpɔ ame ŋutɔ ƒe nunɔamesi aɖeke o.

<br/>

## The Orchard to Ironwood Migration

The migration is happening now. Orchard is sealed to new deposits, and the value still sitting there is moving into Ironwood a transaction at a time. You can watch the totals at [ironwood.le agbe](https://ironwood.live/).

Nusi esia fia nɔ te ɖe afisi wò ga le dzi:

1. **Dɔwɔna yeye si wokpɔ ta na** yia Ironwood me le eɖokui si. Naneke meli woawɔ o.
2. **Ehiã be Orchard ga siwo li fifia** naʋu ayi teƒe bubu. Gakotoku siwo ŋu wodzra ɖo la wɔa esia na wò, zi geɖe la, wowɔa esia le afɔɖeɖewo me tsɔ wu be woawɔe zi ɖeka.
3. **Sapling mekpɔ ŋusẽ ɖe edzi o** eye wògaxɔa ga kokoko. Orchard koe wotre nu na.
4. **Tɔtrɔmɔ̃a xlẽa nusianu** si tso tawo dome, si nye nusi ɖo kpe edzi be wometo gaku aɖeke vɛ le mɔa dzi o.

> **Adzamenyawo ŋuti nuxlɔ̃ame ɖeka si dze be nànya.** Turstile la taa *agbɔsɔsɔ* si tso tadeaguƒewo dome, tsɔ kpe ɖe block ƒe kɔkɔme ŋu. Ame si ɖoe ɖa kple amesi xɔe la nɔa ɣaɣla abe alesi wònɔna ɖaa ene, gake woate ŋu atsɔ ga home tɔxɛ aɖe aɖo kadodo me kpli wò. Esia tae gakotokuwo ʋuna le afɔɖeɖe vovovowo me to ga home siwo wozãna ɖaa zazã me tsɔ wu be woaʋuʋu wò ga si susɔ ɖe ƒuƒoƒo ɖeka si woate ŋu ade dzesii me. Na wò gakotokua nazɔ eɖokui, eye nàbu Tor alo VPN zazã ŋu ale be wò IP nagabla ɖe ga home siwo nèʋuna ŋu o.

Kpɔ [Ironwood ƒe ati](/zcash-tech/ironwood) na ŋgɔyiyia ŋutɔ, eye [Turnstile ƒe ʋuƒoa](/zcash-tech/the-turnstile) le alesi akɔntabubua wɔa dɔe ta.

<br/>

## Vodada Siwo Wòaƒo Asa na Zi geɖe

- **Dɔdɔ tso t-adrɛs dzi yi t-adrɛs dzi** — dutoƒo bliboe, ame ŋutɔ ƒe nya aɖeke mele eme o. Kpɔ ga ta gbã ɣesiaɣi.
- **Ne míetsɔe be Orchard gakpɔtɔ xɔa ga** — enye gazazã ɖeɖeko tso 28 July 2026. Asixɔxɔ ateŋu adzo, gake nu yeye aɖeke megena ɖe eme o
- **Tɔtɔ Sapling kple Unified adrɛs** — Sapling adrɛswo dzea egɔme kple `zs`. Adrɛs siwo wowɔ ɖekae dzea egɔme tso `u1` eye nàƒo gaxɔla geɖe nu ƒu, eyata ta si me wò fexexea adze ɖo la nɔ te ɖe xɔla siwo adrɛs ma tsɔna dzi
- **Gagblẽ ɖe Sprout-ta la me** — Woɖe asi le Sprout ŋu ƒe geɖe enye sia; tsɔ ga mawo do goe
- **Mɔkpɔkpɔ be ʋuʋu aɖe nanye nusi womate ŋu akpɔ keŋkeŋ o** — ga home si tso turnstile la nye dutoƒo, togbɔ be ame si ɖoe ɖa kple amesi xɔe menye nenema o hã
- **Ne míetsɔe be t → z (ametakpɔnu) nye ame ŋutɔ tɔ bliboe** — ametakpɔnu ŋutɔ ƒe nuwɔna dzena le kɔsɔkɔsɔ me; emenyawo mele nenema o

---

## Axa Siwo Do Ƒome Kplii

- [Ironwood ƒe ati](/zcash-tech/ironwood) — Dodoɖeŋgɔ si wɔ fifi ta la
- [Turnstile ƒe ʋuƒoa](/zcash-tech/the-turnstile) — Alesi wodzroa asixɔxɔ si le ʋuʋum le tadeaguƒewo dome la me
- [Gakotokuwo](/using-zcash/wallets) — Gakotoku siwo ŋu woléa be na eye Ironwood le klalo
- [Adzɔnuwo ƒe asitsatsa](/using-zcash/transactions) — Alesi woaɖo adzɔnuwɔna siwo ŋu wokpɔ ta na
- [ZEC ƒeƒle](/using-zcash/buying-zec) — ZEC xɔxɔ hafi azãe le tadeaguƒewo
- [ZK-SNARKs ƒe nyawo](/zcash-tech/zk-snarks) — Ta siwo ŋu wokpɔ akpoxɔnu le ƒe gɔmeɖoanyi si wotsɔa nya ɣaɣlawo ŋlɔnae
- [Nukae nye ZEC kple Zcash](/start-here/what-is-zec-and-zcash) — Zcash ƒe ameŋunyatakakawo ŋuti nyatakakawo
