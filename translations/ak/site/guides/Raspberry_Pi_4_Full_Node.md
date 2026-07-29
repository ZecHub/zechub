<a href="https://github.com/zechub/zechub/edit/main/site/guides/Raspberry_Pi_4_Full_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Raspberry Pi 4: *zcashd* Node akwankyerɛ a edi mũ 


Akwankyerɛ yi botaeɛ ne sɛ ɛbɛboa ama wɔakyerɛkyerɛ Zcashers a wɔn ani gye ho sɛ wɔbɛtu mmirika node a ɛyɛ pɛpɛɛpɛ wɔ Raspberry Pi 4 a ahoɔden sua so.

<img src="https://user-images.githubusercontent.com/81990132/197372541-dcd886ab-a3d0-4614-b490-0294ddf3ffae.png" alt="zcashd" width="700" height="700"/>


## Video

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/SGYrzhs1l2k"
    title="How to compile Zcash Node on Raspberry Pi!"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    ma kwan maFullScreen no
    loading="lazy"
  />
</div>

## Mmoa

Sɛ wuhu sɛ akwankyerɛ yi ho wɔ mfaso a, susuw ho sɛ wode ZEC bɛma de aboa ZecHub:

`u1rl2zw85dmjc8m4dmqvtstcyvdjn23n0ad53u5533c97affg9jq208du0vf787vfx4vkd6cd0ma4pxkkuc6xe6ue4dlgjvn9dhzacgk9peejwxdn0ksw3v3yf0dy47znruqftfqgf6xpuelle29g2qxquudxsnnen3dvdx8az6w3tggalc4pla3n4jcs8vf4h29ach3zd8enxulush89`


## Nea wubesua

```markdown
* How to create a bootable Ubuntu Server microSD card
* How to setup internet connectivity on the Raspberry Pi 4
* How to access your Raspberry Pi 4 remotely
* How to install zcashd
* How to setup zcashd
* How to use zcashd
```


## Nneɛma a ɛsɛ sɛ wodi kan yɛ

> [8GB Raspberry Pi 4 Canakit a wɔde di dwuma wɔ ɔkwan a ɛyɛ nwonwa so](https://www.canakit.com/raspberry-pi-4-starter-max-kit.html) anaa nea ɛne no sɛ

> Kɔmputa a ɛwɔ microSD kaad drive

> Wi-Fi ntwamutam anaa ethernet nhama a ɛwɔ intanɛt nkitahodi

> Abɔnten SSD / HHD a USB3 mmoa


##### hyɛ no nsow: wo server a wobɛkora so no *nyɛ* mmerɛw ɔkwan biara so. Afotuo/nyansahyɛ/nneyɛeɛ pa biara a ɛboro deɛ wɔaka ho asɛm wɔ akwankyerɛ yi mu *yɛsrɛ wo* yɛ PR na boa ma akwankyerɛ yi nyɛ foforɔ sɛdeɛ ɛbɛyɛ yie.



### Siesie SD Card no

Wɔ saa anammɔn yi mu no wobɛbɔ *bootable* SD card a ɛbɛma wo Raspberry Pi 4 no atumi ayɛ boot. Fa microSD card no hyɛ wo kɔmputa no mu. Ebia ɛho behia sɛ wode adapter a ɛka Canakit anaa adaptor foforo biara a ɛne no sɛ no di dwuma. Fa Raspberry Pi Imager hyɛ wo dwumadi nhyehyɛe no mu. Twe version no ma OS a wowɔ mprempren no.
     
     > [Ubuntu a wɔde yɛ adwuma](https://downloads.raspberrypi.org/imager/imager_latest_amd64.deb)
     
     > [Mfɛnsere ahorow](https://downloads.raspberrypi.org/imager/imager_latest.exe)
     
     > [macOS] na ɛyɛ adwuma](https://downloads.raspberrypi.org/imager/imager_latest.dmg)

Sɛ nhwɛso no wɔ linux mu no wobɛkyerɛw nea edidi so yi bere a woatwe awie no:

`sudo dpkg -i imager_latest_amd64.deb`

Bue Raspberry Pi Mfoninitwafo

`rpi-imager`

<img src="https://user-images.githubusercontent.com/81990132/197372069-fb9f7417-d320-42cf-ad65-38d630512985.png" alt="rpi imager" width="400" height="400"/>

Paw OS ne Storage Device. Esiane sɛ Raspberry Pi 4's yɛ 64 bit nti, mekamfo kyerɛ sɛ paw "Other general-purpose OS" => Ubuntu => Ubuntu Server 24.04.3 LTS (64 bit). Klik Storage so na paw wo SD Card no. Ansa na wobɛkyerɛw akɔ SD card so no, klik Advanced options so denam gear icon fitaa a ɛbɛn ase nifa so no a wobɛma so.


<img src="https://user-images.githubusercontent.com/81990132/197372159-1169c6f4-f6aa-4f44-9679-fe7aa542bbd3.png" alt="gear" width="200" height="200"/>



Ɛha na wubetumi ayɛ foforo:

```markdown
* Hostname of your Raspberry Pi 4
* Enable SSH
* Create a username and pw
* Enable and configure your wi-fi if needed
```
 
<img src="https://user-images.githubusercontent.com/81990132/197372149-8b85bfac-e473-4808-87cd-f27f15d05de8.png" alt="advanced" width="400" height="400"/>

 
Sɛ wowie pɛ a, bɔ Twerɛ


### Bɔ Ubuntu Server no ase

Sɛ wowɔ monitor ne keyboard foforo a, fa wɔn hyɛ mu mprempren. Hyɛ no nsow: eyinom yɛ nea wobetumi apaw. Fa SD kaad a woayɛ no seesei ara no hyɛ Raspberry Pi 4 no mu na fa External SSD/HHD no nso hyɛ USB3 port no mu. Afei nso fa anyinam ahoɔden nhama no hyɛ mu na dan no.

### Fa wo Raspberry Pi 4 no di nkitaho wɔ akyirikyiri

Seesei ɛsɛ sɛ yɛde yɛn ho hyɛ wo Raspberry Pi 4. Nneɛma a yehia:

```markdown
* Username and pw (from previous step)
* IP address so we can use SSH
* Monitor, and keyboard (optional)
* If you have a monitor and keyboard connected directly to your pi, the rest of this section can be skipped.
```

Akwan mmienu a wobɛfa so ahunu wo IP address ne wo router admin page, anaasɛ nmap. Sɛ wode router no redi dwuma a, egyina nea wɔyɛ so na mɛtwe saa nsɛm no akɔ google hwehwɛ ntɛmntɛm so. Wɔ nmap ho no, di kan hwɛ hu sɛ wɔde ahyɛ mu:

     `sudo apt-get install nmap`
     
Hwehwɛ IP address a ɛwɔ wo kɔmputa a wowɔ mprempren no so na hyɛ afã abiɛsa a edi kan no nsow. Eyi taa yɛ 192.168.1.xxx anaa 192.168.50.xxx. Fa saa nsɛm yi hyɛ nmap mu sɛnea edidi so yi:
          
`sudo nmap -sn 192.168.50.0/24`

or

`sudo nmap -sn 192.168.1.0/24`

Wei bɛkyerɛ mfiri a ɛka wo fie ntwamutam nyinaa, a ɛsɛ sɛ ɛda wo Raspberry Pi 4 IP address / MAC address adi. Sɛ yɛde wo username, pw, ne IP address di dwuma a, afei yebetumi de SSH akɔ mu

```markdown
* ssh <username>@<ip address of your pi> note: you must plugin *your* username and *your* IP address, and *your* pw when prompted.
* For example: `ssh ubuntu@192.168.1.25 where the username is *ubuntu* and IP address is 192.168.1.25.
```


  <img src="https://user-images.githubusercontent.com/81990132/197372846-e1279388-eaaa-4fbb-8d5d-f9928cb45195.png" alt="sshLogin" width="400" height="400"/>
       

Sɛ wopɛ sɛ wuhu Raspberry Pi version bɛn na wode redi dwuma a, sɔ ahyɛde yi hwɛ:

     `cat /sys/firmware/devicetree/base/model ; echo`

  <img src="https://user-images.githubusercontent.com/81990132/197689888-367c8eb3-2667-4c8c-85b3-44d46afe07a7.png" alt="which" width="700" height="400"/>

         

### *zcashd* a wɔde ahyɛ mu.

Akwan mmienu a wobɛfa so ahyɛ zcashd ne sɛ wobɛtwe binary a wɔadi kan aboaboa ano anaasɛ wobɛboaboa zcashd ano afiri fibea. Me *highly* kamfo kyerɛ sɛ wobɛboaboa ano afi fibea. Sɛ wopɛ sɛ woboaboa wo ho ano a, wɔkamfo kyerɛ kɛse sɛ wobɛboaboa ano wɔ cross-compile. Cross-compile ne sɛ wobɛkyekyere binary a ɛbɛkɔ so wɔ platform foforo so wɔ platform biako so. Ade biako nti a ɛte saa ne sɛ Raspberry Pi 4 ahorow no nni ahoɔden pii na enti ɛnyɛ ntɛmntɛm koraa! Fa wo kɔmputa titiriw no di dwuma na boa wɔ eyi mu. Wubetumi agye nea wɔayi no adi nnansa yi ara [ha](https://github.com/zcash/zcash/releases). Sɛ yɛbɛ cross compile a ɛhia sɛ yɛhwɛ sɛ yɛwɔ packages a ɛhia. Fa nea edidi so yi hyɛ mu:

```bash
sudo apt-get install build-essential pkg-config libc6-dev m4 g++-multilib autoconf libtool ncurses-dev unzip git python3 python3-zmq zlib1g-dev curl bsdmainutils automake libtinfo5
sudo apt-get install gcc-aarch64-linux-gnu
```

Afei sesa directory kɔ zcashd a wɔatwe no foforo no mu na tu mmirika:

`HOST=aarch64-linux-gnu ./zcutil/build.sh`
          

### Nsiesiei *zcashd* .

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/9t2LX3HFldw"
    title="Zcashd Wallet Tool - Generate & Import Private Key"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    ma kwan maFullScreen no
    loading="lazy"
  />
</div>

---

Seesei ɛsɛ sɛ yɛde zcashd binary fael no nyinaa kɔ wo Raspberry Pi 4. Sɛnea ɛte wɔ Zcashd v5.3 no fael a wohia no bi ne:

```markdown
zcashd
zcash-cli
zcash-tx
zcash-gtest
zcash-inspect
zcashd-wallet-tool
fetch-params.sh
```

Wohu saa fael yi wɔ /src directory a ɛwɔ wo latest release download beae no mu sɛ w’ankasa woaboaboa ano a. Sɛ ɛnte saa a, fael ahorow a wɔadi kan aboaboa ano no wɔ baabi a wotwee no. Akwan mmienu a wobɛfa so anya transfers no ne sɛ wode SFTP bedi dwuma, anaasɛ wode wo External drive bedi dwuma.

#### SFTP na ɛyɛ adwuma

```bash
sftp username@<ip of RaspberryPi4>
put zcash*
```
   
#### Abɔnten so Mfonini
     
Kɔpi fael ahorow no kɔ External no so kɛkɛ ansa na wode ahyɛ Raspberry Pi 4. Sɛ wowɔ node a edi mũ dedaw a wɔayɛ no sync na wopɛ sɛ wokora bere so a, wubetumi nso ayɛ blocks ne chainstate data no kɔpi.
   
` cd ~/.zcash/`
     
Tu mmirika kɛkɛ:

```bash
tar -zcvf blocks.tar.gz /blocks
tar -zcvf chainstate.tar.gz /chainstate
```
     
Kɔpi blocks ne chainstate .gz fael ahorow no kɔ wo External SSD/HHD mu. Afei fa External SSD/HDD no hyɛ Media folda no mu sɛnea ɛbɛyɛ a wubetumi ahu:

```markdown
lsblk will display all drives connected. Most will be of the format sda
id will show your user and group id's.
```
          
<img src="https://user-images.githubusercontent.com/81990132/197372643-abef88fd-9177-4bf9-abda-3c221188cd10.png" alt="lsblk" width="400" height="400"/>


          
          `sudo mount -o umask=0077,gid=<groupid>,uid=<userid> /dev/sda1 /media/portableHD/`
          
Hwɛ nea ɔwɔ folda/fael ahorow no ne tumi krataa no nso.

```bash
sudo chown -R <username>: portableHD
sudo chmod -R 600 portableHD/
```
     
Sɛ wo kɔpi blocks ne chainstate .gz fael ahorow no fi wo kɔmputa foforo no so a untar eyinom mprempren. Hwɛ sɛ wɔwɔ .zcash folda a ɛwɔ wo External drive no so.

```bash
tar - xvzf blocks.tar.gz
tar - xvzf chainstate.tar.gz
```


Nsiesiei /media/portableHD/.zcash/zcash.conf

<img src="https://user-images.githubusercontent.com/81990132/197373699-18cc2c9f-b47d-44e9-9e6b-4c5cccf78d9e.png" alt="zconf" width="700" height="400"/>


 
Hyɛ sɛnea yɛde datadir no kɔɔ External SSD/HDD a ɛwɔ baabi pii a ɛwɔ hɔ no nsow. Esiane sɛ wɔatu default .zcash folda beae no nti, ɛsɛ sɛ yɛka eyi kyerɛ *zcashd* denam sɛnkyerɛnne kwan so nkitahodi ahorow a yɛde bedi dwuma so:

```markdown
cp -rp ~/.zcash/* /new_dir         // Make copy of datadir or supply with an external HD
rm -rf ~/.zcash                    // Remove default folder
ln -s /media/portableHD/ ~/.zcash  // Symbolic link new data location to the default so zcashd is happy
```
   

Run fetch-params.sh script na twe data a ɛho hia ma zcashd
   
    `./fetch-params.sh`


Fi ase yɛ 'screen' foforo [ program wɔ linux mu ]. Bue zcashd ne -datadir nhyehyɛe:

```bash
screen -S zcashScreen`     
./zcashd -datadir=/media/portableHD/.zcash/
```
     
Yi screen no fi mu:

`Ctrl+a , Ctrl+d`


Yɛ alias sɛnea ɛbɛyɛ a ɛnsɛ sɛ wokyerɛw saa data beae ahyɛde ahorow a ɛboro so yi nyinaa

     `alias zcash-cli="./zcash-cli -datadir=/media/portableHD/.zcash/"`


Wɔasiesie ne ho sɛ wɔde bedi dwuma!

    `zcash-cli getblockchaininfo`

  <img src="https://user-images.githubusercontent.com/81990132/197373098-672aa228-d180-47ea-8a7c-c58dc3882426.png" alt="getblockchaininfo" width="400" height="400"/>



### Sɛ wode *zcashd* redi dwuma.

<iframe class="w-full h-auto md:h-96" src="https://www.youtube.com/embed/KNhd1KC0Bqk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

---

Wobɛyɛ dɛn ahwɛ sɛnea wo node no te?

     `tail -n 500 <path to>/.zcash/debug.log`

  <img src="https://user-images.githubusercontent.com/81990132/197684416-9a083de4-4a62-4fe8-9cab-798781b38cd2.png" alt="status" width="700" height="400"/>


  
     
Sɛnea ɛbɛyɛ a wubenya mprempren sorokɔ afi wo log no mu

     `tail -n 10 <path to>/.zcash/debug.log | grep -o  'height=[^b]*'`

  <img src="https://user-images.githubusercontent.com/81990132/199630447-6a6cd491-0cb3-47f8-95f0-45f6b6555870.png" alt="logHeight" width="500" height="400"/>


     
     `zcash-cli getinfo`
  
<img src="https://user-images.githubusercontent.com/81990132/199646508-132da0eb-899e-49a6-8b31-e9011e159700.png" alt="getInfo" width="400" height="400"/>

     
     
Wobɛyɛ dɛn de memo amena? Sɛnea yehu [ha](https://zcash.readthedocs.io/en/latest/rtd_pages/memos.html), twe *ascii2hex* ne *hex2ascii* na yɛ no executable 

`chmod +x ascii2hex hex2ascii`
          
Yɛ memo na dane no kɔ hex mu. Wubetumi adan akɔ ascii so akɔ asɔ ahwɛ.
          
<img src="https://user-images.githubusercontent.com/81990132/199646812-782142d6-8846-443a-8dd9-4f332e49d3e9.png" alt="asciiGOOD" width="400" height="400"/>


  
Yɛ z2z asɛm (Sapling) denam wo memo no hex version a efi soro no so

`zcash-cli z_sendmany "ztestsapling1kg3u0y7szv6509732at34alct46cyn0g26kppgf2a7h5tpqxldtwm7cmhf8rqmhgt" "[{\"address\": \"ztestsapling2kg3u0y7szv6509732at34alct46cyn0g26kppgf2a7h5tpqxldtwm7cmhf8rqmhgtmpakcz5mdv\",\"amount\": 0.0001, \"memo\":\"5A656348756221\"}]"`

Wobɛyɛ dɛn asan ahyɛ wo zcashScreen ase bere a woayi afi mu awie no?

`screen -r zcashScreen`
     
Wobɛyɛ dɛn agyae *zcashd* ?

`zcash-cli stop`
     
Wobɛyɛ dɛn abɔ UA?

`zcash-cli z_getnewaccount`
     
  <img src="https://user-images.githubusercontent.com/81990132/202352436-04c17be2-e914-4b9b-95d1-00cf6fc496d3.png" alt="newAccount" width="400" height="400"/>

    
Afei yɛ UA receiver sɛdeɛ *w'ahiadeɛ* teɛ. Eyi ka Orchard nkutoo, Orchard + Sapling, ne awiei koraa no Orchard + Sapling + Transparent ho. Hyɛ no nsow sɛ wubetumi ahu nsonsonoe a ɛda receivers ntam denam bere tenten a wɔde di dwuma so.
     
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


Wobɛyɛ dɛn de UA asoma ZEC?

`zcash-cli z_sendmany "fromOaddress" "[{\"address\": \"dOrchardAddress\",\"amount\": 0.0001, \"memo\":\"yourMemoinHex\"}]" <minconf> <fee> <privacyPolicy>`

<img src="https://user-images.githubusercontent.com/81990132/202365280-c184f622-eb7e-4095-bc38-90795121c43c.png" alt="UAsuccess" width="400" height="400"/>
<img src="https://user-images.githubusercontent.com/81990132/202366758-40650460-aaeb-4e03-891f-b4bd08e18234.png" alt="pic" width="400" height="400"/>

    
##### Ɛsɛ sɛ yɛhyɛ no nsow abien no nyinaa, *fi* NE *destination* address ahorow betumi ayɛ transparent,sapling, anaa orchard address nanso ebia ɛho behia sɛ wosakra privacyPolicy frankaa no sɛnea ɛbɛyɛ a nsakrae no bɛyɛ adwuma. (Ebi combos wont adwuma sɛ privacyPolicy ntease nnim!)


Ɛhe na metumi anya info pii wɔ UA's ho?

> Hwɛ [Hanh de no](https://medium.com/@hanh425/transaction-privacy-78f80f9f175e) post wɔ transaction kokoamsɛm so. Afei nso [eyi](https://forum.zcashcommunity.com/t/unified-addresses-full-node-rpc-api/41980/2) post fi zcash forum no so.

> [Wei](https://github.com/zcash/zips/issues/470)

     
### Nneɛma a wonya fi mu

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
