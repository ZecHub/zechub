# ZecHub glossary review: Russian (`ru`)

Glossary version 2. Kit: ui.

**Как заполнять**
- **Столбец ✅:** напишите `OK`, если указанный перевод верен, `keep English`, чтобы оставить английское слово, или ваш вариант перевода. Один вариант в ячейке. Оставьте ячейку пустой, если не уверены. Не изменяйте столбец ID.
- **Столбец Notes (важно):** для каждой строки, которую вы меняете или помечаете `keep English`, своими словами коротко объясните причину, например «так говорят на местных биржах и в кошельках» или «это слово означает почтовый адрес». Пишите в Notes и тогда, когда правильное слово зависит от контекста (глагол или существительное, меню или страница), или если строка непонятна. Изменения без пояснения могут быть не приняты.

**How to fill in**

- **✅ column:** write `OK` if the shown rendering is right, `keep English` to keep the English word, or the rendering you would use. One rendering per cell. Leave it empty if you are not sure. Do not edit the ID column.
- **Notes column (important):** for every row you change or mark `keep English`, write one short line in your own words saying why, for example "this is what local exchanges and wallets use" or "this word means a street address". Also use Notes when the right word depends on the context (verb or noun, menu or page), or when a row is unclear. Changes without a note may not be accepted.

Names that stay in English in every language (brands, products, programmes) are not in these tables; they are listed in `translation/protected-terms.json`.

**Draft refresh: 2026-11-21 — no native approval implied.** Website snapshot: `264384e3212a0cda9c0b9f773ea4d4193e03b9dd`. Original row numbers and IDs are retained for reviews already in progress. Added rows use a continuation of the numbering; reply by ID where possible. Newly added rows show the actual current display separately from the proposal. Prefilled context in Notes is steward guidance, not a reviewer answer. A reviewed proposal does not change hardcoded UI text automatically.

## Conflicts to decide first

No conflicts.

## Top menu (header) and its submenus
(`navigation`: 73 labels)

| # | ID | English | Russian | ✅ Confirmed | Notes |
|---:|---|---|---|---|---|
| 1 | navigation.wallets | Wallets | Кошельки |  |  |
| 2 | navigation.guides | Guides | Руководства |  |  |
| 3 | navigation.tutorials | Tutorials | Учебные материалы |  |  |
| 4 | navigation.governance | Governance | Правительство |  |  |
| 5 | navigation.visualizer | Visualizer | Иллюстратор |  |  |
| 6 | navigation.dao | DAO | DAO |  |  |
| 7 | navigation.newsletter | Newsletter | Рассылка |  |  |
| 8 | navigation.donate | Donate | Пожертвовать |  |  |
| 9 | navigation.explore | Explore | Исследуйте |  |  |
| 10 | navigation.developers | Developers | Разработчики |  |  |
| 11 | navigation.community | Community | Сообщество |  |  |
| 12 | navigation.contribute | Contribute | Внести вклад |  |  |
| 13 | navigation.dashboard | Dashboard | Панель управления |  |  |
| 14 | navigation.more | More | Ещё |  |  |
| 15 | navigation.usingZcash.label | Use Zcash | Использовать Zcash |  |  |
| 16 | navigation.usingZcash.buyingZec | Buying ZEC | Покупка ZEC |  |  |
| 17 | navigation.usingZcash.faucets | Faucets | Краны |  |  |
| 18 | navigation.usingZcash.wallets | Wallets | Кошельки |  |  |
| 19 | navigation.usingZcash.exchanges | Exchanges | Биржи |  |  |
| 20 | navigation.usingZcash.blockExplorers | Block Explorers | Обозреватели блоков |  |  |
| 21 | navigation.usingZcash.shieldedPools | Shielded Pools | Защищённые пулы |  |  |
| 22 | navigation.usingZcash.transparentExchangeAddresses | Transparent Exchange Addresses | Прозрачные адреса бирж |  |  |
| 23 | navigation.usingZcash.transactions | Transactions | Транзакции |  |  |
| 24 | navigation.usingZcash.memos | Memos | Мемо |  |  |
| 25 | navigation.usingZcash.mobileTopUps | Mobile Top Ups | Пополнение мобильного |  |  |
| 26 | navigation.usingZcash.paymentRequestUris | Payment Request URIs | URI запросов на оплату |  |  |
| 27 | navigation.usingZcash.paymentProcessors | Payment Processors | Платёжные процессоры |  |  |
| 28 | navigation.usingZcash.recoveringFunds | Recovering Funds | Возврат средств |  |  |
| 29 | navigation.usingZcash.tools | Tools | Инструменты |  |  |
| 30 | navigation.usingZcash.useCases | Use Cases | Сценарии использования |  |  |
| 31 | navigation.usingZcash.useCasesSubmenu.startHere | Start Here | Начните здесь |  |  |
| 32 | navigation.usingZcash.useCasesSubmenu.acceptPayments | Accept Payments | Принимайте платежи |  |  |
| 33 | navigation.usingZcash.useCasesSubmenu.freelancePrivacy | Freelance Privacy | Конфиденциальность для фрилансеров |  |  |
| 34 | navigation.usingZcash.useCasesSubmenu.journalistPrivacy | Journalist Privacy | Конфиденциальность для журналистов |  |  |
| 35 | navigation.usingZcash.useCasesSubmenu.keepingRecords | Keeping Records | Ведение записей |  |  |
| 36 | navigation.usingZcash.useCasesSubmenu.privateCommunityTreasury | Private Community Treasury | Приватное казначейство сообщества |  |  |
| 37 | navigation.usingZcash.useCasesSubmenu.donations | Donations | Пожертвования |  |  |
| 38 | navigation.usingZcash.useCasesSubmenu.sendMoneyPrivately | Send Money Privately | Отправляйте деньги конфиденциально |  |  |
| 39 | navigation.zcashCommunity.label | Ecosystem | Экосистема |  |  |
| 40 | navigation.zcashCommunity.communityBlogs | Community Blogs | Блоги сообщества |  |  |
| 41 | navigation.zcashCommunity.communityLinks | Community Links | Ссылки сообщества |  |  |
| 42 | navigation.zcashCommunity.communityForum | Community Forum | Форум сообщества |  |  |
| 43 | navigation.zcashCommunity.communityProjects | Community Projects | Проекты сообщества |  |  |
| 44 | navigation.zcashCommunity.zcashMedia | Zcash Media | Медиа Zcash |  |  |
| 45 | navigation.zcashCommunity.zcashPodcasts | Zcash Podcasts | Подкасты Zcash |  |  |
| 46 | navigation.zcashCommunity.ecosystemSecurity | Zcash Ecosystem Security | Безопасность экосистемы Zcash |  |  |
| 47 | navigation.zcashCommunity.cypherpunkZeroNFT | Cypherpunk Zero NFT | Cypherpunk Zero NFT |  |  |
| 48 | navigation.zcashCommunity.zconArchive | Zcon Archive | Архив Zcon |  |  |
| 49 | navigation.organizations.label | Organizations | Организации |  |  |
| 50 | navigation.organizations.brand | Brand | Бренд |  |  |
| 51 | navigation.organizations.coinholderDirectedRetroactiveGrants | CoinHolder Directed Retroactive Grants | Ретроактивные гранты, направляемые CoinHolder |  |  |
| 52 | navigation.guidesSubmenu.zgoPaymentProcessor | Zgo Payment Processor | Платежный процессор Zgo |  |  |
| 53 | navigation.guidesSubmenu.free2zLive | Free2z Live | Free2z Live |  |  |
| 54 | navigation.guidesSubmenu.nymVpn | Nym VPN | Nym VPN |  |  |
| 55 | navigation.guidesSubmenu.usingZecInDefi | Using ZEC in DeFi | Использование ZEC в DeFi |  |  |
| 56 | navigation.guidesSubmenu.usingZecPrivately | Using ZEC Privately | Приватное использование ZEC |  |  |
| 57 | navigation.guidesSubmenu.raspberryPiZcashdNode | Raspberry Pi Zcashd Node | Узел Raspberry Pi Zcashd |  |  |
| 58 | navigation.guidesSubmenu.raspberryPi5ZebraLightwalletdZingo | Raspberry pi5 Zebra Lightwalletd Zingo | Raspberry pi5 Zebra Lightwalletd Zingo |  |  |
| 59 | navigation.guidesSubmenu.raspberryPiZebraNode | Raspberry Pi Zebra Node | Узел Raspberry Pi Zebra |  |  |
| 60 | navigation.guidesSubmenu.akashNetwork | Akash Network | Akash Network |  |  |
| 61 | navigation.guidesSubmenu.avalancheRedbridge | Avalanche RedBridge | Avalanche RedBridge |  |  |
| 62 | navigation.guidesSubmenu.zkoolMultisig | Zkool Multisig | Zkool Multisig |  |  |
| 63 | navigation.guidesSubmenu.ywalletFrostDemo | Ywallet FROST Demo | Демо Ywallet FROST |  |  |
| 64 | navigation.guidesSubmenu.blockchainExplorers | Blockchain Explorers | Обозреватели блокчейна |  |  |
| 65 | navigation.guidesSubmenu.btcPayServerPlugin | BTCPayServer Plugin | Плагин BTCPayServer |  |  |
| 66 | navigation.guidesSubmenu.visualizingZcashNetwork | Visualizing the Zcash Network | Визуализация сети Zcash |  |  |
| 67 | navigation.guidesSubmenu.visualizingZcashAddresses | Visualizing Zcash Addresses | Визуализация адресов Zcash |  |  |
| 68 | navigation.guidesSubmenu.zcashImprovementProposals | Zcash Improvement Proposals | Zcash Improvement Proposals |  |  |
| 69 | navigation.guidesSubmenu.zingolibAndZainoTutorial | Zingolib and Zaino Tutorial | Учебник по Zingolib и Zaino |  |  |
| 70 | navigation.guidesSubmenu.zenithInstallation | Zenith Installation | Установка Zenith |  |  |
| 71 | navigation.guidesSubmenu.zeroKnowledgeVsDecoys | Zero Knowledge vs Decoy Systems | Нулевое разглашение против систем-обманок |  |  |
| 72 | navigation.overview | Overview | Обзор |  |  |
| 73 | navigation.shop | Shop | Магазин |  |  |

## Submenu entries (page names in the menus)
(`menuLabels`: 81 labels)

| # | ID | English | Russian | ✅ Confirmed | Notes |
|---:|---|---|---|---|---|
| 1 | menuLabels.Accept Payments | Accept Payments | Принимать платежи |  |  |
| 2 | menuLabels.Akash Network Zebra | Zebra on Akash | Akash Network Zebra |  |  |
| 3 | menuLabels.Avalanche RedBridge | Avalanche RedBridge | Avalanche RedBridge |  |  |
| 4 | menuLabels.BTCPayServer Zcash Plugin | BTCPayServer Zcash Plugin | Плагин Zcash для BTCPayServer |  |  |
| 5 | menuLabels.Blockchain Explorers | Blockchain Explorers | Обозреватели блокчейна |  |  |
| 6 | menuLabels.Brand | Brand | Бренд |  |  |
| 7 | menuLabels.Buying ZEC | Buying ZEC | Покупка ZEC |  |  |
| 8 | menuLabels.Community Blogs | Community Blogs | Блоги сообщества |  |  |
| 9 | menuLabels.Community Forum | Community Forum | Форум сообщества |  |  |
| 10 | menuLabels.Community Links | Community Links | Ссылки сообщества |  |  |
| 11 | menuLabels.Community Projects | Community Projects | Проекты сообщества |  |  |
| 12 | menuLabels.Contribute | Contribute | Внести вклад |  |  |
| 13 | menuLabels.Cypherpunk Zero NFT | Cypherpunk Zero NFT | Cypherpunk Zero NFT |  |  |
| 14 | menuLabels.DAO | DAO | DAO |  |  |
| 15 | menuLabels.Developers | Developers | Разработчики |  |  |
| 16 | menuLabels.Donations | Donations | Пожертвования |  |  |
| 17 | menuLabels.Exchanges | Exchanges | Биржи |  |  |
| 18 | menuLabels.Extras | Extras | Дополнительно |  |  |
| 19 | menuLabels.Faucets | Faucets | Краны |  |  |
| 20 | menuLabels.Free2z Live | Free2z Live | Free2z Live |  |  |
| 21 | menuLabels.Freelance Privacy | Freelance Privacy | Freelance Privacy |  |  |
| 22 | menuLabels.Governance | Governance | Управление |  |  |
| 23 | menuLabels.Guides | Guides | Руководства |  |  |
| 24 | menuLabels.How to Participate | How to Participate | Как участвовать |  |  |
| 25 | menuLabels.Journalist Privacy | Journalist Privacy | Конфиденциальность журналов |  |  |
| 26 | menuLabels.Keeping Records | Keeping Records | Ведение записей |  |  |
| 27 | menuLabels.Memos | Memos | Заметки |  |  |
| 28 | menuLabels.Mobile Top Ups | Mobile Top Ups | Пополнение мобильного |  |  |
| 29 | menuLabels.Newsletter | Newsletter | Новостная рассылка |  |  |
| 30 | menuLabels.Nym VPN | Nym VPN | Nym VPN |  |  |
| 31 | menuLabels.Payment Processors | Payment Processors | Платёжные процессоры |  |  |
| 32 | menuLabels.Payment Request URIs | Payment Request URIs | URI запросов на оплату |  |  |
| 33 | menuLabels.Podcast | Podcast | Подкаст |  |  |
| 34 | menuLabels.Private Community Treasury | Private Community Treasury | Частное общественное казначейство |  |  |
| 35 | menuLabels.Raspberry Pi 4 Full Node | Zebra + Zallet on Raspberry Pi 4 | Полный узел Raspberry Pi 4 |  |  |
| 36 | menuLabels.Raspberry pi 4 Zebra Node | Zebra on Raspberry Pi 4 | Узел Zebra на Raspberry Pi 4 |  |  |
| 37 | menuLabels.Raspberry pi5 Zebra Lightwalletd Zingo | Zebra stack on Raspberry Pi 5 | Raspberry pi5 Zebra Lightwalletd Zingo |  |  |
| 38 | menuLabels.Recovering Funds | Recovering Funds | Восстановление средств |  |  |
| 39 | menuLabels.Research | Research | Исследования |  |  |
| 40 | menuLabels.Send Money Privately | Send Money Privately | Отправляйте деньги конфиденциально |  |  |
| 41 | menuLabels.Shielded Pools | Shielded Pools | Shielded Pools |  |  |
| 42 | menuLabels.Sitemap | Sitemap | Карта сайта |  |  |
| 43 | menuLabels.Start Here | Start Here | Начните здесь |  |  |
| 44 | menuLabels.Store | Store | Магазин |  |  |
| 45 | menuLabels.Tools | Tools | Инструменты |  |  |
| 46 | menuLabels.Transactions | Transactions | Транзакции |  |  |
| 47 | menuLabels.Transparent Exchange Addresses | Transparent Exchange Addresses | Прозрачные адреса бирж |  |  |
| 48 | menuLabels.Tutorials | Tutorials | Руководства |  |  |
| 49 | menuLabels.Use Cases | Use Cases | Сценарии использования |  |  |
| 50 | menuLabels.Using ZEC Privately | Using ZEC Privately | Приватное использование ZEC |  |  |
| 51 | menuLabels.Using ZEC in DeFi | Using ZEC in DeFi | Использование ZEC в DeFi |  |  |
| 52 | menuLabels.Using Zcash | Using Zcash | Использование Zcash |  |  |
| 53 | menuLabels.Visual Identity | Visual Identity | Визуальная идентичность |  |  |
| 54 | menuLabels.Visualizer | Visualizer | Визуализатор |  |  |
| 55 | menuLabels.Visualizing Zcash Addresses | Visualizing Zcash Addresses | Визуализация адресов Zcash |  |  |
| 56 | menuLabels.Visualizing the Zcash Network | Visualizing the Zcash Network | Визуализация сети Zcash |  |  |
| 57 | menuLabels.Wallets | Wallets | Кошельки |  |  |
| 58 | menuLabels.Ywallet FROST Demo | Ywallet FROST Demo | Демонстрация Ywallet FROST |  |  |
| 59 | menuLabels.ZIPs & Grants | ZIPs & Grants | ZIP и гранты |  |  |
| 60 | menuLabels.Zcash Community | Zcash Community | Сообщество Zcash |  |  |
| 61 | menuLabels.Zcash Ecosystem Security | Zcash Ecosystem Security | Безопасность экосистемы Zcash |  |  |
| 62 | menuLabels.Zcash Governance | Zcash Governance | Управление Zcash |  |  |
| 63 | menuLabels.Zcash Improvement Proposals | Zcash Improvement Proposals | Предложения по улучшению Zcash |  |  |
| 64 | menuLabels.Zcash Media | Zcash Media | Медиа Zcash |  |  |
| 65 | menuLabels.Zcash Organizations | Zcash Organizations | Организации Zcash |  |  |
| 66 | menuLabels.Zcash Podcasts | Zcash Podcasts | Подкасты Zcash |  |  |
| 67 | menuLabels.Zcon Archive | Zcon Archive | Архив Zcon |  |  |
| 68 | menuLabels.Zcon Vozes Archive | Zcon Vozes Archive | Архив Zcon Vozes |  |  |
| 69 | menuLabels.Zenith Installation | Zenith Installation | Установка Zenith |  |  |
| 70 | menuLabels.Zero-Knowledge vs Decoys | Zero-Knowledge vs Decoys | Нулевое разглашение против приманок |  |  |
| 71 | menuLabels.Zgo Payment Processor | Zgo Payment Processor | Платёжный процессор Zgo |  |  |
| 72 | menuLabels.Zingolib and Zaino Tutorial | Zingolib and Zaino Tutorial | Руководство по Zingolib и Zaino |  |  |
| 73 | menuLabels.Zkool Multisig | Zkool Multisig | Мультиподпись Zkool |  |  |
| 74 | menuLabels.Custodial Exchanges | Custodial Exchanges | Кастодиальные биржи |  |  |
| 75 | menuLabels.Zcash Use Cases | Zcash Use Cases | Сценарии использования Zcash |  |  |
| 76 | menuLabels.Zcash Tech | Zcash Tech | Технологии Zcash |  |  |
| 77 | menuLabels.Privacy Tools | Privacy Tools | Инструменты конфиденциальности |  |  |
| 78 | menuLabels.Glossary & FAQ's | Glossary & FAQ's | Глоссарий и FAQ's |  |  |
| 79 | menuLabels.Pay for AI | Pay for AI | Оплата ИИ |  |  |
| 80 | menuLabels.Community Building | Community Building | Community Building |  |  |
| 81 | menuLabels.Nym Mixnet Wallet Setup | Nym Mixnet Wallet Setup | Nym Mixnet Wallet Setup |  |  |

## Yellow coin menu (bottom right)
(`exploreMenu`: 15 labels)

| # | ID | English | Russian | ✅ Confirmed | Notes |
|---:|---|---|---|---|---|
| 1 | exploreMenu.Full Explore | Full Explore | Полное исследование |  |  |
| 2 | exploreMenu.Start Here | Start Here | Начните здесь |  |  |
| 3 | exploreMenu.Tutorials | Tutorials | Учебные материалы |  |  |
| 4 | exploreMenu.Using Zcash | Using Zcash | Использование Zcash |  |  |
| 5 | exploreMenu.Guides | Guides | Руководства |  |  |
| 6 | exploreMenu.Zcash Tech | Zcash Tech | Технологии Zcash |  |  |
| 7 | exploreMenu.Zcash Organizations | Zcash Organizations | Организации Zcash |  |  |
| 8 | exploreMenu.Zcash Community | Zcash Community | Сообщество Zcash |  |  |
| 9 | exploreMenu.Privacy Tools | Privacy Tools | Инструменты конфиденциальности |  |  |
| 10 | exploreMenu.Research | Research | Исследования |  |  |
| 11 | exploreMenu.Glossary & FAQs | Glossary & FAQs | Глоссарий и часто задаваемые вопросы |  |  |
| 12 | exploreMenu.Contribute | Contribute | Внести вклад |  |  |
| 13 | exploreMenu.For Forks & Maintainers | For Forks & Maintainers | Для форков и сопровождающих |  |  |
| 14 | exploreMenu.Fork zechub-wiki | Fork zechub-wiki | Форк zechub-wiki |  |  |
| 15 | exploreMenu.Fork zechub | Fork zechub | Форк zechub |  |  |

## Side menu on article pages
(`sideMenu`: 2 labels)

| # | ID | English | Russian | ✅ Confirmed | Notes |
|---:|---|---|---|---|---|
| 1 | sideMenu.navigation | Navigation | Навигация |  |  |
| 2 | sideMenu.explore | Explore | Обзор |  |  |

## New or previously missing dictionary menu rows
(`frontend`: 69 labels)

| # | ID | English | Displayed now | Proposed | ✅ Confirmed | Notes |
|---:|---|---|---|---|---|---|
| 172 | menuLabels.Use Zcash | Use Zcash | Использовать Zcash | Использовать Zcash |  | Context (not reviewer answer): Current website/dictionary rendering (not native-approved). |
| 173 | menuLabels.Block Explorers | Block Explorers | Обозреватели блоков | Обозреватели блоков |  | Context (not reviewer answer): Current website/dictionary rendering (not native-approved). |
| 174 | menuLabels.Ecosystem | Ecosystem | Экосистема | Экосистема |  | Context (not reviewer answer): Current website/dictionary rendering (not native-approved). |
| 175 | menuLabels.Raspberry Pi Zcashd Node | Raspberry Pi Zcashd Node | Узел Zcashd на Raspberry Pi | Узел Zcashd на Raspberry Pi |  | Context (not reviewer answer): Current website/dictionary rendering (not native-approved). |
| 176 | menuLabels.Raspberry Pi Zebra Node | Raspberry Pi Zebra Node | Узел Zebra на Raspberry Pi | Узел Zebra на Raspberry Pi |  | Context (not reviewer answer): Current website/dictionary rendering (not native-approved). |
| 177 | menuLabels.Zero Knowledge vs Decoy Systems | Zero Knowledge vs Decoy Systems | Нулевое разглашение против систем-приманок | Нулевое разглашение против систем-приманок |  | Context (not reviewer answer): Current website/dictionary rendering (not native-approved). |
| 178 | menuLabels.Organizations | Organizations | Организации | Организации |  | Context (not reviewer answer): Current website/dictionary rendering (not native-approved). |
| 179 | menuLabels.Zallet Quick Reference Guide | Zallet Quick Reference Guide | Zallet Quick Reference Guide | Zallet Quick Reference Guide |  | Context (not reviewer answer): Current English fallback/placeholder; native rendering or explicit keep-English decision needed. |
| 180 | menuLabels.Spend Zcash | Spend Zcash | Потратить Zcash | Потратить Zcash |  | Context (not reviewer answer): Current website/dictionary rendering (not native-approved). |
| 181 | menuLabels.Places to Spend ZEC | Places to Spend ZEC | Где потратить ZEC | Где потратить ZEC |  | Context (not reviewer answer): Current website/dictionary rendering (not native-approved). |
| 182 | menuLabels.Free2Z Livestreaming | Free2Z Livestreaming | Free2Z Прямые трансляции | Free2Z Прямые трансляции |  | Context (not reviewer answer): Current website/dictionary rendering (not native-approved). |
| 183 | menuLabels.Hardened Zebrad | Hardened Zebrad | Защищённый Zebrad | Защищённый Zebrad |  | Context (not reviewer answer): Current website/dictionary rendering (not native-approved). |
| 184 | menuLabels.Migration Guide Zcashd To Zebrad Zallet | Migration Guide Zcashd To Zebrad Zallet | Руководство по миграции с Zcashd на Zebrad Zallet | Руководство по миграции с Zcashd на Zebrad Zallet |  | Context (not reviewer answer): Current website/dictionary rendering (not native-approved). |
| 185 | menuLabels.My First Zcash Workbook | My First Zcash Workbook | Моя первая рабочая тетрадь по Zcash | Моя первая рабочая тетрадь по Zcash |  | Context (not reviewer answer): Current website/dictionary rendering (not native-approved). |
| 186 | menuLabels.Verifying Zcash Releases | Verifying Zcash Releases | Проверка релизов Zcash | Проверка релизов Zcash |  | Context (not reviewer answer): Current website/dictionary rendering (not native-approved). |
| 187 | menuLabels.Viewing Key Transaction Export | Viewing Key Transaction Export | Экспорт транзакций Viewing Key | Экспорт транзакций Viewing Key |  | Context (not reviewer answer): Current website/dictionary rendering (not native-approved). |
| 188 | menuLabels.Brave Wallet Guide | Brave Wallet Guide | Руководство по Brave Wallet | Руководство по Brave Wallet |  | Context (not reviewer answer): Current website/dictionary rendering (not native-approved). |
| 189 | menuLabels.Akash Network Zcashd | Akash Network Zcashd | Akash Network Zcashd | Akash Network Zcashd |  | Context (not reviewer answer): Current English fallback/placeholder; native rendering or explicit keep-English decision needed. |
| 190 | menuLabels.CoinHolder Directed Retroactive Grants | CoinHolder Directed Retroactive Grants | Ретроактивные гранты, направляемые CoinHolder | Ретроактивные гранты, направляемые CoinHolder |  | Context (not reviewer answer): Current website/dictionary rendering (not native-approved). |
| 191 | menuLabels.Browse all Use Zcash | Browse all Use Zcash | Browse all Use Zcash | Всё об использовании Zcash |  | Context (not reviewer answer): Coordinator/AI draft suggestion, not native-approved. |
| 192 | menuLabels.More orgs | More orgs | More orgs | Другие организации |  | Context (not reviewer answer): Coordinator/AI draft suggestion, not native-approved. |
| 193 | menuLabels.Browse all Guides | Browse all Guides | Browse all Guides | Все руководства |  | Context (not reviewer answer): Coordinator/AI draft suggestion, not native-approved. |
| 194 | menuLabels.Data | Data | Data | Data |  | Context (not reviewer answer): Current English fallback/placeholder; native rendering or explicit keep-English decision needed. |
| 195 | menuLabels.Network | Network | Network | Сеть |  | Context (not reviewer answer): Coordinator/AI draft suggestion, not native-approved. |
| 196 | menuLabels.Ecosystem Dashboard | Ecosystem Dashboard | Ecosystem Dashboard | Ecosystem Dashboard |  | Context (not reviewer answer): Current English fallback/placeholder; native rendering or explicit keep-English decision needed. |
| 197 | menuLabels.Protocol Parameters | Protocol Parameters | Protocol Parameters | Protocol Parameters |  | Context (not reviewer answer): Current English fallback/placeholder; native rendering or explicit keep-English decision needed. |
| 198 | menuLabels.All Visualizers | All Visualizers | All Visualizers | All Visualizers |  | Context (not reviewer answer): Current English fallback/placeholder; native rendering or explicit keep-English decision needed. |
| 199 | menuLabels.Network & Infrastructure | Network & Infrastructure | Network & Infrastructure | Сеть и инфраструктура |  | Context (not reviewer answer): Coordinator/AI draft suggestion, not native-approved. |
| 200 | menuLabels.Value Pools | Value Pools | Value Pools | Value Pools |  | Context (not reviewer answer): Current English fallback/placeholder; native rendering or explicit keep-English decision needed. |
| 201 | menuLabels.zk-SNARK Proofs | zk-SNARK Proofs | zk-SNARK Proofs | zk-SNARK Proofs |  | Context (not reviewer answer): Current English fallback/placeholder; native rendering or explicit keep-English decision needed. |
| 202 | menuLabels.Consensus | Consensus | Consensus | Консенсус |  | Context (not reviewer answer): Reuses current same-label dictionary wording (not native-approved). |
| 203 | menuLabels.Hash Function | Hash Function | Hash Function | Hash Function |  | Context (not reviewer answer): Current English fallback/placeholder; native rendering or explicit keep-English decision needed. |
| 204 | menuLabels.Zcash Keys | Zcash Keys | Zcash Keys | Ключи Zcash |  | Context (not reviewer answer): Reuses current same-label dictionary wording (not native-approved). |
| 205 | menuLabels.Learn Zcash | Learn Zcash | Learn Zcash | Изучить Zcash |  | Context (not reviewer answer): Coordinator/AI draft suggestion, not native-approved. |
| 206 | menuLabels.Zcash Basics | Zcash Basics | Zcash Basics | Zcash Basics |  | Context (not reviewer answer): Current English fallback/placeholder; native rendering or explicit keep-English decision needed. |
| 207 | menuLabels.Who Can See Your Payment? | Who Can See Your Payment? | Who Can See Your Payment? | Who Can See Your Payment? |  | Context (not reviewer answer): Current English fallback/placeholder; native rendering or explicit keep-English decision needed. |
| 208 | menuLabels.New User Guide | New User Guide | New User Guide | Руководство для новых пользователей |  | Context (not reviewer answer): Reuses current same-label dictionary wording (not native-approved). |
| 209 | menuLabels.Monetary Policy | Monetary Policy | Monetary Policy | Monetary Policy |  | Context (not reviewer answer): Current English fallback/placeholder; native rendering or explicit keep-English decision needed. |
| 210 | menuLabels.How Zcash Is Organized | How Zcash Is Organized | How Zcash Is Organized | How Zcash Is Organized |  | Context (not reviewer answer): Current English fallback/placeholder; native rendering or explicit keep-English decision needed. |
| 211 | menuLabels.Zcash Evolution | Zcash Evolution | Zcash Evolution | Zcash Evolution |  | Context (not reviewer answer): Current English fallback/placeholder; native rendering or explicit keep-English decision needed. |
| 212 | menuLabels.Crosslink Protocol | Crosslink Protocol | Crosslink Protocol | Crosslink Protocol |  | Context (not reviewer answer): Current English fallback/placeholder; native rendering or explicit keep-English decision needed. |
| 213 | menuLabels.Project Tachyon | Project Tachyon | Project Tachyon | Project Tachyon |  | Context (not reviewer answer): Current English fallback/placeholder; native rendering or explicit keep-English decision needed. |
| 214 | menuLabels.Zcash Library | Zcash Library | Zcash Library | Zcash Library |  | Context (not reviewer answer): Current English fallback/placeholder; native rendering or explicit keep-English decision needed. |
| 215 | menuLabels.FAQ | FAQ | FAQ | FAQ |  | Context (not reviewer answer): Current English fallback/placeholder; native rendering or explicit keep-English decision needed. |
| 216 | menuLabels.Full Nodes | Full Nodes | Full Nodes | Full Nodes |  | Context (not reviewer answer): Current English fallback/placeholder; native rendering or explicit keep-English decision needed. |
| 217 | menuLabels.Zebra + Zallet on Raspberry Pi 4 | Zebra + Zallet on Raspberry Pi 4 | Zebra + Zallet on Raspberry Pi 4 | Полный узел Raspberry Pi 4 |  | Context (not reviewer answer): Reuses current same-label dictionary wording (not native-approved). |
| 218 | menuLabels.Zakura Node | Zakura Node | Zakura Node | Zakura Node |  | Context (not reviewer answer): Current English fallback/placeholder; native rendering or explicit keep-English decision needed. |
| 219 | menuLabels.Zakura on Akash | Zakura on Akash | Zakura on Akash | Zakura on Akash |  | Context (not reviewer answer): Current English fallback/placeholder; native rendering or explicit keep-English decision needed. |
| 220 | menuLabels.Chain State Explorer | Chain State Explorer | Chain State Explorer | Chain State Explorer |  | Context (not reviewer answer): Current English fallback/placeholder; native rendering or explicit keep-English decision needed. |
| 221 | menuLabels.Network Upgrades | Network Upgrades | Network Upgrades | Обновления сети |  | Context (not reviewer answer): Reuses current same-label dictionary wording (not native-approved). |
| 222 | menuLabels.Unified Addresses | Unified Addresses | Unified Addresses | Unified Addresses |  | Context (not reviewer answer): Current English fallback/placeholder; native rendering or explicit keep-English decision needed. |
| 223 | menuLabels.Viewing Keys | Viewing Keys | Viewing Keys | Viewing Keys |  | Context (not reviewer answer): Current English fallback/placeholder; native rendering or explicit keep-English decision needed. |
| 224 | menuLabels.FROST Threshold Signatures | FROST Threshold Signatures | FROST Threshold Signatures | FROST Threshold Signatures |  | Context (not reviewer answer): Current English fallback/placeholder; native rendering or explicit keep-English decision needed. |
| 225 | menuLabels.Shielded Assets (ZSAs) | Shielded Assets (ZSAs) | Shielded Assets (ZSAs) | Shielded Assets (ZSAs) |  | Context (not reviewer answer): Current English fallback/placeholder; native rendering or explicit keep-English decision needed. |
| 226 | menuLabels.Post-Quantum Security | Post-Quantum Security | Post-Quantum Security | Post-Quantum Security |  | Context (not reviewer answer): Current English fallback/placeholder; native rendering or explicit keep-English decision needed. |
| 227 | menuLabels.Browse all Learn Zcash | Browse all Learn Zcash | Browse all Learn Zcash | Все материалы о Zcash |  | Context (not reviewer answer): Coordinator/AI draft suggestion, not native-approved. |
| 228 | menuLabels.Browse all Ecosystem | Browse all Ecosystem | Browse all Ecosystem | Вся экосистема |  | Context (not reviewer answer): Coordinator/AI draft suggestion, not native-approved. |
| 229 | menuLabels.Browse all articles | Browse all articles | Browse all articles | Все статьи |  | Context (not reviewer answer): Coordinator/AI draft suggestion, not native-approved. |
| 230 | sideMenu.continueReading.heading | Continue reading | Продолжить чтение | Продолжить чтение |  | Context (not reviewer answer): Current website/dictionary rendering (not native-approved). |
| 231 | sideMenu.continueReading.previous | Previous | Назад | Назад |  | Context (not reviewer answer): Current website/dictionary rendering (not native-approved). |
| 232 | sideMenu.continueReading.next | Next | Далее | Далее |  | Context (not reviewer answer): Current website/dictionary rendering (not native-approved). |
| 233 | sideMenu.continueReading.nextStep | Next step | Следующий шаг | Следующий шаг |  | Context (not reviewer answer): Current website/dictionary rendering (not native-approved). |
| 234 | common.language | Language | Язык | Язык |  | Context (not reviewer answer): Current website/dictionary rendering (not native-approved). |
| 235 | common.search | Search | Поиск | Поиск |  | Context (not reviewer answer): Current website/dictionary rendering (not native-approved). |
| 236 | common.close | Close | Закрыть | Закрыть |  | Context (not reviewer answer): Current website/dictionary rendering (not native-approved). |
| 237 | common.languageSearch | Search languages | Поиск языков | Поиск языков |  | Context (not reviewer answer): Current website/dictionary rendering (not native-approved). |
| 238 | common.languageSuggested | Suggested | Рекомендуемые | Рекомендуемые |  | Context (not reviewer answer): Current website/dictionary rendering (not native-approved). |
| 239 | common.languageAll | All languages | Все языки | Все языки |  | Context (not reviewer answer): Current website/dictionary rendering (not native-approved). |
| 240 | common.languageNone | No language found | Язык не найден | Язык не найден |  | Context (not reviewer answer): Current website/dictionary rendering (not native-approved). |

## Current header aliases, group headings and source-only menu labels
(`frontend`: 66 labels)

| # | ID | English | Displayed now | Proposed | ✅ Confirmed | Notes |
|---:|---|---|---|---|---|---|
| 241 | menuLabels.Start here | Start here | Start here | Начните здесь |  | Context (not reviewer answer): Reuses current same-label dictionary wording (not native-approved). Display is selected by src/constants/navigation.ts / GroupedLinks. |
| 242 | menuLabels.How Zcash works | How Zcash works | How Zcash works | Как работает Zcash |  | Context (not reviewer answer): Coordinator/AI draft suggestion, not native-approved. Display is selected by src/constants/navigation.ts / GroupedLinks. |
| 243 | menuLabels.Go deeper | Go deeper | Go deeper | Узнать больше |  | Context (not reviewer answer): Reuses current same-label dictionary wording (not native-approved). Display is selected by src/constants/navigation.ts / GroupedLinks. |
| 244 | menuLabels.Visualize | Visualize | Visualize | Визуализации |  | Context (not reviewer answer): Coordinator/AI draft suggestion, not native-approved. Display is selected by src/constants/navigation.ts / GroupedLinks. |
| 245 | menuLabels.Reference | Reference | Reference | Справочник |  | Context (not reviewer answer): Coordinator/AI draft suggestion, not native-approved. Display is selected by src/constants/navigation.ts / GroupedLinks. |
| 246 | menuLabels.More | More | More | Ещё |  | Context (not reviewer answer): Reuses current same-label dictionary wording (not native-approved). Display is selected by src/constants/navigation.ts / GroupedLinks. |
| 247 | menuLabels.Get started | Get started | Get started | Начать |  | Context (not reviewer answer): Reuses current same-label dictionary wording (not native-approved). Display is selected by src/constants/navigation.ts / GroupedLinks. |
| 248 | menuLabels.Spend & pay | Spend & pay | Spend & pay | Покупки и платежи |  | Context (not reviewer answer): Coordinator/AI draft suggestion, not native-approved. Display is selected by src/constants/navigation.ts / GroupedLinks. |
| 249 | menuLabels.Understand | Understand | Understand | Разобраться |  | Context (not reviewer answer): Coordinator/AI draft suggestion, not native-approved. Display is selected by src/constants/navigation.ts / GroupedLinks. |
| 250 | menuLabels.Community | Community | Community | Сообщество |  | Context (not reviewer answer): Reuses current same-label dictionary wording (not native-approved). Display is selected by src/constants/navigation.ts / GroupedLinks. |
| 251 | menuLabels.Media & events | Media & events | Media & events | Медиа и мероприятия |  | Context (not reviewer answer): Coordinator/AI draft suggestion, not native-approved. Display is selected by src/constants/navigation.ts / GroupedLinks. |
| 252 | menuLabels.Organizations & governance | Organizations & governance | Organizations & governance | Организации и управление |  | Context (not reviewer answer): Coordinator/AI draft suggestion, not native-approved. Display is selected by src/constants/navigation.ts / GroupedLinks. |
| 253 | menuLabels.Live data | Live data | Live data | Данные в реальном времени |  | Context (not reviewer answer): Coordinator/AI draft suggestion, not native-approved. Display is selected by src/constants/navigation.ts / GroupedLinks. |
| 254 | menuLabels.Protocol | Protocol | Protocol | Протокол |  | Context (not reviewer answer): Coordinator/AI draft suggestion, not native-approved. Display is selected by src/constants/navigation.ts / GroupedLinks. |
| 255 | menuLabels.Cryptography | Cryptography | Cryptography | Криптография |  | Context (not reviewer answer): Coordinator/AI draft suggestion, not native-approved. Display is selected by src/constants/navigation.ts / GroupedLinks. |
| 256 | menuLabels.Addresses & assets | Addresses & assets | Addresses & assets | Адреса и активы |  | Context (not reviewer answer): Coordinator/AI draft suggestion, not native-approved. Display is selected by src/constants/navigation.ts / GroupedLinks. |
| 257 | menuLabels.Run a node | Run a node | Run a node | Запустить ноду |  | Context (not reviewer answer): Coordinator/AI draft suggestion, not native-approved. Display is selected by src/constants/navigation.ts / GroupedLinks. |
| 258 | menuLabels.Upgrade & verify | Upgrade & verify | Upgrade & verify | Обновление и проверка |  | Context (not reviewer answer): Coordinator/AI draft suggestion, not native-approved. Display is selected by src/constants/navigation.ts / GroupedLinks. |
| 259 | menuLabels.Wallets & signing | Wallets & signing | Wallets & signing | Кошельки и подпись |  | Context (not reviewer answer): Coordinator/AI draft suggestion, not native-approved. Display is selected by src/constants/navigation.ts / GroupedLinks. |
| 260 | menuLabels.Privacy & networks | Privacy & networks | Privacy & networks | Конфиденциальность и сети |  | Context (not reviewer answer): Coordinator/AI draft suggestion, not native-approved. Display is selected by src/constants/navigation.ts / GroupedLinks. |
| 261 | menuLabels.Payments & creators | Payments & creators | Payments & creators | Платежи и авторы |  | Context (not reviewer answer): Coordinator/AI draft suggestion, not native-approved. Display is selected by src/constants/navigation.ts / GroupedLinks. |
| 262 | menuLabels.DeFi & swaps | DeFi & swaps | DeFi & swaps | DeFi и обмены |  | Context (not reviewer answer): Coordinator/AI draft suggestion, not native-approved. Display is selected by src/constants/navigation.ts / GroupedLinks. |
| 263 | menuLabels.Developer tools | Developer tools | Developer tools | Инструменты разработчика |  | Context (not reviewer answer): Coordinator/AI draft suggestion, not native-approved. Display is selected by src/constants/navigation.ts / GroupedLinks. |
| 264 | menuLabels.Getting started | Getting started | Getting started | Начало работы |  | Context (not reviewer answer): Coordinator/AI draft suggestion, not native-approved. Display is selected by src/constants/readingPaths.ts / SideMenu. |
| 265 | frontend.readingNextGroup.Wallets and hardware | Wallets and hardware | Wallets and hardware | Кошельки и оборудование |  | Context (not reviewer answer): Coordinator/AI draft suggestion, not native-approved. Display is selected by src/constants/readingPaths.ts / ContinueReading. Currently source-only/hardcoded: accepting a word does not localize this component by itself. |
| 266 | menuLabels.Wallets and hardware | Wallets and hardware | Wallets and hardware | Кошельки и оборудование |  | Context (not reviewer answer): Coordinator/AI draft suggestion, not native-approved. Display is selected by src/constants/readingPaths.ts / SideMenu. |
| 267 | frontend.readingNextGroup.Privacy | Privacy | Privacy | Privacy |  | Context (not reviewer answer): Current English fallback/placeholder; native rendering or explicit keep-English decision needed. Display is selected by src/constants/readingPaths.ts / ContinueReading. Currently source-only/hardcoded: accepting a word does not localize this component by itself. |
| 268 | menuLabels.Privacy | Privacy | Privacy | Privacy |  | Context (not reviewer answer): Current English fallback/placeholder; native rendering or explicit keep-English decision needed. Display is selected by src/constants/readingPaths.ts / SideMenu. |
| 269 | frontend.readingNextGroup.Payments and DeFi | Payments and DeFi | Payments and DeFi | Платежи и DeFi |  | Context (not reviewer answer): Coordinator/AI draft suggestion, not native-approved. Display is selected by src/constants/readingPaths.ts / ContinueReading. Currently source-only/hardcoded: accepting a word does not localize this component by itself. |
| 270 | menuLabels.Payments and DeFi | Payments and DeFi | Payments and DeFi | Платежи и DeFi |  | Context (not reviewer answer): Coordinator/AI draft suggestion, not native-approved. Display is selected by src/constants/readingPaths.ts / SideMenu. |
| 271 | frontend.readingNextGroup.Run a node | Run a node | Run a node | Запустить ноду |  | Context (not reviewer answer): Coordinator/AI draft suggestion, not native-approved. Display is selected by src/constants/readingPaths.ts / ContinueReading. Currently source-only/hardcoded: accepting a word does not localize this component by itself. |
| 272 | frontend.readingNextGroup.Deploy on Akash | Deploy on Akash | Deploy on Akash | Развёртывание на Akash |  | Context (not reviewer answer): Coordinator/AI draft suggestion, not native-approved. Display is selected by src/constants/readingPaths.ts / ContinueReading. Currently source-only/hardcoded: accepting a word does not localize this component by itself. |
| 273 | menuLabels.Deploy on Akash | Deploy on Akash | Deploy on Akash | Развёртывание на Akash |  | Context (not reviewer answer): Coordinator/AI draft suggestion, not native-approved. Display is selected by src/constants/readingPaths.ts / SideMenu. |
| 274 | frontend.readingNextGroup.Developer tools | Developer tools | Developer tools | Инструменты разработчика |  | Context (not reviewer answer): Coordinator/AI draft suggestion, not native-approved. Display is selected by src/constants/readingPaths.ts / ContinueReading. Currently source-only/hardcoded: accepting a word does not localize this component by itself. |
| 275 | frontend.readingNextGroup.Explore the network | Explore the network | Explore the network | Исследовать сеть |  | Context (not reviewer answer): Coordinator/AI draft suggestion, not native-approved. Display is selected by src/constants/readingPaths.ts / ContinueReading. Currently source-only/hardcoded: accepting a word does not localize this component by itself. |
| 276 | menuLabels.Explore the network | Explore the network | Explore the network | Исследовать сеть |  | Context (not reviewer answer): Coordinator/AI draft suggestion, not native-approved. Display is selected by src/constants/readingPaths.ts / SideMenu. |
| 277 | frontend.readingNextGroup.Media | Media | Media | Медиа |  | Context (not reviewer answer): Coordinator/AI draft suggestion, not native-approved. Display is selected by src/constants/readingPaths.ts / ContinueReading. Currently source-only/hardcoded: accepting a word does not localize this component by itself. |
| 278 | menuLabels.Media | Media | Media | Медиа |  | Context (not reviewer answer): Coordinator/AI draft suggestion, not native-approved. Display is selected by src/constants/readingPaths.ts / SideMenu. |
| 279 | frontend.readingNextGroup.Understand Zcash | Understand Zcash | Understand Zcash | Понять Zcash |  | Context (not reviewer answer): Coordinator/AI draft suggestion, not native-approved. Display is selected by src/constants/readingPaths.ts / ContinueReading. Currently source-only/hardcoded: accepting a word does not localize this component by itself. |
| 280 | menuLabels.Understand Zcash | Understand Zcash | Understand Zcash | Понять Zcash |  | Context (not reviewer answer): Coordinator/AI draft suggestion, not native-approved. Display is selected by src/constants/readingPaths.ts / SideMenu. |
| 281 | frontend.readingNextGroup.ZecHub and resources | ZecHub and resources | ZecHub and resources | ZecHub и ресурсы |  | Context (not reviewer answer): Coordinator/AI draft suggestion, not native-approved. Display is selected by src/constants/readingPaths.ts / ContinueReading. Currently source-only/hardcoded: accepting a word does not localize this component by itself. |
| 282 | menuLabels.ZecHub and resources | ZecHub and resources | ZecHub and resources | ZecHub и ресурсы |  | Context (not reviewer answer): Coordinator/AI draft suggestion, not native-approved. Display is selected by src/constants/readingPaths.ts / SideMenu. |
| 283 | frontend.readingNextGroup.Swaps and exchanges | Swaps and exchanges | Swaps and exchanges | Обмены и биржи |  | Context (not reviewer answer): Coordinator/AI draft suggestion, not native-approved. Display is selected by src/constants/readingPaths.ts / ContinueReading. Currently source-only/hardcoded: accepting a word does not localize this component by itself. |
| 284 | menuLabels.Swaps and exchanges | Swaps and exchanges | Swaps and exchanges | Обмены и биржи |  | Context (not reviewer answer): Coordinator/AI draft suggestion, not native-approved. Display is selected by src/constants/readingPaths.ts / SideMenu. |
| 285 | frontend.readingNextGroup.Pay and get paid | Pay and get paid | Pay and get paid | Платить и получать платежи |  | Context (not reviewer answer): Coordinator/AI draft suggestion, not native-approved. Display is selected by src/constants/readingPaths.ts / ContinueReading. Currently source-only/hardcoded: accepting a word does not localize this component by itself. |
| 286 | menuLabels.Pay and get paid | Pay and get paid | Pay and get paid | Платить и получать платежи |  | Context (not reviewer answer): Coordinator/AI draft suggestion, not native-approved. Display is selected by src/constants/readingPaths.ts / SideMenu. |
| 287 | frontend.readingNextGroup.Understand | Understand | Understand | Разобраться |  | Context (not reviewer answer): Coordinator/AI draft suggestion, not native-approved. Display is selected by src/constants/readingPaths.ts / ContinueReading. Currently source-only/hardcoded: accepting a word does not localize this component by itself. |
| 288 | frontend.readingNextGroup.Mining | Mining | Mining | Mining |  | Context (not reviewer answer): Current English fallback/placeholder; native rendering or explicit keep-English decision needed. Display is selected by src/constants/readingPaths.ts / ContinueReading. Currently source-only/hardcoded: accepting a word does not localize this component by itself. |
| 289 | menuLabels.Mining | Mining | Mining | Mining |  | Context (not reviewer answer): Current English fallback/placeholder; native rendering or explicit keep-English decision needed. Display is selected by src/constants/readingPaths.ts / SideMenu. |
| 290 | frontend.readingNextGroup.Tools | Tools | Tools | Инструменты |  | Context (not reviewer answer): Reuses current same-label dictionary wording (not native-approved). Display is selected by src/constants/readingPaths.ts / ContinueReading. Currently source-only/hardcoded: accepting a word does not localize this component by itself. |
| 291 | frontend.readingNextGroup.Governance and security | Governance and security | Governance and security | Управление и безопасность |  | Context (not reviewer answer): Coordinator/AI draft suggestion, not native-approved. Display is selected by src/constants/readingPaths.ts / ContinueReading. Currently source-only/hardcoded: accepting a word does not localize this component by itself. |
| 292 | menuLabels.Governance and security | Governance and security | Governance and security | Управление и безопасность |  | Context (not reviewer answer): Coordinator/AI draft suggestion, not native-approved. Display is selected by src/constants/readingPaths.ts / SideMenu. |
| 293 | frontend.readingNextGroup.Calls and events | Calls and events | Calls and events | Встречи и мероприятия |  | Context (not reviewer answer): Coordinator/AI draft suggestion, not native-approved. Display is selected by src/constants/readingPaths.ts / ContinueReading. Currently source-only/hardcoded: accepting a word does not localize this component by itself. |
| 294 | menuLabels.Calls and events | Calls and events | Calls and events | Встречи и мероприятия |  | Context (not reviewer answer): Coordinator/AI draft suggestion, not native-approved. Display is selected by src/constants/readingPaths.ts / SideMenu. |
| 295 | frontend.drawer.Dashboard | Dashboard | Dashboard | Панель управления |  | Context (not reviewer answer): Reuses current same-label dictionary wording (not native-approved). Display is selected by src/components/Navigation/Navigation.tsx / mobile drawer. Currently source-only/hardcoded: accepting a word does not localize this component by itself. |
| 296 | frontend.drawer.Visualizer | Visualizer | Visualizer | Визуализатор |  | Context (not reviewer answer): Reuses current same-label dictionary wording (not native-approved). Display is selected by src/components/Navigation/Navigation.tsx / mobile drawer. Currently source-only/hardcoded: accepting a word does not localize this component by itself. |
| 297 | frontend.drawer.Builders | Builders | Builders | Разработчики |  | Context (not reviewer answer): Coordinator/AI draft suggestion, not native-approved. Display is selected by src/components/Navigation/Navigation.tsx / mobile drawer. Currently source-only/hardcoded: accepting a word does not localize this component by itself. |
| 298 | frontend.drawer.Bounties | Bounties | Bounties | Баунти |  | Context (not reviewer answer): Reuses current same-label dictionary wording (not native-approved). Display is selected by src/components/Navigation/Navigation.tsx / mobile drawer. Currently source-only/hardcoded: accepting a word does not localize this component by itself. |
| 299 | frontend.drawer.Explore | Explore | Explore | Исследуйте |  | Context (not reviewer answer): Reuses current same-label dictionary wording (not native-approved). Display is selected by src/components/Navigation/Navigation.tsx / mobile drawer. Currently source-only/hardcoded: accepting a word does not localize this component by itself. |
| 300 | frontend.drawer.Pages | Pages | Pages | Страницы |  | Context (not reviewer answer): Reuses current same-label dictionary wording (not native-approved). Display is selected by src/components/Navigation/Navigation.tsx / mobile drawer. Currently source-only/hardcoded: accepting a word does not localize this component by itself. |
| 301 | navigation.preferences | Preferences | Preferences | Настройки |  | Context (not reviewer answer): Coordinator/AI draft suggestion, not native-approved. Display is selected by src/components/Navigation/Navigation.tsx. |
| 302 | frontend.accessible.Open menu | Open menu | Open menu | Открыть меню |  | Context (not reviewer answer): Coordinator/AI draft suggestion, not native-approved. Display is selected by src/components/Navigation/Navigation.tsx. Currently source-only/hardcoded: accepting a word does not localize this component by itself. |
| 303 | frontend.accessible.Close menu | Close menu | Close menu | Закрыть меню |  | Context (not reviewer answer): Coordinator/AI draft suggestion, not native-approved. Display is selected by src/components/Navigation/Navigation.tsx. Currently source-only/hardcoded: accepting a word does not localize this component by itself. |
| 304 | frontend.accessible.Toggle theme | Toggle theme | Toggle theme | Сменить тему |  | Context (not reviewer answer): Coordinator/AI draft suggestion, not native-approved. Display is selected by src/components/Navigation/Navigation.tsx. Currently source-only/hardcoded: accepting a word does not localize this component by itself. |
| 305 | frontend.accessible.Sections | Sections | Sections | Разделы |  | Context (not reviewer answer): Coordinator/AI draft suggestion, not native-approved. Display is selected by src/components/Navigation/Navigation.tsx. Currently source-only/hardcoded: accepting a word does not localize this component by itself. |
| 306 | frontend.series.Overview | Overview | Overview | Обзор |  | Context (not reviewer answer): Reuses current same-label dictionary wording (not native-approved). Display is selected by src/components/SideMenu/SideMenu.tsx. Currently source-only/hardcoded: accepting a word does not localize this component by itself. |

## Historical row continuity

Existing name-only or removed-key rows are retained so older reviewer references are not lost. Full protected names remain English; retaining their historical rows does not add them to the review scope.
