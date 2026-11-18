<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zallet.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zallet

Zallet یک کیف‌پول فول‌نود Zcash است که با Rust نوشته شده است. این کیف‌پول جایگزین کیف‌پولی است که پیش‌تر درون `zcashd` تعبیه شده بود. پس از آنکه `zcashd` در 18 جولای 2026 در ارتفاع بلوک 3417100 به توقف پایان پشتیبانی خود رسید، وظایف اجماع و کیف‌پول از هم جدا شدند: **Zebra** یا **Zakura** زنجیره را اعتبارسنجی می‌کنند و **Zallet** کلیدها را نگه می‌دارد، noteها را اسکن می‌کند و JSON-RPC کیف‌پول را در اختیار قرار می‌دهد.

Zallet در حال حاضر در مرحله **بتا** است. هنوز به‌طور کامل بازبینی نشده است. تغییرات ناسازگار ممکن است حذف و ایجاد مجدد کیف‌پول را ضروری کنند. بدون مطالعه هشدارهای امنیتی در [کتاب Zallet](https://zcash.github.io/zallet/)، از آن به‌عنوان راهکار نگهداری عملیاتی برای مقادیر زیاد ZEC استفاده نکنید.

---

## به‌طور خلاصه

- Zallet یک **کیف‌پول RPC فول‌نود** است، نه یک کیف‌پول سبک موبایل و نه یک نود اجماع.
- این نرم‌افزار جایگزین بخش کیف‌پول `zcashd` است. بخش نود، [Zebra](Zebra_Full_Node.md) یا [Zakura](Zakura_Node.md) است.
- با **Rust** نوشته شده، تحت مجوز دوگانه MIT / Apache-2.0 منتشر می‌شود و در [zcash/zallet](https://github.com/zcash/zallet) نگهداری می‌شود.
- آخرین نسخه منتشرشده: **v0.1.0-beta.4** (2 نوامبر 2026). این نسخه پس از [NU7](NU7.md) منتشر شد و به `zebrad` **7.0.0 یا جدیدتر** نیاز دارد.
- داده‌های زنجیره را از طریق یک بک‌اند، یعنی **zebra**، می‌خواند: `ReadStateService` در برابر پوشه وضعیت یک `zebrad` روی همان میزبان، به‌علاوه JSON-RPC مربوط به Zebra. بک‌اند Zaino در نسخه v0.1.0-beta.4 حذف شد.
- زیرمجموعه‌ای از **JSON-RPC سازگار با zcashd** را ارائه می‌دهد. برخی متدها تغییر کرده‌اند؛ برخی نیز عمداً حذف شده‌اند.
- مواد کلیدی همیشه با **age** رمزنگاری می‌شوند. سابقه تراکنش‌ها، آدرس‌ها و کلیدهای مشاهده به‌صورت رمزنگاری‌نشده در `wallet.db` قرار دارند.
- دو فایل اجرایی را در یک آرشیو امضاشده ارائه می‌دهد: `zallet` (لانچر) و `zallet-zebra`. فقط **Linux** برای همگام‌سازی کیف‌پول؛ فعلاً هیچ بک‌اند زنجیره‌ای روی macOS یا Windows اجرا نمی‌شود.
- `zallet backup` (تازه در beta.4) از یک کیف‌پول در حال اجرا یا متوقف‌شده، یک اسنپ‌شات سازگار می‌گیرد.
- مستندات رسمی: [کتاب Zallet](https://zcash.github.io/zallet/).

---

## چرا Zallet وجود دارد

`zcashd` یک نود اجماع مشتق‌شده از Bitcoin Core و یک کیف‌پول را در یک فرایند واحد جمع کرده بود. آن طراحی دیگر کنار گذاشته شده است.

| نقش | پشته قدیمی | پشته فعلی |
|------|-----------|---------------|
| اجماع / P2P | `zcashd` | Zebra (`zebrad`) یا Zakura |
| کیف‌پول / کلیدها / موجودی‌ها | `zcashd` `wallet.dat` | **Zallet** (`wallet.db`) |
| ایندکسر کلاینت سبک | `lightwalletd` | Zaino یا `lightwalletd` |

جدا کردن کیف‌پول از نود به این معناست که:

- نرم‌افزار نود را می‌توان بدون جابه‌جا کردن کلیدها تعویض کرد (Zebra در برابر Zakura).
- اسکن کیف‌پول و اختیار خرج در فرایندی قرار دارند که می‌توان آن را جداگانه ایمن‌سازی کرد.
- معناشناسی RPC می‌تواند به‌جای ثابت ماندن روی رفتارهای خاص `zcashd`، به سمت حساب‌های ZIP 32، آدرس‌های یکپارچه و PCZTها تکامل یابد.

Zallet کیف‌پولی است که برای اپراتورهایی در نظر گرفته شده که پیش‌تر `zcashd` را به‌عنوان کیف‌پول داغ، بک‌اند صرافی، فاست یا کیف‌پول پرداخت استخراج اجرا می‌کردند.

---

## وضعیت

Zallet در مرحله **بتا** است.

این در عمل به چه معناست:

- تغییرات ناسازگار ممکن است در هر نسخه بتا اعمال شوند. ممکن است مجبور شوید پوشه داده را حذف کرده و از نو شروع کنید.
- همه RPCهای کیف‌پول `zcashd` منتقل نشده‌اند.
- معناشناسی برخی از متدهای منتقل‌شده با `zcashd` متفاوت است. یکپارچه‌سازی‌ها باید [صفحه تغییرات معناشناسی](https://zcash.github.io/zallet/zcashd/json_rpc.html) را مطالعه کنند.
- crateها در حال توسعه هستند و به‌طور کامل بازبینی نشده‌اند.
- Zallet یک کتابخانه Rust **نیست**. اگر شما به‌عنوان کتابخانه به آن وابسته شوید، هیچ تضمینی وجود ندارد.

بازخوردهای خود را از طریق [ایشوهای GitHub](https://github.com/zcash/zallet/issues/new) یا کانال `#wallet-dev` در [Discord تحقیق و توسعه Zcash](https://discord.gg/xpzPR53xtU) ارسال کنید.

یک مرحله پایدار بعدی برای زمانی برنامه‌ریزی شده است که مجموعه RPC موردنظر آماده شود. پس از آن از فراخوان‌کنندگان انتظار می‌رود به متدهای Zallet مهاجرت کنند، از جمله با در نظر گرفتن تفاوت‌های معناشناسی مستندشده.

---

## معماری

Zallet میان چند Cargo workspace تقسیم شده است تا هر بک‌اند زنجیره بتواند گراف وابستگی خودش را دنبال کند. از نسخه v0.1.0-beta.4 فقط بک‌اند zebra منتشر می‌شود.

```
zallet            launcher: reads `backend` in zallet.toml (default "zebra")
                  and execs zallet-zebra
zallet-core       shared wallet: CLI, config, JSON-RPC, SQLite DB, sync
zallet-zebra      zebra-state backend (ReadStateService + Zebra JSON-RPC)
```

هر دو فایل اجرایی همان `wallet.db` را باز می‌کنند. تا نسخه v0.1.0-beta.3 یک بک‌اند `zallet-zaino` هم وجود داشت. اگر `zallet.toml` شما `backend = "zaino"` را نشان می‌دهد، آن را به `backend = "zebra"` تغییر دهید. پایگاه داده کیف‌پول نیازی به مهاجرت ندارد و می‌توانید پوشه قدیمی `zaino` را در پوشه داده‌ها حذف کنید.

بک‌اند zebra پایگاه‌دادهٔ وضعیت `zebrad` را مستقیماً می‌خواند؛ بنابراین به `zebrad`ای نیاز دارد که با قابلیت `indexer` ساخته شده باشد و پوشهٔ وضعیت آن **روی همان میزبان** قرار داشته باشد. تا زمانی که بک‌اندی صرفاً شبکه‌ای ارائه شود، پیکربندی پشتیبانی‌شده‌ای برای ارتباط یک Zallet در یک کانتینر با یک `zebrad` در کانتینر دیگر از طریق شبکه وجود ندارد ([zallet#900](https://github.com/zcash/zallet/pull/900)).

استقرار معمول:

```
zebrad  (or Zakura)
   │  JSON-RPC / ReadStateService
   ▼
Zallet  (zallet-zebra)
   │  JSON-RPC on 127.0.0.1
   ▼
Your application, exchange, faucet, or operator scripts
```

Zallet یک **کیف‌پول فول‌نود** است: انتظار دارد یک نود اعتبارسنج محلی در دسترس باشد. این نرم‌افزار کلاینت سبک نیست. برای کیف‌پول‌های سبک و سرورهای بلوک فشرده، به [Zaino](Zaino.md) و [نودهای Lightwallet](Lightwallet_Nodes.md) مراجعه کنید.

پشته ترکیبی [Z3](https://github.com/ZcashFoundation/z3) متعلق به Zcash Foundation، Zebra و Zallet را با هم اجرا می‌کند و Zaino مستقل را برای کلاینت‌های سبک خارجی به‌صورت اختیاری ارائه می‌دهد. تصاویر پین‌شده آن قدیمی‌تر از NU7 و نسخه بتا 4 از Zallet هستند: پیش از استفاده، [پشته Z3](Z3_Stack.md) را ببینید.

---

## حساب‌ها، آدرس‌ها و کلیدها

Zallet بر پایه حساب‌های ZIP 32 ساخته شده است، نه حساب ضمنی واحد `zcashd`.

- یک کیف‌پول می‌تواند **چندین عبارت بازیابی BIP 39** نگه دارد. هر عبارت بازیابی یک ریشه خرج مستقل است که با **اثر انگشت seed** (`zip32seedfp1…`) شناسایی می‌شود.
- **حساب‌ها** از یک seed با یک شاخص حساب ZIP 32 مشتق می‌شوند. درون یک نمونه Zallet، یک **UUID** محلی نیز دارند. هویت قابل‌حمل یک حساب `(seedfp, account index)` است.
- آدرس‌ها **آدرس‌های یکپارچه ZIP 316** هستند که با `z_getaddressforaccount` تولید می‌شوند. یک حساب می‌تواند آدرس‌های متنوع‌سازی‌شده زیادی داشته باشد؛ گیرنده‌های محافظت‌شده به‌صورت on-chain قابل پیوند به یکدیگر نیستند.
- کلیدهای خرج‌کننده واردشده (`z_importkey`) و آدرس‌های فقط‌مشاهده (`z_importaddress`) به حساب‌های UUID تبدیل می‌شوند که تحت پوشش هیچ عبارت بازیابی‌ای نیستند.
- کلیدهای مشاهده را می‌توان صادر و وارد کرد (`z_exportviewingkey`، `z_importviewingkey`)، از جمله کلیدهای مشاهده کامل یکپارچه و کلیدهای مشاهده ورودی.

`getnewaddress` پیاده‌سازی نشده است. از `z_getnewaccount` و `z_getaddressforaccount` استفاده کنید.

اگر `keystore.require_backup` فعال باشد (شکل مهاجرت‌یافته `walletrequirebackup` در `zcashd`)، Zallet از مشتق کردن اختیار خرج جدید از عبارت بازیابی‌ای که پشتیبان آن تأیید نشده است، خودداری می‌کند.

---

## رمزنگاری و پشتیبان‌گیری

مواد کلیدی **همیشه** رمزنگاری می‌شوند. هیچ حالت رمزنگاری‌نشده‌ای وجود ندارد و RPC `encryptwallet` نیز وجود ندارد — آن متد `zcashd` هرگز به‌طور کامل پشتیبانی نمی‌شد.

- راه‌اندازی یک هویت **age** ایجاد می‌کند که مسیر پیش‌فرض آن `{datadir}/encryption-identity.txt` است.
- عبارت‌های بازیابی و کلیدهای خرج‌کننده واردشده به‌صورت متن رمزشده age در `wallet.db` ذخیره می‌شوند.
- بقیه پایگاه داده رمزنگاری **نمی‌شود**. اگر کسی به فایل دسترسی پیدا کند، سابقه، آدرس‌ها و کلیدهای مشاهده قابل خواندن هستند.
- هویت را می‌توان با یک عبارت عبور محافظت کرد (`generate-encryption-identity -p`). با RPC `walletpassphrase` قفل را باز کنید؛ با `walletlock` آن را قفل کنید.
- از دست دادن فایل هویت یا عبارت عبور آن، کلیدهای خرج‌کننده را غیرقابل بازیابی می‌کند. از هویت، همه عبارت‌های بازیابی و (به‌طور جداگانه و رمزنگاری‌شده) هر نسخه‌ای از `wallet.db` که نگه می‌دارید، پشتیبان تهیه کنید.

کپی‌کردن دستی `wallet.db` هنگام اجرای Zallet نسخهٔ پشتیبان امنی نیست: SQLite ممکن است دچار خرابی شود. از نسخهٔ v0.1.0-beta.4، از دستور [`backup`](https://github.com/zcash/zallet/blob/main/book/src/cli/backup.md) استفاده کنید:

```bash
zallet -d /path/to/zallet/datadir backup /path/to/backups/
```

از کیف‌پولِ در حال اجرا یا متوقف‌شده، یک snapshot سازگار با تراکنش‌ها و بررسی‌شده از نظر یکپارچگی می‌نویسد. اگر یک پوشه به آن بدهید، نام فایل را `zallet-wallet-backup-<UTC time>.db` می‌گذارد و هرگز فایل موجودی را بازنویسی نمی‌کند. اگر نوشتن‌های پیوسته در کیف‌پول (برای مثال هنگام همگام‌سازی اولیه) باعث شوند فرایند کپی مدام از نو شروع شود، پس از ده دقیقه با اعلام خطا متوقف می‌شود: بعداً دوباره تلاش کنید یا ابتدا کیف‌پول را متوقف کنید. این نسخهٔ پشتیبان فایل هویت age را **شامل نمی‌شود**. یک بار از آن نسخهٔ پشتیبان تهیه کنید و آن را جدا از نسخه‌های پشتیبان پایگاه داده نگه دارید، چون هرکس هر دو را در اختیار داشته باشد می‌تواند کلیدها را رمزگشایی کند.

---

## JSON-RPC

Zallet زیرمجموعه‌ای از RPCهای کیف‌پول `zcashd` را روی HTTP با احراز هویت Basic پیاده‌سازی می‌کند. آن را به loopback متصل کنید. استفاده از راه دور باید از طریق یک تونل رمزنگاری‌شده انجام شود. `rpc.allow_insecure_remote_bind` وجود دارد و ناامن است.

تفاوت‌های قابل‌توجه با `zcashd`:

- فیلدهای موجودی در `getwalletinfo` خالی هستند. از `z_getbalances`، `z_getbalanceforaccount` و `z_gettotalbalance` استفاده کنید.
- کارمزدها از **ZIP 317** پیروی می‌کنند. هیچ `settxfee` وجود ندارد.
- ساخت تراکنش‌های خرج در حال انتقال به **PCZTها** است (تراکنش‌های Zcash نیمه‌ساخته، ZIP 374). RPCهای PCZT در سری بتا اضافه شدند.
- یک **قفل همگام‌سازی** سراسری، RPCهای موجودی و خرج را در زمانی که کیف‌پول در حال رسیدن به آخرین وضعیت یا بازیابی از سازمان‌دهی مجدد زنجیره است، مسدود می‌کند (`ClientInInitialDownload` / `ForbiddenBySafeMode`).

متدهایی که عمداً حذف شده‌اند شامل `createrawtransaction`، `fundrawtransaction`، `getnewaddress`، `getrawchangeaddress`، `keypoolrefill`، `importwallet` و `encryptwallet` هستند. جایگزین‌ها در [کتاب Zallet](https://zcash.github.io/zallet/zcashd/json_rpc.html) فهرست شده‌اند.

---

## شروع به کار

روش‌های رسمی نصب (بسته‌های Debian، Docker، فایل‌های اجرایی نسخه‌های انتشار) در [راهنمای نصب](https://zcash.github.io/zallet/guide/installation/index.html) آمده‌اند. آرشیوهای نسخه‌های انتشار با نام `zallet-v<version>-linux-<amd64|arm64>.tar.gz` نام‌گذاری شده‌اند و شامل `zallet` و `zallet-zebra` هستند. Docker ایمیج‌ها با نام `zodlinc/zallet` منتشر می‌شوند.

روند حداقلی ایجاد کیف‌پول جدید:

```bash
# data directory; default is $HOME/.zallet
zallet -d /path/to/zallet/datadir example-config > /path/to/zallet/datadir/zallet.toml
# edit zallet.toml: network, indexer.validator_address, [indexer.read_state_service], rpc.bind

zallet -d /path/to/zallet/datadir generate-encryption-identity
zallet -d /path/to/zallet/datadir init-wallet-encryption
zallet -d /path/to/zallet/datadir generate-mnemonic
zallet -d /path/to/zallet/datadir confirm-backup
zallet -d /path/to/zallet/datadir start
```

`[indexer]` را با `validator_address` به نقطه پایانی JSON-RPC محلی `zebrad` متصل کنید. این مورد الزامی است و به‌طور پیش‌فرض به localhost اشاره نمی‌کند. بک‌اند zebra همچنین به `[indexer.read_state_service]` و نسخه 7.0.0 یا بالاترِ `zebrad` نیاز دارد که با قابلیت `indexer` ساخته شده باشد و دایرکتوری وضعیت آن روی همان میزبان باشد تا Zallet بتواند وضعیت زنجیره را مستقیماً بخواند. `indexer.db_path` فقط بک‌اند حذف‌شده Zaino را پیکربندی می‌کرد؛ اکنون این پیکربندی نادیده گرفته می‌شود و هشداری نمایش داده می‌شود.

ایمیج‌های بازتولیدپذیر را می‌توان با [StageX](https://codeberg.org/stagex/stagex/) ساخت (Docker 25+، ذخیره‌ساز ایمیج containerd و GNU Make).

---

## مهاجرت از zcashd

پوشه داده قدیمی `zcashd` را تا زمانی که موجودی‌ها را تأیید نکرده‌اید و یک بازیابی آزمایش‌شده انجام نداده‌اید، نگه دارید.

```bash
zallet init-wallet-encryption
zallet migrate-zcash-conf --zcashd-datadir /path/to/zcashd/datadir \
  -o /path/to/zallet/datadir/zallet.toml
zallet migrate-zcashd-wallet --zcashd-datadir /path/to/zcashd/datadir
```

`migrate-zcashd-wallet` فقط در بیلدهایی وجود دارد که قابلیت `zcashd-import` را دارند. خواندن `wallet.dat` به `db_dump` از **Berkeley DB 6.2** نیاز دارد، یعنی همان نسخه‌ای که `zcashd` استفاده می‌کرد.

یادداشت‌های گام‌به‌گام برای اپراتورها: [راهنمای مهاجرت: از zcashd به Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet).

---

## ارتباط Zallet با سایر نرم‌افزارها

| | Zallet | zecd | ZODL (Zashi) / Zingo / Zkool | Zebra / Zakura | Zaino |
|--|--------|------|------------------------------|----------------|-------|
| چیستی | کیف‌پول RPC فول‌نود | سرور کیف‌پول با اولویت محافظت‌شده | کیف‌پول‌های کاربر نهایی | نود اجماع | نمایه‌ساز / جایگزین lightwalletd |
| جایگزینِ | کیف‌پول `zcashd` | کلون سازگار با `zcashd` نیست | اپلیکیشن‌های موبایل/دسکتاپ | نود `zcashd` | `lightwalletd` |
| به نود محلی نیاز دارد | بله | بله (به‌طور پیش‌فرض Zebra) | خیر (کلاینت سبک) | خودش نود است | بله |
| سازگاری RPCِ zcashd | برای مسیر سازگاری طراحی شده است | فقط زیرمجموعه‌ای کوچک و گزینش‌شده | کاربرد ندارد | حالت سازگاری جزئی / Zakura | API متفاوت |
| مدل امانی‌بودن | اپراتور کلیدها را در `wallet.db` نگه می‌دارد | سروری که با seed بازیابی‌پذیر است | کلیدهای دستگاه کاربر | کیف‌پولی ندارد | کلیدی ندارد |

Zallet و **zecd** هر دو می‌توانند در جلوی Zebra قرار بگیرند. زمانی Zallet را انتخاب کنید که به رابط کیف‌پول `z_*` و یک مسیر مهاجرت از `wallet.dat` نیاز دارید. زمانی zecd را انتخاب کنید که یک سرور با اولویت محافظت‌شده می‌خواهید که صراحتاً کلون `zcashd` *نیست*.

یک محصول مصرفی جداگانه در [zallet.io](https://www.zallet.io/) وجود دارد که از همین نام استفاده می‌کند. آن اپ به این پروژه ربطی ندارد.

---

## صفحات مرتبط

- [فول‌نودها](Full_Nodes.md) — Zebra، Zakura و نود بازنشستهٔ `zcashd`
- [Zebra فول‌نود](Zebra_Full_Node.md) — نودی که backend پیش‌فرض Zallet از آن استفاده می‌کند
- [Zakura نود](Zakura_Node.md) — نود اعتبارسنج جایگزین
- [Zaino](Zaino.md) — نمایه‌ساز و سرور کلاینت سبک (از beta.4 دیگر backend Zallet نیست)
- [پشتهٔ Z3](Z3_Stack.md) — پشتهٔ ترکیبی Zebra + Zallet
- [zecd](ZECD.md) — طراحی دیگری برای سرور کیف‌پول بر پایهٔ librustzcash
- [Zcash همگام‌سازی کیف‌پول](Zcash_Wallet_Syncing.md) — چگونگی اسکن زنجیره توسط کیف‌پول‌های محافظت‌شده
- [کلیدهای مشاهده](Viewing_Keys.md)

## منابع

- [کتاب Zallet](https://zcash.github.io/zallet/)
- [zcash/zallet در GitHub](https://github.com/zcash/zallet)
- [نسخه‌ها](https://github.com/zcash/zallet/releases) · [تغییرات نسخه v0.1.0-beta.4](https://github.com/zcash/zallet/blob/v0.1.0-beta.4/CHANGELOG.md)
- [معناشناسی تغییر‌یافته JSON-RPC](https://zcash.github.io/zallet/zcashd/json_rpc.html)
- [راهنمای مهاجرت ZecHub](/guides/migration-guide-zcashd-to-zebrad-zallet)
- [راهنمای Raspberry Pi ZecHub(Zebra + Zallet)](/guides/raspberry-pi-4-full-node)
- [Z3 (Zebra + پشته compose Zallet)](https://github.com/ZcashFoundation/z3)
- [تحقیق و توسعه ZcashDiscord — ](https://discord.gg/xpzPR53xtU)`#wallet-dev`
