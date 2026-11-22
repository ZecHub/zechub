<a href="https://github.com/ZecHub/zechub/edit/main/site/Using_Zcash/Shielded_Newsletter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# النشرة الإخبارية المحمية

> أرسل note بصيغة markdown إلى قائمة من العناوين (addresses) المحمية على شكل مذكرات (memos) Zcash، باستخدام Zallet. تبقى قائمة المستلمين و note بعيدتين عن العناوين الشفافة (transparent).

النشرة الإخبارية المحمية هي مجموعة متتالية من المعاملات (transactions) المحمية. يدفع كل مُخرَج مبلغًا ضئيلًا إلى عنوان موحّد (Unified Address) للمستلم، ويحمل الجزء التالي من note في حقل المذكرة. يتولى Zallet بناء هذه المعاملات وإرسالها. أما Zebra و Zaino فيوفّران بيانات السلسلة (chain) فقط.

توجد السكربتات في [`site/tutorials/shieldedNewsletter`](https://github.com/ZecHub/zechub/tree/main/site/tutorials/shieldedNewsletter). لقد كُتبت لإصدار مبكر من Zallet، وتشغيلها كما هي على الإصدار الحالي غير آمن. هذه الصفحة هي الإجراء المحدَّث. تم التحقق منها مقابل Zallet `v0.1.0-beta.3` وكتاب Zallet بتاريخ 7 أكتوبر 2026.

## ما تحتاج إليه

- Zebra متزامن بالكامل، مع ربط RPC بـ localhost.
- Zaino متزامن مع عقدة (node) Zebra تلك.
- Zallet `v0.1.0-beta.3` أو أحدث، بإصدار المحفظة (wallet)، مع ربط RPC الخاص به بـ localhost. يذكر الكتاب أن `z_sendmany` مُنفَّذ. تُرفض الرسوم (fee) الرقمية: إذا مرّرت `fee`، فيجب أن تكون `null`، لأن Zallet يستخدم دائمًا رسوم ZIP 317.
- حساب مموَّل يمكن لعنوانه الموحّد إنفاق الأموال المحمية.
- العناوين الموحّدة للمستلمين. إرسال مذكرة إلى عنوان شفاف يُعدّ خطأً.

لا تضع عنوانًا مموَّلًا أو ملف cookie في الويكي أو في سكربت مُودَع (committed). يحتوي `txBuilderFromFile.sh` الحالي على عنوان موحّد مكتوب بشكل ثابت في الشيفرة. استبدله محليًا ولا تُودِعه.

## إعداد Zallet

أنشئ ملف إعدادات بـ Zallet الذي تشغّله، ثم وجّهه إلى Zebra و Zaino. يستخدم المثال في الدليل القديم `as_of_version = "0.0.0"` ومسارًا منزليًا شخصيًا. تعامل مع ذلك الملف كلقطة، لا كقالب.

```bash
zallet init
zallet -c ~/.zallet/zallet.toml start
zallet -c ~/.zallet/zallet.toml rpc help
```

يجب أن يتضمن `rpc help` كلًّا من `z_sendmany` و `z_getoperationstatus` و `z_getoperationresult`. اربط RPC بـ `127.0.0.1` فقط.

## قائمة المستلمين

عنوان موحّد واحد في كل سطر، دون علامات اقتباس، ودون أسطر فارغة. يقرأ السكربت `daoAddresses.md`. يذكر ملف readme القديم `daoAddress.md`. هذا الملف غير موجود في المستودع، والأسماء غير متطابقة.

```text
u1...
u1...
```

## إرسال مذكرة واحدة

يعمل `z_sendmany` بشكل غير متزامن. فهو يُرجع معرّف عملية. استعلم من `z_getoperationstatus` دوريًا حتى تصبح الحالة `success` أو خطأً. الانتظار الثابت لمدة 5 ثوانٍ، وهو ما يفعله السكربت، يُضيّع النتيجة عندما يستغرق البناء وقتًا أطول. يستهلك `z_getoperationresult` العملية، لذا لا تستدعِه حتى تصبح الحالة نهائية.

تُحذف الرسوم. يحسب Zallet رسوم ZIP 317. لا تمرّر رقمًا.

```bash
MEMO_HEX=$(printf '%s' "$NOTE" | xxd -p -c 9999)
zallet -c ~/.zallet/zallet.toml rpc z_sendmany \
  "$FROM_UA" \
  "[{\"address\":\"$TO_UA\",\"amount\":0.0001,\"memo\":\"$MEMO_HEX\"}]"
```

حقل المذكرة بصيغة hex خام، بحد أقصى 512 بايت. يُرمّز `ascii2hex` أحرف ASCII فقط. تفشل أي note تحتوي على حرف غير ASCII. أما `xxd` أو `python3 -c 'import sys; sys.stdout.write(sys.stdin.buffer.read().hex())'` فيتعامل مع UTF-8.

تكون سياسة الخصوصية (privacy) افتراضيًا `FullPrivacy`. وهذا هو الإعداد الافتراضي الصحيح لمستلم محمي. لا تمرّر `AllowFullyTransparent`.

## عيوب السكربت

هذه العيوب موجودة في الشجرة بتاريخ 8 أكتوبر 2026. لا تشغّل `shieldNewsletter.sh` حتى يتم إصلاحها.

- ينقص `[[ bytesInFile -lt 512 ]]` وجود `$`. لا يُنفَّذ فرع المذكرة الواحدة أبدًا.
- تخزّن حلقة التقسيم البيانات بصيغة hex، ثم يفك `hex2ascii` ترميزها، ثم يُرمّزها `txBuilderFromFile.sh` مرة أخرى. لا يُرسَل الجزء الأخير ما لم يتجاوز سطر لاحق حد 512. لا يُقسَّم السطر الطويل. بل يُرسَل كاملًا وقد يتجاوز حد المذكرة البالغ 512 بايت.
- يستدعي `txBuilderFromFile.sh` الأمر `./zallet rpc` دون مسار ملف الإعدادات، ويتوقع وجود الملف التنفيذي في الدليل الحالي. استخدم `zallet -c <config> rpc`.
- يتواصل `toCurl.sh` مع Zebra على المنفذ 8232 باستخدام cookie، ويستدعي `getinfo` و `sendmany`. لا يوفّر Zallet الأمر `sendmany`. كما تستخدم حلقة انتظار التعدين (mining) `[[ chainHeight -gt temp ]]` دون `$`، لذا فهي لا تنتظر.
- يُمرَّر `z_gettotalbalance 0 true` كوسائط موضعية إضافية. تحقق من `rpc help z_gettotalbalance` على الملف التنفيذي الذي تشغّله قبل استخدام هذا الاستدعاء.
- يرسل كل جزء `0.0001` ZEC إلى كل مستلم. وتُضاف رسوم ZIP 317 فوق ذلك. إرسال note طويلة إلى عناوين كثيرة يُنفق أكثر من مبالغ الغبار (dust).

## بعد الإصلاح

يجب على أداة التشغيل المصحَّحة أن:

1. تقرأ note كبايتات وتقسّمها عند حدود 512 بايت، لا على أساس الأسطر.
2. تُرمّز كل جزء بصيغة hex مرة واحدة.
3. تستدعي `zallet -c <config> rpc z_sendmany` بالعنوان الموحّد المموَّل، ومصفوفة المستلمين، ودون وسيط للرسوم.
4. تستعلم من `z_getoperationstatus` دوريًا عن معرّف العملية ذاك.
5. تسجّل txid فقط بعد `success`.

تبقى صفحة الدليل القديمة متاحة في [سكربتات النشرة الإخبارية المحمية](https://github.com/ZecHub/zechub/blob/main/site/tutorials/shieldedNewsletter/readme.md). استخدم هذه الصفحة للإجراء.
