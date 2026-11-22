# دموی Ywallet FROST

> **Ywallet دیگر نگهداری نمی‌شود.** توسعه‌دهنده‌ی آن تأیید کرده است که این نرم‌افزار برای Ironwood (NU6.3) به‌روزرسانی نخواهد شد. بنابراین دیگر نمی‌تواند زنجیره را دنبال کند و مراحل زیر را نمی‌توان روی mainnet انجام داد. این صفحه برای مراجعه نگه داشته شده است. Zkool، از همان توسعه‌دهنده، جانشینی است که نگهداری می‌شود و از multisig مبتنی بر FROST پشتیبانی می‌کند.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/3IZgxDqQNbw"
    title="FROST + Ywallet Transaction Demo"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## کامپایل فایل‌های اجرایی FROST

[GitHub لینک](https://github.com/ZcashFoundation/frost-zcash-demo)

از مخزن بالا استفاده کنید و دستورالعمل‌های کامپایل را دنبال کنید: 

```bash
cargo build --bin trusted-dealer
cargo build --bin dkg
cargo build --bin coordinator
cargo build --bin participant
```

فایل‌های اجرایی در پوشه‌ی target قرار خواهند گرفت.

## ساخت UA در FROST

`./generateFROST_UA.sh`



## وارد کردن UFVK به Ywallet

Accounts -> روی + کلیک کنید و ufvk مرحله‌ی قبل را جای‌گذاری کنید

## ایجاد یک تراکنش با Ywallet

هر UA دلخواهی را جای‌گذاری کنید و یک تراکنش ارسال کنید. فایل را ذخیره کنید.

## شروع فرایند امضای FROST 

`./signFROST_tx.sh rawtxs/mytx signedtxs/mysignedtx`

ورودی اول، مسیر تراکنش خام مرحله‌ی قبل است
ورودی دوم، مسیر و نام تراکنش امضاشده‌ای است که می‌خواهید آن را پخش کنید
در این بخش به FROST می‌گویید که می‌خواهید همه کدام تراکنش را امضا کنند

## شروع Coordinator

`./runCoordinator.sh`

این بخش امضای دیجیتال هر شرکت‌کننده را هماهنگ می‌کند و یک امضای دیجیتال گروهی ایجاد می‌کند

## امضای این تراکنش توسط هر شرکت‌کننده

```bash
./participantSign.sh key-package-1.json
./participantSign.sh key-package-2.json
```

## نهایی کردن تراکنش امضاشده

در پنجره‌ی coordinator، امضای دیجیتال گروهی را که در خروجی نمایش داده می‌شود کپی کنید و آن را در پنجره‌ی امضای FROST جای‌گذاری کنید.
این کار امضای FROST را کامل می‌کند و فایل «mysingedtx» را در خروجی ایجاد می‌کند


## پخش تراکنش شما با Ywallet

روی «More» در سمت راست پایین Ywallet کلیک کنید و «Broadcast» را پیدا کنید. فایل «mysignedtx» را پیدا کنید و روی ok کلیک کنید.

اگر همه‌چیز درست کار کند، یک شناسه‌ی تراکنش دریافت خواهید کرد :)
