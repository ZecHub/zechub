<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zcash_Node_RPC_and_Indexing.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# راهنمای عملی: RPC نود Zcash و ایندکس‌گذاری بلاک‌چین

این صفحه مجموعه‌ای از دستورالعمل‌های عملی برای ارتباط با یک فول‌نود Zcash در حال اجرا از طریق JSON-RPC و برای اتصال یک ایندکسر است که کیف‌پول‌های سبک و اکسپلوررها بتوانند از آن پرس‌وجو کنند. این صفحه راهنمای نصب دیگری **نیست**.

برای راه‌اندازی استک پس از `zcashd` (Zebra + Zallet، Zaino اختیاری، پورت‌ها، volumeها، بوت دومرحله‌ای)، از صفحهٔ [استک Z3](/zcash-tech/z3-stack) و [مخزن Z3](https://github.com/ZcashFoundation/z3) استفاده کنید. برای آشنایی با پیش‌زمینهٔ نود اجماع، [فول‌نودها](/zcash-tech/full-nodes) و [فول‌نود Zebra](/zcash-tech/zebra-full-node) را ببینید.

`zcashd` در 18 ژوئیه 2026 به پایان عمر خود رسید. کارهای جدید اپراتورها باید Zebra (یا [Zakura](/zcash-tech/zakura-node)) به‌همراه یک کیف‌پول/ایندکسر را هدف بگیرند، نه `zcashd`.

---

## خلاصه

* **JSON-RPC** روشی است که اپراتورها و کیف‌پول‌ها از طریق آن دربارهٔ نوک زنجیره، همتاها و (در یک فرایند کیف‌پول) موجودی‌ها از نود پرس‌وجو می‌کنند. در Z3، Zebra RPC نود را ارائه می‌دهد و Zallet RPC کیف‌پول را ارائه می‌دهد.
* **Regtest** محل مناسبی برای یادگیری فراخوانی‌هاست. rpc-router در Z3 روی `http://127.0.0.1:8181`، `zebra` / `zebra` را می‌پذیرد و متدهای نود را به Zebra و متدهای کیف‌پول را به Zallet ارسال می‌کند.
* **Mainnet و testnet** از احراز هویت cookie روی Zebra استفاده می‌کنند. نام کاربری/رمز عبور regtest را روی یک نود عمومی کپی نکنید.
* **ایندکس‌گذاری** کاری جدا از اعتبارسنجی است. Zebra اعتبارسنجی می‌کند. [Zaino](/zcash-tech/zaino) (`--profile indexer` در Z3) gRPC سازگار با lightwalletd ارائه می‌دهد. [Ztreamer](https://github.com/zcashlabs/ztreamer) یک ایندکسر مبتنی بر Zakura است؛ این همان چیزی نیست که Z3 عرضه می‌کند.
* JSON-RPC Zaino و gRPC ایندکسر اختیاری Zebra برای loopback یا یک شبکهٔ مورد اعتماد هستند. آن‌ها را بدون احراز هویت در اینترنت عمومی در دسترس قرار ندهید.

---

## کدام فرایند به کدام فراخوانی پاسخ می‌دهد

| آنچه می‌خواهید | با چه چیزی ارتباط بگیرید | پورت میزبان Z3 در mainnet | نکات |
| --- | --- | --- | --- |
| نوک زنجیره، همتاها، `getblockchaininfo` | JSON-RPC Zebra | 8232 | احراز هویت cookie |
| موجودی کیف‌پول، آدرس‌ها، ارسال | RPC Zallet | 28232 | فرایند جداگانه؛ نرم‌افزار بتا |
| بلوک‌های فشرده برای کیف‌پول‌های سبک | gRPC Zaino | 8137 | فقط با `--profile indexer`؛ h2c متن ساده |
| پراکسی JSON-RPC اکسپلورر / فاست | JSON-RPC Zaino | 8237 | فقط شبکهٔ مورد اعتماد |
| تمرین همهٔ موارد بالا بدون همگام‌سازی | rpc-router در regtest Z3 | 8181 | نام کاربری `zebra` / رمز عبور `zebra` |

ماتریس پورت‌ها و نام پروژه‌های Compose: [استک Z3](/zcash-tech/z3-stack) و [`z3-contract.yaml`](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml).

---

## ابتدا روی regtest تمرین کنید

در یک checkout از Z3، پس از `./scripts/regtest-init.sh` و `docker compose --env-file .env.regtest up -d`:

```bash
# Node method (Zebra)
curl -s -X POST -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"getblockchaininfo","params":[],"id":1}' \
  http://127.0.0.1:8181

# Wallet method (Zallet)
curl -s -X POST -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"getwalletinfo","params":[],"id":2}' \
  http://127.0.0.1:8181
```

نتیجهٔ سالم `getblockchaininfo` شامل `"blocks"` و یک نگاشت `"upgrades"` است. اگر curl متوقف بماند، router بالا نیامده است؛ اگر `401` دریافت کنید، به‌جای router مستقیماً به Zebra درخواست می‌فرستید (Zebra مستقیم در regtest برابر `29232` است و همچنان اعتبارنامه‌های router را انتظار دارد، مگر آنکه آن‌ها را تغییر داده باشید).

گردش‌کار کامل regtest، از جمله استخراج بلوک‌های فعال‌سازی: [Z3 `docs/regtest.md`](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md).

---

## JSON-RPC در Mainnet / testnet (احراز هویت cookie)

در mainnet و testnet، Zallet و سرویس اختیاری Zaino یک **volume مشترک cookie** را می‌خوانند. این cookie هنگام بوت دوباره تولید می‌شود؛ نیازی به پشتیبان‌گیری از آن نیست.

JSON-RPC Zebra را در اینترنت عمومی منتشر **نکنید**. آن را از شبکهٔ Compose (`zebra:8232`) فراخوانی کنید، یا از میزبان، فقط در صورتی که آن را به loopback متصل کرده باشید.

بررسی‌های معمول اپراتور پس از آنکه Zebra در وضعیت `/ready` قرار گرفت:

```bash
# Wait until Zebra is synced (Z3 helper)
./scripts/check-zebra-readiness.sh

# Then start Zallet
docker compose --env-file .env.mainnet up -d
```

`getblocktemplate` / `getmininginfo` متدهای RPC استخراج هستند. استخرهایی که هنوز انتظار یک فرایند واحد `zcashd` را داشتند، برای قالب‌ها به Zebra (یا Zakura) و نیز به هر کیف‌پولی که برای coinbase استفاده می‌کنند نیاز دارند. [استخرهای استخراج Zcash](/using-zcash/zcash-mining-pools) و [راهنمای مهاجرت](/guides/migration-guide-zcashd-to-zebrad-zallet) را ببینید.

---

## اتصال یک ایندکسر

اعتبارسنجی و ایندکس‌گذاری کارهای متفاوتی هستند.

### Zaino (آنچه Z3 عرضه می‌کند)

Zaino از Zebra می‌خواند و یک API gRPC سازگار با lightwalletd به‌همراه یک پراکسی JSON-RPC ارائه می‌دهد. Zallet به کانتینر مستقل Zaino نیاز **ندارد**؛ کتابخانه‌های Zaino را در خود جای داده و از طریق JSON-RPC با Zebra ارتباط برقرار می‌کند. هنگامی که به کیف‌پول‌های سبک، اکسپلوررها یا فاست‌های خارجی نیاز دارید، Zaino مستقل را راه‌اندازی کنید:

```bash
docker compose --env-file .env.mainnet --profile indexer up -d
```

پیش از هدایت کلاینت‌ها به Zaino، صبر کنید تا Zebra همگام‌سازی شود. یک ایندکسر انبوه که در حال جبران عقب‌ماندگی با همزمانی بالای دریافت داده است، می‌تواند تأییدکنندهٔ Zebra را کند کند؛ تا زمانی که ایندکسر عقب‌ماندگی را جبران کند، `fetch_concurrency` را در حد اعداد تک‌رقمی پایین نگه دارید.

gRPC در Regtest (متن ساده؛ پورت `28137`):

```bash
# From the Z3 repo, after: scripts/vendor.sh zaino
# and: docker compose --env-file .env.regtest --profile indexer up -d zaino

grpcurl -plaintext \
  -import-path vendor/zaino/zaino-proto/proto \
  -proto service.proto \
  127.0.0.1:28137 \
  cash.z.wallet.sdk.rpc.CompactTxStreamer/GetLightdInfo

grpcurl -plaintext \
  -import-path vendor/zaino/zaino-proto/proto \
  -proto service.proto \
  -d '{}' \
  127.0.0.1:28137 \
  cash.z.wallet.sdk.rpc.CompactTxStreamer/GetLatestBlock
```

gRPC Zaino در همهٔ شبکه‌ها به‌صورت h2c متن ساده است. اگر قرار است هر چیزی خارج از میزبان متصل شود، TLS را در یک پراکسی معکوس خاتمه دهید. جزئیات: [Zaino](/zcash-tech/zaino) و [Z3 `docs/regtest.md`](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md).

### ایندکسرهای دیگر (غیر از Z3)

* **lightwalletd** — سرور قدیمی‌تر بلوک‌های فشرده. همچنان در عمل مستقر است؛ Zaino مسیر جانشین برای این نقش است.
* **Ztreamer** — یک ایندکسر مبتنی بر Zakura و پیاده‌سازی `CompactTxStreamer`. این یک سرویس Z3 نیست. [مخزن Ztreamer](https://github.com/zcashlabs/ztreamer) را ببینید.
* **Zebra `rpc.indexer_listen_addr`** — یک listener اختیاری gRPC *درون* Zebra. Z3 به آن نیاز ندارد و آن را برای میزبان منتشر نمی‌کند.

---

## اشتباهات رایج

**فراخوانی متدهای کیف‌پول روی Zebra.** `getwalletinfo` و RPCهای ارسال متعلق به Zallet (یا کیف‌پول دیگری) هستند، نه نود اجماع.

**راه‌اندازی Zallet پیش از آنکه Zebra در وضعیت `/ready` باشد.** Zallet در حلقهٔ راه‌اندازی مجدد گیر می‌کند. در mainnet/testnet از `scripts/check-zebra-readiness.sh` استفاده کنید.

**کپی کردن `zebra`/`zebra` مربوط به regtest روی mainnet.** احراز هویت cookie به دلیل مشخصی پیش‌فرض mainnet/testnet است.

**در نظر گرفتن Zaino به‌عنوان یک فول‌نود.** Zebra (یا Zakura) اعتبارسنجی می‌کند. Zaino ایندکس می‌کند.

**در معرض عموم قرار دادن JSON-RPC Zaino یا gRPC ایندکسر Zebra.** این endpointها برای loopback یا یک شبکهٔ خصوصی مورد اعتماد هستند.

**فرض اینکه هر کیف‌پول سبکی از قبل از Zaino پشتیبانی می‌کند.** نسخهٔ فعلی کیف‌پول را با پروتکلی که واقعاً پیاده‌سازی می‌کند مقایسه و بررسی کنید.

---

## صفحات مرتبط

* [استک Z3](/zcash-tech/z3-stack) — نصب، پورت‌ها، volumeها، بوت دومرحله‌ای
* [Zaino](/zcash-tech/zaino) — نقش ایندکسر و نکات اپراتور
* [فول‌نودها](/zcash-tech/full-nodes)
* [فول‌نود Zebra](/zcash-tech/zebra-full-node)
* [نودهای کیف‌پول سبک](/zcash-tech/lightwallet-nodes)
* [راهنمای مهاجرت: از zcashd به Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet)
* [آموزش Zingolib و Zaino](/guides/zingolib-and-zaino-tutorial)

## منابع

* [مخزن Z3](https://github.com/ZcashFoundation/z3)
* [راهنمای کاربردی regtest در Z3 (curl / grpcurl)](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md)
* [پرسش‌های متداول Z3](https://github.com/ZcashFoundation/z3/blob/main/docs/faq.md)
* [Zebra](https://zebra.zfnd.org/)
* [Zaino](https://github.com/zingolabs/zaino)
* [کتاب Zallet](https://zcash.github.io/zallet/)
* [Ztreamer](https://github.com/zcashlabs/ztreamer)

**آخرین به‌روزرسانی:** سپتامبر 2026
