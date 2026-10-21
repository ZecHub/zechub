#  <img src="/content-images/e38b13a9-d410-426a-a1e6-2dde105d56c4-6b8154e5ae.webp" alt="Alt Text" width="50"/> ZingoLabs

[Офіційний сайт](https://zingolabs.org/) - [GitHub](https://github.com/zingolabs) - [X/Twitter](https://x.com/ZingoLabs) - [Instagram](https://www.instagram.com/zingolabesp/)

ZingoLabs — це команда візіонерів, відданих покращенню людського досвіду. Ми віримо, що технології мають приносити користь людству, і що ми процвітаємо завдяки взаємодії за взаємною згодою. Ми виявляємо закономірності, які роблять це можливим.

Zingo Lab Cyan функціонує як Shielded DAO. Ми зберігаємо наші кошти у скарбниці, де кожен учасник має ключ перегляду. Кошти витрачаються зі скарбниці, коли учасники голосують на підтримку пропозиції.

## Проєкти

### Zingo! Wallet ([GitHub](https://github.com/zingolabs/zingo-mobile))
Zingo Wallet — це повнофункціональний гаманець Zcash, створений із фокусом на зручність для користувача, хоча він також містить деякі розширені функції для більш досвідчених користувачів. Він підтримує transparent, Sapling і Orchard пули, має адресну книгу для повторюваних платежів і доступний різними мовами. Це був перший гаманець, що підтримував Orchard і реалізував формати NU5.

Однією з головних функцій Zingo! є його здатність використовувати поле Memo, щоб надавати цінну інформацію про ваші транзакції.

Zingo! доступний для мобільних пристроїв і ПК. Усі завантаження ви знайдете [тут](https://zingolabs.org/)

### Zingolib ([GitHub](https://github.com/zingolabs/zingolib))
API та тестовий застосунок, що надає функціональність zcash для використання в застосунках. Zingolib надає як бібліотеку для zingo-mobile, так і включений cli-застосунок для взаємодії з zcashd через lightwalletd під назвою zingo-cli — клієнт-проксі lightwalletd для командного рядка.

### Zaino Indexer ([GitHub](https://github.com/zingolabs/zaino))
Zaino — це Indexer, розроблений мовою Rust командою Zingo, який має на меті замінити lightwalletd і просунути вперед проєкт відмови від zcashd.

Zaino пропонує необхідні функції як для легких клієнтів, таких як гаманці та застосунки, яким не потрібна повна історія блокчейна, так і для повних клієнтів або гаманців. Він також підтримує block explorers, надаючи доступ як до фіналізованого блокчейна, так і до нефіналізованого найкращого ланцюга та mempool, якими керує повний валідатор Zebra або zcashd.

###  ZLN (zcash-local-net) ([GitHub](https://.com/zingolabs/infrastructure/tree/dev/zcash_local_net))

Набір утиліт, які запускають і керують процесами Zcash. Це використовується для інтеграційного тестування під час розробки:
- легких клієнтів
- індексаторів
- валідаторів

Його мета — запропонувати дуже адаптивне й надійне тестове середовище для базових вузлів (validators), таких як zcash і zebra, indexers, таких як lightwallet і zaino, а також, принаймні, zingo-cli як гаманця легкого клієнта.

Цей репозиторій створено для порівняння функціональності різних validators (таких як zcashd і Zebrad) та indexers (таких як lightwalletd і Zaino), щоб полегшити міграцію під час процесу відмови від zcashd.

Окрім надання інструментів для запуску, кешування та завантаження даних ланцюга Zcash (для mainnet, testnet і regtest), zcash-local-net містить серію тестів для порівняння можливостей lightwalletd та Zaino в усіх службах Lightwallet RPC. Ці тести можна виконати безпосередньо з Zaino (див. [https://.com/zingolabs/zaino/blob/dev/docs/testing.md](https://github.com/zingolabs/zaino/blob/dev/docs/testing.md)), щоб оцінити служби Lightwallet RPC, розміщені в Zaino.
