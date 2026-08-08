---
# تشغيل عقدة كاملة على Raspberry Pi 4 (Zebra + Zallet)

*تم ترحيل هذا الدليل من الدليل الأصلي المعتمد على zcashd. وصل zcashd إلى التوقف التلقائي عند نهاية الدعم في 18 يوليو 2026، لذا يستخدم هذا الدليل الآن **Zebra** (العقدة الكاملة الحالية التي تتولى Zcash Foundation صيانتها) و**Zallet** (المحفظة المصممة لتحل محل المحفظة المدمجة في zcashd).*

## ما الذي ستتعلّمه
- كيفية تفليش Ubuntu Server 22.04+ (‏64-bit) وتهيئته على Raspberry Pi 4 للاستخدام دون شاشة
- كيفية تثبيت وتشغيل Zebra، سواء عبر Docker أو باستخدام نسخة binary مسبقة البناء
- كيفية تثبيت Zallet وتهيئته وبدء تشغيله، بما في ذلك إعداد تشفير المحفظة
- كيفية ترحيل إعدادات/محفظة zcashd موجودة مسبقًا إلى Zallet بشكل اختياري

## ما الذي تغيّر مقارنة بالدليل القديم
كان الإصدار السابق من هذا الدليل يشرح كيفية ترجمة **zcashd** محليًا على Pi 4 — وهي عملية ترجمة أحادية الخيط كانت تستغرق من 3 إلى 4 ساعات لأن Pi 4 لا يملك ذاكرة كافية لتنفيذ بناء متوازٍ باستخدام (`-j$(nproc)`). أمّا الآن، فإن Zebra وZallet يوفّران كلاهما **نسخ ARM64 وDocker images رسمية ومسبقة البناء**، لذلك في معظم الحالات لم تعد بحاجة إلى ترجمة أي شيء من المصدر على Pi نفسه.

## المتطلبات المسبقة
- جهاز Raspberry Pi 4 (يُوصى بذاكرة RAM بسعة 4 GB أو أكثر)
- بطاقة microSD (‏32 GB أو أكثر) لنظام التشغيل
- وحدة SSD/HDD خارجية تدعم USB 3.0 — **يحتاج Zebra إلى نحو 300 GB تقريبًا من أجل بيانات Mainnet المخزنة مؤقتًا**، مع ازدياد الحجم بمرور الوقت، لذلك لا تحاول تشغيله بالاعتماد على بطاقة microSD وحدها
- حاسوب يحتوي على منفذ لبطاقة microSD (لتفليش صورة نظام التشغيل)
- اتصال Ethernet سلكي أو Wi-Fi
- إلمام أساسي باستخدام سطر الأوامر عبر SSH

## الخطوة 1: تفليش Ubuntu Server 22.04+ (‏64-bit)
تتطلب النسخ المسبقة البناء وDocker images الخاصة بـ Zebra وZallet وجود **glibc 2.34+**، ما يعني أنك تحتاج إلى **Ubuntu Server 22.04 أو أحدث (64-bit/aarch64)**.

1. ثبّت Raspberry Pi Imager على حاسوبك الرئيسي.
2. أدخل بطاقة microSD.
3. اختر **Other general-purpose OS → Ubuntu → Ubuntu Server 22.04 LTS (64-bit)** (أو إصدارًا أحدث).
4. استخدم الخيارات المتقدمة في Imager (أيقونة الترس) لتهيئة اسم المضيف مسبقًا، وتفعيل SSH، وضبط بيانات اعتماد Wi-Fi عند الحاجة، لتسهيل الإقلاع الأول دون شاشة.
5. اكتب الصورة على البطاقة، ثم أدخل البطاقة في الجهاز وشغّل Pi.
6. اتصل عبر SSH: `ssh <username>@<pi-hostname-or-ip>`

## الخطوة 2: توصيل وحدة التخزين الخارجية وضمّها
1. صِل وحدة SSD/HDD الخارجية عبر USB 3.0.
2. حدّد الجهاز: `lsblk`
3. قم بتهيئته (إن كان جديدًا) ثم ضمّه، مثلًا إلى `/mnt/zcash-data`، باستخدام إعداد `mkfs`/`fstab` قياسي ليتم ضمّه تلقائيًا بعد إعادة التشغيل.

## الخطوة 3: تحديث النظام
```bash
sudo apt update && sudo apt full-upgrade -y
sudo reboot
```

## الخطوة 4: تثبيت Zebra وتشغيله
### الخيار A — Docker (موصى به)
```bash
sudo apt install -y docker.io
sudo usermod -aG docker $USER   # سجّل الخروج/الدخول بعد هذه الخطوة
docker run -d \
  --name zebra \
  -p 8233:8233 \
  -v /mnt/zcash-data/zebra:/home/zebra/.cache/zebra \
  zfnd/zebra:latest
```
تحقق من التقدم: `docker logs -f zebra`

### الخيار B — نسخة binary مسبقة البناء عبر cargo binstall
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source "$HOME/.cargo/env"
cargo install cargo-binstall
cargo binstall zebrad
zebrad start
```
يؤدي هذا إلى تثبيت نسخة `aarch64` مسبقة البناء — من دون الحاجة إلى ترجمة.

**حول مدة المزامنة:** توقّع أن يستغرق هذا بعض الوقت — فالأرقام الشائعة للمزامنة الأولى (حوالي ساعتين تقريبًا) تستند إلى عتاد مرجعي أقوى من معالج Pi 4، لذلك من المرجح أن تكون مدة المزامنة الفعلية على عتاد Pi 4 الحقيقي أطول من ذلك.

## الخطوة 5: تثبيت Zallet
لا يزال Zallet حاليًا في مرحلة **alpha** — توقّع تغييرات غير متوافقة، ولا تعتبره بعدُ حلًا جاهزًا للإنتاج لحفظ مبالغ كبيرة.

### الخيار A — Docker (موصى به)
```bash
docker pull zodlinc/zallet:latest
```
تدعم هذه الصورة ARM64 (عبر build قائم على Nix) وتعمل من نظام ملفات minimal من دون shell — مرّر إعداداتك ومسارات البيانات بشكل صريح باستخدام `--datadir` وعمليات ربط الأحجام volume mounts (انظر الخطوة 6).

### الخيار B — البناء من المصدر
```bash
# Requires Rust 1.85+ (see Step 4B for rustup install)
sudo apt install -y clang libclang-dev protobuf-compiler
cargo install --locked --git https://github.com/zcash/wallet.git
```
لم تُنشر حزم Zallet بعد على crates.io خلال مرحلة alpha، لذلك فإن التثبيت مباشرة من مستودع git هو الطريقة المدعومة غير المعتمدة على Docker.

## الخطوة 6: تهيئة Zallet
أنشئ ملف `zallet.toml` داخل دليل البيانات الذي تختاره (مثلًا `/mnt/zcash-data/zallet`):
```toml
[builder.limits]
[consensus]
network = "main"
[database]
[external]
[features]
as_of_version = "0.0.0"
[features.deprecated]
[features.experimental]
[indexer]
validator_address = "127.0.0.1:8232"   # Zebra's JSON-RPC endpoint
[keystore]
[note_management]
[rpc]
bind = ["127.0.0.1:SOMEPORT"]
```
عدّل `validator_address` إذا كان Zebra يعمل على مضيف/منفذ مختلف، واضبط `validator_cookie_auth` و`validator_user` و`validator_password` ضمن `[indexer]` بحيث تتوافق مع إعداد مصادقة RPC الخاص بـ Zebra.

**الترحيل من zcashd؟** إذا كان لا يزال لديك ملف `zcash.conf` قديم:
```bash
zallet migrate-zcash-conf --datadir /path/to/old/zcashd/datadir -o /mnt/zcash-data/zallet/zallet.toml
```

## الخطوة 7: إعداد تشفير المحفظة
يقوم Zallet بتشفير جميع مواد المفاتيح باستخدام `age`/`rage`:
```bash
cargo install rage
rage -p -o /mnt/zcash-data/zallet/encryption-identity.txt <(rage-keygen)
```
سيؤدي هذا إلى طباعة مفتاح عام وعبارة مرور مُنشأة تلقائيًا — **احفظ عبارة المرور؛ فلن تتمكن من استعادة ملف الهوية بدونها.**

## الخطوة 8: تهيئة المحفظة وتشغيلها
```bash
zallet -d /mnt/zcash-data/zallet init-wallet-encryption
zallet -d /mnt/zcash-data/zallet generate-mnemonic
```
**شغّل `generate-mnemonic` مرة واحدة فقط** ما لم تكن تريد عمدًا امتلاك عدة جذور إنفاق مستقلة.

```bash
zallet -d /mnt/zcash-data/zallet start
```

## الخطوة 9: ترحيل محفظة zcashd موجودة مسبقًا (اختياري)
```bash
zallet -d /mnt/zcash-data/zallet migrate-zcashd-wallet --zcashd-datadir /path/to/old/zcashd/datadir
```
تتطلب هذه الخطوة أداة `db_dump` (مبنية مقابل Berkeley DB 6.2.23) — سواء من تثبيت نظامي أو من بناء محلي لمصدر zcashd. إذا لم يعد zcashd مثبتًا لديك، فهذه هي خطوة الترحيل الوحيدة التي لم تصبح بعد مكتفية ذاتيًا بالكامل داخل Zallet.

## الخطوة 10: التحقق من أن كل شيء يعمل
```bash
zallet -d /mnt/zcash-data/zallet help
```
تأكد من أن المحفظة تستجيب، وبعد أن يُكمل Zebra المزامنة، تأكد من أن الأرصدة/العناوين تطابق ما تتوقعه.

## استكشاف الأخطاء وإصلاحها
- **مشكلات بناء/تشغيل Zebra على ARM:** إذا كنت تبني من المصدر، فثبّت سلسلة أدوات Rust الخاصة بـ ARM — إذ إن تشغيل أدوات بناء x86_64 على عتاد ARM سيكون أبطأ بشكل ملحوظ، وفقًا لوثائق Zebra نفسها.
- **امتلاء مساحة التخزين:** يستمر حجم Zebra البالغ نحو 300 GB في الازدياد — خطط لمساحة إضافية.
- **أخطاء أذونات Docker:** سجّل الخروج ثم الدخول مجددًا بعد إضافة مستخدمك إلى مجموعة `docker`، أو استخدم `sudo` مؤقتًا إلى أن تفعل ذلك.
- **حاوية Zallet لا تحتوي على shell:** إن صورة `zodlinc/zallet` الرسمية مبنية من الصفر عمدًا — مرّر دائمًا `--datadir` بشكل صريح، وقم بربط دليل البيانات الخاص بك كـ volume.

## ملاحظات حول العتاد مقارنة بدليل zcashd القديم
يكون Zebra وZallet عمومًا أخف على المعالج أثناء الإعداد مقارنة بما كان عليه الحال عند ترجمة zcashd، لأنك تشغّل نسخًا binaries/containers مسبقة البناء. تُعد ذاكرة RAM بسعة 4 GB نقطة بداية معقولة؛ راقب الأداء باستخدام `htop` وفكّر في إصدار Pi 4 بسعة 8 GB إذا لاحظت تبديلًا كثيفًا إلى swap.

## موارد إضافية
- [كتاب Zebra](https://zebra.zfnd.org) — الوثائق الرسمية لـ Zebra
- [كتاب Zallet](https://zcash.github.io/wallet) — الوثائق الرسمية لـ Zallet
- [إشعار نهاية دعم zcashd](https://z.cash/support/zcashd-deprecation)

---

*إذا وجدت هذا الدليل مفيدًا، ففكّر في دعم ZecHub: [أدرج عنوان التبرع المحمي الحالي الخاص بـ ZecHub من zechub.wiki/donation — غير مُدرج هنا لأنني لم أتمكن من التحقق مما إذا كان لا يزال محدثًا].*
