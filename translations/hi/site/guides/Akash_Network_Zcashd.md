# Akash के माध्यम से Console पर zcashd तैनात करना

[Akash Console](https://console.akash.network) का उपयोग करके एक zcashd Zcash फुल नोड (Electric Coin Co implementation) तैनात करने की मार्गदर्शिका। नीचे एक वीडियो ट्यूटोरियल दिया गया है। इससे भी अधिक विस्तृत मार्गदर्शिका नीचे उपलब्ध है।

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/SVekeNU6_-g"
    title="Akash Network पर Zcash Full Node सेटअप"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## आप क्या तैनात कर रहे हैं

एक पूर्ण `zcashd` नोड जो:

-> पूरी Zcash blockchain को sync करेगा (mainnet के लिए 350GB+, testnet के लिए ~ 40GB)

-> AKT token की कीमतों के आधार पर लगभग $15/माह खर्च करेगा

-> पूरी तरह sync होने में कई घंटे से लेकर कई दिन तक ले सकता है

-> 4 vCPUs, 16GB RAM, 350GB storage (mainnet) या 2 vCPUs, 8GB RAM, 50GB (testnet) का उपयोग करेगा

-> पहली बार चलने पर cryptographic parameters डाउनलोड करेगा (~ 2GB, एक बार)

**zcashd बनाम Zebra:**

-> `zcashd`, Electric Coin Co द्वारा बनाई गई मूल Zcash node implementation है

-> Zebra, Zcash Foundation की वैकल्पिक implementation है

-> दोनों Zcash network के साथ संगत हैं

-> `zcashd` में अधिक features हैं (mining, wallet, Insight Explorer API)

-> यदि आपको wallet functionality या विशेष RPC APIs चाहिए, तो `zcashd` का उपयोग करें


### **महत्वपूर्ण: Akash पर Port Mapping**

जब आप Akash पर कोई port expose करते हैं (उदाहरण के लिए, `zcashd` P2P के लिए port 8233), तो वह provider के public IP पर **उसी exact port** से bind **नहीं होता**। इसके बजाय, provider एक random high port (जैसे 31234 या 42567) assign करता है और उसे आपके container के port 8233 पर reverse-proxy करता है।

यह डिज़ाइन के अनुसार है - providers कई deployments चलाते हैं, और यदि हर कोई सीधे port 8233 का उपयोग करने लगे तो conflict हो जाएगा।

**इसका आपके लिए क्या मतलब है:**

-> आप SDL में port 8233 configure करते हैं (`zcashd` का standard P2P port)

-> Akash आपको *provider.com:31234* जैसी URI देता है

-> अन्य Zcash nodes आपसे *provider.com:31234* पर connect करते हैं

-> आपके container के अंदर, `zcashd` फिर भी 8233 पर listen करता है


यह सब अपने-आप संभाला जाता है। बस वही URI उपयोग करें जो Akash आपको देता है।

## आवश्यकताएँ

-> **Keplr Wallet** browser extension installed हो (Chrome/Brave/Firefox)

-> **AKT tokens** - किसी exchange (Coinbase, Kraken, Osmosis) से 50-100 AKT प्राप्त करें

-> Console UI में प्रक्रिया पूरी करने के लिए **5 मिनट**


## चरण 1: अपना Wallet कनेक्ट करें

-> [https://console.akash.network](https://console.akash.network) पर जाएँ

-> ऊपर दाईं ओर **"Connect Wallet"** पर क्लिक करें

-> **Keplr** (या अपना पसंदीदा Cosmos wallet) चुनें

-> जब Keplr pop up हो, तो connection approve करें


आपका AKT balance ऊपर दाईं ओर दिखना चाहिए। यदि वह zero है, तो पहले अपना wallet fund करें।

## चरण 2: Deployment बनाएँ

-> **"Deploy"** बटन पर क्लिक करें (बड़ा नीला बटन, पेज के बीच में)

-> **"Build your template"** चुनें (या सीधे SDL upload करने पर जाएँ)

### विकल्प A: SDL फ़ाइल अपलोड करें (अनुशंसित)

[![Akash पर तैनात करें](https://raw.githubusercontent.com/akash-network/console/refs/heads/main/apps/deploy-web/public/images/deploy-with-akash-btn.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zcashd)

### विकल्प B: SDL Editor का उपयोग करें

यदि आप SDL manually paste करना चाहते हैं:

-> *zcashd-akash.yml* की सामग्री copy करें

-> उसे SDL editor में paste करें

-> आवश्यकता अनुसार modify करें (नीचे configuration section देखें)

-> **"Create Deployment"** पर क्लिक करें


## चरण 3: Deposit की समीक्षा करें और Approve करें

Console आपको यह दिखाएगा:

-> **Deployment deposit**: ~ 5 AKT (deployment बंद करने पर यह आपको वापस मिल जाता है)

-> **Estimated cost**: आपके SDL pricing के आधार पर


**"Approve"** पर क्लिक करें और Keplr में transaction sign करें।

## चरण 4: Provider चुनें

लगभग ~ 30 seconds बाद, आपको providers की bids दिखाई देंगी। हर bid में यह दिखेगा:

-> **Price per block** (AKT या USDC में)

-> **Monthly estimated cost**

-> **Provider details** (uptime, region, आदि)


**सिर्फ सबसे सस्ता विकल्प न चुनें।** यह जाँचें:

-> Uptime % (लक्ष्य > 95%)

-> Region (आपके करीब = बेहतर latency, लेकिन blockchain nodes के लिए बहुत फर्क नहीं पड़ता)

-> Audited status (green checkmark = अधिक भरोसेमंद)


अपने चुने हुए provider पर **"Accept Bid"** पर क्लिक करें और Keplr में sign करें।

## चरण 5: Deployment पूरा होने की प्रतीक्षा करें

Console यह करेगा:

-> आपके चुने हुए provider के साथ lease बनाएगा

-> manifest भेजेगा (जो provider को बताता है कि क्या चलाना है)

-> आपका container शुरू करेगा


इसमें 1-2 मिनट लगते हैं। आपको UI में status updates दिखाई देंगे।

## चरण 6: सत्यापित करें कि यह चल रहा है

तैनाती के बाद, आपको यह दिखाई देगा:

-> **Services** tab: status के साथ आपकी *zcashd* service दिखाता है

-> **Logs** tab: आपके `zcashd` node के live logs

-> **Leases** tab: आपके deployment का विवरण (DSEQ, provider, cost)


### Logs जाँचें

**Logs** पर क्लिक करें और आपको `zcashd` शुरू होता हुआ दिखना चाहिए:

```bash
[zcashd]: ZCASHD_NETWORK=mainnet
[zcashd]: Starting: zcashd -printtoconsole -showmetrics=1
...
```

**पहली बार चलने पर `zcash-params` डाउनलोड होंगे (~2GB)।** यह एक बार होने वाली प्रक्रिया है और provider bandwidth के आधार पर 5-10 मिनट लेती है। बाद की restarts में यह चरण skip हो जाएगा।

Sync में network के आधार पर **घंटों से दिनों** तक लग सकते हैं। इन बातों पर नज़र रखें:

-> block heights बढ़ना

-> peer connections (10-30 peers होने चाहिए)

-> बार-बार errors न आना


## चरण 7: अपने Node का Address प्राप्त करें

**Leases** tab पर क्लिक करें, फिर **URIs** पर।

आपको कुछ ऐसा दिखाई देगा:

```
zcashd-8233: provider-hostname.com:31234
```

यह आपके node का **public P2P endpoint** है। अन्य Zcash nodes आपसे इसी address पर connect करेंगी।

**Port mapping पर ध्यान दें:** आपने SDL में port 8233 configure किया था, लेकिन Akash ने उसे किसी अलग public port पर assign किया (इस उदाहरण में 31234)। यह सामान्य है - यदि इससे भ्रम हो, तो ऊपर दिए गए "Port Mapping on Akash" section को देखें। आपका node उसी port पर accessible है जो Akash यहाँ दिखाता है, ज़रूरी नहीं कि वह 8233 ही हो।

यदि आपने RPC enable किया है (SDL में default रूप से commented out), तो आपको यहाँ उसका RPC endpoint भी उसकी mapped port के साथ दिखाई देगा।

## Configuration Options

### Testnet पर स्विच करना

SDL default रूप से Mainnet पर सेट है। इसके बजाय Testnet उपयोग करने के लिए:

-> *env* section में **network बदलें:**

   ```yaml
   # - "ZCASHD_NETWORK=mainnet"
   - "ZCASHD_NETWORK=testnet"
   ```

-> *expose* section में **exposed port** update करें:

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

-> *profiles.compute.zcashd.resources* में **वैकल्पिक: Testnet के लिए resources कम करें**:

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

> ध्यान दें, कीमतें कम करने से providers की bids filter हो सकती हैं। इस value के साथ प्रयोग करें, या provider endpoint का उपयोग करके जाँचें कि वे bid करेंगे या नहीं। (provider api documentation देखें)

### RPC Access Enable करना

सुरक्षा कारणों से RPC default रूप से disabled है। इसे enable करने के लिए:

**अत्यंत महत्वपूर्ण: मजबूत credentials सेट करें।** `zcashd` RPC username/password को HTTP (HTTPS नहीं) के ऊपर transmit करता है। RPC तभी expose करें जब आप इसके security implications समझते हों।

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

**चेतावनी**: यदि आप RPC के लिए *global: true* सेट करते हैं, तो आप उसे basic auth के साथ internet पर expose कर रहे हैं। यह अच्छा विचार नहीं है। *global: false* का उपयोग करें और RPC को Akash के internal network के माध्यम से access करें या एक secure tunnel सेट करें।

**Port mapping reminder**: भले ही आप RPC को globally expose करें, Akash उसे एक random high port पर map करेगा (8232/18232 पर नहीं)। वास्तविक public endpoint देखने के लिए अपने deployment की URIs जाँचें। *global: false* (अनुशंसित) के लिए, RPC endpoint केवल Akash deployment network के भीतर accessible होगा, public internet से नहीं।

### Transaction Index Enable करना

Transaction index आपको RPC के माध्यम से किसी भी transaction को उसके ID से query करने देता है। यह अधिक storage उपयोग करता है (~ 20% वृद्धि)।

*env* में uncomment करें:

```yaml
- "ZCASHD_TXINDEX=1"
```

**चेतावनी**: किसी पहले से synced node पर txindex enable करने के लिए पूरी blockchain को फिर से re-index करना पड़ता है, जिसमें कई घंटे लगते हैं।

### Insight Explorer Enable करना

Insight Explorer blockchain data के लिए अतिरिक्त REST API endpoints देता है (block explorers के लिए उपयोगी)।

*env* में uncomment करें:

```yaml
- "ZCASHD_INSIGHTEXPLORER=1"
```

यह अपने-आप txindex enable करता है और अतिरिक्त RPC methods जोड़ता है।

### Prometheus Metrics Enable करना

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

### Resources/Pricing समायोजित करना

यदि आपको bids नहीं मिल रही हैं या आप लागत optimize करना चाहते हैं:

**कम-spec providers के लिए**, *profiles.compute.zcashd.resources* section में कम करें:

-> CPU: *units: 2* (उचित sync speed के लिए न्यूनतम)

-> Memory: *size: 12Gi* (स्थिरता के लिए न्यूनतम)

-> Storage: *size: 120Gi* (mainnet के लिए न्यूनतम)


**अधिक bids आकर्षित करने के लिए**, *profiles.placement.akash.pricing* में बढ़ाएँ:

-> Mainnet: *amount: 15000* uakt/block आज़माएँ

-> Testnet: *amount: 7500* uakt/block आज़माएँ


SDL values को सावधानीपूर्वक ऊँचा रखा गया है। अधिकांश providers इससे कम पर bid करेंगे।

## अपना Deployment अपडेट करना

तैनाती के बाद configuration बदलनी है?

-> Console में **My Deployments** पर जाएँ

-> अपना `zcashd` deployment खोजें

-> **"Update Deployment"** पर क्लिक करें

-> SDL edit करें

-> **"Update"** पर क्लिक करें और Keplr में approve करें


**ध्यान दें**: Update करने से आपका container restart होगा। Node अपनी saved state (persistent storage) से resume करेगा, लेकिन 1-2 मिनट के downtime की अपेक्षा रखें।

## Monitoring

### Console के माध्यम से

-> **Logs tab**: live container logs

-> **Shell tab**: container के अंदर shell प्राप्त करें (debugging के लिए उपयोगी)

-> **Events tab**: Kubernetes events (जब तक कुछ टूटा न हो, अधिकतर बेकार)


### RPC के माध्यम से (यदि enabled हो)

यदि आपने RPC enable किया है, तो आप अपने node को एक सामान्य `zcashd` full node की तरह query कर सकते हैं (क्योंकि वह वास्तव में वही है!)

### `zcash-cli` विकल्प

यदि आपके पास Console के माध्यम से shell access है, तो आप सीधे *zcash-cli* उपयोग कर सकते हैं:

```bash
# From the Shell tab in Console
zcash-cli getblockchaininfo
zcash-cli getpeerinfo
zcash-cli getinfo
```

## अपना Deployment बंद करना

जब आप काम पूरा कर लें या भुगतान रोकना चाहें:

-> **My Deployments** पर जाएँ

-> अपना `zcashd` deployment खोजें

-> **"Close Deployment"** पर क्लिक करें

-> पुष्टि करें और Keplr में sign करें


आपकी 5 AKT deposit वापस कर दी जाएगी। **Persistent storage** provider द्वारा संरक्षित रहनी चाहिए, लेकिन उस पर निर्भर न रहें - इसे किसी भी अन्य cloud provider की तरह समझें।

## Troubleshooting

### "Insufficient funds" error

आपको अधिक AKT की आवश्यकता है। अपना Keplr wallet fund करें।

### कोई bids दिखाई नहीं दे रहीं

इनमें से कोई एक कारण हो सकता है:

-> आपकी pricing बहुत कम है (SDL में *amount* बढ़ाएँ)

-> आपके resource requirements उपलब्ध providers के लिए बहुत अधिक हैं (CPU/memory/storage कम करें)

-> थोड़ा और प्रतीक्षा करें (कभी-कभी bids आने में 60-90 seconds लगते हैं)


### Deployment "pending" में अटका हुआ है

हो सकता है provider को समस्या हो रही हो। Deployment बंद करें और किसी दूसरे provider के साथ फिर प्रयास करें।

### `zcashd` logs में "No peers connected" दिख रहा है

पहले कुछ मिनटों के लिए यह सामान्य है। `zcashd` peers को अपने-आप खोज लेगा। यदि 10+ मिनट बाद भी यही स्थिति रहे, तो network issue हो सकता है (Akash पर इसकी संभावना कम है)।

### Logs में "Out of memory" errors

आपने RAM पर ज़रूरत से ज़्यादा बचत कर दी। Deployment बंद करें और कम-से-कम 12Gi memory (16Gi अनुशंसित) के साथ फिर से deploy करें।

### Sync में बहुत ज़्यादा समय लग रहा है

"बहुत ज़्यादा" से आपका मतलब क्या है:

-> **Hours**: सामान्य

-> **Days**: scratch से mainnet के लिए यह भी सामान्य है

-> **Weeks**: कुछ गड़बड़ है, errors के लिए logs जाँचें


### "Error fetching zcash-params"

हो सकता है provider को network issues हों या bandwidth धीमी हो। यह आमतौर पर अपने-आप ठीक हो जाता है। यदि यह 30 मिनट से अधिक बना रहे, तो किसी दूसरे provider पर redeploy करने का प्रयास करें।

### RPC authentication failures

-> जाँचें कि *ZCASHD_RPCUSER* और *ZCASHD_RPCPASSWORD* सही सेट हैं

-> सत्यापित करें कि आप सही port उपयोग कर रहे हैं (mainnet के लिए 8232, testnet के लिए 18232)

-> याद रखें कि ports Akash द्वारा map किए जाते हैं - सीधे 8232 का उपयोग न करें, अपने deployment की URI का उपयोग करें


## Cost Management

Console में अपना खर्च monitor करें:

-> **My Deployments** -> आपका deployment -> "Cost per month" estimate दिखाता है

-> समय के साथ आपका Keplr wallet balance कम होता जाएगा


जब आपका balance कम हो जाएगा, Akash आपके deployment को auto-close कर देगा। **समय-समय पर अपने wallet में राशि जोड़ते रहें** या alerts सेट करें।

### लागत कम करना

-> **Testnet का उपयोग करें** non-production testing के लिए (50% सस्ता)

-> **CPU/memory कम करें** यदि आपको तेज sync की आवश्यकता नहीं है

-> **सस्ते providers चुनें** (हमेशा समझदारी नहीं - uptime महत्वपूर्ण है)

-> यदि AKT की कीमत अस्थिर है, तो **AKT की जगह USDC उपयोग करें** (SDL pricing change आवश्यक है)

-> यदि आपको txindex की आवश्यकता नहीं है, तो **उसे disable करें** (लगभग 20% storage बचती है)


### अतिरिक्त संसाधन

**Akash Console**: [https://console.akash.network](https://console.akash.network)

**Akash Docs**: [https://akash.network/docs/](https://akash.network/docs/)

**Zcash Explorers**: [https://zechub.wiki/using-zcash/blockchain-explorers](https://zechub.wiki/using-zcash/blockchain-explorers)

**Akash Discord**: [https://discord.akash.network](https://discord.akash.network) (provider issues के लिए)

## अंतिम टिप्पणियाँ

- **Persistent storage महत्वपूर्ण है।** *persistent: true* को skip न करें और *beta2* class का उपयोग न करें। *beta3* उपयोग करें।
- **Initial sync धीमा होता है।** धैर्य रखें। Blockchain nodes के लिए यह सामान्य है।
- **अपने wallet में पर्याप्त राशि बनाए रखें।** AKT समाप्त होने पर deployments auto-close हो जाते हैं।
- **Backups automatic नहीं होते।** यदि यह data आपके लिए महत्वपूर्ण है, तो मानकर चलें कि यह गायब हो सकता है और उसी अनुसार योजना बनाएँ।
- **RPC security अत्यंत महत्वपूर्ण है।** उचित security measures के बिना RPC को internet पर expose न करें।
- **`zcash-params` cache हो जाते हैं।** पहली बार चलने पर लगभग 2GB cryptographic parameters डाउनलोड होते हैं। यह सामान्य है और केवल एक बार होता है।
