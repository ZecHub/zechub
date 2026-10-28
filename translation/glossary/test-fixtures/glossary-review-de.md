# ZecHub glossary review: German (`de`)

Glossary version 2. Kit: pages.

**So füllen Sie die Tabelle aus**
- **Spalte ✅:** Schreiben Sie `OK`, wenn die angezeigte Übersetzung stimmt, `keep English`, um das englische Wort beizubehalten, oder die Übersetzung, die Sie verwenden würden. Eine Übersetzung pro Zelle. Lassen Sie die Zelle leer, wenn Sie unsicher sind. Ändern Sie die Spalte ID nicht.
- **Spalte Notes (wichtig):** Schreiben Sie bei jeder Zeile, die Sie ändern oder mit `keep English` markieren, in eigenen Worten einen kurzen Satz dazu, warum, zum Beispiel „so heißt es bei deutschsprachigen Börsen und Wallets“ oder „dieses Wort bedeutet Postanschrift“. Nutzen Sie Notes auch, wenn das richtige Wort vom Kontext abhängt (Verb oder Substantiv, Menü oder Seite) oder wenn eine Zeile unklar ist. Änderungen ohne Notiz werden möglicherweise nicht übernommen.

**How to fill in**

- **✅ column:** write `OK` if the shown rendering is right, `keep English` to keep the English word, or the rendering you would use. One rendering per cell. Leave it empty if you are not sure. Do not edit the ID column.
- **Notes column (important):** for every row you change or mark `keep English`, write one short line in your own words saying why, for example "this is what local exchanges and wallets use" or "this word means a street address". Also use Notes when the right word depends on the context (verb or noun, menu or page), or when a row is unclear. Changes without a note may not be accepted.

**Proposed column:** for rows the glossary had no proposal for, it now shows the word our `de` pages use today, and "Seen today" shows the counts behind it. Please check whether it is right.

Names that stay in English in every language (brands, products, programmes) are not in these tables; they are listed in `translation/protected-terms.json`.

## Conflicts to decide first

No conflicts.

## Terms in wiki pages
(`terms`: 62 rows)

| # | ID | English | Meaning | Occurrences | Seen today in `de` pages | Proposed | ✅ Confirmed | Notes |
|---|---|---|---|---:|---|---|---|---|
| 1 | wallet | wallet | App or device that holds the keys to your coins and lets you send and receive them. | 1,694 | wallet (English) ×1,256, wallets (English) ×370 | Wallet |  |  |
| 2 | shielded | shielded | Protected by Zcash's zero-knowledge encryption: a shielded address, transaction or pool hides sender, receiver and amount. Not: encrypted (generic). Translate 'encrypted' normally. | 1,433 | shielded ×865, abgeschirmt ×698 | shielded |  |  |
| 3 | transaction | transaction | A transfer of coins recorded on the blockchain. | 1,281 | Transaktion ×1235, transaction ×104 | Transaktion |  |  |
| 4 | address | address | A string that identifies where to send coins (shielded z-address, unified address, transparent t-address). Not: a street address, or 'to address' (speak to, deal with). | 1,140 | address (English) ×164, addresses (English) ×81 | Adresse |  |  |
| 5 | privacy | privacy | Keeping your financial information hidden from others; the core value of Zcash. | 844 | Privatsphäre ×466, Datenschutz ×232 | Privatsphäre |  |  |
| 6 | pool | pool | A bucket of coins sharing one privacy technology (the shielded Orchard pool, the transparent pool); also a mining pool. Suggestion: keep English. | 732 | Pool ×771 | Pool |  |  |
| 7 | block | block | A batch of transactions added to the blockchain; block height is its position in the chain. Not: 'to block' (prevent, stop). | 657 | block (English) ×336, blocks (English) ×25 | Sperre |  |  |
| 8 | payment | payment | Sending coins to pay someone. | 607 | Zahlung ×574, payment ×84 | Zahlung |  |  |
| 9 | node | node | A computer running Zcash software that stores and checks the blockchain. Forms: It is NOT a loanword: use the translated term in compounds and plurals too. | 600 | knoten ×307, node (English) ×156, node (rejected) ×156, nodes (English) ×60, nodes (rejected) ×60 | Knoten |  |  |
| 10 | proof | proof | Cryptographic proof: mathematical evidence that a statement is true (for example that a transaction is valid) without showing the data. Not: proof as general evidence in a non-cryptographic sense. Suggestion: keep English. | 569 | Beweis ×488, proof ×226 | Beweis |  |  |
| 11 | chain | chain | Short for blockchain. | 476 | Chain ×471, Kette ×30 | Chain |  |  |
| 12 | transparent | transparent | The public, Bitcoin-like part of Zcash where addresses and amounts are visible to everyone. | 455 | transparent ×497 | transparent |  |  |
| 13 | note | note | In Zcash, a shielded unit of value (like a private coin) held by a shielded address. Not: a written note or remark, and 'to note' (to notice); translate those normally. | 411 | Note ×288 | Note |  |  |
| 14 | encryption | encryption | Scrambling data so only holders of the right key can read it; 'encrypted' describes such data. | 309 | Verschlüsselung ×214, encryption ×15 | Verschlüsselung |  |  |
| 15 | blockchain | blockchain | The shared public record of all transactions, built from linked blocks. Suggestion: keep English. | 296 | Blockchain ×318 | Blockchain |  |  |
| 16 | exchange | exchange | A business or service where people buy, sell or trade cryptocurrencies (a crypto exchange). Not: the verb 'to exchange' (to swap one thing for another). Suggestion: keep English. | 281 | exchange (English) ×27, exchanges (English) ×18 | Exchange |  |  |
| 17 | signature | signature | Cryptographic proof that the holder of a key approved a transaction or message. Not: a handwritten signature. | 213 | signature (English) ×36, signatures (English) ×16 | Unterschrift |  |  |
| 18 | custodial | custodial | Who holds the keys: custodial means a company holds your coins for you; non-custodial or self-custody means you hold them. | 212 | verwahrend ×121, custodial ×34 | verwahrend |  |  |
| 19 | memo | memo | A short private message attached to a shielded transaction. | 208 | Memo ×248 | Memo |  |  |
| 20 | mining | mining | Using computers to add new blocks to the blockchain and earn newly created coins. Not: 'determining' and other words that merely contain the letters. | 208 | Mining ×165 | Mining |  |  |
| 21 | commitment | commitment | A cryptographic value that binds to hidden data (e.g. a note commitment) without revealing it. Not: a promise or pledge. Suggestion: keep English. | 202 | Commitment ×199 | Commitment |  |  |
| 22 | fee | fee | The small amount paid to the network to process a transaction. | 199 | Gebühr ×145, fee ×35 | Gebühr |  |  |
| 23 | zero-knowledge | zero-knowledge | Cryptography that proves something is true without revealing the underlying information. Suggestion: keep English. | 197 | Zero-Knowledge ×201 | Zero-Knowledge |  |  |
| 24 | grant | grant | Money awarded to fund a project or contributor (e.g. Zcash Community Grants). Not: 'to grant' (to allow, give). | 191 | grant ×136, Förderung ×56 | grant |  |  |
| 25 | tools | tools | Software or services that help do something (privacy tools, developer tools). | 184 | Tools ×93, Werkzeug ×77 | Tools |  |  |
| 26 | viewing-key | viewing key | A key that lets someone see, but not spend, the transactions of a wallet. Capitalised 'Viewing Key' is already a protected name. Suggestion: keep English. | 179 | Viewing Key ×309, Anzeigeschlüssel ×21 | Viewing Key |  |  |
| 27 | swap | swap | Exchanging one cryptocurrency directly for another. Suggestion: keep English. | 178 | Swap ×130, Tausch ×51 | Swap |  |  |
| 28 | token | token | A digital asset created on a blockchain, other than the chain's own coin. Suggestion: keep English. | 173 | Token ×190 | Token |  |  |
| 29 | consensus | consensus | The rules and process by which nodes agree on the state of the blockchain. | 159 | Konsens ×133, consensus ×26 | Konsens |  |  |
| 30 | staking | staking | Locking coins to help secure a proof-of-stake network and earn rewards; 'stake' is the amount locked. Not: a wooden stake, or a stake in a bet; never translate as a tree, post or field. | 139 | Staking ×57, Stake ×45 | Staking |  |  |
| 31 | decentralized | decentralized | Run by many independent participants rather than one company or server. | 136 | dezentral ×131, decentralized ×5 | dezentral |  |  |
| 32 | network-upgrade | network upgrade | A scheduled change to Zcash's rules that all nodes adopt at a set block height (NU5, NU6 and so on). | 128 | Netzwerk-Upgrade ×92, network upgrade ×72 | Netzwerk-Upgrade |  |  |
| 33 | developer | developer | A person who writes software, here usually for Zcash or a Zcash wallet. Not: development (the activity), which is usually translated. | 126 | Entwickler ×114, developer ×17 | Entwickler |  |  |
| 34 | full-node | full node | A node that downloads and verifies the entire blockchain. Suggestion: keep English. | 120 | full node ×93, vollständiger Knoten ×49 | full node |  |  |
| 35 | on-chain | on-chain | Recorded on the blockchain itself; off-chain means outside it. Suggestion: keep English. | 119 | on-chain ×122 | on-chain |  |  |
| 36 | governance | governance | How decisions about Zcash (funding, upgrades) are made and by whom. | 103 | Governance ×101, Verwaltung ×17 | Governance |  |  |
| 37 | turnstile | turnstile | Zcash mechanism that checks the total coins leaving a pool never exceed what entered it. Suggestion: keep English. | 97 | Drehkreuz ×44, Turnstile ×38 | Drehkreuz |  |  |
| 38 | spending-key | spending key | The secret key that authorises spending coins; whoever has it controls the funds. Suggestion: keep English. | 94 | spending key (English) ×36, spending keys (English) ×14 | Spending Key |  |  |
| 39 | miner | miner | A person or machine that does mining. | 92 | Miner ×95 | Miner |  |  |
| 40 | nullifier | nullifier | A unique value published when a shielded note is spent, so the same note cannot be spent twice, without revealing which note it was. Suggestion: keep English. | 88 | Nullifier ×89 | Nullifier |  |  |
| 41 | hardware-wallet | hardware wallet | A small device that stores keys offline and signs transactions (e.g. Ledger, Keystone). Suggestion: keep English. | 76 | Hardware-Wallet ×89 | Hardware-Wallet |  |  |
| 42 | bridge | bridge | A service that moves assets between two different blockchains. Not: a physical bridge. | 68 | bridge (English) ×38, bridges (English) ×8 | Bridge |  |  |
| 43 | halving | halving | The scheduled event that cuts the block reward in half, about every four years. | 61 | Halving ×42, Halbierung ×30 | Halving |  |  |
| 44 | finalizer | finalizer | A participant in Zcash's proof-of-stake layer that votes to make blocks final; stakers delegate to a finalizer. Not: anything to do with a final match or contest. Suggestion: keep English. | 58 | Finalizer ×54 | Finalizer |  |  |
| 45 | newsletter | newsletter | A regular email or post that collects ZecHub and Zcash news. | 50 | Newsletter ×53 | Newsletter |  |  |
| 46 | trusted-setup | trusted setup | A one-time ceremony that generates public parameters for a proof system; its secret must be destroyed. | 50 | trusted setup ×44, vertrauenswürdiges Setup ×27 | trusted setup |  |  |
| 47 | bond | bond | Stake locked and delegated to a finalizer for a period; unbonding releases it. Not: a financial bond (debt security) or a personal bond. | 46 | Bindung ×31, Bond ×16 | Bindung |  |  |
| 48 | scaling | scaling | Increasing how many transactions a network can handle. Not: shrinking or resizing. | 46 | scaling (English) ×3, scalability (English) ×1 | Verkleinerung |  |  |
| 49 | faucet | faucet | A website that gives away tiny amounts of (often test) coins for free. Suggestion: keep English. | 43 | Faucet ×43 | Faucet |  |  |
| 50 | seed-phrase | seed phrase | A list of 12 to 24 words that backs up and restores a wallet. | 41 | Seed-Phrase ×48, Wiederherstellungsphrase ×11 | Seed-Phrase |  |  |
| 51 | dashboard | dashboard | A page that shows live figures and charts at a glance. | 41 | Dashboard ×42 | Dashboard |  |  |
| 52 | cross-chain | cross-chain | Working across two or more different blockchains. Suggestion: keep English. | 39 | cross-chain ×38, kettenübergreifend ×8 | cross-chain |  |  |
| 53 | use-case | use case | A concrete way people use Zcash (payments, donations, records). | 31 | use case ×28, Anwendungsfall ×13 | use case |  |  |
| 54 | smart-contract | smart contract | A program stored on a blockchain that runs automatically when its conditions are met. Suggestion: keep English. | 25 | Smart Contract ×25 | Smart Contract |  |  |
| 55 | light-client | light client | Wallet software that does not download the full blockchain but asks a server for the data it needs. Suggestion: keep English. | 24 | Light Client ×33 | Light Client |  |  |
| 56 | selective-disclosure | selective disclosure | Showing chosen transaction details to a chosen party (e.g. with a viewing key) while keeping the rest private. | 19 | selektive Offenlegung ×23, selective disclosure ×1 | selektive Offenlegung |  |  |
| 57 | treasury | treasury | Money held by a community or organisation to fund shared work. | 18 | Treasury ×22 | Treasury |  |  |
| 58 | top-up | top up | Adding credit to a prepaid phone or account, paid with ZEC. | 14 | Aufladung ×11, top up ×2 | Aufladung |  |  |
| 59 | permissionless | permissionless | Open to anyone without asking for approval. | 13 | erlaubnisfrei ×10, permissionless ×5 | erlaubnisfrei |  |  |
| 60 | unlinkable | unlinkable | Impossible to connect to each other: an observer cannot tell that two items belong to the same person. Not: 'disconnected' or 'detachable'; the meaning is 'cannot be linked'. | 12 | nicht verknüpfbar ×9 | nicht verknüpfbar |  |  |
| 61 | brand | brand | ZecHub or Zcash brand material: logos, colours, visual identity. Not: trademark (a legal term). | 4 | Marke ×8, Brand ×4 | Marke |  |  |
| 62 | visualizer | visualizer | A tool that draws Zcash network or address data as pictures. Not: visualizing / visualization (the activity), which is usually translated. | 1 | Visualisierung ×16, Visualizer ×1 | Visualizer |  |  |

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
| H | abbreviations_with_full_stop | Abbreviations written with a full stop that do not end a sentence? | Abb, Abs, B, bzw, ca, d, Dez, etc, evtl, Feb, ff, ggf, h, inkl, Jan, Jh, max, min, Mio, Mrd, Nov, Nr, Okt, Sept, sog, u, usw, vgl |  |  |
