<a href="https://github.com/zechub/zechub/edit/main/site/guides/Viewing_Key_Transaction_Export.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# تصدير سجل المعاملات من Viewing Key

معظم عمليات تصدير المحافظ محدودة. على سبيل المثال، يوفّر تصدير الضرائب الخاص بـ ZODL التواريخ والمبالغ والرسوم للسنة التقويمية السابقة، لكنه لا يوفّر معرّفات المعاملات أو المذكرات أو العناوين. وهذا لا يكفي لمسك الدفاتر، أو للتحقق من ترحيل محفظة، أو لمعرفة ما حدث لدفعة ما.

لا تحتاج إلى عبارة الاسترداد الخاصة بك للحصول على الصورة الكاملة. يمكن لمفتاح العرض الكامل الموحّد (UFVK، الذي يبدأ بـ `uview1`) رؤية كل معاملة واردة وصادرة في حساب ما، ويمكن لأداتين تحويل ذلك إلى ملف تحتفظ به: خادم GraphQL الخاص بـ Zkool وzingo-cli. يجمع هذا الدليل الأساليب الواردة في [موضوع المنتدى هذا](https://forum.zcashcommunity.com/t/exporting-transaction-history-to-json-csv-from-ufvk-seed/54662) ويحدّثها للإصدارات الحالية.

تم الاختبار في سبتمبر 2026 باستخدام Zkool 6.30.0 وzingo-cli من zingolib 6.0.0. كلا الإصدارين أقدم من NU7، لذا نُقلت الخطوات في نوفمبر 2026 إلى Zkool 6.37.0 وzingolib 8.0.0. [Zkool 6.35.0](https://github.com/hhanh00/zkool2/pull/1388) هو أول إصدار من Zkool بُني مع ارتفاع تفعيل الشبكة الرئيسية NU7، وzingolib 8.0.0 هو الإصدار الذي يضيف دعم الشبكة الرئيسية NU7.

## قبل أن تبدأ

تحتاج إلى شيئين:

1. **مفتاح UFVK** الخاص بالحساب. يشرح [مفاتيح العرض](/zcash-tech/viewing-keys) ما الذي يكشفه وكيفية تصدير واحد.
2. **ارتفاع الميلاد**، أي الكتلة التي يبدأ المسح منها. استخدم ارتفاعًا يسبق معاملتك الأولى. إذا ضبطته على ارتفاع كبير جدًا، فسيفقد السجل الأقدم بصمت. وإذا ضبطته على ارتفاع منخفض جدًا، فسيستغرق المسح وقتًا أطول فحسب. يكون تفعيل Sapling (419200) آمنًا دائمًا، لكنه قد يستغرق ساعات للمسح.

## حافظ على خصوصيته

لا يستطيع مفتاح العرض الإنفاق، لكنه يُظهر سجلك الكامل لأي شخص يحتفظ به.

- لا تلصقه في موقع ويب أو مستكشف كتل. استورده إلى برنامج تشغّله بنفسك.
- يرى الخادم الذي تزامن منه عنوان IP الخاص بك والمعاملات التي تنزّلها كاملةً. تجلب الأداتان أدناه كل واحدة من معاملاتك بالمعرّف لقراءة المذكرات والرسوم، وتشير [ZIP 307](https://zips.z.cash/zip-0307) إلى أن هذا يخبر الخادم بالمعاملات التي تخصك. تزامنك من عقدة Zebra الخاصة بك باستخدام Zaino أو lightwalletd يتجنب ذلك. يشرح [Zingolib وZaino Tutorial](/guides/zingolib-and-zaino-tutorial) إعدادًا لذلك.
- يرسل zingo-cli المدفوعات عبر شبكة Nym mixnet، لكن مزامنته لا تزال تتصل بالخادم مباشرةً، لذا تنطبق عليه النقطة أعلاه أيضًا.
- أعطِ هذه الأدوات مفتاح عرض، وليس عبارة استرداد أبدًا. يبدأ الأمر Docker أدناه خادم Zkool GraphQL مع `--allow-unauthenticated`، لذا لا يتطلب تسجيل دخول، ويمكن لواجهة API الخاصة به إعادة عبارة الاسترداد لأي حساب أُنشئ منها، كما يمكنه إرسال الأموال.
- احتفظ بالخادم على جهازك الخاص. يستمع الأمر Docker أدناه فقط على `127.0.0.1` من جهازك. داخل الحاوية، يجب أن يستمع الخادم على جميع الواجهات (`--bind-address 0.0.0.0`)، وإلا فلن يتمكن Docker من الوصول إليه؛ والتعيين `-p 127.0.0.1:8000:8000` هو ما يبقيه محليًا.
- تخزن الأداتان المفتاح وسجلك دون تشفير. يمكن لـ Zkool تشفير قاعدة بياناته (`--db-password-file`)، لكن الأمر أدناه يبقي الأمر بسيطًا باستخدام `--allow-unencrypted-database`. احذف بيانات العمل عند الانتهاء واحتفظ بالتصدير في مكان مشفّر.

## الخيار 1: Zkool GraphQL

`zkool_graphql` هو محرّك المحفظة الخاص بـ Zkool بوصفه خادمًا مستقلًا. وهو برنامج منفصل عن تطبيق Zkool. أسهل طريقة لتشغيله هي صورة Docker الرسمية (amd64 وarm64). يوجد أيضًا ملف ثنائي Linux x86-64 في [Zkool صفحة الإصدارات](https://github.com/hhanh00/zkool2/releases)؛ وهو يحتاج إلى glibc 2.38 أو أحدث، لذا يعمل Ubuntu 24.04 بينما لا يعمل Debian 12.

### 1. شغّل الخادم

```bash
docker run -d --name zkool-export \
  -p 127.0.0.1:8000:8000 \
  -v zkool-export:/data \
  hhanh00/zkool-graphql:6.37.0 \
  --db-path /data/zkool.db \
  --bind-address 0.0.0.0 \
  --allow-unauthenticated \
  --allow-unencrypted-database
```

منذ الإصدار 6.32.0، لن يبدأ الخادم حتى تحدد خيارين صراحةً: طريقة تسجيل دخول العملاء (مفتاح JWT، أو `--allow-unauthenticated`) وما إذا كانت قاعدة البيانات مشفّرة (كلمة مرور، أو `--allow-unencrypted-database`). كما أنه لا يستمع الآن افتراضيًا إلا على `127.0.0.1`، ما يعني داخل الحاوية أن لا شيء من خارجها يستطيع الوصول إليه، ومن هنا تأتي `--bind-address 0.0.0.0`. إذا توقفت الحاوية فورًا، يبيّن `docker logs zkool-export` الخيار المفقود.

تتم المزامنة من `https://zec.rocks` ما لم تُضِف `--lwd-url` باستخدام خادمك الخاص. تتضمن الصورة معلمات Sapling مدمجة، لذا لا حاجة إلى تنزيل أي شيء آخر.

افتح `http://127.0.0.1:8000/graphiql` في متصفح. يمكنك لصق كل خطوة من الخطوات التالية هناك وتشغيلها.

### 2. استورد المفتاح

```graphql
mutation {
  createAccount(newAccount: {
    name: "export"
    key: "uview1..."
    aindex: 0
    birth: 2500000
    useInternal: true
  })
}
```

يعيد هذا معرّف الحساب الجديد، وهو 1 على خادم جديد.

- اضبط `birth` دائمًا. من دونه، يبدأ Zkool من الكتلة الحالية ولا يجد شيئًا.
- يجعل `useInternal: true`، Zkool يتحقق من عناوين التغيير الشفافة أيضًا. اتركه مفعّلًا للمفاتيح من ZODL، فهو الإعداد نفسه الذي يستخدمه [استرداد الأموال](/using-zcash/recovering-funds) لعبارات استرداد ZODL.

### 3. المزامنة

```graphql
mutation { synchronizeAccount(idAccount: 1) }
```

يستمر هذا حتى تنتهي المزامنة. لا تضف `fast: true`. إذ إنه يتخطى تنزيل المعاملات الكاملة، وهي مصدر المذكرات والرسوم والمخرجات.

الرقم الذي يعيده هو الارتفاع الذي كان يستهدفه، وليس دليلًا على أنه وصل إليه. قد ينهي خطأ في الشبكة المزامنة مبكرًا دون الإبلاغ عن أي شيء، لذا تحقق:

```graphql
{ currentHeight accounts { id name height } }
```

إذا كان `height` الخاص بالحساب متأخرًا عن `currentHeight`، فأعد تشغيل المزامنة. وستتابع من حيث توقفت.

### 4. التصدير

احفظ هذا باسم `history.graphql`:

```graphql
{
  transactionsByAccount(idAccount: 1) {
    txid height time value fee
    notes { pool scope address value memo }
    spends { pool scope address value }
    outputs { pool vout address value memo }
  }
}
```

اترك وسيطة `height` ما لم تكن تقصد استخدامها. فهي تضبط حدًا أدنى، لذا فإن `height: 3000000` في مثال المنتدى يستبعد كل ما قبل تلك الكتلة.

اجلبه بصيغة JSON:

```bash
jq -n --rawfile q history.graphql '{query: $q}' |
  curl -s http://127.0.0.1:8000/graphql \
    -H 'content-type: application/json' --data-binary @- > history.json
```

ينبغي أن تعرض كل معاملة رسومًا أعلى من 0، باستثناء مكافآت التعدين. إذا عرضت واحدة منها `"fee": "0"` ولم تكن لها مذكرة، فلم تُنزّل تفاصيلها. يجلب Zkool المعاملات الكاملة واحدة تلو الأخرى بعد المسح، وقد يوقف فشل واحد بقية العملية بصمت. لسرد أي معاملات متأثرة:

```bash
jq -r '.data.transactionsByAccount[] | select(.fee == "0") | .txid' history.json
```

إذا ظهر أي شيء، فأعد المزامنة بعد بضع دقائق ثم صدّر مجددًا.

ثم حوّله إلى CSV مسطّح، بصف واحد لكل معاملة:

```bash
jq -r '["txid","height","time_utc","net_zec","fee_zec","memos"],
  (.data.transactionsByAccount[] |
    [.txid, .height, .time, .value, .fee,
     ([.notes[].memo, .outputs[].memo] | map(select(. != null and . != "")) | unique | join(" | "))])
  | @csv' history.json > history.csv
```

### قراءة المخرجات

| الحقل | المعنى |
|---|---|
| `value` | التغير الصافي في الحساب بـ ZEC، شاملًا الرسوم. يكون سالبًا للإرسالات. |
| `fee` | الرسوم بـ ZEC. في المدفوعات التي تلقيتها، دفعها المرسل ولا تكون ضمن `value`. |
| `time` | وقت الكتلة بالتوقيت UTC، من دون علامة منطقة زمنية |
| `notes` | ما تلقاه الحساب في هذه المعاملة، بما في ذلك التغيير. المذكرات المرسلة إليك موجودة هنا. لا تحتوي الإدخالات الشفافة على عنوان. |
| `spends` | الـ notes الخاصة بالحساب التي استُهلكت في هذه المعاملة |
| `outputs` | ما أرسلته المعاملة: كل مخرج شفاف، إضافةً إلى المدفوعات المحمية لعناوين أخرى مع مذكراتها |
| `pool` | 0 شفاف، 1 Sapling، 2 Orchard، 3 Ironwood |
| `scope` | 0 خارجي (دفعة واردة)، 1 داخلي (تغيير) |

يحتوي تطبيق Zkool أيضًا على Export Transactions وMemos وNotes في قائمة الحساب، لكنها تفريغات لجداول خام: المبالغ بوحدة zatoshis، والطوابع الزمنية Unix، والمذكرات في ملف منفصل.

## الخيار 2: zingo-cli

zingo-cli هي محفظة سطر الأوامر الخاصة بـ Zingo. لا توجد تنزيلات جاهزة، لذا عليك بناؤها باستخدام Rust. استخدم الإصدار 8.0.0 أو أحدث من zingolib؛ فهو أول إصدار يعرف ارتفاع تفعيل Mainnet الخاص بـ NU7 (3,543,405)، وفقًا لـ[ملاحظات الإصدار](https://github.com/zingolabs/zingolib/releases/tag/zingolib_v8.0.0). الإصدارات المبنية من وسوم أقدم مثل 6.0.0 لا تعرف ذلك.

يستخدم البناء [cargo-make](https://github.com/sagiegurari/cargo-make) (`cargo install cargo-make`). وعلى Ubuntu تحتاج أيضًا إلى `sudo apt install build-essential gcc libsqlite3-dev`.

```bash
git clone --branch zingolib_v8.0.0 https://github.com/zingolabs/zingolib.git
cd zingolib
makers run-cli --build-only
```

يبني هذا `./target/release/zingo-cli` ويضع `nym-proxy` بجانبه. تحتاج إلى `nym-proxy` حتى لمجرد المزامنة: لن يتصل zingo-cli بالإنترنت من دونه. منذ الإصدار 8.0.0، أصبح `zingo-netutils` جزءًا من مساحة العمل الرئيسية، لذا لم تعد الوصفة القديمة التي تنسخ `nym-proxy` من `zingo-netutils/target/release/` صالحة.

إذا نقلت `zingo-cli` إلى مكان آخر، فانقل `nym-proxy` معه، أو أخبر zingo-cli بمكانه باستخدام `--nym-proxy /path/to/nym-proxy` أو متغير البيئة `ZINGO_NYM_PROXY`. من دونهما، سيبحث بجوار ملفه التنفيذي ثم في `PATH`. إذا تعذر عليه تشغيل الوكيل، فلن يتصل بالإنترنت مطلقًا.

تنتقل المدفوعات فقط (واستعلام السعر عبر ZEC) عبر Nym. يتصل Sync بالخادم مباشرةً.

ينشئ التشغيل الأول محفظة للعرض فقط، ويزامنها، ويطبع السجل:

```bash
./target/release/zingo-cli --data-dir "$HOME/zingo-export" \
  --viewkey "uview1..." --birthday 2500000 \
  --server https://zec.rocks:443 \
  --waitsync transactions > transactions.txt
```

- يجب أن يكون `--data-dir` مسارًا مطلقًا.
- ينطبق `--viewkey` و`--birthday` عند إنشاء المحفظة فقط. اتركهما بعد ذلك.
- تكون zingo-cli جديدة غير متصلة بالإنترنت افتراضيًا، وتحتاج إلى موافقتك للاتصال بها. يختار `--server` الخادم ويُعدّ أيضًا موافقتك. والطريقتان الأخريان هما `--online` (لهذه الجلسة فقط) و`--remember-online`، الذي يحفظ الاختيار أيضًا بجانب المحفظة، بحيث تتصل في مرات التشغيل اللاحقة بالإنترنت دون استخدام أي خيار (يلغي `--forget-online` ذلك).
- ينتهي المفتاح في سجل أوامر الصدفة، لذا امسحه بعد ذلك.

عمليات التشغيل اللاحقة:

```bash
Z="./target/release/zingo-cli --data-dir $HOME/zingo-export"
$Z --server https://zec.rocks:443 --waitsync transactions > transactions.txt
$Z --offline value_transfers > value_transfers.txt
$Z --offline messages > memos.json
```

يقرأ `--offline` ما تمت مزامنته مسبقًا دون الاتصال بالشبكة.

- يعطي `transactions` إدخالًا واحدًا لكل معاملة: txid، والوقت (UTC)، والارتفاع، والنوع (`received` أو `sent` أو `shield` أو `send-to-self`)، والقيمة، والرسوم، والـ notes المعنية.
- يعطي `value_transfers` إدخالًا واحدًا لكل دفعة، لذا فإن إرسالًا إلى شخصين ينتج إدخالين، لكل منهما عنوان المستلم والمذكرات.
- يسرد `messages` المذكرات بصيغة JSON.

بعض الأمور التي ينبغي معرفتها عن المخرجات:

- يطبع كلٌّ من `transactions` و`value_transfers` نصًا عاديًا يشبه JSON قليلًا، لكنه ليس كذلك.
- المبالغ بوحدة zatoshis (100,000,000 إلى 1 ZEC) وهي موجبة دائمًا. يوضح `kind` الاتجاه. عند الإرسال، يبيّن `value` ما وصل إلى الآخرين، من دون الرسوم.
- تظهر الرسوم على أنها «غير متاحة» عندما تنفق المعاملة أموالًا شفافة لا تخصك. لا تظهر إلا المذكرات النصية.
- إذا فشلت المزامنة، يظهر الخطأ في الطرفية، لا في الملف. منذ zingolib 8.0.0 (zingo-cli 0.5.0)، ينتهي الأمر الفاشل أيضًا برمز خروج غير صفري، لكن تحقّق من الطرفية قبل الوثوق بـ`transactions.txt`.

يحتوي [zingoHelper](https://github.com/dismad/zingoHelper) الخاص بـ dismad على نص برمجي `exportToJSON.sh` يحوّل `transactions` إلى JSON. كُتب قبل zingo-cli 6، وهو مضبوط لـ testnet، ويضع علامة على بعض إدخالات Sapling الصادرة والشفافة بوصفها عناصر نائبة، ويحتاج إلى أدوات GNU، لذا لن يعمل على macOS الافتراضي. اعتبر مخرجاته نقطة بداية وتحقق من الإجماليات.

## ما الذي لا يستطيع مفتاح العرض إخبارك به

- **الأسعار.** لا تسجل أي من الأداتين سعر ZEC وقت كل معاملة. أضف القيم النقدية بنفسك.
- **السجل الشفاف، إذا لم يتضمنه المفتاح.** الجزء الشفاف من UFVK اختياري بموجب [ZIP 316](https://zips.z.cash/zip-0316). مع zingo-cli، يوضح `$Z --offline parse_viewkey uview1...` المجمعات التي يغطيها المفتاح.
- **من دفع لك.** لا تحمل المدفوعات المحمية عنوان المرسل. ما لم يضع المرسل واحدًا في المذكرة، فلن يكون موجودًا في أي مكان.
- **بعض التفاصيل الصادرة.** يُستعاد عنوان الوجهة والمبلغ والمذكرة للإرسالات المحمية عبر فك التشفير بالمفتاح. يمكن للمحفظة إنشاء معاملة بحيث لا يكون ذلك ممكنًا، رغم أن معظمها لا يفعل ذلك.

## أدوات أخرى

| الأداة | ما تحصل عليه |
|---|---|
| ZODL | ملف CSV ضريبي بالتواريخ والمبالغ والرسوم ووسم. للسنة التقويمية السابقة فقط، ويتخطى معاملات الحماية، ولا يحتوي على txid أو مذكرة أو عنوان. |
| تطبيق Zkool | تصديرات جداول خام من قائمة الحساب |
| [Zenith](https://code.vergara.tech/Vergara_Tech/zenith) | يستورد UFVK باستخدام `importvk`. يعيد `listreceived` عبر RPC الـ notes المستلمة مع txid والمذكرة، لكنه لا يعيد الإرسالات أو الرسوم. |
| [Zallet](https://github.com/zcash/zallet) | `z_listtransactions` مفصل لكنه معلّم كتجريبي، وZallet لا يستورد إلا مفاتيح عرض Sapling، وليس UFVKs |
| [zcash-devtool](https://github.com/zcash/zcash-devtool) | يستورد UFVK باستخدام `wallet init-fvk`، ثم `wallet list-tx`. لا يحتوي وضع CSV الخاص به على txid أو عنوان، ويقول المشروع إنه لا ينبغي استخدامه في الإنتاج. |

## ذو صلة

- [مفاتيح العرض](/zcash-tech/viewing-keys)
- [استعادة الأموال](/using-zcash/recovering-funds)
- [Zingolib ودليل Zaino](/guides/zingolib-and-zaino-tutorial)
- [المنتدى: تصدير سجل المعاملات إلى JSON/CSV من UFVK/seed](https://forum.zcashcommunity.com/t/exporting-transaction-history-to-json-csv-from-ufvk-seed/54662)
- [المنتدى: Zkool وGraphQL](https://forum.zcashcommunity.com/t/zkool-graphql/54100)
- [zingo-cli ملف README](https://github.com/zingolabs/zingolib/blob/zingolib_v8.0.0/zingo-cli/README.md)
