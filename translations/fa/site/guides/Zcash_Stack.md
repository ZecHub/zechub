<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zcash_Stack.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="ویرایش صفحه"/>
</a>

# Zcash Stack: اجرای یک سرور کیف‌پول سبک روی Kubernetes یا Docker

[Zcash Stack](https://github.com/zecrocks/zcash-stack) کیت استقرار متن‌باز تیم پشتیبان zec.rocks است. این کیت یک فول‌نود Zcash، یک سرور کیف‌پول سبک و افزونه‌های اختیاری (Zaino، یک مرورگر بلوک، سرویس مخفی Tor، یک بذرگذار DNS، zecd، یک پروکسی gRPC-web برای کیف‌پول‌های مرورگری) را در قالب یک Helm chart برای Kubernetes و فایل‌های Compose Docker بسته‌بندی می‌کند. همه سرورهای zec.rocks lightwalletd از همین chart اجرا می‌شوند. بودجه این پروژه را [Zcash Community Grants](https://zcashcommunitygrants.org/) تأمین می‌کند.

این صفحه خلاصه می‌کند که کیت چه چیزهایی را مستقر می‌کند، پیش از نصب به چه چیزهایی نیاز دارید و کدام تنظیمات اهمیت بیشتری دارند. این راهنما با نسخه **0.4.9** از chart مطابقت دارد (منتشرشده در 13 نوامبر 2026). [README مربوط به chart](https://github.com/zecrocks/zcash-stack/blob/main/charts/zcash-stack/README.md) و [یادداشت‌های کارگاه](https://github.com/zecrocks/zcash-stack/tree/main/docs) خود پروژه مرجع هستند؛ پیش از اجرای هر چیزی در محیط عملیاتی، آن‌ها را بخوانید.

## خلاصه

- **دو روش برای راه‌اندازی.** یک Helm chart برای Kubernetes (k3s روی سخت‌افزار NVMe خودتان هدف اصلی است؛ GKE Standard و Autopilot هم کار می‌کنند) و فایل‌های Compose Docker برای یک دستگاه. کارگاه برای کسانی که تازه سرور اجرا می‌کنند Docker و برای کسانی که از قبل چندین سرور را مدیریت می‌کنند Kubernetes را پیشنهاد می‌کند.
- **یک نود زنجیره به‌همراه یک سرور کیف‌پول سبک.** پیکربندی پیشنهادی Zebra + lightwalletd است. Zakura می‌تواند جای Zebra را به‌عنوان بک‌اند بگیرد و Zaino می‌تواند جای lightwalletd را بگیرد یا در کنار آن اجرا شود.
- **حدود 600 GiB فضای دیسک در نظر بگیرید.** وضعیت زنجیره Zebra در ژوئن 2026 حدود 260 GiB بود و همچنان در حال رشد است؛ حافظه نهان کیف‌پول سبک حدود 17 GiB دیگر اضافه می‌کند. همگام‌سازی کامل چند روز طول می‌کشد، بنابراین chart می‌تواند به‌جای آن از یک snapshot منتشرشده بازیابی کند.
- **نسخه‌های تصویر در chart ثابت هستند.** در نسخه 0.4.9، این موارد عبارت‌اند از Zebra 7.0.0 (پیرو NU7)، lightwalletd v0.6.1، Zakura 1.8.6 و Zaino 0.8.0. پیش از ارتقای شبکه و پیش از رسیدن یک نسخه Zakura به ارتفاع پایان پشتیبانی، chart را به‌روز کنید.
- **سرورتان را ثبت کنید.** اپراتورهای عمومی می‌توانند سرور خود را به مانیتور [hosh.zec.rocks](https://hosh.zec.rocks/zec) اضافه کنند تا کیف‌پول‌ها و کاربران بتوانند وضعیت دسترس‌پذیری آن را ببینند.

## چه چیزهایی مستقر می‌شوند

هر مؤلفه با یک کلید در [`values.yaml`](https://github.com/zecrocks/zcash-stack/blob/main/charts/zcash-stack/values.yaml) مربوط به chart کنترل می‌شود. به‌طور پیش‌فرض فقط lightwalletd فعال است و به یک نود زنجیره نیاز دارد؛ بنابراین فایل‌های نمونه Zebra را هم فعال می‌کنند.

| مؤلفه | تصویر در chart 0.4.9 | پیش‌فرض | کارکرد |
|:--|:--|:--|:--|
| Zebra | `zfnd/zebra:7.0.0` | خاموش (در نمونه‌ها روشن) | فول‌نود؛ زنجیره را اعتبارسنجی می‌کند و RPC را در اختیار بقیه اجزا می‌گذارد |
| Zakura | `zakuracore/zakura:1.8.6` | خاموش | انشعاب Zebra؛ بک‌اندی جایگزین برای lightwalletd یا Zaino، به‌جای Zebra |
| lightwalletd | `electriccoinco/lightwalletd:v0.6.1` | روشن | سرور کیف‌پول سبک (gRPC) برای کیف‌پول‌های موبایل و دسکتاپ |
| Zaino | `zingodevops/zaino:0.8.0-no-tls` | خاموش | نمایه‌ساز Rust که به کیف‌پول‌های سبک هم سرویس می‌دهد |
| مرورگر بلوک | `emersonian/zcash-explorer:v0.0.6` | خاموش | مرورگر وبی که JSON-RPC نود را می‌خواند (Zaino نمی‌تواند پشتیبان آن باشد؛ فقط gRPC ارائه می‌دهد) |
| Tor | `osminogin/tor-simple:0.4.9.16` | خاموش | lightwalletd یا Zaino را به‌عنوان سرویس `.onion` منتشر می‌کند |
| بذرگذار DNS | `zfnd/dnsseeder:v1.8.0` | خاموش | به نودهای جدید برای یافتن همتاها کمک می‌کند |
| zecd | `ghcr.io/zecrocks/zecd:0.6.3` | خاموش | سرور کیف‌پولی با اولویت آدرس‌های محافظت‌شده ([zecd](/zcash-tech/zecd) را ببینید) |
| پروکسی gRPC-web | `envoyproxy/envoy:v1.40.2` | خاموش | به کیف‌پول‌های مرورگری امکان می‌دهد با lightwalletd ارتباط برقرار کنند؛ مرورگرها نمی‌توانند از طریق gRPC خام به آن دسترسی پیدا کنند |
| کیف‌پول WebZjs | `ghcr.io/zecrocks/webzjs-wallet` | خاموش | کیف‌پول مرورگری؛ به پروکسی gRPC-web روی همان میزبان نیاز دارد |

دو نکته درباره نسخه‌ها. نسخه بالادستی Zaino برابر با [0.10.1](https://github.com/zingolabs/zaino/releases) است، درحالی‌که chart هنوز تصویر 0.8.0 را ارائه می‌کند؛ پس پیش از اتکا به رفتار جدیدتر Zaino، `values.yaml` را بررسی کنید. همچنین نودهای Zakura در Mainnet در ارتفاع پایان پشتیبانیِ هر نسخه متوقف می‌شوند: برای نسخه 1.8.6، این ارتفاع بلوک 3,643,309، حدود 5 دسامبر 2026 است؛ همچنین نسخه‌های x86-64 از 1.8.0 به بعد روی CPUهای فاقد BMI2 و ADX اجرا نمی‌شوند. صفحه [Zakura Node](/zcash-tech/zakura-node) هر دو موضوع را پوشش می‌دهد.

## Kubernetes: پیش از نصب

chart با سه موردی کار می‌کند که باید یک بار برای هر کلاستر راه‌اندازی کنید.

1. **یک کنترل‌کننده ingress.** chart یک Kubernetes `Ingress` استاندارد می‌سازد و به‌طور پیش‌فرض از کلاس `nginx` استفاده می‌کند؛ ingress-nginx پیشنهاد می‌شود، چون gRPC را در k3s و GKE به یک شکل مدیریت می‌کند. در k3s، یا k3s را با `--disable traefik` نصب کنید یا Traefik را نگه دارید و `ingress.className: traefik` به‌علاوه `ingress.backendProtocol: GRPC` را تنظیم کنید (در این صورت chart یک Traefik `IngressRoute` ایجاد می‌کند، چون Ingress معمولی از طریق Traefik برای gRPC خطای HTTP 500 برمی‌گرداند). در GKE، کلاس ingress داخلی `gce` نمی‌تواند gRPC را به lightwalletd یا Zaino هدایت کند.
2. **cert-manager و یک ClusterIssuer** برای دریافت خودکار گواهی‌های Let's Encrypt (`examples/cluster-issuer.yaml`؛ ابتدا آن را با صادرکننده staging آزمایش کنید). در GKE Autopilot، cert-manager را با `--set global.leaderElection.namespace=cert-manager` نصب کنید؛ وگرنه ایجاد صادرکننده با خطای x509 «unknown authority» شکست می‌خورد. می‌توانید از cert-manager صرف‌نظر کنید و `<service>.ingress.tls.secretName` را به گواهی خودتان متصل کنید.
3. **یک StorageClass.** `local-path` در k3s با NVMe مناسب است. در GKE، برای Zebra یک کلاس IOPS ازپیش‌تأمین‌شده اختصاص دهید (مخزن یک نمونه Hyperdisk دارد) و ابتدا سهمیه دیسک منطقه‌ای را افزایش دهید: پروژه‌های جدید GKE در هر منطقه فقط 500 GB فضای SSD و 500 GB فضای Hyperdisk دارند و یک نود زنجیره به 300 تا 500 GB نیاز دارد؛ در غیر این صورت، حجم در `Pending` با وضعیت `QUOTA_EXCEEDED` می‌ماند. `storageClassName` را نمی‌توان در StatefulSet موجود تغییر داد، مگر اینکه حجم را دوباره ایجاد کنید.

سپس برای هر نام میزبان، یک رکورد DNS ایجاد کنید که به IP خارجی کنترل‌کننده ingress اشاره کند. اگر هنوز DNS ندارید، یک نام [sslip.io](https://sslip.io) مانند `203-0-113-7.sslip.io` را کنار نام میزبان واقعی‌تان وارد کنید: این نام به IP درج‌شده در خودش اشاره می‌کند، پس گواهی بلافاصله صادر می‌شود. برای سرورهای دائمی، نام میزبان خودتان را نام اصلی نگه دارید.

## Kubernetes: نصب

```bash
helm repo add zcash https://zecrocks.github.io/zcash-stack
helm repo update
# copy an example from the repo's examples/ folder, set your hostnames and RPC credentials, then:
helm install zcash zcash/zcash-stack -f examples/zebra-mainnet.yaml
```

نمونه [`zebra-mainnet.yaml`](https://github.com/zecrocks/zcash-stack/blob/main/examples/zebra-mainnet.yaml)، Zebra را فعال می‌کند، lightwalletd را به آن متصل می‌کند، برای lightwalletd یک حافظه نهان 40 GiB و یک ingress با TLS در نظر می‌گیرد و RPC نود را داخل کلاستر نگه می‌دارد. پیش از نصب، نام کاربری و گذرواژه RPC نمونه را تغییر دهید. نمونه‌های دیگر، testnet، GKE، GKE Autopilot با دسترس‌پذیری بالا، یک سرویس مخفی Tor و راه‌اندازی اولیه با sslip.io را پوشش می‌دهند.

برای ارتقا، `helm repo update` را اجرا کنید، تغییر را با افزونه helm-diff پیش‌نمایش کنید (`helm diff upgrade zcash zcash/zcash-stack -f values.yaml`)، سپس `helm upgrade` را با همان آرگومان‌ها اجرا کنید. اگر از chart نسخه 0.0.x می‌آیید، ابتدا [MIGRATION.md](https://github.com/zecrocks/zcash-stack/blob/main/charts/zcash-stack/MIGRATION.md) را بخوانید: نسخه 0.1.0 تنظیمات قدیمی Traefik را با Ingress استاندارد و cert-manager جایگزین کرد و ساختار مقادیر هم تغییر کرد.

## تعیین اندازه منابع

| | وضعیت پایدار | همگام‌سازی اولیه | دیسک |
|:--|:--|:--|:--|
| Zebra | حدود 0.1 vCPU، 1.6 GiB | مصرف زیاد CPU، IOPS و حافظه | حدود 260 GiB (ژوئن 2026) و رو به رشد؛ مقدار پیش‌فرض chart برابر با 500 GiB |
| lightwalletd | حدود 0.15 vCPU، 165 MiB | حافظه نهان خود را بلوک‌به‌بلوک می‌سازد | حدود 17 GiB؛ مقدار پیش‌فرض chart برابر با 40 GiB |

مجموع منابع درخواستی کل پشته حدود 1.5 vCPU و 4.5 GiB حافظه است. برای یک دستگاه، chart مشخصات 8 vCPU، مقدار 32 GiB رم و حدود 1 TB فضای NVMe را پیشنهاد می‌کند (در GKE، یک `n2-standard-8` با حجم Hyperdisk یا pd-ssd به‌اندازه 500 GiB). منابع درخواستی پیش‌فرض از حداقل‌های GKE Autopilot بیشترند و محدودیت CPU غیرفعال است تا همگام‌سازی بتواند از ظرفیت بیشتر استفاده کند.

## تنظیمات مهم

**بازیابی از snapshot.** `<chain>.initSnapshot.enabled: true` را (همراه با `initSnapshot.url`، `gs://` یا `https://`) تنظیم کنید تا به‌جای همگام‌سازی از پیدایش، کار را از یک snapshot منتشرشده شروع کنید. فرایند بازیابی میزان پیشرفت را ثبت می‌کند، دانلود نیمه‌تمام را به‌درستی از نو انجام می‌دهد و هیچ‌گاه حجم سالمِ نصب قبلی را پاک نمی‌کند. snapshot راهی برای کوتاه‌تر کردن مسیر اعتماد است: بلوک‌های بعد از آن همچنان اعتبارسنجی می‌شوند و snapshot نامعتبر با بلوک‌هایی که اعتبارسنجی نمی‌شوند مشخص خواهد شد. طبق کارگاه، همگام‌سازی از ابتدا حدود 10 روز و شروع از snapshot حدود 10 ساعت طول می‌کشد.

**مقیاس‌پذیری و دسترس‌پذیری پیوسته.** lightwalletd و Zaino حافظه‌های نهان سبکی در برابر نود هستند؛ بنابراین برای به‌روزرسانی‌های مرحله‌ای بدون قطعی، `replicas: 2` را اجرا کنید (وقتی تعداد replicaها بیشتر از 1 باشد، یک PodDisruptionBudget به‌طور خودکار اضافه می‌شود). نودهای زنجیره برای توزیع بار نیستند: هر replica یک فول‌نود دیگر با حجم و همگام‌سازی مستقل است؛ بنابراین یک نود اجرا کنید یا برای افزونگی دو نود.

**همتاهای ورودی.** به‌طور پیش‌فرض، Zebra فقط اتصال‌های خروجی برقرار می‌کند. `zebra.p2pPublic.enabled: true` همتاهای ورودی را روی درگاه 8233 (در testnet درگاه 18233) می‌پذیرد و آدرس شما را اعلام می‌کند؛ روی سخت‌افزار مستقل و k3s، `externalAddrFrom: hostIP` را انتخاب کنید؛ در ابرهایی که IP خود نود خصوصی است، `nodeExternalIP` را انتخاب کنید؛ و در GKE Autopilot، `loadBalancer` را با یک IP ثابت رزروشده به‌کار ببرید.

**TLS و gRPC.** TLS در ingress خاتمه می‌یابد و HTTP/2 ساده داخل کلاستر اجرا می‌شود؛ بنابراین چندین نام میزبان می‌توانند به یک lightwalletd اشاره کنند. `path: /` را همراه با `pathType: Prefix` نگه دارید، چون مسیرهای متد gRPC به آن نیاز دارند. اگر گواهی نخست به‌دلیل تغییر مسیر HTTPS صادر نشد، آن را با صادرکننده staging صادر کنید یا موقتاً `ingress.tls.sslRedirect: "false"` را تنظیم کنید.

**سرویس مخفی Tor.** وقتی کلاستر شما IP یا دامنه عمومی ندارد، مفید است:

```yaml
tor:
  enabled: true
  targetService: zaino   # or lightwalletd
  hiddenServicePort: 443
```

آدرس را با `kubectl exec -it tor-0 -- cat /var/lib/tor/hidden_service/hostname` بخوانید و آن را از طریق یک کلاینت محلی Tor با [zecping](https://github.com/zecrocks/zecping) آزمایش کنید: `./zecping -socks localhost:9150 -addr <address>.onion:443`.

**هنگام ارتقای شبکه.** Zebra ممکن است همتاهایی را که هنوز از نسخه‌های قدیمی استفاده می‌کنند مسدود کند و متوقف شود؛ در گزارش‌ها هم اعلام می‌کند که به‌روزرسانی‌های زنجیره متوقف شده‌اند. فهرست مسدودسازی در حافظه نگهداری می‌شود، پس `kubectl delete pod zebra-0` آن را پاک می‌کند؛ پاد با همان داده‌های زنجیره و بدون همگام‌سازی مجدد بازمی‌گردد.

## Compose برای Docker

برای یک دستگاه، مخزن را clone کنید و فایل پیش‌فرض را از پوشه `docker/` اجرا کنید:

```bash
git clone https://github.com/zecrocks/zcash-stack.git
cd zcash-stack/docker
docker compose up --detach
docker compose logs --follow
```

`compose.yaml`، Zebra، lightwalletd و [Watchtower](https://containrrr.dev/watchtower/) را روی x86 اجرا می‌کند؛ `compose.arm.yaml` همین کار را روی میزبان‌های ARM انجام می‌دهد. Watchtower تصاویر جدید را به‌طور خودکار دریافت می‌کند و فایل پیش‌فرض از برچسب `zfnd/zebra:latest` استفاده می‌کند؛ در نتیجه نود بدون ارتقای دستی از نسخه‌های جدید Zebra پیروی می‌کند. `compose.zaino.yaml`، lightwalletd را با Zaino جایگزین می‌کند، اما یک تصویر قدیمی کامیونیتی را ثابت نگه می‌دارد (`emersonian/zcash-zaino:0.1.2-zr4`)، پس پیش از استفاده آن را بررسی کنید. فایل‌های دیگر، یک رابط جلویی Caddy با TLS، یک پروکسی VPS و یک تونل autossh برای نودهای خانگی اضافه می‌کنند.

`LIGHTWALLETD_DONATION_ADDRESS` را در فایل `.env` روی آدرس یکپارچه خودتان تنظیم کنید تا به‌عنوان آدرس اهدای سرور منتشر شود. اجرای `./download-snapshot.sh` از پوشه `docker/` پیش از نخستین `docker compose up`، به‌جای همگام‌سازی از ابتدا، یک snapshot زنجیره را دانلود می‌کند.

## اتصال و پایش

جلسه دوم کارگاه روش‌های در دسترس قرار دادن سرور را پوشش می‌دهد: استفاده از IP ثابت عمومی، پنهان‌کردن IP خانه پشت یک تونل SSH به VPS یا Tailscale Funnel، یا راه‌اندازی سروری که فقط از طریق Tor قابل دسترسی باشد. نتیجه را با تنظیم یک کیف‌پول برای اتصال به آن آزمایش کنید (در ZODL، بخش Advanced Settings؛ [تغییر سرور در کیف‌پول](/zcash-tech/lightwallet-nodes) را ببینید) یا با یک کلاینت gRPC، `GetLightdInfo` را فراخوانی کنید.

در بخش پایش، جلسه سوم فرمان‌های دستی Docker را فهرست می‌کند و پیشنهاد می‌دهد سرور عمومی را در [hosh](https://hosh.zec.rocks/zec)، مانیتور دسترس‌پذیری zec.rocks، ثبت کنید. ثبت سرور با ارسال یک pull request انجام می‌شود که نام میزبان و درگاه شما را به فهرست سرورهای hosh اضافه می‌کند. برای کمک در هر مرحله، به [zec.rocksانجمن کارگاه‌ها](https://workshops.zec.rocks) مراجعه کنید.

## اشتباه‌های رایج

**نصب lightwalletd بدون نود زنجیره.** lightwalletd از Zebra (یا Zakura) می‌خواند. یکی از آن‌ها را فعال کنید یا کار را با یک فایل نمونه که این کار را انجام می‌دهد شروع کنید.

**نگه‌داشتن اعتبارنامه‌های RPC نمونه.** فایل‌های نمونه از مقادیر جایگزین استفاده می‌کنند. RPC داخل کلاستر می‌ماند، اما به‌هرحال این مقادیر را تغییر دهید.

**اجرای نود زنجیره با سهمیه دیسک پیش‌فرض GKE.** حجم متصل نمی‌شود. پیش از نصب، سهمیه منطقه‌ای را افزایش دهید.

**افزایش تعداد Zebra برای توزیع بار.** هر replica از Zebra یک همگام‌سازی کامل دیگر است. به‌جای آن، lightwalletd یا Zaino را افزایش دهید.

**ثابت نگه‌داشتن chart قدیمی هنگام ارتقای شبکه.** نودی که نسخه‌اش قدیمی‌تر از ارتقا باشد، پس از آن دیگر Mainnet را دنبال نمی‌کند (از زمان NU7، Zebra به نسخه 7.0.0 یا جدیدتر نیاز دارد). `helm repo update` را اجرا کنید و پیش از ارتفاع‌های فعال‌سازی و ارتفاع‌های پایان پشتیبانی Zakura، chart را ارتقا دهید.

## صفحه‌های مرتبط

- [Zcash نودهای Lightwallet](/zcash-tech/lightwallet-nodes): سرور کیف‌پول سبک چه چیزهایی را می‌تواند و نمی‌تواند ببیند و سرورهای عمومی.
- [Zebra فول‌نود](/zcash-tech/zebra-full-node): اعتبارسنجی که این پشته اجرا می‌کند.
- [Zakura نود](/zcash-tech/zakura-node): انشعاب Zebra که chart می‌تواند به‌جای آن اجرا کند.
- [Zaino](/zcash-tech/zaino): نمایه‌ساز Rust.
- [zecd](/zcash-tech/zecd): سرور کیف‌پولی که chart می‌تواند اضافه کند.
- [Zcash RPC و نمایه‌سازی نود](/guides/zcash-node-rpc-and-indexing): RPC مربوط به Zebra، Zallet و نمایه‌سازها.
- [اجرای Zebra روی شبکه Akash](/guides/akash-network-zebra): روش دیگری برای میزبانی یک نود.

## منابع

- [zecrocks/zcash-stack](https://github.com/zecrocks/zcash-stack) (مخزن، نسخه‌ها و نمونه‌ها)
- [Zcash Stack README مربوط به Helm chart](https://github.com/zecrocks/zcash-stack/blob/main/charts/zcash-stack/README.md)
- [یادداشت‌های کارگاه: همگام‌سازی، اتصال، مشاهده](https://github.com/zecrocks/zcash-stack/tree/main/docs)
- [Docker README](https://github.com/zecrocks/zcash-stack/blob/main/docker/README.md)
- [فهرست Artifact Hub](https://artifacthub.io/packages/search?repo=zcash)
- [hosh.zec.rocks](https://hosh.zec.rocks/zec) (مانیتور سرورهای عمومی)

**آخرین به‌روزرسانی:** نوامبر 2026 (chart 0.4.9)
