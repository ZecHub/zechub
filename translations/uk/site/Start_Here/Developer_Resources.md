<a href="https://github.com/zechub/zechub/edit/main/site/Start_Here/Developer_Resources.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Ресурси для розробників

Ресурси, які вам потрібні для розробки на Zcash, згруповані за призначенням, а не зібрані в один суцільний список.

Стек дуже сильно змінився у 2026 році. zcashd, який забезпечував роботу мережі протягом більшої частини її історії, досяг кінця життєвого циклу 18 липня 2026 року на висоті блоку 3417100, і кожен немодифікований вузол вимкнувся на цій висоті та відмовиться перезапускатися. Посібники, написані для zcashd, тепер уже історія, а не відправна точка, тому ця сторінка організована навколо того, що прийшло йому на заміну.

## Огляд стеку

| Рівень | Що використовувати | З чого почати |
|:--|:--|:--|
| Повний вузол | Zebra або Zakura | [The Zebra Book](https://zebra.zfnd.org/), [zakura.com](https://zakura.com/) |
| Гаманець повного вузла | Zallet, у бета-версії | [The Zallet Book](https://zcash.github.io/zallet/) |
| Сервер легкого гаманця | Zaino або lightwalletd | [Zaino](https://github.com/zingolabs/zaino), [lightwalletd](https://github.com/zcash/lightwalletd) |
| Бібліотеки гаманця | Крейт(и) librustzcash | [librustzcash](https://github.com/zcash/librustzcash) |
| Мобільні платформи | Android та iOS SDK | [Android](https://github.com/zcash/zcash-android-wallet-sdk), [iOS](https://github.com/zcash/zcash-swift-wallet-sdk) |
| Специфікація | Специфікація протоколу та ZIP | [zips.z.cash](https://zips.z.cash) |

## Вузли

Вузол перевіряє консенсус і зберігає ланцюг. Є дві реалізації, що активно розвиваються.

[Zebra](/zcash-tech/zebra-full-node) це вузол від Zcash Foundation, написаний на Rust, і саме його тепер припускає більшість посібників. [The Zebra Book](https://zebra.zfnd.org/) описує встановлення та запуск, а [репозиторій](https://github.com/ZcashFoundation/zebra) є місцем, де відбувається розробка.

[Zakura](/zcash-tech/zakura-node) це новіший вузол, який його автори описують як "consensus-compatible Zcash full node, built for scale", із швидшою синхронізацією, обрізанням блоків і режимом сумісності з zcashd. Його очолюють Sean Bowe, співзасновник Zcash, і Dev Ojha. Це open source під ліцензією Apache 2.0 у [zakura-core/zakura](https://github.com/zakura-core/zakura).

ZecHub має сторінку [Повні вузли](/zcash-tech/full-nodes), де розглядаються компроміси між ними.

## Гаманець повного вузла

zcashd постачався з гаманцем, вбудованим у вузол. Цей гаманець зник, і його заміною став [Zallet](https://github.com/zcash/zallet). The Zallet Book описує його як "a full-node Zcash wallet written in Rust", що "built as a replacement for the zcashd wallet".

Перш ніж покладатися на нього, прочитайте попередження щодо безпеки. Zallet перебуває в бета-версії, "has not been fully reviewed", зміни, що ламають сумісність, "may occur at any time, requiring you to delete and recreate your Zallet wallet", і ще не всі методи RPC zcashd були портовані.

Якщо ви переносите вже наявне налаштування, у ZecHub є [посібник з міграції з zcashd на Zebra і Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet) та [короткий довідник по Zallet](/using-zcash/zallet-quick-reference-guide).

## Сервери легких гаманців

Більшість гаманців не запускають вузол. Вони звертаються до сервера, який зберігає ланцюг і повертає його компактне представлення.

[lightwalletd](https://github.com/zcash/lightwalletd) це оригінальний сервіс, написаний на Go, який описується як "a backend service that provides a bandwidth-efficient interface to the Zcash blockchain". [Zaino](/zcash-tech/zaino) це новіший індексатор, написаний на Rust, який читає дані з повного валідатора, а не зберігає власну копію ланцюга.

Документація [Light Client Protocol](https://zcash.readthedocs.io/en/latest/lightwalletd/index.html) описує сам протокол. Сторінка [Вузли Lightwallet](/zcash-tech/lightwallet-nodes) пояснює, що ці сервери можуть і чого не можуть бачити про користувача, і це варто зрозуміти, перш ніж обирати один із них.

## Розробка гаманця

Більшість роботи над гаманцями відбувається в Rust-крейтах у [librustzcash](https://github.com/zcash/librustzcash), на яких побудовані мобільні SDK і кілька десктопних гаманців. Документація до кожного крейта доступна на [docs.rs](https://docs.rs).

| Крейт | Для чого він призначений |
|:--|:--|
| zcash_client_backend | "APIs for creating shielded Zcash light clients", включно із синхронізацією та побудовою транзакцій |
| zcash_client_sqlite | "An SQLite-based Zcash light client", рівень зберігання для наведеного вище |
| zcash_keys | "Zcash key and address management" |
| zcash_primitives | "Rust implementations of the Zcash primitives" |
| zcash_protocol | "Zcash protocol network constants and value types" |
| orchard | "The Orchard shielded transaction protocol" |
| sapling-crypto | "Cryptographic library for Zcash Sapling" |
| pczt | "Tools for working with partially-created Zcash transactions", використовується для підпису апаратними пристроями та на кількох пристроях |
| zip321 | URI запитів на оплату, як визначено в ZIP 321 |

Для мобільних платформ [Android SDK](https://github.com/zcash/zcash-android-wallet-sdk) та [iOS SDK](https://github.com/zcash/zcash-swift-wallet-sdk) обгортають ці бібліотеки. Репозиторій iOS раніше називався ZcashLightClientKit, тому в старіших посиланнях і статтях використовується саме ця назва.

## Специфікація та криптографія

[Специфікація протоколу](https://zips.z.cash/protocol/protocol.pdf) є головним джерелом щодо того, як працює Zcash, включно з [кодуваннями адрес і ключів](https://zips.z.cash/protocol/protocol.pdf#5.6%20Encodings%20of%20Addresses%20and%20Keys).

[ZIP](https://zips.z.cash) це місце, де пропонуються та формалізуються зміни, а індекс показує, які з них є чернетками, а які остаточними. Зміни консенсусу постачаються в оновленнях мережі, і ZecHub відстежує їх на сторінці [Оновлення мережі](/start-here/network-upgrades).

Щодо криптографії в основі, прочитайте [The halo2 Book](https://zcash.github.io/halo2/index.html) та [The Orchard Book](https://zcash.github.io/orchard/), а також документацію до крейтів [halo2](https://docs.rs/halo2_proofs/latest/halo2_proofs/) і [orchard](https://docs.rs/orchard/latest/orchard/). [The FROST Book](https://frost.zfnd.org/) описує порогові підписи, а ZecHub має сторінку [FROST](/zcash-tech/frost).

## Testnet

Testnet це окремий ланцюг із монетами без вартості, які називаються TAZ. І Zebra, і Zakura можуть працювати з ним, а [посібник із testnet](https://zcash.readthedocs.io/en/latest/rtd_pages/testnet_guide.html) описує конфігурацію вузла.

[testnet.zcashexplorer.app](https://testnet.zcashexplorer.app/) це робочий оглядач блоків testnet, а його відповідник для mainnet розташований за адресою [mainnet.zcashexplorer.app](https://mainnet.zcashexplorer.app/).

Отримати TAZ найскладніше. Публічні крани з'являються і зникають, а ті, на які посилається старіша документація, не відповідали на момент написання цієї сторінки. Надійний шлях це запитати в Discord Zcash R&D, що й рекомендує сама документація Zcash.

## Загальна документація

[Документація Zcash](https://zcash.readthedocs.io/en/latest/) досі залишається найширшим єдиним джерелом, яке охоплює концепції протоколу, інтеграцію та майнінг. Читайте її уважно. Вона прив'язана до версій zcashd, тому деякі її частини описують вузол, який більше не працює, тоді як розділи про протокол і легкий клієнт залишаються корисними. [Модель загроз застосунку-гаманця Zcash](https://zcash.readthedocs.io/en/latest/rtd_pages/wallet_threat_model.html), що розміщена там, варто прочитати перед проєктуванням будь-чого, що стосується приватності користувачів.

Якщо ви новачок у блокчейнах загалом, звичайною рекомендацією є [Mastering Bitcoin](https://github.com/bitcoinbook/bitcoinbook), де викладено спільні фундаментальні основи, і її можна безкоштовно прочитати повністю. Вона не охоплює shielded-транзакції.

## Інші інструменти, які згадували розробники

[Arti](https://docs.rs/arti/latest/arti/) це реалізація Tor на Rust, яку zcash_client_backend використовує для маршрутизації трафіку гаманця. [Tailscale](https://github.com/tailscale/tailscale) згадується для підключення до вузла, який ви запускаєте самі. [warp2](https://github.com/hhanh00/warp2) це реалізація швидкої синхронізації від Hanh, хоча вона не оновлювалася з 2023 року.

## Спільнота та події

[Discord Zcash R&D](https://discord.gg/6AK7keWFaK) це місце, де обговорюються розробка протоколу та гаманців, а [Форум спільноти Zcash](https://forum.zcashcommunity.com/) містить довші пропозиції та теми підтримки.

Результати нещодавніх хакатонів добре показують, що саме люди будують: [ZecHub 2024](https://x.com/ZecHub/status/1845212469809033489), [ZecHub 2025](https://x.com/ZecHub/status/1975565960661635283) та [Zypherpunk Hackathon 2025](https://forum.zcashcommunity.com/t/zypherpunk-hackathon-winners/53985).

## Застарілі ресурси

Збережені тому, що на них посилаються старіші статті, а також тому, що вони досі є джерелом довідки про те, як поводився застарілий вузол. Не починайте звідси.

[The Zcashd Book](https://zcash.github.io/zcash/) і [довідник RPC для zcashd](https://zcash.github.io/rpc/) документують програмне забезпечення, яке досягло [кінця життєвого циклу](https://zcash.github.io/zcash/user/end-of-life.html) у липні 2026 року. Репозиторій [zcash/zcash](https://github.com/zcash/zcash) заархівовано.

Якщо у вас є ресурс, який варто додати, або ви помітили тут щось застаріле, відкрийте issue або pull request. Команди не завжди мають достатньо ресурсів, щоб підтримувати все в актуальному стані, і повідомлення про те, з чим ви зіткнулися, допомагає спрямовувати розвиток посібників.

**Останнє оновлення:** серпень 2026
