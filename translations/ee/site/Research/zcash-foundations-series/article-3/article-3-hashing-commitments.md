# Hashing Kple Ðokuitsɔtsɔna: Akunyawɔwɔ ƒe Agbalẽkotoku si Wotre Nu
##### Numekuku Gbãtɔ tso [Annkkitaaa](https://github.com/Annkkitaaa)

![alt nuŋɔŋlɔ](image-15.png)

### Alesi woatu nya ɣaɣla aɖe ɖe dutoƒo eye womate ŋu aka alakpa tso eŋu gbeɖe o

> **Series:** *Zcash tso Gɔmeɖose Gbãtɔwo me* . **Nyati 3 lia . Hashing kple Ðokuitsɔtsɔna**
> **Nyaselawo:** ame yeyewo. Míetuae ɖe [Nyati 1 (agble siwo seɖoƒe li na) .](article-1-finite-fields.md) kple [Se 2 lia (elliptic curves) .](article-2-elliptic-curves.md), gake nusi wokpɔna le susu me la tsi tre ɖe eɖokui si.
> **Nusi nàgblẽ ɖi:** hash dɔwɔwɔwo gɔmesese nyuie, nusi "ɣla" kple "babla" fia ŋutɔŋutɔ, kple alesi Zcash tua nuŋlɔɖi ƒe ŋugbedodo siwo léa ame ŋutɔ ƒe fexexe ɖesiaɖe ɖe te.

Le [Nyati 0 lia me](article-0-shielded-transaction.md) míeɖɔ "magic sealed envelope": nane si nàte ŋu atsɔ abla ɖe dutoƒo board si ɖo kpe edzi be envelope li esime nèle nusi le eme ɣlam, eye màte ŋu aɖɔli emegbe gbeɖe o. Míedo ŋugbe be míaɖe alesi nu ma tɔgbe ate ŋu adzɔe me. Esiae nye nyati ma. Míehiã nu eve: **hash functions** kple **commitments**.

---

## 1. Nu ka tae wòle be nàtsɔ ɖe le eme?

Tsɔe be ègblɔ nusi ado tso tiatia aɖe me ɖi eye nèdi be yeaɖo kpe edzi, *le ema megbe*, be yeyɔe do ŋgɔ. Màte ŋu aɖe gbeƒã wò nyagblɔɖia ko o (si kpɔa ŋusẽ ɖe amewo dzi, alo kpea nutsotso siwo nètrɔe). Eye màte ŋu aɣlae bliboe o (ekema màte ŋu aɖo kpe naneke dzi emegbe o).

Nusi dim nèle enye mɔ si dzi nàto **xe asixɔxɔ aɖe fifia, le dutoƒo, ale be:**

- ame aɖeke mate ŋu agblɔ nusi nètu ɖe eme o (enɔa ɣaɣla fifia), eye
- emegbe, ne èɖee ɖe go la, **màte ŋu aka alakpa** le nusi wònye ŋu o.

Woyɔa "lock now, reveal later, no lying" gadget sia be **commitment**, eye wòle afisiafi le Zcash me. Wotu nuŋlɔɖi aɖe ƒe asixɔxɔ kple etɔ ɖe adzɔgbeɖeɖe aɖe me le ɣeyiɣi si me wowɔ nuŋlɔɖia. Be míatu adzɔgbeɖeɖewo ɖo la, míehiã woƒe dɔsɔ gbã: hash dɔwɔwɔ.

---

## 2. Nusi wokpɔna le susu me: asibidɛ ƒe dzesi na nyatakakawo

**hash dɔwɔwɔ** xɔa nyatakaka ɖesiaɖe kura, ŋɔŋlɔdzesi ɖeka alo agbalẽdzraɖoƒe blibo, eye wògbãnɛ ɖe anyi va zua ka kpui aɖe si ƒe lolome le ɖoɖo nu si woyɔna be **digest** alo **hash**. Bu eŋu be enye **asibidɛ ƒe dzesi na nyatakakawo.**

![alt nuŋɔŋlɔ](image-16.png)

Nɔnɔme ene le asibidɛ ƒe dzesi nyui si wotsɔa nya ɣaɣlawo ŋlɔna ŋu. Lé wo ɖe asi abe nusiwo wokpɔna le susu me ene, ke menye nusiwo sɔ kple wo nɔewo o:

| Nuwo ƒe nunɔamesiwo | Gɔmesese si me kɔ | Nusita wòle vevie |
|---|---|---|
| **Nu si woɖo ɖi** | Nya ɖeka ma ke tsɔtsɔ de eme ɣesiaɣi naa asibidɛ ƒe dzesi ɖeka ma ke | Àte ŋu agbugbɔ alé ŋku ɖe asibidɛ ƒe dzesi aɖe ŋu ɣesiaɣi |
| **Ŋgɔyiyi kabakaba** | Asibidɛ ƒe dzesi ƒe kɔmpiuta zazã le kabakaba | Ewɔa dɔ be woazãe le afisiafi |
| **Mɔ ɖeka (si te ŋu nɔa te ɖe nɔnɔmetata do ŋgɔ)** | Ne wona asibidɛ ƒe dzesi la, màte ŋu akpɔ nya si wotsɔ de eme si wɔe be | Ɣla nyatakaka gbãtɔwo |
| **Ete ŋu nɔa te ɖe ʋufɔku nu** | Màte ŋu akpɔ nyawo tsɔtsɔ de eme vovovo eve siwo ƒe asibidɛ ƒe dzesi ɖeka le o | Ame aɖeke mate ŋu awɔ match |

Eye nuwɔna ɖeka bubu si nana asibidɛwo sena le wo ɖokui me be enye akunyawɔwɔ kloe:

### Avalanche ƒe ŋusẽkpɔɖeamedzi (woɖo kpe edzi) .

Trɔ nyawo tsɔtsɔ de eme to agbɔsɔsɔ suetɔ kekeake me eye asibidɛ ƒe dzesi atrɔ *keŋkeŋ*, eye meɖi xoxoa o. Gbedasi siwo to vovo le ŋɔŋlɔdzesi ɖeka nu ƒe asibidɛ ŋutɔŋutɔ eve siwo nye SHA-256 ye nye esi:

```
H("Pay Bob 5 ZEC") = 6e2dc1a954c70cc865f18ea8cb70b7b56eeaf6ca42b380824a55d65dc342f34b
H("Pay Bob 6 ZEC") = 76abc346d8d3053f76a9ae18b617af71f02729a73ec6a51732d2d94934e4217f
```

Le hex xexlẽdzesi 64 dome la, **59 to vovo.** Ŋɔŋlɔdzesi ɖeka le eme, asibidɛ ƒe dzesi si medo ƒome kura o do goe. Esia tae màte ŋu atutu nya aɖe ɖe asibidɛ si woɖo taɖodzinu na ŋu o: dzesi aɖeke meli si nye "dzoxɔxɔ / fafa" si nàkplɔ ɖo o.

---

## 3. Tso asibidɛ ƒe dzesi dzi va ɖo ɖokuitsɔtsɔna dzi

Susu aɖe si tea ame kpɔ gake wògblẽ lae nye esi: be nàtsɔ ɖokuiwò ana ɖe asixɔxɔ ɣaɣla aɖe ŋu `v`, ɖeko wòta eƒe asibidɛ ƒe dzesi `H(v)`.

Esia *bla* wò nyuie (màte ŋu agblɔ emegbe be eto vovo o `v`, elabena ema ahiã be woadze wo nɔewo dzi). Gake e **do kpo ɣla.** Ne asixɔxɔ siwo ate ŋu anɔ anyi ƒe hatsotso la le sue la, ɖeko amedzidzela aɖe tsɔa asibidɛ ƒoa ame ɖesiaɖe si di be yeaxɔ ɖoƒea eye wòtsɔa wo sɔna kple wo nɔewo. Ðokuitsɔtsɔna be "ẽ" alo "ao"? Wowɔa hash na wo ame evea siaa eye wosrɔ̃a esi nètia enumake. Determinism, mía xɔlɔ̃ ɣeyiɣi kpui aɖee nye sia, le nya ɣaɣla la ɖem ɖe go fifia.

Nya ɖeka si woɖɔ ɖoe nye: **randomness.**

> **Ðokuitsɔtsɔna nye wò asixɔxɔ ƒe asibidɛ ƒe dzesi si wotsaka kple xexlẽdzesi yeye si woɖo ɖe ɖoɖo nu:**
> `commitment = H(v, r)` afi ka `r` nye adzame "ŋkuʋuʋu" ƒe asixɔxɔ si wowɔ le vome.

Fifia nenema ke `v` hea ɖokuitsɔtsɔna si ƒe dzedzeme to vovo ɣesiaɣi, elabena `r` la to vovo. Nu eve siwo míedi la katã lé ɖe asi mlɔeba:

![alt nuŋɔŋlɔ](image-17.png)

Be **ʋu** (ɖee afia) ɖokuitsɔtsɔna la emegbe la, ètaae `v` kple `r`; ame sia ame gbugbɔa akɔntabubuwo `H(v, r)` eye wòléa ŋku ɖe eŋu be esɔ. Wotu wò ɖe eme.Emae nye akunyawɔwɔ ƒe agbalẽkotoku si wotre nu tsoe tso Nyati 0 lia me, si wowɔ wònye nu ŋutɔŋutɔ.

> **Eve takeaways be woatsɔ tegbee:** *binding* tso hash la be etsi tre ɖe gododo nu; *ɣladodo* tsoa ŋkumaʋumaʋu si dzɔna le vome gbɔ `r`.

---

## 4. Mɔ eve siwo dzi woato atu agbalẽkotokua

Nuɖaɖamɔnu eve li siwo bɔ, eye Zcash zãa evea siaa.

| | **Adzɔgbeɖeɖe si wotu ɖe hash dzi** | **Pedersen ƒe ɖokuitsɔtsɔna** (tso Se 2 lia me) |
|---|---|---|
| Nuɖaɖa ƒe mɔnu | `H(v, r)` | `v.G + r.H` (fia asi ʋuƒo aɖe dzi) |
| Bebeƒe tso | nusiwo dzɔna le vome `r` | nusiwo dzɔna le vome `r` |
| Babla tso | ƒoƒo ƒe tsitretsitsi | mɔ̃ si wotsɔ ƒoa mɔ̃e (ECDLP) |
| Ŋusẽ tɔxɛ | bɔbɔe eye wòwɔa dɔ kabakaba | adzɔgbeɖeɖeawo **tsɔ wo kpe ɖe wo nɔewo ŋu** (homomorphic) |

Fli mamlɛtɔ ma tae Pedersen ƒe ŋugbedodowo le vevie ŋutɔ le Zcash me ɖo. Elabena `commit(v_1) + commit(v_2)` nye nusi sɔ `commit(v_1 + v_2)`, ɖoɖowɔɖia ateŋu aɖo kpe edzi emegbe be **ga si woge ɖe eme sɔ kple ga si dona** to ŋugbedodowo tsɔtsɔ kpee me, wo katã womaɖe ga home ɖeka pɛ hã afia o. Míele nyateƒenya ma dzram ɖo na Se 6 lia.

---

## 5. Aɖaŋu aɖe si menya kpɔna dzea sii bɔbɔe o si trɔa asi le Zcash katã ŋu: ZK-xɔlɔ̃wɔwɔ hashing

Gɔmesese aɖe si ŋgɔdonya akpa gãtɔ to lae nye esi, eye eya tututue nye "akɔntabubu do go mɔ̃ɖaŋudɔwɔwɔ" nya si dze be míate gbe ɖe edzi.

SHA-256 nye asibidɛ nyui aɖe ŋutɔ na gbesiagbe kɔmpiuta zazã. Gake Zcash menye *kɔntabubu* hashes ko o; ele be **ɖo kpe edzi, le sidzedze zero ƒe kpeɖodzi me, be wobu hash aɖe nyuie** (Se 5 lia ɖe nusitae me). Eye nusi lée enye si: zero-sidzedze ƒe kpeɖodzi wɔa dɔ le gbe si nye **finite-field arithmetic** (Se 1), esime wotu SHA-256 tso bit-twiddling dɔwɔwɔwo (shifts, ANDs, XORs) me. Bit-twiddling mawo katã ɖeɖefia le agblede akɔntabubu me xɔ asi ŋutɔ, si wɔnɛ be kpeɖodziwo lolona eye wowɔa blewu.

Eyata Zcash cryptographers wɔ hash functions siwo ƒe ememenuwo nye *xoxo* field arithmetic, si wɔe be woƒe asi bɔbɔ be woaɖo kpe edzi:

![alt nuŋɔŋlɔ](image-18.png)

Mɔ̃ɖaŋudɔwɔwɔ ƒe nyaƒoɖeamenu ɖeka sia, *"ele be wòaxɔ asi be woaɖo kpe edzi,"* tae Zcash to hash dɔwɔwɔ tɔxɛwo vɛ eye wòxɔe tsɔ wu be wòaɖo SHA-256 gbɔ le afisiafi.

---

## 6. Afisi esia le le Zcash

Zcash zã hash vovovowo le eƒe aɖaŋuwo katã me, wo dometɔ ɖesiaɖe tia na dɔa:

| Aɖaŋuwɔwɔ | Hashes siwo wozã | Afisi |
|---|---|---|
| **Sprout** (gbãtɔ kekeake) | **SHA-256** ƒe ƒuƒoƒo | De dzesi adzɔgbeɖeɖewo kple ati la |
| **Sapling** | **Pedersen hashes**, plus **BLAKE2** | Pedersen for note commitments and the Merkle tree; BLAKE2 for key derivation and nullifiers |
| **Orchard** (current) | **Sinsemilla**, plus **Poseidon** | Sinsemilla for note commitments and the Merkle tree; Poseidon for the nullifier, all designed for arithmetic circuits |

Ŋkɔ siwo wòle be woade dzesii enye **Pedersen** kple **Sinsemilla** (hashes siwo wotu ɖe ɖokuitsɔtsɔna ƒe atsyã me tso curve points me, eyata wonyia "adds up" superpower la dome eye woɖoa kpe edzi le asi bɔbɔe me) kple **Poseidon** (field-arithmetic hash si wotu ɖe taɖodzinu aɖe ta na zero-knowledge circuits). Ne Se 0 gblɔ be wotre nuŋlɔɖi aɖe me nyawo nu wòzu adzɔgbeɖeɖe la, *esia* nye mɔ̃ si le nutrenua wɔm.

Eyata wotu ʋuƒo si le ʋuʋu ɖi tso Se 0 lia me, *"aleke agbalẽkotoku si wotre nu na ate ŋu aɣla emenyawo evɔ womate ŋu awɔe o?"*, fifia wotu: **ɣla eɖokui tso ŋkumaʋumaʋu ƒe nusi dzɔna le vome, babla tso ʋufɔku ƒe tsitretsitsi alo curve trapdoor gbɔ.**

---

## 7. Nya aɖe si wogblɔna be yeaɖe asi le nyaa ŋu anukwaretɔe

Míewɔe bɔbɔe be nuwo me nakɔ. Ðokuitsɔtsɔna ƒe ɖoɖo ŋutɔŋutɔwo gblɔa alesi tututu woawɔe `v` kple `r` woŋlɔ wo ɖe kɔpi me eye generator kawoe wozãna; "ɣla" kple "babla" ɖesiaɖe va le viviwo me (deblibo vs akɔntabubu) kple dedienɔnɔ ƒe gɔmesese siwo sɔ pɛpɛpɛ; eye míeɖe Pedersen, Sinsemilla, alo Poseidon ƒe ememenuwo fia o. Emawo dometɔ aɖeke metrɔa nukpɔsusua o: ɖokuitsɔtsɔna nye asibidɛ ƒe dzesi kpe ɖe nusiwo dzɔna le vome ŋu si ɣlana fifia eye wòblana tegbee. Nyatakakaawo trɔna, wotsɔa aflaga ɖoa wo ŋu, ne protocol nyatia hiã wo.

---

## 8. Kpuie ko la

- **hash dɔwɔwɔ** nye **asibidɛ ƒe dzesi na nyatakakawo**: nusi woɖo ɖi, yi ŋgɔ kabakaba, mɔ ɖeka dzi, si te ŋu nɔa te ɖe ƒoƒo nu, kple **avalanche ƒe ŋusẽkpɔɖeamedzi** (bit ɖeka le eme, asibidɛ si to vovo kura do goe).
- **Ðokuitsɔtsɔna** na nète ŋu **tua asixɔxɔ aɖe le dutoƒo fifia eye nàɖee afia emegbe evɔ màte ŋu aka alakpa o.**
- Asibidɛ ƒe dzesi ƒuƒlu tata `H(v)` blana gake **meɣlaa** o. Nusi gbãa ŋku le vome tsɔtsɔ kpee, . `H(v, r)`, ɖɔe ɖo be: **ɣla ɖe `r`, babla tso ƒoƒo ƒe tsitretsitsi me.**
- Zcash zãa **hash-based** kple **Pedersen** ƒe ŋugbedodowo siaa; Pedersen ƒe ŋugbedodowo kpe ɖe eŋu **add up**, si Se 6 lia awɔ ŋudɔ atsɔ aɖo kpe asixɔxɔ ƒe dadasɔ dzi le adzame.
- Esi wòle be **woɖo kpe hashes dzi** le zero-sidzedze kpeɖodziwo me ta la, Zcash zãa **ZK-xɔlɔ̃wɔwɔ** hashes siwo wotu tso agble me akɔntabubu (**Pedersen**, **Sinsemilla**, **Poseidon**) tsɔ wu SHA-256 le afisiafi.

---

## Nyagɔmeɖegbalẽ

| Nyagbe | Plain-Eŋlisigbe me gɔmesese |
|---|---|
| **Hash ƒe dɔwɔwɔ** | Egbãa nyatakaka ɖesiaɖe ɖe asibidɛ kpui si ƒe lolome le ɖoɖo nu (digest) |
| **Digest** | Asibidɛ ƒe dzesi si dona tso hash dɔwɔwɔ aɖe me |
| **Preimage tsitretsitsi** | Mateŋu atrɔ digest aɖe atrɔ ayi eƒe nyawo tsɔtsɔ de eme (mɔ ɖeka dzi) |
| **Tsitretsitsi ɖe ʋufɔku ŋu** | Mete ŋu kpɔ input eve siwo ƒe digest ɖeka le o |
| **Avalanche ƒe ŋusẽkpɔɖeamedzi** | Tɔtrɔ sue aɖe si wotsɔ dea eme trɔa digest |
| **Adzɔgbeɖeɖe** | Do asixɔxɔ aɖe fifia, ɖee fia emegbe, mate ŋu aka alakpa le eŋu o |
| **Nu si gbãa ŋku (`r`)** | Xexlẽdzesi yeye si wowɔ le vome si naa ɖokuitsɔtsɔna ɣlaa |
| **ZK-xɔlɔ̃ hash** | Hash si wotu tso agble me akɔntabubu me eyata exɔ asi be woaɖo kpe |

---

## Nyabiasewo ƒe Nyabiasewo

**Nukatae màtsɔ asixɔxɔa ade nyatakakadzraɖoƒea ko tsɔ wu be nàtsɔ ɖokuiwò anae o?**
Encryption ku ɖe *nya ɣaɣla si nàte ŋu aɖe emegbe* ŋu. Ðokuitsɔtsɔna ku ɖe *babla* ŋu: kakaɖedzi be màte ŋu atrɔ wò ŋuɖoɖo emegbe o. Dɔ vovovowo wɔwɔ.

**Ne adzɔgbeɖeɖewo ɣla asixɔxɔa la, aleke ame aɖe awɔ alé ŋku ɖe seawo ŋu?**
Emae nye akpa si sidzedze zero ƒe kpeɖodziwo wɔna (Se 5 lia): woɖo kpe edzi be asixɔxɔ ɣaɣla la ɖoa seawo dzi evɔ womeɖenɛ fiana o.

**Ðe SHA-256 gblẽ, elabena Zcash ƒoa asa nɛ le teƒe aɖewoa?**
Ao, SHA-256 nyo eye Zcash gakpɔtɔ zãnɛ. Ðeko wòxɔ asi be *ɖo kpe edzi le nutome sue aɖe me*, si tae ZK-xɔlɔ̃ hashes li na dɔ ma koŋ.

**Afikae random la le `r` tso, eye amekae lénɛ ɖe te?**
Wowɔe yeyee ne wowɔ nuŋlɔɖia eye nuŋlɔɖia tɔ nyae. Enye nusi na nuŋlɔɖi ɖesiaɖe le etɔxɛ eye wònye ame ŋutɔ tɔ ƒe akpa aɖe.

---

### Do wò susuŋudɔwɔwɔ kpɔ

Ètsɔ ɖokuiwò na wò tiatiawɔblɔɖe ƒe nyagblɔɖi abe `H(v, r)` eye nàtae. Xɔ̃wò aɖe te tɔ ɖe edzi be ele be nàta agbalẽ dzɔdzɔe `H(v)` be wòanɔ bɔbɔe wu. Le nyagbe ɖeka me la, nukatae ema nye susu gbegblẽ ne nu eve koe ate ŋu ado tso eme? *(Ðo eŋu le ete.)*

<details><summary>Answer</summary>

Esi nu eve koe do tso eme ta la, xɔ̃wòa ate ŋu awɔ akɔntabubu ko `H("win")` kple `H("lose")` wo ɖokui eye nàtsɔ wo asɔ kple wò digest si wota, asrɔ̃ wò nyagblɔɖi enumake. Hash ƒuƒlu la blana gake meɣlaa eɖokui o; nusiwo dzɔna le vome `r` ye nye nusi xea mɔ na akɔntabubu kple ŋkuléle ɖe nu ŋu ƒe amedzidzedze sia.
</details>

---

### Nukae kplɔe ɖo

**Nyati 4 lia . Merkle atiwo:** fifia la, adzɔgbeɖeɖe miliɔn geɖe le mía si le dzidzim ɖe edzi. Nyati 4 lia fia alesi Zcash ɖoa wo ɖe ati ɖeka si ƒe ke ƒe asibidɛ sue la tsi tre ɖi na ŋutinya bliboa, kple alesi nàte ŋu aɖo kpe edzi be wò nuŋlɔɖia le ati ma me evɔ màɖe wo dometɔ si afia o. Emae nye Se 0 ƒe "dukɔa ƒe habɔbɔ" ƒe nɔnɔme ŋutɔŋutɔ.

*Zcash ƒe akpa aɖe tso Gɔmeɖose Gbãtɔwo *series na [ZecHub](https://zechub.org). CC BY-SA 4.0 si ŋu mɔɖegbalẽ le.*
