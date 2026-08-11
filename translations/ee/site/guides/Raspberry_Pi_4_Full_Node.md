# Ƒu du Blibo Node le Raspberry Pi 4 (Zebra + Zallet) dzi .

*Woʋu tso mɔfiame gbãtɔ si wotu ɖe zcashd dzi. zcashd ɖo eƒe End-of-Support ƒe tɔtrɔ le eɖokui si le July 18, 2026 dzi, eyata mɔfiame sia zãa **Zebra** (node ​​blibo si li fifia, si Zcash Foundation léa be na) kple **Zallet** (gakotoku si wotu be wòaxɔ ɖe zcashd ƒe gakotoku si wotu ɖe eme teƒe) fifia.*

## Nusi nàsrɔ̃
- Alesi woawɔ flash ahaɖo Ubuntu Server 22.04+ (64-bit) ɖe Raspberry Pi 4 dzi hena zazã ta manɔmee
- Alesi woaɖo Zebra ɖe eme ahawɔe, to Docker alo binary si wotu do ŋgɔ dzi
- Alesi nàde Zallet, aɖoe, ahadze egɔmee, si me gakotoku ƒe nya ɣaɣlawo ƒe ɖoɖowɔwɔ hã le
- Alesi nàwɔ aʋu zcashd config/wallet si li xoxo ɖe Zallet me le ɖokuiwò si

## Nusi trɔ tso mɔfiala xoxoa gbɔ
Mɔfiame sia ƒe tɔtrɔ si do ŋgɔ zɔ to nuƒoƒoƒu **zcashd** natively le Pi 4 dzi — nuƒoƒoƒu ɖeka-ka si xɔ gaƒoƒo 3–4 elabena Pi 4 mekpɔ ŋkuɖodzinu si sɔ na parallel o (`-j$(nproc)`) tu. Zebra kple Zallet siaa ɖoa **Official pre-built ARM64 binaries kple Docker images** fifia, eyata le go geɖe me la, megahiã be nàƒo naneke nu ƒu tso dzɔtsoƒe le Pi ŋutɔ dzi o.

## Nusiwo hiã do ŋgɔ
- Raspberry Pi 4 (wokafu 4 GB RAM alo esi wu nenema) .
- MicroSD kaɖi (32 GB+) na OS la
- Gotagome SSD/HDD si me USB 3.0 ƒe kpekpeɖeŋu le — **Zebra hiã abe 300 GB ene na Mainnet nyatakaka siwo wodzra ɖo ɖi**, si le dzidzim ɖe edzi le ɣeyiɣi aɖe megbe, eyata mègadze agbagba be yeawɔ esia tso microSD kaɖi ɖeɖeko dzi o
- Kɔmpiuta si me microSD kaɖi ƒe ʋɔtru le (be wòaklẽ OS ƒe nɔnɔmetata) .
- Ethernet kadodo si wotsɔ ka bla alo Wi-Fi
- Akɔfafa vevi si le sedede ƒe fli dzi le SSH dzi

## Afɔɖeɖe 1: Flash Ubuntu Server 22.04 + (64-bit) .
Zebra kple Zallet ƒe binary siwo wotu do ŋgɔ kple Docker nɔnɔmetatawo hiã **glibc 2.34+**, si fia be **Ubuntu Server 22.04 alo yeyetɔ (64-bit/aarch64)**.

1. De Raspberry Pi Imager la wò kɔmpiuta vevitɔ dzi.
2. De wò microSD kaɖia eme.
3. Tia **OS bubu siwo wozãna le mɔ gbadza nu → Ubuntu → Ubuntu Server 22.04 LTS (64-bit)** (alo yeyetɔ).
4. Zã Imager ƒe tiatia deŋgɔwo (gear icon) tsɔ ɖo hostname do ŋgɔ, na SSH nawɔ dɔ, eye nàɖo Wi-Fi ƒe ɖaseɖigbalẽwo ne ehiã, na ta manɔmee ƒe gɔmedzedze gbãtɔ.
5. Ŋlɔ nɔnɔmetata la, de kaɖia eme, tsɔ ŋusẽ de Pi la me.
6. SSH le: `ssh <username>@<pi-hostname-or-ip>`

## Afɔɖeɖe 2: Kpe gotagome nudzraɖoƒea ɖe eŋu eye nàɖoe ɖe edzi
1. Do ka kple wò gotagome SSD/HDD to USB 3.0 dzi.
2. De dzesi mɔ̃a: `lsblk`
3. Format (ne yeye) eye nàdoe ɖe edzi, e.g. yi `/mnt/zcash-data`, si ŋu dzidzenu aɖe le `mkfs`/`fstab` setup ale be auto-mounts le reboot.

## Afɔɖeɖe 3: Trɔ asi le ɖoɖoa ŋu
```bash
sudo apt update && sudo apt full-upgrade -y
sudo reboot
```

## Afɔɖeɖe 4: De Zebra eme eye nàwɔe
### Tiatia A — Docker (wokafui) .
```bash
sudo apt install -y docker.io
sudo usermod -aG docker $USER   # log out/in after this
docker run -d \
  --name zebra \
  -p 8233:8233 \
  -v /mnt/zcash-data/zebra:/home/zebra/.cache/zebra \
  zfnd/zebra:latest
```
Kpɔ ŋgɔyiyi si wowɔ ɖa: `docker logs -f zebra`

### Tiatia B — Wotu binary do ŋgɔ to agba binstall dzi
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source "$HOME/.cargo/env"
cargo install cargo-binstall
cargo binstall zebrad
zebrad start
```
Esia dea nusi wotu do ŋgɔ la eme `aarch64` binary — nuƒoƒoƒu aɖeke mehiã o.

**Le sync ɣeyiɣi:** kpɔ mɔ be esia axɔ ɣeyiɣi aɖe — zi geɖe-yɔyɔ gbãtɔ-sync xexlẽdzesiwo (anɔ abe gaƒoƒo 2) tso reference hardware si ŋu ŋusẽ le wu Pi 4 ƒe CPU, eyata wò sync ɣeyiɣi ŋutɔŋutɔ le Pi 4 hardware ŋutɔŋutɔ dzi anɔ eme be axɔ ɣeyiɣi didi wu.

## Afɔɖeɖe 5: De Zallet ɖe wò kɔmpiuta dzi
Zallet le **alpha** me fifia — kpɔ mɔ na tɔtrɔ siwo agbã, eye mègabui abe nuwɔwɔ-dzraɖo ƒe nudzraɖoƒe na ga veviwo haɖe o.

### Tiatia A — Docker (wokafui) .
```bash
docker pull zodlinc/zallet:latest
```
Nɔnɔmetata sia doa alɔ ARM64 (to Nix-si wotu ɖe xɔtutu dzi) eye wòzɔna tso faɛlɖoɖo suetɔ, ​​si me shell mele o — tsɔ ɖoɖowɔɖi kple nyatakaka mɔwo to eme tẽ to `--datadir` kple gbeɖiɖi ƒe sesẽme dzi ɖeɖe kpɔtɔ (kpɔ Afɔɖeɖe 6).

### Tiatia B — Tu tso dzɔtsoƒe
```bash
# Requires Rust 1.85+ (see Step 4B for rustup install)
sudo apt install -y clang libclang-dev protobuf-compiler
cargo install --locked --git https://github.com/zcash/wallet.git
```
Zallet ƒe aɖakawo meta ɖe crates.io me haɖe le alpha ƒe akpaa me o, eyata eɖoɖo tso git repo tẽe nye mɔnu si menye Docker tɔ o si wodo alɔe.

## Afɔɖeɖe 6: Trɔ asi le Zallet ŋu
Wᴐ `zallet.toml` le datadir si nètia me (e.g. `/mnt/zcash-data/zallet`):
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
Wɔ ɖɔɖɔɖo `validator_address` ne Zebra le dɔ wɔm le host/port bubu dzi, eye nàɖoe `validator_cookie_auth`/`validator_user`/`validator_password` egɔme `[indexer]` be wòasɔ kple wò Zebra RPC auth ɖoɖoa.

**Migrating from zcashd?** Ne xoxo aɖe gakpɔtɔ le asiwò `zcash.conf`:
```bash
zallet migrate-zcash-conf --datadir /path/to/old/zcashd/datadir -o /mnt/zcash-data/zallet/zallet.toml
```

## Afɔɖeɖe 7: Ðo gakotoku ƒe nya ɣaɣlawo
Zallet tsɔa nya veviwo katã ɣlana zãna `age`/`rage`:
```bash
cargo install rage
rage -p -o /mnt/zcash-data/zallet/encryption-identity.txt <(rage-keygen)
```
Esia taa dutoƒo safui kple nyagbe si wowɔ le eɖokui si — **dzra nyagbea ɖo; màte ŋu axɔ dzesideŋkɔ ƒe faɛl la ema manɔmee o.**

## Afɔɖeɖe 8: Dze gakotokua gɔme eye nàdze egɔme
```bash
zallet -d /mnt/zcash-data/zallet init-wallet-encryption
zallet -d /mnt/zcash-data/zallet generate-mnemonic
```
**Duƒuƒu ko `generate-mnemonic` zi ɖeka** negbe ɖe nèɖoe koŋ di be yeakpɔ gazazã ƒe ke geɖe siwo le wo ɖokui si.

```bash
zallet -d /mnt/zcash-data/zallet start
```

## Step 9: Migrating an existing zcashd wallet (optional)
```bash
zallet -d /mnt/zcash-data/zallet migrate-zcashd-wallet --zcashd-datadir /path/to/old/zcashd/datadir
```
Esia bia be woawɔ... `db_dump` utility (si wotu ɖe Berkeley DB 6.2.23 dzi) — tso ɖoɖo ƒe ɖoɖo alo teƒea ƒe dzɔtsoƒe-tutu si nye zcashd me. Ne zcashd megale asiwò o la, esia nye ʋuʋu ƒe afɔɖeɖe ɖeka si mekpɔ eɖokui dzi bliboe le Zallet me haɖe o.

## Afɔɖeɖe 10: Kpɔe ɖa be nusianu le dɔ wɔm hã
```bash
zallet -d /mnt/zcash-data/zallet help
```
Kpɔe ɖa be gakotokua ɖo eŋu, eye ne Zebra nya wu ewɔwɔ nu ko la, be dadasɔ/adrɛswo sɔ kple mɔkpɔkpɔwo.

## Kuxiwo gbɔ kpɔkpɔ
- **Zebra xɔtutu/dɔwɔwɔ ƒe ɣeyiɣi ƒe nyawo le ARM dzi:** ne èle xɔ tum tso dzɔtsoƒe la, de Rust ARM dɔwɔnuwo ƒe ƒuƒoƒoa — x86_64 xɔtudɔwɔnuwo wɔwɔ le ARM xɔtunuwo dzi awɔ dɔ blewu si dzena, le Zebra ŋutɔ ƒe nuŋlɔɖiwo nu.
- **Nudzraɖoƒe yɔyɔ:** Zebra ƒe ~300 GB afɔɖoƒe yi edzi le tsitsim — ɖoɖo taɖoƒe.
- **Docker mɔɖeɖe ƒe vodadawo:** do go/trɔ yi eme le wò zãla tsɔtsɔ kpe ɖe... `docker` ƒuƒoƒo, alo zazã `sudo` le ɣeyiɣi sia me.
- **Zallet nugoe mekpɔa go aɖeke o:** amegã la `zodlinc/zallet` nɔnɔmetata nye tso-gɔmedzedze to aɖaŋu — ɣesiaɣi to `--datadir` tẽ eye nàdo wò nyatakakawo ƒe agbalẽdzraɖoƒea ɖe edzi abe volume ene.

## Hardware nuŋlɔɖiwo vs. xoxo zcashd mɔfiame
Zebra kple Zallet le bɔbɔe wu le CPU dzi le ɖoɖowɔwɔ me wu alesi zcashd nuƒoƒoƒu nɔ, elabena èle binaries/containers siwo wotu do ŋgɔ la zãm. 4 GB RAM nye gɔmedzedze si me susu le; monitor kple `htop` eye nàbu 8 GB Pi 4 ƒe tɔtrɔ ŋu ne èkpɔ asitɔtrɔ sesẽ.

## Dɔwɔnu bubuwo
- [Zebra ƒe Agbalẽ](https://zebra.zfnd.org) — Zebra ƒe nuŋlɔɖi siwo dziɖuɖua da asi ɖo
- [Zallet ƒe Agbalẽ](https://zcash.github.io/wallet) — Zallet ƒe nuŋlɔɖi siwo dziɖuɖua da asi ɖo
- [zcashd Kpekpeɖeŋunana ƒe Nuwuwu ƒe gbeƒãɖeɖe](https://z.cash/support/zcashd-deprecation)

---

*Ne èkpɔe be mɔfiame sia ɖea vi la, bu eŋu kpɔ be yeado alɔ ZecHub: [de ZecHub donation shielded address si li fifia tso zechub.wiki/donation — wometsɔe de afisia o elabena nyemete ŋu ɖo kpe edzi be egakpɔtɔ nye fifi o].*
