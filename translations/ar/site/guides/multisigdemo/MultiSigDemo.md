# عرض توضيحي لـ MultiSig

يتطلب هذا العرض التوضيحي `zcashd` 

## جمع المفاتيح العامة من الأفراد المطلوبين

* https://github.com/iancoleman/bip39
* إذا كنت تستخدم `zcashd`، يمكنك إنشاء UA واستخدام المستقبِل الشفاف الخاص بك أيضًا. ثم استخدم `getPubkey.sh` لاستخراج مفتاحك العام.


## إنشاء عناوين t3 متعددة التوقيع 2x (2 من 3)

شغّل `createMultiSig.sh` لإنشاء عنوانك متعدد التوقيع ونص الاسترداد. المطلوب هو 3 مفاتيح عامة

`./createMultiSig.sh pubk1 pubk2 pubk3`      # أول t3

`./createMultiSig.sh pubk4 pubk5 pubk6`      # ثاني t3 لعنوان الباقي. 

#### ملاحظة: في هذا المثال pubk1,pubk4 هما لنفس الشخص، و pubk2,pubk5 هما لنفس الشخص وهكذا ...

#### ملاحظة 2: ترتيب مفاتيحك العامة مهم! انتبه إلى هذا!!!!


## تمويل عنوان t3

استخدم أي محفظة/صنبور لتمويل العنوان

## إنشاء معاملة MultiSig

`./createMultiSigTX.sh txid voutIndex scriptPubKey redeemScript oldAmount tAddy amount changeTaddy`

حيث،

```
        txid: معرّف المعاملة التي أرسلت أموالًا إلى عنوان t3 الجديد الخاص بك
   voutIndex: فهرس المخرج في vout الذي يحتوي على أكبر قيمة
scriptPubKey: يحتوي نص القفل P2SH على تجزئة نص قفل آخر (Script Hash)، محاطًا بأكواد التشغيل HASH160 و EQUAL. يكون هذا بالصيغة الست عشرية، ويمكن العثور عليه عبر rpc ‏getrawtransaction، ابحث عن scriptPubKey
redeemScript: القيمة الست عشرية لـ redeemScript التي تم إخراجها عند إنشاء t3 الخاص بنا. يحتاج إليها جميع الأشخاص الذين يريدون الإنفاق من t3.
   oldAmount: المبلغ المُرسَل إلى t3 الجديد الخاص بك من txid أعلاه
       tAddy: العنوان الذي تريد إرسال الأموال إليه
      amount: مقدار ZEC الذي سيتم إرساله إلى tAddy
 changeTaddy: عنوان الباقي (t3 جديد مع redeemScript جديد!)

```

`./txDetails.sh txid`   => سيساعدك في العثور على المعلومات المطلوبة

```

txid              : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .txid

valueInitialTX    : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].value   ** this is needed for signing! **

voutIndex         : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].n

scriptPubKey      : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].scriptPubKey.hex

```



## توقيع معاملة MultiSig

افتح `signMultiSigTX.sh` وأضف مفاتيحك الخاصة في المتغيرات `pk1,pk2, ...`.
 

*** لا أوصي بكتابة هذه في الطرفية الخاصة بك. ***


إذا كان لديك وصول إلى جميع مفاتيحك الخاصة، يمكنك استخدامها كلها دفعة واحدة لتوفير الوقت،
لكن في معظم الأمثلة الواقعية، سيتم التوقيع بواسطة أشخاص من أنحاء العالم، لذا سيحتاج كل مشارك مطلوب إلى التوقيع،
ثم إعادة إرسال مخرجات "hex" المحدّثة لـ raxTX التي سيستخدمها الآخرون للتوقيع من أجل إكمال إجراء التوقيع.

من ينشئ المعاملة الأولى سيوقّع بمفتاحه الخاص ويرسل قيمة rawTX hex المحدّثة التي تحتاج إلى أن يوقّعها المشاركون الآخرون.

`./signMultiSigTX.sh rawTX txid voutIndex scriptPubKey redeemScript valueInitialTX`

لتوقيع هذه المعاملة، يجب أن يوقّع عليها مفتاحان خاصان على الأقل من أصل ثلاثة. إذا كان المفتاح العام الذي قدمته قد تم تصديره باستخدام عنوان T من `zcashd`، فيمكنك الحصول على المفتاح الخاص لعنوان T الخاص بك عبر: 


`zcash-cli dumpprivkey "t-addr"`


في هذا العرض التوضيحي، استخدمت bip39 الخاص بـ iancoleman لعزل المفاتيح الخاصة المطلوبة بسرعة.


## بث المعاملة الموقعة

`./sendMultiSignedTX.sh signedTXfromLastStep`



# المصادر

* https://learnmeabitcoin.com/technical/script/p2sh/
* https://bitcoin.stackexchange.com/questions/6100/how-will-multisig-addresses-work
* https://zcash.github.io/rpc/
