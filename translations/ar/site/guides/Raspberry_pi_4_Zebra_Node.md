<a href="https://github.com/henryquincy/zechub/edit/main/site/guides/Raspberry_pi_4_Zebra_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# دليل Raspberry Pi 4 لتشغيل Zebra

<img src="/content-images/image-2023-11-28-172907488-e7e9fd4ac5.webp" alt="raspberry pi" width="300" height="300"/>

يتيح لك تشغيل برنامج العقدة (node) الخاص بـ Zebra على جهاز Raspberry Pi 4 المشاركة في شبكة Zcash بصفتك عقدة مستقلة متوافقة مع الإجماع (consensus). سيرشدك هذا الدليل خلال خطوات إعداد Zebra وتشغيله على جهاز Raspberry Pi 4 الخاص بك.

## المتطلبات الأساسية

1. جهاز Raspberry Pi 4 (يُوصى بذاكرة RAM بسعة 2GB أو أكثر).

2. بطاقة MicroSD (يُوصى بسعة 16GB أو أكثر) مثبت عليها نظام Raspberry Pi OS (Raspbian).

3. اتصال مستقر بالإنترنت.

4. لوحة مفاتيح وفأرة وشاشة (للإعداد الأولي).

5. عميل SSH (اختياري، للوصول عن بُعد).

## التثبيت

1. __حدّث نظامك__
   افتح نافذة الطرفية أو اتصل بجهاز Raspberry Pi عبر SSH، وتأكد من أن نظامك محدّث بتشغيل:

   __sudo apt update__

   __sudo apt upgrade__

2. __ثبّت التبعيات__
   ستحتاج إلى تثبيت بعض التبعيات اللازمة لبناء Zebra وتشغيله:

   __sudo apt install build-essential cmake git clang libssl-dev pkg-config__

3. __استنسخ مستودع Zebra__
   افتح نافذة الطرفية واستنسخ مستودع Zebra إلى جهاز Raspberry Pi الخاص بك:

   __git clone https://github.com/ZcashFoundation/zebra.git__

   __cd zebra__

4. __ابنِ Zebra__
   لبناء Zebra، استخدم الأوامر التالية:

   __cargo build --release__

   قد تستغرق هذه العملية بعض الوقت. تأكد من أن جهاز Raspberry Pi مبرَّد بشكل كافٍ، إذ قد تولّد عملية الترجمة البرمجية حرارة.

5. __الإعداد__
   أنشئ ملف إعداد لـ Zebra. يمكنك استخدام الإعداد الافتراضي كنقطة انطلاق:

   __cp zcash.conf.example zcash.conf__

   عدّل ملف zcash.conf لتخصيص إعدادات عقدتك. يمكنك تحديد الشبكة، وتفعيل التعدين (mining)، وإعداد الاتصالات مع النظراء، وغير ذلك.

6. __شغّل Zebra__
   يمكنك الآن تشغيل Zebra باستخدام إعدادك المخصص:

   __./target/release/zebrad -c zcash.conf__

   __git comment__ 

   سيشغّل هذا الأمر عقدة Zebra، وستبدأ بالمزامنة مع سلسلة الكتل (blockchain) الخاصة بـ Zcash.

7. __المراقبة__
   يمكنك مراقبة تقدّم عقدة Zebra الخاصة بك وحالتها بفتح متصفح ويب والانتقال إلى __http://127.0.0.1:8233/status__.

<img src="/content-images/image-2023-11-28-173024853-99540511cf.webp" alt="zebra logo" width="200" height="200"/>

## استكشاف الأخطاء وإصلاحها

إذا واجهت أي مشكلات في بناء Zebra أو تشغيله، فراجع [وثائق Zebra](https://zebra.zfnd.org/user/troubleshooting.html) للاطلاع على نصائح استكشاف الأخطاء وإصلاحها ومعلومات إضافية.

احرص على إبقاء جهاز Raspberry Pi باردًا، إذ قد يولّد تشغيل عقدة حرارة. قد ترغب في استخدام وسيلة تبريد، مثل مروحة أو مشتت حراري.

## الخاتمة

باتباع هذا الدليل، يُفترض أنك نجحت في إعداد Zebra وتشغيله على جهاز Raspberry Pi 4 الخاص بك. أنت الآن تساهم في شبكة Zcash بصفتك عقدة مستقلة، وتساعد في تأمين خصوصية (privacy) معاملات (transactions) Zcash.
