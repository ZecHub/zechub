---
<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Full_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Повні вузли

Повний вузол — це програмне забезпечення, яке запускає повну копію блокчейну будь-якої криптовалюти, надаючи доступ до функцій протоколу.

Він зберігає повний запис кожної транзакції, що відбулася з моменту генезису, і тому здатний перевіряти дійсність нових транзакцій і блоків, які додаються до блокчейну.

## Zcashd

> **Примітка:** zcashd виводиться з використання. Electric Coin Company [офіційно оголосила](https://z.cash/support/zcashd-deprecation/), що zcashd припиняє роботу, а його роль повного вузла замінює [Zebra](https://github.com/ZcashFoundation/zebra) (`zebrad`), а роль гаманця — [Zallet](https://github.com/zcash/zallet). Для нових розгортань використовуйте Zebra (див. нижче). Якщо ви вже запускаєте вузол zcashd, дотримуйтесь [Посібника з міграції: zcashd до Zebrad/Zallet](https://zechub.wiki/migration-guide-zcashd-to-zebrad-zallet).

zcashd був оригінальною реалізацією повного вузла для Zcash, розробленою та підтримуваною Electric Coin Company. Наведені нижче інструкції зі збирання збережено для довідки та для операторів, які мігрують з zcashd.

Zcashd надає набір API через свій RPC-інтерфейс. Ці API забезпечують функції, які дозволяють зовнішнім застосункам взаємодіяти з вузлом.

[Lightwalletd](https://github.com/zcash/lightwalletd) — це приклад застосунку, який використовує повний вузол, щоб дати розробникам змогу створювати та підтримувати дружні до мобільних пристроїв shielded light wallets без необхідності безпосередньо взаємодіяти із Zcashd.

[Повний список підтримуваних RPC-команд](https://zcash.github.io/rpc/)

[Книга Zcashd](https://zcash.github.io/zcash/)


### Запуск вузла (Linux)

- Встановіть залежності 

      sudo apt update

      sudo apt-get install \
      build-essential pkg-config libc6-dev m4 g++-multilib \
      autoconf libtool ncurses-dev unzip git python3 python3-zmq \
      zlib1g-dev curl bsdmainutils automake libtinfo5

- Клонуйте останній реліз, виконайте checkout, налаштування та збирання:

      git clone https://github.com/zcash/zcash.git

      cd zcash/

      git checkout v5.4.1
      ./zcutil/fetch-params.sh
      ./zcutil/clean.sh
      ./zcutil/build.sh -j$(nproc)

- Синхронізуйте блокчейн (це може зайняти кілька годин)

    Щоб запустити вузол, виконайте:

      ./src/zcashd

- Приватні ключі зберігаються у ~/.zcash/wallet.dat

[Посібник із Zcashd на Raspberry Pi](https://zechub.notion.site/Raspberry-Pi-4-a-zcashd-full-node-guide-6db67f686e8d4b0db6047e169eed51d1)


## Zebra

Zebra — це незалежна, готова до промислового використання реалізація повного вузла протоколу Zcash, створена Zcash Foundation і написана на Rust. Оскільки zcashd припиняє роботу, Zebra (`zebrad`) є рекомендованим повним вузлом для нових розгортань.

Zebra перевіряє блоки й транзакції, бере участь у peer-to-peer мережі та надає RPC-інтерфейс для застосунків. Тепер гаманець є окремим компонентом: [Zallet](https://github.com/zcash/zallet) працює разом із вузлом Zebra та керує ключами й балансами. Це замінює zcashd, який поєднував вузол і гаманець в одному процесі.

Для обслуговування shielded light wallets вузол працює разом з індексатором — або вже відомим [lightwalletd](https://github.com/zcash/lightwalletd), або новішим [Zaino](https://zechub.wiki/zaino).

Обов’язково прочитайте книгу Zebra для інструкцій із налаштування та приєднуйтесь до R&D Discord-сервера для отримання підтримки. 

[Github](https://github.com/ZcashFoundation/zebra/)

[Книга Zebra](https://zebra.zfnd.org) 

[Discord](https://discord.gg/uvEdHsrb)



## Мережа

Запускаючи повний вузол, ви допомагаєте зміцнювати мережу zcash, підтримуючи її децентралізацію. 

Це допомагає запобігати ворожому контролю та зберігати стійкість мережі до деяких форм збоїв.

DNS-сідери надають список інших надійних вузлів через вбудований сервер. Це дозволяє транзакціям поширюватися по всій мережі. 

### Статистика мережі

Ось приклади платформ, які надають доступ до даних мережі Zcash:

[Оглядач блоків Zcash](https://zcashblockexplorer.com)

[Coinmetrics](https://docs.coinmetrics.io/info/assets/zec)

[Blockchair](https://blockchair.com/zcash)

Ви також можете зробити внесок у розвиток мережі, запускаючи тести або пропонуючи нові покращення та надаючи метрики. 



### Майнінг

Майнерам потрібні повні вузли, щоб мати доступ до всіх RPC, пов’язаних із майнінгом, таких як getblocktemplate і getmininginfo. 

Zcashd також дає змогу майнити в shielded coinbase. Майнери та майнінг-пули мають можливість майнити безпосередньо, щоб за замовчуванням накопичувати shielded ZEC у z-адресі. 

Прочитайте [Посібник із майнінгу](https://zcash.readthedocs.io/en/latest/rtd_pages/zcash_mining_guide.html) або приєднуйтесь до сторінки форуму спільноти для [майнерів Zcash](https://forum.zcashcommunity.com/c/mining/13).

### Приватність 

Запуск повного вузла дозволяє вам незалежно перевіряти всі транзакції та блоки в мережі Zcash.

Запуск повного вузла дає змогу уникнути деяких ризиків для приватності, пов’язаних із використанням сторонніх сервісів для перевірки транзакцій від вашого імені.

Використання власного вузла також дозволяє підключатися до мережі через [Tor](https://zcash.github.io/zcash/user/tor.html).
Це також має додаткову перевагу, оскільки дозволяє іншим користувачам приватно підключатися до .onion-адреси вашого вузла.


**Потрібна допомога?**

Прочитайте [Документацію підтримки](https://zcash.readthedocs.io/en/latest/)

Приєднуйтесь до нашого [Discord-сервера](https://discord.gg/zcash) або зв’яжіться з нами у [twitter](https://twitter.com/ZecHub)
