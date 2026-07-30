# Agble Siwo Seɖoƒe Seɖoƒe Le: Xexlẽdzesiwo ƒe Ðoɖo Si Me Nyawo Ɣaɣla Le
##### Numekuku Gbãtɔ tso [Annkkitaaa](https://github.com/Annkkitaaa)

![alt nuŋɔŋlɔ](image-5.png)

### Nukatae "wrapping around" nye Zcash ƒe gɔmeɖoanyi ɣaɣla

> **Series:** *Zcash tso Gɔmeɖose Gbãtɔwo me* . **Nyati 1 lia . Agble Siwo Seɖoƒe Le**
> **Nyaselawo:** ame yeyewo. Míetsɔe be suku ƒe akɔntabubu dzro aɖe koe (tsɔtsɔ kpe ɖe eŋu, dzidziɖedzi, mama). Nya ɣaɣlawo ƒe nuŋɔŋlɔ alo akɔntabubu si de ŋgɔ wu aɖeke meli do ŋgɔ o.
> **Nusi nàgblẽ ɖi:** gɔmesese si me kɔ eye wòsɔ le agble siwo seɖoƒe li na ŋu, nusita nya ɣaɣlawo ŋlɔlawo zãa wo, kple afisi woɖea wo ɖokui fiana le le Zcash me.

Le [Nyati 0 lia me](article-0-shielded-transaction.md) míedo go ŋɔŋlɔdzesi atɔ̃: nuŋlɔɖia, ɖokuitsɔtsɔna, nuŋlɔɖi ƒe ɖokuitsɔtsɔna ƒe ati, nullifier, kple zero-knowledge proof. Míegblẽ nuwuƒe aɖe si le gbadzaa ɖi wònɔ xɔxlɔ̃m: *afikae safuiwo kple nuɖaɖa ɣaɣlawo katã tso ŋutɔŋutɔ?* Wotso xexlẽdzesiwo me. Gake menye xexlẽme dzro siwo nètsɔ tsi o. Wotso xexlẽdzesiwo ƒe ɖoɖo tɔxɛ aɖe si le eɖokui si si woyɔna be **finite field** me, eye wotu nya ɣaɣlawo ƒe akpa ɖesiaɖe kloe si le Zcash me ɖe edzi.

Nyati sia xɔa susu ma vivivi. Abe alesi wodo ŋugbee ene la, intuition gbã. Mɔxexeɖedɔléle aɖeke meli o vaseɖe esime woaxe fe na wo ɖokui.

---

## 1. Nu ka tae wòle be nàtsɔ ɖe le eme?

Kuxi aɖe le xexlẽdzesi dzrowo ŋu na nya ɣaɣlawo: wo dometɔ geɖe seɖoƒe meli na o, eye woɖea nyatakakawo doa goe.

Bu nusi dzɔna ne xexlẽdzesi aɖe *lolo* ŋu kpɔ. Ne megblɔ akɔntabubu ɣaɣla aɖe si wowɔ na wò `8,142,067`, ènya nu geɖe xoxo: enye xexlẽdzesi adre, ewɔ nuku, "elolo ŋutɔ." Agbɔsɔsɔme nye kpeɖodzi. Eye kpeɖodzinyawo nye nusiwo tututu ameŋunyatakakawo takpɔkpɔ ƒe ɖoɖo mate ŋu ana o.

Cryptography di be yeawɔ xexlẽdzesiwo ƒe ɖoɖo si me:

- asixɔxɔ **sɔ gbɔ ŋutɔ** li, eyata kɔmpiuta ate ŋu adzra wo dometɔ ɖesiaɖe ɖo pɛpɛpɛ evɔ womaƒo xlãe o eye womayɔ ​​fũ o, .
- asixɔxɔawo **meɖea woƒe lolome doa go o**, elabena ɖoɖoa mekpɔa susu ŋutɔŋutɔ aɖeke be "lolo wu," o.
- àte ŋu **atsɔ akpe ɖe eŋu, aɖee le eme, adzi ɖe edzi, eye nàmae** faa kokoko eye nàtrɔe, elabena nya ɣaɣlawo ƒe nuɖaɖawo hiã akɔntabubu ŋutɔŋutɔ hafi woate ŋu awɔ dɔ, eye
- woate ŋu ana teƒea nalolo le ɣletivimefakaka nu**, eyata mɔkpɔkpɔ aɖeke mele akɔntabubu ŋu o.

Ŋkɔ aɖe le didiwo ƒe xexlẽdzesi ma ŋu. Enye **agble si seɖoƒe li na**. Mina míatu intuition na ɖeka hafi aŋlɔ dzesi ɖeka.

---

## 2. Nusi wokpɔna le susu me: gaƒoɖokui aɖe

Èzãa agble si seɖoƒe li na xoxo gbesiagbe. Enye gaƒoɖokui si le wò gli ŋu.

Le gaƒoƒo 12 ƒe gaƒoɖokui dzi la, xexlẽdzesiwo *xatsana*. Dze egɔme tso ga 10 me, tsɔ gaƒoƒo 5 kpee, eye màɖi ɖe "ga 15" dzi o, èɖi le **ga 3**. Teƒe wuieve koe gaƒoɖokui la le, eye ne èxlẽ to etame la, ɖeko wògatrɔna yia gɔmedzedzea.

![alt nuŋɔŋlɔ](image-9.png)

Nu etɔ̃ aɖewo dzɔ teti koe nye ema siwo nye nyati sia ƒe nya bliboa:

1. **Xexeame seɖoƒe li na.** Ðoƒe wuieve pɛpɛpɛ li, eɖanye ɣeyiɣi didi ka kee nèxlẽ o.
2. **Tsɔ kpe ɖe eŋu gakpɔtɔ wɔa dɔ.** Àte ŋu atsɔ gaƒoƒo akpe ɖe eŋu ŋkeke bliboa; èɖina ɖe gaƒoɖokui ƒe nɔnɔme si sɔ dzi ɣesiaɣi.
3. **Size stopped mattering.** "3 o'clock" megblɔna na wò nenye be èxlẽ gaƒoƒo 3 alo 15 alo 27. Nusi woxatsa ɖe eŋu *tutu lolome ŋuti nyatakakawo ɖa.* Tututu ma tututue nye nunɔamesi si sɔ na ame ŋutɔ ƒe nyawo si míedi.

Akɔntabubu sia si woxatsa ɖe eŋu la ƒe ŋkɔ le se nu: **modular arithmetic**. Gaƒoɖokui la wɔa dɔ "modulo 12," woŋlɔe be **mod 12**. Akɔntanyala lɔ̃na be yewoaxlẽ nɔƒewo tso 0 dzi, eyata "gaƒoɖokui mod 12" ƒe nɔƒewo le esi ŋutɔŋutɔ `0, 1, 2, ..., 11`. A gaƒoɖokui mod 7 anye teƒewo `0` to eme `6`.

> **Se ɖeka:** be nàbu akɔnta le nusianu ŋu "mod p," wɔ akɔntabubu dzro la, emegbe nàmae ɖe eme `p` eye nàlé susɔea ko ɖe asi.
> Kpɔɖeŋu mod 7: `5 + 4 = 9`, kple `9` aŋgbawo ƒe susɔea `2` le mama me vɔ megbe `7`, so `5 + 4 = 2 (mod 7)`.

---

## 3. Tso gaƒoɖokui dzi yi agble dzi

Gaƒoɖokui aɖe na míetsɔa nu kpena ɖe eŋu. **agble** nye ŋgɔyiyi: xexlẽdzesiwo ƒe ɖoɖo si me dɔwɔwɔ eneawo katã wɔa nu, si me ayemɔ hã le, mama.

Le vome la, **agble** nye "xexlẽdzesiwo" ƒe ƒuƒoƒo ɖesiaɖe si me nàteŋu **atsɔ akpe ɖe eŋu, aɖee le eme, adzi ɖe edzi, eye nàma** (to nusianu me negbe zero ko), eye se nyanyɛawo katã gakpɔtɔ li: ɖoɖo mehiã na tsɔtsɔ kpee alo dzidziɖedzi o, woateŋu agbugbɔ aƒo akɔtagbalẽviwo nu ƒu ɖe hatsotsowo me, a `0` kple a `1`, eye xexlẽdzesi ɖesiaɖe ƒe negative kple (negbe `0`) si nye nusi wowɔna ɖe wo nɔewo ŋu.

Xexlẽdzesi siwo me susu le la nye agble aɖe. Xexlẽdzesi ŋutɔŋutɔwo nye agble aɖe. Nusi míedi la nye *si seɖoƒe li na*.

Tanya si do tso emee nye esi, eye wònya kpɔ ŋutɔ:

> **Tsɔ xexlẽdzesi bliboa `0, 1, ..., p-1` eye nàwɔ akɔntabubu ƒe modwo katã `p`. If `p` nye xexlẽdzesi gbãtɔ, emetsonua nye agble si seɖoƒe li na.** Míeŋlɔnɛ `F_p` (xlẽ "F sub p").

So `F_7 = {0, 1, 2, 3, 4, 5, 6}` kple gaƒoɖokui ƒe atsyã ƒe akɔntabubu mod 7 nye agble si seɖoƒe li na vavã. Mina míakpɔe wòagbɔ ya.

### Dzidziɖedzi le F_7 me (woɖo kpe edzi) .

Nya ɖesiaɖe si woŋlɔ la nye `(row x column) mod 7`:

| x | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|---|
| **0** | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| **1** | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
| **2** | 0 | 2 | 4 | 6 | 1 | 3 | 5 |
| **3** | 0 | 3 | 6 | 2 | 5 | 1 | 4 |
| **4** | 0 | 4 | 1 | 5 | 2 | 6 | 3 |
| **5** | 0 | 5 | 3 | 1 | 6 | 4 | 2 |
| **6** | 0 | 6 | 5 | 4 | 3 | 2 | 1 |

Kpɔ fliawo ɖa hena `1` to eme `6`: asixɔxɔ ɖesiaɖe si menye zero o le wo dometɔ ɖesiaɖe me `1..6` zi ɖeka pɛpɛpɛ. "No repeats, nothing missing" ƒe nɔnɔme ma nye agble aɖe ƒe asibidɛ si wokpɔna.

### Mamã: akunyawɔwɔ si hiã na prime

Mamã nye "dzidziɖedzi to nusi wowɔna ɖe wo nɔewo ŋu" ko. Eme `F_7`, xexlẽdzesi aɖe ƒe tɔtrɔ ɖe wo nɔewo ŋu (alo **trɔtrɔ**). `a` nye asixɔxɔ si le eŋu `a^(-1)` si ta `a x a^(-1) = 1`. Wo xexlẽ tẽ tso kplɔ̃a dzi:

| `a` | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|
| `a⁻¹` | 1 | 4 | 5 | 2 | 3 | 6 |

Kpɔ ɖeka ɖa: `2 x 4 = 8 = 1 (mod 7)`.  Eyata "mae ɖe 2 nu" le `F_7` gɔmee nye "dzi ɖe edzi zi gbɔ zi 4." Nu ɖesiaɖe si menye zero o la ƒe zɔhɛ le esi. **Emae nye nusi nana `F_7` agble aɖe.**

---

## 4. Nusita wòle be modulus la nanye prime

Esiae nye susu ɖeka kolia si le vevie wu le nyatia me, eyata mina míana wòanye nusi ŋu kakaɖedzi le tsɔ wu be wòanye nusi me susu mele o.

Kpɔ nusi gblẽ ne míedze agbagba naively be míatu "agble" mod `6` (kple `6` nye *menye* prime o):

> Ðe ɖe li `x` kple `2 x x = 1 (mod 6)`? Wo katã me dzodzro: `2x0=0, 2x1=2, 2x2=4, 2x3=0, 2x4=2, 2x5=4`. **Ŋuɖoɖoa `1` medzena gbeɖe o.** Eyata `2` has no reciprocal mod 6. Nusi gavloe wue nye be, . `2 x 3 = 6 = 0 (mod 6)`: xexlẽdzesi eve siwo menye zero o ne wodzi wo ɖe edzi be woana zero.

Nyagbe evelia ma nye afɔku gã aɖe na akɔntabubu. Nu eve siwo menye zero o ƒe dzidziɖedzi va ɖo zero (si woyɔna be **zero mama**) fia be mama gblẽ, eye ɖoɖo si me mama gbagbã le menye agble o. Edzɔna le esi tututu `6` nusiwo gbɔ wòtso abe `2 x 3`.

Le gɔmesese nu la, nu mawo tɔgbe aɖeke mele prime si o. Eyata mod a prime, zero divisors mateŋu adze o, nu ɖesiaɖe si menye zero o xɔa reciprocal dzadzɛ, eye structure la nye field si sɔ.

![alt nuŋɔŋlɔ](image-8.png)

> **Woate ŋu azã one-liner ake na wò nyatiwo:** *prime modulus in, clean division out.*

---

## 5. Mɔfiame ɖeka si ŋu wòle be woado goe: alesi kɔmpiutawo kpɔa nusiwo wogbugbɔ trɔnae

Míexlẽa inverses tso kplɔ̃ dzi na `F_7`, gake xexlẽdzesi alafa geɖe le Zcash ƒe prime la ŋu; kplɔ̃ aɖeke mate ŋu adzɔ o. Mɔ kpui aɖe si wozãna tsã la li, eye eya koe nye mɔli si wozãna le nyati sia me.

**Fermat ƒe Nukpɔsusu Sue** gblɔ nenema na prime `p` kple ɖesiaɖe si menye zero o `a`:

```
a^(p-1) = 1   (mod p)
```

Gbugbɔ ɖoe ɖe ɖoɖo nu (ɖe nu ɖeka si le... `a`) eye nèxɔa inverse la femaxee:

```
a^(-1) = a^(p-2)   (mod p)
```

Doe kpɔ le `F_7` (`p = 7`, so `p - 2 = 5`): nusi trɔ megbe de `2` ele be wòanɔ nenema `2^5 = 32 = 4 (mod 7)`. Eye le nyateƒe me la, míaƒe kplɔ̃a gblɔ be `2^(-1) = 4`.  Kɔmpiutawo doa dzi yia ŋusẽ gãwo gbɔ kabakaba ŋutɔ, eyata esia trɔa "di nusi sɔ kple wo nɔewo" wòzua akɔntabubu kabakaba, si sɔ pɛpɛpɛ na prime gãwo gɔ̃ hã.

Mehiã be nàlé esia ɖe susu me o. Ele be nànya be **mamã le agble si seɖoƒe li na me nye dɔwɔwɔ kabakaba, si sɔ pɛpɛpɛ**, si tututu tae nya ɣaɣlawo ŋlɔlawo kpɔa dzidzɔ be yewoatu ɖe edzi ɖo.

---

## 6. Nusitae nya ɣaɣlawo lɔ̃a agble siwo seɖoƒe li na

Ne míetsɔ nukpɔsusua ƒo ƒui la, nya bliboae nye esi le axa ɖeka dzi.

| Nusiwo le ame si `F_p` | Nusita ameŋunyatakakawo ŋuti ɖoɖo aɖe di be |
|---|---|
| **Seɖoƒe li na** | Kɔmpiuta dzraa nu ɖesiaɖe ɖo pɛpɛpɛ; rounding aɖeke meli o, overflow aɖeke meli o, floating-point fuzz aɖeke meli o |
| **Nu xatsa ɖe eŋu** | Tutua "lolome," eyata asixɔxɔ aɖe meɖea naneke tso alesi wowɔe ŋu o |
| **Dɔwɔwɔ eneawo katã wɔa dɔ** | Cryptographic nuɖaɖawo (safuiwo, adzɔgbeɖeɖewo, kpeɖodziwo) hiã algebra vavãtɔ, ke menye |
| **Agbɔsɔsɔ si woate ŋu atia** | Tia 255-bit alo 381-bit prime eye nusiwo le agblea me sɔ gbɔ wu atɔm siwo le xexeame katã si woate ŋu akpɔ la me; akɔntabubu nye mɔkpɔkpɔmanɔamesi |
| **Tsɔ pɛpɛpɛ kple nusi woɖo ɖi** | Anukwareɖila eve siwo bua nu ɖeka ŋu la kpɔa emetsonu siwo sɔ ɣesiaɣi, eye kpeɖodzi siwo nɔ te ɖe |

Agble si seɖoƒe li na nye, le nyagbɔgblɔ ɖeka me la, **fefewɔƒe si wotu bliboe, si sɔ pɛpɛpɛ, si lolo bliboe na akɔntabubu.** Wotu nu bubu ɖesiaɖe si le Zcash me to fefe le eme me.

---

## 7. Afisi esia le le Zcash

Mehiã be nàtsɔ "Zcash zãa agble siwo seɖoƒe li na" ɖe xɔse dzi o. Anyigbatata si wotsɔ kɔkrit wɔe nye esi (mɔ̃ siwo goglo wu la nye nyati siwo ava emegbe tɔ; esia nye be woatsɔ aɖee afia be asibidɛawo nye nu ŋutɔŋutɔwo ko).

- **Sapling** (si nye akpoxɔnu ƒe nɔnɔme xoxo aɖe) tua eƒe kpeɖodziwo ɖe ʋuʋudedi si woyɔna be **BLS12-381** dzi, si ƒe gɔmeɖoanyi ƒe agble zãa prime si didi **381 bits**. Coordinate, key, kple proof element ɖesiaɖe nye nusi seɖoƒe li na ƒe akpa aɖe si wotu ɖe prime ma dzi.
- **Orchard** (si nye akpoxɔnu ƒe nɔnɔme si li fifia) zãa fli eve siwo woyɔna be **Pallas kple Vesta** ("Pasta" fliawo), siwo ƒe agblewo zãa prime siwo didi abe **255 bits** ene.
- **note commitment**, **nullifier**, kple xexlẽdzesi siwo le **zero-knowledge proof** me tso Se 0 me katã nye, le ete, nusiwo le seɖoƒe siawo dometɔ ɖeka me. Ne ɖoɖowɔɖia gblɔ be "bu akɔnta le ɖokuitsɔtsɔna sia ŋu," efia be "wɔ akɔntabubu mod sia be prime."

![alt nuŋɔŋlɔ](image-7.png)

Eyata Nyati 0 ƒe nyabiase si woʋu ɖi ƒe ŋuɖoɖo, *"afikae nuɖaɖa ɣaɣlawo tso?"*, dze egɔme tso afisia: **nusianu dzea egɔme abe akɔntabubu ene le agble si seɖoƒe li na me.** Le nyati si kplɔe ɖo me la, míaxɔ agble ma eye míatu nu ŋutɔŋutɔwo, dzesiwo ɖe elliptic curve dzi, siwo zua safuiwo kple adzɔgbeɖeɖewo.

---

## 8. Nya aɖe si wogblɔna be yeaɖe asi le nyaa ŋu anukwaretɔe

Be míanɔ ame yeyewo xɔlɔ̃wɔwɔ me la, míena nu vavã ʋɛ aɖewo nɔ bɔbɔe. Menye ɖeko agble siwo seɖoƒe li na la va le... `F_p` vivi si wotsɔ ƒoa nui; àte ŋu atu agblewo hã kple `p^n` elements (si woyɔna be **extension fields**), eye emawo le vevie na "pairings" siwo dzi Sapling ƒe kpeɖodziɖoɖoa ɖoa ŋu ɖo. Míedzo le field axioms ƒe xexlẽdzesi bliboa hã dzi eye míeɖe alesi wotiaa prime siwo ƒe lolome le alea heɖoa kpe wo dzii la dzi. Emawo dometɔ aɖeke metrɔa nukpɔsusu si le asiwò fifia o; ekɔa eŋu. Míatsɔ nusi sɔ pɛpɛpɛ la akpe ɖe eŋu ake, kple aflagawo, ne nyati aɖe si ava emegbe hiãe.

---

## 9. Kpuie ko la

- Cryptography hiã xexlẽdzesiwo ƒe ɖoɖo si **seɖoƒe li na, si sɔ pɛpɛpɛ, si ƒe lolome me mekɔ o, si woate ŋu atrɔ keŋkeŋ, eye wòlolo ŋutɔ.** Nuɖoanyi ma nye **seɖoƒe li na agble**.
- Intuition nye **gaƒoɖokui**: akɔntabubu si **xatsa ɖe eŋu** (modular arithmetic), si tutua xexlẽdzesi aɖe ƒe "lolome" ɖa bɔbɔe.
- Akɔntabubu wɔwɔ kple xexlẽdzesiawo `0..p-1` mod a **prime** . `p` na agble ŋutɔŋutɔ `F_p`, afisi nàte ŋu **ama** hã le elabena nu ɖesiaɖe si menye zero o la ƒe megbedede le esi.
- Modulus **ele be wòanye prime**: modulus ƒokpli wɔa zero mamawo (abe `2 x 3 = 0 mod 6`) eye wògblẽa mama me.
- Kɔmpiutawo kpɔa inverses kabakaba to **Fermat ƒe Nukpɔsusu Sue** (`a^(-1) = a^(p-2)`).
- Le **Zcash** me la, safui, ɖokuitsɔtsɔna, nullifier, kple kpeɖodzi ƒe akpa ɖesiaɖe nyea akpa gã aɖe si seɖoƒe li na mlɔeba (255-bit Pasta agblewo na Orchard, 381-bit agble na Sapling ƒe BLS12-381).

---

## Nyagɔmeɖegbalẽ

| Nyagbe | Plain-Eŋlisigbe me gɔmesese |
|---|---|
| **Akɔntabubu si wowɔna le mɔ̃ dzi** | Akɔntabubu si ƒoa xlãe ne eɖo asixɔxɔ si woɖo ɖi gbɔ vɔ, abe gaƒoɖokui |
| **mod p** ƒe ƒuƒoƒo | "Ma ɖe eme to." `p` eye nàdzra susɔea ɖo" |
| **Agble** | Xexlẽdzesiwo ƒe ɖoɖo si me woatsɔ akpe ɖe eŋu, aɖee le eme, adzi ɖe edzi, eye woama wo katã ƒe dɔwɔwɔ |
| **Agble si seɖoƒe li na `F_p`** ** | Xexlẽmeawo `0..p-1` kple akɔntabubu wɔ mod a prime `p` |
| **Inverse (nuwɔwɔ ɖe wo nɔewo ŋu)** | Nu vevi si le eme `a^(-1)` kple `a x a^(-1) = 1`; "mamã to." `a`" fia be woadzii ɖe edzi |
| **Zero mama** | Asixɔxɔ eve siwo menye zero o siwo ƒe nuwɔna nye zero; nusi gblẽa nu le composite moduli |
| **Nu vevitɔ kekeake** | Xexlẽme blibo si lolo wu 1 si me nu vevi aɖeke mele o negbe 1 kple eya ŋutɔ |

---

## Nyabiasewo ƒe Nyabiasewo

**Nukatae màzã xexlẽdzesi blibo alo ewolia dzrowo ko o?**
Desimalwo ƒoa xlã wo nɔewo eye wodzona; xexlẽdzesi blibowo tsina evɔ womebla wo o eye woƒe lolome le sisim. Agble siwo seɖoƒe li na la sɔ pɛpɛpɛ, seɖoƒe li na wo, eye woƒe lolome me mekɔ o, si nya ɣaɣlawo ŋlɔɖi bia.

**Ðe "wrap around" bu nyatakakawoa?**
Eɖoe koŋ, ẽ. Domenuwo ƒe lolome tutu nye nɔnɔme aɖe, ke menye vodada o, hena ame ŋutɔ ƒe nyawo tsɔtsɔ aɣla.

**Ðe prime si lolo wu nɔa dedie wu ɣesiaɣia?**
Le ablɔɖe me la, agble si lolo wu fia asixɔxɔ siwo ate ŋu anɔ anyi wu kple akɔntabubu sesẽ wu, gake dedienɔnɔ nɔ te ɖe xɔtutu bliboa dzi, ke menye agblea ƒe lolome ɖeɖeko dzi o. Nyati siwo va emegbe na esia sɔ pɛpɛpɛ.

**Nukatae prime tɔxɛ siawo (255-bit, 381-bit) le Zcash me?**
Wotia wo ale be curves siwo wotu ɖe wo dzi la ƒe wɔwɔme kple dɔwɔwɔ nyuie nasɔ na kpeɖodziɖoɖoa. "Dɔwɔɖoɖo nyuitɔ" mae nye nyati eve siwo kplɔe ɖo ƒe tanya.

---

### Do wò susuŋudɔwɔwɔ kpɔ

In `F_7`, nu kae nye `5 - 6`? (Ðo ŋku edzi be: nɔ eme `{0,...,6}` to babla ɖe eŋu me.) *(Ðo eŋu le ete.)*

<details><summary>Answer</summary>

`5 - 6 = -1`, kple `-1` woxatsa ɖe eme `F_7` is `6` (elabena `6 + 1 = 7 = 0`). So `5 - 6 = 6 (mod 7)`. Ðeɖe le eme medzona le agblea dzi gbeɖe o; ɖeko wòxatsa ɖe mɔ bubu nu.
</details>

---

### Nukae kplɔe ɖo

**Nyati 2 lia . Elliptic curves:** míetsɔa finite field si míetu fifia eye míezãnɛ tsɔ taa curve ƒomevi wɔnuku aɖe si ƒe teƒewo woateŋu "atsɔ akpe ɖe" eŋu. Nya mawo va zua Zcash ƒe safuiwo kple ŋugbedodowo, eye woɣlaa mɔ ɖeka ƒe mɔ̃ si na be ameŋunyatakakawo takpɔkpɔ ƒe ɖoɖo bliboa te ŋu dzɔna. Intuition gbã, abe alesi wònɔna ɖaa ene.

*Zcash ƒe akpa aɖe tso Gɔmeɖose Gbãtɔwo *series na [ZecHub](https://zechub.org). CC BY-SA 4.0 si ŋu mɔɖegbalẽ le.*
