<a href="https://github.com/zechub/zechub/edit/main/site/guides/Raspberry_Pi_4_Full_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="पेज संपादित करें"/>
</a>


# Raspberry Pi 4: एक *zcashd* Full node गाइड 


इस गाइड का उद्देश्य उन Zcash उपयोगकर्ताओं को शिक्षित करने में मदद करना है जो कम-शक्ति वाले Raspberry Pi 4 पर एक full node चलाने में रुचि रखते हैं।

<img src="https://user-images.githubusercontent.com/81990132/197372541-dcd886ab-a3d0-4614-b490-0294ddf3ffae.png" alt="zcashd" width="700" height="700"/>


## वीडियो

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/SGYrzhs1l2k"
    title="Raspberry Pi पर Zcash Node कैसे compile करें!"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

## सहयोग

यदि आपको यह गाइड उपयोगी लगे, तो ZecHub का समर्थन करने के लिए ZEC दान करने पर विचार करें:

`u1rl2zw85dmjc8m4dmqvtstcyvdjn23n0ad53u5533c97affg9jq208du0vf787vfx4vkd6cd0ma4pxkkuc6xe6ue4dlgjvn9dhzacgk9peejwxdn0ksw3v3yf0dy47znruqftfqgf6xpuelle29g2qxquudxsnnen3dvdx8az6w3tggalc4pla3n4jcs8vf4h29ach3zd8enxulush89`


## आप क्या सीखेंगे

```markdown
* एक bootable Ubuntu Server microSD card कैसे बनाएं
* Raspberry Pi 4 पर internet connectivity कैसे सेटअप करें
* अपने Raspberry Pi 4 को remotely कैसे access करें
* zcashd कैसे install करें
* zcashd कैसे setup करें
* zcashd का उपयोग कैसे करें
```


## पूर्वापेक्षाएँ

> [8GB Raspberry Pi 4 Canakit](https://www.canakit.com/raspberry-pi-4-starter-max-kit.html) या समकक्ष

> एक कंप्यूटर जिसमें microSD card drive हो

> एक Wi-Fi network या internet connection के साथ एक ethernet cable

> USB3 support वाला External SSD/HHD


##### नोट: अपने server को सुरक्षित रखना किसी भी तरह से *सरल* नहीं है। इस गाइड में जिन बातों पर चर्चा की गई है, उनसे आगे के किसी भी tips/recommendations/best practices के लिए *कृपया* एक PR बनाएं और इस गाइड को यथासंभव अद्यतन बनाए रखने में मदद करें।



### SD Card तैयार करें

इस चरण में आप एक *bootable* SD card बनाएंगे जिससे आपका Raspberry Pi 4 boot कर सकेगा। microSD card को अपने कंप्यूटर में डालें। आपको Canakit के साथ आने वाले adapter या किसी अन्य समकक्ष adaptor का उपयोग करना पड़ सकता है। अपने operating system के लिए Raspberry Pi Imager install करें। उस OS के लिए version डाउनलोड करें जिसका उपयोग आप वर्तमान में कर रहे हैं।
     
     > [Ubuntu](https://downloads.raspberrypi.org/imager/imager_latest_amd64.deb)
     
     > [Windows](https://downloads.raspberrypi.org/imager/imager_latest.exe)
     
     > [macOS](https://downloads.raspberrypi.org/imager/imager_latest.dmg)

उदाहरण के लिए, Linux में डाउनलोड करने के बाद आप निम्नलिखित टाइप करेंगे:

`sudo dpkg -i imager_latest_amd64.deb`

Raspberry Pi Imager खोलें

`rpi-imager`

<img src="https://user-images.githubusercontent.com/81990132/197372069-fb9f7417-d320-42cf-ad65-38d630512985.png" alt="rpi imager" width="400" height="400"/>

OS और Storage Device चुनें। चूँकि Raspberry Pi 4 64 bit हैं, मैं "Other general-purpose OS" => Ubuntu => Ubuntu Server 24.04.3 LTS (64 bit) चुनने की सलाह देता हूँ। Storage पर क्लिक करें और अपना SD Card चुनें। SD card पर लिखने से पहले, नीचे दाईं ओर सफेद gear icon पर क्लिक करके Advanced options खोलें।


<img src="https://user-images.githubusercontent.com/81990132/197372159-1169c6f4-f6aa-4f44-9679-fe7aa542bbd3.png" alt="gear" width="200" height="200"/>



यहाँ आप अपडेट कर सकते हैं:

```markdown
* अपने Raspberry Pi 4 का Hostname
* SSH enable करें
* एक username और pw बनाएं
* यदि आवश्यक हो तो अपना wi-fi enable और configure करें
```
 
<img src="https://user-images.githubusercontent.com/81990132/197372149-8b85bfac-e473-4808-87cd-f27f15d05de8.png" alt="advanced" width="400" height="400"/>

 
पूर्ण होने पर Write दबाएँ


### Ubuntu Server boot करें

यदि आपके पास अतिरिक्त monitor और keyboard है तो उन्हें अभी plug in करें। नोट: ये वैकल्पिक हैं। जिस SD card को आपने अभी format किया है उसे Raspberry Pi 4 में लगाएँ और External SSD/HHD को USB3 port में भी plug in करें। power cord भी लगाएँ और इसे चालू करें।

### अपने Raspberry Pi 4 से remotely कनेक्ट करें

अब हमें आपके Raspberry Pi 4 से connect करना है। जिन चीज़ों की हमें आवश्यकता है:

```markdown
* Username और pw (पिछले चरण से)
* IP address ताकि हम SSH का उपयोग कर सकें
* Monitor, और keyboard (वैकल्पिक)
* यदि आपके pi से monitor और keyboard सीधे जुड़े हैं, तो इस section के बाकी हिस्से को छोड़ा जा सकता है।
```

अपना IP address खोजने के दो तरीके हैं: अपने router admin page के माध्यम से, या nmap से। यदि आप router का उपयोग कर रहे हैं, तो यह उसके निर्माता पर निर्भर करता है और मैं उन विवरणों के लिए एक त्वरित Google search का सुझाव दूँगा। nmap के लिए, पहले सुनिश्चित करें कि यह install है:

     `sudo apt-get install nmap`
     
अपने वर्तमान कंप्यूटर का IP address खोजें और उसके पहले तीन sections नोट करें। यह आमतौर पर 192.168.1.xxx या 192.168.50.xxx होता है। इन विवरणों को nmap में इस प्रकार डालें:
          
`sudo nmap -sn 192.168.50.0/24`

या

`sudo nmap -sn 192.168.1.0/24`

यह आपके home network से जुड़े सभी devices दिखाएगा, जिससे आपके Raspberry Pi 4 का IP address / MAC address पता चल जाना चाहिए। अपने username, pw, और IP address का उपयोग करके अब हम SSH से login कर सकते हैं

```markdown
* ssh <username>@<ip address of your pi> नोट: आपको *अपना* username, *अपना* IP address, और prompt होने पर *अपना* pw भरना होगा।
* उदाहरण के लिए: `ssh ubuntu@192.168.1.25 where the username is *ubuntu* and IP address is 192.168.1.25.
```


  <img src="https://user-images.githubusercontent.com/81990132/197372846-e1279388-eaaa-4fbb-8d5d-f9928cb45195.png" alt="sshLogin" width="400" height="400"/>
       

यदि आप जानना चाहते हैं कि आप Raspberry Pi का कौन-सा version उपयोग कर रहे हैं, तो यह command आज़माएँ:

     `cat /sys/firmware/devicetree/base/model ; echo`

  <img src="https://user-images.githubusercontent.com/81990132/197689888-367c8eb3-2667-4c8c-85b3-44d46afe07a7.png" alt="which" width="700" height="400"/>

         

### *zcashd* install करना

zcashd install करने के दो तरीके हैं: precompiled binary डाउनलोड करना या zcashd को source से compile करना। मैं *ज़ोरदार* रूप से source से compile करने की सिफारिश करता हूँ। स्वयं compile करने के लिए cross-compile करना अत्यधिक अनुशंसित है। Cross-compile का अर्थ है एक platform पर ऐसा binary बनाना जो दूसरे platform पर चले। इसका एक कारण यह है कि Raspberry Pi 4 कम-शक्ति वाले होते हैं और इसलिए बहुत तेज़ नहीं होते! इसमें सहायता के लिए अपने मुख्य कंप्यूटर का उपयोग करें। आप नवीनतम release [यहाँ](https://github.com/zcash/zcash/releases) से ले सकते हैं। Cross compile करने के लिए हमें यह सुनिश्चित करना होगा कि हमारे पास आवश्यक packages हों। निम्नलिखित install करें:

```bash
sudo apt-get install build-essential pkg-config libc6-dev m4 g++-multilib autoconf libtool ncurses-dev unzip git python3 python3-zmq zlib1g-dev curl bsdmainutils automake libtinfo5
sudo apt-get install gcc-aarch64-linux-gnu
```

इसके बाद अभी-अभी डाउनलोड की गई zcashd release directory में जाएँ और चलाएँ:

`HOST=aarch64-linux-gnu ./zcutil/build.sh`
          

### *zcashd* setup करें

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/9t2LX3HFldw"
    title="Zcashd Wallet Tool - Private Key Generate और Import करें"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

---

अब हमें सभी zcashd binary files को आपके Raspberry Pi 4 में transfer करना है। Zcashd v5.3 के अनुसार आवश्यक files में शामिल हैं:

```markdown
zcashd
zcash-cli
zcash-tx
zcash-gtest
zcash-inspect
zcashd-wallet-tool
fetch-params.sh
```

यदि आपने इन्हें स्वयं compile किया है, तो ये files आपकी नवीनतम release download location की /src directory में मिलेंगी। अन्यथा, precompiled files वहीं होंगी जहाँ आपने उन्हें डाउनलोड किया है। transfers करने के दो तरीके हैं: SFTP का उपयोग करके, या अपने External drive का उपयोग करके।

#### SFTP

```bash
sftp username@<ip of RaspberryPi4>
put zcash*
```
   
#### External Copy
     
Files को Raspberry Pi 4 में plug करने से पहले बस External पर copy कर दें। यदि आपके पास पहले से synced full node है और आप समय बचाना चाहते हैं, तो आप blocks और chainstate data भी copy कर सकते हैं।
   
` cd ~/.zcash/`
     
बस चलाएँ:

```bash
tar -zcvf blocks.tar.gz /blocks
tar -zcvf chainstate.tar.gz /chainstate
```
     
blocks और chainstate .gz files को अपने External SSD/HHD में copy करें। इसके बाद External SSD/HDD को Media folder में mount करें ताकि आप उसे देख सकें:

```markdown
lsblk सभी connected drives दिखाएगा। इनमें से अधिकांश का format sda होगा
id आपका user और group id दिखाएगा।
```
          
<img src="https://user-images.githubusercontent.com/81990132/197372643-abef88fd-9177-4bf9-abda-3c221188cd10.png" alt="lsblk" width="400" height="400"/>


          
          `sudo mount -o umask=0077,gid=<groupid>,uid=<userid> /dev/sda1 /media/portableHD/`
          
यह भी ध्यान रखें कि folders/files का owner कौन है और permissions क्या हैं।

```bash
sudo chown -R <username>: portableHD
sudo chmod -R 600 portableHD/
```
     
यदि आपने blocks और chainstate .gz files अपने दूसरे कंप्यूटर से copy की हैं, तो अब उन्हें untar करें। सुनिश्चित करें कि वे आपके External drive की .zcash folder में हों।

```bash
tar - xvzf blocks.tar.gz
tar - xvzf chainstate.tar.gz
```


/media/portableHD/.zcash/zcash.conf setup करें

<img src="https://user-images.githubusercontent.com/81990132/197373699-18cc2c9f-b47d-44e9-9e6b-4c5cccf78d9e.png" alt="zconf" width="700" height="400"/>


 
ध्यान दें कि हमने datadir को External SSD/HDD पर स्थानांतरित कर दिया है जहाँ कहीं अधिक जगह उपलब्ध है। चूँकि default .zcash folder location बदल दी गई है, हमें symbolic links का उपयोग करके *zcashd* को यह बताना होगा:

```markdown
cp -rp ~/.zcash/* /new_dir         // datadir की copy बनाएँ या external HD में उपलब्ध कराएँ
rm -rf ~/.zcash                    // default folder हटाएँ
ln -s /media/portableHD/ ~/.zcash  // नई data location को default से symbolic link करें ताकि zcashd संतुष्ट रहे
```
   

zcashd के लिए आवश्यक data डाउनलोड करने हेतु fetch-params.sh script चलाएँ
   
    `./fetch-params.sh`


Linux में एक नया 'screen' [ program ] शुरू करें। zcashd को -datadir set करके खोलें:

```bash
screen -S zcashScreen`     
./zcashd -datadir=/media/portableHD/.zcash/
```
     
screen से detach करें:

`Ctrl+a , Ctrl+d`


एक alias बनाएँ ताकि आपको हर बार ये अतिरिक्त data location commands टाइप न करनी पड़ें

     `alias zcash-cli="./zcash-cli -datadir=/media/portableHD/.zcash/"`


उपयोग के लिए तैयार!

    `zcash-cli getblockchaininfo`

  <img src="https://user-images.githubusercontent.com/81990132/197373098-672aa228-d180-47ea-8a7c-c58dc3882426.png" alt="getblockchaininfo" width="400" height="400"/>



### *zcashd* का उपयोग

<iframe class="w-full h-auto md:h-96" src="https://www.youtube.com/embed/KNhd1KC0Bqk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

---

आप अपने node की स्थिति कैसे जाँचते हैं?

     `tail -n 500 <path to>/.zcash/debug.log`

  <img src="https://user-images.githubusercontent.com/81990132/197684416-9a083de4-4a62-4fe8-9cab-798781b38cd2.png" alt="status" width="700" height="400"/>


  
     
अपने log से current height प्राप्त करने के लिए

     `tail -n 10 <path to>/.zcash/debug.log | grep -o  'height=[^b]*'`

  <img src="https://user-images.githubusercontent.com/81990132/199630447-6a6cd491-0cb3-47f8-95f0-45f6b6555870.png" alt="logHeight" width="500" height="400"/>


     
     `zcash-cli getinfo`
  
<img src="https://user-images.githubusercontent.com/81990132/199646508-132da0eb-899e-49a6-8b31-e9011e159700.png" alt="getInfo" width="400" height="400"/>

     
     
आप memo कैसे भेजते हैं? जैसा [यहाँ](https://zcash.readthedocs.io/en/latest/rtd_pages/memos.html) दिखाया गया है, *ascii2hex* और *hex2ascii* डाउनलोड करें और उन्हें executable बनाएँ 

`chmod +x ascii2hex hex2ascii`
          
एक memo बनाएँ और उसे hex में convert करें। जाँच के लिए आप उसे वापस ascii में convert कर सकते हैं।
          
<img src="https://user-images.githubusercontent.com/81990132/199646812-782142d6-8846-443a-8dd9-4f332e49d3e9.png" alt="asciiGOOD" width="400" height="400"/>


  
ऊपर वाले अपने memo के hex version का उपयोग करके एक z2z transaction (Sapling) बनाएँ

`zcash-cli z_sendmany "ztestsapling1kg3u0y7szv6509732at34alct46cyn0g26kppgf2a7h5tpqxldtwm7cmhf8rqmhgt" "[{\"address\": \"ztestsapling2kg3u0y7szv6509732at34alct46cyn0g26kppgf2a7h5tpqxldtwm7cmhf8rqmhgtmpakcz5mdv\",\"amount\": 0.0001, \"memo\":\"5A656348756221\"}]"`

आप detach करने के बाद अपने zcashScreen को फिर से कैसे resume करते हैं?

`screen -r zcashScreen`
     
आप *zcashd* को कैसे रोकते हैं?

`zcash-cli stop`
     
आप एक UA कैसे बनाते हैं?

`zcash-cli z_getnewaccount`
     
  <img src="https://user-images.githubusercontent.com/81990132/202352436-04c17be2-e914-4b9b-95d1-00cf6fc496d3.png" alt="newAccount" width="400" height="400"/>

    
अब *अपनी आवश्यकताओं* के अनुसार एक UA receiver बनाएँ। इसमें केवल Orchard, Orchard + Sapling, और अंत में Orchard + Sapling + Transparent शामिल हैं। ध्यान दें कि receivers के बीच अंतर उनकी लंबाई से पहचाना जा सकता है।
     
<img src="https://user-images.githubusercontent.com/81990132/202354319-2da6be33-ca95-4b6b-b29c-14805dcb9c21.png" alt="chars" width="200" height="100"/>


`zcash-cli z_getaddressforaccount 0 '["orchard"]'`
     
<img src="https://user-images.githubusercontent.com/81990132/202353642-c36b5fea-de8a-41f6-a27c-d9ff42a0c8d3.png" alt="uaOrchard" width="400" height="400"/>

<img src="https://user-images.githubusercontent.com/81990132/202355586-eaeb36e7-b000-4b99-8192-81e5002e6f11.png" alt="OrchQR" width="400" height="400"/>

`zcash-cli z_getaddressforaccount 0 '["orchard","sapling"]'`
     
<img src="https://user-images.githubusercontent.com/81990132/202353732-740828e3-77b8-4684-8cf8-fb14256b1e61.png" alt="uaOrchardSapling" width="400" height="400"/>
<img src="https://user-images.githubusercontent.com/81990132/202355596-c7b62854-9a9e-4627-ab5d-51091340de71.png" alt="OrchSapQR" width="300" height="200"/>


`zcash-cli z_getaddressforaccount 0 '["orchard","sapling","p2pkh"]'`
     
<img src="https://user-images.githubusercontent.com/81990132/202353793-3331c593-5286-4b84-93a7-adc4928839fd.png" alt="uaFull" width="400" height="400"/>
<img src="https://user-images.githubusercontent.com/81990132/202355607-75de0750-2a57-4e10-883b-e0a626ed892a.png" alt="FullQR" width="400" height="400"/>


आप UA का उपयोग करके ZEC कैसे भेजते हैं?

`zcash-cli z_sendmany "fromOaddress" "[{\"address\": \"dOrchardAddress\",\"amount\": 0.0001, \"memo\":\"yourMemoinHex\"}]" <minconf> <fee> <privacyPolicy>`

<img src="https://user-images.githubusercontent.com/81990132/202365280-c184f622-eb7e-4095-bc38-90795121c43c.png" alt="UAsuccess" width="400" height="400"/>
<img src="https://user-images.githubusercontent.com/81990132/202366758-40650460-aaeb-4e03-891f-b4bd08e18234.png" alt="pic" width="400" height="400"/>

    
##### यह ध्यान देने योग्य है कि *from* और *destination* दोनों addresses transparent, sapling, या orchard addresses हो सकते हैं, हालांकि transaction को valid बनाने के लिए आपको privacyPolicy flag समायोजित करना पड़ सकता है। (यदि privacyPolicy उपयुक्त नहीं है तो कुछ combinations काम नहीं करेंगे!)


मुझे UA के बारे में और जानकारी कहाँ मिल सकती है?

> transaction privacy पर [Hanh की](https://medium.com/@hanh425/transaction-privacy-78f80f9f175e) post देखें। साथ ही zcash forum की [यह](https://forum.zcashcommunity.com/t/unified-addresses-full-node-rpc-api/41980/2) post भी।

> [यह](https://github.com/zcash/zips/issues/470)

     
### स्रोत

<div>

- https://ubuntu.com/tutorials/how-to-install-ubuntu-on-your-raspberry-pi#1-overview
- https://github.com/zcash/zcash
- https://zcash.readthedocs.io/en/latest/rtd_pages/Debian-Ubuntu-build.html
- https://zcash.readthedocs.io/en/latest/rtd_pages/memos.html
- https://en.wikipedia.org/wiki/Secure_Shell
- https://itsfoss.com/how-to-find-what-devices-are-connected-to-network-in-ubuntu/
- https://youtu.be/YS5Zh7KExvE
- https://twitter.com/BostonZcash/status/1531798627512877059
- https://forum.zcashcommunity.com/t/unified-addresses-full-node-rpc-api/41980/2
- https://medium.com/@hanh425/transaction-privacy-78f80f9f175e
- https://znewsletter.netlify.app/
- https://github.com/zcash/zips/issues/470
- https://zips.z.cash/protocol/nu5.pdf#unifiedpaymentaddrencoding

</div>
