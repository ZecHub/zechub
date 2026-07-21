# عرض Ywallet التوضيحي لـ FROST

## تجميع ملفات FROST التنفيذية

https://github.com/ZcashFoundation/frost-zcash-demo/tree/update-zcash-sign

استخدم المستودع أعلاه واتبع تعليمات التجميع:

`cargo build --bin trusted-dealer`

`cargo build --bin dkg`

`cargo build --bin coordinator`

`cargo build --bin participants`

ستكون الملفات التنفيذية داخل مجلد target.


## إنشاء FROST UA

`./generateFROST_UA.sh`



## استيراد UFVK إلى Ywallet

الحسابات -> انقر على + والصق ufvk من الخطوة أعلاه

## إنشاء معاملة باستخدام Ywallet

الصق أي UA وأرسل معاملة. احفظ الملف.

## بدء إجراء التوقيع باستخدام FROST

`./signFROST_tx.sh rawtxs/mytx signedtxs/mysignedtx`

المدخل الأول هو موقع المعاملة الخام من الخطوة أعلاه
المدخل الثاني هو موقع واسم المعاملة الموقعة التي تريد بثها
هذا هو الجزء الذي تُخبر فيه FROST بالمعاملة التي تريد من الجميع توقيعها

## بدء Coordinator

`./runCoordinator.sh`

يقوم هذا بتنسيق توقيع كل مشارك وإنشاء توقيع جماعي

## اجعل كل Participant يوقّع على هذه المعاملة

`./participantSign.sh key-package-1.json`


`./participantSign.sh key-package-2.json`

## إنهاء المعاملة الموقعة

في نافذة coordinator، انسخ التوقيع الجماعي الذي يتم إخراجه والصقه في نافذة توقيع FROST.
سيُكمل هذا عملية التوقيع باستخدام FROST ويُخرج `'mysingedtx'`


## بث معاملتك باستخدام Ywallet

انقر على 'More' في الجهة السفلية اليمنى من Ywallet وابحث عن 'Broadcast'. اعثر على 'mysignedtx' وانقر على موافق.

إذا سار كل شيء بشكل صحيح، فستحصل على معرّف معاملة :)
