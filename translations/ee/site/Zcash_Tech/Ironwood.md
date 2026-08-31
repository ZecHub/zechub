<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Ironwood.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Ironwood ƒe ati

> Ironwood wɔ dɔ le Zcash mainnet dzi le block 3,428,143 le July 28, 2026 UTC, eye wòle agbe tso ɣemaɣi.

Nusi nàtsɔ adzoe: nusi Ironwood trɔna, nusita nudzodzoe aɖe si le ga ɣaɣla me nye nu sesẽ, kple alesi turnstile la nana ame aɖeke ɖoa kpe edzi be womewɔ ZEC aɖeke o.

Ironwood is a Zcash [network ƒe ŋgɔyiyi](../start-here/network-upgrades), si woyɔna le se nu be NU6.3, si to ta yeye si wotsɔ akpoxɔnu wɔe si xɔ ŋkɔ ma ke vɛ. A. A [ta si ŋu wokpɔ akpoxɔnu le](../using-zcash/shielded-pools) nye ga gbogbo siwo ƒe ga homewo kple wo tɔ nɔa ɣaɣla ɖe [nya ɣaɣla siwo me sidzedze zero mele o](../zcash-tech/zk-snarks). Ironwood li be woatsɔ axe mɔ ɖe gbeɖiɖi ƒe nugbagbevi aɖe si wokpɔ le Orchard shielded pool si li fifia me nu ahalé ŋku ɖe eŋu, eye wòana mɔnu sesẽtɔ nasu nutoa me tɔwo si be woakpɔe ɖa be ZEC ƒe agbɔsɔsɔ bliboa nye anukwareɖiɖi hã. Wogblɔ eƒe se siwo dzi woda asi ɖo le [ZIP 258 ƒe xexlẽdzesi](https://zips.z.cash/zip-0258).

Nusitae esia le vevie ɖo. Ne ga si le gaglãgbe abe Bitcoin ene ta la, amesiame ate ŋu akpɔe ɖa be womewɔ aʋatso gaku aɖeke o to dutoƒo agbalẽ gã la xexlẽ me. Ga si wokpɔ ta na la ɣlaa ga homeawo, eyata màte ŋu akpɔe ko o. Ke boŋ ele be nya ɣaɣlawo ŋutɔ naka ɖe edzi be ame aɖeke mate ŋu awɔ ga le adzame o. Ironwood le vevie elabena wokpɔ nudzodzoe aɖe le kakaɖedzinya ma me na Orchard ta la. Dodoɖeŋgɔa xea vovototoa eye wònaa mɔnu amesiame si dzi wòato aɖo kpe edzi be ZEC ƒe agbɔsɔsɔ bliboa gakpɔtɔ nye anukwareɖiɖi.

Nu yeyee le Zcash mea? Dze egɔme kple [Nukae nye ZEC kple Zcash](../start-here/what-is-zec-and-zcash) kple [Ta Siwo Wotsɔ Akpoxɔnu Wɔe](../using-zcash/shielded-pools), emegbe nàtrɔ ava afisia.

![Ironwood value migration flow: value leaves the Orchard pool, passes through the turnstile checkpoint, and enters the new Ironwood pool](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/ironwood-flow.png)

## Nusitae Ironwood hiã

Le May 2026 ƒe nuwuwu la, dedienɔnɔ ŋuti numekula si le eɖokui si Taylor Hornby, le ɖoɖowɔɖi ƒe agbalẽdzikpɔkpɔ me na... [Labs Siwo Wotsɔ Akpoxɔnu Wɔe](../zcash-organizations/shielded-labs), tsɔ agbanɔamedzi ɖe gbeɖiɖi ƒe nugbagbevi aɖe ɖe go le Orchard ta si wotsɔ akpoxɔnu wɔe la me. Orchard nye Zcash ƒe ta yeyetɔ si ŋu wokpɔ akpoxɔnu le ɣemaɣi, eye vodadaa nɔ eƒe nutome si me sidzedze zero mele o ƒe akpa si le abe elliptic-curve ene, si zãa... [Halo](../zcash-tech/halo) 2 kpeɖodziɖoɖo.

1. Gbeɖiɖi ƒe vodada fia be akɔntabubu si ɖo kpe edzi be asitsatsa aɖe sɔ la meka ɖe edzi bliboe o.
2. Le susu me la, amedzidzela ate ŋu azã vodadaa atsɔ awɔ asixɔxɔ si mesɔ o le Orchard-ta la me eye wòazã ga si menye wo tɔ ŋutɔŋutɔ o, eye wòagblẽ dzesi aɖeke ɖi si node dzɔdzɔe aɖe alé o.
3. Zcash ƒe turnstile gakpɔtɔ ɖo asixɔxɔ agbɔsɔsɔme si ate ŋu ado le Orchard me gbeɖe o, eyata womate ŋu adzi ga si woatsɔ anae katã ɖe dzi o, gake ta la ŋutɔ ƒe nya ɣaɣlawo megaka ɖe edzi be gaku ɖesiaɖe si woɣla ɖe eme la nye nu ŋutɔŋutɔ o.

![The bug explained: a transaction puts in 5 ZEC, but the flawed proof still passes when 7 ZEC come out, creating 2 ZEC from nothing](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/ironwood-bug.png)

Xexlẽdzesi siwo le etame la nye nɔnɔmetata si wowɔ bɔbɔe. Gblẽƒe ŋutɔŋutɔe nye nutome suea ƒe akɔntabubu ƒe akpa aɖe koŋ, ke menye gaku siwo gena ɖe eme kple esiwo dona le eme ƒe xexlẽme ŋutɔŋutɔ o. Nya si wòle be woaɖe ɖa koe nye be gbeɖiɖi ƒe vodada ate ŋu ana woawɔ asixɔxɔ le ta la me evɔ womakpɔe o.

Vevietɔ la, kpeɖodzi aɖeke meli be wowɔ nudzodzoea ŋudɔ kpɔ o, kpeɖodzi aɖeke meli be ekpɔ ŋusẽ ɖe ezãlawo ƒe ga dzi o, eye kpeɖodzi aɖeke meli be ZEC ƒe agbɔsɔsɔ bliboa trɔ o. Woke ɖe eŋu to dedienɔnɔ ŋuti numekuku me eye woɖɔe ɖo hafi nuvevi aɖeke si wonya.

## Alesi amewo ɖo eŋui

Zcash nutoa me tɔwo ɖoa ɖɔɖɔɖowo ɖe afɔɖeɖe vovovowo tsɔ wu be woaɖo wo katã zi ɖeka.

![Ironwood response timeline: the Orchard bug is found in May 2026, the pool is paused in June 2026, the circuit is fixed in NU6.2, and Ironwood activated at block 3,428,143 on July 28, 2026](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/ironwood-timeline.png)

1. Le June 2026 ƒe gɔmedzedze la, ɣeyiɣi kpui aɖe ƒe afɔɖeɖe aɖe na Orchard-ta la megawɔ dɔ o esime wonɔ dzadzram ɖo ɖe eŋu bliboe.
2. NU6.2 ƒe tɔtrɔa ɖɔ Orchard nutome suea ŋutɔ ɖo, si xe mɔ na gbeɖiɖi ƒe gbɔdzɔgbɔdzɔ si le ete.
3. NU6.3 ƒe tɔtrɔ, Ironwood, to ta yeye si ŋu wokpɔ ta na kple dutoƒokpɔƒe vɛ ale be asixɔxɔ nate ŋu adzo le Orchard ta xoxoa me le agbalẽdzikpɔkpɔ blibo te.

![The fix in NU6.2: the corrected proof requires inputs to equal outputs, so a valid 5 ZEC output passes while an attempt to output 7 ZEC is rejected](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/ironwood-fix.png)

## Nusi Ironwood ta la wɔna

NU6.2 kpɔ Orchard nutome ta na asitsatsa yeyewo katã, gake asixɔxɔ si wowɔ le se xoxoawo te gakpɔtɔ le Orchard ƒe ta la me. Ironwood naa asixɔxɔ ma nyea teƒe si le dzadzɛ eye wònaa mɔnu si dzi woato adzro eme ne ele ʋuʋum.

Ironwood ta la nye asixɔxɔ ƒe ta si wokpɔ ta na si NU6.3 wɔ le block 3,428,143. Wotue ɖe nutome sue si woɖɔ ɖo dzi eye wozãa quantum-recoverable note format (aɖaŋu si na woate ŋu axɔ ga ne... [quantum kɔmpiutawo](../zcash-tech/post-quantum-security) ever break today’s cryptography), si gɔme woɖe le [ZIP ƒe 2005](https://zips.z.cash/zip-2005).

1. Le dɔwɔwɔ vɔ megbe la, Orchard-ta xoxoa va zua gazazã ɖeɖeko, eyata asixɔxɔ yeye aɖeke mate ŋu age ɖe eme o.
2. Asixɔxɔ yeye si wokpɔ ta na la sina yia Ironwood me boŋ.
3. Shielded ZEC léa ameŋunyatakakawo ŋuti kakaɖedzi sesẽ mawo ke siwo ɣlaa ame si ɖoe ɖa, amesi xɔe, kple ga home la me ɖe asi.

## Trɔtrɔmɔ̃a

Susu vevitɔ si le Ironwood enye mɔ si dzi woatrɔ asi le, si nye akɔntabubu ƒe teƒe si wòle be gaku ɖesiaɖe nato ne ele ʋuʋum tso Orchard ta xoxoa me yi Ironwood.

> Nusi ahuhɔ̃eʋɔtru wɔna na gadzraɖoƒe ƒe nudzraɖoƒe na ga ɣaɣla. Màte ŋu akpɔ ememe kokoko o, gake àte ŋu axlẽ nusi tututu gena ɖe eme kple nusi dona.

1. Woxlẽa ga siwo dona le Orchard le dutoƒo kpeɖodziƒe hafi gena ɖe Ironwood.
2. Esia wɔnɛ be amesiame léa ŋku ɖe alesi gbegbe ZEC ʋunae ŋu, si doa ŋusẽ kakaɖedzi le nu ŋutɔŋutɔ si le tsatsam ŋu.
3. Ne ɖe wowɔ ZEC aʋatso aɖe to vodada si do ŋgɔ dzi la, ʋuʋu ƒe akɔntabubu siae wòadze le.

Turnstiles menye nu yeye na Zcash o. Netwɔƒea zã wo do ŋgɔ, le liƒo siwo le Sprout, Sapling, kple Orchard tadeaguƒewo dome, ale be asixɔxɔ si le ʋuʋum le tadeaguƒewo dome la nɔa anyi si woate ŋu adzro eye ta aɖeke mate ŋu aɖe asi le nusi wu esi wòge ɖe eme le se nu o.

Se siwo dzi woda asi ɖo la naa asixɔxɔ ƒe ƒuƒoƒo ɖesiaɖe, si me Ironwood hã le, nɔa network la ƒe ga ƒe seɖoƒe si sɔ gbɔ wu me, eyata ta ƒe ga si susɔ mate ŋu ayi nu gbegblẽ gbeɖe o.

## Nusi wòle be ezãlawo nawɔ

Gakotokuwo kple node kɔmpiutadziɖoɖowo kpɔa esia ƒe akpa gãtɔ gbɔ le wo ɖokui si, gake tɔtrɔ ŋutɔŋutɔa le bɔbɔe: le ɣeyiɣi aɖe megbe la, tsɔ nusiwo wotsɔ akpoxɔnu lé ɖe asi la tso Orchard-ta xoxoa me to ʋuƒoa me yi Ironwood-ta la me. Wɔ ɖe mɔfiame si tso wò gakotokua nana gbɔ dzi, eye nàwɔ yeye ɣesiaɣi ɖe asiɖeɖe le eŋu si ŋu wodo alɔe ŋu hafi nàxe mɔ ɖe dɔwɔwɔ nu.

## Nyagɔmeɖegbalẽ

| Nyagbe | Plain-Eŋlisigbe me gɔmesese |
|---|---|
| Ta si wotsɔ akpoxɔnu wɔe | Ga siwo ƒe agbɔsɔsɔme kple aƒetɔwo ɣla to zero-knowledge cryptography |
| Gbeɖiɖi ƒe nugbagbevi | Vodada si na be asitsatsa si mesɔ o to kpeɖodzi ƒe ɖaseɖigbalẽa me abe ɖe wòsɔ ene |
| Turnstile ƒe ʋuƒo | Dutoƒokpɔƒe si xlẽa asixɔxɔ si le ʋuʋum le tadeaguƒewo dome ale be nuawo nanɔ anyi si woate ŋu adzro |
| Gazazã ɖeɖeko | Ta si me nàte ŋu azã ga le, gake màte ŋu atsɔ asixɔxɔ yeye akpe ɖe | ŋu o
| Netwɔƒe ƒe ŋgɔyiyi (NU) | Tɔtrɔ si wowɔ ɖekae ɖe Zcash ƒe se siwo dzi woda asi ɖo ŋu, si wowɔ dɔ le block ƒe kɔkɔme si woɖo ɖi |
| Quantum-gbugbɔgaxɔ ƒe nuŋlɔɖi | Nuŋlɔɖi ƒe ɖoɖo si wowɔ ale be woate ŋu axɔ ga ne quantum kɔmpiutawo gblẽ egbegbe nya ɣaɣlawo me gbeɖeka |

## Nyabiasewo ƒe Nyabiasewo

Ðe wògblẽ nu le nye ZEC ŋua? Ao, kpeɖodzi aɖeke meli be wozã nudzodzoea kpɔ o, mekpɔ ŋusẽ aɖeke ɖe ezãlawo ƒe ga dzi o, eye tɔtrɔ aɖeke meli le nusiwo katã wotsɔ vɛ ŋu o.

Ðe wòhiã be mawɔ nanea? Na wò gakotoku kple node ƒe kɔmpiutadziɖoɖoa nawɔ yeye ɖe asiɖeɖe le eŋu si wodo alɔe ŋu hafi nàxe mɔ ɖe dɔwɔwɔ nu. Wò gakotokua tsɔa ga yia Ironwood le ɣeyiɣi aɖe megbe ne èle ga zãm, eyata naneke meli si nàtsɔ asi awɔ kaba o. Wɔ ɖe wò gakotoku dɔwɔƒea ƒe mɔfiamewo dzi.

Ðe Zcash gakpɔtɔ nye ame ŋutɔ tɔa? Ɛ̃. Ironwood léa ameŋunyatakaka siwo wokpɔ ta na si ɣlaa ame si ɖoe ɖa, amesi xɔe, kple ga home ma ke ɖe asi. Dodoɖeŋgɔ sia ku ɖe nuzazãwo ƒe fɔmaɖimaɖi ŋu, ke menye ame ŋutɔ ƒe nyawo gbɔ kpɔkpɔ ŋu o.

Ðe wowɔ nudzodzoea ŋudɔ kpɔa? Kpeɖodzi aɖeke meli si fia be nenemae wònɔ o. Woke ɖe eŋu to dedienɔnɔ ŋuti numekuku me, woɖee ɖe go le agbanɔamedzi me, eye woɖɔe ɖo hafi nuveviwɔame ɖesiaɖe si wonya.

Nukae dzɔna ɖe Orchard ta xoxoa dzi? Eva zua gazazã ɖeɖeko. Asixɔxɔ yeye aɖeke mate ŋu age ɖe eme o, eye asixɔxɔ si li xoxo la ʋuna yia Ironwood to ʋuƒoa dzi, afisi wowɔa ʋuʋua ƒe agbalẽ le dutoƒo.

## Do wò nugɔmesese kpɔ

Ne woɣla ZEC si le ta siwo ŋu wokpɔ ta na me la, aleke ame aɖe ate ŋu aɖo kpe edzi be Orchard ƒe nugbagbevi la mekɔ nusiwo katã wotsɔ vɛ la ɖe dzi le adzame o?

<details>
<summary>Answer</summary>

To ʋuƒoa dzi. Woxlẽa gaku ɖesiaɖe si dona le Orchard-ta xoxoa me le dutoƒoʋudzeƒe aɖe ne ele gegem ɖe Ironwood. Ne asixɔxɔ geɖe dze agbagba be yeadzo wu esi woge ɖe eme le se nu la, akɔntabubua mada asɔ o, eyata aʋatsonu ɖesiaɖe si nugbagbevi la ate ŋu ahe vɛ hafi la ado ɖe agbo ma dzi.
</details>

### Nunɔamesiwo

[ZIP 258: NU6.3 Network Upgrade ƒe dɔwɔwɔ](https://zips.z.cash/zip-0258)

[ZIP 257: Orchard Ɣeyiɣi kpui aɖe ƒe Afɔkuwo Dzi Ðeɖe Akpɔtɔ kple NU6.2 Network Upgrade ƒe dɔwɔwɔ](https://zips.z.cash/zip-0257)

[ZIP 2005: Ironwood ƒe Agbɔsɔsɔme Gbugbɔgaxɔ](https://zips.z.cash/zip-2005)

[Ironwood: Ta Yeye si Wotsɔ Akpoxɔnu Wɔe na Zcash](https://zodl.com/ironwood-a-new-shielded-pool-for-zcash/)

### Kpɔe hã

[Zcash Network ƒe Ðɔɖɔɖowo](../start-here/network-upgrades)

[Ta Siwo Wotsɔ Akpoxɔnu Wɔe](../using-zcash/shielded-pools)

[Halo](../zcash-tech/halo)

[zk-SNARKS ƑE NUÐEÐEŊUTI](../zcash-tech/zk-snarks)

[Post Quantum Dedienɔnɔ](../zcash-tech/post-quantum-security)

[Labs Siwo Wotsɔ Akpoxɔnu Wɔe](../zcash-organizations/shielded-labs)

[Nukae nye ZEC kple Zcash](../start-here/what-is-zec-and-zcash)

---

Siwo kplɔ wo nɔewo ɖo: [Network Upgrades ƒe dzesi](../start-here/network-upgrades) · Si do ŋgᴐ: [NU6.2](../zcash-tech/nu6-2)
