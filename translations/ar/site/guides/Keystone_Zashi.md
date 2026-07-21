# دليل مستخدم Keystone Zashi

دليل Twitter:  => [دليل Twitter لتكامل محفظة الأجهزة Zashi x Keystone](https://x.com/zashi_app/status/1869793574880973144) 

يمثل هذا التكامل تطورًا مهمًا في سهولة استخدام Zcash من خلال إتاحة التخزين البارد لـ ZEC المحمية. لقد واجه مجتمع Zcash انتكاسات مع منصات أخرى لمحافظ الأجهزة في الماضي، لكن Keystone برزت كشريك تعاوني مستعد لتجاوز الحدود والابتكار جنبًا إلى جنب مع Electric Coin Company. تلقى فريق Keystone منحة من ZCG لدعم جانبهم من العمل.

## شرح Keystone X Zashi

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/ktYf7josJKM"
    title="شرح Keystone X Zashi"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
    

## التحضير
[اطلب واستلم جهاز Keystone 3 Pro أو Keystone 3 الخاص بك](https://keyst.one) 

مستوى البطارية: تأكد من أن مستوى بطارية جهاز keystone لديك يزيد عن 20%.

كابل USB أو بطاقة SD:

- كابل USB لتحديث البرنامج الثابت (مرفق).
- بطاقة Micro SD (أقل من 1 تيرابايت) للترقيات (تُشترى بشكل منفصل).

الوصول إلى الموقع الرسمي لـ Keystone للتحقق وتحديث البرنامج الثابت.

إعداد تطبيق Zashi على جهازك المحمول.

## [دليل خطوة بخطوة (جهاز Keystone)](https://keyst.one/get-started) 


**اختر لغتك**
-التحقق من الجهاز (عبر QR): يعد التحقق من الجهاز أمرًا بالغ الأهمية لاكتشاف أي عبث محتمل أثناء النقل، ومنع هجمات سلسلة التوريد، وضمان سلامة البرنامج الثابت المثبت.
  - زر صفحة التحقق من الجهاز على موقع Keystone.
  - انقر على Scan QR Code في الموقع الرسمي.
  - استخدم كاميرا Keystone لمسح رمز QR الظاهر على الموقع.
  - سيظهر رمز تحقق على شاشة Keystone الخاصة بك.
  - أدخل هذا الرمز على الموقع لإكمال عملية التحقق.

- **تحديث البرنامج الثابت:**
  - التحديث عبر بطاقة MicroSD
    - تأكد من أن محفظة Keystone لديك تحتوي على شحن بطارية لا يقل عن 20%.
    - أدخل بطاقة SD في جهاز الكمبيوتر لديك وقم بتهيئتها بصيغة FAT32.
    - نزّل أحدث إصدار من البرنامج الثابت Cypherpunk من [صفحة تحديث البرنامج الثابت لـ Keystone](https://keyst.one/firmware) واحفظ ملف keystone3.bin في الدليل الجذر لبطاقة MicroSD الخاصة بك.
    - ضع بطاقة SD التي تحتوي على البرنامج الثابت داخل محفظة Keystone الخاصة بك.
    - انتقل إلى خيار "Upgrade" على محفظة Keystone الخاصة بك، ثم اتبع التعليمات الظاهرة على الشاشة لبدء عملية التحديث.
  - **التحديث عبر كابل USB**
    - إذا كان إصدار البرنامج الثابت لديك أقل من 1.0.4، فستحتاج إلى إجراء التحديث الأولي باستخدام بطاقة MicroSD قبل أن تتمكن من متابعة التحديثات عبر USB.
    - تأكد من أن محفظة Keystone لديك تحتوي على شحن بطارية لا يقل عن 20%.
    - اضغط على via USB واستخدم كابل USB لتوصيل محفظة Keystone بجهاز الكمبيوتر لديك. اضغط على [Approve] لمنح محفظة Keystone إذن الوصول عبر USB، إذ قد تسمح بخلاف ذلك بالشحن فقط.
    - افتح متصفح الويب على جهاز الكمبيوتر لديك وانتقل إلى [صفحة تحديث البرنامج الثابت لـ Keystone](https://keyst.one/firmware)
    - في صفحة التحديث، انقر على زر Install Update واتبع التعليمات المقدمة لتثبيت أحدث برنامج ثابت.
- **إنشاء محفظة:**
    - كلمة مرور آمنة: اختر رقم PIN أو كلمة مرور قوية لحماية محفظتك.
    - تسمية محفظتك (اختياري): يمكنك اختياريًا إعطاء محفظتك اسمًا لسهولة التعرف عليها أو تخطي هذه الخطوة.
    - اختر Create New Wallet إذا كنت تقوم بإعداد محفظة لأول مرة.
    - سيقوم جهازك بإنشاء عبارة استرداد مكونة من 24 كلمة.
    - دوّن عبارة الاسترداد هذه واحتفظ بها في مكان آمن.
    - أكد عبارة الاسترداد من خلال التحقق من الكلمات بالترتيب الصحيح كما هو معروض على الشاشة.
- **توصيل محفظة Zashi + Keystone:**
    - على جهاز Keystone: اضغط على … في الصفحة الرئيسية
    - اضغط على Connect Software Wallet واختر Zashi. سيظهر رمز QR للاتصال بـ Zashi.
    - في تطبيق Zashi: اضغط على القائمة المنسدلة zashi (أعلى يسار الشاشة)
    - اضغط على Connect Hardware Wallet
    - اضغط على Ready to Scan
    - امسح رمز QR المعروض على جهاز Keystone
    - في تطبيق Zashi: أكد حساب محفظة Keystone بالضغط على الحساب المعروض
    - اضغط على Connect في أسفل الشاشة


## مساعدة إضافية

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/Jr6LqtD1W0s"
    title="توصيل محفظة الأجهزة Keystone بـ Zashi"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
    

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/t_OHb1KqrRg"
    title="توقيع معاملة صادرة باستخدام Keystone"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
