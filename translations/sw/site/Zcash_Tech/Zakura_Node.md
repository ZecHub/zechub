<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zakura_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zakura Node (Kituo cha Zakura)

> 🇧🇷 [Versión en Português Tafsiri ya Kihispania](/zechubglobal/zcashbrasil/zcashtech/zakura)

Zakura ni bure, wazi chanzo kamili node utekelezaji kwa Zcash, kujengwa kwa ajili ya kiwango. Forked kutoka [Zebra](Zebra_Full_Node.md) na maendeleo kupitia ushirikiano kati ya ** Valar Group** na ** Mradi Tachyon, Zakura hutoa kasi sana synchronization, asili block kupogoa, na safu utangamano kwa urithi wa `zcashd` Toleo 1.0.0 lilitoka Julai 15, 2026.

---

## TL;DR

- Zakura ni ** makubaliano-ambayo yanaendana Zcash full node**  mbadala ya Zebra na zcashd, forked kutoka kwa Zebra.
- blockchain usawazishaji ni takriban ** 5x kasi zaidi kuliko Zebra**; snapshot bootstrapping kukamilika katika ** chini ya dakika 2 **.
- ** Native block kupogoa** inaruhusu waendeshaji kuendesha node kamili na nafasi ya chini sana disk (~ 11 GB pruned snapshot dhidi 300 GB kwa full Zebra Node).
- A ** zcashd RPC utangamano mode** inaruhusu mifuko ya fedha zilizopo na ushirikiano kazi bila marekebisho.
- ** majaribio P2P usafiri safu** (kuzimwa kwa default) malengo chini ya 500ms kuzuia kuenea na DoS- sugu uvumi.
- Inapatana na ** Ironwood (NU6.3)**, uboreshaji wa mtandao wa Zcash ulioamilishwa katikati ya 2026.
- Kuongozwa na Sean Bowe (Zcash mwanzilishi, Mradi Tachyon) na Dev Ojha (Valar Group).

---

## Zakura ni nini?

Zakura is a Zcash full node designed from the ground up to be production-ready at scale. While it shares consensus compatibility with Zebra — meaning it validates and follows the same Zcash protocol rules — Zakura introduces significant engineering improvements aimed at lowering the barrier to running a Zcash full node.

The project is a joint effort between **Project Tachyon** (led by Sean Bowe, one of Zcash's original cryptographic engineers) and **Valar Group** (led by Dev Ojha). Together they focus on next-generation Zcash protocol improvements, and Zakura serves as the reference node for that work.

---

## Sifa Muhimu za Mfano wa Yesu

### 5 × kasi mlolongo wa usawazishaji

Zakura hufikia karibu 5x kasi blockchain synchronization ikilinganishwa na Zebra. Hii inafanya kwa kiasi kikubwa zaidi ya vitendo kwa waendeshaji ambao wanahitaji spin up node haraka au kupona kutoka downtime.

### Snapshot Bootstrapping

Zakura inachapisha picha za awali zilizojengwa ambazo hupunguza sana wakati wa kwanza wa usawazishaji:

Njia ya Bootstrap Muda.
|-----------------|------|
Picha ya kumbukumbu. ~ Dakika 37.
Picha ya muda mfupi. ** Chini ya dakika 2**
 Zebra (sauti kamili) ~20 hours.

Pruned snapshots ni takriban ** 11 GB, kuwezesha a ** 680 × kasi** node bootstrap ikilinganishwa na kusawazisha kutoka genesis.

### Kukata Majani kwa Asili

Zakura inasaidia block configurable kupogoa, kuruhusu node waendeshaji kufafanua jinsi mlolongo historia kuhifadhi. Hii inafanya kuwa vitendo kuendesha full Node juu ya vifaa na uhifadhi mdogo  muhimu kwa validators, watengenezaji, na watoa miundombinu ambao hawana haja kamili mlolingo kihistoria.

### zcashd RPC Upatano Mode

Zakura ni pamoja na hali ya utangamano kwamba huzaa urithi wa `zcashd` JSON-RPC interface.po wallets, kubadilishana na ushirikiano kwamba kutegemea juu ya `zcashd` RPCs unaweza kubadili kwa Zakura bila kuhitaji mabadiliko code.

### Jaribio P2P Usafirishaji safu

Zakura meli na kizazi cha pili peer-to-peer usafiri safu, sasa **lemaza kwa default**. Wakati kuwezeshwa, ni malengo:

- Chini ya 500ms mbaya kesi block kuenea katika mtandao
- Mempool mkusanyiko kwa ajili ya relay shughuli ufanisi zaidi
- DoS-kuvumilia uvumi itifaki ya kuboresha mzunguko wa mtandao ujasiri

Safu hii inawakilisha hakikisho la maboresho ya kiwango cha mtandao wa Zcash yanayotengenezwa chini ya Mradi Tachyon.

### Ironwood (NU6.3) Inapatana na Msaada wa Mfumo

Zakura inaambatana kikamilifu na uboreshaji wa mtandao wa Ironwood (NU6.3), ulioamilishwa kwenye Zcash mainnet katikati ya 2026.

---

## Jinsi Zakura inahusiana na Nodes nyingine za Zcash

| | zcashd | Zebra | Zakura |
|--|--------|-------|--------|
Lugha: C++ (iliyotokana na Bitcoin) Rust.Rust (iliyoundwa kutoka Zebra).
Hali. Imefutwa Active. Active (v1.0.0, Julai 2026)
Kasi ya usawazishaji. Kiwango cha msingi ni ~1x~5x haraka zaidi.
Kuondoa vipande vya miti. Hapana, hapana. Ndiyo.
zcashd RPC compat. Native. Sehemu ya. Ndiyo (mode compact).
 Kuanza kwa picha ya papo hapo No.No.Yes (<2 min)
Majaribio ya P2P. Hapana. Hapana, ndiyo (kuchagua).

---

## Kuanza Kazi

Download chaguzi, snapshots na nyaraka Configuration zinapatikana katika:

- ** Download & kuanzisha mwongozo:** [zakura.com/download](https://zakura.com/download/)
- ** Chain snapshots:** [zakura.com/snapshots](https://zakura.com/snapshots/)
- ** Nambari ya chanzo:** [github.com/zakura-core/zakura](https://github.com/zakura-core/zakura)

---

## Kurasa Zinazohusiana

- [Zebra Full Node (Njia ya Kuunganisha)](Zebra_Full_Node.md)  upstream Zcash full node Zakura ilikuwa forked kutoka
- [Zaino Indexing Kifaa cha Kuonyesha Maonyesho ya Picha](Zaino.md)  indexer Rust-msingi sambamba na Zebra na Zakura
- [Nodes kamili](Full_Nodes.md)  maelezo ya jumla ya Zcash full node options
- [Nodes Lightwallet](Lightwallet_Nodes.md)  rahisi mteja mbadala

## Rasilimali

- [Kuanzisha Zakura  tangazo](https://zakura.com/announcements/introducing-zakura/)
- [Zakura GitHub](https://github.com/zakura-core/zakura)
- [Tovuti ya Zakura](https://zakura.com/)
- [Zakura kwenye X/Twitter](https://x.com/ZakuraZcash)
- [Mradi wa Tachyon](https://electriccoin.co/blog/)
