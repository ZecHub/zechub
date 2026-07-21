# Z3: (zebrad)(zaino)(zingo-cli)

**zebrad**    : zcash full node

**zaino**     : zcash blockchain indexer

**zingo-cli** : zcash command line zaino-proxy client (Zingolib का एक subset)

## वीडियो

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


## समग्र चित्र

[सिस्टम आर्किटेक्चर](https://github.com/zingolabs/zaino/blob/dev/docs/zaino_live_system_architecture.pdf)


- Zcash उपयोगकर्ता Zingolib को install/compile करता है, जिससे zingo-cli तक पहुंच मिलती है। वे आवश्यकता अनुसार ZEC भेज और प्राप्त कर सकते हैं।
- Zingo-cli, zaino से या तो लोकली या ऑनलाइन एक सुरक्षित चैनल के माध्यम से कनेक्ट होता है (Zcash उपयोगकर्ता को यह कैसे काम करता है, इसकी चिंता नहीं होती!)
- Zaino, zebrad या zcashd में से किसी एक तक पहुंच प्रदान करता है            
- पूरी तरह sync हुआ zebrad ही source of truth है (अब यहां wallets नहीं हैं!)



## इंस्टॉलेशन

इसे सही तरीके से काम कराने के लिए आपको 3 चीजें install करनी होंगी। screen management में मदद के लिए मैं `screen` या इसी तरह की किसी चीज़ की भी सिफारिश करता हूँ।

`sudo apt install screen`

### zebrad

```
git clone https://github.com/ZcashFoundation/zebra.git
cd zebra
cargo install --git https://github.com/ZcashFoundation/zebra --tag v2.0.1 zebrad
```

 
*वैकल्पिक* (zebrad के लिए एक screen session बनाएं)

```
screen -S zebra
zebrad start
```

नोट: इसे पूरी तरह sync होने की आवश्यकता होगी! 

### zaino

```
git clone https://github.com/zingolabs/zaino.git
cd zaino
cargo build --release
PATH=$PATH:~/Desktop/zaino/target/release/
```


*वैकल्पिक* (zaino के लिए एक screen session बनाएं)

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

*वैकल्पिक* (zingo-cli के लिए एक screen session बनाएं)

```
screen -S zingo
./zingo-cli --server http://127.0.0.1:8137 --data-dir /media/zebra5/zebra/.cache/lightwalletd
```

नोट: इसे भी lightwalletd की तरह पूरी तरह sync होने की आवश्यकता होगी। समय बचाने के लिए मैं external drive इस्तेमाल करने की सलाह देता हूँ :)


## चलाना

यदि आप इन्हें screens में चला रहे हैं, तो `screen -r` आपको हर screen की सूची दिखाएगा, ताकि आप आवश्यकता अनुसार उनमें जा सकें
