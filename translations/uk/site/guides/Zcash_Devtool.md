# Інструмент розробника Zcash

[Що таке zcash-devtool?](https://github.com/zcash/zcash-devtool?tab=readme-ov-file) 

Інструмент розробника Zcash — це платформа для роботи з Zcash. Його створено розробниками для розробників, для тестування та розробки нової функціональності Zcash; він не призначений для використання у виробничому середовищі. API командного рядка, який надає цей інструмент, може змінюватися будь-коли без попередження. НЕ довіряйте значні кошти вбудованому гаманцю zcash-devtool.

### Відеоінструкція щодо інструмента розробника Zcash:
Kris Nuttycombe (@nuttycom) представив цей інструмент під час ZconVI.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/5gvQF5oFT8E"
    title="zcash-devtool: багатофункціональний інструмент для розробки Zcash із Kris Nuttycombe — ZconVI"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


---

Щоб ознайомитися з покроковим посібником із початку роботи з цими інструментами, дивіться [цей посібник](https://github.com/zcash/zcash-devtool/blob/main/doc/walkthrough.md). У ньому задокументовано повний процес налаштування та використання інструментів розробника zcash. Він має слугувати посібником із налаштування та додавання власної функціональності до інструмента.

## Швидкий старт

Наведені нижче команди перевірено з zcash-devtool `main` (коміт `5a26ee8`, серпень 2026 року). Інструмент змінюється без попередження, тому запустіть `--help` для будь-якої команди, якщо щось тут більше не збігається.

### Встановлення

Готових бінарних файлів немає. Встановіть [Rust](https://rustup.rs), а потім зберіть із вихідного коду:

```bash
git clone https://github.com/zcash/zcash-devtool.git
cd zcash-devtool
cargo run --release -- --help
```

У прикладах нижче викликається зібраний бінарний файл `target/release/zcash-devtool`. `cargo run --release -- ...` працює так само.

### Створення гаманця testnet

Почніть із testnet. Монети testnet (TAZ) не мають вартості.

```bash
zcash-devtool wallet -w ./my-wallet init --name demo -i ./my-wallet-identity.txt -n test
zcash-devtool wallet -w ./my-wallet sync
zcash-devtool wallet -w ./my-wallet balance
```

- `-w` — це каталог гаманця. Він указується після `wallet` і перед підкомандою.
- `-i` — це файл ідентичності [age](https://age-encryption.org). Мнемонічна фраза гаманця шифрується для нього, а файл створюється, якщо він не існує. Зберігайте його: `send`, `shield` та інші команди витрачання потребують його для розшифрування seed-фрази.
- `-n` — це мережа: `test` або `main`.
- `-s` вибирає сервер легкого гаманця. Типовий параметр, `zecrocks`, підключається до сервера zec.rocks для вибраної мережі.
- Щоб відновити наявний гаманець, використовуйте `restore-mnemonic` замість `init`. Він запитує фразу.

`balance` перелічує кожен пул окремо, зокрема Ironwood:

```
    Balance:   0.00000000 TAZ
     Sapling Spendable:   0.00000000 TAZ
     Orchard Spendable:   0.00000000 TAZ
    Ironwood Spendable:   0.00000000 TAZ
  Unshielded Spendable:   0.00000000 TAZ
```

Запустіть `zcash-devtool wallet -w ./my-wallet list-addresses`, щоб побачити Unified Address гаманця, і надішліть на нього кошти testnet із [крана](https://zechub.wiki/using-zcash/faucets).

Для mainnet передайте `-n main` до `init`. Використовуйте лише суми, які можете дозволити собі втратити.

### Надсилання та екранування

Суми вказуються в zatoshis (1 ZEC = 100 000 000 zatoshis).

```bash
zcash-devtool wallet -w ./my-wallet send -i ./my-wallet-identity.txt \
  --address <recipient address> --value 100000 --memo "hello"
zcash-devtool wallet -w ./my-wallet shield -i ./my-wallet-identity.txt
```

`propose` показує транзакцію, яку створив би `send`, без її надсилання. `list-tx` і `list-unspent` показують історію та нотатки гаманця.

Будь-яка команда, що взаємодіє із сервером, також приймає `--connection tor`, який спрямовує з’єднання через вбудований клієнт Tor.

### Перегляд адрес, ключів і транзакцій

`inspect` декодує дані Zcash офлайн: адреси, ключі та необроблені транзакції. Додайте `--lookup`, щоб отримати більше інформації з блокчейну, наприклад транзакцію за її ID.

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

Нотатки Ironwood надсилаються тому самому отримувачу Orchard в Unified Address, тому адреси не змінилися з NU6.3.

### Створення транзакцій поетапно за допомогою PCZT

PCZT (частково створена транзакція Zcash) розділяє створення транзакції на окремі етапи: створення, генерування доказу, підписання та надсилання. Кожен етап може виконуватися на іншій машині, наприклад із апаратним підписувачем, таким як Keystone. Кожна команда `pczt` зчитує PCZT із файлу або stdin і записує його у файл (`--output`) або stdout, тому етапи можна об’єднувати в конвеєр:

```bash
zcash-devtool pczt -w ./my-wallet create --address <recipient address> --value 100000 \
  | zcash-devtool pczt -w ./my-wallet prove -i ./my-wallet-identity.txt \
  | zcash-devtool pczt -w ./my-wallet sign -i ./my-wallet-identity.txt \
  | zcash-devtool pczt -w ./my-wallet send
```

`zcash-devtool pczt --help` перелічує інші етапи, зокрема `inspect`, `redact`, `combine`, `extract` та `shield`.

### Переміщення коштів із Orchard до Ironwood

Починаючи з NU6.3, кошти Orchard можна переміщувати лише на власні адреси гаманця. Команди `migration` переміщують їх до Ironwood:

```bash
zcash-devtool migration -w ./my-wallet plan
zcash-devtool migration -w ./my-wallet commit -i ./my-wallet-identity.txt
zcash-devtool migration -w ./my-wallet status
zcash-devtool migration -w ./my-wallet advance
```

- `plan` попередньо переглядає поділ нотаток і графік переказів, нічого не змінюючи.
- `commit` створює та попередньо підписує перші підготовчі транзакції. Додайте `--external`, щоб залишити їх непідписаними для зовнішнього підписувача, такого як Keystone.
- `status` показує перебіг міграції та наступний крок.
- `advance` генерує доказ для наступної транзакції, якір якої готовий.

Команди міграції все ще розробляються. `advance` зупиняється на першій транзакції, готовій до трансляції, оскільки трансляція ще не реалізована в інструменті. Для щоденного використання переміщуйте кошти за допомогою гаманця, який підтримує Ironwood. Дивіться [Екрановані пули](https://zechub.wiki/using-zcash/shielded-pools).


**Попередження щодо безпеки:**
НЕ ВИКОРИСТОВУЙТЕ ЦЕ У ВИРОБНИЧОМУ СЕРЕДОВИЩІ!!!
Застосунок не було створено з урахуванням безпеки. Проте він має такі можливості, як шифрування мнемонічних seed-фраз, що повинні зробити його придатним для невеликих експериментів на ваш власний ризик.

### Розширене використання (посібник librustzcash )


[переглянути відео тут](https://free2z.cash/uploadz/public/ZcashTutorial/librustzcash-a-rust-crates.mp4)
