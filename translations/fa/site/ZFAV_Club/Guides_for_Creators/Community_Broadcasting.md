<a href="https://github.com/Zechub/zechub/edit/main/site/ZFAV_Club/Guides_for_Creators/Community_Broadcasting.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="ویرایش صفحه"/>
</a>

# پخش کامیونیتی با استفاده از VDO.Ninja و OBS Studio

این آموزش کوتاه در جریان [DWeb Camp 2023](https://dwebcamp.org/) توسط گروهی از همکاران و داوطلبان تهیه شده است. هدف این تمرین، بهره‌گیری از گوشی‌های هوشمند متصل به یک شبکه MESH آفلاین برای ضبط و پخش زنده‌ی ویدیو به‌صورت مشارکتی است.

ما از دو نرم‌افزار متن‌باز استفاده می‌کنیم: [OBS Studio (Open Broadcaster software)](https://obsproject.com/) و [VDO.Ninja](https://vdo.ninja/). شما می‌توانید این نرم‌افزارها را دانلود کرده و به‌صورت محلی روی رایانه‌ی خود اجرا کنید.

## OBS Studio (Open Boardcaster software)

OBS Studio یک نرم‌افزار رایگان و متن‌باز برای ضبط و پخش زنده است که برای چندین سیستم‌عامل در دسترس است. این نرم‌افزار نخستین بار در سال 2012 منتشر شد و در میان کامیونیتی پخش زنده‌ی بازی‌ها و تولیدکنندگان مستقل محتوای ویدیویی طرفداران بسیار زیادی دارد.

رابط کاربری OBS Studio ممکن است برای کاربرانی که نخستین بار از آن استفاده می‌کنند بسیار دلهره‌آور به نظر برسد. OBS Studio به دو پنجره تقسیم می‌شود: «Preview» و «Broadcast». پنجره‌ی پیش‌نمایش، ویدیوهای در دسترس (دوربین‌های مختلف مانند وب‌کم، Iriun Webcam، OBS Virtual Camera، منبع Video و Browser) را نشان می‌دهد که «Scenes» نامیده می‌شوند و «Broadcast» پخش زنده را نمایش می‌دهد.

برای پخش جریان یک دوربین راه دور از VDO.ninja در OBS Studio، شما ابتدا یک «Browser Source» جدید از طریق «Sources > Add > Browser» اضافه می‌کنید. در پنجره‌ی جدید، می‌توانید URL منبع را از VDO.Ninja وارد کرده و گزینه‌ی «Make source visible» را انتخاب کنید.

اکنون شما می‌توانید پخش جریان‌های راه دور را آغاز کنید.

## VDO.Ninja

[VDO.Ninja](https://vdo.ninja/) یک اپلیکیشن وب رایگان و متن‌باز است که به شما امکان می‌دهد دستگاه‌های همراه خود را به دوربین پخش زنده تبدیل کنید. شما می‌توانید این نرم‌افزار را دانلود کرده و روی رایانه‌ی محلی خود راه‌اندازی کنید یا مستقیماً از [نسخه‌ی آنلاین در https://vdo.ninja](https://vdo.ninja/). استفاده کنید.

رابط VOD.Ninja ساده است؛ کافی است VDO.Ninja را در مرورگر وب دستگاه همراه خود باز کنید و «Add your camera to OBS» را انتخاب کنید. سپس دوربین و دستگاه صوتی خود را از فهرست دستگاه‌ها انتخاب کرده و روی «Start» کلیک می‌کنید. پس از آن، یک لینک «view» دریافت می‌کنید که می‌توانید آن را به OBS Studio اضافه کنید.

## کارگردانی یک تماس کامیونیتی با VDO.Ninja

ابتدا با مرورگر وب خود روی یک رایانه‌ی رومیزی یا لپ‌تاپ به [VDO.ninja](http://VDO.ninja) بروید.

<a href="">
    <img src="/content-images/_unavailable.svg" alt="" width="300" height="400"/>
</a>


برای ایجاد یک اتاق جدید و کارگردانی پخش زنده‌ی تماس کامیونیتی خودتان، روی Create a Room کلیک کنید.

صفحه‌ی بعدی اطلاعات پایه‌ای را برای راه‌اندازی اتاق شما درخواست می‌کند.

<a href="">
    <img src="/content-images/_unavailable.svg" alt="" width="400" height="400"/>
</a>

پس از ایجاد اتاق، کارگردان در صفحه‌ی بعدی گزینه‌های کنترلی بسیاری در اختیار دارد.

<a href="">
    <img src="/content-images/_unavailable.svg" alt="" width="400" height="400"/>
</a>


هنگامی که افراد به اتاق شما می‌پیوندند، شما به‌عنوان کارگردان، تمام گزینه‌های منبع و کنترل‌ها را همراه با ویدیو و صدای آن‌ها مشاهده خواهید کرد.

<a href="">
    <img src="/content-images/_unavailable.svg" alt="" width="400" height="300"/>
</a>


## پرسش‌های متداول

- چه نوع کارت گرافیکی برای OBS Studio لازم است؟

شما می‌توانید از یک رایانه‌ی شخصی با کارت گرافیک خوب و حافظه‌ی زیاد استفاده کنید یا به‌جای آن از یک انکودر سخت‌افزاری مانند [Teradek VidiU](https://www.bhphotovideo.com/c/product/1609186-REG/teradek_10_0235_vidiu_x_modem.html?gclid=EAIaIQobChMIl4aIo7zX_wIVDhqtBh0PgwhxEAAYAiAAEgInufD_BwE) بهره ببرید.
- آیا OBS امکان ترجمه و زیرنویس زنده را فراهم می‌کند؟

برخی افزونه‌های ارائه‌شده توسط کامیونیتی وجود دارند که به نظر می‌رسد چنین قابلیتی را فراهم می‌کنند. [https://github.com/eddieoz/OBS-live-translation](https://github.com/eddieoz/OBS-live-translation)

- آیا شما می‌توانید افزونه‌های خود را برای OBS Studio توسعه دهید؟

بله، OBS از اسکریپت‌نویسی با lua و python پشتیبانی می‌کند. همچنین JavaScript برای Overlayها و webviewها.

- آیا ما از محو شدن زنده به سیاهی یا ترنزیشن‌ها استفاده می‌کنیم؟

این به شما، تهیه‌کننده، بستگی دارد!

- آیا هنگام پخش زنده تأخیر وجود دارد؟

این موضوع بیشتر به مقصدی بستگی دارد که به آن پخش می‌کنید. برای مثال، YouTube ممکن است به دلیل پردازش ویدیویی که پیش از پخش روی سرورهایش انجام می‌شود، یک دقیقه یا بیشتر تأخیر داشته باشد.

- قطع شدن صدا هنگام استفاده از OBS روی دستگاه کند و هنگام استفاده از پرده‌ی سبز

از انکودر سخت‌افزاری استفاده کنید یا از stream yard
[https://support.streamyard.com/hc/en-us/articles/360056350852-How-to-Use-OBS-Virtual-Camera-with-StreamYard](https://support.streamyard.com/hc/en-us/articles/360056350852-How-to-Use-OBS-Virtual-Camera-with-StreamYard) یا [RiverSide.FM](http://riverside.fm/) استفاده کنید.

## سپاس‌گزاری

- Ryan
- Ajay
- Arky

## منابع

[https://obsproject.com/help](https://obsproject.com/help)

[https://docs.vdo.ninja/](https://docs.vdo.ninja/)

Office Hours: کامیونیتی رسانه و رویدادهای دیجیتال
[https://alex4d.com/notes/item/media-and-digital-event-community](https://alex4d.com/notes/item/media-and-digital-event-community)
