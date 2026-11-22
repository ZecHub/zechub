# اجرای فول‌نود روی Raspberry Pi 4 (Zebra + Zallet)

*این راهنما از نسخهٔ اصلی مبتنی بر zcashd منتقل شده است. zcashd در تاریخ 18 جولای 2026 به توقف خودکار پایان پشتیبانی رسید، بنابراین این راهنما اکنون از **Zebra** (فول‌نود فعلی که توسط Zcash Foundation نگهداری می‌شود) و **Zallet** (کیف‌پولی که برای جایگزینی کیف‌پول داخلی zcashd ساخته شده است) استفاده می‌کند.*

## آنچه یاد خواهید گرفت
- نحوهٔ نصب و پیکربندی Ubuntu Server 22.04+ (64 بیتی) روی Raspberry Pi 4 برای استفادهٔ بدون نمایشگر
- نحوهٔ نصب و اجرای Zebra، از طریق Docker یا یک فایل باینری از پیش ساخته‌شده
- نحوهٔ نصب، پیکربندی و راه‌اندازی اولیهٔ Zallet، از جمله تنظیم رمزنگاری کیف‌پول
- نحوهٔ انتقال اختیاری پیکربندی یا کیف‌پول موجود zcashd به Zallet

## تغییرات نسبت به راهنمای قدیمی
نسخهٔ قبلی این راهنما مراحل کامپایل بومی **zcashd** روی Pi 4 را شرح می‌داد؛ کامپایلی تک‌رشته‌ای که 3 تا 4 ساعت طول می‌کشید، زیرا Pi 4 حافظهٔ کافی برای ساخت موازی (`-j$(nproc)`) ندارد. اکنون Zebra و Zallet هر دو **فایل‌های باینری رسمی از پیش ساخته‌شده برای ARM64 و ایمیج‌های Docker** ارائه می‌کنند، بنابراین در بیشتر موارد دیگر لازم نیست چیزی را از سورس روی خود Pi کامپایل کنید.

## پیش‌نیازها
- یک Raspberry Pi 4 (4 گیگابایت RAM یا بیشتر توصیه می‌شود)
- یک کارت microSD (32 گیگابایت یا بیشتر) برای سیستم‌عامل
- یک SSD/HDD خارجی با پشتیبانی از USB 3.0؛ **Zebra تقریباً به 300 گیگابایت فضا برای داده‌های کش‌شدهٔ Mainnet نیاز دارد** که با گذشت زمان افزایش می‌یابد، پس سعی نکنید این را فقط روی کارت microSD اجرا کنید
- یک رایانه با شیار کارت microSD (برای نوشتن ایمیج سیستم‌عامل)
- اتصال Ethernet سیمی یا Wi-Fi
- آشنایی مقدماتی با خط فرمان از طریق SSH

## مرحلهٔ 1: نصب Ubuntu Server 22.04+ (64 بیتی)
فایل‌های باینری از پیش ساخته‌شده و ایمیج‌های Docker مربوط به Zebra و Zallet به **glibc 2.34+** نیاز دارند، یعنی **Ubuntu Server 22.04 یا جدیدتر (64 بیتی/aarch64)**.

1. Raspberry Pi Imager را روی رایانهٔ اصلی خود نصب کنید.
2. کارت microSD خود را وارد کنید.
3. گزینهٔ **Other general-purpose OS → Ubuntu → Ubuntu Server 22.04 LTS (64-bit)** (یا جدیدتر) را انتخاب کنید.
4. از گزینه‌های پیشرفتهٔ Imager (نماد چرخ‌دنده) برای پیکربندی از پیش نام میزبان، فعال‌سازی SSH و در صورت نیاز تنظیم اطلاعات Wi-Fi استفاده کنید تا اولین راه‌اندازی بدون نمایشگر انجام شود.
5. ایمیج را بنویسید، کارت را وارد کنید و Pi را روشن کنید.
6. از طریق SSH وارد شوید: `ssh <username>@<pi-hostname-or-ip>`

## مرحلهٔ 2: اتصال و مانت کردن حافظهٔ خارجی
1. SSD/HDD خارجی خود را از طریق USB 3.0 وصل کنید.
2. دستگاه را شناسایی کنید: `lsblk`
3. آن را (در صورت نو بودن) فرمت و مانت کنید، برای مثال در `/mnt/zcash-data`، با یک پیکربندی استاندارد `mkfs`/`fstab` تا پس از راه‌اندازی مجدد به‌طور خودکار مانت شود.

## مرحلهٔ 3: به‌روزرسانی سیستم
```bash
sudo apt update && sudo apt full-upgrade -y
sudo reboot
```

## مرحلهٔ 4: نصب و اجرای Zebra
### گزینهٔ A — Docker (توصیه‌شده)
```bash
sudo apt install -y docker.io
sudo usermod -aG docker $USER   # log out/in after this
docker run -d \
  --name zebra \
  -p 8233:8233 \
  -v /mnt/zcash-data/zebra:/home/zebra/.cache/zebra \
  zfnd/zebra:latest
```
بررسی پیشرفت: `docker logs -f zebra`

### گزینهٔ B — فایل باینری از پیش ساخته‌شده از طریق cargo binstall
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source "$HOME/.cargo/env"
cargo install cargo-binstall
cargo binstall zebrad
zebrad start
```
این دستور یک فایل باینری از پیش ساخته‌شدهٔ `aarch64` را نصب می‌کند و نیازی به کامپایل نیست.

**دربارهٔ زمان همگام‌سازی:** انتظار داشته باشید که این کار مدتی طول بکشد. ارقامی که معمولاً برای اولین همگام‌سازی ذکر می‌شوند (تقریباً 2 ساعت) مربوط به سخت‌افزار مرجعی هستند که از CPU یک Pi 4 قدرتمندتر است، بنابراین زمان واقعی همگام‌سازی روی سخت‌افزار واقعی Pi 4 احتمالاً بیشتر خواهد بود.

## مرحلهٔ 5: نصب Zallet
Zallet در حال حاضر در مرحلهٔ **alpha** است؛ انتظار تغییرات ناسازگار را داشته باشید و فعلاً آن را به‌عنوان راهکاری آمادهٔ تولید برای نگهداری مبالغ قابل‌توجه در نظر نگیرید.

### گزینهٔ A — Docker (توصیه‌شده)
```bash
docker pull zodlinc/zallet:latest
```
این ایمیج از ARM64 پشتیبانی می‌کند (از طریق ساخت مبتنی بر Nix) و از یک فایل‌سیستم حداقلی و بدون shell اجرا می‌شود؛ پیکربندی و مسیرهای داده را به‌صراحت از طریق `--datadir` و مانت‌های volume ارسال کنید (به مرحلهٔ 6 مراجعه کنید).

### گزینهٔ B — ساخت از سورس
```bash
# Requires Rust 1.85+ (see Step 4B for rustup install)
sudo apt install -y clang libclang-dev protobuf-compiler
cargo install --locked --git https://github.com/zcash/wallet.git
```
Crateهای Zallet در مرحلهٔ alpha هنوز در crates.io منتشر نشده‌اند، بنابراین نصب مستقیم از مخزن git روش پشتیبانی‌شدهٔ غیر Docker است.

## مرحلهٔ 6: پیکربندی Zallet
فایل `zallet.toml` را در datadir انتخابی خود ایجاد کنید (برای مثال `/mnt/zcash-data/zallet`):
```toml
[builder.limits]
[consensus]
network = "main"
[database]
[external]
[features]
as_of_version = "0.0.0"
[features.deprecated]
[features.experimental]
[indexer]
validator_address = "127.0.0.1:8232"   # Zebra's JSON-RPC endpoint
[keystore]
[note_management]
[rpc]
bind = ["127.0.0.1:SOMEPORT"]
```
اگر Zebra روی میزبان یا پورت دیگری اجرا می‌شود، `validator_address` را تنظیم کنید و `validator_cookie_auth`/`validator_user`/`validator_password` را در بخش `[indexer]` مطابق با تنظیمات احراز هویت RPC در Zebra پیکربندی کنید.

**از zcashd مهاجرت می‌کنید؟** اگر هنوز یک `zcash.conf` قدیمی دارید:
```bash
zallet migrate-zcash-conf --datadir /path/to/old/zcashd/datadir -o /mnt/zcash-data/zallet/zallet.toml
```

## مرحلهٔ 7: تنظیم رمزنگاری کیف‌پول
Zallet تمام اطلاعات کلیدها را با استفاده از `age`/`rage` رمزنگاری می‌کند:
```bash
cargo install rage
rage -p -o /mnt/zcash-data/zallet/encryption-identity.txt <(rage-keygen)
```
این دستور یک کلید عمومی و یک عبارت عبور خودکار تولیدشده را نمایش می‌دهد. **عبارت عبور را ذخیره کنید؛ بدون آن نمی‌توانید فایل هویت را بازیابی کنید.**

## مرحلهٔ 8: راه‌اندازی اولیه و اجرای کیف‌پول
```bash
zallet -d /mnt/zcash-data/zallet init-wallet-encryption
zallet -d /mnt/zcash-data/zallet generate-mnemonic
```
**`generate-mnemonic` را فقط یک بار اجرا کنید**، مگر اینکه عمداً بخواهید چند ریشهٔ خرج مستقل داشته باشید.

```bash
zallet -d /mnt/zcash-data/zallet start
```

## مرحلهٔ 9: انتقال کیف‌پول موجود zcashd (اختیاری)
```bash
zallet -d /mnt/zcash-data/zallet migrate-zcashd-wallet --zcashd-datadir /path/to/old/zcashd/datadir
```
این کار به ابزار `db_dump` (ساخته‌شده با Berkeley DB 6.2.23) نیاز دارد که از نصب سیستمی یا ساخت محلی zcashd از سورس به دست می‌آید. اگر دیگر zcashd را نصب ندارید، این تنها مرحلهٔ مهاجرت است که هنوز به‌طور کامل درون Zallet انجام‌پذیر نیست.

## مرحلهٔ 10: بررسی عملکرد صحیح همه‌چیز
```bash
zallet -d /mnt/zcash-data/zallet help
```
مطمئن شوید که کیف‌پول پاسخ می‌دهد و پس از اتمام همگام‌سازی Zebra، موجودی‌ها و آدرس‌ها مطابق انتظار هستند.

## عیب‌یابی
- **مشکلات ساخت یا اجرای Zebra روی ARM:** اگر از سورس می‌سازید، toolchain مربوط به ARM در Rust را نصب کنید؛ طبق مستندات خود Zebra، اجرای ابزارهای ساخت x86_64 روی سخت‌افزار ARM به‌طور محسوسی کندتر خواهد بود.
- **پر شدن فضای ذخیره‌سازی:** فضای حدود 300 گیگابایتی Zebra همچنان در حال افزایش است؛ فضای اضافی در نظر بگیرید.
- **خطاهای دسترسی Docker:** پس از افزودن کاربر خود به گروه `docker`، از سیستم خارج و دوباره وارد شوید، یا در این فاصله از `sudo` استفاده کنید.
- **کانتینر Zallet فاقد shell است:** ایمیج رسمی `zodlinc/zallet` عمداً از پایه (from-scratch) ساخته شده است؛ همیشه `--datadir` را به‌صراحت ارسال کنید و دایرکتوری داده‌های خود را به‌عنوان volume مانت کنید.

## نکات سخت‌افزاری در مقایسه با راهنمای قدیمی zcashd
Zebra و Zallet در هنگام راه‌اندازی معمولاً بار کمتری نسبت به کامپایل zcashd روی CPU وارد می‌کنند، زیرا شما فایل‌های باینری یا کانتینرهای از پیش ساخته‌شده را اجرا می‌کنید. 4 گیگابایت RAM نقطهٔ شروع معقولی است؛ با `htop` وضعیت را پایش کنید و اگر swap سنگینی مشاهده کردید، نسخهٔ 8 گیگابایتی Pi 4 را در نظر بگیرید.

## منابع بیشتر
- [کتاب Zebra](https://zebra.zfnd.org) — مستندات رسمی Zebra
- [کتاب Zallet](https://zcash.github.io/zallet/) — مستندات رسمی Zallet
- [اطلاعیهٔ پایان پشتیبانی zcashd](https://z.cash/support/zcashd-deprecation)

---

*اگر این راهنما برای شما مفید بود، حمایت از ZecHub را در نظر بگیرید: [آدرس محافظت‌شدهٔ فعلی کمک مالی ZecHub را از zechub.wiki/donation وارد کنید — در اینجا درج نشده است، زیرا نتوانستم از معتبر بودن فعلی آن اطمینان حاصل کنم].*
