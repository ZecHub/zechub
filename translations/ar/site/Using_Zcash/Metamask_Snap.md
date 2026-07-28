# دليل دمج MetaMask Zcash Snap

للحصول على شرح كامل وتوضيح مرئي، شاهد [**دليل YouTube**](https://www.youtube.com/watch?v=UJh9Ilkohdw): 

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/UJh9Ilkohdw"
    title="كيفية استخدام ZEC على Metamask"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
     

يدعم MetaMask الآن **Zcash المحمي (ZEC)** عبر **Zcash Snap المطوَّر من ChainSafe**، مما يتيح لك إرسال واستقبال وإدارة ZEC الخاص مباشرةً من محفظة المتصفح الخاصة بك. وقد خضع لتدقيق من **Hacken** وهو مُدرج في **دليل MetaMask Snaps الرسمي**، ولا يتطلب **أي برنامج Zcash منفصل** - فقط MetaMask وSnap.

---

## **المتطلبات الأساسية**


> [**امتداد MetaMask**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/) (سطح المكتب فقط) - Chrome أو Edge أو Firefox.
> حساب MetaMask - عبارة الاسترداد مؤمَّنة؛ ويشتق Snap مفاتيح Zcash منها.  
> اتصال إنترنت مستقر - للمزامنة مع شبكة Zcash.  
> الأموال - ETH للمبادلة إلى ZEC أو ZEC من منصة تداول.

> **نصيحة:** احمِ عبارة الاسترداد الخاصة بـ MetaMask - فهي تتحكم في كلٍّ من ETH و ZEC.

---

## **1. تثبيت Zcash Snap**

1. انتقل إلى [**دليل MetaMask Snaps**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/).  
2. ابحث عن [**"Zcash Shielded Wallet"**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/) أو [**"WebZjs Zcash Snap"**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/).  
3. انقر على **Install/Add to MetaMask**.
4. وافق على الأذونات مثل:
   ```
      Manage Zcash accounts 
      Store data on your device
   ```

![تثبيت-Zcash-snap](/content-images/Hy5MSG2Oex-42d0c5b346.webp)


---

## **2. (اختياري) إضافة شبكة Zcash**

في MetaMask، اختر **Add Network** وأدخل:

لـ **BNB SmartChain**;
```markdown
-  Name: BNB Smart Chain
-  RPC URL: https://bsc-dataseed.binance.org
-  Chain ID: 56
-  Symbol: BNB
-  Block Explorer URL: https://bscscan.com
```
يؤدي ذلك إلى تفعيل معلومات الشبكة وروابط المستكشف.
![إضافة-شبكة-مخصصة....](/content-images/S1hq7f2Oel-e1ca8b9044.webp)

لـ **Zcash Mainnet**;
```markdown
- Name: Zcash Mainnet  
- RPC URL: https://mainnet.lightwalletd.com:9067 
- Symbol: ZEC
```

---

## **3. الاتصال بمحفظة ChainSafe WebZjs**

1. زر [webzjs.chainsafe.dev](https://webzjs.chainsafe.dev).  
2. انقر على **Connect MetaMask Snap**.  

![محفظة-Zcash-الويب](/content-images/Sk8nSz3dgl-98ce36cc67.webp)

3. وافق على الاتصال.  
4. اعرض ملخص حساب Zcash الخاص بك، بما في ذلك:
   - العناوين الموحَّدة والعنوان الشفاف

![ملخص-الحساب-الموح....](/content-images/r17c_Mhdel-f4963826d5.webp)


5. انتظر حتى تكتمل المزامنة.




---

## **4. تمويل محفظتك**

> **مبادلة ETH -> ZEC** - استخدم خدمات مثل **LeoDex** وأرسل إلى عنوانك المحمي.  
> **السحب من منصة التداول** - اسحب ZEC الذي اشتريته إلى عنوان WebZjs المحمي الخاص بك.  

![مبادلة-LEODEX](/content-images/HyLQ0G2ugg-8d82ef24f6.webp)


> => استخدم العناوين المحمية (z) للحصول على **خصوصية كاملة**.

---

## **5. إرسال / استقبال ZEC**

1. في **WebZjs**، انتقل إلى **Transfer Balance**.  
2. أدخل:
```
   - Shielded recipient address  
   - Amount
```
   ![تحويل-الرصيد](/content-images/rkvcFfhdex-bd55d079eb.webp)

4. أكِّد المعاملة في MetaMask (وقّع المعاملة).  
5. ستظهر الأموال المستلمة في WebZjs بعد التأكيد.

---

## **6. التحقق / استكشاف الأخطاء وإصلاحها**

> تحقّق من **WebZjs** لمعرفة الأرصدة المحدَّثة **(لم يُدرج MetaMask عملة ZEC مباشرةً بعد)** .  
> إذا حدثت مشكلات:
  ```
  - Confirm you have the official ChainSafe Snap.  
  - Check correct network settings.  
  - Ensure correct address format.  
  - Reconnect via **Connect Snap** if needed.
  ``` 

> **نصيحة أمنية:** ثبّت فقط **ChainSafe Snap الذي خضع للتدقيق**؛ وراجع الأذونات قبل الموافقة.

---

## **7. التحقق من مكوّنات العنوان**

1. انتقل إلى قسم **Receive** - سيُعرض عنوانك الموحَّد (Unified Address) افتراضيًا.  
2. انسخ العنوان الموحَّد وانتقل إلى [مستكشف كتل Zcash](https://mainnet.zcashexplorer.app/).  
3. الصق العنوان الموحَّد في شريط البحث.  
4. سترى الآن جميع مكوّنات العنوان الموحَّد، والتي تشمل:
``` 
   Orchard Address  
   Sapling Address  
   Transparent Address
``` 

![مكوّنات-العنوان](/content-images/SyPR2f2_gg-3907c5bf58.webp)



---

## **ملاحظات إضافية**

> استخدم [**أحدث إصدار من MetaMask**](https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en) - فالإصدار العام يدعم Snaps.  
> قد تستغرق الإثباتات المحمية وقتًا، ويتولى WebAssembly معالجة العمليات داخل المتصفح.  
> الاسترداد بسيط، ثبّت MetaMask وSnap، ثم استورد العبارة الأولية الحالية لديك.  
> يعتمد Snap افتراضيًا على **ZEC المحمي**، أما العناوين الشفافة فهي **ليست محور التركيز**.  
> استخدم [zcashblockexplorer.com](https://zcashblockexplorer.com) لتأكيدات المعاملات.
