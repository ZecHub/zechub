<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Lightwallet_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="تعديل الصفحة"/>
</a>


# عقد Lightwallet في Zcash

## المقدمة

تدعم Zcash، وهي عملة رقمية تركّز على الخصوصية، ميزة تُسمّى "عقد lightwallet" تُمكّن المستخدمين من التفاعل مع بلوكتشين Zcash دون تنزيل السجل الكامل للبلوكتشين. توفّر صفحة الويكي هذه نظرة عامة على عقد lightwallet، ودور خدمة "lightwalletd" في منظومة Zcash، وقائمة حالية بخوادم عقد lightwallet، وإرشادات حول كيفية تغيير الخوادم في المحافظ الشائعة مثل Ywallet وZingo.

## خدمة Lightwalletd

تلعب خدمة "lightwalletd"، وهي اختصار لعبارة "lightwallet daemon"، دورًا محوريًا في منظومة عقد lightwallet في Zcash. فهي تعمل كوسيط يزوّد العملاء الخفيفين (lightwallets) بالمعلومات التي يحتاجونها للعمل بكفاءة. وفيما يلي شرح موجز لخدمة lightwalletd:

__مجمّع بيانات__: تقوم lightwalletd بتجميع البيانات من بلوكتشين Zcash، مثل معلومات المعاملات وبيانات الكتل ومعلومات المجمعات المحمية.

__تحقق مبسّط__: تُجري lightwalletd تحققًا مبسّطًا لهذه البيانات، مما يتيح لمحافظ lightwallet الوصول إلى المعلومات الضرورية دون الحاجة إلى التحقق من البلوكتشين بالكامل.

__الحفاظ على الخصوصية__: تحافظ الخدمة على خصوصية مستخدمي Zcash من خلال عدم مطالبتهم بكشف مفاتيح العرض الخاصة بهم أو معلومات معاملاتهم الشخصية.

__مزامنة فعّالة__: تُمكّن lightwalletd من إجراء مزامنة فعّالة لمحافظ lightwallet، مما يقلّل بشكل كبير من الوقت والموارد اللازمة للبقاء محدّثًا مع بلوكتشين Zcash.


## القائمة الحالية لخوادم Lightwalletd

* [status.zec.rocks](https://status.zec.rocks/)
* [hosh.zec.rocks](https://hosh.zec.rocks/zec)

## تغيير الخوادم في محافظ الهاتف المحمول

يُعد تغيير خادم عقدة lightwallet أمرًا مباشرًا نسبيًا. ابحث عن الإعدادات المتقدمة داخل التطبيق وقم بالدخول إليها.

__افتح Ywallet/Zingo/Zashi/eZcash__: شغّل المحفظة التي تختارها على جهازك.

#### Ywallet:

بالنسبة إلى Ywallet، ستجده في أيقونة الترس في الزاوية العلوية اليمنى - انتقل إلى تبويب Zcash. 

![SmartSelect_20250313_105128](https://github.com/user-attachments/assets/b0a2910b-dbdf-4292-8e69-af5a386aa183)

#### Zingo:

بالنسبة إلى Zingo، ستجده في قائمة الهامبرغر في الزاوية العلوية اليسرى، ثم انقر على الإعدادات ومرّر إلى الأسفل

![SmartSelect_20250313_105737_Zingo](https://github.com/user-attachments/assets/ea8f7672-e644-41a5-a422-db131740404a)

#### Zashi:

بالنسبة إلى Zashi، ستجده في أيقونة الترس في الزاوية العلوية اليمنى - انتقل إلى الإعدادات المتقدمة، ثم اختر خادمًا

![SmartSelect_20250313_110200_Zashi](https://github.com/user-attachments/assets/5a9d050a-8308-4cc2-907e-513072066aed)

#### eZcash

بالنسبة إلى eZcash، ستجده في قائمة الهامبرغر في الزاوية العلوية اليسرى، ثم انقر على Settings، واضغط على Advanced

![SmartSelect_20250313_110616](https://github.com/user-attachments/assets/655c0172-61a0-4322-b8cf-4eee4bb53b51)


## الخلاصة

توفّر عقد lightwallet في Zcash وخدمة lightwalletd طريقة مريحة وتحافظ على الخصوصية للمستخدمين للتفاعل مع البلوكتشين. كما أن القدرة على تغيير الخوادم توفّر مرونة في اختيار العقدة التي تناسب احتياجاتك على أفضل وجه.
