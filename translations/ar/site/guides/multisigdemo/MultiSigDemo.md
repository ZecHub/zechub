# عرض توضيحي لـ MultiSig

> **تاريخي. لم يعد هذا الدليل التفصيلي يعمل.**
>
> تعتمد كل خطوة أدناه على zcashd، الذي وصل إلى توقفه التلقائي لنهاية الدعم في 18 يوليو 2026. تُشغّل البرامج النصية السبعة المرفقة بهذه الصفحة عبر `zcash-cli`، لذا لا يمكن لأيٍّ منها الوصول إلى عقدة عاملة اليوم.
>
> لا يمكن نقل هذه البرامج النصية آليًا. فهي مبنية على معاملات RPC للمعاملات الخام والمحفظة (`createrawtransaction`, `signrawtransaction`, `createmultisig`, `dumpprivkey`) التي أوقف zcashd دعمها قبل التوقف؛ ويستبدلها Zallet بأساليب جديدة تعمل على PCZTs بدلًا من hex للمعاملة الخام، وما يزال في مرحلة beta مع وجود العديد من أساليب zcashd التي لم تُنقل بعد.
>
> للحفظ متعدد الأطراف على Zcash اليوم، راجع [FROST & الحفظ بالعتبة](/zcash-tech/frost-threshold-custody)، الذي يتضمن مقارنة مباشرة مع multisig الشفاف، و[عرض Ywallet التوضيحي لـ FROST](/guides/ywallet-frost-demo). لنقل عقدة حالية بعيدًا عن zcashd، راجع [دليل الترحيل إلى Zebra وZallet](/guides/migration-guide-zcashd-to-zebrad-zallet).
>
> تُحفظ هذه الصفحة كسجل تاريخي لسير عمل multisig الشفاف.

يتطلب هذا العرض التوضيحي zcashd، الذي توقف في 18 يوليو 2026 ولم يعد يعمل. لا يمكن إكمال أي شيء أدناه على السلسلة الحية.

## اجمع المفاتيح العامة من الأفراد المطلوبين

* https://github.com/iancoleman/bip39
* عند استخدام zcashd، يمكنك إنشاء UA واستخدام المستقبِل الشفاف الخاص بك أيضًا. ثم استخدم `getPubkey.sh` لاستخراج مفتاحك العام.


## أنشئ عناوين t3 لـ Multisig بمقدار 2x (2 من 3)

شغّل createMultiSig.sh لتوليد عنوان multisig وredeem script الخاصين بك. المطلوب هو 3 مفاتيح عامة

`./createMultiSig.sh pubk1 pubk2 pubk3`      # أول t3

`./createMultiSig.sh pubk4 pubk5 pubk6`      # ثاني t3 لعنوان الباقي. 

#### ملاحظة: في هذا المثال، pubk1 وpubk4 للشخص نفسه، وpubk2 وpubk5 للشخص نفسه، وهكذا ...

#### ملاحظة2: ترتيب مفاتيحك العامة مهم! انتبه إلى هذا!!!!


## موّل عنوان t3

استخدم أي محفظة/facuet لتمويل العنوان

## أنشئ معاملة MultiSig

`./createMultiSigTX.sh txid voutIndex scriptPubKey redeemScript oldAmount tAddy amount changeTaddy`

حيث،

```
        txid: معرّف معاملة للمعاملة التي أرسلت الأموال إلى t3 الجديد الخاص بك
   voutIndex: فهرس المخرج في vout الذي يملك أكبر قيمة
scriptPubKey: يحتوي برنامج قفل P2SH النصي على hash لبرنامج قفل نصي آخر (Script Hash)، محاطًا برمزي التشغيل HASH160 وEQUAL. هذا بتنسيق hex، ويُعثر عليه عبر getrawtransaction rpc، ابحث عن scriptPubKey
redeemScript: قيمة hex لـ redeemScript التي خرجت عند إنشاء t3 الخاص بنا. يحتاجها كل من يريد الإنفاق من t3.
   oldAmount: المبلغ المُرسل إلى t3 الجديد الخاص بك من txid أعلاه
       tAddy: العنوان الذي تريد إرسال الأموال إليه
      amount: مقدار ZEC المُراد إرساله إلى tAddy
 changeTaddy: عنوان الباقي (t3 جديد مع redeemScript جديد!)

```

`./txDetails.sh txid`   => سيساعدك في العثور على المعلومات المطلوبة

```

txid              : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .txid

valueInitialTX    : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].value   ** هذا مطلوب للتوقيع! **

voutIndex         : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].n

scriptPubKey      : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].scriptPubKey.hex

```



## وقّع معاملة MultiSig

افتح signMultiSigTX.sh وأضف مفاتيحك الخاصة في المتغيرات pk1 وpk2 و... .
 

*** لا أوصي بكتابة هذه في الطرفية الخاصة بك. ***


إذا كان لديك وصول إلى جميع مفاتيحك الخاصة، فيمكنك استخدامها كلها دفعة واحدة لتوفير الوقت،
لكن في معظم أمثلة العالم الواقعي، سيتم التوقيع من خلال أشخاص حول العالم، لذا سيحتاج كل مشارك مطلوب إلى التوقيع،
ثم إعادة إرسال مخرج raxTX المحدّث بتنسيق "hex"، والذي سيستخدمه الآخرون للتوقيع لإكمال إجراء التوقيع.

من ينشئ أول tx سيوقّع بمفتاحه الخاص ويرسل rawTX hex المحدّث الذي يحتاج المشاركون الآخرون إلى توقيعه.

`./signMultiSigTX.sh rawTX txid voutIndex scriptPubKey redeemScript valueInitialTX`

لتوقيع هذه المعاملة، يجب أن يوقّعها مفتاحان خاصان على الأقل من أصل ثلاثة. إذا كان المفتاح العام الذي قدمته قد صُدّر باستخدام عنوان T من zcashd، فيمكنك الحصول على المفتاح الخاص لعنوان T الخاص بك عبر: 


`zcash-cli dumpprivkey "t-addr"`

توقف هذا الأمر مع zcashd ولا يعيد أي شيء اليوم؛ وهو مسجّل هنا فقط لبيان كيفية حصول العرض التوضيحي على مفاتيحه.


في هذا العرض التوضيحي، استخدمت bip39 الخاص بـ iancoleman لعزل المفاتيح الخاصة المطلوبة بسرعة.


## بث المعاملة الموقّعة

`./sendMultiSignedTX.sh signedTXfromLastStep`



# المصادر

* https://learnmeabitcoin.com/technical/script/p2sh/
* https://bitcoin.stackexchange.com/questions/6100/how-will-multisig-addresses-work
* https://zcash.github.io/rpc/
