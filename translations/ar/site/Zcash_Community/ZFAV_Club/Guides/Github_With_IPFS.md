<a href="https://github.com/Zechub/zechub/edit/main/site/Zcash_Community/ZFAV_Club/Guides/Github_With_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="تعديل الصفحة"/>
</a>

# خدمة مستودع Github باستخدام IPFS

## المقدمة

في هذا الدليل سنتعلم كيفية إنشاء رابط URL قابل للاستنساخ عبر git لمستودع Github الخاص بك يتم تقديمه باستخدام IPFS CID. هذا مفيد لضمان إتاحة المحتوى بغض النظر عن المنطقة الجغرافية، ومقاومة الرقابة، وكنسخة احتياطية دائمة للمعلومات القيّمة!

ملاحظة: البيانات التي يتم رفعها إلى IPFS تكون متاحة *لجميع* مستخدمي الشبكة. قد ترغب في تشفير البيانات الشخصية/الحساسة محليًا.


## تثبيت IPFS Kubo

اتبع تعليمات التثبيت المتوفرة [هنا](https://docs.ipfs.tech/install/command-line/#install-official-binary-distributions)

في هذا المثال نستخدم Linux، وتتوفر إصدارات لأنظمة تشغيل أخرى.

تحقق من نجاح التثبيت باستخدام "ipfs --version"


## استنساخ المستودع

للبدء، اختر مستودع Git تريد استضافته ثم استنسخه:

شغّل الأمر: "git clone https://github.com/zechub/zechub"

![](https://i.ibb.co/HxFX37b/Screenshot-from-2023-05-20-14-14-46.png)


الآن، لتجهيزه بحيث يمكن استنساخه عبر IPFS.

cd zechub
git update-server-info


فكّ كائنات Git:

mv objects/pack/*.pack .
git unpack-objects < *.pack
rm -f *.pack objects/pack/*

سيتيح القيام بذلك لـ IPFS إزالة تكرار الكائنات إذا قمت بتحديث مستودع Git لاحقًا.


## الإضافة إلى IPFS

بمجرد الانتهاء من ذلك، يصبح المستودع جاهزًا للتقديم. كل ما تبقى عليك فعله هو إضافته إلى IPFS:

$ pwd

/code/myrepo

$ ipfs add -r .

![](https://i.ibb.co/LJgK1q3/Screenshot-from-2023-05-20-14-22-38.png)

CID الناتج: Qmbgqox5g3614gjTb43s5mdSmmk95aGWWA9EHksL2T91A2

![](https://i.ibb.co/GvhCLwn/Screenshot-from-2023-05-20-14-26-34.png)

رائع! الآن تم رفع مستودعك إلى الشبكة.


## الاستنساخ باستخدام IPFS

ينبغي أن تكون الآن قادرًا على استرجاع مستودع github باستخدام:

git clone http://ipfs.io/ipfs/"yourCID"

بدلاً من ذلك، يمكنك البحث والاسترجاع باستخدام عقدة IPFS المحلية الخاصة بك.

ملاحظة أخيرة: مجلد المستودع على IPFS لا يتلقى تحديثات بالتزامن مع مستودع github الفعلي. يُنصح بإعادة رفع المجلد على فترات منتظمة.
