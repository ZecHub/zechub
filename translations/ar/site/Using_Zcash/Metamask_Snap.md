<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Metamask_Snap.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="تحرير الصفحة"/>
</a>

# دليل تكامل MetaMask Zcash Snap

> احتفظ بـ ZEC المحمية وأرسلها من إضافة المتصفح MetaMask، باستخدام Zcash Snap الخاص بـ ChainSafe ومحفظة الويب WebZjs.

## باختصار

* تضيف ChainSafe Zcash Snap دعم ZEC المحمية إلى MetaMask على أجهزة الكمبيوتر (Chrome وEdge وFirefox). لا حاجة إلى برامج Zcash منفصلة.
* تُشتق مفاتيح Zcash من عبارة الاسترداد الخاصة بـ MetaMask. تحمي هذه العبارة الآن كلاً من ETH وZEC.
* يمكنك إدارة ZEC عبر محفظة WebZjs على webzjs.chainsafe.dev، وليس ضمن قائمة الأصول الخاصة بـ MetaMask.
* يحصل حسابك على عنوان موحّد، لذا يرسل إليك المرسلون عبر أكثر مجمع يدعمونه خصوصيةً.
* موّل المحفظة عبر المبادلة (مثل ETH مقابل ZEC) أو بسحب ZEC من منصة تداول إلى عنوانك المحمي.
* الاسترداد: أعد تثبيت MetaMask وSnap، ثم استورد عبارة الاسترداد الحالية.

## شرح أساسي

MetaMask Snap إضافة صغيرة معزولة في بيئة محمية، تعلّم MetaMask استخدام سلسلة كتل جديدة. يتيح Zcash Snap، الذي طوّرته ChainSafe ودقّقته Hacken، لـ MetaMask اشتقاق مفاتيح Zcash من عبارة الاسترداد الحالية وتوقيع معاملات Zcash.

لا يعرض MetaMask نفسه رصيد ZEC. بدلاً من ذلك، تتصل محفظة الويب WebZjs بـ Snap، وتزامن البيانات مع شبكة Zcash عبر خادم lightwalletd، ثم تعرض عناوينك ورصيدك. تُحسب البراهين المحمية في متصفحك باستخدام WebAssembly، لذا قد يستغرق الإرسال لحظات.

تشرح الخطوات أدناه تثبيت Snap، وربط WebZjs، وتمويل المحفظة، والإرسال والاستلام، والتحقق من مكوّنات عنوانك الموحّد.

## الدليل الكامل

للاطلاع على شرح مفصّل مصوّر، شاهد هذا الدليل [**YouTube**](https://www.youtube.com/watch?v=UJh9Ilkohdw): 

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/UJh9Ilkohdw"
    title="طريقة استخدام ZEC على Metamask"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
     

يدعم MetaMask الآن **Zcash المحمية (ZEC)** عبر **Zcash Snap الذي طوّرته ChainSafe**، ما يتيح لك إرسال ZEC الخاصة واستلامها وإدارتها مباشرةً في محفظة المتصفح. وقد دقّقته **Hacken** وأُدرج في **دليل Snaps الرسمي لـ MetaMask**، ولا يتطلب **برامج Zcash منفصلة**؛ إذ تحتاج فقط إلى MetaMask وSnap.

---

## **المتطلبات الأساسية**


> إضافة [**MetaMask**](https://snaps.metamask.io/snap/npm/zcashcommunitygrants/webzjs-zcash-snap/) (لأجهزة الكمبيوتر فقط) - Chrome أو Edge أو Firefox.
> حساب MetaMask - أمّن عبارة الاسترداد؛ يشتق Snap مفاتيح Zcash منها.  
> اتصال إنترنت مستقر - لمزامنة البيانات مع شبكة Zcash.  
> الأموال - ETH لمبادلته بـ ZEC أو ZEC من منصة تداول.

> **نصيحة:** احمِ عبارة الاسترداد الخاصة بـ MetaMask؛ فهي تتحكم في كل من ETH وZEC.

---

## **1. تثبيت Zcash Snap**

1. انتقل إلى [**دليل Snaps الخاص بـ MetaMask**](https://snaps.metamask.io/snap/npm/zcashcommunitygrants/webzjs-zcash-snap/).  
2. ابحث عن [**"Zcash WebZjs Wallet"**](https://snaps.metamask.io/snap/npm/zcashcommunitygrants/webzjs-zcash-snap/) أو [**"WebZjs Zcash Snap"**](https://snaps.metamask.io/snap/npm/zcashcommunitygrants/webzjs-zcash-snap/).  
3. انقر على **Install/Add to MetaMask**.
4. وافق على الأذونات، مثل:
   ```
      Manage Zcash accounts 
      Store data on your device
   ```

![Zcash-snap-install](/content-images/Hy5MSG2Oex-42d0c5b346.webp)


---

## **2. (اختياري) إضافة شبكة Zcash**

في MetaMask، اختر **إضافة شبكة** وأدخل ما يلي:

لـ **BNB SmartChain**؛
```markdown
-  Name: BNB Smart Chain
-  RPC URL: https://bsc-dataseed.binance.org
-  Chain ID: 56
-  Symbol: BNB
-  Block Explorer URL: https://bscscan.com
```
يتيح ذلك عرض معلومات الشبكة وروابط المستكشف.
![Add-a-custom-Net....](/content-images/S1hq7f2Oel-e1ca8b9044.webp)

لـ **Zcash Mainnet**؛
```markdown
- Name: Zcash Mainnet  
- RPC URL: https://zjs.zec.rocks 
- Symbol: ZEC
```
`https://zjs.zec.rocks` خادم lightwalletd متوافق مع WebZjs (gRPC-web)، يديره [zec.rocks](https://zec.rocks) (@emersonian). لاستخدام شبكة الاختبار، استخدم `https://zjs.zec.rocks/testnet`. إذا كنت تشغّل محفظة الويب WebZjs بنفسك، فهذه هي القيمة التي يجب ضبطها لـ `LIGHTWALLETD_PROXY`.

---

## **3. الاتصال بمحفظة ChainSafe WebZjs**

1. انتقل إلى [webzjs.chainsafe.dev](https://webzjs.chainsafe.dev).  
2. انقر على **Connect MetaMask Snap**.  

![Zcash-web-wallet](/content-images/Sk8nSz3dgl-98ce36cc67.webp)

3. وافق على الاتصال.  
4. اطّلع على ملخص حساب Zcash، بما يشمل:
   - العناوين الموحّدة والعنوان الشفاف

![Account-summary-unif....](/content-images/r17c_Mhdel-f4963826d5.webp)


5. انتظر حتى يكتمل التزامن.




---

## **4. تمويل محفظتك**

> **مبادلة ETH بـ ZEC** - استخدم خدمات مثل **LeoDex** وأرسل الأموال إلى عنوانك المحمي.  
> **السحب من منصة تداول** - اسحب ZEC التي اشتريتها إلى عنوانك المحمي في WebZjs.  

![LeoDex-SWAP](/content-images/HyLQ0G2ugg-8d82ef24f6.webp)


> => استخدم عناوين محمية (z) لضمان **الخصوصية الكاملة**.

---

## **5. إرسال / استلام ZEC**

1. في **WebZjs**، انتقل إلى **Transfer Balance**.  
2. أدخل:
```
   - Shielded recipient address  
   - Amount
```
   ![Transfer-Balance](/content-images/rkvcFfhdex-bd55d079eb.webp)

4. أكّد المعاملة في MetaMask (وقّع المعاملة).  
5. ستظهر الأموال المستلمة في WebZjs بعد التأكيد.

---

## **6. التحقق / استكشاف الأخطاء وإصلاحها**

> تحقّق من **WebZjs** للاطلاع على الأرصدة المحدّثة **(لم يُدرج ZEC مباشرةً في MetaMask)**.  
> إذا واجهت مشكلات:
  ```
  - Confirm you have the official ChainSafe Snap.  
  - Check correct network settings.  
  - Ensure correct address format.  
  - Reconnect via **Connect Snap** if needed.
  ``` 

> **نصيحة أمنية:** ثبّت فقط **ChainSafe Snap المدقّق**؛ وراجع الأذونات قبل الموافقة.

---

## **7. التحقق من مكوّنات العنوان**

1. انتقل إلى قسم **Receive**؛ سيظهر عنوانك الموحّد افتراضياً.  
2. انسخ العنوان الموحّد وانتقل إلى مستكشف الكتل [Zcash](https://mainnet.zcashexplorer.app/).  
3. الصق عنوانك الموحّد في شريط البحث.  
4. ستظهر الآن جميع مكوّنات العنوان الموحّد، ومنها:
``` 
   Orchard Address  
   Sapling Address  
   Transparent Address
``` 

![Address-components](/content-images/SyPR2f2_gg-3907c5bf58.webp)



---

## **ملاحظات إضافية**

> استخدم [**أحدث إصدار من MetaMask**](https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en)؛ فالإصدار العام يدعم Snaps.  
> قد يستغرق إنشاء البراهين المحمية بعض الوقت؛ يتولى WebAssembly الحساب داخل المتصفح.  
> الاسترداد بسيط: ثبّت MetaMask وSnap، ثم استورد عبارة الاسترداد الحالية.  
> الإعداد الافتراضي لـ Snap هو **ZEC المحمي**؛ فالعناوين الشفافة **ليست محور التركيز**.  
> استخدم [mainnet.zcashexplorer.app](https://mainnet.zcashexplorer.app) لتأكيد المعاملات.
