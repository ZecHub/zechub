<a href="https://github.com/zechub/zechub/edit/main/site/guides/Crosslink_Feature_Net.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="تحرير الصفحة"/>
</a>

# انضم إلى Crosslink Feature Net

## الخلاصة

- إن Feature Net هي شبكة الاختبار العامة لـShielded Labs من أجل [Crosslink](/zcash-tech/crosslink-protocol)، طبقة النهائية المقترحة التي تضيف التخزين بجانب إثبات العمل الخاص بـZcash.
- تعمل على عملة اختبارية هي cTAZ. لا شيء تفعله عليها ينقل ZEC للشبكة الرئيسية أو يعرّضه للخطر.
- تطبيق سطح مكتب واحد هو العقدة والمُعدّن والمحفظة والمُنهي. يُعدّن cTAZ افتراضياً ويحتوي على زر صنبور.
- لا يعمل التخزين وفك التخزين والسحب إلا خلال "يوم التخزين"، وهو يوم واحد من كل ثلاثة أيام. إن فاتك، تنتظر اليوم التالي.
- للتخزين، تلصق هوية مُنهٍ وتنقر مبلغاً. يستخدم هذا الدليل مُنهِي ZecHub كمثال.
- يُظهر استدعاءا RPC موضعك: `wallet_staking_positions` و`get_tfl_recency_status`.

*تم الاختبار باستخدام الإصدار 14 من Feature Net على Windows 11 (الإصدار 10.0.26200.9550)، من 8 إلى 10 أكتوبر 2026. البرنامج نموذج أولي ويتغير مع كل إصدار. إذا كان ما تراه يختلف عن هذه الصفحة، فثق بنتيجة تشغيلك وافتح PR من فضلك.*

## ما هي Feature Net

Crosslink هي مقترح، وليست جزءاً من Zcash اليوم. تقول الأسئلة الشائعة لـShielded Labs [Crosslink FAQ](https://shieldedlabs.net/crosslink-faq/) إنها "ستحتاج إلى المرور بعملية حوكمة Zcash القياسية" قبل أن تصل إلى الشبكة الرئيسية. تشرح صفحة [Crosslink Protocol](/zcash-tech/crosslink-protocol) التصميم.

لاختبار التصميم مع مستخدمين حقيقيين، تشغّل Shielded Labs ما تسميه [incentivized feature nets](https://shieldedlabs.net/crosslink-incentivized-feature-nets/): "سلسلة من شبكات الاختبار المحفَّزة". توجد ثلاثة أدوار على الشبكة، ويمكن لتطبيق سطح المكتب أن يؤديها جميعاً:

| الدور | ما يفعله |
|---|---|
| المُعدّن | ينتج كتل إثبات العمل، كما في Zcash اليوم |
| المخزّن | يقفل cTAZ في سند تفويض ويوجّهه إلى مُنهٍ |
| المُنهي | يصوّت لإنهاء الكتل. قوة تصويته هي الحصة المفوّضة إليه |

يفتتح المستودع الذي يقف وراءه بإخلاء مسؤولية يستحق القراءة قبل تثبيت أي شيء: فهو "موجود لإثبات الأفكار، لا لعرض هندسة إنتاجية" وهو "ليس شفرة جاهزة للإنتاج" ([README](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/README.md)). شغّله على جهاز يكون ذلك مقبولاً عليه.

### ما الذي تغيّر في الإصدار 14

صدر [Version 14](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14) في 1 أكتوبر 2026. تبدأ شبكته كإثبات عمل عادي وتفعّل Crosslink على ثلاث مراحل ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/bft.rs#L546-L555)، معروضة أيضاً على [ctaz.cash](https://ctaz.cash/v14)):

| الكتلة | ما يحدث |
|---|---|
| 20,736 | يُفتح التخزين |
| 34,560 | تُؤخذ القائمة الأولى للمنهين من الحصص الموجودة على السلسلة |
| 36,288 | تبدأ نهائية BFT، وتبدأ معها مكافآت التخزين |

تبدأ مكافآت التخزين عند آخر تلك الكتل. لا يربح السند المنشأ قبلها شيئاً حتى ذلك الحين ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-chain/src/parameters/network/subsidy.rs#L487-L508)).

خفّض الإصدار نفسه القائمة النشطة إلى 12 مُنهياً ذوي أكبر حصة ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/bft.rs#L884))، ومنحهم، على حد تعبير ملاحظات الإصدار، عمولة: "10% من جميع مكافآت PoS في كتلة تذهب إلى هذه العمولات، بينما يُوزع 90% على جميع سندات التخزين".

### cTAZ وZEC الحقيقي

cTAZ ("Crosslink TAZ") هي العملة الاختبارية لـFeature Net. تخزّن cTAZ، وليس ZEC أبداً.

لا يدخل ZEC الحقيقي إلا في النهاية. خصصت Shielded Labs [set aside 500 ZEC](https://shieldedlabs.net/crosslink-incentivized-feature-nets/) لشبكات الميزات، وتقول [release notes](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14) إنه يُدفع "على أساس تناسبي اعتماداً فقط على كمية cTAZ التي كسبها كل مشارك عبر التعدين أو التخزين". يترتب على ذلك نتيجتان:

- **عملات الصنبور لا تُحتسب.** cTAZ التي مُنحت لك، من الصنبور أو من أي شخص آخر، لا تكسب شيئاً لمجرد بقائها في محفظتك. لا تُحتسب إلا مكافآت الكتل من التعدين والتخزين.
- **تُطالَب الدفعات ولا تُدفع تلقائياً.** تعلن Shielded Labs كل جولة في [forum thread](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210). في الجولة 2 طلبت من المشاركين إرسال مفتاح العرض الخاص بمحفظتهم وعنوان شبكة رئيسية بحلول 4 أكتوبر 2026 ([post 94](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210/94)). أُعلن أن الشبكة التي يعمل عليها الإصدار 14، وهي التي ينضم إليها هذا الدليل، هي الجولة 3 ([post 101](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210/101)).

## قبل أن تبدأ

- **حاسوب يمكنك تركه قيد التشغيل.** يحتوي الإصدار على نسخ بناء لـWindows وmacOS وUbuntu وArch Linux. شُغّل هذا الدليل على Windows، على حاسوب مزود بمعالج Intel Core i5-8350U.
- **يوم تخزين.** تحقق من موعد فتح اليوم التالي قبل أن تخطط لأي شيء. تعرض لوحة [Staker Space's dashboard](https://crosslink.staker.space/) عدّاً تنازلياً إليه.
- **لا شيء آخر.** لا ZEC، ولا حساب ولا تسجيل.

## الخطوة 1: نزّل التطبيق وتحقق من الملف

1. افتح [version 14 release](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14) وانتقل إلى **Assets**.
2. نزّل الملف الخاص بنظامك. على Windows يكون ذلك `zebrad_v14_win32.exe`.
3. قارن SHA-256 الخاص بالملف مع الملخص الذي تعرضه GitHub بجانب ذلك الأصل.

على Windows، في PowerShell:

```powershell
Get-FileHash .\zebrad_v14_win32.exe -Algorithm SHA256 | Format-List
```

```text
Algorithm : SHA256
Hash      : 1D464E31CCC110E175D45E3EDC0B7FB0B9583ACC996E99F4398F390EC111297E
Path      : C:\crosslink\zebrad_v14_win32.exe
```

الملخص الذي تعرضه GitHub لذلك الملف هو `1d464e31ccc110e175d45e3edc0b7fb0b9583acc996e99f4398f390ec111297e`. لا تمييز لحالة الأحرف في النظام الست عشري، لذا فالأحرف الكبيرة أعلاه لا بأس بها. ولتدع الصدفة تقارن بدلاً من عينيك:

```powershell
$expected = "1d464e31ccc110e175d45e3edc0b7fb0b9583acc996e99f4398f390ec111297e"
$actual = (Get-FileHash .\zebrad_v14_win32.exe -Algorithm SHA256).Hash.ToLower()
if ($actual -eq $expected) { "OK" } else { "MISMATCH" }
```

```text
OK
```

اعرف قيمة هذا الفحص. لا يحمل الإصدار توقيعاً، لذا يخبرك تطابق التجزئة أن التنزيل مكتمل وأنه الملف الذي تقدمه GitHub. لكنه لا يخبرك بمن بناه. يشرح [Verifying Zcash Releases](/guides/verifying-zcash-releases) الفرق.

## الخطوة 2: ابدأ العقدة ودعها تتزامن

ابدأ التطبيق من طرفية، لكي تبقى رسائل البدء ظاهرة على الشاشة. استخدم نافذة PowerShell عادية، لا نافذة مفتوحة عبر "Run as administrator": فهذا برنامج نموذجي أولي غير موقّع، ولا يحتاج إلى صلاحيات المسؤول.

```powershell
.\zebrad_v14_win32.exe
```

تُفتح نافذة بعنوان "Zcash Crosslink Visualizer". توجد المحفظة على اليسار، بعلامتي تبويب **Your Wallet** و**Faucet Wallet**، وتُرسم السلسلة في الوسط، وتُدرج المُنهِيات على اليمين. تستمر الطرفية في طباعة سجل العقدة. اتركهما مفتوحتين أثناء استخدام الشبكة.

ترتبط ملاحظات الإصدار بـ[video of the Windows install](https://www.youtube.com/watch?v=cO-5Oa4B1Tk).

يحتفظ التطبيق ببياناته في مجلد ذاكرة تخزين مؤقت: `%LOCALAPPDATA%\zebra` على Windows، و`~/.cache/zebra` على Linux، و`~/Library/Caches/zebra` على macOS، وفقاً لملاحظات الإصدار.

**احتفظ بالسر لنفسك.** يحتوي ذلك المجلد على ملف اسمه `secret.seed`. ينشئه التطبيق عند أول تشغيل ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L280-L305)) ويشتق منه محفظتك وهوية مُنهيك ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L625-L626)). يحتوي التطبيق أيضاً على زر **Copy Seed** يضع السر نفسه في حافظة النسخ. أي شخص يملك أياً منهما يسيطر على محفظتك. لا تلصقهما أبداً في دردشة أو منشور منتدى أو لقطة شاشة.

### كيف تعرف أنك متزامن

تقول ملاحظات الإصدار إنه "لا توجد مراقبة مدمجة لمدى قرب تزامنك مع طرف الشبكة". لكن الإصدار 14 يحتوي على بعض ذلك: تتضمن القائمة المنسدلة **Network Info** في أعلى النافذة صفوفاً لـPoW Height وWallet Sync وBlocks Behind Known PoW ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L4362-L4373)). قارن ارتفاعك بالارتفاع على [Staker Space](https://crosslink.staker.space/) أو [ctaz.cash](https://ctaz.cash/).

تجيب العقدة أيضاً عبر RPC:

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"getblockcount","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  36490
}
```

منفذ RPC `127.0.0.1:8232` مفتوح افتراضياً في هذا البناء ولا يحتاج إلى كلمة مرور ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/config.rs#L333-L337)). يستمع على جهازك فقط، ويمكن لأي شيء يعمل على ذلك الجهاز استدعاؤه.

في هذا التشغيل، استغرق التزامن الأول، من الكتلة 0 إلى الطرف عند نحو الكتلة 28,400، قرابة 50 دقيقة.

**بعد إعادة التشغيل، يقرأ رصيدك صفراً لبعض الوقت.** في كل مرة يبدأ فيها التطبيق، يعيد بناء المحفظة من `secret.seed` ويفحص السلسلة مجدداً من الكتلة 0 ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3609-L3623)). حتى يصل الفحص إلى معاملاتك، يظهر رصيدك وحصتك على أنهما 0. في هذا التشغيل عادا بعد نحو 15 دقيقة من إعادة التشغيل. يُعاد فحص محفظة الصنبور بالطريقة نفسها ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3588))، وأثناء الفحص أظهرت علامة تبويب Faucet Wallet رصيداً كبيراً جداً. تجاهل كليهما حتى يكتمل Wallet Sync.

## الخطوة 3: احصل على بعض cTAZ

### عدّنها

وفقاً لملاحظات الإصدار، يبدأ التطبيق تعدين CPU إلى محفظتك بمجرد تزامنه. لا تحتاج إلى تشغيل أي شيء. تذهب العملات المُعدّنة إلى عنوان شفاف من محفظتك الخاصة ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L349-L355)).

أما ما إذا كان سيجد كتلة فهو أمر آخر. تحذّر الملاحظات من أنك "قد تتفوق عليك جهات أخرى تعدّن بسرعة أكبر، لذا لا يوجد ضمان للنجاح". افتراضياً، يستخدم المُعدّن المدمج خيط CPU واحداً ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/config/mining.rs#L97-L100)).

لاستخدام خيوط أكثر، اضبط متغير بيئة في نافذة PowerShell نفسها قبل بدء التطبيق ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/config.rs#L109-L128)). استخدم هذا التشغيل أربعة:

```powershell
$env:ZEBRA_MINING__INTERNAL_MINER_THREADS = "4"
.\zebrad_v14_win32.exe
```

لا يستمر المتغير إلا ما دامت تلك النافذة مفتوحة. بعد ضبطه، أظهر عداد معالج Windows أن العقدة تستخدم وقتاً يعادل أربعة إلى خمسة معالجات، كنسبة مئوية من معالج منطقي واحد:

```powershell
(Get-Counter '\Process(zebrad_v14_win32)\% Processor Time' -SampleInterval 2 -MaxSamples 3).CounterSamples.CookedValue
```

```text
506.362346582771
509.688760671639
505.957457577538
```

النتيجة: لم يجد Intel Core i5-8350U، وهو يعدّن على أربعة خيوط من بداية 8 أكتوبر إلى عصر 9 أكتوبر، أي كتلة.

### أو استخدم الصنبور

يحتوي التطبيق على زر **Receive cTAZ** أسفل اليمين. في مصدر الإصدار 14، ترسل ضغطة واحدة 0.5 cTAZ من محفظة الصنبور إلى محفظتك ([amount](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3073)، [send](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L5018-L5021)). الصنبور محفظة واحدة تحملها كل نسخة من التطبيق ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3579-L3583))، وتعرض علامة تبويب **Faucet Wallet** رصيدها.

يتعطل الزر ما لم يكن لدى الصنبور أكثر من 5.01 cTAZ من العملات المحمية ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L3975-L3989)). تعد علامة التبويب العملات المُعدّنة من الصنبور أيضاً، وهي لا تصبح محمية إلا في دفعات قدرها 10 cTAZ بالضبط إضافة إلى رسم ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L4880-L4884))، لذلك قد تعرض علامة التبويب الكثير بينما يبقى الزر رمادياً. في هذا التشغيل، ظل رمادياً في 8 و9 أكتوبر، وظهر عند تمرير المؤشر "The faucet is mining more funds."، فيما عرضت علامة التبويب 14.74695 cTAZ.

**عندما يكون الزر رمادياً، اسأل عقدتك الخاصة.** تحتوي العقدة على طريقة طلب من الصنبور، هي `requestfaucetdonation` ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L314-L315))، لا تطبق قاعدة الزر البالغة 5.01 cTAZ. ضع عنوانك أنت مكان `YOUR_ADDRESS` (فهو حقل `address` في `wallet_spendable_funds`، أدناه):

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"requestfaucetdonation","params":[{"address":"YOUR_ADDRESS"}],"id":1}' | ConvertTo-Json -Depth 20
```

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  {
                   "amount":  50000000
               }
}
```

يعني ذلك الرد أن الطلب وُضع في قائمة الانتظار، لا أنه أُرسل. في هذا التشغيل، عُدّنت 0.5 cTAZ الخاصة بالصنبور عند الكتلة 33,306 وأصبحت قابلة للإنفاق عند الكتلة 33,322. اطلب مرة واحدة: فالصنبور مشترك، ويُرفض طلب ثانٍ للعنوان نفسه ما دام الأول معلقاً ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3553)).

### أو اطلب من مشارك آخر

يمكن لأي شخص على الشبكة إرسال cTAZ إليك بزر **Send** في التطبيق. في هذا التشغيل، أرسل مشارك آخر 31 cTAZ. وصلت بصفة "Received" ومع الملاحظة "send from user wallet"، وهي الملاحظة التي يرفقها زر Send الخاص بالتطبيق نفسه ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L5036)). اطلب في [forum thread](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210)، ولا تعطِ سوى عنوانك.

تكفي عملات الصنبور والهدايا لتعلم التخزين. لكنها لا تُحتسب ضمن مكافآت ZEC.

### تحقق مما يمكنك إنفاقه

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"wallet_spendable_funds","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

كان هذا الرد بعد وصول 0.5 cTAZ الخاصة بالصنبور، مع اختصار العنوان:

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  {
                   "address":  "utest1vqszm53j...mqmdj",
                   "committed_zats":  0,
                   "pending_zats":  0,
                   "spendable_zats":  50000000,
                   "tip_height":  33322,
                   "unshielded_zats":  0
               }
}
```

المبالغ بوحدة zatoshis: كل 100,000,000 منها يساوي cTAZ واحداً. تحتاج العملات المحمية إلى 3 تأكيدات قبل أن تُحتسب قابلة للإنفاق ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L621-L634)). تستقر عملات الصنبور وعملات المشاركين الآخرين في `spendable_zats`. العملات المُعدّنة شفافة، لذا تستقر في `unshielded_zats` ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L4659)).

بعد كتلة واحدة من الحصة الثانية في هذا التشغيل، ظهر بقية الرصيد تحت `pending_zats`. وبعد بضع كتل أصبح قابلاً للإنفاق مجدداً.

## الخطوة 4: خزّن لدى مُنهٍ

### انتظر يوم تخزين

لا يُقبل التخزين وفك التخزين والسحب إلا عندما

```text
block height mod 10,368 < 3,456
```

وهي نافذة من 3,456 كتلة في بداية كل 10,368. عند هدف الشبكة البالغ 25 ثانية للكتلة، يكون ذلك يوماً واحداً من كل ثلاثة ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/transaction/mod.rs#L1540-L1547)). تُفتح النوافذ الأولى للإصدار 14 عند الكتل 20,736 و31,104 و41,472 و51,840.

وفقاً لملاحظات الإصدار، يعلن التطبيق بداية ونهاية كل يوم تخزين. في هذا التشغيل، أظهرت قائمة الكتل فيه سطراً أحمر "* STAKING DAY END *" بين الكتلتين 34,559 و34,560.

**تقول ملاحظات الإصدار شيئين.** تسرد قائمة التغييرات فيها "~1 day for Staking Day and ~3 days for the Staking Cycle"، وهو ما يطابق الشفرة. وفي الأسفل، لا يزال قسم مُرحّل من Season 1 يقول إن يوم التخزين يبدأ كل 150 كتلة ويستمر 70 كتلة. اتبع الأول. يقع سطر النهاية أعلاه حيث تغلق القاعدة الأولى النافذة (34,560 mod 10,368 = 3,456)؛ أما بموجب القاعدة الثانية فستقع الكتلة 34,560 داخل نافذة.

### اختر مُنهياً

يُسمّى المُنهي بهويته، وهي سلسلة تبدأ بـ`zfinv1`. تنشر ZecHub هوية المُنهي الذي تشغّله في [`zechub_validator_crosslink.json`](https://github.com/ZecHub/zechub/blob/main/zechub_validator_crosslink.json):

```text
zfinv1j65qJgeSId7ssZk6a71NvQG2KjD5hfJCYxWkCSPvQSmwibffVw52UYU72wKbrEL0-cw-C4PQoO5IlLgbsgA3q_Gf1mzYIKcnixNP9XXVgphIDuLI6RBMhjFfYWyzp4YN
```

انسخ هوية من مصدر تثق به. ووفقاً لملاحظات الإصدار، يسرد التطبيق أيضاً المُنهين في لوحته اليمنى، مع أيقونة نسخ إلى يسار كل واحد منهم.

بعد التخزين، تسمي محفوظات المحفظة وRPC المُنهي بمفتاح ست عشري بدلاً من هويته. بالنسبة إلى مُنهي ZecHub، يكون ذلك المفتاح `2941ef23...266aae8f`.

اختر مُنهياً تثق به. لا يتضمن التصميم اقتطاعاً تلقائياً، لكنه يسمح بـ"انقسام صلب ينسقه المستخدمون يحرق كل الحصة المفوضة إلى مُنهٍ مسمى" ([Crosslink book, design overview](https://shieldedlabs.github.io/crosslink_book/branches/main/crosslink-design-overview-20260914.html)).

يحدد الاختيار أيضاً من يصوّت. يكسب كل سند نشط حصته من مكافأة التخزين. إذا كان مُنهيه ضمن الـ12 في القائمة، يذهب عُشر تلك الحصة إلى المُنهي كعمولة. يحتفظ السند الموجّه إلى مُنهٍ خارج الـ12 بكامل حصته، لكن ذلك المُنهي لا يصوّت ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-state/src/service.rs#L2063-L2079)).

### خزّن

1. انسخ هوية المُنهي.
2. في علامة تبويب **Your Wallet**، اضغط **Stake**.
3. اضغط **Paste Identity**. يتغير السطر أعلى الزر إلى أول وآخر محارف الهوية، وهي `[zfinv1j6..YWyzp4YN]` لهوية ZecHub. تحقق منها قبل المتابعة.
4. انقر مبلغاً. تأتي المبالغ بخطوات ثابتة، وأصغرها 0.01 cTAZ، ولا يضيء إلا ما يغطيه رصيدك. مع 0.5 cTAZ، كان +0.01 cTAZ و+0.1 cTAZ مضاءين.

**لن يطلب منك شيء التأكيد، ولا يبدو أن شيئاً يحدث.** في هذا التشغيل، على حد قول المختبِر: "نقرت عليه مرة ولم يحدث شيء، صار رمادياً ثم أضاء ثانية." لكن الحصة كانت قد أُرسلت. أظهرت محفوظات المحفظة "Staked @ 33334 to 2941ef23..266aae8f"، وكان الرسم 0.00015 cTAZ، وأظهرت المحفظة 0.010 cTAZ Staked. أنشأت حصة ثانية بعد دقائق سنداً ثانياً، عند الكتلة 33,348.

تنشئ كل حصة سند تفويض خاصاً بها. توجد المبالغ الثابتة ويوم التخزين كلاهما للخصوصية: فهما يصعّبان تمييز حصة شخص عن حصة آخر.

## الخطوة 5: تحقق من وضعك

### سنداتك

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"wallet_staking_positions","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

كان هذا الرد عند الكتلة 36,490، بعد يومين من التخزين:

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  {
                   "active":  {
                                  "2941ef2309a4156342f285f9302ab601bd4dbd6b3a99b1ecde219207266aae8f":  [
                                                                                                           {
                                                                                                               "create_height":  33334,
                                                                                                               "create_txid":  "6824b24834eb8ca13befb3a817765e512fd25132166f0b38ad096503c4fc5a35",
                                                                                                               "initial_val":  1000000,
                                                                                                               "latest_val":  1003451,
                                                                                                               "pk":  "128a0ae7fef05e338d6b613939a45cb7773d8e9c98915cadef6fffa898f4e28d"
                                                                                                           },
                                                                                                           {
                                                                                                               "create_height":  33348,
                                                                                                               "create_txid":  "f4d932738ef4104b8663f21e5666e60a0236b117a7883391e9870a0029d25ba2",
                                                                                                               "initial_val":  1000000,
                                                                                                               "latest_val":  1003451,
                                                                                                               "pk":  "f113e0c15eaf6e89621314d88ed15d9fb035a5afeee4606af7173f9d60c48c0c"
                                                                                                           }
                                                                                                       ]
                              },
                   "withdrawable":  [

                                    ]
               }
}
```

لا يأخذ الاستدعاء معاملات. يعيد سنداتك النشطة، مجمعة تحت مفتاح المُنهي الذي يدعم كل منها، والسندات التي أنهت فك التخزين ويمكن سحبها. يُظهر كل سند المبلغ المخزّن (`initial_val`)، وقيمته الآن (`latest_val`)، والمعاملة وارتفاع الكتلة اللذين أنشآه. تُضاف المكافآت إلى السند نفسه: بحلول الكتلة 36,490، نما كل سند من 1,000,000 zatoshis إلى 1,003,451.

**تعرض نافذة Edit Stake كل سند أكبر بعشرة أضعاف.** في هذا التشغيل، قرأ كل سند قدره 0.01 cTAZ مقدار 0.100 cTAZ في صفه، و0.1003536 cTAZ بعد بدء المكافآت، بينما اتفقت المجاميع فوق الصفوف (0.020 cTAZ، ثم 0.02007 cTAZ) مع RPC. اتبع المجاميع وRPC.

وضعت النافذة نفسها مثلث تحذير بجانب المُنهي، قبل بدء النهائية وبعده. في المصدر، يعني المثلث أن تطبيقك لا يعد ذلك المُنهي متصلاً، بينما يحصل المتصل على أيقونة Wi-Fi بدلاً منه ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L2646-L2648)). ومع ذلك، كسبت السندات مكافآت.

### المُنهون

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"get_tfl_recency_status","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

وفقاً لملاحظات الإصدار، يعرض هذا موقع عقدتك في عملية التصويت، ولكل مُنهٍ، آخر وقت سمعت فيه عقدتك منه وكيف كان يصوّت.

قبل الكتلة 36,288، تكون كل الحقول صفراً وتكون القائمة فارغة. كان هذا الرد عند الكتلة 33,354:

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  {
                   "now_utc":  0,
                   "my_height":  0,
                   "my_round":  0,
                   "my_step":  0,
                   "my_locked_round":  0,
                   "my_valid_round":  0,
                   "finalizer_statuses":  [

                                          ]
               }
}
```

بعد بدء النهائية، تضم القائمة المُنهين في القائمة النشطة. عند الكتلة 36,490، ضمت 12 منهم، ومن بينهم مُنهي ZecHub `2941ef23...`، وهو ما يطابق حد القائمة البالغ 12. هذه بداية ذلك الرد، مقطوعة بعد الإدخال الأول:

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  {
                   "now_utc":  1791628531,
                   "my_height":  8,
                   "my_round":  0,
                   "my_step":  0,
                   "my_locked_round":  -1,
                   "my_valid_round":  -1,
                   "finalizer_statuses":  [
                                              [
                                                  "8239a79bc2f224f9f2a276a1050ec9945866253be7da4bdf27c4186c8e588dee",
                                                  {
                                                      "no_yes_votes_in_my_height":  [
                                                                                        [
                                                                                            0,
                                                                                            0
                                                                                        ],
                                                                                        [
                                                                                            0,
                                                                                            0
                                                                                        ]
                                                                                    ],
                                                      "highest_round_vote":  0,
                                                      "last_seen_new_info_utc":  0,
                                                      "last_direct_connection_utc":  null
                                                  }
                                              ],
```

بعد بضع دقائق، أظهرت اللوحة اليمنى للتطبيق "Finalizers (23)".

### على Linux وmacOS

يعطي [source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L602-L610) الاستدعاء بصيغة `curl`. غيّر اسم الطريقة للاستدعاءات الأخرى. لم تُشغّل هذه الصيغة لأجل هذا الدليل:

```bash
curl -X POST -H "Content-Type: application/json" -d \
'{ "jsonrpc": "2.0", "method": "get_tfl_recency_status", "params": [], "id": 1 }' \
http://127.0.0.1:8232
```

على Linux، تقول ملاحظات الإصدار إنك ستحتاج على الأرجح إلى تثبيت `xclip` قبل أن يعمل النسخ واللصق في التطبيق.

### اسم RPC واحد ينبغي الانتباه إليه

تصف ملاحظات إصدار 14 استدعاء تخزين اسمه `wallet_staking_action` يأخذ كائناً. لا تحتوي شفرة مصدر الإصدار 14 على طريقة بهذا الاسم، وفي هذا التشغيل أجابت العقدة:

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "error":  {
                  "code":  -32601,
                  "message":  "Method not found"
              }
}
```

طريقة التخزين التي تسجلها هي [`staking_command`](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L418-L420)، وتأخذ سلسلة واحدة تحمل الطلب بصيغة JSON، مع إعطاء المُنهي بهوية `zfinv1` الخاصة به ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-crosslink/src/lib.rs#L750-L760)). لم تُجرّب لأجل هذا الدليل.

## فك التخزين والسحب

لا يمكن التراجع عن سند في اليوم الذي أُنشئ فيه. يحتاج الأمر إلى ثلاثة أيام تخزين من البداية إلى النهاية: خزّن في أحدها، وفك التخزين في يوم لاحق، واسحب في ثالث. تضيف ملاحظات الإصدار أن سنداً واحداً لا يمكنه اتخاذ إجراءي تخزين في يوم التخزين نفسه.

*لم يُشغّل لأجل هذا الدليل. من ملاحظات إصدار 14:* لفك التخزين، اضغط **Edit Stake**، واختر سنداً من قائمة Staked Bonds وانقر أيقونة رابط السلسلة. للسحب في يوم تخزين لاحق، اضغط **Edit Stake**، واختر سنداً من قائمة Withdrawable Bonds وانقر أيقونة المال. يُسمح بنقل سند إلى مُنهٍ مختلف، والذي تسميه الملاحظات إعادة التوجيه، في أي وقت.

## أين تراقب الشبكة

تجمع علامة تبويب [Crosslink على ZecHub Tools](https://zechub.wiki/tools?tool=crosslink) الأدوات في مكان واحد، تحت تنبيه نصه "Staking on this network does not move ZEC":

- مستضافة، ولا تحتاج إلى عقدة: [Staker Space](https://crosslink.staker.space/)، وهي "لوحة معلومات مباشرة لشبكة cTAZ الاختبارية الحالية" تتضمن الارتفاع والمُعدّنين ومعدل الحل والعد التنازلي ليوم التخزين والنهائية، و[ctaz.cash](https://ctaz.cash/)، وتتضمن إنتاج التعدين وقائمة المُنهين والأقران ومطالبات أسماء عناوين التخزين.
- على جهازك: `zcash-explorer`، التي تعرض صفحة `/live/crosslink` الخاصة بها التفعيل وتأخر النهائية والقائمة ومراكز التخزين، و`crosslink_indexer`، وهو فهرس SQLite لعقدة Crosslink.

## أخطاء شائعة

**التخطيط وفق الساعة بدلاً من ارتفاع الكتلة.** تُحسب أيام التخزين بالكتل. راقب العد التنازلي للوحة المعلومات، لا التقويم.

**التخزين في الدقائق الأخيرة من النافذة.** تُفحص القاعدة مقابل الكتلة التي تشمل معاملتك ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-consensus/src/transaction.rs#L941-L953))، لذا يجب تعدين الحصة قبل إغلاق النافذة، لا مجرد إرسالها.

**توقع تعدين حصتك.** لم يجد مُعدّن CPU بأربعة خيوط على Intel Core i5-8350U أي كتلة بين 8 و9 أكتوبر. احصل على أول cTAZ من الصنبور أو من مشارك آخر.

**النقر مرة أخرى لأن شيئاً لم يبدُ أنه حدث.** كل نقرة على مبلغ هي سند جديد. تحقق من محفوظات المحفظة أو `wallet_staking_positions` أولاً.

**الذعر بعد إعادة التشغيل.** يظهر رصيدك وحصتك صفراً حتى تعيد المحفظة فحصها. انتظر حتى ينتهي Wallet Sync.

**التعامل مع cTAZ باعتبارها نقود لعب، أو مع السر باعتباره غير مؤذٍ.** cTAZ عملة اختبارية، لكن cTAZ التي تكسبها تحدد حصتك من ZEC الحقيقي. احمِ `secret.seed` كما تحمي محفظة.

**قراءة تعليمات قديمة.** تحمل ملاحظات الإصدار نصاً من مواسم أقدم بجانب القواعد الجديدة. عندما تختلف عما تفعله عقدتك، تكون عقدتك على صواب.

## صفحات ذات صلة

- [Crosslink Protocol](/zcash-tech/crosslink-protocol) - التصميم الذي تختبره هذه الشبكة
- [Shielded Labs](/zcash-organizations/shielded-labs) - الفريق الذي يقف وراء Crosslink
- [Verifying Zcash Releases](/guides/verifying-zcash-releases) - ما الذي تثبته قيمة التحقق وما الذي لا تثبته
- [Zebra Full Node](/zcash-tech/zebra-full-node) - العقدة التي بُني عليها تطبيق Feature Net
- [Zcash Testnet](/using-zcash/testnet) - شبكة الاختبار العادية لـZcash، وهي شبكة مختلفة

## المصادر

- [Version 14 release notes](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14)، Shielded Labs، 1 أكتوبر 2026
- [Crosslink: Incentivized Feature Nets](https://shieldedlabs.net/crosslink-incentivized-feature-nets/)، Shielded Labs، 2 أبريل 2026
- [Crosslink: Incentivized Feature Net](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210)، منتدى مجتمع Zcash
- [Crosslink FAQ](https://shieldedlabs.net/crosslink-faq/)، Shielded Labs
- [The Crosslink book](https://shieldedlabs.github.io/crosslink_book/)، Shielded Labs

---

*شُغّلت الخطوات في هذه الصفحة باستخدام الإصدار 14 من Feature Net على Windows 11 (الإصدار 10.0.26200.9550)، من 8 إلى 10 أكتوبر 2026. أي بيان يستشهد بملاحظات الإصدار أو بالشفرة المصدرية مأخوذ منهما. وكل ما وُسم بأنه "لم يُشغّل" لم يُجرّب.*
