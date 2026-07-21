<a href="https://github.com/zechub/zechub/edit/main/site/guides/Raspberry_Pi_4_Full_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Raspberry Pi 4: посібник із повного вузла *zcashd* 


Мета цього посібника — допомогти навчити Zcashers, які зацікавлені у запуску повного вузла на малопотужному Raspberry Pi 4.

<img src="https://user-images.githubusercontent.com/81990132/197372541-dcd886ab-a3d0-4614-b490-0294ddf3ffae.png" alt="zcashd" width="700" height="700"/>


## Відео

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

## Підтримка

Якщо цей посібник був для вас корисним, розгляньте можливість пожертвувати ZEC на підтримку ZecHub:

`u1rl2zw85dmjc8m4dmqvtstcyvdjn23n0ad53u5533c97affg9jq208du0vf787vfx4vkd6cd0ma4pxkkuc6xe6ue4dlgjvn9dhzacgk9peejwxdn0ksw3v3yf0dy47znruqftfqgf6xpuelle29g2qxquudxsnnen3dvdx8az6w3tggalc4pla3n4jcs8vf4h29ach3zd8enxulush89`


## Що ви дізнаєтеся

```markdown
* How to create a bootable Ubuntu Server microSD card
* How to setup internet connectivity on the Raspberry Pi 4
* How to access your Raspberry Pi 4 remotely
* How to install zcashd
* How to setup zcashd
* How to use zcashd
```


## Передумови

> [8GB Raspberry Pi 4 Canakit](https://www.canakit.com/raspberry-pi-4-starter-max-kit.html) або еквівалент

> Комп’ютер із пристроєм для читання microSD-карт

> Wi‑Fi мережа або Ethernet-кабель із доступом до інтернету

> Зовнішній SSD/HHD із підтримкою USB3


##### примітка: підтримувати безпеку вашого сервера *аж ніяк* не просто. Якщо у вас є будь-які поради/рекомендації/найкращі практики понад те, про що йдеться в цьому посібнику, *будь ласка*, створіть PR і допоможіть підтримувати цей посібник якомога актуальнішим.



### Підготуйте SD-карту

На цьому кроці ви створите *завантажувальну* SD-карту, яка дозволить завантажити ваш Raspberry Pi 4. Вставте microSD-карту у ваш комп’ютер. Можливо, вам знадобиться адаптер, що постачається з Canakit, або будь-який інший еквівалентний адаптер. Встановіть Raspberry Pi Imager для вашої операційної системи. Завантажте версію для ОС, до якої ви зараз маєте доступ.
     
     > [Ubuntu](https://downloads.raspberrypi.org/imager/imager_latest_amd64.deb)
     
     > [Windows](https://downloads.raspberrypi.org/imager/imager_latest.exe)
     
     > [macOS](https://downloads.raspberrypi.org/imager/imager_latest.dmg)

Наприклад, у Linux після завантаження ви введете таке:

`sudo dpkg -i imager_latest_amd64.deb`

Відкрийте Raspberry Pi Imager

`rpi-imager`

<img src="https://user-images.githubusercontent.com/81990132/197372069-fb9f7417-d320-42cf-ad65-38d630512985.png" alt="rpi imager" width="400" height="400"/>

Виберіть ОС і пристрій зберігання. Оскільки Raspberry Pi 4 є 64-бітними, я рекомендую вибрати "Other general-purpose OS" => Ubuntu => Ubuntu Server 24.04.3 LTS (64 bit). Натисніть на Storage і виберіть вашу SD-карту. Перш ніж записувати на SD-карту, натисніть Advanced options, клацнувши на білу іконку шестерні в нижньому правому куті.


<img src="https://user-images.githubusercontent.com/81990132/197372159-1169c6f4-f6aa-4f44-9679-fe7aa542bbd3.png" alt="gear" width="200" height="200"/>



Тут ви можете оновити:

```markdown
* Hostname of your Raspberry Pi 4
* Enable SSH
* Create a username and pw
* Enable and configure your wi-fi if needed
```
 
<img src="https://user-images.githubusercontent.com/81990132/197372149-8b85bfac-e473-4808-87cd-f27f15d05de8.png" alt="advanced" width="400" height="400"/>

 
Після завершення натисніть Write


### Завантаження Ubuntu Server

Якщо у вас є додатковий монітор і клавіатура, підключіть їх зараз. Примітка: це необов’язково. Вставте щойно відформатовану SD-карту в Raspberry Pi 4, а також підключіть зовнішній SSD/HHD до порту USB3. Також підключіть кабель живлення й увімкніть пристрій.

### Підключіться віддалено до вашого Raspberry Pi 4

Тепер нам потрібно підключитися до вашого Raspberry Pi 4. Що нам знадобиться:

```markdown
* Username and pw (from previous step)
* IP address so we can use SSH
* Monitor, and keyboard (optional)
* If you have a monitor and keyboard connected directly to your pi, the rest of this section can be skipped.
```

Є два способи знайти вашу IP-адресу: через сторінку адміністрування роутера або за допомогою nmap. Якщо використовуєте роутер, це залежить від виробника, тож деталі пропоную швидко пошукати в Google. Для nmap спочатку переконайтеся, що його встановлено:

     `sudo apt-get install nmap`
     
Знайдіть IP-адресу вашого поточного комп’ютера й зверніть увагу на перші три секції. Зазвичай це 192.168.1.xxx або 192.168.50.xxx. Підставте ці дані в nmap так:
          
`sudo nmap -sn 192.168.50.0/24`

або

`sudo nmap -sn 192.168.1.0/24`

Це покаже всі пристрої, підключені до вашої домашньої мережі, що має дозволити визначити IP-адресу / MAC-адресу вашого Raspberry Pi 4. Використовуючи ваше ім’я користувача, pw та IP-адресу, тепер ми можемо увійти через SSH

```markdown
* ssh <username>@<ip address of your pi> note: you must plugin *your* username and *your* IP address, and *your* pw when prompted.
* For example: `ssh ubuntu@192.168.1.25 where the username is *ubuntu* and IP address is 192.168.1.25.
```


  <img src="https://user-images.githubusercontent.com/81990132/197372846-e1279388-eaaa-4fbb-8d5d-f9928cb45195.png" alt="sshLogin" width="400" height="400"/>
       

Якщо вам цікаво, яку версію Raspberry Pi ви використовуєте, спробуйте цю команду:

     `cat /sys/firmware/devicetree/base/model ; echo`

  <img src="https://user-images.githubusercontent.com/81990132/197689888-367c8eb3-2667-4c8c-85b3-44d46afe07a7.png" alt="which" width="700" height="400"/>

         

### Встановлення *zcashd*

Існує два способи встановлення zcashd: завантаження попередньо скомпільованого бінарного файлу або компіляція zcashd з джерельного коду. Я *наполегливо* рекомендую компілювати з джерела. Якщо ви компілюєте самостійно, дуже бажано використовувати cross-compile. Cross-compile — це збірка бінарного файлу на одній платформі, який працюватиме на іншій платформі. Одна з причин у тому, що Raspberry Pi 4 малопотужні, а отже не дуже швидкі! Використайте свій основний комп’ютер, щоб допомогти з цим. Останній реліз можна взяти [тут](https://github.com/zcash/zcash/releases). Для cross compile нам потрібно переконатися, що встановлено необхідні пакети. Встановіть таке:

```bash
sudo apt-get install build-essential pkg-config libc6-dev m4 g++-multilib autoconf libtool ncurses-dev unzip git python3 python3-zmq zlib1g-dev curl bsdmainutils automake libtinfo5
sudo apt-get install gcc-aarch64-linux-gnu
```

Далі перейдіть у каталог щойно завантаженого релізу zcashd і виконайте:

`HOST=aarch64-linux-gnu ./zcutil/build.sh`
          

### Налаштування *zcashd*

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

---

Тепер нам потрібно перенести всі бінарні файли zcashd на ваш Raspberry Pi 4. Починаючи з Zcashd v5.3, потрібні файли включають:

```markdown
zcashd
zcash-cli
zcash-tx
zcash-gtest
zcash-inspect
zcashd-wallet-tool
fetch-params.sh
```

Ці файли знаходяться в каталозі /src місця завантаження вашого останнього релізу, якщо ви компілювали їх самостійно. Інакше попередньо скомпільовані файли будуть там, куди ви їх завантажили. Є два способи виконати перенесення: за допомогою SFTP або через зовнішній диск.

#### SFTP

```bash
sftp username@<ip of RaspberryPi4>
put zcash*
```
   
#### Копіювання через зовнішній носій
     
Просто скопіюйте файли на зовнішній носій перед тим, як підключити його до Raspberry Pi 4. Якщо у вас уже є синхронізований повний вузол і ви хочете заощадити час, ви також можете скопіювати дані blocks і chainstate.
   
` cd ~/.zcash/`
     
Просто виконайте:

```bash
tar -zcvf blocks.tar.gz /blocks
tar -zcvf chainstate.tar.gz /chainstate
```
     
Скопіюйте файли blocks і chainstate .gz на ваш зовнішній SSD/HHD. Далі змонтуйте зовнішній SSD/HDD у папці Media, щоб ви могли його бачити:

```markdown
lsblk will display all drives connected. Most will be of the format sda
id will show your user and group id's.
```
          
<img src="https://user-images.githubusercontent.com/81990132/197372643-abef88fd-9177-4bf9-abda-3c221188cd10.png" alt="lsblk" width="400" height="400"/>


          
          `sudo mount -o umask=0077,gid=<groupid>,uid=<userid> /dev/sda1 /media/portableHD/`
          
Слідкуйте як за тим, кому належать папки/файли, так і за правами доступу.

```bash
sudo chown -R <username>: portableHD
sudo chmod -R 600 portableHD/
```
     
Якщо ви скопіювали файли blocks і chainstate .gz з іншого комп’ютера, розпакуйте їх зараз. Переконайтеся, що вони знаходяться в папці .zcash на вашому зовнішньому диску.

```bash
tar - xvzf blocks.tar.gz
tar - xvzf chainstate.tar.gz
```


Налаштуйте /media/portableHD/.zcash/zcash.conf

<img src="https://user-images.githubusercontent.com/81990132/197373699-18cc2c9f-b47d-44e9-9e6b-4c5cccf78d9e.png" alt="zconf" width="700" height="400"/>


 
Зверніть увагу, що ми перенесли datadir на зовнішній SSD/HDD, де доступно значно більше місця. Оскільки стандартне розташування папки .zcash було змінено, потрібно повідомити про це *zcashd* за допомогою символічних посилань:

```markdown
cp -rp ~/.zcash/* /new_dir         // Make copy of datadir or supply with an external HD
rm -rf ~/.zcash                    // Remove default folder
ln -s /media/portableHD/ ~/.zcash  // Symbolic link new data location to the default so zcashd is happy
```
   

Запустіть скрипт fetch-params.sh, щоб завантажити потрібні дані для zcashd
   
    `./fetch-params.sh`


Запустіть нову програму 'screen' [ у Linux ]. Відкрийте zcashd із вказаним -datadir:

```bash
screen -S zcashScreen`     
./zcashd -datadir=/media/portableHD/.zcash/
```
     
Від’єднайте screen:

`Ctrl+a , Ctrl+d`


Створіть alias, щоб не вводити щоразу всі ці додаткові команди розташування даних

     `alias zcash-cli="./zcash-cli -datadir=/media/portableHD/.zcash/"`


Готово до використання!

    `zcash-cli getblockchaininfo`

  <img src="https://user-images.githubusercontent.com/81990132/197373098-672aa228-d180-47ea-8a7c-c58dc3882426.png" alt="getblockchaininfo" width="400" height="400"/>



### Використання *zcashd*

<iframe class="w-full h-auto md:h-96" src="https://www.youtube.com/embed/KNhd1KC0Bqk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

---

Як перевірити статус вашого вузла?

     `tail -n 500 <path to>/.zcash/debug.log`

  <img src="https://user-images.githubusercontent.com/81990132/197684416-9a083de4-4a62-4fe8-9cab-798781b38cd2.png" alt="status" width="700" height="400"/>


  
     
Щоб отримати поточну висоту з вашого журналу

     `tail -n 10 <path to>/.zcash/debug.log | grep -o  'height=[^b]*'`

  <img src="https://user-images.githubusercontent.com/81990132/199630447-6a6cd491-0cb3-47f8-95f0-45f6b6555870.png" alt="logHeight" width="500" height="400"/>


     
     `zcash-cli getinfo`
  
<img src="https://user-images.githubusercontent.com/81990132/199646508-132da0eb-899e-49a6-8b31-e9011e159700.png" alt="getInfo" width="400" height="400"/>

     
     
Як надіслати memo? Як показано [тут](https://zcash.readthedocs.io/en/latest/rtd_pages/memos.html), завантажте *ascii2hex* і *hex2ascii* та зробіть їх виконуваними 

`chmod +x ascii2hex hex2ascii`
          
Створіть memo і перетворіть його на hex. Ви можете конвертувати його назад в ascii для перевірки.
          
<img src="https://user-images.githubusercontent.com/81990132/199646812-782142d6-8846-443a-8dd9-4f332e49d3e9.png" alt="asciiGOOD" width="400" height="400"/>


  
Створіть транзакцію z2z (Sapling), використовуючи hex-версію вашого memo, створеного вище

`zcash-cli z_sendmany "ztestsapling1kg3u0y7szv6509732at34alct46cyn0g26kppgf2a7h5tpqxldtwm7cmhf8rqmhgt" "[{\"address\": \"ztestsapling2kg3u0y7szv6509732at34alct46cyn0g26kppgf2a7h5tpqxldtwm7cmhf8rqmhgtmpakcz5mdv\",\"amount\": 0.0001, \"memo\":\"5A656348756221\"}]"`

Як відновити вашу zcashScreen після від’єднання?

`screen -r zcashScreen`
     
Як зупинити *zcashd* ?

`zcash-cli stop`
     
Як створити UA?

`zcash-cli z_getnewaccount`
     
  <img src="https://user-images.githubusercontent.com/81990132/202352436-04c17be2-e914-4b9b-95d1-00cf6fc496d3.png" alt="newAccount" width="400" height="400"/>

    
Тепер створіть receiver UA відповідно до *ваших потреб*. Це включає лише Orchard, Orchard + Sapling і, нарешті, Orchard + Sapling + Transparent. Зверніть увагу, що ви можете відрізнити receiver за їхньою довжиною.
     
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


Як надсилати ZEC за допомогою UA?

`zcash-cli z_sendmany "fromOaddress" "[{\"address\": \"dOrchardAddress\",\"amount\": 0.0001, \"memo\":\"yourMemoinHex\"}]" <minconf> <fee> <privacyPolicy>`

<img src="https://user-images.githubusercontent.com/81990132/202365280-c184f622-eb7e-4095-bc38-90795121c43c.png" alt="UAsuccess" width="400" height="400"/>
<img src="https://user-images.githubusercontent.com/81990132/202366758-40650460-aaeb-4e03-891f-b4bd08e18234.png" alt="pic" width="400" height="400"/>

    
##### Слід зазначити, що і адреси *from*, і адреси *destination* можуть бути transparent, sapling або orchard адресами, однак вам може знадобитися скоригувати прапорець privacyPolicy, щоб транзакція була дійсною. (Деякі комбінації не працюватимуть, якщо privacyPolicy не має сенсу!)


Де я можу знайти більше інформації про UA?

> Перегляньте допис [Hanh](https://medium.com/@hanh425/transaction-privacy-78f80f9f175e) про приватність транзакцій. А також [цей](https://forum.zcashcommunity.com/t/unified-addresses-full-node-rpc-api/41980/2) допис на форумі zcash.

> [Це](https://github.com/zcash/zips/issues/470)

     
### Джерела

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
