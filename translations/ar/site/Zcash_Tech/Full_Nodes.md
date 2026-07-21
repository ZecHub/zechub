<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Full_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="تحرير الصفحة"/>
</a>

# العُقد الكاملة

العقدة الكاملة هي برمجية تشغّل نسخة كاملة من سلسلة الكتل الخاصة بأي عملة مشفرة، مما يتيح الوصول إلى ميزات البروتوكول.

فهي تحتفظ بسجل كامل لكل معاملة حدثت منذ كتلة التكوين، ولذلك تكون قادرة على التحقق من صحة المعاملات والكتل الجديدة التي تُضاف إلى سلسلة الكتل.

## Zcashd

يُعد Zcashd حاليًا التنفيذ الرئيسي للعقدة الكاملة المستخدم من قِبل Zcash، وقد طوّرته وتديره Electric Coin Company.

يكشف Zcashd عن مجموعة من واجهات API عبر واجهة RPC الخاصة به. توفّر هذه الواجهات وظائف تسمح للتطبيقات الخارجية بالتفاعل مع العقدة.

يُعد [Lightwalletd](https://github.com/zcash/lightwalletd) مثالًا على تطبيق يستخدم عقدة كاملة لتمكين المطورين من بناء وصيانة محافظ خفيفة محمية مناسبة للأجهزة المحمولة دون الحاجة إلى التفاعل مباشرةً مع Zcashd.

[القائمة الكاملة لأوامر RPC المدعومة](https://zcash.github.io/rpc/)

[كتاب Zcashd](https://zcash.github.io/zcash/)


### تشغيل عقدة (Linux)

- تثبيت التبعيات

      sudo apt update

      sudo apt-get install \
      build-essential pkg-config libc6-dev m4 g++-multilib \
      autoconf libtool ncurses-dev unzip git python3 python3-zmq \
      zlib1g-dev curl bsdmainutils automake libtinfo5

- استنساخ أحدث إصدار، وإجراء checkout، والإعداد، ثم البناء:

      git clone https://github.com/zcash/zcash.git

      cd zcash/

      git checkout v5.4.1
      ./zcutil/fetch-params.sh
      ./zcutil/clean.sh
      ./zcutil/build.sh -j$(nproc)

- مزامنة سلسلة الكتل (قد تستغرق عدة ساعات)

    لبدء تشغيل العقدة شغّل:

      ./src/zcashd

- يتم تخزين المفاتيح الخاصة في ~/.zcash/wallet.dat

[دليل Zcashd على Raspberry Pi](https://zechub.notion.site/Raspberry-Pi-4-a-zcashd-full-node-guide-6db67f686e8d4b0db6047e169eed51d1)


## Zebra

Zebra هو تنفيذ مستقل لعقدة كاملة لبروتوكول Zcash أنشأته Zcash Foundation.

وهو حاليًا يخضع للاختبار ولا يزال تجريبيًا.

يتكوّن Zebra من مكوّنين رئيسيين. مكوّن العميل المسؤول عن فحص سلسلة الكتل وفك التشفير التجريبي للمعاملات.

أما الجزء الثاني فهو أداة سطر الأوامر zebra. تدير هذه الأداة مفاتيح الإنفاق والعناوين، وتتواصل مع مكوّن العميل في zebrad لتوفير وظائف محفظة أساسية.

كل من يرغب في تجربة Zebra لتعدين الكتل مدعو للانضمام إلى خادم Discord الخاص بالبحث والتطوير. واحرص أيضًا على قراءة كتاب Zebra للحصول على تعليمات الإعداد.

[GitHub](https://github.com/ZcashFoundation/zebra/)

[كتاب Zebra](https://zebra.zfnd.org) 

[Discord](https://discord.gg/uvEdHsrb)



## الشبكة

من خلال تشغيل عقدة كاملة، فإنك تساعد في تعزيز شبكة zcash عبر دعم لامركزيتها.

يساعد ذلك على منع السيطرة العدائية والحفاظ على قدرة الشبكة على الصمود أمام بعض أشكال التعطيل.

تكشف موزّعات DNS seeders عن قائمة بعُقد موثوقة أخرى عبر خادم مدمج. وهذا يسمح للمعاملات بالانتشار في جميع أنحاء الشبكة.

### إحصاءات الشبكة

هذه أمثلة على منصات تتيح الوصول إلى بيانات شبكة Zcash:

[مستكشف كتل Zcash](https://zcashblockexplorer.com)

[Coinmetrics](https://docs.coinmetrics.io/info/assets/zec)

[Blockchair](https://blockchair.com/zcash)

يمكنك أيضًا المساهمة في تطوير الشبكة من خلال تشغيل الاختبارات أو اقتراح تحسينات جديدة وتوفير المقاييس.



### التعدين

يحتاج المُعدّنون إلى عُقد كاملة للوصول إلى جميع أوامر rpc المتعلقة بالتعدين مثل getblocktemplate و getmininginfo.

يُمكّن Zcashd أيضًا التعدين إلى coinbase محمي. ولدى المعدّنين وتجمّعات التعدين خيار التعدين مباشرةً لتجميع ZEC محمي في عنوان z-address افتراضيًا.

اقرأ [دليل التعدين](https://zcash.readthedocs.io/en/latest/rtd_pages/zcash_mining_guide.html) أو انضم إلى صفحة منتدى المجتمع الخاصة بـ [مُعدّني Zcash](https://forum.zcashcommunity.com/c/mining/13).

### الخصوصية

يتيح لك تشغيل عقدة كاملة التحقق بشكل مستقل من جميع المعاملات والكتل على شبكة Zcash.

إن تشغيل عقدة كاملة يجنبك بعض مخاطر الخصوصية المرتبطة باستخدام خدمات خارجية للتحقق من المعاملات نيابةً عنك.

كما أن استخدام عقدتك الخاصة يسمح أيضًا بالاتصال بالشبكة عبر [Tor](https://zcash.github.io/zcash/user/tor.html).
وتتمثل ميزة إضافية لذلك في السماح لمستخدمين آخرين بالاتصال بشكل خاص بعنوان عقدتك .onion.


**هل تحتاج إلى مساعدة؟**

اقرأ [وثائق الدعم](https://zcash.readthedocs.io/en/latest/)

انضم إلى [خادم Discord](https://discord.gg/zcash) الخاص بنا أو تواصل معنا على [twitter](https://twitter.com/ZecHub)

---

**Protected terms (keep in English):** `Zaino` `Zallet`
