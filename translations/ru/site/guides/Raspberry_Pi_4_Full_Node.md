<a href="https://github.com/zechub/zechub/edit/main/site/guides/Raspberry_Pi_4_Full_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Редактировать страницу"/>
</a>


# Raspberry Pi 4: руководство по полному узлу *zcashd*


Цель этого руководства — помочь Zcashers, которые заинтересованы в запуске полного узла на маломощном Raspberry Pi 4.

<img src="https://user-images.githubusercontent.com/81990132/197372541-dcd886ab-a3d0-4614-b490-0294ddf3ffae.png" alt="zcashd" width="700" height="700"/>


## Видео

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/SGYrzhs1l2k"
    title="Как скомпилировать узел Zcash на Raspberry Pi!"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

## Поддержка

Если это руководство оказалось полезным, рассмотрите возможность пожертвовать ZEC в поддержку ZecHub:

`u1rl2zw85dmjc8m4dmqvtstcyvdjn23n0ad53u5533c97affg9jq208du0vf787vfx4vkd6cd0ma4pxkkuc6xe6ue4dlgjvn9dhzacgk9peejwxdn0ksw3v3yf0dy47znruqftfqgf6xpuelle29g2qxquudxsnnen3dvdx8az6w3tggalc4pla3n4jcs8vf4h29ach3zd8enxulush89`


## Чему вы научитесь

```markdown
* Как создать загрузочную карту microSD с Ubuntu Server
* Как настроить подключение к интернету на Raspberry Pi 4
* Как получить удалённый доступ к Raspberry Pi 4
* Как установить zcashd
* Как настроить zcashd
* Как использовать zcashd
```


## Предварительные требования

> [Canakit с Raspberry Pi 4 на 8 ГБ](https://www.canakit.com/raspberry-pi-4-starter-max-kit.html) или аналогичный комплект

> Компьютер с приводом для карт microSD

> Сеть Wi-Fi или Ethernet-кабель с подключением к интернету

> Внешний SSD/HHD с поддержкой USB3


##### примечание: обеспечить безопасность вашего сервера — *совсем не* простая задача. Если у вас есть советы/рекомендации/лучшие практики помимо того, что рассмотрено в этом руководстве, *пожалуйста*, создайте PR и помогите поддерживать это руководство в максимально актуальном состоянии.



### Подготовьте SD-карту

На этом шаге вы создадите *загрузочную* SD-карту, которая позволит вашему Raspberry Pi 4 загрузиться. Вставьте карту microSD в компьютер. Возможно, вам понадобится адаптер, который идёт в комплекте с Canakit, или любой другой аналогичный адаптер. Установите Raspberry Pi Imager для вашей операционной системы. Скачайте версию для ОС, к которой у вас сейчас есть доступ.
     
     > [Ubuntu](https://downloads.raspberrypi.org/imager/imager_latest_amd64.deb)
     
     > [Windows](https://downloads.raspberrypi.org/imager/imager_latest.exe)
     
     > [macOS](https://downloads.raspberrypi.org/imager/imager_latest.dmg)

Например, в Linux после загрузки нужно ввести следующее:

`sudo dpkg -i imager_latest_amd64.deb`

Откройте Raspberry Pi Imager

`rpi-imager`

<img src="https://user-images.githubusercontent.com/81990132/197372069-fb9f7417-d320-42cf-ad65-38d630512985.png" alt="rpi imager" width="400" height="400"/>

Выберите ОС и устройство хранения. Поскольку Raspberry Pi 4 — 64-битные устройства, я рекомендую выбрать «Other general-purpose OS» => Ubuntu => Ubuntu Server 24.04.3 LTS (64 bit). Нажмите на Storage и выберите вашу SD-карту. Перед записью на SD-карту откройте Advanced options, нажав на белую иконку шестерёнки в правом нижнем углу.


<img src="https://user-images.githubusercontent.com/81990132/197372159-1169c6f4-f6aa-4f44-9679-fe7aa542bbd3.png" alt="gear" width="200" height="200"/>



Здесь можно изменить:

```markdown
* Имя хоста вашего Raspberry Pi 4
* Включить SSH
* Создать имя пользователя и пароль
* При необходимости включить и настроить Wi-Fi
```
 
<img src="https://user-images.githubusercontent.com/81990132/197372149-8b85bfac-e473-4808-87cd-f27f15d05de8.png" alt="advanced" width="400" height="400"/>

 
После завершения нажмите Write


### Загрузка Ubuntu Server

Если у вас есть дополнительный монитор и клавиатура, подключите их сейчас. Примечание: это необязательно. Вставьте только что подготовленную SD-карту в Raspberry Pi 4, а также подключите внешний SSD/HHD к порту USB3. Затем подключите кабель питания и включите устройство.

### Подключитесь к Raspberry Pi 4 удалённо

Теперь нам нужно подключиться к вашему Raspberry Pi 4. Что понадобится:

```markdown
* Имя пользователя и пароль (с предыдущего шага)
* IP-адрес, чтобы использовать SSH
* Монитор и клавиатура (необязательно)
* Если монитор и клавиатура уже подключены напрямую к вашему pi, остальную часть этого раздела можно пропустить.
```

Есть два способа найти ваш IP-адрес: через страницу администрирования роутера или с помощью nmap. Если использовать роутер, это зависит от производителя, поэтому за подробностями лучше обратиться к быстрому поиску в Google. Для nmap сначала убедитесь, что он установлен:

     `sudo apt-get install nmap`
     
Найдите IP-адрес вашего текущего компьютера и запишите первые три секции. Обычно это 192.168.1.xxx или 192.168.50.xxx. Подставьте эти данные в nmap следующим образом:
          
`sudo nmap -sn 192.168.50.0/24`

или

`sudo nmap -sn 192.168.1.0/24`

Это покажет все устройства, подключённые к вашей домашней сети, и должно помочь определить IP-адрес / MAC-адрес вашего Raspberry Pi 4. Используя имя пользователя, пароль и IP-адрес, теперь можно войти через SSH

```markdown
* ssh <username>@<ip address of your pi> примечание: вы должны подставить *своё* имя пользователя, *свой* IP-адрес и *свой* пароль по запросу.
* Например: `ssh ubuntu@192.168.1.25 where the username is *ubuntu* and IP address is 192.168.1.25.
```


  <img src="https://user-images.githubusercontent.com/81990132/197372846-e1279388-eaaa-4fbb-8d5d-f9928cb45195.png" alt="sshLogin" width="400" height="400"/>
       

Если вам интересно, какая версия Raspberry Pi у вас используется, попробуйте эту команду:

     `cat /sys/firmware/devicetree/base/model ; echo`

  <img src="https://user-images.githubusercontent.com/81990132/197689888-367c8eb3-2667-4c8c-85b3-44d46afe07a7.png" alt="which" width="700" height="400"/>

         

### Установка *zcashd*

Существует два способа установки zcashd: скачать предварительно скомпилированный бинарный файл или скомпилировать zcashd из исходников. Я *настоятельно* рекомендую компиляцию из исходников. При самостоятельной компиляции очень рекомендуется использовать кросс-компиляцию. Кросс-компиляция — это сборка бинарного файла на одной платформе для запуска на другой. Одна из причин в том, что Raspberry Pi 4 — устройства маломощные и потому не очень быстрые! Используйте для этого свой основной компьютер. Последний релиз можно взять [здесь](https://github.com/zcash/zcash/releases). Для кросс-компиляции нужно убедиться, что у нас установлены необходимые пакеты. Установите следующее:

```bash
sudo apt-get install build-essential pkg-config libc6-dev m4 g++-multilib autoconf libtool ncurses-dev unzip git python3 python3-zmq zlib1g-dev curl bsdmainutils automake libtinfo5
sudo apt-get install gcc-aarch64-linux-gnu
```

Затем перейдите в каталог со свежескачанным релизом zcashd и выполните:

`HOST=aarch64-linux-gnu ./zcutil/build.sh`
          

### Настройка *zcashd*

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/9t2LX3HFldw"
    title="Инструмент кошелька Zcashd - генерация и импорт закрытого ключа"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

---

Теперь нам нужно перенести все бинарные файлы zcashd на ваш Raspberry Pi 4. Начиная с Zcashd v5.3, необходимые файлы включают:

```markdown
zcashd
zcash-cli
zcash-tx
zcash-gtest
zcash-inspect
zcashd-wallet-tool
fetch-params.sh
```

Эти файлы находятся в каталоге /src вашего последнего скачанного релиза, если вы компилировали их самостоятельно. В противном случае предварительно скомпилированные файлы находятся там, куда вы их скачали. Есть два способа выполнить перенос: через SFTP или с помощью внешнего накопителя.

#### SFTP

```bash
sftp username@<ip of RaspberryPi4>
put zcash*
```
   
#### Копирование через внешний накопитель
     
Просто скопируйте файлы на внешний накопитель до того, как подключите его к Raspberry Pi 4. Если у вас уже есть синхронизированный полный узел и вы хотите сэкономить время, можно также скопировать данные blocks и chainstate.
   
` cd ~/.zcash/`
     
Просто выполните:

```bash
tar -zcvf blocks.tar.gz /blocks
tar -zcvf chainstate.tar.gz /chainstate
```
     
Скопируйте файлы .gz с blocks и chainstate на ваш внешний SSD/HHD. Затем смонтируйте внешний SSD/HDD в папку Media, чтобы вы могли его увидеть:

```markdown
lsblk покажет все подключённые накопители. Большинство будут в формате sda
id покажет ваш идентификатор пользователя и группы.
```
          
<img src="https://user-images.githubusercontent.com/81990132/197372643-abef88fd-9177-4bf9-abda-3c221188cd10.png" alt="lsblk" width="400" height="400"/>


          
          `sudo mount -o umask=0077,gid=<groupid>,uid=<userid> /dev/sda1 /media/portableHD/`
          
Следите и за тем, кому принадлежат папки/файлы, и за правами доступа.

```bash
sudo chown -R <username>: portableHD
sudo chmod -R 600 portableHD/
```
     
Если вы скопировали файлы .gz с blocks и chainstate с другого компьютера, распакуйте их сейчас. Убедитесь, что они находятся в папке .zcash на внешнем накопителе.

```bash
tar - xvzf blocks.tar.gz
tar - xvzf chainstate.tar.gz
```


Настройте /media/portableHD/.zcash/zcash.conf

<img src="https://user-images.githubusercontent.com/81990132/197373699-18cc2c9f-b47d-44e9-9e6b-4c5cccf78d9e.png" alt="zconf" width="700" height="400"/>


 
Обратите внимание, что мы перенесли datadir на внешний SSD/HDD, где гораздо больше доступного пространства. Поскольку расположение папки .zcash по умолчанию было изменено, нам нужно сообщить об этом *zcashd* с помощью символических ссылок:

```markdown
cp -rp ~/.zcash/* /new_dir         // Сделать копию datadir или разместить её на внешнем накопителе
rm -rf ~/.zcash                    // Удалить папку по умолчанию
ln -s /media/portableHD/ ~/.zcash  // Символическая ссылка на новое расположение данных в стандартное место, чтобы zcashd был доволен
```
   

Запустите скрипт fetch-params.sh, чтобы загрузить необходимые данные для zcashd
   
    `./fetch-params.sh`


Запустите новый 'screen' [ программу в Linux ]. Откройте zcashd с указанием -datadir:

```bash
screen -S zcashScreen`     
./zcashd -datadir=/media/portableHD/.zcash/
```
     
Отсоедините screen:

`Ctrl+a , Ctrl+d`


Создайте alias, чтобы не вводить каждый раз все эти дополнительные команды с расположением данных

     `alias zcash-cli="./zcash-cli -datadir=/media/portableHD/.zcash/"`


Готово к использованию!

    `zcash-cli getblockchaininfo`

  <img src="https://user-images.githubusercontent.com/81990132/197373098-672aa228-d180-47ea-8a7c-c58dc3882426.png" alt="getblockchaininfo" width="400" height="400"/>



### Использование *zcashd*

<iframe class="w-full h-auto md:h-96" src="https://www.youtube.com/embed/KNhd1KC0Bqk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

---

Как проверить состояние вашего узла?

     `tail -n 500 <path to>/.zcash/debug.log`

  <img src="https://user-images.githubusercontent.com/81990132/197684416-9a083de4-4a62-4fe8-9cab-798781b38cd2.png" alt="status" width="700" height="400"/>


  
     
Как получить текущую высоту из вашего журнала

     `tail -n 10 <path to>/.zcash/debug.log | grep -o  'height=[^b]*'`

  <img src="https://user-images.githubusercontent.com/81990132/199630447-6a6cd491-0cb3-47f8-95f0-45f6b6555870.png" alt="logHeight" width="500" height="400"/>


     
     `zcash-cli getinfo`
  
<img src="https://user-images.githubusercontent.com/81990132/199646508-132da0eb-899e-49a6-8b31-e9011e159700.png" alt="getInfo" width="400" height="400"/>

     
     
Как отправить memo? Как показано [здесь](https://zcash.readthedocs.io/en/latest/rtd_pages/memos.html), скачайте *ascii2hex* и *hex2ascii* и сделайте их исполняемыми 

`chmod +x ascii2hex hex2ascii`
          
Создайте memo и преобразуйте его в hex. Для проверки можно преобразовать обратно в ascii.
          
<img src="https://user-images.githubusercontent.com/81990132/199646812-782142d6-8846-443a-8dd9-4f332e49d3e9.png" alt="asciiGOOD" width="400" height="400"/>


  
Создайте транзакцию z2z (Sapling), используя hex-версию вашего memo выше

`zcash-cli z_sendmany "ztestsapling1kg3u0y7szv6509732at34alct46cyn0g26kppgf2a7h5tpqxldtwm7cmhf8rqmhgt" "[{\"address\": \"ztestsapling2kg3u0y7szv6509732at34alct46cyn0g26kppgf2a7h5tpqxldtwm7cmhf8rqmhgtmpakcz5mdv\",\"amount\": 0.0001, \"memo\":\"5A656348756221\"}]"`

Как снова подключиться к zcashScreen после отсоединения?

`screen -r zcashScreen`
     
Как остановить *zcashd*?

`zcash-cli stop`
     
Как создать UA?

`zcash-cli z_getnewaccount`
     
  <img src="https://user-images.githubusercontent.com/81990132/202352436-04c17be2-e914-4b9b-95d1-00cf6fc496d3.png" alt="newAccount" width="400" height="400"/>

    
Теперь создайте получатель UA в соответствии с *вашими потребностями*. Это может быть только Orchard, Orchard + Sapling и, наконец, Orchard + Sapling + Transparent. Обратите внимание, что отличить получателей можно по их длине.
     
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


Как отправить ZEC с помощью UA?

`zcash-cli z_sendmany "fromOaddress" "[{\"address\": \"dOrchardAddress\",\"amount\": 0.0001, \"memo\":\"yourMemoinHex\"}]" <minconf> <fee> <privacyPolicy>`

<img src="https://user-images.githubusercontent.com/81990132/202365280-c184f622-eb7e-4095-bc38-90795121c43c.png" alt="UAsuccess" width="400" height="400"/>
<img src="https://user-images.githubusercontent.com/81990132/202366758-40650460-aaeb-4e03-891f-b4bd08e18234.png" alt="pic" width="400" height="400"/>

    
##### Следует отметить, что и адрес *отправителя*, и *адрес назначения* могут быть transparent-, sapling- или orchard-адресами, однако вам может понадобиться скорректировать флаг privacyPolicy, чтобы транзакция была действительной. (Некоторые комбинации не будут работать, если privacyPolicy не имеет смысла!)


Где можно найти больше информации о UA?

> Посмотрите публикацию [Hanh](https://medium.com/@hanh425/transaction-privacy-78f80f9f175e) о конфиденциальности транзакций. А также [этот](https://forum.zcashcommunity.com/t/unified-addresses-full-node-rpc-api/41980/2) пост на форуме Zcash.

> [Это](https://github.com/zcash/zips/issues/470)

     
### Источники

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
