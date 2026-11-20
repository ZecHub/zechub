<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zcash_Stack.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="تحرير الصفحة"/>
</a>

# Zcash Stack: تشغيل خادم محفظة خفيفة على Kubernetes أو Docker

[Zcash Stack](https://github.com/zecrocks/zcash-stack) هي حزمة نشر مفتوحة المصدر من الفريق الذي يقف وراء zec.rocks. تجمع عقدة كاملة لـ Zcash، وخادم محفظة خفيفة، وإضافات اختيارية (Zaino، ومستكشف كتل، وخدمة مخفية Tor، وموزّع DNS، وzecd، وهو وسيط gRPC-web لمحافظ المتصفح) ضمن مخطط Helm لـ Kubernetes، وضمن ملفات Compose لـ Docker. تعمل جميع خوادم zec.rocks lightwalletd من هذا المخطط. يمول المشروعَ [Zcash Community Grants](https://zcashcommunitygrants.org/).

تلخّص هذه الصفحة ما تنشره الحزمة، وما تحتاج إليه قبل تثبيتها، وأهم الإعدادات. وهي تتناول إصدار المخطط **0.4.9** (الصادر في 13 نوفمبر 2026). يُرجى الرجوع إلى [ملف README الخاص بالمخطط](https://github.com/zecrocks/zcash-stack/blob/main/charts/zcash-stack/README.md) و[ملاحظات ورشة العمل](https://github.com/zecrocks/zcash-stack/tree/main/docs) الخاصة بالمشروع؛ اقرأهما قبل تشغيل أي شيء في بيئة الإنتاج.

## خلاصة سريعة

- **طريقتان للبدء.** مخطط Helm لـ Kubernetes (تُعد k3s على عتاد NVMe لديك الهدف الأساسي؛ كما يعمل GKE Standard وAutopilot) وملفات Compose لـ Docker لجهاز واحد. توصي ورشة العمل بـ Docker إذا كنت جديدًا على تشغيل الخوادم، وبـ Kubernetes إذا كنت تدير مجموعات خوادم بالفعل.
- **عقدة سلسلة واحدة وخادم محفظة خفيفة.** الإعداد الموصى به هو Zebra + lightwalletd. يمكن لـ Zakura أن يحل محل Zebra بوصفه الواجهة الخلفية، ويمكن لـ Zaino أن يحل محل lightwalletd أو أن يعمل إلى جانبه.
- **خطط لمساحة قرص تبلغ نحو 600 GiB.** بلغت حالة سلسلة Zebra نحو 260 GiB في يونيو 2026، وما زالت تنمو؛ وتضيف ذاكرة التخزين المؤقت للمحفظة الخفيفة نحو 17 GiB. تستغرق المزامنة الكاملة أيامًا، لذا يمكن للمخطط استعادة البيانات من لقطة منشورة بدلًا من ذلك.
- **يثبّت المخطط إصدارات الصور.** في الإصدار 0.4.9، هذه هي Zebra 7.0.0 (يتبع NU7)، وlightwalletd v0.6.1، وZakura 1.8.6، وZaino 0.8.0. حدّث المخطط قبل ترقيات الشبكة، وقبل بلوغ إصدار Zakura ارتفاع نهاية الدعم.
- **سجّل خادمك.** يمكن للمشغّلين العموميين إضافة خادمهم إلى مراقب [hosh.zec.rocks](https://hosh.zec.rocks/zec) كي تتمكن المحافظ والمستخدمون من معرفة ما إذا كان يعمل.

## ما الذي يتم نشره

كل مكوّن مفتاح تبديل في [`values.yaml`](https://github.com/zecrocks/zcash-stack/blob/main/charts/zcash-stack/values.yaml) الخاص بالمخطط. لا يكون مفعّلًا افتراضيًا إلا lightwalletd، وهو يحتاج إلى عقدة سلسلة؛ لذلك تفعّل ملفات الأمثلة Zebra أيضًا.

| المكوّن | الصورة في المخطط 0.4.9 | الافتراضي | وظيفته |
|:--|:--|:--|:--|
| Zebra | `zfnd/zebra:7.0.0` | متوقف (مفعّل في الأمثلة) | عقدة كاملة؛ تتحقق من السلسلة وتقدّم RPC لبقية المكونات |
| Zakura | `zakuracore/zakura:1.8.6` | متوقف | تفرّع Zebra؛ واجهة خلفية بديلة مباشرة لـ lightwalletd أو Zaino بدلًا من Zebra |
| lightwalletd | `electriccoinco/lightwalletd:v0.6.1` | مفعّل | خادم محفظة خفيفة (gRPC) لمحافظ الهواتف والأجهزة المكتبية |
| Zaino | `zingodevops/zaino:0.8.0-no-tls` | متوقف | مفهرس Rust يقدّم الخدمة للمحافظ الخفيفة أيضًا |
| مستكشف الكتل | `emersonian/zcash-explorer:v0.0.6` | متوقف | مستكشف ويب يقرأ JSON-RPC الخاص بالعقدة (لا يمكن لـ Zaino تشغيله من الخلفية، لأنه يقدّم gRPC فقط) |
| Tor | `osminogin/tor-simple:0.4.9.16` | متوقف | ينشر lightwalletd أو Zaino كخدمة `.onion` |
| موزّع DNS | `zfnd/dnsseeder:v1.8.0` | متوقف | يساعد العقد الجديدة على العثور على أقران |
| zecd | `ghcr.io/zecrocks/zecd:0.6.3` | متوقف | خادم محفظة يعطي الأولوية للمعاملات المحمية (راجع [zecd](/zcash-tech/zecd)) |
| وسيط gRPC-web | `envoyproxy/envoy:v1.40.2` | متوقف | يتيح لمحافظ المتصفح الاتصال بـ lightwalletd، إذ لا تستطيع المتصفحات الوصول إليه عبر gRPC الخام |
| محفظة WebZjs | `ghcr.io/zecrocks/webzjs-wallet` | متوقفة | محفظة متصفح؛ تحتاج إلى وسيط gRPC-web على المضيف نفسه |

ملاحظتان حول الإصدارات. إصدار Zaino upstream هو [0.10.1](https://github.com/zingolabs/zaino/releases)، بينما لا يزال المخطط يوفّر صورة الإصدار 0.8.0؛ لذا تحقّق من `values.yaml` قبل الاعتماد على سلوك Zaino الأحدث. وتتوقف عقد Zakura على Mainnet عند ارتفاع نهاية دعم خاص بكل إصدار: في 1.8.6، هذا هو الكتلة 3,643,309، أي نحو 5 ديسمبر 2026. كما ترفض إصدارات x86-64 منذ 1.8.0 البدء على وحدات المعالجة المركزية التي تفتقر إلى BMI2 وADX. وتغطي صفحة [Zakura Node](/zcash-tech/zakura-node) الأمرين.

## Kubernetes: قبل التثبيت

يُنشر المخطط بالاعتماد على ثلاثة أشياء تُعدّها مرة واحدة لكل مجموعة.

1. **متحكّم دخول.** ينشئ المخطط مورد Kubernetes `Ingress` قياسيًا، ويستخدم فئة `nginx` افتراضيًا؛ ويوصى بـ ingress-nginx لأنه يتعامل مع gRPC بالطريقة نفسها على k3s وGKE. على k3s، إما أن تثبّت k3s مع `--disable traefik`، أو تُبقي Traefik وتضبط `ingress.className: traefik` و`ingress.backendProtocol: GRPC` (وعندها يصدر المخطط مورد Traefik `IngressRoute`، لأن Ingress العادي عبر Traefik يعيد HTTP 500 عند استخدام gRPC). على GKE، لا تستطيع فئة الدخول المضمنة `gce` توجيه gRPC إلى lightwalletd أو Zaino.
2. **cert-manager وClusterIssuer** لإصدار شهادات Let's Encrypt تلقائيًا (`examples/cluster-issuer.yaml`؛ اختبر أولًا باستخدام جهة إصدار الاختبار). على GKE Autopilot، ثبّت cert-manager باستخدام `--set global.leaderElection.namespace=cert-manager`، وإلا سيفشل إنشاء جهة الإصدار بخطأ x509 «unknown authority». يمكنك تجاوز cert-manager وتوجيه `<service>.ingress.tls.secretName` إلى شهادتك الخاصة بدلًا من ذلك.
3. **StorageClass.** يناسب `local-path` k3s مع NVMe. على GKE، امنح Zebra فئة IOPS مجهزة مسبقًا (يتضمن المستودع مثالًا لـ Hyperdisk)، وارفع حصة الأقراص الإقليمية أولًا: لا تسمح مشاريع GKE الجديدة إلا بـ 500 GB من SSD و500 GB من Hyperdisk لكل منطقة، بينما تحتاج عقدة السلسلة إلى 300–500 GB؛ وإلا فسيظل القرص عالقًا في `Pending` مع `QUOTA_EXCEEDED`. لا يمكن تغيير `storageClassName` في StatefulSet موجود من دون إعادة إنشاء القرص.

بعد ذلك، وجّه سجل DNS لكل اسم مضيف إلى عنوان IP الخارجي لمتحكّم الدخول. إذا لم يكن لديك DNS بعد، فأدرج اسمًا من [sslip.io](https://sslip.io) مثل `203-0-113-7.sslip.io` بجانب اسم مضيفك الحقيقي؛ فهو يُحلّ إلى عنوان IP المضمّن، ما يتيح إصدار الشهادة فورًا. اجعل اسم مضيفك الخاص الاسم الأساسي للخوادم الدائمة.

## Kubernetes: التثبيت

```bash
helm repo add zcash https://zecrocks.github.io/zcash-stack
helm repo update
# copy an example from the repo's examples/ folder, set your hostnames and RPC credentials, then:
helm install zcash zcash/zcash-stack -f examples/zebra-mainnet.yaml
```

يُفعّل مثال [`zebra-mainnet.yaml`](https://github.com/zecrocks/zcash-stack/blob/main/examples/zebra-mainnet.yaml) Zebra، ويربط lightwalletd به، ويخصص لـ lightwalletd ذاكرة تخزين مؤقت بسعة 40 GiB ومدخل TLS، مع إبقاء RPC الخاص بالعقدة داخل المجموعة. غيّر اسم مستخدم RPC وكلمة مروره الوهميين قبل التثبيت. وتغطي أمثلة أخرى testnet، وGKE، وGKE Autopilot مع التوافر العالي، وخدمة مخفية Tor، وإعداد البدء باستخدام sslip.io.

للترقية، شغّل `helm repo update`، وعاين التغييرات باستخدام إضافة helm-diff (`helm diff upgrade zcash zcash/zcash-stack -f values.yaml`)، ثم `helm upgrade` مع الوسائط نفسها. إذا كنت تنتقل من مخطط 0.0.x، فاقرأ [MIGRATION.md](https://github.com/zecrocks/zcash-stack/blob/main/charts/zcash-stack/MIGRATION.md) أولًا: استبدل الإصدار 0.1.0 إعداد Traefik القديم بـ Ingress قياسي وcert-manager، كما غيّر ترتيب القيم.

## تقدير الموارد

| | التشغيل المستقر | المزامنة الأولية | القرص |
|:--|:--|:--|:--|
| Zebra | نحو 0.1 vCPU و1.6 GiB | تستهلك كثيرًا من CPU وIOPS والذاكرة | نحو 260 GiB (يونيو 2026) وما زالت تنمو؛ القيمة الافتراضية للمخطط 500 GiB |
| lightwalletd | نحو 0.15 vCPU و165 MiB | ينشئ ذاكرته المؤقتة، كتلةً تلو الأخرى | نحو 17 GiB؛ القيمة الافتراضية للمخطط 40 GiB |

يطلب المكدس بأكمله نحو 1.5 vCPU و4.5 GiB من الذاكرة. ويوصي المخطط لجهاز واحد بـ 8 vCPU و32 GiB من RAM ونحو 1 TB من NVMe (على GKE، استخدم `n2-standard-8` مع قرص Hyperdisk أو pd-ssd بسعة 500 GiB). وتفي الطلبات الافتراضية بالفعل بالحدود الدنيا لـ GKE Autopilot، فيما تُترك حدود CPU معطّلة للسماح بزيادة الموارد أثناء المزامنة.

## إعدادات جديرة بالمعرفة

**الاستعادة من لقطة.** اضبط `<chain>.initSnapshot.enabled: true` (باستخدام `initSnapshot.url` أو `gs://` أو `https://`) للبدء من لقطة منشورة بدلًا من المزامنة من التكوين الأولي. تسجّل الاستعادة مستوى تقدمها، وتعيد تنزيلًا منقطعًا بطريقة سليمة، ولا تمسح مطلقًا قرصًا سليمًا من تثبيت سابق. اللقطة اختصار للثقة: تظل الكتل التي تليها خاضعة للتحقق، وتظهر اللقطة السيئة على شكل كتل يفشل التحقق منها. تقدّر ورشة العمل المزامنة من البداية بنحو 10 أيام، والبدء من لقطة بنحو 10 ساعات.

**التوسّع وانعدام التوقف.** يعمل lightwalletd وZaino كذاكرتي تخزين مؤقت رقيقتين أمام العقدة؛ لذا شغّل `replicas: 2` لإجراء تحديثات متتابعة من دون توقف (تُضاف PodDisruptionBudget تلقائيًا عندما يزيد عدد النسخ المتماثلة على 1). عُقد السلسلة ليست مخصصة لموازنة الحمل: فكل نسخة متماثلة عقدة كاملة إضافية لها قرصها ومزامنتها، لذا شغّل عقدة واحدة، أو عقدتين لتحقيق التكرار.

**الأقران الواردون.** لا ينشئ Zebra افتراضيًا إلا اتصالات صادرة. يقبل `zebra.p2pPublic.enabled: true` الأقران الواردين على المنفذ 8233 (18233 على testnet) ويعلن عنوانك؛ اختر `externalAddrFrom: hostIP` على العتاد الفعلي وk3s، أو `nodeExternalIP` على السحابات التي يكون فيها عنوان IP الخاص بالعقدة خاصًا، أو `loadBalancer` مع عنوان IP ثابت محجوز على GKE Autopilot.

**TLS وgRPC.** ينتهي TLS عند مدخل الشبكة، ويعمل HTTP/2 غير المشفر داخل المجموعة، لذا يمكن توجيه عدة أسماء مضيفين إلى lightwalletd واحد. أبقِ `path: /` مع `pathType: Prefix`، لأن مسارات أساليب gRPC تحتاج إليه. إذا فشلت الشهادة الأولى بسبب إعادة التوجيه إلى HTTPS، فأصدرها عبر جهة إصدار الاختبار أو اضبط `ingress.tls.sslRedirect: "false"` مؤقتًا.

**الخدمة المخفية Tor.** مفيدة عندما لا يكون لمجموعتك عنوان IP أو نطاق عام:

```yaml
tor:
  enabled: true
  targetService: zaino   # or lightwalletd
  hiddenServicePort: 443
```

اقرأ العنوان باستخدام `kubectl exec -it tor-0 -- cat /var/lib/tor/hidden_service/hostname` واختبره عبر عميل Tor محلي باستخدام [zecping](https://github.com/zecrocks/zecping): `./zecping -socks localhost:9150 -addr <address>.onion:443`.

**حول ترقيات الشبكة.** قد يحظر Zebra الأقران الذين لا يزالون يستخدمون إصدارات قديمة ويتوقف عن التقدم، مع تسجيل رسالة تفيد بتعطل تحديثات السلسلة. وتُحفظ قائمة الحظر في الذاكرة، لذا يمحوها `kubectl delete pod zebra-0`؛ ثم تعود الحاوية إلى العمل باستخدام بيانات السلسلة نفسها ومن دون إعادة المزامنة.

## Docker Compose

لجهاز واحد، استنسخ المستودع وابدأ باستخدام الملف الافتراضي من المجلد `docker/`:

```bash
git clone https://github.com/zecrocks/zcash-stack.git
cd zcash-stack/docker
docker compose up --detach
docker compose logs --follow
```

يشغّل `compose.yaml` كلًا من Zebra وlightwalletd و[Watchtower](https://containrrr.dev/watchtower/) على x86؛ ويؤدي `compose.arm.yaml` المهمة نفسها على مضيفات ARM. يجلب Watchtower الصور الجديدة تلقائيًا، ويستخدم الملف الافتراضي وسم `zfnd/zebra:latest`، لذا تتبع العقدة إصدارات Zebra الجديدة من دون ترقيات يدوية. يستبدل `compose.zaino.yaml` lightwalletd بـ Zaino، لكنه يثبّت صورة مجتمع قديمة (`emersonian/zcash-zaino:0.1.2-zr4`)، لذا تحقّق منها قبل استخدامها. وتضيف ملفات أخرى واجهة Caddy أمامية لـ TLS، ووسيط VPS، ونفق autossh للعقد الموجودة في المنزل.

اضبط `LIGHTWALLETD_DONATION_ADDRESS` في ملف `.env` على عنوانك الموحّد الخاص لنشره عنوانًا للتبرعات الخاصة بالخادم. يؤدي تشغيل `./download-snapshot.sh` من المجلد `docker/` قبل أول `docker compose up` إلى تنزيل لقطة للسلسلة بدلًا من المزامنة من البداية.

## الاتصال والمراقبة

تشرح الحصة الثانية من ورشة العمل طرق إتاحة الخادم: عنوان IP ثابت عام، أو إخفاء عنوان IP المنزلي خلف نفق SSH إلى VPS أو Tailscale Funnel، أو خادم خاص بـ Tor. اختبر النتيجة بتوجيه محفظة إليه (في ZODL، ضمن الإعدادات المتقدمة؛ راجع [تغيير الخادم في محفظتك](/zcash-tech/lightwallet-nodes)) أو باستدعاء `GetLightdInfo` باستخدام عميل gRPC.

أما للمراقبة، فتسرد الحصة الثالثة أوامر Docker اليدوية وتقترح تسجيل خادم عام لدى [hosh](https://hosh.zec.rocks/zec)، وهو مراقب zec.rocks لوقت التشغيل. يجري التسجيل عبر طلب سحب يضيف اسم مضيفك ومنفذك إلى قائمة خوادم hosh. تتوفر المساعدة في أي خطوة عبر [zec.rocks منتدى ورش العمل](https://workshops.zec.rocks).

## أخطاء شائعة

**تثبيت lightwalletd من دون عقدة سلسلة.** يقرأ lightwalletd البيانات من Zebra (أو Zakura). فعّل إحداهما، أو ابدأ بملف مثال يفعل ذلك.

**الإبقاء على بيانات اعتماد RPC الوهمية في المثال.** تتضمن الأمثلة بيانات مؤقتة. يبقى RPC داخل المجموعة، لكن غيّرها على أي حال.

**تشغيل عقدة سلسلة باستخدام حصة الأقراص الافتراضية في GKE.** لن يرتبط القرص مطلقًا. ارفع الحصة الإقليمية قبل التثبيت.

**زيادة Zebra لموازنة الحمل.** كل نسخة متماثلة من Zebra تنفذ مزامنة كاملة إضافية. وسّع lightwalletd أو Zaino بدلًا من ذلك.

**الإبقاء على مخطط قديم خلال ترقية الشبكة.** تتوقف العقدة التي سبقت الترقية عن متابعة Mainnet بعدها (يحتاج Zebra إلى الإصدار 7.0.0 أو أحدث منذ NU7). شغّل `helm repo update` ورقِّ المخطط قبل ارتفاعات التفعيل وارتفاعات نهاية دعم Zakura.

## صفحات ذات صلة

- [Zcash عُقد Lightwallet](/zcash-tech/lightwallet-nodes): ما الذي يستطيع خادم المحفظة الخفيفة رؤيته وما الذي لا يستطيع، والخوادم العامة.
- [Zebra عقدة كاملة](/zcash-tech/zebra-full-node): أداة التحقق التي يشغّلها هذا المكدس.
- [Zakura عقدة](/zcash-tech/zakura-node): تفرّع Zebra الذي يمكن للمخطط تشغيله بدلًا منها.
- [Zaino](/zcash-tech/zaino): مفهرس Rust.
- [zecd](/zcash-tech/zecd): خادم المحفظة الذي يمكن للمخطط إضافته.
- [Zcash RPC العقدة والفهرسة](/guides/zcash-node-rpc-and-indexing): RPC الخاص بـ Zebra وZallet والمفهرسات.
- [كيفية تشغيل Zebra على شبكة Akash](/guides/akash-network-zebra): طريقة أخرى لاستضافة عقدة.

## الموارد

- [zecrocks/zcash-stack](https://github.com/zecrocks/zcash-stack) (المستودع والإصدارات والأمثلة)
- [Zcash Stack ملف README لمخطط Helm](https://github.com/zecrocks/zcash-stack/blob/main/charts/zcash-stack/README.md)
- [ملاحظات ورشة العمل: المزامنة، والاتصال، والمراقبة](https://github.com/zecrocks/zcash-stack/tree/main/docs)
- [Docker ملف README](https://github.com/zecrocks/zcash-stack/blob/main/docker/README.md)
- [قائمة Artifact Hub](https://artifacthub.io/packages/search?repo=zcash)
- [hosh.zec.rocks](https://hosh.zec.rocks/zec) (مراقب الخوادم العامة)

**آخر تحديث:** نوفمبر 2026 (المخطط 0.4.9)
