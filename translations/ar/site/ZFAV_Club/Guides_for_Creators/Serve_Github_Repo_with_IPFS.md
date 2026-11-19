<a href="https://github.com/Zechub/zechub/edit/main/site/ZFAV_Club/Guides_for_Creators/Serve_Github_Repo_with_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# استضافة مستودع GitHub باستخدام IPFS

## مقدمة

في هذا الدليل نتعلم كيفية إنشاء عنوان URL قابل للاستنساخ عبر git لمستودع GitHub الخاص بك، يُقدَّم باستخدام معرّف CID من IPFS. 

هذا مفيد لضمان توفر المحتوى بغض النظر عن المنطقة الجغرافية، ولمقاومة الرقابة، وكنسخة احتياطية دائمة للمعلومات القيّمة!

تنبيه: البيانات المرفوعة إلى IPFS متاحة لجميع مستخدمي الشبكة. قد ترغب في تشفير (encryption) البيانات الشخصية/الحساسة محليًا.

## تثبيت IPFS Kubo

اتبع تعليمات التثبيت المتوفرة [هنا](https://docs.ipfs.tech/install/command-line/#install-official-binary-distributions)

في هذا المثال نستخدم Linux، وتتوفر إصدارات لأنظمة تشغيل أخرى.

تحقق من نجاح التثبيت باستخدام   ipfs –version

## استنساخ المستودع

للبدء، اختر مستودع Git تريد استضافته واستنسخه:

نفّذ الأمر: «git clone https://github.com/zechub/zechub”»

![https://i.ibb.co/HxFX37b/Screenshot-from-2023-05-20-14-14-46.png](/content-images/Screenshot-from-2023-05-20-14-14-46-8503afccc3.webp)

الآن، لتجهيزه للاستنساخ عبر IPFS.

cd zechub git update-server-info

فك حزم كائنات Git:

![](/content-images/image-2024-04-20-175848513-2ceb90dd7b.webp)

يتيح القيام بذلك لـ IPFS إزالة الكائنات المكررة إذا حدّثت مستودع Git لاحقًا.

## الإضافة إلى IPFS

بمجرد الانتهاء من ذلك، يصبح المستودع جاهزًا للتقديم. كل ما تبقى هو إضافته إلى IPFS:

$ pwd

/code/myrepo

$ ipfs add -r 

![https://i.ibb.co/LJgK1q3/Screenshot-from-2023-05-20-14-22-38.png](/content-images/Screenshot-from-2023-05-20-14-22-38-3fc2f72d91.webp)

معرّف CID الناتج: Qmbgqox5g3614gjTb43s5mdSmmk95aGWWA9EHksL2T91A2

![https://i.ibb.co/GvhCLwn/Screenshot-from-2023-05-20-14-26-34.png](/content-images/Screenshot-from-2023-05-20-14-26-34-6e00fee828.webp)

رائع! الآن تم رفع مستودعك إلى الشبكة.

## الاستنساخ باستخدام IPFS

يجب أن تكون الآن قادرًا على استرجاع مستودع GitHub باستخدام:

git clone http://ipfs.io/ipfs/yourCID

بدلًا من ذلك، يمكنك البحث والاسترجاع باستخدام عقدة (node) IPFS المحلية الخاصة بك.

تنبيه أخير: مجلد المستودع على IPFS لا يتلقى التحديثات بالتوازي مع مستودع github الفعلي. يُنصح بإعادة رفع المجلد على فترات منتظمة.
