# Zcash Devtool ƒe dɔwɔnua

[Nukae nye zcash-devtool?](https://github.com/zcash/zcash-devtool?tab=readme-ov-file) 

Zcash Devtool nye mɔnu si dzi woato adze Zcash. Wotue to developers, na developers, na dodokpɔ & ŋgɔyiyi le Zcash dɔwɔwɔ yeyewo; eye mele be woabui be woate ŋu awɔe o. Sedede ƒe API si dɔwɔnu sia ɖe ɖe go ateŋu & atrɔ ɣesiaɣi eye nuxlɔ̃ame manɔmee. MÈGADE ga gã aɖe asi na zcash-devtool embedded wallet la dzikpɔkpɔ o.

### Video nufiame si nye Zcash Devtool:
Kris Nuttycombe (@nuttycom) tsɔ dɔwɔnu sia ɖe go le ZconVI ƒe ɣeyiɣia me.

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

Ne èdi afɔɖeɖe ɖesiaɖe ƒe mɔfiame si ku ɖe alesi nàdze dɔwɔnu siawo zazã gɔme ŋu la, kpɔ [azɔlizɔzɔ sia](https://github.com/zcash/zcash-devtool/blob/main/doc/walkthrough.md). Eŋlɔa azɔlizɔzɔ blibo aɖe ɖi le alesi woaɖo zcash devtool dɔwɔnuwo ahazãe ŋu. Woɖoe be wòanye mɔfianu na alesi nàwɔ aɖoe kple alesi nàtsɔ wò ŋutɔ wò dɔwɔwɔ akpe ɖe dɔwɔnua ŋu.

## Dze egɔme kaba

Wolé ŋku ɖe sedede siwo le ete ŋu le zcash-devtool me `main` (tsɔ na `5a26ee8`, Afɔfiɛ 2026). Dɔwɔnua trɔna ɣeyiɣi aɖeke maxɔmaxɔe, eyata ƒu du `--help` le sedede ɖesiaɖe dzi ne nane megasɔ le afisia o.

### Ɖoe anyi

Binaries siwo wotu do ŋgɔ aɖeke meli o. Ɖoe anyi [Rust](https://rustup.rs), emegbe nàtu tso dzɔtsoƒe:

```bash
git clone https://github.com/zcash/zcash-devtool.git
cd zcash-devtool
cargo run --release -- --help
```

Kpɔɖeŋu siwo le ete yɔ binary si wotu, `target/release/zcash-devtool`. `cargo run --release -- ...` wɔa dɔ le mɔ ma ke nu.

### Wɔ testnet gakotoku aɖe

Dze egɔme tso testnet dzi. Asixɔxɔ aɖeke mele Testnet gaku (TAZ) ŋu o.

```bash
zcash-devtool wallet -w ./my-wallet init --name demo -i ./my-wallet-identity.txt -n test
zcash-devtool wallet -w ./my-wallet sync
zcash-devtool wallet -w ./my-wallet balance
```

- `-w` nye gakotokua ƒe nyatakakadzraɖoƒe. Eyina ɖe eyome `wallet` kple do ŋgɔ na sedede suea.
- `-i` is an [ƒe](https://age-encryption.org) amenyenye ƒe faɛl. Wotsɔa gakotokua ƒe ŋkuɖodzinyagbɔgblɔa dea nyagbewo me, eye wowɔa faɛl la ne meli o. Dzrae ɖo: `send`, `shield` kple gazazã ƒe sedede bubuwo hiãe be woatsɔ aɖe nukua gɔme.
- `-n` nye network la: `test` or `main`.
- `-s` tiaa kekeli gakotoku ƒe dɔwɔƒea. Nusi woɖo ɖi, `zecrocks`, doa ka kple zec.rocks dɔdzikpɔla na network si nètia.
- Be nàgbugbɔ gakotoku si li xoxo aɖo anyi la, zãe `restore-mnemonic` ɖe eteƒe `init`. Eʋãa ame be woagblɔ nyagbɔgblɔa.

`balance` ŋlɔ ta ɖesiaɖe ɖe vovo, eye Ironwood:

```
    Balance:   0.00000000 TAZ
     Sapling Spendable:   0.00000000 TAZ
     Orchard Spendable:   0.00000000 TAZ
    Ironwood Spendable:   0.00000000 TAZ
  Unshielded Spendable:   0.00000000 TAZ
```

Ƒu du `zcash-devtool wallet -w ./my-wallet list-addresses` be nàkpɔ gakotokua ƒe adrɛs si wowɔ ɖekae, eye nàɖo testnet ga ɖee tso a [faucet si wotsɔna ƒoa ʋu](https://zechub.wiki/using-zcash/faucets).

Le mainnet gome la, to eme `-n main` to `init`. Ga home siwo nàte ŋu abu koe nàzã.

### Midɔ ɖa eye miakpɔ akpoxɔnu ɖa

Agbɔsɔsɔmeawo le zatoshi me (ZEC 1 = zatoshi 100,000,000).

```bash
zcash-devtool wallet -w ./my-wallet send -i ./my-wallet-identity.txt \
  --address <recipient address> --value 100000 --memo "hello"
zcash-devtool wallet -w ./my-wallet shield -i ./my-wallet-identity.txt
```

`propose` fia asitsatsa la a `send` atu, evɔ maɖoe ɖa o. `list-tx` kple `list-unspent` fia gakotokua ƒe ŋutinya kple nuŋlɔɖiwo.

Sedede ɖesiaɖe si ƒo nu kple server hã xɔa edzi `--connection tor`, si kplɔa kadodoa to Tor asitsala si wotu ɖe eme la dzi.

### Lé ŋku ɖe adrɛswo, safuiwo kple asitsatsa ŋu

`inspect` decodes Zcash data offline: adrɛswo, safuiwo, kple asitsatsa xoxowo. Kpee ɖe eŋu `--lookup` be woaxɔ nyatakaka geɖe tso kɔsɔkɔsɔa me, abe asitsatsa to eƒe ID dzi ene.

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

Woɖoa Ironwood ƒe nuŋlɔɖiwo ɖe Orchard nuxɔla ɖeka ma ke le adrɛs ɖeka dzi, eyata adrɛswo metrɔ kple NU6.3.

### Tu asitsatsa le afɔɖeɖewo me kple PCZTwo

PCZT (Zcash asitsatsa si wowɔ ƒe akpa aɖe) ma asitsatsa tutu ɖe afɔɖeɖe vovovowo me: wɔ, ɖo kpe edzi, de asi ete, eye nàɖoe ɖa. Afɔɖeɖe ɖesiaɖe ateŋu awɔ dɔ le mɔ̃ vovovo dzi, le kpɔɖeŋu me kple hardware signer abe Keystone. Ɖe sia ɖe `pczt` sedede xlẽa PCZT tso faɛl alo stdin me eye wòŋlɔnɛ ɖe faɛl me (`--output`) alo stdout, ale be woate ŋu atsɔ pɔmpi awɔ afɔɖeɖeawo:

```bash
zcash-devtool pczt -w ./my-wallet create --address <recipient address> --value 100000 \
  | zcash-devtool pczt -w ./my-wallet prove -i ./my-wallet-identity.txt \
  | zcash-devtool pczt -w ./my-wallet sign -i ./my-wallet-identity.txt \
  | zcash-devtool pczt -w ./my-wallet send
```

`zcash-devtool pczt --help` yɔ afɔɖeɖe bubuawo, siwo dometɔ aɖewoe nye `inspect`, `redact`, `combine`, `extract` kple `shield`.

### Tsɔ ga tso Orchard yi Ironwood

Tso NU6.3, Orchard ga ate ŋu aʋu ayi gakotokua ŋutɔ ƒe adrɛswo dzi ko. The `migration` sededewo ʋu wo yi Ironwood:

```bash
zcash-devtool migration -w ./my-wallet plan
zcash-devtool migration -w ./my-wallet commit -i ./my-wallet-identity.txt
zcash-devtool migration -w ./my-wallet status
zcash-devtool migration -w ./my-wallet advance
```

- `plan` kpɔa nuŋlɔɖiawo ƒe mamawo kple asitɔtrɔ ƒe ɖoɖowɔɖia do ŋgɔ, eye metrɔa naneke o.
- `commit` tua dzadzraɖo ƒe asitsatsa gbãtɔwo eye wòdea asi wo te do ŋgɔ. Kpee ɖe eŋu `--external` be woagblẽ wo ɖi womade asi ete na gotagome amesi de asi ete abe Keystone.
- `status` fia ʋuʋua ƒe ŋgɔyiyi kple afɔɖeɖe si kplɔe ɖo.
- `advance` ɖo kpe asitsatsa si kplɔe ɖo si ƒe seke le klalo dzi.

Wogale ʋuʋu ƒe sededeawo tum kokoko. `advance` tɔ ɖe asitsatsa gbãtɔ si le klalo be woaɖe gbeƒãe, elabena womewɔ gbeƒãɖeɖedɔa ŋudɔ le dɔwɔnua me haɖe o. Le gbesiagbe zazã gome la, tsɔ gakotoku si doa alɔ Ironwood. Kpɔ [Ta Siwo Wotsɔ Akpoxɔnu Wɔe](https://zechub.wiki/using-zcash/shielded-pools).


**Dedienɔnɔ Ŋuti Nuxlɔ̃amewo:**
MÈGAZÃ SIA LE NUWƆWƆ ME O!!!
Womeŋlɔ dɔwɔnua kple dedienɔnɔ le susu me o. Gake ŋutetewo le esi abe ŋkuɖodzinu nuku ƒe nyagbewo ƒe nya ɣaɣlawo ɣla ene si wòle be wòana wòate ŋu awɔ dodokpɔ suewo, le wò ŋutɔ wò afɔku me.

### Deŋgɔ (librustzcash ƒe nufiame )


[kpɔ video le afisia](https://free2z.cash/uploadz/public/ZcashTutorial/librustzcash-a-rust-crates.mp4)


