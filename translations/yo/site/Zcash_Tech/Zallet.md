<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zallet.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zallet

Zallet jẹ apamọwọ Zcash ti o ni kikun-node ti a kọ sinu Rust. O jẹ rirọpo fun apoti owo ti a lo lati fi sii ninu `zcashd`Lẹ́yìn náà . `zcashd` ó dé ìparí-ìtìlẹ́yìn rẹ̀ ní 18 July 2026 ni block height 3417100, àdéhùn àti iṣẹ́ àpò owó ti pín: **Zebra** tàbí **Zakura** ṣètẹríba fún ẹrù náà, ati **Zallet** mú kókó, ṣe ayẹwo àwọn àkọsílẹ̀, tí o sì fi àpamọ́ JSON-RPC hàn.

Zallet wà ní báyìí nínú **beta**. A kò tíì ṣe àtúnyẹ̀wò rẹ́ pátápátá. Àwọn ìyípadà tó bá wáyé lè béèrè kí o pa káàdì náà nù kóo sì tún un dá sílẹ̀. Má se kà á sí pé ó jẹ́ ìṣọ́ fún àwọn iye ZEC títóbi láì ka àwọn ìkìlọ̀ ètò ìdánilójú inú rẹ̀. [Ìwé Zallet](https://zcash.github.io/zallet/).

---

## TL;DR

- Zallet jẹ́ àpò owó RPC tí ó ní gbogbo ìkànnì nínú, kì í ṣe àpò-ìwé alágbèéká tó rọrùn láti lò àti kì í sì í ṣe òpó onífúnra.
- Ó rọ́pò àpamọ̀ owó ìdajì ti `zcashd`. ìdajì àpò náà ni [Zebra](Zebra_Full_Node.md) or [Zakura](Zakura_Node.md).
- A kọ ọ ni **Rust**, MIT / Apache-2.0 ti o jẹ iwe-aṣẹ meji, ṣetọju rẹ ninu [zcash/zallet: ì í ë ¤ì 'ë¦¬í ¬](https://github.com/zcash/zallet).
- Àtúnṣe tí a tẹ̀ jáde kẹ́yìn ní òpin oṣù August 2026: **v0.1.0-beta.3**.
- Awọn ibaraẹnisọrọ si data okun nipasẹ ọkan ninu awọn backends meji: ** zebra-ipinlẹ** (taara) `ReadStateService` ti o lodi si agbegbe kan `zebrad`) tàbí ** Zaino**.
- Ṣafihan a **zcashd-ṣe ibamu JSON-RPC** subset. Diẹ ninu awọn ọna ti o yipada; diẹ ninu wọn ni a yọ kuro lori idi.
- Key ohun elo ti wa ni nigbagbogbo encrypted pẹlu **age**. idunadura itan, adirẹsi, ati wiwo bọtini joko ninu awọn mọ sinu `wallet.db`.
- Ó ń fi ìdìpọ̀ méjì ránṣẹ́ sínú àpamọ̀ kan tí a fọwọ́ sí: `zallet` (ìdásílẹ̀), `zallet-zebra`, àti `zallet-zaino`.
- Àwọn ìwé-ìwé ìjọba: [Ìwé Zallet](https://zcash.github.io/zallet/).

---

## Ìdí tí Zallet fi wà

`zcashd` a ṣe àpòpọ̀ Bitcoin Core tí ó jẹ́ ìfẹnukò àti apamọwọ ní ìgbésẹ̀ kan. Àwòrán náà ti lọ tán.

 Ipa. Àkójọ àtẹ̀yìnwá. Àkọlé tó wà báyìí.
|------|-----------|---------------|
ìfohùnmọ̀ / P2P. `zcashd` Zebra (ì í ì ë ¤)`zebrad`) tàbí Zakura.
 Àpótí / kókó/ìṣírò owó. `zcashd` `wallet.dat` | **Zallet** (`wallet.db`) |
Àkọsílẹ̀ oníṣe-ọkàn. `lightwalletd` Ṣé Zaino tàbí... `lightwalletd` |

Pín apamọwọ náà kúrò nínú ìsopọ̀ túmọ̀ sí:

- A le ṣe paṣipaarọ sọfitiwia akopọ (Zebra vs Zakura) laisi gbigbe awọn bọtini.
- Ṣiṣayẹwo apamọwọ ati lilo aṣẹ gbe ni ilana ti o le wa titi pa lọtọ.
- RPC semantics le se agbekale si ZIP 32 iroyin, Unified Addresses, ati PCZTs dipo ti ngbe frozen lori awọn oniwe-ti o ba wa ni a npe ni "aaye" . `zcashd` àwọn nǹkan tó máa ń ṣe é ní kàyéfì.

Zallet ni apamọwọ ti a pinnu fun awọn oniṣẹ ti o ṣaju tẹlẹ `zcashd` bi apamọwọ ti o gbona, apo-iṣowo kan, faucet kan, tabi apamọ owo iwakusa.

---

## Àmì ara ẹni

Zallet wà ní ìpele beta.

Ohun tí èyí túmọ̀ sí nínú òótọ́:

- Àwọn àtúnṣe tó bá ṣe pàtàkì lè dé inú ìdìpọ̀ beta. O le ní láti pa ìwé-ìmọ̀ data náà nù kí o sì tún bẹ̀rẹ̀ látorí àkọ́kọ́.
- Kì í ṣe gbogbo wọn ni. `zcashd` àpò RPC ti di ohun èlò.
- Awọn semantics ti diẹ ninu awọn ọna gbigbe yatọ si lati `zcashd`. Integrations gbọdọ ka awọn ti o bajẹ. [ojúewé tí ó ní ìtumọ̀ yí padà](https://zcash.github.io/zallet/zcashd/json_rpc.html).
- Àwọn àpótí náà ṣì wà ní ìmúṣẹ, wọn ò sì tíì ṣe àtúnṣe sí gbogbo rẹ̀.
- Zallet kìí ṣe ilé ìkàwé Rust. Kò sí ìdánilójú kankan bí o bá gbára lé e gẹ́gẹ́ bíi kan náà.

Àwọn àbá tí wọ́n bá fún wa ni: [Àwọn ọ̀ràn GitHub](https://github.com/zcash/zallet/issues/new) tàbí àwọn tó wà nínú `#wallet-dev` ìsọ̀rí lórí òpópónà náà. [Zcash R&D Discord ì í ë ¤ì 'ë¦¬í ¬ê° êμ¬ì§ .](https://discord.gg/xpzPR53xtU).

A later stable phase is planned once the intended RPC surface exists. Callers will then be expected to migrate onto Zallet’s methods, including the documented semantic differences.

---

## Ìṣẹ̀dá ilé-ìkọ́lé

Zallet ti pin kaakiri awọn aaye iṣẹ Cargo mẹta ki awọn ẹhin okun meji le tọpinpin awọn aworan atọka igbẹkẹle oriṣiriṣi.

```
zallet            launcher: reads `backend` in zallet.toml (default "zebra")
                  and execs zallet-zebra or zallet-zaino
zallet-core       shared wallet: CLI, config, JSON-RPC, SQLite DB, sync
zallet-zebra      zebra-state backend (ReadStateService + Zebra JSON-RPC)
zallet-zaino      Zaino indexer backend
```

Gbogbo àwọn ìdìpọ̀ méjì mẹ́ta náà ló ń ṣí ojú ọ̀nà kan náà. `wallet.db`. Ẹrọ-ìfilọ́lẹ̀ yan ẹyìn ìpele ní àkókò ìṣiṣẹ́; o kò tún ṣe àtúnṣe láti yí padà.

Ìmúṣẹ tí ó wọ́pọ̀:

```
zebrad  (or Zakura)
   │  JSON-RPC / ReadStateService
   ▼
Zallet  (zallet-zebra or zallet-zaino)
   │  JSON-RPC on 127.0.0.1
   ▼
Your application, exchange, faucet, or operator scripts
```

Zallet jẹ́ àpò owó **full-node wallet**: ó ń retí kí a ṣe ìmúṣẹ ojúlé. Kì í se oníṣe tí kò ní òǹkà (light client). fún àwọn àpò wálẹ̀tì àti àwọn sàràpátà alápapọ, wo [Zaino](Zaino.md) àti pé, [Àwọn Ìkànnì Lightwallet Nodes](Lightwallet_Nodes.md).

The Zcash Foundation’s [Z3](https://github.com/ZcashFoundation/z3) ṣe akopọ awọn iṣiṣẹ Zebra + Zallet papọ, pẹlu Zaino ti o ni ominira fun awọn alabara ina ita.

---

## Àwọn Àkáǹtì, Adirẹsi àti Kọ́kọ́rọ́

Zallet ti wa ni itumọ yika ZIP 32 iroyin, ko `zcashd`Àkọsílẹ̀ tí kò hàn gbangba kan ṣoṣo tó wà.

- Iwe apamọwọ kan le gbe awọn mnemonics pupọ ti BIP 39. Mnemonic kọọkan jẹ gbongbo inawo ominira, eyiti a ṣe idanimọ nipasẹ ami ika ọwọ ** (`zip32seedfp1…`).
- **Awọn iroyin** ni a gba lati inu irugbin pẹlu atọka akọọlẹ ZIP 32. Ninu ọkan ninu awọn iṣẹlẹ Zallet wọn tun ni agbegbe kan. Aami idanimọ ti o ṣee gbe fun iwe-aṣẹ jẹ: `(seedfp, account index)`.
- Adirẹsi jẹ **ZIP 316 Unified Addresses**, ti a ṣe pẹlu: `z_getaddressforaccount`Àkọsílẹ̀ kan lè ní ọ̀pọ̀lọpọ̀ àdírẹ́sì; àwọn olùgba tí a fi ààbò bo kò ṣeé so pọ̀ nínú ẹkùn.
- Àwọn kókó ìnáwó tí wọ́n ń mú wá (`z_importkey`) àti àwọn àdírẹ́sì tí wọ́n ń lò fún wíwo lásán (`z_importaddress`) di awọn iroyin UUID ti ko ni ideri mnemonic.
- Àwọn kókó ìwòran lè jẹ́ èyí tí a ń tà jáde àti ti àwọ̀n (`z_exportviewingkey`, `z_importviewingkey`), pẹlu iṣọkan kikun wiwo bọtini ati ti nwọle wiwo awọn bọtini.

`getnewaddress` kò sí ìmúṣẹ. lo `z_getnewaccount` àti pé, `z_getaddressforaccount`.

If `keystore.require_backup` ó wà lórí (àwòrán tí wọ́n ṣí lọ síbi mìíràn) `zcashd`’s `walletrequirebackup`), Zallet kọ lati gba aṣẹ inawo tuntun lati inu mnemonic kan ti a ko jẹrisi afẹyinti rẹ.

---

## Àkọsílẹ̀ àti ààbò

Key ohun elo ti wa ni ** nigbagbogbo** encrypted. nibẹ ni ko si unencrypting mode ati ki o kò sí ìyípadà ninu awọn ọna šiše fun gbogbo data lati aarin-oorun to gun, tabi lori eyikeyi miiran ojula. `encryptwallet` RPC  pé `zcashd` wọn ò fìgbà kan rí fọwọ́ sí ọ̀nà yìí.

- Ìtòlẹ́sẹẹsẹ ń dá ẹ̀dá **age**, ipa ọ̀nà àbínibí sílẹ̀. `{datadir}/encryption-identity.txt`.
- Mnemonics ati awọn bọtini inawo ti a gbe wọle ni o wa fipamọ bi ọjọ ori ciphertexts ninu `wallet.db`.
- Ìyókù ìpamọ́ náà kò ní àdàkọ. Àtúnyẹ̀wò, àdírésì àti kókó wíwo ni a lè kà bí ẹnikẹni bá gba fáìlì náà.
- Àwòrán náà lè wà ní ìpamọ́ pẹ̀lú ọ̀rọ̀ àfi-ìmọ̀ (`generate-encryption-identity -p`) Ṣíṣí ọ̀nà pẹlú àwọn ohun èlò tó wà nínú rẹ. `walletpassphrase` RPC; dídì pẹ̀lú `walletlock`.
- Isonu faili idanimọ tabi ọrọigbaniwọle rẹ jẹ ki awọn bọtini inawo ko le gba pada. Ṣe afẹyinti idaniloju, gbogbo mnemonic, ati (ni lọtọ, ti paroko) eyikeyi `wallet.db` ẹ gba èyí.

Fífi Àdàkọ Ṣe Ohun Míì `wallet.db` nígbà tí Zallet bá ń ṣiṣẹ́ kì í ṣe ààbò. SQLite lè ya ara rẹ̀ sí méjì. fẹ́ràn ètò dídínkù, tàbí dúró fún àṣẹ ìpamọ́-lórí líle lórí ẹ̀rọ alágbèéká kan.

---

## JSON-RPC ì í ë ¤ì 'í ̧ë¦¬ê3

Zallet ṣe àgbékalẹ̀ ìsopọ́-ìpín ti àwọn ìlànà tí a fi ń kọ ìwé. `zcashd` wallet RPCs lórí HTTP pẹ̀lú Basic auth. Bind to loopback. Lálàájùlọ́nà yóò gba inú ọ̀gbà tí a fi àdàkọ kọ. `rpc.allow_insecure_remote_bind` ó wà, kò sì ní ààbò kankan.

Àwọn ìyàtọ̀ pàtàkì tó wà nínú àwọn ìwádìí yìí: `zcashd`:

- Àwọn pápá ìdìbò lórí: `getwalletinfo` kò ní nǹkan kan nínú wọn. `z_getbalances`, `z_getbalanceforaccount`, `z_gettotalbalance`.
- Àwọn owó náà ni **ZIP 317**. Kò sí ìnáwó kankan fún àwọn oníbàárà tí wọ́n bá fẹ́ lọ sókè òkun. `settxfee`.
- Ìkópa ìnáwó ń lọ sí àwọn PCZT (Partially Created Zcash Transactions, ZIP 374). Àwọn RPC ti PCZt wọ inú ẹ̀ka beta.
- Àgbáyé ** sync lock** ń dí ìsòwò àti lo RPC nígbà tí àpò-ìpamọ́ bá n mú tàbí tó ń bọ̀ sípò láti inú ètò ìṣètò (reorg) kan.`ClientInInitialDownload` / `ForbiddenBySafeMode`).

Awọn ọna ti a fi silẹ ni imọran pẹlu: `createrawtransaction`, `fundrawtransaction`, `getnewaddress`, `getrawchangeaddress`, `keypoolrefill`, `importwallet`, àti `encryptwallet`Àwọn àtúnṣe náà wà nínú àkọsílẹ̀. [Ìwé Zallet Book](https://zcash.github.io/zallet/zcashd/json_rpc.html).

---

## Bí a ṣe bẹ̀rẹ̀ sí í ṣiṣẹ́.

Awọn ọna fifi sori ẹrọ osise (awọn apoti Debian, Docker, awọn ifunni tu silẹ) wa ninu iwe-aṣẹ. [ìwé tó ń ṣàlàyé bí wọ́n ṣe máa fi síbi ìtòlẹ́sẹẹsẹ.](https://zcash.github.io/zallet/guide/installation/index.html). Àwọn àpamọ́ ìfilò sílẹ̀ ni a pè ní `zallet-<version>-<arch>.tar.gz` ati ki o ni gbogbo awọn mẹta alakomeji.

Ìṣàn owó tuntun tí ó kéré jùlọ:

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

Àmì ojúewé `[indexer]` ní ilé ìtura kan tó wà ládùúgbò rẹ. `zebrad` JSON-RPC endpoint. The zebra backend also wants `[indexer.read_state_service]` àti a. `zebrad` a ṣe pẹlu ẹya-ara indexer ki Zallet le ka ipo pq taara.

A le kọ awọn aworan ti o tunṣe pẹlu: [Ìpele X](https://codeberg.org/stagex/stagex/) (Docker 25+, ìpamọ́ àwòrán containerd, GNU Make).

---

## Migrate from zcashd (ì í ì ë§ ê°)

Fi ohun tó ti wà tipẹ́ náà sílẹ̀. `zcashd` dataadir titi ti o fi jẹrisi awọn iwontunwonsi ati atunṣe idanwo kan.

```bash
zallet init-wallet-encryption
zallet migrate-zcash-conf --zcashd-datadir /path/to/zcashd/datadir \
  -o /path/to/zallet/datadir/zallet.toml
zallet migrate-zcashd-wallet --zcashd-datadir /path/to/zcashd/datadir
```

`migrate-zcashd-wallet` jẹ nikan ni kọ pẹlu awọn `zcashd-import` Àwọn Àkànṣe Ìsọfúnni: Ka. `wallet.dat` àwọn ohun tó nílò `db_dump` lati ** Berkeley DB 6.2**, awọn ẹya ti o wa ni pipade. `zcashd` tí a lò.

Àwọn àlàyé oníṣe nípa ìgbésẹ̀-gbesẹ̀: [Itọsọna Iṣilọ: zcashd to Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet).

---

## Bawo ni Zallet ṣe jẹ ibatan si sọfitiwia miiran

Zallet zecd Zashi / ZODL YWallet Zebra Zakura Zaino Àwọn ojúewé wọ̀nyí jápọ̀ mọ́ "Zac" àti "Zaino":
|--|--------|------|------------------------|----------------|-------|
 Kí ni ó jẹ́? Full-node RPC wallet Shielded-first wallet server Awọn apamọwọ olumulo ipari Nọmba ifọkanbalẹ Indexer / lightwalletd rirọpo.
Ó máa ń rọ́pò. `zcashd` àpò. Kì í ṣe ìsúná-in `zcashd` clone  Àwọn ohun èlò alágbèéká/òpó-ìwé. `zcashd` ìsọ̀rí náà: `lightwalletd` |
 Wọ́n nílò ìkànnì àdúgbò kan. Bẹẹni. Bẹ̀rẹ (ìwé Zebra nípasẹ̀ ìlànà) Kò sí (àṣáwọ̀ rírẹ̀lẹ̀). Ìkànnì náà ni *is* ìkànlì náà. BẸ̀rẹ
zcashd RPC compat. Designed as the compat path. Small selected subset only. N/A. Partial / Zakura compat mode. Different API. Zcashd rpc compat: a ṣe apẹrẹ bi ipa ọna ti o ṣopọ, ṣugbọn kii ṣe fun awọn olumulo kekere nikan; ko si tabi rara ni gbogbo wọn jẹ aṣoju ati pe wọn le wa lati ọdọ rẹ nitori wọn yoo lo ohun elo naa pẹlu eyikeyi ipese miiran (fun apẹẹrẹ data).
 Àpẹẹrẹ ìtọ́jú. Olùṣiṣẹ̀ ń gbé kókó sínú `wallet.db` Server tí a lè rí lára rẹ̀ padà. Àwọn kókó ẹrọ oníṣe kò sí àpamọ́ owó, kò sí àwọn kọǹpútà-ìmọ̀ràn.

Zallet and **zecd** can both sit in front of Zebra. Pick Zallet when you need the `z_*` àpòòwé ojú àti ìyípadà ipa ọ̀nà láti inú `wallet.dat`. Yan zecd nigbati o ba fẹ olupin ti a fi bo-akọkọ ti o jẹ * ko* ni gbangba kan `zcashd` àdàkọ.

O wa ọja onibara ti o ya sọtọ ni awọn ile itaja. [zallet.io ì í ë ¤ì 'ë©'](https://www.zallet.io/) ohun elo yẹn kìí ṣe iṣẹ́ yìí.

---

## Àwọn ojúewé tó ní í ṣe pẹ̀lú rẹ̀

- [Àwọn Ìkànnì Pípéye](Full_Nodes.md)  Zebra, Zakura àti àwọn tó ti fẹ̀yìn tì lẹ́nu iṣẹ́ `zcashd` ìsọ̀rí
- [Zebra Ìkànnì Pípéye](Zebra_Full_Node.md) — the node Zallet’s default backend reads
- [Ìkànnì Zakura](Zakura_Node.md)  àtúnṣe ìmúṣẹ àwọn kókó mìíràn
- [Zaino](Zaino.md)  Àwòrán-ìmọ̀ràn àti ààrò oníṣe alágbèéká ìmọ́lẹ̀ (light client server)
- [ZECD (ìpínlẹ̀)](ZECD.md)  àdàkọ mìíràn-ìpèsè apamọwọ lórí librustzcash
- [Ìṣètò Ọ̀rọ̀-ìpamọ́ Zcash Wallet](Zcash_Wallet_Syncing.md)  bí àwọn àpò-ìpamọ́ ṣe ń ṣàyẹ̀wò ẹrù ìnájà náà
- [Àwọn Kókó Ìwòran](Viewing_Keys.md)

## Àwọn Owó-ìṣúnná owó

- [Ìwé Zallet](https://zcash.github.io/zallet/)
- [zcash/zallet lórí GitHub](https://github.com/zcash/zallet)
- [Àwọn ìfilọ́lẹ̀](https://github.com/zcash/zallet/releases)
- [JSON-RPC yípò sí ìtumọ̀ tí ó ti yípo.](https://zcash.github.io/zallet/zcashd/json_rpc.html)
- [Atọka gbigbe ZecHub](/guides/migration-guide-zcashd-to-zebrad-zallet)
- [ZecHub Raspberry Pi guide (Zebra + Zallet) àtúnṣe _ àtúnṣe àmìọ̀rọ̀](/guides/raspberry-pi-4-full-node)
- [Z3 (Zebra + Zallet ṣe akopọ)](https://github.com/ZcashFoundation/z3)
- [Zcash R&D Discord ì í ë ¤ì 'ë¦¬í ¬ê° êμ¬ì§ .](https://discord.gg/xpzPR53xtU) — `#wallet-dev`
