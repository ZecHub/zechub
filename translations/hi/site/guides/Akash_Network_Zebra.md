# Akash Network पर Zebra कैसे चलाएँ

[Akash Console](https://console.akash.network) का उपयोग करके Zebra Zcash full node deploy करने के लिए चरण-दर-चरण मार्गदर्शिका।

### आप क्या Deploy कर रहे हैं

एक पूर्ण Zebra node जो:

-> पूरी Zcash blockchain को sync करेगा (mainnet के लिए 100GB+, testnet के लिए ~40GB)

-> AKT token की कीमतों के आधार पर लगभग $15/माह खर्च करेगा

-> पूरी तरह sync होने में कई घंटों से लेकर कई दिन तक लेगा

-> 4 vCPUs, 16GB RAM, 350GB storage (mainnet) या 2 vCPUs, 8GB RAM, 50GB (testnet) का उपयोग करेगा


### महत्वपूर्ण: Akash पर Port Mapping

जब आप Akash पर कोई port expose करते हैं (उदाहरण के लिए, Zebra P2P के लिए port 8233), तो वह provider के public IP पर **ठीक उसी port** से bind **नहीं होता**। इसके बजाय, provider एक random high port (जैसे 31234 या 42567) assign करता है और उसे reverse-proxy करके आपके container के port 8233 तक पहुंचाता है।

यह design के अनुसार है - providers कई deployments चलाते हैं, और यदि हर कोई सीधे port 8233 का उपयोग करे तो conflict हो जाएगा।

**इसका आपके लिए क्या मतलब है:**

-> आप SDL में port 8233 configure करते हैं (Zebra का standard P2P port)

-> Akash आपको *provider.com:31234* जैसा एक URI देता है

-> अन्य Zcash nodes आपसे *provider.com:31234* पर connect करते हैं

-> आपके container के अंदर, Zebra अब भी 8233 पर listen करता है


यह अपने-आप handle हो जाता है। बस वही URI उपयोग करें जो Akash आपको देता है।

### आवश्यकताएँ

1. **Keplr Wallet** browser extension installed हो (Chrome/Brave/Firefox)
2. **AKT tokens** - किसी exchange (Coinbase, Kraken, Osmosis) से 50-100 AKT लें
3. Console UI में आगे बढ़ने के लिए **5 मिनट**

#### चरण 1: अपना Wallet कनेक्ट करें

-> [https://console.akash.network](https://console.akash.network) पर जाएँ

-> ऊपर दाईं ओर **"Connect Wallet"** पर क्लिक करें

-> **Keplr** चुनें (या अपना पसंदीदा Cosmos wallet)

-> जब Keplr pop up हो, तब connection approve करें


आपका AKT balance ऊपर दाईं ओर दिखना चाहिए। यदि वह zero है, तो पहले अपने wallet में funds जोड़ें।

#### चरण 2: Deployment बनाएँ

-> **"Deploy"** button पर क्लिक करें (बड़ा नीला button, पेज के बीच में)

-> **"Build your template"** चुनें (या सीधे SDL upload करने पर जाएँ)


##### विकल्प A: SDL फ़ाइल Upload करें (अनुशंसित)

[![Deploy on Akash](https://raw.githubusercontent.com/akash-network/console/refs/heads/main/apps/deploy-web/public/images/deploy-with-akash-btn.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zebra)

##### विकल्प B: SDL Editor का उपयोग करें

यदि आप manually [the SDL](https://github.com/akash-network/awesome-akash/blob/master/zcash-zebra/deploy.yaml) paste करना चाहते हैं:

-> *zebra-akash.yml* की contents कॉपी करें

-> उसे SDL editor में paste करें

-> आवश्यकता अनुसार संशोधित करें (नीचे configuration section देखें)

-> **"Create Deployment"** पर क्लिक करें


#### चरण 3: Deposit की समीक्षा करें और Approve करें

Console आपको यह दिखाएगा:

-> **Deployment deposit**: ~5 AKT (जब आप deployment बंद करेंगे तो यह वापस मिल जाएगा)

-> **Estimated cost**: आपके SDL pricing के आधार पर

**"Approve"** पर क्लिक करें और Keplr में transaction sign करें।

#### चरण 4: एक Provider चुनें

लगभग 30 सेकंड बाद, आपको providers से bids दिखाई देंगी। हर bid में यह दिखेगा:

-> **Price per block** (AKT या USDC में)

-> **Monthly estimated cost**

-> **Provider details** (uptime, region, आदि)


**सिर्फ सबसे सस्ता विकल्प न चुनें।** यह जाँचें:

-> Uptime % (लक्ष्य > 95%)

-> Region (आपके करीब = बेहतर latency, लेकिन blockchain nodes के लिए इसका बहुत अधिक महत्व नहीं है)

-> Audited status (हरा checkmark = अधिक भरोसेमंद)


अपने चुने हुए provider पर **"Accept Bid"** क्लिक करें और Keplr में sign करें।

#### चरण 5: Deployment के लिए प्रतीक्षा करें

Console:

-> आपके चुने हुए provider के साथ lease बनाएगा

-> manifest भेजेगा (जो provider को बताता है कि क्या चलाना है)

-> आपका container शुरू करेगा

इसमें 1-2 मिनट लगते हैं। UI में आपको status updates दिखेंगी।

#### चरण 6: सत्यापित करें कि यह चल रहा है

Deploy होने के बाद, आपको यह दिखाई देगा:

-> **Services** tab: status के साथ आपकी *zebra* service दिखाता है

-> **Logs** tab: live container logs

-> **Leases** tab: आपके deployment का विवरण (DSEQ, provider, cost)


##### Logs जाँचें

**Logs** पर क्लिक करें और आपको Zebra शुरू होता हुआ दिखना चाहिए:

```bash
Loading config from environment variables
Mainnet network selected
Listening for peer connections on [::]:8233
Starting initial sync...
```

Sync होने में network के आधार पर **कई घंटे से कई दिन** लग सकते हैं। इन बातों पर नज़र रखें:

-> block heights बढ़ रही हों

-> peer connections (10-30 peers होने चाहिए)

-> बार-बार errors न आ रही हों


#### चरण 7: अपने Node का Address प्राप्त करें

**Leases** tab पर क्लिक करें, फिर **URIs** पर।

आपको कुछ ऐसा दिखेगा:

```bash
zebra-8233: provider-hostname.com:31234
```

यह आपके node का **public P2P endpoint** है। अन्य Zcash nodes आपसे इसी address पर connect करेंगे।

**Port mapping पर ध्यान दें:** आपने SDL में port 8233 configure किया था, लेकिन Akash ने इसे किसी अलग public port पर assign किया है (इस उदाहरण में 31234)। यह सामान्य है - यदि यह भ्रमित कर रहा हो तो ऊपर दिया गया "Port Mapping on Akash" section देखें। आपका node उसी port पर accessible है जो Akash यहाँ दिखाता है, ज़रूरी नहीं कि वह 8233 ही हो।

यदि आपने RPC enable किया है (SDL में default रूप से commented out), तो उसका RPC endpoint भी यहाँ अपने mapped port के साथ दिखाई देगा।

### Configuration विकल्प

#### Testnet पर स्विच करना

SDL default रूप से Mainnet पर सेट है। इसके बजाय Testnet उपयोग करने के लिए:

-> *env* section में **Mainnet config को comment out करें**:

   ```yaml
   # - "ZEBRA_NETWORK__NETWORK=Mainnet"
   # - "ZEBRA_NETWORK__LISTEN_ADDR=[::]:8233"
   ```

-> **Testnet config को uncomment करें**:

   ```yaml
   - "ZEBRA_NETWORK__NETWORK=Testnet"
   - "ZEBRA_NETWORK__LISTEN_ADDR=[::]:18233"
   ```

-> *expose* section में **exposed port को update करें**:

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

-> **वैकल्पिक: Testnet के लिए resources घटाएँ** *profiles.compute.zebra.resources* में:

   ```yaml
   cpu:
     units: 2  # Down from 4
   memory:
     size: 8Gi  # Down from 16Gi
   storage:
     - size: 50Gi  # Down from 150Gi
   ```

-> **वैकल्पिक: pricing कम करें** *profiles.placement.akash.pricing* में:

   ```yaml
   amount: 5000  # Down from 10000
   ```

#### RPC Access enable करें

सुरक्षा कारणों से RPC default रूप से disabled है। इसे enable करने के लिए:

**Mainnet के लिए:**

-> *env* section में uncomment करें:

   ```yaml
   - "ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:8232"
   - "ZEBRA_RPC__COOKIE_DIR=/home/zebra/.cache/zebra"
   ```

-> *expose* में Mainnet RPC port को uncomment करें:

   ```yaml
   - port: 8232
     as: 8232
     to:
       - global: false  # Keep internal for security
     proto: tcp
   ```

**Testnet के लिए:**

-> *env* section में uncomment करें:

   ```yaml
   - "ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:18232"
   - "ZEBRA_RPC__COOKIE_DIR=/home/zebra/.cache/zebra"
   ```

-> *expose* में Testnet RPC port को uncomment करें:

   ```yaml
   - port: 18232
     as: 18232
     to:
       - global: false
     proto: tcp
   ```

**चेतावनी**: यदि आप RPC के लिए *global: true* सेट करते हैं, तो आप उसे internet पर expose कर रहे हैं। Zebra default रूप से cookie auth का उपयोग करता है, लेकिन फिर भी - जब तक आप पूरी तरह नहीं जानते कि आप क्या कर रहे हैं, ऐसा न करें।

**Port mapping reminder**: भले ही आप RPC को globally expose करें, Akash उसे एक random high port पर map करेगा (8232/18232 पर नहीं)। वास्तविक public endpoint देखने के लिए अपने deployment में URIs देखें। *global: false* (अनुशंसित) के लिए, RPC endpoint केवल Akash deployment network के भीतर accessible होता है, public internet से नहीं।

#### Metrics enable करें (Prometheus)

Monitoring के लिए metrics scrape करने हेतु:

-> *env* में uncomment करें:

   ```yaml
   - "ZEBRA_METRICS__ENDPOINT_ADDR=0.0.0.0:9999"
   ```

-> *expose* में metrics port को uncomment करें:

   ```yaml
   - port: 9999
     as: 9999
     to:
       - global: false
     proto: tcp
   ```

#### Resources/Pricing समायोजित करें

यदि आपको bids नहीं मिल रही हैं या आप cost optimize करना चाहते हैं:

**कम-spec providers के लिए**, *profiles.compute.zebra.resources* section में घटाएँ:

-> CPU: *units: 2* (उचित sync speed के लिए न्यूनतम)

-> Memory: *size: 12Gi* (स्थिरता के लिए न्यूनतम)

-> Storage: *size: 120Gi* (mainnet के लिए न्यूनतम)

**अधिक bids आकर्षित करने के लिए**, *profiles.placement.akash.pricing* में बढ़ाएँ:

-> Mainnet: *amount: 1000000* uakt/block आज़माएँ

-> Testnet: *amount: 1000000* uakt/block आज़माएँ

### अपना Deployment अपडेट करना

Deploy करने के बाद configuration बदलनी है?

-> Console में **My Deployments** पर जाएँ

-> अपना Zebra deployment खोजें

-> **"Update Deployment"** पर क्लिक करें

-> SDL edit करें

-> **"Update"** पर क्लिक करें और Keplr में approve करें

**नोट**: Update करने पर आपका container restart होगा। Node अपनी saved state (persistent storage) से फिर शुरू होगा, लेकिन 1-2 मिनट के downtime की अपेक्षा रखें।

### Monitoring

#### Console के माध्यम से

-> **Logs tab**: live container logs

-> **Shell tab**: container के अंदर shell प्राप्त करें (debugging के लिए उपयोगी)

-> **Events tab**: Kubernetes events (ज़्यादातर बेकार, जब तक कुछ टूटा न हो)


#### RPC के माध्यम से (यदि enabled हो)

यदि आपने RPC enable किया है, तो आप अपने node को एक सामान्य zebrad full node की तरह query कर सकते हैं (क्योंकि वह वही है!)

### अपना Deployment बंद करना

जब आपका काम पूरा हो जाए या आप भुगतान रोकना चाहें:

-> **My Deployments** पर जाएँ

-> अपना Zebra deployment खोजें

-> **"Close Deployment"** पर क्लिक करें

-> पुष्टि करें और Keplr में sign करें

आपका 5 AKT deposit refund हो जाएगा। **Persistent storage** provider द्वारा सुरक्षित रखी जानी चाहिए, लेकिन इस पर निर्भर न रहें - इसे किसी भी अन्य cloud provider की तरह ही मानें।

### Troubleshooting

#### "Insufficient funds" error

आपको अधिक AKT की आवश्यकता है। अपने Keplr wallet में funds जोड़ें।

#### कोई bids दिखाई नहीं दे रहीं

या तो:

-> आपकी pricing बहुत कम है (SDL में *amount* बढ़ाएँ)

-> आपकी resource requirements उपलब्ध providers के लिए बहुत अधिक हैं (CPU/memory/storage घटाएँ)

-> थोड़ा और इंतज़ार करें (कभी-कभी bids आने में 60-90 सेकंड लगते हैं)


#### Deployment "pending" में अटका हुआ है

हो सकता है provider को समस्या हो। Deployment बंद करें और कोई दूसरा provider आज़माएँ।

#### Zebra logs में "No peers connected" दिखता है

पहले कुछ मिनटों के लिए यह सामान्य है। Zebra अपने-आप peers खोज लेगा। यदि 10+ मिनट बाद भी ऐसा ही रहे, तो शायद network issue हो सकता है (हालाँकि Akash पर इसकी संभावना कम है)।

#### Logs में "Out of memory" errors

आपने RAM पर बहुत कटौती कर दी। Deployment बंद करें और कम से कम 12Gi memory (16Gi अनुशंसित) के साथ फिर deploy करें।

#### Sync में बहुत ज़्यादा समय लग रहा है

"बहुत ज़्यादा" से आपका क्या मतलब है:

-> **Hours**: सामान्य

-> **Days**: scratch से mainnet के लिए यह भी सामान्य है

-> **Weeks**: कुछ गड़बड़ है, errors के लिए logs जाँचें


### Cost Management

Console में अपना खर्च monitor करें:

-> **My Deployments** -> आपका deployment -> "Cost per month" estimate दिखाता है

-> समय के साथ आपके Keplr wallet का balance कम होता जाएगा


जब आपका balance कम हो जाएगा, Akash अपने-आप आपका deployment बंद कर देगा। **समय-समय पर अपने wallet में top up करें** या alerts सेट करें।

#### Costs कम करना

-> non-production testing के लिए **Testnet उपयोग करें** (50% सस्ता)

-> यदि तेज sync की आवश्यकता नहीं है तो **CPU/memory कम करें**

-> **सस्ते providers चुनें** (हमेशा समझदारी नहीं - uptime महत्वपूर्ण है)


### Mainnet बनाम Testnet

```markdown
----------------------------------------------------------------------------------
|            | Mainnet (default)               | Testnet                         |
---------------------------------------------------------------------------------|
| Purpose   | Production Zcash blockchain      | Testing and development         |
| Network   | ZEBRA_NETWORK__NETWORK=Mainnet   | ZEBRA_NETWORK__NETWORK=Testnet  |
| P2P Port  | 8233                             | 18233                           |
| RPC Port  | 8232                             | 18232                           |
| Sync time | Days                             | Hours                           |
| Storage   | 350GB+                           | 50GB                            |
| Resources | 4 CPU / 16GB RAM                 | 2 CPU / 8GB RAM                 |
| Cost      | ~$15/month                       | ~$5/month                       |
----------------------------------------------------------------------------------
```

यदि आप केवल deployment process का परीक्षण कर रहे हैं, तो Testnet से शुरू करें। Configuration के लिए ऊपर दिया गया "Switching to Testnet" section देखें।

### अतिरिक्त संसाधन

**Akash Console**: [https://console.akash.network](https://console.akash.network)

**Akash Docs**: [https://akash.network/docs/](https://akash.network/docs/)

**Zebra Docs**: [https://zebra.zfnd.org/](https://zebra.zfnd.org/)

**Zcash Explorers**: [https://zechub.wiki/using-zcash/blockchain-explorers](https://zechub.wiki/using-zcash/blockchain-explorers)

**Akash Discord**: [https://discord.akash.network](https://discord.akash.network) (provider issues के लिए)
