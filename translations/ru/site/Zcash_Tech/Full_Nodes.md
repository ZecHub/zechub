---
<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Full_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Редактировать страницу"/>
</a>

# Full Nodes

Полная нода — это программное обеспечение, которое хранит полную копию блокчейна любой криптовалюты и предоставляет доступ к возможностям протокола.

Она содержит полную запись каждой транзакции, произошедшей с момента генезиса, и поэтому способна проверять действительность новых транзакций и блоков, добавляемых в блокчейн.

## Zcashd

> **Примечание:** zcashd выводится из эксплуатации. Electric Coin Company [официально объявила](https://z.cash/support/zcashd-deprecation/), что zcashd снимается с поддержки: роль полной ноды заменяет [Zebra](https://github.com/ZcashFoundation/zebra) (`zebrad`), а роль кошелька — [Zallet](https://github.com/zcash/zallet). Для новых развёртываний используйте Zebra (см. ниже). Если у вас уже запущена нода zcashd, следуйте [руководству по миграции: zcashd to Zebrad/Zallet](https://zechub.wiki/migration-guide-zcashd-to-zebrad-zallet).

zcashd была исходной реализацией полной ноды для Zcash, разработанной и поддерживаемой Electric Coin Company. Приведённые ниже инструкции по сборке сохранены для справки и для операторов, мигрирующих с zcashd.

Zcashd предоставляет набор API через свой RPC-интерфейс. Эти API предоставляют функции, которые позволяют внешним приложениям взаимодействовать с нодой.

[Lightwalletd](https://github.com/zcash/lightwalletd) — пример приложения, использующего полную ноду, чтобы разработчики могли создавать и поддерживать мобильные экранированные лёгкие кошельки без необходимости напрямую взаимодействовать с Zcashd.

[Полный список поддерживаемых RPC-команд](https://zcash.github.io/rpc/)

[Книга по Zcashd](https://zcash.github.io/zcash/)


### Запуск ноды (Linux)

- Установите зависимости

      sudo apt update

      sudo apt-get install \
      build-essential pkg-config libc6-dev m4 g++-multilib \
      autoconf libtool ncurses-dev unzip git python3 python3-zmq \
      zlib1g-dev curl bsdmainutils automake libtinfo5

- Клонируйте последний релиз, выполните checkout, настройку и сборку:

      git clone https://github.com/zcash/zcash.git

      cd zcash/

      git checkout v5.4.1
      ./zcutil/fetch-params.sh
      ./zcutil/clean.sh
      ./zcutil/build.sh -j$(nproc)

- Синхронизируйте блокчейн (это может занять несколько часов)

    Чтобы запустить ноду, выполните:

      ./src/zcashd

- Приватные ключи хранятся в ~/.zcash/wallet.dat

[Руководство по Zcashd на Raspberry Pi](https://zechub.notion.site/Raspberry-Pi-4-a-zcashd-full-node-guide-6db67f686e8d4b0db6047e169eed51d1)


## Zebra

Zebra — это независимая, готовая к промышленному использованию реализация полной ноды протокола Zcash, созданная Zcash Foundation и написанная на Rust. Поскольку zcashd выводится из эксплуатации, Zebra (`zebrad`) является рекомендуемой полной нодой для новых развёртываний.

Zebra проверяет блоки и транзакции, участвует в одноранговой сети и предоставляет RPC-интерфейс для приложений. Теперь кошелёк является отдельным компонентом: [Zallet](https://github.com/zcash/zallet) работает поверх ноды Zebra и управляет ключами и балансами. Это заменяет zcashd, где нода и кошелёк были объединены в одном процессе.

Для обслуживания экранированных лёгких кошельков нода работает совместно с индексатором — либо с проверенным [lightwalletd](https://github.com/zcash/lightwalletd), либо с более новым [Zaino](https://zechub.wiki/zaino).

Обязательно прочитайте книгу по Zebra для инструкций по настройке и присоединяйтесь к Discord-серверу R&D для получения поддержки.

[Github](https://github.com/ZcashFoundation/zebra/)

[Книга по Zebra](https://zebra.zfnd.org) 

[Discord](https://discord.gg/uvEdHsrb)



## Сеть

Запуская полную ноду, вы помогаете укреплять сеть zcash, поддерживая её децентрализацию.

Это помогает предотвращать враждебный контроль и сохранять устойчивость сети к некоторым видам сбоев.

DNS-сидеры предоставляют список других надёжных нод через встроенный сервер. Это позволяет транзакциям распространяться по всей сети.

### Статистика сети

Вот примеры платформ, которые предоставляют доступ к данным сети Zcash:

[Обозреватель блоков Zcash](https://zcashblockexplorer.com)

[Coinmetrics](https://docs.coinmetrics.io/info/assets/zec)

[Blockchair](https://blockchair.com/zcash)

Вы также можете внести вклад в развитие сети, запуская тесты, предлагая новые улучшения и предоставляя метрики.



### Майнинг

Майнерам необходимы полные ноды для доступа ко всем RPC, связанным с майнингом, таким как getblocktemplate и getmininginfo.

Zcashd также поддерживает майнинг с экранированной coinbase. У майнеров и майнинговых пулов есть возможность майнить напрямую, чтобы по умолчанию накапливать экранированные ZEC на z-адресе.

Прочитайте [руководство по майнингу](https://zcash.readthedocs.io/en/latest/rtd_pages/zcash_mining_guide.html) или присоединяйтесь к странице форума сообщества для [майнеров Zcash](https://forum.zcashcommunity.com/c/mining/13).

### Конфиденциальность

Запуск полной ноды позволяет вам самостоятельно проверять все транзакции и блоки в сети Zcash.

Запуск полной ноды позволяет избежать некоторых рисков для конфиденциальности, связанных с использованием сторонних сервисов для проверки транзакций от вашего имени.

Использование собственной ноды также позволяет подключаться к сети через [Tor](https://zcash.github.io/zcash/user/tor.html).
Это даёт дополнительное преимущество, позволяя другим пользователям подключаться приватно к `.onion`-адресу вашей ноды.


**Нужна помощь?**

Прочитайте [документацию поддержки](https://zcash.readthedocs.io/en/latest/)

Присоединяйтесь к нашему [Discord Sever](https://discord.gg/zcash) или свяжитесь с нами в [twitter](https://twitter.com/ZecHub)
