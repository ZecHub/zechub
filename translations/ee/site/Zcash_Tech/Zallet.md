<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zallet.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zallet

Zallet nye Zcash gaɖigbalẽ si me woŋlɔa nu sia nu ɖo le Rust. Eɖɔli gaƒogba siwo nɔ anyi tsã la ɖe esi wotsɔna xea fe na ame bubuwo ƒe asitelefonwo dzii, eye wòxɔ ŋkɔ wu esiwo wozãna tsɔ ƒoa wo ɖokui ɖe Internet dzi gadzraɖoƒe alo internet dzi dɔwɔƒewo ŋu. `zcashd`Le ema megbe. `zcashd` va ɖo eƒe End-of-Support nu le 18 July 2026 to block height 3417100, ɖekawɔwɔ kple gaɖaka ƒe dɔwo ma: **Zebra** alo **Zakura** naɖo kpe kɔsɔkɔsɔa dzi eye **Zallet** léa safuiwo ɖe asi, dzroa nuŋlɔɖiwo me hetoa JSON-RPC.

Zallet le **beta** fifia. Womeɖɔe kpɔ bliboe o. Tɔtrɔ siwo wowɔna la abia be woaɖe gaƒoɖokuia ɖa eye woagawɔea ake. Mègabu eŋu abe alesi wokpɔa ZEC gbogbowo dzii ene ne mèxlẽ nuxlɔ̃ame si dze le gadzraɖoƒe me do ŋgɔ na eƒe dodo gɔmeɖeɖe sia o. [Zallet-gbalẽa](https://zcash.github.io/zallet/).

---

## TL;DR

- Zallet nye RPC gaɖaka si me nuŋɔŋlɔwo katã le, menye asitelefon dzi gaƒokɔ bɔbɔe o eye menye ɖekawɔwɔ ƒe akpa hãe wònye o.
- Eɖɔli ga si le eƒe kotoku me la ƒe afã. `zcashd`. Nuvi afã la nye: [Zebra](Zebra_Full_Node.md) or [Zakura](Zakura_Node.md).
- Eŋlɔ le **Rust** me, MIT/Apache 2.0 ƒe mɔɖegbalẽ evee wotsɔ ŋlɔe eye wokpɔa edzi le afi sia. [zcash/zallet](https://github.com/zcash/zallet).
- Woɖe wo ɖe go le August 2026 ƒe nuwuwu lɔƒo: **v0.1.0-beta.3**.
- Eƒoa nu kple data to backend eveawo dometɔ ɖeka dzi: **zebra-state** (direct) `ReadStateService` le nutoa me tɔ aɖe ŋu. `zebrad`) alo Zaino.
- Eɖe JSON-RPC** ƒe akpa aɖe si sɔ kple zcashd fia. Woɖɔ mɔnu aɖewo; woɖoe koŋ ɖewo le eme.
- Wozãa nya siwo le agbalẽawo me la ƒe ŋkɔwo kple woƒe nɔnɔmetatawo ɣesiaɣi tsɔ dea dzesi nu si dzi woŋlɔ wo ɖo. `wallet.db`.
- Eɖoa ame etɔ̃ siwo le akpa eve me ɖe agbalẽdzraɖoƒe ɖeka si dzi woŋlɔ ŋkɔ ɖo: `zallet` (Dɔdrɔ̃), `zallet-zebra`, kple `zallet-zaino`.
- Agbalẽ siwo le dukɔa me: [Zallet-gbalẽa](https://zcash.github.io/zallet/).

---

## Nusitae Zallet Li Ðo

`zcashd` Bitcoin Core ƒe nubabla si dzi wowɔ ɖoɖo ɖo kple gaɖaba le mɔnu ɖeka me. Mebua tame nenema azɔ o.

Dɔwɔƒe. Kpakpɔnu xoxoa. Akpa si le edzi yim fifia.
|------|-----------|---------------|
◯ Ðekawɔwɔ / P2P. `zcashd` Zebra (woƒe ŋkɔe nye "Agbegbe" le Eʋeawo me)`zebrad`) alo Zakura.
Gaɖakawo / safuiwo / ga home. `zcashd` `wallet.dat` Zallet ƒe nuƒowo.`wallet.db`) |
Light-client indexing. (Aʋatrɔdzesi si me nyatakakawo le) `lightwalletd` Zaino alo `lightwalletd` |

Ne èɖe ga si le kotokua me la ɖa tso eƒe akpa aɖe ŋu fia be:

- Woate ŋu atrɔa mɔ̃ɖaŋunuwo (Zebra vs Zakura) le nuƒomɔ̃awo me evɔ womatsɔ safui o.
- Ga si le ga me kple esi wozãna la nɔa ɖoɖo aɖe si woate ŋu awɔ ɖeka.
- RPC ƒe nyagbɔgblɔwo ate ŋu atrɔ ayi ZIP 32 ŋuti nyatakaka, Adrɛs Ðekae kple PCZT teƒe be woanɔ anyi le dziɖeleameƒo me. `zcashd` eƒe nɔnɔmewo.

Zallet nye gaɖaba si woɖo ɖi na dɔwɔlawo siwo wɔa dɔ le Internet dzi tsã. `zcashd` enyea ga si woɖona ɖe ame ŋu, nu siwo wotsɔna dzraa fewo ɖo le gadzraɖoƒe me kple esi wozãna tsɔ ƒlea nuwo.

---

## Nɔnɔme si le wo ŋu

Zallet le Beta-nɔnɔme.

Nusi ema fia le dɔwɔwɔ me:

- Tɔtrɔ siwo gblẽa nu ate ŋu ava ɖo beta ɖesiaɖe me. Ðewohĩ ahiã be nàɖe nyatakakawo ƒe agbalẽdzraɖoƒea ɖa eye nàdze egɔme ake.
- Menye wo katãe o. `zcashd` woɖɔli ga si le RPC la.
- Nuŋɔŋlɔdzesi si le mɔnu siwo woɖona ɖe teƒe aɖewo me la to vovo na esi nɔ anyi tsã. `zcashd`Ele be woaxlẽ nya siwo le agbalẽa me la. [nyagbewo ƒe gɔmesese trɔna le axa dzi](https://zcash.github.io/zallet/zcashd/json_rpc.html).
- Wole aɖakaawo wɔm eye womedzro wo me tsitotsito haɖe o.
- Zallet menye agbalẽdzraɖoƒe si ŋu Rust ɖo o. Ne èle eŋu ɖom la, kakaɖedzi aɖeke meli be àte ŋu awɔ esia o.

Nyaŋuɖoɖo yia: [GitHub nyawo](https://github.com/zcash/zallet/issues/new) alo le afi si woɖui ɖo. `#wallet-dev` Kɔmpiuta dzi mɔ si le [Zcash R&D Discord ƒe nyahehewo](https://discord.gg/xpzPR53xtU).

Wole ɖoɖo wɔm be ne RPC ƒe akpa si wodi la le anyi ko hafi woagava ɖo afisi woanɔ te ɖe enu. Emegbe woaɖo ame siwo yɔa ka na Zallet's-mɔ̃wo, eye woakpɔ nuŋɔŋlɔ me vovototoawo hã adze sii.

---

## Xɔtutuwo

Zallet ma ɖe Cargo dɔwɔƒe etɔ̃ dzi ale be kɔsɔkɔsɔ ƒe akpa eveawo nate ŋu adze si kadodo vovovo siwo le woƒe dɔwɔnawo me.

```
zallet            launcher: reads `backend` in zallet.toml (default "zebra")
                  and execs zallet-zebra or zallet-zaino
zallet-core       shared wallet: CLI, config, JSON-RPC, SQLite DB, sync
zallet-zebra      zebra-state backend (ReadStateService + Zebra JSON-RPC)
zallet-zaino      Zaino indexer backend
```

Nu etɔ̃awo katã ʋua nu ɖeka ma ke. `wallet.db`. Launcher tia backend le runtime me; mègawɔ compile be yeatrɔ ayi edzi o.

Alesi wowɔa dɔe:

```
zebrad  (or Zakura)
   │  JSON-RPC / ReadStateService
   ▼
Zallet  (zallet-zebra or zallet-zaino)
   │  JSON-RPC on 127.0.0.1
   ▼
Your application, exchange, faucet, or operator scripts
```

Zallet nye **full-node wallet**: ele mɔ kpɔm na nudzidzenu si le teƒea. Menye light client o. Le light wallets kple compact block serverwo ŋu la, kpɔ agbalẽ sia (Light Client) ƒe ta me. [Zaino](Zaino.md) kple [Lightwallet Nodes (Adzagba Kpoƒe)](Lightwallet_Nodes.md).

The Zcash Foundation’s [Z3](https://github.com/ZcashFoundation/z3) dzidze Zebra + Zallet ɖekae, kple Zaino si le eɖokui si hena gota ƒe kekeliƒolawo.

---

## Ga siwo le ga me, adrɛswo kple safuiwo

Zallet ƒe akpa aɖe nye ZIP 32 ŋuti nyatakakawo, menye Internet dzi nuŋlɔɖi siwo le asitelefon me o. `zcashd`Eɖe dzesi ŋutɔ be ame aɖeke menya nu si tututu Biblia gblɔ o.

- Gaɖakavi ɖeka ate ŋu alé ŋkuɖoɖo dziŋɔŋlɔdzesi vovovo me ɖe asi. Ŋkuɖodziŋlɔɖi ɖesiaɖe nye gazã gɔme aɖe si le eɖokui si, eye wotsɔ dzesi siwo woyɔna be "seed fingerprint" (asiƒodɔ ƒe dzesia) dea dzesii.`zip32seedfp1…`).
- **Akpawo** tso nuku aɖe si ƒe ŋkɔ nye ZIP 32 account index me. Le Zallet ɖeka me la, wo hã le teƒea tɔ nu kple ame bubu siwo mele ɖeke o (UUID). Akaɖui sia ŋuti nyatakaka enye: `(seedfp, account index)`.
- Adrɛs nye **ZIP 316 Unified Addresses**, eye woŋlɔa kple nuŋlɔɖi si le akpa sia. `z_getaddressforaccount`Adrɛs vovovo ate ŋu anɔ nyatakaka ɖeka si; womate ŋu atsɔ adrɛs siwo dzi woxɔa ga ɖo la aƒo ka kple esiwo le mɔ̃ aɖe nu o.
- Ga siwo wotsɔ ƒle le dukɔ bubuwo me (`z_importkey`(Eye woxɔa ame siwo ŋu wotrɔ asi le be woakpɔ yewo ɖeɖe ko ƒe adrɛswo hã.)`z_importaddress`) va zu UUID ƒe nuŋlɔɖi siwo ŋu nyaŋɔŋlɔ aɖeke mekpena ɖo o.
- Woate ŋu aɖe videowo ƒe kɔpi siwo woɖena la ɖa alo atsɔe ayi duta (`z_exportviewingkey`, `z_importviewingkey`), si me nuŋɔŋlɔwo ƒe dzesi siwo katã le ɖeka kple esiwo gbɔna la hã nɔ.

`getnewaddress` womewɔe o. Zã nya si nye "A" le gbea me. `z_getnewaccount` kple `z_getaddressforaccount`.

If `keystore.require_backup` (Afi si woʋu yi la ƒe nɔnɔme le) `zcashd`’s `walletrequirebackup`), Zallet gbe be yemana ame aɖeke naɖo ga yeye si yeatsɔ awɔ dɔe la to mnemonic aɖe dzi o.

---

## Aʋatsotso kple nuŋɔŋlɔwo ƒe ɖoɖowɔɖi

Wodea dzesi nu vevi siwo le agbalẽa me la ɣesiaɣi. Womedaa wo ɖe mɔ bubu aɖeke dzi o eye womedana hã be ame aɖe naŋlɔe ɖi gbeɖe o. `encryptwallet` RPC  be `zcashd` womede dzi ƒo na amewo le mɔnu sia ŋu bliboe kpɔ o.

- Setup wɔa ƒe **age** ŋkɔ, mɔ si dzi woato anɔ te ɖe edzi `{datadir}/encryption-identity.txt`.
- Woɖoa ŋku nu si woŋlɔ ɖe susu me kple ga siwo woƒle la dzi le Internet-ʋunuwo ƒe kɔmpiutaɖoɖowo ŋu. `wallet.db`.
- Nyatakakadzraɖoƒea ƒe akpa susɔea mele ɣaɣla o. Ame aɖe kpɔ nyatakaka siwo le eme la, ate ŋu axlẽe ne ekpɔ wo dometɔ aɖewo hã.
- Woate ŋu atsɔ nya si wotsɔ ɖea ame ƒe ŋkɔa me la atsyɔ nu ɖe edzi (`generate-encryption-identity -p`Ði ʋɔtru la. `walletpassphrase` RPC; woxe mɔ ɖe enu kple `walletlock`.
- Ne ameŋunyatakaka alo eƒe adzameyɔkpɔ bu la, womagate ŋu akpɔ gazã ŋuti safuiwo o. Wɔ amesi ƒomevi ƒe dzesi ɖesiaɖe kple (si le vovoe na ema si wode nugbegblẽ) bubu ɖe sia ɖe siwo nèŋlɔna ɖi be nàdzra ɖo ne èdi be yeadzrae ɖa la dzi kpɔtɔ. `wallet.db` nàdzra ɖo ɖe eŋu.

Nuŋɔŋlɔ ɖe agbalẽ me `wallet.db` ne Zallet le zɔzɔm la menyea mɔ̃ɖaŋudɔ dedziƒoname o. SQLite ate ŋu atui. Edzɔa dzi na wo be woaɖo asi dɔa dzi, alo alala ɖe dɔŋudede si wowɔna to internet-mɔ̃wo zazã me ƒe ɖoɖo nu.

---

## JSON-RPC me nyawo

Zallet zãa mɔnu siwo le Biblia me la ƒe akpa aɖe. `zcashd` wallet RPCs to HTTP kple Basic auth. Bind na loopback. Remote zazã ate ŋu ato mɔ̃ si me woɣla nu le dzi. `rpc.allow_insecure_remote_bind` li eye afɔku le eme.

Vovototo ɖedzesi siwo le wo kple esiwo nɔ anyi do ŋgɔ la dome: `zcashd`:

- Akpa siwo le akpatawo me la ƒe akpa si gbɔna: `getwalletinfo` womegaɖi naneke o. Zãe ne èdi be yeawɔ esia: `z_getbalances`, `z_getbalanceforaccount`, `z_gettotalbalance`.
- Fewo le abe alesi dze ene. **ZIP 317** Aɖeke meli o. `settxfee`.
- Gawo ƒe ɖoɖowɔwɔ le zɔzɔm ɖe PCZT dzi (Partially Created Zcash Transactions, ZIP 374). PCZt RPC va ɖo beta-dzidzime.
- Xexeame katã ƒe **sync lock** xea mɔ ɖe ga si susɔ kple RPC siwo woazã ŋu esime gakotoku la le nu ɖum alo nɔ te ɖe nuwo dzi tsotso (`ClientInInitialDownload` / `ForbiddenBySafeMode`).

Mɔnu siwo ŋu womeɖe nu le o la dometɔ aɖewoe nye: `createrawtransaction`, `fundrawtransaction`, `getnewaddress`, `getrawchangeaddress`, `keypoolrefill`, `importwallet`, kple `encryptwallet`Woŋlɔ amesiwo woagatsɔ aɖo eteƒe la ɖe agbalẽa me. [Zallet Agbalẽa](https://zcash.github.io/zallet/zcashd/json_rpc.html).

---

## Alesi Míadze Egɔmee

Ðoɖowɔƒe si le dɔ wɔm (Debian ƒe nubablawo, Docker, gbeɖeɖewo) la nɔ wo me. [Ðoɖowɔgbalẽvi si le eme.](https://zcash.github.io/zallet/guide/installation/index.html)Woyɔa agbalẽ siwo woɖe ɖe go la be . `zallet-<version>-<arch>.tar.gz` eye nu etɔ̃ siwo katã le eme hã nɔ wo me.

Ga si woagblẽ le gaƒleƒe yeyea ŋu:

```bash
# data directory; default is $HOME/.zallet
zallet -d /path/to/zallet/datadir example-config > /path/to/zallet/datadir/zallet.toml
# edit zallet.toml: network, backend, indexer / read-state, rpc.bind

zallet -d /path/to/zallet/datadir generate-encryption-identity
zallet -d /path/to/zallet/datadir init-wallet-encryption
zallet -d /path/to/zallet/datadir generate-mnemonic
zallet -d /path/to/zallet/datadir confirm-backup
zallet -d /path/to/zallet/datadir start
```

Nu si le afi ma `[indexer]` le nuto aɖe me. `zebrad` JSON-RPC nuƒleƒe. Zebra ƒe megbeŋutinya hã di be yeakpɔe ɖa le eƒe ŋɔŋlɔdzesiwo ŋu, eye wòadi be yeaɖe dzesi wu ale si wòle la me. `[indexer.read_state_service]` kple a. `zebrad` Wotsɔ indexer ƒe nɔnɔmea wɔe be Zallet nate ŋu axlẽ nu tso kadodo si le nudzraɖoƒea me tẽe.

Woate ŋu azã nuŋɔŋlɔ siwo woate ŋu aɖe la atsɔ atu nɔnɔmewɔwɔwo ɖo. [Afɔ X](https://codeberg.org/stagex/stagex/) (Docker 25+, containerd image store, GNU Make).

---

## Ʋu tso zcashd me

Lé nya xoxoa ɖe asi. `zcashd` nàdzudzɔ va se ɖe esime nèɖo ga si susɔ la ɖi eye nèdoe kpɔ.

```bash
zallet init-wallet-encryption
zallet migrate-zcash-conf --zcashd-datadir /path/to/zcashd/datadir \
  -o /path/to/zallet/datadir/zallet.toml
zallet migrate-zcashd-wallet --zcashd-datadir /path/to/zcashd/datadir
```

`migrate-zcashd-wallet` le eme ko hafi woate ŋu awɔe kple X-Fi. `zcashd-import` Nuxexlẽ ƒe akpa aɖe. `wallet.dat` nuhiahiãwo `db_dump` tso **Berkeley DB 6.2**, gɔmeɖeɖe si nye `zcashd` wozãe.

Dɔwɔla ƒe nuŋlɔɖi siwo me nyawo le: [Mɔfiala: zcashd to Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet).

---

## Alesi Zallet do ƒome kple kɔmpiutaɖoɖo bubuwoe

 Zallet. zecd Zashi / ZODL / YWallet Zebra / Zakura Zaino
|--|--------|------|------------------------|----------------|-------|
Nuka enye esia? RPC gaɖabaƒe si nye nuƒle blibo. Gaƒoɖi- gbãtɔ ƒe dɔwɔƒea (wallet server) Amesiwo zãa gaawo le eƒe nuwuwu la tɔ me. Nuƒle siwo dzi woɖoa asii kple susu ɖekaɖekae. Indexer / lightwalletd teƒeɖoɖo.
Eɖɔa nu siwo gblẽ la ɖo. `zcashd` gaɖakavi. Menye nudomegbalẽ o `zcashd` clone  Mobile/desktop apps  Eʋeviwo ƒe kɔpiwo: `zcashd` nuɖoanyi la. `lightwalletd` |
Ehiã be woaɖo teƒe aɖe si woate ŋu awɔ nu le. Ɛ̃ (Zebra to default) Ao (light client). Enyea *eƒe* ɖoɖoawo dometɔ ɖeka. Ẽ
 zcashd RPC compat. Wowɔe be wòanye mɔ si dzi woato awɔ dɔ le ɖoɖowo me la ƒe akpa sue aɖe ko N/A Partial / Zakura Compat mode API bubu
 Kplɔla ƒe kpɔɖeŋu. Xɔlɔ̃a léa safuiwo ɖe asi le ʋua me `wallet.db` Server si dzi woate ŋu akpɔ nu siwo wofɔ la le. Amesi ƒe mɔ̃a ŋuti safuiwo mele esi o, gaɖivɔsa meli nɛ o, eye eƒe safuiawo hã megali o.

Zallet and **zecd** can both sit in front of Zebra. Pick Zallet when you need the `z_*` ga si woɖena ɖe asitelefon dzi kple ale si wòɖea vi na amewoe la me. `wallet.dat`Tia zecd ne èdi be yeakpɔ server si ŋu wotrɔ asi le koŋ la dzi, eye menye *a* o. `zcashd` ameƒomevi.

Wowɔ nuƒleƒe bubu aɖe le afima. [zallet.io](https://www.zallet.io/) Menye dɔ siae nye app ma o.

---

## Axa siwo do ƒome kplii

- [Nuwo ƒe Ŋutete Blibo](Full_Nodes.md)  Zebra, Zakura kple amesiwo xɔ dzudzɔ le dɔ me la `zcashd` kɔsɔkɔsɔ
- [Zebra ƒe Dzogoe Blibo la](Zebra_Full_Node.md)  nuƒleƒe Zallet ƒe domenyigbalẽvi xlẽna be:
- [Zakura ƒe Nuƒoƒomevi](Zakura_Node.md)  Ŋutete si ŋu kakaɖedzi le ƒe akpa bubu aɖe
- [Zaino](Zaino.md)  Indexing backend kple light-client server
- [ZECD ƒe akpa aɖe](ZECD.md)  gaɖivɔ̃-subɔla ƒe wɔwɔme bubu le librustzcash dzi
- [Zcash Gadzɛwo ƒe Ðɔɖɔɖo](Zcash_Wallet_Syncing.md)  alesi gaɖaba siwo ŋu wota ɖo la léa ŋku ɖe nudzraɖoƒea ŋui
- [Kpɔkplɔtiwo](Viewing_Keys.md)

## Ganyawo ƒe Kpekpeɖeŋu

- [Zallet-gbalẽa](https://zcash.github.io/zallet/)
- [zcash/zallet le GitHub dzi](https://github.com/zcash/zallet)
- [Woɖe asi le eŋu](https://github.com/zcash/zallet/releases)
- [JSON-RPC tɔtrɔwo le nyagbewo ŋu.](https://zcash.github.io/zallet/zcashd/json_rpc.html)
- [ZecHub ƒe ʋuʋu ŋuti mɔfiagbalẽa](/guides/migration-guide-zcashd-to-zebrad-zallet)
- [ZecHub Raspberry Pi mɔfiagbalẽ (Zebra + Zallet)](/guides/raspberry-pi-4-full-node)
- [Z3 (Zebra + Zallet woƒo ƒu)](https://github.com/ZcashFoundation/z3)
- [Zcash R&D Discord ƒe nyahehewo](https://discord.gg/xpzPR53xtU) — `#wallet-dev`
