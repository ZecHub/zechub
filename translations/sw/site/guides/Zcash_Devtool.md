# Devtool ya Zcash

[Devtool ya zcash-devtool ni nini?](https://github.com/zcash/zcash-devtool?tab=readme-ov-file) 

Devtool ya Zcash ni jukwaa la kufanya udukuzi kwenye Zcash. Imeundwa na wasanidi programu [developers], kwa ajili ya wasanidi programu, kwa ajili ya majaribio na uundaji wa utendakazi mpya wa Zcash; na haipaswi kuchukuliwa kuwa tayari kwa matumizi ya uzalishaji. API ya mstari wa amri inayotolewa na kifaa hiki inaweza na itabadilika wakati wowote bila onyo. USIWEKE fedha kubwa chini ya usimamizi wa pochi [wallet] iliyopachikwa ya zcash-devtool.

### Mafunzo ya video ya Devtool ya Zcash:
Kris Nuttycombe (@nuttycom) aliwasilisha kifaa hiki wakati wa ZconVI.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/5gvQF5oFT8E"
    title="zcash-devtool: zana nyingi ya uundaji ya Zcash pamoja na Kris Nuttycombe - ZconVI"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


---

Kwa mwongozo wa hatua kwa hatua wa jinsi ya kuanza kutumia vifaa hivi, tazama [mwongozo huu](https://github.com/zcash/zcash-devtool/blob/main/doc/walkthrough.md). Unaeleza mwongozo kamili wa jinsi ya kusanidi na kutumia vifaa vya zcash devtool. Unakusudiwa kutumika kama mwongozo wa jinsi ya kusanidi na kuongeza utendakazi wako mwenyewe kwenye kifaa hiki.

## Mwanzo wa haraka

Amri zilizo hapa chini zilihakikiwa dhidi ya zcash-devtool `main` (commit `5a26ee8`, Agosti 2026). Kifaa hubadilika bila onyo, kwa hivyo endesha `--help` kwenye amri yoyote ikiwa kitu hapa hakilingani tena.

### Usakinishaji

Hakuna jozi za programu zilizojengwa mapema. Sakinisha [Rust](https://rustup.rs), kisha unda kutoka kwenye chanzo:

```bash
git clone https://github.com/zcash/zcash-devtool.git
cd zcash-devtool
cargo run --release -- --help
```

Mifano iliyo hapa chini hutumia jozi ya programu iliyojengwa, `target/release/zcash-devtool`. `cargo run --release -- ...` hufanya kazi kwa njia ileile.

### Unda pochi ya testnet

Anza kwenye testnet. Sarafu za testnet (TAZ) hazina thamani.

```bash
zcash-devtool wallet -w ./my-wallet init --name demo -i ./my-wallet-identity.txt -n test
zcash-devtool wallet -w ./my-wallet sync
zcash-devtool wallet -w ./my-wallet balance
```

- `-w` ni saraka ya pochi. Huandikwa baada ya `wallet` na kabla ya amri ndogo.
- `-i` ni faili ya utambulisho ya [age](https://age-encryption.org). Maneno ya kurejesha pochi ya pochi husimbwa fiche kwa faili hilo, na faili huundwa ikiwa halipo. Lihifadhi: `send`, `shield` na amri nyingine za matumizi zinahitaji kulifungua ili kufumbua maneno ya kurejesha pochi.
- `-n` ni mtandao: `test` au `main`.
- `-s` huchagua seva ya pochi nyepesi. Chaguomsingi, `zecrocks`, huunganisha kwenye seva ya zec.rocks kwa mtandao uliochaguliwa.
- Ili kurejesha pochi iliyopo, tumia `restore-mnemonic` badala ya `init`. Itaomba maneno hayo.

`balance` huorodhesha kila bwawa [pool] kivyake, ikijumuisha Ironwood:

```
    Balance:   0.00000000 TAZ
     Sapling Spendable:   0.00000000 TAZ
     Orchard Spendable:   0.00000000 TAZ
    Ironwood Spendable:   0.00000000 TAZ
  Unshielded Spendable:   0.00000000 TAZ
```

Endesha `zcash-devtool wallet -w ./my-wallet list-addresses` ili kuona anwani [address] iliyounganishwa ya pochi, na uitumie kupokea fedha za testnet kutoka kwenye [chanzo cha sarafu za bure](https://zechub.wiki/using-zcash/faucets) [faucet].

Kwa mainnet, pitisha `-n main` kwa `init`. Tumia tu kiasi ambacho unaweza kumudu kupoteza.

### Tuma na ufanye kuwa ya faragha

Kiasi huonyeshwa kwa zatoshi (1 ZEC = zatoshi 100,000,000).

```bash
zcash-devtool wallet -w ./my-wallet send -i ./my-wallet-identity.txt \
  --address <recipient address> --value 100000 --memo "hello"
zcash-devtool wallet -w ./my-wallet shield -i ./my-wallet-identity.txt
```

`propose` huonyesha muamala [transaction] ambao `send` ungeunda, bila kuutuma. `list-tx` na `list-unspent` huonyesha historia na madokezo [notes] ya pochi.

Amri yoyote inayowasiliana na seva pia hukubali `--connection tor`, ambayo huelekeza muunganisho kupitia mteja wa Tor uliojengewa ndani.

### Kagua anwani, funguo na miamala

`inspect` hufumbua data ya Zcash nje ya mtandao: anwani, funguo na miamala ghafi. Ongeza `--lookup` ili kupata maelezo zaidi kutoka kwenye mnyororo [chain], kama vile muamala kwa kitambulisho chake.

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

Madokezo ya Ironwood hutumwa kwa kipokezi kilekile cha Orchard katika anwani iliyounganishwa, kwa hivyo anwani hazikubadilika kwa NU6.3.

### Jenga miamala kwa hatua ukitumia PCZT

PCZT (muamala ulioundwa kwa sehemu wa Zcash) hugawanya uundaji wa muamala katika hatua tofauti: unda, thibitisha, tia sahihi, na tuma. Kila hatua inaweza kuendeshwa kwenye mashine tofauti, kwa mfano kwa kutumia kitia sahihi cha hardware kama Keystone. Kila amri ya `pczt` husoma PCZT kutoka kwenye faili au stdin na kuiandika kwenye faili (`--output`) au stdout, kwa hivyo hatua zinaweza kuunganishwa kwa bomba:

```bash
zcash-devtool pczt -w ./my-wallet create --address <recipient address> --value 100000 \
  | zcash-devtool pczt -w ./my-wallet prove -i ./my-wallet-identity.txt \
  | zcash-devtool pczt -w ./my-wallet sign -i ./my-wallet-identity.txt \
  | zcash-devtool pczt -w ./my-wallet send
```

`zcash-devtool pczt --help` huorodhesha hatua nyingine, zikiwemo `inspect`, `redact`, `combine`, `extract` na `shield`.

### Hamisha fedha kutoka Orchard hadi Ironwood

Tangu NU6.3, fedha za Orchard zinaweza kuhamishwa tu hadi kwenye anwani za pochi yenyewe. Amri za `migration` huzihamisha hadi Ironwood:

```bash
zcash-devtool migration -w ./my-wallet plan
zcash-devtool migration -w ./my-wallet commit -i ./my-wallet-identity.txt
zcash-devtool migration -w ./my-wallet status
zcash-devtool migration -w ./my-wallet advance
```

- `plan` hukagua mapema mgawanyo wa dokezo na ratiba ya uhamisho, na haibadilishi chochote.
- `commit` huunda na kutia sahihi mapema miamala ya kwanza ya maandalizi. Ongeza `--external` ili kuiacha bila sahihi kwa kitia sahihi cha nje kama Keystone.
- `status` huonyesha maendeleo ya uhamishaji na hatua inayofuata.
- `advance` huthibitisha muamala unaofuata ambao nanga yake iko tayari.

Amri za uhamishaji bado zinaundwa. `advance` husimama kwenye muamala wa kwanza ulio tayari kutangazwa, kwa sababu utangazaji bado haujatekelezwa kwenye kifaa. Kwa matumizi ya kila siku, hamisha fedha kwa pochi inayotumia Ironwood. Tazama [Mabwawa ya Faragha](https://zechub.wiki/using-zcash/shielded-pools).


**Maonyo ya Usalama:**
USITUMIE HII KWENYE UZALISHAJI!!!
Programu haijaandikwa kwa kuzingatia usalama. Hata hivyo, ina vipengele kama usimbaji fiche [encryption] wa maneno ya kurejesha pochi ambayo yanapaswa kuifanya ifae kwa majaribio madogo, kwa hatari yako mwenyewe.

### Ya Juu (mafunzo ya librustzcash )


[tazama video hapa](https://free2z.cash/uploadz/public/ZcashTutorial/librustzcash-a-rust-crates.mp4)
