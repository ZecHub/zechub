# Zcash Testnet

## Zcash Testnet क्या है?

**Zcash Testnet** वास्तविक Zcash main network (Mainnet) के समानांतर चलने वाली एक blockchain है, जो बिल्कुल वही protocol, नियम और transaction logic दोहराती है - लेकिन दो मुख्य अंतर के साथ:

1. **Coins का कोई वास्तविक मौद्रिक मूल्य नहीं होता** - इन्हें **TAZ** कहा जाता है, ZEC नहीं, और इनका उपयोग केवल testing के लिए किया जाता है।  
2. **वास्तविक Zcash blockchain पर deployment से पहले network upgrades, tools, और software की testing यहीं पहले की जाती है।**  

दूसरे शब्दों में, Testnet एक **sandbox या experimental environment** की तरह है, जहाँ developers, auditors, और builders वास्तविक धन को जोखिम में डाले बिना विचारों को आज़मा सकते हैं।


## Testnet क्यों मौजूद है?

Testnet blockchain development के लिए अत्यंत महत्वपूर्ण है क्योंकि **Zcash जैसी वास्तविक blockchains immutable होती हैं** - एक बार main network पर transactions confirm हो जाएँ, तो उन्हें वापस नहीं किया जा सकता। Testnet, Mainnet पर deploy करने से पहले प्रयोग, testing, और debugging के लिए एक **सुरक्षित replica** प्रदान करता है।

### Testnet के उपयोग

#### 1. Software Development & Integration

जो developers wallets, exchanges, mining software, या privacy tools बना रहे होते हैं, वे उन्हें Testnet पर सुरक्षित रूप से test कर सकते हैं। क्षमताओं में शामिल हैं:

- Transactions भेजना और प्राप्त करना  
- zero-value TAZ coins के साथ नए blocks mine करना  
- User interfaces और APIs बनाना  
- Transaction privacy features (transparent बनाम shielded) की testing करना  

**उदाहरण:**  
[`zcash_tx_tool`](https://github.com/QED-it/zcash_tx_tool) जैसे tools, transactions generate करने और Zcash shielded asset functionalities की testing के लिए Testnet का उपयोग करते हैं।  

**वास्तविक परिदृश्य:**  
एक wallet developer software को Testnet RPC endpoint से connect कर सकता है और पूरा lifecycle simulate कर सकता है - addresses बनाना, shielded transactions भेजना, और balances validate करना - Mainnet पर live जाने से पहले।

#### 2. Network Upgrades की Testing

Zcash समय-समय पर अपने core protocol को upgrade करता है (जैसे Nu5, Nu6)। Testnet पर नए upgrades **Mainnet से पहले** activate किए जाते हैं, जिससे developers और community bugs की पहचान कर उन्हें ठीक कर सकें।

**उदाहरण:**  
किसी नए consensus rule या transaction type को पहले Testnet पर भेजा जाता है। सफल testing के बाद, यह Mainnet पर पूर्वनिर्धारित block height पर activate होता है।

#### 3. Node Implementations की Testing

Zcash कई node software implementations को support करता है - `zcashd` और **Zebra** (Rust-based node जिसे Zcash Foundation बनाए रखता है)। Testnet आर्थिक जोखिम के बिना वास्तविक परिस्थितियों में nodes की testing को संभव बनाता है।  

Node developers यह कर सकते हैं:

- Block propagation को validate करना  
- RPC interfaces की testing करना  
- Load के तहत node behavior का अवलोकन करना  
- Mining software interactions की testing करना  

#### 4. Learning & Education

शुरुआती उपयोगकर्ता mining, shielded transactions बनाना, और Unified Address का उपयोग करना जैसी Zcash features सीख सकते हैं।  
Community tutorials और documentation **Testnet faucets, explorers, और guides** तक पहुँच प्रदान करते हैं।


## Testnet के वास्तविक उपयोग के मामले

### 1. Developer Testing (Wallet / App)

- Zcash Testnet से connect करें  
- Faucet से TAZ प्राप्त करें  
- Shielded transactions भेजें  
- Privacy और UI stability सत्यापित करें  

गलतियाँ होने पर भी कोई वास्तविक ZEC नहीं खोता।

### 2. Exchange Integration Testing

- एक Testnet node चलाएँ  
- Transactions process करने के लिए Zebrad JSON-RPC endpoints का उपयोग करें  
- Automated deposit/withdrawal logic की testing करें  

यह production code को सुरक्षित बनाता है और वित्तीय नुकसान से बचाता है।

### 3. Mining Setup Trials

- Mining templates का उपयोग करें  
- Block validation की testing करें  
- Mining rewards का अवलोकन करें (केवल TAZ)  
- Mining performance को tune करें  

यह Mainnet पर जाने के समय downtime या कमाई के नुकसान से बचाता है।

### 4. Academic / Protocol Research

Researchers, Testnet का उपयोग करके **stateless verification**, **zero-knowledge proof optimization**, या अन्य protocol experiments जैसी innovations की testing कर सकते हैं।  
Advanced users विशेष प्रयोगों के लिए **custom Testnets या regtest environments** भी चला सकते हैं।


## Mainnet और Testnet के बीच मुख्य अंतर

| Feature               | Mainnet           | Testnet                  |
|-----------------------|-----------------|--------------------------|
| Coins का मूल्य        | वास्तविक ZEC     | TAZ (कोई मौद्रिक मूल्य नहीं) |
| जोखिम                  | वित्तीय जोखिम    | testing के लिए सुरक्षित   |
| Protocol upgrades     | Production       | प्रारंभिक activation     |
| Mining rewards        | वास्तविक issuance| केवल test reward         |
| Network utility       | Live transactions| testing और development   |

## सामान्य भ्रांतियाँ

- **Testnet coins की कुछ कीमत होती है** -> गलत, TAZ का मूल्य शून्य है।  
- **Testnet coins खोना मायने रखता है** -> गलत, कोई वास्तविक मूल्य नहीं खोता।  
- **Testnet और Mainnet एक जैसे हैं** -> गलत, Testnet अक्सर reset होता है और Mainnet की तरह आर्थिक रूप से सुरक्षित नहीं होता।

---

## TAZ क्या है?

**TAZ** Zcash coins का Testnet संस्करण है:  

- वास्तविक पैसा नहीं; इसे ZEC या fiat में exchange नहीं किया जा सकता  
- Testing, development, और learning के लिए उपयोग किया जाता है  
- सभी Zcash नियमों का पालन करता है: भेजा जा सकता है, mine किया जा सकता है, और shielded addresses में उपयोग किया जा सकता है  

**उदाहरण:**  
एक developer, wallet feature की testing के लिए बिना वास्तविक ZEC को जोखिम में डाले, एक Testnet address से दूसरे पर 100 TAZ भेज सकता है।  

TAZ को **Zcash Testnet के लिए "play money"** की तरह समझें।


## Faucets क्या हैं?

एक **faucet** ऐसी service है जो testing के लिए मुफ्त TAZ coins देती है:

- आमतौर पर websites या APIs  
- Users एक Testnet address देते हैं; faucet थोड़ी-सी TAZ भेज देता है  
- TAZ को manually mine करने की आवश्यकता से बचाता है  

**उदाहरण:**  
1. किसी Testnet faucet पर जाएँ (जैसे, [testnet.zecfaucet.com](https://testnet.zecfaucet.com) | [fauzec.com](https://fauzec.com/))  
2. अपना Testnet address दर्ज करें  
3. TAZ का अनुरोध करें  
4. Testing शुरू करने के लिए तुरंत TAZ प्राप्त करें  

**यह क्यों महत्वपूर्ण है:**  
- ZEC को जोखिम में डाले बिना सुरक्षित testing  
- शुरुआती उपयोगकर्ताओं और developers के लिए सुलभता  
- Wallets, exchanges, और apps के लिए तेज prototyping  



## Zkool और Zingo! Wallets

### Zkool

- उन्नत Zcash उपयोगकर्ताओं के लिए multi-account wallet  
- Seed phrases, viewing keys, transparent और shielded addresses को support करता है  
- Full nodes या lightwallet servers के माध्यम से Mainnet, Testnet, या Regtest से connect हो सकता है

### Zingo!

- Privacy और simplicity पर केंद्रित mobile wallet  
- Shielded और unified addresses को support करता है  
- Testnet protocols (जिसमें NU6 Testnet शामिल है) के support के लिए update किया गया

## Wallets में Testnet सक्षम करना

### Zkool Wallet

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/XCGwwqLZILg"
    title="Zkool Testnet"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

**सुझाव:**  
- Network बदलते समय wallet restart हो सकता है  
- Mainnet ZEC accounts अप्रभावित रहते हैं  
- यदि prompt मिले तो Testnet lightwallet server का उपयोग करें

### Zingo! Wallet

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/To7WAkiBldA"
    title="Zingo Testnet"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


एक बार सक्षम हो जाने पर, wallets TAZ भेज और प्राप्त कर सकते हैं, shielded transactions की testing कर सकते हैं, और सुरक्षित रूप से प्रयोग कर सकते हैं।


## Testnet सक्षम करने के बाद

- Transactions Mainnet की तरह काम करते हैं लेकिन **zero-value TAZ** के साथ  
- Shielded transactions, multiple addresses, और privacy features की testing की जा सकती है  
- Developers वास्तविक ZEC को जोखिम में डाले बिना features को debug और test कर सकते हैं


## त्वरित सारांश

- **Zcash Testnet** निर्माण, testing, और प्रयोग के लिए एक सुरक्षित sandbox environment है  
- उपयोग के मामले: developer testing, node testing, exchange integration, research, और education  
- ZEC के स्थान पर **TAZ coins** का उपयोग किया जाता है और उनका कोई वास्तविक मूल्य नहीं होता  
- Mainnet पर features को live deploy करने से पहले Testnet आवश्यक है
