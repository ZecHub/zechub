# بروتوكول التصديق ZAP1

ZAP1 هو بروتوكول تصديق مفتوح المصدر لـ Zcash. يكتب البروتوكول أحداث دورة الحياة بصيغة منظَّمة في شجرة Merkle مبنية على BLAKE2b، ويثبّت جذر الشجرة على السلسلة (on-chain) عبر المذكرات (memos) المحمية (shielded) الخاصة بـ Orchard. يمكن لأي شخص التحقق من الإثباتات (proofs). أما بيانات الأحداث فتبقى خاصة.

## كيف يعمل

يسجّل المشغّلون أنواعًا من الأحداث، مثل عمليات النشر والمدفوعات (payments) والتحويلات وغيرها، ويرسلونها إلى نسخة من ZAP1. ينتج كل حدث تجزئة ورقة (leaf hash) باستخدام BLAKE2b-256 مع فصل النطاقات. تتراكم الأوراق في شجرة Merkle. عند بلوغ حدّ معيّن، يُرمَّز جذر الشجرة في مذكرة من نوع ZAP1:09 ويُثبَّت على Zcash ضمن معاملة (transaction) محمية.

يستطيع أي شخص يملك تجزئة ورقة أن يتحقق من المسار الكامل، من الورقة إلى الجذر وصولًا إلى نقطة التثبيت على السلسلة، دون الحاجة إلى الثقة بالمشغّل.

## الخصائص الرئيسية

- **مستقل عن التطبيق**: يستطيع أي مشغّل لـ Zcash أن يحدد أنواع الأحداث الخاصة به وسلاسل التخصيص (personalization strings) الخاصة به
- **يحافظ على الخصوصية (privacy)**: تُحوَّل حمولات الأحداث إلى تجزئات قبل التثبيت. لا يُسجَّل على السلسلة إلا التجزئات.
- **قابل للتحقق بشكل مستقل**: لا يحتاج التحقق إلا إلى حزمة الإثبات وإمكانية الوصول إلى السلسلة (chain). لا يلزم الوثوق بالمشغّل.
- **متوافق مع ZIP 302**: يتجه ZAP1 نحو اعتماد partType من ZIP 302 لحمولة التصديق

## ما هو متوفر حاليًا

- تنفيذ مرجعي (Rust، بترخيص MIT)
- حزمة SDK للتحقق على crates.io (Rust + WASM بحجم 83KB)
- حزمة SDK لـ JavaScript على npm
- أداة عامة لفك ترميز المذكرات (تتعرّف على مذكرات ZAP1 وZIP 302 TVLV والمذكرات النصية والثنائية والفارغة)
- مجموعة أدوات للتحقق من المطابقة تضم 29 فحصًا للـ API و14 فحصًا للبروتوكول
- تصميم توقيع بعتبة 2-of-3 باستخدام FROST لبث التثبيتات بمشاركة عدة أطراف
- مسودة ZIP في طلب الدمج PR #1243 قيد المراجعة
- 4 تثبيتات على الشبكة الرئيسية تضم 14 ورقة حتى مارس 2026

## البنية

```
Your app  -->  ZAP1 API  -->  Merkle tree  -->  Zcash anchor
                  |                                    |
             event types                         shielded memo
          (DEPLOYMENT, etc)                    (ZAP1:09:{root})
```

يشغّل كل مشغّل نسخته الخاصة من ZAP1 بمفاتيحه الخاصة وشجرة Merkle الخاصة به وتثبيتاته الخاصة. لا توجد حالة مشتركة بين المشغّلين.

## لمعرفة المزيد

- الشيفرة المصدرية: [github.com/Frontier-Compute/zap1](https://github.com/Frontier-Compute/zap1)
- حزمة SDK للتحقق: [crates.io/crates/zap1-verify](https://crates.io/crates/zap1-verify)
- أداة فك ترميز المذكرات: [crates.io/crates/zcash-memo-decode](https://crates.io/crates/zcash-memo-decode)
- مواصفات البروتوكول: [ONCHAIN_PROTOCOL.md](https://github.com/Frontier-Compute/zap1/blob/main/ONCHAIN_PROTOCOL.md)
- مسودة ZIP: [PR #1243](https://github.com/zcash/zips/pull/1243)
- واجهة API المباشرة: [pay.frontiercompute.io/protocol/info](https://pay.frontiercompute.io/protocol/info)
- دليل المشغّل: [OPERATOR_GUIDE.md](https://github.com/Frontier-Compute/zap1/blob/main/OPERATOR_GUIDE.md)
