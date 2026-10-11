<a href="https://github.com/ZecHub/zechub/edit/main/site/Using_Zcash/Shielded_Newsletter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="تحرير الصفحة"/>
</a>

# النشرة الإخبارية المحمية

> أرسل ملاحظة Markdown إلى قائمة من العناوين المحمية كمذكرات Zcash، باستخدام Zallet. تبقى قائمة المستلمين والملاحظة خارج العناوين الشفافة.

النشرة الإخبارية المحمية هي سلسلة من المعاملات المحمية. يدفع كل مخرج مبلغًا صغيرًا إلى Unified Address خاص بالمستلم ويحمل الجزء التالي من الملاحظة في حقل المذكرة. ينشئ Zallet هذه المعاملات ويرسلها. يوفر Zebra وZaino بيانات السلسلة فقط.

توجد السكربتات في [`site/tutorials/shieldedNewsletter`](https://github.com/ZecHub/zechub/tree/main/site/tutorials/shieldedNewsletter). كُتبت لإصدار مبكر من Zallet وليست آمنة للتشغيل كما هي مع الإصدار الحالي. هذه الصفحة هي الإجراء المحدّث. تم التحقق منها مقابل Zallet `v0.1.0-beta.3` وكتاب Zallet حتى 7 أكتوبر 2026.

## ما تحتاج إليه

- Zebra متزامن بالكامل، مع ربط RPC بـ localhost.
- Zaino متزامن مع عقدة Zebra تلك.
- Zallet `v0.1.0-beta.3` أو أحدث، إصدار المحفظة، مع ربط RPC الخاص به بـ localhost. يسرد الكتاب `z_sendmany` على أنه منفذ. تُرفض الرسوم الرقمية: إذا مررت `fee`، فيجب أن تكون `null`، لأن Zallet يستخدم دائمًا رسم ZIP البالغ 317.
- حساب ممول يمكن أن ينفق فيه Unified Address الأموال المحمية.
- عناوين Unified Addresses للمستلمين. المذكرة على عنوان شفاف خطأ.

لا تضع عنوانًا ممولًا أو ملف تعريف ارتباط في الويكي أو في سكربت مُلتزم به. يحتوي `txBuilderFromFile.sh` الحالي على Unified Address مضمّن في الشيفرة. استبدله محليًا ولا تُودعه.

## إعداد Zallet

أنشئ إعدادًا باستخدام Zallet الذي تشغله، ثم وجّهه إلى Zebra وZaino. تستخدم العينة في الدليل القديم `as_of_version = "0.0.0"` ومسارًا شخصيًا في الدليل الرئيسي. تعامل مع ذلك الملف كلقطة، لا كقالب.

```bash
zallet init
zallet -c ~/.zallet/zallet.toml start
zallet -c ~/.zallet/zallet.toml rpc help
```

يجب أن يسرد `rpc help` كلًا من `z_sendmany` و`z_getoperationstatus` و`z_getoperationresult`. اربط RPC بـ `127.0.0.1` فقط.

## قائمة المستلمين

عنوان Unified Address واحد في كل سطر، بلا علامات اقتباس وبلا أسطر فارغة. يقرأ السكربت `daoAddresses.md`. يذكر الملف التمهيدي القديم `daoAddress.md`. ذلك الملف غير موجود في المستودع، والأسماء غير متطابقة.

```text
u1...
u1...
```

## إرسال مذكرة واحدة

يعمل `z_sendmany` بصورة غير متزامنة. ويعيد معرّف عملية. استعلم عن `z_getoperationstatus` حتى تصبح الحالة `success` أو يحدث خطأ. إن انتظارًا ثابتًا لمدة 5 ثوانٍ، وهو ما يفعله السكربت، يفقد النتيجة عندما يستغرق البناء وقتًا أطول. يستهلك `z_getoperationresult` العملية، لذا لا تستدعه حتى تصبح الحالة نهائية.

يُحذف الرسم. يحسب Zallet ZIP 317. لا تمرر رقمًا.

```bash
MEMO_HEX=$(printf '%s' "$NOTE" | xxd -p -c 9999)
zallet -c ~/.zallet/zallet.toml rpc z_sendmany \
  "$FROM_UA" \
  "[{\"address\":\"$TO_UA\",\"amount\":0.0001,\"memo\":\"$MEMO_HEX\"}]"
```

حقل المذكرة هو hex خام، بحد أقصى 512 بايتًا. يرمّز `ascii2hex` ASCII فقط. تفشل الملاحظة التي تحتوي على أي محرف غير ASCII. يتولى `xxd` أو `python3 -c 'import sys; sys.stdout.write(sys.stdin.buffer.read().hex())'` التعامل مع UTF-8.

تكون سياسة الخصوصية افتراضيًا `FullPrivacy`. هذا هو الإعداد الافتراضي الصحيح لمستلم محمي. لا تمرر `AllowFullyTransparent`.

## عيوب السكربت

هذه موجودة في الشجرة حتى 8 أكتوبر 2026. لا تشغّل `shieldNewsletter.sh` حتى تُصلح.

- يفتقد `[[ bytesInFile -lt 512 ]]` إلى `$`. لا يُشغَّل فرع المذكرة المفردة أبدًا.
- تخزن حلقة الأجزاء hex، ثم يفك `hex2ascii` ترميزه، ثم يعيد `txBuilderFromFile.sh` ترميزه. لا يُفرَّغ الجزء الأخير إلا إذا تجاوز سطر لاحق 512. لا يُقسَّم السطر الطويل. يُرسل كاملًا وقد يتجاوز مذكرة الـ512 بايتًا.
- يستدعي `txBuilderFromFile.sh` `./zallet rpc` بلا مسار إعداد، ويتوقع وجود الملف التنفيذي في الدليل الحالي. استخدم `zallet -c <config> rpc`.
- يتصل `toCurl.sh` بـ Zebra على المنفذ 8232 باستخدام ملف تعريف ارتباط، ويستدعي `getinfo` و`sendmany`. لا يوفر Zallet `sendmany`. تستخدم حلقة انتظار التعدين أيضًا `[[ chainHeight -gt temp ]]` دون `$`، لذا فهي لا تنتظر.
- يُمرَّر `z_gettotalbalance 0 true` كوسائط موضعية إضافية. تحقق من `rpc help z_gettotalbalance` في الملف التنفيذي الذي تشغله قبل استخدام ذلك الاستدعاء.
- يرسل كل جزء `0.0001` ZEC إلى كل مستلم. يضاف رسم ZIP البالغ 317 فوق ذلك. تنفق ملاحظة طويلة إلى عناوين كثيرة أكثر من مبالغ الغبار.

## بعد الإصلاح

يجب أن يقوم مشغّل مصحح بما يلي:

1. قراءة الملاحظة كبايتات وتقسيمها عند حدود 512 بايتًا، لا عند الأسطر.
2. ترميز كل جزء إلى hex مرة واحدة.
3. استدعاء `zallet -c <config> rpc z_sendmany` باستخدام UA الممول ومصفوفة المستلمين ومن دون وسيطة رسم.
4. الاستعلام عن `z_getoperationstatus` لمعرّف العملية ذلك.
5. تسجيل txid فقط بعد `success`.

تبقى صفحة الدليل القديم في [سكربتات النشرة الإخبارية المحمية](/tutorials/shieldednewsletter/readme). استخدم هذه الصفحة للإجراء.
