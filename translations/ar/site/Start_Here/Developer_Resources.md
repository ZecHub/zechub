<a href="https://github.com/zechub/zechub/edit/main/site/Start_Here/Developer_Resources.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# موارد المطورين

الموارد التي تحتاجها للبناء على Zcash، مجمّعة بحسب الغرض من كل منها بدلاً من سردها في قائمة واحدة.

تغيّرت البنية التقنية كثيراً في عام 2026. بلغ zcashd، الذي شغّل الشبكة طوال معظم تاريخها، نهاية عمره في 18 يوليو 2026 عند ارتفاع الكتلة 3417100، وتوقفت كل عقدة غير معدّلة عند ذلك الارتفاع وسترفض إعادة التشغيل. أصبحت الأدلة المكتوبة لـ zcashd جزءاً من التاريخ بدلاً من أن تكون نقطة بداية، لذا تُنظَّم هذه الصفحة حول ما حلّ محلّه.

## نظرة سريعة على البنية التقنية

| الطبقة | ما الذي يُستخدم | ابدأ بـ |
|:--|:--|:--|
| عقدة كاملة | Zebra أو Zakura | [كتاب Zebra](https://zebra.zfnd.org/)، [zakura.com](https://zakura.com/) |
| محفظة العقدة الكاملة | Zallet، في المرحلة التجريبية | [كتاب Zallet](https://zcash.github.io/zallet/) |
| خادم المحفظة الخفيفة | Zaino أو lightwalletd | [Zaino](https://github.com/zingolabs/zaino)، [lightwalletd](https://github.com/zcash/lightwalletd) |
| مكتبات المحفظة | حزم librustzcash | [librustzcash](https://github.com/zcash/librustzcash) |
| الأجهزة المحمولة | حزم SDK لـ Android وiOS | [Android](https://github.com/zcash/zcash-android-wallet-sdk)، [iOS](https://github.com/zcash/zcash-swift-wallet-sdk) |
| المواصفات | مواصفات البروتوكول وZIPs | [zips.z.cash](https://zips.z.cash) |

## العقد

تتحقق العقدة من الإجماع وتحتفظ بالسلسلة. توجد عمليتان قيد التطوير النشط.

تُعدّ [Zebra](/zcash-tech/zebra-full-node) عقدة Zcash Foundation، وهي مكتوبة بلغة Rust، وتفترضها معظم الأدلة الآن. يشرح [كتاب Zebra](https://zebra.zfnd.org/) كيفية تثبيتها وتشغيلها، ويُجرى التطوير في [المستودع](https://github.com/ZcashFoundation/zebra).

تُعدّ [Zakura](/zcash-tech/zakura-node) عقدة أحدث، يصفها مؤلفوها بأنها «عقدة كاملة متوافقة مع إجماع Zcash، ومصممة للتوسع»، مع مزامنة أسرع، وتقليم للكتل، ووضع توافق مع zcashd. يقودها Sean Bowe، أحد مؤسسي Zcash، وDev Ojha. وهي مفتوحة المصدر بموجب Apache 2.0 في [zakura-core/zakura](https://github.com/zakura-core/zakura).

لدى ZecHub صفحة [العقد الكاملة](/zcash-tech/full-nodes) التي تغطي المفاضلات بينها.

## محفظة العقدة الكاملة

كان zcashd يضم محفظة مع العقدة. لم تعد تلك المحفظة موجودة، و[Zallet](https://github.com/zcash/zallet) هو البديل. يصف كتاب Zallet هذه المحفظة بأنها «محفظة Zcash لعقدة كاملة مكتوبة بلغة Rust» ويجري «إنشاؤها كبديل لمحفظة zcashd».

اقرأ تحذير الأمان قبل الاعتماد عليها. لا يزال Zallet في المرحلة التجريبية، و«لم يُراجع بالكامل»، وقد «تحدث تغييرات غير متوافقة في أي وقت، ما يتطلب منك حذف محفظة Zallet وإعادة إنشائها»، كما لم تُنقل بعد كل طرائق RPC الخاصة بـ zcashd.

إذا كنت تنقل إعداداً قائماً، فلدى ZecHub [دليل ترحيل من zcashd إلى Zebra وZallet](/guides/migration-guide-zcashd-to-zebrad-zallet) و[مرجع سريع لـ Zallet](/using-zcash/zallet-quick-reference-guide).

## خوادم المحافظ الخفيفة

لا تشغّل معظم المحافظ عقدة. بل تتصل بخادم يحتفظ بالسلسلة ويعيد لها عرضاً مضغوطاً منها.

يُعدّ [lightwalletd](https://github.com/zcash/lightwalletd) الخدمة الأصلية، وهو مكتوب بلغة Go، ويوصف بأنه «خدمة خلفية توفر واجهة فعالة من حيث عرض النطاق إلى blockchain الخاصة بـ Zcash». أما [Zaino](/zcash-tech/zaino) فهو المفهرس الأحدث، مكتوب بلغة Rust، ويقرأ من مُصدّق كامل بدلاً من الاحتفاظ بنسخته الخاصة من السلسلة.

تغطي وثائق [بروتوكول العميل الخفيف](https://zcash.readthedocs.io/en/latest/lightwalletd/index.html) البروتوكول نفسه. وتغطي صفحة [عقد المحافظ الخفيفة](/zcash-tech/lightwallet-nodes) ما يمكن لهذه الخوادم رؤيته وما لا يمكنها رؤيته عن المستخدم، وهو أمر يستحق الفهم قبل اختيار أحدها.

## بناء محفظة

تجري معظم أعمال المحافظ في حزم Rust ضمن [librustzcash](https://github.com/zcash/librustzcash)، والتي تعتمد عليها حزم SDK للأجهزة المحمولة وعدة محافظ سطح مكتب. كل حزمة موثقة على [docs.rs](https://docs.rs).

| الحزمة | الغرض منها |
|:--|:--|
| zcash_client_backend | «واجهات API لإنشاء عملاء Zcash خفيفة محمية»، بما في ذلك المزامنة وإنشاء المعاملات |
| zcash_client_sqlite | «عميل Zcash خفيف قائم على SQLite»، وهو طبقة التخزين لما سبق |
| zcash_keys | «إدارة مفاتيح وعناوين Zcash» |
| zcash_primitives | «تنفيذات Rust لبدائيات Zcash» |
| zcash_protocol | «ثوابت شبكة بروتوكول Zcash وأنواع القيم» |
| orchard | «بروتوكول معاملات Orchard المحمية» |
| sapling-crypto | «مكتبة تشفير لـ Zcash Sapling» |
| pczt | «أدوات للعمل مع معاملات Zcash المُنشأة جزئياً»، تُستخدم للتوقيع بالأجهزة والتوقيع متعدد الأجهزة |
| zip321 | عناوين URI لطلبات الدفع، كما هو محدد في ZIP 321 |

للأجهزة المحمولة، تلتف [Android SDK](https://github.com/zcash/zcash-android-wallet-sdk) و[iOS SDK](https://github.com/zcash/zcash-swift-wallet-sdk) حول تلك المكتبات. كان مستودع iOS يُسمى سابقاً ZcashLightClientKit، لذا تستخدم الروابط والمقالات الأقدم ذلك الاسم.

## المواصفات والتشفير

تُعدّ [مواصفات البروتوكول](https://zips.z.cash/protocol/protocol.pdf) المرجع المعتمد لكيفية عمل Zcash، بما في ذلك [ترميزات العناوين والمفاتيح](https://zips.z.cash/protocol/protocol.pdf#5.6%20Encodings%20of%20Addresses%20and%20Keys).

تمثل [ZIPs](https://zips.z.cash) المكان الذي تُقترح فيه التغييرات وتُحدَّد مواصفاتها، ويبيّن الفهرس أيّها مسودات وأيّها نهائي. تُطلق تغييرات الإجماع ضمن ترقيات الشبكة، ويتابعها ZecHub في صفحة [ترقيات الشبكة](/start-here/network-upgrades).

للتشفير الكامن، اقرأ [كتاب halo2](https://zcash.github.io/halo2/index.html) و[كتاب Orchard](https://zcash.github.io/orchard/)، إلى جانب وثائق حزم [halo2](https://docs.rs/halo2_proofs/latest/halo2_proofs/) و[orchard](https://docs.rs/orchard/latest/orchard/). يغطي [كتاب FROST](https://frost.zfnd.org/) التوقيعات الحدّية، ولدى ZecHub صفحة [FROST](/zcash-tech/frost).

## Testnet

تمثل Testnet سلسلة منفصلة تحتوي على عملات بلا قيمة، تسمى TAZ. يمكن لكل من Zebra وZakura العمل عليها، ويغطي [دليل testnet](https://zcash.readthedocs.io/en/latest/rtd_pages/testnet_guide.html) إعداد العقدة.

يُعدّ [testnet.zcashexplorer.app](https://testnet.zcashexplorer.app/) مستكشف كتل testnet عاملاً، وله نظير على mainnet في [mainnet.zcashexplorer.app](https://mainnet.zcashexplorer.app/).

الحصول على TAZ هو الجزء المربك. تظهر الصنابير العامة وتختفي، ولم تكن الصنابير المرتبطة في الوثائق الأقدم تستجيب عند كتابة هذه الصفحة. والمسار الموثوق هو السؤال في Discord الخاص بالبحث والتطوير لـ Zcash، وهو ما تقترحه وثائق Zcash نفسها.

## الوثائق العامة

تظل [وثائق Zcash](https://zcash.readthedocs.io/en/latest/) أوسع مصدر منفرد، إذ تغطي مفاهيم البروتوكول والتكامل والتعدين. اقرأها بشيء من الحذر. فهي مُصَدَّرة وفقاً لـ zcashd، لذا تصف أجزاء منها عقدة لم تعد تعمل، بينما تظل أقسام البروتوكول والعميل الخفيف مفيدة. يجدر قراءة [نموذج تهديدات تطبيق محفظة Zcash](https://zcash.readthedocs.io/en/latest/rtd_pages/wallet_threat_model.html) الموجود فيها قبل تصميم أي شيء يمس خصوصية المستخدم.

إذا كنت جديداً على blockchain عموماً، فكتاب [Mastering Bitcoin](https://github.com/bitcoinbook/bitcoinbook) هو التوصية المعتادة لفهم الأساسيات المشتركة، ويمكن قراءته كاملاً مجاناً. لكنه لا يغطي المعاملات المحمية.

## أدوات أخرى ذكرها المطورون

يُعدّ [Arti](https://docs.rs/arti/latest/arti/) تنفيذ Rust لـ Tor، ويستخدمه zcash_client_backend لتوجيه حركة مرور المحفظة. ويظهر [Tailscale](https://github.com/tailscale/tailscale) كخيار للاتصال بعقدة تشغّلها بنفسك. أما [warp2](https://github.com/hhanh00/warp2) فهو تنفيذ للمزامنة السريعة من Hanh، رغم أنه لم يُحدَّث منذ عام 2023.

## المجتمع والفعاليات

يُناقش تطوير البروتوكول والمحافظ في [Discord البحث والتطوير لـ Zcash](https://discord.gg/6AK7keWFaK)، بينما يستضيف [منتدى مجتمع Zcash](https://forum.zcashcommunity.com/) المقترحات الأطول ونقاشات الدعم.

تمثل نتائج الهاكاثونات الأخيرة صورة جيدة عما يبنيه الناس: [ZecHub 2024](https://x.com/ZecHub/status/1845212469809033489)، و[ZecHub 2025](https://x.com/ZecHub/status/1975565960661635283)، و[Zypherpunk Hackathon 2025](https://forum.zcashcommunity.com/t/zypherpunk-hackathon-winners/53985).

## الموارد المتقاعدة

أُبقيت لأن المقالات الأقدم ترتبط بها، ولأنها لا تزال مرجعاً لكيفية عمل العقدة المتقاعدة. لا تبدأ من هنا.

يوثق [كتاب Zcashd](https://zcash.github.io/zcash/) و[مرجع RPC لـ zcashd](https://zcash.github.io/rpc/) برمجيات بلغت [نهاية العمر](https://zcash.github.io/zcash/user/end-of-life.html) في يوليو 2026. ومستودع [zcash/zcash](https://github.com/zcash/zcash) مؤرشف.

إذا كان لديك مورد لإضافته، أو لاحظت شيئاً هنا أصبح قديماً، فافتح issue أو pull request. لا تملك الفرق دائماً القدرة على إبقاء كل شيء محدّثاً، والإبلاغ عما واجهته يساعد في توجيه الأدلة.

**آخر تحديث:** أغسطس 2026
