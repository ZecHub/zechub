# دليل مستخدم Ledger Shielded ZEC

في 23 سبتمبر 2026، أضافت Ledger دعمًا أصليًا لـ ZEC المحمي إلى محفظة Ledger Wallet Desktop. يضم حساب Zcash واحد الآن رصيدًا شفافًا ورصيدًا خاصًا في تجمّع Zcash Ironwood. تبقى مفاتيحك الخاصة على جهاز Ledger الخاص بك، وتتم مراجعة كل معاملة وتوقيعها على الجهاز.

**لأجهزة سطح المكتب فقط.** ينص إعلان Ledger على أن ZEC المحمي «متاح على Ledger Wallet Desktop فقط. لا يتوفر دعم الأجهزة المحمولة في الوقت الحالي، لكنه قادم قريبًا». ويعرض تطبيق سطح المكتب الإشعار نفسه. تم التحقق في 15 أكتوبر 2026.

## التحضير

- جهاز Ledger يشغّل تطبيق Zcash: Nano S Plus أو Nano X أو Stax أو Flex. لا يُصمَّم تطبيق Zcash الحالي لجهاز Nano S الأصلي.
- Ledger Wallet Desktop الإصدار 4.21 أو أحدث، ويُنزَّل فقط من [ledger.com](https://www.ledger.com). استخدم هذا الدليل الإصدار 4.24.0.
- أحدث تطبيق Zcash على جهاز Ledger الخاص بك (الإصدار 3.9.4 عند كتابة هذا الدليل).
- كمية صغيرة من ZEC للاختبار. أُنجزت كل الخطوات أدناه على mainnet باستخدام 0.001 ZEC. تكلّف كل معاملة رسوم شبكة صغيرة (0.00015 ZEC في اختبارنا).
- احتفظ بعبارة الاسترداد المكوّنة من 24 كلمة على الورق. لا تكتبها أبدًا في جهاز كمبيوتر ولا تشاركها.

## الدليل خطوة بخطوة (Ledger Wallet Desktop)

**1. تثبيت تطبيق Zcash أو تحديثه**
- افتح Ledger Wallet، وصّل جهاز Ledger وألغِ قفله، ثم افتح **My Ledger**. اسمح بالاتصال على الجهاز.
- ابحث عن **Zcash** في كتالوج التطبيقات، ثم انقر **Install**، أو **Update** إذا كان مثبّتًا بالفعل.
- افتح تطبيق Zcash على جهاز Ledger. ستظهر على الشاشة العبارة "Zcash app is ready". مرّر إلى اليمين وصولًا إلى **App info** للتحقق من الإصدار.

**2. إضافة حساب Zcash**
- في Ledger Wallet، اختر **Add account**. في **Select asset**، ابحث عن Zcash واختر **Zcash (ZEC)**، وليس رمزًا مغلفًا مثل Binance-Peg Zcash Token.
- بينما يكون تطبيق Zcash مفتوحًا على جهاز Ledger، يعثر Ledger Wallet على حسابك. حدده ضمن **Select the accounts you want to add** وانقر **Confirm**.
- تعرض صفحة الحساب **Available balance** و**Transparent balance** و**Private balance**، إضافة إلى زر **Enable shielded**.

![حساب Zcash في Ledger Wallet Desktop يعرض إشعار سطح المكتب فقط، والأرصدة الشفافة والخاصة، وزر "Enable shielded"](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-01-account-desktop-only.png)

**3. تفعيل الرصيد الخاص**
- انقر **Enable shielded**. تحتوي نافذة **Enable Zcash private balance** على أربع خطوات: Birthday وUFVK وDevice وConfirmation.
- **Birthday:** بالنسبة إلى حساب جديد، أبقِ ارتفاع تاريخ الميلاد على تاريخ اليوم. لا تحدد "This account received shielded ZEC in the past" إلا إذا كنت تعرف أن ذلك حدث، لأن المسح بدءًا من الكتلة 0 قد يستغرق وقتًا طويلًا.
- **UFVK وDevice:** يطلب Ledger Wallet من جهاز Ledger تصدير Unified Full Viewing Key (UFVK). اقرأ الشاشات على الجهاز ووافق. إذا ظهرت لك رسالة "Device connection lost"، فتأكد من أن تطبيق Zcash مفتوح، ووافق بسرعة ثم انقر **Retry**.
- عندما تظهر **UFVK successfully imported**، انقر **Start sync**. عند انتهاء المزامنة، يتغير الزر إلى **Update balance** مع وقت "Last sync".
- يبقى مفتاح العرض على جهاز الكمبيوتر الخاص بك. يمكنه العثور على أموالك المحمية لكنه لا يستطيع إنفاقها.

![Enable Zcash private balance window showing UFVK successfully imported and the Start sync button](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-02-ufvk-imported.png)

**4. استلام ZEC والتحقق من كلا العنوانين على جهاز Ledger**
- انقر **Receive** واختر حساب Zcash الخاص بك. يعرض Ledger Wallet **Address for Zcash 1** (شفاف، يبدأ بـ t1) و**Private address for Zcash 1** (يبدأ بـ u1). تظل العناوين السابقة صالحة.
- يعرض جهاز Ledger الخاص بك "Verify Zcash addresses"، ثم **Private address** عبر صفحتين، ثم **Public Address**. قارن كل حرف بالشاشة قبل مشاركة أي من العنوانين، ثم أكد على الجهاز.
- فضّل العنوان الخاص؛ ولا تستخدم العنوان الشفاف إلا عندما لا يدعم المرسل أي خيار آخر.

![Ledger Wallet Receive window showing the transparent address and the private address for Zcash 1](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-03-receive-addresses.png)

![Ledger device screens: Verify Zcash addresses, Private address in two pages, then Public Address](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-04-device-verify-addresses.png)

**5. نقل ZEC الشفاف إلى رصيدك الخاص**
- انقر **Send**. ضمن **Self transfer**، اختر **Send to private balance**.
- أدخل مبلغًا أو استخدم 25% أو 50% أو 75% أو **Max**. تحقق من رسوم الشبكة، ثم انقر **Review**.
- على جهاز Ledger الخاص بك، انتقل عبر الخطوات التالية: "Review transaction to send ZEC"، و"Transfer from public to private address"، والمبلغ، وعنوان الإخراج على صفحتين، والرسوم، وارتفاع الانتهاء. تحقق من أن عنوان الإخراج يطابق عنوانك الخاص من الخطوة 4، ثم اضغط الزرين معًا عند **Sign transaction**.
- يعرض Ledger Wallet **Transaction sent**. في تفاصيل المعاملة، يظهر النوع **Private (Ironwood)**.
- يلاحظ Ledger Wallet أن التحويل الذاتي يربط أموالك المحمية بعنوانك العام. الاستلام مباشرةً إلى عنوانك الخاص يبقيها غير مرتبطة.

![Send ZEC window in Ledger Wallet with the Self transfer option Send to private balance](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-05-send-to-private-balance.png)

![Ledger device review screens for moving ZEC from the transparent balance to the private address, ending with Sign transaction and Transaction signed](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-06-device-review-shielding.png)

- بعد تأكيد المعاملة، ينخفض الرصيد الشفاف ويرتفع الرصيد الخاص. تظهر الأموال المحمية الجديدة بصفتها "maturing" حتى تحصل على تأكيدات كافية لإنفاقها.

![حساب Zcash بعد الحماية: انخفض الرصيد الشفاف، وازداد الرصيد الخاص ويظهر قيد النضج](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-07-balances-after-shielding.png)

**6. إرسال ZEC من رصيدك الخاص**
- بمجرد أن يصبح الرصيد الخاص قابلًا للإنفاق، انقر **Send** واضبط **Transfer from** على **Private balance**.
- الصق عنوان المستلم وأدخل المبلغ. يمكنك إضافة **Memo (optional)** مشفّرة حتى 512 بايت، ولا يستطيع قراءتها إلا المستلم.
- راجع المستلم والمبلغ والرسوم على جهاز Ledger الخاص بك، ثم اضغط الزرين معًا عند **Sign transaction**.

![Sent transaction from the private balance in Ledger Wallet transaction details](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-08-private-send.png)

## معلومات مفيدة

- ZEC المحمي على Ledger متاح لسطح المكتب فقط في الوقت الحالي (تم التحقق في 15 أكتوبر 2026).
- يستخدم الرصيد الخاص في Ledger Wallet تجمّع Ironwood.
- تقول Ledger إنه يمكنك مشاركة وصول للقراءة فقط إلى سجل معاملاتك مع مستشار ضريبي. يمكن لأي شخص يملك مفتاح العرض الخاص بك رؤية سجلك المحمي، لذا شاركه عن قصد فقط.
- التُقطت شاشات الجهاز في هذا الدليل باستخدام محاكي Speculos الخاص بـ Ledger (Nano S Plus)، الذي يشغّل تطبيق Zcash الإصدار 3.9.4، ومتصلًا بـ Ledger Wallet Desktop 4.24.0 على شبكة Zcash الرئيسية. يشغّل جهاز Ledger فعلي التطبيق نفسه ويعرض الشاشات نفسها.

## مساعدة إضافية

- [الجديد في Ledger Wallet: دعم أصلي لـ Zcash المحمي](https://www.ledger.com/blog-native-shielded-zcash-support) (إعلان Ledger)
- [مركز مساعدة Ledger](https://support.ledger.com)
- [صفحة محافظ ZecHub](/using-zcash/wallets)
- [التجمّعات المحمية](/using-zcash/shielded-pools) و[مفاتيح العرض](/zcash-tech/viewing-keys) على ZecHub
- خيار آخر لمحفظة أجهزة: [Keystone دليل مستخدم Zashi](/guides/keystone-zashi)
