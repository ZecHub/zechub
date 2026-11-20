<a href="https://github.com/Zechub/zechub/edit/main/site/Zcash_Community/ZFAV_Club/Guides/Website_On_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# نشر موقع ويب على IPFS 

![](/content-images/IPFS-40c2e22732.webp)

## مقدمة إلى IPFS 

IPFS (InterPlanetary File System) هو بروتوكول وشبكة من نظير إلى نظير (peer-to-peer) صُمِّما لإنشاء طريقة لامركزية (decentralized) لتخزين الملفات ومشاركتها. 

على عكس نموذج العميل والخادم التقليدي للإنترنت، يتيح IPFS للمستخدمين مشاركة الملفات مباشرةً فيما بينهم، بدلاً من الاعتماد على خادم مركزي لتخزين المحتوى وتوزيعه. 

تُعنوَن الملفات في IPFS باستخدام *العنونة بالمحتوى* (content-addressing)، أي أن كل ملف يُمنح تجزئة (hash) فريدة أو مُعرِّف محتوى (CONTENT IDENTIFIER) (CID) بناءً على محتواه، وتُستخدم هذه التجزئة لاسترجاع الملف من الشبكة.

يخزّن IPFS المحتوى على شكل كتل (blocks) تُعرَّف بواسطة معرّفات CID. تؤدي إضافة ملف إلى تخزينه على عقدتك (node)؛ لكنها لا تنسخه تلقائياً إلى العقد الأخرى. أبقِ نسخة قابلة للوصول متصلة بالشبكة، أو رتّب التثبيت عن بُعد (remote pinning)، لكي يتمكن القرّاء الآخرون من استرجاعها. راجع [استمرارية IPFS](https://docs.ipfs.tech/concepts/persistence/).

اقرأ [مقدمة إلى IPFS](https://blog.infura.io/post/an-introduction-to-ipfs)



## إنشاء موقعك 

في هذا المثال، سننشئ موقع ويب بسيطاً. 

[موقع مثال](https://squirrel.surf)


**الخطوة 1:** إذا لم تكن على دراية بتصميم الويب، فاكتب المحتوى الرئيسي لموقعك بما في ذلك العنوان، والنص الرئيسي، مع روابط إلى صفحات/مواقع أخرى، والتذييلات.

**الخطوة 2:** استخدم [قالب HTML!](https://nicepage.com/html-templates) والصق النص الذي كتبته في المواضع المناسبة. يمكنك اختيارياً أيضاً إنشاء ورقة أنماط .CSS لموقعك. 

**الخطوة 3:** ضع صفحتك الرئيسية في `index.html` في جذر مجلد الموقع. أدرِج صورها وملفات CSS الخاصة بها، باستخدام مسارات نسبية مثل `style.css` حتى تعمل أيضاً ضمن عنوان URL لبوابة IPFS.



## إعداد عقدة

يتولى [IPFS Desktop](https://docs.ipfs.tech/install/ipfs-desktop/) إدارة العقدة نيابةً عنك. أبقِه قيد التشغيل أثناء مشاركة موقعك.

بالنسبة إلى [مسار سطر الأوامر](https://docs.ipfs.tech/how-to/command-line-quick-start/)، هيّئ مستودعاً جديداً مرة واحدة:

```sh
ipfs init
```

ثم شغّل العقدة واترك هذه الطرفية مفتوحة:

```sh
ipfs daemon
```

شغّل بقية الأوامر في طرفية ثانية. لا تشغّل خادماً خفياً (daemon) ثانياً إذا كان IPFS Desktop يدير هذا المستودع بالفعل.

**أضف مجلد الموقع إلى IPFS**: 

في IPFS Desktop، اختر المجلد الذي يحتوي على ملفات موقعك باستخدام خيار «Add Folder».

![](/content-images/ipfs-site-folder-2c96524d98.webp)

--

بالنسبة إلى مسار CLI، شغّل هذا الأمر من المجلد الأصلي لمجلد موقعك:

```sh
ipfs add -r folder_name
```

استبدل `folder_name` باسم مجلدك (ضع الأسماء التي تحتوي على مسافات بين علامتي اقتباس). احفظ معرّف CID الموجود في سطر `added ... folder_name` الأخير: فهو يعرّف المجلد بأكمله، وليس `index.html` فقط.


### تثبيت الموقع على IPFS:

يثبّت الأمر `ipfs add` في CLI المحتوى المستورد محلياً بشكل افتراضي. تحقّق من تثبيت المجلد باستخدام:

```sh
ipfs pin ls YOUR_FOLDER_CID
```

استبدل `YOUR_FOLDER_CID` بمعرّف CID من الخطوة السابقة؛ يجب أن يُظهر الناتج `recursive`. يحمي التثبيت (pinning) نسخة هذه العقدة من جمع البيانات المهملة (garbage collection)، لكنه لا يُبقي حاسوباً مطفأً متصلاً بالشبكة. لضمان التوفّر أثناء انقطاع عقدتك عن الشبكة، رتّب [التثبيت عن بُعد](https://docs.ipfs.tech/how-to/work-with-pinning-services/) وتأكّد من أن الخدمة البعيدة قد انتهت من التثبيت.

### الوصول إلى موقعك على IPFS: 

تحقّق أولاً من موقعك عبر البوابة المحلية على `http://127.0.0.1:8080/ipfs/YOUR_FOLDER_CID/` (استخدم منفذ البوابة الذي يطبعه الخادم الخفي إذا كان مختلفاً). تتيح الشرطة المائلة في النهاية حلّ الروابط النسبية داخل المجلد.

يمكن لبوابة عامة مثل `https://ipfs.io/ipfs/YOUR_FOLDER_CID/` تقديمه بمجرد أن تتمكن من استرجاع المحتوى من عقدة قابلة للوصول. لا تُثبت المعاينة المحلية الناجحة توفّره للعموم.

في حالتنا، معرّف CID = «QmW2UEfap1vrRRvS5H9wed8qmsx4WsvXBk3GPGVVfWx3r3»


## IPNS 

يتيح لك نظام التسمية بين الكواكب (Interplanetary Naming System) (IPNS) تحديث معرّفات CID الخاصة بـ IPFS المرتبطة بموقعك مع الاستمرار في تقديم رابط ثابت. يُقدَّم على شكل مفتاح. 

![](/content-images/dns-query.a0134a75-9ef7817f80.webp)

في قائمة الإعدادات الخاصة بمجلد موقعك في تطبيق IPFS لسطح المكتب، اختر «النشر على IPNS».  

![](/content-images/IPNS-2fe62cc369.webp)

المفتاح: «k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n»

يمكن استخدامه أيضاً لعرض موقعنا عبر بوابة: https://ipfs.io/ipns/k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n


## رابط DNS 
 
تم إنشاء الموقع، والآن نحتاج إلى طريقة لتوجيه عنوان URL إلى المحتوى. 

بالنسبة إلى `example.com`، أضف سجل DNS هذا، مع استبدال `YOUR_FOLDER_CID` بمعرّف CID الخاص بمجلدك:

| النوع | الاسم | القيمة |
|---|---|---|
| TXT | `_dnslink.example.com` | `dnslink=/ipfs/YOUR_FOLDER_CID` |

يُلحق بعض مزوّدي DNS المنطقة (zone) تلقائياً؛ أدخل `_dnslink` فقط هناك. إذا كنت تستخدم الاسم IPNS أعلاه، فيمكن أن تكون القيمة بدلاً من ذلك `dnslink=/ipns/YOUR_IPNS_NAME`. راجع [DNSLink](https://docs.ipfs.tech/concepts/dnslink/).

![](/content-images/example-c2a9edb28b.webp)

بعد انتشار DNS، جرّب `https://ipfs.io/ipns/example.com/`. يتطلب تقديم الموقع مباشرةً على `https://example.com/` أيضاً بوابة تدعم DNSLink وإعداد HTTPS؛ ولا يكفي سجل TXT وحده لإعدادهما. اتبع [دليل النطاق المخصص](https://docs.ipfs.tech/how-to/websites-on-ipfs/custom-domains/).

تهانينا! لقد أعددت موقع ويب مقاوماً للرقابة. 


**الموارد**

[توثيق IPFS](https://docs.ipfs.tech)

[توثيق IPNS](https://docs.ipfs.tech/concepts/ipns/)

[وثائق DNS link](https://dnslink.io/#introduction)
