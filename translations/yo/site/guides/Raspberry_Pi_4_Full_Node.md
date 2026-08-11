# Ṣiṣẹ Nọ́òdu Pípẹ̀lẹ lórí Raspberry Pi 4 (Zebra + Zallet)

*Migrated from the original zcashd-based guide. zcashd reached its automatic End-of-Support halt on July 18, 2026, so this guide now uses **Zebra** (the current full node, maintained by the Zcash Foundation) and **Zallet** (the wallet built to replace zcashd's built-in wallet).*

## Ohun tó o máa kọ́
- Bii o ṣe le ṣalaye ati tunto Ubuntu Server 22.04+ (64-bit) lori Raspberry Pi 4 fun lilo ori-aini
- Bii o ṣe le fi sori ẹrọ ati ṣiṣe Zebra, boya nipasẹ Docker tabi alakomeji ti a kọ tẹlẹ
- Bii o ṣe le fi sori ẹrọ, tunto ati ṣii Zallet, pẹlu iṣeto aṣiri apamọwọ apo-owo
- Bawo ni lati ṣe àtúnṣe ìyípadà kan ti o wà tẹlẹ zcashd config/wallet sinu Zallet

## Ohun tó yí padà láti inú ìwé atọ́nà àtijọ́ náà ni:
Awọn ti tẹlẹ ikede ti yi guide rìn nipasẹ compiling ** zcashd** natively on a Pi 4  kan nikan-threaded ṣajọ wipe o mu 3 × 4 wakati nitori awọn Pi 4 ko ni to iranti fun a pẹlẹpẹlẹ (`-j$(nproc)`Zebra ati Zallet mejeeji bayi fi ** osise ti a ṣe tẹlẹ ARM64 awọn alakomeji ati awọn aworan Docker** ranṣẹ, nitorinaa ni ọpọlọpọ igba iwọ ko nilo lati ṣajọ ohunkohun lati orisun lori Pi funrararẹ.

## Àwọn ohun tó yẹ kó wà nípò àkọ́kọ́
- Raspberry Pi 4 (Rántí RAM GB tabi jù bẹ́ẹ̀ lọ)
- Kaadi microSD kan (32 GB+) fún OS náà.
- Ẹrọ SSD/HDD ti ita pẹlu atilẹyin USB 3.0  ** Zebra nílò nǹkan bí 300 GB fún ìpamọ́ data Mainnet**, tí ó ń pọ̀ sí i ní àkókò kan náà, nítorí náà má ṣe gbìyànjú láti fi èyí ṣiṣẹ lórí káàdì microSD nìkan
- Kọmputa pẹlu iho kaadi microSD (lati fi aworan OS han)
- Asopọ Ethernet alágbèéká kan tabi Wi-Fi.
- Ìrora ìpilẹ̀ṣẹ́ pẹlú laini àṣẹ lórí SSH

## Igbese 1: Flash Ubuntu Server 22.04+ (64-bit) Àtúnṣe ìmúdájú: Ṣẹ̀rọ̀ àdàkọ yìí.
Àwọn ìtòlẹ́sẹẹsẹ méjì tí a ti kọ sílẹ̀ àti àwọn àwòrán Docker ní Zebra ati Zallet nílò **glibc 2.34+**, èyí tó túmọ̀ sí pé ó gba Ubuntu Server 22.04 tàbí tuntun (64-bit/aarch64) **.

1. Fi ohun èlò Raspberry Pi Imager sori kọ̀ǹpútà rẹ.
2. Fi káàdì microSD rẹ sínú rẹ̀.
3. Yan **Ohun miiran ti gbogbo-nipa OS → Ubuntu → Ubuntu Server 22.04 LTS (64-bit)** (tabi titun).
4. Lo awọn aṣayan ilọsiwaju ti Imager (awọn aami jia) lati ṣaju-ṣeto orukọ alejo, mu SSH ṣiṣẹ, ati ṣeto iwe eri Wi-Fi bi o ba jẹ dandan, fun ibẹrẹ akọkọ laisi ori.
5. Kọ àwòrán náà, fi káàdì sínú rẹ̀. Fi ohun tó ń jẹ́ Pi sídìí rẹ̀.
6. SSH nínú: `ssh <username>@<pi-hostname-or-ip>`

## Ìgbésè 2: Fi àtòjọ ìpamọ́ síta kó o sì gbé e sórí rẹ̀.
1. So SSD/HDD rẹ ti ita nipasẹ USB 3.0.
2. Ṣe idanimọ ẹrọ naa: `lsblk`
3. Ṣàtúnṣe (bí ó bá jẹ tuntun) kí o sì gbé e, bí àpẹẹrẹ sí: `/mnt/zcash-data`, pẹ̀lú ìlànà kan tó wà níbàámu. `mkfs`/`fstab` ìmúrasílẹ̀ kí ó lè máa gbé ara rẹ̀ sókè nígbà tí o bá tún un ṣe.

## Igbesẹ 3: Ṣe àtúnṣe sí ètò náà.
```bash
sudo apt update && sudo apt full-upgrade -y
sudo reboot
```

## Igbesẹ 4: Fi sori ẹrọ ati ṣiṣe Zebra
### Aṣayan A  Docker (tí a dábàá)
```bash
sudo apt install -y docker.io
sudo usermod -aG docker $USER   # log out/in after this
docker run -d \
  --name zebra \
  -p 8233:8233 \
  -v /mnt/zcash-data/zebra:/home/zebra/.cache/zebra \
  zfnd/zebra:latest
```
Ṣayẹwo ilọsiwaju: `docker logs -f zebra`

### Aṣayan B  Ẹya-ọkọ ti a ṣe tẹlẹ nipasẹ ọkọ oju omi ẹru.
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source "$HOME/.cargo/env"
cargo install cargo-binstall
cargo binstall zebrad
zebrad start
```
Eleyi fi sori ẹrọ kan ti a ṣe tẹlẹ-itumọ `aarch64` ìkejì  kò nílò àtúnṣe.

**On sync time:** expect this to take a while — commonly-cited first-sync figures (roughly 2 hours) come from reference hardware that is more powerful than a Pi 4's CPU, so your actual sync time on real Pi 4 hardware will likely run longer.

## Igbesẹ 5: Fi Zallet sori ẹrọ
Zallet wa lọwọlọwọ ni **alpha**  retí àwọn ìyípadà tó ń yí padà, má sì ṣe wò ó gẹ́gẹ́ bí ààbò tí a ti ṣetán fún ìṣúra pàtàkì.

### Aṣayan A  Docker (tí a dábàá)
```bash
docker pull zodlinc/zallet:latest
```
Aworan yii ṣe atilẹyin ARM64 (nipasẹ itumọ ti Nix-orisun) ati ṣiṣe lati inu faili kekere, shellless filesystem  kọja iṣeto ati awọn ọna data ni gbangba nipasẹ `--datadir` àti àwọn ohun tó ń gbé ìró jáde (wo Ìgbésẹ̀ 6).

### Aṣayan B  Ṣiṣẹda lati orisun
```bash
# Requires Rust 1.85+ (see Step 4B for rustup install)
sudo apt install -y clang libclang-dev protobuf-compiler
cargo install --locked --git https://github.com/zcash/wallet.git
```
Awọn apoti Zallet ko ti tẹjade si awọn crates.io lakoko ipele alpha, nitorinaa fifi sori ẹrọ lati ibi ipamọ git taara ni ọna atilẹyin kii ṣe Docker.

## Igbese 6: Ṣeto Zallet
Ṣẹda rẹ̀ `zallet.toml` nínú dataadir tí o yàn (bíi. `/mnt/zcash-data/zallet`):
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
Ṣàtúnṣe `validator_address` ti o ba Zebra nṣiṣẹ lori kan yatọ si ogun / ibudo, ati ki o tunto `validator_cookie_auth`/`validator_user`/`validator_password` ìsàlẹ̀ `[indexer]` lati baamu rẹ Zebra RPC Auth setup.

**Ṣe o ti ṣí kúrò ní zcashd?** Bí ẹ bá ṣì ní àgbékalẹ̀ kan tí kò tíì péjú, kí ni wàá ṣe láti fi dáàbò bo ara rẹ. `zcash.conf`:
```bash
zallet migrate-zcash-conf --datadir /path/to/old/zcashd/datadir -o /mnt/zcash-data/zallet/zallet.toml
```

## Igbesẹ 7: Ṣeto ìdìkọ àpamọ́ owó (wallet encryption)
Zallet ṣe àdàkọ gbogbo àwọn ohun èlò kókó nípa lílo `age`/`rage`:
```bash
cargo install rage
rage -p -o /mnt/zcash-data/zallet/encryption-identity.txt <(rage-keygen)
```
Eleyi print a gbangba bọtini ati ki o kan autogenerated ọrọigbaniwọle  **fi awọn ọrọigbanisiṣẹ; ti o ko ba le bọsipọ ni idanimọ faili lai rẹ.**

## Igbesẹ 8: Ṣiṣayẹwo ati bẹrẹ apamọwọ naa
```bash
zallet -d /mnt/zcash-data/zallet init-wallet-encryption
zallet -d /mnt/zcash-data/zallet generate-mnemonic
```
**Ṣe eré nìkan ni. `generate-mnemonic` lẹ́ẹ̀kan** àyàfi tó bá jẹ pé o mọyì bí àwọn ìnáwó rẹ ṣe ń lọ ní ṣísẹ̀-n-tèmi.

```bash
zallet -d /mnt/zcash-data/zallet start
```

## Igbesẹ 9: Ṣíṣípò sí àpamọ́ zcashd kan tó wà (ìfẹ̀sùn)
```bash
zallet -d /mnt/zcash-data/zallet migrate-zcashd-wallet --zcashd-datadir /path/to/old/zcashd/datadir
```
Èyí gba pé kí àwọn tó ń ṣe ìwádìí náà: `db_dump` utility (built against Berkeley DB 6.2.23)  from a system install or a local source-build of zcashd. Bí o kò bá ní zcashD mọ́, èyí ni ìgbésẹ̀ ìyípadà kan tí kì í ṣe olódùmarè nínú Zallet síbẹ̀.

## Igbesẹ 10: Ṣayẹwo ohun gbogbo ṣiṣẹ.
```bash
zallet -d /mnt/zcash-data/zallet help
```
Fọwọsi pe apamọ naa dahun, ati ni kete ti Zebra ba pari isọdọkan, awọn idaduro / adirẹsi ṣe deede si ireti.

## Ìdáhùn àwọn ìṣòro náà
- **Iṣoro iṣelọpọ / akoko ṣiṣe Zebra lori ARM:** ti o ba kọ lati orisun, fi sori ẹrọ irinṣẹ Rust ARM  ṣiṣi awọn ohun elo x86_64 ṣiṣẹ lori hardware ARM yoo lọ silẹ ni pẹlẹpẹlẹ, fun iwe-ipamọ ara ẹni Zebra.
- **Ipamọ́ ń kún:** Ìlà ìsẹ̀lẹ̀ Zebra ~300 GB n tẹsiwaju láti pọ sí i  Àtòjọ orí.
- **Awọn aṣiṣe igbanilaaye Docker:** fi silẹ/padà wọlé lẹ́yìn tí o bá ti ṣafikun oníṣe rẹ sí àkájọpọ̀ àwọn ìsọfúnni tó wà nínú ẹ̀rọ-ìmọ̀ràn. `docker` ẹgbẹ, tàbí lílò `sudo` ní báyìí ná.
- **Zallet container has no shell:** the official `zodlinc/zallet` àwòrán náà jẹ láti-òní pẹ̀lú ìmúra  máa ń kọjá lọ nígbà gbogbo `--datadir` kedere ki o si fi data rẹ directory bi a iwọn didun.

## Àwọn àlàyé nípa ohun èlò lòdì sí ìwé-ìmọ̀ràn zcashd àtijọ́
Zebra ati Zallet ni o wa lapapọ fẹẹrẹfẹ lori CPU nigba iṣeto ju compiling zcashd jẹ, niwon ti o ba n ṣiṣẹ ṣaju-itumọ alakomeji / apoti. 4 GB Ramu jẹ a reasonable ibẹrẹ ojuami; iboju pẹlu `htop` ki o si ro awọn 8 GB Pi 4 eya ti o ba ri ọpọ swapping.

## Àwọn ohun èlò àfikún
- [Ìwé Zebra](https://zebra.zfnd.org)  ìwé àṣẹ Zebra tí ó wà nípamọ́
- [Ìwé Zallet](https://zcash.github.io/wallet)  ìwé àṣẹ Zallet tí ó wà nílẹ̀-èdè rẹ.
- [zcashd End-of-Support notice](https://z.cash/support/zcashd-deprecation)

---

*Bí o bá rí i pé ìwé yìí wúlò, ronú nípa gbígbà láti ṣe ìtìlẹyìn fún ZecHub: [fi adirẹsi tí a fi ààbò pamọ́ sí ti ẹ̀bùn-ìfúnni ní Zechub lọwọlọwọ lati zechub.wiki/donation  kò wà nínú ibí nítorí mi ò lè ṣètọ́jú wípé ó ṣì jẹ́ ojúmọ́].*
