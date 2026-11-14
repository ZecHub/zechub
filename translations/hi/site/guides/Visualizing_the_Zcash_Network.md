<a href="https://github.com/zechub/zechub/edit/main/site/guides/Visualizing_the_Zcash_Network.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


#  Zcash नेटवर्क का विज़ुअलाइज़ेशन

यह गाइड बताती है कि Zcash नेटवर्क की जानकारी इकट्ठा करने और उसे विज़ुअलाइज़ करने के लिए Ubuntu 22.04 पर Zcash के लिए Ziggurat 3.0 क्रॉलर (Crawler) और उससे जुड़े प्रोग्राम Crunchy और P2P-Viz कैसे चलाए जाते हैं।  
नीचे दिया गया वीडियो भी यही प्रक्रिया दिखाता है।

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
## आवश्यकताओं का इंस्टॉलेशन: 

Rust -> [https://rustup.rs/](https://rustup.rs/)

## वैकल्पिक:
jq -> [https://jqlang.github.io/jq/download/](https://jqlang.github.io/jq/download/)
(टर्मिनल में json जानकारी दिखाने के लिए)

curl -> [https://everything.curl.dev/install/linux.html](https://everything.curl.dev/install/linux.html)
(क्रॉलर RPC से क्वेरी करने के लिए)

npm (nvm के साथ) -> [https://medium.com/@iam_vinojan/how-to-install-node-js-and-npm-using-node-version-manager-nvm-143165b16ce1](https://medium.com/@iam_vinojan/how-to-install-node-js-and-npm-using-node-version-manager-nvm-143165b16ce1)
(ब्राउज़र में P2P-Viz दिखाने के लिए)

----------------


----------------
Ziggurat 3.0 रिपॉज़िटरी | [https://github.com/runziggurat](https://github.com/runziggurat)

क्रॉलर रिपॉज़िटरी | [https://github.com/runziggurat/zcash.git](https://github.com/runziggurat/zcash.git)

Crunchy रिपॉज़िटरी | [https://github.com/runziggurat/crunchy.git](https://github.com/runziggurat/crunchy.git)

P2P-Viz रिपॉज़िटरी | [https://github.com/runziggurat/p2p-viz.git](https://github.com/runziggurat/p2p-viz.git)

----------------

सबसे पहले सामान्य अपडेट लागू करें।

>  निम्नलिखित कमांड चलाएँ:
```bash
sudo apt update
sudo apt upgrade
```

----------------

## Zcash नेटवर्क क्रॉलर

Zcash क्रॉलर “zcash” नामक फ़ोल्डर के अंदर रहता है, इसलिए क्रॉलर (runziggurat/zcash रिपॉज़िटरी) को क्लोन करने से पहले एक नई डायरेक्टरी बनाना उचित हो सकता है।


>  /Home डायरेक्टरी से निम्नलिखित कमांड चलाएँ:
```bash
mkdir runziggurat
cd runziggurat
git clone https://github.com/runziggurat/zcash.git
cd zcash
```

ब्राउज़र में यहाँ जाएँ: 
[https://github.com/runziggurat/zcash/blob/main/src/tools/crawler/README.md](https://github.com/runziggurat/zcash/blob/main/src/tools/crawler/README.md)

या readme यहाँ खोलें: 
'/runziggurat/zcash/src/tools/crawler/README.md'

इस पेज पर विशिष्ट उपयोग के बारे में जानकारी है। 

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

`--seed-addrs` \ `--dns-seed` एकमात्र आवश्यक आर्गुमेंट है, और इसे चलाने के लिए कम से कम एक एड्रेस निर्दिष्ट करना ज़रूरी है।



----------------

कमांड 'cargo run --release --features crawler --bin crawler -- --help' वास्तविक रन कमांड है और यह ऊपर दिखाया गया हेल्प मेनू प्रिंट करेगी।


>  यह कमांड चलाएँ
```bash
cargo run --release --features crawler --bin crawler -- --help
```


इससे प्रोग्राम कंपाइल होगा और यह सुनिश्चित होगा कि सब कुछ ठीक से काम कर रहा है।

क्रॉलर चलाने के लिए स्टार्ट कमांड में '--seed-addrs' फ़्लैग जोड़ना आवश्यक है, जिसमें कम से कम एक मान्य Zcash नोड IP एड्रेस हो। सटीक परिणाम पाने के लिए क्रॉलर को उचित समय तक चलने देना चाहिए। कुछ नमूना नोड IP एड्रेस यहाँ मिल सकते हैं:  [https://mainnet.zcashexplorer.app/nodes](https://mainnet.zcashexplorer.app/nodes).

क्रॉलर के चलते समय उससे जानकारी प्राप्त करने के लिए स्टार्ट कमांड में '--rpc-addr' फ़्लैग जोड़ना आवश्यक है। केवल क्रॉलर चलाने के लिए यह ज़रूरी नहीं है, लेकिन इसके बिना कोई भी जानकारी दिखाने के लिए क्रॉलर को रोकना (ctrl+c या SIGKILL) पड़ेगा।


>  यह कमांड चलाएँ
```bash
cargo run --release --features crawler --bin crawler -- --seed-addrs 157.245.172.190:8233 194.135.81.61:8233 35.233.224.178:8233 --rpc-addr 127.0.0.1:54321
```

क्रॉलर नेटवर्क के साथ संचार शुरू करेगा (डिफ़ॉल्ट रूप से हर 20 सेकंड में) और नेटवर्क डेटा इकट्ठा करेगा। 
क्रॉलर की जानकारी curl से नोड को क्वेरी करके दिखाई जा सकती है (इस जानकारी को दिखाने के लिए jq आवश्यक है)। 
इस उदाहरण में क्रॉलर RPC एड्रेस '127.0.0.1:54321' पर सेट है।


>  दूसरे टर्मिनल में यह कमांड चलाएँ
```bash
curl --data-binary '{"jsonrpc": "2.0", "id":0, "method": "getmetrics", "params": [] }' -H 'content-type: application/json' http://127.0.0.1:54321/ | jq .result.protocol_versions
```

यह '.result' फ़ील्ड में मौजूद, अब तक इकट्ठा किया गया '.protocol_version' डेटा दिखाएगा। '.result' फ़ील्ड बहुत बड़ा है, इसलिए इसके विशिष्ट हिस्सों को कॉल करना उपयोगी है। अन्य उपयोगी डेटा प्रकार हैं '.num_known_nodes', '.num_good_nodes', '.user_agents' आदि। मेट्रिक्स सेक्शन [यहाँ](https://github.com/runziggurat/zcash/tree/main/src/tools/crawler#metrics) देखें।

----------------


----------------
Crunchy और P2P-Viz चलाने के लिए '.result' को एक .json फ़ाइल में पाइप करना आवश्यक है। 


>  यह कमांड चलाएँ
```bash
curl --data-binary '{"jsonrpc": "2.0", "id":0, "method": "getmetrics", "params": [] }' -H 'content-type: application/json' http://127.0.0.1:54321/ > latest.json
```

इससे मौजूदा डायरेक्टरी में एक 'latest.json' फ़ाइल बनेगी। इस 'latest.json' फ़ाइल का उपयोग Crunchy के साथ किया जाएगा। 

इस समय, अगर और डेटा की आवश्यकता नहीं है, तो क्रॉलर को 'ctrl+c' से रोका जा सकता है। क्रॉलर टर्मिनल में उपयोगी जानकारी की एक रिपोर्ट आउटपुट करेगा।


----------------

## Crunchy

P2P-Viz के साथ उपयोग के लिए आउटपुट json फ़ाइल को एकत्रित (aggregate) करने हेतु Crunchy आवश्यक है।


Crunchy बिल्ड करने के लिए अपने '/runziggurat' फ़ोल्डर पर जाएँ। 

>  Crunchy रिपॉज़िटरी को क्लोन करने के लिए निम्नलिखित कमांड चलाएँ
```bash
git clone https://github.com/runziggurat/crunchy.git
cd crunchy
```
'latest.json' फ़ाइल को कॉपी करके 'crunchy/testdata/' फ़ोल्डर में पेस्ट करें।

>  निम्नलिखित कमांड चलाएँ 
```bash
cargo run --release -- -i testdata/latest.json -o testdata/state.json -g testdata/geoip-cache.json -f Zcash
```

इससे 'crunchy/testdata/' फ़ोल्डर में Zcash नोड द्वारा फ़िल्टर की गई एक 'state.json' फ़ाइल बनेगी, जिसका उपयोग P2P-Viz के साथ किया जाएगा।

----------------

## P2P-Viz

P2P-Viz बिल्ड करने के लिए npm होना आवश्यक है। 


>  nvm के साथ npm इंस्टॉल करने के लिए निम्नलिखित कमांड चलाएँ:
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
```

टर्मिनल बंद करें और फिर से शुरू करें।


>  यह कमांड चलाएँ:
```bash
nvm install --lts
```

अपने '/runziggurat' फ़ोल्डर पर जाएँ।


>  P2P-Viz रिपॉज़िटरी को क्लोन करने और शुरू करने के लिए निम्नलिखित कमांड चलाएँ
```bash
git clone https://github.com/runziggurat/p2p-viz.git
cd p2p-viz
npm i
npm run build
npm run start http
```

----------------

ब्राउज़र में [http://localhost:3000](http://localhost:3000). खोलें। 

'Geolocation' चुनें और फिर 'Choose state file' चुनें।

फ़ाइल एक्सप्लोरर पॉप-अप से 'state.json' फ़ाइल चुनें। 

नोड एक्सप्लोरर का विश्व मानचित्र फ़ाइल के डेटा से भर जाएगा। उपयोग के विकल्पों और सेटिंग्स के बारे में अधिक जानकारी के लिए readme [यहाँ](https://github.com/runziggurat/p2p-viz#build-and-run-the-app) देखें।


----------------
सुझाव! 

आप 'timeout' कमांड से क्रॉलर को एक तय समय तक क्रॉल करने के लिए सेट कर सकते हैं, जो निर्धारित समय के बाद एक विशिष्ट kill कमांड जारी करेगी। अधिक जानकारी के लिए 'timeout --help' चलाएँ।
निम्नलिखित कमांड क्रॉलर को शुरू करेगी और 50 मिनट बाद उसे अपने-आप रोक भी देगी।

>  यह कमांड चलाएँ
```bash
timeout --signal=2 50m cargo run --release --features crawler --bin crawler -- --seed-addrs 157.245.172.190:8233 194.135.81.61:8233 35.233.224.178:8233 --rpc-addr 127.0.0.1:54321
```

----------------
सुझाव! 

'latest.json' को कॉल करके सीधे '/testdata' में लिखा जा सकता है, ताकि आपको इसे मैन्युअल रूप से कॉपी और पेस्ट न करना पड़े।

----------------
सुझाव! 

आउटपुट से IP एड्रेस की जानकारी इकट्ठा करके शुरुआत में क्रॉलर को फिर से सीड (--seed-addrs) करने के लिए उपयोग की जा सकती है। इससे पूरी क्रॉल करने में लगने वाला समय कम हो जाएगा!
