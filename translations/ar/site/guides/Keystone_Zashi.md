<a href="https://github.com/zechub/zechub/edit/main/site/guides/Keystone_Zashi.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="تحرير الصفحة"/>
</a>

# دليل مستخدم Keystone Zodl (المعروف سابقًا باسم Zashi)

> احتفظ بـ ZEC المحمية في تخزين بارد: أقرن المحفظة المادية Keystone بتطبيق Zodl (المعروف سابقًا باسم Zashi، وأُعيدت تسميته في فبراير 2026) ووقّع المعاملات باستخدام رموز QR.

## خلاصة سريعة

* يعمل Keystone 3 Pro (أو Keystone 3) مع البرنامج الثابت Cypherpunk كجهاز توقيع معزول عن الشبكة لصالح Zodl، ما يتيح إبقاء ZEC المحمية في تخزين بارد.
* قبل البدء: تأكد من أن مستوى البطارية يتجاوز 20%، وجهّز كابل USB (أو بطاقة MicroSD من FAT32) لتحديث البرنامج الثابت، وتطبيق Zodl على هاتفك.
* تحقّق من الجهاز أولًا على موقع Keystone. فهذا يضمن عدم العبث به أثناء نقله.
* أنشئ المحفظة على Keystone واكتب عبارة الاسترداد المكوّنة من 24 كلمة على ورقة، دون اتصال بالإنترنت. لا تُدخَل هذه العبارة مطلقًا في Zodl.
* للاتصال: في Keystone، انقر على "..." > Connect Software Wallet > Zodl، ثم في Zodl انقر على Connect Hardware Wallet وامسح رمز QR.
* ينشئ Zodl كل معاملة؛ وتوافق عليها وتوقّعها على شاشة Keystone بمسح رموز QR ذهابًا وإيابًا.

## الشرح الأساسي

تحتفظ المحفظة المادية بمفاتيح الإنفاق على جهاز منفصل لا يتصل بالإنترنت مطلقًا. يعمل Keystone بمعزل عن الشبكة: فهو يتواصل مع هاتفك عبر رموز QR فقط، وليس عبر Bluetooth أو USB.

في هذا الإعداد، يعمل Zodl بوصفه جانب «المشاهدة». فهو يتزامن مع شبكة Zcash، ويعرض رصيدك المحمي، ويجهّز المعاملات. أما Keystone فيحتفظ بعبارة الاسترداد ويوقّع المعاملات. قد يتمكن هاتف مخترق من رؤية رصيدك، لكنه لا يستطيع تحويل الأموال دون موافقة على Keystone.

تتناول الخطوات أدناه تجهيز الجهاز والتحقق منه وتحديث البرنامج الثابت وإنشاء المحفظة وربطها بـ Zodl.

## نظرة عامة

دليل Twitter:  => [Zodl (المعروف سابقًا باسم Zashi) x تكامل المحفظة المادية Keystone Twitter دليل](https://x.com/zashi_app/status/1869793574880973144) 

يمثل هذا التكامل تطورًا مهمًا في سهولة استخدام Zcash، إذ يتيح التخزين البارد لـ ZEC المحمية. واجه مجتمع Zcash انتكاسات مع منصات محافظ أجهزة أخرى في الماضي، لكن Keystone برز شريكًا تعاونيًا مستعدًا لتجاوز الحدود والابتكار إلى جانب Electric Coin Company. وحصل فريق Keystone على منحة ZCG لدعم جانبهم من العمل.

## درس تعليمي عن Keystone X Zodl

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/ktYf7josJKM"
    title="درس تعليمي عن Keystone X Zodl"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
    

## التحضير
[اطلب واستلم جهاز Keystone 3 Pro أو Keystone 3](https://keyst.one) 

مستوى البطارية: تأكد من أن مستوى بطارية جهاز keystone يتجاوز 20%.

كابل USB أو بطاقة SD:

- كابل USB لتحديث البرنامج الثابت (مرفق).
- بطاقة MicroSD (بسعة أقل من 1 TB) للترقيات (تُشترى منفصلة).

إمكانية الوصول إلى الموقع الرسمي لـ Keystones للتحقق وتحديث البرنامج الثابت.

إعداد تطبيق Zodl على جهازك المحمول.

## [دليل خطوة بخطوة (جهاز Keystone)](https://keyst.one/get-started) 


**اختر لغتك**

- **التحقق من الجهاز (عبر QR):** يُعد التحقق من الجهاز ضروريًا لاكتشاف أي عبث محتمل أثناء النقل، ومنع هجمات سلسلة التوريد، وضمان سلامة البرنامج الثابت المثبّت.
  - انتقل إلى صفحة التحقق من الجهاز على موقع Keystone.
  - انقر على Scan QR Code في الموقع الرسمي.
  - استخدم كاميرا Keystone لمسح رمز QR الظاهر على الموقع.
  - سيظهر رمز تحقق على شاشة Keystone.
  - أدخل هذا الرمز على الموقع لإكمال عملية التحقق.

- **تحديث البرنامج الثابت:**
  - التحديث عبر بطاقة MicroSD
    - تأكد من أن شحن بطارية محفظة Keystone لا يقل عن 20%.
    - أدخل بطاقة SD في الكمبيوتر ونسّقها بنظام FAT32.
    - نزّل أحدث إصدار من البرنامج الثابت Cypherpunk من صفحة تحديث البرنامج الثابت [Keystone](https://keyst.one/firmware) واحفظ ملف keystone3.bin في المجلد الجذر لبطاقة MicroSD.
    - أدخل بطاقة SD التي تحتوي على البرنامج الثابت في محفظة Keystone.
    - افتح خيار "Upgrade" في محفظة Keystone، ثم اتبع التعليمات التي تظهر على الشاشة لبدء التحديث.
  - **التحديث عبر كابل USB**
    - إذا كان إصدار البرنامج الثابت أقل من 1.0.4، فستحتاج إلى إجراء التحديث الأولي باستخدام بطاقة MicroSD قبل متابعة التحديثات عبر USB.
    - تأكد من أن شحن بطارية محفظة Keystone لا يقل عن 20%.
    - انقر على عبر USB واستخدم كابل USB لتوصيل محفظة Keystone بالكمبيوتر. انقر على [Approve] لمنح محفظة Keystone إمكانية الوصول إلى USB، إذ قد تتيح الشحن فقط بخلاف ذلك.
    - افتح متصفح الويب على الكمبيوتر وانتقل إلى صفحة تحديث البرنامج الثابت [Keystone](https://keyst.one/firmware)
    - في صفحة التحديث، انقر على زر Install Update واتبع التعليمات المقدمة لتثبيت أحدث برنامج ثابت.
- **إنشاء محفظة:**
    - كلمة مرور آمنة: اختر رمز PIN أو كلمة مرور قوية لحماية محفظتك.
    - سمِّ محفظتك (اختياري): يمكنك منح محفظتك اسمًا لتمييزها بسهولة أو تخطي هذه الخطوة.
    - اختر Create New Wallet إذا كنت تُعد محفظة للمرة الأولى.
    - سينشئ جهازك عبارة استرداد من 24 كلمة.
    - دوّن عبارة الاسترداد واحفظها في مكان آمن.
    - أكّد عبارة الاسترداد بالتحقق من الكلمات بالترتيب الصحيح كما تظهر على الشاشة.
- **ربط محفظة Zodl + Keystone:**
    - على جهاز Keystone: انقر على … في الصفحة الرئيسية.
    - انقر على Connect Software Wallet واختر Zodl. سيظهر رمز QR للاتصال بـ Zodl.
    - في تطبيق Zodl: انقر على القائمة المنسدلة Zodl (أعلى يسار الشاشة).
    - انقر على Connect Hardware Wallet.
    - انقر على Ready to Scan.
    - امسح رمز QR المعروض على جهاز Keystone.
    - في تطبيق Zodl: أكّد حساب محفظة Keystone بالنقر على الحساب المعروض.
    - انقر على Connect أسفل الشاشة.


## مساعدة إضافية

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/Jr6LqtD1W0s"
    title="ربط المحفظة المادية Keystone بـ Zodl"
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
