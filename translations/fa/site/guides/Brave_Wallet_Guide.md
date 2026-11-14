# نحوهٔ ارسال و دریافت Zcash محافظت‌شده (ZEC) با Brave Wallet: راهنمای گام‌به‌گام حریم خصوصی

Brave Wallet یک کیف‌پول رمزارز امن و بومی است که مستقیماً در مرورگر Brave تعبیه شده است؛ به هیچ افزونه‌ای نیاز ندارد.


## چرا پشتیبانی از ZEC محافظت‌شده اهمیت دارد


Zcash یکی از معدود رمزارزهایی است که به‌صورت پیش‌فرض با تراکنش‌های محافظت‌شده حریم خصوصی ارائه می‌دهد.

Brave Wallet اکنون از ZEC محافظت‌شدهٔ Orchard پشتیبانی می‌کند و امکان انجام تراکنش‌های خصوصی را بدون نیاز به نرم‌افزار شخص ثالث فراهم می‌سازد.

کاربران اکنون می‌توانند ZEC را بدون افشای موجودی یا فراداده ارسال و دریافت کنند؛ همه در داخل مرورگر Brave.


## آموزش

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/TNcHY-GXFVo"
    title="How to use ZEC on Brave"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## بخش 1: راه‌اندازی Brave Wallet

**مراحل پوشش داده‌شده:**

1. مرورگر Brave را باز کنید (فعلاً فقط نسخهٔ دسکتاپ)

2. روی آیکون کیف‌پول کلیک کنید یا به brave://wallet بروید

3. کیف‌پول خود را راه‌اندازی کنید (ایجاد یا وارد کردن)

4. به داشبورد رمزارز دسترسی پیدا کنید


![img1](/content-images/f54cd1a1-8569-4925-ba1c-7597d030593e-8d83734cd5.webp)


## بخش 2: افزودن Zcash (ZEC) به Brave Wallet

**مراحل پوشش داده‌شده:**

1. در داشبورد کیف‌پول، روی «Manage Assets» کلیک کنید

2. ZEC را جست‌وجو کرده و آن را فعال کنید

3. ZEC اکنون در کیف‌پول شما نمایش داده می‌شود


![img2](/content-images/6f2b2190-cf55-4394-9d5f-29ff9b5bb525-13d37cb455.webp)


## بخش 3: دریافت ZEC محافظت‌شده (آدرس یکپارچه)

**مراحل پوشش داده‌شده:**

1. در میان دارایی‌های خود روی ZEC کلیک کنید

2. گزینهٔ «Receive» را انتخاب کنید

3. Brave یک آدرس یکپارچه (UA) ایجاد می‌کند؛ آدرسی واحد که از هر دو نوع تراکنش محافظت‌شده و شفاف پشتیبانی می‌کند

4. کد QR را کپی یا اسکن کنید

5. UA خود را با فرستنده به اشتراک بگذارید



![img3](/content-images/53c940b6-1a03-4fa7-aefa-d3478f678a88-23f68a3855.webp)



## بخش 4: ارسال خصوصی ZEC محافظت‌شده

**مراحل پوشش داده‌شده:**

1. ZEC را انتخاب کنید -> Send

2. آدرس یکپارچه یا آدرس محافظت‌شدهٔ گیرنده را جای‌گذاری کنید

3. مبلغ را وارد کنید

4. جزئیات تراکنش را تأیید کنید

5. روی Send کلیک کنید؛ اکنون وجوه با استفاده از استخر Orchard به‌صورت خصوصی منتقل می‌شوند


![img4](/content-images/Internet_20250808_172118_4-e6df0f7fe2.webp)




## انواع آدرس

در ادامه توضیحی دربارهٔ هر یک از انواع آدرس Zcash آمده است:

**t-addr (t1...)** - آدرس‌های شفاف مانند آدرس‌های Bitcoin عمل می‌کنند، به این معنا که تراکنش‌ها روی بلاک‌چین عمومی هستند. استفاده از آن‌ها با کیف‌پول‌های غیر Zcash آسان‌تر است، اما هیچ حریم خصوصی‌ای فراهم نمی‌کنند.

**z-addr (zs...)** - آدرس‌های محافظت‌شده از فناوری حریم خصوصی Zcash (Sprout/Sapling) برای پنهان کردن فرستنده، گیرنده و مبلغ استفاده می‌کنند. تنها کلیدهای مشاهده یا مالک می‌توانند جزئیات را آشکار کنند.

**UA (u... یا QR)** - آدرس‌های یکپارچه چندین نوع آدرس (شفاف، محافظت‌شده، Orchard) را در یک آدرس ترکیب می‌کنند. این امر حداکثر سازگاری را فراهم می‌کند و در عین حال، هر جا ممکن باشد، حریم خصوصی را در اولویت قرار می‌دهد.



## پیشرفته

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/AmTMa5HXa2w"
    title="Brave Wallet Tutorial : Defi with Near Intents and Shielded Zcash"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
    

## جمع‌بندی: حریم خصوصی به شکلی کاربردی

با Brave Wallet و ZEC محافظت‌شده، حریم خصوصی اکنون برای همه در دسترس است؛ بدون نیاز به نرم‌افزار خاص یا دانش پیشرفته.

ایده‌آل برای روزنامه‌نگاران، فعالان یا افرادی که به حریم خصوصی اهمیت می‌دهند.

همین امروز نخستین تراکنش محافظت‌شدهٔ خود را در Brave امتحان کنید!


**خصوصی بمانید. آزاد بمانید. ZEC را با Brave Wallet به‌صورت خصوصی ارسال کنید.**
