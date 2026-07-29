<a href="https://github.com/zechub/zechub/edit/main/site/guides/Raspberry_Pi_4_Full_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Raspberry Pi 4: bir *zcashd* Tam düğüm rehberi


Bu rehberin amacı, düşük güçlü bir Raspberry Pi 4 üzerinde tam düğüm çalıştırmakla ilgilenen Zcash kullanıcılarını eğitmeye yardımcı olmaktır.

<img src="https://user-images.githubusercontent.com/81990132/197372541-dcd886ab-a3d0-4614-b490-0294ddf3ffae.png" alt="zcashd" width="700" height="700"/>


## Video

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/SGYrzhs1l2k"
    title="How to compile Zcash Node on Raspberry Pi!"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

## Destek

Bu rehberi faydalı bulursanız, ZecHub’i desteklemek için ZEC bağış yapmayı düşünebilirsiniz:

`u1rl2zw85dmjc8m4dmqvtstcyvdjn23n0ad53u5533c97affg9jq208du0vf787vfx4vkd6cd0ma4pxkkuc6xe6ue4dlgjvn9dhzacgk9peejwxdn0ksw3v3yf0dy47znruqftfqgf6xpuelle29g2qxquudxsnnen3dvdx8az6w3tggalc4pla3n4jcs8vf4h29ach3zd8enxulush89`


## Ne öğreneceksiniz

```markdown
* How to create a bootable Ubuntu Server microSD card
* How to setup internet connectivity on the Raspberry Pi 4
* How to access your Raspberry Pi 4 remotely
* How to install zcashd
* How to setup zcashd
* How to use zcashd
```


## Ön Koşullar

> [8GB Raspberry Pi 4 Canakit](https://www.canakit.com/raspberry-pi-4-starter-max-kit.html) veya eşdeğeri

> microSD kart sürücüsüne sahip bir bilgisayar

> İnternet bağlantısı olan bir Wi‑Fi ağı veya bir ethernet kablosu

> USB3 destekli harici SSD/HHD


##### not: sunucunuzu güvende tutmak *hiç de* basit bir iş değildir. Bu kılavuzda ele alınanların ötesinde herhangi bir ipucu/tavsiye/en iyi uygulama biliyorsanız *lütfen* bir PR oluşturun ve bu kılavuzun mümkün olduğunca güncel kalmasına yardımcı olun.



### SD Kartı Hazırlayın

Bu adımda, Raspberry Pi 4'ünüzün açılmasını sağlayacak *önyüklenebilir* bir SD kart oluşturacaksınız. microSD kartı bilgisayarınıza takın. Canakit ile birlikte gelen adaptörü veya buna eşdeğer başka bir adaptörü kullanmanız gerekebilir. İşletim sisteminiz için Raspberry Pi Imager'ı kurun. Şu anda erişiminiz olan işletim sistemi için olan sürümü indirin.
     
> [Ubuntu](https://downloads.raspberrypi.org/imager/imager_latest_amd64.deb)
     
> [Windows](https://downloads.raspberrypi.org/imager/imager_latest.exe)
     
> [macOS](https://downloads.raspberrypi.org/imager/imager_latest.dmg)

Örneğin Linux'ta, indirdikten sonra aşağıdakini yazarsınız:

`sudo dpkg -i imager_latest_amd64.deb`

Raspberry Pi Imager'ı Açın

`rpi-imager`

<img src="https://user-images.githubusercontent.com/81990132/197372069-fb9f7417-d320-42cf-ad65-38d630512985.png" alt="rpi imager" width="400" height="400"/>

İşletim Sistemini ve Depolama Aygıtını seçin. Raspberry Pi 4’ler 64 bit olduğu için, "Other general-purpose OS" => Ubuntu => Ubuntu Server 24.04.3 LTS (64 bit) seçmenizi öneririm. Storage’a tıklayın ve SD Kartınızı seçin. SD karta yazmadan önce, sağ alt köşeye yakın beyaz dişli simgesine tıklayarak Advanced options’ı açın.


<img src="https://user-images.githubusercontent.com/81990132/197372159-1169c6f4-f6aa-4f44-9679-fe7aa542bbd3.png" alt="gear" width="200" height="200"/>



Çevrilecek Markdown parçası mesajda yer almıyor. Lütfen İngilizce fragmenti buraya yapıştırın; ben de yalnızca Türkçe çeviriyi, aynı Markdown yapısını koruyarak döndüreyim.

```markdown
* Hostname of your Raspberry Pi 4
* Enable SSH
* Create a username and pw
* Enable and configure your wi-fi if needed
```
 
<img src="https://user-images.githubusercontent.com/81990132/197372149-8b85bfac-e473-4808-87cd-f27f15d05de8.png" alt="advanced" width="400" height="400"/>

 
Çevrilecek Markdown parçasını paylaşın lütfen.


### Ubuntu Server'ı Başlatın

Ek bir monitörünüz ve klavyeniz varsa şimdi bunları bağlayın. Not: bunlar isteğe bağlıdır. Az önce biçimlendirdiğiniz SD kartı Raspberry Pi 4’e takın ve ayrıca Harici SSD/HHD’yi USB3 portuna bağlayın. Güç kablosunu da takın ve cihazı açın.

### Raspberry Pi 4’ünüze uzaktan bağlanın

Şimdi Raspberry Pi 4'ünüze bağlanmamız gerekiyor. İhtiyacımız olanlar:

```markdown
* Username and pw (from previous step)
* IP address so we can use SSH
* Monitor, and keyboard (optional)
* If you have a monitor and keyboard connected directly to your pi, the rest of this section can be skipped.
```

IP adresinizi bulmanın iki yolu vardır: yönlendiricinizin yönetici sayfası üzerinden veya `nmap` ile. Yönlendiriciyi kullanıyorsanız, bu hangi üretici olduğuna bağlıdır; bu ayrıntılar için sizi hızlı bir Google aramasına yönlendireceğim. `nmap` için önce kurulu olduğundan emin olun:

`sudo apt-get install nmap`
     
Mevcut bilgisayarınızın IP adresini bulun ve ilk üç bölümü not edin. Bu genellikle `192.168.1.xxx` veya `192.168.50.xxx` şeklindedir. Bu ayrıntıları aşağıdaki gibi `nmap` içine girin:
          
`sudo nmap -sn 192.168.50.0/24`

Çevrilecek Markdown parçası eksik görünüyor. Lütfen fragmenti gönder; yalnızca Türkçe çeviriyi döndüreceğim.

`sudo nmap -sn 192.168.1.0/24`

Bu, ev ağınıza bağlı tüm cihazları gösterecektir; bu da Raspberry Pi 4’ünüzün IP adresini / MAC adresini ortaya çıkarmalıdır. Kullanıcı adınızı, parolanızı ve IP adresinizi kullanarak artık SSH ile giriş yapabiliriz.

```markdown
* ssh <username>@<ip address of your pi> note: you must plugin *your* username and *your* IP address, and *your* pw when prompted.
* For example: `ssh ubuntu@192.168.1.25 where the username is *ubuntu* and IP address is 192.168.1.25.
```


<img src="https://user-images.githubusercontent.com/81990132/197372846-e1279388-eaaa-4fbb-8d5d-f9928cb45195.png" alt="sshLogin" width="400" height="400"/>
       

Hangi Raspberry Pi sürümünü kullandığınızı merak ediyorsanız, şu komutu deneyin:

`cat /sys/firmware/devicetree/base/model ; echo`

<img src="https://user-images.githubusercontent.com/81990132/197689888-367c8eb3-2667-4c8c-85b3-44d46afe07a7.png" alt="which" width="700" height="400"/>

         

### *zcashd* Kurulumu

zcashd kurmanın iki yolu vardır: önceden derlenmiş bir ikili dosya indirmek veya zcashd’i kaynak koddan derlemek. Ben *kesinlikle* kaynak koddan derlemenizi tavsiye ederim. Kendiniz derleyecekseniz, çapraz derleme yapmanız şiddetle önerilir. Çapraz derleme, bir platformda başka bir platformda çalışacak bir ikili dosya oluşturmaktır. Bunun bir nedeni de Raspberry Pi 4’lerin düşük güçlü olması ve bu yüzden çok hızlı olmamasıdır! Bu konuda yardımcı olması için ana bilgisayarınızın gücünden yararlanın. En son sürümü [buradan](https://github.com/zcash/zcash/releases) alabilirsiniz. Çapraz derleme yapmak için gerekli paketlere sahip olduğumuzdan emin olmamız gerekir. Aşağıdakileri yükleyin:

```bash
sudo apt-get install build-essential pkg-config libc6-dev m4 g++-multilib autoconf libtool ncurses-dev unzip git python3 python3-zmq zlib1g-dev curl bsdmainutils automake libtinfo5
sudo apt-get install gcc-aarch64-linux-gnu
```

Ardından yeni indirilen zcashd sürümünün dizinine geçin ve şunu çalıştırın:

`HOST=aarch64-linux-gnu ./zcutil/build.sh`
          

### Kurulum *zcashd*

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/9t2LX3HFldw"
    title="Zcashd Wallet Tool - Generate & Import Private Key"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

Lütfen çevrilecek Markdown parçasını gönderin.

Şimdi tüm zcashd ikili dosyalarını Raspberry Pi 4’ünüze aktarmamız gerekiyor. Zcashd v5.3 itibarıyla gerekli dosyalar şunlardır:

```markdown
zcashd
zcash-cli
zcash-tx
zcash-gtest
zcash-inspect
zcashd-wallet-tool
fetch-params.sh
```

Bu dosyalar, eğer kendiniz derlediyseniz en son sürüm indirme konumunuzun `/src` dizininde bulunur. Aksi takdirde, önceden derlenmiş dosyalar onları indirdiğiniz yerde bulunur. Aktarımları gerçekleştirmenin iki yolu ise SFTP kullanmak veya Harici sürücünüzü kullanmaktır.

#### SFTP

```bash
sftp username@<ip of RaspberryPi4>
put zcash*
```
   
#### Harici Kopya
     
Dosyaları Raspberry Pi 4'e takmadan önce harici diske kopyalamanız yeterlidir. Zaten senkronize edilmiş tam bir düğümünüz varsa ve zaman kazanmak istiyorsanız, `blocks` ve `chainstate` verilerini de kopyalayabilirsiniz.
   
` cd ~/.zcash/`
     
Sadece şunu çalıştırın:

```bash
tar -zcvf blocks.tar.gz /blocks
tar -zcvf chainstate.tar.gz /chainstate
```
     
Blokları ve chainstate `.gz` dosyalarını Harici SSD/HDD’nize kopyalayın. Ardından, görebilmeniz için Harici SSD/HDD’yi Media klasörüne bağlayın:

```markdown
lsblk will display all drives connected. Most will be of the format sda
id will show your user and group id's.
```
          
<img src="https://user-images.githubusercontent.com/81990132/197372643-abef88fd-9177-4bf9-abda-3c221188cd10.png" alt="lsblk" width="400" height="400"/>


          
`sudo mount -o umask=0077,gid=<groupid>,uid=<userid> /dev/sda1 /media/portableHD/`
          
Hem klasörlerin/dosyaların sahipliğine hem de izinlere dikkat edin.

```bash
sudo chown -R <username>: portableHD
sudo chmod -R 600 portableHD/
```
     
Diğer bilgisayarınızdan blokları ve chainstate `.gz` dosyalarını kopyaladıysanız, şimdi bunların arşivini açın. Harici sürücünüzdeki `.zcash` klasöründe olduklarından emin olun.

```bash
tar - xvzf blocks.tar.gz
tar - xvzf chainstate.tar.gz
```


Kurulum /media/portableHD/.zcash/zcash.conf

<img src="https://user-images.githubusercontent.com/81990132/197373699-18cc2c9f-b47d-44e9-9e6b-4c5cccf78d9e.png" alt="zconf" width="700" height="400"/>


 
Veri dizinini, çok daha fazla kullanılabilir alana sahip Harici SSD/HDD'ye nasıl taşıdığımıza dikkat edin. Varsayılan `.zcash` klasör konumu taşındığı için, sembolik bağlantılar kullanarak bunu *zcashd*'a bildirmemiz gerekiyor:

```markdown
cp -rp ~/.zcash/* /new_dir         // Make copy of datadir or supply with an external HD
rm -rf ~/.zcash                    // Remove default folder
ln -s /media/portableHD/ ~/.zcash  // Symbolic link new data location to the default so zcashd is happy
```
   

zcashd için gerekli verileri indirmek üzere fetch-params.sh betiğini çalıştırın
   
`./fetch-params.sh`


Linux'ta yeni bir `screen` [ programı ] başlatın. zcashd'yi `-datadir` ayarlanmış şekilde açın:

```bash
screen -S zcashScreen`     
./zcashd -datadir=/media/portableHD/.zcash/
```
     
Ekranı çıkarın:

`Ctrl+a , Ctrl+d`


Tüm bu ek veri konumu komutlarını yazmak zorunda kalmamak için bir takma ad oluşturun.

`alias zcash-cli="./zcash-cli -datadir=/media/portableHD/.zcash/"`


Kullanıma hazır!

`zcash-cli getblockchaininfo`

<img src="https://user-images.githubusercontent.com/81990132/197373098-672aa228-d180-47ea-8a7c-c58dc3882426.png" alt="getblockchaininfo" width="400" height="400"/>



### *zcashd* Kullanımı

<iframe class="w-full h-auto md:h-96" src="https://www.youtube.com/embed/KNhd1KC0Bqk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Kaynak Markdown parçası mesajda yer almıyor. Çeviriyi yapabilmem için İngilizce Markdown FRAGMENT’ini göndermeniz gerekiyor.

Düğümünüzün durumunu nasıl kontrol edersiniz?

`tail -n 500 <path to>/.zcash/debug.log`

<img src="https://user-images.githubusercontent.com/81990132/197684416-9a083de4-4a62-4fe8-9cab-798781b38cd2.png" alt="status" width="700" height="400"/>


  
     
Logunuzdan mevcut yüksekliği almak için

`tail -n 10 <path to>/.zcash/debug.log | grep -o  'height=[^b]*'`

<img src="https://user-images.githubusercontent.com/81990132/199630447-6a6cd491-0cb3-47f8-95f0-45f6b6555870.png" alt="logHeight" width="500" height="400"/>


     
`zcash-cli getinfo`
  
<img src="https://user-images.githubusercontent.com/81990132/199646508-132da0eb-899e-49a6-8b31-e9011e159700.png" alt="getInfo" width="400" height="400"/>

     
     
Bir memo nasıl gönderirsiniz? [burada](https://zcash.readthedocs.io/en/latest/rtd_pages/memos.html)] görüldüğü gibi, *ascii2hex* ve *hex2ascii* dosyalarını indirin ve bunları çalıştırılabilir yapın

`chmod +x ascii2hex hex2ascii`
          
Bir not oluştur ve onu hex'e dönüştür. Test etmek için tekrar ascii'ye dönüştürebilirsin.
          
<img src="https://user-images.githubusercontent.com/81990132/199646812-782142d6-8846-443a-8dd9-4f332e49d3e9.png" alt="asciiGOOD" width="400" height="400"/>


  
Yukarıdaki memo’nuzun hex sürümünü kullanarak bir z2z işlemi (Sapling) oluşturun

`zcash-cli z_sendmany "ztestsapling1kg3u0y7szv6509732at34alct46cyn0g26kppgf2a7h5tpqxldtwm7cmhf8rqmhgt" "[{\"address\": \"ztestsapling2kg3u0y7szv6509732at34alct46cyn0g26kppgf2a7h5tpqxldtwm7cmhf8rqmhgtmpakcz5mdv\",\"amount\": 0.0001, \"memo\":\"5A656348756221\"}]"`

Ayırdıktan sonra `zcashScreen` oturumunuzu nasıl yeniden başlatırsınız?

`screen -r zcashScreen`
     
*zcashd* nasıl durdurulur?

`zcash-cli stop`
     
Bir UA'yı nasıl oluşturursunuz?

`zcash-cli z_getnewaccount`
     
<img src="https://user-images.githubusercontent.com/81990132/202352436-04c17be2-e914-4b9b-95d1-00cf6fc496d3.png" alt="newAccount" width="400" height="400"/>

    
Şimdi *ihtiyaçlarınıza* göre bir UA alıcısı oluşturun. Buna yalnızca Orchard, Orchard + Sapling ve son olarak Orchard + Sapling + Transparent dahildir. Alıcılar arasındaki farkı uzunluklarına bakarak anlayabileceğinizi unutmayın.
     
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


Bir UA kullanarak ZEC nasıl gönderirsiniz?

`zcash-cli z_sendmany "fromOaddress" "[{\"address\": \"dOrchardAddress\",\"amount\": 0.0001, \"memo\":\"yourMemoinHex\"}]" <minconf> <fee> <privacyPolicy>`

<img src="https://user-images.githubusercontent.com/81990132/202365280-c184f622-eb7e-4095-bc38-90795121c43c.png" alt="UAsuccess" width="400" height="400"/>
<img src="https://user-images.githubusercontent.com/81990132/202366758-40650460-aaeb-4e03-891f-b4bd08e18234.png" alt="pic" width="400" height="400"/>

    
##### Hem *gönderen* hem de *alıcı* adreslerinin transparent, sapling veya orchard adresleri olabileceği unutulmamalıdır; ancak işlemin geçerli olması için `privacyPolicy` bayrağını buna göre ayarlamanız gerekebilir. (`privacyPolicy` mantıklı değilse bazı kombinasyonlar çalışmaz!)


UA'lar hakkında daha fazla bilgiyi nerede bulabilirim?

> [Hanh'ın](https://medium.com/@hanh425/transaction-privacy-78f80f9f175e) işlem gizliliği hakkındaki gönderisine göz atın. Ayrıca zcash forumundaki [bu](https://forum.zcashcommunity.com/t/unified-addresses-full-node-rpc-api/41980/2) gönderiye de bakın.

> [Bu](https://github.com/zcash/zips/issues/470)

     
### Kaynaklar

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