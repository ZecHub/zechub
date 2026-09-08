<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Viewing_Keys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Viewing Keys

تتيح لك العناوين المحمية إجراء المعاملات مع كشف أقل قدر ممكن على blockchain الخاصة بـ Zcash. فماذا يحدث عندما *تحتاج* إلى أن تُظهر لطرف محدد ما تملكه، أو ما أرسلته؟ لكل عنوان محمي Viewing Key يمنح صلاحية القراءة من دون منح القدرة على الإنفاق. تم تقديم Viewing Keys في [ZIP 310](https://zips.z.cash/zip-0310) وأُضيفت إلى البروتوكول في ترقية شبكة Sapling.

يُعد Viewing Key الأداة المناسبة للإفصاح الانتقائي: أنت من يختار من يرى ماذا، ولا تسلّم أبداً صلاحية الإنفاق من أجل ذلك.

## لماذا تستخدم Viewing Key؟

توضح كتابات Electric Coin Company حول هذا الموضوع الحالات الأكثر شيوعاً، وما تزال هي الحالات الشائعة حتى اليوم:

- **منصة تداول تراقب الإيداعات.** تقوم منصة التداول بتحميل Incoming Viewing Key على عقدة كشف متصلة بالإنترنت حتى تتمكن من ملاحظة إيداعات العملاء إلى عنوان محمي، بينما يبقى مفتاح الإنفاق على عتاد لا يتصل بالشبكة مطلقاً.
- **أمين حفظ يثبت ما بحوزته.** يسلّم أمين الحفظ المدقق Full Viewing Key لكل عنوان محمي. يمكن للمدقق التحقق من تلك الأرصدة ومراجعة النشاط السابق من تلك العناوين وإليها، ولا يمكنه فعل شيء آخر.
- **العناية الواجبة تجاه طرف مقابل.** عندما تحتاج منصة تداول إلى مراجعة السجل المحمي لعميل ضمن إجراءات العناية الواجبة المعززة، يمكنها طلب Viewing Key بدلاً من طلب الأموال.

## ما الذي يكشفه Viewing Key وما الذي لا يكشفه

يوجد أكثر من نوع واحد من المفاتيح، وهذا الاختلاف هو ما يحدد مقدار ما تفصح عنه.

| المفتاح | البادئة | ما الذي يمنحه |
|---|---|---|
| Unified full viewing key (UFVK) | `uview…` | يتيح رؤية المعاملات الواردة **والصادرة** لكل pool في الحساب |
| Unified incoming viewing key (UIVK) | `uivk…` | يتيح رؤية المعاملات الواردة فقط، لكل pool في الحساب |
| Sapling extended full viewing key | `zxviews…` | يتيح رؤية النشاط الوارد والصادر في Sapling لعناوين هذا المفتاح |

لا يمكن لأي من هذه المفاتيح الإنفاق. وجميعها دائمة بالمعنى المهم: المفتاح الذي قمت بتسليمه لا يمكن سحبه، ولا يمكن إلا تجاوزه بنقل الأموال إلى حساب لا يملك الطرف الآخر مفاتيحه.

هناك نقطتا إفصاح تستحقان الانتباه قبل مشاركة أي شيء.

**الوارد لا يعني الضيق في النطاق.** إن Unified incoming viewing key ينطبق على الحساب بأكمله، وليس على العنوان الواحد الذي سُئلت عنه. إن تصدير UIVK لعنوان Sapling واحد ما يزال يمنح رؤية للمعاملات الواردة عبر كل pool في ذلك الحساب، ولذلك فهو يكشف أكثر من العنوان الذي يشير إليه اسماً. يذكر [Zallet Book](https://zcash.github.io/zallet/zcashd/json_rpc.html) ذلك صراحة.

**العنوان المنشور يكشف بالفعل Incoming Viewing Key الخاص به أمام خصم مستقبلي.** تشير [ZIP 326](https://zips.z.cash/zip-0326) إلى أن الخصم الذي يمتلك حاسوباً كمومياً يمكنه استعادة Incoming Viewing Key من عنوان diversified منشور، وهذا ممكن بطريقة لا تنطبق على استعادة nullifier key. إن نشر عنوان ليس مماثلاً لنشر Viewing Key اليوم، لكن المسافة بينهما تصبح أقرب على مدى زمني طويل بما يكفي.

## Viewing Keys بعد Ironwood

قدمت NU6.3 الـ pool المحمي Ironwood وجعلت Orchard pool مخصصاً للإنفاق فقط، لذلك تنتقل الأموال من أحدهما إلى الآخر بمرور الوقت. انظر [Ironwood](/zcash-tech/ironwood) و[The turnstile](/zcash-tech/the-turnstile) لمعرفة تفاصيل الترقية نفسها.

**يبقى Viewing Key الذي تم إصداره قبل Ironwood صالحاً بعد الانتقال.** تحدد ZIP 326 أن المستلم، وIncoming Viewing Key الموافق له، يكونان ضمن نطاق بروتوكول Orchard وليس ضمن pool معيّن: حيث يقوم Incoming Viewing Key نفسه بـ trial-decrypt لكل من نصوص ملاحظات Orchard-pool وIronwood-pool المشفرة. ويطبّق Zallet ذلك بهذه الطريقة، إذ يصف ملاحظات Ironwood بأنها على هيئة Orchard ويتم فك تشفيرها تجريبياً باستخدام Orchard viewing keys الخاصة بالحساب ضمن نطاق تشفير ملاحظات Ironwood.

ثلاث نتائج تهم كل من يحتفظ بمفتاح أو يصدره:

1. **تنتقل الأرصدة بين الـ pools، ويشاهد الناظر ذلك أثناء حدوثه.** تحدد [ZIP 318](https://zips.z.cash/zip-0318) الانتقال على شكل سلسلة من معاملات Orchard-to-Ironwood الصغيرة والمتعمدة التجانس، التي تُبث وفق جدول عشوائي، بحيث تنفق كل معاملة ملاحظة Orchard واحدة وتنتج مخرج Ironwood واحداً بفئة معيارية. يرى المدقق الذي يراقب عبر Viewing Key الحيازات وهي تنتقل من pool إلى الآخر على مراحل تمتد أسابيع، لا في حركة واحدة. ويمكن لـ wallet إعادة بناء تقدّم انتقاله الذاتي من بيانات السلسلة باستخدام Viewing Keys الخاصة به.
2. **تكشف كل خطوة انتقال القيمة التي تنقلها.** هذا أمر جوهري عند عبور turnstile، وهو ما يجعل الانتقال قابلاً للتدقيق. إن تقسيم الرصيد إلى فئات معيارية يعني أن معاملة واحدة لا تكشف كامل رصيد Orchard-pool.
3. **قد تشتق الحسابات التي أُنشئت بعد Ironwood مفاتيحها بطريقة مختلفة.** تضيف [ZIP 2005](https://zips.z.cash/zip-2005) علَماً باسم `use_qsk` للمفاتيح القابلة للاسترجاع كمومياً، وتغيّر كيفية اشتقاق مفاتيح incoming وoutgoing وdiversifier، لذلك فإن مفاتيح `use_qsk = true` هي مفاتيح مختلفة فعلاً. تشترط ZIP 326 أن يكون هذا العلم موحداً عبر الحساب وتمنع إنشاء مفاتيح `use_qsk = true` قبل تفعيل NU6.3 على Mainnet. لذلك فإن المفتاح المصدّر من حساب كان موجوداً قبل Ironwood سيكون مفتاح `use_qsk = false`، ويظل صحيحاً لذلك الحساب. لا تفترض أن المفتاح المصدّر من حساب واحد يصف حساباً آخر.

## تصدير Viewing Key

### Zallet

يُعد [Zallet](https://github.com/zcash/zallet) wallet الخاصة بالعقدة الكاملة التي حلت محل wallet المدمجة داخل zcashd. وصل دعم تصدير واستيراد Viewing Key في **v0.1.0-beta.2 (28 يوليو 2026)**، لذا تحقق أولاً من نسختك؛ فالإصدارات الأقدم لا تحتوي على هذه الأساليب. يجب أن تكون كل الوسائط بعد اسم الأسلوب بصيغة JSON صحيحة، وهذا يعني أن القيم النصية تحتفظ بعلامات الاقتباس المزدوجة الخاصة بها. يشرح [Zallet Quick Reference Guide](/using-zcash/zallet-quick-reference-guide) النمط العام للأوامر.

اعرض ما يحتفظ به wallet:

```bash
zallet rpc listaddresses
```

صدّر Unified full viewing key الخاص بالحساب عبر تمرير Unified Address:

```bash
zallet rpc z_exportviewingkey '"<unified address>"'
```

صدّر Unified incoming viewing key الخاص بالحساب بدلاً من ذلك، باستخدام الوسيط الاختياري `ivk`:

```bash
zallet rpc z_exportviewingkey '"<unified address>"' true
```

يؤدي تمرير عنوان Sapling إلى إرجاع Sapling extended full viewing key (`zxviews…`) لذلك الحساب، بما يطابق سلوك zcashd القديم. وهناك حدّان موثقان: يتم رفض عناوين Sprout، ولا يمكن تصدير Sapling extended full viewing key من حساب تم استيراده أصلاً بوضع view-only، لأن wallet لا يمكنها إعادة بنائه. أما صيغة `ivk` فهي تعمل مع حسابات view-only المستوردة.

### المحافظ التي تصدّر Viewing Keys من واجهتها الخاصة

تتابع صفحة [Wallets](/using-zcash/wallets) دعم Viewing Keys وجاهزية Ironwood لكل wallet. وقت كتابة هذا النص، تشمل المحافظ التي تعرض كلاً من دعم Viewing Keys و**Ironwood: Ready** كلاً من ZODL وZingo! وZkool وCake وZallet وZecd وNozy. ارجع إلى تلك الصفحة بدلاً من هذه الصفحة قبل الاعتماد على أي wallet بعينها، لأن الجاهزية تتغير.

## استيراد Viewing Key كحساب watch-only

### Zkool

يُعد [Zkool](https://github.com/hhanh00/zkool2) الخيار الأكثر مرونة هنا، لأنه يقبل المفاتيح الموحدة وكذلك المفاتيح القديمة. يوثق README الخاص به حسابات view-only المُنشأة من **unified viewing key** أو **Sapling extended viewing key**، إلى جانب المفاتيح المحمية الممتدة القديمة المصدّرة من zcashd. أضف حساباً جديداً، واختر مسار view-only، ثم الصق مفتاح `uview…` أو `zxviews…`؛ بعد ذلك يقوم الحساب بالمزامنة ويعرض الأرصدة والسجل من دون أي صلاحية للإنفاق.

وصل دعم بروتوكول Ironwood والانتقال من Orchard إلى Ironwood في Zkool 6.24.0 (20 يوليو 2026)، وأصلحت النسخة 6.26.1 (2 أغسطس 2026) اكتشاف معاملات Ironwood في mempool. استخدم الإصدار 6.26.1 أو أحدث.

### Zallet

```bash
zallet rpc z_importviewingkey '"<zxviews… key>"' '"whenkeyisnew"' 0
```

الوسيط الثاني هو سياسة إعادة الفحص: `"whenkeyisnew"` (الافتراضي)، أو `"yes"` أو `"no"`. أما الثالث فهو ارتفاع الكتلة الذي تبدأ منه إعادة الفحص. يستورد Zallet المفتاح كحساب view-only ويتتبع المعاملات الواردة والصادرة لعناوينه من دون صلاحية إنفاق.

**يستورد Zallet مفاتيح Sapling extended full viewing key فقط.** فهو لا يستورد `uview…` unified full viewing key، مع أنه يستطيع تصديره. ولتسليم صلاحية القراءة إلى حساب موحد كامل، صدّر UFVK من Zallet واستورده إلى wallet تقبل المفاتيح الموحدة، مثل Zkool.

## ما الذي تغيّر، وما الذي يجب التوقف عن البحث عنه

إذا كنت قد اتبعت إصداراً أقدم من هذه الصفحة، أو ترجمة لها، فهناك ثلاثة مسارات لم تعد تعمل.

- **`zcash-cli z_exportviewingkey` و`z_importviewingkey`.** وصل zcashd إلى توقف نهاية الدعم في 18 يوليو 2026 ولم يعد يعمل. أساليب Zallet التي تحمل الاسم نفسه هي البديل؛ انظر [migration guide](/guides/migration-guide-zcashd-to-zebrad-zallet).
- **شرح Ywallet.** تشير صفحة Wallets إلى أن Ywallet **Ironwood: Not Ready**، لذلك فهي ليست الـ wallet المناسبة لتوجيه الناس إليها فيما يخص Viewing Keys في عصر Ironwood. يقبل Zkool، من المطور نفسه، النطاق نفسه من المفاتيح وموسوم بأنه Ready.
- **zcashblockexplorer.com/vk.** تعيد الخدمة HTTP 503 مع شهادة غير صالحة، وقد تم التخلي عنها بدلاً من استبدالها. إن لصق Viewing Key في موقع ويب يسلّم سجل معاملاتك بالكامل إلى من يدير ذلك الموقع، وكان هذا دائماً أضعف الخيارات الثلاثة في الصفحة القديمة. استورد المفتاح إلى wallet تشغّلها بنفسك بدلاً من ذلك.

## الموارد

استخدم Viewing Keys عند الحاجة فقط، وفضّل أضيق مفتاح يجيب عن السؤال المطروح.

- [ZIP 326: عواقب NU6.3 على المحافظ](https://zips.z.cash/zip-0326) — كيف تتصرف Viewing Keys عبر Orchard وIronwood pools
- [ZIP 229: صيغة المعاملة الإصدار 6](https://zips.z.cash/zip-0229) — يعرّف Orchard وIronwood pools
- [سجل تغييرات Zallet](https://github.com/zcash/zallet/blob/main/CHANGELOG.md) — أي إصدار أضاف أي أسلوب RPC
- [README الخاص بـ Zkool](https://github.com/hhanh00/zkool2/blob/main/README.md) — أنواع الحسابات والمفاتيح المدعومة
- [ECC، شرح Viewing Keys](https://electriccoin.co/blog/explaining-viewing-keys/)
- [ECC، الإفصاح الانتقائي وViewing Keys](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ECC، عرض فيديو حول Zcash Viewing Key](https://www.youtube.com/watch?v=NXjK_Ms7D5U&t=199s)
