
# ![raspi](https://user-images.githubusercontent.com/81990132/197372285-1f413bc5-13a0-4671-9c81-760eafdda926.png)Raspberry Pi 4: una guida su *zcashd* Full Node


Lo scopo di questa guida è quello di aiutare a istruire gli utenti di Zcash che sono interessati ad eseguire un nodo completo su un Raspberry Pi 4 a basso consumo energetico.

![zcashdPI](https://user-images.githubusercontent.com/81990132/197372541-dcd886ab-a3d0-4614-b490-0294ddf3ffae.png)


Se trovi utile questa guida, considera di donare ZEC per sostenere ZecHub:

`zs1txa9wzxsc46w4940c4t76wjlylhntyp7vcppsp8re32z02srqse038melgglew4jwsh3qes4m4n`


## Cosa imparerai
* Come creare una microSD avviabile per Ubuntu Server
* Come configurare la connessione Internet sul Raspberry Pi 4
* Come accedere al tuo Raspberry Pi 4 in remoto
* Come installare *zcashd*
* Come inizializzare *zcashd*
* Come usare *zcashd*


## Prerequisiti
* [8GB Raspberry Pi 4 Canakit](https://www.canakit.com/raspberry-pi-4-starter-max-kit.html) or equivalent
* Un computer con l'adattatore ed un'unità microSD
* Una rete Wi-Fi o un cavo ethernet con una connessione Internet
* Un SSD/HHD con supporto USB3.

##### nota: mantenere il proprio server sicuro *non* è affatto semplice. Qualsiasi consiglio/raccomandazione/buona pratica al di là di ciò che viene discusso in questa guida, *per favore* crea una richiesta di pull (PR) e aiuta a mantenere questa guida il più possibile aggiornata.






## Contenuti:
* [Preparare la scheda SD](https://github.com/dismad/zechub/blob/main/site/guides/RaspberryPi4FullNode.md#prepare-the-sd-card)
* [Avviare Ubuntu Server](https://github.com/dismad/zechub/blob/main/site/guides/RaspberryPi4FullNode.md#boot-ubuntu-server)
* [Connettersi in remoto al proprio Raspberry Pi 4](https://github.com/dismad/zechub/blob/main/site/guides/RaspberryPi4FullNode.md#connect-remotely-to-your-raspberry-pi-4)
* [Installare *zcashd*](https://github.com/dismad/zechub/blob/main/site/guides/RaspberryPi4FullNode.md#installing-zcashd)
* [Inizializzare *zcashd*](https://github.com/dismad/zechub/blob/main/site/guides/RaspberryPi4FullNode.md#setup-zcashd)
* [Usare *zcashd*](https://github.com/dismad/zechub/blob/main/site/guides/RaspberryPi4FullNode.md#using-zcashd)
* [Fonti](https://github.com/dismad/zechub/blob/main/site/guides/RaspberryPi4FullNode.md#sources)

### Prepara la scheda SD

In questo passaggio creerai una scheda SD *avviabile* che farà avviare il tuo Raspberry Pi 4.

* Inserisci la scheda microSD nel tuo computer. Potrebbe essere necessario utilizzare l'adattatore fornito con il kit Canakit o qualsiasi altro adattatore che lo permetta.
* Installa Raspberry Pi Imager per il tuo sistema operativo. Scarica la versione per il sistema operativo a cui attualmente hai accesso.
     
     * [Ubuntu](https://downloads.raspberrypi.org/imager/imager_latest_amd64.deb)
     * [Windows](https://downloads.raspberrypi.org/imager/imager_latest.exe)
     * [macOS](https://downloads.raspberrypi.org/imager/imager_latest.dmg)

Ad esempio, in Linux, digiteresti quanto segue dopo aver scaricato:

`sudo dpkg -i imager_latest_amd64.deb`

* Apri Raspberry Pi Imager

`rpi-imager`


![rpi-imager](https://user-images.githubusercontent.com/81990132/197372069-fb9f7417-d320-42cf-ad65-38d630512985.png)

* Scegli il sistema operativo e il dispositivo di archiviazione. Poiché i Raspberry Pi 4 sono a 64 bit, raccomando di scegliere "Altri sistemi operativi generici" => Ubuntu => Ubuntu Server 22.10 (64 bit). Clicca su "Archiviazione" e seleziona la tua scheda SD

* Prima di scrivere sulla scheda SD, clicca su "Opzioni avanzate" cliccando sull'icona a forma di ingranaggio bianco vicino all'angolo in basso a destra.


![gear](https://user-images.githubusercontent.com/81990132/197372159-1169c6f4-f6aa-4f44-9679-fe7aa542bbd3.png)


* Qui puoi aggiornare:

     * Hostname del tuo Raspberry Pi 4
     * Abilitare SSH
     * Creare un username ed una password
     * Abilitare e configurare il tuo wi-fi se c'è bisogno
 
 ![avanzato](https://user-images.githubusercontent.com/81990132/197372149-8b85bfac-e473-4808-87cd-f27f15d05de8.png)

 
* Una volta completato, clicca su "Write"


### Avvia Ubuntu Server

Se hai un monitor e una tastiera aggiuntivi, collegali ora. Nota: questi sono opzionali


* Installare la scheda SD appena formattata nel Raspberry Pi 4 e collegare anche l'unità SSD/HDD esterna alla porta USB3. Collegare il cavo di alimentazione e accendere il dispositivo.


### Collegarsi in remoto al proprio Raspberry Pi 4

* Ora devi collegarti al tuo Raspberry Pi 4. Cose di cui abbiamo bisogno:

     * Username e la password (del passo precedente)
     * Indirizzo IP in modo da poter utilizzare SSH
     * Monitor, e la tastiera (opzionali)

* Se hai un monitor e una tastiera collegati direttamente al tuo Raspberry Pi, il resto di questa sezione può essere saltato.

* Ci sono due modi per trovare il tuo indirizzo IP: tramite la pagina di amministrazione del router o con nmap. Se si utilizza il router, dipende dal produttore e quindi fare una rapida ricerca su Google.
 
     * Per nmap, assicurati prima che sia installato:

     `sudo apt-get install nmap`
     
     * Trova l'indirizzo IP del tuo computer e nota i primi tre gruppi di numeri. Di solito è 192.168.1.xxx o 192.168.50.xxx
     * Inserisci questi dettagli in nmap come segue:
          
          * `sudo nmap -sn 192.168.50.0/24` o `sudo nmap -sn 192.168.1.0/24`
          * Ciò mostrerà tutti i dispositivi connessi alla tua rete domestica, il che dovrebbe rivelare l'indirizzo IP / indirizzo MAC del tuo Raspberry Pi 4.
          
* Usando il tuo username, password, ed indirizzo IP possiamo ora accedere usando SSH

     * `ssh <username>@<ip address of your pi>` nota: dovrai inserire il *tuo* nome utente, il *tuo* indirizzo IP e la *tua* password quando richiesto.

     * Per esempio: `ssh ubuntu@192.168.1.25` dove l'username è *ubuntu* e lindirizzo IP è 192.168.1.25.


   ![sshLogin](https://user-images.githubusercontent.com/81990132/197372846-e1279388-eaaa-4fbb-8d5d-f9928cb45195.png)
       

* Se sei curioso di sapere quale versione di Raspberry Pi stai utilizzando, prova questo comando:

     `cat /sys/firmware/devicetree/base/model ; echo`
     
     ![quale](https://user-images.githubusercontent.com/81990132/197689888-367c8eb3-2667-4c8c-85b3-44d46afe07a7.png)
         

### Installazione di *zcashd*

* Ci sono due modi per installare zcashd includono scaricare un binario precompilato o compilare zcashd dalla fonte. Consiglio *vivamente* di compilare dalla fonte.
     * Se si scarica un binario precompilato, una sorgente è [adityapk00](https://github.com/adityapk00/zcash/releases) . Si noti che poiché stiamo utilizzando un sistema operativo a 64 bit, abbiamo bisogno di zcash-linux-aarch64-v*.tar.gz. Si noti inoltre che le versioni aggiornate di zcashd sono raramente precompilate.

     * Per la compilazione è altamente consigliato effettuare una cross-compilazione. La cross-compilazione consiste nella costruzione di un binario su una piattaforma che verrà eseguita su un'altra piattaforma. Una delle ragioni per questo è che i Raspberry Pi 4 sono poco potenti e quindi non molto veloci! Utilizza il tuo computer principale per aiutare in questo processo. Puoi scaricare l'ultima versione disponibile [qui](https://github.com/zcash/zcash/releases).

     * Per effettuare la cross-compilazione, è necessario assicurarsi di avere i pacchetti necessari. Si coonsiglia di installare i seguenti:

          * `sudo apt-get install build-essential pkg-config libc6-dev m4 g++-multilib autoconf libtool ncurses-dev unzip git python3 python3-zmq zlib1g-dev curl bsdmainutils automake libtinfo5`

          * `sudo apt-get install gcc-aarch64-linux-gnu`

     * Successivamente, accedi alla cartella della versione di zcashd appena scaricata e avvia il seguente comando:

          `HOST=aarch64-linux-gnu ./zcutil/build.sh`
          
     * https://www.youtube.com/watch?v=MIgkTW9Rfzs

### Configurazione di *zcashd*

*  Adesso dobbiamo trasferire tutti i file binari di zcashd al tuo Raspberry Pi 4. A partire dalla versione 5.3 di Zcashd, i file necessari includono:
     
     `zcashd`
     `zcash-cli`
     `zcash-tx`
     `zcash-gtest`
     `zcash-inspect`
     `zcashd-wallet-tool`
     `fetch-params.sh`

* Questi file si trovano nella cartella /src della tua ultima versione scaricata se li hai compilati tu stesso. In caso contrario, i file precompilati si trovano nella posizione in cui li hai scaricati.
         
* Ci sono due modi per effettuare il trasferimento, usando SFTP o utilizzando un'unità esterna.

     *SFTP*

    `sftp username@<ip of RaspberryPi4>`
    
    
    `put zcashd`
    
    `put zcash-cli`
    
    `put zcash-tx`
    
    `put zcash-gtest`
    
    `put zcash-inspect`
    
    `put zcashd-wallet-tool`
    
    `put fetch-params.sh`
   
     *OPPURE*
     
     Semplicemente copiare i file sull'unità esterna prima di collegarla al Raspberry Pi 4.
     
* Se hai già un full node sincronizzato e vuoi risparmiare del tempo, puoi anche copiare i blocchi e lo stato della catena (chainstate).
   
    ` cd ~/.zcash/`
     
    * Semplicemente esegui:

     `tar -zcvf blocks.tar.gz /blocks`
     `tar -zcvf chainstate.tar.gz /chainstate` 
     
    * Copia i blocchi e lo stato della catena, i file .gz, nel tuo SSD/HHD esterno.   


     
 * Utilizzo di un SSD/HDD esterno sul tuo Raspberry Pi 4

     * Monta l'SSD/HDD esterno nella cartella Media in modo da poterlo visualizzare:
     
          `lsblk` mostrerà tutti i drive connessi. La maggior parte avrà il formato sda.
          
          `id` mostrerà l'ID del tuo utente e del tuo gruppo.
          
          ![lsblk](https://user-images.githubusercontent.com/81990132/197372643-abef88fd-9177-4bf9-abda-3c221188cd10.png)

          
          `sudo mount -o umask=0077,gid=<groupid>,uid=<userid> /dev/sda1 /media/portableHD/`
          
     * Stai attento sia al proprietario delle cartelle/file che ai permessi.

          `sudo chown -R <username>: portableHD`
          `sudo chmod -R 700 portableHD/`
     
     * Se hai copiato i file .gz dei blocchi e del chainstate dal tuo altro computer, estraili adesso. Assicurati che siano nella cartella .zcash sull'unità esterna.

          `tar - xvzf blocks.tar.gz`
          `tar - xvzf chainstate.tar.gz`


* Configura /media/portableHD/.zcash/zcash.conf


![zconf](https://user-images.githubusercontent.com/81990132/197373699-18cc2c9f-b47d-44e9-9e6b-4c5cccf78d9e.png)

 
* Nota come abbiamo spostato il datadir sull'SSD/HDD esterno che ha molto più spazio disponibile.
     

* Poiché la posizione della cartella .zcash predefinita è stata spostata, dobbiamo comunicarlo a *zcashd* utilizzando i symbolic links:
  
   `cp -rp ~/.zcash/* /new_dir `            // Fai una copia del datadir o forniscilo con un HD esterno
   
   `rm -rf ~/.zcash`                        // Rimuovi la cartella predefinita
   
   `ln -s /media/portableHD/ ~/.zcash`     // Crea un symbolic link dalla nuova posizione dei dati a quella predefinita 
   

Esegui lo script fetch-params.sh per scaricare i dati necessari per zcashd
   
    `./fetch-params.sh`


* Inizia una nuova "schermata" [programma in Linux]. Apri zcashd con -datadir impostato:

     * `screen -S zcashScreen`
     
     * `./zcashd -datadir=/media/portableHD/.zcash/`
     
     * Detach the screen. `Ctrl+a , Ctrl+d`


* Crea un alias in modo da non dover digitare tutti questi comandi di posizione dati aggiuntivi.

     `alias zcash-cli="./zcash-cli -datadir=/media/portableHD/.zcash/"`


* Pronto all'uso!

    `zcash-cli getblockchaininfo`
    
    ![getBlockchaininfo](https://user-images.githubusercontent.com/81990132/197373098-672aa228-d180-47ea-8a7c-c58dc3882426.png)


### Using *zcashd*

* Come verificare lo stato del tuo nodo?

     `tail -n 500 <path to>/.zcash/debug.log`
     
     ![status](https://user-images.githubusercontent.com/81990132/197684416-9a083de4-4a62-4fe8-9cab-798781b38cd2.png)
     
* Per ottenere l'altezza corrente dal tuo registro.

     `tail -n 10 <path to>/.zcash/debug.log | grep -o  'height=[^b]*'`
     
     ![logHeight](https://user-images.githubusercontent.com/81990132/199630447-6a6cd491-0cb3-47f8-95f0-45f6b6555870.png)

     
     `zcash-cli getinfo`
     
     ![getinfo](https://user-images.githubusercontent.com/81990132/199646508-132da0eb-899e-49a6-8b31-e9011e159700.png)

     
     
* Come si invia una memo?

     * Come visto [qui](https://zcash.readthedocs.io/en/latest/rtd_pages/memos.html), scarica 

         `ascii2hex`
         
          e
          
         `hex2ascii`
         
          
     *  Rendili eseguibili.

          `chmod +x ascii2hex hex2ascii`
          
     * Crea una memo e convertila in formato esadecimale (HEX). Puoi convertirla nuovamente in formato ASCII per testarla.
          
        ![asciiGOOD](https://user-images.githubusercontent.com/81990132/199646812-782142d6-8846-443a-8dd9-4f332e49d3e9.png)

  
     * Crea una transazione z2z (Sapling) utilizzando la versione esadecimale della tua memo precedente.

          `zcash-cli z_sendmany "ztestsapling1kg3u0y7szv6509732at34alct46cyn0g26kppgf2a7h5tpqxldtwm7cmhf8rqmhgt" "[{\"address\": \"ztestsapling2kg3u0y7szv6509732at34alct46cyn0g26kppgf2a7h5tpqxldtwm7cmhf8rqmhgtmpakcz5mdv\",\"amount\": 0.0001, \"memo\":\"5A656348756221\"}]"`

* Come si ripristina la schermata di zcash dopo averla distaccata?

     `screen -r zcashScreen`
     
* Come si ferma *zcashd* ?

     `zcash-cli stop`
     
* Come si crea un UA?

     `zcash-cli z_getnewaccount`
     
    ![newAccount](https://user-images.githubusercontent.com/81990132/202352436-04c17be2-e914-4b9b-95d1-00cf6fc496d3.png)
    
   * Ora costruisci un ricevitore UA in base alle tue esigenze. Questo includerà solo Orchard, Orchard + Sapling e infine Orchard + Sapling + Transparent.
   
   * Nota che puoi distinguere tra i ricevitori in base alla loro lunghezza.

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


* Come si invia ZEC utilizzando un UA?

     `zcash-cli z_sendmany "fromOaddress" "[{\"address\": \"dOrchardAddress\",\"amount\": 0.0001, \"memo\":\"yourMemoinHex\"}]" <minconf> <fee> <privacyPolicy>`
     
    ![UAsuccess](https://user-images.githubusercontent.com/81990132/202365280-c184f622-eb7e-4095-bc38-90795121c43c.png)
    
    ![pic](https://user-images.githubusercontent.com/81990132/202366758-40650460-aaeb-4e03-891f-b4bd08e18234.png)

    
    ##### È importante notare che sia gli indirizzi di *partenza* che quelli di *destinazione* possono essere indirizzi trasparenti, di sapling o di orchard, tuttavia potrebbe essere necessario regolare il flag privacyPolicy affinché la transazione sia valida. (Alcune combinazioni non funzioneranno se privacyPolicy non ha senso!)


     
* Dove posso trovare ulteriori informazioni sugli UA?

     * Dai un'occhiata a [Hanh's](https://medium.com/@hanh425/transaction-privacy-78f80f9f175e) post sulla privacy delle transazioni. Anche [questo](https://forum.zcashcommunity.com/t/unified-addresses-full-node-rpc-api/41980/2) post dal forum di zcash.
     * [Questo](https://github.com/zcash/zips/issues/470)

     


### Fonti

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
