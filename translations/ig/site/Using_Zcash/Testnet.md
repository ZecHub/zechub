# Zcash Testnet

## Gịnị Bụ Zcash Testnet?

**Zcash Testnet** bụ blockchain [blockchain] nke na-agba n'akụkụ netwọkụ bụ isi (Mainnet) Zcash n'ezie, nke na-emegharị kpọmkwem protocol, iwu, na mgbagha Azụmahia [transaction] — mana o nwere ọdịiche abụọ dị mkpa:

1. **Ego anaghị enwe ezigbo uru ego** — a na-akpọ ha **TAZ**, ọ bụghị ZEC, a na-ejikwa ha naanị maka nnwale.  
2. **A na-ebu ụzọ nwalee network upgrade [network upgrade], ngwá ọrụ [tools], na sọftụwia ebe a** tupu ebuga ha na blockchain Zcash n'ezie.  

N'ikwu ya n'ụzọ ọzọ, Testnet dị ka **ebe nchekwa ma ọ bụ gburugburu nnwale** ebe ndị mmepụta, ndị nyocha, na ndị na-ewu ihe nwere ike ịnwale echiche n'etinyeghị ego n'ezie n'ihe ize ndụ.


## Gịnị Mere Testnet Ji Dị?

Testnet dị oke mkpa maka mmepe blockchain n'ihi na **blockchain dị adị dịka Zcash anaghị agbanwe agbanwe** — ozugbo akwadoro Azụmahia na netwọkụ bụ isi, a pụghị imegharị ha azụ. Testnet na-enye **oyiri nchekwa** iji nwalee, lelee, ma dozie atụmatụ tupu ebuga ha na Mainnet.

### Ojiji Testnet

#### 1. Mmepe na Njikọta Sọftụwia

Ndị mmepụta na-ewu e-akpa ego [wallet], exchange [exchange], sọftụwia ịgwụputa [mining], ma ọ bụ ngwá ọrụ Nzuzo [privacy] nwere ike nwalee ha n'enweghị nsogbu na Testnet. Ike ndị dị na ya gụnyere:

- Izipu na ịnata Azụmahia  
- Ịgwụputa block [block] ọhụrụ site n'ego TAZ na-enweghị uru  
- Iwu ihe ngosi onye ọrụ na API  
- Ịnwale atụmatụ Nzuzo Azụmahia (Oha [transparent] megide nke e chebere echebe [shielded])  

**Ọmụmaatụ:**  
Ngwá ọrụ dịka [`zcash_tx_tool`](https://github.com/QED-it/zcash_tx_tool) na-eji Testnet emepụta Azụmahia ma nwalee ọrụ akụ nke e chebere echebe Zcash.  

**Ọnọdụ ụwa n'ezie:**  
Onye mmepụta e-akpa ego nwere ike ijikọ sọftụwia na RPC endpoint Testnet ma mee ka usoro ndụ zuru ezu pụta — ịmepụta Adreesị akpa ego [address], izipu Azụmahia nke e chebere echebe, na ikwenye nguzozi — tupu ọ banye na Mainnet.

#### 2. Ịnwale Network Upgrade

Zcash na-eme network upgrade na protocol isi ya kwa oge (dịka NU6.1, NU6.2 na Ironwood). Testnet na-eme ka upgrade ọhụrụ rụọ ọrụ **tupu Mainnet**, na-enye ndị mmepụta na obodo ohere ịchọpụta ma dozie ahụhụ.

**Ọmụmaatụ:**  
A na-ebu ụzọ tinye iwu consensus [consensus] ọhụrụ ma ọ bụ ụdị Azụmahia ọhụrụ na Testnet. Mgbe nnwale gachara nke ọma, ọ na-arụ ọrụ na Mainnet n'ogologo block ekpebiri tupu oge eruo.

#### 3. Ịnwale Mmejuputa Node

Node Zcash a na-elekọta bụ **Zebra** (node sitere na Rust nke Zcash Foundation na-elekọta) na e-akpa ego a na-elekọta bụ [Zallet](https://github.com/zcash/zallet). `zcashd`, mmejuputa node mbụ, rutere nkwụsị nkwado akpaka ya na 18 Julaị 2026, a naghịkwa elekọta ya ọzọ — lee [zcashd maka Zebra na ntuziaka mbufe Zallet](https://zechub.wiki/guides/migration-guide-zcashd-to-zebrad-zallet). Testnet na-eme ka o kwe omume ịnwale node n'ọnọdụ n'ezie n'enweghị ihe ize ndụ ego.

Ndị mmepụta node nwere ike:

- Ikwado mgbasa block  
- Ịnwale interface RPC  
- Ileba omume node anya mgbe ibu ọrụ dị elu  
- Ịnwale mmekọrịta sọftụwia ịgwụputa  

#### 4. Ịmụ na Mmụta

Ndị mbido nwere ike ịmụ atụmatụ Zcash dịka ịgwụputa, ịmepụta Azụmahia nke e chebere echebe, na iji Unified Addresses.  
Nkuzi na akwụkwọ obodo na-enye ohere ịnweta **faucet Testnet, explorer, na ntuziaka**.


## Ojiji Testnet N'eziokwu

### 1. Nnwale Onye Mmepụta (E-akpa Ego / Ngwa)

- Jikọọ na Testnet Zcash  
- Rịọ TAZ n'aka faucet  
- Zipu Azụmahia nke e chebere echebe  
- Kwenye Nzuzo na nkwụsi ike UI  

Ọ dịghị ezigbo ZEC na-efu ọbụlagodi ma ọ bụrụ na mmejọ emee.

### 2. Nnwale Njikọta Exchange

- Gbaa node Testnet  
- Jiri JSON-RPC endpoint Zebrad hazie Azụmahia  
- Nwale mgbagha nkwụnye ego/wepụ ego akpaka  

Nke a na-ahụ na koodu mmepụta dị nchebe ma na-egbochi mfu ego.

### 3. Nnwale Nhazi Ịgwụputa

- Jiri template ịgwụputa  
- Nwale nkwado block  
- Leruo ụgwọ ọrụ ịgwụputa anya (naanị TAZ)  
- Hazie arụmọrụ ịgwụputa  

Nke a na-egbochi oge nkwụsị ma ọ bụ ego enwetaghị mgbe a na-akwaga na Mainnet.

### 4. Nnyocha Agụmakwụkwọ / Protocol

Ndị nyocha nwere ike iji Testnet nwalee mmepụta ọhụrụ dịka **nkwenye na-enweghị steeti**, **nkwalite zero-knowledge proof**, ma ọ bụ nnwale protocol ndị ọzọ.  
Ndị ọrụ dị elu nwekwara ike ịgba **Testnet omenala ma ọ bụ gburugburu regtest** maka nnwale pụrụ iche.


## Ọdịiche Ndị Dị Mkpa N'agbata Mainnet na Testnet

| Atụmatụ               | Mainnet           | Testnet                  |
|-----------------------|-----------------|--------------------------|
| Uru ego               | ZEC n'ezie         | TAZ (enweghị uru ego)  |
| Ihe ize ndụ           | Ihe ize ndụ ego   | Nchekwa maka nnwale         |
| Mmelite protocol     | Mmepụta       | Ịrụ ọrụ n'isi         |
| Ụgwọ ọrụ ịgwụputa        | Mwepụta n'ezie    | Naanị ụgwọ ọrụ nnwale         |
| Uru netwọkụ       | Azụmahia na-arụ ọrụ| Nnwale na mmepe  |

## Nghọta Ezighị Ezi A Na-ahụkarị

- **Ego Testnet bara uru** -> Ezighị ezi, TAZ enweghị uru.  
- **Ọ dị mkpa ma ego Testnet efuo** -> Ezighị ezi, ọ dịghị uru n'ezie furu efu.  
- **Testnet na Mainnet bụ otu** -> Ezighị ezi, Testnet na-amaliteghachi ugboro ugboro, nchekwa akụ na ụba ya adịghịkwa ka nke Mainnet.

---

## Gịnị Bụ TAZ?

**TAZ** bụ ụdị Testnet nke ego Zcash:  

- Ọ bụghị ezigbo ego; enweghị ike ịgbanwe ya maka ZEC ma ọ bụ ego fiat  
- A na-eji ya maka nnwale, mmepe, na mmụta  
- Ọ na-agbaso iwu Zcash niile: enwere ike izipu ya, ịgwụputa ya, ma jiri ya na Adreesị akpa ego nke e chebere echebe  

**Ọmụmatụ:**  
Onye mmepụta nwere ike izipu 100 TAZ site na otu Adreesị akpa ego Testnet gaa na ọzọ iji nwalee atụmatụ e-akpa ego na-etinyeghị ezigbo ZEC n'ihe ize ndụ.  

Chee TAZ dịka **“ego egwuregwu” maka Testnet Zcash**.


## Gịnị Bụ Faucet?

**Faucet** bụ ọrụ na-enye ego TAZ n'efu maka nnwale:

- Ọ na-abụkarị weebụsaịtị ma ọ bụ API  
- Ndị ọrụ na-enye Adreesị akpa ego Testnet; faucet na-eziga obere TAZ  
- Ọ na-ewepụ mkpa ịgwụputa TAZ n'onwe gị  

**Ọmụmatụ:**  
1. Gaa na faucet Testnet (dịka [fauzec.com](https://fauzec.com/) | [zcashfaucet.jinolabs.xyz](https://zcashfaucet.jinolabs.xyz/))  
2. Tinye Adreesị akpa ego Testnet gị  
3. Rịọ TAZ  
4. Nata TAZ ozugbo iji malite nnwale  

**Ihe kpatara o ji dị mkpa:**  
- Nnwale nchekwa na-etinyeghị ZEC n'ihe ize ndụ  
- Nnweta maka ndị mbido na ndị mmepụta  
- Ime ihe nlereanya ngwa ngwa maka e-akpa ego, exchange, na ngwa



## E-akpa ego Zkool na Zingo!

### Zkool

- E-akpa ego ọtụtụ akaụntụ maka ndị ọrụ Zcash dị elu  
- Na-akwado Mkpuru mgbake [seed phrase], viewing key [viewing key], Adreesị akpa ego Oha na nke e chebere echebe  
- Ọ nwere ike ijikọ na Mainnet, Testnet, ma ọ bụ Regtest site na full node [full node] ma ọ bụ sava lightwallet

### Zingo!

- E-akpa ego mkpanaka nke lekwasịrị anya na Nzuzo na ịdị mfe  
- Na-akwado Adreesị akpa ego nke e chebere echebe na unified  
- Emelitela ya iji kwado protocol Testnet (gụnyere Testnet NU6)

## Ịgbanye Testnet na E-akpa Ego

### E-akpa ego Zkool

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/XCGwwqLZILg"
    title="Zkool Testnet"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

**Ndụmọdụ:**  
- E-akpa ego nwere ike ịmaliteghachi mgbe a na-agbanwe netwọkụ  
- Akaụntụ Mainnet ZEC anaghị emetụta  
- Jiri sava lightwallet Testnet ma ọ bụrụ na a gwa gị

### E-akpa ego Zingo!

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/To7WAkiBldA"
    title="Zingo Testnet"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


Ozugbo agbanyere ya, e-akpa ego nwere ike izipu ma nata TAZ, nwalee Azụmahia nke e chebere echebe, ma mee nnwale n'enweghị nsogbu.


## Mgbe Ị Gbanyere Testnet

- Azụmahia na-arụ ọrụ dịka na Mainnet mana ha nwere **TAZ na-enweghị uru**  
- Enwere ike ịnwale Azụmahia nke e chebere echebe, ọtụtụ Adreesị akpa ego, na atụmatụ Nzuzo  
- Ndị mmepụta nwere ike idozi ahụhụ ma nwalee atụmatụ n'etinyeghị ezigbo ZEC n'ihe ize ndụ


## Nchịkọta Ngwa Ngwa

- **Testnet Zcash** bụ gburugburu nchekwa maka iwu, nnwale, na ime nnwale  
- Ojiji: nnwale onye mmepụta, nnwale node, njikọta exchange, nnyocha, na mmụta  
- A na-eji **ego TAZ** kama ZEC, ha enweghịkwa uru n'ezie  
- Testnet dị mkpa tupu ebuga atụmatụ ka ha rụọ ọrụ na Mainnet
