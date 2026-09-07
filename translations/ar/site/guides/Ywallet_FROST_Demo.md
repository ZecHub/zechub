# عرض توضيحي لـ Ywallet FROST

> **لم تعد Ywallet خاضعة للصيانة.** أكّد مطوّرها أنها لن تُحدَّث من أجل Ironwood (NU6.3)، لذا لم يعد بإمكانها متابعة السلسلة ولا يمكن إتمام الخطوات أدناه على الشبكة الرئيسية. تُحفظ هذه الصفحة كمرجع. Zkool، من المطوّر نفسه، هو البديل الخاضع للصيانة ويدعم التوقيع المتعدد FROST.

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


## تجميع ملفات FROST الثنائية

[رابط Github](https://github.com/ZcashFoundation/frost-zcash-demo/tree/update-zcash-sign)

استخدم المستودع أعلاه واتبع تعليمات التجميع: 

```bash
cargo build --bin trusted-dealer
cargo build --bin dkg
cargo build --bin coordinator
cargo build --bin participants
```

ستكون الملفات الثنائية في مجلد target.

## إنشاء FROST UA

`./generateFROST_UA.sh`



## استيراد UFVK إلى Ywallet

الحسابات -> انقر على + والصق ufvk من الخطوة أعلاه

## إنشاء معاملة باستخدام Ywallet

الصق أي UA وأرسل معاملة. احفظ الملف.

## بدء إجراء توقيع FROST 

`./signFROST_tx.sh rawtxs/mytx signedtxs/mysignedtx`

المُدخل الأول هو موقع المعاملة الأولية من الخطوة أعلاه  
المُدخل الثاني هو موقع واسم المعاملة الموقعة التي تريد بثها  
هذا هو الجزء الذي تُخبر فيه FROST بالمعاملة التي تريد من الجميع توقيعها

## بدء المنسّق

`./runCoordinator.sh`

ينسّق هذا توقيع كل مشارك وينشئ توقيعًا جماعيًا

## اطلب من كل مشارك التوقيع على هذه المعاملة

```bash
./participantSign.sh key-package-1.json
./participantSign.sh key-package-2.json
```

## إتمام المعاملة الموقعة

في نافذة المنسّق، انسخ التوقيع الجماعي الناتج والصقه في نافذة توقيع FROST.
سيُكمل هذا توقيع FROST ويُخرج 'mysingedtx'


## بث معاملتك باستخدام Ywallet

انقر على 'More' في الجانب السفلي الأيمن من Ywallet وابحث عن 'Broadcast'. ابحث عن 'mysignedtx' وانقر على موافق.

إذا نجح كل شيء، فستحصل على معرّف معاملة :)
