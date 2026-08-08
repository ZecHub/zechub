# Gadzraɖoƒea ƒe akpa si le ʋuʋu me.

## TL;DR

- Gadzraɖowɔƒe si kpɔa ga agbɔsɔsɔme siwo yia gaku ɖe sia ɖe me kple esiwo dona le eme la ƒe akɔntabubu ŋuti ɖoɖo aɖe ye dzraa mɔ̃a ɖo.
- Ena amesiame kpɔa egbɔ be ga si wotsɔ ɖo gadzraɖoƒe la meƒo nusi wu esi wode eme ta gbeɖe o, togbɔ be nu siwo wowɔ le afima nye ame ŋutɔ tɔ hã.
- Esia kpɔa ZEC ƒe nunɔamesiwo ta tso nugbegblẽ aɖe si le ɣaɣla me, elabena ga siwo nye alakpa mate ŋu ado le ƒuƒoƒo ɖeka me o ne womegaƒo nu na wo nɔewo o.
- Ewɔa dɔ le esi womegblẽa ame ƒe gomenɔamesi dome o ta, elabena ƒokpliwo koe nye amesiwo ŋu amewo kpɔa nu tsoe eye menye ɖekaɖeka nuwɔna aɖeke kurae o.
- Gadzraɖoƒea nye nusi na be Orchard-yi Ironwood ʋuʋu ate ŋu aɖo kpe edzi be nuɖuɖudzesi si le dedie la li nyuie.

<br/>

## Amekae nye esia na?

- Amesiame si di be yease alesi Zcash léa eƒe adzɔnu siwo le ame ŋutɔ gbɔ la ɖe te ŋu wɔa dɔe gɔme la, ate ŋu aka ɖe edzi.
- Ame siwo le Orchard to Ironwood ʋuʋu la yome nɔbiabiam be aleke esia ɖo kpe edzii be nu si wotsɔna naa amewo nye nyateƒe mahã?
- Ame yeyewo di be yewoanya alesi woate ŋu adzro ga si ame ŋutɔ zãna me kokokoe la ŋuti

<br/>

## Kuxiae nye be,

Zcash si ŋu wotre ɖo la ɣlaa ga homewo, ame siwo ɖoe ɖa kple amesiwo xɔe. Esia ƒe nya ɣaɣlae nye nyaa. Gake enana wobiaa biabia sesẽ aɖe: ne ame aɖeke mate ŋu akpɔ nu le zakatsaɖoƒe si dzi wodzra ɖo me o la, aleke amesiame awɔ anya be ZEC agbɔsɔsɔme bliboa sɔ? Aleke nàwɔ adzro ga si màte ŋu akpɔ o mee?

Ne nugbagbevi aɖe na ame aɖe te ga le tsiƒuƒe si ŋu wotre ɖo me la, ekema nu siwo kpɔa amesiwo wɔa nuteƒe ta hã ate ŋu aɣla ametawo. Esi wònye be womekpɔa egbɔ o tae kakaɖedzi mele wo si o ta la, esia ana amewo nagaka ɖe woƒe nunɔamesiwo dzi kura o. Mɔ̃ siae nye mɔ̃ si gbɔ kuxia tso.

<br/>

## Nu kae nye tourniquet la?

Think of each shielded pool as a room with a single counted doorway. Every time value enters the pool from outside, or leaves it to go elsewhere, it passes through the doorway and is tallied in public. The transactions inside the room stay private, but the running total at the door is visible to everyone.

Se la le bɔbɔe: womate ŋu ana ga si wodzɔ ɖe eme wu esi wotsɔ va ƒle o. Nudɔwo gbea nu sia nu si ate ŋu awɔe be woƒe home dzi naɖiɖi ayi zero me. Woɖoa kpe edzi ɣesiaɣi be agbɔsɔsɔme siwo katã le ƒuƒoƒo aɖe me nye esiwo wodze, eye wogblẽ wo domee. Amehabɔ ƒe akɔntabubu sia ye nye mɔ̃ɖonu (turntile).

<br/>

## Ale si wòwɔnae

Zcash has several shielded pools over its history, such as Sprout, Sapling, and Orchard. Value moves between the transparent chain and these pools, and sometimes between the pools themselves. The turnstile watches those movements:

1. Ne ZEC ʋu yi teƒe si woxɔa ga le la, wotsɔa gaa dea akpa ma ƒe dukɔa me tɔwo tɔ gome.
2. Ne ZEC dzo le ƒuƒoƒo aɖe me la, woɖea ga si wòxɔna ɖe eme.
3. Ƒuƒoƒo ɖesiaɖe si ana be ƒukpo ƒe ga nanɔ vɔ̃m la, ƒuƒoƒoa gbea wo. Esia fia be ame geɖe dzo wu alesi wodze anyii tsã
4. Dɔ siwo wowɔna le adzame la nɔa ame sia ame ƒe nya me, ga si woƒo ƒu koe amewo katã kpɔna.

Edzena le internet dzi be woadze akɔta na ga siwo katã wodzra ɖo ɖe woƒe dɔwɔƒewo, abe Sprout kple Sapling kpakple Orchard ene. Esia wɔe be ne nu si tututu le agbalẽa me la mele amewo gbɔ o hã la, ame sia ame ƒe asi koe ate ŋu akae eye womate ŋu ada dɔ aɖeke ɖi atsɔ adzrae o.

<br/>

## Alesi wowɔa akɔnta le asixɔxɔ ƒe dzikpɔkpɔ ŋu

The tally at the door is only trustworthy because every transaction is forced to prove it moved a truthful amount, even though the amount itself stays hidden. Each shielded transaction publishes one honest number: the net value it moves into or out of the pool, called its value balance. A positive value balance means funds left the pool to the transparent side, a negative one means funds entered. The private details stay sealed, but this single net figure is public, and it is what the turnstile adds up.

Nu si me nunya le enye alesi nuwɔnaa ɖoa kpe edzi be ame geɖe ƒe xexlẽdzesi nye nyateƒetɔ evɔ womegblɔa ga home siwo amewo zãna o. Mɔ̃ɖoɖo sia toa vovo na ha ɖeka, eye esiae nye mɔ̃ ŋutɔŋutɔ si dzi wotona wɔa dɔ to tɔtrɔwɔwɔ ŋu.

In the original Sprout pool, each transaction uses a JoinSplit. A JoinSplit spends two hidden notes and creates two new ones, and it carries two public fields: vpub_old, the value entering the shielded pool from the transparent side, and vpub_new, the value leaving the pool back to the transparent side. Every JoinSplit must balance on its own, and its zero knowledge proof guarantees the hidden inputs and hidden outputs add up correctly. Sprout's pool balance is simply the running total of all vpub_old minus all vpub_new across the chain. This is why Sprout is a useful example later: because vpub_old is the only way value can enter the pool, a single rule turning it off can seal the pool for good.

In Sapling, Orchard, and Ironwood, balance is proven a smarter way, using a binding signature. Instead of each transfer balancing alone, the whole transaction commits to each hidden amount using a value commitment. A value commitment is a sealed envelope for a number, built with a homomorphic Pedersen commitment, which has a special property: the envelopes can be added and subtracted without opening them. The network adds up all the input commitments, subtracts all the output commitments, and compares the result against the transaction's single declared net figure, its valueBalance field. Only a transaction whose hidden amounts genuinely match that public valueBalance can produce a valid binding signature over the combined commitments. If someone tried to move more value than they declared, the commitments would not add up, the binding signature would not verify, and the transaction would be rejected. Ironwood uses the same Orchard protocol, so it works the same way.

This is also what makes a cross-pool transfer safe to check. When funds move from one shielded pool to another, for example from Orchard into Ironwood, the transaction cannot hide the amounts from the accounting. Each pool has its own value balance that must be satisfied by its own proofs: the Orchard side must show a matching outflow through its binding signature, and the Ironwood side must show the corresponding inflow through its own. The value leaving one pool and the value entering the other are each proven independently, so a cross-pool move is really two turnstile crossings happening in one transaction, one out, one in, and both are tallied in public even though the underlying amounts stay private.

Eyata mɔ̃a menye kaka ɖe ame dzi o. Nuƒle ɖesiaɖe ɖo kpe eƒe nusianu si wowɔna la dzi le akɔntabubu me, kadodoawo ƒoa nu tso nusiwo wokpɔ be wole dzɔdzɔm na amesiame ŋu eye ɖekawɔwɔ ƒe se (ZIP 209) tsɔa blok sia blɔk si ana woƒe ga home nanɔ gbegblẽm ɖi tsia tre ɖi. Kpeɖodziwo li le asitsatsa ƒe dzidzeƒe kple wo tsɔtsɔ wɔ dɔe le nudzraɖoƒe gome.

<br/>

## Nu si tae wòle vevie ɖo

Zcash ƒe ga si le eƒe mɔ̃a dzi la nye nu etɔ̃.

Gbã la, eɖea afɔkuwo ɖe vovo. Woxea mɔ na nugbegblẽ siwo le nyatakaka aɖe me be woagava dze edzi o elabena enana wometea ŋu trɔa asi le nu si wotsɔ ɖo kpe dzii la ŋu wòdea ame bubuwo tɔ gbɔ o.

Ne ame aɖe ƒe asitelefon dzi xɔdɔmewo le ʋuʋu ge ɖe ʋua me la, esia nana be amewo kpɔa alesi nuwo nɔna ne wofɔ mɔ̃a. Eveliae nye be enana nutoa me tɔwo te ŋu lé ŋku ɖe nusiwo wotsɔ ɖo teƒeawo ŋu emegbe hekpɔtɔ nɔa eŋu kpɔna.

etɔ̃lia, enana ame ƒe nuŋɔŋlɔwo meɖea vi o. ne èle esia katã wɔm la, ga si nèzãna le dɔdzikpɔƒea koe wòtea ŋu dea go na amewo. woɣlaa asi ɖe ŋuwò ɣesiaɣi. numekuku kple nya ɣaɣla nɔa anyi ɖekae, eye menye zi geɖee wowɔa nenema o; enye Zcash ƒe ŋusẽ siwo dzi womate ŋu aka ɖo bɔbɔe o dometɔ ɖeka.

<br/>

## Tɔdziʋua ƒe ʋɔtru si le dɔ wɔm la

Menye nu yeyee tourniquet nye o, eye wozãnɛ le ɣeyiɣi vevi aɖewo me le Zcash ƒe ŋutinyaa me.

When Zcash moved from the original Sprout pool toward the newer Sapling pool, the turnstile guarded the transition. The Sprout pool was later restricted so it could not receive new inflows, which encouraged users to migrate while the turnstile kept the accounting honest. Years later, the fact that no value ever improperly left Sprout stands as evidence that its early cryptography was never successfully exploited.

The same design now guards the move from Orchard to Ironwood. In 2026 a soundness bug was found and patched in the Orchard proving system. There is no evidence it was ever exploited, but because shielded activity is private, certainty was impossible. The response is to seal the old Orchard pool and have everyone migrate their funds through the turnstile into Ironwood, a fresh pool using the corrected protocol. Forcing funds through the turnstile means any hypothetical counterfeit coins left behind cannot follow, and once migration completes, anyone can confirm the shielded supply is sound.

<br/>

## Ame ɖeka ƒe mɔɖeɖe ɖe ame bubuwo ŋu dzi ɖeɖe ɖa le dɔ me

Mɔ̃ si wotsɔna trɔa asi le teƒea ŋu la na be woate ŋu aɖe tsileƒe xoxowo ɖa dedie, eye woazɔ mɔ ɖeka ko evɔ womagblẽ woƒe nunyiame o. Nu vevitɔe nye be nàtu ʋɔtru ɖe enu ne èʋu nu do tso eme.

Sprout is the clearest example. To deprecate it, ZIP 211 added a single consensus rule: from its activation height, the vpub_old field of every JoinSplit must be zero. Since vpub_old is the only way value can enter Sprout, forcing it to zero means no new value can ever go in again, while value can still flow out to the transparent side or onward to Sapling. The pool became one-way. It can only drain, never fill. The turnstile keeps counting the whole time, so the balance can fall as funds leave but can never rise, and it can never go negative.

The Orchard to Ironwood migration uses the same idea. At the NU6.3 upgrade, the Orchard pool is closed to new inflows, and wallets are directed to send Orchard funds across the turnstile into the new Ironwood pool. Orchard becomes a one-way pool that can only empty. Because every exit is a turnstile crossing that must be proven, any hypothetical counterfeit value left behind in Orchard cannot quietly follow the honest funds out. It is stuck in a pool that only drains and is watched at the door. Over time this drives the old pool toward empty and lets anyone confirm that the value which came out was never more than the value that honestly went in.

Esiae nye susu si ta tourniquet la le vevie wu akɔntabubu ko. Enye mɔnu aɖe si naa Zcash tsɔa nu siwo me wodzena dzi ɖuna, eɖanye be woatsɔ akpɔ kuxiwo gbɔ abe ale si wòle le Sprout gome ene alo atsɔ aɖɔ ŋu ɖo tso vodada aɖewo siwo wokpɔ abe alesi wònɔ le Orchard gome ene o, evɔ woana mɔɖeɖe na amewo ɣesiaɣi be woakpɔ egbɔ hã.

<br/>

## Susu totro siwo amewo da ɖe edzi zi geɖe la

- Ʋu si le ʋuʋu me la mena wokpɔa nu siwo nèwɔ o, ɖeko wòɖea ga homewo fiana ko. Mefia ame si ɖo nusi ɖe amea gbɔ alo amesi ŋlɔe na ye o
- Menye ŋkɔ si le esi tae woléa ame siwo daa alakpa ɖo o, ke boŋ ɖe wo dzi be womagate ŋu ada ga agbɔsɔsɔme aɖe ko ɖi atsɔ akpɔ mɔ na asitelefonwo ƒe asiɖeɖe le Internet la ŋuti.
- Menye nu yeyee wònye na Ironwood o. Edzra xɔ gã siwo katã le Zcash ƒe ŋutinya me ɖo la dzi kpɔna nyuie
- Ame sia ame ƒe nya ɣaɣlawo meɖea vi aɖeke na amewo o. Nya ɣaɣla siawo nɔa nu siwo wowɔna le teƒea la ŋu, eye womekpɔnɛ ɖe wo dzi o

<br/>

## Ŋutilãmenuwo

1. [ZIP 209: Se ɖe asi le nu siwo meɖo kpe edzi be nuwo mele ɖoɖo aɖe si dzi woato akpɔ ga ta o la ŋu](https://zips.z.cash/zip-0209) - ɖekawɔwɔ ƒe se si le glikpowo megbe la dzi wɔwɔ
2. [ZIP 211: Eʋevi si le mɔ dzi be womagawɔ viɖe yeyewo ɖe eƒe asi ŋu o](https://zips.z.cash/zip-0211) - ale si woɖe mɔ be ame aɖeke nagava kpɔ ga le Sprout-ta la me o.
3. [ZIP 258: NU6.3](https://zips.z.cash/zip-0258) - Egbegbe si me wotsɔ Ironwood-ta la ɖo anyi eye wòna asixɔxɔ va le ʋua ƒe akpa vovovowo dzi.
4. [Aʋawɔwɔ Ðe Asitsahawo Ŋu le Mɔ̃wo Dzi](https://electriccoin.co/blog/turnstile-enforcement-against-counterfeiting/) - Electric Coin Company ƒe numeɖeɖe gbãtɔa.
5. [Zcash Protocol Ŋuti Mɔfiamewo](https://zips.z.cash/protocol/protocol.pdf) - Kpɔ akpa siwo ku ɖe nudzidzenu kple asiɖeɖe le agbalẽ dzi ŋu la me nyawo katã.
6. [Nuvɔ̃, Zebra-gbalẽa](https://zebra.zfnd.org/dev/rfcs/0012-value-pools.html) - ale si nuƒolanɔƒe léa ŋku ɖe akpa ɖesiaɖe ƒe asixɔxɔ ŋu la ŋuti.

<br/>

## Axa siwo do ƒome kplii

- [Tsiƒedɔwo le Tsiɖɔɖuwo me](https://zechub.wiki/using-zcash/shielded-pools) - ale si Zcash ƒe nuxexlẽa me nyawo nɔa ɣaɣla le adzame la ŋu nyawo.
- [Halo](https://zechub.wiki/zcash-tech/halo) - tsidzɔƒe si le Orchard tsiƒuƒua megbe la dzi kpɔkpɔ ƒe mɔnu.
- [Azɔdzinuwo ƒe Kɔkɔtɔyiyi](https://zechub.wiki/start-here/network-upgrades) - ale si Zcash wɔa tɔtrɔwo abe tsimɔ yeye siwo ŋu wotrɔ asi le ene dzii
