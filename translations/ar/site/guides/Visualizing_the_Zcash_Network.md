<a href="https://github.com/zechub/zechub/edit/main/site/guides/Visualizing_the_Zcash_Network.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


#  تصوّر شبكة Zcash

فيما يلي دليل يشرح كيفية تشغيل Ziggurat 3.0 Crawler لـ Zcash، بالإضافة إلى البرنامجين المرتبطين به Crunchy وP2P-Viz على Ubuntu 22.04، وذلك لجمع معلومات شبكة Zcash وتصوّرها.  
يتّبع الفيديو المرفق أدناه الخطوات نفسها.

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
## متطلبات التثبيت: 

Rust -> [https://rustup.rs/](https://rustup.rs/)

## اختياري:
jq -> [https://jqlang.github.io/jq/download/](https://jqlang.github.io/jq/download/)
(لعرض معلومات json في الطرفية)

curl -> [https://everything.curl.dev/install/linux.html](https://everything.curl.dev/install/linux.html)
(للاستعلام عن RPC الخاص بالزاحف)

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

## زاحف شبكة Zcash

يوجد زاحف Zcash داخل مجلد باسم 'zcash'، لذا يُستحسن إنشاء دليل جديد قبل استنساخ الزاحف (مستودع runziggurat/zcash).


>  من الدليل /Home، شغّل الأوامر التالية:
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

تحتوي هذه الصفحة على معلومات حول طرق الاستخدام المحددة. 

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

`--seed-addrs` \ `--dns-seed` هو الوسيط الإلزامي الوحيد، ويحتاج إلى عنوان (address) واحد محدد على الأقل كي يعمل.



----------------

الأمر 'cargo run --release --features crawler --bin crawler -- --help' هو أمر التشغيل الحرفي، وسيطبع قائمة المساعدة المعروضة.


>  شغّل الأمر
```bash
cargo run --release --features crawler --bin crawler -- --help
```


سيؤدي هذا إلى تصريف البرنامج والتأكد من أن كل شيء يعمل بشكل صحيح.

لتشغيل الزاحف، يجب إضافة الخيار '--seed-addrs' إلى أمر البدء، على أن يحتوي على عنوان IP صالح واحد على الأقل لعقدة (node) Zcash. ينبغي ترك الزاحف يعمل لمدة زمنية معقولة للحصول على نتيجة دقيقة. يمكنك العثور على بعض عناوين IP للعقد كأمثلة على [https://mainnet.zcashexplorer.app/nodes](https://mainnet.zcashexplorer.app/nodes).

للحصول على معلومات من الزاحف أثناء تشغيله، يجب إضافة الخيار '--rpc-addr' إلى أمر البدء. هذا ليس ضروريًا لمجرد تشغيل الزاحف نفسه، لكن بدونه ستضطر إلى إيقاف الزاحف (ctrl+c أو SIGKILL) لعرض أي معلومات على الإطلاق.


>  شغّل الأمر
```bash
cargo run --release --features crawler --bin crawler -- --seed-addrs 157.245.172.190:8233 194.135.81.61:8233 35.233.224.178:8233 --rpc-addr 127.0.0.1:54321
```

سيبدأ الزاحف بالتواصل مع الشبكة (افتراضيًا كل 20 ثانية) وجمع بيانات الشبكة. 
يمكنك عرض المعلومات من الزاحف باستخدام curl للاستعلام عن العقدة (يتطلب ذلك jq لعرض تلك المعلومات). 
عنوان RPC الخاص بالزاحف في هذا المثال مضبوط على '127.0.0.1:54321'


>  في طرفية أخرى، شغّل الأمر
```bash
curl --data-binary '{"jsonrpc": "2.0", "id":0, "method": "getmetrics", "params": [] }' -H 'content-type: application/json' http://127.0.0.1:54321/ | jq .result.protocol_versions
```

سيعرض هذا بيانات '.protocol_version' المجمّعة حاليًا والموجودة ضمن الحقل '.result'. الحقل '.result' كبير جدًا، لذا من المفيد استدعاء أجزاء محددة منه بدلًا من ذلك. من أنواع البيانات المفيدة الأخرى '.num_known_nodes' و'.num_good_nodes' و'.user_agents' إلخ. راجع قسم المقاييس [هنا](https://github.com/runziggurat/zcash/tree/main/src/tools/crawler#metrics)

----------------


----------------
لتشغيل Crunchy وP2P-Viz، يجب توجيه '.result' إلى ملف .json. 


>  شغّل الأمر
```bash
curl --data-binary '{"jsonrpc": "2.0", "id":0, "method": "getmetrics", "params": [] }' -H 'content-type: application/json' http://127.0.0.1:54321/ > latest.json
```

سيُنشئ هذا ملف 'latest.json' في الدليل الحالي. سيُستخدم ملف 'latest.json' هذا مع Crunchy. 

عند هذه المرحلة، يمكنك إيقاف الزاحف باستخدام 'ctrl+c' إذا لم تعد بحاجة إلى مزيد من البيانات. سيُخرج الزاحف إلى الطرفية تقريرًا بمعلومات مفيدة.


----------------

## Crunchy

Crunchy مطلوب لتجميع ملف json الناتج لاستخدامه مع P2P-Viz.


لبناء Crunchy، انتقل إلى مجلد '/runziggurat' الخاص بك 

>  لاستنساخ مستودع Crunchy، شغّل الأوامر التالية
```bash
git clone https://github.com/runziggurat/crunchy.git
cd crunchy
```
انسخ ملف 'latest.json' والصقه في المجلد 'crunchy/testdata/'.

>  شغّل الأوامر التالية 
```bash
cargo run --release -- -i testdata/latest.json -o testdata/state.json -g testdata/geoip-cache.json -f Zcash
```

سيُنشئ هذا ملف 'state.json' مُرشَّحًا لعقد Zcash في المجلد 'crunchy/testdata/' لاستخدامه مع P2P-Viz.

----------------

## P2P-Viz

لبناء P2P-Viz، يجب أن يكون npm مثبتًا لديك. 


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


>  لاستنساخ مستودع P2P-Viz وتشغيله، شغّل الأوامر التالية
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

من نافذة مستكشف الملفات المنبثقة، اختر ملف 'state.json'. 

ستمتلئ خريطة العالم في مستكشف العقد ببيانات الملف. راجع ملف readme [هنا](https://github.com/runziggurat/p2p-viz#build-and-run-the-app) لمزيد من التفاصيل حول خيارات الاستخدام والإعدادات.


----------------
نصائح! 

يمكنك ضبط الزاحف على زحف موقوت ببساطة باستخدام الأمر 'timeout'، الذي يُصدر أمر إيقاف محددًا بعد مدة زمنية معينة. شغّل 'timeout --help' لمزيد من المعلومات.
سيبدأ الأمر التالي تشغيل الزاحف ويوقفه تلقائيًا بعد 50 دقيقة.

>  شغّل الأمر
```bash
timeout --signal=2 50m cargo run --release --features crawler --bin crawler -- --seed-addrs 157.245.172.190:8233 194.135.81.61:8233 35.233.224.178:8233 --rpc-addr 127.0.0.1:54321
```

----------------
نصائح! 

يمكن استدعاء ملف 'latest.json' وكتابته مباشرة في '/testdata' حتى لا تضطر إلى نسخه ولصقه يدويًا.

----------------
نصائح! 

يمكن جمع معلومات عناوين IP من المُخرجات ثم استخدامها لإعادة تغذية الزاحف عند البدء (--seed-addrs). سيقلل هذا من الوقت اللازم لإجراء زحف كامل!
