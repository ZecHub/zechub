# Ngwá ọrụ Devtool nke Zcash

[Gịnị bụ zcash-devtool?](https://github.com/zcash/zcash-devtool?tab=readme-ov-file) 

Devtool Zcash bụ ikpo okwu maka ịnwale Zcash. Ndị mmepe wuru ya maka ndị mmepe, maka nnwale na mmepe ọrụ ọhụrụ nke Zcash; ekwesịghịkwa ile ya anya dị ka ihe dị njikere maka mmepụta. API ahịrị iwu nke ngwá ọrụ a na-enye nwere ike, ọ ga-agbanwekwa n'oge ọ bụla na-enweghị ịdọ aka ná ntị. ETINYELA nnukwu ego n’ijikwa e-akpa ego [wallet] arụnyere n'ime zcash-devtool.

### Nkuzi vidio banyere Devtool Zcash:
Kris Nuttycombe (@nuttycom) gosipụtara ngwá ọrụ a n'oge ZconVI.

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

Maka nduzi nzọụkwụ site na nzọụkwụ banyere otu esi amalite iji ngwá ọrụ ndị a, lee [nduzi a](https://github.com/zcash/zcash-devtool/blob/main/doc/walkthrough.md). Ọ na-edekọ nkọwa zuru ezu banyere otu esi ahazi ma jiri ngwá ọrụ zcash devtool. Ebumnuche ya bụ ịbụ nduzi maka otu esi ahazi ya na otu esi agbakwunye ọrụ nke gị na ngwá ọrụ ahụ.

## Mmalite ngwa ngwa

A nwalere iwu ndị dị n'okpuru megide zcash-devtool `main` (commit `5a26ee8`, Ọgọọst 2026). Ngwá ọrụ ahụ na-agbanwe na-enweghị ọkwa, ya mere jiri `--help` na iwu ọ bụla ma ọ bụrụ na ihe dị ebe a anaghịzi adaba.

### Wụnye

Enweghị binary eburula ụzọ wuo. Wụnye [Rust](https://rustup.rs), wee wuo ya site na isi mmalite:

```bash
git clone https://github.com/zcash/zcash-devtool.git
cd zcash-devtool
cargo run --release -- --help
```

Ihe atụ ndị dị n'okpuru na-akpọ binary e wuru, `target/release/zcash-devtool`. `cargo run --release -- ...` na-arụkwa ọrụ n'otu ụzọ ahụ.

### Mepụta e-akpa ego testnet

Bido na testnet. Mkpụrụ ego testnet (TAZ) enweghị uru.

```bash
zcash-devtool wallet -w ./my-wallet init --name demo -i ./my-wallet-identity.txt -n test
zcash-devtool wallet -w ./my-wallet sync
zcash-devtool wallet -w ./my-wallet balance
```

- `-w` bụ ndekọ e-akpa ego. Ọ na-adị mgbe `wallet` gachara ma tupu subcommand.
- `-i` bụ faịlụ njirimara [age](https://age-encryption.org). A na-eji ya zoo mkpụrụokwu mnemonic nke e-akpa ego, a na-emepụtakwa faịlụ ahụ ma ọ bụrụ na ọ dịghị. Debe ya: `send`, `shield` na iwu mmefu ego ndị ọzọ chọrọ ya iji kpọghee Mkpuru mgbake [seed phrase].
- `-n` bụ netwọk: `test` ma ọ bụ `main`.
- `-s` na-ahọrọ sava e-akpa ego ọkụ. Ndabara, `zecrocks`, na-ejikọ na sava zec.rocks maka netwọk ahọpụtara.
- Iji weghachite e-akpa ego dị adị, jiri `restore-mnemonic` kama `init`. Ọ ga-ajụ gị maka mkpụrụokwu ahụ.

`balance` na-edepụta pool [pool] ọ bụla iche, gụnyere Ironwood:

```
    Balance:   0.00000000 TAZ
     Sapling Spendable:   0.00000000 TAZ
     Orchard Spendable:   0.00000000 TAZ
    Ironwood Spendable:   0.00000000 TAZ
  Unshielded Spendable:   0.00000000 TAZ
```

Gbaa `zcash-devtool wallet -w ./my-wallet list-addresses` iji hụ Adreesị akpa ego jikọtara ọnụ nke e-akpa ego ahụ, wee ziga ya ego testnet site na [faucet faucet](https://zechub.wiki/using-zcash/faucets).

Maka mainnet, tinye `-n main` na `init`. Jiri naanị ego ị nwere ike ịnabata ịla n'iyi.

### Zipu ma chebe

Ọnụ ego dị na zatoshi (1 ZEC = 100,000,000 zatoshi).

```bash
zcash-devtool wallet -w ./my-wallet send -i ./my-wallet-identity.txt \
  --address <recipient address> --value 100000 --memo "hello"
zcash-devtool wallet -w ./my-wallet shield -i ./my-wallet-identity.txt
```

`propose` na-egosi Azụmahia [transaction] nke `send` ga-ewu, na-eziteghị ya. `list-tx` na `list-unspent` na-egosi akụkọ ihe mere eme na note [note] nke e-akpa ego ahụ.

Iwu ọ bụla na-ekwurịta okwu na sava na-anabatakwa `--connection tor`, nke na-agafe njikọ ahụ site na onye ahịa Tor arụnyere n'ime ya.

### Nyochaa Adreesị, mkpịsị ugodi na Azụmahia

`inspect` na-akọwa data Zcash na-enweghị ịntanetị: Adreesị akpa ego, mkpịsị ugodi, na Azụmahia raw. Tinye `--lookup` iji nweta ozi ndị ọzọ site na chain [chain], dịka Azụmahia site na ID ya.

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

A na-eziga note Ironwood n'otu onye nnata Orchard n'ime Adreesị akpa ego jikọtara ọnụ, yabụ Adreesị akpa ego agbanweghị na NU6.3.

### Wuo Azụmahia n’usoro nzọụkwụ site na PCZT

PCZT (Azụmahia Zcash e mepụtara naanị akụkụ ya) na-ekewa iwu Azụmahia n'ime usoro dị iche iche: mepụta, gosi, bịanye aka, ma ziga. Usoro ọ bụla nwere ike ịrụ ọrụ n'igwe dị iche, dịka ọmụmaatụ site na onye na-abịanye aka hardware dịka Keystone. Iwu `pczt` ọ bụla na-agụ PCZT site na faịlụ ma ọ bụ stdin ma dee ya na faịlụ (`--output`) ma ọ bụ stdout, ya mere enwere ike ijikọ usoro ndị ahụ:

```bash
zcash-devtool pczt -w ./my-wallet create --address <recipient address> --value 100000 \
  | zcash-devtool pczt -w ./my-wallet prove -i ./my-wallet-identity.txt \
  | zcash-devtool pczt -w ./my-wallet sign -i ./my-wallet-identity.txt \
  | zcash-devtool pczt -w ./my-wallet send
```

`zcash-devtool pczt --help` na-edepụta usoro ndị ọzọ, gụnyere `inspect`, `redact`, `combine`, `extract` na `shield`.

### Bugharịa ego site na Orchard gaa Ironwood

Kemgbe NU6.3, ego Orchard nwere ike ịkwaga naanị na Adreesị akpa ego nke e-akpa ego ahụ n'onwe ya. Iwu `migration` na-ebuga ha n'ime Ironwood:

```bash
zcash-devtool migration -w ./my-wallet plan
zcash-devtool migration -w ./my-wallet commit -i ./my-wallet-identity.txt
zcash-devtool migration -w ./my-wallet status
zcash-devtool migration -w ./my-wallet advance
```

- `plan` na-eleba anya n'ọdịnihu nkewa note na nhazi oge mbufe, ọ naghị agbanwe ihe ọ bụla.
- `commit` na-ewu ma bịa n'ihu bịanye aka na Azụmahia nkwadebe mbụ. Tinye `--external` iji hapụ ha na-enweghị mbinye aka maka onye na-abịanye aka mpụga dịka Keystone.
- `status` na-egosi ọganihu mbugharị ahụ na usoro na-esote.
- `advance` na-egosi Azụmahia na-esote nke anchor ya dị njikere.

A ka na-ewu iwu mbugharị ndị a. `advance` na-akwụsị na Azụmahia mbụ dị njikere maka mgbasa ozi, n'ihi na etinyebeghị mgbasa ozi n'ime ngwá ọrụ ahụ. Maka iji kwa ụbọchị, jiri e-akpa ego na-akwado Ironwood bugharịa ego. Lee [Pool E Chebere Echebe](https://zechub.wiki/using-zcash/shielded-pools).


**Ịdọ Aka Ná Ntị Maka Nchekwa:**
EJIla NKE A NA MMepụta!!!
Edebeghị ngwa a n'uche nchekwa. Otú ọ dị, o nwere ihe enyemaka dịka Nzobe ederede [encryption] nke mkpụrụokwu mnemonic, nke kwesịrị ime ka ọ kwe omume maka nnwale nta, n'ihe ize ndụ nke gị.

### Nke dị elu (nkuzi librustzcash )


[lee vidio ebe a](https://free2z.cash/uploadz/public/ZcashTutorial/librustzcash-a-rust-crates.mp4)
