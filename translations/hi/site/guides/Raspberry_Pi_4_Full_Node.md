# Raspberry Pi 4 पर फुल नोड चलाना (Zebra + Zallet)

*यह गाइड मूल zcashd-आधारित गाइड से माइग्रेट की गई है। zcashd 18 जुलाई 2026 को अपने स्वचालित समर्थन-समाप्ति (End-of-Support) पड़ाव पर पहुँच गया, इसलिए यह गाइड अब **Zebra** (वर्तमान फुल नोड, जिसका रखरखाव Zcash Foundation करता है) और **Zallet** (zcashd के अंतर्निहित वॉलेट को बदलने के लिए बनाया गया वॉलेट) का उपयोग करती है।*

## आप क्या सीखेंगे
- हेडलेस (headless) उपयोग के लिए Raspberry Pi 4 पर Ubuntu Server 22.04+ (64-बिट) को फ़्लैश और कॉन्फ़िगर करने का तरीका
- Zebra को Docker या प्री-बिल्ट बाइनरी के माध्यम से इंस्टॉल करने और चलाने का तरीका
- वॉलेट एन्क्रिप्शन सेटअप सहित Zallet को इंस्टॉल, कॉन्फ़िगर और इनिशियलाइज़ करने का तरीका
- वैकल्पिक रूप से किसी मौजूदा zcashd कॉन्फ़िग/वॉलेट को Zallet में माइग्रेट करने का तरीका

## पुरानी गाइड से क्या बदला है
इस गाइड के पिछले संस्करण में Pi 4 पर **zcashd** को नेटिव रूप से कंपाइल करने की प्रक्रिया बताई गई थी। यह सिंगल-थ्रेडेड कंपाइल 3–4 घंटे लेता था, क्योंकि Pi 4 में पैरेलल (`-j$(nproc)`) बिल्ड के लिए पर्याप्त मेमोरी नहीं होती। Zebra और Zallet दोनों अब **आधिकारिक प्री-बिल्ट ARM64 बाइनरी और Docker इमेज** उपलब्ध कराते हैं, इसलिए अधिकांश मामलों में आपको Pi पर ही सोर्स से कुछ भी कंपाइल करने की आवश्यकता नहीं रहती।

## पूर्वापेक्षाएँ
- एक Raspberry Pi 4 (4 GB RAM या अधिक की अनुशंसा की जाती है)
- OS के लिए एक microSD कार्ड (32 GB+)
- USB 3.0 सपोर्ट वाली एक बाहरी SSD/HDD — **Zebra को कैश किए गए Mainnet डेटा के लिए लगभग 300 GB की आवश्यकता होती है**, जो समय के साथ बढ़ता जाता है, इसलिए इसे केवल microSD कार्ड से चलाने का प्रयास न करें
- microSD कार्ड स्लॉट वाला एक कंप्यूटर (OS इमेज फ़्लैश करने के लिए)
- वायर्ड ईथरनेट कनेक्शन या Wi-Fi
- SSH पर कमांड लाइन के उपयोग की बुनियादी जानकारी

## चरण 1: Ubuntu Server 22.04+ (64-बिट) फ़्लैश करें
Zebra और Zallet की प्री-बिल्ट बाइनरी और Docker इमेज के लिए **glibc 2.34+** आवश्यक है, जिसका अर्थ है **Ubuntu Server 22.04 या नया (64-बिट/aarch64)**।

1. अपने मुख्य कंप्यूटर पर Raspberry Pi Imager इंस्टॉल करें।
2. अपना microSD कार्ड डालें।
3. **Other general-purpose OS → Ubuntu → Ubuntu Server 22.04 LTS (64-bit)** (या नया) चुनें।
4. हेडलेस पहले बूट के लिए Imager के उन्नत विकल्पों (गियर आइकन) का उपयोग करके hostname पहले से कॉन्फ़िगर करें, SSH सक्षम करें, और आवश्यकता हो तो Wi-Fi क्रेडेंशियल सेट करें।
5. इमेज लिखें, कार्ड डालें और Pi को चालू करें।
6. SSH से लॉग इन करें: `ssh <username>@<pi-hostname-or-ip>`

## चरण 2: बाहरी स्टोरेज जोड़ें और माउंट करें
1. अपनी बाहरी SSD/HDD को USB 3.0 के माध्यम से कनेक्ट करें।
2. डिवाइस की पहचान करें: `lsblk`
3. उसे फ़ॉर्मेट करें (यदि नई है) और माउंट करें, उदाहरण के लिए `/mnt/zcash-data` पर, एक मानक `mkfs`/`fstab` सेटअप के साथ ताकि रीबूट पर वह अपने आप माउंट हो जाए।

## चरण 3: सिस्टम अपडेट करें
```bash
sudo apt update && sudo apt full-upgrade -y
sudo reboot
```

## चरण 4: Zebra इंस्टॉल करें और चलाएँ
### विकल्प A — Docker (अनुशंसित)
```bash
sudo apt install -y docker.io
sudo usermod -aG docker $USER   # log out/in after this
docker run -d \
  --name zebra \
  -p 8233:8233 \
  -v /mnt/zcash-data/zebra:/home/zebra/.cache/zebra \
  zfnd/zebra:latest
```
प्रगति जाँचें: `docker logs -f zebra`

### विकल्प B — cargo binstall के माध्यम से प्री-बिल्ट बाइनरी
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source "$HOME/.cargo/env"
cargo install cargo-binstall
cargo binstall zebrad
zebrad start
```
यह एक प्री-बिल्ट `aarch64` बाइनरी इंस्टॉल करता है — किसी कंपाइलिंग की आवश्यकता नहीं।

**सिंक समय के बारे में:** इसमें काफ़ी समय लगने की अपेक्षा रखें — पहले सिंक के लिए आमतौर पर बताए जाने वाले आँकड़े (लगभग 2 घंटे) ऐसे रेफ़रेंस हार्डवेयर से आते हैं जो Pi 4 के CPU से अधिक शक्तिशाली है, इसलिए वास्तविक Pi 4 हार्डवेयर पर आपका सिंक समय संभवतः अधिक होगा।

## चरण 5: Zallet इंस्टॉल करें
Zallet अभी **अल्फ़ा** चरण में है — ब्रेकिंग बदलावों की अपेक्षा रखें, और अभी इसे बड़ी राशि के लिए प्रोडक्शन-योग्य कस्टडी न मानें।

### विकल्प A — Docker (अनुशंसित)
```bash
docker pull zodlinc/zallet:latest
```
यह इमेज ARM64 को सपोर्ट करती है (Nix-आधारित बिल्ड के माध्यम से) और एक न्यूनतम, शेल-रहित फ़ाइलसिस्टम से चलती है — कॉन्फ़िगरेशन और डेटा पाथ को `--datadir` और वॉल्यूम माउंट के माध्यम से स्पष्ट रूप से पास करें (चरण 6 देखें)।

### विकल्प B — सोर्स से बिल्ड करें
```bash
# Requires Rust 1.85+ (see Step 4B for rustup install)
sudo apt install -y clang libclang-dev protobuf-compiler
cargo install --locked --git https://github.com/zcash/wallet.git
```
अल्फ़ा चरण के दौरान Zallet के crates अभी crates.io पर प्रकाशित नहीं किए गए हैं, इसलिए सीधे git रिपॉज़िटरी से इंस्टॉल करना ही समर्थित गैर-Docker तरीका है।

## चरण 6: Zallet कॉन्फ़िगर करें
अपनी चुनी हुई datadir (उदाहरण के लिए `/mnt/zcash-data/zallet`) में `zallet.toml` बनाएँ:
```toml
[builder.limits]
[consensus]
network = "main"
[database]
[external]
[features]
as_of_version = "0.0.0"
[features.deprecated]
[features.experimental]
[indexer]
validator_address = "127.0.0.1:8232"   # Zebra's JSON-RPC endpoint
[keystore]
[note_management]
[rpc]
bind = ["127.0.0.1:SOMEPORT"]
```
यदि Zebra किसी अलग होस्ट/पोर्ट पर चलता है तो `validator_address` को समायोजित करें, और अपने Zebra RPC ऑथ सेटअप से मेल खाने के लिए `[indexer]` के अंतर्गत `validator_cookie_auth`/`validator_user`/`validator_password` कॉन्फ़िगर करें।

**क्या आप zcashd से माइग्रेट कर रहे हैं?** यदि आपके पास अभी भी पुराना `zcash.conf` है:
```bash
zallet migrate-zcash-conf --datadir /path/to/old/zcashd/datadir -o /mnt/zcash-data/zallet/zallet.toml
```

## चरण 7: वॉलेट एन्क्रिप्शन सेट करें
Zallet सभी कुंजी सामग्री को `age`/`rage` का उपयोग करके एन्क्रिप्ट करता है:
```bash
cargo install rage
rage -p -o /mnt/zcash-data/zallet/encryption-identity.txt <(rage-keygen)
```
यह एक पब्लिक की और एक स्वचालित रूप से जनरेट किया गया पासफ़्रेज़ प्रिंट करता है — **पासफ़्रेज़ सहेज लें; इसके बिना आप आइडेंटिटी फ़ाइल को रिकवर नहीं कर सकते।**

## चरण 8: वॉलेट को इनिशियलाइज़ करें और शुरू करें
```bash
zallet -d /mnt/zcash-data/zallet init-wallet-encryption
zallet -d /mnt/zcash-data/zallet generate-mnemonic
```
**`generate-mnemonic` को केवल एक बार चलाएँ**, जब तक कि आप जानबूझकर कई स्वतंत्र स्पेंडिंग रूट न चाहते हों।

```bash
zallet -d /mnt/zcash-data/zallet start
```

## चरण 9: मौजूदा zcashd वॉलेट का माइग्रेशन (वैकल्पिक)
```bash
zallet -d /mnt/zcash-data/zallet migrate-zcashd-wallet --zcashd-datadir /path/to/old/zcashd/datadir
```
इसके लिए `db_dump` यूटिलिटी (Berkeley DB 6.2.23 के साथ बिल्ड की गई) आवश्यक है — जो सिस्टम इंस्टॉल से या zcashd के स्थानीय सोर्स-बिल्ड से मिल सकती है। यदि अब आपके पास zcashd इंस्टॉल नहीं है, तो यह माइग्रेशन का एकमात्र चरण है जो अभी Zallet में पूरी तरह आत्मनिर्भर नहीं है।

## चरण 10: सत्यापित करें कि सब कुछ काम कर रहा है
```bash
zallet -d /mnt/zcash-data/zallet help
```
पुष्टि करें कि वॉलेट प्रतिक्रिया देता है, और Zebra का सिंक पूरा होने के बाद यह जाँचें कि बैलेंस/एड्रेस अपेक्षाओं से मेल खाते हैं।

## समस्या निवारण
- **ARM पर Zebra बिल्ड/रनटाइम समस्याएँ:** यदि आप सोर्स से बिल्ड कर रहे हैं, तो Rust ARM टूलचेन इंस्टॉल करें — Zebra के अपने दस्तावेज़ों के अनुसार, ARM हार्डवेयर पर x86_64 बिल्ड टूल चलाने से गति काफ़ी धीमी हो जाती है।
- **स्टोरेज भर जाना:** Zebra का ~300 GB का आकार लगातार बढ़ता रहता है — अतिरिक्त जगह की योजना बनाएँ।
- **Docker अनुमति त्रुटियाँ:** अपने यूज़र को `docker` समूह में जोड़ने के बाद लॉग आउट करके फिर से लॉग इन करें, या तब तक `sudo` का उपयोग करें।
- **Zallet कंटेनर में कोई शेल नहीं है:** आधिकारिक `zodlinc/zallet` इमेज डिज़ाइन के अनुसार from-scratch है — हमेशा `--datadir` को स्पष्ट रूप से पास करें और अपनी डेटा डायरेक्टरी को वॉल्यूम के रूप में माउंट करें।

## पुरानी zcashd गाइड की तुलना में हार्डवेयर संबंधी नोट
सेटअप के दौरान Zebra और Zallet आमतौर पर CPU पर उतना भार नहीं डालते जितना zcashd को कंपाइल करने में पड़ता था, क्योंकि आप प्री-बिल्ट बाइनरी/कंटेनर चला रहे होते हैं। 4 GB RAM एक उचित शुरुआती बिंदु है; `htop` से निगरानी करें, और यदि आपको भारी स्वैपिंग दिखाई दे तो 8 GB वाले Pi 4 संस्करण पर विचार करें।

## अतिरिक्त संसाधन
- [Zebra बुक](https://zebra.zfnd.org) — आधिकारिक Zebra दस्तावेज़
- [Zallet बुक](https://zcash.github.io/zallet/) — आधिकारिक Zallet दस्तावेज़
- [zcashd समर्थन-समाप्ति सूचना](https://z.cash/support/zcashd-deprecation)

---

*यदि यह गाइड आपको उपयोगी लगी हो, तो ZecHub का समर्थन करने पर विचार करें: [zechub.wiki/donation से वर्तमान ZecHub दान शील्डेड एड्रेस डालें — इसे यहाँ शामिल नहीं किया गया है क्योंकि मैं यह सत्यापित नहीं कर सका कि यह अभी भी मान्य है]।*
