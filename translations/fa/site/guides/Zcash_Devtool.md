# Zcash Devtool

[zcash-devtool چیست؟](https://github.com/zcash/zcash-devtool?tab=readme-ov-file) 

Zcash Devtool پلتفرمی برای آزمایش و توسعه روی Zcash است. این ابزار توسط توسعه‌دهندگان و برای توسعه‌دهندگان، به منظور آزمایش و توسعهٔ قابلیت‌های جدید Zcash ساخته شده است و نباید آن را آمادهٔ استفاده در محیط عملیاتی دانست. رابط خط فرمانی که این ابزار ارائه می‌دهد می‌تواند در هر زمان و بدون هشدار تغییر کند و تغییر هم خواهد کرد. وجوه قابل‌توجهی را به مدیریت کیف‌پول داخلی zcash-devtool نسپارید.

### آموزش ویدیویی Zcash Devtool:
Kris Nuttycombe (@nuttycom) این ابزار را در ZconVI معرفی کرد.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/5gvQF5oFT8E"
    title="zcash-devtool: the Zcash development multitool with Kris Nuttycombe - ZconVI"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


---

برای راهنمای گام‌به‌گام شروع کار با این ابزارها، [این راهنمای جامع](https://github.com/zcash/zcash-devtool/blob/main/doc/walkthrough.md) را ببینید. این راهنما تمام مراحل راه‌اندازی و استفاده از ابزارهای zcash devtool را شرح می‌دهد. هدف آن این است که به شما نشان دهد چگونه ابزار را راه‌اندازی کنید و قابلیت‌های خودتان را به آن اضافه کنید.

## شروع سریع

دستورات زیر با zcash-devtool `main` (کامیت `5a26ee8`، اوت 2026) بررسی شده‌اند. این ابزار بدون اطلاع قبلی تغییر می‌کند، بنابراین اگر چیزی در اینجا دیگر مطابقت نداشت، `--help` را روی هر دستوری اجرا کنید.

### نصب

هیچ فایل اجرایی ازپیش‌ساخته‌ای وجود ندارد. [Rust](https://rustup.rs) را نصب کنید و سپس ابزار را از کد منبع بسازید:

```bash
git clone https://github.com/zcash/zcash-devtool.git
cd zcash-devtool
cargo run --release -- --help
```

مثال‌های زیر فایل اجرایی ساخته‌شده، یعنی `target/release/zcash-devtool`، را فراخوانی می‌کنند. `cargo run --release -- ...` نیز به همین شکل کار می‌کند.

### ساخت یک کیف‌پول تست‌نت

کار را روی تست‌نت شروع کنید. سکه‌های تست‌نت (TAZ) هیچ ارزشی ندارند.

```bash
zcash-devtool wallet -w ./my-wallet init --name demo -i ./my-wallet-identity.txt -n test
zcash-devtool wallet -w ./my-wallet sync
zcash-devtool wallet -w ./my-wallet balance
```

- `-w` پوشهٔ کیف‌پول است. این گزینه بعد از `wallet` و قبل از زیردستور می‌آید.
- `-i` یک فایل هویت [age](https://age-encryption.org) است. عبارت بازیابی کیف‌پول با آن رمزنگاری می‌شود و اگر این فایل وجود نداشته باشد، ساخته می‌شود. آن را نگه دارید: `send`، `shield` و سایر دستورات خرج‌کردن برای رمزگشایی عبارت بازیابی به آن نیاز دارند.
- `-n` شبکه را مشخص می‌کند: `test` یا `main`.
- `-s` سرور کیف‌پول سبک را انتخاب می‌کند. مقدار پیش‌فرض، یعنی `zecrocks`، به سرور zec.rocks مربوط به شبکهٔ انتخاب‌شده متصل می‌شود.
- برای بازیابی یک کیف‌پول موجود، به جای `init` از `restore-mnemonic` استفاده کنید. این دستور عبارت بازیابی را از شما می‌پرسد.

`balance` هر استخر را جداگانه فهرست می‌کند، از جمله Ironwood:

```
    Balance:   0.00000000 TAZ
     Sapling Spendable:   0.00000000 TAZ
     Orchard Spendable:   0.00000000 TAZ
    Ironwood Spendable:   0.00000000 TAZ
  Unshielded Spendable:   0.00000000 TAZ
```

`zcash-devtool wallet -w ./my-wallet list-addresses` را اجرا کنید تا آدرس یکپارچهٔ کیف‌پول را ببینید و از یک [فاست](https://zechub.wiki/using-zcash/faucets) به آن وجوه تست‌نت بفرستید.

برای شبکهٔ اصلی، `-n main` را به `init` بدهید. فقط از مبالغی استفاده کنید که توان از دست دادنشان را دارید.

### ارسال و محافظت‌سازی

مبالغ بر حسب zatoshi هستند (1 ZEC = 100,000,000 zatoshi).

```bash
zcash-devtool wallet -w ./my-wallet send -i ./my-wallet-identity.txt \
  --address <recipient address> --value 100000 --memo "hello"
zcash-devtool wallet -w ./my-wallet shield -i ./my-wallet-identity.txt
```

`propose` تراکنشی را که یک `send` می‌سازد، بدون ارسال آن نمایش می‌دهد. `list-tx` و `list-unspent` تاریخچه و note‌های کیف‌پول را نشان می‌دهند.

هر دستوری که با سرور ارتباط برقرار می‌کند، `--connection tor` را نیز می‌پذیرد که اتصال را از طریق کلاینت داخلی Tor هدایت می‌کند.

### بررسی آدرس‌ها، کلیدها و تراکنش‌ها

`inspect` داده‌های Zcash را به‌صورت آفلاین رمزگشایی می‌کند: آدرس‌ها، کلیدها و تراکنش‌های خام. `--lookup` را اضافه کنید تا اطلاعات بیشتری از زنجیره دریافت شود، مثلاً یک تراکنش بر اساس شناسهٔ آن.

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

note‌های Ironwood به همان گیرندهٔ Orchard در آدرس یکپارچه ارسال می‌شوند، بنابراین آدرس‌ها با NU6.3 تغییر نکردند.

### ساخت مرحله‌به‌مرحلهٔ تراکنش‌ها با PCZTها

یک PCZT (تراکنش Zcash نیمه‌ساخته) ساخت تراکنش را به مراحل جداگانه تقسیم می‌کند: ایجاد، اثبات، امضا و ارسال. هر مرحله می‌تواند روی دستگاه متفاوتی اجرا شود، برای مثال با یک امضاکنندهٔ سخت‌افزاری مانند Keystone. هر دستور `pczt` فایل PCZT را از یک فایل یا stdin می‌خواند و آن را در یک فایل (`--output`) یا stdout می‌نویسد، بنابراین می‌توان مراحل را به یکدیگر pipe کرد:

```bash
zcash-devtool pczt -w ./my-wallet create --address <recipient address> --value 100000 \
  | zcash-devtool pczt -w ./my-wallet prove -i ./my-wallet-identity.txt \
  | zcash-devtool pczt -w ./my-wallet sign -i ./my-wallet-identity.txt \
  | zcash-devtool pczt -w ./my-wallet send
```

`zcash-devtool pczt --help` سایر مراحل را فهرست می‌کند، از جمله `inspect`، `redact`، `combine`، `extract` و `shield`.

### انتقال وجوه از Orchard به Ironwood

از زمان NU6.3، وجوه Orchard فقط می‌توانند به آدرس‌های خود کیف‌پول منتقل شوند. دستورات `migration` آن‌ها را به Ironwood منتقل می‌کنند:

```bash
zcash-devtool migration -w ./my-wallet plan
zcash-devtool migration -w ./my-wallet commit -i ./my-wallet-identity.txt
zcash-devtool migration -w ./my-wallet status
zcash-devtool migration -w ./my-wallet advance
```

- `plan` پیش‌نمایشی از تقسیم note‌ها و زمان‌بندی انتقال نشان می‌دهد و هیچ چیزی را تغییر نمی‌دهد.
- `commit` نخستین تراکنش‌های آماده‌سازی را می‌سازد و از پیش امضا می‌کند. `--external` را اضافه کنید تا آن‌ها برای یک امضاکنندهٔ خارجی مانند Keystone امضانشده باقی بمانند.
- `status` پیشرفت مهاجرت و مرحلهٔ بعدی را نشان می‌دهد.
- `advance` اثبات تراکنش بعدی را که anchor آن آماده است، تولید می‌کند.

دستورات مهاجرت هنوز در حال ساخت هستند. `advance` در نخستین تراکنشی که آمادهٔ انتشار است متوقف می‌شود، زیرا انتشار تراکنش هنوز در این ابزار پیاده‌سازی نشده است. برای استفادهٔ روزمره، وجوه را با کیف‌پولی منتقل کنید که از Ironwood پشتیبانی می‌کند. [استخرهای محافظت‌شده](https://zechub.wiki/using-zcash/shielded-pools) را ببینید.


**هشدارهای امنیتی:**
از این ابزار در محیط عملیاتی استفاده نکنید!!!
این برنامه با در نظر گرفتن امنیت نوشته نشده است. با این حال، امکاناتی مانند رمزنگاری عبارت‌های بازیابی دارد که باید آن را برای آزمایش در مقیاس کوچک، با مسئولیت خودتان، قابل استفاده کند.

### پیشرفته (آموزش librustzcash )


[ویدیو را اینجا ببینید](https://free2z.cash/uploadz/public/ZcashTutorial/librustzcash-a-rust-crates.mp4)
