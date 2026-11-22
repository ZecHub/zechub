<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Z3_Stack.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="ویرایش صفحه"/>
</a>

# Z3 Stack

**Z3 Stack** پلتفرم بسته‌بندی‌شده نودِ Zcash Foundation است: **Zebra** (فول‌نود) + **Zallet** (کیف‌پول فول‌نود)، همراه با ایندکسر اختیاری **Zaino**. این پلتفرم جایگزین موردنظر برای فرایند مستقل `zcashd` است؛ فرایندی که اجماع و کیف‌پول را در یک فایل اجرایی واحد بسته‌بندی می‌کرد و در 18 جولای 2026 به پایان عمر خود رسید.

پیاده‌سازی مرجع، پروژه Compose متعلق به Docker در [github.com/ZcashFoundation/z3](https://github.com/ZcashFoundation/z3) است.

> **وضعیت، 14 نوامبر 2026: نسخه‌های پیش‌فرض از NU7 قدیمی‌تر هستند.** مقدار `docker-compose.yml` در Z3 آخرین بار در 10 آگوست 2026 تغییر کرد. این مقدار هنوز `zfnd/zebra:6.2.3` و `zodlinc/zallet:v0.1.0-beta.1` را پین می‌کند که با فایل اجرایی `zallet-zaino` شروع شده‌اند. [NU7](NU7.md) در 6 نوامبر 2026 و در بلوک 3,543,405 روی Mainnet فعال شد و فقط Zebra نسخه 7.0.0 یا بالاتر از آن پیروی می‌کند: Zebra نسخه 6.x روی قوانین قدیمی می‌ماند و از زنجیره واقعی جدا می‌شود. Zallet نسخه v0.1.0-beta.4، نخستین نسخه‌ای که از NU7 پیروی می‌کند، دیگر `zallet-zaino` را به‌کلی عرضه نمی‌کند. پیش از استقرار، مخزن را برای نسخه‌های پین‌شده جدیدتر بررسی کنید. اگر خودتان تصاویر را جایگزین می‌کنید، توجه داشته باشید که بک‌اند باقی‌مانده `zebra` در Zallet مستقیماً دایرکتوری وضعیت Zebra را می‌خواند؛ بنابراین Zallet باید روی همان میزبان و با دسترسی به آن دایرکتوری اجرا شود ([Zallet](Zallet.md)).

---

## خلاصه

* Z3 **کلاینت اجماع جدیدی نیست**. روشی است برای اجرای یکپارچه استک پس از `zcashd`: Zebra زنجیره را اعتبارسنجی می‌کند، Zallet کلیدها را نگه می‌دارد و RPC کیف‌پول را ارائه می‌دهد، و Zaino (اختیاری) با پروتکل gRPCِ lightwalletd ارتباط برقرار می‌کند.
* `zcashd` نود و کیف‌پول را یک‌جا عرضه می‌کرد. Z3 این نقش‌ها را **از هم جدا می‌کند**. صرافی‌ها، استخرهای استخراج و دیگر اپراتورهای کیف‌پول فول‌نود، به‌جای استفاده از Zebra به‌تنهایی، به این ترکیب مهاجرت می‌کنند.
* سه پروژه Compose مجزا می‌توانند روی یک میزبان اجرا شوند: **mainnet**، **testnet** و **regtest**.
* همگام‌سازی اولیه Mainnet حدود **24 تا 72 ساعت** طول می‌کشد و تقریباً **300 GB** فضا نیاز دارد. Regtest در چند ثانیه راه‌اندازی می‌شود و محل مناسبی برای آشنایی با استک است.
* در تصویر پین‌شده Z3، Zallet بک‌اند `zallet-zaino` خود را اجرا می‌کند (کتابخانه‌های ایندکسر Zaino) و از طریق JSON-RPC با Zebra ارتباط دارد. Zallet این بک‌اند را در نسخه v0.1.0-beta.4 حذف کرد؛ Zallet فعلی مستقیماً وضعیت Zebra را می‌خواند. سرویس مستقل Zaino فقط زمانی لازم است که برای کیف‌پول‌های خارجی به نقطه پایانی سازگار با lightwalletd نیاز داشته باشید.
* Zallet در مرحله **بتا** است. تغییرات ناسازگار ممکن است حذف و ایجاد دوباره کیف‌پول را لازم کنند. آن را نرم‌افزار امانیِ کامل‌شده برای نگهداری مبالغ زیاد تلقی نکنید.

---

## چرا Z3 وجود دارد

در بیشتر عمر Zcash، `zcashd` هم فول‌نود مرجع بود و هم تنها کیف‌پول فول‌نود آماده استفاده در محیط عملیاتی. صرافی‌ها، استخرها و متولیان دارایی همین ساختار را با سیستم‌های خود یکپارچه کردند.

`zcashd` بازنشسته شده است. اجماع به [Zebra](/zcash-tech/zebra-full-node) منتقل شد (و اکنون [Zakura](/zcash-tech/zakura-node) نیز اضافه شده‌اند). کیف‌پول تعبیه‌شده به [Zallet](https://github.com/zcash/zallet) منتقل شد. ارائه خدمات به کیف‌پول‌های سبک نیز از [lightwalletd](/zcash-tech/lightwallet-nodes) به [Zaino](/zcash-tech/zaino) در حال انتقال است.

این سه بخش مخازن، چرخه‌های انتشار و پیکربندی‌های جداگانه دارند. Z3 نقش اتصال‌دهنده را دارد: تصاویر پین‌شده، بررسی‌های سلامت که تا همگام‌شدن نود مانع راه‌اندازی کیف‌پول می‌شوند، پورت‌ها و حجم‌های ذخیره‌سازی جداگانه برای هر شبکه، و مسیر مستند برای اپراتورها.

این نام، خلاصه‌ای غیررسمی در اکوسیستم است — Zebra، Zaino، Zallet — هرچند فایل Compose پیش‌فرض فقط Zebra و Zallet را راه‌اندازی می‌کند. Zaino یک پروفایل Compose است، نه فرایند سومی که اجرای آن الزامی باشد.

---

## معماری

```
                    ┌──────────────────────── Z3 (per network) ────────────────────────┐
                    │                                                                  │
  peers ◄──P2P──►  Zebra (zebrad)  ──JSON-RPC──►  Zallet                                │
                    │   full node                    │  embeds Zaino libraries          │
                    │                                │  wallet RPC for operators        │
                    │                                └─────────────────────────────────┤
                    │                                                                  │
                    │   Zaino (optional, --profile indexer)                            │
                    │     lightwalletd-compatible gRPC + JSON-RPC proxy                │
                    │            │                                                     │
                    └────────────┼─────────────────────────────────────────────────────┘
                                 ▼
                        light wallets / explorers
```

| مؤلفه | نقش در Z3 | الزامی؟ |
| --- | --- | --- |
| **Zebra** | زنجیره را همگام‌سازی و اعتبارسنجی می‌کند، شایعه‌پراکنی، JSON-RPC و نقطه پایانی سلامت را ارائه می‌دهد | بله |
| **Zallet** | کیف‌پول فول‌نود. تصویر بتای پین‌شده beta.1 بک‌اند مبتنی بر کتابخانه Zaino را اجرا می‌کند (`zallet-zaino` که در Zallet beta.4 حذف شد) و مستقیماً به JSON-RPCِ Zebra متصل می‌شود. با کانتینر مستقل Zaino ارتباط نمی‌گیرد | بله |
| **Zaino** | ایندکسر مستقل. gRPC سازگار با lightwalletd برای کلاینت‌های سبک خارجی، به‌علاوه یک پراکسی JSON-RPC برای مرورگرها و فاست‌ها | خیر — `--profile indexer` |

Z3 نسخه‌های تصویر را در `docker-compose.yml` پین می‌کند. اگر به برچسب دیگری نیاز دارید، با `Z3_ZEBRA_IMAGE`، `Z3_ZAINO_IMAGE` یا `Z3_ZALLET_IMAGE` آن را جایگزین کنید.

---

## تفاوت آن با zcashd

| | zcashd | Z3 |
| --- | --- | --- |
| زبان | C++ (انشعابی از Bitcoin) | سرویس‌های Rust که با Composeِ Docker هماهنگ شده‌اند |
| مدل فرایند | یک فایل اجرایی: نود + کیف‌پول | کانتینرهای جداگانه برای نود و کیف‌پول |
| اجماع | بازنشسته (پایان عمر در 18 جولای 2026) | Zebra (یا نود سازگار دیگری) |
| کیف‌پول | `wallet.dat` داخلی | Zallet، دایرکتوری داده رمزگذاری‌شده با age |
| کلاینت‌های سبک | معمولاً lightwalletd جداگانه | پروفایل اختیاری Zaino |
| پیکربندی | `zcash.conf` | فایل‌های جداگانه هر شبکه در `config/<network>/` به‌علاوه فایل‌های محیطی Compose |
| شبکه‌ها روی یک میزبان | تداخل پورت‌ها دردسرساز است | پشتیبانی اصلی: `z3-mainnet`، `z3-testnet`، `z3-regtest` |

اگر هنوز کیف‌پول `zcashd` را دارید، به‌جای کپی‌کردن `wallet.dat` در حجم Z3، از ZecHub و [migration guide](/guides/migration-guide-zcashd-to-zebrad-zallet) استفاده کنید و فرمان `migrate-zcashd-wallet` متعلق به Zallet را اجرا کنید.

---

## شبکه‌ها

Z3 شامل سه پروژه مستقل Compose است. این پروژه‌ها پورت‌ها یا حجم‌های ذخیره‌سازی مشترک ندارند.

| شبکه | نام پروژه | کاربرد | همگام‌سازی اولیه | دارایی واقعی |
| --- | --- | --- | --- | --- |
| **mainnet** | `z3-mainnet` | محیط عملیاتی | 24 تا 72 ساعت | بله |
| **testnet** | `z3-testnet` | محیط آزمایشی روی شبکه آزمایشی عمومی | 2 تا 12 ساعت | خیر (ZEC آزمایشی) |
| **regtest** | `z3-regtest` | تمرین محلی: بلوک‌های فوری، بدون همتا | چند ثانیه | خیر |

اپراتورهای تازه‌کار باید با **regtest** شروع کنند، جریان‌های RPC و کیف‌پول را بررسی کنند و سپس به testnet یا mainnet بروند.

---

## پورت‌های پیش‌فرض میزبان

قرار است هر سه شبکه روی یک دستگاه کنار هم اجرا شوند. مقادیر زیر پیش‌فرض‌های منتشرشده هستند؛ همه آن‌ها را می‌توان با متغیر محیطی `Z3_*` متناظر تغییر داد. ماتریس مرجع در [`z3-contract.yaml`](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml) آمده است.

| سرویس | Mainnet | Testnet | Regtest |
| --- | --- | --- | --- |
| JSON-RPCِ Zebra | 8232 | 18232 | 29232 |
| P2Pِ Zebra | 8233 | 18233 | (منتشر نمی‌شود) |
| سلامت Zebra (`/ready`) | 8080 | 18080 | 28080 |
| gRPCِ Zaino (پروفایل ایندکسر) | 8137 | 18137 | 28137 |
| JSON-RPCِ Zaino (پروفایل ایندکسر) | 8237 | 18237 | 28237 |
| RPCِ Zallet | 28232 | 40232 | 50232 |

درون شبکه Compose، سرویس‌ها با نامشان قابل دسترسی‌اند (`zebra`، `zaino`، `zallet`).

---

## داده‌ها و نسخه‌های پشتیبان

| حجم ذخیره‌سازی | محتوای آن | از آن نسخه پشتیبان بگیرید؟ |
| --- | --- | --- |
| `z3-<network>-chain` | وضعیت زنجیره Zebra (حدود 300 GB در mainnet) | اختیاری — قابل همگام‌سازی مجدد |
| `z3-<network>-zallet` | پایگاه داده رمزگذاری‌شده کیف‌پول **و** شناسه age که قفل آن را باز می‌کند | **بله — این تنها حجمی است که باید از آن نسخه پشتیبان تهیه کنید** |
| `z3-<network>-zaino` | وضعیت ایندکسر (فقط با پروفایل ایندکسر) | اختیاری — قابل بازسازی |
| `z3-<network>-cookie` | کوکی RPCِ Zebra | خیر — دوباره ایجاد می‌شود |

برای ذخیره وضعیت زنجیره روی دیسکی دیگر، پیش از نخستین راه‌اندازی:

```bash
export Z3_CHAIN_DATA_PATH=/mnt/ssd/zebra-state
./scripts/fix-permissions.sh zebra /mnt/ssd/zebra-state
```

`docker compose --env-file .env.<network> --profile "*" down` استک را متوقف می‌کند و حجم‌های ذخیره‌سازی را نگه می‌دارد. افزودن `-v` آن‌ها را حذف می‌کند و همگام‌سازی کامل را از نو انجام می‌دهد. `--profile "*"` را هم وارد کنید تا سرویس‌های وابسته به پروفایل (ایندکسر، پایش) واقعاً متوقف و حذف شوند.

---

## شروع به کار

پیش‌نیازها: Docker Engine، Docker Compose نسخه 2.24.4 یا بالاتر، Git. `openssl` فقط برای regtest لازم است.

### Regtest (سریع‌ترین راه برای آشنایی با استک)

```bash
git clone https://github.com/ZcashFoundation/z3 && cd z3
./scripts/regtest-init.sh
docker compose --env-file .env.regtest up -d
```

فرمان‌های آزمایشی را در [docs/regtest.md](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md) ببینید.

### Mainnet (راه‌اندازی دو مرحله‌ای)

Zebra باید همگام‌سازی را کامل کند تا Zallet قابل استفاده باشد. اگر Zallet را زودتر راه‌اندازی کنید، تا برقرارشدن `/ready` پیوسته راه‌اندازی مجدد می‌شود.

```bash
git clone https://github.com/ZcashFoundation/z3 && cd z3

# 1. One-time setup: local config + Zallet wallet identity
./scripts/setup-network.sh mainnet

# 2. Start Zebra and wait until it is synced
docker compose --env-file .env.mainnet up -d zebra
./scripts/check-zebra-readiness.sh

# 3. Start Zallet (and anything else in the default profile)
docker compose --env-file .env.mainnet up -d
```

جریان کار برای testnet هم یکسان است؛ از `.env.testnet` و `./scripts/check-zebra-readiness.sh 18080` استفاده کنید.

تغییرات در `config/<network>/` محلی می‌مانند و پس از `git pull` هم باقی می‌مانند.

### پروفایل‌های اختیاری

```bash
# Lightwalletd-compatible gRPC + JSON-RPC proxy
docker compose --env-file .env.mainnet --profile indexer up -d

# Prometheus, Grafana, Jaeger, Alertmanager
docker compose --env-file .env.mainnet --profile monitoring up -d
```

پورت‌های پیش‌فرض Grafana برابرند با 3000 (mainnet)، 13000 (testnet) و 23000 (regtest).

---

## نکات اپراتوری

* **تصاویر پین‌شده.** Z3 بی‌سروصدا به `:latest` ارتقا پیدا نمی‌کند. در تغییری که بررسی شده باشد یک نسخه پین‌شده را ارتقا دهید، یا `Z3_<SERVICE>_IMAGE` را تنظیم کنید. نسخه‌های پین‌شده از آگوست 2026 تغییر نکرده‌اند و بنابراین از NU7 قدیمی‌تر هستند (یادداشت وضعیت بالا را ببینید).
* **کانتینرهای غیرریشه.** قابلیت‌های Linux حذف شده‌اند. بررسی‌های سلامت تا آماده‌شدن Zebra مانع راه‌اندازی کیف‌پول می‌شوند. سیاست راه‌اندازی مجدد به‌طور پیش‌فرض فعال است.
* **گزارش‌ها.** Z3 درایور ثبت گزارش را پین نمی‌کند. در پیکربندی سرویس Docker محدودیت حجم بگذارید؛ وگرنه گزارش‌های یک نود که شبانه‌روزی کار می‌کند بی‌وقفه رشد می‌کنند.
* **P2P.** Mainnet و testnet پورت P2Pِ Zebra را منتشر می‌کنند. اگر پشت NAT هستید، `ZEBRA_NETWORK__EXTERNAL_ADDR` را روی آدرسی تنظیم کنید که همتاها باید به آن وصل شوند. Regtest همتا ندارد.
* **Zaino روی ARM.** تصویر بالادستی Zaino فقط برای `linux/amd64` است. روی Apple Silicon، مگر اینکه از کد منبع بسازید، تصویر با شبیه‌سازی اجرا می‌شود. Zebra و Zallet چندمعماری هستند.
* **میزبان‌های مشترک.** به‌طور پیش‌فرض محدودیت CPU یا حافظه‌ای تعیین نشده است. اگر دستگاه فقط به نود اختصاص ندارد، `deploy.resources.limits` را در فایل بازنویسی اضافه کنید.

فهرست بررسی و پرسش‌های متداول برای محیط عملیاتی: [docs/faq.md](https://github.com/ZcashFoundation/z3/blob/main/docs/faq.md)، [docs/docker-architecture.md](https://github.com/ZcashFoundation/z3/blob/main/docs/docker-architecture.md).

---

## چه کسانی باید Z3 را اجرا کنند

**گزینه مناسب**

* صرافی‌ها، متولیان دارایی و استخرهای استخراجی که از `zcashd` به‌عنوان ترکیب نود و کیف‌پول استفاده می‌کردند
* اپراتورهایی که RPC کیف‌پول فول‌نودِ پشتیبانی‌شده‌ای می‌خواهند که به Zebra همگام‌شده متصل باشد
* توسعه‌دهندگانی که به mainnet، testnet و regtest در کنار هم نیاز دارند
* هر کسی که می‌خواهد از طریق پروفایل Zaino یک نقطه پایانی خصوصی سازگار با lightwalletd راه‌اندازی کند

**معمولاً ابزار مناسبی نیست**

* کاربران نهایی که فقط به ارسال و دریافت ZEC نیاز دارند — از یک کیف‌پول سبک مانند ZODL / Zashi، Zingo یا Zkool (جانشینِ تحت نگهداری YWallet) استفاده کنید
* کسانی که فقط می‌خواهند زنجیره را اعتبارسنجی کنند — Zebra (یا Zakura) را به‌تنهایی اجرا کنید
* کسانی که فقط می‌خواهند بلوک‌های فشرده را ارائه دهند — Zebra + Zaino یا Zebra + lightwalletd را بدون Zallet اجرا کنید

---

## صفحه‌های مرتبط

* [Zebra فول‌نود](/zcash-tech/zebra-full-node) — نود اجماعی که Z3 آن را به کار می‌گیرد
* [Zaino](/zcash-tech/zaino) — پروفایل ایندکسر اختیاری
* [فول‌نودها](/zcash-tech/full-nodes) — Zebra، Zakura و zcashd بازنشسته
* [نودهای Lightwallet](/zcash-tech/lightwallet-nodes) — کلاینت‌های سبک به چه چیزی متصل می‌شوند
* [Zakura نود](/zcash-tech/zakura-node) — فول‌نود جایگزین؛ در نسخه فعلی Z3 عرضه نمی‌شود
* [راهنمای مهاجرت: از zcashd به Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet)
* [منابع توسعه‌دهندگان](/start-here/developer-resources)

---

## منابع

* [مخزن Z3](https://github.com/ZcashFoundation/z3)
* [قرارداد Z3 (پورت‌ها، حجم‌های ذخیره‌سازی، نام پروژه‌ها)](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml)
* [Zebra](https://github.com/ZcashFoundation/zebra) · [کتاب Zebra](https://zebra.zfnd.org/)
* [Zaino](https://github.com/zingolabs/zaino)
* [Zallet](https://github.com/zcash/zallet) · [کتاب Zallet](https://zcash.github.io/zallet/)
* [Zcash انجمن کامیونیتی — به‌روزرسانی‌های Z3](https://forum.zcashcommunity.com/t/zcash-z3-updates-formerly-zcashd-deprecation/48965)
* [راه‌انداز Z3](https://github.com/Jubrilabdulazeez/z3-launcher) — صفحه کنترل کامیونیتی روی استک رسمی Compose (ZecHub Hackathon)
