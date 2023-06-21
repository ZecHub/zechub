# ![raspi](https://user-images.githubusercontent.com/81990132/197372285-1f413bc5-13a0-4671-9c81-760eafdda926.png)Raspberry Pi 4: a *zcashd* Full node guide 

Lengo la mwongozo huu ni kusaidia kuwaelimisha watumiaji wa Zcash ambao wana nia ya kuendesha nodi kamili kwenye Raspberry Pi 4 yenye nguvu ndogo.

![zcashdPI](https://user-images.githubusercontent.com/81990132/197372541-dcd886ab-a3d0-4614-b490-0294ddf3ffae.png)

Ikiwa unapata mwongozo huu kuwa na manufaa, fikiria kuchangia ZEC kusaidia ZecHub:

`zs1txa9wzxsc46w4940c4t76wjlylhntyp7vcppsp8re32z02srqse038melgglew4jwsh3qes4m4n`

## Mambo utakayojifunza:
* Jinsi ya kuunda kadi ya Ubuntu Server inayoweza kuzinduka kutoka kwenye kadi ya microSD
* Jinsi ya kusanidi uunganisho wa mtandao kwenye Raspberry Pi 4
* Jinsi ya kupata Raspberry Pi 4 yako kijijini
* Jinsi ya kusakinisha *zcashd*
* Jinsi ya kusanidi *zcashd*
* Jinsi ya kutumia *zcashd*

## Mahitaji ya awali
* [8GB Raspberry Pi 4 Canakit](https://www.canakit.com/raspberry-pi-4-starter-max-kit.html) au sawa
* Kompyuta yenye kichomeka kadi ya microSD
* Mtandao wa Wi-Fi au kebo ya Ethernet na uunganisho waintaneti
* Hifadhi ya nje ya SSD/HDD yenye msaada wa USB3

##### Taarifa: Kuweka server yako salama sio rahisi kwa njia yoyote. Ikiwa una vidokezo/ushauri/mazoea bora zaidi ambayo hayajazungumziwa katika mwongozo huu, tafadhali chukua hatua na saidia kuweka mwongozo huu kuwa wa kisasa iwezekanavyo kwa kufungua Ombi la Ushirikiano (PR).

## Yaliyomo:
* [Tayarisha Kadi ya SD](https://github.com/ZecHub/zechub/blob/main/site/guides/RaspberryPi4FullNode.md#prepare-the-sd-card)
* [Zindua Ubuntu Server](https://github.com/ZecHub/zechub/blob/main/site/guides/RaspberryPi4FullNode.md#boot-ubuntu-server)
* [Unganisha Kijijini kwenye Raspberry Pi 4](https://github.com/ZecHub/zechub/blob/main/site/guides/RaspberryPi4FullNode.md#connect-remotely-to-your-raspberry-pi-4)
* [Sakinisha *zcashd*](https://github.com/ZecHub/zechub/blob/main/site/guides/RaspberryPi4FullNode.md#installing-zcashd)
* [Sanidi *zcashd*](https://github.com/ZecHub/zechub/blob/main/site/guides/RaspberryPi4FullNode.md#setup-zcashd)
* [Matumizi ya *zcashd*](https://github.com/ZecHub/zechub/blob/main/site/guides/RaspberryPi4FullNode.md#using-zcashd)
* [Vyanzo](https://github.com/ZecHub/zechub/blob/main/site/guides/RaspberryPi4FullNode.md#sources)

### Tayarisha Kadi ya SD

Katika hatua hii utaunda kadi ya SD inayoweza *kuzinduka* ambayo itawezesha Raspberry Pi 4 yako kuanza.

* ngiza kadi ya microSD kwenye kompyuta yako. Huenda ukahitaji kutumia kichomeka ambacho kinakuja na Canakit au kichomeka chochote kingine kinacholingana.
* Sakinisha Raspberry Pi Imager kulingana na mfumo wako wa uendeshaji.
     
     * [Ubuntu](https://downloads.raspberrypi.org/imager/imager_latest_amd64.deb)
     * [Windows](https://downloads.raspberrypi.org/imager/imager_latest.exe)
     * [macOS](https://downloads.raspberrypi.org/imager/imager_latest.dmg)

Kwa mfano, katika Linux, unaweza kuingiza amri ifuatayo baada ya kupakua:

`sudo dpkg -i imager_latest_amd64.deb`

* Fungua Raspberry Pi Imager

`rpi-imager`

![rpi-imager](https://user-images.githubusercontent.com/81990132/197372069-fb9f7417-d320-42cf-ad65-38d630512985.png)

* Chagua OS na Kifaa cha Kuhifadhi. Kwa kuwa Raspberry Pi 4 ni ya 64-bit, napendekeza kuchagua "Other general-purpose OS" => Ubuntu => Ubuntu Server 22.10 (64 bit). Bonyeza kwenye Uhifadhi na chagua Kadi yako ya SD.

* Kabla ya kuandika kwenye kadi ya SD, bonyeza chaguo za ziada kwa kubonyeza ishara ya gia nyeupe karibu na kona ya chini kulia.

![gear](https://user-images.githubusercontent.com/81990132/197372159-1169c6f4-f6aa-4f44-9679-fe7aa542bbd3.png)


* Hapa unaweza kusasisha::

     *  Jina la mwenyeji wa Raspberry Pi 4
     * Kuwezesha SSH
     * Kuunda jina la mtumiaji na pw
     * Kuwezesha na kusanidi Wi-Fi yako ikihitajika
 
 ![Chaguzi za ziada](https://user-images.githubusercontent.com/81990132/197372149-8b85bfac-e473-4808-87cd-f27f15d05de8.png)

* Ukimaliza finya Write

### Boot Ubuntu Server

Ikiwa una skrini na kibodi ziada, chomeka sasa. Kumbuka: hizi ni za hiari.

Sakinisha kadi ya SD uliyounda kwenye Raspberry Pi 4 na pia chomeka Hifadhi ya Nje ya SSD/HHD kwenye bandari ya USB3. Pia chomeka waya wa umeme na uizime.

### Unganisha kijijini kwenye Raspberry Pi 4 yako

* Sasa tunahitaji kuunganisha kwenye Raspberry Pi 4 yako. Vitu tunavyohitaji ni:
     * Jina la mtumiaji na nywila (kutoka hatua iliyopita)
     * Anwani ya IP ili tuweze kutumia SSH
     * Skrini na kibodi (hiari)

* Ikiwa una skrini na kibodi vilivyounganishwa moja kwa moja na Raspberry Pi yako, sehemu iliyobaki ya hatua hii inaweza kusongezwa.

* Kuna njia mbili za kupata anwani yako ya IP, ambayo ni kupitia ukurasa wa usimamizi wa router yako au kutumia nmap. Ikiwa utatumia router, inategemea mtengenezaji na nitatoa maelezo hayo kwa utafutaji wa haraka kwenye Google.

     * Ukitumia nmap, kwanza hakikisha kuwa imewekwa

     `sudo apt-get install nmap`
     
     * Tafuta anwani ya IP ya kompyuta yako ya sasa na andika sehemu tatu za kwanza. Kawaida ni  192.168.1.xxx au 192.168.50.xxx

     * Weka maelezo haya katika nmap kama ifuatavyo:
          
          * `sudo nmap -sn 192.168.50.0/24` au `sudo nmap -sn 192.168.1.0/24`
          * Hii itaonyesha vifaa vyote vilivyounganishwa kwenye mtandao wako wa nyumbani, ambavyo vinaonyesha anwani ya IP ya Raspberry Pi 4 yako / anwani ya MAC.
          
* Kutumia jina lako la mtumiaji, nywila, na anwani ya IP, sasa tunaweza kuingia kwa kutumia SSH

     * `ssh <jina lako la mtumiaji>@<anwani ya IP ya Raspberry Pi yako>` kumbuka: lazima uweke jina lako la mtumiaji na anwani yako ya IP, na nywila yako unapoulizwa.

     * Kwa mfano: `ssh ubuntu@192.168.1.25` ambapo jina la mtumiaji ni *ubuntu* na anwani ya IP ni 192.168.1.25.

   ![sshLogin](https://user-images.githubusercontent.com/81990132/197372846-e1279388-eaaa-4fbb-8d5d-f9928cb45195.png)
       
* Ikiwa unataka kujua ni toleo gani la Raspberry Pi unatumia, jaribu amri hii:

     `cat /sys/firmware/devicetree/base/model ; echo`
     
     ![Upi](https://user-images.githubusercontent.com/81990132/197689888-367c8eb3-2667-4c8c-85b3-44d46afe07a7.png)
         
### Kusakinisha *zcashd*

* Kuna njia mbili za kusakinisha zcashd, ambazo ni kupakua binary iliyopachikwa tayari au kusakinisha zcashd kutoka chanzo. Napendekeza sana kusakinisha kutoka chanzo.

     * Ikiwa unapakua binary iliyopachikwa tayari, chanzo kimoja ni [adityapk00](https://github.com/adityapk00/zcash/releases) . Kumbuka kwamba tukiendesha OS ya 64 bit, tunataka zcash-linux-aarch64-v*.tar.gz. Pia kumbuka kuwa toleo la karibuni la zcashd mara chache linapachikwa tayari

     * Kwa kusakinisha kutoka chanzo, inapendekezwa sana kusakinisha kutoka chanzo kingine cha kusakinishia kwenye jukwaa lingine. Kusakinisha kutoka chanzo kingine cha kusakinishia ni kujenga kwenye jukwaa moja faili ya binary ambayo itaendesha kwenye jukwaa lingine. Moja ya sababu ni kwamba Raspberry Pi 4 ni chombo chenye nguvu ndogo, na kwa hivyo siyo haraka sana! Tumia kompyuta yako kuu ili kusaidia na hili. Unaweza kupata toleo jipya zaidi[hapa](https://github.com/zcash/zcash/releases).

     * kusakinisha kutoka chanzo kingine cha kusakinishia, tunahitaji kuhakikisha kuwa tuna paketi zinazohitajika. Sakinisha Zifuatazo

          * `sudo apt-get install build-essential pkg-config libc6-dev m4 g++-multilib autoconf libtool ncurses-dev unzip git python3 python3-zmq zlib1g-dev curl bsdmainutils automake libtinfo5`

          * `sudo apt-get install gcc-aarch64-linux-gnu`

     * Kisha nenda kwenye saraka iliyopakuliwa ya toleo jipya la zcashd na endesha amri ifuatayo:

          `HOST=aarch64-linux-gnu ./zcutil/build.sh`
          
     * https://www.youtube.com/watch?v=MIgkTW9Rfzs

### Usanidi *zcashd*

*  Sasa tunahitaji kuhamisha faili zote za zcashd kwenye Raspberry Pi 4 yako. Kuanzia Zcashd v5.3, faili zinazohitajika ni pamoja na:
     
     `zcashd`
     `zcash-cli`
     `zcash-tx`
     `zcash-gtest`
     `zcash-inspect`
     `zcashd-wallet-tool`
     `fetch-params.sh`

* Faili hizi zinapatikana kwenye saraka ya /src ya mahali pa kupakua toleo lako jipya ikiwa uliendeleza mwenyewe. Vinginevyo, faili zilizopakuliwa kabla ziko mahali ulipakua 
         
* Njia mbili za kufanikisha uhamishaji huo ni kwa kutumia SFTP au kwa kutumia kifaa chako cha External.

     *SFTP*

    `sftp username@<ip of RaspberryPi4>`
    
    `put zcashd`
    
    `put zcash-cli`
    
    `put zcash-tx`
    
    `put zcash-gtest`
    
    `put zcash-inspect`
    
    `put zcashd-wallet-tool`
    
    `put fetch-params.sh`
   
     *AU*
     
     Sawazisha tu faili kwenye Kifaa cha External kabla ya kukiunganisha kwenye Raspberry Pi 4
     
* Ikiwa tayari una node kamili imefungwa na unataka kuokoa muda, unaweza pia kunakili data ya blocks na chainstate.
   
    ` cd ~/.zcash/`
     
    * Fanya tu:

     `tar -zcvf blocks.tar.gz /blocks`
     `tar -zcvf chainstate.tar.gz /chainstate` 
     
    * Nakili faili za blocks na chainstate .gz kwenye External SSD/HDD yako.

 * Kutumia External SSD/HDD kwenye Raspberry Pi 4 yako

     *  Sakinisha External SSD/HDD kwenye saraka ya Media ili uweze kuiona:
     
          `lsblk` itaonyesha diski zote zilizounganishwa. Kwa kawaida, zitakuwa na muundo wa sda
          
          `id` itaonyesha kitambulisho chako cha mtumiaji na kikundi cha mtumiaji.
          
          ![lsblk](https://user-images.githubusercontent.com/81990132/197372643-abef88fd-9177-4bf9-abda-3c221188cd10.png)

          `sudo mount -o umask=0077,gid=<groupid>,uid=<userid> /dev/sda1 /media/portableHD/`
          
     * Endelea kuangalia mmiliki wa saraka/faili na pia ruhusa za upatikanaji.

          `sudo chown -R <username>: portableHD`
          `sudo chmod -R 700 portableHD/`
     
     * Ikiwa umekopi faili za blocks na chainstate za .gz kutoka kompyuta yako nyingine, sasa fanya utaratibu wa kuondoa kamba. Hakikisha ziko kwenye saraka ya .zcash kwenye kifaa chako cha nje.

          `tar - xvzf blocks.tar.gz`
          `tar - xvzf chainstate.tar.gz`

* Setup /media/portableHD/.zcash/zcash.conf

![zconf](https://user-images.githubusercontent.com/81990132/197373699-18cc2c9f-b47d-44e9-9e6b-4c5cccf78d9e.png)

* Kumbuka jinsi tulivyohamisha datadir kwenye External SSD/HDD ambayo ina nafasi zaidi iliyopo.
     
* Kwa kuwa mahali pa chaguo-msingi la saraka ya .zcash limehamishiwa, tunahitaji kuambia *zcashd* kwa kutumia viungo ishara (symbolic links):

   `cp -rp ~/.zcash/* /new_dir `            // Fanya nakala ya saraka ya datadir au itumie diski ngumu ya nje.
   
   `rm -rf ~/.zcash`                        // Ondoa saraka ya chaguo-msingi.
   
   `ln -s /media/portableHD/ ~/.zcash`     // Tengeneza kiunga ishara (symbolic link) kutoka eneo jipya la data kwenda eneo la chaguo-msingi ili zcashd iweze kufanya kazi vizuri.

* Anza fetch-params.sh script Kupakua data muhimu kwa ajili ya zcashd.
   
    `./fetch-params.sh`

* Anza 'screen' [ programu ndani ya linux]. Fungua zcashd na weka -datadir :

     * `screen -S zcashScreen`
     
     * `./zcashd -datadir=/media/portableHD/.zcash/`
     
     * Weka skrini kando.. `Ctrl+a , Ctrl+d`

* Tengeneza alama ili usilazimike kuandika maagizo yote ya eneo la data ya ziada.

     `alias zcash-cli="./zcash-cli -datadir=/media/portableHD/.zcash/"`

* Tayari kutumia!

    `zcash-cli getblockchaininfo`
    
    ![getBlockchaininfo](https://user-images.githubusercontent.com/81990132/197373098-672aa228-d180-47ea-8a7c-c58dc3882426.png)

### Using *zcashd*

* Jinsi ya kuangalia hali ya node yako?

     `tail -n 500 <path to>/.zcash/debug.log`
     
     ![status](https://user-images.githubusercontent.com/81990132/197684416-9a083de4-4a62-4fe8-9cab-798781b38cd2.png)
     
* kupata urefu wa sasa kutoka kwenye kumbukumbu yako.

     `tail -n 10 <path to>/.zcash/debug.log | grep -o  'height=[^b]*'`
     
     ![logHeight](https://user-images.githubusercontent.com/81990132/199630447-6a6cd491-0cb3-47f8-95f0-45f6b6555870.png)

     `zcash-cli getinfo`
     
     ![getinfo](https://user-images.githubusercontent.com/81990132/199646508-132da0eb-899e-49a6-8b31-e9011e159700.png)

* Unatuma muamala vipi?

     * As seen [here](https://zcash.readthedocs.io/en/latest/rtd_pages/memos.html), download 

         `ascii2hex`
         
          na
          
         `hex2ascii`
         
     *  Fanya kuwa na uwezo wa kutekelezwa

          `chmod +x ascii2hex hex2ascii`
          
     * Kuunda muamala wa z2z  kwa kutumia tole la hex.Unaweza kubadilisha tena kuwa ASCII ili kufanya majaribio 
          
        ![asciiGOOD](https://user-images.githubusercontent.com/81990132/199646812-782142d6-8846-443a-8dd9-4f332e49d3e9.png)

  
     * Tengeneza muamala wa z2z (Sapling) ukitumia toleo la hex la ujumbe wako uliotajwa hapo juu.

          `zcash-cli z_sendmany "ztestsapling1kg3u0y7szv6509732at34alct46cyn0g26kppgf2a7h5tpqxldtwm7cmhf8rqmhgt" "[{\"address\": \"ztestsapling2kg3u0y7szv6509732at34alct46cyn0g26kppgf2a7h5tpqxldtwm7cmhf8rqmhgtmpakcz5mdv\",\"amount\": 0.0001, \"memo\":\"5A656348756221\"}]"`

* Jinsi ya kuendeleza kiolesura cha zcashScreen baada ya kuondoka?

     `screen -r zcashScreen`
     
* Jinsi ya kusitisha *zcashd* ?

     `zcash-cli stop`
     
* Jinsi ya kuunda UA?

     `zcash-cli z_getnewaccount`
     
    ![newAccount](https://user-images.githubusercontent.com/81990132/202352436-04c17be2-e914-4b9b-95d1-00cf6fc496d3.png)
    
   * Sasa jenga mpokeaji wa UA kulingana na mahitaji yako. Hii ni pamoja na Orchard pekee, Orchard + Sapling, na hatimaye Orchard + Sapling + Transparent.
   
   * Tafadhali kumbuka unaweza kutofautisha wapokeaji kwa urefu wao.

     ![chars](https://user-images.githubusercontent.com/81990132/202354319-2da6be33-ca95-4b6b-b29c-14805dcb9c21.png)

     `zcash-cli z_getaddressforaccount 0 '["orchard"]'`
     
     ![uaOrchard](https://user-images.githubusercontent.com/81990132/202353642-c36b5fea-de8a-41f6-a27c-d9ff42a0c8d3.png)
     ![OrchQR](https://user-images.githubusercontent.com/81990132/202355586-eaeb36e7-b000-4b99-8192-81e5002e6f11.png)

     `zcash-cli z_getaddressforaccount 0 '["orchard","sapling"]'`
     
     ![uaOrchardSapling](https://user-images.githubusercontent.com/81990132/202353732-740828e3-77b8-4684-8cf8-fb14256b1e61.png)
     ![OrchSapQR](https://user-images.githubusercontent.com/81990132/202355596-c7b62854-9a9e-4627-ab5d-51091340de71.png)

     `zcash-cli z_getaddressforaccount 0 '["orchard","sapling","p2pkh"]'`
     
     ![uaFull](https://user-images.githubusercontent.com/81990132/202353793-3331c593-5286-4b84-93a7-adc4928839fd.png)
     ![FullQR](https://user-images.githubusercontent.com/81990132/202355607-75de0750-2a57-4e10-883b-e0a626ed892a.png)


* Jinsi ya kutuma ZEC kwa kutumia UA?

     `zcash-cli z_sendmany "fromOaddress" "[{\"address\": \"dOrchardAddress\",\"amount\": 0.0001, \"memo\":\"yourMemoinHex\"}]" <minconf> <fee> <privacyPolicy>`
     
    ![UAsuccess](https://user-images.githubusercontent.com/81990132/202365280-c184f622-eb7e-4095-bc38-90795121c43c.png)
    
    ![pic](https://user-images.githubusercontent.com/81990132/202366758-40650460-aaeb-4e03-891f-b4bd08e18234.png)

    ##### Inafaa kuzingatiwa kuwa anwani za kutoka NA kwenda zinaweza kuwa anwani za uwazi (transparent), sapling, au orchard, hata hivyo unaweza kulazimika kurekebisha bendera ya privacyPolicy ili uhamisho uwe halali. (Baadhi ya mchanganyiko hautafanya kazi ikiwa privacyPolicy haifanyi maana!)

* Unaweza kupata habari zaidi kuhusu UAs (User Agents) wapi?

     * Angalia [Hanh's](https://medium.com/@hanh425/transaction-privacy-78f80f9f175e) machapisho kuhusu faragha ya uhamisho. Pia [hii](https://forum.zcashcommunity.com/t/unified-addresses-full-node-rpc-api/41980/2) machapisho kutoka kwenye jukwaa la Zcash.
     * [Hii](https://github.com/zcash/zips/issues/470)

### Rasilimali
* https://ubuntu.com/tutorials/how-to-install-ubuntu-on-your-raspberry-pi#1-overview
* https://github.com/zcash/zcash
* https://zcash.readthedocs.io/en/latest/rtd_pages/Debian-Ubuntu-build.html
* https://zcash.readthedocs.io/en/latest/rtd_pages/memos.html
* https://en.wikipedia.org/wiki/Secure_Shell
* https://itsfoss.com/how-to-find-what-devices-are-connected-to-network-in-ubuntu/
* https://youtu.be/YS5Zh7KExvE
* https://twitter.com/BostonZcash/status/1531798627512877059
* https://forum.zcashcommunity.com/t/unified-addresses-full-node-rpc-api/41980/2
* https://medium.com/@hanh425/transaction-privacy-78f80f9f175e
* https://znewsletter.netlify.app/
* https://github.com/zcash/zips/issues/470
* https://zips.z.cash/protocol/nu5.pdf#unifiedpaymentaddrencoding