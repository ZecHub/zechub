<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Solana_ZEC_to_Shielded.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# هل لديك ZEC على Solana؟ انقله إلى Zcash المحمي

هذه الصفحة لك إذا ظهر ZEC في محفظة Solana الخاصة بك لأنك تمتلك ZCAT، أو رمز Solana آخر يدفع لحامليه بعملة ZEC. لا تحتاج إلى بيع أي شيء لاتباع هذه الخطوات. ستنقل ZEC الذي تملكه بالفعل من Solana إلى محفظة Zcash وتنتهي به محميًا.

نفّذنا كل خطوة أدناه بتحويل حقيقي في 27 سبتمبر 2026، بدءًا من 0.00266336 ZEC في Phantom. الرسوم والأوقات والشاشات في هذه الصفحة هي ما رأيناه.

---

## ما الذي تملكه فعلًا

إن ZEC الموجود في محفظة Solana الخاصة بك هو رمز على Solana، وليس عملات على شبكة Zcash. يصدر NEAR OmniBridge هذا الرمز ويحتفظ بعملة ZEC حقيقية على سلسلة Zcash لدعمه؛ وقد كان الجسر نشطًا على Solana منذ أكتوبر 2025. يعمل جانبه على Solana عبر رسائل Wormhole وNEAR Chain Signatures، وليس عبر عميل خفيف لـ Zcash، لذلك فإن جانب Solana متين بقدر متانة هذين النظامين فقط. يطلق الناس عليه اسم "ZEC الورقي". يتتبع سعر ZEC، لكن كل رصيد وكل تحويل موجود في دفتر Solana العام تحت عنوان محفظتك، ولا يمكن حمايته ما دام هناك.

تحقق من أن ما لديك هو الرمز الحقيقي. في Phantom، اضغط **ZEC** وانتقل إلى **حول Zcash**. يجب أن يكون عنوان العقد:

```
A7bdiYdS5GjqGFtxf17ppRHtDKPkkRqbKtR27dxvQXaS
```

![Phantom's About Zcash panel showing the contract address A7bd…QXaS on the Solana network](/content-images/01-phantom-zec-mint-4a718bc213.webp)

يختصره Phantom إلى `A7bd…QXaS`، لذا قارن بين الأحرف الأولى والأخيرة، أو ابحث عن العنوان الكامل في [Solscan](https://solscan.io/token/A7bdiYdS5GjqGFtxf17ppRHtDKPkkRqbKtR27dxvQXaS). أي رمز آخر باسم "ZEC" في محفظتك، مهما كان اسمه أو شعاره، ليس هذا الرمز. اتركه وشأنه.

---

## لماذا تنقله

إن ZEC المحمي هو الهدف من Zcash. عندما يكون ZEC الخاص بك في تجمّع محمي، تكون بيانات المرسل والمستلم ومبلغ كل دفعة مشفّرة على سلسلة Zcash. لا يستطيع أحد يتصفح مستكشفًا رؤية رصيدك.

أنت تمتلك ZEC بالفعل. إن نقله إلى محفظة Zcash يمنحك الجزء الذي يجعله Zcash، ويُخرج الجسر من المعادلة: لا يعتمد ZEC الأصلي في محفظتك الخاصة على وفاء أي جهة بالاسترداد.

يشرح [من يمكنه رؤية دفعة Zcash الخاصة بك؟](/start-here/who-can-see-your-zcash-payment) بدقة ما الذي يبقى مخفيًا.

---

## اختر محفظة Zcash

لا يختار ZecHub واحدةً نيابةً عنك. اختر من [ZecHubدليل المحافظ](/wallets)، وتحقق من علامتين على بطاقة المحفظة قبل تثبيتها:

- **Ironwood: جاهزة.** Ironwood هو التجمّع الذي تدخل إليه قيمة ZEC المحمية الجديدة منذ ترقية [Ironwood](/zcash-tech/ironwood) في 28 يوليو 2026. لم يعد تجمّع Orchard الأقدم يقبل أموالًا جديدة.
- **الحماية التلقائية.** مفيدة إذا وصلت دفعة شفافة: إذ تنقل المحفظة ذلك الـ ZEC إلى التجمّع المحمي نيابةً عنك. لا تعتبر هذه العلامة بديلًا عن **Ironwood: جاهزة**. قد تتضمن المحفظة الحماية التلقائية ومع ذلك تفتقر إلى تجمّع Ironwood (تكون Edge بهذه الحالة في الدليل اليوم). تعرض معظم المحافظ الأخرى زر **Shield** بدلًا من ذلك.

ثبّت المحفظة من الرابط الموجود على بطاقة الدليل، وليس من نتيجة بحث أو إعلان. اكتب عبارة الاسترداد على ورقة واحتفظ بها دون اتصال بالإنترنت.

تعرض محفظتك نوعين من العناوين:

![A Zcash wallet's Receive screen with a shielded address starting u1 and a transparent address starting t1](/content-images/02-zodl-receive-c98cd378fb.webp)

| يبدأ بـ | النوع | ما يراه العامة |
|---|---|---|
| `u1` | Unified Address | لا شيء عنك، ولكن فقط عندما تصل الدفعة إلى تجمّع محمي |
| `t1` | عنوان شفاف | عنوانك والمبلغ، إلى الأبد، كما في Solana |

استخدم `u1` تصفه محفظتك بأنه محمي. إن `u1` عبارة عن حزمة من المستلمين، وبعض المحافظ تضع فيه مستلمًا شفافًا بجوار المستلم المحمي. سيستخدمه مرسل لا يستطيع الدفع إلا إلى عناوين شفافة، وستصل دفعتك علنية حتى لو لصقت `u1`. لا يحتوي العنوان المحمي في محفظة اختبارنا على مستلم شفاف، لذا لم يكن ذلك ممكنًا. يشرح [التجمّعات المحمية](/using-zcash/shielded-pools) المستلمين بمزيد من التفصيل. تعرض بعض المحافظ `u1` جديدًا كل مرة تفتح فيها Receive؛ وهذا طبيعي، وجميعها تخصك. تستخدم لقطة شاشة الاستلام وحقل المستلم في near.com على هذه الصفحة بادئات مختلفة لـ `u1` لهذا السبب.

استخدمنا ZODL في اختبارنا لأنها كانت المحفظة التي أعددناها. لا تستطيع استقبال قيمة محمية جديدة إلا المحافظ التي يحددها الدليل بأنها **Ironwood: جاهزة**.

---

## انقله

يتكون المسار من جزأين: ضع ZEC الخاص بك في NEAR Intents من Phantom، ثم أرسله إلى عنوان Zcash الخاص بك. استخدمنا [solswap.org](https://solswap.org)، وهو موقع أنشأه NEAR لمستخدمي Solana، للجزء الأول و[near.com](https://near.com)، تطبيق NEAR الخاص، للجزء الثاني. يشرح دليل ZecHub [كيفية مبادلة ZEC في محفظة Phantom](/using-zcash/solswap) شاشات solswap بمزيد من التفصيل. لا تستخدم زر **Swap** الخاص بـ Phantom لهذا: فأنت تمتلك الرمز بالفعل، ومبادلته لن توصلك إلى شيء.

احتفظ بقليل من SOL في Phantom لرسوم Solana.

### 1. أودع ZEC الخاص بك في solswap.org

1. افتح Phantom، وانتقل إلى علامة تبويب المتصفح، واكتب `solswap.org` بنفسك، ثم صِل محفظتك.
2. اضغط **Deposit**. اضبط **Asset** على **Zcash**، و**Network** على **Solana**، والطريقة على **Wallet**.
3. أدخل المبلغ (أو اضغط **Max**) ووافق على المعاملة في Phantom.

![solswap Deposit screen with Zcash as the asset, Solana as the network and Wallet as the method](/content-images/03-solswap-deposit-425691e62f.webp)

وصل إيداعنا إلى كتلة Solana عند 15:09:08 (UTC+1)، وأظهره solswap باعتباره **Completed** بعد تسع ثوانٍ.

![solswap deposit history showing Completed, +0.0026 ZEC](/content-images/04-solswap-deposit-complete-be5feaf758.webp)

يوجد ZEC الخاص بك الآن في رصيد NEAR Intents. يصرّح مفتاح Phantom بكل حركة خارجة منه، وينفذ محللو NEAR Intents عملية التسليم، ويمكن لـ NEAR Intents الاحتفاظ برصيد لمراجعة الامتثال (راجع ملاحظات الثقة أدناه).

### 2. أرسله إلى عنوان Zcash الخاص بك على near.com

لدى solswap أيضًا صفحة **Withdraw**، لكنها لم تعمل معنا. بقيت خانتا **Received amount** و**Fee** على "–" ولم يفعل الزر شيئًا، سواء اخترنا Zcash أو Solana للشبكة.

![solswap Withdraw form with the received amount and fee stuck at a dash](/content-images/05-solswap-withdraw-blank-92c6e64c65.webp)

إذا حدث لك ذلك، فإن ZEC الخاص بك ليس عالقًا. الرصيد مرتبط بمفتاح محفظتك، وليس بالموقع الإلكتروني، لذا يمكن لأي تطبيق NEAR Intents تسجل الدخول إليه بتلك المحفظة الوصول إليه. أكملنا العملية على near.com:

1. انتقل إلى `near.com` وسجّل الدخول بمحفظة Phantom نفسها.
2. يظهر رصيد solswap الخاص بك تحت **Move legacy assets** (يسمي near.com الأرصدة القادمة من تطبيقات NEAR Intents الأقدم "legacy"). اضغط **Withdraw** في صف ZEC. لا تحتاج إلى **Move**.

![near.com Move legacy assets page listing 0.0026 ZEC with Move and Withdraw buttons](/content-images/06-nearcom-legacy-assets-7ee16c5ac4.webp)

3. اضبط **Network** على Zcash، والصق عنوان `u1` الخاص بمحفظتك باعتباره **Recipient**، وتحقق من أول ستة أحرف وآخر ستة أحرف بمقارنتها بمحفظتك.

![near.com Withdraw legacy asset form with Zcash as the network and a u1 recipient, receive at least 0.00233164 ZEC, about 2 minutes](/content-images/07-nearcom-withdraw-724ef22b38.webp)

4. اضغط **Review withdrawal**، واقرأ الملخص، ثم اضغط **Send**.

![near.com Review send screen: network Zcash, recipient receives at least 0.00233164 ZEC, fee 0 ZEC, you pay 0.00266336 ZEC](/content-images/08-nearcom-review-b6053f675b.webp)

5. يطلب منك Phantom **Sign Message** لصالح near.com. هذا التوقيع هو ما يصرح لـ NEAR Intents بتحريك رصيدك. لا يكلّف SOL، لكن هذا لا يجعله غير ضار: يمكن لموقع مشابه أن يعرض الطلب نفسه ويفرغ رصيد NEAR Intents الخاص بك بواسطته. قبل أن تضغط **Confirm**، تحقق من كل ما يلي، واضغط **Cancel** إذا أخفق أيّ منها:
   - الموقع المذكور في الطلب هو `near.com`. (كان الإيداع في الخطوة 1 طلب معاملة Phantom عاديًا من `solswap.org`؛ تحقق من هذا الاسم هناك بالطريقة نفسها.)
   - افتح **Message** وابحث عن `"verifying_contract": "intents.near"`.
   - الرسالة نص قابل للقراءة كما في لقطة الشاشة. إذا كانت كتلة غير قابلة للقراءة، أو لم يتطابق الموقع مع الموقع الظاهر في شريط العنوان، فارفضها.
   - لا يطلب منك أبدًا عبارة الاسترداد. لا يتضمن التوقيع كتابتها مطلقًا.

![Phantom Sign Message request from near.com on the Solana network](/content-images/09-phantom-sign-message-cb1ce6d20f.webp)

6. يعرض near.com الحالات **Processing send** و**Sending** و**Complete**. يفتح **View on explorer** سجل NEAR Intents للتحويل.

![near.com status screen: Sending 0.0023 ZEC, all three steps complete](/content-images/10-nearcom-complete-c641093c46.webp)

![NEAR Intents explorer record: created 3:59:28 PM, withdrawn to the u1 address 4:07:55 PM, with the Zcash withdraw transaction ID](/content-images/11-intents-explorer-f93f87814e.webp)

### تكلفة اختبارنا ومدة استغراقه

| | اختبارنا |
|---|---|
| ZEC المودع من Phantom | 0.00266336 ZEC |
| ZEC المستلم في محفظة Zcash | 0.00241336 ZEC، محمي |
| التكلفة على جانب ZEC | 0.00025 ZEC (عرض near.com "Fee 0 ZEC"؛ التكلفة محسوبة ضمن السعر المعروض) |
| SOL المنفق على الإيداع | 0.00156844 SOL، منها 0.00008 SOL كانت رسوم الشبكة |
| الحد الأدنى | لم نصل إليه. أدرج solswap حدًا أدنى للإيداع قدره 0.00000001 ZEC، وقبل near.com مقدار 0.0026 ZEC |
| الإيداع، من Phantom إلى solswap | 9 ثوانٍ |
| السحب، من التوقيع على near.com إلى ZEC في محفظة Zcash | نحو 8 دقائق (قدّر near.com نحو دقيقتين) |

السجلات: إيداع Solana [5ijsgRrh…AjLkx](https://solscan.io/tx/5ijsgRrhViNTtFMmnsfJDSo3HhRmt3Ri7WB513oBoQLxfGNswDxvHnakwW1yyqXznTTCSxnUkooAHDKowz9AjLkx)، وNEAR Intents [79c23cfd…a405a9](https://explorer.near-intents.org/transactions/79c23cfd43928de5522c182e26f8f052dc9c43d53430ca497b40e016a6a405a9)، وZcash [28d6da27…481034](https://mainnet.zcashexplorer.app/transactions/28d6da27d74dc91e45175a7aff6023bc85578603dd77f1b49782a28f8f481034) في الكتلة 3,498,141. تتغير الرسوم والأوقات مع ضغط الشبكة، لذا تكون شاشة المراجعة هي القول الفصل عند تنفيذك العملية.

ينشر جسر NEAR حدًا أدنى قدره 0.01 ZEC ورسومًا قدرها 0.00047 ZEC لعمليات سحب Zcash القياسية. لم يطبّق near.com أيًا منهما على ZEC الخاص بنا البالغ 0.0026. إذا رفض تطبيق مبلغًا صغيرًا، فجرّب near.com قبل أن تزيد رصيدك.

### مسارات أخرى وما الذي يثق به كل منها

يثق كل مسار خارج Solana بـ OmniBridge، لأن الجسر يحتفظ بعملة ZEC التي تدعم رمزك. إضافةً إلى ذلك:

- **المسار أعلاه** يثق بـ NEAR Intents. يصرح توقيعك بالتحويل، ويسلّم المحللون ZEC على جانب Zcash، ويمكن لـ NEAR Intents احتجاز الأموال لمراجعة الامتثال؛ في عام 2026، أبلغ حامل Zcash [عن مبادلة كبيرة احتُجزت لأسابيع](https://www.cryptotimes.io/2026/09/11/zcash-holder-says-589k-usdt-stuck-on-near-intents-50-days-after-zodl-swap/). كما أنك تصل محفظتك بموقعين، لذا تحقق من شريط العنوان في كل مرة.
- **المحافظ التي تتضمن NEAR Intents مدمجًا** (ابحث عن ميزة NEAR Intents في [الدليل](/wallets)) تستخدم النظام نفسه من داخل محفظة Zcash. الثقة نفسها، ومواقع أقل. لم نختبر هذا مع ZEC على Solana.
- **منصة تداول**، فقط إذا كانت تقبل إيداعات هذا الرمز على شبكة Solana، وهو ما لا تقبله معظمها. ستتخلى عن الحيازة وعادةً عن هويتك، كما أن العديد من منصات التداول لا ترسل ZEC إلا إلى عناوين `t1`. راجع [منصات التداول الوصائية](/using-zcash/custodial-exchanges).

---

## احمه وتحقق منه

وصل محميًا. ذهب ZEC الخاص بنا إلى عنوان `u1`، ووصل مباشرةً إلى التجمّع المحمي Ironwood. لم تكن هناك خطوة شفافة ولا شيء لحمايته يدويًا. أدرجته المحفظة باعتباره **Receiving…** مع أيقونة درع عند 16:07 (UTC+1) بينما كانت تجمع التأكيدات.

![Zcash wallet activity showing Receiving 0.00241336 ZEC with a shield icon](/content-images/12-zodl-receiving-cb9f41511d.webp)

للتحقق منه بنفسك، افتح المعاملة في محفظتك وانسخ معرّف المعاملة.

![Zcash wallet transaction details with the transaction ID and timestamp](/content-images/13-zodl-tx-details-b08434d680.webp)

الصقه في [مستكشف كتل Zcash](https://mainnet.zcashexplorer.app). لا تدع الملخص يربكك. يقرأ ملخصنا **Shielded Inputs / Outputs 0 / 0** و**Transferred from/to shielded pool 0.0 ZEC**، لأن ملخص المستكشف لا يحسب Ironwood بعد. إن عناوين `t1` التي تراها موجودة على جهة الإرسال (ZEC الذي أنفقه والباقي الذي احتفظ به)، وليست عناوينك.

![Explorer summary for the transaction: two transparent inputs, one transparent output, 0/0 shielded](/content-images/14-explorer-summary-6153afb265.webp)

انقر **Raw TX: JSON** وابحث عن `ironwood`. إن القيمة السالبة لـ `valueBalance` هناك هي ZEC الذي يدخل إلى تجمّع Ironwood. كانت قيمتنا `-0.00241336`، وهي بالضبط ما وصل، ولا يظهر في المعاملة أي شيء يبين من استلمه.

![Raw transaction JSON with the ironwood section highlighted: valueBalance -0.00241336 (highlight added)](/content-images/15-explorer-raw-ironwood-8ff8ae0892.webp)

يشرح [ما الذي يستطيع مستكشف الكتل رؤيته](/zcash-tech/what-a-block-explorer-can-see) بقية الحقول.

### إذا لصقت عنوان `t1`

لم نرسل إلى عنوان منها، لكن النتيجة قابلة للتنبؤ. يصل ZEC إلى الرصيد الشفاف لمحفظتك، ويعرض المستكشف عنوان `t1` الخاص بك والمبلغ لأي شخص، بشكل دائم. تنقل المحفظة ذات الحماية التلقائية هذا الرصيد بعد ذلك إلى التجمّع المحمي؛ وإلا فاضغط **Shield**، وهو ما يتطلب رسوم شبكة صغيرة. تكون معاملة الحماية علنية أيضًا، لأنها تنفق من عنوان `t1` الخاص بك. لا يضيع شيء، لكن تبقى الصلة بين ذلك الإيداع ومحفظتك على السلسلة. الصق `u1`.

---

## ابقَ آمنًا

يتعرض الحائزون الجدد للاستهداف. تكاد تكون كل عملية احتيال تراها واحدة من هذه:

- **نوع عنوان خاطئ.** يبدأ عنوان Zcash بـ `u1` أو `t1` أو `zs` أو `tex1`. لا يحتوي عنوان Solana على أي من هذه البادئات. لا ترسل أبدًا ZEC الأصلي إلى عنوان Solana، ولا ترسل رمز Solana إلى عنوان Zcash.
- **خدمات شفافة فقط.** لا تستطيع بعض الجسور ومواقع المبادلة ومنصات التداول الإرسال إلا إلى عناوين `t1`. يمكن التعامل مع ذلك إذا حميت ZEC بمجرد وصوله. فقط لا تتركه هناك.
- **محافظ مزيفة.** ثبّت فقط من الرابط في بطاقة [دليل المحافظ](/wallets) أو من قائمة متجر التطبيقات الرسمية التي يشير إليها. تتسلل تطبيقات محافظ العملات المشفرة المزيفة بالفعل إلى متاجر التطبيقات، وتبدو مطابقة تمامًا للحقيقية.
- **التصيد بعبارة الاسترداد.** لا تحتاج أي محفظة أو جسر أو موقع مبادلة أو وكيل دعم أو مشرف أو توزيع مجاني إلى عبارة الاسترداد الخاصة بك. لا يتضمن توقيع رسالة كتابتها مطلقًا. أي شخص يطلبها يحاول السرقة منك. يشرح [استرداد الأموال](/using-zcash/recovering-funds) نسخة الاحتيال التي تقول "سنسترد محفظتك".
- **رموز احتيالية ومواقع "المطالبة".** تظهر رموز باسم ZEC أو Zcash أو شيء قريب منه في محافظ Solana دون طلب، وغالبًا مع رابط "للمطالبة" بالمزيد. قد يؤدي وصل محفظتك بذلك الرابط إلى استنزافها. تحقق من عنوان العقد في أعلى هذه الصفحة وتجاهل كل شيء آخر.
- **طلبات توقيع خبيثة.** يمكن لطلب "Sign Message" نقل رصيد NEAR Intents الخاص بك دون أي رسوم SOL. لا توقّع إلا على `near.com` أو `solswap.org`، وفقط عندما تسمي الرسالة `intents.near` (توضح الخطوة 5 أعلاه ما يجب التحقق منه).
- **مواقع مشابهة.** اكتب `solswap.org` و`near.com` بنفسك أو استخدم الإشارات المرجعية. لا تتبع روابط من الرسائل الخاصة أو الردود أو الإعلانات.

---

## ما الذي تفعله بـ ZEC المحمي

- حافظ على خصوصيته عند إنفاقه: [استخدام ZEC بخصوصية](/guides/using-zec-privately)
- اعثر على أماكن تقبله: [أماكن لإنفاق ZEC](/using-zcash/spend-zcash/top-10-places-to-spend-zec)
- أرسله مع رسالة خاصة مرفقة: [المذكرات](/using-zcash/memos)
- ادفع لشخص دون ربط هويتك: [إرسال المال دون ربط الهوية](/zcash-use-cases/send-money-without-linking-identity)
