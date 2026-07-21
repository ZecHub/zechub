# Ihe Ọmụma Na-enweghị Ihe Ọ Bụla: Mmekọrịta Transparent vs Shielded & Unified Addresses

**Series:** Zero to Zero Knowledge

If you are learning about Zcash for the first time you will find there are two types of transactions available: **Transparent** and **Shielded**.  

Taa, anyị ga-amụta maka ha & kpuchie otu n'ime atụmatụ ọhụrụ na #Zcash ecosystem, **Unified Addresses**.

---

## Transparent vs. Shielded Azụmahịa

- **Transparent Transactions** na-eji **t-adreesị** (Base58 encoded). Ihe niile na-ahụ anya n'ihu ọha - dị ka Bitcoin. 
- **Shielded Transactions** use addresses encoded for the **Sapling** or **Orchard** pools. These hide sender, receiver, and amount using zero-knowledge proofs.

**Shielded Transaction** na-ezo aka na azụmahịa ọ bụla nwere adreesị ezoro ezo maka ọdọ mmiri Sapling/Orchard.

[Nkọwapụta Transparent vs Shielded]](https://pbs.twimg.com/media/FpmW00HWIAIZpQD.jpg)

A haziri Unified Addresses (UA) iji mee ka azụmahịa ndị e chebere ma ọ bụ ndị doro anya banye n'otu adreesị.

---

## Ụdị Adreesị na Zcash

E nwere ụdị adreesị atọ eji eme ihe:

1. **(T) N'ụzọ doro anya**  Base58 
2. **(Z) Sapling**  Bech32 
3. **(UA) Unified Address**  Bech32m 

Ọnụ ọgụgụ nke ihe odide (na ya mere ogo QR code) na-abawanye na ụdị ọ bụla.

[Nkọwa ụdị adreesị](https://pbs.twimg.com/media/FpmXe5bXsAEFeLY.png)

![Nkọwapụta nha QR](https://pbs.twimg.com/media/FpmXmDwXoAIWxov.png)

---

## Otú Adreesị Ndị Dị n'Otu Si Arụ Ọrụ

Adreesị na igodo na-ekpuchi dị ka usoro byte (** Raw Encoding**). 
A **Receiver Encoding** na-agụnye ozi niile dị mkpa iji nyefee ihe onwunwe site na iji otu protocol.

Nkọwapụta nke Unified Address bụ ngwakọta nke encodings (typecode, ogologo, addr) nke ndị nnata:

- UA: `0x03`  
- Sapling: `0x02`  
- Ihe na-ekpuchi: `0x01`  

**Dị mkpa**: A ga-enwerịrị **ọ dịkarịa ala otu adreesị akwụ ụgwọ echedoro** na UA ọ bụla. (A naghị akwado adreesì akwụkwọ ntuziaka ọzọ mgbe nkwalite Canopy.)

![Ọdịdị koodu UA](https://pbs.twimg.com/media/FpmYW1ZXgAAvALT.png)

Nkọwa zuru ezu: **[ZIP-316: Unified Addresses](https://zips.z.cash/zip-0316)**

---

## Uru Ndị Dị n'Inwe Adreesị Ndị E Jikọtara Ọnụ

- ** Mfe maka mgbanwe ** - Ha nwere ike ugbu a na-akwado echebe ego / withdrawals ọzọ n'ụzọ dị nchebe. 
- ** Ọdịnihu-àmà ** - Enwere ike ịgbakwunye ọdọ mmiri ọhụrụ echekwara na-enweghị imebi obere akpa. 
- **Shielded-by-Default** - Onye ọ bụla UA nwere ma ọ dịkarịa ala otu adreesị ezoro ezo, yabụ na nzuzo dị mgbe niile.

Nke a bụ mgbanwe dị mkpa nke na-enyere ọtụtụ ZEC aka ịkwaga n'ime ọdọ mmiri ahụ.

---

## Mmekọrịta & Ọrụ Orchard

Orchard webatara echiche ọhụrụ a kpọrọ **Actions**:

- Ha na-ebelata leakage nke metadata site na iji ** otu arịlịka ** maka niile Actions na a azụmahịa. 
- Ha jikọtara ubi nke (V4) mmefu + mmepụta n'ime otu nkwa uru. 
- Nke a na-enyere arụmọrụ optimizations nke Halo2 àmà usoro.

Daira kọwara ọnọdụ Anchor (zcon3):

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

## Ịkwanyere Ihe Ndị Dị Oké Ọnụ Ahịa Ùgwù na Inwe Nzuzo

N'ọnọdụ ụfọdụ (dịka azụmahịa cross-pool) ego nwere ike ịhụ onye na-ekiri n'èzí. Otú ọ dị, `valueBalanceSapling` na `valueBalanceOrchard` jiri ** homomorphic nkwa ** iji gosi ngụkọta ZEC na echekwara ọdọ mmiri na gbochie counterfeiting.

Gụkwuo: [Nchebe megide counterfeiting na Shielded ọdọ mmiri](https://electriccoin.co/blog/defense-against-counterfeiting-in-shielded-pools/)

---

## Mmezi Ndị A Ga-eme n'Ọdịnihu

Ndị otu ECC na-arụ ọrụ na usoro RPC ọhụrụ na `zcashd` (na-anọchi `z_sendmany`) nke ga-eme ka ndị ọrụ hụchalụ ma nabata / jụ azụmahịa a tụrụ aro dabere na njirimara nzuzo ya.

---

## Ntụziaka

Gbalịa ụdị ọhụrụ nke YWallet! 
Ọ na-egosi "Atụmatụ azụmahịa" na ihuenyo tupu ị pịa zipu, na-enyere gị aka ime nhọrọ ndị ọzọ nkeonwe.

Akụkọ magburu onwe ya banyere nzuzo azụmahịa: https://medium.com/@hanh.huynh/

---

**Original Thread by ZecHub (@ZecHub) ** 
https://x.com/ZecHub/status/1628498645627666432

---

*A chịkọtara peeji a site na isi mmalite Zero to Zero Knowledge maka wiki ZecHub.*
