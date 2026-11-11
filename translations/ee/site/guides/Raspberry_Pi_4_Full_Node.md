# Ƒu ɣaɣla dzesi ŋɔŋlɔ blibo le Raspberry Pi 4 dzi (Zebra + Zallet)

*Wotsɔe va tso gɔmedzedze ƒe zcashd-based guide me. zcashd va ɖo eƒe automatic End-of-Support tɔƒe le July 18, 2026, eyata fifia guide sia zã **Zebra** (ɣaɣla dzesi ŋɔŋlɔ blibo si le fifia, si Zcash Foundation kpɔna) kple **Zallet** (gakotoku si wotu be wòaxɔ zcashd ƒe gakotoku si le eme la teƒe).*

## Nu si nàsrɔ
- Ale si nàtsɔ aflɛshi eye nàɖo Ubuntu Server 22.04+ (64-bit) ɖe Raspberry Pi 4 dzi ne wòatsɔe awɔ dɔ si me screen mele o
- Ale si nàde Zebra eye nàwɔ dɔ kplii, to Docker alo binary si woɖo xoxo me dzi
- Ale si nàde, nàɖo, eye nàdze Zallet gɔme, si me gakotoku ɣaɣlaŋlɔŋlɔ ƒe ɖoɖo hã le
- Ale si nàtrɔ zcashd ƒe config/gakotoku si le asiwò xoxo la atsɔe ade Zallet me ne èdi

## Nu si trɔ tso guide xoxo la me
Guide sia ƒe version si do ŋgɔ la fia ale si woaƒo **zcashd** native ɖe Pi 4 dzi — ƒoƒo si wɔ dɔ kple thread ɖeka, eye wòxɔ gaƒoƒo 3–4 elabena Pi 4 ƒe memory medze na parallel (`-j$(nproc)`) build o. Zebra kple Zallet katã dona **official pre-built ARM64 binaries kple Docker images** fifia, eyata zi geɖe la mele be nàƒo naneke tso source me ɖe Pi ŋutɔ dzi o.

## Nu si wòahiã
- Raspberry Pi 4 (woɖe 4 GB RAM alo nu si wu ema dzi)
- microSD card (32 GB+) na OS
- SSD/HDD si le gota kple USB 3.0 support — **Zebra hia 300 GB kple afɔɖe na Mainnet data si wowɔ cache na**, eye ele dzidzime le tsitsi me, eyata mègaƒe ƒomegã be nàwɔ esia tso microSD card ɖeka dzi o
- Kɔmputa si me microSD card ƒe slot le (be nàflɛshi OS image la)
- Ethernet si wokaka kple kabel alo Wi-Fi
- Dɔwɔwɔ kple command line to SSH me si nèse egɔme vie

## Afɔ 1: Flɛshi Ubuntu Server 22.04+ (64-bit)
Zebra kple Zallet ƒe pre-built binaries kple Docker images hia **glibc 2.34+**, si fia be **Ubuntu Server 22.04 alo yeyee (64-bit/aarch64)**.

1. De Raspberry Pi Imager ɖe wò kɔmputa vevi la dzi.
2. Ɖe wò microSD card la ɖe eme.
3. Tia **Other general-purpose OS → Ubuntu → Ubuntu Server 22.04 LTS (64-bit)** (alo nu si yeyee).
4. Zã Imager ƒe advanced options (gear icon) be nàɖo hostname ɖi, nàna SSH nadzɔ, eye nàɖo Wi-Fi ƒe credentials ne wòahiã, na headless first boot.
5. Ŋlɔ image la ɖe card la dzi, ɖe card la ɖe eme, eye nàtsɔ ŋusẽ na Pi la.
6. Ge ɖe eme to SSH me: `ssh <username>@<pi-hostname-or-ip>`

## Afɔ 2: Tsɔ eye nàmount external storage
1. Ɖe wò external SSD/HDD la kple USB 3.0.
2. Dzro device la: `lsblk`
3. Format (ne wòle yeye) eye nàmounte, le kpɔɖeŋu me ɖe `/mnt/zcash-data`, kple `mkfs`/`fstab` ƒe ɖoɖo si wonya, be wòa-mount eɖokui ne woagbugbɔ atsɔ mɔ dzi.

## Afɔ 3: Trɔ system la yeyee
```bash
sudo apt update && sudo apt full-upgrade -y
sudo reboot
```

## Afɔ 4: De eye nàwɔ dɔ kple Zebra
### Tɔtrɔ A — Docker (woɖe eŋu)
```bash
sudo apt install -y docker.io
sudo usermod -aG docker $USER   # log out/in after this
docker run -d \
  --name zebra \
  -p 8233:8233 \
  -v /mnt/zcash-data/zebra:/home/zebra/.cache/zebra \
  zfnd/zebra:latest
```
Kpɔ ale si wòli ɖe edzi: `docker logs -f zebra`

### Tɔtrɔ B — Binary si woɖo xoxo me to cargo binstall me
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source "$HOME/.cargo/env"
cargo install cargo-binstall
cargo binstall zebrad
zebrad start
```
Esia dea `aarch64` binary si woɖo xoxo me — ƒoƒo mele be nàwɔ o.

**Le sync ƒe ɣeyiɣi ŋu:** Ɖo ŋku edzi be esia axɔ ɣeyiɣi — first-sync ƒe xexlẽ si woƒoa gbeɖe (le gaƒoƒo 2 ƒe ŋkuɣiwo me) tsoa reference hardware si ŋusẽ wu Pi 4 ƒe CPU, eyata wò sync ƒe ɣeyiɣi ŋutɔ ɖe Pi 4 hardware dzi ate ŋu akɔ.

## Afɔ 5: De Zallet
Zallet le **alpha** me fifia — exexe siwo agbã naneke ate ŋu ava, eye mègaɖe eŋu be wòanye production-ready custody na ga geɖe haɖe o.

### Tɔtrɔ A — Docker (woɖe eŋu)
```bash
docker pull zodlinc/zallet:latest
```
Image sia dea ARM64 (to Nix-based build me) eye wòwɔ dɔ tso filesystem sue si me shell mele o me — na configuration kple data paths kpuie to `--datadir` kple volume mounts me (kpɔ Afɔ 6).

### Tɔtrɔ B — Ƒo tso source me
```bash
# Requires Rust 1.85+ (see Step 4B for rustup install)
sudo apt install -y clang libclang-dev protobuf-compiler
cargo install --locked --git https://github.com/zcash/wallet.git
```
Zallet ƒe crates mede ɖe crates.io dzi haɖe le alpha ƒe ɣeyiɣi me o, eyata ƒome si wokpɔ dzi le be woade tso git repo la me kpuie la nye mɔ si nye Docker o.

## Afɔ 6: Ɖo Zallet ɖi
Wɔ `zallet.toml` le datadir si wòtia me (le kpɔɖeŋu me, `/mnt/zcash-data/zallet`):
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
Trɔ `validator_address` ne Zebra le host/port bubu dzi, eye nàɖo `validator_cookie_auth`/`validator_user`/`validator_password` ɖe `[indexer]` te be wòawɔ sɔ kple wò Zebra RPC auth ƒe ɖoɖo.

**Ètso zcashd me va?** Ne `zcash.conf` xoxo gale asiwò:
```bash
zallet migrate-zcash-conf --datadir /path/to/old/zcashd/datadir -o /mnt/zcash-data/zallet/zallet.toml
```

## Afɔ 7: Ɖo gakotoku ɣaɣlaŋlɔŋlɔ ɖi
Zallet tsɔ `age`/`rage` ɣaɣlana key material katã:
```bash
cargo install rage
rage -p -o /mnt/zcash-data/zallet/encryption-identity.txt <(rage-keygen)
```
Esia aɖe public key kple passphrase si wowɔ ɖokuiwɔwɔe afia — **Dzra passphrase la ɖo; mèate ŋu agbɔ identity file la o ne melé asiwò o.**

## Afɔ 8: Dzra gakotoku la ɖe gɔme eye nàdzoe
```bash
zallet -d /mnt/zcash-data/zallet init-wallet-encryption
zallet -d /mnt/zcash-data/zallet generate-mnemonic
```
**Wɔ `generate-mnemonic` teƒe ɖeka ko** ne menye be èdi spending roots vovovo geɖe le wo ɖokuiwo me.

```bash
zallet -d /mnt/zcash-data/zallet start
```

## Afɔ 9: Trɔ zcashd gakotoku si le asiwò xoxo (ne èdi)
```bash
zallet -d /mnt/zcash-data/zallet migrate-zcashd-wallet --zcashd-datadir /path/to/old/zcashd/datadir
```
Esia hia `db_dump` utility (si woƒo kple Berkeley DB 6.2.23) — tso system install alo zcashd ƒe source-build si nèwɔ ɖe afi me. Ne zcashd mele asiwò o fifia, esia nye migration afɔ ɖeka si mele ɖe eɖokui me blibo ɖe Zallet me haɖe.

## Afɔ 10: Kpɔ be nu katã wɔ dɔ
```bash
zallet -d /mnt/zcash-data/zallet help
```
Kpɔ be gakotoku la ƒoa nu, eye ne Zebra wu sync wɔwɔ nu la, kpɔ be balances/gaɖoƒe ƒe dzesiwo sɔ kple nu si nèle mɔm la.

## Kuxiwo ƒe ɖɔɖɔ
- **Zebra build/runtime kuxiwo le ARM dzi:** Ne nèƒoa tso source me, de Rust ARM toolchain — x86_64 build tools siwo le ARM hardware dzi wɔwɔ aƒu ɣeyiɣi wu, le Zebra ŋutɔ ƒe documentation nu.
- **Storage yɔna:** Zebra ƒe ~300 GB footprint gale tsitsi me — ɖo teƒe bubu ɖe aga.
- **Docker permission errors:** Do go eye nàge gbɔ va me after nàtsɔ wò user kpe `docker` group la ŋu, alo zã `sudo` le fifia.
- **Zallet container me shell mele o:** Official `zodlinc/zallet` image la tsoa scratch me kple ta — na `--datadir` kpuie ɣesiaɣi eye nàmount wò data directory abe volume ene.

## Hardware ƒe nyatiawo sɔ kple zcashd guide xoxo la
Zebra kple Zallet le CPU ŋu bɔbɔe wu zi geɖe le ɖoɖo me tso esi nèle pre-built binaries/containers wɔm, eye womeƒoa zcashd o. 4 GB RAM nye gɔmedzeɖoƒe nyui; kpɔe kple `htop` eye bu Pi 4 ƒe 8 GB variant ŋu ne èkpɔ swapping geɖe.

## Nuŋlɔɖi bubuwo
- [Zebra Book](https://zebra.zfnd.org) — Zebra ƒe official documentation
- [Zallet Book](https://zcash.github.io/zallet/) — Zallet ƒe official documentation
- [zcashd End-of-Support ƒe nyadzɔdzɔ](https://z.cash/support/zcashd-deprecation)

---

*Ne guide sia kpe ɖe ŋuwò la, bu be nàkpe ɖe ZecHub ŋu: [de ZecHub ƒe donation ɣaɣla gaɖoƒe ƒe dzesi si le fifia tso zechub.wiki/donation me — wometsɔ de eme afisia o elabena nyemate ŋu akpɔ be egale fifia o].*
