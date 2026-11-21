# ZecHub glossary review: Ukrainian (`uk`)

Glossary version 2. Kit: pages.

**Як заповнювати**
- **Стовпець ✅:** напишіть `OK`, якщо вказаний переклад правильний, `keep English`, щоб залишити англійське слово, або ваш варіант перекладу. Один варіант у клітинці. Залиште клітинку порожньою, якщо не впевнені. Не змінюйте стовпець ID.
- **Стовпець Notes (важливо):** для кожного рядка, який ви змінюєте або позначаєте `keep English`, власними словами коротко поясніть причину, наприклад «так кажуть на місцевих біржах і в гаманцях» або «це слово означає поштову адресу». Пишіть у Notes і тоді, коли правильне слово залежить від контексту (дієслово чи іменник, меню чи сторінка), або якщо рядок незрозумілий. Зміни без пояснення можуть не прийняти.

**How to fill in**

- **✅ column:** write `OK` if the shown rendering is right, `keep English` to keep the English word, or the rendering you would use. One rendering per cell. Leave it empty if you are not sure. Do not edit the ID column.
- **Notes column (important):** for every row you change or mark `keep English`, write one short line in your own words saying why, for example "this is what local exchanges and wallets use" or "this word means a street address". Also use Notes when the right word depends on the context (verb or noun, menu or page), or when a row is unclear. Changes without a note may not be accepted.

**Proposed column:** for rows the glossary had no proposal for, it now shows the word our `uk` pages use today, and "Seen today" shows the counts behind it. Please check whether it is right.

Names that stay in English in every language (brands, products, programmes) are not in these tables; they are listed in `translation/protected-terms.json`.

**Draft refresh: 2026-11-21 — not a native review or approval.** Evidence is from content `0e11df443300c38abc727ffd0c0133d41d99cefd`. Existing row IDs, row numbers, proposals and reviewer answers are retained where present. New suggestions are provisional; English loanwords/placeholders are not recommendations to keep English permanently. Literal usage counts can include ordinary senses and do not cover every inflection. Please decide against the Meaning column, not frequency alone.

## Conflicts to decide first

No conflicts.

## Terms in wiki pages
(`terms`: 62 rows)

| # | ID | English | Meaning | Occurrences | Seen today in `uk` pages | Proposed | ✅ Confirmed | Notes |
|---|---|---|---|---:|---|---|---|---|
| 1 | wallet | wallet | App or device that holds the keys to your coins and lets you send and receive them. | 1,716 | Гаманець ×523, Гаманці ×294, wallet ×100, wallets ×10 | Гаманець |  |  |
| 2 | shielded | shielded | Protected by Zcash's zero-knowledge encryption: a shielded address, transaction or pool hides sender, receiver and amount. Not: encrypted (generic). Translate 'encrypted' normally. | 1,470 | shielded ×519, Захищена ×20 | shielded |  |  |
| 3 | transaction | transaction | A transfer of coins recorded on the blockchain. | 1,333 | Транзакції ×579, транзакція ×157, transactions ×32, transaction ×15 | транзакція |  |  |
| 4 | address | address | A string that identifies where to send coins (shielded z-address, unified address, transparent t-address). Not: a street address, or 'to address' (speak to, deal with). | 1,294 | address ×115, addresses ×56 | Поштова адреса |  |  |
| 5 | privacy | privacy | Keeping your financial information hidden from others; the core value of Zcash. | 790 | приватність ×308, privacy ×48 | приватність |  |  |
| 6 | pool | pool | A bucket of coins sharing one privacy technology (the shielded Orchard pool, the transparent pool); also a mining pool. Suggestion: keep English. | 784 | пул ×240, pool ×98, pools ×15 | пул |  |  |
| 7 | block | block | A batch of transactions added to the blockchain; block height is its position in the chain. Not: 'to block' (prevent, stop). | 808 | блок ×171, Блоки ×96, block ×21, blocks ×3 | блок |  |  |
| 8 | payment | payment | Sending coins to pay someone. | 687 | платіж ×145, payment ×20, payments ×1 | платіж |  |  |
| 9 | node | node | A computer running Zcash software that stores and checks the blockchain. Forms: It is NOT a loanword: use the translated term in compounds and plurals too. | 628 | вузол ×237, node ×15, nodes ×4 | вузол |  |  |
| 10 | proof | proof | Cryptographic proof: mathematical evidence that a statement is true (for example that a transaction is valid) without showing the data. Not: proof as general evidence in a non-cryptographic sense. Suggestion: keep English. | 586 | доказ ×165, proof ×77, proofs ×15 | доказ |  |  |
| 11 | chain | chain | Short for blockchain. | 535 | ланцюг ×63, chain ×27 | ланцюг |  |  |
| 12 | transparent | transparent | The public, Bitcoin-like part of Zcash where addresses and amounts are visible to everyone. | 507 | transparent ×77, прозорий ×51, Прозора ×24 | прозорий |  |  |
| 13 | note | note | In Zcash, a shielded unit of value (like a private coin) held by a shielded address. Not: a written note or remark, and 'to note' (to notice); translate those normally. | 474 | note ×86, notes ×9 | note |  |  |
| 14 | encryption | encryption | Scrambling data so only holders of the right key can read it; 'encrypted' describes such data. | 298 | шифрування ×75, encrypted ×66, encrypt ×13, encryption ×1 | шифрування |  |  |
| 15 | blockchain | blockchain | The shared public record of all transactions, built from linked blocks. Suggestion: keep English. | 290 | Блокчейн ×112, blockchain ×9 | Блокчейн |  |  |
| 16 | exchange | exchange | A business or service where people buy, sell or trade cryptocurrencies (a crypto exchange). Not: the verb 'to exchange' (to swap one thing for another). Suggestion: keep English. | 297 | Біржі ×127, біржа ×47, exchanges ×2, exchange ×1 | біржа |  |  |
| 17 | signature | signature | Cryptographic proof that the holder of a key approved a transaction or message. Not: a handwritten signature. | 197 | signature ×14, signatures ×5 | Автограф |  |  |
| 18 | custodial | custodial | Who holds the keys: custodial means a company holds your coins for you; non-custodial or self-custody means you hold them. | 208 | кастодіальний ×6, custody ×5, self-custody ×1 | кастодіальний |  |  |
| 19 | memo | memo | A short private message attached to a shielded transaction. | 225 | memo ×82, Примітки ×76, Мемо ×23, memos ×6 | memo |  |  |
| 20 | mining | mining | Using computers to add new blocks to the blockchain and earn newly created coins. Not: 'determining' and other words that merely contain the letters. | 192 | майнінг ×51, mining ×9 | майнінг |  |  |
| 21 | commitment | commitment | A cryptographic value that binds to hidden data (e.g. a note commitment) without revealing it. Not: a promise or pledge. Suggestion: keep English. | 200 | commitment ×66, commitments ×63 | Commitment |  |  |
| 22 | fee | fee | The small amount paid to the network to process a transaction. | 259 | Комісії ×94, комісія ×47, fee ×8, fees ×1 | комісія |  |  |
| 23 | zero-knowledge | zero-knowledge | Cryptography that proves something is true without revealing the underlying information. Suggestion: keep English. | 194 | zero-knowledge ×31, zero knowledge ×30, нульове розголошення ×5 | нульове розголошення |  |  |
| 24 | grant | grant | Money awarded to fund a project or contributor (e.g. Zcash Community Grants). Not: 'to grant' (to allow, give). | 193 | grants ×71, grant ×7 | grant |  |  |
| 25 | tools | tools | Software or services that help do something (privacy tools, developer tools). | 170 | інструменти ×83, tools ×4, tool ×1 | інструменти |  |  |
| 26 | viewing-key | viewing key | A key that lets someone see, but not spend, the transactions of a wallet. Capitalised 'Viewing Key' is already a protected name. Suggestion: keep English. | 242 | viewing key ×90, viewing keys ×26 | viewing key |  |  |
| 27 | swap | swap | Exchanging one cryptocurrency directly for another. Suggestion: keep English. | 190 | обмін ×69, swap ×12, swaps ×3 | обмін |  |  |
| 28 | token | token | A digital asset created on a blockchain, other than the chain's own coin. Suggestion: keep English. | 162 | токен ×59, token ×6, tokens ×3 | токен |  |  |
| 29 | consensus | consensus | The rules and process by which nodes agree on the state of the blockchain. | 177 | consensus ×16, Консенсус ×13 | Консенсус |  |  |
| 30 | staking | staking | Locking coins to help secure a proof-of-stake network and earn rewards; 'stake' is the amount locked. Not: a wooden stake, or a stake in a bet; never translate as a tree, post or field. | 133 | стейкінг ×31, stake ×22, staking ×4, staked ×3 | стейкінг |  |  |
| 31 | decentralized | decentralized | Run by many independent participants rather than one company or server. | 132 | децентралізований ×14, decentralized ×2 | децентралізований |  |  |
| 32 | network-upgrade | network upgrade | A scheduled change to Zcash's rules that all nodes adopt at a set block height (NU5, NU6 and so on). | 141 | оновлення мережі ×73, network upgrade ×14, network upgrades ×1 | оновлення мережі |  |  |
| 33 | developer | developer | A person who writes software, here usually for Zcash or a Zcash wallet. Not: development (the activity), which is usually translated. | 122 | Розробники ×24, розробник ×13, developer ×1, developers ×1 | розробник |  |  |
| 34 | full-node | full node | A node that downloads and verifies the entire blockchain. Suggestion: keep English. | 132 | повний вузол ×70, full node ×4 | повний вузол |  |  |
| 35 | on-chain | on-chain | Recorded on the blockchain itself; off-chain means outside it. Suggestion: keep English. | 133 | ончейн ×46, on-chain ×7, off-chain ×6, onchain ×1 | ончейн |  |  |
| 36 | governance | governance | How decisions about Zcash (funding, upgrades) are made and by whom. | 91 | управління ×92, governance ×1 | управління |  |  |
| 37 | turnstile | turnstile | Zcash mechanism that checks the total coins leaving a pool never exceed what entered it. Suggestion: keep English. | 91 | турнікет ×48, turnstile ×26 | турнікет |  |  |
| 38 | spending-key | spending key | The secret key that authorises spending coins; whoever has it controls the funds. Suggestion: keep English. | 100 | ключ витрачання ×37, spending key ×10, spending keys ×2 | ключ витрачання |  |  |
| 39 | miner | miner | A person or machine that does mining. | 139 | майнер ×15, miner ×2 | майнер |  |  |
| 40 | nullifier | nullifier | A unique value published when a shielded note is spent, so the same note cannot be spent twice, without revealing which note it was. Suggestion: keep English. | 88 | nullifier ×54, nullifiers ×4 | Nullifier |  |  |
| 41 | hardware-wallet | hardware wallet | A small device that stores keys offline and signs transactions (e.g. Ledger, Keystone). Suggestion: keep English. | 81 | апаратний гаманець ×24, Апаратні гаманці ×10 | апаратний гаманець |  |  |
| 42 | bridge | bridge | A service that moves assets between two different blockchains. Not: a physical bridge. | 63 | bridge ×13 | Віадук |  |  |
| 43 | halving | halving | The scheduled event that cuts the block reward in half, about every four years. | 105 | халвінг ×8, halving ×3 | халвінг |  |  |
| 44 | finalizer | finalizer | A participant in Zcash's proof-of-stake layer that votes to make blocks final; stakers delegate to a finalizer. Not: anything to do with a final match or contest. Suggestion: keep English. | 57 | фіналізатор ×15, finalizer ×3, finalizers ×1 | фіналізатор |  |  |
| 45 | newsletter | newsletter | A regular email or post that collects ZecHub and Zcash news. | 38 | розсилка ×5, Інформаційний бюлетень ×4 | розсилка |  |  |
| 46 | trusted-setup | trusted setup | A one-time ceremony that generates public parameters for a proof system; its secret must be destroyed. | 59 | trusted setup ×26, trusted setups ×2 | trusted setup |  |  |
| 47 | bond | bond | Stake locked and delegated to a finalizer for a period; unbonding releases it. Not: a financial bond (debt security) or a personal bond. | 54 | бонд ×14, bond ×6, bonds ×2 | бонд |  |  |
| 48 | scaling | scaling | Increasing how many transactions a network can handle. Not: shrinking or resizing. | 48 | масштабування ×26, scalability ×1, scaling ×1 | масштабування |  |  |
| 49 | faucet | faucet | A website that gives away tiny amounts of (often test) coins for free. Suggestion: keep English. | 40 | кран ×9, faucet ×5, Крани ×5 | кран |  |  |
| 50 | seed-phrase | seed phrase | A list of 12 to 24 words that backs up and restores a wallet. | 44 | seed-фраза ×10, seed phrase ×6 | seed-фраза |  |  |
| 51 | dashboard | dashboard | A page that shows live figures and charts at a glance. | 51 | панель ×35, Панель керування ×10, dashboard ×5 | панель |  |  |
| 52 | cross-chain | cross-chain | Working across two or more different blockchains. Suggestion: keep English. | 43 | міжланцюговий ×4, cross-chain ×1 | міжланцюговий |  |  |
| 53 | use-case | use case | A concrete way people use Zcash (payments, donations, records). | 29 | варіант використання ×3, Варіанти використання ×2 | варіант використання |  |  |
| 54 | smart-contract | smart contract | A program stored on a blockchain that runs automatically when its conditions are met. Suggestion: keep English. | 24 | smart contract ×2, смартконтракт ×1 | смартконтракт |  |  |
| 55 | light-client | light client | Wallet software that does not download the full blockchain but asks a server for the data it needs. Suggestion: keep English. | 28 | легкий клієнт ×5, light client ×1 | легкий клієнт |  |  |
| 56 | selective-disclosure | selective disclosure | Showing chosen transaction details to a chosen party (e.g. with a viewing key) while keeping the rest private. | 20 | вибіркове розкриття ×11, selective disclosure ×1 | вибіркове розкриття |  |  |
| 57 | treasury | treasury | Money held by a community or organisation to fund shared work. | 20 | (no literal candidate surface found) | скарбниця |  |  |
| 58 | top-up | top up | Adding credit to a prepaid phone or account, paid with ZEC. | 17 | поповнення ×21, top ups ×1 | поповнення |  |  |
| 59 | permissionless | permissionless | Open to anyone without asking for approval. | 13 | permissionless ×5 | permissionless |  |  |
| 60 | unlinkable | unlinkable | Impossible to connect to each other: an observer cannot tell that two items belong to the same person. Not: 'disconnected' or 'detachable'; the meaning is 'cannot be linked'. | 15 | неможливо пов’язати ×5 | неможливо пов’язати |  |  |
| 61 | brand | brand | ZecHub or Zcash brand material: logos, colours, visual identity. Not: trademark (a legal term). | 5 | бренд ×2 | бренд |  |  |
| 62 | visualizer | visualizer | A tool that draws Zcash network or address data as pictures. Not: visualizing / visualization (the activity), which is usually translated. | 1 | visualizer ×1 | visualizer |  |  |

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
| H | abbreviations_with_full_stop | Abbreviations written with a full stop that do not end a sentence? | див, ін, млн, млрд, напр, р, рр, стор, т, тис |  |  |
