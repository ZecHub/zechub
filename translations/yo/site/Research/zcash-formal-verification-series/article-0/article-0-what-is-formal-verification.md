![alt text](image-1.png)
# Kí Ni Ìwádìí Nípa Òfin?

### Bí o ṣe lè fi hàn pé ètò kan tọ́, dípò wípé kí ó kàn ní ìrètí pé òun tòótọ́ ni.

> **Sẹ́ríì:** *Ẹ̀ka Ìwádìí Òfin* · **Apá 1 nínú 3**
> ** àwùjọ:** àwọn tí kò tíì mọ̀ nípa ẹ̀kọ́ ìṣirò, ètò orí kọǹpútà tàbí ìmọ̀ ìjìnlẹ̀.
> **What you'll leave with:** a clear understanding of what it means to *prove* software correct, why that is fundamentally different from testing it, what a machine-checked proof is, and the precise (and honest) limits of what such a proof can promise.

Pupọ software ni a gbẹkẹle nitoripe o ti *dánwò*: awa nṣiṣẹ lori ọpọlọpọ awọn titẹsi ati wo ihuwasi rẹ. Ijẹrisi ifọwọkan beere ibeere igboya diẹ sii. Njẹ a le "fihan", pẹlu idaniloju iṣiro, pe eto kan ṣe ohun ti o yẹ fun ** gbogbo** ifunni to ṣeeṣe, pẹlu eyiti ko si ẹnikan ti ronu lati gbiyanju? Abala yii kọ imọran yẹn lati ilẹ soke. Intuition akọkọ, ko si aami titi wọn yoo fi jo'gun.

---

## 1. Kí nìdí tó fi yẹ kó o mọ̀ nípa rẹ̀?

Ìtàn tó ṣẹlẹ̀ lóòótọ́ nìyí, òun sì ni ìdí tá a fi ń ṣe ọ̀wọ́ àwọn ìwé yìí.

In 2022, the privacy-focused cryptocurrency Zcash launched a new shielded pool named Orchard, letting people transact with the amounts hidden. For four years it worked flawlessly and passed repeated professional audits. Then, in May 2026, a security researcher reasoning carefully about the underlying mathematics (with help from AI tooling) found a single **under-constrained** spot in the system's math. That one gap could have let an attacker create an *unlimited* amount of counterfeit money, and because the amounts were hidden, nobody would have seen it happen. The flaw had been present the entire time.

a kò rí i nínú ìdánwò. gbogbo àdánwò ló ti kọjá fún ọdún mẹ́rin. ẹnì kan tó ń ronú nípa ìṣirò ni ó rí i.* nígbà tí ẹgbẹ̀ náà sì tún un ṣe, wọn ò kàn fi àtúnṣe síi kí wọ́n máa báa lọ ní ṣíṣiṣẹ́ mọ́ ọn lọ. àwọn kọ ẹ̀rí ìjìnlẹ̀-ìmòye oníṣẹ́-ọnà** (machine checked mathematical proof), èyí to ju 2,700 ìlànà ọ̀tọ̀ọ̀tọ̣ lọ pé dípò rẹ̀ kò lè gba irú àìpé bẹ́ẹ̀ rárá.

Ìyẹn ni ìwádìí tí ó ṣe é gbà, èyí sì ni ohun tó ń rà fún ọ: kì í se "a ti dán òpòlọpọ̀ àbá wò wọ́n sì ṣiṣẹ", ṣùgbọ́n a fi hàn pé o jẹ òtítọ́ nínú gbogbo àbá. Ní àwọn ètò níbi tí ẹyọ kan pàtó bá já sí ibi eléwu (owó, ọkọ̀ òfurufú, èlò ìṣègùn, ìmọ̀-ìkọ̀wé), ìyàtọ̀ náà ló wà nídìí rẹ̀.

Afoju-oju ti o fi ṣe ayẹwo ni a pe ni awọn ọdun diẹ sẹhin nipasẹ onimọ ijinlẹ sayensi kọmputa Edsger Dijkstra, ati pe o tun jẹ otitọ:

> Ìdánwò lè fi hàn pé kòkòrò wà, ṣùgbọ́n kì í ṣe wípé wọn ò sí.

Ti idanwo ba kọja, o ti kọ ẹkọ pe eto naa n ṣiṣẹ * lori wiwọle yẹn. O ko ni kẹkọọ ohunkohun nipa awọn ohun elo iwọ ko gbiyanju, ati awọn aṣiṣe eewu nigbagbogbo wa ninu awọn ọran ti ẹnikẹni ko ṣe igbiyanju.

---

## 2. Ìmọ̀lára: Ṣíṣàyẹ̀wò àwọn ilẹ̀kùn lòdì sí wíwá ilé náà wò dáadáa

Fojú inú wò ó pé ilé kan wà tó ní ẹgbẹ̀rún ilẹ̀kùn, iṣẹ́ rẹ sì ni láti rí i dájú pé gbogbo wọn ló ti ń ṣí lọ nígbà tí òru bá ṣú.

- ** Ọ̀nà àbáwò:** rìn yíká, kí o sì dán àwọn ilẹ̀kùn wò. gbìyànjú márùndínlọ́gọ́ta, ọgọ́rùn-ún, ẹẹdógún. Gbogbo èyí tí ìwọ bá ti ṣàyẹ̀wò ni wọ́n tì pa, nítorí náà ìgbẹ́kẹ̀lé rẹ yóò pọ sí i. ṣùgbọ́n kò tíì ṣe gbogbo wọn tán, àti pé ẹnu ọ̀nà kan tó ṣí sílẹ̀ lè jẹ́ ọ̀kan tí ó yẹra fún.
- **The formal-verification approach:** examine the *locking system itself* and prove, from its design, that pressing the "lock" button necessarily engages every door. Now you do not need to try individual doors at all. You have shown that *no possible door can be left unlocked*, because the mechanism makes it impossible.

Ìyàtọ̀ wà láàrin **sampling reality** àti **proving a property of the design**. Ṣíṣe àyẹwò àwọn ẹ̀rọ-ìmọ́ra, ìwádìí tí ó ṣe é fọwọ́ sí fi hàn pé òótọ́ ni gbogbo èrò náà, ohun yòókù sì jẹ́ irinṣẹ́ láti mú un ṣẹ láìfi ọ̀nàkọnà pè.

![alt text](image-2.png)

---

## 3. Àwọn ohun mẹ́ta tó ń mú kí ìdánwò gbogbo nǹkan wà ní sẹ́sẹ̀ẹ́

Gbogbo ìwádìí tí a ṣe, bó ti wù kí ó tóbi tó, ni wọ́n ń kọ láti inú àwọn ohun mẹ́ta kan. Ẹ mú èyí ní kedere àti àfikún sí i jẹ́ kúlẹ̀kúlẹ̀.

| Òpó | Ìtumọ̀ lásán | Àfiwé ilé |
|---|---|---|
| **Àlàyé pàtó** | Àlàyé pàtó nípa ohun tí "tọ́" *túmọ̀* | "Gbogbo ilẹkun gbọdọ wa ni titii ni alẹ" |
| **Ètò** | Ohun gidi tí a ń ṣàyẹ̀wò (ètò kan, àyíká kan, ìlànà kan) | Ilé náà àti ọ̀nà ìdènà rẹ̀ |
| **Ẹ̀rí** | Ariyanjiyan to muna pe eto naa nigbagbogbo pade awọn alaye naa | Àfihàn tó bófin mu pé títẹ “tíìpù” ti gbogbo ilẹ̀kùn |

Ohun kẹrin tó sì mú kí gbogbo nǹkan yìí ṣeé gbára lé ni pé:

- **Aṣayẹwo ẹrọ.** Ẹri naa ko kọ nipasẹ eniyan ati pe o jẹ oju-oju. O ti fi sinu eto kan (oluranlọwọ ẹri, tun npe ni olutọju theorem) eyiti o ṣayẹwo * gbogbo igbesẹ looto*. Eniyan le gbe ọwọ wọn tabi ṣe aṣiṣe kekere; ẹrọ kii yoo gba igbese ti ko tẹle muna. Eyi ni idi ti a sọ pe abajade jẹ ** iṣakoso ẹrọ**.

![alt text](image-3.png)

Proof assistants you may hear named include **Lean**, **Rocq** (formerly Coq), and **Isabelle**. They are, in effect, extraordinarily strict logic-checking engines. The Zcash proof in our opening story was written in **Lean**. Notably, modern AI models are increasingly used to help *write* these proofs, with humans guiding them, which has shortened efforts that once took years down to weeks. The machine still checks every step, so the speed-up does not cost any certainty.

---

## 4. Ohun tí ẹ̀rí jẹ́ gan-an ni òótọ́.

Ọ̀rọ̀ náà "ìfihan" lè dà bí ẹni pé ó ń bani lẹ́rù, nítorí náà ẹ jẹ́ ká tú àṣírí rẹ̀ jáde nípa fífi àpẹẹrẹ tó ṣe pàtó kan tí a lè ṣàyẹ̀wò hàn. Kò sí ìlànà ìkọ̀wé-nǹkan (cryptography), ìṣirò ilé ìwé lásán ni.

**Ìdánilójú:** fún gbogbo iye tó péye. `n`, iye náà `0 + 1 + 2 + ... + n` ó dọ́gba `n(n+1)/2`.

O lè fi èyí dánra wò. `n = 5` ó ń fúnni ní `0+1+2+3+4+5 = 15`, àti `5 × 6 / 2 = 15`. ✓ Ó bára mu. Gbìyànjú rẹ̀ wò `n = 10`: iye náà jẹ́: `55`, ati pe agbekalẹ naa funni ni: `10 × 11 / 2 = 55`. ✓ (A ti ṣe iṣiro ati jẹrisi; ni otitọ, ẹtọ naa waye fun gbogbo awọn ohun elo. `n` láti 0 sí 999 nígbà tí wọ́n bá ṣàyẹ̀wò rẹ ní tààràtà.)

Àrídájú kan ń pa àlàfo àìlópin náà mọ́ nínú ọ̀rọ̀ tí ó ní òpin, nípa lílo ìlànà ti a pè ni ìmúṣẹ:

1. ** Ọ̀ràn ìpilẹ̀ṣẹ̀:** fún `n = 0`, iye náà kò ju `0`, ati pe agbekalẹ naa funni ni: `0 × 1 / 2 = 0`. Wọ́n gbà. ✓
2. **Igbesẹ ìmúlẹ̀sí:** *ṣebi* ọ̀nà náà tọ́ fún iye kan. `k`Wá fi iye tó tẹ̀ lé e kún un, `k+1`. Àpapọ̀ tó fi dé `k+1` is `(sum up to k) + (k+1) = k(k+1)/2 + (k+1)`. Ojúlówó ààrò á tún èyí ṣe láti jẹ́ kí ó dàbíi pé: `(k+1)(k+2)/2`, eyi ti o jẹ gangan awọn agbekalẹ pẹlu `k+1` dípò ti `k`. ✓

Níwọ̀n bí ó ti jẹ́ pé ní ìbẹ̀rẹ̀ (0) àti ìgbésẹ̀ kọ̀ọ̀kan yóò gbé e lọ sí iye tó tẹ̀lé, ó ṣe é fún **gbogbo** àwọn nọ́ńbà àpapọ̀ títí láé nínú ọ̀rọ̀ tí kò lópin. Èyí ni ẹrí kan. Olùrànlọ́wọ́ ẹ̀rí-ìfihan ńṣe ohun náà gan an, ṣùgbọ́n nípa lílo ẹrọ ṣètójú wípé gbogbo igbesẹ, pẹlu "àlàkalè algebra", tọ̀nà láti inú èyí tí o wá ṣáájú rẹ̀.

> Ìgbésẹ̀ tó yẹ kí a gbé: ẹrí yí "àwọn ọ̀ràn tí kò lópin" padà sí àbá kan tí ó ní òpin, èyí tá a lè ṣàyẹ̀wò. Èyí ni ohun tí ìdánwò agbára ńlá ń ṣe láìsí nínú ètò rẹ̀.

---

## 5. Ibi táwọn kòkòrò ń gbé lóòótọ́

Àyẹ̀wò tí ó ṣe àdàkọ lágbára ní apá kan nítorí wípé a mọ ibi ti àwọn ẹṣẹ́ wá láti. Ẹlẹsẹ èyíkéyìí nínú ètò ìwádìí òfin máa ń tọpin sí ọ̀kan lára ibì mẹ́ta:

| Orísun àṣìṣe kan | Ohun tí ó túmọ̀ sí | Ṣé a lè fi hàn pé ó ti bàjẹ́? |
|---|---|---|
| **Àlàyé pàtó** | Ìṣirò tàbí àwọn òfin fúnra wọn kò tọ́ (ipò tí ó sọnù, ìtumọ̀ tí kò dára) | **Bẹ́ẹ̀ ni**, tààrà, èyí ni ilé ìfìdíkalẹ̀ tó péye |
| **Imuse naa** | Koodu naa kuna lati ṣe awọn alaye ti o tọ ni otitọ | Ní apá kan; nígbà míìrán, irú àwọn ìkùnà bẹ́ẹ̀ máa ń fi ẹ̀rí tí a lè rí sílẹ̀ |
| **Àbá tí ó bàjẹ́** | Nǹkan tí gbogbo ètò náà gbára lé yípadà sí èké | Rárá; àwọn èrò ni ìpìlẹ̀ tí a kò lè yípadà |

This taxonomy matters more than it looks, and Parts 2 and 3 turn on it. The deepest, most dangerous bugs, the ones that can hide forever, tend to live in the **specification**: the mathematical description of what the system is supposed to do. And the specification is exactly what a machine-checked proof can examine directly, all cases at once. That is why serious formal-verification efforts aim there first.

![alt text](image-4.png)

---

## 6. Ìkìlọ̀ tó ṣe pàtàkì jù lọ nínú gbogbo ẹ̀ka yìí ni pé:

Ìwádìí tí a ṣe nípa rẹ̀ lágbára, ṣùgbọ́n ìlérí rèé pé ó máa ṣẹ láìkù síbì kan àti àìmọye àṣìlóye tó ń mú àwọn ènìyàn ṣìnà. Nítorí náà sọ ọ́ ní pẹrẹu:

> **A fi ẹri ṣe idaniloju pe *ọ̀nà àbáyọ* bá àwọn ìtọ́sọ́nà pàtó mu, lábẹ́ àwọn èròjà tí a sọ.* Kò sí nǹkan míì.

Ohun mẹ́rin ló tẹ̀ lé e, ọ̀kọ̀ọ̀kan wọn sì ṣe pàtàkì:

- ** Bí àlàyé náà bá jẹ́ òdì, ẹ̀rí kò níye lórí.** Tí o ba fi hàn pé "gbogbo ilẹ̀kùn ló ń dí" ṣùgbọ́n ohun tí a béèrè ni wípé "gbogbo fèrèsé *ló ń dí", ìwọ ti fìdí rẹ múlẹ̀ ọ̀rọ̀ tó lòdì pátápátá. Ìwádìí ìmúdájú ṣayẹwo pe o kọ nǹkan bí ó ṣe tọ́ sí i, kì í ṣe pé o sọ èyí tó tòótọ́ fún un.
- ** Bí a bá ṣe àlàyé kan tí kò tọ́, ìdánilójú náà yóò dín kù.** Àrídájú nípa ìtumọ̀ "ìdákẹ́-sí" tó jẹ́ èyí tí ó ṣòdì díẹ̀ lè mú kí nǹkan máà rí bóo ti rò nígbàtí o ṣì ń gba gbogbo ayẹwo. Ìdí nìyí táwọn ìtumọ̀ inú ọkàn àyẹwò gbọdọ̀ kúrú, ní ìlànà àti wípé àwọn ènìyàn le ṣàtúnyèwò wọn láìsí iyemeji kankan.
- ** Bí àwọn èrò náà bá kùnà, ìdánilójú ò ní sí mọ́.** Àwọn ẹ̀rí dá lórí àwọn èrò ("ohun tí ó wà nínú irinṣẹ́ ìsínkù kò bàjẹ́"). Tí àbá kan bá jẹ́ irọ́ lójú ọ̀nà, a lè má gbà pé ohun tó sọ tòótọ́.
- **Kì í túmọ̀ sí "kò ní ìró kankan rí".** Ó ń tọ́ka sí pé "kì yóò sí àwọn àbùdá tí a kọ sílẹ̀ nínú ìlànà yìí, nítorí èròǹgbà wọ̀nyí. " Ìpolongo tó ṣe ṣókí jùlọ, òótọ́ ju ti tẹ́lẹ̀ lọ àti èyí tó wúlò púpọ̀.

Bi a ti yoo ri ni Apá 3, awọn Zcash egbe so wọn agbegbe ati assumptions plainly ("a fihan ipese soundness, labẹ wọnyi lorukọ asise, ki o si ko asiri") jẹ kan awoṣe ti wipe otitọ.

![alt text](image-5.png)

---

## 7. Ẹni tó ń sọ òótọ́ nípa ohun tí kò bá òfin mu.

láti jẹ́ kí èyí ṣeé kà, a ṣe àtúnṣe. àwọn ìlànà gidi ni wọ́n kọ ní èdè tí ó péye, kì í se gbólóhùn gẹ̀ẹ́sì; ọ̀pọ̀lọpọ̀ *style* ti ìwádìí fún ìdánilójú (ìfiwéra-àlàyé nípa èròjà tó wà nínú òwe, ayẹwo awoṣe, awọn ọna SMT) ló yẹ sí ìṣòro yàtọ̀ọ̀tọ̀; àti wíwọ ìwé ẹrí yìí ṣì jé iṣẹ́ ọlọgbọ́n kan, iṣẹ́ aláápọn kódà pẹlú ìrànlódì AI. àwa náà tún yọ bí olùrànlọwọ èri yóò ṣe ṣojú ìmọ̀lára láàrín ara ẹni. kò sẹ́ni lára nǹkan wònyí yí ohun pàtàkì padà: àpèjúwe, ètò kan, àti ẹ̀rí tí ọkọ̀ ń fi hàn pé méjèèjì bára mu, labẹ àwọn ìpílẹ̀ táa sọ. àlàyé rẹ̀ á sì máa bọ̀ wá lọ nígbà tá a nílò un.

---

## 8. Àkópọ̀ rẹ̀

- Ìdánwò àyẹ̀wò máa ń ṣe àwọn ìsọfúnni pàtó tí ó sì lè fi hàn pé kòkòrò wà, kì í jẹ́ kí wọ́n mọ̀ wípé kòkórè ò sí. Àwọn kòkòré eléwu náà fara pamọ nínú ọjà táwọn èèyàn ti ń yẹ wọn wò.
- **Ijẹrisi ti o ni imọran** fihan pe ohun-ini kan jẹ fun gbogbo awọn ọran to ṣeeṣe, ninu opin, ariyanjiyan ti a le ṣayẹwo.
- Gbogbo àyẹ̀wò ní àwọn ọ̀pá mẹ́ta: ìsọfúnni (ohun tí ó tọ), ètò kan, àti ẹrí pé wọ́n gbà á. Àfikún sí ìyẹn olùrànlọ́wọ́ tó ń ṣe é láìṣeé yẹ̀ wò bíi Lean ti máa ń ṣàyẹ̀wò gbogbo ìgbésẹ̀ rẹ̀.
- Àrídájú (fún àpẹrẹ, nípa ìmúṣẹ) ń pa àìmọye ọ̀ràn pọ̀ sí àlàyé kan tí ó ní òpin.
- Awọn aṣiṣe n gbe ni ** alaye pato, awọn imuse tabi a ti fọ ero. Ijẹrisi osise fojusi itọkasi taara, eyiti o jẹ ibiti ijinlẹ julọ, ọpọlọpọ awọn aṣiṣe pamọ maa ngbe.
- Àdéhùn náà ṣe pàtó: ètò náà bá àlàyé ìsọfúnni mu, lábẹ́ àwọn èròǹgbà tí a sọ. Ìsọfúnnni ti kò tọ̀nà, àpèjúwe tó jẹ́ òdì tàbí ìpèsè kan tí ó kásẹ̀ nílẹ̀ yóò mú un di aláìṣẹ̀kan, kì í sìí túmọ̀ sí "kò sí ẹ̀bi kankan".

---

## Àkójọ àwọn ọ̀rọ̀

| Àkókò ìgba | Ìtumọ̀ Gẹ̀ẹ́sì lásán |
|---|---|
| **Ìjẹ́rìísí tó péye** | Ní ti ìṣirò, ó ń fi hàn pé ètò kan bá ìlànà mu fún gbogbo ọ̀ràn |
| **Àlàyé pàtó** | Gbólóhùn pàtó nípa ohun tí "ìwà tó tọ́" túmọ̀ sí |
| **Ètò** | Ètò gidi, Circuit, tàbí Protocol tí a ń ṣàyẹ̀wò |
| **Ẹ̀rí** | Ìwọ̀n tó péye ti àwọn ìgbésẹ̀ tó bófin mu láti fi ẹ̀tọ́ múlẹ̀ fún gbogbo àwọn ọ̀ràn |
| **Atilẹyin ẹri / ẹri ilana-ẹkọ** | Sọ́fítíwètì (Lean, Rocq, Isabelle) tí ó ń ṣàyẹ̀wò gbogbo ìgbésẹ̀ ẹ̀rí kan |
| **A ti ṣe ayẹwo ẹrọ** | Kọ̀ǹpútà ti fi ìdí rẹ̀ múlẹ̀ ní ìgbésẹ̀-lẹ́sẹ̀, kìí ṣe nípa kíkà ènìyàn nìkan |
| **Ìfàsẹ́yìn** | Ọ̀nà ìdánilójú: òótọ́ ní ìbẹ̀rẹ̀, ìgbésẹ̀ kọ̀ọ̀kan sì gbé e lọ sí òmíràn |
| **Ìgbàgbọ́** | Àdéhùn kan tí ẹ̀rí náà gbẹ́kẹ̀lé; tí ó bá jẹ́ èké, ìdánilójú náà lè má dúró fún |

---

## Àwọn ìbéèrè tí a sábà máa ń béèrè

**Ṣé ìwádìí tí a ṣe lọ́nà tó bófin mu máa ń rọ́pò ìdánwò?**
Rárá o. Wọn ń ṣe àfikún ara wọn. Ìdánwò máa ń mú àwọn ìṣòro tó jẹ mọ́ òótọ́ àti èrò tí kò tọ̀nà ní ọjà olówó pọ́ọ́kú; ìwádìí yóò yọ gbogbo ẹgbẹ́ àìdá kúrò nínú èyí tí ìdánwò lè máà rí kókó rẹ̀ wò rárá.

** Ti o ba jẹ pe agbara, idi ti ko ṣe ohun gbogbo ni a fi idaniloju?**
O gbowolori o si nilo imọ-imọran amọja, bo tilẹ jẹ pe iranlọwọ AI n dinku iye owo naa. A ṣe e fun awọn ọna ẹrọ nibiti aṣiṣe ti ko wọpọ yoo jẹ ajalu, eyiti o jẹ gangan ibi ti idiyele rẹ sanwo.

**Ṣé ètò tí a ti fìdí rẹ̀ múlẹ̀ dáadáa ṣì lè kùnà?**
Bẹ́ẹ̀ ni, bí àlàyé tó wà nínú ìwé náà kò bá tòótọ́ mu tàbí tí a ò sọ ohun kan bó ṣe yẹ kó rí. Àrídájú yìí kàn ń fi hàn pé àwọn nǹkan tá a ti kọ sínú rẹ̀ ló kún inú ẹrù ìnira yẹn nìkan nìyẹn.

**Ṣé ẹ̀rí tí a fi ẹ̀rọ ṣàyẹwò ṣeé gbára lé ju ti ènìyàn lọ?**
Bó tilẹ̀ jẹ́ pé ẹ̀rọ náà ṣì ń fọkàn tán àlàyé tí wọ́n ṣe fún un, kò ní gbójú fo ìlà tó wà láàárín nǹkan tàbí kó gba àmì ọwọ́ kan.

**Bí AI bá ran kọ ẹ̀rí náà, kí ló dé tí a fi ní láti gbẹ́kẹ̀lé e?**
nítorí pé olùrànlọ́wọ́ tó ń ṣe àyẹ̀wò náà máa ń ṣàyẹ̀wò gbogbo ìgbésẹ̀ lọ ní ẹ̀rọ. èrò orí ọpọlọ ló sọ àwọn ìgbésẹ̀ tí kò tọ, kí ètò sì fi hàn bóyá ó tòótọ tàbí kì í ṣẹni kan nínú wọn ni a kàn kọ sílẹ̀ lásán, torí náà ìmọ̀-ọkàn lohun táá mú kó rọrùn láti tètè gbé e jáde láì jẹ́ kí ìdánilójú wà láìsí ìdààmú kankan.

---

### Wádìí ohun tó wà lọ́kàn rẹ.

O lè fi hàn pé kò sí báńkì kan tó ní "ìdíwọ́" nínú àkáǹtì rẹ̀. Ọdún kan lẹ́yìn náà, owó ṣì ń dàwátì. Báwo ni nǹkan méjèèjì ṣe máa rí bẹ́ẹ̀? * (Jàhùn ìbéèrè yìí.) *

<details><summary>Answer</summary>

The proof guaranteed exactly one property: balances never go negative. Money can go missing in ways that property never addressed, for example a bug that moves funds to the wrong (still non-negative) account, or a flaw in a part of the system that was never specified. The verification did precisely what it promised and nothing more. This is the Section 6 caveat in action: a proof covers the specification, not every conceivable notion of "correct."
</details>

---

### Kí ló tún ń bọ̀ wá ṣe?

**Part 2 · The Orchard Bug:** we turn to the real 2026 story in full. A privacy system hid amounts using cryptographic proofs, and one under-constrained line in its math meant those proofs could be made to lie, allowing unlimited invisible counterfeiting. We will see exactly what "an under-constrained circuit" means, why this class of bug can hide forever, and why it has happened more than once.

*Pápá kan nínú àwọn ìwádìí tí wọ́n ṣe nípa àyẹ̀wò tó bá òfin mu fún ọ̀ràn yìí. [ZecHub](https://zechub.org).*
