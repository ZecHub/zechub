# Zero to Zero Knowledge: Usoro CryptoNote [CryptoNote Protocol]

**Usoro:** Zero to Zero Knowledge

Nke na-atọ ụtọ taa!  
Usoro **CryptoNote** na-eme ka Nzuzo on-chain [on-chain privacy] sie ike. Taa, anyị ga-amụta atụmatụ ya niile bụ isi na otú ọtụtụ ọrụ Nzuzo a ma ama siri tinye ya n'ọrụ.

![CryptoNote intro](/content-images/FrXr5P8WIAAvx36-88db0c8250.webp)

---

## Ndabere

E bipụtara akwụkwọ ọcha CryptoNote mbụ n'okpuru aha nzuzo **"Nicolas van Saberhagen"**.  

**Bytecoin** bụ cryptocurrency mbụ tinyere usoro a n'ọrụ. Ọrụ a kacha mara amara na-eji ya taa bụ **Monero (XMR)**. Ejikwala ya na TurtleCoin, Aeon, na ọtụtụ ndị ọzọ.

---

## Atụmatụ Isi nke CryptoNote

Usoro CryptoNote na-enye atụmatụ atọ bụ isi:

1. **Enweghị ike ịchọpụta na Ihe na-apughi ijikọ ọnụ [Untraceability and Unlinkability]** nke Azụmahia [transactions]
2. **Proof Ọrụ Nhata [Egalitarian Proof of Work]** (na-eguzogide ASIC) 
3. **Mwepụta na-agbanwe agbanwe [Dynamic emission]**

---

## 1. Enweghị ike ịchọpụta - signature Mgbanaka [Ring Signatures]

A na-enweta enweghị ike ịchọpụta n'ụzọ bụ isi site n'iji **signature Mgbanaka**.

Mgbe ị na-eziga Azụmahia, a na-agwakọta igodo ọha gị n'ezie na ọtụtụ igodo aghụghọ (nke a na-akpọ "mgbanaka") - ha niile nwere otu ọnụ ọgụgụ mkpụrụ ego. Nke a na-eme ka ọ sie ezigbo ike ịchọpụta onye zigara mkpụrụ ego ahụ n'ezie.

**Ogo mgbanaka [Ring size]** na-emetụta usoro enweghị aha [anonymity set] nke ukwuu. Mgbanaka buru ibu na-enye Nzuzo ka mma.

![Ring Signatures explanation](/content-images/FrXteGHXgAANE0F-f11593a0d9.webp)

**Ntụnyere na Zcash**:  
Usoro enweghị aha nke Zcash bụ ọnụ ọgụgụ Azụmahia niile a *metụrụla* n'ime pool nke e chebere echebe [shielded pool] nyere (nke buru ibu karịa ogo mgbanaka CryptoNote a na-ahụkarị).

---

## Ring CT (Azụmahia Nzuzo)

Ụdị **Ring CT** mere ka Nzuzo dị na mkpụrụ ego dabere na CryptoNote ka mma nke ukwuu.

Kama izochi naanị onye zitere ya, Ring CT na-**eme ka ọnụ ọgụgụ Azụmahia ghara ịdị doo anya** n'etiti onye zitere ya na onye natara ya.

![Ring CT diagram](/content-images/FrXuivgWYAAze7B-260071c1b3.webp)

Ọ na-eji:
- Kriptogafị Curve Elliptic
- commitment Pedersen
- Nzobe ederede Homomorphic [Homomorphic Encryption]

A na-eji **proof** egosi na ọnụ ọgụgụ ahụ karịrị 0 ma dị n'ime oke ziri ezi **na-enweghị ikpughe ụkpụrụ ndị ahụ n'ezie**.

**Adreesị Nzuzo [Stealth Addresses]** na-agbakwụnyekwa Adreesị akpa ego eji otu ugboro maka onye natara ya.

![Stealth Addresses + Proofs](/content-images/FrXut5aWAAMhuRb-f3ce8ea3fd.webp)

---

## 2. Proof Ọrụ Nhata (ePoW)

CryptoNote chọrọ ịmepụta usoro ịgwụputa ka nha karịa site n'iguzogide ASIC.

Ọ na-eji algọridim **CryptoNight** (ọrụ siri ike n'ihe gbasara ebe nchekwa). N'adịghị ka SHA256 nke Bitcoin, e mere CryptoNight ka ọ belata ọdịiche dị n'etiti ndị na-egwụputa CPU, GPU, na ASIC.

**Nzọụkwụ CryptoNight:**
1. Jiri data pseudorandom malite nnukwu mpaghara ebe nchekwa (scratchpad)
2. Mee ọtụtụ arụmọrụ ịgụ/ide na scratchpad
3. Hash scratchpad dum iji mepụta ụkpụrụ ikpeazụ

![CryptoNight mining](/content-images/FrXvNs3XsAA37LG-5779657f5c.webp)

(Rịba ama: Monero esila na CryptoNight pụọ gaa na algọridim ndị ọzọ.)

---

## 3. Mwepụta na-agbanwe agbanwe

Kama ihe omume halving mberede (dị ka Bitcoin), CryptoNote na-eji **ụgwọ ọrụ block nke na-ebelata nwayọọ nwayọọ**.

Nke a na-emepụta usoro mwepụta dị nnọọ nro karịa ka oge na-aga.

![Dynamic emission curve](/content-images/FrXv8wpXoAEjUxW-e2bbaebced.webp)

**Njikọ Zcash**:  
Ndị onye mmepụta Zcash atụlewo itinye usoro mwepụta dị nro karịa n'ọrụ n'ọdịnihu, ikekwe site na "Zcash Posterity Fund".

---

## Mmechi

CryptoNote egosila na ọ bụ usoro siri ike, nke a nwalere nke ọma, maka Nzuzo on-chain. Ọtụtụ ihe ọhụrụ ya emetụtala gburugburu ebe obibi mkpụrụ ego Nzuzo sara mbara.

Ụfọdụ ndị nyocha kwenyere na a pụrụ ijikọta atụmatụ CryptoNote na pool nke e chebere echebe zero-knowledge na-enweghị ntụkwasị obi n'ikpeazụ.

---

**Eriri Ozi Mbụ nke ZecHub (@ZecHub)**  
https://x.com/ZecHub/status/1636473585781948416

---

*A chịkọtara ibe a site na eriri ozi Zero to Zero Knowledge mbụ maka wiki ZecHub.*
