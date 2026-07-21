# Ihe Ọmụma Na-aga n'Ihu: Mnemonic Seed Phrases

**Series:** Zero to Zero Knowledge

Mnemonic mkpụrụ okwu na-akwado otu n'ime akụkụ kachasị mkpa nke cryptocurrency - ** njide onwe onye **. 
Taa, anyị ga-amụta etu esi emepụta mkpụrụ okwu ma jiri ya na akpa ego.

---

## Gịnị Bụ Mnemonic Seed Phrases?

A na-akọwa ahịrịokwu mgbake site na nkọwapụta ** BIP-39 **, ụdị ụdị okwu mgbake a na-ejikarị eme ihe taa.

Eke nkebi ahịrịokwu mgbake na-amalite site na ịmepụta ** randomness **. More entropy pụtara nchebe dị elu. ** 128 bits ** nke enttropy ka a na-ewere dị ka ihe zuru ezu maka ọtụtụ ndị ọrụ.

[Nkọwa okwu mkpụrụ](https://pbs.twimg.com/media/FooM3qWWACgrwzn.jpg)

Dabere na ogologo nke entropy mbụ, okwu mgbake ga-abụ **12 ruo 24 okwu ** ogologo.

---

## Nzọụkwụ n'Ihu: Otú E Si Emepụta Okwu Mbụ nke Nwere Okwu Iri na Abụọ

### 1. Mepụta Entropy
Anyị na-amalite site na ịmepụta 128 bits nke entropy.

### 2. Tinye Checksum
Anyị na-eji **SHA256** mee ka entropy ahụ. Bit ole na ole mbụ nke hash a na-aghọ nchọpụta nchọpụta. 
Nke a na-enye anyị akara mkpịsị aka pụrụ iche maka entropy anyị.

[Entropy + Checksum eserese](https://pbs.twimg.com/media/FooNoOEXgAAu-g6.png)

### 3. E kewara ya n'ime iberibe 11-bit
A na-ekewa 132 bit (128 entropy + 4 checksum) n'ime iberibe nke 11 bits.

### 4. Map gaa na Wordlist
A na-atụgharị usoro 11-bit ọ bụla ka ọ bụrụ ọnụọgụ iri (0-2047). 
Ndepụta okwu BIP-39 nwere kpọmkwem **2048 okwu** (Bekee, Spanish, Chinese, wdg).

A na-eji nọmba ndị a achọta okwu kwekọrọ na ya n'ihe ndepụta okwu.

![Ihe atụ nke mkpụrụokwu](https://pbs.twimg.com/media/FooN9rfXEBoQuU2.png)

** Nsonaazụ: ** Anyị nwere ugbu a, okwu nchekwa nke mmadụ nwere ike ịgụ 12 okwu!

---

## Site na Recovery Phrase -> Mkpụrụ -> Adreesị Ịkwụ Ụgwọ

N'iji okwu mgbake, obere akpa nwere ike ịmepụta igodo iji mepụta adreesị ịkwụ ụgwọ na akaụntụ obere akpa dị iche iche.

Igodo ndị e mepụtara bụ ** deterministic ** - otu ntinye ahụ na-emepụta otu mmepụta ahụ.

### Mkpụrụ Ndị A Na-amịpụta
A na-enweta mkpụrụ nke obere akpa site na ahịrịokwu mnemonic site na iji ** Key Derivation Function (KDF) **:

- Na **Bitcoin**: PBKDF2 
- Na ** Zcash **: Blake2b-256/512

Nke a na-emepụta mkpụrụ nke **64-byte (512-bit) **.

[Mkpụrụ na isi igodo](https://pbs.twimg.com/media/FooOuumXEAgcBm1.jpg)

### Igodo ndị bụ isi
A na-ekewa mkpụrụ ahụ n'ime usoro abụọ 32-byte:
- **Master Spending Key** (Mkpịsị ugodi mmefu ego)
- **Master Chain Code**

A na-eji ndị a na ** Hierarchical Deterministic (HD) Wallets ** maka isi nwa.

---

## Njirimara Zcash Pụrụ Iche (ZIP-32)

Na Zcash, ** ikike nlele ** ma ọ bụ ** ikike mmefu ** nwere ike inyefe onwe ya maka sub-osisi na-enweghị imebi isi mkpụrụ.

**ZIP-32** na-akọwa ụkpụrụ nke isi ihe dị iche iche na-agbanwe agbanwe maka atụmatụ nzuzo nke Zcash.

Site na ** Expanded Spending Key ** anyị na-enweta:
- Full Viewing Key
- Incoming Viewing Key
- Set nke adreesị ịkwụ ụgwọ

Usoro dị iche iche na-emepụta adreesị mpụga kwesịrị ekwesị maka inye ndị na-ezipụ gafee ọdọ mmiri ndị e chebere (Sapling & Orchard).

![Zcash isi mmepụta usoro nhazi](https://pbs.twimg.com/media/FooPKd4XEBUQhJ6.jpg)

Zcash na-akwadokwa ** adreesị dị n'ime ** maka ọrụ obere akpa dịka Auto-Shielding.

---

## Akụrụngwa

- [ZIP-32: Shielded Hierarchical Deterministic Wallets] [Akwụkwọ ego ndị a na-eji eme ihe n'ụzọ ziri ezi]](https://zips.z.cash/zip-0032)  
- [Zcash Protocol nkọwapụta (NU5)](https://zips.z.cash/protocol/protocol.pdf)  
- [Nchịkọta nke obere akpa ego echedoro site na ndabara]](https://zechub.wiki)

---

**Original Thread by ZecHub (@ZecHub) ** 
https://x.com/ZecHub/status/1624125037945946145

---

*A chịkọtara peeji a site na isi mmalite Zero to Zero Knowledge maka wiki ZecHub.*
