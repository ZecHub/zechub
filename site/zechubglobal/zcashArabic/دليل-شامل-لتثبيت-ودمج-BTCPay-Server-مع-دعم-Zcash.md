### مقدمة

يتيح **BTCPay Server** للشركات عبر الإنترنت قبول المدفوعات بالعملات المشفرة مباشرة، بدون وسطاء أو مؤسسات مالية. يدعم النظام دفع **Zcash المحمي (Shielded ZEC)**، مما يضمن خصوصية المعاملات لكل من البائع والمشتري.

### لماذا استخدام BTCPay Server مع Zcash؟

*   **الخصوصية:** العملاء لا يحتاجون لكشف بياناتهم المالية، والبائع لا يكشف عن حجم مبيعاته أو هيكل المعاملات.
*   **التحكم الكامل:** الأموال تذهب مباشرة إلى محفظة البائع، ولا يحتفظ السيرفر بالمفاتيح الخاصة.
*   **أتمتة سلسة:** كل شيء يعمل تلقائيًا كما هو الحال مع عملات أخرى، لكن بدون مخاطر تسرب البيانات.

**مثال عملي:**

*   الدفع باستخدام BTC أو USDT: المعاملة تصبح عامة على البلوكشين، ويمكن لأي شخص تتبعها وربطها بالعميل.
*   الدفع باستخدام ZEC (Shielded): يتم استخدام **عنوان محمي (Shielded Address)**، ولا تظهر أي بيانات على البلوكشين. يكتشف BTCPay الدفع ويكمل العملية دون كشف أي معلومات للمراقبين الخارجيين.

### كيفية عمل BTCPay Server مع Zcash

1.  العميل يضع طلبًا على موقعك (WooCommerce, Magento, إلخ).
2.  المتجر يطلب فاتورة من BTCPay Server، والذي يولد:

*   المبلغ المطلوب
*   عداد زمني للفاتورة
*   **عنوان موحد Zcash (Unified Address)** يشمل مستقبل Orchard (محمي) بشكل افتراضي.

1.  العميل يدفع المبلغ إلى العنوان الموحد.
2.  BTCPay يراقب البلوكشين ويتأكد من:

*   صحة المبلغ
*   العنوان المستقبل
*   توقيت الفاتورة

1.  بعد التأكيد، يرسل BTCPay إشعارًا للمتجر ويؤكد الدفع للعميل.

> جميع المعاملات تتم دون أي وسيط، والسيرفر لا يحتفظ بالأموال، فقط يربط النظام بالبلوكشين بشكل آمن.

### مكان تخزين الأموال ومن يتحكم بالمفاتيح؟

*   BTCPay Server **ليس محفظة** ولا يحتاج للمفاتيح الخاصة.
*   كل الأموال تذهب مباشرة إلى محفظة البائع.
*   يتم استخدام **Viewing Key** للوصول للمدفوعات الواردة فقط، دون القدرة على صرف الأموال.

**المحافظ المدعومة:**

*   YWallet
*   Zingo! Wallet
*   قائمة أوسع: [ZecHub - Wallets](https://zechub.wiki/wallets)

### إعداد BTCPay Server لدعم Zcash

#### 1\. التحضير على VPS

*   نظام Ubuntu 22.04+
*   اسم نطاق موجه إلى IP السيرفر
*   تثبيت git وdocker وdocker-compose
*   وصول SSH للسيرفر

#### 2\. تثبيت BTCPay Server

  

mkdir BTCPayServer
cd BTCPayServer
git clone https://github.com/btcpayserver/btcpayserver-docker
cd btcpayserver-docker

*   إعداد المتغيرات البيئية:

  

export BTCPAY\_HOST="btcpay.example.com"
export NBITCOIN\_NETWORK="mainnet"
export BTCPAYGEN\_CRYPTO1="btc"
export BTCPAYGEN\_CRYPTO2="zec"
export BTCPAYGEN\_REVERSEPROXY="nginx"
export BTCPAYGEN\_LIGHTNING="none"

*   تشغيل السكريبت:

  

. ./btcpay-setup.sh -i

> عند إضافة Zcash لمثيل موجود بالفعل، استخدم `btcpay-down.sh` ثم أعد تشغيل السكريبت.

### تشغيل عقدة Zcash كاملة (Zebra + Lightwalletd)

1.  **مساحة التخزين:**

*   قاعدة بيانات Zebra: ~260-270 GB
*   Lightwalletd: ~15-20 GB
*   إجمالي مستحسن: 400-800+ GB

1.  إضافة متغيرات البيئة:

export BTCPAYGEN\_EXCLUDE\_FRAGMENTS="zcash"
export BTCPAYGEN\_ADDITIONAL\_FRAGMENTS="zcash-fullnode"

1.  إعادة تشغيل السكريبت لتثبيت العقدة الكاملة.

### الاتصال بعقدة Lightwalletd خارجية

*   العنوان الافتراضي: `https://zec.rocks:443`
*   يمكن توصيل أي عقدة خارجية باستخدام **fragment مخصص**:

\# zcash-lightwalletd.custom.yml
exclusive:
- zcash

*   إضافة المتغيرات البيئية وإعادة تشغيل السكريبت.

### استضافة BTCPay Server في المنزل باستخدام Cloudflare Tunnel

*   يسمح بالوصول الآمن للإنترنت بدون كشف IP حقيقي.
*   خطوات أساسية:

1.  تثبيت Cloudflared وتسجيل الدخول.
2.  إنشاء نفق (Tunnel) وتكوين `config.yml`.
3.  إضافة سجل CNAME في DNS.
4.  تفعيل الخدمة على بدء التشغيل.

### تكوين إضافة Zcash في واجهة BTCPay Server

1.  تسجيل الدخول إلى: `https://btcpay.example.com`
2.  تثبيت إضافة Zcash عبر: **Plugins -> Browse Plugins -> Install**
3.  ربط المحفظة باستخدام **Unified Full Viewing Key (UFVK)**
4.  إدخال رقم البلوك الحالي لتسريع المسح الأولي (للمحافظ الجديدة).

> كل فاتورة تحصل على عنوان محمي فريد، وتتم إدارة المدفوعات بشكل آمن دون إعادة استخدام العناوين.

### اختبار تدفق الدفع

*   إنشاء فاتورة اختبارية.
*   إرسال مبلغ ZEC من محفظة أخرى.
*   التأكد من تغيير حالة الفاتورة إلى **Paid**.

### دمج BTCPay Server مع موقعك

**خيارات الدمج:**

1.  **API:** للمواقع المخصصة، التحكم الكامل بالإنشاء، التتبع، والإشعارات.
2.  **CMS Plugins:** مثل WooCommerce، PrestaShop، بدون الحاجة للبرمجة.
3.  **زر الدفع أو Iframe:** للصفحات الثابتة، المدونات، أو الصفحات الشخصية.

**مثال زر دفع HTML:**

  

<a href="https://btcpay.example.com/i/abc123" target="\_blank">
  Pay with ZEC
</a>

**مثال Iframe:**

  

<iframe src="https://btcpay.example.com/i/abc123" width="600" height="350" frameborder="0"></iframe>

### إنشاء مفتاح API

1.  الذهاب إلى **API Keys** -> **Create a new API key**
2.  تحديد الأذونات: إنشاء فاتورة، عرض فاتورة، (اختياري) تعديل إعدادات المتجر
3.  نسخ المفتاح وحفظه بأمان.

> يستخدم لإنشاء فواتير عبر Greenfield API ومزامنة المدفوعات.

### الخلاصة

*   BTCPay Server + Zcash = مدفوعات خاصة، مباشرة، وآمنة.
*   يدعم إعدادات متقدمة، دمج متعدد للمتاجر، أدوار المستخدمين، وقواعد ضرائب وخصومات.
*   مناسب للشركات الصغيرة والكبيرة، سواء على VPS أو استضافة منزلية باستخدام Cloudflare Tunnel.

**الموارد المهمة:**

*   [BTCPay Server Official](https://btcpayserver.org/)
*   [Zcash Plugin GitHub](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
*   [ZecHub Wallets](https://zechub.wiki/wallets)
*   [Greenfield API Docs](https://docs.btcpayserver.org/API/Greenfield/v1/)