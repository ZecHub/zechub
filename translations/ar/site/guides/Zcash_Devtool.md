# أداة التطوير Zcash

[ما هي zcash-devtool؟](https://github.com/zcash/zcash-devtool?tab=readme-ov-file) 

أداة التطوير Zcash هي منصة للعبث بـ Zcash. أنشأها المطورون للمطورين، لاختبار وتطوير وظائف Zcash الجديدة؛ ولا ينبغي اعتبارها جاهزة للإنتاج. يمكن، وسوف، تتغير واجهة برمجة التطبيقات لسطر الأوامر التي توفرها هذه الأداة في أي وقت ومن دون إنذار. لا تودع أموالًا كبيرة في المحفظة المضمنة ضمن zcash-devtool.

### درس فيديو لأداة التطوير Zcash:
قدّم Kris Nuttycombe (@nuttycom) هذه الأداة خلال ZconVI.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/5gvQF5oFT8E"
    title="zcash-devtool: the Zcash development multitool with Kris Nuttycombe - ZconVI"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


---

للاطلاع على دليل خطوة بخطوة حول بدء استخدام هذه الأدوات، راجع [هذا الشرح التفصيلي](https://github.com/zcash/zcash-devtool/blob/main/doc/walkthrough.md). يوثق شرحًا كاملًا لكيفية إعداد واستخدام أدوات تطوير zcash. وهو معدّ ليكون دليلًا لكيفية الإعداد وإضافة وظائفك الخاصة إلى الأداة.

## بداية سريعة

تم التحقق من الأوامر أدناه مقابل zcash-devtool `main` (التزام `5a26ee8`، أغسطس 2026). تتغير الأداة من دون إشعار، لذا شغّل `--help` على أي أمر إذا لم يعد شيء هنا متطابقًا.

### التثبيت

لا توجد ملفات تنفيذية مُسبقة البناء. ثبّت [Rust](https://rustup.rs)، ثم ابنِ من المصدر:

```bash
git clone https://github.com/zcash/zcash-devtool.git
cd zcash-devtool
cargo run --release -- --help
```

تستدعي الأمثلة أدناه الملف التنفيذي المبني، `target/release/zcash-devtool`. ويعمل `cargo run --release -- ...` بالطريقة نفسها.

### إنشاء محفظة testnet

ابدأ على testnet. عملات testnet ‏(TAZ) ليس لها قيمة.

```bash
zcash-devtool wallet -w ./my-wallet init --name demo -i ./my-wallet-identity.txt -n test
zcash-devtool wallet -w ./my-wallet sync
zcash-devtool wallet -w ./my-wallet balance
```

- `-w` هو دليل المحفظة. يوضع بعد `wallet` وقبل الأمر الفرعي.
- `-i` هو ملف هوية [age](https://age-encryption.org). تُشفّر إليه عبارة الاستذكار الخاصة بالمحفظة، ويُنشأ الملف إن لم يكن موجودًا. احتفظ به: تحتاجه `send` و`shield` وأوامر الإنفاق الأخرى لفك تشفير البذرة.
- `-n` هي الشبكة: `test` أو `main`.
- `-s` يختار خادم المحفظة الخفيفة. يتصل الإعداد الافتراضي، `zecrocks`، بخادم zec.rocks للشبكة المختارة.
- لاستعادة محفظة موجودة، استخدم `restore-mnemonic` بدلًا من `init`. سيطلب منك العبارة.

يسرد `balance` كل مجمع على حدة، بما في ذلك Ironwood:

```
    Balance:   0.00000000 TAZ
     Sapling Spendable:   0.00000000 TAZ
     Orchard Spendable:   0.00000000 TAZ
    Ironwood Spendable:   0.00000000 TAZ
  Unshielded Spendable:   0.00000000 TAZ
```

شغّل `zcash-devtool wallet -w ./my-wallet list-addresses` لرؤية العنوان الموحد للمحفظة، وأرسل إليه أموال testnet من [صنبور](https://zechub.wiki/using-zcash/faucets).

بالنسبة إلى mainnet، مرّر `-n main` إلى `init`. استخدم فقط مبالغ يمكنك تحمّل خسارتها.

### الإرسال والتدريع

المبالغ بوحدة zatoshis ‏(1 ZEC = 100,000,000 zatoshis).

```bash
zcash-devtool wallet -w ./my-wallet send -i ./my-wallet-identity.txt \
  --address <recipient address> --value 100000 --memo "hello"
zcash-devtool wallet -w ./my-wallet shield -i ./my-wallet-identity.txt
```

يعرض `propose` المعاملة التي سينشئها `send`، من دون إرسالها. يعرض `list-tx` و`list-unspent` سجل المحفظة وملاحظاتها.

يقبل أي أمر يتواصل مع خادم أيضًا `--connection tor`، الذي يوجّه الاتصال عبر عميل Tor المضمن.

### فحص العناوين والمفاتيح والمعاملات

يفك `inspect` ترميز بيانات Zcash دون اتصال: العناوين والمفاتيح والمعاملات الخام. أضف `--lookup` لجلب مزيد من المعلومات من السلسلة، مثل معاملة عبر معرّفها.

```
$ zcash-devtool inspect utest1h55y5z...
Zcash address
 - Network: testnet
 - Kind: Unified Address
 - Receivers:
   - Orchard (...)
   - Sapling (...)
   - Transparent P2PKH (...)
```

تُرسل ملاحظات Ironwood إلى مستقبِل Orchard نفسه في عنوان موحد، لذا لم تتغير العناوين مع NU6.3.

### بناء المعاملات على مراحل باستخدام PCZTs

تقسم PCZT (معاملة Zcash منشأة جزئيًا) بناء المعاملة إلى خطوات منفصلة: الإنشاء والإثبات والتوقيع والإرسال. يمكن تنفيذ كل خطوة على جهاز مختلف، مثلًا باستخدام موقّع عتادي مثل Keystone. يقرأ كل أمر `pczt` ملف PCZT أو الإدخال القياسي ويكتبه إلى ملف (`--output`) أو الإخراج القياسي، لذا يمكن تمرير الخطوات عبر الأنابيب:

```bash
zcash-devtool pczt -w ./my-wallet create --address <recipient address> --value 100000 \
  | zcash-devtool pczt -w ./my-wallet prove -i ./my-wallet-identity.txt \
  | zcash-devtool pczt -w ./my-wallet sign -i ./my-wallet-identity.txt \
  | zcash-devtool pczt -w ./my-wallet send
```

يسرد `zcash-devtool pczt --help` الخطوات الأخرى، بما في ذلك `inspect` و`redact` و`combine` و`extract` و`shield`.

### نقل الأموال من Orchard إلى Ironwood

منذ NU6.3، لا يمكن نقل أموال Orchard إلا إلى عناوين المحفظة الخاصة. تنقل أوامر `migration` هذه الأموال إلى Ironwood:

```bash
zcash-devtool migration -w ./my-wallet plan
zcash-devtool migration -w ./my-wallet commit -i ./my-wallet-identity.txt
zcash-devtool migration -w ./my-wallet status
zcash-devtool migration -w ./my-wallet advance
```

- يعاين `plan` تقسيمات الملاحظات وجدول النقل، ولا يغيّر شيئًا.
- ينشئ `commit` معاملات الإعداد الأولى ويوقّعها مسبقًا. أضف `--external` لتركها غير موقّعة لموقّع خارجي مثل Keystone.
- يعرض `status` تقدّم الترحيل والخطوة التالية.
- يثبت `advance` المعاملة التالية التي يكون مرساتها جاهزًا.

لا تزال أوامر الترحيل قيد الإنشاء. يتوقف `advance` عند أول معاملة جاهزة للبث، لأن البث لم يُنفّذ في الأداة بعد. للاستخدام اليومي، انقل الأموال باستخدام محفظة تدعم Ironwood. راجع [المجمعات المحمية](https://zechub.wiki/using-zcash/shielded-pools).


**تحذيرات أمنية:**
لا تستخدم هذا في الإنتاج!!!
لم يُكتب التطبيق مع مراعاة الأمان. لكنه يتضمن وسائل مثل تشفير عبارات البذرة الاستذكارية، ينبغي أن تجعله صالحًا لتجارب صغيرة النطاق، على مسؤوليتك الخاصة.

### متقدم (درس librustzcash )


[شاهد الفيديو هنا](https://free2z.cash/uploadz/public/ZcashTutorial/librustzcash-a-rust-crates.mp4)
