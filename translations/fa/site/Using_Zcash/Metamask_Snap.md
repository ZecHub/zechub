<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Metamask_Snap.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# راهنمای یکپارچه‌سازی MetaMask Zcash Snap

> ZEC محافظت‌شده را از طریق افزونهٔ مرورگر MetaMask نگه دارید و ارسال کنید؛ با استفاده از Zcash Snap ساخت ChainSafe و کیف‌پول وب WebZjs.

## خلاصه

* ChainSafe Zcash Snap پشتیبانی از ZEC محافظت‌شده را در نسخهٔ دسکتاپ (Chrome، Edge، Firefox) به MetaMask اضافه می‌کند. به هیچ نرم‌افزار جداگانه‌ای برای Zcash نیاز ندارید.
* کلیدهای Zcash شما از عبارت بازیابی MetaMask شما مشتق می‌شوند. اکنون همان یک عبارت هم از ETH و هم از ZEC شما محافظت می‌کند.
* شما ZEC را از طریق کیف‌پول WebZjs در webzjs.chainsafe.dev مدیریت می‌کنید، نه در فهرست دارایی‌های خود MetaMask.
* حساب شما یک آدرس یکپارچه دریافت می‌کند، بنابراین فرستندگان در خصوصی‌ترین استخری که پشتیبانی می‌کنند به شما پرداخت می‌کنند.
* برای تأمین موجودی آن، مبادله انجام دهید (برای مثال ETH به ZEC) یا ZEC را از یک صرافی به آدرس محافظت‌شدهٔ خود برداشت کنید.
* بازیابی: MetaMask و Snap را دوباره نصب کنید، سپس عبارت بازیابی فعلی خود را وارد کنید.

## توضیح اصلی

MetaMask Snap یک افزونهٔ کوچک و ایزوله است که یک بلاک‌چین جدید را به MetaMask می‌آموزد. Zcash Snap که توسط ChainSafe ساخته شده و توسط Hacken حسابرسی شده است، به MetaMask امکان می‌دهد کلیدهای Zcash را از عبارت بازیابی فعلی شما مشتق کند و تراکنش‌های Zcash را امضا کند.

خود MetaMask موجودی ZEC را نمایش نمی‌دهد. در عوض، کیف‌پول وب WebZjs به Snap متصل می‌شود، از طریق یک سرور lightwalletd با شبکهٔ Zcash همگام‌سازی می‌کند و آدرس‌ها و موجودی شما را نمایش می‌دهد. اثبات‌های محافظت‌شده در مرورگر شما با WebAssembly محاسبه می‌شوند و به همین دلیل ارسال‌ها ممکن است کمی زمان ببرند.

مراحل زیر شامل نصب Snap، اتصال WebZjs، تأمین موجودی کیف‌پول، ارسال و دریافت، و بررسی اجزای آدرس یکپارچهٔ شما است.

## راهنمای کامل

برای مشاهدهٔ راهنمای گام‌به‌گام کامل و توضیح تصویری، این [**راهنمای YouTube**](https://www.youtube.com/watch?v=UJh9Ilkohdw) را تماشا کنید: 

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/UJh9Ilkohdw"
    title="How to use ZEC on Metamask"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
     

MetaMask اکنون از طریق **Zcash Snap توسعه‌یافته توسط ChainSafe** از **Zcash محافظت‌شده (ZEC)** پشتیبانی می‌کند و به شما امکان می‌دهد ZEC خصوصی را مستقیماً در کیف‌پول مرورگر خود ارسال، دریافت و مدیریت کنید. این ابزار که توسط **Hacken** حسابرسی شده و در **فهرست رسمی Snaps MetaMask** ثبت شده است، به **هیچ نرم‌افزار جداگانه‌ای برای Zcash** نیاز ندارد - فقط MetaMask و Snap.

---

## **پیش‌نیازها**


> [**افزونهٔ MetaMask**](https://snaps.metamask.io/snap/npm/zcashcommunitygrants/webzjs-zcash-snap/) (فقط دسکتاپ) - Chrome، Edge یا Firefox.
> حساب MetaMask - عبارت بازیابی ایمن‌شده؛ Snap کلیدهای Zcash را از آن مشتق می‌کند.  
> اتصال اینترنت پایدار - برای همگام‌سازی با شبکهٔ Zcash.  
> موجودی - ETH برای مبادله با ZEC یا ZEC از یک صرافی.

> **نکته:** از عبارت بازیابی MetaMask خود محافظت کنید - این عبارت هم ETH و هم ZEC را کنترل می‌کند.

---

## **1. نصب Zcash Snap**

1. به [**فهرست Snaps MetaMask**](https://snaps.metamask.io/snap/npm/zcashcommunitygrants/webzjs-zcash-snap/) بروید.  
2. عبارت [**«Zcash WebZjs Wallet»**](https://snaps.metamask.io/snap/npm/zcashcommunitygrants/webzjs-zcash-snap/) یا [**«WebZjs Zcash Snap»**](https://snaps.metamask.io/snap/npm/zcashcommunitygrants/webzjs-zcash-snap/) را جستجو کنید.  
3. روی **Install/Add to MetaMask** کلیک کنید.
4. مجوزهایی مانند موارد زیر را تأیید کنید:
   ```
      Manage Zcash accounts 
      Store data on your device
   ```

![Zcash-snap-install](/content-images/Hy5MSG2Oex-42d0c5b346.webp)


---

## **2. (اختیاری) افزودن شبکهٔ Zcash**

در MetaMask، گزینهٔ **Add Network** را انتخاب کرده و موارد زیر را وارد کنید:

برای **BNB SmartChain**؛
```markdown
-  Name: BNB Smart Chain
-  RPC URL: https://bsc-dataseed.binance.org
-  Chain ID: 56
-  Symbol: BNB
-  Block Explorer URL: https://bscscan.com
```
این کار اطلاعات شبکه و پیوندهای مرورگر بلاک‌چین را فعال می‌کند.
![Add-a-custom-Net....](/content-images/S1hq7f2Oel-e1ca8b9044.webp)

برای **Zcash Mainnet**؛
```markdown
- Name: Zcash Mainnet  
- RPC URL: https://zjs.zec.rocks 
- Symbol: ZEC
```
`https://zjs.zec.rocks` یک سرور lightwalletd سازگار با WebZjs (gRPC-web) است که توسط [zec.rocks](https://zec.rocks) (@emersonian) اجرا می‌شود. برای testnet از `https://zjs.zec.rocks/testnet` استفاده کنید. اگر کیف‌پول وب WebZjs را خودتان اجرا می‌کنید، این همان مقداری است که باید به‌عنوان `LIGHTWALLETD_PROXY` تنظیم کنید.

---

## **3. اتصال به کیف‌پول ChainSafe WebZjs**

1. به [webzjs.chainsafe.dev](https://webzjs.chainsafe.dev) مراجعه کنید.  
2. روی **Connect MetaMask Snap** کلیک کنید.  

![Zcash-web-wallet](/content-images/Sk8nSz3dgl-98ce36cc67.webp)

3. اتصال را تأیید کنید.  
4. خلاصهٔ حساب Zcash خود را مشاهده کنید، شامل:
   - آدرس‌های یکپارچه و آدرس شفاف

![Account-summary-unif....](/content-images/r17c_Mhdel-f4963826d5.webp)


5. منتظر بمانید تا همگام‌سازی کامل شود.




---

## **4. تأمین موجودی کیف‌پول**

> **مبادلهٔ ETH -> ZEC** - از سرویس‌هایی مانند **LeoDex** استفاده کنید و به آدرس محافظت‌شدهٔ خود ارسال کنید.  
> **برداشت از صرافی** - ZEC خریداری‌شده را به آدرس محافظت‌شدهٔ WebZjs خود برداشت کنید.  

![LeoDex-SWAP](/content-images/HyLQ0G2ugg-8d82ef24f6.webp)


> => برای **حریم خصوصی کامل** از آدرس‌های محافظت‌شده (z) استفاده کنید.

---

## **5. ارسال / دریافت ZEC**

1. در **WebZjs**، به بخش **Transfer Balance** بروید.  
2. موارد زیر را وارد کنید:
```
   - Shielded recipient address  
   - Amount
```
   ![Transfer-Balance](/content-images/rkvcFfhdex-bd55d079eb.webp)

4. تراکنش را در MetaMask تأیید کنید (تراکنش را امضا کنید).  
5. وجوه دریافتی پس از تأیید در WebZjs نمایش داده می‌شوند.

---

## **6. بررسی / عیب‌یابی**

> موجودی‌های به‌روزشده را در **WebZjs** بررسی کنید **(MetaMask هنوز ZEC را مستقیماً فهرست نکرده است)** .  
> در صورت بروز مشکل:
  ```
  - Confirm you have the official ChainSafe Snap.  
  - Check correct network settings.  
  - Ensure correct address format.  
  - Reconnect via **Connect Snap** if needed.
  ``` 

> **نکتهٔ امنیتی:** فقط **ChainSafe Snap حسابرسی‌شده** را نصب کنید؛ پیش از تأیید، مجوزها را بررسی کنید.

---

## **7. بررسی اجزای آدرس**

1. به بخش **Receive** بروید - آدرس یکپارچهٔ شما به‌طور پیش‌فرض نمایش داده می‌شود.  
2. آدرس یکپارچه را کپی کنید و به [مرورگر بلوک Zcash](https://mainnet.zcashexplorer.app/) مراجعه کنید.  
3. آدرس یکپارچهٔ خود را در نوار جستجو جای‌گذاری کنید.  
4. اکنون همهٔ اجزای آدرس یکپارچه را خواهید دید که شامل موارد زیر است:
``` 
   Orchard Address  
   Sapling Address  
   Transparent Address
``` 

![Address-components](/content-images/SyPR2f2_gg-3907c5bf58.webp)



---

## **نکات تکمیلی**

> از [**آخرین نسخهٔ MetaMask**](https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en) استفاده کنید - نسخهٔ عمومی از Snaps پشتیبانی می‌کند.  
> اثبات‌های محافظت‌شده ممکن است زمان‌بر باشند، WebAssembly محاسبات را درون مرورگر انجام می‌دهد.  
> بازیابی ساده است، MetaMask و Snap را نصب کنید، سپس عبارت بازیابی فعلی خود را وارد کنید.  
> Snap به‌طور پیش‌فرض روی **ZEC محافظت‌شده** تنظیم است، آدرس‌های شفاف **در اولویت نیستند**.  
> برای تأیید تراکنش‌ها از [mainnet.zcashexplorer.app](https://mainnet.zcashexplorer.app) استفاده کنید.
