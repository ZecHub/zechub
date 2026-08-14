<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/NU5.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# NU5

> NU5 yi agbe le Zcash mainnet dzi le block 1,687,104 (May 31, 2022 UTC).

Nusi nàtsɔ adzoe: alesi NU5 na Zcash takpɔƒe yeye si wokpɔ ta na si mehiã ɖoɖo si dzi woka ɖo o, tsɔ kpe ɖe adrɛs ƒomevi ɖeka si wɔa dɔ le tadeaguƒewo katã me ŋu.

NU5 (Network Upgrade 5) nye Zcash adelia [network ƒe ŋgɔyiyi](../start-here/network-upgrades), si woɖo ɖe dɔ me to [ZIP 252 ƒe xexlẽdzesi](https://zips.z.cash/zip-0252). Enye nya ɣaɣlawo ƒe asitɔtrɔ gã aɖe. Eto Orchard shielded payment protocol vɛ, si wotu ɖe Halo 2 proving system dzi, tsɔ kpe ɖe adrɛs siwo wowɔ ɖekae kple version 5 ƒe asitsatsa ƒe ɖoɖo yeye ŋu. NU5 si woɖo ɖe Electric Coin Company ƒe zcashd v5.0.0 ƒe dodo me.

Nusitae esia le vevie ɖo. Ðeko woate ŋu aka ɖe ta si wotsɔ akpoxɔnu wɔe dzi abe ɖoɖo si wɔe ene. Zcash ƒe ta eve gbãtɔ siwo ŋu wokpɔ akpoxɔnu le, Sprout kple Sapling, ɖesiaɖe hiã na ɖoɖowɔwɔ ƒe kɔnu si dzi woka ɖo zi ɖeka be woawɔ woƒe adzame nɔnɔmetatawo. Ne ɖe wolé parameter mawo me ɖe asi gbeɖeka tsɔ wu be woatsrɔ̃ wo la, anye ne ame aɖe ate ŋu ata ZEC aʋatso la ame aɖeke makpɔe hafi. NU5 ƒe Orchard ta la wua dzimaɖitsitsi ma nu to Halo 2 ƒe kpeɖodziɖoɖoa zazã me, si mehiã be woawɔ kɔnu ma tɔgbe aɖeke o.

## Ðoɖo si dzi woka ɖo

Orchard nye Zcash ƒe shielded protocol yeyetɔ kekeake, si woɖe fia le [ZIP 224 ƒe xexlẽdzesi](https://zips.z.cash/zip-0224). Wotue ɖe Halo 2 kpeɖodziɖoɖoa dzi, si zãa mɔnu aɖe si woyɔna be PLONKish akɔntabubu le Pallas kple Vesta ƒe ʋuʋudedi ƒe tsatsam dzi. Fetu ŋutɔŋutɔ le bɔbɔe: Halo 2 mehiã ɖoɖo si dzi woka ɖo o eye mehiã be woawɔ nufiame ka si woɖo ɖe ɖoɖo nu o, eyata adzame parameter aɖeke meli si woate ŋu azã le mɔ gbegblẽ nu gbeɖe o.

Sprout kple Sapling siaa nɔ te ɖe ɖoɖo si dzi woka ɖo dzi. Amewo ƒe ƒuƒoƒo aɖe wɔ kɔnu aɖe tsɔ tu ta ɖesiaɖe ƒe parameterwo ɖo, eye ele be amesiame naka ɖe edzi be yewo dometɔ ɖeka ya teti tsrɔ̃ yewoƒe nya ɣaɣla la ƒe akpa aɖe. Orchard ɖea susu ma ɖa. Ta xoxoawo gakpɔtɔ li le NU5 megbe, eyata ɖoɖo aɖeke mawɔmawɔ ƒe kakaɖedzia ku ɖe ga siwo nèlé ɖe Orchard ta la me ŋu.

![Before NU5, Sprout and Sapling needed a trusted setup ceremony. After NU5, the Orchard pool uses the Halo 2 system and needs no trusted setup](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/nu5-trusted-setup.png)

## Nusi NU5 trɔ

NU5 ƒoa tɔtrɔ geɖe siwo dzi woda asi ɖo nu ƒu, siwo katã wowɔ dɔ ɖekae le block 1,687,104.

1. Etsɔ Orchard shielded pool (ZIP 224), si nye Halo 2 based protocol si ŋu míeƒo nu tsoe le etame la kpe ɖe eŋu.
2. Etsɔ version 5 transaction format (ZIP 225) kpe ɖe eŋu, si nye ɖoɖo si wogbugbɔ trɔ asi le si me nuto vovovowo le na Orchard ƒe nyatakaka siwo me kɔ, Sapling, kple yeyewo. Woɖe Sprout fields ɖa, eye version 4 ƒe nɔnɔme xoxoa nɔ dɔ wɔm le dɔwɔwɔ vɔ megbe.
3. Eto adrɛs siwo wowɔ ɖekae kple nukpɔkpɔ ƒe safui siwo wowɔ ɖekae (ZIP 316) vɛ, siwo ŋu woƒo nu tsoe le akpa si kplɔe ɖo me.
4. Exɔ asitsatsa ƒe dzesidenu non-malleability (ZIP 244), si nye mɔnu yeye aɖe si dzi woato abu asitsatsa ƒe id si ma nusi asitsatsa wɔna tso kpeɖodzi kple asidede agbalẽ te siwo ɖe mɔ nɛ gbɔ.
5. Exɔ Jubjub point encodings si le se nu (ZIP 216) be yeaɖe encodings siwo mele ɖoɖo nu o ɖa eye wòase se siwo wobu be enye asitsatsa si sɔ la me sesĩe.
6. Ena wowɔ asitɔtrɔ le version 5 ƒe asitsatsa ŋu le peer-to-peer network (ZIP 239) dzi.

NU5 hã trɔ asi le ZIP geɖe siwo li xoxo ŋu (32, 203, 209, 212, 213, 221, kple 401) ale be woawoe bua akɔnta le Orchard ƒe ta yeyea ŋu.

## Adrɛs siwo wowɔ ɖekae

Do ŋgɔ na NU5 la, adrɛs ƒomevi nɔa ta ɖesiaɖe si, eye ele be amesi ɖoe ɖa nanya ƒomevi si nèdi. Adrɛs siwo wowɔ ɖekae, siwo gɔme woɖe le [ZIP 316 ƒe xexlẽdzesi](https://zips.z.cash/zip-0316), trɔ ema. Adrɛs ɖeka si wowɔ ɖekae ate ŋu aƒo xɔla siwo wu ta ɖeka nu ƒu, eyata ɖeko amesi ɖoe ɖa ƒe gakotokua tiaa nyuitɔ kekeake si wòdo alɔe.

![A unified address bundles receivers for several pools: a transparent receiver, a Sapling receiver, and a new Orchard receiver](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/nu5-unified-address.png)

Nukpɔkpɔ ƒe safui siwo wowɔ ɖekae wɔa dɔ nenema ke na nukpɔkpɔ. Wonana nuxexlẽ ɖeɖeko kpɔa nu le ta siwo ŋu adrɛs aɖe ƒo nu tsoe la dzi. Ne èdi nyatakaka bubuwo tso ema ŋu la, kpɔ... [Safuiwo Kpɔkpɔ](../zcash-tech/viewing-keys) axa 10.

## Afisi NU5 bɔbɔ nɔ

NU5 kplɔ Zcash ƒe tɔtrɔ siwo wòwɔ do ŋgɔ ɖo: Overwinter, Sapling, Blossom, Heartwood, kple Canopy. Ewɔ dɔ le mainnet dzi le May 31, 2022. Wotia Orchard ƒe curve cycle elabena edoa alɔ recursion, si nye gɔmeɖoanyi na scaling dɔwɔwɔ emegbe. NU5 nye ŋgɔdola tẽ na NU6 kple NU6.x fli ƒe tɔtrɔwo, si tu ɖe Orchard ta la dzi eye emegbe woɖɔe ɖo.

## Nyagɔmeɖegbalẽ

| Nyagbe | Plain-Eŋlisigbe me gɔmesese |
|---|---|
| Netwɔƒe ƒe ŋgɔyiyi (NU) | Tɔtrɔ si wowɔ ɖekae ɖe Zcash ƒe se siwo dzi woda asi ɖo ŋu, si wowɔ dɔ le block ƒe kɔkɔme si woɖo ɖi |
| Orchard | The shielded pool NU5 introduced, built on the Halo 2 proving system |
| Halo 2 ƒe ƒuƒoƒo | Kpeɖodziɖoɖo si le megbe na Orchard si mehiã ɖoɖo si dzi woka ɖo o |
| Ðoɖo si dzi woka ɖo | Kɔnu si wowɔna zi ɖeka si wɔa ta aɖe ƒe nya ɣaɣlawo eye ele be woaka ɖe edzi be wòatsrɔ̃ wo |
| Adrɛs si wowɔ ɖekae | Adrɛs ɖeka si ateŋu aƒo xɔlawo nu ƒu na ta si wu ɖeka (ZIP 316) |
| Nubabla ƒe alɔdze id | Dzesidenu si dea dzesi se siwo me asitsatsa aɖe le |

## Nyabiasewo ƒe Nyabiasewo

Ðe NU5 trɔa nye ZEC alo nye adzamenyawoa? Ao NU5 tsɔ shielded pool yeye kple adrɛs ƒe ɖoɖo yeye kpee. Wò ZEC si li fifia mekpɔ ŋusẽ ɖe edzi o, eye womeɖe wò nyatakakawo dzi kpɔtɔ o. Ga tsɔtsɔ yi Orchard naa ta aɖe si mehiã ɖoɖo si dzi woka ɖo o la sua asiwò.

Nukae nye Atikutsetsebɔ? Orchard nye Zcash ƒe shielded protocol si NU5 to vɛ. Ewɔa dɔ le Halo 2 kpeɖodziɖoɖoa dzi, eyata mehiã be woawɔ ɖoɖo ƒe wɔna si dzi woka ɖo o.

Ðe wòle be mawɔ nanea? Ao, gakotoku si wodo alɔe la kpɔa NU5 gbɔ na wò. Àte ŋu ayi edzi anɔ adrɛs xoxowo zãm, eye àte ŋu adze adrɛs siwo wowɔ ɖekae zazã gɔme ne wò gakotokua tsɔ wo na.

Nukae nye adrɛs si wowɔ ɖekae? Adrɛs ɖeka si ate ŋu alé receivers na pool siwo wu ɖeka. Amesi ɖoe ɖa ƒe gakotokua tiaa ta si wòdoa alɔe, eyata mehiã be nàna adrɛs vovovo na ƒomevi ɖesiaɖe o.

Ðe NU5 ɖea ɖoɖo si dzi woka ɖo la ɖa le nye ga xoxowo mea? Menye le megbedede me o. Orchard mehiã ɖoɖo si dzi woka ɖo o, gake Sapling pool ƒe parameters do ŋgɔ gakpɔtɔ li le NU5 megbe. Kakaɖedzi si nye be womaɖoe o la ku ɖe ga siwo le Orchard ƒe ta la me ŋu.

Ðe asitsatsa ƒe ɖoɖo xoxoa dzudzɔ dɔwɔwɔa? Ao, NU5 tsɔ version 5 ƒe nɔnɔme kpee, eye version 4 ƒe nɔnɔme xoxoa gakpɔtɔ nɔ dɔ wɔm le dɔwɔwɔ vɔ megbe.

## Do wò nugɔmesese kpɔ

Sprout kple Sapling siaa hiã ɖoɖowɔwɔ ƒe wɔna si dzi woka ɖo. Nukae NU5 ƒe Orchard pool trɔ le ema ŋu, eye nukatae wòle vevie?

<details>
<summary>Answer</summary>

Wotu Orchard ɖe Halo 2 kpeɖodziɖoɖoa dzi, si mehiã ɖoɖo si dzi woka ɖo o eye mehiã be woaɖo nufiame ka si woɖo ɖe ɖoɖo nu o. Ema ɖea afɔku si nye be woate ŋu azã nya ɣaɣla siwo susɔ atsɔ awɔ aʋatso ZEC gbeɖeka la ɖa. Kakaɖedzia ku ɖe ga siwo le Orchard ta la me ŋu. Sapling ƒe nɔnɔmetata xoxoawo gakpɔtɔ li le NU5 megbe.
</details>

### Nunɔamesiwo

[ZIP 252: NU5 Network Upgrade ƒe dɔwɔwɔ](https://zips.z.cash/zip-0252)

[ZIP 224: Orchard Shielded Protocol](https://zips.z.cash/zip-0224)

[ZIP 225: Version 5 ƒe Asitsatsa ƒe Nɔnɔme](https://zips.z.cash/zip-0225)

[ZIP 316: Adrɛs Siwo Wowɔ Ðeka Kple Nukpɔkpɔ ƒe Safui Siwo Wowɔ Ðeka](https://zips.z.cash/zip-0316)

[Netwɔƒe ƒe Ðɔɖɔɖo 5](https://z.cash/upgrade/nu5/)

[Electric Coin Company: zcashd 5.0.0 release](https://electriccoin.co/blog/new-release-5-0-0/)

### Kpɔe hã

[Zcash Network ƒe Ðɔɖɔɖowo](../start-here/network-upgrades)

[Ta Siwo Wotsɔ Akpoxɔnu Wɔe](../using-zcash/shielded-pools)

[Halo](../zcash-tech/halo)

[zk-SNARKS ƑE NUÐEÐEŊUTI](../zcash-tech/zk-snarks)

[Safuiwo Kpɔkpɔ](../zcash-tech/viewing-keys)

[NU6.1](../zcash-tech/nu6-1)

---

Siwo kplɔ wo nɔewo ɖo: [Network Upgrades ƒe dzesi](../start-here/network-upgrades) · Si do ŋgᴐ: [Canopy ƒe xɔmenuwo](../zcash-tech/canopy) · Esi kplᴐe ɖo: [NU6](../zcash-tech/nu6)
