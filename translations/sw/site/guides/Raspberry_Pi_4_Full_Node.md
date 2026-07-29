<a href="https://github.com/zechub/zechub/edit/main/site/guides/Raspberry_Pi_4_Full_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Raspberry Pi 4: a * zcashd * Full node mwongozo 


The purpose of this guide is to help educate Zcashers who are interested in running a full node on a low-powered Raspberry Pi 4.

<img src="https://user-images.githubusercontent.com/81990132/197372541-dcd886ab-a3d0-4614-b490-0294ddf3ffae.png" alt="zcashd" width="700" height="700"/>


## Video

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/SGYrzhs1l2k"
    title="How to compile Zcash Node on Raspberry Pi!"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    ruhusuFullScreen
    loading="lazy"
  />
</div>

## Msaada

Ikiwa unapata mwongozo huu kuwa muhimu, fikiria kuchangia ZEC kusaidia ZecHub:

`u1rl2zw85dmjc8m4dmqvtstcyvdjn23n0ad53u5533c97affg9jq208du0vf787vfx4vkd6cd0ma4pxkkuc6xe6ue4dlgjvn9dhzacgk9peejwxdn0ksw3v3yf0dy47znruqftfqgf6xpuelle29g2qxquudxsnnen3dvdx8az6w3tggalc4pla3n4jcs8vf4h29ach3zd8enxulush89`


## Mambo utakayojifunza

```markdown
* How to create a bootable Ubuntu Server microSD card
* How to setup internet connectivity on the Raspberry Pi 4
* How to access your Raspberry Pi 4 remotely
* How to install zcashd
* How to setup zcashd
* How to use zcashd
```


## Mahitaji ya awali

> [8GB Raspberry Pi 4 Canakit](https://www.canakit.com/raspberry-pi-4-starter-max-kit.html) au sawa

> Kompyuta na kadi ya microSD gari

> Mtandao wa Wi-Fi au kebo ya ethernet na uhusiano wa mtandao

> Nje SSD / HHD na msaada USB3


##### kumbuka: kuweka salama server yako ni * si * rahisi kwa njia yoyote. tips yoyote / mapendekezo / bora mazoea zaidi ya kile kinachozungumziwa katika mwongozo huu * tafadhali * kujenga PR na kusaidia kuweka mwongozo hii kama up-to-tarehe iwezekanavyo.



### Jitayarishe SD Kadi

Katika hatua hii utaunda * bootable * SD kadi ambayo itawawezesha yako Raspberry Pi 4 kwa Boot. Kuingiza microSD kadi katika kompyuta yako. Unaweza haja ya kutumia adapta kwamba huja na Canakit au nyingine yoyote Adapter sawa. Kufunga RaspBerry Pi Imager kwa mfumo wako wa uendeshaji. Pakua toleo kwa OS sasa una upatikanaji wa.
     
     > [Ubuntu](https://downloads.raspberrypi.org/imager/imager_latest_amd64.deb)
     
     > [Mifereji](https://downloads.raspberrypi.org/imager/imager_latest.exe)
     
     > [macOS](https://downloads.raspberrypi.org/imager/imager_latest.dmg)

Kwa mfano katika linux wewe ingekuwa aina ya zifuatazo baada ya kupakua:

`sudo dpkg -i imager_latest_amd64.deb`

Fungua Raspberry Pi Imager

`rpi-imager`

<img src="https://user-images.githubusercontent.com/81990132/197372069-fb9f7417-d320-42cf-ad65-38d630512985.png" alt="rpi imager" width="400" height="400"/>

Choose OS and Storage Device. Since Raspberry Pi 4's are 64 bit, I recommend choosing "Other general-purpose OS" => Ubuntu => Ubuntu Server 24.04.3 LTS (64 bit). Click on Storage and select your SD Card. Before writing to SD card, click on Advanced options by clicking on the white gear icon near the bottom right corner.


<img src="https://user-images.githubusercontent.com/81990132/197372159-1169c6f4-f6aa-4f44-9679-fe7aa542bbd3.png" alt="gear" width="200" height="200"/>



Hapa unaweza update:

```markdown
* Hostname of your Raspberry Pi 4
* Enable SSH
* Create a username and pw
* Enable and configure your wi-fi if needed
```
 
<img src="https://user-images.githubusercontent.com/81990132/197372149-8b85bfac-e473-4808-87cd-f27f15d05de8.png" alt="advanced" width="400" height="400"/>

 
Mara baada ya hit kamili kuandika


### Boot Ubuntu Server

If you have an extra monitor and keyboard plug those in now. Note: these are optional. Install the SD card you just formatted into the Raspberry Pi 4 and also plug in the External SSD/HHD into the USB3 port. Also plug in the power cord and turn it on.

### Kuunganisha kijijini kwa yako Raspberry Pi 4

Sasa tunahitaji kuungana na yako Raspberry Pi 4. vitu tunavyohitaji:

```markdown
* Username and pw (from previous step)
* IP address so we can use SSH
* Monitor, and keyboard (optional)
* If you have a monitor and keyboard connected directly to your pi, the rest of this section can be skipped.
```

Njia mbili za kupata anwani yako IP ni kupitia ukurasa wako router admin, au kwa nmap. Kama kutumia router, inategemea ambayo utengenezaji na mimi itabidi kuahirisha maelezo hayo kwa utafutaji wa haraka google. Kwa nmap, kwanza kuhakikisha ni imewekwa:

     `sudo apt-get install nmap`
     
Kupata anwani ya IP ya kompyuta yako ya sasa na kumbuka sehemu tatu za kwanza. Hii ni kawaida 192.168.1.xxx au 192. 168.50.xxx. Plug maelezo haya katika nmap kama ifuatavyo:
          
`sudo nmap -sn 192.168.50.0/24`

or

`sudo nmap -sn 192.168.1.0/24`

Hii kuonyesha vifaa vyote kushikamana na mtandao wako nyumbani, ambayo inapaswa kufunua yako Raspberry Pi 4 ya anwani ya IP / anwani MAC. Kwa kutumia jina lako la mtumiaji, pw, na anwani IP tunaweza sasa kuingia kwa kutumia SSH

```markdown
* ssh <username>@<ip address of your pi> note: you must plugin *your* username and *your* IP address, and *your* pw when prompted.
* For example: `ssh ubuntu@192.168.1.25 where the username is *ubuntu* and IP address is 192.168.1.25.
```


  <img src="https://user-images.githubusercontent.com/81990132/197372846-e1279388-eaaa-4fbb-8d5d-f9928cb45195.png" alt="sshLogin" width="400" height="400"/>
       

Kama wewe ni curious ambayo toleo Raspberry Pi unatumia, jaribu amri hii:

     `cat /sys/firmware/devicetree/base/model ; echo`

  <img src="https://user-images.githubusercontent.com/81990132/197689888-367c8eb3-2667-4c8c-85b3-44d46afe07a7.png" alt="which" width="700" height="400"/>

         

### Kufunga * zcashd *

Two ways of installing zcashd include downloading a precompiled binary or compiling zcashd from source. I *highly* recommend compiling from source. For compiling yourself it is highly recommended to cross-compile. Cross-compile is to build on one platform a binary that will run on another platform. One reason for this is Raspberry Pi 4's are low-powered and thus not very fast! Leverage your main computer to help with this. You can grab the latest release [here](https://github.com/zcash/zcash/releases). Kwa msalaba kuunganisha tunahitaji kuhakikisha tuna vifurushi required. Kufunga zifuatazo:

```bash
sudo apt-get install build-essential pkg-config libc6-dev m4 g++-multilib autoconf libtool ncurses-dev unzip git python3 python3-zmq zlib1g-dev curl bsdmainutils automake libtinfo5
sudo apt-get install gcc-aarch64-linux-gnu
```

Next mabadiliko directory katika freshly kupakuliwa zcashd kutolewa na kukimbia:

`HOST=aarch64-linux-gnu ./zcutil/build.sh`
          

### Kuweka * zcashd *

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/9t2LX3HFldw"
    title="Zcashd Wallet Tool - Generate & Import Private Key"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    ruhusuFullScreen
    loading="lazy"
  />
</div>

---

Sasa tunahitaji kuhamisha faili zote za binary zcashd kwa Raspberry Pi yako 4. Kama ya Zcashd v5.3 faili zinazohitajika ni pamoja na:

```markdown
zcashd
zcash-cli
zcash-tx
zcash-gtest
zcash-inspect
zcashd-wallet-tool
fetch-params.sh
```

Faili hizi zinapatikana katika /src directory ya latest release download eneo kama wewe compiled yao mwenyewe. Vinginevyo, files precompiled ni ambapo wewe kupakuliwa yao. Njia mbili za kufikia transfers ni ama kwa kutumia SFTP, au kwa kutumia gari yako ya nje.

#### SFTP

```bash
sftp username@<ip of RaspberryPi4>
put zcash*
```
   
#### Nakala ya nje
     
Tu nakala files juu ya nje kabla ya kuziweka katika Raspberry Pi 4. Kama tayari una node kamili kulandanishwa na unataka kuokoa muda, unaweza pia nakala vitalu na data chainstate.
   
` cd ~/.zcash/`
     
Tu kukimbia:

```bash
tar -zcvf blocks.tar.gz /blocks
tar -zcvf chainstate.tar.gz /chainstate
```
     
Nakili vitalu na chainstate .gz files katika yako nje SSD / HDD. Next mount nje SSD/HDD katika folda ya vyombo vya habari ili uweze kuona:

```markdown
lsblk will display all drives connected. Most will be of the format sda
id will show your user and group id's.
```
          
<img src="https://user-images.githubusercontent.com/81990132/197372643-abef88fd-9177-4bf9-abda-3c221188cd10.png" alt="lsblk" width="400" height="400"/>


          
          `sudo mount -o umask=0077,gid=<groupid>,uid=<userid> /dev/sda1 /media/portableHD/`
          
Kuweka jicho juu ya wote ambao anamiliki folders / files na pia ruhusa.

```bash
sudo chown -R <username>: portableHD
sudo chmod -R 600 portableHD/
```
     
Kama kunakiliwa vitalu na chainstate .gz files kutoka kompyuta yako nyingine untar hizi sasa. Hakikisha wao ni katika folder .zcash kwenye gari yako ya nje.

```bash
tar - xvzf blocks.tar.gz
tar - xvzf chainstate.tar.gz
```


Configure /media/portableHD/.zcash/zcash.conf

<img src="https://user-images.githubusercontent.com/81990132/197373699-18cc2c9f-b47d-44e9-9e6b-4c5cccf78d9e.png" alt="zconf" width="700" height="400"/>


 
Kumbuka jinsi sisi wakiongozwa dataadir kwa nje SSD / HDD ambayo ina nafasi zaidi inapatikana. Tangu default .zcash folder eneo imehamishwa, tunahitaji kuwaambia * zcashd * hii kwa kutumia viungo ishara:

```markdown
cp -rp ~/.zcash/* /new_dir         // Make copy of datadir or supply with an external HD
rm -rf ~/.zcash                    // Remove default folder
ln -s /media/portableHD/ ~/.zcash  // Symbolic link new data location to the default so zcashd is happy
```
   

Kukimbia fetch-params.sh script download data zinahitajika kwa ajili ya zcashd
   
    `./fetch-params.sh`


Kuanza 'screen' mpya [programu katika linux ]. Open zcashd na -datadir kuweka:

```bash
screen -S zcashScreen`     
./zcashd -datadir=/media/portableHD/.zcash/
```
     
Ondoa skrini:

`Ctrl+a , Ctrl+d`


Kujenga jina bandia hivyo huna kuandika nje amri hizi zote ziada data eneo

     `alias zcash-cli="./zcash-cli -datadir=/media/portableHD/.zcash/"`


Tayari kutumia!

    `zcash-cli getblockchaininfo`

  <img src="https://user-images.githubusercontent.com/81990132/197373098-672aa228-d180-47ea-8a7c-c58dc3882426.png" alt="getblockchaininfo" width="400" height="400"/>



### Kutumia * zcashd *

<iframe class="w-full h-auto md:h-96" src="https://www.youtube.com/embed/KNhd1KC0Bqk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

---

Jinsi gani unaweza kuangalia hali ya node yako?

     `tail -n 500 <path to>/.zcash/debug.log`

  <img src="https://user-images.githubusercontent.com/81990132/197684416-9a083de4-4a62-4fe8-9cab-798781b38cd2.png" alt="status" width="700" height="400"/>


  
     
Kupata urefu wa sasa kutoka logi yako

     `tail -n 10 <path to>/.zcash/debug.log | grep -o  'height=[^b]*'`

  <img src="https://user-images.githubusercontent.com/81990132/199630447-6a6cd491-0cb3-47f8-95f0-45f6b6555870.png" alt="logHeight" width="500" height="400"/>


     
     `zcash-cli getinfo`
  
<img src="https://user-images.githubusercontent.com/81990132/199646508-132da0eb-899e-49a6-8b31-e9011e159700.png" alt="getInfo" width="400" height="400"/>

     
     
Jinsi ya kutuma memo? Kama inavyoonekana [hapa](https://zcash.readthedocs.io/en/latest/rtd_pages/memos.html), download * ascii2hex * na * hex2ascii * na kuwafanya executable 

`chmod +x ascii2hex hex2ascii`
          
Kujenga memo na kuibadilisha kwa hex. Unaweza kubadilisha tena kwa ASCII kwa mtihani.
          
<img src="https://user-images.githubusercontent.com/81990132/199646812-782142d6-8846-443a-8dd9-4f332e49d3e9.png" alt="asciiGOOD" width="400" height="400"/>


  
Kujenga shughuli z2z (Sapling) kwa kutumia toleo hex ya memo yako kutoka juu

`zcash-cli z_sendmany "ztestsapling1kg3u0y7szv6509732at34alct46cyn0g26kppgf2a7h5tpqxldtwm7cmhf8rqmhgt" "[{\"address\": \"ztestsapling2kg3u0y7szv6509732at34alct46cyn0g26kppgf2a7h5tpqxldtwm7cmhf8rqmhgtmpakcz5mdv\",\"amount\": 0.0001, \"memo\":\"5A656348756221\"}]"`

Jinsi gani unaweza kuendelea yako zcashScreen baada ya detached yake?

`screen -r zcashScreen`
     
Jinsi gani wewe kuacha * zcashd * ?

`zcash-cli stop`
     
Jinsi gani unaweza kuunda UA?

`zcash-cli z_getnewaccount`
     
  <img src="https://user-images.githubusercontent.com/81990132/202352436-04c17be2-e914-4b9b-95d1-00cf6fc496d3.png" alt="newAccount" width="400" height="400"/>

    
Sasa kujenga UA receiver kulingana na * mahitaji yako*. Hii ni pamoja na Orchard tu, Orchard + Sapling, na hatimaye Orchard plus Sapling + Transparent. Kumbuka unaweza kujua tofauti kati ya receivers kwa jinsi muda wao ni.
     
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


Jinsi gani unaweza kutuma ZEC kutumia UA?

`zcash-cli z_sendmany "fromOaddress" "[{\"address\": \"dOrchardAddress\",\"amount\": 0.0001, \"memo\":\"yourMemoinHex\"}]" <minconf> <fee> <privacyPolicy>`

<img src="https://user-images.githubusercontent.com/81990132/202365280-c184f622-eb7e-4095-bc38-90795121c43c.png" alt="UAsuccess" width="400" height="400"/>
<img src="https://user-images.githubusercontent.com/81990132/202366758-40650460-aaeb-4e03-891f-b4bd08e18234.png" alt="pic" width="400" height="400"/>

    
##### Ni lazima kuwa alibainisha wote, * kutoka * NA * marudio * anwani inaweza kuwa uwazi, sapling, au orchard anwani hata hivyo unaweza haja ya kurekebisha faragha sera bendera ili kwa ajili ya transaction kuwa halali. (Baadhi combos si kazi kama faragha Sera haina maana!)


Ninaweza kupata wapi habari zaidi kuhusu UA?

> Angalia [Hanh's](https://medium.com/@hanh425/transaction-privacy-78f80f9f175e) baada ya juu ya usiri shughuli. Pia [hii](https://forum.zcashcommunity.com/t/unified-addresses-full-node-rpc-api/41980/2) baada kutoka jukwaa zcash.

> [Hii](https://github.com/zcash/zips/issues/470)

     
### Vyanzo

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
