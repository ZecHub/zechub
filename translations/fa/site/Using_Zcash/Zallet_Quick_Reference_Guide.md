<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Zallet_Quick_Reference_Guide.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# راهنمای مرجع سریع Zallet

## خلاصه

- Zallet یک کیف‌پول فول‌نود Zcash است که با Rust نوشته شده است. این کیف‌پول جایگزین کیف‌پولی شده است که پیش‌تر درون zcashd قرار داشت.
- zcashd در 18 جولای 2026 به توقف پایان پشتیبانی خود رسید و دیگر اجرا نمی‌شود. اکنون Zebra بخش نود را بر عهده دارد و Zallet بخش کیف‌پول را.
- شما Zallet را از خط فرمان و با `zallet rpc <command>` کنترل می‌کنید، تقریباً همان‌طور که پیش‌تر از `zcash-cli` استفاده می‌کردید.
- هر آرگومانی که پس از نام فرمان می‌آید باید JSON معتبر باشد، یعنی مقادیر رشته‌ای علامت‌های نقل‌قول دوتایی خود را حفظ می‌کنند.
- Zallet در مرحلهٔ بتا است. فرمان‌ها ممکن است بین نسخه‌ها تغییر کنند و هنوز همهٔ RPCهای zcashd منتقل نشده‌اند.

## توضیح اصلی

Zallet قابلیت‌های خود را از طریق JSON-RPC در دسترس قرار می‌دهد؛ همان سبک رابطی که کیف‌پول zcashd استفاده می‌کرد. هر کاری که بخواهید کیف‌پول انجام دهد، از بررسی موجودی و ساخت حساب گرفته تا ارسال یک پرداخت محافظت‌شده، فرمانی است که به `zallet rpc` می‌دهید.

دو چیز با عادت قدیمی `zcash-cli` فرق دارد و بیشتر اشتباهات اولیه از آن‌ها ناشی می‌شود. نخست، آرگومان‌ها باید JSON معتبر باشند و نه متن خام، بنابراین یک آرگومان رشته‌ای علامت‌های نقل‌قول خود را درون نقل‌قول‌های shell دارد. دوم، مجموعهٔ فرمان‌های در دسترس به نسخهٔ بتایی بستگی دارد که اجرا می‌کنید، پس فهرستی که درون فایل اجرایی شما تعبیه شده از هر صفحهٔ مکتوبی، از جمله همین صفحه، قابل‌اعتمادتر است.

برای فهرست کردن همهٔ RPCهای در دسترس:

```bash
zallet rpc help
```

برای دریافت راهنمای دقیق یک RPC مشخص:

```bash
zallet rpc help '"<command>"'
```

> **مهم:** هر آرگومانی که پس از نام متد می‌آید **باید JSON معتبر باشد**.  
> مقادیر رشته‌ای باید به صورت `"value"` نوشته شوند (همراه با علامت‌های نقل‌قول دوتایی).

## اشتباهات رایج

- **حذف نقل‌قول‌های داخلی در آرگومان‌های رشته‌ای.** `zallet rpc validateaddress u1abc...` با شکست مواجه می‌شود، زیرا آدرس باید به صورت JSON برسد. باید آن را به صورت `'"u1abc..."'` نوشت.
- **فرض اینکه همهٔ RPCها اینجا وجود دارند.** انتقال هنوز در جریان است. برخی متدها دقیقاً به همان شکل رفتار می‌کنند، برخی به شیوهٔ استفادهٔ متفاوتی نیاز دارند و برخی اصلاً منتقل نخواهند شد.
- **معتبرتر دانستن این صفحه نسبت به فایل اجرایی خودتان.** Zallet در مرحلهٔ بتا است و به‌سرعت تغییر می‌کند. اگر فرمانی از این صفحه کار نکرد، پیش از آنکه فرض کنید چیزی خراب است، `zallet rpc help` را بررسی کنید.
- **انتظار اینکه Zallet یک نود باشد.** این برنامه نیمهٔ کیف‌پولِ این جفت است. Zebra نود را اجرا می‌کند و Zallet با آن ارتباط برقرار می‌کند.

## فرمان‌های RPC

### decoderawtransaction

```bash
zallet rpc decoderawtransaction '"<hexstring>"'
```

| پارامتر   | نوع   | الزامی | توضیح              |
|-------------|--------|----------|--------------------------|
| hexstring   | string | بله      | رشتهٔ hex تراکنش   |

---

### decodescript

```bash
zallet rpc decodescript '"<hexstring>"'
```

| پارامتر   | نوع   | الزامی | توضیح     |
|-------------|--------|----------|-----------------|
| hexstring   | string | بله      | hex اسکریپت      |

---

### getrawtransaction

```bash
zallet rpc getrawtransaction '"<txid>"' [verbose] ['"<blockhash>"']
```

| پارامتر  | نوع   | الزامی | پیش‌فرض | توضیح                          |
|------------|--------|----------|---------|--------------------------------------|
| txid       | string | بله      |         | شناسهٔ تراکنش                       |
| verbose    | number | خیر       | 0       | `0` = hex، غیرصفر = شیء JSON    |
| blockhash  | string | خیر       |         | محدود کردن جست‌وجو به این بلوک        |

---

### getwalletinfo

```bash
zallet rpc getwalletinfo
```

بدون پارامتر.

---

### getwalletstatus

```bash
zallet rpc getwalletstatus
```

بدون پارامتر.

---

### listaddresses

```bash
zallet rpc listaddresses
```

بدون پارامتر.

---

### rpc.discover

```bash
zallet rpc rpc.discover
```

بدون پارامتر. طرح‌وارهٔ OpenRPC را برمی‌گرداند.

---

### stop

```bash
zallet rpc stop
```

بدون پارامتر. (فقط Regtest)

---

### validateaddress

```bash
zallet rpc validateaddress '"<address>"'
```

| پارامتر | نوع   | الزامی | توضیح             |
|-----------|--------|----------|-------------------------|
| address   | string | بله      | آدرس شفاف     |

---

### verifymessage

```bash
zallet rpc verifymessage '"<address>"' '"<signature>"' '"<message>"'
```

| پارامتر  | نوع   | الزامی | توضیح             |
|------------|--------|----------|-------------------------|
| address    | string | بله      | آدرس شفاف     |
| signature  | string | بله      | امضای دیجیتال Base64        |
| message    | string | بله      | پیام اصلی        |

---

### walletlock

```bash
zallet rpc walletlock
```

بدون پارامتر.

---

### walletpassphrase

```bash
zallet rpc walletpassphrase '"<passphrase>"' <timeout>
```

| پارامتر   | نوع   | الزامی | توضیح                          |
|-------------|--------|----------|--------------------------------------|
| passphrase  | string | بله      | عبارت عبور کیف‌پول                    |
| timeout     | number | بله      | مدت باز ماندن قفل کیف‌پول به ثانیه  |

---

### z_converttex

```bash
zallet rpc z_converttex '"<transparent_address>"'
```

| پارامتر             | نوع   | الزامی | توضیح                |
|-----------------------|--------|----------|----------------------------|
| transparent_address   | string | بله      | آدرس P2PKH برای تبدیل   |

---

### z_exportkey

```bash
zallet rpc z_exportkey '"<sapling_address>"'
```

| پارامتر | نوع   | الزامی | توضیح                                      |
|-----------|--------|----------|--------------------------------------------------|
| address   | string | بله      | آدرس Sapling که کلید خرج‌کنندهٔ آن صادر می‌شود     |

> کیف‌پول باید باز باشد. فقط کلید خرج‌کنندهٔ Sapling را صادر می‌کند.

---

### z_getaccount

```bash
zallet rpc z_getaccount '"<account_uuid>"'
```

| پارامتر     | نوع   | الزامی | توضیح     |
|---------------|--------|----------|-----------------|
| account_uuid  | string | بله      | UUID حساب    |

---

### z_getaddressforaccount

```bash
zallet rpc z_getaddressforaccount <account> ['["p2pkh","sapling","orchard"]'] [<diversifier_index>]
```

| پارامتر          | نوع            | الزامی | توضیح                              |
|--------------------|-----------------|----------|------------------------------------------|
| account            | string / number | بله      | UUID حساب یا شاخص حساب ZIP-32     |
| receiver_types     | array of string | خیر       | انواع گیرنده برای گنجاندن                |
| diversifier_index  | number          | خیر       | شاخص diversifier مشخص               |

---

### z_getbalanceforaccount

```bash
zallet rpc z_getbalanceforaccount <account> [<minconf>]
```

| پارامتر | نوع            | الزامی | پیش‌فرض | توضیح                      |
|-----------|-----------------|----------|---------|----------------------------------|
| account   | string / number | بله      |         | UUID حساب یا شاخص ZIP-32     |
| minconf   | number          | خیر       | 1       | حداقل تأییدها            |

---

### z_getbalances

```bash
zallet rpc z_getbalances [<minconf>]
```

| پارامتر | نوع   | الزامی | پیش‌فرض | توضیح               |
|-----------|--------|----------|---------|---------------------------|
| minconf   | number | خیر       | 1       | حداقل تأییدها     |

---

### z_getnewaccount

```bash
zallet rpc z_getnewaccount '"<account_name>"' ['"<seedfp>"']
```

| پارامتر     | نوع   | الزامی | توضیح                              |
|---------------|--------|----------|------------------------------------------|
| account_name  | string | بله      | نام خوانا برای انسان                      |
| seedfp        | string | خیر       | در صورتی که کیف‌پول چند seed داشته باشد الزامی است    |

---

### z_getnotescount

```bash
zallet rpc z_getnotescount [<minconf>] [<as_of_height>]
```

| پارامتر     | نوع   | الزامی | پیش‌فرض | توضیح                          |
|---------------|--------|----------|---------|--------------------------------------|
| minconf       | number | خیر       | 1       | حداقل تأییدها                |
| as_of_height  | number | خیر       |         | پرس‌وجو در این ارتفاع (`-1` = نوک زنجیره) |

---

### z_getoperationresult

```bash
zallet rpc z_getoperationresult ['["opid1","opid2"]']
```

| پارامتر    | نوع            | الزامی | توضیح                              |
|--------------|-----------------|----------|------------------------------------------|
| operationid  | array of string | خیر       | شناسه‌های عملیات (برای همهٔ موارد پایان‌یافته حذف کنید)    |

---

### z_getoperationstatus

```bash
zallet rpc z_getoperationstatus ['["opid1","opid2"]']
```

| پارامتر    | نوع            | الزامی | توضیح                    |
|--------------|-----------------|----------|--------------------------------|
| operationid  | array of string | خیر       | شناسه‌های عملیات (برای همه حذف کنید)   |

---

### z_gettotalbalance

```bash
zallet rpc z_gettotalbalance [<minconf>] [<include_watchonly>]
```

| پارامتر          | نوع    | الزامی | پیش‌فرض | توضیح                     |
|--------------------|---------|----------|---------|---------------------------------|
| minconf            | number  | خیر       | 1       | حداقل تأییدها           |
| include_watchonly  | boolean | خیر       | false   | گنجاندن موجودی‌های فقط‌مشاهده     |

---

### z_importaddress

```bash
zallet rpc z_importaddress '"<account_uuid>"' '"<hex_data>"' [<rescan>]
```

| پارامتر  | نوع    | الزامی | پیش‌فرض | توضیح                          |
|------------|---------|----------|---------|--------------------------------------|
| account    | string  | بله      |         | UUID حساب                         |
| hex_data   | string  | بله      |         | کلید عمومی hex یا redeem script      |
| rescan     | boolean | خیر       | true    | اسکن مجدد پس از وارد کردن                  |

---

### z_importkey

```bash
zallet rpc z_importkey '"<key>"' ['"<rescan>"'] [<start_height>]
```

| پارامتر     | نوع   | الزامی | پیش‌فرض        | توضیح                              |
|---------------|--------|----------|----------------|------------------------------------------|
| key           | string | بله      |                | کلید خرج‌کنندهٔ توسعه‌یافتهٔ Sapling            |
| rescan        | string | خیر       | `"whenkeyisnew"` | `"yes"`، `"no"` یا `"whenkeyisnew"`   |
| start_height  | number | خیر       | 0              | ارتفاع شروع اسکن مجدد                      |

---

### z_listaccounts

```bash
zallet rpc z_listaccounts [<include_addresses>]
```

| پارامتر          | نوع    | الزامی | پیش‌فرض | توضیح                              |
|--------------------|---------|----------|---------|------------------------------------------|
| include_addresses  | boolean | خیر       | true    | برگرداندن آدرس‌های هر حساب نیز   |

---

### z_listoperationids

```bash
zallet rpc z_listoperationids ['"<status>"']
```

| پارامتر | نوع   | الزامی | توضیح                          |
|-----------|--------|----------|--------------------------------------|
| status    | string | خیر       | فیلتر بر اساس وضعیت (برای مثال `"success"`)  |

---

### z_listtransactions

```bash
zallet rpc z_listtransactions ['"<account_uuid>"'] [<start_height>] [<end_height>] [<offset>] [<limit>]
```

| پارامتر      | نوع   | الزامی | توضیح                  |
|----------------|--------|----------|------------------------------|
| account_uuid   | string | خیر       | محدود به یک حساب         |
| start_height   | number | خیر       | کران پایین (شامل)        |
| end_height     | number | خیر       | کران بالا (غیرشامل)        |
| offset         | number | خیر       | رد کردن این تعداد نتیجه       |
| limit          | number | خیر       | حداکثر نتایج بازگشتی    |

---

### z_listunifiedreceivers

```bash
zallet rpc z_listunifiedreceivers '"<unified_address>"'
```

| پارامتر         | نوع   | الزامی | توضیح                  |
|-------------------|--------|----------|------------------------------|
| unified_address   | string | بله      | Unified Address برای بررسی   |

---

### z_listunspent

```bash
zallet rpc z_listunspent [<minconf>] [<maxconf>] [<include_watchonly>] ['["addr1","addr2"]'] [<as_of_height>]
```

| پارامتر          | نوع            | الزامی | پیش‌فرض | توضیح                          |
|--------------------|-----------------|----------|---------|--------------------------------------|
| minconf            | number          | خیر       | 1       | حداقل تأییدها                |
| maxconf            | number          | خیر       | ∞       | حداکثر تأییدها                |
| include_watchonly  | boolean         | خیر       | false   | گنجاندن موارد فقط‌مشاهده                   |
| addresses          | array of string | خیر       |         | فیلتر به این آدرس‌ها            |
| as_of_height       | number          | خیر       |         | پرس‌وجو در این ارتفاع              |

---

### z_recoveraccounts

```bash
zallet rpc z_recoveraccounts '[{"name":"...","seedfp":"...","zip32_account_index":0,"birthday_height":123456}]'
```

| پارامتر | نوع  | الزامی | توضیح                                                                 |
|-----------|-------|----------|-----------------------------------------------------------------------------|
| accounts  | array | بله      | آرایه‌ای از اشیاء: `name`، `seedfp`، `zip32_account_index`، `birthday_height` |

---

### z_sendmany

```bash
zallet rpc z_sendmany '"<fromaddress>"' '[{"address":"...","amount":1.23,"memo":"..."}]' [<minconf>] [null] ['"<privacy_policy>"']
```

| پارامتر        | نوع            | الزامی | پیش‌فرض         | توضیح                                      |
|------------------|-----------------|----------|-----------------|--------------------------------------------------|
| fromaddress      | string          | بله      |                 | آدرس مبدأ یا `"ANY_TADDR"`                  |
| amounts          | array of object | بله      |                 | گیرندگان (`address`، `amount`، `memo` اختیاری)|
| minconf          | number          | خیر       |                 | حداقل تأییدها                            |
| fee              | null            | خیر       |                 | باید `null` باشد (فقط ZIP-317)                    |
| privacy_policy   | string          | خیر       | `"FullPrivacy"` | رشتهٔ سیاست حریم خصوصی                            |

---

### z_shieldcoinbase

```bash
zallet rpc z_shieldcoinbase '"<fromaddress_or_account_uuid>"' '"<toaddress>"' [null] [<limit>] ['"<memo_hex>"'] ['"<privacy_policy>"']
```

| پارامتر        | نوع   | الزامی | توضیح                                      |
|------------------|--------|----------|--------------------------------------------------|
| fromaddress      | string | بله      | آدرس شفاف یا UUID حساب              |
| toaddress        | string | بله      | مقصد محافظت‌شده                             |
| fee              | null   | خیر       | باید `null` باشد                                   |
| limit            | number | خیر       | حداکثر تعداد UTXOهای coinbase برای محافظت           |
| memo             | string | خیر       | یادداشت کدگذاری‌شده به صورت hex                                 |
| privacy_policy   | string | خیر       | `AllowRevealedSenders` یا `AllowLinkingAccountAddresses` |

---

### z_viewtransaction

```bash
zallet rpc z_viewtransaction '"<txid>"'
```

| پارامتر | نوع   | الزامی | توضیح     |
|-----------|--------|----------|-----------------|
| txid      | string | بله      | شناسهٔ تراکنش  |

---

## صفحات مرتبط

- [راهنمای مهاجرت: از zcashd به Zebrad و Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet) — انتقال گام‌به‌گام از یک راه‌اندازی موجود zcashd
- [فول‌نود Zebra](/zcash-tech/zebra-full-node) — پیاده‌سازی نودی که Zallet در کنار آن کار می‌کند
- [فول‌نودها](/zcash-tech/full-nodes) — اجرای یک فول‌نود شامل چه چیزهایی است و چرا ممکن است به آن نیاز داشته باشید
- [کیف‌پول‌ها](/using-zcash/wallets) — گزینه‌های کیف‌پول سبک‌تر، اگر فول‌نود بیش از نیاز شما است
- [تراکنش‌ها](/using-zcash/transactions) — تفاوت تراکنش‌های محافظت‌شده و شفاف
