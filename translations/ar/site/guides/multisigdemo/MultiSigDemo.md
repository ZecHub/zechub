# عرض توضيحي لـ MultiSig

> **تاريخي. لم يعد هذا الدليل الإرشادي يعمل.**
>
> تعتمد كل خطوة أدناه على zcashd، الذي وصل إلى إيقافه التلقائي عند نهاية الدعم في 18 يوليو 2026. تشغّل النصوص البرمجية السبعة المرفقة بهذه الصفحة عبر `zcash-cli`، لذا لا يمكن لأيٍّ منها الوصول إلى عقدة عاملة اليوم.
>
> لا يمكن نقل هذه النصوص البرمجية آليًا. فهي مبنية على واجهات RPC للمعاملات الخام والمحفظة (`createrawtransaction`، `signrawtransaction`، `createmultisig`، `dumpprivkey`) التي أوقف zcashd دعمها قبل الإيقاف؛ يستبدل Zallet تلك الواجهات بأساليب جديدة تعمل على PCZTs بدلًا من hex المعاملات الخام، ولا يزال في مرحلة beta مع وجود العديد من أساليب zcashd التي لم تُنقل بعد.
>
> للحفظ متعدد الأطراف على Zcash اليوم، راجع [FROST والحفظ بالعتبة](/zcash-tech/frost-threshold-custody)، الذي يتضمن مقارنة مباشرة مع multisig الشفاف، و[العرض التوضيحي العامل لـ Ywallet FROST](/guides/frostdemo/ywallet-frost-demo). لنقل عقدة قائمة من zcashd، راجع [دليل الترحيل إلى Zebra وZallet](/guides/migration-guide-zcashd-to-zebrad-zallet).
>
> تُحفظ هذه الصفحة كسجل تاريخي لتدفق عمل multisig الشفاف.

يتطلب هذا العرض التوضيحي zcashd، الذي توقف في 18 يوليو 2026 ولم يعد يعمل. لا يمكن إكمال أي مما يلي على السلسلة الحية.

## اجمع المفاتيح العامة من الأفراد المطلوبين

* https://github.com/iancoleman/bip39
* عند استخدام zcashd، يمكنك إنشاء UA واستخدام المستلِم الشفاف كذلك. ثم استخدم `getPubkey.sh` لاستخراج مفتاحك العام.


## أنشئ عناوين t3 لـ Multisig ‏2x (2 من 3)

شغّل createMultiSig.sh لإنشاء عنوان multisig الخاص بك ونص الاسترداد البرمجي. المطلوب هو 3 مفاتيح عامة

`./createMultiSig.sh pubk1 pubk2 pubk3`      # عنوان t3 الأول

`./createMultiSig.sh pubk4 pubk5 pubk6`      # عنوان t3 الثاني لعنوان الباقي. 

#### ملاحظة: في هذا المثال، pubk1 وpubk4 للشخص نفسه، وpubk2 وpubk5 للشخص نفسه، وهكذا ...

#### ملاحظة 2: ترتيب مفاتيحك العامة مهم! انتبه لهذا!!!!


## موّل عنوان t3

استخدم أي محفظة/صنبور لتمويل العنوان

## أنشئ معاملة MultiSig

`./createMultiSigTX.sh txid voutIndex scriptPubKey redeemScript oldAmount tAddy amount changeTaddy`

حيث،

```
        txid: a transaction ID of the transaction that sent money into your new t3
   voutIndex: the index of the output in vout which has the largest value
scriptPubKey: The P2SH locking script contains the hash of another locking script (Script Hash), surrounded by the HASH160 and EQUAL opcodes. This is in hex, and is found via getrawtransaction rpc, look for scriptPubKey
redeemScript: The hex value of the redeemScript that was output when creating our t3. This is needed by all folks who want to spend from the t3.
   oldAmount: Amount sent to your new t3 from the txid above
       tAddy: The address you want to send funds to
      amount: The amount of ZEC to send to tAddy
 changeTaddy: Change address (new t3 with a new redeemScript!)

```

`./txDetails.sh txid`   => سيساعدك في العثور على المعلومات المطلوبة

```

txid              : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .txid

valueInitialTX    : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].value   ** this is needed for signing! **

voutIndex         : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].n

scriptPubKey      : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].scriptPubKey.hex

```



## وقّع معاملة MultiSig

افتح signMultiSigTX.sh وأضف مفاتيحك الخاصة في المتغيرات pk1 وpk2، ...
 

*** لا أوصي بإدخال هذه في الطرفية لديك. ***


إذا كان لديك وصول إلى جميع مفاتيحك الخاصة، يمكنك استخدامها كلها دفعة واحدة لتوفير الوقت،
لكن في معظم الأمثلة الواقعية، سيتم التوقيع من خلال أشخاص حول العالم، لذا سيحتاج كل مشارك مطلوب إلى التوقيع،
ثم إعادة إرسال مخرجات hex المحدّثة لـ raxTX، والتي سيستخدمها الآخرون للتوقيع لإكمال عملية التوقيع.

سيوقّع من ينشئ المعاملة الأولى بمفتاحه الخاص ويرسل hex المحدّث لـ rawTX الذي يحتاج إلى توقيعه المشاركون الآخرون.

`./signMultiSigTX.sh rawTX txid voutIndex scriptPubKey redeemScript valueInitialTX`

لتوقيع هذه المعاملة، يجب أن يوقّع عليها مفتاحان خاصان على الأقل من المفاتيح الثلاثة. إذا كان المفتاح العام الذي قدّمته قد صُدِّر باستخدام عنوان T من zcashd، يمكنك الحصول على المفتاح الخاص لعنوان T الخاص بك عبر: 


`zcash-cli dumpprivkey "t-addr"`

توقف هذا الأمر مع zcashd ولا يعيد شيئًا اليوم؛ وهو مسجل هنا فقط لإظهار كيفية حصول العرض التوضيحي على مفاتيحه.


في هذا العرض التوضيحي، استخدمت bip39 الخاص بـ iancoleman لعزل المفاتيح الخاصة المطلوبة بسرعة.


## بث المعاملة الموقعة

`./sendMultiSignedTX.sh signedTXfromLastStep`



# المصادر

* https://learnmeabitcoin.com/technical/script/p2sh/
* https://bitcoin.stackexchange.com/questions/6100/how-will-multisig-addresses-work
* https://zcash.github.io/rpc/
