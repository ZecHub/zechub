---
<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Zallet_Quick_Reference_Guide.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Редагувати сторінку"/>
</a>

# Короткий довідник Zallet

## Коротко

- Zallet — це повновузловий гаманець Zcash, написаний на Rust. Він замінює гаманець, який раніше був вбудований у zcashd.
- zcashd досяг зупинки End-of-Support 18 липня 2026 року і більше не запускається. Тепер за бік вузла відповідає Zebra; за бік гаманця — Zallet.
- Ви керуєте Zallet з командного рядка за допомогою `zallet rpc <command>`, приблизно так само, як раніше використовували `zcash-cli`.
- Кожен аргумент після назви команди має бути коректним JSON, а це означає, що рядкові значення зберігають подвійні лапки.
- Zallet все ще перебуває на стадії alpha. Команди можуть змінюватися між релізами, і ще не кожен RPC zcashd було перенесено.

## Основне пояснення

Zallet надає свою функціональність через JSON-RPC — той самий стиль інтерфейсу, який використовував гаманець zcashd. Усе, що ви хочете, щоб гаманець робив — перевірити баланс, створити акаунт, надіслати захищений платіж — це команда, яку ви передаєте в `zallet rpc`.

Є дві відмінності від старої звички роботи з `zcash-cli`, і саме вони спричиняють більшість ранніх помилок. По-перше, аргументи мають бути коректним JSON, а не просто текстом, тому рядковий аргумент несе власні лапки всередині лапок оболонки. По-друге, набір доступних команд залежить від того, який alpha-реліз ви використовуєте, тож список, вбудований у ваш бінарний файл, надійніший за будь-яку написану сторінку, включно з цією.

Щоб переглянути всі доступні RPC:

```bash
zallet rpc help
```

Щоб отримати детальну довідку для конкретного RPC:

```bash
zallet rpc help '"<command>"'
```

> **Важливо:** Кожен аргумент після назви методу **має бути коректним JSON**.  
> Рядкові значення потрібно записувати як `"value"` (включно з подвійними лапками).

## Поширені помилки

- **Пропуск внутрішніх лапок у рядкових аргументах.** `zallet rpc validateaddress u1abc...` завершується помилкою, тому що адреса має надходити як JSON. Її потрібно записувати як `'"u1abc..."'`.
- **Припущення, що тут існує кожен RPC zcashd.** Перенесення все ще триває. Деякі методи працюють ідентично, для деяких потрібне інше використання, а деякі взагалі не будуть перенесені.
- **Сприйняття цієї сторінки як авторитетнішої за ваш бінарний файл.** Zallet перебуває на стадії alpha і швидко змінюється. Якщо команда звідси не працює, перевірте `zallet rpc help`, перш ніж припускати, що щось зламано.
- **Очікування, що Zallet є вузлом.** Це половина пари, що відповідає за гаманець. Zebra запускає вузол, а Zallet взаємодіє з ним.

## RPC-команди

### decoderawtransaction

```bash
zallet rpc decoderawtransaction '"<hexstring>"'
```

| Параметр    | Тип    | Обов’язковий | Опис                     |
|-------------|--------|--------------|--------------------------|
| hexstring   | string | так          | Hex-рядок транзакції     |

---

### decodescript

```bash
zallet rpc decodescript '"<hexstring>"'
```

| Параметр    | Тип    | Обов’язковий | Опис            |
|-------------|--------|--------------|-----------------|
| hexstring   | string | так          | Hex скрипту     |

---

### getrawtransaction

```bash
zallet rpc getrawtransaction '"<txid>"' [verbose] ['"<blockhash>"']
```

| Параметр  | Тип    | Обов’язковий | Типово  | Опис                                  |
|-----------|--------|--------------|---------|---------------------------------------|
| txid      | string | так          |         | ID транзакції                         |
| verbose   | number | ні           | 0       | `0` = hex, ненульове значення = JSON-об’єкт |
| blockhash | string | ні           |         | Обмежити пошук цим блоком             |

---

### getwalletinfo

```bash
zallet rpc getwalletinfo
```

Без параметрів.

---

### getwalletstatus

```bash
zallet rpc getwalletstatus
```

Без параметрів.

---

### listaddresses

```bash
zallet rpc listaddresses
```

Без параметрів.

---

### rpc.discover

```bash
zallet rpc rpc.discover
```

Без параметрів. Повертає схему OpenRPC.

---

### stop

```bash
zallet rpc stop
```

Без параметрів. (Лише regtest)

---

### validateaddress

```bash
zallet rpc validateaddress '"<address>"'
```

| Параметр | Тип    | Обов’язковий | Опис                |
|----------|--------|--------------|---------------------|
| address  | string | так          | Прозора адреса      |

---

### verifymessage

```bash
zallet rpc verifymessage '"<address>"' '"<signature>"' '"<message>"'
```

| Параметр   | Тип    | Обов’язковий | Опис                |
|------------|--------|--------------|---------------------|
| address    | string | так          | Прозора адреса      |
| signature  | string | так          | Підпис Base64       |
| message    | string | так          | Початкове повідомлення |

---

### walletlock

```bash
zallet rpc walletlock
```

Без параметрів.

---

### walletpassphrase

```bash
zallet rpc walletpassphrase '"<passphrase>"' <timeout>
```

| Параметр   | Тип    | Обов’язковий | Опис                                 |
|------------|--------|--------------|--------------------------------------|
| passphrase | string | так          | Парольна фраза гаманця               |
| timeout    | number | так          | Скільки секунд тримати гаманець розблокованим |

---

### z_converttex

```bash
zallet rpc z_converttex '"<transparent_address>"'
```

| Параметр             | Тип    | Обов’язковий | Опис                       |
|----------------------|--------|--------------|----------------------------|
| transparent_address  | string | так          | P2PKH-адреса для перетворення |

---

### z_exportkey

```bash
zallet rpc z_exportkey '"<sapling_address>"'
```

| Параметр | Тип    | Обов’язковий | Опис                                             |
|----------|--------|--------------|--------------------------------------------------|
| address  | string | так          | Sapling-адреса, ключ витрачання якої потрібно експортувати |

> Гаманець має бути розблокований. Експортується лише ключ витрачання Sapling.

---

### z_getaccount

```bash
zallet rpc z_getaccount '"<account_uuid>"'
```

| Параметр     | Тип    | Обов’язковий | Опис           |
|--------------|--------|--------------|----------------|
| account_uuid | string | так          | UUID акаунта   |

---

### z_getaddressforaccount

```bash
zallet rpc z_getaddressforaccount <account> ['["p2pkh","sapling","orchard"]'] [<diversifier_index>]
```

| Параметр          | Тип             | Обов’язковий | Опис                                 |
|-------------------|-----------------|--------------|--------------------------------------|
| account           | string / number | так          | UUID акаунта або індекс акаунта ZIP-32 |
| receiver_types    | array of string | ні           | Типи отримувачів, які слід включити  |
| diversifier_index | number          | ні           | Конкретний індекс диверсифікатора    |

---

### z_getbalanceforaccount

```bash
zallet rpc z_getbalanceforaccount <account> [<minconf>]
```

| Параметр | Тип             | Обов’язковий | Типово | Опис                            |
|----------|-----------------|--------------|--------|---------------------------------|
| account  | string / number | так          |        | UUID акаунта або індекс ZIP-32  |
| minconf  | number          | ні           | 1      | Мінімальна кількість підтверджень |

---

### z_getbalances

```bash
zallet rpc z_getbalances [<minconf>]
```

| Параметр | Тип    | Обов’язковий | Типово | Опис                          |
|----------|--------|--------------|--------|-------------------------------|
| minconf  | number | ні           | 1      | Мінімальна кількість підтверджень |

---

### z_getnewaccount

```bash
zallet rpc z_getnewaccount '"<account_name>"' ['"<seedfp>"']
```

| Параметр     | Тип    | Обов’язковий | Опис                                   |
|--------------|--------|--------------|----------------------------------------|
| account_name | string | так          | Зрозуміла для людини назва             |
| seedfp       | string | ні           | Обов’язково, якщо гаманець має кілька seed |

---

### z_getnotescount

```bash
zallet rpc z_getnotescount [<minconf>] [<as_of_height>]
```

| Параметр    | Тип    | Обов’язковий | Типово | Опис                                   |
|-------------|--------|--------------|--------|----------------------------------------|
| minconf     | number | ні           | 1      | Мінімальна кількість підтверджень      |
| as_of_height| number | ні           |        | Запит на цій висоті (`-1` = tip)       |

---

### z_getoperationresult

```bash
zallet rpc z_getoperationresult ['["opid1","opid2"]']
```

| Параметр    | Тип             | Обов’язковий | Опис                                      |
|-------------|-----------------|--------------|-------------------------------------------|
| operationid | array of string | ні           | ID операцій (пропустіть, щоб отримати всі завершені) |

---

### z_getoperationstatus

```bash
zallet rpc z_getoperationstatus ['["opid1","opid2"]']
```

| Параметр    | Тип             | Обов’язковий | Опис                              |
|-------------|-----------------|--------------|-----------------------------------|
| operationid | array of string | ні           | ID операцій (пропустіть, щоб отримати всі) |

---

### z_gettotalbalance

```bash
zallet rpc z_gettotalbalance [<minconf>] [<include_watchonly>]
```

| Параметр         | Тип     | Обов’язковий | Типово | Опис                         |
|------------------|---------|--------------|--------|------------------------------|
| minconf          | number  | ні           | 1      | Мінімальна кількість підтверджень |
| include_watchonly| boolean | ні           | false  | Включити баланси лише для спостереження |

---

### z_importaddress

```bash
zallet rpc z_importaddress '"<account_uuid>"' '"<hex_data>"' [<rescan>]
```

| Параметр | Тип     | Обов’язковий | Типово | Опис                                 |
|----------|---------|--------------|--------|--------------------------------------|
| account  | string  | так          |        | UUID акаунта                         |
| hex_data | string  | так          |        | Hex публічного ключа або redeem script |
| rescan   | boolean | ні           | true   | Пересканувати після імпорту          |

---

### z_importkey

```bash
zallet rpc z_importkey '"<key>"' ['"<rescan>"'] [<start_height>]
```

| Параметр    | Тип    | Обов’язковий | Типово           | Опис                               |
|-------------|--------|--------------|------------------|------------------------------------|
| key         | string | так          |                  | Розширений ключ витрачання Sapling |
| rescan      | string | ні           | `"whenkeyisnew"` | `"yes"`, `"no"` або `"whenkeyisnew"` |
| start_height| number | ні           | 0                | Початкова висота пересканування    |

---

### z_listaccounts

```bash
zallet rpc z_listaccounts [<include_addresses>]
```

| Параметр          | Тип     | Обов’язковий | Типово | Опис                                     |
|-------------------|---------|--------------|--------|------------------------------------------|
| include_addresses | boolean | ні           | true   | Також повертати адреси для кожного акаунта |

---

### z_listoperationids

```bash
zallet rpc z_listoperationids ['"<status>"']
```

| Параметр | Тип    | Обов’язковий | Опис                                 |
|----------|--------|--------------|--------------------------------------|
| status   | string | ні           | Фільтр за статусом (наприклад, `"success"`) |

---

### z_listtransactions

```bash
zallet rpc z_listtransactions ['"<account_uuid>"'] [<start_height>] [<end_height>] [<offset>] [<limit>]
```

| Параметр    | Тип    | Обов’язковий | Опис                         |
|-------------|--------|--------------|------------------------------|
| account_uuid| string | ні           | Обмежити одним акаунтом      |
| start_height| number | ні           | Включна нижня межа           |
| end_height  | number | ні           | Виключна верхня межа         |
| offset      | number | ні           | Пропустити стільки результатів |
| limit       | number | ні           | Максимум результатів для повернення |

---

### z_listunifiedreceivers

```bash
zallet rpc z_listunifiedreceivers '"<unified_address>"'
```

| Параметр        | Тип    | Обов’язковий | Опис                           |
|-----------------|--------|--------------|--------------------------------|
| unified_address | string | так          | Unified Address для перевірки  |

---

### z_listunspent

```bash
zallet rpc z_listunspent [<minconf>] [<maxconf>] [<include_watchonly>] ['["addr1","addr2"]'] [<as_of_height>]
```

| Параметр          | Тип             | Обов’язковий | Типово | Опис                            |
|-------------------|-----------------|--------------|--------|---------------------------------|
| minconf           | number          | ні           | 1      | Мінімальна кількість підтверджень |
| maxconf           | number          | ні           | ∞      | Максимальна кількість підтверджень |
| include_watchonly | boolean         | ні           | false  | Включити лише для спостереження |
| addresses         | array of string | ні           |        | Фільтрувати за цими адресами    |
| as_of_height      | number          | ні           |        | Запит на цій висоті             |

---

### z_recoveraccounts

```bash
zallet rpc z_recoveraccounts '[{"name":"...","seedfp":"...","zip32_account_index":0,"birthday_height":123456}]'
```

| Параметр | Тип   | Обов’язковий | Опис                                                                    |
|----------|-------|--------------|-------------------------------------------------------------------------|
| accounts | array | так          | Масив об’єктів: `name`, `seedfp`, `zip32_account_index`, `birthday_height` |

---

### z_sendmany

```bash
zallet rpc z_sendmany '"<fromaddress>"' '[{"address":"...","amount":1.23,"memo":"..."}]' [<minconf>] [null] ['"<privacy_policy>"']
```

| Параметр       | Тип             | Обов’язковий | Типово          | Опис                                             |
|----------------|-----------------|--------------|-----------------|--------------------------------------------------|
| fromaddress    | string          | так          |                 | Вихідна адреса або `"ANY_TADDR"`                 |
| amounts        | array of object | так          |                 | Одержувачі (`address`, `amount`, необов’язковий `memo`) |
| minconf        | number          | ні           |                 | Мінімальна кількість підтверджень                |
| fee            | null            | ні           |                 | Має бути `null` (лише ZIP-317)                   |
| privacy_policy | string          | ні           | `"FullPrivacy"` | Рядок політики приватності                       |

---

### z_shieldcoinbase

```bash
zallet rpc z_shieldcoinbase '"<fromaddress_or_account_uuid>"' '"<toaddress>"' [null] [<limit>] ['"<memo_hex>"'] ['"<privacy_policy>"']
```

| Параметр       | Тип    | Обов’язковий | Опис                                             |
|----------------|--------|--------------|--------------------------------------------------|
| fromaddress    | string | так          | Прозора адреса або UUID акаунта                  |
| toaddress      | string | так          | Захищена адреса призначення                      |
| fee            | null   | ні           | Має бути `null`                                  |
| limit          | number | ні           | Максимальна кількість coinbase UTXO для захисту  |
| memo           | string | ні           | Memo у hex-кодуванні                             |
| privacy_policy | string | ні           | `AllowRevealedSenders` або `AllowLinkingAccountAddresses` |

---

### z_viewtransaction

```bash
zallet rpc z_viewtransaction '"<txid>"'
```

| Параметр | Тип    | Обов’язковий | Опис            |
|----------|--------|--------------|-----------------|
| txid     | string | так          | ID транзакції   |

---

## Пов’язані сторінки

- [Посібник з міграції: Zcashd до Zebrad і Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet) — покроковий перехід з наявного налаштування zcashd
- [Повний вузол Zebra](/zcash-tech/zebra-full-node) — реалізація вузла, разом з якою працює Zallet
- [Повні вузли](/zcash-tech/full-nodes) — що передбачає запуск повного вузла і навіщо він вам може знадобитися
- [Гаманці](/using-zcash/wallets) — легші варіанти гаманців, якщо повний вузол — це більше, ніж вам потрібно
- [Транзакції](/using-zcash/transactions) — чим відрізняються захищені та прозорі транзакції
