# Z3: (zebrad)(zaino)(zingo-cli)

**zebrad**    : فول‌نود zcash

**zaino**     : ایندکسر بلاک‌چین zcash

**zingo-cli** : کلاینت خط فرمان zaino-proxy برای zcash (زیرمجموعه‌ای از Zingolib)

## ویدیو

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/b5dIuGstMvI"
    title="An introduction to Zingolib + Zaino"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## تصویر کلی

[معماری سیستم](https://github.com/zingolabs/zaino/blob/dev/docs/zaino_live_system_architecture.pdf)


- Zcash کاربر Zingolib را نصب یا کامپایل می‌کند که به او دسترسی به zingo-cli را می‌دهد. او می‌تواند در صورت نیاز ZEC ارسال و دریافت کند.
- zingo-cli یا به‌صورت محلی یا از طریق یک کانال امن آنلاین به zaino متصل می‌شود (برای کاربر Zcash مهم نیست این کار چگونه انجام می‌شود!)
- Zaino دسترسی به zebrad یا zcashd را فراهم می‌کند            
- zebrad که به‌طور کامل همگام‌سازی شده، منبع حقیقت است (دیگر کیف‌پولی اینجا نیست!)



## نصب

برای اینکه این مجموعه به‌درستی کار کند، باید 3 چیز را نصب کنید. همچنین توصیه می‌کنم برای مدیریت صفحه‌ها از screen یا ابزاری مشابه استفاده کنید

`sudo apt install screen`

### zebrad

```
git clone https://github.com/ZcashFoundation/zebra.git
cd zebra
cargo install --git https://github.com/ZcashFoundation/zebra --tag v7.0.0 zebrad
```

از Zebra نسخهٔ 7.0.0 یا جدیدتر استفاده کنید: NU7 در Mainnet در بلوک 3,543,405 فعال شد و نسخه‌های قدیمی‌تر `zebrad` نمی‌توانند زنجیره را پس از آن ارتفاع دنبال کنند ([یادداشت‌های انتشار](https://github.com/ZcashFoundation/zebra/releases/tag/v7.0.0)).

 
*اختیاری* (یک نشست screen برای zebrad ایجاد کنید)

```
screen -S zebra
zebrad start
```

توجه: این باید به‌طور کامل همگام‌سازی شود! 

### zaino

```
git clone https://github.com/zingolabs/zaino.git
cd zaino
cargo build --release
PATH=$PATH:~/Desktop/zaino/target/release/
```


*اختیاری* (یک نشست screen برای zaino ایجاد کنید)

```
screen -S zaino
cd ~/zaino/zainod
nano zindexer.toml  => Adjust port to 8232 for mainnet
zainod --config zindexer.toml
```


### zingo-cli

```
git clone https://github.com/zingolabs/zingolib.git
cd zingolib
cargo build --release --package zingo-cli
```

*اختیاری* (یک نشست screen برای zingo-cli ایجاد کنید)

```
screen -S zingo
./zingo-cli --server http://127.0.0.1:8137 --data-dir /media/zebra5/zebra/.cache/lightwalletd
```

توجه: این هم باید به‌طور کامل همگام‌سازی شود، درست همان‌طور که lightwalletd همگام‌سازی شد. توصیه می‌کنم برای صرفه‌جویی در زمان از یک درایو خارجی استفاده کنید :)


## اجرا

اگر این‌ها را در screen اجرا می‌کنید، `screen -r` همهٔ screenها را برای شما فهرست می‌کند تا در صورت نیاز به هر کدام بروید
