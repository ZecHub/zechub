# Akash पर Console के माध्यम से zcashd डिप्लॉय करना

> **अप्रचलित। जिस नोड का आप उपयोग करना चाहते हैं, उसे डिप्लॉय करने के लिए इस गाइड का पालन न करें।**
>
> zcashd 18 जुलाई, 2026 को अपने स्वचालित End-of-Support halt पर पहुंच गया। आज डिप्लॉय किया गया कोई भी zcashd नोड chain tip तक sync नहीं करेगा, इसलिए यह डिप्लॉयमेंट हर महीने पैसे खर्च करता है और कुछ भी उत्पन्न नहीं करता।
>
> इसके बजाय **Zebra** डिप्लॉय करें: [Akash Network पर Zebra कैसे चलाएँ](/guides/akash-network-zebra), जो वही Akash Console workflow कवर करता है और लगभग एक-तिहाई disk की आवश्यकता रखता है। यदि आप किसी मौजूदा setup को migrate कर रहे हैं, तो [zcashd से Zebra और Zallet migration guide](/guides/migration-guide-zcashd-to-zebrad-zallet) देखें।
>
> इस पेज को zcashd deployment के ऐतिहासिक रिकॉर्ड के रूप में रखा गया है।

[Akash Console](https://console.akash.network) का उपयोग करके zcashd Zcash full नोड (Electric Coin Co implementation) डिप्लॉय करने की गाइड। नीचे एक वीडियो tutorial दिया गया है। इसके नीचे एक अधिक विस्तृत गाइड भी उपलब्ध है।

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/SVekeNU6_-g"
    title="Zcash Full Node setup on Akash Network"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## आप क्या डिप्लॉय कर रहे हैं

एक full zcashd नोड जो:

-> पूरी Zcash blockchain को sync करेगा (mainnet के लिए 350GB+, testnet के लिए ~ 40GB)

-> AKT token की कीमतों के आधार पर लगभग $15/माह खर्च करेगा

-> पूरी तरह sync होने में कई घंटे से लेकर कई दिन तक लेगा

-> 4 vCPU, 16GB RAM, 350GB storage (mainnet) या 2 vCPU, 8GB RAM, 50GB (testnet) का उपयोग करेगा

-> पहली बार चलाने पर cryptographic parameters डाउनलोड करेगा (~ 2GB, एक बार)

**zcashd बनाम Zebra:**

-> zcashd, Electric Coin Co द्वारा मूल Zcash नोड implementation था, जो 18 जुलाई, 2026 से halt हो चुका है

-> Zcash Foundation का Zebra, आज उपयोग में आने वाला full नोड है

-> केवल Zebra वर्तमान chain का अनुसरण करता है; zcashd नोड tip तक नहीं पहुंच सकता

-> zcashd के wallet को [Zallet](/using-zcash/zallet-quick-reference-guide) से प्रतिस्थापित किया जा चुका है

-> यदि आपको wallet functionality या specific RPC APIs की आवश्यकता है, तो zcashd का उपयोग करें


### **महत्वपूर्ण: Akash पर Port Mapping**

जब आप Akash पर कोई port expose करते हैं (उदाहरण के लिए, zcashd P2P के लिए port 8233), तो यह provider के public IP पर **उसी exact port** से bind **नहीं होता**। इसके बजाय, provider एक random high port (जैसे 31234 या 42567) assign करता है और उसे आपके container के port 8233 पर reverse-proxy करता है।

यह design के अनुसार है - providers कई deployments चलाते हैं, और यदि हर कोई सीधे port 8233 का उपयोग करने की कोशिश करे तो conflicts होंगे।

**इसका आपके लिए क्या मतलब है:**

-> आप SDL में port 8233 configure करते हैं (zcashd का standard P2P port)

-> Akash आपको *provider.com:31234* जैसा URI देता है

-> अन्य Zcash नोड आपसे *provider.com:31234* पर connect करते हैं

-> आपके container के अंदर, zcashd अब भी 8233 पर listen करता है


यह अपने आप handle हो जाता है। बस वही URI उपयोग करें जो Akash आपको देता है।

## आवश्यक शर्तें

-> **Keplr Wallet** browser extension इंस्टॉल हो (Chrome/Brave/Firefox)

-> **AKT tokens** - किसी exchange से 50-100 AKT प्राप्त करें (Coinbase, Kraken, Osmosis)

-> Console UI में click-through करने के लिए **5 मिनट**


## चरण 1: अपना Wallet कनेक्ट करें

-> [https://console.akash.network](https://console.akash.network) पर जाएँ

-> ऊपर दाईं ओर **"Connect Wallet"** पर click करें

-> **Keplr** (या अपना पसंदीदा Cosmos wallet) चुनें

-> जब Keplr popup दिखाए तो connection approve करें


आपका AKT balance ऊपर दाईं ओर दिखाई देना चाहिए। यदि यह zero है, तो पहले अपने wallet में funds जोड़ें।

## चरण 2: Deployment बनाएं

-> **"Deploy"** button पर click करें (बड़ा नीला button, पेज के बीच में)

-> **"Build your template"** चुनें (या सीधे SDL upload करने पर जाएँ)

### विकल्प A: SDL फ़ाइल Upload करें (अनुशंसित)

> **यह button एक halted नोड डिप्लॉय करता है।** यह ऐसे नोड के लिए आपके AKT balance से billing करता है जो sync नहीं कर सकता। इसके बजाय [Zebra guide](/guides/akash-network-zebra) का उपयोग करें।

[![Akash पर डिप्लॉय करें](/content-images/deploy-with-akash-btn-74abb88d44.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zcashd)

### विकल्प B: SDL Editor का उपयोग करें

यदि आप SDL को manually paste करना चाहते हैं:

-> *zcashd-akash.yml* की contents copy करें

-> उसे SDL editor में paste करें

-> आवश्यकता अनुसार modify करें (नीचे configuration section देखें)

-> **"Create Deployment"** पर click करें


## चरण 3: Deposit की समीक्षा करें और Approve करें

Console आपको यह दिखाएगा:

-> **Deployment deposit**: ~ 5 AKT (deployment बंद करने पर यह आपको वापस मिल जाता है)

-> **Estimated cost**: आपके SDL pricing के आधार पर


**"Approve"** पर click करें और Keplr में transaction sign करें।

## चरण 4: एक Provider चुनें

लगभग 30 सेकंड बाद, आपको providers से bids दिखाई देंगी। हर bid में यह दिखेगा:

-> **Price per block** (AKT या USDC में)

-> **Monthly estimated cost**

-> **Provider details** (uptime, region, आदि)


**सिर्फ सबसे सस्ता विकल्प न चुनें।** यह देखें:

-> Uptime % (95% से अधिक का लक्ष्य रखें)

-> Region (आपके करीब = बेहतर latency, लेकिन blockchain नोड्स के लिए बहुत फर्क नहीं पड़ता)

-> Audited status (हरा checkmark = अधिक भरोसेमंद)


अपने चुने हुए provider पर **"Accept Bid"** पर click करें और Keplr में sign करें।

## चरण 5: Deployment का इंतज़ार करें

Console यह करेगा:

-> आपके चुने हुए provider के साथ lease बनाएगा

-> manifest भेजेगा (जो provider को बताता है कि क्या चलाना है)

-> आपका container शुरू करेगा


इसमें 1-2 मिनट लगते हैं। आपको UI में status updates दिखाई देंगी।

## चरण 6: सत्यापित करें कि यह चल रहा है

डिप्लॉय होने के बाद, आपको यह दिखाई देगा:

-> **Services** tab: status के साथ आपकी *zcashd* service दिखाता है

-> **Logs** tab: आपके zcashd नोड से live logs

-> **Leases** tab: आपके deployment का विवरण (DSEQ, provider, cost)


### Logs जांचें

**Logs** पर click करें और आपको zcashd शुरू होता हुआ दिखाई देना चाहिए:

```bash
[zcashd]: ZCASHD_NETWORK=mainnet
[zcashd]: Starting: zcashd -printtoconsole -showmetrics=1
...
```

**पहली बार चलाने पर zcash-params (~2GB) डाउनलोड होंगे।** यह एक बार होने वाली प्रक्रिया है और provider bandwidth के आधार पर 5-10 मिनट लेती है। बाद में restart होने पर यह चरण skip हो जाएगा।

Network के आधार पर sync होने में **घंटों से दिनों** तक का समय लगेगा। इन बातों पर नज़र रखें:

-> block heights का बढ़ना

-> Peer connections (10-30 peers होने चाहिए)

-> बार-बार errors न आना


## चरण 7: अपने नोड का Address प्राप्त करें

**Leases** tab पर click करें, फिर **URIs** पर।

आपको कुछ ऐसा दिखाई देगा:

```
zcashd-8233: provider-hostname.com:31234
```

यह आपके नोड का **public P2P endpoint** है। अन्य Zcash नोड्स इस address पर आपसे connect करेंगे।

**Port mapping पर ध्यान दें:** आपने SDL में port 8233 configure किया था, लेकिन Akash ने इसे एक अलग public port (इस उदाहरण में 31234) पर assign किया। यह सामान्य है - यदि यह आपको भ्रमित करे तो ऊपर वाला "Port Mapping on Akash" section देखें। आपका नोड उसी port पर accessible है जो Akash यहाँ दिखाता है, आवश्यक नहीं कि वह 8233 ही हो।

यदि आपने RPC enable किया है (SDL में default रूप से commented out), तो आपको उसका RPC endpoint भी यहाँ उसके अपने mapped port के साथ दिखाई देगा।

## Configuration विकल्प

### Testnet पर स्विच करना

SDL default रूप से Mainnet पर सेट है। इसके बजाय Testnet उपयोग करने के लिए:

-> *env* section में **network बदलें:**

   ```yaml
   # - "ZCASHD_NETWORK=mainnet"
   - "ZCASHD_NETWORK=testnet"
   ```

-> *expose* section में **exposed port update करें:**

   ```yaml
   # Comment out Mainnet port:
   # - port: 8233
   #   as: 8233
   #   to:
   #     - global: true
   #   proto: tcp

   # Uncomment Testnet port:
   - port: 18233
     as: 18233
     to:
       - global: true
     proto: tcp
   ```

-> *profiles.compute.zcashd.resources* में Testnet के लिए **वैकल्पिक: resources कम करें**:

   ```yaml
   cpu:
     units: 2  # Down from 4
   memory:
     size: 8Gi  # Down from 16Gi
   storage:
     - size: 50Gi  # Down from 150Gi
   ```

-> *profiles.placement.akash.pricing* में **वैकल्पिक: pricing कम करें**:

   ```yaml
   amount: 5000  # Down from 10000
   ```

> ध्यान दें, कीमत कम करने से providers की bids filter हो सकती हैं। इस value के साथ प्रयोग करें, या provider endpoint का उपयोग करके जांचें कि वे bid करेंगे या नहीं। (provider api documentation की समीक्षा करें)

### RPC Access Enable करें

Security के लिए RPC default रूप से disabled है। इसे enable करने के लिए:

**अत्यंत महत्वपूर्ण: strong credentials सेट करें।** zcashd RPC username/password को HTTP पर भेजता है (HTTPS पर नहीं)। RPC तभी expose करें जब आप इसके security implications समझते हों।

-> *env* section में uncomment करें:

   ```yaml
   - "ZCASHD_RPCUSER=yourusername"
   - "ZCASHD_RPCPASSWORD=your_very_strong_password_here"  # Use a real password
   - "ZCASHD_RPCBIND=0.0.0.0"
   - "ZCASHD_RPCPORT=8232"  # Mainnet
   # - "ZCASHD_RPCPORT=18232"  # Testnet
   - "ZCASHD_ALLOWIP=0.0.0.0/0"  # Allow from anywhere (use with caution)
   ```

-> *expose* में RPC port uncomment करें:

   **Mainnet के लिए:**

   ```yaml
   - port: 8232
     as: 8232
     to:
       - global: false  # Keep internal for security
     proto: tcp
   ```

   **Testnet के लिए:**

   ```yaml
   - port: 18232
     as: 18232
     to:
       - global: false
     proto: tcp
   ```

**चेतावनी**: यदि आप RPC के लिए *global: true* सेट करते हैं, तो आप basic auth के साथ इसे internet पर expose कर रहे हैं। यह खराब विचार है। *global: false* का उपयोग करें और RPC को Akash की internal network के माध्यम से access करें या एक secure tunnel सेट करें।

**Port mapping reminder**: भले ही आप RPC को globally expose करें, Akash उसे एक random high port पर map करेगा (8232/18232 पर नहीं)। वास्तविक public endpoint देखने के लिए अपने deployment में URIs जांचें। *global: false* (अनुशंसित) के लिए, RPC endpoint केवल Akash deployment network के भीतर accessible होगा, public internet से नहीं।

### Transaction Index Enable करें

Transaction index आपको RPC के माध्यम से किसी भी transaction को उसकी ID से query करने देता है। यह अधिक storage उपयोग करता है (~ 20% वृद्धि)।

*env* में uncomment करें:

```yaml
- "ZCASHD_TXINDEX=1"
```

**चेतावनी**: पहले से synced नोड पर txindex enable करने के लिए पूरी blockchain को दोबारा re-index करना पड़ता है, जिसमें कई घंटे लगते हैं।

### Insight Explorer Enable करें

Insight Explorer blockchain data के लिए अतिरिक्त REST API endpoints देता है (block explorers के लिए उपयोगी)।

*env* में uncomment करें:

```yaml
- "ZCASHD_INSIGHTEXPLORER=1"
```

यह अपने आप txindex enable करता है और अतिरिक्त RPC methods जोड़ता है।

### Prometheus Metrics Enable करें

Monitoring के लिए metrics scrape करने हेतु:

-> *env* में uncomment करें:

   ```bash
   - "ZCASHD_PROMETHEUSPORT=9969"
   - "ZCASHD_METRICSIP=0.0.0.0/0"
   ```

-> *expose* में metrics port uncomment करें:

   ```bash
   - port: 9969
     as: 9969
     to:
       - global: false
     proto: tcp
   ```
   
Metrics Prometheus format में http://yourendpoint:9969/metrics पर उपलब्ध होंगे।

### Resources/Pricing समायोजित करें

यदि आपको bids नहीं मिल रही हैं या आप cost optimize करना चाहते हैं:

**कम-spec providers के लिए**, *profiles.compute.zcashd.resources* section में कम करें:

-> CPU: *units: 2* (उचित sync speed के लिए न्यूनतम)

-> Memory: *size: 12Gi* (stability के लिए न्यूनतम)

-> Storage: *size: 120Gi* (mainnet के लिए न्यूनतम)


**अधिक bids आकर्षित करने के लिए**, *profiles.placement.akash.pricing* में बढ़ाएँ:

-> Mainnet: *amount: 15000* uakt/block आज़माएँ

-> Testnet: *amount: 7500* uakt/block आज़माएँ


SDL values को सावधानीपूर्वक ऊँचा रखा गया है। अधिकांश providers इससे कम पर bid करेंगे।

## अपना Deployment अपडेट करना

डिप्लॉय करने के बाद configuration बदलने की ज़रूरत है?

-> Console में **My Deployments** पर जाएँ

-> अपना zcashd deployment खोजें

-> **"Update Deployment"** पर click करें

-> SDL edit करें

-> **"Update"** पर click करें और Keplr में approve करें


**नोट**: Update करने से आपका container restart होगा। नोड अपनी saved state (persistent storage) से resume करेगा, लेकिन 1-2 मिनट के downtime की अपेक्षा रखें।

## Monitoring

### Console के माध्यम से

-> **Logs tab**: Live container logs

-> **Shell tab**: Container के अंदर shell प्राप्त करें (debugging के लिए उपयोगी)

-> **Events tab**: Kubernetes events (जब तक कुछ खराब न हो, अधिकतर बेकार)


### RPC के माध्यम से (यदि enable किया गया हो)

यदि आपने RPC enable किया है, तो आप अपने नोड को सामान्य zcashd full नोड की तरह query कर सकते हैं (क्योंकि यह वही है!)

### zcash-cli विकल्प

यदि आपके पास Console के माध्यम से shell access है, तो आप सीधे *zcash-cli* का उपयोग कर सकते हैं:

```bash
# From the Shell tab in Console
zcash-cli getblockchaininfo
zcash-cli getpeerinfo
zcash-cli getinfo
```

## अपना Deployment बंद करना

जब आपका काम पूरा हो जाए या आप भुगतान बंद करना चाहें:

-> **My Deployments** पर जाएँ

-> अपना zcashd deployment खोजें

-> **"Close Deployment"** पर click करें

-> Confirm करें और Keplr में sign करें


आपका 5 AKT deposit refund हो जाएगा। **Persistent storage** provider द्वारा सुरक्षित रखा जाना चाहिए, लेकिन इस पर निर्भर न रहें - इसे किसी भी अन्य cloud provider की तरह मानें।

## Troubleshooting

### "Insufficient funds" error

आपको अधिक AKT की आवश्यकता है। अपने Keplr wallet में funds जोड़ें।

### कोई bids दिखाई नहीं दे रहीं

या तो:

-> आपकी pricing बहुत कम है (SDL में *amount* बढ़ाएँ)

-> आपकी resource requirements उपलब्ध providers के लिए बहुत अधिक हैं (CPU/memory/storage कम करें)

-> अधिक इंतज़ार करें (कभी-कभी bids आने में 60-90 सेकंड लगते हैं)


### Deployment "pending" में अटका हुआ है

हो सकता है provider को समस्याएँ हों। Deployment बंद करें और किसी दूसरे provider को आज़माएँ।

### zcashd logs में "No peers connected" दिखाई देता है

18 जुलाई, 2026 के End-of-Support halt के बाद, यह startup delay के बजाय अपेक्षित स्थायी स्थिति है, और इंतज़ार करने या फिर से deployment करने से यह ठीक नहीं होगा। इसके बजाय [Zebra](/guides/akash-network-zebra) डिप्लॉय करें।

### Logs में "Out of memory" errors

आपने RAM पर ज़रूरत से ज़्यादा बचत की। Deployment बंद करें और कम से कम 12Gi memory (16Gi अनुशंसित) के साथ फिर से deploy करें।

### Sync होने में बहुत ज़्यादा समय लग रहा है

"बहुत ज़्यादा" को परिभाषित करें:

-> **घंटे**: सामान्य

-> **दिन**: mainnet को scratch से sync करने पर यह भी सामान्य है

-> **हफ्ते**: कुछ गलत है, errors के लिए logs जांचें


### "Error fetching zcash-params"

हो सकता है provider को network issues हों या bandwidth धीमी हो। यह आमतौर पर अपने आप ठीक हो जाता है। यदि यह 30 मिनट से अधिक बना रहता है, तो किसी दूसरे provider पर फिर से deploy करने का प्रयास करें।

### RPC authentication failures

-> जांचें कि *ZCASHD_RPCUSER* और *ZCASHD_RPCPASSWORD* सही तरह सेट हैं

-> सत्यापित करें कि आप सही port उपयोग कर रहे हैं (mainnet के लिए 8232, testnet के लिए 18232)

-> याद रखें ports को Akash map करता है - अपने deployment का URI उपयोग करें, सीधे 8232 नहीं


## Cost Management

Console में अपने spending की निगरानी करें:

-> **My Deployments** -> आपका deployment -> "Cost per month" estimate दिखाता है

-> समय के साथ आपके Keplr wallet का balance कम होता जाएगा


जब आपका balance कम हो जाएगा, Akash आपका deployment अपने आप बंद कर देगा। **समय-समय पर अपने wallet में top up करें** या alerts सेट करें।

### लागत कम करना

-> **Use Testnet** non-production testing के लिए (50% सस्ता)

-> **CPU/memory कम करें** यदि आपको fast sync की आवश्यकता नहीं है

-> **सस्ते providers चुनें** (हमेशा समझदारी नहीं - uptime महत्वपूर्ण है)

-> **AKT की जगह USDC उपयोग करें** यदि AKT की कीमत volatile हो (इसके लिए SDL pricing change चाहिए)

-> **txindex disable करें** यदि आपको इसकी आवश्यकता नहीं है (लगभग 20% storage बचती है)


### अतिरिक्त संसाधन

**Akash Console**: [https://console.akash.network](https://console.akash.network)

**Akash Docs**: [https://akash.network/docs/](https://akash.network/docs/)

**Zcash Explorers**: [https://zechub.wiki/using-zcash/blockchain-explorers](https://zechub.wiki/using-zcash/blockchain-explorers)

**Akash Discord**: [https://discord.akash.network](https://discord.akash.network) (provider issues के लिए)

## अंतिम टिप्पणियाँ

- **Persistent storage महत्वपूर्ण है।** *persistent: true* को skip न करें और *beta2* class का उपयोग न करें। *beta3* का उपयोग करें।
- **Initial sync धीमा होता है।** धैर्य रखें। blockchain नोड्स के लिए यह सामान्य है।
- **अपने wallet में funds बनाए रखें।** AKT खत्म होने पर deployments अपने आप बंद हो जाते हैं।
- **Backups automatic नहीं हैं।** यदि data आपके लिए महत्वपूर्ण है, तो मानकर चलें कि यह गायब हो सकता है और उसी अनुसार योजना बनाएं।
- **RPC security अत्यंत महत्वपूर्ण है।** उचित security measures के बिना RPC को internet पर expose न करें।
- **zcash-params cache होते हैं।** पहली बार चलाने पर ~2GB cryptographic parameters डाउनलोड होते हैं। यह सामान्य है और केवल एक बार होता है।
