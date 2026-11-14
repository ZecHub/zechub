# چنین گفت Zakura روی Akash (Regtest)

استک **Thus Spoke Zakura v0.4.1** را روی Akash اجرا کنید: Zakura Regtest، lightwalletd و **داشبورد / HTTP API** کیف‌پول. کوین‌های آزمایشی هیچ ارزشی ندارند. ZEC شبکه اصلی را به اینجا ارسال نکنید.

قالب: [awesome-akash/thus-spoke-zakura](https://github.com/akash-network/awesome-akash/tree/master/thus-spoke-zakura)

مخزن بالادستی: [zcashlabs/thus-spoke-zakura](https://github.com/zcashlabs/thus-spoke-zakura) تگ **v0.4.1**

### ایمیج‌ها

| سرویس | ایمیج |
| --- | --- |
| داشبورد + API (`app`) | `ghcr.io/zcashlabs/thus-spoke-zakura-app:0.4.1` |
| lightwalletd | `ghcr.io/zcashlabs/thus-spoke-zakura-lightwalletd:0.4.1` |
| Zakura | `zakuracore/zakura:1.6.0` (نسخه ثابت‌شده در لانچر 0.4.1 کامپایل شده است) |

### راه‌اندازی خودکار

در اولین اجرا، کانتینر `app` دستور `ths-server init` را روی والیوم پایدار خود اجرا می‌کند و سپس `ths-server serve` را. Serve تا زمانی که JSON-RPC Zakura و lightwalletd در دسترس قرار گیرند، دوباره تلاش می‌کند. شما `ths` را روی ارائه‌دهنده اجرا نمی‌کنید؛ SDL خود محیط اجراست.

### Akash چگونه پورت‌ها را منتشر می‌کند

`port` / `as` در SDL پورت‌های **کانتینر** هستند. برنامه روی پورت **8080** (`THS_LISTEN`) گوش می‌دهد؛ lightwalletd روی **9067**؛ RPC Zakura روی **18232** و P2P روی **18233**. در داخل دیپلویمنت، سرویس‌ها از همین پورت‌ها استفاده می‌کنند (`http://zakura:18232`، `http://lightwalletd:9067`).

این‌ها پورت‌های IP عمومی ارائه‌دهنده **نیستند**.

**پیش‌فرض (این قالب):** بدون IP اختصاصی.

| سرویس | پورت شنود کانتینر | `as` در SDL | نحوه نمایش در lease |
| --- | --- | --- | --- |
| `app` (داشبورد + HTTP API) | 8080 | 80 (HTTP) | نام میزبان Ingress، اغلب روی 80/443 — **این URI را در مرورگر باز کنید** |
| `lightwalletd` | 9067 | 9067 (TCP، سراسری) | `host:&lt;random-high-port&gt;` |
| RPC `zakura` | 18232 | 18232 (TCP، سراسری) | `host:&lt;random-high-port&gt;` |
| P2P `zakura` | 18233 | 18233 (TCP، سراسری) | `host:&lt;random-high-port&gt;` |

پس از آماده شدن lease، بخش **Leases → URIs** مرجع معتبر است. برای داشبورد، URI **`app`** را باز کنید (همان رابط کاربری‌ای که `ths` به‌صورت محلی باز می‌کند). کلاینت‌های compact را به URI **lightwalletd** هدایت کنید (`THS_LIGHTWALLETD_TLS=false`). `:8080`، `:80` یا `:9067` را روی IP ارائه‌دهنده وارد نکنید، مگر اینکه یک lease با IP اختصاصی آن پورت‌ها را عمومی کرده باشد.

**IPهای اختصاصی** (`endpoints` / `kind: ip`) یک گزینه اضافی پولی هستند و در این قالب **وجود ندارند**. آن‌ها می‌توانند یک IP عمومی و گاهی پورت `as` را ثابت کنند. اگر به آن نیاز ندارید، آن‌ها را غیرفعال بگذارید.

### از کدام سایت استفاده کنید (پرداخت‌ها)

SDL یکسان است. تفاوت دو رابط وب Akash در **نحوه پرداخت شما** است.

| سایت | پرداخت‌ها | کیف‌پول |
| --- | --- | --- |
| [console.akash.network](https://console.akash.network) | پرداخت وب سنتی (کارت / روش‌های فیات ارائه‌شده توسط Console) | حساب Console |
| [air.akash.network](https://air.akash.network) | پرداخت‌های بومی روی زنجیره Akash (AKT / ACT) | **Keplr** |

اگر می‌خواهید با Keplr به‌صورت on-chain پرداخت کنید، از **Air** استفاده کنید. اگر یک فرایند پرداخت وب متعارف می‌خواهید، از **Console** استفاده کنید.

### دیپلوی

**پرداخت‌های وب (Console)**

[![استقرار روی Akash Console](https://raw.githubusercontent.com/akash-network/console/refs/heads/main/apps/deploy-web/public/images/deploy-with-akash-btn.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-thus-spoke-zakura)

**پرداخت‌های بومی Akash با Keplr (Air)**

[این قالب را در Air باز کنید](https://air.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-thus-spoke-zakura)

دیپلویمنت را از روی قالب بسازید، یک پیشنهاد را بپذیرید، صبر کنید تا لاگ‌های `app` نشان دهند که `ths-server serve` پایدار در حال اجراست، سپس **URI `app`** را برای داشبورد باز کنید.

### مطالب مرتبط

- [Zakura روی Akash](/guides/akash-network-zakura) — نود اعتبارسنج Mainnet/Testnet
- [Zebra روی Akash](/guides/akash-network-zebra)
- کتاب: [github.com/zcashlabs/thus-spoke-zakura/tree/main/book](https://github.com/zcashlabs/thus-spoke-zakura/tree/main/book)
