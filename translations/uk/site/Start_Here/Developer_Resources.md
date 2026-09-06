<a href="https://github.com/zechub/zechub/edit/main/site/Start_Here/Developer_Resources.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Ресурси для розробників

Ресурси, потрібні для розробки на Zcash, згруповані за призначенням кожного з них, а не зібрані в одному списку.

Стек суттєво змінився у 2026 році. zcashd, який підтримував мережу протягом більшої частини її історії, завершив життєвий цикл 18 липня 2026 року на висоті блоку 3417100, і кожен немодифікований вузол зупинився на цій висоті та відмовиться перезапускатися. Посібники, написані для zcashd, тепер є історичним матеріалом, а не відправною точкою, тому ця сторінка організована навколо того, що прийшло йому на заміну.

## Стек одним поглядом

| Рівень | Що використовувати | Почніть із |
|:--|:--|:--|
| Повний вузол | Zebra або Zakura | [The Zebra Book](https://zebra.zfnd.org/), [zakura.com](https://zakura.com/) |
| Гаманець повного вузла | Zallet, у бета-версії | [The Zallet Book](https://zcash.github.io/zallet/) |
| Сервер легкого гаманця | Zaino або lightwalletd | [Zaino](https://github.com/zingolabs/zaino), [lightwalletd](https://github.com/zcash/lightwalletd) |
| Бібліотеки гаманців | Крейти librustzcash | [librustzcash](https://github.com/zcash/librustzcash) |
| Мобільні пристрої | SDK для Android та iOS | [Android](https://github.com/zcash/zcash-android-wallet-sdk), [iOS](https://github.com/zcash/zcash-swift-wallet-sdk) |
| Специфікація | Специфікація протоколу та ZIP | [zips.z.cash](https://zips.z.cash) |

## Вузли

Вузол перевіряє консенсус і зберігає блокчейн. Є дві активно розроблювані реалізації.

[Zebra](/zcash-tech/zebra-full-node) — це вузол Zcash Foundation, написаний мовою Rust, і саме його зараз передбачає більшість посібників. [The Zebra Book](https://zebra.zfnd.org/) охоплює встановлення та запуск, а [репозиторій](https://github.com/ZcashFoundation/zebra) є місцем розробки.

[Zakura](/zcash-tech/zakura-node) — новіший вузол, який його автори описують як «сумісний із консенсусом повний вузол Zcash, створений для масштабування», зі швидшою синхронізацією, обрізанням блоків і режимом сумісності zcashd. Його очолюють Шон Боу, співзасновник Zcash, і Дев Оджха. Це програмне забезпечення з відкритим кодом за ліцензією Apache 2.0 у [zakura-core/zakura](https://github.com/zakura-core/zakura).

ZecHub має сторінку [Повні вузли](/zcash-tech/full-nodes), що охоплює компроміси між ними.

## Гаманець повного вузла

zcashd постачався з гаманцем у складі вузла. Цього гаманця більше немає, і [Zallet](https://github.com/zcash/zallet) є його заміною. The Zallet Book описує його як «повновузловий гаманець Zcash, написаний мовою Rust», який «створюється як заміна гаманця zcashd».

Прочитайте попередження щодо безпеки, перш ніж покладатися на нього. Zallet перебуває у бета-версії, «не пройшов повного аудиту», руйнівні зміни «можуть статися будь-коли, вимагаючи видалити та повторно створити ваш гаманець Zallet», і ще не всі методи RPC zcashd було перенесено.

Якщо ви переносите наявне налаштування, ZecHub має [посібник із міграції з zcashd на Zebra і Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet) та [короткий довідник Zallet](/using-zcash/zallet-quick-reference-guide).

## Сервери легких гаманців

Більшість гаманців не запускають вузол. Вони взаємодіють із сервером, який зберігає блокчейн і повертає його компактне представлення.

[lightwalletd](https://github.com/zcash/lightwalletd) — це оригінальний сервіс, написаний мовою Go, який описується як «бекенд-сервіс, що надає ефективний щодо пропускної здатності інтерфейс до блокчейну Zcash». [Zaino](/zcash-tech/zaino) — новіший індексатор, написаний мовою Rust, який читає дані з повного валідатора, а не зберігає власну копію блокчейну.

Документація [Light Client Protocol](https://zcash.readthedocs.io/en/latest/lightwalletd/index.html) охоплює сам протокол. Сторінка [Вузли легких гаманців](/zcash-tech/lightwallet-nodes) пояснює, що ці сервери можуть і не можуть бачити про користувача; це варто зрозуміти, перш ніж обирати один із них.

## Розробка гаманця

Більшість роботи над гаманцями відбувається у крейтах Rust у [librustzcash](https://github.com/zcash/librustzcash), на яких побудовані мобільні SDK та кілька настільних гаманців. Кожен крейт задокументований на [docs.rs](https://docs.rs).

| Крейт | Для чого він призначений |
|:--|:--|
| zcash_client_backend | «API для створення екранованих легких клієнтів Zcash», зокрема синхронізація та формування транзакцій |
| zcash_client_sqlite | «Легкий клієнт Zcash на основі SQLite», рівень зберігання даних для вищезазначеного |
| zcash_keys | «Керування ключами й адресами Zcash» |
| zcash_primitives | «Реалізації примітивів Zcash мовою Rust» |
| zcash_protocol | «Мережеві константи протоколу Zcash і типи значень» |
| orchard | «Протокол екранованих транзакцій Orchard» |
| sapling-crypto | «Криптографічна бібліотека для Zcash Sapling» |
| pczt | «Інструменти для роботи з частково створеними транзакціями Zcash», що використовуються для апаратного та багатопристроєвого підписання |
| zip321 | URI запитів на оплату, як визначено в ZIP 321 |

Для мобільних пристроїв [Android SDK](https://github.com/zcash/zcash-android-wallet-sdk) та [iOS SDK](https://github.com/zcash/zcash-swift-wallet-sdk) обгортають ці бібліотеки. Репозиторій iOS раніше називався ZcashLightClientKit, тому в старіших посиланнях і статтях використовується ця назва.

## Специфікація та криптографія

[Специфікація протоколу](https://zips.z.cash/protocol/protocol.pdf) є авторитетним джерелом про те, як працює Zcash, зокрема щодо [кодувань адрес і ключів](https://zips.z.cash/protocol/protocol.pdf#5.6%20Encodings%20of%20Addresses%20and%20Keys).

[ZIP](https://zips.z.cash) — це місце, де пропонуються й специфікуються зміни, а індекс показує, які з них є чернетками, а які — остаточними. Зміни консенсусу постачаються в оновленнях мережі, і ZecHub відстежує їх на сторінці [Оновлення мережі](/start-here/network-upgrades).

Щодо базової криптографії прочитайте [The halo2 Book](https://zcash.github.io/halo2/index.html) і [The Orchard Book](https://zcash.github.io/orchard/), а також документацію крейтів [halo2](https://docs.rs/halo2_proofs/latest/halo2_proofs/) та [orchard](https://docs.rs/orchard/latest/orchard/). [The FROST Book](https://frost.zfnd.org/) охоплює порогові підписи, а ZecHub має сторінку [FROST](/zcash-tech/frost).

## Тестова мережа

Тестова мережа — це окремий блокчейн із монетами без вартості, що називаються TAZ. І Zebra, і Zakura можуть працювати з нею, а [посібник із тестової мережі](https://zcash.readthedocs.io/en/latest/rtd_pages/testnet_guide.html) охоплює конфігурацію вузла.

[testnet.zcashexplorer.app](https://testnet.zcashexplorer.app/) — це робочий оглядач блоків тестової мережі, а його відповідник для основної мережі доступний на [mainnet.zcashexplorer.app](https://mainnet.zcashexplorer.app/).

Отримання TAZ — незручна частина. Публічні крани з’являються та зникають, а ті, на які посилалася старіша документація, не відповідали на час написання цієї сторінки. Надійний шлях — запитати в Discord Zcash R&D, що й пропонує сама документація Zcash.

## Загальна документація

[Документація Zcash](https://zcash.readthedocs.io/en/latest/) усе ще є найширшим єдиним джерелом, що охоплює концепції протоколу, інтеграцію та майнінг. Читайте її обережно. Вона прив’язана до версій zcashd, тож частини описують вузол, який більше не працює, тоді як розділи про протокол і легкі клієнти лишаються корисними. [Модель загроз застосунку гаманця Zcash](https://zcash.readthedocs.io/en/latest/rtd_pages/wallet_threat_model.html), що міститься там, варто прочитати перед проєктуванням будь-чого, що стосується приватності користувачів.

Якщо ви загалом новачок у блокчейнах, [Mastering Bitcoin](https://github.com/bitcoinbook/bitcoinbook) — звична рекомендація для спільних фундаментальних засад; його можна безкоштовно прочитати повністю. Він не охоплює екрановані транзакції.

## Інші інструменти, згадані розробниками

[Arti](https://docs.rs/arti/latest/arti/) — реалізація Tor мовою Rust, яку zcash_client_backend використовує для маршрутизації трафіку гаманця. [Tailscale](https://github.com/tailscale/tailscale) згадується для підключення до вузла, який ви запускаєте самостійно. [warp2](https://github.com/hhanh00/warp2) — реалізація швидкої синхронізації від Hanh, хоча вона не оновлювалася з 2023 року.

## Спільнота та події

[Discord Zcash R&D](https://discord.gg/6AK7keWFaK) — місце обговорення розробки протоколу та гаманців, а [Форум спільноти Zcash](https://forum.zcashcommunity.com/) містить докладніші пропозиції та обговорення підтримки.

Результати недавніх хакатонів добре показують, що створюють люди: [ZecHub 2024](https://x.com/ZecHub/status/1845212469809033489), [ZecHub 2025](https://x.com/ZecHub/status/1975565960661635283) і [Zypherpunk Hackathon 2025](https://forum.zcashcommunity.com/t/zypherpunk-hackathon-winners/53985).

## Виведені з експлуатації ресурси

Збережено, оскільки на них посилаються старіші статті та вони все ще є довідковим джерелом щодо поведінки виведеного з експлуатації вузла. Не починайте звідси.

[The Zcashd Book](https://zcash.github.io/zcash/) і [довідник RPC zcashd](https://zcash.github.io/rpc/) документують програмне забезпечення, яке [завершило життєвий цикл](https://zcash.github.io/zcash/user/end-of-life.html) у липні 2026 року. Репозиторій [zcash/zcash](https://github.com/zcash/zcash) заархівовано.

Якщо у вас є ресурс, який варто додати, або ви помітили тут щось застаріле, відкрийте issue або pull request. Команди не завжди мають можливість підтримувати все в актуальному стані, а повідомлення про те, з чим ви зіткнулися, допомагає спрямовувати посібники.

**Востаннє оновлено:** серпень 2026
