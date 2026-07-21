# Zcash Testnet

## Gịnị Bụ Zcash Testnet?

**Zcash Testnet** bụ ihe jikọrọ ya na ezigbo netwọkụ Zcash (Mainnet) nke na-emegharị usoro ahụ, iwu, na mgbagha azụmahịa - mana yana isi ihe abụọ dị iche:

1. ** Mkpụrụ ego enweghị ezigbo uru ego ** - a na-akpọ ha ** TAZ **, ọ bụghị ZEC, ma jiri ya naanị maka ule. 
2. ** A na-ebu ụzọ nwalee nkwalite netwọkụ, ngwaọrụ, na ngwanrọ ebe a tupu etinye ya na ezigbo Zcash blockchain. 

N'ikwu ya n'ụzọ ọzọ, Testnet dị ka ** sandbox ma ọ bụ gburugburu ebe obibi nnwale ** ebe ndị mmepe, ndị nyocha, na ndị na-ewu ụlọ nwere ike ịnwale echiche na-enweghị ihe ize ndụ ezigbo ego.


## N'ihi Gịnị Ka Testnet Ji Dịrị?

Testnet is crucial for blockchain development because **real blockchains like Zcash are immutable** - once transactions are confirmed on the main network, they cannot be undone. Testnet provides a **safe replica** to experiment, test, and debug features before deploying to Mainnet.

### Ojiji nke Testnet

#### 1. Mmepe sọftụwia na ntinye

Ndị mmepe na-ewu obere akpa, mgbanwe, ngwanrọ igwupụta akụ, ma ọ bụ ngwaọrụ nzuzo nwere ike ịnwale ha n'enweghị nsogbu na Testnet.

- Izipu na ịnata azụmahịa 
- Igwu blọgụ ọhụrụ na mkpụrụ ego TAZ na-enweghị uru 
- Ịmepụta interface ndị ọrụ na API 
- Nnyocha njirimara nzuzo azụmahịa (transparent vs shielded) 

**Ihe atụ:** 
Ngwá ọrụ ndị dị ka [`zcash_tx_tool`](https://github.com/QED-it/zcash_tx_tool) jiri Testnet iji mepụta azụmahịa ma nwalee ọrụ Zcash echekwara akụ. 

**Echiche nke ụwa:** 
A wallet developer can connect software to a Testnet RPC endpoint and simulate the full lifecycle - creating addresses, sending shielded transactions, and validating balances - before going live on Mainnet.

#### 2. Ịnwale nkwalite netwọk

Zcash upgrades its core protocol periodically (e.g., Nu5, Nu6). Testnet activates new upgrades **before Mainnet**, allowing developers and the community to identify and fix bugs.

**Ihe atụ:** 
A new consensus rule or transaction type is first pushed to Testnet. After successful testing, it activates on Mainnet at a predetermined block height.

#### 3. Ule Node Mmejuputa

Zcash na-akwado ọtụtụ mmejuputa ngwanrọ nke node - `zcashd` and **Zebra** (Rust-based node maintained by the Zcash Foundation). Testnet enables testing of nodes in real conditions without financial risk.  

Ndị na-emepe emepe nwere ike:

- Nyochaa mgbasa nke ngọngọ 
- Ule RPC ihu 
- Na-eleba anya n'omume node n'okpuru ibu 
- Nyochaa mmekọrịta sọftụwia igwupụta akụ 

#### 4. Ịmụta na Agụmakwụkwọ

Ndị mbido nwere ike ịmụta atụmatụ Zcash dịka igwu egwu, ịmepụta azụmahịa echedoro, na iji Adreesị Unified. 
Ntuziaka na akwụkwọ nke obodo na-enye ohere ịnweta ** Testnet faucets, explorers, and guides **.


## Ezigbo Testnet Jiri Ọnọdụ

### 1. Nnwale Onye Mmepụta (Wallet / App)

- Jikọọ na Zcash Testnet 
- Rịọ TAZ site na ọkpọkọ mmiri 
- Na-ezipụ azụmahịa echekwara 
- Nyochaa nzuzo na UI nkwụsi ike 

Enweghị ezigbo ZEC furu efu ọbụlagodi ma ọ bụrụ na emehie.

### 2. Exchange Integration Ule

- Na-agba ọsọ Testnet node 
- Jiri Zebrad JSON-RPC njedebe iji hazie azụmahịa 
- Ule akpaaka nkwụnye ego / ndọrọ ego mgbagha 

Na-eme ka koodu mmepụta dị nchebe ma gbochie mfu ego.

### 3. Ọnwụnwa nke Ịrụ Ngwuputa

- Jiri ndebiri igwupụta akụ 
- Nyocha nyocha nke ule 
- Hụ ụgwọ ọrụ igwupụta (TAZ naanị) 
- Tune Ngwuputa arụmọrụ 

Na-egbochi oge nkwụsị ma ọ bụ ego furu efu mgbe ị na-agagharị na Mainnet.

### 4. Ọmụmụ ihe ọmụmụ / Protocol Research

Ndị na-eme nchọpụta nwere ike ịnwale ihe ọhụrụ dị ka ** nkwenye na-enweghị ọnọdụ **, ** njikarịcha ihe akaebe nke ihe ọmụma efu **, ma ọ bụ nnwale usoro iwu ndị ọzọ site na iji Testnet. 
Ndị ọrụ nwere ọkaibe nwekwara ike ịgba ọsọ ** omenala Testnets ma ọ bụ regtest gburugburu ebe obibi ** maka nnwale pụrụ iche.


## Isi ọdịiche dị n'etiti Mainnet na Testnet

Njirimara Mainnet Testnet
|-----------------------|-----------------|--------------------------|
◯ Uru mkpụrụ ego ◯ Ezigbo ZEC ◯ TAZ (enweghị uru ego) ◯
Ihe ize ndụ, ihe ize ndụ ego, nchekwa maka nnwale.
◯ Nwelite usoro ihe omume ◯ Mmepụta ◯ Ịrụ ọrụ n'oge
◯ Ihe a na-akwụ ndị na-egwupụta akụ̀ n'ime ala ụgwọ ọrụ ◯ Ezigbo ego e nyere ha ◯ Naanị ihe a na - akwụ ha bụ iji nwalee ha
◯ Ihe enyemaka netwọk ◯ Mmekọrịta ndụ ◯ Ule na mmepe ◯

## Echiche Ụgha Ndị A Na-enwekarị

- **Mkpụrụ ego Testnet bara uru ụfọdụ** -> Ụgha, TAZ nwere uru efu. 
- **Ịtụfu mkpụrụ ego Testnet dị mkpa** -> Ụgha, ọ dịghị ezigbo uru furu efu. 
- **Testnet na Mainnet bụ otu** -> Ụgha, Testnet na-agbanye ugboro ugboro ma ọ bụghị ihe echekwara echekwa dị ka Maannet.

---

## Gịnị Bụ TAZ?

**TAZ** bụ ụdị Testnet nke mkpụrụ ego Zcash: 

- Ọ bụghị ezigbo ego; enweghị ike ịgbanwe ya maka ZEC ma ọ bụ fiat 
- A na-eji ya maka ule, mmepe, na mmụta 
- Na-agbaso iwu Zcash niile: enwere ike izipu, kpoo, ma jiri ya na adreesị echedoro 

**Ihe atụ:** 
Onye mmepe nwere ike izipu 100 TAZ site na otu adreesị Testnet gaa na nke ọzọ iji nwalee njirimara obere akpa na-enweghị ihe ize ndụ ZEC n'ezie. 

Chee echiche banyere TAZ dịka ** "ego egwuregwu" maka Zcash Testnet **.


## Gịnị Bụ Faucets?

A **faucet** bụ ọrụ na-enye mkpụrụ ego TAZ n'efu maka ule:

- A na-ejikarị weebụsaịtị ma ọ bụ API 
- Ndị ọrụ na-enye adreesị Testnet; ọkpọkọ ahụ na-eziga obere TAZ 
- Na-ezere mkpa iji kpochapụ TAZ aka 

**Ihe atụ:** 
1. Gaa na Testnet faucet (dịka, [testnet.zecfaucet.com](https://testnet.zecfaucet.com) [fauzec.com]](https://fauzec.com/))  
2. Tinye adreesị Testnet gị 
3. Arịrịọ TAZ 
4. Nweta TAZ ozugbo iji malite ule 

** Ihe mere o ji dị mkpa:** 
- Nnwale nchekwa na-enweghị ihe ize ndụ ZEC 
- Ịnweta maka ndị mbido na ndị mmepe 
- Nhazi ngwa ngwa maka obere akpa, mgbanwe, na ngwa



## Zkool na Zingo!

### Zkool

- Akpa ego ọtụtụ akaụntụ maka ndị ọrụ Zcash dị elu 
- Na-akwado mkpụrụ okwu, igodo nlele, adreesị na-enweghị ihe ọ bụla 
- Nwere ike ijikọ na Mainnet, Testnet, ma ọ bụ Regtest site na nodes zuru ezu ma ọ̄ bụ sava lightwallet

### Zingo! (Ụda olu)

- Akpa ego mkpanaka lekwasịrị anya na nzuzo na ịdị mfe 
- Na-akwado adreesị echedoro na nke dị n'otu 
- E melite iji kwado usoro Testnet (gụnyere NU6 Testnet)

## Na-eme ka Testnet dị na Wallets

### Zkool obere akpa

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/XCGwwqLZILg"
    title="Zkool Testnet"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    kweeFullScreen
    loading="lazy"
  />
</div>

** Ndụmọdụ:** 
- E nwere ike ịmalitegharịa obere akpa mgbe ị na-agbanwe netwọkụ 
- Akaụntụ Mainnet ZEC adịghị emetụta 
- Jiri ihe nkesa Testnet lightwallet ma ọ bụrụ na a kpaliri

### Zingo! Wallet

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/To7WAkiBldA"
    title="Zingo Testnet"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    kweeFullScreen
    loading="lazy"
  />
</div>


Ozugbo enyere ya, obere akpa nwere ike izipu ma nata TAZ, nwalee azụmahịa echekwara, ma nwalee n'enweghị nsogbu.


## Mgbe Ịnyechara Testnet

- Mmekọrịta na-akpa àgwà dị ka Mainnet ma na ** efu-uru TAZ ** 
- Enwere ike ịnwale azụmahịa echekwara, ọtụtụ adreesị, na njirimara nzuzo 
- Ndị mmepe nwere ike debug ma nwalee atụmatụ n'enweghị ihe ize ndụ nke ezigbo ZEC


## Nchịkọta Dị Mkpirikpi

- **Zcash Testnet** bụ gburugburu ebe nchekwa sandbox maka iwu, ule, na nnwale 
- Jiri ikpe: ule onye nrụpụta, ule node, ijikọta mgbanwe, nyocha, na agụmakwụkwọ 
- ** A na-eji mkpụrụ ego TAZ ** eme ihe kama iji ZEC ma enweghị ezigbo uru 
- Testnet dị mkpa tupu nkenye ọnọdụ ndụ na Mainnet
