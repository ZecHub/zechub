# Kifaa Zcash Dev

[What is the zcash-devtool?](https://github.com/zcash/zcash-devtool?tab=readme-ov-file) 

Zcash Devtool ni jukwaa la udukuzi kwenye Zcash. Limejengwa na watengenezaji, kwa ajili ya watengenezaji, kwa ajili ya kujaribu na kutengeneza utendaji mpya Zcash; na halipaswi kuzingatiwa kuwa tayari kwa uzalishaji. API ya mstari wa amri ambayo kifaa hiki kinafichua inaweza na itabadilika wakati wowote na bila onyo. USITOE fedha nyingi kwa usimamizi wa pochi iliyopachikwa ya zcash-devtool.

### Mafunzo ya video ya Zcash Devtool:
Kris Nuttycombe (@nuttycom) aliwasilisha zana hii wakati wa ZconVI.

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

Kwa mwongozo wa hatua kwa hatua wa jinsi ya kuanza kutumia zana hizi, tazama [mwongozo huu](https://github.com/zcash/zcash-devtool/blob/main/doc/walkthrough.md)Inaandika muhtasari kamili wa jinsi ya kuanzisha na kutumia zana za zcash devtool. Imekusudiwa kutumika kama mwongozo wa jinsi ya kuanzisha na jinsi ya kuongeza utendaji wako mwenyewe kwenye zana.

## Anza haraka

Amri zilizo hapa chini zilikaguliwa dhidi ya zcash-devtool `main` (kujitolea `5a26ee8`, Agosti 2026). Kifaa hubadilika bila taarifa, kwa hivyo endesha `--help` kwa amri yoyote ikiwa kitu hapa hakiendani tena.

### Sakinisha

Hakuna jozi zilizojengwa tayari. Sakinisha [Rust](https://rustup.rs), kisha jenga kutoka chanzo:

```bash
git clone https://github.com/zcash/zcash-devtool.git
cd zcash-devtool
cargo run --release -- --help
```

Mifano iliyo hapa chini inaita binary iliyojengwa, `target/release/zcash-devtool`. `cargo run --release -- ...` hufanya kazi kwa njia ile ile.

### Unda pochi ya testnet

Anza kwenye testnet. Sarafu za Testnet (TAZ) hazina thamani.

```bash
zcash-devtool wallet -w ./my-wallet init --name demo -i ./my-wallet-identity.txt -n test
zcash-devtool wallet -w ./my-wallet sync
zcash-devtool wallet -w ./my-wallet balance
```

- `-w` ni saraka ya pochi. Inafuata `wallet` na kabla ya amri ndogo.
- `-i` is an [umri](https://age-encryption.org) Faili ya utambulisho. Kifungu cha kumbukumbu cha pochi kimesimbwa kwa njia fiche, na faili huundwa ikiwa haipo. Ihifadhi: `send`, `shield` na amri zingine za matumizi zinahitaji ili kuondoa msimbo wa siri wa mbegu.
- `-n` mtandao ni: `test` or `main`.
- `-s` huchagua seva nyepesi ya pochi. Chaguo-msingi, `zecrocks`, huunganisha kwenye seva ya zec.rocks kwa mtandao uliochaguliwa.
- Ili kurejesha pochi iliyopo, tumia `restore-mnemonic` badala ya `init`Inaashiria kifungu cha maneno.

`balance` inaorodhesha kila bwawa la kuogelea kando, ikijumuisha Ironwood:

```
    Balance:   0.00000000 TAZ
     Sapling Spendable:   0.00000000 TAZ
     Orchard Spendable:   0.00000000 TAZ
    Ironwood Spendable:   0.00000000 TAZ
  Unshielded Spendable:   0.00000000 TAZ
```

Kimbia `zcash-devtool wallet -w ./my-wallet list-addresses` kuona anwani ya pamoja ya pochi, na kuituma pesa za testnet kutoka kwa [bomba](https://zechub.wiki/using-zcash/faucets).

Kwa mtandao mkuu, pasi `-n main` to `init`Tumia tu kiasi unachoweza kumudu kupoteza.

### Tuma na ulinde

Kiasi kiko katika zatoshis (1 ZEC = 100,000,000 zatoshi).

```bash
zcash-devtool wallet -w ./my-wallet send -i ./my-wallet-identity.txt \
  --address <recipient address> --value 100000 --memo "hello"
zcash-devtool wallet -w ./my-wallet shield -i ./my-wallet-identity.txt
```

`propose` inaonyesha muamala a `send` ingejenga, bila kuituma. `list-tx` na `list-unspent` Onyesha historia na maelezo ya pochi.

Amri yoyote inayozungumza na seva pia inakubali `--connection tor`, ambayo hupitisha muunganisho kupitia mteja Tor aliyejengewa ndani.

### Kagua anwani, funguo na miamala

`inspect` husimbua data Zcash nje ya mtandao: anwani, funguo, na miamala ghafi. Ongeza `--lookup` ili kupata taarifa zaidi kutoka kwa mnyororo, kama vile muamala unaofanywa kwa kutumia kitambulisho chake.

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

Noti za Ironwood hutumwa kwa kipokezi kile kile Orchard katika anwani iliyounganishwa, kwa hivyo anwani hazikubadilika na NU6.3.

### Jenga miamala kwa hatua kwa kutumia PCZTs

PCZT (muamala wa Zcash ulioundwa kwa sehemu) hugawanya ujenzi wa muamala katika hatua tofauti: kuunda, kuthibitisha, kusaini, na kutuma. Kila hatua inaweza kuendeshwa kwenye mashine tofauti, kwa mfano na kisaini cha vifaa kama vile Keystone `pczt` amri inasoma PCZT kutoka kwa faili au stdin na kuiandika kwenye faili (`--output`) au stdout, ili hatua ziweze kupigwa bomba:

```bash
zcash-devtool pczt -w ./my-wallet create --address <recipient address> --value 100000 \
  | zcash-devtool pczt -w ./my-wallet prove -i ./my-wallet-identity.txt \
  | zcash-devtool pczt -w ./my-wallet sign -i ./my-wallet-identity.txt \
  | zcash-devtool pczt -w ./my-wallet send
```

`zcash-devtool pczt --help` inaorodhesha hatua zingine, ikiwa ni pamoja na `inspect`, `redact`, `combine`, `extract` na `shield`.

### Hamisha fedha kutoka Orchard hadi Ironwood

Tangu NU6.3, fedha za Orchard zinaweza kuhamishiwa kwenye anwani za pochi pekee `migration` amri zinazihamisha hadi Ironwood:

```bash
zcash-devtool migration -w ./my-wallet plan
zcash-devtool migration -w ./my-wallet commit -i ./my-wallet-identity.txt
zcash-devtool migration -w ./my-wallet status
zcash-devtool migration -w ./my-wallet advance
```

- `plan` huhakiki mgawanyiko wa noti na ratiba ya uhamisho, na haibadilishi chochote.
- `commit` hujenga na kusaini mapema miamala ya kwanza ya maandalizi. Ongeza `--external` kuziacha bila saini kwa mtu wa nje kama vile Keystone.
- `status` inaonyesha maendeleo ya uhamiaji na hatua inayofuata.
- `advance` inathibitisha muamala unaofuata ambao nanga yake iko tayari.

Amri za uhamiaji bado zinajengwa. `advance` husimama katika muamala wa kwanza ambao uko tayari kutangazwa, kwa sababu utangazaji haujatekelezwa kwenye kifaa bado. Kwa matumizi ya kila siku, hamisha pesa ukitumia pochi inayounga mkono Ironwood. Tazama [Mabwawa ya Kuogelea Yenye Ngao](https://zechub.wiki/using-zcash/shielded-pools).


**Maonyo ya Usalama:**
USITUMIE HII KATIKA UZALISHAJI!!!
Programu hii haijaandikwa kwa kuzingatia usalama. Hata hivyo, ina uwezo kama vile usimbaji fiche wa vifungu vya mnemonic ambavyo vinapaswa kuifanya iweze kutumika kwa majaribio madogo, kwa hatari yako mwenyewe.

### Kina (librustzcash)


[tazama video hapa](https://free2z.cash/uploadz/public/ZcashTutorial/librustzcash-a-rust-crates.mp4)


