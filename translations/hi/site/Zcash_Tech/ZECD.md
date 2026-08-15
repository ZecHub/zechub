---
<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/ZECD.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="पेज संपादित करें"/>
</a>

# ZECD — Shielded-First Wallet सर्वर

> 🇧🇷 [पुर्तगाली संस्करण](/zechubglobal/zcashbrasil/zcashtech/zecd)

ZECD, Zcash के लिए एक shielded-first wallet सर्वर है, जो [librustzcash](https://github.com/zcash/librustzcash) पर बनाया गया है और Bitcoin Core की JSON-RPC dialect के माध्यम से उपलब्ध कराया गया है। यह डेवलपर्स और payment integrators को Zcash के साथ इंटरैक्ट करने के लिए एक परिचित, Bitcoin-compatible API देता है — जबकि Orchard (सबसे निजी pool) को डिफ़ॉल्ट बनाता है। [zec.rocks](https://zec.rocks) द्वारा विकसित, ZECD को आधुनिक, cloud-native deployments में `zcashd` की wallet functionality को प्रतिस्थापित करने के लिए डिज़ाइन किया गया है।

**वर्तमान संस्करण:** 0.5.0-rc3 (13 जुलाई, 2026) — Ironwood (NU6.3) समर्थन के साथ। `cargo install zecd` के माध्यम से इंस्टॉल करें या आधिकारिक Docker image का उपयोग करें।

---

## संक्षेप में

- ZECD एक **wallet daemon (सर्वर)** है — full नोड नहीं। यह Zcash P2P protocol बोले बिना keys, scanning, proving, और RPC को संभालता है।
- यह **Bitcoin Core की JSON-RPC dialect** बोलता है: वही method names, field shapes, auth, और error codes — कई Bitcoin RPC clients Zcash के साथ सीधे काम कर सकते हैं।
- **Orchard (shielded) addresses डिफ़ॉल्ट हैं**; transparent (t-address) और Sapling समर्थन के लिए प्रति wallet स्पष्ट opt-in आवश्यक है।
- यह local JSON-RPC के माध्यम से **self-hosted [Zebra](Zebra_Full_Node.md) full नोड** से जुड़ता है — lightwalletd की आवश्यकता नहीं।
- **डिज़ाइन से stateless**: पूरा wallet केवल seed phrase से पुनर्प्राप्त किया जा सकता है, जिससे data directory disposable बन जाती है।
- **zcashd का drop-in replacement नहीं**: Zcash RPC methods के केवल एक subset को लागू करता है, privacy और safety के लिए जानबूझकर किए गए design differences के साथ।
- Fees **ZIP-317** का पालन करती हैं (deterministic fee calculation); user-specified fees अस्वीकार कर दी जाती हैं।
- परिचित Bitcoin RPC surface के माध्यम से **shielded memos (ZIP-302)** का समर्थन करता है।

---

## ZECD किस समस्या का समाधान करता है?

`zcashd`, Zcash का मूल नोड और wallet संयुक्त रूप से था — जिसे 2016 में Bitcoin के C++ codebase से fork किया गया था। समय के साथ, इससे friction पैदा हुआ: code को maintain करना कठिन है, wallet नोड के साथ tightly coupled है, और transparent addresses को shielded addresses के साथ first-class विकल्पों की तरह प्रस्तुत किया जाता है।

ZECD wallet की ज़िम्मेदारी को consensus से अलग करता है। यह एक **समर्पित wallet layer** है जो applications और Zebra full नोड के बीच बैठती है, और प्रदान करती है:

- librustzcash पर आधारित एक साफ़, आधुनिक Rust implementation (वही library जो Zodl और Zingo को शक्ति देती है)
- privacy-by-default design (जब तक अलग से configure न किया जाए, Orchard addresses)
- एक Bitcoin-compatible RPC interface जो Zcash-specific tooling सीखने की आवश्यकता को हटाता है
- stateless, seed-recoverable architecture जो containerized और cloud deployments के लिए उपयुक्त है

---

## आर्किटेक्चर

ZECD तीन-स्तरीय मॉडल में काम करता है:

```
Your app / Bitcoin RPC client
        ↓  JSON-RPC
       ZECD
   (keys, scanning, proving, RPC)
        ↓  JSON-RPC (local only)
       Zebra
   (full node — consensus, mempool, chain data)
```

ZECD, Zebra के साथ **केवल local JSON-RPC** के माध्यम से संवाद करता है — कोई peer-to-peer networking नहीं, कोई third-party indexers नहीं, कोई lightwalletd नहीं। Zebra connection को जानबूझकर local-only रखा गया है: ZECD credentials को globally-routable host पर भेजने से इंकार करेगा, जब तक कि out-of-band secured tunnel (जैसे WireGuard या SSH) के लिए स्पष्ट रूप से configure न किया गया हो।

---

## मुख्य विशेषताएँ

### Shielded-First, डिफ़ॉल्ट रूप से Orchard

ZECD, Orchard Unified Addresses को डिफ़ॉल्ट address type के रूप में उपयोग करता है। Sapling और transparent (t-address) pools के लिए प्रति wallet स्पष्ट configuration आवश्यक है। यह design accidental transparent sends के जोखिम को कम करता है — जो पुराने Zcash tooling में एक सामान्य privacy pitfall है।

Privacy policy को प्रति call या globally `[spend] privacy_policy` में configure किया जा सकता है:

| Policy | व्यवहार |
|--------|----------|
| `AllowRevealedRecipients` (डिफ़ॉल्ट) | transparent recipients को sends की अनुमति देता है; on-chain राशि और recipient प्रकट करता है |
| `AllowRevealedAmounts` | cross-pool sends (Sapling↔Orchard) की अनुमति देता है लेकिन transparent recipients को अस्वीकार करता है |
| `FullPrivacy` | केवल एक pool के भीतर पूरी तरह shielded sends; transparent recipients और cross-pool को अस्वीकार करता है |
| `AllowFullyTransparent` | transparent UTXOs से वित्तपोषित t→t sends की भी अनुमति देता है |

### Bitcoin Core RPC Compatibility

ZECD, Bitcoin Core की JSON-RPC dialect को निम्न क्षेत्रों में conformance के साथ लागू करता है:

- Method names (उदा. `getblockchaininfo`, `getbalance`, `getnewaddress`, `listtransactions`, `sendtoaddress`, `sendmany`)
- responses में field names और types
- JSON-RPC 1.0 envelope structure
- Basic auth, `rpcauth` entries, और cookie file authentication
- Error codes और HTTP status mapping (error body के साथ HTTP 500, 401 semantics)

इसका अर्थ है कि कई मौजूदा Bitcoin payment libraries, exchange integrations, और monitoring tools, बहुत कम या बिना code changes के, ZECD के माध्यम से Zcash के साथ इंटरैक्ट कर सकते हैं।

Conformance suite (140+ checks) हर PR पर एक live regtest daemon के विरुद्ध चलती है और इसे सार्वजनिक testnet के विरुद्ध भी validate किया गया था।

### Shielded Memos (ZIP-302)

ZECD, परिचित Bitcoin RPC surface के माध्यम से Zcash की shielded memo feature को उपलब्ध कराता है — जो standard Bitcoin tooling में उपलब्ध नहीं है:

- `sendtoaddress` एक अतिरिक्त trailing parameter के रूप में वैकल्पिक hex memo स्वीकार करता है (अधिकतम 512 bytes; transparent recipients के लिए अस्वीकार)
- `listtransactions` और `gettransaction` से transaction history entries में `memo` (hex) और `memoStr` (decoded text) fields शामिल होते हैं जब किसी output में memo होता है
- shielded recipient को zero-amount sends memo-only use cases के लिए समर्थित हैं (यानी `z_sendmany` का "memo-only-send" pattern)

इससे ZECD उन applications के लिए उपयुक्त बनता है जिन्हें payments के साथ private, on-chain messaging की आवश्यकता होती है।

### डिज़ाइन से Stateless

ZECD **कोई भी off-chain state persist नहीं करता जिसे seed-only restore फिर से न बना सके**। Wallet database (`data.sqlite`) पूरी तरह seed phrase से derivable है — shielded funds बिना शर्त recover हो जाते हैं; transparent funds configured gap limit तक recover होते हैं।

Seed से wallet restore करने के लिए:

```sh
zecd init --restore --birthday <block-height>
```

इससे data directory **disposable** बन जाती है: यदि किसी container में persistent volume न हो और हर startup पर seed से पुनर्निर्माण हो, तो कुछ भी महत्वपूर्ण नहीं खोता। Operators उन addresses को track करने के लिए ज़िम्मेदार हैं जिन्हें वे वितरित करते हैं — ZECD केवल उन्हीं addresses को याद रखता है जिन्हें on-chain funds प्राप्त हुए हों।

Labels जानबूझकर अनुपस्थित हैं। क्योंकि labels का कोई on-chain source नहीं है और उन्हें seed से पुनर्निर्मित नहीं किया जा सकता, ZECD उनका समर्थन ही नहीं करता। Label methods को call करने पर `method-not-found` error (`-32601`) मिलता है।

### lightwalletd पर कोई निर्भरता नहीं

ZECD, compact blocks, tree state, और mempool visibility को सीधे Zebra के JSON-RPC से प्राप्त करता है। चलाने या maintain करने के लिए कोई lightwalletd नहीं है — जिससे self-hosted deployments के लिए operational complexity कम होती है।

### Cloud-Native और Containerized Deployments

ZECD की stateless architecture, Docker और Kubernetes environments के लिए डिज़ाइन की गई है:

- Repository में पूर्ण Docker Compose stack (`zebra → zecd`) उपलब्ध है
- port `9233` पर health endpoint, configurable readiness probes (`synced` या `connected`) के साथ
- log aggregation pipelines के लिए structured JSON logging विकल्प
- ZIP-317 deterministic fees — किसी fee oracle या manual fee configuration की आवश्यकता नहीं
- `bootstrap_from_keys` (डिफ़ॉल्ट रूप से on): `keys.toml` के बगल में empty data directory startup पर wallet को auto-rebuild कर देती है — एक Secret mount करके और empty PVC के साथ start करके deploy करें

---

## Custody Models

ZECD तीन key-custody models का समर्थन करता है, जो अलग-अलग deployment और security requirements के लिए उपयुक्त हैं:

### 1. Unencrypted (डिफ़ॉल्ट — Auto-Unlock)

`keys.toml` में seed mnemonic को **age identity file** (`identity.txt`) में wrap किया जाता है। डिफ़ॉल्ट `auto_unlock = true` के साथ, startup पर seed memory में decrypt हो जाता है ताकि sends unattended हों और किसी `walletpassphrase` call की आवश्यकता न पड़े।

इनके लिए सबसे उपयुक्त: automated payment processors, exchange hot wallets, developer environments.

```sh
zecd init --datadir ./data --wallet default --account-name primary
```

> Mainnet पर `identity.txt` को data directory के **बाहर** रखें — जो भी दोनों files पढ़ सकता है, उसके पास spend authority होगी।

### 2. Encrypted (Passphrase-Protected)

Mnemonic को identity file के बजाय passphrase (age scrypt) के साथ wrap किया जाता है। Wallet locked अवस्था में start होता है; `walletpassphrase "<pass>" <timeout>` इसे निर्दिष्ट अवधि के लिए unlock करता है और timeout पर auto-relock करता है — Bitcoin Core के encrypted wallet behavior के अनुरूप।

इनके लिए सबसे उपयुक्त: hot wallets जहाँ unattended spend authority आवश्यक नहीं; interactive operator workflows.

```sh
zecd init --datadir ./data --encrypt
# later: walletpassphrase "my-passphrase" 300
```

### 3. Watch-Only (UFVK — No Spend Key)

किसी अन्य wallet से export की गई Unified Full Viewing Key (UFVK) के साथ initialize किया जाता है। यह receive, scan, और balances report कर सकता है — लेकिन transactions sign नहीं कर सकता। Monitoring, invoicing, या signing wallet से अलग audit नोड्स के लिए आदर्श।

```sh
# On the signing wallet's host:
zecd export-ufvk

# On the watch-only host:
zecd init --datadir ./data-watch --ufvk "uview1..." --birthday <height>
```

---

## Backup और Recovery

Funds केवल **mnemonic से ही** recover किए जा सकते हैं। बाकी सब कुछ cache है।

| Artifact | स्थान | यह क्या सुरक्षित करता है | Backup लें? |
|----------|----------|-----------------|----------|
| **24-word mnemonic** | `zecd init` पर एक बार दिखाया जाता है | Funds — खोने का अर्थ स्थायी हानि | **हाँ — offline (paper/HSM)** |
| `keys.toml` | `<wallet dir>/keys.toml` | Encrypted seed + birthday + network | **हाँ — Secret के रूप में** |
| `identity.txt` | `[keys] age_identity` | `keys.toml` को decrypt करता है (spend authority) | **हाँ — `keys.toml` से अलग** |
| Birthday height | `keys.toml` के भीतर | restore को तेज बनाता है (पहले tx से पहले की कोई भी height) | mnemonic के साथ रिकॉर्ड करें |
| `data.sqlite` | `<wallet dir>/data.sqlite` | Wallet cache — restore पर seed से फिर बनता है | नहीं — disposable |
| `blocks/` | `<wallet dir>/blocks/` | Compact block cache | नहीं — कभी ship न करें; बड़ा हो सकता है |
| `.cookie` | `<datadir>/.cookie` | Ephemeral RPC cookie | नहीं — startup पर फिर बनती है |

> **Data directory host-local होनी चाहिए।** ZECD का single-instance lock (`<datadir>/.lock`) एक OS advisory lock है — यह hosts के बीच लागू नहीं होता। कभी भी data directory को machines के बीच read-write mode में साझा न करें (NFS, Kubernetes `ReadWriteMany`) — दो ZECD instances wallet DB को corrupt कर देंगे। Kubernetes में `ReadWriteOnce` volumes का उपयोग करें।

---

## RPC Method Safelist

ऐसे deployments के लिए जहाँ credential leak विनाशकारी हो सकता है, ZECD RPC surface को चुने हुए methods के subset तक सीमित करने का समर्थन करता है:

```toml
[rpc]
allowed_methods = ["getblockchaininfo", "getbalance", "getnewaddress", "listtransactions"]
```

सूची में न होने वाला कोई भी method `-32601` (HTTP 404) लौटाता है — जो ऐसे method से अलग नहीं दिखता जो अस्तित्व में ही नहीं है, इसलिए एक locked-down server यह प्रकट नहीं करता कि उसने क्या disable किया है। A receive-only invoicer, compromised client से blast radius कम करने के लिए `sendtoaddress`, `sendmany`, और `stop` को disable कर सकता है।

---

## Bitcoin Core RPC से मुख्य अंतर

Bitcoin या zcashd tooling से migrate कर रहे डेवलपर्स को इन जानबूझकर किए गए divergences के बारे में पता होना चाहिए:

| व्यवहार | Bitcoin Core | ZECD |
|----------|-------------|------|
| Address format | `1...` / `bc1...` | `u1...` (Orchard Unified Address) — string-parsing clients द्वारा Bitcoin address के रूप में parse नहीं किया जा सकता |
| Labels | पूर्ण label store | लागू नहीं — `setlabel`, `listlabels` आदि `-32601` लौटाते हैं |
| Fees | user-settable; fee market | केवल ZIP-317 deterministic; `settxfee`, `fee_rate`, `subtractfeefromamount` को `-8` के साथ अस्वीकार किया जाता है |
| Memos | समर्थित नहीं | `sendtoaddress` hex memo स्वीकार करता है; history में `memo` + `memoStr` fields होते हैं |
| Spend के लिए confirmations | 1 | 3 (अपना change) / 10 (third-party) — `trusted_confirmations` / `untrusted_confirmations` के माध्यम से configurable |
| Reorg पर `listsinceblock` | fork तक पीछे चलता है | यदि cursor reorg में हट गया हो तो `-5` (Block not found) लौटाता है — parameterless call के साथ re-baseline करें |
| `sendmany` में duplicate recipients | Error | JSON parser duplicates को ZECD के देखने से पहले collapse कर देता है (last wins) — एक ही address को दो बार सूचीबद्ध न करें |
| Initial sync के दौरान balance | Blocks या warm-up | partial balance serve करता है — automation को `GET /readyz` पर gate करें (पूरी तरह synced होने और enhancement backlog drain होने तक 503 लौटाता है) |
| `getbalance` में `minconf 0` | 0-conf balance | 1 के रूप में serve किया जाता है — unmined shielded note कभी spendable नहीं होती |

---

## Quick Start

**पूर्व-आवश्यकताएँ:** Zebra local रूप से `rpc.listen_addr = 127.0.0.1:18234` (testnet) के साथ चल रहा हो।

crates.io से इंस्टॉल करें (0.4.3+):

```sh
cargo install zecd
```

या source से build करें:

```sh
git clone https://github.com/zecrocks/zecd && cd zecd
cargo build --release
```

```sh
# 1. एक testnet wallet initialize करें (24-word mnemonic और एक account generate करता है)
zecd --datadir ./data --testnet init --wallet default --account-name primary

# 2. daemon start करें (background में sync करता है, port 18232 पर JSON-RPC serve करता है)
zecd --datadir ./data --testnet \
    --rpcuser zec --rpcpassword secret --rpcbind 127.0.0.1 --rpcport 18232
```

**curl के माध्यम से इंटरैक्ट करें:**

```sh
curl -s --user zec:secret --data-binary \
  '{"jsonrpc":"1.0","id":"1","method":"getblockchaininfo","params":[]}' \
  -H 'content-type: text/plain;' http://127.0.0.1:18232/
```

**Python के माध्यम से इंटरैक्ट करें (Bitcoin RPC library का उपयोग करते हुए):**

```python
from bitcoinrpc.authproxy import AuthServiceProxy
rpc = AuthServiceProxy("http://zec:secret@127.0.0.1:18232")
print(rpc.getblockchaininfo())
addr = rpc.getnewaddress()          # returns a u1... Orchard Unified Address
print(rpc.getbalance())
print(rpc.listtransactions("*", 20))

# Send with a shielded memo
rpc.sendtoaddress(addr, 0.001, "", "", False, "48656c6c6f205a6563617368")  # hex memo
```

**Seed से restore करें:**

```sh
zecd --datadir ./data init --restore --birthday 2500000
# prompted होने पर अपनी 24-word mnemonic paste करें
```

---

## डिफ़ॉल्ट Ports

| Network | ZECD RPC | Zebra RPC (backend) | Health |
|---------|----------|---------------------|--------|
| Mainnet | 8232 | 8234 | 9233 |
| Testnet | 18232 | 18234 | 9233 |

---

## ZECD बनाम zcashd बनाम Zaino

| | zcashd | Zaino | ZECD |
|--|--------|-------|------|
| भूमिका | Full नोड + wallet | Indexer (lightwalletd को प्रतिस्थापित करता है) | केवल wallet सर्वर |
| भाषा | C++ | Rust | Rust |
| स्थिति | Deprecated | Active | Active (v0.5.0-rc3, जुलाई 2026) |
| डिफ़ॉल्ट pool | Transparent | N/A | Orchard (shielded) |
| RPC dialect | zcashd-specific | gRPC (lightwalletd) | Bitcoin Core JSON-RPC |
| Full नोड आवश्यक | हाँ (स्वयं) | Zebra या zcashd | Zebra |
| Stateless recovery | नहीं | N/A | हाँ (केवल seed) |
| Shielded memos | हाँ (`z_sendmany`) | N/A | हाँ (Bitcoin RPC surface) |
| Watch-only (UFVK) | हाँ | हाँ | हाँ |
| Cloud-native | नहीं | आंशिक | हाँ |
| Install | Build/binary | Build | `cargo install zecd` |

---

## संबंधित पेज

- [Zebra Full Node](Zebra_Full_Node.md) — वह full नोड जिससे ZECD जुड़ता है
- [Zaino Indexer](Zaino.md) — वैकल्पिक indexer approach (lightwalletd को प्रतिस्थापित करता है)
- [Zakura Node](Zakura_Node.md) — एक अन्य full नोड implementation (Zebra का fork)
- [Viewing Keys](Viewing_Keys.md) — ZECD account viewing keys का उपयोग करके chain को कैसे scan करता है
- [Wallets](/using-zcash/wallets) — wallet ecosystem का अवलोकन

## संसाधन

- [ZECD GitHub (zecrocks/zecd)](https://github.com/zecrocks/zecd)
- [ZECD Operations Runbook](https://github.com/zecrocks/zecd/blob/main/docs/OPERATIONS.md)
- [zec.rocks](https://zec.rocks)
- [librustzcash — मुख्य Zcash cryptography library](https://github.com/zcash/librustzcash)
- [ZIP-317: Proportional Transfer Fee Mechanism](https://zips.z.cash/zip-0317)
- [ZIP-302: Shielded Memos](https://zips.z.cash/zip-0302)
- [Zodl wallet (librustzcash-compatible)](https://github.com/zodl-inc/zodl-ios)
