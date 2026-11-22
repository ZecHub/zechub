# أداة Zcash Devtool

[ما هي zcash-devtool؟](https://github.com/zcash/zcash-devtool?tab=readme-ov-file) 

إن Zcash Devtool منصة للتجريب البرمجي على Zcash. بناها مطورون (developers) من أجل المطورين، لاختبار وتطوير وظائف جديدة في Zcash، ولا ينبغي اعتبارها جاهزة لبيئة الإنتاج. واجهة API لسطر الأوامر التي تتيحها هذه الأداة يمكن أن تتغير، وستتغير، في أي وقت ودون سابق إنذار. لا تضع أموالاً كبيرة في إدارة المحفظة (wallet) المدمجة في zcash-devtool.

### فيديو تعليمي عن Zcash Devtool:
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

للحصول على دليل خطوة بخطوة حول كيفية البدء في استخدام هذه الأدوات (tools)، راجع [هذا الشرح التفصيلي](https://github.com/zcash/zcash-devtool/blob/main/doc/walkthrough.md). يوثّق هذا الشرح بالكامل كيفية إعداد أدوات zcash devtool واستخدامها. والغرض منه أن يكون دليلاً لكيفية الإعداد ولكيفية إضافة وظائفك الخاصة إلى الأداة.

## البدء السريع

تم التحقق من الأوامر أدناه مقابل zcash-devtool `main` (الإيداع `5a26ee8`، أغسطس 2026). تتغير الأداة دون إشعار، لذا شغّل `--help` على أي أمر إذا لم يعد شيء هنا مطابقاً.

### التثبيت

لا توجد ملفات تنفيذية مبنية مسبقاً. ثبّت [Rust](https://rustup.rs)، ثم ابنِ الأداة من الشيفرة المصدرية:

```bash
git clone https://github.com/zcash/zcash-devtool.git
cd zcash-devtool
cargo run --release -- --help
```

تستدعي الأمثلة أدناه الملف التنفيذي المبني، `target/release/zcash-devtool`. ويعمل `cargo run --release -- ...` بالطريقة نفسها.

### إنشاء محفظة على شبكة الاختبار

ابدأ على شبكة الاختبار (testnet). عملات شبكة الاختبار (TAZ) ليس لها أي قيمة.

```bash
zcash-devtool wallet -w ./my-wallet init --name demo -i ./my-wallet-identity.txt -n test
zcash-devtool wallet -w ./my-wallet sync
zcash-devtool wallet -w ./my-wallet balance
```

- `-w` هو دليل المحفظة. يأتي بعد `wallet` وقبل الأمر الفرعي.
- `-i` هو ملف هوية [age](https://age-encryption.org). تُشفَّر العبارة التذكيرية للمحفظة باستخدامه، ويُنشأ الملف إذا لم يكن موجوداً. احتفظ به: يحتاجه `send` وـ `shield` وأوامر الإنفاق الأخرى لفك التشفير (encryption) عن البذرة.
- `-n` هو الشبكة: `test` أو `main`.
- يختار `-s` خادم المحفظة الخفيفة. القيمة الافتراضية، `zecrocks`، تتصل بخادم zec.rocks الخاص بالشبكة المختارة.
- لاستعادة محفظة موجودة، استخدم `restore-mnemonic` بدلاً من `init`. سيطلب منك إدخال العبارة.

يعرض `balance` كل مجمّع (pool) على حدة، بما في ذلك Ironwood:

```
    Balance:   0.00000000 TAZ
     Sapling Spendable:   0.00000000 TAZ
     Orchard Spendable:   0.00000000 TAZ
    Ironwood Spendable:   0.00000000 TAZ
  Unshielded Spendable:   0.00000000 TAZ
```

شغّل `zcash-devtool wallet -w ./my-wallet list-addresses` لرؤية العنوان (address) الموحد للمحفظة، وأرسل إليه أموالاً من شبكة الاختبار عبر [صنبور](https://zechub.wiki/using-zcash/faucets).

بالنسبة للشبكة الرئيسية (mainnet)، مرّر `-n main` إلى `init`. لا تستخدم إلا مبالغ يمكنك تحمّل خسارتها.

### الإرسال والحماية

المبالغ بوحدة zatoshis (1 ZEC = 100,000,000 zatoshis).

```bash
zcash-devtool wallet -w ./my-wallet send -i ./my-wallet-identity.txt \
  --address <recipient address> --value 100000 --memo "hello"
zcash-devtool wallet -w ./my-wallet shield -i ./my-wallet-identity.txt
```

يعرض `propose` المعاملة (transaction) التي سيبنيها `send`، دون إرسالها. ويعرض `list-tx` وـ `list-unspent` سجل المحفظة وما فيها من notes.

كما يقبل أي أمر يتواصل مع خادم الخيار `--connection tor`، الذي يوجّه الاتصال عبر عميل Tor المدمج.

### فحص العناوين والمفاتيح والمعاملات

يفك `inspect` ترميز بيانات Zcash دون اتصال بالإنترنت: العناوين والمفاتيح والمعاملات الخام. أضف `--lookup` لجلب مزيد من المعلومات من السلسلة (chain)، مثل معاملة حسب معرّفها.

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

تُرسَل notes الخاصة بـ Ironwood إلى مستقبِل Orchard نفسه في العنوان الموحد، لذا لم تتغير العناوين مع NU6.3.

### بناء المعاملات على مراحل باستخدام PCZTs

تقسم PCZT (معاملة Zcash منشأة جزئياً) عملية بناء المعاملة إلى خطوات منفصلة: الإنشاء، والإثبات، والتوقيع، والإرسال. يمكن تشغيل كل خطوة على جهاز مختلف، على سبيل المثال مع موقِّع عتادي مثل Keystone. يقرأ كل أمر من أوامر `pczt` بيانات PCZT من ملف أو من stdin ويكتبها إلى ملف (`--output`) أو إلى stdout، بحيث يمكن ربط الخطوات عبر الأنابيب:

```bash
zcash-devtool pczt -w ./my-wallet create --address <recipient address> --value 100000 \
  | zcash-devtool pczt -w ./my-wallet prove -i ./my-wallet-identity.txt \
  | zcash-devtool pczt -w ./my-wallet sign -i ./my-wallet-identity.txt \
  | zcash-devtool pczt -w ./my-wallet send
```

يسرد `zcash-devtool pczt --help` الخطوات الأخرى، بما في ذلك `inspect`، `redact`، `combine`، `extract` وـ `shield`.

### نقل الأموال من Orchard إلى Ironwood

منذ NU6.3، لا يمكن نقل أموال Orchard إلا إلى عناوين المحفظة نفسها. تنقلها أوامر `migration` إلى Ironwood:

```bash
zcash-devtool migration -w ./my-wallet plan
zcash-devtool migration -w ./my-wallet commit -i ./my-wallet-identity.txt
zcash-devtool migration -w ./my-wallet status
zcash-devtool migration -w ./my-wallet advance
```

- يعرض `plan` معاينة لتقسيمات notes وجدول التحويل، ولا يغيّر شيئاً.
- يبني `commit` معاملات التحضير الأولى ويوقّعها مسبقاً. أضف `--external` لتركها دون توقيع من أجل موقِّع خارجي مثل Keystone.
- يعرض `status` تقدّم الترحيل والخطوة التالية.
- يُثبت `advance` المعاملة التالية التي أصبح مرساها (anchor) جاهزاً.

لا تزال أوامر الترحيل قيد البناء. يتوقف `advance` عند أول معاملة جاهزة للبث، لأن البث لم يُنفَّذ في الأداة بعد. للاستخدام اليومي، انقل الأموال باستخدام محفظة تدعم Ironwood. راجع [المجمّعات المحمية](https://zechub.wiki/using-zcash/shielded-pools).


**تحذيرات أمنية:**
لا تستخدم هذا في بيئة الإنتاج!!!
لم يُكتب التطبيق مع مراعاة الأمان. ومع ذلك، فهو يوفّر ميزات مثل تشفير عبارات البذور (seed phrase) التذكيرية، ما يجعله صالحاً للتجريب على نطاق صغير، على مسؤوليتك الخاصة.

### متقدم (درس librustzcash )


[شاهد الفيديو هنا](https://free2z.cash/uploadz/public/ZcashTutorial/librustzcash-a-rust-crates.mp4)
