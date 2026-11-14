# راهنمای مهاجرت: از zcashd به Zebrad/Zallet

فول‌نود سنتی zcashd که توسط *Electric Coin Company (ECC)* / *Zodl* نگهداری می‌شد، جای خود را به Zebra و Zallet داده است. zcashd در 18 جولای 2026 با پایان دوره‌ی پشتیبانی متوقف شد و دیگر اجرا نمی‌شود.

- Zebra یک پیاده‌سازی مدرن Rust از پروتکل Zcash است که توسط Zcash Foundation توسعه یافته است
- Zallet یک کیف‌پول سبک است که برای ارتباط بی‌دردسر با نودهای Zebra ساخته شده و توسط Zodl توسعه یافته است

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![نمودار: تفکیک zcashd به zebrad برای وظایف نود و Zallet برای وظایف کیف‌پول](/content-images/SJNBsSYTel-dfd19f34e4.webp)
</div>

این راهنما شما را گام‌به‌گام در فرایند مهاجرت از **zcashd** به **Zebrad** و **Zallet** همراهی می‌کند. راه‌اندازی، وارد کردن کیف‌پول و رفع مشکلات رایج مهاجرت در این راهنما آمده است.

---

## zcashd از 18 جولای 2026 متوقف شده است

**معنای این موضوع**

- zcashd در 18 جولای 2026 با پایان دوره‌ی پشتیبانی متوقف شد. این نرم‌افزار دیگر هرگز تا نوک زنجیره همگام‌سازی نمی‌شود و نمی‌تواند وجوه را ارسال یا دریافت کند. این اتفاق قطعی است و دیگر یک برنامه‌ی آینده نیست.
- دو وظیفه‌ی zcashd اکنون از هم جدا شده‌اند: **zebrad** فول‌نود است و **Zallet** کیف‌پول.
- Zallet در مرحله‌ی **بتا** است. ممکن است بین نسخه‌ها تغییرات ناسازگار رخ دهد و برخی از متدهای JSON-RPC در zcashd هنوز پیاده‌سازی نشده‌اند. پیش از آنکه به یک فراخوانی خاص تکیه کنید، [جدول وضعیت متدها](https://zcash.github.io/zallet/) را بررسی کنید.
- اگر هنوز وجوهی در **Sprout** دارید، ابتدا هشدار مرحله‌ی 6 را بخوانید. Zallet از استخر Sprout پشتیبانی نمی‌کند و روش معمول برای انتقال این وجوه به یک zcashd در حال اجرا نیاز داشت.

**چرا مهاجرت کنید - فراتر از منسوخ شدن**

حتی صرف‌نظر از منسوخ شدن، دلایل قانع‌کننده‌ای برای مهاجرت وجود دارد:
- امنیت و استحکام: ایمنی حافظه در Rust و ابزارهای مدرن، خطر آسیب‌پذیری‌ها را کاهش می‌دهند.
- عملکرد و کارایی: Zebrad برای پردازش موازی، استفاده‌ی کارآمدتر از منابع و همگام‌سازی سریع‌تر طراحی شده است.
- معماری ماژولار: جداسازی منطق نود (Zebrad) از رابط کاربری کیف‌پول (Zallet) مرزهای روشن‌تر و مسیرهای ارتقای بهتری فراهم می‌کند.
- سازگاری با اکوسیستم آینده: ابزارها، بهبودها و سایر بخش‌های اکوسیستم Zcash بیش از پیش Zebrad/Zallet را هدف قرار خواهند داد.
- آرامش خاطر: دیگر مجبور نیستید یک مؤلفه‌ی منسوخ و بدون پشتیبانی را اجرا کنید.

### اکنون به سراغ راهنمای مهاجرت برویم

**1. از همه‌چیز نسخه‌ی پشتیبان تهیه کنید**
* از فایل wallet.dat (یا هر فایل کیف‌پول / محل نگهداری کلید دیگر) در نود zcashd خود نسخه‌ی پشتیبان تهیه کنید.

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (1)](/content-images/SJ_0mUtTxg-1441185a72.svg)
</div>

* فایل zcash.conf و هر تنظیمات سفارشی خود را ذخیره کنید.
* از اسکریپت‌های RPC یا هر خودکارسازی‌ای که استفاده می‌کنید یک نسخه خروجی بگیرید.
* از معتبر بودن نسخه‌های پشتیبان خود مطمئن شوید (برای مثال، در یک محیط دیگر آن‌ها را باز یا بررسی کنید).
* بررسی کنید که در حال حاضر به کدام متدهای JSON-RPC وابسته هستید.
* آن‌ها را با جدول سازگاری برنامه‌ریزی‌شده که در [Zcash سایت پشتیبانی](https://z.cash/support/zcashd-deprecation/) نگهداری می‌شود مقایسه کنید 
* برای تغییرات یا متدهای موجود نبودن آماده شوید (برخی ممکن است به راه‌حل جایگزین یا تطبیق نیاز داشته باشند).

**2. نیازمندی‌های سیستم و فضای دیسک**
* فضای دیسک نیازمندی‌ای است که اغلب دست‌کم گرفته می‌شود. زنجیره‌ی Zcash در آگوست 2026 از **270 GB** گذشت، بنابراین دست‌کم **300 GB** فضای خالی در نظر بگیرید و در صورت امکان از SSD استفاده کنید.
* مطمئن شوید که شبکه، CPU و RAM دستگاه شما پایدار و کافی است.
* یک اتصال اینترنت 
* اگر قصد دارید از کد منبع کامپایل کنید، Rust و Cargo را نصب داشته باشید.

**3. نصب / راه‌اندازی Zebrad**
شما می‌توانید یک فایل اجرایی از پیش ساخته‌شده دانلود کنید یا آن را از کد منبع بسازید.
* Zcash Foundation نسخه‌ها و فایل‌های اجرایی Zebra را منتشر می‌کند. برای مثال، می‌توانید از یک اسکریپت نصب استفاده کنید یا فایل اجرایی مناسب سیستم‌عامل خود را دانلود کنید.

* توجه داشته باشید که در نسخه‌های اخیر Zebra، [نقطه‌ی پایانی RPC دیگر به‌طور پیش‌فرض در Docker فعال نیست.](https://zfnd.org/zebra-2-3-0-release/)

**گزینه‌ی A: نصب با فایل اجرایی از پیش ساخته‌شده**  
روی **Linux**/**macOS**:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (2)](/content-images/HJhYu8Y6el-d2198f22c9.svg)
</div>

این کار آخرین نسخه‌ی پایدار zebrad را نصب می‌کند.

**گزینه‌ی B: ساخت از کد منبع**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (3)](/content-images/Syg8FUK6eg-b4557e52e0.svg)
</div>

پس از ساخت، فایل اجرایی را به مسیر سیستم (path) خود منتقل کنید:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![مهاجرت 11](/content-images/BJ0zjLY6ll-f77354d701.webp)
</div>

**4. پیکربندی و اجرا**  
یک فایل پیکربندی پیش‌فرض بسازید:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![migration2](/content-images/HJV1C8tTxx-5823395651.webp)
</div>

فایل **zebrad.toml** را مطابق ترجیحات خود ویرایش کنید (آدرس شنود، پورت‌ها، پوشه‌ی وضعیت، کش).

**نود را راه‌اندازی کنید:**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](/content-images/H1KPkvt6gl-864c48ca40.webp)
</div>

نود همگام‌سازی را از بلاک پیدایش (genesis) آغاز می‌کند. بسته به سخت‌افزار و شبکه، این کار چند ساعت (یا بیشتر) طول می‌کشد.

**5. نصب / راه‌اندازی Zallet (کیف‌پول)**

Zallet برای جایگزینی بخش کیف‌پول zcashd طراحی شده است.

برای دریافت فایل‌های اجرایی، صفحه‌ی Zallet GitHub / انتشارها را بررسی کنید.

**یا از کد منبع بسازید:**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](/content-images/SyUFxvFTex-5bb10ee1d3.webp)
</div>

* رابط گرافیکی یا خط فرمان را اجرا کنید (بسته به آنچه نصب شما در اختیار می‌گذارد).
* آن را طوری پیکربندی کنید که از طریق نقطه‌ی پایانی RPC یا API به نود محلی Zebrad شما متصل شود.

**6. وارد کردن کیف‌پول zcashd به Zallet**

برای این کار به یک zcashd در حال اجرا نیاز ندارید. Zallet فایل `wallet.dat` را مستقیماً می‌خواند. این موضوع مهم است، چون zcashd دیگر قابل اجرا نیست.

> **`wallet.dat` را نگه دارید.** فرایند مهاجرت هر چیزی را که نتواند در یک کیف‌پول Zallet نمایش دهد، به‌جای وارد کردن گزارش می‌کند. پس از آن، آن کلیدها فقط در `wallet.dat` وجود دارند. پس از مهاجرت آن را حذف نکنید.

ابتدا `zallet init-wallet-encryption` را اجرا کنید. Zallet کلیدها را برای یک هویت age رمزنگاری می‌کند و این هویت باید پیش از وارد کردن هر کلیدی وجود داشته باشد.

سپس پیکربندی و کیف‌پول خود را تبدیل کنید:

```bash
# translate zcash.conf into zallet.toml
zallet migrate-zcash-conf --zcashd-datadir /path/to/zcashd/datadir -o /path/to/zallet/datadir/zallet.toml

# import wallet.dat into Zallet's wallet.db
zallet migrate-zcashd-wallet --zcashd-datadir /path/to/zcashd/datadir
```

`migrate-zcashd-wallet` فقط در نسخه‌هایی وجود دارد که با قابلیت `zcashd-import` ساخته شده‌اند. خواندن `wallet.dat` به ابزار `db_dump` از Berkeley DB 6.2 نیاز دارد، یعنی همان نسخه‌ای که zcashd از آن استفاده می‌کرد. اگر بیش از یک فایل کیف‌پول دارید، دستور را برای هر فایل یک بار اجرا کنید و در اجراهای بعدی `--allow-multiple-wallet-imports` را اضافه کنید. هر فایل به مجموعه‌ای جداگانه از حساب‌ها تبدیل می‌شود. `rpcuser` و `rpcpassword` شما منتقل نمی‌شوند، زیرا JSON-RPC در Zallet به‌طور پیش‌فرض از احراز هویت مبتنی بر کوکی استفاده می‌کند. اگر به اعتبارنامه نیاز دارید، آن‌ها را با `zallet add-rpc-user` اضافه کنید.

**آنچه منتقل می‌شود**

* عبارت‌های بازیابی (mnemonic) و کلیدهای مشتق‌شده از آن‌ها، همراه با حساب‌هایی که مطابق با کیف‌پول zcashd بازسازی می‌شوند
* کلیدهای خرج‌کننده‌ی Sapling و کلیدهای شفافی که به‌صورت مستقل وارد شده‌اند
* ورودی‌های شفاف فقط‌مشاهده که کلید عمومی یا redeem script خود را دارند
* تاریخ تولد حساب‌ها، تا اسکن زنجیره از ارتفاع درست آغاز شود

**آنچه منتقل نمی‌شود.** این موارد به‌جای وارد شدن، همراه با تعدادشان گزارش می‌شوند:

* **کلیدهای خرج‌کننده و وجوه Sprout.** Zallet از استخر Sprout پشتیبانی نمی‌کند. روش مستند این بود که وجوه Sprout پیش از کنار گذاشتن zcashd با استفاده از همان منتقل شوند، اما این کار دیگر امکان‌پذیر نیست. اگر این موضوع شامل حال شماست، پیش از هر اقدام دیگری در [Zcash R&D Discord](https://discord.gg/xpzPR53xtU) یا [انجمن کامیونیتی](https://forum.zcashcommunity.com/) سؤال کنید.
* ورودی‌های دفترچه‌ی آدرس
* ورودی‌های فقط‌مشاهده‌ای که بدون کلید عمومی یا redeem script ذخیره شده‌اند و ورودی‌هایی با کلیدهای عمومی فشرده‌نشده
* کیف‌پول‌های Regtest

**تهیه‌ی نسخه‌ی پشتیبان پس از مهاجرت.** عبارت بازیابی (mnemonic) به‌تنهایی نسخه‌ی پشتیبان کاملی نیست، زیرا کلیدهای واردشده فقط در پایگاه داده‌ی کیف‌پول وجود دارند. از `wallet.db`، فایل هویت رمزنگاری age که گزینه‌ی `keystore.encryption_identity` به آن اشاره می‌کند و عبارت بازیابی خود نسخه‌های امن نگه دارید. فایل اصلی `wallet.dat` را هم نگه دارید. توجه داشته باشید که خود `wallet.db` رمزنگاری نشده است. این فایل تاریخچه‌ی تراکنش‌ها و کلیدهای مشاهده‌ی شما را بدون رمزنگاری نگه می‌دارد، پس نسخه‌ی پشتیبان را در جای امنی ذخیره کنید.

**اسکن مجدد و همگام‌سازی کیف‌پول**

* پس از وارد شدن کلیدها، Zallet از طریق Zebrad اسکن مجدد زنجیره را آغاز می‌کند.
* به Zallet کمی زمان بدهید تا موجودی و تاریخچه‌ی تراکنش‌های شما را بازسازی کند.

**7. بررسی موجودی‌ها و همگام‌سازی**

پس از وارد کردن کیف‌پول، Zallet به نود Zebrad شما متصل می‌شود و بلاک‌چین را دوباره اسکن می‌کند.
وقتی همگام‌سازی کامل شد، موجودی‌ها و تراکنش‌های شما باید دقیقاً مانند قبل نمایش داده شوند.

برای بررسی وضعیت همگام‌سازی نود خود، این دستور را اجرا کنید:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](/content-images/SyIyVDY6xl-10d6bed7b8.webp)
</div>

یا لاگ‌ها را بررسی کنید.

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](/content-images/r1HfVPF6gg-b6b76e9907.webp)
</div>

**8. رفع مشکلات**

<div className="overflow-x-auto my-8 rounded-2xl border border-slate-200 dark:border-slate-700">
  <table className="w-full min-w-full border-collapse text-sm">
    <thead className="bg-slate-100 dark:bg-slate-800">
      <tr>
        <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">مشکل</th>
        <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">علت احتمالی</th>
        <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">راه‌حل</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zebrad اجرا نمی‌شود</td>
        <td className="px-6 py-4">پورت در حال استفاده است یا پیکربندی نادرست است</td>
        <td className="px-6 py-4">فایل **zebrad.toml** را بررسی کنید و از یک پورت آزاد استفاده کنید</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">همگام‌سازی کند</td>
        <td className="px-6 py-4">ازدحام شبکه</td>
        <td className="px-6 py-4">از پایداری اینترنت مطمئن شوید و Zebrad را دوباره راه‌اندازی کنید</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">تراکنش‌هایی در کیف‌پول دیده نمی‌شوند</td>
        <td className="px-6 py-4">کلیدها به‌طور ناقص وارد شده‌اند</td>
        <td className="px-6 py-4">کلیدها را دوباره وارد کنید یا در Zallet اسکن مجدد انجام دهید</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zallet نمی‌تواند به نود متصل شود</td>
        <td className="px-6 py-4">نود در حال اجرا نیست یا نقطه‌ی پایانی اشتباه است</td>
        <td className="px-6 py-4">Zebrad را اجرا کنید و درست بودن پورت RPC را بررسی کنید</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zallet از کار می‌افتد</td>
        <td className="px-6 py-4">نسخه‌ی قدیمی</td>
        <td className="px-6 py-4">آخرین نسخه را از GitHub دریافت و به‌روزرسانی کنید</td>
      </tr>
    </tbody>
  </table>
</div>

**9. جمع‌بندی**

مهاجرت از zcashd به Zebrad و Zallet تجربه‌ای سریع‌تر، امن‌تر و مدرن‌تر از Zcash در اختیار شما می‌گذارد.
این ساختار با امنیت مبتنی بر Rust، طراحی ماژولار و ابزارهای بهتر تضمین می‌کند که با ادامه‌ی تحول اکوسیستم Zcash، نود و کیف‌پول شما برای آینده آماده بمانند.

نکته: کلیدهای کیف‌پول خود را آفلاین نگه دارید و به‌طور منظم از داده‌های Zallet خود نسخه‌ی پشتیبان تهیه کنید.
برای Zebra به [zebra.zfnd.org](https://zebra.zfnd.org) و برای Zallet به [کتاب Zallet](https://zcash.github.io/zallet/) یا [مخزن Zallet](https://github.com/zcash/zallet) مراجعه کنید. فصل [مهاجرت از zcashd](https://zcash.github.io/zallet/) در کتاب Zallet مرجع معتبر برای مرحله‌ی 6 است.
