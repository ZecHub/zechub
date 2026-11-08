# Zcash Devtool

[Nu ka nye zcash-devtool?](https://github.com/zcash/zcash-devtool?tab=readme-ov-file) 

Zcash Devtool nye platform si wozãna be woawɔ dɔ le Zcash ŋu. Mɔ̃ ƒe ɖoɖoŋlɔlawoe wɔe na mɔ̃ ƒe ɖoɖoŋlɔlawo, be woaɖe kpɔ eye woatsɔ aɖa Zcash ƒe dɔwɔwɔ yeye; eye womele be woatsɔe awɔ dɔ le production me o. Command line API si dɔwɔnu sia doa fia la ate ŋu atrɔ eye wòatrɔ ɣe sia ɣe manɔ woɖeŋugbeɖeŋu o. MEGATSƆ ga gã aɖo zcash-devtool gakotoku si le eme la ƒe dzikpɔkpɔ me o.

### Video fiala tso Zcash Devtool ŋu:
Kris Nuttycombe (@nuttycom) fia dɔwɔnu sia le ZconVI me.

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

Ne woaɖo ɖoɖoɖoɖo me fiafia tso ale si nàdze egɔme atsɔ dɔwɔnu siawo azã la ta, kpɔ [fiafia sia](https://github.com/zcash/zcash-devtool/blob/main/doc/walkthrough.md). Eɖe mɔ blibo fia ale si woaɖo zcash devtool tooling eye woazãe. Wode eŋu be wòanye fiafia na ale si nàɖo wò ɖokui eye nàtsɔ wò ŋutɔ ƒe dɔwɔwɔ akpe ɖe dɔwɔnu la ŋu.

## Gɔmedzedze kabakaba

Woɖe kpɔ sededewo siwo le ete la kple zcash-devtool `main` (commit `5a26ee8`, August 2026). Dɔwɔnu la trɔna manɔ woɖeŋugbeɖeŋu o, eyata wɔ `--help` le sedede aɖeke ŋu ne nu si le afisia megale ɖe sia ɖe kplee o.

### Ɖo

Binary si woɖo ɖe ŋgɔgɔme mele o. Ɖo [Rust](https://rustup.rs), eye nàtu tso source me:

```bash
git clone https://github.com/zcash/zcash-devtool.git
cd zcash-devtool
cargo run --release -- --help
```

Ŋutinya siwo le ete la yɔ binary si woɖo, `target/release/zcash-devtool`. `cargo run --release -- ...` hã wɔ dɔ ale kee.

### Wɔ testnet gakotoku

Dzɔ le testnet dzi. Testnet coins (TAZ) me xɔasi aɖeke mele o.

```bash
zcash-devtool wallet -w ./my-wallet init --name demo -i ./my-wallet-identity.txt -n test
zcash-devtool wallet -w ./my-wallet sync
zcash-devtool wallet -w ./my-wallet balance
```

- `-w` nye gakotoku ƒe directory. Etsi le `wallet` megbe eye le subcommand la ŋgɔ.
- `-i` nye [age](https://age-encryption.org) ƒe identity file. Woɣaɣla gakotoku la ƒe mnemonic phrase na e, eye woawɔ file la ne menɔ o. Ɖe asi ɖe eŋu: `send`, `shield` kple spending ƒe sedede bubuwo hia e be woaɖe seed la ƒe ɣaɣlaŋlɔŋlɔ.
- `-n` nye network la: `test` alo `main`.
- `-s` tia light wallet server la. Default la, `zecrocks`, ƒoa ɖe zec.rocks server la ŋu na network si wotia.
- Be nàtrɔ gakotoku si le asiwò xoxo la, zã `restore-mnemonic` ɖe `init` teƒe. Ebi phrase la tso asiwò.

`balance` ɖe gaƒuƒoƒo sia sia fia le eɖokui me, kple Ironwood:

```
    Balance:   0.00000000 TAZ
     Sapling Spendable:   0.00000000 TAZ
     Orchard Spendable:   0.00000000 TAZ
    Ironwood Spendable:   0.00000000 TAZ
  Unshielded Spendable:   0.00000000 TAZ
```

Wɔ `zcash-devtool wallet -w ./my-wallet list-addresses` be nàkpɔ gakotoku la ƒe unified address, eye nàtsɔ testnet funds nadzoe tso [ga suewo nanaƒe](https://zechub.wiki/using-zcash/faucets) aɖe gbɔ.

Na mainnet, tsɔ `-n main` na `init`. Zã ga si nàte ŋu abu ne wòbu ko.

### Do ga eye nàɣaɣlae

Gaƒeƒewo le zatoshis me (1 ZEC = 100,000,000 zatoshis).

```bash
zcash-devtool wallet -w ./my-wallet send -i ./my-wallet-identity.txt \
  --address <recipient address> --value 100000 --memo "hello"
zcash-devtool wallet -w ./my-wallet shield -i ./my-wallet-identity.txt
```

`propose` fia gaɖoɖo si `send` aɖo, ke wòmeɖoa eɖa o. `list-tx` kple `list-unspent` fia gakotoku la ƒe ŋutinya kple didienuwo.

Sedede aɖeke si ƒoa nu kple server hã xɔ `--connection tor`, si tsɔa kadodo la to Tor client si le eme la me.

### Kpɔ gaɖoƒe ƒe dzesiwo, keys kple gaɖoɖowo me nyuie

`inspect` gɔmeɖea Zcash ƒe data le offline: gaɖoƒe ƒe dzesiwo, keys, kple raw transactions. Tsɔ `--lookup` kpee be nàxɔ nyatakaka geɖe tso ɖoɖonu la me, abe gaɖoɖo aɖe le eƒe ID nu ene.

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

Ironwood didienuwo wodɔa wo ɖe Orchard receiver ma ke gbɔ le unified address me, eyata gaɖoƒe ƒe dzesiwo metrɔ kple NU6.3 o.

### Tu gaɖoɖowo le afɔɖeɖewo me kple PCZTs

PCZT (Zcash gaɖoɖo si wo wɔ ƒe akpa) maa gaɖoɖo tutu la yi afɔɖeɖe vovovo me: wɔe, ɖe kpeɖeŋu fia, de asi ɖe eŋu, eye nàdɔe. Afɔɖeɖe sia sia ate ŋu adzɔ le mɔ̃ aɖe ŋu, abe hardware signer si lɔ̃ Keystone ene. `pczt` ƒe sedede sia sia xlẽa PCZT tso file aɖe alo stdin me eye wòŋlɔa e ɖe file aɖe (`--output`) alo stdout me, eyata woate ŋu aɖo afɔɖeɖewo ɖe pipe me:

```bash
zcash-devtool pczt -w ./my-wallet create --address <recipient address> --value 100000 \
  | zcash-devtool pczt -w ./my-wallet prove -i ./my-wallet-identity.txt \
  | zcash-devtool pczt -w ./my-wallet sign -i ./my-wallet-identity.txt \
  | zcash-devtool pczt -w ./my-wallet send
```

`zcash-devtool pczt --help` ƒoa afɔɖeɖe bubuwo hã, kple `inspect`, `redact`, `combine`, `extract` kple `shield`.

### Tsɔ ga tso Orchard yi Ironwood

Tso NU6.3 dzi, Orchard ƒe gawo ate ŋu ayi gakotoku la ŋutɔ ƒe gaɖoƒe ƒe dzesiwo ko gbɔ. `migration` ƒe sededewo tsɔa wo yi Ironwood me:

```bash
zcash-devtool migration -w ./my-wallet plan
zcash-devtool migration -w ./my-wallet commit -i ./my-wallet-identity.txt
zcash-devtool migration -w ./my-wallet status
zcash-devtool migration -w ./my-wallet advance
```

- `plan` fia didienu ƒe mamawo kple transfer ƒe ɣeyiɣiɖoɖo ɖe ŋgɔ, eye metrɔa naneke o.
- `commit` tua eye wòde asi ɖe preparation gaɖoɖo gbãtɔwo ŋu ɖe ŋgɔ. Tsɔ `--external` kpee be nàɖe wo ƒe asiɖeɖe le aƒe me na signer bubu aɖe abe Keystone ene.
- `status` fia migration la ƒe ŋgɔyiyi kple afɔɖeɖe si kplɔe ɖo.
- `advance` dea kpeɖeŋu fia na gaɖoɖo si kplɔe ɖo, si ƒe anchor le dzadzɛ.

Migration ƒe sededewo li ɖe tutum dzi ha. `advance` tɔ le gaɖoɖo gbãtɔ si dzadzɛ be woaɖe afia me la ŋu, elabena womewɔ broadcasting ɖe dɔwɔnu la me ha o. Na zãzã le ŋkeke sia ŋkeke me, tsɔ gakotoku si tše Ironwood na be nàtsɔ ga. Kpɔ [Ɣaɣla Gaƒuƒoƒowo](https://zechub.wiki/using-zcash/shielded-pools).


**Dedienɔnɔ ƒe Kunyawo:**
MEGATSƆ ESIA AWƆ DƆ LE PRODUCTION ME O!!!
Womeŋlɔ app la be woaɖe dzidzɔ na dedienɔnɔ o. Ke hã, exɔ mɔnuwo abe mnemonic seed phrases ƒe ɣaɣlaŋlɔŋlɔ ene, siwo ate ŋu ana wòanyo na dodokpɔ sue aɖe, le wò ŋutɔ ƒe afɔku dzi.

### Advanced (librustzcash tutorial )


[kpɔ video la afisia](https://free2z.cash/uploadz/public/ZcashTutorial/librustzcash-a-rust-crates.mp4)
