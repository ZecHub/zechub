<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Full_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Редагувати сторінку"/>
</a>

# Full Nodes

Повний вузол — це програмне забезпечення, яке запускає повну копію блокчейна будь-якої криптовалюти, надаючи доступ до можливостей протоколу.

Він зберігає повний запис кожної транзакції, що відбулася від самого genesis, і тому здатний перевіряти дійсність нових транзакцій і блоків, які додаються до блокчейна.

## Zcashd

Zcashd наразі є основною реалізацією повного вузла, яку використовує Zcash, розробленою та підтримуваною Electric Coin Company.

Zcashd надає набір API через свій RPC-інтерфейс. Ці API забезпечують функції, які дозволяють зовнішнім застосункам взаємодіяти з вузлом.

[Lightwalletd](https://github.com/zcash/lightwalletd) — це приклад застосунку, який використовує повний вузол, щоб дати змогу розробникам створювати та підтримувати дружні до мобільних пристроїв екрановані легкі гаманці без необхідності безпосередньо взаємодіяти з Zcashd.

[Повний список підтримуваних RPC-команд](https://zcash.github.io/rpc/)

[Книга про Zcashd](https://zcash.github.io/zcash/)


### Запуск вузла (Linux)

- Встановіть залежності 

      sudo apt update

      sudo apt-get install \
      build-essential pkg-config libc6-dev m4 g++-multilib \
      autoconf libtool ncurses-dev unzip git python3 python3-zmq \
      zlib1g-dev curl bsdmainutils automake libtinfo5

- Клонуйте останній реліз, виконайте checkout, налаштуйте та зберіть:

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

Zebra — це незалежна реалізація повного вузла для протоколу Zcash, створена Zcash Foundation. 

Наразі вона проходить тестування і все ще є експериментальною.

Zebra має два основні компоненти. Клієнтський компонент, який відповідає за сканування блокчейна та пробне дешифрування транзакцій. 

Друга частина — це інструмент командного рядка zebra. Цей інструмент керує ключами витрат, адресами та взаємодіє з клієнтським компонентом у zebrad, щоб забезпечити базову функціональність гаманця.

Усі, хто зацікавлений у випробуванні Zebra для майнінгу блоків, запрошуються приєднатися до R&D discord server. Також обов’язково прочитайте книгу про Zebra, щоб отримати інструкції з налаштування. 

[Github](https://github.com/ZcashFoundation/zebra/)

[Книга про Zebra](https://zebra.zfnd.org) 

[Discord](https://discord.gg/uvEdHsrb)



## Мережа

Запускаючи повний вузол, ви допомагаєте зміцнювати мережу zcash, підтримуючи її децентралізацію. 

Це допомагає запобігати ворожому контролю та зберігати стійкість мережі до деяких форм збоїв.

DNS seeders надають список інших надійних вузлів через вбудований сервер. Це дозволяє транзакціям поширюватися по всій мережі. 

### Статистика мережі

Ось приклади платформ, які надають доступ до даних мережі Zcash:

[Оглядач блоків Zcash](https://zcashblockexplorer.com)

[Coinmetrics](https://docs.coinmetrics.io/info/assets/zec)

[Blockchair](https://blockchair.com/zcash)

Ви також можете зробити внесок у розвиток мережі, запускаючи тести або пропонуючи нові вдосконалення та надаючи метрики. 



### Майнінг

Майнерам потрібні повні вузли, щоб отримувати доступ до всіх RPC, пов’язаних із майнінгом, таких як getblocktemplate і getmininginfo. 

Zcashd також дає змогу майнити в shielded coinbase. Майнери та майнінгові пули мають можливість майнити безпосередньо, щоб за замовчуванням накопичувати екрановані ZEC у z-address. 

Прочитайте [Посібник із майнінгу](https://zcash.readthedocs.io/en/latest/rtd_pages/zcash_mining_guide.html) або приєднуйтеся до сторінки форуму спільноти для [майнерів Zcash](https://forum.zcashcommunity.com/c/mining/13).

### Конфіденційність 

Запуск повного вузла дозволяє вам незалежно перевіряти всі транзакції та блоки в мережі Zcash.

Запуск повного вузла допомагає уникнути деяких ризиків для конфіденційності, пов’язаних із використанням сторонніх сервісів для перевірки транзакцій від вашого імені.

Використання власного вузла також дозволяє підключатися до мережі через [Tor](https://zcash.github.io/zcash/user/tor.html).
Це має додаткову перевагу, оскільки дозволяє іншим користувачам приватно підключатися до .onion-адреси вашого вузла.


**Потрібна допомога?**

Прочитайте [Документацію підтримки](https://zcash.readthedocs.io/en/latest/)

Приєднуйтесь до нашого [Discord Sever](https://discord.gg/zcash) або зв’яжіться з нами у [twitter](https://twitter.com/ZecHub)

---

**Protected terms (keep in English):** `Zaino` `Zallet`
