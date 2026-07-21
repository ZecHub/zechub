<a href="https://github.com/Zechub/zechub/edit/main/site/ZFAV_Club/Guides_for_Creators/Community_Broadcasting.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="تحرير الصفحة"/>
</a>

# البث المجتمعي باستخدام VDO.Ninja و OBS Studio

أُنشئ هذا الدليل القصير خلال [DWeb Camp 2023](https://dwebcamp.org/) بواسطة مجموعة من الزملاء والمتطوعين. الهدف من هذا التمرين هو الاستفادة من استخدام أجهزة الهواتف الذكية المتصلة بشبكة MESH غير المتصلة بالإنترنت لتسجيل الفيديو والبث التعاوني.

نستخدم برنامجين مفتوحي المصدر هما [OBS Studio (Open Broadcaster software)](https://obsproject.com/) و[VDO.Ninja](https://vdo.ninja/). يمكن تنزيل هذين البرنامجين وتشغيلهما محليًا على جهاز الكمبيوتر الخاص بك.

## OBS Studio (برنامج Open Boardcaster)

OBS Studio هو برنامج مجاني ومفتوح المصدر للتسجيل والبث المباشر، ومتاح لأنظمة تشغيل متعددة. صدر البرنامج لأول مرة في عام 2012 ويتمتع بقاعدة جماهيرية كبيرة إلى حد ما بين مجتمع بث الألعاب ومنشئي محتوى الفيديو المستقلين.

قد تبدو واجهات مستخدم OBS Studio مربكة إلى حد كبير للمستخدمين لأول مرة. ينقسم OBS Studio إلى نافذتين: "Preview" و"Broadcast". تعرض نافذة المعاينة مقاطع الفيديو المتاحة (كاميرات متنوعة مثل webcam وIriun Webcam وOBS Virtual Camera ومصدر الفيديو ومصدر المتصفح) والتي تُسمى "Scenes"، بينما تعرض نافذة "Broadcast" البث المباشر.

من أجل البث من تدفق كاميرا بعيد من VDO.ninja إلى OBS Studio، ابدأ بإضافة "Browser Source" جديد عبر "Sources > Add > Browser". في النافذة الجديدة، يمكنك إدخال رابط المصدر من VDO.Ninja وتحديد "Make source visible".

يمكنك الآن بدء بث التدفقات البعيدة.

## VDO.Ninja

[VDO.Ninja](https://vdo.ninja/) هو تطبيق ويب مجاني ومفتوح المصدر يتيح لك تحويل أجهزتك المحمولة إلى كاميرا للبث المباشر. يمكن تنزيل البرنامج ونشره على جهاز الكمبيوتر المحلي الخاص بك، أو يمكنك استخدام [النسخة المتاحة على الإنترنت مباشرة عبر https://vdo.ninja](https://vdo.ninja/).

واجهة VOD.Ninja بسيطة؛ ما عليك سوى فتح VDO.Ninja في متصفح الويب على جهازك المحمول واختيار "Add your camera to OBS". بعد ذلك ستختار الكاميرا وجهاز الصوت من قائمة الأجهزة ثم تنقر على "Start". بعد ذلك ستحصل على رابط "view" يمكنك إضافته إلى OBS Studio.

## إخراج مكالمة مجتمعية باستخدام VDO.Ninja

ابدأ بالذهاب إلى [VDO.ninja](http://VDO.ninja) باستخدام متصفح الويب على جهاز مكتبي/محمول.

<a href="">
    <img src="https://images.spr.so/cdn-cgi/imagedelivery/j42No7y-dcokJuNgXeA0ig/8ded1b54-602b-4e66-af92-127990eff723/Screenshot_2023-08-23_162222/w=3840,quality=80" alt="" width="300" height="400"/>
</a>


لإنشاء غرفة جديدة وإخراج البث المباشر لمكالمتك المجتمعية، انقر على Create a Room.

ستطلب الشاشة التالية معلومات أساسية لإعداد غرفتك.

<a href="">
    <img src="https://images.spr.so/cdn-cgi/imagedelivery/j42No7y-dcokJuNgXeA0ig/ae698696-7b4d-458e-8de0-58a198c36e73/Screenshot_2023-08-23_183900/w=3840,quality=80" alt="" width="400" height="400"/>
</a>

بمجرد إنشاء الغرفة، سيكون لدى المخرج الكثير من خيارات التحكم المتاحة في الشاشة التالية.

<a href="">
    <img src="https://images.spr.so/cdn-cgi/imagedelivery/j42No7y-dcokJuNgXeA0ig/35b43544-5114-4e74-ac41-9e8993fe62ea/Screenshot_2023-08-23_184015/w=3840,quality=80" alt="" width="400" height="400"/>
</a>


عندما ينضم الأشخاص إلى غرفتك، سترى أنت، بصفتك المخرج، جميع خيارات المصادر وعناصر التحكم تظهر مع الفيديو والصوت الخاصين بهم.

<a href="">
    <img src="https://images.spr.so/cdn-cgi/imagedelivery/j42No7y-dcokJuNgXeA0ig/2247f187-b005-478e-9e5e-471cb8f070d3/Screenshot_2023-08-23_194136/w=3840,quality=80" alt="" width="400" height="300"/>
</a>


## الأسئلة الشائعة

- ما أنواع بطاقات الرسوميات المطلوبة لـ OBS Studio؟

يمكنك استخدام جهاز كمبيوتر شخصي مزود ببطاقة رسومات جيدة وذاكرة كبيرة، أو بدلاً من ذلك يمكنك استخدام أجهزة ترميز مادية مثل [Teradek VidiU](https://www.bhphotovideo.com/c/product/1609186-REG/teradek_10_0235_vidiu_x_modem.html?gclid=EAIaIQobChMIl4aIo7zX_wIVDhqtBh0PgwhxEAAYAiAAEgInufD_BwE)
- هل يتيح لك OBS إجراء الترجمة الحية وإضافة التسميات التوضيحية؟

توجد بعض الإضافات التي ساهم بها المجتمع ويبدو أنها توفر هذه الميزة. [https://github.com/eddieoz/OBS-live-translation](https://github.com/eddieoz/OBS-live-translation)

- هل يمكنك تطوير إضافاتك الخاصة لـ OBS Studio؟

نعم، يدعم OBS برمجة lua وpython النصية. كما يدعم JavaScript للتراكبات وواجهات العرض على الويب.

- هل نستخدم التلاشي المباشر إلى الأسود أو الانتقالات؟

هذا يعود إليك أنت، أيها المنتج!

- هل توجد فترة تأخير عند البث؟

يعتمد ذلك في الغالب على الوجهة التي تبث إليها. على سبيل المثال، قد يكون لدى YouTube تأخير يصل إلى دقيقة أو أكثر بسبب معالجة الفيديو التي تتم على خوادمه قبل بثه.

- ينقطع الصوت عند استخدام OBS على جهاز بطيء وأثناء استخدام الشاشة الخضراء

استخدم جهاز ترميز ماديًا أو استخدم stream yard
[https://support.streamyard.com/hc/en-us/articles/360056350852-How-to-Use-OBS-Virtual-Camera-with-StreamYard](https://support.streamyard.com/hc/en-us/articles/360056350852-How-to-Use-OBS-Virtual-Camera-with-StreamYard) أو [RiverSide.FM](http://riverside.fm/)

## الشكر والتقدير

- Ryan
- Ajay
- Arky

## الموارد

[https://obsproject.com/help](https://obsproject.com/help)

[https://docs.vdo.ninja/](https://docs.vdo.ninja/)

ساعات العمل المكتبية: مجتمع الإعلام والفعاليات الرقمية
[https://alex4d.com/notes/item/media-and-digital-event-community](https://alex4d.com/notes/item/media-and-digital-event-community)
