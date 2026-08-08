# Zã Ŋkuléle Ðe Nuwo Ŋu le Raspberry Pi 4 (Zebra + Zallet) dzi

*Tso zcashd-mɔ̃ gbãtɔ me. Zcashd va ɖo eƒe Automatic End of Support stop le July 18, 2026, eyata mɔ̃ sia zãa **Zebra** (mɔa ƒe nu blibo si dzi Zcash Foundation lé ɖe asi) kple **Zallet** (kɔntabugbɔgafe si wotu be wòaxɔ na zcash d's built in wallet).*

## Nu si nàsrɔ̃ le emee nye be:
- Alesi nàtsɔ Ubuntu Server 22.04+ (64-bit) awɔ flash eye nàwɔe le Raspberry Pi 4 dzi be wòazã ta manɔmee
- Alesi nàdze Zebra zazã gɔme, to Docker alo mɔ̃ si wowɔ xoxo dzi
- Alesi nàdze Zallet zazã gɔme, alesi nàwɔe kple ale si nàdzidze egɔme la le akpa sia.
- Alesi woatrɔ asi le zcashd ƒe configuration/wallet si li xoxo ŋu ayi Zallet me la enye eƒe tiatiawɔƒe.

## Nu kae trɔ tso mɔfiamegbalẽ xoxoa gbɔ?
Mɔfiagbalẽ sia ƒe gɔmeɖeɖe si do ŋgɔ la fia alesi woaƒo zcashd ɖe Pi 4 dzii  enye nuƒola ɖeka tɔ, eye esia xɔ gaƒoƒo 3 x4 elabena susu mele Pi 4 ŋu be wòatsɔ awɔ parallel (`-j$(nproc)`Zebra kple Zallet siaa tsɔa ARM64 ŋɔŋlɔdzesi eve siwo wowɔ xoxo la kpakple Docker nɔnɔmetatawo yia asitelefon dzi, eyata le go geɖe me la megahiã be nàƒo nu tso nusianu ŋu tso afisi wòtso va Pi ŋutɔ gbɔ o.

## Nusiwo Nɔa Vevie na Ame Si Wonyee
- Raspberry Pi 4 (woaɖo aɖaŋu be woaŋlɔ RAM si ƒe lolome le GB 4 alo esi wu nenema)
- microSD kaɖiti (32 GB+) na OS la
- SSD/HDD si le gota kple USB 3.0  ** Zebra hiã abe 300 GB ene na Mainnet data siwo woɣla**, eye wòyina ɖe edzi ne ɣeyiɣiawo va yina, eyata mègadze agbagba be yeazã microSD kaɖidɔa ɖeɖe ko o
- Kɔmpiuta si me microSD-kadodo ƒe teƒe le (si nana be OS nɔnɔmetata la nɔa keklẽm)
- Ethernet alo Wi-Fi si ŋu ka le la ƒe kadodoe.
- Aƒeme ƒe akɔdzeanyi kple SSH dzi mɔ̃a ŋu dɔ wɔwɔ nyuie

## Afɔ 1: Flash Ubuntu Server 22.04+ (64-bit)
Zebra kple Zallet ƒe binary siwo wodzrana do ŋgɔ kpakple Docker nɔnɔmetatawo bia **glibc 2.34+**, si fia be **Ubuntu Server 22.04 alo yeye wu (64-bit/aarch64) **.

1. Ðo Raspberry Pi Imager ɖe wò kɔmpiuta gãa dzi.
2. Tsɔ wò microSD-ƒonɔamesi la de eme.
3. Tia ** General-purpose OS bubu → Ubuntu → Ubuntu Server 22.04 LTS (64-bit)** (alo yeye wu).
4. Zã Imager ƒe ŋgɔyiyiwo (gear icon) be nàtsɔ awɔ hostname, na SSH eye ne ehiã la ɖo Wi-Fi ŋuti nyatakakawo le headless gbãtɔ me.
5. Ŋlɔ nɔnɔmetata la ɖe eme, tsɔ kaɖidɔa de eme eye nàtsɔ Pi-a ade dɔwɔwɔ me.
6. SSH le: `ssh <username>@<pi-hostname-or-ip>`

## Afɔɖeɖe 2: Do Ŋgɔdzraɖoƒea Ðe Go Eye Nàtsɔe Akeke Nuwo Ðo
1. Ƒo wò SSD/HDD si le gota la ɖe USB 3.0 dzi.
2. De dzesi mɔ̃a: `lsblk`
3. Ðoɖo (ne yeyee) eye nàtsɔe, le kpɔɖeŋu me be: `/mnt/zcash-data`, si ƒe dzidzenu le ɖeka. `mkfs`/`fstab` Edzena le eɖokui si ne èdze egɔme.

## Afɔɖeɖe 3: Wɔ ɖoɖo ɖe wò nyatakakawo ŋu.
```bash
sudo apt update && sudo apt full-upgrade -y
sudo reboot
```

## Afɔɖeɖe 4: Ðo Zebra ɖo eye nàzãe.
### Tiatia A  Docker (woaɖo aɖaŋu nɛ)
```bash
sudo apt install -y docker.io
sudo usermod -aG docker $USER   # log out/in after this
docker run -d \
  --name zebra \
  -p 8233:8233 \
  -v /mnt/zcash-data/zebra:/home/zebra/.cache/zebra \
  zfnd/zebra:latest
```
Kpɔ ŋgɔyiyi si wɔm nèle la ɖa: `docker logs -f zebra`

### Etsɔtsotso B  Nuƒle si wodzra ɖo ɖi to agbawo ƒe nudzraɖoƒe dzi.
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source "$HOME/.cargo/env"
cargo install cargo-binstall
cargo binstall zebrad
zebrad start
```
Esia hea nu si wotsɔ ɖo anyi xoxo la ɖe emee. `aarch64` binary  womebia be woaƒo wo nu ƒu o.

**Ne èle ɣeyiɣi ɖeka me:** àkpɔ mɔ be esia axɔ ɣeyiɣi aɖe  Zi geɖe la, nyatakaka siwo wogblɔna tso ɣeaɖeɣi ƒe akpa gbãtɔ ŋu (si anɔ abe gaƒoƒo 2) tsoa nuƒomɔ̃ si de ŋgɔ wu Pi 4 ƒe CPU gbɔ. Eya ta ne èzãa Nuƒomɔnu ŋutɔŋutɔ le wò Pi 4 dzi la, ɖewohĩ eƒe didime awu nenema ke.

## Afɔɖeɖe 5: Ðo Zallet Ðe Te
Zallet le **alpha** me fifia  nɔ mɔ kpɔm na tɔtrɔ gãwo, eye mègabu eŋu be enye ga gbogbo aɖe si woate ŋu akpɔ.

### Tiatia A  Docker (woaɖo aɖaŋu nɛ)
```bash
docker pull zodlinc/zallet:latest
```
Nɔnɔmetata sia doa ARM64 (to Nix-based build dzi) eye wòzɔna tso file system si me nu sue aɖe le, siwo ŋu kpe aɖeke mele o  tsɔ ɖoɖo kple nyatakakadzraɖoƒewo to mɔ ɖeka koŋ dzi. `--datadir` kple gbeɖiɖi ƒe ŋusẽkpɔɖeamedziwo (Kpɔ Afɔɖeɖe 6).

### Tiatia B  Wɔ tso dzɔtsoƒe dzi
```bash
# Requires Rust 1.85+ (see Step 4B for rustup install)
sudo apt install -y clang libclang-dev protobuf-compiler
cargo install --locked --git https://github.com/zcash/wallet.git
```
Zallet ƒe aɖakawo meʋu ɖe crates.io dzi haɖe le alpha-ɣeyiɣi o, eyata fififi tso git repo tẽe nye mɔ si womezãna na Docker o la.

## Afɔɖeɖe 6: Ðoɖo Zallet ŋu
Wɔwɔe `zallet.toml` le wò datadir (le kpɔɖeŋu me, "DAT" si nètia la dzi) `/mnt/zcash-data/zallet`):
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
Trɔ asi le eŋu. `validator_address` ne Zebra le dɔ wɔm ɖe host/port bubu dzi, eye nàɖo wo me be: `validator_cookie_auth`/`validator_user`/`validator_password` le ete `[indexer]` be wò Zebra RPC auth setup la nasɔ.

**Migrating from zcashd?** If you still have an old `zcash.conf`:
```bash
zallet migrate-zcash-conf --datadir /path/to/old/zcashd/datadir -o /mnt/zcash-data/zallet/zallet.toml
```

## Afɔɖeɖe 7: Ðo ga si nàzã atsɔ adzra wò gadzɛwo ɖo.
Zallet zãa nya vevi siwo katã le edzi la tsɔ dea dzesi wo. `age`/`rage`:
```bash
cargo install rage
rage -p -o /mnt/zcash-data/zallet/encryption-identity.txt <(rage-keygen)
```
Esia naa be woata kɔmpiuta ƒe safui kple mɔʋunya si wodzra ɖo le eɖokui si  ** dzraa mɔʋunuawo; màte ŋu ake ɖe ameŋkumenuwo ŋuti nyatakaka siwo me nyawo mele o.**

## Afɔɖeɖe 8: Wɔ gaɖaba la ƒe kɔpi eye nàdze egɔme.
```bash
zallet -d /mnt/zcash-data/zallet init-wallet-encryption
zallet -d /mnt/zcash-data/zallet generate-mnemonic
```
** Woƒua du ko `generate-mnemonic` zi ɖeka** negbe ɖe nèɖoe koŋ di be nu siwo ŋu nàzã ga ɖo la nanye esiwo to vovo tso wo nɔewo gbɔ.

```bash
zallet -d /mnt/zcash-data/zallet start
```

## Step 9: Migrating an existing zcashd wallet (optional)
```bash
zallet -d /mnt/zcash-data/zallet migrate-zcashd-wallet --zcashd-datadir /path/to/old/zcashd/datadir
```
Esia bia be woana agbalẽa me nyawo nanɔ bɔbɔe. `db_dump` (si wotu ɖe Berkeley DB 6.2.23)  tso zcashd ƒe ɖoɖowɔɖi alo teƒe si wodzidzee le. Ne mègaɖo zcashD o la, esia nye ʋɔtrudɔwɔwɔ ɖeka aɖe si mewu enu keŋkeŋ haɖe le Zallet me o.

## Afɔɖeɖe 10: Kpɔe ɖa be nuwo katã le dɔ wɔm nyuie hã.
```bash
zallet -d /mnt/zcash-data/zallet help
```
Kpɔ egbɔ be gaɖaka la ɖo eŋu, eye ne Zebra wu kadodoa nu ko la, eƒe gadzɛwo kple adrɛswo sɔ ɖe alesi wokpɔ mɔe.

## Kuxiwo Gbɔ Kpɔkpɔ
- ** Zebra ƒe ɖoɖowo kple dɔdɔwo le ARM dzi:** ne èle mɔ̃a me la, ɖo Rust ARM toolchain  x86_64 dɔwɔɖoɖo siwo le zɔzɔm ɖe ARM-mɔ̃awo ŋu anɔ bɔbɔe wu. Esia nye nu si Zebra ŋutɔ gblɔ be ele eme wɔm.
- ** Nuɖuxɔ si le dzidzim ɖe edzi:** Zebra ƒe ~300 GB teƒea yi edzi nɔ dzedzem  Ðoɖowɔƒe.
- ** Docker ƒe mɔɖeɖewo me gblẽ:** log out/back in after adding your user to the `docker` ƒuƒoƒo, alo zazã le mɔ aɖe nu `sudo` le ɣeyiɣi ma me.
- **Zallet container has no shell:** the official `zodlinc/zallet` nɔnɔmetata nye esi tso gɔmedzedzea me ke  woɖenɛ ɣesiaɣi `--datadir` eye nàtsɔ wò datawo ƒe nuŋlɔɖi la awɔ babla.

## Dzɔdzinadzraɖo ŋuti nyatakakawo kple zcashd mɔfiagbalẽ xoxoa dome nyawoe nye esia.
Zebra kple Zallet me le bɔbɔe wu CPU dzi ne wole ɖoɖo wɔm tsɔ wu be woaƒo zcashd nu ƒu, elabena èle binary/container siwo wowɔ xoxo la zãm. RAM 4 GB nye afisi dze nyuie; kpɔ egbɔe be wota kɔmpiuta si ŋu wotrɔ asi le na wò ƒe dɔwɔwɔwo ɖe edzi eye nàkpɔ alesi woawɔ esiawoe hã ɖa. `htop` eye ne èkpɔ be woɖɔli nu geɖe la, bu 8 GB Pi 4 ƒe tɔtrɔa ŋu.

## Ga Bubuwo
- [Zebra Agbalẽ](https://zebra.zfnd.org)  Zebra ƒe agbalẽwo le dɔ wɔm kple wo nɔewo
- [Zallet Agbalẽ](https://zcash.github.io/wallet)  Zallet ƒe agbalẽ si le dukɔa me la dzi.
- [zcashd End-of-Support notice](https://z.cash/support/zcashd-deprecation)

---

*Ne èkpɔe be mɔfiame sia nyo la, ke bu ZecHub ƒe kpekpeɖeŋu ŋu: [de nuxexlẽ me le zechub.wiki/donation  si nye fifia dzi tso Zechub nunanawo gbɔ elabena nyemete ŋui kpɔ be enɔ anyi o].*
