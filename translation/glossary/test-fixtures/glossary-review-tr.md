# ZecHub glossary review: Turkish (`tr`)

Glossary version 2. Kit: pages.

**Nasıl doldurulur**
- **✅ sütunu:** Gösterilen çeviri doğruysa `OK`, İngilizce kelimeyi korumak için `keep English` ya da kendi kullanacağınız çeviriyi yazın. Her hücreye tek bir çeviri yazın. Emin değilseniz boş bırakın. ID sütununu değiştirmeyin.
- **Notes sütunu (önemli):** Değiştirdiğiniz ya da `keep English` olarak işaretlediğiniz her satır için nedenini kendi sözlerinizle kısa bir cümleyle yazın; örneğin "yerel borsalar ve cüzdanlar bu terimi kullanıyor" ya da "bu kelime posta adresi anlamına geliyor". Doğru kelime bağlama göre değişiyorsa (fiil ya da isim, menü ya da sayfa) veya bir satır anlaşılmıyorsa da Notes sütununu kullanın. Notu olmayan değişiklikler kabul edilmeyebilir.

**How to fill in**

- **✅ column:** write `OK` if the shown rendering is right, `keep English` to keep the English word, or the rendering you would use. One rendering per cell. Leave it empty if you are not sure. Do not edit the ID column.
- **Notes column (important):** for every row you change or mark `keep English`, write one short line in your own words saying why, for example "this is what local exchanges and wallets use" or "this word means a street address". Also use Notes when the right word depends on the context (verb or noun, menu or page), or when a row is unclear. Changes without a note may not be accepted.

**Proposed column:** for rows the glossary had no proposal for, it now shows the word our `tr` pages use today, and "Seen today" shows the counts behind it. Please check whether it is right.

Names that stay in English in every language (brands, products, programmes) are not in these tables; they are listed in `translation/protected-terms.json`.

## Conflicts to decide first

No conflicts.

## Terms in wiki pages
(`terms`: 62 rows)

| # | ID | English | Meaning | Occurrences | Seen today in `tr` pages | Proposed | ✅ Confirmed | Notes |
|---|---|---|---|---:|---|---|---|---|
| 1 | wallet | wallet | App or device that holds the keys to your coins and lets you send and receive them. | 1,694 | cüzdan ×1433, wallet ×649 | cüzdan |  |  |
| 2 | shielded | shielded | Protected by Zcash's zero-knowledge encryption: a shielded address, transaction or pool hides sender, receiver and amount. Not: encrypted (generic). Translate 'encrypted' normally. | 1,433 | shielded ×1029, korumalı ×574 | shielded |  |  |
| 3 | transaction | transaction | A transfer of coins recorded on the blockchain. | 1,281 | işlem ×1340, transaction ×125 | işlem |  |  |
| 4 | address | address | A string that identifies where to send coins (shielded z-address, unified address, transparent t-address). Not: a street address, or 'to address' (speak to, deal with). | 1,140 | adres ×1052, address ×322 | adres |  |  |
| 5 | privacy | privacy | Keeping your financial information hidden from others; the core value of Zcash. | 844 | gizlilik ×472, privacy ×87 | gizlilik |  |  |
| 6 | pool | pool | A bucket of coins sharing one privacy technology (the shielded Orchard pool, the transparent pool); also a mining pool. Suggestion: keep English. | 732 | havuz ×634, pool ×204 | havuz |  |  |
| 7 | block | block | A batch of transactions added to the blockchain; block height is its position in the chain. Not: 'to block' (prevent, stop). | 657 | block (English) ×130, blocks (English) ×6 | Engelleme |  |  |
| 8 | payment | payment | Sending coins to pay someone. | 607 | ödeme ×765, payment ×100 | ödeme |  |  |
| 9 | node | node | A computer running Zcash software that stores and checks the blockchain. Forms: It is NOT a loanword: use the translated term in compounds and plurals too. | 600 | düğüm ×185, node (English) ×107, node (rejected) ×107, nodes (English) ×38, nodes (rejected) ×38 | düğüm |  |  |
| 10 | proof | proof | Cryptographic proof: mathematical evidence that a statement is true (for example that a transaction is valid) without showing the data. Not: proof as general evidence in a non-cryptographic sense. Suggestion: keep English. | 569 | kanıt ×656, ispat ×151, proof ×102 | kanıt |  |  |
| 11 | chain | chain | Short for blockchain. | 476 | chain (English) ×71, chains (English) ×1 | Zincir |  |  |
| 12 | transparent | transparent | The public, Bitcoin-like part of Zcash where addresses and amounts are visible to everyone. | 455 | şeffaf ×362, transparent ×158 | şeffaf |  |  |
| 13 | note | note | In Zcash, a shielded unit of value (like a private coin) held by a shielded address. Not: a written note or remark, and 'to note' (to notice); translate those normally. | 411 | note ×168, not ×540 | note |  |  |
| 14 | encryption | encryption | Scrambling data so only holders of the right key can read it; 'encrypted' describes such data. | 309 | encrypted (English) ×78, encryption (English) ×19, encrypt (English) ×17 | Şifreleme |  |  |
| 15 | blockchain | blockchain | The shared public record of all transactions, built from linked blocks. Suggestion: keep English. | 296 | blockchain ×78, blok zinciri ×50 | blockchain |  |  |
| 16 | exchange | exchange | A business or service where people buy, sell or trade cryptocurrencies (a crypto exchange). Not: the verb 'to exchange' (to swap one thing for another). Suggestion: keep English. | 281 | borsa ×248, exchange ×38 | borsa |  |  |
| 17 | signature | signature | Cryptographic proof that the holder of a key approved a transaction or message. Not: a handwritten signature. | 213 | imza ×375, signature ×47 | imza |  |  |
| 18 | custodial | custodial | Who holds the keys: custodial means a company holds your coins for you; non-custodial or self-custody means you hold them. | 212 | saklama ×152, custodial ×20 | saklama |  |  |
| 19 | memo | memo | A short private message attached to a shielded transaction. | 208 | memo ×187 | memo |  |  |
| 20 | mining | mining | Using computers to add new blocks to the blockchain and earn newly created coins. Not: 'determining' and other words that merely contain the letters. | 208 | madencilik ×85, mining ×69 | madencilik |  |  |
| 21 | commitment | commitment | A cryptographic value that binds to hidden data (e.g. a note commitment) without revealing it. Not: a promise or pledge. Suggestion: keep English. | 202 | commitment (English) ×75, commitments (English) ×27 | Nişanlanma |  |  |
| 22 | fee | fee | The small amount paid to the network to process a transaction. | 199 | ücret ×276, fee ×29 | ücret |  |  |
| 23 | zero-knowledge | zero-knowledge | Cryptography that proves something is true without revealing the underlying information. Suggestion: keep English. | 197 | sıfır bilgi ×131, zero-knowledge ×37 | sıfır bilgi |  |  |
| 24 | grant | grant | Money awarded to fund a project or contributor (e.g. Zcash Community Grants). Not: 'to grant' (to allow, give). | 191 | grant ×117, hibe ×81 | grant |  |  |
| 25 | tools | tools | Software or services that help do something (privacy tools, developer tools). | 184 | araçlar ×113, tools ×31 | araçlar |  |  |
| 26 | viewing-key | viewing key | A key that lets someone see, but not spend, the transactions of a wallet. Capitalised 'Viewing Key' is already a protected name. Suggestion: keep English. | 179 | viewing key ×172, görüntüleme anahtar ×130 | viewing key |  |  |
| 27 | swap | swap | Exchanging one cryptocurrency directly for another. Suggestion: keep English. | 178 | swap ×141 | swap |  |  |
| 28 | token | token | A digital asset created on a blockchain, other than the chain's own coin. Suggestion: keep English. | 173 | token (English) ×116, tokens (English) ×3 | Token |  |  |
| 29 | consensus | consensus | The rules and process by which nodes agree on the state of the blockchain. | 159 | consensus ×26, uzlaşma ×18 | consensus |  |  |
| 30 | staking | staking | Locking coins to help secure a proof-of-stake network and earn rewards; 'stake' is the amount locked. Not: a wooden stake, or a stake in a bet; never translate as a tree, post or field. | 139 | staking ×53 | staking |  |  |
| 31 | decentralized | decentralized | Run by many independent participants rather than one company or server. | 136 | merkeziyetsiz ×134, decentralized ×2 | merkeziyetsiz |  |  |
| 32 | network-upgrade | network upgrade | A scheduled change to Zcash's rules that all nodes adopt at a set block height (NU5, NU6 and so on). | 128 | ağ yükseltmesi ×65, network upgrade ×16 | ağ yükseltmesi |  |  |
| 33 | developer | developer | A person who writes software, here usually for Zcash or a Zcash wallet. Not: development (the activity), which is usually translated. | 126 | geliştirici ×122, developer ×16 | geliştirici |  |  |
| 34 | full-node | full node | A node that downloads and verifies the entire blockchain. Suggestion: keep English. | 120 | full node (English) ×14, full nodes (English) ×3 | Full node |  |  |
| 35 | on-chain | on-chain | Recorded on the blockchain itself; off-chain means outside it. Suggestion: keep English. | 119 | zincir üstü ×28, on-chain ×26 | zincir üstü |  |  |
| 36 | governance | governance | How decisions about Zcash (funding, upgrades) are made and by whom. | 103 | yönetişim ×86, governance ×14 | yönetişim |  |  |
| 37 | turnstile | turnstile | Zcash mechanism that checks the total coins leaving a pool never exceed what entered it. Suggestion: keep English. | 97 | turnstile ×37 | turnstile |  |  |
| 38 | spending-key | spending key | The secret key that authorises spending coins; whoever has it controls the funds. Suggestion: keep English. | 94 | harcama anahtar ×91, spending key ×9 | harcama anahtarı |  |  |
| 39 | miner | miner | A person or machine that does mining. | 92 | madenci ×205, miner ×34 | madenci |  |  |
| 40 | nullifier | nullifier | A unique value published when a shielded note is spent, so the same note cannot be spent twice, without revealing which note it was. Suggestion: keep English. | 88 | nullifier ×89 | nullifier |  |  |
| 41 | hardware-wallet | hardware wallet | A small device that stores keys offline and signs transactions (e.g. Ledger, Keystone). Suggestion: keep English. | 76 | donanım cüzdan ×82, hardware wallet ×4 | donanım cüzdanı |  |  |
| 42 | bridge | bridge | A service that moves assets between two different blockchains. Not: a physical bridge. | 68 | köprü ×54, bridge ×35 | köprü |  |  |
| 43 | halving | halving | The scheduled event that cuts the block reward in half, about every four years. | 61 | halving (English) ×13 | Yarılanma |  |  |
| 44 | finalizer | finalizer | A participant in Zcash's proof-of-stake layer that votes to make blocks final; stakers delegate to a finalizer. Not: anything to do with a final match or contest. Suggestion: keep English. | 58 | finalizer ×18 | finalizer |  |  |
| 45 | newsletter | newsletter | A regular email or post that collects ZecHub and Zcash news. | 50 | bülten ×37, newsletter ×23 | bülten |  |  |
| 46 | trusted-setup | trusted setup | A one-time ceremony that generates public parameters for a proof system; its secret must be destroyed. | 50 | güvenilir kurulum ×40, trusted setup ×23 | trusted setup |  |  |
| 47 | bond | bond | Stake locked and delegated to a finalizer for a period; unbonding releases it. Not: a financial bond (debt security) or a personal bond. | 46 | tahvil ×34, bond ×10 | bond |  |  |
| 48 | scaling | scaling | Increasing how many transactions a network can handle. Not: shrinking or resizing. | 46 | scaling (English) ×3, scalability (English) ×1 | Küçültme |  |  |
| 49 | faucet | faucet | A website that gives away tiny amounts of (often test) coins for free. Suggestion: keep English. | 43 | faucet ×34 | faucet |  |  |
| 50 | seed-phrase | seed phrase | A list of 12 to 24 words that backs up and restores a wallet. | 41 | seed phrase ×17, tohum ifade ×12 | seed phrase |  |  |
| 51 | dashboard | dashboard | A page that shows live figures and charts at a glance. | 41 | dashboard ×7 | dashboard |  |  |
| 52 | cross-chain | cross-chain | Working across two or more different blockchains. Suggestion: keep English. | 39 | zincirler arası ×55, cross-chain ×2 | zincirler arası |  |  |
| 53 | use-case | use case | A concrete way people use Zcash (payments, donations, records). | 31 | kullanım alanı ×9, use case ×1 | kullanım alanı |  |  |
| 54 | smart-contract | smart contract | A program stored on a blockchain that runs automatically when its conditions are met. Suggestion: keep English. | 25 | akıllı sözleşme ×25 | akıllı sözleşme |  |  |
| 55 | light-client | light client | Wallet software that does not download the full blockchain but asks a server for the data it needs. Suggestion: keep English. | 24 | hafif istemci ×31, light client ×4 | hafif istemci |  |  |
| 56 | selective-disclosure | selective disclosure | Showing chosen transaction details to a chosen party (e.g. with a viewing key) while keeping the rest private. | 19 | seçici açıklama ×15, selective disclosure ×1 | seçici açıklama |  |  |
| 57 | treasury | treasury | Money held by a community or organisation to fund shared work. | 18 | hazine ×18, treasury ×4 | hazine |  |  |
| 58 | top-up | top up | Adding credit to a prepaid phone or account, paid with ZEC. | 14 | yükleme ×53, top up ×2 | yükleme |  |  |
| 59 | permissionless | permissionless | Open to anyone without asking for approval. | 13 | izinsiz ×12 | izin gerektirmeyen |  |  |
| 60 | unlinkable | unlinkable | Impossible to connect to each other: an observer cannot tell that two items belong to the same person. Not: 'disconnected' or 'detachable'; the meaning is 'cannot be linked'. | 12 | bağlantılandırılamaz ×13 | bağlantılandırılamaz |  |  |
| 61 | brand | brand | ZecHub or Zcash brand material: logos, colours, visual identity. Not: trademark (a legal term). | 4 | marka ×26 | marka |  |  |
| 62 | visualizer | visualizer | A tool that draws Zcash network or address data as pictures. Not: visualizing / visualization (the activity), which is usually translated. | 1 | visualizer ×1, görselleştirici ×5 | visualizer |  |  |

## General style questions
(`style`: 8 questions)

| # | ID | Question | Current | ✅ Answer | Notes |
|---|---|---|---|---|---|
| A | register | How to address the reader (formal or informal 'you'), and does it differ between tutorials and technical pages? |  |  |  |
| B | english_in_brackets | When an English term is kept, add the English in brackets: never / first-use / always? |  |  |  |
| C | loanwords | Crypto loanwords (blockchain, token, smart contract): keep English / translate? |  |  |  |
| D | capitalise_kept_english_at_sentence_start | Capitalise a kept English term at the start of a sentence (yes / no)? |  |  |  |
| E | numerals | Digits: western (0-9) only, or native digits allowed? |  |  |  |
| F | decimal_separator | Decimal separator (0.5 or 0,5)? |  |  |  |
| G | quotes | Quotation marks? |  |  |  |
| H | abbreviations_with_full_stop | Abbreviations written with a full stop that do not end a sentence? | bkz, Dr, ör, örn, Prof, vb, vs, yy |  |  |
