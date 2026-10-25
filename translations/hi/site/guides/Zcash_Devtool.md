# Zcash Devtool

[zcash-devtool क्या है?](https://github.com/zcash/zcash-devtool?tab=readme-ov-file) 

Zcash Devtool, Zcash पर हैकिंग के लिए एक प्लेटफ़ॉर्म है। इसे डेवलपर्स ने डेवलपर्स के लिए, नई Zcash कार्यक्षमता के परीक्षण और विकास हेतु बनाया है; और इसे प्रोडक्शन-रेडी नहीं माना जाना चाहिए। इस टूल द्वारा प्रस्तुत कमांड लाइन API कभी भी और बिना किसी चेतावनी के बदल सकती है और बदलेगी। zcash-devtool एम्बेडेड wallet के प्रबंधन में महत्वपूर्ण धनराशि न लगाएँ।

### Zcash Devtool का वीडियो ट्यूटोरियल:
Kris Nuttycombe (@nuttycom) ने ZconVI के दौरान इस टूल को प्रस्तुत किया।

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

इन टूल्स का उपयोग शुरू करने के लिए चरण-दर-चरण मार्गदर्शिका हेतु [यह walkthrough](https://github.com/zcash/zcash-devtool/blob/main/doc/walkthrough.md) देखें। इसमें zcash devtool tooling को सेट अप करने और उपयोग करने की पूर्ण walkthrough दी गई है। इसका उद्देश्य सेटअप करने और टूल में अपनी कार्यक्षमता जोड़ने की विधि के लिए मार्गदर्शिका के रूप में काम करना है।

## त्वरित शुरुआत

नीचे दिए गए कमांड zcash-devtool `main` (commit `5a26ee8`, अगस्त 2026) के विरुद्ध जाँचे गए थे। टूल बिना सूचना के बदलता है, इसलिए यदि यहाँ कुछ अब मेल नहीं खाता हो तो किसी भी कमांड पर `--help` चलाएँ।

### इंस्टॉल करें

कोई prebuilt binaries उपलब्ध नहीं हैं। [Rust](https://rustup.rs) इंस्टॉल करें, फिर स्रोत से build करें:

```bash
git clone https://github.com/zcash/zcash-devtool.git
cd zcash-devtool
cargo run --release -- --help
```

नीचे के उदाहरण built binary, `target/release/zcash-devtool`, को कॉल करते हैं। `cargo run --release -- ...` भी इसी तरह काम करता है।

### एक testnet wallet बनाएँ

testnet पर शुरू करें। Testnet coins (TAZ) का कोई मूल्य नहीं होता।

```bash
zcash-devtool wallet -w ./my-wallet init --name demo -i ./my-wallet-identity.txt -n test
zcash-devtool wallet -w ./my-wallet sync
zcash-devtool wallet -w ./my-wallet balance
```

- `-w` wallet directory है। यह `wallet` के बाद और subcommand से पहले आता है।
- `-i` एक [age](https://age-encryption.org) identity file है। Wallet का mnemonic phrase इसमें एन्क्रिप्ट होता है, और यदि फ़ाइल मौजूद नहीं है तो बनाई जाती है। इसे संभालकर रखें: `send`, `shield` और अन्य spending commands को seed डिक्रिप्ट करने के लिए इसकी आवश्यकता होती है।
- `-n` network है: `test` या `main`।
- `-s` light wallet server चुनता है। डिफ़ॉल्ट, `zecrocks`, चुने गए network के लिए zec.rocks server से जुड़ता है।
- मौजूदा wallet पुनर्स्थापित करने के लिए `init` के स्थान पर `restore-mnemonic` का उपयोग करें। यह phrase के लिए पूछता है।

`balance`, Ironwood सहित, प्रत्येक pool को अलग-अलग सूचीबद्ध करता है:

```
    Balance:   0.00000000 TAZ
     Sapling Spendable:   0.00000000 TAZ
     Orchard Spendable:   0.00000000 TAZ
    Ironwood Spendable:   0.00000000 TAZ
  Unshielded Spendable:   0.00000000 TAZ
```

Wallet का unified address देखने के लिए `zcash-devtool wallet -w ./my-wallet list-addresses` चलाएँ, और उसे [faucet](https://zechub.wiki/using-zcash/faucets) से testnet funds भेजें।

mainnet के लिए `init` को `-n main` पास करें। केवल उतनी राशि का उपयोग करें जिसे खोने का जोखिम आप उठा सकते हैं।

### भेजें और shield करें

राशियाँ zatoshis में हैं (1 ZEC = 100,000,000 zatoshis)।

```bash
zcash-devtool wallet -w ./my-wallet send -i ./my-wallet-identity.txt \
  --address <recipient address> --value 100000 --memo "hello"
zcash-devtool wallet -w ./my-wallet shield -i ./my-wallet-identity.txt
```

`propose` वह transaction दिखाता है जिसे `send` बिना भेजे बनाएगा। `list-tx` और `list-unspent` wallet का इतिहास और notes दिखाते हैं।

कोई भी command जो server से बात करती है, `--connection tor` भी स्वीकार करती है, जो कनेक्शन को अंतर्निहित Tor client के माध्यम से रूट करता है।

### addresses, keys और transactions का निरीक्षण करें

`inspect`, Zcash डेटा को offline डिकोड करता है: addresses, keys और raw transactions। Chain से अधिक जानकारी प्राप्त करने के लिए `--lookup` जोड़ें, जैसे कि ID द्वारा transaction।

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

Ironwood notes एक unified address में उसी Orchard receiver को भेजे जाते हैं, इसलिए NU6.3 के साथ addresses नहीं बदले।

### PCZTs के साथ चरणों में transactions बनाएँ

एक PCZT (आंशिक रूप से निर्मित Zcash transaction) transaction बनाने को अलग-अलग चरणों में विभाजित करता है: create, prove, sign और send। प्रत्येक चरण अलग मशीन पर चल सकता है, उदाहरण के लिए Keystone जैसे hardware signer के साथ। प्रत्येक `pczt` command किसी फ़ाइल या stdin से PCZT पढ़ता है और उसे फ़ाइल (`--output`) या stdout में लिखता है, इसलिए चरणों को pipe किया जा सकता है:

```bash
zcash-devtool pczt -w ./my-wallet create --address <recipient address> --value 100000 \
  | zcash-devtool pczt -w ./my-wallet prove -i ./my-wallet-identity.txt \
  | zcash-devtool pczt -w ./my-wallet sign -i ./my-wallet-identity.txt \
  | zcash-devtool pczt -w ./my-wallet send
```

`zcash-devtool pczt --help` अन्य चरणों को सूचीबद्ध करता है, जिनमें `inspect`, `redact`, `combine`, `extract` और `shield` शामिल हैं।

### funds को Orchard से Ironwood में स्थानांतरित करें

NU6.3 के बाद से, Orchard funds केवल wallet के अपने addresses पर ही स्थानांतरित किए जा सकते हैं। `migration` commands उन्हें Ironwood में स्थानांतरित करते हैं:

```bash
zcash-devtool migration -w ./my-wallet plan
zcash-devtool migration -w ./my-wallet commit -i ./my-wallet-identity.txt
zcash-devtool migration -w ./my-wallet status
zcash-devtool migration -w ./my-wallet advance
```

- `plan` note splits और transfer schedule का पूर्वावलोकन करता है, और कुछ नहीं बदलता।
- `commit` पहले preparation transactions बनाता और pre-sign करता है। Keystone जैसे external signer के लिए उन्हें unsigned छोड़ने हेतु `--external` जोड़ें।
- `status` migration की प्रगति और अगला चरण दिखाता है।
- `advance` उस अगले transaction को prove करता है जिसका anchor तैयार है।

Migration commands अभी भी बनाए जा रहे हैं। `advance` पहले ऐसे transaction पर रुकता है जो broadcast के लिए तैयार है, क्योंकि टूल में broadcasting अभी लागू नहीं है। दैनिक उपयोग के लिए, Ironwood का समर्थन करने वाले wallet के साथ funds स्थानांतरित करें। [Shielded Pools](https://zechub.wiki/using-zcash/shielded-pools) देखें।


**सुरक्षा चेतावनियाँ:**
इसका प्रोडक्शन में उपयोग न करें!!!
ऐप को सुरक्षा को ध्यान में रखकर नहीं लिखा गया है। हालाँकि इसमें mnemonic seed phrases का encryption जैसी सुविधाएँ हैं, जो इसे आपके अपने जोखिम पर छोटे पैमाने के प्रयोग के लिए उपयुक्त बना सकती हैं।

### उन्नत (librustzcash ट्यूटोरियल )


[वीडियो यहाँ देखें](https://free2z.cash/uploadz/public/ZcashTutorial/librustzcash-a-rust-crates.mp4)
