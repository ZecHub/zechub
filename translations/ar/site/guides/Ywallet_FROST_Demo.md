# عرض توضيحي لـ Ywallet FROST

> **لم يعد Ywallet يخضع للصيانة.** أكّد مطوره أنه لن يُحدَّث لـ Ironwood (NU6.3)، لذا لم يعد بإمكانه مواكبة السلسلة (chain)، ولا يمكن إتمام الخطوات أدناه على الشبكة الرئيسية. يُحتفظ بهذه الصفحة كمرجع. Zkool، من المطور نفسه، هو الخلف الذي يخضع للصيانة ويدعم التوقيع المتعدد لـ FROST.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/3IZgxDqQNbw"
    title="FROST + Ywallet Transaction Demo"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## تجميع الملفات التنفيذية لـ FROST

[GitHub رابط](https://github.com/ZcashFoundation/frost-zcash-demo)

استخدم المستودع أعلاه واتبع إرشادات التجميع:

```bash
cargo build --bin trusted-dealer
cargo build --bin dkg
cargo build --bin coordinator
cargo build --bin participant
```

ستكون الملفات التنفيذية في المجلد target.

## إنشاء عنوان موحد لـ FROST

`./generateFROST_UA.sh`



## استيراد UFVK إلى Ywallet

Accounts -> انقر على + والصق ufvk من الخطوة السابقة

## إنشاء معاملة بـ Ywallet

الصق أي UA وأرسل معاملة. احفظ الملف.

## بدء إجراء التوقيع لـ FROST

`./signFROST_tx.sh rawtxs/mytx signedtxs/mysignedtx`

المُدخل الأول هو موقع المعاملة الخام من الخطوة السابقة
المُدخل الثاني هو موقع واسم المعاملة الموقّعة التي تريد بثها
في هذا الجزء تخبر FROST بالمعاملة التي تريد من الجميع توقيعها

## تشغيل المنسق

`./runCoordinator.sh`

يقوم هذا بتنسيق التوقيع الرقمي (signature) لكل مشارك وينشئ توقيعًا جماعيًا

## اجعل كل مشارك يوقّع على هذه المعاملة

```bash
./participantSign.sh key-package-1.json
./participantSign.sh key-package-2.json
```

## إتمام المعاملة الموقّعة

في نافذة المنسق، انسخ التوقيع الجماعي الناتج والصقه في نافذة التوقيع لـ FROST.
سيؤدي هذا إلى إتمام التوقيع لـ FROST وإخراج 'mysingedtx'


## بث معاملتك بـ Ywallet

انقر على 'More' في الجانب الأيمن السفلي من Ywallet وابحث عن 'Broadcast'. اختر 'mysignedtx' وانقر على ok.

إذا سار كل شيء على ما يرام، فستحصل على معرّف المعاملة :)
