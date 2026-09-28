<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zallet.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="पृष्ठ संपादित करें"/>
</a>

# Zallet

Zallet, Rust में लिखा गया एक पूर्ण-नोड Zcash wallet है। यह उस wallet का प्रतिस्थापन है जो पहले `zcashd` में अंतर्निहित हुआ करता था। 18 जुलाई 2026 को ब्लॉक ऊंचाई 3417100 पर `zcashd` के समर्थन-समाप्ति ठहराव तक पहुंचने के बाद, consensus और wallet दायित्वों को विभाजित कर दिया गया: **Zebra** या **Zakura** chain को सत्यापित करते हैं, और **Zallet** कुंजियां रखता है, notes स्कैन करता है, और wallet JSON-RPC प्रदान करता है।

Zallet वर्तमान में **beta** में है। इसकी पूरी तरह समीक्षा नहीं की गई है। breaking changes के लिए wallet को हटाकर दोबारा बनाना पड़ सकता है। [The Zallet Book](https://zcash.github.io/zallet/) में दी गई सुरक्षा चेतावनियां पढ़े बिना, बड़ी मात्रा में ZEC के लिए इसे production custody न मानें।

---

## संक्षेप में

- Zallet एक **पूर्ण-नोड RPC wallet** है, mobile light wallet या consensus नोड नहीं।
- यह `zcashd` के wallet भाग को प्रतिस्थापित करता है। नोड भाग [Zebra](Zebra_Full_Node.md) या [Zakura](Zakura_Node.md) है।
- **Rust** में लिखा गया, MIT / Apache-2.0 के तहत dual-licensed, और [zcash/zallet](https://github.com/zcash/zallet) में अनुरक्षित।
- अगस्त 2026 के अंत तक का नवीनतम प्रकाशित release: **v0.1.0-beta.3**।
- दो backends में से एक के माध्यम से chain data से बात करता है: **zebra-state** (स्थानीय `zebrad` के विरुद्ध प्रत्यक्ष `ReadStateService`) या **Zaino**।
- **zcashd-संगत JSON-RPC** का एक subset प्रदान करता है। कुछ methods बदले गए हैं; कुछ जानबूझकर छोड़े गए हैं।
- key material हमेशा **age** से encrypted रहता है। transaction history, addresses, और viewing keys `wallet.db` में खुले रूप में रहते हैं।
- एक signed archive में तीन binaries आती हैं: `zallet` (launcher), `zallet-zebra`, और `zallet-zaino`।
- आधिकारिक दस्तावेज़: [The Zallet Book](https://zcash.github.io/zallet/)।

---

## Zallet क्यों मौजूद है

`zcashd` ने Bitcoin Core से व्युत्पन्न consensus नोड और wallet को एक ही process में bundled किया था। वह डिज़ाइन अब समाप्त हो गया है।

| भूमिका | पुराना stack | वर्तमान stack |
|------|-----------|---------------|
| Consensus / P2P | `zcashd` | Zebra (`zebrad`) या Zakura |
| Wallet / कुंजियां / balances | `zcashd` `wallet.dat` | **Zallet** (`wallet.db`) |
| Light-client indexer | `lightwalletd` | Zaino या `lightwalletd` |

Wallet को नोड से अलग करने का अर्थ है:

- कुंजियां स्थानांतरित किए बिना नोड software बदला जा सकता है (Zebra बनाम Zakura)।
- Wallet scanning और spend authority ऐसे process में रहते हैं जिसे अलग से lock down किया जा सकता है।
- RPC semantics, ZIP 32 accounts, Unified Addresses, और PCZTs की ओर विकसित हो सकते हैं, बजाय `zcashd` की विशेषताओं पर स्थिर रहने के।

Zallet उन operators के लिए बनाया गया wallet है जो पहले `zcashd` को hot wallet, exchange backend, faucet, या mining payout wallet के रूप में चलाते थे।

---

## स्थिति

Zallet **beta** में है।

व्यवहार में इसका अर्थ:

- किसी भी beta में breaking changes आ सकते हैं। आपको data directory हटाकर फिर से शुरू करना पड़ सकता है।
- हर `zcashd` wallet RPC को port नहीं किया गया है।
- कुछ port किए गए methods की semantics, `zcashd` से अलग हैं। integrations को [altered-semantics page](https://zcash.github.io/zallet/zcashd/json_rpc.html) पढ़ना चाहिए।
- crates विकासाधीन हैं और उनकी पूरी तरह समीक्षा नहीं की गई है।
- Zallet Rust library **नहीं** है। यदि आप इसे library के रूप में निर्भर करते हैं तो कोई guarantees नहीं हैं।

Feedback, [GitHub issues](https://github.com/zcash/zallet/issues/new) या `#wallet-dev`[Zcash R&D Discord](https://discord.gg/xpzPR53xtU) के channel पर भेजें।

इच्छित RPC surface उपलब्ध होने पर बाद के स्थिर चरण की योजना है। तब callers से अपेक्षा होगी कि वे दस्तावेज़ित semantic differences सहित Zallet के methods पर migrate करें।

---

## वास्तुकला

Zallet को तीन Cargo workspaces में विभाजित किया गया है ताकि दो chain backends अलग dependency graphs को track कर सकें।

```
zallet            launcher: reads `backend` in zallet.toml (default "zebra")
                  and execs zallet-zebra or zallet-zaino
zallet-core       shared wallet: CLI, config, JSON-RPC, SQLite DB, sync
zallet-zebra      zebra-state backend (ReadStateService + Zebra JSON-RPC)
zallet-zaino      Zaino indexer backend
```

तीनों binaries **एक ही** `wallet.db` खोलती हैं। launcher runtime पर backend चुनता है; बदलने के लिए आपको recompile नहीं करना पड़ता।

सामान्य deployment:

```
zebrad  (or Zakura)
   │  JSON-RPC / ReadStateService
   ▼
Zallet  (zallet-zebra or zallet-zaino)
   │  JSON-RPC on 127.0.0.1
   ▼
Your application, exchange, faucet, or operator scripts
```

Zallet एक **पूर्ण-नोड wallet** है: इसे स्थानीय सत्यापित करने वाले नोड की अपेक्षा होती है। यह light client नहीं है। light wallets और compact-block servers के लिए, [Zaino](Zaino.md) और [Lightwallet Nodes](Lightwallet_Nodes.md) देखें।

Zcash Foundation का [Z3](https://github.com/ZcashFoundation/z3) compose stack, Zebra + Zallet को साथ चलाता है, और बाहरी light clients के लिए वैकल्पिक standalone Zaino उपलब्ध है।

---

## Accounts, addresses, और keys

Zallet, ZIP 32 accounts के इर्द-गिर्द बनाया गया है, न कि `zcashd` के एकल अंतर्निहित account के इर्द-गिर्द।

- एक wallet में **कई BIP 39 mnemonics** हो सकते हैं। प्रत्येक mnemonic एक स्वतंत्र spend root है, जिसे **seed fingerprint** (`zip32seedfp1…`) से पहचाना जाता है।
- **Accounts**, seed से ZIP 32 account index के साथ derive किए जाते हैं। एक Zallet instance के भीतर उनका स्थानीय **UUID** भी होता है। account की portable identity `(seedfp, account index)` है।
- Addresses, **ZIP 316 Unified Addresses** हैं, जो `z_getaddressforaccount` से बनाए जाते हैं। एक account में कई diversified addresses हो सकते हैं; shielded receivers on-chain linkable नहीं होते।
- Imported spending keys (`z_importkey`) और watch-only addresses (`z_importaddress`), UUID accounts बन जाते हैं जिन्हें कोई mnemonic cover नहीं करता।
- Viewing keys को export और import किया जा सकता है (`z_exportviewingkey`, `z_importviewingkey`), जिनमें unified full viewing keys और incoming viewing keys शामिल हैं।

`getnewaddress` लागू नहीं है। `z_getnewaccount` और `z_getaddressforaccount` का उपयोग करें।

यदि `keystore.require_backup` चालू है (`zcashd` के `walletrequirebackup` का migrated रूप), तो Zallet उस mnemonic से नई spend authority derive करने से मना कर देता है जिसकी backup पुष्टि नहीं की गई है।

---

## Encryption और backups

Key material **हमेशा** encrypted रहता है। कोई unencrypted mode और कोई `encryptwallet` RPC नहीं है — वह `zcashd` method कभी पूर्णतः समर्थित नहीं था।

- Setup एक **age** identity बनाता है, जिसका default path `{datadir}/encryption-identity.txt` है।
- Mnemonics और imported spending keys, `wallet.db` में age ciphertexts के रूप में stored होते हैं।
- Database का शेष भाग encrypted **नहीं** है। यदि किसी को file मिल जाए, तो history, addresses, और viewing keys पढ़े जा सकते हैं।
- Identity को passphrase से wrap किया जा सकता है (`generate-encryption-identity -p`)। `walletpassphrase` RPC से unlock करें; `walletlock` से lock करें।
- Identity file या उसका passphrase खोने पर spending keys पुनर्प्राप्त नहीं हो सकतीं। identity, प्रत्येक mnemonic, और रखी गई किसी भी `wallet.db` copy का (अलग से encrypted) backup लें।

Zallet चलते समय `wallet.db` की copy बनाना सुरक्षित backup नहीं है। SQLite में tearing हो सकती है। बंद process को प्राथमिकता दें, या आधिकारिक online-backup command की प्रतीक्षा करें।

---

## JSON-RPC

Zallet, HTTP पर Basic auth के साथ `zcashd` wallet RPCs का एक subset लागू करता है। इसे loopback पर bind करें। Remote उपयोग encrypted tunnel के माध्यम से होना चाहिए। `rpc.allow_insecure_remote_bind` मौजूद है और असुरक्षित है।

`zcashd` से उल्लेखनीय अंतर:

- `getwalletinfo` पर balance fields खाली हैं। `z_getbalances`, `z_getbalanceforaccount`, `z_gettotalbalance` का उपयोग करें।
- Fees **ZIP 317** का अनुसरण करती हैं। कोई `settxfee` नहीं है।
- Spend construction, **PCZTs** (Partially Created Zcash Transactions, ZIP 374) की ओर बढ़ रहा है। PCZT RPCs beta series में आए।
- wallet catch up करते समय या reorg से recover करते समय global **sync lock**, balance और spend RPCs को रोक देता है (`ClientInInitialDownload` / `ForbiddenBySafeMode`)।

जानबूझकर छोड़े गए methods में `createrawtransaction`, `fundrawtransaction`, `getnewaddress`, `getrawchangeaddress`, `keypoolrefill`, `importwallet`, और `encryptwallet` शामिल हैं। प्रतिस्थापन [Zallet Book](https://zcash.github.io/zallet/zcashd/json_rpc.html) में सूचीबद्ध हैं।

---

## शुरुआत करना

आधिकारिक install paths (Debian packages, Docker, release binaries) [installation guide](https://zcash.github.io/zallet/guide/installation/index.html) में हैं। Release archives का नाम `zallet-<version>-<arch>.tar.gz` है और उनमें तीनों binaries होती हैं।

न्यूनतम नया-wallet flow:

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

`[indexer]` को स्थानीय `zebrad` JSON-RPC endpoint पर point करें। zebra backend को `[indexer.read_state_service]` और indexer feature के साथ बना हुआ `zebrad` भी चाहिए, ताकि Zallet सीधे chain state पढ़ सके।

Reproducible images, [StageX](https://codeberg.org/stagex/stagex/) से बनाई जा सकती हैं (Docker 25+, containerd image store, GNU Make)।

---

## zcashd से migrate करना

Balances की पुष्टि और restore का परीक्षण करने तक पुरानी `zcashd` datadir रखें।

```bash
zallet init-wallet-encryption
zallet migrate-zcash-conf --zcashd-datadir /path/to/zcashd/datadir \
  -o /path/to/zallet/datadir/zallet.toml
zallet migrate-zcashd-wallet --zcashd-datadir /path/to/zcashd/datadir
```

`migrate-zcashd-wallet` केवल `zcashd-import` feature वाले builds में है। `wallet.dat` पढ़ने के लिए **Berkeley DB 6.2** से `db_dump` चाहिए, जो `zcashd` द्वारा प्रयुक्त version है।

Step-by-step operator notes: [Migration Guide: zcashd से Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet)।

---

## Zallet का अन्य software से संबंध

| | Zallet | zecd | Zashi / ZODL / YWallet | Zebra / Zakura | Zaino |
|--|--------|------|------------------------|----------------|-------|
| यह क्या है | पूर्ण-नोड RPC wallet | Shielded-first wallet server | End-user wallets | Consensus नोड | Indexer / lightwalletd प्रतिस्थापन |
| किसे प्रतिस्थापित करता है | `zcashd` wallet | drop-in `zcashd` clone नहीं | Mobile/desktop apps | `zcashd` नोड | `lightwalletd` |
| स्थानीय नोड चाहिए | हाँ | हाँ (default रूप से Zebra) | नहीं (light client) | यह स्वयं नोड है | हाँ |
| zcashd RPC संगतता | compat path के रूप में डिज़ाइन किया गया | केवल छोटा चुना हुआ subset | लागू नहीं | Partial / Zakura compat mode | अलग API |
| Custody model | Operator, `wallet.db` में कुंजियां रखता है | Seed-recoverable server | User device keys | कोई wallet नहीं | कोई keys नहीं |

Zallet और **zecd**, दोनों Zebra के सामने बैठ सकते हैं। जब आपको `z_*` wallet surface और `wallet.dat` से migration path चाहिए, तब Zallet चुनें। जब आपको ऐसा shielded-first server चाहिए जो स्पष्ट रूप से `zcashd` clone *नहीं* है, तब zecd चुनें।

[zallet.io](https://www.zallet.io/) पर इसी नाम का एक अलग consumer product है। वह app यह project नहीं है।

---

## संबंधित पृष्ठ

- [Full Nodes](Full_Nodes.md) — Zebra, Zakura, और सेवानिवृत्त `zcashd` नोड
- [Zebra Full Node](Zebra_Full_Node.md) — वह नोड जिसे Zallet का default backend पढ़ता है
- [Zakura Node](Zakura_Node.md) — वैकल्पिक सत्यापित करने वाला नोड
- [Zaino](Zaino.md) — indexer backend और light-client server
- [ZECD](ZECD.md) — librustzcash पर आधारित एक अन्य wallet-server डिज़ाइन
- [Zcash Wallet Syncing](Zcash_Wallet_Syncing.md) — shielded wallets chain को कैसे स्कैन करते हैं
- [Viewing Keys](Viewing_Keys.md)

## संसाधन

- [The Zallet Book](https://zcash.github.io/zallet/)
- [GitHub पर zcash/zallet](https://github.com/zcash/zallet)
- [Releases](https://github.com/zcash/zallet/releases)
- [JSON-RPC altered semantics](https://zcash.github.io/zallet/zcashd/json_rpc.html)
- [ZecHub migration guide](/guides/migration-guide-zcashd-to-zebrad-zallet)
- [ZecHub Raspberry Pi guide (Zebra + Zallet)](/guides/raspberry-pi-4-full-node)
- [Z3 (Zebra + Zallet compose stack)](https://github.com/ZcashFoundation/z3)
- [Zcash R&D Discord](https://discord.gg/xpzPR53xtU) — `#wallet-dev`
