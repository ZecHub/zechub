<a href="https://github.com/zechub/zechub/edit/main/site/guides/Visualizing_the_Zcash_Network.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


#  مصورسازی شبکه Zcash

در ادامه راهنمایی برای اجرای Ziggurat 3.0 Crawler برای Zcash و همچنین برنامه‌های مرتبط با آن یعنی Crunchy و P2P-Viz روی Ubuntu 22.04 ارائه شده است تا بتوانید اطلاعات شبکه Zcash را جمع‌آوری و مصورسازی کنید.  
ویدیوی پیوندشده در زیر نیز همین فرایند را دنبال می‌کند.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/Nq5cLiAHxPI"
    title="ziggurat 3.0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
    
----------------
## پیش‌نیازهای نصب: 

Rust -> [https://rustup.rs/](https://rustup.rs/)

## اختیاری:
jq -> [https://jqlang.github.io/jq/download/](https://jqlang.github.io/jq/download/)
(برای نمایش اطلاعات json در ترمینال)

curl -> [https://everything.curl.dev/install/linux.html](https://everything.curl.dev/install/linux.html)
(برای ارسال کوئری به RPC کراولر)

npm (همراه با nvm) -> [https://medium.com/@iam_vinojan/how-to-install-node-js-and-npm-using-node-version-manager-nvm-143165b16ce1](https://medium.com/@iam_vinojan/how-to-install-node-js-and-npm-using-node-version-manager-nvm-143165b16ce1)
(برای نمایش P2P-Viz در مرورگر)

----------------


----------------
مخزن Ziggurat 3.0 | [https://github.com/runziggurat](https://github.com/runziggurat)

مخزن Crawler | [https://github.com/runziggurat/zcash.git](https://github.com/runziggurat/zcash.git)

مخزن Crunchy | [https://github.com/runziggurat/crunchy.git](https://github.com/runziggurat/crunchy.git)

مخزن P2P-Viz | [https://github.com/runziggurat/p2p-viz.git](https://github.com/runziggurat/p2p-viz.git)

----------------

ابتدا به‌روزرسانی‌های معمول را اعمال کنید.

>  دستورات زیر را اجرا کنید:
```bash
sudo apt update
sudo apt upgrade
```

----------------

## کراولر شبکه Zcash

کراولر Zcash داخل پوشه‌ای به نام 'zcash' قرار دارد، بنابراین توصیه می‌شود پیش از کلون‌کردن کراولر (مخزن runziggurat/zcash) یک دایرکتوری جدید ایجاد کنید.


>  از دایرکتوری /Home، دستورات زیر را اجرا کنید:
```bash
mkdir runziggurat
cd runziggurat
git clone https://github.com/runziggurat/zcash.git
cd zcash
```

در مرورگر به آدرس زیر بروید 
[https://github.com/runziggurat/zcash/blob/main/src/tools/crawler/README.md](https://github.com/runziggurat/zcash/blob/main/src/tools/crawler/README.md)

یا فایل readme را در مسیر زیر باز کنید 
'/runziggurat/zcash/src/tools/crawler/README.md'

این صفحه شامل اطلاعاتی درباره نحوه استفاده مشخص است. 

----------------


```bash
$ cargo run --release --features crawler --bin crawler -- --help

OPTIONS:
    -c, --crawl-interval <CRAWL_INTERVAL>
            The main crawling loop interval in seconds [default: 5]

    -h, --help
            Print help information

    -r, --rpc-addr <RPC_ADDR>
            If present, start an RPC server at the specified address

    -s, --seed-addrs <SEED_ADDRS>...
            A list of initial standalone IP addresses and/or DNS servers to connect to

    -n, --node-listening-port <NODE_LISTENING_PORT>
            Default port used for connecting to the nodes [default: 8233]

    -V, --version
            Print version information
```

`--seed-addrs` \ `--dns-seed` تنها آرگومان الزامی است و برای اجرا دست‌کم به یک آدرس مشخص نیاز دارد.



----------------

دستور 'cargo run --release --features crawler --bin crawler -- --help' همان دستور اجرای واقعی است و منوی راهنمای نشان‌داده‌شده را چاپ می‌کند.


>  دستور زیر را اجرا کنید
```bash
cargo run --release --features crawler --bin crawler -- --help
```


این کار برنامه را کامپایل می‌کند و اطمینان حاصل می‌کند که همه‌چیز به‌درستی کار می‌کند.

برای اجرای کراولر، لازم است فلگ '--seed-addrs' را به دستور شروع اضافه کنید که دست‌کم شامل یک آدرس IP معتبر از یک نود Zcash باشد. برای به‌دست‌آوردن نتیجه‌ای دقیق، باید اجازه دهید کراولر مدت زمان معقولی اجرا شود. چند نمونه آدرس IP نود را می‌توانید در [https://mainnet.zcashexplorer.app/nodes](https://mainnet.zcashexplorer.app/nodes). پیدا کنید

برای دریافت اطلاعات از کراولر در حین اجرا، لازم است فلگ '--rpc-addr' را به دستور شروع اضافه کنید. این فلگ صرفاً برای اجرای خود کراولر الزامی نیست، اما در غیر این صورت برای نمایش هرگونه اطلاعات باید کراولر را متوقف کنید (ctrl+c یا SIGKILL).


>  دستور زیر را اجرا کنید
```bash
cargo run --release --features crawler --bin crawler -- --seed-addrs 157.245.172.190:8233 194.135.81.61:8233 35.233.224.178:8233 --rpc-addr 127.0.0.1:54321
```

کراولر شروع به ارتباط با شبکه (به‌طور پیش‌فرض هر 20 ثانیه) و جمع‌آوری داده‌های شبکه می‌کند. 
اطلاعات کراولر را می‌توانید با استفاده از curl و ارسال کوئری به نود نمایش دهید (برای نمایش این اطلاعات به jq نیاز است). 
آدرس RPC کراولر در این مثال روی '127.0.0.1:54321' تنظیم شده است


>  در ترمینالی دیگر، دستور زیر را اجرا کنید
```bash
curl --data-binary '{"jsonrpc": "2.0", "id":0, "method": "getmetrics", "params": [] }' -H 'content-type: application/json' http://127.0.0.1:54321/ | jq .result.protocol_versions
```

این دستور داده‌های '.protocol_version' جمع‌آوری‌شده فعلی را که در فیلد '.result' قرار دارند نمایش می‌دهد. فیلد '.result' بسیار بزرگ است، بنابراین بهتر است بخش‌های مشخصی از آن را فراخوانی کنید. انواع داده مفید دیگر عبارت‌اند از '.num_known_nodes'، '.num_good_nodes'، '.user_agents' و غیره. بخش metrics را [اینجا](https://github.com/runziggurat/zcash/tree/main/src/tools/crawler#metrics) ببینید

----------------


----------------
برای اجرای Crunchy و P2P-Viz، لازم است خروجی '.result' را با pipe به یک فایل .json منتقل کنید. 


>  دستور زیر را اجرا کنید
```bash
curl --data-binary '{"jsonrpc": "2.0", "id":0, "method": "getmetrics", "params": [] }' -H 'content-type: application/json' http://127.0.0.1:54321/ > latest.json
```

این دستور یک فایل 'latest.json' در دایرکتوری فعلی ایجاد می‌کند. این فایل 'latest.json' همراه با Crunchy استفاده خواهد شد. 

در این مرحله، اگر به داده بیشتری نیاز ندارید، می‌توانید کراولر را با 'ctrl+c' متوقف کنید. کراولر گزارشی از اطلاعات مفید را در ترمینال نمایش می‌دهد.


----------------

## Crunchy

Crunchy برای تجمیع فایل json خروجی جهت استفاده در P2P-Viz لازم است.


برای ساخت Crunchy، به پوشه '/runziggurat' خود بروید 

>  برای کلون‌کردن مخزن Crunchy، دستورات زیر را اجرا کنید
```bash
git clone https://github.com/runziggurat/crunchy.git
cd crunchy
```
فایل 'latest.json' را کپی کرده و در پوشه 'crunchy/testdata/' قرار دهید.

>  دستورات زیر را اجرا کنید 
```bash
cargo run --release -- -i testdata/latest.json -o testdata/state.json -g testdata/geoip-cache.json -f Zcash
```

این کار یک فایل 'state.json' فیلترشده بر اساس نودهای Zcash را در پوشه 'crunchy/testdata/' ایجاد می‌کند تا همراه با P2P-Viz استفاده شود.

----------------

## P2P-Viz

برای ساخت P2P-Viz، داشتن npm الزامی است. 


>  برای نصب npm با nvm، دستورات زیر را اجرا کنید:
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
```

ترمینال را ببندید و دوباره باز کنید.


>  دستور زیر را اجرا کنید:
```bash
nvm install --lts
```

به پوشه '/runziggurat' خود بروید


>  برای کلون‌کردن مخزن P2P-Viz و اجرای آن، دستورات زیر را اجرا کنید
```bash
git clone https://github.com/runziggurat/p2p-viz.git
cd p2p-viz
npm i
npm run build
npm run start http
```

----------------

مرورگری را در آدرس [http://localhost:3000](http://localhost:3000). باز کنید 

گزینه 'Geolocation' و سپس 'Choose state file' را انتخاب کنید.

از پنجره بازشده مدیریت فایل، فایل 'state.json' را انتخاب کنید. 

نقشه جهانی نود اکسپلورر با داده‌های فایل پر می‌شود. برای جزئیات بیشتر درباره گزینه‌ها و تنظیمات استفاده، فایل readme را [اینجا](https://github.com/runziggurat/p2p-viz#build-and-run-the-app) ببینید.


----------------
نکته! 

شما می‌توانید کراولر را به‌سادگی با دستور 'timeout' روی یک خزش زمان‌دار تنظیم کنید؛ این دستور پس از مدت زمان تعیین‌شده یک فرمان kill مشخص صادر می‌کند. برای اطلاعات بیشتر 'timeout --help' را اجرا کنید.
دستور زیر کراولر را اجرا کرده و پس از 50 دقیقه به‌طور خودکار متوقف می‌کند.

>  دستور زیر را اجرا کنید
```bash
timeout --signal=2 50m cargo run --release --features crawler --bin crawler -- --seed-addrs 157.245.172.190:8233 194.135.81.61:8233 35.233.224.178:8233 --rpc-addr 127.0.0.1:54321
```

----------------
نکته! 

فایل 'latest.json' را می‌توان فراخوانی کرد و مستقیماً در '/testdata' نوشت تا لازم نباشد آن را به‌صورت دستی کپی و جای‌گذاری کنید.

----------------
نکته! 

اطلاعات آدرس IP را می‌توان از خروجی جمع‌آوری کرد و سپس هنگام شروع، از آن برای seed مجدد کراولر (--seed-addrs) استفاده کرد. این کار زمان لازم برای انجام یک خزش کامل را کاهش می‌دهد!
