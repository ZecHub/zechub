<a href="https://github.com/zechub/zechub/edit/main/site/guides/Ledger_Shielded_ZEC.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# راهنمای کاربری ZEC محافظت‌شده در Ledger

> ZEC خصوصی (محافظت‌شده) را با کیف‌پول سخت‌افزاری Ledger خود در Ledger Wallet Desktop نگه دارید، دریافت کنید و ارسال کنید.

## خلاصه

* از 23 سپتامبر 2026، Ledger Wallet Desktop از ZEC محافظت‌شده پشتیبانی می‌کند. یک حساب Zcash دارای یک موجودی شفاف و یک موجودی خصوصی در استخر Ironwood است.
* فعلاً فقط نسخهٔ دسکتاپ پشتیبانی می‌شود. پشتیبانی از موبایل «به‌زودی» اعلام شده است.
* شما به یک Nano S Plus، Nano X، Stax یا Flex (نه Nano S اصلی)، Ledger Wallet Desktop نسخهٔ 4.21 یا بالاتر و آخرین نسخهٔ اپ Zcash نیاز دارید.
* یک بار روی **Enable shielded** کلیک کنید: Ledger شما یک کلید مشاهده صادر می‌کند تا اپ دسکتاپ بتواند وجوه خصوصی شما را پیدا کند. کلیدهای خرج‌کننده هرگز از دستگاه خارج نمی‌شوند.
* هر زمان که می‌توانید، به آدرس خصوصی (u1...) دریافت کنید. انتقال ZEC از موجودی شفاف به موجودی خصوصی امکان‌پذیر است، اما این دو را به هم مرتبط می‌کند.
* هر ارسال روی صفحهٔ Ledger بررسی و امضا می‌شود. آدرس‌ها را همان‌جا، کاراکتر به کاراکتر، بررسی کنید.

## توضیح اصلی

Zcash دو نوع موجودی دارد. ZEC شفاف (آدرس‌های t1) مانند Bitcoin کار می‌کند: مبالغ و آدرس‌ها عمومی هستند. ZEC محافظت‌شده در یک استخر محافظت‌شده قرار دارد که در آن فرستنده، گیرنده و مبلغ به‌صورت on-chain رمزنگاری می‌شوند.

Ledger کلیدهای خرج‌کنندهٔ شما را روی دستگاه سخت‌افزاری نگه می‌دارد. برای نمایش موجودی خصوصی، Ledger Wallet Desktop به یک Full Viewing Key یکپارچه (UFVK) نیاز دارد. دستگاه آن را یک بار صادر می‌کند و اپ دسکتاپ از آن برای اسکن بلاک‌چین و یافتن noteهای محافظت‌شدهٔ شما استفاده می‌کند. کلید مشاهده می‌تواند تاریخچهٔ محافظت‌شدهٔ شما را ببیند اما نمی‌تواند خرج کند؛ بنابراین با آن مانند یک اطلاعات خصوصی رفتار کنید.

مراحل زیر شامل نصب اپ Zcash، افزودن حساب، فعال‌سازی موجودی خصوصی، دریافت، محافظت‌کردن ZEC شفاف و ارسال از موجودی خصوصی است.

## مرور کلی

در 23 سپتامبر 2026، Ledger پشتیبانی بومی از ZEC محافظت‌شده را به Ledger Wallet Desktop اضافه کرد. اکنون یک حساب Zcash یک موجودی شفاف و یک موجودی خصوصی در استخر Ironwood مربوط به Zcash نگه می‌دارد. کلیدهای خصوصی شما روی Ledger شما باقی می‌مانند و هر تراکنش روی دستگاه بررسی و امضا می‌شود.

**فقط دسکتاپ.** در اطلاعیهٔ Ledger آمده است که ZEC محافظت‌شده «فقط در Ledger Wallet Desktop در دسترس است. پشتیبانی از موبایل در حال حاضر در دسترس نیست، اما به‌زودی ارائه می‌شود.» اپ دسکتاپ نیز همین اطلاعیه را نمایش می‌دهد. بررسی‌شده در 15 اکتبر 2026.

## آماده‌سازی

- یک دستگاه Ledger که اپ Zcash را اجرا کند: Nano S Plus، Nano X، Stax یا Flex. اپ فعلی Zcash برای Nano S اصلی ساخته نشده است.
- Ledger Wallet Desktop نسخهٔ 4.21 یا بالاتر، که فقط از [ledger.com](https://www.ledger.com) دانلود شده باشد. در این راهنما از نسخهٔ 4.24.0 استفاده شده است.
- آخرین نسخهٔ اپ Zcash روی Ledger شما (هنگام نگارش این راهنما 3.9.4).
- مقدار کمی ZEC برای آزمایش. تمام مراحل زیر روی mainnet با 0.001 ZEC انجام شده است. هر تراکنش یک کارمزد کوچک شبکه دارد (در آزمایش ما 0.00015 ZEC).
- عبارت بازیابی 24 کلمه‌ای شما روی کاغذ باقی می‌ماند. هرگز آن را در کامپیوتر تایپ نکنید و با کسی به اشتراک نگذارید.

## راهنمای گام‌به‌گام (Ledger Wallet Desktop)

**1. اپ Zcash را نصب یا به‌روزرسانی کنید**
- Ledger Wallet را باز کنید، Ledger خود را متصل کرده و قفل آن را باز کنید و **My Ledger** را باز کنید. اتصال را روی دستگاه تأیید کنید.
- در کاتالوگ اپ‌ها **Zcash** را جستجو کنید، سپس روی **Install** کلیک کنید، یا اگر از قبل نصب شده است روی **Update** کلیک کنید.
- اپ Zcash را روی Ledger خود باز کنید. روی صفحه «Zcash app is ready» نمایش داده می‌شود. برای بررسی نسخه، به سمت راست تا **App info** پیمایش کنید.

**2. یک حساب Zcash اضافه کنید**
- در Ledger Wallet، گزینهٔ **Add account** را انتخاب کنید. در **Select asset**، Zcash را جستجو کنید و **Zcash (ZEC)** را انتخاب کنید، نه یک توکن wrapped مانند Binance-Peg Zcash Token.
- در حالی که اپ Zcash روی Ledger شما باز است، Ledger Wallet حساب شما را پیدا می‌کند. آن را زیر **Select the accounts you want to add** تیک بزنید و روی **Confirm** کلیک کنید.
- صفحهٔ حساب **Available balance**، **Transparent balance** و **Private balance** را به‌همراه دکمهٔ **Enable shielded** نمایش می‌دهد.

![حساب Zcash در Ledger Wallet Desktop که اعلان مخصوص نسخهٔ دسکتاپ، موجودی‌های شفاف و خصوصی و دکمهٔ Enable shielded را نشان می‌دهد](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-01-account-desktop-only.png)

**3. موجودی خصوصی را فعال کنید**
- روی **Enable shielded** کلیک کنید. پنجرهٔ **Enable Zcash private balance** چهار مرحله دارد: Birthday، UFVK، Device و Confirmation.
- **Birthday:** برای یک حساب جدید، ارتفاع birthday را روی تاریخ امروز نگه دارید. فقط در صورتی گزینهٔ «This account received shielded ZEC in the past» را تیک بزنید که مطمئن هستید چنین بوده است، زیرا اسکن از بلوک 0 ممکن است زمان زیادی طول بکشد.
- **UFVK و Device:** Ledger Wallet از Ledger شما می‌خواهد که Full Viewing Key یکپارچهٔ شما (UFVK) را صادر کند. صفحه‌های روی دستگاه را بخوانید و تأیید کنید. اگر پیام «Device connection lost» را دیدید، مطمئن شوید اپ Zcash باز است، بی‌درنگ تأیید کنید و روی **Retry** کلیک کنید.
- وقتی **UFVK successfully imported** را دیدید، روی **Start sync** کلیک کنید. پس از پایان همگام‌سازی، دکمه به **Update balance** همراه با زمان «Last sync» تغییر می‌کند.
- کلید مشاهده روی کامپیوتر شما باقی می‌ماند. این کلید می‌تواند وجوه محافظت‌شدهٔ شما را پیدا کند اما نمی‌تواند آن‌ها را خرج کند.

![پنجرهٔ Enable Zcash private balance که وارد شدن موفق UFVK و دکمهٔ Start sync را نشان می‌دهد](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-02-ufvk-imported.png)

**4. ZEC دریافت کنید و هر دو آدرس را روی Ledger خود تأیید کنید**
- روی **Receive** کلیک کنید و حساب Zcash خود را انتخاب کنید. Ledger Wallet یک **Address for Zcash 1** (شفاف، با شروع t1) و یک **Private address for Zcash 1** (با شروع u1) نمایش می‌دهد. آدرس‌های قبلی همچنان معتبر می‌مانند.
- Ledger شما «Verify Zcash addresses»، سپس **Private address** را در دو صفحه و پس از آن **Public Address** را نمایش می‌دهد. پیش از به اشتراک گذاشتن هر یک از آدرس‌ها، تک‌تک کاراکترها را با صفحهٔ نمایش مقایسه کنید و سپس روی دستگاه تأیید کنید.
- آدرس خصوصی را ترجیح دهید؛ از آدرس شفاف فقط زمانی استفاده کنید که فرستنده از هیچ گزینهٔ دیگری پشتیبانی نکند.

![پنجرهٔ Receive در Ledger Wallet که آدرس شفاف و آدرس خصوصی را برای Zcash 1 نشان می‌دهد](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-03-receive-addresses.png)

![صفحه‌های دستگاه Ledger: Verify Zcash addresses، آدرس خصوصی در دو صفحه و سپس Public Address](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-04-device-verify-addresses.png)

**5. ZEC شفاف را به موجودی خصوصی خود منتقل کنید**
- روی **Send** کلیک کنید. زیر **Self transfer**، گزینهٔ **Send to private balance** را انتخاب کنید.
- مبلغی وارد کنید یا از 25%، 50%، 75% یا **Max** استفاده کنید. کارمزد شبکه را بررسی کنید و سپس روی **Review** کلیک کنید.
- روی Ledger خود این مراحل را مرور کنید: «Review transaction to send ZEC»، «Transfer from public to private address»، مبلغ، آدرس خروجی در دو صفحه، کارمزد و ارتفاع انقضا. بررسی کنید که آدرس خروجی با آدرس خصوصی شما از مرحلهٔ 4 مطابقت داشته باشد، سپس هر دو دکمه را روی **Sign transaction** فشار دهید.
- Ledger Wallet پیام **Transaction sent** را نمایش می‌دهد. در جزئیات تراکنش، نوع آن **Private (Ironwood)** درج شده است.
- Ledger Wallet یادآوری می‌کند که انتقال به خود، وجوه محافظت‌شدهٔ شما را به آدرس عمومی‌تان مرتبط می‌کند. دریافت مستقیم به آدرس خصوصی، آن‌ها را نامرتبط نگه می‌دارد.

![پنجرهٔ Send ZEC در Ledger Wallet با گزینهٔ انتقال به خود Send to private balance](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-05-send-to-private-balance.png)

![صفحه‌های بازبینی دستگاه Ledger برای انتقال ZEC از موجودی شفاف به آدرس خصوصی که با Sign transaction و Transaction signed پایان می‌یابد](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-06-device-review-shielding.png)

- پس از تأیید تراکنش، موجودی شفاف کاهش و موجودی خصوصی افزایش می‌یابد. وجوه محافظت‌شدهٔ جدید تا زمانی که تأییدهای کافی برای خرج‌شدن دریافت کنند، به‌صورت «maturing» نمایش داده می‌شوند.

![حساب Zcash پس از محافظت‌سازی: موجودی شفاف کم شده و موجودی خصوصی افزایش یافته و با وضعیت در حال بلوغ نمایش داده می‌شود](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-07-balances-after-shielding.png)

**6. ZEC را از موجودی خصوصی خود ارسال کنید**
- هنگامی که موجودی خصوصی قابل خرج شد، روی **Send** کلیک کنید و **Transfer from** را روی **Private balance** تنظیم کنید.
- آدرس گیرنده را جای‌گذاری کنید و مبلغ را وارد کنید. شما می‌توانید یک **Memo (optional)** رمزنگاری‌شده تا 512 بایت اضافه کنید که فقط گیرنده می‌تواند آن را بخواند.
- گیرنده، مبلغ و کارمزد را روی Ledger خود بررسی کنید و سپس هر دو دکمه را روی **Sign transaction** فشار دهید.

![جزئیات تراکنش ارسال‌شده از موجودی خصوصی در Ledger Wallet](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-08-private-send.png)

## نکات مفید

- ZEC محافظت‌شده در Ledger فعلاً فقط روی دسکتاپ در دسترس است (بررسی‌شده در 15 اکتبر 2026).
- موجودی خصوصی Ledger Wallet از استخر Ironwood استفاده می‌کند.
- Ledger اعلام می‌کند که شما می‌توانید دسترسی فقط‌خواندنی به تاریخچهٔ تراکنش‌های خود را با مشاور مالیاتی‌تان به اشتراک بگذارید. هر کسی که کلید مشاهدهٔ شما را داشته باشد می‌تواند تاریخچهٔ محافظت‌شدهٔ شما را ببیند؛ بنابراین فقط آگاهانه آن را به اشتراک بگذارید.
- صفحه‌های دستگاه در این راهنما با شبیه‌ساز Speculos از Ledger (Nano S Plus) که اپ Zcash نسخهٔ 3.9.4 را اجرا می‌کرد و به Ledger Wallet Desktop نسخهٔ 4.24.0 روی mainnet Zcash متصل بود، ثبت شده‌اند. یک Ledger فیزیکی همین اپ را اجرا می‌کند و همین صفحه‌ها را نمایش می‌دهد.

## راهنمایی بیشتر

- [جدید در Ledger Wallet: پشتیبانی بومی از Zcash محافظت‌شده](https://www.ledger.com/blog-native-shielded-zcash-support) (اطلاعیهٔ Ledger)
- [مرکز راهنمای Ledger](https://support.ledger.com)
- [صفحهٔ کیف‌پول‌های ZecHub](/using-zcash/wallets)
- [استخرهای محافظت‌شده](/using-zcash/shielded-pools) و [کلیدهای مشاهده](/zcash-tech/viewing-keys) در ZecHub
- گزینهٔ دیگر کیف‌پول سخت‌افزاری: [راهنمای کاربری Zashi در Keystone](/guides/keystone-zashi)
