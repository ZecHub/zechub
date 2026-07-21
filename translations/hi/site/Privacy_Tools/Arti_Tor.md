![Tor logo](https://gitlab.torproject.org/uploads/-/system/appearance/header_logo/1/purple.svg)

# **Arti: Rust में अगली पीढ़ी का Tor Client**
![Atri Logo](https://gitlab.torproject.org/uploads/-/system/project/avatar/647/sliced-onions.png)

**Arti** Tor Project की पहल है, जिसका उद्देश्य **Rust** programming language का उपयोग करके अगली पीढ़ी का **Tor** client बनाना है। Arti को modular, embeddable, और production-ready बनने के लिए डिज़ाइन किया गया है, ताकि **Tor** anonymity protocols का अधिक सुरक्षित और कुशल implementation प्रदान किया जा सके। **Arti version 1.4.0** के साथ, कई महत्वपूर्ण अपडेट पेश किए गए हैं:

- बेहतर interaction के लिए एक **new RPC interface**।
- **relay support** के लिए प्रारंभिक तैयारी।
- **service-side onion service denial-of-service resistance** में सुधार।

यह release Tor Project के उस प्रयास को आगे बढ़ाती है, जिसका लक्ष्य Tor उपयोगकर्ताओं और developers के लिए बेहतर security, performance, और modularity उपलब्ध कराना है।


---


## **Arti Client की Installation**

अपने system पर **Arti** को SOCKS proxy के रूप में install और run करने के लिए इन चरणों का पालन करें।

---

### **चरण 1: Rust Development Environment सेट अप करें**

Arti को source से build करने से पहले, आपके पास **Rust** का नवीनतम stable version install होना चाहिए।

#### Rust Install करने के लिए:

1. आधिकारिक [Rust website](https://www.rust-lang.org/) पर जाएँ।
2. अपने operating system के लिए installation instructions का पालन करें।
3. यह command चलाकर installation verify करें:
   
   ```sh
   rustc --version
   ```

यह पुष्टि करेगा कि आपके system पर Rust का नवीनतम stable version install है।

#### **Windows Users के लिए नोट**:
- Rust को Windows पर [**Rustup**](https://rustup.rs/) के माध्यम से install किया जा सकता है, जो एक toolchain installer है। यह भी सुनिश्चित करें कि आपने compatible build environment सेट किया है (Windows पर आपको **Visual Studio Build Tools** की आवश्यकता पड़ सकती है)।
  
---

### **चरण 2: Arti Repository Clone करें**

Arti client का नवीनतम version प्राप्त करने के लिए, आपको repository को [**GitLab**](https://gitlab.torproject.org/tpo/core/arti) से clone करना होगा।

#### चरण:
1. अपना terminal खोलें (Windows पर Command Prompt, PowerShell, या Git Bash)।
2. Repository clone करने के लिए निम्न command चलाएँ:
   
   ```sh
   git clone https://gitlab.torproject.org/tpo/core/arti.git
   ```
4. नई बनी हुई *arti* directory में जाएँ:
   
   ```sh
   cd arti
   ```

यह Arti का source code आपकी local machine पर pull कर देगा।

---

### **चरण 3: Arti Binary Build करें**

Repository clone करने के बाद, आपको **Cargo** का उपयोग करके Arti build करना होगा, जो Rust का package manager और build tool है।

#### Arti Build करने के लिए:
1. Terminal में निम्न command चलाएँ:
   ```sh
   cargo build --release
   ```

यह command Arti code को compile करती है और इसे production के लिए optimize करती है (*--release* flag)। Binary *target/release* directory में बनाई जाएगी।

#### Compiled Binary का स्थान:
- Build होने के बाद, Arti binary यहाँ मिलेगी:  
  ```sh
  target/release/arti
  ```

आप इस binary को सीधे terminal से run कर सकते हैं।

---

### **चरण 4: Arti SOCKS Proxy Run करें**

Arti को SOCKS proxy के रूप में उपयोग करने के लिए (जो आपके internet traffic को Tor network के माध्यम से route करेगा), आपको proxy शुरू करनी होगी।

#### SOCKS Proxy शुरू करने के लिए:
1. निम्न command चलाएँ:
   ```sh
   ./target/release/arti proxy -p 9150
   ```

यह command Arti को **port 9150** पर एक **SOCKS5 proxy** के रूप में शुरू करती है, जो SOCKS traffic के लिए Tor द्वारा उपयोग किया जाने वाला default port है।

---

### **चरण 5: Applications को Arti उपयोग करने के लिए Configure करें**

जब Arti SOCKS proxy के रूप में run हो रही हो, तब आपको अपने applications को इस तरह configure करना होगा कि वे traffic को Tor network के माध्यम से route करने के लिए इसका उपयोग करें।

#### चरण:
1. अपनी application settings में (उदाहरण के लिए web browser, terminal application), **proxy settings** खोजें।
2. **SOCKS5 proxy** को *localhost:9150* पर सेट करें।

इससे आपकी applications का सारा traffic **Tor network** के माध्यम से route होगा, जहाँ Arti intermediary के रूप में कार्य करेगी।

---

## **Tor Network के साथ Arti का Integration**

यहाँ एक सरल diagram है, जो दिखाता है कि Arti, Tor network के साथ मिलकर कैसे काम करती है:


```plaintext
[Application] --(SOCKS5)--> [Arti SOCKS Proxy] --(Tor Protocol)--> [Tor Network]
```

- **Application**, **SOCKS5** protocol का उपयोग करके **Arti SOCKS Proxy** से connect करती है।
- इसके बाद Arti **Tor network** से communicate करती है, जिससे यह सुनिश्चित होता है कि network से गुजरते समय आपका traffic anonymized रहे।

---

## **GitLab Repository और Contribution**

यदि आप **Arti** के development में योगदान देने में रुचि रखते हैं, तो आप code देख सकते हैं और **GitLab** के माध्यम से योगदान कर सकते हैं।

- **Repository Link**: [Arti GitLab Repository](https://gitlab.torproject.org/tpo/core/arti)
- **Repo Clone करें**:
  ```sh
  git clone https://gitlab.torproject.org/tpo/core/arti.git
  ```

### **Forking और Contribution**:
1. GitLab पर repository को **Fork** करें (इसके लिए GitLab account आवश्यक है)।
2. अपनी fork की हुई repository को अपने local setup से link करें:
   ```sh
   git remote add _name_ git@gitlab.torproject.org:_name_/arti.git
   git fetch _name_
   ```
   *_name_* को अपने GitLab username से बदलें।

3. अपने fork में **changes push** करें:
   ```sh
   git push _name_ main
   ```

4. GitLab पर एक **Merge Request (MR)** बनाएँ:
   अपने GitLab fork में Merge Request section पर जाएँ:
   ```plaintext
   https://gitlab.torproject.org/_name_/arti/-/merge_requests
   ```

### **Merge Request Guidelines**:
- Review के दौरान **commits को rebase और squash न करें**।
- यदि आवश्यक हो, तो commits के auto-squashing के लिए *fixup!* या *squash!* का उपयोग करें।
- Review cycle के दौरान squash करने के बजाय **new commits जोड़ने** का प्रयास करें।

---

### **अतिरिक्त नोट्स**:

- **Pre-built Binaries**: फिलहाल, **Arti** आधिकारिक pre-built binaries उपलब्ध नहीं कराता। आपको ऊपर बताए अनुसार client को source से build करना होगा।
- **Rust Knowledge**: यदि आप Arti में योगदान दे रहे हैं, तो ध्यान दें कि codebase अभी भी विकसित हो रहा है, और नई features जुड़ने पर इसमें changes या refactoring हो सकती है।

---



यदि आप project में योगदान देने में रुचि रखते हैं, तो निःसंकोच code देखें, repository fork करें, और एक Merge Request submit करें। अधिक जानकारी, updates, और troubleshooting के लिए [Arti GitLab Repository](https://gitlab.torproject.org/tpo/core/arti) देखें। 

**Arti** के साथ अपने अनुभव का आनंद लें और happy hacking!

---
