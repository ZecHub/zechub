# ZecHub glossary review: Russian (`ru`)

Glossary version 2. Kit: pages.

**Как заполнять**
- **Столбец ✅:** напишите `OK`, если указанный перевод верен, `keep English`, чтобы оставить английское слово, или ваш вариант перевода. Один вариант в ячейке. Оставьте ячейку пустой, если не уверены. Не изменяйте столбец ID.
- **Столбец Notes (важно):** для каждой строки, которую вы меняете или помечаете `keep English`, своими словами коротко объясните причину, например «так говорят на местных биржах и в кошельках» или «это слово означает почтовый адрес». Пишите в Notes и тогда, когда правильное слово зависит от контекста (глагол или существительное, меню или страница), или если строка непонятна. Изменения без пояснения могут быть не приняты.

**How to fill in**

- **✅ column:** write `OK` if the shown rendering is right, `keep English` to keep the English word, or the rendering you would use. One rendering per cell. Leave it empty if you are not sure. Do not edit the ID column.
- **Notes column (important):** for every row you change or mark `keep English`, write one short line in your own words saying why, for example "this is what local exchanges and wallets use" or "this word means a street address". Also use Notes when the right word depends on the context (verb or noun, menu or page), or when a row is unclear. Changes without a note may not be accepted.

**Proposed column:** for rows the glossary had no proposal for, it now shows the word our `ru` pages use today, and "Seen today" shows the counts behind it. Please check whether it is right.

Names that stay in English in every language (brands, products, programmes) are not in these tables; they are listed in `translation/protected-terms.json`.

## Conflicts to decide first

No conflicts.

## Terms in wiki pages
(`terms`: 62 rows)

| # | ID | English | Meaning | Occurrences | Seen today in `ru` pages | Proposed | ✅ Confirmed | Notes |
|---|---|---|---|---:|---|---|---|---|
| 1 | wallet | wallet | App or device that holds the keys to your coins and lets you send and receive them. | 1,694 | кошелёк ×462, wallet ×274 | кошелёк |  |  |
| 2 | shielded | shielded | Protected by Zcash's zero-knowledge encryption: a shielded address, transaction or pool hides sender, receiver and amount. Not: encrypted (generic). Translate 'encrypted' normally. | 1,433 | экранирован ×672, shielded ×457 | экранированный |  |  |
| 3 | transaction | transaction | A transfer of coins recorded on the blockchain. | 1,281 | транзакц ×1278, transaction ×44 | транзакция |  |  |
| 4 | address | address | A string that identifies where to send coins (shielded z-address, unified address, transparent t-address). Not: a street address, or 'to address' (speak to, deal with). | 1,140 | адрес ×1056, address ×162 | адрес |  |  |
| 5 | privacy | privacy | Keeping your financial information hidden from others; the core value of Zcash. | 844 | приватност ×471, privacy ×67 | приватность |  |  |
| 6 | pool | pool | A bucket of coins sharing one privacy technology (the shielded Orchard pool, the transparent pool); also a mining pool. Suggestion: keep English. | 732 | пул ×726, pool ×48 | пул |  |  |
| 7 | block | block | A batch of transactions added to the blockchain; block height is its position in the chain. Not: 'to block' (prevent, stop). | 657 | блок ×987, block ×123 | блок |  |  |
| 8 | payment | payment | Sending coins to pay someone. | 607 | платёж ×212, payment ×63 | платёж |  |  |
| 9 | node | node | A computer running Zcash software that stores and checks the blockchain. Forms: It is NOT a loanword: use the translated term in compounds and plurals too. | 600 | узел ×178, node (English) ×65, node (rejected) ×65, узлы ×59, nodes (English) ×33, nodes (rejected) ×33 | узел |  |  |
| 10 | proof | proof | Cryptographic proof: mathematical evidence that a statement is true (for example that a transaction is valid) without showing the data. Not: proof as general evidence in a non-cryptographic sense. Suggestion: keep English. | 569 | доказательств ×585, proof ×78 | доказательство |  |  |
| 11 | chain | chain | Short for blockchain. | 476 | цепочк ×261, chain ×60 | цепочка |  |  |
| 12 | transparent | transparent | The public, Bitcoin-like part of Zcash where addresses and amounts are visible to everyone. | 455 | прозрачн ×431, transparent ×92 | прозрачный |  |  |
| 13 | note | note | In Zcash, a shielded unit of value (like a private coin) held by a shielded address. Not: a written note or remark, and 'to note' (to notice); translate those normally. | 411 | note ×131, заметк ×75 | note |  |  |
| 14 | encryption | encryption | Scrambling data so only holders of the right key can read it; 'encrypted' describes such data. | 309 | encrypted (English) ×78, encrypt (English) ×16, encryption (English) ×13 | шифрование |  |  |
| 15 | blockchain | blockchain | The shared public record of all transactions, built from linked blocks. Suggestion: keep English. | 296 | блокчейн ×376, blockchain ×15 | блокчейн |  |  |
| 16 | exchange | exchange | A business or service where people buy, sell or trade cryptocurrencies (a crypto exchange). Not: the verb 'to exchange' (to swap one thing for another). Suggestion: keep English. | 281 | exchanges (English) ×15, exchange (English) ×11 | обменный пункт |  |  |
| 17 | signature | signature | Cryptographic proof that the holder of a key approved a transaction or message. Not: a handwritten signature. | 213 | подпис ×474, signature ×35 | подпись |  |  |
| 18 | custodial | custodial | Who holds the keys: custodial means a company holds your coins for you; non-custodial or self-custody means you hold them. | 212 | кастодиальн ×66, custodial ×16 | кастодиальный |  |  |
| 19 | memo | memo | A short private message attached to a shielded transaction. | 208 | memo ×69 | memo |  |  |
| 20 | mining | mining | Using computers to add new blocks to the blockchain and earn newly created coins. Not: 'determining' and other words that merely contain the letters. | 208 | майнинг ×104, mining ×55 | майнинг |  |  |
| 21 | commitment | commitment | A cryptographic value that binds to hidden data (e.g. a note commitment) without revealing it. Not: a promise or pledge. Suggestion: keep English. | 202 | коммитмент ×67, commitment ×59 | коммитмент |  |  |
| 22 | fee | fee | The small amount paid to the network to process a transaction. | 199 | комисси ×198, fee ×16 | комиссия |  |  |
| 23 | zero-knowledge | zero-knowledge | Cryptography that proves something is true without revealing the underlying information. Suggestion: keep English. | 197 | zero-knowledge ×34 | zero-knowledge |  |  |
| 24 | grant | grant | Money awarded to fund a project or contributor (e.g. Zcash Community Grants). Not: 'to grant' (to allow, give). | 191 | грант ×96, grant ×14 | грант |  |  |
| 25 | tools | tools | Software or services that help do something (privacy tools, developer tools). | 184 | инструмент ×202, tools ×12 | инструменты |  |  |
| 26 | viewing-key | viewing key | A key that lets someone see, but not spend, the transactions of a wallet. Capitalised 'Viewing Key' is already a protected name. Suggestion: keep English. | 179 | viewing key (English) ×97, viewing keys (English) ×18, view key (English) ×1 | Viewing Key |  |  |
| 27 | swap | swap | Exchanging one cryptocurrency directly for another. Suggestion: keep English. | 178 | своп ×26, swap ×23 | своп |  |  |
| 28 | token | token | A digital asset created on a blockchain, other than the chain's own coin. Suggestion: keep English. | 173 | токен ×156, token ×14 | токен |  |  |
| 29 | consensus | consensus | The rules and process by which nodes agree on the state of the blockchain. | 159 | consensus (English) ×15 | консенсус |  |  |
| 30 | staking | staking | Locking coins to help secure a proof-of-stake network and earn rewards; 'stake' is the amount locked. Not: a wooden stake, or a stake in a bet; never translate as a tree, post or field. | 139 | стейкинг ×70, staking ×3 | стейкинг |  |  |
| 31 | decentralized | decentralized | Run by many independent participants rather than one company or server. | 136 | децентрализ ×137, decentralized ×1 | децентрализованный |  |  |
| 32 | network-upgrade | network upgrade | A scheduled change to Zcash's rules that all nodes adopt at a set block height (NU5, NU6 and so on). | 128 | network upgrade (English) ×15, network upgrades (English) ×1 | обновление сети |  |  |
| 33 | developer | developer | A person who writes software, here usually for Zcash or a Zcash wallet. Not: development (the activity), which is usually translated. | 126 | developers (English) ×8, developer (English) ×4 | застройщик |  |  |
| 34 | full-node | full node | A node that downloads and verifies the entire blockchain. Suggestion: keep English. | 120 | полный узел ×129, узел ×192 | полный узел |  |  |
| 35 | on-chain | on-chain | Recorded on the blockchain itself; off-chain means outside it. Suggestion: keep English. | 119 | ончейн ×27, on-chain ×12 | ончейн |  |  |
| 36 | governance | governance | How decisions about Zcash (funding, upgrades) are made and by whom. | 103 | управлен ×159, governance ×16 | управление |  |  |
| 37 | turnstile | turnstile | Zcash mechanism that checks the total coins leaving a pool never exceed what entered it. Suggestion: keep English. | 97 | турникет ×122, turnstile ×31 | турникет |  |  |
| 38 | spending-key | spending key | The secret key that authorises spending coins; whoever has it controls the funds. Suggestion: keep English. | 94 | spending key ×9 | spending key |  |  |
| 39 | miner | miner | A person or machine that does mining. | 92 | miner (English) ×3 | майнер |  |  |
| 40 | nullifier | nullifier | A unique value published when a shielded note is spent, so the same note cannot be spent twice, without revealing which note it was. Suggestion: keep English. | 88 | nullifier ×61 | nullifier |  |  |
| 41 | hardware-wallet | hardware wallet | A small device that stores keys offline and signs transactions (e.g. Ledger, Keystone). Suggestion: keep English. | 76 | аппаратн ×141, hardware wallet ×3 | аппаратный кошелёк |  |  |
| 42 | bridge | bridge | A service that moves assets between two different blockchains. Not: a physical bridge. | 68 | мост ×45, bridge ×15 | мост |  |  |
| 43 | halving | halving | The scheduled event that cuts the block reward in half, about every four years. | 61 | халвинг ×51, halving ×5 | халвинг |  |  |
| 44 | finalizer | finalizer | A participant in Zcash's proof-of-stake layer that votes to make blocks final; stakers delegate to a finalizer. Not: anything to do with a final match or contest. Suggestion: keep English. | 58 | финализатор ×55 | финализатор |  |  |
| 45 | newsletter | newsletter | A regular email or post that collects ZecHub and Zcash news. | 50 | дайджест ×9, newsletter ×9 | дайджест |  |  |
| 46 | trusted-setup | trusted setup | A one-time ceremony that generates public parameters for a proof system; its secret must be destroyed. | 50 | trusted setup ×25, доверенн ×67 | trusted setup |  |  |
| 47 | bond | bond | Stake locked and delegated to a finalizer for a period; unbonding releases it. Not: a financial bond (debt security) or a personal bond. | 46 | bond ×4 | bond |  |  |
| 48 | scaling | scaling | Increasing how many transactions a network can handle. Not: shrinking or resizing. | 46 | масштабир ×59, scaling ×3 | масштабирование |  |  |
| 49 | faucet | faucet | A website that gives away tiny amounts of (often test) coins for free. Suggestion: keep English. | 43 | faucet ×6, кран ×39 (mostly not this sense) | faucet |  |  |
| 50 | seed-phrase | seed phrase | A list of 12 to 24 words that backs up and restores a wallet. | 41 | сид-фраз ×22, seed phrase ×3 | сид-фраза |  |  |
| 51 | dashboard | dashboard | A page that shows live figures and charts at a glance. | 41 | панель ×31, dashboard ×6 | панель |  |  |
| 52 | cross-chain | cross-chain | Working across two or more different blockchains. Suggestion: keep English. | 39 | межсетев ×30, cross-chain ×1 | межсетевой |  |  |
| 53 | use-case | use case | A concrete way people use Zcash (payments, donations, records). | 31 | сценари ×31 | сценарий использования |  |  |
| 54 | smart-contract | smart contract | A program stored on a blockchain that runs automatically when its conditions are met. Suggestion: keep English. | 25 | смарт-контракт ×24 | смарт-контракт |  |  |
| 55 | light-client | light client | Wallet software that does not download the full blockchain but asks a server for the data it needs. Suggestion: keep English. | 24 | легк ×45, light client ×1 | лёгкий клиент |  |  |
| 56 | selective-disclosure | selective disclosure | Showing chosen transaction details to a chosen party (e.g. with a viewing key) while keeping the rest private. | 19 | раскрыти ×195, selective disclosure ×1 | выборочное раскрытие |  |  |
| 57 | treasury | treasury | Money held by a community or organisation to fund shared work. | 18 | казначейств ×9, treasury ×4 | казначейство |  |  |
| 58 | top-up | top up | Adding credit to a prepaid phone or account, paid with ZEC. | 14 | пополнен ×27 | пополнение |  |  |
| 59 | permissionless | permissionless | Open to anyone without asking for approval. | 13 | разрешени ×46, permissionless ×1 | без разрешения |  |  |
| 60 | unlinkable | unlinkable | Impossible to connect to each other: an observer cannot tell that two items belong to the same person. Not: 'disconnected' or 'detachable'; the meaning is 'cannot be linked'. | 12 | несвязываем ×7, несвязан ×4 | несвязываемый |  |  |
| 61 | brand | brand | ZecHub or Zcash brand material: logos, colours, visual identity. Not: trademark (a legal term). | 4 | бренд ×9 | бренд |  |  |
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
