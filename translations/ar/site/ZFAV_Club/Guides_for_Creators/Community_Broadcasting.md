<a href="https://github.com/Zechub/zechub/edit/main/site/ZFAV_Club/Guides_for_Creators/Community_Broadcasting.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# البث المجتمعي باستخدام VDO.Ninja وOBS Studio

أُعدّ هذا الدليل التعليمي القصير خلال [DWeb Camp 2023](https://dwebcamp.org/) على يد مجموعة من الزملاء والمتطوعين. ويهدف هذا التمرين إلى الاستفادة من الهواتف الذكية المتصلة بشبكة MESH غير متصلة بالإنترنت (offline MESH network) في التسجيل والبث المرئي التعاوني.

نستخدم برنامجين مفتوحي المصدر (open source) هما [OBS Studio (Open Broadcaster software)](https://obsproject.com/) و[VDO.Ninja](https://vdo.ninja/). ويمكنك تنزيل هذين البرنامجين وتشغيلهما محليًا على حاسوبك.

## OBS Studio (Open Boardcaster software)

OBS Studio برنامج حر ومفتوح المصدر للتسجيل والبث المباشر (live streaming)، ويتوفر لأنظمة تشغيل متعددة. صدر البرنامج لأول مرة عام 2012، ويحظى بقاعدة كبيرة من المتابعين في مجتمع بث الألعاب وبين صانعي المحتوى المرئي المستقلين.

قد تبدو واجهات المستخدم في OBS Studio مربكة بعض الشيء لمن يستخدمها لأول مرة. تنقسم واجهة OBS studio إلى نافذتين: «Preview» (المعاينة) و«Broadcast» (البث). تعرض نافذة المعاينة مقاطع الفيديو المتاحة (من كاميرات متنوعة مثل كاميرا الويب وIriun Webcam وOBS Virtual Camera ومصادر الفيديو والمتصفح) وتُسمّى «Scenes» (المشاهد)، بينما تعرض نافذة «Broadcast» البث المباشر.

لكي تبث من كاميرا بعيدة عبر VDO.ninja إلى OBS Studio، ابدأ بإضافة «Browser Source» (مصدر متصفح) جديد من خلال «Sources > Add > Browser». وفي النافذة الجديدة، يمكنك إدخال عنوان URL المصدر من VDO.Ninja واختيار «Make source visible».

يمكنك الآن بدء بث التدفقات البعيدة.

## VDO.Ninja

[VDO.Ninja](https://vdo.ninja/) تطبيق ويب حر ومفتوح المصدر يتيح لك تحويل أجهزتك المحمولة إلى كاميرا للبث المباشر. ويمكنك تنزيل البرنامج ونشره على حاسوبك المحلي، أو استخدام [النسخة المتاحة عبر الإنترنت على https://vdo.ninja](https://vdo.ninja/). مباشرةً

واجهة VOD.Ninja بسيطة؛ ما عليك سوى فتح VDO.Ninja في متصفح الويب على جهازك المحمول واختيار «Add your camera to OBS». بعد ذلك تختار الكاميرا وجهاز الصوت من قائمة الأجهزة وتنقر على «Start». ستحصل بعدها على رابط «view» يمكنك إضافته إلى OBS Studio.

## إدارة مكالمة مجتمعية باستخدام VDO.Ninja

ابدأ بالانتقال إلى [VDO.ninja](http://VDO.ninja) عبر متصفح الويب على حاسوب مكتبي أو محمول.

<a href="">
    <img src="/content-images/_unavailable.svg" alt="" width="300" height="400"/>
</a>


لإنشاء غرفة جديدة وإدارة البث المباشر لمكالمتك المجتمعية الخاصة، انقر على Create a Room.

ستطلب منك الشاشة التالية معلومات أساسية لإعداد غرفتك.

<a href="">
    <img src="/content-images/_unavailable.svg" alt="" width="400" height="400"/>
</a>

بعد إنشاء الغرفة، تتوفر للمُخرج (director) خيارات تحكم كثيرة في الشاشة التالية.

<a href="">
    <img src="/content-images/_unavailable.svg" alt="" width="400" height="400"/>
</a>


عندما ينضم الأشخاص إلى غرفتك، سترى أنت، بصفتك المُخرج، جميع خيارات المصادر وأدوات التحكم تظهر مع الفيديو والصوت الخاصين بهم.

<a href="">
    <img src="/content-images/_unavailable.svg" alt="" width="400" height="300"/>
</a>


## الأسئلة الشائعة

- ما أنواع بطاقات الرسوميات المطلوبة لـ OBS Studio؟

يمكنك استخدام حاسوب شخصي مزوّد ببطاقة رسوميات جيدة وذاكرة كبيرة، أو بدلًا من ذلك يمكنك استخدام مُرمِّزات عتادية (hardware encoders) مثل [Teradek VidiU](https://www.bhphotovideo.com/c/product/1609186-REG/teradek_10_0235_vidiu_x_modem.html?gclid=EAIaIQobChMIl4aIo7zX_wIVDhqtBh0PgwhxEAAYAiAAEgInufD_BwE)
- هل يتيح لك OBS الترجمة الفورية وإضافة الترجمة النصية المباشرة؟

توجد بعض الإضافات التي ساهم بها المجتمع ويبدو أنها توفر هذه الميزة. [https://github.com/eddieoz/OBS-live-translation](https://github.com/eddieoz/OBS-live-translation)

- هل يمكنك تطوير إضافاتك الخاصة لـ OBS Studio؟

نعم، يدعم OBS البرمجة النصية بلغتي lua وpython. وكذلك JavaScript للطبقات المتراكبة (Overlays) وعروض الويب (webviews).

- هل نستخدم التلاشي المباشر إلى الأسود أو الانتقالات؟

هذا يعود إليك، فأنت المنتج!

- هل يوجد تأخير عند البث؟

يعتمد ذلك في الغالب على الوجهة التي تبث إليها. على سبيل المثال، قد يكون لدى YouTube تأخير يبلغ دقيقة أو أكثر بسبب معالجة الفيديو التي تجري على خوادمها قبل البث.

- انقطاع الصوت عند استخدام OBS على جهاز بطيء وأثناء استخدام الشاشة الخضراء

استخدم مُرمِّزًا عتاديًا أو استخدم stream yard
[https://support.streamyard.com/hc/en-us/articles/360056350852-How-to-Use-OBS-Virtual-Camera-with-StreamYard](https://support.streamyard.com/hc/en-us/articles/360056350852-How-to-Use-OBS-Virtual-Camera-with-StreamYard) أو [RiverSide.FM](http://riverside.fm/)

## شكر وتقدير

- Ryan
- Ajay
- Arky

## مصادر

[https://obsproject.com/help](https://obsproject.com/help)

[https://docs.vdo.ninja/](https://docs.vdo.ninja/)

الساعات المكتبية: مجتمع الإعلام والفعاليات الرقمية
[https://alex4d.com/notes/item/media-and-digital-event-community](https://alex4d.com/notes/item/media-and-digital-event-community)
