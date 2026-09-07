# Ihe Ọmụma Na-adịghị Eke: Mmekọrịta Transparent vs Shielded & Adreesị Unified

** Usoro:** Ọmụma efu ruo na Zero.

Ọ bụrụ na ị bụ onye mbụ mụta banyere Zcash, ị ga-ahụ ụdị azụmahịa abụọ dị: ** Transparent** and ** Shielded. 

Taa, anyị ga-amụta maka ha ma kpuchie otu n'ime ihe ọhụrụ dị na #Zcash ecosystem, **Unified Addresses**.

---

## Transparent vs. Shielded azụmahịa

- **Transparent Transactions** na-eji **t adreesị (Base58 encoded). Ihe niile bụ ihe ọha mmadụ nwere ike ịhụ - dị ka Bitcoin. 
- **Shielded Transactions** na-eji adreesị ezoro ezo maka ọdọ mmiri Sapling ma ọ bụ Orchard. Ndị a zoro onye zitere, nnata, yana ego site na iji ihe akaebe efu.

**Shielded Transaction** na-ezo aka n'ihe ọ bụla azụmahịa nwere adreesị ezoro ezo maka Sapling / Orchard ọdọ mmiri.

![Transparent vs Shielded intro](/content-images/FpmW00HWIAIZpQD-a244cfd85d.webp)

**Aha Unified Addresses (UA)** e mere iji mee ka azụmahịa ndị a na-ekpuchi ma ọ bụ nke doro anya banye n'otu adreesị.

---

## Ụdị Adreesị na Zcash

E nwere ụdị adreesị atọ a na-eji eme ihe:

1. **(T) Ihe na-acha ọcha**  Base58 
2. **(Z) Sapling**  Bech32 
3. **(UA) Unified Address**  Bech32m 

Ọnụ ọgụgụ nke ihe odide (na ya mere ogo QR code) na-abawanye site n'ụdị ọ bụla.

![Address types comparison](/content-images/FpmXe5bXsAEFeLY-704048927f.webp)

![QR code size comparison](/content-images/FpmXmDwXoAIWxov-dfc8346ffc.webp)

---

## Otú Adreesị Ndị E Jikọtara Ọnụ Si Arụ Ọrụ

Adreesị na igodo bụ encoded dị ka a byte usoro (** Raw Encoding **). 
A **Receiver Encoding** na-agụnye ozi niile dị mkpa iji nyefee ihe onwunwe site n'iji usoro iwu akọwapụtara.

Ihe ntinye nke Unified Address bụ ngwakọta nke encodings (typecode, ogologo, addr) nke ndị na-anata:

- UA: `0x03`  
- Sapling: `0x02`  
- Ihe na-ekpuchi: `0x01`  

**Mkpa**: A ga-enwerịrị ma ọ dịkarịa ala otu adreesị akwụ ụgwọ echekwara na UA niile. (A naghị akwadozi adreesì ndị a kụrụ n'elu mgbe nkwalite Canopy.)

![UA encoding structure](/content-images/FpmYW1ZXgAAvALT-70903e29c6.webp)

Nkọwa zuru ezu: **[ZIP-316: Adreesị Unified](https://zips.z.cash/zip-0316)**

---

## Uru Ndị Dị n'Inwe Adreesị Ịnọgide Na-enwe

- **Mfe maka mgbanwe** - Ha nwere ike ugbu a na-akwado echebe ego / withdrawals ọzọ n'ụzọ dị nchebe. 
- ** Ọdịnihu-àmà** - Enwere ike ịgbakwunye ọdọ mmiri ọhụrụ echekwara na enweghị agbaji wallets. 
- **Shielded-by-Default** - Onye ọ bụla UA nwere ma ọ dịkarịa ala otu adreesị echekwara, yabụ na nzuzo dị mgbe niile.

Nke a bụ mgbanwe dị mkpa nke na-enyere ọtụtụ ZEC aka ịkwaga n'ime ọdọ mmiri ahụ.

---

## Mgbasa Ozi & Ọrụ nke Orchard

Orchard webatara echiche ọhụrụ a kpọrọ **Actions**:

- Ha na-ebelata leakage nke metadata site n'iji ** otu arịlịka ** maka niile Actions ke a azụmahịa. 
- Ha jikọtara ubi nke (V4) mmefu + Mmepụta n'ime otu nkwa uru. 
- Nke a na-enye ohere arụmọrụ optimizations nke Halo2 àmà usoro.

Daira na-akọwa ọnọdụ Anchor (zcon3):

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/f6UToqiIdeY"
    title="Zcon3"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    kweeFullScreen
    loading="lazy"
  />
</div>

---

## Ịdị Nwayọọ n'Ihe Banyere Ụkpụrụ na Nzuzo nke Onwe Onye

N'ọnọdụ ụfọdụ (dịka azụmahịa cross-pool) ego nwere ike ịhụ onye na - ekiri ihe n'èzí. Otú ọ dị, `valueBalanceSapling` na nke a: `valueBalanceOrchard` jiri ** homomorphic nkwa** iji gosi ngụkọta ZEC na echekwara ọdọ mmiri ma gbochie counterfeiting.

Gụkwuo: [Nchebe Megide Ịghọ Agha Ụgha n'Ebe Ndị E Chebere Maka Ọdachi](https://electriccoin.co/blog/defense-against-counterfeiting-in-shielded-pools/)

---

## Ihe Ndị A Ga-eme Ka Ha Dịkwuo Mma n'Ọdịnihu

Ndị otu ECC na-arụ ọrụ n'usoro RPC ọhụrụ. `zcashd` (na-anọchi anya ya) `z_sendmany`) nke ga-eme ka ndị ọrụ hụchalụ ma nabata / jụ azụmahịa a tụrụ aro dabere na njirimara nzuzo ya.

---

## Nkwado

This thread originally pointed at **Ywallet**, for the transaction plan it showed before you hit send. Ywallet is no longer maintained and will not be updated for Ironwood, so it can no longer follow the chain. Pick a maintained wallet from the [Akpa ego](https://zechub.wiki/wallets) peeji kama, na-ahọrọ otu nke gwara gị ihe a azụmahịa ga-ekpughe tupu ọ pụọ.

Akụkọ magburu onwe ya banyere nzuzo azụmahịa: https://medium.com/@hanh.huynh/

---

**Original Thread nke ZecHub (@ZecHub) dere** 
https://x.com/ZecHub/status/1628498645627666432

---

*Edepụtara peeji a site na isi mmalite Zero to Zero Knowledge maka wiki ZecHub.*
