#  <img src="/content-images/e38b13a9-d410-426a-a1e6-2dde105d56c4-6b8154e5ae.webp" alt="Alt Text" width="50"/> ZingoLabs

[Weebụsaịtị gọọmentị](https://zingolabs.org/) - [GitHub](https://github.com/zingolabs) - [X/Twitter](https://x.com/ZingoLabs) - [Instagram](https://www.instagram.com/zingolabesp/)

ZingoLabs bụ otu ndị ọhụụ nke raara onwe ha nye ime ka ahụmahụ mmadụ ka mma. Anyị kwenyere na teknụzụ kwesịrị ịbara mmadụ uru nakwa na anyị na-enwe ọganihu site n'emekọrịta ihe e kwenyere na ya. Anyị na-achọpụta ụkpụrụ ndị na-eme ka nke a kwe omume.

Zingo Lab Cyan na-arụ ọrụ dị ka DAO nke e chebere echebe [Shielded DAO]. Anyị na-echekwa ego anyị n'Ebe nchekwa ego [treasury] ebe onye ọ bụla so na ya nwere viewing key [view key]. A na-emefu ego site n'Ebe nchekwa ego mgbe ndị òtù tozuru oke kwado atụmatụ.

## Ọrụ

### Zingo! e-akpa ego [Wallet] ([GitHub](https://github.com/zingolabs/zingo-mobile))
Zingo e-akpa ego bụ e-akpa ego Zcash nwere atụmatụ zuru ezu, nke e mere ka ọ dịrị ndị ọrụ mfe, ọ bụ ezie na o nwere ụfọdụ atụmatụ dị elu maka ndị ọrụ toro eto karị. Ọ na-akwado pool Oha [transparent], nke e chebere echebe [shielded], na Sapling na Ironwood, nwere akwụkwọ Adreesị akpa ego maka Kwụọ ụhwọ ugboro ugboro, ma dị n'asụsụ dị iche iche. Ọ bụ e-akpa ego mbụ kwadoro Orchard ma mejuputa usoro NU5.

Otu n'ime atụmatụ bụ isi nke Zingo! bụ ikike ya iji mpaghara memo [Memo field] nye nghọta bara uru gbasara Azụmahia [transactions] gị.

Zingo! dị maka ngwaọrụ mkpanaka na PC. Ị ga-ahụ nbudata niile [ebe a](https://zingolabs.org/)

### Zingolib ([GitHub](https://github.com/zingolabs/zingolib))
API na ngwa nnwale nke na-ekpughe arụmọrụ zcash maka ngwa iji. Zingolib na-enye ma ọbá akwụkwọ maka zingo-mobile, yana ngwa cli agụnyere a na-akpọ zingo-cli, e-akpa ego light sitere n'ahịrị iwu nke na-agwa chain indexer dịka [Zaino](/zcash-tech/zaino) okwu.

### Zaino Ndepụta ([GitHub](https://github.com/zingolabs/zaino))
Zaino bụ indexer Rust maka blockchain Zcash, nke otu Zingo mepụtara. Ọ bụ indexer dị na [Z3 stack](/zcash-tech/z3-stack): ọ na-edepụta data chain site na validator [Zebra](/zcash-tech/zebra-full-node) ma na-enye e-akpa ego, ndị na-enyocha, na ndị ahịa ndị ọzọ ozi. Ọ bụ ụzọ ga-anọchi lightwalletd.

Zaino na-enye atụmatụ dị mkpa maka ma light client, dịka e-akpa ego na ngwa ndị na-adịghị achọ akụkọ ihe mere eme blockchain zuru ezu, na ndị ahịa zuru ezu ma ọ bụ e-akpa ego. Ọ na-akwado ndị na-enyocha block, na-enye ohere ịnweta ma blockchain emechara na chain kacha mma a na-emechabeghị na mempool nke validator zuru ezu Zebra na-elekọta.

`zcashd` ruru nkwụsị Njedebe Nkwado ya na 18 Julaị 2026 na block 3,417,100 ma ọ naghị akwado Ironwood (NU6.3). Zaino na-agụ validator Zebra.

###  ZLN (zcash-local-net) ([GitHub](https://github.com/zingolabs/infrastructure/tree/dev/zcash_local_net))

Otu ngwá ọrụ na-ebido ma na-achịkwa usoro Zcash. A na-eji nke a maka nnwale njikọta n'ime mmepe nke:
- lightclients
- indexers
- validators

Ebumnuche ya bụ inye gburugburu nnwale na-agbanwe agbanwe nke ukwuu ma sie ike maka core nodes (validators) dịka Zebra, indexers dịka Zaino, na e-akpa ego light client dịka zingo-cli.

Stack ndabara ọ na-ebido bụ Zebrad, zainod, na zcash-devtool. Usoro ochie `zcashd` na lightwalletd nọ n'azụ atụmatụ `legacy-stack` a naghị akwado ma ahaziri ka e wepụ ha.

Na mgbakwunye n'inye ngwá ọrụ iji bido, chekwaa, na bubata data chain Zcash (maka mainnet, testnet, na regtest), a na-eji zcash-local-net site na nnwale Zaino iji nyochaa ọrụ Lightwallet RPC ndị a kwadoro na Zaino (lee [Zaino akwụkwọ nnwale](https://github.com/zingolabs/zaino/blob/dev/docs/testing.md)).
