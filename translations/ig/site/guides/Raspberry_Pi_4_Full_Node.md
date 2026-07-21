<a href="https://github.com/zechub/zechub/edit/main/site/guides/Raspberry_Pi_4_Full_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Raspberry Pi 4: a *zcashd* Ntuziaka zuru oke 


Ebumnuche nke ntuziaka a bụ iji nyere aka kụziere ndị Zcashers ndị nwere mmasị na-agba ọsọ zuru oke na Raspberry Pi 4 dị ala.

<img src="https://user-images.githubusercontent.com/81990132/197372541-dcd886ab-a3d0-4614-b490-0294ddf3ffae.png" alt="zcashd" width="700" height="700"/>


## Vidio

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/SGYrzhs1l2k"
    title="How to compile Zcash Node on Raspberry Pi!"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    kweeFullScreen
    loading="lazy"
  />
</div>

## Nkwado

Ọ bụrụ na ị chọpụta na ntuziaka a bara uru, tụlee inye onyinye ZEC iji kwado ZecHub:

`u1rl2zw85dmjc8m4dmqvtstcyvdjn23n0ad53u5533c97affg9jq208du0vf787vfx4vkd6cd0ma4pxkkuc6xe6ue4dlgjvn9dhzacgk9peejwxdn0ksw3v3yf0dy47znruqftfqgf6xpuelle29g2qxquudxsnnen3dvdx8az6w3tggalc4pla3n4jcs8vf4h29ach3zd8enxulush89`


## Ihe ị ga-amụta

```markdown
* How to create a bootable Ubuntu Server microSD card
* How to setup internet connectivity on the Raspberry Pi 4
* How to access your Raspberry Pi 4 remotely
* How to install zcashd
* How to setup zcashd
* How to use zcashd
```


## Ihe ndị a chọrọ

> [8GB Raspberry Pi 4 Canakit](https://www.canakit.com/raspberry-pi-4-starter-max-kit.html) ma ọ bụ ihe yiri ya

> Kọmputa nwere kaadị microSD

> Netwọk Wi-Fi ma ọ bụ eriri ethernet nwere njikọ ịntanetị

> Mpụga SSD / HHD na nkwado USB3


##### edeturu: idebe ihe nkesa gị * abụghị * dị mfe n'ụzọ ọ bụla. Atụmatụ ọ bụla / ndụmọdụ / omume kachasị mma karịa ihe a na-ekwu maka ya na ntuziaka a * biko * mepụta PR ma nyere aka mee ka nduzi a dị ọhụrụ dị ka o kwere mee.



### Kwadebe Kaadị SD

Na nzọụkwụ a, ị ga-emepụta * bootable * SD kaadị nke ga-ekwe ka gị Raspberry Pi 4 buut. Tinye microSD kaadị n'ime kọmputa gị. Ị nwere ike mkpa iji nkwụnye na-abịa na Canakit ma ọ bụ ihe ọ bụla ọzọ kwekọrọ ekwekọ nkwụnye. Wụnye RaspBerry Pi Imager maka sistemụ arụmọrụ gị. Budata nsụgharị maka OS ị nwere ugbu a.
     
     > [Ubuntu](https://downloads.raspberrypi.org/imager/imager_latest_amd64.deb)
     
     > [Windo](https://downloads.raspberrypi.org/imager/imager_latest.exe)
     
     > [macOS](https://downloads.raspberrypi.org/imager/imager_latest.dmg)

Dịka ọmụmaatụ na linux ị ga-ede ihe ndị a mgbe ibudatara:

`sudo dpkg -i imager_latest_amd64.deb`

Mepee Raspberry Pi Imager

`rpi-imager`

<img src="https://user-images.githubusercontent.com/81990132/197372069-fb9f7417-d320-42cf-ad65-38d630512985.png" alt="rpi imager" width="400" height="400"/>

Choose OS and Storage Device. Since Raspberry Pi 4's are 64 bit, I recommend choosing "Other general-purpose OS" => Ubuntu => Ubuntu Server 24.04.3 LTS (64 bit). Click on Storage and select your SD Card. Before writing to SD card, click on Advanced options by clicking on the white gear icon near the bottom right corner.


<img src="https://user-images.githubusercontent.com/81990132/197372159-1169c6f4-f6aa-4f44-9679-fe7aa542bbd3.png" alt="gear" width="200" height="200"/>



N'ebe a ị nwere ike imelite:

```markdown
* Hostname of your Raspberry Pi 4
* Enable SSH
* Create a username and pw
* Enable and configure your wi-fi if needed
```
 
<img src="https://user-images.githubusercontent.com/81990132/197372149-8b85bfac-e473-4808-87cd-f27f15d05de8.png" alt="advanced" width="400" height="400"/>

 
Ozugbo zuru ezu kụrụ Dee


### Bido Ubuntu Server

If you have an extra monitor and keyboard plug those in now. Note: these are optional. Install the SD card you just formatted into the Raspberry Pi 4 and also plug in the External SSD/HHD into the USB3 port. Also plug in the power cord and turn it on.

### Jikọọ na Raspberry Pi 4 gị

Ugbu a, anyị kwesịrị ijikọ na gị Raspberry Pi 4. Ihe anyị chọrọ:

```markdown
* Username and pw (from previous step)
* IP address so we can use SSH
* Monitor, and keyboard (optional)
* If you have a monitor and keyboard connected directly to your pi, the rest of this section can be skipped.
```

Two ways to find your IP address are via your router admin page, or with nmap. If using the router, it depends on which manufacture and I'll defer those details to a quick google search. For nmap, first make sure it is installed:

     `sudo apt-get install nmap`
     
Find the IP address of your current computer and note the first three sections. This is typically 192.168.1.xxx or 192.168.50.xxx. Plug these details into nmap as follows:
          
`sudo nmap -sn 192.168.50.0/24`

or

`sudo nmap -sn 192.168.1.0/24`

Nke a ga-egosipụta ngwaọrụ niile ejikọrọ na netwọkụ ụlọ gị, nke kwesịrị ikpughe adreesị IP / adreesì MAC nke Raspberry Pi 4 gị. Iji aha njirimara gị, pw, na adiresi IP anyị nwere ike ịbanye ugbu a site na iji SSH

```markdown
* ssh <username>@<ip address of your pi> note: you must plugin *your* username and *your* IP address, and *your* pw when prompted.
* For example: `ssh ubuntu@192.168.1.25 where the username is *ubuntu* and IP address is 192.168.1.25.
```


  <img src="https://user-images.githubusercontent.com/81990132/197372846-e1279388-eaaa-4fbb-8d5d-f9928cb45195.png" alt="sshLogin" width="400" height="400"/>
       

Ọ bụrụ na ị chọrọ ịmata ụdị mbipute Raspberry Pi ị na-eji, gbalịa iwu a:

     `cat /sys/firmware/devicetree/base/model ; echo`

  <img src="https://user-images.githubusercontent.com/81990132/197689888-367c8eb3-2667-4c8c-85b3-44d46afe07a7.png" alt="which" width="700" height="400"/>

         

### Ịwụnye *zcashd*

Two ways of installing zcashd include downloading a precompiled binary or compiling zcashd from source. I *highly* recommend compiling from source. For compiling yourself it is highly recommended to cross-compile. Cross-compile is to build on one platform a binary that will run on another platform. One reason for this is Raspberry Pi 4's are low-powered and thus not very fast! Leverage your main computer to help with this. You can grab the latest release [here](https://github.com/zcash/zcash/releases)Iji jikọta ọnụ anyị kwesịrị ijide n'aka na anyị nwere ngwugwu ndị dị mkpa. Wụnye ihe ndị a:

```bash
sudo apt-get install build-essential pkg-config libc6-dev m4 g++-multilib autoconf libtool ncurses-dev unzip git python3 python3-zmq zlib1g-dev curl bsdmainutils automake libtinfo5
sudo apt-get install gcc-aarch64-linux-gnu
```

Ntughari mgbanwe ọzọ n'ime mbipụta zcashd ọhụrụ ebudatara ma gbaa ọsọ:

`HOST=aarch64-linux-gnu ./zcutil/build.sh`
          

### Nhazi *zcashd*

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/9t2LX3HFldw"
    title="Zcashd Wallet Tool - Generate & Import Private Key"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    kweeFullScreen
    loading="lazy"
  />
</div>

---

Ugbu a, ọ dị anyị mkpa ịnyefe faịlụ ọnụọgụ abụọ zcashd niile na Raspberry Pi gị 4. Dịka nke Zcashd v5.3 faịlụ ndị dị mkpa gụnyere:

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
   
#### Mpempe akwụkwọ mpụga
     
Simply copy the files onto the External before you plug it into the Raspberry Pi 4. If you already have a full node synced and want to save time, you can also copy the blocks and chainstate data.
   
` cd ~/.zcash/`
     
Naanị gbaa ọsọ:

```bash
tar -zcvf blocks.tar.gz /blocks
tar -zcvf chainstate.tar.gz /chainstate
```
     
Detuo ihe mgbochi na chainstate .gz faịlụ n'ime mpụga SSD / HDD gị. Na-esote ịwụnye mpụgo SSD / HDD na nchekwa Mgbasa ozi ka ị nwee ike ịhụ ya:

```markdown
lsblk will display all drives connected. Most will be of the format sda
id will show your user and group id's.
```
          
<img src="https://user-images.githubusercontent.com/81990132/197372643-abef88fd-9177-4bf9-abda-3c221188cd10.png" alt="lsblk" width="400" height="400"/>


          
          `sudo mount -o umask=0077,gid=<groupid>,uid=<userid> /dev/sda1 /media/portableHD/`
          
Na-elekwasị anya ma onye nwere folda / faịlụ na ikike.

```bash
sudo chown -R <username>: portableHD
sudo chmod -R 600 portableHD/
```
     
If you copied the blocks and chainstate .gz files from your other computer untar these now. Make sure they are in the .zcash folder on your External drive.

```bash
tar - xvzf blocks.tar.gz
tar - xvzf chainstate.tar.gz
```


Ntọala /media/portableHD/.zcash/zcash.conf

<img src="https://user-images.githubusercontent.com/81990132/197373699-18cc2c9f-b47d-44e9-9e6b-4c5cccf78d9e.png" alt="zconf" width="700" height="400"/>


 
Rịba ama otú anyị si kpaliri dataadir na SSD / HDD nke nwere ohere dị ukwuu. Ebe ọ bụ na ebe nchekwa .zcash ndabara akwagala, anyị kwesịrị ịgwa * zcashd * nke a site na iji njikọ akara ngosi:

```markdown
cp -rp ~/.zcash/* /new_dir         // Make copy of datadir or supply with an external HD
rm -rf ~/.zcash                    // Remove default folder
ln -s /media/portableHD/ ~/.zcash  // Symbolic link new data location to the default so zcashd is happy
```
   

Gbaa edemede fetch-params.sh iji budata data dị mkpa maka zcashd
   
    `./fetch-params.sh`


Malite 'ihuenyo' ọhụrụ [usoro ihe omume na linux ]. Mepee zcashd na -datadir set:

```bash
screen -S zcashScreen`     
./zcashd -datadir=/media/portableHD/.zcash/
```
     
Wepụ ihuenyo ahụ:

`Ctrl+a , Ctrl+d`


Mepụta aha njirimara nke mere na ị gaghị edepụta iwu ebe data ndị a niile

     `alias zcash-cli="./zcash-cli -datadir=/media/portableHD/.zcash/"`


Dị njikere iji ya!

    `zcash-cli getblockchaininfo`

  <img src="https://user-images.githubusercontent.com/81990132/197373098-672aa228-d180-47ea-8a7c-c58dc3882426.png" alt="getblockchaininfo" width="400" height="400"/>



### Iji *zcashd*

<iframe class="w-full h-auto md:h-96" src="https://www.youtube.com/embed/KNhd1KC0Bqk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

---

Kedu ka ị si enyocha ọnọdụ nke ọnụ gị?

     `tail -n 500 <path to>/.zcash/debug.log`

  <img src="https://user-images.githubusercontent.com/81990132/197684416-9a083de4-4a62-4fe8-9cab-798781b38cd2.png" alt="status" width="700" height="400"/>


  
     
Iji nweta elu ugbu a site na log gị

     `tail -n 10 <path to>/.zcash/debug.log | grep -o  'height=[^b]*'`

  <img src="https://user-images.githubusercontent.com/81990132/199630447-6a6cd491-0cb3-47f8-95f0-45f6b6555870.png" alt="logHeight" width="500" height="400"/>


     
     `zcash-cli getinfo`
  
<img src="https://user-images.githubusercontent.com/81990132/199646508-132da0eb-899e-49a6-8b31-e9011e159700.png" alt="getInfo" width="400" height="400"/>

     
     
Kedụ ka ị ga-esi zipụ akwụkwọ ozi?](https://zcash.readthedocs.io/en/latest/rtd_pages/memos.html), budata *ascii2hex* na *hex2ascii* ma mee ka ha rụọ ọrụ 

`chmod +x ascii2hex hex2ascii`
          
Mepụta ihe ncheta ma gbanwee ya na hex. Ị nwere ike ịgbanwe azụ na ascii iji nwalee.
          
<img src="https://user-images.githubusercontent.com/81990132/199646812-782142d6-8846-443a-8dd9-4f332e49d3e9.png" alt="asciiGOOD" width="400" height="400"/>


  
Mepụta azụmahịa z2z (Sapling) na-eji nsụgharị hex nke memo gị site n'elu

`zcash-cli z_sendmany "ztestsapling1kg3u0y7szv6509732at34alct46cyn0g26kppgf2a7h5tpqxldtwm7cmhf8rqmhgt" "[{\"address\": \"ztestsapling2kg3u0y7szv6509732at34alct46cyn0g26kppgf2a7h5tpqxldtwm7cmhf8rqmhgtmpakcz5mdv\",\"amount\": 0.0001, \"memo\":\"5A656348756221\"}]"`

Kedu ka ị ga-esi maliteghachi ZcashScreen gị mgbe ị wepụrụ ya?

`screen -r zcashScreen`
     
Kedụ ka ị ga-esi kwụsị *zcashd*?

`zcash-cli stop`
     
Kedụ ka ị ga-esi mepụta UA?

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


Kedụ ka ị ga-esi zipụ ZEC site na iji UA?

`zcash-cli z_sendmany "fromOaddress" "[{\"address\": \"dOrchardAddress\",\"amount\": 0.0001, \"memo\":\"yourMemoinHex\"}]" <minconf> <fee> <privacyPolicy>`

<img src="https://user-images.githubusercontent.com/81990132/202365280-c184f622-eb7e-4095-bc38-90795121c43c.png" alt="UAsuccess" width="400" height="400"/>
<img src="https://user-images.githubusercontent.com/81990132/202366758-40650460-aaeb-4e03-891f-b4bd08e18234.png" alt="pic" width="400" height="400"/>

    
##### It should be noted both, *from* AND *destination* addresses can be transparent,sapling, or orchard addresses however you may need to adjust the privacyPolicy flag in order for the transation to be valid. (Some combos wont work if privacyPolicy doesn't make sense!)


Ebee ka m nwere ike ịchọta ihe ọmụma ndị ọzọ gbasara UA?

> Lelee [Hanh's](https://medium.com/@hanh425/transaction-privacy-78f80f9f175e) post na azụmahịa nzuzo. Ọzọkwa [nke a](https://forum.zcashcommunity.com/t/unified-addresses-full-node-rpc-api/41980/2) post site na nzukọ Zcash.

> [Nke a](https://github.com/zcash/zips/issues/470)

     
### Isi mmalite

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
