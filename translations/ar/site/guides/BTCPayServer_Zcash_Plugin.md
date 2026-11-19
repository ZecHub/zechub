# BTCPay Server مع دعم Zcash: دليل التثبيت والتكامل الكامل

يتيح BTCPay Server للشركات العاملة عبر الإنترنت قبول مدفوعات (payment) العملات المشفرة مباشرةً، دون وسطاء أو أمناء حفظ. يرشدك هذا الدليل خطوة بخطوة خلال العملية الكاملة لإعداد BTCPay Server مع دعم أصلي لمدفوعات Zcash المحمية (shielded).

> تركز هذه الوثائق على دمج Zcash في نسخة BTCPay Server الخاصة بك.  
> وهي تدعم كلاً من **العقدة الكاملة (full node) (Zebra)** و**الإعدادات القائمة على lightwalletd**.

---

## جدول المحتويات

- [لماذا تستخدم BTCPay Server مع Zcash](#why-use-btcpay-server-with-zcash)
- [كيف يعمل BTCPay Server](#how-btcpay-server-works)
- [أين تُخزَّن الأموال؟ ومن يتحكم في المفاتيح الخاصة؟](#where-are-funds-stored-who-controls-the-private-keys)
- [كيفية إعداد BTCPay Server لقبول Zcash](#how-to-set-up-btcpay-server-for-accepting-zcash)
  - [نشر BTCPay Server مع دعم Zcash](#deploying-btcpay-server-with-zcash-support)
  - [تشغيل عقدة Zcash كاملة خاصة بك (Zebra + lightwalletd)](#running-your-own-zcash-full-node)
  - [الاتصال بعقدة lightwalletd خارجية (إعداد مخصص)](#connecting-to-an-external-lightwalletd-node)
  - [استضافة BTCPay Server في المنزل باستخدام Cloudflare Tunnel](#hosting-btcpay-server-at-home-with-cloudflare-tunnel)
- [تهيئة إضافة Zcash في واجهة BTCPay Server على الويب](#configuring-the-zcash-plugin-in-the-btcpay-server-web-interface)
- [دمج BTCPay Server مع موقعك الإلكتروني](#integrating-btcpay-server-with-your-website)
  - [التكامل عبر API](#api-integration)
    - [إنشاء مفتاح API](#generating-an-api-key)
    - [مثال: إنشاء فاتورة عبر API](#example-creating-an-invoice-via-api)
    - [إعداد Webhook](#setting-up-a-webhook-optional)
  - [التكامل مع أنظمة CMS](#cms-integration)
  - [زر الدفع أو Iframe](#payment-button-or-iframe-no-cms-or-api-needed)
- [الخاتمة](#conclusion)
- [الموارد](#resources)


---

## لماذا تستخدم BTCPay Server مع Zcash

تقبل التجارة الإلكترونية العملات المشفرة بشكل متزايد. فهي سريعة وعالمية وتعمل دون الحاجة إلى البنوك. وهذا يفيد التجار والعملاء على حد سواء. لكن هناك تفصيلًا مهمًا يغفل عنه كثيرون.

عند تقديم طلب، يقدم العميل عادةً معلومات شخصية: الاسم وعنوان الشحن ورقم الهاتف. وإذا تم الدفع باستخدام سلسلة كتل (blockchain) عامة - مثل Bitcoin أو Ethereum أو العملات المستقرة على Ethereum أو Tron - تصبح المعاملة (transaction) مرئية بشكل دائم وقابلة للتحليل.

يستطيع أي شخص، حتى دون أن يعرف ما الذي تم طلبه، أن:

- يرى متى تم الدفع وكم كان المبلغ  
- يتتبع مصدر الأموال ووجهتها  
- يربط عنوان (address) عملة مشفرة بشخص حقيقي إذا وُجدت أي نقطة ارتباط (على سبيل المثال، بريد إلكتروني مسرّب أو اسم الشحن)

وهذا يعني أن عملية شراء واحدة قد تكشف التاريخ المالي الكامل للعميل.

والأمر نفسه ينطبق في الاتجاه المعاكس. فإذا ظهر عنوان التاجر على السلسلة (on-chain) ولو مرة واحدة، يصبح مكشوفًا. إذ يمكن للمنافسين والمراقبين من أطراف ثالثة تتبع أحجام المدفوعات ونشاط الموردين وبنية التدفقات التجارية.

### يمكن للجمع بين BTCPay Server وZcash حل هذه المشكلة.


BTCPay Server نظام مجاني ولامركزي (decentralized) لتلقي مدفوعات العملات المشفرة.  
وهو ليس وسيط دفع ولا يحتفظ بأي أموال. فجميع المدفوعات تذهب مباشرةً إلى محفظة (wallet) التاجر.  
ويمكن أن تكون هذه محفظة شخصية أو إعدادًا متعدد التوقيعات داخل مؤسسة.

يتولى الخادم مهام التنسيق:

- ينشئ عنوانًا فريدًا لكل طلب  
- يتتبع وقت استلام الدفعة ويربطها بالطلب  
- يصدر الإيصالات والإشعارات  
- يوفر واجهة دفع للعميل  

ويعمل كل ذلك تحت سيطرة صاحب المتجر، دون الاعتماد على خدمات أطراف ثالثة.

Zcash عملة مشفرة مبنية على إثباتات (proof) المعرفة الصفرية (zero-knowledge). وهي تدعم نموذج معاملات خاصًا بالكامل.  
وعند استخدام العناوين المحمية (والتي سنسميها فيما يلي «العناوين» ببساطة)، لا يُكشف المرسل ولا المستلم ولا مبلغ المعاملة على سلسلة الكتل.

بالنسبة للمتاجر الإلكترونية، يعني هذا ما يلي:

- يمكن للمشتري إتمام الدفع دون الكشف عن تاريخه المالي  
- يتلقى البائع الدفعة دون كشف عنوانه أو حجم مبيعاته أو بنية معاملاته  
- لا يستطيع أي مراقب خارجي ربط الدفعة بالطلب أو ببيانات العميل

### مثال عملي

يقدم مستخدم طلبًا ويختار Bitcoin أو USDT كطريقة للدفع.  
ينشئ الموقع عنوان دفع ويعرض المبلغ.  
بعد إتمام الدفع، يُخزَّن هذا العنوان على سلسلة الكتل ويصبح علنيًا.  
ولا يحتاج المهاجم إلا إلى ربط طلب واحد بالعنوان ليحصل على رؤية طويلة الأمد لتاريخ معاملاته بالكامل.

تخيّل الآن الموقف نفسه مع Zcash.  
ينشئ BTCPay Server عنوانًا محميًا. يرسل المشتري الدفعة.  
ومن منظور سلسلة الكتل، لا يحدث شيء. فلا توجد بيانات عامة لتحليلها.  
يتلقى الخادم التأكيد، ويربطه بالطلب، ويُكمل العملية.

بالنسبة لأي شخص من الخارج، يبدو الأمر وكأن شيئًا لم يحدث.  
وتبقى كل التفاصيل بين المتجر والعميل - كما ينبغي أن تكون.

ولا يضحّي هذا الحل بالأتمتة أو سهولة الاستخدام.  
فكل شيء يعمل كما هو الحال مع العملات المشفرة الأخرى، ولكن دون خطر تسرب البيانات.



## كيف يعمل BTCPay Server

يعمل BTCPay Server كجسر (bridge) لمعالجة المدفوعات بين منصة التجارة الإلكترونية الخاصة بك وسلسلة الكتل. وإليك كيف يسير التدفق:

1. **يقدم العميل طلبًا** على موقعك الإلكتروني (مثل WooCommerce أو Magento أو أي منصة تتكامل مع BTCPay).

2. **يطلب المتجر فاتورة دفع** من BTCPay Server. ينشئ الخادم فاتورة فريدة تتضمن:
   - مبلغ الطلب
   - مؤقتًا للعد التنازلي
   - عنوان Zcash الموحد (UA) - مثل `u1...` - والذي يتضمن افتراضيًا مستقبِلًا لـ Orchard (محميًا).

3. **يرى العميل صفحة الدفع** ويرسل ZEC إلى العنوان المقدَّم.

4. **يراقب BTCPay Server سلسلة الكتل**، ويتحقق من الدفعة مقابل:
   - المبلغ المتوقع
   - عنوان الاستلام
   - الطابع الزمني للفاتورة

5. **بمجرد اكتشاف المعاملة وتأكيدها**، يُخطر BTCPay المتجر.

6. **يتلقى العميل تأكيدًا بالدفع.** ويمكن للخادم اختياريًا إرسال إيصال عبر البريد الإلكتروني.

تتم هذه العملية بأكملها **تلقائيًا**، دون وسطاء أو أمناء حفظ.  
لا **يحتفظ** BTCPay Server **بأي أموال** - بل يربط نظام الطلبات بسلسلة الكتل بشكل آمن وخاص.
## أين تُخزَّن الأموال؟ ومن يتحكم في المفاتيح الخاصة؟

BTCPay Server **ليس** محفظة و**لا يتطلب مفاتيح خاصة**.  
فجميع الأموال تذهب **مباشرةً** إلى محفظة التاجر. ويُضمن الأمان من خلال استخدام **بنية قائمة على مفتاح العرض (viewing key)**.

### كيف يعمل

- **تُنشأ المحفظة مسبقًا.**  
  يستخدم التاجر محفظة Zcash تدعم مفاتيح العرض - مثل [Zkool](https://github.com/hhanh00/zkool2/) أو [Zingo! Wallet](https://zingolabs.org/).  
  تتوفر قائمة كاملة على [ZecHub.wiki](https://zechub.wiki/wallets).

- **يتصل BTCPay Server عبر مفتاح العرض.**  
  مفتاح العرض هو **مفتاح للقراءة فقط**: يمكنه اكتشاف المدفوعات الواردة وإنشاء عناوين استلام جديدة،  
  لكنه لا يستطيع إنفاق الأموال. ولا يخزّن الخادم عبارات البذور (seed phrase) أو المفاتيح الخاصة.

- **يتم الوصول إلى بيانات سلسلة الكتل عبر خادم `lightwalletd`.**  
  يمكنك استخدام عقدة (node) عامة مثل `https://zec.rocks`، أو تشغيل حزمة `Zebra + lightwalletd` الخاصة بك لتحقيق سيادة كاملة.

- **يحصل كل طلب على عنوان فريد.**  
  تتيح مفاتيح العرض للخادم اشتقاق عناوين Zcash محمية جديدة لكل فاتورة،  
  مما يتيح تتبعًا آمنًا للمدفوعات ويمنع إعادة استخدام العناوين.

- **تحتفظ بالسيطرة الكاملة على الأموال.**  
  حتى لو تعرض الخادم للاختراق، لا يستطيع أحد سرقة أموالك - بل قد تُكشف البيانات الوصفية للمدفوعات فقط.

يفصل هذا التصميم **البنية التحتية** عن **التحكم في الأصول**.  
يمكنك تحديث BTCPay Server أو ترحيله أو إعادة تثبيته دون تعريض أي أموال للخطر.

## كيفية إعداد BTCPay Server لقبول Zcash

شرحنا في الأقسام السابقة كيف يعمل BTCPay Server مع Zcash ولماذا يهم ذلك للمدفوعات التي تحافظ على الخصوصية (privacy). والآن حان وقت التطبيق العملي.

يعتمد إعدادك الدقيق على عدة عوامل:

- هل لديك بالفعل نسخة من BTCPay Server؟
- هل تريد استخدام lightwalletd عام أم تشغيل عقدتك الكاملة الخاصة؟
- هل سيعمل الخادم على VPS أم في المنزل؟

يغطي هذا الفصل جميع سيناريوهات التهيئة الحالية - من الإعدادات البسيطة إلى عمليات النشر ذات السيادة الكاملة.

سنتناول ما يلي:

- كيفية نشر كل شيء من الصفر على VPS، بما في ذلك العقدة الكاملة (Zebra)
- كيفية تشغيل BTCPay Server في المنزل مع إخفاء عنوان IP الخاص بك باستخدام **Cloudflare Tunnel**
- كيفية تفعيل دعم Zcash وتهيئته داخل واجهة BTCPay Server على الويب
- كيفية دمج BTCPay مع موقعك الإلكتروني أو متجرك على الإنترنت


## نشر BTCPay Server مع دعم Zcash

لننتقل إلى الإعداد الفعلي. في هذا القسم، سنثبّت BTCPay Server مع دعم Zcash - إما على VPS جديد أو بإضافة دعم ZEC إلى نسخة موجودة.

إذا كان BTCPay Server يعمل لديك بالفعل (مثلًا لـ BTC أو Lightning)، فلا حاجة إلى إعادة تثبيت كل شيء - فقط فعّل إضافة ZEC.

سنستعرض تهيئات متنوعة، من الإعدادات البسيطة التي تستخدم عقدة `lightwalletd` عامة إلى عمليات التثبيت ذات السيادة الكاملة مع عقدتك الكاملة الخاصة.  
ويعتمد الخيار الأفضل على موقع خادمك ومدى الاستقلالية التي تريدها عن البنية التحتية الخارجية.

> الوثائق الرسمية للإضافة:  
> [https://github.com/btcpay-zcash/btcpayserver-zcash-plugin](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
>
> **تحذير - محفظة واحدة لكل نسخة:**  
> تستخدم إضافة Zcash **محفظة واحدة مشتركة** عبر **جميع المتاجر** في نسخة BTCPay.  
> إذا كنت تستضيف عدة متاجر مستقلة على نسخة واحدة، فستتشارك محفظة Zcash نفسها.  
> استخدم نسخًا منفصلة إذا كنت بحاجة إلى عزل صارم للمحافظ.

---

### تهيئة VPS الموصى بها

قبل التثبيت، تأكد من توفر ما يلي لديك:

- VPS يعمل بنظام **Ubuntu 22.04+**
- اسم نطاق يشير إلى عنوان IP الخاص بخادمك (عبر DNS)
- تثبيت `git` و`docker` و`docker-compose`
- وصول SSH إلى الخادم

---

## تجهيز خادمك (جزء مخفي)

<details>
  <summary>انقر للتوسيع</summary>

لنشر BTCPay Server مع دعم Zcash، ستحتاج إلى ما يلي:

### 1. VPS يعمل بنظام Ubuntu 22.04 أو أحدث

نوصي باستخدام تثبيت بسيط من **Ubuntu Server 22.04 LTS**.  
وسيصلح أي مزود VPS يوفر عنوان IP مخصصًا.  

**الحد الأدنى من المتطلبات**:  
- 2 من أنوية المعالج  
- 4 GB من ذاكرة RAM  
- 40 GB من مساحة القرص  

يكفي هذا الإعداد إذا كنت تستخدم lightwalletd لـ Zcash.  
أما إذا كنت تخطط لتشغيل **عقدة Zcash كاملة**، فستحتاج إلى **300 GB على الأقل** من مساحة القرص الفارغة.

---

### 2. اسم نطاق يشير إلى خادمك

في لوحة معلومات (dashboard) مزود DNS الخاص بك، أنشئ سجل `A` لنطاق فرعي  
(مثل `btcpay.example.com`) يشير إلى عنوان IP الخاص بـ VPS لديك.  

سيُستخدم هذا النطاق للوصول إلى BTCPay Server من المتصفح  
ولإنشاء **شهادة SSL مجانية** تلقائيًا عبر Let's Encrypt.

---

### 3. وصول SSH إلى الخادم

لتثبيت BTCPay Server، يجب أن تتصل بـ VPS الخاص بك عبر SSH.  
من الطرفية، نفّذ:

`ssh root@YOUR_SERVER_IP`

إذا كنت تستخدم macOS أو Linux أو WSL على Windows، فإن SSH متاح بالفعل في الطرفية.
أما على Windows العادي، فاستخدم عميل SSH مثل **PuTTY**.

---

### 4. تثبيت Git وDocker وDocker Compose

بعد الاتصال عبر SSH، حدّث حزم نظامك وثبّت المكونات المطلوبة:

```
sudo apt update && sudo apt upgrade -y
sudo apt install git curl docker.io docker-compose-plugin -y
sudo systemctl enable docker
```

> على Ubuntu 22.04 والإصدارات الأحدث، أصبح `docker-compose` من APT مهجورًا.
> الحزمة الموصى بها هي `docker-compose-plugin`، والتي توفر الأمر `docker compose` (لاحظ وجود مسافة بدلًا من الشرطة).

أصبحت بيئة خادمك الآن جاهزة لتثبيت BTCPay Server.

</details>

---

### الخطوة 1: استنساخ المستودع

أنشئ مجلد عمل ونزّل حزمة نشر BTCPay Server Docker:

```
mkdir BTCPayServer
cd BTCPayServer
git clone https://github.com/btcpayserver/btcpayserver-docker
cd btcpayserver-docker
```

---

### الخطوة 2: تصدير متغيرات البيئة

استبدل `btcpay.example.com` بنطاقك الفعلي:

```
export BTCPAY_HOST="btcpay.example.com"
export NBITCOIN_NETWORK="mainnet"
export BTCPAYGEN_CRYPTO1="btc"
export BTCPAYGEN_CRYPTO2="zec"
export BTCPAYGEN_REVERSEPROXY="nginx"
export BTCPAYGEN_LIGHTNING="none"
```

> إذا كنت تخطط لإضافة Monero أو Litecoin لاحقًا، فيمكنك تضمينهما الآن:

```
export BTCPAYGEN_CRYPTO3="ltc"
export BTCPAYGEN_CRYPTO4="xmr"
```

يمكنك إضافة عملات جديدة في أي وقت عن طريق تصدير المتغيرات المناسبة وإعادة تشغيل سكربت الإعداد:

`. ./btcpay-setup.sh -i`

في هذا الدليل، سنركز على **Zcash فقط**.

---

### الخطوة 3: تشغيل المثبّت

شغّل سكربت الإعداد لبناء الخادم وتشغيله:

`. ./btcpay-setup.sh -i`

سيقوم السكربت بتثبيت التبعيات، وإنشاء `docker-compose.yml`، وتشغيل الخدمات، وتهيئة `systemd`.
ويستغرق ذلك نحو 5 دقائق.

بعد الانتهاء، ستكون نسخة BTCPay Server الخاصة بك متاحة على:

`https://btcpay.example.com`

> إذا كنت تعدّل تثبيتًا موجودًا (مثل إضافة ZEC)، فتأكد من إيقاف الخادم وإعادة تشغيله بالإعدادات الجديدة:

```
cd ~/BTCPayServer/btcpayserver-docker
btcpay-down.sh
. ./btcpay-setup.sh -i
```

ثم انتقل إلى القسم التالي لتهيئة Zcash في واجهة BTCPay Server على الويب.

## تشغيل عقدة كاملة خاصة بك من Zcash

إذا كنت تفضّل **عدم** الاعتماد على عقد (node) `lightwalletd` العامة، يمكنك نشر عقدة كاملة خاصة بك من Zcash إلى جانب lightwalletd على الخادم نفسه.  
يمنحك هذا **استقلالية كاملة** - دون تبعيات خارجية، ودون الحاجة إلى الثقة بأي طرف.

---

### الخطوة 1: تأكد من توفر مساحة كافية على القرص

تتطلب عقدة Zcash الكاملة (Zebra + lightwalletd) حاليًا مساحة **300+ GB** على القرص، وهي مستمرة في الازدياد.

التفصيل:

- قاعدة بيانات سلسلة الكتل (blockchain) الخاصة بـ Zebra: ~260-270 GB
- فهرسة lightwalletd: ~15-20 GB

#### التخزين الموصى به:

- **400 GB+** إذا كان الخادم يُستخدم **فقط** لمدفوعات (payment) Zcash
- **800 GB+** إذا كان الخادم يشغّل أيضًا BTCPay Server و PostgreSQL و Nginx وغيرها.

> يُفضَّل استخدام قرص SSD/NVMe **بسعة 1 TB**، خاصةً إذا كنت لا تخطط لتقليم البيانات بانتظام.

---

### الخطوة 2: تعيين متغيرات البيئة

أضف ما يلي إلى إعدادات البيئة لديك لتفعيل تكوين العقدة الكاملة:

```
export BTCPAYGEN_EXCLUDE_FRAGMENTS="zcash"
export BTCPAYGEN_ADDITIONAL_FRAGMENTS="zcash-fullnode"
```

سيؤدي هذا إلى تضمين الجزء `zcash-fullnode`، الذي يشغّل كلًّا من `zebrad` و `lightwalletd` داخل BTCPay Server.

---

### الخطوة 3: إعادة تشغيل المثبّت

`. ./btcpay-setup.sh -i`

سيقوم البرنامج النصي بما يلي:

* تنزيل صور Docker الخاصة بـ Zebra و lightwalletd
* إعداد الخدمات داخل حزمة BTCPay
* ربط الإضافة Zcash بنسخة `lightwalletd` **المحلية**

> **قد تستغرق المزامنة الكاملة لسلسلة الكتل عدة أيام**، خاصةً على خوادم VPS ذات الموارد المحدودة.
> لن تكون المدفوعات المحمية (shielded) متاحة حتى تكتمل المزامنة.


## الاتصال بعقدة lightwalletd خارجية

في معظم الحالات، لا تكون الاستقلالية الكاملة ضرورية - وقد لا يرغب التجار في إنفاق الوقت ومساحة القرص على تشغيل عقدة Zcash كاملة.  
افتراضيًا، يتصل BTCPay Server بعقدة `lightwalletd` عامة لمعالجة المدفوعات المحمية دون تنزيل سلسلة الكتل بأكملها.

نقطة النهاية الافتراضية هي:

`https://zec.rocks:443`

ومع ذلك، يمكنك تكوين BTCPay Server للاتصال **بأي عقدة `lightwalletd` خارجية**، مثل:

`https://lightwalletd.example:443`

يوضح هذا القسم كيفية القيام بذلك باستخدام **جزء Docker مخصص**.

> يتوفر مثال تكوين كامل مع جميع متغيرات البيئة في [مستودع الإضافة](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/zcash-lightwalletd.custom.yml).  
> توضح الخطوات أدناه إعدادًا أدنى يعمل.

---

### الخطوة 1: إنشاء جزء Docker مخصص

في مجلد مشروع BTCPayServer، أنشئ ملف جزء مخصصًا:

```
cd ~/BTCPayServer/btcpayserver-docker
mkdir -p docker-compose-generator/docker-fragments
nano docker-compose-generator/docker-fragments/zcash-lightwalletd.custom.yml
```

أضف المحتوى التالي:

```
exclusive:
- zcash
```

يضمن التوجيه `exclusive` أن يكون جزء واحد فقط بالتسمية نفسها (`zcash` في هذه الحالة) نشطًا في أي وقت.
يمنع هذا تعارضات التكوين - على سبيل المثال، لا يمكنك تشغيل الجزء `zcash-fullnode` وهذا الجزء الخارجي المخصص لـ `lightwalletd` في الوقت نفسه.
عند وسمه بـ `exclusive: zcash`، سيعطّل BTCPay Server تلقائيًا حاوية `zcash-fullnode` الافتراضية وحاوية `lightwalletd` الداخلية، مما يتيح لك الاتصال بعقدتك الخارجية الخاصة بدلًا من ذلك.

---

### الخطوة 2: تعيين متغيرات البيئة

في الطرفية:

```
export BTCPAYGEN_EXCLUDE_FRAGMENTS="$BTCPAYGEN_EXCLUDE_FRAGMENTS;zcash"
export BTCPAYGEN_ADDITIONAL_FRAGMENTS="$BTCPAYGEN_ADDITIONAL_FRAGMENTS;zcash-lightwalletd.custom"
```

---

### الخطوة 3: تحديد عنوان العقدة الخارجية

افتح ملف `.env`:

`nano .env`

أضف السطر التالي، مع استبدال URL بنقطة النهاية التي اخترتها:

`ZCASH_LIGHTWALLETD=https://lightwalletd.example:443`

يمكنك استخدام:

* **عقدة عامة**، مثل `https://zec.rocks:443`
* عقدتك الخاصة المستضافة ذاتيًا، المنشورة بشكل منفصل عن BTCPay Server

> إذا أصبح `lightwalletd` الخارجي غير متاح أو محمّلًا بشكل زائد، فستفشل المدفوعات المحمية.
> للخدمات الحرجة، اختر **نقطة نهاية مستقرة ومجرّبة** (مثل `zec.rocks` الافتراضية).

> هل تريد استضافة `lightwalletd` ذاتيًا؟
> يمكنك استخدام `docker-compose.lwd.yml` من مستودع [Zebra](https://github.com/ZcashFoundation/zebra/blob/main/docker/docker-compose.lwd.yml).
> **تحذير:** هذا الإعداد غير موثّق رسميًا ويتطلب إعداد TLS يدويًا، وإعادة توجيه المنافذ، وتكوين جدار الحماية - يُوصى به للمستخدمين المتقدمين فقط.

---

### الخطوة 4: إعادة تشغيل المثبّت

`. ./btcpay-setup.sh -i`

سيطبّق BTCPay Server تكوينك المخصص ويتصل بعقدة `lightwalletd` المحددة.

من الآن فصاعدًا، ستستخدم الإضافة Zcash نقطة النهاية الخارجية تلك لمعالجة المعاملات (transaction) المحمية.


## استضافة BTCPay Server في المنزل باستخدام Cloudflare Tunnel

هل تريد قبول مدفوعات Zcash أثناء استضافة BTCPay Server على جهاز منزلي - مثل Raspberry Pi 5 أو أي خادم محلي **دون عنوان IP ثابت**؟  
يمكنك كشف نسختك على الإنترنت بأمان باستخدام **Cloudflare Tunnel**.

تتجنب هذه الطريقة إعادة توجيه المنافذ وتخفي عنوان IP الحقيقي الخاص بك عن العامة - مع إبقاء خادمك متاحًا عبر HTTPS.

كما تساعدك على **تجنب تكلفة استئجار VPS**، وهو أمر مثالي إذا كانت مدفوعات العملات المشفرة ميزة اختيارية وليست جوهر عملك.

---

### الخطوة 1: تثبيت Cloudflare Tunnel

1. أنشئ حسابًا على [cloudflare.com](https://www.cloudflare.com) وأضف نطاقك.
2. على **خادمك المنزلي**، ثبّت Cloudflare Tunnel باستخدام مستودع الحزم الرسمي من Cloudflare:

```bash
sudo mkdir -p --mode=0755 /usr/share/keyrings
curl -fsSL https://pkg.cloudflare.com/cloudflare-main.gpg | sudo tee /usr/share/keyrings/cloudflare-main.gpg >/dev/null
echo "deb [signed-by=/usr/share/keyrings/cloudflare-main.gpg] https://pkg.cloudflare.com/cloudflared any main" | sudo tee /etc/apt/sources.list.d/cloudflared.list
sudo apt update
sudo apt install cloudflared
```

إذا فشل `apt install cloudflared`، فثبّت `.deb` المطابق بدلًا من ذلك:

```bash
# Raspberry Pi / ARM64
curl -L --output cloudflared.deb https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-arm64.deb
sudo dpkg -i cloudflared.deb
```

```bash
# x86_64
curl -L --output cloudflared.deb https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
sudo dpkg -i cloudflared.deb
```

3. قم بالمصادقة مع Cloudflare:

`cloudflared tunnel login`

سيفتح هذا الأمر نافذة متصفح. سجّل الدخول وامنح الإذن بالوصول إلى نطاقك.
ستنشئ Cloudflare تلقائيًا ملف `credentials` يحتوي على رمز (token) على خادمك.

4. أنشئ نفقًا جديدًا (يمكنك تسميته `btcpay` أو أي اسم آخر):

`cloudflared tunnel create btcpay`

يُنشئ هذا ملف `btcpay.json` يحتوي على معرّف النفق وبيانات الاعتماد - ستحتاج إليه في الخطوة التالية.

---

### الخطوة 2: إنشاء ملف تكوين النفق

أنشئ مجلد التكوين (إن لم يكن موجودًا) وافتح ملف التكوين:

```
sudo mkdir -p /etc/cloudflared
sudo nano /etc/cloudflared/config.yml
```

الصق التكوين التالي:

```
tunnel: btcpay    # your tunnel name
credentials-file: /root/.cloudflared/btcpay.json

ingress:
  - hostname: btcpay.example.com      # your domain
    service: http://127.0.0.1:80
  - service: http_status:404
```

#### الشرح:

* `tunnel` - اسم النفق الذي أنشأته سابقًا
* `credentials-file` - مسار ملف الرمز الذي تم إنشاؤه أثناء `cloudflared tunnel login`
* `hostname` - نطاقك المسجّل لدى Cloudflare (مثل `btcpay.example.com`)
* `service` - العنوان المحلي لـ BTCPay Server (عادةً `http://127.0.0.1:80` لـ Nginx)

> ستمرّر Cloudflare حركة المرور بأمان إلى خادمك المحلي، دون كشف عنوان IP المنزلي الخاص بك.


### الخطوة 3: إضافة سجل DNS للنفق

بعد إنشاء النفق، ستضيف Cloudflare عادةً **سجل CNAME DNS تلقائيًا** لنطاقك. يجب أن يبدو هكذا:

`btcpay.example.com -> <UUID>.cfargotunnel.com`

إذا لم يظهر تلقائيًا، فأضفه يدويًا:

1. انتقل إلى [لوحة معلومات Cloudflare](https://dash.cloudflare.com/)
2. انتقل إلى قسم **DNS**
3. أضف سجل CNAME جديدًا:
   - **الاسم**: `btcpay`
   - **الهدف**: `<UUID>.cfargotunnel.com`  
     يمكنك العثور على القيمة الدقيقة في ملف `btcpay.json` أو بتشغيل:
     
     `cloudflared tunnel list`
     
   - **حالة الوكيل**: مفعّلة (السحابة البرتقالية)

> يضمن هذا السجل توجيه جميع الطلبات إلى `btcpay.example.com` عبر Cloudflare Tunnel، مما يخفي عنوان IP الحقيقي الخاص بك عن العامة.

---

### الخطوة 4: تفعيل النفق عند بدء تشغيل النظام

لجعل النفق يعمل تلقائيًا عند الإقلاع، ثبّته كخدمة نظام:

`sudo cloudflared service install`

ثم فعّل الخدمة وشغّلها:

```
sudo systemctl enable cloudflared
sudo systemctl start cloudflared
```

تحقق من الحالة:

`sudo systemctl status cloudflared`

يجب أن ترى رسالة مثل `Active: active (running)` وتأكيدًا بأن `btcpay.example.com` متصل.

> من الآن فصاعدًا، سيبدأ النفق تلقائيًا عند كل إعادة تشغيل، وسيكون BTCPay Server متاحًا للعامة - دون إعادة توجيه المنافذ ودون كشف عنوان IP الحقيقي الخاص بك.

---

### الخطوة 5: إتمام إعداد BTCPay Server

إذا كنت على وشك تثبيت BTCPay Server لأول مرة، فعيّن نطاقك قبل تشغيل برنامج الإعداد النصي:

`export BTCPAY_HOST="btcpay.example.com"`

يضمن هذا استخدام النطاق الصحيح عند إنشاء **تكوين Nginx** و**شهادات SSL**.

إذا كان BTCPay Server مثبتًا بالفعل وكنت تضيف النفق فقط:

```
cd ~/BTCPayServer/btcpayserver-docker
. ./btcpay-setup.sh -i
```

سيعيد الإعداد إنشاء ملفات التكوين ويطبّق النطاق الجديد.
يجب أن تتمكن الآن من الوصول إلى خادمك على:

`https://btcpay.example.com`

> سواء كنت تستخدم `lightwalletd` عامًا أو عقدتك الكاملة الخاصة، فإن هذا لا يؤثر على النفق.
> كل ما يهم هو أن يستمع BTCPay Server على `127.0.0.1:80` محليًا.


## تكوين الإضافة Zcash في واجهة الويب لـ BTCPay Server

> **مهم لإعدادات المتاجر المتعددة:**  
> محفظة (wallet) Zcash المكوّنة هنا **عامة** على مستوى النسخة. ستستخدم جميع المتاجر هذه المحفظة ما لم تشغّل نسخ BTCPay منفصلة.

بعد نشر نسخة BTCPay Server بنجاح، ستحتاج إلى إجراء بعض التكوينات الأساسية عبر واجهة الويب الإدارية.  
توفر الوثائق الرسمية تعليمات كاملة باللغة الإنجليزية - وهنا سنستعرض الخطوات الأساسية ونركّز تحديدًا على تكوين الإضافة Zcash.

---

### الخطوة 1: تسجيل الدخول إلى واجهة الويب

زر نسختك على:

`[https://btcpay.example.com](https://btcpay.example.com)`

- أدخل اسم المستخدم وكلمة المرور الخاصين بالمسؤول.
- إذا كانت هذه أول مرة تسجّل فيها الدخول، فسيُطلب منك إنشاء حساب.
- سيُمنح أول حساب تسجّله صلاحيات المسؤول تلقائيًا.

---

### الخطوة 2: تثبيت الإضافة Zcash

1. في القائمة الرئيسية، انتقل إلى:

`Plugins -> Browse Plugins`

2. ابحث عن الإضافة **Zcash (ZEC)**. استخدم شريط البحث إذا لزم الأمر.
3. انقر على **Install** وأكّد.

> كرّر هذه العملية لأي عملات بديلة أخرى فعّلتها أثناء تكوين الخادم.

بعد التثبيت، انقر على **Restart Server** لإعادة تحميل الواجهة مع الإضافات النشطة.


### الخطوة 3: ربط محفظتك عبر Viewing Key

بعد تثبيت الإضافة، سيظهر قسم **Zcash** جديد في قائمة الإعدادات.

1. انتقل إلى:

`Zcash -> Settings`

2. الصق **Full Viewing Key الموحّد (UFVK)** - سيشتق BTCPay عنوانًا موحّدًا (Unified Address) لكل فاتورة ويكتشف المدفوعات المحمية الواردة.

> **تنبيه:** مفاتيح العرض (viewing key) القديمة الخاصة بـ Sapling مدعومة، ولكن لاستخدام Orchard/العناوين الموحّدة يجب عليك تقديم **UFVK**.


   مثال على التنسيق:

`uview184syv9wftwngkay8d...`

3. أدخل قيمة في حقل ارتفاع الكتلة (block)

* **الإعداد لأول مرة مع محفظة جديدة (عبارة بذور (seed phrase) جديدة):** أدخل ارتفاع الكتلة الحالي لـ Zcash (يمكنك التحقق منه على 3xpl.com/zcash) - يُسرّع هذا الفحص الأولي.
* **الترحيل على الخادم نفسه من إعداد قديم يقتصر على Sapling إلى العناوين الموحّدة / Orchard:** اترك هذا الحقل فارغًا.
* **نقل متجرك إلى خادم جديد بالمحفظة/UFVK نفسها:** أدخل اختياريًا ارتفاع الميلاد - وهو ارتفاع تقريبي لأول طلب مدفوع في متجرك (طابِق تاريخ الطلب على 3xpl لتضييق نطاق الفحص). إذا لم تكن متأكدًا، فاتركه فارغًا.

> لا تدعم جميع المحافظ تصدير **Full Viewing Key الموحّد (UFVK)** حتى الآن.  
> الخيارات الموصى بها:  
> – [**Zkool**](https://github.com/hhanh00/zkool2/)  
> – [**محفظة Zingo! (الإصدار الخاص بالكمبيوتر)**](https://zingolabs.org/)  
> في كلا التطبيقين، ابحث عن تصدير UFVK في قسم النسخ الاحتياطي/التصدير.

تدعم هذه المفاتيح **التدوير التلقائي للعناوين**، مما يعني:
- يحصل كل عميل على عنوان دفع **فريد**
- ترى رصيدًا **واحدًا وموحّدًا**

يمكنك العثور على قائمة توافق أوسع على [ZecHub -> المحافظ](https://zechub.wiki/wallets).

بمجرد ملء جميع الحقول، انقر على **Save**.

---

### اختبار مسار الدفع عبر ZEC

تهانينا - محفظة Zcash الخاصة بك متصلة الآن بـ BTCPay Server.

لنُجرِ اختبارًا:

1. انتقل إلى:

`Invoices -> Create New`

2. أنشئ فاتورة تجريبية بمبلغ صغير بعملة ZEC.
3. أرسل الأموال من **محفظة مختلفة** (ليست المحفظة المتصلة بـ BTCPay).
4. بمجرد اكتشاف المعاملة، ستعرض صفحة الفاتورة احتفالًا مرئيًا.
5. تأكد من تغيّر حالة الفاتورة إلى **Paid**.

إذا كان كل شيء يعمل - فأنت جاهز لدمج مدفوعات ZEC في موقعك الإلكتروني باستخدام API أو إضافات CMS.



## دمج BTCPay Server مع موقعك الإلكتروني

بمجرد ربط محفظة Zcash بـ BTCPay Server، يمكنك دمج نظام الدفع في موقعك الإلكتروني.  
هناك عدة طرق للقيام بذلك - من الوصول المباشر عبر API إلى إضافات جاهزة للاستخدام لمنصات CMS الشائعة.

---

### خيارات الدمج

- **الدمج عبر API**  
  مثالي للمواقع المبنية خصيصًا أو الأنظمة التي لا تستخدم CMS.  
  يمنحك تحكمًا كاملًا في إنشاء الفواتير وتتبّع المدفوعات والإشعارات - كل ذلك ضمن واجهتك ومنطقك الخاصين.  
  يتطلب معرفة برمجية أساسية، لذا من الأفضل أن يتولى المطور (developer) الخاص بك هذه المهمة.

- **إضافات CMS**  
  متاحة لمنصات مثل **WooCommerce** و**PrestaShop** وغيرها.  
  تتيح لك هذه الإضافات قبول المدفوعات في بضع دقائق فقط - دون الحاجة إلى كتابة أي شيفرة.

- **زر الدفع أو Iframe**  
  أبسط طريقة.  
  مثالية لصفحات الهبوط أو المواقع الشخصية أو أي موقع تريد فيه فقط تضمين رابط تبرع أو أداة دفع.

---

### الدمج عبر API

إذا كنت تستخدم منصة مخصصة (أو لا تستخدم أي CMS على الإطلاق)، فإن API هو الخيار الأفضل.  
يمنحك مرونة كاملة: يمكنك إنشاء الفواتير وتتبّع حالتها وتلقي الإشعارات والتحكم الكامل في تجربة المستخدم.

> تنبيه: حتى بعض إضافات CMS تستخدم API في الخلفية، لذا فإن إنشاء مفتاح API غالبًا ما يكون **الخطوة الأولى المطلوبة**، بغض النظر عن طريقة الدمج.

الخطوة التالية: أنشئ مفتاح API لمتجرك وابدأ باستخدام [Greenfield API](https://docs.btcpayserver.org/API/Greenfield/v1/) لبناء عملية الدمج.


### إنشاء مفتاح API

لدمج BTCPay Server مع موقعك الإلكتروني أو تطبيقك، ستحتاج إلى إنشاء مفتاح API.

1. سجّل الدخول إلى BTCPay Server وافتح **قائمة المستخدم** (الزاوية العلوية اليمنى)
2. انتقل إلى **API Keys**
3. انقر على **Create a new API key**
4. أدخل اسمًا لمفتاحك
5. في قسم **Permissions**، فعّل:
   - `Can create invoice`
   - `Can view invoice`
   - *(اختياري)* `Can modify store settings` - فقط إذا كنت تحتاج إلى الإدارة على مستوى المتجر

6. انقر على **Generate**. سيُعرض مفتاح API الشخصي الخاص بك - انسخه واحفظه بأمان.

> يمنح هذا المفتاح الوصول إلى فواتير متجرك.  
> **لا** تشاركه علنًا ولا تكشفه في الشيفرة من جهة العميل.

---

### مثال: إنشاء فاتورة عبر API

**نقطة النهاية:**

```
POST /api/v1/stores/{storeId}/invoices
Authorization: token {apiKey}
Content-Type: application/json
```

**نص الطلب:**

```
{
  "amount": 5,
  "currency": "ZEC",
  "checkout": {
    "speedPolicy": "HighSpeed",
    "paymentMethods": ["Zcash"]
  }
}
```

**الاستجابة:**

ستتلقى كائن JSON يحتوي على:

* `invoiceId`
* رابط URL للدفع يمكنك تضمينه في موقعك الإلكتروني أو إرساله إلى العميل

اطّلع على الوثائق الكاملة:
[Greenfield API – إنشاء فاتورة](https://docs.btcpayserver.org/API/Greenfield/v1/#operation/CreateInvoice)

---

### إعداد Webhook (اختياري)

لتلقي إشعارات فورية عند تغيّر حالات الفواتير (مثلًا عند استلام دفعة):

1. انتقل إلى إعدادات متجرك -> **Webhooks**
2. أضف عنوان URL لنقطة النهاية في الواجهة الخلفية التي ستعالج طلبات `POST` الواردة من BTCPay Server
3. سيرسل BTCPay الإشعارات تلقائيًا عند دفع الفاتورة أو انتهاء صلاحيتها

حمولات Webhook ومنطق إعادة المحاولة موصوفة في [وثائق Webhook الرسمية](https://docs.btcpayserver.org/FAQ/General/#how-to-create-a-webhook-).

> تتوفر أمثلة على عمليات الدمج بلغات برمجة مختلفة في وثائق BTCPay ومستودعات GitHub.



### الدمج مع CMS

يدعم BTCPay Server إضافات لأنظمة إدارة المحتوى (CMS) الشائعة.  
أكثر عمليات الدمج نضجًا واستخدامًا هي مع **WordPress + WooCommerce**، مما يسهّل قبول مدفوعات ZEC **دون كتابة شيفرة**.

---

#### WooCommerce (WordPress)

يدعم BTCPay Server رسميًا إضافة لـ WooCommerce.

خطوات الدمج:

1. ثبّت إضافة **BTCPay for WooCommerce** من دليل إضافات WordPress أو من GitHub.
2. في لوحة إدارة WordPress، انتقل إلى:

`WooCommerce -> Settings -> Payments`

3. ابحث عن **BTCPay** في القائمة وانقر على **Set up**
4. أدخل عنوان URL لـ BTCPay Server واتبع تعليمات التفويض  
   (يُوصى بالإنشاء التلقائي لمفتاح API)
5. فعّل طريقة الدفع واحفظ إعداداتك

> تتوفر تعليمات مفصّلة ودروس فيديو وأدلة لاستكشاف الأخطاء وإصلاحها في وثائق الإضافة.

ستجد أيضًا خيارات أخرى للدمج مع CMS في القسم نفسه من وثائق BTCPay.

---

### زر الدفع أو Iframe (دون الحاجة إلى CMS أو API)

إذا كنت لا تستخدم CMS ولا تريد العمل مع واجهات API، فإن أسهل طريقة لقبول مدفوعات ZEC هي **تضمين رابط دفع أو أداة دفع** مباشرةً في موقعك الإلكتروني.

هذه الطريقة مثالية لـ:

- صفحات الهبوط
- مواقع معارض الأعمال
- المدونات أو الصفحات الثابتة
- المشاريع التي لا تحتوي على خادم خلفي

---

#### الخيار 1: زر الدفع (رابط)

1. في BTCPay Server، أنشئ فاتورة يدويًا في قسم **Invoices**
2. انسخ رابط الدفع، مثلًا:

`[https://btcpay.example.com/i/abc123](https://btcpay.example.com/i/abc123)`

3. أضف الرابط إلى شيفرة HTML الخاصة بك:

```
<a href="https://btcpay.example.com/i/abc123" target="_blank">
  Pay with ZEC
</a>
```

---

#### الخيار 2: فاتورة مضمّنة (Iframe)

لعرض الفاتورة مباشرةً على موقعك، استخدم iframe:

`<iframe src="https://btcpay.example.com/i/abc123" width="600" height="350" frameborder="0"></iframe>`

> يمكنك تنسيق الزر أو حاوية iframe لتتناسب مع تصميم موقعك - يتيح BTCPay Server تخصيصًا مرنًا لمظهر صفحة الفاتورة.

## الخلاصة

كان هذا الدليل طويلاً، لكنه لا يغطي سوى الجوانب الأساسية لدمج مدفوعات Zcash مع BTCPay Server.

توفر واجهة BTCPay Server وظائف أكثر بكثير مما عرضناه هنا. ولحسن الحظ، فإن واجهة المستخدم متاحة بلغات متعددة (منها الروسية)، مما يسهّل عليك استكشافها والتجربة بها أكثر.

BTCPay أداة مرنة للغاية. يمكنك:

* استضافة عدة متاجر مستقلة على نسخة واحدة
* تحديد أدوار وصلاحيات مخصصة لأعضاء الفريق، من صلاحية عرض الطلبات فقط إلى صلاحيات المسؤول الكاملة
* استخدام نطاقاتك وهويتك التجارية الخاصة
* إعداد webhooks ومحافظ (wallets) احتياطية، وحتى الوصول عبر Tor
* ضبط إعدادات متقدمة مثل قواعد الضرائب ورموز الخصم وتخصيص صفحة الدفع وتقييد طرق الدفع وغير ذلك

صُمّم BTCPay بوصفه بديلاً مفتوح المصدر لمزودي خدمات الدفع المركزيين. إذا كنت تبحث عن قبول مدفوعات ZEC خاصة دون وسطاء، فهذه المنصة تستحق اهتمامك بالتأكيد.

نتمنى لك التوفيق في استكشاف منظومة BTCPay وفي جعل مدفوعاتك ملكاً لك حقاً.

## المصادر

* [الموقع الرسمي لـ BTCPay Server](https://btcpayserver.org/)
* [الأسئلة الشائعة حول BTCPay](https://docs.btcpayserver.org/FAQ/)
* [مستودع BTCPay Server GitHub](https://github.com/btcpayserver/btcpayserver)
* [العرض التجريبي لـ BTCPay Server على الشبكة الرئيسية](https://mainnet.demo.btcpayserver.org/login?ReturnUrl=%2F)
* [إضافة Zcash لـ BTCPay (GitHub)](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
* [دليل تثبيت إضافة Zcash](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/installation.md)
* [مثال على ملف zcash-lightwalletd.custom.yml مخصص](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/zcash-lightwalletd.custom.yml)
* [ملف Compose لـ lightwalletd Docker (Zebra)](https://github.com/ZcashFoundation/zebra/blob/main/docker/docker-compose.lwd.yml)
* [وثائق مفتاح API في BTCPay (Greenfield API)](https://docs.btcpayserver.org/API/Greenfield/v1/#tag/API-Keys)
* [إنشاء نفق Cloudflare](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/get-started/create-remote-tunnel/)
* [قائمة توافق محافظ Zcash (ZecHub)](https://zechub.wiki/wallets)
* [Zebra + lightwalletd على Raspberry Pi 5 (ZecHub)](https://free2z.com/ZecHub/zpage/zcash-101-zebra-lightwalletd-sync-journal-on-raspberry-pi-5)
