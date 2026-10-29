# ZecHub glossary review: Simplified Chinese (`zh`)

Glossary version 1. Kit: pages.

**填写方法**
- **✅ 列：** 如果显示的译法正确，请写 `OK`；如需保留英文，请写 `keep English`；否则请写出您会使用的译法。每个单元格只写一种译法。如不确定，请留空。请勿修改 ID 列。
- **Notes 列（重要）：** 对于您修改或标为 `keep English` 的每一行，请用自己的话写一句简短的理由，例如"本地交易所和钱包都用这个词"或"这个词指的是邮寄地址"。如果正确的词取决于上下文（动词还是名词、菜单还是页面），或某一行含义不清，也请写在 Notes 中。没有说明的修改可能不会被采纳。

**How to fill in**

- **✅ column:** write `OK` if the shown rendering is right, `keep English` to keep the English word, or the rendering you would use. One rendering per cell. Leave it empty if you are not sure. Do not edit the ID column.
- **Notes column (important):** for every row you change or mark `keep English`, write one short line in your own words saying why, for example "this is what local exchanges and wallets use" or "this word means a street address". Also use Notes when the right word depends on the context (verb or noun, menu or page), or when a row is unclear. Changes without a note may not be accepted.

**Proposed column:** for rows the glossary had no proposal for, it now shows the word our `zh` pages use today, and "Seen today" shows the counts behind it. Please check whether it is right.

Names that stay in English in every language (brands, products, programmes) are not in these tables; they are listed in `translation/protected-terms.json`.

## Conflicts to decide first

No conflicts.

## Terms in wiki pages
(`terms`: 62 rows)

| # | ID | English | Meaning | Occurrences | Seen today in `zh` pages | Proposed | ✅ Confirmed | Notes |
|---|---|---|---|---:|---|---|---|---|
| 1 | wallet | wallet | App or device that holds the keys to your coins and lets you send and receive them. | 1,694 | 钱包 ×1367, wallet ×724 | 钱包 | OK |  |
| 2 | shielded | shielded | Protected by Zcash's zero-knowledge encryption: a shielded address, transaction or pool hides sender, receiver and amount. Not: encrypted (generic). Translate 'encrypted' normally. | 1,433 | shielded (English) ×477, unshielded (English) ×2 | 已屏蔽 | 屏蔽 | 「已屏蔽」听起来像过去分词/被拦截；社区与菜单「屏蔽池」统一用「屏蔽」作定语。 |
| 3 | transaction | transaction | A transfer of coins recorded on the blockchain. | 1,281 | 交易 ×1684, transaction ×121 | 交易 | OK |  |
| 4 | address | address | A string that identifies where to send coins (shielded z-address, unified address, transparent t-address). Not: a street address, or 'to address' (speak to, deal with). | 1,140 | 地址 ×1064, address ×318 | 地址 | OK |  |
| 5 | privacy | privacy | Keeping your financial information hidden from others; the core value of Zcash. | 844 | 隐私 ×851, privacy ×85 | 隐私 | OK |  |
| 6 | pool | pool | A bucket of coins sharing one privacy technology (the shielded Orchard pool, the transparent pool); also a mining pool. Suggestion: keep English. | 732 | pool ×189, 资金池 ×184 | pool | keep English | Orchard/Sapling pool 是协议专名；仅挖矿/流动性语境才用「资金池」。 |
| 7 | block | block | A batch of transactions added to the blockchain; block height is its position in the chain. Not: 'to block' (prevent, stop). | 657 | 区块 ×805, block ×270 | 区块 | OK |  |
| 8 | payment | payment | Sending coins to pay someone. | 607 | 支付 ×505, 付款 ×286 | 支付 | OK |  |
| 9 | node | node | A computer running Zcash software that stores and checks the blockchain. Forms: It is NOT a loanword: use the translated term in compounds and plurals too. | 600 | node (English) ×66, node (rejected) ×66, 节点 ×43, nodes (English) ×37, nodes (rejected) ×37 | 节点 | OK |  |
| 10 | proof | proof | Cryptographic proof: mathematical evidence that a statement is true (for example that a transaction is valid) without showing the data. Not: proof as general evidence in a non-cryptographic sense. Suggestion: keep English. | 569 | 证明 ×897, proof ×73 | 证明 | OK |  |
| 11 | chain | chain | Short for blockchain. | 476 | 链 ×830, chain ×214 | 链 | OK |  |
| 12 | transparent | transparent | The public, Bitcoin-like part of Zcash where addresses and amounts are visible to everyone. | 455 | 透明 ×437, transparent ×98 | 透明 | OK |  |
| 13 | note | note | In Zcash, a shielded unit of value (like a private coin) held by a shielded address. Not: a written note or remark, and 'to note' (to notice); translate those normally. | 411 | note ×236, 票据 ×76 | note | keep English | Zcash note 是屏蔽价值单元，不是「票据」或普通备注。 |
| 14 | encryption | encryption | Scrambling data so only holders of the right key can read it; 'encrypted' describes such data. | 309 | encrypted (English) ×79, encrypt (English) ×16, encryption (English) ×13 | 加密 | OK |  |
| 15 | blockchain | blockchain | The shared public record of all transactions, built from linked blocks. Suggestion: keep English. | 296 | 区块链 ×222, blockchain ×97 | 区块链 | OK |  |
| 16 | exchange | exchange | A business or service where people buy, sell or trade cryptocurrencies (a crypto exchange). Not: the verb 'to exchange' (to swap one thing for another). Suggestion: keep English. | 281 | exchanges (English) ×15, exchange (English) ×11 | 货币兑换处 | 交易所 | 「货币兑换处」是外汇兑换窗口；加密语境用「交易所」。OKX ZH: https://www.okx.com/zh-hans |
| 17 | signature | signature | Cryptographic proof that the holder of a key approved a transaction or message. Not: a handwritten signature. | 213 | signature (English) ×35, signatures (English) ×10 | 亲笔签名 | 签名 | 「亲笔签名」是手写签名；链上指密码学签名。TokenPocket: https://help.tokenpocket.pro/cn/security-knowledge/protective-measures/keep-your-keys-safe |
| 18 | custodial | custodial | Who holds the keys: custodial means a company holds your coins for you; non-custodial or self-custody means you hold them. | 212 | 托管 ×188, custodial ×18 | 托管 | OK |  |
| 19 | memo | memo | A short private message attached to a shielded transaction. | 208 | 备注 ×149, memo ×97 | 备注 | OK | UI 用「备注」自然；指 shielded memo 字段时可括注 memo。 |
| 20 | mining | mining | Using computers to add new blocks to the blockchain and earn newly created coins. Not: 'determining' and other words that merely contain the letters. | 208 | 挖矿 ×96, mining ×63 | 挖矿 | OK |  |
| 21 | commitment | commitment | A cryptographic value that binds to hidden data (e.g. a note commitment) without revealing it. Not: a promise or pledge. Suggestion: keep English. | 202 | 承诺 ×132, commitment ×119 | 承诺 | keep English | 密码学 commitment，译「承诺」易误解为口头保证。 |
| 22 | fee | fee | The small amount paid to the network to process a transaction. | 199 | 手续费 ×109, fee ×26 | 手续费 | OK |  |
| 23 | zero-knowledge | zero-knowledge | Cryptography that proves something is true without revealing the underlying information. Suggestion: keep English. | 197 | 零知识 ×152, zero-knowledge ×30 | 零知识 | OK |  |
| 24 | grant | grant | Money awarded to fund a project or contributor (e.g. Zcash Community Grants). Not: 'to grant' (to allow, give). | 191 | grant ×120, 资助 ×116 | 资助 | OK |  |
| 25 | tools | tools | Software or services that help do something (privacy tools, developer tools). | 184 | tools (English) ×25, tool (English) ×6 | 工具 | OK |  |
| 26 | viewing-key | viewing key | A key that lets someone see, but not spend, the transactions of a wallet. Capitalised 'Viewing Key' is already a protected name. Suggestion: keep English. | 179 | viewing key (English) ×113, viewing keys (English) ×33, view keys (English) ×5, view key (English) ×3 | Viewing Key | 查看密钥 | 与「花费密钥」成对；保护名 Viewing Key 仍可保留英文。 |
| 27 | swap | swap | Exchanging one cryptocurrency directly for another. Suggestion: keep English. | 178 | 兑换 ×131, swap ×110 | 兑换 | OK |  |
| 28 | token | token | A digital asset created on a blockchain, other than the chain's own coin. Suggestion: keep English. | 173 | 代币 ×134, token ×51 | 代币 | OK |  |
| 29 | consensus | consensus | The rules and process by which nodes agree on the state of the blockchain. | 159 | 共识 ×148, consensus ×12 | 共识 | OK |  |
| 30 | staking | staking | Locking coins to help secure a proof-of-stake network and earn rewards; 'stake' is the amount locked. Not: a wooden stake, or a stake in a bet; never translate as a tree, post or field. | 139 | 质押 ×111, staking ×7 | 质押 | OK |  |
| 31 | decentralized | decentralized | Run by many independent participants rather than one company or server. | 136 | 去中心化 ×136, decentralized ×2 | 去中心化 | OK |  |
| 32 | network-upgrade | network upgrade | A scheduled change to Zcash's rules that all nodes adopt at a set block height (NU5, NU6 and so on). | 128 | 网络升级 ×119, network upgrade ×17 | 网络升级 | OK |  |
| 33 | developer | developer | A person who writes software, here usually for Zcash or a Zcash wallet. Not: development (the activity), which is usually translated. | 126 | 开发者 ×118, developer ×16 | 开发者 | OK |  |
| 34 | full-node | full node | A node that downloads and verifies the entire blockchain. Suggestion: keep English. | 120 | 全节点 ×97, 完整节点 ×28 | 全节点 | OK |  |
| 35 | on-chain | on-chain | Recorded on the blockchain itself; off-chain means outside it. Suggestion: keep English. | 119 | 链上 ×242, on-chain ×6 | 链上 | OK |  |
| 36 | governance | governance | How decisions about Zcash (funding, upgrades) are made and by whom. | 103 | 治理 ×97, governance ×12 | 治理 | OK |  |
| 37 | turnstile | turnstile | Zcash mechanism that checks the total coins leaving a pool never exceed what entered it. Suggestion: keep English. | 97 | Turnstile ×53, 转门 ×41 | Turnstile | keep English | Turnstile 是 Zcash 机制专名，不译「转门」。 |
| 38 | spending-key | spending key | The secret key that authorises spending coins; whoever has it controls the funds. Suggestion: keep English. | 94 | 支出密钥 ×70, spending key ×15 | 支出密钥 | 花费密钥 | 比「支出密钥」更贴近钱包文档用语；与 viewing key 成对。 |
| 39 | miner | miner | A person or machine that does mining. | 92 | 矿工 ×86, miner ×33 | 矿工 | OK |  |
| 40 | nullifier | nullifier | A unique value published when a shielded note is spent, so the same note cannot be spent twice, without revealing which note it was. Suggestion: keep English. | 88 | nullifier (English) ×59, nullifiers (English) ×3 | Nullifier | keep English | 协议术语，中文社区普遍保留 nullifier。 |
| 41 | hardware-wallet | hardware wallet | A small device that stores keys offline and signs transactions (e.g. Ledger, Keystone). Suggestion: keep English. | 76 | hardware wallet (English) ×1 | 硬件钱包 | OK |  |
| 42 | bridge | bridge | A service that moves assets between two different blockchains. Not: a physical bridge. | 68 | bridge ×39, 跨链桥 ×5 | 跨链桥 | OK |  |
| 43 | halving | halving | The scheduled event that cuts the block reward in half, about every four years. | 61 | 减半 ×70, halving ×5 | 减半 | OK |  |
| 44 | finalizer | finalizer | A participant in Zcash's proof-of-stake layer that votes to make blocks final; stakers delegate to a finalizer. Not: anything to do with a final match or contest. Suggestion: keep English. | 58 | 终局化器 ×35, finalizer ×23 | 终局化器 | keep English | 「终局化器」生硬；PoS finalizer 作专名保留英文更清晰。 |
| 45 | newsletter | newsletter | A regular email or post that collects ZecHub and Zcash news. | 50 | newsletter ×21, 新闻简报 ×19 | 新闻简报 | 通讯 | 与顶栏菜单「通讯」统一；「新闻简报」偏书面且过长。 |
| 46 | trusted-setup | trusted setup | A one-time ceremony that generates public parameters for a proof system; its secret must be destroyed. | 50 | 可信设置 ×46, trusted setup ×19 | 可信设置 | OK |  |
| 47 | bond | bond | Stake locked and delegated to a finalizer for a period; unbonding releases it. Not: a financial bond (debt security) or a personal bond. | 46 | 债券 ×23, bond ×5 | bond | keep English | 质押 bond ≠ 金融「债券」；保留英文避免误解。 |
| 48 | scaling | scaling | Increasing how many transactions a network can handle. Not: shrinking or resizing. | 46 | 可扩展性 ×19, 扩容 ×12 | 扩容 | OK |  |
| 49 | faucet | faucet | A website that gives away tiny amounts of (often test) coins for free. Suggestion: keep English. | 43 | 水龙头 ×36, faucet ×19 | 水龙头 | OK |  |
| 50 | seed-phrase | seed phrase | A list of 12 to 24 words that backs up and restores a wallet. | 41 | 助记词 ×125, seed phrase ×1 | 助记词 | OK | 币安学院术语表亦用「助记词」: https://www.binance.com/zh-CN/academy/glossary/seed-phrase |
| 51 | dashboard | dashboard | A page that shows live figures and charts at a glance. | 41 | 仪表板 ×29, dashboard ×6 | 仪表板 | 仪表盘 | 与 UI 菜单统一用「仪表盘」，不用「仪表板」。 |
| 52 | cross-chain | cross-chain | Working across two or more different blockchains. Suggestion: keep English. | 39 | 跨链 ×53, cross-chain ×2 | 跨链 | OK |  |
| 53 | use-case | use case | A concrete way people use Zcash (payments, donations, records). | 31 | 用例 ×13, use case ×1 | 用例 | OK |  |
| 54 | smart-contract | smart contract | A program stored on a blockchain that runs automatically when its conditions are met. Suggestion: keep English. | 25 | 智能合约 ×26, smart contract ×0 | 智能合约 | OK |  |
| 55 | light-client | light client | Wallet software that does not download the full blockchain but asks a server for the data it needs. Suggestion: keep English. | 24 | 轻客户端 ×26, light client ×0 | 轻客户端 | OK |  |
| 56 | selective-disclosure | selective disclosure | Showing chosen transaction details to a chosen party (e.g. with a viewing key) while keeping the rest private. | 19 | 选择性披露 ×23, selective disclosure ×1 | 选择性披露 | OK |  |
| 57 | treasury | treasury | Money held by a community or organisation to fund shared work. | 18 | 金库 ×23, treasury ×4 | 金库 | OK |  |
| 58 | top-up | top up | Adding credit to a prepaid phone or account, paid with ZEC. | 14 | 充值 ×71, top up ×0 | 充值 | OK |  |
| 59 | permissionless | permissionless | Open to anyone without asking for approval. | 13 | 无需许可 ×13, permissionless ×0 | 无需许可 | OK |  |
| 60 | unlinkable | unlinkable | Impossible to connect to each other: an observer cannot tell that two items belong to the same person. Not: 'disconnected' or 'detachable'; the meaning is 'cannot be linked'. | 12 | 不可关联 ×10, unlinkable ×0 | 不可关联 | OK |  |
| 61 | brand | brand | ZecHub or Zcash brand material: logos, colours, visual identity. Not: trademark (a legal term). | 4 | 品牌 ×8, brand ×1 | 品牌 | OK |  |
| 62 | visualizer | visualizer | A tool that draws Zcash network or address data as pictures. Not: visualizing / visualization (the activity), which is usually translated. | 1 | Visualizer ×1, visualizer ×1 | Visualizer | keep English | Visualizer 作产品/功能名保留英文。 |

## General style questions
(`style`: 8 questions)

| # | ID | Question | Current | ✅ Answer | Notes |
|---|---|---|---|---|---|
| A | register | How to address the reader (formal or informal 'you'), and does it differ between tutorials and technical pages? |  | 教程用非正式「你」；正式说明页可用「您」 | 中文 wiki 教程口语化「你」更自然。 |
| B | english_in_brackets | When an English term is kept, add the English in brackets: never / first-use / always? |  | first-use | 首次出现保留英文时括注，之后可只用中文或英文择一。 |
| C | loanwords | Crypto loanwords (blockchain, token, smart contract): keep English / translate? |  | 已通行的译（区块链、代币、智能合约）；其余视情况保留英文 | 与大陆交易所/钱包习惯一致。 |
| D | capitalise_kept_english_at_sentence_start | Capitalise a kept English term at the start of a sentence (yes / no)? |  | yes | 句首保留的英文专名仍用英语大小写习惯。 |
| E | numerals | Digits: western (0-9) only, or native digits allowed? |  | western | 西文数字 0-9，不用汉字数字作数量。 |
| F | decimal_separator | Decimal separator (0.5 or 0,5)? |  | 0.5 | 小数点用英文句点 `.`。 |
| G | quotes | Quotation marks? |  | 「」 | 中文用直角引号；必要时外层用『』。 |
| H | abbreviations_with_full_stop | Abbreviations written with a full stop that do not end a sentence? |  | no mid-sentence period | 句中缩写不加点，如「例如」/ e.g. 改写为「例如」。 |
