# عرض توضيحي لـ Ywallet وFROST

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/3IZgxDqQNbw"
    title="عرض توضيحي لمعاملة FROST + Ywallet"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## تجميع ملفات FROST التنفيذية

[رابط Github](https://github.com/ZcashFoundation/frost-zcash-demo/tree/update-zcash-sign)

استخدم المستودع أعلاه واتبع التعليمات الخاصة بعملية التجميع:

```bash
cargo build --bin trusted-dealer
cargo build --bin dkg
cargo build --bin coordinator
cargo build --bin participants
```

ستكون الملفات التنفيذية داخل مجلد target.

## إنشاء FROST UA

`./generateFROST_UA.sh`



## استيراد UFVK إلى Ywallet

Accounts -> انقر على + والصق ufvk من الخطوة أعلاه

## إنشاء معاملة باستخدام Ywallet

الصق أي UA وأرسل معاملة. احفظ الملف.

## بدء إجراء التوقيع بـ FROST

`./signFROST_tx.sh rawtxs/mytx signedtxs/mysignedtx`

الإدخال الأول هو موقع المعاملة الخام من الخطوة أعلاه
الإدخال الثاني هو موقع واسم المعاملة الموقعة التي تريد بثها
هذا هو الجزء الذي تُخبر فيه FROST بأي معاملة تريد من الجميع توقيعها

## بدء Coordinator

`./runCoordinator.sh`

يقوم هذا بتنسيق توقيع كل مشارك وإنشاء توقيع جماعي

## اجعل كل Participant يوقّع على هذه المعاملة

```bash
./participantSign.sh key-package-1.json
./participantSign.sh key-package-2.json
```

## إتمام المعاملة الموقعة

في نافذة المنسّق، انسخ التوقيع الجماعي الذي يتم إخراجه والصقه في نافذة توقيع FROST.
سيُكمل هذا عملية التوقيع بـ FROST ويُخرج 'mysingedtx'


## بث معاملتك باستخدام Ywallet

انقر على 'More' في الجهة السفلية اليمنى من Ywallet وابحث عن 'Broadcast'. اعثر على 'mysignedtx' وانقر على موافق.

إذا نجح كل شيء فستحصل على معرّف معاملة :)
