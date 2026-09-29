<a href="https://github.com/zechub/zechub/edit/main/site/guides/Viewing_Key_Transaction_Export.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Viewing Key से लेनदेन इतिहास निर्यात करना

अधिकांश wallet निर्यात सीमित होते हैं। उदाहरण के लिए, ZODL का कर निर्यात आपको पिछले कैलेंडर वर्ष की तारीखें, राशियाँ और शुल्क देता है, लेकिन कोई लेनदेन ID, memo या पते नहीं देता। यह लेखा-जोखा रखने, wallet माइग्रेशन जाँचने या यह समझने के लिए पर्याप्त नहीं है कि किसी भुगतान के साथ क्या हुआ।

पूरी तस्वीर पाने के लिए आपको अपने seed phrase की आवश्यकता नहीं है। एक unified full viewing key (UFVK, जो `uview1` से शुरू होती है) किसी खाते में आने वाले और उससे जाने वाले हर लेनदेन को देख सकती है, और दो tools इसे आपकी रखी जा सकने वाली फ़ाइल में बदल सकते हैं: Zkool GraphQL server और zingo-cli। यह मार्गदर्शिका [इस forum thread](https://forum.zcashcommunity.com/t/exporting-transaction-history-to-json-csv-from-ufvk-seed/54662) के तरीकों को एकत्र करती है और उन्हें वर्तमान releases के लिए अपडेट करती है।

सितंबर 2026 में Zkool 6.30.0 और zingolib 6.0.0 के zingo-cli के साथ परीक्षण किया गया।

## शुरू करने से पहले

आपको दो चीज़ों की आवश्यकता है:

1. **खाते के लिए UFVK**। [Viewing Keys](/zcash-tech/viewing-keys) बताता है कि यह क्या प्रकट करती है और इसे कैसे निर्यात करें।
2. **एक birth height**, अर्थात वह block जहाँ से स्कैन शुरू करना है। अपने पहले लेनदेन से पहले की height इस्तेमाल करें। इसे बहुत ऊँचा रखने पर पुराना इतिहास चुपचाप छूट जाता है। इसे बहुत नीचे रखने पर स्कैन में बस अधिक समय लगता है। Sapling activation (419200) हमेशा सुरक्षित है, लेकिन इसे स्कैन करने में घंटों लग सकते हैं।

## इसे निजी रखें

Viewing key खर्च नहीं कर सकती, लेकिन जिसके पास यह हो उसे आपका पूरा इतिहास दिखाई देता है।

- इसे किसी वेबसाइट या block explorer में पेस्ट न करें। इसे केवल उस software में import करें जिसे आप स्वयं चलाते हैं।
- जिस server से आप sync करते हैं, वह आपका IP address और वे लेनदेन देखता है जिन्हें आप पूरे रूप में डाउनलोड करते हैं। नीचे दिए गए दोनों tools memo और शुल्क पढ़ने के लिए आपके प्रत्येक लेनदेन को ID द्वारा प्राप्त करते हैं, और [ZIP 307](https://zips.z.cash/zip-0307) में उल्लेख है कि इससे server को पता चलता है कि कौन-से लेनदेन आपके हैं। अपने स्वयं के Zebra नोड से Zaino या lightwalletd के साथ sync करने पर यह टलता है। [Zingolib and Zaino Tutorial](/guides/zingolib-and-zaino-tutorial) आपको setup के चरणों से गुजारता है।
- zingo-cli 6 भुगतान Nym mixnet पर भेजता है, लेकिन इसका sync अभी भी सीधे server से जुड़ता है, इसलिए ऊपर वाली बात इस पर भी लागू होती है।
- इन tools को viewing key दें, कभी भी seed न दें। Zkool GraphQL server में default रूप से कोई login नहीं है, और इसकी API seed से बनाए गए किसी भी खाते का seed लौटा सकती है तथा funds भेज सकती है।
- server को अपनी ही मशीन पर रखें। नीचे दिया Docker command केवल `127.0.0.1` पर सुनता है।
- दोनों tools key और आपके इतिहास को बिना encryption के संग्रहीत करते हैं। काम पूरा होने पर working data हटा दें और निर्यात को किसी encrypted स्थान पर रखें।

## विकल्प 1: Zkool GraphQL

`zkool_graphql`, Zkool का wallet engine है जो standalone server के रूप में चलता है। यह Zkool app से अलग program है। इसे चलाने का सबसे सरल तरीका आधिकारिक Docker image (amd64 और arm64) है। [Zkool releases page](https://github.com/hhanh00/zkool2/releases) पर Linux x86-64 binary भी है; इसके लिए glibc 2.38 या नया संस्करण चाहिए, इसलिए Ubuntu 24.04 काम करता है और Debian 12 नहीं।

### 1. server शुरू करें

```bash
docker run -d --name zkool-export \
  -p 127.0.0.1:8000:8000 \
  -v zkool-export:/data \
  hhanh00/zkool-graphql:6.30.0 \
  --db-path /data/zkool.db
```

यह `https://zec.rocks` से sync करता है, जब तक कि आप अपने server के साथ `--lwd-url` न जोड़ें। पहली बार शुरू होने पर यह Sapling parameters (लगभग 50 MB) डाउनलोड करता है। यदि वह विफल हो जाए, तो `docker start zkool-export` फिर प्रयास करता है।

Browser में `http://127.0.0.1:8000/graphiql` खोलें। आप वहाँ अगले प्रत्येक चरण को पेस्ट करके चला सकते हैं।

### 2. key import करें

```graphql
mutation {
  createAccount(newAccount: {
    name: "export"
    key: "uview1..."
    aindex: 0
    birth: 2500000
    useInternal: true
  })
}
```

यह नए खाते की ID लौटाता है, जो नए server पर 1 होती है।

- हमेशा `birth` सेट करें। इसके बिना Zkool वर्तमान block से शुरू होता है और कुछ नहीं पाता।
- `useInternal: true`, Zkool को transparent change addresses भी जाँचने देता है। ZODL से प्राप्त keys के लिए इसे चालू रखें; [Recovering Funds](/using-zcash/recovering-funds), ZODL seeds के लिए इसी setting का उपयोग करता है।

### 3. sync करें

```graphql
mutation { synchronizeAccount(idAccount: 1) }
```

यह sync समाप्त होने तक चलता है। `fast: true` न जोड़ें। यह पूरे लेनदेन डाउनलोड करना छोड़ देता है, जबकि memo, शुल्क और outputs वहीं से आते हैं।

यह जो संख्या लौटाता है वह वह height है जिसे पाने का इसका लक्ष्य था, न कि इस बात का प्रमाण कि वह वहाँ पहुँच गया। Network error बिना कुछ बताए sync को जल्दी समाप्त कर सकती है, इसलिए जाँचें:

```graphql
{ currentHeight accounts { id name height } }
```

यदि खाते का `height`, `currentHeight` से पीछे है, तो sync फिर चलाएँ। यह वहीं से जारी रहेगा जहाँ रुका था।

### 4. निर्यात करें

इसे `history.graphql` के रूप में सहेजें:

```graphql
{
  transactionsByAccount(idAccount: 1) {
    txid height time value fee
    notes { pool scope address value memo }
    spends { pool scope address value }
    outputs { pool vout address value memo }
  }
}
```

`height` argument को तब तक न दें जब तक आपका यही आशय न हो। यह न्यूनतम मान सेट करता है, इसलिए forum उदाहरण का `height: 3000000` उस block से पहले की हर चीज़ हटा देता है।

इसे JSON के रूप में प्राप्त करें:

```bash
jq -n --rawfile q history.graphql '{query: $q}' |
  curl -s http://127.0.0.1:8000/graphql \
    -H 'content-type: application/json' --data-binary @- > history.json
```

Mining rewards को छोड़कर हर लेनदेन में 0 से अधिक शुल्क दिखना चाहिए। यदि किसी में `"fee": "0"` और कोई memo नहीं दिखता, तो उसके विवरण डाउनलोड नहीं हुए। Zkool स्कैन के बाद पूरे लेनदेन एक-एक करके प्राप्त करता है, और एक विफलता चुपचाप बाकी को रोक देती है। प्रभावित लेनदेन सूचीबद्ध करने के लिए:

```bash
jq -r '.data.transactionsByAccount[] | select(.fee == "0") | .txid' history.json
```

यदि कुछ दिखे, तो कुछ मिनट बाद फिर sync करें और दोबारा निर्यात करें।

फिर इसे CSV में समतल करें, प्रति लेनदेन एक row:

```bash
jq -r '["txid","height","time_utc","net_zec","fee_zec","memos"],
  (.data.transactionsByAccount[] |
    [.txid, .height, .time, .value, .fee,
     ([.notes[].memo, .outputs[].memo] | map(select(. != null and . != "")) | unique | join(" | "))])
  | @csv' history.json > history.csv
```

### output पढ़ना

| फ़ील्ड | अर्थ |
|---|---|
| `value` | ZEC में खाते का शुद्ध परिवर्तन, जिसमें शुल्क शामिल है। भेजे गए भुगतानों के लिए ऋणात्मक। |
| `fee` | ZEC में शुल्क। आपको प्राप्त भुगतानों में प्रेषक ने इसका भुगतान किया था और यह `value` में नहीं होता। |
| `time` | timezone marker के बिना UTC में block समय |
| `notes` | इस लेनदेन में खाते को क्या प्राप्त हुआ, change सहित। आपको भेजे गए memo यहाँ होते हैं। Transparent entries का कोई पता नहीं होता। |
| `spends` | खाते के अपने वे notes जिन्हें इस लेनदेन ने खर्च किया |
| `outputs` | लेनदेन ने क्या भेजा: हर transparent output, साथ ही अन्य पतों के shielded payments और उनके memo |
| `pool` | 0 transparent, 1 Sapling, 2 Orchard, 3 Ironwood |
| `scope` | 0 external (आने वाला भुगतान), 1 internal (change) |

Zkool app में account menu में Export Transactions, Memos और Notes भी हैं, लेकिन वे raw table dumps हैं: राशियाँ zatoshis में, Unix timestamps, और memo एक अलग फ़ाइल में।

## विकल्प 2: zingo-cli

zingo-cli, Zingo का command-line wallet है। कोई prebuilt downloads नहीं हैं, इसलिए इसे Rust से build करें:

```bash
git clone --branch zingolib_v6.0.0 https://github.com/zingolabs/zingolib.git
cd zingolib
cargo build --release -p zingo-cli
cargo build --release --manifest-path zingo-netutils/Cargo.toml --features nym --bin nym-proxy
cp zingo-netutils/target/release/nym-proxy target/release/
```

केवल sync करने के लिए भी आपको `nym-proxy` की आवश्यकता है। zingo-cli 6 इसके बिना किसी server से नहीं जुड़ेगा।

पहला run एक view-only wallet बनाता है, उसे sync करता है और इतिहास प्रिंट करता है:

```bash
./target/release/zingo-cli --data-dir "$HOME/zingo-export" \
  --viewkey "uview1..." --birthday 2500000 \
  --server https://zec.rocks:443 \
  --waitsync transactions > transactions.txt
```

- `--data-dir` absolute path होना चाहिए।
- `--viewkey` और `--birthday` केवल wallet बनाते समय लागू होते हैं। उसके बाद इन्हें छोड़ दें।
- zingo-cli default रूप से offline शुरू होता है। `--server` server चुनता है और online जाने के लिए आपकी सहमति भी माना जाता है।
- key आपकी shell history में चली जाती है, इसलिए बाद में उसे साफ़ करें।

बाद के runs:

```bash
Z="./target/release/zingo-cli --data-dir $HOME/zingo-export"
$Z --server https://zec.rocks:443 --waitsync transactions > transactions.txt
$Z --offline value_transfers > value_transfers.txt
$Z --offline messages > memos.json
```

`--offline` network को छुए बिना पहले से sync हुई जानकारी पढ़ता है।

- `transactions` प्रति लेनदेन एक entry देता है: txid, समय (UTC), height, प्रकार (`received`, `sent`, `shield` या `send-to-self`), value, शुल्क और शामिल notes।
- `value_transfers` प्रति भुगतान एक entry देता है, इसलिए दो लोगों को भेजे गए भुगतान की दो entries होंगी, प्रत्येक में recipient address और memo होंगे।
- `messages` memo को JSON के रूप में सूचीबद्ध करता है।

output के बारे में जानने योग्य कुछ बातें:

- `transactions` और `value_transfers` साधारण text प्रिंट करते हैं जो थोड़ा JSON जैसा दिखता है, लेकिन है नहीं।
- राशियाँ zatoshis में होती हैं (1 ZEC के लिए 100,000,000) और हमेशा धनात्मक होती हैं। `kind` दिशा बताता है। भेजने के लिए, `value` वह राशि है जो शुल्क को छोड़कर अन्य लोगों को गई।
- जब कोई लेनदेन ऐसे transparent funds खर्च करता है जो आपके नहीं थे, शुल्क "not available" के रूप में दिखता है। केवल text memo दिखाए जाते हैं।
- यदि sync विफल हो जाए, तो error फ़ाइल के बजाय terminal में जाता है, और zingo-cli फिर भी सामान्य रूप से exit हो जाता है। `transactions.txt` पर भरोसा करने से पहले terminal जाँचें।

dismad के [zingoHelper](https://github.com/dismad/zingoHelper) में एक `exportToJSON.sh` script है जो `transactions` को JSON में बदलती है। इसे zingo-cli 6 से पहले लिखा गया था, यह testnet के लिए तैयार है, कुछ outgoing Sapling और transparent entries को placeholders के रूप में चिह्नित करती है, और इसे GNU tools चाहिए, इसलिए यह सामान्य macOS पर नहीं चलेगी। इसके output को शुरुआती बिंदु मानें और totals जाँचें।

## viewing key क्या नहीं बता सकती

- **कीमतें।** कोई भी tool प्रत्येक लेनदेन के समय की ZEC कीमत दर्ज नहीं करता। Fiat values स्वयं जोड़ें।
- **Transparent इतिहास, यदि key में वह शामिल नहीं है।** UFVK का transparent भाग [ZIP 316](https://zips.z.cash/zip-0316) के तहत वैकल्पिक है। zingo-cli में, `$Z --offline parse_viewkey uview1...` दिखाता है कि key किन pools को cover करती है।
- **आपको किसने भुगतान किया।** Shielded payments में प्रेषक का पता नहीं होता। जब तक प्रेषक ने उसे memo में न लिखा हो, वह कहीं नहीं है।
- **कुछ outgoing विवरण।** Shielded sends के destination address, राशि और memo key से decrypt करके पुनर्प्राप्त किए जाते हैं। कोई wallet ऐसा लेनदेन बना सकता है जिसमें यह संभव न हो, हालाँकि अधिकांश ऐसा नहीं करते।

## अन्य tools

| Tool | आपको क्या मिलता है |
|---|---|
| ZODL | तारीखों, राशियों, शुल्क और एक tag वाली tax CSV। केवल पिछला कैलेंडर वर्ष; shielding transactions छोड़ता है; txid, memo या पता नहीं। |
| Zkool app | account menu से raw table exports |
| [Zenith](https://code.vergara.tech/Vergara_Tech/zenith) | `importvk` के साथ UFVK import करता है। RPC पर `listreceived` txid और memo सहित प्राप्त notes लौटाता है, लेकिन sends और शुल्क नहीं। |
| [Zallet](https://github.com/zcash/zallet) | `z_listtransactions` विस्तृत है लेकिन experimental चिह्नित है, और Zallet केवल Sapling viewing keys import करता है, UFVKs नहीं |
| [zcash-devtool](https://github.com/zcash/zcash-devtool) | `wallet init-fvk` के साथ UFVK import करता है, फिर `wallet list-tx`। इसके CSV mode में txid या पता नहीं है, और project कहता है कि इसे production में उपयोग न करें। |

## संबंधित

- [Viewing Keys](/zcash-tech/viewing-keys)
- [Recovering Funds](/using-zcash/recovering-funds)
- [Zingolib and Zaino Tutorial](/guides/zingolib-and-zaino-tutorial)
- [Forum: UFVK/seed से transaction history को JSON/CSV में निर्यात करना](https://forum.zcashcommunity.com/t/exporting-transaction-history-to-json-csv-from-ufvk-seed/54662)
- [Forum: Zkool & GraphQL](https://forum.zcashcommunity.com/t/zkool-graphql/54100)
- [zingo-cli README](https://github.com/zingolabs/zingolib/blob/zingolib_v6.0.0/zingo-cli/README.md)
