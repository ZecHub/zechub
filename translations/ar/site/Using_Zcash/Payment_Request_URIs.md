<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Payment_Request_URIs.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="تحرير الصفحة"/>
</a>

# معرّفات URI لطلب الدفع في Zcash

## نظرة عامة على رموز QR الديناميكية

URI اختصار لـ Universal Resource Identifier. وهي رموز QR تعمل على تعبئة معلومات المعاملة مسبقًا داخل محفظة Zcash. يمكن للمحافظ التي تتعرّف على هذا التنسيق إنشاء المعاملات إما بالنقر على الروابط في صفحات الويب أو عبر مسح رموز QR. لنفترض أن لديك متجر قهوة عبر الإنترنت، فيمكن لعملائك إجراء عمليات الشراء من خلال مسح رموز QR هذه باستخدام محفظة Zcash الخاصة بهم مع سعر ورقم طلب مُعبّأين مسبقًا.

## حالات استخدام طلبات الدفع 


- التسوق عبر الإنترنت.                    يبدأ العملاء طلبات الدفع عند إتمام عمليات الشراء عبر الإنترنت.
- حجوزات الفنادق وأماكن الإقامة.   تستفيد منصات الحجز المختلفة من روابط طلب الدفع لإجراء حجوزات الفنادق.
- سداد الفواتير عبر الإنترنت.               تستخدم شركات المرافق روابط طلب الدفع لتمكين العملاء من تسوية فواتيرهم بسلاسة. 
- شراء تذاكر الفعاليات.             يستخدم منظمو الفعاليات عبر الحدود هذه الآلية لتسهيل شراء التذاكر.
- مدفوعات P2P.                       يمكن للأفراد بسهولة إرسال طلبات دفع إلى العائلة والأصدقاء عبر تطبيقات المراسلة، مع تضمين روابط الدفع داخل الرسائل.


## التفاصيل

يحدّد [ZIP 321](https://zips.z.cash/zip-0321) كيفية إنشاء URI دفع مخصّص خاص بك. 

كيفية إنشاء طلبات دفع باستخدام Zcash: 

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/l5auYQIzYsQ"
    title="كيفية إنشاء طلبات دفع باستخدام Zcash"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

    
### مثال برمجي

إضافة أداة تبرع Zcash إلى موقعك الإلكتروني: 

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/NbP4BcHC0uM"
    title="إضافة أداة تبرع Zcash إلى موقعك الإلكتروني"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
