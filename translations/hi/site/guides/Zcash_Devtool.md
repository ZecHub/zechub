# Zcash Devtool

[zcash-devtool क्या है?](https://github.com/zcash/zcash-devtool?tab=readme-ov-file) 

Zcash Devtool, Zcash पर प्रयोग करने और नई चीज़ें बनाने का एक प्लेटफ़ॉर्म है। इसे डेवलपर (developer) ने डेवलपर के लिए बनाया है। इसका उद्देश्य नई Zcash कार्यक्षमता की टेस्टिंग और डेवलपमेंट है। इसे प्रोडक्शन के लिए तैयार नहीं मानना चाहिए। यह उपकरण जो कमांड लाइन API देता है, वह किसी भी समय और बिना किसी चेतावनी के बदल सकता है, और बदलेगा भी। zcash-devtool के एम्बेडेड वॉलेट (wallet) के प्रबंधन में बड़ी धनराशि न लगाएँ।

### Zcash Devtool का वीडियो ट्यूटोरियल:
Kris Nuttycombe (@nuttycom) ने ZconVI के दौरान इस उपकरण (tool) को प्रस्तुत किया था।

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/5gvQF5oFT8E"
    title="zcash-devtool: the Zcash development multitool with Kris Nuttycombe - ZconVI"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


---

इन उपकरणों का उपयोग शुरू करने की चरण-दर-चरण गाइड के लिए [यह वॉकथ्रू](https://github.com/zcash/zcash-devtool/blob/main/doc/walkthrough.md) देखें। इसमें zcash devtool के उपकरणों को सेट अप करने और उपयोग करने की पूरी प्रक्रिया बताई गई है। यह गाइड बताती है कि सेटअप कैसे करें और इस उपकरण में अपनी कार्यक्षमता कैसे जोड़ें।

## त्वरित शुरुआत

नीचे दी गई कमांड को zcash-devtool `main` (कमिट `5a26ee8`, अगस्त 2026) पर जाँचा गया था। यह उपकरण बिना सूचना के बदलता रहता है। इसलिए अगर यहाँ लिखी कोई बात अब मेल न खाए, तो उस कमांड पर `--help` चलाएँ।

### इंस्टॉलेशन

इसकी कोई पहले से बनी बाइनरी उपलब्ध नहीं है। [Rust](https://rustup.rs) इंस्टॉल करें, फिर सोर्स से बिल्ड करें:

```bash
git clone https://github.com/zcash/zcash-devtool.git
cd zcash-devtool
cargo run --release -- --help
```

नीचे के उदाहरण बिल्ड की गई बाइनरी `target/release/zcash-devtool` को कॉल करते हैं। `cargo run --release -- ...` भी इसी तरह काम करता है।

### टेस्टनेट वॉलेट बनाना

शुरुआत टेस्टनेट पर करें। टेस्टनेट कॉइन (TAZ) का कोई मूल्य नहीं होता।

```bash
zcash-devtool wallet -w ./my-wallet init --name demo -i ./my-wallet-identity.txt -n test
zcash-devtool wallet -w ./my-wallet sync
zcash-devtool wallet -w ./my-wallet balance
```

- `-w` वॉलेट डायरेक्टरी है। यह `wallet` के बाद और सबकमांड से पहले आती है।
- `-i` एक [age](https://age-encryption.org) आइडेंटिटी फ़ाइल है। वॉलेट का मेनेमोनिक फ्रेज़ इसी के लिए एन्क्रिप्ट (encrypt) किया जाता है। अगर यह फ़ाइल मौजूद नहीं है, तो बना दी जाती है। इसे संभालकर रखें: सीड को डिक्रिप्ट करने के लिए `send`, `shield` और खर्च करने वाली अन्य कमांड को इसकी ज़रूरत होती है।
- `-n` नेटवर्क है: `test` या `main`।
- `-s` लाइट वॉलेट सर्वर चुनता है। डिफ़ॉल्ट `zecrocks` चुने गए नेटवर्क के लिए zec.rocks सर्वर से कनेक्ट करता है।
- किसी मौजूदा वॉलेट को रिस्टोर करने के लिए `init` की जगह `restore-mnemonic` का उपयोग करें। यह आपसे फ्रेज़ माँगता है।

`balance` हर पूल (pool) को अलग-अलग दिखाता है, जिसमें Ironwood भी शामिल है:

```
    Balance:   0.00000000 TAZ
     Sapling Spendable:   0.00000000 TAZ
     Orchard Spendable:   0.00000000 TAZ
    Ironwood Spendable:   0.00000000 TAZ
  Unshielded Spendable:   0.00000000 TAZ
```

वॉलेट का यूनिफ़ाइड एड्रेस (address) देखने के लिए `zcash-devtool wallet -w ./my-wallet list-addresses` चलाएँ। फिर किसी [फॉसेट](https://zechub.wiki/using-zcash/faucets) से उस पर टेस्टनेट फ़ंड भेजें।

मेननेट के लिए `init` को `-n main` दें। केवल उतनी राशि का उपयोग करें जिसे खोने का जोखिम आप उठा सकें।

### भेजना और शील्ड करना

राशियाँ zatoshis में होती हैं (1 ZEC = 100,000,000 zatoshis)।

```bash
zcash-devtool wallet -w ./my-wallet send -i ./my-wallet-identity.txt \
  --address <recipient address> --value 100000 --memo "hello"
zcash-devtool wallet -w ./my-wallet shield -i ./my-wallet-identity.txt
```

`propose` वह लेनदेन (transaction) दिखाता है जो `send` बनाएगा, लेकिन उसे भेजता नहीं है। `list-tx` और `list-unspent` वॉलेट का इतिहास और नोट (note) दिखाते हैं।

सर्वर से संपर्क करने वाली हर कमांड `--connection tor` भी स्वीकार करती है। इससे कनेक्शन बिल्ट-इन Tor क्लाइंट के ज़रिए जाता है।

### एड्रेस, कुंजियों और लेनदेन की जाँच

`inspect` Zcash डेटा को ऑफ़लाइन डिकोड करता है: एड्रेस, कुंजियाँ और रॉ लेनदेन। चेन (chain) से अधिक जानकारी पाने के लिए `--lookup` जोड़ें, जैसे ID के आधार पर कोई लेनदेन।

```
$ zcash-devtool inspect utest1h55y5z...
Zcash address
 - Network: testnet
 - Kind: Unified Address
 - Receivers:
   - Orchard (...)
   - Sapling (...)
   - Transparent P2PKH (...)
```

Ironwood नोट यूनिफ़ाइड एड्रेस के उसी Orchard रिसीवर को भेजे जाते हैं, इसलिए NU6.3 के साथ एड्रेस नहीं बदले।

### PCZT के साथ चरणों में लेनदेन बनाना

PCZT (आंशिक रूप से बनाया गया Zcash लेनदेन) लेनदेन बनाने की प्रक्रिया को अलग-अलग चरणों में बाँटता है: बनाना, प्रूव करना, साइन करना और भेजना। हर चरण अलग मशीन पर चल सकता है, जैसे Keystone जैसे हार्डवेयर साइनर के साथ। हर `pczt` कमांड PCZT को किसी फ़ाइल या stdin से पढ़ती है और उसे किसी फ़ाइल (`--output`) या stdout में लिखती है। इसलिए चरणों को पाइप किया जा सकता है:

```bash
zcash-devtool pczt -w ./my-wallet create --address <recipient address> --value 100000 \
  | zcash-devtool pczt -w ./my-wallet prove -i ./my-wallet-identity.txt \
  | zcash-devtool pczt -w ./my-wallet sign -i ./my-wallet-identity.txt \
  | zcash-devtool pczt -w ./my-wallet send
```

`zcash-devtool pczt --help` बाकी चरणों की सूची दिखाता है, जिनमें `inspect`, `redact`, `combine`, `extract` और `shield` शामिल हैं।

### Orchard से Ironwood में फ़ंड ले जाना

NU6.3 से Orchard फ़ंड केवल वॉलेट के अपने एड्रेस पर ही भेजे जा सकते हैं। `migration` कमांड उन्हें Ironwood में ले जाती हैं:

```bash
zcash-devtool migration -w ./my-wallet plan
zcash-devtool migration -w ./my-wallet commit -i ./my-wallet-identity.txt
zcash-devtool migration -w ./my-wallet status
zcash-devtool migration -w ./my-wallet advance
```

- `plan` नोट के विभाजन और ट्रांसफ़र शेड्यूल का पूर्वावलोकन दिखाता है और कुछ भी नहीं बदलता।
- `commit` तैयारी के शुरुआती लेनदेन बनाता है और उन्हें पहले से साइन करता है। Keystone जैसे बाहरी साइनर के लिए उन्हें बिना साइन किए छोड़ने हेतु `--external` जोड़ें।
- `status` माइग्रेशन की प्रगति और अगला चरण दिखाता है।
- `advance` अगला वह लेनदेन प्रूव करता है जिसका एंकर तैयार है।

माइग्रेशन कमांड अभी बनाई जा रही हैं। `advance` उस पहले लेनदेन पर रुक जाता है जो ब्रॉडकास्ट के लिए तैयार है, क्योंकि इस उपकरण में ब्रॉडकास्ट की सुविधा अभी लागू नहीं हुई है। रोज़मर्रा के उपयोग के लिए ऐसे वॉलेट से फ़ंड ले जाएँ जो Ironwood को सपोर्ट करता हो। [शील्डेड पूल](https://zechub.wiki/using-zcash/shielded-pools) देखें।


**सुरक्षा चेतावनियाँ:**
इसे प्रोडक्शन में उपयोग न करें!!!
यह ऐप सुरक्षा को ध्यान में रखकर नहीं लिखा गया है। फिर भी इसमें मेनेमोनिक सीड फ्रेज़ (seed phrase) के एन्क्रिप्शन (encryption) जैसी सुविधाएँ हैं। इनकी वजह से इसे अपने जोखिम पर छोटे स्तर के प्रयोगों के लिए उपयोग किया जा सकता है।

### एडवांस्ड (librustzcash ट्यूटोरियल)


[वीडियो यहाँ देखें](https://free2z.cash/uploadz/public/ZcashTutorial/librustzcash-a-rust-crates.mp4)
