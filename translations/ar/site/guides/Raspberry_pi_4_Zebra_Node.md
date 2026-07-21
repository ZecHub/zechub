<a href="https://github.com/henryquincy/zechub/edit/main/site/guides/Raspberry_pi_4_Zebra_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="تحرير الصفحة"/>
</a>

# دليل Raspberry Pi 4 لتشغيل Zebra

<img src="https://i.ibb.co/V3rjKwv/image-2023-11-28-172907488.png" alt="راسبيري باي" width="300" height="300"/>

يتيح لك تشغيل برنامج عقدة Zebra على Raspberry Pi 4 المشاركة في شبكة Zcash كعقدة مستقلة ومتوافقة مع الإجماع. سيرشدك هذا الدليل خلال الخطوات اللازمة لإعداد Zebra وتشغيله على Raspberry Pi 4 الخاص بك.

## المتطلبات المسبقة

1. Raspberry Pi 4 (يوصى بذاكرة RAM بسعة 2GB أو أكثر).

2. بطاقة MicroSD (يوصى بسعة 16GB أو أكثر) مع تثبيت Raspberry Pi OS (Raspbian).

3. اتصال إنترنت مستقر.

4. لوحة مفاتيح وفأرة وشاشة (للإعداد الأولي).

5. عميل SSH (اختياري، للوصول عن بُعد).

## التثبيت

1. __حدّث نظامك__
   افتح الطرفية أو اتصل بـ SSH إلى Raspberry Pi الخاص بك وتأكد من أن نظامك محدّث عبر تشغيل:

   __sudo apt update__

   __sudo apt upgrade__

2. __ثبّت الاعتماديات__
   ستحتاج إلى تثبيت بعض الاعتماديات اللازمة لبناء Zebra وتشغيله:

   __sudo apt install build-essential cmake git clang libssl-dev pkg-config__

3. __استنسخ مستودع Zebra__
   افتح الطرفية واستنسخ مستودع Zebra إلى Raspberry Pi الخاص بك:

   __git clone https://github.com/ZcashFoundation/zebra.git__

   __cd zebra__

4. __ابنِ Zebra__
   لبناء Zebra، استخدم الأوامر التالية:

   __cargo build --release__

   قد تستغرق هذه العملية بعض الوقت. تأكد من أن Raspberry Pi الخاص بك يتم تبريده بشكل كافٍ، لأن عملية الترجمة البرمجية قد تولّد حرارة.

5. __الإعداد__
   أنشئ ملف إعدادات لـ Zebra. يمكنك استخدام الإعداد الافتراضي كنقطة بداية:

   __cp zcash.conf.example zcash.conf__

   حرّر ملف zcash.conf لتخصيص إعدادات عقدتك. يمكنك تحديد الشبكة، وتمكين التعدين، وإعداد اتصالات الأقران، وغير ذلك.

6. __ابدأ Zebra__
   يمكنك الآن بدء Zebra باستخدام إعداداتك المخصصة:

   __./target/release/zebrad -c zcash.conf__

   __git comment__ 

   سيؤدي هذا الأمر إلى تشغيل عقدة Zebra، وستبدأ بمزامنة سلسلة كتل Zcash.

7. __المراقبة__
   يمكنك مراقبة التقدم وحالة عقدة Zebra الخاصة بك عبر فتح متصفح ويب والانتقال إلى __http://127.0.0.1:8233/status__.

<img src="https://i.ibb.co/BCtKrGp/image-2023-11-28-173024853.png" alt="شعار Zebra" width="200" height="200"/>

## استكشاف الأخطاء وإصلاحها

إذا واجهت أي مشكلات أثناء بناء Zebra أو تشغيله، فراجع [وثائق Zebra](https://doc.zebra.zfnd.org/docs/intro.html) للحصول على نصائح استكشاف الأخطاء وإصلاحها ومعلومات إضافية.

تأكد من إبقاء Raspberry Pi الخاص بك بارداً، لأن تشغيل عقدة قد يولّد حرارة. قد ترغب في استخدام حل تبريد، مثل مروحة أو مشتت حراري.

## الخلاصة

باتباع هذا الدليل، يفترض أنك نجحت في إعداد Zebra وتشغيله على Raspberry Pi 4. أنت الآن تساهم في شبكة Zcash كعقدة مستقلة، مما يساعد على حماية خصوصية معاملات Zcash.
