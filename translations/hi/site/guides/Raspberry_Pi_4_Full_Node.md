# Raspberry Pi 4 पर एक फुल नोड चलाएँ (Zebra + Zallet)

*मूल zcashd-आधारित गाइड से माइग्रेट किया गया। zcashd 18 जुलाई 2026 को अपने स्वचालित End-of-Support halt तक पहुँच गया, इसलिए यह गाइड अब **Zebra** (वर्तमान फुल नोड, जिसे Zcash Foundation मेंटेन करती है) और **Zallet** (वॉलेट जिसे zcashd के built-in वॉलेट को प्रतिस्थापित करने के लिए बनाया गया है) का उपयोग करती है।*

## आप क्या सीखेंगे
- हेडलेस उपयोग के लिए Raspberry Pi 4 पर Ubuntu Server 22.04+ (64-bit) को कैसे flash और configure करें
- Zebra को कैसे install और run करें, चाहे Docker के जरिए या pre-built binary के जरिए
- Zallet को कैसे install, configure, और initialize करें, जिसमें wallet encryption setup शामिल है
- मौजूदा zcashd config/wallet को वैकल्पिक रूप से Zallet में कैसे migrate करें

## पुरानी गाइड से क्या बदला
इस गाइड का पिछला संस्करण Pi 4 पर **zcashd** को native रूप से compile करने की प्रक्रिया बताता था — एक single-threaded compile जिसमें 3–4 घंटे लगते थे क्योंकि parallel (`-j$(nproc)`) build के लिए Pi 4 में पर्याप्त memory नहीं है। अब Zebra और Zallet दोनों **official pre-built ARM64 binaries और Docker images** के साथ आते हैं, इसलिए अधिकांश मामलों में अब आपको Pi पर source से कुछ भी compile करने की ज़रूरत नहीं है।

## आवश्यकताएँ
- एक Raspberry Pi 4 (4 GB RAM या अधिक recommended)
- OS के लिए एक microSD card (32 GB+)
- USB 3.0 support वाला एक external SSD/HDD — **Zebra को cached Mainnet data के लिए लगभग 300 GB चाहिए**, और यह समय के साथ बढ़ता है, इसलिए इसे केवल microSD card पर चलाने की कोशिश न करें
- microSD card slot वाला एक कंप्यूटर (OS image flash करने के लिए)
- एक wired Ethernet connection या Wi-Fi
- SSH के जरिए command line का बुनियादी अनुभव

## चरण 1: Ubuntu Server 22.04+ (64-bit) flash करें
Zebra और Zallet की pre-built binaries और Docker images को **glibc 2.34+** चाहिए, जिसका मतलब है **Ubuntu Server 22.04 या नया (64-bit/aarch64)**।

1. अपने मुख्य कंप्यूटर पर Raspberry Pi Imager install करें।
2. अपना microSD card डालें।
3. **Other general-purpose OS → Ubuntu → Ubuntu Server 22.04 LTS (64-bit)** (या नया) चुनें।
4. पहली बार हेडलेस boot के लिए Imager के advanced options (gear icon) का उपयोग करके hostname pre-configure करें, SSH enable करें, और ज़रूरत होने पर Wi-Fi credentials सेट करें।
5. image लिखें, card डालें, और Pi को power on करें।
6. SSH से लॉग इन करें: `ssh <username>@<pi-hostname-or-ip>`

## चरण 2: external storage attach और mount करें
1. अपने external SSD/HDD को USB 3.0 के जरिए कनेक्ट करें।
2. device पहचानें: `lsblk`
3. (यदि नया हो तो) उसे format करें और mount करें, उदाहरण के लिए `/mnt/zcash-data` पर, एक standard `mkfs`/`fstab` setup के साथ ताकि reboot पर यह अपने-आप mount हो जाए।

## चरण 3: system update करें
```bash
sudo apt update && sudo apt full-upgrade -y
sudo reboot
```

## चरण 4: Zebra install और run करें
### विकल्प A — Docker (recommended)
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

### विकल्प B — cargo binstall के जरिए pre-built binary
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source "$HOME/.cargo/env"
cargo install cargo-binstall
cargo binstall zebrad
zebrad start
```
यह एक pre-built `aarch64` binary install करता है — compile करने की आवश्यकता नहीं।

**sync time के बारे में:** इसमें कुछ समय लगने की अपेक्षा करें — आमतौर पर उद्धृत first-sync आंकड़े (लगभग 2 घंटे) ऐसे reference hardware से आते हैं जो Pi 4 के CPU से अधिक शक्तिशाली है, इसलिए वास्तविक Pi 4 hardware पर आपका actual sync time संभवतः इससे अधिक होगा।

## चरण 5: Zallet install करें
Zallet वर्तमान में **alpha** में है — breaking changes की अपेक्षा रखें, और अभी इसे significant funds के लिए production-ready custody न मानें।

### विकल्प A — Docker (recommended)
```bash
docker pull zodlinc/zallet:latest
```
यह image ARM64 support करती है (Nix-based build के जरिए) और एक minimal, shell-less filesystem से चलती है — configuration और data paths को `--datadir` और volume mounts के जरिए स्पष्ट रूप से पास करें (चरण 6 देखें)।

### विकल्प B — source से build करें
```bash
# Requires Rust 1.85+ (see Step 4B for rustup install)
sudo apt install -y clang libclang-dev protobuf-compiler
cargo install --locked --git https://github.com/zcash/wallet.git
```
alpha phase के दौरान Zallet के crates अभी crates.io पर publish नहीं हुए हैं, इसलिए सीधे git repo से install करना supported non-Docker method है।

## चरण 6: Zallet configure करें
अपने चुने हुए datadir में `zallet.toml` बनाएँ (उदाहरण के लिए `/mnt/zcash-data/zallet`):
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
यदि Zebra किसी अलग host/port पर चल रहा है तो `validator_address` को adjust करें, और अपने Zebra RPC auth setup के अनुसार `[indexer]` के तहत `validator_cookie_auth`/`validator_user`/`validator_password` configure करें।

**zcashd से migrate कर रहे हैं?** यदि आपके पास अभी भी पुराना `zcash.conf` है:
```bash
zallet migrate-zcash-conf --datadir /path/to/old/zcashd/datadir -o /mnt/zcash-data/zallet/zallet.toml
```

## चरण 7: wallet encryption सेट करें
Zallet `age`/`rage` का उपयोग करके सभी key material को encrypt करता है:
```bash
cargo install rage
rage -p -o /mnt/zcash-data/zallet/encryption-identity.txt <(rage-keygen)
```
यह एक public key और एक autogenerated passphrase प्रिंट करता है — **passphrase को सुरक्षित रखें; इसके बिना आप identity file recover नहीं कर सकते।**

## चरण 8: wallet initialize और start करें
```bash
zallet -d /mnt/zcash-data/zallet init-wallet-encryption
zallet -d /mnt/zcash-data/zallet generate-mnemonic
```
**`generate-mnemonic` केवल एक बार चलाएँ** जब तक कि आप जानबूझकर कई स्वतंत्र spending roots न चाहते हों।

```bash
zallet -d /mnt/zcash-data/zallet start
```

## चरण 9: मौजूदा zcashd wallet migrate करना (वैकल्पिक)
```bash
zallet -d /mnt/zcash-data/zallet migrate-zcashd-wallet --zcashd-datadir /path/to/old/zcashd/datadir
```
इसके लिए `db_dump` utility चाहिए (Berkeley DB 6.2.23 के against built) — या तो system install से, या zcashd के local source-build से। यदि आपके पास अब zcashd install नहीं है, तो migration का यही एक चरण है जो अभी तक Zallet में पूरी तरह self-contained नहीं है।

## चरण 10: verify करें कि सब कुछ काम कर रहा है
```bash
zallet -d /mnt/zcash-data/zallet help
```
पुष्टि करें कि wallet response दे रहा है, और जब Zebra syncing पूरी कर ले, तब balances/addresses अपेक्षा के अनुसार हैं।

## समस्या निवारण
- **ARM पर Zebra build/runtime issues:** यदि source से build कर रहे हैं, तो Rust ARM toolchain install करें — ARM hardware पर x86_64 build tools चलाने से गति स्पष्ट रूप से धीमी होगी, जैसा कि Zebra के अपने documentation में बताया गया है।
- **Storage भर रही है:** Zebra का ~300 GB footprint लगातार बढ़ता रहेगा — पर्याप्त headroom की योजना बनाएँ।
- **Docker permission errors:** अपने user को `docker` group में जोड़ने के बाद log out/back in करें, या फिलहाल `sudo` का उपयोग करें।
- **Zallet container में shell नहीं है:** official `zodlinc/zallet` image design के अनुसार from-scratch है — हमेशा `--datadir` को explicitly पास करें और अपनी data directory को volume के रूप में mount करें।

## पुराने zcashd guide की तुलना में hardware notes
Zebra और Zallet setup के दौरान CPU पर आम तौर पर zcashd compile करने की तुलना में हल्के हैं, क्योंकि आप pre-built binaries/containers चला रहे हैं। 4 GB RAM एक उचित शुरुआती बिंदु है; `htop` से monitor करें और यदि भारी swapping दिखे तो 8 GB Pi 4 variant पर विचार करें।

## अतिरिक्त संसाधन
- [Zebra Book](https://zebra.zfnd.org) — official Zebra documentation
- [Zallet Book](https://zcash.github.io/wallet) — official Zallet documentation
- [zcashd End-of-Support notice](https://z.cash/support/zcashd-deprecation)

---

*यदि आपको यह गाइड उपयोगी लगी हो, तो ZecHub को support करने पर विचार करें: [zechub.wiki/donation से current ZecHub donation shielded address यहाँ डालें — यहाँ शामिल नहीं किया गया क्योंकि मैं सत्यापित नहीं कर सका कि यह अभी भी current है]।*
