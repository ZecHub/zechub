<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zakura_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zakura Node ƒe ŋkɔ

> 🇧🇷 [Versão em Portugaltɔwo ƒe agbalẽwo](/zechubglobal/zcashbrasil/zcashtech/zakura)

Zakura nye femaxee, ʋuʋu-dzɔtso blibo node dɔwɔwɔ na Zcash, wotu na dzidzenu. Forked tso [Zebra](Zebra_Full_Node.md) eye wowɔe to nuwɔwɔ aduadu le **Valar Group** kple **Project Tachyon** dome, Zakura naa nuwɔwɔ ɖekae kabakaba ŋutɔ, native block pruning, kple compatibility layer na domenyinu `zcashd` dɔwɔnuwo zazã. Woɖe eƒe tɔtrɔ 1.0.0 ɖe go le July 15, 2026 dzi.

---

## TL;DR

- Zakura nye **Zcash full node si sɔ kple nukpɔsusu ɖeka** — mɔnu bubu si woate ŋu azã ɖe Zebra kple zcashd teƒe, si woɖe tso Zebra me.
- Blockchain sync nye **5× kabakaba wu Zebra**; snapshot bootstrapping wu enu le **le miniti 2 te** me.
- **Native block pruning** ɖe mɔ na dɔwɔlawo be woawɔ node blibo si me disk ƒe teƒe si le sue ŋutɔ (~11 GB pruned snapshot vs. 300 GB na Zebra node blibo).
- **zcashd RPC ƒe sɔsɔ ƒe nɔnɔme** na gakotoku siwo li fifia kple ƒoƒo ɖekae wɔa dɔ tɔtrɔ aɖeke manɔmee.
- **dodokpɔ P2P ʋuɖoɖo ƒe ƒuƒoƒo** (wowɔe nuwɔametɔe le gɔmedzedzea me) tɔa ŋku sub-500ms mɔxexe ƒe kaka kple DoS-tsitretsitsi nyatoƒoetoto.
- Ewɔ ɖeka kple **Ironwood (NU6.3)**, Zcash network ƒe ɖɔɖɔɖoa dze dɔwɔwɔ gɔme le ƒe 2026 ƒe domedome.
- **Zakura Common** (v1.3.0, August 2026) naa nya ɣaɣlawo ƒe gakotoku siwo wozãna tsɔ tua ame ŋutɔ ƒe asitsatsa kabakaba: tso sɛkɛnd 3 kple edzivɔ va ɖo ms 200 teti le go geɖe me, le Zakura ƒe dzidzenuwo nu.
- **Sean Bowe** (Zcash ƒe gɔmeɖoanyila, Project Tachyon) kple **Dev Ojha** (Valar Group) ye nɔ ŋgɔ na wo.

---

## Nukae nye Zakura?

Zakura nye Zcash blibo node si wowɔ tso gɔmedzedzea me ke be wòanɔ klalo na ewɔwɔ le agbɔsɔsɔ me. Togbɔ be ema nukpɔsusu ɖeka ƒe ɖekawɔwɔ kple Zebra — si fia be eɖo kpe Zcash ɖoɖowɔɖi ƒe se mawo ke dzi eye wòwɔna ɖe wo dzi hã — Zakura to mɔ̃ɖaŋununya ƒe ŋgɔyiyi veviwo vɛ si ƒe taɖodzinue nye be woaɖe mɔxenu si xea mɔ na Zcash full node ƒe dɔwɔwɔ dzi akpɔtɔ.

Dɔa nye agbagbadzedze ɖekae le **Project Tachyon** (si Sean Bowe, Zcash ƒe cryptographic engineers gbãtɔwo dometɔ ɖeka nɔ ŋgɔ na) kple **Valar Group** (si Dev Ojha nɔ ŋgɔ na) dome. Wo katã woƒe susu nɔa dzidzime si gbɔna ƒe Zcash ɖoɖowɔɖi ƒe ŋgɔyiyiwo ŋu, eye Zakura nyea nufiame node na dɔ ma.

---

## Nu Vevi Siwo Le Eme

### 5× Kɔsɔkɔsɔ ƒe Ðekawɔwɔ Kabakaba

Zakura ɖoa blockchain synchronization si le kabakaba wu gbɔ abe 5× ene ne wotsɔe sɔ kple Zebra. Esia na wòɖea vi ŋutɔ na dɔwɔla siwo hiã be woatrɔ node aɖe kabakaba alo ahaya tso dɔmawɔmawɔ me.

### Snapshot ƒe gɔmedzedze

Zakura taa kɔsɔkɔsɔ ƒe foto siwo wowɔ do ŋgɔ siwo ɖea ɣeyiɣi si woatsɔ awɔ ɖeka le gɔmedzedzea me dzi kpɔtɔna ŋutɔ:

| Bootstrap Mɔnu | Ɣeyiɣi |
|-----------------|------|
| Nudzraɖoƒe ƒe nɔnɔmetata | ~Aɖabaƒoƒo 37 |
| Pruned snapshot ƒe nɔnɔmetata | **Le miniti 2 te** |
| Zebra (siwɔwɔ ɖekae bliboe) | ~gaƒoƒo 20 |

Pruned snapshots nye abe **11 GB**, si na **680× kabakaba** node bootstrap ne wotsɔe sɔ kple syncing tso genesis.

### Dukɔmeviwo ƒe Block Pruning

Zakura doa alɔ block pruning si woate ŋu atrɔ asi le, si na be node dɔwɔlawo te ŋu ɖea kɔsɔkɔsɔ ŋutinya agbɔsɔsɔme si woalé ɖe asi la me. Esia na wòsɔ be woawɔ node blibo ɖe hardware dzi kple nudzraɖoƒe si seɖoƒe li na — eɖea vi na validators, developers, kple infrastructure providers siwo mehiã ŋutinya me kɔsɔkɔsɔ bliboa o.

### zcashd RPC ƒe Ðekawɔwɔ ƒe Mɔnu

Zakura dea nusiwo sɔ kple wo nɔewo ƒe mɔnu si gbugbɔa domenyinu la wɔa `zcashd` JSON-RPC ƒe ŋgɔdonya. Gakotoku siwo li xoxo, asitɔtrɔwo, kple ƒoƒo ɖekae siwo dzi woɖoa ŋu ɖo `zcashd` RPCwo ateŋu atrɔ ɖe Zakura ŋu evɔ mahiã be woatrɔ kɔdawo o.

### Dodokpɔ P2P Ʋuɖoɖo Layer

Zakura ɖoa meli kple dzidzime si gbɔna ƒe hati-ɖe-hati ʋuɖoɖo ƒe ƒuƒoƒo, fifia **nuwɔametɔe le gɔmedzedzea me**. Ne wowɔe la, eɖoa taɖodzinu ɖe:

- Sub-500ms vɔ̃ɖitɔ kekeake xe mɔ na kaka le network la katã dzi
- Mempool aggregation na asitsatsa ƒe relay si wɔa dɔ nyuie wu
- DoS-tsitretsitsi nyatoƒoetoto protocol be woana network ƒe tenɔnɔ ɖe nɔnɔme sesẽwo nu nanyo ɖe edzi

Layer sia tsi tre ɖi na etsɔme Zcash network-level ŋgɔyiyi siwo wole wɔwɔm le Project Tachyon te ƒe ŋgɔdonya.

### Ironwood (NU6.3) si sɔ kple wo nɔewo

Zakura sɔ bliboe kple Ironwood network upgrade (NU6.3), si wowɔ dɔ le Zcash mainnet dzi le ƒe 2026 ƒe domedome.

---

## Zakura Common: Gakotoku me Nyawo Ɣaɣla ƒe Nuŋɔŋlɔ Kabakaba

Le August 2026 me la, Zakura ƒe ƒuƒoƒoa ɖe Zakura Common ɖe go, si nye nya ɣaɣlawo ƒe agbalẽdzraɖoƒe siwo dzi Zcash gakotokuwo kple nodewo ɖoa ŋu ɖo ƒe fɔkpa siwo wowɔna kabakaba ƒe hatsotso. Zakura trɔ ɖe stack yeyea ŋu le version 1.3.0 me, eye Vizor Wallet le gakotoku gbãtɔ siwo tsɔe wɔ ɖeka la dome.

![Private Zcash payment: zk-SNARK verification 4 to 8 times faster, transaction building from over 3 seconds to under 200 ms, proof generation over 14 times faster on mobile, hashing 21 times faster, trial decryption 1.5 times faster, and open source libraries that need no protocol upgrade](/content-images/zakuracommonspeedups.webp)

Le Zakura ŋutɔ ƒe dzidzenuwo nu la:

| Dɔwɔwɔ | Nuwɔwɔ kabakaba |
|--|--|
| Kpeɖodzi dzidzime le asitelefon dzi | wu 14× (desktop: wu 5×) |
| Sinsemilla ƒe hashing | wu 21× |
| zk-SNARK ƒe kpeɖodzinana | 4–8× ƒe ƒuƒoƒo |
| Dodokpɔ ƒe nya ɣaɣlawo ɖeɖeɖa | wu 1.5× |

Le ezãlawo gome la, tɔtrɔ si wokpɔna wue nye lalaɣi. Tsã la, ame ŋutɔ ƒe asitsatsa tutu xɔa gakotoku si wu sɛkɛnd etɔ̃. Le Zakura Common me la ateŋu axɔ ms 200 teti le go geɖe me. Esiae nye ɣeyiɣi si wò mɔ̃a zãna tsɔ dzraa asitsatsa la ɖo, ke menye ɣeyiɣi si wòle be network la naɖo kpe edzi o.


---

## Alesi Zakura Do Ƒome Kple Zcash Node Bubuwo

| | zcashd | Zebra | Zakura |
|--|--------|-------|--------|
| Gbegbɔgblɔ | C++ (woɖee tso Bitcoin me) | Gbeɖuɖɔ | Rust (forked tso Zebra gbɔ) |
| Nɔnɔme | Woɖe asi le eŋu | Dɔwɔwɔ | Dɔwɔwɔ (v1.0.0, Jul 2026) |
| Sync ƒe duƒuƒu | Gɔmedzedze | ~1× | ~5× kabakaba wu |
| Block lãɖeɖe | Ao | Ao | Ẽ |
| zcashd RPC ƒe kpeɖeŋutɔ | Dukɔmevi | Akpa aɖe | Ẽ (compat nɔnɔme) |
| Snapshot ƒe gɔmedzedze | Ao | Ao | Ẽ (mede miniti 2 o) |
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
- [Lightwallet ƒe Nodes](Lightwallet_Nodes.md) — asisiwo ƒe mɔnu siwo le bɔbɔe

## Nunɔamesiwo

- [Zakura ƒe ŋgɔdonya — gbeƒãɖeɖe](https://zakura.com/announcements/introducing-zakura/)
- [Zakura GitHub ƒe dɔwɔƒe](https://github.com/zakura-core/zakura)
- [Zakura ƒe Nyatakakadzraɖoƒe](https://zakura.com/)
- [Zakura le X/Twitter dzi](https://x.com/ZakuraZcash)
- [Dɔwɔɖoɖo si nye Tachyon](https://electriccoin.co/blog/)
- [Zakura Gbeƒãɖeɖe si bɔ](https://zakura.com/announcements/zakura-common/)
