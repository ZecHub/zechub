# ZecHub glossary review: Japanese (`ja`)

Glossary version 1. Kit: pages.

**記入方法**
- **✅ 列：** 表示されている訳が正しければ `OK`、英語のまま残す場合は `keep English`、それ以外はあなたが使う訳語を書いてください。1つのセルに書く訳語は1つだけです。自信がない場合は空欄のままにしてください。ID 列は編集しないでください。
- **Notes 列（重要）：** 変更した行や `keep English` とした行には、理由を自分の言葉で短く1行書いてください。例：「国内の取引所やウォレットではこの用語が使われている」「この語だと郵便の住所の意味になる」。正しい語が文脈（動詞か名詞か、メニューかページか）によって変わる場合や、行の意味が分かりにくい場合も Notes に書いてください。メモのない変更は採用されないことがあります。

**How to fill in**

- **✅ column:** write `OK` if the shown rendering is right, `keep English` to keep the English word, or the rendering you would use. One rendering per cell. Leave it empty if you are not sure. Do not edit the ID column.
- **Notes column (important):** for every row you change or mark `keep English`, write one short line in your own words saying why, for example "this is what local exchanges and wallets use" or "this word means a street address". Also use Notes when the right word depends on the context (verb or noun, menu or page), or when a row is unclear. Changes without a note may not be accepted.

**Proposed column:** for rows the glossary had no proposal for, it now shows the word our `ja` pages use today, and "Seen today" shows the counts behind it. Please check whether it is right.

Names that stay in English in every language (brands, products, programmes) are not in these tables; they are listed in `translation/protected-terms.json`.

## Conflicts to decide first

No conflicts.

## Terms in wiki pages
(`terms`: 62 rows)

| # | ID | English | Meaning | Occurrences | Seen today in `ja` pages | Proposed | ✅ Confirmed | Notes |
|---|---|---|---|---:|---|---|---|---|
| 1 | wallet | wallet | App or device that holds the keys to your coins and lets you send and receive them. | 1,694 | wallet (English) ×227, wallets (English) ×67 | ウォレット |  |  |
| 2 | shielded | shielded | Protected by Zcash's zero-knowledge encryption: a shielded address, transaction or pool hides sender, receiver and amount. Not: encrypted (generic). Translate 'encrypted' normally. | 1,433 | シールドされた ×221, shielded ×207, シールド済み ×17 | シールドされた |  |  |
| 3 | transaction | transaction | A transfer of coins recorded on the blockchain. | 1,281 | トランザクション ×489, 取引 ×222 | トランザクション |  |  |
| 4 | address | address | A string that identifies where to send coins (shielded z-address, unified address, transparent t-address). Not: a street address, or 'to address' (speak to, deal with). | 1,140 | アドレス ×593, Address ×98 | アドレス |  |  |
| 5 | privacy | privacy | Keeping your financial information hidden from others; the core value of Zcash. | 844 | プライバシー ×588 | プライバシー |  |  |
| 6 | pool | pool | A bucket of coins sharing one privacy technology (the shielded Orchard pool, the transparent pool); also a mining pool. Suggestion: keep English. | 732 | プール ×487, pool ×41 | プール |  |  |
| 7 | block | block | A batch of transactions added to the blockchain; block height is its position in the chain. Not: 'to block' (prevent, stop). | 657 | ブロック ×434, Block ×17 | ブロック |  |  |
| 8 | payment | payment | Sending coins to pay someone. | 607 | 支払い ×315, 決済 ×91 | 支払い |  |  |
| 9 | node | node | A computer running Zcash software that stores and checks the blockchain. Forms: It is NOT a loanword: use the translated term in compounds and plurals too. | 600 | node (English) ×82, node (rejected) ×82, nodes (English) ×36, nodes (rejected) ×36, ノード ×23 | ノード |  |  |
| 10 | proof | proof | Cryptographic proof: mathematical evidence that a statement is true (for example that a transaction is valid) without showing the data. Not: proof as general evidence in a non-cryptographic sense. Suggestion: keep English. | 569 | proof (English) ×41, proofs (English) ×10 | 証拠 |  |  |
| 11 | chain | chain | Short for blockchain. | 476 | チェーン ×253, chain ×17 | チェーン |  |  |
| 12 | transparent | transparent | The public, Bitcoin-like part of Zcash where addresses and amounts are visible to everyone. | 455 | transparent (English) ×119 | 透明 |  |  |
| 13 | note | note | In Zcash, a shielded unit of value (like a private coin) held by a shielded address. Not: a written note or remark, and 'to note' (to notice); translate those normally. | 411 | ノート ×184, note ×7 | ノート |  |  |
| 14 | encryption | encryption | Scrambling data so only holders of the right key can read it; 'encrypted' describes such data. | 309 | 暗号化 ×57, encryption ×5 | 暗号化 |  |  |
| 15 | blockchain | blockchain | The shared public record of all transactions, built from linked blocks. Suggestion: keep English. | 296 | ブロックチェーン ×216, blockchain ×4 | ブロックチェーン |  |  |
| 16 | exchange | exchange | A business or service where people buy, sell or trade cryptocurrencies (a crypto exchange). Not: the verb 'to exchange' (to swap one thing for another). Suggestion: keep English. | 281 | 取引所 ×149, exchange ×16, 交換 ×15 | 取引所 |  |  |
| 17 | signature | signature | Cryptographic proof that the holder of a key approved a transaction or message. Not: a handwritten signature. | 213 | 署名 ×135, signature ×21 | 署名 |  |  |
| 18 | custodial | custodial | Who holds the keys: custodial means a company holds your coins for you; non-custodial or self-custody means you hold them. | 212 | カストディアル ×29, custodial ×9 | カストディアル |  |  |
| 19 | memo | memo | A short private message attached to a shielded transaction. | 208 | メモ ×112, memo ×37 | メモ |  |  |
| 20 | mining | mining | Using computers to add new blocks to the blockchain and earn newly created coins. Not: 'determining' and other words that merely contain the letters. | 208 | マイニング ×108, mining ×35 | マイニング |  |  |
| 21 | commitment | commitment | A cryptographic value that binds to hidden data (e.g. a note commitment) without revealing it. Not: a promise or pledge. Suggestion: keep English. | 202 | commitment (English) ×13, commitments (English) ×1 | 約束 |  |  |
| 22 | fee | fee | The small amount paid to the network to process a transaction. | 199 | 手数料 ×105, fee ×13 | 手数料 |  |  |
| 23 | zero-knowledge | zero-knowledge | Cryptography that proves something is true without revealing the underlying information. Suggestion: keep English. | 197 | ゼロ知識 ×106, zero-knowledge ×2 | ゼロ知識 |  |  |
| 24 | grant | grant | Money awarded to fund a project or contributor (e.g. Zcash Community Grants). Not: 'to grant' (to allow, give). | 191 | grants (English) ×52, grant (English) ×19 | 助成金 |  |  |
| 25 | tools | tools | Software or services that help do something (privacy tools, developer tools). | 184 | tools (English) ×25, tool (English) ×6 | ツール |  |  |
| 26 | viewing-key | viewing key | A key that lets someone see, but not spend, the transactions of a wallet. Capitalised 'Viewing Key' is already a protected name. Suggestion: keep English. | 179 | Viewing Key ×95, 閲覧キー ×25, ビューイングキー ×17 | Viewing Key |  |  |
| 27 | swap | swap | Exchanging one cryptocurrency directly for another. Suggestion: keep English. | 178 | スワップ ×84, swap ×28 | スワップ |  |  |
| 28 | token | token | A digital asset created on a blockchain, other than the chain's own coin. Suggestion: keep English. | 173 | トークン ×82, token ×9 | トークン |  |  |
| 29 | consensus | consensus | The rules and process by which nodes agree on the state of the blockchain. | 159 | コンセンサス ×114, consensus ×15 | コンセンサス |  |  |
| 30 | staking | staking | Locking coins to help secure a proof-of-stake network and earn rewards; 'stake' is the amount locked. Not: a wooden stake, or a stake in a bet; never translate as a tree, post or field. | 139 | ステーキング ×46, staking ×2 | ステーキング |  |  |
| 31 | decentralized | decentralized | Run by many independent participants rather than one company or server. | 136 | 分散型 ×82, 分散化 ×4 | 分散型 |  |  |
| 32 | network-upgrade | network upgrade | A scheduled change to Zcash's rules that all nodes adopt at a set block height (NU5, NU6 and so on). | 128 | ネットワークアップグレード ×63 | ネットワークアップグレード |  |  |
| 33 | developer | developer | A person who writes software, here usually for Zcash or a Zcash wallet. Not: development (the activity), which is usually translated. | 126 | developers (English) ×8, developer (English) ×4 | 開発 |  |  |
| 34 | full-node | full node | A node that downloads and verifies the entire blockchain. Suggestion: keep English. | 120 | フルノード ×88, full node ×8 | フルノード |  |  |
| 35 | on-chain | on-chain | Recorded on the blockchain itself; off-chain means outside it. Suggestion: keep English. | 119 | オンチェーン ×73, チェーン上 ×22 | オンチェーン |  |  |
| 36 | governance | governance | How decisions about Zcash (funding, upgrades) are made and by whom. | 103 | ガバナンス ×80, governance ×9 | ガバナンス |  |  |
| 37 | turnstile | turnstile | Zcash mechanism that checks the total coins leaving a pool never exceed what entered it. Suggestion: keep English. | 97 | ターンスタイル ×57, turnstile ×37 | ターンスタイル |  |  |
| 38 | spending-key | spending key | The secret key that authorises spending coins; whoever has it controls the funds. Suggestion: keep English. | 94 | 支出鍵 ×41, Spending Key ×4 | 支出鍵 |  |  |
| 39 | miner | miner | A person or machine that does mining. | 92 | マイナー ×38, miner ×3 | マイナー |  |  |
| 40 | nullifier | nullifier | A unique value published when a shielded note is spent, so the same note cannot be spent twice, without revealing which note it was. Suggestion: keep English. | 88 | ヌリファイア ×45, nullifier ×20 | ヌリファイア |  |  |
| 41 | hardware-wallet | hardware wallet | A small device that stores keys offline and signs transactions (e.g. Ledger, Keystone). Suggestion: keep English. | 76 | hardware wallet (English) ×2 | ハードウェアウォレット |  |  |
| 42 | bridge | bridge | A service that moves assets between two different blockchains. Not: a physical bridge. | 68 | ブリッジ ×32, bridge ×8 | ブリッジ |  |  |
| 43 | halving | halving | The scheduled event that cuts the block reward in half, about every four years. | 61 | 半減期 ×24, halving ×2 | 半減期 |  |  |
| 44 | finalizer | finalizer | A participant in Zcash's proof-of-stake layer that votes to make blocks final; stakers delegate to a finalizer. Not: anything to do with a final match or contest. Suggestion: keep English. | 58 | ファイナライザー ×42, finalizer ×3 | ファイナライザー |  |  |
| 45 | newsletter | newsletter | A regular email or post that collects ZecHub and Zcash news. | 50 | ニュースレター ×35, newsletter ×11 | ニュースレター |  |  |
| 46 | trusted-setup | trusted setup | A one-time ceremony that generates public parameters for a proof system; its secret must be destroyed. | 50 | 信頼できるセットアップ ×21, トラステッドセットアップ ×13, trusted setup ×5 | 信頼できるセットアップ |  |  |
| 47 | bond | bond | Stake locked and delegated to a finalizer for a period; unbonding releases it. Not: a financial bond (debt security) or a personal bond. | 46 | ボンド ×37 | ボンド |  |  |
| 48 | scaling | scaling | Increasing how many transactions a network can handle. Not: shrinking or resizing. | 46 | スケーリング ×22, scaling ×1 | スケーリング |  |  |
| 49 | faucet | faucet | A website that gives away tiny amounts of (often test) coins for free. Suggestion: keep English. | 43 | フォーセット ×18, faucet ×10, ファウセット ×2 | フォーセット |  |  |
| 50 | seed-phrase | seed phrase | A list of 12 to 24 words that backs up and restores a wallet. | 41 | シードフレーズ ×36, seed phrase ×1 | シードフレーズ |  |  |
| 51 | dashboard | dashboard | A page that shows live figures and charts at a glance. | 41 | ダッシュボード ×32, dashboard ×2 | ダッシュボード |  |  |
| 52 | cross-chain | cross-chain | Working across two or more different blockchains. Suggestion: keep English. | 39 | クロスチェーン ×30 | クロスチェーン |  |  |
| 53 | use-case | use case | A concrete way people use Zcash (payments, donations, records). | 31 | ユースケース ×11 | ユースケース |  |  |
| 54 | smart-contract | smart contract | A program stored on a blockchain that runs automatically when its conditions are met. Suggestion: keep English. | 25 | スマートコントラクト ×9 | スマートコントラクト |  |  |
| 55 | light-client | light client | Wallet software that does not download the full blockchain but asks a server for the data it needs. Suggestion: keep English. | 24 | ライトクライアント ×12 | ライトクライアント |  |  |
| 56 | selective-disclosure | selective disclosure | Showing chosen transaction details to a chosen party (e.g. with a viewing key) while keeping the rest private. | 19 | 選択的開示 ×17 | 選択的開示 |  |  |
| 57 | treasury | treasury | Money held by a community or organisation to fund shared work. | 18 | 財務 ×5, トレジャリー ×2 | トレジャリー |  |  |
| 58 | top-up | top up | Adding credit to a prepaid phone or account, paid with ZEC. | 14 | チャージ ×1, 追加入金 ×1, 補充 ×1 | チャージ |  |  |
| 59 | permissionless | permissionless | Open to anyone without asking for approval. | 13 | パーミッションレス ×9, 権限なし ×1 | パーミッションレス |  |  |
| 60 | unlinkable | unlinkable | Impossible to connect to each other: an observer cannot tell that two items belong to the same person. Not: 'disconnected' or 'detachable'; the meaning is 'cannot be linked'. | 12 | リンク不可能 ×7 | リンク不可能 |  |  |
| 61 | brand | brand | ZecHub or Zcash brand material: logos, colours, visual identity. Not: trademark (a legal term). | 4 | ブランド ×1 | ブランド |  |  |
| 62 | visualizer | visualizer | A tool that draws Zcash network or address data as pictures. Not: visualizing / visualization (the activity), which is usually translated. | 1 | Visualizer ×1 | Visualizer |  |  |

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
| H | abbreviations_with_full_stop | Abbreviations written with a full stop that do not end a sentence? |  |  |  |
