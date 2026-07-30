<a href="https://github.com/zechub/zechub/edit/main/site/guides/Raspberry_Pi_4_Full_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Raspberry Pi 4: *zcashd* Node ƒe mɔfiame blibo aɖe 


Taɖodzinu si le mɔfiame sia ŋue nye be wòakpe ɖe eŋu woafia nu Zcashers siwo di be yewoawɔ node blibo le Raspberry Pi 4 si me ŋusẽ boo mele o dzi.

<img src="https://user-images.githubusercontent.com/81990132/197372541-dcd886ab-a3d0-4614-b490-0294ddf3ffae.png" alt="zcashd" width="700" height="700"/>


## Video

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/SGYrzhs1l2k"
    title="How to compile Zcash Node on Raspberry Pi!"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    ɖe mɔ ɖeFullScreen ŋu
    loading="lazy"
  />
</div>

## De megbe

Ne èkpɔe be mɔfiame sia ɖea vi la, bu ZEC nana ŋu be nàtsɔ ado alɔ ZecHub:

`u1rl2zw85dmjc8m4dmqvtstcyvdjn23n0ad53u5533c97affg9jq208du0vf787vfx4vkd6cd0ma4pxkkuc6xe6ue4dlgjvn9dhzacgk9peejwxdn0ksw3v3yf0dy47znruqftfqgf6xpuelle29g2qxquudxsnnen3dvdx8az6w3tggalc4pla3n4jcs8vf4h29ach3zd8enxulush89`


## Nusiwo nàsrɔ̃

```markdown
* How to create a bootable Ubuntu Server microSD card
* How to setup internet connectivity on the Raspberry Pi 4
* How to access your Raspberry Pi 4 remotely
* How to install zcashd
* How to setup zcashd
* How to use zcashd
```


## Nusiwo hiã do ŋgɔ

> [8GB Raspberry Pi 4 Canakit ƒe ƒuƒoƒo](https://www.canakit.com/raspberry-pi-4-starter-max-kit.html) alo esi sɔ kplii

> Kɔmpiuta si me microSD kaɖi ƒe mɔ̃ le

> Wi-Fi network alo ethernet ka si dzi internet kadodo le

> SSD/HHD si le egodo kple USB3 ƒe kpekpeɖeŋu


##### de dzesii: wò server dzi kpɔkpɔ le dedie *mele* bɔbɔe le mɔ aɖeke nu o. Aɖaŋuɖoɖo/kafukafu/nuwɔna nyuitɔ ɖesiaɖe si wu nusi ŋu woƒo nu tsoe le mɔfiame sia me *taflatse* wɔ PR eye nàkpe asi ɖe mɔfiame sia ŋu wòanɔ yeye alesi nàte ŋui.



### Dzra SD Card la ɖo

Le afɔɖeɖe sia me la, àwɔ *bootable* SD card si ana wò Raspberry Pi 4 nadze egɔme. De microSD kaɖia wò kɔmpiuta me. Ðewohĩ ahiã be nàzã adapter si kpe ɖe Canakit alo adaptor bubu ɖesiaɖe si sɔ kplii ŋu. De Raspberry Pi Imager wò dɔwɔɖoɖoa me. Wɔ OS si ŋu nèle mɔ ɖo fifia la ƒe tɔtrɔ.
     
     > [Ubuntu ƒe ŋkɔ](https://downloads.raspberrypi.org/imager/imager_latest_amd64.deb)
     
     > [Fesrewo](https://downloads.raspberrypi.org/imager/imager_latest.exe)
     
     > [macOS] ƒe ŋkɔ](https://downloads.raspberrypi.org/imager/imager_latest.dmg)

Le kpɔɖeŋu me le linux me la, àŋlɔ nya siawo le eƒe kɔpiwɔwɔ vɔ megbe:

`sudo dpkg -i imager_latest_amd64.deb`

Ʋu Raspberry Pi ƒe Nɔnɔmetata

`rpi-imager`

<img src="https://user-images.githubusercontent.com/81990132/197372069-fb9f7417-d320-42cf-ad65-38d630512985.png" alt="rpi imager" width="400" height="400"/>

Tia OS kple Nudzraɖoƒe ƒe Mɔ̃. Esi wònye Raspberry Pi 4 ƒewo nye 64 bit ta la, mekafui be nàtia "Other general-purpose OS" => Ubuntu => Ubuntu Server 24.04.3 LTS (64 bit). Zi Storage dzi eye nàtia wò SD Card. Hafi nàŋlɔ nu ɖe ​​SD card dzi la, zi Advanced options dzi to gear ƒe dzesi ɣi si te ɖe ete le ɖusime la dzi.


<img src="https://user-images.githubusercontent.com/81990132/197372159-1169c6f4-f6aa-4f44-9679-fe7aa542bbd3.png" alt="gear" width="200" height="200"/>



Àte ŋu awɔ asitɔtrɔ le afisia:

```markdown
* Hostname of your Raspberry Pi 4
* Enable SSH
* Create a username and pw
* Enable and configure your wi-fi if needed
```
 
<img src="https://user-images.githubusercontent.com/81990132/197372149-8b85bfac-e473-4808-87cd-f27f15d05de8.png" alt="advanced" width="400" height="400"/>

 
Ne èwu enu vɔ la, ƒo Ŋlɔ


### Dze Ubuntu Dɔwɔƒea ƒe Dɔwɔɖoɖoa gɔme

Ne monitor kple keyboard bubu le asiwò la, tsɔ esiawo de eme fifia. De dzesii: esiawo nye esiwo woate ŋu awɔ le wo ɖokui si. De SD kaɖi si nèwɔ ɖoɖo ɖe eŋu fifia la ɖe Raspberry Pi 4 me eye nàtsɔ External SSD/HHD hã ade USB3 ʋɔtrua me. Do elektrikkaƒomɔ̃a hã eye nàʋui.

### Do ka kple wò Raspberry Pi 4 tso didiƒe

Fifia ele be míado ka kple wò Raspberry Pi 4. Nusiwo míehiã:

```markdown
* Username and pw (from previous step)
* IP address so we can use SSH
* Monitor, and keyboard (optional)
* If you have a monitor and keyboard connected directly to your pi, the rest of this section can be skipped.
```

Mɔ eve siwo dzi nàto ake ɖe wò IP adrɛs ŋue nye to wò router admin page dzi, alo kple nmap. Ne èzã router la, enɔ te ɖe nusi wowɔ dzi eye mahe nyatakaka mawo ɖe megbe na google didi kabakaba. Le nmap gome la, gbã la, kpɔ egbɔ be wodae ɖe wò kɔmpiuta dzi:

     `sudo apt-get install nmap`
     
Di kɔmpiuta si nèzãna fifia ƒe IP adrɛs eye nàde dzesi akpa etɔ̃ gbãtɔawo. Zi geɖe la, esia nyea 192.168.1.xxx alo 192.168.50.xxx. Do nyatakaka siawo ɖe nmap me ale:
          
`sudo nmap -sn 192.168.50.0/24`

or

`sudo nmap -sn 192.168.1.0/24`

Esia aɖe mɔ̃ siwo katã do ƒome kple wò aƒeme network la afia, si wòle be wòaɖe wò Raspberry Pi 4 ƒe IP adrɛs / MAC adrɛs afia. Ne míezã wò zãŋkɔ, pw, kple IP adrɛs la, míate ŋu age ɖe eme azɔ to SSH zazã me

```markdown
* ssh <username>@<ip address of your pi> note: you must plugin *your* username and *your* IP address, and *your* pw when prompted.
* For example: `ssh ubuntu@192.168.1.25 where the username is *ubuntu* and IP address is 192.168.1.25.
```


  <img src="https://user-images.githubusercontent.com/81990132/197372846-e1279388-eaaa-4fbb-8d5d-f9928cb45195.png" alt="sshLogin" width="400" height="400"/>
       

Ne èdi be yeanya Raspberry Pi ƒe tɔtrɔ si zãm nèle la, te sedede sia kpɔ:

     `cat /sys/firmware/devicetree/base/model ; echo`

  <img src="https://user-images.githubusercontent.com/81990132/197689888-367c8eb3-2667-4c8c-85b3-44d46afe07a7.png" alt="which" width="700" height="400"/>

         

### Wole *zcashd* ɖom ɖe ɖoɖo nu.

Mɔ eve siwo dzi nàto aɖo zcashd ɖe emee nye be nàɖe binary si woƒo ƒu do ŋgɔ alo nàƒo zcashd nu ƒu tso dzɔtsoƒe. Me *kafui vevie* be nàƒo nu ƒu tso dzɔtsoƒe. Le ɖokuiwò nuƒoƒoƒu ta la, wokafui vevie be nàƒo nu ƒu ɖekae. Cross-compile nye be woatu binary si awɔ dɔ le platform bubu dzi ɖe platform ɖeka dzi. Susu ɖeka si tae nye be Raspberry Pi 4 ƒe ŋusẽ mebɔ o eye le esia ta womeƒua du boo o! Zã wò kɔmpiuta vevitɔ nàtsɔ akpe asi ɖe esia ŋu. Àte ŋu axɔ esi woɖe ɖe go yeyetɔ [le afisia](https://github.com/zcash/zcash/releases). Be míatso compile la ele be míakpɔ egbɔ be package siwo hiã la le mía si. De nusiwo gbɔna la wò kɔmpiuta dzi:

```bash
sudo apt-get install build-essential pkg-config libc6-dev m4 g++-multilib autoconf libtool ncurses-dev unzip git python3 python3-zmq zlib1g-dev curl bsdmainutils automake libtinfo5
sudo apt-get install gcc-aarch64-linux-gnu
```

Eyome trɔ directory ɖe zcashd ƒe tata yeye si woɖe ɖe go me eye nàwɔe:

`HOST=aarch64-linux-gnu ./zcutil/build.sh`
          

### Ðoɖowɔwɔ ɖe *zcashd* ŋu.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/9t2LX3HFldw"
    title="Zcashd Wallet Tool - Generate & Import Private Key"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    ɖe mɔ ɖeFullScreen ŋu
    loading="lazy"
  />
</div>

---

Fifia ele be míatsɔ zcashd binary files katã ayi wò Raspberry Pi 4. Tso Zcashd v5.3 dzi la, file siwo hiã la dometɔ aɖewoe nye:

```markdown
zcashd
zcash-cli
zcash-tx
zcash-gtest
zcash-inspect
zcashd-wallet-tool
fetch-params.sh
```

Wokpɔa faɛl siawo le /src ƒe nyatakakadzraɖoƒe si le wò tata yeyetɔ ƒe kɔpiwɔƒe ne wò ŋutɔe ƒo wo nu ƒu. Ne menye nenema o la, faɛl siwo nèƒo ƒu do ŋgɔ lae nye afisi nèɖe wo le. Mɔ eve siwo dzi nàto aɖo asitɔtrɔawo gbɔe nye SFTP zazã, alo to wò External drive zazã me.

#### SFTP ƒe dɔwɔwɔ

```bash
sftp username@<ip of RaspberryPi4>
put zcash*
```
   
#### Gome Kɔpi
     
Ðeko nàwɔ kɔpi na faɛlawo ɖe External hafi nàtsɔe ade Raspberry Pi 4. Ne node blibo aɖe le asiwò xoxo eye nèdi be yeaɖe ɣeyiɣi dzi akpɔtɔ la, àte ŋu awɔ kɔpi na blocks kple chainstate data hã.
   
` cd ~/.zcash/`
     
Ðeko nàƒu du:

```bash
tar -zcvf blocks.tar.gz /blocks
tar -zcvf chainstate.tar.gz /chainstate
```
     
Kɔpi blocks kple chainstate .gz faɛlwo ɖe wò External SSD/HHD me. Eyome tsɔ External SSD/HDD la de Media ƒe agbalẽdzraɖoƒea ale be nàte ŋu akpɔe:

```markdown
lsblk will display all drives connected. Most will be of the format sda
id will show your user and group id's.
```
          
<img src="https://user-images.githubusercontent.com/81990132/197372643-abef88fd-9177-4bf9-abda-3c221188cd10.png" alt="lsblk" width="400" height="400"/>


          
          `sudo mount -o umask=0077,gid=<groupid>,uid=<userid> /dev/sda1 /media/portableHD/`
          
Lé ŋku ɖe amesiwo tɔe agbalẽdzraɖoƒeawo/faɛlawo le kple mɔɖeɖeawo hã ŋu.

```bash
sudo chown -R <username>: portableHD
sudo chmod -R 600 portableHD/
```
     
Ne èwɔ kɔpi na blocks kple chainstate .gz files tso wò kɔmpiuta bubu dzi la, untar esiawo fifia. Kpɔ egbɔ be wole .zcash ƒe agbalẽdzraɖoƒe si le wò External drive dzi.

```bash
tar - xvzf blocks.tar.gz
tar - xvzf chainstate.tar.gz
```


Ðoɖo /nyadzɔdzɔgblɔmɔnuwo/siwo woate ŋu atsɔ adzoeHD/.zcash/zcash.conf

<img src="https://user-images.githubusercontent.com/81990132/197373699-18cc2c9f-b47d-44e9-9e6b-4c5cccf78d9e.png" alt="zconf" width="700" height="400"/>


 
De dzesi alesi míeɖe datadir la yi External SSD/HDD si me teƒe geɖe le wu. Esi wònye be woɖe .zcash agbalẽdzraɖoƒe ƒe teƒe si woɖo ɖi la ɖa ta la, ele be míagblɔ esia na *zcashd* to kpɔɖeŋu kadodowo zazã me:

```markdown
cp -rp ~/.zcash/* /new_dir         // Make copy of datadir or supply with an external HD
rm -rf ~/.zcash                    // Remove default folder
ln -s /media/portableHD/ ~/.zcash  // Symbolic link new data location to the default so zcashd is happy
```
   

Ƒu du fetch-params.sh script be nàɖe nyatakaka siwo hiã na zcashd
   
    `./fetch-params.sh`


Dze 'screen' yeye gɔme [ ɖoɖowɔɖi le linux me ]. Ʋu zcashd kple -datadir ɖoɖo:

```bash
screen -S zcashScreen`     
./zcashd -datadir=/media/portableHD/.zcash/
```
     
Ðe screen la ɖa:

`Ctrl+a , Ctrl+d`


Wɔ ŋkɔ bubu ale be màhiã be nàŋlɔ nyatakaka teƒe ƒe sedede siawo katã kpee o

     `alias zcash-cli="./zcash-cli -datadir=/media/portableHD/.zcash/"`


Dzra ɖo be woazãe!

    `zcash-cli getblockchaininfo`

  <img src="https://user-images.githubusercontent.com/81990132/197373098-672aa228-d180-47ea-8a7c-c58dc3882426.png" alt="getblockchaininfo" width="400" height="400"/>



### *zcashd* zazã .

<iframe class="w-full h-auto md:h-96" src="https://www.youtube.com/embed/KNhd1KC0Bqk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

---

Aleke nèwɔna léa ŋku ɖe wò node ƒe nɔnɔme ŋu?

     `tail -n 500 <path to>/.zcash/debug.log`

  <img src="https://user-images.githubusercontent.com/81990132/197684416-9a083de4-4a62-4fe8-9cab-798781b38cd2.png" alt="status" width="700" height="400"/>


  
     
Be nàkpɔ kɔkɔme si li fifia tso wò log me

     `tail -n 10 <path to>/.zcash/debug.log | grep -o  'height=[^b]*'`

  <img src="https://user-images.githubusercontent.com/81990132/199630447-6a6cd491-0cb3-47f8-95f0-45f6b6555870.png" alt="logHeight" width="500" height="400"/>


     
     `zcash-cli getinfo`
  
<img src="https://user-images.githubusercontent.com/81990132/199646508-132da0eb-899e-49a6-8b31-e9011e159700.png" alt="getInfo" width="400" height="400"/>

     
     
Aleke nèwɔna ɖoa nuŋlɔɖi aɖe ɖa? Abe alesi wokpɔe [le afisia ene](https://zcash.readthedocs.io/en/latest/rtd_pages/memos.html), wɔ *ascii2hex* kple *hex2ascii* ƒe kɔpi eye nàwɔ wo be woate ŋu awɔ wo 

`chmod +x ascii2hex hex2ascii`
          
Wɔ memo eye nàtrɔe wòazu hex. Àte ŋu atrɔ ɖe ascii ŋu be nàdoe kpɔ.
          
<img src="https://user-images.githubusercontent.com/81990132/199646812-782142d6-8846-443a-8dd9-4f332e49d3e9.png" alt="asciiGOOD" width="400" height="400"/>


  
Wɔ z2z ƒe asitsatsa (Sapling) to wò nuŋlɔɖi ƒe hex tɔ zazã me tso dziƒo

`zcash-cli z_sendmany "ztestsapling1kg3u0y7szv6509732at34alct46cyn0g26kppgf2a7h5tpqxldtwm7cmhf8rqmhgt" "[{\"address\": \"ztestsapling2kg3u0y7szv6509732at34alct46cyn0g26kppgf2a7h5tpqxldtwm7cmhf8rqmhgtmpakcz5mdv\",\"amount\": 0.0001, \"memo\":\"5A656348756221\"}]"`

Aleke nàwɔ agbugbɔ adze wò zcashScreen gɔme ne èɖee ɖa vɔ?

`screen -r zcashScreen`
     
Aleke nàwɔ adzudzɔ *zcashd* ?

`zcash-cli stop`
     
Aleke nàwɔ awɔ UA?

`zcash-cli z_getnewaccount`
     
  <img src="https://user-images.githubusercontent.com/81990132/202352436-04c17be2-e914-4b9b-95d1-00cf6fc496d3.png" alt="newAccount" width="400" height="400"/>

    
Now build a UA receiver according to *your needs*. This includes Orchard only, Orchard + Sapling, and finally Orchard + Sapling + Transparent. Note you can tell the difference between receivers by how long they are.
     
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


Aleke nàwɔ aɖo ZEC ɖa to UA zazã me?

`zcash-cli z_sendmany "fromOaddress" "[{\"address\": \"dOrchardAddress\",\"amount\": 0.0001, \"memo\":\"yourMemoinHex\"}]" <minconf> <fee> <privacyPolicy>`

<img src="https://user-images.githubusercontent.com/81990132/202365280-c184f622-eb7e-4095-bc38-90795121c43c.png" alt="UAsuccess" width="400" height="400"/>
<img src="https://user-images.githubusercontent.com/81990132/202366758-40650460-aaeb-4e03-891f-b4bd08e18234.png" alt="pic" width="400" height="400"/>

    
##### Ele be míade dzesii evea siaa, *tso* KPLE *destination* adrɛswo ateŋu anye transparent,sapling, alo orchard adrɛswo ke hã ateŋu ahiã be nàtrɔ asi le privacyPolicy ƒe aflaga ŋu be asitsatsa la nawɔ dɔ. (Combo aɖewo mawɔ dɔ ne gɔmesese mele privacyPolicy o!)


Afikae mate ŋu akpɔ nyatakaka bubuwo tso UA's ŋu le?

> Kpɔ [Hanh ƒe...](https://medium.com/@hanh425/transaction-privacy-78f80f9f175e) post on asitsatsa ƒe adzamenyawo. Azɔ hã [esia](https://forum.zcashcommunity.com/t/unified-addresses-full-node-rpc-api/41980/2) nyatakaka tso zcash nyamedzroƒea.

> [Nu sia](https://github.com/zcash/zips/issues/470)

     
### Dzɔtsoƒewo

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
