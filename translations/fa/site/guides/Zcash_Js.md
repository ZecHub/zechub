# راهنمای توسعه‌دهندگان JS برای Zcash

**zcash.js** (`@zcashlabs/zcash.js`) یک SDK آزمایشی TypeScript/JavaScript است که Zcash Labs در 26 اکتبر 2026 منتشر کرد. این SDK به توسعه‌دهندگان امکان می‌دهد کیف‌پول‌ها، کلاینت‌های سبک، داشبوردها و اپلیکیشن‌هایی بسازند که از طریق Node.js و مرورگر با شبکه Zcash تعامل دارند.

> **وضعیت**: آزمایشی (v0.1.1). کیف‌پول‌های ماندگار Node در حال حاضر به Linux + `flock` نیاز دارند. ارسال و دریافت کامل در مرورگر زنده و مهاجرت پایگاه داده تاریخچه کیف‌پول هنوز به‌طور کامل تأیید نشده‌اند. پیش از استفاده در محیط عملیاتی، همیشه مستندات رسمی را بررسی کنید.

## آنچه SDK ارائه می‌دهد

- `createPublicClient` — کوئری‌های JSON-RPC بدون حالت و رصد تراکنش‌ها
- `createLightClient` — کوئری‌ها و استریم‌های lightwallet (gRPC بومی در Node و gRPC-Web در مرورگر)
- `createWalletClient` — حساب‌های محلی، اسکن، پیشنهادها، امضا، ارسال و بازیابی پرداخت‌های ثبت‌شده
- مقادیر دقیق `bigint`، اعتبارسنجی شبکه، ابزارهای مشاهده و آدرس، و ابزارهای PCZT
- موتور پایه کیف‌پول، workerها و فایل‌های اثبات محلی Sapling به‌صورت همراه بسته (بدون نیاز به نصب جداگانه Rust)

## نصب

از **Node.js 22.23.4** استفاده کنید (نسخه‌ای که بسته روی آن تثبیت شده است).

```bash
npm install @zcashlabs/zcash.js@0.1.1
```

- ترجیحاً از TypeScript همراه با ESM استفاده کنید (`"type": "module"` در `package.json`).
- اپلیکیشن‌های مرورگر از طریق یک bundler مدرن ESM کار می‌کنند. Bundler فایل‌های WASM با بارگذاری تنبل، worker و فایل‌های اثبات را تولید می‌کند — این فایل‌ها باید همراه با اپلیکیشن شما مستقر شوند.

## نخستین کوئری زنجیره (بدون کیف‌پول)

```ts
import { createLightClient } from '@zcashlabs/zcash.js';

const light = await createLightClient('https://testnet.zec.rocks:443', {
  network: 'testnet',
});

const tip = await light.getTip();
console.log(tip.height, tip.hash);
```

- اگر گزینه `network` را حذف کنید، مقدار پیش‌فرض mainnet خواهد بود (یک endpoint متناظر ارائه دهید).
- یک `createPublicClient` نیز برای استفاده صرفاً JSON-RPC در دسترس است.

## باز کردن کیف‌پول

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

### گزینه‌های ذخیره‌سازی

| محیط     | گزینه ذخیره‌سازی                                      |
|-----------------|-----------------------------------------------------|
| Node (ماندگار)  | `{ kind: 'node-filesystem', path: './my-wallet' }`  |
| مرورگر         | `{ kind: 'browser-opfs', name: 'my-wallet' }`       |
| موقت      | `{ kind: 'memory' }`                                |

**پیش‌فرض‌های مهم** (از نسخه v0.1.1):

- خرج کردن و باقی‌مانده تراکنش به‌طور پیش‌فرض فقط Ironwood است
- قاعده کارمزد: ZIP-317
- تأییدها: 3 مورد قابل‌اعتماد / 3 مورد غیرقابل‌اعتماد
- همیشه پیش از پیشنهاد یک پرداخت، `wallet.sync()` را فراخوانی کنید

## روند کلی کار با کیف‌پول

1. یک حساب mnemonic بسازید یا وارد کنید و یک امضاکننده به آن متصل کنید
2. `wallet.sync()` را فراخوانی کنید
3. یک آدرس دریافت درخواست کنید (ترجیحاً Unified / Ironwood)
4. یک پیشنهاد ایجاد کنید ← آن را بررسی کنید ← `wallet.send()` را فراخوانی کنید
5. منتظر تأیید بمانید یا پس از راه‌اندازی مجدد، از عملیات ثبت‌شده برای بازیابی استفاده کنید

بایت‌های mnemonic در اختیار اپلیکیشن است. هنگامی که دیگر به آن‌ها نیاز ندارید، آن‌ها را از حافظه پاک کنید. همیشه یک رابط کاربری تأیید شفاف نمایش دهید که هر گیرنده، مبلغ، کارمزد، استخر و زمان انقضا را نشان دهد.

برای یک نمونه کامل و کاربردی، [راهنمای گام‌به‌گام کیف‌پول](https://zcashlabs.github.io/zcashjs/api/walkthrough.html) رسمی را ببینید.

## نکات پلتفرم و محدودیت‌های فعلی

| قابلیت            | Node                              | مرورگر                          |
|-----------------------|-----------------------------------|----------------------------------|
| بسته               | Node 22.23.4 + ESM                | bundler مدرن ESM + WebAssembly |
| کوئری‌های سبک         | gRPC بومی                       | gRPC-Web + CORS                  |
| ذخیره‌سازی ماندگار       | فقط Linux + `flock`              | OPFS (محیط امن)            |
| ذخیره‌سازی موقت    | حافظه                            | حافظه                           |

محدودیت‌های دیگر:

- ذخیره‌سازی ماندگار Node در حال حاضر فقط Linux است
- هنوز گاوصندوق مدیریت‌شده اسرار، سرویس اثبات از راه دور یا یکپارچگی با امضاکننده سخت‌افزاری وجود ندارد
- ذخیره‌سازی به‌عنوان رمزنگاری‌شده در حالت سکون معرفی **نشده** است
- یک فضای ذخیره‌سازی کیف‌پول را هم‌زمان از چند پردازه یا چند تب مرورگر باز نکنید
- همیشه کیف‌پول را با `await wallet.close()` به‌درستی ببندید

## گام‌های بعدی

- نصب رسمی و نخستین درخواست: [نصب](https://zcashlabs.github.io/zcashjs/api/installation.html)
- باز کردن و پیکربندی کیف‌پول: [باز کردن کیف‌پول](https://zcashlabs.github.io/zcashjs/api/wallet-runtime.html)
- روند کامل: [راهنمای گام‌به‌گام کیف‌پول](https://zcashlabs.github.io/zcashjs/api/walkthrough.html)
- مرجع API: [مرجع API](https://zcashlabs.github.io/zcashjs/api/reference.html)
- محدودیت‌های پلتفرم: [راه‌اندازی Node و مرورگر](https://zcashlabs.github.io/zcashjs/api/platforms.html)


## منابع رسمی

- کتاب توسعه‌دهندگان: [https://zcashlabs.github.io/zcashjs/](https://zcashlabs.github.io/zcashjs/)
- مخزن GitHub: [https://github.com/zcashlabs/zcashjs](https://github.com/zcashlabs/zcashjs)
- بسته npm: `@zcashlabs/zcash.js`


---

*این راهنما بر پایه `@zcashlabs/zcash.js@0.1.1` (اکتبر 2026) تهیه شده است. SDK در حال توسعه فعال است — برای آخرین API و محدودیت‌ها، همیشه مستندات رسمی را در اولویت قرار دهید.*
