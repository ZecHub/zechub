# Ọpa Devọl Zcash

[Kí ni zcash-devtool?](https://github.com/zcash/zcash-devtool?tab=readme-ov-file) 

Zcash Devtool jẹ́ pẹpẹ ìfìwéránṣẹ́ fún ìdènà lórí Zcash. Àwọn olùgbékalẹ̀ ló kọ́ ọ, fún àwọn olùgbékalẹ̀, fún ìdánwò àti ìdàgbàsókè iṣẹ́ Zcash tuntun; kò sì yẹ kí a kà á sí pé ó ti ṣetán láti ṣe iṣẹ́. API àṣẹ tí irinṣẹ́ yìí ń fi hàn lè yípadà nígbàkigbà àti láìsí ìkìlọ̀. MÁ ṢE fi owó pàtàkì sí ìṣàkóso àpò ìfipamọ́ zcash-devtool.

### Ìdánilẹ́kọ̀ọ́ fídíò nípa Zcash Devtool:
Kris Nuttycombe (@nuttycom) ṣe àgbékalẹ̀ irinṣẹ́ yìí nígbà ZconVI.

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

Fun itọsọna igbesẹ nipasẹ igbese fun bi o ṣe le bẹrẹ lilo awọn irinṣẹ wọnyi, wo [ìtọ́sọ́nà yìí](https://github.com/zcash/zcash-devtool/blob/main/doc/walkthrough.md)Ó ṣe àkọsílẹ̀ gbogbo àlàyé nípa bí a ṣe lè ṣètò àti lo ohun èlò ìṣiṣẹ́ zcash devtool. Ó jẹ́ láti jẹ́ ìtọ́sọ́nà fún bí a ṣe lè ṣètò àti bí a ṣe lè fi iṣẹ́ tirẹ̀ kún ohun èlò náà.

## Ìbẹ̀rẹ̀ kíákíá

Àwọn àṣẹ ìsàlẹ̀ ni a ṣàyẹ̀wò lòdì sí zcash-devtool `main` (ṣe adehun `5a26ee8`, Oṣù Kẹjọ 2026). Ohun èlò náà máa ń yípadà láìsí ìkìlọ̀, nítorí náà, ṣiṣẹ́ `--help` lórí àṣẹ èyíkéyìí tí ohun kan bá wà níbí kò bá ara mu mọ́.

### Fi sori ẹrọ

Kò sí àwọn oní-àwòrán méjì tí a ti kọ́ tẹ́lẹ̀. Fi sori ẹrọ [Rust](https://rustup.rs), lẹ́yìn náà kọ́ láti orísun:

```bash
git clone https://github.com/zcash/zcash-devtool.git
cd zcash-devtool
cargo run --release -- --help
```

Àwọn àpẹẹrẹ ní ìsàlẹ̀ yìí ń pe onípele méjì tí a kọ́, `target/release/zcash-devtool`. `cargo run --release -- ...` ó ń ṣiṣẹ́ ní ọ̀nà kan náà.

### Ṣẹ̀dá àpò owó testnet kan

Bẹ̀rẹ̀ lórí testnet. Àwọn owó Testnet (TAZ) kò níye lórí.

```bash
zcash-devtool wallet -w ./my-wallet init --name demo -i ./my-wallet-identity.txt -n test
zcash-devtool wallet -w ./my-wallet sync
zcash-devtool wallet -w ./my-wallet balance
```

- `-w` ni àkójọ àpò owó náà. Ó tẹ̀lé e `wallet` àti níwájú àṣẹ ìsàlẹ̀.
- `-i` is an [ọjọ́-orí](https://age-encryption.org) fáìlì ìdánimọ̀. A fi àkọlé àmì ìdánimọ̀ àpò owó náà sí i, a sì ṣẹ̀dá fáìlì náà tí kò bá sí. Pa á mọ́: `send`, `shield` àti àwọn àṣẹ ìnáwó mìíràn nílò rẹ̀ láti fi kọ irúgbìn náà sílẹ̀.
- `-n` nẹ́tíwọ́ọ̀kì ni: `test` or `main`.
- `-s` yan olupin apamọwọ ina. Aiyipada, `zecrocks`, so pọ̀ mọ́ olupin zec.rocks fún nẹ́tíwọ́ọ̀kì tí a yàn.
- Láti dá àpò owó tó wà tẹ́lẹ̀ padà, lo `restore-mnemonic` dípò `init`Ó mú kí gbólóhùn náà wá sí ọkàn.

`balance` ṣe àkójọ adágún kọ̀ọ̀kan lọ́tọ̀ọ̀tọ̀, pẹ̀lú Ironwood:

```
    Balance:   0.00000000 TAZ
     Sapling Spendable:   0.00000000 TAZ
     Orchard Spendable:   0.00000000 TAZ
    Ironwood Spendable:   0.00000000 TAZ
  Unshielded Spendable:   0.00000000 TAZ
```

Sáré `zcash-devtool wallet -w ./my-wallet list-addresses` láti rí àdírẹ́sì àpapọ̀ ti àpò owó náà, kí o sì fi owó testnet ránṣẹ́ sí i láti ọ̀dọ̀ [páìpù omi](https://zechub.wiki/using-zcash/faucets).

Fun mainnet, kọja `-n main` to `init`Lo iye owó tí o lè pàdánù nìkan.

### Firanṣẹ ati aabo

Awọn iye wa ni zatoshis (1 ZEC = 100,000,000 zatoshis).

```bash
zcash-devtool wallet -w ./my-wallet send -i ./my-wallet-identity.txt \
  --address <recipient address> --value 100000 --memo "hello"
zcash-devtool wallet -w ./my-wallet shield -i ./my-wallet-identity.txt
```

`propose` fihan iṣowo naa a `send` yóò kọ́lé, láìfi ránṣẹ́. `list-tx` àti `list-unspent` fi ìtàn àti àkọsílẹ̀ àpò owó náà hàn.

Àṣẹ èyíkéyìí tí ó bá bá olupin sọ̀rọ̀ tún ń gba `--connection tor`, èyí tí ó ń darí ìsopọ̀ náà nípasẹ̀ oníbàárà Tor tí a ṣe sínú rẹ̀.

### Ṣe àyẹ̀wò àwọn àdírẹ́sì, àwọn kọ́kọ́rọ́ àti àwọn ìṣòwò

`inspect` Ó ń yí ìyípadà padà sí ìkànnì Zcash: àwọn àdírẹ́sì, àwọn kọ́kọ́rọ́, àti àwọn ìṣòwò tí a kò ṣe. Fi kún un `--lookup` láti gba ìwífún síi láti inú ẹ̀wọ̀n náà, bí ìṣòwò kan nípasẹ̀ ID rẹ̀.

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

A máa ń fi àwọn àkọsílẹ̀ Ironwood ránṣẹ́ sí olùgbà Orchard kan náà ní àdírẹ́sì kan náà, nítorí náà, àdírẹ́sì náà kò yípadà pẹ̀lú NU6.3.

### Kọ awọn iṣowo ni awọn igbesẹ pẹlu PCZTs

PCZT (ìṣòwò Zcash tí a ṣẹ̀dá díẹ̀) pín ṣíṣe ìṣòwò sí àwọn ìgbésẹ̀ ọ̀tọ̀ọ̀tọ̀: ṣẹ̀dá, fi hàn, fọwọ́ sí, àti fi ránṣẹ́. Ìgbésẹ̀ kọ̀ọ̀kan lè ṣiṣẹ́ lórí ẹ̀rọ mìíràn, fún àpẹẹrẹ pẹ̀lú àmì ẹ̀rọ bíi Keystone `pczt` àṣẹ náà ka PCZT láti inú fáìlì tàbí stdin ó sì kọ ọ́ sí fáìlì kan (`--output`) tàbí stdout, kí a lè fi àwọn ìgbésẹ̀ náà sí ọ̀nà:

```bash
zcash-devtool pczt -w ./my-wallet create --address <recipient address> --value 100000 \
  | zcash-devtool pczt -w ./my-wallet prove -i ./my-wallet-identity.txt \
  | zcash-devtool pczt -w ./my-wallet sign -i ./my-wallet-identity.txt \
  | zcash-devtool pczt -w ./my-wallet send
```

`zcash-devtool pczt --help` ṣe atokọ awọn igbesẹ miiran, pẹlu `inspect`, `redact`, `combine`, `extract` àti `shield`.

### Gbe owo lati Orchard si Ironwood

Láti NU6.3, owó Orchard lè gbé lọ sí àdírẹ́sì àpò owó náà nìkan `migration` awọn aṣẹ gbe wọn sinu Ironwood:

```bash
zcash-devtool migration -w ./my-wallet plan
zcash-devtool migration -w ./my-wallet commit -i ./my-wallet-identity.txt
zcash-devtool migration -w ./my-wallet status
zcash-devtool migration -w ./my-wallet advance
```

- `plan` ṣe àgbéyẹ̀wò ìpínyà àkọsílẹ̀ àti ìtòlẹ́sẹẹsẹ ìgbésẹ̀, kò sì yí ohunkóhun padà.
- `commit` kọ àti fọwọ́ sí àwọn ìṣòwò ìmúrasílẹ̀ àkọ́kọ́ `--external` láti fi wọ́n sílẹ̀ láìsí ìfọwọ́sowọ́pọ̀ fún ẹni tí ó fọwọ́ sí ìta bí Keystone.
- `status` fi ìlọsíwájú ìrìnàjò àti ìgbésẹ̀ tó tẹ̀lé hàn.
- `advance` fi idi iṣowo ti o tẹle ti o ti ṣetan han.

Àwọn àṣẹ ìṣíkiri ṣì ń kọ́. `advance` dúró ní ìṣòwò àkọ́kọ́ tí ó ti ṣetán láti gbé jáde, nítorí pé a kò tíì lo ìgbóhùnsáfẹ́fẹ́ nínú ohun èlò náà. Fún lílo ojoojúmọ́, gbé owó lọ pẹ̀lú àpò owó tí ó ń gbé Ironwood. Wo [Àwọn Adágún Tí A Dáàbò Bo](https://zechub.wiki/using-zcash/shielded-pools).


**Awọn Ikilọ Aabo:**
MÁ ṢE LÒ ÈYÍ NÍNÚ ÌṢẸ̀DÁ!!!
A kò kọ àpù náà pẹ̀lú ààbò ní ọkàn. Síbẹ̀, ó ní àwọn àǹfààní bíi fífi àwọn gbólóhùn ìṣàpẹẹrẹ pamọ́ tí ó yẹ kí ó jẹ́ kí ó ṣeé ṣe fún ìdánwò kékeré, ní ewu ara rẹ.

### To ti ni ilọsiwaju (librustzcash)


[wo fidio nibi](https://free2z.cash/uploadz/public/ZcashTutorial/librustzcash-a-rust-crates.mp4)


