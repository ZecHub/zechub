<a href="https://github.com/Zechub/zechub/edit/main/site/ZFAV_Club/Guides_for_Creators/Publish_Site_on_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="تعديل الصفحة"/>
</a>

# نشر موقع على IPFS

<a href="">
    <img src="https://blog.desdelinux.net/wp-content/uploads/2020/04/IPFS-.jpg" alt="" width="800" height="400"/>
</a>



## مقدمة إلى IPFS

يُعد IPFS (InterPlanetary File System) بروتوكولًا وشبكةً من نظير إلى نظير، صُمِّما لإنشاء طريقة لامركزية لتخزين الملفات ومشاركتها.

وعلى عكس نموذج العميل-الخادم التقليدي للإنترنت، يتيح IPFS للمستخدمين مشاركة الملفات مباشرةً مع بعضهم البعض، بدلًا من الاعتماد على خادم مركزي لتخزين المحتوى وتوزيعه.

تُعنون الملفات في IPFS باستخدام *العنونة حسب المحتوى*، ما يعني أن كل ملف يُمنح قيمة تجزئة فريدة أو معرّف محتوى (CID) استنادًا إلى محتواه، ويُستخدم هذا المعرّف لاسترجاع الملف من الشبكة.

عندما يضيف المستخدم ملفًا إلى IPFS، يُقسَّم الملف إلى أجزاء صغيرة تُسمّى كتلًا، وتُمنح كل كتلة CID خاصًا بها. ثم تُخزَّن هذه الكتل على عُقد مختلفة في الشبكة، بحيث يمكن استرجاع الملف بسهولة من مصادر متعددة.

ويضمن ذلك التكرار وتحمل الأعطال، كما يجعل من الصعب على أي عقدة واحدة أن تصبح نقطة فشل أو تحكم وحيدة.

**اقرأ: [مقدمة إلى IPFS](https://blog.infura.io/post/an-introduction-to-ipfs)**

## إنشاء موقعك

في هذا المثال، سننشئ موقعًا إلكترونيًا بسيطًا.

[موقع مثال](https://squirrel.surf/)

**الخطوة 1:** إذا لم تكن معتادًا على تصميم الويب، فاكتب المحتوى الرئيسي لموقعك، بما في ذلك العنوان، والمتن الرئيسي للنص، مع روابط إلى صفحات/مواقع أخرى والتذييلات.

**الخطوة 2:** استخدم [قالب HTML!](https://nicepage.com/html-templates) والصق النص الذي كتبته في المواضع المناسبة. ويمكنك اختياريًا أيضًا إنشاء ملف .CSS لتنسيق موقعك.

**الخطوة 3:** احفظ الدليل الخاص بك. يجب أن تكون جميع صفحات .html + الصور في المجلد نفسه.

## إعداد عقدة

نزّل وثبّت IPFS من [الموقع الرسمي](https://docs.ipfs.tech/install/ipfs-desktop/).

### تهيئة IPFS:

إذا كنت تستخدم تطبيق سطح المكتب، فلن تحتاج إلى التهيئة.

باستخدام الطرفية أو موجّه الأوامر، شغّل الأمر: ipfs init

### **إضافة مجلد الموقع إلى IPFS**:

حدّد المجلد الذي يحتوي على ملفات موقعك وانتقل إلى خيار Add Folder.


<a href="">
    <img src="https://i.ibb.co/ZHW4zsY/ipfs-site-folder.png" alt="" width="400" height="200"/>
</a>

–

إذا كنت تستخدم الطرفية، فشغّل الأمر: ipfs add -r folder_name لإضافة المجلد بالكامل بشكل تكراري إلى IPFS.

### تثبيت الموقع على IPFS:

بمجرد إضافة ملفات موقعك إلى IPFS، تحتاج إلى **تثبيتها** لضمان بقائها متاحة على الشبكة.

–

إذا كنت تستخدم الطرفية، فشغّل الأمر: If using Terminal, Run command: ipfs pin add **hash**

**hash** = CID الخاص بالمجلد الذي أضفته في الخطوة السابقة.

بدلًا من ذلك، يمكنك أيضًا تثبيت الأدلة باستخدام خدمات مثل [Pinata](https://pinata.cloud/) أو [Dolpin](https://dolpin.io/)

فهذا يوفر الكثير من الوقت!

–

### الوصول إلى موقعك على IPFS:

أصبح موقعك الآن منشورًا على IPFS ويمكن الوصول إليه باستخدام قيمة تجزئة المجلد. وللوصول إلى موقعك، يمكنك زيارة https://ipfs.io/ipfs/**hash**

**hash** = CID الخاص بالمجلد.

في حالتنا، فإن CID = QmW2UEfap1vrRRvS5H9wed8qmsx4WsvXBk3GPGVVfWx3r3

## IPNS

يتيح Interplanetary Naming System (IPNS) لك تحديث معرفات CID الخاصة بـ IPFS المرتبطة بموقعك مع الاستمرار في تقديم رابط ثابت. ويُوفَّر ذلك على شكل مفتاح.


<a href="">
    <img src="https://dnslink.io/assets/dns-query.a0134a75.png" alt="" width="400" height="100"/>
</a>


في قائمة الإعدادات الخاصة بمجلد موقعك في تطبيق IPFS لسطح المكتب، اختر Publish to IPNS.

<a href="">
    <img src="https://i.ibb.co/Ch25dKf/IPNS.png" alt="" width="400" height="200"/>
</a>


المفتاح: “k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n”

ويمكن أيضًا استخدامه لعرض موقعنا عبر بوابة: https://ipfs.io/ipns/k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n

## DNS Link

تم إنشاء الموقع، والآن نحتاج إلى طريقة لربط عنوان URL بالمحتوى.

إذا كنت تملك بالفعل عنوان ويب، فيمكنك إضافة سجل جديد باستخدام سجل TXT ‏_dnslink(your domain). وبحسب مزوّد الخدمة، قد يتم ملؤه تلقائيًا.


<a href="">
    <img src="https://i.ibb.co/MgRxBHj/example.png" alt="" width="400" height="100"/>
</a>


سيستغرق الأمر بعض الوقت حتى ينتشر عبر الشبكة قبل أن تتمكن من عرضه.

*تهانينا! أصبح لديك الآن موقع ويب مقاوم للرقابة.*

____

**الموارد**

[وثائق IPFS](https://docs.ipfs.tech/)

[وثائق IPNS](https://docs.ipfs.tech/concepts/ipns/)

[وثائق DNS link](https://dnslink.io/#introduction)
