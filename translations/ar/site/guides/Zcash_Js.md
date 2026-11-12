# دليل مطوّري JS لـZcash

**zcash.js** (`@zcashlabs/zcash.js`) هي SDK تجريبية لـTypeScript/JavaScript أصدرتها Zcash Labs في 26 أكتوبر 2026. تتيح للمطورين بناء محافظ، وعملاء خفيفة، ولوحات معلومات، وتطبيقات تتفاعل مع شبكة Zcash من Node.js والمتصفح.

> **الحالة**: تجريبية (v0.1.1). تتطلب محافظ العقدة الدائمة حاليًا Linux + `flock`. لم يُؤهَّل بعد بصورة كاملة الإرسال/الاستقبال المباشر في المتصفح وترحيل قاعدة بيانات المحفظة التاريخية. تحقّق دائمًا من الوثائق الرسمية قبل استخدامها في بيئة الإنتاج.

## ما الذي توفره SDK

- `createPublicClient` — استعلامات JSON-RPC عديمة الحالة ومراقبة المعاملات
- `createLightClient` — استعلامات وتدفقات lightwallet (gRPC أصلي على العقدة، وgRPC-Web في المتصفح)
- `createWalletClient` — حسابات محلية، ومسح، ومقترحات، وتوقيع، وإرسال، واستعادة المدفوعات المسجلة
- مبالغ `bigint` دقيقة، والتحقق من الشبكة، وأدوات العرض/العناوين، وأدوات PCZT
- محرك محفظة أساسي مجمّع، وعمال، وأصول إثبات Sapling محلية (لا يلزم تثبيت Rust بشكل منفصل)

## التثبيت

استخدم **Node.js 22.23.4** (الإصدار المثبّت بواسطة الحزمة).

```bash
npm install @zcashlabs/zcash.js@0.1.1
```

- يُفضّل استخدام TypeScript مع ESM (`"type": "module"` في `package.json`).
- تعمل تطبيقات المتصفح عبر أداة تجميع ESM حديثة. ستُنتج أداة التجميع أصول WASM والعامل والإثبات المؤجلة — ويجب نشرها مع تطبيقك.

## أول استعلام للسلسلة (من دون محفظة)

```ts
import { createLightClient } from '@zcashlabs/zcash.js';

const light = await createLightClient('https://testnet.zec.rocks:443', {
  network: 'testnet',
});

const tip = await light.getTip();
console.log(tip.height, tip.hash);
```

- يؤدي حذف خيار `network` إلى استخدام mainnet افتراضيًا (وفّر نقطة نهاية مطابقة).
- يتوفر أيضًا `createPublicClient` لاستخدام JSON-RPC الخالص.

## فتح محفظة

```ts
import { createWalletClient } from '@zcashlabs/zcash.js';

const wallet = await createWalletClient('https://testnet.zec.rocks:443', {
  network: 'testnet',
  storage: { kind: 'node-filesystem', path: './my-wallet' }, // Linux only for durable storage
});

try {
  const accounts = await wallet.accounts.list();
  console.log(accounts);
} finally {
  await wallet.close();
}
```

### خيارات التخزين

| البيئة     | خيار التخزين                                      |
|-----------------|-----------------------------------------------------|
| العقدة (دائم)  | `{ kind: 'node-filesystem', path: './my-wallet' }`  |
| المتصفح         | `{ kind: 'browser-opfs', name: 'my-wallet' }`       |
| مؤقت      | `{ kind: 'memory' }`                                |

**الإعدادات الافتراضية المهمة** (اعتبارًا من v0.1.1):

- الإنفاق والباقي Ironwood-فقط افتراضيًا
- قاعدة الرسوم: ZIP-317
- التأكيدات: 3 موثوقة / 3 غير موثوقة
- استدعِ دائمًا `wallet.sync()` قبل اقتراح دفعة

## سير عمل المحفظة عالي المستوى

1. أنشئ أو استورد حساب mnemonic وأرفق موقّعًا
2. استدعِ `wallet.sync()`
3. اطلب عنوان استلام (يُفضّل Unified / Ironwood)
4. أنشئ مقترحًا → راجعه → استدعِ `wallet.send()`
5. راقب التأكيد أو استخدم العمليات المسجلة للاستعادة بعد إعادة التشغيل

يمتلك التطبيق بايتات mnemonic. امسحها من الذاكرة عندما لا تعود إليها حاجة. اعرض دائمًا واجهة موافقة واضحة تُظهر كل مستلم ومبلغ ورسم ومجموعة وانتهاء صلاحية.

اطّلع على الشرح الرسمي لمحفظة [Wallet](https://zcashlabs.github.io/zcashjs/api/walkthrough.html) للحصول على مثال عملي كامل.

## ملاحظات المنصة والقيود الحالية

| الإمكانية            | العقدة                              | المتصفح                          |
|-----------------------|-----------------------------------|----------------------------------|
| الحزمة               | العقدة 22.23.4 + ESM                | أداة تجميع ESM حديثة + WebAssembly |
| الاستعلامات الخفيفة         | gRPC أصلي                       | gRPC-Web + CORS                  |
| التخزين الدائم       | Linux + `flock` فقط              | OPFS (سياق آمن)            |
| التخزين المؤقت    | الذاكرة                            | الذاكرة                           |

قيود إضافية:

- التخزين الدائم للعقدة حاليًا Linux-فقط
- لا توجد بعد خزنة أسرار مُدارة، أو خدمة إثبات عن بُعد، أو تكامل مع موقّع عتادي
- لا يُعلن عن التخزين على أنه مشفّر أثناء السكون
- لا تفتح تخزين المحفظة نفسه من عدة عمليات أو علامات تبويب متصفح في الوقت نفسه
- أغلق المحفظة دائمًا بشكل سليم باستخدام `await wallet.close()`

## الخطوات التالية

- التثبيت الرسمي وأول طلب: [التثبيت](https://zcashlabs.github.io/zcashjs/api/installation.html)
- فتح محفظة وإعدادها: [فتح محفظة](https://zcashlabs.github.io/zcashjs/api/wallet-runtime.html)
- سير العمل الكامل: [شرح المحفظة](https://zcashlabs.github.io/zcashjs/api/walkthrough.html)
- مرجع API: [مرجع API](https://zcashlabs.github.io/zcashjs/api/reference.html)
- حدود المنصة: [إعداد العقدة والمتصفح](https://zcashlabs.github.io/zcashjs/api/platforms.html)


## الموارد الرسمية

- كتاب المطورين: [https://zcashlabs.github.io/zcashjs/](https://zcashlabs.github.io/zcashjs/)
- مستودع GitHub: [https://github.com/zcashlabs/zcashjs](https://github.com/zcashlabs/zcashjs)
- حزمة npm: `@zcashlabs/zcash.js`


---

*يستند هذا الدليل إلى `@zcashlabs/zcash.js@0.1.1` (أكتوبر 2026). تخضع SDK لتطوير نشط — فضّل دائمًا الوثائق الرسمية للحصول على أحدث API والقيود.*
