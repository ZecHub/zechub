<a href="https://github.com/Zechub/zechub/edit/main/site/Zcash_Community/Zcash_Ecosystem_Security.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# امنیت اکوسیستم Zcash

## مسئول امنیت اکوسیستم

نقش مسئول امنیت اکوسیستم Zcash از طریق یک گرنت ZCG ایجاد شد تا مهندسی امنیت اختصاصی را برای اکوسیستم گسترده‌تر Zcash، به‌ویژه دریافت‌کنندگان گرنت ZCG، خارج از ECC و ZF فراهم کند.

- **2022–2023:** [earthrise](https://forum.zcashcommunity.com/t/zcash-ecosystem-security-lead/42090) به‌عنوان نخستین مسئول امنیت اکوسیستم فعالیت کرد. برای اطلاعات بیشتر به [zecsec.com](https://zecsec.com) مراجعه کنید.
- **2024–2025:** ZCG از طریق یک [RFP](https://forum.zcashcommunity.com/t/rfp-zcash-ecosystem-security-lead-2023/45723) جدید، [Least Authority](https://leastauthority.com) را برای ادامه‌ی این نقش انتخاب کرد. به‌روزرسانی‌ها را می‌توانید [اینجا](https://forum.zcashcommunity.com/t/grant-update-zcash-ecosystem-security-lead/47541) بیابید.
- **2026:** Shielded Labs [Taylor Hornby را به کار گرفت](https://forum.zcashcommunity.com/t/shielded-labs-engages-taylor-hornby-as-security-consultant/55421) تا به‌عنوان مشاور امنیتی، توانمندی‌های امنیتی Zcash را تقویت کند.

## ابتکار امنیت و افشای آسیب‌پذیری ZCG

[ابتکار امنیت و افشای آسیب‌پذیری ZCG](https://forum.zcashcommunity.com/t/zcg-security-vulnerability-disclosure-initiative/55545) چارچوبی را برای افشای هماهنگ آسیب‌پذیری‌های امنیتی در سراسر اکوسیستم Zcash فراهم می‌کند.

## به‌روزرسانی‌های امنیتی اخیر (2026)

- **Zebra 4.4.1 (مه 2026):** [اصلاحیه‌ی امنیتی حیاتی](https://forum.zcashcommunity.com/t/zebra-4-4-1-critical-security-fix/55588) منتشر شد. به همه‌ی گردانندگان نود توصیه می‌شود فوراً به‌روزرسانی کنند.
- **Zebra 4.3.1 (آوریل 2026):** [اصلاحیه‌های امنیتی حیاتی، استخراج داکرشده و مقاوم‌سازی CI](https://forum.zcashcommunity.com/t/zebra-4-3-1-critical-security-fixes-dockerized-mining-and-ci-hardening/55389) منتشر شد.
- **رفع چندین آسیب‌پذیری (آوریل 2026):** [چندین آسیب‌پذیری Zcash با موفقیت وصله شدند](https://forum.zcashcommunity.com/t/several-zcash-vulnerabilities-successfully-remediated/55388)، بدون آنکه بر وجوه کاربران یا حریم خصوصی آن‌ها تأثیری بگذارند.
- **هشدار zcashd (آوریل 2026):** [هشداری برای کاهش سطح حمله‌ی zcashd](https://forum.zcashcommunity.com/t/advisory-reduce-your-zcashd-attack-surface-by-shielding-it-behind-zebra/55390) از طریق هدایت ترافیک از مسیر Zebra.

## افشای مسئولانه

Electric Coin Company و Zcash Foundation هر دو با این [استاندارد](https://github.com/RD-Crypto-Spec/Responsible-Disclosure/tree/d47a5a3dafa5942c8849a93441745fdd186731e6) افشای مسئولانه مطابقت دارند، با انحراف زیر:

> «Zcash فناوری‌ای است که حریم خصوصی قدرتمندی فراهم می‌کند. Noteها برای مقصدشان رمزنگاری می‌شوند و سپس پایه‌ی پولی از طریق اثبات‌های دانش صفر حفظ می‌شود که قرار است فقط توسط دارنده‌ی واقعی Zcash قابل ایجاد باشند. اگر این سازوکار شکست بخورد و یک باگ جعل پدید آید، ممکن است آن باگ جعل مورد سوءاستفاده قرار گیرد، بی‌آنکه تحلیلگران بلاک‌چین راهی برای شناسایی عامل آن یا تشخیص اینکه کدام داده‌ها در بلاک‌چین برای سوءاستفاده از باگ به کار رفته‌اند داشته باشند. بنابراین بازگرداندن زنجیره به پیش از آن نقطه، همان‌گونه که در برخی پروژه‌های دیگر در چنین مواردی انجام شده است، ناممکن است. این استاندارد توصیف می‌کند که گزارش‌دهندگان آسیب‌پذیری‌ها جزئیات کامل یک مشکل را برای بازتولید آن ارائه دهند. این امر برای نمونه در مورد یک پژوهشگر خارجی ضروری است که هم نشان دهد و هم اثبات کند که واقعاً یک مشکل امنیتی وجود دارد و آن مشکل امنیتی واقعاً همان تأثیری را دارد که او ادعا می‌کند؛ این کار به تیم توسعه امکان می‌دهد مشکل را به‌درستی اولویت‌بندی و برطرف کند. با این حال، در مورد یک باگ جعل، درست مانند CVE-2019-7167، ممکن است تصمیم بگیریم آن جزئیات را در گزارش‌های خود به شرکا پیش از انتشار هماهنگ نگنجانیم، مشروط بر اینکه مطمئن باشیم آن‌ها آسیب‌پذیر هستند.»

## منابع امنیتی

- [هشدارهای امنیتی Zcash](https://github.com/zcash/zcash/security/advisories)
- [هشدارهای امنیتی Zebra](https://github.com/ZcashFoundation/zebra/security/advisories)
- [گزارش یک آسیب‌پذیری در zcash/zcash](https://github.com/zcash/zcash/security/policy)
- [گزارش یک آسیب‌پذیری به ZF](https://github.com/ZcashFoundation/zebra/security/policy)
