<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Full_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# العُقَد الكاملة

## الخلاصة

- تحتفظ العقدة الكاملة بنسخة مكتملة من blockchain الخاصة بـ Zcash وتتحقق من كل كتلة ومعاملة جديدتين وفق قواعد الإجماع.
- Zebra (`zebrad`) هي العقدة التي ينبغي تثبيتها اليوم. Zakura هو تطبيق ثانٍ متشعب من Zebra.
- تم إيقاف zcashd. وقد بلغ توقفه عند نهاية الدعم في 18 يوليو 2026 عند ارتفاع الكتلة 3417100، ولم تعد تلك العقد تبدأ التشغيل.
- أصبحت العقدة والمحفظة برنامجين منفصلين الآن. يعمل [Zallet](https://github.com/zcash/zallet) مع عقدة ويحتفظ بالمفاتيح.
- يمنحك تشغيل عقدتك الخاصة تحققًا مستقلًا ويلغي الحاجة إلى الثقة بخادم شخص آخر.

## الشرح الأساسي

العقدة الكاملة هي برمجية تشغّل نسخة كاملة من blockchain لعملة مشفرة، ما يتيح لك الوصول إلى ميزات البروتوكول.

وتحتفظ بسجل كامل لكل معاملة حدثت منذ التكوين، ولذلك تستطيع التحقق من صحة المعاملات والكتل الجديدة التي تُضاف إلى blockchain.

## تطبيقات العقد

### Zebra

Zebra هو تطبيق مستقل وجاهز للإنتاج لعقدة كاملة لبروتوكول Zcash، أنشأته Zcash Foundation وكُتب بلغة Rust. وبما أن zcashd قد تم إيقافه، فإن Zebra (`zebrad`) هو العقدة الكاملة الموصى بها لعمليات النشر الجديدة.

يتحقق Zebra من الكتل والمعاملات، ويشارك في شبكة الند للند، ويوفر واجهة RPC للتطبيقات. أصبحت المحفظة مكوّنًا منفصلًا الآن: يعمل [Zallet](https://github.com/zcash/zallet) مع عقدة Zebra ويتولى المفاتيح والأرصدة. ويحل هذا محل zcashd، الذي كان يجمع العقدة والمحفظة في عملية واحدة.

لخدمة المحافظ الخفيفة المحمية، تعمل العقدة إلى جانب مفهرس، إما [lightwalletd](https://github.com/zcash/lightwalletd) المعتمد أو [Zaino](https://zechub.wiki/zaino) الأحدث.

احرص على قراءة كتاب Zebra للحصول على تعليمات الإعداد، وانضم إلى خادم البحث والتطوير Discord للحصول على الدعم.

[Github](https://github.com/ZcashFoundation/zebra/)

[كتاب Zebra](https://zebra.zfnd.org)

راجع [Zebra العقدة الكاملة](/zcash-tech/zebra-full-node) لمعرفة خطوات التثبيت والإعداد ومتطلبات الأجهزة.

### Zakura

Zakura هو عقدة كاملة ثانية متوافقة مع الإجماع، متشعبة من Zebra وطورتها Valar Group بالتعاون مع Project Tachyon. وهي تتبع قواعد البروتوكول نفسها وتضيف مزامنة أسرع وتشذيب الكتل وطبقة توافق RPC لـ zcashd. راجع [Zakura العقدة](/zcash-tech/zakura-node).

### zcashd (متوقف)

> **ملاحظة:** تم إيقاف zcashd. أعلنت Electric Coin Company [عن الإيقاف التدريجي](https://z.cash/support/zcashd-deprecation/)، وبلغ التوقف التلقائي عند نهاية الدعم في 18 يوليو 2026 عند ارتفاع الكتلة 3417100. توقفت كل عقدة zcashd 6.20.0 غير معدلة عند ذلك الارتفاع وترفض إعادة التشغيل، ولا يدعم البرنامج NU6.3. استخدم Zebra. إذا كنت تحتفظ بـ zcashd `wallet.dat`، فاتبع [دليل الترحيل: zcashd إلى Zebrad/Zallet](https://zechub.wiki/migration-guide-zcashd-to-zebrad-zallet).

كان zcashd التطبيق الأصلي للعقدة الكاملة لـ Zcash، وقد طورته وصانته Electric Coin Company. احتُفظ بتعليمات البناء أدناه للرجوع إليها ولمشغلي العقد الذين يهاجرون بعيدًا عن zcashd.

يوفر Zcashd مجموعة من واجهات API عبر واجهة RPC الخاصة به. توفر هذه الواجهات دوالًا تتيح للتطبيقات الخارجية التفاعل مع العقدة.

[Lightwalletd](https://github.com/zcash/lightwalletd) هو مثال على تطبيق يستخدم عقدة كاملة لتمكين المطورين من بناء محافظ خفيفة محمية وملائمة للهواتف المحمولة وصيانتها، دون الحاجة إلى التفاعل مباشرةً مع Zcashd.

[القائمة الكاملة لأوامر RPC المدعومة](https://zcash.github.io/rpc/)

[كتاب Zcashd](https://zcash.github.io/zcash/)

#### تشغيل عقدة (Linux)

- تثبيت التبعيات

      sudo apt update

      sudo apt-get install \
      build-essential pkg-config libc6-dev m4 g++-multilib \
      autoconf libtool ncurses-dev unzip git python3 python3-zmq \
      zlib1g-dev curl bsdmainutils automake libtinfo5

- استنسخ أحدث إصدار، ثم نفّذ checkout والإعداد والبناء:

      git clone https://github.com/zcash/zcash.git

      cd zcash/

      git checkout v5.4.1
      ./zcutil/fetch-params.sh
      ./zcutil/clean.sh
      ./zcutil/build.sh -j$(nproc)

- مزامنة Blockchain (قد تستغرق عدة ساعات)

    لبدء العقدة، شغّل:

      ./src/zcashd

- تُخزَّن المفاتيح الخاصة في ~/.zcash/wallet.dat

[دليل Zcashd على Raspberry Pi](https://zechub.notion.site/Raspberry-Pi-4-a-zcashd-full-node-guide-6db67f686e8d4b0db6047e169eed51d1)

## الآثار العملية

### الشبكة

بتشغيل عقدة كاملة، تساعد في تعزيز شبكة zcash عبر دعم لامركزيتها.

يساعد ذلك على منع السيطرة العدائية والحفاظ على مرونة الشبكة أمام بعض أشكال التعطيل.

توفر DNS seeders قائمة بعقد موثوقة أخرى عبر خادم مدمج. ويتيح ذلك انتشار المعاملات في أنحاء الشبكة.

### إحصاءات الشبكة

هذه منصات نموذجية تتيح الوصول إلى بيانات شبكة Zcash:

[Zcash مستكشف الكتل](https://zcashblockexplorer.com)

[Coinmetrics](https://docs.coinmetrics.io/info/assets/zec)

[Blockchair](https://blockchair.com/zcash)

يمكنك أيضًا المساهمة في تطوير الشبكة بتشغيل الاختبارات أو اقتراح تحسينات جديدة وتوفير المقاييس.

### التعدين

يتطلب المعدنون عقدًا كاملة للوصول إلى جميع واجهات RPC المتعلقة بالتعدين، مثل getblocktemplate وgetmininginfo.

يتيح Zcashd أيضًا التعدين إلى coinbase محمي. ولدى المعدنين ومجمعات التعدين خيار التعدين مباشرةً لتجميع ZEC محمية في عنوان z افتراضيًا.

اقرأ [دليل التعدين](https://zcash.readthedocs.io/en/latest/rtd_pages/zcash_mining_guide.html) أو انضم إلى صفحة منتدى المجتمع الخاصة بـ [Zcash المعدنين](https://forum.zcashcommunity.com/c/mining/13).

### الخصوصية

يتيح لك تشغيل عقدة كاملة التحقق المستقل من جميع المعاملات والكتل على شبكة Zcash.

يتجنب تشغيل عقدة كاملة بعض مخاطر الخصوصية المرتبطة باستخدام خدمات جهات خارجية للتحقق من المعاملات نيابةً عنك.

كما يتيح استخدام عقدتك الخاصة الاتصال بالشبكة عبر [Tor](https://zcash.github.io/zcash/user/tor.html).
وتتمثل ميزة إضافية في إتاحة اتصال المستخدمين الآخرين بعقدتك بصورة خاصة عبر عنوان .onion.

## الأخطاء الشائعة

- بناء zcashd من التعليمات أعلاه وتوقع عقدة عاملة. تتوقف تلك الملفات التنفيذية عند ارتفاع الإيقاف التدريجي.
- تشغيل عقدة وافتراض أن محفظتك المحمولة تستخدمها الآن. تستمر المحفظة الخفيفة في التواصل مع أي خادم مُعدّة لاستخدامه إلى أن توجهها إلى خادمك الخاص. راجع [عقد Lightwallet](/zcash-tech/lightwallet-nodes).
- تشغيل `zebrad` فقط وتوقع اتصال المحافظ الخفيفة. تحتاج العقدة إلى مفهرس بجانبها، إما lightwalletd أو [Zaino](/zcash-tech/zaino).
- البحث عن واجهات RPC للمحفظة في العقدة. انتقلت المفاتيح والأرصدة إلى Zallet.

## صفحات ذات صلة

- [Zebra العقدة الكاملة](/zcash-tech/zebra-full-node) - تثبيت العقدة الموصى بها وإعدادها وتشغيلها
- [Zakura العقدة](/zcash-tech/zakura-node) - تطبيق العقدة الثاني، المتشعب من Zebra
- [عقد Lightwallet](/zcash-tech/lightwallet-nodes) - الخوادم التي تستعلم منها المحافظ الخفيفة
- [Zaino](/zcash-tech/zaino) - المفهرس المكتوب بلغة Rust الذي يخدم المحافظ الخفيفة
- [Zcash مزامنة المحفظة](/zcash-tech/zcash-wallet-syncing) - سبب عمل المزامنة بهذه الطريقة

## مزيد من التعلّم

اقرأ [وثائق الدعم](https://zcash.readthedocs.io/en/latest/)

انضم إلى خادم [Discord](https://discord.gg/zcash) أو تواصل معنا عبر [X](https://X.com/ZecHub)
