# Bí Àdánwò Zcash tí a Ṣójútó Ṣe Ń Ṣiṣẹ Lóòótọ́
##### Ìwádìí Àkọ́kọ́ láti [Annkkitaaa](https://github.com/Annkkitaaa)

![ì í ì °ë¦¬í ë ¤]](image.png)

### Ìmọ̀lára ṣáájú ìṣirò: àbá tí kò ní ìlànà nínú ìsanwó àdáni

> **Series:** *Zcash from First Principles* . **Article 0. The Anchor** (Àdàkọ:Àwọn Àpilẹ̀kọ Àkọ́kọ́)
> àwọn tó ṣẹ̀ṣẹ̀ dé pátápátá. kò sí ẹ̀kọ́ nípa kíkọ̀ǹpútà, kò sí ohun tó jẹ mọ́ lílo ẹ̀rọ blockchain, kò sì sí ìmọ̀ ìṣirò tí wọ́n gbà gbọ́.
> **What you'll leave with:** a correct mental model of how Zcash hides *who paid whom, and how much*, while still letting the whole world verify that no money was forged or spent twice.

gbogbo àpilẹ̀kọ tó tẹ̀ lé e nínú àtẹ̀jáde yìí máa ń gbé apá kan nínú ẹ̀rọ tí ẹ̀yin yóò pàdé, nítorí náà bí ọ̀rọ̀ kan bá dà bí ẹni pé ọwọ́ ń mì níbí, *ó dára.* èyí jẹ́ ìlérí pé a ó padà wá, a ó sì gba owó náà bó ṣe yẹ.

---

## 1. Kí nìdí tó fi yẹ kó o mọ̀ nípa rẹ̀?

Imagine your bank statement were nailed to a wall in the town square. Forever. Anyone (your landlord, your employer, a stranger, a future employer, a government) could read every rent payment, every medical bill, every donation, every coffee, and trace exactly who you sent money to and who sent money to you.

Ìyẹn kì í ṣe àròsọ tí kò dára. **Bí Bitcoin ṣe ń ṣiṣẹ́ nìyẹn.**

Bitcoin is often called "anonymous," but it isn't. It's *pseudonymous*: your name isn't on the ledger, but every transaction, amount, and link between addresses is public and permanent. The entire field of "chain analysis" exists to peel back that thin pseudonym and tie addresses to real people. Once one of your addresses is linked to you, your financial history unspools.

A ṣe Zcash lati dahun ibeere ti o nira pupọ:

> **Ǹjẹ́ a lè ní owó tó jẹ́ àṣírí pátápátá, tí ó fi ẹni tó rán an, ẹni tó gbà á, àti iye owó náà pamọ́, nígbà tí ó ṣì jẹ́ kí ẹnikẹ́ni rí i pé a tẹ̀lé àwọn òfin?**

Those two goals fight each other. A public ledger is verifiable *because* everyone can see it. Privacy means nobody can see it. So how can the public verify something it isn't allowed to look at?

Ìdáhùn sí àríyànjiyàn yìí ni gbogbo ìtàn nínú ìsọ̀rí yìí. Ẹ jẹ́ ká bẹ̀rẹ̀.

---

## 2. ayé méjì ló wà nínú Zcash

Before anything else, clear up a common misconception: **Zcash is not "the private coin." It's a coin that offers privacy as an option.** It actually started life as a fork of Bitcoin, and it carries two parallel systems on the same blockchain.

Àgbáyé tí ó ní ààbò.
|---|---|---|
Ìpamọ́ra. Ìpínlẹ̀, bíi Bitcoin. Àkọlé.
Àwọn àdírẹ́sì bẹ̀rẹ̀ pẹ̀lú: `t...` | `z...` or `u...` |
 Olùfúnni/olùgba/ọ̀pọ̀lọpọ̀  **Ẹ̀rí tí ó hàn sí gbogbo ènìyàn  Ìpamọ́ fún gbogbo ènìyàn
Àwọn ẹ̀rọ ìgbàlódé tó wà nídìí rẹ̀, ìwé àkọsílẹ̀ tí ó wà fún gbogbo ènìyàn bíi ti Bitcoin, àwọn àdéhùn tí ó jẹ mọ́ ìdìbò + àwọn ẹ̀rí tí kò ní ìmọ̀ kankan.

Owó pàápàá lè kọjá ààlà láàárín wọn: fífi owó * sínú* ayé tí wọ́n ń dáàbò bò ni a ń pè ní * dídáàbò bo, kíkó wọn padà síbi tó wà ni * ṣíṣídí ààbò kúrò.

The transparent world is "Bitcoin you already roughly understand." It's the **shielded world** that contains all the beautiful cryptography, and that's the only world this series cares about.

![ì í ì °ë¦¬í ë ¤]](image-1.png)

---

## 3. Ìmọ̀lára: Àpótí tí wọ́n fi òǹtẹ̀ dì sára pátákó ìsọfúnni

Èyí ni àwòrán kan ṣoṣo tó máa wà lọ́kàn rẹ láti máa lò nínú àpilẹ̀kọ tó kù.

Fojú inú wo àtẹ ìsọfúnni ńlá kan tí gbogbo èèyàn tó wà lórí ilẹ̀ ayé lè rí nígbà gbogbo.

* **Receiving money** means someone pins a **sealed, opaque envelope** to the board. Inside the envelope is *how much money it holds* and *a secret that only the recipient can read*, because the envelope is locked to that recipient's personal key. The whole world sees that *an envelope appeared*. Nobody but the owner can see what's inside.

* ** Àpótí náà kì í ṣá.** A kì í já àpòòwé lulẹ̀ tàbí kí a pa á rẹ́. A máa ń fi àwọn tuntun sí i, títí láé.

* **Spending money** means stepping behind a curtain, proving *"I own one of the unspent envelopes on this board, and I'm allowed to open it"*, then dropping a unique **void token** into a public "spent" bin and pinning **new envelopes** for whoever you're paying.

Ààtò kékeré náà (fi ẹyọ owó kan tí kò sí sí, fi àpò ìwé tuntun sí, gbogbo rẹ̀ láti ẹ̀yìn aṣọ ìkélé) *ni* ìsanwó Zcash. Gbogbo nǹkan yòókù jẹ́ àlàyé.

Ní báyìí, ẹ jẹ́ ká pe àwọn ohun ìṣeré náà ní orúkọ wọn gan-an.

---

## 4. Orúkọ márùn-ún

Àwọn ọ̀rọ̀ márùn-ún wọ̀nyí ni gbogbo àwọn ọ̀rọ̀ tí ó wà nínú Zcash tí a fi ààbò ṣe. Ẹ kọ́ wọn gẹ́gẹ́ bí ìtàn, kì í ṣe gẹ́gẹ́ bí ìwé atúmọ̀ èdè, wọn yóò sì dì mọ́ ọn.

Nínú ìtàn náà, ọ̀rọ̀ Zcash tòótọ́, ohun tí ó jẹ́ gan-an.
|---|---|---|
Àwọn ohun tó wà nínú àpòòwé náà (iye owó + ẹni tó ni ín + àṣírí) **Àkíyèsí**. "Owó ẹyọ" ti ara ẹni: ìyókù iye tí ó jẹ́ ti ẹnìkan.
| The sealed, opaque envelope on the board | **Note commitment** | A cryptographic seal proving an envelope exists while hiding what's inside |
Àpótí ìkéde fúnra rẹ̀. *Igi Ìdánilójú Àkíyèsí.* Àkọsílẹ̀ tí ó wà ní àfikún-kìkì ti *gbogbo àkíyésí tí a ti ṣe rí.*
Àmì tí kò ní ìmúṣẹ nínú àpò "tí a lò". **Nullifier**. Àmì kan ṣoṣo tó túmọ̀ sí "a ti lo owó yìí báyìí".
Àrídájú pé gbogbo owó tí wọ́n ná jẹ́ èyí tó tọ́, tí wọn ò sì sọ ohunkóhun nípa rẹ̀.

Bí o kò bá rántí nǹkan mìíràn nínú àpilẹ̀kọ yìí, rántí tábìlì yìí. Gbogbo ohun tó tẹ̀ lé e ni *ìdí* tí ó fi jẹ́ pé ọ̀kọ̀ọ̀kan àwọn nkan náà ní láti ní ìrísí bó ṣe rí.

---

## 5. Ìdí tí wọ́n fi ṣe ọ̀kọ̀ọ̀kan àwọn nǹkan náà lọ́nà tó yàtọ̀ síra

Èyí ni apá tí ọ̀pọ̀lọpọ̀ àwọn tó ń ṣàlàyé fi sílẹ̀, ó sì jẹ́ apá tí ó yàtọ̀ "Mo há àwọn ọ̀rọ̀ kan sórí" sí "Mo lóye ìpilẹ̀ṣẹ̀ náà". Ẹyọ kọ̀ọ̀kan nínú àwọn apá márùn-ún náà wà láti yanjú **ìṣòro kan pàtó.**

### Ìpín ìwé náà: fi ohun tó wà nínú rẹ̀ pa mọ́, ṣùgbọ́n má ṣe jẹ́ kí wọ́n ṣe àdàkọ rẹ̀

An ordinary envelope can be steamed open. A cryptographic **note commitment** cannot. Think of it as a *magically* sealed, fully opaque envelope with two superpowers:

- **Ipaboju**: wíwo àpòòwé tí a fi èdìdì dì kò sọ fún ọ *ohunkan* nípa iye tàbí ẹni tó wà nínú rẹ̀.
- **Binding**: lẹ́yìn tí wọ́n bá ti fi èdìdì dí i, a ò lè pààrọ̀ ohun tó wà nínú àpòòwé náà. O ò lè sọ pé iye owó tó wà lára àpòówé náà yàtọ̀ sí iye tó wà níbẹ̀.

báwo ni èdìdì ṣe lè ṣe àwọn nǹkan méjèèjì lẹ́ẹ̀kan náà? èyí jẹ́ ìbéèrè gidi kan tí a sì lè dáhùn. ó jẹ́ kókó ọ̀rọ̀ nínú *àpilẹ̀kọ kẹta (ìpinnu) * fún àkókò yìí, gba àpò ìwé náà gẹ́gẹ́ bí òrìṣà kí o sì máa bá ìrìn rẹ̀ lọ.

### Ohun tí ó mú un kúrò: ohun tí ó jẹ́ ọlọ́gbọ́n gidi

When you spend a note, you publish its **nullifier**, the "void token." This token is computed from *the note itself* **and** *your secret key*. That recipe buys three properties simultaneously, and each one matters:

1. **Kìkì ẹni tó ni ín ló lè ṣe é.** O nílò kókó ìpamọ́ láti ṣírò rẹ̀, kí ẹnikẹ́ni má bàa ná àwọn àkọsílẹ̀ rẹ fún ọ.
2. **Ó jẹ́ *ìkan náà* àmì fún nóòtì kan.** Gbìyànjú láti lo nóòtí kan náà lẹ́ẹ̀mejì, wàá sì mú kí àmì òfo tó jẹ́ "ìkannáà" jáde ní ìgbà méjèèjì, àti pé àpò ìtanràn "ìṣòro" ti wà nínú rẹ̀. 
3. **Kò sí ẹni tó lè mọ ibi tí àpòòwé náà wà.** Àpótí tí kò ní nǹkan kan ṣe pẹ̀lú àpòówé tí wọ́n fi ṣe é.

Ohun-ini kẹta jẹ ọkàn ìpamọ Zcash, ati pe o yẹ fun apakan tirẹ ni isalẹ.

### Ẹ̀rí tí kò ní ìmọ̀ kankan: ìbòjú náà fúnra rẹ̀

Ohun gbogbo n ṣẹlẹ lẹyin ideri, ati pe ohun ti o fi fun agbaye lẹhin naa jẹ ẹri-aini-imọ, iru iwe-ẹri ti ko ni idaniloju. O jẹri ni ipalọlọ si gbogbo eyi ni ẹẹkan:

- * àpò ìwé tí mò ń náwó sí gan-an ni mo so mọ́ àtẹ náà * (ìwé gidi kan tó ti wà tẹ́lẹ̀ nìyẹn),
- *Mo ní ọlá àṣẹ láti ṣí i* (Mo ní kókó tó yẹ),
- *a ti ṣírò owó ìdánimọ̀ mi lọ́nà tí ó tọ́* (kò sí èrú nínú àyẹ̀wò ìnáwó méjì),
- * owó tó wà nínú àpòòwé tuntun mi kò ju ti tẹ́lẹ̀ lọ *: ** kò sí owó tí wọ́n dá láti inú òfo.**

The miracle is that the proof reveals **none** of those facts. Not the amount, not the addresses, not which envelope. It only convinces you that *every statement above is true*. How that's even possible is **Article 5 (zero-knowledge proofs)**, the crescendo of the series.

---

## 6. Ìwàláàyè nọ́ọ̀sì kan ṣoṣo

A note is *born*, it *lives* on the board, and eventually it *dies*, and crucially, its birth and its death look unrelated to anyone watching.

![ì í ì °ë¦¬í ë ¤]](image-2.png)

---

## 7. Owó tó máa ń wọlé fún wọn látìbẹ̀rẹ̀ dé òpin

Ẹ jẹ́ ká wo bí Alice ṣe ń sanwó fún Bob, tí gbogbo ìgbésẹ̀ tó bá gbé ní gbangba àti ní ìkọ̀kọ̀ á sì wà lákọsílẹ̀.

![ì í ì °ë¦¬í ë ¤]](image-4.png)

Kíyèsí àìṣedéédé tí ó mú kí ìpamọ́ ṣiṣẹ́:

- Àkọsílẹ̀ Alice tó ti pẹ́ sẹ́yìn kú nínú àpò ìdọ̀tí.
- Àkọlé tuntun ti Bob ni a bí nípasẹ̀ ìmúṣẹ tuntun nínú ìgbìmọ̀.
- Fún gbogbo àwọn tó ń wò ó, àwọn ìṣẹ̀lẹ̀ méjì yìí kò ní ìsopọ̀ tí ó hàn gbangba.

> báwo ni bob ṣe mọ̀ pé wọ́n sanwó fún un? àkọsílẹ̀ rẹ̀ wà ní ìkọ̀rọ̀ sí kókó rẹ̀. ó ń ṣàyẹ̀wò pẹpẹ náà láìdáwọ́ dúró, kìkì àpòòwé rẹ̀ nìkan ló sì ń ṣí sílẹ̀ fún un, bí ẹni pé kókó kan ṣoṣo ló wà tó bá àwọn ìlẹ̀kùn kan pàtó mu. ohun tó wà lẹ́yìn èyí ni wíwo àwọn kókó, ọ̀ràn tí a ó jíròrò lẹ́hìn-ín.

---

## 8. Ohun táwọn èèyàn ń rí àti ohun tí wọn ò rí

☐ Òtítọ́ nípa ìsanwó náà ☐ Ó hàn sí gbogbo ènìyàn ☐
|---|---|
Ìṣirò tí a fi ìpamọ́ ṣe wáyé.
☐ Ó tẹ̀lé gbogbo ìlànà (kò sí àdàkọ, kò sí ìnáwó méjì) ☐ Bẹẹni (nípasẹ̀ ẹ̀rí)
**Tó** fi owó ránṣẹ́.
**Tani** gba o. A fi pamọ́.
**Iye iye ti a fi ranṣẹ** A fi pamọ
**Kínni** àkọ́kọ́ tí wọ́n lò.

Eyi ni ipinnu ti iyatọ lati Abala 1. Awọn eniyan ṣayẹwo awọn * ofin *, kii ṣe awọn * akoonu *. Ṣayẹwo ati asiri da ija duro, nitori ẹri-imọ-noleri jẹ ki o ṣayẹyẹ iṣaaju laisi ifọwọkan igbehin.

---

## 9. Ìjìnlẹ̀ ọ̀rọ̀: ìdí tí àpòòwé náà àti àmì òfo náà kò fi lè so pọ̀

Bí ẹ bá lóye èrò yìí, ẹ óo mọ ìdí tí Zcash fi jẹ́ àdáni. Ẹ ka ọ̀rọ̀ náà pẹ̀lẹ́.

- A fi àpòòwé kan (ìpinnu) sí orí àtẹ náà nígbà tí a bá kọ àkọsílẹ̀ kan.
- Àmì tí kò lẹ́sẹ̀ nílẹ̀ (nullifier) ni wọ́n máa ń fi sínú àpò ìdọ̀tí nígbà tí wọ́ n bá lo owó náà, bóyá lẹ́yìn oṣù bíi mélòó kan.
- Àwọn ohun tí wọ́n ń mú jáde nípasẹ̀ àwọn àlàyé ìkọ̀kọ̀ tó yàtọ̀ síra, kò sì sí ìlànà ìṣirò kan tó lè sọ ọ̀kan di èkejì.

So an outside observer sees a stream of envelopes appearing and a stream of void tokens appearing, but **cannot match them up**. They can't say "the void token dropped today corresponds to the envelope pinned last March." The link exists *only* inside the secret knowledge of the note's owner, and the zero-knowledge proof confirms the link is valid *without revealing it.*

Ìjápọ̀ tí kò bá dúró yìí ni àwọn iléeṣẹ́ tó ń ṣàyẹ̀wò ìsọfúnni lórí Bitcoin máa ń fi ṣe àjẹkì, ohun tí Zcash sì mọ̀ọ́mọ̀ fi ń gé.

> Ìdánwò ẹ̀rí ọkàn rẹ: Bí a bá ṣe àtúnyẹ̀wò àwọn ohun tí ó jẹ́ òfo ní àyàfi láti inú àkọsílẹ̀ náà (kò sí kókó ìkọ̀kọ̀), èwo nínú àwọn ohun-ìní mẹ́ta tó wà nínú Abala 5 ni yóò rú, kí sì nìdí tí èyí yóò fi pa àṣírí ẹni run?

---

## 10. Ẹni tó jẹ́ olóòótọ́ máa ń sọ pé òun ò jẹ̀bi

This is a **mental model**, not the spec. To keep it newcomer-friendly we've quietly simplified several real things: Zcash has had multiple shielded designs (Sprout, then Sapling, now Orchard); real transactions can spend and create *several* notes at once; "the board" is technically a specific kind of tree, not a literal pinboard; and value balance is enforced with some additional cryptographic bookkeeping. None of those details change the story you just learned; they refine it. We'll add the precision back, one article at a time, and flag clearly whenever we do.

Àwọn ìsọfúnni tó dára nípa ẹ̀kọ́ máa ń jẹ́ kí àwọn èèyàn fọkàn tán ọ nípa sísọ ohun tí wọ́n fi sílẹ̀.

---

## 11. Àwọn ìlà tí a ṣí (àwòrán rẹ ti àwọn ìsọ̀rí)

Gbogbo "a ó padà wá sí èyí" lókè yìí jẹ́ ìjápọ̀ kan.

![ì í ì °ë¦¬í ë ¤]](image-29.png)

 Ìparí ọ̀rò̀ yìí. Níbi tí ó ti yanjú.
|---|---|
▪ Báwo ni àpò ìwé tí wọ́n dì ṣe lè jẹ́ èyí tí a kò lè fi hàn, tó sì tún jẹ́ ohun tí kò ṣeé díbọ́n? ▪ Abala Kẹta: Ìpinnu
| Where do the keys and secret recipes come from? | Articles 1 & 2: fields and curves |
Kí ni "àgbékalẹ̀" náà gan-an? Ẹ̀ka 4: Àwọn igi Merkle
Báwo lo ṣe lè fi ẹ̀rí hàn láìfi ohunkóhun hàn? Àpilẹ̀kọ 5: Ẹ̀rí tí kò ní ìmọ̀ rárá.
 Bawo ni gbogbo awọn ẹya marun ṣe ṣajọ papọ ni Zcash gidi?  Abala 6: ilana aabo.

---

## 12. Àkópọ̀

- Bitcoin jẹ **transparent**; Zcash nfunni ni agbaye **shielded** nibiti oluranlowo, olugba, ati iye ti wa ni pamọ.
- Àdììtú tó fara hàn yìí ni kókó náà, ó sì ṣeé yanjú.
- A shielded payment is five interlocking pieces: a **note** (the coin), a **note commitment** (the sealed envelope), the **note commitment tree** (the public board), a **nullifier** (the void token that prevents double-spends), and a **zero-knowledge proof** (the curtain that proves validity while revealing nothing).
- Ìpamọ́ nígbẹ̀yìngbẹ́yín sinmi lórí **ìjápọ̀ kan tí a gé kúrò**: kò sí ẹnikẹ́ni láyìíká tó lè so ìbí ìwé-ìwé kan (ìdásílẹ̀) pọ̀ mọ́ ikú rẹ̀ (ẹni tí ó sọ ọ́ di asán).
- Àwọn aráàlú máa ń ṣàyẹ̀wò àwọn ìlànà, wọn kì í ṣàyẹ̀wò ohun tó wà nínú rẹ̀.

Ìwọ lo máa di àwòrán ilẹ̀ náà mú, àwọn tó kù nínú ìsọ̀rí náà á sì kún un.

---

## Àkójọ àwọn ọ̀rọ̀

Ọ̀rọ̀-ìtumọ̀ èdè Gẹ̀ẹ́sì tó rọrùn.
|---|---|
**Àkíyèsí** Ìlànà ìdánimọ̀ kan ti iye, Zcash jẹ́ àpapọ̀ ẹyọ owó tàbí owó-ìwé.
Àmì ìdánilójú tí ó jẹ́ ẹ̀rí wíwà tí owó-ìṣírò kan láìfi hàn án.
♬ **Àkọsílẹ̀ Ìdánilójú Igi** ♬ Àfikún-kì àkọọlẹ gbogbo àkọsílẹ ti gbogbo àkọsílẹ̀ ìdànilòpadà
**Nullifier**: Àkọsílẹ̀ àrà ọ̀tọ̀ kan tí wọ́n máa ń tẹ̀ jáde nígbà tí a bá lo nóòtì, tí kì í jẹ́ kí owó náà wọlé lọ́pọ̀lọpọ̀.
**ìdánilójú ò-mọ-nǹkan** Èrí wípé àlàyé kan jẹ́ òtítọ́ nígbà tí kò fi ohunkóhun hàn yàtọ̀ sí òótọ́ rẹ̀
Ṣíṣí owó wọlé tàbí jáde nínú ayé tí a fi ààbò bo.
**Key view**Key tó ń jẹ́ kí onílé rí àwọn ìwé tí wọ́n kọ sí i kí ó sì kà á.

---

## Àwọn ìbéèrè tí a sábà máa ń béèrè

**Ṣé gbogbo ìgbà ni Zcash máa ń jẹ́ àdáni?**
Rárá. Ìpamọ́ ní í ṣe pẹ̀lú àgbáyé tí a fi ìbòjú bo (`z...`/`u...` àwọn adirẹsi).`t...`) àwọn ìsọfúnni náà máa ń wà lárọ̀ọ́wọ́tó gbogbo èèyàn bíi ti Bitcoin.

** Ti ohun gbogbo ba farapamọ, kini o da ẹnikan duro lati tẹ owo ọfẹ?**
Àrídájú ìmọ̀ òfo. Ó ń fi ìṣirò mú kí gbogbo ohun tí wọ́n bá ṣe ní ìmúṣẹ láti ní ìtìlẹyìn àwọn ohun tó jẹ́ ojúlówó, tí wọn kò lò, *nígbà tí* ó ń pa iye owó náà mọ́.

**Ṣé a lè ná owó kan náà lẹ́ẹ̀mejì?*
Rárá o. Tí a bá lo nọ́ọ̀tì kan, ó máa mú kí ohun tó sọ pé kò wúlò jáde; tá a bá tún gbìyànjú èkejì, á mú kí irú ohun kan náà tí kò ní wúló jáde, èyí tó ti wà nínú àpótí tí wọ́n ń pè ní "spent" bin, nítorí náà, àkànlò náà á kọ ọ́.

**Ǹjẹ́ àwọn àjèjì lè so ẹni tó ń ránṣẹ́ àti ẹni tó gbà á pọ̀?**
No. The commitment (note's birth) and the nullifier (note's death) can't be matched by anyone without the owner's secret knowledge.

---

### Ìdáhùn sí ìdánwò èrò orí (Apá 9)

If the nullifier were computed *only* from the note, with no secret key, then **anyone** could compute it, breaking property #1 (only the owner can spend). Worse, the nullifier would now be derivable straight from public information about the note, which could let observers **link the nullifier back to its commitment**, breaking property #3 and quietly unravelling the privacy of the whole system. The secret key is what makes the void token both *exclusively yours* and *unlinkable.*

---

### Kí ló tún ń bọ̀?

**Article 1 . Finite fields:** the strange, beautiful number system where arithmetic "wraps around," and the reason every piece of cryptography in this series lives there. We'll start, as always, with intuition, no formulas until they're earned.

* Apá kan nínú àwọn* Zcash láti Àwọn Ìlànà Àkọ́kọ́ *series fún [ZecHub](https://zechub.org)Àdàkọ CC BY-SA 4.0.*
