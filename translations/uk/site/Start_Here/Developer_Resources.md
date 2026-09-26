<a href="https://github.com/zechub/zechub/edit/main/site/Start_Here/Developer_Resources.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Ресурси для розробників

Ресурси, потрібні для розробки на Zcash, згруповані за призначенням кожного з них, а не зібрані в одному переліку.

Стек значно змінився у 2026 році. zcashd, який забезпечував роботу мережі протягом більшої частини її історії, досяг кінця життєвого циклу 18 липня 2026 року на висоті блоку 3417100, і кожен немодифікований вузол зупинився на цій висоті та відмовиться перезапускатися. Посібники, написані для zcashd, тепер є частиною історії, а не відправною точкою, тому ця сторінка впорядкована навколо того, що прийшло йому на заміну.

## Стек одним поглядом

| Рівень | Що використовувати | Почніть із |
|:--|:--|:--|
| Повний вузол | Zebra або Zakura | [The Zebra Book](https://zebra.zfnd.org/), [zakura.com](https://zakura.com/) |
| Гаманець повного вузла | Zallet, у бета-версії | [The Zallet Book](https://zcash.github.io/zallet/) |
| Сервер легкого гаманця | Zaino або lightwalletd | [Zaino](https://github.com/zingolabs/zaino), [lightwalletd](https://github.com/zcash/lightwalletd) |
| Бібліотеки для гаманців | Крейтами librustzcash | [librustzcash](https://github.com/zcash/librustzcash) |
| Мобільні платформи | Android та iOS SDK | [Android](https://github.com/zcash/zcash-android-wallet-sdk), [iOS](https://github.com/zcash/zcash-swift-wallet-sdk) |
| Специфікація | Специфікація протоколу та ZIP | [zips.z.cash](https://zips.z.cash) |

## Вузли

Вузол перевіряє консенсус і зберігає блокчейн. Існують дві реалізації, що активно розробляються.

[Zebra](/zcash-tech/zebra-full-node) — це вузол Zcash Foundation, написаний на Rust, і саме його тепер передбачає більшість посібників. [The Zebra Book](https://zebra.zfnd.org/) охоплює його встановлення й запуск, а [репозиторій](https://github.com/ZcashFoundation/zebra) — місце, де відбувається розробка.

[Zakura](/zcash-tech/zakura-node) — це новіший вузол, який його автори описують як «повний вузол Zcash, сумісний із консенсусом і створений для масштабування», із швидшою синхронізацією, обрізанням блоків і режимом сумісності з zcashd. Його очолюють Шон Боу, співзасновник Zcash, і Дев Оджха. Він має відкритий вихідний код за ліцензією Apache 2.0 у [zakura-core/zakura](https://github.com/zakura-core/zakura).

ZecHub має сторінку [Повні вузли](/zcash-tech/full-nodes), що охоплює компроміси між ними.

## Гаманець повного вузла

zcashd містив гаманець разом із вузлом. Цей гаманець зник, а [Zallet](https://github.com/zcash/zallet) став його заміною. The Zallet Book описує його як «повновузловий гаманець Zcash, написаний на Rust», який «створюється як заміна для гаманця zcashd».

Прочитайте попередження щодо безпеки, перш ніж покладатися на нього. Zallet перебуває у бета-версії, «не пройшов повного аудиту», зміни, що порушують сумісність, «можуть відбутися будь-коли, вимагаючи від вас видалити та заново створити свій гаманець Zallet», і ще не всі методи zcashd RPC було перенесено.

Якщо ви переносите наявне налаштування, ZecHub має [посібник з міграції з zcashd на Zebra та Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet) і [швидкий довідник Zallet](/using-zcash/zallet-quick-reference-guide).

## Сервери легких гаманців

Більшість гаманців не запускають вузол. Вони звертаються до сервера, який зберігає блокчейн і повертає його компактне представлення.

[lightwalletd](https://github.com/zcash/lightwalletd) — це оригінальний сервіс, написаний на Go, який описується як «бекенд-сервіс, що надає ефективний щодо пропускної здатності інтерфейс до блокчейну Zcash». [Zaino](/zcash-tech/zaino) — це новіший індексатор, написаний на Rust, який читає дані з повного валідатора, а не зберігає власну копію блокчейну.

Документація [Протоколу легкого клієнта](https://zcash.readthedocs.io/en/latest/lightwalletd/index.html) описує сам протокол. Сторінка [Вузли легких гаманців](/zcash-tech/lightwallet-nodes) розповідає, що ці сервери можуть і не можуть бачити про користувача; це варто зрозуміти, перш ніж обирати один із них.

## Створення гаманця

Більшість роботи над гаманцями відбувається у крейтах Rust у [librustzcash](https://github.com/zcash/librustzcash), на яких побудовано мобільні SDK та кілька настільних гаманців. Кожен крейт задокументований на [docs.rs](https://docs.rs).

| Крейт | Для чого він призначений |
|:--|:--|
| zcash_client_backend | «API для створення захищених легких клієнтів Zcash», включно із синхронізацією та формуванням транзакцій |
| zcash_client_sqlite | «Легкий клієнт Zcash на основі SQLite», рівень зберігання для наведеного вище |
| zcash_keys | «Керування ключами та адресами Zcash» |
| zcash_primitives | «Реалізації примітивів Zcash мовою Rust» |
| zcash_protocol | «Мережеві константи протоколу Zcash і типи значень» |
| orchard | «Протокол захищених транзакцій Orchard» |
| sapling-crypto | «Криптографічна бібліотека для Zcash Sapling» |
| pczt | «Інструменти для роботи з частково створеними транзакціями Zcash», що використовуються для апаратного та багатопристроєвого підписання |
| zip321 | URI запитів на оплату, визначені в ZIP 321 |

Для мобільних платформ [Android SDK](https://github.com/zcash/zcash-android-wallet-sdk) та [iOS SDK](https://github.com/zcash/zcash-swift-wallet-sdk) обгортають ці бібліотеки. Репозиторій iOS раніше називався ZcashLightClientKit, тому в старіших посиланнях і статтях використовується ця назва.

## Специфікація та криптографія

[Специфікація протоколу](https://zips.z.cash/protocol/protocol.pdf) є авторитетним джерелом щодо роботи Zcash, включно з [кодуваннями адрес і ключів](https://zips.z.cash/protocol/protocol.pdf#5.6%20Encodings%20of%20Addresses%20and%20Keys).

[ZIP](https://zips.z.cash) — це місце, де пропонуються та визначаються зміни, а індекс показує, які з них є чернетками, а які — остаточними. Зміни консенсусу постачаються в оновленнях мережі, і ZecHub відстежує їх на сторінці [Оновлення мережі](/start-here/network-upgrades).

Щодо криптографії, що лежить в основі, прочитайте [The halo2 Book](https://zcash.github.io/halo2/index.html) і [The Orchard Book](https://zcash.github.io/orchard/), а також документацію крейтів [halo2](https://docs.rs/halo2_proofs/latest/halo2_proofs/) та [orchard](https://docs.rs/orchard/latest/orchard/). [The FROST Book](https://frost.zfnd.org/) охоплює порогові підписи, а ZecHub має сторінку [FROST](/zcash-tech/frost).

## Тестова мережа

Тестова мережа — це окремий блокчейн із монетами без вартості, що називаються TAZ. І Zebra, і Zakura можуть працювати з нею, а [посібник із тестової мережі](https://zcash.readthedocs.io/en/latest/rtd_pages/testnet_guide.html) охоплює налаштування вузла.

[testnet.zcashexplorer.app](https://testnet.zcashexplorer.app/) — це робочий оглядач блоків тестової мережі, а його відповідник для основної мережі доступний за адресою [mainnet.zcashexplorer.app](https://mainnet.zcashexplorer.app/).

Отримати TAZ — складна частина, оскільки крани, на які посилалася старіша документація, перестали відповідати. [zcashfaucet.jinolabs.xyz](https://zcashfaucet.jinolabs.xyz) — це керований спільнотою кран, що використовує «власні вузол, гаманець і майнер», виплачує «екрановані z2z краплі» та підтверджує заявки за допомогою «доказу виконаної роботи в браузері замість постачальника captcha». Він має відкритий код за ліцензією MIT. Якщо він недоступний, запитайте в Zcash R&D Discord, що радить і сама документація Zcash.

## Загальна документація

[Документація Zcash](https://zcash.readthedocs.io/en/latest/) досі є найширшим єдиним джерелом, що охоплює концепції протоколу, інтеграцію та майнінг. Читайте її уважно. Вона прив’язана до версії zcashd, тому деякі її частини описують вузол, який більше не працює, тоді як розділи про протокол і легкий клієнт залишаються корисними. [Модель загроз застосунку-гаманця Zcash](https://zcash.readthedocs.io/en/latest/rtd_pages/wallet_threat_model.html), що розміщена там, варта прочитання перед розробкою будь-чого, що стосується конфіденційності користувачів.

Якщо ви новачок у блокчейнах загалом, [Mastering Bitcoin](https://github.com/bitcoinbook/bitcoinbook) — звична рекомендація для спільних фундаментальних засад, і її можна повністю прочитати безкоштовно. Вона не охоплює захищені транзакції.

## Інші інструменти, згадані розробниками

[Arti](https://docs.rs/arti/latest/arti/) — це реалізація Tor мовою Rust, яку zcash_client_backend використовує для маршрутизації трафіку гаманця. [Tailscale](https://github.com/tailscale/tailscale) згадується для підключення до вузла, який ви запускаєте самостійно. [warp2](https://github.com/hhanh00/warp2) — це швидка реалізація синхронізації від Hanh, хоча її не оновлювали з 2023 року.

## Спільнота та події

[Zcash R&D Discord](https://discord.gg/6AK7keWFaK) — це місце обговорення розробки протоколу та гаманців, а [Форум спільноти Zcash](https://forum.zcashcommunity.com/) містить детальніші пропозиції й теми підтримки.

Результати нещодавніх хакатонів добре показують, що створюють люди: [ZecHub 2024](https://x.com/ZecHub/status/1845212469809033489), [ZecHub 2025](https://x.com/ZecHub/status/1975565960661635283) і [Zypherpunk Hackathon 2025](https://forum.zcashcommunity.com/t/zypherpunk-hackathon-winners/53985).

## Архівні ресурси

Збережено, оскільки старіші статті посилаються на них, а також тому, що вони досі є довідковим джерелом про поведінку виведеного з експлуатації вузла. Не починайте звідси.

[The Zcashd Book](https://zcash.github.io/zcash/) і [довідник zcashd RPC](https://zcash.github.io/rpc/) документують програмне забезпечення, що досягло [кінця життєвого циклу](https://zcash.github.io/zcash/user/end-of-life.html) у липні 2026 року. Репозиторій [zcash/zcash](https://github.com/zcash/zcash) архівовано.

Якщо у вас є ресурс для додавання або ви помітили тут щось застаріле, відкрийте issue або pull request. Команди не завжди мають можливість підтримувати все в актуальному стані, а повідомлення про те, з чим ви зіткнулися, допомагає спрямовувати посібники.

**Останнє оновлення:** серпень 2026
