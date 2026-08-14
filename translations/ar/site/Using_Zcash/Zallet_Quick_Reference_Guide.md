---
<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Zallet_Quick_Reference_Guide.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="تحرير الصفحة"/>
</a>

# دليل مرجعي سريع لـ Zallet

## الخلاصة

- Zallet هي محفظة Zcash كاملة العقدة مكتوبة بلغة Rust. وهي تحل محل المحفظة التي كانت موجودة سابقًا داخل zcashd.
- وصل zcashd إلى توقف نهاية الدعم الخاص به في 18 يوليو 2026 ولم يعد يعمل. تتولى Zebra الآن جانب العقدة؛ ويتولى Zallet جانب المحفظة.
- يمكنك تشغيل Zallet من سطر الأوامر باستخدام `zallet rpc <command>`، على نحو مشابه لاستخدامك السابق لـ `zcash-cli`.
- يجب أن تكون كل وسيطة بعد اسم الأمر JSON صالحًا، ما يعني أن القيم النصية تحتفظ بعلامات الاقتباس المزدوجة الخاصة بها.
- لا يزال Zallet في مرحلة alpha. قد تتغير الأوامر بين الإصدارات، ولم يتم بعد نقل كل RPC خاص بـ zcashd.

## شرح أساسي

يعرض Zallet وظائفه عبر JSON-RPC، وهي نفس واجهة النمط التي كانت تستخدمها محفظة zcashd. أي شيء تريد من المحفظة القيام به — مثل التحقق من الرصيد، أو إنشاء حساب، أو إرسال دفعة محمية — هو أمر تمرّره إلى `zallet rpc`.

يوجد اختلافان عن عادة `zcash-cli` القديمة، وهما سبب معظم الأخطاء المبكرة. أولًا، يجب أن تكون الوسيطات JSON صالحًا بدلًا من نص مجرد، لذلك تحمل الوسيطة النصية علامات الاقتباس الخاصة بها داخل اقتباسات shell. ثانيًا، تعتمد مجموعة الأوامر المتاحة على إصدار alpha الذي تشغله، لذا فإن القائمة المضمّنة في الملف التنفيذي لديك أكثر موثوقية من أي صفحة مكتوبة، بما في ذلك هذه الصفحة.

لعرض جميع RPCs المتاحة:

```bash
zallet rpc help
```

للحصول على مساعدة مفصلة لـ RPC معيّن:

```bash
zallet rpc help '"<command>"'
```

> **مهم:** يجب أن تكون كل وسيطة بعد اسم الدالة **JSON صالحًا**.  
> يجب كتابة القيم النصية بالشكل `"value"` (بما في ذلك علامات الاقتباس المزدوجة).

## الأخطاء الشائعة

- **إسقاط علامات الاقتباس الداخلية في الوسيطات النصية.** يفشل `zallet rpc validateaddress u1abc...`، لأن العنوان يجب أن يصل بصيغة JSON. يجب كتابته هكذا `'"u1abc..."'`.
- **افتراض أن كل RPC خاص بـ zcashd موجود هنا.** لا تزال عملية النقل جارية. بعض الدوال تتصرف بشكل مطابق، وبعضها يحتاج إلى استخدام مختلف، وبعضها لن يتم نقله أصلًا.
- **اعتبار هذه الصفحة مرجعًا أعلى من الملف التنفيذي لديك.** Zallet في مرحلة alpha ويتطور بسرعة. عندما لا يعمل أمر مذكور هنا، تحقّق من `zallet rpc help` قبل افتراض وجود عطل.
- **توقّع أن يكون Zallet عقدة.** إنه نصف المحفظة من هذا الزوج. تقوم Zebra بتشغيل العقدة، ويتواصل Zallet معها.

## أوامر RPC

### decoderawtransaction

```bash
zallet rpc decoderawtransaction '"<hexstring>"'
```

| المعامل   | النوع  | مطلوب | الوصف                     |
|-----------|--------|--------|---------------------------|
| hexstring | string | نعم    | سلسلة hex للمعاملة        |

---

### decodescript

```bash
zallet rpc decodescript '"<hexstring>"'
```

| المعامل   | النوع  | مطلوب | الوصف            |
|-----------|--------|--------|------------------|
| hexstring | string | نعم    | hex الخاص بالسكريبت |

---

### getrawtransaction

```bash
zallet rpc getrawtransaction '"<txid>"' [verbose] ['"<blockhash>"']
```

| المعامل   | النوع  | مطلوب | الافتراضي | الوصف                              |
|-----------|--------|--------|-----------|------------------------------------|
| txid      | string | نعم    |           | معرّف المعاملة                     |
| verbose   | number | لا     | 0         | `0` = hex، وغير الصفر = كائن JSON |
| blockhash | string | لا     |           | حصر البحث في هذه الكتلة            |

---

### getwalletinfo

```bash
zallet rpc getwalletinfo
```

لا توجد معاملات.

---

### getwalletstatus

```bash
zallet rpc getwalletstatus
```

لا توجد معاملات.

---

### listaddresses

```bash
zallet rpc listaddresses
```

لا توجد معاملات.

---

### rpc.discover

```bash
zallet rpc rpc.discover
```

لا توجد معاملات. يعيد مخطط OpenRPC.

---

### stop

```bash
zallet rpc stop
```

لا توجد معاملات. (Regtest فقط)

---

### validateaddress

```bash
zallet rpc validateaddress '"<address>"'
```

| المعامل | النوع  | مطلوب | الوصف             |
|---------|--------|--------|-------------------|
| address | string | نعم    | عنوان شفاف        |

---

### verifymessage

```bash
zallet rpc verifymessage '"<address>"' '"<signature>"' '"<message>"'
```

| المعامل   | النوع  | مطلوب | الوصف               |
|-----------|--------|--------|---------------------|
| address   | string | نعم    | عنوان شفاف          |
| signature | string | نعم    | توقيع Base64        |
| message   | string | نعم    | الرسالة الأصلية     |

---

### walletlock

```bash
zallet rpc walletlock
```

لا توجد معاملات.

---

### walletpassphrase

```bash
zallet rpc walletpassphrase '"<passphrase>"' <timeout>
```

| المعامل    | النوع  | مطلوب | الوصف                              |
|------------|--------|--------|------------------------------------|
| passphrase | string | نعم    | عبارة مرور المحفظة                 |
| timeout    | number | نعم    | عدد الثواني لإبقاء المحفظة غير مقفلة |

---

### z_converttex

```bash
zallet rpc z_converttex '"<transparent_address>"'
```

| المعامل              | النوع  | مطلوب | الوصف                      |
|----------------------|--------|--------|----------------------------|
| transparent_address  | string | نعم    | عنوان P2PKH للتحويل        |

---

### z_exportkey

```bash
zallet rpc z_exportkey '"<sapling_address>"'
```

| المعامل | النوع  | مطلوب | الوصف                                              |
|---------|--------|--------|----------------------------------------------------|
| address | string | نعم    | عنوان Sapling الذي سيتم تصدير مفتاح الإنفاق الخاص به |

> يجب أن تكون المحفظة غير مقفلة. يتم تصدير مفتاح الإنفاق الخاص بـ Sapling فقط.

---

### z_getaccount

```bash
zallet rpc z_getaccount '"<account_uuid>"'
```

| المعامل      | النوع  | مطلوب | الوصف           |
|--------------|--------|--------|-----------------|
| account_uuid | string | نعم    | UUID الحساب     |

---

### z_getaddressforaccount

```bash
zallet rpc z_getaddressforaccount <account> ['["p2pkh","sapling","orchard"]'] [<diversifier_index>]
```

| المعامل           | النوع            | مطلوب | الوصف                                 |
|-------------------|------------------|--------|---------------------------------------|
| account           | string / number  | نعم    | UUID الحساب أو فهرس حساب ZIP-32       |
| receiver_types    | array of string  | لا     | أنواع المستلِمات المطلوب تضمينها      |
| diversifier_index | number           | لا     | فهرس diversifier محدد                 |

---

### z_getbalanceforaccount

```bash
zallet rpc z_getbalanceforaccount <account> [<minconf>]
```

| المعامل | النوع           | مطلوب | الافتراضي | الوصف                           |
|---------|-----------------|--------|-----------|---------------------------------|
| account | string / number | نعم    |           | UUID الحساب أو فهرس ZIP-32      |
| minconf | number          | لا     | 1         | الحد الأدنى لعدد التأكيدات      |

---

### z_getbalances

```bash
zallet rpc z_getbalances [<minconf>]
```

| المعامل | النوع  | مطلوب | الافتراضي | الوصف                      |
|---------|--------|--------|-----------|----------------------------|
| minconf | number | لا     | 1         | الحد الأدنى لعدد التأكيدات |

---

### z_getnewaccount

```bash
zallet rpc z_getnewaccount '"<account_name>"' ['"<seedfp>"']
```

| المعامل      | النوع  | مطلوب | الوصف                                  |
|--------------|--------|--------|----------------------------------------|
| account_name | string | نعم    | اسم سهل القراءة للبشر                  |
| seedfp       | string | لا     | مطلوب إذا كانت المحفظة تحتوي على عدة seeds |

---

### z_getnotescount

```bash
zallet rpc z_getnotescount [<minconf>] [<as_of_height>]
```

| المعامل      | النوع  | مطلوب | الافتراضي | الوصف                                 |
|--------------|--------|--------|-----------|---------------------------------------|
| minconf      | number | لا     | 1         | الحد الأدنى لعدد التأكيدات            |
| as_of_height | number | لا     |           | الاستعلام عند هذا الارتفاع (`-1` = tip) |

---

### z_getoperationresult

```bash
zallet rpc z_getoperationresult ['["opid1","opid2"]']
```

| المعامل    | النوع            | مطلوب | الوصف                                        |
|------------|------------------|--------|----------------------------------------------|
| operationid| array of string  | لا     | معرّفات العمليات (اتركه فارغًا لكل المنتهية) |

---

### z_getoperationstatus

```bash
zallet rpc z_getoperationstatus ['["opid1","opid2"]']
```

| المعامل    | النوع            | مطلوب | الوصف                               |
|------------|------------------|--------|-------------------------------------|
| operationid| array of string  | لا     | معرّفات العمليات (اتركه فارغًا للكل) |

---

### z_gettotalbalance

```bash
zallet rpc z_gettotalbalance [<minconf>] [<include_watchonly>]
```

| المعامل           | النوع   | مطلوب | الافتراضي | الوصف                        |
|-------------------|---------|--------|-----------|------------------------------|
| minconf           | number  | لا     | 1         | الحد الأدنى لعدد التأكيدات   |
| include_watchonly | boolean | لا     | false     | تضمين أرصدة watch-only       |

---

### z_importaddress

```bash
zallet rpc z_importaddress '"<account_uuid>"' '"<hex_data>"' [<rescan>]
```

| المعامل  | النوع   | مطلوب | الافتراضي | الوصف                               |
|----------|---------|--------|-----------|-------------------------------------|
| account  | string  | نعم    |           | UUID الحساب                         |
| hex_data | string  | نعم    |           | مفتاح عام بصيغة hex أو redeem script |
| rescan   | boolean | لا     | true      | إعادة المسح بعد الاستيراد           |

---

### z_importkey

```bash
zallet rpc z_importkey '"<key>"' ['"<rescan>"'] [<start_height>]
```

| المعامل      | النوع  | مطلوب | الافتراضي      | الوصف                               |
|--------------|--------|--------|----------------|-------------------------------------|
| key          | string | نعم    |                | مفتاح إنفاق ممتد لـ Sapling         |
| rescan       | string | لا     | `"whenkeyisnew"` | `"yes"` أو `"no"` أو `"whenkeyisnew"` |
| start_height | number | لا     | 0              | ارتفاع بدء إعادة المسح              |

---

### z_listaccounts

```bash
zallet rpc z_listaccounts [<include_addresses>]
```

| المعامل           | النوع   | مطلوب | الافتراضي | الوصف                                 |
|-------------------|---------|--------|-----------|---------------------------------------|
| include_addresses | boolean | لا     | true      | إعادة العناوين أيضًا لكل حساب         |

---

### z_listoperationids

```bash
zallet rpc z_listoperationids ['"<status>"']
```

| المعامل | النوع  | مطلوب | الوصف                                  |
|---------|--------|--------|----------------------------------------|
| status  | string | لا     | التصفية حسب الحالة (مثل `"success"`)   |

---

### z_listtransactions

```bash
zallet rpc z_listtransactions ['"<account_uuid>"'] [<start_height>] [<end_height>] [<offset>] [<limit>]
```

| المعامل     | النوع  | مطلوب | الوصف                         |
|-------------|--------|--------|-------------------------------|
| account_uuid| string | لا     | الحصر في حساب واحد            |
| start_height| number | لا     | الحد الأدنى الشامل            |
| end_height  | number | لا     | الحد الأعلى غير الشامل        |
| offset      | number | لا     | تخطَّ هذا العدد من النتائج    |
| limit       | number | لا     | الحد الأقصى للنتائج المعادة   |

---

### z_listunifiedreceivers

```bash
zallet rpc z_listunifiedreceivers '"<unified_address>"'
```

| المعامل         | النوع  | مطلوب | الوصف                              |
|-----------------|--------|--------|------------------------------------|
| unified_address | string | نعم    | Unified Address المطلوب فحصه       |

---

### z_listunspent

```bash
zallet rpc z_listunspent [<minconf>] [<maxconf>] [<include_watchonly>] ['["addr1","addr2"]'] [<as_of_height>]
```

| المعامل           | النوع            | مطلوب | الافتراضي | الوصف                           |
|-------------------|------------------|--------|-----------|---------------------------------|
| minconf           | number           | لا     | 1         | الحد الأدنى لعدد التأكيدات      |
| maxconf           | number           | لا     | ∞         | الحد الأقصى لعدد التأكيدات      |
| include_watchonly | boolean          | لا     | false     | تضمين watch-only                |
| addresses         | array of string  | لا     |           | التصفية إلى هذه العناوين        |
| as_of_height      | number           | لا     |           | الاستعلام عند هذا الارتفاع      |

---

### z_recoveraccounts

```bash
zallet rpc z_recoveraccounts '[{"name":"...","seedfp":"...","zip32_account_index":0,"birthday_height":123456}]'
```

| المعامل | النوع | مطلوب | الوصف                                                                       |
|---------|-------|--------|-----------------------------------------------------------------------------|
| accounts| array | نعم    | مصفوفة من الكائنات: `name` و`seedfp` و`zip32_account_index` و`birthday_height` |

---

### z_sendmany

```bash
zallet rpc z_sendmany '"<fromaddress>"' '[{"address":"...","amount":1.23,"memo":"..."}]' [<minconf>] [null] ['"<privacy_policy>"']
```

| المعامل        | النوع            | مطلوب | الافتراضي       | الوصف                                           |
|----------------|------------------|--------|-----------------|-------------------------------------------------|
| fromaddress    | string           | نعم    |                 | عنوان المصدر أو `"ANY_TADDR"`                   |
| amounts        | array of object  | نعم    |                 | المستلمون (`address` و`amount` و`memo` اختياري) |
| minconf        | number           | لا     |                 | الحد الأدنى لعدد التأكيدات                      |
| fee            | null             | لا     |                 | يجب أن تكون `null` (ZIP-317 فقط)                |
| privacy_policy | string           | لا     | `"FullPrivacy"` | سلسلة سياسة الخصوصية                            |

---

### z_shieldcoinbase

```bash
zallet rpc z_shieldcoinbase '"<fromaddress_or_account_uuid>"' '"<toaddress>"' [null] [<limit>] ['"<memo_hex>"'] ['"<privacy_policy>"']
```

| المعامل        | النوع  | مطلوب | الوصف                                                |
|----------------|--------|--------|------------------------------------------------------|
| fromaddress    | string | نعم    | عنوان شفاف أو UUID الحساب                            |
| toaddress      | string | نعم    | وجهة محمية                                           |
| fee            | null   | لا     | يجب أن تكون `null`                                   |
| limit          | number | لا     | الحد الأقصى لعدد UTXOs الخاصة بـ coinbase للحجب      |
| memo           | string | لا     | memo مُرمّز بصيغة hex                                |
| privacy_policy | string | لا     | `AllowRevealedSenders` أو `AllowLinkingAccountAddresses` |

---

### z_viewtransaction

```bash
zallet rpc z_viewtransaction '"<txid>"'
```

| المعامل | النوع  | مطلوب | الوصف           |
|---------|--------|--------|-----------------|
| txid    | string | نعم    | معرّف المعاملة  |

---

## صفحات ذات صلة

- [دليل الانتقال: من Zcashd إلى Zebrad و Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet) — انتقال خطوة بخطوة من إعداد zcashd قائم
- [عقدة Zebra الكاملة](/zcash-tech/zebra-full-node) — تنفيذ العقدة الذي يعمل Zallet إلى جانبه
- [العقد الكاملة](/zcash-tech/full-nodes) — ما الذي ينطوي عليه تشغيل عقدة كاملة ولماذا قد ترغب في واحدة
- [المحافظ](/using-zcash/wallets) — خيارات محافظ أخف إذا كانت عقدة كاملة أكبر من حاجتك
- [المعاملات](/using-zcash/transactions) — كيف تختلف المعاملات المحمية والشفافة
