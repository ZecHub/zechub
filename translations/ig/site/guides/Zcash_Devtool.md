# Ngwaọrụ Zcash DevTool

[Gịnị bụ zcash-devtool?](https://github.com/zcash/zcash-devtool?tab=readme-ov-file) 

Zcash Devtool bụ ikpo okwu maka ịnwa ime ihe na Zcash. Ndị mmepe, maka ndị mmepe, wuru ya maka nnwale na mmepe nke ọrụ Zcash ọhụrụ; ekwesighi iwere ya dị ka nke dị njikere maka mmepụta. API iwu nke ngwaọrụ a na-ekpughe nwere ike ịgbanwe ma ọ bụ ga-agbanwe n'oge ọ bụla na-enweghị ịdọ aka ná ntị. Etinyela nnukwu ego na njikwa obere akpa zcash-devtool.

### Nkuzi vidiyo nke Zcash Devtool:
Kris Nuttycombe (@nuttycom) gosipụtara ngwaọrụ a n'oge ZconVI.

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

Maka ntuziaka nzọụkwụ site na nzọụkwụ maka otu esi amalite iji ngwaọrụ ndị a, lee [usoro mmụta a](https://github.com/zcash/zcash-devtool/blob/main/doc/walkthrough.md)Ọ na-edekọ usoro zuru oke nke otu esi ahazi ma jiri ngwaọrụ zcash devtool. Ezubere ya ka ọ bụrụ ntuziaka maka otu esi ahazi ya na otu esi agbakwunye ọrụ nke gị na ngwaọrụ ahụ.

## Mmalite ngwa ngwa

A lere iwu ndị dị n'okpuru anya megide zcash-devtool `main` (kwere nkwa `5a26ee8`, Ọgọst 2026). Ngwaọrụ ahụ na-agbanwe n'enweghị ọkwa, yabụ gbaa ọsọ `--help` na iwu ọ bụla ma ọ bụrụ na ihe dị ebe a adabaghịzi.

### Wụnye

Enweghị ọnụọgụ abụọ e wurularị. Wụnye [Rust](https://rustup.rs), wee wuo site na isi mmalite:

```bash
git clone https://github.com/zcash/zcash-devtool.git
cd zcash-devtool
cargo run --release -- --help
```

Ihe atụ ndị dị n'okpuru na-akpọ ọnụọgụ abụọ arụpụtara, `target/release/zcash-devtool`. `cargo run --release -- ...` na-arụ ọrụ n'otu ụzọ ahụ.

### Mepụta obere akpa testnet

Malite na testnet. Mkpụrụ ego Testnet (TAZ) enweghị uru ọ bụla.

```bash
zcash-devtool wallet -w ./my-wallet init --name demo -i ./my-wallet-identity.txt -n test
zcash-devtool wallet -w ./my-wallet sync
zcash-devtool wallet -w ./my-wallet balance
```

- `-w` bụ akwụkwọ ndekọ akpa ego. Ọ na-aga n'ihu `wallet` na tupu iwu ala.
- `-i` is an [afọ](https://age-encryption.org) faịlụ njirimara. A na-ezochi okwu ncheta nke obere akpa ahụ na ya, a na-emepụtakwa faịlụ ahụ ma ọ bụrụ na ọ dịghị. Debe ya: `send`, `shield` na iwu mmefu ndị ọzọ chọrọ ya iji wepụ mkpụrụ ahụ.
- `-n` bụ netwọk ahụ: `test` or `main`.
- `-s` na-ahọrọ ihe nkesa obere akpa ego `zecrocks`, na-ejikọ na sava zec.rocks maka netwọk ahọpụtara.
- Iji weghachi obere akpa dị adị, jiri `restore-mnemonic` n'ọnọdụ nke `init`Ọ na-akpali gị maka okwu ahụ.

`balance` na-edepụta ọdọ mmiri ọ bụla iche iche, gụnyere Ironwood:

```
    Balance:   0.00000000 TAZ
     Sapling Spendable:   0.00000000 TAZ
     Orchard Spendable:   0.00000000 TAZ
    Ironwood Spendable:   0.00000000 TAZ
  Unshielded Spendable:   0.00000000 TAZ
```

Gbaa ọsọ `zcash-devtool wallet -w ./my-wallet list-addresses` ịhụ adreesị otu akpa ego ahụ, wee ziga ya ego testnet site na [faucet](https://zechub.wiki/using-zcash/faucets).

Maka mainnet, gafere `-n main` to `init`Jiri naanị ego ị nwere ike ịfufu.

### Zipụ ma chebe

Ọnụ ego dị na zatoshis (1 ZEC = 100,000,000 zatoshis).

```bash
zcash-devtool wallet -w ./my-wallet send -i ./my-wallet-identity.txt \
  --address <recipient address> --value 100000 --memo "hello"
zcash-devtool wallet -w ./my-wallet shield -i ./my-wallet-identity.txt
```

`propose` na-egosi azụmahịa a `send` ga-ewu ụlọ, na-ezigaghị ya. `list-tx` na `list-unspent` Gosi akụkọ ihe mere eme na ihe ndetu nke obere akpa ahụ.

Iwu ọ bụla nke na-agwa sava okwu na-anabatakwa ya `--connection tor`, nke na-ebuga njikọ ahụ site na onye ahịa Tor arụnyere n'ime ya.

### Lelee adreesị, igodo na azụmahịa

`inspect` Na-agbanwe data Zcash na-anọghị n'ịntanetị: adreesị, igodo, na azụmahịa ndị a na-anaghị arụ ọrụ. Tinye `--lookup` iji nweta ozi ndị ọzọ site na usoro a, dịka azụmahịa site na njirimara ya.

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

A na-eziga akwụkwọ ndetu Ironwood na otu onye nnata Orchard n'otu adreesị, yabụ adreesị agbanweghị na NU6.3.

### Wulite azụmahịa n'usoro site na iji PCZTs

PCZT (azụmahịa Zcash e kere n'akụkụ) na-ekewa iwulite azụmahịa n'ime usoro dị iche iche: mepụta, gosi, bịanye aka, na izipu. Nzọụkwụ ọ bụla nwere ike ịgba ọsọ na igwe dị iche, dịka ọmụmaatụ site na iji ihe nrịbama ngwaike dịka Keystone `pczt` iwu na-agụ PCZT site na faịlụ ma ọ bụ stdin wee dee ya na faịlụ (`--output`) ma ọ bụ stdout, yabụ enwere ike ịhazi usoro ndị a:

```bash
zcash-devtool pczt -w ./my-wallet create --address <recipient address> --value 100000 \
  | zcash-devtool pczt -w ./my-wallet prove -i ./my-wallet-identity.txt \
  | zcash-devtool pczt -w ./my-wallet sign -i ./my-wallet-identity.txt \
  | zcash-devtool pczt -w ./my-wallet send
```

`zcash-devtool pczt --help` depụtara usoro ndị ọzọ, gụnyere `inspect`, `redact`, `combine`, `extract` na `shield`.

### Bufee ego site na Orchard gaa Ironwood

Kemgbe NU6.3, ego Orchard nwere ike ibuga naanị na adreesị nke obere akpa ahụ `migration` iwu na-akwaga ha n'ime Ironwood:

```bash
zcash-devtool migration -w ./my-wallet plan
zcash-devtool migration -w ./my-wallet commit -i ./my-wallet-identity.txt
zcash-devtool migration -w ./my-wallet status
zcash-devtool migration -w ./my-wallet advance
```

- `plan` na-elele nkewa nke ndetu ahụ na usoro mbufe, ọ dịghịkwa agbanwe ihe ọ bụla.
- `commit` na-ewulite ma na-abịanye aka na azụmahịa nkwadebe mbụ `--external` ịhapụ ha ka ha ghara ịbanye aka maka onye bịanyere aka n'èzí dịka Keystone.
- `status` na-egosi ọganihu nke njem na nzọụkwụ ọzọ.
- `advance` na-egosi azụmahịa ọzọ nke arịlịka ya dị njikere.

A ka na-ewu iwu mbugharị. `advance` kwụsị na azụmahịa mbụ dị njikere ịgbasa, n'ihi na etinyebeghị mgbasa ozi na ngwaọrụ ahụ. Maka ojiji kwa ụbọchị, bufee ego na obere akpa nke na-akwado Ironwood. Lee [Ọdọ Mmiri E Kpuchiri Ekpuchi](https://zechub.wiki/using-zcash/shielded-pools).


**Ịdọ Aka Na NchỊta Nche:**
EJILA NKE A N'IME MMỤTA!!!
E deghị ngwa a n'uche nchekwa. Agbanyeghị, o nwere ihe ndị dị mkpa dịka izochi okwu mkpụrụ ncheta nke ga-eme ka ọ dị irè maka nnwale obere, n'agbanyeghị ihe ize ndụ nke gị.

### Ọkachamara (librustzcash)


[lee vidiyo ebe a](https://free2z.cash/uploadz/public/ZcashTutorial/librustzcash-a-rust-crates.mp4)


