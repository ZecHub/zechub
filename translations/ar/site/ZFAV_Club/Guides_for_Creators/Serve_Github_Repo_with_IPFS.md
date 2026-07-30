<a href="https://github.com/Zechub/zechub/edit/main/site/ZFAV_Club/Guides_for_Creators/Serve_Github_Repo_with_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="تعديل الصفحة"/>
</a>

# استضافة مستودع GitHub باستخدام IPFS

## المقدمة

في هذا الدليل سنتعلّم كيفية إنشاء رابط URL قابل للاستنساخ عبر git لمستودع GitHub الخاص بك تتم استضافته باستخدام IPFS CID. 

يفيد هذا في ضمان توافر المحتوى بغضّ النظر عن المنطقة الجغرافية، ومقاومة الرقابة، وكذلك كنسخة احتياطية دائمة للمعلومات القيّمة!

ملاحظة: البيانات التي يتم رفعها إلى IPFS تكون متاحة لجميع مستخدمي الشبكة. قد ترغب في تشفير البيانات الشخصية/الحساسة محليًا.

## تثبيت IPFS Kubo

اتبع تعليمات التثبيت المتوفرة [هنا](https://docs.ipfs.tech/install/command-line/#install-official-binary-distributions)

في هذا المثال نستخدم Linux، كما تتوفر إصدارات لأنظمة تشغيل أخرى.

تحقق من نجاح التثبيت باستخدام   ipfs –version

## استنساخ المستودع

للبدء، اختر مستودع Git تريد استضافته ثم استنسخه:

شغّل الأمر: “git clone https://github.com/zechub/zechub”

![https://i.ibb.co/HxFX37b/Screenshot-from-2023-05-20-14-14-46.png](https://i.ibb.co/HxFX37b/Screenshot-from-2023-05-20-14-14-46.png)

الآن، لجعله جاهزًا للاستنساخ عبر IPFS.

cd zechub git update-server-info

فكّ حزم كائنات Git:

![](https://i.ibb.co/25RwyWz/image-2024-04-20-175848513.png)

سيتيح لك القيام بذلك أن يقوم IPFS بإزالة التكرار بين الكائنات إذا قمت بتحديث مستودع Git لاحقًا.

## الإضافة إلى IPFS

بمجرد الانتهاء من ذلك، يصبح هذا المستودع جاهزًا للاستضافة. كل ما تبقّى فعله هو إضافته إلى IPFS:

$ pwd

/code/myrepo

$ ipfs add -r 

![https://i.ibb.co/LJgK1q3/Screenshot-from-2023-05-20-14-22-38.png](https://i.ibb.co/LJgK1q3/Screenshot-from-2023-05-20-14-22-38.png)

الـ CID الناتج: Qmbgqox5g3614gjTb43s5mdSmmk95aGWWA9EHksL2T91A2

![https://i.ibb.co/GvhCLwn/Screenshot-from-2023-05-20-14-26-34.png](https://i.ibb.co/GvhCLwn/Screenshot-from-2023-05-20-14-26-34.png)

رائع! الآن تم رفع مستودعك إلى الشبكة.

## الاستنساخ باستخدام IPFS

يجب أن تكون الآن قادرًا على استرجاع مستودع GitHub باستخدام:

git clone http://ipfs.io/ipfs/yourCID

وبدلاً من ذلك، يمكنك البحث والاسترجاع باستخدام عقدة IPFS المحلية الخاصة بك.

ملاحظة أخيرة: مجلد المستودع على IPFS لا يتلقى تحديثات بالتزامن مع مستودع github الفعلي. يُوصى بإعادة رفع المجلد على فترات منتظمة.
