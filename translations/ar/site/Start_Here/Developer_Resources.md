<a href="https://github.com/zechub/zechub/edit/main/site/Start_Here/Developer_Resources.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# موارد المطورين

الموارد التي تحتاجها للبناء على Zcash، مجمّعة حسب غرض كل منها بدلًا من إدراجها في قائمة واحدة.

تغيّرت البنية التقنية كثيرًا في عام 2026. فقد وصل zcashd، الذي شغّل الشبكة طوال معظم تاريخها، إلى نهاية عمره في 18 يوليو 2026 عند ارتفاع الكتلة 3417100، وتوقفت كل عقدة غير معدّلة عن العمل عند ذلك الارتفاع وسترفض إعادة التشغيل. أصبحت الأدلة المكتوبة لـ zcashd جزءًا من التاريخ لا نقطة بداية، لذلك نُظّمت هذه الصفحة حول ما حلّ محله.

## البنية التقنية في لمحة

| الطبقة | ما يُستخدم | ابدأ بـ |
|:--|:--|:--|
| عقدة كاملة | Zebra أو Zakura | [كتاب Zebra](https://zebra.zfnd.org/)، [zakura.com](https://zakura.com/) |
| محفظة عقدة كاملة | Zallet، في مرحلة beta | [كتاب Zallet](https://zcash.github.io/zallet/) |
| خادم محفظة خفيفة | Zaino أو lightwalletd | [Zaino](https://github.com/zingolabs/zaino)، [lightwalletd](https://github.com/zcash/lightwalletd) |
| مكتبات المحافظ | حزم librustzcash | [librustzcash](https://github.com/zcash/librustzcash) |
| الأجهزة المحمولة | حِزما SDK لنظامي Android وiOS | [Android](https://github.com/zcash/zcash-android-wallet-sdk)، [iOS](https://github.com/zcash/zcash-swift-wallet-sdk) |
| المواصفات | مواصفات البروتوكول وZIPs | [zips.z.cash](https://zips.z.cash) |

## العقد

تتحقق العقدة من الإجماع وتحتفظ بالسلسلة. توجد عمليتا تنفيذ قيد التطوير النشط.

[Zebra](/zcash-tech/zebra-full-node) هي عقدة Zcash Foundation، مكتوبة بلغة Rust، وهي العقدة التي تفترضها معظم الأدلة الآن. يشرح [كتاب Zebra](https://zebra.zfnd.org/) كيفية تثبيتها وتشغيلها، ويجري التطوير في [المستودع](https://github.com/ZcashFoundation/zebra).

[Zakura](/zcash-tech/zakura-node) هي عقدة أحدث، يصفها مؤلفوها بأنها «عقدة كاملة متوافقة مع إجماع Zcash، ومصممة للتوسع»، مع مزامنة أسرع، وتقليم الكتل، ووضع توافق مع zcashd. يقودها Sean Bowe، أحد مؤسسي Zcash، وDev Ojha. وهي مفتوحة المصدر بموجب Apache 2.0 على [zakura-core/zakura](https://github.com/zakura-core/zakura).

لدى ZecHub صفحة [العقد الكاملة](/zcash-tech/full-nodes) التي تغطي المفاضلات بينها.

## محفظة العقدة الكاملة

كان zcashd يضم محفظة مع العقدة. تلك المحفظة لم تعد موجودة، و[Zallet](https://github.com/zcash/zallet) هو البديل. يصف كتاب Zallet هذه المحفظة بأنها «محفظة Zcash لعقدة كاملة مكتوبة بلغة Rust» و«تُبنى كبديل لمحفظة zcashd».

اقرأ تحذير الأمان قبل الاعتماد عليها. لا يزال Zallet في مرحلة beta، و«لم يُراجع بالكامل»، وقد «تحدث تغييرات غير متوافقة في أي وقت، ما يتطلب منك حذف محفظة Zallet الخاصة بك وإعادة إنشائها»، ولم تُنقل كل أساليب RPC الخاصة بـ zcashd بعد.

إذا كنت تنقل إعدادًا قائمًا، فلدى ZecHub [دليل ترحيل من zcashd إلى Zebra وZallet](/guides/migration-guide-zcashd-to-zebrad-zallet) و[مرجع سريع لـ Zallet](/using-zcash/zallet-quick-reference-guide).

## خوادم المحافظ الخفيفة

لا تشغّل معظم المحافظ عقدة. بل تتصل بخادم يحتفظ بالسلسلة ويعيد عرضًا مضغوطًا لها.

يُعد [lightwalletd](https://github.com/zcash/lightwalletd) الخدمة الأصلية، وهو مكتوب بلغة Go ويوصف بأنه «خدمة خلفية توفر واجهة فعالة في استهلاك النطاق الترددي إلى blockchain الخاصة بـ Zcash». أما [Zaino](/zcash-tech/zaino) فهو المفهرس الأحدث، مكتوب بلغة Rust، ويقرأ من مدقق كامل بدلًا من الاحتفاظ بنسخته الخاصة من السلسلة.

تغطي وثائق [بروتوكول العميل الخفيف](https://zcash.readthedocs.io/en/latest/lightwalletd/index.html) البروتوكول نفسه. وتغطي صفحة [عقد المحافظ الخفيفة](/zcash-tech/lightwallet-nodes) ما يمكن لهذه الخوادم رؤيته وما لا يمكنها رؤيته عن المستخدم، وهو أمر يستحق الفهم قبل اختيار أحدها.

## بناء محفظة

تجري معظم أعمال المحافظ في حزم Rust ضمن [librustzcash](https://github.com/zcash/librustzcash)، التي تُبنى عليها حِزم SDK للأجهزة المحمولة وعدة محافظ لسطح المكتب. كل حزمة موثقة على [docs.rs](https://docs.rs).

| الحزمة | الغرض منها |
|:--|:--|
| zcash_client_backend | «واجهات API لإنشاء عملاء Zcash خفيفين محميين»، بما في ذلك المزامنة وبناء المعاملات |
| zcash_client_sqlite | «عميل Zcash خفيف قائم على SQLite»، وهو طبقة التخزين لما سبق |
| zcash_keys | «إدارة مفاتيح وعناوين Zcash» |
| zcash_primitives | «عمليات تنفيذ Rust لبدائيات Zcash» |
| zcash_protocol | «ثوابت شبكة بروتوكول Zcash وأنواع القيم» |
| orchard | «بروتوكول معاملات Orchard المحمي» |
| sapling-crypto | «مكتبة تشفير لـ Zcash Sapling» |
| pczt | «أدوات للعمل مع معاملات Zcash المُنشأة جزئيًا»، تُستخدم للتوقيع بواسطة الأجهزة والمُتعددة الأجهزة |
| zip321 | معرّفات URI لطلبات الدفع، كما هو محدد في ZIP 321 |

للأجهزة المحمولة، تقوم [حزمة SDK لنظام Android](https://github.com/zcash/zcash-android-wallet-sdk) و[حزمة SDK لنظام iOS](https://github.com/zcash/zcash-swift-wallet-sdk) بتغليف تلك المكتبات. كان مستودع iOS يُسمى سابقًا ZcashLightClientKit، ولذلك تستخدم الروابط والمقالات الأقدم ذلك الاسم.

## المواصفات والتشفير

تُعد [مواصفات البروتوكول](https://zips.z.cash/protocol/protocol.pdf) المرجع المعتمد لكيفية عمل Zcash، بما في ذلك [ترميزات العناوين والمفاتيح](https://zips.z.cash/protocol/protocol.pdf#5.6%20Encodings%20of%20Addresses%20and%20Keys).

تمثل [ZIPs](https://zips.z.cash) المكان الذي تُقترح وتُحدد فيه التغييرات، ويُظهر الفهرس أيها مسودات وأيها نهائي. تُطرح تغييرات الإجماع في ترقيات الشبكة، ويتتبعها ZecHub في صفحة [ترقيات الشبكة](/start-here/network-upgrades).

للتشفير الكامن، اقرأ [كتاب halo2](https://zcash.github.io/halo2/index.html) و[كتاب Orchard](https://zcash.github.io/orchard/)، إلى جانب وثائق حزم [halo2](https://docs.rs/halo2_proofs/latest/halo2_proofs/) و[orchard](https://docs.rs/orchard/latest/orchard/). يغطي [كتاب FROST](https://frost.zfnd.org/) التوقيعات الحدّية، ولدى ZecHub صفحة [FROST](/zcash-tech/frost).

## Testnet

Testnet هي سلسلة منفصلة ذات عملات بلا قيمة، تسمى TAZ. يمكن لكل من Zebra وZakura العمل عليها، ويغطي [دليل testnet](https://zcash.readthedocs.io/en/latest/rtd_pages/testnet_guide.html) إعداد العقدة.

يُعد [testnet.zcashexplorer.app](https://testnet.zcashexplorer.app/) مستكشف كتل testnet عاملًا، وله نظير على mainnet في [mainnet.zcashexplorer.app](https://mainnet.zcashexplorer.app/).

الحصول على TAZ هو الجزء المربك. تظهر الصنابير العامة وتختفي، ولم تكن الصنابير المرتبطة في الوثائق الأقدم تستجيب عند كتابة هذه الصفحة. الطريق الموثوق هو السؤال في Discord الخاص بـ Zcash R&D، وهو ما تقترحه وثائق Zcash نفسها.

## الوثائق العامة

تظل [وثائق Zcash](https://zcash.readthedocs.io/en/latest/) أوسع مصدر منفرد، إذ تغطي مفاهيم البروتوكول والتكامل والتعدين. اقرأها بشيء من الحذر. فهي مُرقّمة وفقًا لـ zcashd، لذا تصف أجزاء منها عقدة لم تعد تعمل، بينما تظل أقسام البروتوكول والعميل الخفيف مفيدة. يستحق [نموذج التهديد لتطبيق محفظة Zcash](https://zcash.readthedocs.io/en/latest/rtd_pages/wallet_threat_model.html) الموجود هناك القراءة قبل تصميم أي شيء يمس خصوصية المستخدم.

إذا كنت جديدًا على blockchain عمومًا، فإن [Mastering Bitcoin](https://github.com/bitcoinbook/bitcoinbook) هو التوصية المعتادة للأساسيات المشتركة، وهو متاح للقراءة مجانًا بالكامل. لكنه لا يغطي المعاملات المحمية.

## أدوات أخرى ذكرها المطورون

[Arti](https://docs.rs/arti/latest/arti/) هو تنفيذ Rust لـ Tor، ويستخدمه zcash_client_backend لتوجيه حركة مرور المحفظة. يبرز [Tailscale](https://github.com/tailscale/tailscale) للاتصال بعقدة تشغّلها بنفسك. أما [warp2](https://github.com/hhanh00/warp2) فهو تنفيذ مزامنة سريع من Hanh، لكنه لم يُحدّث منذ عام 2023.

## المجتمع والفعاليات

يُناقش تطوير البروتوكول والمحافظ في [Discord الخاص بـ Zcash R&D](https://discord.gg/6AK7keWFaK)، بينما يستضيف [منتدى مجتمع Zcash](https://forum.zcashcommunity.com/) المقترحات الأطول وسلاسل الدعم.

تعطي نتائج الهاكاثونات الأخيرة صورة جيدة عما يبنيه الناس: [ZecHub 2024](https://x.com/ZecHub/status/1845212469809033489)، و[ZecHub 2025](https://x.com/ZecHub/status/1975565960661635283)، و[Zypherpunk Hackathon 2025](https://forum.zcashcommunity.com/t/zypherpunk-hackathon-winners/53985).

## الموارد المتقاعدة

أُبقيت لأن المقالات الأقدم ترتبط بها، ولأنها لا تزال مرجعًا لكيفية تصرف العقدة المتقاعدة. لا تبدأ من هنا.

يوثق [كتاب Zcashd](https://zcash.github.io/zcash/) و[مرجع RPC لـ zcashd](https://zcash.github.io/rpc/) برمجيات وصلت إلى [نهاية العمر](https://zcash.github.io/zcash/user/end-of-life.html) في يوليو 2026. ومستودع [zcash/zcash](https://github.com/zcash/zcash) مؤرشف.

إذا كان لديك مورد لإضافته، أو لاحظت شيئًا هنا أصبح قديمًا، فافتح issue أو pull request. لا تملك الفرق دائمًا القدرة على إبقاء كل شيء محدّثًا، والإبلاغ عما واجهته يساعد في توجيه الأدلة.

**آخر تحديث:** أغسطس 2026
