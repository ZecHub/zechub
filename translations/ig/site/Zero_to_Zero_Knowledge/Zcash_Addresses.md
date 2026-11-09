# Zero to Zero Knowledge: Azụmahia Oha vs Nke e chebere echebe na Adreesị akpa ego e jikọtara ọnụ

**Usoro:** Zero to Zero Knowledge

Ọ bụrụ na ị na-amụta banyere Zcash na nke mbụ, ị ga-achọpụta na e nwere ụdị Azụmahia (transaction) abụọ dị: **Oha (Transparent)** na **nke e chebere echebe (Shielded)**.  

Taa, anyị ga-amụta gbasara ha ma kpuchie otu n'ime atụmatụ ọhụrụ dị na gburugburu #Zcash, **Adreesị akpa ego e jikọtara ọnụ (Unified Addresses)**.

---

## Azụmahia Oha vs Nke e chebere echebe

- **Azụmahia Oha** na-eji **t-addresses** (nke Base58 koodu kpuchiri). Ihe niile pụtara n'ihu ọha — dịka Bitcoin.  
- **Azụmahia nke e chebere echebe** na-eji adreesị e koodu kpuchiri maka pool Sapling ma ọ bụ Orchard. Ndị a na-ezo onye zitere ya, onye natara ya, na ọnụ ego site n'iji zero-knowledge proofs.

**Azụmahia nke e chebere echebe** na-ezo aka n'Azụmahia ọ bụla nwere adreesị e koodu kpuchiri maka pool Sapling/Orchard.

![Transparent vs Shielded intro](/content-images/FpmW00HWIAIZpQD-a244cfd85d.webp)

**Adreesị akpa ego e jikọtara ọnụ (UAs)** ka e mere iji **jikọta ọnụ** Azụmahia nke e chebere echebe ma ọ bụ nke Oha n'ime otu adreesị.

---

## Ụdị Adreesị akpa ego na Zcash

E nwere ụdị Adreesị akpa ego 3 a na-eji:

1. **(T) Oha** – Base58  
2. **(Z) Sapling** – Bech32  
3. **(UA) Adreesị akpa ego e jikọtara ọnụ** – Bech32m  

Ọnụọgụ mkpụrụedemede (ya mere nha koodu QR) na-abawanye n'ụdị nke ọ bụla.

![Address types comparison](/content-images/FpmXe5bXsAEFeLY-704048927f.webp)

![QR code size comparison](/content-images/FpmXmDwXoAIWxov-dfc8346ffc.webp)

---

## Otu Adreesị akpa ego e jikọtara ọnụ Si Arụ Ọrụ

A na-ekodu adreesị na igodo dị ka usoro byte (**Raw Encoding**).  
**Receiver Encoding** gụnyere ozi niile dị mkpa iji bufere akụ site n'iji otu protocol kpọmkwem.

Raw encoding nke Adreesị akpa ego e jikọtara ọnụ bụ ngwakọta encoding (typecode, length, addr) nke ndị nnata:

- UA: `0x03`  
- Sapling: `0x02`  
- Oha: `0x01`  

**Dị mkpa**: A ghaghị inwe **opekata mpe otu adreesị Kwụọ ụhwọ (payment) nke e chebere echebe** n'ime UA ọ bụla. (A naghị akwado adreesị Sprout ọzọ mgbe nkwalite Canopy gasịrị.)

![UA encoding structure](/content-images/FpmYW1ZXgAAvALT-70903e29c6.webp)

Nkọwapụta zuru ezu: **[ZIP-316: Adreesị akpa ego e jikọtara ọnụ](https://zips.z.cash/zip-0316)**

---

## Uru Adreesị akpa ego e jikọtara ọnụ Bara

- **Ọ dịrị exchange mfe** — Ha nwere ike ugbu a ịkwado nkwụnye ego/mwepụ ego nke e chebere echebe n'enweghị ihe ize ndụ karịa.  
- **Nke a kwadebere maka ọdịnihu** — Enwere ike ịgbakwunye pool ọhụrụ nke e chebere echebe na-enweghị imebi e-akpa ego (wallet).  
- **Nke e chebere echebe na ndabara** — UA ọ bụla nwere opekata mpe otu adreesị nke e chebere echebe, yabụ Nzuzo (privacy) na-adị mgbe niile.

Nke a bụ mgbanwe bụ isi nke na-enyelarị ọtụtụ ZEC aka ịbanye na pool nke e chebere echebe.

---

## Azụmahia Orchard na Omume

Orchard webatara echiche ọhụrụ a kpọrọ **Omume (Actions)**:

- Ha na-ebelata mpụta metadata site n'iji **otu anchor** maka Omume niile dị n'Azụmahia.  
- Ha na-ejikọta ubi nke (V4) Spend + Output n'ime otu value commitment.  
- Nke a na-eme ka o kwe omume ịkwalite arụmọrụ nke usoro proof Halo2.

Daira na-akọwa ọnọdụ Anchor (zcon3):

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/f6UToqiIdeY"
    title="Zcon3"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

---

## Ntụle Uru na Nzuzo

N'ọnọdụ ụfọdụ (dịka ọmụmaatụ, Azụmahia n'etiti pool), onye na-ekiri nọ n'èzí nwere ike ịhụ ọnụ ego. Otú ọ dị, `valueBalanceSapling` na `valueBalanceOrchard` na-eji **homomorphic commitments** gosi mkpokọta ZEC dị na pool nke e chebere echebe ma gbochie nṅomi ego.

Gụkwuo: [ZIP 209: Machibido Ntụle Uru Pool Chain Nke Anọghị n'Udi](https://zips.z.cash/zip-0209)

---

## Mmelite N'ọdịnihu

Otu ECC na-arụ ọrụ na ụzọ RPC ọhụrụ na `zcashd` (nke ga-anọchi `z_sendmany`) nke ga-eme ka ndị ọrụ nwee ike ịhụ tupu oge eruo ma nabata/jụ Azụmahia a tụrụ aro dabere na njirimara Nzuzo ya.

---

## Nkwado

Eriri okwu a na mbụ rụtụrụ aka na **YWallet**, maka atụmatụ Azụmahia ọ gosiri tupu ịpịa zitere. A naghị edozi YWallet ọzọ, a gaghịkwa emelite ya maka Ironwood, yabụ o nweghịzi ike iso chain. Họrọ e-akpa ego a na-elekọta site na ibe [Wallets](https://zechub.wiki/wallets) kama, ma họrọ nke na-agwa gị ihe Azụmahia ga-ekpughe tupu e ziga ya.

Ederede magburu onwe ya gbasara Nzuzo Azụmahia: https://medium.com/@hanh.huynh/

---

**Eriri okwu mbụ sitere n'aka ZecHub (@ZecHub)**  
https://x.com/ZecHub/status/1628498645627666432

---

*E jikọtara ibe a site na eriri okwu mbụ Zero to Zero Knowledge maka wiki ZecHub.*
