<a href="https://github.com/Zechub/zechub/edit/main/site/Zcash_Community/ZFAV_Club/Guides/Github_With_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# استضافة مستودع GitHub باستخدام IPFS 

## مقدمة

في هذا الدليل نتعلم كيفية إنشاء عنوان URL قابل للاستنساخ عبر git لمستودع GitHub الخاص بك، يُستضاف باستخدام معرّف CID من IPFS. يفيد ذلك في ضمان توفر المحتوى بغض النظر عن المنطقة الجغرافية، وفي مقاومة الرقابة، وكنسخة احتياطية دائمة للمعلومات القيّمة!

تنبيه: البيانات المرفوعة إلى IPFS متاحة *لجميع* مستخدمي الشبكة. قد ترغب في تشفير (encryption) البيانات الشخصية أو الحساسة محليًا.


## تثبيت IPFS Kubo

اتبع تعليمات التثبيت المتوفرة [هنا](https://docs.ipfs.tech/install/command-line/#install-official-binary-distributions)

في هذا المثال نستخدم Linux، وتتوفر إصدارات لأنظمة تشغيل أخرى. 

تحقق من نجاح التثبيت باستخدام «ipfs --version» 


## استنساخ المستودع 

للبدء، اختر مستودع Git الذي تريد استضافته واستنسخه:

نفّذ الأمر: «git clone https://github.com/zechub/zechub"

![](/content-images/Screenshot-from-2023-05-20-14-14-46-8503afccc3.webp)


والآن، لتجهيزه للاستنساخ عبر IPFS.

cd zechub
git update-server-info


فك حزم كائنات Git:

mv objects/pack/*.pack .
git unpack-objects < *.pack
rm -f *.pack objects/pack/*

يتيح ذلك لـ IPFS إزالة الكائنات المكررة إذا حدّثت مستودع Git لاحقًا.


## الإضافة إلى IPFS 

بعد أن تنتهي من ذلك، يصبح المستودع جاهزًا للاستضافة. كل ما تبقى هو إضافته إلى IPFS:

$ pwd

/code/myrepo

$ ipfs add -r .

![](/content-images/Screenshot-from-2023-05-20-14-22-38-3fc2f72d91.webp)

معرّف CID الناتج: Qmbgqox5g3614gjTb43s5mdSmmk95aGWWA9EHksL2T91A2

![](/content-images/Screenshot-from-2023-05-20-14-26-34-6e00fee828.webp)

رائع! لقد رُفع مستودعك الآن إلى الشبكة.


## الاستنساخ باستخدام IPFS 

يجب أن تتمكن الآن من استرجاع مستودع github باستخدام:

git clone http://ipfs.io/ipfs/"yourCID"

وبدلًا من ذلك، يمكنك البحث والاسترجاع باستخدام عقدة (node) IPFS المحلية الخاصة بك. 

ملاحظة أخيرة: لا يتلقى مجلد المستودع على IPFS التحديثات بالتوازي مع مستودع github الفعلي. يُنصح بإعادة رفع المجلد على فترات منتظمة.
