# تشغيل عقدة كاملة على Raspberry Pi 4 (Zebra + Zallet)

*نُقل هذا الدليل من الدليل الأصلي المبني على zcashd. وصل zcashd إلى التوقف التلقائي عند انتهاء الدعم (End-of-Support) في 18 يوليو 2026، لذا يستخدم هذا الدليل الآن **Zebra** (العقدة الكاملة الحالية، التي تتولى صيانتها Zcash Foundation) وـ **Zallet** (المحفظة (wallet) التي بُنيت لتحل محل المحفظة المدمجة لـ zcashd).*

## ما ستتعلمه
- كيفية تثبيت صورة Ubuntu Server 22.04+ (64-bit) وتهيئتها على Raspberry Pi 4 للاستخدام دون شاشة (headless)
- كيفية تثبيت Zebra وتشغيله، إما عبر Docker أو باستخدام ملف ثنائي مُعدّ مسبقاً
- كيفية تثبيت Zallet وتهيئته وتجهيزه، بما في ذلك إعداد تشفير (encryption) المحفظة
- كيفية نقل إعدادات أو محفظة zcashd الموجودة لديك إلى Zallet (اختياري)

## ما الذي تغيّر عن الدليل القديم
شرحت النسخة السابقة من هذا الدليل خطوات تجميع **zcashd** محلياً على Pi 4، وهو تجميع أحادي الخيط استغرق من 3 إلى 4 ساعات لأن Pi 4 لا يملك ذاكرة كافية للبناء المتوازي (`-j$(nproc)`). أصبح كل من Zebra وـ Zallet يوفّران الآن **ملفات ثنائية رسمية مُعدّة مسبقاً لمعمارية ARM64 وصور Docker**، لذا لم تعد في معظم الحالات بحاجة إلى تجميع أي شيء من الشيفرة المصدرية على جهاز Pi نفسه.

## المتطلبات المسبقة
- جهاز Raspberry Pi 4 (يُنصح بذاكرة RAM بسعة 4 GB أو أكثر)
- بطاقة microSD (بسعة 32 GB أو أكثر) لنظام التشغيل
- قرص SSD/HDD خارجي يدعم USB 3.0، إذ **يحتاج Zebra إلى نحو 300 GB لبيانات الشبكة الرئيسية (Mainnet) المخزنة مؤقتاً**، وهي تتزايد مع الوقت، لذا لا تحاول تشغيل ذلك على بطاقة microSD وحدها
- حاسوب مزوّد بمنفذ لبطاقة microSD (لكتابة صورة نظام التشغيل)
- اتصال Ethernet سلكي أو Wi-Fi
- إلمام أساسي باستخدام سطر الأوامر عبر SSH

## الخطوة 1: كتابة صورة Ubuntu Server 22.04+ (64-bit)
تتطلب الملفات الثنائية المُعدّة مسبقاً وصور Docker الخاصة بـ Zebra وـ Zallet وجود **glibc 2.34+**، ما يعني **Ubuntu Server 22.04 أو أحدث (64-bit/aarch64)**.

1. ثبّت Raspberry Pi Imager على حاسوبك الرئيسي.
2. أدخل بطاقة microSD.
3. اختر **Other general-purpose OS → Ubuntu → Ubuntu Server 22.04 LTS (64-bit)** (أو أحدث).
4. استخدم الخيارات المتقدمة في Imager (أيقونة الترس) لتهيئة اسم المضيف مسبقاً، وتفعيل SSH، وضبط بيانات اعتماد Wi-Fi عند الحاجة، من أجل إقلاع أول دون شاشة.
5. اكتب الصورة، ثم أدخل البطاقة، وشغّل جهاز Pi.
6. اتصل عبر SSH: `ssh <username>@<pi-hostname-or-ip>`

## الخطوة 2: توصيل وحدة التخزين الخارجية وتركيبها
1. وصّل قرص SSD/HDD الخارجي عبر USB 3.0.
2. حدّد الجهاز: `lsblk`
3. قم بتهيئته (إن كان جديداً) وتركيبه، مثلاً في `/mnt/zcash-data`، باستخدام إعداد `mkfs`/`fstab` قياسي ليُركَّب تلقائياً عند إعادة التشغيل.

## الخطوة 3: تحديث النظام
```bash
sudo apt update && sudo apt full-upgrade -y
sudo reboot
```

## الخطوة 4: تثبيت Zebra وتشغيله
### الخيار A — Docker (موصى به)
```bash
sudo apt install -y docker.io
sudo usermod -aG docker $USER   # log out/in after this
docker run -d \
  --name zebra \
  -p 8233:8233 \
  -v /mnt/zcash-data/zebra:/home/zebra/.cache/zebra \
  zfnd/zebra:latest
```
تحقق من التقدم: `docker logs -f zebra`

### الخيار B — ملف ثنائي مُعدّ مسبقاً عبر cargo binstall
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source "$HOME/.cargo/env"
cargo install cargo-binstall
cargo binstall zebrad
zebrad start
```
يثبّت هذا ملف `aarch64` ثنائياً مُعدّاً مسبقاً، دون الحاجة إلى أي تجميع.

**بخصوص وقت المزامنة:** توقّع أن يستغرق ذلك بعض الوقت. الأرقام الشائعة للمزامنة الأولى (نحو ساعتين) مصدرها عتاد مرجعي أقوى من معالج Pi 4، لذا من المرجح أن يطول وقت المزامنة الفعلي على عتاد Pi 4 الحقيقي.

## الخطوة 5: تثبيت Zallet
لا يزال Zallet حالياً في مرحلة **ألفا**، لذا توقّع تغييرات جذرية، ولا تعتمد عليه بعد كحل وصائي (custodial) جاهز للإنتاج لحفظ مبالغ كبيرة.

### الخيار A — Docker (موصى به)
```bash
docker pull zodlinc/zallet:latest
```
تدعم هذه الصورة معمارية ARM64 (عبر بناء قائم على Nix) وتعمل من نظام ملفات مصغّر بلا صدفة أوامر (shell)، لذا مرّر مسارات الإعدادات والبيانات صراحةً عبر `--datadir` وتركيب وحدات التخزين (انظر الخطوة 6).

### الخيار B — البناء من الشيفرة المصدرية
```bash
# Requires Rust 1.85+ (see Step 4B for rustup install)
sudo apt install -y clang libclang-dev protobuf-compiler
cargo install --locked --git https://github.com/zcash/wallet.git
```
لم تُنشر حزم Zallet بعد على crates.io خلال مرحلة ألفا، لذا فإن التثبيت مباشرةً من مستودع git هو الطريقة المدعومة لغير Docker.

## الخطوة 6: تهيئة Zallet
أنشئ `zallet.toml` في مجلد البيانات (datadir) الذي تختاره (مثلاً `/mnt/zcash-data/zallet`):
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
عدّل `validator_address` إذا كان Zebra يعمل على مضيف أو منفذ مختلف، واضبط `validator_cookie_auth`/`validator_user`/`validator_password` ضمن `[indexer]` لتتوافق مع إعداد مصادقة RPC الخاص بـ Zebra.

**هل تنتقل من zcashd؟** إذا كان لا يزال لديك `zcash.conf` قديم:
```bash
zallet migrate-zcash-conf --datadir /path/to/old/zcashd/datadir -o /mnt/zcash-data/zallet/zallet.toml
```

## الخطوة 7: إعداد تشفير المحفظة
يشفّر Zallet جميع بيانات المفاتيح باستخدام `age`/`rage`:
```bash
cargo install rage
rage -p -o /mnt/zcash-data/zallet/encryption-identity.txt <(rage-keygen)
```
يطبع هذا مفتاحاً عاماً وعبارة مرور مولّدة تلقائياً. **احفظ عبارة المرور، فلا يمكنك استعادة ملف الهوية بدونها.**

## الخطوة 8: تهيئة المحفظة وتشغيلها
```bash
zallet -d /mnt/zcash-data/zallet init-wallet-encryption
zallet -d /mnt/zcash-data/zallet generate-mnemonic
```
**شغّل `generate-mnemonic` مرة واحدة فقط** ما لم تكن تريد عمداً عدة جذور إنفاق مستقلة.

```bash
zallet -d /mnt/zcash-data/zallet start
```

## الخطوة 9: نقل محفظة zcashd موجودة (اختياري)
```bash
zallet -d /mnt/zcash-data/zallet migrate-zcashd-wallet --zcashd-datadir /path/to/old/zcashd/datadir
```
يتطلب هذا الأداة المساعدة `db_dump` (المبنية مقابل Berkeley DB 6.2.23)، إما من تثبيت على مستوى النظام أو من بناء محلي من الشيفرة المصدرية لـ zcashd. إذا لم يعد zcashd مثبتاً لديك، فهذه هي خطوة النقل الوحيدة التي لا تكتمل بعد بالكامل داخل Zallet.

## الخطوة 10: التحقق من أن كل شيء يعمل
```bash
zallet -d /mnt/zcash-data/zallet help
```
تأكد من أن المحفظة تستجيب، ومن أن الأرصدة والعناوين تطابق توقعاتك بعد أن ينتهي Zebra من المزامنة.

## استكشاف الأخطاء وإصلاحها
- **مشكلات البناء أو التشغيل لـ Zebra على ARM:** إذا كنت تبني من الشيفرة المصدرية، فثبّت سلسلة أدوات Rust الخاصة بـ ARM، إذ إن تشغيل أدوات (tools) البناء المخصصة لـ x86_64 على عتاد ARM سيكون أبطأ بشكل ملحوظ، وفقاً لوثائق Zebra نفسها.
- **امتلاء وحدة التخزين:** تستمر المساحة التي يشغلها Zebra والبالغة نحو 300 GB في التزايد، لذا خطّط لترك هامش كافٍ.
- **أخطاء الأذونات في Docker:** سجّل الخروج ثم الدخول مجدداً بعد إضافة مستخدمك إلى مجموعة `docker`، أو استخدم `sudo` في هذه الأثناء.
- **حاوية Zallet لا تحتوي على صدفة أوامر:** صُمّمت صورة `zodlinc/zallet` الرسمية من الصفر عمداً، لذا مرّر دائماً `--datadir` صراحةً، وركّب مجلد بياناتك كوحدة تخزين.

## اعتبارات العتاد مقارنةً بدليل zcashd القديم
يستهلك Zebra وـ Zallet عموماً موارد أقل من المعالج أثناء الإعداد مقارنةً بتجميع zcashd، لأنك تشغّل ملفات ثنائية أو حاويات مُعدّة مسبقاً. تُعدّ ذاكرة RAM بسعة 4 GB نقطة بداية معقولة. راقب الاستهلاك باستخدام `htop`، وفكّر في طراز Pi 4 بسعة 8 GB إذا لاحظت استخداماً كثيفاً لذاكرة التبديل (swap).

## موارد إضافية
- [كتاب Zebra](https://zebra.zfnd.org) — الوثائق الرسمية لـ Zebra
- [كتاب Zallet](https://zcash.github.io/zallet/) — الوثائق الرسمية لـ Zallet
- [إشعار انتهاء الدعم لـ zcashd](https://z.cash/support/zcashd-deprecation)

---

*إن وجدت هذا الدليل مفيداً، ففكّر في دعم ZecHub: [أدرج عنوان (address) التبرعات المحمي (shielded) الحالي لـ ZecHub من zechub.wiki/donation، فهو غير مُدرج هنا لأنني لم أتمكن من التحقق من أنه لا يزال سارياً].*
