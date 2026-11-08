<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Payment_Disclosures.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Ɣaɣla [Shielded] fexexe ƒe ɖaseɖigbalɛ kple fexexe ƒe nyaɖeɖe

## TL;DR

- Gaɖoɖo [transaction] ID dea gaɖoɖo aɖe dzesi, gake mèɖea ɣaɣla xɔla, gaƒoƒo, alo nya kpui [memo] fia o.
- Wo wɔ fexexe ƒe nyaɖeɖe be wòana dɔla nàte ŋu aɖe fexexe aɖe ƒe nyawo fia, eye wòmeɖea eƒe gakotoku [wallet] ƒe ŋkɔmeɖeŋu katã ɖe go o.
- Nukpɔsafui [viewing key] nana xexlẽ ƒe mɔ na gaɖoƒe ƒe dzesi [address] alo akɔŋu. Zãe na numekpɔkpɔ siwo ayi edzi, menye fexexe aɖe ƒe nyaŋlɔɖi ƒe ta o.
- Fexexe ƒe nyaɖeɖe mate ŋu aɖe nuƒoƒo ƒe ɖoɖo fia o, mate ŋu ade ame aɖe ƒe dzesi le eɖokui me o, mate ŋu atrɔ fexexe megbe o, eye mate ŋu awɔ confirmation ƒe nukpɔkpɔ teƒe o.
- [ZIP 311](https://zips.z.cash/zip-0311) gale **Draft** ko. Eƒe nuŋlɔɖi si le fifia me, Orchard ƒe kpekpeɖeŋu, nuwo ƒe ʋuʋuɖi-input ƒe kpekpeɖeŋu, encoding, versioning, kple user-interface ƒe sewo medze enu o.

## Nu ka ta gaɖoɖo ID mede o

Ame sia ame ate ŋu akpɔ nuwo ƒe ʋuʋuɖi Zcash fexexe ƒe dukɔme nyawo. Gaɖoɖowo ƒuƒoƒe [block] ƒe didimekpɔnu ate ŋu afia eƒe gaɖoƒe ƒe dzesiwo, gaƒoƒowo, kple confirmation ƒe nɔnɔme.

Ɣaɣla fexexe wɔa dɔ le mɔ bubu nu. Ɖoɖonu [chain] la ɖea ɖase be gaɖoɖoa wɔ nu ɖe Zcash ƒe sewo nu, gake metsi ɣaɣla dɔla, xɔla, gaƒoƒo, alo nya kpui o. Gaɖoɖo ID mama ate ŋu afia be wo kuku gaɖoɖo la le block me, gake mate ŋu aɖe fia asitsalawo alo ame etɔ̃ aɖe be fexexe si le eƒe me nye ka o.

Esia hea kuxi si wɔnɛa. Asiflela aɖe hia be wòatsɔ asitsala ƒe nyaŋlɔɖi aɖe awɔ nu, gatrɔƒe [exchange] aɖe hia be wòaɖe fia be yewɔ gaɖeɖe aɖe, alo ame si na ga hia be wòaɖe eƒe kpekpeɖeŋu aɖe fia. Nukpɔsafui blibo mama aɖea nyawo geɖe wu ale si nya siawo dometɔ aɖeke hia.

[ZIP 311: Zcash Fexexe ƒe Nyaɖeɖewo](https://zips.z.cash/zip-0311) dea ŋuɖoɖo sue aɖe: ɖe nyawo siwo wotia tso gaɖoɖo aɖe me ɖe go eye nàɖe eƒe nyateƒe fia.

![A transaction ID proves that a transaction exists but does not reveal shielded payment details. A ZIP 311 payment disclosure would let a verifier authenticate only the selected recipient, amount, memo, and optional sender details against the mined transaction.](/content-images/payment-disclosure-proof-flow-208c033e06.webp)

## Ale si fexexe ƒe nyaɖeɖe wɔa dɔe

Mɔ gɔmeɖeɖe lae nye:

1. Ɖaseɖigbalɛ ƒe kpeɖeŋutɔ na ɖolila la fɔsẽ ƒe biabia alo ƒeɖoƒe tɔxɛ, ne wɔwɔ ɖaseɖigbalɛ [interactive proof] le nyuitɔ.
2. Ɖolila la tia gaɖoɖo la kple ɣaɣla nuɖoɖo alo nuɖoɖowo si wòadi be yeafia.
3. Gakotoku [wallet] ƒe dɔwɔnu si dze ɖe eŋu wɔa fexexe ƒe nyafia si ƒo xɔ̃ na gaɖoɖo ma eye, ne wòdi, na biabia la.
4. Ɖolila la na nyafia la ɖaseɖigbalɛ ƒe kpeɖeŋutɔ la.
5. Ɖaseɖigbalɛ ƒe kpeɖeŋutɔ la kpɔ gaɖoɖo vavã la tso Zcash ɣaɣla dzesi ŋɔŋlɔ si wokpɔ dzi se me, doa go be wonuku e, eye wòkpe ɖe nyafia la ŋu kple e.
6. Ɖoɖo si le nyuie dea go be nyawo siwo le nyafia ma me koe wòtsɔ ɖe eme.

ZIP ƒe Sapling ƒe ɖoɖo zãa outgoing cipher key be wòaxɔ output si wotia ɖe sia ɖe gbɔ. Esia ate ŋu afia output la ƒe xɔla, gaƒoƒo, kple nya kpui. Ehia gazazãsafui [spending key] ƒe ŋusẽ ƒe ɖase na gaɖoɖo ƒe input aɖe hã, ale be ame si kpɔ gaɖoɖo la ko mate ŋu awɔ nyaɖeɖe si le nyateƒe me abe ne ye wɔe o.

Sapling fexexe ƒe nyaɖeɖe mele be wòaɖe dɔla ƒe gaɖoƒe ƒe dzesi fia o. Gazazã ƒe ŋusẽ ate ŋu ase gaɖoƒe ƒe dzesi siwo woto vovototo me wɔ geɖe, eyata gazazã ƒe ŋusẽ ƒe ɖase medea gaɖoƒe ƒe dzesi aɖe ƒe nyateƒe fia le eɖokui me o. ZIP 311 tsɔ gaɖoƒe ƒe dzesi ƒe ɖase si wotia de eme na nya siwo me wòle be woakaka ɖase la ɖe dɔla ƒe gaɖoƒe ƒe dzesi si woanya ŋu.

## Fexexe ƒe nyaɖeɖe alo nukpɔsafui?

| Mɔnu | Zã nyawo si nyo wu | Nu si wòɖea fia | Ƒeɖeɖe si ayi edzi? | Wo kakae kple fexexe la cryptographically? |
| --- | --- | --- | --- | --- |
| Transaction ID | Kpɔkpɔ be wo kuku gaɖoɖo aɖe | Dukɔme gaɖoɖo ƒe data kple confirmations | Ao | Ɛ̃, gake ɣaɣla fexexe ƒe nyawo gale ɣaɣla |
| Screenshot or receipt | Nyaŋlɔɖi ƒe dzadzraɖoɖo si menye se tɔxɛ o | Nu sia nu si dɔla tia be yòaɖe fia | Ao | Ao; woate ŋu atrɔ nɔnɔmetata la |
| Payment disclosure | Ɖe fexexe aɖe ƒe nyawo siwo wotia ƒe nyateƒe fia | Gaɖoɖo ƒe outputs siwo wotia kple dɔla alo challenge ƒe ɖase siwo woɖe ɖe eme | Ao, gake woate ŋu akpɔ ɖase si womama la ƒe kopi | Ɛ̃ |
| Incoming Viewing Key | Kpɔ fexexewo si akɔŋu aɖe xɔ | Incoming activity si key la kpɔ | Ɛ̃ | Ekpɔ ɣaɣlaŋlɔŋlɔ [encryption] le fexexewo si sɔ kplee ƒe me |
| Full Viewing Key | Akɔŋu aɖe ƒe accounts alo numekpɔkpɔ | Incoming kple outgoing activity, gaƒoƒowo, nya kpuiewo, kple balances si key la kpɔ | Ɛ̃ | Ekpɔ ɣaɣlaŋlɔŋlɔ le akɔŋu ƒe activity si sɔ kplee ƒe me |

Zã nyaɖeɖe sue wu si ɖoa biabia la ŋu. Asitsala ƒe nyaŋlɔɖi tso fexexe aɖe ŋu mele be wòanɔ mɔ na akɔŋu me fexexe ɖe sia ɖe kpɔkpɔ o. Accountant si le be wòakpɔ reporting period blibo aɖe me ate ŋu ahia nukpɔsafui ɖe eteƒe.

Mɔ aɖeke menana mɔ be woazã ga o. Mègana gadzraɖoɖi nya [seed phrase], gazazãsafui, private key, alo gakotoku ƒe backup abe fexexe ƒe ɖase o.

![A transaction record is available today but provides no new third-party proof. A payment disclosure would prove selected details of one payment. A viewing key provides broader, ongoing visibility.](/content-images/payment-disclosure-scope-0585cdc075.webp)

## Nu ka nye si mate ŋu azã egbe?

Gakotoku aɖeke si le fifia me womeɖe eƒe ŋkɔ le afisia abe esi wɔa ZIP 311 fexexe-ƒe-nyaɖeɖe wɔwɔ alo ɖoɖoɖo o. ZIP gale draft, eye wòŋlɔ eƒe reference implementation be "TBD." Dɔwɔnu siwo woƒe dzadzraɖoɖo yina edzi siwo gbɔna la ate ŋu akpe ɖe dɔla, xɔla, alo numekpɔla si woɖe mɔ nɛ ŋu be woakpɔ nyaŋlɔɖi siwo le egbe:

| App | Nu si wòle be wòawɔ egbe | Meli vevi |
| --- | --- | --- |
| [Zkool](https://github.com/hhanh00/zkool2) | Kpɔ gaɖoɖo ƒe metadata si le nyuie, gaƒoƒowo, gaƒuƒoƒo [pool] ƒe inputs kple outputs, kple nya kpuiewo; tsɔ Unified alo Sapling nukpɔsafuiwo de view-only accounts me | Meɖea ZIP 311 nyaɖeɖe wɔwɔ alo ɖoɖoɖo ƒe gbe o |
| [Zingo PC](https://github.com/zingolabs/zingo-pc) | Kpɔ ɣaɣla gaɖoɖo ƒe ŋkɔmeɖeŋu kple nya kpuiewo me; tsɔ Unified Full Viewing Key de eme le read-only mode me | Gakotoku ƒe nyaŋlɔɖi alo read-only akɔŋu menye fexexe ƒe nyaɖeɖe si woka ɖe nya aɖe ko ŋu o |
| [Zallet](https://zcash.github.io/zallet/) | Operator ƒe dɔwɔmɔwo siwo zãa `z_viewtransaction`, `z_exportviewingkey`, kple `z_importviewingkey` | Beta software; eƒe nukpɔsafui kple gaɖoɖo RPCs ƒe nɔƒe kekeake wu alo wonye local records, menye ZIP 311 ƒe ɖasewo o |

Zã gakotoku si dɔ fexexe la alo xɔe la gbã. Kpɔ eƒe gaɖoɖo ƒe nyawo, nya kpui, gaɖoɖo ID, kple confirmations, eye nàbia ame bubu la be wòatsɔ nyawo ma asɔ kple eya ŋutɔ ƒe nyaŋlɔɖiwo. Mègbe gakotoku yeye ɖe eme eye nàtsɔ gadzraɖoɖi nya ɖo eme be nàwɔ ɖase ko o. Ne numekpɔla aɖe hia nukpɔkpɔ si ayi edzi, bu view-only akɔŋu si sɔ ɖe eme ŋu eye se nukpɔsafui la ƒe nɔƒe gɔme hafi nàmama.

Apps siawo nye mɔ siwo wɔnɛa na nyaŋlɔɖi kpɔkpɔ, menye ɖase be fexexe ƒe nyaɖeɖe si wode se na le o. Screenshot ate ŋu akpe ɖe ameawo ŋu be woasɔ nyaŋlɔɖiwo, gake woate ŋu atrɔe eye menye cryptographic ɖase o.

## Afisi fexexe ƒe nyaɖeɖewo wɔnɛ

### Asitsala ƒe nyaŋlɔɖiwo

Asiflela ate ŋu aɖe fia be wòɖo gaƒoƒo aɖe ɖe asitsala ƒe ɣaɣla gaɖoƒe ƒe dzesi. Ɖase la meɖea fia be woɖo nuƒoƒo o, be woɖo be woatsɔ ga atrɔ alo o, alo be ame si tsɔe va la ƒe legal identity le etɔxɛ o. Biabia siawo gale order ƒe nyaŋlɔɖi kple ameawo ƒe agreement ŋu.

### Ɣaɣla gaɖeɖewo

ZIP 311 ƒo ɣaɣla gaɖeɖewo ƒe nya abe zã nyawo aɖe: gatrɔƒe aɖe aɖe xɔla kple gaƒoƒo la ƒe nyateƒe fia ne metsi nyawo ma ɖe ɖoɖonu dzi o. Eƒe nuwo ƒe ʋuʋuɖi-input ƒe ɖase medze enu haɖe o, eyata esia menye standard ƒe dɔwɔmɔ blibo haɖe o. Asiflela hia be wòakpɔ gaɖoɖo la ƒe confirmation ƒe nɔnɔme le eɖokui me hã.

### Ga nana

Ame si na ga alo campaign aɖe ate ŋu aɖe kpekpeɖeŋu aɖe ƒe nyateƒe fia ne fexexe bubuwo gale ɣaɣla. Nyaɖeɖe la ɖe dukɔme nana wɔa be eƒe nyawo siwo wotia la na ame sia ame si xɔ kopi, eyata mɔ ɣaɣla si me woaɖoɖo nya la nyo wu ne dukɔme ɖase mehia o.

### Akɔŋu ƒe nyaŋlɔɖi

Zã fexexe ƒe nyaɖeɖe ne accountant hia ɖase na gaɖoɖo aɖe. Zã nukpɔsafui si meɖe go o wu ne accountant hia mɔ si ayi edzi na gaɖoɖowo geɖe alo reporting period blibo aɖe.

## Ɣaɣla ƒe dɔwɔmɔ si le dedie

ZIP 311 menye gakotoku ƒe standard si wode enu, si woate ŋu azã le afisia afisia haɖe o. Ne dɔwɔnu siwo sɔ na dɔla kple ame si akpɔ ɖase la va le, zã checklist sia:

1. **Kpɔ be woasɔ kple wo nɔewo gbã.** Dɔwɔnu eveawo katã le be woakpe ɖe nyaɖeɖe ƒe format ɖeka kple ɣaɣla gaƒuƒoƒo si fexexe la zã ŋu.
2. **Ɖo kuxi siwo wɔnɛa kpɔ gbã.** Kpɔ gakotoku ƒe sync, gaɖoɖo ID, confirmation ƒe xexlẽme, expiry ƒe nɔnɔme, kple xɔla ƒe nyaŋlɔɖiwo hafi nàɖe nyawo ɣaɣla ɖe go.
3. **Bia challenge.** Na nyaŋlɔɖi aɖe, ame si akpɔ ɖase la le be wòana order ƒe xexlẽme yeye alo random challenge, ale be woakaka nyaɖeɖe la ɖe biabia ma ŋu.
4. **Tia output si hia ko.** Mètsɔ outputs bubuwo tso gaɖoɖo ma ke me ɖe eme o.
5. **Kpɔ field siwo katã woaɖe fia gbã.** Kpɔ xɔla, gaƒoƒo, nya kpui, dɔla-gaɖoƒe-ƒe-dzesi ƒe ɖase, kple challenge hafi nàɖe eme.
6. **Ma le mɔ ɣaɣla dzi.** Nyaɖeɖe menye gazazãsafui ɣaɣla o, gake ame sia ame si xɔe ate ŋu akpɔ alo awɔ nyawo si wòɖea fia ƒe mama.
7. **Ɖoɖo kple ɖoɖonu la.** Ame si akpɔ ɖase la le be wòatsɔ gaɖoɖo si tututu tso ɣaɣla dzesi ŋɔŋlɔ si wòka ɖe dzi me, akpɔ be wòle network kple gaɖoɖowo ƒuƒoƒe si wolɔ̃ me, eye wòaɖo nyaɖeɖe la.
8. **Ŋlɔ emetsonu la, menye ɣaɣla bubuwo o.** Dzra nu si nyaŋlɔɖi, gaɖeɖe, ga nana, alo akɔŋu ƒe nyaŋlɔɖi ƒe mɔnu hia ko ɖo.

Ne gakotoku la mate ŋu awɔ nyaɖeɖe o, mègatsɔ nukpɔsafui blibo de eteƒe me ne mèse eƒe nɔƒe kekeake kple si menoa o. Bia be xɔla la ate ŋu aɖe fexexe la ƒe nyateƒe fia tso eya ŋutɔ ƒe gakotoku ƒe nyaŋlɔɖiwo me alo wòate ŋu axɔ nyaŋlɔɖi si meɖe nyawo geɖe go o.

## Nu si nyaɖeɖe si le nyateƒe me meɖea fia o

Ɖoɖoɖo si dzɔ nyuie meɖea nu siawo ƒe nyateƒe fia o:

- Be gaɖoɖo la ƒe confirmations sɔ na ame si akpɔ ɖase la ƒe risk policy
- Be chain reorganization mate ŋu aɖe gaɖoɖo yeye aɖe o
- Be woɖo nuƒoƒo alo servicewo
- Be gaatrɔtrɔ alo chargeback le be woawɔ
- Be dɔla la kpɔa gaɖoƒe ƒe dzesi aɖe ŋu, ne woɖe gaɖoƒe ƒe dzesi ƒe ɖase si sɔ ɖe eme o
- Be ame si tsɔ nyaɖeɖe la va la ƒe ameŋutilã ƒe identity si wògblɔ le nyateƒe me
- Be outputs si woɖe fia o, gaɖoɖo bubuwo, alo gakotoku la ƒe balance wɔ nu le gaƒoƒo aɖe
- Be nyaɖeɖe la anɔ ɣaɣla le mama megbe

Ame si akpɔ ɖase la le be wòakpɔ ɖoɖonu me nɔƒe kple confirmation ƒe nɔnɔme le eɖokui me. ZIP 311 ƒe ɖoɖo ƒe mɔnu bua be ame si yɔe la xɔ gaɖoɖo si wo kuku xoxo kple eƒe gaɖoɖowo ƒuƒoƒe ƒe kɔkɔme xexlẽme.

## Meli siwo le fifia

Bu ZIP 311 be nye standard si woɖo ɖe ŋgɔ, menye ŋugbe be gakotoku si le fifia me wɔa **Fia fexexe ƒe nyateƒe** ƒe button o.

Draft la dea Sapling ƒe gazazãwo kple outputs ɖe eme fifia, gake eƒe nu siwo medze enu haɖe nye Orchard, nuwo ƒe ʋuʋuɖi inputs, nyaɖeɖe ƒe encoding, versioning, kple ale si gakotokuwo le be woafia validity ƒe level vovovowo. Woŋlɔ eƒe reference implementation hã be "TBD." Abe ale si woŋlɔe ene la, meɖoa fexexe ƒe nyaɖeɖewo na Orchard alo Ironwood fexexewo o.

Dɔla la hã mate ŋu aɖe output aɖe ɖe go o ne wo wɔ gaɖoɖo la ŋutɔ be outgoing viewing key mele output ma ŋu o. ZIP 311 de ɣaɣla ƒe tiatia ma ɖe eteƒe, le mɔ yeye aɖe ɖe recovery ta teƒe o.

Nyaŋlɔɖi xoxowo ƒo experimental `z_getpaymentdisclosure` kple `z_validatepaymentdisclosure` commands le `zcashd` ŋu. Commands mawo kpe ɖe **Sprout JoinSplit outputs ko** ŋu, menye Sapling ƒe ɖoɖo si le ZIP 311 me o, eye woɖe woƒe zãzã ɖa. `zcashd` va se ɖe eƒe End-of-Support ƒe tɔtɔtɔ katã me le July 2026. Mègazã mɔɖeɖe xoxo ma abe fiafia na ga siwo le fifia o.

Meli siawo menye be susu la mewɔnɛ o. Woɖea nu me be nu ka ta fiafia si le nyuie le be wòama ɣaɣla ƒe model kple zã nyawo tso software siwo le klalo na zãla ƒe dzadzraɖoɖo ŋu.

## FAQ

### Ate ŋu aɖe ɣaɣla fexexe aɖe ƒe nyateƒe kple gaɖoɖo ID ko oa?

Ao. ID la ate ŋu ade gaɖoɖo la kple eƒe confirmation ƒe nɔnɔme dzesi, gake ɣaɣla xɔla, gaƒoƒo, kple nya kpui menye dukɔme nyawo o.

### Fexexe ƒe nyaɖeɖe nye nukpɔsafuia?

Ao. Nyaɖeɖe aɖe kaka ɖe gaɖoɖo aɖe ƒe nyawo siwo wotia ŋu. Nukpɔsafui ate ŋu aɖe activity si sɔ ɖe gaɖoƒe ƒe dzesi alo akɔŋu aɖe ŋu fia le ɣeyiɣi me.

### Xɔla la ate ŋu awɔ dɔla ƒe ɖasea?

Ao, menye le ZIP 311 ƒe ɖoɖo nu o. Nyaɖeɖe si le nyateƒe me le be wòaɖe gazazã ƒe ŋusẽ fia na input aɖe. Xɔla la ate ŋu aɖe fexexe aɖe ƒe nyateƒe fia kple eya ŋutɔ ƒe gakotoku ƒe nyaŋlɔɖiwo, gake esia nye nya bubu.

### Ate ŋu aɖe nyaɖeɖe aɖe ɖa le mama megbea?

Ao. Menana akɔŋu ƒe mɔ si ayi edzi abe nukpɔsafui ene o, gake woate ŋu akpɔ data kple ɖase si woɖe fia ƒe kopi. Ma nɛ kple nyagblɔɖi ale si nàma financial record ɣaɣla bubu aɖe.

### Ɖoɖoɖo la ɖea alo kɔa ZEC aɖekea?

Ao. Nyaɖeɖe wɔwɔ alo ɖoɖoɖo mewɔa gazazã, gaatrɔtrɔ, frost, alo gaɖeɖe megbe o.

### Nu ka wòle be mazã egbe ne nye gakotoku mewɔa nyaɖeɖe o?

Dze egɔme kple xɔla ƒe gakotoku ƒe nyaŋlɔɖiwo, gaɖoɖo ID kple confirmation ƒe nɔnɔme, invoice ƒe reference le nya kpui si woŋlɔ ɣaɣla me, alo receipt bubu si mia ame eveawo katã lɔ̃. Zã nukpɔsafui ne eƒe nɔƒe kekeake hia le nyateƒe me eye wòse gɔme.

## Nudzɔdzɔwo

- [ZIP 311: Zcash Fexexe ƒe Nyaɖeɖewo](https://zips.z.cash/zip-0311) - draft ƒe ɖoɖo, hiahiãwo, ɖoɖo ƒe mɔnu, kple ɣaɣla ƒe nuxlɔ̃wo
- [ZIP 310: Sapling Nukpɔsafuiwo ƒe Dedie ƒe Nɔnɔmewo](https://zips.z.cash/zip-0310) - nu siwo nukpɔsafuiwo ɖea fia kple guarantees siwo wonana
- [ZIP 304: Sapling Gaɖoƒe ƒe Dzesi ƒe Asidede Agbalẽ Teewo](https://zips.z.cash/zip-0304) - gaɖoƒe ƒe dzesi-ɖase ƒe mɔnu si wotia, si ZIP 311 yɔe
- [Zcash protocol specification](https://zips.z.cash/protocol/protocol.pdf) - Sapling didienu [note] ƒe ɣaɣlaŋlɔŋlɔ, outgoing viewing keys, kple gazazã ƒe mɔɖeɖe
- [Archived zcashd fexexe-ƒe-nyaɖeɖe ƒe document](https://github.com/zcash/zcash/blob/master/doc/payment-disclosure.md) - Sprout-only implementation xoxo, menye fiafia si le fifia o
- [zcashd features si woɖe woƒe zãzã ɖa](https://zcash.github.io/zcash/user/deprecation.html) - experimental disclosure commands xoxo ƒe nɔnɔme

## Axɔa siwo sɔ kplee

- [Gaɖoɖowo](/using-zcash/transactions) - ɣaɣla fexexewo, confirmations, kple gaɖoɖo ƒe kuxi ƒe ɖoɖo
- [Nukpɔsafuiwo](/zcash-tech/viewing-keys) - read-only mɔ si ayi edzi kple export ƒe mɔnu siwo le fifia
- [Nu si gaɖoɖowo ƒuƒoƒe ƒe didimekpɔnu ate ŋu akpɔ](/zcash-tech/what-a-block-explorer-can-see) - gaɖoɖo ƒe fields dukɔme kple ɣaɣla
- [Nyaŋlɔɖi ƒe dzadzraɖoɖo kple ɣaɣla ZEC](/zcash-use-cases/keeping-records-with-shielded-zec) - akɔŋu wɔwɔ ne metsi gakotoku ƒe ŋkɔmeɖeŋu ɖe go
