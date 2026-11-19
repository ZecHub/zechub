<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zallet.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="تعديل الصفحة"/>
</a>

# Zallet

Zallet هي محفظة Zcash لعقدة كاملة مكتوبة بلغة Rust. وهي البديل للمحفظة التي كانت مضمّنة في `zcashd`. بعد أن وصلت `zcashd` إلى توقف نهاية الدعم في 18 يوليو 2026 عند ارتفاع الكتلة 3417100، تم فصل مهام الإجماع والمحفظة: تتحقق **Zebra** أو **Zakura** من السلسلة، بينما تحتفظ **Zallet** بالمفاتيح، وتمسح الـ notes، وتوفّر JSON-RPC للمحفظة.

Zallet حاليًا في مرحلة **beta**. لم تخضع لمراجعة كاملة. قد تتطلب التغييرات غير المتوافقة حذف المحفظة وإعادة إنشائها. لا تتعامل معها كحفظٍ إنتاجي لكميات كبيرة من ZEC من دون قراءة تحذيرات الأمان في [كتاب Zallet](https://zcash.github.io/zallet/).

---

## الخلاصة

- Zallet هي **محفظة RPC لعقدة كاملة**، وليست محفظة خفيفة للهاتف المحمول ولا عقدة إجماع.
- تحل محل جزء المحفظة من `zcashd`. أما جزء العقدة فهو [Zebra](Zebra_Full_Node.md) أو [Zakura](Zakura_Node.md).
- مكتوبة بلغة **Rust**، ومرخّصة ترخيصًا مزدوجًا MIT / Apache-2.0، ويجري صيانتها في [zcash/zallet](https://github.com/zcash/zallet).
- أحدث إصدار منشور: **v0.1.0-beta.4** (2 نوفمبر 2026). يتبع [NU7](NU7.md) ويتطلب `zebrad` **7.0.0 أو أحدث**.
- تقرأ بيانات السلسلة عبر واجهة خلفية واحدة هي **zebra**: `ReadStateService` مقابل مجلد الحالة الخاص بـ `zebrad` على المضيف نفسه، إضافةً إلى JSON-RPC الخاص بـ Zebra. أُزيلت الواجهة الخلفية Zaino في الإصدار v0.1.0-beta.4.
- توفّر مجموعة فرعية متوافقة مع **zcashd JSON-RPC**. تغيّرت بعض الطرائق، وحُذفت أخرى عمدًا.
- تُشفَّر مادة المفاتيح دائمًا باستخدام **age**. ويبقى سجل المعاملات والعناوين ومفاتيح العرض مكشوفًا في `wallet.db`.
- تتضمن ملفين تنفيذيين في أرشيف موقّع واحد: `zallet` (المشغّل) و`zallet-zebra`. **Linux فقط** لمزامنة المحفظة: لا تعمل أي واجهة خلفية للسلسلة على macOS أو Windows حتى الآن.
- يلتقط `zallet backup` (جديد في beta.4) لقطة متسقة لمحفظة قيد التشغيل أو متوقفة.
- الوثائق الرسمية: [كتاب Zallet](https://zcash.github.io/zallet/).

---

## لماذا توجد Zallet

كانت `zcashd` تجمع عقدة إجماع مشتقة من Bitcoin Core ومحفظة في عملية واحدة. لم يعد هذا التصميم قائمًا.

| الدور | الحزمة القديمة | الحزمة الحالية |
|------|-----------|---------------|
| الإجماع / P2P | `zcashd` | Zebra (`zebrad`) أو Zakura |
| المحفظة / المفاتيح / الأرصدة | `zcashd` `wallet.dat` | **Zallet** (`wallet.db`) |
| مفهرس العميل الخفيف | `lightwalletd` | Zaino أو `lightwalletd` |

فصل المحفظة عن العقدة يعني:

- يمكن تبديل برنامج العقدة (Zebra مقابل Zakura) من دون نقل المفاتيح.
- يعيش مسح المحفظة وسلطة الإنفاق في عملية يمكن تأمينها بصورة منفصلة.
- يمكن أن تتطور دلالات RPC نحو حسابات ZIP 32، والعناوين الموحّدة، وPCZTs بدلًا من بقائها مجمّدة على خصائص `zcashd`.

Zallet هي المحفظة المخصصة للمشغّلين الذين كانوا يشغّلون سابقًا `zcashd` كمحفظة ساخنة، أو خلفية لمنصة تداول، أو صنبور، أو محفظة لمدفوعات التعدين.

---

## الحالة

Zallet في مرحلة **beta**.

ما يعنيه ذلك عمليًا:

- قد تصل تغييرات غير متوافقة في أي إصدار beta. وقد تضطر إلى حذف دليل البيانات والبدء من جديد.
- لم تُنقل كل RPCs لمحفظة `zcashd`.
- تختلف دلالات بعض الطرائق المنقولة عن `zcashd`. يجب على عمليات التكامل قراءة صفحة [الدلالات المعدّلة](https://zcash.github.io/zallet/zcashd/json_rpc.html).
- لا تزال الحزم البرمجية قيد التطوير ولم تخضع لمراجعة كاملة.
- Zallet **ليست** مكتبة Rust. ولا توجد أي ضمانات إذا اعتمدت عليها باعتبارها كذلك.

تُرسل الملاحظات إلى [مشكلات GitHub](https://github.com/zcash/zallet/issues/new) أو إلى قناة `#wallet-dev` على [Zcash Discord للبحث والتطوير](https://discord.gg/xpzPR53xtU).

تُخطط مرحلة مستقرة لاحقة عند اكتمال واجهة RPC المقصودة. وسيتوقع حينها من المستدعين الانتقال إلى طرائق Zallet، بما فيها الفروق الدلالية الموثقة.

---

## البنية

تنقسم Zallet عبر مساحات عمل Cargo كي تتمكن كل واجهة خلفية للسلسلة من تتبع مخطط تبعياتها الخاص. منذ الإصدار v0.1.0-beta.4، لا يُضمَّن سوى الواجهة الخلفية zebra.

```
zallet            launcher: reads `backend` in zallet.toml (default "zebra")
                  and execs zallet-zebra
zallet-core       shared wallet: CLI, config, JSON-RPC, SQLite DB, sync
zallet-zebra      zebra-state backend (ReadStateService + Zebra JSON-RPC)
```

يفتح الملفان التنفيذيان `wallet.db` نفسه. حتى الإصدار v0.1.0-beta.3، كانت هناك أيضًا واجهة خلفية `zallet-zaino`. إذا كان `zallet.toml` لديك يقول `backend = "zaino"`، فغيّره إلى `backend = "zebra"`. لا تحتاج قاعدة بيانات المحفظة إلى ترحيل، ويمكن حذف مجلد `zaino` القديم من دليل البيانات.

تقرأ الواجهة الخلفية لـ zebra قاعدة بيانات الحالة الخاصة بـ `zebrad` مباشرةً، لذا تحتاج إلى `zebrad` مبنية بميزة `indexer`، وأن يكون دليل الحالة الخاص بها **على المضيف نفسه**. لا يوجد إعداد مدعوم لـ Zallet في حاوية يتصل بـ `zebrad` في حاوية أخرى عبر الشبكة، إلى أن يتوفر backend يعمل عبر الشبكة فقط ([zallet#900](https://github.com/zcash/zallet/pull/900)).

نشر نموذجي:

```
zebrad  (or Zakura)
   │  JSON-RPC / ReadStateService
   ▼
Zallet  (zallet-zebra)
   │  JSON-RPC on 127.0.0.1
   ▼
Your application, exchange, faucet, or operator scripts
```

Zallet هي **محفظة لعقدة كاملة**: تتوقع عقدة تحقق محلية. وليست عميلًا خفيفًا. للمحافظ الخفيفة وخوادم الكتل المضغوطة، راجع [Zaino](Zaino.md) و[عقد Lightwallet](Lightwallet_Nodes.md).

تُشغّل حزمة التركيب الخاصة بـ Zcash Foundation [Z3](https://github.com/ZcashFoundation/z3) كلًا من Zebra وZallet معًا، مع إمكانية تشغيل Zaino مستقلًا للعملاء الخفيفين الخارجيين. تعود صورها المثبّتة إلى ما قبل NU7 ونسخة بيتا 4 من Zallet؛ راجع [Z3 Stack](Z3_Stack.md) قبل استخدامها.

---

## الحسابات والعناوين والمفاتيح

تستند Zallet إلى حسابات ZIP 32، وليس إلى حساب `zcashd` الضمني الوحيد.

- يمكن للمحفظة أن تحتفظ **بعدة عبارات تذكّر BIP 39**. كل عبارة تذكّر هي جذر إنفاق مستقل، يعرَّف بواسطة **بصمة البذرة** (`zip32seedfp1…`).
- تُشتق **الحسابات** من بذرة بمؤشر حساب ZIP 32. وداخل نسخة Zallet واحدة، لها أيضًا **UUID** محلي. الهوية القابلة للنقل للحساب هي `(seedfp, account index)`.
- العناوين هي **عناوين موحّدة ZIP 316**، وتُنتج باستخدام `z_getaddressforaccount`. يمكن أن يملك الحساب الواحد عناوين متنوعة كثيرة؛ ولا يمكن ربط مستقبِلات الحماية على السلسلة.
- تصبح مفاتيح الإنفاق المستوردة (`z_importkey`) وعناوين المراقبة فقط (`z_importaddress`) حسابات UUID لا تغطيها أي عبارة تذكّر.
- يمكن تصدير مفاتيح العرض واستيرادها (`z_exportviewingkey`، `z_importviewingkey`)، بما في ذلك مفاتيح العرض الكاملة الموحّدة ومفاتيح العرض الواردة.

`getnewaddress` غير مطبّق. استخدم `z_getnewaccount` و`z_getaddressforaccount`.

إذا كان `keystore.require_backup` مفعّلًا (الصيغة المُرحّلة من `zcashd` الخاصة بـ `walletrequirebackup`)، ترفض Zallet اشتقاق سلطة إنفاق جديدة من عبارة تذكّر لم يُؤكَّد نسخها الاحتياطي.

---

## التشفير والنسخ الاحتياطية

تكون مادة المفاتيح **مشفّرة دائمًا**. لا يوجد وضع غير مشفّر ولا RPC لـ `encryptwallet` — إذ لم تكن طريقة `zcashd` تلك مدعومة بالكامل قط.

- ينشئ الإعداد هوية **age**، ومسارها الافتراضي هو `{datadir}/encryption-identity.txt`.
- تُخزَّن عبارات التذكّر ومفاتيح الإنفاق المستوردة كنصوص مشفّرة بـ age في `wallet.db`.
- لا تكون بقية قاعدة البيانات **مشفّرة**. ويمكن قراءة السجل والعناوين ومفاتيح العرض إذا حصل شخص ما على الملف.
- يمكن تغليف الهوية بعبارة مرور (`generate-encryption-identity -p`). ألغِ القفل باستخدام RPC ‏`walletpassphrase`؛ وأغلقه باستخدام `walletlock`.
- يؤدي فقدان ملف الهوية أو عبارة مروره إلى استحالة استرداد مفاتيح الإنفاق. انسخ احتياطيًا الهوية وكل عبارة تذكّر وأي نسخة `wallet.db` تحتفظ بها (بصورة منفصلة ومشفّرة).

إن نسخ `wallet.db` يدويًا أثناء تشغيل Zallet ليس نسخة احتياطية آمنة: فقد يتلف SQLite. منذ v0.1.0-beta.4، استخدم الأمر [`backup`](https://github.com/zcash/zallet/blob/main/book/src/cli/backup.md):

```bash
zallet -d /path/to/zallet/datadir backup /path/to/backups/
```

ينشئ لقطة متّسقة مع المعاملات ومدقّقًا من سلامتها لمحفظة قيد التشغيل أو متوقفة. إذا زوّدته بمجلد، يسمّي الملف `zallet-wallet-backup-<UTC time>.db`، ولا يكتب مطلقًا فوق ملف موجود. إذا تسببت الكتابات المتواصلة إلى المحفظة (مثلًا أثناء المزامنة الأولية) في إعادة بدء النسخ، فسيتوقف بعد عشر دقائق مع الإبلاغ عن ذلك بوضوح؛ أعد المحاولة لاحقًا أو أوقف المحفظة أولًا. لا يتضمن النسخ الاحتياطي ملف هوية age. انسخ هذا الملف احتياطيًا مرة واحدة وخزّنه بمعزل عن نسخ قاعدة البيانات الاحتياطية، لأن أي شخص يملك كليهما يمكنه فك تشفير المفاتيح.

---

## JSON-RPC

تطبّق Zallet مجموعة فرعية من RPCs لمحفظة `zcashd` عبر HTTP مع مصادقة Basic. اربطها بعنوان loopback. وينبغي أن يمر الاستخدام البعيد عبر نفق مشفّر. توجد `rpc.allow_insecure_remote_bind` وهي غير آمنة.

فروق بارزة عن `zcashd`:

- حقول الرصيد في `getwalletinfo` فارغة. استخدم `z_getbalances`، و`z_getbalanceforaccount`، و`z_gettotalbalance`.
- تتبع الرسوم **ZIP 317**. لا توجد `settxfee`.
- ينتقل إنشاء الإنفاق إلى **PCZTs** (معاملات Zcash المنشأة جزئيًا، ZIP 374). وصلت RPCs الخاصة بـ PCZT في سلسلة beta.
- يمنع **قفل مزامنة** عام RPCs الخاصة بالرصيد والإنفاق أثناء لحاق المحفظة بالسلسلة أو تعافيها من إعادة تنظيم (`ClientInInitialDownload` / `ForbiddenBySafeMode`).

تشمل الطرائق المحذوفة عمدًا `createrawtransaction`، و`fundrawtransaction`، و`getnewaddress`، و`getrawchangeaddress`، و`keypoolrefill`، و`importwallet`، و`encryptwallet`. تُدرج البدائل في [كتاب Zallet](https://zcash.github.io/zallet/zcashd/json_rpc.html).

---

## البدء

تجد طرق التثبيت الرسمية (حزم Debian، Docker، والملفات الثنائية للإصدارات) في [دليل التثبيت](https://zcash.github.io/zallet/guide/installation/index.html). تُسمّى أرشيفات الإصدارات `zallet-v<version>-linux-<amd64|arm64>.tar.gz` وتحتوي على `zallet` و`zallet-zebra`. تُنشر صور Docker بصيغة `zodlinc/zallet`.

مسار أدنى لإنشاء محفظة جديدة:

```bash
# data directory; default is $HOME/.zallet
zallet -d /path/to/zallet/datadir example-config > /path/to/zallet/datadir/zallet.toml
# edit zallet.toml: network, indexer.validator_address, [indexer.read_state_service], rpc.bind

zallet -d /path/to/zallet/datadir generate-encryption-identity
zallet -d /path/to/zallet/datadir init-wallet-encryption
zallet -d /path/to/zallet/datadir generate-mnemonic
zallet -d /path/to/zallet/datadir confirm-backup
zallet -d /path/to/zallet/datadir start
```

وجّه `[indexer]` إلى نقطة نهاية JSON-RPC المحلية الخاصة بـ `zebrad` باستخدام `validator_address`. هذا مطلوب، ولا تُستخدم localhost قيمةً افتراضية. يحتاج خلفية zebra أيضًا إلى `[indexer.read_state_service]` وإلى `zebrad` بالإصدار 7.0.0 أو أحدث، مبنيًا مع ميزة `indexer`، وأن يكون دليل الحالة الخاص به على المضيف نفسه، حتى تتمكن Zallet من قراءة حالة السلسلة مباشرةً. لم يضبط `indexer.db_path` سوى خلفية Zaino التي أُزيلت؛ ويُتجاهل الآن مع إصدار تحذير.

يمكن بناء صور قابلة لإعادة الإنتاج باستخدام [StageX](https://codeberg.org/stagex/stagex/) (Docker 25+، ومخزن صور containerd، وGNU Make).

---

## الترحيل من zcashd

احتفظ بدليل بيانات `zcashd` القديم إلى أن تؤكد الأرصدة وتجرب استعادة ناجحة.

```bash
zallet init-wallet-encryption
zallet migrate-zcash-conf --zcashd-datadir /path/to/zcashd/datadir \
  -o /path/to/zallet/datadir/zallet.toml
zallet migrate-zcashd-wallet --zcashd-datadir /path/to/zcashd/datadir
```

توجد `migrate-zcashd-wallet` فقط في الإصدارات التي تحتوي على ميزة `zcashd-import`. تتطلب قراءة `wallet.dat` مكتبة `db_dump` من **Berkeley DB 6.2**، وهو الإصدار الذي استخدمته `zcashd`.

ملاحظات المشغّل خطوة بخطوة: [دليل الترحيل: zcashd إلى Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet).

---

## علاقة Zallet بالبرمجيات الأخرى

| | Zallet | zecd | ZODL (Zashi) / Zingo / Zkool | Zebra / Zakura | Zaino |
|--|--------|------|------------------------------|----------------|-------|
| ماهيته | محفظة RPC بعقدة كاملة | خادم محفظة يضع الحماية أولاً | محافظ المستخدم النهائي | عقدة الإجماع | مفهرس / بديل lightwalletd |
| ما الذي يستبدله | محفظة `zcashd` | ليس نسخة مطابقة `zcashd` قابلة للاستبدال مباشرةً | تطبيقات الهاتف وسطح المكتب | عقدة `zcashd` | `lightwalletd` |
| هل يحتاج إلى عقدة محلية | نعم | نعم (Zebra افتراضياً) | لا (عميل خفيف) | هو العقدة | نعم |
| توافق RPC لـ zcashd | مصمم ليكون مسار التوافق | مجموعة فرعية صغيرة مختارة فقط | لا ينطبق | وضع توافق جزئي / Zakura | واجهة API مختلفة |
| نموذج الحفظ | يحتفظ المشغّل بالمفاتيح في `wallet.db` | خادم يمكن استعادته من العبارة الأولية | مفاتيح على جهاز المستخدم | لا توجد محفظة | لا توجد مفاتيح |

يمكن لكل من Zallet و**zecd** أن يتصدرا Zebra. اختر Zallet عندما تحتاج إلى واجهة محفظة `z_*` ومسار ترحيل من `wallet.dat`. واختر zecd عندما تريد خادمًا يضع الحماية أولًا وليس، صراحةً، نسخة من `zcashd`.

يوجد منتج منفصل للمستهلكين على [zallet.io](https://www.zallet.io/) يعيد استخدام الاسم. ذلك التطبيق ليس هذا المشروع.

---

## صفحات ذات صلة

- [العقد الكاملة](Full_Nodes.md) — Zebra، وZakura، والعقدة المتوقفة `zcashd`
- [Zebra العقدة الكاملة](Zebra_Full_Node.md) — تقرأ الواجهات الخلفية الافتراضية لـ Zallet العقدة
- [Zakura العقدة](Zakura_Node.md) — عقدة بديلة للتحقق
- [Zaino](Zaino.md) — مفهرس وخادم للعميل الخفيف (لم تعد واجهة خلفية لـ Zallet منذ beta.4)
- [مكدس Z3](Z3_Stack.md) — مكدس Compose يجمع Zebra وZallet
- [zecd](ZECD.md) — تصميم آخر لخادم المحفظة على librustzcash
- [Zcash مزامنة المحافظ](Zcash_Wallet_Syncing.md) — كيف تفحص المحافظ المحمية السلسلة
- [مفاتيح العرض](Viewing_Keys.md)

## الموارد

- [كتاب Zallet ](https://zcash.github.io/zallet/)
- [zcash/zallet على GitHub](https://github.com/zcash/zallet)
- [الإصدارات](https://github.com/zcash/zallet/releases) · [سجل تغييرات v0.1.0-beta.4](https://github.com/zcash/zallet/blob/v0.1.0-beta.4/CHANGELOG.md)
- [دلالات JSON-RPC المعدّلة](https://zcash.github.io/zallet/zcashd/json_rpc.html)
- [ZecHub دليل الترحيل](/guides/migration-guide-zcashd-to-zebrad-zallet)
- [ZecHub دليل Raspberry Pi (Zebra + Zallet)](/guides/raspberry-pi-4-full-node)
- [Z3 (Zebra + Zallet حزمة compose)](https://github.com/ZcashFoundation/z3)
- [Zcash البحث والتطوير Discord](https://discord.gg/xpzPR53xtU) — `#wallet-dev`
