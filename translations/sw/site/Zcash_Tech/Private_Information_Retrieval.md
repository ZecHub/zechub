# Kufufua habari binafsi

## TL;DR

- Kufufua habari binafsi, au PIR, inaruhusu kifaa kupata bidhaa moja kutoka database server ya bila server kujifunza ambayo kipengee aliuliza kwa
- Zcash mahitaji haya kwa sababu mkoba binafsi hawezi kuuliza server ambayo shughuli ni yake mwenyewe bila kutoa yenyewe mbali.
- Leo pochi download na scan data mbali zaidi kuliko wao haja, ambayo ni sababu kuu ya kusawazisha ni polepole
- PIR ingekuwa basi mkoba kuchota tu data yake binafsi, kuondoa kwamba bottleneck wakati kuweka faragha intact
- Ni eneo la utafiti hai kwa Zcash, nguvu katika nadharia, na kuwa vitendo kwa ajili ya pochi halisi

<br/>

## Hii ni kwa ajili ya nani?

- Mtu yeyote ambaye amejiuliza jinsi mkoba binafsi hupata sarafu yake mwenyewe bila kuvuja ambayo wale
- Wageni ambao kuweka kuona PIR zilizotajwa kando Zcash kazi ya kuongeza ukubwa wa.
- Wasomaji ambao wanataka dhana ya kwanza na cryptography chini yake pili

<br/>

## Tatizo PIR kutatua kwa Zcash

Zcash huficha ambaye shughuli ni kwa. kwamba faragha inajenga swali awkward: kama mtandao hawezi kuona ambayo mikataba mali yako, jinsi gani mkoba wako mwenyewe kupata yao?

Today the answer is blunt. A wallet cannot ask a server which transactions are mine, because that question would reveal exactly what Zcash is trying to hide. So instead the wallet downloads a large amount of data and tests each item locally to see what belongs to it. It works, and it preserves privacy, but it is slow and heavy. This scanning is one of the main reasons wallet syncing can feel sluggish.

Bora itakuwa njia kwa mkoba kuuliza server hasa data yake mwenyewe, na kupokea hiyo, bila ya seva milele kujifunza nini aliomba. Hiyo ni nini haswa binafsi habari retrieval hutoa.

<br/>

## PIR ni nini?

Kufufua habari binafsi ni mbinu ya cryptographic kwamba lets mteja kusoma moja kuingia kutoka database server bila kufunua kwa seva ambayo entry alisoma.

Fikiria maktaba ambapo unaweza kupokea kitabu hasa unataka, lakini librarian kamwe anajua ambayo kitabu wao mikononi. Unaweza kupata bidhaa yako, na maslahi yako anakaa binafsi. PIR ni toleo la hisabati ya wazo kwamba, kutumika kwa yoyote database.

The concept has been studied in cryptography for decades. It was first introduced in 1995 by Chor, Goldreich, Kushilevitz, and Sudan, who described the multiple server approach, and the first single server version followed in 1997 from Kushilevitz and Ostrovsky. It is not something Zcash invented, it is an established field that Zcash is now applying to a real and stubborn problem.

<br/>

## Jinsi PIR kazi, katika ngazi ya kwanza

Kuna njia mbili kuu za kujenga PIR, na tofauti ni muhimu.

Kwanza hutumia seva nyingi. mteja hutuma kila moja ya servers kadhaa kipande cha swali, na huchanganya majibu yao ndani ya nchi. hakuna server mmoja anaona kutosha kujifunza nini aliomba. Hii ni ufanisi, lakini inategemea juu ya watumiaji si kwa makusudi pamoja na mtu mwingine, ambayo ni vigumu kuhakikisha katika ulimwengu wa kweli.

Pili inatumia server moja na cryptography smart badala ya vyama mbalimbali. Hapa mteja hutegemea chombo maalum aitwaye homomorphic encryption, na hii ni mwelekeo muhimu zaidi kwa ajili ya kupelekwa halisi, kwa sababu haina haja servers nyingi zisizo colluding.

<br/>

## utaratibu: homomorphic encryption

Homomorphic encryption ni aina ya usimbuaji ambayo inaruhusu server mahesabu juu data wakati anakaa encrypted. Server inazalisha sahihi encrypped jibu bila milele kuona maadili msingi.

Hapa ni wazo nyuma ya single-server PIR kujengwa kwa njia hii. mteja anataka kipengee namba tatu kutoka orodha. hujenga swali kwamba, katika athari, encrypted ndiyo nafasi tatu na hakuna encryption kwa kila msimamo mwingine. server, ombi hili tu haina maana kelele, haiwezi kusema ambayo nafasi ana yes.

Server kisha inachanganya database yake na hii encrypted query kutumia mali maalum ya homomorphic encryption, kuzidisha kila kuhifadhiwa kipengee kwa vinavyolingana encrypti yes au no and adding the results together. Nini hutoka ni moja tu encryptable mfuko ambayo ina hasa bidhaa mteja alitaka, na hakuna kitu anaonyesha ambayo ilikuwa mmoja. Mteja decrypts kwamba kifurushi na anasoma kipande chake. server amejibu swali bila hata kujua swali.

Toleo la nguvu, aitwaye symmetric PIR, anaongeza dhamana ya pili: mteja hujifunza tu bidhaa aliuliza kwa na kitu chochote kuhusu kuingia nyingine yoyote katika database. Hiyo inalinda database kama vile mteja.

<br/>

## Kuangalia kwa karibu zaidi kwa wasomaji wa kiufundi

Modern single-server schemes are built on lattice cryptography, most commonly the learning with errors assumption. The client's query is a vector of ciphertexts, an encryption of one at the target index and zero elsewhere, and the encryption is additively homomorphic, so the server can add ciphertexts and multiply them by plaintext database entries without decrypting.

Server inachukua database kama matrix, inatumia vector ya uteuzi iliyofichwa na kurudisha ciphertext moja ambayo hufafanua kwenye safu inayotaka. Kwa sababu swala haliwezi kutofautiana kutoka kwa kelele za random, server haipati habari kuhusu index.

The historic obstacle has always been cost. Naively, the server must touch every entry in the database for each query, which is expensive in computation, and the ciphertexts are large, which is expensive in bandwidth. Recent research attacks this with preprocessing, schemes such as SimplePIR and FrodoPIR let the server prepare the database ahead of time and hand each client a small hint, pushing much of the work into an offline phase so that live queries become fast. A useful side benefit is that lattice-based constructions are also considered resistant to quantum attacks, which aligns with Zcash's wider move toward post-quantum privacy.

<br/>

## PIR katika Zcash

PIR ni sehemu ya juhudi za kufanya Zcash kuwa binafsi na kwa haraka.

The wallet scanning bottleneck described earlier is the target. Work at the Valar Group is developing private information retrieval techniques so that a wallet can fetch its own data from a server without the server learning which entries were requested. One concrete application is checking nullifiers privately. A nullifier is a unique marker published when a note is spent, which stops the same funds being spent twice. A wallet often needs to check whether a given nullifier has appeared yet, in other words whether a note is still unspent, and doing that through a server today can leak which note is being asked about. Private information retrieval lets the wallet ask that question without revealing which nullifier it cares about. This sits alongside other scaling work, including Project Tachyon and new node software, aimed at removing the performance limits that hold back private wallets today.

Ni muhimu kuwa waaminifu kuhusu hatua. Hii ni utafiti hai na uhandisi, si kumaliza, kusafirishwa kipengele. dhana ya imara vizuri na mwelekeo imewekwa, lakini kufanya PIR ufanisi wa kutosha kwa ajili ya pochi kila siku juu ya vifaa vya kawaida ni hasa sehemu ngumu kazi sasa.

<br/>

## Maoni yasiyo sahihi ya kawaida

- PIR huficha ambayo kipengee uliomba, haina lazima kuficha kwamba kuwasiliana server wakati wote, mtandao-kiwango cha metadata ni wasiwasi tofauti
- PIR si kipekee kwa Zcash, ni general cryptographic chombo kwamba Zcash inatumika kwa mkoba faragha
- Haraka kusawazisha kutoka PIR ni lengo katika maendeleo, si kipengele tayari sasa katika pochi
- Downloading kila kitu na skanning ndani ya nchi, mbinu ya sasa ni binafsi lakini polepole, PIR inalenga kuweka faragha wakati kuondoa upole

<br/>

## Kurasa zinazohusiana na makala hii

- [Zcash Wallet Syncing (Usawazishaji wa Pochi za Kifedha)](https://zechub.wiki/zcash-tech/zcash-wallet-syncing) - kwa nini syncing kazi njia inafanya leo
- [Nodes Lightwallet](https://zechub.wiki/zcash-tech/lightwallet-nodes) - mwanga mteja mfano PIR ingekuwa kuboresha
- [zk-SNARKs](https://zechub.wiki/zcash-tech/zk-snarks) - nyingine kubwa cryptographic chombo nyuma Zcash faragha
- [Usalama Baada ya Quantum](https://zechub.wiki/zcash-tech/post-quantum-security) - kwa nini mbinu lattice-msingi umuhimu wa baadaye
