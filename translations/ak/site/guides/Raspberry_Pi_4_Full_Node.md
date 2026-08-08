# Run a Full Node on a Raspberry Pi 4 (Zebra + Zallet) - Abɔdin: Kɔmputa, Wifi ne kɔmputa ho dwumadie.

*W'ayi afiri mfitiaseɛ zcashd-based guide no mu. Zcashd nyaa ne automatic End of Support stop wɔ July 18, 2026, enti saa akwankyerԑ yi de seesei ara na ɛde di dwuma **Zebra** (a ɛnnɛ yɛ nokorɛ a, Zcash Foundation hwɛ so) ɛne **Zallet** (abɔfra abɔfra bɔfra abrabↄ ma wͻsesaeε zcash denden no).*

## Nea wubesua no bi
- Sεnea wobεtwe Ubuntu Server 22.04+ (64-bit) no na wode asiesie so wɔ Raspberry Pi 4 a wonfa ti nni dwuma ho
- Sεnea wobεhyehyε Zebra na wode adi dwuma, sε εfa Docker anaa binary a w'adi kan asi no so.
- Sɛnea wobɛhyehyɛ, asiesie na woadi kan Zallet no so dwuma a ɛka sika kotoku ahwehwɛde ho nhyehyɛɛ nso ka ho.
- Sεnea wobεfa akwantu kwan so de wͻn zcashd config/wallet a εwᴐ hͻ no asi Zallet mu

## Deɛn na ɛsesae firi kan akwankyerɛ no mu?
The previous version of this guide walked through compiling **zcashd** natively on a Pi 4 — a single-threaded compile that took 3–4 hours because the Pi 4 doesn't have enough memory for a parallel (`-j$(nproc)`Afei, Zebra ne Zallet nyinaa de ARM64 binaries a wɔasiesie no ato dwa na wɔde Docker mfoni nso adi dwuma. Enti mpɛn pii no ɛho nhia sɛ wode biribi firi source so yɛ adwuma wɔ Pi ankasa mu bio.

## Ahwehwɛde ahorow a edi kan
- Raspberry Pi 4 (4 GB RAM anaa nea ɛboro saa a wɔhyɛ ho nkuran)
- microSD kaade (32 GB+) ma OS no
- External SSD/HDD a USB 3.0 support  **Zebra hia bɛyɛ 300 GB ma cached Mainnet data**, na ɛreyɛ kɛse wɔ bere mu, enti mmɔ mmɔden sɛ wobɛfa microSD card no nko ara adi dwuma
- Kɔmputa a microSD kaade mu (sɛnea ɛbɛyɛ na OS no bɛpue)
- Wired Ethernet connection anaa Wi-Fi a wo de di dwuma no so.
- Nkɔmmɔ a ɛfa ɔmansin so ho wɔ SSH mu no yɛ papa pa ara.

## Anammɔn 1: Flash Ubuntu Server 22.04+ (64-bit)
Zebra ne Zallet's pre-built binaries na Docker images hia **glibc 2.34+**, a ɛkyerɛ sɛ **Ubuntu Server 22.04 anaa foforɔ (64-bit/aarch64)**.

1. Fa Raspberry Pi Imager no si wo kͻmputa titiriw no so.
2. Fa wo microSD kaade no hyɛ mu.
3. Paw **Nneɛma a wɔde yɛ adwuma wɔ OS foforo so → Ubuntu → Ubuntu Server 22.04 LTS (64-bit)** (anaa nea ɛyɛ foforɔ).
4. Fa Imager no nhyehyeɛ a ɛkɔ akyiri (gear icon) di dwuma de asiesie hostname, ma SSH kwan na fa Wi-Fi ho nimdeɛ sɛ ɛho hia a, wɔ headless kan boot.
5. Kyerɛw mfonini no, fa kaade no hyɛ mu na bɔ Pi a ɛwɔ hɔ no so.
6. SSH wɔ: `ssh <username>@<pi-hostname-or-ip>`

## Ntoso 2: Fa mpuntuo a w'atumi de adi dwuma na fa hyɛ no akyi.
1. Fa wo mpuntuo SSD/HDD no fa USB 3.0 so.
2. Kyerɛ afidie no: `lsblk`
3. Format (sɛ ɛyɛ foforo) na fa to so, e.g., sɛ wo de di dwuma a: `/mnt/zcash-data`, a standard no ho yɛ den paa. `mkfs`/`fstab` Sεnea ɛbɛyɛ a sε w'asan de wo ho asi hɔ bio no.

## Anammɔn 3: Siesie nhyehyɛe no
```bash
sudo apt update && sudo apt full-upgrade -y
sudo reboot
```

## Anammɔn 4: Fa Zebra si hɔ na di dwuma
### Option A  Docker (recommended)
```bash
sudo apt install -y docker.io
sudo usermod -aG docker $USER   # log out/in after this
docker run -d \
  --name zebra \
  -p 8233:8233 \
  -v /mnt/zcash-data/zebra:/home/zebra/.cache/zebra \
  zfnd/zebra:latest
```
Hwɛ nkɔso: `docker logs -f zebra`

### Option B  Pre-built binary via cargo binstall (pre-builded binary) - faako a wɔhyehyɛ nneɛma no kɔ akyiri.
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source "$HOME/.cargo/env"
cargo install cargo-binstall
cargo binstall zebrad
zebrad start
```
Eyi de ɔhyehyɛ a wɔasi no dedaw bi si hɔ. `aarch64` binary  no compilation required.

**On sync time:** expect this to take a while  commonly-cited first-sync figures (roughly 2 hours) come from reference hardware that is more powerful than a Pi 4's CPU, so your actual sync times on real Pi 4 hardware will likely run longer.

## Anammɔn 5: Fa Zallet si hɔ
Seesei Zallet wɔ alpha mu. Ɛhwɛ kwan sɛ nsakrae bɛba, na mma no nyɛ wo ho te sɛ sika a ɛho hia ma wɔn a wobetumi de ayɛ adwuma ama so.

### Option A  Docker (recommended)
```bash
docker pull zodlinc/zallet:latest
```
Saa mfoni yi boa ARM64 (nam Nix-based build so) na ɛfiri file system a ɛnni shell biara mu  fa configuration ne data akwan kɔ explicitly via `--datadir` ne mpԑn a ԑso wɔ soro (Hwɛ Asetena 6).

### Nhyehyεe B  Fi mfitiase no so siesie
```bash
# Requires Rust 1.85+ (see Step 4B for rustup install)
sudo apt install -y clang libclang-dev protobuf-compiler
cargo install --locked --git https://github.com/zcash/wallet.git
```
Zallet's crates no nnya nhyiaa mu wɔ crates.io berɛ a alpha phase, enti wɔn de firi git repo hɔ tẽẽ na ɛboa non-Docker akwan.

## Anammɔn 6: Sesa Zallet no
Bue w'ani ma no `zallet.toml` w'ahyehyɛ wo data din (sɛ. nhwɛso, "database") no mu; `/mnt/zcash-data/zallet`):
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
Sesa no ma ɛnyɛ yiye. `validator_address` Sɛ Zebra yɛ adwuma wɔ host/port foforɔ so a, na fa siesie no saa ara. `validator_cookie_auth`/`validator_user`/`validator_password` asefoɔ a- `[indexer]` Sɛ wo de to w'adwumam a, fa yɛ adwuma sɛ Zebra RPC.

**Woretu afi zcashd?** Sɛ wowɔ tete kasa a, fa yɛ adwuma. `zcash.conf`:
```bash
zallet migrate-zcash-conf --datadir /path/to/old/zcashd/datadir -o /mnt/zcash-data/zallet/zallet.toml
```

## Anammɔn 7: Fa sika krataa no hyɛ nkrataafa a wode bɛkyerɛw nsɛm mu
Zallet de nsɛm a ɛho hia nyinaa di dwuma ma wɔde kyerɛ sɛ ɛyɛ nokware. `age`/`rage`:
```bash
cargo install rage
rage -p -o /mnt/zcash-data/zallet/encryption-identity.txt <(rage-keygen)
```
Eyi tintim abodin a w'atumi de adi dwuma ne ahyɛnsode bi a wɔabɔ no ankasa  **kora ahwehwɛde; wontumi nnya nkrataafa ho nimdeɛ bere a wonnya.**

## Anammɔn 8: Fa mfoni no hyɛ aseɛ na bɔ portfolios no mu
```bash
zallet -d /mnt/zcash-data/zallet init-wallet-encryption
zallet -d /mnt/zcash-data/zallet generate-mnemonic
```
**Nneɛma a ɛbɛkɔ so no nko ara na yɛhwɛ kwan. `generate-mnemonic` once** gye sɛ wohyɛ da pɛ nnɔbae a ɛtwe kɔ no mu pii.

```bash
zallet -d /mnt/zcash-data/zallet start
```

## Akwantu 9: Sesa zcashd akwantuo krataa a ɛwɔ hɔ (ɛnyɛ nhyɛ)
```bash
zallet -d /mnt/zcash-data/zallet migrate-zcashd-wallet --zcashd-datadir /path/to/old/zcashd/datadir
```
Eyi hia sɛ wɔ bɛ yɛ no yie. `db_dump` utility (a w'ayɛ no Berkeley DB 6.2.23)  firi system install anaa local source-build a wo de zcashd ato hɔ. Sɛ wonnya nhyehyeɛ zcashD bio aa, wei ne akwantuo baako pɛ a ɛnni Zallet mu koraa ɛbere yi nyinaa.

## Anammɔn 10: Sɔ biribiara hwɛ sɛ ɛyɛ adwuma anaa.
```bash
zallet -d /mnt/zcash-data/zallet help
```
Hwɛ sɛ wallet no rebua, na bere a Zebra wie ne syncing no so ara pɛ no, ɛne nea wɔhwɛ kwan hyia.

## Nsisi ho nhyehyɛe
- **Zebra build/runtime issues on ARM:** sɛ wode firi source na ɛsi, fa Rust ARM toolchain no  a x86_64 yɛ adwuma wɔ hardware so bɛgye bere kakra.
- Ahoma a wɔhyehyɛ no ma: Zebra ~300 GB nan ase kɔ so nyin  nhyehyɛe mu.
- ** Docker kwan ho mfomso:** log out/back in after adding your user to the `docker` kuo, anaa deε wɔde di dwuma `sudo` Ɛkame ayɛ sɛ wɔ saa bere no mu.
- ** Zallet container no nni shell:** ɔpanin no `zodlinc/zallet` mfoni no fi-si-nso wɔ adwinni mu  daa yɛ pasaa `--datadir` W'akyerɛ mu pefee na fa wo data directory no si volume so.

## Dwumadi krataa a wɔde di dwuma ne zcashd akwankyerε dedaw no
Zebra ne Zallet yɛ CPU mu mmerɛ wɔ setup bere a ɛboro zcashd kyekyɛ so, efiri sɛ worehwɛ binaries/containers. 4 GB RAM yɛ mfitiaseɛ pa; hwɛ nea w'atumi adi dwuma no yiye na fa di dwuma ntɛmntɛm. `htop` na sɛ wuhu senea wɔsakra nneɛma pii a, susuw 8 GB Pi 4 no ho.

## Nnwumakuo a ɛboa ma wɔn nsa ka sika no bi.
- [Zebra Nhoma](https://zebra.zfnd.org)  Official Zebra documentation (Nkrataa ahodoɔ a etwa sɛ yɛhyehyɛ wɔ kasa no mu)
- [Zallet Nhoma no](https://zcash.github.io/wallet)  Zallet krataa a w'atwerԑ no mu nsɛm nyinaa
- [zcashd Nkɔsoɔ a wɔtɔ no ho nkrataa](https://z.cash/support/zcashd-deprecation)

---

*Sɛ wo hunu saa akwankyerԑ yi a mfasoɔ wɔ so, dwen ho sε wobɛtumi aboa ZecHub: [fa adansedie bi a w'atwe afiri mu de adi dwuma seesei no ka ho firi zechub.wiki/donation  ɛnyɛ ha efisԑ mintumi anhu sɛ ɛyɛ adwuma].*
