<a href="https://github.com/zechub/zechub/edit/main/site/guides/Mining_and_Staking_Privacy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# حریم خصوصی در استخراج و استیکینگ

پرداختی استخراج‌کننده و نهایی‌کننده‌ی شما یک چیز نیستند. زنجیره هرگز آن‌ها را به هم پیوند نمی‌دهد.

<div className="grid gap-3 my-5 sm:grid-cols-3">
  <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-4 dark:border-emerald-700 dark:bg-emerald-950">
    <div className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">استخراج‌کننده</div>
    <div className="mt-1 text-lg font-semibold text-emerald-950 dark:text-emerald-50">پرداختی شفاف</div>
    <p className="mt-1 text-sm text-emerald-900 dark:text-emerald-100">Coinbase به یک آدرس Zcash پرداخت می‌کند. تاریخچه‌ی یک t-address عمومی است.</p>
  </div>
  <div className="rounded-xl border border-blue-300 bg-blue-50 p-4 dark:border-blue-700 dark:bg-blue-950">
    <div className="text-xs font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">نهایی‌کننده</div>
    <div className="mt-1 text-lg font-semibold text-blue-950 dark:text-blue-50">کلید zfinv1</div>
    <p className="mt-1 text-sm text-blue-900 dark:text-blue-100">یک کلید ed25519. این کلید رأی‌ها را امضا می‌کند. یک آدرس Zcash نیست.</p>
  </div>
  <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 dark:border-amber-700 dark:bg-amber-950">
    <div className="text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-300">سپرده</div>
    <div className="mt-1 text-lg font-semibold text-amber-950 dark:text-amber-50">سهام محافظت‌شده</div>
    <p className="mt-1 text-sm text-amber-900 dark:text-amber-100">در استخر استیکینگ قرار دارد. یک نهایی‌کننده‌ی هدف را مشخص می‌کند.</p>
  </div>
</div>

## ترتیبی که اهمیت دارد

<div className="my-4 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-600 dark:bg-slate-800">
  <div className="flex flex-wrap items-center gap-2 font-semibold">
    <span className="rounded-full bg-emerald-600 px-3 py-1 text-sm text-white">1 استخراج</span>
    <span className="text-slate-400">→</span>
    <span className="rounded-full bg-blue-600 px-3 py-1 text-sm text-white">2 محافظت</span>
    <span className="text-slate-400">→</span>
    <span className="rounded-full bg-amber-600 px-3 py-1 text-sm text-white">3 سپرده</span>
  </div>
  <p className="mt-3 mb-0 text-slate-800 dark:text-slate-100">اگر مرحله‌ی محافظت را نادیده بگیرید، گام خصوصی هرگز اتفاق نمی‌افتد. سپرده یک coinbase شفاف را پاک نمی‌کند.</p>
</div>

## چه چیزی عمومی است

| مورد | عمومی؟ | چرا |
|---|---|---|
| t-address استخراج‌کننده و تاریخچه‌ی coinbase | بله | خروجی‌های شفاف معمولی |
| کلید نهایی‌کننده و zfinv1 | بله، پس از قرار گرفتن در فهرست | برای تأیید رأی‌ها باید چنین باشد |
| قدرت رأی و بانک پاداش | بله | در برابر کلید نهایی‌کننده منتشر می‌شود تا توزیع سهام قابل حسابرسی باشد |
| اینکه کدام آدرس شفاف یک سپرده را تأمین کرده است | خیر، پس از محافظت | سپرده note‌های محافظت‌شده را خرج می‌کند |
| پیوند میان استخراج‌کننده و نهایی‌کننده‌ی شما | روی زنجیره نیست | هیچ بخشی از پروتکل آن را ثبت نمی‌کند |

مقادیر استیک‌شده عمداً آشکار می‌شوند. این طراحی نیاز دارد که کل مقدار استیک‌شده و توزیع آن میان نهایی‌کننده‌ها به‌صورت عمومی قابل بررسی باشد. کوانتیزه‌سازی (توان‌های 10) و بازه‌های ثابت استیکینگ میزان نشت اطلاعات زمان‌بندی یا الگوهای فردی را محدود می‌کنند و در عین حال آن حسابرسی را ممکن می‌سازند. موجودی‌های Orchard استیک‌نشده خصوصی باقی می‌مانند؛ استیکینگ همان افشای عامدانه است.

## استیک برای خودتان، یا برای شخصی دیگر

<div className="grid gap-3 my-4 sm:grid-cols-2">
  <div className="rounded-xl border border-slate-300 bg-white p-4 dark:border-slate-600 dark:bg-slate-800">
    <div className="font-semibold text-slate-900 dark:text-slate-50">سپرده به نهایی‌کننده‌ی خودتان</div>
    <p className="mt-2 mb-0 text-sm text-slate-700 dark:text-slate-200">ساده‌ترین روش. شما هم نقش اپراتور و هم سپرده را حفظ می‌کنید. یک ناظر همچنان نمی‌تواند تنها از روی داده‌های زنجیره ثابت کند که t-address و zfinv1 متعلق به یک نفر هستند.</p>
  </div>
  <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 dark:border-amber-700 dark:bg-amber-950">
    <div className="font-semibold text-amber-950 dark:text-amber-50">سپرده به عضوی دیگر</div>
    <p className="mt-2 mb-0 text-sm text-amber-900 dark:text-amber-100">قدرت رأی زیر کلید او نمایش داده می‌شود. او کمیسیون 10% نهایی‌کننده‌ی فعال را دریافت می‌کند. شما 90% پاداشی را که روی سپرده انباشته می‌شود نگه می‌دارید. این کار این حدس آشکار را که استخراج‌کننده‌ی دریافت‌کننده‌ی پرداختی شفاف همان شخصی است که نهایی‌کننده را اداره می‌کند، از بین می‌برد.</p>
  </div>
</div>

یک گروه می‌تواند با آدرس‌های پرداختی جداگانه استخراج کند، محافظت کند و میان اعضا سپرده بگذارد. این کار ادعای «این استخراج‌کننده همان این نهایی‌کننده است» را بر اساس داده‌های زنجیره بسیار دشوارتر می‌کند. این روش پنهان نمی‌کند که نهایی‌کننده‌ها چه کسانی هستند، و استخراج را نیز پنهان نمی‌کند.

## آنچه این روش انجام نمی‌دهد

<div className="my-4 rounded-xl border border-rose-300 bg-rose-50 p-4 dark:border-rose-700 dark:bg-rose-950">
  <div className="font-semibold text-rose-700 dark:text-rose-300">پنهان نمی‌شود</div>
  <ul className="mt-2 mb-0 text-rose-950 dark:text-rose-100">
    <li>اینکه نهایی‌کننده‌ها چه کسانی هستند</li>
    <li>اینکه هر کدام چه میزان قدرت رأی دارند</li>
    <li>تاریخچه‌ی استخراج شفاف شما</li>
    <li>پیوندی که خودتان خارج از زنجیره ایجاد می‌کنید: یک IP، یک الگوی پرداخت، یک اپراتور</li>
  </ul>
</div>

zfinv1 هدف درون اقدام استیکینگ قرار دارد. حریم خصوصی در اینجا به منبع وجوه مربوط است، نه به پنهان کردن کلید مقصد.

## نسخه‌ی کوتاه

استخراج کنید. محافظت کنید. سپس سپرده بگذارید. آدرس استخراج‌کننده و کلید نهایی‌کننده بی‌ارتباط باقی می‌مانند، مگر اینکه خودتان آن‌ها را به هم متصل کنید.
