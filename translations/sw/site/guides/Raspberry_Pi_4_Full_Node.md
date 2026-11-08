# Endesha Full Node kwenye Raspberry Pi 4 (Zebra + Zallet)

*Imehamishwa kutoka kwenye mwongozo asili unaotegemea zcashd. zcashd ilisimamishwa kiotomatiki kwa sababu ya mwisho wa usaidizi mnamo Julai 18, 2026, kwa hivyo mwongozo huu sasa unatumia **Zebra** (full node ya sasa, inayodumishwa na Zcash Foundation) na **Zallet** (pochi [wallet] iliyoundwa kuchukua nafasi ya pochi iliyojengewa ndani ya zcashd).*

## Utajifunza nini
- Jinsi ya kuandika na kusanidi Ubuntu Server 22.04+ (64-bit) kwenye Raspberry Pi 4 kwa matumizi yasiyo na skrini
- Jinsi ya kusakinisha na kuendesha Zebra, ama kupitia Docker au binary iliyoundwa mapema
- Jinsi ya kusakinisha, kusanidi, na kuanzisha Zallet, ikiwemo usanidi wa usimbaji fiche wa pochi [wallet encryption]
- Jinsi ya kuhamisha kwa hiari usanidi/pochi iliyopo ya zcashd kwenda Zallet

## Nini kimebadilika kutoka mwongozo wa zamani
Toleo la awali la mwongozo huu lilieleza jinsi ya kutunga **zcashd** moja kwa moja kwenye Pi 4 — utungaji wa thread moja uliodumu saa 3–4 kwa sababu Pi 4 haina kumbukumbu ya kutosha kwa utungaji sambamba (`-j$(nproc)`). Zebra na Zallet sasa zote zinatoa **binary rasmi za ARM64 zilizoundwa mapema na taswira za Docker**, hivyo katika hali nyingi huhitaji tena kutunga chochote kutoka chanzo kwenye Pi yenyewe.

## Mahitaji ya awali
- Raspberry Pi 4 (RAM ya GB 4 au zaidi inapendekezwa)
- Kadi ya microSD (GB 32+) kwa ajili ya OS
- SSD/HDD ya nje yenye usaidizi wa USB 3.0 — **Zebra inahitaji takribani GB 300 kwa data ya Mainnet iliyohifadhiwa kwenye akiba**, ikiongezeka kadiri muda unavyopita, hivyo usijaribu kuiendesha kwa kutumia kadi ya microSD pekee
- Kompyuta yenye nafasi ya kadi ya microSD (kuandika taswira ya OS)
- Muunganisho wa Ethernet wa waya au Wi-Fi
- Uzoefu wa msingi wa kutumia mstari wa amri kupitia SSH

## Hatua ya 1: Andika Ubuntu Server 22.04+ (64-bit)
Binary zilizoundwa mapema za Zebra na Zallet pamoja na taswira za Docker zinahitaji **glibc 2.34+**, ambayo inamaanisha **Ubuntu Server 22.04 au toleo jipya zaidi (64-bit/aarch64)**.

1. Sakinisha Raspberry Pi Imager kwenye kompyuta yako kuu.
2. Ingiza kadi yako ya microSD.
3. Chagua **Other general-purpose OS → Ubuntu → Ubuntu Server 22.04 LTS (64-bit)** (au toleo jipya zaidi).
4. Tumia chaguo za kina za Imager (ikoni ya gia) kusanidi mapema hostname, kuwezesha SSH, na kuweka vitambulisho vya Wi-Fi ikihitajika, kwa uanzishaji wa kwanza usio na skrini.
5. Andika taswira, ingiza kadi, kisha washa Pi.
6. Ingia kwa SSH: `ssh <username>@<pi-hostname-or-ip>`

## Hatua ya 2: Unganisha na weka hifadhi ya nje
1. Unganisha SSD/HDD yako ya nje kupitia USB 3.0.
2. Tambua kifaa: `lsblk`
3. Iumbize (ikiwa ni mpya) na uiweke, kwa mfano kwenye `/mnt/zcash-data`, kwa usanidi wa kawaida wa `mkfs`/`fstab` ili ijiweke kiotomatiki baada ya kuwashwa upya.

## Hatua ya 3: Sasisha mfumo
```bash
sudo apt update && sudo apt full-upgrade -y
sudo reboot
```

## Hatua ya 4: Sakinisha na uendeshe Zebra
### Chaguo A — Docker (inapendekezwa)
```bash
sudo apt install -y docker.io
sudo usermod -aG docker $USER   # log out/in after this
docker run -d \
  --name zebra \
  -p 8233:8233 \
  -v /mnt/zcash-data/zebra:/home/zebra/.cache/zebra \
  zfnd/zebra:latest
```
Kagua maendeleo: `docker logs -f zebra`

### Chaguo B — Binary iliyoundwa mapema kupitia cargo binstall
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source "$HOME/.cargo/env"
cargo install cargo-binstall
cargo binstall zebrad
zebrad start
```
Hii husakinisha binary ya `aarch64` iliyoundwa mapema — hakuna utungaji unaohitajika.

**Kuhusu muda wa usawazishaji:** Tarajia hili kuchukua muda — takwimu zinazotajwa mara nyingi za usawazishaji wa kwanza (takribani saa 2) zinatoka kwenye maunzi rejeleo yenye nguvu zaidi kuliko CPU ya Pi 4, kwa hivyo muda wako halisi wa usawazishaji kwenye maunzi halisi ya Pi 4 huenda ukawa mrefu zaidi.

## Hatua ya 5: Sakinisha Zallet
Zallet kwa sasa iko katika **alpha** — tarajia mabadiliko yanayovunja ulinganifu, na usiichukulie bado kama utunzaji tayari kwa uzalishaji wa fedha kubwa.

### Chaguo A — Docker (inapendekezwa)
```bash
docker pull zodlinc/zallet:latest
```
Taswira hii inasaidia ARM64 (kupitia utungaji unaotegemea Nix) na huendesha kutoka kwenye mfumo wa faili mdogo usio na shell — pitisha njia za usanidi na data kwa uwazi kupitia `--datadir` na viambatisho vya volume (tazama Hatua ya 6).

### Chaguo B — Jenga kutoka chanzo
```bash
# Requires Rust 1.85+ (see Step 4B for rustup install)
sudo apt install -y clang libclang-dev protobuf-compiler
cargo install --locked --git https://github.com/zcash/wallet.git
```
Crates za Zallet bado hazijachapishwa kwenye crates.io wakati wa awamu ya alpha, hivyo kusakinisha moja kwa moja kutoka kwenye hazina ya git ndiyo mbinu inayotumika isiyo ya Docker.

## Hatua ya 6: Sanidi Zallet
Unda `zallet.toml` katika datadir uliyochagua (kwa mfano, `/mnt/zcash-data/zallet`):
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
Rekebisha `validator_address` ikiwa Zebra inaendesha kwenye host/port tofauti, na usanidi `validator_cookie_auth`/`validator_user`/`validator_password` chini ya `[indexer]` ili zilingane na usanidi wako wa uthibitishaji wa RPC wa Zebra.

**Unahama kutoka zcashd?** Ikiwa bado una `zcash.conf` ya zamani:
```bash
zallet migrate-zcash-conf --datadir /path/to/old/zcashd/datadir -o /mnt/zcash-data/zallet/zallet.toml
```

## Hatua ya 7: Sanidi usimbaji fiche wa pochi
Zallet husimba kwa fiche nyenzo zote za funguo kwa kutumia `age`/`rage`:
```bash
cargo install rage
rage -p -o /mnt/zcash-data/zallet/encryption-identity.txt <(rage-keygen)
```
Hii huchapisha ufunguo wa umma na kaulisiri inayozalishwa kiotomatiki — **hifadhi kaulisiri; huwezi kurejesha faili ya utambulisho bila hiyo.**

## Hatua ya 8: Anzisha na uwashe pochi
```bash
zallet -d /mnt/zcash-data/zallet init-wallet-encryption
zallet -d /mnt/zcash-data/zallet generate-mnemonic
```
**Endesha `generate-mnemonic` mara moja tu** isipokuwa kama kwa makusudi unataka mizizi mingi huru ya matumizi.

```bash
zallet -d /mnt/zcash-data/zallet start
```

## Hatua ya 9: Kuhamisha pochi iliyopo ya zcashd (kwa hiari)
```bash
zallet -d /mnt/zcash-data/zallet migrate-zcashd-wallet --zcashd-datadir /path/to/old/zcashd/datadir
```
Hii inahitaji kifaa cha `db_dump` (kilichojengwa dhidi ya Berkeley DB 6.2.23) — kutoka kwenye usakinishaji wa mfumo au utungaji wa chanzo wa ndani wa zcashd. Ikiwa huna tena zcashd iliyosakinishwa, hii ndiyo hatua moja ya uhamishaji ambayo bado haijajitosheleza kikamilifu ndani ya Zallet.

## Hatua ya 10: Thibitisha kuwa kila kitu kinafanya kazi
```bash
zallet -d /mnt/zcash-data/zallet help
```
Thibitisha kwamba pochi inajibu, na baada ya Zebra kumaliza kusawazisha, kwamba salio/anwani zinalingana na matarajio.

## Utatuzi wa matatizo
- **Matatizo ya utungaji/utekelezaji wa Zebra kwenye ARM:** Ikiwa unajenga kutoka chanzo, sakinisha toolchain ya ARM ya Rust — kuendesha vifaa vya ujenzi vya x86_64 kwenye maunzi ya ARM kutakuwa polepole kwa namna inayoonekana, kulingana na nyaraka za Zebra zenyewe.
- **Hifadhi inajaa:** Matumizi ya nafasi ya takribani GB 300 ya Zebra yanaendelea kukua — panga nafasi ya ziada.
- **Hitilafu za ruhusa za Docker:** Toka na uingie tena baada ya kumwongeza mtumiaji wako kwenye kundi la `docker`, au tumia `sudo` kwa sasa.
- **Kontena la Zallet halina shell:** Taswira rasmi ya `zodlinc/zallet` haina chochote kwa makusudi — daima pitisha `--datadir` kwa uwazi na uambatishe saraka yako ya data kama volume.

## Maelezo ya maunzi ikilinganishwa na mwongozo wa zamani wa zcashd
Zebra na Zallet kwa ujumla hutumia CPU kidogo zaidi wakati wa usanidi kuliko kutunga zcashd kulivyokuwa, kwa kuwa unaendesha binary/kontena zilizoundwa mapema. RAM ya GB 4 ni mwanzo unaofaa; fuatilia kwa kutumia `htop` na uzingatie toleo la Pi 4 la GB 8 ikiwa unaona matumizi makubwa ya swap.

## Rasilimali za ziada
- [Zebra Kitabu](https://zebra.zfnd.org) — nyaraka rasmi za Zebra
- [Zallet Kitabu](https://zcash.github.io/zallet/) — nyaraka rasmi za Zallet
- [zcashd Taarifa ya mwisho wa usaidizi](https://z.cash/support/zcashd-deprecation)

---

*Ikiwa umepata mwongozo huu kuwa muhimu, zingatia kuunga mkono ZecHub: [weka anwani ya sasa ya mchango ya faragha ya ZecHub kutoka zechub.wiki/donation — haijajumuishwa hapa kwa kuwa sikuweza kuthibitisha kuwa bado ni ya sasa].*
