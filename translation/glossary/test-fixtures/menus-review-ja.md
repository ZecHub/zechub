# ZecHub glossary review: Japanese (`ja`)

Glossary version 1. Kit: ui.

**記入方法**
- **✅ 列：** 表示されている訳が正しければ `OK`、英語のまま残す場合は `keep English`、それ以外はあなたが使う訳語を書いてください。1つのセルに書く訳語は1つだけです。自信がない場合は空欄のままにしてください。ID 列は編集しないでください。
- **Notes 列（重要）：** 変更した行や `keep English` とした行には、理由を自分の言葉で短く1行書いてください。例：「国内の取引所やウォレットではこの用語が使われている」「この語だと郵便の住所の意味になる」。正しい語が文脈（動詞か名詞か、メニューかページか）によって変わる場合や、行の意味が分かりにくい場合も Notes に書いてください。メモのない変更は採用されないことがあります。

**How to fill in**

- **✅ column:** write `OK` if the shown rendering is right, `keep English` to keep the English word, or the rendering you would use. One rendering per cell. Leave it empty if you are not sure. Do not edit the ID column.
- **Notes column (important):** for every row you change or mark `keep English`, write one short line in your own words saying why, for example "this is what local exchanges and wallets use" or "this word means a street address". Also use Notes when the right word depends on the context (verb or noun, menu or page), or when a row is unclear. Changes without a note may not be accepted.

Names that stay in English in every language (brands, products, programmes) are not in these tables; they are listed in `translation/protected-terms.json`.

## Conflicts to decide first

No conflicts.

## Top menu (header) and its submenus
(`navigation`: 73 labels)


| \# | ID | English | Japanese | ✅ Confirmed | Notes |
| ----: | :---- | :---- | :---- | :---- | :---- |
| 1 | navigation.wallets | Wallets | ウォレット | OK |  |
| 2 | navigation.guides | Guides | ガイド | OK |  |
| 3 | navigation.tutorials | Tutorials | チュートリアル | OK |  |
| 4 | navigation.governance | Governance | ガバナンス | OK |  |
| 5 | navigation.visualizer | Visualizer | ビジュアライザー | OK |  |
| 6 | navigation.dao | DAO | DAO | OK |  |
| 7 | navigation.newsletter | Newsletter | ニュースレター | OK |  |
| 8 | navigation.donate | Donate | 寄付 | 寄付する | Donate is a verb call to action; the noun page name is 寄付 (Donations). |
| 9 | navigation.explore | Explore | 探索 | OK |  |
| 10 | navigation.developers | Developers | 開発者 | OK |  |
| 11 | navigation.community | Community | コミュニティ | OK |  |
| 12 | navigation.contribute | Contribute | 貢献 | 貢献する | A verb call to action; matches menuLabels and exploreMenu. |
| 13 | navigation.dashboard | Dashboard | ダッシュボード | OK |  |
| 14 | navigation.more | More | その他 | OK |  |
| 15 | navigation.usingZcash.label | Use Zcash | Zcashを使う | OK |  |
| 16 | navigation.usingZcash.buyingZec | Buying ZEC | ZECの購入 | OK |  |
| 17 | navigation.usingZcash.faucets | Faucets | 蛇口 | フォーセット | Faucet is the standard crypto term. The literal translation sounds unnatural. |
| 18 | navigation.usingZcash.wallets | Wallets | ウォレット | OK |  |
| 19 | navigation.usingZcash.exchanges | Exchanges | 取引所 | OK |  |
| 20 | navigation.usingZcash.blockExplorers | Block Explorers | ブロックエクスプローラー | OK |  |
| 21 | navigation.usingZcash.shieldedPools | Shielded Pools | シールドプール | OK |  |
| 22 | navigation.usingZcash.transparentExchangeAddresses | Transparent Exchange Addresses | 透明な取引所アドレス | 公開型取引所アドレス | "公開型" is consistent with the glossary translation of "transparent". "取引所アドレス" is kept because it refers to addresses associated with exchanges. |
| 23 | navigation.usingZcash.transactions | Transactions | 取引 | トランザクション | Use the same translation as the glossary for consistency. |
| 24 | navigation.usingZcash.memos | Memos | メモ | OK |  |
| 25 | navigation.usingZcash.mobileTopUps | Mobile Top Ups | モバイルトップアップ | OK |  |
| 26 | navigation.usingZcash.paymentRequestUris | Payment Request URIs | 支払いリクエストURI | OK |  |
| 27 | navigation.usingZcash.paymentProcessors | Payment Processors | 決済代行業者 | OK |  |
| 28 | navigation.usingZcash.recoveringFunds | Recovering Funds | 資金の回復 | 資金の復元 | "復元" is more appropriate for wallet and cryptocurrency contexts than "回復". |
| 29 | navigation.usingZcash.tools | Tools | ツール | OK |  |
| 30 | navigation.usingZcash.useCases | Use Cases | ユースケース | OK |  |
| 31 | navigation.usingZcash.useCasesSubmenu.startHere | Start Here | ここから始める | OK |  |
| 32 | navigation.usingZcash.useCasesSubmenu.acceptPayments | Accept Payments | 支払いを受け付ける | OK |  |
| 33 | navigation.usingZcash.useCasesSubmenu.freelancePrivacy | Freelance Privacy | フリーランスのプライバシー | OK |  |
| 34 | navigation.usingZcash.useCasesSubmenu.journalistPrivacy | Journalist Privacy | ジャーナリストのプライバシー | OK |  |
| 35 | navigation.usingZcash.useCasesSubmenu.keepingRecords | Keeping Records | 記録を保持する | OK |  |
| 36 | navigation.usingZcash.useCasesSubmenu.privateCommunityTreasury | Private Community Treasury | プライベートなコミュニティ財務 | プライベートなコミュニティトレジャリー | Matches the glossary term treasury \= トレジャリー; 財務 means finance or accounting, not the pool of shared funds. |
| 37 | navigation.usingZcash.useCasesSubmenu.donations | Donations | 寄付 | OK |  |
| 38 | navigation.usingZcash.useCasesSubmenu.sendMoneyPrivately | Send Money Privately | 秘密裏に送金する | プライベートに送金する | "秘密裏" sounds secretive; consistent with ZECをプライベートに使う. |
| 39 | navigation.zcashCommunity.label | Ecosystem | エコシステム | OK |  |
| 40 | navigation.zcashCommunity.communityBlogs | Community Blogs | コミュニティブログ | OK |  |
| 41 | navigation.zcashCommunity.communityLinks | Community Links | コミュニティリンク | OK |  |
| 42 | navigation.zcashCommunity.communityForum | Community Forum | コミュニティフォーラム | OK |  |
| 43 | navigation.zcashCommunity.communityProjects | Community Projects | コミュニティプロジェクト | OK |  |
| 44 | navigation.zcashCommunity.zcashMedia | Zcash Media | Zcash メディア | OK |  |
| 45 | navigation.zcashCommunity.zcashPodcasts | Zcash Podcasts | Zcashのポッドキャスト | Zcash ポッドキャスト | Removed particle "の" to align with menu item conventions like "Zcash メディア" (item 44\) |
| 46 | navigation.zcashCommunity.ecosystemSecurity | Zcash Ecosystem Security | Zcashエコシステムのセキュリティ | OK |  |
| 47 | navigation.zcashCommunity.cypherpunkZeroNFT | Cypherpunk Zero NFT | Cypherpunk Zero NFT | OK |  |
| 48 | navigation.zcashCommunity.zconArchive | Zcon Archive | Zconアーカイブ | OK |  |
| 49 | navigation.organizations.label | Organizations | 組織 | OK |  |
| 50 | navigation.organizations.brand | Brand | ブランド | OK |  |
| 51 | navigation.organizations.coinholderDirectedRetroactiveGrants | CoinHolder Directed Retroactive Grants | CoinHolder 指定の遡及的助成金 | コインホルダー主導の遡及的補助金プログラム | Clarified phrasing to natural Japanese, clearly conveying community coinholder-led retroactive funding. |
| 52 | navigation.guidesSubmenu.zgoPaymentProcessor | Zgo Payment Processor | Zgo Payment Processor | OK |  |
| 53 | navigation.guidesSubmenu.free2zLive | Free2z Live | Free2z Live | OK |  |
| 54 | navigation.guidesSubmenu.nymVpn | Nym VPN | Nym VPN | OK |  |
| 55 | navigation.guidesSubmenu.usingZecInDefi | Using ZEC in DeFi | DeFiでZECを使う | OK |  |
| 56 | navigation.guidesSubmenu.usingZecPrivately | Using ZEC Privately | ZECをプライベートに使う | プライバシーを守ってZECを使う | "プライベートに" can read as “for personal use”; this states that privacy is protected. |
| 57 | navigation.guidesSubmenu.raspberryPiZcashdNode | Raspberry Pi Zcashd Node | Raspberry Pi Zcashd ノード | OK |  |
| 58 | navigation.guidesSubmenu.raspberryPi5ZebraLightwalletdZingo | Raspberry pi5 Zebra Lightwalletd Zingo | Raspberry pi5 Zebra Lightwalletd Zingo | OK |  |
| 59 | navigation.guidesSubmenu.raspberryPiZebraNode | Raspberry Pi Zebra Node | Raspberry Pi Zebra ノード | OK |  |
| 60 | navigation.guidesSubmenu.akashNetwork | Akash Network | Akash Network | OK |  |
| 61 | navigation.guidesSubmenu.avalancheRedbridge | Avalanche RedBridge | Avalanche RedBridge | OK |  |
| 62 | navigation.guidesSubmenu.zkoolMultisig | Zkool Multisig | Zkool マルチシグ | OK |  |
| 63 | navigation.guidesSubmenu.ywalletFrostDemo | Ywallet FROST Demo | Ywallet FROST デモ | OK |  |
| 64 | navigation.guidesSubmenu.blockchainExplorers | Blockchain Explorers | ブロックチェーンエクスプローラー | OK |  |
| 65 | navigation.guidesSubmenu.btcPayServerPlugin | BTCPayServer Plugin | BTCPayServer プラグイン | OK |  |
| 66 | navigation.guidesSubmenu.visualizingZcashNetwork | Visualizing the Zcash Network | Zcash ネットワークの監視 | Zcashネットワークの可視化 | "監視" means monitoring or surveillance; Visualizing means showing data as pictures (可視化). Same wording as menuLabels. |
| 67 | navigation.guidesSubmenu.visualizingZcashAddresses | Visualizing Zcash Addresses | Zcash アドレスの可視化 | OK |  |
| 68 | navigation.guidesSubmenu.zcashImprovementProposals | Zcash Improvement Proposals | Zcash 改善提案 | OK |  |
| 69 | navigation.guidesSubmenu.zingolibAndZainoTutorial | Zingolib and Zaino Tutorial | Zingolib と Zaino のチュートリアル | OK |  |
| 70 | navigation.guidesSubmenu.zenithInstallation | Zenith Installation | Zenith のインストール | OK |  |
| 71 | navigation.guidesSubmenu.zeroKnowledgeVsDecoys | Zero Knowledge vs Decoy Systems | ゼロ知識とデコイシステムの比較 | OK |  |
| 72 | navigation.overview | Overview | 概要 | OK |  |
| 73 | navigation.shop | Shop | ショップ | OK |  |

Submenu entries (page names in the menus)

(`menuLabels`: 81 labels)

| \# | ID | English | Japanese | ✅ Confirmed | Notes |
| ----: | :---- | :---- | :---- | :---- | :---- |
| 1 | menuLabels.Accept Payments | Accept Payments | 支払いを受け付ける | OK |  |
| 2 | menuLabels.Akash Network Zebra | Akash Network Zebra | Akash Network Zebra | OK |  |
| 3 | menuLabels.Avalanche RedBridge | Avalanche RedBridge | Avalanche RedBridge | OK |  |
| 4 | menuLabels.BTCPayServer Zcash Plugin | BTCPayServer Zcash Plugin | BTCPayServer Zcash Plugin | OK |  |
| 5 | menuLabels.Blockchain Explorers | Blockchain Explorers | ブロックチェーン・エクスプローラー | OK |  |
| 6 | menuLabels.Brand | Brand | ブランド | OK |  |
| 7 | menuLabels.Buying ZEC | Buying ZEC | ZECを購入する | OK |  |
| 8 | menuLabels.Community Blogs | Community Blogs | コミュニティブログ | OK |  |
| 9 | menuLabels.Community Forum | Community Forum | コミュニティフォーラム | OK |  |
| 10 | menuLabels.Community Links | Community Links | コミュニティリンク | OK |  |
| 11 | menuLabels.Community Projects | Community Projects | コミュニティプロジェクト | OK |  |
| 12 | menuLabels.Contribute | Contribute | 貢献する | OK |  |
| 13 | menuLabels.Cypherpunk Zero NFT | Cypherpunk Zero NFT | Cypherpunk Zero NFT | OK |  |
| 14 | menuLabels.DAO | DAO | DAO | OK |  |
| 15 | menuLabels.Developers | Developers | 開発者 | OK |  |
| 16 | menuLabels.Donations | Donations | 寄付 | OK |  |
| 17 | menuLabels.Exchanges | Exchanges | 取引所 | OK |  |
| 18 | menuLabels.Extras | Extras | 追加機能 | OK |  |
| 19 | menuLabels.Faucets | Faucets | フォーセット | OK |  |
| 20 | menuLabels.Free2z Live | Free2z Live | Free2z Live | OK |  |
| 21 | menuLabels.Freelance Privacy | Freelance Privacy | フリーランス・プライバシー | フリーランスプライバシー | Removed middle dot (・) for smooth, natural Japanese phrasing in UI menus. |
| 22 | menuLabels.Governance | Governance | ガバナンス | OK |  |
| 23 | menuLabels.Guides | Guides | ガイド | OK |  |
| 24 | menuLabels.How to Participate | How to Participate | 参加方法 | OK |  |
| 25 | menuLabels.Journalist Privacy | Journalist Privacy | ジャーナリストのプライバシー | OK |  |
| 26 | menuLabels.Keeping Records | Keeping Records | 記録の保管 | OK |  |
| 27 | menuLabels.Memos | Memos | メモ | OK |  |
| 28 | menuLabels.Mobile Top Ups | Mobile Top Ups | モバイル・トップアップ | モバイルトップアップ | Removed middle dot (・) for consistency with common loanword typography in Japanese. |
| 29 | menuLabels.Newsletter | Newsletter | ニュースレター | OK |  |
| 30 | menuLabels.Nym VPN | Nym VPN | Nym VPN | OK |  |
| 31 | menuLabels.Payment Processors | Payment Processors | 決済代行業者 | OK |  |
| 32 | menuLabels.Payment Request URIs | Payment Request URIs | 支払いリクエストURI | OK |  |
| 33 | menuLabels.Podcast | Podcast | ポッドキャスト | OK |  |
| 34 | menuLabels.Private Community Treasury | Private Community Treasury | プライベート・コミュニティ・トレジャリー | プライベートなコミュニティトレジャリー | Matched phrasing with navigation item 36 and removed unnecessary middle dots. |
| 35 | menuLabels.Raspberry Pi 4 Full Node | Raspberry Pi 4 Full Node | Raspberry Pi 4 フルノード | OK |  |
| 36 | menuLabels.Raspberry pi 4 Zebra Node | Raspberry pi 4 Zebra Node | Raspberry pi 4 Zebra ノード | OK |  |
| 37 | menuLabels.Raspberry pi5 Zebra Lightwalletd Zingo | Raspberry pi5 Zebra Lightwalletd Zingo | Raspberry pi5 Zebra Lightwalletd Zingo | OK |  |
| 38 | menuLabels.Recovering Funds | Recovering Funds | 資金の復元 | OK |  |
| 39 | menuLabels.Research | Research | リサーチ | OK |  |
| 40 | menuLabels.Send Money Privately | Send Money Privately | プライベートに送金 | プライベートに送金する | Added verb ending "する" to maintain consistent action-oriented button/menu phrasing. |
| 41 | menuLabels.Shielded Pools | Shielded Pools | Shielded Pools | シールドプール | Converted untranslated English to Katakana ("シールドプール") for Japanese UI consistency. |
| 42 | menuLabels.Sitemap | Sitemap | サイトマップ | OK |  |
| 43 | menuLabels.Start Here | Start Here | ここから始める | OK |  |
| 44 | menuLabels.Store | Store | ストア | OK |  |
| 45 | menuLabels.Tools | Tools | ツール | OK |  |
| 46 | menuLabels.Transactions | Transactions | トランザクション | OK |  |
| 47 | menuLabels.Transparent Exchange Addresses | Transparent Exchange Addresses | 透明な取引所アドレス | 公開型取引所アドレス | Aligned with glossary translation of "transparent" as "公開型" and matched navigation item 22\. |
| 48 | menuLabels.Tutorials | Tutorials | チュートリアル | OK |  |
| 49 | menuLabels.Use Cases | Use Cases | ユースケース | OK |  |
| 50 | menuLabels.Using ZEC Privately | Using ZEC Privately | ZECをプライベートに使う | プライバシーを守ってZECを使う | Matched navigation item 56 to emphasize privacy protection and avoid ambiguity. |
| 51 | menuLabels.Using ZEC in DeFi | Using ZEC in DeFi | DeFiでZECを使う | OK |  |
| 52 | menuLabels.Using Zcash | Using Zcash | Zcashを使う | OK |  |
| 53 | menuLabels.Visual Identity | Visual Identity | ビジュアルアイデンティティ | OK |  |
| 54 | menuLabels.Visualizer | Visualizer | ビジュアライザー | OK |  |
| 55 | menuLabels.Visualizing Zcash Addresses | Visualizing Zcash Addresses | Zcashアドレスを可視化する | Zcashアドレスを可視化 | Shortened to concise noun form ("可視化") for UI menu list consistency. |
| 56 | menuLabels.Visualizing the Zcash Network | Visualizing the Zcash Network | Zcashネットワークを可視化する | Zcashネットワークを可視化 | Shortened to concise noun form ("可視化") for UI menu list consistency. |
| 57 | menuLabels.Wallets | Wallets | ウォレット | OK |  |
| 58 | menuLabels.Ywallet FROST Demo | Ywallet FROST Demo | Ywallet FROSTデモ | OK |  |
| 59 | menuLabels.ZIPs & Grants | ZIPs & Grants | ZIPと助成金 | OK |  |
| 60 | menuLabels.Zcash Community | Zcash Community | Zcashコミュニティ | Zcash コミュニティ | Added a half-width space ("Zcash コミュニティ") to maintain typographical consistency with neighboring menu items like "Zcash メディア" and "Zcash ガバナンス". |
| 61 | menuLabels.Zcash Ecosystem Security | Zcash Ecosystem Security | Zcashエコシステムのセキュリティ | Zcash エコシステムのセキュリティ | Added a half-width space after "Zcash" for typographical consistency across all "Zcash \[Category\]" menu items. |
| 62 | menuLabels.Zcash Governance | Zcash Governance | Zcash ガバナンス | OK |  |
| 63 | menuLabels.Zcash Improvement Proposals | Zcash Improvement Proposals | Zcash 改善プロポーズ | Zcash改善提案 | "プロポーズ" means a marriage proposal; Proposal here is 提案.&nbsp; |
| 64 | menuLabels.Zcash Media | Zcash Media | Zcash メディア | OK |  |
| 65 | menuLabels.Zcash Organizations | Zcash Organizations | Zcash 組織 | Zcash 関連団体 | Changed from literal "Zcash 組織" to "Zcash 関連団体" (Affiliated Organizations) to naturally describe the ecosystem entities (ECC, ZF, ZCG). |
| 66 | menuLabels.Zcash Podcasts | Zcash Podcasts | Zcash ポッドキャスト | OK |  |
| 67 | menuLabels.Zcon Archive | Zcon Archive | Zcon アーカイブ | OK |  |
| 68 | menuLabels.Zcon Vozes Archive | Zcon Vozes Archive | Zcon Vozes アーカイブ | OK |  |
| 69 | menuLabels.Zenith Installation | Zenith Installation | Zenith インストール | Zenith のインストール | Added particle "の" to align with navigation item 70 and improve readability as an installation guide. |
| 70 | menuLabels.Zero-Knowledge vs Decoys | Zero-Knowledge vs Decoys | ゼロ知識 vs デコイ | OK |  |
| 71 | menuLabels.Zgo Payment Processor | Zgo Payment Processor | Zgo 決済プロセッサ | Zgo 決済プロセッサー | Added standard vowel extender ("プロセッサー") to match natural Japanese typography for tech software, and ensured consistency across menu items. |
| 72 | menuLabels.Zingolib and Zaino Tutorial | Zingolib and Zaino Tutorial | Zingolib と Zaino のチュートリアル | OK |  |
| 73 | menuLabels.Zkool Multisig | Zkool Multisig | Zkool マルチシグ | OK |  |
| 74 | menuLabels.Custodial Exchanges | Custodial Exchanges | カストディアル取引所 | OK |  |
| 75 | menuLabels.Zcash Use Cases | Zcash Use Cases | Zcash のユースケース | OK |  |
| 76 | menuLabels.Zcash Tech | Zcash Tech | Zcash 技術 | OK |  |
| 77 | menuLabels.Privacy Tools | Privacy Tools | プライバシーツール | OK |  |
| 78 | menuLabels.Glossary & FAQ's | Glossary & FAQ's | 用語集 & FAQ | OK |  |
| 79 | menuLabels.Pay for AI | Pay for AI | AIの支払い | AI利用料を支払う | Clarified phrasing from "AIの支払い" (which ambiguously sounds like AI itself makes payments) to mean paying for AI services/usage with ZEC, matching the action verb style. |
| 80 | menuLabels.Community Building | Community Building | Community Building | コミュニティビルディング | Translated from untranslated English to "コミュニティビルディング" (standard industry loanword in Web3) for consistency with the Japanese UI. |
| 81 | menuLabels.Nym Mixnet Wallet Setup | Nym Mixnet Wallet Setup | Nym Mixnet Wallet Setup | Nym Mixnet ウォレットのセットアップ | Kept the protocol brand name "Nym Mixnet" in English while translating "Wallet Setup" into Japanese ("ウォレットのセットアップ") for UI clarity. |

Yellow coin menu (bottom right)

(`exploreMenu`: 15 labels)

| \# | ID | English | Japanese | ✅ Confirmed | Notes |
| ----: | :---- | :---- | :---- | :---- | :---- |
| 1 | exploreMenu.Full Explore | Full Explore | 完全ガイド | Full Explore | Changed from "完全ガイド" (which incorrectly implies a tutorial/guide and conflicts with the "Guides" menu) to accurately reflect an exploratory site index/directory. |
| 2 | exploreMenu.Start Here | Start Here | ここから始める | OK |  |
| 3 | exploreMenu.Tutorials | Tutorials | チュートリアル | OK |  |
| 4 | exploreMenu.Using Zcash | Using Zcash | Zcash の使い方 | Zcashを使う | Aligned with navigation (item 15\) and menuLabels (item 52\) to maintain consistent phrasing across the entire site. |
| 5 | exploreMenu.Guides | Guides | ガイド | OK |  |
| 6 | exploreMenu.Zcash Tech | Zcash Tech | Zcash 技術 | OK |  |
| 7 | exploreMenu.Zcash Organizations | Zcash Organizations | Zcash 関連団体 | OK |  |
| 8 | exploreMenu.Zcash Community | Zcash Community | Zcash コミュニティ | OK |  |
| 9 | exploreMenu.Privacy Tools | Privacy Tools | プライバシーツール | OK |  |
| 10 | exploreMenu.Research | Research | リサーチ | OK |  |
| 11 | exploreMenu.Glossary & FAQs | Glossary & FAQs | 用語集とFAQ | OK |  |
| 12 | exploreMenu.Contribute | Contribute | 貢献する | OK |  |
| 13 | exploreMenu.For Forks & Maintainers | For Forks & Maintainers | フォークとメンテナー向け | OK |  |
| 14 | exploreMenu.Fork zechub-wiki | Fork zechub-wiki | zechub-wiki をフォーク | zechub-wiki をフォークする | Added verb ending "する" to align with other action menu items like "貢献する" (Contribute) and "探索する" (Explore). |
| 15 | exploreMenu.Fork zechub | Fork zechub | zechub をフォーク | zechub をフォークする | Consistent with item 14, using the full verb phrase for GitHub repo actions. |

Side menu on article pages

(`sideMenu`: 2 labels)

| \# | ID | English | Japanese | ✅ Confirmed | Notes |
| ----: | :---- | :---- | :---- | :---- | :---- |
| 1 | sideMenu.navigation | Navigation | ナビゲーション | OK |  |
| 2 | sideMenu.explore | Explore | 探索 | OK |  |
