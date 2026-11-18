# هكذا تكلّم Zakura على Akash (Regtest)

شغّل حزمة **Thus Spoke Zakura v0.4.1** على Akash: Zakura Regtest وlightwalletd ولوحة التحكم / **HTTP API** للمحفظة. عملات الاختبار لا قيمة لها. لا ترسل ZEC الشبكة الرئيسية إلى هنا.

القالب: [awesome-akash/thus-spoke-zakura](https://github.com/akash-network/awesome-akash/tree/master/thus-spoke-zakura)

المصدر: [zcashlabs/thus-spoke-zakura](https://github.com/zcashlabs/thus-spoke-zakura) الوسم **v0.4.1**

### الصور

| الخدمة | الصورة |
| --- | --- |
| لوحة التحكم + API (`app`) | `ghcr.io/zcashlabs/thus-spoke-zakura-app:0.4.1` |
| lightwalletd | `ghcr.io/zcashlabs/thus-spoke-zakura-lightwalletd:0.4.1` |
| Zakura | `zakuracore/zakura:1.6.0` (مثبّت ضمن مشغّل الإصدار 0.4.1) |

### الإقلاع الذاتي

عند التشغيل لأول مرة، تنفّذ حاوية `app` الأمر `ths-server init` على وحدة التخزين الدائمة، ثم `ths-server serve`. وتعيد Serve المحاولة إلى أن تصبح JSON-RPC الخاصة بـ Zakura وlightwalletd قيد التشغيل. لا تشغّل `ths` على المزوّد؛ إذ إن SDL هي بيئة التشغيل.

### كيف تنشر Akash المنافذ

منافذ SDL `port` / `as` هي منافذ **الحاوية**. يستمع التطبيق على **8080** (`THS_LISTEN`)؛ ويستمع lightwalletd على **9067**؛ وتستمع RPC الخاصة بـ Zakura على **18232** وP2P على **18233**. تستخدم الخدمات هذه المنافذ بالفعل داخل عملية النشر (`http://zakura:18232`، `http://lightwalletd:9067`).

هذه **ليست** المنافذ على عنوان IP العام للمزوّد.

**الإعداد الافتراضي (هذا القالب):** لا يوجد عنوان IP مخصّص.

| الخدمة | منفذ الاستماع في الحاوية | SDL `as` | كيف يظهر ضمن عقد الإيجار |
| --- | --- | --- | --- |
| `app` (لوحة التحكم + HTTP API) | 8080 | 80 (HTTP) | اسم مضيف الدخول، غالبًا على 80/443 — **افتح هذا المعرّف URI في متصفح** |
| `lightwalletd` | 9067 | 9067 (TCP، عام) | `host:&lt;random-high-port&gt;` |
| RPC الخاصة بـ `zakura` | 18232 | 18232 (TCP، عام) | `host:&lt;random-high-port&gt;` |
| P2P الخاصة بـ `zakura` | 18233 | 18233 (TCP، عام) | `host:&lt;random-high-port&gt;` |

بعد أن يصبح عقد الإيجار جاهزًا، يكون **Leases → URIs** هو المصدر المعتمد. افتح URI **`app`** للوحة التحكم (واجهة المستخدم نفسها التي يفتحها `ths` محليًا). وجّه العملاء خفيفي الوزن إلى URI **lightwalletd** (`THS_LIGHTWALLETD_TLS=false`). لا تُدخل `:8080` أو `:80` أو `:9067` على عنوان IP للمزوّد ما لم يجعل عقد إيجار عنوان IP مخصّص هذه المنافذ متاحة للعامة.

**عناوين IP المخصّصة** (`endpoints` / `kind: ip`) خدمة إضافية مدفوعة، وهي غير مضمنة في هذا القالب. يمكنها تثبيت عنوان IP عام، وأحيانًا المنفذ `as`. اتركها معطّلة إلا إذا احتجت إليها.

### أي موقع تستخدم (المدفوعات)

SDL هي نفسها. تختلف واجهتا الويب في Akash من حيث **طريقة الدفع**.

| الموقع | المدفوعات | المحفظة |
| --- | --- | --- |
| [console.akash.network](https://console.akash.network) | الدفع التقليدي عبر الويب (البطاقة / قنوات الدفع بالعملات التقليدية التي يوفّرها Console) | حساب Console |
| [air.akash.network](https://air.akash.network) | مدفوعات سلسلة Akash الأصلية (AKT / ACT) | **Keplr** |

استخدم **Air** عندما تريد الدفع بـ Keplr على السلسلة. واستخدم **Console** عندما تريد طريقة دفع تقليدية عبر الويب.

### النشر

**المدفوعات عبر الويب (Console)**

[![Deploy on Akash Console](https://raw.githubusercontent.com/akash-network/console/refs/heads/main/apps/deploy-web/public/images/deploy-with-akash-btn.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-thus-spoke-zakura)

**مدفوعات Akash الأصلية باستخدام Keplr (Air)**

[افتح هذا القالب على Air](https://air.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-thus-spoke-zakura)

أنشئ عملية النشر من القالب، واقبل عرضًا، وانتظر إلى أن تُظهر سجلات `app` بقاء `ths-server serve` قيد التشغيل، ثم افتح URI **`app`** للوحة التحكم.

### مواضيع ذات صلة

- [Zakura على Akash](/guides/akash-network-zakura) — عقدة تحقق للشبكة الرئيسية/شبكة الاختبار
- [Zebra على Akash](/guides/akash-network-zebra)
- الكتاب: [github.com/zcashlabs/thus-spoke-zakura/tree/main/book](https://github.com/zcashlabs/thus-spoke-zakura/tree/main/book)
