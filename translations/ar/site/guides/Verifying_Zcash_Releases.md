<a href="https://github.com/zechub/zechub/edit/main/site/guides/Verifying_Zcash_Releases.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# التحقق من إصدارات Zcash

## باختصار (TL;DR)

- تنزيل ملف ثنائي لـ Zcash ليس مثل الحصول على الملف الذي نشره المشروع فعلًا. والتحقق هو ما يتيح لك التمييز بينهما.
- يثبت المجموع الاختباري (checksum) أن الملف وصل سليمًا. أما **التوقيع الرقمي** (signature) فيثبت من أنتجه. أنت تحتاج إلى الاثنين، والمجموع الاختباري وحده لا يثبت إلا القليل جدًا.
- ينشر Zebra ملف `SHA256SUMS` مع حزمة **Sigstore** تربط الإصدار بسير عمل محدد في GitHub Actions وبوسم (tag) محدد وبالتزام (commit) محدد، دون الحاجة إلى إدارة أي مفاتيح.
- ينشر Zallet تواقيع **GPG** منفصلة (`.asc`) إلى جانب بيانات مصدر SLSA (provenance) وقائمة مكونات البرمجيات (SBOM).
- تم تدوير مفتاح التوقيع لـ Zcash في 2026 من Electric Coin Company إلى Zcash Open Development Lab (ZODL). إذا كنت قد تحققت من إصدارات أقدم، فأنت تحتاج إلى المفتاح الجديد. وبما أن بيان التسليم موقّع بالمفتاحين معًا، يمكنك التحقق من عملية التدوير نفسها.
- يعرض `gpg` **المفتاح الفرعي** (subkey) الذي وقّع الملف، وليس المفتاح الأساسي المذكور في الإعلانات. لذلك فالبصمة (fingerprint) التي تبدو خاطئة تكون في الغالب بصمة مفتاح فرعي، وليست دليلًا على هجوم.
- إذا فشل التحقق، فلا تشغّل الملف الثنائي.

*تم التحقق على Zebra `v6.3.0` وـ Zallet `v0.1.0-beta.2` بتاريخ 2026-08-18.*

## لماذا تزداد أهمية هذا الأمر بالنسبة إلى Zcash

يمكن لملف ثنائي لمحفظة (wallet) تم العبث به أن يسرّب مفتاح الإنفاق (spending key) أو مفتاح العرض (viewing key). وعلى عكس كلمة المرور المخترقة، فهذه الخسارة دائمة: لا يمكن التراجع عنها، ولا استرداد المدفوعات، ولا يوجد مكتب دعم تلجأ إليه. تحمي المعاملات (transactions) المحمية (shielded) ما يحدث *على السلسلة* (on-chain)، لكنها لا توفر أي حماية على الإطلاق إذا كان البرنامج الذي تشغّله قد استُبدل قبل أن يصل إليك أصلًا.

هذا أحد مسارات الهجوم القليلة التي لا تفيد فيها ضمانات الخصوصية (privacy) التي يقدمها البروتوكول بشيء. والتحقق هو الطبقة التي تغطي هذه الثغرة.

## نموذج التهديد: ما يكشفه التحقق وما لا يكشفه

**يكشف:**

- مرآة تم العبث بها، أو ملفًا معدّلًا يُقدَّم من مكان غير صفحة إصدارات المشروع.
- مبادلة (swap) يجريها وسيط (man-in-the-middle) على الملف أثناء التنزيل.
- شبكة توصيل محتوى (CDN) مخترقة أو مضيف توزيع مختطفًا.
- التلف العرضي أثناء النقل.

**لا يكشف:**

- مشرفًا على المشروع يوقّع شيفرة خبيثة. سينجح التحقق من التوقيع في هذه الحالة، لأن التوقيع يثبت المصدر ولا يثبت النية.
- مضيف بناء مخترقًا ينتج أداة موقّعة لكنها خبيثة. ولتضييق هذا الاحتمال وُجدت عمليات البناء القابلة لإعادة الإنتاج وشهادات المصدر.
- مفتاحًا حصلت عليه من المصدر المخترق نفسه الذي جاء منه الملف الثنائي. إذا كان المهاجم يتحكم في الملف وفي المفتاح الذي تتحقق به منه معًا، فلن يخبرك التحقق بشيء.

تتجاهل معظم الأدلة هذه النقطة الأخيرة. **المصدر الذي تحصل منه على المفتاح لا يقل أهمية عن تشغيل الأمر.**

---

## الجزء 1: Zebra، المجاميع الاختبارية وـ Sigstore

ينشر Zebra الأصول التالية مع كل إصدار:

| الأصل | الغرض |
|---|---|
| `zebrad-<version>-<arch>.tar.gz` | الأرشيف الثنائي |
| `zebrad-<version>-<arch>.tar.gz.sha256` | مجموع اختباري لكل ملف |
| `SHA256SUMS` | مجاميع اختبارية لجميع المعماريات |
| `SHA256SUMS.sigstore.json` | حزمة Sigstore توقّع `SHA256SUMS` |

### الخطوة 1: التنزيل

```bash
BASE=https://github.com/ZcashFoundation/zebra/releases/download/v6.3.0
curl -sLO $BASE/zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz
curl -sLO $BASE/SHA256SUMS
curl -sLO $BASE/SHA256SUMS.sigstore.json
```

### الخطوة 2: فحص المجموع الاختباري

```bash
sha256sum -c --ignore-missing SHA256SUMS
```

المخرجات الفعلية:

```
zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz: OK
```

الخيار `--ignore-missing` ضروري هنا لأن `SHA256SUMS` يغطي كل المعماريات بينما نزّلت أنت معمارية واحدة فقط. ومن دونه سيعرض `sha256sum` أرشيف aarch64 غير الموجود على أنه فشل، وقد تظن خطأً أن تحققًا ناجحًا قد فشل.

يمكنك أيضًا استخدام الملف الخاص بكل أرشيف:

```bash
sha256sum -c zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz.sha256
```

```
zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz: OK
```

**هذه الخطوة وحدها لا تكفي.** فقد نزّلت المجموع الاختباري من المكان نفسه الذي نزّلت منه الملف الثنائي، ومن يستطيع استبدال أحدهما يستطيع استبدال الآخر. المجموع الاختباري يثبت سلامة الملف، والخطوة التالية تثبت مصدره.

### الخطوة 2b: الفحص نفسه على Windows

لا يحتوي PowerShell على وضع تحقق مثل `-c`، لذا عليك المقارنة يدويًا:

```powershell
Get-FileHash .\zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz -Algorithm SHA256 | Format-List
```

المخرجات الفعلية:

```
Algorithm : SHA256
Hash      : 86326F5324F4E59CC2008C15F94407CC8D5FEACF75D64942164BB5F08ECA8C5E
Path      : \\wsl$\Ubuntu\home\briefking\verify\zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz
```

قارن ذلك بنتيجة Linux التي ظهرت سابقًا في هذه الصفحة:

```
86326f5324f4e59cc2008c15f94407cc8d5feacf75d64942164bb5f08eca8c5e
86326F5324F4E59CC2008C15F94407CC8D5FEACF75D64942164BB5F08ECA8C5E
```

**القيمتان متطابقتان.** لا فرق في النظام الست عشري بين الأحرف الكبيرة والصغيرة، وهذا الاختلاف في حالة الأحرف هو أكثر الإنذارات الكاذبة شيوعًا على Windows.

وهناك فخّان آخران خاصان بـ Windows:

- **لا يوجد رمز خروج يمكن فحصه.** على Linux يُرجع `sha256sum -c` القيمة 1 عند الفشل، ويمكن للسكربت أن يتصرف بناءً عليها. أما `Get-FileHash` فيطبع التجزئة فقط، والمقارنة متروكة لك، وقد تخطئ فيها إذا قرأت على عجل.
- **قراءة 64 حرفًا ست عشريًا بالعين غير موثوقة.** اترك الصدفة (shell) تقوم بالمقارنة:

```powershell
$expected = "86326f5324f4e59cc2008c15f94407cc8d5feacf75d64942164bb5f08eca8c5e"
$actual = (Get-FileHash .\zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz -Algorithm SHA256).Hash.ToLower()
if ($actual -eq $expected) { "OK" } else { "MISMATCH" }
```

> **على macOS:** الخطوات نفسها، لكن أدوات BSD تأتي مع `shasum` بدلًا من `sha256sum`، لذا استخدم `shasum -a 256 -c --ignore-missing SHA256SUMS`. لم يكن لدى كاتب هذه الصفحة جهاز macOS، لذا وُثّق هذا الأمر استنادًا إلى أدوات Apple دون تشغيله فعليًا. إذا تحققت على macOS، فيُرجى فتح طلب سحب (PR) يؤكده أو يصححه.

### الخطوة 3: التحقق من حزمة Sigstore

يستبدل Sigstore مفاتيح التوقيع طويلة الأمد بشهادات قصيرة الأمد مرتبطة بهوية نظام التكامل المستمر (CI)، وتُسجَّل هذه الشهادات في سجل شفافية عام. لا يحتفظ أحد بمفتاح إصدار يمكن سرقته.

الطريقة المباشرة هي استخدام `cosign`:

```bash
cosign verify-blob \
  --bundle SHA256SUMS.sigstore.json \
  --certificate-identity-regexp '^https://github\.com/ZcashFoundation/zebra/' \
  --certificate-oidc-issuer https://token.actions.githubusercontent.com \
  SHA256SUMS
```

الخياران `--certificate-*` هما جوهر العملية. **من دونهما فأنت تؤكد فقط أن شخصًا ما، في مكان ما، وقّع الملف.** أما معهما فأنت تؤكد أن الملف وُقّع بواسطة سير عمل في مستودع Zebra، وأن مُصدر OIDC التابع لـ GitHub قد صادق عليه.

> ⚠️ **الإصدار مهم.** لا تستطيع إصدارات cosign الأقدم قراءة التنسيق الحالي لحزم Sigstore. تشغيل الأمر السابق باستخدام cosign `v2.4.1` ينتج:
>
> ```
> Error: bundle does not contain cert for verification, please provide public key
> ```
>
> الحزمة *تحتوي* فعلًا على شهادة، لكنها موجودة تحت `verificationMaterial.certificate.rawBytes`، وهو موضع لا تبحث فيه الإصدارات الأقدم. هذا قيد في أداة العميل، وليس عيبًا في الإصدار. إذا واجهت هذه الرسالة، فقم بترقية cosign بدلًا من الاستنتاج بأن الملف الذي نزّلته سيئ. غالبًا ما تكون نسخة cosign التي توفرها التوزيعات متأخرة كثيرًا عن النسخة الأصلية.

توضح الخطوتان التاليتان كيفية التحقق من الحزمة نفسها يدويًا. من المفيد أن تفهم هذه العملية على أي حال، كما أنها بديل عملي عندما لا تعمل نسخة cosign لديك.

### الخطوة 4: اقرأ ما تقوله الشهادة فعلًا

يمكنك فحص الحزمة دون `cosign`، وهذا يساعدك على فهم ما تثق به بالضبط. استخرج الشهادة:

```bash
python3 -c "
import json,base64
d=json.load(open('SHA256SUMS.sigstore.json'))
open('cert.der','wb').write(base64.b64decode(d['verificationMaterial']['certificate']['rawBytes']))"

openssl x509 -in cert.der -inform DER -noout -issuer -ext subjectAltName
```

المخرجات الفعلية لـ Zebra v6.3.0:

```
issuer=O = sigstore.dev, CN = sigstore-intermediate
X509v3 Subject Alternative Name: critical
    URI:https://github.com/ZcashFoundation/zebra/.github/workflows/zfnd-release-binaries.yml@refs/tags/v6.3.0
```

الاسم البديل للموضوع (Subject Alternative Name) هو الهوية. فهو يحدد المستودع، وملف سير العمل بعينه، والوسم. ويضيف Sigstore بيانات وصفية أخرى عن البناء في امتدادات مخصصة:

| الحقل | القيمة في الإصدار v6.3.0 |
|---|---|
| OIDC issuer | `https://token.actions.githubusercontent.com` |
| Source repository | `https://github.com/ZcashFoundation/zebra` |
| Build commit | `f5c5277fe41eba9c74f37098738f93f35dd70d60` |
| Ref | `refs/tags/v6.3.0` |
| Runner environment | `github-hosted` |
| Workflow run | `.../actions/runs/31424510487/attempts/1` |
| Repository visibility | `public` |

يمكنك التحقق من كل قيمة من هذه القيم. يجب أن تطابق تجزئة الالتزام الوسم الموجود في المستودع، ويجب أن يكون تشغيل سير العمل موجودًا ومتاحًا للعامة.

### الخطوة 5: التحقق من التوقيع تشفيريًا

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

تسجّل الحزمة أيضًا الملخص (digest) الذي وقّعته. تأكد من أنه يطابق ملفك المحلي:

```
bundle digest : 3eb5de0634f637e793d0411b6c7108802a36e1219f9151803ecc6108fd0f59f6
local  digest : 3eb5de0634f637e793d0411b6c7108802a36e1219f9151803ecc6108fd0f59f6
```

### الخطوة 6: مدخل سجل الشفافية

تحتوي الحزمة على مدخل في Rekor يثبت أن التوقيع نُشر في سجل عام لا يقبل إلا الإضافة:

| الحقل | القيمة |
|---|---|
| Rekor log index | `2412071838` |
| Entry type | `hashedrekord v0.0.1` |
| Integrated at | 2026-08-10 19:43:09 UTC |

هذا ما يجعل كشف الاستخدام الخفي للمفتاح ممكنًا. إذا لم يظهر التوقيع في السجل أبدًا، أو ظهر في وقت لا يبدو منطقيًا، فهذه إشارة تستدعي التحرك. قارن وقت الإدراج بموعد إعلان الإصدار.

> **تنبيه حول طريقة OpenSSL:** هذه الطريقة تتحقق من التوقيع باستخدام المفتاح العام الموجود في الشهادة، لكنها وحدها لا تتحقق من سلسلة الشهادات وصولًا إلى جذر Sigstore، ولا تفحص إثبات (proof) تضمين المدخل في السجل. يقوم `cosign verify-blob` بالفحوص الثلاثة جميعًا. استخدم OpenSSL لفهم الآلية، واعتمد على `cosign` في التحقق الفعلي.

---

## الجزء 2: Zallet، تواقيع GPG

ينشر Zallet مجموعة مختلفة من الأصول:

| الأصل | الغرض |
|---|---|
| `zallet-<version>-<platform>.tar.gz` | الأرشيف الثنائي |
| `.tar.gz.asc` | توقيع GPG منفصل |
| `.tar.gz.intoto.jsonl` | شهادة مصدر SLSA |
| `.tar.gz.provenance.json` | البيانات الوصفية للمصدر |
| `.tar.gz.sbom.spdx` | قائمة مكونات البرمجيات |

### الخطوة 1: حدّد مفتاح التوقيع قبل أن تبحث عنه

شغّل أمر التحقق *أولًا*، قبل استيراد أي مفتاح:

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

هذا ليس فشلًا. فالمخرجات تخبرك بوجود توقيع، وتحدد بالضبط المفتاح الذي تحتاجه **قبل** أن تبدأ البحث عنه. دوّن البصمة والجهة المُصدرة، ثم احصل على المفتاح من مصدر مستقل عن مصدر التنزيل.

> يعرض `gpg` الطوابع الزمنية حسب منطقتك الزمنية المحلية. تُظهر المخرجات أعلاه `WAT` (UTC+1)، بينما يظهر التوقيع نفسه في مناطق أخرى بالقيمة `18:18:44 UTC`. إنها اللحظة نفسها، فلا تعتبر اختلاف المنطقة الزمنية عدم تطابق.

### الخطوة 2: استورد المفتاح وتحقق

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

النتيجة `Good signature` هي ما تبحث عنه. هناك أمران في هذه المخرجات يربكان كثيرين، وكلاهما طبيعي.

### لماذا لا تطابق البصمة ما ورد في الإعلان

يذكر بيان انتقال مفتاح ZODL البصمة `0338 34DD 49DE CF9D BB99 34BC 6C93 CA8E 58E2 6AB1`، لكن `gpg --verify` عرض `1FE9 9324 …  23F0 617F`. يبدو هذا عدم تطابق، لكنه ليس كذلك.

يعرض `gpg` **المفتاح الفرعي** الذي أنشأ التوقيع، بينما يذكر الإعلان **المفتاح الأساسي**. تأكد من العلاقة بينهما بنفسك:

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

السطر `sub` هو المفتاح الفرعي المستخدم في التوقيع، والسطر `pub` هو المفتاح الأساسي. إنهما هوية واحدة وحزمة مفاتيح واحدة. لهذا تعرض مخرجات التحقق البصمتين **كلتيهما**. قارن البصمة *الأساسية* بأي إعلان منشور، واعتبر سطر المفتاح الفرعي مجرد إشارة إلى الجزء الذي قام بالتوقيع من المفتاح.

هذا الفصل بين المفاتيح مقصود، إذ يمكن تدوير مفتاح التوقيع الفرعي أو إلغاؤه دون التخلي عن الهوية الأساسية والثقة التي تراكمت لها.

### معنى التحذير `[unknown]`

```
gpg: WARNING: The key's User ID is not certified with a trusted signature!
```

هذه **ليست** مشكلة في التوقيع. فالتوقيع صالح تشفيريًا، وهذا ما تؤكده النتيجة `Good signature`. أما التحذير فيتحدث عن أمر مختلف: أنت لم تُبلغ GnuPG المحلي لديك بأنك تثق في أن هذا المفتاح يعود فعلًا إلى صاحبه المذكور.

يفصل GnuPG بين سؤالين:

1. **هل وقّع هذا المفتاح هذا الملف؟** تجيب عن ذلك النتيجة `Good signature`. إنها إجابة تشفيرية لا تحتاج إلى تقدير بشري.
2. **هل يعود هذا المفتاح إلى ZODL؟** لا يجيب التشفير عن هذا السؤال إطلاقًا. أنت من يتأكد من ذلك بمقارنة البصمة بمصدر مستقل.

سترى هذا التحذير في كل عملية تحقق تقريبًا، ما لم توقّع المفتاح محليًا بشكل صريح. لا تعتبره فشلًا. **لكن** اعتبر غياب `Good signature` فشلًا.

### الخطوة 3: تحقق من انتقال المفتاح نفسه

انتقلت مهمة توقيع إصدارات Zcash من Electric Coin Company إلى Zcash Open Development Lab في 2026، بعد أن أسس فريق الهندسة والمنتج السابق في ECC شركة ZODL في يناير 2026.

| | المفتاح القديم | المفتاح الجديد |
|---|---|---|
| البصمة | `B1C9 095E AA18 48DB B54D 9DDA 1D05 FDC6 6B37 2CFE` | `0338 34DD 49DE CF9D BB99 34BC 6C93 CA8E 58E2 6AB1` |
| UID | Zcash Master Signing Key (ECC) `<sysadmin@z.cash>` | Zcash Open Development Lab (ZODL) `<sysadmin@zodl.com>` |
| النوع | RSA 3072-bit، أُنشئ في 2023-06-19 | RSA 4096-bit، أُنشئ في 2026-03-23، وتنتهي صلاحيته في 2028-03-22 |
| مكان النشر | `https://apt.z.cash/zcash.asc` | `https://apt.z.cash/zodl.asc` |

الجدول الزمني المنشور: أُنشئ المفتاح الجديد في 2026-03-23، وأُعلن عنه في 2026-03-27، وأصبح التوقيع به حصريًا ابتداءً من 2026-04-23، ومن المقرر إلغاء مفتاح ECC القديم في 2026-06-23.

الإعلان عن تدوير المفاتيح على موقع ويب لا يكون موثوقًا إلا بقدر موثوقية الموقع نفسه. الآلية الصحيحة هي بيان **موقّع بتوقيع واضح (clear-signed) من المفتاحين معًا**، حتى يشهد المفتاح القديم للمفتاح الجديد. وهذا بالضبط ما ينشره ZODL:

```bash
curl -sL https://zodl.com/security/key-transition.txt.asc -o key-transition.txt.asc
curl -sL https://apt.z.cash/zcash.asc -o zcash.asc
gpg --import zcash.asc
gpg --verify key-transition.txt.asc
```

المخرجات الفعلية (مختصرة، وفيها توقيعان على مستند واحد):

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

تظهر نتيجتا `Good signature` على المستند نفسه، الأولى من المفتاح القديم والثانية من المفتاح الجديد. إذا كنت تثق بمفتاح ECC في الإصدارات السابقة، فإن هذه الثقة تنتقل الآن إلى مفتاح ZODL دون أن تضطر إلى الوثوق بـ `zodl.com` أو `apt.z.cash` أو بمنشور في منتدى. ابحث عن هذه الخاصية كلما دوّر مشروع ما مفاتيحه، وإذا غابت فمن حقك أن تسأل عن السبب.

### من أين تحصل على المفتاح، ومن أين لا يجب أن تحصل عليه

مرتبة من الأفضل إلى الأسوأ:

1. **بيان موقّع بالمفتاح السابق**، كما في المثال أعلاه. هذا هو الخيار الأقوى بعد تدوير المفاتيح.
2. **مصدر مستقل عن مصدر التنزيل.** جاء الملف الثنائي من GitHub، وجاء المفتاح من `apt.z.cash`. في هذه الحالة يحتاج المهاجم إلى اختراق المصدرين معًا.
3. **خادم مفاتيح، مع مطابقة المفتاح ببصمة منشورة.** يستطيع أي شخص أن يرفع إلى معظم خوادم المفاتيح مفتاحًا يدّعي أي هوية. ما يجعل هذا الخيار آمنًا هو مقارنة البصمة، وليس خادم المفاتيح نفسه.
4. **الصفحة نفسها التي نزّلت منها الملف الثنائي.** هذا الخيار لا يقدم أي ضمان تقريبًا، لأن من يستطيع استبدال أحدهما يستطيع استبدال الآخر.

قارن دائمًا البصمة **الكاملة** ببصمة المفتاح **الأساسي**. من السهل جدًا توليد تصادمات لمعرّفات المفاتيح القصيرة، وقد استُخدمت هذه التصادمات في هجمات حقيقية.

## الجزء 3: عملية تحقق فاشلة

لا يفيدك التحقق إلا إذا كنت تعرف شكل الفشل. إليك مثالًا حقيقيًا نتج عن إضافة بايت فارغ واحد إلى نهاية أرشيف سليم:

```bash
cp zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz tampered.tar.gz
sha256sum tampered.tar.gz > tampered.sha256
printf '\x00' >> tampered.tar.gz
sha256sum -c tampered.sha256
```

المخرجات الفعلية:

```
tampered.tar.gz: FAILED
sha256sum: WARNING: 1 computed checksum did NOT match
```

رمز الخروج: `1`.

ضع الملخصين جنبًا إلى جنب:

```bash
sha256sum zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz tampered.tar.gz
```

```
86326f5324f4e59cc2008c15f94407cc8d5feacf75d64942164bb5f08eca8c5e  zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz
8d4e2e22adcb014e006fafc71a974f987ba11297587f593cf89eb9bb1feff0b5  tampered.tar.gz
```

أُضيف بايت واحد فقط إلى ملف حجمه 66,992,676 بايت، ومع ذلك لا يجمع بين التجزئتين أي شيء، لا بادئة مشتركة ولا نمط. لا يوجد تطابق جزئي ولا «قريب بما يكفي»: إما أن يتطابق المجموع الاختباري تمامًا، وإما أن الملف ليس الملف الذي أردته.

### ماذا تفعل عندما يحدث ذلك

1. **لا تشغّل الملف الثنائي.** لا تفك ضغطه، ولا تطبّق عليه `chmod +x`.
2. **أعد التنزيل من صفحة الإصدار الرسمية.** معظم حالات الفشل سببها تنزيلات لم تكتمل.
3. **إذا فشل التحقق مرة ثانية، فغيّر مسار الشبكة.** استخدم اتصالًا مختلفًا أو VPN. الفشل الذي يتكرر على شبكات مختلفة يختلف عن الفشل الذي يحدث على شبكة واحدة فقط.
4. **تأكد من أنك تستخدم ملف المجموع الاختباري الصحيح للإصدار الصحيح.** مقارنة الإصدار v6.3.0 بمجاميع الإصدار v6.2.3 ستفشل، وهذه نتيجة صحيحة.
5. **إذا استمر الفشل، فأبلغ عنه.** افتح مشكلة (issue) في مستودع المشروع، أو استخدم جهة الاتصال الأمنية المذكورة في `SECURITY.md` إذا كنت تشك في أن الأمر متعمد. راجع صفحة [أمان منظومة Zcash](/zcash-community/zcash-ecosystem-security) لمعرفة قنوات الإفصاح.
6. **احتفظ بالملف.** الملف الثنائي الذي تم العبث به دليل، فلا تحذفه قبل الإبلاغ.

فشل التحقق من التوقيع أخطر من فشل التحقق من المجموع الاختباري. فعدم تطابق المجموع الاختباري يكون عادةً بسبب تلف الملف، أما ملف سليم يحمل توقيعًا غير صالح فلا يحدث مصادفةً.

---

## الجزء 4: جدول مرجعي

| المشروع | مكان نشر الإصدارات | الطريقة | مصدر المفتاح |
|---|---|---|---|
| **Zebra** | `github.com/ZcashFoundation/zebra/releases` | `SHA256SUMS` + Sigstore bundle | لا يوجد مفتاح، بل هوية CI عبر OIDC الخاص بـ GitHub |
| **Zallet** | `github.com/zcash/zallet/releases` | Detached GPG `.asc`, SLSA provenance, SBOM | `apt.z.cash/zodl.asc`، المفتاح الأساسي `0338 34DD…58E2 6AB1`، والمفتاح الفرعي للتوقيع `1FE9 9324…23F0 617F` |
| **zcashd** | *متوقف* | — | توقف عند الكتلة (block) رقم 3,417,100 في 2026-07-18. لا تثبّته. |
| **Zodl** (سابقًا Zashi) | App Store / Google Play؛ `zodl-inc` على GitHub | Store signing; standalone Android binaries GPG-signed | مفتاح ZODL حسب بيان الانتقال |

> **تنبيه حول التسمية:** تغيّر اسم Zashi إلى **Zodl** في 2026، أولًا على App Store ثم على Google Play. الأدلة الأقدم التي تتحدث عن «Zashi» تتحدث عن المحفظة نفسها في إصداراتها السابقة.

---

## الجزء 5: محافظ الهواتف المحمولة والمحافظ المادية

تختلف طريقة التحقق عندما لا تنزّل الملفات مباشرة.

**متاجر التطبيقات.** لا يمكنك فحص التوقيع بنفسك، فالمتجر هو من يوقّع الحزمة، وأنت تعتمد على مراجعة المتجر وعلى سلامة حساب المطور (developer). ما *يمكنك* التحقق منه هو أنك تنزّل التطبيق الصحيح: قارن اسم الناشر ومعرّف الحزمة بما هو منشور على الموقع الرسمي للمشروع، وليس بنتائج البحث. التطبيقات المنتحلة شائعة، ووجود التطبيق في المتجر لا يثبت أنه أصلي.

**ملفات APK المستقلة لـ Android.** هذه الملفات *يمكن* التحقق منها. ينشر ZODL ملفات Android ثنائية مستقلة موقّعة بـ GPG عبر GitHub Releases، لذا تنطبق عليها خطوات الجزء 2. اختر هذا المسار إذا كنت تريد سلسلة ثقة يمكنك فحصها.

**المحافظ المادية (hardware wallets).** الجهاز نفسه يشهد على صحة برنامجه الثابت، لذا فإن مصدر الثقة هو الجهاز، وليس ملفًا على حاسوبك. راجع [Keystone Zashi](/guides/keystone-zashi) لمعرفة خطوات التحقق من الجهاز. اشترِ الجهاز مباشرة من الشركة المصنّعة، فالعبث في سلسلة التوريد يحدث بين المصنع والمشتري.

---

## قراءات إضافية

- [أمان منظومة Zcash](/zcash-community/zcash-ecosystem-security): سياسة الإفصاح وجهات الاتصال الأمنية
- [العقدة الكاملة لـ Zebra](/zcash-tech/zebra-full-node): تثبيت Zebra بعد التحقق منه
- [دليل مرجعي سريع لـ Zallet](/using-zcash/zallet-quick-reference-guide): استخدام Zallet
- [وثائق Sigstore](https://docs.sigstore.dev/)
- [مستويات مصدر SLSA](https://slsa.dev/)

---

*نُفّذت الأوامر الواردة في هذه الصفحة على Zebra `v6.3.0` وـ Zallet `v0.1.0-beta.2` بتاريخ 2026-08-18. أدوات الإصدار تتغير: إذا اختلفت المخرجات لديك عما تعرضه هذه الصفحة، فاعتمد على نتيجة تشغيلك، ويُرجى فتح طلب سحب.*
