# Z3: (zebrad)(zaino)(zingo-cli)

**zebrad**    : عقدة Zcash كاملة

**zaino**     : مفهرس بلوكتشين Zcash

**zingo-cli** : عميل سطر أوامر zaino-proxy لـ Zcash (جزء فرعي من Zingolib)

## فيديو

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/b5dIuGstMvI"
    title="مقدمة إلى Zingolib + Zaino"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## الصورة العامة

[بنية النظام](https://github.com/zingolabs/zaino/blob/dev/docs/zaino_live_system_architecture.pdf)


- يقوم مستخدم Zcash بتثبيت/ترجمة Zingolib مما يتيح الوصول إلى zingo-cli. ويمكنه إرسال/استلام ZEC حسب الحاجة.
- يتصل Zingo-cli بـ zaino إما محليًا أو عبر قناة آمنة على الإنترنت (مستخدم Zcash لا يهتم بكيفية عمل ذلك!)
- يتيح Zaino الوصول إلى كل من zebrad أو zcashd            
- يشكّل zebrad المتزامن بالكامل المصدر المرجعي للحقيقة (لم تعد هناك محافظ هنا!)


## التثبيت

ستحتاج إلى تثبيت 3 أشياء لكي يعمل هذا بشكل صحيح. أوصي أيضًا باستخدام screen أو شيء مشابه للمساعدة في إدارة الشاشات

`sudo apt install screen`

### zebrad

```
git clone https://github.com/ZcashFoundation/zebra.git
cd zebra
cargo install --git https://github.com/ZcashFoundation/zebra --tag v2.0.1 zebrad
```

 
*اختياري* (أنشئ جلسة screen لـ zebrad)

```
screen -S zebra
zebrad start
```

ملاحظة: سيحتاج هذا إلى مزامنة كاملة! 

### zaino

```
git clone https://github.com/zingolabs/zaino.git
cd zaino
cargo build --release
PATH=$PATH:~/Desktop/zaino/target/release/
```


*اختياري* (أنشئ جلسة screen لـ zaino)

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

*اختياري* (أنشئ جلسة screen لـ zingo-cli)

```
screen -S zingo
./zingo-cli --server http://127.0.0.1:8137 --data-dir /media/zebra5/zebra/.cache/lightwalletd
```

ملاحظة: سيحتاج هذا إلى مزامنة كاملة، تمامًا كما كان الحال مع lightwalletd. أوصي باستخدام قرص خارجي لتوفير الوقت :)


## التشغيل

إذا كنت تشغّل هذه ضمن جلسات screen، فإن `screen -r` سيعرض لك كل جلسة screen حتى تتمكن من الانتقال إليها حسب الحاجة
