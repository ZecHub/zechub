<a href="https://github.com/zechub/zechub/edit/main/site/Start_Here/Developer_Resources.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Ресурси для розробників

Ресурси, потрібні для розробки на Zcash, згруповані за призначенням кожного з них, а не зібрані в одному переліку.

Стек значно змінився у 2026 році. zcashd, який забезпечував роботу мережі більшу частину її історії, припинив підтримку 18 липня 2026 року на висоті блоку 3417100, і кожен немодифікований вузол зупинився на цій висоті та відмовлятиметься перезапускатися. Посібники, написані для zcashd, тепер є радше історією, ніж відправною точкою, тому ця сторінка впорядкована навколо того, що його замінило.

## Стек одним поглядом

| Рівень | Що використовувати | Почніть із |
|:--|:--|:--|
| Повний вузол | Zebra або Zakura | [The Zebra Book](https://zebra.zfnd.org/), [zakura.com](https://zakura.com/) |
| Гаманець повного вузла | Zallet, у бета-версії | [The Zallet Book](https://zcash.github.io/zallet/) |
| Сервер легкого гаманця | Zaino або lightwalletd | [Zaino](https://github.com/zingolabs/zaino), [lightwalletd](https://github.com/zcash/lightwalletd) |
| Бібліотеки гаманців | Крейти librustzcash | [librustzcash](https://github.com/zcash/librustzcash) |
| Мобільні пристрої | Android та iOS SDK | [Android](https://github.com/zcash/zcash-android-wallet-sdk), [iOS](https://github.com/zcash/zcash-swift-wallet-sdk) |
| Специфікація | Специфікація протоколу та ZIP | [zips.z.cash](https://zips.z.cash) |

## Вузли

Вузол перевіряє консенсус і зберігає ланцюг. Існують дві реалізації, що активно розробляються.

[Zebra](/zcash-tech/zebra-full-node) — це вузол Zcash Foundation, написаний на Rust, і саме його тепер передбачає більшість посібників. [The Zebra Book](https://zebra.zfnd.org/) пояснює встановлення та запуск, а [репозиторій](https://github.com/ZcashFoundation/zebra) — це місце, де відбувається розробка.

[Zakura](/zcash-tech/zakura-node) — новіший вузол, описаний його авторами як «повний вузол Zcash, сумісний із консенсусом і створений для масштабування», із швидшою синхронізацією, обрізанням блоків і режимом сумісності з zcashd. Його очолюють Sean Bowe, співзасновник Zcash, і Dev Ojha. Це проєкт із відкритим кодом під ліцензією Apache 2.0 у [zakura-core/zakura](https://github.com/zakura-core/zakura).

ZecHub має сторінку [Повні вузли](/zcash-tech/full-nodes), яка розглядає компроміси між ними.

## Гаманець повного вузла

zcashd містив гаманець разом із вузлом. Цей гаманець більше не існує, а [Zallet](https://github.com/zcash/zallet) є його заміною. The Zallet Book описує його як «гаманець Zcash повного вузла, написаний на Rust», який «створюється як заміна гаманця zcashd».

Прочитайте попередження про безпеку, перш ніж покладатися на нього. Zallet перебуває у бета-версії, «не пройшов повної перевірки», зміни, що порушують сумісність, «можуть відбутися будь-коли й вимагатимуть від вас видалити та повторно створити гаманець Zallet», а ще не всі методи RPC zcashd було перенесено.

Якщо ви переносите наявне налаштування, ZecHub має [посібник із міграції від zcashd до Zebra та Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet) і [швидкий довідник Zallet](/using-zcash/zallet-quick-reference-guide).

## Сервери легких гаманців

Більшість гаманців не запускають вузол. Вони взаємодіють із сервером, який зберігає ланцюг і повертає його компактне представлення.

[lightwalletd](https://github.com/zcash/lightwalletd) — це оригінальний сервіс, написаний на Go, описаний як «бекенд-сервіс, що надає ефективний щодо пропускної здатності інтерфейс до блокчейну Zcash». [Zaino](/zcash-tech/zaino) — новіший індексатор, написаний на Rust, який читає дані з повного валідатора, а не зберігає власну копію ланцюга.

Документація [Light Client Protocol](https://zcash.readthedocs.io/en/latest/lightwalletd/index.html) описує сам протокол. Сторінка [Вузли легких гаманців](/zcash-tech/lightwallet-nodes) пояснює, що ці сервери можуть і не можуть бачити про користувача, і це варто зрозуміти, перш ніж обирати один із них.

## Створення гаманця

Більшість робіт над гаманцями відбувається в Rust-крейтах [librustzcash](https://github.com/zcash/librustzcash), на яких побудовані мобільні SDK та кілька десктопних гаманців. Кожен крейт задокументовано на [docs.rs](https://docs.rs).

| Крейт | Для чого він |
|:--|:--|
| zcash_client_backend | «API для створення захищених легких клієнтів Zcash», зокрема синхронізації та формування транзакцій |
| zcash_client_sqlite | «Легкий клієнт Zcash на основі SQLite», рівень зберігання для наведеного вище |
| zcash_keys | «Керування ключами та адресами Zcash» |
| zcash_primitives | «Реалізації примітивів Zcash мовою Rust» |
| zcash_protocol | «Мережеві константи протоколу Zcash і типи значень» |
| orchard | «Протокол захищених транзакцій Orchard» |
| sapling-crypto | «Криптографічна бібліотека для Zcash Sapling» |
| pczt | «Інструменти для роботи з частково створеними транзакціями Zcash», що використовуються для апаратного та багатопристроєвого підписання |
| zip321 | URI запитів на оплату, як визначено в ZIP 321 |

Для мобільних пристроїв [Android SDK](https://github.com/zcash/zcash-android-wallet-sdk) та [iOS SDK](https://github.com/zcash/zcash-swift-wallet-sdk) обгортають ці бібліотеки. Репозиторій iOS раніше називався ZcashLightClientKit, тому старі посилання й статті використовують цю назву.

## Специфікація та криптографія

[Специфікація протоколу](https://zips.z.cash/protocol/protocol.pdf) є авторитетним джерелом про те, як працює Zcash, зокрема щодо [кодувань адрес і ключів](https://zips.z.cash/protocol/protocol.pdf#5.6%20Encodings%20of%20Addresses%20and%20Keys).

[ZIP](https://zips.z.cash) — це місце, де пропонуються та специфікуються зміни, а індекс показує, які з них є чернетками, а які — остаточними. Зміни консенсусу впроваджуються в оновленнях мережі, а ZecHub відстежує їх на сторінці [Оновлення мережі](/start-here/network-upgrades).

Щодо базової криптографії, прочитайте [The halo2 Book](https://zcash.github.io/halo2/index.html) і [The Orchard Book](https://zcash.github.io/orchard/), а також документацію крейтів [halo2](https://docs.rs/halo2_proofs/latest/halo2_proofs/) та [orchard](https://docs.rs/orchard/latest/orchard/). [The FROST Book](https://frost.zfnd.org/) охоплює порогові підписи, а ZecHub має сторінку [FROST](/zcash-tech/frost).

## Testnet

Testnet — це окремий ланцюг із монетами без вартості, що називаються TAZ. І Zebra, і Zakura можуть працювати з ним, а [посібник із testnet](https://zcash.readthedocs.io/en/latest/rtd_pages/testnet_guide.html) охоплює конфігурацію вузла.

[testnet.zcashexplorer.app](https://testnet.zcashexplorer.app/) — це робочий оглядач блоків testnet, а його відповідник для mainnet доступний за адресою [mainnet.zcashexplorer.app](https://mainnet.zcashexplorer.app/).

Отримати TAZ — незручна частина. Публічні крани з’являються та зникають, а ті, на які посилалася старіша документація, не відповідали на момент написання цієї сторінки. Надійний шлях — запитати в Zcash R&D Discord, що й пропонує сама документація Zcash.

## Загальна документація

[Документація Zcash](https://zcash.readthedocs.io/en/latest/) усе ще є найширшим єдиним джерелом, що охоплює поняття протоколу, інтеграцію та майнінг. Читайте її уважно. Вона прив’язана до версій zcashd, тому деякі її частини описують вузол, який більше не працює, тоді як розділи про протокол і легкі клієнти залишаються корисними. [Модель загроз застосунку гаманця Zcash](https://zcash.readthedocs.io/en/latest/rtd_pages/wallet_threat_model.html), розміщена там, варта прочитання перед розробкою будь-чого, що стосується приватності користувача.

Якщо ви загалом новачок у блокчейнах, [Mastering Bitcoin](https://github.com/bitcoinbook/bitcoinbook) — звична рекомендація для спільних базових принципів, і його можна безкоштовно прочитати повністю. Він не охоплює захищені транзакції.

## Інші інструменти, згадані розробниками

[Arti](https://docs.rs/arti/latest/arti/) — це реалізація Tor мовою Rust, яку zcash_client_backend використовує для маршрутизації трафіку гаманця. [Tailscale](https://github.com/tailscale/tailscale) згадують для підключення до вузла, який ви запускаєте самостійно. [warp2](https://github.com/hhanh00/warp2) — це швидка реалізація синхронізації від Hanh, хоча її не оновлювали з 2023 року.

## Спільнота та події

[Zcash R&D Discord](https://discord.gg/6AK7keWFaK) — це місце обговорення розробки протоколу та гаманців, а [Форум спільноти Zcash](https://forum.zcashcommunity.com/) містить докладніші пропозиції та гілки підтримки.

Результати нещодавніх хакатонів добре показують, що створюють люди: [ZecHub 2024](https://x.com/ZecHub/status/1845212469809033489), [ZecHub 2025](https://x.com/ZecHub/status/1975565960661635283) та [Zypherpunk Hackathon 2025](https://forum.zcashcommunity.com/t/zypherpunk-hackathon-winners/53985).

## Застарілі ресурси

Збережені, оскільки старі статті посилаються на них, а також тому, що вони досі є довідковими матеріалами про поведінку застарілого вузла. Не починайте звідси.

[The Zcashd Book](https://zcash.github.io/zcash/) і [довідник RPC zcashd](https://zcash.github.io/rpc/) документують програмне забезпечення, підтримка якого [завершилася](https://zcash.github.io/zcash/user/end-of-life.html) у липні 2026 року. Репозиторій [zcash/zcash](https://github.com/zcash/zcash) заархівовано.

Якщо у вас є ресурс, який слід додати, або ви помітили тут щось застаріле, відкрийте issue чи pull request. Команди не завжди мають можливість підтримувати все в актуальному стані, а повідомлення про те, з чим ви зіткнулися, допомагає спрямовувати посібники.

**Останнє оновлення:** серпень 2026
