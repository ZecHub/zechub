# Nweta ozi nkeonwe

## TL;DR

- Nchịkọta ozi nkeonwe, ma ọ bụ PIR, na-ahapụ ngwaọrụ iji nweta otu ihe site na nchekwa data nkesa n'enweghị onye ọrụ ahụ mụtara ihe a rịọrọ maka ya.
- Zcash chọrọ nke a n'ihi na obere akpa ego onwe ya enweghị ike ịjụ sava ihe azụmahịa bụ nke aka ya ma ghara igosi onwe ya.
- Taa obere akpa na-ebudata ma nyochaa ọtụtụ data karịa ka ha chọrọ, nke bụ isi ihe mere syncing ji dị nwayọ
- PIR ga-ekwe ka obere akpa ego were naanị data nke ya na nzuzo, wepụ ihe mgbochi ahụ ma debe nzuzo dị ọcha.
- Ọ bụ mpaghara nyocha na-arụsi ọrụ ike maka Zcash, dị ike n'echiche, ma bụrụ nke a ga - eme ka ọ rụọ ọrụ maka ezigbo obere akpa ego.

<br/>

## Onye ka nke a bụ maka ya?

- Onye ọbụla jụrụ etu obere akpa ego si achọta mkpụrụ ego nke ya n'ekwuputaghị ndị ha bụ.
- Ndị bịara ọhụrụ na-ahụ PIR ka a kpọtụrụ aha n'akụkụ ọrụ Zcash scaling.
- Ndị na-agụ akwụkwọ chọrọ echiche mbụ ahụ ma jiri ihe nzuzo dị n'okpuru ya nke abụọ.

<br/>

## Nsogbu PIR na-edozi maka Zcash

Zcash na-ezobe onye azụmahịa ahụ bụ maka. Nzuzo nke a na -emepụta ajụjụ dị egwu: ọ bụrụ na netwọk enweghị ike ịhụ ihe ndị ị zụrụ, olee otu obere akpa gị si achọta ha?

Today the answer is blunt. A wallet cannot ask a server which transactions are mine, because that question would reveal exactly what Zcash is trying to hide. So instead the wallet downloads a large amount of data and tests each item locally to see what belongs to it. It works, and it preserves privacy, but it is slow and heavy. This scanning is one of the main reasons wallet syncing can feel sluggish.

The ideal would be a way for a wallet to ask a server for precisely its own data, and receive it, without the server ever learning what was requested. That is exactly what private information retrieval provides.

<br/>

## Ihe PIR bụ

Nchịkọta ozi nkeonwe bụ usoro nzuzo na-eme ka onye ahịa gụọ otu ntinye site na nchekwa data ihe nkesa n'ekpughereghị sava ahụ ụdị ọ gụrụ.

Imagine a library where you can receive the exact book you want, but the librarian never learns which book they handed you. You get your item, and your interest stays private. PIR is the mathematical version of that idea, applied to any database.

The concept has been studied in cryptography for decades. It was first introduced in 1995 by Chor, Goldreich, Kushilevitz, and Sudan, who described the multiple server approach, and the first single server version followed in 1997 from Kushilevitz and Ostrovsky. It is not something Zcash invented, it is an established field that Zcash is now applying to a real and stubborn problem.

<br/>

## Olee otú PIR si arụ ọrụ, na ọkwa mbụ

E nwere ụzọ abụọ dị iche iji wuo PIR, na ọdịiche ahụ bụ ihe.

The first uses multiple servers. The client sends each of several servers a piece of the query, and combines their answers locally. No single server sees enough to learn what was requested. This is efficient, but it depends on the servers not colluding with each other, which is hard to guarantee in the real world.

The second uses a single server and clever cryptography instead of multiple parties. Here the client relies on a special tool called homomorphic encryption, and this is the direction most useful for real deployments, because it does not need multiple non-colluding servers.

<br/>

## Usoro: homomorphic encryption (nhazi nke ihe niile na-eme n'otu ụzọ)

Homomorphic encryption bụ ụdị nke na-eme ka ihe nkesa rụọ ọrụ data mgbe ọ nọgidere na nzuzo. Ihe nkesa ahụ mepụtara azịza ziri ezi ezoro ezo n'enweghị ike ịhụ ụkpụrụ ndị dị mkpa.

Here is the idea behind single-server PIR built this way. The client wants item number three out of a list. It builds a query that is, in effect, an encrypted yes for position three and an encrypted no for every other position. To the server, this query is just meaningless noise, it cannot tell which position holds the yes.

The server then combines its database with this encrypted query using the special properties of homomorphic encryption, multiplying each stored item by the matching encrypted yes or no and adding the results together. What comes out is a single encrypted package that contains exactly the item the client wanted, and nothing reveals which one it was. The client decrypts that package and reads its item. The server has answered the question without ever knowing the question.

Ụdị siri ike, a na-akpọ symmetric PIR, gbakwunyere ihe nchebe nke abụọ: onye ahịa ahụ maara naanị ihe ọ rịọrọ ma ghara ịma banyere ntinye ọzọ n'ime nchekwa data. Nke ahụ na - echebe ọdụ data yana ndị ahịa.

<br/>

## N'ilebakwu anya maka ndị na-agụ akwụkwọ ọrụaka.

Modern single-server schemes are built on lattice cryptography, most commonly the learning with errors assumption. The client's query is a vector of ciphertexts, an encryption of one at the target index and zero elsewhere, and the encryption is additively homomorphic, so the server can add ciphertexts and multiply them by plaintext database entries without decrypting.

Ihe nkesa ahụ na-emeso nchekwa data dị ka matriks, tinye vector nhọrọ ezoro ezo ma weghachite otu ederede nke decrypts gaa n'ahịrị achọrọ. N'ihi na ajụjụ a enweghị ike ịmata ọdịiche site na mkpọtụ random, ihe nkesa anaghị enweta ozi gbasara ndeksi ahụ.

The historic obstacle has always been cost. Naively, the server must touch every entry in the database for each query, which is expensive in computation, and the ciphertexts are large, which is expensive in bandwidth. Recent research attacks this with preprocessing, schemes such as SimplePIR and FrodoPIR let the server prepare the database ahead of time and hand each client a small hint, pushing much of the work into an offline phase so that live queries become fast. A useful side benefit is that lattice-based constructions are also considered resistant to quantum attacks, which aligns with Zcash's wider move toward post-quantum privacy.

<br/>

## PIR na Zcash

PIR bụ akụkụ nke mbọ iji mee ka Zcash bụrụ ihe nzuzo na ngwa ngwa.

The wallet scanning bottleneck described earlier is the target. Work at the Valar Group is developing private information retrieval techniques so that a wallet can fetch its own data from a server without the server learning which entries were requested. One concrete application is checking nullifiers privately. A nullifier is a unique marker published when a note is spent, which stops the same funds being spent twice. A wallet often needs to check whether a given nullifier has appeared yet, in other words whether a note is still unspent, and doing that through a server today can leak which note is being asked about. Private information retrieval lets the wallet ask that question without revealing which nullifier it cares about. This sits alongside other scaling work, including Project Tachyon and new node software, aimed at removing the performance limits that hold back private wallets today.

Ọ dị mkpa ikwu eziokwu banyere ọkwa a. Nke a bụ nyocha na injinia, ọ bụghị ihe arụpụtarala ma zipụ ya. Echiche ahụ guzobere nke ọma yana ụzọ e setịpụrụ, mana ịme PIR ka ọ rụọ ọrụ nke ọma maka obere akpa kwa ụbọchị n'ihe ndị nkịtị bụ kpọmkwem akụkụ siri ike a na-arụ ugbu a.

<br/>

## Ihe ndị mmadụ na-ekwukarị nke bụ́ eziokwu.

- PIR na-ezobe ihe ị rịọrọ, ọ bụchaghị zoo na i kpọtụrụ onye nkesa ahụ ma ọlị, metadata netwọk dị n'ọkwa bụ nchegbu ọzọ.
- PIR abụghị naanị maka Zcash, ọ bụ ngwa ọrụ cryptographic nke Zcash na-etinye n'ọrụ nzuzo wallet.
- Ịmekọrịta ngwa ngwa site na PIR bụ ihe mgbaru ọsọ dị n'ihu, ọ bụghị atụmatụ nke adịworị na wallets.
- Nbudata ihe niile na nyocha mpaghara, usoro dị ugbu a bụ nkeonwe mana nwayọ. PIR chọrọ idobe nzuzo ma wepụ ịdị nwayọọ ahụ

<br/>

## Peeji ndị metụtara ya

- [Nkwekọrịta obere akpa Zcash](https://zechub.wiki/zcash-tech/zcash-wallet-syncing) - ihe mere syncing ji arụ ọrụ taa.
- [Lightwallet Nodes (Nọmba nke obere akpa ego)](https://zechub.wiki/zcash-tech/lightwallet-nodes) - ìhè ahịa nlereanya PIR ga-mma
- [zk-SNARKs](https://zechub.wiki/zcash-tech/zk-snarks) - ọzọ isi cryptographic ngwá ọrụ n'azụ Zcash nzuzo
- [Nchebe Mgbe E Mechara Ihe Ndị Dị n'Eluigwe na Ala](https://zechub.wiki/zcash-tech/post-quantum-security) - ihe mere usoro ndị dabeere na lattice ji dị mkpa maka ọdịnihu.
