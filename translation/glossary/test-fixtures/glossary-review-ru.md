# ZecHub glossary review: Russian (`ru`)

Glossary version 2. Kit: pages.

**Как заполнять**
- **Столбец ✅:** напишите `OK`, если указанный перевод верен, `keep English`, чтобы оставить английское слово, или ваш вариант перевода. Один вариант в ячейке. Оставьте ячейку пустой, если не уверены. Не изменяйте столбец ID.
- **Столбец Notes (важно):** для каждой строки, которую вы меняете или помечаете `keep English`, своими словами коротко объясните причину, например «так говорят на местных биржах и в кошельках» или «это слово означает почтовый адрес». Пишите в Notes и тогда, когда правильное слово зависит от контекста (глагол или существительное, меню или страница), или если строка непонятна. Изменения без пояснения могут быть не приняты.

**How to fill in**

- **✅ column:** write `OK` if the shown rendering is right, `keep English` to keep the English word, or the rendering you would use. One rendering per cell. Leave it empty if you are not sure. Do not edit the ID column.
- **Notes column (important):** for every row you change or mark `keep English`, write one short line in your own words saying why, for example "this is what local exchanges and wallets use" or "this word means a street address". Also use Notes when the right word depends on the context (verb or noun, menu or page), or when a row is unclear. Changes without a note may not be accepted.

Names that stay in English in every language (brands, products, programmes) are not in these tables; they are listed in `translation/protected-terms.json`.

## Conflicts to decide first

No conflicts.

## Terms in wiki pages
(`terms`: 62 rows)

| # | ID | English | Meaning | Occurrences | Seen today in `ru` pages | Proposed | ✅ Confirmed | Notes |
|---|---|---|---|---:|---|---|---|---|
| 1 | wallet | wallet | App or device that holds the keys to your coins and lets you send and receive them. | 1,694 | wallet (English) ×240, wallets (English) ×53 |  |  |  |
| 2 | shielded | shielded | Protected by Zcash's zero-knowledge encryption: a shielded address, transaction or pool hides sender, receiver and amount. Not: encrypted (generic). Translate 'encrypted' normally. | 1,433 | shielded (English) ×456, unshielded (English) ×2 |  |  |  |
| 3 | transaction | transaction | A transfer of coins recorded on the blockchain. | 1,281 | transactions (English) ×45, transaction (English) ×41 |  |  |  |
| 4 | address | address | A string that identifies where to send coins (shielded z-address, unified address, transparent t-address). Not: a street address, or 'to address' (speak to, deal with). | 1,140 | address (English) ×162, addresses (English) ×57 |  |  |  |
| 5 | privacy | privacy | Keeping your financial information hidden from others; the core value of Zcash. | 844 | privacy (English) ×92 |  |  |  |
| 6 | pool | pool | A bucket of coins sharing one privacy technology (the shielded Orchard pool, the transparent pool); also a mining pool. Suggestion: keep English. | 732 | pool (English) ×47, pools (English) ×42 |  |  |  |
| 7 | block | block | A batch of transactions added to the blockchain; block height is its position in the chain. Not: 'to block' (prevent, stop). | 657 | block (English) ×112, blocks (English) ×7 |  |  |  |
| 8 | payment | payment | Sending coins to pay someone. | 607 | payment (English) ×55, payments (English) ×8 |  |  |  |
| 9 | node | node | A computer running Zcash software that stores and checks the blockchain. Forms: It is NOT a loanword: use the translated term in compounds and plurals too. | 600 | узел ×178, node (English) ×65, node (rejected) ×65, узлы ×59, nodes (English) ×33, nodes (rejected) ×33 | узел |  |  |
| 10 | proof | proof | Cryptographic proof: mathematical evidence that a statement is true (for example that a transaction is valid) without showing the data. Not: proof as general evidence in a non-cryptographic sense. Suggestion: keep English. | 569 | proof (English) ×75, proofs (English) ×15 |  |  |  |
| 11 | chain | chain | Short for blockchain. | 476 | chain (English) ×56, chains (English) ×1 |  |  |  |
| 12 | transparent | transparent | The public, Bitcoin-like part of Zcash where addresses and amounts are visible to everyone. | 455 | transparent (English) ×101 |  |  |  |
| 13 | note | note | In Zcash, a shielded unit of value (like a private coin) held by a shielded address. Not: a written note or remark, and 'to note' (to notice); translate those normally. | 411 | note (English) ×131, notes (English) ×27 |  |  |  |
| 14 | encryption | encryption | Scrambling data so only holders of the right key can read it; 'encrypted' describes such data. | 309 | encrypted (English) ×78, encrypt (English) ×16, encryption (English) ×13 | шифрование |  |  |
| 15 | blockchain | blockchain | The shared public record of all transactions, built from linked blocks. Suggestion: keep English. | 296 | blockchain (English) ×16 |  |  |  |
| 16 | exchange | exchange | A business or service where people buy, sell or trade cryptocurrencies (a crypto exchange). Not: the verb 'to exchange' (to swap one thing for another). Suggestion: keep English. | 281 | exchanges (English) ×15, exchange (English) ×11 | обменный пункт |  |  |
| 17 | signature | signature | Cryptographic proof that the holder of a key approved a transaction or message. Not: a handwritten signature. | 213 | signature (English) ×35, signatures (English) ×8 |  |  |  |
| 18 | custodial | custodial | Who holds the keys: custodial means a company holds your coins for you; non-custodial or self-custody means you hold them. | 212 | custodial (English) ×12, custody (English) ×7, non-custodial (English) ×5, self-custody (English) ×2 |  |  |  |
| 19 | memo | memo | A short private message attached to a shielded transaction. | 208 | memo (English) ×76, memos (English) ×15 |  |  |  |
| 20 | mining | mining | Using computers to add new blocks to the blockchain and earn newly created coins. Not: 'determining' and other words that merely contain the letters. | 208 | mining (English) ×37, mined (English) ×1 |  |  |  |
| 21 | commitment | commitment | A cryptographic value that binds to hidden data (e.g. a note commitment) without revealing it. Not: a promise or pledge. Suggestion: keep English. | 202 | commitment (English) ×59, commitments (English) ×43 |  |  |  |
| 22 | fee | fee | The small amount paid to the network to process a transaction. | 199 | fee (English) ×18, fees (English) ×2 |  |  |  |
| 23 | zero-knowledge | zero-knowledge | Cryptography that proves something is true without revealing the underlying information. Suggestion: keep English. | 197 | zero-knowledge (English) ×33, zero knowledge (English) ×18 |  |  |  |
| 24 | grant | grant | Money awarded to fund a project or contributor (e.g. Zcash Community Grants). Not: 'to grant' (to allow, give). | 191 | grants (English) ×66, grant (English) ×15 |  |  |  |
| 25 | tools | tools | Software or services that help do something (privacy tools, developer tools). | 184 | tools (English) ×25, tool (English) ×6 |  |  |  |
| 26 | viewing-key | viewing key | A key that lets someone see, but not spend, the transactions of a wallet. Capitalised 'Viewing Key' is already a protected name. Suggestion: keep English. | 179 | viewing key (English) ×97, viewing keys (English) ×18, view key (English) ×1 | Viewing Key |  |  |
| 27 | swap | swap | Exchanging one cryptocurrency directly for another. Suggestion: keep English. | 178 | swap (English) ×15, swaps (English) ×3 |  |  |  |
| 28 | token | token | A digital asset created on a blockchain, other than the chain's own coin. Suggestion: keep English. | 173 | token (English) ×13, tokens (English) ×1 |  |  |  |
| 29 | consensus | consensus | The rules and process by which nodes agree on the state of the blockchain. | 159 | consensus (English) ×15 | консенсус |  |  |
| 30 | staking | staking | Locking coins to help secure a proof-of-stake network and earn rewards; 'stake' is the amount locked. Not: a wooden stake, or a stake in a bet; never translate as a tree, post or field. | 139 | stake (English) ×24, staking (English) ×9, staked (English) ×3 |  |  |  |
| 31 | decentralized | decentralized | Run by many independent participants rather than one company or server. | 136 | decentralized (English) ×1 |  |  |  |
| 32 | network-upgrade | network upgrade | A scheduled change to Zcash's rules that all nodes adopt at a set block height (NU5, NU6 and so on). | 128 | network upgrade (English) ×15, network upgrades (English) ×1 | обновление сети |  |  |
| 33 | developer | developer | A person who writes software, here usually for Zcash or a Zcash wallet. Not: development (the activity), which is usually translated. | 126 | developers (English) ×8, developer (English) ×4 | застройщик |  |  |
| 34 | full-node | full node | A node that downloads and verifies the entire blockchain. Suggestion: keep English. | 120 | full node (English) ×5 |  |  |  |
| 35 | on-chain | on-chain | Recorded on the blockchain itself; off-chain means outside it. Suggestion: keep English. | 119 | on-chain (English) ×11, off-chain (English) ×5, onchain (English) ×3 |  |  |  |
| 36 | governance | governance | How decisions about Zcash (funding, upgrades) are made and by whom. | 103 | governance (English) ×17 |  |  |  |
| 37 | turnstile | turnstile | Zcash mechanism that checks the total coins leaving a pool never exceed what entered it. Suggestion: keep English. | 97 | turnstile (English) ×27 |  |  |  |
| 38 | spending-key | spending key | The secret key that authorises spending coins; whoever has it controls the funds. Suggestion: keep English. | 94 | spending key (English) ×9, spending keys (English) ×1 |  |  |  |
| 39 | miner | miner | A person or machine that does mining. | 92 | miner (English) ×3 | майнер |  |  |
| 40 | nullifier | nullifier | A unique value published when a shielded note is spent, so the same note cannot be spent twice, without revealing which note it was. Suggestion: keep English. | 88 | nullifier (English) ×60, nullifiers (English) ×3 |  |  |  |
| 41 | hardware-wallet | hardware wallet | A small device that stores keys offline and signs transactions (e.g. Ledger, Keystone). Suggestion: keep English. | 76 | hardware wallet (English) ×3 |  |  |  |
| 42 | bridge | bridge | A service that moves assets between two different blockchains. Not: a physical bridge. | 68 | bridge (English) ×14 |  |  |  |
| 43 | halving | halving | The scheduled event that cuts the block reward in half, about every four years. | 61 | halving (English) ×5 |  |  |  |
| 44 | finalizer | finalizer | A participant in Zcash's proof-of-stake layer that votes to make blocks final; stakers delegate to a finalizer. Not: anything to do with a final match or contest. Suggestion: keep English. | 58 | finalizer (English) ×2, finalizers (English) ×1 |  |  |  |
| 45 | newsletter | newsletter | A regular email or post that collects ZecHub and Zcash news. | 50 | newsletter (English) ×12 |  |  |  |
| 46 | trusted-setup | trusted setup | A one-time ceremony that generates public parameters for a proof system; its secret must be destroyed. | 50 | trusted setup (English) ×25 |  |  |  |
| 47 | bond | bond | Stake locked and delegated to a finalizer for a period; unbonding releases it. Not: a financial bond (debt security) or a personal bond. | 46 | bond (English) ×4, bonds (English) ×2 |  |  |  |
| 48 | scaling | scaling | Increasing how many transactions a network can handle. Not: shrinking or resizing. | 46 | scaling (English) ×2, scalability (English) ×1 |  |  |  |
| 49 | faucet | faucet | A website that gives away tiny amounts of (often test) coins for free. Suggestion: keep English. | 43 | faucet (English) ×6, faucets (English) ×1 |  |  |  |
| 50 | seed-phrase | seed phrase | A list of 12 to 24 words that backs up and restores a wallet. | 41 | seed phrase (English) ×3 |  |  |  |
| 51 | dashboard | dashboard | A page that shows live figures and charts at a glance. | 41 | dashboard (English) ×6 |  |  |  |
| 52 | cross-chain | cross-chain | Working across two or more different blockchains. Suggestion: keep English. | 39 | cross-chain (English) ×1 |  |  |  |
| 53 | use-case | use case | A concrete way people use Zcash (payments, donations, records). | 31 | use cases (English) ×1 |  |  |  |
| 54 | smart-contract | smart contract | A program stored on a blockchain that runs automatically when its conditions are met. Suggestion: keep English. | 25 | smart contracts (English) ×1 |  |  |  |
| 55 | light-client | light client | Wallet software that does not download the full blockchain but asks a server for the data it needs. Suggestion: keep English. | 24 | light client (English) ×1 |  |  |  |
| 56 | selective-disclosure | selective disclosure | Showing chosen transaction details to a chosen party (e.g. with a viewing key) while keeping the rest private. | 19 |  |  |  |  |
| 57 | treasury | treasury | Money held by a community or organisation to fund shared work. | 18 | treasury (English) ×2 |  |  |  |
| 58 | top-up | top up | Adding credit to a prepaid phone or account, paid with ZEC. | 14 | top ups (English) ×1, top-ups (English) ×1 |  |  |  |
| 59 | permissionless | permissionless | Open to anyone without asking for approval. | 13 | permissionless (English) ×1 |  |  |  |
| 60 | unlinkable | unlinkable | Impossible to connect to each other: an observer cannot tell that two items belong to the same person. Not: 'disconnected' or 'detachable'; the meaning is 'cannot be linked'. | 12 |  |  |  |  |
| 61 | brand | brand | ZecHub or Zcash brand material: logos, colours, visual identity. Not: trademark (a legal term). | 4 |  |  |  |  |
| 62 | visualizer | visualizer | A tool that draws Zcash network or address data as pictures. Not: visualizing / visualization (the activity), which is usually translated. | 1 | visualizer (English) ×1 | визуализация |  |  |

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
| H | abbreviations_with_full_stop | Abbreviations written with a full stop that do not end a sentence? | авг, апр, г, гг, д, дек, др, е, млн, млрд, нояб, окт, п, пр, рис, сент, см, стр, т, табл, тыс, февр, янв |  |  |
