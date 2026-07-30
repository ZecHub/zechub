#  <img src="https://github.com/user-attachments/assets/e38b13a9-d410-426a-a1e6-2dde105d56c4" alt="نص بديل" width="50"/> ZingoLabs

[الموقع الرسمي](https://zingolabs.org/) - [GitHub](https://github.com/zingolabs) - [X/Twitter](https://x.com/ZingoLabs) - [Instagram](https://www.instagram.com/zingolabesp/)

ZingoLabs هو فريق من أصحاب الرؤى المكرّسين لتعزيز التجربة الإنسانية. نحن نؤمن بأن التكنولوجيا ينبغي أن تعود بالنفع على البشرية، وأننا نزدهر من خلال التفاعلات التوافقية. ونحن نحدّد الأنماط التي تجعل ذلك ممكنًا.

يعمل Zingo Lab Cyan بوصفه DAO محميًا. نخزّن أموالنا في خزينة يمتلك فيها كل عضو Viewing Key. ويتم إنفاق الأموال من الخزينة عندما يصوّت الأعضاء لصالح مقترح ما.

## المشاريع

### محفظة Zingo! ([GitHub](https://github.com/zingolabs/zingo-mobile))
محفظة Zingo هي محفظة Zcash متكاملة الميزات ومصممة لسهولة الاستخدام، رغم أنها تتضمن بعض الميزات المتقدمة للمستخدمين الأكثر خبرة. وهي تدعم مجمعات transparent وSapling وOrchard، وتحتوي على دفتر عناوين للمدفوعات المتكررة، وهي متاحة بلغات متعددة. وكانت أول محفظة تدعم Orchard وتنفّذ تنسيقات NU5.

ومن أبرز ميزات Zingo! قدرتها على استخدام حقل Memo لتقديم معلومات قيّمة حول معاملاتك.

تتوفر Zingo! للأجهزة المحمولة وأجهزة الكمبيوتر. ستجد جميع التنزيلات [هنا](https://zingolabs.org/)

### Zingolib ([GitHub](https://github.com/zingolabs/zingolib))
واجهة API وتطبيق اختبار يوفّران وظائف zcash لاستهلاكها من قِبل التطبيقات. يوفّر Zingolib مكتبة لـ zingo-mobile، بالإضافة إلى تطبيق cli مضمّن للتفاعل مع zcashd عبر lightwalletd يُسمّى Zingo-cli، وهو عميل lightwalletd-proxy يعمل عبر سطر الأوامر.

### Zaino Indexer ([GitHub](https://github.com/zingolabs/zaino))
Zaino هو Indexer طوّره فريق Zingo بلغة Rust، ويهدف إلى استبدال lightwalletd ودفع مشروع إيقاف zcashd قدمًا.

يوفّر Zaino ميزات أساسية لكلٍّ من العملاء الخفيفين، مثل المحافظ والتطبيقات التي لا تتطلب كامل سجل blockchain، وكذلك للعملاء الكاملين أو المحافظ. كما يدعم أيضًا مستكشفات الكتل، ويمنح إمكانية الوصول إلى كلٍّ من blockchain النهائية وأفضل سلسلة غير نهائية وmempool التي يديرها مدقق كامل من نوع Zebra أو Zcashd.

###  ZLN (zcash-local-net) ([GitHub](https://github.com/zingolabs/zcash-local-net))
مجموعة من الأدوات التي تطلق عمليات Zcash وتديرها. ويُستخدم هذا في اختبار التكامل أثناء تطوير:
- العملاء الخفيفين
- المفهرِسات
- المدققين

وهدفه هو توفير بيئة اختبار شديدة التكيّف والمتانة للعُقد الأساسية (المدققين) مثل zcash وzebra، وللمفهرِسات مثل lightwallet وzaino، وكذلك، كحد أدنى، zingo-cli بوصفه محفظة عميل خفيف.

صُمم هذا المستودع لمقارنة وظائف مختلف المدققين (مثل Zcashd وZebrad) والمفهرِسات (مثل Lightwalletd وZaino) لتسهيل عملية الانتقال أثناء مسار إيقاف Zcashd.

وبالإضافة إلى توفير أدوات لبدء بيانات سلسلة Zcash وتخزينها مؤقتًا وتحميلها (للشبكة الرئيسية mainnet، وشبكة الاختبار testnet، وregtest)، يتضمن zcash-zocal-net أيضًا سلسلة من الاختبارات لمقارنة قدرات Lightwalletd وZaino عبر جميع خدمات Lightwallet RPC. ويمكن تنفيذ هذه الاختبارات مباشرة من Zaino (انظر [https://github.com/zingolabs/zaino/blob/dev/docs/testing.md](https://github.com/zingolabs/zaino/blob/dev/docs/testing.md)]) لتقييم خدمات Lightwallet RPC المستضافة في Zaino.
