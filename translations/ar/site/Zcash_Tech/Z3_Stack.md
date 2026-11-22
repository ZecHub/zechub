<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Z3_Stack.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Z3 Stack

إن **Z3 Stack** هو منصة العقد المجمّعة الخاصة بـ Zcash Foundation: **Zebra** (عقدة كاملة) + **Zallet** (محفظة لعقدة كاملة)، مع مفهرس **Zaino** اختياري. وهو البديل المقصود لعملية `zcashd` مستقلة، التي جمعت التوافق والمحفظة في ملف ثنائي واحد وانتهى عمرها التشغيلي في 18 يوليو 2026.

التنفيذ المرجعي هو مشروع Docker Compose الموجود في [github.com/ZcashFoundation/z3](https://github.com/ZcashFoundation/z3).

> **الحالة، 14 نوفمبر 2026: تسبق الإصدارات الافتراضية NU7.** كان آخر تعديل على `docker-compose.yml` الخاص بـ Z3 في 10 أغسطس 2026. وما زال يثبّت `zfnd/zebra:6.2.3` و`zodlinc/zallet:v0.1.0-beta.1`، وقد بدأ بوصفه الملف التنفيذي `zallet-zaino`. فُعِّل [NU7](NU7.md) على Mainnet عند الكتلة 3,543,405 في 6 نوفمبر 2026، ولا يتبعه إلا Zebra 7.0.0 أو إصدار أحدث: إذ يبقى إصدار 6.x من Zebra على القواعد القديمة وينفصل عن السلسلة الحقيقية. لم يعد الإصدار Zallet v0.1.0-beta.4، وهو أول إصدار يتبع NU7، يتضمن `zallet-zaino` إطلاقًا. تحقّق من المستودع بحثًا عن إصدارات أحدث قبل النشر. إذا استبدلت الصور بنفسك، فلاحظ أن الواجهة الخلفية المتبقية من Zallet، وهي `zebra`، تقرأ دليل الحالة الخاص بـ Zebra مباشرةً، لذا يجب تشغيل Zallet على المضيف نفسه مع إمكانية الوصول إلى ذلك الدليل ([Zallet](Zallet.md)).

---

## الخلاصة

* Z3 **ليس عميل إجماع جديدًا**. بل هو طريقة لتشغيل المكوّنات بعد `zcashd` معًا: تتحقق Zebra من السلسلة، وتحتفظ Zallet بالمفاتيح وتوفّر واجهة RPC للمحفظة، وتتحدث Zaino (اختياريًا) ببروتوكول gRPC الخاص بـ lightwalletd.
* `zcashd` عقدة ومحفظة مضمّنتان. يفصل Z3 **هذين الدورين**. تنتقل منصات التداول ومجمّعات التعدين وغيرها من الجهات التي تشغّل محافظ العقد الكاملة إلى هذا التكوين بدلًا من الانتقال إلى Zebra وحده.
* يمكن تشغيل ثلاثة مشاريع Compose معزولة على مضيف واحد: **الشبكة الرئيسية**، و**شبكة الاختبار**، و**شبكة الاختبار التنظيمية**.
* تستغرق المزامنة الأولى للشبكة الرئيسية نحو **24–72 ساعة** وتحتاج إلى قرابة **300 GB**. تبدأ شبكة الاختبار التنظيمية خلال ثوانٍ، وهي المكان المناسب لتعلّم مكوّنات النظام.
* في صورة Z3 المثبّتة، تستخدم Zallet الواجهة الخلفية `zallet-zaino` (مكتبات الفهرسة التابعة لـ Zaino) وتتواصل مع Zebra عبر JSON-RPC. أزالت Zallet تلك الواجهة الخلفية في الإصدار v0.1.0-beta.4؛ وتقرأ Zallet الحالية حالة Zebra مباشرةً. ولا تحتاج إلى خدمة Zaino المستقلة إلا إذا أردت نقطة نهاية متوافقة مع lightwalletd للمحافظ الخارجية.
* Zallet في **مرحلة تجريبية**. قد تستلزم التغييرات غير المتوافقة حذف المحفظة وإعادة إنشائها. لا تتعامل معها كبرنامج حفظ أصول جاهز للمبالغ الكبيرة.

---

## لماذا يوجد Z3

خلال معظم عمر Zcash، كانت `zcashd` هي العقدة الكاملة المرجعية ومحفظة العقد الكاملة الإنتاجية الوحيدة في آن واحد. وكان هذا التصميم هو ما تكاملت معه البورصات والمجمعات وأمناء الحفظ.

تم إيقاف `zcashd`. انتقل التوافق إلى [Zebra](/zcash-tech/zebra-full-node) (والآن أيضًا إلى [Zakura](/zcash-tech/zakura-node)). وانتقلت المحفظة المضمّنة إلى [Zallet](https://github.com/zcash/zallet). وتنتقل خدمة المحافظ الخفيفة من [lightwalletd](/zcash-tech/lightwallet-nodes) إلى [Zaino](/zcash-tech/zaino).

هذه الأجزاء الثلاثة مستودعات منفصلة، ودورات إصدار منفصلة، وإعدادات منفصلة. Z3 هو الصمغ الذي يربطها: صور مثبّتة الإصدارات، وفحوصات سلامة تُبقي المحفظة متوقفة حتى تتزامن العقدة، ومنافذ ووحدات تخزين لكل شبكة، ومسار موثّق للمشغّل.

الاسم اختصار غير رسمي في النظام البيئي — Zebra، Zaino، Zallet — رغم أن ملف Compose الافتراضي لا يشغّل إلا Zebra وZallet. إن Zaino هو ملف تعريف Compose وليس عملية ثالثة مطلوبة.

---

## البنية

```
                    ┌──────────────────────── Z3 (per network) ────────────────────────┐
                    │                                                                  │
  peers ◄──P2P──►  Zebra (zebrad)  ──JSON-RPC──►  Zallet                                │
                    │   full node                    │  embeds Zaino libraries          │
                    │                                │  wallet RPC for operators        │
                    │                                └─────────────────────────────────┤
                    │                                                                  │
                    │   Zaino (optional, --profile indexer)                            │
                    │     lightwalletd-compatible gRPC + JSON-RPC proxy                │
                    │            │                                                     │
                    └────────────┼─────────────────────────────────────────────────────┘
                                 ▼
                        light wallets / explorers
```

| المكوّن | دوره في Z3 | مطلوب؟ |
| --- | --- | --- |
| **Zebra** | يزامن السلسلة ويتحقق منها، ويوفّر gossip وJSON-RPC ونقطة نهاية للصحة | نعم |
| **Zallet** | محفظة عقدة كاملة. صورة beta.1 المثبّتة تشغّل الواجهة الخلفية لمكتبة Zaino (`zallet-zaino`، أُزيلت في beta.4 من Zallet) وتتصل مباشرةً بـ JSON-RPC الخاص بـ Zebra. **لا** تستدعي حاوية Zaino المستقلة | نعم |
| **Zaino** | مفهرس مستقل. خدمة gRPC متوافقة مع lightwalletd للعملاء الخفيفين الخارجيين، بالإضافة إلى وكيل JSON-RPC للمستكشفات والصنابير | لا — `--profile indexer` |

يثبّت Z3 إصدارات الصور في `docker-compose.yml`. تجاوزها باستخدام `Z3_ZEBRA_IMAGE` أو `Z3_ZAINO_IMAGE` أو `Z3_ZALLET_IMAGE` إذا احتجت إلى وسم مختلف.

---

## كيف يختلف هذا عن zcashd

| | zcashd | Z3 |
| --- | --- | --- |
| اللغة | C++ (تفرع من Bitcoin) | خدمات Rust، منظّمة باستخدام Docker Compose |
| نموذج العملية | ملف ثنائي واحد: عقدة + محفظة | حاويات منفصلة للعقدة والمحفظة |
| التوافق | متوقّف (انتهى عمره التشغيلي في 18 يوليو 2026) | Zebra (أو عقدة متوافقة أخرى) |
| المحفظة | `wallet.dat` مضمّنة | Zallet، ودليل بيانات مشفّر بـage |
| العملاء الخفيفون | عادةً lightwalletd منفصلة | ملف تعريف Zaino اختياري |
| الإعدادات | `zcash.conf` | ملفات لكل شبكة ضمن `config/<network>/` بالإضافة إلى ملفات بيئة Compose |
| الشبكات على مضيف واحد | تعارضات منافذ مرهقة | دعم أساسي: `z3-mainnet`، `z3-testnet`، `z3-regtest` |

إذا كانت لا تزال لديك محفظة `zcashd`، فاستخدم دليل الترحيل الخاص بـ ZecHub، [migration guide](/guides/migration-guide-zcashd-to-zebrad-zallet)، وأمر `migrate-zcashd-wallet` الخاص بـ Zallet بدلًا من نسخ `wallet.dat` إلى وحدة تخزين Z3.

---

## الشبكات

Z3 عبارة عن ثلاثة مشاريع Compose مستقلة. ولا تتشارك المنافذ أو وحدات التخزين.

| الشبكة | اسم المشروع | الاستخدام | المزامنة الأولى | أموال حقيقية |
| --- | --- | --- | --- | --- |
| **mainnet** | `z3-mainnet` | الإنتاج | 24–72 ساعة | نعم |
| **testnet** | `z3-testnet` | مرحلة الاختبار على شبكة الاختبار العامة | 2–12 ساعة | لا (اختبار ZEC) |
| **regtest** | `z3-regtest` | تدريب محلي: كتل فورية، بلا أقران | ثوانٍ | لا |

ينبغي للمشغلين الجدد البدء بـ**regtest**، والتأكد من تدفقات RPC والمحفظة، ثم الانتقال إلى testnet أو mainnet.

---

## منافذ المضيف الافتراضية

صُممت الشبكات الثلاث لتتعايش على جهاز واحد. القيم أدناه هي القيم الافتراضية المنشورة؛ ويمكن تجاوز كل منها عبر متغير البيئة `Z3_*` المطابق. والمصفوفة القياسية هي [`z3-contract.yaml`](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml).

| الخدمة | Mainnet | Testnet | Regtest |
| --- | --- | --- | --- |
| JSON-RPC الخاص بـ Zebra | 8232 | 18232 | 29232 |
| P2P الخاص بـ Zebra | 8233 | 18233 | (غير منشور) |
| سلامة Zebra (`/ready`) | 8080 | 18080 | 28080 |
| gRPC الخاص بـ Zaino (ملف تعريف المفهرس) | 8137 | 18137 | 28137 |
| JSON-RPC الخاص بـ Zaino (ملف تعريف المفهرس) | 8237 | 18237 | 28237 |
| RPC الخاص بـ Zallet | 28232 | 40232 | 50232 |

داخل شبكة Compose، تُحلّ الخدمات بالاسم (`zebra`، `zaino`، `zallet`).

---

## البيانات والنسخ الاحتياطية

| وحدة التخزين | ما تحتويه | نسخ احتياطي؟ |
| --- | --- | --- |
| `z3-<network>-chain` | حالة سلسلة Zebra (~300 GB لـmainnet) | اختياري — قابلة لإعادة المزامنة |
| `z3-<network>-zallet` | قاعدة بيانات المحفظة المشفرة **و**هوية age التي تفتحها | **نعم — هذه وحدة التخزين الوحيدة التي يجب نسخها احتياطيًا** |
| `z3-<network>-zaino` | حالة المفهرس (فقط مع ملف تعريف المفهرس) | اختياري — قابل لإعادة البناء |
| `z3-<network>-cookie` | ملف تعريف ارتباط RPC الخاص بـ Zebra | لا — يُعاد إنشاؤه |

لوضع حالة السلسلة على قرص آخر قبل أول تشغيل:

```bash
export Z3_CHAIN_DATA_PATH=/mnt/ssd/zebra-state
./scripts/fix-permissions.sh zebra /mnt/ssd/zebra-state
```

يوقف `docker compose --env-file .env.<network> --profile "*" down` الحزمة ويحتفظ بوحدات التخزين. تؤدي إضافة `-v` إلى حذفها وفرض إعادة مزامنة كاملة. ضمّن `--profile "*"` لكي تُفكك الخدمات المحكومة بملفات التعريف (المفهرس، والمراقبة) بالفعل.

---

## البدء

المتطلبات المسبقة: Docker Engine، وDocker Compose v2.24.4+، وGit. لا يلزم `openssl` إلا لـregtest.

### Regtest (أسرع طريقة لرؤية الحزمة)

```bash
git clone https://github.com/ZcashFoundation/z3 && cd z3
./scripts/regtest-init.sh
docker compose --env-file .env.regtest up -d
```

راجع [docs/regtest.md](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md) للاطلاع على أوامر الاختبار.

### Mainnet (إقلاع على مرحلتين)

يجب أن تنهي Zebra المزامنة قبل أن تصبح Zallet مفيدة. يؤدي تشغيل Zallet مبكرًا إلى دخولها في حلقة إعادة تشغيل حتى تصبح `/ready` صحيحة.

```bash
git clone https://github.com/ZcashFoundation/z3 && cd z3

# 1. One-time setup: local config + Zallet wallet identity
./scripts/setup-network.sh mainnet

# 2. Start Zebra and wait until it is synced
docker compose --env-file .env.mainnet up -d zebra
./scripts/check-zebra-readiness.sh

# 3. Start Zallet (and anything else in the default profile)
docker compose --env-file .env.mainnet up -d
```

تتبع testnet التدفق نفسه باستخدام `.env.testnet` و`./scripts/check-zebra-readiness.sh 18080`.

تبقى التعديلات ضمن `config/<network>/` محلية وتستمر بعد `git pull`.

### ملفات التعريف الاختيارية

```bash
# Lightwalletd-compatible gRPC + JSON-RPC proxy
docker compose --env-file .env.mainnet --profile indexer up -d

# Prometheus, Grafana, Jaeger, Alertmanager
docker compose --env-file .env.mainnet --profile monitoring up -d
```

منافذ Grafana الافتراضية هي 3000 (mainnet)، و13000 (testnet)، و23000 (regtest).

---

## ملاحظات للمشغّل

* **الصور المثبّتة.** لا ينتقل Z3 تلقائيًا إلى `:latest`. حدّث إصدارًا مثبّتًا في تغيير خضع للمراجعة، أو اضبط `Z3_<SERVICE>_IMAGE`. لم تتغير الإصدارات المثبّتة منذ أغسطس 2026، لذا فهي أسبق من NU7 (راجع ملاحظة الحالة في الأعلى).
* **الحاويات التي تعمل دون صلاحيات الجذر.** تُسقط إمكانات Linux. وتُبقي فحوصات السلامة المحفظة غير متاحة إلى أن تصبح Zebra جاهزة. وسياسة إعادة التشغيل مفعّلة افتراضيًا.
* **السجلات.** لا يثبّت Z3 برنامج تشغيل للسجلات. اضبط حدود الحجم في إعدادات خدمة Docker، وإلا فستتضخم السجلات بلا حدود على عقدة تعمل على مدار الساعة طوال أيام الأسبوع.
* **P2P.** ينشر كل من الشبكة الرئيسية وشبكة الاختبار منفذ P2P الخاص بـ Zebra. عند العمل خلف NAT، اضبط `ZEBRA_NETWORK__EXTERNAL_ADDR` على العنوان الذي ينبغي للأقران الاتصال به. لا يوجد أقران في regtest.
* **Zaino على ARM.** صورة Zaino من المصدر الأساسي مخصصة لـ `linux/amd64` فقط. وعلى أجهزة Apple Silicon، تعمل بالمحاكاة ما لم تبنِها من المصدر. أما Zebra وZallet فيدعمان معماريات متعددة.
* **المضيفون المشتركون.** لا تُضبط حدود لوحدة المعالجة المركزية أو الذاكرة افتراضيًا. أضف `deploy.resources.limits` إلى ملف تجاوز الإعدادات إذا لم يكن الخادم مخصصًا للعقدة.

قائمة التحقق المهيأة للإنتاج والأسئلة الشائعة: [docs/faq.md](https://github.com/ZcashFoundation/z3/blob/main/docs/faq.md)، [docs/docker-architecture.md](https://github.com/ZcashFoundation/z3/blob/main/docs/docker-architecture.md).

---

## من ينبغي له تشغيل Z3

**مناسب جيدًا**

* البورصات وأمناء الحفظ ومجمعات التعدين التي استخدمت `zcashd` كعقدة إضافةً إلى محفظة
* المشغلون الذين يريدون محفظة RPC مدعومة لعقدة كاملة مقابل Zebra متزامنة
* المطورون الذين يحتاجون mainnet وtestnet وregtest جنبًا إلى جنب
* أي شخص ينشئ نقطة نهاية خاصة متوافقة مع lightwalletd عبر ملف تعريف Zaino

**عادةً الأداة الخاطئة**

* المستخدمون النهائيون الذين يحتاجون فقط إلى إرسال ZEC واستلامها — يستخدمون محفظة خفيفة مثل ZODL / Zashi، أو Zingo، أو Zkool (الخلف المدعوم لـ YWallet)
* من يريدون التحقق من السلسلة فقط — يشغّلون Zebra (أو Zakura) بمفردها
* من يريدون تقديم الكتل المدمجة فقط — يشغّلون Zebra + Zaino، أو Zebra + lightwalletd، من دون Zallet

---

## صفحات ذات صلة

* [Zebra العقدة الكاملة](/zcash-tech/zebra-full-node) — عقدة التوافق التي يغلفها Z3
* [Zaino](/zcash-tech/zaino) — ملف تعريف المفهرس الاختياري
* [العقد الكاملة](/zcash-tech/full-nodes) — Zebra، وZakura، وzcashd المتوقفة
* [عقد المحافظ الخفيفة](/zcash-tech/lightwallet-nodes) — ما تتصل به العملاء الخفيفة
* [Zakura عقدة](/zcash-tech/zakura-node) — عقدة كاملة بديلة؛ ليست ما يقدمه Z3 اليوم
* [دليل الترحيل: zcashd إلى Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet)
* [موارد المطورين](/start-here/developer-resources)

---

## الموارد

* [مستودع Z3](https://github.com/ZcashFoundation/z3)
* [عقد Z3 (المنافذ، ووحدات التخزين، وأسماء المشاريع)](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml)
* [Zebra](https://github.com/ZcashFoundation/zebra) · [كتاب Zebra](https://zebra.zfnd.org/)
* [Zaino](https://github.com/zingolabs/zaino)
* [Zallet](https://github.com/zcash/zallet) · [كتاب Zallet](https://zcash.github.io/zallet/)
* [Zcash منتدى المجتمع — تحديثات Z3](https://forum.zcashcommunity.com/t/zcash-z3-updates-formerly-zcashd-deprecation/48965)
* [مشغّل Z3](https://github.com/Jubrilabdulazeez/z3-launcher) — لوحة تحكم مجتمعية فوق حزمة Compose الرسمية (ZecHub Hackathon)
