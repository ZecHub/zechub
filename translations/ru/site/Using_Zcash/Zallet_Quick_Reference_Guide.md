---
<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Zallet_Quick_Reference_Guide.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Краткое справочное руководство по Zallet

## Кратко

- Zallet — это кошелёк Zcash с полным узлом, написанный на Rust. Он заменяет кошелёк, который раньше был встроен в zcashd.
- zcashd достиг остановки End-of-Support 18 июля 2026 года и больше не работает. Теперь за сторону узла отвечает Zebra; за сторону кошелька отвечает Zallet.
- Управление Zallet осуществляется из командной строки с помощью `zallet rpc <command>`, примерно так же, как раньше использовался `zcash-cli`.
- Каждый аргумент после имени команды должен быть корректным JSON, а это значит, что строковые значения сохраняют свои двойные кавычки.
- Zallet всё ещё находится в alpha-версии. Команды могут меняться между релизами, и пока ещё не все RPC из zcashd были перенесены.

## Основное объяснение

Zallet предоставляет свои функции через JSON-RPC — тот же стиль интерфейса, который использовал кошелёк zcashd. Всё, что вы хотите, чтобы сделал кошелёк — проверить баланс, создать аккаунт, отправить защищённый платёж — передаётся как команда в `zallet rpc`.

Есть два отличия от старой привычки работы с `zcash-cli`, и именно они становятся причиной большинства ранних ошибок. Во-первых, аргументы должны быть корректным JSON, а не простым текстом, поэтому строковый аргумент должен содержать собственные кавычки внутри кавычек оболочки. Во-вторых, набор доступных команд зависит от того, какую alpha-версию вы используете, поэтому список, встроенный в ваш бинарный файл, надёжнее любой написанной страницы, включая эту.

Чтобы вывести список всех доступных RPC:

```bash
zallet rpc help
```

Чтобы получить подробную справку по конкретному RPC:

```bash
zallet rpc help '"<command>"'
```

> **Важно:** Каждый аргумент после имени метода **должен быть корректным JSON**.  
> Строковые значения должны записываться как `"value"` (включая двойные кавычки).

## Распространённые ошибки

- **Пропуск внутренних кавычек у строковых аргументов.** `zallet rpc validateaddress u1abc...` завершится ошибкой, потому что адрес должен быть передан как JSON. Его нужно записывать как `'"u1abc..."'`.
- **Предположение, что здесь существует каждый RPC из zcashd.** Перенос всё ещё продолжается. Некоторые методы работают идентично, некоторые требуют иного использования, а некоторые вообще не будут перенесены.
- **Отношение к этой странице как к более авторитетному источнику, чем ваш бинарный файл.** Zallet находится в alpha и быстро развивается. Если команда отсюда не работает, сначала проверьте `zallet rpc help`, прежде чем считать, что что-то сломано.
- **Ожидание, что Zallet — это узел.** Это половина пары, отвечающая за кошелёк. Zebra запускает узел, а Zallet взаимодействует с ним.

## RPC-команды

### decoderawtransaction

```bash
zallet rpc decoderawtransaction '"<hexstring>"'
```

| Параметр   | Тип    | Обязательный | Описание                  |
|------------|--------|--------------|---------------------------|
| hexstring  | string | yes          | Hex-строка транзакции     |

---

### decodescript

```bash
zallet rpc decodescript '"<hexstring>"'
```

| Параметр   | Тип    | Обязательный | Описание        |
|------------|--------|--------------|-----------------|
| hexstring  | string | yes          | Hex скрипта     |

---

### getrawtransaction

```bash
zallet rpc getrawtransaction '"<txid>"' [verbose] ['"<blockhash>"']
```

| Параметр  | Тип    | Обязательный | По умолчанию | Описание                              |
|-----------|--------|--------------|--------------|---------------------------------------|
| txid      | string | yes          |              | ID транзакции                         |
| verbose   | number | no           | 0            | `0` = hex, ненулевое значение = JSON-объект |
| blockhash | string | no           |              | Ограничить поиск этим блоком          |

---

### getwalletinfo

```bash
zallet rpc getwalletinfo
```

Без параметров.

---

### getwalletstatus

```bash
zallet rpc getwalletstatus
```

Без параметров.

---

### listaddresses

```bash
zallet rpc listaddresses
```

Без параметров.

---

### rpc.discover

```bash
zallet rpc rpc.discover
```

Без параметров. Возвращает схему OpenRPC.

---

### stop

```bash
zallet rpc stop
```

Без параметров. (Только Regtest)

---

### validateaddress

```bash
zallet rpc validateaddress '"<address>"'
```

| Параметр | Тип    | Обязательный | Описание                |
|----------|--------|--------------|-------------------------|
| address  | string | yes          | Прозрачный адрес        |

---

### verifymessage

```bash
zallet rpc verifymessage '"<address>"' '"<signature>"' '"<message>"'
```

| Параметр  | Тип    | Обязательный | Описание                |
|-----------|--------|--------------|-------------------------|
| address   | string | yes          | Прозрачный адрес        |
| signature | string | yes          | Подпись Base64          |
| message   | string | yes          | Исходное сообщение      |

---

### walletlock

```bash
zallet rpc walletlock
```

Без параметров.

---

### walletpassphrase

```bash
zallet rpc walletpassphrase '"<passphrase>"' <timeout>
```

| Параметр   | Тип    | Обязательный | Описание                             |
|------------|--------|--------------|--------------------------------------|
| passphrase | string | yes          | Парольная фраза кошелька             |
| timeout    | number | yes          | Сколько секунд кошелёк будет разблокирован |

---

### z_converttex

```bash
zallet rpc z_converttex '"<transparent_address>"'
```

| Параметр              | Тип    | Обязательный | Описание                     |
|-----------------------|--------|--------------|------------------------------|
| transparent_address   | string | yes          | P2PKH-адрес для преобразования |

---

### z_exportkey

```bash
zallet rpc z_exportkey '"<sapling_address>"'
```

| Параметр | Тип    | Обязательный | Описание                                          |
|----------|--------|--------------|---------------------------------------------------|
| address  | string | yes          | Sapling-адрес, ключ трат которого нужно экспортировать |

> Кошелёк должен быть разблокирован. Экспортируется только ключ трат Sapling.

---

### z_getaccount

```bash
zallet rpc z_getaccount '"<account_uuid>"'
```

| Параметр     | Тип    | Обязательный | Описание      |
|--------------|--------|--------------|---------------|
| account_uuid | string | yes          | UUID аккаунта |

---

### z_getaddressforaccount

```bash
zallet rpc z_getaddressforaccount <account> ['["p2pkh","sapling","orchard"]'] [<diversifier_index>]
```

| Параметр          | Тип             | Обязательный | Описание                                 |
|-------------------|-----------------|--------------|------------------------------------------|
| account           | string / number | yes          | UUID аккаунта или индекс аккаунта ZIP-32 |
| receiver_types    | array of string | no           | Типы получателей, которые нужно включить |
| diversifier_index | number          | no           | Конкретный индекс диверсификатора        |

---

### z_getbalanceforaccount

```bash
zallet rpc z_getbalanceforaccount <account> [<minconf>]
```

| Параметр | Тип             | Обязательный | По умолчанию | Описание                          |
|----------|-----------------|--------------|--------------|-----------------------------------|
| account  | string / number | yes          |              | UUID аккаунта или индекс ZIP-32   |
| minconf  | number          | no           | 1            | Минимальное число подтверждений   |

---

### z_getbalances

```bash
zallet rpc z_getbalances [<minconf>]
```

| Параметр | Тип    | Обязательный | По умолчанию | Описание                        |
|----------|--------|--------------|--------------|---------------------------------|
| minconf  | number | no           | 1            | Минимальное число подтверждений |

---

### z_getnewaccount

```bash
zallet rpc z_getnewaccount '"<account_name>"' ['"<seedfp>"']
```

| Параметр    | Тип    | Обязательный | Описание                                 |
|-------------|--------|--------------|------------------------------------------|
| account_name| string | yes          | Понятное человеку имя                    |
| seedfp      | string | no           | Обязателен, если в кошельке несколько seed |

---

### z_getnotescount

```bash
zallet rpc z_getnotescount [<minconf>] [<as_of_height>]
```

| Параметр     | Тип    | Обязательный | По умолчанию | Описание                               |
|--------------|--------|--------------|--------------|----------------------------------------|
| minconf      | number | no           | 1            | Минимальное число подтверждений        |
| as_of_height | number | no           |              | Запрос на этой высоте (`-1` = tip)     |

---

### z_getoperationresult

```bash
zallet rpc z_getoperationresult ['["opid1","opid2"]']
```

| Параметр   | Тип             | Обязательный | Описание                                 |
|------------|-----------------|--------------|------------------------------------------|
| operationid| array of string | no           | ID операций (не указывать, чтобы получить все завершённые) |

---

### z_getoperationstatus

```bash
zallet rpc z_getoperationstatus ['["opid1","opid2"]']
```

| Параметр   | Тип             | Обязательный | Описание                          |
|------------|-----------------|--------------|-----------------------------------|
| operationid| array of string | no           | ID операций (не указывать, чтобы получить все) |

---

### z_gettotalbalance

```bash
zallet rpc z_gettotalbalance [<minconf>] [<include_watchonly>]
```

| Параметр          | Тип     | Обязательный | По умолчанию | Описание                         |
|-------------------|---------|--------------|--------------|----------------------------------|
| minconf           | number  | no           | 1            | Минимальное число подтверждений  |
| include_watchonly | boolean | no           | false        | Включить балансы только для просмотра |

---

### z_importaddress

```bash
zallet rpc z_importaddress '"<account_uuid>"' '"<hex_data>"' [<rescan>]
```

| Параметр | Тип     | Обязательный | По умолчанию | Описание                              |
|----------|---------|--------------|--------------|---------------------------------------|
| account  | string  | yes          |              | UUID аккаунта                         |
| hex_data | string  | yes          |              | Hex открытого ключа или redeem script |
| rescan   | boolean | no           | true         | Повторное сканирование после импорта  |

---

### z_importkey

```bash
zallet rpc z_importkey '"<key>"' ['"<rescan>"'] [<start_height>]
```

| Параметр    | Тип    | Обязательный | По умолчанию    | Описание                               |
|-------------|--------|--------------|-----------------|----------------------------------------|
| key         | string | yes          |                 | Расширенный ключ трат Sapling          |
| rescan      | string | no           | `"whenkeyisnew"` | `"yes"`, `"no"` или `"whenkeyisnew"` |
| start_height| number | no           | 0               | Начальная высота повторного сканирования |

---

### z_listaccounts

```bash
zallet rpc z_listaccounts [<include_addresses>]
```

| Параметр         | Тип     | Обязательный | По умолчанию | Описание                                  |
|------------------|---------|--------------|--------------|-------------------------------------------|
| include_addresses| boolean | no           | true         | Также вернуть адреса для каждого аккаунта |

---

### z_listoperationids

```bash
zallet rpc z_listoperationids ['"<status>"']
```

| Параметр | Тип    | Обязательный | Описание                                  |
|----------|--------|--------------|-------------------------------------------|
| status   | string | no           | Фильтр по статусу (например, `"success"`) |

---

### z_listtransactions

```bash
zallet rpc z_listtransactions ['"<account_uuid>"'] [<start_height>] [<end_height>] [<offset>] [<limit>]
```

| Параметр     | Тип    | Обязательный | Описание                         |
|--------------|--------|--------------|----------------------------------|
| account_uuid | string | no           | Ограничить одним аккаунтом       |
| start_height | number | no           | Включаемая нижняя граница        |
| end_height   | number | no           | Исключаемая верхняя граница      |
| offset       | number | no           | Пропустить столько результатов   |
| limit        | number | no           | Максимум возвращаемых результатов |

---

### z_listunifiedreceivers

```bash
zallet rpc z_listunifiedreceivers '"<unified_address>"'
```

| Параметр        | Тип    | Обязательный | Описание                          |
|-----------------|--------|--------------|-----------------------------------|
| unified_address | string | yes          | Unified Address для проверки      |

---

### z_listunspent

```bash
zallet rpc z_listunspent [<minconf>] [<maxconf>] [<include_watchonly>] ['["addr1","addr2"]'] [<as_of_height>]
```

| Параметр          | Тип             | Обязательный | По умолчанию | Описание                          |
|-------------------|-----------------|--------------|--------------|-----------------------------------|
| minconf           | number          | no           | 1            | Минимальное число подтверждений   |
| maxconf           | number          | no           | ∞            | Максимальное число подтверждений  |
| include_watchonly | boolean         | no           | false        | Включить только для просмотра     |
| addresses         | array of string | no           |              | Фильтр по этим адресам            |
| as_of_height      | number          | no           |              | Запрос на этой высоте             |

---

### z_recoveraccounts

```bash
zallet rpc z_recoveraccounts '[{"name":"...","seedfp":"...","zip32_account_index":0,"birthday_height":123456}]'
```

| Параметр | Тип   | Обязательный | Описание                                                                   |
|----------|-------|--------------|----------------------------------------------------------------------------|
| accounts | array | yes          | Массив объектов: `name`, `seedfp`, `zip32_account_index`, `birthday_height` |

---

### z_sendmany

```bash
zallet rpc z_sendmany '"<fromaddress>"' '[{"address":"...","amount":1.23,"memo":"..."}]' [<minconf>] [null] ['"<privacy_policy>"']
```

| Параметр       | Тип             | Обязательный | По умолчанию    | Описание                                         |
|----------------|-----------------|--------------|-----------------|--------------------------------------------------|
| fromaddress    | string          | yes          |                 | Адрес-источник или `"ANY_TADDR"`                 |
| amounts        | array of object | yes          |                 | Получатели (`address`, `amount`, необязательный `memo`) |
| minconf        | number          | no           |                 | Минимальное число подтверждений                  |
| fee            | null            | no           |                 | Должен быть `null` (только ZIP-317)              |
| privacy_policy | string          | no           | `"FullPrivacy"` | Строка политики конфиденциальности               |

---

### z_shieldcoinbase

```bash
zallet rpc z_shieldcoinbase '"<fromaddress_or_account_uuid>"' '"<toaddress>"' [null] [<limit>] ['"<memo_hex>"'] ['"<privacy_policy>"']
```

| Параметр      | Тип    | Обязательный | Описание                                              |
|---------------|--------|--------------|-------------------------------------------------------|
| fromaddress   | string | yes          | Прозрачный адрес или UUID аккаунта                    |
| toaddress     | string | yes          | Защищённый адрес назначения                           |
| fee           | null   | no           | Должен быть `null`                                    |
| limit         | number | no           | Максимальное число coinbase UTXO для экранирования    |
| memo          | string | no           | Memo в hex-кодировке                                  |
| privacy_policy| string | no           | `AllowRevealedSenders` или `AllowLinkingAccountAddresses` |

---

### z_viewtransaction

```bash
zallet rpc z_viewtransaction '"<txid>"'
```

| Параметр | Тип    | Обязательный | Описание      |
|----------|--------|--------------|---------------|
| txid     | string | yes          | ID транзакции |

---

## Связанные страницы

- [Руководство по миграции: Zcashd на Zebrad и Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet) — пошаговый переход с существующей конфигурации zcashd
- [Полный узел Zebra](/zcash-tech/zebra-full-node) — реализация узла, с которой работает Zallet
- [Полные узлы](/zcash-tech/full-nodes) — что включает в себя запуск полного узла и зачем он может вам понадобиться
- [Кошельки](/using-zcash/wallets) — более лёгкие варианты кошельков, если полный узел — это больше, чем вам нужно
- [Транзакции](/using-zcash/transactions) — чем отличаются защищённые и прозрачные транзакции
