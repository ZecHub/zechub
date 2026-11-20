<a href="https://github.com/zechub/zechub/edit/main/site/guides/Crosslink_Feature_Net.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# انضم إلى Crosslink Feature Net

## الخلاصة

- Feature Net هي شبكة الاختبار العامة التابعة لـ Shielded Labs لاختبار [Crosslink](/zcash-tech/crosslink-protocol)، وهي طبقة النهائية المقترحة التي تضيف التخزين (staking) إلى جانب إثبات العمل (proof-of-work) في Zcash.
- تعمل الشبكة بعملة اختبارية هي cTAZ. لا شيء تفعله عليها ينقل ZEC على الشبكة الرئيسية (mainnet) أو يعرّضه للخطر.
- تطبيق سطح مكتب واحد يؤدي دور العقدة (node) والمعدّن (miner) والمحفظة (wallet) والمُنهي (finalizer) معًا. يقوم افتراضيًا بتعدين (mining) cTAZ، ويحتوي على زر صنبور.
- لا يعمل التخزين وإلغاء التخزين والسحب إلا خلال «يوم التخزين» (Staking Day)، وهو يوم واحد من كل ثلاثة أيام. إذا فاتك، فعليك انتظار اليوم التالي.
- للتخزين، تلصق هوية مُنهٍ وتنقر على مبلغ. يستخدم هذا الدليل المُنهي الخاص بـ ZecHub مثالًا.
- يُظهر لك استدعاءان لـ RPC وضعك: `wallet_staking_positions` و `get_tfl_recency_status`.

*تم الاختبار باستخدام Feature Net الإصدار 14 على Windows 11 (الإصدار 10.0.26200.9550)، من 8 إلى 10 أكتوبر 2026. البرنامج نموذج أولي ويتغير مع كل إصدار. إذا اختلف ما تراه عن هذه الصفحة، فثق بتجربتك وافتح طلب سحب (PR) من فضلك.*

**تحديث، 17 نوفمبر 2026: لم يعد الإصدار 14 قادرًا على الانضمام إلى Feature Net.** [الإصدار 15](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v15) (13 أكتوبر) أجرى ترقية للشبكة عند ارتفاع PoW البالغ 55,296. بدءًا من [الإصدار 16](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v16)، «يتوقف كل إصدار عن العمل بعد أسبوعين من إطلاقه»، وتخطط Shielded Labs لإصدار نسخة كل أسبوع. [الإصدار 17](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v17) (5 نوفمبر) أجرى ترقية أخرى عند ارتفاع PoW البالغ 165,000. أحدث إصدار وقت كتابة هذه الملاحظة هو [الإصدار 18](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v18) (17 نوفمبر 2026): لا يمكنه التواصل مع عقد الإصدار 17، ويجري ترقية للشبكة عند الكتلة 189,000، ويتوقف عن العمل عند الكتلة 212,568، أي نحو 30 نوفمبر. نزّل [أحدث إصدار](https://github.com/ShieldedLabs/crosslink_monolith/releases/latest)، وليس الإصدار 14. لم تُعَد الخطوات أدناه على هذا الإصدار. هناك اختلافان معروفان: تغيرت أسماء الملفات، وأصبح RPC الخاص بالتخزين هو `wallet_staking_action` (راجع [اسم RPC الذي ينبغي الانتباه إليه](#one-rpc-name-to-watch)).

## ما هي Feature Net

Crosslink مقترح، وليس جزءًا من Zcash اليوم. تقول صفحة [الأسئلة الشائعة حول Crosslink](https://shieldedlabs.net/crosslink-faq/) لدى Shielded Labs إنه «سيحتاج إلى المرور بعملية الحوكمة (governance) القياسية لـ Zcash» قبل أن يصل إلى الشبكة الرئيسية. وتشرح صفحة [بروتوكول Crosslink](/zcash-tech/crosslink-protocol) التصميم.

لتجربة التصميم مع مستخدمين حقيقيين، تشغّل Shielded Labs ما تسميه [شبكات الميزات المحفَّزة](https://shieldedlabs.net/crosslink-incentivized-feature-nets/): «مجموعة من شبكات الاختبار المحفَّزة». توجد ثلاثة أدوار على الشبكة، ويمكن لتطبيق سطح المكتب أن يؤديها جميعًا:

| الدور | ما يفعله |
|---|---|
| المعدّن | ينتج كتلًا (blocks) بإثبات العمل، كما على Zcash اليوم |
| المخزِّن (Staker) | يقفل cTAZ في سند ضمان (bond) للتفويض ويوجّهه إلى مُنهٍ |
| المُنهي | يصوّت لجعل الكتل نهائية. قوته التصويتية هي حصة التخزين المفوَّضة إليه |

يبدأ المستودع الذي تقوم عليه الشبكة بإخلاء مسؤولية يستحق القراءة قبل أن تثبّت أي شيء: فهو «موجود لإثبات الأفكار، لا لعرض هندسة إنتاجية» وهو «ليس شيفرة جاهزة للإنتاج» ([README](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/README.md)). شغّله على جهاز يكون فيه ذلك مقبولًا.

### ما الذي غيّره الإصدار 14

صدر [الإصدار 14](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14) في 1 أكتوبر 2026. تبدأ شبكته بإثبات عمل بسيط، ثم تفعّل Crosslink على ثلاث مراحل ([المصدر](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/bft.rs#L546-L555)، ويظهر ذلك أيضًا على [ctaz.cash](https://ctaz.cash/v14)):

| الكتلة | ما يحدث |
|---|---|
| 20,736 | يُفتح التخزين |
| 34,560 | تُؤخذ أول قائمة للمُنهين من حصص التخزين الموجودة على السلسلة (on-chain) |
| 36,288 | تبدأ نهائية BFT، ومعها مكافآت التخزين |

تبدأ مكافآت التخزين عند آخر هذه الكتل. سند الضمان الذي يُنشأ قبل ذلك لا يكسب شيئًا حتى ذلك الحين ([المصدر](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-chain/src/parameters/network/subsidy.rs#L487-L508)).

قلّص الإصدار نفسه القائمة النشطة إلى الـ 12 مُنهيًا أصحاب أكبر حصة ([المصدر](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/bft.rs#L884))، ومنحهم عمولة، وفق ما جاء في نشرة الإصدار: «تذهب 10% من جميع مكافآت PoS في الكتلة إلى هذه العمولات، بينما تُوزَّع 90% على جميع سندات ضمان التخزين».

### عملة cTAZ و ZEC الحقيقي

العملة cTAZ («Crosslink TAZ») هي العملة الاختبارية لـ Feature Net. أنت تخزّن cTAZ، ولا تخزّن ZEC أبدًا.

لا يدخل ZEC الحقيقي إلا في النهاية. خصّصت Shielded Labs [مبلغ 500 ZEC](https://shieldedlabs.net/crosslink-incentivized-feature-nets/) لشبكات الميزات، وتقول [نشرة الإصدار](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14) إنه يُدفع «بشكل تناسبي استنادًا فقط إلى كمية cTAZ التي كسبها كل مشارك من خلال التعدين أو التخزين». ويترتب على ذلك أمران:

- **لا تُحتسب عملات الصنبور.** العملات cTAZ التي أُعطيت لك، سواء من الصنبور أو من أي شخص آخر، لا تكسب شيئًا بمجرد بقائها في محفظتك. لا تُحتسب إلا مكافآت الكتل الناتجة عن التعدين والتخزين.
- **المدفوعات تُطالَب بها، وليست تلقائية.** تعلن Shielded Labs عن كل جولة في [موضوع المنتدى](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210). في الجولة 2، طلبت من المشاركين إرسال مفتاح العرض (viewing key) الخاص بمحفظتهم وعنوان (address) على الشبكة الرئيسية بحلول 4 أكتوبر 2026 ([المنشور 94](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210/94)). أما الشبكة التي يعمل عليها الإصدار 14، وهي التي ينضم إليها هذا الدليل، فقد أُعلن عنها بوصفها الجولة 3 ([المنشور 101](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210/101)).

## قبل أن تبدأ

- **حاسوبًا يمكنك تركه قيد التشغيل.** توفرت إصدارات الإصدار 14 لـ Windows وmacOS وUbuntu وArch Linux. تتوفر إصدارات الإصدارين 17 و18 لـ Windows وmacOS وUbuntu. نُفّذ هذا الدليل على Windows، على حاسوب شخصي بمعالج Core i5-8350U من Intel.
- **يوم تخزين.** تحقق من موعد فتح اليوم التالي قبل أن تخطط لأي شيء. [لوحة معلومات Staker Space](https://crosslink.staker.space/) تعرض عدًا تنازليًا له.
- **لا شيء آخر.** لا ZEC، ولا حساب، ولا تسجيل.

## الخطوة 1: نزّل التطبيق وتحقق من الملف

1. افتح [أحدث إصدار](https://github.com/ShieldedLabs/crosslink_monolith/releases/latest) وانتقل إلى **الأصول**. نُفّذ هذا الدليل باستخدام [الإصدار 14](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14)، الذي لم يعد بإمكانه الانضمام إلى الشبكة.
2. نزّل الملف المناسب لنظامك. على Windows ينتهي اسمه بـ `_win32.exe`: `zebrad_v14_win32.exe` في المثال أدناه، و`zebra-crosslink_v18_win32.exe` للإصدار 18. استخدم اسم ملفك وقيمة التحقق الخاصة به في الأوامر التالية.
3. قارن قيمة SHA-256 للملف بقيمة التحقق التي يعرضها GitHub بجانب ذلك الأصل.

على Windows، في PowerShell:

```powershell
Get-FileHash .\zebrad_v14_win32.exe -Algorithm SHA256 | Format-List
```

```text
Algorithm : SHA256
Hash      : 1D464E31CCC110E175D45E3EDC0B7FB0B9583ACC996E99F4398F390EC111297E
Path      : C:\crosslink\zebrad_v14_win32.exe
```

البصمة التي يعرضها GitHub لذلك الملف هي `1d464e31ccc110e175d45e3edc0b7fb0b9583acc996e99f4398f390ec111297e`. لا يميّز النظام الست عشري بين الأحرف الكبيرة والصغيرة، لذا لا مشكلة في الأحرف الكبيرة أعلاه. لتترك الصدفة (shell) تُجري المقارنة بدلًا من عينيك:

```powershell
$expected = "1d464e31ccc110e175d45e3edc0b7fb0b9583acc996e99f4398f390ec111297e"
$actual = (Get-FileHash .\zebrad_v14_win32.exe -Algorithm SHA256).Hash.ToLower()
if ($actual -eq $expected) { "OK" } else { "MISMATCH" }
```

```text
OK
```

اعرف قيمة هذا التحقق. لا يحمل الإصدار أي توقيع رقمي (signature)، لذا فإن تطابق قيمة التجزئة يخبرك بأن التنزيل مكتمل وبأنه الملف الذي يقدّمه GitHub. لكنه لا يخبرك بمن بناه. يشرح [التحقق من إصدارات Zcash](/guides/verifying-zcash-releases) الفرق.

## الخطوة 2: شغّل العقدة واتركها تتزامن

شغّل التطبيق من الطرفية، حتى تبقى رسائل بدء التشغيل على الشاشة. استخدم نافذة PowerShell عادية، لا نافذة مفتوحة بخيار «Run as administrator»: فهذا برنامج نموذج أولي غير موقَّع، ولا يحتاج إلى صلاحيات المسؤول.

```powershell
.\zebrad_v14_win32.exe
```

تُفتح نافذة بعنوان «أداة العرض المرئي Zcash Crosslink». تكون المحفظة على اليسار، مع علامتي التبويب **Your Wallet** و **Faucet Wallet**، والسلسلة مرسومة في الوسط، والمُنهون مدرجون على اليمين. تواصل الطرفية طباعة سجل العقدة. اترك كليهما مفتوحين أثناء استخدامك للشبكة.

تتضمن نشرة الإصدار رابطًا إلى [فيديو لعملية التثبيت على Windows](https://www.youtube.com/watch?v=cO-5Oa4B1Tk).

يحتفظ التطبيق ببياناته في مجلد للذاكرة المؤقتة: `%LOCALAPPDATA%\zebra` على Windows، و `~/.cache/zebra` على Linux، و `~/Library/Caches/zebra` على macOS، وفقًا لنشرة الإصدار.

**احتفظ بالسر لنفسك.** يحتوي ذلك المجلد على ملف اسمه `secret.seed`. ينشئه التطبيق عند أول تشغيل ([المصدر](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L280-L305)) ويشتق منه محفظتك وهوية المُنهي الخاصة بك ([المصدر](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L625-L626)). يحتوي التطبيق أيضًا على زر **Copy Seed** يضع السر نفسه في الحافظة. من يملك أيًّا منهما يتحكم في محفظتك. لا تلصقهما أبدًا في محادثة أو منشور في منتدى أو لقطة شاشة.

### كيف تعرف أنك متزامن

تقول نشرة الإصدار إنه «لا توجد مراقبة مدمجة لمدى قرب تزامنك من قمة الشبكة». لكن الإصدار 14 يوفّر شيئًا منها: تحتوي القائمة المنسدلة **Network Info** أعلى النافذة على صفوف لـ PoW Height و Wallet Sync و Blocks Behind Known PoW ([المصدر](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L4362-L4373)). قارن ارتفاعك بالارتفاع المعروض على [Staker Space](https://crosslink.staker.space/) أو [ctaz.cash](https://ctaz.cash/).

تجيب العقدة أيضًا عبر RPC:

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

منفذ RPC `127.0.0.1:8232` مفتوح افتراضيًا في هذا الإصدار ولا يحتاج إلى كلمة مرور ([المصدر](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/config.rs#L333-L337)). وهو يستمع على جهازك فقط، ويمكن لأي برنامج يعمل على ذلك الجهاز استدعاؤه.

في هذه التجربة، استغرق التزامن الأول، من الكتلة 0 إلى القمة عند الكتلة 28,400 تقريبًا، نحو 50 دقيقة.

**بعد إعادة التشغيل يظهر رصيدك صفرًا لبعض الوقت.** في كل مرة يبدأ فيها التطبيق، يعيد بناء المحفظة من `secret.seed` ويفحص السلسلة من جديد بدءًا من الكتلة 0 ([المصدر](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3609-L3623)). وإلى أن يصل الفحص إلى معاملاتك (transactions)، يظهر رصيدك وحصتك المخزّنة بقيمة 0. في هذه التجربة عادا بعد نحو 15 دقيقة من إعادة التشغيل. يُعاد فحص محفظة الصنبور بالطريقة نفسها ([المصدر](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3588))، وأثناء الفحص أظهرت علامة التبويب Faucet Wallet رصيدًا كبيرًا جدًا. تجاهل كليهما حتى يكتمل Wallet Sync.

## الخطوة 3: احصل على بعض cTAZ

### عدّنها بنفسك

وفقًا لنشرة الإصدار، يبدأ التطبيق التعدين بالمعالج (CPU) لصالح محفظتك بمجرد أن يتزامن. لا تحتاج إلى تفعيل أي شيء. تذهب العملات المعدّنة إلى عنوان شفاف (transparent) في محفظتك ([المصدر](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L349-L355)).

أما إن كان سيعثر على كتلة فتلك مسألة أخرى. تحذّر النشرة من أنه «قد يتفوق عليك آخرون يعدّنون بسرعة أكبر، لذا لا يوجد ضمان للنجاح». افتراضيًا، يستخدم المعدّن المدمج خيطًا واحدًا للمعالج ([المصدر](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/config/mining.rs#L97-L100)).

لاستخدام خيوط أكثر، اضبط متغير بيئة في نافذة PowerShell نفسها قبل تشغيل التطبيق ([المصدر](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/config.rs#L109-L128)). استخدمت هذه التجربة أربعة خيوط:

```powershell
$env:ZEBRA_MINING__INTERNAL_MINER_THREADS = "4"
.\zebrad_v14_win32.exe
```

يبقى المتغير ساريًا ما دامت تلك النافذة مفتوحة فقط. ومع ضبطه، أظهر عدّاد المعالج في Windows أن العقدة تستهلك ما يعادل وقت أربعة إلى خمسة معالجات، بالنسبة المئوية لمعالج منطقي واحد:

```powershell
(Get-Counter '\Process(zebrad_v14_win32)\% Processor Time' -SampleInterval 2 -MaxSamples 3).CounterSamples.CookedValue
```

```text
506.362346582771
509.688760671639
505.957457577538
```

النتيجة: لم يعثر معالج Intel Core i5-8350U يعدّن على أربعة خيوط على أي كتلة، من الساعات الأولى من 8 أكتوبر حتى بعد ظهر 9 أكتوبر.

### أو استخدم الصنبور

يحتوي التطبيق على زر **Receive cTAZ** في أسفل اليمين. في الشيفرة المصدرية للإصدار 14، ترسل الضغطة الواحدة 0.5 cTAZ من محفظة الصنبور إلى محفظتك ([المبلغ](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3073)، [الإرسال](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L5018-L5021)). الصنبور محفظة واحدة تحملها كل نسخة من التطبيق ([المصدر](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3579-L3583))، وتعرض علامة التبويب **Faucet Wallet** رصيدها.

يكون الزر معطّلًا ما لم يكن لدى الصنبور أكثر من 5.01 cTAZ من العملات المحمية (shielded) ([المصدر](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L3975-L3989)). تحتسب علامة التبويب أيضًا العملات المعدّنة الخاصة بالصنبور، وهذه لا تُحمى إلا في دفعات من 10 cTAZ بالضبط زائد الرسوم (fee) ([المصدر](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L4880-L4884))، لذا قد تُظهر علامة التبويب رصيدًا وفيرًا بينما يبقى الزر رماديًا. في هذه التجربة بقي رماديًا يومي 8 و9 أكتوبر، مع ظهور «The صنبور is mining more funds.» عند تمرير المؤشر فوقه، بينما أظهرت علامة التبويب 14.74695 cTAZ.

**عندما يكون الزر رماديًا، اطلب من عقدتك.** لدى العقدة طريقة لطلب الصنبور، هي `requestfaucetdonation` ([المصدر](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L314-L315))، ولا تطبّق قاعدة الزر الخاصة بـ 5.01 cTAZ. ضع عنوانك مكان `YOUR_ADDRESS` (وهو الحقل `address` في `wallet_spendable_funds`، أدناه):

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

يعني هذا الرد أن الطلب أُدرج في قائمة الانتظار، لا أنه أُرسل. في هذه التجربة عُدّنت الـ 0.5 cTAZ القادمة من الصنبور في الكتلة 33,306 وأصبحت قابلة للإنفاق في الكتلة 33,322. اطلب مرة واحدة فقط: فالصنبور مشترك، ويُرفض أي طلب ثانٍ للعنوان نفسه ما دام الأول قيد الانتظار ([المصدر](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3553)).

### أو اطلب من مشارك آخر

يمكن لأي شخص على الشبكة أن يرسل إليك cTAZ عبر زر **Send** في التطبيق. في هذه التجربة أرسل مشارك آخر 31 cTAZ. وصلت بوصف «Received» مع النص «send from user wallet»، وهو النص الذي يرفقه زر Send في التطبيق نفسه ([المصدر](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L5036)). اطلب ذلك في [موضوع المنتدى](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210)، ولا تقدّم سوى عنوانك.

عملات الصنبور والهدايا كافية لتعلّم التخزين. لكنها لا تُحتسب ضمن مكافآت ZEC.

### تحقّق مما يمكنك إنفاقه

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"wallet_spendable_funds","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

كان هذا هو الرد بعد وصول الـ 0.5 cTAZ من الصنبور، مع اختصار العنوان:

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

المبالغ بوحدة zatoshi: كل 100,000,000 منها تساوي cTAZ واحدة. تحتاج العملات المحمية إلى 3 تأكيدات قبل أن تُحتسب قابلة للإنفاق ([المصدر](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L621-L634)). تصل العملات القادمة من الصنبور ومن المشاركين الآخرين إلى `spendable_zats`. أما العملات المعدّنة فهي شفافة، لذا تصل إلى `unshielded_zats` ([المصدر](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L4659)).

بعد كتلة واحدة من عملية التخزين الثانية في هذه التجربة، ظهر باقي الرصيد تحت `pending_zats`. وبعد بضع كتل أصبح قابلًا للإنفاق مجددًا.

## الخطوة 4: خزّن لدى مُنهٍ

### انتظر يوم التخزين

لا يُقبل التخزين وإلغاء التخزين والسحب إلا عندما

```text
block height mod 10,368 < 3,456
```

وهي نافذة من 3,456 كتلة في بداية كل 10,368 كتلة. وبزمن الكتلة المستهدف للشبكة البالغ 25 ثانية، يساوي ذلك يومًا واحدًا من كل ثلاثة أيام ([المصدر](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/transaction/mod.rs#L1540-L1547)). تُفتح النوافذ الأولى للإصدار 14 عند الكتل 20,736 و 31,104 و 41,472 و 51,840.

وفقًا لنشرة الإصدار، يعلن التطبيق بداية كل يوم تخزين ونهايته. في هذه التجربة أظهرت قائمة الكتل في التطبيق سطرًا أحمر «* STAKING DAY END *» بين الكتلتين 34,559 و 34,560.

**تقول نشرة الإصدار شيئين مختلفين.** تذكر قائمة التغييرات فيها «~1 يوم ليوم التخزين و~3 أيام لدورة التخزين»، وهو ما يطابق الشيفرة. وفي موضع لاحق، لا يزال قسم منقول من الموسم 1 يقول إن يوم التخزين يبدأ كل 150 كتلة ويستمر 70 كتلة. اعتمد على الأول. يقع سطر النهاية المذكور أعلاه حيث تغلق القاعدة الأولى النافذة (34,560 mod 10,368 = 3,456)؛ أما وفق القاعدة الثانية فكانت الكتلة 34,560 ستقع داخل نافذة.

### اختر مُنهيًا

يُعرَّف المُنهي بهويته، وهي نص يبدأ بـ `zfinv1`. تنشر ZecHub هوية المُنهي الذي تشغّله في [`zechub_validator_crosslink.json`](https://github.com/ZecHub/zechub/blob/main/zechub_validator_crosslink.json):

```text
zfinv1j65qJgeSId7ssZk6a71NvQG2KjD5hfJCYxWkCSPvQSmwibffVw52UYU72wKbrEL0-cw-C4PQoO5IlLgbsgA3q_Gf1mzYIKcnixNP9XXVgphIDuLI6RBMhjFfYWyzp4YN
```

انسخ الهوية من مصدر تثق به. وفقًا لنشرة الإصدار، يعرض التطبيق أيضًا قائمة بالمُنهين في لوحته اليمنى، مع أيقونة نسخ على يسار كل منهم.

بعد أن تخزّن، يشير سجل المحفظة و RPC إلى المُنهي بمفتاح ست عشري بدلًا من هويته. بالنسبة إلى المُنهي الخاص بـ ZecHub فإن هذا المفتاح هو `2941ef23...266aae8f`.

اختر مُنهيًا تثق به. لا يتضمن التصميم معاقبة تلقائية (slashing)، لكنه يسمح بـ «تفرّع صلب ينسّقه المستخدمون يحرق كل الحصص المفوَّضة إلى مُنهٍ محدد» ([كتاب Crosslink، نظرة عامة على التصميم](https://shieldedlabs.github.io/crosslink_book/branches/main/crosslink-design-overview-20260914.html)).

يحدد اختيارك أيضًا من يصوّت. يكسب كل سند ضمان نشط حصته من مكافأة التخزين. إذا كان مُنهيه من بين الـ 12 في القائمة، يذهب عُشر تلك الحصة إلى المُنهي عمولةً. أما سند الضمان الموجَّه إلى مُنهٍ من خارج الـ 12 فيحتفظ بحصته كاملة، لكن ذلك المُنهي لا يصوّت ([المصدر](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-state/src/service.rs#L2063-L2079)).

### خزّن

1. انسخ هوية المُنهي.
2. في علامة التبويب **Your Wallet**، اضغط **Stake**.
3. اضغط **Paste Identity**. يتغير السطر الموجود فوق الزر ليعرض الأحرف الأولى والأخيرة من الهوية، أي `[zfinv1j6..YWyzp4YN]` في حالة مُنهي ZecHub. تحقق منه قبل أن تتابع.
4. انقر على مبلغ. تأتي المبالغ بخطوات ثابتة أصغرها 0.01 cTAZ، ولا تُضاء إلا المبالغ التي يغطيها رصيدك. مع رصيد 0.5 cTAZ، كان المضاء +0.01 cTAZ و +0.1 cTAZ.

**لا شيء يطلب منك التأكيد، ويبدو أن شيئًا لا يحدث.** في هذه التجربة، قال المختبِر: «نقرت عليه مرة واحدة ولم يحدث شيء، فقط تحوّل إلى الرمادي ثم أضاء مجددًا.» لكن عملية التخزين كانت قد تمّت. أظهر سجل المحفظة «Staked @ 33334 to 2941ef23..266aae8f»، وكانت الرسوم 0.00015 cTAZ، وأظهرت المحفظة 0.010 cTAZ Staked. وأنشأت عملية تخزين ثانية بعد بضع دقائق سند ضمان ثانيًا، عند الكتلة 33,348.

تُنشئ كل عملية تخزين سند ضمان التفويض الخاص بها. والمبالغ الثابتة ويوم التخزين موجودان كلاهما من أجل الخصوصية (privacy): فهما يجعلان تمييز حصة شخص عن حصة شخص آخر أصعب.

## الخطوة 5: تحقق من مركزك

### سندات الضمان الخاصة بك

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"wallet_staking_positions","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

كان هذا هو الرد عند الكتلة 36,490، بعد يومين من التخزين:

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

لا يأخذ الاستدعاء أي وسائط. يُعيد سندات الضمان النشطة الخاصة بك، مجمّعة تحت مفتاح المُنهي الذي يدعمه كل منها، وسندات الضمان التي أنهت إلغاء التخزين ويمكن سحبها. يُظهر كل سند ضمان المبلغ المُخزَّن (`initial_val`)، وقيمته الحالية (`latest_val`)، والمعاملة وارتفاع الكتلة اللذين أنشآه. تُضاف المكافآت إلى سند الضمان نفسه: بحلول الكتلة 36,490 كان كل سند ضمان بقيمة 1,000,000 zatoshi قد نما إلى 1,003,451.

**تُظهر نافذة Edit Stake كل سند ضمان أكبر بعشر مرات من قيمته الفعلية.** في هذا التشغيل، ظهر كل سند ضمان بقيمة 0.01 cTAZ على أنه 0.100 cTAZ في صفه الخاص، ثم 0.1003536 cTAZ بعد أن بدأت المكافآت، بينما توافقت المجاميع فوق الصفوف (0.020 cTAZ، ولاحقًا 0.02007 cTAZ) مع RPC. اعتمد على المجاميع وعلى RPC.

وضعت النافذة نفسها مثلث تحذير بجانب المُنهي، قبل بدء النهائية وبعده. في الشيفرة المصدرية، يعني المثلث أن تطبيقك لا يعدّ ذلك المُنهي متصلًا، بينما يحصل المُنهي المتصل على أيقونة Wi-Fi بدلًا منه ([المصدر](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L2646-L2648)). ومع ذلك، حققت سندات الضمان مكافآت.

### المُنهون

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"get_tfl_recency_status","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

وفقًا لملاحظات الإصدار، يُبلغ هذا الاستدعاء عن موقع عقدتك في عملية التصويت، ولكل مُنهٍ، متى تلقّت عقدتك منه آخر مرة وكيف كان يصوّت.

قبل الكتلة 36,288 تكون كل الحقول صفرًا والقائمة فارغة. كان هذا هو الرد عند الكتلة 33,354:

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

بعد بدء النهائية، تضم القائمة المُنهين الموجودين في القائمة المعتمدة. عند الكتلة 36,490 ضمّت 12، من بينها `2941ef23...` التابع لـ ZecHub، وهو ما يطابق حد القائمة المعتمدة البالغ 12. هذه بداية ذلك الرد، مقطوعة بعد الإدخال الأول:

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

بعد بضع دقائق أظهرت اللوحة اليمنى في التطبيق «Finalizers (23)».

### على Linux وعلى macOS

تعطي [الشيفرة المصدرية](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L602-L610) الاستدعاء بصيغة `curl`. غيّر اسم الطريقة للاستدعاءات الأخرى. لم تُشغَّل هذه الصيغة لهذا الدليل:

```bash
curl -X POST -H "Content-Type: application/json" -d \
'{ "jsonrpc": "2.0", "method": "get_tfl_recency_status", "params": [], "id": 1 }' \
http://127.0.0.1:8232
```

على Linux، تقول ملاحظات الإصدار إنك على الأرجح تحتاج إلى تثبيت `xclip` قبل أن يعمل النسخ واللصق في التطبيق.

### اسم RPC واحد يجب الانتباه إليه

تصف ملاحظات الإصدار 14 استدعاء تخزين باسم `wallet_staking_action` يأخذ كائنًا. لا تحتوي الشيفرة المصدرية للإصدار 14 على طريقة بهذا الاسم، وفي هذا التشغيل أجابت العقدة:

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

طريقة التخزين التي تسجّلها العقدة هي [`staking_command`](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L418-L420)، وتأخذ نصًا واحدًا يحمل الطلب بصيغة JSON، مع تحديد المُنهي بهويته `zfinv1` ([المصدر](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-crosslink/src/lib.rs#L750-L760)). لم تُجرَّب هذه الطريقة لهذا الدليل.

**تغيّر بعد الإصدار 14.** ابتداءً من الإصدار 15، تسجّل العقدة `wallet_staking_action` ولم تعد لديها `staking_command` ([مصدر الإصدار 18](https://github.com/ShieldedLabs/crosslink_monolith/blob/v18/zebra-crosslink/zebra-rpc/src/methods.rs#L620-L622)). وتأخذ كائنًا واحدًا بأحد أربعة أشكال بالضبط، `CreateNewDelegationBond` أو `RetargetDelegationBond` أو `BeginDelegationUnbonding` أو `WithdrawDelegationBond`، ويُحدَّد المُنهي بمفتاح سداسي عشري من 64 محرفًا ([ملاحظات إصدار 15](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v15)). ابتداءً من الكتلة 189,000، تذكر كل معاملة تخزين أيضًا الإصدار الحالي لسند الضمان، لذلك يُرفض الإجراء المُنشأ بناءً على سند ضمان قديم، ويجب أن تعمل المحافظ بالإصدار 18 ([ملاحظات إصدار 18](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v18)). ولم يُجرَّب ذلك لهذا الدليل أيضًا.

## إلغاء التخزين والسحب

لا يمكن التراجع عن سند الضمان في اليوم الذي يُنشأ فيه. تستغرق العملية ثلاثة أيام تخزين (Staking Days) من البداية إلى النهاية: التخزين في يوم، وإلغاء التخزين في يوم لاحق، والسحب في يوم ثالث. وتضيف ملاحظات الإصدار أن سند الضمان الواحد لا يمكن أن يخضع لإجراءَي تخزين في يوم التخزين نفسه.

*لم يُشغَّل لهذا الدليل. من ملاحظات الإصدار 14:* لإلغاء التخزين، اضغط **Edit Stake**، واختر سند ضمان من قائمة Staked Bonds وانقر على أيقونة رابط السلسلة. للسحب في يوم تخزين لاحق، اضغط **Edit Stake**، واختر سند ضمان من قائمة Withdrawable Bonds وانقر على أيقونة المال. نقل سند ضمان إلى مُنهٍ مختلف، وهو ما تسميه الملاحظات إعادة الاستهداف (retargeting)، مسموح به في أي وقت.

## أين تراقب الشبكة

تجمع علامة التبويب [Crosslink في ZecHub أدوات](https://zechub.wiki/tools?tool=crosslink) الأدوات في مكان واحد، تحت إشعار نصه «التخزين على هذه الشبكة لا ينقل ZEC»:

- مُستضافة، دون الحاجة إلى عقدة: [Staker Space](https://crosslink.staker.space/)، وهي «لوحة معلومات مباشرة لشبكة cTAZ التجريبية الحالية» تعرض الارتفاع، والمعدّنين، ومعدل الحلول، والعد التنازلي ليوم التخزين، والنهائية، و[ctaz.cash](https://ctaz.cash/)، التي تعرض إنتاج التعدين، وقائمة المُنهين المعتمدة، والأقران، ومطالبات أسماء عناوين التخزين.
- على جهازك الخاص: `zcash-explorer`، الذي تعرض صفحته `/live/crosslink` التفعيل، وتأخر النهائية، والقائمة المعتمدة، ومراكز التخزين، و`crosslink_indexer`، وهو فهرس SQLite لعقدة Crosslink.

## أخطاء شائعة

**التخطيط وفق الساعة بدلًا من ارتفاع الكتلة.** تُحسب أيام التخزين بالكتل. راقب العد التنازلي في لوحة المعلومات، لا التقويم.

**التخزين في الدقائق الأخيرة من النافذة.** يُتحقق من القاعدة مقابل الكتلة التي تتضمن معاملتك ([المصدر](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-consensus/src/transaction.rs#L941-L953))، لذا يجب أن يُعدَّن التخزين قبل إغلاق النافذة، لا أن يُرسل فحسب.

**توقّع أن تُعدِّن ما ستخزّنه.** لم يعثر مُعدّن يعمل على المعالج المركزي بأربعة خيوط على معالج Intel Core i5-8350U على أي كتلة بين 8 و9 أكتوبر. احصل على أول cTAZ لك من الصنبور أو من مشارك آخر.

**النقر مرة أخرى لأنه بدا أن شيئًا لم يحدث.** كل نقرة على مبلغ تُنشئ سند ضمان جديدًا. تحقق من سجل المحفظة أو من `wallet_staking_positions` أولًا.

**الذعر بعد إعادة التشغيل.** يظهر رصيدك وتخزينك صفرًا حتى تُعيد المحفظة المسح. انتظر حتى تنتهي Wallet Sync.

**التعامل مع cTAZ كأنه أموال لعب، أو مع السر كأنه غير ضار.** إن cTAZ عملة اختبار، لكن cTAZ الذي تكسبه يحدد حصتك من ZEC الحقيقي. احرس `secret.seed` كما تحرس محفظة.

**قراءة التعليمات القديمة.** تحمل ملاحظات الإصدار نصوصًا من مواسم سابقة إلى جانب القواعد الجديدة. حيثما تتعارض مع ما تفعله عقدتك، فعقدتك هي المحقة.

## صفحات ذات صلة

- [بروتوكول Crosslink](/zcash-tech/crosslink-protocol) - التصميم الذي تختبره هذه الشبكة
- [Shielded Labs](/zcash-organizations/shielded-labs) - الفريق الذي يقف وراء Crosslink
- [التحقق من إصدارات Zcash](/guides/verifying-zcash-releases) - ما يثبته المجموع الاختباري وما لا يثبته
- [العقدة الكاملة Zebra](/zcash-tech/zebra-full-node) - العقدة التي بُني عليها تطبيق Feature Net
- [الشبكة التجريبية لـ Zcash](/using-zcash/testnet) - شبكة الاختبار العادية لـ Zcash، وهي شبكة مختلفة

## المصادر

- [ملاحظات الإصدار 14](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14)، Shielded Labs، 1 أكتوبر 2026
- [Crosslink: شبكات الميزات المحفَّزة](https://shieldedlabs.net/crosslink-incentivized-feature-nets/)، Shielded Labs، 2 أبريل 2026
- [Crosslink: Feature Net المحفَّزة](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210)، منتدى مجتمع Zcash
- [الأسئلة الشائعة لـ Crosslink](https://shieldedlabs.net/crosslink-faq/)، Shielded Labs
- [كتاب Crosslink](https://shieldedlabs.github.io/crosslink_book/)، Shielded Labs

---

*نُفِّذت الخطوات في هذه الصفحة باستخدام Feature Net الإصدار 14 على Windows 11 (الإصدار 10.0.26200.9550)، من 8 إلى 10 أكتوبر 2026. أي عبارة تستشهد بملاحظات الإصدار أو بالشيفرة المصدرية مأخوذة منها. أي شيء مُعلَّم بـ «لم يُشغَّل» لم تتم تجربته.*
