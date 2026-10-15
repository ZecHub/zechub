# Zcash Devtool no na ɛyɛ adwuma

[Dɛn ne zcash-devtool?](https://github.com/zcash/zcash-devtool?tab=readme-ov-file) 

Zcash Devtool yɛ platform a wɔde hacking wɔ Zcash. Ɛyɛ developers na wɔasi, ma developers, ma sɔhwɛ & nkɔsoɔ a ɛfa Zcash dwumadie foforɔ ho; na ɛnsɛ sɛ wobu no sɛ wɔasiesie wɔn ho sɛ wɔbɛyɛ. Ahyɛdeɛ kwan API a saa adwinnadeɛ yi da no adi no tumi & bɛsesa bere biara a wɔremmɔ kɔkɔ. MMFA sika kɛseɛ mma zcash-devtool embedded wallet no sohwɛ.

### Video nkyerɛkyerɛ a ɛfa Zcash Devtool ho:
Kris Nuttycombe (@nuttycom) de saa adwinnade yi mae wɔ ZconVI bere mu.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/5gvQF5oFT8E"
    title="zcash-devtool: the Zcash development multitool with Kris Nuttycombe - ZconVI"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


---

Sɛ wopɛ anammɔn anammɔn akwankyerɛ a ɛkyerɛ sɛnea wubefi ase de nnwinnade yi adi dwuma a, hwɛ [saa nantew yi](https://github.com/zcash/zcash-devtool/blob/main/doc/walkthrough.md). Ɛkyerɛw nantew a edi mũ a ɛfa sɛnea wɔhyehyɛ na wɔde zcash devtool nnwinnade no di dwuma ho. Wɔayɛ sɛ ɛbɛyɛ akwankyerɛ ama sɛdeɛ wobɛnya nhyehyɛɛ ne sɛdeɛ wode w’ankasa dwumadie bɛka adwinnadeɛ no ho.

## Fi ase ntɛmntɛm

Wɔhwɛɛ ahyɛdeɛ a ɛwɔ aseɛ ha no wɔ zcash-devtool ho `main` (yɛ `5a26ee8`, Ɔpɛpɔn 2026). Adwinnade no sesa a wɔmmɔ wo amanneɛ, enti tu mmirika `--help` wɔ ahyɛde biara so sɛ biribi a ɛwɔ ha no nhyia bio a.

### Fa sto so

Binaries a wɔadi kan ayɛ biara nni hɔ. Fa sto so [Rust](https://rustup.rs), afei si fi fibea:

```bash
git clone https://github.com/zcash/zcash-devtool.git
cd zcash-devtool
cargo run --release -- --help
```

Nhwɛso ahorow a ɛwɔ ase ha no frɛ binary a wɔasisi no, `target/release/zcash-devtool`. `cargo run --release -- ...` yɛ adwuma wɔ ɔkwan koro no ara so.

### Yɛ testnet sika kotoku

Fi ase wɔ testnet so. Testnet sika (TAZ) nni mfaso biara.

```bash
zcash-devtool wallet -w ./my-wallet init --name demo -i ./my-wallet-identity.txt -n test
zcash-devtool wallet -w ./my-wallet sync
zcash-devtool wallet -w ./my-wallet balance
```

- `-w` ne sika kotoku no kyerɛwtohɔ. Ɛkɔ akyi `wallet` na ansa na ahyɛde ketewa no aba.
- `-i` is an [mfeɛ](https://age-encryption.org) fael a ɛkyerɛ sɛ obi yɛ onipa. Wɔde sika kotoku no mnemonic kasasin no ahyɛ mu, na sɛ enni hɔ a, wɔbɔ fael no. Fa sie: `send`, `shield` na ahyɛde afoforo a ɛfa sika a wɔsɛe no ho hia no na ama wɔatumi akyerɛkyerɛ aba no mu.
- `-n` ne network no: `test` or `main`.
- `-s` paw kanea sika kotoku server no. Nea wɔde ahyɛ mu no, `zecrocks`, kɔ zec.rocks server no so ma ntwamutam a wɔapaw no.
- Sɛ wopɛ sɛ wosan de sika kotoku a ɛwɔ hɔ dedaw no ba a, fa di dwuma `restore-mnemonic` wɔ ananmu `init`. Ɛkanyan kasasin no.

`balance` bobɔ ɔtare biara din wɔ ɔkwan soronko so, a Ironwood:

```
    Balance:   0.00000000 TAZ
     Sapling Spendable:   0.00000000 TAZ
     Orchard Spendable:   0.00000000 TAZ
    Ironwood Spendable:   0.00000000 TAZ
  Unshielded Spendable:   0.00000000 TAZ
```

Dwane `zcash-devtool wallet -w ./my-wallet list-addresses` sɛ wobɛhunu sika kotokuo no address a wɔaka abom, na wode testnet sika afiri a [faucet a wɔde yɛ adwuma](https://zechub.wiki/using-zcash/faucets).

Sɛ wopɛ mainnet a, twam `-n main` to `init`. Fa sika dodow a wubetumi atua nkutoo di dwuma.

### Soma na fa kyɛm

Dodow no wɔ zatoshis mu (1 ZEC = 100,000,000 zatoshis).

```bash
zcash-devtool wallet -w ./my-wallet send -i ./my-wallet-identity.txt \
  --address <recipient address> --value 100000 --memo "hello"
zcash-devtool wallet -w ./my-wallet shield -i ./my-wallet-identity.txt
```

`propose` kyerɛ asɛm a wɔde di dwuma a `send` anka wɔbɛkyekye, a wɔremfa nkɔma. `list-tx` ne `list-unspent` kyerɛ sika kotoku no abakɔsɛm ne nsɛm a wɔakyerɛw.

Ahyɛde biara a ɛne server bi kasa nso gye tom `--connection tor`, a ɛde nkitahodi no fa Tor afɛfo a wɔahyɛ no mu no so.

### Hwɛ address ahorow, nsafe ne nnwuma a wɔyɛ

`inspect` decodes Zcash data offline: address, nsafe, ne nnwuma a wɔanhyɛ da. Fa ka ho `--lookup` sɛnea ɛbɛyɛ a wobenya nsɛm pii afi nkɔnsɔnkɔnsɔn no mu, te sɛ asɛm bi a ɛnam ne ID so.

```
$ zcash-devtool inspect utest1h55y5z...
Zcash address
 - Network: testnet
 - Kind: Unified Address
 - Receivers:
   - Orchard (...)
   - Sapling (...)
   - Transparent P2PKH (...)
```

Wɔde Ironwood nkrataa kɔma Orchard receiver koro no ara wɔ address a wɔaka abom mu, enti address ahorow no ansesa wɔ NU6.3.

### Si nkitahodi ahorow wɔ anammɔn ahorow mu ne PCZTs

PCZT (Zcash asɛm a wɔabɔ no fã bi) kyekyɛ atɔfoɔ a wɔbɛkyekyere no mu ayɛ no anammɔn ahodoɔ: bɔ, di ho adanseɛ, de wɔn nsa hyɛ aseɛ, na soma. Anamɔn biara betumi ayɛ adwuma wɔ afiri soronko so, sɛ nhwɛso no, ɛwɔ hardware signer te sɛ Keystone. Ebiara `pczt` ahyɛde kenkan PCZT no fi fael anaa stdin mu na ɛkyerɛw kɔ fael bi mu (`--output`) anaa stdout, enti wobetumi de anammɔn no ayɛ paipu:

```bash
zcash-devtool pczt -w ./my-wallet create --address <recipient address> --value 100000 \
  | zcash-devtool pczt -w ./my-wallet prove -i ./my-wallet-identity.txt \
  | zcash-devtool pczt -w ./my-wallet sign -i ./my-wallet-identity.txt \
  | zcash-devtool pczt -w ./my-wallet send
```

`zcash-devtool pczt --help` bobɔ anammɔn afoforo no din, a nea ɛka ho ne `inspect`, `redact`, `combine`, `extract` ne `shield`.

### Fa sika fi Orchard kɔ Ironwood

Efi NU6.3, Orchard sika betumi akɔ sika kotoku no ankasa address nkutoo so. No `migration` ahyɛde ahorow de wɔn kɔ Ironwood:

```bash
zcash-devtool migration -w ./my-wallet plan
zcash-devtool migration -w ./my-wallet commit -i ./my-wallet-identity.txt
zcash-devtool migration -w ./my-wallet status
zcash-devtool migration -w ./my-wallet advance
```

- `plan` di kan hwɛ nkyerɛwde no mu mpaapaemu ne nhyehyɛe a wɔde bɛkɔ baabi foforo no, na ɛnsakra hwee.
- `commit` ɔkyekye na odi kan de ne nsa hyɛ ahosiesie nkitahodi ahorow a edi kan ase. Fa ka ho `--external` sɛ wobegyaw wɔn a wɔmfa wɔn nsa nhyɛ ase mma obi a ofi ase de ne nsa hyɛ ase te sɛ Keystone.
- `status` kyerɛ nkɔso a atutra no anya ne anammɔn a edi hɔ.
- `advance` di adanse sɛ asɛm a edi hɔ a ne ankora ayɛ krado.

Wɔda so ara rekyekye ahyɛde ahorow a ɛfa atutra ho no. `advance` gyina wɔ asɛm a edi kan a ayɛ krado sɛ wɔbɛbɔ amanneɛ no so, efisɛ wɔmfaa amanneɛbɔ nni dwuma wɔ adwinnade no mu de besi nnɛ. Sɛ wode bedi dwuma da biara da a, fa sika kotoku a ɛboa Ironwood. Hwɛ [Atare a Wɔabɔ Ho Ban](https://zechub.wiki/using-zcash/shielded-pools).


**Ahobanbɔ Ho Kɔkɔbɔ:**
MFA EYI NNI DWUMA WƆ PRODUCTION MU!!!
Wɔnkyerɛw app no a ahobammɔ wɔ wɔn adwenem. Nanso ɛwɔ affordances te sɛ encryption of the mnemonic seed phrases a ɛsɛ sɛ ɛma ɛyɛ yiye ma sɔhwɛ nketewa, wɔ w’ankasa asiane mu.

### Advanced (librustzcash nkyerɛkyerɛ )


[hwɛ video no wɔ ha](https://free2z.cash/uploadz/public/ZcashTutorial/librustzcash-a-rust-crates.mp4)


