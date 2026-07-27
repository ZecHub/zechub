---
<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Full_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# العقد الكاملة

العقدة الكاملة هي برمجية تشغّل نسخة كاملة من blockchain الخاصة بأي عملة مشفرة، مما يتيح الوصول إلى ميزات البروتوكول.

وهي تحتفظ بسجل كامل لكل معاملة حدثت منذ التكوين الأولي، ولذلك فهي قادرة على التحقق من صحة المعاملات والكتل الجديدة التي تُضاف إلى blockchain.

## Zcashd

> **ملاحظة:** يجري إيقاف zcashd تدريجيًا. فقد أعلنت Electric Coin Company [رسميًا](https://z.cash/support/zcashd-deprecation/) أن zcashd سيحال إلى التقاعد، مع استبدال دوره كعقدة كاملة بـ [Zebra](https://github.com/ZcashFoundation/zebra) (`zebrad`) ودوره كمحفظة بـ [Zallet](https://github.com/zcash/zallet). بالنسبة لعمليات النشر الجديدة، استخدم Zebra (انظر أدناه). إذا كنت تشغّل بالفعل عقدة zcashd، فاتبع [دليل الترحيل: zcashd إلى Zebrad/Zallet](https://zechub.wiki/migration-guide-zcashd-to-zebrad-zallet).

كان zcashd هو التنفيذ الأصلي للعقدة الكاملة لـ Zcash، وقد طورته وتحافظ عليه Electric Coin Company. تم الإبقاء على تعليمات البناء أدناه للرجوع إليها ولمشغلي العقد الذين ينتقلون بعيدًا عن zcashd.

يوفّر Zcashd مجموعة من واجهات API عبر واجهة RPC الخاصة به. وتوفر هذه الواجهات وظائف تسمح للتطبيقات الخارجية بالتفاعل مع العقدة.

يُعد [Lightwalletd](https://github.com/zcash/lightwalletd) مثالًا على تطبيق يستخدم عقدة كاملة لتمكين المطورين من بناء وصيانة محافظ خفيفة محمية ملائمة للهواتف المحمولة دون الحاجة إلى التفاعل مباشرةً مع Zcashd.

[القائمة الكاملة لأوامر RPC المدعومة](https://zcash.github.io/rpc/)

[كتاب Zcashd](https://zcash.github.io/zcash/)


### تشغيل عقدة (Linux)

- تثبيت التبعيات

      sudo apt update

      sudo apt-get install \
      build-essential pkg-config libc6-dev m4 g++-multilib \
      autoconf libtool ncurses-dev unzip git python3 python3-zmq \
      zlib1g-dev curl bsdmainutils automake libtinfo5

- استنساخ أحدث إصدار، ثم checkout، والإعداد، والبناء:

      git clone https://github.com/zcash/zcash.git

      cd zcash/

      git checkout v5.4.1
      ./zcutil/fetch-params.sh
      ./zcutil/clean.sh
      ./zcutil/build.sh -j$(nproc)

- مزامنة blockchain (قد تستغرق عدة ساعات)

    لبدء تشغيل العقدة شغّل:

      ./src/zcashd

- يتم تخزين المفاتيح الخاصة في ~/.zcash/wallet.dat

[دليل Zcashd على Raspberry Pi](https://zechub.notion.site/Raspberry-Pi-4-a-zcashd-full-node-guide-6db67f686e8d4b0db6047e169eed51d1)


## Zebra

Zebra هو تنفيذ مستقل وجاهز للإنتاج لعقدة كاملة لبروتوكول Zcash، أنشأته Zcash Foundation وكُتب بلغة Rust. ومع إحالة zcashd إلى التقاعد، أصبح Zebra (`zebrad`) هو العقدة الكاملة الموصى بها لعمليات النشر الجديدة.

يتحقق Zebra من الكتل والمعاملات، ويشارك في شبكة النظير إلى النظير، ويوفر واجهة RPC للتطبيقات. أما المحفظة فأصبحت الآن مكونًا منفصلًا: تعمل [Zallet](https://github.com/zcash/zallet) بالاعتماد على عقدة Zebra وتتولى المفاتيح والأرصدة. وهذا يستبدل zcashd، الذي كان يجمع بين العقدة والمحفظة في عملية واحدة.

ولخدمة المحافظ الخفيفة المحمية، تعمل العقدة إلى جانب مفهرس، إما [lightwalletd](https://github.com/zcash/lightwalletd) المعروف أو [Zaino](https://zechub.wiki/zaino) الأحدث.

احرص على قراءة كتاب Zebra للحصول على تعليمات الإعداد، وانضم إلى خادم Discord الخاص بالبحث والتطوير للحصول على الدعم.

[Github](https://github.com/ZcashFoundation/zebra/)

[كتاب Zebra](https://zebra.zfnd.org) 

[Discord](https://discord.gg/uvEdHsrb)



## الشبكة

من خلال تشغيل عقدة كاملة، فأنت تساعد في تعزيز شبكة zcash عبر دعم لامركزيتها.

وهذا يساعد على منع السيطرة العدائية والحفاظ على مرونة الشبكة في مواجهة بعض أشكال التعطيل.

تكشف DNS seeders عن قائمة بعقد موثوقة أخرى عبر خادم مدمج. وهذا يسمح للمعاملات بالانتشار عبر الشبكة.

### إحصاءات الشبكة

هذه أمثلة على منصات تتيح الوصول إلى بيانات شبكة Zcash:

[مستكشف كتل Zcash](https://zcashblockexplorer.com)

[Coinmetrics](https://docs.coinmetrics.io/info/assets/zec)

[Blockchair](https://blockchair.com/zcash)

يمكنك أيضًا المساهمة في تطوير الشبكة من خلال تشغيل الاختبارات أو اقتراح تحسينات جديدة وتقديم المقاييس.



### التعدين

يحتاج المعدّنون إلى عقد كاملة للوصول إلى جميع واجهات rpc المتعلقة بالتعدين مثل getblocktemplate و getmininginfo.

يتيح Zcashd أيضًا التعدين إلى coinbase محمي. ولدى المعدّنين ومجمّعات التعدين خيار التعدين مباشرةً لتجميع ZEC محمي في z-address بشكل افتراضي.

اقرأ [دليل التعدين](https://zcash.readthedocs.io/en/latest/rtd_pages/zcash_mining_guide.html) أو انضم إلى صفحة منتدى المجتمع الخاصة بـ [معدّني Zcash](https://forum.zcashcommunity.com/c/mining/13).

### الخصوصية

يتيح لك تشغيل عقدة كاملة التحقق بشكل مستقل من جميع المعاملات والكتل على شبكة Zcash.

إن تشغيل عقدة كاملة يجنّبك بعض مخاطر الخصوصية المرتبطة باستخدام خدمات طرف ثالث للتحقق من المعاملات نيابةً عنك.

كما أن استخدام عقدتك الخاصة يتيح أيضًا الاتصال بالشبكة عبر [Tor](https://zcash.github.io/zcash/user/tor.html).
وتتمثل ميزة إضافية في السماح لمستخدمين آخرين بالاتصال بشكل خاص بعنوان .onion الخاص بعقدتك.


**هل تحتاج إلى مساعدة؟**

اقرأ [وثائق الدعم](https://zcash.readthedocs.io/en/latest/)

انضم إلى [خادم Discord](https://discord.gg/zcash) الخاص بنا أو تواصل معنا على [twitter](https://twitter.com/ZecHub)
