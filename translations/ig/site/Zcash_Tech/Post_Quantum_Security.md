<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Post_Quantum_Security.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Nchekwa Post-Quantum na Zcash

## TL;DR

- Quantum computers are a future risk because they could break some public-key cryptography used by blockchains today.
- "Post-quantum" pụtara cryptography nke na-agba ọsọ na kọmputa ndị nkịtị mana e mere iji guzogide mwakpo site na kọmputa quantum n'ọdịnihu.
- Zcash abụghị nke post-quantum taa.
- Zcash echedoro na-ebelata ọnụọgụ nke data azụmahịa ọha na eze nke ndị mwakpo n'ọdịnihu nwere ike ịmụ, mana iji ya echedo abụghị otu ihe ahụ dị ka nguzogide zuru oke.
- Zcash is preparing through research, ZIPs, and upgrade proposals such as ZIP 2005 and Project Tachyon.
- Mgbanwe post-quantum dị nchebe ga-echekwa ego, nzuzo, obere akpa ego, mgbanwe, na iwu nkwekọrịta n'otu oge.

## Gịnị Bụ Kọmputa Na-arụ Ọrụ n'Ụzọ Na-adịghị Anya?

Kọmputa nkịtị na-echekwa ihe ọmụma dị ka bit. `0` or `1`.

A quantum computer uses quantum bits, called qubits. Qubits can be used by special algorithms that solve some math problems much faster than normal computers.

That does not mean a quantum computer is faster at everything. The risk is specific. Some cryptography depends on math problems that are very hard for normal computers but much easier for a large enough quantum computer.

For blockchains, the most important example is public-key cryptography. Public keys and signatures are used to prove that a user is allowed to spend coins.

## Ihe Mere Blockchain Ji Dị Mkpa

Blockchains na-eji cryptography arụ ọtụtụ ọrụ dị iche iche:

| Cryptographic tool | What it does | Quantum impact |
| --- | --- | --- |
◯ Nkwekọrịta dijitalụ ◯ Ihe akaebe na onye nwe ya nyere ikike imefu ego ◯ E nwere nnukwu ihe ize ndụ maka usoro elliptic-curve ndị a na-ahụkarị
◯ Ọrụ hash ◯ Ịmepụta adreesị, nkwekọrịta, osisi Merkle, na ihe ịma aka ◯ Ihe ize ndụ dị ala, ma nchebe dị mkpa
| Zero-knowledge proofs | Prove shielded transactions are valid without revealing details | Depends on the proof system and assumptions |
Nkwekọrịta igodo. Na-enyere wallets aka izochi data maka ndị na-anata ya. Ọ chọrọ nlezianya nyochaa n'okpuru ụdị egwu quantum.

Kọmputa kọntaktị dị ike nke ga-eme ka ọtụtụ ihe ndị e ji edebanye aha n'akwụkwọ na kọmputa taa ghara ịdị irè, tinyere ihe ndị a na-akpọ elliptic-curve signatures.

Ọrụ hash dị iche. Grover's algorithm nwere ike ime ka nchọta ike dị ngwa, mana ọ naghị emebi ọrụ hash n'otu ụzọ ahụ. Nnukwu nchekwa nchekwa nwere ike inyere aka.

## Gịnị Bụ Post-Quantum Cryptography?

Post-quantum cryptography bụ ihe eji eme ihe iji chebe ma kọmputa nkịtị na kọmputa quantum n'ọdịnihu.

Nke a apụtaghị na e jirila kọmpụta kọmpat mee ihe, kama ọ pụtara na usoro ahụ dabeere n'ihe ịma aka dị iche iche nke mgbakọ na mwepụ.

N'afọ 2024, NIST wepụtara ụkpụrụ post-quantum mbụ:

- **ML-KEM** maka isi ụlọ ọrụ
- **ML-DSA** maka mbinye aka dijitalụ
- **SLH-DSA** maka hash dabeere na dijitalụ signatures

Ụkpụrụ ndị a bụ ihe dị mkpa, mana ngọngọ enweghị ike ịgbanwe otu algorithm maka onye ọzọ n'otu abalị. Iwu nkwekọrịta, obere akpa ego, obere ngwaike, nha azụmahịa, ụgwọ, na nzuzo niile ga-atụle.

## Otu ihe ize ndụ quantum si apụta na-egosi na Chain

Ụzọ dị mfe isi chee echiche banyere ihe ize ndụ bụ:

1. Onye ọrụ na-emepụta ụzọ igodo.
2. Igodo ọha na eze ma ọ bụ data mbinye aka nwere ike ịpụta na agbụ.
3. Onye na-awakpo quantum n'ọdịnihu nwere ike iji ihe onwunwe ọha na eze ahụ mụta igodo nzuzo.
4. Ọ bụrụ na isi ihe ahụ ka na-achịkwa ego, ha pụrụ ịnọ n'ihe ize ndụ.

Transparent blockchains expose a lot of information by design. Addresses, amounts, and transaction links are public. Public key material can also become visible when coins are spent.

This is one reason address reuse is harmful. Reuse gives observers more data to connect today and gives future attackers more historical material to analyze.

## Gịnị Dị Iche Banyere Zcash?

Zcash na-akwado ma azụmahịa ndị doro anya na nke ezoro ezo.

Zcash na-arụ ọrụ dị ka Bitcoin-style public blockchain usage. Adreesị, ego, na mmekọrịta azụmahịa na-ahụ anya.

Shielded Zcash is different. Shielded transactions use zero-knowledge proofs so the network can verify that a transaction follows the rules without revealing the sender, receiver, or amount.

Nke a na-enye Zcash uru nzuzo dị mkpa:

- A na-ebipụta obere data azụmahịa maka onye ọ bụla ịhụ.
- Ndị ọrụ na-ezere ịmepụta eserese ịkwụ ụgwọ ọha na eze mgbe ha na-eche nche.
- Ndị na-ekiri ihe ga-eme n'ọdịnihu nwere obere akụkọ ego ọha na eze iji nyochaa.
- Nkọwapụta nhọrọ nwere ike ime site na igodo nlele kama ndekọ ọha na eze.

But shielded Zcash is not automatically post-quantum. Shielded pools still depend on cryptographic assumptions. Spend authorization, note commitments, nullifiers, proof systems, encryption, and wallet keys all need careful review.

Nkọwa ya dị mkpirikpi:

> Ojiji e chebere na-ebelata ikpughe ọha na eze, mana Zcash ka chọrọ nkwalite post-quantum.

## Zcash Risk Map

Ebe. Nkọwa nke onye mbido. Nchegbu post-quantum.
| --- | --- | --- |
| Transparent addresses | Public addresses and public transaction graph | Similar risks to other transparent blockchains |
◯ Ikike imefu ego ◯ Ihe akaebe na onye ọrụ nwere ikike imefu ihe ◯ Atụmatụ mbinye aka nwere ike ịchọ nnọchi ma ọ bụ ịkwaga
◯ Ihe edeturu echebe ◯ Ndekọ nzuzo nke uru dị n'ime ọdọ mmiri echedoro ◯ Ụfọdụ components nwere ike ịchọ echiche ọhụrụ ma ọ bụ ngwaọrụ mgbake
| zk-SNARKs | Proofs that shielded transactions are valid | Proof-system assumptions need review |
◯ Nnyocha obere akpa ◯ Otú obere akpa si achọta ma kọwaa akwụkwọ ozi ndị e nwetara ◯ Ọ dị mkpa ka e nyochaa nkwekọrịta igodo na koodu nzuzo
Mgbanwe. Ịkwaga ego na cryptography dị nchebe. Kwesịrị izere ma ego ọnwụ na nzuzo leaks.

## Otú Zcash Si Na-akwadebe

### Zcash nwere usoro nkwalite netwọkụ

Zcash agbanweela koodu nzuzo ya tupu. Sapling mere ka azụmahịa echedoro dị mfe iji. NU5 webatara Orchard, Unified Addresses, na Halo 2.

Nke a dị mkpa n'ihi na ịdị njikere post-quantum abụghị otu akara ngwanrọ. Ọ chọrọ nkwalite netwọk jikọtara ọnụ, mgbanwe obere akpa, nyocha, na oge maka ndị ọrụ ịkwaga.

Past Zcash upgrades show that the ecosystem has experience moving from older cryptography toward newer designs.

### Halo na Orchard Ebelatawo Echiche Ndị Ochie

A na-eji Halo 2 site na Orchard, ọdọ mmiri nke Zcash nke oge a. Otu mmezi dị mkpa bụ na Halo wepụrụ mkpa maka ntọala a tụkwasịrị obi maka usoro ihe akaebe Orchard.

Nke ahụ abụghị otu ihe dị ka nchekwa post-quantum. Ọ ka dị mkpa n'ihi na ọ na-egosi Zcash nwere ike dochie isi ụlọ ọrụ cryptographic mgbe atụmatụ ka mma dị.

### ZIP 2005 na-elekwasị anya na Quantum Recovery

ZIP 2005 is titled "Orchard Quantum Recoverability." It proposes changes intended to help Orchard users recover or migrate funds if quantum attacks against older assumptions become practical.

Enweghi ike ịlaghachi azụ abụghị otu ihe ahụ dị ka nchekwa zuru ezu post-quantum. Ọ dị warara ma ka bara uru:

- Nchebe zuru ezu nke post-quantum na-anwa igbochi mwakpo quantum ịrụ ọrụ.
- Iweghachite na-enye ndị ọrụ eziokwu ụzọ ka mma ma ọ bụrụ na nzuzo ochie aghọghị ihe nchebe.

Ọ naghị anọchi ụlọ ahụ dum, ma ọ na-enyere ndị mmadụ aka ịpụ n'ụlọ ochie ahụ n'enweghị nsogbu ma ọ bụrụ na mkpọchi ochie ahụ adaa mbà.

### Project Tachyon na-ele anya n'ihu n'imeziwanye usoro iwu

Project Tachyon is a proposed Zcash upgrade focused on scale, sync, and state growth. Its public site says the proposal aims to shrink transactions, reduce validator state growth, and obtain full post-quantum privacy as a side effect.

Because Tachyon is a proposal, it still depends on engineering work, review, and community approval before activation. It is best understood as part of Zcash's active research and upgrade direction, not as a feature that users already have today.

### Nnyocha na Ụkpụrụ Na-aga n'Ihu

The wider cryptography world is also moving. NIST's post-quantum standards give implementers stronger building blocks for signatures and key establishment. Zero-knowledge researchers continue to study proof systems that can hold up under quantum assumptions.

Zcash nwere ike irite uru site na ọrụ ahụ, mana ọ ka ga-emegharị ya na blockchain na-echekwa nzuzo.

## Ọdịnihu ga-ekwe omume Upgrade Approaches

### Nkwado mmefu post-Quantum

Zcash nwere ike mechaa chọọ ikike ịkwụ ụgwọ nke na-adabereghị na usoro ntinye aka nke quantum.

This could use post-quantum signatures, hybrid signatures, or another design. A hybrid design uses both classical and post-quantum checks during a transition period, so the system does not depend on only one assumption.

Ihe ịma aka bụ nha na ọnụahịa. Mbinye aka post-quantum nwere ike ibu karịa mbinye aka taa, nke na-emetụta nha azụmahịa, bandwit, ụgwọ, obere akpa mkpanaka, na obere akpa ngwaike.

### Adreesị Ọhụrụ na Key Formats

New cryptography often needs new keys and addresses. Users would need a clear migration path from old formats to safer formats.

Mbugharị kwesịrị ịdị mfe na wallets. Ọtụtụ ndị ọrụ ekwesịghị ịghọta nkọwa ọ bụla nke cryptographic iji nọrọ na nchekwa.

### Ịkwaga Ebe Ọzọ Iji Chebe Nzuzo Onwe Onye

Migration is especially sensitive for Zcash. If many users move funds from old pools to new pools in obvious patterns, the migration itself could leak information.

Ezigbo atụmatụ mbata na ọpụpụ kwesịrị ichebe:

- Ego ndị ọrụ
- Nzuzo onye ọrụ
- Mmekọrịta obere akpa
- Nkwado mgbanwe
- Nkwado akpa ego ngwaike
- Nchebe nkwekọrịta netwọkụ

### Nyochaa usoro ihe akaebe nke post-quantum

Dochie mbinye aka ezughi. Zcash si echebe imewe na-adaberekwa na efu-ihe ọmụma àmà na nkwa.

Ọrụ ndị ọzọ a ga-arụ n'ọdịnihu nwere ike ịchọ inyocha ma ọ bụ dochie:

- echiche zk-SNARK
- Ntinye aka nke Polynomial
- Fiat-Shamir ịma aka hashes
- Rịba ama nkwekọrịta
- Nrụpụta nke Nullifier
- Echiche nke osisi Merkle
- Rịba ama izo ya ezo na igodo igodo

Ụfọdụ components nwere ike ịbụ na-anabata na gbanwetụrụ parameters. ndị ọzọ components pụrụ ịchọ ọhụrụ aghụghọ.

## Ihe Atụ Ndị E Ji Amalite

### Ihe Nlereanya nke 1: Mkpọchi Ochie ahụ

Cheedị banyere igbe e ji akụrụngwa mee bụ́ nke mkpọchi ya siri ike taa. Ngwá ọrụ ọhụrụ e mepụtara n'ọdịnihu pụrụ imeghe mkpọchi ochie ahụ ngwa ngwa.

Nkọwa post-quantum yiri iji ihe ọhụrụ a na-atụghị anya ya mebie mkpọchi ahụ.

Maka blockchain, dochie mkpọchi ahụ siri ike n'ihi na obere akpa ọ bụla, ọnụ, mgbanwe, na ngwaọrụ ngwaike ga-aghọta atụmatụ ọhụrụ ahụ.

### Ihe Nlereanya nke Abụọ: Igbe Ntọala Ọha na Eze

Transparent blockchain data is like putting every receipt in a public box forever. Even if nobody can read every pattern today, future tools may learn more later.

Shielded Zcash tries to avoid publishing those receipts in the first place. That helps long-term privacy, but the lock protecting the shielded system still has to be reviewed for a quantum future.

### Ihe Nlereanya 3: Atụmatụ Ọpụpụ

Ịchọta ụzọ ị ga-esi gbapụ n'ụlọ ọkụ na-enwu, dị ka ịhazi ụzọ tupu ọkụ agbanyụ, bụ́ nke ị na-atụ anya na ọ gaghị adị gị mkpa, ma ọ ka mma ime atụmatụ ya n'oge karịa mgbe ihe mberede mere.

ZIP 2005 dabara n'echiche a maka Orchard Notes.

## Ihe Ndị Na-aṅụ Ya Nwere Ike Ime Taa

Ndị ọrụ ekwesighi ịtụ ụjọ. Nnukwu kọmputa kọmpụta ọha na eze nwere ike imebi ihe eji eme ihe na blockchain adịghị taa.

Ezi àgwà ka na - enye aka:

- Na-ahọrọ iji Zcash kpuchie mgbe enwere ike.
- Zere iji adreesị eme ihe ọzọ.
- Na-eme ka ego gị na-adị ọhụrụ.
- Soro ọkwa nkwalite netwọk Zcash.
- Lelee maka ZIPs na ntuziaka obere akpa banyere mgbake ma ọ bụ mbugharị.
- Echekwala na ihe ọ bụla e mere n'ụzọ doro anya bụ ihe nzuzo.
- Ebula ego dabere na asịrị; chere maka nduzi doro anya site n'aka ndị mmepe Zcash tụkwasịrị obi na ndị otu obere akpa.

## Ihe Ịma Aka Ndị Dị na Ya

Nwelite post-quantum siri ike maka blockchain ọ bụla.

Ihe ịma aka ndị a na-ahụkarị gụnyere:

- Igodo na mbinye aka ndị buru ibu
- Nnukwu azụmahịa
- Ọnụ ego nyocha dị elu
- Mgbasawanye bandwidth
- Nyocha nchebe ọhụrụ
- Nkwado akpa ego ngwaike
- Ọrụ obere akpa mkpanaka
- Mgbanwe na njide njide
- Nzuzo leaks n'oge Mbugharị
- Nkwekọrịta Community banyere mgbanwe nkwekọrịta

For Zcash, the hardest part is not only keeping coins spendable. The hard part is keeping coins spendable while preserving the privacy that makes Zcash different.

## Nchịkọta

Kọmputa kọntaktị nwere ike mechaa yie ụfọdụ ihe eji eme ihe na-eji blockchains eme ihe egwu. Post-quantum cryptography bụ azịza dị ogologo oge, mana a ga-eji nlezianya tinye ya.

Zcash abụghị nke post-quantum taa. Agbanyeghị, Zcash nwere ike bara uru: azụmahịa echekwara na-ebelata ikpughe ọha na eze, netwọkụ nwere akụkọ ihe mere eme nke nkwalite cryptographic, yana nyocha dị ugbu a dịka ZIP 2005 na Project Tachyon ezubere iche maka ihe egwu quantum n'ọdịnihu.

For beginners, the main idea is simple: privacy today reduces future data exposure, and careful upgrades can help Zcash move toward stronger quantum-era security without sacrificing usability.

## Peeji ndị metụtara ya

- [Egwú Mmiri Ndị E Chebere](/using-zcash/shielded-pools) - Otu azụmahịa Zcash si echebe nkọwa azụmahịa
- [Halo](/zcash-tech/halo) - Zcash's proof system na-enweghị ntọala a tụkwasịrị obi
- [ZKP & ZK-SNARKS](/zcash-tech/zk-snarks) - Olee otú efu-ihe ọmụma àmà na-arụ ọrụ na Zcash
- [Ịhụ Igodo](/zcash-tech/viewing-keys) - Olee otú nhọrọ ngosi na-arụ ọrụ maka shielded Zcash
- [Zcash echebe akụ](/zcash-tech/zcash-shielded-assets) - Ọdịnihu echekwara akụ na nkwado nke onwe akụ
- [Nchekwa nzuzo dị ka ụkpụrụ bụ isi](/privacy/privacy-as-a-core-principle) - Ihe mere ego nzuzo ji dị mkpa

## Akwụkwọ ntụaka

- [NIST: Nke mbụ emechara post-quantum encryption ụkpụrụ](https://www.nist.gov/news-events/news/2024/08/nist-releases-first-3-finalized-post-quantum-encryption-standards)
- [NIST Post-Quantum Cryptography Project](https://csrc.nist.gov/projects/post-quantum-cryptography)
- [ZIP 2005: Orchard Quantum Recoverability](https://zips.z.cash/zip-2005)
- [Ọrụ Tachyon](https://tachyon.z.cash/)
- [Zcash Protocol nkọwapụta](https://zips.z.cash/protocol/protocol.pdf)
- [Akwụkwọ Halo 2](https://zcash.github.io/halo2/)
