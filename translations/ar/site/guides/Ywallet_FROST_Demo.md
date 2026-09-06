# عرض توضيحي لـ Ywallet FROST

> **لم تعد Ywallet قيد الصيانة.** أكّد مطوّرها أنها لن تُحدَّث لـ Ironwood (NU6.3)، لذا لم يعد بإمكانها متابعة السلسلة ولا يمكن إكمال الخطوات أدناه على الشبكة الرئيسية. تُحفظ هذه الصفحة للرجوع إليها. يُعد Zkool، من المطوّر نفسه، الخلف المدعوم حاليًا ويدعم التوقيع المتعدد FROST.

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


## تجميع ملفات FROST التنفيذية

[رابط Github](https://github.com/ZcashFoundation/frost-zcash-demo/tree/update-zcash-sign)

استخدم المستودع أعلاه واتبع تعليمات التجميع: 

```bash
cargo build --bin trusted-dealer
cargo build --bin dkg
cargo build --bin coordinator
cargo build --bin participants
```

ستكون الملفات التنفيذية في مجلد target.

## إنشاء FROST UA

`./generateFROST_UA.sh`



## استيراد UFVK إلى Ywallet

الحسابات -> انقر على + والصق ufvk من الخطوة أعلاه

## إنشاء معاملة باستخدام Ywallet

الصق أي UA وأرسل معاملة. احفظ الملف.

## بدء إجراء توقيع FROST 

`./signFROST_tx.sh rawtxs/mytx signedtxs/mysignedtx`

المدخل الأول هو موقع المعاملة الخام من الخطوة أعلاه  
المدخل الثاني هو موقع واسم المعاملة الموقعة التي تريد بثها  
هذا هو الجزء الذي تُخبر فيه FROST بالمعاملة التي تريد أن يوقّع عليها الجميع

## بدء Coordinator

`./runCoordinator.sh`

ينسّق هذا توقيع كل مشارك وينشئ توقيعًا جماعيًا

## اطلب من كل Participant التوقيع على هذه المعاملة

```bash
./participantSign.sh key-package-1.json
./participantSign.sh key-package-2.json
```

## إنهاء المعاملة الموقعة

في نافذة المنسّق، انسخ التوقيع الجماعي الذي يظهر والصقه في نافذة توقيع FROST.
سيُكمل هذا توقيع FROST ويُنتج 'mysingedtx'


## بث معاملتك باستخدام Ywallet

انقر على 'More' في الجانب السفلي الأيمن من Ywallet وابحث عن 'Broadcast'. ابحث عن 'mysignedtx' وانقر على موافق.

إذا عمل كل شيء، فستحصل على معرّف معاملة :)
