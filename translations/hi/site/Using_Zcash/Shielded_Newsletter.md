<a href="https://github.com/ZecHub/zechub/edit/main/site/Using_Zcash/Shielded_Newsletter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# परिरक्षित न्यूज़लेटर

> Zallet का उपयोग करके Zcash मेमो के रूप में परिरक्षित पतों की सूची को एक markdown नोट भेजें। प्राप्तकर्ता सूची और नोट पारदर्शी पतों से दूर रहते हैं।

एक परिरक्षित न्यूज़लेटर परिरक्षित लेन-देनों की एक श्रृंखला है। प्रत्येक आउटपुट प्राप्तकर्ता Unified Address को बहुत छोटी राशि का भुगतान करता है और मेमो फ़ील्ड में नोट का अगला भाग रखता है। Zallet उन लेन-देनों को बनाता और भेजता है। Zebra और Zaino केवल चेन डेटा प्रदान करते हैं।

स्क्रिप्ट [`site/tutorials/shieldedNewsletter`](https://github.com/ZecHub/zechub/tree/main/site/tutorials/shieldedNewsletter) में हैं। वे प्रारंभिक Zallet के लिए लिखी गई थीं और वर्तमान रिलीज़ के विरुद्ध जैसी हैं वैसी चलाना सुरक्षित नहीं है। यह पृष्ठ अद्यतन प्रक्रिया है। 7 अक्टूबर 2026 तक Zallet `v0.1.0-beta.3` और Zallet पुस्तक के आधार पर जाँचा गया।

## आपको क्या चाहिए

- Zebra पूरी तरह सिंक किया हुआ, जिसमें RPC localhost से बंधा हो।
- उस Zebra नोड के विरुद्ध सिंक किया हुआ Zaino।
- Zallet `v0.1.0-beta.3` या नया, wallet build, जिसका RPC localhost से बंधा हो। पुस्तक `z_sendmany` को कार्यान्वित के रूप में सूचीबद्ध करती है। संख्यात्मक शुल्क अस्वीकार कर दिया जाता है: यदि आप `fee` देते हैं, तो वह `null` होना चाहिए, क्योंकि Zallet हमेशा ZIP 317 शुल्क का उपयोग करता है।
- ऐसा वित्तपोषित खाता जिसकी Unified Address परिरक्षित धनराशि खर्च कर सके।
- प्राप्तकर्ता Unified Addresses। पारदर्शी पते पर मेमो एक त्रुटि है।

वित्तपोषित पता या cookie को wiki अथवा committed script में न डालें। वर्तमान `txBuilderFromFile.sh` में Unified Address हार्डकोड किया हुआ है। उसे स्थानीय रूप से बदलें और commit न करें।

## Zallet कॉन्फ़िगर करें

आप जो Zallet चला रहे हैं, उससे एक config जनरेट करें, फिर उसे Zebra और Zaino की ओर इंगित करें। पुराने tutorial में नमूना `as_of_version = "0.0.0"` और व्यक्तिगत home path का उपयोग करता है। उस फ़ाइल को template नहीं, snapshot मानें।

```bash
zallet init
zallet -c ~/.zallet/zallet.toml start
zallet -c ~/.zallet/zallet.toml rpc help
```

`rpc help` में `z_sendmany`, `z_getoperationstatus` और `z_getoperationresult` सूचीबद्ध होने चाहिए। RPC को केवल `127.0.0.1` से bind करें।

## प्राप्तकर्ता सूची

प्रति पंक्ति एक Unified Address, बिना quotes, बिना रिक्त पंक्तियों के। स्क्रिप्ट `daoAddresses.md` पढ़ती है। पुराना readme `daoAddress.md` कहता है। वह फ़ाइल repo में नहीं है, और नाम मेल नहीं खाते।

```text
u1...
u1...
```

## एक मेमो भेजें

`z_sendmany` asynchronous है। यह एक operation id लौटाता है। स्थिति `success` या त्रुटि होने तक `z_getoperationstatus` को poll करें। एक निश्चित 5 सेकंड sleep, जो स्क्रिप्ट करती है, build में अधिक समय लगने पर परिणाम खो देता है। `z_getoperationresult` operation को consume करता है, इसलिए स्थिति terminal होने तक उसे न बुलाएँ।

शुल्क छोड़ा गया है। Zallet ZIP 317 की गणना करता है। कोई संख्या न दें।

```bash
MEMO_HEX=$(printf '%s' "$NOTE" | xxd -p -c 9999)
zallet -c ~/.zallet/zallet.toml rpc z_sendmany \
  "$FROM_UA" \
  "[{\"address\":\"$TO_UA\",\"amount\":0.0001,\"memo\":\"$MEMO_HEX\"}]"
```

मेमो फ़ील्ड raw hex है, अधिकतम 512 bytes। `ascii2hex` केवल ASCII encode करता है। किसी भी non-ASCII वर्ण वाला नोट विफल हो जाता है। `xxd` या `python3 -c 'import sys; sys.stdout.write(sys.stdin.buffer.read().hex())'` UTF-8 संभालता है।

Privacy policy डिफ़ॉल्ट रूप से `FullPrivacy` है। परिरक्षित प्राप्तकर्ता के लिए यह सही डिफ़ॉल्ट है। `AllowFullyTransparent` न दें।

## स्क्रिप्ट की कमियाँ

ये 8 अक्टूबर 2026 तक tree में मौजूद हैं। इनके ठीक होने तक `shieldNewsletter.sh` न चलाएँ।

- `[[ bytesInFile -lt 512 ]]` में `$` अनुपस्थित है। single-memo branch कभी नहीं चलती।
- chunk loop hex संग्रहीत करता है, फिर `hex2ascii` उसे decode करता है, फिर `txBuilderFromFile.sh` उसे दोबारा encode करता है। अंतिम chunk तब तक flush नहीं होता जब तक बाद की पंक्ति 512 से अधिक न हो जाए। लंबी पंक्ति विभाजित नहीं होती। वह पूरी भेजी जाती है और 512-byte मेमो से अधिक हो सकती है।
- `txBuilderFromFile.sh` बिना config path के `./zallet rpc` को call करता है और binary के current directory में होने की अपेक्षा करता है। `zallet -c <config> rpc` का उपयोग करें।
- `toCurl.sh` cookie के साथ port 8232 पर Zebra से बात करता है, और `getinfo` तथा `sendmany` को call करता है। Zallet `sendmany` प्रदान नहीं करता। mine-wait loop भी `[[ chainHeight -gt temp ]]` के बिना `$` का उपयोग करता है, इसलिए वह प्रतीक्षा नहीं करता।
- `z_gettotalbalance 0 true` अतिरिक्त positional arguments के रूप में दिया जाता है। उस call का उपयोग करने से पहले, जिस binary को आप चलाते हैं उस पर `rpc help z_gettotalbalance` जाँचें।
- प्रत्येक chunk हर प्राप्तकर्ता को `0.0001` ZEC भेजता है। ZIP 317 शुल्क इसके अतिरिक्त है। कई पतों को भेजा गया लंबा नोट dust राशियों से अधिक खर्च करता है।

## सुधार के बाद

एक सुधारा हुआ runner को:

1. नोट को bytes के रूप में पढ़ना चाहिए और पंक्तियों पर नहीं, 512-byte boundaries पर विभाजित करना चाहिए।
2. प्रत्येक chunk को एक बार hex-encode करना चाहिए।
3. वित्तपोषित UA, प्राप्तकर्ता array और बिना शुल्क argument के `zallet -c <config> rpc z_sendmany` call करना चाहिए।
4. उस operation id के लिए `z_getoperationstatus` को poll करना चाहिए।
5. केवल `success` के बाद txid रिकॉर्ड करना चाहिए।

पुराना tutorial पृष्ठ [Shielded Newsletter scripts](/tutorials/shieldednewsletter/readme) पर बना हुआ है। प्रक्रिया के लिए इस पृष्ठ का उपयोग करें।
