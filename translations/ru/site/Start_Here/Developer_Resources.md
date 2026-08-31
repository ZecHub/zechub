<a href="https://github.com/zechub/zechub/edit/main/site/Start_Here/Developer_Resources.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Ресурсы для разработчиков

Ресурсы, которые нужны вам для разработки на Zcash, сгруппированные по назначению, а не просто собранные в один список.

Стек сильно изменился в 2026 году. `zcashd`, который обеспечивал работу сети на протяжении большей части её истории, достиг конца жизненного цикла 18 июля 2026 года на высоте блока 3417100, и каждый неизменённый узел отключился на этой высоте и откажется запускаться снова. Руководства, написанные для `zcashd`, теперь скорее часть истории, чем отправная точка, поэтому эта страница организована вокруг того, что пришло ему на смену.

## Краткий обзор стека

| Слой | Что использовать | С чего начать |
|:--|:--|:--|
| Полный узел | Zebra или Zakura | [The Zebra Book](https://zebra.zfnd.org/), [zakura.com](https://zakura.com/) |
| Кошелёк полного узла | Zallet, в бета-версии | [The Zallet Book](https://zcash.github.io/zallet/) |
| Сервер лёгкого кошелька | Zaino или lightwalletd | [Zaino](https://github.com/zingolabs/zaino), [lightwalletd](https://github.com/zcash/lightwalletd) |
| Библиотеки для кошельков | Крейты librustzcash | [librustzcash](https://github.com/zcash/librustzcash) |
| Мобильные платформы | SDK для Android и iOS | [Android](https://github.com/zcash/zcash-android-wallet-sdk), [iOS](https://github.com/zcash/zcash-swift-wallet-sdk) |
| Спецификация | Спецификация протокола и ZIP | [zips.z.cash](https://zips.z.cash) |

## Узлы

Узел проверяет консенсус и хранит цепочку. Сейчас активно разрабатываются две реализации.

[Zebra](/zcash-tech/zebra-full-node) — это узел от Zcash Foundation, написанный на Rust, и именно его теперь предполагает большинство руководств. [The Zebra Book](https://zebra.zfnd.org/) описывает его установку и запуск, а [репозиторий](https://github.com/ZcashFoundation/zebra) — это место, где ведётся разработка.

[Zakura](/zcash-tech/zakura-node) — более новый узел, описываемый его авторами как «consensus-compatible Zcash full node, built for scale», с более быстрой синхронизацией, pruning блоков и режимом совместимости с `zcashd`. Его возглавляют Sean Bowe, сооснователь Zcash, и Dev Ojha. Исходный код открыт по лицензии Apache 2.0 в [zakura-core/zakura](https://github.com/zakura-core/zakura).

У ZecHub есть страница [Полные узлы](/zcash-tech/full-nodes), где рассматриваются компромиссы между ними.

## Кошелёк полного узла

`zcashd` поставлялся с кошельком, встроенным в узел. Этого кошелька больше нет, и [Zallet](https://github.com/zcash/zallet) является заменой. В книге The Zallet Book он описывается как «a full-node Zcash wallet written in Rust», создаваемый «as a replacement for the zcashd wallet».

Прочитайте предупреждение о безопасности, прежде чем полагаться на него. Zallet находится в бета-версии, «has not been fully reviewed», в нём «may occur at any time, requiring you to delete and recreate your Zallet wallet», и пока ещё не все методы RPC из `zcashd` были перенесены.

Если вы переносите существующую конфигурацию, у ZecHub есть [руководство по миграции с zcashd на Zebra и Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet) и [краткий справочник по Zallet](/using-zcash/zallet-quick-reference-guide).

## Серверы лёгких кошельков

Большинство кошельков не запускают узел. Они обращаются к серверу, который хранит цепочку и возвращает её компактное представление.

[lightwalletd](https://github.com/zcash/lightwalletd) — это исходный сервис, написанный на Go, описываемый как «a backend service that provides a bandwidth-efficient interface to the Zcash blockchain». [Zaino](/zcash-tech/zaino) — более новый индексатор, написанный на Rust, который читает данные из полного валидатора, а не хранит собственную копию цепочки.

Документация по [Light Client Protocol](https://zcash.readthedocs.io/en/latest/lightwalletd/index.html) описывает сам протокол. Страница [Узлы Lightwallet](/zcash-tech/lightwallet-nodes) рассказывает, что эти серверы могут и не могут видеть о пользователе; это стоит понять, прежде чем делать выбор.

## Создание кошелька

Основная работа над кошельками ведётся в крейтах Rust в [librustzcash](https://github.com/zcash/librustzcash), на которых основаны мобильные SDK и несколько настольных кошельков. Каждый крейт документирован на [docs.rs](https://docs.rs).

| Крейт | Для чего он нужен |
|:--|:--|
| zcash_client_backend | «API для создания защищённых лёгких клиентов Zcash», включая синхронизацию и конструирование транзакций |
| zcash_client_sqlite | «SQLite-based Zcash light client», слой хранения для указанного выше |
| zcash_keys | «Управление ключами и адресами Zcash» |
| zcash_primitives | «Реализации примитивов Zcash на Rust» |
| zcash_protocol | «Сетевые константы и типы значений протокола Zcash» |
| orchard | «Протокол защищённых транзакций Orchard» |
| sapling-crypto | «Криптографическая библиотека для Zcash Sapling» |
| pczt | «Инструменты для работы с частично созданными транзакциями Zcash», используются для подписи аппаратными устройствами и на нескольких устройствах |
| zip321 | URI-запросы на оплату, как указано в ZIP 321 |

Для мобильных платформ [Android SDK](https://github.com/zcash/zcash-android-wallet-sdk) и [iOS SDK](https://github.com/zcash/zcash-swift-wallet-sdk) оборачивают эти библиотеки. Репозиторий iOS раньше назывался ZcashLightClientKit, поэтому в старых ссылках и статьях используется именно это имя.

## Спецификация и криптография

[Спецификация протокола](https://zips.z.cash/protocol/protocol.pdf) является основным источником того, как работает Zcash, включая [кодировки адресов и ключей](https://zips.z.cash/protocol/protocol.pdf#5.6%20Encodings%20of%20Addresses%20and%20Keys).

[ZIP](https://zips.z.cash) — это место, где предлагаются и специфицируются изменения, а индекс показывает, какие из них являются черновиками, а какие окончательными. Изменения консенсуса поставляются в обновлениях сети, и ZecHub отслеживает их на странице [Обновления сети](/start-here/network-upgrades).

Для лежащей в основе криптографии читайте [The halo2 Book](https://zcash.github.io/halo2/index.html) и [The Orchard Book](https://zcash.github.io/orchard/), а также документацию к крейтам [halo2](https://docs.rs/halo2_proofs/latest/halo2_proofs/) и [orchard](https://docs.rs/orchard/latest/orchard/). [The FROST Book](https://frost.zfnd.org/) посвящена пороговым подписям, а у ZecHub есть страница [FROST](/zcash-tech/frost).

## Testnet

Testnet — это отдельная цепочка с монетами без стоимости, называемыми TAZ. И Zebra, и Zakura могут работать с ней, а [руководство по testnet](https://zcash.readthedocs.io/en/latest/rtd_pages/testnet_guide.html) описывает конфигурацию узла.

[testnet.zcashexplorer.app](https://testnet.zcashexplorer.app/) — это работающий обозреватель блоков testnet, а для mainnet ему соответствует [mainnet.zcashexplorer.app](https://mainnet.zcashexplorer.app/).

Получение TAZ — самая неудобная часть. Публичные краны появляются и исчезают, а те, на которые ссылалась старая документация, не отвечали на момент написания этой страницы. Надёжный путь — спросить в Zcash R&D Discord, что и рекомендует сама документация Zcash.

## Общая документация

[Документация Zcash](https://zcash.readthedocs.io/en/latest/) по-прежнему остаётся самым широким единым источником, охватывающим концепции протокола, интеграцию и майнинг. Читать её нужно внимательно. Она версионирована относительно `zcashd`, поэтому некоторые её части описывают узел, который больше не работает, в то время как разделы о протоколе и лёгких клиентах остаются полезными. Находящуюся там [Модель угроз для приложения-кошелька Zcash](https://zcash.readthedocs.io/en/latest/rtd_pages/wallet_threat_model.html) стоит прочитать до проектирования чего-либо, что затрагивает приватность пользователей.

Если вы вообще новичок в блокчейнах, обычно рекомендуют [Mastering Bitcoin](https://github.com/bitcoinbook/bitcoinbook), поскольку там изложены общие основы и книгу можно бесплатно прочитать целиком. Защищённые транзакции в ней не рассматриваются.

## Другие инструменты, которые упоминали разработчики

[Arti](https://docs.rs/arti/latest/arti/) — это реализация Tor на Rust, используемая `zcash_client_backend` для маршрутизации трафика кошелька. [Tailscale](https://github.com/tailscale/tailscale) часто упоминается для подключения к узлу, который вы запускаете сами. [warp2](https://github.com/hhanh00/warp2) — быстрая реализация синхронизации от Hanh, хотя она не обновлялась с 2023 года.

## Сообщество и события

[Zcash R&D Discord](https://discord.gg/6AK7keWFaK) — место, где обсуждаются разработка протокола и кошельков, а [Форум сообщества Zcash](https://forum.zcashcommunity.com/) содержит более длинные предложения и ветки поддержки.

Итоги недавних хакатонов хорошо показывают, что именно строят люди: [ZecHub 2024](https://x.com/ZecHub/status/1845212469809033489), [ZecHub 2025](https://x.com/ZecHub/status/1975565960661635283) и [Zypherpunk Hackathon 2025](https://forum.zcashcommunity.com/t/zypherpunk-hackathon-winners/53985).

## Устаревшие ресурсы

Сохранены потому, что на них ссылаются старые статьи, а также потому, что они всё ещё остаются справочным материалом по тому, как вёл себя выведенный из эксплуатации узел. Не начинайте отсюда.

[The Zcashd Book](https://zcash.github.io/zcash/) и [справочник RPC для zcashd](https://zcash.github.io/rpc/) документируют программное обеспечение, достигшее [конца жизненного цикла](https://zcash.github.io/zcash/user/end-of-life.html) в июле 2026 года. Репозиторий [zcash/zcash](https://github.com/zcash/zcash) архивирован.

Если у вас есть ресурс, который стоит добавить, или вы заметили, что что-то здесь устарело, откройте issue или pull request. У команд не всегда есть возможность поддерживать всё в актуальном состоянии, и сообщение о том, с чем вы столкнулись, помогает направлять развитие руководств.

**Последнее обновление:** август 2026
