<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zcash_Wallet_Syncing.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Ịmekọrịta e-akpa ego Zcash

## Nchịkọta

* N'ihi na Azụmahia [transaction] nke e chebere echebe [shielded] Zcash na-ezo nkọwa ha, sava enweghị ike ịchọ nguzozi e-akpa ego n'ụzọ dị mfe dịka o nwere ike isi mee maka mkpụrụ ego Oha [transparent] dịka Bitcoin ma ọ bụ Ethereum.
* E-akpa ego dị ọkụ na-ebudata obere “compact blocks” site na sava pụrụ iche (lightwalletd) ma jiri igodo nzuzo ha decrypt data dị mkpa n'onwe ha.
* Ime decrypt na ịhazi block ndị ahụ na-ewe oge, ya mere e-akpa ego na-eji ụzọ imekọrịta ngwa ngwa eme ka ị nwee ike iji ego gị ngwa ngwa.
* Ụzọ ndị a ma ama: Warp Sync (YWallet), Spend-before-sync (Zcash Mobile Wallet SDK V2), Blaze Sync (Zecwallet), na DAGSync a tụrụ aro.
* Ụzọ ndị a na-atụkarị mgbanwe n'etiti ebe nchekwa ọzọ ma ọ bụ ike nhazi ọzọ maka imekọrịta ngwa ngwa.

## Nkọwa Isi

### Ka imekọrịta Zcash si arụ ọrụ

Zcash na-eji proof zero-knowledge chebe nkọwa Azụmahia pụọ n'aka ndị na-enweghị ikike. Nzuzo [privacy] a na-eme ka imekọrịta siere e-akpa ego dị ọkụ ike n'ihi na ha anaghị echekwa blockchain [blockchain] dum n'ógbè ha, kama ha na-adabere na sava maka ozi dị mkpa. Site na Bitcoin ma ọ bụ Ethereum, sava nwere ike idekọta blockchain ma weghachite data akaụntụ ngwa ngwa. Mana site na Zcash, sava enweghị ike ịhụ nkọwa Azụmahia. Ya mere, kedu ka e-akpa ego dị ọkụ ga-esi mekota nguzozi na akụkọ ya n'ebughị ma decrypt blockchain dum n'onwe ya?

Zcash na-edozi nsogbu a site n'ijikọta ụzọ dị iche iche. O nwere sava pụrụ iche, lightwalletd, nke na-enyocha data sitere na full node ma debe naanị ihe a chọrọ iji mata Azụmahia. A na-akpọ data a compact blocks, ọ dịkwa ntakịrị karịa block mbụ. E-akpa ego dị ọkụ na-ebu ụzọ ebudata compact blocks ndị a site na sava lightwalletd, wee jiri igodo nzuzo ha decrypt ha.

Ọbụna ime decrypt na ịhazi compact blocks ndị a nwere ike iwe oge dị ukwuu, karịsịa mgbe enwere ọtụtụ Azụmahia n'otu block. Ya mere, e-akpa ego na-eji ụzọ dị iche iche mee ka imekọrịta dị ngwa ma mee ka ị jiri ego gị ozugbo o kwere mee.

## Ihe Anya / Ntụnyere

Chee blockchain dịka nnukwu ụlọ nzipu ozi jupụtara n'igbe akpọchiri akpọchi. N'ihe gbasara mkpụrụ ego Oha, onye ọrụ ụlọ nzipu ozi nwere ike ịgụ aha dị n'igbe ndị ahụ ma gwa gị ozugbo ndị bụ nke gị. Site na Zcash, a na-ezo aha ndị ahụ — ya mere e-akpa ego gị ga-eji igodo ya lelee igbe ndị ahụ nwayọọ nwayọọ n'onwe ya ịchọta ndị ọ pụrụ imeghe. Ụzọ imekọrịta ndị dị n'okpuru bụ usoro dị iche iche maka ilele igbe ndị ahụ ngwa ngwa.

## Nkọwa Miri Emi

### Warp Sync

Warp sync bụ atụmatụ YWallet nke na-awụli nzọụkwụ etiti nke ime decrypt na ịhazi compact block ọ bụla, wee gaa kpọmkwem na nsonaazụ ikpeazụ.

Iji mee nke a, ọ na-eji mgbakọ na cryptography gbakọọ nsonaazụ ikpeazụ na-agafeghị nzọụkwụ ọ bụla.

Warp sync nwere ike ịhazi ọtụtụ puku block kwa nkeji, ngwa ngwa karịa usoro imekọrịta a na-emebu. Nke a pụtara na ndị ọrụ YWallet nwere ike ịnụ ụtọ arụmọrụ ngwa ngwa ma dị larịị, ọbụna mgbe ha nwere ọtụtụ narị puku Azụmahia na note ha natara n'akaụntụ ha.

Ewezuga usoro ịwụli nzọụkwụ a, YWallet nwere ike ịhazi ọtụtụ block n'otu oge, na-ekesa ibu ọrụ n'ofe hardware ị nwere iji mee ka usoro ahụ dịkwuo ngwa ngwa.

Gụkwuo maka [Warp Sync](https://ywallet.app/warp/)

> A kọwara Warp sync ebe a dịka usoro imekọrịta. Ywallet n'onwe ya anaghịzi enweta nlekọta, a gaghị emelitekwa ya maka Ironwood, ya mere ọ bụghị e-akpa ego ị ga-etinye taa.

### Spend-before-sync

Spend-before-sync bụ atụmatụ ọhụrụ na Zcash Mobile Wallet SDK V2 nke na-enye ndị ọrụ ohere iji ego ozugbo ha meghere e-akpa ego ha, na-echeghị ka imekọrịta e-akpa ego dum gwụ. Atụmatụ a na-eme ka ịchọpụta nguzozi e-akpa ego a pụrụ iji kwụọ ụgwọ dị ngwa ma melite ahụmịhe onye ọrụ.

Spend-before-sync na-arụ ọrụ site n'iji algorithm imekọrịta compact-blocks nke na-ahazi block sitere na sava lightwalletd n'usoro na-adịghị ahịrị kwụ ọtọ. Nke a pụtara na kama ichere ka ahazie otu block kpamkpam tupu aga n'ihu, e-akpa ego nwere ike iji ntakịrị ebe nchekwa na ike nhazi ọzọ nyochaa ngalaba dị iche iche nke blockchain. Ọtụtụ mgbe, ọ na-enyocha oke dị iche iche, na-achọ Azụmahia ọhụrụ ebe a na-ebudata ma na-ahazi block ochie. Ọ bụrụ na achọpụtara note ọhụrụ a na-emefubeghị, a ga-eme ka ọ dị ozugbo.

<a href="">
    <img src="/content-images/363d08df-b7b7-461b-a386-251d9ad702ca-a857cd8385.webp" alt="" width="140" height="150"/>
</a>

### Blaze Sync

Ndị otu Zecwallet mepụtara Blaze sync, algorithm imekọrịta maka e-akpa ego dị ọkụ nke na-enyocha blockchain azụ azụ, malite na block kachasị elu na nke kachasị ọhụrụ wee na-alaghachi azụ.

Nke a na-enye e-akpa ego ohere ịchọta note emefuru tupu ndị a natara, ebe ọ na-eme ka note ndị emefubeghị na mbụ dị n'ọrụ na-echeghị ka usoro imekọrịta dum gwụ.

Ewezuga nke ahụ, ọ na-eji Out-of-Order Sync site n'ikewapụ ihe mejupụtara sync n'ebe ibe ha nọ — ibudata block, ime trial decryptions, na imelite witnesses — ma hazie ha n'otu oge. Nke a na-achọ ebe nchekwa na akụrụngwa CPU karịa, mana ọ na-abawanye ọsọ sync ugboro X5.

### DAGSync

DAGSync bụ algorithm imekọrịta a tụrụ aro nke chọrọ imezi ahụmịhe onye ọrụ nke e-akpa ego nke e chebere echebe Zcash site n'ime ka imekọrịta dị ngwa.

Ọ na-eji [Directed Acyclic Graph (DAG)](https://words.str4d.xyz/dagsync-graph-aware-zcash-wallets/) anọchi anya ndabere dị n'etiti note, witnesses, na nullifier n'ime e-akpa ego Zcash.

DAG bụ nhazi data nke nwere node na edges, ebe edge ọ bụla nwere ntụziaka nke na-egosi mmekọrịta dị n'etiti node abụọ. DAG enweghị cycles, nke pụtara na ọ nweghị ụzọ isi malite na node ma soro edges laghachi n'otu node ahụ.

<a href="">
    <img src="/content-images/eee7e08d-5c98-4c88-a48e-12f7a92a195f-316493530f.webp" alt="" width="110" height="230"/>
</a>

## Ihe Ọ Pụtara N'ọrụ

N'ụzọ na-adọrọ mmasị, usoro ndị a niile na-achọ ịza ajụjụ Zcash Security welitere na post ya gbasara [Scalable Private Messaging](https://zecsec.com/posts/scalable-private-money-needs-scalable-private-messaging/) na mmekọrịta ya na sistemụ Kwụọ ụhwọ [payment] nzuzo. Ụfọdụ na-agakwa n'ihu ibudata data memo niile site na sava, ewezuga data pụrụ iche maka Adreesị akpa ego, na-abawanye Nzuzo n'ọnụ ahịa ntakịrị akụrụngwa ọzọ.

Ọzọkwa, Zcash Foundation anọwo na-eleba anya n'alternatives ndị ọzọ iji melite arụmọrụ e-akpa ego dị ọkụ. Nke ahụ bụ ọnọdụ [Oblivious Message Retrieval (OMR)](https://zfnd.org/oblivious-message-retrieval/), nhazi foundation ahụ na-amụ “iji chọpụta ma ọ na-enye azịza nwere ike idozi nsogbu arụmọrụ ndị mere n'oge na-adịbeghị anya nke metụtara ndị ọrụ e-akpa ego Zcash.”

## Njehie Ndị A Na-ahụkarị

**Iche na sava lightwalletd maara nguzozi gị.** Sava ahụ na-ebunye naanị compact blocks; e-akpa ego gị na-eji igodo nke gị decrypt ma kọwaa ha n'ógbè gị.

**Ịkwụsị sync ngwa ngwa.** Ụfọdụ usoro na-eme ka ego ọhụrụ a pụrụ iji kwụọ ụgwọ dị tupu sync zuru ezu agwụ, mana akụkọ ochie na note nwere ike ka na-aga n'ihu.

**Iji sync Zcash atụnyere sync chain Oha kpọmkwem.** Ụzọ dị nwayọọ nwere ike ịbụ ọnụ ahịa ichekwa Nzuzo, ọ bụghị ntụpọ — e-akpa ego na-arụ ọrụ nke sava mkpụrụ ego ọha gaara arụ site n'ịgụ akaụntụ gị n'ihu ọha.


## Peeji Ndị Metụtara

- [Lightwallet Nodes](/zcash-tech/lightwallet-nodes) — akụrụngwa lightwalletd nke e-akpa ego dị ọkụ na-adabere na ya.
- [Viewing Keys](/zcash-tech/viewing-keys) — igodo e-akpa ego na-eji achọpụta ma decrypt note nke ha.
- [Pepper Sync](/zcash-tech/pepper-sync) — ụzọ ọzọ maka imekọrịta e-akpa ego Zcash.
- [FROST](/zcash-tech/frost) — ikike nbinye aka ekesara maka ZEC nke e chebere echebe.
