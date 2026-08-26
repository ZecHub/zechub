<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Viewing_Keys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Igodo Nlele

Shielded addresses let you transact while revealing as little as possible on the Zcash blockchain. So what happens when you *do* need to show a specific party what you hold, or what you sent? Every shielded address has a viewing key that grants read access without granting the ability to spend. Viewing keys were introduced in [ZIP 310 (mkpụrụ akwụkwọ)](https://zips.z.cash/zip-0310) ma gbakwunye na protocol n'ime nkwalite netwọk Sapling.

Igodo nlele bụ ngwá ọrụ maka ikpughe nhọrọ: ị họrọ onye na-ahụ ihe, ma ọ dịghị mgbe i nyefere ikike imefu ego iji mee ya.

## Gịnị mere ị ga-eji jiri igodo e ji ahụ ụzọ mee ihe?

Akwụkwọ nke Electric Coin Company dere n'isiokwu a na-akọwa ọnọdụ ndị kasị ebilite, ha ka bụkwa ihe ndị a na - ahụkarị taa:

- **A mgbanwe na-ekiri maka ego.** The exchange loads a inbound ikiri isi ihe n'elu internet ihu nchọpụta ọnụ otú ọ nwere ike achọpụta ahịa ego ka a kpuchie adreesị, mgbe mmefu igodo anọgide na ngwaike nke dịghị emetụ netwọk.
- **A custodian proving its holdings.** The custodian hands an auditor a full viewing key for each shielded address. The auditor can check those balances and review past activity to and from those addresses, and can do nothing else.
- ** Nlezianya kwesịrị ekwesị na onye ọzọ.** Mgbe mgbanwe chọrọ inyocha akụkọ ihe mere eme nke ndị ahịa dị ka akụkụ nke nlekọta zuru oke, ọ nwere ike ịrịọ maka igodo nlele kama ego.

## Ihe igodo nlele na-eme ma ghara ikpughe

E nwere ihe karịrị otu ụdị mkpịsị ugodi, ọdịiche dị na ha ga-ekpebikwa ego ole ị ga-enye.

 Key  Prefix  Onyinye ego 
|---|---|---|
◯ Unified Full Viewing Key (UFVK) Mkpịsị ugodi nlele zuru oke nke dị otu `uview…` ◯ Na-ahụ azụmahịa na-abata **na** nke ọpụpụ maka ọdọ mmiri niile dị n'ime akaụntụ ahụ.
◯ Unified Incoming Viewing Key (UIVK) Mkpịsị ugodi nlele na-abata dị iche `uivk…` ◯ Na-ahụ naanị azụmahịa ndị na-abata, maka ọdọ mmiri ọ bụla dị n'akaụntụ.
◯ Sapling gbatịpụrụ igodo nlele zuru ezu. `zxviews…` ◯ Na-ahụ ọrụ Sapling na-abata ma na-apụ apụ maka adreesị igodo ahụ.

Ọ dịghị nke ọ bụla n'ime ha pụrụ imefu. Ha nile na-adịgide adịgide n"ụzọ dị mkpa: a pụghị icheta igodo i nyefere, nanị ihe ị ga-eme bụ iwepụ ego ahụ gaa ná akaụntụ onye ọzọ ejighị mkpịsị ugodi ya.

Ihe abụọ ị ga-ebu ụzọ mara tupu i kwuwe ihe ọ bụla bụ na e nwere ọtụtụ ndị a pụrụ iji maka ha mata.

** Incoming adịghị apụta na ọ dị warara.** A jikọtara igodo nlele ntinye aka maka akaụntụ dum, ọ bụghị otu adreesị a jụrụ gị. Ịbupụ UIVK maka otu adres Sapling ka na-enye ọhụụ abata gafee ọdọ mmiri niile na akaụntụ ahụ, ya mere o gosipụtara karịa aha adreesì ndị ahụ. The [Akwụkwọ Zallet Book](https://zcash.github.io/zallet/zcashd/json_rpc.html) na-ekwu nke a n'ụzọ doro anya.

** Adreesị e bipụtara na-ekpughe igodo ya nke na-abata maka onye iro n'ọdịnihu.** [ZIP 326  Ihe e dere n'ala ala peeji](https://zips.z.cash/zip-0326) na-ekwu na onye iro nwere kọmputa quantum nwere ike weghachite igodo nlele nke si na adreesị dị iche, bụ nke a ga - emeli ka ọ ghara iweghachite isi ihe ahụ. Ịkwusa ozi ọma abụghị otu taa dịka ịdepụta mkpado nyocha, ma ha abụọ nọ nso karịa ogologo oge zuru ezu.

## Igodo nlele mgbe Ironwood gasịrị

NU6.3 webatara ọdọ mmiri Ironwood na-echebe ma mee ka ogige Orchard nọrọ naanị, yabụ ego si n'otu gaa na nke ọzọ oge. Lee [Osisi ígwè](/zcash-tech/ironwood) na nke a: [Ihe na-eme ka ọ dị mma.](/zcash-tech/the-turnstile) maka nkwalite ahụ n'onwe ya.

**A viewing key issued before Ironwood keeps working after the migration.** ZIP 326 specifies that a receiver, and its corresponding incoming viewing key, is scoped to the Orchard *protocol* rather than to a pool: the same incoming viewing key trial-decrypts both Orchard-pool and Ironwood-pool note ciphertexts. Zallet implements it that way, describing Ironwood notes as Orchard-shaped and trial-decrypted with the account's Orchard viewing keys under the Ironwood note-encryption domain.

Ihe atọ ga-eme onye ọbụla ji maọbụ nye mkpịsị ugodi:

1. ** Ihe ndị dị n'ime ya na-agagharị agagharị, onye kiriri ha ga-ahụkwa ka ihe ahụ mere.** [ZIP 318  Ihe e dere n'ala ala peeji](https://zips.z.cash/zip-0318) specifies migration as a series of small, deliberately uniform Orchard-to-Ironwood transactions broadcast on a randomised schedule, each spending one Orchard note and producing one Ironwood output of a canonical denomination. An auditor watching with a viewing key sees holdings shift from one pool to the other in steps over weeks, not in a single move. A wallet can reconstruct its own migration progress from chain data using its viewing keys.
2. **Each migration step reveals the value it moves.** That is inherent to crossing a turnstile, and it is what makes the migration auditable. Splitting the balance into canonical denominations means no single transaction reveals the whole Orchard-pool balance.
3. ** Akaụntụ e kere mgbe Ironwood nwere ike inweta igodo ha n'ụzọ dị iche.** [ZIP 2005 Ihe ndị dị na peeji nke 3](https://zips.z.cash/zip-2005) na-agbakwụnye a `use_qsk` flag for quantum-recoverable keys, and it changes how the incoming, outgoing and diversifier keys are derived, so `use_qsk = true` igodo bụ n'ezie dị iche iche igodo. ZIP 326 chọrọ ka ọkọlọtọ na-agbanwe agbanwe gafee akaụntụ ma machibidoro ịmepụta `use_qsk = true` igodo tupu NU6.3 arụ ọrụ na Mainnet. A isi exported si akaụntụ nke dị n'ihu Ironwood bụ ya mere a key that exists before Ironwood is therefore an active user of the network, and it can be used to access other networks in your system without any additional keys. `use_qsk = false` Echela na igodo a si n'otu akaụntụ pụta kọwaa onye ọzọ.

## Ịbupụ igodo nlele

### Zallet

[Zallet](https://github.com/zcash/zallet) bụ obere akpa ego zuru oke nke dochie anya wallet n'ime zcashd. Nlele-mkpịsị ugodi mbupụ na ibubata rutere **v0.1.0-beta.2 (28 July 2026)**, yabụ lelee ụdị gị mbụ; ihe ndị gara aga anaghị enwe usoro ndị a. Ihe arụmụka ọ bụla mgbe aha usoro ahụ ga -abụrị JSON ziri ezi, nke pụtara uru eriri nwere akara abụọ ha. The [Akwụkwọ Ntuziaka Ọsọ Zallet](/using-zcash/zallet-quick-reference-guide) na-ekpuchi usoro iwu n'ozuzu.

Depụta ihe dị n'ime ya:

```bash
zallet rpc listaddresses
```

Mbupụ akaụntụ ahụ zuru ezu na-ele anya site n'ịgafe adreesị dị iche:

```bash
zallet rpc z_exportviewingkey '"<unified address>"'
```

Mbupụ akaụntụ ahụ si n'otu na-abata igodo ngosi kama, iji nhọrọ `ivk` arụmụka:

```bash
zallet rpc z_exportviewingkey '"<unified address>"' true
```

Ịgafe adreesị Sapling na-eweghachi akaụntụ ahụ's Sapling extended full viewing key (`zxviews…`), na-adaba adaba ochie zcashd omume. abụọ akwụkwọ ókè: A jụrụ adreesị Sprout, a Sapling gbasaa zuru ezu nlele igodo nwere ike ghara exported si akaụntụ nke e onwe ya dị ka echiche naanị, n'ihi na obere akpa enweghị ike wughachi ya. The `ivk` ụdị ahụ na-arụ ọrụ maka akaụntụ ndị e webatara naanị.

### Wallets nke na-ebupụ igodo nlele site na interface ha onwe ha

Ihe ahụ bụ: [Akpa ego](/using-zcash/wallets) page tracks viewing-key support and Ironwood readiness for each wallet. At the time of writing, wallets listing both viewing-key support and **Ironwood: Ready** include ZODL, Zingo!, Zkool, Cake, Zallet, Zecd and Nozy. Check that page rather than this one before relying on any single wallet, because readiness changes.

## Ịbubata igodo nlele dị ka akaụntụ elekere naanị

### Zkool (ụlọ akwụkwọ)

[Zkool (ụlọ akwụkwọ)](https://github.com/hhanh00/zkool2) bụ nhọrọ kachasị mfe ebe a, n'ihi na ọ nabatara igodo ndị dị iche iche nakwa dịka ihe ochie. Ihe ndekọ ya nke README akwụkwọ-na-ahụ naanị e kere site ** unified viewing key** ma ọ bụ isi okwu mmeghe Sapling gbasaa , tinyere mkpịsị ugodi agbatiri agbapụla si zcashd . Tinye akaụntụ ọhụrụ, họrọ ụzọ ngosi ahụ nanị, wee tinye paswọọdụ gị maka ịlele faịlụ ọzọ iji nweta ohere ịnweta ozi ederede mgbe niile. `uview…` or `zxviews…` igodo; akaụntụ ahụ na-eme ka mmekọrịta ma kọọ akụkọ ihe mere eme na akụkọ ntolite n'enweghị ikike mmefu.

Nkwado usoro Ironwood na mbata nke Orchard-to-Ironwood rutere Zkool 6.24.0 (20 July 2026), yana nchọpụta azụmahịa ironwood ziri ezi na mempool. Gbaa ọsọ 6.26.1 ma ọ bụ mgbe e mesịrị.

### Zallet

```bash
zallet rpc z_importviewingkey '"<zxviews… key>"' '"whenkeyisnew"' 0
```

Arụmụka nke abụọ bụ iwu nyocha ọzọ: `"whenkeyisnew"` (n'ịghara imezu ya), `"yes"` or `"no"`Nke atọ bụ ogo nke mpempe akwụkwọ iji nyochaa. Zallet na-ebubata igodo ahụ dị ka akaụntụ naanị echiche ma soro azụmahịa ndị na-abata na ọpụpụ maka adreesị ya n'enweghị ikike mmefu ego.

**Zallet na-ebubata Sapling gbasaa igodo nlele zuru oke naanị.** Ọ gaghị ebubata a. `uview…` iji nyefee ohere ịgụ na akaụntụ niile, wepụ UFVK site na Zallet ma bubata ya n'ime obere akpa nke nabatara igodo dị iche iche, dịka Zkool.

## Ihe gbanwere, na ihe ị ga-akwụsị ịchọ.

Ọ bụrụ na i sorola nsụgharị ochie nke ibe a, maọbụ ntụgharị ya, ụzọ atọ anaghịzi arụ ọrụ.

- **`zcash-cli z_exportviewingkey` na nke a: `z_importviewingkey`.** zcashd reached its end-of-support halt on 18 July 2026 and no longer runs. Zallet's identically named methods are the replacement; see the [ntuziaka mbugharị](/guides/migration-guide-zcashd-to-zebrad-zallet).
- ** The Ywallet walkthrough.** Wallets peeji akara Ywallets **Ironwood: Not Ready**, yabụ na ọ bụghị obere akpa iji tụọ ndị mmadụ aka maka igodo nlele Ironwood-era. Zkool, site n'otu onye mmepe ahụ, nabatara otu ụdị mkpịsị ugodi ma kpọọ Njikere.
- **zcashblockexplorer.com/vk.** The service returns HTTP 503 with an invalid certificate, and it has been dropped rather than replaced. Pasting a viewing key into a website hands your whole transaction history to whoever runs that website, which was always the weakest of the three options on the old page. Import the key into a wallet you run instead.

## Akụnụba

Jiri igodo nlele na ndabere dị ka mkpa, ma họrọ igodo kacha nso nke zara ajụjụ a jụrụ.

- [ZIP 326: NU6.3 Nsonaazụ maka Wallets](https://zips.z.cash/zip-0326)  etu igodo nlele si akpa agwa gafee ọdọ mmiri Orchard na Ironwood.
- [ZIP 229: Ụdị 6 Transaction Format](https://zips.z.cash/zip-0229)  na-akọwa ọdọ mmiri Orchard na Ironwood.
- [Zallet mgbanwe log](https://github.com/zcash/zallet/blob/main/CHANGELOG.md)  nke ntọhapụ kwukwara na RPC usoro
- [Zkool README (Ụlọ akwụkwọ agụmakwụkwọ)](https://github.com/hhanh00/zkool2/blob/main/README.md)  ụdị akaụntụ na igodo ndị a kwadoro
- [ECC, Nkọwa Igodo Ịhụ Ihe](https://electriccoin.co/blog/explaining-viewing-keys/)
- [ECC, Nkwupụta Nhọrọ na Igodo Ngosipụta](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ECC, Zcash Viewing Key Video Presentation](https://www.youtube.com/watch?v=NXjK_Ms7D5U&t=199s)
