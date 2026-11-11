<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/NU5.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# NU5

> NU5 de dze egɔme le Zcash mainnet dzi le gaɖoɖowo ƒuƒoƒe 1,687,104 (May 31, 2022 UTC).

Nu si nànya le esia me nye: ale si NU5 na Zcash gaƒuƒoƒo ɣaɣla yeye si me mɔ̃ ƒe ɖoɖo xexlẽnuwo mele o, kple gaɖoƒe ƒe dzesi ƒomekuku ɖeka si wɔa dɔ le gaƒuƒoƒowo katã me.

NU5 (Network Upgrade 5) nye Zcash ƒe [mɔ̃ ƒe sewo trɔtrɔ](../start-here/network-upgrades) ene, si [ZIP 252](https://zips.z.cash/zip-0252) wɔ. E nye cryptography ƒe mɔ̃trɔ gã aɖe. Etsɔ Orchard fexexe ɣaɣla ƒe protocol va, si wotu ɖe Halo 2 ɖaseɖigbalɛ wɔwɔ ƒe ɖoɖo dzi, kple Unified Addresses kple gaɖoɖo ƒe ƒome 5 ƒe nɔnɔme yeye. NU5 do go le Electric Coin Company ƒe zcashd v5.0.0 ƒe tatã me.

Nu ka tae esia le vevie. Gaƒuƒoƒo ɣaɣla ƒe dzideƒo le abe mɔ̃ ƒe ɖoɖo xexlẽnuwo si wɔe ene. Zcash ƒe gaƒuƒoƒo ɣaɣla gbãtɔ eve, Sprout kple Sapling, hiã mɔ̃ ƒe ɖoɖo xexlẽnuwo ƒe kɔnu ɖeka ƒe kpekpe be woawɔ wo ƒe nya siwo le ɣa me. Ne womegbã nya mawo kpɔ o eye wotsɔe ɖe asi ɖe te, ame aɖe ate ŋu awɔ ZEC ƒe atsyɔ̃tso siwo menye vavã o, eye ame aɖeke makpɔe o. NU5 ƒe Orchard gaƒuƒoƒo na ŋɔdzi ma yi le Halo 2 ɖaseɖigbalɛ wɔwɔ ƒe ɖoɖo si me kpekpe ma ƒomevi aɖeke mele o la zazã me.

## Mɔ̃ ƒe ɖoɖo xexlẽnuwo

Orchard nye protocol ɣaɣla si NU5 tsɔ va, si woɖe fia le [ZIP 224](https://zips.z.cash/zip-0224) me. Wotu e ɖe Halo 2 ɖaseɖigbalɛ wɔwɔ ƒe ɖoɖo dzi, si zazãa mɔ aɖe si woyɔna be PLONKish arithmetization le Pallas kple Vesta curve cycle dzi. Nu si míaate ŋu akpɔ tso eme kɔŋ nye: Halo 2 me mɔ̃ ƒe ɖoɖo xexlẽnuwo kple structured reference string mele o, ale nya ɣa aɖeke si woate ŋu azã vɔ̃ o mele o.

Sprout kple Sapling katã ɖo asi ɖe mɔ̃ ƒe ɖoɖo xexlẽnuwo dzi. Ameha aɖe wɔ kpekpe be woawɔ gaƒuƒoƒo siawo ƒe nya, eye womia be ame mawo dome atɔ̃ ɖeka koe gbã eƒe akpa si le ɣa. Orchard ɖe susu ma ɖa. Gaƒuƒoƒo xoxoawo gali le NU5 megbe hã, eyata mɔ̃ ƒe ɖoɖo xexlẽnuwo manɔ o ƒe laylayla la ku ɖe ga si nèle Orchard gaƒuƒoƒo me la dzi.

![Before NU5, Sprout and Sapling needed a trusted setup ceremony. After NU5, the Orchard pool uses the Halo 2 system and needs no trusted setup](/content-images/nu5-trusted-setup-5447dbe3f2.webp)

## Nu si NU5 trɔ

NU5 na gbegbɔgblɔ ɖi ƒe tɔtrɔ geɖe va ƒoƒo, eye wo katã dze egɔme ɖeka le gaɖoɖowo ƒuƒoƒe 1,687,104.

1. Etsɔ Orchard gaƒuƒoƒo ɣaɣla (ZIP 224) va, si nye Halo 2 dzi wotu ƒe protocol si woɖe fia le afisia.
2. Etsɔ gaɖoɖo ƒe ƒome 5 nɔnɔme (ZIP 225) va, si nye nɔnɔme si woɖo ɖe ɖoɖo yeye me, kple teƒe vovovo na nuwo ƒe ʋuʋuɖi, Sapling, kple Orchard ƒe nyawo. Woɖe Sprout ƒe ƒeƒewo ɖa, eye ƒome 4 xoxo la gaɖo dzi ɖe dɔmedzoe megbe.
3. Etsɔ Unified Addresses kple nukpɔsafui siwo woɖo ƒoƒo va (ZIP 316), si míaadzro le akpa si kplɔe ɖo me.
4. Etsɔ gaɖoɖo ƒe dzesi ƒe non-malleability (ZIP 244) de dɔme, si nye mɔ̃ yeye si me wowɔna gaɖoɖo ƒe id, si ma wonu si gaɖoɖo la wɔ la tso ɖaseɖigbalɛwo kple asidede agbalẽ te siwo na mɔ̃e la gbɔ.
5. Etsɔ Jubjub point encodings siwo le standard me (ZIP 216) de dɔme be woaɖe encoding siwo menye standard o ɖa eye woana sewo siwo gblɔ nu si woxɔ abe gaɖoɖo vavã ene la nakpɔ ŋusẽ.
6. Ena mɔ̃ be woaɖe gaɖoɖo ƒome 5 dzi le peer-to-peer network la katã (ZIP 239).

NU5 hã trɔ ZIP xoxowo dometɔ geɖe (32, 203, 209, 212, 213, 221, kple 401) be woabu Orchard gaƒuƒoƒo yeye la ɖe eme.

## Unified Addresses

Do ŋgɔ na NU5, gaƒuƒoƒo ɖe sia ɖe nɔ gaɖoƒe ƒe dzesi ƒomekuku tɔe, eye ele be ame si le ga dzom na wò la nanya ƒomekuku si nèdi. Unified Addresses, si woɖe fia le [ZIP 316](https://zips.z.cash/zip-0316) me, trɔ esia. Unified Address ɖeka ate ŋu aɖo receiverwo ƒoƒo na gaƒuƒoƒo ɖeka kple bubuwo, ale ame si le ga dzom la ƒe gakotoku ti ɖeka si wòate ŋu awɔ dɔ kpli.

![A unified address bundles receivers for several pools: a transparent receiver, a Sapling receiver, and a new Orchard receiver](/content-images/nu5-unified-address-6e2c84f66e.webp)

Nukpɔsafui siwo woɖo ƒoƒo la wɔa dɔ nenema hã na nukpɔkpɔ. Wona mɔ̃ be woakpɔ nuwo le gaƒuƒoƒo siwo gaɖoƒe ƒe dzesi aɖe ɖo ƒoƒo la katã me, gake womate ŋu atrɔ naneke o. Ne nàdi nya bubu tso esia ŋu la, kpɔ [Nukpɔsafuiwo](../zcash-tech/viewing-keys) ƒe axa.

## Afisi NU5 le

NU5 va de Zcash ƒe mɔ̃trɔ siwo va do ŋgɔ la yome: Overwinter, Sapling, Blossom, Heartwood, kple Canopy. Ede dɔme le mainnet dzi le May 31, 2022. Wotia Orchard ƒe curve cycle elabena ekpe ɖe recursion ŋu, si nye gɔmedzedze na nu ƒe dziyiyi ƒe dɔ siwo ava emegbe. NU5 nye mɔ̃trɔ si do ŋgɔ ŋutɔ na NU6 kple NU6.x ƒe mɔ̃trɔwo, siwo tu ɖe Orchard gaƒuƒoƒo dzi eye wotrɔe emegbe.

## Nyagɔme ƒe agbalẽ

| Nyagɔme | Gɔ̃me si bɔbɔe |
|---|---|
| Network upgrade (NU) | Tɔtrɔ si woɖo ɖe ɖoɖo ɖeka me le Zcash ƒe gbegbɔgblɔ ɖi ƒe sewo ŋu, si dzea dɔme le gaɖoɖowo ƒuƒoƒe ƒe teƒe si woɖo ɖi |
| Orchard | Gaƒuƒoƒo ɣaɣla si NU5 tsɔ va, si wotu ɖe Halo 2 ɖaseɖigbalɛ wɔwɔ ƒe ɖoɖo dzi |
| Halo 2 | Ɖaseɖigbalɛ wɔwɔ ƒe ɖoɖo si le Orchard megbe, si me mɔ̃ ƒe ɖoɖo xexlẽnuwo mele o |
| Trusted setup | Kpekpe ɖeka si wɔa gaƒuƒoƒo ƒe nya siwo le ɣa, eye ele be woaxɔe ase be wogbãe |
| Unified Address | Gaɖoƒe ƒe dzesi ɖeka si ate ŋu aɖo receiverwo ƒoƒo na gaƒuƒoƒo ɖeka kple bubuwo (ZIP 316) |
| Consensus branch id | Dzesi si fia se ƒe ƒoƒo si gaɖoɖo aɖe le teƒe la |

## Nyabiase siwo wonyaa zi geɖe

Ðe NU5 trɔ nye ZEC alo nye ɣaɣla? Ao. NU5 tsɔ gaƒuƒoƒo ɣaɣla yeye kple gaɖoƒe ƒe dzesi ƒe nɔnɔme yeye va. Wò ZEC si nèxɔ ɖe asi kpɔ la metɔ o, eye wò ɣaɣla menɔ gbɔna o. Ne nàtsɔ ga ade Orchard me la, nàkpɔ gaƒuƒoƒo si me mɔ̃ ƒe ɖoɖo xexlẽnuwo mele o.

Nu kae nye Orchard? Orchard nye Zcash ƒe protocol ɣaɣla si NU5 tsɔ va. Ewɔa dɔ le Halo 2 ɖaseɖigbalɛ wɔwɔ ƒe ɖoɖo dzi, eyata mɔ̃ ƒe ɖoɖo xexlẽnuwo ƒe kpekpe aɖeke mehiãe o.

Ðe ele be mawɔ nu aɖe? Ao. Gakotoku si wòde asi ɖe la wɔa NU5 na wò. Àte ŋu azã gaɖoƒe ƒe dzesi xoxowo yi edzi, eye nàte ŋu adze Unified Addresses zazã gɔme ne wò gakotoku tsɔe na wò.

Nu kae nye Unified Address? E nye gaɖoƒe ƒe dzesi ɖeka si ate ŋu axɔ receiverwo na gaƒuƒoƒo ɖeka kple bubuwo. Ame si le ga dzom la ƒe gakotoku tia gaƒuƒoƒo si wòde asi ɖe, eyata mele be nàtsɔ gaɖoƒe ƒe dzesi vovovo na ƒomekuku ɖe sia ɖe o.

Ðe NU5 ɖe mɔ̃ ƒe ɖoɖo xexlẽnuwo ɖa le nye ga xoxowo me? Menye ɣeyiɣi si va yi la me o. Orchard me mɔ̃ ƒe ɖoɖo xexlẽnuwo mele o, gake Sapling gaƒuƒoƒo la ƒe nya xoxoawo gali le NU5 megbe. Mɔ̃ ƒe ɖoɖo xexlẽnuwo manɔ o ƒe laylayla la ku ɖe ga si nèle Orchard gaƒuƒoƒo me la dzi.

Ðe gaɖoɖo ƒe nɔnɔme xoxo la tɔ dɔwɔwɔ? Ao. NU5 tsɔ ƒome 5 ƒe nɔnɔme va, eye ƒome 4 ƒe nɔnɔme xoxo la gaɖo dzi ɖe dɔmedzoe megbe.

## Do wò nufiame kpɔ

Sprout kple Sapling katã hiã mɔ̃ ƒe ɖoɖo xexlẽnuwo ƒe kpekpe. Nu kae NU5 ƒe Orchard gaƒuƒoƒo trɔ tso esia ŋu, eye nu ka tae esia le vevie?

<details>
<summary>Ðoɖo</summary>

Orchard wotu ɖe Halo 2 ɖaseɖigbalɛ wɔwɔ ƒe ɖoɖo dzi, si me mɔ̃ ƒe ɖoɖo xexlẽnuwo kple structured reference string mele o. Esia ɖea afɔku si be woate ŋu azã nya ɣa siwo woɖe ɖe asi ɖe te be woawɔ ZEC ƒe atsyɔ̃tso siwo menye vavã o la ɖa. Laylayla la ku ɖe ga si nèle Orchard gaƒuƒoƒo me la dzi. Sapling ƒe nya xoxoawo gali le NU5 megbe.
</details>

### Nu siwo nàte ŋu azã

[ZIP 252: NU5 Network Upgrade ƒe dɔmedzoe](https://zips.z.cash/zip-0252)

[ZIP 224: Orchard Ƒe Protocol ɣaɣla](https://zips.z.cash/zip-0224)

[ZIP 225: Gaɖoɖo ƒome 5 ƒe nɔnɔme](https://zips.z.cash/zip-0225)

[ZIP 316: Unified Addresses kple Unified Viewing Keys](https://zips.z.cash/zip-0316)

[Network Upgrade 5](https://z.cash/upgrade/nu5/)

[Electric Coin Company: zcashd 5.0.0 ƒe tatã](https://electriccoin.co/blog/new-release-5-0-0/)

### Kpɔ hã

[Zcash Network Upgrades](../start-here/network-upgrades)

[Gaƒuƒoƒo ɣaɣlawo](../using-zcash/shielded-pools)

[Halo](../zcash-tech/halo)

[zk-SNARKs](../zcash-tech/zk-snarks)

[Nukpɔsafuiwo](../zcash-tech/viewing-keys)

[NU6.1](../zcash-tech/nu6-1)

---

Series: [Network Upgrades ƒe index](../start-here/network-upgrades) · Si do ŋgɔ: [Canopy](../zcash-tech/canopy) · Si kplɔe ɖo: [NU6](../zcash-tech/nu6)
