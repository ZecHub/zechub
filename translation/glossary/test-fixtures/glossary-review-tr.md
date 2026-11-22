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

**Draft refresh: 2026-11-21 — not a native review or approval.** Evidence is from content `0e11df443300c38abc727ffd0c0133d41d99cefd`. Existing row IDs, row numbers, proposals and reviewer answers are retained where present. New suggestions are provisional; English loanwords/placeholders are not recommendations to keep English permanently. Literal usage counts can include ordinary senses and do not cover every inflection. Please decide against the Meaning column, not frequency alone.

## Conflicts to decide first

No conflicts.

## Terms in wiki pages
(`terms`: 62 rows)

| # | ID | English | Meaning | Occurrences | Seen today in `tr` pages | Proposed | ✅ Confirmed | Notes |
|---|---|---|---|---:|---|---|---|---|
| 1 | wallet | wallet | App or device that holds the keys to your coins and lets you send and receive them. | 1,716 | cüzdan ×570, Cüzdanlar ×160, wallet ×111, wallets ×9 | cüzdan |  |  |
| 2 | shielded | shielded | Protected by Zcash's zero-knowledge encryption: a shielded address, transaction or pool hides sender, receiver and amount. Not: encrypted (generic). Translate 'encrypted' normally. | 1,470 | shielded ×787, Korumalı ×679 | shielded |  |  |
| 3 | transaction | transaction | A transfer of coins recorded on the blockchain. | 1,333 | işlem ×490, İşlemler ×31, transaction ×22, transactions ×13 | işlem |  |  |
| 4 | address | address | A string that identifies where to send coins (shielded z-address, unified address, transparent t-address). Not: a street address, or 'to address' (speak to, deal with). | 1,294 | adres ×219, address ×143, addresses ×29 | adres |  |  |
| 5 | privacy | privacy | Keeping your financial information hidden from others; the core value of Zcash. | 790 | gizlilik ×451, privacy ×26 | gizlilik |  |  |
| 6 | pool | pool | A bucket of coins sharing one privacy technology (the shielded Orchard pool, the transparent pool); also a mining pool. Suggestion: keep English. | 784 | havuz ×166, pool ×61, pools ×12 | havuz |  |  |
| 7 | block | block | A batch of transactions added to the blockchain; block height is its position in the chain. Not: 'to block' (prevent, stop). | 808 | Bloklar ×55, block ×31, blocks ×1, Engelleme ×1 | Engelleme |  |  |
| 8 | payment | payment | Sending coins to pay someone. | 687 | ödeme ×523, payment ×22, payments ×1 | ödeme |  |  |
| 9 | node | node | A computer running Zcash software that stores and checks the blockchain. Forms: It is NOT a loanword: use the translated term in compounds and plurals too. | 628 | düğüm ×240, node ×33, nodes ×7 | düğüm |  |  |
| 10 | proof | proof | Cryptographic proof: mathematical evidence that a statement is true (for example that a transaction is valid) without showing the data. Not: proof as general evidence in a non-cryptographic sense. Suggestion: keep English. | 586 | kanıt ×163, proof ×64, proofs ×9 | kanıt |  |  |
| 11 | chain | chain | Short for blockchain. | 535 | Zincir ×247, chain ×37 | Zincir |  |  |
| 12 | transparent | transparent | The public, Bitcoin-like part of Zcash where addresses and amounts are visible to everyone. | 507 | şeffaf ×362, transparent ×132 | şeffaf |  |  |
| 13 | note | note | In Zcash, a shielded unit of value (like a private coin) held by a shielded address. Not: a written note or remark, and 'to note' (to notice); translate those normally. | 474 | note ×116, notes ×5 | note |  |  |
| 14 | encryption | encryption | Scrambling data so only holders of the right key can read it; 'encrypted' describes such data. | 298 | encrypted ×67, Şifreleme ×50, encrypt ×13, encryption ×6 | Şifreleme |  |  |
| 15 | blockchain | blockchain | The shared public record of all transactions, built from linked blocks. Suggestion: keep English. | 290 | blockchain ×54, blockchains ×1 | blockchain |  |  |
| 16 | exchange | exchange | A business or service where people buy, sell or trade cryptocurrencies (a crypto exchange). Not: the verb 'to exchange' (to swap one thing for another). Suggestion: keep English. | 297 | borsa ×94, Borsalar ×62, exchange ×1, exchanges ×1 | borsa |  |  |
| 17 | signature | signature | Cryptographic proof that the holder of a key approved a transaction or message. Not: a handwritten signature. | 197 | imza ×65, signature ×12, signatures ×7 | imza |  |  |
| 18 | custodial | custodial | Who holds the keys: custodial means a company holds your coins for you; non-custodial or self-custody means you hold them. | 208 | saklama ×90, custodial ×3, custody ×3, non-custodial ×2, self-custody ×1 | saklama |  |  |
| 19 | memo | memo | A short private message attached to a shielded transaction. | 225 | memo ×96, Notlar ×41, memos ×1 | memo |  |  |
| 20 | mining | mining | Using computers to add new blocks to the blockchain and earn newly created coins. Not: 'determining' and other words that merely contain the letters. | 192 | madencilik ×103, mining ×16 | madencilik |  |  |
| 21 | commitment | commitment | A cryptographic value that binds to hidden data (e.g. a note commitment) without revealing it. Not: a promise or pledge. Suggestion: keep English. | 200 | commitment ×72, commitments ×24 | Nişanlanma |  |  |
| 22 | fee | fee | The small amount paid to the network to process a transaction. | 259 | ücret ×72, Ücretler ×30, fee ×5, fees ×2 | ücret |  |  |
| 23 | zero-knowledge | zero-knowledge | Cryptography that proves something is true without revealing the underlying information. Suggestion: keep English. | 194 | sıfır bilgi ×132, zero knowledge ×29, zero-knowledge ×24 | sıfır bilgi |  |  |
| 24 | grant | grant | Money awarded to fund a project or contributor (e.g. Zcash Community Grants). Not: 'to grant' (to allow, give). | 193 | grants ×77, grant ×7 | grant |  |  |
| 25 | tools | tools | Software or services that help do something (privacy tools, developer tools). | 170 | araçlar ×47, tools ×5, tool ×1 | araçlar |  |  |
| 26 | viewing-key | viewing key | A key that lets someone see, but not spend, the transactions of a wallet. Capitalised 'Viewing Key' is already a protected name. Suggestion: keep English. | 242 | viewing key ×150, viewing keys ×20, view key ×3 | viewing key |  |  |
| 27 | swap | swap | Exchanging one cryptocurrency directly for another. Suggestion: keep English. | 190 | swap ×29 | swap |  |  |
| 28 | token | token | A digital asset created on a blockchain, other than the chain's own coin. Suggestion: keep English. | 162 | token ×102 | Token |  |  |
| 29 | consensus | consensus | The rules and process by which nodes agree on the state of the blockchain. | 177 | Konsensüs ×67, consensus ×25 | consensus |  |  |
| 30 | staking | staking | Locking coins to help secure a proof-of-stake network and earn rewards; 'stake' is the amount locked. Not: a wooden stake, or a stake in a bet; never translate as a tree, post or field. | 133 | stake ×79, staking ×45, staked ×3 | staking |  |  |
| 31 | decentralized | decentralized | Run by many independent participants rather than one company or server. | 132 | merkeziyetsiz ×102, decentralized ×2, decentralization ×1 | merkeziyetsiz |  |  |
| 32 | network-upgrade | network upgrade | A scheduled change to Zcash's rules that all nodes adopt at a set block height (NU5, NU6 and so on). | 141 | Ağ yükseltmeleri ×37, ağ yükseltmesi ×32, network upgrade ×14, network upgrades ×2 | ağ yükseltmesi |  |  |
| 33 | developer | developer | A person who writes software, here usually for Zcash or a Zcash wallet. Not: development (the activity), which is usually translated. | 122 | geliştirici ×39, Geliştiriciler ×33, developer ×1, developers ×1 | geliştirici |  |  |
| 34 | full-node | full node | A node that downloads and verifies the entire blockchain. Suggestion: keep English. | 132 | full node ×10, full nodes ×2 | Full node |  |  |
| 35 | on-chain | on-chain | Recorded on the blockchain itself; off-chain means outside it. Suggestion: keep English. | 133 | zincir üstü ×28, on-chain ×20, off-chain ×3, onchain ×1 | zincir üstü |  |  |
| 36 | governance | governance | How decisions about Zcash (funding, upgrades) are made and by whom. | 91 | yönetişim ×58, governance ×3 | yönetişim |  |  |
| 37 | turnstile | turnstile | Zcash mechanism that checks the total coins leaving a pool never exceed what entered it. Suggestion: keep English. | 91 | turnstile ×23 | turnstile |  |  |
| 38 | spending-key | spending key | The secret key that authorises spending coins; whoever has it controls the funds. Suggestion: keep English. | 100 | harcama anahtarı ×30, spending key ×9 | harcama anahtarı |  |  |
| 39 | miner | miner | A person or machine that does mining. | 139 | madenci ×19, miner ×3 | madenci |  |  |
| 40 | nullifier | nullifier | A unique value published when a shielded note is spent, so the same note cannot be spent twice, without revealing which note it was. Suggestion: keep English. | 88 | nullifier ×80 | nullifier |  |  |
| 41 | hardware-wallet | hardware wallet | A small device that stores keys offline and signs transactions (e.g. Ledger, Keystone). Suggestion: keep English. | 81 | donanım cüzdanı ×45, Donanım cüzdanları ×14, hardware wallet ×1 | donanım cüzdanı |  |  |
| 42 | bridge | bridge | A service that moves assets between two different blockchains. Not: a physical bridge. | 63 | köprü ×26, bridge ×16 | köprü |  |  |
| 43 | halving | halving | The scheduled event that cuts the block reward in half, about every four years. | 105 | Yarılanma ×26, halving ×16 | Yarılanma |  |  |
| 44 | finalizer | finalizer | A participant in Zcash's proof-of-stake layer that votes to make blocks final; stakers delegate to a finalizer. Not: anything to do with a final match or contest. Suggestion: keep English. | 57 | finalizer ×15, finalizers ×1 | finalizer |  |  |
| 45 | newsletter | newsletter | A regular email or post that collects ZecHub and Zcash news. | 38 | bülten ×21, newsletter ×2 | bülten |  |  |
| 46 | trusted-setup | trusted setup | A one-time ceremony that generates public parameters for a proof system; its secret must be destroyed. | 59 | trusted setup ×21 | trusted setup |  |  |
| 47 | bond | bond | Stake locked and delegated to a finalizer for a period; unbonding releases it. Not: a financial bond (debt security) or a personal bond. | 54 | bond ×5, bonds ×2 | bond |  |  |
| 48 | scaling | scaling | Increasing how many transactions a network can handle. Not: shrinking or resizing. | 48 | scaling ×1 | Küçültme |  |  |
| 49 | faucet | faucet | A website that gives away tiny amounts of (often test) coins for free. Suggestion: keep English. | 40 | faucet ×21, Faucet'ler ×7, Musluklar ×1 | faucet |  |  |
| 50 | seed-phrase | seed phrase | A list of 12 to 24 words that backs up and restores a wallet. | 44 | seed phrase ×13 | seed phrase |  |  |
| 51 | dashboard | dashboard | A page that shows live figures and charts at a glance. | 51 | dashboard ×6 | dashboard |  |  |
| 52 | cross-chain | cross-chain | Working across two or more different blockchains. Suggestion: keep English. | 43 | zincirler arası ×55, cross-chain ×1 | zincirler arası |  |  |
| 53 | use-case | use case | A concrete way people use Zcash (payments, donations, records). | 29 | Kullanım Alanları ×8, kullanım alanı ×5 | kullanım alanı |  |  |
| 54 | smart-contract | smart contract | A program stored on a blockchain that runs automatically when its conditions are met. Suggestion: keep English. | 24 | akıllı sözleşme ×9 | akıllı sözleşme |  |  |
| 55 | light-client | light client | Wallet software that does not download the full blockchain but asks a server for the data it needs. Suggestion: keep English. | 28 | hafif istemci ×12, light client ×4 | hafif istemci |  |  |
| 56 | selective-disclosure | selective disclosure | Showing chosen transaction details to a chosen party (e.g. with a viewing key) while keeping the rest private. | 20 | seçici açıklama ×12, selective disclosure ×1 | seçici açıklama |  |  |
| 57 | treasury | treasury | Money held by a community or organisation to fund shared work. | 20 | hazine ×7 | hazine |  |  |
| 58 | top-up | top up | Adding credit to a prepaid phone or account, paid with ZEC. | 17 | yükleme ×23, top ups ×1 | yükleme |  |  |
| 59 | permissionless | permissionless | Open to anyone without asking for approval. | 13 | (no literal candidate surface found) | izin gerektirmeyen |  |  |
| 60 | unlinkable | unlinkable | Impossible to connect to each other: an observer cannot tell that two items belong to the same person. Not: 'disconnected' or 'detachable'; the meaning is 'cannot be linked'. | 15 | bağlantılandırılamaz ×3 | bağlantılandırılamaz |  |  |
| 61 | brand | brand | ZecHub or Zcash brand material: logos, colours, visual identity. Not: trademark (a legal term). | 5 | marka ×8 | marka |  |  |
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
| H | abbreviations_with_full_stop | Abbreviations written with a full stop that do not end a sentence? | bkz, Dr, ör, örn, Prof, vb, vs, yy |  |  |
