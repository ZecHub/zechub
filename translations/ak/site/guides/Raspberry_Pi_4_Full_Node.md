# Fa Node a Ɛyɛ Pɛ no di dwuma wɔ Raspberry Pi 4 (Zebra + Zallet) so .

*Wɔtu firii mfitiaseɛ zcashd-gyina akwankyerɛ no so. zcashd duu ne automatic End-of-Support gyinabea wɔ July 18, 2026, enti mprempren akwankyerɛ yi de **Zebra** (mprempren node a ɛyɛ ma, a Zcash Foundation na ɛhwɛ so) ne **Zallet** (sika kotoku a wɔasi sɛ wɔde besi zcashd sika kotoku a wɔde ahyɛ mu ananmu) di dwuma.*

## Nea wubesua
- Sɛnea wobɛ flash na woasiesie Ubuntu Server 22.04+ (64-bit) wɔ Raspberry Pi 4 so ama wode adi dwuma a wonni ti
- Sɛnea wobɛhyehyɛ na woayɛ Zebra, denam Docker anaa binary a wɔadi kan ayɛ so
- Sɛnea wobɛhyehyɛ, asiesie, na woahyɛ Zallet ase, a wallet encryption nhyehyɛe ka ho
- Sɛnea wobɛpaw sɛ wobɛtu zcashd config/wallet a ɛwɔ hɔ dedaw no akɔ Zallet mu

## Nea ɛsakrae fii akwankyerɛfo dedaw no ho
Akwankyerɛ yi a atwam no nantew faa **zcashd** a wɔboaboaa ano no mu natively wɔ Pi 4 — a ɛyɛ biako-threaded compile a egyee nnɔnhwerew 3–4 efisɛ Pi 4 no nni memory a ɛdɔɔso mma parallel (`-j$(nproc)`) si. Zebra ne Zallet nyinaa mprempren de **official pre-built ARM64 binaries ne Docker images** mena, enti wɔ nsɛm dodow no ara mu no, ɛho nhia bio sɛ ​​wobɛboaboa biribiara ano afi fibea wɔ Pi no ankasa so.

## Nneɛma a ɛsɛ sɛ wodi kan yɛ
- Raspberry Pi 4 (wɔkamfo 4 GB RAM anaa nea ɛboro saa kyerɛ) .
- MicroSD kaad (32 GB+) a wɔde yɛ OS no
- Abɔnten SSD/HDD a USB 3.0 mmoa — **Zebra hia bɛyɛ 300 GB ma Cached Mainnet data**, ɛrenyin bere tenten, enti mmɔ mmɔden sɛ wobɛtu eyi afi microSD kaad no nkutoo so
- Kɔmputa a ɛwɔ microSD card slot (a ɛbɛma OS mfonini no ayɛ flash) .
- Ethernet nkitahodi a wɔde nhama ayɛ anaa Wi-Fi
- Mfitiaseɛ ahotɔ ne ahyɛdeɛ kwan a ɛwɔ SSH so

## Anamɔn 1: Flash Ubuntu Server 22.04 + (64-bit) .
Zebra ne Zallet binaries a wɔadi kan ayɛ ne Docker mfonini ahorow no hwehwɛ **glibc 2.34+**, a ɛkyerɛ sɛ **Ubuntu Server 22.04 anaa foforo (64-bit/aarch64)**.

1. Fa Raspberry Pi Imager no hyɛ wo kɔmputa titiriw no so.
2. Fa wo microSD kaad no hyɛ mu.
3. Paw **OS foforo a wɔde di dwuma wɔ ɔkwan a ɛkɔ akyiri so → Ubuntu → Ubuntu Server 22.04 LTS (64-bit)** (anaasɛ foforo).
4. Fa Imager no advanced options (gear icon) di kan hyehyɛ hostname, ma SSH nyɛ adwuma, na hyehyɛ Wi-Fi credentials sɛ ɛho hia a, ma headless first boot.
5. Kyerɛw mfonini no, fa kaad no hyɛ mu, fa ahoɔden hyɛ Pi no so.
6. SSH wɔ: `ssh <username>@<pi-hostname-or-ip>`

## Anamɔn 2: Fa abɔnten so nneɛma akorae no bata ho na fa hyɛ so
1. Fa USB 3.0 so fa wo abɔnten SSD/HDD no bata ho.
2. Kyerɛ mfiri no: `lsblk`
3. Format (sɛ foforo a) na fa mount, s.e. kɔ `/mnt/zcash-data`, a ɛwɔ gyinapɛn bi `mkfs`/`fstab` setup enti ɛyɛ auto-mounts wɔ reboot so.

## Anamɔn 3: Yɛ nhyehyɛe no foforo
```bash
sudo apt update && sudo apt full-upgrade -y
sudo reboot
```

## Anamɔn 4: Fa Zebra hyɛ mu na fa di dwuma
### Ɔkwan A — Docker (wɔkamfo kyerɛ) .
```bash
sudo apt install -y docker.io
sudo usermod -aG docker $USER   # log out/in after this
docker run -d \
  --name zebra \
  -p 8233:8233 \
  -v /mnt/zcash-data/zebra:/home/zebra/.cache/zebra \
  zfnd/zebra:latest
```
Hwɛ nkɔso a ɛrekɔ so: `docker logs -f zebra`

### Option B — Wɔadi kan asi binary denam cargo binstall so
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source "$HOME/.cargo/env"
cargo install cargo-binstall
cargo binstall zebrad
zebrad start
```
Eyi de nea wɔadi kan asi no hyɛ mu `aarch64` binary — ɛho nhia sɛ wɔboaboa ano.

**Wɔ sync bere so:** hwɛ kwan sɛ eyi begye bere kakra — akontaabu a wɔtaa fa ka ho asɛm a edi kan-sync (bɛyɛ nnɔnhwerew 2) fi reference hardware a ahoɔden wom sen Pi 4 CPU, enti ɛda adi sɛ wo sync bere ankasa wɔ Pi 4 hardware ankasa so no bɛkɔ so akyɛ.

## Anamɔn 5: Fa Zallet hyɛ mu
Zallet mprempren wɔ **alpha** — hwɛ kwan sɛ ɛbɛbubu nsakrae, na mfa no sɛ production-ready custody ma sika a ɛho hia de besi nnɛ.

### Ɔkwan A — Docker (wɔkamfo kyerɛ) .
```bash
docker pull zodlinc/zallet:latest
```
Saa mfonini yi boa ARM64 (ɛnam Nix-based build so) na ɛtu mmirika firi minimal, shell-less filesystem — pass nhyehyeɛ ne data akwan pefee fa `--datadir` ne volume mounts (hwɛ Anammɔn 6).

### Option B — Si fi fibea
```bash
# Requires Rust 1.85+ (see Step 4B for rustup install)
sudo apt install -y clang libclang-dev protobuf-compiler
cargo install --locked --git https://github.com/zcash/wallet.git
```
Zallet crates no nnya ntintimii wɔ crates.io wɔ alpha phase no mu, enti instɔlehyɛn a efi git repo no mu tẽẽ ne ɔkwan a ɛnyɛ Docker a wɔboa.

## Anamɔn 6: Hyehyɛ Zallet
Yɛ `zallet.toml` wɔ datadir a woapaw no mu (e.g. `/mnt/zcash-data/zallet`):
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
Dane mu `validator_address` sɛ Zebra tu mmirika wɔ host/port soronko so a, na hyehyɛ `validator_cookie_auth`/`validator_user`/`validator_password` aseɛ `[indexer]` sɛnea ɛbɛyɛ a ɛne wo Zebra RPC auth nhyehyɛe no bɛyɛ pɛ.

**Migrating from zcashd?** Sɛ woda so ara wɔ dedaw bi a `zcash.conf`:
```bash
zallet migrate-zcash-conf --datadir /path/to/old/zcashd/datadir -o /mnt/zcash-data/zallet/zallet.toml
```

## Anamɔn 7: Siesie sika kotoku mu encryption
Zallet de encrypts nneɛma atitiriw nyinaa a wɔde di dwuma `age`/`rage`:
```bash
cargo install rage
rage -p -o /mnt/zcash-data/zallet/encryption-identity.txt <(rage-keygen)
```
Wei tintim ɔmanfoɔ safoa ne passphrase a wɔayɛ no ankasa — **kora passphrase no so; worentumi nsan nnya identity file no a enni hɔ.**

## Anamɔn 8: Fi ase na fi ase sika kotoku no
```bash
zallet -d /mnt/zcash-data/zallet init-wallet-encryption
zallet -d /mnt/zcash-data/zallet generate-mnemonic
```
**Mmirikatu nkutoo `generate-mnemonic` pɛnkoro** gye sɛ wohyɛ da pɛ sɛ wonya sika a wɔsɛe no ntini pii a ɛde ne ho.

```bash
zallet -d /mnt/zcash-data/zallet start
```

## Step 9: Migrating an existing zcashd wallet (optional)
```bash
zallet -d /mnt/zcash-data/zallet migrate-zcashd-wallet --zcashd-datadir /path/to/old/zcashd/datadir
```
Eyi hwehwɛ sɛ... `db_dump` utility (wɔasi atia Berkeley DB 6.2.23) — firi system install anaa local source-build a ɛwɔ zcashd mu. Sɛ wo nni zcashd a wɔde ahyɛ mu bio a, eyi ne tu a wotu kɔ baabi foforo a ennya nyɛɛ ne ho koraa wɔ Zallet mu de besi nnɛ.

## Anamɔn 10: Hwɛ sɛ biribiara yɛ adwuma
```bash
zallet -d /mnt/zcash-data/zallet help
```
Si so dua sɛ sika kotoku no bua, na sɛ Zebra wie syncing a, sɛ balances/addresses ne akwanhwɛ hyia.

## Ɔhaw ahorow a wodi ho dwuma
- **Zebra build/runtime nsɛm wɔ ARM:** sɛ wosi fi fibea a, instɔl Rust ARM toolchain — sɛ wode x86_64 build tools di dwuma wɔ ARM hardware so a, ɛbɛkɔ so brɛoo a ɛda adi, sɛnea Zebra ankasa nkrataa kyerɛ.
- **Storage filling up:** Zebra ~300 GB nan ase kɔ so nyin — nhyehyɛe headroom.
- **Docker kwan mfomso:** fi mu/san kɔ mu bere a wode wo dwumadie no aka ho awie no `docker` kuw, anaa fa di dwuma `sudo` wɔ saa bere yi mu.
- **Zallet container no nni shell:** ɔpanyin no `zodlinc/zallet` mfonini no fi-mfiase denam nhyehyɛe so — bere nyinaa twam `--datadir` pefee na fa wo data directory no mount sɛ volume.

## Hardware nsɛm vs. dedaw no zcashd akwankyerɛ
Zebra ne Zallet taa yɛ hare wɔ CPU so bere a wɔreyɛ nhyehyɛe sen sɛnea na zcashd a wɔboaboa ano no te, efisɛ woreyɛ binaries/containers a wɔadi kan asi. 4 GB RAM yɛ mfiase a ntease wom; monitor ne `htop` na susuw 8 GB Pi 4 variant no ho sɛ wuhu heavy swapping a.

## Nneɛma foforo a wɔde bɛyɛ adwuma
- [Zebra Book](https://zebra.zfnd.org) — Zebra nkrataa a ɛyɛ aban de
- [Zallet Nhoma no](https://zcash.github.io/wallet) — Zallet ho nkrataa a ɛyɛ aban de
- [zcashd Mmoa Awieeɛ ho amanneɛbɔ](https://z.cash/support/zcashd-deprecation)

---

*Sɛ wuhu sɛ akwankyerɛ yi ho wɔ mfaso a, susuw ho sɛ wobɛboa ZecHub: [insert current ZecHub donation shielded address from zechub.wiki/donation — wɔmfa nka ho wɔ ha efisɛ mantumi anhwɛ sɛ ɛda so ara yɛ mprempren].*
