<a href="https://github.com/zechub/zechub/edit/main/site/guides/Keystone_Zashi.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# راهنمای کاربری Keystone Zodl (پیشتر Zashi)

> ZEC محافظت‌شده را در ذخیره‌سازی سرد نگه دارید: یک کیف‌پول سخت‌افزاری Keystone را با اپلیکیشن Zodl (پیشتر Zashi، که در فوریه 2026 تغییر نام داد) جفت کنید و تراکنش‌ها را با کد QR امضا کنید.

## خلاصه

* Keystone 3 Pro (یا Keystone 3) با فرم‌ویر Cypherpunk به‌عنوان امضاکننده‌ای کاملاً جدا از شبکه برای Zodl عمل می‌کند، بنابراین ZEC محافظت‌شده می‌تواند در ذخیره‌سازی سرد باقی بماند.
* پیش از شروع: باتری بالای 20%، کابل USB (یا یک کارت MicroSD با فرمت FAT32) برای به‌روزرسانی فرم‌ویر، و اپلیکیشن Zodl روی تلفن شما.
* ابتدا دستگاه را در وب‌سایت Keystone تأیید کنید. این کار بررسی می‌کند که دستگاه در حین ارسال دستکاری نشده باشد.
* کیف‌پول را روی Keystone بسازید و عبارت بازیابی 24 کلمه‌ای را به‌صورت آفلاین یادداشت کنید. این عبارت هرگز وارد Zodl نمی‌شود.
* اتصال: روی Keystone گزینهٔ «...» > Connect Software Wallet > Zodl را بزنید، سپس در Zodl روی Connect Hardware Wallet بزنید و QR را اسکن کنید.
* Zodl هر تراکنش را می‌سازد؛ شما با اسکن رفت‌وبرگشتی کدهای QR، آن را روی صفحهٔ Keystone تأیید و امضا می‌کنید.

## توضیح اصلی

کیف‌پول سخت‌افزاری کلیدهای خرج‌کنندهٔ شما را روی دستگاهی جداگانه نگه می‌دارد که هرگز به اینترنت وصل نمی‌شود. Keystone کاملاً جدا از شبکه است: فقط از طریق کدهای QR با تلفن شما ارتباط برقرار می‌کند، نه از طریق Bluetooth یا USB.

در این پیکربندی، Zodl نقش «ناظر» را دارد. این اپلیکیشن با شبکهٔ Zcash همگام‌سازی می‌شود، موجودی محافظت‌شدهٔ شما را نشان می‌دهد و تراکنش‌ها را آماده می‌کند. Keystone عبارت بازیابی را نگه می‌دارد و امضا می‌کند. یک تلفن آلوده می‌تواند موجودی شما را ببیند، اما بدون تأیید روی Keystone نمی‌تواند وجوه را جابه‌جا کند.

مراحل زیر شامل آماده‌سازی دستگاه، تأیید آن، به‌روزرسانی فرم‌ویر، ساخت کیف‌پول و اتصال آن به Zodl است.

## نمای کلی

راهنمای Twitter:  => [Zodl (پیشتر Zashi) x Keystone راهنمای Twitter یکپارچه‌سازی کیف‌پول سخت‌افزاری](https://x.com/zashi_app/status/1869793574880973144) 

این یکپارچه‌سازی با امکان‌پذیر کردن ذخیره‌سازی سرد ZEC محافظت‌شده، تحولی مهم در کاربردپذیری Zcash به شمار می‌رود. کامیونیتی Zcash در گذشته با سایر پلتفرم‌های کیف‌پول سخت‌افزاری با موانعی روبه‌رو بوده است، اما Keystone به‌عنوان شریکی همکار ظاهر شد که حاضر بود مرزها را جابه‌جا کند و در کنار Electric Coin Company نوآوری کند. تیم Keystone برای پیشبرد سهم خود از این کار، یک گرنت ZCG دریافت کرد.

## آموزش Keystone X Zodl

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/ktYf7josJKM"
    title="Keystone X Zodl Tutorial"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
    

## آماده‌سازی
[سفارش و دریافت Keystone 3 Pro یا Keystone 3](https://keyst.one) 

سطح باتری: مطمئن شوید که باتری دستگاه keystone شما بالای 20% است.

کابل USB یا کارت SD:

- کابل USB برای به‌روزرسانی فرم‌ویر (همراه دستگاه).
- کارت Micro SD (کمتر از 1 TB) برای ارتقا (جداگانه خریداری شود).

دسترسی به وب‌سایت رسمی Keystone برای تأیید دستگاه و به‌روزرسانی فرم‌ویر.

راه‌اندازی اپلیکیشن Zodl روی دستگاه موبایل شما.

## [راهنمای گام‌به‌گام (دستگاه Keystone)](https://keyst.one/get-started) 


**زبان خود را انتخاب کنید**

- **تأیید دستگاه (از طریق QR):** تأیید دستگاه برای شناسایی آلودگی احتمالی در حین حمل‌ونقل، جلوگیری از حملات زنجیرهٔ تأمین و اطمینان از امنیت فرم‌ویر نصب‌شده ضروری است.
  - به صفحهٔ تأیید دستگاه در وب‌سایت Keystone بروید.
  - در وب‌سایت رسمی روی Scan QR Code کلیک کنید.
  - با دوربین Keystone خود کد QR نمایش‌داده‌شده در وب‌سایت را اسکن کنید.
  - یک کد تأیید روی صفحهٔ Keystone شما ظاهر می‌شود.
  - این کد را در وب‌سایت وارد کنید تا فرایند تأیید کامل شود.

- **به‌روزرسانی فرم‌ویر:**
  - به‌روزرسانی از طریق کارت MicroSD
    - مطمئن شوید که کیف‌پول Keystone شما دست‌کم 20% شارژ باتری دارد.
    - کارت SD را در رایانهٔ خود قرار دهید و آن را با فرمت FAT32 فرمت کنید.
    - آخرین نسخهٔ فرم‌ویر Cypherpunk را از [صفحهٔ به‌روزرسانی فرم‌ویر Keystone](https://keyst.one/firmware) دانلود کنید و فایل keystone3.bin را در ریشهٔ کارت MicroSD خود ذخیره کنید.
    - کارت SD حاوی فرم‌ویر را در کیف‌پول Keystone خود قرار دهید.
    - گزینهٔ «Upgrade» را در کیف‌پول Keystone خود باز کنید، سپس برای آغاز فرایند به‌روزرسانی، دستورالعمل‌های روی صفحه را دنبال کنید.
  - **به‌روزرسانی از طریق کابل USB**
    - اگر نسخهٔ فرم‌ویر شما پایین‌تر از 1.0.4 است، پیش از آنکه بتوانید به‌روزرسانی از طریق USB را انجام دهید، باید به‌روزرسانی اولیه را با کارت MicroSD انجام دهید.
    - مطمئن شوید که کیف‌پول Keystone شما دست‌کم 20% شارژ باتری دارد.
    - روی via USB بزنید و با کابل USB کیف‌پول Keystone خود را به رایانه وصل کنید. روی [Approve] بزنید تا به کیف‌پول Keystone خود دسترسی USB بدهید، زیرا در غیر این صورت ممکن است فقط اجازهٔ شارژ را بدهد.
    - مرورگر وب رایانهٔ خود را باز کنید و به [صفحهٔ به‌روزرسانی فرم‌ویر Keystone](https://keyst.one/firmware) بروید
    - در صفحهٔ به‌روزرسانی، روی دکمهٔ Install Update کلیک کنید و برای نصب آخرین فرم‌ویر، دستورالعمل‌های ارائه‌شده را دنبال کنید.
- **ساخت کیف‌پول:**
    - رمز عبور امن: برای محافظت از کیف‌پول خود یک PIN یا رمز عبور قوی انتخاب کنید.
    - نام‌گذاری کیف‌پول (اختیاری): در صورت تمایل، برای شناسایی آسان به کیف‌پول خود نامی بدهید یا از این مرحله بگذرید.
    - اگر برای نخستین بار کیف‌پول راه‌اندازی می‌کنید، Create New Wallet را انتخاب کنید.
    - دستگاه شما یک عبارت بازیابی 24 کلمه‌ای تولید می‌کند.
    - این عبارت بازیابی را یادداشت کنید و آن را در جای امنی نگه دارید.
    - عبارت بازیابی را با بررسی کلمات به ترتیب درستی که روی صفحه نمایش داده می‌شود، تأیید کنید.
- **اتصال کیف‌پول Zodl + Keystone:**
    - روی دستگاه Keystone: در صفحهٔ اصلی روی … بزنید
    - روی Connect Software Wallet بزنید و Zodl را انتخاب کنید. کد QR برای اتصال به Zodl ظاهر می‌شود.
    - در اپلیکیشن Zodl: روی منوی کشویی Zodl (بالا سمت چپ صفحه) بزنید
    - روی Connect Hardware Wallet بزنید
    - روی Ready to Scan بزنید
    - QR نمایش‌داده‌شده روی دستگاه Keystone را اسکن کنید
    - در اپلیکیشن Zodl: با زدن روی حساب نمایش‌داده‌شده، حساب کیف‌پول Keystone را تأیید کنید
    - روی Connect در پایین صفحه بزنید


## راهنمایی بیشتر

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/Jr6LqtD1W0s"
    title="Connect Keystone Hardware Wallet to Zodl"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
    

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/t_OHb1KqrRg"
    title="Sign an Outgoing Transaction with Keystone"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
