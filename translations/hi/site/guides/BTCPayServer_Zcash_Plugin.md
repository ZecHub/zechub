# Zcash सपोर्ट के साथ BTCPay Server: पूर्ण इंस्टॉलेशन और इंटीग्रेशन गाइड

BTCPay Server ऑनलाइन व्यवसायों को बिना किसी बिचौलिए या कस्टोडियन के सीधे cryptocurrency payments स्वीकार करने की सुविधा देता है। यह गाइड आपको Zcash shielded payments के लिए native support के साथ BTCPay Server सेटअप करने की पूरी प्रक्रिया समझाती है।

> यह दस्तावेज़ आपके BTCPay Server instance में Zcash को integrate करने पर केंद्रित है।  
> यह **full node (Zebra)** और **lightwalletd-आधारित setups** दोनों को सपोर्ट करता है।

---

## विषय सूची

- [Zcash के साथ BTCPay Server का उपयोग क्यों करें](#Why-Use-BTCPay-Server-with-Zcash)
- [BTCPay Server कैसे काम करता है](#How-BTCPay-Server-Works)
- [फंड कहाँ स्टोर होते हैं? Private Keys किसके नियंत्रण में होती हैं?](#Where-Are-Funds-Stored-Who-Controls-the-Private-Keys)
- [Zcash स्वीकार करने के लिए BTCPay Server कैसे सेट करें](#How-to-Set-Up-BTCPay-Server-for-Accepting-Zcash)
  - [Zcash सपोर्ट के साथ BTCPay Server डिप्लॉय करना](#Deploying-BTCPay-Server-with-Zcash-Support)
  - [अपना स्वयं का Zcash Full Node चलाना (Zebra + Lightwalletd)](#Running-Your-Own-Zcash-Full-Node)
  - [किसी बाहरी lightwalletd Node से कनेक्ट करना (Custom Configuration)](#Connecting-to-an-External-Lightwalletd-Node)
  - [Cloudflare Tunnel के साथ घर पर BTCPay Server होस्ट करना](#Hosting-BTCPay-Server-at-Home-with-Cloudflare-Tunnel)
- [BTCPay Server Web Interface में Zcash Plugin कॉन्फ़िगर करना](#Configuring-the-Zcash-Plugin-in-the-BTCPay-Server-Web-Interface)
- [BTCPay Server को अपनी वेबसाइट के साथ integrate करना](#Integrating-BTCPay-Server-with-Your-Website)
  - [API Integration](#API-Integration)
    - [API Key जनरेट करना](#Generating-an-API-Key)
    - [उदाहरण: API के माध्यम से Invoice बनाना](#Example-Creating-an-Invoice-via-API)
    - [Webhook सेट करना](#Setting-Up-a-Webhook-Optional)
  - [CMS Integration](#CMS-Integration)
  - [Payment Button या Iframe](#Payment-Button-or-Iframe-No-CMS-or-API-Needed)
- [निष्कर्ष](#Conclusion)
- [संसाधन](#Resources)


---

## Zcash के साथ BTCPay Server का उपयोग क्यों करें

ऑनलाइन commerce में cryptocurrency स्वीकार करना लगातार बढ़ रहा है। यह तेज़ है, वैश्विक है, और बैंकों के बिना काम करता है। इससे merchants और customers दोनों को लाभ मिलता है। लेकिन इसमें एक महत्वपूर्ण बात है जिसे बहुत से लोग नज़रअंदाज़ कर देते हैं।

ऑर्डर करते समय ग्राहक आमतौर पर व्यक्तिगत जानकारी देता है: नाम, shipping address और phone number। यदि भुगतान किसी public blockchain - जैसे Bitcoin, Ethereum, या Ethereum या Tron पर stablecoins - से किया जाता है, तो वह transaction विश्लेषण के लिए स्थायी रूप से दिखाई देने लगता है।

कोई भी व्यक्ति, भले ही उसे यह न पता हो कि क्या ऑर्डर किया गया था, यह कर सकता है:

- देख सकता है कि भुगतान कब और कितनी राशि का हुआ  
- ट्रेस कर सकता है कि फंड कहाँ से आए और कहाँ गए  
- किसी cryptocurrency address को किसी वास्तविक व्यक्ति से जोड़ सकता है यदि कोई correlation point मौजूद हो (उदाहरण के लिए, कोई लीक हुआ email या shipping name)

इसका मतलब है कि एक ही खरीदारी ग्राहक के पूरे वित्तीय इतिहास को उजागर कर सकती है।

और यही बात उल्टी दिशा में भी लागू होती है। यदि किसी merchant का address कभी on-chain दिखाई दिया है, तो वह भी उजागर हो जाता है। प्रतिस्पर्धी और third-party observers payment volumes, supplier activity और business flows की संरचना को ट्रैक कर सकते हैं।

### BTCPay Server और Zcash का संयोजन इस समस्या का समाधान कर सकता है।


BTCPay Server cryptocurrency payments प्राप्त करने के लिए एक मुफ्त और decentralized system है।  
यह कोई payment intermediary नहीं है और न ही किसी funds को hold करता है। सभी payments सीधे merchant के wallet में जाती हैं।  
यह कोई personal wallet हो सकता है या किसी organization के भीतर multisig setup।

सर्वर coordination से जुड़े कार्य संभालता है:

- हर order के लिए एक unique address generate करता है  
- payment कब प्राप्त हुआ इसे track करता है और order से link करता है  
- receipts और notifications जारी करता है  
- ग्राहक के लिए payment interface प्रदान करता है  

सब कुछ store owner के नियंत्रण में चलता है, बिना third-party services पर निर्भर हुए।

Zcash zero-knowledge proofs पर आधारित एक cryptocurrency है।  
यह पूरी तरह private transaction model को सपोर्ट करता है।  
जब shielded addresses (आगे केवल “addresses” कहा जाएगा) उपयोग किए जाते हैं, तो sender, recipient और transaction amount blockchain पर प्रकट नहीं होते।

ऑनलाइन stores के लिए इसका मतलब है:

- खरीदार अपना वित्तीय इतिहास उजागर किए बिना payment पूरा कर सकता है  
- विक्रेता अपना address, sales volume या transaction structure उजागर किए बिना payment प्राप्त करता है  
- कोई बाहरी observer payment को order या customer data से link नहीं कर सकता

### व्यावहारिक उदाहरण

एक उपयोगकर्ता order करता है और payment method के रूप में Bitcoin या USDT चुनता है।  
वेबसाइट एक payment address generate करती है और राशि दिखाती है।  
भुगतान हो जाने के बाद यह address blockchain पर स्टोर हो जाता है और public बन जाता है।  
किसी attacker को केवल एक order को उस address से link करना होता है, और उसे उसके पूरे transaction history पर लंबे समय तक नज़र मिल जाती है।

अब वही स्थिति Zcash के साथ सोचिए।  
BTCPay Server एक shielded address generate करता है। खरीदार payment भेजता है।  
Blockchain के दृष्टिकोण से कुछ भी नहीं होता। विश्लेषण के लिए कोई public data नहीं होता।  
सर्वर confirmation प्राप्त करता है, उसे order से link करता है, और प्रक्रिया पूरी हो जाती है।

किसी भी बाहरी व्यक्ति के लिए ऐसा लगता है जैसे कुछ हुआ ही नहीं।  
पूरा logic store और customer के बीच ही रहता है - जैसा होना चाहिए।

यह समाधान automation या usability से समझौता नहीं करता।  
सब कुछ अन्य cryptocurrencies की तरह ही काम करता है, बस data leaks के जोखिम के बिना।



## BTCPay Server कैसे काम करता है

BTCPay Server आपके e-commerce platform और blockchain के बीच payment processing bridge की तरह कार्य करता है। इसका flow इस प्रकार काम करता है:

1. **ग्राहक आपकी वेबसाइट पर order देता है** (उदाहरण: WooCommerce, Magento, या BTCPay integration वाले किसी भी platform पर)।

2. **स्टोर BTCPay Server से payment invoice request करता है**। सर्वर एक unique invoice generate करता है जिसमें होते हैं:
   - Order amount
   - एक countdown timer
   - एक Zcash Unified Address (UA) - उदाहरण के लिए, `u1...` - जिसमें default रूप से एक Orchard (shielded) receiver शामिल होता है।

3. **ग्राहक payment page देखता है** और दिए गए address पर ZEC भेजता है।

4. **BTCPay Server blockchain को monitor करता है**, और payment को इन बिंदुओं के आधार पर जांचता है:
   - अपेक्षित राशि
   - receiving address
   - invoice timestamp

5. **जैसे ही transaction detect और confirm हो जाता है**, BTCPay स्टोर को notify करता है।

6. **ग्राहक को payment confirmation मिल जाती है।** वैकल्पिक रूप से, सर्वर email के माध्यम से receipt भी भेज सकता है।

यह पूरी प्रक्रिया **स्वचालित रूप से** होती है, बिना किसी intermediary या custodian के।  
BTCPay Server **कोई funds hold नहीं करता** - यह केवल order system को blockchain से सुरक्षित और निजी तरीके से जोड़ता है।
## फंड कहाँ स्टोर होते हैं? Private Keys किसके नियंत्रण में होती हैं?

BTCPay Server **wallet नहीं है** और इसे **private keys की आवश्यकता नहीं होती**।  
सभी funds **सीधे** merchant के wallet में जाते हैं। सुरक्षा एक **viewing key-based architecture** द्वारा सुनिश्चित की जाती है।

### यह कैसे काम करता है

- **Wallet पहले से बनाया जाता है।**  
  Merchant ऐसा Zcash wallet उपयोग करता है जो viewing keys को सपोर्ट करता हो - जैसे [YWallet](https://ywallet.app/installation) या [Zingo! Wallet](https://zingolabs.org/)।  
  पूरी सूची [ZecHub.wiki](https://zechub.wiki/wallets) पर उपलब्ध है।

- **BTCPay Server viewing key के माध्यम से connect करता है।**  
  Viewing key एक **read-only key** होती है: यह incoming payments detect कर सकती है और नए receiving addresses generate कर सकती है,  
  लेकिन यह funds spend नहीं कर सकती। सर्वर seed phrases या private keys store नहीं करता।

- **Blockchain data को `lightwalletd` server के माध्यम से access किया जाता है।**  
  आप `https://zec.rocks` जैसे public node का उपयोग कर सकते हैं, या पूर्ण sovereignty के लिए अपना स्वयं का `Zebra + lightwalletd` stack चला सकते हैं।

- **हर order को एक unique address मिलता है।**  
  Viewing keys सर्वर को हर invoice के लिए नए Zcash shielded addresses derive करने देती हैं,  
  जिससे secure payment tracking संभव होती है और address reuse रोका जाता है।

- **Funds पर आपका पूरा नियंत्रण बना रहता है।**  
  यदि सर्वर compromise भी हो जाए, तब भी कोई आपका पैसा नहीं चुरा सकता - केवल payment metadata उजागर हो सकती है।

यह डिज़ाइन **infrastructure** को **asset control** से अलग करता है।  
आप BTCPay Server को update, migrate या reinstall कर सकते हैं, बिना किसी fund को जोखिम में डाले।

## Zcash स्वीकार करने के लिए BTCPay Server कैसे सेट करें

पिछले sections में हमने बताया कि BTCPay Server Zcash के साथ कैसे काम करता है और privacy-preserving payments के लिए यह क्यों महत्वपूर्ण है। अब practical रूप से काम शुरू करने का समय है।

आपका सटीक setup कई कारकों पर निर्भर करेगा:

- क्या आपके पास पहले से BTCPay Server instance है?
- क्या आप public lightwalletd का उपयोग करना चाहते हैं या अपना full node चलाना चाहते हैं?
- क्या सर्वर VPS पर चलेगा या घर पर?

यह अध्याय सभी मौजूदा configuration scenarios को कवर करता है - minimal setups से लेकर पूरी तरह sovereign deployments तक।

हम निम्नलिखित पर चलेंगे:

- VPS पर scratch से सब कुछ कैसे deploy करें, जिसमें full node (Zebra) शामिल हो
- **Cloudflare Tunnel** का उपयोग करके अपना IP छिपाते हुए BTCPay Server को घर पर कैसे चलाएँ
- BTCPay Server web interface के भीतर Zcash support को कैसे enable और configure करें
- BTCPay को अपनी वेबसाइट या ऑनलाइन store के साथ कैसे integrate करें


## Zcash सपोर्ट के साथ BTCPay Server डिप्लॉय करना

अब वास्तविक setup पर चलते हैं। इस section में हम Zcash support के साथ BTCPay Server install करेंगे - चाहे वह नया VPS हो या किसी मौजूदा instance में ZEC support जोड़ना हो।

यदि आपके पास पहले से BTCPay Server चल रहा है (उदाहरण के लिए BTC या Lightning के लिए), तो आपको सब कुछ दोबारा install करने की आवश्यकता नहीं है - केवल ZEC plugin enable करें।

हम public `lightwalletd` node वाले minimal setups से लेकर अपने full node वाली पूरी तरह sovereign installations तक विभिन्न configurations पर चलेंगे।  
सबसे अच्छा विकल्प इस पर निर्भर करता है कि आपका सर्वर कहाँ है और आप बाहरी infrastructure से कितनी स्वतंत्रता चाहते हैं।

> आधिकारिक plugin documentation:  
> [https://github.com/btcpay-zcash/btcpayserver-zcash-plugin](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
>
> **चेतावनी - एक instance पर एक wallet:**  
> Zcash plugin BTCPay instance में **सभी stores** के लिए **एक साझा wallet** का उपयोग करता है।  
> यदि आप एक ही instance पर कई स्वतंत्र stores host करते हैं, तो वे सभी वही Zcash wallet साझा करेंगे।  
> यदि आपको wallet isolation सख्ती से चाहिए, तो अलग-अलग instances का उपयोग करें।

---

### अनुशंसित VPS Configuration

Install करने से पहले, सुनिश्चित करें कि आपके पास ये हों:

- **Ubuntu 22.04+** वाला एक VPS
- आपके सर्वर के IP address की ओर point करता हुआ एक domain name (DNS के माध्यम से)
- `git`, `docker`, और `docker-compose` installed
- सर्वर के लिए SSH access

---

## अपना सर्वर तैयार करना (छिपा हुआ भाग)

<details>
  <summary>विस्तार के लिए क्लिक करें</summary>

Zcash support के साथ BTCPay Server deploy करने के लिए आपको निम्नलिखित की आवश्यकता होगी:

### 1. Ubuntu 22.04 या उससे नया VPS

हम **Ubuntu Server 22.04 LTS** की minimal installation उपयोग करने की सिफारिश करते हैं।  
कोई भी VPS provider जो dedicated IP address देता हो, उपयुक्त होगा।  

**न्यूनतम आवश्यकताएँ**:  
- 2 CPU cores  
- 4 GB RAM  
- 40 GB disk space  

यदि आप Zcash के लिए lightwalletd उपयोग कर रहे हैं, तो यह setup पर्याप्त है।  
यदि आप **full Zcash node** चलाने की योजना बना रहे हैं, तो आपको **कम से कम 300 GB** खाली disk space चाहिए होगी।

---

### 2. आपके सर्वर की ओर point करता हुआ domain name

अपने DNS provider के dashboard में किसी subdomain के लिए एक `A` record बनाइए  
(उदाहरण: `btcpay.example.com`) जो आपके VPS IP address की ओर point करे।  

यह domain browser से BTCPay Server access करने  
और Let's Encrypt के माध्यम से **free SSL certificate** automatically generate करने के लिए उपयोग होगा।

---

### 3. सर्वर के लिए SSH access

BTCPay Server install करने के लिए आपको SSH के माध्यम से अपने VPS से connect होना होगा।  
अपने terminal से यह चलाएँ:

`ssh root@YOUR_SERVER_IP`

यदि आप macOS, Linux, या Windows पर WSL उपयोग करते हैं, तो terminal में SSH पहले से उपलब्ध होता है।
साधारण Windows पर **PuTTY** जैसा SSH client उपयोग करें।

---

### 4. Git, Docker, और Docker Compose install करें

SSH से connect होने के बाद, अपने system packages update करें और आवश्यक components install करें:

```
sudo apt update && sudo apt upgrade -y
sudo apt install git curl docker.io docker-compose-plugin -y
sudo systemctl enable docker
```

> Ubuntu 22.04 और उससे नए versions पर APT वाला `docker-compose` deprecated है।
> अनुशंसित package `docker-compose-plugin` है, जो `docker compose` command प्रदान करता है (dash की जगह space पर ध्यान दें)।

अब आपका server environment BTCPay Server install करने के लिए तैयार है।

</details>

---

### चरण 1: Repository Clone करें

एक working directory बनाएँ और BTCPay Server Docker deployment डाउनलोड करें:

```
mkdir BTCPayServer
cd BTCPayServer
git clone https://github.com/btcpayserver/btcpayserver-docker
cd btcpayserver-docker
```

---

### चरण 2: Environment Variables Export करें

`btcpay.example.com` को अपने वास्तविक domain से बदलें:

```
export BTCPAY_HOST="btcpay.example.com"
export NBITCOIN_NETWORK="mainnet"
export BTCPAYGEN_CRYPTO1="btc"
export BTCPAYGEN_CRYPTO2="zec"
export BTCPAYGEN_REVERSEPROXY="nginx"
export BTCPAYGEN_LIGHTNING="none"
```

> यदि आप बाद में Monero या Litecoin जोड़ने की योजना बना रहे हैं, तो उन्हें अभी शामिल कर सकते हैं:

```
export BTCPAYGEN_CRYPTO3="ltc"
export BTCPAYGEN_CRYPTO4="xmr"
```

आप किसी भी समय उपयुक्त variables export करके और setup script दोबारा चलाकर नए coins जोड़ सकते हैं:

`. ./btcpay-setup.sh -i`

इस गाइड में हम केवल **Zcash** पर ध्यान देंगे।

---

### चरण 3: Installer चलाएँ

सर्वर build और launch करने के लिए setup script चलाएँ:

`. ./btcpay-setup.sh -i`

यह script dependencies install करेगी, `docker-compose.yml` generate करेगी, services start करेगी, और `systemd` configure करेगी।
इसमें लगभग 5 मिनट लगते हैं।

पूरा होने पर, आपका BTCPay Server instance यहाँ उपलब्ध होगा:

`https://btcpay.example.com`

> यदि आप मौजूदा installation में बदलाव कर रहे हैं (उदाहरण: ZEC जोड़ना), तो नए settings के साथ server को stop और restart करना न भूलें:

```
cd ~/BTCPayServer/btcpayserver-docker
btcpay-down.sh
. ./btcpay-setup.sh -i
```

इसके बाद BTCPay Server web interface में Zcash configure करने के लिए अगले section पर जाएँ।



## अपना स्वयं का Zcash Full Node चलाना

यदि आप public `lightwalletd` nodes पर **निर्भर नहीं** रहना चाहते, तो आप उसी server पर अपना full Zcash node और Lightwalletd deploy कर सकते हैं।  
इससे आपको **पूर्ण स्वायत्तता** मिलती है - कोई external dependency नहीं, किसी trust की आवश्यकता नहीं।

---

### चरण 1: पर्याप्त Disk Space सुनिश्चित करें

एक full Zcash node (Zebra + Lightwalletd) के लिए वर्तमान में **300+ GB** disk space चाहिए, और यह निरंतर बढ़ती रहती है।

विभाजन इस प्रकार है:

- Zebra blockchain database: ~260-270 GB
- Lightwalletd indexing: ~15-20 GB

#### अनुशंसित storage:

- **400 GB+** यदि server का उपयोग **केवल** Zcash payments के लिए हो
- **800 GB+** यदि server BTCPay Server, PostgreSQL, Nginx आदि भी चला रहा हो

> आदर्श रूप से **1 TB capacity** वाली SSD/NVMe disk उपयोग करें, विशेषकर यदि आप data को नियमित रूप से prune करने की योजना नहीं बना रहे हैं।

---

### चरण 2: Environment Variables सेट करें

Full node configuration activate करने के लिए अपने environment setup में निम्नलिखित जोड़ें:

```
export BTCPAYGEN_EXCLUDE_FRAGMENTS="zcash"
export BTCPAYGEN_ADDITIONAL_FRAGMENTS="zcash-fullnode"
```

इससे `zcash-fullnode` fragment शामिल होगा, जो BTCPay Server के भीतर `zebrad` और `lightwalletd` दोनों को launch करता है।

---

### चरण 3: Installer दोबारा चलाएँ

`. ./btcpay-setup.sh -i`

यह script:

* Zebra और Lightwalletd के लिए Docker images डाउनलोड करेगी
* BTCPay stack के भीतर services सेट करेगी
* Zcash plugin को **local** `lightwalletd` instance से link करेगी

> **पूरी blockchain sync में कई दिन लग सकते हैं**, खासकर कम resources वाले VPS servers पर।
> जब तक synchronization पूरी नहीं होती, shielded payments उपलब्ध नहीं होंगी।


## किसी बाहरी Lightwalletd Node से कनेक्ट करना

अधिकांश मामलों में पूर्ण स्वायत्तता आवश्यक नहीं होती - और merchants अपना full Zcash node चलाने में समय और disk space नहीं लगाना चाहते।  
Default रूप से BTCPay Server पूरे blockchain को डाउनलोड किए बिना shielded payments संभालने के लिए एक public `lightwalletd` node से connect करता है।

Default endpoint है:

`https://zec.rocks:443`

हालाँकि, आप BTCPay Server को **किसी भी बाहरी `lightwalletd` node** से connect करने के लिए configure कर सकते हैं, जैसे:

`https://lightwalletd.example:443`

यह section दिखाता है कि **custom Docker fragment** का उपयोग करके यह कैसे किया जाए।

> सभी environment variables सहित एक complete config example [plugin repository](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/zcash-lightwalletd.custom.yml) में उपलब्ध है।  
> नीचे दिए गए steps एक minimal working setup दिखाते हैं।

---

### चरण 1: एक Custom Docker Fragment बनाएँ

अपने BTCPayServer project directory में एक custom fragment file बनाएँ:

```
cd ~/BTCPayServer/btcpayserver-docker
mkdir -p docker-compose-generator/docker-fragments
nano docker-compose-generator/docker-fragments/zcash-lightwalletd.custom.yml
```

निम्नलिखित content जोड़ें:

```
exclusive:
- zcash
```

`exclusive` directive यह सुनिश्चित करती है कि एक ही label (`zcash` इस मामले में) वाला केवल एक fragment एक समय पर active हो सकता है।
यह configuration conflicts को रोकता है - उदाहरण के लिए, आप `zcash-fullnode` fragment और इस custom external `lightwalletd` fragment को एक साथ नहीं चला सकते।
इसे `exclusive: zcash` चिह्नित करने से BTCPay Server default `zcash-fullnode` और internal `lightwalletd` containers को स्वतः disable कर देगा, जिससे आप उसके बजाय अपने external node से connect कर सकेंगे।

---

### चरण 2: Environment Variables सेट करें

Terminal में:

```
export BTCPAYGEN_EXCLUDE_FRAGMENTS="$BTCPAYGEN_EXCLUDE_FRAGMENTS;zcash"
export BTCPAYGEN_ADDITIONAL_FRAGMENTS="$BTCPAYGEN_ADDITIONAL_FRAGMENTS;zcash-lightwalletd.custom"
```

---

### चरण 3: बाहरी Node Address निर्धारित करें

अपनी `.env` file खोलें:

`nano .env`

निम्नलिखित line जोड़ें, URL को अपने चुने हुए endpoint से बदलते हुए:

`ZCASH_LIGHTWALLETD=https://lightwalletd.example:443`

आप उपयोग कर सकते हैं:

* कोई **public node**, जैसे `https://lightwalletd.zcash-infra.com`
* आपका अपना self-hosted node, जो BTCPay Server से अलग deploy किया गया हो

> यदि external `lightwalletd` अनुपलब्ध हो जाए या overloaded हो जाए, तो shielded payments विफल हो जाएँगी।
> महत्वपूर्ण services के लिए **स्थिर और भरोसेमंद endpoint** चुनें (जैसे default `zec.rocks`)।

> `lightwalletd` को स्वयं host करना चाहते हैं?
> आप [Zebra repository](https://github.com/ZcashFoundation/zebra/blob/main/docker/docker-compose.lwd.yml) से `docker-compose.lwd.yml` उपयोग कर सकते हैं।
> **चेतावनी:** यह setup आधिकारिक रूप से documented नहीं है और इसके लिए manual TLS setup, port forwarding और firewall configuration की आवश्यकता होती है - केवल advanced users के लिए अनुशंसित।

---

### चरण 4: Installer दोबारा चलाएँ

`. ./btcpay-setup.sh -i`

BTCPay Server आपकी custom config apply करेगा और निर्दिष्ट `lightwalletd` node से connect करेगा।

अब से, Zcash plugin shielded transactions संभालने के लिए उसी external endpoint का उपयोग करेगा।


## Cloudflare Tunnel के साथ घर पर BTCPay Server होस्ट करना

क्या आप किसी home device - जैसे Raspberry Pi 5 या किसी local server - पर **static IP के बिना** BTCPay Server host करते हुए Zcash payments स्वीकार करना चाहते हैं?  
आप **Cloudflare Tunnel** का उपयोग करके अपने instance को सुरक्षित रूप से इंटरनेट पर उपलब्ध करा सकते हैं।

यह तरीका port forwarding से बचाता है और आपके वास्तविक IP address को public से छिपाए रखता है - साथ ही आपके server को HTTPS पर सुलभ बनाए रखता है।

यह आपको **VPS किराए पर लेने की लागत से बचने** में भी मदद करता है, जो आदर्श है यदि cryptocurrency payments आपके व्यवसाय की मुख्य आवश्यकता न होकर केवल एक अतिरिक्त सुविधा हों।

---

### चरण 1: Cloudflare Tunnel install करें

1. [cloudflare.com](https://www.cloudflare.com) पर एक account बनाएँ और अपना domain जोड़ें।
2. अपने **home server** पर Cloudflare Tunnel install करें:

```
sudo apt update
sudo apt install cloudflared --legacy
```

3. Cloudflare के साथ authenticate करें:

`cloudflared tunnel login`

यह command एक browser window खोलेगी। Login करें और अपने domain तक access अधिकृत करें।
Cloudflare आपके server पर token सहित एक `credentials` file स्वतः बना देगा।

4. एक नया tunnel बनाएँ (आप इसका नाम `btcpay` या कुछ और रख सकते हैं):

`cloudflared tunnel create btcpay`

इससे tunnel ID और credentials वाली एक `btcpay.json` file बनेगी - अगले चरण में आपको इसकी आवश्यकता होगी।

---

### चरण 2: Tunnel Configuration File बनाएँ

Configuration directory बनाएँ (यदि मौजूद न हो) और config file खोलें:

```
sudo mkdir -p /etc/cloudflared
sudo nano /etc/cloudflared/config.yml
```

निम्नलिखित configuration paste करें:

```
tunnel: btcpay    # your tunnel name
credentials-file: /root/.cloudflared/btcpay.json

ingress:
  - hostname: btcpay.example.com      # your domain
    service: http://127.0.0.1:80
  - service: http_status:404
```

#### व्याख्या:

* `tunnel` - उस tunnel का नाम जो आपने पहले बनाया था
* `credentials-file` - `cloudflared tunnel login` के दौरान generate हुई token file का path
* `hostname` - आपका Cloudflare में registered domain (उदाहरण: `btcpay.example.com`)
* `service` - आपके BTCPay Server का local address (आमतौर पर Nginx के लिए `http://127.0.0.1:80`)

> Cloudflare आपके home IP को उजागर किए बिना traffic को सुरक्षित रूप से आपके local server तक proxy करेगा।


### चरण 3: अपने Tunnel के लिए DNS Record जोड़ें

Tunnel बनाने के बाद, Cloudflare आमतौर पर आपके domain के लिए **स्वतः एक CNAME DNS record जोड़ देता है**। यह कुछ इस तरह दिखना चाहिए:

`btcpay.example.com -> <UUID>.cfargotunnel.com`

यदि यह स्वतः दिखाई न दे, तो इसे manually जोड़ें:

1. अपने [Cloudflare Dashboard](https://dash.cloudflare.com/) पर जाएँ
2. **DNS** section में जाएँ
3. एक नया CNAME record जोड़ें:
   - **Name**: `btcpay`
   - **Target**: `<UUID>.cfargotunnel.com`  
     आप इसका सटीक मान अपनी `btcpay.json` file में या यह चलाकर पा सकते हैं:
     
     `cloudflared tunnel list`
     
   - **Proxy status**: Enabled (orange cloud)

> यह record सुनिश्चित करता है कि `btcpay.example.com` पर आने वाली सभी requests Cloudflare Tunnel के माध्यम से route हों, जिससे आपका वास्तविक IP address public से छिपा रहे।

---

### चरण 4: System Startup पर Tunnel enable करें

Tunnel को boot पर स्वतः चलाने के लिए, इसे system service के रूप में install करें:

`sudo cloudflared service install`

फिर service को enable और start करें:

```
sudo systemctl enable cloudflared
sudo systemctl start cloudflared
```

Status जाँचें:

`sudo systemctl status cloudflared`

आपको `Active: active (running)` जैसा संदेश और यह confirmation दिखाई देनी चाहिए कि `btcpay.example.com` online है।

> अब से, हर reboot पर tunnel स्वतः start होगा, और आपका BTCPay Server public रूप से accessible रहेगा - बिना port forwarding और बिना आपका वास्तविक IP उजागर किए।

---

### चरण 5: BTCPay Server Setup पूरा करें

यदि आप पहली बार BTCPay Server install करने जा रहे हैं, तो setup script चलाने से पहले अपना domain सेट करें:

`export BTCPAY_HOST="btcpay.example.com"`

यह सुनिश्चित करता है कि **Nginx configuration** और **SSL certificates** generate करते समय सही domain उपयोग हो।

यदि BTCPay Server पहले से install है और आप केवल tunnel जोड़ रहे हैं:

```
cd ~/BTCPayServer/btcpayserver-docker
. ./btcpay-setup.sh -i
```

Setup configs को regenerate करेगा और नया domain apply करेगा।
अब आपको अपना server यहाँ access कर पाना चाहिए:

`https://btcpay.example.com`

> चाहे आप public `lightwalletd` उपयोग कर रहे हों या अपना full node, इससे tunnel पर कोई प्रभाव नहीं पड़ता।
> केवल इतना महत्वपूर्ण है कि BTCPay Server local रूप से `127.0.0.1:80` पर listen कर रहा हो।


## BTCPay Server Web Interface में Zcash Plugin कॉन्फ़िगर करना

> **Multi-store setups के लिए महत्वपूर्ण:**  
> यहाँ configure किया गया Zcash wallet पूरे instance के लिए **global** होता है। जब तक आप अलग-अलग BTCPay instances नहीं चलाते, सभी stores इसी wallet का उपयोग करेंगे।

अपने BTCPay Server instance को सफलतापूर्वक deploy करने के बाद, आपको admin web interface के माध्यम से कुछ basic configuration करनी होगी।  
आधिकारिक documentation पूरी instructions अंग्रेज़ी में देती है - यहाँ हम आवश्यक steps पर चलेंगे और विशेष रूप से Zcash plugin configuration पर ध्यान देंगे।

---

### चरण 1: Web Interface में लॉग इन करें

अपने instance पर जाएँ:

`[https://btcpay.example.com](https://btcpay.example.com)`

- अपना administrator login और password दर्ज करें।
- यदि आप पहली बार login कर रहे हैं, तो आपसे account बनाने के लिए कहा जाएगा।
- जो पहला account आप register करेंगे, उसे स्वतः admin privileges मिल जाएँगे।

---

### चरण 2: Zcash Plugin install करें

1. मुख्य menu में जाएँ:

`Plugins -> Browse Plugins`

2. **Zcash (ZEC)** plugin खोजें। आवश्यकता हो तो search bar का उपयोग करें।
3. **Install** पर क्लिक करें और पुष्टि करें।

> Server configuration के दौरान आपने जो अन्य altcoins enable किए हों, उनके लिए भी यही प्रक्रिया दोहराएँ।

Installation के बाद active plugins के साथ interface reload करने के लिए **Restart Server** पर क्लिक करें।


### चरण 3: Viewing Key के माध्यम से अपना Wallet connect करें

Plugin install करने के बाद settings menu में एक नया **Zcash** section दिखाई देगा।

1. यहाँ जाएँ:

`Zcash -> Settings`

2. अपना **Unified Full Viewing Key (UFVK)** paste करें - BTCPay हर invoice के लिए एक Unified Address derive करेगा और incoming shielded payments detect करेगा।

> **नोट:** पुरानी Sapling viewing keys समर्थित हैं, लेकिन Orchard/Unified Addresses उपयोग करने के लिए आपको **UFVK** देना चाहिए।


   Example format:

`uview184syv9wftwngkay8d...`

3. Block height field में एक मान दर्ज करें

* **नए wallet (नई seed phrase) के साथ पहली बार setup:** वर्तमान Zcash block height दर्ज करें (आप इसे 3xpl.com/zcash पर देख सकते हैं) - इससे initial scanning तेज़ हो जाती है।
* **उसी server पर legacy Sapling-only setup से Unified Addresses / Orchard पर migrate कर रहे हैं:** इस field को खाली छोड़ दें।
* **उसी wallet/UFVK के साथ अपने store को नए server पर ले जा रहे हैं:** वैकल्पिक रूप से birth height दर्ज करें - आपके store के पहले paid order के आसपास की अनुमानित height (scan संकीर्ण करने के लिए order date को 3xpl पर मिलाएँ)। यदि निश्चित न हों, तो इसे खाली छोड़ दें।

> अभी सभी wallets **Unified Full Viewing Key (UFVK)** export को सपोर्ट नहीं करते।  
> अनुशंसित विकल्प:  
> – [**YWallet**](https://ywallet.app/installation)  
> – [**Zingo! Wallet (version for PC)**](https://zingolabs.org/)  
> दोनों apps में backup/export section में UFVK export विकल्प देखें।

ये keys **automatic address rotation** को सपोर्ट करती हैं, जिसका मतलब है:
- हर customer को एक **unique** payment address मिलता है
- आप एक **single, unified** balance देखते हैं

आप [ZecHub -> Wallets](https://zechub.wiki/wallets) पर एक व्यापक compatibility list देख सकते हैं।

सभी fields भरने के बाद **Save** पर क्लिक करें।

---

### अपने ZEC Payment Flow का परीक्षण करें

बधाई हो - आपका Zcash wallet अब BTCPay Server से connect हो चुका है।

अब एक परीक्षण करें:

1. यहाँ जाएँ:

`Invoices -> Create New`

2. ZEC में छोटी राशि के लिए एक test invoice generate करें।
3. **किसी दूसरे wallet** से funds भेजें (वह नहीं जो BTCPay से connected है)।
4. जैसे ही transaction detect होगी, invoice page पर एक visual celebration दिखाई देगा।
5. पुष्टि करें कि invoice status **Paid** में बदल गया है।

यदि सब कुछ सही काम करता है - तो आप API या CMS plugins का उपयोग करके अपनी वेबसाइट में ZEC payments integrate करने के लिए तैयार हैं।



## BTCPay Server को अपनी वेबसाइट के साथ integrate करना

जब आपका Zcash wallet BTCPay Server से connect हो जाता है, तो आप payment system को अपनी वेबसाइट में integrate कर सकते हैं।  
ऐसा करने के कई तरीके हैं - direct API access से लेकर लोकप्रिय CMS platforms के ready-to-use plugins तक।

---

### Integration Options

- **API Integration**  
  Custom-built websites या CMS के बिना systems के लिए आदर्श।  
  यह आपको invoice creation, payment tracking और notifications पर पूरा नियंत्रण देता है - सब आपकी अपनी interface और logic के भीतर।  
  इसके लिए basic programming knowledge चाहिए, इसलिए यह कार्य आपके developer द्वारा संभाला जाना सबसे उपयुक्त है।

- **CMS Plugins**  
  **WooCommerce**, **PrestaShop**, और अन्य platforms के लिए उपलब्ध।  
  ये plugins आपको केवल कुछ मिनटों में payments स्वीकार करने देते हैं - coding की आवश्यकता नहीं।

- **Payment Button या Iframe**  
  सबसे सरल तरीका।  
  Landing pages, personal websites, या किसी भी site के लिए उपयुक्त जहाँ आप केवल donation link या checkout widget embed करना चाहते हों।

---

### API Integration

यदि आप custom platform उपयोग कर रहे हैं (या कोई CMS नहीं है), तो API सबसे अच्छा विकल्प है।  
यह आपको पूरी flexibility देती है: आप invoices create कर सकते हैं, उनकी status track कर सकते हैं, notifications प्राप्त कर सकते हैं, और user experience पर पूरा नियंत्रण रख सकते हैं।

> नोट: कुछ CMS plugins भी अंदर ही अंदर API का उपयोग करते हैं, इसलिए API key बनाना अक्सर **पहला आवश्यक चरण** होता है, चाहे आपका integration method कोई भी हो।

अगला चरण: अपने store के लिए API key generate करें और integration बनाने के लिए [Greenfield API](https://docs.btcpayserver.org/API/Greenfield/v1/) का उपयोग शुरू करें।


### API Key जनरेट करना

अपनी वेबसाइट या app के साथ BTCPay Server integrate करने के लिए आपको एक API key generate करनी होगी।

1. BTCPay Server में लॉग इन करें और **user menu** खोलें (ऊपरी-दाएँ कोने में)
2. **API Keys** में जाएँ
3. **Create a new API key** पर क्लिक करें
4. अपनी key के लिए एक नाम दर्ज करें
5. **Permissions** section में यह enable करें:
   - `Can create invoice`
   - `Can view invoice`
   - *(Optional)* `Can modify store settings` - केवल तब यदि आपको store-level management चाहिए

6. **Generate** पर क्लिक करें। आपकी personal API key दिखाई जाएगी - इसे copy करें और सुरक्षित रूप से store करें।

> यह key आपके store के invoices तक access देती है।  
> इसे सार्वजनिक रूप से साझा **न करें** और client-side code में expose **न करें**।

---

### उदाहरण: API के माध्यम से Invoice बनाना

**Endpoint:**

```
POST /api/v1/stores/{storeId}/invoices
Authorization: token {apiKey}
Content-Type: application/json
```

**Request body:**

```
{
  "amount": 5,
  "currency": "ZEC",
  "checkout": {
    "speedPolicy": "HighSpeed",
    "paymentMethods": ["Zcash"]
  }
}
```

**Response:**

आपको एक JSON object प्राप्त होगा जिसमें होगा:

* `invoiceId`
* एक payment URL जिसे आप अपनी वेबसाइट पर embed कर सकते हैं या customer को भेज सकते हैं

पूर्ण documentation देखें:
[Greenfield API – Create Invoice](https://docs.btcpayserver.org/API/Greenfield/v1/#operation/CreateInvoice)

---

### Webhook सेट करना (वैकल्पिक)

जब invoice statuses बदलें (उदाहरण: payment प्राप्त होने पर) तब real-time notifications प्राप्त करने के लिए:

1. अपने store settings -> **Webhooks** में जाएँ
2. अपने backend endpoint का URL जोड़ें जो BTCPay Server से आने वाली `POST` requests को handle करेगा
3. जब कोई invoice paid हो जाए या expire हो जाए, BTCPay स्वतः notifications भेजेगा

Webhook payloads और retry logic का विवरण [official webhook documentation](https://docs.btcpayserver.org/FAQ/General/#how-to-create-a-webhook-) में दिया गया है।

> विभिन्न programming languages के लिए example integrations BTCPay docs और GitHub repositories में उपलब्ध हैं।



### CMS Integration

BTCPay Server लोकप्रिय content management systems (CMS) के लिए plugins सपोर्ट करता है।  
सबसे परिपक्व और व्यापक रूप से उपयोग की जाने वाली integration **WordPress + WooCommerce** के साथ है, जिससे **बिना code लिखे** ZEC payments स्वीकार करना आसान हो जाता है।

---

#### WooCommerce (WordPress)

BTCPay Server आधिकारिक रूप से WooCommerce के लिए plugin सपोर्ट करता है।

Integrate करने के steps:

1. WordPress plugin directory या GitHub से **BTCPay for WooCommerce** plugin install करें।
2. अपने WordPress admin panel में यहाँ जाएँ:

`WooCommerce -> Settings -> Payments`

3. सूची में **BTCPay** खोजें और **Set up** पर क्लिक करें
4. अपना BTCPay Server URL दर्ज करें और authorization instructions का पालन करें  
   (automatic API key generation की सिफारिश की जाती है)
5. Payment method enable करें और अपनी settings save करें

> विस्तृत instructions, video tutorials, और troubleshooting guides plugin documentation में उपलब्ध हैं।

आपको BTCPay docs के उसी section में अन्य CMS integration options भी मिलेंगे।

---

### Payment Button या Iframe (CMS या API की आवश्यकता नहीं)

यदि आप CMS उपयोग नहीं करते और APIs के साथ काम नहीं करना चाहते, तो ZEC payments स्वीकार करने का सबसे आसान तरीका है **सीधे अपनी वेबसाइट पर payment link या widget embed करना**।

यह तरीका इन परिस्थितियों के लिए आदर्श है:

- Landing pages
- Portfolio sites
- Blogs या static pages
- ऐसे projects जिनमें backend server नहीं है

---

#### विकल्प 1: Payment Button (Link)

1. BTCPay Server में **Invoices** section में manually एक invoice बनाएँ
2. Payment link copy करें, उदाहरण के लिए:

`[https://btcpay.example.com/i/abc123](https://btcpay.example.com/i/abc123)`

3. Link को अपने HTML में जोड़ें:

```
<a href="https://btcpay.example.com/i/abc123" target="_blank">
  Pay with ZEC
</a>
```

---

#### विकल्प 2: Embedded Invoice (Iframe)

Invoice को सीधे अपनी site पर दिखाने के लिए iframe उपयोग करें:

`<iframe src="https://btcpay.example.com/i/abc123" width="600" height="350" frameborder="0"></iframe>`

> आप button या iframe container की styling अपनी site के design के अनुसार कर सकते हैं - BTCPay Server invoice page की flexible theming की अनुमति देता है।

## निष्कर्ष

यह गाइड लंबी थी - लेकिन यह केवल BTCPay Server के साथ Zcash payments integrate करने के बुनियादी पहलुओं को ही कवर करती है।

BTCPay Server interface में हमने यहाँ जो दिखाया है उससे कहीं अधिक functionality उपलब्ध है। सौभाग्य से, UI कई भाषाओं में उपलब्ध है (रूसी सहित), जिससे आगे explore और experiment करना आसान हो जाता है।

BTCPay एक अत्यंत flexible tool है। आप यह कर सकते हैं:

* एक ही instance पर कई स्वतंत्र stores host करना
* Team members के लिए custom roles और permissions परिभाषित करना - केवल order देखने से लेकर full admin तक
* अपने स्वयं के domains और branding का उपयोग करना
* Webhooks, fallback wallets, और यहाँ तक कि Tor access सेट करना
* Advanced settings configure करना जैसे tax rules, discount codes, checkout page customization, payment method restrictions, और बहुत कुछ

BTCPay को centralized payment providers के open-source alternative के रूप में बनाया गया था। यदि आप बिना intermediaries के private ZEC payments स्वीकार करना चाहते हैं, तो यह platform निश्चित रूप से आपके ध्यान के योग्य है।

हम आपको BTCPay ecosystem को समझने और अपने भुगतानों को सचमुच अपना बनाने की यात्रा में सफलता की शुभकामनाएँ देते हैं।

## संसाधन

* [BTCPay Server की आधिकारिक वेबसाइट](https://btcpayserver.org/)
* [BTCPay FAQ](https://docs.btcpayserver.org/FAQ/)
* [BTCPay Server GitHub Repository](https://github.com/btcpayserver/btcpayserver)
* [BTCPay Server Mainnet Demo](https://mainnet.demo.btcpayserver.org/login?ReturnUrl=%2F)
* [BTCPay के लिए Zcash Plugin (GitHub)](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
* [Zcash Plugin Installation Guide](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/installation.md)
* [Custom zcash-lightwalletd.custom.yml उदाहरण](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/zcash-lightwalletd.custom.yml)
* [Lightwalletd Docker Compose File (Zebra)](https://github.com/ZcashFoundation/zebra/blob/main/docker/docker-compose.lwd.yml)
* [BTCPay API Key Docs (Greenfield API)](https://docs.btcpayserver.org/API/Greenfield/v1/#tag/API-Keys)
* [Cloudflare Tunnel बनाएँ](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/get-started/create-remote-tunnel/)
* [Zcash Wallet Compatibility List (ZecHub)](https://zechub.wiki/wallets)
* [Raspberry Pi 5 पर Zebra + Lightwalletd (ZecHub)](https://free2z.com/ZecHub/zpage/zcash-101-zebra-lightwalletd-sync-journal-on-raspberry-pi-5)
