# عرض توضيحي لـ MultiSig

> **تاريخي. لم يعد هذا الدليل الإرشادي قابلاً للتشغيل.**
>
> كل خطوة أدناه تعتمد على zcashd، الذي وصل إلى التوقف التلقائي لنهاية الدعم في 18 يوليو 2026. النصوص البرمجية السبعة المرفقة مع هذه الصفحة تقوم بتشغيله عبر `zcash-cli`، لذلك لا يمكن لأي منها الوصول إلى عقدة قيد التشغيل اليوم.
>
> لا يمكن نقل هذه النصوص البرمجية نقلاً آلياً. فهي مبنية على RPCs الخاصة بالمعاملات الخام والمحفظة (`createrawtransaction`, `signrawtransaction`, `createmultisig`, `dumpprivkey`) التي أوقف zcashd دعمها قبل التوقف؛ ويستبدلها Zallet بطرائق جديدة تعمل على PCZTs بدلاً من hex المعاملة الخام، ولا يزال في المرحلة التجريبية مع وجود العديد من طرائق zcashd التي لم تُنقل بعد.
>
> للحفظ متعدد الأطراف على Zcash اليوم، راجع [FROST والحفظ بالعتبة](/zcash-tech/frost-threshold-custody)، والذي يتضمن مقارنة مباشرة مع multisig الشفاف، والعرض التوضيحي العامل [Ywallet FROST demo](/guides/frostdemo/ywallet-frost-demo). لنقل عقدة موجودة من zcashd، راجع [دليل الترحيل إلى Zebra و Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet).
>
> تم الاحتفاظ بهذه الصفحة كسجل تاريخي لسير عمل multisig الشفاف.

يتطلب هذا العرض التوضيحي zcashd، الذي توقف في 18 يوليو 2026 ولم يعد يعمل. لا يمكن إكمال أي مما يلي على السلسلة الحية.

## اجمع المفاتيح العامة من الأفراد المطلوبين

* https://github.com/iancoleman/bip39
* إذا كنت تستخدم zcashd، يمكنك إنشاء UA واستخدام المستقبِل الشفاف الخاص بك أيضاً. ثم استخدم `getPubkey.sh` لاستخراج مفتاحك العام.


## أنشئ عناوين t3 متعددة التوقيع 2x (2 من 3)

شغّل createMultiSig.sh لإنشاء عنوان multisig الخاص بك وredeem script. المطلوب هو 3 مفاتيح عامة

`./createMultiSig.sh pubk1 pubk2 pubk3`      # أول t3

`./createMultiSig.sh pubk4 pubk5 pubk6`      # ثاني t3 لعنوان الباقي. 

#### ملاحظة: في هذا المثال pubk1 و pubk4 للشخص نفسه، و pubk2 و pubk5 للشخص نفسه، وهكذا ...

#### ملاحظة 2: ترتيب مفاتيحك العامة مهم! انتبه إلى هذا!!!!


## موّل عنوان t3

استخدم أي محفظة/facuet لتمويل العنوان

## أنشئ معاملة MultiSig

`./createMultiSigTX.sh txid voutIndex scriptPubKey redeemScript oldAmount tAddy amount changeTaddy`

حيث إن،

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

افتح signMultiSigTX.sh وأضف مفاتيحك الخاصة في المتغيرات pk1 وpk2 و ... .
 

*** لا أوصي بكتابة هذه في الطرفية الخاصة بك. ***


إذا كانت لديك إمكانية الوصول إلى جميع مفاتيحك الخاصة، فيمكنك استخدامها جميعاً دفعة واحدة لتوفير الوقت،
لكن في معظم الأمثلة الواقعية، سيتم التوقيع بواسطة أشخاص موزعين حول العالم، لذا سيحتاج كل مشارك من المشاركين المطلوبين إلى التوقيع،
ثم إعادة إرسال مخرجات "hex" المحدثة لـ raxTX التي سيستخدمها الآخرون للتوقيع من أجل إكمال إجراء التوقيع.

منشئ المعاملة الأولى سيوقّع بمفتاحه الخاص ويرسل rawTX hex المحدث الذي يحتاج إلى أن يوقّعه المشاركون الآخرون.

`./signMultiSigTX.sh rawTX txid voutIndex scriptPubKey redeemScript valueInitialTX`

لتوقيع هذه المعاملة، يجب أن يوقّع عليها مفتاحان خاصان على الأقل من أصل ثلاثة. إذا كان المفتاح العام الذي قدمته قد تم تصديره باستخدام عنوان T من zcashd، فيمكنك الحصول على المفتاح الخاص لعنوان T الخاص بك باستخدام: 


`zcash-cli dumpprivkey "t-addr"`

توقف هذا الأمر مع zcashd ولا يعيد شيئاً اليوم؛ وقد سُجِّل هنا فقط لإظهار كيفية حصول العرض التوضيحي على مفاتيحه.


في هذا العرض التوضيحي، استخدمت bip39 الخاصة بـ iancoleman لعزل المفاتيح الخاصة المطلوبة بسرعة.


## ابثّ المعاملة الموقّعة

`./sendMultiSignedTX.sh signedTXfromLastStep`



# المصادر

* https://learnmeabitcoin.com/technical/script/p2sh/
* https://bitcoin.stackexchange.com/questions/6100/how-will-multisig-addresses-work
* https://zcash.github.io/rpc/
