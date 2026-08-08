# Nsrahwɛbea no.

## TL;DR

- Turnstile no yɛ aban akontaabu mmara a ɛhwɛ sika dodow a ɛkɔ ne nea efi ɔfasu biara mu ba so.
- Ɛma obiara hu sɛ, sika a wɔde hyɛ po ase no mmɔ ka pii sen nea wɔhyehyɛe mu da. Ɛwom mpo sɛ emu nneɛma yɛ kokoam de, nanso ɛnyɛ nnipa nyinaa na wɔyɛ saa adwuma yi bi
- Eyi bɔ ZEC no ho ban fi nsisi a ahintaw bi, efisԑ sika nkontompo ntumi mfi ɔbodan mu bere a wonnii kan nni ano
- Ɛtumi yɛ adwuma a ɛnsɛe kokoam nsɛm, ɛfiri sɛ wɔn nyinaa ka bom wɔ baguamu na ɛnyɛ ankorankoro nnwuma.
- Nsrahwɛ no ne ade a enti Orchard kɔ Ironwood akwantu no betumi akyerɛ sɛ nneɛma a wɔde bɔ ho ban no yɛ nea edi mu.

<br/>

## Hena na eyi yɛ ma no?

- Obiara a ɔpɛ sɛ ɔte sɛnea Zcash ma ne kokoam nneɛma di mu no ase.
- Users a w'adi Orchard akɔ Ironwood akwantu akyi no bisa sɛ ɔkwan bɛn so na ɛkyerɛ sɛ nneɛma yi wɔ hɔ ankasa?
- Nnipa a wɔaba foforo no pɛ sɛ wohu sɛnea wobetumi ayɛ sikasɛm ho nhyehyɛe bi so nhwehwɛmu.

<br/>

## Ɔhaw no

Shielded Zcash hides amounts, senders, and receivers. That privacy is the point. But it raises a hard question: if nobody can see inside the shielded pool, how does anyone know the total amount of ZEC is correct? How do you audit money you cannot see?

If a bug ever let someone forge coins inside a shielded pool, the forgery would be hidden by the same privacy that protects honest users. Without a safeguard, that uncertainty would undermine confidence in the whole supply. The turnstile is the safeguard that solves this.

<br/>

## Dɛn ne ahwehwɛ no?

Think of each shielded pool as a room with a single counted doorway. Every time value enters the pool from outside, or leaves it to go elsewhere, it passes through the doorway and is tallied in public. The transactions inside the room stay private, but the running total at the door is visible to everyone.

N'ahyehyɛde no yɛ tiawa: obi ntumi mma ne bo so nsen nea ɔde aba mu. Ntam nkɔnsɔnkɔnsɔn biara a ɛbɛtwe pool sika ase akɔ zero ho no, wɔpo. Sika dodow a wogye di sɛ ɛwɔ poom hɔ no na wonim bere nyinaa efisɛ ɛyɛ pɛsɛmenkomenya a wɔde baa mu minus deɛ ɛgyaa mu. Saa nnipa dodoɔ yi ara na ɛma wɔn gyinabea ba fam.

<br/>

## Sɛnea ɛyɛ adwuma no

Zcash wɔ nnwumakuo bebree a wɔn ho ban, te sɛ Sprout, Sapling ne Orchard. Ɛsom no tu kɔ baabiara firi saa nkɔnsɔnkɔnsɔn yi mu na ɛtɔ da bi nso a ɛsan ba hɔ ma nsubɔnten ankasa no. Saa akwantufoɔ no hwɛ:

1. Sɛ ZEC tu kɔhyɛ banbɔ a, wɔ de sika no ka saa banbɔ no ho akatua nyinaa ho.
2. Sɛ ZEC tu firi pool mu a, wɔtwe sika no fi ho.
3. Kuw no po biribiara a ɛbɛma akatua bi akɔ negative, kyerɛ sɛ nnipa bebree na wɔakɔ akyiri sen wɔn a wɔde aba.
4. Akwan a wɔfa so di dwuma no yɛ kokoam, na wɔn nyinaa ka ho bi.

The network tracks a balance for every value pool this way, including Sprout, Sapling, Orchard, the new Ironwood pool, and the transparent and lockbox balances. Because of this, even if the exact contents of a pool are hidden, the maximum that can ever come out is capped by what went in. No hidden inflation can escape into circulation.

<br/>

## Sεnea wɔde boɔ toto akatua ho no, ɔkwan bɛn so na wɔhwɛ?

The tally at the door is only trustworthy because every transaction is forced to prove it moved a truthful amount, even though the amount itself stays hidden. Each shielded transaction publishes one honest number: the net value it moves into or out of the pool, called its value balance. A positive value balance means funds left the pool to the transparent side, a negative one means funds entered. The private details stay sealed, but this single net figure is public, and it is what the turnstile adds up.

Ade a nyansa wom ne sɛnea aguadi kyerɛ sɛ nnipa dodow no yɛ anokwafo bere a wonyi kokoam sika ahorow adi. Ɛsono ɔkwan a wɔfa so di agoru, na eyi ne nea ɛma nneɛma sesa ankasa.

In the original Sprout pool, each transaction uses a JoinSplit. A JoinSplit spends two hidden notes and creates two new ones, and it carries two public fields: vpub_old, the value entering the shielded pool from the transparent side, and vpub_new, the value leaving the pool back to the transparent side. Every JoinSplit must balance on its own, and its zero knowledge proof guarantees the hidden inputs and hidden outputs add up correctly. Sprout's pool balance is simply the running total of all vpub_old minus all vpub_new across the chain. This is why Sprout is a useful example later: because vpub_old is the only way value can enter the pool, a single rule turning it off can seal the pool for good.

In Sapling, Orchard, and Ironwood, balance is proven a smarter way, using a binding signature. Instead of each transfer balancing alone, the whole transaction commits to each hidden amount using a value commitment. A value commitment is a sealed envelope for a number, built with a homomorphic Pedersen commitment, which has a special property: the envelopes can be added and subtracted without opening them. The network adds up all the input commitments, subtracts all the output commitments, and compares the result against the transaction's single declared net figure, its valueBalance field. Only a transaction whose hidden amounts genuinely match that public valueBalance can produce a valid binding signature over the combined commitments. If someone tried to move more value than they declared, the commitments would not add up, the binding signature would not verify, and the transaction would be rejected. Ironwood uses the same Orchard protocol, so it works the same way.

This is also what makes a cross-pool transfer safe to check. When funds move from one shielded pool to another, for example from Orchard into Ironwood, the transaction cannot hide the amounts from the accounting. Each pool has its own value balance that must be satisfied by its own proofs: the Orchard side must show a matching outflow through its binding signature, and the Ironwood side must show the corresponding inflow through its own. The value leaving one pool and the value entering the other are each proven independently, so a cross-pool move is really two turnstile crossings happening in one transaction, one out, one in, and both are tallied in public even though the underlying amounts stay private.

Enti, no nsεm a εkyerε sε ͻhaw biara yε ne ankasa net effect. network no de saa nkyerεwde kכma nea w'aka ho asotwe wɔ pool mu na (ZIP 209) gyinabea bi so pow kwan biara a ɛbɛma pool no akatua ayɛ negative. adanse wᴐ transaction level, enforcement at the chain level.

<br/>

## Nea enti a ɛho hia

N'adwumayɛbea no de nneɛma abiɛsa na ɛboa Zcash prɛko pɛ.

Nea edi kan no, ɛma asiane mu yɛ hare. Nkrataa a wɔde di dwuma wɔ ɔfese biako mu no hyɛ saa ɔfase no ase efisɛ nea ɛdan dan yi ma mfaso biara fi so ba nnipa pii nkyɛn.

Second, it lets the community verify the supply in retrospect. If a bug is later discovered, the turnstile record shows whether more value ever left a pool than entered it. A clean record is strong evidence that no counterfeiting was exploited.

Nea ɛtɔ so mmiɛnsa, ɛbɔ kokoam bere a woreyɛ yeinom nyinaa. nko ara ne faako-nkorakoraa no mu dodow na ɛyɛ baguamu de. wo ankorankoro akwantu ahorow no da so yɛ banbɔde. ɔhwɛfoɔ tumi di nneɛma ho dwuma wɔ ɔkwan pa so ma emu biara kɔ yiye. ɛne ahobanbɔ bɔ abira - ɛnyɛ ade a ɛte saa daa, ɛno nso ka Zcash ahoɔden ahodoɔ no ho bi.

<br/>

## Turnical no reyɛ adwuma

Nsεnkyerεmu no nyɛ foforo, na wɔde adi dwuma wɔ mmere titiriw mu wͻ Zcash abakɔsɛm mu.

When Zcash moved from the original Sprout pool toward the newer Sapling pool, the turnstile guarded the transition. The Sprout pool was later restricted so it could not receive new inflows, which encouraged users to migrate while the turnstile kept the accounting honest. Years later, the fact that no value ever improperly left Sprout stands as evidence that its early cryptography was never successfully exploited.

The same design now guards the move from Orchard to Ironwood. In 2026 a soundness bug was found and patched in the Orchard proving system. There is no evidence it was ever exploited, but because shielded activity is private, certainty was impossible. The response is to seal the old Orchard pool and have everyone migrate their funds through the turnstile into Ironwood, a fresh pool using the corrected protocol. Forcing funds through the turnstile means any hypothetical counterfeit coins left behind cannot follow, and once migration completes, anyone can confirm the shielded supply is sound.

<br/>

## Akwantufoɔ a wɔn wɔ sika no ho nimdeɛ pii na wɔde di dwuma.

Saa kwan no so na wobetumi de nsu a ɛwɔ ɔtare dedaw mu akɔto bea foforo, wɔ ɔkwan biako pɛ so, bere biara a wonhwiee ahina bi ngu hɔ. Ɔkwan titiriw ne sɛ wɔbɛtoto apon no ano ma abuebue ato hɔ ama obi afi adi.

Sprout is the clearest example. To deprecate it, ZIP 211 added a single consensus rule: from its activation height, the vpub_old field of every JoinSplit must be zero. Since vpub_old is the only way value can enter Sprout, forcing it to zero means no new value can ever go in again, while value can still flow out to the transparent side or onward to Sapling. The pool became one-way. It can only drain, never fill. The turnstile keeps counting the whole time, so the balance can fall as funds leave but can never rise, and it can never go negative.

The Orchard to Ironwood migration uses the same idea. At the NU6.3 upgrade, the Orchard pool is closed to new inflows, and wallets are directed to send Orchard funds across the turnstile into the new Ironwood pool. Orchard becomes a one-way pool that can only empty. Because every exit is a turnstile crossing that must be proven, any hypothetical counterfeit value left behind in Orchard cannot quietly follow the honest funds out. It is stuck in a pool that only drains and is watched at the door. Over time this drives the old pool toward empty and lets anyone confirm that the value which came out was never more than the value that honestly went in.

This is the deeper reason the turnstile matters beyond simple accounting. It is the mechanism that lets Zcash deprecate a shielded pool, whether to reduce complexity as with Sprout, or to recover from a discovered bug as with Orchard, while keeping a continuous, public, provable guarantee about the supply.

<br/>

## Adwene a ɛmfata a wɔtaa nya

- N'asɛmti no kyerɛ sɛ, wo de sika a wode yɛ adwuma wɔ ɔdan mu na ɛyɛe. Ɛkyerɛ nea ɛbaa ne so nyinaa kɛkɛ; ɛnkyerɛ onipa ko a ɔde biribi kɔmaa obi foforo
- Ɛmfa ho sɛ wɔn a wɔtɔn nneɛma atotɔatotɔ no din na ɛkyerɛ, nanso ɛbɔ nnipa dodow a wobetumi afi ɔbodan mu aba ano hye ma enti ɛma wɔde nea ɛwɔ hɔ nyinaa bɔ ban.
- Ɛnyɛ ade foforo mma Ironwood. Ɛhwɛ asuhina a wɔde bɔ ho ban biara so wɔ Zcash abakɔsɛm mu
- Nnipakuw a w'aka wɔn ho asɛm no nyinaa ntumi mma ahobammɔ nsɛe. Ahobammɔ wɔ nnwuma a wɔyɛ wɔ nnipakuo no mu, na ɛda so ara yɛ ahintasɛm

<br/>

## Nneɛma a wɔde bɔ afɔre

1. [ZIP 209: Ban out-of-range chain value pool balances] (Ɔkwan a wɔfa so de sika kɔtɔ nneɛma no mu)](https://zips.z.cash/zip-0209) - ne nhyehyeԑ mmara a ԑwɔ akyire no mu.
2. [ZIP 211: Deɛ ɛbɛboa ma wɔayi sika foforɔ adi ama wɔn a wɔde nketenkete ka ho no](https://zips.z.cash/zip-0211) - sɛnea wɔtoo Sprout pool no mu maa nkura foforo a wɔde bɛhyɛ ase.
3. [ZIP 258: NU6.3 (Ɔmanfo) kasahorow](https://zips.z.cash/zip-0258) - nkɔso a ɛde Ironwood abura no ba na ɛtwe bo kɔ ɔdan mu hɔ nyinaa so
4. [Turnstile Ahyɛso a Ɛne Adansekurum Ho Nsɛm Ntɔmmɔ hyia](https://electriccoin.co/blog/turnstile-enforcement-against-counterfeiting/) - Electric Coin Company no nkyerɛkyerɛmu a edi kan
5. [Zcash protocol specification] Nkrataafa a ɛfa kasa ho nkontabuo.](https://zips.z.cash/protocol/protocol.pdf) - hwɛ nkyekyɛmu a ɛfa nkae ne nsaano ahoma ho no mu na wubehu nkekaho nyinaa.
6. [Nokware a Ɛsom Bo, Zebra Nhoma no](https://zebra.zfnd.org/dev/rfcs/0012-value-pools.html) - kwan a node no fa so hwɛ nkrataa biara mu mfaso ano.

<br/>

## Nkrataafa a ɛfa ho

- [Nsuo a wɔabɔ ho ban](https://zechub.wiki/using-zcash/shielded-pools) - sɛnea Zcash nnwumakuw a wɔbɔ ho ban no bɔ wɔn nsɛm so faako.
- [Halo] Ɔyɛ ɔkɛse.](https://zechub.wiki/zcash-tech/halo) - adansedi nhyehyɛe a ɛwɔ Orchard abura no akyi
- [Nea ɛfa nkitahodi ho a wɔsakra no](https://zechub.wiki/start-here/network-upgrades) - sɛnea Zcash de nsakrae te sɛ nsu a wɔabɔ ho ban foforo di dwuma no
