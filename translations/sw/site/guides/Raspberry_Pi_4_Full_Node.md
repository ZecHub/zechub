# Endesha Node Kamili kwenye Raspberry Pi 4 (Zebra + Zallet)

*Migrated from the original zcashd-based guide. zcashd reached its automatic End-of-Support halt on July 18, 2026, so this guide now uses **Zebra** (the current full node, maintained by the Zcash Foundation) and **Zallet** (the wallet built to replace zcashd's built-in wallet).*

## Mambo Utakayosoma
- Jinsi ya flash na configure Ubuntu Server 22.04+ (64-bit) juu Raspberry Pi 4 kwa ajili ya matumizi headless
- Jinsi ya kufunga na kuendesha Zebra, ama kupitia Docker au awali kujengwa binary
- Jinsi ya kufunga, configure, na initialize Zallet, ikiwa ni pamoja mkoba encryption kuanzisha
- Jinsi ya hiari kuhamia zilizopo zcashd config / mkoba katika Zallet

## Nini iliyopita kutoka mwongozo wa zamani
toleo la awali ya mwongozo huu kutembea kwa njia ya kuunganisha ** zcashd** natively juu Pi 4  single-threaded compile kwamba alichukua 3 × 4 masaa kwa sababu Pi 4 hana kumbukumbu kutosha kwa sambamba (`-j$(nproc)`Zebra na Zallet wote sasa meli ** rasmi kabla ya kujengwa ARM64 binaries na Docker picha**, hivyo katika kesi nyingi tena haja ya kukusanya kitu chochote kutoka chanzo juu Pi yenyewe.

## Mahitaji ya awali
- Raspberry Pi 4 (4 GB RAM au zaidi ilipendekeza)
- kadi microSD (32 GB +) kwa OS
- Nje SSD / HDD na USB 3.0 msaada  ** Zebra mahitaji takriban 300 GB kwa ajili ya kumbukumbu Mainnet data**, kukua baada ya muda, hivyo si kujaribu kuendesha hii mbali microSD kadi peke yake
- Kompyuta na microSD kadi yanayopangwa (kwa flash OS picha)
- Wired Ethernet uhusiano au Wi-Fi
- Msingi faraja na mstari amri juu ya SSH

## Hatua ya 1: Flash Ubuntu Server 22.04+ (64-bit)
Zebra na Zallet ya awali kujengwa binaries na Docker picha zinahitaji ** glibc 2.34 +**, ambayo ina maana ** Ubuntu Server 22.04 au mpya (64-bit / arch64) **.

1. Kufunga Raspberry Pi Imager kwenye kompyuta yako kuu.
2. Weka kadi yako ya microSD.
3. Chagua **Other general-purpose OS → Ubuntu → Ubuntu Server 22.04 LTS (64-bit)** (au mpya).
4. Matumizi ya Imager chaguzi za juu (gear icon) kwa kabla ya Configure mwenyeji, kuwezesha SSH na kuweka Wi-Fi sifa kama inahitajika, kwa ajili ya kichwa bila kwanza boot.
5. Andika picha, ingiza kadi hiyo, umeme juu ya Pi.
6. SSH katika: `ssh <username>@<pi-hostname-or-ip>`

## Hatua 2: Kuunganisha na kufunga kuhifadhi nje
1. Kuunganisha nje yako SSD / HDD kupitia USB 3.0.
2. Tambua kifaa: `lsblk`
3. Fomati (kama mpya) na kufunga, kwa mfano: `/mnt/zcash-data`, na kiwango cha juu ya `mkfs`/`fstab` kuanzisha hivyo auto-mounts juu ya reboot.

## Hatua ya 3: Sasisha mfumo
```bash
sudo apt update && sudo apt full-upgrade -y
sudo reboot
```

## Hatua 4: Kufunga na kukimbia Zebra
### Chaguo A  Docker (ilipendekeza)
```bash
sudo apt install -y docker.io
sudo usermod -aG docker $USER   # log out/in after this
docker run -d \
  --name zebra \
  -p 8233:8233 \
  -v /mnt/zcash-data/zebra:/home/zebra/.cache/zebra \
  zfnd/zebra:latest
```
Angalia maendeleo: `docker logs -f zebra`

### Chaguo B  Binary kabla ya kujengwa kupitia mizigo binstall
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source "$HOME/.cargo/env"
cargo install cargo-binstall
cargo binstall zebrad
zebrad start
```
Hii installs kabla ya kujengwa `aarch64` binary  hakuna compilation required.

** On wakati wa usawazishaji:** kutarajia hii kuchukua muda  kawaida alinukuliwa kwanza-usawazishaji takwimu (karibu 2 masaa) kuja kutoka kumbukumbu ya vifaa ambayo ni nguvu zaidi kuliko CPU Pi 4, hivyo halisi yako kusawazisha wakati juu ya mali halisi Pi 4 vifaa itakuwa uwezekano kukimbia kwa muda mrefu.

## Hatua 5: Kufunga Zallet
Zallet kwa sasa iko katika hali ya alpha, na usiseme kuwa ni uhifadhi wa fedha muhimu.

### Chaguo A  Docker (ilipendekeza)
```bash
docker pull zodlinc/zallet:latest
```
Picha hii inasaidia ARM64 (kupitia kujenga Nix-msingi) na anaendesha kutoka ndogo, shellless filesystem  kupita Configuration na data njia wazi kupitia `--datadir` na kiasi mounts (tazama Hatua 6).

### Chaguo B  Kujenga kutoka chanzo
```bash
# Requires Rust 1.85+ (see Step 4B for rustup install)
sudo apt install -y clang libclang-dev protobuf-compiler
cargo install --locked --git https://github.com/zcash/wallet.git
```
Crates Zallet ya bado kuchapishwa kwa crates.io wakati wa awamu alpha, hivyo kufunga kutoka git repo moja kwa moja ni mkono zisizo Docker mbinu.

## Hatua ya 6: Configure Zallet
Kujenga `zallet.toml` katika data yako kuchaguliwa (kwa mfano. `/mnt/zcash-data/zallet`):
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
Rekebisha `validator_address` kama Zebra anaendesha juu ya tofauti mwenyeji / bandari, na configure `validator_cookie_auth`/`validator_user`/`validator_password` chini ya `[indexer]` kwa mechi yako Zebra RPC auth kuanzisha.

** Kuhamia kutoka zcashd?** Kama bado una umri wa miaka `zcash.conf`:
```bash
zallet migrate-zcash-conf --datadir /path/to/old/zcashd/datadir -o /mnt/zcash-data/zallet/zallet.toml
```

## Hatua ya 7: Kuanzisha mkoba encryption
Zallet encrypts wote muhimu vifaa kutumia `age`/`rage`:
```bash
cargo install rage
rage -p -o /mnt/zcash-data/zallet/encryption-identity.txt <(rage-keygen)
```
Hii prints ufunguo wa umma na autogenerated password  ** kuokoa passphrase; huwezi kufufua faili utambulisho bila hiyo.**

## Hatua ya 8: Kuanzisha na kuanza mkoba
```bash
zallet -d /mnt/zcash-data/zallet init-wallet-encryption
zallet -d /mnt/zcash-data/zallet generate-mnemonic
```
**Kimbia tu `generate-mnemonic` mara moja** isipokuwa wewe makusudi wanataka mizizi mbalimbali ya matumizi huru.

```bash
zallet -d /mnt/zcash-data/zallet start
```

## Hatua 9: Kuhamisha mkoba wa zcashd uliopo (hiari)
```bash
zallet -d /mnt/zcash-data/zallet migrate-zcashd-wallet --zcashd-datadir /path/to/old/zcashd/datadir
```
Hii inahitaji ya `db_dump` shirika (kujengwa dhidi Berkeley DB 6.2.23)  kutoka mfumo wa kufunga au ndani ya chanzo kujenga-ya zcashd. Kama huna tena na zcashD imewekwa, hii ni moja hatua uhamiaji kwamba si kikamilifu kujitegemea katika Zallet bado.

## Hatua 10: Kuhakikisha kila kitu kazi
```bash
zallet -d /mnt/zcash-data/zallet help
```
Kuthibitisha mkoba anajibu, na mara moja Zebra kumaliza syncing, kwamba mizani / anwani mechi matarajio.

## Kutatua matatizo
- ** Zebra kujenga / runtime masuala juu ya ARM:** kama ujenzi kutoka chanzo, kufunga Rust ARM toolchain  kuendesha zana x86_64 jenga kwenye vifaa vya mkono itafanya kazi kwa kasi zaidi, per nyaraka za Zebra mwenyewe.
- ** Hifadhi kujaza up:** Zebra ya ~ 300 GB footprint anaendelea kukua  mpango headroom.
- ** Docker ruhusa makosa:** log nje / kurudi katika baada ya kuongeza mtumiaji wako kwa jukwaa la. `docker` kundi, au matumizi ya `sudo` kwa wakati huo.
- ** chombo Zallet hana shell:** rasmi `zodlinc/zallet` picha ni kutoka mwanzo kwa kubuni  daima kupita `--datadir` wazi na kufunga yako data directory kama kiasi.

## Hardware maelezo dhidi ya zamani zcashd mwongozo
Zebra na Zallet ni kwa ujumla nyepesi juu ya CPU wakati wa kuanzisha kuliko kukusanya zcashd ilikuwa, tangu wewe ni mbio pre-kujengwa binaries / vyombo. 4 GB RAM ni hatua nzuri kuanzia; kufuatilia pamoja `htop` na kuzingatia 8 GB Pi 4 lahaja kama unaweza kuona swapping nzito.

## Rasilimali za ziada
- [Kitabu Zebra](https://zebra.zfnd.org)  hati rasmi Zebra
- [Kitabu cha Zallet](https://zcash.github.io/wallet)  hati rasmi za Zallet
- [zcashd End-of-Support notice](https://z.cash/support/zcashd-deprecation)

---

* Kama ulipata mwongozo huu kuwa muhimu, fikiria kuunga mkono ZecHub: [ingiza anwani ya sasa iliyohifadhiwa kutoka kwa mchango wa zechub.wiki/donation  haijajumuishwa hapa kwani sikuweza kuthibitisha ikiwa bado ni halali].*
