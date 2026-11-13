<a href="https://github.com/Zechub/zechub/edit/main/site/Zcash_Community/ZFAV_Club/Guides/Website_On_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="تعديل الصفحة"/>
</a>

# نشر موقع ويب على IPFS 

![](/content-images/IPFS-40c2e22732.webp)

## مقدمة إلى IPFS 

يُعد IPFS (InterPlanetary File System) بروتوكولًا وشبكةً من نظير إلى نظير، صُمِّما لإنشاء طريقة لامركزية لتخزين الملفات ومشاركتها. 

وعلى عكس نموذج العميل-الخادم التقليدي على الإنترنت، يتيح IPFS للمستخدمين مشاركة الملفات مباشرةً مع بعضهم البعض، بدلًا من الاعتماد على خادم مركزي لتخزين المحتوى وتوزيعه. 

تُعنون الملفات في IPFS باستخدام *العنونة بالمحتوى*، ما يعني أن كل ملف يُمنح تجزئة فريدة أو CONTENT IDENTIFIER (CID) استنادًا إلى محتواه، وتُستخدم هذه التجزئة لاسترجاع الملف من الشبكة.

IPFS يخزّن المحتوى على شكل كتل تُعرَّف بواسطة CIDs. عند إضافة ملف، يُخزَّن على عقدتك فقط، ولا يُنسخ تلقائيًا إلى عقد أخرى. احتفظ بنسخة متاحة على الإنترنت يمكن الوصول إليها، أو رتّب تثبيتًا عن بُعد (remote pinning)، حتى يتمكن القرّاء الآخرون من استرجاعه. راجع [IPFS الاستمرارية](https://docs.ipfs.tech/concepts/persistence/).

اقرأ [مقدمة إلى IPFS](https://blog.infura.io/post/an-introduction-to-ipfs)



## إنشاء موقعك 

في هذا المثال سننشئ موقع ويب بسيطًا. 

[موقع تجريبي](https://squirrel.surf)


**الخطوة 1:** إذا لم تكن معتادًا على تصميم الويب، فاكتب المحتوى الرئيسي لموقعك، بما في ذلك العنوان، والنص الأساسي، والروابط إلى الصفحات/المواقع الأخرى، والتذييلات.

**الخطوة 2:** استخدم [قالب HTML!](https://nicepage.com/html-templates) والصق النص الذي كتبته في المكان المناسب. ويمكنك اختياريًا أيضًا إنشاء ملف أنماط .CSS لموقعك. 

**الخطوة 3:** ضع صفحتك الرئيسية في `index.html` في جذر مجلد الموقع. وأدرج معها صورها وملفات CSS الخاصة بها، مستخدمًا مسارات نسبية مثل `style.css` كي تعمل أيضًا عبر عنوان URL لبوابة IPFS.

## إعداد عقدة

[IPFS Desktop](https://docs.ipfs.tech/install/ipfs-desktop/) يدير العقدة نيابةً عنك. أبقِه قيد التشغيل أثناء مشاركة موقعك.

بالنسبة إلى [مسار سطر الأوامر](https://docs.ipfs.tech/how-to/command-line-quick-start/)، قم بتهيئة مستودع جديد مرة واحدة:

```sh
ipfs init
```

ثم شغّل العقدة واترك هذه الطرفية مفتوحة:

```sh
ipfs daemon
```

شغّل الأوامر المتبقية في نافذة طرفية ثانية. لا تبدأ عملية daemon ثانية إذا كان IPFS Desktop يدير هذا المستودع بالفعل.

**إضافة مجلد الموقع إلى IPFS**: 

في IPFS Desktop، اختر المجلد الذي يحتوي على ملفات موقعك الإلكتروني باستخدام خيار Add Folder.

![](/content-images/ipfs-site-folder-2c96524d98.webp)

--

بالنسبة لمسار CLI، شغّل هذا الأمر من المجلد الأب لمجلد موقعك:

```sh
ipfs add -r folder_name
```

استبدل `folder_name` باسم المجلد الخاص بك (ضع الأسماء التي تحتوي على مسافات بين علامتي اقتباس). احفظ معرّف CID الموجود في السطر الأخير `added ... folder_name`: فهو يعرّف الدليل بأكمله، وليس `index.html` فقط.

### تثبيت الموقع على IPFS: 

يقوم الأمر `ipfs add` في واجهة سطر الأوامر (CLI) بتثبيت (pin) المحتوى المستورد محليًا بشكل افتراضي. تحقّق من تثبيت المجلد باستخدام:

```sh
ipfs pin ls YOUR_FOLDER_CID
```

استبدل `YOUR_FOLDER_CID` بمعرّف CID من الخطوة السابقة؛ ويجب أن يظهر في المخرجات `recursive`. يحمي التثبيت (pinning) نسخة هذه العقدة من عملية جمع البيانات المهملة (garbage collection)، لكنه لا يُبقي جهاز كمبيوتر مُطفأً متصلاً بالشبكة. لضمان توفر المحتوى أثناء عدم اتصال عقدتك، رتّب [التثبيت عن بُعد](https://docs.ipfs.tech/how-to/work-with-pinning-services/) وتأكد من أن الخدمة البعيدة قد أنهت عملية التثبيت.

### الوصول إلى موقعك على IPFS: 

تحقق أولاً من موقعك عبر البوابة المحلية على `http://127.0.0.1:8080/ipfs/YOUR_FOLDER_CID/` (استخدم منفذ البوابة الذي يعرضه الـ daemon الخاص بك إذا كان مختلفاً). تتيح الشرطة المائلة في النهاية حلّ الروابط النسبية داخل المجلد.

يمكن لبوابة عامة مثل `https://ipfs.io/ipfs/YOUR_FOLDER_CID/` تقديمه بمجرد أن تتمكن من جلب المحتوى من عقدة يمكن الوصول إليها. ولا يُثبت نجاح المعاينة المحلية أن المحتوى متاح للعامة.

في حالتنا، يكون CID = "QmW2UEfap1vrRRvS5H9wed8qmsx4WsvXBk3GPGVVfWx3r3"


## IPNS 

يتيح لك Interplanetary Naming System (IPNS) تحديث CID الخاصة بـ IPFS المرتبطة بموقعك مع الاستمرار في تقديم رابط ثابت. ويتم توفيره على شكل مفتاح. 

![](/content-images/dns-query.a0134a75-9ef7817f80.webp)

في قائمة الإعدادات الخاصة بمجلد موقعك على تطبيق IPFS لسطح المكتب، اختر Publish to IPNS.  

![](/content-images/IPNS-2fe62cc369.webp)

المفتاح: "k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n"

ويمكن أيضًا استخدامه لعرض موقعنا عبر بوابة: https://ipfs.io/ipns/k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n


## رابط DNS 
 
تم إنشاء الموقع، والآن نحتاج إلى طريقة لتوجيه URL إلى المحتوى. 

بالنسبة إلى `example.com`، أضف سجل DNS هذا، مع استبدال `YOUR_FOLDER_CID` بمعرّف CID الخاص بالدليل لديك:

| النوع | الاسم | القيمة |
|---|---|---|
| TXT | `_dnslink.example.com` | `dnslink=/ipfs/YOUR_FOLDER_CID` |

يُلحق بعض مزوّدي DNS اسم المنطقة تلقائيًا؛ لذا أدخِل `_dnslink` فقط هناك. وإذا كنت تستخدم الاسم IPNS المذكور أعلاه، فيمكن أن تكون القيمة بدلًا من ذلك `dnslink=/ipns/YOUR_IPNS_NAME`. راجع [DNSLink](https://docs.ipfs.tech/concepts/dnslink/).

![](/content-images/example-c2a9edb28b.webp)

بعد انتشار سجلات DNS، جرّب `https://ipfs.io/ipns/example.com/`. يتطلب تقديم الموقع مباشرةً على `https://example.com/` أيضًا بوابة تدعم DNSLink وإعداد HTTPS؛ فسجل TXT وحده لا يُعِدّ ذلك. اتبع [دليل النطاق المخصص](https://docs.ipfs.tech/how-to/websites-on-ipfs/custom-domains/).

تهانينا! لقد أنشأت موقع ويب مقاومًا للرقابة. 


**الموارد**

[توثيق IPFS](https://docs.ipfs.tech)

[توثيق IPNS](https://docs.ipfs.tech/concepts/ipns/)

[وثائق DNS link](https://dnslink.io/#introduction)
