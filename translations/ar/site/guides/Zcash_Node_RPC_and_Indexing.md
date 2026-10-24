<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zcash_Node_RPC_and_Indexing.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="تعديل الصفحة"/>
</a>

# دليل عملي: عقدة Zcash وRPC وفهرسة blockchain

هذه الصفحة دليل عملي للتواصل مع عقدة كاملة Zcash قيد التشغيل عبر JSON-RPC، ولربط مفهرس يمكن للمحافظ الخفيفة والمستكشفات الاستعلام منه. وهي **ليست** دليلاً ثانياً للتثبيت.

لمعرفة كيفية تشغيل حزمة ما بعد-`zcashd` (Zebra + Zallet، وZaino اختياري، والمنافذ، ووحدات التخزين، والإقلاع ذي المرحلتين)، استخدم صفحة [Z3 Stack](/zcash-tech/z3-stack) ومستودع [Z3](https://github.com/ZcashFoundation/z3). وللاطلاع على خلفية عقدة الإجماع، راجع [العقد الكاملة](/zcash-tech/full-nodes) و[العقدة الكاملة Zebra](/zcash-tech/zebra-full-node).

وصلت `zcashd` إلى نهاية عمرها في 18 يوليو 2026. ينبغي أن يستهدف عمل المشغّلين الجدد Zebra (أو [Zakura](/zcash-tech/zakura-node)) بالإضافة إلى محفظة/مفهرس، وليس `zcashd`.

---

## الخلاصة

* يتيح **JSON-RPC** للمشغّلين والمحافظ سؤال عقدة عن رأس السلسلة والأقران، وعن الأرصدة في حالة عملية المحفظة. في Z3، تقدّم Zebra RPC للعقدة؛ وتقدّم Zallet RPC للمحفظة.
* تُعد **Regtest** المكان المناسب لتعلّم الاستدعاءات. يقبل موجّه rpc-router الخاص بـ Z3 على `http://127.0.0.1:8181` بيانات `zebra` / `zebra` ويحوّل أساليب العقدة إلى Zebra وأساليب المحفظة إلى Zallet.
* تستخدم **Mainnet وtestnet** مصادقة ملفات تعريف الارتباط على Zebra. لا تنسخ اسم المستخدم/كلمة المرور الخاصة بـ regtest إلى عقدة عامة.
* تُعد **الفهرسة** مهمة منفصلة عن التحقق. تتحقق Zebra. وتقدّم [Zaino](/zcash-tech/zaino) (Z3 `--profile indexer`) واجهة gRPC متوافقة مع lightwalletd. أما [Ztreamer](https://github.com/distractedm1nd/ztreamer) فهو مفهرس مدعوم بـ Zakura؛ وليس مما تشحنه Z3.
* إن JSON-RPC الخاص بـ Zaino وgRPC الاختياري للمفهرس الخاص بـ Zebra مخصصان للاتصال المحلي أو لشبكة موثوقة. لا تكشفهما دون مصادقة على الإنترنت العام.

---

## أي عملية تجيب عن أي استدعاء

| ما الذي تريده | تواصل مع | منفذ المضيف لـ Z3 mainnet | ملاحظات |
| --- | --- | --- | --- |
| رأس السلسلة، الأقران، `getblockchaininfo` | JSON-RPC لـ Zebra | 8232 | مصادقة بملف تعريف الارتباط |
| رصيد المحفظة، العناوين، الإرسال | RPC لـ Zallet | 28232 | عملية منفصلة؛ برمجية تجريبية |
| الكتل المدمجة للمحافظ الخفيفة | gRPC لـ Zaino | 8137 | فقط مع `--profile indexer`؛ h2c بنص عادي |
| وكيل JSON-RPC للمستكشف / الصنبور | JSON-RPC لـ Zaino | 8237 | شبكة موثوقة فقط |
| تدرّب على كل ما سبق دون مزامنة | rpc-router لـ Z3 regtest | 8181 | اسم المستخدم `zebra` / كلمة المرور `zebra` |

مصفوفة المنافذ وأسماء مشاريع Compose: [Z3 Stack](/zcash-tech/z3-stack) و[`z3-contract.yaml`](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml).

---

## تدرّب على regtest أولاً

من نسخة Z3 محلية، بعد `./scripts/regtest-init.sh` و`docker compose --env-file .env.regtest up -d`:

```bash
# Node method (Zebra)
curl -s -X POST -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"getblockchaininfo","params":[],"id":1}' \
  http://127.0.0.1:8181

# Wallet method (Zallet)
curl -s -X POST -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"getwalletinfo","params":[],"id":2}' \
  http://127.0.0.1:8181
```

تتضمن نتيجة `getblockchaininfo` السليمة كلاً من `"blocks"` وخريطة `"upgrades"`. إذا علّق curl، فالموجّه ليس قيد التشغيل؛ وإذا تلقيت `401`، فأنت تتصل بـ Zebra مباشرةً بدلاً من الموجّه (توجد Zebra المباشرة على regtest في `29232` وما زالت تتوقع بيانات اعتماد الموجّه ما لم تغيّرها).

سير عمل regtest الكامل، بما في ذلك تعدين كتل التفعيل: [Z3 `docs/regtest.md`](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md).

---

## JSON-RPC لـ Mainnet / testnet (مصادقة ملفات تعريف الارتباط)

على mainnet وtestnet، تقرأ Zallet وخدمة Zaino الاختيارية **وحدة تخزين مشتركة لملف تعريف الارتباط**. يُعاد توليد ملف تعريف الارتباط هذا عند الإقلاع؛ وهو ليس هدفاً للنسخ الاحتياطي.

**لا** تنشر JSON-RPC لـ Zebra على الإنترنت العام. استدعه من شبكة Compose (`zebra:8232`) أو من المضيف فقط إذا ربطته بالاتصال المحلي.

فحوصات نموذجية للمشغّل بعد أن تصبح Zebra في حالة `/ready`:

```bash
# Wait until Zebra is synced (Z3 helper)
./scripts/check-zebra-readiness.sh

# Then start Zallet
docker compose --env-file .env.mainnet up -d
```

إن `getblocktemplate` / `getmininginfo` هما RPC للتعدين. تحتاج المجمعات التي كانت لا تزال تتوقع عملية `zcashd` واحدة إلى Zebra (أو Zakura) للقوالب، بالإضافة إلى أي محفظة تستخدمها لمعاملة coinbase. راجع [مجمعات التعدين Zcash](/using-zcash/zcash-mining-pools) ودليل [الترحيل](/guides/migration-guide-zcashd-to-zebrad-zallet).

---

## إرفاق مفهرس

التحقق والفهرسة مهمتان مختلفتان.

### Zaino (ما تشحنه Z3)

تقرأ Zaino بيانات Zebra وتقدّم واجهة gRPC متوافقة مع lightwalletd بالإضافة إلى وكيل JSON-RPC. لا تحتاج Zallet إلى حاوية Zaino المستقلة؛ فهي تضم مكتبات Zaino وتتواصل مع Zebra عبر JSON-RPC. شغّل Zaino المستقلة عندما تريد محافظ خفيفة أو مستكشفات أو صنابير خارجية:

```bash
docker compose --env-file .env.mainnet --profile indexer up -d
```

انتظر حتى تتم مزامنة Zebra قبل توجيه العملاء إلى Zaino. قد يبطئ مفهرس مجمّع في طور اللحاق وبمستوى عالٍ من تزامن الجلب مُتحقق Zebra؛ أبقِ `fetch_concurrency` في الأرقام الأحادية المنخفضة حتى يلحق المفهرس.

gRPC لـ Regtest (نص عادي؛ المنفذ `28137`):

```bash
# From the Z3 repo, after: scripts/vendor.sh zaino
# and: docker compose --env-file .env.regtest --profile indexer up -d zaino

grpcurl -plaintext \
  -import-path vendor/zaino/zaino-proto/proto \
  -proto service.proto \
  127.0.0.1:28137 \
  cash.z.wallet.sdk.rpc.CompactTxStreamer/GetLightdInfo

grpcurl -plaintext \
  -import-path vendor/zaino/zaino-proto/proto \
  -proto service.proto \
  -d '{}' \
  127.0.0.1:28137 \
  cash.z.wallet.sdk.rpc.CompactTxStreamer/GetLatestBlock
```

تعمل gRPC لـ Zaino عبر h2c بنص عادي على جميع الشبكات. أنهِ TLS عند وكيل عكسي إذا كان أي شيء خارج المضيف سيتصل. التفاصيل: [Zaino](/zcash-tech/zaino) و[Z3 `docs/regtest.md`](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md).

### مفهرسات أخرى (ليست Z3)

* **lightwalletd** — خادم الكتل المدمجة الأقدم. لا يزال منشوراً في بيئات فعلية؛ Zaino هو مسار الخلف لهذا الدور.
* **Ztreamer** — مفهرس مدعوم بـ Zakura وتنفيذ لـ `CompactTxStreamer`. ليس خدمة Z3. راجع مستودع [Ztreamer](https://github.com/distractedm1nd/ztreamer).
* **Zebra `rpc.indexer_listen_addr`** — مستمع gRPC اختياري *داخل* Zebra. لا تتطلبه Z3 ولا تنشره إلى المضيف.

---

## أخطاء شائعة

**استدعاء أساليب المحفظة على Zebra.** تنتمي `getwalletinfo` وRPC للإرسال إلى Zallet (أو محفظة أخرى)، وليس إلى عقدة الإجماع.

**بدء Zallet قبل أن تصبح Zebra `/ready`.** ستدخل Zallet في حلقة إعادة تشغيل. استخدم `scripts/check-zebra-readiness.sh` على mainnet/testnet.

**نسخ `zebra`/`zebra` الخاصة بـ regtest إلى mainnet.** مصادقة ملفات تعريف الارتباط هي الإعداد الافتراضي لـ mainnet/testnet لسبب وجيه.

**معاملة Zaino كعقدة كاملة.** تتحقق Zebra (أو Zakura). وتفهرس Zaino.

**كشف JSON-RPC لـ Zaino أو gRPC للمفهرس لـ Zebra علناً.** تلك النقاط الطرفية مخصصة للاتصال المحلي أو لشبكة خاصة موثوقة.

**افتراض أن كل محفظة خفيفة تتحدث Zaino بالفعل.** تحقّق من الإصدار الحالي للمحفظة مقابل البروتوكول الذي تنفذه فعلياً.

---

## صفحات ذات صلة

* [Z3 Stack](/zcash-tech/z3-stack) — التثبيت، المنافذ، وحدات التخزين، الإقلاع ذو المرحلتين
* [Zaino](/zcash-tech/zaino) — دور المفهرس وملاحظات المشغّل
* [العقد الكاملة](/zcash-tech/full-nodes)
* [العقدة الكاملة Zebra](/zcash-tech/zebra-full-node)
* [عقد المحافظ الخفيفة](/zcash-tech/lightwallet-nodes)
* [دليل الترحيل: من zcashd إلى Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet)
* [Zingolib ودليل Zaino](/guides/zingolib-and-zaino-tutorial)

## الموارد

* مستودع [Z3](https://github.com/ZcashFoundation/z3)
* [دليل Z3 العملي لـ regtest (curl / grpcurl)](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md)
* [الأسئلة الشائعة لـ Z3](https://github.com/ZcashFoundation/z3/blob/main/docs/faq.md)
* [Zebra](https://zebra.zfnd.org/)
* [Zaino](https://github.com/zingolabs/zaino)
* كتاب [Zallet](https://zcash.github.io/zallet/)
* [Ztreamer](https://github.com/distractedm1nd/ztreamer)

**آخر تحديث:** سبتمبر 2026
