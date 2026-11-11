<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Post_Quantum_Security.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Aɖe Axɔta"/>
</a>

# Quantum Ƒe Dzesidzedze Le Zcash Me

## TL;DR

- Quantum kɔmpiutawo nye afɔmevi ƒe afɔku elabena woate ŋu agbã public-key cryptography si gaɖoɖowo ƒuƒoƒo ƒe ɖoɖonuwo zazã egbea.
- "Post-quantum" fia cryptography si wɔa dɔ le kɔmpiuta mamlɛawo dzi, gake wowɔe be wòatsi tsitre ɖe quantum kɔmpiutawo ƒe afɔmevi ƒe aʋawɔwɔ ŋu.
- Zcash menye post-quantum bliboa egbea o.
- Ɣaɣla [shielded] Zcash ɖea gaɖoɖo ƒe nyatakaka si le ŋkeke me be afɔmevi ƒe aʋawɔlawo nasrɔ la dzi, gake ɣaɣla zazã menye quantum ƒe aʋawɔwɔ ƒe tsitrenyawo bliboa o.
- Zcash le ɖoɖo wɔm to srɔ̃srɔ̃, ZIP-wo, kple mɔ̃ ƒe sewo trɔtrɔ [network upgrade] ƒe aɖaŋuwo me, abe ZIP 2005 kple Project Tachyon ene.
- Post-quantum ƒe dzodzro nyui aɖe le be wòakpɔ ga, ɣaɣla [privacy], gakotokuwo, gatrɔƒewo, kple gbegbɔgblɔ ɖi [consensus] ƒe sewo katã ɖe anyigba ɖeka dzi.

Ne wòdi be yeanya nu si Ironwood trɔ kple ɣeyiɣi ƒe nɔnɔ si le akpa sia akpa ŋu la, kpɔ [Esia Zcash Nye Post-Quantum?](/zcash-tech/is-zcash-post-quantum).

## Nu Nenye Quantum Kɔmpiuta Wɔwɔ?

Kɔmpiuta mamlɛ aɖe dzraa nyatakaka le bits me. Bit ɖeka sia ɖe nye `0` alo `1`.

Quantum kɔmpiuta zãa quantum bits, si woyɔna be qubits. Woate ŋu azã qubits kple algorithm tɔxɛwo be woaɖɔ matematiki ƒe kuxi aɖewo kpɔ kabakaba akpu wu kɔmpiuta mamlɛwo.

Esia menye be quantum kɔmpiuta kabakaba wu nu sia nu me o. Afɔku la le teƒe tɔxɛ aɖe. Cryptography aɖewo tsɔ ɖokuinyenye matematiki si sesẽ na kɔmpiuta mamlɛwo, gake si bɔbɔe wu na quantum kɔmpiuta si hãnyuie.

Na gaɖoɖowo ƒuƒoƒo ƒe ɖoɖonuwo la, kpɔɖeŋu vevi ŋutɔe nye public-key cryptography. Wozã public keys kple asidede agbalẽ te [signature]-wo be woaɖe kpe edzi be mɔ le mɔ̃zãla aɖe si be wòazã gaawo.

## Nu Tae Gaɖoɖowo Ƒuƒoƒo Ƒe Ɖoɖonuwo Hia Esia

Gaɖoɖowo ƒuƒoƒo ƒe ɖoɖonuwo zãa cryptography na dɔ vovovowo:

| Cryptography ƒe dɔwɔnu | Nu si wòwɔ | Quantum ƒe ŋusẽ |
| --- | --- | --- |
| Digital signatures | Ɖe kpe edzi be ga ƒe nownerla de mɔ ga zazã | Afɔku gã na elliptic-curve ƒe ɖoɖowo si wozã zi geɖe |
| Hash functions | Wɔa gaɖoƒe ƒe dzesiwo, adzɔgbeɖeɖewo, Merkle ƒe atiwo, kple biabiawo | Afɔku le eŋu sue, gake dzesidzedze ƒe mɔwo le vevie |
| Zero-knowledge proofs | Ɖe kpe edzi be ɣaɣla gaɖoɖowo le nyuie, ne menya nyatakakaawo o | Etsɔ ɖaseɖigbalɛ [proof] ƒe ɖoɖo kple eƒe ɖoɖoɖiwo |
| Key agreement | Kpe ɖe gakotokuwo ŋu be woaɣaɣlaŋlɔŋlɔ didienu ƒe nyatakaka na xɔlawo | Ele be woakpɔe nyuie le quantum ƒe afɔku ƒe kpɔɖeŋu te |

Quantum kɔmpiuta si ŋusẽ le adekuku ate ŋu ado afɔku signature ƒe ɖoɖo geɖe si wozã egbea, eye elliptic-curve signatures hã le eme. Esia le vevie elabena signature enye nu si na network la nya be gaɖoɖo aɖe xɔ mɔ tso key si dze o me.

Hash functions vovoe. Grover ƒe algorithm ate ŋu akpɔ kabakaba le brute force didi me, gake megbãa hash functions abe ale si wògbãa wo bubu ene o. Dzesidzedze ƒe mɔ gãwo ate ŋu akpe ɖe ŋu.

## Nu Nenye Post-Quantum Cryptography?

Post-quantum cryptography nye cryptography si wowɔ be wòanɔ dedie tso kɔmpiuta mamlɛwo kple quantum kɔmpiutawo si ava me ŋu.

Menye be cryptography la zãa quantum kɔmpiuta o. Egbea be ɖoɖo la tsɔ matematiki ƒe kuxi bubuwo si sesẽ.

Le 2024 me la, NIST ɖe post-quantum ƒe dzadzra se gbãtɔwo si wowu wɔnɛ:

- **ML-KEM** na key ƒe ɖoɖo
- **ML-DSA** na digital signatures
- **SLH-DSA** na hash-based digital signatures

Sewo siawo nye mɔzɔzɔ gã aɖe, gake gaɖoɖowo ƒuƒoƒo ƒe ɖoɖonu aɖe mate ŋu atrɔ algorithm ɖeka yi bubu me le zã ɖeka me o. Ele be woabui gbegbɔgblɔ ɖi ƒe sewo, gakotokuwo, asikplɔwo dzra mɔwo, gaɖoɖo ƒe lolome, adzɔwo, kple ɣaɣla katã.

## Ale Si Quantum Ƒe Afɔku Ɖea Eɖokui Ɖe Ɖoɖonu Dzi

Mɔ bɔbɔe aɖe si wòate ŋu abu afɔku lae nye:

1. Mɔ̃zãla aɖe wɔa key ƒe pair.
2. Public key alo signature ƒe nyatakaka ate ŋu adze ɖoɖonu dzi [on-chain].
3. Quantum ƒe aʋawɔla si ava me ate ŋu azã nyatakaka sia si le amewo ƒe ŋku me be wòanya private key la.
4. Ne key sia kpɔa dzi le gaawo ŋu hafi la, afɔku ate ŋu anɔ wo ŋu.

Nuwo ƒe ʋuʋuɖi [transparent] gaɖoɖowo ƒuƒoƒo ƒe ɖoɖonuwo ɖea nyatakaka geɖe fia ɖe wɔnɔnɔ me. Gaɖoƒe ƒe dzesiwo, ga ƒe kadodo, kple gaɖoɖo ƒe kadodowo le amewo ƒe ŋku me. Public key ƒe nyatakaka hã ate ŋu adze ŋkume ne wozã gaawo.

Esiae nye ta ɖeka si megaɖoƒe ƒe dzesi azã zi evelia gbegblẽ o. Azã zi eveli nana nyatakakpɔlawo kpɔ nyatakaka geɖe be woakplɔeƒo egbea, eye wòna afɔmevi ƒe aʋawɔlawo hã kpɔ xoxo ƒe nyatakaka geɖe be woasrɔ̃.

## Nu Nenye Tɔxɛ Le Zcash Ŋu?

Zcash kplɔa nuwo ƒe ʋuʋuɖi kple ɣaɣla gaɖoɖowo siaa.

Nuwo ƒe ʋuʋuɖi Zcash wɔa dɔ abe Bitcoin ƒe public blockchain zazã ene. Gaɖoƒe ƒe dzesiwo, ga ƒe kadodo, kple gaɖoɖo ƒe kadodowo le amewo ƒe ŋku me.

Ɣaɣla Zcash vovoe. Ɣaɣla gaɖoɖowo zãa zero-knowledge proofs be network la nakpɔe be gaɖoɖo aɖe le sewo dometɔ, ne menya dɔla, xɔla, alo ga ƒe kadodo o.

Esia naa Zcash ɣaɣla ƒe nyonyo vevi aɖe:

- Wometsɔ gaɖoɖo ƒe nyatakaka geɖe doa amesia ame ƒe ŋkume o.
- Mɔ̃zãlawo mewɔa public fexexe [payment] ƒe kadodo o ne wonɔ ɣaɣla me.
- Afɔmevi ƒe nyatakpɔlawo akpɔ public ga ƒe xoxo nyatakaka sue be woasrɔ̃.
- Nyatakaka tɔxɛ ɣaɣla [selective disclosure] ate ŋu ava to nukpɔsafuiwo [viewing key] me le public-by-default ƒe rekordwo teƒe.

Gake ɣaɣla Zcash menye post-quantum le eɖokui ŋu tɔ o. Gaƒuƒoƒowo [pool] si le ɣaɣla me hã tsɔ cryptography ƒe ɖoɖoɖiwo. Ga zazã ƒe mɔɖeɖe, didienu ƒe adzɔgbeɖeɖewo, gaɣaɣla ɖeɖe dzesiwo [nullifier], proof ƒe ɖoɖowo, ɣaɣlaŋlɔŋlɔ [encryption], kple gakotoku ƒe keys katã hia kpɔkpɔ nyui.

Nya vevie lae nye:

> Ɣaɣla zazã ɖea public ƒe nyatakaka ƒe dedeɖe dzi, gake Zcash gale be wòawɔ post-quantum mɔ̃ ƒe sewo trɔtrɔ ɖe eɖokui ŋu.

## Zcash Ƒe Afɔku Ƒe Map

| Teƒe | Gɔmesese na amesi wòle gɔme srɔm | Post-quantum ƒe dziku |
| --- | --- | --- |
| Nuwo ƒe ʋuʋuɖi gaɖoƒe ƒe dzesiwo | Public gaɖoƒe ƒe dzesiwo kple public gaɖoɖo ƒe kadodo | Afɔku si sɔ kple nuwo ƒe ʋuʋuɖi gaɖoɖowo ƒuƒoƒo ƒe ɖoɖonu bubuwo |
| Ga zazã ƒe mɔɖeɖe | Ɖase be mɔ le mɔ̃zãla aɖe si be wòazã ga | Signature ƒe ɖoɖowo ate ŋu ahiã trɔtrɔ alo dzodzro |
| Ɣaɣla didienuwo | Ga ƒe rekord si woɣaɣla le ɣaɣla gaƒuƒoƒowo me | Akpa aɖewo ate ŋu ahiã ɖoɖoɖi yeye alo dzodzro ƒe dɔwɔnuwɔ |
| zk-SNARKs | Ɖaseɖigbalɛwo si fia be ɣaɣla gaɖoɖowo le nyuie | Ele be woakpɔ proof-system ƒe ɖoɖoɖiwo nyuie |
| Gakotoku ƒe scanning | Ale si gakotokuwo di kple ɣaɣlaŋlɔŋlɔ didienuwo si woɖo ɖa | Key agreement kple didienu ƒe ɣaɣlaŋlɔŋlɔ hia kpɔkpɔ |
| Dzodzro | Ga ƒe wɔnɛ yi cryptography si dedie wu me | Ele be wòatsi ga ƒe vuvɔ kple ɣaɣla ƒe dedeɖe siaa ŋu |

## Ale Si Zcash Le Ɖoɖo Wɔm

### Zcash Ƒe Mɔ̃ Ƒe Sewo Trɔtrɔ Ƒe Mɔ Le Esi

Zcash trɔ eƒe cryptography kpɔ xoxo. Sapling wɔ ɣaɣla gaɖoɖowo ƒe zazã bɔbɔe wu. NU5 ɖe Orchard, Unified Addresses, kple Halo 2 fia.

Esia le vevie elabena post-quantum ƒe dzadzra menye software ƒe patch si wòle ɖeka ko ƒe nyagbegbe o. Ehie network ƒe mɔ̃ ƒe sewo trɔtrɔ si wode ɖeɖe, gakotoku ƒe tɔtrɔwo, kpɔkpɔwo, kple ɣeyiɣi na mɔ̃zãlawo be woatrɔ.

Zcash ƒe mɔ̃ ƒe sewo trɔtrɔ si va yi fia be ecosystem la kpɔ xɔse le cryptography xoxo ƒe dzodzro yi ɖoɖo yeyewo gbɔ.

### Halo Kple Orchard Ɖe Ɖoɖoɖi Xoxowo Dzi

Halo 2 le Orchard me, si nye Zcash ƒe ɣaɣla gaƒuƒoƒo yeye. Ɖeɖeɖe vevi aɖe nye be Halo ɖe mɔ̃ ƒe ɖoɖo xexlẽnuwo [trusted setup] ƒe hiahiã ɖa le Orchard proof system la me.

Esia menye post-quantum dzesidzedze o. Gake ele vevie elabena wòfia be Zcash ate ŋu atrɔ cryptography ƒe ɖoɖo veviwo ne ɖoɖo nyuiwo li.

### ZIP 2005 Tsɔ Dzodzro Le Quantum Ƒe Ŋu

ZIP 2005 ƒe tanyae nye "Orchard Quantum Recoverability." Eɖo tɔtrɔwo ɖe anyi si wòwɔ be woakpe ɖe Orchard ƒe mɔ̃zãlawo ŋu be woatsɔ woƒe gaawo ava alo woatrɔ woƒe gaawo ne quantum ƒe aʋawɔwɔ ɖe ɖoɖoɖi xoxowo ŋu wɔa dɔ.

Dzodzro menye post-quantum dzesidzedze bliboa o. Enye nu sue wu, gake ewɔ dɔ:

- Post-quantum dzesidzedze bliboa dina be quantum ƒe aʋawɔwɔwo nanɔ dɔ wɔm o.
- Dzodzro naa mɔ nyui wu mɔ̃zãlawo si wɔa nu nyuie ne cryptography xoxo la meganye dedie o.

Na amesi wòle gɔme srɔm la, bui abe mɔ si wòato dogo le fũ me ene. Menye be wòtrɔ xɔ la katã o, gake ekpe ɖe amewo ŋu be woato xɔ xoxo la me dedie ne mɔtrɔ ƒe gaƒoɖeɖe la gbɔ.

### Project Tachyon Kpɔa Mɔ̃ Ƒe Ɖoɖo Gãwo Ƒe Ŋgɔ

Project Tachyon nye Zcash ƒe mɔ̃ ƒe sewo trɔtrɔ aɖe si wogblɔ be wòtsɔe do ŋgɔ le scale, sync, kple state ƒe dzidzi ŋu. Eƒe public site gblɔ be aɖaŋu la dina be wòana gaɖoɖowo nasue, wòadzɔ validator ƒe state ƒe dzidzi dzi, eye wòaxɔ post-quantum ɣaɣla bliboa abe side effect ene.

Elabena Tachyon nye aɖaŋu aɖe la, gale be engineering ƒe dɔ, kpɔkpɔ, kple community ƒe xɔseva nanɔ anyi hafi woawɔe. Nyui wu be wòasee abe Zcash ƒe srɔ̃srɔ̃ kple mɔ̃ ƒe sewo trɔtrɔ ƒe mɔ si le dɔ wɔm ene, menye abe nu si mɔ̃zãlawo xɔ egbea xoxo ene o.

### Srɔ̃srɔ̃ Kple Sewo Le Zɔzɔm

Cryptography ƒe xexeame katã hã le zɔzɔm. NIST ƒe post-quantum sewo naa ɖoɖonu wɔlawo ɖoɖo nyuiwo na signatures kple key ƒe ɖoɖo. Zero-knowledge ƒe nyatakaka srɔ̃lawo gale proof ƒe ɖoɖowo srɔm si ate ŋu atsitre ɖe quantum ƒe ɖoɖoɖiwo ŋu.

Zcash ate ŋu axɔ vi tso dɔ sia me, gake ele be wòatrɔe na gaɖoɖowo ƒuƒoƒo ƒe ɖoɖonu si kpɔa ɣaɣla ŋu.

## Mɔ̃ Ƒe Sewo Trɔtrɔ Ƒe Mɔ Siwo Ate Ŋu Ava Me

### Post-Quantum Ga Zazã Ƒe Mɔɖeɖe

Zcash ate ŋu ahiã ga zazã ƒe mɔɖeɖe si metsɔ quantum ƒe afɔku ƒe signature ɖoɖowo o le ŋgɔ.

Esia ate ŋu azã post-quantum signatures, hybrid signatures, alo ɖoɖo bubu aɖe. Hybrid ɖoɖo zãa classical kple post-quantum ƒe kpɔkpɔ siaa le tɔtrɔ ƒe ɣeyiɣi aɖe me, ale be ɖoɖo la magbɔ ɖoɖoɖi ɖeka ko ŋu o.

Kuxi lae nye lolome kple asi. Post-quantum signatures ate ŋu agã wu signatures si le egbea, eye esia ɖea gaɖoɖo ƒe lolome, bandwidth, adzɔwo, mobile gakotokuwo, kple asikplɔwo dzra mɔwo ŋu.

### Gaɖoƒe Ƒe Dzesi Kple Key Ƒe Ɖoɖo Yeye

Cryptography yeye hia keys kple gaɖoƒe ƒe dzesi yeye zi geɖe. Ele be mɔ̃zãlawo nakpɔ mɔ rõ ŋutɔ si woato atrɔ tso ɖoɖo xoxowo me yi ɖoɖo dedie wuwo me.

Dzodzro la le be wòabɔbɔ le gakotokuwo me. Mɔ̃zãlawo katã mele be woase cryptography ƒe nyatakaka siaa hafi woanɔ dedie o.

### Dzodzro Si Kpɔa Ɣaɣla Ŋu

Dzodzro nye nu si hia kpɔkpɔ ŋutɔ na Zcash. Ne mɔ̃zãlawo geɖe wɔa ga ƒe trɔtrɔ tso gaƒuƒoƒo xoxowo me yi yeyewo me le mɔ si dze ŋkume me la, dzodzro la ŋutɔ ate ŋu aɖe nyatakaka fia.

Dzodzro ƒe aɖaŋu nyui le be wòakpɔ:

- Mɔ̃zãla ƒe ga
- Mɔ̃zãla ƒe ɣaɣla
- Gakotoku ƒe sɔsɔ
- Gatrɔƒe ƒe kpekpeɖeŋu
- Asikplɔwo dzra mɔ ƒe kpekpeɖeŋu
- Network ƒe gbegbɔgblɔ ɖi ƒe dedienɔnɔ

### Post-Quantum Proof System Ƒe Kpɔkpɔ

Signature ƒe trɔtrɔ ko mede eme o. Zcash ƒe ɣaɣla ƒe ɖoɖo hã tsɔa zero-knowledge proofs kple adzɔgbeɖeɖewo.

Dɔ si ava me ate ŋu ahiã be woakpɔ alo woatrɔ:

- zk-SNARK ƒe ɖoɖoɖiwo
- Polynomial ƒe adzɔgbeɖeɖewo
- Fiat-Shamir ƒe biabia ƒe hashes
- Didienu ƒe adzɔgbeɖeɖewo
- Gaɣaɣla ɖeɖe dzesi ƒe wɔwɔ
- Merkle ƒe ati ƒe ɖoɖoɖiwo
- Didienu ƒe ɣaɣlaŋlɔŋlɔ kple nukpɔsafui ƒe nɔnɔ

Akpa aɖewo ate ŋu anyo ne woatrɔ parameters. Akpa bubuwo ate ŋu ahiã ɖoɖo yeye.

## Kpɔɖeŋuwo Na Ametsi Wòle Gɔme Srɔm

### Kpɔɖeŋu 1: Gaƒoɖeɖe Xoxo

Bu safe aɖe si ƒe gaƒoɖeɖe sesẽ egbea. Dɔwɔnu yeye si woava wɔ le afɔmevi ate ŋu aʋu gaƒoɖeɖe xoxo sia kabakaba.

Post-quantum cryptography sɔ kple gaƒoɖeɖe ƒe trɔtrɔ yi ɖoɖo si womebu be dɔwɔnu yeye la agbãe o me.

Na gaɖoɖowo ƒuƒoƒo ƒe ɖoɖonu aɖe la, gaƒoɖeɖe ƒe trɔtrɔ sesẽ elabena gakotoku, ɣaɣla dzesi ŋɔŋlɔ [node], gatrɔƒe, kple asikplɔ ƒe dɔwɔnu siaa le be woase ɖoɖo yeye la.

### Kpɔɖeŋu 2: Receipt Ƒe Aɖaka Si Le Amewo Ƒe Ŋkume

Nuwo ƒe ʋuʋuɖi gaɖoɖowo ƒuƒoƒo ƒe ɖoɖonu ƒe nyatakaka sɔ kple receipt siaa ƒe tsɔtsɔ de aɖaka si le amewo ƒe ŋkume me tegbee. Ne ameke mate ŋu ale pattern siaa egbea o hã la, afɔmevi ƒe dɔwɔnuwo ate ŋu asrɔ̃ nu geɖe emegbe.

Ɣaɣla Zcash dina be wòageɖe receipt siawo ƒe tata ɖe amewo ƒe ŋkume le gɔmedzedze me. Esia kpe ɖe ɣeyiɣi didi ƒe ɣaɣla ŋu, gake gaƒoɖeɖe si kpɔa ɣaɣla ɖoɖo la ŋu la hia kpɔkpɔ na quantum ƒe afɔmevi.

### Kpɔɖeŋu 3: Dogo Ƒe Aɖaŋu

Dzodzro sɔ kple mɔ si wòato dogo ƒe ɖoɖo hafi dzo ava. Wòle be mègahiãe o, gake enyo wu be wòaɖoe kaba na wòawɔe le dziku me.

ZIP 2005 sɔ kple susu sia na Orchard ƒe didienuwo.

## Nu Si Mɔ̃zãlawo Ate Ŋu Awɔ Egbea

Mɔ̃zãlawo mele be woavɔ̃ o. Quantum kɔmpiuta siwo le amewo ƒe ŋkume, siwo ŋusẽ le agbã gaɖoɖowo ƒuƒoƒo ƒe ɖoɖonu ƒe cryptography si wode dzi la, mele o egbea.

Nɔnɔ nyuiwo gale kpekpeɖeŋu wɔm:

- Tsɔ ɣaɣla Zcash ƒe zazã ne wòte ŋu.
- Mègazã gaɖoƒe ƒe dzesiwo zi eveli o.
- Wɔ gakotokuwo ƒe update.
- Kplɔ Zcash ƒe mɔ̃ ƒe sewo trɔtrɔ ƒe nyatakakadzesiwo ɖo.
- Kpɔ ZIP-wo kple gakotoku ƒe mɔfiawo le dzodzro alo migration ŋu.
- Mègabu be nuwo ƒe ʋuʋuɖi ƒe dɔwɔwɔ nye ɣaɣla o.
- Mègatsɔ nyagblɔgblɔ ɖe ga trɔtrɔ ŋu o; lala mɔfia rõ tso Zcash ƒe mɔ̃ ƒe ɖoɖoŋlɔlawo kple gakotoku ƒe hatowo gbɔ.

## Kuxiwo

Post-quantum ƒe mɔ̃ ƒe sewo trɔtrɔ sesẽ na gaɖoɖowo ƒuƒoƒo ƒe ɖoɖonu siaa.

Kuxi siwo va zi geɖe ƒe:

- Keys kple signatures gãwo
- Gaɖoɖowo gãwo
- Asi gã wu na verification
- Bandwidth ƒe zazã geɖe
- Dzesidzedze ƒe kpɔkpɔ yeye
- Asikplɔwo dzra mɔ ƒe kpekpeɖeŋu
- Mobile gakotoku ƒe dɔwɔwɔ
- Gatrɔƒe kple asikplɔ-dzralá ƒe ɖoɖoƒo
- Ɣaɣla ƒe dedeɖe le dzodzro me
- Community ƒe lɔlɔ̃ ɖe gbegbɔgblɔ ɖi ƒe tɔtrɔwo ŋu

Na Zcash la, akpa si sesẽ wu menye gaawo ƒe zazã ƒe ɖeɖe ko o. Akpa si sesẽe nye be woana woazã gaawo, eye ɣeyiɣi ma ke me woakpɔ ɣaɣla si wɔa Zcash tɔxɛ la ŋu.

## Nya Ƒe Kpukpui

Quantum kɔmpiutawo ate ŋu ado afɔku cryptography aɖewo si gaɖoɖowo ƒuƒoƒo ƒe ɖoɖonuwo zãna. Post-quantum cryptography nye ɖoɖo na ɣeyiɣi didi, gake ele be woawɔe kple nyakpɔkpɔ.

Zcash menye post-quantum bliboa egbea o. Ke hã, Zcash ƒe ŋusẽ nyuiwo le eme: ɣaɣla gaɖoɖowo ɖea public ƒe nyatakaka ƒe dedeɖe dzi, network la kpɔ xɔse le cryptography ƒe mɔ̃ ƒe sewo trɔtrɔwo me, eye srɔ̃srɔ̃ si le dɔ wɔm abe ZIP 2005 kple Project Tachyon ene le quantum ƒe afɔmevi ƒe dzikuwo ŋu xoxo.

Na ametsi wòle gɔme srɔm la, susu vevi la bɔbɔe: ɣaɣla egbea ɖea afɔmevi ƒe nyatakaka ƒe dedeɖe dzi, eye mɔ̃ ƒe sewo trɔtrɔ si woawɔ kple nyakpɔkpɔ ate ŋu akpe ɖe Zcash ŋu be wòayi quantum ƒe ɣeyiɣi ƒe dzesidzedze sesẽ wu gbɔ, ne wɔmewɔme ƒe bɔbɔe mele vɔm o.

## Axɔtawo Si Ɖo Kple Esia

- [Esia Zcash Nye Post-Quantum?](/zcash-tech/is-zcash-post-quantum) - Nu si Ironwood trɔ, nu si gale amewo ƒe ŋkume, kple ɣeyiɣi ƒe nɔnɔ ƒe kplɔ̃
- [Ɣaɣla Gaƒuƒoƒowo](/using-zcash/shielded-pools) - Ale si Zcash ƒe ɣaɣla gaɖoɖowo kpɔa gaɖoɖo ƒe nyatakakawo ŋu
- [Halo](/zcash-tech/halo) - Zcash ƒe proof system si metsɔ mɔ̃ ƒe ɖoɖo xexlẽnuwo o
- [ZKP & zk-SNARKs](/zcash-tech/zk-snarks) - Ale si zero-knowledge proofs wɔa dɔ le Zcash me
- [Nukpɔsafuiwo](/zcash-tech/viewing-keys) - Ale si nyatakaka tɔxɛ ɣaɣla wɔa dɔ na ɣaɣla Zcash
- [Zcash Ɣaɣla Asset-wo](/zcash-tech/zcash-shielded-assets) - Ɣaɣla asset siwo ava me kple private asset ƒe kpekpeɖeŋu

## Nudzodzrowo

- [NIST: Post-quantum ɣaɣlaŋlɔŋlɔ ƒe se gbãtɔwo si wowu wɔnɛ](https://www.nist.gov/news-events/news/2024/08/nist-releases-first-3-finalized-post-quantum-encryption-standards)
- [NIST Post-Quantum Cryptography Project](https://csrc.nist.gov/projects/post-quantum-cryptography)
- [ZIP 2005: Orchard Quantum Recoverability](https://zips.z.cash/zip-2005)
- [Project Tachyon](https://tachyon.z.cash/)
- [Zcash Ƒe Protocol ƒe Nyatakaka](https://zips.z.cash/protocol/protocol.pdf)
- [Halo 2 Ƒe Agbalẽ](https://zcash.github.io/halo2/)
