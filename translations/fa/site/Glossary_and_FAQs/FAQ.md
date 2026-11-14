# پرسش‌های متداول

فهرستی از رایج‌ترین پرسش‌ها درباره‌ی Zcash. برای عیب‌یابی کلاینت Zcash، لطفاً [راهنمای رسمی عیب‌یابی](https://zcash.readthedocs.io/en/latest/rtd_pages/troubleshooting_guide.html) را ببینید.

### پیمایش سریع

<div className="flex flex-wrap gap-2 my-4">
  <a href="#what-is-zcash" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Zcash چیست؟</a>
  <a href="#how-can-i-acquire-zcash" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">چگونه می‌توانم Zcash به دست آورم؟</a>
  <a href="#what-is-the-difference-between-zcash-and-other-cryptocurrencies" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">تفاوت با دیگر رمزارزها؟</a>
  <a href="#how-is-the-zcash-protocol-governed" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">حکمرانی پروتکل؟</a>
  <a href="#where-is-my-transaction" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">تراکنش من کجاست؟</a>
  <a href="#is-zcash-really-private" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">آیا Zcash واقعاً خصوصی است؟</a>
  <a href="#a-few-common-misconceptions" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">تصورات نادرست رایج</a>
  <a href="#zcashd-stopped-working-what-do-i-run-now" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">zcashd از کار افتاده است؟</a>
  <a href="#how-do-i-move-my-zcashd-wallet-to-zallet" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">انتقال کیف‌پول من به Zallet؟</a>
  <a href="#what-is-ironwood-and-do-i-need-to-do-anything" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Ironwood چیست؟</a>
  <a href="#which-full-node-should-i-run" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">کدام فول‌نود؟</a>
  <a href="#where-do-i-look-up-a-term-from-a-release-note" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">جست‌وجوی یک اصطلاح؟</a>
</div>

---

## Zcash چیست؟

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Zcash یک ارز دیجیتال با تراکنش‌های سریع و محرمانه و کارمزدهای پایین است. حریم خصوصی ویژگی محوری Zcash است. این ارز پیشگام استفاده از اثبات‌های دانش صفر برای رمزنگاری همه‌ی تراکنش‌ها بوده است.

کیف‌پول‌های متعددی برای پرداخت‌های فوری، موبایلی، امن و خصوصی در دسترس هستند: [کیف‌پول‌ها](/using-zcash/wallets)

</div>

## چگونه می‌توانم Zcash به دست آورم؟

<div className="rounded-2xl border border-border bg-card p-5 my-4">

شما می‌توانید ZEC را در [صرافی‌های امانی](/using-zcash/custodial-exchanges)، [DEXها](/using-zcash/dex) یا [پلتفرم‌های متمرکز مبادله](/using-zcash/centralized-swaps) خریداری کنید.

همچنین می‌توانید Zcash را به‌صورت همتا به همتا بخرید یا از طریق استخراج به دست آورید.

</div>

## تفاوت Zcash با دیگر رمزارزها چیست؟

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Zcash اساساً خصوصی‌تر از Bitcoin یا Ethereum است. این ارز زمان بلوک سریع (25 ثانیه از زمان فعال‌شدن NU7 در نوامبر 2026، که پیش‌تر 75 ثانیه بود)، کارمزدهای پایین و ارتقاهای منظم ارائه می‌دهد.

کاربران می‌توانند میان تراکنش‌های **شفاف** یا **محافظت‌شده** یکی را انتخاب کنند. برای اطلاعات بیشتر، [یک اکوسیستم محافظت‌شده](https://electriccoin.co/blog/shielded-ecosystem) را ببینید.

</div>

## حکمرانی پروتکل Zcash چگونه است؟

<div className="rounded-2xl border border-border bg-card p-5 my-4">

حکمرانی پروتکل از طریق فرایند **پیشنهاد بهبود Zcash (ZIP)** انجام می‌شود. هر کسی می‌تواند پیش‌نویس یک ZIP را ارائه کند. پیش‌نویس‌ها توسط کامیونیتی بررسی و بحث می‌شوند و توسط ویراستاران ZIP پذیرفته یا رد می‌شوند:

- [Daira Hopwood](https://twitter.com/feministPLT) (Electric Coin Company)
- [Deirdre Connolly](https://twitter.com/durumcrustulum) (Zcash Foundation)

تصمیم‌ها در مشخصات فنی نوشته می‌شوند و هنگامی که شبکه آن‌ها را بپذیرد، به‌صورت on-chain تصویب می‌شوند.

</div>

## تراکنش من کجاست؟

<div className="rounded-2xl border border-border bg-card p-5 my-4">

ابتدا [راهنمای ما درباره‌ی بلوک‌کاوها](/guides/blockchain-explorers) را بخوانید. سپس [بلوک‌کاو Zcash](https://mainnet.zcashexplorer.app) را بررسی کنید.

هیچ مهلت انقضای ثابت 25 دقیقه‌ای یا زمان‌سنج بازپرداخت خودکاری وجود ندارد. ارتفاع انقضای ثبت‌شده در کیف‌پول خود و اینکه آیا پرداخت اصلی استخراج شده است یا نه را بررسی کنید. اگر پیش از استخراج‌شدن منقضی شده باشد، به‌صورت on-chain تسویه نشده است؛ انقضا هیچ تراکنش بازپرداختی ایجاد نمی‌کند. پیش از پیروی از راهنمای تلاش مجدد کیف‌پول، اجازه دهید کیف‌پول همگام‌سازی شود. [عیب‌یابی تراکنش](/using-zcash/transactions#troubleshooting-stuck-transactions) و [ZIP 203](https://zips.z.cash/zip-0203) را ببینید.

**دلایل رایج نمایش‌داده‌نشدن یک تراکنش:**

- قطع اتصال
- کارمزد تراکنش بیش از حد پایین
- بار بیش از حد شبکه
- ورودی‌های شفاف بیش از حد (حجم بیش از حد بزرگ)

**نکاتی برای موفقیت:**

- از یک اتصال پایدار استفاده کنید
- کارمزد استاندارد (یا برای اولویت، بیشتر) بپردازید
- صبر کنید و بعداً دوباره تلاش کنید
- از ورودی‌های کمتری استفاده کنید تا تراکنش کوچک بماند

</div>

## آیا Zcash واقعاً خصوصی است؟

<div className="rounded-2xl border border-border bg-card p-5 my-4">

**بله.** Zcash داده‌های فرستنده، مبلغ و گیرنده را در تراکنش‌های محافظت‌شده رمزنگاری می‌کند.

Zcash این کارها را انجام **نمی‌دهد**:

- رمزنگاری تراکنش‌های چندامضایی (یکپارچه‌سازی FROST در انتظار است)
- محافظت در برابر همبستگی با تراکنش‌های شفاف
- پنهان‌کردن آدرس‌های IP

مطالعه‌ی بیشتر: [یک اکوسیستم محافظت‌شده](https://web.archive.org/web/20260903010654/https://electriccoin.co/blog/shielded-ecosystem/)

</div>

## zcashd از کار افتاده است، اکنون چه چیزی را اجرا کنم؟

<div className="rounded-2xl border border-border bg-card p-5 my-4">

zcashd بازنشسته شده است. نسخه‌ی 6.20.0 در بلوک 3417100 در 18 ژوئیه 2026 خود را خاموش کرد و هرگز از Ironwood (NU6.3) پشتیبانی نکرد، بنابراین نسخه‌ی بعدی برای ارتقا وجود ندارد.

به‌جای آن، پشته‌ی Z3 را اجرا کنید. سه برنامه کاری را که zcashd پیش‌تر به‌تنهایی انجام می‌داد، میان خود تقسیم می‌کنند:

- **[Zebra](/zcash-tech/zebra-full-node)** زنجیره را اعتبارسنجی می‌کند
- **[Zaino](/zcash-tech/zaino)** آن را نمایه‌سازی می‌کند و داده‌های کیف‌پول را ارائه می‌دهد
- **[Zallet](/zcash-tech/zallet)** دارایی‌های شما را نگه می‌دارد

[Zakura](/zcash-tech/zakura-node) یک فول‌نود جایگزین است. این نود zcashd را نیز روی خود اجرا می‌کند، که اگر نرم‌افزارهای دیگر هنوز انتظار رابط قدیمی را داشته باشند، مفید است.

با [راهنمای مهاجرت](/guides/migration-guide-zcashd-to-zebrad-zallet) شروع کنید.

</div>

## چگونه کیف‌پول zcashd خود را به Zallet منتقل کنم؟

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Zallet یک `wallet.dat` موجود را مهاجرت می‌دهد، بنابراین دارایی‌ها و آدرس‌های خود را حفظ می‌کنید.

ابتدا از `wallet.dat` نسخه‌ی پشتیبان تهیه کنید، سپس [راهنمای مهاجرت](/guides/migration-guide-zcashd-to-zebrad-zallet) را دنبال کنید. آن نسخه‌ی پشتیبان را تا زمانی که موجودی خود را در Zallet تأیید کرده‌اید، نگه دارید.

[مرجع سریع Zallet](/using-zcash/zallet-quick-reference-guide) پس از انتقال، دستورات روزمره را پوشش می‌دهد.

</div>

## Ironwood چیست و آیا لازم است کاری انجام دهم؟

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Ironwood ارتقای شبکه‌ی NU6.3 است که از بلوک 3,428,143 در 28 ژوئیه 2026 روی شبکه‌ی اصلی فعال است. این ارتقا یک استخر محافظت‌شده‌ی مبتنی بر یک مدار اصلاح‌شده اضافه می‌کند و استخر قدیمی‌تر [Orchard](/using-zcash/shielded-pools) را مهر و موم می‌کند، تا هر کسی بتواند تأیید کند که هیچ ZEC جعل نشده است.

**اگر دارایی محافظت‌شده نگه می‌دارید، ممکن است لازم باشد منتقل شود.** ارزش تنها از طریق [دروازه](/zcash-tech/the-turnstile) از Orchard خارج می‌شود و کیف‌پول‌ها این انتقال را در زمان‌های متفاوت و به روش‌های گوناگون انجام می‌دهند. پیش از انتقال دستی هر چیزی، از ارائه‌دهنده‌ی کیف‌پول خود بپرسید.

برای آگاهی از اینکه چه چیزی و چرا تغییر کرده است، [Ironwood](/zcash-tech/ironwood) را بخوانید.

</div>

## کدام فول‌نود را باید اجرا کنم؟

<div className="rounded-2xl border border-border bg-card p-5 my-4">

**[Zebra](/zcash-tech/zebra-full-node)** جایگزین مستقیم zcashd و نودی است که راهنمای مهاجرت بر پایه‌ی آن نوشته شده است. آن را انتخاب کنید، مگر اینکه دلیلی برای انتخاب‌نکردنش داشته باشید.

**[Zakura](/zcash-tech/zakura-node)** پیاده‌سازی دومی است که برای مقیاس‌پذیری طراحی شده و همگام‌سازی سریع‌تر و هرس بومی بلوک‌ها را ارائه می‌دهد. اگر به این قابلیت‌ها نیاز دارید، یا به نرم‌افزاری وابسته هستید که هنوز با zcashd ارتباط برقرار می‌کند، آن را انتخاب کنید.

هر دو یک زنجیره‌ی یکسان را اعتبارسنجی می‌کنند، بنابراین این یک انتخاب عملیاتی است و نه انتخابی مربوط به اجماع.

</div>

## یک اصطلاح موجود در یادداشت انتشار را کجا جست‌وجو کنم؟

<div className="rounded-2xl border border-border bg-card p-5 my-4">

[کتابخانه‌ی Zcash](/glossary-and-faqs/zcash-library) را ببینید. این کتابخانه نرم‌افزارهای نود و کیف‌پول، استخرهای محافظت‌شده و شماره‌های ZIP را که بیشتر از همه دیده می‌شوند، پوشش می‌دهد.

</div>

## چند تصور نادرست رایج

<div className="rounded-2xl border border-border bg-card p-5 my-4 overflow-x-auto">

<table className="w-full border-collapse">
  <thead>
    <tr className="border-b border-border bg-amber-100 dark:bg-zinc-800">
      <th className="py-4 px-5 text-left font-bold text-amber-800 dark:text-white">تصور نادرست</th>
      <th className="py-4 px-5 text-left font-bold text-amber-800 dark:text-white">پاسخ درست</th>
    </tr>
  </thead>
  <tbody>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">آیا Zcash یک کوین متمرکز است؟</td>
      <td className="py-4 px-5 text-foreground">خیر. یک توافق‌نامه‌ی علامت تجاری مانع از آن می‌شود که Zcash Foundation یا ECC برخلاف اجماع کامیونیتی عمل کنند. غیرمتمرکز بودن حکمرانی اثبات شده است ([گزارش Messari](https://messari.io/report/decentralizing-zcash) را ببینید). نظرسنجی‌های کامیونیتی، ZecHub و A/V Club Zcash Foundation همگی امکان مشارکت گسترده را فراهم می‌کنند.</td>
    </tr>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">آیا Zcash درِ پشتی دارد؟</td>
      <td className="py-4 px-5 text-foreground">خیر. نه Zcash و نه هیچ نرم‌افزار رمزنگاری دیگری که ما ساخته‌ایم درِ پشتی ندارد و هرگز نخواهد داشت.</td>
    </tr>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">آیا Zcash تحت کنترل یک شرکت است؟</td>
      <td className="py-4 px-5 text-foreground">نادرست است. اگرچه ما برای پژوهش با شرکت‌ها همکاری می‌کنیم، Zcash همچنان به غیرمتمرکز بودن متعهد است. چندین سازمان مستقل برای دستیابی به خودامانی و حقوق حریم خصوصی با یکدیگر همکاری می‌کنند.</td>
    </tr>
    <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Zcash در مقایسه با دیگر کوین‌های حریم خصوصی، حریم خصوصی محدودی دارد</td>
      <td className="py-4 px-5 text-foreground">خیر. حریم خصوصی به سبک Monero/Grin به طعمه‌ها متکی است (که می‌توان آن‌ها را شکست داد). Zcash همه‌ی داده‌های تراکنش محافظت‌شده را رمزنگاری می‌کند، به‌طوری که هر تراکنش در استخر غیرقابل تشخیص از دیگری است. [به اندازه‌ی کافی خصوصی نیست؟](https://electriccoin.co/blog/not-private-enough-mixers-and-decoys-wont-protect-you-for-long/) را ببینید.</td>
    </tr>
  </tbody>
</table>

</div>

---

**آخرین به‌روزرسانی:** اکتبر 2026
**می‌خواهید مشارکت کنید؟** [این صفحه را در GitHub ویرایش کنید](https://github.com/ZecHub/zechub/edit/main/site/Glossary_and_FAQs/FAQ.md)
