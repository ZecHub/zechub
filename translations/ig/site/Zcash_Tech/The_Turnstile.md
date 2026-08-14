# Ihe na-eme ka ọ dị mma.

## TL;DR

- The turnstile bụ a ọha aza ajụjụ iwu na tracks otú ihe bara uru abatakwa ma doo ọ bụla echebe ọdọ mmiri
- Ọ na-eme ka onye ọ bụla hụ na ego a ga-akwụ agaghị akarị ihe e tinyere n'ime ya, ọbụna ma a sị na azụmahịa ndị dị n'etiti ha bụ nke onwe.
- Nke a na-echebe ZEC ọkọnọ site zoro ezo ahụhụ, n'ihi adịgboroja mkpụrụ ego nwere ike ghara ịhapụ ọdọ mmiri enweghị agbaji ọnụ ọgụgụ
- Ọ na-arụ ọrụ n'enweghị ike imebi nzuzo, ebe ọ bụ naanị ngụkọta nchịkọta ọha mmadụ, ọ dịghị mgbe azụmahịa ndị ọzọ.
- The turnstile is the reason the Orchard to Ironwood migration can prove the shielded supply is sound

<br/>

## Onye ka nke a bụ maka ya?

- Onye ọ bụla chọrọ ịghọta etu Zcash si eme ka ndị mmadụ tụkwasị ya obi.
- Ndị ọrụ na-eso Orchard ka Ironwood Mbugharị ma na-eche otú ọ na-egosi ọkọnọ bụ ezigbo
- Newcomers ọchịchọ ịmata otú a onwe ego usoro ka nwere ike audited

<br/>

## Ihe Ịma Aka Ahụ

Shielded Zcash hides amounts, senders, and receivers. That privacy is the point. But it raises a hard question: if nobody can see inside the shielded pool, how does anyone know the total amount of ZEC is correct? How do you audit money you cannot see?

If a bug ever let someone forge coins inside a shielded pool, the forgery would be hidden by the same privacy that protects honest users. Without a safeguard, that uncertainty would undermine confidence in the whole supply. The turnstile is the safeguard that solves this.

<br/>

## Ihe a na-akpọ turnicle bụ.

Think of each shielded pool as a room with a single counted doorway. Every time value enters the pool from outside, or leaves it to go elsewhere, it passes through the doorway and is tallied in public. The transactions inside the room stay private, but the running total at the door is visible to everyone.

The rule is simple: a pool can never let more value out than has gone in. Nodes reject any block that would push a pool's balance below zero. The amount believed to be inside a pool is known at all times, because it is just the total that entered minus the total that left. This public tally is the turnstile.

<br/>

## Otú o si arụ ọrụ .

Zcash has several shielded pools over its history, such as Sprout, Sapling, and Orchard. Value moves between the transparent chain and these pools, and sometimes between the pools themselves. The turnstile watches those movements:

1. Mgbe ZEC na-aga n'ime ọdọ mmiri kpuchiri, a ga-agbakwunye ego ahụ na nguzobe ọha nke ụlọ ọrụ ahụ.
2. Mgbe ZEC na-apụ n'otu ọdọ mmiri, a ga-ewepụ ego ahụ.
3. Netwọk ahụ na-ajụ mgbochi ọ bụla nke ga - eme ka nguzozi ọdọ mmiri dị njọ, pụtara karịa hapụrụ karịa mgbe abanyechara.
4. Mmekọrịta ọ bụla a na-echebe ga-anọgide bụrụ nke onwe, naanị ngụkọta ego niile bụ ọha.

The network tracks a balance for every value pool this way, including Sprout, Sapling, Orchard, the new Ironwood pool, and the transparent and lockbox balances. Because of this, even if the exact contents of a pool are hidden, the maximum that can ever come out is capped by what went in. No hidden inflation can escape into circulation.

<br/>

## Olee otú e si enyocha nguzozi uru?

The tally at the door is only trustworthy because every transaction is forced to prove it moved a truthful amount, even though the amount itself stays hidden. Each shielded transaction publishes one honest number: the net value it moves into or out of the pool, called its value balance. A positive value balance means funds left the pool to the transparent side, a negative one means funds entered. The private details stay sealed, but this single net figure is public, and it is what the turnstile adds up.

Akụkụ dị nkọ bụ otu azụmahịa si egosi na ọnụ ọgụgụ ọha mmadụ ziri ezi n'ekpugheghị ego nzuzo ndị nọ ya. Usoro ahụ dị iche site na ọdọ mmiri, nke a bụkwa ezigbo igwe ọrụ nke turnstile.

In the original Sprout pool, each transaction uses a JoinSplit. A JoinSplit spends two hidden notes and creates two new ones, and it carries two public fields: vpub_old, the value entering the shielded pool from the transparent side, and vpub_new, the value leaving the pool back to the transparent side. Every JoinSplit must balance on its own, and its zero knowledge proof guarantees the hidden inputs and hidden outputs add up correctly. Sprout's pool balance is simply the running total of all vpub_old minus all vpub_new across the chain. This is why Sprout is a useful example later: because vpub_old is the only way value can enter the pool, a single rule turning it off can seal the pool for good.

In Sapling, Orchard, and Ironwood, balance is proven a smarter way, using a binding signature. Instead of each transfer balancing alone, the whole transaction commits to each hidden amount using a value commitment. A value commitment is a sealed envelope for a number, built with a homomorphic Pedersen commitment, which has a special property: the envelopes can be added and subtracted without opening them. The network adds up all the input commitments, subtracts all the output commitments, and compares the result against the transaction's single declared net figure, its valueBalance field. Only a transaction whose hidden amounts genuinely match that public valueBalance can produce a valid binding signature over the combined commitments. If someone tried to move more value than they declared, the commitments would not add up, the binding signature would not verify, and the transaction would be rejected. Ironwood uses the same Orchard protocol, so it works the same way.

This is also what makes a cross-pool transfer safe to check. When funds move from one shielded pool to another, for example from Orchard into Ironwood, the transaction cannot hide the amounts from the accounting. Each pool has its own value balance that must be satisfied by its own proofs: the Orchard side must show a matching outflow through its binding signature, and the Ironwood side must show the corresponding inflow through its own. The value leaving one pool and the value entering the other are each proven independently, so a cross-pool move is really two turnstile crossings happening in one transaction, one out, one in, and both are tallied in public even though the underlying amounts stay private.

So the turnstile is not trust. Every transaction mathematically proves its own net effect, the network sums those proven net effects per pool, and a consensus rule (ZIP 209) rejects any block that would drive a pool's balance negative. Proof at the transaction level, enforcement at the chain level.

<br/>

## Ihe mere o ji dị mkpa

Turnicle na-enye Zcash ihe atọ n'otu oge.

Nke mbụ, ọ na-ekewa ihe ize ndụ. A cryptographic ahụhụ n'otu ọdọ mmiri a gụnyere ka ọdọ mmiri ahụ, n'ihi na turnstile akwụsị adịgboroja uru si agafe n'ime wider ọkọnọ.

Nke abụọ, ọ na-eme ka ndị obodo ahụ nyochaa ihe ha nwetara ma e mechaa. Ọ bụrụkwa na a chọpụta ebe mmadụ mere mmehie n'oge gara aga, akwụkwọ ndekọ nke dị ná mpempe ígwè ahụ ga-egosi ma ò nweela uru si n'ebe onye ahụ nọ pụọ karịa ego o tinyere ya. Akwụkwọ ndekọ doro anya bụ ezigbo ihe àmà gosiri na e meghị ahịa aghụghọ iji nweta ego ọzọ.

Nke atọ, ọ na-echekwa nzuzo mgbe ị na-eme ihe a niile. Naanị ngụkọta ọkwa ọdọ mmiri bụ ọha mmadụ. Azịza gị n'otu n'ime azụmahịa ahụ ka echekwara ya. Nnyocha nyocha na nzuzo dị ọnụ, nke a abụghịkarị ma bụrụ otu n'etiti ike Zcash zoro ezo. Ọ nwere ọtụtụ atụmatụ ndị ọzọ maka ego mkpuchi:

<br/>

## Ebe a na-agbagharị agbagharị nke dị n'ime ya.

Turnicle abụghị ihe ọhụrụ, e jikwa ya mee ihe n'oge dị mkpa na akụkọ Zcash.

When Zcash moved from the original Sprout pool toward the newer Sapling pool, the turnstile guarded the transition. The Sprout pool was later restricted so it could not receive new inflows, which encouraged users to migrate while the turnstile kept the accounting honest. Years later, the fact that no value ever improperly left Sprout stands as evidence that its early cryptography was never successfully exploited.

The same design now guards the move from Orchard to Ironwood. In 2026 a soundness bug was found and patched in the Orchard proving system. There is no evidence it was ever exploited, but because shielded activity is private, certainty was impossible. The response is to seal the old Orchard pool and have everyone migrate their funds through the turnstile into Ironwood, a fresh pool using the corrected protocol. Forcing funds through the turnstile means any hypothetical counterfeit coins left behind cannot follow, and once migration completes, anyone can confirm the shielded supply is sound.

<br/>

## Otu ụzọ ọdọ mmiri deprecation

Ọ bụrụ na e jiri ihe ndị a rụọ ụlọ ahụ, ọ ga-eme ka o kwe omume ịla ebe ochie n'enweghị nsogbu ma ghara imebi ikike ya. Ihe dị mkpa bụ ijichi ụzọ mmiri si abanye n'ime ya mgbe i mepere ụzọ isi pụọ.

Sprout is the clearest example. To deprecate it, ZIP 211 added a single consensus rule: from its activation height, the vpub_old field of every JoinSplit must be zero. Since vpub_old is the only way value can enter Sprout, forcing it to zero means no new value can ever go in again, while value can still flow out to the transparent side or onward to Sapling. The pool became one-way. It can only drain, never fill. The turnstile keeps counting the whole time, so the balance can fall as funds leave but can never rise, and it can never go negative.

The Orchard to Ironwood migration uses the same idea. At the NU6.3 upgrade, the Orchard pool is closed to new inflows, and wallets are directed to send Orchard funds across the turnstile into the new Ironwood pool. Orchard becomes a one-way pool that can only empty. Because every exit is a turnstile crossing that must be proven, any hypothetical counterfeit value left behind in Orchard cannot quietly follow the honest funds out. It is stuck in a pool that only drains and is watched at the door. Over time this drives the old pool toward empty and lets anyone confirm that the value which came out was never more than the value that honestly went in.

This is the deeper reason the turnstile matters beyond simple accounting. It is the mechanism that lets Zcash deprecate a shielded pool, whether to reduce complexity as with Sprout, or to recover from a discovered bug as with Orchard, while keeping a continuous, public, provable guarantee about the supply.

<br/>

## Ihe ndị mmadụ na-ekwukarị nke bụ́ eziokwu.

- Ọ na-egosi naanị ego ole i nwetara, ọ naghị egosi onye ziteere mmadụ ihe.
- Ọ naghị ejide onye na-eme ka ndị mmadụ ghara ịdị ọcha site n'aha. O nwere oke ego ole a ga-ahapụ, nke bụ ihe na-echebe ọkọnọ ahụ
- Ọ bụghị ihe ọhụrụ maka Ironwood. O chebere ọ bụla isi echekwara ọdọ mmiri mgbanwe na Zcash akụkọ ntolite
- Ọnụ ọgụgụ ọha na eze adịghị emebi nzuzo. Nzuzo dị n'ime azụmahịa ndị dị n 'ọdọ mmiri ahụ, nke a na-ezo ezo

<br/>

## Akụnụba

1. [ZIP 209: machibido Out-of-nso Chain Uru Pool Balances](https://zips.z.cash/zip-0209) - iwu nkwekọrịta n'azụ turnstile ahụ.
2. [ZIP 211: Gbanyụọ Mgbakwunye nke Uru Ọhụrụ na Sprout Chain Value Pool](https://zips.z.cash/zip-0211) - etu esi mechie ọdọ mmiri Sprout maka nkwụnye ego ọhụrụ.
3. [ZIP 258: NU6.3](https://zips.z.cash/zip-0258) - nkwalite nke na-ewebata ọdọ mmiri Ironwood ma na-eduzi uru gafee turnstile ahụ.
4. [Njide nke Nkwado megide counterfeiting](https://electriccoin.co/blog/turnstile-enforcement-against-counterfeiting/) - nkọwa mbụ sitere na Electric Coin Company .
5. [Zcash Protocol Nkọwapụta](https://zips.z.cash/protocol/protocol.pdf) - lee ngalaba na nguzozi na mbinye aka maka nkọwa zuru ezu.
6. [Otu Akụ̀ Dị Oké Ọnụ Ahịa, Akwụkwọ Zebra](https://zebra.zfnd.org/dev/rfcs/0012-value-pools.html) - otú a ọnụ nsuso ọ bụla ọdọ mmiri si uru itule

<br/>

## Peeji ndị metụtara ya

- [Nchekwa ọdọ mmiri ndị e chebere echebe](https://zechub.wiki/using-zcash/shielded-pools) - etu azụmahịa Zcash si echekwa ihe niile gbasara ya n'onwe ha.
- [Halo](https://zechub.wiki/zcash-tech/halo) - usoro ihe akaebe n'azụ ọdọ mmiri Orchard .
- [Nwelite Ntanetị](https://zechub.wiki/start-here/network-upgrades) - otu Zcash si eme mgbanwe dịka ọdọ mmiri ọhụrụ echedoro.
