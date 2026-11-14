<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Z3_Stack.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# پشته Z3

**پشته Z3** پلتفرم نود بسته‌بندی‌شده‌ی Zcash Foundation است: **Zebra** (فول‌نود) + **Zallet** (کیف‌پول فول‌نود)، به‌همراه ایندکسر اختیاری **Zaino**. این پشته جایگزین درنظرگرفته‌شده برای فرایند مستقل `zcashd` است که اجماع و یک کیف‌پول را در یک فایل باینری واحد ترکیب می‌کرد و در 18 ژوئیه 2026 به پایان عمر خود رسید.

پیاده‌سازی مرجع، پروژه‌ی Docker Compose در [github.com/ZcashFoundation/z3](https://github.com/ZcashFoundation/z3) است.

---

## خلاصه

* Z3 **یک کلاینت اجماع جدید نیست**. Z3 روشی است که شما با آن پشته‌ی پس از `zcashd` را به‌صورت یکپارچه اجرا می‌کنید: Zebra زنجیره را اعتبارسنجی می‌کند، Zallet کلیدها را نگه می‌دارد و RPC کیف‌پول را ارائه می‌دهد، و Zaino (اختیاری) با پروتکل gRPC lightwalletd ارتباط برقرار می‌کند.
* `zcashd` نود و کیف‌پول را یکجا بسته‌بندی می‌کرد. Z3 **این نقش‌ها را از هم جدا می‌کند**. صرافی‌ها، استخرهای استخراج و دیگر اپراتورهای کیف‌پول فول‌نود به این ترکیب مهاجرت می‌کنند، نه صرفاً به Zebra.
* سه پروژه‌ی ایزوله‌ی Compose می‌توانند روی یک میزبان اجرا شوند: **mainnet**، **testnet** و **regtest**.
* اولین همگام‌سازی mainnet در حدود **24–72 ساعت** طول می‌کشد و حدود **300 GB** فضا نیاز دارد. Regtest در چند ثانیه بالا می‌آید و جای مناسبی برای یادگیری پشته است.
* Zallet کتابخانه‌های ایندکسر Zaino را در خود جای داده است و از طریق JSON-RPC با Zebra ارتباط برقرار می‌کند. سرویس مستقل Zaino فقط زمانی لازم است که بخواهید یک endpoint سازگار با lightwalletd برای کیف‌پول‌های خارجی داشته باشید.
* Zallet در مرحله‌ی **بتا** است. تغییرات ناسازگار ممکن است حذف و ایجاد مجدد کیف‌پول را الزامی کنند. آن را نرم‌افزار امانی نهایی و کامل برای مبالغ بزرگ در نظر نگیرید.

---

## چرا Z3 وجود دارد

در بیشتر دوران حیات Zcash، `zcashd` هم فول‌نود مرجع بود و هم تنها کیف‌پول فول‌نود در سطح عملیاتی. صرافی‌ها، استخرها و ارائه‌دهندگان خدمات امانی یکپارچه‌سازی‌های خود را بر اساس همین طراحی انجام داده بودند.

`zcashd` بازنشسته شده است. اجماع به [Zebra](/zcash-tech/zebra-full-node) (و اکنون همچنین [Zakura](/zcash-tech/zakura-node)) منتقل شد. کیف‌پول تعبیه‌شده به [Zallet](https://github.com/zcash/zallet) منتقل شد. ارائه‌ی خدمات کیف‌پول سبک در حال انتقال از [lightwalletd](/zcash-tech/lightwallet-nodes) به [Zaino](/zcash-tech/zaino) است.

این سه بخش مخازن جداگانه، چرخه‌های انتشار جداگانه و پیکربندی‌های جداگانه دارند. Z3 حلقه‌ی اتصال آن‌هاست: ایمیج‌های پین‌شده، بررسی‌های سلامت که کیف‌پول را تا زمان همگام‌شدن نود خاموش نگه می‌دارند، پورت‌ها و volume‌های مخصوص هر شبکه، و یک مسیر مستند برای اپراتورها.

این نام یک اختصار غیررسمی در اکوسیستم است — Zebra، Zaino، Zallet — هرچند فایل پیش‌فرض Compose فقط Zebra و Zallet را اجرا می‌کند. Zaino یک profile در Compose است، نه یک فرایند سوم الزامی.

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
| **Zebra** | همگام‌سازی و اعتبارسنجی زنجیره، gossip، JSON-RPC، endpoint سلامت | بله |
| **Zallet** | کیف‌پول فول‌نود. کتابخانه‌های Zaino را در خود جای داده است. مستقیماً به JSON-RPC Zebra متصل می‌شود. کانتینر مستقل Zaino را فراخوانی **نمی‌کند** | بله |
| **Zaino** | ایندکسر مستقل. gRPC سازگار با lightwalletd برای کلاینت‌های سبک خارجی، به‌علاوه‌ی یک پروکسی JSON-RPC برای اکسپلوررها و فاست‌ها | خیر — `--profile indexer` |

Z3 نسخه‌های ایمیج را در `docker-compose.yml` پین می‌کند. اگر به تگ دیگری نیاز دارید، آن را با `Z3_ZEBRA_IMAGE`، `Z3_ZAINO_IMAGE` یا `Z3_ZALLET_IMAGE` بازنویسی کنید.

---

## تفاوت با zcashd

| | zcashd | Z3 |
| --- | --- | --- |
| زبان | C++ (فورک Bitcoin) | سرویس‌های Rust، هماهنگ‌شده با Docker Compose |
| مدل فرایند | یک فایل باینری: نود + کیف‌پول | کانتینرهای جداگانه برای نود و کیف‌پول |
| اجماع | بازنشسته (پایان پشتیبانی در 18 ژوئیه 2026) | Zebra (یا نود سازگار دیگر) |
| کیف‌پول | `wallet.dat` داخلی | Zallet، datadir رمزنگاری‌شده با age |
| کلاینت‌های سبک | معمولاً یک lightwalletd جداگانه | profile اختیاری Zaino |
| پیکربندی | `zcash.conf` | فایل‌های مخصوص هر شبکه در `config/<network>/` به‌علاوه‌ی فایل‌های env در Compose |
| چند شبکه روی یک میزبان | تداخل دردسرساز پورت‌ها | پشتیبانی کامل: `z3-mainnet`، `z3-testnet`، `z3-regtest` |

اگر هنوز یک کیف‌پول `zcashd` دارید، به‌جای کپی کردن `wallet.dat` در volume مربوط به Z3، از [راهنمای مهاجرت](/guides/migration-guide-zcashd-to-zebrad-zallet) ZecHub و دستور `migrate-zcashd-wallet` در Zallet استفاده کنید.

---

## شبکه‌ها

Z3 از سه پروژه‌ی مستقل Compose تشکیل شده است. این پروژه‌ها پورت‌ها یا volume‌ها را با هم به اشتراک نمی‌گذارند.

| شبکه | نام پروژه | کاربرد | اولین همگام‌سازی | وجوه واقعی |
| --- | --- | --- | --- | --- |
| **mainnet** | `z3-mainnet` | محیط عملیاتی | 24–72 ساعت | بله |
| **testnet** | `z3-testnet` | محیط پیش‌عملیاتی روی شبکه‌ی آزمایشی عمومی | 2–12 ساعت | خیر (ZEC آزمایشی) |
| **regtest** | `z3-regtest` | تمرین محلی: بلوک‌های فوری، بدون همتا | چند ثانیه | خیر |

اپراتورهای جدید باید از **regtest** شروع کنند، جریان‌های RPC و کیف‌پول را تأیید کنند و سپس به testnet یا mainnet بروند.

---

## پورت‌های پیش‌فرض میزبان

هر سه شبکه برای همزیستی روی یک دستگاه طراحی شده‌اند. مقادیر زیر پیش‌فرض‌های منتشرشده هستند؛ هر یک از آن‌ها از طریق متغیر env متناظر `Z3_*` قابل بازنویسی است. ماتریس مرجع [`z3-contract.yaml`](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml) است.

| سرویس | Mainnet | Testnet | Regtest |
| --- | --- | --- | --- |
| Zebra JSON-RPC | 8232 | 18232 | 29232 |
| Zebra P2P | 8233 | 18233 | (منتشر نمی‌شود) |
| سلامت Zebra (`/ready`) | 8080 | 18080 | 28080 |
| Zaino gRPC (profile ایندکسر) | 8137 | 18137 | 28137 |
| Zaino JSON-RPC (profile ایندکسر) | 8237 | 18237 | 28237 |
| Zallet RPC | 28232 | 40232 | 50232 |

درون شبکه‌ی Compose، سرویس‌ها با نامشان شناسایی می‌شوند (`zebra`، `zaino`، `zallet`).

---

## داده‌ها و پشتیبان‌گیری

| Volume | محتوا | پشتیبان‌گیری؟ |
| --- | --- | --- |
| `z3-<network>-chain` | وضعیت زنجیره‌ی Zebra (حدود 300 GB در mainnet) | اختیاری — قابل همگام‌سازی مجدد |
| `z3-<network>-zallet` | پایگاه داده‌ی رمزنگاری‌شده‌ی کیف‌پول **و** هویت age که قفل آن را باز می‌کند | **بله — این تنها volume است که باید از آن پشتیبان گرفته شود** |
| `z3-<network>-zaino` | وضعیت ایندکسر (فقط با profile ایندکسر) | اختیاری — قابل بازسازی |
| `z3-<network>-cookie` | cookie مربوط به RPC در Zebra | خیر — دوباره تولید می‌شود |

برای قرار دادن وضعیت زنجیره روی دیسکی دیگر پیش از اولین اجرا:

```bash
export Z3_CHAIN_DATA_PATH=/mnt/ssd/zebra-state
./scripts/fix-permissions.sh zebra /mnt/ssd/zebra-state
```

`docker compose --env-file .env.<network> --profile "*" down` پشته را متوقف می‌کند و volume‌ها را نگه می‌دارد. افزودن `-v` آن‌ها را حذف می‌کند و یک همگام‌سازی مجدد کامل را الزامی می‌کند. `--profile "*"` را هم اضافه کنید تا سرویس‌های وابسته به profile (ایندکسر، مانیتورینگ) واقعاً متوقف و حذف شوند.

---

## شروع کار

پیش‌نیازها: Docker Engine، Docker Compose v2.24.4+، Git. `openssl` فقط برای regtest لازم است.

### Regtest (سریع‌ترین راه برای دیدن پشته)

```bash
git clone https://github.com/ZcashFoundation/z3 && cd z3
./scripts/regtest-init.sh
docker compose --env-file .env.regtest up -d
```

برای دستورات آزمایشی، [docs/regtest.md](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md) را ببینید.

### Mainnet (راه‌اندازی دومرحله‌ای)

Zebra باید پیش از آنکه Zallet کاربردی شود، همگام‌سازی را به پایان برساند. اجرای زودهنگام Zallet باعث می‌شود تا زمانی که `/ready` برابر true شود، مدام ری‌استارت شود.

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

Testnet همین روند را با `.env.testnet` و `./scripts/check-zebra-readiness.sh 18080` دارد.

تغییرات در `config/<network>/` محلی باقی می‌مانند و پس از `git pull` حفظ می‌شوند.

### Profile‌های اختیاری

```bash
# Lightwalletd-compatible gRPC + JSON-RPC proxy
docker compose --env-file .env.mainnet --profile indexer up -d

# Prometheus, Grafana, Jaeger, Alertmanager
docker compose --env-file .env.mainnet --profile monitoring up -d
```

پورت‌های پیش‌فرض Grafana عبارت‌اند از 3000 (mainnet)، 13000 (testnet) و 23000 (regtest).

---

## نکات اپراتوری

* **ایمیج‌های پین‌شده.** Z3 بی‌صدا به `:latest` منتقل نمی‌شود. یک پین را در قالب تغییری بازبینی‌شده ارتقا دهید، یا `Z3_<SERVICE>_IMAGE` را تنظیم کنید.
* **کانتینرهای غیر root.** قابلیت‌های Linux حذف شده‌اند. بررسی‌های سلامت، کیف‌پول را تا آماده شدن Zebra متوقف نگه می‌دارند. سیاست ری‌استارت به‌طور پیش‌فرض فعال است.
* **لاگ‌ها.** Z3 درایور لاگ مشخصی را تعیین نمی‌کند. محدودیت اندازه را در پیکربندی daemon Docker تنظیم کنید، وگرنه لاگ‌ها روی نودی که 24/7 کار می‌کند بی‌حد رشد می‌کنند.
* **P2P.** Mainnet و testnet پورت P2P Zebra را منتشر می‌کنند. پشت NAT، `ZEBRA_NETWORK__EXTERNAL_ADDR` را روی آدرسی تنظیم کنید که همتاها باید به آن متصل شوند. Regtest همتا ندارد.
* **Zaino روی ARM.** ایمیج upstream Zaino فقط `linux/amd64` است. روی Apple Silicon، مگر اینکه آن را از سورس بسازید، تحت شبیه‌سازی اجرا می‌شود. Zebra و Zallet چندمعماری هستند.
* **میزبان‌های مشترک.** به‌طور پیش‌فرض هیچ محدودیتی برای CPU یا حافظه تنظیم نشده است. اگر دستگاه به نود اختصاص ندارد، `deploy.resources.limits` را در یک فایل override اضافه کنید.

چک‌لیست و پرسش‌های متداول برای محیط عملیاتی: [docs/faq.md](https://github.com/ZcashFoundation/z3/blob/main/docs/faq.md)، [docs/docker-architecture.md](https://github.com/ZcashFoundation/z3/blob/main/docs/docker-architecture.md).

---

## چه کسانی باید Z3 را اجرا کنند

**مناسب برای**

* صرافی‌ها، ارائه‌دهندگان خدمات امانی و استخرهای استخراج که از `zcashd` به‌عنوان نود به‌همراه کیف‌پول استفاده می‌کردند
* اپراتورهایی که یک RPC کیف‌پول فول‌نود پشتیبانی‌شده روی یک Zebra همگام‌شده می‌خواهند
* توسعه‌دهندگانی که به mainnet، testnet و regtest در کنار هم نیاز دارند
* هر کسی که از طریق profile Zaino یک endpoint خصوصی سازگار با lightwalletd راه‌اندازی می‌کند

**معمولاً ابزار نامناسبی است برای**

* کاربران نهایی که فقط نیاز به ارسال و دریافت ZEC دارند — از یک کیف‌پول سبک مانند ZODL / Zashi، Zingo یا YWallet استفاده کنید
* کسانی که فقط می‌خواهند زنجیره را اعتبارسنجی کنند — Zebra (یا Zakura) را به‌تنهایی اجرا کنید
* کسانی که فقط می‌خواهند بلوک‌های فشرده ارائه دهند — Zebra + Zaino یا Zebra + lightwalletd را بدون Zallet اجرا کنید

---

## صفحات مرتبط

* [فول‌نود Zebra](/zcash-tech/zebra-full-node) — نود اجماعی که Z3 آن را در بر می‌گیرد
* [Zaino](/zcash-tech/zaino) — profile اختیاری ایندکسر
* [فول‌نودها](/zcash-tech/full-nodes) — Zebra، Zakura و zcashd بازنشسته
* [نودهای کیف‌پول سبک](/zcash-tech/lightwallet-nodes) — آنچه کلاینت‌های سبک با آن ارتباط برقرار می‌کنند
* [نود Zakura](/zcash-tech/zakura-node) — فول‌نود جایگزین؛ آنچه Z3 امروز ارائه می‌کند نیست
* [راهنمای مهاجرت: از zcashd به Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet)
* [منابع توسعه‌دهندگان](/start-here/developer-resources)

---

## منابع

* [مخزن Z3](https://github.com/ZcashFoundation/z3)
* [قرارداد Z3 (پورت‌ها، volume‌ها، نام‌های پروژه)](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml)
* [Zebra](https://github.com/ZcashFoundation/zebra) · [کتاب Zebra](https://zebra.zfnd.org/)
* [Zaino](https://github.com/zingolabs/zaino)
* [Zallet](https://github.com/zcash/zallet) · [کتاب Zallet](https://zcash.github.io/zallet/)
* [انجمن کامیونیتی Zcash — به‌روزرسانی‌های Z3](https://forum.zcashcommunity.com/t/zcash-z3-updates-formerly-zcashd-deprecation/48965)
* [Z3 Launcher](https://github.com/Jubrilabdulazeez/z3-launcher) — صفحه‌ی کنترل کامیونیتی بر روی پشته‌ی رسمی Compose (هکاتون ZecHub)
