# Z3: (zebrad)(zaino)(zingo-cli)

**zebrad**    : Zcash फुल नोड

**zaino**     : Zcash ब्लॉकचेन इंडेक्सर (indexer)

**zingo-cli** : Zcash कमांड लाइन zaino-proxy क्लाइंट (Zingolib का उपसमुच्चय)

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


## समग्र दृष्टि

[सिस्टम आर्किटेक्चर](https://github.com/zingolabs/zaino/blob/dev/docs/zaino_live_system_architecture.pdf)


- Zcash उपयोगकर्ता Zingolib को इंस्टॉल/कंपाइल करता है, जिससे उसे zingo-cli तक पहुँच मिलती है। वह आवश्यकतानुसार ZEC भेज/प्राप्त कर सकता है।
- zingo-cli zaino से या तो लोकल रूप से या ऑनलाइन एक सुरक्षित चैनल के माध्यम से जुड़ता है (Zcash उपयोगकर्ता को इससे कोई फ़र्क नहीं पड़ता कि यह कैसे काम करता है!)
- Zaino या तो zebrad या zcashd तक पहुँच देता है            
- पूरी तरह सिंक किया गया zebrad सत्य का स्रोत है (यहाँ अब कोई वॉलेट नहीं!)



## इंस्टॉलेशन

इसे सही ढंग से काम करने के लिए आपको 3 चीज़ें इंस्टॉल करनी होंगी। स्क्रीन प्रबंधन में सहायता के लिए मैं screen या इसी तरह के किसी टूल की भी सलाह देता हूँ।

`sudo apt install screen`

### zebrad

```
git clone https://github.com/ZcashFoundation/zebra.git
cd zebra
cargo install --git https://github.com/ZcashFoundation/zebra --tag v2.0.1 zebrad
```

 
*वैकल्पिक* (zebrad के लिए एक screen सेशन बनाएँ)

```
screen -S zebra
zebrad start
```

नोट: इसे पूरी तरह सिंक होना होगा! 

### zaino

```
git clone https://github.com/zingolabs/zaino.git
cd zaino
cargo build --release
PATH=$PATH:~/Desktop/zaino/target/release/
```


*वैकल्पिक* (zaino के लिए एक screen सेशन बनाएँ)

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

*वैकल्पिक* (zingo-cli के लिए एक screen सेशन बनाएँ)

```
screen -S zingo
./zingo-cli --server http://127.0.0.1:8137 --data-dir /media/zebra5/zebra/.cache/lightwalletd
```

नोट: इसे भी पूरी तरह सिंक होना होगा, ठीक वैसे ही जैसे lightwalletd हुआ था। समय बचाने के लिए मैं एक एक्सटर्नल ड्राइव का उपयोग करने की सलाह देता हूँ :)


## चलाना

यदि आप इन्हें screen में चला रहे हैं, तो `screen -r` आपके लिए प्रत्येक screen की सूची दिखाएगा, ताकि आप आवश्यकतानुसार उनमें जा सकें।
