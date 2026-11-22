<a href="https://github.com/zechub/zechub/edit/main/site/guides/Maya_Protocol.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Dezie ibe"/>
</a>

# Maya Decentralised Exchange

> Maya Protocol bụ cross-chain DEX maka Mgbawe ndị a na-eme ozugbo n’agbụrụ ego ha (dịka ETH ma ọ bụ BTC gaa na ZEC), na-enweghị wrapped tokens, akaụntụ ma ọ bụ KYC.

## TL;DR

* Maya na-eme Mgbawe nke mkpụrụ ego dị n'ime obodo n'ofe blockchain dị iche iche: ị na-eziga otu akụ, nata nke ọzọ n'elu chain nke ya. Enweghị token e kechiri ekechi, akaụntụ, ma ọ bụ nyocha KYC.
* Ọ bụ alaka THORChain, e ji SDK Cosmos wuo ya, ndị na-arụ ọrụ node na-echekwa ya site n'itinye isi ego dịka bond (Proof of Bond).
* Token obodo ya bụ $CACAO. Ndị na-enye liquidity na-enweta ugwo Mgbawe, a na-echebekwa ha pụọ na mfu na-adịgide adịgide (Impermanent Loss Protection, ILP) ka ụbọchị 50 gachara.
* Maya bụ sistemụ azụ azụ: ị na-eji ya site na ihu onye ọrụ ma ọ bụ e-akpa ego dịka THORWallet, CacaoSwap, Asgardex, Ctrl Wallet ma ọ bụ KeepKey.
* Vidio nkuzi ahụ na-egosi Mgbawe ETH gaa ZEC na LeoDex, otu n'ime ihu onye ọrụ ndị a.
* Maya na-akwado ntinye ego ZEC nke e chebere echebe/ejikọtara ọnụ site na SwapKit (mmepụta uru Oha tinyere memo nke e chebere echebe), ya mere ụfọdụ ihu onye ọrụ nwere ike izipu ZEC ozugbo na adreesị ejikọtara ọnụ. Ọ bụrụ na nke gị akwụ ụgwọ na adreesị Oha (t1), chekwaa ya n'ime e-akpa ego gị ma emechaa maka Nzuzo.
* Maya abụghị naanị nhọrọ maka Mgbawe ZEC obodo: THORChain nwekwara pool ZEC obodo.

## Nkọwa bụ isi

Exchange etiti na-ejide mkpụrụ ego gị ma chọọ njirimara gị. Maya na-eji netwọk nke node ndị na-achịkwa ebe nchekwa ego dijitalụ na chain ọ bụla ọ na-akwado. Ị na-eziga mkpụrụ ego na ebe nchekwa ego dijitalụ Maya, opekata mpe ụzọ abụọ n’ime ụzọ atọ nke node na-akwado nkwụnye ego ahụ, a na-ezizikwa akụ kwekọrọ na ya site n’ebe nchekwa ego dijitalụ ọzọ gaa na Adreesị akpa ego gị na chain ebe ọ na-aga.

Ndị na-arụ node na-etinye bond nke a pụrụ ibelata ma ha mee omume ọjọọ, nke na-enye ha ihe kpatara ego iji na-eme ihe n’eziokwu. Maya na-agbakwunye atụmatụ n’elu THORChain, dị ka node liquidity na nhazi nchekwa ego nke ya, ma na-arụkwa ọrụ dị ka netwọkụ nke abụọ nwere onwe ya n’akụkụ ya.

Akụkụ ndị dị n'okpuru na-akọwa otú Maya si arụ ọrụ, Proof of Bond, otú o si dị iche na THORChain na ụdị e-akpa ego ndị na-akwado ya.

## Nkuzi


<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/f1k6xhNfTV8"
    title="Otu esi agbanwe Ethereum gaa na Zcash na LeoDex"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## Gịnị bụ Maya Protocol?

Maya bụ usoro [exchange decentralized decentralized exchange](https://nym.com/blog/what-is-dex) (DEX) nke na-eme ka o kwe omume ịzụ ahịa cryptocurrency n'ofe blockchain dị iche iche. Dịka ọmụmaatụ, ị nwere ike Mgbawe Bitcoin (BTC) dị na Bitcoin blockchain maka Ethereum (ETH) dị na Ethereum blockchain n'ụzọ dị mfe, na-enweghị ijide akụ ndị ahụ ma ọ bụ itinye ndị ọchịchị etiti ọ bụla ma ọ bụ usoro Know Your Customer (KYC).

Maya Protocol mepụtara site n'iji Cosmos Software Development Kit (Cosmos SDK), ọ na-arụkwa ọrụ na usoro consensus Proof of Bond (PoB). Ndị “Node Operators” na-akwado protocol a, ndị na-etinye isi ego ha n'ime usoro ahụ ma na-enweta nloghachi dị ka ụgwọ ọrụ maka onyinye na mgbalị ha. N'ụzọ bụ isi, node bụ kọmputa na-agba sọftụwia nke na-akwado Mgbawe ndị ọrụ ma na-elekọta akụ dị na Adreesị akpa ego ahọpụtara n'ofe blockchain dị iche iche.

Iji mezue Mgbawe, cryptocurrency a kwadoro ga-erurịrị n'otu n'ime Adreesị akpa ego Maya nke onye ọrụ zitere, emesịa eziga ego hà ya site n'Adreesị akpa ego Maya ọzọ dị na blockchain dị iche. Ọ dịkarịa ala ụzọ abụọ n'ime ụzọ atọ nke node na-achịkwa ma na-akwado usoro a, karịsịa iji hụ na e nwetara ego ndị ahụ nke ọma.

N'ụzọ dị otú a, ndị ọrụ nwere ike izipu otu ụdị token na otu blockchain ma nata ụdị ọzọ na blockchain ọzọ, ha niile n'onwe ha na-enweghị iji token ekpuchiri ekpuchi.

## Gịnị bụ Proof of Bond?

Proof of Bond (PoB) bụ usoro consensus ebe ndị na-arụ ọrụ node ga-etinye bond (nke na-abụkarị n'ụdị token nke netwọk ahụ) iji sonye na netwọk ahụ. Bond a na-arụ ọrụ dị ka ụdị nchekwa akụ na ụba, na-eme ka node na-eme ihe n'eziokwu ma na-echekwa ntụkwasị obi nke netwọk ahụ. Ọ bụrụ na node anwa ime ihe ọjọọ ma ọ bụ ghara ịrụ ọrụ ya, a pụrụ ibelata bond ya, nke pụtara na a ga-ewepụ akụkụ ya dịka ntaramahụhụ.

Na Maya Protocol, usoro a na-enyere aka imepụta uru akụ na ụba site na akụrụngwa ndị node operators kpọchiri, na-eme ka arụmọrụ isi ego bawanye. N'otu aka ahụ, na THORChain, ndị node operators na-etinye RUNE (token ala) dị ka bond iji chekwaa netwọk ma hụ na ndị sonyere na-arụkọ ọrụ.

## Ọdịiche dị n'etiti Maya na THORChain

Maya bụ fork nke THORChain, ma o nwere atụmatụ na arụmọrụ ọhụrụ ole na ole na-eme ka ọ bụrụ ezigbo nhọrọ ọzọ. Ndị kacha mkpa bụ

### Liquidity Nodes

Kama ịgbaso Pure Bond Model, Maya na-atụle ịgafe na ụdị Liquidity Nodes. N'ime usoro a, node na-enwe ike itinye liquidity ozugbo, site n'itinye ya dịka bond n'ime netwọk. Ụzọ a pụtara na ndị node operators na-eche nnukwu ihe ize ndụ ihu: ọ bụrụ na ha jiri ego eme ihe n'ụzọ na-ezighị ezi, ha na-ata mfu, nke na-arụ ọrụ dịka nnukwu ihe mgbochi. N'ihi ya, ndị node operators na-eji Liquidity Units sitere na Liquidity Pools, nke n'otu oge ahụ na-enye liquidity ma na-ewusi nchekwa netwọk ike.

### Nchedo Mfu Nwa Oge

Usoro nke na-echebe ndị na-enye ego mmiri (LPs) pụọ na mfu nwa oge ha nwere ike ịnweta mgbe ha na-enye ego mmiri, n’ihi mgbanwe ọnụahịa akụ crypto na-aga n’ihu.
ILP nwere 10% nke ngụkọta CACAO (CACAO 10 nde), a na-ejupụtakwa ya mgbe niile site na 10% nke ugwo protocol. ILP na-amalite ịrụ ọrụ ụbọchị 50 ka e tinyechara ego mmiri, mkpuchi ya agaghị agafe 100%.

Ogologo oge mkpuchi ILP dabere na arụmọrụ ASSET na $CACAO. A na-enweta mkpuchi zuru ezu mgbe ụbọchị 150 gachara ma ọ bụrụ na ASSET rụọ ọrụ nke ọma karịa, na mgbe ụbọchị 450 gachara ma ọ bụrụ na $CACAO rụọ ọrụ nke ọma karịa. A na-akwụ ILP ma tọgharịa ya mgbe ewepụrụ ego niile, mana iwepụ obere akụkụ anaghị emetụta ya. Maka Ntinye ego, a na-atụgharị ILP ma anaghị akwụ ya.

### Ụdị nkesa dị iche

Liquidity Auction bụ mmemme ụbọchị 21 e mere iji kesaa token $CACAO n'etiti ndị sonyere. N'oge mmemme ahụ, ndị ọrụ tinyere assets a kwadoro na Adreesị akpa ego akọwapụtara. Mgbe auction ahụ kwụsịrị, e kesara 90% nke token $CACAO nye ndị sonyere n'usoro dabere na onyinye liquidity ha, ebe e kesara 10% fọdụrụ na nchekwa ILP. Ndị sonyere ghọrọ ndị na-enye liquidity, tinyere assets ha etinyere na token $CACAO n'ime pool Maya, nke mere ka ha nwee ike inweta òkè nke ugwo emepụtara.

### Ụzọ dị iche e si ejikwa reserves

Na mmalite nke Maya Protocol, CACAO reserves dịnụ bụ naanị 10% nke ngụkọta supply, ma e jiri ya tụnyere 44% maka THORChain, ma e bu n'obi ha karịsịa maka Impermanent Loss Protection (ILP). Maya enweghị block emissions; ma ọ bụrụ na e mejuputa Protocol Owned Liquidity na Lending, ha ga-enwe nhazi dị iche, ebe na THORChain, akụkụ ndị a nwere njikọ chiri anya na Reserves.

N'agbanyeghị nke a, Maya na-ejekwa ozi dịka ngwọta nkwado nye THORChain, na-enye redundancy, mgbasawanye na nkwado, ma na-ejikọta netwọk ọhụrụ ndị na-adịghị na mmejuputa THORChain ugbu a.

Ọzọkwa, ebumnuche Maya bụ ịghọ *backend* nke ọrụ ndị ọzọ ga-ewukwasị, n’olileanya ịhụ ọtụtụ *frontends* ọhụrụ, ma ọ bụ ọrụ DEX ndị e wuru n’elu akụrụngwa Maya.

## Mmekọrịta e-akpa ego Maya Protocol

N'ịrụ ọrụ dịka *backend*, Maya kwesịrị ka UI na e-akpa ego dị iche iche kwado ya ka e wee jiri ya. 
Nke a bụ ndepụta ụfọdụ ọrụ na-akwado Maya ugbu a:

[THORWallet DEX](https://www.thorwallet.org/): Ledger, XDEFI, MetaMask, Keystore

El Dorado: ọ dịghịzi na ịntanetị, ngalaba ya anaghị edozi adreesị.

[CacaoSwap](https://cacaoswap.app/): Keystore, MetaMask, XDEFI, Keplr, Leap

[Asgardex](https://www.asgardex.com/): Keystore, Ledger

DefiSpot: anaghịzi arụ ọrụ n'ịntanetị, domain ya anaghị aza.

[Ctrl Wallet (XDEFI)](https://ctrl.xyz/): e-akpa ego njide onwe onye nke ọtụtụ ecosystem, nke na-akwado blockchain ala karịrị 30, yana chain EVM na Cosmos niile, gụnyere Bitcoin, Ethereum, Solana, THORChain, Maya Protocol, TRON, na ndị ọzọ.

[KeepKey ](https://keepkey.com/): Hardware wallet maka ịchekwa digital assets n'enweghị nsogbu.
