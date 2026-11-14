<a href="https://github.com/Zechub/zechub/edit/main/site/ZFAV_Club/Guides_for_Creators/Serve_Github_Repo_with_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# میزبانی ریپازیتوری GitHub با IPFS

## مقدمه

در این راهنما یاد می‌گیریم که چگونه برای ریپازیتوری GitHub خود یک URL قابل git clone بسازید که با استفاده از یک CID در IPFS ارائه می‌شود. 

این کار برای تضمین دسترس‌پذیری محتوا صرف‌نظر از منطقهٔ جغرافیایی، مقاومت در برابر سانسور و همچنین به‌عنوان یک نسخهٔ پشتیبان پایدار از اطلاعات ارزشمند مفید است!

توجه: داده‌هایی که در IPFS بارگذاری می‌شوند برای همهٔ کاربران شبکه در دسترس هستند. ممکن است بخواهید داده‌های شخصی/حساس را به‌صورت محلی رمزنگاری کنید.

## نصب IPFS Kubo

دستورالعمل‌های نصب ارائه‌شده در [اینجا](https://docs.ipfs.tech/install/command-line/#install-official-binary-distributions) را دنبال کنید.

در این مثال از Linux استفاده می‌کنیم، نسخه‌های دیگری برای سیستم‌عامل‌های دیگر نیز در دسترس هستند.

موفقیت‌آمیز بودن نصب را با استفاده از   ipfs –version بررسی کنید.

## کلون کردن ریپازیتوری

برای شروع، یک ریپازیتوری Git را که می‌خواهید میزبانی کنید انتخاب کرده و آن را کلون کنید:

اجرای دستور: «git clone https://github.com/zechub/zechub”

![https://i.ibb.co/HxFX37b/Screenshot-from-2023-05-20-14-14-46.png](/content-images/Screenshot-from-2023-05-20-14-14-46-8503afccc3.webp)

اکنون، برای آماده‌سازی آن جهت کلون شدن از طریق IPFS:

cd zechub git update-server-info

باز کردن آبجکت‌های Git:

![](/content-images/image-2024-04-20-175848513-2ceb90dd7b.webp)

انجام این کار به IPFS اجازه می‌دهد در صورتی که بعداً ریپازیتوری Git را به‌روزرسانی کنید، آبجکت‌های تکراری را حذف کند.

## افزودن به IPFS

پس از انجام این کار، آن ریپازیتوری آمادهٔ ارائه است. تنها کاری که باقی می‌ماند افزودن آن به IPFS است:

$ pwd

/code/myrepo

$ ipfs add -r 

![https://i.ibb.co/LJgK1q3/Screenshot-from-2023-05-20-14-22-38.png](/content-images/Screenshot-from-2023-05-20-14-22-38-3fc2f72d91.webp)

CID حاصل: Qmbgqox5g3614gjTb43s5mdSmmk95aGWWA9EHksL2T91A2

![https://i.ibb.co/GvhCLwn/Screenshot-from-2023-05-20-14-26-34.png](/content-images/Screenshot-from-2023-05-20-14-26-34-6e00fee828.webp)

عالی است! اکنون ریپازیتوری شما در شبکه بارگذاری شده است.

## کلون کردن با استفاده از IPFS

اکنون باید بتوانید ریپازیتوری GitHub را با استفاده از دستور زیر دریافت کنید:

git clone http://ipfs.io/ipfs/yourCID

به‌عنوان جایگزین، می‌توانید با استفاده از نود محلی IPFS خود جست‌وجو و دریافت کنید.

نکتهٔ پایانی: پوشهٔ ریپازیتوری در IPFS همزمان با ریپازیتوری اصلی github به‌روزرسانی نمی‌شود. توصیه می‌شود پوشه را در فواصل زمانی منظم دوباره بارگذاری کنید.
