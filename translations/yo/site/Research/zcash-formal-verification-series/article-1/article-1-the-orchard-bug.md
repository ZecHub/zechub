![alt text](image-1.png)
# The Orchard Bug: When a Proof System Has a Hole

### Bí ẹ̀ka ìṣirò kan tí kò ní ìsókè ṣe lè fi owó àìrí tó wà fún gbogbo ènìyàn ṣánlẹ̀ láìní ààlà.

> **Sẹ́ríì:** *Ẹ̀ka Ìwádìí Lóríṣèlú* · **Apá 2 nínú 3**
> ** àwùjọ:** newcomers. part 1 mu ki a mọ̀ nípa ìwádìí tí ó ṣe pàtàkì; níbí yìí, à ń rí ohun tó mú kí ọ̀rọ̀ náà jẹ́ kánjúkánjú. gbogbo nǹkan táa nílò ni wọ́n ṣàlàyé fún wa láti orí rírẹlẹ̀ lọ.
> ** Ohun tí ẹ ó fi sílẹ̀:** àwòrán tó ṣe kedere ṣùgbọ́n èyí tó péye nípa bí ètò ìdánilójú ìdìbò-ìmọ̀ lè ní ihò nínú, ohun náà gan an ni àbùdá "Orchard" Zcash 2026 jẹ́, ìdí tí irú àbùdà yìí le fara pamọ fún ọdún mélòó kan, àti ìdí ti o sì ti ṣẹlẹ̀ ṣáájú.

In Part 1 we said testing can show the presence of bugs but never their absence, and that the most dangerous bugs live in a system's *specification*, its underlying math. This article is the case study. In 2026 a flaw was found in Zcash's Orchard shielded pool that could have let an attacker create unlimited counterfeit money invisibly. It had survived four years and repeated audits. Understanding it, and its predecessors, is the clearest possible motivation for proving systems correct.

---

## 1. Kí nìdí tó fi yẹ kó o mọ̀ nípa rẹ̀?

Zcash jẹ cryptocurrency pẹlu ipo ikọkọ. Ninu adagun rẹ ti o ni aabo, awọn iye, oluranlowo ati olugbaja ti awọn iṣowo ** farapamọ**. Ikọkọ yii ni a ṣẹda nipa lilo ** ijẹrisi imọ-noleri **: ẹri cryptographic pe idunadura kan tẹriba fun gbogbo ofin, laisi fifihan akoonu idunowo naa. O le ṣe idanimọ nipasẹ titele si aaye ayelujara tabi sọfitiwia lati rii boya wọn n ṣiṣẹ daradara bi Bitcoin (BTC) tabi Ethereum (ETH).

ìmúdàgba yìí ní àwọn àléébù méjì. lórí ìwé àkọsílẹ̀ tí ó ṣe kedere bí ti Bitcoin, bí ẹnìkan bá fi owó-ayé ẹ̀rọ dá ẹyọ owó láti inú kò síbì kan, gbogbo ènìyàn ni yóò rí iye tó pọ́n sókè náà, àti pé nẹtiwọọki lè mú un kí o sì yí i padà. nínú ilé ìṣúra tí a dì bojúbojú, ńṣe làwọn nọ́ńbà wọ̀nyí máa ń fara sin nípa ìmọ̀ràn. nítorí náà bí ètò ìdánilójú fúnra rẹ̀ bá ní àìlera kan tó jẹ́ kó dà bíi wípé àdéhùn òdì lòótọ́, ìwà ayédèrú á di èyí tí wọn kì í ṣàwárí.* ìwọ kò le mọ ọ nígbàtí o yẹ ìwé àkọtọ́ wò, torí pé ìwé àkọwé ló fẹ́ pa láìsí iyèméjì.

That is exactly the risk that materialized in Orchard. To understand it, we need to look inside what a zero-knowledge proof is actually checking.

---

## 2. Èrò inú: Àmì kan tó bá yẹ kó o rí lára rẹ̀ nìkan ló lè mú kí èsì rẹ dára.

Bí àpẹẹrẹ, ká sọ pé òṣìṣẹ́ kan tó ń bójú tó ààlà orílẹ̀-èdè ti ní láti fọwọ́ sí ìwé àwọn arìnrìn-àjò láìjẹ́ kí wọ́n rí ohun tí ìwé náà jẹ́. Kàkà bẹ́ẹ̀, ńṣe ni ẹnì kọ̀ọ̀kan máa fi ìsọfúnni kún inú àkọsílẹ̀ rẹ̀.* Òṣìṣé́ yìí á sì fún ẹni yòówù lára wọn láyè kó lọ gba káàdì tàbí fóònù ẹ̀rí ìrìnnà èyíkéyìí tó bá wà nínú àkọsílẹ̀ yẹn.

Ní báyìí, ká sọ pé àlàfo pàtàkì kan ò sí nínú ìwé-ìforúkọsílẹ̀ náà, bí àpẹẹrẹ "àṣẹ ìrìnnà kò tíì dópin". Ó fẹ́rẹ̀ẹ́ jẹ́ gbogbo èèyàn ló ń fi tọkàntọkàn kún un láìṣe ohunkóhun tó dà bíi pé ó lòdì. Àmọ́ ẹni tí ìwé àṣẹ ìrìnrìn-àjò ti dópin lè *túbọ̀* tẹ àwọn àpótí yòókù kí wọ́n sì rìn kọjá lọ. Ètò yìí máa rí bó ṣe yẹ ní lílò ojoojúmọ́. Ẹnìkan ṣoṣo tó bá wá a ni ihò yẹn kàn.

Àrídájú ìmọ-òfo ṣiṣẹ́ bíi àtòjọ ìwádìí náà. Kò fi àwọn kúlẹ̀kúlẹ̀ àṣírí hàn; ó ṣàyẹ̀wò wípé wọ́n tẹjúmọ̀ sí ọ̀pọ̀lọpọ̀ ipò tí a yàn kalẹ̀. Bí wọn bá sì ti ṣàdédé yọ òdìkejì kan sílẹ̀, nígbà náà ni dídíwọ́lé àìlálàámu lè *tun* kọjá lọ, bí gbogbo nǹkan ṣe ń báa nìṣó láti dàbí ẹni tó yẹ.

Ẹ jẹ́ ká ṣe "àtòjọ àwọn ipò" ní pàtó, nítorí pé ibí náà gan-an ni kòkòrò yìí gbé.

---

## 3. Ìṣirò: àwọn àyíká, ohun tó ń dí i lọ́wọ́ àti bí wọ́n ṣe lágbára tó

Under the hood, the statement "this transaction is valid" is encoded as a **circuit**: a fixed collection of arithmetic conditions, called **constraints**, written as equations over numbers. To make a valid proof, the prover must supply secret values (the **witness**) that satisfy *every* constraint. The proof convinces a verifier that such a witness exists, without revealing it.

Ohun-ini ti a nilo lati inu eto yii ni orukọ kan:

> **Ipa:** kò gbọdọ jẹ́ kó ṣeé ṣe láti mú ẹ̀rí tó lẹ́sẹ̀ nílẹ̀ wá fún àlàyé *iró.* Àsọjáde tí ó bá jé òtítọ́ nìkan ló yẹ kí àwọn ẹlẹ́rìí rẹ̀ kúnjú ìwọ̀n gbogbo ìkálóde.

Ifá ni ìdánilójú tí ó lòdì sí èké-ìwé. Bí ifá bá dúró, ẹ̀rí tó lẹ́sẹ́ nílẹ̀ tọkàntọkàn túmọ̀ si "àdéhùn gidi kan ti o tẹ̀lé òfin wáyé". bí ìfọkànsí bá jẹ́ àlàfo, ẹri to lẹsẹ́ lè má ṣe nǹkankan rárá.

### Ohun tí ààlà tó ń sọnù ṣe (ìpèsè àpẹrẹ)

Awọn ihamọ nigbagbogbo nilo lati fi ipa mu iye kan jẹ rọrun. Apẹẹrẹ ti o wọpọ: fi agbara ṣe iye kan `b` láti jẹ́ ìkan ** bit**, tàbí `0` or `1`Ọna ti o wọpọ lati ṣe eyi jẹ idiwọn kan:

```
b × (b − 1) = 0
```

Kí ló dé tí ó fi rí bẹ́ẹ̀? ìyára kan jẹ́ òfo nígbàtí ọ̀kan nínú àwọn onítumọ rẹ̀ bá jẹ́ kòfìn. nítorí náà, a lè sọ pé: `b × (b − 1) = 0` àwọn agbára `b = 0` or `b = 1`, ati pe ohunkohun miiran. Ṣiṣayẹwo gbogbo iye lati 0 si 16 (ni iṣiro ti o yika ni 17), awọn * nikan * awọn iye itẹlọrun rẹ jẹ deede **0 ati 1**. ✓

Bayi fojuinu pe ila naa ti wa ni ** lairotẹlẹ silẹ kuro** ninu iyipo. lojiji `b` ẹni tí kì í ṣòótọ́ lè fi èèwọ̀ múni ṣe ohun tó wù ú. `b` to `5`, or `9`, tabi ohunkohun, ati pe o tun ni itẹlọrun awọn idiwọn ti o ku. Oju ila kan to sọnu jẹ ** aafo igbẹkẹle **: Awọn ẹri eke bayi ni awọn ẹlẹri itẹwọgba.

Eyi kii ṣe iṣaro. A ti ri idiwọn Boolean kan ti o padanu ni iru eyi ninu apẹrẹ ideri akọkọ Zcash, Sprout, lakoko idagbasoke, ati ṣatunṣe ṣaaju ifilole. Iṣilọ-iwọlẹ jẹ ọkan ninu awọn aṣiṣe wọpọ julọ ati eewu ni kikọ awọn iyipo wọnyi.

![alt text](image-2.png)

Èyí ni gbogbo àwòkọ́ṣe kòkòrò Orchard, ní ìwòye kékeré. Àsìkò yìí ohun gidi ló wà nínú rẹ̀.

---

## 4. Ohun tí kòkòrò Orchard jẹ́ gan-an ni

Zcash's shielded proofs are built on **elliptic curves**, mathematical objects whose points can be combined and "multiplied" by numbers, operations the circuit has to enforce with constraints. The circuit contains gadgets that perform **elliptic-curve multiplication** and check that it was done correctly.

Gẹgẹbi ifitonileti nipasẹ Shielded Labs ati oluwadi Taylor Hornby, aiṣedeede Orchard jẹ gangan eyi:

> Ẹ̀yà tí a kò fi bẹ́ẹ̀ mú ní ìsopọ̀ Orchard ló jẹ́ kó ṣeé ṣe láti gbé àwọn àbájáde èké sínú ìbísí ẹ̀ka elliptic-curve, kí ó sì ṣì lè gba ìdánwò bíbójútó nínú ìpèsè náà.**

In plain terms, the circuit's checklist was missing the boxes that should have pinned down that multiplication. Because of the gap, a sufficiently expert attacker could construct a transaction proof that the system would accept even though the transaction created value from nothing. That is **counterfeiting**, and because amounts in the shielded pool are hidden, it would have been **undetectable** from the ledger. The Tachyon team later described the same flaw at the code level as missing lines in the circuit that quietly scrambled the underlying equations.

Àwọn ìfiwéra tó wà nínú ìtàn àtẹ̀wò wa kò yàtọ̀ rárá:

Ìtàn nípa àwọn àtòjọ ìwádìí. Àbùdá Orchard (ìwà òmùgọ̀).
|---|---|
Àpótí "àṣẹ ìrìnnà tí kò tíì pé" ti sọnù. Ìdènà tó sọnú lórí ìmúdọ́gba ọ̀pá-ìka elliptic kan ti sánmọ̀ sí àlàfo, èyí ni a fi ń ṣe àmì náà níbí yìí:
Ẹni tí ìwé ìrìnnà rẹ̀ ti pé yóò gbà á láyè. Àwọn àṣìṣe tó bá ṣe ló máa ń yọrí sí ìmúdàgba nínú ìdánwò ìṣirò náà.
Ẹnikẹ́ni mìíràn kò ní kópa, nítorí náà kò sí ohun tó jọ àṣìṣe. àwọn ìnáwó tí ó bágbà mu ṣiṣẹ̀ dáadáa, dída àìlera yìí mọ́lẹ̀.
Ó gba ògbógi kan láti fi tọkàntọkàn ṣàyẹ̀wò ìṣirò àyíká náà.

Lati jẹ ki o mọ bi eyi ṣe lewu to: oluwadi, pẹlu iranlọwọ AI, kọ *iṣowo ṣiṣe pipe* ati pe a ti fi idi mulẹ ni nẹtiwọọki idanwo agbegbe kan pe o gbejade awọn owo-iworo ayederu ailopin. Eyi jẹ otitọ gidi ati ailagbara, kii ṣe aibalẹ imọlẹ.

---

## 5. Ìdí tó fi fara sin fún ọdún mẹ́rin gbáko

Àbùkù náà gbé inú Orchard láti ìgbà tí wọ́n ti dá a sílẹ̀ ní May 2022 títí dìgbà tó fi di pé ó ṣe àtúnṣe pàjáwìrì ní June 2026, nípa ṣíṣe àwọn ayẹwo ọpọlọ lọ́pọ̀lọpọ̀ látọwọ́ àwọn onímọ̀ ìjìnlẹ̀ nínú ẹ̀rọ-ayédèrú. Báwo ni?

Nitoripe, bi Abala 1 ti kilọ fun wa pe ** idanwo awọn ayẹwo iṣẹlẹ ati aiṣedede yii ngbe ninu ọran kan ko si ẹnikan ṣe apẹrẹ.** Awọn iṣowo deede ko lo idiwọn ti o padanu, nitorinaa gbogbo igbeyewo kọja ati ni ọjọ kọọkan iṣẹ ṣiṣe deede dabi ẹnipe alailẹgbẹ. Ẹṣẹ naa le de ọdọ nikan nipasẹ sisẹ agbekalẹ ẹlẹri ajeji ti a fojusi patapata lori aafo naa. Ni ipari wọn rii kii ṣe nipa ṣiṣi awọn idanwo ṣugbọn * iṣaro nipa mathimatiki Circuit *.

ìwárí yìí fúnra rẹ̀ jẹ́ àmì ibi tí ààbò ti ń lọ. ní oṣù kẹrin ọdún 2026, ilé iṣẹ́ Shielded Labs bẹ Taylor Hornby tó jé olùwádìí ètò ààbò pé kí ó wá irú àìlera báyìí kàn. kò pẹ́ lẹ́yìn ìgbà tí wọ́n ṣe ẹ̀dà AI tuntun kan (Anthropic's Claude Opus 4.8) jáde ni òpin oṣù karùn-ún, ọdún 2026. Hornby lo èyí, pa pọ̀ mọ́ ọ̀nà ìṣirò àti àwọn ìlànà àṣà, nínú àyẹwò pàtó nípa agbègbè Orchard náà. ní ọjọ́ kọkàndínlógún oṣù karun 2026**, àyẹ̀wò náà rí àìlera náà.

Awọn otitọ meji ti o ni imọran lati inu ifitonileti naa tọ si sisọ kedere:

- Ẹgbẹ́ náà rí **kò sí ẹ̀rí** pé wọ́n ti lo àbùdá yìí, ó sì rò wípé kò ṣeé ṣe kí a lòó tẹ́lẹ̀ (ọmọ ọdún ni àwọn ògbógi fi ń ṣàyẹwò rẹ̀, tí wọn sì ṣàwárí rèé nípasẹ̀ akitiyan aláwọ̀ funfun). ṣùgbọ́n irú ìwà àìṣe é mọ *ìdí* kan jẹ́ kó di dandan fún ìwé àkọsílẹ̀ nìkan láti fìdí rẹ̀ múlẹ̀ pé kì í ṣẹlẹ̀.
- Ìwádìí náà dá wàhálà ńlá sílẹ̀, títí kan ìjábá tó wáyé lórí owó tí wọ́n ń ta àwọn nǹkan wọ̀nyí. Ìdí ni pé *ó ṣeé ṣe* kí wọ́n ti fi àdàkọ wọn pamọ̀ kó sì di èyí táwọn èèyàn ò lè rí mọ́ nítorí bí owó ṣe gbòòrò sí i nìyẹn.

![alt text](image-3.png)

---

## Kì í ṣe ìgbà àkọ́kọ́ nìyẹn tó máa rí irú nǹkan bẹ́ẹ̀.

The Orchard bug belongs to a recurring family, and seeing that family is what makes formal verification feel not optional but inevitable. A counterfeiting flaw always traces to one of three sources (the taxonomy from Part 1): the **specification** (the math itself), the **implementation** (code failing to follow correct math), or a **broken assumption**. And crucially:

> Àṣìṣe àdàkọ jẹ ** àìrí** nìkan bí ó bá wà nínú ìsọfúnni pàtó. Ìṣirò tí a ṣe nídìí fífi àwọn ẹ̀rọ náà ṣiṣẹ́ ń fi èsì tó máa dúró títí lọ sílẹ̀, nítorí pé gbogbo àwùjọ ló ń ṣàkọsílẹ̀ ohun tó wà nínú ètò ìṣàkóso ọ̀tọ̀ọ̀tọ̣ kan, torí bẹ́ẹ̀ yípadà ìtàn nípa lílo software ti o tọ́jú yóò tú àṣírí àjọṣepọ̀ èyíkéyìí tí kòdì-díè kọódì gbà láìmọye ìgbà.

Ìtàn Zcash fúnra rẹ̀ fi àwòkọ́ṣe náà hàn:

 Ìṣòro (ọdún) Orísun: Ṣé ó ṣeé rí?
|---|---|---|
ìdíwọ́n ìmúṣẹ Zerocash (2016, pre-launch) Àpèjúwe (àkójọpòsò tí a gé ní kékeré ti rú ohun àmúṣe ìdásílẹ̀ kan) ♀ Kò ṣeé rí.
☐ ìdìbò ìdánilójú ètò ìṣètò tí a gbẹ́kẹ̀lé (2018) ☐ Àkọsílẹ̀ (ìwà àìtọ́ nínú ìwé zk-SNARK) ☐ Kò ṣeé rí.
☐ Ìjàǹbá ìbéèrè ètò ìdánwò (2025) ☐ Àlàyé (ìdánwò tí ó sọnù nínú ìlànà ìdìbò) ☐ A lè rí i.
| Curve-subgroup validation bug (2016) | Implementation (a missing subgroup check) | Detectable |
 Orchard under-constrained multiplication (2026)  Àkọsílẹ̀ (ìyí náà)  Undetectable.

Àlàfo tí ó lè fara pamọ títí ayé ni àwọn tó wà nínú ìṣirò. Ìyẹn gan-an ni ẹ̀ka ti ìdánilójú ìsọfúnni tí a ṣayẹwo nípa ẹrọ le yọ, gbogbo ọ̀ràn lẹ́ẹ̀kan náà. Ṣíṣe àyẹwò àti ṣíṣe ayẹwo àpẹẹrẹ; wípé fífi ìdíwárí ṣe àkójọpọ̀ ohun wọ̀nńnì kan ṣoṣo ló kún inú àkọsílẹ̀.

---

## 7. Ohun táwọn èèyàn ṣe sí i

Àwọn olùdàgbà Zcash yípadà ní kíákíá àti láàrín àwọn ìpele:

1. **Igbesẹ atunṣe pajawiri (ni Oṣu Karun ọjọ 1-2, 2026).** Ni awọn ọjọ ti ifitonileti naa waye, igbesoke nẹtiwọọki pajawiri kan pa window ailagbara, fifi awọn idiwọn to sọnu sii ki iṣiro Circuit jẹ ohun lẹẹkansi.
2. **Awọn titun, provable ibere ("Ironwood", ṣiṣẹ July 28, 2026).** Dipo ti igbẹkẹle kan patched version of awọn atijọ adagun laipe, ni agbegbe se igbekale a brand-tuntun ipata adagun, Ironwood, da lori atunse Circuit sugbon bẹrẹ mọ, ki o si tẹle pẹlu ohun osise, ẹrọ-ṣayẹwo ẹri ti correctness.

Igbesẹ keji ni ibi ti idanwo osise wọ inu itan, ati pe o jẹ koko-ọrọ ti Apá 3. Imọye ẹgbẹ naa ṣiṣẹ lori tọ lati ṣe awotẹlẹ, nitori o sopọ gbogbo jara yii papọ:

> àléébù ìdàgbàwé tí a kò lè rí ní inú ìlànà náà nìkan ló le wà, nítorí náà bí o bá fi hàn pé òfin ò fàyè gba dídáṣà, gbogbo ẹ̀yà àwọn aṣiṣe tó ti fara sin fún ọdún mẹ́rin ni wàá mú kúrò.

Iyẹn gan-an ni ọ̀pá ìdúró kan - èrò láti Apá 1: ṣètẹ́wọ́gbà àlàyé pàtó, kí o sì dínà ẹkùn tí ìdánwò kò lè ṣe.

---

## 8. Ẹni tó ń sọ òótọ́ nípa ohun tí kò bá òfin mu

We simplified deliberately. The real circuit involves hundreds of regions and many thousands of constraints, and the actual flaw is more technically intricate than a single missing bit-check; we used the bit-check because it shows the *shape* of an under-constrained circuit exactly, and because that exact mistake is real in Zcash's history. The precise Orchard flaw was an under-constrained elliptic-curve multiplication, as stated in the official disclosure. We also compressed the disclosure and remediation timeline. For the authoritative technical account, consult the Shielded Labs disclosure and the Project Tachyon writeups.

---

## 9. Àkópọ̀ rẹ̀

- Àkọsílẹ̀ tí a fi ààbò ṣe ti Zcash ń bo iye owó pamọ́ nípa lílo àwọn ẹrí-ìmọ-nǹkan, nítorí náà ìkùdíẹ̀ káàtó nínú àwọn ẹri wọnyìí lè jẹ kí ṣíṣe èké dídàgbà di ohun àìrísí.
- Eto ẹri kan ṣayẹwo **circuit** ti o wa titi ti awọn idiwọn; ohun-ini pataki rẹ ni **soundness: nikan otitọ gbólóhùn yẹ ki o ni itẹlọrun ẹlẹrí.
- Àìní ìkápá á dá àlàfo tó ń jẹ́ kí àwọn ọ̀rọ̀ tí kò tọ́ kọjá lọ. (Ìrànlẹ́ ohun ìṣeré ti a ṣètẹríba: `b(b−1)=0` àwọn agbára `b` si 0 tabi 1; ju o ati ki o `b` O le jẹ ohunkohun. Ẹya gangan ti bug yii wa ni otitọ ninu itan Zcash.)
- Àṣìṣe Orchard jẹ́ àgbékalẹ̀ òpó-ìgùn elliptic tí ó wà lábẹ́ ìkápá: àwọn ohun èlò ti kò tọ́ lè kọjá ìdánwò ìbákẹ́gbẹ́pọ̀, èyí tó mú kí ẹ̀tàn máà ní àlàfo. A ṣe àfihàn aṣègun kan nínú nẹtiwọọki àdánwò.
- Ó fi ara pamọ fún ọdún mẹ́rin (May 2022 to June 2026) nítorí pé àyẹ̀wò àwọn àpẹẹrẹ ọ̀ràn àti kò fìgbà kan ṣe é; a rí i nípa ríronú lórí ìṣirò, pẹ̀lú ìrànlọ́wọ́ AI ní May 29, 2026.
- Àdàkọ tí a kò lè rí ní àyè nìkan ni ó le wà nínú ìsọfúnni, àti Zcash ti ri ìdílé ẹ̀rọ yìí tẹ́lẹ̀. Zcash fèsì pẹ̀lú ojútùú pàjáwìrì àti àwùjọ tuntun kan tó jẹ́ pé wọ́n ṣètẹríba rẹ̀ lọ́nà ìṣàkóso, Ironwood, èèwòye Ìpín 3.

---

## Àkójọ àwọn ọ̀rọ̀

Ọ̀rọ̀-ìtumọ̀ èdè Gẹ̀ẹ́sì tó rọrùn.
|---|---|
| **Shielded pool** | The private mode of Zcash where amounts and parties are hidden |
**ìfihan ìmọ-gídí** Ẹ̀rí pé àlàyé tí a fi pamọ́ jẹ́ òótọ́, kò tú ohunkóhun mìíràn jáde.
** Circuit** Ìdìpòpọ̀ àwọn ipò ìṣirò tí ìsopọ́ tó bágbà mu gbọdọ̀ tẹjúmọ.
** Ìdènà**. Àmì kan (ìfiwéra) nínú àyíká náà.
Àwọn ìjìnlẹ̀ iye tí ó bá tẹ àwọn ààlà náà lọ́rùn.
**Soundness**: Ìdánilójú pé àwọn ọ̀rọ̀ tí ó jẹ́ òótọ́ nìkan ló lè mú ẹ̀rí tó ṣe é fọwọ́ sí.
**Soundness gap** Àlàfo tó ń sọnù tí ó jẹ́ kí àwọn àlàyé èké kọjá lọ.
** Under-constrained**. Circuit kan ti ko ni ipo to nilo, gbongbo Orchard bug naa.
**Awọn ti a le ri/ti ko ni i rii**. Boya lilo yoo fi ẹri silẹ ninu iwe-ipamọ gbogbo eniyan.

---

## Àwọn ìbéèrè tí a sábà máa ń béèrè

**Ṣé lóòótọ́ ni wọ́n ṣe Zcash tí wọn fi ń díbọ́n?**
kò sí ẹ̀rí ìfipábánilòpọ̀ kankan tí wọ́n rí, àwọn òṣìṣẹ́ náà sì gbà pé ó ṣeé ṣe kó máà jẹ́ bẹ́ẹ̀. ṣùgbọ́n nítorí àléébù yìí kì í hàn nínú ìwé àkọsílẹ̀, ìwé àkọọ́lẹ̀ nìkan kò lè fi gbogbo ara rẹ̀ hàn wípé a kò ṣẹlẹ̀ rárá, ìdí nìyí tí ìdáhùn wọn ti kún fún ọ̀rọ̀-ìdájọ́ tó pọndandan.

** Kí nìdí tí fífi iye tó wà nípamọ́ fi máa ń mú kí kòkòrò kan burú sí i?**
Nígbà tí wọ́n bá fi iye owó náà pa mọ́ nítorí ààbò, kòkòrò tó ń ṣe èrú ò ní mú kí nǹkan kan ṣàdédé ṣẹlẹ̀ nínú rẹ̀.

** Kí ló dé tí àwọn olùṣirò ò rí i?**
Awọn ayẹwo ati awọn idanwo ni o tobi julọ ṣe iwadii ihuwasi lori awọn ọran gidi. Aṣiṣe yii nikan farahan labẹ iṣiro ti a pinnu, titẹsi alailẹgbẹ ti o fojusi si iṣẹlẹ eti mathematiki kan, eyiti atunyẹwo ilana ko lo. O wa nipasẹ ifọkanbalẹ ipinnu nipa iyipo naa, kii ṣe nipasẹ igbeyewo.

**Ṣé kìkì ohun tó ń mú kí nǹkan rọgbọ ni?**
Bẹ́ẹ̀ ni. ètò ẹ̀rí kan lágbára bí àwọn ìkálójú tó kún rẹ̀ ṣe rí, ó dìgbà tí a bá yọ ipò pàtàkì kan kúrò kí àlàyé aláìṣeégbíyèlé lè wọ inú wọn.

** Ipa wo ni AI ṣe?**
Onímọ̀ kan lo awoṣe AI ti o ni aala papo pẹlu ohun elo aṣa ati awọn ọna ibile lati ṣe atunyẹwo iṣiro Circuit ki o wa aiṣedede naa. A nlo AI siwaju sii lori ẹgbẹ mejeeji ti aabo, eyiti o jẹ apakan idi ti fifihan eto to tọ bayi fi ṣe pataki pupọ.

---

### Wádìí ohun tó wà lọ́kàn rẹ.

Bíi pé ìsòwò tí a fi ààbò ṣe ní láti jẹ́rìí sí "owó tó wọlé dàbí owó tó jáde", ṣùgbọ́n ẹ̀ka náà gbàgbé láti dín iye èsì kan kù. Kí ni olùdánimọ̀ aláìṣòótọ́ lè ṣe, kí sì nìdí tí ìwé àkọsílẹ̀ gbogbo ènìyàn yóò fi rí bí ọ̀ràn gidi? *(Ṣàlàyé lókè yìí.)*

<details><summary>Answer</summary>

With that output unconstrained, the prover could set it larger than the real inputs allow, creating value from nothing, a counterfeit. The proof would still verify, because the missing constraint is the only thing that would have caught the imbalance. And since the shielded pool hides amounts, the ledger shows only that "a valid transaction occurred," with no visible imbalance to raise an alarm. The forgery is real but invisible, which is exactly why soundness of the circuit matters so much, and exactly why it must be proven rather than tested.
</details>

---

### Kí ló tún ń bọ̀ wá ṣe?

** Apá 3 · Ironwood:** àtúnṣe náà kìí ṣe ìlà kan. àwọn onímọ̀ ẹ̀rọ Zcash kọ́ adágún tuntun tí a fi ọjà bojú, wọ́n sì bá a lọ pẹ̀lú èrí ìṣirò ti wọn ṣayẹwo nípa ẹrọ, ó lé ní 2,700 theorems tí a kọ̀wé sínú olùrànlọ́wọ́ ìdánilójú Lean, pé òun ò lè dá owó ayédèrú lábẹ́ àwọn èrò rẹ̀ tó sọ tẹnu mọ́lẹ̀. A máa rí ohun tí "ìdúrósípò ìwà mímọ́" àti "ìdáláre ìmọ̀" túmọ̀ sí gan-an, kí ni àmúlùmálà yìí ń bò tàbí kì í bò, àti bí wọ́n ṣe yọ odógún adágùn kúrò láìléwu.

*Pápá kan nínú àwọn ìwádìí tí wọ́n ṣe nípa àyẹ̀wò tó bá òfin mu fún ọ̀ràn yìí. [ZecHub](https://zechub.org).*
