<a href="https://github.com/zechub/zechub/edit/main/site/guides/Visualizing_the_Zcash_Network.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="पृष्ठ संपादित करें"/>
</a>


#  Zcash नेटवर्क का विज़ुअलाइज़ेशन

नीचे दिया गया मार्गदर्शक बताता है कि Ubuntu 22.04 पर Zcash के लिए Ziggurat 3.0 Crawler तथा उससे जुड़े प्रोग्राम Crunchy और P2P-Viz को कैसे चलाया जाए, ताकि Zcash नेटवर्क की जानकारी एकत्रित और विज़ुअलाइज़ की जा सके।  
नीचे लिंक किया गया वीडियो भी इसी प्रक्रिया का पालन करता है।

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
## आवश्यक इंस्टॉल करें: 

Rust -> [https://rustup.rs/](https://rustup.rs/)

## वैकल्पिक:
jq -> [https://jqlang.github.io/jq/download/](https://jqlang.github.io/jq/download/)
(टर्मिनल में json जानकारी दिखाने के लिए)

curl -> [https://everything.curl.dev/get/linux](https://everything.curl.dev/get/linux)
(crawler RPC को query करने के लिए)

npm (nvm के साथ) -> [https://medium.com/@iam_vinojan/how-to-install-node-js-and-npm-using-node-version-manager-nvm-143165b16ce1](https://medium.com/@iam_vinojan/how-to-install-node-js-and-npm-using-node-version-manager-nvm-143165b16ce1)
(ब्राउज़र में P2P-Viz दिखाने के लिए)

----------------


----------------
Ziggurat 3.0 Repository | [https://github.com/runziggurat](https://github.com/runziggurat)

Crawler Repo | [https://github.com/runziggurat/zcash.git](https://github.com/runziggurat/zcash.git)

Crunchy Repo | [https://github.com/runziggurat/crunchy.git](https://github.com/runziggurat/crunchy.git)

P2P-Viz Repo | [https://github.com/runziggurat/p2p-viz.git](https://github.com/runziggurat/p2p-viz.git)

----------------

शुरुआत सामान्य updates लागू करके करें।

>  निम्नलिखित commands चलाएँ:
```bash
sudo apt update
sudo apt upgrade
```

----------------

## Zcash नेटवर्क Crawler

Zcash Crawler `zcash` नाम के एक फ़ोल्डर के अंदर रहता है, इसलिए crawler (runziggurat/zcash repo) को clone करने से पहले एक नई directory बनाना उचित हो सकता है।


>  /Home directory से, निम्नलिखित commands चलाएँ:
```bash
mkdir runziggurat
cd runziggurat
git clone https://github.com/runziggurat/zcash.git
cd zcash
```

ब्राउज़र में यहाँ जाएँ 
[https://github.com/runziggurat/zcash/blob/main/src/tools/crawler/README.md](https://github.com/runziggurat/zcash/blob/main/src/tools/crawler/README.md)

या readme यहाँ खोलें 
'/runziggurat/zcash/src/tools/crawler/README.md'

इस पृष्ठ में विशेष उपयोग संबंधी जानकारी दी गई है। 

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

`--seed-addrs` \ `--dns-seed` ही एकमात्र आवश्यक argument है और इसे चलाने के लिए कम-से-कम एक निर्दिष्ट address चाहिए।



----------------

कमांड `cargo run --release --features crawler --bin crawler -- --help` वास्तविक run command है और यह ऊपर दिखाया गया help menu प्रिंट करेगा।


>  command चलाएँ
```bash
cargo run --release --features crawler --bin crawler -- --help
```


यह प्रोग्राम को compile करेगा और सुनिश्चित करेगा कि सब कुछ सही तरह से काम कर रहा है।

Crawler चलाने के लिए start command में `--seed-addrs` flag जोड़ना आवश्यक है, जिसमें कम-से-कम एक मान्य Zcash node IP address होना चाहिए। सही परिणाम पाने के लिए crawler को पर्याप्त समय तक चलने देना चाहिए। कुछ sample node IP addresses यहाँ मिल सकते हैं: [https://zcashblockexplorer.com/nodes](https://zcashblockexplorer.com/nodes).

Crawler के चलने के दौरान उससे जानकारी प्राप्त करने के लिए start command में `--rpc-addr` flag जोड़ना आवश्यक है। केवल crawler चलाने के लिए यह आवश्यक नहीं है, लेकिन इसके बिना कोई भी जानकारी दिखाने के लिए crawler को रोकना पड़ेगा (ctrl+c या SIGKILL)।


>  command चलाएँ
```bash
cargo run --release --features crawler --bin crawler -- --seed-addrs 157.245.172.190:8233 194.135.81.61:8233 35.233.224.178:8233 --rpc-addr 127.0.0.1:54321
```

Crawler नेटवर्क के साथ संचार शुरू करेगा (डिफ़ॉल्ट रूप से हर 20 सेकंड में) और नेटवर्क डेटा एकत्र करेगा। 
Crawler से जानकारी दिखाने के लिए node को query करने हेतु curl का उपयोग किया जा सकता है (इस जानकारी को दिखाने के लिए jq आवश्यक है)। 
इस उदाहरण में Crawler RPC address `127.0.0.1:54321` पर सेट है।


>  किसी दूसरे Terminal में, command चलाएँ
```bash
curl --data-binary '{"jsonrpc": "2.0", "id":0, "method": "getmetrics", "params": [] }' -H 'content-type: application/json' http://127.0.0.1:54321/ | jq .result.protocol_versions
```

यह वर्तमान में एकत्रित `.protocol_version` डेटा दिखाएगा, जो `.result` field के भीतर मौजूद है। `.result` field बहुत बड़ी होती है, इसलिए उसके विशिष्ट हिस्सों को अलग से call करना उपयोगी रहता है। अन्य उपयोगी data types हैं `.num_known_nodes`, `.num_good_nodes`, `.user_agents` आदि। metrics section [यहाँ](https://github.com/runziggurat/zcash/tree/main/src/tools/crawler#metrics) देखें।

----------------


----------------
Crunchy और P2P-Viz चलाने के लिए `.result` को एक `.json` file में pipe करना आवश्यक है। 


>  command चलाएँ
```bash
curl --data-binary '{"jsonrpc": "2.0", "id":0, "method": "getmetrics", "params": [] }' -H 'content-type: application/json' http://127.0.0.1:54321/ > latest.json
```

यह वर्तमान directory में `latest.json` file बनाएगा। इस `latest.json` file का उपयोग Crunchy के साथ किया जाएगा। 

इस चरण पर, यदि और डेटा की आवश्यकता नहीं है, तो Crawler को `ctrl+c` से रोका जा सकता है। Crawler उपयोगी जानकारी की एक report terminal में output करेगा।


----------------

## Crunchy

P2P-Viz के साथ उपयोग के लिए output json file को aggregate करने हेतु Crunchy आवश्यक है।


Crunchy build करने के लिए अपने `/runziggurat` folder में जाएँ 

>  Crunchy repo में clone करने के लिए, निम्नलिखित commands चलाएँ
```bash
git clone https://github.com/runziggurat/crunchy.git
cd crunchy
```
`latest.json` file को copy-paste करके `crunchy/testdata/` folder में रखें।

>  निम्नलिखित commands चलाएँ 
```bash
cargo run --release -- -i testdata/latest.json -o testdata/state.json -g testdata/geoip-cache.json -f Zcash
```

यह `crunchy/testdata/` folder में Zcash node-filtered `state.json` file बनाएगा, जिसका उपयोग P2P-Viz के साथ किया जाएगा।

----------------

## P2P-Viz

P2P-Viz build करने के लिए npm होना आवश्यक है। 


>  nvm के साथ npm install करने के लिए, निम्नलिखित commands चलाएँ:
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
```

Terminal बंद करें और फिर से शुरू करें।


>  command चलाएँ:
```bash
nvm install --lts
```

अपने `/runziggurat` folder में जाएँ


>  P2P-Viz repo में clone करने और start करने के लिए, निम्नलिखित commands चलाएँ
```bash
git clone https://github.com/runziggurat/p2p-viz.git
cd p2p-viz
npm i
npm run build
npm run start http
```

----------------

ब्राउज़र में [http://localhost:3000](http://localhost:3000) खोलें। 

`Geolocation` चुनें और फिर `Choose state file` चुनें।

फ़ाइल explorer pop-up में `state.json` file चुनें। 

Node explorer की World Map file के डेटा से भर जाएगी। उपयोग के विकल्पों और settings के बारे में अधिक जानकारी के लिए readme [यहाँ](https://github.com/runziggurat/p2p-viz#build-and-run-the-app) देखें।


----------------
सुझाव! 

आप `timeout` command का उपयोग करके Crawler को timed crawl पर सेट कर सकते हैं, जो निर्धारित समय के बाद एक विशेष kill command जारी करेगा। अधिक जानकारी के लिए `timeout --help` चलाएँ।
निम्नलिखित command crawler को शुरू करेगी और 50 मिनट बाद अपने-आप रोक भी देगी।

>  command चलाएँ
```bash
timeout --signal=2 50m cargo run --release --features crawler --bin crawler -- --seed-addrs 157.245.172.190:8233 194.135.81.61:8233 35.233.224.178:8233 --rpc-addr 127.0.0.1:54321
```

----------------
सुझाव! 

`latest.json` को सीधे `/testdata` में call करके लिखा जा सकता है, ताकि आपको उसे manually copy-paste न करना पड़े।

----------------
सुझाव! 

IP Address की जानकारी output से एकत्र की जा सकती है और फिर Crawler को start करते समय दोबारा seed करने (`--seed-addrs`) में उपयोग की जा सकती है। इससे full crawl करने के लिए आवश्यक समय कम हो जाएगा!
