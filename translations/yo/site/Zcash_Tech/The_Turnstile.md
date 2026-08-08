# Ìyípadà náà ni pé:

## TL;DR

- Awọn turnstile ni a gbangba iṣiro ofin ti o orin bi Elo iye wọle ki o si fi kọọkan shielded pool
- Ó ń jẹ́ kí ẹnikẹ́ni rí i pé kò sígbà tí àpò kan máa san ju iye tó wà nínú rẹ̀ lọ, bó tilẹ̀ jẹ́ pé àwọn ìnáwó inú wọn kì í ṣe ti ẹnì kankan.
- Eyi daabobo ipese ZEC lati inu kokoro ti o farapamọ, nitori awọn owó ayédèrú ko le fi adagun silẹ laisi fifọ iye naa
- Ó ń ṣiṣẹ́ láìṣe àìsí ìpamọ̀, nítorí pé iye owó tó wà nínú pólò nìkan ló jẹ́ ti gbogbo ènìyàn, kì í ṣe àwọn ìdánwò kálukú.
- Ìyípadà náà ni ìdí tí àlọsí Orchard sí Ironwood fi lè jẹ́ ẹ̀rí pé ìfúnpá tó wà lábẹ́ ọjà kò ní jàǹbá kankan.

<br/>

## Ta ni èyí wà fún?

- Ẹnikẹni ti o ba fẹ lati ni oye bi Zcash pa awọn oniwe-aṣiri ipese gbẹkẹle
- Users following the Orchard to Ironwood migration and wondering how it proves the supply is real
- Awọn tuntun ti o nifẹ si bi eto owo ikọkọ kan ṣe le tun ṣayẹwo

<br/>

## Ìṣòro Tó Wà Nídìí Ẹ̀

Shielded Zcash hides amounts, senders, and receivers. That privacy is the point. But it raises a hard question: if nobody can see inside the shielded pool, how does anyone know the total amount of ZEC is correct? How do you audit money you cannot see?

bí kòkòrò kan bá jẹ́ kí ẹnìkan ṣe owó ẹyọ nínú adágún tí a fi ọ̀pá ìkọlù pa, ààbò tó ń dáàbò bo àwọn oníṣeégbíyèlé ni yóò máa tọjú irú ìwà àìdáa bẹ́ẹ̀. láìsí ìdánilójú yìí, ó lè ba ìgbàgbọ́ èèyàn nínú gbogbo ohun èlò náà jẹ́. ìgbékùn yíyẹ ló sì máa yanjú ìṣòro yìí.

<br/>

## Kí ni àgbá yípo náà?

Think of each shielded pool as a room with a single counted doorway. Every time value enters the pool from outside, or leaves it to go elsewhere, it passes through the doorway and is tallied in public. The transactions inside the room stay private, but the running total at the door is visible to everyone.

The rule is simple: a pool can never let more value out than has gone in. Nodes reject any block that would push a pool's balance below zero. The amount believed to be inside a pool is known at all times, because it is just the total that entered minus the total that left. This public tally is the turnstile.

<br/>

## Bí ó ṣe ń ṣiṣẹ́

Zcash ní àwọn díẹ̀ nínú ìsọ̀rí tí ó ni ààbò láti ìgbà ayé rẹ, bíi Sprout, Sapling àti Orchard. Iye ń ṣí kiri láàrin ẹrù òwò-ìpamọ́ tó ṣe kedere náà àtàwọn ìsọ́rí wọ̀nyí, nígbà míì sì rèé láàárín àwọn ìsôsojú ara wọn. Ìṣàtúnṣe yìí máa n wo ìgbésè:

1. Nígbà tí ZEC bá kó sínú ẹgbẹ́ kan tó ní ààbò, iye náà á di èyí tá a fi kún ìdìpọ̀ owó ìjọba ti àjọ yẹn.
2. Nigbati ZEC ba jade kuro ninu apapo, iye naa ni a yọkuro.
3. Àwòrán ìdìpọ̀ kò ní jẹ́ kí àlàfo wà nínú póòpù, èyí túmọ̀ sí pé àwọn tó ń jáde ju ti wọlé lọ.
4. Àwọn ìnáwó tí a fi ààbò ṣe ní ìdákọ́ńkọ̀ ni kò sí lábẹ́ òfin, àwọn iye tó wà nínú ẹgbẹ nìkan ló jẹ́ ti gbogbo ènìyàn.

Àjọ náà ń tọpinpin ìdìpò fún gbogbo àgbáye iye tí ó wà ní ọ̀nà yìí, títí kan Sprout, Sapling, Orchard, àgbáyé Ironwood tuntun àti àwọn òwò tó ṣe kedere. Nítorí èyí, bí ohun ti o wa nínú àgbáyè bá tilẹ̀ fara sin, ìwòyí to pọju ni a lè mú jáde nípa ohun tí wọ́n fi sínú rẹ̀. Kò sí owó-ìṣúnnáwó tí kò hàn gbangba kankan tó le sá lọ sinu ẹ̀ka ìṣànwérò .

<br/>

## Bí a ṣe ń ṣàyẹ̀wò ìdìpọ̀ iye owó náà

The tally at the door is only trustworthy because every transaction is forced to prove it moved a truthful amount, even though the amount itself stays hidden. Each shielded transaction publishes one honest number: the net value it moves into or out of the pool, called its value balance. A positive value balance means funds left the pool to the transparent side, a negative one means funds entered. The private details stay sealed, but this single net figure is public, and it is what the turnstile adds up.

The clever part is how a transaction proves that public number is honest without revealing the private amounts behind it. The mechanism differs by pool, and this is the real machinery of the turnstile.

In the original Sprout pool, each transaction uses a JoinSplit. A JoinSplit spends two hidden notes and creates two new ones, and it carries two public fields: vpub_old, the value entering the shielded pool from the transparent side, and vpub_new, the value leaving the pool back to the transparent side. Every JoinSplit must balance on its own, and its zero knowledge proof guarantees the hidden inputs and hidden outputs add up correctly. Sprout's pool balance is simply the running total of all vpub_old minus all vpub_new across the chain. This is why Sprout is a useful example later: because vpub_old is the only way value can enter the pool, a single rule turning it off can seal the pool for good.

In Sapling, Orchard, and Ironwood, balance is proven a smarter way, using a binding signature. Instead of each transfer balancing alone, the whole transaction commits to each hidden amount using a value commitment. A value commitment is a sealed envelope for a number, built with a homomorphic Pedersen commitment, which has a special property: the envelopes can be added and subtracted without opening them. The network adds up all the input commitments, subtracts all the output commitments, and compares the result against the transaction's single declared net figure, its valueBalance field. Only a transaction whose hidden amounts genuinely match that public valueBalance can produce a valid binding signature over the combined commitments. If someone tried to move more value than they declared, the commitments would not add up, the binding signature would not verify, and the transaction would be rejected. Ironwood uses the same Orchard protocol, so it works the same way.

This is also what makes a cross-pool transfer safe to check. When funds move from one shielded pool to another, for example from Orchard into Ironwood, the transaction cannot hide the amounts from the accounting. Each pool has its own value balance that must be satisfied by its own proofs: the Orchard side must show a matching outflow through its binding signature, and the Ironwood side must show the corresponding inflow through its own. The value leaving one pool and the value entering the other are each proven independently, so a cross-pool move is really two turnstile crossings happening in one transaction, one out, one in, and both are tallied in public even though the underlying amounts stay private.

Nitorina, igbẹkẹle kii ṣe idaniloju. gbogbo iṣowo mathematiki fihan ipa ti o ni agbara rẹ, nẹtiwọki naa ṣafikun awọn abajade to daju fun apapọ kan, ati ofin ifọkanbalẹ (ZIP 209) kọ eyikeyi bulọọgi ti yoo mu idogba ifowopamọ adanu pọ si. ẹri lori ipele iṣiro, ipaniyan ni ipele pq.

<br/>

## Ìdí tó fi ṣe pàtàkì

Ìyípadà náà fún Zcash ní nǹkan mẹ́ta lẹ́ẹ̀kan.

Àkọ́kọ́, ó máa ń pín ewu sí ìsọ̀rí. Ìṣòro dídáǹgbà nínú àgbá kan ni a fi sínú àgbá náà nítorí pé ilé-ìyípadà yìí kì í jẹ́ kí iye tí kò tọ̀nà wọ inú àwọn ohun àmúṣe tó pọ̀ jùlọ lọ.

Èkejì, ó máa ń jẹ́ kí àwùjọ lè ṣàyẹ̀wò ìsọfúnni náà nígbà tó bá yá. Bí wọ́n bá wá rí àṣìṣe kan lẹ́yìn ìgbà yẹn, àkọsílẹ̀ inú ilé ìṣeré yìí á fi hàn bóyá iye owó tí kò wọlé nínú rẹ̀ ti pọ̀ ju èyí tó jáde látinú èbúté lọ. Àkọsílè̀ tó mọ́ ni ẹrí lílágbára pé wọn ò ṣe iṣẹ́ àṣejù kankan.

Third, it preserves privacy while doing all of this. Only pool-level totals are public. Your individual transactions remain shielded. Auditability and privacy coexist, which is unusual and is one of Zcash's quiet strengths.

<br/>

## Bí àgbá tó ń yí nǹkan padà ṣe ṣiṣẹ́ rèé

Àkọlé àwòrán, Owó tí wọ́n ń ná lórí Zcash kò ṣẹ̀ṣẹ̀ dé báyìí o. Wọ́n ti lò ó láwọn àkókò pàtàkì nínú ìtàn owó ẹyọ náà.

When Zcash moved from the original Sprout pool toward the newer Sapling pool, the turnstile guarded the transition. The Sprout pool was later restricted so it could not receive new inflows, which encouraged users to migrate while the turnstile kept the accounting honest. Years later, the fact that no value ever improperly left Sprout stands as evidence that its early cryptography was never successfully exploited.

Àwòrán kan náà ni ó ń ṣọ́ ìgbésẹ̀ láti Orchard sí Ironwood. Ní ọdún 2026 a rí àbùkù ìmúdájú tí wọ́n sì tún ṣe nínú ètò ìdánilójú ti Orchard. Kò si ẹri pé wọn lo o, ṣùgbọ́n nítorí iṣẹ́ àṣírí jẹ́ ohun tó dá nìkan mọ́ni, kò ṣeéṣe fún ẹni to bá ní ìdánilẹ́nuwò kankan. Ìdáhùn rẹ̀ ni kí á dí adágún Old Orchard àti kí gbogbo ènìyàn kó owó wọn lọ sínú Adágún Ironwood nípa lílo ìlànà tuntun. Fífi ipá mú àwọn owó kọjá inú idà wípé èèpo-ìmọ̀ ayédèrú owó èyíkéyìí tí ó kù sílẹ̀ kò lè tẹ̀lé e, nígbàtí ìṣípadà parí ẹnikẹni le fi hàn dájú pe ipese aláàbò náà dára.

<br/>

## Ìṣòro tí ó jẹ́ pé kò sí àfikún ìmúlò.

Ọ̀nà tí wọ́n gbà ṣe àyíká yìí ni pé, kí àwọn tó ń lo ilé ìtura náà lè máa lọ síbi táwọn èèyàn ti ń ṣeré ìdárayá.

Sprout is the clearest example. To deprecate it, ZIP 211 added a single consensus rule: from its activation height, the vpub_old field of every JoinSplit must be zero. Since vpub_old is the only way value can enter Sprout, forcing it to zero means no new value can ever go in again, while value can still flow out to the transparent side or onward to Sapling. The pool became one-way. It can only drain, never fill. The turnstile keeps counting the whole time, so the balance can fall as funds leave but can never rise, and it can never go negative.

The Orchard to Ironwood migration uses the same idea. At the NU6.3 upgrade, the Orchard pool is closed to new inflows, and wallets are directed to send Orchard funds across the turnstile into the new Ironwood pool. Orchard becomes a one-way pool that can only empty. Because every exit is a turnstile crossing that must be proven, any hypothetical counterfeit value left behind in Orchard cannot quietly follow the honest funds out. It is stuck in a pool that only drains and is watched at the door. Over time this drives the old pool toward empty and lets anyone confirm that the value which came out was never more than the value that honestly went in.

Eyi ni idi ti o jinlẹ julọ fun awọn ọrọ turntile ju iṣiro lọ. O jẹ ilana ti o gba Zcash laaye lati ṣe akiyesi adagun-odo kan, boya lati dinku ifarakanra bi pẹlu Sprout, tabi lati bọsipọ kuro ninu kokoro ti a rii bii Orchard, lakoko fifipamọ alailowaya, gbangba, iṣeduro idaniloju nipa ipese naa.

<br/>

## Àwọn èrò òdì tó wọ́pọ̀ nípa àwọn èèyàn

- Àkọsílẹ̀ tó wà lórí ìkànnì náà kì í sọ gbogbo ohun tí o bá ṣe, ó kàn ń fi iye owó tẹ́ ẹ jọ lò hàn ni.
- kì í ṣe orúkọ ẹni tó ń díbàjẹ́ owó ló máa mú, ó ní iye tí kò lè jáde nínú àgbá kan. èyí ni yóò dáàbò bo àwọn èèyàn láti má báa tún wọn lò mọ́.
- It is not a new invention for Ironwood. It has guarded every major shielded pool transition in Zcash history
- Àpapọ̀ ìsopọ́ tí ó wà fún gbogbo ènìyàn kò mú kí àṣírí ẹni di aláìlágbára. Ìṣòro náà ni àwọn ìṣòwò inú àgbájọ, èyí tó máa ń fara sin

<br/>

## Àwọn Owó-ìṣúnná owó

1. [ZIP 209: Èèwọ̀ fún àwọn ìsókò tí ó wà ní òde-ìwòye àgbájọ iye owó tó ń lọ láìsí ibi ti wọ́n lè rí i gbà](https://zips.z.cash/zip-0209) - ìlànà ìfohùnṣọ̀kan tó wà lẹ́yìn ilé àyíká náà.
2. [ZIP 211: Ṣiṣiṣẹda fifi iye tuntun kun si Ẹrọ Iye Ọja Ipilẹ](https://zips.z.cash/zip-0211) - bí wọ́n ṣe ti àgbá omi Sprout pa fún àwọn ìsọ̀ǹbá tuntun.
3. [ZIP 258: NU6.3] Àwọn ojúewé wọ̀nyí jápọ̀ mọ́:](https://zips.z.cash/zip-0258) - ìyípadà tí ó mú omi-ìmọ̀ Ironwood wọlé, tó sì darí iye owó náà síbi àgbá yípo.
4. [Ìmúṣẹ Ìpínlẹ̀-ìmọ́lé lòdì sí Àdàkọ](https://electriccoin.co/blog/turnstile-enforcement-against-counterfeiting/) - the original explanation from Electric Coin Company
5. [Àlàyé fún Àlàkalẹ̀ Zcash](https://zips.z.cash/protocol/protocol.pdf) - wo àwọn ìpínrọ̀ tó dá lórí ìfiwéra àti òǹtẹ̀ tí ó nípìn-ín fún àlàyé kíkún.
6. [Àwọn Ìkùdu Iyebíye, Ìwé Zebra](https://zebra.zfnd.org/dev/rfcs/0012-value-pools.html) - bí àpò kan ṣe ń tọpinpin ìdìbò iye tí ó wà nínú àwọn ẹgbẹ́ kòkòrò ọ̀gbìn kọ̀ọ̀kan.

<br/>

## Àwọn ojúewé tó ní í ṣe pẹ̀lú rẹ̀

- [Àwọn Erékùṣù Tí Wọ́n Fi Ààbò Pa Mọ́](https://zechub.wiki/using-zcash/shielded-pools) - bí àwọn ìnáwó tí a fi ààbò Zcash ṣe ń pa àṣírí mọ́.
- [Halo](https://zechub.wiki/zcash-tech/halo) - ètò ìdánilójú tó wà lẹ́yìn adágún Orchard.
- [Ìyípadà sí Àtòjọ Ìsọfúnni](https://zechub.wiki/start-here/network-upgrades) - bí Zcash ṣe ń mú àwọn àyípadà ṣiṣẹ́ bíi ìsọ̀rí tí a fi ọ̀pá ìdáàbòbò tuntun sí.
