<a href="https://github.com/zechub/zechub/edit/main/site/guides/Raspberry_Pi_4_Full_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="تعديل الصفحة"/>
</a>


# Raspberry Pi 4: دليل عقدة كاملة *zcashd* 


الغرض من هذا الدليل هو المساعدة في تثقيف مستخدمي Zcash المهتمين بتشغيل عقدة كاملة على جهاز Raspberry Pi 4 منخفض الطاقة.

<img src="https://user-images.githubusercontent.com/81990132/197372541-dcd886ab-a3d0-4614-b490-0294ddf3ffae.png" alt="zcashd" width="700" height="700"/>


## فيديو

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/SGYrzhs1l2k"
    title="كيفية تجميع عقدة Zcash على Raspberry Pi!"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

## الدعم

إذا وجدت هذا الدليل مفيدًا، ففكّر في التبرع بـ ZEC لدعم ZecHub:

`u1rl2zw85dmjc8m4dmqvtstcyvdjn23n0ad53u5533c97affg9jq208du0vf787vfx4vkd6cd0ma4pxkkuc6xe6ue4dlgjvn9dhzacgk9peejwxdn0ksw3v3yf0dy47znruqftfqgf6xpuelle29g2qxquudxsnnen3dvdx8az6w3tggalc4pla3n4jcs8vf4h29ach3zd8enxulush89`


## ما الذي ستتعلمه

```markdown
* How to create a bootable Ubuntu Server microSD card
* How to setup internet connectivity on the Raspberry Pi 4
* How to access your Raspberry Pi 4 remotely
* How to install zcashd
* How to setup zcashd
* How to use zcashd
```


## المتطلبات المسبقة

> [مجموعة Canakit بسعة 8GB لـ Raspberry Pi 4](https://www.canakit.com/raspberry-pi-4-starter-max-kit.html) أو ما يعادلها

> جهاز كمبيوتر يحتوي على قارئ بطاقات microSD

> شبكة Wi‑Fi أو كابل إيثرنت مع اتصال بالإنترنت

> وحدة SSD/HHD خارجية مع دعم USB3


##### ملاحظة: الحفاظ على أمان خادمك ليس *أمرًا* بسيطًا بأي حال. أي نصائح/توصيات/أفضل ممارسات تتجاوز ما تم التحدث عنه في هذا الدليل، *يرجى* إنشاء PR والمساعدة في إبقاء هذا الدليل محدّثًا قدر الإمكان.



### إعداد بطاقة SD

في هذه الخطوة ستنشئ بطاقة SD *قابلة للإقلاع* تتيح لجهاز Raspberry Pi 4 الإقلاع. أدخل بطاقة microSD في جهاز الكمبيوتر الخاص بك. قد تحتاج إلى استخدام المحوّل الذي يأتي مع Canakit أو أي محوّل مكافئ آخر. ثبّت Raspberry Pi Imager لنظام التشغيل لديك. نزّل الإصدار الخاص بنظام التشغيل الذي يمكنك الوصول إليه حاليًا.
     
     > [Ubuntu](https://downloads.raspberrypi.org/imager/imager_latest_amd64.deb)
     
     > [Windows](https://downloads.raspberrypi.org/imager/imager_latest.exe)
     
     > [macOS](https://downloads.raspberrypi.org/imager/imager_latest.dmg)

على سبيل المثال، في linux يمكنك كتابة ما يلي بعد التنزيل:

`sudo dpkg -i imager_latest_amd64.deb`

افتح Raspberry Pi Imager

`rpi-imager`

<img src="https://user-images.githubusercontent.com/81990132/197372069-fb9f7417-d320-42cf-ad65-38d630512985.png" alt="برنامج rpi imager" width="400" height="400"/>

اختر نظام التشغيل وجهاز التخزين. بما أن أجهزة Raspberry Pi 4 تعمل بمعمارية 64 بت، أوصي باختيار "Other general-purpose OS" => Ubuntu => Ubuntu Server 24.04.3 LTS (64 bit). انقر على Storage واختر بطاقة SD الخاصة بك. قبل الكتابة على بطاقة SD، انقر على Advanced options بالنقر على أيقونة الترس البيضاء بالقرب من الزاوية السفلية اليمنى.


<img src="https://user-images.githubusercontent.com/81990132/197372159-1169c6f4-f6aa-4f44-9679-fe7aa542bbd3.png" alt="الترس" width="200" height="200"/>



هنا يمكنك تحديث:

```markdown
* Hostname of your Raspberry Pi 4
* Enable SSH
* Create a username and pw
* Enable and configure your wi-fi if needed
```
 
<img src="https://user-images.githubusercontent.com/81990132/197372149-8b85bfac-e473-4808-87cd-f27f15d05de8.png" alt="الخيارات المتقدمة" width="400" height="400"/>

 
بعد الانتهاء اضغط على Write


### إقلاع Ubuntu Server

إذا كان لديك شاشة ولوحة مفاتيح إضافيتان فقم بتوصيلهما الآن. ملاحظة: هذان اختياريان. ثبّت بطاقة SD التي قمت بتهيئتها للتو في Raspberry Pi 4، وقم أيضًا بتوصيل وحدة SSD/HHD الخارجية بمنفذ USB3. كذلك أوصل سلك الطاقة ثم شغّل الجهاز.

### الاتصال عن بُعد بجهاز Raspberry Pi 4

نحتاج الآن إلى الاتصال بجهاز Raspberry Pi 4 الخاص بك. الأشياء التي نحتاجها:

```markdown
* Username and pw (from previous step)
* IP address so we can use SSH
* Monitor, and keyboard (optional)
* If you have a monitor and keyboard connected directly to your pi, the rest of this section can be skipped.
```

هناك طريقتان لمعرفة عنوان IP الخاص بك: عبر صفحة إدارة الراوتر، أو باستخدام nmap. إذا كنت ستستخدم الراوتر، فهذا يعتمد على الشركة المصنّعة وسأترك هذه التفاصيل لبحث سريع على Google. أما بالنسبة إلى nmap، فتأكد أولًا من أنه مثبّت:

     `sudo apt-get install nmap`
     
اعثر على عنوان IP الخاص بجهاز الكمبيوتر الحالي وسجّل أول ثلاثة أقسام. يكون هذا عادةً 192.168.1.xxx أو 192.168.50.xxx. أدخل هذه التفاصيل في nmap كما يلي:
          
`sudo nmap -sn 192.168.50.0/24`

أو

`sudo nmap -sn 192.168.1.0/24`

سيعرض هذا جميع الأجهزة المتصلة بشبكتك المنزلية، مما ينبغي أن يكشف عنوان IP / عنوان MAC الخاص بجهاز Raspberry Pi 4. باستخدام اسم المستخدم وكلمة المرور وعنوان IP، يمكننا الآن تسجيل الدخول باستخدام SSH

```markdown
* ssh <username>@<ip address of your pi> note: you must plugin *your* username and *your* IP address, and *your* pw when prompted.
* For example: `ssh ubuntu@192.168.1.25 where the username is *ubuntu* and IP address is 192.168.1.25.
```


  <img src="https://user-images.githubusercontent.com/81990132/197372846-e1279388-eaaa-4fbb-8d5d-f9928cb45195.png" alt="تسجيل دخول ssh" width="400" height="400"/>
       

إذا كنت فضوليًا لمعرفة إصدار Raspberry Pi الذي تستخدمه، فجرّب هذا الأمر:

     `cat /sys/firmware/devicetree/base/model ; echo`

  <img src="https://user-images.githubusercontent.com/81990132/197689888-367c8eb3-2667-4c8c-85b3-44d46afe07a7.png" alt="أي إصدار" width="700" height="400"/>
### تثبيت *zcashd*

تتضمن طريقتان لتثبيت zcashd تنزيل ملف ثنائي مُجمّع مسبقًا أو تجميع zcashd من المصدر. أوصي *بشدة* بالتجميع من المصدر. وللتجميع بنفسك، يُوصى بشدة بالتجميع العابر. التجميع العابر هو بناء ملف ثنائي على منصة واحدة ليعمل على منصة أخرى. وأحد أسباب ذلك هو أن أجهزة Raspberry Pi 4 منخفضة القدرة وبالتالي ليست سريعة جدًا! استفد من حاسوبك الرئيسي للمساعدة في ذلك. يمكنك الحصول على أحدث إصدار من [هنا](https://github.com/zcash/zcash/releases). ولإجراء التجميع العابر نحتاج إلى التأكد من توفر الحزم المطلوبة. ثبّت ما يلي:

```bash
sudo apt-get install build-essential pkg-config libc6-dev m4 g++-multilib autoconf libtool ncurses-dev unzip git python3 python3-zmq zlib1g-dev curl bsdmainutils automake libtinfo5
sudo apt-get install gcc-aarch64-linux-gnu
```

بعد ذلك غيّر الدليل إلى إصدار zcashd الذي نزّلته حديثًا وشغّل:

`HOST=aarch64-linux-gnu ./zcutil/build.sh`
          

### إعداد *zcashd*

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/9t2LX3HFldw"
    title="أداة محفظة Zcashd - توليد المفتاح الخاص واستيراده"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

---

نحتاج الآن إلى نقل جميع ملفات zcashd الثنائية إلى جهاز Raspberry Pi 4 الخاص بك. اعتبارًا من Zcashd v5.3 تشمل الملفات المطلوبة ما يلي:

```markdown
zcashd
zcash-cli
zcash-tx
zcash-gtest
zcash-inspect
zcashd-wallet-tool
fetch-params.sh
```

توجد هذه الملفات في دليل /src ضمن موقع تنزيل أحدث إصدار لديك إذا قمت بتجميعها بنفسك. وإلا فإن الملفات المجمعة مسبقًا ستكون في المكان الذي قمت بتنزيلها إليه. هناك طريقتان لإنجاز عمليات النقل: إما باستخدام SFTP أو باستخدام وحدة التخزين الخارجية.

#### SFTP

```bash
sftp username@<ip of RaspberryPi4>
put zcash*
```
   
#### النسخ الخارجي
     
ما عليك سوى نسخ الملفات إلى وحدة التخزين الخارجية قبل توصيلها بجهاز Raspberry Pi 4. إذا كان لديك بالفعل عقدة كاملة متزامنة وتريد توفير الوقت، يمكنك أيضًا نسخ بيانات blocks وchainstate.
   
` cd ~/.zcash/`
     
ما عليك سوى تشغيل:

```bash
tar -zcvf blocks.tar.gz /blocks
tar -zcvf chainstate.tar.gz /chainstate
```
     
انسخ ملفات blocks وchainstate ذات الامتداد .gz إلى وحدة SSD/HHD الخارجية. بعد ذلك قم بتركيب وحدة SSD/HDD الخارجية في مجلد Media حتى تتمكن من رؤيتها:

```markdown
lsblk will display all drives connected. Most will be of the format sda
id will show your user and group id's.
```
          
<img src="https://user-images.githubusercontent.com/81990132/197372643-abef88fd-9177-4bf9-abda-3c221188cd10.png" alt="lsblk" width="400" height="400"/>


          
          `sudo mount -o umask=0077,gid=<groupid>,uid=<userid> /dev/sda1 /media/portableHD/`
          
راقب بعناية كِلا من مالك المجلدات/الملفات وكذلك الأذونات.

```bash
sudo chown -R <username>: portableHD
sudo chmod -R 600 portableHD/
```
     
إذا كنت قد نسخت ملفات blocks وchainstate ذات الامتداد .gz من حاسوبك الآخر فقم بفك ضغطها الآن. تأكد من أنها موجودة في مجلد .zcash على وحدة التخزين الخارجية.

```bash
tar - xvzf blocks.tar.gz
tar - xvzf chainstate.tar.gz
```


قم بإعداد /media/portableHD/.zcash/zcash.conf

<img src="https://user-images.githubusercontent.com/81990132/197373699-18cc2c9f-b47d-44e9-9e6b-4c5cccf78d9e.png" alt="zconf" width="700" height="400"/>


 
لاحظ كيف قمنا بنقل datadir إلى وحدة SSD/HDD الخارجية التي تحتوي على مساحة أكبر بكثير. وبما أن الموقع الافتراضي لمجلد .zcash قد تم نقله، فنحن بحاجة إلى إبلاغ *zcashd* بذلك باستخدام الروابط الرمزية:

```markdown
cp -rp ~/.zcash/* /new_dir         // Make copy of datadir or supply with an external HD
rm -rf ~/.zcash                    // Remove default folder
ln -s /media/portableHD/ ~/.zcash  // Symbolic link new data location to the default so zcashd is happy
```
   

شغّل السكربت fetch-params.sh لتنزيل البيانات المطلوبة لـ zcashd
   
    `./fetch-params.sh`


ابدأ برنامج 'screen' جديدًا [ برنامج في Linux ]. افتح zcashd مع تعيين -datadir:

```bash
screen -S zcashScreen`     
./zcashd -datadir=/media/portableHD/.zcash/
```
     
افصل screen:

`Ctrl+a , Ctrl+d`


أنشئ alias حتى لا تضطر إلى كتابة جميع أوامر موقع البيانات الإضافية هذه

     `alias zcash-cli="./zcash-cli -datadir=/media/portableHD/.zcash/"`


جاهز للاستخدام!

    `zcash-cli getblockchaininfo`

  <img src="https://user-images.githubusercontent.com/81990132/197373098-672aa228-d180-47ea-8a7c-c58dc3882426.png" alt="getblockchaininfo" width="400" height="400"/>



### استخدام *zcashd*

<iframe class="w-full h-auto md:h-96" src="https://www.youtube.com/embed/KNhd1KC0Bqk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

---

كيف تتحقق من حالة عقدتك؟

     `tail -n 500 <path to>/.zcash/debug.log`

  <img src="https://user-images.githubusercontent.com/81990132/197684416-9a083de4-4a62-4fe8-9cab-798781b38cd2.png" alt="الحالة" width="700" height="400"/>


  
     
للحصول على الارتفاع الحالي من السجل الخاص بك

     `tail -n 10 <path to>/.zcash/debug.log | grep -o  'height=[^b]*'`

  <img src="https://user-images.githubusercontent.com/81990132/199630447-6a6cd491-0cb3-47f8-95f0-45f6b6555870.png" alt="ارتفاع السجل" width="500" height="400"/>


     
     `zcash-cli getinfo`
  
<img src="https://user-images.githubusercontent.com/81990132/199646508-132da0eb-899e-49a6-8b31-e9011e159700.png" alt="معلومات getInfo" width="400" height="400"/>

     
     
كيف ترسل مذكرة؟ كما هو موضح [هنا](https://zcash.readthedocs.io/en/latest/rtd_pages/memos.html)، نزّل *ascii2hex* و*hex2ascii* واجعلهما قابلين للتنفيذ 

`chmod +x ascii2hex hex2ascii`
          
أنشئ مذكرة وحوّلها إلى hex. يمكنك التحويل مرة أخرى إلى ascii للاختبار.
          
<img src="https://user-images.githubusercontent.com/81990132/199646812-782142d6-8846-443a-8dd9-4f332e49d3e9.png" alt="asciiGOOD" width="400" height="400"/>


  
أنشئ معاملة z2z (Sapling) باستخدام نسخة hex من مذكرتك أعلاه

`zcash-cli z_sendmany "ztestsapling1kg3u0y7szv6509732at34alct46cyn0g26kppgf2a7h5tpqxldtwm7cmhf8rqmhgt" "[{\"address\": \"ztestsapling2kg3u0y7szv6509732at34alct46cyn0g26kppgf2a7h5tpqxldtwm7cmhf8rqmhgtmpakcz5mdv\",\"amount\": 0.0001, \"memo\":\"5A656348756221\"}]"`

كيف تستأنف جلسة zcashScreen بعد فصلها؟

`screen -r zcashScreen`
     
كيف توقف *zcashd* ؟

`zcash-cli stop`
     
كيف تنشئ UA؟

`zcash-cli z_getnewaccount`
     
  <img src="https://user-images.githubusercontent.com/81990132/202352436-04c17be2-e914-4b9b-95d1-00cf6fc496d3.png" alt="حساب جديد" width="400" height="400"/>

    
الآن ابنِ مستقبل UA وفقًا *لاحتياجاتك*. يشمل ذلك Orchard فقط، وOrchard + Sapling، وأخيرًا Orchard + Sapling + Transparent. لاحظ أنه يمكنك التمييز بين المستقبلات من خلال طولها.
     
<img src="https://user-images.githubusercontent.com/81990132/202354319-2da6be33-ca95-4b6b-b29c-14805dcb9c21.png" alt="الأحرف" width="200" height="100"/>


`zcash-cli z_getaddressforaccount 0 '["orchard"]'`
     
<img src="https://user-images.githubusercontent.com/81990132/202353642-c36b5fea-de8a-41f6-a27c-d9ff42a0c8d3.png" alt="uaOrchard" width="400" height="400"/>

<img src="https://user-images.githubusercontent.com/81990132/202355586-eaeb36e7-b000-4b99-8192-81e5002e6f11.png" alt="رمز QR لـ Orch" width="400" height="400"/>

`zcash-cli z_getaddressforaccount 0 '["orchard","sapling"]'`
     
<img src="https://user-images.githubusercontent.com/81990132/202353732-740828e3-77b8-4684-8cf8-fb14256b1e61.png" alt="uaOrchardSapling" width="400" height="400"/>
<img src="https://user-images.githubusercontent.com/81990132/202355596-c7b62854-9a9e-4627-ab5d-51091340de71.png" alt="رمز QR لـ OrchSap" width="300" height="200"/>


`zcash-cli z_getaddressforaccount 0 '["orchard","sapling","p2pkh"]'`
     
<img src="https://user-images.githubusercontent.com/81990132/202353793-3331c593-5286-4b84-93a7-adc4928839fd.png" alt="uaFull" width="400" height="400"/>
<img src="https://user-images.githubusercontent.com/81990132/202355607-75de0750-2a57-4e10-883b-e0a626ed892a.png" alt="رمز QR الكامل" width="400" height="400"/>


كيف ترسل ZEC باستخدام UA؟

`zcash-cli z_sendmany "fromOaddress" "[{\"address\": \"dOrchardAddress\",\"amount\": 0.0001, \"memo\":\"yourMemoinHex\"}]" <minconf> <fee> <privacyPolicy>`

<img src="https://user-images.githubusercontent.com/81990132/202365280-c184f622-eb7e-4095-bc38-90795121c43c.png" alt="نجاح UA" width="400" height="400"/>
<img src="https://user-images.githubusercontent.com/81990132/202366758-40650460-aaeb-4e03-891f-b4bd08e18234.png" alt="صورة" width="400" height="400"/>
##### تجدر الإشارة إلى أن كِلَا عنوانَي *المرسل* و*الوجهة* يمكن أن يكونا عناوين شفافة أو Sapling أو Orchard، ومع ذلك قد تحتاج إلى تعديل علامة `privacyPolicy` لكي تكون المعاملة صالحة. (بعض التركيبات لن تعمل إذا لم تكن `privacyPolicy` منطقية!)

أين يمكنني العثور على مزيد من المعلومات حول UA's؟

> اطّلع على منشور [Hanh's](https://medium.com/@hanh425/transaction-privacy-78f80f9f175e) حول خصوصية المعاملات. وكذلك هذا [المنشور](https://forum.zcashcommunity.com/t/unified-addresses-full-node-rpc-api/41980/2) من منتدى zcash.

> [هذا](https://github.com/zcash/zips/issues/470)

     
### المصادر

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
