<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zakura_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zakura ƒe Nuƒoƒomevi

> 🇧🇷 [Portuguese me tɔ gɔmeɖeɖewo](/zechubglobal/zcashbrasil/zcashtech/zakura)

Zakura nye femaxee, open-source nuwɔƒe blibo ƒe ɖoɖowo na Zcash. Edzra ɖo ɖe eƒe dodo ŋu be wòateŋu asẽ wu le mɔ bubu aɖe nu. Wotsɔe tso .com me va do go kple .net dzi eye woɖoe anyi abe "Zaccache" ene. [Zebra](Zebra_Full_Node.md) eye wowɔe to Valar Group kple Project Tachyon ƒe kadodo me la, Zakura naa ɣeyiɣiwɔwɔ kabakaba ŋutɔ, blɔ̃kpowo ŋu ɖoɖo le wo ɖokui si kpakple ɖekawɔwɔ ƒe akpa aɖe na domenyinu siwo li xoxoa. `zcashd` Woɖe 1.0.0 ɖe go le July 15, 2026.

---

## TL;DR

- Zakura nye Zcash ƒe nuwɔƒe blibo si wɔa ɖeka kple ame sia ame eye wònye Zebra kpakple zcashd, siwo tso Zebra gbɔ.
- Blockchain ƒe dɔwɔwɔ le ɖoɖo nu nyea **5x wu Zebra**; snapshot bootstrapping awu enu ɖe **ɖi 2 miniti me**.
- **Native block pruning** naa mɔ dɔwɔlawo be woaɖo nu ɖeka le disk dzi kple teƒe sue aɖe (~11 GB si woɖɔ ɖo tsɔ wu 300 GB na Zebra ƒe nu blibo).
- A **zcashd RPC compatibility mode** ana gaɖabawo kple nu bubuwo ƒe dɔwɔwɔ nanɔ edzi le tɔtrɔ aɖeke me o.
- **experimental P2P transport layer** (si le nuɖoanyi sia me la) tsɔa DoS-dziɖenuiwo ɖoa taɖodzinu siwo gbɔ 500ms ƒe bloawo dome.
- Wowɔ Zcash network upgrade si sɔ kple Ironwood (NU6.3) la le ƒe 2026 me.
- Ame siwo le ŋgɔ na wo enye Sean Bowe (Zcash ƒe kpeɖeŋutɔ, Project Tachyon) kple Dev Ojha (Valar Group).

---

## Nukae nye Zakura?

Zakura nye Zcash ƒe nuwɔƒe blibo si wowɔ tso gɔmedzedzea me be wòadze dɔwɔwɔ gɔme le agbɔsɔme gã aɖe dzi. Togbɔ be ele ɖekawɔwɔ kple Zebra  fiaa be eʋua asi eye wòwɔna ɖe Zcash protocol sewo ke dzi hã la, Zakura tsɔ mɔ̃ɖaŋununya nyui aɖewo ɖo anyi siwo na wohe kuxiwo va teƒeteƒewo ale be woate ŋu awɔ dɔ le Zcash's nuwɔƒea bliboe.

Ewɔe be ɖoɖo sia nye agbagbadzedze ɖeka le **Project Tachyon** (si Sean Bowe, si nye Zcash ƒe cryptographic engineer gbãtɔwo dometɔ ɖeka nɔ ŋgɔ na) kple **Valar Group** (ƒe kplɔla enye Dev Ojha). Wo katã wole dzi dem ƒo ɖe dzidzime yeyea me Zcash protocol ŋu. Zakura ye wɔa dɔ abe nuŋɔŋlɔdɔ̃ tso dɔa ŋuti ene.

---

## Eƒe Nɔnɔme Veviwo

### 5x Faster Chain Synchronization (Nɔviwɔme ƒe Ðekawɔwɔ si Nɔa Vivim Ðe Edzi)

Zakura te ŋu wɔa blockchain ƒe dɔwɔwɔ le ɣeyiɣi ɖeka me kaba zi atɔ̃ wu Zebra. Esia na be ele bɔbɔe ŋutɔ ne ame siwo hiã nuwɔƒe aɖe la di be yewoagbugbɔ asi atrɔ ɖe eŋu alo woadzudzɔ dɔ wɔwɔ enumake.

### Ŋkuléle Ðe Nuwo Ŋu le Vidzĩme

Zakura ɖe nu siwo wotsɔ wɔ mɔ̃ aɖe si dzi woato akpɔ ɣeyiɣi be woate ŋu awɔ ɖeka kple ame bubuwo la me:

◯ Mɔ̃ si wotsɔna ƒoa nuwo ƒu (bootstrap) ❑ Ɣeyiɣi.
|-----------------|------|
Archive snapshot. ~37 minutes. - Nuŋlɔɖi me foto:
Foto si woɖe le aɖabaƒoƒo 2 me.
Zebra (Dɔwɔƒe si me nuwo le ɖekawɔwɔ blibo me) ~20 hours.

Nu kpui siwo woɖɔ ɖo la ƒe lolome le abe **11 GB** ene, si na be wotrɔa mɔ̃wo ɖe ɖoɖo nu kaba wu tso Genesis gbɔ.

### Kpowo ƒe Anyinɔnɔ le Native me

Zakura kpea asi ɖe ɖoɖowɔɖi ƒe blɔkawo ŋu, si naa mɔ node dɔlawo be woana alesi nuɖoanyi la anɔ anyie. Esia na wònɔa bɔbɔe be woaƒle nusianu le hardware dzi kple nudzraɖoƒe sue aɖe  enye viɖenu na validators, developers, and infrastructure providers siwo mehiã ŋutinya blibo o.

### zcashd RPC Ðekawɔwɔ ƒe Mɔnu

Zakura ƒe akpa aɖe nye be ele ɖoɖo si dzi woato awɔ nu kple ame bubuwo la ŋu dɔ le mɔ bubu me. `zcashd` JSON-RPC interface. Gaxɔ, asitsatsa kple ɖekawɔwɔ siwo li fifia si ŋu wotena ɖo le nu siawo dzi la `zcashd` RPCwo ate ŋu atrɔ ɖe Zakura dzi evɔ mahiã be woatrɔ woƒe asitelefon ƒe kɔdodowo o.

### P2P Ʋuʋumenuwo ƒe Dodokpɔwɔƒe

Zakura ƒe tɔdziʋuwo le dzidzime yeyea me kple ame nɔewo dome ʋudodo, si nu mele o fifia. Ne enɔ mɔ dzi la:

- Ne ame aɖe ƒe susu mewɔ ɖeka kple 500ms o la, ekema eƒe nu gblẽna le internet dzi.
- Memaple ƒe ƒuƒoƒo hena nuxexlẽ kple ɖoɖowɔwɔ nyuie wu
- DoS-dziŋgɔdonyawo ŋuti ɖoɖo si ana be kadodoa nanɔ bɔbɔe wu.

Xexlẽdzesi sia nye ŋgɔdonamenu si le Zcash-mɔ̃a ƒe ɖoɖo siwo wowɔna ɖe Project Tachyon dzi la ŋu.

### Ironwood (NU6.3) Ewɔ ɖeka kple Biblia ƒe nudidiwo.

Zakura wɔ ɖeka kple Ironwood network upgrade (NU6.3), si woado ɖe Zcash mainnet dzi le ƒe 2026 titina.

---

## Alesi Zakura Do Ka Kple Zcash Nodes Bubuwoe

| | zcashd | Zebra | Zakura |
|--|--------|-------|--------|
Gbewo: C++ (si tso Bitcoin me) Rust.Rust (si nye Zebra ƒe akpa aɖe).
 Status. Deprecated Active.  Akɔ (v1.0.0, July 2026)
Sync speed. Baseline ~1x~5x wu esi wòle fifia ene
◯ Kpewo ƒe akpa si le ʋuʋu la dzi ɖeɖeɖa ❑ Ao, ao, ɛ̃.
zcashd RPC Compat. Native. Partial. Yes (compact mode)
eʋegbe bootstrap a. o. ẽ (ɖeɖi miniti 2) ee, eye ga si le eme la sɔ gbɔ wu esi wòle be wòanɔ ame sia ŋu hafi wòateŋu awɔ dɔ tso eŋu o.
P2P ƒe numekuku. Ao  Gbeɖe  Ɛ̃ (woaɖu dzi)

---

## Ale Si Nàdze Egɔmee

Woate ŋu awɔ download ƒe tiatiawo, foto kpuiwo kple ɖoɖowɔgbalẽvi le:

- ** Download & Setup Guide:** Eʋegbe kple asitelefon ƒe mɔfiagbalẽwo. [zakura.com/download (Tsɔe ɖe Internet dzi)](https://zakura.com/download/)
- ** Dzesi ƒe foto:** [zakura.com/snapshots (Kpɔtɔ kpuiwo)](https://zakura.com/snapshots/)
- ** Nyatakakadzraɖoƒe:** [github.com/zakura-core/zakuradzigbewo](https://github.com/zakura-core/zakura)

---

## Axawo Siwo Do Ka Kple Wo Nɔewo

- [Zebra ƒe Dzogoe Blibo la](Zebra_Full_Node.md)  Zcash ƒe kɔpi blibo si le ŋgɔ Zakura tso wo nɔewo gbɔ.
- [Zaino Indexɔla](Zaino.md)  Rust-based indexer si sɔ kple Zebra kpakple Zakura.
- [Nuwo ƒe Ŋutete Blibo](Full_Nodes.md)  Zcash ƒe nuŋɔŋlɔwo katã ŋuti numeɖeɖe kpui aɖe.
- [Lightwallet Nodes (Adzagba Kpoƒe)](Lightwallet_Nodes.md)  Asitsala siwo ƒe dɔwo le bɔbɔe wu

## Ganyawo ƒe Kpekpeɖeŋu

- [Zakura ƒe gbeƒãɖeɖee nye esia.](https://zakura.com/announcements/introducing-zakura/)
- [Zakura GitHub me tɔ](https://github.com/zakura-core/zakura)
- [Zakura ƒe nyatakakadzraɖoƒe](https://zakura.com/)
- [Zakura le X/Twitter dzi](https://x.com/ZakuraZcash)
- [Tachyon Dɔwɔƒe La](https://electriccoin.co/blog/)
