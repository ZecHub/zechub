# Gbaa Full Node na Raspberry Pi 4 (Zebra + Zallet)

*E si na nduzi mbụ dabere na zcashd kwaga ebe a. zcashd rutere nkwụsị Nkwado Akpaaka ya na Julaị 18, 2026, ya mere nduzi a ugbu a na-eji **Zebra** (full node dị ugbu a, nke Zcash Foundation na-elekọta) na **Zallet** (e-akpa ego [wallet] e wuru iji dochie e-akpa ego arụnyere n'ime zcashd).*

## Ihe ị ga-amụta
- Otu esi ede ma hazie Ubuntu Server 22.04+ (64-bit) na Raspberry Pi 4 maka iji ya na-enweghị ihuenyo
- Otu esi arụnye ma gbaa Zebra, ma ọ bụ site na Docker ma ọ bụ binary e wurula
- Otu esi arụnye, hazie, ma malite Zallet, gụnyere nhazi Nzobe ederede [encryption] e-akpa ego
- Otu esi, ma ọ bụrụ na achọrọ, kwaga config/e-akpa ego zcashd dị adị banye na Zallet

## Ihe gbanwere site na nduzi ochie
Ụdị nduzi a gara aga kọwara otu esi achịkọta **zcashd** ozugbo na Pi 4 — nchịkọta otu-thread nke were awa 3–4 n'ihi na Pi 4 enweghị ebe nchekwa zuru ezu maka nrụpụta n'otu oge (`-j$(nproc)`). Zebra na Zallet abụọ na-ebupụta ugbu a **ARM64 binaries na Docker images** e wuru tupu oge eruo n’ọrụ, ya mere n’ọtụtụ ọnọdụ ịkwesighizi ịchịkọta ihe ọ bụla site na source na Pi n’onwe ya.

## Ihe achọrọ tupu ịmalite
- Raspberry Pi 4 (a na-atụ aro RAM 4 GB ma ọ bụ karịa)
- Kaadị microSD (32 GB+) maka OS
- SSD/HDD mpụga nwere nkwado USB 3.0 — **Zebra chọrọ ihe dị ka 300 GB maka data Mainnet echekwara cache**, nke na-abawanye ka oge na-aga, ya mere anwala iji naanị kaadị microSD gbaa ya
- Kọmputa nwere oghere kaadị microSD (iji dee image OS)
- Njikọ Ethernet waya ma ọ bụ Wi-Fi
- Ịmara isi iwu command line site na SSH

## Nzọụkwụ 1: Dee Ubuntu Server 22.04+ (64-bit)
Binaries e wuru tupu oge eruo na Zebra na Zallet na images Docker chọrọ **glibc 2.34+**, nke pụtara **Ubuntu Server 22.04 ma ọ bụ nke ọhụrụ (64-bit/aarch64)**.

1. Wụnye Raspberry Pi Imager na kọmputa gị bụ isi.
2. Tinye kaadị microSD gị.
3. Họrọ **Other general-purpose OS → Ubuntu → Ubuntu Server 22.04 LTS (64-bit)** (ma ọ bụ nke ọhụrụ).
4. Jiri nhọrọ dị elu nke Imager (akara gear) hazie hostname tupu oge eruo, mee SSH ka ọ rụọ ọrụ, ma setịpụ credentials Wi-Fi ma ọ dị mkpa, maka mbido mbụ na-enweghị ihuenyo.
5. Dee image ahụ, tinye kaadị ahụ, gbanye Pi.
6. Jikọọ site na SSH: `ssh <username>@<pi-hostname-or-ip>`

## Nzọụkwụ 2: Tinye ma mount nchekwa mpụga
1. Jikọọ SSD/HDD mpụga gị site na USB 3.0.
2. Chọpụta ngwaọrụ ahụ: `lsblk`
3. Hazie ya (ọ bụrụ na ọ dị ọhụrụ) ma mount ya, dịka ọmụmaatụ na `/mnt/zcash-data`, site na nhazi `mkfs`/`fstab` nkịtị ka ọ mount onwe ya mgbe reboot gasịrị.

## Nzọụkwụ 3: Melite sistemụ
```bash
sudo apt update && sudo apt full-upgrade -y
sudo reboot
```

## Nzọụkwụ 4: Wụnye ma gbaa Zebra
### Nhọrọ A — Docker (a na-atụ aro)
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

### Nhọrọ B — Binary e wuru tupu oge eruo site na cargo binstall
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source "$HOME/.cargo/env"
cargo install cargo-binstall
cargo binstall zebrad
zebrad start
```
Nke a na-arụnye binary `aarch64` e wuru tupu oge eruo — ọ dịghị mkpa ịchịkọta ya.

**Banyere oge sync:** tụrụ anya na nke a ga-ewe oge — ọnụ ọgụgụ a na-ekwukarị maka sync mbụ (ihe dị ka awa 2) sitere na hardware ntụaka nke siri ike karịa CPU Pi 4, ya mere oge sync gị n’ezi hardware Pi 4 ga-adịkarị ogologo karịa nke ahụ.

## Nzọụkwụ 5: Wụnye Zallet
Zallet nọ ugbu a na **alpha** — tụrụ anya mgbanwe ndị na-emebi ndakọrịta, ekwesịghịkwa ile ya anya dịka Onye nlekota [custodial] dị njikere maka mmepụta maka nnukwu ego ugbu a.

### Nhọrọ A — Docker (a na-atụ aro)
```bash
docker pull zodlinc/zallet:latest
```
Image a na-akwado ARM64 (site na nrụpụta dabere na Nix) ma na-agba site na filesystem kacha nta na-enweghị shell — nyefee ụzọ config na data kpọmkwem site na `--datadir` na volume mounts (lee Nzọụkwụ 6).

### Nhọrọ B — Wuo site na source
```bash
# Requires Rust 1.85+ (see Step 4B for rustup install)
sudo apt install -y clang libclang-dev protobuf-compiler
cargo install --locked --git https://github.com/zcash/wallet.git
```
E bipụtabeghị crates Zallet na crates.io n'oge alpha, ya mere ịwụnye ozugbo site na git repo bụ usoro na-abụghị Docker a kwadoro.

## Nzọụkwụ 6: Hazie Zallet
Mepụta `zallet.toml` n'ime datadir ị họọrọ (dịka ọmụmaatụ, `/mnt/zcash-data/zallet`):
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
Gbanwee `validator_address` ma ọ bụrụ na Zebra na-agba na host/port dị iche, ma hazie `validator_cookie_auth`/`validator_user`/`validator_password` n'okpuru `[indexer]` ka ha kwekọọ na nhazi RPC auth Zebra gị.

**Ị na-akwaga site na zcashd?** Ọ bụrụ na ị ka nwere `zcash.conf` ochie:
```bash
zallet migrate-zcash-conf --datadir /path/to/old/zcashd/datadir -o /mnt/zcash-data/zallet/zallet.toml
```

## Nzọụkwụ 7: Hazie Nzobe ederede e-akpa ego
Zallet na-ezobe key material niile site na `age`/`rage`:
```bash
cargo install rage
rage -p -o /mnt/zcash-data/zallet/encryption-identity.txt <(rage-keygen)
```
Nke a na-ebipụta public key na passphrase a mepụtara akpaghị aka — **chekwaa passphrase ahụ; ị pụghị iweghachite identity file na-enweghị ya.**

## Nzọụkwụ 8: Malite ma gbaa e-akpa ego
```bash
zallet -d /mnt/zcash-data/zallet init-wallet-encryption
zallet -d /mnt/zcash-data/zallet generate-mnemonic
```
**Gbaa `generate-mnemonic` naanị otu ugboro** ma ọ bụrụ na ị chọghị kpachaara anya inwe ọtụtụ spending roots ndị nọọrọ onwe ha.

```bash
zallet -d /mnt/zcash-data/zallet start
```

## Nzọụkwụ 9: Ịkwaga e-akpa ego zcashd dị adị (nhọrọ)
```bash
zallet -d /mnt/zcash-data/zallet migrate-zcashd-wallet --zcashd-datadir /path/to/old/zcashd/datadir
```
Nke a chọrọ utility `db_dump` (e wuru megide Berkeley DB 6.2.23) — site na nrụnye sistemụ ma ọ bụ source-build mpaghara nke zcashd. Ọ bụrụ na ị nwekwaghị zcashd arụnyere, nke a bụ otu nzọụkwụ ịkwaga nke na-adịbeghị onwe ya kpamkpam n'ime Zallet.

## Nzọụkwụ 10: Kwenye na ihe niile na-arụ ọrụ
```bash
zallet -d /mnt/zcash-data/zallet help
```
Kwenye na e-akpa ego na-aza, na mgbe Zebra mechara sync, na balances/addresses kwekọrọ na ihe ị tụrụ anya ya.

## Ịgwọ nsogbu
- **Nsogbu build/runtime Zebra na ARM:** ọ bụrụ na ị na-ewu site na source, wụnye ARM toolchain Rust — ịgba ngwá ọrụ build x86_64 na hardware ARM ga-adị nwayọ nke ukwuu, dịka akwụkwọ Zebra n’onwe ya si kwuo.
- **Nchekwa na-ejupụta:** footprint Zebra nke ihe dị ka 300 GB na-aga n'ihu na-eto — mee atụmatụ maka ohere fọdụrụ.
- **Njehie ikike Docker:** pụọ ma banye ọzọ mgbe itinyere onye ọrụ gị n’otu `docker`, ma ọ bụ jiri `sudo` nwa oge.
- **Container Zallet enweghị shell:** image `zodlinc/zallet` gọọmentị sitere na scratch n'ebumnobi — na-enyefe `--datadir` mgbe niile kpọmkwem ma mount datadir gị dị ka volume.

## Ndetu hardware ma e jiri ya tụnyere nduzi zcashd ochie
Zebra na Zallet na-adịkarị mfe na CPU n'oge nhazi karịa ịchịkọta zcashd, ebe ị na-agba binaries/containers e wuru tupu oge eruo. RAM 4 GB bụ mmalite kwesịrị ekwesị; jiri `htop` nyochaa ma tụlee ụdị Pi 4 8 GB ma ọ bụrụ na ị hụ swapping dị ukwuu.

## Akụrụngwa ndị ọzọ
- [Zebra Book](https://zebra.zfnd.org) — akwụkwọ Zebra gọọmentị
- [Zallet Book](https://zcash.github.io/zallet/) — akwụkwọ Zallet gọọmentị
- [zcashd Ọkwa Nkwụsị Nkwado](https://z.cash/support/zcashd-deprecation)

---

*Ọ bụrụ na nduzi a bara gị uru, tụlee ịkwado ZecHub: [tinye Adreesị akpa ego nke e chebere echebe [shielded] maka onyinye ZecHub dị ugbu a sitere na zechub.wiki/donation — etinyeghị ya ebe a n'ihi na enweghị m ike ikwenye na ọ ka dị ugbu a].*
