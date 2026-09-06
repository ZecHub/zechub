# عرض MultiSig

> **تاريخي. لم يعد هذا الدليل الإرشادي يعمل.**
>
> تعتمد كل خطوة أدناه على zcashd، الذي وصل إلى توقفه التلقائي لنهاية الدعم في 18 يوليو 2026. تتحكم النصوص البرمجية السبعة المرفقة بهذه الصفحة به عبر `zcash-cli`، لذلك لا يمكن لأيٍّ منها الوصول إلى عقدة عاملة اليوم.
>
> لا يمكن نقل هذه النصوص البرمجية آليًا. فهي مبنية على واجهات RPC للمعاملات الخام والمحفظة (`createrawtransaction`, `signrawtransaction`, `createmultisig`, `dumpprivkey`) التي أوقفها zcashd قبل التوقف؛ يستبدل Zallet تلك الواجهات بأساليب جديدة تعمل على PCZTs بدلًا من hex المعاملات الخام، ولا يزال في المرحلة التجريبية مع وجود العديد من أساليب zcashd التي لم تُنقل بعد.
>
> للحفظ متعدد الأطراف على Zcash اليوم، راجع [FROST & Threshold Custody](/zcash-tech/frost-threshold-custody)، الذي يتضمن مقارنة مباشرة مع multisig الشفاف، و[عرض Ywallet لـ FROST](/guides/frostdemo/ywallet-frost-demo). لنقل عقدة قائمة بعيدًا عن zcashd، راجع [دليل الترحيل إلى Zebra وZallet](/guides/migration-guide-zcashd-to-zebrad-zallet).
>
> تُحتفَظ بهذه الصفحة كسجل تاريخي لسير عمل multisig الشفاف.

يتطلب هذا العرض zcashd، الذي توقف في 18 يوليو 2026 ولم يعد يعمل. لا يمكن إكمال أي مما يلي على السلسلة الحية.

## جمع المفاتيح العامة من الأفراد المطلوبين

* https://github.com/iancoleman/bip39
* عند استخدام zcashd، يمكنك إنشاء UA واستخدام المستقبِل الشفاف الخاص بك أيضًا. ثم استخدم `getPubkey.sh` لاستخراج مفتاحك العام.


## إنشاء عناوين t3 لـ Multisig 2x (2 من 3)

شغّل createMultiSig.sh لإنشاء عنوان multisig وredeem script الخاصين بك. المطلوب هو 3 مفاتيح عامة

`./createMultiSig.sh pubk1 pubk2 pubk3`      # عنوان t3 الأول

`./createMultiSig.sh pubk4 pubk5 pubk6`      # عنوان t3 الثاني لعنوان الفكة. 

#### ملاحظة: في هذا المثال، pubk1 وpubk4 للشخص نفسه، وpubk2 وpubk5 للشخص نفسه، وهكذا ...

#### ملاحظة2: ترتيب مفاتيحك العامة مهم! انتبه لهذا!!!!


## تمويل عنوان t3

استخدم أي محفظة/صنبور لتمويل العنوان

## إنشاء معاملة MultiSig

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



## توقيع معاملة MultiSig

افتح signMultiSigTX.sh وأضف مفاتيحك الخاصة في المتغيرات pk1 وpk2، ...
 

*** لا أوصي بإدخال هذه في الطرفية لديك. ***


إذا كان لديك وصول إلى جميع مفاتيحك الخاصة، يمكنك استخدامها جميعًا دفعة واحدة لتوفير الوقت،
لكن في معظم الأمثلة الواقعية، سيُنفَّذ التوقيع عبر أشخاص حول العالم، لذا سيحتاج كل مشارك مطلوب إلى التوقيع،
ثم إرسال مخرجات "hex" المحدَّثة لـ raxTX التي سيستخدمها الآخرون للتوقيع وإتمام إجراء التوقيع.

أي شخص ينشئ المعاملة الأولى، سيوقّع بمفتاحه الخاص ويرسل hex الخاص بـ rawTX المحدَّث الذي يحتاج المشاركون الآخرون إلى توقيعه.

`./signMultiSigTX.sh rawTX txid voutIndex scriptPubKey redeemScript valueInitialTX`

لتوقيع هذه المعاملة، يجب أن يوقّع عليها مفتاحان خاصان على الأقل من أصل ثلاثة. إذا كان المفتاح العام الذي قدمته قد صُدِّر باستخدام عنوان T من zcashd، يمكنك الحصول على المفتاح الخاص لعنوان T الخاص بك عبر: 


`zcash-cli dumpprivkey "t-addr"`

توقف هذا الأمر مع zcashd ولا يُرجع شيئًا اليوم؛ وقد سُجِّل هنا فقط لإظهار كيفية حصول العرض على مفاتيحه.


في هذا العرض، استخدمت bip39 الخاص بـ iancoleman لعزل المفاتيح الخاصة المطلوبة بسرعة.


## بث المعاملة الموقعة

`./sendMultiSignedTX.sh signedTXfromLastStep`



# المصادر

* https://learnmeabitcoin.com/technical/script/p2sh/
* https://bitcoin.stackexchange.com/questions/6100/how-will-multisig-addresses-work
* https://zcash.github.io/rpc/
