# ZecHub glossary review: Korean (`ko`)

Glossary version 1. Kit: pages.

**작성 방법**
- **✅ 열:** 표시된 번역이 맞으면 `OK`, 영어 단어를 그대로 쓰려면 `keep English`, 아니면 본인이 사용할 번역어를 적어 주세요. 한 칸에는 번역어를 하나만 적습니다. 확실하지 않으면 비워 두세요. ID 열은 수정하지 마세요.
- **Notes 열(중요):** 변경하거나 `keep English`로 표시한 모든 행에는 그 이유를 본인의 말로 짧게 한 줄 적어 주세요. 예: "국내 거래소와 지갑에서 쓰는 용어임", "이 단어는 우편 주소라는 뜻임". 올바른 단어가 문맥(동사인지 명사인지, 메뉴인지 페이지인지)에 따라 달라지거나 행의 의미가 불분명할 때도 Notes에 적어 주세요. 메모가 없는 변경은 반영되지 않을 수 있습니다.

**How to fill in**

- **✅ column:** write `OK` if the shown rendering is right, `keep English` to keep the English word, or the rendering you would use. One rendering per cell. Leave it empty if you are not sure. Do not edit the ID column.
- **Notes column (important):** for every row you change or mark `keep English`, write one short line in your own words saying why, for example "this is what local exchanges and wallets use" or "this word means a street address". Also use Notes when the right word depends on the context (verb or noun, menu or page), or when a row is unclear. Changes without a note may not be accepted.

**Proposed column:** for rows the glossary had no proposal for, it now shows the word our `ko` pages use today, and "Seen today" shows the counts behind it. Please check whether it is right.

Names that stay in English in every language (brands, products, programmes) are not in these tables; they are listed in `translation/protected-terms.json`.

## Conflicts to decide first

No conflicts.

## Terms in wiki pages
(`terms`: 62 rows)

| # | ID | English | Meaning | Occurrences | Seen today in `ko` pages | Proposed | ✅ Confirmed | Notes |
|---|---|---|---|---:|---|---|---|---|
| 1 | wallet | wallet | App or device that holds the keys to your coins and lets you send and receive them. | 1,694 | 지갑 ×1341, wallet ×658 | 지갑 |  |  |
| 2 | shielded | shielded | Protected by Zcash's zero-knowledge encryption: a shielded address, transaction or pool hides sender, receiver and amount. Not: encrypted (generic). Translate 'encrypted' normally. | 1,433 | shielded ×715, 실드 ×449, 차폐 ×169 | shielded |  |  |
| 3 | transaction | transaction | A transfer of coins recorded on the blockchain. | 1,281 | 거래 ×1221, 트랜잭션 ×387, transaction ×138 | 거래 |  |  |
| 4 | address | address | A string that identifies where to send coins (shielded z-address, unified address, transparent t-address). Not: a street address, or 'to address' (speak to, deal with). | 1,140 | address (English) ×129, addresses (English) ×26 | 주소 |  |  |
| 5 | privacy | privacy | Keeping your financial information hidden from others; the core value of Zcash. | 844 | 프라이버시 ×721, privacy ×88, 개인정보 보호 ×48 | 프라이버시 |  |  |
| 6 | pool | pool | A bucket of coins sharing one privacy technology (the shielded Orchard pool, the transparent pool); also a mining pool. Suggestion: keep English. | 732 | 풀 ×819, pool ×175 | 풀 |  |  |
| 7 | block | block | A batch of transactions added to the blockchain; block height is its position in the chain. Not: 'to block' (prevent, stop). | 657 | 블록 ×850, block ×200 | 블록 |  |  |
| 8 | payment | payment | Sending coins to pay someone. | 607 | 결제 ×649, payment ×97, 지불 ×60 | 결제 |  |  |
| 9 | node | node | A computer running Zcash software that stores and checks the blockchain. Forms: It is NOT a loanword: use the translated term in compounds and plurals too. | 600 | 노드 ×217, node (English) ×71, node (rejected) ×71, nodes (English) ×40, nodes (rejected) ×40 | 노드 |  |  |
| 10 | proof | proof | Cryptographic proof: mathematical evidence that a statement is true (for example that a transaction is valid) without showing the data. Not: proof as general evidence in a non-cryptographic sense. Suggestion: keep English. | 569 | 증명 ×863, proof ×79 | 증명 |  |  |
| 11 | chain | chain | Short for blockchain. | 476 | 체인 ×747, chain ×151 | 체인 |  |  |
| 12 | transparent | transparent | The public, Bitcoin-like part of Zcash where addresses and amounts are visible to everyone. | 455 | 투명 ×380, transparent ×149 | 투명 |  |  |
| 13 | note | note | In Zcash, a shielded unit of value (like a private coin) held by a shielded address. Not: a written note or remark, and 'to note' (to notice); translate those normally. | 411 | 노트 ×277, note ×80 | 노트 |  |  |
| 14 | encryption | encryption | Scrambling data so only holders of the right key can read it; 'encrypted' describes such data. | 309 | 암호화 ×478, encryption ×17 | 암호화 |  |  |
| 15 | blockchain | blockchain | The shared public record of all transactions, built from linked blocks. Suggestion: keep English. | 296 | 블록체인 ×298, blockchain ×24 | 블록체인 |  |  |
| 16 | exchange | exchange | A business or service where people buy, sell or trade cryptocurrencies (a crypto exchange). Not: the verb 'to exchange' (to swap one thing for another). Suggestion: keep English. | 281 | exchanges (English) ×14, exchange (English) ×11 | 환전소 |  |  |
| 17 | signature | signature | Cryptographic proof that the holder of a key approved a transaction or message. Not: a handwritten signature. | 213 | 서명 ×436, signature ×42 | 서명 |  |  |
| 18 | custodial | custodial | Who holds the keys: custodial means a company holds your coins for you; non-custodial or self-custody means you hold them. | 212 | 수탁형 ×62, custodial ×23, 관리형 ×4 | 수탁형 |  |  |
| 19 | memo | memo | A short private message attached to a shielded transaction. | 208 | 메모 ×258, memo ×60 | 메모 |  |  |
| 20 | mining | mining | Using computers to add new blocks to the blockchain and earn newly created coins. Not: 'determining' and other words that merely contain the letters. | 208 | 채굴 ×247, mining ×61 | 채굴 |  |  |
| 21 | commitment | commitment | A cryptographic value that binds to hidden data (e.g. a note commitment) without revealing it. Not: a promise or pledge. Suggestion: keep English. | 202 | commitment (English) ×24, commitments (English) ×2 | 커밋먼트 |  |  |
| 22 | fee | fee | The small amount paid to the network to process a transaction. | 199 | 수수료 ×195, fee ×30 | 수수료 |  |  |
| 23 | zero-knowledge | zero-knowledge | Cryptography that proves something is true without revealing the underlying information. Suggestion: keep English. | 197 | zero-knowledge (English) ×30, zero knowledge (English) ×12 | 영지식 |  |  |
| 24 | grant | grant | Money awarded to fund a project or contributor (e.g. Zcash Community Grants). Not: 'to grant' (to allow, give). | 191 | grant ×102, 보조금 ×85, 그랜트 ×16 | grant |  |  |
| 25 | tools | tools | Software or services that help do something (privacy tools, developer tools). | 184 | tools (English) ×26, tool (English) ×6 | 도구 |  |  |
| 26 | viewing-key | viewing key | A key that lets someone see, but not spend, the transactions of a wallet. Capitalised 'Viewing Key' is already a protected name. Suggestion: keep English. | 179 | viewing key ×218, 뷰잉 키 ×29 | viewing key |  |  |
| 27 | swap | swap | Exchanging one cryptocurrency directly for another. Suggestion: keep English. | 178 | 스왑 ×131, swap ×108 | 스왑 |  |  |
| 28 | token | token | A digital asset created on a blockchain, other than the chain's own coin. Suggestion: keep English. | 173 | 토큰 ×170, token ×24 | 토큰 |  |  |
| 29 | consensus | consensus | The rules and process by which nodes agree on the state of the blockchain. | 159 | 합의 ×157, consensus ×22, 공감 ×5 | 합의 |  |  |
| 30 | staking | staking | Locking coins to help secure a proof-of-stake network and earn rewards; 'stake' is the amount locked. Not: a wooden stake, or a stake in a bet; never translate as a tree, post or field. | 139 | 스테이킹 ×73, staking ×20 | 스테이킹 |  |  |
| 31 | decentralized | decentralized | Run by many independent participants rather than one company or server. | 136 | 탈중앙화 ×84, 분산형 ×37, decentralized ×1 | 탈중앙화 |  |  |
| 32 | network-upgrade | network upgrade | A scheduled change to Zcash's rules that all nodes adopt at a set block height (NU5, NU6 and so on). | 128 | 네트워크 업그레이드 ×119, network upgrade ×14 | 네트워크 업그레이드 |  |  |
| 33 | developer | developer | A person who writes software, here usually for Zcash or a Zcash wallet. Not: development (the activity), which is usually translated. | 126 | 개발자 ×119, developer ×17 | 개발자 |  |  |
| 34 | full-node | full node | A node that downloads and verifies the entire blockchain. Suggestion: keep English. | 120 | 풀 노드 ×100, full node ×16 | 풀 노드 |  |  |
| 35 | on-chain | on-chain | Recorded on the blockchain itself; off-chain means outside it. Suggestion: keep English. | 119 | 온체인 ×74, on-chain ×6 | 온체인 |  |  |
| 36 | governance | governance | How decisions about Zcash (funding, upgrades) are made and by whom. | 103 | 거버넌스 ×93, governance ×13 | 거버넌스 |  |  |
| 37 | turnstile | turnstile | Zcash mechanism that checks the total coins leaving a pool never exceed what entered it. Suggestion: keep English. | 97 | 턴스타일 ×39, turnstile ×34 | 턴스타일 |  |  |
| 38 | spending-key | spending key | The secret key that authorises spending coins; whoever has it controls the funds. Suggestion: keep English. | 94 | 지출 키 ×80, spending key ×17 | 지출 키 |  |  |
| 39 | miner | miner | A person or machine that does mining. | 92 | miner (English) ×3 | 채굴자 |  |  |
| 40 | nullifier | nullifier | A unique value published when a shielded note is spent, so the same note cannot be spent twice, without revealing which note it was. Suggestion: keep English. | 88 | nullifier ×50, 널리파이어 ×41 | nullifier |  |  |
| 41 | hardware-wallet | hardware wallet | A small device that stores keys offline and signs transactions (e.g. Ledger, Keystone). Suggestion: keep English. | 76 | 하드웨어 지갑 ×83, hardware wallet ×2 | 하드웨어 지갑 |  |  |
| 42 | bridge | bridge | A service that moves assets between two different blockchains. Not: a physical bridge. | 68 | bridge (English) ×12 | 교량 |  |  |
| 43 | halving | halving | The scheduled event that cuts the block reward in half, about every four years. | 61 | 반감기 ×48, halving ×5 | 반감기 |  |  |
| 44 | finalizer | finalizer | A participant in Zcash's proof-of-stake layer that votes to make blocks final; stakers delegate to a finalizer. Not: anything to do with a final match or contest. Suggestion: keep English. | 58 | 파이널라이저 ×49, finalizer ×9 | 파이널라이저 |  |  |
| 45 | newsletter | newsletter | A regular email or post that collects ZecHub and Zcash news. | 50 | 뉴스레터 ×38, newsletter ×22 | 뉴스레터 |  |  |
| 46 | trusted-setup | trusted setup | A one-time ceremony that generates public parameters for a proof system; its secret must be destroyed. | 50 | 신뢰할 수 있는 설정 ×33, trusted setup ×6 | 신뢰할 수 있는 설정 |  |  |
| 47 | bond | bond | Stake locked and delegated to a finalizer for a period; unbonding releases it. Not: a financial bond (debt security) or a personal bond. | 46 | 본드 ×32, bond ×7, 채권 ×2 | 본드 |  |  |
| 48 | scaling | scaling | Increasing how many transactions a network can handle. Not: shrinking or resizing. | 46 | 확장성 ×36, scaling ×4, 스케일링 ×1 | 확장성 |  |  |
| 49 | faucet | faucet | A website that gives away tiny amounts of (often test) coins for free. Suggestion: keep English. | 43 | faucet ×27, 수도꼭지 ×23 | faucet |  |  |
| 50 | seed-phrase | seed phrase | A list of 12 to 24 words that backs up and restores a wallet. | 41 | 시드 문구 ×40, seed phrase ×6, 시드 구문 ×4 | 시드 문구 |  |  |
| 51 | dashboard | dashboard | A page that shows live figures and charts at a glance. | 41 | 대시보드 ×37, dashboard ×4 | 대시보드 |  |  |
| 52 | cross-chain | cross-chain | Working across two or more different blockchains. Suggestion: keep English. | 39 | 크로스체인 ×45, 체인 간 ×13, cross-chain ×1 | 크로스체인 |  |  |
| 53 | use-case | use case | A concrete way people use Zcash (payments, donations, records). | 31 | 사용 사례 ×27, 활용 사례 ×7, use case ×1 | 사용 사례 |  |  |
| 54 | smart-contract | smart contract | A program stored on a blockchain that runs automatically when its conditions are met. Suggestion: keep English. | 25 | 스마트 계약 ×24 | 스마트 계약 |  |  |
| 55 | light-client | light client | Wallet software that does not download the full blockchain but asks a server for the data it needs. Suggestion: keep English. | 24 | 라이트 클라이언트 ×24, light client ×3 | 라이트 클라이언트 |  |  |
| 56 | selective-disclosure | selective disclosure | Showing chosen transaction details to a chosen party (e.g. with a viewing key) while keeping the rest private. | 19 | 선택적 공개 ×21, selective disclosure ×3 | 선택적 공개 |  |  |
| 57 | treasury | treasury | Money held by a community or organisation to fund shared work. | 18 | 재무 ×23, 펀드 ×20, 준비금 ×16 | 펀드 |  |  |
| 58 | top-up | top up | Adding credit to a prepaid phone or account, paid with ZEC. | 14 | 충전 ×25, top up ×1 | 충전 |  |  |
| 59 | permissionless | permissionless | Open to anyone without asking for approval. | 13 | 무허가 ×6 | 무허가 |  |  |
| 60 | unlinkable | unlinkable | Impossible to connect to each other: an observer cannot tell that two items belong to the same person. Not: 'disconnected' or 'detachable'; the meaning is 'cannot be linked'. | 12 | 연결 불가능 ×3, 연결할 수 없는 ×1 | 연결 불가능 |  |  |
| 61 | brand | brand | ZecHub or Zcash brand material: logos, colours, visual identity. Not: trademark (a legal term). | 4 | 브랜드 ×2, brand ×1 | 브랜드 |  |  |
| 62 | visualizer | visualizer | A tool that draws Zcash network or address data as pictures. Not: visualizing / visualization (the activity), which is usually translated. | 1 | visualizer (English) ×1 | 시각화 |  |  |

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
