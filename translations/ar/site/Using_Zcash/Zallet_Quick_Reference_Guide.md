<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Zallet_Quick_Reference_Guide.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# دليل مرجعي سريع لـ Zallet

## الخلاصة (TL;DR)

- Zallet هي محفظة (wallet) عقدة كاملة (full node) لـ Zcash مكتوبة بلغة Rust. وهي تحل محل المحفظة التي كانت مدمجة سابقًا داخل zcashd.
- وصل zcashd إلى توقف نهاية الدعم (End-of-Support) في 18 يوليو 2026 ولم يعد يعمل. يتولى Zebra الآن جانب العقدة (node)، ويتولى Zallet جانب المحفظة.
- تتحكم في Zallet من سطر الأوامر باستخدام `zallet rpc <command>`، تمامًا كما كنت تستخدم `zcash-cli` من قبل.
- يجب أن تكون كل وسيطة بعد اسم الأمر بصيغة JSON صالحة، ما يعني أن القيم النصية تحتفظ بعلامات الاقتباس المزدوجة.
- Zallet في مرحلة تجريبية (beta). قد تتغير الأوامر بين الإصدارات، ولم تُنقل جميع استدعاءات RPC الخاصة بـ zcashd بعد.

## الشرح الأساسي

يعرض Zallet وظائفه عبر JSON-RPC، وهو نمط الواجهة نفسه الذي استخدمته محفظة zcashd. أي شيء تريد من المحفظة القيام به، سواء التحقق من رصيد أو إنشاء حساب أو إرسال دفع (payment) محمي (shielded)، هو أمر تمرره إلى `zallet rpc`.

يختلف أمران عن العادة القديمة في `zcash-cli` ويفسران معظم الأخطاء المبكرة. أولًا، يجب أن تكون الوسيطات بصيغة JSON صالحة بدلًا من نص مجرد، لذا تحمل الوسيطة النصية علامات الاقتباس الخاصة بها داخل علامات اقتباس الصدفة (shell). ثانيًا، تعتمد مجموعة الأوامر المتاحة على الإصدار التجريبي الذي تشغّله، لذا فإن القائمة المدمجة في ملفك التنفيذي أكثر موثوقية من أي صفحة مكتوبة، بما في ذلك هذه الصفحة.

لعرض جميع استدعاءات RPC المتاحة:

```bash
zallet rpc help
```

للحصول على مساعدة تفصيلية حول استدعاء RPC محدد:

```bash
zallet rpc help '"<command>"'
```

> **مهم:** يجب أن تكون كل وسيطة بعد اسم الطريقة **بصيغة JSON صالحة**.  
> يجب كتابة القيم النصية بالشكل `"value"` (بما في ذلك علامات الاقتباس المزدوجة).

## الأخطاء الشائعة

- **حذف علامات الاقتباس الداخلية من الوسيطات النصية.** يفشل `zallet rpc validateaddress u1abc...` لأن العنوان (address) يجب أن يصل بصيغة JSON. يجب كتابته بالشكل `'"u1abc..."'`.
- **افتراض أن كل استدعاءات  RPC موجودة هنا.** لا يزال النقل جاريًا. بعض الطرق تعمل بشكل مطابق، وبعضها يتطلب استخدامًا مختلفًا، وبعضها لن يُنقل على الإطلاق.
- **اعتبار هذه الصفحة مرجعًا أعلى من ملفك التنفيذي.** Zallet في مرحلة تجريبية ويتطور بسرعة. عندما لا يعمل أمر مذكور هنا، تحقق من `zallet rpc help` قبل أن تفترض أن هناك خللًا.
- **توقع أن يكون Zallet عقدة.** إنه نصف المحفظة من هذا الثنائي. يشغّل Zebra العقدة، ويتواصل معها Zallet.

## أوامر RPC

### decoderawtransaction

```bash
zallet rpc decoderawtransaction '"<hexstring>"'
```

| الوسيطة   | النوع   | مطلوب | الوصف              |
|-------------|--------|----------|--------------------------|
| hexstring   | سلسلة نصية | نعم      | سلسلة hex للمعاملة (transaction)   |

---

### decodescript

```bash
zallet rpc decodescript '"<hexstring>"'
```

| الوسيطة   | النوع   | مطلوب | الوصف     |
|-------------|--------|----------|-----------------|
| hexstring   | سلسلة نصية | نعم      | سكربت بصيغة hex      |

---

### getrawtransaction

```bash
zallet rpc getrawtransaction '"<txid>"' [verbose] ['"<blockhash>"']
```

| الوسيطة  | النوع   | مطلوب | الافتراضي | الوصف                          |
|------------|--------|----------|---------|--------------------------------------|
| txid       | سلسلة نصية | نعم      |         | معرّف المعاملة                       |
| verbose    | رقم | لا       | 0       | `0` = hex، غير الصفر = كائن JSON    |
| blockhash  | سلسلة نصية | لا       |         | حصر البحث في هذه الكتلة (block)        |

---

### getwalletinfo

```bash
zallet rpc getwalletinfo
```

لا توجد وسيطات.

---

### getwalletstatus

```bash
zallet rpc getwalletstatus
```

لا توجد وسيطات.

---

### listaddresses

```bash
zallet rpc listaddresses
```

لا توجد وسيطات.

---

### rpc.discover

```bash
zallet rpc rpc.discover
```

لا توجد وسيطات. يعيد مخطط OpenRPC.

---

### stop

```bash
zallet rpc stop
```

لا توجد وسيطات. (في Regtest فقط)

---

### validateaddress

```bash
zallet rpc validateaddress '"<address>"'
```

| الوسيطة | النوع   | مطلوب | الوصف             |
|-----------|--------|----------|-------------------------|
| address   | سلسلة نصية | نعم      | عنوان شفاف (transparent)     |

---

### verifymessage

```bash
zallet rpc verifymessage '"<address>"' '"<signature>"' '"<message>"'
```

| الوسيطة  | النوع   | مطلوب | الوصف             |
|------------|--------|----------|-------------------------|
| address    | سلسلة نصية | نعم      | عنوان شفاف     |
| signature  | سلسلة نصية | نعم      | توقيع رقمي (signature) بصيغة Base64        |
| message    | سلسلة نصية | نعم      | الرسالة الأصلية        |

---

### walletlock

```bash
zallet rpc walletlock
```

لا توجد وسيطات.

---

### walletpassphrase

```bash
zallet rpc walletpassphrase '"<passphrase>"' <timeout>
```

| الوسيطة   | النوع   | مطلوب | الوصف                          |
|-------------|--------|----------|--------------------------------------|
| passphrase  | سلسلة نصية | نعم      | عبارة مرور المحفظة                    |
| timeout     | رقم | نعم      | عدد الثواني لإبقاء المحفظة مفتوحة  |

---

### z_converttex

```bash
zallet rpc z_converttex '"<transparent_address>"'
```

| الوسيطة             | النوع   | مطلوب | الوصف                |
|-----------------------|--------|----------|----------------------------|
| transparent_address   | سلسلة نصية | نعم      | عنوان P2PKH المراد تحويله   |

---

### z_exportkey

```bash
zallet rpc z_exportkey '"<sapling_address>"'
```

| الوسيطة | النوع   | مطلوب | الوصف                                      |
|-----------|--------|----------|--------------------------------------------------|
| address   | سلسلة نصية | نعم      | عنوان Sapling المراد تصدير مفتاح الإنفاق (spending key) الخاص به     |

> يجب أن تكون المحفظة مفتوحة. يصدّر مفتاح الإنفاق الخاص بـ Sapling فقط.

---

### z_getaccount

```bash
zallet rpc z_getaccount '"<account_uuid>"'
```

| الوسيطة     | النوع   | مطلوب | الوصف     |
|---------------|--------|----------|-----------------|
| account_uuid  | سلسلة نصية | نعم      | معرّف UUID للحساب    |

---

### z_getaddressforaccount

```bash
zallet rpc z_getaddressforaccount <account> ['["p2pkh","sapling","orchard"]'] [<diversifier_index>]
```

| الوسيطة          | النوع            | مطلوب | الوصف                              |
|--------------------|-----------------|----------|------------------------------------------|
| account            | سلسلة نصية / رقم | نعم      | معرّف UUID للحساب أو فهرس الحساب وفق ZIP-32     |
| receiver_types     | مصفوفة سلاسل نصية | لا       | أنواع المستقبِلات المراد تضمينها                |
| diversifier_index  | رقم          | لا       | فهرس مُنوِّع (diversifier) محدد               |

---

### z_getbalanceforaccount

```bash
zallet rpc z_getbalanceforaccount <account> [<minconf>]
```

| الوسيطة | النوع            | مطلوب | الافتراضي | الوصف                      |
|-----------|-----------------|----------|---------|----------------------------------|
| account   | سلسلة نصية / رقم | نعم      |         | معرّف UUID للحساب أو فهرس ZIP-32     |
| minconf   | رقم          | لا       | 1       | الحد الأدنى من التأكيدات            |

---

### z_getbalances

```bash
zallet rpc z_getbalances [<minconf>]
```

| الوسيطة | النوع   | مطلوب | الافتراضي | الوصف               |
|-----------|--------|----------|---------|---------------------------|
| minconf   | رقم | لا       | 1       | الحد الأدنى من التأكيدات     |

---

### z_getnewaccount

```bash
zallet rpc z_getnewaccount '"<account_name>"' ['"<seedfp>"']
```

| الوسيطة     | النوع   | مطلوب | الوصف                              |
|---------------|--------|----------|------------------------------------------|
| account_name  | سلسلة نصية | نعم      | اسم مقروء للبشر                      |
| seedfp        | سلسلة نصية | لا       | مطلوب إذا كانت المحفظة تحتوي على عدة بذور    |

---

### z_getnotescount

```bash
zallet rpc z_getnotescount [<minconf>] [<as_of_height>]
```

| الوسيطة     | النوع   | مطلوب | الافتراضي | الوصف                          |
|---------------|--------|----------|---------|--------------------------------------|
| minconf       | رقم | لا       | 1       | الحد الأدنى من التأكيدات                |
| as_of_height  | رقم | لا       |         | الاستعلام حتى هذا الارتفاع (`-1` = القمة) |

---

### z_getoperationresult

```bash
zallet rpc z_getoperationresult ['["opid1","opid2"]']
```

| الوسيطة    | النوع            | مطلوب | الوصف                              |
|--------------|-----------------|----------|------------------------------------------|
| operationid  | مصفوفة سلاسل نصية | لا       | معرّفات العمليات (احذفها لكل العمليات المنتهية)    |

---

### z_getoperationstatus

```bash
zallet rpc z_getoperationstatus ['["opid1","opid2"]']
```

| الوسيطة    | النوع            | مطلوب | الوصف                    |
|--------------|-----------------|----------|--------------------------------|
| operationid  | مصفوفة سلاسل نصية | لا       | معرّفات العمليات (احذفها للكل)   |

---

### z_gettotalbalance

```bash
zallet rpc z_gettotalbalance [<minconf>] [<include_watchonly>]
```

| الوسيطة          | النوع    | مطلوب | الافتراضي | الوصف                     |
|--------------------|---------|----------|---------|---------------------------------|
| minconf            | رقم  | لا       | 1       | الحد الأدنى من التأكيدات           |
| include_watchonly  | قيمة منطقية | لا       | false   | تضمين أرصدة المراقبة فقط     |

---

### z_importaddress

```bash
zallet rpc z_importaddress '"<account_uuid>"' '"<hex_data>"' [<rescan>]
```

| الوسيطة  | النوع    | مطلوب | الافتراضي | الوصف                          |
|------------|---------|----------|---------|--------------------------------------|
| account    | سلسلة نصية  | نعم      |         | معرّف UUID للحساب                         |
| hex_data   | سلسلة نصية  | نعم      |         | مفتاح عام بصيغة hex أو سكربت استرداد      |
| rescan     | قيمة منطقية | لا       | true    | إعادة الفحص بعد الاستيراد                  |

---

### z_importkey

```bash
zallet rpc z_importkey '"<key>"' ['"<rescan>"'] [<start_height>]
```

| الوسيطة     | النوع   | مطلوب | الافتراضي        | الوصف                              |
|---------------|--------|----------|----------------|------------------------------------------|
| key           | سلسلة نصية | نعم      |                | مفتاح الإنفاق الممتد لـ Sapling            |
| rescan        | سلسلة نصية | لا       | `"whenkeyisnew"` | `"yes"` أو `"no"` أو `"whenkeyisnew"`   |
| start_height  | رقم | لا       | 0              | ارتفاع بدء إعادة الفحص                      |

---

### z_listaccounts

```bash
zallet rpc z_listaccounts [<include_addresses>]
```

| الوسيطة          | النوع    | مطلوب | الافتراضي | الوصف                              |
|--------------------|---------|----------|---------|------------------------------------------|
| include_addresses  | قيمة منطقية | لا       | true    | إعادة العناوين أيضًا لكل حساب   |

---

### z_listoperationids

```bash
zallet rpc z_listoperationids ['"<status>"']
```

| الوسيطة | النوع   | مطلوب | الوصف                          |
|-----------|--------|----------|--------------------------------------|
| status    | سلسلة نصية | لا       | التصفية حسب الحالة (مثل `"success"`)  |

---

### z_listtransactions

```bash
zallet rpc z_listtransactions ['"<account_uuid>"'] [<start_height>] [<end_height>] [<offset>] [<limit>]
```

| الوسيطة      | النوع   | مطلوب | الوصف                  |
|----------------|--------|----------|------------------------------|
| account_uuid   | سلسلة نصية | لا       | الاقتصار على حساب واحد         |
| start_height   | رقم | لا       | الحد الأدنى (شامل)        |
| end_height     | رقم | لا       | الحد الأعلى (غير شامل)        |
| offset         | رقم | لا       | تخطي هذا العدد من النتائج       |
| limit          | رقم | لا       | الحد الأقصى للنتائج المُعادة    |

---

### z_listunifiedreceivers

```bash
zallet rpc z_listunifiedreceivers '"<unified_address>"'
```

| الوسيطة         | النوع   | مطلوب | الوصف                  |
|-------------------|--------|----------|------------------------------|
| unified_address   | سلسلة نصية | نعم      | العنوان الموحد (Unified Address) المراد فحصه   |

---

### z_listunspent

```bash
zallet rpc z_listunspent [<minconf>] [<maxconf>] [<include_watchonly>] ['["addr1","addr2"]'] [<as_of_height>]
```

| الوسيطة          | النوع            | مطلوب | الافتراضي | الوصف                          |
|--------------------|-----------------|----------|---------|--------------------------------------|
| minconf            | رقم          | لا       | 1       | الحد الأدنى من التأكيدات                |
| maxconf            | رقم          | لا       | ∞       | الحد الأقصى من التأكيدات                |
| include_watchonly  | قيمة منطقية         | لا       | false   | تضمين المراقبة فقط                   |
| addresses          | مصفوفة سلاسل نصية | لا       |         | التصفية حسب هذه العناوين            |
| as_of_height       | رقم          | لا       |         | الاستعلام حتى هذا الارتفاع              |

---

### z_recoveraccounts

```bash
zallet rpc z_recoveraccounts '[{"name":"...","seedfp":"...","zip32_account_index":0,"birthday_height":123456}]'
```

| الوسيطة | النوع  | مطلوب | الوصف                                                                 |
|-----------|-------|----------|-----------------------------------------------------------------------------|
| accounts  | مصفوفة | نعم      | مصفوفة من الكائنات: `name`، `seedfp`، `zip32_account_index`، `birthday_height` |

---

### z_sendmany

```bash
zallet rpc z_sendmany '"<fromaddress>"' '[{"address":"...","amount":1.23,"memo":"..."}]' [<minconf>] [null] ['"<privacy_policy>"']
```

| الوسيطة        | النوع            | مطلوب | الافتراضي         | الوصف                                      |
|------------------|-----------------|----------|-----------------|--------------------------------------------------|
| fromaddress      | سلسلة نصية          | نعم      |                 | عنوان المصدر أو `"ANY_TADDR"`                  |
| amounts          | مصفوفة كائنات | نعم      |                 | المستلمون (`address`، `amount`، و`memo` اختياري)|
| minconf          | رقم          | لا       |                 | الحد الأدنى من التأكيدات                            |
| fee              | null            | لا       |                 | يجب أن تكون الرسوم (fee) `null` (ZIP-317 فقط)                    |
| privacy_policy   | سلسلة نصية          | لا       | `"FullPrivacy"` | سلسلة سياسة الخصوصية (privacy)                            |

---

### z_shieldcoinbase

```bash
zallet rpc z_shieldcoinbase '"<fromaddress_or_account_uuid>"' '"<toaddress>"' [null] [<limit>] ['"<memo_hex>"'] ['"<privacy_policy>"']
```

| الوسيطة        | النوع   | مطلوب | الوصف                                      |
|------------------|--------|----------|--------------------------------------------------|
| fromaddress      | سلسلة نصية | نعم      | عنوان شفاف أو معرّف UUID للحساب              |
| toaddress        | سلسلة نصية | نعم      | وجهة محمية                             |
| fee              | null   | لا       | يجب أن تكون `null`                                   |
| limit            | رقم | لا       | الحد الأقصى لعدد مخرجات coinbase غير المنفقة (UTXOs) المراد حمايتها           |
| memo             | سلسلة نصية | لا       | مذكرة (memo) مرمّزة بصيغة hex                                 |
| privacy_policy   | سلسلة نصية | لا       | `AllowRevealedSenders` أو `AllowLinkingAccountAddresses` |

---

### z_viewtransaction

```bash
zallet rpc z_viewtransaction '"<txid>"'
```

| الوسيطة | النوع   | مطلوب | الوصف     |
|-----------|--------|----------|-----------------|
| txid      | سلسلة نصية | نعم      | معرّف المعاملة  |

---

## صفحات ذات صلة

- [دليل الترحيل: من zcashd إلى Zebrad وـ Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet) — انتقال خطوة بخطوة من إعداد zcashd قائم
- [العقدة الكاملة Zebra](/zcash-tech/zebra-full-node) — تطبيق العقدة الذي يعمل Zallet إلى جانبه
- [العقد الكاملة](/zcash-tech/full-nodes) — ما الذي يتطلبه تشغيل عقدة كاملة ولماذا قد ترغب في واحدة
- [المحافظ](/using-zcash/wallets) — خيارات محافظ أخف إذا كانت العقدة الكاملة أكثر مما تحتاج
- [المعاملات](/using-zcash/transactions) — كيف تختلف المعاملات المحمية عن المعاملات الشفافة
