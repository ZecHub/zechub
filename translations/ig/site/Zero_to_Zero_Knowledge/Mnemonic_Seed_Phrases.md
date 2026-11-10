# Zero to Zero Knowledge: Mkpuru mgbake [Mnemonic Seed Phrases]

**Usoro:** Zero to Zero Knowledge

Mkpuru mgbake na-akwado otu n'ime akụkụ kachasị mkpa nke cryptocurrency — **nlekọta onwe [self-custody]**.  
Taa, anyị ga-amụta otú e si emepụta ma jiri Mkpuru mgbake n'ime e-akpa ego [wallets].

---

## Gịnị bụ Mkpuru mgbake?

A kọwara ahịrịokwu mgbake site na nkọwapụta **BIP-39**, ụdị ahịrịokwu mgbake a na-ejikarị taa.

Ike nke ịmepụta ahịrịokwu mgbake na-amalite site n'ịmepụta **enweghị usoro [randomness]**. Entropy ka ukwuu pụtara nchekwa ka elu. A na-ewere **128 bits** nke entropy dịka nke zuru ọtụtụ ndị ọrụ.

![Seed phrase concept](/content-images/FooM3qWWACgrwzn-f222c4081f.webp)

Dabere n'ogologo entropy mbụ, ahịrịokwu mgbake ahụ ga-enwe **okwu 12 ruo 24**.

---

## Nzọụkwụ site na Nzọụkwụ: Otu E Si Emepụta Mkpuru mgbake Okwu 12

### 1. Mepụta Entropy
Anyị na-amalite site n'ịmepụta **128 bits** nke entropy.

### 2. Tinye Checksum
Anyị na-eji **SHA256** hash entropy ahụ. Bits ole na ole mbụ nke hash a na-aghọ checksum.  
Nke a na-enye anyị akara mkpịsị aka pụrụ iche maka entropy anyị.

![Entropy + Checksum diagram](/content-images/FooNoOEXgAAu-g6-613238fa7e.webp)

### 3. Kewaa n'ime akụkụ 11-bit
A na-ekewa ngụkọta bits 132 (entropy 128 + checksum 4) n'ime akụkụ nke bits 11.

### 4. Jikọta na Ndepụta Okwu
A na-atụgharị usoro 11-bit ọ bụla ka ọ bụrụ nọmba decimal (0-2047).  
Ndepụta okwu BIP-39 nwere kpọmkwem **okwu 2048** (Bekee, Spanish, Chinese, wdg.).

A na-eji nọmba ndị a chọta okwu kwekọrọ na ya n'ime ndepụta okwu ahụ.

![Word mapping example](/content-images/FooN9rfXEBoQuU2-d11331fc0a.webp)

**Nsonaazụ:** Anyị nwere ugbu a ahịrịokwu mgbake okwu 12 echekwara nke mmadụ nwere ike ịgụ!

---

## Site n'Ahịrịokwu Mgbake -> Seed -> Adreesị akpa ego maka Kwụọ ụhwọ [Payment Addresses]

Site n'iji ahịrịokwu mgbake, e-akpa ego nwere ike ịmepụta igodo iji mepụta Adreesị akpa ego maka Kwụọ ụhwọ na akaụntụ e-akpa ego dị iche iche.

Igodo ndị a na-emepụta bụ **deterministic [deterministic]** — ntinye otu mgbe niile na-emepụta mmepụta otu.

### Ịmepụta Seed
A na-enweta seed e-akpa ego site n'ahịrịokwu mnemonic site n'iji **Key Derivation Function (KDF)**:

- Na **Bitcoin**: PBKDF2  
- Na **Zcash**: Blake2b-256/512

Nke a na-emepụta seed **64-byte (512-bit)**.

![Seed to master keys](/content-images/FooOuumXEAgcBm1-dc7c66b84a.webp)

### Igodo Nna-ukwu
A na-ekewa seed ahụ n'ime usoro abụọ nke 32-byte:
- **Igodo ego Nna-ukwu [Master Spending Key]**
- **Master Chain Code**

A na-eji ndị a n'ime **Hierarchical Deterministic (HD) Wallets** maka mmepụta igodo ụmụ.

---

## Njirimara Pụrụ Iche nke Zcash (ZIP-32)

Na Zcash, enwere ike inyefe **ikike nlele [viewing authority]** ma ọ bụ **ikike mmefu [spending authority]** n'adabereghị onwe ha maka obere osisi, na-enweghị imebi master seed.

**ZIP-32** na-akọwa ụkpụrụ mmepụta igodo hierarchical deterministic e gbanwere maka atụmatụ Nzuzo nke Zcash.

Site na **Expanded Spending Key**, anyị na-enweta:
- Full Viewing Key
- Incoming Viewing Key
- Nhazi Adreesị akpa ego maka Kwụọ ụhwọ

Usoro mmepụta dị iche iche na-emepụta adreesị mpụga dabara maka inye ndị zitere ego n'ofe pool nke e chebere echebe [shielded pools] (Sapling & Orchard).

![Zcash key derivation hierarchy](/content-images/FooPKd4XEBUQhJ6-af133c01bf.webp)

Zcash na-akwado kwa **adreesị ime [internal addresses]** maka ọrụ e-akpa ego dịka Auto-Shielding.

---

## Akụrụngwa

- [ZIP-32: E-akpa ego Hierarchical Deterministic nke e chebere echebe](https://zips.z.cash/zip-0032)  
- [Nkọwapụta Protocol Zcash (NU5)](https://zips.z.cash/protocol/protocol.pdf)  
- [Nchịkọta e-akpa ego shielded-by-default](https://zechub.wiki)

---

**Thread mbụ sitere na ZecHub (@ZecHub)**  
https://x.com/ZecHub/status/1624125037945946145

---

*E chikọtara ibe a site na thread Zero to Zero Knowledge mbụ maka wiki ZecHub.*
