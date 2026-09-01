<a href="https://github.com/zechub/zechub/edit/main/site/Start_Here/Developer_Resources.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# موارد المطورين

الموارد التي تحتاجها للبناء على Zcash، مجمعة بحسب الغرض من كل منها بدلًا من سردها كلها في قائمة واحدة.

لقد تغيّرت الطبقة البرمجية كثيرًا في عام 2026. بلغ zcashd، الذي شغّل الشبكة طوال معظم تاريخها، نهاية عمره التشغيلي في 18 يوليو 2026 عند ارتفاع الكتلة 3417100، وتوقفت كل عقدة غير معدلة عند ذلك الارتفاع وسترفض إعادة التشغيل. أصبحت الأدلة المكتوبة لـ zcashd جزءًا من الماضي الآن بدلًا من أن تكون نقطة بداية، لذلك نُظّمت هذه الصفحة حول ما حلّ محلّه.

## نظرة سريعة على الطبقة البرمجية

| Layer | What to use | Start with |
|:--|:--|:--|
| العقدة الكاملة | Zebra أو Zakura | [كتاب Zebra](https://zebra.zfnd.org/), [zakura.com](https://zakura.com/) |
| محفظة العقدة الكاملة | Zallet، في النسخة التجريبية | [كتاب Zallet](https://zcash.github.io/zallet/) |
| خادم المحفظة الخفيفة | Zaino أو lightwalletd | [Zaino](https://github.com/zingolabs/zaino), [lightwalletd](https://github.com/zcash/lightwalletd) |
| مكتبات المحافظ | حزم librustzcash | [librustzcash](https://github.com/zcash/librustzcash) |
| الأجهزة المحمولة | حزم SDK لـ Android و iOS | [Android](https://github.com/zcash/zcash-android-wallet-sdk), [iOS](https://github.com/zcash/zcash-swift-wallet-sdk) |
| المواصفات | مواصفة البروتوكول و ZIPs | [zips.z.cash](https://zips.z.cash) |

## العقد

تتحقق العقدة من الإجماع وتحتفظ بالسلسلة. توجد حاليًا عمليتا تنفيذ قيد التطوير النشط.

[Zebra](/zcash-tech/zebra-full-node) هي عقدة Zcash Foundation، ومكتوبة بلغة Rust، وهي التي تفترضها الآن معظم الأدلة. يغطي [كتاب Zebra](https://zebra.zfnd.org/) تثبيتها وتشغيلها، و[المستودع](https://github.com/ZcashFoundation/zebra) هو المكان الذي يجري فيه التطوير.

[Zakura](/zcash-tech/zakura-node) هي عقدة أحدث، ويصفها مؤلفوها بأنها "عقدة Zcash كاملة متوافقة مع الإجماع، ومبنية للتوسع"، مع مزامنة أسرع، وتشذيب للكتل، ووضع توافق مع zcashd. يقودها Sean Bowe، وهو أحد مؤسسي Zcash، وDev Ojha. وهي مفتوحة المصدر تحت ترخيص Apache 2.0 على [zakura-core/zakura](https://github.com/zakura-core/zakura).

لدى ZecHub صفحة [العقد الكاملة](/zcash-tech/full-nodes) تغطي المفاضلات بينها.

## محفظة العقدة الكاملة

كان zcashd يضم محفظة مدمجة مع العقدة. لم تعد تلك المحفظة موجودة، و[Zallet](https://github.com/zcash/zallet) هو البديل. يصف كتاب Zallet هذه الأداة بأنها "محفظة Zcash للعقدة الكاملة مكتوبة بلغة Rust" ويجري "بناؤها كبديل لمحفظة zcashd".

اقرأ التحذير الأمني قبل الاعتماد عليها. Zallet ما تزال في النسخة التجريبية، و"لم تخضع لمراجعة كاملة بعد"، وقد "تحدث تغييرات كاسرة في أي وقت، بما يتطلب منك حذف محفظة Zallet الخاصة بك وإعادة إنشائها"، كما أنه لم تُنقل بعد كل أساليب RPC الخاصة بـ zcashd.

إذا كنت تنقل إعدادًا قائمًا، فلدى ZecHub [دليل ترحيل من zcashd إلى Zebra و Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet) و[مرجع سريع لـ Zallet](/using-zcash/zallet-quick-reference-guide).

## خوادم المحافظ الخفيفة

معظم المحافظ لا تشغّل عقدة. بل تتواصل مع خادم يحتفظ بالسلسلة ويعيد لها عرضًا مضغوطًا لها.

[lightwalletd](https://github.com/zcash/lightwalletd) هي الخدمة الأصلية، ومكتوبة بلغة Go، وتوصف بأنها "خدمة خلفية توفّر واجهة موفرة للنطاق الترددي إلى blockchain الخاصة بـ Zcash". أما [Zaino](/zcash-tech/zaino) فهو المفهرس الأحدث، ومكتوب بلغة Rust، ويقرأ من مدقّق كامل بدلًا من الاحتفاظ بنسخته الخاصة من السلسلة.

تغطي وثائق [بروتوكول العميل الخفيف](https://zcash.readthedocs.io/en/latest/lightwalletd/index.html) البروتوكول نفسه. وتغطي صفحة [عقد Lightwallet](/zcash-tech/lightwallet-nodes) ما يمكن لهذه الخوادم وما لا يمكنها رؤيته عن المستخدم، ومن المفيد فهم ذلك قبل اختيار أحدها.

## بناء محفظة

يحدث معظم العمل على المحافظ داخل حزم Rust ضمن [librustzcash](https://github.com/zcash/librustzcash)، والتي تبني عليها حزم SDK المحمولة وعدة محافظ سطح مكتب. كل حزمة موثقة على [docs.rs](https://docs.rs).

| Crate | What it is for |
|:--|:--|
| zcash_client_backend | "واجهات API لإنشاء عملاء Zcash خفيفة محمية"، بما في ذلك المزامنة وبناء المعاملات |
| zcash_client_sqlite | "عميل Zcash خفيف قائم على SQLite"، وهو طبقة التخزين لما سبق |
| zcash_keys | "إدارة مفاتيح وعناوين Zcash" |
| zcash_primitives | "تنفيذات Rust للأوليات الخاصة بـ Zcash" |
| zcash_protocol | "ثوابت شبكة بروتوكول Zcash وأنواع القيم" |
| orchard | "بروتوكول معاملات Orchard المحمية" |
| sapling-crypto | "مكتبة تشفير لـ Zcash Sapling" |
| pczt | "أدوات للعمل مع معاملات Zcash المنشأة جزئيًا"، وتُستخدم للتوقيع عبر الأجهزة الصلبة ومتعددة الأجهزة |
| zip321 | معرّفات URI لطلبات الدفع، كما هو محدد في ZIP 321 |

بالنسبة للأجهزة المحمولة، تقوم [Android SDK](https://github.com/zcash/zcash-android-wallet-sdk) و[iOS SDK](https://github.com/zcash/zcash-swift-wallet-sdk) بتغليف تلك المكتبات. كان مستودع iOS يُسمى سابقًا ZcashLightClientKit، لذلك تستخدم الروابط والمقالات الأقدم ذلك الاسم.

## المواصفات والتشفير

تُعد [مواصفة البروتوكول](https://zips.z.cash/protocol/protocol.pdf) المرجع المعتمد لكيفية عمل Zcash، بما في ذلك [ترميزات العناوين والمفاتيح](https://zips.z.cash/protocol/protocol.pdf#5.6%20Encodings%20of%20Addresses%20and%20Keys).

تشكل [ZIPs](https://zips.z.cash) المكان الذي تُقترح فيه التغييرات وتُحدَّد، ويُظهر الفهرس أيّها مسودات وأيّها نهائي. تُشحن تغييرات الإجماع ضمن ترقيات الشبكة، ويتابعها ZecHub في صفحة [ترقيات الشبكة](/start-here/network-upgrades).

أما بالنسبة للتشفير الكامن تحت ذلك، فاقرأ [كتاب halo2](https://zcash.github.io/halo2/index.html) و[كتاب Orchard](https://zcash.github.io/orchard/)، إلى جانب وثائق الحزمتين [halo2](https://docs.rs/halo2_proofs/latest/halo2_proofs/) و[orchard](https://docs.rs/orchard/latest/orchard/). ويغطي [كتاب FROST](https://frost.zfnd.org/) التوقيعات الحدّية، ولدى ZecHub صفحة [FROST](/zcash-tech/frost).

## Testnet

Testnet هي سلسلة منفصلة بعملات بلا قيمة تُسمى TAZ. يمكن لكل من Zebra و Zakura العمل عليها، ويغطي [دليل testnet](https://zcash.readthedocs.io/en/latest/rtd_pages/testnet_guide.html) إعداد العقدة.

يُعد [testnet.zcashexplorer.app](https://testnet.zcashexplorer.app/) مستكشف كتل عاملًا لـ testnet، وله نظير على mainnet في [mainnet.zcashexplorer.app](https://mainnet.zcashexplorer.app/).

الحصول على TAZ هو الجزء المربك. تظهر الصنابير العامة وتختفي، ولم تكن تلك المرتبطة في الوثائق الأقدم تستجيب عند كتابة هذه الصفحة. والطريق الموثوق هو السؤال في Discord الخاص بـ Zcash R&D، وهو ما تقترحه أيضًا وثائق Zcash نفسها.

## الوثائق العامة

تظل [وثائق Zcash](https://zcash.readthedocs.io/en/latest/) أوسع مصدر منفرد، إذ تغطي مفاهيم البروتوكول والتكامل والتعدين. اقرأها بحذر إلى حد ما. فهي مُؤرشفة بالإصدارات مقابل zcashd، لذا تصف أجزاء منها عقدة لم تعد تعمل، بينما تبقى أقسام البروتوكول والعميل الخفيف مفيدة. ويستحق [نموذج التهديد لتطبيق محفظة Zcash](https://zcash.readthedocs.io/en/latest/rtd_pages/wallet_threat_model.html) الموجود هناك القراءة قبل تصميم أي شيء يمس خصوصية المستخدم.

إذا كنت جديدًا على blockchain عمومًا، فإن [Mastering Bitcoin](https://github.com/bitcoinbook/bitcoinbook) هو التوصية المعتادة للأساسيات المشتركة، وهو متاح مجانًا للقراءة كاملًا. لكنه لا يغطي المعاملات المحمية.

## أدوات أخرى ذكرها المطورون

[Arti](https://docs.rs/arti/latest/arti/) هو تنفيذ Rust لـ Tor، ويستخدمه zcash_client_backend لتوجيه حركة مرور المحفظة. ويظهر [Tailscale](https://github.com/tailscale/tailscale) عند الحديث عن الاتصال بعقدة تشغّلها بنفسك. أما [warp2](https://github.com/hhanh00/warp2) فهو تنفيذ مزامنة سريع من Hanh، رغم أنه لم يُحدّث منذ عام 2023.

## المجتمع والفعاليات

يُعد [Discord الخاص بـ Zcash R&D](https://discord.gg/6AK7keWFaK) المكان الذي تُناقش فيه تطويرات البروتوكول والمحافظ، بينما يستضيف [منتدى مجتمع Zcash](https://forum.zcashcommunity.com/) المقترحات الأطول وسلاسل الدعم.

تُعد نتائج الهاكاثونات الأخيرة صورة جيدة عمّا يبنيه الناس: [ZecHub 2024](https://x.com/ZecHub/status/1845212469809033489)، [ZecHub 2025](https://x.com/ZecHub/status/1975565960661635283) و[Zypherpunk Hackathon 2025](https://forum.zcashcommunity.com/t/zypherpunk-hackathon-winners/53985).

## الموارد المتقاعدة

أُبقيت هنا لأن المقالات الأقدم تشير إليها، ولأنها ما تزال المرجع لكيفية عمل العقدة المتقاعدة. لا تبدأ من هنا.

يوثق [كتاب Zcashd](https://zcash.github.io/zcash/) و[مرجع RPC الخاص بـ zcashd](https://zcash.github.io/rpc/) برمجيات بلغت [نهاية عمرها التشغيلي](https://zcash.github.io/zcash/user/end-of-life.html) في يوليو 2026. وقد أُرشف مستودع [zcash/zcash](https://github.com/zcash/zcash).

إذا كانت لديك مادة لإضافتها، أو لاحظت أن شيئًا هنا أصبح قديمًا، فافتح issue أو pull request. لا تمتلك الفرق دائمًا القدرة على إبقاء كل شيء محدثًا، والإشارة إلى ما واجهته تساعد في توجيه الأدلة.

**آخر تحديث:** أغسطس 2026
