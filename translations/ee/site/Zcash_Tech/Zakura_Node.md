<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zakura_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zakura Node ƒe ŋkɔ

> 🇧🇷 [Versão em Portugaltɔwo ƒe agbalẽwo](/zechubglobal/zcashbrasil/zcashtech/zakura)

Zakura nye femaxee, ʋuʋu-dzɔtso blibo node dɔwɔwɔ na Zcash, wotu na dzidzenu. Forked tso [Zebra](Zebra_Full_Node.md) eye wowɔe to nuwɔwɔ aduadu le **Valar Group** kple **Project Tachyon** dome, Zakura naa nuwɔwɔ ɖekae kabakaba ŋutɔ, native block pruning, kple compatibility layer na domenyinu `zcashd` dɔwɔnuwo zazã. Woɖe eƒe tɔtrɔ 1.0.0 ɖe go le July 15, 2026 dzi.

---

## TL;DR

- Zakura nye **Zcash blibo node si sɔ kple nukpɔsusu ɖeka** — mɔnu bubu si woate ŋu azã ɖe Zebra kple zcashd teƒe, si woɖe tso Zebra me.
- Blockchain sync nye **5× kabakaba wu Zebra**; snapshot bootstrapping wu enu le **le miniti 2 te** me.
- **Native block pruning** ɖea mɔ na dɔwɔlawo be woawɔ node blibo si me disk ƒe teƒe le sue ŋutɔ (~11 GB pruned snapshot vs. 300 GB na Zebra node blibo).
- **zcashd RPC ƒe sɔsɔ ƒe nɔnɔme** na gakotoku siwo li fifia kple ƒoƒo ɖekae wɔa dɔ tɔtrɔ aɖeke manɔmee.
- **dodokpɔ P2P ʋuɖoɖo ƒe ƒuƒoƒo** (wowɔe nuwɔametɔe le gɔmedzedzea me) tɔa ŋku sub-500ms mɔxexe ƒe kaka kple DoS-tsitretsitsi nyatoƒoetoto.
- Ewɔ ɖeka kple **Ironwood (NU6.3)**, Zcash network ƒe ɖɔɖɔɖoa dze dɔwɔwɔ gɔme le ƒe 2026 ƒe domedome.
- **Sean Bowe** (Zcash ƒe gɔmeɖoanyila, Project Tachyon) kple **Dev Ojha** (Valar Group) ye nɔ ŋgɔ na wo.

---

## Nukae nye Zakura?

Zakura nye Zcash full node si wowɔ tso gɔmedzedzea me ke be wòanɔ klalo na ewɔwɔ le agbɔsɔsɔ me. Togbɔ be ema nukpɔsusu ɖeka ƒe ɖekawɔwɔ kple Zebra — si fia be eɖo kpe Zcash ɖoɖowɔɖi ƒe se mawo ke dzi eye wòwɔna ɖe wo dzi hã la — Zakura to mɔ̃ɖaŋununya ƒe ŋgɔyiyi veviwo vɛ siwo ƒe taɖodzinue nye be woaɖe mɔxenu si xea mɔ na Zcash full node ƒe dɔwɔwɔ dzi akpɔtɔ.

Dɔa nye agbagbadzedze ɖekae le **Project Tachyon** (si Sean Bowe, Zcash ƒe cryptographic engineers gbãtɔwo dometɔ ɖeka kplɔ) kple **Valar Group** (si Dev Ojha kplɔ) dome. Wo katã woƒoa nu tso dzidzime si gbɔna ƒe Zcash ɖoɖowɔɖi ƒe ŋgɔyiyiwo ŋu, eye Zakura nyea nufiame node na dɔ ma.

---

## Nu Vevi Siwo Le Eme

### 5× Kɔsɔkɔsɔ ƒe Ðoɖowɔwɔ Kabakaba

Zakura ɖoa blockchain synchronization kabakaba abe 5× gbɔ ne wotsɔe sɔ kple Zebra. Esia na wòɖea vi ŋutɔ na dɔwɔla siwo hiã be woatrɔ node aɖe kabakaba alo ahaya tso dɔmawɔmawɔ me.

### Snapshot ƒe gɔmedzedze

Zakura taa kɔsɔkɔsɔ ƒe foto siwo wowɔ do ŋgɔ siwo ɖea ɣeyiɣi si woatsɔ awɔ ɖeka le gɔmedzedzea me dzi kpɔtɔna ŋutɔ:

| Bootstrap Mɔnu | Ɣeyiɣi |
|-----------------|------|
| Nudzraɖoƒe ƒe nɔnɔmetata | ~Aɖabaƒoƒo 37 |
| Pruned snapshot ƒe nɔnɔmetata | **Le miniti 2 te** |
| Zebra (siwɔwɔ ɖekae bliboe) | ~gaƒoƒo 20 |

Pruned snapshots nye abe **11 GB**, si na **680× kabakaba** node bootstrap ne wotsɔe sɔ kple syncing tso genesis.

### Dukɔmeviwo ƒe Block Pruning

Zakura doa alɔ block pruning si woate ŋu atrɔ asi le, si na be node dɔwɔlawo te ŋu ɖea kɔsɔkɔsɔ ŋutinya agbɔsɔsɔme si woalé ɖe asi la me. Esia na be ewɔa dɔ be woawɔ node blibo ɖe hardware dzi kple nudzraɖoƒe si seɖoƒe li na — eɖea vi na validators, developers, kple infrastructure providers siwo mehiã ŋutinya me kɔsɔkɔsɔ bliboa o.

### zcashd RPC ƒe Ðekawɔwɔ ƒe Mɔnu

Zakura dea nusiwo sɔ kple wo nɔewo ƒe mɔnu si gbugbɔa domenyinu la wɔna `zcashd` JSON-RPC ƒe ŋgɔdonya. Gakotoku siwo li xoxo, asitɔtrɔwo, kple ƒoƒo ɖekae siwo dzi woɖoa ŋu ɖo `zcashd` RPCwo ateŋu atrɔ ɖe Zakura ŋu evɔ mahiã be woatrɔ kɔdawo o.

### Dodokpɔ P2P Ʋuɖoɖo Layer

Zakura ɖoa meli kple dzidzime si gbɔna ƒe hati-ɖe-hati ʋuɖoɖo ƒe ƒuƒoƒo, fifia **nuwɔametɔe le gɔmedzedzea me**. Ne wowɔe la, eɖoa taɖodzinu ɖe:

- Sub-500ms vɔ̃ɖitɔ kekeake xe mɔ na kaka le network la katã dzi
- Mempool aggregation na asitsatsa ƒe relay si wɔa dɔ nyuie wu
- DoS-tsitretsitsi nyatoƒoetoto protocol be woana network ƒe tenɔnɔ ɖe nɔnɔme sesẽwo nu nanyo ɖe edzi

Layer sia tsi tre ɖi na etsɔme Zcash network-level ŋgɔyiyi siwo wole wɔwɔm le Project Tachyon te ƒe ŋgɔdonya.

### Ironwood (NU6.3) si sɔ kple wo nɔewo

Zakura sɔ bliboe kple Ironwood network upgrade (NU6.3), si wowɔ dɔ le Zcash mainnet dzi le ƒe 2026 ƒe domedome.

---

## Alesi Zakura Do Ƒome Kple Zcash Node Bubuwo

| | zcashd ƒe nyawo | Zebra | Zakura |
|--|--------|-------|--------|
| Gbegbɔgblɔ | C++ (woɖee tso Bitcoin me) | Gbeɖuɖɔ | Rust (forked tso Zebra gbɔ) |
| Nɔnɔme | Woɖe asi le eŋu | Dɔwɔwɔ | Dɔwɔwɔ (v1.0.0, Jul 2026) |
| Sync ƒe duƒuƒu | Gɔmedzedze | ~1× | ~5× kabakaba wu |
| Block lãɖeɖe | Ao | Ao | Ẽ |
| zcashd RPC ƒe kpeɖeŋutɔ | Dukɔmevi | Akpa aɖe | Ẽ (compat nɔnɔme) |
| Snapshot ƒe gɔmedzedze | Ao | Ao | Ẽ (<2 min) |
| Dodokpɔ ƒe P2P | Ao | Ao | Ẽ (tiae be yeawɔe) |

---

## Gɔmedzedze

Tiatia siwo nàte ŋu awɔ kɔpi, fotoɖeɖe, kple ɖoɖowɔɖi ŋuti nuŋlɔɖiwo le:

- **Download & ɖoɖowɔwɔ ƒe mɔfiame:** [zakura.com/ɖe eƒe kɔpi](https://zakura.com/download/)
- **Kɔsɔkɔsɔ ƒe nɔnɔmetatawo:** [zakura.com/nɔnɔmetatawo](https://zakura.com/snapshots/)
- **Dzɔtsoƒe ƒe dzesi:** [github.com/zakura-nu vevi/zakura](https://github.com/zakura-core/zakura)

---

## Axa Siwo Do Ƒome Kplii

- [Zebra ƒe Node Bliboe](Zebra_Full_Node.md) — dzigbe Zcash blibo node Zakura nye fork tso
- [Zaino ƒe Indexer](Zaino.md) — Rust-based indexer si sɔ kple Zebra kple Zakura
- [Nodes Blibowo](Full_Nodes.md) — Zcash ƒe node bliboa ƒe tiatiawɔblɔɖe ƒe wɔwɔfia
- [Lightwallet ƒe Nutowo](Lightwallet_Nodes.md) — asisiwo ƒe mɔnu siwo le bɔbɔe

## Nunɔamesiwo

- [Zakura ƒe ŋgɔdonya — gbeƒãɖeɖe](https://zakura.com/announcements/introducing-zakura/)
- [Zakura GitHub ƒe dɔwɔƒe](https://github.com/zakura-core/zakura)
- [Zakura ƒe Nyatakakadzraɖoƒe](https://zakura.com/)
- [Zakura le X/Twitter dzi](https://x.com/ZakuraZcash)
- [Dɔwɔwɔ si nye Tachyon](https://electriccoin.co/blog/)
