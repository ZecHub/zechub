<a href="https://github.com/Zechub/zechub/edit/main/site/ZFAV_Club/Guides_for_Creators/Publish_Site_on_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="تعديل الصفحة"/>
</a>

# نشر موقع على IPFS

<a href="">
    <img src="/content-images/IPFS-40c2e22732.webp" alt="" width="800" height="400"/>
</a>



## مقدمة إلى IPFS

يُعد IPFS (InterPlanetary File System) بروتوكولًا وشبكةً من نظير إلى نظير، صُمِّما لإنشاء طريقة لامركزية لتخزين الملفات ومشاركتها.

وعلى عكس نموذج العميل-الخادم التقليدي للإنترنت، يتيح IPFS للمستخدمين مشاركة الملفات مباشرةً مع بعضهم البعض، بدلًا من الاعتماد على خادم مركزي لتخزين المحتوى وتوزيعه.

تُعنون الملفات في IPFS باستخدام *العنونة حسب المحتوى*، ما يعني أن كل ملف يُمنح قيمة تجزئة فريدة أو معرّف محتوى (CID) استنادًا إلى محتواه، ويُستخدم هذا المعرّف لاسترجاع الملف من الشبكة.

يخزّن IPFS المحتوى على شكل كتل تُعرَّف بواسطة معرّفات CID. عند إضافة ملف، يُخزَّن على عقدتك فقط، ولا يُنسخ تلقائيًا إلى عقد أخرى. احتفظ بنسخة متاحة على الإنترنت يمكن الوصول إليها، أو رتّب تثبيتًا عن بُعد (remote pinning)، حتى يتمكن القرّاء الآخرون من استرجاعه. راجع [IPFS استمرارية البيانات](https://docs.ipfs.tech/concepts/persistence/).

**اقرأ: [مقدمة إلى IPFS](https://blog.infura.io/post/an-introduction-to-ipfs)**

## إنشاء موقعك

في هذا المثال، سننشئ موقعًا إلكترونيًا بسيطًا.

[موقع مثال](https://squirrel.surf/)

**الخطوة 1:** إذا لم تكن معتادًا على تصميم الويب، فاكتب المحتوى الرئيسي لموقعك، بما في ذلك العنوان، والمتن الرئيسي للنص، مع روابط إلى صفحات/مواقع أخرى والتذييلات.

**الخطوة 2:** استخدم [قالب HTML!](https://nicepage.com/html-templates) والصق النص الذي كتبته في المواضع المناسبة. ويمكنك اختياريًا أيضًا إنشاء ملف .CSS لتنسيق موقعك.

**الخطوة 3:** ضع صفحتك الرئيسية في `index.html` في جذر مجلد الموقع. وأدرج معها صورها وملفات CSS الخاصة بها، مستخدمًا مسارات نسبية مثل `style.css` لكي تعمل أيضًا عبر عنوان URL لبوابة IPFS.

## إعداد عقدة

[IPFS Desktop](https://docs.ipfs.tech/install/ipfs-desktop/) يتولى إدارة العقدة نيابةً عنك. أبقِه قيد التشغيل طوال فترة مشاركة موقعك.

لاتباع [مسار سطر الأوامر](https://docs.ipfs.tech/how-to/command-line-quick-start/)، هيّئ مستودعًا جديدًا مرة واحدة:

```sh
ipfs init
```

ثم شغّل العقدة واترك هذه الطرفية مفتوحة:

```sh
ipfs daemon
```

شغّل الأوامر المتبقية في نافذة طرفية ثانية. لا تبدأ عملية خلفية (daemon) ثانية إذا كان IPFS Desktop يدير هذا المستودع بالفعل.

### **إضافة مجلد الموقع إلى IPFS**:

في IPFS Desktop، اختر المجلد الذي يحتوي على ملفات موقعك الإلكتروني باستخدام خيار Add Folder.

<a href="">
    <img src="/content-images/ipfs-site-folder-2c96524d98.webp" alt="" width="400" height="200"/>
</a>

–

للتثبيت عبر واجهة سطر الأوامر (CLI)، شغّل الأمر التالي من المجلد الأصلي الذي يحتوي على مجلد موقعك:

```sh
ipfs add -r folder_name
```

استبدل `folder_name` باسم المجلد الخاص بك (ضع الأسماء التي تحتوي على مسافات بين علامتي اقتباس). احفظ الـ CID الموجود في سطر `added ... folder_name` الأخير: فهو يعرّف المجلد بأكمله، وليس `index.html` فقط.

### تثبيت الموقع على IPFS:

يقوم أمر `ipfs add` في واجهة سطر الأوامر (CLI) بتثبيت (pin) المحتوى المستورد محليًا بشكل افتراضي. تحقّق من تثبيت المجلد باستخدام:

```sh
ipfs pin ls YOUR_FOLDER_CID
```

استبدل `YOUR_FOLDER_CID` بمعرّف CID من الخطوة السابقة؛ ويجب أن تُظهر المخرجات `recursive`. يحمي التثبيت (pinning) نسخة هذه العقدة من عملية جمع المهملات (garbage collection)، لكنه لا يُبقي جهاز كمبيوتر مُطفأً متصلاً بالشبكة. ولضمان توفر المحتوى أثناء انقطاع عقدتك عن الشبكة، رتّب [التثبيت عن بُعد](https://docs.ipfs.tech/how-to/work-with-pinning-services/) وتأكد من أن الخدمة البعيدة قد أنهت عملية التثبيت.

### الوصول إلى موقعك على IPFS:

تحقّق أولًا من موقعك عبر البوابة المحلية على `http://127.0.0.1:8080/ipfs/YOUR_FOLDER_CID/` (استخدم منفذ البوابة الذي يطبعه الـ daemon الخاص بك إن كان مختلفًا). تتيح الشرطة المائلة في النهاية حلّ الروابط النسبية داخل الدليل.

يمكن لبوابة عامة مثل `https://ipfs.io/ipfs/YOUR_FOLDER_CID/` أن تقدّمه بمجرد أن تتمكن من جلب المحتوى من عقدة يمكن الوصول إليها. ولا يُثبت نجاح المعاينة المحلية أن المحتوى متاح للعموم.

في حالتنا، فإن CID = QmW2UEfap1vrRRvS5H9wed8qmsx4WsvXBk3GPGVVfWx3r3

## IPNS

يتيح Interplanetary Naming System (IPNS) لك تحديث معرفات CID الخاصة بـ IPFS المرتبطة بموقعك مع الاستمرار في تقديم رابط ثابت. ويُوفَّر ذلك على شكل مفتاح.


<a href="">
    <img src="/content-images/dns-query.a0134a75-9ef7817f80.webp" alt="" width="400" height="100"/>
</a>


في قائمة الإعدادات الخاصة بمجلد موقعك في تطبيق IPFS لسطح المكتب، اختر Publish to IPNS.

<a href="">
    <img src="/content-images/IPNS-2fe62cc369.webp" alt="" width="400" height="200"/>
</a>


المفتاح: “k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n”

ويمكن أيضًا استخدامه لعرض موقعنا عبر بوابة: https://ipfs.io/ipns/k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n

## DNS Link

تم إنشاء الموقع، والآن نحتاج إلى طريقة لربط عنوان URL بالمحتوى.

بالنسبة إلى `example.com`، أضف سجل DNS هذا، مع استبدال `YOUR_FOLDER_CID` بمعرّف CID الخاص بالدليل لديك:

| النوع | الاسم | القيمة |
|---|---|---|
| TXT | `_dnslink.example.com` | `dnslink=/ipfs/YOUR_FOLDER_CID` |

بعض مزوّدي DNS يُلحقون المنطقة (zone) تلقائيًا؛ لذا أدخل `_dnslink` فقط هناك. إذا كنت تستخدم الاسم IPNS المذكور أعلاه، فيمكن أن تكون القيمة بدلًا من ذلك `dnslink=/ipns/YOUR_IPNS_NAME`. راجع [DNSLink](https://docs.ipfs.tech/concepts/dnslink/).

<a href="">
    <img src="/content-images/example-c2a9edb28b.webp" alt="" width="400" height="100"/>
</a>


بعد انتشار سجلات DNS، جرّب `https://ipfs.io/ipns/example.com/`. يتطلب تقديم الموقع مباشرةً على `https://example.com/` أيضًا بوابة تدعم DNSLink وإعداد HTTPS؛ إذ إن سجل TXT وحده لا يُعِدّ ذلك. اتبع [دليل النطاق المخصص](https://docs.ipfs.tech/how-to/websites-on-ipfs/custom-domains/).

*تهانينا! أصبح لديك الآن موقع ويب مقاوم للرقابة.*

____

**الموارد**

[وثائق IPFS](https://docs.ipfs.tech/)

[وثائق IPNS](https://docs.ipfs.tech/concepts/ipns/)

[وثائق DNS link](https://dnslink.io/#introduction)
