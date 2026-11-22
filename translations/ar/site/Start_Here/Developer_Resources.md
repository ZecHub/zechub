<a href="https://github.com/zechub/zechub/edit/main/site/Start_Here/Developer_Resources.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# موارد المطورين

الموارد التي تحتاجها للبناء على Zcash، مجمّعة حسب الغرض من كل منها بدلًا من سردها في كومة واحدة.

تغيّرت حزمة التقنيات كثيرًا في 2026. فقد وصل zcashd، الذي شغّل الشبكة معظم تاريخها، إلى نهاية عمره في 18 يوليو 2026 عند ارتفاع الكتلة (block) 3417100، وتوقفت كل عقدة (node) غير معدّلة عند ذلك الارتفاع ولن تقبل إعادة التشغيل. أصبحت الأدلة المكتوبة لـ zcashd جزءًا من التاريخ الآن بدلًا من أن تكون نقطة انطلاق، لذا نُظّمت هذه الصفحة حول ما حلّ محله.

## نظرة سريعة على حزمة التقنيات

| الطبقة | ما الذي تستخدمه | نقطة البداية |
|:--|:--|:--|
| عقدة كاملة (full node) | Zebra أو Zakura | [كتاب Zebra](https://zebra.zfnd.org/)، [zakura.com](https://zakura.com/) |
| محفظة (wallet) العقدة الكاملة | Zallet، في مرحلة تجريبية | [كتاب Zallet](https://zcash.github.io/zallet/) |
| خادم المحفظة الخفيفة | Zaino أو lightwalletd | [Zaino](https://github.com/zingolabs/zaino)، [lightwalletd](https://github.com/zcash/lightwalletd) |
| مكتبات المحافظ | حزم (crates) librustzcash | [librustzcash](https://github.com/zcash/librustzcash) |
| الأجهزة المحمولة | حزم SDK لـ Android وـ iOS | [Android](https://github.com/zcash/zcash-android-wallet-sdk)، [iOS](https://github.com/zcash/zcash-swift-wallet-sdk) |
| المواصفات | مواصفات البروتوكول ومقترحات ZIP | [zips.z.cash](https://zips.z.cash) |

## العقد

تتحقق العقدة من الإجماع (consensus) وتحتفظ بالسلسلة (chain). هناك تطبيقان يجري تطويرهما بنشاط.

[Zebra](/zcash-tech/zebra-full-node) هي عقدة Zcash Foundation، وهي مكتوبة بلغة Rust، وهي العقدة التي تفترضها معظم الأدلة الآن. يتناول [كتاب Zebra](https://zebra.zfnd.org/) تثبيتها وتشغيلها، أما [المستودع](https://github.com/ZcashFoundation/zebra) فهو المكان الذي يجري فيه التطوير.

[Zakura](/zcash-tech/zakura-node) عقدة أحدث، يصفها مؤلفوها بأنها «عقدة كاملة لـ Zcash متوافقة مع الإجماع، مبنية من أجل التوسع»، وتتميز بمزامنة أسرع وتقليم الكتل ووضع توافق مع zcashd. يقودها Sean Bowe، أحد مؤسسي Zcash، إلى جانب Dev Ojha. وهي مفتوحة المصدر بموجب ترخيص Apache 2.0 على [zakura-core/zakura](https://github.com/zakura-core/zakura).

لدى ZecHub صفحة [العقد الكاملة](/zcash-tech/full-nodes) تتناول المفاضلات بينهما.

## محفظة العقدة الكاملة

كان zcashd يضم محفظة مدمجة مع العقدة. لقد اختفت تلك المحفظة، والبديل هو [Zallet](https://github.com/zcash/zallet). يصفه كتاب Zallet بأنه «محفظة Zcash تعمل كعقدة كاملة ومكتوبة بلغة Rust» يجري «بناؤها بديلًا لمحفظة zcashd».

اقرأ التحذير الأمني قبل الاعتماد عليه. فـ Zallet في مرحلة تجريبية، و«لم تتم مراجعته بالكامل»، وقد تحدث تغييرات جذرية «في أي وقت، مما يتطلب منك حذف محفظة Zallet وإعادة إنشائها»، ولم يتم نقل كل طرق RPC الخاصة بـ zcashd بعد.

إذا كنت تنقل إعدادًا قائمًا، فلدى ZecHub [دليل ترحيل من zcashd إلى Zebra وـ Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet) وكذلك [مرجع سريع لـ Zallet](/using-zcash/zallet-quick-reference-guide).

## خوادم المحافظ الخفيفة

لا تشغّل معظم المحافظ عقدة. بل تتواصل مع خادم يحتفظ بالسلسلة ويعيد إليها عرضًا مضغوطًا لها.

[lightwalletd](https://github.com/zcash/lightwalletd) هي الخدمة الأصلية، مكتوبة بلغة Go، وتوصف بأنها «خدمة خلفية توفر واجهة فعالة من حيث عرض النطاق لسلسلة الكتل (blockchain) الخاصة بـ Zcash». أما [Zaino](/zcash-tech/zaino) فهو المفهرس الأحدث، مكتوب بلغة Rust، ويقرأ من مدقّق كامل بدلًا من الاحتفاظ بنسخته الخاصة من السلسلة.

تتناول وثائق [بروتوكول العميل الخفيف](https://zcash.readthedocs.io/en/latest/lightwalletd/index.html) البروتوكول نفسه. وتتناول صفحة [عقد المحافظ الخفيفة](/zcash-tech/lightwallet-nodes) ما يمكن لهذه الخوادم رؤيته وما لا يمكنها رؤيته عن المستخدم، وهو أمر يستحق أن تفهمه قبل أن تختار أحدها.

## بناء محفظة

يجري معظم العمل على المحافظ في حزم Rust ضمن [librustzcash](https://github.com/zcash/librustzcash)، التي تُبنى عليها حزم SDK للأجهزة المحمولة وعدد من محافظ سطح المكتب. كل حزمة موثّقة على [docs.rs](https://docs.rs).

| الحزمة | الغرض منها |
|:--|:--|
| zcash_client_backend | «واجهات API لإنشاء عملاء خفيفين (light clients) محميين (shielded) لـ Zcash»، بما في ذلك المزامنة وبناء المعاملات (transactions) |
| zcash_client_sqlite | «عميل خفيف لـ Zcash قائم على SQLite»، وهو طبقة التخزين لما سبق |
| zcash_keys | «إدارة المفاتيح والعناوين (addresses) في Zcash» |
| zcash_primitives | «تطبيقات بلغة Rust لبدائيات Zcash» |
| zcash_protocol | «ثوابت شبكة بروتوكول Zcash وأنواع القيم» |
| orchard | «بروتوكول المعاملات المحمية Orchard» |
| sapling-crypto | «مكتبة تشفير لـ Zcash Sapling» |
| pczt | «أدوات (tools) للعمل مع معاملات Zcash المنشأة جزئيًا»، وتُستخدم للتوقيع (signing) عبر الأجهزة المادية والأجهزة المتعددة |
| zip321 | معرّفات URI لطلبات الدفع (payment)، كما هو محدد في ZIP 321 |

للأجهزة المحمولة، تغلّف [حزمة SDK لـ Android](https://github.com/zcash/zcash-android-wallet-sdk) و[حزمة iOS SDK](https://github.com/zcash/zcash-swift-wallet-sdk) تلك المكتبات. كان مستودع iOS يُسمّى سابقًا ZcashLightClientKit، لذا تستخدم الروابط والمقالات الأقدم هذا الاسم.

## المواصفات والتشفير

تُعد [مواصفات البروتوكول](https://zips.z.cash/protocol/protocol.pdf) المرجع المعتمد في كيفية عمل Zcash، بما في ذلك [ترميزات العناوين والمفاتيح](https://zips.z.cash/protocol/protocol.pdf#5.6%20Encodings%20of%20Addresses%20and%20Keys).

[ZIPs](https://zips.z.cash) هي المكان الذي تُقترح فيه التغييرات وتُحدَّد، ويُظهر الفهرس أيها مسودات وأيها نهائية. تُطرح تغييرات الإجماع ضمن ترقيات الشبكة (network upgrades)، ويتابعها ZecHub في صفحة [ترقيات الشبكة](/start-here/network-upgrades).

للاطلاع على التشفير الكامن تحتها، اقرأ [كتاب halo2](https://zcash.github.io/halo2/index.html) و[كتاب Orchard](https://zcash.github.io/orchard/)، إلى جانب وثائق حزمتي [halo2](https://docs.rs/halo2_proofs/latest/halo2_proofs/) وـ [orchard](https://docs.rs/orchard/latest/orchard/). يتناول [كتاب FROST](https://frost.zfnd.org/) التواقيع الحدية، ولدى ZecHub صفحة [FROST](/zcash-tech/frost).

## شبكة الاختبار

شبكة الاختبار (Testnet) سلسلة منفصلة ذات عملات بلا قيمة تُسمّى TAZ. يمكن تشغيل كلٍّ من Zebra وـ Zakura عليها، ويتناول [دليل شبكة الاختبار](https://zcash.readthedocs.io/en/latest/rtd_pages/testnet_guide.html) إعداد العقدة.

[testnet.zcashexplorer.app](https://testnet.zcashexplorer.app/) مستكشف كتل عامل لشبكة الاختبار، وله نظير للشبكة الرئيسية على [mainnet.zcashexplorer.app](https://mainnet.zcashexplorer.app/).

الحصول على TAZ هو الجزء الصعب، لأن خدمات صنبور المرتبطة في الوثائق الأقدم توقفت عن الاستجابة. [zcashfaucet.jinolabs.xyz](https://zcashfaucet.jinolabs.xyz) هو صنبور يديره المجتمع ويشغّل «عقدته ومحفظته ومعدّنه (miner) الخاصة»، ويدفع «قطرات محمية من نوع z2z»، ويضبط المطالبات بـ «إثبات (proof) عمل في المتصفح بدلًا من مزوّد captcha». وهو مفتوح المصدر بموجب ترخيص MIT. إذا لم يكن متاحًا، فاسأل في Zcash R&D Discord، وهو ما تقترحه وثائق Zcash نفسها.

## الوثائق العامة

[وثائق Zcash](https://zcash.readthedocs.io/en/latest/) لا تزال المصدر الواحد الأشمل، إذ تغطي مفاهيم البروتوكول والتكامل والتعدين (mining). اقرأها ببعض الحذر. فإصداراتها مرتبطة بـ zcashd، لذا يصف بعض أجزائها عقدة لم تعد تعمل، بينما تبقى أقسام البروتوكول والعميل الخفيف مفيدة. ويستحق [نموذج التهديدات لتطبيق محفظة Zcash](https://zcash.readthedocs.io/en/latest/rtd_pages/wallet_threat_model.html) الموجود هناك أن تقرأه قبل تصميم أي شيء يمس خصوصية (privacy) المستخدم.

إذا كنت جديدًا على سلاسل الكتل عمومًا، فإن [Mastering Bitcoin](https://github.com/bitcoinbook/bitcoinbook) هو التوصية المعتادة للأساسيات المشتركة، ويمكنك قراءته مجانًا بالكامل. لكنه لا يغطي المعاملات المحمية.

## أدوات أخرى ذكرها المطورون

[Arti](https://docs.rs/arti/latest/arti/) هو تطبيق Tor بلغة Rust، ويستخدمه zcash_client_backend لتوجيه حركة مرور المحفظة. ويُذكر [Tailscale](https://github.com/tailscale/tailscale) للاتصال بعقدة تشغّلها بنفسك. أما [warp2](https://github.com/hhanh00/warp2) فهو تطبيق للمزامنة السريعة من تطوير Hanh، رغم أنه لم يُحدَّث منذ 2023.

## المجتمع والفعاليات

تُعد [Zcash R&D Discord](https://discord.gg/6AK7keWFaK) المكان الذي يُناقش فيه تطوير البروتوكول والمحافظ، بينما يضم [منتدى مجتمع Zcash](https://forum.zcashcommunity.com/) المقترحات الأطول ونقاشات الدعم.

تقدم نتائج الهاكاثونات الأخيرة صورة جيدة عمّا يبنيه الناس: [ZecHub 2024](https://x.com/ZecHub/status/1845212469809033489)، [ZecHub 2025](https://x.com/ZecHub/status/1975565960661635283) وـ [Zypherpunk Hackathon 2025](https://forum.zcashcommunity.com/t/zypherpunk-hackathon-winners/53985).

## الموارد المتقاعدة

احتُفظ بها لأن المقالات الأقدم ترتبط بها، ولأنها لا تزال المرجع لكيفية عمل العقدة المتقاعدة. لا تبدأ من هنا.

يوثّق [كتاب zcashd](https://zcash.github.io/zcash/) و[مرجع RPC لـ zcashd](https://zcash.github.io/rpc/) برنامجًا وصل إلى [نهاية عمره](https://zcash.github.io/zcash/user/end-of-life.html) في يوليو 2026. ومستودع [zcash/zcash](https://github.com/zcash/zcash) مؤرشف.

إذا كان لديك مورد تريد إضافته، أو لاحظت شيئًا هنا أصبح قديمًا، فافتح مشكلة (issue) أو طلب سحب (pull request). لا تملك الفرق دائمًا القدرة على إبقاء كل شيء محدثًا، والإشارة إلى ما واجهته تساعد في توجيه الأدلة.

**آخر تحديث:** أغسطس 2026
