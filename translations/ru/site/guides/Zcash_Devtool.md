# Devtool для Zcash

[Что такое zcash-devtool?](https://github.com/zcash/zcash-devtool?tab=readme-ov-file) 

Devtool для Zcash — это платформа для разработки на Zcash. Она создана разработчиками для разработчиков, для тестирования и разработки новых функций Zcash; её не следует считать готовой к использованию в продакшене. API командной строки, предоставляемый этим инструментом, может и будет изменяться в любое время без предупреждения. НЕ доверяйте значительные средства встроенному кошельку zcash-devtool.

### Видеоурок по Devtool для Zcash:
Kris Nuttycombe (@nuttycom) представил этот инструмент во время ZconVI.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/5gvQF5oFT8E"
    title="zcash-devtool: многофункциональный инструмент разработки Zcash с Kris Nuttycombe — ZconVI"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


---

Пошаговое руководство по началу работы с этими инструментами см. в [этом руководстве](https://github.com/zcash/zcash-devtool/blob/main/doc/walkthrough.md). В нём подробно описаны настройка и использование инструментов zcash devtool. Оно предназначено как руководство по настройке и добавлению собственных функций в инструмент.

## Быстрый старт

Приведённые ниже команды проверены с zcash-devtool `main` (коммит `5a26ee8`, август 2026 г.). Инструмент меняется без предупреждения, поэтому выполните `--help` для любой команды, если что-то здесь больше не совпадает.

### Установка

Готовых бинарных файлов нет. Установите [Rust](https://rustup.rs), затем соберите из исходного кода:

```bash
git clone https://github.com/zcash/zcash-devtool.git
cd zcash-devtool
cargo run --release -- --help
```

В примерах ниже используется собранный бинарный файл `target/release/zcash-devtool`. `cargo run --release -- ...` работает так же.

### Создание testnet-кошелька

Начните с testnet. Монеты testnet (TAZ) не имеют ценности.

```bash
zcash-devtool wallet -w ./my-wallet init --name demo -i ./my-wallet-identity.txt -n test
zcash-devtool wallet -w ./my-wallet sync
zcash-devtool wallet -w ./my-wallet balance
```

- `-w` — это каталог кошелька. Он указывается после `wallet` и перед подкомандой.
- `-i` — это файл идентификации [age](https://age-encryption.org). Мнемоническая фраза кошелька шифруется с его помощью, и файл создаётся, если его не существует. Сохраните его: `send`, `shield` и другие команды расходования средств используют его для расшифровки seed-фразы.
- `-n` — это сеть: `test` или `main`.
- `-s` выбирает сервер лёгкого кошелька. По умолчанию `zecrocks` подключается к серверу zec.rocks для выбранной сети.
- Чтобы восстановить существующий кошелёк, используйте `restore-mnemonic` вместо `init`. Будет запрошена фраза.

`balance` выводит каждый пул отдельно, включая Ironwood:

```
    Balance:   0.00000000 TAZ
     Sapling Spendable:   0.00000000 TAZ
     Orchard Spendable:   0.00000000 TAZ
    Ironwood Spendable:   0.00000000 TAZ
  Unshielded Spendable:   0.00000000 TAZ
```

Выполните `zcash-devtool wallet -w ./my-wallet list-addresses`, чтобы увидеть единый адрес кошелька, и отправьте на него средства testnet из [крана](https://zechub.wiki/using-zcash/faucets).

Для mainnet передайте `-n main` в `init`. Используйте только те суммы, которые можете позволить себе потерять.

### Отправка и экранирование

Суммы указываются в затоши (1 ZEC = 100 000 000 затоши).

```bash
zcash-devtool wallet -w ./my-wallet send -i ./my-wallet-identity.txt \
  --address <recipient address> --value 100000 --memo "hello"
zcash-devtool wallet -w ./my-wallet shield -i ./my-wallet-identity.txt
```

`propose` показывает транзакцию, которую создала бы команда `send`, без её отправки. `list-tx` и `list-unspent` показывают историю и записи кошелька.

Любая команда, взаимодействующая с сервером, также принимает `--connection tor`, который направляет соединение через встроенный клиент Tor.

### Проверка адресов, ключей и транзакций

`inspect` декодирует данные Zcash офлайн: адреса, ключи и необработанные транзакции. Добавьте `--lookup`, чтобы получить больше информации из блокчейна, например транзакцию по её ID.

```
$ zcash-devtool inspect utest1h55y5z...
Zcash address
 - Network: testnet
 - Kind: Unified Address
 - Receivers:
   - Orchard (...)
   - Sapling (...)
   - Transparent P2PKH (...)
```

Записи Ironwood отправляются тому же получателю Orchard в едином адресе, поэтому адреса не изменились с NU6.3.

### Поэтапное создание транзакций с PCZT

PCZT (частично созданная транзакция Zcash) разделяет создание транзакции на отдельные этапы: создание, доказательство, подписание и отправку. Каждый этап может выполняться на отдельной машине, например с аппаратным подписывающим устройством, таким как Keystone. Каждая команда `pczt` считывает PCZT из файла или stdin и записывает его в файл (`--output`) или stdout, поэтому этапы можно передавать по конвейеру:

```bash
zcash-devtool pczt -w ./my-wallet create --address <recipient address> --value 100000 \
  | zcash-devtool pczt -w ./my-wallet prove -i ./my-wallet-identity.txt \
  | zcash-devtool pczt -w ./my-wallet sign -i ./my-wallet-identity.txt \
  | zcash-devtool pczt -w ./my-wallet send
```

`zcash-devtool pczt --help` перечисляет другие этапы, включая `inspect`, `redact`, `combine`, `extract` и `shield`.

### Перемещение средств из Orchard в Ironwood

Начиная с NU6.3, средства Orchard можно перемещать только на собственные адреса кошелька. Команды `migration` перемещают их в Ironwood:

```bash
zcash-devtool migration -w ./my-wallet plan
zcash-devtool migration -w ./my-wallet commit -i ./my-wallet-identity.txt
zcash-devtool migration -w ./my-wallet status
zcash-devtool migration -w ./my-wallet advance
```

- `plan` показывает предварительный просмотр разделения записей и расписания перевода, ничего не изменяя.
- `commit` создаёт и предварительно подписывает первые подготовительные транзакции. Добавьте `--external`, чтобы оставить их неподписанными для внешнего подписывающего устройства, такого как Keystone.
- `status` показывает ход миграции и следующий этап.
- `advance` создаёт доказательство для следующей транзакции, якорь которой готов.

Команды миграции всё ещё разрабатываются. `advance` останавливается на первой транзакции, готовой к трансляции, поскольку трансляция пока не реализована в инструменте. Для повседневного использования перемещайте средства с помощью кошелька, поддерживающего Ironwood. См. [Экранированные пулы](https://zechub.wiki/using-zcash/shielded-pools).


**Предупреждения по безопасности:**
НЕ ИСПОЛЬЗУЙТЕ ЭТО В ПРОДАКШЕНЕ!!!
Приложение не разрабатывалось с учётом безопасности. Тем не менее оно имеет такие механизмы, как шифрование мнемонических seed-фраз, которые могут сделать его пригодным для небольших экспериментов на ваш страх и риск.

### Расширенный уровень (учебник librustzcash )


[смотреть видео здесь](https://free2z.cash/uploadz/public/ZcashTutorial/librustzcash-a-rust-crates.mp4)
