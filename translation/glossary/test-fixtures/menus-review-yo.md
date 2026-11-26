# ZecHub glossary review: Yoruba (`yo`)

Refresh basis: website dictionaries at `49cbdb813b09d8ab867afa51be608837e37ea6a6`; review-kit exporter at content commit `669b99666c0fa405a53f2d70242d26acdf8bcdc0`.

**How to fill in**

- **✅ column:** write `OK` if the shown rendering is right, `keep English` to keep the English word, or the rendering you would use. One rendering per cell. Leave it empty if you are not sure. Do not edit the ID column.
- **Notes column (important):** for every row you change or mark `keep English`, write one short line in your own words saying why, for example "this is what local exchanges and wallets use" or "this word means a street address". Also use Notes when the right word depends on the context (verb or noun, menu or page), or when a row is unclear. Changes without a note may not be accepted.

Names that stay in English in every language (brands, products, programmes) are not in these tables; they are listed in `translation/protected-terms.json`.

## Conflicts to decide first

This refresh adds 69 current IDs, removes 2 stale IDs, and marks 4 changed English labels for reconfirmation. For unchanged IDs with unchanged English, answers were carried forward; “OK” was expanded to the prior proposed wording.

Steward cleanups: moved explicit Notes corrections into ✅; unified the repeated `Guides` spelling and `Zcash Organizations` capitalization; used the shorter reviewed `Wallets` form under the already-specific `Use Zcash` parent; and used the reviewer-preferred `Shop` form for the commerce `Store` label.

The `Store` label now uses the reviewer-preferred `Shop` rendering: `Ilé-Ìtajà`.
The two `Privacy Tools` rows retain their respective reviewer choices and need a consistency decision before import.

## Top menu (header) and its submenus
(`navigation`: 72 labels)

Rows marked "Header bar: keep it short" sit side by side in the desktop header bar, which must fit on one line: please use the shortest natural form (one or two words), even if a longer one is more precise.

| # | ID | English | Yoruba | ✅ Confirmed | Notes |
|---:|---|---|---|---|---|
| 1 | navigation.wallets | Wallets | Àwọn pọ́ọ̀sì | Àwọn Àpò Owó | The Yoruba word "pọ́ọ̀sì" means "purse" but it's best we make use of  "Àpò Owó" to maintain uniformity. We can now have Yoruba words like "Àwọn Àpò Owó Kírípítò" which means "Crypto wallets" |
| 2 | navigation.guides | Guides | Àwọn ìwé atọ́nà | Àwọn Atọ́nà | Header bar: keep it short \| The word "ìwé" simply means book which isn't necessary in this context. it's best we keep it short using "Atọ́nà" which means "guide" |
| 3 | navigation.tutorials | Tutorials | Àwọn ẹ̀kọ́ | Àwọn ẹ̀kọ́ | "ẹ̀kọ́" is suitable for tutorial here |
| 4 | navigation.governance | Governance | Ìdarí | Ìdarí | Ìṣàkóso or Ìdarí can be translated into Governance |
| 5 | navigation.visualizer | Visualizer | Àwòrán-ìwòye | Irinṣẹ́ Àfihàn | It's best we make use of "Irinṣẹ́ Àfihàn" because "Àwòrán-ìwòye" is more like "diagram" or "Visual Representation of something" |
| 6 | navigation.dao | DAO | DAO (ìmọ̀ ọ̀nà) | DAO | Keep English |
| 7 | navigation.newsletter | Newsletter | Ìwé ìròyìn | Ìwé ìròyìn | Newsletter can be translated as "Ìwé ìròyìn" |
| 8 | navigation.donate | Donate | Ẹ fi tọrẹ | Tọrẹ | No need for the " Ẹ fi". "Donate" is simply "Tọrẹ" |
| 9 | navigation.explore | Explore | Ṣàwárí | Ṣàwárí | “Ṣàwárí” translates to “Explore,” “Discover,” or “Investigate” in English, depending on the context |
| 10 | navigation.developers | Developers | Àwọn Olùgbéejáde | Àwọn Olùdàgbàsókè | The word "Àwọn Olùgbéejáde" can translate to "producer" but it's best we make use of "Àwọn Olùdàgbàsókè" which translates into "Developers". We can noe have words like "Àwọn Olùdàgbàsókè Sọ́fítíwè" which means "Software Developer" |
| 11 | navigation.community | Community | Ìpínlẹ̀ | Àwùjọ | "Àwùjọ" is "community" while "Ìpínlẹ̀" is "state (location)" |
| 12 | navigation.contribute | Contribute | Ṣètìlẹyìn | Ṣe àfikún | "Ṣètìlẹyìn" means "to support/back" while "Ṣe àfikún" can mean  to "Add", "contribute" "Append", |
| 13 | navigation.dashboard | Dashboard | Àpótí ìdarí | Pẹpẹ Àfihàn | Header bar: keep it short \| We can use words like "Pẹpẹ Àfihàn" or "Dasibọdu" for Dashboard |
| 14 | navigation.more | More | Àwọn míì | Àwọn mìíràn | Header bar: keep it short \| The word "Àwọn mìíràn" is more suitable |
| 15 | navigation.usingZcash.label | Use Zcash | Lo owó Zcash | Lo Zcash | Header bar: keep it short \| There's no need for the word "owó" since we know Zcash is also a form of currency that can be spent |
| 16 | navigation.usingZcash.buyingZec | Buying ZEC | Rírà ZEC | Rírà ZEC | Buying ZEC is  Rírà ZEC |
| 17 | navigation.usingZcash.faucets | Faucets | Awọn faucets | keep English | keep English |
| 18 | navigation.usingZcash.wallets | Wallets | Àwọn pọ́ọ̀sì | Àwọn Àpò Owó | Zcash Wallets; [Steward consistency: the parent menu already establishes Zcash; use the same short rendering as the other Wallets labels.] |
| 19 | navigation.usingZcash.exchanges | Exchanges | Ìpàdé | Ilé paṣípààrọ̀ | Ilé paṣípààrọ̀ is more okay |
| 20 | navigation.usingZcash.blockExplorers | Block Explorers | Àwọn Olùwádìí Àpáàdì | Àwọn Aṣàwárí Búlọ́ọ̀kù | "Aṣàwárí" means "Explorer" while "Búlọ́ọ̀kù" means "Block". Combining this gives "Àwọn Aṣàwárí Búlọ́ọ̀kù" |
| 21 | navigation.usingZcash.shieldedPools | Shielded Pools | Àwọn Erékùṣù Tí Wọ́n Fi Ààbò Bo | Púùlù Aláàbò | It's better to treat this as a Yoruba loanword |
| 22 | navigation.usingZcash.transparentExchangeAddresses | Transparent Exchange Addresses | Àwọn Adirẹsi Àdásílẹ̀ | Àdírẹ́sì Gbangba | "Àdírẹ́sì Gbangba" means "Public/transparent Address" and this best fit in the description |
| 23 | navigation.usingZcash.transactions | Transactions | Àwọn Àdéhùn | Àwọn Ìṣípò Owó | "Àwọn Àdéhùn" means "Promises" which doesn't fit into the description. "Ìṣípò Owó" can be used in this case. |
| 24 | navigation.usingZcash.memos | Memos | Àwọn ìwé ìrántí | Àwọn Ọ̀rọ̀ Ìfiránṣẹ́ | "Àwọn ìwé ìrántí" is related to "note of remembrance". It's best we make use of "Àwọn Ọ̀rọ̀ Ìfiránṣẹ́" |
| 25 | navigation.usingZcash.mobileTopUps | Mobile Top Ups | Àwọn Ohun Èlò Tó Wà Lára Ìtòlẹ́sẹẹsẹ | Ìfikún Owó Fóònù | Ìfikún Owó Fóònù" translates to "Airtime Top-Up" (or "Mobile Credit Recharge / Phone Credit Top-Up") in English. |
| 26 | navigation.usingZcash.paymentRequestUris | Payment Request URIs | Àwọn URI fún Ìbéèrè fún Ìsanwó | Àwọn URI Ìbéèrè Ìsanwó | "Àwọn URI Ìbéèrè Ìsanwó" is more prefferable |
| 27 | navigation.usingZcash.paymentProcessors | Payment Processors | Awọn Oluṣakoso Isanwo | Àwọn Olùṣètò Ìsanwó | Àwọn Olùṣètò Ìsanwó is more prefferable |
| 28 | navigation.usingZcash.recoveringFunds | Recovering Funds | Gbígba Owó Pa Dà | Gbígbà Owó Padà | We can use either "Gbígbà Owó Padà" or "Ìgbàpadà Owó" |
| 29 | navigation.usingZcash.tools | Tools | Àwọn irinṣẹ́ | Àwọn irinṣẹ́ | Àwọn irinṣẹ́ or "Ohun èlò" can be used. |
| 30 | navigation.usingZcash.useCases | Use Cases | Lo Àwọn Àkọsílẹ̀ | Àwọn Àpẹẹrẹ lílò | The word "Use Cases" can be translated as Àwọn "Àpẹẹrẹ lílò" or "Àwọn Ọ̀nà Ìlò" |
| 31 | navigation.usingZcash.useCasesSubmenu.startHere | Start Here | Bẹ̀rẹ̀ Níbí | Bẹ̀rẹ̀ Níbí | "Bẹ̀rẹ̀ Níbí" means "Start here" |
| 32 | navigation.usingZcash.useCasesSubmenu.acceptPayments | Accept Payments | Gba Àwọn Ìsanwó | Gba Àwọn Ìsanwó | "Gba Àwọn Ìsanwó" means receive or accept payments. |
| 33 | navigation.usingZcash.useCasesSubmenu.freelancePrivacy | Freelance Privacy | Ìpamọ́ Ọ̀rọ̀ Òmìnira | Ìpamọ́ fún Iṣẹ́ Aládàáni | If you want something short, it's preferable to go with "Ìpamọ́ Iṣẹ́ Aládàáni" but if we were to consider more appropriate text, the yoruba word would have been "Ààbò Ìpamọ́ fún Àwọn Òṣìṣẹ́ Aládàáni” which means "Privacy Protection for Freelancers" |
| 34 | navigation.usingZcash.useCasesSubmenu.journalistPrivacy | Journalist Privacy | Ìpamọ́ fún Oníròyìn | Ìpamọ́ fún Oníròyìn | Still preferrable |
| 35 | navigation.usingZcash.useCasesSubmenu.keepingRecords | Keeping Records | Fífi Àkọsílẹ̀ Pa Mọ́ | Fífi Àkọsílẹ̀ Pa Mọ́ | Still Preferrable |
| 36 | navigation.usingZcash.useCasesSubmenu.privateCommunityTreasury | Private Community Treasury | Ìkáwọ́ Ìpínlẹ̀ Àdáni | Ìṣúra Àwùjọ Ìkọ̀kọ̀ | "Ìkáwọ́ Ìpínlẹ̀ Àdáni" means "Self-Custody" (also "Sovereign Control", "Private Custody", or "Personal Custody") in English which doesn't really aligns with the description here. It's best we go with "Ìṣúra Àwùjọ Ìkọ̀kọ̀" |
| 37 | navigation.usingZcash.useCasesSubmenu.donations | Donations | Àwọn Ẹ̀bùn | Àwọn Ìtọrẹ | "Àwọn Ẹ̀bùn" means gifts while "Àwọn Ìtọrẹ" means donation |
| 38 | navigation.usingZcash.useCasesSubmenu.sendMoneyPrivately | Send Money Privately | Fi Owó Ránṣẹ́ Láìsí Ẹnì Kan Tó Mọ | Fi Owó Ránṣẹ́ Ní Ìkọ̀kọ̀ | Both statements are both correct but it's preferable to go with the one with lesser word usage which makes "Fi Owó Ránṣẹ́ Ní Ìkọ̀kọ̀" more preferrable |
| 39 | navigation.zcashCommunity.label | Ecosystem | Àwọn ohun abẹ̀mí | Ètò àyíká | Header bar: keep it short \| Àwọn ohun abẹ̀mí" literally means "Living Things" |
| 40 | navigation.zcashCommunity.communityBlogs | Community Blogs | Àwọn Ìkànnì Àwùjọ | Àwọn Búlọ́ọ̀gì Àwùjọ | It's best we adopt loanword for "Blog" as " Búlọ́ọ̀gì" which makes it better fit for the translation. |
| 41 | navigation.zcashCommunity.communityLinks | Community Links | Àwọn Ìjápọ̀ Àjọ | Àwọn Ìjápọ̀ Àwùjọ | It's "Àwùjọ" and not "Àjọ" because "Àjọ" means "svaings/thrift" while "Àwùjọ" means "community" |
| 42 | navigation.zcashCommunity.communityForum | Community Forum | Àjọ Ìparapọ̀ | Pẹpẹ Ìjíròrò Àwùjọ | "Àjọ Ìparapọ̀" means Union/ Coalition / Alliance which is completely different from what is required here. As for the word "Pẹpẹ Ìjíròrò Àwùjọ" it simply means "Community Discussion Forum" which is still more in accordance with what we need. |
| 43 | navigation.zcashCommunity.communityProjects | Community Projects | Àwọn Iṣẹ́ Àjọṣe | Àwọn Iṣẹ́ Àkànṣe Àwùjọ | "Àwọn Iṣẹ́ Àjọṣe" means "partnership project". "Àwọn Iṣẹ́ Àkànṣe Àwùjọ" best defines "Community Projects" but if we are considering shorter words (1-3), we can simply go with "Àwọn Iṣẹ́ Àwùjọ" |
| 44 | navigation.zcashCommunity.zcashMedia | Zcash Media | Ìròyìn Zcash | Ilé Ìròyìn Zcash | keep English if "Zcash Media" is a project/community Name |
| 45 | navigation.zcashCommunity.zcashPodcasts | Zcash Podcasts | Àwọn ìtòlẹ́sẹẹsẹ Zcash Podcasts | Àwọn Pọ́díkásì Zcash | keep English if "Zcash Podcasts" is a project/community Name |
| 46 | navigation.zcashCommunity.ecosystemSecurity | Zcash Ecosystem Security | Ààbò Ìpínlẹ̀ Ọ̀rọ̀-ayé Zcash | Ààbò Ètò Àyíká Zcash | "Ààbò Ètò Àyíká Zcash" is more preferable |
| 47 | navigation.zcashCommunity.cypherpunkZeroNFT | Cypherpunk Zero NFT | Cypherpunk Zero NFT | keep English | Keep English |
| 48 | navigation.zcashCommunity.zconArchive | Zcon Archive | Àpamọ́ Zcon | Àká Ìpamọ́ Zcon | "Àká Ìpamọ́ Zcon" is still more preferable |
| 49 | navigation.organizations.label | Organizations | Àwọn àjọ | Àwọn àjọ | Header bar: keep it short \| "Àwọn Àjọ" is okay to use here |
| 50 | navigation.organizations.brand | Brand | Àmì ọ̀pá | Bíráńdì | It's preferable to use the loanword. |
| 51 | navigation.organizations.coinholderDirectedRetroactiveGrants | CoinHolder Directed Retroactive Grants | Awọn Ẹbun Ipadà Sẹ́yìn tí CoinHolder Darí | Àwọn Owó Ìtìlẹ́yìn Àtẹ̀yìnwá Tí Àwọn Olùní Owó Kírípítò Ṣàkóso | "Àwọn Owó Ìtìlẹ́yìn Àtẹ̀yìnwá Tí Àwọn Olùní Owó Kírípítò Ṣàkóso" is still preferable |
| 52 | navigation.guidesSubmenu.zgoPaymentProcessor | Zgo Payment Processor | Olùṣiṣẹ́ Ìsanwó Zgo | Olùṣètò Ìsanwó Zgo | "Olùṣètò Ìsanwó Zgo" is more preferable but "keep English' if " Zgo Payment Processor" is the company/organization name. |
| 53 | navigation.guidesSubmenu.free2zLive | Free2z Live | Free2z Ìgbé ayé | Free2z Live | Keep English (Product/Brand Name) |
| 54 | navigation.guidesSubmenu.nymVpn | Nym VPN | Nym VPN (ì í ë ì ì) | Nym VPN | Keep English |
| 55 | navigation.guidesSubmenu.usingZecInDefi | Using ZEC in DeFi | Lílo ZEC nínú DeFi | Lílo ZEC nínú DeFi | Translated correctly |
| 56 | navigation.guidesSubmenu.usingZecPrivately | Using ZEC Privately | Lílo ZEC ní Ìkọ̀kọ̀ | Lílo ZEC ní Ìkọ̀kọ̀ | Well Translated |
| 57 | navigation.guidesSubmenu.raspberryPiZcashdNode | Raspberry Pi Zcashd Node | Raspberry Pi Zcashd Node (ì í ì ì ì ë° ì ì) | Nódù Raspberry Pi Zcashd | Remember the loanword (Nódù=Node) |
| 58 | navigation.guidesSubmenu.raspberryPi5ZebraLightwalletdZingo | Raspberry pi5 Zebra Lightwalletd Zingo | Raspberry pi5 Zebra Lightwalletd Zingo ì í ì ì ë ¤ì ' ì ì í êμ¬ë§¤í ì ì ' ë ¤. | Raspberry pi5 Zebra Lightwalletd Zingo | Keep English |
| 59 | navigation.guidesSubmenu.raspberryPiZebraNode | Raspberry Pi Zebra Node | Raspberry Pi Zebra Node[àtúnṣe _ àtúnṣe àmìọ̀rọ̀] | Nódù Raspberry Pi Zebra | Loanword for Node = Nódù |
| 60 | navigation.guidesSubmenu.akashNetwork | Akash Network | Àjọ Akash | Akash Network | Keep English |
| 61 | navigation.guidesSubmenu.zkoolMultisig | Zkool Multisig | Zkool Multisig | keep English | Keep English |
| 62 | navigation.guidesSubmenu.ywalletFrostDemo | Ywallet FROST Demo | Ywallet FROST Àwòṣe | Àfihàn FROST Lórí Ywallet | "Àfihàn FROST Lórí Ywallet" is more preferable |
| 63 | navigation.guidesSubmenu.blockchainExplorers | Blockchain Explorers | Àwọn Olùwádìí Blockchain | Àwọn Ẹ̀rọ Ìṣàwárí Blockchain | "Àwọn Ẹ̀rọ Ìṣàwárí Blockchain" still more preferable |
| 64 | navigation.guidesSubmenu.btcPayServerPlugin | BTCPayServer Plugin | BTCPayServer Àwòrán-ìdílé | Àfikún Ètò BTCPayServer | "Àfikún Ètò BTCPayServer" still more preferable or you can also make use of "Púlọ́gìnì BTCPayServer" if you prefer using the loanword |
| 65 | navigation.guidesSubmenu.visualizingZcashNetwork | Visualizing the Zcash Network | Ṣíṣe àwòrán Ìpínlẹ̀ Zcash | Ṣíṣe Àfihàn Nẹ́tíwọ́ọ̀kì Zcash | "Ṣíṣe Àfihàn Nẹ́tíwọ́ọ̀kì Zcash" still preferable |
| 66 | navigation.guidesSubmenu.visualizingZcashAddresses | Visualizing Zcash Addresses | Fífi ojú wo àwọn Adirẹsi Zcash | Ṣíṣe Àfihàn Àwọn Àdírẹ́sì Zcash | "Ṣíṣe Àfihàn Àwọn Àdírẹ́sì Zcash" is more preferable |
| 67 | navigation.guidesSubmenu.zcashImprovementProposals | Zcash Improvement Proposals | Àwọn Àbá fún Àtúnṣe Zcash | Àwọn Àbá Ìmúdàgbàsókè Zcash | They are both correct but "Àwọn Àbá Ìmúdàgbàsókè Zcash" is more preferable |
| 68 | navigation.guidesSubmenu.zingolibAndZainoTutorial | Zingolib and Zaino Tutorial | Zingolib àti Zaino Tutorial | Ẹ̀kọ́ Ìtọ́nisọ́nà nípa Zingolib àti Zaino | "Ẹ̀kọ́ Ìtọ́nisọ́nà nípa Zingolib àti Zaino" more preferable |
| 69 | navigation.guidesSubmenu.zenithInstallation | Zenith Installation | Ìfipèsè Zenith | Fífi Zenith Sórí Ẹ̀rọ | "Fífi Zenith Sórí Ẹ̀rọ" is more preferable |
| 70 | navigation.guidesSubmenu.zeroKnowledgeVsDecoys | Zero Knowledge vs Decoy Systems | Ìmọ̀ Nítòkèdì sí Àwọn Ẹ̀rọ Àgbélébùú | Zero Knowledge vs Decoy Systems | Keep English |
| 71 | navigation.overview | Overview | Àkópọ̀ | Àkópọ̀ | It's more preferable. |
| 72 | navigation.shop | Shop | Ilé ìtajà | Ilé-Ìtajà | "Ilé-Ìtajà" is more standard, clean, and immediately recognizable as shop; [Steward normalization: use the reviewer’s preferred form.] |

## Submenu entries (page names in the menus)
(`menuLabels`: 138 labels)

| # | ID | English | Yoruba | ✅ Confirmed | Notes |
|---:|---|---|---|---|---|
| 1 | menuLabels.Accept Payments | Accept Payments | Gba Àwọn Ìsanwó | Gba Àwọn Ìsanwó | Preferrable |
| 2 | menuLabels.Akash Network Zebra | Zebra on Akash | Akash Network Zebra[àtúnṣe _ àtúnṣe àmìọ̀rọ̀] |  | [Steward: English changed from “Akash Network Zebra” to “Zebra on Akash”; prior review answer was “Nódù Zebra lórí Nẹ́tíwọ́ọ̀kì Akash”. Please reconfirm.] |
| 3 | menuLabels.BTCPayServer Zcash Plugin | BTCPayServer Zcash Plugin | BTCPayServer Zcash Àfikún | Àfikún Ètò BTCPayServer | "Àfikún Ètò BTCPayServer" is still more preferable |
| 4 | menuLabels.Blockchain Explorers | Blockchain Explorers | Àwọn Olùwádìí Blockchain | Àwọn Ẹ̀rọ Ìṣàwárí Blockchain | "Àwọn Ẹ̀rọ Ìṣàwárí Blockchain" is still more preferable |
| 5 | menuLabels.Brand | Brand | Àmì ọ̀pá | Bíráńdì | It's preferable to use the loanword |
| 6 | menuLabels.Buying ZEC | Buying ZEC | Rírà ZEC | Rírà ZEC | Correct Translation |
| 7 | menuLabels.Community Blogs | Community Blogs | Àwọn Ìkànnì Àwùjọ | Àwọn Búlọ́ọ̀gì Àwùjọ | It's best we adopt loanword for "Blog" as " Búlọ́ọ̀gì" which makes it better fit for the translation. |
| 8 | menuLabels.Community Forum | Community Forum | Àjọ Ìparapọ̀ | Pẹpẹ Ìjíròrò Àwùjọ | "Àjọ Ìparapọ̀" means union/coalition; "Pẹpẹ Ìjíròrò Àwùjọ" means Community Discussion Forum and fits this menu context. |
| 9 | menuLabels.Community Links | Community Links | Àwọn Ìjápọ̀ Àjọ | Àwọn Ìjápọ̀ Àwùjọ | It's "Àwùjọ" and not "Àjọ" because "Àjọ" means "svaings/thrift" while "Àwùjọ" means "community" |
| 10 | menuLabels.Community Projects | Community Projects | Àwọn Iṣẹ́ Àjọṣe | Àwọn Iṣẹ́ Àkànṣe Àwùjọ | Àwọn Iṣẹ́ Àjọṣe" means "partnership project". "Àwọn Iṣẹ́ Àkànṣe Àwùjọ" best defines "Community Projects" but if we are considering shorter words (1-3), we can simply go with "Àwọn Iṣẹ́ Àwùjọ" |
| 11 | menuLabels.Contribute | Contribute | Ṣètìlẹyìn | Ṣe àfikún | Ṣètìlẹyìn" means "to support/back" while "Ṣe àfikún" can mean to "Add", "contribute" "Append", |
| 12 | menuLabels.Cypherpunk Zero NFT | Cypherpunk Zero NFT | Cypherpunk Zero NFT | keep English | Keep English |
| 13 | menuLabels.DAO | DAO | DAO (ìmọ̀ ọ̀nà) | DAO | keep English |
| 14 | menuLabels.Developers | Developers | Àwọn Olùgbéejáde | Àwọn Olùdàgbàsókè | The word "Àwọn Olùgbéejáde" can translate to "producer" but it's best we make use of "Àwọn Olùdàgbàsókè" which translates into "Developers". We can noe have words like "Àwọn Olùdàgbàsókè Sọ́fítíwè" which means "Software Developer" |
| 15 | menuLabels.Donations | Donations | Àwọn Ẹ̀bùn | Àwọn Ìtọrẹ | "Àwọn Ẹ̀bùn" means gifts while "Àwọn Ìtọrẹ" means donation |
| 16 | menuLabels.Exchanges | Exchanges | Ìpàdé | Ilé paṣípààrọ̀ | Ilé paṣípààrọ̀ is more okay |
| 17 | menuLabels.Extras | Extras | Àwọn àfikún | Àwọn àfikún | Well translated |
| 18 | menuLabels.Faucets | Faucets | Awọn faucets | keep English | Keep English for "Faucet" |
| 19 | menuLabels.Free2z Live | Free2z Live | Free2z Ìgbé ayé | Free2z Live | Keep English |
| 20 | menuLabels.Freelance Privacy | Freelance Privacy | Ìpamọ́ Ọ̀rọ̀ Òmìnira | Ìpamọ́ fún Iṣẹ́ Aládàáni | If you want something short, it's preferable to go with "Ìpamọ́ Iṣẹ́ Aládàáni" but if we were to consider more appropriate text, the yoruba word would have been "Ààbò Ìpamọ́ fún Àwọn Òṣìṣẹ́ Aládàáni” which means "Privacy Protection for Freelancers" |
| 21 | menuLabels.Governance | Governance | Ìdarí | Ìdarí | Ìṣàkóso or Ìdarí can be translated into Governance |
| 22 | menuLabels.Guides | Guides | Àwọn ìwé atọ́nà | Àwọn Atọ́nà | The word "ìwé" simply means book which isn't necessary in this context. it's best we keep it short using "Atọ́nà" which means "guide" |
| 23 | menuLabels.How to Participate | How to Participate | Bó O Ṣe Lè Kópa | Bó O Ṣe Lè Kópa | The translation is correct but if you're considering shorter words you can also use"Ọ̀nà Láti Kópa" |
| 24 | menuLabels.Journalist Privacy | Journalist Privacy | Ìpamọ́ fún Oníròyìn | Ìpamọ́ fún Oníròyìn | Well translated |
| 25 | menuLabels.Keeping Records | Keeping Records | Fífi Àkọsílẹ̀ Pa Mọ́ | Fífi Àkọsílẹ̀ Pa Mọ́ | Still Preferrable |
| 26 | menuLabels.Memos | Memos | Àwọn ìwé ìrántí | Àwọn Ọ̀rọ̀ Ìfiránṣẹ́ | Àwọn ìwé ìrántí" is related to "note of remembrance". It's best we make use of "Àwọn Ọ̀rọ̀ Ìfiránṣẹ́" |
| 27 | menuLabels.Mobile Top Ups | Mobile Top Ups | Àwọn Ohun Èlò Tó Wà Lára Ìtòlẹ́sẹẹsẹ | Ìfikún Owó Fóònù | Ìfikún Owó Fóònù" translates to "Airtime Top-Up" (or "Mobile Credit Recharge / Phone Credit Top-Up") in English. |
| 28 | menuLabels.Newsletter | Newsletter | Ìwé ìròyìn | Ìwé ìròyìn | Well translated |
| 29 | menuLabels.Nym VPN | Nym VPN | Nym VPN (ì í ë ì ì) | Nym VPN | Keep english |
| 30 | menuLabels.Payment Processors | Payment Processors | Awọn Oluṣakoso Isanwo | Àwọn Olùṣètò Ìsanwó | "Àwọn Olùṣètò Ìsanwó" is more Preferable |
| 31 | menuLabels.Payment Request URIs | Payment Request URIs | Àwọn URI fún Ìbéèrè fún Ìsanwó | Àwọn URI Ìbéèrè Ìsanwó | "Àwọn URI Ìbéèrè Ìsanwó" is more shorter and preferable |
| 32 | menuLabels.Podcast | Podcast | Àwọn ìsọfúnni | Pọ́díkásì | Use Loanword |
| 33 | menuLabels.Private Community Treasury | Private Community Treasury | Ìkáwọ́ Ìpínlẹ̀ Àdáni | Ìṣúra Àwùjọ Ìkọ̀kọ̀ | "Ìkáwọ́ Ìpínlẹ̀ Àdáni" means "Self-Custody" (also "Sovereign Control", "Private Custody", or "Personal Custody") in English which doesn't really aligns with the description here. It's best we go with "Ìṣúra Àwùjọ Ìkọ̀kọ̀" |
| 34 | menuLabels.Raspberry Pi 4 Full Node | Zebra + Zallet on Raspberry Pi 4 | Raspberry Pi 4 Full Node (ì í ì ì ì ë ¤) |  | [Steward: English changed from “Raspberry Pi 4 Full Node” to “Zebra + Zallet on Raspberry Pi 4”; prior review answer was “Nódù Kíkún Raspberry Pi 4”. Please reconfirm.] |
| 35 | menuLabels.Raspberry pi 4 Zebra Node | Zebra on Raspberry Pi 4 | Raspberry pi 4 Zebra Node (ìkànnì ìkànnì tí wọ́n ń pè ní Zebra) |  | [Steward: English changed from “Raspberry pi 4 Zebra Node” to “Zebra on Raspberry Pi 4”; prior review answer was “Nódù Zebra Raspberry Pi 4”. Please reconfirm.] |
| 36 | menuLabels.Raspberry pi5 Zebra Lightwalletd Zingo | Zebra stack on Raspberry Pi 5 | Raspberry pi5 Zebra Lightwalletd Zingo ì í ì ì ë ¤ì ' ì ì í êμ¬ë§¤í ì ì ' ë ¤. |  | [Steward: English changed from “Raspberry pi5 Zebra Lightwalletd Zingo” to “Zebra stack on Raspberry Pi 5”; prior review answer was “Raspberry pi5 Zebra Lightwalletd Zingo”. Please reconfirm.] |
| 37 | menuLabels.Recovering Funds | Recovering Funds | Gbígba Owó Pa Dà | Gbígbà Owó Padà | We can use either "Gbígbà Owó Padà" or "Ìgbàpadà Owó" |
| 38 | menuLabels.Research | Research | Ìwádìí | Ìwádìí | Well Translated |
| 39 | menuLabels.Send Money Privately | Send Money Privately | Fi Owó Ránṣẹ́ Láìsí Ẹnì Kan Tó Mọ | Fi Owó Ránṣẹ́ Ní Ìkọ̀kọ̀ | Both statements are both correct but it's preferable to go with the one with lesser word usage which makes "Fi Owó Ránṣẹ́ Ní Ìkọ̀kọ̀" more preferrable |
| 40 | menuLabels.Shielded Pools | Shielded Pools | Àwọn Erékùṣù Tí Wọ́n Fi Ààbò Bo | Púùlù Aláàbò | It's better to treat this as a Yoruba loanword |
| 41 | menuLabels.Sitemap | Sitemap | Àwòrán ojúlé | Àwòrán Ìtọ́sọ́nà Ojú-Òpó | "Àwòrán Ìtọ́sọ́nà Ojú-Òpó" is more preferable |
| 42 | menuLabels.Start Here | Start Here | Bẹ̀rẹ̀ Níbí | Bẹ̀rẹ̀ Níbí | Well Translated |
| 43 | menuLabels.Store | Store | Ìpamọ́ | Ilé-Ìtajà | Reviewer asked for context. This is the ZecHub merchandise shop at zechub.store; reusing the reviewer-preferred wording from "Shop". |
| 44 | menuLabels.Tools | Tools | Àwọn irinṣẹ́ | Àwọn irinṣẹ́ | Well Translated |
| 45 | menuLabels.Transactions | Transactions | Àwọn Àdéhùn | Àwọn Ìṣípò Owó | Àwọn Àdéhùn" means "Promises" which doesn't fit into the description. "Ìṣípò Owó" can be used in this case. |
| 46 | menuLabels.Transparent Exchange Addresses | Transparent Exchange Addresses | Àwọn Adirẹsi Àdásílẹ̀ | Àdírẹ́sì Gbangba | Àdírẹ́sì Gbangba" means "Public/transparent Address" and this best fit in the description |
| 47 | menuLabels.Tutorials | Tutorials | Àwọn ẹ̀kọ́ | Àwọn ẹ̀kọ́ | Well translated |
| 48 | menuLabels.Use Cases | Use Cases | Lo Àwọn Àkọsílẹ̀ | Àwọn Àpẹẹrẹ lílò | The word "Use Cases" can be translated as Àwọn "Àpẹẹrẹ lílò" or "Àwọn Ọ̀nà Ìlò" |
| 49 | menuLabels.Using ZEC Privately | Using ZEC Privately | Lílo ZEC ní Ìkọ̀kọ̀ | Lílo ZEC ní Ìkọ̀kọ̀ | Well translated |
| 50 | menuLabels.Using ZEC in DeFi | Using ZEC in DeFi | Lílo ZEC nínú DeFi | Lílo ZEC nínú DeFi | Well translated |
| 51 | menuLabels.Using Zcash | Using Zcash | Lílo Zcash | Lílo Zcash | Well translated |
| 52 | menuLabels.Visual Identity | Visual Identity | Àwòrán Ìdánimọ̀ | Ìdánimọ̀ Ojú-Ìwòran | They are both correct |
| 53 | menuLabels.Visualizer | Visualizer | Àwòrán-ìwòye | Irinṣẹ́ Àfihàn | It's best we make use of "Irinṣẹ́ Àfihàn" because "Àwòrán-ìwòye" is more like "diagram" or "Visual Representation of something" |
| 54 | menuLabels.Visualizing Zcash Addresses | Visualizing Zcash Addresses | Fífi ojú wo àwọn Adirẹsi Zcash | Ṣíṣe Àfihàn Àwọn Àdírẹ́sì Zcash | "Ṣíṣe Àfihàn Àwọn Àdírẹ́sì Zcash" is more preferable |
| 55 | menuLabels.Visualizing the Zcash Network | Visualizing the Zcash Network | Ṣíṣe àwòrán Ìpínlẹ̀ Zcash | Ṣíṣe Àfihàn Nẹ́tíwọ́ọ̀kì Zcash | "Ṣíṣe Àfihàn Nẹ́tíwọ́ọ̀kì Zcash" still preferable |
| 56 | menuLabels.Wallets | Wallets | Àwọn pọ́ọ̀sì | Àwọn Àpò Owó | "Àwọn Àpò Owó" is preferable. We can also have words like "Àwọn Àpamọ́wọ́" |
| 57 | menuLabels.Ywallet FROST Demo | Ywallet FROST Demo | Ywallet FROST Àwòṣe | Àfihàn FROST Lórí Ywallet | "Àfihàn FROST Lórí Ywallet" is still okay |
| 58 | menuLabels.ZIPs & Grants | ZIPs & Grants | ZIPs & Awọn ẹbun | Àwọn Àbá Ìmúdára Zcash(ZIPs) àti Owó Ìtìlẹ́yìn | "Àwọn Àbá Ìmúdára Zcash àti Owó Ìtìlẹ́yìn" is more preferable but if you're considering shorter words we can have something like "ZIPs àti Owó Ìtìlẹ́yìn" |
| 59 | menuLabels.Zcash Community | Zcash Community | Ìjọ Zcash | Àwùjọ Zcash | "Àwùjọ Zcash" is more okay |
| 60 | menuLabels.Zcash Ecosystem Security | Zcash Ecosystem Security | Ààbò Ìpínlẹ̀ Ọ̀rọ̀-ayé Zcash | Ààbò Ètò Àyíká Zcash | "Ààbò Ètò Àyíká Zcash" is more preferable |
| 61 | menuLabels.Zcash Governance | Zcash Governance | Ìdarí Zcash | Ìdarí Zcash | It's correct. Alternative words like "Ìṣàkóso Zcash" can also be used |
| 62 | menuLabels.Zcash Improvement Proposals | Zcash Improvement Proposals | Àwọn Àbá fún Àtúnṣe Zcash | Àwọn Àbá Ìmúdàgbàsókè Zcash | They are both correct but "Àwọn Àbá Ìmúdàgbàsókè Zcash" is more preferable |
| 63 | menuLabels.Zcash Media | Zcash Media | Ìròyìn Zcash | Ilé Ìròyìn Zcash | keep English if "Zcash Media" is a project/community Name |
| 64 | menuLabels.Zcash Organizations | Zcash Organizations | Àwọn àjọ Zcash | Àwọn Àjọ Zcash | Correct Translation |
| 65 | menuLabels.Zcash Podcasts | Zcash Podcasts | Àwọn ìtòlẹ́sẹẹsẹ Zcash Podcasts | Àwọn Pọ́díkásì Zcash | keep English if "Zcash Podcasts" is a project/community Name |
| 66 | menuLabels.Zcon Archive | Zcon Archive | Àpamọ́ Zcon | Àká Ìpamọ́ Zcon | "Àká Ìpamọ́ Zcon" is still preferable |
| 67 | menuLabels.Zcon Vozes Archive | Zcon Vozes Archive | Àpamọ́ Ọ̀rọ̀ Zcon | Àká Ìpamọ́ Zcon Vozes | "Àká Ìpamọ́ Zcon Vozes" is still more okay |
| 68 | menuLabels.Zenith Installation | Zenith Installation | Ìfipèsè Zenith | Fífi Zenith Sórí Ẹ̀rọ | "Fífi Zenith Sórí Ẹ̀rọ" is more preferable |
| 69 | menuLabels.Zero-Knowledge vs Decoys | Zero-Knowledge vs Decoys | Ìmọ̀-Kò-Lójú sí Àwọn Ẹ̀tàn Àgbélébùú | Zero-Knowledge vs Decoys | Keep English |
| 70 | menuLabels.Zgo Payment Processor | Zgo Payment Processor | Olùṣiṣẹ́ Ìsanwó Zgo | Olùṣètò Ìsanwó Zgo | Olùṣètò Ìsanwó Zgo" is more preferable but "keep English' if " Zgo Payment Processor" is the company/organization name. |
| 71 | menuLabels.Zingolib and Zaino Tutorial | Zingolib and Zaino Tutorial | Zingolib àti Zaino Tutorial | Ẹ̀kọ́ Ìtọ́nisọ́nà nípa Zingolib àti Zaino | Ẹ̀kọ́ Ìtọ́nisọ́nà nípa Zingolib àti Zaino" more preferable |
| 72 | menuLabels.Zkool Multisig | Zkool Multisig | Zkool Multisig | keep English | Keep English |
| 73 | menuLabels.Custodial Exchanges | Custodial Exchanges | Àwọn Ìpàdé Àdánwò | Àwọn Pẹpẹ Pàṣípààrọ̀ Olùtọ́jú Owó | " Àwọn Ìpàdé Àdánwò" is out of the context here as it means Trial Meetings / Test Sessions" |
| 74 | menuLabels.Zcash Use Cases | Zcash Use Cases | Àwọn Àpẹẹrẹ Ìlò Zcash | Àwọn Àpẹẹrẹ Ìlò Zcash | Still Preferable |
| 75 | menuLabels.Zcash Tech | Zcash Tech | Zcash Tech | Ìmọ̀-Ẹ̀rọ Zcash | "Ìmọ̀-Ẹ̀rọ Zcash" translates to Zcash Technology |
| 76 | menuLabels.Privacy Tools | Privacy Tools | Àwọn irinṣẹ Ìpamọ́ | Àwọn Irinṣẹ́ Ààbò Àṣírí | Both forms are understandable; reviewer prefers “Àwọn Irinṣẹ́ Ààbò Àṣírí”. Ìpamọ́ and Àṣírí are related in this context. |
| 77 | menuLabels.Glossary & FAQ's | Glossary & FAQ's | Àkójọ ọ̀rọ̀ àti àwọn ìbéèrè tí a sábà máa ń béèrè | Àkójọ Ọ̀rọ̀ Ìtumọ̀ àti Àwọn Ìbéèrè Tó Wọ́pọ̀ | Both translations are correct but i prefer going with the one with shorter words which is "Àkójọ Ọ̀rọ̀ Ìtumọ̀ àti Àwọn Ìbéèrè Tó Wọ́pọ̀" |
| 78 | menuLabels.Pay for AI | Pay for AI | Sanwó fún AI | Sanwó fún AI | Well translated |
| 79 | menuLabels.Community Building | Community Building | Community Building | Ìdàgbàsókè Àwùjọ | We can also use word like "Ìkọ́jọpọ̀ Àwùjọ" |
| 80 | menuLabels.Nym Mixnet Wallet Setup | Nym Mixnet Wallet Setup | Nym Mixnet Wallet Setup | Ìṣètò Àpò Owó Nym Mixnet | We can also have it as "Ìṣètò Àpamọ́wọ́ Nym Mixnet". Remember wallet can be "Àpamọ́wọ́" or "Àpò Owó" |
| 81 | menuLabels.Use Zcash | Use Zcash | Lo Zcash |  | [Steward: added since PR #2835; please review and confirm.] |
| 82 | menuLabels.Block Explorers | Block Explorers | Awọn Aṣàwákiri Bulọọki |  | [Steward: added since PR #2835; please review and confirm.] |
| 83 | menuLabels.Ecosystem | Ecosystem | Eto ilolupo |  | [Steward: added since PR #2835; please review and confirm.] |
| 84 | menuLabels.Raspberry Pi Zcashd Node | Raspberry Pi Zcashd Node | Noodu Raspberry Pi Zcashd |  | [Steward: added since PR #2835; please review and confirm.] |
| 85 | menuLabels.Raspberry Pi Zebra Node | Raspberry Pi Zebra Node | Noodu Zebra Raspberry Pi |  | [Steward: added since PR #2835; please review and confirm.] |
| 86 | menuLabels.Zero Knowledge vs Decoy Systems | Zero Knowledge vs Decoy Systems | Ìmọ̀ Odo vs Àwọn Ètò Ẹ̀tàn |  | [Steward: added since PR #2835; please review and confirm.] |
| 87 | menuLabels.Organizations | Organizations | Àwọn àjọ |  | [Steward: added since PR #2835; please review and confirm.] |
| 88 | menuLabels.Zallet Quick Reference Guide | Zallet Quick Reference Guide | Zallet Quick Reference Guide |  | [Steward: added since PR #2835; please review and confirm.] |
| 89 | menuLabels.Spend Zcash | Spend Zcash | Na Zcash lọwọ |  | [Steward: added since PR #2835; please review and confirm.] |
| 90 | menuLabels.Places to Spend ZEC | Places to Spend ZEC | Àwọn ibi láti ná ZEC |  | [Steward: added since PR #2835; please review and confirm.] |
| 91 | menuLabels.Free2Z Livestreaming | Free2Z Livestreaming | Free2Z igbohunsafefe taara |  | [Steward: added since PR #2835; please review and confirm.] |
| 92 | menuLabels.Hardened Zebrad | Hardened Zebrad | Zebrad tí a ti mú kí ó lágbára |  | [Steward: added since PR #2835; please review and confirm.] |
| 93 | menuLabels.Migration Guide Zcashd To Zebrad Zallet | Migration Guide Zcashd To Zebrad Zallet | Ìtọ́sọ́nà Ìṣíkiri Zcashd sí Zebrad Zallet |  | [Steward: added since PR #2835; please review and confirm.] |
| 94 | menuLabels.My First Zcash Workbook | My First Zcash Workbook | Ìwé iṣẹ́ Zcash àkọ́kọ́ mi |  | [Steward: added since PR #2835; please review and confirm.] |
| 95 | menuLabels.Verifying Zcash Releases | Verifying Zcash Releases | Ṣíṣe àyẹ̀wò àwọn ìtújáde Zcash |  | [Steward: added since PR #2835; please review and confirm.] |
| 96 | menuLabels.Viewing Key Transaction Export | Viewing Key Transaction Export | Gbigbejade Iṣowo Viewing Key |  | [Steward: added since PR #2835; please review and confirm.] |
| 97 | menuLabels.Brave Wallet Guide | Brave Wallet Guide | Ìtọ́sọ́nà Brave Wallet |  | [Steward: added since PR #2835; please review and confirm.] |
| 98 | menuLabels.Akash Network Zcashd | Akash Network Zcashd | Nẹtiwọki Akash Zcashd |  | [Steward: added since PR #2835; please review and confirm.] |
| 99 | menuLabels.CoinHolder Directed Retroactive Grants | CoinHolder Directed Retroactive Grants | Awọn Ẹbun Ipadà Sẹ́yìn tí CoinHolder Darí |  | [Steward: added since PR #2835; please review and confirm.] |
| 100 | menuLabels.Browse all Use Zcash | Browse all Use Zcash | Browse all Use Zcash |  | [Steward: added since PR #2835; please review and confirm.] |
| 101 | menuLabels.More orgs | More orgs | More orgs |  | [Steward: added since PR #2835; please review and confirm.] |
| 102 | menuLabels.Browse all Guides | Browse all Guides | Browse all Guides |  | [Steward: added since PR #2835; please review and confirm.] |
| 103 | menuLabels.Data | Data | Data |  | [Steward: added since PR #2835; please review and confirm.] |
| 104 | menuLabels.Network | Network | Network |  | [Steward: added since PR #2835; please review and confirm.] |
| 105 | menuLabels.Ecosystem Dashboard | Ecosystem Dashboard | Ecosystem Dashboard |  | [Steward: added since PR #2835; please review and confirm.] |
| 106 | menuLabels.Protocol Parameters | Protocol Parameters | Protocol Parameters |  | [Steward: added since PR #2835; please review and confirm.] |
| 107 | menuLabels.All Visualizers | All Visualizers | All Visualizers |  | [Steward: added since PR #2835; please review and confirm.] |
| 108 | menuLabels.Network & Infrastructure | Network & Infrastructure | Network & Infrastructure |  | [Steward: added since PR #2835; please review and confirm.] |
| 109 | menuLabels.Value Pools | Value Pools | Value Pools |  | [Steward: added since PR #2835; please review and confirm.] |
| 110 | menuLabels.zk-SNARK Proofs | zk-SNARK Proofs | zk-SNARK Proofs |  | [Steward: added since PR #2835; please review and confirm.] |
| 111 | menuLabels.Consensus | Consensus | Consensus |  | [Steward: added since PR #2835; please review and confirm.] |
| 112 | menuLabels.Hash Function | Hash Function | Hash Function |  | [Steward: added since PR #2835; please review and confirm.] |
| 113 | menuLabels.Zcash Keys | Zcash Keys | Zcash Keys |  | [Steward: added since PR #2835; please review and confirm.] |
| 114 | menuLabels.Learn Zcash | Learn Zcash | Learn Zcash |  | [Steward: added since PR #2835; please review and confirm.] |
| 115 | menuLabels.Zcash Basics | Zcash Basics | Zcash Basics |  | [Steward: added since PR #2835; please review and confirm.] |
| 116 | menuLabels.Who Can See Your Payment? | Who Can See Your Payment? | Who Can See Your Payment? |  | [Steward: added since PR #2835; please review and confirm.] |
| 117 | menuLabels.New User Guide | New User Guide | New User Guide |  | [Steward: added since PR #2835; please review and confirm.] |
| 118 | menuLabels.Monetary Policy | Monetary Policy | Monetary Policy |  | [Steward: added since PR #2835; please review and confirm.] |
| 119 | menuLabels.How Zcash Is Organized | How Zcash Is Organized | How Zcash Is Organized |  | [Steward: added since PR #2835; please review and confirm.] |
| 120 | menuLabels.Zcash Evolution | Zcash Evolution | Zcash Evolution |  | [Steward: added since PR #2835; please review and confirm.] |
| 121 | menuLabels.Crosslink Protocol | Crosslink Protocol | Crosslink Protocol |  | [Steward: added since PR #2835; please review and confirm.] |
| 122 | menuLabels.Project Tachyon | Project Tachyon | Project Tachyon |  | [Steward: added since PR #2835; please review and confirm.] |
| 123 | menuLabels.Zcash Library | Zcash Library | Zcash Library |  | [Steward: added since PR #2835; please review and confirm.] |
| 124 | menuLabels.FAQ | FAQ | FAQ |  | [Steward: added since PR #2835; please review and confirm.] |
| 125 | menuLabels.Full Nodes | Full Nodes | Full Nodes |  | [Steward: added since PR #2835; please review and confirm.] |
| 126 | menuLabels.Zebra + Zallet on Raspberry Pi 4 | Zebra + Zallet on Raspberry Pi 4 | Zebra + Zallet on Raspberry Pi 4 |  | [Steward: added since PR #2835; please review and confirm.] |
| 127 | menuLabels.Zakura Node | Zakura Node | Zakura Node |  | [Steward: added since PR #2835; please review and confirm.] |
| 128 | menuLabels.Zakura on Akash | Zakura on Akash | Zakura on Akash |  | [Steward: added since PR #2835; please review and confirm.] |
| 129 | menuLabels.Chain State Explorer | Chain State Explorer | Chain State Explorer |  | [Steward: added since PR #2835; please review and confirm.] |
| 130 | menuLabels.Network Upgrades | Network Upgrades | Network Upgrades |  | [Steward: added since PR #2835; please review and confirm.] |
| 131 | menuLabels.Unified Addresses | Unified Addresses | Unified Addresses |  | [Steward: added since PR #2835; please review and confirm.] |
| 132 | menuLabels.Viewing Keys | Viewing Keys | Viewing Keys |  | [Steward: added since PR #2835; please review and confirm.] |
| 133 | menuLabels.FROST Threshold Signatures | FROST Threshold Signatures | FROST Threshold Signatures |  | [Steward: added since PR #2835; please review and confirm.] |
| 134 | menuLabels.Shielded Assets (ZSAs) | Shielded Assets (ZSAs) | Shielded Assets (ZSAs) |  | [Steward: added since PR #2835; please review and confirm.] |
| 135 | menuLabels.Post-Quantum Security | Post-Quantum Security | Post-Quantum Security |  | [Steward: added since PR #2835; please review and confirm.] |
| 136 | menuLabels.Browse all Learn Zcash | Browse all Learn Zcash | Browse all Learn Zcash |  | [Steward: added since PR #2835; please review and confirm.] |
| 137 | menuLabels.Browse all Ecosystem | Browse all Ecosystem | Browse all Ecosystem |  | [Steward: added since PR #2835; please review and confirm.] |
| 138 | menuLabels.Browse all articles | Browse all articles | Browse all articles |  | [Steward: added since PR #2835; please review and confirm.] |

## Yellow coin menu (bottom right)
(`exploreMenu`: 15 labels)

| # | ID | English | Yoruba | ✅ Confirmed | Notes |
|---:|---|---|---|---|---|
| 1 | exploreMenu.Full Explore | Full Explore | Ṣàwárí ní kíkún | Ṣàwárí ní kíkún | Preferable |
| 2 | exploreMenu.Start Here | Start Here | Bẹ̀rẹ̀ Níbí | Bẹ̀rẹ̀ Níbí | Well translated |
| 3 | exploreMenu.Tutorials | Tutorials | Àwọn ẹ̀kọ́ | Àwọn ẹ̀kọ́ | Well Translated |
| 4 | exploreMenu.Using Zcash | Using Zcash | Lílo Zcash | Lílo Zcash | Well Translated |
| 5 | exploreMenu.Guides | Guides | Àwọn ìwé atọ́nà | Àwọn Atọ́nà | “Àwọn Atọ́nà” is preferable; spelling aligned across identical menu labels. |
| 6 | exploreMenu.Zcash Tech | Zcash Tech | Zcash Tech | Ìmọ̀-Ẹ̀rọ Zcash | "Ìmọ̀-Ẹ̀rọ Zcash" means Zcash Technologyy |
| 7 | exploreMenu.Zcash Organizations | Zcash Organizations | Àwọn àjọ Zcash | Àwọn Àjọ Zcash | Well Translated \| [Steward normalization: capitalization aligned with the reviewer’s explicit form.] |
| 8 | exploreMenu.Zcash Community | Zcash Community | Ìjọ Zcash | Àwùjọ Zcash | "Àwùjọ Zcash" is more okay |
| 9 | exploreMenu.Privacy Tools | Privacy Tools | Àwọn irinṣẹ Ìpamọ́ | Àwọn Irinṣẹ́ fun Ààbò Àṣírí | "Àwọn Irinṣẹ́ fun Ààbò Àṣírí" is preferable |
| 10 | exploreMenu.Research | Research | Ìwádìí | Ìwádìí | Well Translated |
| 11 | exploreMenu.Glossary & FAQs | Glossary & FAQs | Àkójọ ọ̀rọ̀ àti FAQs | Àkójọ Ọ̀rọ̀ Ìtumọ̀ àti Àwọn Ìbéèrè Tó Wọ́pọ̀ | Both translations are correct but i prefer going with the one with shorter words which is "Àkójọ Ọ̀rọ̀ Ìtumọ̀ àti Àwọn Ìbéèrè Tó Wọ́pọ̀" |
| 12 | exploreMenu.Contribute | Contribute | Ṣètìlẹyìn | Ṣe àfikún | "Ṣe àfikún" is more preferable |
| 13 | exploreMenu.For Forks & Maintainers | For Forks & Maintainers | Fun Forks & Awọn olutọju | Fún Àwọn Forki àti Àwọn Olùtọ́jú | it's preferable to use the loanword "Forki" for "fork" |
| 14 | exploreMenu.Fork zechub-wiki | Fork zechub-wiki | Fork zechub-wiki (ìmọ̀ ọ̀rọ̀) | Forki zechub-wiki | Loanword "Forki" = "Fork" |
| 15 | exploreMenu.Fork zechub | Fork zechub | Ìdákẹ́ńkẹ́ zechub | Forki zechub | Loanword “Forki” = “Fork”. |

## Side menu on article pages
(`sideMenu`: 6 labels)

| # | ID | English | Yoruba | ✅ Confirmed | Notes |
|---:|---|---|---|---|---|
| 1 | sideMenu.navigation | Navigation | Ìtọ́sọ́nà | Ìtọ́sọ́nà | "Ìtọ́sọ́nà" is more preferable |
| 2 | sideMenu.explore | Explore | Ṣàwárí | Ṣàwárí | Well Translated |
| 3 | sideMenu.continueReading.heading | Continue reading | Continue reading |  | [Steward: added since PR #2835; please review and confirm.] |
| 4 | sideMenu.continueReading.previous | Previous | Previous |  | [Steward: added since PR #2835; please review and confirm.] |
| 5 | sideMenu.continueReading.next | Next | Next |  | [Steward: added since PR #2835; please review and confirm.] |
| 6 | sideMenu.continueReading.nextStep | Next step | Next step |  | [Steward: added since PR #2835; please review and confirm.] |

## Language menu and search buttons
(`common`: 7 labels)

| # | ID | English | Yoruba | ✅ Confirmed | Notes |
|---:|---|---|---|---|---|
| 1 | common.language | Language | Èdè |  | [Steward: added since PR #2835; please review and confirm.] |
| 2 | common.search | Search | Wíwá kiri |  | [Steward: added since PR #2835; please review and confirm.] |
| 3 | common.close | Close | Pa dé |  | [Steward: added since PR #2835; please review and confirm.] |
| 4 | common.languageSearch | Search languages | Ṣe àwárí àwọn èdè |  | [Steward: added since PR #2835; please review and confirm.] |
| 5 | common.languageSuggested | Suggested | A dámọ̀ràn |  | [Steward: added since PR #2835; please review and confirm.] |
| 6 | common.languageAll | All languages | Gbogbo awọn ede |  | [Steward: added since PR #2835; please review and confirm.] |
| 7 | common.languageNone | No language found | A ko ri ede kankan |  | [Steward: added since PR #2835; please review and confirm.] |
