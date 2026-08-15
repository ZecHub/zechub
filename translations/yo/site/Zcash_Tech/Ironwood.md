<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Ironwood.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Igi irin-igi

> Ironwood n ṣiṣẹ lori Zcash mainnet ni bulọọki 3,428,143, ti a nireti ni ayika Oṣu Keje 28, 2026 UTC.

Ohun tí ẹ ó mú lọ: ohun ti Ironwood yí padà, ìdí tí àbùkù owó tó wà nípamọ́ fi le koko jùlọ àti bí ìyípadà náà ṣe jẹ́ kí ẹnikẹ́ni lè fìdí rẹ̀ múlẹ̀ pé kò sí ZEC kan táa forí.

Ironwood jẹ Zcash kan. [àtúnṣe síra ẹ̀rọ](../start-here/network-upgrades), ni ifowosi NU6.3, ti o ṣe agbekalẹ adagun-odo tuntun kan pẹlu orukọ kanna. A [adágún tí a fi ọ̀pá ìdáàbòbò ṣe](../using-zcash/shielded-pools) ni awọn akojọpọ ti owo eyi ti iye ati eni duro farapamọ nipa [ìkọ̀wé-ìmọ́ òfo (zero knowledge cryptography)](../zcash-tech/zk-snarks). Ironwood exists to contain and audit a soundness bug found in the existing Orchard shielded pool, and to give the community a stronger way to check that the total supply of ZEC is honest. Its consensus rules are specified in [ZIP 258](https://zips.z.cash/zip-0258).

ìdí tí èyí fi ṣe pàtàkì. pẹ̀lú owó tó ń ṣàn bí Bitcoin, ẹnikẹ́ni lè wò ó bóyá a kò ṣẹṣẹ̣ dá ẹyọ owó kankan nípa kíka ìwé àkọsílẹ̀ gbogbo ènìyàn. owó ààbò bo iye náà, nítorí náà o ò le kàn wo nìkan. dípò ìyẹn ìlànà ìkọwéránṣá fúnra rẹ ní láti mú un dájú pé ẹnìkan kò lè ṣèdáwó lábéko àṣírí. ironwood jẹ kókó torí wọ́n rí aṣiṣe kan nínú ìdámọ̀ràn fún odò ìṣùpọ̀ Orchard. ìtúbọ̀ sí ipò gíga yìí ti dínà ìyàtọ̀ ọ̀hún àti fífún ẹnikẹ́ni lóhun lati fìdí rẹmi wípé ìpèsè ZEC ṣì jẹ́ olóòótọ. àwọn oníṣòwò sì tún sọ pé: "ìyẹn ni ohun mìíràn".

Ṣé o ṣẹ̀ṣẹ̀ ń lo Zcash? Bẹrẹ pẹlú: [Kí ni ZEC àti Zcash?](../start-here/what-is-zec-and-zcash) àti pé, [Àwọn Erékùṣù Tó Ń Wà Níbi Ààbò](../using-zcash/shielded-pools), wá padà wálé.

![Ironwood value migration flow: value leaves the Orchard pool, passes through the turnstile checkpoint, and enters the new Ironwood pool](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/ironwood-flow.png)

## Ìdí Tí Wọ́n Fi Nílò Igi Irin

Ní òpin oṣù karùn-ún ọdún 2026, olùwádìí ààbò tí ó dá wà Taylor Hornby, nígbà ìwífúnni nípa ìlànà fún àwọn ẹ̀rọ ìgbàlódé. [Àwọn Ilé Iṣẹ́ Ààbò](../zcash-organizations/shielded-labs), responsibly disclosed a soundness bug in the Orchard shielded pool. orchard je Zcash titun ti o ni aabo igbi omi nigba naa, ati pe aiṣedeede joko ninu apakan iyipo elliptic-curve ti agbegbe oye odo rẹ, eyiti o lo awọn ohun elo iṣakoso agbara lati ṣe atunṣe idaduro fun lilo owo onihoho lori ẹrọ iṣowo wọn. [Halo](../zcash-tech/halo) 2 ètò ìwádìí.

1. Àṣìṣe ìmúṣẹ túmọ̀ sí pé ìṣirò tó fi hàn wípé àdéhùn kan jẹ́ ojúlówó kò ṣe ìdánilójú rẹ ní kíkún.
2. Ní èrò, aṣekúpani lè lo àléébù náà láti fi ṣe iye tí kò bá tọ́ nínú Orchard pool kí ó sì ná owó tó jẹ́ pé kì í ṣe tiwọn gan-an, láìfi àmì kankan sílẹ̀ èyí tí òpó ìsọ̀rí kan yóò mú.
3. Ìyípadà owó Zcash ṣì ń dí iye tí ó lè kúrò ní Orchard, nítorí náà gbogbo ìtòlé́sẹẹsẹ kò le di èyí tó pọ̀ jù lọ. ṣùgbọ́n ìlànà àdììtú ti pool yìí ò tún fi dá a lójú pé ẹyọ owó kọ̀ọ̀kan tí wọ́n bá pa mọ́ nínú rẹ̀ jẹ gidi mọ́.

![The bug explained: a transaction puts in 5 ZEC, but the flawed proof still passes when 7 ZEC come out, creating 2 ZEC from nothing](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/ironwood-bug.png)

àwọn iye tí ó wà lókè yìí jẹ́ àwòrán tó rọrùn. àléébù gidi náà ni nínú apá kan pàtó ti ìṣirò ẹ̀ka, kì í ṣe ìsókè owó-ayéwálé tí ń wọlé àti jáde ní ọ̀nà òótọ́. ohun tá a fẹ́ mú kúrò níbẹ̀ nìkan ni pé kòkòrò àìlálàá lè jẹ́ kí èrè di èyí tí a dá sínú adágún láìṣe àwárí rẹ̀. bí àpẹẹrẹ: nígbàtí o bá rí i pé ẹnìkan fi nǹkan díẹ̀ pa mọ́ fún àkókò gígùn ju ẹni mìíràn lọ, ńṣe lo máa dà bíi pé òun fúnra rẹ̀ kó

O ṣe pataki, ko si ẹri pe a lo bug naa lailai, ko ni ẹri ti ipa lori awọn owo olumulo, ati pe ko si iwe-ẹri pe ipese ZEC lapapọ yipada. A rii nipasẹ iwadi aabo ati ṣatunṣe ṣaaju eyikeyi ibajẹ mọ.

## Ìdáhùn Tí Wọ́n Rí

Àwọn aráàlú Zcash fi àwọn àtúnṣe ránṣẹ́ ní ìpele dípò gbogbo wọn lẹ̀ẹ̀kan.

![Ironwood response timeline: the Orchard bug is found in May 2026, the pool is paused in June 2026, the circuit is fixed in NU6.2, and Ironwood activates around July 28, 2026](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/ironwood-timeline.png)

1. Ní ìbẹ̀rẹ̀ oṣù June 2026, ètò àbòjúṣe kan dá omi-ìmọ́ Orchard dúró nígbà tí wọ́n ń múra bí wọn yóò ṣe tún un mọ.
2. Àtúnṣe NU6.2 ṣe àtúnse sí ẹ̀ka Orchard fúnra rẹ̀, tí ó sì pa ibi ìjìnlẹ̀ tó wà nídìí.
3. Àtúnṣe NU6.3, Ironwood, ṣafihan adágún tuntun tí a fi ààbò ṣe àti ibùdó ìwádìí fún gbogbo ènìyàn kí iye lè kúrò nínú adágùn Orchard ti ó wà lábẹ́ ètò ìdánwò.

![The fix in NU6.2: the corrected proof requires inputs to equal outputs, so a valid 5 ZEC output passes while an attempt to output 7 ZEC is rejected](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/ironwood-fix.png)

## Ohun tí adágún Ironwood ń ṣe

NU6.2 ṣe idaniloju Circuit Orchard fun gbogbo awọn iṣowo tuntun, ṣugbọn iye ti a ṣẹda labẹ awọn ofin atijọ ṣi wa ni adagun-odo Orchard. Ironwood nfunni ni iye yẹn ibi iduro mimọ kan ati ọna lati ṣayẹwo bi o ṣe nrakò.

The Ironwood pool is a new shielded value pool created when NU6.3 activates. It is built on the corrected circuit and uses a quantum-recoverable note format (a design that lets funds be recovered if [àwọn kọ̀ǹpútà kọntátì](../zcash-tech/post-quantum-security) ti o ba wa ni eyikeyi akoko lati ya awọn oniwe-cryptography), a ṣalaye ninu [ZIP 2005 - Ìlú Àìníléèmọ̀.](https://zips.z.cash/zip-2005).

1. Lẹ́yìn tí wọ́n bá ti fi í síṣẹ́, àgbájọ owó Orchard tó wà tẹ́lẹ̀ á di èyí téèyàn lè lò lásán-làsàn. Nítorí náà kò ní ṣeé ṣe fún iye tuntun kankan láti wọnú rẹ̀.
2. Dípò ìyẹn, àwọn ohun iyebíye tó ṣẹ̀ṣẹ̀ di ààbò á wá máa ṣàn lọ sí Ironwood.
3. ZEC tí a fi ààbò ṣe ní àwọn ìdánilójú ìpamọ́ tó lágbára kan náà ti ó ń pa ẹni tí o ránṣẹ, olùgbà àti iye.

## Ìyípadà náà ni pé:

Èrò pàtàkì tó wà nínú Ironwood ni pé kí wọ́n máa gbé irin yí po, ìyẹn ibi tí àwọn oníṣòwò ti ń yẹ owó orí wọn wò nígbà tí wọ́n bá fẹ́ kó o kúrò ní Orchard lọ sílùú Ironwood.

> A turnstile does for hidden money what a glass door does for a bank vault. You still cannot see inside, but you can count exactly what goes in and what comes out.

1. Àwọn owó tó ń jáde kúrò ní Orchard ni a kà níbi ìwádìí tí gbogbo ènìyàn máa ń ṣe kí wọ́n tó wọnú Ironwood.
2. Èyí á jẹ́ kí ẹnikẹ́ni lè ṣàyọlò bí ZEC ṣe ń ṣí kiri tó, èyí yóò sì mú ìgbẹ́kẹ̀lé nínú àwọn ohun tí wọ́n fi ń tà.
3. Bí a bá ti dá ZEC àdàkọ kankan nípa ìdìbò tó ṣáájú, ìwé ìṣírò tí ó ń ṣe ṣíṣípò yìí ni ibi tí yóò hàn sí.

Awọn turnstiles kii ṣe tuntun si Zcash. Nẹtiwọọki ti lo wọn tẹlẹ, ni awọn aala laarin Sprout, Sapling, ati Orchard pools, nitorinaa iye gbigbe laarin awọn adagun duro ṣayẹwo ati pe ko si adagun le tu diẹ sii ju ofin lọ wọle rẹ.

Àwọn ìlànà tó wà nínú àdéhùn náà ni pé gbogbo àwọn ilé ìtajà, títí kan Ironwood, ló yẹ kó máa ní iye owó tí kò ju ti tẹlifóònù lọ. Nítorí náà, àfikún owó ò lè dín kù láé.

## Ohun tí àwọn olùṣàmúlò nílò láti ṣe

Awọn apamọwọ ati sọfitiwia node ṣe itọju pupọ julọ ti eyi laifọwọyi, ṣugbọn iyipada iṣe jẹ rọrun: ni akoko diẹ, gbe awọn ohun-ini aabo lati adagun Orchard atijọ nipasẹ turnstile sinu adagun Ironwood. Tẹle itọsọna lati ọdọ olupese apoti owo rẹ, ki o ma ṣe imudojuiwọn nigbagbogbo si igbasilẹ atilẹyin ṣaaju titiipa ifilọlẹ naa .

## Àkójọ àwọn ọ̀rọ̀

Ọ̀rọ̀-ìtumọ̀ èdè Gẹ̀ẹ́sì tó rọrùn.
|---|---|
ìdìpọ̀ tí a fi ààbò bo. Ìpín owó ti iye àti àwọn oní-ọ̀hún ni ó fara sin nípa lílo ìlànà ìkòwé ní ìmọ̀ òfo (zero knowledge cryptography).
ìṣòro ìmúṣẹ. Ìkùdíẹ̀-káàtó tí ó jẹ́ kí àdàkọ tó bá ti di aláìdára kọjá ìdánwò ẹ̀rí bí ẹni pé ó tọ̀nà ni.
Turnstile: Ibi àyẹ̀wò tí gbogbo ènìyàn ń lò láti ka iye owó tó ń lọ láàárín àwọn ìsọ̀rí kí ètò ìpèsè náà lè wà nílẹ̀.
 Spend-only: Àkójọ tí ẹ lè náwó sí, ṣùgbọ́n kò le fi iye tuntun kún un.
 Network upgrade (NU)  Aṣayan iyipada ti a ṣepọ si awọn ofin ifọkanbalẹ Zcash, ti o ṣiṣẹ ni giga bulọọki ṣeto.
Àkọlé tí a lè rí padà nínú àpò-ìwé. Ètò ìsọfúnni kan táa ṣe láti mú owó náà padà báwọn kọ̀ǹpútà kọnfúńmù tó ń lo àwọn ohun èlò ìgbàlódé yìí ti já sí ẹyọ kòkòrò àrùn, èyí sì jẹ́ kí wọ́n mọ bí wọ́n á ṣe máa fi ìwé ránṣẹ́ ní tààràtà àti bó ṣe yẹ káwọn èèyàn máa lò ó lọ láìṣe pàṣípààrọ̀ fún wọn.

## Àwọn ìbéèrè tí a sábà máa ń béèrè

ṣé ZEC mi ní ipa kankan? kò sí ẹ̀rí pé wọ́n lo àbùdá náà rí, kò sì sí ìpalára fún owó àwọn oníṣe àti pé gbogbo ohun tí wọ́n ń pèsè ò yí padà.

ṣé mo nílò láti ṣe ohunkóhun? mú kí àpò-ìpamọ́ àti software node rẹ di ìgbàlódé sí ìtúmọ̀ tí ó ní ìtìlẹyìn ṣáájú ìdènà ìgbésẹ. àpò ìṣàmúlò yín ń gbé owó lọ sínú ironwood bí àkókò ti nlọ gẹ́gẹ́ bi ẹ bá lo, nítorí náà kò si ohun kan tó yẹ kó yára fún ọ. tẹ̀lé àwọn ìlànà olùpèsè àpò òwò yín.

Is Zcash still private? Yes. Ironwood keeps the same shielded privacy that hides sender, receiver, and amount. This upgrade is about supply integrity, not privacy.

Ṣé wọ́n ti lo àbùdá náà rí? Kò sí ẹ̀rí pé ó wà. A ṣe é nípasẹ̀ ìwádìí ètò ìṣọ́ra, a tú u jáde lọ́nà tí kò léwu, àti wípé a ṣàtúnṣe rẹ kí ohunkóhun tó lè ṣèpalára kankan bá wáyé.

Kí ló ṣẹlẹ̀ sí adágún tí wọ́n ń pè ní Orchard? Ó di èyí téèyàn lè lò nìkan. Kò tún ṣeé ṣe fún àwọn nǹkan tuntun láti wọnú rẹ, àti pé iye tó wà tẹ́lẹ̀ á wá lọ sínú Ironwood látorí àgbá yípo náà, níbi tí a ti máa ṣàyèwò ìyípadà yìí lójú gbogbo ènìyàn.

## Wádìí òye rẹ wò

Bí ZEC bá wà ní inú àwọn adágún tí a fi ààbò bo, báwo ni ẹnikẹ́ni ṣe lè fìdí rẹ̀ múlẹ̀ pé kòkòrò Orchard náà ò tú gbogbo ìsọfúnni tó wà nínú wọn jáde?

<details>
<summary>Answer</summary>

Through the turnstile. Every coin leaving the old Orchard pool is counted at a public checkpoint as it enters Ironwood. If more value tried to leave than legitimately entered, the accounting would not balance, so any counterfeit the bug could have created would surface at that gate.
</details>

### Àwọn Owó-ìṣúnná owó

[ZIP 258: Ifilọlẹ ti Awọn igbesoke Nẹtiwọki NU6.3](https://zips.z.cash/zip-0258)

[ZIP 257: Deployment of the Orchard Temporary Vulnerability Mitigation and NU6.2 Network Upgrade](https://zips.z.cash/zip-0257)

[ZIP 2005: Ironwood Quantum Recoverability (Ìmúpadà Ìmúlò Ọ̀nà Àràmàǹdà)](https://zips.z.cash/zip-2005)

[Ironwood: Ìpínlẹ̀ Ààbò Tuntun fún Zcash](https://zodl.com/ironwood-a-new-shielded-pool-for-zcash/)

### Ẹ tún wo:

[Àwọn Àtúnṣe sí Ìpínlẹ̀ Zcash](../start-here/network-upgrades)

[Àwọn Erékùṣù Tó Ń Wà Níbi Ààbò](../using-zcash/shielded-pools)

[Halo](../zcash-tech/halo)

[àwọn ohun èlò tí wọ́n ń pè ní zk-SNARKS](../zcash-tech/zk-snarks)

[Ààbò Lẹ́yìn Ìwòye-ìmọ̀dá](../zcash-tech/post-quantum-security)

[Àwọn Ilé Iṣẹ́ Ààbò](../zcash-organizations/shielded-labs)

[Kí ni ZEC àti Zcash?](../start-here/what-is-zec-and-zcash)

---

Àtòjọ: [Atọka Awọn igbesoke Nẹtiwọki](../start-here/network-upgrades) · Àwọn tó ṣáájú: [NU6.2](../zcash-tech/nu6-2)
