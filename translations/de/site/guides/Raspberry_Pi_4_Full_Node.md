<a href="https://github.com/zechub/zechub/edit/main/site/guides/Raspberry_Pi_4_Full_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Seite bearbeiten"/>
</a>


# Raspberry Pi 4: ein *zcashd*-Full-Node-Leitfaden 


Der Zweck dieses Leitfadens ist es, Zcashern zu helfen, die daran interessiert sind, einen Full Node auf einem leistungsschwachen Raspberry Pi 4 zu betreiben.

<img src="https://user-images.githubusercontent.com/81990132/197372541-dcd886ab-a3d0-4614-b490-0294ddf3ffae.png" alt="zcashd" width="700" height="700"/>


## Video

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/SGYrzhs1l2k"
    title="Wie man einen Zcash-Node auf dem Raspberry Pi kompiliert!"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

## Unterstützung

Wenn du diesen Leitfaden nützlich findest, ziehe in Betracht, ZEC zu spenden, um ZecHub zu unterstützen:

`u1rl2zw85dmjc8m4dmqvtstcyvdjn23n0ad53u5533c97affg9jq208du0vf787vfx4vkd6cd0ma4pxkkuc6xe6ue4dlgjvn9dhzacgk9peejwxdn0ksw3v3yf0dy47znruqftfqgf6xpuelle29g2qxquudxsnnen3dvdx8az6w3tggalc4pla3n4jcs8vf4h29ach3zd8enxulush89`


## Was du lernen wirst

```markdown
* How to create a bootable Ubuntu Server microSD card
* How to setup internet connectivity on the Raspberry Pi 4
* How to access your Raspberry Pi 4 remotely
* How to install zcashd
* How to setup zcashd
* How to use zcashd
```


## Voraussetzungen

> [8GB Raspberry Pi 4 Canakit](https://www.canakit.com/raspberry-pi-4-starter-max-kit.html) oder gleichwertig

> Ein Computer mit einem microSD-Kartenlaufwerk

> Ein Wi-Fi-Netzwerk oder ein Ethernet-Kabel mit Internetverbindung

> Externe SSD/HHD mit USB3-Unterstützung


##### Hinweis: Deinen Server sicher zu halten ist *keinesfalls* einfach. Wenn du Tipps/Empfehlungen/Best Practices hast, die über das hinausgehen, was in diesem Leitfaden behandelt wird, erstelle *bitte* einen PR und hilf dabei, diesen Leitfaden so aktuell wie möglich zu halten.



### Die SD-Karte vorbereiten

In diesem Schritt erstellst du eine *bootfähige* SD-Karte, mit der dein Raspberry Pi 4 starten kann. Stecke die microSD-Karte in deinen Computer. Möglicherweise musst du den Adapter verwenden, der mit dem Canakit geliefert wird, oder einen anderen gleichwertigen Adapter. Installiere Raspberry Pi Imager für dein Betriebssystem. Lade die Version für das Betriebssystem herunter, auf das du derzeit Zugriff hast.
     
     > [Ubuntu](https://downloads.raspberrypi.org/imager/imager_latest_amd64.deb)
     
     > [Windows](https://downloads.raspberrypi.org/imager/imager_latest.exe)
     
     > [macOS](https://downloads.raspberrypi.org/imager/imager_latest.dmg)

Zum Beispiel würdest du unter Linux nach dem Download Folgendes eingeben:

`sudo dpkg -i imager_latest_amd64.deb`

Öffne Raspberry Pi Imager

`rpi-imager`

<img src="https://user-images.githubusercontent.com/81990132/197372069-fb9f7417-d320-42cf-ad65-38d630512985.png" alt="rpi imager" width="400" height="400"/>

Wähle Betriebssystem und Speichergerät. Da Raspberry Pi 4 64-Bit-Systeme sind, empfehle ich, „Other general-purpose OS“ => Ubuntu => Ubuntu Server 24.04.3 LTS (64 bit) zu wählen. Klicke auf Storage und wähle deine SD-Karte aus. Bevor du auf die SD-Karte schreibst, klicke auf Advanced options, indem du auf das weiße Zahnrad-Symbol in der Nähe der unteren rechten Ecke klickst.


<img src="https://user-images.githubusercontent.com/81990132/197372159-1169c6f4-f6aa-4f44-9679-fe7aa542bbd3.png" alt="Zahnrad" width="200" height="200"/>



Hier kannst du Folgendes aktualisieren:

```markdown
* Hostname of your Raspberry Pi 4
* Enable SSH
* Create a username and pw
* Enable and configure your wi-fi if needed
```
 
<img src="https://user-images.githubusercontent.com/81990132/197372149-8b85bfac-e473-4808-87cd-f27f15d05de8.png" alt="Erweitert" width="400" height="400"/>

 
Wenn du fertig bist, klicke auf Write


### Ubuntu Server booten

Wenn du einen zusätzlichen Monitor und eine Tastatur hast, schließe sie jetzt an. Hinweis: Diese sind optional. Setze die SD-Karte, die du gerade formatiert hast, in den Raspberry Pi 4 ein und schließe außerdem die externe SSD/HHD an den USB3-Port an. Schließe auch das Stromkabel an und schalte ihn ein.

### Per Fernzugriff mit deinem Raspberry Pi 4 verbinden

Wir müssen uns nun mit deinem Raspberry Pi 4 verbinden. Dinge, die wir brauchen:

```markdown
* Username and pw (from previous step)
* IP address so we can use SSH
* Monitor, and keyboard (optional)
* If you have a monitor and keyboard connected directly to your pi, the rest of this section can be skipped.
```

Es gibt zwei Möglichkeiten, deine IP-Adresse zu finden: über die Admin-Seite deines Routers oder mit nmap. Wenn du den Router verwendest, hängt es vom Hersteller ab, und ich überlasse diese Details einer kurzen Google-Suche. Für nmap stelle zuerst sicher, dass es installiert ist:

     `sudo apt-get install nmap`
     
Finde die IP-Adresse deines aktuellen Computers und notiere die ersten drei Abschnitte. Das ist typischerweise 192.168.1.xxx oder 192.168.50.xxx. Setze diese Details wie folgt in nmap ein:
          
`sudo nmap -sn 192.168.50.0/24`

oder

`sudo nmap -sn 192.168.1.0/24`

Dadurch werden alle Geräte angezeigt, die mit deinem Heimnetzwerk verbunden sind, wodurch die IP-Adresse / MAC-Adresse deines Raspberry Pi 4 sichtbar werden sollte. Mit deinem Benutzernamen, deinem Passwort und deiner IP-Adresse können wir uns nun per SSH anmelden

```markdown
* ssh <username>@<ip address of your pi> note: you must plugin *your* username and *your* IP address, and *your* pw when prompted.
* For example: `ssh ubuntu@192.168.1.25 where the username is *ubuntu* and IP address is 192.168.1.25.
```


  <img src="https://user-images.githubusercontent.com/81990132/197372846-e1279388-eaaa-4fbb-8d5d-f9928cb45195.png" alt="SSH-Anmeldung" width="400" height="400"/>
       

Wenn du neugierig bist, welche Raspberry-Pi-Version du verwendest, probiere diesen Befehl aus:

     `cat /sys/firmware/devicetree/base/model ; echo`

  <img src="https://user-images.githubusercontent.com/81990132/197689888-367c8eb3-2667-4c8c-85b3-44d46afe07a7.png" alt="welche" width="700" height="400"/>
### Installation von *zcashd*

Es gibt zwei Möglichkeiten, zcashd zu installieren: das Herunterladen einer vorkompilierten Binärdatei oder das Kompilieren von zcashd aus dem Quellcode. Ich empfehle *dringend*, aus dem Quellcode zu kompilieren. Wenn du selbst kompilierst, wird dringend empfohlen, Cross-Compiling zu verwenden. Cross-Compiling bedeutet, auf einer Plattform eine Binärdatei zu erstellen, die auf einer anderen Plattform läuft. Ein Grund dafür ist, dass Raspberry Pi 4s leistungsschwach und daher nicht besonders schnell sind! Nutze dafür deinen Hauptcomputer. Die neueste Version findest du [hier](https://github.com/zcash/zcash/releases). Für das Cross-Compiling müssen wir sicherstellen, dass wir die benötigten Pakete haben. Installiere Folgendes:

```bash
sudo apt-get install build-essential pkg-config libc6-dev m4 g++-multilib autoconf libtool ncurses-dev unzip git python3 python3-zmq zlib1g-dev curl bsdmainutils automake libtinfo5
sudo apt-get install gcc-aarch64-linux-gnu
```

Wechsle anschließend in das Verzeichnis der frisch heruntergeladenen zcashd-Version und führe Folgendes aus:

`HOST=aarch64-linux-gnu ./zcutil/build.sh`
          

### Einrichtung von *zcashd*

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/9t2LX3HFldw"
    title="Zcashd Wallet-Tool - Privaten Schlüssel erzeugen & importieren"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

---

Wir müssen nun alle zcashd-Binärdateien auf deinen Raspberry Pi 4 übertragen. Ab Zcashd v5.3 umfassen die benötigten Dateien:

```markdown
zcashd
zcash-cli
zcash-tx
zcash-gtest
zcash-inspect
zcashd-wallet-tool
fetch-params.sh
```

Diese Dateien befinden sich im Verzeichnis /src deines Downloads der neuesten Version, wenn du sie selbst kompiliert hast. Andernfalls liegen die vorkompilierten Dateien dort, wo du sie heruntergeladen hast. Zwei Möglichkeiten für die Übertragung sind entweder SFTP oder die Verwendung deines externen Laufwerks.

#### SFTP

```bash
sftp username@<ip of RaspberryPi4>
put zcash*
```
   
#### Externe Kopie
     
Kopiere die Dateien einfach auf das externe Laufwerk, bevor du es an den Raspberry Pi 4 anschließt. Wenn du bereits einen vollständig synchronisierten Full Node hast und Zeit sparen möchtest, kannst du auch die Daten von blocks und chainstate kopieren.
   
` cd ~/.zcash/`
     
Führe einfach aus:

```bash
tar -zcvf blocks.tar.gz /blocks
tar -zcvf chainstate.tar.gz /chainstate
```
     
Kopiere die .gz-Dateien von blocks und chainstate auf deine externe SSD/HHD. Hänge anschließend die externe SSD/HDD im Ordner Media ein, damit du sie sehen kannst:

```markdown
lsblk zeigt alle angeschlossenen Laufwerke an. Die meisten haben das Format sda
id zeigt deine Benutzer- und Gruppen-IDs an.
```
          
<img src="https://user-images.githubusercontent.com/81990132/197372643-abef88fd-9177-4bf9-abda-3c221188cd10.png" alt="lsblk" width="400" height="400"/>


          
          `sudo mount -o umask=0077,gid=<groupid>,uid=<userid> /dev/sda1 /media/portableHD/`
          
Achte sowohl darauf, wem die Ordner/Dateien gehören, als auch auf die Berechtigungen.

```bash
sudo chown -R <username>: portableHD
sudo chmod -R 600 portableHD/
```
     
Wenn du die .gz-Dateien von blocks und chainstate von deinem anderen Computer kopiert hast, entpacke sie jetzt. Stelle sicher, dass sie sich im Ordner .zcash auf deinem externen Laufwerk befinden.

```bash
tar - xvzf blocks.tar.gz
tar - xvzf chainstate.tar.gz
```


Einrichten von /media/portableHD/.zcash/zcash.conf

<img src="https://user-images.githubusercontent.com/81990132/197373699-18cc2c9f-b47d-44e9-9e6b-4c5cccf78d9e.png" alt="zconf" width="700" height="400"/>


 
Beachte, wie wir das datadir auf die externe SSD/HDD verschoben haben, die viel mehr verfügbaren Speicherplatz hat. Da der Standardspeicherort des Ordners .zcash verschoben wurde, müssen wir dies *zcashd* mithilfe symbolischer Links mitteilen:

```markdown
cp -rp ~/.zcash/* /new_dir         // Kopie von datadir erstellen oder ein externes HD verwenden
rm -rf ~/.zcash                    // Standardordner entfernen
ln -s /media/portableHD/ ~/.zcash  // Symbolischen Link vom neuen Datenspeicherort auf den Standard setzen, damit zcashd zufrieden ist
```
   

Führe das Skript fetch-params.sh aus, um die für zcashd benötigten Daten herunterzuladen
   
    `./fetch-params.sh`


Starte ein neues 'screen' [ Programm in Linux ]. Öffne zcashd mit gesetztem -datadir:

```bash
screen -S zcashScreen`     
./zcashd -datadir=/media/portableHD/.zcash/
```
     
Trenne die screen-Sitzung:

`Ctrl+a , Ctrl+d`


Erstelle einen Alias, damit du nicht jedes Mal all diese zusätzlichen Befehle für den Datenspeicherort eingeben musst

     `alias zcash-cli="./zcash-cli -datadir=/media/portableHD/.zcash/"`


Bereit zur Verwendung!

    `zcash-cli getblockchaininfo`

  <img src="https://user-images.githubusercontent.com/81990132/197373098-672aa228-d180-47ea-8a7c-c58dc3882426.png" alt="getblockchaininfo" width="400" height="400"/>



### Verwendung von *zcashd*

<iframe class="w-full h-auto md:h-96" src="https://www.youtube.com/embed/KNhd1KC0Bqk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

---

Wie prüfst du den Status deines Nodes?

     `tail -n 500 <path to>/.zcash/debug.log`

  <img src="https://user-images.githubusercontent.com/81990132/197684416-9a083de4-4a62-4fe8-9cab-798781b38cd2.png" alt="status" width="700" height="400"/>


  
     
So erhältst du die aktuelle Höhe aus deinem Log

     `tail -n 10 <path to>/.zcash/debug.log | grep -o  'height=[^b]*'`

  <img src="https://user-images.githubusercontent.com/81990132/199630447-6a6cd491-0cb3-47f8-95f0-45f6b6555870.png" alt="logHeight" width="500" height="400"/>


     
     `zcash-cli getinfo`
  
<img src="https://user-images.githubusercontent.com/81990132/199646508-132da0eb-899e-49a6-8b31-e9011e159700.png" alt="getInfo" width="400" height="400"/>

     
     
Wie sendest du ein Memo? Wie [hier](https://zcash.readthedocs.io/en/latest/rtd_pages/memos.html) gezeigt, lade *ascii2hex* und *hex2ascii* herunter und mache sie ausführbar

`chmod +x ascii2hex hex2ascii`
          
Erstelle ein Memo und konvertiere es in Hex. Du kannst es zum Testen wieder in ASCII zurückkonvertieren.
          
<img src="https://user-images.githubusercontent.com/81990132/199646812-782142d6-8846-443a-8dd9-4f332e49d3e9.png" alt="asciiGOOD" width="400" height="400"/>


  
Erstelle eine z2z-Transaktion (Sapling) unter Verwendung der Hex-Version deines Memos von oben

`zcash-cli z_sendmany "ztestsapling1kg3u0y7szv6509732at34alct46cyn0g26kppgf2a7h5tpqxldtwm7cmhf8rqmhgt" "[{\"address\": \"ztestsapling2kg3u0y7szv6509732at34alct46cyn0g26kppgf2a7h5tpqxldtwm7cmhf8rqmhgtmpakcz5mdv\",\"amount\": 0.0001, \"memo\":\"5A656348756221\"}]"`

Wie setzt du dein zcashScreen fort, nachdem du es getrennt hast?

`screen -r zcashScreen`
     
Wie stoppst du *zcashd*?

`zcash-cli stop`
     
Wie erstellst du eine UA?

`zcash-cli z_getnewaccount`
     
  <img src="https://user-images.githubusercontent.com/81990132/202352436-04c17be2-e914-4b9b-95d1-00cf6fc496d3.png" alt="newAccount" width="400" height="400"/>

    
Erstelle nun einen UA-Empfänger entsprechend *deinen Anforderungen*. Dazu gehören nur Orchard, Orchard + Sapling und schließlich Orchard + Sapling + Transparent. Beachte, dass du die Empfänger daran unterscheiden kannst, wie lang sie sind.
     
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


Wie sendest du ZEC mit einer UA?

`zcash-cli z_sendmany "fromOaddress" "[{\"address\": \"dOrchardAddress\",\"amount\": 0.0001, \"memo\":\"yourMemoinHex\"}]" <minconf> <fee> <privacyPolicy>`

<img src="https://user-images.githubusercontent.com/81990132/202365280-c184f622-eb7e-4095-bc38-90795121c43c.png" alt="UAsuccess" width="400" height="400"/>
<img src="https://user-images.githubusercontent.com/81990132/202366758-40650460-aaeb-4e03-891f-b4bd08e18234.png" alt="pic" width="400" height="400"/>
##### Es sollte beachtet werden, dass sowohl *Absender-* ALS AUCH *Empfängeradressen* transparente, Sapling- oder Orchard-Adressen sein können. Möglicherweise musst du jedoch das Flag `privacyPolicy` anpassen, damit die Transaktion gültig ist. (Einige Kombinationen funktionieren nicht, wenn `privacyPolicy` keinen Sinn ergibt!)


Wo finde ich mehr Informationen über UAs?

> Sieh dir den Beitrag von [Hanh](https://medium.com/@hanh425/transaction-privacy-78f80f9f175e) zum Thema Transaktionsprivatsphäre an. Außerdem [diesen](https://forum.zcashcommunity.com/t/unified-addresses-full-node-rpc-api/41980/2) Beitrag aus dem zcash-Forum.

> [Dies](https://github.com/zcash/zips/issues/470)

     
### Quellen

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
