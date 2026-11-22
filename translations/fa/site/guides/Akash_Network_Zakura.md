# نحوه اجرای Zakura روی Akash Network

مسیر گام‌به‌گام برای راه‌اندازی یک فول‌نود **Zakura** Zcash با استفاده از قالب [awesome-akash zcash-zakura](https://github.com/akash-network/awesome-akash/tree/master/zcash-zakura).

Zakura یک نود Zcash سازگار با اجماع است (فورک‌شده از Zebra) که همگام‌سازی سریع‌تر، هرس بومی و راه‌اندازی اولیه از طریق اسنپ‌شات را ارائه می‌دهد. این قالب نسخه **`zakuracore/zakura:1.8.1`** را ثابت می‌کند (ثابت‌شده با digest؛ از `:latest` یا `1.1.1` استفاده نکنید).

### آنچه دریافت می‌کنید

- P2P شبکه اصلی: پورت کانتینر **8233**، منتشرشده به‌صورت سراسری (نگاشت پورت را در ادامه ببینید)
- وضعیت هرس‌شده پایدار (پیش‌فرض 64 GiB) با راه‌اندازی اولیه از اسنپ‌شات Valar در نخستین اجرا
- Prometheus روی **9999** و بررسی سلامت روی **8080** (داخلی، بدون URI عمومی)
- JSON-RPC روی **8232** به‌صورت داخلی برای **lightwalletd** هم‌مکان؛ LWD روی پورت کانتینر **9067** گوش می‌دهد و به‌صورت سراسری منتشر می‌شود

پرچم‌های قابلیت در SDL (true/false): `ENABLE_METRICS`، `ENABLE_HEALTH`، `ENABLE_RPC`، `ENABLE_LIGHTWALLETD`. وقتی lightwalletd فعال باشد، احراز هویت با کوکی غیرفعال است، زیرا lightwalletd نمی‌تواند فایل‌های کوکی را بخواند.

### از کدام سایت استفاده کنید (پرداخت‌ها)

SDL یکسان است. تفاوت دو رابط وب Akash در **نحوه پرداخت** است.

| سایت | پرداخت‌ها | کیف‌پول |
| --- | --- | --- |
| [console.akash.network](https://console.akash.network) | پرداخت وب سنتی (کارت / روش‌های فیات که Console ارائه می‌دهد) | حساب Console |
| [air.akash.network](https://air.akash.network) | پرداخت‌های بومی روی زنجیره Akash (AKT / ACT) | **Keplr** |

وقتی می‌خواهید با Keplr به‌صورت on-chain پرداخت کنید، از **Air** استفاده کنید. وقتی یک فرایند پرداخت وب متعارف می‌خواهید، از **Console** استفاده کنید. انتظار تسویه بومی Keplr را در Console نداشته باشید.

### استقرار

**پرداخت‌های وب (Console)**

[![استقرار روی Akash Console](https://raw.githubusercontent.com/akash-network/console/refs/heads/main/apps/deploy-web/public/images/deploy-with-akash-btn.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zakura)

**پرداخت‌های بومی Akash با Keplr (Air)**

[این قالب را در Air باز کنید](https://air.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zakura)

1. پیوند مربوطه را در بالا باز کنید (Console یا Air).
2. در Air، **Keplr** را متصل کنید و مطمئن شوید که برای سپرده و اجاره AKT/ACT دارید. در Console، پرداخت وبی را که رابط کاربری نمایش می‌دهد تکمیل کنید.
3. اگر `zcash-zakura/deploy.yaml` از قبل پر نشده است، آن را بارگذاری کنید.
4. سپرده بگذارید، یک پیشنهاد را بپذیرید و منتظر اجاره بمانید.
5. لاگ‌ها باید دانلود اسنپ‌شات (در نخستین اجرا) و سپس `zakurad start` را نشان دهند.
6. بخش **Leases → URIs** را باز کنید. از host:port که ارائه‌دهنده اختصاص داده استفاده کنید، نه 8233 یا 9067 روی IP عمومی.

### نحوه انتشار پورت‌ها در Akash

`port` / `as` در SDL (8233، 9067، 8232) پورت‌های **کانتینر** هستند. Zakura همچنان روی 8233 گوش می‌دهد؛ lightwalletd روی 9067؛ و RPC روی 8232 برای sidecar مربوط به LWD (`zakura:8232`).

این‌ها پورت‌های روی IP عمومی ارائه‌دهنده **نیستند**.

**پیش‌فرض (این قالب):** بدون IP اختصاصی. هر expose از نوع TCP `global: true` به یک **پورت بالای تصادفی** روی یک میزبان مشترک ارائه‌دهنده نگاشت می‌شود. Console/Air آن‌ها را به‌عنوان URIهای اجاره فهرست می‌کنند، برای مثال:

```
zakura-8233: provider.example:31482
lightwalletd-9067: provider.example:32011
```

همتایان به URI مربوط به **8233** متصل می‌شوند (`provider.example:31482`). کیف‌پول‌های سبک از URI مربوط به **9067** استفاده می‌کنند (TLS خاموش است، مگر اینکه خودتان TLS را خاتمه دهید). `ZAKURA_NETWORK__EXTERNAL_ADDR` را روی URI نگاشت‌شده P2P تنظیم کنید، نه `:8233`.

exposeهای **داخلی** (RPC روی `8232`، متریک‌ها روی `9999`، بررسی سلامت روی `8080`) در شبکه استقرار باقی می‌مانند. بدون URI عمومی.

**IPهای اختصاصی** (`endpoints` / `kind: ip`) یک گزینه اضافی پولی هستند و در این قالب **وجود ندارند**. این IPها می‌توانند یک IP عمومی و گاهی پورت `as` را ثابت کنند. فقط در صورتی آن را اضافه کنید که به یک `host:8233` پایدار نیاز دارید.

### آرشیوی در برابر هرس‌شده

پیش‌فرض **هرس‌شده** است (اسنپ‌شات حدود 11 GiB، دیسک 64 GiB). برای تاریخچه کامل، `SNAPSHOT_KIND=archive` را تنظیم کنید، دیسک را به 350 GiB یا بیشتر افزایش دهید و `ZAKURA_STATE__STORAGE_MODE=archive` را تنظیم کنید.

### مرتبط

- [Zebra روی Akash](/guides/akash-network-zebra) — Zcash Foundation `zebrad` (تاریخچه کامل، بدون اسنپ‌شات)
- [چنین گفت Zakura روی Akash](/guides/thus-spoke-zakura-akash) — داشبورد Regtest + اپلیکیشن (v0.4.1)
- سورس Zakura: [github.com/zakura-core/zakura](https://github.com/zakura-core/zakura)
- اسنپ‌شات‌ها: [zakura.com/snapshots/](https://zakura.com/snapshots/)
