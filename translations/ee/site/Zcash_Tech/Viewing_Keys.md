<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Viewing_Keys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Kpɔkplɔtiwo

Shielded addresses let you transact while revealing as little as possible on the Zcash blockchain. So what happens when you *do* need to show a specific party what you hold, or what you sent? Every shielded address has a viewing key that grants read access without granting the ability to spend. Viewing keys were introduced in [ZIP 310 - Eʋegbe me tɔ:](https://zips.z.cash/zip-0310) eye wotsɔ wo kpe ɖe ɖoɖowɔɖia ŋu le Sapling-dzidzraɖoƒea ƒe ŋgɔyiyi me.

Mɔfianu si wotsɔna kpɔa nuwoe nye dɔwɔnu aɖe si ŋu woɖea nu me le nyuie: àte ŋu atia ame siwo akpɔ nusiwo wòdi be yewoakpɔ, eye màtsɔ gaxe ƒe mɔfialawo ade asi na amea gbeɖe o.

## Nukatae wòle be woazã ŋkuɖodzinu?

Electric Coin Company ƒe agbalẽ si wota le nya sia ŋu la ƒo nu tso nɔnɔme siwo doa mo ɖa zi geɖe, eye wogakpɔtɔ nye esiwo bɔ egbea:

- **Gbe si dzi woɖoa ŋku ɖo be ga le ame aɖe ƒe nudzraɖoƒe.** Gbea ɖoa nyatakaka siwo amewo tsɔna ɖe eŋu la ɖa to Internet-ʋunuwo me ale be wòate ŋu akpɔe ne amea zãa eƒe mɔ̃ɖaŋunuawo, evɔ nya vevi si wotsɔna dea asi nunɔamesiwo zazã me ya nɔa dɔwɔnu bubu aɖeke dzi eye medea ka kple internet o.
- **Adzikpɔla aɖe si le kpe ɖom eƒe nunɔamesiwo dzi.** Dzikpɔlaa naa numekulaa kpɔna nyatakakawo katã tso adrɛs siwo ŋu wotrɔ asi le la dometɔ ɖe sia ɖe ŋuti. Numekulaa ate ŋu adzro kadodoawo me ahakpɔ dɔwɔna xoxo siwo wowɔ va yi kple esiwo dzɔ tso address mawo gbɔ, eye mate ŋu awɔ nu bubu aɖeke o.
- **Due diligence on a counterparty.** Ne ehiã be asitsaƒe aɖe nadzro ame si ƒe ŋutinya dzi le eƒe nudzodzrowo me la, ate ŋu abia viewing key tsɔ wu ga.

## Nusiwo ŋkuɖonudzɔdzɔa wɔna kple nusiwo meɖee fia o

Aʋatɔa ƒomevi vovovowoe li, eye vovototo si le wo domee kpɔa alesi gbegbe nàna ame bubui la dzi.

Key. Prefix. Grants. Eye to be done, eye to be deleted.
|---|---|---|
 Unified Full Viewing Key (UFVK) - Kpeɖonuɖeameŋu ƒe mɔ̃ si le ɖeka. `uview…` Kpɔa nu siwo katã le va kple esiwo gbɔna la ƒe dɔwɔnawo ɖe sia ɖe si nɔ eƒe asitelefon dzi.
 Unified Incoming Viewing Key (UIVK)  Kpe ɖe ame ŋu be wòakpɔ nu siwo le edzi yim la ƒe dzesiwo. `uivk…` Kpɔa nu siwo katã wowɔna le ga me la ko, eye wòkpɔa wo dometɔ ɖe sia ɖe ƒe ŋkɔwo hã.
Sapling ƒe mɔfianu si wotsɔna kpɔa nu le gotagome. `zxviews…` Ekpɔa nu siwo le edzi yim kple esiwo gbɔna tso Sapling ƒe adrɛswo gbɔ.

Wo dometɔ aɖeke mate ŋu azã ga o. Wonyea nu si nɔa anyi ɖaa le mɔ vevi aɖe nu: womate ŋu aɖo ŋku safui siwo nèna la dzi gbeɖe o, ɖeko woagblẽe ɖi to nudzɔdzɔwo tsɔtsɔ yi gakɔnta si ƒe safui ame kemɛa megale asi na wò o dzi ko.

Ele be nànya nu eve aɖewo siwo ana amewo naɖe woƒe susuwo agblɔ hafi aɖe nya ɖe ame bubuwo ŋu.

**Esi wole nu xɔm la mefia be woade ame dzi o.** Eʋevi si le mɔ ɖeka aɖe nu siwo gbɔna kpɔkpɔ nyea nyatakakawo katã, menye nyatia ƒe adrɛs si wobia wò tso eŋu ye o. Ne èna UIVK ɖe asi na Sapling-adrɛs ɖeka ko hã la, enana wokpɔ nusiwo gbɔna va ge le agbalẽ sia me tɔwo dome godoo, eyata eɖe nya geɖe fia wu alesi eƒe ŋkɔ dze. [Zallet Agbalẽa](https://zcash.github.io/zallet/zcashd/json_rpc.html) gblɔ nya sia eme kɔ.

**Adzesi si woɖe ɖe go la na be futɔ aɖe ate ŋu akpɔe.** [ZIP 326 ƒe adrɛswo](https://zips.z.cash/zip-0326) Eŋlɔ be ame si le asitelefon dzi ate ŋu akpɔ nyatakaka siwo gbɔna tso adrɛs vovovo siwo woɖe ɖe go la me, gake ne wo dometɔ ɖeka nye nuxexlẽdzesi aɖe ko la womate ŋu ake ɖe eŋu o. Adrɛs ƒe tata kple nyagbɔgblɔa to vovo egbea ya, ke hã woate ŋu awɔ esia bɔbɔe wu zi geɖe.

## Ironwood ƒe kpukpuiwo kpɔkpɔ megbe

NU6.3 na Ironwood ƒe tsimɔ si me wotea ŋu dea ga nu o la va ɖo eye wòna Orchard-tsimɔa nyea ame siwo zãa gaa ko tɔ, ale be gadzraɖoƒewo ʋuna tso ɖeka yi bubu dzi le ɣeyiɣi aɖe megbe. Kpɔe ɖa [Atikpowo](/zcash-tech/ironwood) kple [Gadzraɖoƒea ƒe akpa si le ʋuʋu me.](/zcash-tech/the-turnstile) le ŋgɔyiyi si wowɔ la ŋutɔ me.

**View key si wota do ŋgɔ na Ironwood yi edzi le dɔ wɔm ne wotrɔe.** ZIP 326 gblɔna be xɔla, kple eƒe view key la ƒe akpa siwo va ɖo la nyea Orchard *protocol* ke menye pool o: eye to trial-decrypt me ko hafi woate ŋu aɖe nuŋɔŋlɔwo ɖa tso nutata sia dzi. Zallet wɔ esia ale wòɖɔ ironwood notes abe orchard ene heɖe woƒe numegbe ɖe go tsɔ kpe asi ɖe account's orchard viewing keys ŋuti le Ironwood note encryption domeename te.

Nu etɔ̃ ate ŋu adzɔ ɖe ame sia ame si léa ʋɔtru aɖe alo tsɔnɛ nana la dzi:

1. **Adzadzɔwo ʋuna le tsiƒutawo dome, eye nukpɔlaa kpɔa alesi wòdzɔnae.** [ZIP 318 (Afi si woɖo ame ɖo)](https://zips.z.cash/zip-0318) Eɖe ʋuʋu gɔme be enye Orchard-to-Ironwood nuxexlẽ suewo ƒe ɖoɖo si woɖona le ɣeyiɣi ɖeka me, eye ne ame aɖe zãa eƒe ga la wòtea ŋu kpɔa nuwo katã siwo wotsɔna wɔa dɔe. Le kpɔɖeŋu me, agbalẽdzraɖoƒea gblɔ na numekula aɖewo be woƒe asitelefon dzi nyatakakawo nɔa tɔtrɔm tso teƒe yi teƒe to afɔɖeɖe vovovowo me hena kwasiɖa geɖe ke menye zi ɖeka ko o. Wozãa kɔmpiuta ŋuti nuŋlɔɖi bubuwo hã tsɔ ɖea gbeƒã nudzɔdzɔawo kple ale si wowɔ dɔae.
2. **Migation ɖe sia ɖe ƒe afɔɖeɖe ɖea asixɔxɔ si wòʋuna fiana.** Esia nyea mɔ̃ aɖe dzi yiyi, eye eyae nana be woate ŋu adzro ʋua me. Ne woma ga home la ɖe Biblia-gbalẽwo dome la, ema fia be nu ɖeka aɖeke mate ŋu ana woakpɔ Orchard pool bliboa katã o.
3. **Afɔ siwo wowɔ le Ironwood megbe la ƒe safuiwo ate ŋu ato vovo.** [ZIP ƒe 2005 me tɔ](https://zips.z.cash/zip-2005) kpe ɖe eŋu be: `use_qsk` Etrɔ alesi woxɔa nu siwo va, esiwo do kple nusiwo le vovovo la ƒe mɔwoe. Eyata: `use_qsk = true` ZIP 326 bia be adã la nanɔ ɖeka le nyatakakawo katã me eye wòxe mɔ ɖe edodo nu na ame bubuwo ŋu. `use_qsk = true` keys before NU6.3 activated on Mainnet. Keyi si woɖe tso akɔntabuƒe aɖe si nɔ anyi do ŋgɔ na Ironwood la nyea nu bubu le mɔ sia nu be enye "nu yeye" (even though the key is not new). `use_qsk = false` Mègabu be nu vevi aɖe si woɖe tso nyatakaka ɖeka me la fiaa bubu o.

## Exporting a viewing key (Kpɔkplɔli ƒe asiɖeɖe)

### Zallet

[Zallet](https://github.com/zcash/zallet) is the full-node wallet that replaced the wallet inside zcashd. Viewing-key export and import arrived in **v0.1.0-beta.2 (28 July 2026)**, so check your version first; earlier builds do not have these methods. Every argument after the method name must be valid JSON, which means string values keep their own double quotes. The [Zallet Ŋgɔdzesidenu Kpatawo](/using-zcash/zallet-quick-reference-guide) Eƒo nu tso aʋafia ƒe ɖoɖowo ŋu.

Ŋlɔ nu siwo le ga sia me la ɖi:

```bash
zallet rpc listaddresses
```

Export the account's unified full viewing key by passing a unified address: Xlẽ nu tso nyatakaka siwo le axa sia ŋu.

```bash
zallet rpc z_exportviewingkey '"<unified address>"'
```

Export the account's unified incoming viewing key instead, using the optional Xɔ nyatakakawo ƒe dzesi ɖeka si le mɔ̃a dzi `ivk` nyahehe:

```bash
zallet rpc z_exportviewingkey '"<unified address>"' true
```

Ne ame aɖe tsɔ Sapling ƒe adrɛs de asi na wo la, eɖo eƒe account si me wòna ŋkɔa le (Sapling extended full viewing key) ɖa.`zxviews…`), matching the old zcashd behaviour. Two documented limits: Sprout addresses are rejected, and a Sapling extended full viewing key cannot be exported from an account that was itself imported as view-only, because the wallet cannot reconstruct it. The `ivk` form la wɔa dɔ le nu siwo woɖena ɖe accountwo me si nye view-only.

### Gaxɔ siwo ɖea nuxexlẽ ƒe safuiwo tsoa wo ŋutɔ woƒe asitelefon dzi la me

Ŋkɔa enye: [Gaɖakawo](/using-zcash/wallets) axawo léa ŋku ɖe nu siwo le akpa sia kple Ironwood ƒe dzadzraɖo ŋu. Le agbalẽŋlɔɣi la, gaƒoɖonu si me wota nu siawo dometɔ aɖewoe nye ZODL, Zingo!, Zkool, Cake, Zallet, Zecd kple Nozy. Kpɔ nyatakakadzraɖoƒe ma dzi hafi nàzã gaƒonuawo ɖekaɖeka o elabena woƒe dzedzeme trɔna.

## Amedzroƒe ƒe dzesiwo tsɔtsɔ yi abe ŋkuléleɖakavi ko enetrɔ asi le etsoƒe ŋu

### Zkool

[Zkool](https://github.com/hhanh00/zkool2) enye tiatia si le bɔbɔe wu, elabena exɔa nuŋɔŋlɔwo kple esiwo nye xoxo la siaa. Eƒe README-gbalẽviwo ƒe ŋkuɖodzinya siwo wowɔ tso **nuŋɔŋlɔ ɖeka aɖe koŋ ŋu kpɔkpɔ gɔmeɖeɖe** alo Sapling gbadzaa ŋuti nyatakaka vevi aɖewo gbɔ nɔnɔmetata me kpe ɖe nusiwo nye xoxo eye woxɔna tso zcashd dzi ŋudɔwɔwɔ gɔme ɖeɖe bubuwo ŋu.* Tsɔ ŋkɔ yeye ɖo eŋu, tia mɔ̃ si wotsɔ kpɔa nuwo ta ko, eye nàtsɔ nya sia aŋlɔe ɖi be wòanye wò ŋutɔ tɔwò. `uview…` or `zxviews…` key; eyome nuŋlɔɖia wɔa ɖeka eye wòɖea ga si susɔ kple ŋutinyaa fiana evɔ womezãe o.

Ironwood protocol support kple Orchard-to-Ironwood migration dze Zkool 6.24.0 (20 July 2026) dzi, eye 6.26.1 (2 August 2026) ɖo ŋku Ironwood transaction detection le mempool la me. Run 6.26,1 or later.

### Zallet

```bash
zallet rpc z_importviewingkey '"<zxviews… key>"' '"whenkeyisnew"' 0
```

Nya eveliae nye alesi woagbugbɔ adzro nuwo me: `"whenkeyisnew"` (nu si womete ŋu wɔ o), `"yes"` or `"no"`. Etɔ̃liae nye block ƒe kɔkɔme si dzi woagaɖe tso. Zallet tsɔa safui la dea eƒe adrɛswo me eye wòdzraa nu siwo yia edzi le eme kple esiwo doa go ɖa ne ame aɖeke mele dɔ wɔm o.

**Zallet tsɔa Sapling ƒe mɔfianuwo ko vana.** Womeɖea wo tso duta o. `uview…` be nàtsɔ nuxexlẽ ƒe mɔ̃a ayi na wò Unified Account blibo la, tsɔ UFVK si le Zallet eye nàtsɔe yi gaɖaba aɖe me si xɔa ɖekawɔwɔ ŋuti safuiwo abe Zkool ene.

Be nàtrɔ safui si nètsɔ va la wòazu nuxexlẽ ƒe nuŋlɔɖi blibo, kple txidswo, fewo kpakple memoswo, kpɔ "Transaction history file" le axa sia. [Exporting Transaction History from a Viewing Key (Dɔwɔƒe ƒe Ŋutinya Tso Kpɔmɖonuvi aɖe Me)](/guides/viewing-key-transaction-export).

## Nusiwo trɔ kple nusiwo dzi wòle be nàdzudzɔ ŋkuɖoɖo ɖo

Ne èdze axa sia ƒe gɔmeɖeɖe xoxo aɖe dzi, alo ɖe woɖe egɔme la, mɔ etɔ̃awo megale dɔ wɔm o.

- **`zcash-cli z_exportviewingkey` kple `z_importviewingkey`.** zcashd va ɖo eƒe support ƒe nuwuwu le 18 July 2026 eye megasɔna o. Zallet's identical named methods are the replacement; see the [ʋuʋu ŋuti mɔfiagbalẽa me.](/guides/migration-guide-zcashd-to-zebrad-zallet).
- Ywallet ƒe mɔfiagbalẽa. Wallets axa la de dzesi Ywalle ** Ironwood: Not Ready**, eyata menye ga si dzi amewo ate ŋu ato akpɔ ironwood-ɣeyiɣi me safuiwo o. Zkool hã xɔ safui siawo ke eye wode dzesii be wozu Fasifiakuku (Ready).
- zcashblockexplorer.com/vk.** Subɔsubɔdɔ la ɖo HTTP 503 kple ɖaseɖigbalẽ manyomanyo, eye woɖee le teƒe be woaɖɔlii boŋ. Ne ètsɔ nuŋɔŋlɔ ƒe safui de nyatakakadzraɖoƒe aɖe me la, ana ame si zãa nyatakakadziƒea nakpɔ wò asitsatsawo katã ŋuti nuŋlɔɖi; emae nye esiwo gbɔdzɔ wu dometɔ etɔ̃ siwo nɔ axa xoxoa dzi ɣesiaɣi. Tsɔ safua yi gaƒoƒomeme bubu si nèzãna ɖe eteƒe.

## Ganyawo ƒe Kpekpeɖeŋu

Zã nuŋɔŋlɔawo le alesi wòhiãe dzi, eye nàtsɔ esiwo ƒe akpa sue aɖe wu aɖo biabia si wobia ŋu.

- [ZIP 326: NU6.3 Nusiwo Wògblẽna le Gadzɛdzraɖoƒe ŋu](https://zips.z.cash/zip-0326)  alesi ŋkuɖonuawo wɔa nui le Orchard kple Ironwood tsiƒutawo me
- [ZIP 229: Version 6 Transaction Format (Gbeɖoɖo si dzi wowɔa nu le)](https://zips.z.cash/zip-0229)  ɖe Orchard kple Ironwood tsiƒutawo me.
- [Zallet tɔtrɔ ƒe nuŋlɔɖi](https://github.com/zcash/zallet/blob/main/CHANGELOG.md)  si woɖe ɖe go tsɔ kpe ɖe RPC mɔnu ŋu
- [Zkool README](https://github.com/hhanh00/zkool2/blob/main/README.md)  Akɔnta kple safui ƒomevi siwo dzi woda asi ɖo
- [ECC, Nusiwo Wozãna le Ŋkuléle Ðe Nu Ŋu me Kɔkɔkɔe](https://electriccoin.co/blog/explaining-viewing-keys/)
- [ECC, Selective Disclosure kple Viewing Keys (Nusiwo Ŋu Woato Adrɔ̃ Nya)](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ECC, Zcash Viewing Key Video Presentation](https://www.youtube.com/watch?v=NXjK_Ms7D5U&t=199s)
