<a href="https://github.com/zechub/zechub/edit/main/site/guides/Raspberry_Pi_4_Full_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Raspberry Pi 4: guida a un nodo completo *zcashd*


Lo scopo di questa guida è aiutare a istruire gli Zcasher interessati a far girare un nodo completo su un Raspberry Pi 4 a basso consumo.

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

## Supporto

Se trovi utile questa guida, valuta di donare ZEC per sostenere ZecHub:

`u1rl2zw85dmjc8m4dmqvtstcyvdjn23n0ad53u5533c97affg9jq208du0vf787vfx4vkd6cd0ma4pxkkuc6xe6ue4dlgjvn9dhzacgk9peejwxdn0ksw3v3yf0dy47znruqftfqgf6xpuelle29g2qxquudxsnnen3dvdx8az6w3tggalc4pla3n4jcs8vf4h29ach3zd8enxulush89`


## Cosa imparerai

```markdown
* How to create a bootable Ubuntu Server microSD card
* How to setup internet connectivity on the Raspberry Pi 4
* How to access your Raspberry Pi 4 remotely
* How to install zcashd
* How to setup zcashd
* How to use zcashd
```


## Prerequisiti

> [Canakit Raspberry Pi 4 da 8GB](https://www.canakit.com/raspberry-pi-4-starter-max-kit.html) o equivalente

> Un computer con un lettore di schede microSD

> Una rete Wi-Fi o un cavo ethernet con connessione a internet

> SSD/HHD esterno con supporto USB3


##### nota: mantenere sicuro il tuo server *non* è affatto semplice. Per qualsiasi suggerimento/raccomandazione/buona pratica che vada oltre quanto trattato in questa guida, *per favore* crea una PR e aiuta a mantenere questa guida il più aggiornata possibile.



### Preparare la scheda SD

In questo passaggio creerai una scheda SD *avviabile* che permetterà al tuo Raspberry Pi 4 di avviarsi. Inserisci la scheda microSD nel computer. Potresti dover usare l'adattatore fornito con il Canakit o qualsiasi altro adattatore equivalente. Installa Raspberry Pi Imager per il tuo sistema operativo. Scarica la versione per il sistema operativo a cui hai accesso al momento.
     
     > [Ubuntu](https://downloads.raspberrypi.org/imager/imager_latest_amd64.deb)
     
     > [Windows](https://downloads.raspberrypi.org/imager/imager_latest.exe)
     
     > [macOS](https://downloads.raspberrypi.org/imager/imager_latest.dmg)

Per esempio, su linux dopo aver scaricato digiteresti quanto segue:

`sudo dpkg -i imager_latest_amd64.deb`

Apri Raspberry Pi Imager

`rpi-imager`

<img src="https://user-images.githubusercontent.com/81990132/197372069-fb9f7417-d320-42cf-ad65-38d630512985.png" alt="rpi imager" width="400" height="400"/>

Scegli il sistema operativo e il dispositivo di archiviazione. Poiché i Raspberry Pi 4 sono a 64 bit, consiglio di scegliere "Other general-purpose OS" => Ubuntu => Ubuntu Server 24.04.3 LTS (64 bit). Clicca su Storage e seleziona la tua scheda SD. Prima di scrivere sulla scheda SD, clicca su Advanced options cliccando sull'icona bianca a forma di ingranaggio vicino all'angolo in basso a destra.


<img src="https://user-images.githubusercontent.com/81990132/197372159-1169c6f4-f6aa-4f44-9679-fe7aa542bbd3.png" alt="gear" width="200" height="200"/>



Qui puoi aggiornare:

```markdown
* Hostname of your Raspberry Pi 4
* Enable SSH
* Create a username and pw
* Enable and configure your wi-fi if needed
```
 
<img src="https://user-images.githubusercontent.com/81990132/197372149-8b85bfac-e473-4808-87cd-f27f15d05de8.png" alt="advanced" width="400" height="400"/>

 
Una volta completato premi Write


### Avviare Ubuntu Server

Se hai un monitor e una tastiera in più collegali ora. Nota: sono opzionali. Inserisci la scheda SD appena formattata nel Raspberry Pi 4 e collega anche l'SSD/HHD esterno alla porta USB3. Collega anche il cavo di alimentazione e accendilo.

### Connettersi da remoto al tuo Raspberry Pi 4

Ora dobbiamo connetterci al tuo Raspberry Pi 4. Cose che ci servono:

```markdown
* Username and pw (from previous step)
* IP address so we can use SSH
* Monitor, and keyboard (optional)
* If you have a monitor and keyboard connected directly to your pi, the rest of this section can be skipped.
```

Due modi per trovare il tuo indirizzo IP sono tramite la pagina di amministrazione del router, oppure con nmap. Se usi il router, dipende dal produttore e rimando questi dettagli a una rapida ricerca su google. Per nmap, prima assicurati che sia installato:

     `sudo apt-get install nmap`
     
Trova l'indirizzo IP del tuo computer attuale e annota le prime tre sezioni. Tipicamente è 192.168.1.xxx o 192.168.50.xxx. Inserisci questi dettagli in nmap come segue:
          
`sudo nmap -sn 192.168.50.0/24`

oppure

`sudo nmap -sn 192.168.1.0/24`

Questo mostrerà tutti i dispositivi connessi alla tua rete domestica, che dovrebbe rivelare l'indirizzo IP / indirizzo MAC del tuo Raspberry Pi 4. Usando il tuo username, la tua pw e il tuo indirizzo IP possiamo ora effettuare il login tramite SSH

```markdown
* ssh <username>@<ip address of your pi> note: you must plugin *your* username and *your* IP address, and *your* pw when prompted.
* For example: `ssh ubuntu@192.168.1.25 where the username is *ubuntu* and IP address is 192.168.1.25.
```


  <img src="https://user-images.githubusercontent.com/81990132/197372846-e1279388-eaaa-4fbb-8d5d-f9928cb45195.png" alt="sshLogin" width="400" height="400"/>
       

Se sei curioso di sapere quale versione di Raspberry Pi stai usando, prova questo comando:

     `cat /sys/firmware/devicetree/base/model ; echo`

  <img src="https://user-images.githubusercontent.com/81990132/197689888-367c8eb3-2667-4c8c-85b3-44d46afe07a7.png" alt="which" width="700" height="400"/>

         

### Installare *zcashd*

Due modi per installare zcashd includono il download di un binario precompilato oppure la compilazione di zcashd dal codice sorgente. Consiglio *vivamente* di compilare dal sorgente. Per compilare da soli è altamente raccomandato il cross-compile. Il cross-compile consiste nel costruire su una piattaforma un binario che girerà su un'altra piattaforma. Una delle ragioni è che i Raspberry Pi 4 sono a basso consumo e quindi non molto veloci! Sfrutta il tuo computer principale per aiutarti in questo. Puoi prendere l'ultima release [qui](https://github.com/zcash/zcash/releases). Per fare il cross-compile dobbiamo assicurarci di avere i pacchetti necessari. Installa quanto segue:

```bash
sudo apt-get install build-essential pkg-config libc6-dev m4 g++-multilib autoconf libtool ncurses-dev unzip git python3 python3-zmq zlib1g-dev curl bsdmainutils automake libtinfo5
sudo apt-get install gcc-aarch64-linux-gnu
```

Poi spostati nella directory della release di zcashd appena scaricata ed esegui:

`HOST=aarch64-linux-gnu ./zcutil/build.sh`
          

### Configurare *zcashd*

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

Ora dobbiamo trasferire tutti i file binari di zcashd sul tuo Raspberry Pi 4. A partire da Zcashd v5.3 i file necessari includono:

```markdown
zcashd
zcash-cli
zcash-tx
zcash-gtest
zcash-inspect
zcashd-wallet-tool
fetch-params.sh
```

Questi file si trovano nella directory /src della tua ultima release scaricata se li hai compilati tu stesso. Altrimenti, i file precompilati sono dove li hai scaricati. Due modi per realizzare i trasferimenti sono usare SFTP, oppure usare il tuo drive esterno.

#### SFTP

```bash
sftp username@<ip of RaspberryPi4>
put zcash*
```
   
#### Copia esterna
     
Copia semplicemente i file sul drive esterno prima di collegarlo al Raspberry Pi 4. Se hai già un nodo completo sincronizzato e vuoi risparmiare tempo, puoi anche copiare i dati di blocks e chainstate.
   
` cd ~/.zcash/`
     
Esegui semplicemente:

```bash
tar -zcvf blocks.tar.gz /blocks
tar -zcvf chainstate.tar.gz /chainstate
```
     
Copia i file .gz di blocks e chainstate sul tuo SSD/HHD esterno. Poi monta l'SSD/HDD esterno nella cartella Media così da poterlo vedere:

```markdown
lsblk will display all drives connected. Most will be of the format sda
id will show your user and group id's.
```
          
<img src="https://user-images.githubusercontent.com/81990132/197372643-abef88fd-9177-4bf9-abda-3c221188cd10.png" alt="lsblk" width="400" height="400"/>


          
          `sudo mount -o umask=0077,gid=<groupid>,uid=<userid> /dev/sda1 /media/portableHD/`
          
Tieni d'occhio sia chi possiede le cartelle/file sia i permessi.

```bash
sudo chown -R <username>: portableHD
sudo chmod -R 600 portableHD/
```
     
Se hai copiato i file .gz di blocks e chainstate dall'altro computer, estraili ora. Assicurati che siano nella cartella .zcash sul tuo drive esterno.

```bash
tar - xvzf blocks.tar.gz
tar - xvzf chainstate.tar.gz
```


Configura /media/portableHD/.zcash/zcash.conf

<img src="https://user-images.githubusercontent.com/81990132/197373699-18cc2c9f-b47d-44e9-9e6b-4c5cccf78d9e.png" alt="zconf" width="700" height="400"/>


 
Nota come abbiamo spostato la datadir sull'SSD/HDD esterno che ha molto più spazio disponibile. Poiché la posizione predefinita della cartella .zcash è stata spostata, dobbiamo comunicarlo a *zcashd* usando i collegamenti simbolici:

```markdown
cp -rp ~/.zcash/* /new_dir         // Make copy of datadir or supply with an external HD
rm -rf ~/.zcash                    // Remove default folder
ln -s /media/portableHD/ ~/.zcash  // Symbolic link new data location to the default so zcashd is happy
```
   

Esegui lo script fetch-params.sh per scaricare i dati necessari a zcashd
   
    `./fetch-params.sh`


Avvia un nuovo 'screen' [ programma in linux ]. Apri zcashd con -datadir impostato:

```bash
screen -S zcashScreen`     
./zcashd -datadir=/media/portableHD/.zcash/
```
     
Stacca lo screen:

`Ctrl+a , Ctrl+d`


Crea un alias così non devi digitare tutti questi comandi extra sulla posizione dei dati

     `alias zcash-cli="./zcash-cli -datadir=/media/portableHD/.zcash/"`


Pronto all'uso!

    `zcash-cli getblockchaininfo`

  <img src="https://user-images.githubusercontent.com/81990132/197373098-672aa228-d180-47ea-8a7c-c58dc3882426.png" alt="getblockchaininfo" width="400" height="400"/>



### Usare *zcashd*

<iframe class="w-full h-auto md:h-96" src="https://www.youtube.com/embed/KNhd1KC0Bqk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

---

Come controlli lo stato del tuo nodo?

     `tail -n 500 <path to>/.zcash/debug.log`

  <img src="https://user-images.githubusercontent.com/81990132/197684416-9a083de4-4a62-4fe8-9cab-798781b38cd2.png" alt="status" width="700" height="400"/>


  
     
Per ottenere l'altezza attuale dal tuo log

     `tail -n 10 <path to>/.zcash/debug.log | grep -o  'height=[^b]*'`

  <img src="https://user-images.githubusercontent.com/81990132/199630447-6a6cd491-0cb3-47f8-95f0-45f6b6555870.png" alt="logHeight" width="500" height="400"/>


     
     `zcash-cli getinfo`
  
<img src="https://user-images.githubusercontent.com/81990132/199646508-132da0eb-899e-49a6-8b31-e9011e159700.png" alt="getInfo" width="400" height="400"/>

     
     
Come invii un memo? Come mostrato [qui](https://zcash.readthedocs.io/en/latest/rtd_pages/memos.html), scarica *ascii2hex* e *hex2ascii* e rendili eseguibili 

`chmod +x ascii2hex hex2ascii`
          
Crea un memo e convertilo in hex. Puoi riconvertirlo in ascii per fare una verifica.
          
<img src="https://user-images.githubusercontent.com/81990132/199646812-782142d6-8846-443a-8dd9-4f332e49d3e9.png" alt="asciiGOOD" width="400" height="400"/>


  
Crea una transazione z2z (Sapling) usando la versione hex del tuo memo qui sopra

`zcash-cli z_sendmany "ztestsapling1kg3u0y7szv6509732at34alct46cyn0g26kppgf2a7h5tpqxldtwm7cmhf8rqmhgt" "[{\"address\": \"ztestsapling2kg3u0y7szv6509732at34alct46cyn0g26kppgf2a7h5tpqxldtwm7cmhf8rqmhgtmpakcz5mdv\",\"amount\": 0.0001, \"memo\":\"5A656348756221\"}]"`

Come riprendi il tuo zcashScreen dopo averlo staccato?

`screen -r zcashScreen`
     
Come fermi *zcashd*?

`zcash-cli stop`
     
Come crei una UA?

`zcash-cli z_getnewaccount`
     
  <img src="https://user-images.githubusercontent.com/81990132/202352436-04c17be2-e914-4b9b-95d1-00cf6fc496d3.png" alt="newAccount" width="400" height="400"/>

    
Ora costruisci un receiver per la UA in base alle *tue esigenze*. Questo include solo Orchard, Orchard + Sapling, e infine Orchard + Sapling + Transparent. Nota che puoi distinguere i receiver dalla loro lunghezza.
     
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


Come invii ZEC usando una UA?

`zcash-cli z_sendmany "fromOaddress" "[{\"address\": \"dOrchardAddress\",\"amount\": 0.0001, \"memo\":\"yourMemoinHex\"}]" <minconf> <fee> <privacyPolicy>`

<img src="https://user-images.githubusercontent.com/81990132/202365280-c184f622-eb7e-4095-bc38-90795121c43c.png" alt="UAsuccess" width="400" height="400"/>
<img src="https://user-images.githubusercontent.com/81990132/202366758-40650460-aaeb-4e03-891f-b4bd08e18234.png" alt="pic" width="400" height="400"/>

    
##### Va sottolineato che sia l'indirizzo *di partenza* SIA quello *di destinazione* possono essere indirizzi transparent, sapling o orchard, tuttavia potresti dover regolare il flag privacyPolicy affinché la transazione sia valida. (Alcune combinazioni non funzioneranno se privacyPolicy non ha senso!)


Dove posso trovare maggiori informazioni sulle UA?

> Dai un'occhiata al [post](https://medium.com/@hanh425/transaction-privacy-78f80f9f175e) di [Hanh](https://medium.com/@hanh425/transaction-privacy-78f80f9f175e) sulla privacy delle transazioni. Anche [questo](https://forum.zcashcommunity.com/t/unified-addresses-full-node-rpc-api/41980/2) post dal forum di zcash.

> [Questo](https://github.com/zcash/zips/issues/470)

     
### Fonti

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
