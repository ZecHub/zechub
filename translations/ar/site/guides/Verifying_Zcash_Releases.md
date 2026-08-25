<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Community/Verifying_Zcash_Releases.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# التحقق من إصدارات Zcash

## الخلاصة

- تنزيل ملف ثنائي لـ Zcash ليس هو نفسه التأكد من أنك حصلت على الملف الذي نشره المشروع فعلاً. التحقق هو ما يتيح لك معرفة الفرق.
- يثبت المجموع الاختباري أن الملف وصل سليماً. أما **التوقيع** فيثبت الجهة التي أنتجته. أنت تحتاج إلى كليهما، والمجموع الاختباري وحده لا يثبت إلا القليل جداً.
- ينشر Zebra ملف `SHA256SUMS` بالإضافة إلى حزمة **Sigstore** تربط الإصدار بسير عمل محدد في GitHub Actions وبوسم tag وcommit معيّنين، من دون الحاجة إلى إدارة المفاتيح.
- ينشر Zallet توقيعات **GPG** منفصلة (`.asc`) إلى جانب SLSA provenance وSBOM.
- تم تدوير مفتاح توقيع Zcash في عام 2026 من Electric Coin Company إلى Zcash Open Development Lab (ZODL). إذا كنت قد تحققت من إصدارات أقدم، فستحتاج إلى المفتاح الجديد، كما أن بيان التسليم موقّع بالمفتاحين معاً، بحيث يمكنك التحقق من عملية التدوير نفسها.
- يعرض `gpg` **المفتاح الفرعي** الذي وقّع الملف، وليس المفتاح الأساسي المذكور في الإعلانات. البصمة التي تبدو خاطئة تكون عادةً لمفتاح فرعي، لا لهجوم.
- إذا فشل التحقق، فلا تشغّل الملف الثنائي.

*تم التحقق بالاستناد إلى Zebra `v6.3.0` وZallet `v0.1.0-beta.2` بتاريخ 2026-08-18.*

## لماذا يهم هذا أكثر في Zcash

يمكن لملف wallet ثنائي تم العبث به أن يسرّب spending key أو viewing key. وعلى خلاف كلمة مرور تم اختراقها، فإن هذه الخسارة دائمة: لا يوجد تراجع، ولا استرداد، ولا مكتب دعم. تحمي المعاملات المحمية ما يحدث *على chain*، لكنها لا توفّر أي حماية إطلاقاً عندما يكون البرنامج الذي تشغّله قد استُبدل قبل أن يصل إليك أصلاً.

هذا أحد مسارات الهجوم القليلة التي لا تكون فيها ضمانات الخصوصية في البروتوكول ذات صلة ببساطة. التحقق هو الطبقة التي تغطي ذلك.

## نموذج التهديدات: ما الذي يكتشفه التحقق وما الذي لا يكتشفه

**يكتشف:**

- مرآة تنزيل تم العبث بها أو ملفاً معدّلاً جرى تقديمه من مكان غير صفحة الإصدار الخاصة بالمشروع.
- استبدالاً من نوع man-in-the-middle أثناء التنزيل.
- CDN مخترقة أو مضيف توزيع تم الاستيلاء عليه.
- تلفاً عرضياً أثناء النقل.

**لا يكتشف:**

- مسؤول صيانة يوقّع شيفرة خبيثة. سيتحقق التوقيع بصورة صحيحة؛ فهو يثبت المصدر لا النية.
- مضيف بناء مخترقاً ينتج artifact موقّعاً لكنه خبيث. وهنا يأتي دور reproducible builds وprovenance attestations لتضييق هذا الخطر.
- مفتاحاً حصلت عليه من المصدر المخترق نفسه الذي أخذت منه الملف الثنائي. إذا كان المهاجم يسيطر على الملف والمفتاح الذي تتحقق به، فلن يخبرك التحقق بأي شيء.

هذه النقطة الأخيرة هي التي تتجاوزها معظم الأدلة. **مكان حصولك على المفتاح لا يقل أهمية عن تشغيل الأمر نفسه.**

---

## الجزء 1 — Zebra: المجاميع الاختبارية وSigstore

ينشر Zebra هذه الملفات لكل إصدار:

| الملف | الغرض |
|---|---|
| `zebrad-<version>-<arch>.tar.gz` | أرشيف الملف الثنائي |
| `zebrad-<version>-<arch>.tar.gz.sha256` | مجموع اختباري لكل ملف |
| `SHA256SUMS` | المجاميع الاختبارية لكل البنى المعمارية |
| `SHA256SUMS.sigstore.json` | حزمة Sigstore لتوقيع `SHA256SUMS` |

### الخطوة 1 — التنزيل

```bash
BASE=https://github.com/ZcashFoundation/zebra/releases/download/v6.3.0
curl -sLO $BASE/zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz
curl -sLO $BASE/SHA256SUMS
curl -sLO $BASE/SHA256SUMS.sigstore.json
```

### الخطوة 2 — فحص المجموع الاختباري

```bash
sha256sum -c --ignore-missing SHA256SUMS
```

المخرجات الفعلية:

```
zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz: OK
```

الخيار `--ignore-missing` مطلوب هنا لأن `SHA256SUMS` يغطي كل البنى المعمارية وأنت نزّلت واحدة فقط. من دونه سيبلغ `sha256sum` عن غياب أرشيف aarch64 باعتباره فشلاً، وقد تسيء قراءة النجاح على أنه فشل.

كما أن المتغير الخاص بكل ملف يعمل أيضاً:

```bash
sha256sum -c zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz.sha256
```

```
zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz: OK
```

**هذه الخطوة وحدها غير كافية.** لقد نزّلت المجموع الاختباري من المكان نفسه الذي نزّلت منه الملف الثنائي. أي جهة قادرة على استبدال أحدهما قادرة على استبدال الآخر. يثبت المجموع الاختباري السلامة؛ أما الخطوة التالية فتثبت المصدر.

### الخطوة 2b — الفحص نفسه على Windows

لا يحتوي PowerShell على وضع تحقق `-c`، لذا تجري المقارنة يدوياً:

```powershell
Get-FileHash .\zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz -Algorithm SHA256 | Format-List
```

المخرجات الفعلية:

```
Algorithm : SHA256
Hash      : 86326F5324F4E59CC2008C15F94407CC8D5FEACF75D64942164BB5F08ECA8C5E
Path      : \\wsl$\Ubuntu\home\briefking\verify\zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz
```

قارِن ذلك بنتيجة Linux الواردة سابقاً في هذه الصفحة:

```
86326f5324f4e59cc2008c15f94407cc8d5feacf75d64942164bb5f08eca8c5e
86326F5324F4E59CC2008C15F94407CC8D5FEACF75D64942164BB5F08ECA8C5E
```

**القيم متطابقة.** لا يعتد hex بحالة الأحرف، وهذا هو أكثر إنذار كاذب شيوعاً على Windows.

وهناك مشكلتان إضافيتان خاصتان بـ Windows:

- **لا توجد قيمة خروج يمكن التحقق منها.** في Linux، يعيد `sha256sum -c` القيمة 1 عند الفشل ويمكن للسكريبت التعامل معها. أما `Get-FileHash` فيطبع hash فقط، والمقارنة تقع على عاتقك، وكذلك إمكانية الخطأ عند القراءة السريعة.
- **قراءة 64 محرف hex بالعين غير موثوقة.** دع shell يقوم بذلك:

```powershell
$expected = "86326f5324f4e59cc2008c15f94407cc8d5feacf75d64942164bb5f08eca8c5e"
$actual = (Get-FileHash .\zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz -Algorithm SHA256).Hash.ToLower()
if ($actual -eq $expected) { "OK" } else { "MISMATCH" }
```

> **على macOS:** سير العمل هو نفسه، لكن بيئة BSD userland تتضمن `shasum` بدلاً من `sha256sum`، لذا استخدم `shasum -a 256 -c --ignore-missing SHA256SUMS`. لم يكن لدى كاتب هذه الصفحة جهاز macOS متاح، لذلك تم توثيق هذا الأمر استناداً إلى أدوات Apple بدلاً من تشغيله فعلياً. إذا تحققت على macOS، فيرجى فتح PR لتأكيد ذلك أو تصحيحه.

### الخطوة 3 — التحقق من حزمة Sigstore

يستبدل Sigstore مفاتيح التوقيع طويلة الأمد بشهادات قصيرة العمر مرتبطة بهوية CI ومسجلة في سجل شفافية عام. لا أحد يحتفظ بمفتاح إصدار يمكن سرقته.

المسار المباشر يستخدم `cosign`:

```bash
cosign verify-blob \
  --bundle SHA256SUMS.sigstore.json \
  --certificate-identity-regexp '^https://github\.com/ZcashFoundation/zebra/' \
  --certificate-oidc-issuer https://token.actions.githubusercontent.com \
  SHA256SUMS
```

الخياران `--certificate-*` هما بيت القصيد بالكامل. **فمن دونهما أنت تؤكد فقط أن شخصاً ما، في مكان ما، وقّع الملف.** أما بوجودهما فأنت تؤكد أنه وُقّع بواسطة سير عمل في مستودع Zebra، بعد مصادقة من موفّر GitHub OIDC.

> ⚠️ **الإصدار مهم.** إصدارات cosign الأقدم لا تستطيع قراءة التنسيق الحالي لحزمة Sigstore. تشغيل الأمر أعلاه باستخدام cosign `v2.4.1` ينتج:
>
> ```
> Error: bundle does not contain cert for verification, please provide public key
> ```
>
> الحزمة *تحتوي بالفعل* على شهادة، لكنها موجودة تحت `verificationMaterial.certificate.rawBytes`، وهو موضع لا تبحث عنه الإصدارات الأقدم. هذا قيد في العميل، وليس إصداراً معطوباً. إذا واجهت هذا، فقم بترقية cosign بدلاً من الاستنتاج بأن التنزيل سيئ. وغالباً ما تكون نسخ cosign الموزعة ضمن الحزم متأخرة كثيراً عن المصدر الأصلي.

تُظهر الخطوتان التاليتان كيفية التحقق من الحزمة نفسها يدوياً، وهذا مهم لفهم الآلية في كل الأحوال، كما أنه بديل عملي عندما لا يتعاون إصدار cosign لديك.

### الخطوة 4 — قراءة ما تدّعيه الشهادة فعلياً

يمكنك فحص الحزمة من دون `cosign`، وهذا مفيد لفهم ما الذي تضع فيه ثقتك. استخرج الشهادة:

```bash
python3 -c "
import json,base64
d=json.load(open('SHA256SUMS.sigstore.json'))
open('cert.der','wb').write(base64.b64decode(d['verificationMaterial']['certificate']['rawBytes']))"

openssl x509 -in cert.der -inform DER -noout -issuer -ext subjectAltName
```

المخرجات الفعلية لإصدار Zebra v6.3.0:

```
issuer=O = sigstore.dev, CN = sigstore-intermediate
X509v3 Subject Alternative Name: critical
    URI:https://github.com/ZcashFoundation/zebra/.github/workflows/zfnd-release-binaries.yml@refs/tags/v6.3.0
```

Subject Alternative Name هو الهوية. فهو يسمّي المستودع وملف سير العمل المحدد والوسم tag. كما يضمّن Sigstore بيانات بناء إضافية داخل امتدادات مخصصة:

| الحقل | القيمة في v6.3.0 |
|---|---|
| موفّر OIDC | `https://token.actions.githubusercontent.com` |
| مستودع المصدر | `https://github.com/ZcashFoundation/zebra` |
| build commit | `f5c5277fe41eba9c74f37098738f93f35dd70d60` |
| Ref | `refs/tags/v6.3.0` |
| بيئة runner | `github-hosted` |
| تشغيل workflow | `.../actions/runs/31424510487/attempts/1` |
| مستوى ظهور المستودع | `public` |

كل واحد من هذه العناصر قابل للتحقق. يجب أن يطابق hash الخاص بالـ commit الوسم tag في المستودع؛ كما يجب أن يكون تشغيل workflow موجوداً وعلنياً.

### الخطوة 5 — التحقق من التوقيع تشفيرياً

يمكنك تأكيد التوقيع مباشرة باستخدام OpenSSL:

```bash
python3 -c "
import json,base64
d=json.load(open('SHA256SUMS.sigstore.json'))
open('sig.bin','wb').write(base64.b64decode(d['messageSignature']['signature']))"

openssl x509 -in cert.der -inform DER -pubkey -noout > pub.pem
openssl dgst -sha256 -verify pub.pem -signature sig.bin SHA256SUMS
```

المخرجات الفعلية:

```
Verified OK
```

تسجل الحزمة أيضاً digest الذي جرى توقيعه. تأكد من مطابقته لملفك المحلي:

```
bundle digest : 3eb5de0634f637e793d0411b6c7108802a36e1219f9151803ecc6108fd0f59f6
local  digest : 3eb5de0634f637e793d0411b6c7108802a36e1219f9151803ecc6108fd0f59f6
```

### الخطوة 6 — إدخال سجل الشفافية

تتضمن الحزمة إدخال Rekor يثبت أن التوقيع نُشر في سجل عام append-only:

| الحقل | القيمة |
|---|---|
| فهرس سجل Rekor | `2412071838` |
| نوع الإدخال | `hashedrekord v0.0.1` |
| وقت الدمج | 2026-08-10 19:43:09 UTC |

هذا ما يجعل إساءة استخدام المفتاح بصمت أمراً قابلاً للاكتشاف. توقيع لم يظهر أبداً في السجل، أو ظهر في وقت غير منطقي، هو إشارة تستحق التصرف بناءً عليها. قارِن وقت الدمج مع إعلان الإصدار.

> **ملاحظة حول مسار OpenSSL:** هو يتحقق من التوقيع مقابل المفتاح العام للشهادة، لكنه لا يتحقق بمفرده من سلسلة الشهادة وصولاً إلى جذر Sigstore ولا من proof الإدراج في السجل. يقوم `cosign verify-blob` بالأمور الثلاثة جميعاً. استخدم OpenSSL لفهم الآلية؛ واستخدم `cosign` بوصفه فحصك الفعلي.

---

## الجزء 2 — Zallet: توقيعات GPG

ينشر Zallet مجموعة مختلفة من الملفات:

| الملف | الغرض |
|---|---|
| `zallet-<version>-<platform>.tar.gz` | أرشيف الملف الثنائي |
| `.tar.gz.asc` | توقيع GPG منفصل |
| `.tar.gz.intoto.jsonl` | SLSA provenance attestation |
| `.tar.gz.provenance.json` | بيانات provenance الوصفية |
| `.tar.gz.sbom.spdx` | قائمة مكونات البرنامج |

### الخطوة 1 — حدّد مفتاح التوقيع قبل أن تبدأ البحث عنه

شغّل التحقق *أولاً*، من دون استيراد أي مفتاح:

```bash
gpg --verify zallet-v0.1.0-beta.2-linux-amd64.tar.gz.asc \
             zallet-v0.1.0-beta.2-linux-amd64.tar.gz
```

المخرجات الفعلية:

```
gpg: Signature made Tue Jul 28 19:18:44 2026 WAT
gpg:                using RSA key 1FE99324758F296718B457067F4BBBBA23F0617F
gpg:                issuer "sysadmin@zodl.com"
gpg: Can't check signature: No public key
```

هذا ليس فشلاً. فهو يخبرك بوجود توقيع، ويذكر تحديداً المفتاح الذي تحتاج إليه، **قبل** أن تبدأ البحث. دوّن البصمة والجهة المُصدِرة، ثم احصل على المفتاح من مصدر مستقل عن التنزيل.

> يطبع `gpg` الطوابع الزمنية وفق منطقتك الزمنية المحلية. تعرض المخرجات أعلاه `WAT` (UTC+1)؛ أما التوقيع نفسه فيُقرأ `18:18:44 UTC` في مكان آخر. إنها اللحظة نفسها. لا تعتبر اختلاف المنطقة الزمنية عدم تطابق.

### الخطوة 2 — استورد المفتاح وتحقق

```bash
curl -sL https://apt.z.cash/zodl.asc -o zodl.asc
gpg --import zodl.asc
gpg --verify zallet-v0.1.0-beta.2-linux-amd64.tar.gz.asc \
             zallet-v0.1.0-beta.2-linux-amd64.tar.gz
```

المخرجات الفعلية:

```
gpg: Signature made Tue Jul 28 19:18:44 2026 WAT
gpg:                using RSA key 1FE99324758F296718B457067F4BBBBA23F0617F
gpg:                issuer "sysadmin@zodl.com"
gpg: Good signature from "Zcash Open Development Lab (ZODL) (Dallas, Texas) <sysadmin@zodl.com>" [unknown]
gpg: WARNING: The key's User ID is not certified with a trusted signature!
gpg:          There is no indication that the signature belongs to the owner.
Primary key fingerprint: 0338 34DD 49DE CF9D BB99  34BC 6C93 CA8E 58E2 6AB1
     Subkey fingerprint: 1FE9 9324 758F 2967 18B4  5706 7F4B BBBA 23F0 617F
```

عبارة `Good signature` هي ما كنت تريده. وهناك أمران في هذه المخرجات يسببان الالتباس للناس، وكلاهما طبيعي.

### لماذا لا تطابق البصمة الإعلان

يذكر بيان انتقال مفتاح ZODL البصمة `0338 34DD 49DE CF9D BB99 34BC 6C93 CA8E 58E2 6AB1`. لكن `gpg --verify` أبلغ عن `1FE9 9324 …  23F0 617F`. يبدو ذلك كأنه عدم تطابق، لكنه ليس كذلك.

يعرض `gpg` **المفتاح الفرعي** الذي أنشأ التوقيع. أما الإعلان فيذكر **المفتاح الأساسي**. أكّد العلاقة بنفسك:

```bash
gpg --list-keys --with-subkey-fingerprints sysadmin@zodl.com
```

المخرجات الفعلية:

```
pub   rsa4096 2026-03-23 [SCEA]
      033834DD49DECF9DBB9934BC6C93CA8E58E26AB1
uid           [ unknown] Zcash Open Development Lab (ZODL) (Dallas, Texas) <sysadmin@zodl.com>
sub   rsa4096 2026-03-23 [SEA]
      1FE99324758F296718B457067F4BBBBA23F0617F
```

سطر `sub` هو المفتاح الفرعي المخصّص للتوقيع؛ أما سطر `pub` فهو المفتاح الأساسي. هوية واحدة، وحزمة مفاتيح واحدة. لهذا السبب تطبع مخرجات التحقق **كلتا** البصمتين: قارِن *المفتاح الأساسي* مع أي إعلان منشور، واعتبر سطر المفتاح الفرعي مجرد بيان للجزء الذي قام بالعمل من المفتاح.

هذا الفصل بين المفاتيح مقصود: يمكن تدوير مفتاح توقيع فرعي أو إلغاؤه من دون التخلي عن الهوية الأساسية وما تراكم لها من ثقة.

### ماذا يعني تحذير `[unknown]`

```
gpg: WARNING: The key's User ID is not certified with a trusted signature!
```

هذا **ليس** مشكلة في التوقيع. فالتوقيع صالح تشفيرياً، وهذا ما تقوله عبارة `Good signature`. التحذير يقول شيئاً مختلفاً: أنت لم تُخبر GnuPG المحلي لديك بأنك تعتقد أن هذا المفتاح يعود فعلاً إلى الجهة التي يدّعيها.

يفصل GnuPG بين سؤالين:

1. **هل وقّع هذا المفتاح هذا الملف؟** — تجيب عنه `Good signature`. سؤال تشفيري، بلا حكم بشري.
2. **هل يعود هذا المفتاح إلى ZODL؟** — لا تجيب عنه التشفيريات إطلاقاً. أنت تثبته عبر فحص البصمة مقابل مصدر مستقل.

سترى هذا التحذير في معظم عمليات التحقق تقريباً ما لم توقّع المفتاح محلياً بصورة صريحة. لا تعتبره فشلاً. **لكن** اعتبر غياب `Good signature` فشلاً.

### الخطوة 3 — تحقّق من انتقال المفتاح نفسه

انتقل توقيع إصدارات Zcash من Electric Coin Company إلى Zcash Open Development Lab في عام 2026، بعد تأسيس ZODL في يناير 2026 بواسطة فريق ECC السابق للهندسة والمنتج.

| | المفتاح القديم | المفتاح الجديد |
|---|---|---|
| البصمة | `B1C9 095E AA18 48DB B54D 9DDA 1D05 FDC6 6B37 2CFE` | `0338 34DD 49DE CF9D BB99 34BC 6C93 CA8E 58E2 6AB1` |
| UID | Zcash Master Signing Key (ECC) `<sysadmin@z.cash>` | Zcash Open Development Lab (ZODL) `<sysadmin@zodl.com>` |
| النوع | RSA 3072-bit، أُنشئ في 2023-06-19 | RSA 4096-bit، أُنشئ في 2026-03-23، وينتهي في 2028-03-22 |
| نُشر في | `https://apt.z.cash/zcash.asc` | `https://apt.z.cash/zodl.asc` |

التسلسل الزمني المنشور: توليد المفتاح الجديد في 2026-03-23، الإعلان عنه في 2026-03-27، التوقيع الحصري ابتداءً من 2026-04-23، والتخطيط لإلغاء مفتاح ECC القديم في 2026-06-23.

إعلان التدوير على موقع ويب لا تكون موثوقيته إلا بقدر موثوقية ذلك الموقع. الآلية الصحيحة هي بيان **موقّع clear-signed بالمفتاحين معاً**، بحيث يشهد المفتاح القديم للمفتاح الجديد. تنشر ZODL ذلك تماماً:

```bash
curl -sL https://zodl.com/security/key-transition.txt.asc -o key-transition.txt.asc
curl -sL https://apt.z.cash/zcash.asc -o zcash.asc
gpg --import zcash.asc
gpg --verify key-transition.txt.asc
```

المخرجات الفعلية (مختصرة: توقيعان على مستند واحد):

```
gpg: Signature made Fri Mar 27 01:11:14 2026 WAT
gpg:                using RSA key B1C9095EAA1848DBB54D9DDA1D05FDC66B372CFE
gpg:                issuer "sysadmin@z.cash"
gpg: Good signature from "Zcash Master Signing Key (Electric Coin Company) <sysadmin@z.cash>" [unknown]
Primary key fingerprint: B1C9 095E AA18 48DB B54D  9DDA 1D05 FDC6 6B37 2CFE

gpg: Signature made Fri Mar 27 01:11:14 2026 WAT
gpg:                using RSA key 1FE99324758F296718B457067F4BBBBA23F0617F
gpg:                issuer "sysadmin@zodl.com"
gpg: Good signature from "Zcash Open Development Lab (ZODL) (Dallas, Texas) <sysadmin@zodl.com>" [unknown]
Primary key fingerprint: 0338 34DD 49DE CF9D BB99  34BC 6C93 CA8E 58E2 6AB1
     Subkey fingerprint: 1FE9 9324 758F 2967 18B4  5706 7F4B BBBA 23F0 617F
```

نتيجتا `Good signature` على مستند واحد، من المفتاح القديم والمفتاح الجديد. إذا كنت تثق في مفتاح ECC للإصدارات السابقة، فإن هذه الثقة تنتقل الآن إلى مفتاح ZODL من دون أن تضطر إلى الثقة في `zodl.com` أو `apt.z.cash` أو منشور في منتدى. هذه هي الخاصية التي ينبغي البحث عنها كلما دوّر مشروع ما مفاتيحه، وغيابها أمر يستحق السؤال عنه.

### من أين تحصل على المفتاح، ومن أين لا تحصل عليه

مرتبة من الأفضل إلى الأسوأ:

1. **بيان موقّع بالمفتاح السابق**، كما أعلاه. هذا أقوى خيار بعد التدوير.
2. **مصدر مستقل عن التنزيل.** الملف الثنائي جاء من GitHub؛ والمفتاح جاء من `apt.z.cash`. يحتاج المهاجم إلى السيطرة على الاثنين.
3. **خادم مفاتيح، مع التحقق المتقاطع من البصمة المنشورة.** يمكن لأي شخص رفع مفتاح يدّعي أي هوية إلى معظم خوادم المفاتيح. المقارنة مع البصمة هي ما يجعل هذا آمناً، لا خادم المفاتيح نفسه.
4. **الصفحة نفسها التي يوجد عليها الملف الثنائي.** لا توفّر تقريباً أي ضمان. فكل من يستطيع استبدال أحدهما يستطيع استبدال الآخر.

قارن دائماً **البصمة الكاملة** مع **المفتاح الأساسي**. معرّفات المفاتيح القصيرة سهلة الاصطدام جداً، وقد استُخدمت في هجمات حقيقية.

## الجزء 3 — تحقق يفشل

التحقق مفيد فقط إذا كنت تعرف كيف يبدو الفشل. إليك مثالاً حقيقياً نتج عن إلحاق byte صفري واحد بأرشيف صحيح:

```bash
cp zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz tampered.tar.gz
printf '\x00' >> tampered.tar.gz
sha256sum -c tampered.sha256
```

المخرجات الفعلية:

```
tampered.tar.gz: FAILED
sha256sum: WARNING: 1 computed checksum did NOT match
```

قيمة الخروج: `1`.

ضع digestين جنباً إلى جنب:

```bash
sha256sum zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz tampered.tar.gz
```

```
86326f5324f4e59cc2008c15f94407cc8d5feacf75d64942164bb5f08eca8c5e  zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz
8d4e2e22adcb014e006fafc71a974f987ba11297587f593cf89eb9bb1feff0b5  tampered.tar.gz
```

تم إلحاق byte واحد بملف حجمه 66,992,676 byte. لا يشترك الهاشان في شيء: لا بادئة، ولا نمط. لا توجد مطابقة جزئية ولا "قريب بما يكفي": إما أن يطابق المجموع الاختباري تماماً، أو أن الملف ليس هو الملف الذي أردته.

### ماذا تفعل عندما يحدث ذلك

1. **لا تشغّل الملف الثنائي.** لا تفك ضغطه، ولا تنفّذ `chmod +x` عليه.
2. **أعِد المحاولة من صفحة الإصدار الرسمية.** معظم حالات الفشل تكون تنزيلات مقطوعة.
3. **إذا فشل مرة ثانية، فغيّر مسار الشبكة.** اتصال مختلف، أو VPN. الفشل الذي يرافقك عبر الشبكات يختلف عن فشل لا يفعل ذلك.
4. **تأكد من أن لديك ملف المجموع الاختباري الصحيح للإصدار الصحيح.** مقارنة v6.3.0 مع مجاميع v6.2.3 ستفشل بصورة صحيحة.
5. **إذا استمر الفشل، فأبلغ عنه.** افتح issue في مستودع المشروع، أو استخدم جهة الاتصال الأمنية في `SECURITY.md` لأي شيء تشك بأنه متعمد. راجع صفحة [أمن منظومة Zcash](/zcash-community/zcash-ecosystem-security) لمعرفة قنوات الإفصاح.
6. **احتفظ بالartifact.** الملف الثنائي الذي تم العبث به يعد دليلاً. لا تحذفه قبل الإبلاغ.

فشل التوقيع أخطر من فشل المجموع الاختباري. عدم تطابق المجموع الاختباري يكون عادةً تلفاً؛ أما ملف صحيح لكن بتوقيع سيئ فليس شيئاً يحدث بالصدفة.

---

## الجزء 4 — جدول مرجعي

| Project | أماكن نشر الإصدارات | الطريقة | من أين يأتي المفتاح |
|---|---|---|---|
| **Zebra** | `github.com/ZcashFoundation/zebra/releases` | `SHA256SUMS` + حزمة Sigstore | لا يوجد مفتاح، بل هوية CI عبر GitHub OIDC |
| **Zallet** | `github.com/zcash/zallet/releases` | توقيع GPG منفصل `.asc`، وSLSA provenance، وSBOM | `apt.z.cash/zodl.asc` — المفتاح الأساسي `0338 34DD…58E2 6AB1`، والمفتاح الفرعي للتوقيع `1FE9 9324…23F0 617F` |
| **zcashd** | *متقاعد* | — | توقف عند الكتلة 3,417,100 بتاريخ 2026-07-18. لا تقم بتثبيته. |
| **Zodl** (المعروف سابقاً باسم Zashi) | App Store / Google Play؛ و`zodl-inc` على GitHub | توقيع المتجر؛ والملفات الثنائية المستقلة الخاصة بـ Android موقّعة بـ GPG | مفتاح ZODL وفق بيان الانتقال |

> **ملاحظة تسمية:** أُعيدت تسمية Zashi إلى **Zodl** في عام 2026، أولاً على App Store ثم على Google Play. الأدلة الأقدم التي تشير إلى "Zashi" تصف السلالة نفسها من wallet.

---

## الجزء 5 — محافظ الهاتف والأجهزة

يعمل التحقق بطريقة مختلفة عندما تبتعد عن التنزيلات المباشرة.

**متاجر التطبيقات.** لا يمكنك التحقق من التوقيع بنفسك. المتجر هو من يوقّع الحزمة، وأنت تثق في مراجعة المتجر وسلامة حساب المطوّر. ما *يمكنك* التحقق منه هو أنك تملك التطبيق الصحيح: تأكد من اسم الناشر ومعرّف الحزمة بمقارنتهما مع الموقع الرسمي للمشروع، لا مع نتائج البحث. تطبيقات الانتحال شائعة، ووجود التطبيق في المتجر ليس دليلاً على الأصالة.

**ملفات Android APK المستقلة.** *يمكن* التحقق منها. تنشر ZODL ملفات Android الثنائية المستقلة الموقعة بـ GPG عبر GitHub Releases، لذا ينطبق عليها سير العمل في الجزء 2. فضّل هذا المسار إذا كنت تريد سلسلة يمكن التحقق منها.

**محافظ الأجهزة.** يقوم الجهاز بإثبات سلامة firmware الخاص به، لذا يكون مرساة الثقة هي الجهاز نفسه لا ملفاً على جهازك. راجع [Keystone Zashi](/guides/keystone-zashi) لمعرفة سير التحقق من الجهاز. اشترِ مباشرة من الشركة المصنعة، إذ يحدث العبث بسلسلة التوريد بين المصنع والمشتري.

---

## قراءات إضافية

- [أمن منظومة Zcash](/zcash-community/zcash-ecosystem-security) — سياسة الإفصاح وجهات الاتصال الأمنية
- [Zebra Full عقدة](/zcash-tech/zebra-full-node) — تثبيت Zebra بعد التحقق منه
- [الدليل المرجعي السريع لـ Zallet](/using-zcash/zallet-quick-reference-guide) — استخدام Zallet
- [توثيق Sigstore](https://docs.sigstore.dev/)
- [مستويات SLSA provenance](https://slsa.dev/)

---

*تم تشغيل الأوامر الواردة في هذه الصفحة على Zebra `v6.3.0` وZallet `v0.1.0-beta.2` بتاريخ 2026-08-18. تتغير أدوات الإصدار: إذا اختلفت المخرجات عما هو معروض هنا، فثق بنتيجة التشغيل لديك وافتح PR من فضلك.*
