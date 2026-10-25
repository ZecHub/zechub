#  <img src="/content-images/e38b13a9-d410-426a-a1e6-2dde105d56c4-6b8154e5ae.webp" alt="Alt Text" width="50"/> ZingoLabs

[الموقع الرسمي](https://zingolabs.org/) - [GitHub](https://github.com/zingolabs) - [X/Twitter](https://x.com/ZingoLabs) - [Instagram](https://www.instagram.com/zingolabesp/)

ZingoLabs هو فريق من أصحاب الرؤى المكرّسين لتحسين التجربة الإنسانية. نؤمن بأن التكنولوجيا ينبغي أن تفيد البشرية، وأننا نزدهر من خلال التفاعلات القائمة على التراضي. نحن نحدد الأنماط التي تجعل ذلك ممكنًا.

Zingo يعمل Lab Cyan بوصفه DAO محمية. نخزّن أموالنا في خزينة يمتلك فيها كل عضو مفتاح عرض. تُنفق الأموال من الخزينة عندما يصوّت الأعضاء لصالح مقترح.

## المشاريع

### محفظة Zingo! ([GitHub](https://github.com/zingolabs/zingo-mobile))
محفظة Zingo هي محفظة Zcash كاملة الميزات صُممت لسهولة الاستخدام، رغم أنها تتضمن بعض الميزات المتقدمة للمستخدمين الأكثر خبرة. وهي تدعم التجمعات الشفافة وSapling وIronwood، وتحتوي على دفتر عناوين للمدفوعات المتكررة، ومتاحة بلغات مختلفة. وكانت أول محفظة تدعم Orchard وتطبّق تنسيقات NU5.

إحدى الميزات الرئيسية لـ Zingo! هي قدرتها على استخدام حقل Memo لتقديم رؤى قيّمة حول معاملاتك.

يتوفر Zingo! للأجهزة المحمولة والحواسيب الشخصية. ستجد جميع التنزيلات [هنا](https://zingolabs.org/)

### Zingolib ([GitHub](https://github.com/zingolabs/zingolib))
واجهة API وتطبيق اختباري يكشفان وظائف zcash لاستهلاك التطبيقات. يوفر Zingolib مكتبة لـ zingo-mobile، بالإضافة إلى تطبيق cli مضمّن يُسمى zingo-cli، وهو محفظة خفيفة بسطر الأوامر تتواصل مع مفهرس سلسلة مثل [Zaino](/zcash-tech/zaino).

### مفهرس Zaino ([GitHub](https://github.com/zingolabs/zaino))
Zaino هو مفهرس Rust لسلسلة الكتل Zcash، طوّره فريق Zingo. وهو المفهرس في [حزمة Z3](/zcash-tech/z3-stack): إذ يفهرس بيانات السلسلة من مدقّق [Zebra](/zcash-tech/zebra-full-node) ويخدم المحافظ والمستكشفات والعملاء الآخرين. وهو المسار اللاحق لـ lightwalletd.

يوفر Zaino ميزات أساسية لكلٍّ من العملاء الخفيفين، مثل المحافظ والتطبيقات التي لا تتطلب سجل سلسلة الكتل الكامل، والعملاء أو المحافظ الكاملة. كما يدعم مستكشفات الكتل، مانحًا الوصول إلى كلٍّ من سلسلة الكتل النهائية وأفضل سلسلة غير نهائية ومجمع المعاملات الذي يديره مدقّق كامل Zebra.

وصل `zcashd` إلى توقف نهاية الدعم في 18 يوليو 2026 عند الكتلة 3,417,100، ولا يدعم Ironwood (NU6.3). يقرأ Zaino مدقّق Zebra.

###  ZLN (zcash-local-net) ([GitHub](https://github.com/zingolabs/infrastructure/tree/dev/zcash_local_net))

مجموعة من الأدوات التي تطلق وتدير عمليات Zcash. يُستخدم هذا للاختبار التكاملي في تطوير:
- العملاء الخفيفين
- المفهرسات
- المدقّقين

هدفه هو توفير بيئة اختبار شديدة القابلية للتكيف ومتينة للعقد الأساسية (المدقّقين) مثل Zebra، والمفهرسات مثل Zaino، ومحافظ العملاء الخفيفين مثل zingo-cli.

الحزمة الافتراضية التي يطلقها هي Zebrad، وzainod، وzcash-devtool. تقع عمليات `zcashd` وlightwalletd القديمة خلف ميزة `legacy-stack` غير المدعومة، ومن المقرر إزالتها.

بالإضافة إلى توفير أدوات لبدء بيانات سلسلة Zcash وتخزينها مؤقتًا وتحميلها (للشبكة الرئيسية، وشبكة الاختبار، وregtest)، يُستخدم zcash-local-net من مجموعة اختبارات Zaino لتقييم خدمات Lightwallet RPC المستضافة في Zaino (انظر وثائق اختبار [Zaino](https://github.com/zingolabs/zaino/blob/dev/docs/testing.md)).
