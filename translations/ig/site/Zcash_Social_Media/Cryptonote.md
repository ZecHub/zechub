# Ihe Ọmụma Na-aga n'Ihu: Usoro CryptoNote

**Series:** Zero to Zero Knowledge

Taa bụ ụbọchị na-adọrọ mmasị! 
The **CryptoNote** protocol enables strong on-chain privacy. Today we learn all of its key features and how it has been implemented by several notable privacy projects.

[CryptoNote mmeghe](https://pbs.twimg.com/media/FrXr5P8WIAAvx36.jpg)

---

## Ihe Ndị E Merela

E bipụtara akwụkwọ ọcha CryptoNote mbụ n'okpuru aha nzuzo **"Nicolas van Saberhagen"**. 

**Bytecoin** was the first cryptocurrency to implement the protocol. The most well-known project using it today is **Monero (XMR)**. It has also been used in TurtleCoin, Aeon, and several others.

---

## Njirimara nke CryptoNote

Usoro CryptoNote na-enye isi ihe atọ:

1. ** Untraceability na Unlinkablity ** nke azụmahịa
2. **Egalitarian Proof of Work** (ASIC resistant) 
3. ** Dynamic emission** (Mgbasa ozi na-agbanwe agbanwe)

---

## 1. Untraceability - Mbinye aka mgbaaka

Untraceability na-enweta isi site na iji ** Ring Signatures **.

When sending a transaction, your real public key is mixed with several decoy keys (the "ring") - all containing the same amount of coins. This makes it extremely difficult to determine who actually sent the coins.

**Ogo mgbanaka** na-emetụta ihe a na-akpọghị aha. Mgbaaka buru ibu na-enye nzuzo ka mma.

[Mgbaaka Signatures nkọwa]](https://pbs.twimg.com/media/FrXteGHXgAANE0F.png)

**Nkọwa na Zcash**: 
Zcash's anonymity set bụ ngụkọta ọnụ ọgụgụ nke azụmahịa * mgbe ọ bụla * emere na ọdọ mmiri echedoro (nke buru ibu karịa nha mgbanaka CryptoNote).

---

## Mgbanaka CT (Mmekọrịta Nzuzo)

Ụdị ** Ring CT ** emeela ka nzuzo dịkwuo mma na mkpụrụ ego CryptoNote.

Kama izochi onye zitere ya, Ring CT na-ekpuchikwa ego azụmahịa dị n'etiti onye na-ezigara ya na onye natara ya.

[Ihe osise CT nke mgbanaka](https://pbs.twimg.com/media/FrXuivgWYAAze7B.png)

Ọ na-eji:
- Elliptic Curve Cryptography
- Pedersen nkwa
- Nkọwapụta Homomorphic

**A na-eji ihe akaebe** egosi na ego ahụ karịrị 0 ma dị n'ime oke ziri ezi **na-enweghị igosipụta ụkpụrụ ndị dị adị**.

** Stealth Addresses ** na-agbakwunye adreesị eji otu oge maka onye nnata.

[Adreesị Stealth + Ihe Akaebe](https://pbs.twimg.com/media/FrXut5aWAAMhuRb.jpg)

---

## 2. Ihe akaebe nke ọrụ (ePoW)

CryptoNote na-achọ imepụta usoro igwupụta akụ ziri ezi site na iguzogide ASICs.

It uses the **CryptoNight** algorithm (a memory-hard function). Unlike Bitcoin’s SHA256, CryptoNight is designed to close the gap between CPU, GPU, and ASIC miners.

** Nzọụkwụ CryptoNight: **
1. Na-amalite nnukwu ebe nchekwa (scratchpad) na data pseudorandom
2. Na-eme ọtụtụ ọgụgụ / dee arụmọrụ na scratchpad
3. Hash dum scratchpad iji mepụta uru ikpeazụ

[Mgbapụta CryptoNight]](https://pbs.twimg.com/media/FrXvNs3XsAA37LG.jpg)

(Mara: Monero esila na CryptoNight pụọ gaa na algọridim ndị ọzọ.)

---

## 3. Mgbasa Ozi Na-agbanwe Agbanwe

Kama ịbelata ihe omume na mberede (dịka Bitcoin), CryptoNote na-eji ** ụgwọ ọrụ ngọngọ na-ebelata nwayọ **.

Nke a na-eme ka usoro mmepụta ihe dị nro karịa oge.

[Dynamic emission curve]](https://pbs.twimg.com/media/FrXv8wpXoAEjUxW.png)

** Njikọ Zcash **: 
Ndị mmepe Zcash atụlewo itinye usoro nkwụsị nke ọma n'ọdịnihu, ikekwe site na "Zcash Posterity Fund".

---

## Mmechi

CryptoNote egosila na ọ bụ ụzọ siri ike na nke a nwalere agha maka nzuzo na-agbụ. Ọtụtụ n'ime ihe ọhụrụ ya emetụtala usoro okike ego nzuzo sara mbara.

Some researchers believe CryptoNote features could eventually be combined with trustless zero-knowledge shielded pools.

---

**Original Thread by ZecHub (@ZecHub) ** 
https://x.com/ZecHub/status/1636473585781948416

---

*A chịkọtara peeji a site na isi mmalite Zero to Zero Knowledge maka wiki ZecHub.*
