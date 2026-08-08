# Gbaa Full Node na Raspberry Pi 4 (Zebra + Zallet)

*Migrated from the original zcashd-based guide. zcashd reached its automatic End-of-Support halt on July 18, 2026, so this guide now uses **Zebra** (the current full node, maintained by the Zcash Foundation) and **Zallet** (the wallet built to replace zcashd's built-in wallet).*

## Ihe Ị Ga-amụta
- Otu esi eme flash na nhazi Ubuntu Server 22.04+ (64-bit) na Raspberry Pi 4 maka iji isi mee ihe
- Esi wụnye ma na-agba ọsọ Zebra, site na Docker ma ọ bụ ihe dị iche iche e mepụtara tupu oge eruo
- Otu esi etinye, hazie ma melite Zallet, gụnyere nhazi nke nchekwa ego.
- Otu esi eme ka ịkwaga zcashd config / wallet dị na Zallet

## Ihe gbanwere site na ntuziaka ochie ahụ.
Ntuziaka gara aga nke ndu a na-agafe site n'ịchịkọta ** zcashd** natively on Pi 4  otu nchịkọta ihe ntinye ederede nke were 3 × 4 awa n'ihi na Pi 4 enweghị ebe nchekwa zuru ezu maka usoro yiri ya (`-j$(nproc)`) build. Zebra and Zallet both now ship **official pre-built ARM64 binaries and Docker images**, so in most cases you no longer need to compile anything from source on the Pi itself.

## Ihe ndị a chọrọ iji mee ya bụ:
- Raspberry Pi 4 (Rịọrọ RAM nke GB ma ọ bụ karịa)
- Kaadị microSD (32 GB +) maka OS
- Mpụga SSD / HDD na nkwado USB 3.0  ** Zebra chọrọ ihe dịka 300 GB maka data Mainnet echekwara**, nke na-etolite oge niile, yabụ anwala ịgba ọsọ a site na kaadị microSD naanị gị.
- Kọmputa nwere oghere kaadị microSD (iji gosipụta onyinyo OS)
- Njikọ Ethernet wired ma ọ bụ Wi-Fi .
- Ntọala nkasi obi na akara iwu n'elu SSH

## Nzọụkwụ 1: Flash Ubuntu Server 22.04+ (64-bit)
Zebra na Zallet's pre-built binaries and Docker images chọrọ **glibc 2.34+**, nke pụtara **Ubuntu Server 22.04 ma ọ bụ ọhụrụ (64-bit/aarch64) **.

1. Wụnye Raspberry Pi Imager na kọmputa gị.
2. Tinye kaadị microSD gị.
3. Họrọ **Other general-purpose OS → Ubuntu → Ubuntu Server 22.04 LTS (64-bit)** (ma ọ bụ ọhụrụ).
4. Jiri nhọrọ dị elu nke Imager (akara ngosi) iji hazie aha nnabata, mee ka SSH rụọ ọrụ ma tọọ nzere Wi-Fi ọ bụrụ na achọrọ ya, maka isi mmalite mbụ.
5. Dee ihe oyiyi ahụ, tinye kaadị ahụ ma gbanye Pi.
6. SSH na: `ssh <username>@<pi-hostname-or-ip>`

## Nzọụkwụ 2: Tinye ma tinye nchekwa mpụga.
1. Jikọọ SSD / HDD gị dị na mpụga site na USB 3.0.
2. Chọpụta ngwaọrụ: `lsblk`
3. Ọkpụkpọ (ma ọ bụrụ na ọhụrụ) ma tinye ya, dịka ọmụmaatụ iji: `/mnt/zcash-data`, na a ọkọlọtọ `mkfs`/`fstab` setup ka ọ na-akpaghị aka arụnyere mgbe a maliteghachiri.

## Nzọụkwụ 3: Melite usoro ahụ
```bash
sudo apt update && sudo apt full-upgrade -y
sudo reboot
```

## Nzọụkwụ 4: Wụnye ma na-agba ọsọ Zebra
### Nhọrọ A  Docker (akwadoro)
```bash
sudo apt install -y docker.io
sudo usermod -aG docker $USER   # log out/in after this
docker run -d \
  --name zebra \
  -p 8233:8233 \
  -v /mnt/zcash-data/zebra:/home/zebra/.cache/zebra \
  zfnd/zebra:latest
```
Lelee ọganihu: `docker logs -f zebra`

### Nhọrọ B  Pre-wuru binary site ibu binstall
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source "$HOME/.cargo/env"
cargo install cargo-binstall
cargo binstall zebrad
zebrad start
```
Nke a na-etinye ihe eji arụ ọrụ tupu oge eruo. `aarch64` ọnụọgụ abụọ  enweghị nchịkọta achọrọ.

**Na oge sync:** na-atụ anya nke a iji were obere oge  ọnụ ọgụgụ mbụ e hotara (ihe dị ka awa 2) sitere na ngwaike ntụle bụ ihe siri ike karịa CPU Pi 4, yabụ ezigbo oge ịmekọrịta gị n'ezie ga - adị ogologo.

## Nzọụkwụ 5: Wụnye Zallet
Zallet nọ ugbu a na **alpha**  chere mgbanwe ndị ga-emebi, ma ghara ile ya anya dị ka nchekwa maka mmepụta nke ọma.

### Nhọrọ A  Docker (akwadoro)
```bash
docker pull zodlinc/zallet:latest
```
This image supports ARM64 (via a Nix-based build) and runs from a minimal, shell-less filesystem — pass configuration and data paths explicitly via `--datadir` na olu mounts (lee Nzọụkwụ 6).

### Nhọrọ B  Wụpụta site na isi iyi
```bash
# Requires Rust 1.85+ (see Step 4B for rustup install)
sudo apt install -y clang libclang-dev protobuf-compiler
cargo install --locked --git https://github.com/zcash/wallet.git
```
A naghị ebipụta igbe Zallet na crates.io n'oge oge alpha, yabụ ịwụnye site na git repo ozugbo bụ usoro akwadoghị Docker.

## Nzọụkwụ 6: Hazie Zallet
Mepụta ihe . `zallet.toml` na dataadir ị họọrọ (dịka. `/mnt/zcash-data/zallet`):
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
Gbanwee . `validator_address` ma ọ bụrụ na Zebra agba ọsọ n'elu ihe dị iche / ọdụ ụgbọ mmiri, wee hazie ya `validator_cookie_auth`/`validator_user`/`validator_password` n'okpuru `[indexer]` iji kwekọọ na Zebra RPC gị.

** Ị na-esi zcashd?** Ọ bụrụ n'ị ka nwere otu agadi gị, ị ga-eji ya mee ihe. `zcash.conf`:
```bash
zallet migrate-zcash-conf --datadir /path/to/old/zcashd/datadir -o /mnt/zcash-data/zallet/zallet.toml
```

## Nzọụkwụ 7: Tinye koodu mkpuchi akpa ego gị n'ọrụ.
Zallet na-eji ihe niile dị mkpa eji eme ihe site n'iji `age`/`rage`:
```bash
cargo install rage
rage -p -o /mnt/zcash-data/zallet/encryption-identity.txt <(rage-keygen)
```
Nke a na-ebipụta igodo ọha na paswọọdụ akpaaka  ** chekwaa passphrase; ị pụghị iweghachite faịlụ njirimara n'enweghị ya.**

## Nzọụkwụ 8: Bido ma malite obere akpa ahụ
```bash
zallet -d /mnt/zcash-data/zallet init-wallet-encryption
zallet -d /mnt/zcash-data/zallet generate-mnemonic
```
**Naanị ịgba ọsọ** `generate-mnemonic` otu ugboro** ma ọ bụrụ na ị kpachapụrụ anya chọrọ ọtụtụ mgbọrọgwụ mmefu onwe ha.

```bash
zallet -d /mnt/zcash-data/zallet start
```

## Nzọụkwụ 9: Ịkwaga obere akpa zcashd dị (nhọrọ)
```bash
zallet -d /mnt/zcash-data/zallet migrate-zcashd-wallet --zcashd-datadir /path/to/old/zcashd/datadir
```
Nke a chọrọ ka ndị na-eme ihe nkiri ahụ. `db_dump` ihe eji eme (wuru megide Berkeley DB 6.2.23)  site na ntinye usoro ma ọ bụ isi iyi nke zcashd. Ọ bụrụ na ị nwekwaghị zcashD arụnyere, nke a bụ otu nzọụkwụ mbugharị ahụ adịghị ezu n'onwe ya na Zallet ka dị ugbu a.

## Nzọụkwụ 10: Nyochaa ihe niile na-arụ ọrụ
```bash
zallet -d /mnt/zcash-data/zallet help
```
Nyochaa na obere akpa ahụ zara, ma ozugbo Zebra mechara mmekọrịta ya, nke ga-eme ka ego/adreesị kwekọọ n'ihe ndị a tụrụ anya.

## Nchọpụta nsogbu
- **Zebra build/runtime issues on ARM:** if building from source, install the Rust ARM toolchain — running x86_64 build tools on ARM hardware will run noticeably slower, per Zebra's own documentation.
- ** Nchekwa na-ejupụta:** Zebra's ~ 300 GB footprint keeps growing  plan headroom.
- **Ihie ikikere Docker:** wepu aha/banyeghachi mgbe ị gbakwunyere onye ọrụ gị na ngalaba ahụ. `docker` otu, ma ọ bụ iji ya eme ihe. `sudo` ka ọ dịgodị.
- ** Ihe nkedo Zallet enweghị mkpuchi:** onye ọrụ gọọmenti ahụ. `zodlinc/zallet` ihe oyiyi bụ site na ncha site n'imepụta  mgbe niile gafere `--datadir` n'ụzọ doro anya ma tinye akwụkwọ ndekọ data gị dị ka mpịakọta.

## Ihe edeturu ngwaike vs. akwụkwọ ntuziaka ochie zcashd
Zebra and Zallet are generally lighter on CPU during setup than compiling zcashd was, since you're running pre-built binaries/containers. 4 GB RAM is a reasonable starting point; monitor with `htop` ma tụlee 8 GB Pi 4 variant ọ bụrụ na ị hụ nnukwu swapping.

## Ihe ndị ọzọ e ji enyere ndụ aka
- [Akwụkwọ Zebra]](https://zebra.zfnd.org)  akwụkwọ ndị ọrụ Zebra
- [Akwụkwọ Zallet]](https://zcash.github.io/wallet)  akwụkwọ akụkọ Zallet na-ekwu maka ya.
- [zcashd End-of-Support notice](https://z.cash/support/zcashd-deprecation)

---

*If you found this guide useful, consider supporting ZecHub: [insert current ZecHub donation shielded address from zechub.wiki/donation — not included here since I couldn't verify it's still current].*
