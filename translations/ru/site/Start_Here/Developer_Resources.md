<a href="https://github.com/zechub/zechub/edit/main/site/Start_Here/Developer_Resources.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Ресурсы для разработчиков

Ресурсы, необходимые для разработки на базе Zcash, сгруппированные по назначению, а не собранные в один список.

Стек значительно изменился в 2026 году. zcashd, который поддерживал сеть большую часть её истории, достиг конца жизненного цикла 18 июля 2026 года на высоте блока 3417100, и каждый неизменённый узел отключился на этой высоте и откажется перезапускаться. Руководства, написанные для zcashd, теперь являются историей, а не отправной точкой, поэтому эта страница организована вокруг того, что пришло ему на смену.

## Краткий обзор стека

| Уровень | Что использовать | Начните с |
|:--|:--|:--|
| Полный узел | Zebra или Zakura | [The Zebra Book](https://zebra.zfnd.org/), [zakura.com](https://zakura.com/) |
| Кошелёк полного узла | Zallet, в бета-версии | [The Zallet Book](https://zcash.github.io/zallet/) |
| Сервер лёгкого кошелька | Zaino или lightwalletd | [Zaino](https://github.com/zingolabs/zaino), [lightwalletd](https://github.com/zcash/lightwalletd) |
| Библиотеки кошельков | Крейты librustzcash | [librustzcash](https://github.com/zcash/librustzcash) |
| Мобильные платформы | SDK для Android и iOS | [Android](https://github.com/zcash/zcash-android-wallet-sdk), [iOS](https://github.com/zcash/zcash-swift-wallet-sdk) |
| Спецификация | Спецификация протокола и ZIP | [zips.z.cash](https://zips.z.cash) |

## Узлы

Узел проверяет консенсус и хранит цепочку. Существуют две активно разрабатываемые реализации.

[Zebra](/zcash-tech/zebra-full-node) — узел Zcash Foundation, написанный на Rust; именно его сейчас предполагает большинство руководств. [The Zebra Book](https://zebra.zfnd.org/) описывает его установку и запуск, а [репозиторий](https://github.com/ZcashFoundation/zebra) — место, где ведётся разработка.

[Zakura](/zcash-tech/zakura-node) — более новый узел, описываемый его авторами как «совместимый с консенсусом полный узел Zcash, созданный для масштабирования», с более быстрой синхронизацией, отсечением блоков и режимом совместимости с zcashd. Его возглавляют Шон Боу, сооснователь Zcash, и Дев Оджха. Его исходный код открыт под лицензией Apache 2.0 в [zakura-core/zakura](https://github.com/zakura-core/zakura).

У ZecHub есть страница [Полные узлы](/zcash-tech/full-nodes), посвящённая компромиссам между ними.

## Кошелёк полного узла

zcashd включал кошелёк вместе с узлом. Этот кошелёк больше не существует, и ему на смену пришёл [Zallet](https://github.com/zcash/zallet). The Zallet Book описывает его как «кошелёк полного узла Zcash, написанный на Rust», который «создаётся как замена кошельку zcashd».

Прежде чем полагаться на него, прочитайте предупреждение о безопасности. Zallet находится в бета-версии, «не прошёл полного аудита», в нём «в любой момент могут произойти несовместимые изменения, из-за которых вам потребуется удалить и заново создать свой кошелёк Zallet», и ещё не все методы zcashd RPC были перенесены.

Если вы переносите существующую конфигурацию, у ZecHub есть [руководство по миграции с zcashd на Zebra и Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet) и [краткая справка по Zallet](/using-zcash/zallet-quick-reference-guide).

## Серверы лёгких кошельков

Большинство кошельков не запускают узел. Они обращаются к серверу, который хранит цепочку и возвращает её компактное представление.

[lightwalletd](https://github.com/zcash/lightwalletd) — исходный сервис, написанный на Go и описываемый как «бэкенд-сервис, предоставляющий эффективный по пропускной способности интерфейс к блокчейну Zcash». [Zaino](/zcash-tech/zaino) — более новый индексатор, написанный на Rust; он читает данные из полного валидатора, а не хранит собственную копию цепочки.

Документация по [Протоколу лёгких клиентов](https://zcash.readthedocs.io/en/latest/lightwalletd/index.html) описывает сам протокол. Страница [Узлы лёгких кошельков](/zcash-tech/lightwallet-nodes) рассказывает, что эти серверы могут и не могут видеть о пользователе; это стоит понять до выбора сервера.

## Создание кошелька

Большая часть работы над кошельками ведётся в крейтах Rust проекта [librustzcash](https://github.com/zcash/librustzcash), на которых строятся мобильные SDK и несколько настольных кошельков. Каждый крейт задокументирован на [docs.rs](https://docs.rs).

| Крейт | Назначение |
|:--|:--|
| zcash_client_backend | «API для создания экранированных лёгких клиентов Zcash», включая синхронизацию и создание транзакций |
| zcash_client_sqlite | «Лёгкий клиент Zcash на базе SQLite», уровень хранения для указанного выше |
| zcash_keys | «Управление ключами и адресами Zcash» |
| zcash_primitives | «Реализации примитивов Zcash на Rust» |
| zcash_protocol | «Сетевые константы протокола Zcash и типы значений» |
| orchard | «Протокол экранированных транзакций Orchard» |
| sapling-crypto | «Криптографическая библиотека для Zcash Sapling» |
| pczt | «Инструменты для работы с частично созданными транзакциями Zcash», используемые для аппаратного и многоплатформенного подписания |
| zip321 | URI-запросы на оплату, как определено в ZIP 321 |

Для мобильных платформ [Android SDK](https://github.com/zcash/zcash-android-wallet-sdk) и [iOS SDK](https://github.com/zcash/zcash-swift-wallet-sdk) оборачивают эти библиотеки. Репозиторий iOS ранее назывался ZcashLightClientKit, поэтому в старых ссылках и статьях используется это имя.

## Спецификация и криптография

[Спецификация протокола](https://zips.z.cash/protocol/protocol.pdf) является авторитетным источником о работе Zcash, включая [кодировки адресов и ключей](https://zips.z.cash/protocol/protocol.pdf#5.6%20Encodings%20of%20Addresses%20and%20Keys).

[ZIP](https://zips.z.cash) — это место, где предлагаются и определяются изменения, а индекс показывает, какие из них являются черновиками, а какие — окончательными. Изменения консенсуса выпускаются в обновлениях сети, а ZecHub отслеживает их на странице [Обновления сети](/start-here/network-upgrades).

О лежащей в основе криптографии читайте в [The halo2 Book](https://zcash.github.io/halo2/index.html) и [The Orchard Book](https://zcash.github.io/orchard/), а также в документации крейтов [halo2](https://docs.rs/halo2_proofs/latest/halo2_proofs/) и [orchard](https://docs.rs/orchard/latest/orchard/). [The FROST Book](https://frost.zfnd.org/) посвящена пороговым подписям, а у ZecHub есть страница [FROST](/zcash-tech/frost).

## Testnet

Testnet — отдельная цепочка с монетами без стоимости, называемыми TAZ. И Zebra, и Zakura могут работать с ней, а [руководство по testnet](https://zcash.readthedocs.io/en/latest/rtd_pages/testnet_guide.html) описывает конфигурацию узла.

[testnet.zcashexplorer.app](https://testnet.zcashexplorer.app/) — работающий обозреватель блоков testnet; его аналог для mainnet находится по адресу [mainnet.zcashexplorer.app](https://mainnet.zcashexplorer.app/).

Получить TAZ — непростая часть. Публичные краны появляются и исчезают, а те, на которые ссылалась старая документация, не отвечали на момент написания этой страницы. Надёжный способ — спросить в Discord Zcash R&D, что рекомендует и сама документация Zcash.

## Общая документация

[Документация Zcash](https://zcash.readthedocs.io/en/latest/) по-прежнему остаётся самым широким единым источником, охватывающим концепции протокола, интеграцию и майнинг. Читайте её внимательно. Она версионируется относительно zcashd, поэтому некоторые её части описывают узел, который больше не работает, тогда как разделы о протоколе и лёгких клиентах остаются полезными. [Модель угроз приложения-кошелька Zcash](https://zcash.readthedocs.io/en/latest/rtd_pages/wallet_threat_model.html), размещённая там, заслуживает прочтения до проектирования всего, что затрагивает конфиденциальность пользователей.

Если вы в целом новичок в блокчейнах, обычная рекомендация для изучения общих основ — [Mastering Bitcoin](https://github.com/bitcoinbook/bitcoinbook), которую можно полностью прочитать бесплатно. Она не охватывает экранированные транзакции.

## Другие инструменты, упоминаемые разработчиками

[Arti](https://docs.rs/arti/latest/arti/) — реализация Tor на Rust, используемая zcash_client_backend для маршрутизации трафика кошелька. [Tailscale](https://github.com/tailscale/tailscale) часто упоминается для подключения к самостоятельно запущенному узлу. [warp2](https://github.com/hhanh00/warp2) — быстрая реализация синхронизации от Hanh, хотя она не обновлялась с 2023 года.

## Сообщество и мероприятия

[Discord Zcash R&D](https://discord.gg/6AK7keWFaK) — место обсуждения разработки протокола и кошельков, а [Форум сообщества Zcash](https://forum.zcashcommunity.com/) содержит более развёрнутые предложения и темы поддержки.

Результаты недавних хакатонов хорошо показывают, что создают люди: [ZecHub 2024](https://x.com/ZecHub/status/1845212469809033489), [ZecHub 2025](https://x.com/ZecHub/status/1975565960661635283) и [Zypherpunk Hackathon 2025](https://forum.zcashcommunity.com/t/zypherpunk-hackathon-winners/53985).

## Выведенные из эксплуатации ресурсы

Сохранены потому, что на них ссылаются старые статьи и потому, что они всё ещё служат справочником о поведении выведенного из эксплуатации узла. Не начинайте отсюда.

[The Zcashd Book](https://zcash.github.io/zcash/) и [справочник zcashd RPC](https://zcash.github.io/rpc/) документируют программное обеспечение, достигшее [конца жизненного цикла](https://zcash.github.io/zcash/user/end-of-life.html) в июле 2026 года. Репозиторий [zcash/zcash](https://github.com/zcash/zcash) архивирован.

Если у вас есть ресурс, который стоит добавить, или вы заметили здесь устаревшую информацию, создайте issue или pull request. У команд не всегда есть возможность поддерживать всё в актуальном состоянии, и сообщение о том, с чем вы столкнулись, помогает направлять развитие руководств.

**Последнее обновление:** август 2026
