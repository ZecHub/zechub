# دليل Zkool للمعاملات متعددة التوقيع

يوفر هذا الدليل شرحًا خطوة بخطوة لكيفية تنفيذ المعاملات متعددة التوقيع باستخدام Zkool. ويتضمن إنشاء الحسابات، وإرسال الأموال أو استلامها، وإعداد توليد المفاتيح الموزع (DKG) للمعاملات متعددة التوقيع. كما تتضمن لقطات شاشة لكل خطوة رئيسية.

## الشرح

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/eagkCIv3BlQ"
    title="عرض Zkool | الخليفة لـ Ywallet"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## 1. إنشاء حساب


1. افتح تطبيق **Zkool** وانتقل إلى **New Account**.


![img1](https://github.com/user-attachments/assets/ee906e49-361a-49b6-9484-904897fe2e3f)

3. أدخل **اسم الحساب** (مثلًا Anabelle).  
   

![img2](https://github.com/user-attachments/assets/e9c325d3-8507-433a-a0c6-6e8c1ea2a254)


4. يمكنك اختياريًا تفعيل **Use Internal Change** أو **Restore Account** إذا لزم الأمر.


5. بعد الإنشاء، سيظهر الحساب في **قائمة الحسابات** الخاصة بك.  


![img3](https://github.com/user-attachments/assets/c446cbca-fb3e-49b9-b1d4-fd727cd1b0fb)


## 2. استلام الأموال

ينشئ كل حساب عدة أنواع من العناوين:

**Unified Address**

**عنوان Orchard فقط**

**Sapling Address**
  
**العنوان الشفاف**


حدِّد النوع الذي تريد استخدامه وشاركه لاستلام الأموال.  


![img4](https://github.com/user-attachments/assets/c9de5dfe-e9d7-423d-8d90-35c1a08ffd5d)





## 3. إرسال الأموال

1. انتقل إلى قسم **Recipient**.  


![img5](https://github.com/user-attachments/assets/9f3a03b9-dd56-450c-a8dc-4370f9289138)


3. أدخل **عنوان المستلم**.  

4. حدِّد **المبلغ** و**المذكرة** الاختيارية.  

5. راجع تفاصيل المعاملة ثم **أكِّد**.  


بمجرد اكتمال العملية، سيتم تحديث الرصيد في قائمة حساباتك.  


![img6](https://github.com/user-attachments/assets/6e6da76b-cd18-4567-a5c0-74f07ddefc64)


## 4. تنفيذ المعاملات متعددة التوقيع: إعداد توليد المفاتيح الموزع (Multisig)

تستخدم المعاملات متعددة التوقيع في Zkool **توليد المفاتيح الموزع (DKG)** لضمان تحكم عدة مشاركين في حساب مشترك.



### الخطوة 1: بدء DKG
اختر **اسمًا** للمحفظة المشتركة (مثلًا Anabelle).

حدِّد **عدد المشاركين**.
  
اختر **معرّف المشارك** الخاص بك.
  
حدِّد **عدد الموقّعين المطلوبين (الحد الأدنى)**.
    
اختر **حساب التمويل**.
  

![img7](https://github.com/user-attachments/assets/8a90ca85-5439-4937-b16d-a570e69d55f0)



### الخطوة 2: إضافة عناوين المشاركين
- أدخل **Unified Address** الخاص بكل مشارك (موصى به).


**ملاحظة:** إذا استخدمت عنوان Orchard فقط أو عنوان Sapling فقط، فستقتصر المحفظة متعددة التوقيع على تلك المجموعة فقط (Orchard أو Sapling).  
وهذا يعني أن المحفظة المشتركة لن تتمكن من استلام الأموال من مجموعات أخرى.  
ولأقصى قدر من التوافق والمرونة، استخدم دائمًا **Unified Addresses**.  


### الخطوة 3: تشغيل جولات DKG
انتظر حتى يتبادل جميع المشاركين حزم **الجولة 1** و**الجولة 2**.  


![img8](https://github.com/user-attachments/assets/cdaf6e00-3cb0-4774-8a96-5ded19bf31c4)



### الخطوة 4: إنهاء العنوان المشترك
بمجرد اكتمال العملية، سيتم إنشاء **عنوان مشترك**.  


![img9](https://github.com/user-attachments/assets/741d1bc6-0102-4e67-bb83-9a1c184bd747)



## الخلاصة

باستخدام Zkool، يمكنك: إنشاء الحسابات، وإرسال الأموال واستلامها، وإعداد **محفظة متعددة التوقيع** باستخدام توليد المفاتيح الموزع. وهذا يضمن **أمانًا معززًا** و**إدارة تعاونية وخاصة للأموال**.
