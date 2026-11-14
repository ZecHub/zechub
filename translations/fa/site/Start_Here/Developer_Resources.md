<a href="https://github.com/zechub/zechub/edit/main/site/Start_Here/Developer_Resources.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# منابع توسعه‌دهندگان

منابعی که برای ساختن روی Zcash به آن‌ها نیاز دارید، بر اساس کاربرد هر کدام دسته‌بندی شده‌اند و نه به‌صورت یک فهرست درهم.

مجموعهٔ فناوری در سال 2026 تغییرات زیادی کرد. zcashd که در بیشتر تاریخچهٔ شبکه آن را اجرا می‌کرد، در 18 جولای 2026 در ارتفاع بلوک 3417100 به پایان عمر خود رسید. همهٔ نودهای تغییرنیافته در این ارتفاع خاموش شدند و دیگر دوباره راه‌اندازی نمی‌شوند. راهنماهایی که برای zcashd نوشته شده‌اند اکنون بخشی از تاریخ‌اند و نقطهٔ شروع نیستند. بنابراین این صفحه بر اساس جایگزین‌های آن سازمان‌دهی شده است.

## نگاهی کلی به مجموعهٔ فناوری

| لایه | از چه استفاده کنید | از اینجا شروع کنید |
|:--|:--|:--|
| فول‌نود | Zebra یا Zakura | [کتاب Zebra](https://zebra.zfnd.org/)، [zakura.com](https://zakura.com/) |
| کیف‌پول فول‌نود | Zallet، در نسخهٔ بتا | [کتاب Zallet](https://zcash.github.io/zallet/) |
| سرور کیف‌پول سبک | Zaino یا lightwalletd | [Zaino](https://github.com/zingolabs/zaino)، [lightwalletd](https://github.com/zcash/lightwalletd) |
| کتابخانه‌های کیف‌پول | crateهای librustzcash | [librustzcash](https://github.com/zcash/librustzcash) |
| موبایل | SDKهای Android و iOS | [Android](https://github.com/zcash/zcash-android-wallet-sdk)، [iOS](https://github.com/zcash/zcash-swift-wallet-sdk) |
| مشخصات فنی | مشخصات پروتکل و ZIPها | [zips.z.cash](https://zips.z.cash) |

## نودها

نود اجماع را اعتبارسنجی می‌کند و زنجیره را نگه می‌دارد. دو پیاده‌سازی وجود دارد که به‌طور فعال توسعه داده می‌شوند.

[Zebra](/zcash-tech/zebra-full-node) نود Zcash Foundation است که به زبان Rust نوشته شده و بیشتر راهنماها اکنون آن را پیش‌فرض می‌گیرند. [کتاب Zebra](https://zebra.zfnd.org/) نصب و اجرای آن را پوشش می‌دهد و [مخزن](https://github.com/ZcashFoundation/zebra) آن محل انجام توسعه است.

[Zakura](/zcash-tech/zakura-node) نودی جدیدتر است که سازندگانش آن را «یک فول‌نود Zcash سازگار با اجماع، ساخته‌شده برای مقیاس‌پذیری» توصیف می‌کنند. این نود همگام‌سازی سریع‌تر، هرس بلوک‌ها و یک حالت سازگاری با zcashd دارد. رهبری آن را Sean Bowe، یکی از هم‌بنیان‌گذاران Zcash، و Dev Ojha بر عهده دارند. این نود با مجوز Apache 2.0 به‌صورت متن‌باز در [zakura-core/zakura](https://github.com/zakura-core/zakura) در دسترس است.

ZecHub یک صفحهٔ [فول‌نودها](/zcash-tech/full-nodes) دارد که مزایا و معایب آن‌ها را در مقایسه با یکدیگر بررسی می‌کند.

## کیف‌پول فول‌نود

zcashd یک کیف‌پول را همراه با نود ارائه می‌کرد. آن کیف‌پول دیگر وجود ندارد و [Zallet](https://github.com/zcash/zallet) جایگزین آن است. کتاب Zallet آن را «یک کیف‌پول فول‌نود Zcash نوشته‌شده به زبان Rust» توصیف می‌کند که «به‌عنوان جایگزینی برای کیف‌پول zcashd ساخته می‌شود».

پیش از آنکه به آن تکیه کنید، هشدار امنیتی را بخوانید. Zallet در نسخهٔ بتا است، «به‌طور کامل بازبینی نشده است»، تغییرات ناسازگار «ممکن است در هر زمانی رخ دهد و شما را ملزم کند کیف‌پول Zallet خود را حذف و دوباره ایجاد کنید» و هنوز همهٔ متدهای RPC zcashd منتقل نشده‌اند.

اگر یک پیکربندی موجود را منتقل می‌کنید، ZecHub یک [راهنمای مهاجرت از zcashd به Zebra و Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet) و یک [مرجع سریع Zallet](/using-zcash/zallet-quick-reference-guide) دارد.

## سرورهای کیف‌پول سبک

بیشتر کیف‌پول‌ها نود اجرا نمی‌کنند. آن‌ها با سروری ارتباط برقرار می‌کنند که زنجیره را نگه می‌دارد و نمای فشرده‌ای از آن را بازمی‌گرداند.

[lightwalletd](https://github.com/zcash/lightwalletd) سرویس اصلی و اولیه است که به زبان Go نوشته شده و به‌عنوان «یک سرویس بک‌اند که رابطی کم‌مصرف از نظر پهنای باند برای بلاک‌چین Zcash فراهم می‌کند» توصیف شده است. [Zaino](/zcash-tech/zaino) ایندکسر جدیدتر است که به زبان Rust نوشته شده و به‌جای نگهداری نسخهٔ خودش از زنجیره، داده‌ها را از یک اعتبارسنج کامل می‌خواند.

مستندات [پروتکل کلاینت سبک](https://zcash.readthedocs.io/en/latest/lightwalletd/index.html) خود پروتکل را پوشش می‌دهد. صفحهٔ [نودهای کیف‌پول سبک](/zcash-tech/lightwallet-nodes) توضیح می‌دهد که این سرورها چه اطلاعاتی را دربارهٔ یک کاربر می‌توانند و نمی‌توانند ببینند، و بهتر است پیش از انتخاب یکی از آن‌ها این موضوع را درک کنید.

## ساختن یک کیف‌پول

بیشتر کار روی کیف‌پول در crateهای Rust زیر [librustzcash](https://github.com/zcash/librustzcash) انجام می‌شود که SDKهای موبایل و چندین کیف‌پول دسکتاپ بر پایهٔ آن‌ها ساخته شده‌اند. هر crate در [docs.rs](https://docs.rs) مستند شده است.

| Crate | کاربرد |
|:--|:--|
| zcash_client_backend | «APIهایی برای ساختن کلاینت‌های سبک محافظت‌شدهٔ Zcash»، شامل همگام‌سازی و ساخت تراکنش |
| zcash_client_sqlite | «یک کلاینت سبک Zcash مبتنی بر SQLite»، لایهٔ ذخیره‌سازی برای مورد بالا |
| zcash_keys | «مدیریت کلید و آدرس Zcash» |
| zcash_primitives | «پیاده‌سازی‌های Rust از مؤلفه‌های پایهٔ Zcash» |
| zcash_protocol | «ثابت‌های شبکه و انواع مقدار در پروتکل Zcash» |
| orchard | «پروتکل تراکنش محافظت‌شدهٔ Orchard» |
| sapling-crypto | «کتابخانهٔ رمزنگاری برای Zcash Sapling» |
| pczt | «ابزارهایی برای کار با تراکنش‌های Zcash نیمه‌ساخته»، که برای امضا با سخت‌افزار و چند دستگاه استفاده می‌شود |
| zip321 | URIهای درخواست پرداخت، طبق مشخصات ZIP 321 |

برای موبایل، [SDK Android](https://github.com/zcash/zcash-android-wallet-sdk) و [SDK iOS](https://github.com/zcash/zcash-swift-wallet-sdk) این کتابخانه‌ها را دربر می‌گیرند. مخزن iOS پیش‌تر ZcashLightClientKit نام داشت، بنابراین لینک‌ها و مقاله‌های قدیمی‌تر از آن نام استفاده می‌کنند.

## مشخصات فنی و رمزنگاری

[مشخصات پروتکل](https://zips.z.cash/protocol/protocol.pdf) مرجع معتبر دربارهٔ نحوهٔ کار Zcash است، از جمله [رمزگذاری آدرس‌ها و کلیدها](https://zips.z.cash/protocol/protocol.pdf#5.6%20Encodings%20of%20Addresses%20and%20Keys).

[ZIPها](https://zips.z.cash) جایی هستند که تغییرات پیشنهاد و مشخص می‌شوند، و فهرست آن‌ها نشان می‌دهد کدام‌یک پیش‌نویس و کدام‌یک نهایی است. تغییرات اجماع در قالب ارتقاهای شبکه عرضه می‌شوند و ZecHub آن‌ها را در صفحهٔ [ارتقاهای شبکه](/start-here/network-upgrades) دنبال می‌کند.

برای رمزنگاری زیربنایی، [کتاب halo2](https://zcash.github.io/halo2/index.html) و [کتاب Orchard](https://zcash.github.io/orchard/) را همراه با مستندات crateهای [halo2](https://docs.rs/halo2_proofs/latest/halo2_proofs/) و [orchard](https://docs.rs/orchard/latest/orchard/) بخوانید. [کتاب FROST](https://frost.zfnd.org/) امضاهای دیجیتال آستانه‌ای را پوشش می‌دهد و ZecHub یک صفحهٔ [FROST](/zcash-tech/frost) دارد.

## Testnet

Testnet یک زنجیرهٔ جداگانه با کوین‌های بدون ارزش به نام TAZ است. هر دو Zebra و Zakura می‌توانند روی آن اجرا شوند و [راهنمای testnet](https://zcash.readthedocs.io/en/latest/rtd_pages/testnet_guide.html) پیکربندی نود را پوشش می‌دهد.

[testnet.zcashexplorer.app](https://testnet.zcashexplorer.app/) یک بلوک‌اکسپلورر فعال برای testnet است و نسخهٔ متناظر آن برای mainnet در [mainnet.zcashexplorer.app](https://mainnet.zcashexplorer.app/) قرار دارد.

دریافت TAZ بخش دشوار کار است، زیرا فاست‌هایی که در مستندات قدیمی‌تر لینک شده‌اند دیگر پاسخ نمی‌دهند. [zcashfaucet.jinolabs.xyz](https://zcashfaucet.jinolabs.xyz) یک فاست اداره‌شده توسط کامیونیتی است که «نود، کیف‌پول و استخراج‌کنندهٔ خودش» را اجرا می‌کند، «قطره‌های محافظت‌شدهٔ z2z» پرداخت می‌کند و درخواست‌ها را با «اثبات کار در مرورگر به‌جای یک ارائه‌دهندهٔ captcha» کنترل می‌کند. این فاست با مجوز MIT متن‌باز است. اگر در دسترس نبود، در Zcash R&D Discord بپرسید؛ این همان کاری است که خود مستندات Zcash پیشنهاد می‌کند.

## مستندات عمومی

[مستندات Zcash](https://zcash.readthedocs.io/en/latest/) همچنان گسترده‌ترین منبع واحد است و مفاهیم پروتکل، یکپارچه‌سازی و استخراج را پوشش می‌دهد. آن را با دقت بخوانید. این مستندات بر اساس نسخه‌های zcashd تنظیم شده‌اند، بنابراین بخش‌هایی از آن نودی را توصیف می‌کنند که دیگر اجرا نمی‌شود، در حالی که بخش‌های مربوط به پروتکل و کلاینت سبک همچنان مفیدند. [مدل تهدید اپلیکیشن کیف‌پول Zcash](https://zcash.readthedocs.io/en/latest/rtd_pages/wallet_threat_model.html) که در آنجا قرار دارد، پیش از طراحی هر چیزی که با حریم خصوصی کاربر سروکار دارد ارزش خواندن دارد.

اگر به‌طور کلی با بلاک‌چین‌ها تازه آشنا شده‌اید، [Mastering Bitcoin](https://github.com/bitcoinbook/bitcoinbook) توصیهٔ رایج برای مبانی مشترک است و خواندن کامل آن رایگان است. این کتاب تراکنش‌های محافظت‌شده را پوشش نمی‌دهد.

## ابزارهای دیگری که توسعه‌دهندگان به آن‌ها اشاره کرده‌اند

[Arti](https://docs.rs/arti/latest/arti/) پیاده‌سازی Rust از Tor است که zcash_client_backend از آن برای مسیریابی ترافیک کیف‌پول استفاده می‌کند. [Tailscale](https://github.com/tailscale/tailscale) برای اتصال به نودی که خودتان اجرا می‌کنید مطرح می‌شود. [warp2](https://github.com/hhanh00/warp2) یک پیاده‌سازی همگام‌سازی سریع از Hanh است، هرچند از سال 2023 به‌روزرسانی نشده است.

## کامیونیتی و رویدادها

[Zcash R&D Discord](https://discord.gg/6AK7keWFaK) جایی است که توسعهٔ پروتکل و کیف‌پول در آن بحث می‌شود و [انجمن کامیونیتی Zcash](https://forum.zcashcommunity.com/) میزبان پیشنهادهای مفصل‌تر و رشته‌های پشتیبانی است.

نتایج هکاتون‌های اخیر تصویر خوبی از آنچه افراد می‌سازند ارائه می‌دهد: [ZecHub 2024](https://x.com/ZecHub/status/1845212469809033489)، [ZecHub 2025](https://x.com/ZecHub/status/1975565960661635283) و [Zypherpunk Hackathon 2025](https://forum.zcashcommunity.com/t/zypherpunk-hackathon-winners/53985).

## منابع بازنشسته

این منابع نگه داشته شده‌اند، زیرا مقاله‌های قدیمی‌تر به آن‌ها لینک داده‌اند و همچنین هنوز مرجع رفتار نود بازنشسته هستند. از اینجا شروع نکنید.

[کتاب zcashd](https://zcash.github.io/zcash/) و [مرجع RPC zcashd](https://zcash.github.io/rpc/) نرم‌افزاری را مستند می‌کنند که در جولای 2026 به [پایان عمر](https://zcash.github.io/zcash/user/end-of-life.html) رسید. مخزن [zcash/zcash](https://github.com/zcash/zcash) بایگانی شده است.

اگر منبعی برای افزودن دارید، یا متوجه شدید چیزی در اینجا قدیمی شده است، یک issue یا pull request باز کنید. تیم‌ها همیشه ظرفیت به‌روز نگه داشتن همه‌چیز را ندارند و گزارش مواردی که با آن‌ها برخورد کرده‌اید به هدایت راهنماها کمک می‌کند.

**آخرین به‌روزرسانی:** آگوست 2026
