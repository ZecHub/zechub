<a href="https://github.com/Zechub/zechub/edit/main/site/ZFAV_Club/Guides_for_Creators/Publish_Site_on_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# نشر موقع على IPFS

<a href="">
    <img src="/content-images/IPFS-40c2e22732.webp" alt="" width="800" height="400"/>
</a>



## مقدمة إلى IPFS

يُعدّ IPFS (InterPlanetary File System) بروتوكولًا وشبكة من نظير إلى نظير، صُمِّما لتوفير طريقة لامركزية (decentralized) لتخزين الملفات ومشاركتها.

وعلى عكس نموذج العميل والخادم التقليدي للإنترنت، يتيح IPFS للمستخدمين مشاركة الملفات مباشرةً فيما بينهم، بدلًا من الاعتماد على خادم مركزي لتخزين المحتوى وتوزيعه.

تُعنوَن الملفات في IPFS باستخدام *العنونة بالمحتوى*، أي أن كل ملف يُمنح تجزئة فريدة أو معرّف محتوى (CONTENT IDENTIFIER أو CID) استنادًا إلى محتواه، وتُستخدم هذه التجزئة لاسترجاع الملف من الشبكة.

يخزّن IPFS المحتوى على شكل كتل (blocks) تُعرَّف بواسطة معرّفات CID. وعند إضافة ملف، يُخزَّن على عقدتك (node)، لكنه لا يُنسخ تلقائيًا إلى العقد الأخرى. لذا أبقِ نسخة متاحة يمكن الوصول إليها على الإنترنت، أو رتّب تثبيتًا عن بُعد، حتى يتمكن القراء الآخرون من استرجاعها. راجع [استمرارية البيانات في IPFS](https://docs.ipfs.tech/concepts/persistence/).

**اقرأ: [مقدمة إلى IPFS](https://blog.infura.io/post/an-introduction-to-ipfs)**

## إنشاء موقعك

سننشئ في هذا المثال موقعًا إلكترونيًا بسيطًا.

[موقع تجريبي](https://squirrel.surf/)

**الخطوة 1:** إذا لم تكن على دراية بتصميم المواقع، فاكتب المحتوى الرئيسي لموقعك، بما في ذلك العنوان والنص الرئيسي، مع روابط إلى صفحات أو مواقع أخرى، والتذييلات.

**الخطوة 2:** استخدم [قالب HTML!](https://nicepage.com/html-templates) والصق النص الذي كتبته في المواضع المناسبة. ويمكنك اختياريًا إنشاء ورقة أنماط ‎.CSS لموقعك أيضًا.

**الخطوة 3:** ضع صفحتك الرئيسية في `index.html` في جذر مجلد الموقع. وأدرج معها صورها وملفات CSS، مستخدمًا مسارات نسبية مثل `style.css` حتى تعمل أيضًا ضمن عنوان URL لبوابة IPFS.

## إعداد عقدة

يتولى [IPFS Desktop](https://docs.ipfs.tech/install/ipfs-desktop/) إدارة العقدة نيابةً عنك. أبقِه قيد التشغيل أثناء مشاركة موقعك.

أما في [مسار سطر الأوامر](https://docs.ipfs.tech/how-to/command-line-quick-start/)، فهيّئ مستودعًا جديدًا مرة واحدة:

```sh
ipfs init
```

ثم شغّل العقدة واترك هذه الطرفية مفتوحة:

```sh
ipfs daemon
```

نفّذ الأوامر المتبقية في طرفية ثانية. ولا تشغّل خدمة daemon ثانية إذا كان IPFS Desktop يدير هذا المستودع بالفعل.

### **إضافة مجلد الموقع إلى IPFS**:

في IPFS Desktop، اختر المجلد الذي يحتوي على ملفات موقعك باستخدام خيار Add Folder.


<a href="">
    <img src="/content-images/ipfs-site-folder-2c96524d98.webp" alt="" width="400" height="200"/>
</a>

–

أما في مسار CLI، فنفّذ ما يلي من المجلد الأب لمجلد موقعك:

```sh
ipfs add -r folder_name
```

استبدل `folder_name` باسم مجلدك (ضع الأسماء التي تحتوي على مسافات بين علامتي اقتباس). واحفظ معرّف CID الموجود في سطر `added ... folder_name` الأخير، فهو يعرّف المجلد بأكمله، وليس `index.html` فقط.

### تثبيت الموقع على IPFS:

يقوم أمر `ipfs add` في CLI افتراضيًا بتثبيت المحتوى المستورد محليًا. تحقّق من تثبيت المجلد باستخدام:

```sh
ipfs pin ls YOUR_FOLDER_CID
```

استبدل `YOUR_FOLDER_CID` بمعرّف CID من الخطوة السابقة، ويجب أن تظهر في المخرجات عبارة `recursive`. يحمي التثبيت نسخة هذه العقدة من جمع البيانات المهملة، لكنه لا يُبقي حاسوبًا مطفأً متصلًا بالإنترنت. ولضمان التوفر أثناء انقطاع عقدتك عن الاتصال، رتّب [تثبيتًا عن بُعد](https://docs.ipfs.tech/how-to/work-with-pinning-services/) وتأكّد من أن الخدمة البعيدة قد أنهت التثبيت.

### الوصول إلى موقعك على IPFS:

تحقّق أولًا من موقعك عبر البوابة المحلية على `http://127.0.0.1:8080/ipfs/YOUR_FOLDER_CID/` (استخدم منفذ البوابة الذي تطبعه خدمة daemon لديك إن كان مختلفًا). تتيح الشرطة المائلة في النهاية تحليل الروابط النسبية داخل المجلد.

ويمكن لبوابة عامة مثل `https://ipfs.io/ipfs/YOUR_FOLDER_CID/` أن تقدّم موقعك بمجرد أن تتمكن من استرجاع المحتوى من عقدة يمكن الوصول إليها. ولا تُثبت المعاينة المحلية الناجحة أن الموقع متاح للعموم.

في حالتنا، معرّف CID هو QmW2UEfap1vrRRvS5H9wed8qmsx4WsvXBk3GPGVVfWx3r3

## IPNS

يتيح لك نظام التسمية بين الكواكب (Interplanetary Naming System، IPNS) تحديث معرّفات CID في IPFS المرتبطة بموقعك مع الاستمرار في تقديم رابط ثابت. ويُقدَّم هذا النظام على شكل مفتاح.


<a href="">
    <img src="/content-images/dns-query.a0134a75-9ef7817f80.webp" alt="" width="400" height="100"/>
</a>


في قائمة إعدادات مجلد موقعك في تطبيق IPFS لسطح المكتب، اختر Publish to IPNS.

<a href="">
    <img src="/content-images/IPNS-2fe62cc369.webp" alt="" width="400" height="200"/>
</a>


المفتاح: «k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n»

ويمكن استخدامه أيضًا لعرض موقعنا عبر بوابة: https://ipfs.io/ipns/k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n

## رابط DNS

لقد أُنشئ الموقع، والآن تحتاج إلى طريقة لتوجيه عنوان URL إلى المحتوى.

بالنسبة إلى `example.com`، أضف سجل DNS التالي، مع استبدال `YOUR_FOLDER_CID` بمعرّف CID الخاص بمجلدك:

| النوع | الاسم | القيمة |
|---|---|---|
| TXT | `_dnslink.example.com` | `dnslink=/ipfs/YOUR_FOLDER_CID` |

يُلحق بعض مزوّدي DNS اسم المنطقة تلقائيًا، فأدخل لديهم `_dnslink` فقط. وإذا كنت تستخدم اسم IPNS أعلاه، فيمكن أن تكون القيمة بدلًا من ذلك `dnslink=/ipns/YOUR_IPNS_NAME`. راجع [DNSLink](https://docs.ipfs.tech/concepts/dnslink/).


<a href="">
    <img src="/content-images/example-c2a9edb28b.webp" alt="" width="400" height="100"/>
</a>


بعد انتشار سجلات DNS، جرّب `https://ipfs.io/ipns/example.com/`. ويتطلب تقديم الموقع مباشرةً على `https://example.com/` أيضًا بوابة تدعم DNSLink وإعداد HTTPS، إذ إن سجل TXT وحده لا يتولى إعدادهما. اتّبع [دليل النطاق المخصص](https://docs.ipfs.tech/how-to/websites-on-ipfs/custom-domains/).

*تهانينا! أصبح لديك الآن موقع إلكتروني مقاوم للرقابة.*

____

**المصادر**

[توثيق IPFS](https://docs.ipfs.tech/)

[توثيق IPNS](https://docs.ipfs.tech/concepts/ipns/)

[توثيق رابط DNS](https://dnslink.io/#introduction)
