<a href="https://github.com/zechub/zechub/edit/main/site/guides/Raspberry_Pi_4_Full_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Raspberry Pi 4: a *zcashd* Ìtọ́sọ́nà gbogbo-nọ́ọ̀dù 


Idi ti itọsọna yii ni lati ṣe iranlọwọ kọ awọn Zcashers ti o nifẹ si ṣiṣe akopọ kikun lori agbara kekere Raspberry Pi 4.

<img src="https://user-images.githubusercontent.com/81990132/197372541-dcd886ab-a3d0-4614-b490-0294ddf3ffae.png" alt="zcashd" width="700" height="700"/>


## Fídíò

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/SGYrzhs1l2k"
    title="How to compile Zcash Node on Raspberry Pi!"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    jẹ́ kíFullScreen
    loading="lazy"
  />
</div>

## Ìtìlẹyìn

Bí o bá rí i pé ìtọ́ni yìí wúlò, ronú nípa fífi ZEC ṣètìlẹyìn fún ZecHub:

`u1rl2zw85dmjc8m4dmqvtstcyvdjn23n0ad53u5533c97affg9jq208du0vf787vfx4vkd6cd0ma4pxkkuc6xe6ue4dlgjvn9dhzacgk9peejwxdn0ksw3v3yf0dy47znruqftfqgf6xpuelle29g2qxquudxsnnen3dvdx8az6w3tggalc4pla3n4jcs8vf4h29ach3zd8enxulush89`


## Ohun tó o máa kọ́

```markdown
* How to create a bootable Ubuntu Server microSD card
* How to setup internet connectivity on the Raspberry Pi 4
* How to access your Raspberry Pi 4 remotely
* How to install zcashd
* How to setup zcashd
* How to use zcashd
```


## Àwọn ohun tó pọn dandan

> [8GB Raspberry Pi 4 Canakit](https://www.canakit.com/raspberry-pi-4-starter-max-kit.html) tàbí ohun tí ó bá dọ́gba

> Kọǹpútà tí ó ní ohun èlò ìpamọ́ káàdì microSD

> Nẹtiwọọki Wi-Fi tabi okun ethernet pẹlu asopọ intanẹẹti

> SSD ti ita / HHD pẹlu atilẹyin USB3


##### àkíyèsí: dídáàbòbò sẹẹwérù rẹ kò rọrùn rárá. àwọn ìmọ̀ràn/ìmọ̀ràn tàbí ìlànà tí ó dára jùlọ tí ó kọjá ohun tí a sọ nínú ìwé yìí *ẹ jọ̀wọ́* ṣe àkọsílẹ̀ kan kí ẹ sì ràn wá lọ́wọ́ láti mú ìwé yìí bágbà mu bó bá ti lè ṣeé ṣe tó.



### Ṣetan Kaadi SD

In this step you will create a *bootable* SD card that will allow your Raspberry Pi 4 to boot. Insert the microSD card into your computer. You may need to use the adapter that comes with the Canakit or any other equivalent adaptor. Install Raspberry Pi Imager for your operating system. Download the version for the OS you currently have access to.
     
     > [Ubuntu](https://downloads.raspberrypi.org/imager/imager_latest_amd64.deb)
     
     > [Àwọn fèrèsé](https://downloads.raspberrypi.org/imager/imager_latest.exe)
     
     > [macOS](https://downloads.raspberrypi.org/imager/imager_latest.dmg)

Fun apẹẹrẹ ni linux iwọ yoo tẹ atẹle lẹhin gbigba lati ayelujara:

`sudo dpkg -i imager_latest_amd64.deb`

Ṣii Ẹrọ-ìmọ̀ Rasipibẹri Pi

`rpi-imager`

<img src="https://user-images.githubusercontent.com/81990132/197372069-fb9f7417-d320-42cf-ad65-38d630512985.png" alt="rpi imager" width="400" height="400"/>

Yan OS ati Ẹrọ Ibi ipamọ. Niwọn igba ti Raspberry Pi 4 jẹ 64 bit, Mo ṣeduro yiyan "Omiiran OS ti o ni idi gbogbogbo" => Ubuntu => Ubuntu Server 24.04.3 LTS (64 bit). Tẹ lori Ipamọ ki o yan Kaadi SD rẹ. Ṣaaju ki o to kọ si kaadi SD, tẹ lori Awọn aṣayan ilọsiwaju nipa titẹ lori aami jia funfun nitosi igun apa ọtun isalẹ.


<img src="https://user-images.githubusercontent.com/81990132/197372159-1169c6f4-f6aa-4f44-9679-fe7aa542bbd3.png" alt="gear" width="200" height="200"/>



Nibi o le ṣe imudojuiwọn:

```markdown
* Hostname of your Raspberry Pi 4
* Enable SSH
* Create a username and pw
* Enable and configure your wi-fi if needed
```
 
<img src="https://user-images.githubusercontent.com/81990132/197372149-8b85bfac-e473-4808-87cd-f27f15d05de8.png" alt="advanced" width="400" height="400"/>

 
Lẹ́yìn tí ó bá parí kíkọ


### Ṣíṣe Àgbàlá Ubuntu

If you have an extra monitor and keyboard plug those in now. Note: these are optional. Install the SD card you just formatted into the Raspberry Pi 4 and also plug in the External SSD/HHD into the USB3 port. Also plug in the power cord and turn it on.

### Sopọ latọna jijin si Raspberry Pi 4 rẹ

A nilo lati sopọ si Raspberry Pi rẹ 4.

```markdown
* Username and pw (from previous step)
* IP address so we can use SSH
* Monitor, and keyboard (optional)
* If you have a monitor and keyboard connected directly to your pi, the rest of this section can be skipped.
```

Ọ̀nà méjì láti rí àdírẹ́sì IP rẹ ni nípasẹ̀ ojúewé olùdarí router rẹ, tàbí pẹ̀lú nmap. Bí o bá ńlo router, ó sinmi lórí èyí tí ó ṣe é àti pé èmi yóò fi àwọn ìsọfúnni wọ̀nyìí sílẹ̀ fún àwárí kíákíá nínú google. fún nmap, kọ́kọ́ rí i dájú pé ó ti fi sori ẹrọ:

     `sudo apt-get install nmap`
     
Wá adirẹsi IP ti kọnputa rẹ lọwọlọwọ ki o ṣe akiyesi awọn abala mẹta akọkọ. Eyi jẹ deede 192.168.1.xxx tabi 192.178.50.xxx. Fi awọn alaye wọnyi sinu nmap bi atẹle:
          
`sudo nmap -sn 192.168.50.0/24`

or

`sudo nmap -sn 192.168.1.0/24`

Eleyi yoo han gbogbo awọn ẹrọ ti sopọ si rẹ ile nẹtiwọki, eyi ti o yẹ ki o fi han rẹ Raspberry Pi 4 ká IP adirẹsi / MAC adiresi. Lilo rẹ olumulo orukọ, pw, ati IP adiresi ti a le bayi wọle nipa lilo SSH

```markdown
* ssh <username>@<ip address of your pi> note: you must plugin *your* username and *your* IP address, and *your* pw when prompted.
* For example: `ssh ubuntu@192.168.1.25 where the username is *ubuntu* and IP address is 192.168.1.25.
```


  <img src="https://user-images.githubusercontent.com/81990132/197372846-e1279388-eaaa-4fbb-8d5d-f9928cb45195.png" alt="sshLogin" width="400" height="400"/>
       

Ti o ba jẹ iyanilenu iru ẹya Raspberry Pi ti o nlo, gbiyanju aṣẹ yii:

     `cat /sys/firmware/devicetree/base/model ; echo`

  <img src="https://user-images.githubusercontent.com/81990132/197689888-367c8eb3-2667-4c8c-85b3-44d46afe07a7.png" alt="which" width="700" height="400"/>

         

### Ṣíṣe ìsopọ̀ *zcashd*

Two ways of installing zcashd include downloading a precompiled binary or compiling zcashd from source. I *highly* recommend compiling from source. For compiling yourself it is highly recommended to cross-compile. Cross-compile is to build on one platform a binary that will run on another platform. One reason for this is Raspberry Pi 4's are low-powered and thus not very fast! Leverage your main computer to help with this. You can grab the latest release [here](https://github.com/zcash/zcash/releases). Láti ṣe àdàkọ àgbélébùú a ní láti rí i dájú pé a ní àwọn páákí tí a nílò. Fi èyí tó tẹ̀ lé e yìí sori ẹrọ:

```bash
sudo apt-get install build-essential pkg-config libc6-dev m4 g++-multilib autoconf libtool ncurses-dev unzip git python3 python3-zmq zlib1g-dev curl bsdmainutils automake libtinfo5
sudo apt-get install gcc-aarch64-linux-gnu
```

Next ayipada directory sinu awọn freshly gbaa lati ayelujara zcashd tu ati ṣiṣe:

`HOST=aarch64-linux-gnu ./zcutil/build.sh`
          

### Ìtòlẹ́sẹẹsẹ *zcashd*

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/9t2LX3HFldw"
    title="Zcashd Wallet Tool - Generate & Import Private Key"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    jẹ́ kíFullScreen
    loading="lazy"
  />
</div>

---

A nilo bayi lati gbe gbogbo awọn faili alakomeji zcashd si Raspberry Pi rẹ 4. Bi ti Zcashd v5.3 awọn faili ti o nilo pẹlu:

```markdown
zcashd
zcash-cli
zcash-tx
zcash-gtest
zcash-inspect
zcashd-wallet-tool
fetch-params.sh
```

These files are found in the /src directory of your latest release download location if you compiled them yourself. Otherwise, the precompiled files are where you downloaded them. Two ways of achieving the tranfers are either using SFTP, or by using your External drive.

#### SFTP

```bash
sftp username@<ip of RaspberryPi4>
put zcash*
```
   
#### Àdàkọ ti ita
     
Simply copy the files onto the External before you plug it into the Raspberry Pi 4. If you already have a full node synced and want to save time, you can also copy the blocks and chainstate data.
   
` cd ~/.zcash/`
     
Nìkan sá:

```bash
tar -zcvf blocks.tar.gz /blocks
tar -zcvf chainstate.tar.gz /chainstate
```
     
Ṣe àdàkọ àwọn ìdìpọ̀ àti chainstate .gz fáìlì sínú External SSD/HHD rẹ. Lẹ́yìn náà gbé Ewéko SSD /HDD sínú folda Media kí o lè rí i:

```markdown
lsblk will display all drives connected. Most will be of the format sda
id will show your user and group id's.
```
          
<img src="https://user-images.githubusercontent.com/81990132/197372643-abef88fd-9177-4bf9-abda-3c221188cd10.png" alt="lsblk" width="400" height="400"/>


          
          `sudo mount -o umask=0077,gid=<groupid>,uid=<userid> /dev/sda1 /media/portableHD/`
          
Pa oju rẹ mọ ẹni ti o ni awọn folda/awọn faili ati awọn igbanilaaye.

```bash
sudo chown -R <username>: portableHD
sudo chmod -R 600 portableHD/
```
     
Ti o ba ti daakọ awọn bulọọki ati chainstate .gz awọn faili lati rẹ miiran kọmputa untar wọnyi bayi. Rii daju pe won wa ni awọn .zcash folda lori rẹ ita drive.

```bash
tar - xvzf blocks.tar.gz
tar - xvzf chainstate.tar.gz
```


Setup /media/portableHD/.zcash/zcash.conf

<img src="https://user-images.githubusercontent.com/81990132/197373699-18cc2c9f-b47d-44e9-9e6b-4c5cccf78d9e.png" alt="zconf" width="700" height="400"/>


 
Wo bi a ṣe gbe dataadir si External SSD/HDD eyi ti o ni aaye diẹ sii. Niwon ipo folda .zcash aiyipada ti gbe, a nilo lati sọ * zcashd * eyi nipa lilo awọn ọna asopọ aami:

```markdown
cp -rp ~/.zcash/* /new_dir         // Make copy of datadir or supply with an external HD
rm -rf ~/.zcash                    // Remove default folder
ln -s /media/portableHD/ ~/.zcash  // Symbolic link new data location to the default so zcashd is happy
```
   

Ṣiṣẹ fetch-params.sh ìkọsílẹ̀ láti gba data tí a nílò sílẹ̀ fún zcashd
   
    `./fetch-params.sh`


Bẹrẹ 'awọn iboju' tuntun [ìtòlẹ́sẹẹsẹ ninu linux]. Ṣii zcashd pẹlu -datadir ṣeto:

```bash
screen -S zcashScreen`     
./zcashd -datadir=/media/portableHD/.zcash/
```
     
Yọ iboju kuro:

`Ctrl+a , Ctrl+d`


Ṣẹda a alias ki o ko ni lati tẹ jade gbogbo awọn wọnyi afikun data ipo aṣẹ

     `alias zcash-cli="./zcash-cli -datadir=/media/portableHD/.zcash/"`


O ti ṣetan láti lò ó!

    `zcash-cli getblockchaininfo`

  <img src="https://user-images.githubusercontent.com/81990132/197373098-672aa228-d180-47ea-8a7c-c58dc3882426.png" alt="getblockchaininfo" width="400" height="400"/>



### Lílo *zcashd*

<iframe class="w-full h-auto md:h-96" src="https://www.youtube.com/embed/KNhd1KC0Bqk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

---

Bawo ni o ṣe ṣayẹwo ipo ti node rẹ?

     `tail -n 500 <path to>/.zcash/debug.log`

  <img src="https://user-images.githubusercontent.com/81990132/197684416-9a083de4-4a62-4fe8-9cab-798781b38cd2.png" alt="status" width="700" height="400"/>


  
     
Láti gba gíga lọwọlọwọ láti inú àkọọ́lẹ̀ rẹ

     `tail -n 10 <path to>/.zcash/debug.log | grep -o  'height=[^b]*'`

  <img src="https://user-images.githubusercontent.com/81990132/199630447-6a6cd491-0cb3-47f8-95f0-45f6b6555870.png" alt="logHeight" width="500" height="400"/>


     
     `zcash-cli getinfo`
  
<img src="https://user-images.githubusercontent.com/81990132/199646508-132da0eb-899e-49a6-8b31-e9011e159700.png" alt="getInfo" width="400" height="400"/>

     
     
Báwo lo ṣe ń fi ìwé ránṣẹ́?](https://zcash.readthedocs.io/en/latest/rtd_pages/memos.html), gba *ascii2hex* ati *hex2ascii* silẹ ki o si sọ wọn di ohun ti a le ṣe 

`chmod +x ascii2hex hex2ascii`
          
Ṣẹda akọsilẹ kan ki o si yi i pada si hex. O le yi pada pada si ascii lati ṣe idanwo.
          
<img src="https://user-images.githubusercontent.com/81990132/199646812-782142d6-8846-443a-8dd9-4f332e49d3e9.png" alt="asciiGOOD" width="400" height="400"/>


  
Ṣẹda kan z2z idunadura (Sapling) lilo awọn hex version ti rẹ memo lati loke

`zcash-cli z_sendmany "ztestsapling1kg3u0y7szv6509732at34alct46cyn0g26kppgf2a7h5tpqxldtwm7cmhf8rqmhgt" "[{\"address\": \"ztestsapling2kg3u0y7szv6509732at34alct46cyn0g26kppgf2a7h5tpqxldtwm7cmhf8rqmhgtmpakcz5mdv\",\"amount\": 0.0001, \"memo\":\"5A656348756221\"}]"`

Bawo ni o ṣe le tun pada si iboju zcash rẹ lẹyin ti o ya a?

`screen -r zcashScreen`
     
Báwo lo ṣe lè dá *zcashd* dúró?

`zcash-cli stop`
     
Bawo ni o ṣe le ṣẹda UA?

`zcash-cli z_getnewaccount`
     
  <img src="https://user-images.githubusercontent.com/81990132/202352436-04c17be2-e914-4b9b-95d1-00cf6fc496d3.png" alt="newAccount" width="400" height="400"/>

    
Nisisiyi kọ olugba UA gẹgẹbi * awọn aini rẹ *. Eyi pẹlu Orchard nikan, Orchard + Sapling, ati nikẹhin Orchard+ Sapling + Transparent. Akiyesi pe o le sọ iyatọ laarin awọn olugba nipasẹ bi wọn ṣe pẹ to.
     
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


Bawo ni o ṣe le fi ZEC ranṣẹ nipa lilo UA?

`zcash-cli z_sendmany "fromOaddress" "[{\"address\": \"dOrchardAddress\",\"amount\": 0.0001, \"memo\":\"yourMemoinHex\"}]" <minconf> <fee> <privacyPolicy>`

<img src="https://user-images.githubusercontent.com/81990132/202365280-c184f622-eb7e-4095-bc38-90795121c43c.png" alt="UAsuccess" width="400" height="400"/>
<img src="https://user-images.githubusercontent.com/81990132/202366758-40650460-aaeb-4e03-891f-b4bd08e18234.png" alt="pic" width="400" height="400"/>

    
##### It should be noted both, *from* AND *destination* addresses can be transparent,sapling, or orchard addresses however you may need to adjust the privacyPolicy flag in order for the transation to be valid. (Some combos wont work if privacyPolicy doesn't make sense!)


Ibo ni mo ti lè rí ìsọfúnni sí i nípa àwọn tí wọn ò ní ìwé àṣẹ ìrìnnà?

> Ẹ wo ibi tí wọ́n ń pè ní Hanh's.](https://medium.com/@hanh425/transaction-privacy-78f80f9f175e) ìwífún nípa ìpamọ́ ìṣirò. Pẹ̀lú [èyí](https://forum.zcashcommunity.com/t/unified-addresses-full-node-rpc-api/41980/2) ìsọfúnni láti inú àpérò zcash.

> [Èyí ni](https://github.com/zcash/zips/issues/470)

     
### Àwọn orísun

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
