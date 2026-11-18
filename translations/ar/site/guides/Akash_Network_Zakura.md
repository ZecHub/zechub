# كيفية تشغيل Zakura على شبكة Akash

خطوات إعداد عقدة كاملة **Zakura** Zcash باستخدام القالب [awesome-akash zcash-zakura](https://github.com/akash-network/awesome-akash/tree/master/zcash-zakura).

Zakura هي عقدة Zcash متوافقة مع الإجماع (متفرعة من Zebra)، وتتميز بمزامنة أسرع، وتقليص أصلي للبيانات، وتهيئة من لقطة. يثبت هذا القالب الإصدار **`zakuracore/zakura:1.8.1`** (مثبّت ببصمة؛ لا تستخدم `:latest` أو `1.1.1`).

### ما الذي ستحصل عليه

- شبكة P2P الرئيسية: الحاوية **8233**، منشورة عالميًا (راجع تعيين المنافذ أدناه)
- حالة دائمة بعد تقليصها (64 GiB افتراضيًا) مع التهيئة من لقطة Valar عند التشغيل الأول
- Prometheus **9999** وفحص السلامة **8080** (داخليان، بلا عنوان URI عام)
- JSON-RPC **8232** داخلي لـ **lightwalletd** الموجود في الموقع نفسه؛ يستمع LWD على الحاوية **9067** وهو منشور عالميًا

أعلام الميزات في SDL (صواب/خطأ): `ENABLE_METRICS`، `ENABLE_HEALTH`، `ENABLE_RPC`، `ENABLE_LIGHTWALLETD`. تكون مصادقة ملفات تعريف الارتباط معطّلة عند تفعيل lightwalletd، لأن lightwalletd لا يستطيع قراءة ملفات تعريف الارتباط.

### الموقع المناسب للاستخدام (المدفوعات)

ملف SDL واحد في الموقعين. تختلف واجهتا الويب الخاصتان بـ Akash في **طريقة الدفع**.

| الموقع | المدفوعات | المحفظة |
| --- | --- | --- |
| [console.akash.network](https://console.akash.network) | الدفع التقليدي عبر الويب (البطاقة / قنوات الدفع بالعملة التقليدية التي يوفرها Console) | حساب Console |
| [air.akash.network](https://air.akash.network) | مدفوعات أصلية على سلسلة Akash (AKT / ACT) | **Keplr** |

استخدم **Air** إذا أردت الدفع باستخدام Keplr على السلسلة. واستخدم **Console** إذا أردت إجراء الدفع التقليدي عبر الويب. لا تتوقع التسوية الأصلية لـ Keplr على Console.

### النشر

**الدفع عبر الويب (Console)**

[![Deploy on Akash Console](https://raw.githubusercontent.com/akash-network/console/refs/heads/main/apps/deploy-web/public/images/deploy-with-akash-btn.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zakura)

**المدفوعات الأصلية بـ Akash باستخدام Keplr (Air)**

[افتح هذا القالب على Air](https://air.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zakura)

1. افتح الرابط المطابق أعلاه (Console أو Air).
2. على Air، صِل **Keplr** وتأكد من امتلاكك AKT/ACT للإيداع واستئجار الخدمة. وعلى Console، أكمل الدفع عبر الويب الذي تعرضه الواجهة.
3. حمّل `zcash-zakura/deploy.yaml` إذا لم يكن مملوءًا بالفعل.
4. أودع الأموال، واقبل عرضًا، وانتظر بدء عقد الإيجار.
5. يجب أن تعرض السجلات تنزيل اللقطة (عند التشغيل الأول)، ثم `zakurad start`.
6. افتح **Leases → URIs**. استخدم المضيف والمنفذ اللذين خصصهما المزوّد، وليس 8233 أو 9067 على عنوان IP العام.

### كيف تنشر Akash المنافذ

منافذ SDL `port` / `as` (8233 و9067 و8232) هي منافذ **الحاوية**. تظل Zakura تستمع على 8233؛ وlightwalletd على 9067؛ وRPC على 8232 للـ sidecar الخاص بـ LWD (`zakura:8232`).

هذه **ليست** المنافذ على عنوان IP العام للمزوّد.

**الإعداد الافتراضي (هذا القالب):** لا يوجد عنوان IP مخصص. يُربط كل منفذ TCP مكشوف من `global: true` بمنفذ عشوائي مرتفع على مضيف مشترك لدى المزوّد. تعرض Console/Air هذه المنافذ كعناوين URI لعقد الإيجار، مثل:

```
zakura-8233: provider.example:31482
lightwalletd-9067: provider.example:32011
```

تتصل الأقران بعنوان URI الخاص بالمنفذ **8233** (`provider.example:31482`). وتستخدم المحافظ الخفيفة عنوان URI الخاص بالمنفذ **9067** (مع تعطيل TLS، ما لم تُنهِ اتصال TLS بنفسك). اضبط `ZAKURA_NETWORK__EXTERNAL_ADDR` على عنوان URI الخاص بمنفذ P2P المعين، لا على `:8233`.

تظل المنافذ **الداخلية** المكشوفة (RPC الخاص بـ `8232`، ومقاييس `9999`، وفحص سلامة `8080`) ضمن شبكة النشر. ولا يتوفر لها عنوان URI عام.

**عناوين IP المخصصة** (`endpoints` / `kind: ip`) خيار إضافي مدفوع، وهي غير مشمولة في هذا القالب. يمكنها تثبيت عنوان IP عام، وأحيانًا المنفذ `as`. أضفها فقط إذا كنت بحاجة إلى `host:8233` ثابت.

### أرشيفية أم بعد التقليم

الإعداد الافتراضي هو **بعد التقليم** (لقطة بحجم 11 GiB تقريبًا، وقرص بسعة 64 GiB). للاحتفاظ بسجل كامل، اضبط `SNAPSHOT_KIND=archive`، وزِد سعة القرص إلى 350 GiB أو أكثر، واضبط `ZAKURA_STATE__STORAGE_MODE=archive`.

### مواضيع ذات صلة

- [Zebra على Akash](/guides/akash-network-zebra) — Zcash Foundation `zebrad` (سجل كامل، بلا لقطة)
- [Thus Spoke Zakura على Akash](/guides/thus-spoke-zakura-akash) — لوحة تحكم Regtest وتطبيق (v0.4.1)
- Zakura المصدر: [github.com/zakura-core/zakura](https://github.com/zakura-core/zakura)
- اللقطات: [zakura.com/snapshots/](https://zakura.com/snapshots/)
