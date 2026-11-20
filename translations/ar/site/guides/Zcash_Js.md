# دليل المطور لـ Zcash JS

**zcash.js** (`@zcashlabs/zcash.js`) هي SDK تجريبية لـ TypeScript/JavaScript أصدرتها Zcash Labs في 26 أكتوبر 2026. تتيح للمطورين بناء المحافظ (wallets) والعملاء الخفيفين (light clients) ولوحات المعلومات (dashboards) والتطبيقات التي تتفاعل مع شبكة Zcash من Node.js ومن المتصفح.

> **الحالة**: تجريبية (v0.1.1). تتطلب محافظ Node الدائمة حاليًا Linux + `flock`. لم يُتحقَّق بعد بشكل كامل من الإرسال والاستلام المباشر في المتصفح، ولا من ترحيل قاعدة بيانات المحفظة التاريخية. تحقق دائمًا من الوثائق الرسمية قبل الاستخدام في بيئة الإنتاج.

## ما توفره SDK

- `createPublicClient` — استعلامات JSON-RPC عديمة الحالة ومراقبة المعاملات (transactions)
- `createLightClient` — استعلامات ودفقات lightwallet (gRPC أصلي على Node، وgRPC-Web في المتصفح)
- `createWalletClient` — الحسابات المحلية، والمسح، والمقترحات، والتوقيع، والإرسال، واستعادة المدفوعات (payments) المسجلة
- مبالغ `bigint` دقيقة، والتحقق من الشبكة، وأدوات (tools) العرض والعناوين (addresses)، وأدوات PCZT المساعدة
- محرك محفظة أساسي مضمّن، وعمّال (workers)، وأصول إثبات Sapling محلية (دون الحاجة إلى تثبيت Rust بشكل منفصل)

## التثبيت

استخدم **Node.js 22.23.4** (الإصدار الذي تثبّته الحزمة).

```bash
npm install @zcashlabs/zcash.js@0.1.1
```

- يُفضَّل استخدام TypeScript مع ESM (`"type": "module"` في `package.json`).
- تعمل تطبيقات المتصفح عبر أداة تجميع ESM حديثة. ستُخرج أداة التجميع أصول WASM ذات التحميل الكسول والعمّال وأصول الإثبات — ويجب نشر هذه الأصول مع تطبيقك.

## أول استعلام على السلسلة (بدون محفظة)

```ts
import { createLightClient } from '@zcashlabs/zcash.js';

const light = await createLightClient('https://testnet.zec.rocks:443', {
  network: 'testnet',
});

const tip = await light.getTip();
console.log(tip.height, tip.hash);
```

- يؤدي حذف الخيار `network` إلى استخدام الشبكة الرئيسية (mainnet) افتراضيًا (وفّر نقطة نهاية مطابقة).
- يتوفر أيضًا `createPublicClient` لاستخدام JSON-RPC فقط.

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
| Node (دائم)  | `{ kind: 'node-filesystem', path: './my-wallet' }`  |
| المتصفح         | `{ kind: 'browser-opfs', name: 'my-wallet' }`       |
| مؤقت      | `{ kind: 'memory' }`                                |

**الإعدادات الافتراضية المهمة** (اعتبارًا من v0.1.1):

- يقتصر الإنفاق والفكّة افتراضيًا على Ironwood
- قاعدة الرسوم (fee): ZIP-317
- التأكيدات: 3 موثوقة / 3 غير موثوقة
- استدعِ دائمًا `wallet.sync()` قبل اقتراح عملية دفع

## سير عمل المحفظة عالي المستوى

1. أنشئ حسابًا بعبارة استذكارية (mnemonic) أو استورده، وأرفق به موقِّعًا
2. استدعِ `wallet.sync()`
3. اطلب عنوان استلام (يُفضَّل Unified / Ironwood)
4. أنشئ مقترحًا → راجعه → استدعِ `wallet.send()`
5. راقب التأكيد، أو استخدم العمليات المسجلة للاستعادة بعد إعادة التشغيل

يمتلك التطبيق بايتات العبارة الاستذكارية. امسحها من الذاكرة عندما لا تعود بحاجة إليها. اعرض دائمًا واجهة موافقة واضحة تُظهر كل مستلم، وكل مبلغ، والرسوم، والمجمّع (pool)، وتاريخ انتهاء الصلاحية.

راجع [الدليل التفصيلي الرسمي للمحفظة](https://zcashlabs.github.io/zcashjs/api/walkthrough.html) للاطلاع على مثال عملي كامل.

## إرشادات المنصة والقيود الحالية

| القدرة            | Node                              | المتصفح                          |
|-----------------------|-----------------------------------|----------------------------------|
| الحزمة               | Node 22.23.4 + ESM                | أداة تجميع ESM حديثة + WebAssembly |
| الاستعلامات الخفيفة         | gRPC أصلي                       | gRPC-Web + CORS                  |
| التخزين الدائم       | Linux + `flock` فقط              | OPFS (سياق آمن)            |
| التخزين المؤقت    | الذاكرة                            | الذاكرة                           |

قيود إضافية:

- يقتصر التخزين الدائم على Node حاليًا على Linux
- لا توجد بعد خزنة أسرار مُدارة، ولا خدمة إثبات عن بُعد، ولا تكامل مع موقِّع عتادي
- **لا** يُعلَن أن التخزين يستخدم التشفير (encryption) أثناء السكون
- لا تفتح تخزين المحفظة نفسه من عدة عمليات أو علامات تبويب في المتصفح في الوقت نفسه
- أغلق المحفظة دائمًا بشكل سليم باستخدام `await wallet.close()`

## الخطوات التالية

- التثبيت الرسمي وأول طلب: [التثبيت](https://zcashlabs.github.io/zcashjs/api/installation.html)
- فتح محفظة وتهيئتها: [فتح محفظة](https://zcashlabs.github.io/zcashjs/api/wallet-runtime.html)
- سير العمل الكامل: [الدليل التفصيلي للمحفظة](https://zcashlabs.github.io/zcashjs/api/walkthrough.html)
- مرجع API: [مرجع API](https://zcashlabs.github.io/zcashjs/api/reference.html)
- حدود المنصة: [إعداد Node والمتصفح](https://zcashlabs.github.io/zcashjs/api/platforms.html)


## الموارد الرسمية

- كتاب المطورين: [https://zcashlabs.github.io/zcashjs/](https://zcashlabs.github.io/zcashjs/)
- مستودع GitHub: [https://github.com/zcashlabs/zcashjs](https://github.com/zcashlabs/zcashjs)
- حزمة npm: `@zcashlabs/zcash.js`


---

*يستند هذا الدليل إلى `@zcashlabs/zcash.js@0.1.1` (أكتوبر 2026). لا تزال SDK قيد التطوير النشط — فضّل دائمًا الوثائق الرسمية للاطلاع على أحدث واجهات API والقيود.*
