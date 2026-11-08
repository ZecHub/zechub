![alt text](image-1.png)
# Ironwood: Ale si woɖe kpe edzi be ga mate ŋu woawɔ aɖe o

### Ale si Zcash ɖo ŋuɖoɖo aɖe ŋu kple ɖaseɖigbalɛ si makina do kpe ɖe eŋu

> **Mama:** *Formal Verification* · **Akpa 3 le 3 me**
> **Ame siwo woŋlɔe na:** ame yeyewo. Akpa 1 kple 2 ɖo formal verification kple Orchard ƒe ŋuɖoɖo la ƒe gɔmeɖeɖe; nuwuwu sia fia ale si susu eveawo do go kple wo nɔewo le ɖoɖonu gɔme aɖe me. Woagblɔ nu siwo katã wòhia na wò la na wò le míaƒe mɔzɔzɔ me.
> **Nu si wòakplɔ ayi:** Nunya nyui tso nu si Zcash ɖe kpe ɖe eƒe "Ironwood" gaƒuƒoƒo yeye la ŋu vavã, ale si woɖo ɖaseɖigbalɛ la ɖo, nu si wòɖe kpe ɖe eŋu kple nu si wòmeɖe kpe ɖe eŋu o, ale si woɖe gaƒuƒoƒo xoxo la ɖe zɔzɔ me dedie, kple nu si ta esia fia mɔlɔlɔ yeye na ga si wowɔ kple cryptography.

Le Akpa 1 me míesrɔ nu si wògɔme na be woaɖe kpe ɖe ɖoɖonu aɖe ƒe nyuityo ŋu. Le Akpa 2 me míekpɔ ŋuɖoɖo vavã aɖe si dodokpɔ mekpɔ o le ƒe ene me: elliptic-curve ƒe hahatoto si me wodzra ɖeɖe ɖe eme akpa o, si anɔ ŋusẽ na ga ƒe wɔnɔnɔ si ame mate ŋu akpɔ o, si me wòanɔ nu teƒe aɖeke o. Nyatia siae nye eƒe ŋuɖoɖo: ale si Zcash ɖo eŋu, menye kple ɖɔɔɖo ko o, ke boŋ kple ɖaseɖigbalɛ si makina do kpe ɖe eŋu be ŋuɖoɖo ƒome sia katã bu.

---

## 1. Nu ka ta wòele be wòasusu eŋu?

Ne ŋuɖoɖo aɖe le ga dzro la, nu si woɖea ŋu wɔa zi geɖe nye be woaɖɔe eye woayi edzi. Zcash wɔ nu si wòto eŋu wu. Kple ɣaɣla [shielded] gaƒuƒoƒo yeye aɖe si woyɔna be **Ironwood**, si wode dɔme le July 28, 2026, eƒe mɔsrɔ̃lawo ɖe **mathematics ƒe ɖaseɖigbalɛ si makina do kpe ɖe eŋu** ɖe go, le **theorem 2,700 wu** si woŋlɔ le **Lean** proof assistant me, si ɖe kpe edzi be gaƒuƒoƒo yeye la mate ŋu awɔ ga gblẽ si mewɔ nyateƒe o le ame siwo ƒe ŋutinya woɖe fia me o. Ʉti ɖaseɖigbalɛ la le ame sia ame ƒe kpɔkpɔ me, le `ironwood` repository si nye open-source la me, eye hadɔ si me wòwɔ la xɔ ɣleti ɖeka wu na hakpɔlawo kple cryptographer ƒe ƒome etɔ̃.

Esia le vevie wu Zcash. E nye fiaɖeɖe si le xexeme vavã me si ƒe kekeli sesẽ be wòate ŋu axɔ ga ƒe ɖoɖonu si le dɔ wɔm, aŋlɔ nu si "ga wɔnɔnɔ aɖeke o" gɔme vavã, eye wòaɖe kpe ɖe eŋu, le teƒe si wòaɖo ŋku edzi be wòƒe dodokpɔwo blibo. Etrɔ ŋugbedodo zu theorem.

---

## 2. Susu gãtɔ: ɖe kpe ɖe specification la ŋu, tsrɔ̃ ŋuɖoɖo ƒome la

Akpa 2 va yi ɖe nyanya si wɔ esia dzɔ la ŋu. Ɖo ŋku edzi, elabena nu sia katã tu ɖe eŋu:

> Ga wɔnɔnɔ ŋuɖoɖo si ame mate ŋu akpɔ o ate ŋu anɔ protocol ƒe **specification**, si nye mathematics ƒe gɔmeɖeɖe na nu si circuit la ele be wòawɔ la, ko me. Nu si ame ate ŋu akpɔ la ado go le ame sia ame ƒe ga ƒe xexlẽ me. Eya ta ne woɖe kpe ɖe specification la ƒe nyuityo ŋu la, ekaka ga wɔnɔnɔ ŋuɖoɖo si woƒia le eme la katã ɖe tɛ̃.

Nu ka ta "le specification ko me"? Elabena gaɖoɖo sia gaɖoɖo ƒe nyawo katã nɔa anyi tegbee le gaɖoɖowo ƒuƒoƒe [block] sia gaɖoɖowo ƒuƒoƒe me, eye eƒe ɖaseɖigbalɛwo hã le eme. Ne software la xɔ gaɖoɖo vɔ̃ aɖe le mɔ vɔ̃ dzi la, ame sia ame ate ŋu atsɔ software si woɖɔ ɖo yi megbe ahama nu si va yi la, eye woakpɔe. Ɖase sia nɔa anyi tegbee eye ame sia ame ate ŋu akpɔe. Mathematics ƒe vodada le gɔmedzedze la me ko ate ŋu aɣla tegbee, elabena "version si sɔ" aɖeke menɔ o be woahama nuwo ɖe eŋu. Eyae nye vodada si formal verification ƒe dɔe be wòaɖe.

Dodokpɔ kpɔa **nuwɔwɔ le input siwo woɖo kpɔ la dzi**, eye Orchard ƒe ŋuɖoɖo la ɣla eɖokui elabena input si woɖo kpɔ aɖeke mede eme o. Ɖaseɖigbalɛ aɖe tso specification la ŋu ku ɖe input **katã** ŋu ɣeyiɣi ɖeka me, eye eƒo akpa xɔasi si ame aɖeke mebu be woate ŋu akpɔ o hã. Eya koe nye laylaylala ƒe ƒome si sesẽ nam be woaɖe ƒe ene si me wodzra vodada si ame mate ŋu akpɔ o ɖe zɔzɔ me kple dzideƒo.

![alt text](image-2.png)

---

## 3. Nu ka woɖe kpe edzi vavã

Ɖaseɖigbalɛ la ɖe nyagblɔɖeka si nye nu gãtɔ aɖe kpe edzi, si wowɔ tso nu si le anyi kɔkɔe wu me.

### Balansi ƒe blibododo [Balance integrity] (nu gãtɔ)

> **Balansi ƒe blibododo:** Asixɔxɔ si woɣla ɖe gaƒuƒoƒo la me la megava yɔ wu asixɔxɔ si tso ame sia ame gbɔ va eme nete.

Esiae nye ga wɔnɔnɔ ƒe mɔxɔɖiɖi le nya bɔbɔe me. Ga ate ŋu ava ɣaɣla gaƒuƒoƒo la me (ame sia ame akpɔe) eye wòado go tsoe (ame sia ame akpɔe), ke le eme afi si woɣla asixɔxɔwo la, asixɔxɔ aɖeke mate ŋu adzɔ le nu aɖeke me o. Míana wòakpɔe kple agbalẽ bɔbɔe aɖe (xexlẽ si woɖe kpe edzi):

- **Gaɖoɖo nyui:** input siwo ƒe asixɔxɔ nye `5 + 3 = 8` wɔ output siwo ƒe asixɔxɔ nye `4 + 4 = 8`. Asixɔxɔ si ge eme la sɔ kple si ge do go la. Balansi ƒe blibododo le anyi. ✓
- **Ga wɔnɔnɔ ƒe wɔwɔ dodokpɔ:** input mawo ke siwo ƒe asixɔxɔ nye `8`, ke output siwo ƒe asixɔxɔ nye `4 + 4 + 2 = 10`. Esia anɔ ga ƒe unit `2` wɔm tso nu aɖeke me. Balansi ƒe blibododo **meɖe mɔ na esia o**: gaƒuƒoƒo la mate ŋu ada ga ado go wu si ge eme o. ✗

Balansi ƒe blibododo nye mathematics ƒe nyagblɔ be scenario evelia mate ŋu awɔ gaɖoɖo si sɔ o.

### Nunya ƒe nyuityo [Knowledge soundness] (mɔ̃ si le anyi)

Be balansi ƒe blibododo nanɔ anyi la, hakpɔlawo ele be woaɖe nu si le anyi kɔkɔe wu tso zero-knowledge ɖaseɖigbalɛ ƒe ɖoɖonu la ŋu. Nyuityo bɔbɔe (Akpa 2 ƒe "nyagblɔ nyateƒe ko wɔa witness") medze egbe be woatsɔ awɔ ɣaɣla gaƒuƒoƒo o, le ta si wɔnɔ viviti aɖe ta: elabena gaɖoɖo si woɣla ate ŋu anyɔ nu vovo sia nu, nyagblɔ geɖe aɖe sia aɖe le witness aɖe le technical mɔ dzi. Eya ta hakpɔlawo ɖe nu sesẽ wu aɖe kpe edzi:

> **Nunya ƒe nyuityo:** ame sia ame si ate ŋu awɔ gaɖoɖo ƒe ɖaseɖigbalɛ si sɔ la, ele be wòa**le witness si sɔ vavã**, si nye ga vavã, si woɖe tso mɔ sɔ dzi, le gaɖoƒe ƒe dzesi [address] si sɔ dzi.

Dɔwɔnu formal si wotsɔ wɔ esia nye **extractor**: mɔ aɖe si, ne wotsɔe de prover aɖe si ate ŋu ado dzilawo dzidzedze me la ŋu, ate ŋu ahe witness vavã la ado go tsoe me. Ne woate ŋu ado witness aɖe go ɣesiaɣi la, ekema prover si wɔa dzilawo ƒe dzideƒo la ele be wòanɔ witness aɖe le vavã. Le Akpa 2 ƒe gbegblɔ me, nunya ƒe nyuityo nye ŋugbedodo formal be **soundness gap aɖeke menɔ o**, ɖeɖe si wɔa dɔ o aɖeke menɔ o si ana nyagblɔ aɖe si menye nyateƒe o ato eme. Esiae nye nɔnɔ si **manganɔ anyi** wɔ Orchard ƒe ŋuɖoɖo la. Ne woɖe kpe edzi be ele anyi na prover bubu sia bubu la, etsi mɔ ma ɖe tɛ̃.

![alt text](image-3.png)

---

## 4. Ale si woɖo ɖaseɖigbalɛ la

Ɖekpekpe sia nye amegbetɔ ƒe dɔ sesẽ aɖe, menye nu si wòate ŋu adzi kple button ƒe dziɖoɖo ɖeka o:

- Woŋlɔe le **Lean** proof assistant me (tso Akpa 1 me: makina si kpɔa logic ƒe afɔ sia afɔ).
- Eme nya **theorem 2,700 wu**, siwo le ame sia ame ƒe kpɔkpɔ me le `ironwood` repository la me.
- **Hakpɔla kple cryptographer ƒe ƒome etɔ̃** wɔe le **ɣleti ɖeka wu** me, eye Project Tachyon ƒe Tal Derei kplɔ dɔ aɖe; Gregor Mitscha-Baude tso zkSecurity kple Daira-Emma Hopwood tso Zcash Open Development Lab hã wɔ akpa le eme, kple soundness ƒe ɖaseɖigbalɛ bubu aɖe si cryptographer bubuwo wɔ ɖeɖe le ɣeyiɣi ɖeka me.

Be woasusu nɔnɔ la ŋu la, Lean ƒe model la ɖe **agbalẽ si me woŋlɔ gaɖoɖowo [ledger]** fia abe gaɖoɖowo ƒe xexlẽ ene, si me ɖe sia ɖe tsɔ eƒe actionwo, eƒe ame sia ame ƒe asixɔxɔ si wògblɔ, kple eƒe asidede agbalẽ tewo [signatures] va. Predicate si hakpɔlawo yɔna be **ValidLedger** la ŋlɔ network ƒe gbegbɔgblɔ ɖi [consensus] sewo ɖe eme tẽ: action sia action ƒe witness ele be wòaɖe nu siwo wobia la kpe edzi, spend-marker (nullifier) aɖeke megava do go zi eve o, ati ƒe nɔnɔ sia nɔnɔ si woƒo nu tsoe la ele be wòanye nɔnɔ si ɖoɖonu la va de vavã, eye asidede agbalẽ te sia asidede agbalẽ te ele be woakpɔ be esɔ. Theoremwo va ku ɖe **ValidLedger bubu sia bubu** ŋu. Gbegbe sia, "ValidLedger bubu sia bubu," nye nu gãtɔ la: menye sample aɖe o, ke boŋ wo katã, si wu nu si attack wɔla vavã aɖe ate ŋu aɖo la.

Woƒo balansi ƒe blibododo ƒe emetsonu la tso ledger-level theorem geɖe me, si ɖe mɔ sia mɔ si ate ŋu awɔ ga wɔnɔnɔ la be wotsii ɖe tɛ̃: be spend sia spend sɔ kple output vavã si do go tsã, be asixɔxɔ katã ƒe ƒoƒo nɔ anyi, be didienu [note] si woxɔ nɔ mɔ na be woatsɔ awɔ dɔ eye woate ŋu axi le ame aɖeke si le eŋu o, eye be spend hia mɔɖeɖe sɔ. Akpa bubu aɖe, si nye **binding signature**, tsɔ gaɖoɖo sia gaɖoɖo ƒe asixɔxɔ siwo woɣla la kɔ ɖe asixɔxɔ si wògblɔ na ame sia ame la ŋu, ale be xexlẽ si woɣla kple ame sia ame ƒe xexlẽ mate ŋu woawɔ vovototo le ɣlaɣla me o.

---

## 5. Afi si mathematics kple software do go kple wo nɔewo

Biabia aɖe si le ŋutinya eye wòle nyateƒe: ɖaseɖigbalɛ la ku ɖe mathematics ƒe model aɖe ŋu, ke network la wɔa *Rust code*. Aleke míenya be code la sɔ kple model la?

Ƒome la de mɔ kpɔtɔ aɖe si woyɔna be verifier ƒe **fingerprint**. Le mɔ kpɔtɔ la ƒe dzi, Lean ƒe ɖaseɖigbalɛwo susu verifier la ŋu abe mathematics ƒe nu si woɖe gɔme kɔkɔe ene. Le ete la megbe lae ordinary Rust implementation la le. Nyagblɔ vevietɔ la nye ma ke si le Akpa 2 me:

> Mɔ sia mɔ si software vavã la ate ŋu atɔ vovo na model si woɖe kpe edzi la anye *implementation* ŋuɖoɖo, eye implementation ŋuɖoɖowo ate ŋu awɔ ga wɔnɔnɔ si ame ate ŋu akpɔ ko, elabena ɖaseɖigbalɛ siwo katã woaxɔ la nɔa anyi tegbee eye woate ŋu ahama wo to software si woɖɔ ɖo me.

Eya ta ɖaseɖigbalɛ la kpɔ ŋuɖoɖo ƒome si ame mate ŋu akpɔ o (specification), eye ame sia ame ƒe nuŋlɔɖi si nɔa anyi tegbee kpɔ ŋuɖoɖo ƒome si ame ate ŋu akpɔ la (implementation). Le wo eveawo dome la, afi aɖeke menɔ na ga wɔnɔnɔ ŋuɖoɖo si ame mate ŋu akpɔ o be wòaɣla le o. Ƒome la hã wɔ cross-check, to verifier vavã la ƒe wɔwɔ me eye woɖe kpe edzi be wòtsɔ fingerprint la va yi bliboe le case siwo woɖi ɖeɖi la dzi.

---

## 6. Nuxlɔ̃ame vevietɔ: "le ŋutinya siwo woɖe fia la te"

Akpa 1 ɖe eme be ɖaseɖigbalɛ aɖe ɖe kpe edzi be ɖoɖonu la de specification la dzi *le ŋutinya siwo woɖe fia la te*, eye menye "ŋuɖoɖo aɖeke magava o" o. Zcash ƒe ƒome la de nyateƒe sia fia kɔkɔe, eye nuŋlɔŋlɔ si fia nu nyuie ele be wòawɔ nenema hã.

Ɖaseɖigbalɛ la tsɔ Ironwood ƒe dedienɔnɔ de cryptography ƒe ŋutinya siwo wokɔ ŋkɔ eye wonya nyuie ƒe xexlẽ vi aɖe me. Vevi ŋutɔ, eƒe nyuityo le **discrete logarithm problem** ƒe sesẽ le elliptic curve si Ironwood tsɔna dzi (ŋutinya si wosrɔ nyuie, afi si attack si wanya fifia nyuie wu la anɔ operation `2^126` ƒe ha me, si wu computation sia computation si ate ŋu awɔ dɔ la), kple hash function ƒe standard modeling ŋutinyawo. Mɔkpɔtɔ eve le be woagblɔ kɔkɔe:

- **Ele anyi le cryptography ƒe ŋutinya mawo te.** Ne ŋutinya gɔmedzedzetɔ aɖe gbã la, laylaylala la maganɔ anyi o. Esia nye nu si wonya eye womate ŋu awɔ vovo o; cryptography si wotsɔ le dɔ me geɖe le ŋutinya mawo dzi.
- **Eku ɖe balansi ƒe blibododo ŋu, menye ɣaɣla [privacy] ŋu o.** Ɖaseɖigbalɛ la ku ɖe supply ƒe nyuityo (ga gblẽ aɖeke o) ŋu. Meɖe claim be woɖe kpe edzi tso gaƒuƒoƒo la ƒe ɣaɣla ƒe laylaylala bubuwo ŋu o, elabena wo nye nɔnɔ bubu siwo hia argument bubuwo.

Le teƒe si mɔkpɔtɔ mawo ƒe ŋkɔɖeɖe anɔ dɔ la dom ɖe megbe la, eyae wɔe be woate ŋu akpɔ dzideƒo le eŋu. Claim la le kɔkɔe: *le cryptography ƒe standard ŋutinyawo te la, gaƒuƒoƒo sia mate ŋu awɔ ga gblẽ si ame mate ŋu akpɔ o.* E nye theorem, menye mɔkpɔkpɔ o, eye eƒe mɔkpɔtɔwo katã le eme kɔkɔe.

![alt text](image-4.png)

---

## 7. Ale si woɖe gaƒuƒoƒo xoxo la ɖe zɔzɔ me dedie: gaɖoɖowo ƒe xexlẽdzikpɔɖeƒe

Ne woɖe kpe edzi be gaƒuƒoƒo *yeye* la sɔ hã la, biabia aɖe gali: nu ka ku ɖe Orchard ƒe gaƒuƒoƒo xoxo la ŋu, afi si vodada la nɔ le ƒe ene me? Mètɔ ate ŋu aɣla nu si va yi la ɖe o. Ke wòate ŋu ade mɔkpɔtɔ eƒe etsɔme ŋu.

Zcash tsɔ mechanism aɖe va si woyɔna be **gaɖoɖowo ƒe xexlẽdzikpɔɖeƒe**. Se la le bɔbɔe eye eƒe ŋusẽ gã:

> Asixɔxɔ ate ŋu ado go tso gaƒuƒoƒo xoxo la me va se ɖe asixɔxɔ si woate ŋu aɖe kpe edzi be ge eme la ƒe ha dzi ko.

Elabena ga si ge eme eye wòado go tso ɣaɣla gaƒuƒoƒo me la le ame sia ame ƒe kpɔkpɔ me (dɔwɔwɔ si le *eme* ko woɣlana), gaɖoɖowo ƒe xexlẽdzikpɔɖeƒe la na network katã ate ŋu akpɔ be nu si do go la megava yɔ wu nu si ge eme kpɔ o. Ne womie ga gblẽwo le gaƒuƒoƒo xoxo la me la, woava dze mɔkpɔtɔ sia ŋu eye woate ŋu ado go o. Eye esi ga nyuiwo do go ɖe go eye excess aɖeke medze o la, community la xɔ ame sia ame ƒe ɖase sesẽ be wometsɔ vodada la wɔ dɔ o. E nye nu si sɔ keke kple audit si wòate ŋu awɔ na gaƒuƒoƒo si woɣla ƒe supply, esi mewɔ ɣaɣla na wɔnɔ gblẽ o, eye ena supply ƒe blibododo va ɖe transparent nuwo ƒe ʋuʋuɖi [transparent] model si ɖoɖonu aɖe abe Bitcoin ene le ŋu, esi wòle Zcash ƒe ɣaɣla ɖom ɖe eme.

![alt text](image-5.png)

Ironwood ŋutɔ hã tsɔ ɖaseɖigbalɛ circuit si woɖɔ ɖo la wɔ dɔ, edze egɔme kple gaƒuƒoƒo si me nu aɖeke mele o, eye wotsɔ mɔkpɔkpɔ siwo kpɔa nu si ate ŋu ava le ŋgɔ la gbɔe (eye wode mɔ na be gawo nanɔ mɔ na be woaxɔ wo ne quantum computer siwo ate ŋu ava le ŋgɔ la dzro egbe ƒe cryptography). ɣaɣla ƒe dɔwɔwɔ yeye la katã li yi to Ironwood me fifia, ke Orchard ƒe gaƒuƒoƒo xoxo la me le mɔ na gaɖeɖe ko.

---

## 8. Nɔnɔ gãtɔ: cryptography si woɖo dzideƒo sesẽ ɖe eŋu

Ironwood le tɔtrɔ gã aɖe me si le ale si Zcash wɔa dɔ ŋu. Eƒe nu ƒe dziyiyi [scaling] ƒe dɔ yeye (architecture aɖe si woyɔna be **Tachyon**, si woɖo ɖe recursive proofwo kple toolkit aɖe si woyɔna be **Ragu** ŋu) woɖo le filosofia aɖe si woyɔna ƒe aɖewo be **cryptography si woɖo dzideƒo sesẽ ɖe eŋu** te: be woatrɔ machine-checked formal verification, menye nu si wowɔa le nuwuwu ko o, ke boŋ wòanye akpa si wɔnɔa le cryptographic ɖoɖonu yeye ƒe wɔwɔ me ɣesiaɣi.

Logic la do ŋusẽ. Cryptography si le cutting-edge nye afi si amegbetɔ ƒe ŋutinyae gbɔdzɔ wu eye afi si edge case si mewodzra o ate ŋu aɣla le ƒe geɖe me, abe ale si Orchard fia ene. Specification ƒe kpeɖeɖe nye technique ɖeka si ate ŋu awɔ dɔ na "input bubu sia bubu" eye wòtsi gap mawo le gɔmedzedze. Ƒome la fia be eƒe tae be wòaɖe kpɔkpɔ sia ɖe teƒe geɖe ŋgɔ na ɣeyiɣi me, yi implementation la gbɔ eye yi eŋu. Mìele mɔ kpɔm be mɔlɔlɔ sia nana ame geɖe natsɔe, le Zcash me kple eƒe gota.

---

## 9. Nuxlɔ̃ame si le nyateƒe

Míeɖe nuwo bɔbɔe be woase gɔme nyuie. Lean ƒe development vavã la le nyagɔme geɖe wu sketch si le afisia, kple actionwo, statementwo, adzɔgbeɖeɖe [commitments], gaɣaɣla ɖeɖe dzesiwo [nullifiers], kple asidede agbalẽ tewo ƒe gɔmeɖeɖe siwo le kɔkɔe; "balansi ƒe blibododo" kple "nunya ƒe nyuityo" le formal definition siwo le kɔkɔe, siwo míegblɔ le nya me ko; mɔ si dzi woɖe eƒe nyuityo va de discrete-log ƒe sesẽ me la to model titina geɖe me (prover ƒe algebraic model kple hash ƒe random-oracle model) si míefia be wo nye "standard ŋutinyawo"; eye míegblɔ fingerprint kple gaɖoɖowo ƒe xexlẽdzikpɔɖeƒe le concept ƒe te ko. Esia aɖeke metrɔ nya vevietɔ la o: specification aɖe na "ga wɔnɔnɔ aɖeke o," ɖaseɖigbalɛ si makina do kpe ɖe eŋu le ledger siwo katã sɔ la ŋu, mɔkpɔtɔ kple ŋutinya siwo woɖe fia kɔkɔe eye le nyateƒe, kple gaƒuƒoƒo si vodada le eme la ƒe ɖeɖe ɖe zɔzɔ me dedie. Na nyanya si le authority la gbɔ, kpɔ Project Tachyon ƒe verification ƒe nuŋlɔŋlɔ siwo woɖe go kple `ironwood` ƒe proof repository la.

---

## 10. Nyatakakadzra

- Zcash ɖo Orchard ƒe ŋuɖoɖo la ŋu, menye kple ɖɔɔɖo ko o, ke boŋ kple **ɖaseɖigbalɛ si makina do kpe ɖe eŋu** (le **theorem 2,700 wu** le **Lean** me, si le ame sia ame ƒe kpɔkpɔ me) na eƒe **Ironwood** gaƒuƒoƒo yeye.
- Ɖaseɖigbalɛ la ɖe **balansi ƒe blibododo** kpe edzi (gaƒuƒoƒo la medana asixɔxɔ ado go wu si ge eme le ame sia ame ƒe kpɔkpɔ me o), si tu ɖe **nunya ƒe nyuityo** ŋu (ɖaseɖigbalɛ si sɔ hia be prover la nɔ witness vavã aɖe le, si woɖe kpe edzi to **extractor** aɖe me). Nunya ƒe nyuityo nye nɔnɔ si ƒe gap wɔ Orchard ƒe ŋuɖoɖo la.
- Eku ɖe **ValidLedger sia ValidLedger** ŋu, menye case si woɖo kpɔ o, eye esiae tsi ga wɔnɔnɔ ŋuɖoɖo si woɣla la ƒe ƒome, si dodokpɔ mekpɔ o, ɖe tɛ̃.
- Woɖo gap si le mathematics kple software dome la ŋu kple **fingerprint** ƒe mɔkpɔtɔ: ɖaseɖigbalɛ la tsi ŋuɖoɖo siwo ame mate ŋu akpɔ o, eye implementation ƒe tɔtrɔ aɖeke ado go **le ame sia ame ƒe nuŋlɔɖi si nɔa anyi tegbee me**.
- Woɖe laylaylala la ƒe gɔme kɔkɔe: ele anyi le **discrete-log ƒe sesẽ kple standard hash ŋutinyawo te**, eye eku ɖe **ga wɔnɔnɔ ŋu, menye ɣaɣla ŋu o**. Nyateƒe sia nye nyuiɖoɖo, menye gbɔdzɔgbɔdzɔ o.
- **Gaɖoɖowo ƒe xexlẽdzikpɔɖeƒe** la ɖe gaƒuƒoƒo xoxo la ɖe zɔzɔ me dedie, esi wode mɔkpɔtɔ eƒe gaɖeɖewo ŋu be woanɔ eƒe deposit siwo woate ŋu aɖe kpe edzi la ƒe ha me, si fia ga gblẽ aɖeke eye wòtsɔ ame sia ame ƒe ɖase tso supply ƒe blibododo ŋu.
- Ironwood fia mɔzɔzɔ yi **cryptography si woɖo dzideƒo sesẽ ɖe eŋu** ŋu, afi si formal verification nye akpa si wɔnɔa ɣesiaɣi le cryptographic ga yeye ƒe wɔwɔ me.

---

## Gbegbe ƒe gɔmeɖeɖewo

| Nya | Eƒe gɔme le English bɔbɔe me |
|---|---|
| **Ironwood** | Zcash ƒe ɣaɣla gaƒuƒoƒo yeye (2026), si xɔ teƒe na Orchard ƒe gaƒuƒoƒo si vodada le eme |
| **Balance integrity** | Gaƒuƒoƒo la medana asixɔxɔ ado go wu si ge eme le ame sia ame ƒe kpɔkpɔ me o |
| **Knowledge soundness** | Ɖaseɖigbalɛ si sɔ hia be prover la nɔ witness vavã aɖe le |
| **Extractor** | Mɔ aɖe si hea witness la do go tso prover si wɔa dzideƒo me |
| **Lean** | Proof assistant si wotsɔ na makina be wòakpɔ verification la |
| **ValidLedger** | Gbebbɔgblɔ ɖi ƒe sewo ƒe formal model si theoremwo susu eŋu |
| **Fingerprint** | Mɔkpɔtɔ si le mathematics si woɖe kpe edzi kple Rust software si le dɔ wɔm la dome |
| **Under stated assumptions** | Ɖaseɖigbalɛ la le anyi ne cryptographic ŋutinya siwo woŋlɔ ŋkɔ la le anyi |
| **Turnstile** | Se aɖe si de mɔkpɔtɔ gaƒuƒoƒo ƒe gaɖeɖewo ŋu be woanɔ eƒe deposit siwo woate ŋu aɖe kpe edzi la ƒe ha me |
| **High-assurance cryptography** | Crypto ƒe wɔwɔ kple formal verification abe afɔ si wɔnɔa ɣesiaɣi ene |

---

## FAQ

**Ɖaseɖigbalɛ la gɔme be Ironwood me ŋuɖoɖo aɖeke mele oa?**
Ao, eye meclaim be enɔ nenema o. Eɖe nɔnɔ kɔkɔe ɖeka, balansi ƒe blibododo, kpe edzi le ŋutinya siwo woɖe fia la te. Esia tsi ga wɔnɔnɔ si ame mate ŋu akpɔ o, menye ŋuɖoɖo sia ŋuɖoɖo si ate ŋu anɔ o.

**Ɖaseɖigbalɛ la ɖe kpe edzi be nye gaɖoɖowo le ɣaɣla oa?**
Ao. Verification la ku ɖe supply ƒe nyuityo (ga gblẽ aɖeke o) ŋu, menye gaƒuƒoƒo la ƒe ɣaɣla ƒe laylaylala bubuwo ŋu o. Woɖea kpe ɖe woŋu to mɔ bubuwo me.

**Nu ka ta woaxɔ dzideƒo le ɖaseɖigbalɛ si amegbetɔwo (kple AI) ŋlɔ me?**
Elabena makina doa kpe ɖe eŋu. Lean proof assistant la kpɔa afɔ sia afɔ le mɔ machine me, eye dzideƒo la tu ɖe specification la kple ŋutinya siwo woŋlɔ ŋkɔ la ŋu, menye amegbetɔ alo AI aɖe ƒe nyanyui le afɔ sia afɔ me o.

**Nu ka dzɔa na ga siwo gale Orchard ƒe gaƒuƒoƒo xoxo la me?**
Woate ŋu aɖe wo, ke woaɖe wo va se ɖe asixɔxɔ si woate ŋu aɖe kpe edzi be ge eme la ƒe ha dzi ko, si gaɖoɖowo ƒe xexlẽdzikpɔɖeƒe la wɔa dɔe. Esia kpɔ supply ƒe blibododo eye wòkpe ɖe eme be woafia be wodzra vodada xoxo la me o.

**Esiae nye nya la ƒe nuwuwu oa?**
E nye mɔɖoɖo gã aɖe, menye nuwuwu o. Zcash ƒe architecture si ava le ŋgɔ (Tachyon, kple Ragu toolkit la) le wɔwɔm kple formal verification abe mɔwɔwɔ si wɔnɔa ɣesiaɣi ene, si atsɔ mɔ sia ayi teƒe geɖe.

---

### Ɖo kpɔ wò ƒe gɔmesese

Ame aɖe gblɔ be: "Esi woɖe kpe ɖe Ironwood ŋu le formal mɔ me la, fifia nu aɖeke mate ŋu azɔ vɔ̃ na Zcash o." Tsɔ susu tso akpa etɔ̃awo katã me, na ta vovovo eve si ta claim ma sesẽ akpa.

<details><summary>Ŋuɖoɖo</summary>

Gbãtɔ, ɖaseɖigbalɛ la ku ɖe nɔnɔ *kɔkɔe* aɖe (balansi ƒe blibododo) ŋu le *ŋutinya siwo woɖe fia* te (discrete-log ƒe sesẽ kple standard hash ƒe modeling). Ne cryptographic ŋutinya aɖe gbã, alo ne kuxi aɖe do go le nu si woɖe gɔme mekpɔ o (kpɔe be le ɣaɣla me, le gakotoku software me, alo le component aɖe si woɖe kpe edzi o me), ɖaseɖigbalɛ la megblɔ naneke tsoe ŋu o. Evelia, formal verification ɖe kpe edzi be ɖoɖonu la de *specification si woŋlɔ la* dzi; ne specification la ŋutɔ mekpɔ requirement vavã aɖe ɖe eme o la, ɖaseɖigbalɛ la aɖe nu si mesɔ o kpe edzi nyateƒe. Nu eveawo katã nye Akpa 1 ƒe nuxlɔ̃ame si woɖo ŋku edzi: ɖaseɖigbalɛ le kɔkɔe eye eƒe mɔkpɔtɔwo le, eye eƒe ŋusẽe nye be eƒe scope le nyateƒe, menye laylaylala gbogblɔ be nu aɖeke mate ŋu azɔ vɔ̃ o.
</details>

---

### Mama la, bliboe

Le akpa etɔ̃awo me míetso susu gbogblɔ aɖe yi dɔwɔwɔ si le agbe me: nu si wògɔme na be woa**ɖe kpe** ɖe software ƒe nyuityo ŋu le teƒe si woadoe kpɔ (Akpa 1), ale si circuit aɖe si me wodzra ɖeɖe ɖe eme akpa o ate ŋu awɔ ga si ame mate ŋu akpɔ o (Akpa 2), kple ale si ɖaseɖigbalɛ si makina do kpe ɖe eŋu tso **balansi ƒe blibododo** ŋu ɖe ŋuɖoɖo ƒome ma ɖe zɔzɔ me tegbee (Akpa 3). Nya ɖeka, si le nyateƒe, doe ƒo wo katã: menye "ŋuɖoɖo aɖeke o" o, ke boŋ "nɔnɔ kɔkɔe sia le case sia case me, le ŋutinya siwo woɖe fia la te." Na ga si ɣla eŋutɔ ƒe asixɔxɔwo, ŋugbedodo siae nye si le vevie be woaɖe kpe ɖe eŋu.

*Akpa le* Formal Verification *mama la me na [ZecHub](https://zechub.org).*
