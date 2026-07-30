<a href="https://github.com/zechub/zechub/edit/main/site/guides/Raspberry_Pi_4_Full_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifier la page"/>
</a>


# Raspberry Pi 4 : guide d’un nœud complet *zcashd* 


L’objectif de ce guide est d’aider à informer les utilisateurs de Zcash qui souhaitent faire tourner un nœud complet sur un Raspberry Pi 4 peu puissant.

<img src="https://user-images.githubusercontent.com/81990132/197372541-dcd886ab-a3d0-4614-b490-0294ddf3ffae.png" alt="zcashd" width="700" height="700"/>


## Vidéo

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/SGYrzhs1l2k"
    title="Comment compiler un nœud Zcash sur Raspberry Pi !"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

## Support

Si vous trouvez ce guide utile, envisagez de faire un don en ZEC pour soutenir ZecHub :

`u1rl2zw85dmjc8m4dmqvtstcyvdjn23n0ad53u5533c97affg9jq208du0vf787vfx4vkd6cd0ma4pxkkuc6xe6ue4dlgjvn9dhzacgk9peejwxdn0ksw3v3yf0dy47znruqftfqgf6xpuelle29g2qxquudxsnnen3dvdx8az6w3tggalc4pla3n4jcs8vf4h29ach3zd8enxulush89`


## Ce que vous allez apprendre

```markdown
* How to create a bootable Ubuntu Server microSD card
* How to setup internet connectivity on the Raspberry Pi 4
* How to access your Raspberry Pi 4 remotely
* How to install zcashd
* How to setup zcashd
* How to use zcashd
```


## Prérequis

> [Kit Canakit Raspberry Pi 4 8GB](https://www.canakit.com/raspberry-pi-4-starter-max-kit.html) ou équivalent

> Un ordinateur avec un lecteur de carte microSD

> Un réseau Wi-Fi ou un câble Ethernet avec une connexion Internet

> SSD/HHD externe avec prise en charge USB3


##### note : assurer la sécurité de votre serveur est *loin* d’être simple. Si vous avez des conseils/recommandations/bonnes pratiques au-delà de ce qui est abordé dans ce guide, *merci* de créer une PR et d’aider à maintenir ce guide aussi à jour que possible.



### Préparer la carte SD

À cette étape, vous allez créer une carte SD *amorçable* qui permettra à votre Raspberry Pi 4 de démarrer. Insérez la carte microSD dans votre ordinateur. Vous devrez peut-être utiliser l’adaptateur fourni avec le Canakit ou tout autre adaptateur équivalent. Installez Raspberry Pi Imager pour votre système d’exploitation. Téléchargez la version correspondant à l’OS auquel vous avez actuellement accès.
     
     > [Ubuntu](https://downloads.raspberrypi.org/imager/imager_latest_amd64.deb)
     
     > [Windows](https://downloads.raspberrypi.org/imager/imager_latest.exe)
     
     > [macOS](https://downloads.raspberrypi.org/imager/imager_latest.dmg)

Par exemple, sous linux, vous saisiriez ce qui suit après le téléchargement :

`sudo dpkg -i imager_latest_amd64.deb`

Ouvrez Raspberry Pi Imager

`rpi-imager`

<img src="https://user-images.githubusercontent.com/81990132/197372069-fb9f7417-d320-42cf-ad65-38d630512985.png" alt="imager rpi" width="400" height="400"/>

Choisissez l’OS et le périphérique de stockage. Comme les Raspberry Pi 4 sont en 64 bits, je recommande de choisir "Other general-purpose OS" => Ubuntu => Ubuntu Server 24.04.3 LTS (64 bit). Cliquez sur Storage et sélectionnez votre carte SD. Avant d’écrire sur la carte SD, cliquez sur Advanced options en cliquant sur l’icône d’engrenage blanche près du coin inférieur droit.


<img src="https://user-images.githubusercontent.com/81990132/197372159-1169c6f4-f6aa-4f44-9679-fe7aa542bbd3.png" alt="engrenage" width="200" height="200"/>



Ici, vous pouvez mettre à jour :

```markdown
* Hostname of your Raspberry Pi 4
* Enable SSH
* Create a username and pw
* Enable and configure your wi-fi if needed
```
 
<img src="https://user-images.githubusercontent.com/81990132/197372149-8b85bfac-e473-4808-87cd-f27f15d05de8.png" alt="avancé" width="400" height="400"/>

 
Une fois terminé, cliquez sur Write


### Démarrer Ubuntu Server

Si vous avez un écran et un clavier supplémentaires, branchez-les maintenant. Remarque : ils sont facultatifs. Insérez la carte SD que vous venez de formater dans le Raspberry Pi 4 et branchez également le SSD/HHD externe sur le port USB3. Branchez aussi le câble d’alimentation et allumez-le.

### Se connecter à distance à votre Raspberry Pi 4

Nous devons maintenant nous connecter à votre Raspberry Pi 4. Ce dont nous avons besoin :

```markdown
* Username and pw (from previous step)
* IP address so we can use SSH
* Monitor, and keyboard (optional)
* If you have a monitor and keyboard connected directly to your pi, the rest of this section can be skipped.
```

Il existe deux façons de trouver votre adresse IP : via la page d’administration de votre routeur, ou avec nmap. Si vous utilisez le routeur, cela dépend du fabricant et je vous laisse chercher rapidement sur Google. Pour nmap, assurez-vous d’abord qu’il est installé :

     `sudo apt-get install nmap`
     
Trouvez l’adresse IP de votre ordinateur actuel et notez les trois premières sections. Il s’agit généralement de 192.168.1.xxx ou 192.168.50.xxx. Renseignez ensuite ces informations dans nmap comme suit :
          
`sudo nmap -sn 192.168.50.0/24`

ou

`sudo nmap -sn 192.168.1.0/24`

Cela affichera tous les appareils connectés à votre réseau domestique, ce qui devrait révéler l’adresse IP / l’adresse MAC de votre Raspberry Pi 4. En utilisant votre nom d’utilisateur, votre pw et votre adresse IP, nous pouvons maintenant nous connecter en SSH

```markdown
* ssh <username>@<ip address of your pi> note: you must plugin *your* username and *your* IP address, and *your* pw when prompted.
* For example: `ssh ubuntu@192.168.1.25 where the username is *ubuntu* and IP address is 192.168.1.25.
```


  <img src="https://user-images.githubusercontent.com/81990132/197372846-e1279388-eaaa-4fbb-8d5d-f9928cb45195.png" alt="connexion ssh" width="400" height="400"/>
       

Si vous êtes curieux de savoir quelle version de Raspberry Pi vous utilisez, essayez cette commande :

     `cat /sys/firmware/devicetree/base/model ; echo`

  <img src="https://user-images.githubusercontent.com/81990132/197689888-367c8eb3-2667-4c8c-85b3-44d46afe07a7.png" alt="lequel" width="700" height="400"/>
### Installation de *zcashd*

Deux façons d’installer zcashd consistent à télécharger un binaire précompilé ou à compiler zcashd depuis le code source. Je recommande *vivement* de compiler depuis le code source. Pour compiler vous-même, il est fortement recommandé de faire une compilation croisée. La compilation croisée consiste à construire sur une plateforme un binaire qui s’exécutera sur une autre plateforme. L’une des raisons est que les Raspberry Pi 4 sont peu puissants et donc pas très rapides ! Appuyez-vous sur votre ordinateur principal pour vous aider dans cette tâche. Vous pouvez récupérer la dernière version [ici](https://github.com/zcash/zcash/releases). Pour faire une compilation croisée, nous devons nous assurer d’avoir les paquets nécessaires. Installez les éléments suivants :

```bash
sudo apt-get install build-essential pkg-config libc6-dev m4 g++-multilib autoconf libtool ncurses-dev unzip git python3 python3-zmq zlib1g-dev curl bsdmainutils automake libtinfo5
sudo apt-get install gcc-aarch64-linux-gnu
```

Ensuite, placez-vous dans le répertoire de la version fraîchement téléchargée de zcashd et exécutez :

`HOST=aarch64-linux-gnu ./zcutil/build.sh`
          

### Configuration de *zcashd*

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/9t2LX3HFldw"
    title="Outil de portefeuille Zcashd - Générer et importer une clé privée"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

---

Nous devons maintenant transférer tous les fichiers binaires de zcashd vers votre Raspberry Pi 4. À partir de Zcashd v5.3, les fichiers nécessaires comprennent :

```markdown
zcashd
zcash-cli
zcash-tx
zcash-gtest
zcash-inspect
zcashd-wallet-tool
fetch-params.sh
```

Ces fichiers se trouvent dans le répertoire /src de l’emplacement de téléchargement de votre dernière version si vous les avez compilés vous-même. Sinon, les fichiers précompilés se trouvent là où vous les avez téléchargés. Deux façons d’effectuer les transferts consistent soit à utiliser SFTP, soit à utiliser votre disque externe.

#### SFTP

```bash
sftp username@<ip of RaspberryPi4>
put zcash*
```
   
#### Copie externe
     
Copiez simplement les fichiers sur le disque externe avant de le brancher sur le Raspberry Pi 4. Si vous avez déjà un nœud complet synchronisé et souhaitez gagner du temps, vous pouvez également copier les données `blocks` et `chainstate`.
   
` cd ~/.zcash/`
     
Exécutez simplement :

```bash
tar -zcvf blocks.tar.gz /blocks
tar -zcvf chainstate.tar.gz /chainstate
```
     
Copiez les fichiers .gz `blocks` et `chainstate` sur votre SSD/HHD externe. Ensuite, montez le SSD/HDD externe dans le dossier Media afin de pouvoir le voir :

```markdown
lsblk affichera tous les disques connectés. La plupart seront au format sda
id affichera votre identifiant utilisateur et vos identifiants de groupe.
```
          
<img src="https://user-images.githubusercontent.com/81990132/197372643-abef88fd-9177-4bf9-abda-3c221188cd10.png" alt="lsblk" width="400" height="400"/>


          
          `sudo mount -o umask=0077,gid=<groupid>,uid=<userid> /dev/sda1 /media/portableHD/`
          
Gardez un œil à la fois sur le propriétaire des dossiers/fichiers et sur les permissions.

```bash
sudo chown -R <username>: portableHD
sudo chmod -R 600 portableHD/
```
     
Si vous avez copié les fichiers .gz `blocks` et `chainstate` depuis votre autre ordinateur, décompressez-les maintenant. Assurez-vous qu’ils se trouvent dans le dossier .zcash de votre disque externe.

```bash
tar - xvzf blocks.tar.gz
tar - xvzf chainstate.tar.gz
```


Configurez /media/portableHD/.zcash/zcash.conf

<img src="https://user-images.githubusercontent.com/81990132/197373699-18cc2c9f-b47d-44e9-9e6b-4c5cccf78d9e.png" alt="zconf" width="700" height="400"/>


 
Remarquez que nous avons déplacé le `datadir` vers le SSD/HDD externe, qui dispose de beaucoup plus d’espace. Puisque l’emplacement par défaut du dossier .zcash a été déplacé, nous devons l’indiquer à *zcashd* en utilisant des liens symboliques :

```markdown
cp -rp ~/.zcash/* /new_dir         // Faire une copie du datadir ou en fournir un via un disque dur externe
rm -rf ~/.zcash                    // Supprimer le dossier par défaut
ln -s /media/portableHD/ ~/.zcash  // Lier symboliquement le nouvel emplacement des données à l’emplacement par défaut pour que zcashd soit satisfait
```
   

Exécutez le script fetch-params.sh pour télécharger les données nécessaires à zcashd
   
    `./fetch-params.sh`


Démarrez un nouveau programme 'screen' [ programme sous linux ]. Ouvrez zcashd avec `-datadir` défini :

```bash
screen -S zcashScreen`     
./zcashd -datadir=/media/portableHD/.zcash/
```
     
Détachez le screen :

`Ctrl+a , Ctrl+d`


Créez un alias afin de ne pas avoir à saisir toutes ces commandes supplémentaires d’emplacement des données

     `alias zcash-cli="./zcash-cli -datadir=/media/portableHD/.zcash/"`


Prêt à l’emploi !

    `zcash-cli getblockchaininfo`

  <img src="https://user-images.githubusercontent.com/81990132/197373098-672aa228-d180-47ea-8a7c-c58dc3882426.png" alt="getblockchaininfo" width="400" height="400"/>



### Utilisation de *zcashd*

<iframe class="w-full h-auto md:h-96" src="https://www.youtube.com/embed/KNhd1KC0Bqk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

---

Comment vérifier l’état de votre nœud ?

     `tail -n 500 <path to>/.zcash/debug.log`

  <img src="https://user-images.githubusercontent.com/81990132/197684416-9a083de4-4a62-4fe8-9cab-798781b38cd2.png" alt="état" width="700" height="400"/>


  
     
Pour obtenir la hauteur actuelle depuis votre journal

     `tail -n 10 <path to>/.zcash/debug.log | grep -o  'height=[^b]*'`

  <img src="https://user-images.githubusercontent.com/81990132/199630447-6a6cd491-0cb3-47f8-95f0-45f6b6555870.png" alt="hauteurJournal" width="500" height="400"/>


     
     `zcash-cli getinfo`
  
<img src="https://user-images.githubusercontent.com/81990132/199646508-132da0eb-899e-49a6-8b31-e9011e159700.png" alt="getInfo" width="400" height="400"/>

     
     
Comment envoyer un mémo ? Comme indiqué [ici](https://zcash.readthedocs.io/en/latest/rtd_pages/memos.html), téléchargez *ascii2hex* et *hex2ascii* et rendez-les exécutables 

`chmod +x ascii2hex hex2ascii`
          
Créez un mémo et convertissez-le en hexadécimal. Vous pouvez le reconvertir en ascii pour tester.
          
<img src="https://user-images.githubusercontent.com/81990132/199646812-782142d6-8846-443a-8dd9-4f332e49d3e9.png" alt="asciiBON" width="400" height="400"/>


  
Créez une transaction z2z (Sapling) en utilisant la version hexadécimale de votre mémo ci-dessus

`zcash-cli z_sendmany "ztestsapling1kg3u0y7szv6509732at34alct46cyn0g26kppgf2a7h5tpqxldtwm7cmhf8rqmhgt" "[{\"address\": \"ztestsapling2kg3u0y7szv6509732at34alct46cyn0g26kppgf2a7h5tpqxldtwm7cmhf8rqmhgtmpakcz5mdv\",\"amount\": 0.0001, \"memo\":\"5A656348756221\"}]"`

Comment reprendre votre zcashScreen après l’avoir détaché ?

`screen -r zcashScreen`
     
Comment arrêter *zcashd* ?

`zcash-cli stop`
     
Comment créer une UA ?

`zcash-cli z_getnewaccount`
     
  <img src="https://user-images.githubusercontent.com/81990132/202352436-04c17be2-e914-4b9b-95d1-00cf6fc496d3.png" alt="nouveauCompte" width="400" height="400"/>

    
Construisez maintenant un récepteur UA selon *vos besoins*. Cela comprend Orchard uniquement, Orchard + Sapling, et enfin Orchard + Sapling + Transparent. Notez que vous pouvez distinguer les récepteurs par leur longueur.
     
<img src="https://user-images.githubusercontent.com/81990132/202354319-2da6be33-ca95-4b6b-b29c-14805dcb9c21.png" alt="caractères" width="200" height="100"/>


`zcash-cli z_getaddressforaccount 0 '["orchard"]'`
     
<img src="https://user-images.githubusercontent.com/81990132/202353642-c36b5fea-de8a-41f6-a27c-d9ff42a0c8d3.png" alt="uaOrchard" width="400" height="400"/>

<img src="https://user-images.githubusercontent.com/81990132/202355586-eaeb36e7-b000-4b99-8192-81e5002e6f11.png" alt="OrchQR" width="400" height="400"/>

`zcash-cli z_getaddressforaccount 0 '["orchard","sapling"]'`
     
<img src="https://user-images.githubusercontent.com/81990132/202353732-740828e3-77b8-4684-8cf8-fb14256b1e61.png" alt="uaOrchardSapling" width="400" height="400"/>
<img src="https://user-images.githubusercontent.com/81990132/202355596-c7b62854-9a9e-4627-ab5d-51091340de71.png" alt="OrchSapQR" width="300" height="200"/>


`zcash-cli z_getaddressforaccount 0 '["orchard","sapling","p2pkh"]'`
     
<img src="https://user-images.githubusercontent.com/81990132/202353793-3331c593-5286-4b84-93a7-adc4928839fd.png" alt="uaComplete" width="400" height="400"/>
<img src="https://user-images.githubusercontent.com/81990132/202355607-75de0750-2a57-4e10-883b-e0a626ed892a.png" alt="QRComplet" width="400" height="400"/>


Comment envoyer des ZEC en utilisant une UA ?

`zcash-cli z_sendmany "fromOaddress" "[{\"address\": \"dOrchardAddress\",\"amount\": 0.0001, \"memo\":\"yourMemoinHex\"}]" <minconf> <fee> <privacyPolicy>`

<img src="https://user-images.githubusercontent.com/81990132/202365280-c184f622-eb7e-4095-bc38-90795121c43c.png" alt="UAsuccès" width="400" height="400"/>
<img src="https://user-images.githubusercontent.com/81990132/202366758-40650460-aaeb-4e03-891f-b4bd08e18234.png" alt="image" width="400" height="400"/>
##### Il convient de noter que les adresses *source* ET de *destination* peuvent être des adresses transparentes, sapling ou orchard ; toutefois, vous devrez შესაძლოა ajuster le drapeau privacyPolicy afin que la transaction soit valide. (Certaines combinaisons ne fonctionneront pas si privacyPolicy n’a pas de sens !)


Où puis-je trouver plus d’informations sur les UA ?

> Consultez l’article de [Hanh](https://medium.com/@hanh425/transaction-privacy-78f80f9f175e) sur la confidentialité des transactions. Consultez aussi [ceci](https://forum.zcashcommunity.com/t/unified-addresses-full-node-rpc-api/41980/2), un message du forum zcash.

> [Ceci](https://github.com/zcash/zips/issues/470)

     
### Sources

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
