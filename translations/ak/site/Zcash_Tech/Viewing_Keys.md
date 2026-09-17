<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Viewing_Keys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Ɔhwɛfoɔ Nsaano Hwehwɛbea

Address a w'akyekyere no ma wo tumi yɛ adwuma bere a wonyi nsɛm kakra adi wɔ Zcash blockchain so. Enti, sɛ ehia sε wokyerε obi pɔtee nea wowɔ anaa de asoma no nso ɛ? address biara a wͻagye ho ban nya kכhwεεfo bi a εma kwan akenkan na ɛmmaa hokwan mma wotumi ntɔn. Kכhwεfo yi baa mu afe 2000 akyi. [ZIP 310](https://zips.z.cash/zip-0310) na wɔde kaa ho wɔ nhyehyɛe no mu wɔ Sapling dwumadibea foforo a wɔayɛ.

Hwehwɛbea nsaano ne ade a w'ayi no adi: wo na wobɛpaw nea ɔbɛhwɛ, na worentumi mfa sika ho tumi mma obi sɛ ɔnyɛ saa.

## Dɛn nti na wɔde ade a ɛma wohu nneɛma di dwuma?

Electric Coin Company kyerɛwtohɔ a ɛfa asɛm no ho kyerɛ tebea horow a ɛtaa ba, na ɛda so ara yɛ nea abu so nnɛ:

- **Nneɛma a wɔde di dwuma wɔ intanɛt so no, sɛ obi de ne nsa hyɛ mu na ɔde to baabi foforo ma ɛkɔtɔ biribi a, ɔhwɛ kwan sɛ ɛbɛba abɛɛfo fon so. Saa ara nso na nneɛma a yɛde yɛ adwuma no nyinaa bɛtena kɔmputa dwumadibea bi a ɛnkɔ Intanɛt hɔ da.
- A custodian proving its holdings.** The custodians hands an auditor a full viewing key for each shielded address. Ɔdwumfoɔ no betumi asesa saa balances yi na wasua activity dedaw kɔ ne firi saa adresses, na ontumi nyɛ biribi foforo biara.
- **Due diligence on a counterparty.** Sɛ exchange hia sɛ ɔhwɛ ne customer no shielded history so sεdeɛ ɔde due diligence bɛyɛ adwuma, obetumi abisa viewing key mmom sen sika.

## Nea ɔhwɛ no yɛ na ɔnkyerɛ

Nsaano nkyerɛwee ahorow pii wɔ hɔ, na nsonsonoe no ara na ɛkyerɛ dodow a wode ma.

Ԑhyԑn: Nkyerεma. Mfitiaseɛ. Mmoa.
|---|---|---|
 Unified Full Viewing Key (UFVK) dwumadie no mu. `uview…` hu akwantu a ɛrekɔ ne nea ɛkɔ so wɔ asesae biara mu.
 Unified incoming viewing key (UIVK)  Ɛho hia sɛ wo bɛhunu w'afidie no mu nsɛm nyinaa wɔ kasa biara a wobɛte. `uivk…` Ɔhwɛ nnwumakuo a ɛreba no nko ara, wɔ account biara mu.
Sapling atrɛw ɔhwɛfoɔ a ɔde ne nsa ahyɛ no ma. `zxviews…` hu nea ɛreyɛ ma ne deɛ ɛrekɔ so wɔ Sapling mu a ɛfa adansedie no ho.

Emu biara ntumi ntra. Ne nyinaa yɛ nea enni awiei wɔ ɔkwan a ɛho hia so: wontumi mfa ɔfã bi a wode ama no nkae, na mmom sɛ wofa sika kɔto sikasɛm ho krataa a obi foforo nni ne de mu nkutoo a, ɛtra hɔ daa.

Nneɛma abien a ɛsɛ sɛ wuhu ansa na woaka biribi akyerɛ afoforo no, ɛno ne nea ɛma nkurɔfo hu nsɛm bi.

**Incoming nkyerɛ sɛ w'aka no bi.** Unified incoming viewing key na wɔde di dwuma wɔ account nyinaa mu, ɛnyɛ address baako a wobisaa wo ho asɛm. UIVK de kɔma saa Sapling address koro pɛ da so ma ɛrehu nea ɛkɔba biara wɔ saa account no mu, enti ɛma wubehu pii sen address a ɛde din kyerɛ no. The [Zallet Nhoma no](https://zcash.github.io/zallet/zcashd/json_rpc.html) ka eyi pefee.

** Adesamma a wɔbɛba daakye no betumi ahu wɔn address dedaw.** [ZIP 326](https://zips.z.cash/zip-0326) Ɔkyerɛ sɛ obi a ɔwɔ quantum kɔmputa betumi anya viewing key no afiri address bi mu, nanso nullifier key no deɛ ɔntumi. Address yi yɛ soronko koraa wɔ Viewing Key ho nnɛ deɛ ɛyɛ ne kyɛfa kɛse paa ara na ɛwɔ hɔ ma wɔn mmienu nyinaa.

## Ironwood akyi no, yɛrehwɛ nkyeresoɔ a ɛwɔ hɔ.

NU6.3 de Ironwood banbɔ a wɔabɔ no na ɛmaa Orchard banbɔ no yɛ nea wɔde sika nkutoo to mu, enti bere rekɔ so no, sikasɛm tu fi biako kɔ foforo. Hwɛ [Ironwood nnua a wɔde yɛ adwuma](/zcash-tech/ironwood) ne sɛ, [Nsrahwɛbea no.](/zcash-tech/the-turnstile) ne nea ɛbɛma ayɛ yiye.

**A viewing key issued before Ironwood keeps working after the migration.** ZIP 326 kyerɛ sɛ nea ɔgye ne kɔ mu a ɔde rehwɛ no, wɔ de n'ani asi Orchard *protocol* so sen pool: saa same incoming viewing keys trial-decrypts both Orchard-pool and Ironwood-pool note ciphertexts. Zallet di dwuma saa kwan yi so, na ɔkyerɛkyerɛ Ironwood notes ase sε Orchard -shaped ɛne trial-decrypted with account's Orchard viewing Keys wͻn ho asie Ironwood note encryption domain.

Nsuasua abiɛsa wɔ obiara a ɔwɔ anaa ɔhyɛ da de safoa bi ma no ho:

1. ** Nkɔso no tu fi nsu a ɛwɔ ɔtare mu kɔ foforo mu, na nea ohu ade yi hu sɛ ɛrekɔ so. * [ZIP 318](https://zips.z.cash/zip-0318) Ɔkyerɛ sɛ ɔbra a wɔyɛ no yɛ nketenkete, pɛyɛ mu wɔ Orchard-to-Ironwood dwumadie bi ho na wɔde to gua bere pɔtee so. Odieter de adehwɛ kwan hwε sε ahwεεde ahorow firi po baako kɔ foforo mu nnawɔtwe pii akyi, ɛnyɛ akwantu biako mu. Akwanhodeɛ betumi asesa ne ankasa faako a ɔkɔe afi chain data hɔ denam n'ahwehwԑden ano nsaano krataa biara so.
2. **Each migration step reveals the value it moves.** That is inherent to crossing a turnstile, and it is what makes the migration auditable. Splitting the balance into canonical denominations means no single transaction reveals the whole Orchard-pool balance.
3. **Nka ho a w'abɔ wɔ Ironwood akyi no betumi anya wɔn nsa ano adwuma akwan horow so.** [ZIP 2005 no yɛ ɔfã bi a wɔn ho nni asɛm.](https://zips.z.cash/zip-2005) de a bi ka ho. `use_qsk` Ɔdaadaa kwan a wɔfa so nya, de di dwuma na ɛsan nso yɛ akwan foforo fa so ma wɔn ho da hɔ. `use_qsk = true` keys are genuinely different keys. ZIP 326 requires the flag to be uniform across an account and forbids generating `use_qsk = true` keys before NU6.3 activated on Mainnet. A key exported from an account that existed before Ironwood is therefore a `use_qsk = false` Mmafa ɛkwan a woayi afiri account baako so akyerɛkyerɛ foforo mu.

## Akenkan afidie a wo bɛhwɛ so no kɔ abɔnten

### Zallet

[Zallet](https://github.com/zcash/zallet) is the full-node wallet that replaced the wallet inside zcashd. Viewing-key export and import arrived in **v0.1.0-beta.2 (28 July 2026)**, so check your version first; earlier builds don't have these methods. Every argument after the method name must be valid JSON, which means string values keep their own double quotes. The [Zallet Nkyerεtohɔ a Ɛwɔ Hwԑn So Ntɛm](/using-zcash/zallet-quick-reference-guide) no fa ɔfã biara a' wɔn kyerɛ kwan.

Kyerɛ nea ɛwɔ sika no mu:

```bash
zallet rpc listaddresses
```

Fa adansedie a w'aka ho asɛm nyinaa kɔ abɔnten denam adiɛde baako so:

```bash
zallet rpc z_exportviewingkey '"<unified address>"'
```

Fa account no unified incoming viewing key di dwuma, fa optional no yɛ adwuma na w'atumi ayi bi adi wɔ wo din mu. `ivk` nsԑm no:

```bash
zallet rpc z_exportviewingkey '"<unified address>"' true
```

Sɛ wode address a ɛwɔ Sapling mu ma no, ɛma saa account no nya ne sapling extended full viewing key (`zxviews…`), a ɛne zcashd abrabɔ di nsɛ. Nkrataafa nnum: Wɔpo Sprout addresses, na wontumi mfa Sapling extended full viewing key mfi account bi a wɔayi no afiri hɔ sɛ nea wotumi hwɛ nkutoo mu kɔ abɔnten esiane sԑ wallet ntumi nsiesie saa akwankyerε yi bio nti. `ivk` form no yɛ adwuma ma akwantuo a wɔfa so di dwuma.

### Nkrataafa a wɔde kɔma hwεfo mfoni firi wɔn ankasa interface mu

no mu a, na [Adaka no mu nkotoku](/using-zcash/wallets) Saa bere yi, wallets a wɔkyerεw viewing-key support ne **Ironwood: Ready** no bi ne ZODL, Zingo!, Zkool, Cake, Zallet, Zecd and Nozy. Sͻ w'ani hwɛ saa kratafa wei ansa na wo de wo ho bɛto wallet biara so, efisԑ εwɔ sὲn ara mu nsakrae ba.

## Ɔhwɛfoɔ nkyerεkyerεmu a εwͻ watch-only account mu no refa adi dwuma

### Zkool

[Zkool](https://github.com/hhanh00/zkool2) ne kwan a ɛkyɛn so wɔ ha, efiri sɛ wogye unified keys ɛne nea ɛwɔ hɔ dedaw tom. Ne README documents view-only accounts a wɔde **unified viewing key** anaa **Sapling extended viewing Key** na ayɛ no, ka agyinatufo bi ho kɔma wɔn ma w'atumi ahwɛ nsɛm mu yiye afi zcashd nkyɛn. Fa account foforo to obi nsa, yi ɔkwan a wobɛtumi afa so ahu nneɛma kɛkɛ, na fa krataafa no hyɛ n'afedie akyi bere biara ansa wo de emu baako akɔto obi foforɔ nsam. `uview…` or `zxviews…` key; afei account no syncs na ɛbɔ balance ne abakɔsɛm ho dawuru a sika biara nni mu.

Ironwood protocol support ne Orchard-to-Ironwood migration no sii wɔ Zkool 6.24.0 (20 July 2026), na 6.26.1 (2 August 2026) de ironwood transaction detection asiesiee mempool mu. Run 6.26,1 anaa nea edi akyiri.

### Zallet

```bash
zallet rpc z_importviewingkey '"<zxviews… key>"' '"whenkeyisnew"' 0
```

Nkɔmmɔ a ɛto so abien no yɛ rescan nhyehyɛe: `"whenkeyisnew"` (default no), `"yes"` or `"no"`. Nea ɛtɔ so miensa ne block height a wobɛtumi asane ahwɛ no. Zallet twe key no sɛ view-only account na ɛhwɛ entrant and outgoing transactions wɔ addresses ho bere a wɔnnya tumi mfa ntotɔ nneɛma.

*Zallet fa Sapling Expanded Full Viewing Keys nkutoo ba.** Ɔremfa ne nyinaa mma. `uview…` Sɛ wode kwan a wobɛtumi akenkan akyerɛ Unified Account no nyinaa, yi UFVK firi Zallet hɔ na fa kɔto wo wallet mu sɛ ɛgye unified keys te sε Zkool.

Sɛ worebɛdan afidie a wɔde aba no akɔ transaction abakɔsɛm fael mu, ne txids, akatua ne memo ahorow ho nsɛm pii a, hwɛ: [Exporting Transaction History from a Viewing Key](/guides/viewing-key-transaction-export).

## Deɛn na asesa, ne deɛn ho asɛm a ɛsɛ sɛ yegyae hwehwɛ?

Sɛ w'adi kan adi saa kratafa yi so, anaa woasua bi afi mu a, akwan mmiɛnsa no nyɛ adwuma bio.

- **`zcash-cli z_exportviewingkey` ne sɛ, `z_importviewingkey`.** zcashd duu ne end-of-support stop wɔ 18 July 2026 na ɛnkɔ so nyɛ adwuma. Zallet's identically named methods are the replacement; hwɛ ɔfã a yɛfrɛ no "Zallet" (wɔn din korɔ) mu: [akwantu akwankyerɛfoɔ](/guides/migration-guide-zcashd-to-zebrad-zallet).
- Ywallet akwankyerԑ no. Wallets kratafa yi yεn so ma wohu sɛ "Ywallet" yɛ Ironwood: Not Ready, enti ɛnyɛ sika kotoku a nnipa de wɔn ani bεε mu sε wɔrekɔhwehwɛ ironwood mmere ano nsaano ahoma. Zkool nso gye saa nsesaeɛ koro no ara na εwɔ ready din.
- **zcashblockexplorer.com/vk.** The service returns HTTP 503 with an invalid certificate, and it has been dropped rather than replaced. Pasting a viewing key into a website hands your whole transaction history to whoever runs that website, which was always the weakest of the three options on the old page. Import the key into a wallet you run instead.

## Nneɛma a wɔde bɔ afɔre

Fa hwεn ano ahwehwɛde ahorow no di dwuma wɔ nea ehia mu, na fa ɔfã a ɛyɛ ketewa paa ma asɛmmisa a wobisa ho mmuae.

- [ZIP 326: NU6.3 N'afata a ɛfa sika nkotoku ho](https://zips.z.cash/zip-0326)  sɛnea hwεsofo nsaano di dwuma wɔ Orchard ne Ironwood abura no mu.
- [ZIP 229: Nkyerεmu 6 a εfa dwumadie ho no.](https://zips.z.cash/zip-0229)  kyerɛ Orchard ne Ironwood abura no ase.
- [Zallet nsesaeɛ daadaa no](https://github.com/zcash/zallet/blob/main/CHANGELOG.md)  deεn na w'ayi no adi, nea RPC kwan a εfa ho
- [Zkool README](https://github.com/hhanh00/zkool2/blob/main/README.md)  nhyehyεe ne kͻmputa no dwumadie a w'atumi de adi dwuma
- [ECC, a ɛkyerɛkyerɛ anibuei nkyerɛɛmu no mu](https://electriccoin.co/blog/explaining-viewing-keys/)
- [ECC, Selective Disclosure and Viewing Keys (Ɔkwan a wɔfa so de nsɛm ma no)](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ECC, Zcash Viewing Key Video Presentation](https://www.youtube.com/watch?v=NXjK_Ms7D5U&t=199s)
