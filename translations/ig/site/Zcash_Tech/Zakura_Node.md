<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zakura_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zakura Node (Nọmba nke Zaku)

> 🇧🇷 [Versiọn na Portuguese](/zechubglobal/zcashbrasil/zcashtech/zakura)

Zakura bụ nnwere onwe, ntinye ọnụ zuru oke maka Zcash. E wuru ya na ọkwa dị elu. A ga-esi n'aka ndị ọrụ zụọ ahịa azụmaahịa nke ụlọ akụ ahụ wee mepụta otu ụzọ abụọ iji nweta ego ha chọrọ site na usoro a: [Zebra](Zebra_Full_Node.md) ma mepụtara site na mmekorita n'etiti ** Valar Group** na ** Project Tachyon, Zakura na-enye ngwa ngwa ngwa ọsọ ọsọ, nchịkọta nke ala, yana nkwekọrịta ndakọrịta maka ihe ochie `zcashd` a tọhapụrụ mbipute 1.0.0 na July 15, 2026.

---

## TL;DR

- Zakura bụ ** nkwekọrịta-dakọtara Zcash zuru ọnụ**  ihe ọzọ na Zebra na zcashd, nke sitere na Zebras.
- Njikọ blockchain dị ihe dịka ** 5x ngwa ngwa karịa Zebra; snapshot bootstrapping na-agwụ agwụ n'ime **n'okpuru 2 nkeji**.
- ** Native block pruning** na-enye ndị ọrụ ohere ịgba ọsọ zuru oke site n'iji obere diski dị ntakịrị (~ 11 GB kpochapụla vs. 300 GB maka ọnụ ọgụgụ Zebra dum).
- A **zcashd RPC ndakọrịta mode** na-ekwe ka wallets dị ugbu a na njikọta rụọ ọrụ n'enweghị mgbanwe.
- ** Nnwale P2P njem ụgbọ mmiri** (nkwarụ site na ndabara) ezubere iche sub-500ms ngọngọ mgbasa ozi na DoS-eguzogide gossip.
- Ọ dabara na ** Ironwood (NU6.3)**, nkwalite netwọk Zcash arụ ọrụ n'etiti 2026.
- Onye isi ya bụ Sean Bowe (onye guzobere Zcash, Project Tachyon) na Dev Ojha (Valar Group).

---

## Gịnị bụ Zakura?

Zakura bụ Zcash zuru ọnụ e mere site n'ala ruo na-mmepụta njikere na ọnụ ọgụgụ. Mgbe ọ òkè nkwekọrịta kwekọrọ ekwekọ na Zebra  pụtara ya kwupụtara ma soro otu iwu protocol nke Zcash  Zakura ewebata mmezi injinịa dị mkpa iji belata ihe mgbochi maka ịgba ọsọ Zcash full node .

Ihe oru ngo a bu ihe ndi mmadu na-eme n'etiti **Project Tachyon** (nke Sean Bowe, otu onye nke Zcash si cryptographic engineers) na **Valar Group** (onye Dev Ojha). Ha niile gbakọrọ aka mee ka usoro iwu Zcash dị mma. Zakura bụ ebe e ji eme nchọpụta maka ọrụ ahụ.

---

## Ihe Ndị Bụ́ Isi E Ji Mara Ya

### 5x Ngwa ngwa Chain Synchronization

Zakura na-enweta ihe dịka 5x ngwa ngwa blockchain synchronization tụnyere Zebra. Nke a mere ka ọ dịkwuo mfe maka ndị ọrụ chọrọ ịgbanye ọnụ ọsọ ma ọ bụ gbakee site n'oge nkwụsịtụ.

### Ntinye aka na Bootstrapping

Zakura na-ebipụta ihe osise nke usoro agbụ a haziri ahazi nke belatara oge nhazi mbụ:

◯ Ụzọ e si ebudata ihe ndị dị na kọmputa ❑ Oge ❖ Ịgba ígwè .
|-----------------|------|
 Foto dị na Archive. ~Minute 37.
❖ Foto e sere n'ihe na-erughị nkeji abụọ.
 Zebra (nkwekọrịta zuru oke) ~20 awa.

Nchịkọta ndị a na-eme bụ ihe dịka ** 11 GB, nke na - eme ka ọ bụrụ * 680x ngwa ngwa karịa** nkwụsịtụ ọnụ ma e jiri ya tụnyere syncing site n'ọmụma.

### Ịkụcha osisi ndị dị n'ime ala ahụ

Zakura supports configurable block pruning, allowing node operators to define how much chain history to retain. This makes it practical to run a full node on hardware with limited storage — useful for validators, developers, and infrastructure providers who do not need the full historical chain.

### zcashd RPC Compatibility Mode (Ụdị ndakọrịta)

Zakura gụnyere ọnọdụ ndakọrịta nke na-emegharị ihe nketa ahụ `zcashd` JSON-RPC interface. Akpa ego dị ugbu a, mgbanwe na njikọta nke dabere na ya `zcashd` RPCs nwere ike ịgbanwee gaa na Zakura n'achọghị mgbanwe koodu.

### Nnwale P2P Transport Layer

Zakura ụgbọ mmiri nwere ọgbọ na-esote ọgbọ nke ndị otu ibe, ugbu a ** gbanyụrụ site na ndabara. Mgbe enyere ya aka, ọ lekwasịrị anya:

- Nkwupụta mgbasa nke kachasị njọ na-agbasa n'ofe netwọkụ dị ala karịa 500ms.
- Mempool nchịkọta maka ihe oru oma azụmahịa relays
- DoS-eguzogide mkpọtụ usoro iji melite ike netwọkụ

Nke a na-anọchite anya ihe ngosi nke mmezi Zcash n'ọdịnihu dị ka netwọkụ e mepụtara n'okpuru Project Tachyon.

### Ironwood (NU6.3) dakọtara na ya.

Zakura dakọtara nke ọma na nkwalite netwọk Ironwood (NU6.3), arụ ọrụ na Zcash mainnet n'etiti 2026.

---

## Otu Zakura si emekọrịta na ndị ọzọ Zcash Nodes.

| | zcashd | Zebra | Zakura |
|--|--------|-------|--------|
◯ Asụsụ ❖ C++ (nke si na Bitcoin) ▸ Rust ❑ Rust (onye si na Zebra) ❖ E nwere otu asụsụ a kpọrọ Java.
 Ọnọdụ: Deprecated Active. Akara (v1.0.0, July 2026)
 Nhazi ọsọ. Baseline: 1x 5x ngwa ngwa karị.
◯ Ịkụcha osisi ❑ Mba ▸ Ee ❖ Ọ bụrụ na ị chọrọ ka a kpọọ gị aha, biko gwa m.
zcashd RPC Compat. Native. Partial. Ee (mode kọmpụta)
 Nchịkọta mmalite nke Snapshot No.  Ee (<2 min)
 P2P nnwale. Mba  Ee (ịbanye)  Ọ dịghị, ọ bụghị ya na-eme ka ndị mmadụ nwee ike ịnakwere ozi gị ma ha chọọ.

---

## Ịmalite Ime Ihe Ndị A Chọrọ

Nhọrọ nbudata, foto na nhazi akwụkwọ dị na:

- **Nbudata & Nhazi ndu:** [zakura.com/download (Nke a bụ ihe e dere na ya)](https://zakura.com/download/)
- ** Ihe osise nke agbụ ígwè:** [zakura.com/snapshots ihe onyonyo](https://zakura.com/snapshots/)
- **Koodu isi:** [github.com/zakura-core/zakura](https://github.com/zakura-core/zakura)

---

## Peeji ndị metụtara ya

- [Zebra Full Node (Nọmba zuru ezu)](Zebra_Full_Node.md)  elu Zcash zuru ọnụ Zakura e forked si
- [Zaino Indexer (Nkọwapụta)](Zaino.md)  a Rust dabeere na indexer dakọtara na Zebra na Zakura
- [Nọmba zuru ezu](Full_Nodes.md)  nlele nke nhọrọ Zcash zuru oke.
- [Lightwallet Nodes (Nọmba nke obere akpa ego)](Lightwallet_Nodes.md)  ndị ahịa dị mfe.

## Akụnụba

- [Na-ewebata ọkwa Zakura ](https://zakura.com/announcements/introducing-zakura/)
- [Zakura GitHub](https://github.com/zakura-core/zakura)
- [Ebe nrụọrụ weebụ Zakura](https://zakura.com/)
- [Zakura na X/Twitter](https://x.com/ZakuraZcash)
- [Ihe oru Tachyon](https://electriccoin.co/blog/)
