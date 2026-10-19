<a href="https://github.com/ZecHub/zechub/edit/main/site/Privacy_Tools/Nym_Zcash_Anonymity.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Nym Mixnet Àìdánimọ fun Zcash

> Ìdánilójú ìkẹyìn: Oṣù Kẹwàá 18, 2026

Àwọn adágún tí a fi ààbò fún Zcash fi iye owó, olùránṣẹ́, àti àwọn olùgbàpamọ́ pamọ́ lórí ẹ̀wọ̀n. Wọn kì í fi ọ̀nà nẹ́tíwọ́ọ̀kì pamọ́ láàrín àpò owó àti ẹ̀rọ lightwallet. Mixnet Nym's fi kún un pé ààbò nẹ́tíwọ́ọ̀kì kò sí. Ní oṣù kẹwàá ọdún 2026, ìṣọ̀kan náà wà láàyè nínú àwọn àpò owó ìṣelọ́pọ́ (Zingo, Zkool).

Orísun: [Báwo ni Nym ṣe ń fi àìdánimọ̀ kún àwọn àpò Zcash](https://nym.com/blog/zcash-mixnet-anonymity) (Nym, 13 Oṣù Kẹ̀wàá 2026).

## Kí ni a dáàbò bò

Nym máa ń fọ́ àwọn pákẹ́ẹ̀tì ìṣòwò (nígbà gbogbo 7–15 KB ti ìnáwó àti ẹ̀rí ZK) sínú àwọn pákẹ́ẹ̀tì Sphinx ó sì máa ń gbé wọn gba inú mixnet. Èyí:

- Ó fi IP olùránṣẹ́ pamọ́ kúrò nínú olupin lightwallet
- Da ijabọ pọ mọ ijabọ Nym miiran
- Ó ń pèsè nǹkan bí 17 bit ti entropy ní àwọn ètò àìyípadà, pẹ̀lú àìdánimọ̀ tí a mẹ́nu kàn tí a ṣètò lókè àwọn olùlò 100,000

Awọn sisanwo ati awọn ibeere idiyele ni Zingo v7 tẹle ọna yii nipasẹ aiyipada.

## Kí ni a kò dáàbò bò

Ìṣọ̀kan ẹ̀wọ̀n, ìbéèrè nullifier, àwọn ìfiranṣẹ́ ìṣòwò, àti ìjáde mempool ń lo ìsopọ̀ indexer déédéé lọ́wọ́lọ́wọ́. Ìpele-ẹ̀rọ tàbí ìpele-ìlò metadata tí ó wà níta àwọn packets adalu náà tún wà ní ìta ààlà Nym's.

Tí àpẹẹrẹ ìhalẹ̀mọ́ rẹ bá nílò fífi ìjáde ìṣọ̀kan pamọ́, so àpò ìpamọ́-native-mixnet pọ̀ mọ́ NymVPN. Wo [VPN Nym](/guides/nym-vpn).

## Àwọn Àpò Ìpamọ́

| Àpò owó | Ipò | Àwọn Àkíyèsí |
| --- | --- | --- |
| Zingo v7 | Laaye, aiyipada | `makers run-cli` awọn idii `nym-proxy`. Ìpàdé náà bẹ̀rẹ̀ láìsí ìkànnì ayélujára; `--online`, `--remember-online`, or `--server` awọn ifunni ifọwọsi. |
| Zkool | Lóògbé | Ìṣọ̀kan mixnet ti àbínibí. |
| Àwọn mìíràn | Nipasẹ NymVPN | Gbe àpò owó náà lọ nípasẹ̀ ipò Mixnet ìpele ètò. |

Awọn alaye iṣeto fun ipa ọna ipele apamọwọ wa ninu [Ipa ọna Zcash Apamọwọ Lori Nym Mixnet](/guides/nym-mixnet-wallet-setup).

## Ìṣòwò

Ìgbéjáde Nym-routed jẹ́ nǹkan bí 12.5× lọ́ra ju clearnet lọ (~3.4 s). Tor yára (~3.7×) ṣùgbọ́n ó ń lo àwọn ìṣàn FIFO láìsí ìdàpọ̀, nítorí náà ọ̀tá kárí ayé lè bá ara wọn mu. Dídàgbà sí ìpìlẹ̀ àwọn olùlò Nym tí a pín mú kí àìmọ̀ ẹni pọ̀ sí i ju fífi àfikún ìdádúró kún un lọ.

## Ìmọ́tótó ìpele ìlò: nym-swizzle-zcash

Ààbò ìpele nẹ́tíwọ́ọ̀kì kò tó. Kódà pẹ̀lú mixnet tàbí VPN pípé, olupin lightwallet ṣì lè so àwọn àkókò pọ̀ nípa wíwo àwọn ìlànà ìpele ohun èlò:

- Ìsopọ̀mọ́ ojú-ìwé Resume-point: àwọn oníbàárà bẹ̀rẹ̀ ìṣiṣẹ́pọ̀ láti gangan `previous end + 1`, kí olupin naa le ṣe awọn akoko pq nipasẹ giga bulọọki nikan.
- Sync-then-firanṣẹ́: àwọn àpò ìpamọ́ra máa ń ṣẹ̀dápọ̀ lẹ́sẹ̀kẹsẹ̀ kí wọ́n tó gbé ìròyìn jáde, èyí sì máa ń jẹ́ kí olupin náà sọ pé ìṣòwò kan wà fún ìgbà ìṣọ̀kan tẹ́lẹ̀.

Àwọn [`nym-swizzle-zcash`](https://nym.com/docs/developers/swizzle/zcash) àpótí náà ń ṣe ìlànà ìmọ́tótó Zcash-specific tí ó bójútó méjèèjì `nym-swizzle` àwọn ìlànà ìpìlẹ̀ sí ìlànà ìfọwọ́sowọ́pọ̀ fún àwọn oníbàárà ìmọ́lẹ̀.

**Àwọn ìwọ̀n ìṣọ̀kan tí a ṣe àyẹ̀wò.** Àwọn ìbéèrè ni a fẹ̀ sí àkójọpọ̀ nẹ́tíwọ́ọ̀kì gbogbo pẹ̀lú àwọn sẹ́ẹ̀lì tí ó tóbi ní ọjọ́. A yí ìbẹ̀rẹ̀ ká, a sì yí ìparí ká. Àwọn ìwọ̀n náà jẹ́ èyí tí a pinnu, tí ó ń gòkè, tí ó sì yapa. Àwọn àyẹ̀wò ìṣètò dúró sí àárín ìwọ̀n tí a fẹ̀ síi kí a má baà fi àmì ìṣàyẹ̀wò náà hàn. Àìmọ̀ orúkọ wá láti ìkọlù (ọ̀pọ̀lọpọ̀ àwọn àpò tí ń tú ààlà kan náà jáde) dípò ariwo.

**Awọn igbohunsafefe ti a ti ya sọtọ.** Ifiranṣẹ iṣowo naa ni a da duro nipasẹ pinpin afikun (apapọ awọn bulọọki 144 ≈ wakati 3, ideri awọn bulọọki 576 ≈ wakati 12) ti o baamu iṣeto gbigbe ZIP 318. Awọn idaduro kọja igbesi aye ilana deede, nitorinaa awọn iṣeto wa ni titẹsiwaju. Iṣowo naa ni a kọ ni akoko ina nikan lodi si imọran tuntun kan. Ṣiṣẹpọ ati igbohunsafefe yẹ ki o lo awọn olupin oriṣiriṣi.

Àpótí náà tú àṣírí `BlockSource` àti `TxBroadcaster` àwọn ànímọ́, àkójọpọ̀ fún `wasm32-unknown-unknown`, kò sì ní àkójọ nẹ́tíwọ́ọ̀kì tirẹ̀. Wo [Àwọn ìwé Nym](https://nym.com/docs/developers/swizzle/zcash) fun API kikun ati awọn apẹẹrẹ.

## Àwọn Orísun

- [Báwo ni Nym ṣe ń fi àìdánimọ̀ kún àwọn àpò Zcash](https://nym.com/blog/zcash-mixnet-anonymity) — Nym, 13 Oṣù Kẹ̀wàá 2026
- [nym-swizzle-zcash: Ìlànà Ìmọ́tótó fún Àwọn Oníbàárà Zcash Light](https://nym.com/docs/developers/swizzle/zcash) — Àwọn ìwé Nym
- [Zingo + Nym](https://zingolabs.org/zingo/blog/zingo-nym/) — Zingo Labs
- [Ipa ọna Zcash Apamọwọ Lori Nym Mixnet](/guides/nym-mixnet-wallet-setup) — ZecHub
- [VPN Nym](/guides/nym-vpn) — ZecHub
