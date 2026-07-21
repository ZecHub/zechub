<a href="https://github.com/zechub/zechub/edit/main/site/guides/Visualizing_the_Zcash_Network.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="تحرير الصفحة"/>
</a>


#  تصوّر شبكة Zcash

فيما يلي دليل حول كيفية تشغيل Ziggurat 3.0 Crawler لـ Zcash بالإضافة إلى البرامج المرتبطة به Crunchy وP2P-Viz على Ubuntu 22.04 من أجل جمع معلومات شبكة Zcash وتصوّرها.  
يتبع الفيديو المرتبط أدناه العملية نفسها.

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
## تثبيت المتطلبات: 

Rust -> [https://rustup.rs/](https://rustup.rs/)

## اختياري:
jq -> [https://jqlang.github.io/jq/download/](https://jqlang.github.io/jq/download/)
(لعرض معلومات json في الطرفية)

curl -> [https://everything.curl.dev/get/linux](https://everything.curl.dev/get/linux)
(لاستعلام RPC الخاص بالـ crawler)

npm (مع nvm) -> [https://medium.com/@iam_vinojan/how-to-install-node-js-and-npm-using-node-version-manager-nvm-143165b16ce1](https://medium.com/@iam_vinojan/how-to-install-node-js-and-npm-using-node-version-manager-nvm-143165b16ce1)
(لعرض P2P-Viz في المتصفح)

----------------


----------------
مستودع Ziggurat 3.0 | [https://github.com/runziggurat](https://github.com/runziggurat)

مستودع Crawler | [https://github.com/runziggurat/zcash.git](https://github.com/runziggurat/zcash.git)

مستودع Crunchy | [https://github.com/runziggurat/crunchy.git](https://github.com/runziggurat/crunchy.git)

مستودع P2P-Viz | [https://github.com/runziggurat/p2p-viz.git](https://github.com/runziggurat/p2p-viz.git)

----------------

ابدأ بتطبيق التحديثات المعتادة.

>  شغّل الأوامر التالية:
```bash
sudo apt update
sudo apt upgrade
```

----------------

## Crawler شبكة Zcash

يوجد Zcash Crawler داخل مجلد باسم 'zcash' لذلك قد يكون من المستحسن إنشاء دليل جديد قبل استنساخ الـ crawler (مستودع runziggurat/zcash).


>  من دليل /Home، شغّل الأوامر التالية:
```bash
mkdir runziggurat
cd runziggurat
git clone https://github.com/runziggurat/zcash.git
cd zcash
```

انتقل في المتصفح إلى 
[https://github.com/runziggurat/zcash/blob/main/src/tools/crawler/README.md](https://github.com/runziggurat/zcash/blob/main/src/tools/crawler/README.md)

أو افتح ملف readme في 
'/runziggurat/zcash/src/tools/crawler/README.md'

تحتوي هذه الصفحة على معلومات حول الاستخدام المحدد. 

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

يُعد `--seed-addrs` \ `--dns-seed` الوسيط المطلوب الوحيد، ويحتاج إلى عنوان محدد واحد على الأقل لكي يعمل.



----------------

الأمر 'cargo run --release --features crawler --bin crawler -- --help' هو أمر التشغيل الحرفي وسيطبع قائمة المساعدة المعروضة.


>  شغّل الأمر
```bash
cargo run --release --features crawler --bin crawler -- --help
```


سيؤدي ذلك إلى ترجمة البرنامج والتأكد من أن كل شيء يعمل بشكل صحيح.

لتشغيل Crawler، يلزم إضافة العلامة '--seed-addrs' إلى أمر البدء، بحيث تحتوي على عنوان IP واحد صالح على الأقل لعقدة Zcash. يجب السماح للـ crawler بالعمل لمدة زمنية معقولة للحصول على نتيجة دقيقة. يمكن العثور على بعض عناوين IP النموذجية للعقد على [https://zcashblockexplorer.com/nodes](https://zcashblockexplorer.com/nodes).

للحصول على معلومات من Crawler أثناء تشغيله، يلزم إضافة العلامة '--rpc-addr' إلى أمر البدء. هذا ليس مطلوبًا لتشغيل الـ crawler وحده، لكنه بخلاف ذلك سيتطلب إيقاف الـ crawler (`ctrl+c` أو SIGKILL) لعرض أي معلومات على الإطلاق.


>  شغّل الأمر
```bash
cargo run --release --features crawler --bin crawler -- --seed-addrs 157.245.172.190:8233 194.135.81.61:8233 35.233.224.178:8233 --rpc-addr 127.0.0.1:54321
```

سيبدأ الـ crawler بالتواصل مع الشبكة (افتراضيًا كل 20 ثانية) وجمع بيانات الشبكة. 
يمكن عرض المعلومات من Crawler باستخدام curl لاستعلام العقدة (وهذا يتطلب jq لعرض تلك المعلومات). 
تم تعيين عنوان Crawler RPC في هذا المثال إلى '127.0.0.1:54321'


>  في طرفية أخرى، شغّل الأمر
```bash
curl --data-binary '{"jsonrpc": "2.0", "id":0, "method": "getmetrics", "params": [] }' -H 'content-type: application/json' http://127.0.0.1:54321/ | jq .result.protocol_versions
```

سيعرض هذا بيانات '.protocol_version' المجمعة حاليًا والموجودة داخل الحقل '.result'. الحقل '.result' كبير جدًا، لذلك من المفيد استدعاء أجزاء محددة منه بدلًا من ذلك. من أنواع البيانات المفيدة الأخرى '.num_known_nodes' و'.num_good_nodes' و'.user_agents' وغيرها. راجع قسم المقاييس [هنا](https://github.com/runziggurat/zcash/tree/main/src/tools/crawler#metrics)

----------------


----------------
لتشغيل Crunchy وP2P-Viz، يلزم تمرير '.result' إلى ملف ‎.json. 


>  شغّل الأمر
```bash
curl --data-binary '{"jsonrpc": "2.0", "id":0, "method": "getmetrics", "params": [] }' -H 'content-type: application/json' http://127.0.0.1:54321/ > latest.json
```

سيؤدي ذلك إلى إنشاء ملف 'latest.json' في الدليل الحالي. سيُستخدم ملف 'latest.json' هذا مع Crunchy. 

عند هذه النقطة، يمكن إيقاف Crawler باستخدام 'ctrl+c' إذا لم تعد هناك حاجة إلى مزيد من البيانات. سيقوم Crawler بإخراج تقرير إلى الطرفية يتضمن معلومات مفيدة.


----------------

## Crunchy

يُطلب Crunchy لتجميع ملف json الناتج لاستخدامه مع P2P-Viz.


لبناء Crunchy، انتقل إلى مجلد '/runziggurat' الخاص بك 

>  لاستنساخ مستودع Crunchy، شغّل الأوامر التالية
```bash
git clone https://github.com/runziggurat/crunchy.git
cd crunchy
```
انسخ والصق ملف 'latest.json' داخل مجلد 'crunchy/testdata/'.

>  شغّل الأوامر التالية 
```bash
cargo run --release -- -i testdata/latest.json -o testdata/state.json -g testdata/geoip-cache.json -f Zcash
```

سيؤدي ذلك إلى إنشاء ملف 'state.json' مُرشَّح لعقد Zcash داخل مجلد 'crunchy/testdata/' لاستخدامه مع P2P-Viz.

----------------

## P2P-Viz

لبناء P2P-Viz، يلزم توفر npm. 


>  لتثبيت npm باستخدام nvm، شغّل الأوامر التالية:
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
```

أغلق الطرفية وأعد تشغيلها.


>  شغّل الأمر:
```bash
nvm install --lts
```

انتقل إلى مجلد '/runziggurat' الخاص بك


>  لاستنساخ مستودع P2P-Viz وبدء التشغيل، شغّل الأوامر التالية
```bash
git clone https://github.com/runziggurat/p2p-viz.git
cd p2p-viz
npm i
npm run build
npm run start http
```

----------------

افتح متصفحًا على [http://localhost:3000](http://localhost:3000). 

اختر 'Geolocation' ثم اختر 'Choose state file'.

من النافذة المنبثقة لمستكشف الملفات، اختر ملف 'state.json'. 

سيتم ملء خريطة العالم في مستكشف العقد ببيانات الملف. راجع ملف readme [هنا](https://github.com/runziggurat/p2p-viz#build-and-run-the-app) لمزيد من التفاصيل حول خيارات الاستخدام والإعدادات.


----------------
نصائح! 

يمكنك ضبط Crawler على زحف مؤقت ببساطة باستخدام الأمر 'timeout' الذي سيصدر أمر إيقاف محددًا بعد مدة زمنية معينة. شغّل 'timeout --help' لمزيد من المعلومات.
سيقوم الأمر التالي ببدء الـ crawler وكذلك إيقافه تلقائيًا بعد 50 دقيقة.

>  شغّل الأمر
```bash
timeout --signal=2 50m cargo run --release --features crawler --bin crawler -- --seed-addrs 157.245.172.190:8233 194.135.81.61:8233 35.233.224.178:8233 --rpc-addr 127.0.0.1:54321
```

----------------
نصائح! 

يمكن استدعاء 'latest.json' وكتابته داخل '/testdata' حتى لا تضطر إلى نسخه ولصقه يدويًا.

----------------
نصائح! 

يمكن جمع معلومات عنوان IP من المخرجات ثم استخدامها لإعادة تزويد Crawler عند البدء (`--seed-addrs`). سيؤدي ذلك إلى تقليل الوقت المطلوب لإجراء زحف كامل!
