# Ihe Ọmụma Zero ruo Zero: Transparent vs Chebed Azụmahịa & Njikota Ọnụ

**Usoro:** Ihe ọmụma efu ruo efu

Ọ bụrụ na ị na-amụta maka Zcash maka oge mbụ ị ga-achọpụta na e nwere ụdị azụmahịa abụọ dị: **Transparent** na **Shielded**. 

Taa, anyị na-amụta maka ha ma na-ekpuchi otu n'ime atụmatụ ọhụrụ dị na usoro #Zcash, **Adreesị Ndị Dị n'Otu**.

---

## Azụmahịa ndị a na-ahụ anya na ndị a na-echebe

- **Azụmahịa doro anya** na-eji **adreesị t** (E tinyere koodu Base58). Ihe niile na-apụta ìhè n'ihu ọha - dịka Bitcoin. 
- **Azụmahịa echekwara** na-eji adreesị e dere maka ọdọ mmiri **Sapling** ma ọ bụ **Orchard**. Ndị a na-ezochi onye zitere, onye nnata, na ego site na iji ihe akaebe na-enweghị ihe ọmụma.

**Azụmahịa echekwara** na-ezo aka na azụmahịa ọ bụla nwere adreesị e tinyere koodu maka ọdọ mmiri Sapling/Orchard.

![Transparent vs Shielded intro](/content-images/FpmW00HWIAIZpQD-a244cfd85d.webp)

**Emebere Adreesị Ndị Dị n'Otu (UA)** iji **jikọta** azụmahịa ndị a na-echebe ma ọ bụ ndị doro anya n'ime otu adreesị.

---

## Ụdị Adreesị na Zcash

E nwere ụdị adreesị atọ a na-eji:

1. **(T) Ihe doro anya** – Isi ala 58 
2. **(Z) Sapling** – Bech32 
3. **(UA) Unified Address** – Bech32m 

Ọnụọgụ mkpụrụedemede (ya mere nha koodu QR) na-abawanye ka ụdị ọ bụla si dị.

![Address types comparison](/content-images/FpmXe5bXsAEFeLY-704048927f.webp)

![QR code size comparison](/content-images/FpmXmDwXoAIWxov-dfc8346ffc.webp)

---

## Otu Adreesị Ndị Dị n'Otu Si Arụ Ọrụ

A na-etinye adreesị na igodo dị ka usoro byte (**Encoding Raw**). 
Ndekọ ihe nnata **Ndekọ ihe nnata** gụnyere ozi niile dị mkpa iji nyefee ihe onwunwe site na iji usoro akọwapụtara.

Usoro nhazi nke Unified Address bụ njikọta nke koodu (ụdị koodu, ogologo, addr) nke ndị nnata:

- UA: `0x03`  
- Sapling: `0x02`  
- Ihe doro anya: `0x01`  

**Dị Mkpa**: A ga-enwerịrị **opekata mpe otu adreesị ịkwụ ụgwọ echekwara** na UA ọ bụla. (Sprout ọzọ mgbe emelitere Canopy.)

![UA encoding structure](/content-images/FpmYW1ZXgAAvALT-70903e29c6.webp)

Nkọwapụta zuru oke: **[ZIP-316: Adreesị Ndị E Jikọtara Ọnụ](https://zips.z.cash/zip-0316)**

---

## Uru nke Adreesị Ndị Dị n'Otu

- **Ọ dị mfe maka mgbanwe ego** - Ha nwere ike ịkwado nkwụnye ego/mwepụ ego echekwara nke ọma. 
- **Agaghị echekwa ọdịnihu** - Enwere ike itinye ọdọ mmiri ndị e ji ihe nchebe kpuchie ọhụrụ n'emebighị obere akpa ego. 
- **Echebere site na ndabara** - UA ọ bụla nwere opekata mpe otu adreesị echekwara, yabụ nzuzo dị mgbe niile.

Nke a bụ mgbanwe dị mkpa nke na-enyere ọtụtụ ZEC aka ịbanye n'ime ọdọ mmiri a na-echebe.

---

## Azụmahịa na Ihe Omume Orchard

Orchard webatara echiche ọhụrụ akpọrọ **Ihe Omume**:

- Ha na-ebelata ntapu nke metadata site na iji **otu anchor** maka ihe niile emere na azụmahịa. 
- Ha na-ejikọta ubi nke (V4) Mmefu + Mmepụta n'ime nkwa uru otu. 
- Nke a na-eme ka sistemụ ihe akaebe Halo2 dịkwuo mma.

Daira kọwara ọnọdụ Anchor (zcon3):

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

## Nhazi Uru na Nzuzo

N'ọnọdụ ụfọdụ (dịka azụmahịa ndị a na-eme n'etiti ọdọ mmiri) ego nwere ike ịpụta ìhè nye onye na-ahụ ihe na-eme n'èzí. Agbanyeghị, `valueBalanceSapling` na `valueBalanceOrchard` jiri **nkwa ndị na-abụghị nke otu ihe** gosi na ZEC zuru oke dị n'ime ọdọ mmiri ndị a na-echebe ma gbochie ire ere.

GỤKWUO: [ZIP 209: Machibido Nhazi Uru Agbụ Azụ nke Na-abụghị nke Oke](https://zips.z.cash/zip-0209)

---

## Mmezi n'ọdịnihu

Ndị otu ECC na-arụ ọrụ na usoro RPC ọhụrụ na `zcashd` (na-anọchi anya `z_sendmany`) nke ga-enye ndị ọrụ ohere ịlele ma nabata/jụ azụmahịa a tụrụ aro dabere na njirimara nzuzo ya.

---

## Nkwanye

Eriri a pụtara na **YWallet**, maka atụmatụ azụmahịa o gosiri tupu ị pịa izipu. A naghịzi elekọta YWallet, a gaghịkwa emelite ya maka Ironwood, yabụ na ọ gaghịzi eso usoro a. Họrọ obere akpa ego echekwara site na [Obere akpa](https://zechub.wiki/wallets) kama, họrọ nke ga-agwa gị ihe azụmahịa ga-ekpughe tupu ọ pụọ.

Edemede dị mma gbasara nzuzo azụmahịa: https://medium.com/@hanh.huynh/

---

**Edemede mbụ nke ZecHub (@ZecHub)** 
https://x.com/ZecHub/status/1628498645627666432

---

*E si na eriri Zero ruo Zero Knowledge nke mbụ chịkọta ibe a maka wiki ZecHub.*
