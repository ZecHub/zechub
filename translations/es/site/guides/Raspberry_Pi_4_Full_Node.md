<a href="https://github.com/zechub/zechub/edit/main/site/guides/Raspberry_Pi_4_Full_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>


# Raspberry Pi 4: una guía de nodo completo de *zcashd* 


El propósito de esta guía es ayudar a educar a los Zcashers que estén interesados en ejecutar un nodo completo en una Raspberry Pi 4 de baja potencia.

<img src="https://user-images.githubusercontent.com/81990132/197372541-dcd886ab-a3d0-4614-b490-0294ddf3ffae.png" alt="zcashd" width="700" height="700"/>


## Video

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/SGYrzhs1l2k"
    title="¡Cómo compilar un nodo de Zcash en Raspberry Pi!"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

## Soporte

Si esta guía te resulta útil, considera donar ZEC para apoyar a ZecHub:

`u1rl2zw85dmjc8m4dmqvtstcyvdjn23n0ad53u5533c97affg9jq208du0vf787vfx4vkd6cd0ma4pxkkuc6xe6ue4dlgjvn9dhzacgk9peejwxdn0ksw3v3yf0dy47znruqftfqgf6xpuelle29g2qxquudxsnnen3dvdx8az6w3tggalc4pla3n4jcs8vf4h29ach3zd8enxulush89`


## Qué aprenderás

```markdown
* How to create a bootable Ubuntu Server microSD card
* How to setup internet connectivity on the Raspberry Pi 4
* How to access your Raspberry Pi 4 remotely
* How to install zcashd
* How to setup zcashd
* How to use zcashd
```


## Requisitos previos

> [Canakit Raspberry Pi 4 de 8GB](https://www.canakit.com/raspberry-pi-4-starter-max-kit.html) o equivalente

> Un ordenador con lector de tarjetas microSD

> Una red Wi-Fi o un cable ethernet con conexión a internet

> SSD/HHD externo con soporte USB3


##### nota: mantener tu servidor seguro *no* es nada sencillo. Si tienes consejos/recomendaciones/mejores prácticas además de lo que se comenta en esta guía, por favor crea un PR y ayuda a mantener esta guía lo más actualizada posible.



### Preparar la tarjeta SD

En este paso crearás una tarjeta SD *booteable* que permitirá arrancar tu Raspberry Pi 4. Inserta la tarjeta microSD en tu ordenador. Puede que necesites usar el adaptador que viene con el Canakit o cualquier otro adaptador equivalente. Instala Raspberry Pi Imager para tu sistema operativo. Descarga la versión para el SO al que tengas acceso actualmente.
     
     > [Ubuntu](https://downloads.raspberrypi.org/imager/imager_latest_amd64.deb)
     
     > [Windows](https://downloads.raspberrypi.org/imager/imager_latest.exe)
     
     > [macOS](https://downloads.raspberrypi.org/imager/imager_latest.dmg)

Por ejemplo, en Linux escribirías lo siguiente después de descargarlo:

`sudo dpkg -i imager_latest_amd64.deb`

Abre Raspberry Pi Imager

`rpi-imager`

<img src="https://user-images.githubusercontent.com/81990132/197372069-fb9f7417-d320-42cf-ad65-38d630512985.png" alt="rpi imager" width="400" height="400"/>

Elige SO y dispositivo de almacenamiento. Como las Raspberry Pi 4 son de 64 bits, recomiendo elegir "Other general-purpose OS" => Ubuntu => Ubuntu Server 24.04.3 LTS (64 bit). Haz clic en Storage y selecciona tu tarjeta SD. Antes de escribir en la tarjeta SD, haz clic en Advanced options pulsando el icono de engranaje blanco cerca de la esquina inferior derecha.


<img src="https://user-images.githubusercontent.com/81990132/197372159-1169c6f4-f6aa-4f44-9679-fe7aa542bbd3.png" alt="engranaje" width="200" height="200"/>



Aquí puedes actualizar:

```markdown
* Hostname of your Raspberry Pi 4
* Enable SSH
* Create a username and pw
* Enable and configure your wi-fi if needed
```
 
<img src="https://user-images.githubusercontent.com/81990132/197372149-8b85bfac-e473-4808-87cd-f27f15d05de8.png" alt="avanzado" width="400" height="400"/>

 
Una vez completado, pulsa Write


### Arrancar Ubuntu Server

Si tienes un monitor y teclado adicionales, conéctalos ahora. Nota: son opcionales. Instala la tarjeta SD que acabas de formatear en la Raspberry Pi 4 y conecta también el SSD/HHD externo al puerto USB3. Conecta además el cable de alimentación y enciéndela.

### Conectarte remotamente a tu Raspberry Pi 4

Ahora necesitamos conectarnos a tu Raspberry Pi 4. Cosas que necesitamos:

```markdown
* Username and pw (from previous step)
* IP address so we can use SSH
* Monitor, and keyboard (optional)
* If you have a monitor and keyboard connected directly to your pi, the rest of this section can be skipped.
```

Dos formas de encontrar tu dirección IP son mediante la página de administración de tu router o con nmap. Si usas el router, depende del fabricante y dejaré esos detalles para una búsqueda rápida en Google. Para nmap, primero asegúrate de que esté instalado:

     `sudo apt-get install nmap`
     
Encuentra la dirección IP de tu ordenador actual y anota las tres primeras secciones. Normalmente será algo como 192.168.1.xxx o 192.168.50.xxx. Introduce esos datos en nmap de la siguiente manera:
          
`sudo nmap -sn 192.168.50.0/24`

o

`sudo nmap -sn 192.168.1.0/24`

Esto mostrará todos los dispositivos conectados a tu red doméstica, lo que debería revelar la dirección IP / dirección MAC de tu Raspberry Pi 4. Usando tu nombre de usuario, pw y dirección IP, ahora podemos iniciar sesión usando SSH

```markdown
* ssh <username>@<ip address of your pi> note: you must plugin *your* username and *your* IP address, and *your* pw when prompted.
* For example: `ssh ubuntu@192.168.1.25 where the username is *ubuntu* and IP address is 192.168.1.25.
```


  <img src="https://user-images.githubusercontent.com/81990132/197372846-e1279388-eaaa-4fbb-8d5d-f9928cb45195.png" alt="inicio de sesión ssh" width="400" height="400"/>
       

Si tienes curiosidad por saber qué versión de Raspberry Pi estás usando, prueba este comando:

     `cat /sys/firmware/devicetree/base/model ; echo`

  <img src="https://user-images.githubusercontent.com/81990132/197689888-367c8eb3-2667-4c8c-85b3-44d46afe07a7.png" alt="cuál" width="700" height="400"/>

         

### Instalar *zcashd*

Dos formas de instalar zcashd incluyen descargar un binario precompilado o compilar zcashd desde el código fuente. Recomiendo *encarecidamente* compilar desde el código fuente. Si vas a compilarlo tú mismo, es muy recomendable hacer cross-compile. Cross-compile consiste en construir en una plataforma un binario que se ejecutará en otra plataforma. Una razón para ello es que las Raspberry Pi 4 tienen poca potencia y, por tanto, no son muy rápidas. Aprovecha tu ordenador principal para ayudarte con esto. Puedes obtener la última versión [aquí](https://github.com/zcash/zcash/releases). Para hacer cross compile debemos asegurarnos de tener los paquetes necesarios. Instala lo siguiente:

```bash
sudo apt-get install build-essential pkg-config libc6-dev m4 g++-multilib autoconf libtool ncurses-dev unzip git python3 python3-zmq zlib1g-dev curl bsdmainutils automake libtinfo5
sudo apt-get install gcc-aarch64-linux-gnu
```

Después cambia al directorio de la versión recién descargada de zcashd y ejecuta:

`HOST=aarch64-linux-gnu ./zcutil/build.sh`
          

### Configurar *zcashd*

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/9t2LX3HFldw"
    title="Herramienta de cartera Zcashd - Generar e importar clave privada"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

---

Ahora necesitamos transferir todos los archivos binarios de zcashd a tu Raspberry Pi 4. Desde Zcashd v5.3 los archivos necesarios incluyen:

```markdown
zcashd
zcash-cli
zcash-tx
zcash-gtest
zcash-inspect
zcashd-wallet-tool
fetch-params.sh
```

Estos archivos se encuentran en el directorio /src de la ubicación de descarga de tu última versión si los compilaste tú mismo. En caso contrario, los archivos precompilados estarán donde los descargaste. Dos formas de realizar las transferencias son usando SFTP o usando tu unidad externa.

#### SFTP

```bash
sftp username@<ip of RaspberryPi4>
put zcash*
```
   
#### Copia externa
     
Simplemente copia los archivos en la unidad externa antes de conectarla a la Raspberry Pi 4. Si ya tienes un nodo completo sincronizado y quieres ahorrar tiempo, también puedes copiar los datos de blocks y chainstate.
   
` cd ~/.zcash/`
     
Simplemente ejecuta:

```bash
tar -zcvf blocks.tar.gz /blocks
tar -zcvf chainstate.tar.gz /chainstate
```
     
Copia los archivos .gz de blocks y chainstate en tu SSD/HHD externo. A continuación monta el SSD/HDD externo en la carpeta Media para poder verlo:

```markdown
lsblk will display all drives connected. Most will be of the format sda
id will show your user and group id's.
```
          
<img src="https://user-images.githubusercontent.com/81990132/197372643-abef88fd-9177-4bf9-abda-3c221188cd10.png" alt="lsblk" width="400" height="400"/>


          
          `sudo mount -o umask=0077,gid=<groupid>,uid=<userid> /dev/sda1 /media/portableHD/`
          
Vigila tanto quién es el propietario de las carpetas/archivos como los permisos.

```bash
sudo chown -R <username>: portableHD
sudo chmod -R 600 portableHD/
```
     
Si copiaste los archivos .gz de blocks y chainstate desde tu otro ordenador, descomprímelos ahora. Asegúrate de que estén en la carpeta .zcash de tu unidad externa.

```bash
tar - xvzf blocks.tar.gz
tar - xvzf chainstate.tar.gz
```


Configura /media/portableHD/.zcash/zcash.conf

<img src="https://user-images.githubusercontent.com/81990132/197373699-18cc2c9f-b47d-44e9-9e6b-4c5cccf78d9e.png" alt="zconf" width="700" height="400"/>


 
Fíjate en cómo movimos el datadir al SSD/HDD externo, que tiene mucho más espacio disponible. Como la ubicación predeterminada de la carpeta .zcash se ha movido, necesitamos indicárselo a *zcashd* usando enlaces simbólicos:

```markdown
cp -rp ~/.zcash/* /new_dir         // Make copy of datadir or supply with an external HD
rm -rf ~/.zcash                    // Remove default folder
ln -s /media/portableHD/ ~/.zcash  // Symbolic link new data location to the default so zcashd is happy
```
   

Ejecuta el script fetch-params.sh para descargar los datos necesarios para zcashd
   
    `./fetch-params.sh`


Inicia un nuevo 'screen' [ programa en Linux ]. Abre zcashd con -datadir configurado:

```bash
screen -S zcashScreen`     
./zcashd -datadir=/media/portableHD/.zcash/
```
     
Desacopla la sesión de screen:

`Ctrl+a , Ctrl+d`


Crea un alias para no tener que escribir todos estos comandos extra de ubicación de datos

     `alias zcash-cli="./zcash-cli -datadir=/media/portableHD/.zcash/"`


¡Listo para usar!

    `zcash-cli getblockchaininfo`

  <img src="https://user-images.githubusercontent.com/81990132/197373098-672aa228-d180-47ea-8a7c-c58dc3882426.png" alt="getblockchaininfo" width="400" height="400"/>



### Usar *zcashd*

<iframe class="w-full h-auto md:h-96" src="https://www.youtube.com/embed/KNhd1KC0Bqk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

---

¿Cómo compruebas el estado de tu nodo?

     `tail -n 500 <path to>/.zcash/debug.log`

  <img src="https://user-images.githubusercontent.com/81990132/197684416-9a083de4-4a62-4fe8-9cab-798781b38cd2.png" alt="estado" width="700" height="400"/>


  
     
Para obtener la altura actual desde tu log

     `tail -n 10 <path to>/.zcash/debug.log | grep -o  'height=[^b]*'`

  <img src="https://user-images.githubusercontent.com/81990132/199630447-6a6cd491-0cb3-47f8-95f0-45f6b6555870.png" alt="altura del log" width="500" height="400"/>


     
     `zcash-cli getinfo`
  
<img src="https://user-images.githubusercontent.com/81990132/199646508-132da0eb-899e-49a6-8b31-e9011e159700.png" alt="getInfo" width="400" height="400"/>

     
     
¿Cómo envías un memo? Como se ve [aquí](https://zcash.readthedocs.io/en/latest/rtd_pages/memos.html), descarga *ascii2hex* y *hex2ascii* y hazlos ejecutables 

`chmod +x ascii2hex hex2ascii`
          
Crea un memo y conviértelo a hex. Puedes convertirlo de nuevo a ascii para probar.
          
<img src="https://user-images.githubusercontent.com/81990132/199646812-782142d6-8846-443a-8dd9-4f332e49d3e9.png" alt="asciiGOOD" width="400" height="400"/>


  
Crea una transacción z2z (Sapling) usando la versión hex de tu memo de arriba

`zcash-cli z_sendmany "ztestsapling1kg3u0y7szv6509732at34alct46cyn0g26kppgf2a7h5tpqxldtwm7cmhf8rqmhgt" "[{\"address\": \"ztestsapling2kg3u0y7szv6509732at34alct46cyn0g26kppgf2a7h5tpqxldtwm7cmhf8rqmhgtmpakcz5mdv\",\"amount\": 0.0001, \"memo\":\"5A656348756221\"}]"`

¿Cómo reanudas tu zcashScreen después de desacoplarla?

`screen -r zcashScreen`
     
¿Cómo detienes *zcashd*?

`zcash-cli stop`
     
¿Cómo creas una UA?

`zcash-cli z_getnewaccount`
     
  <img src="https://user-images.githubusercontent.com/81990132/202352436-04c17be2-e914-4b9b-95d1-00cf6fc496d3.png" alt="newAccount" width="400" height="400"/>

    
Ahora crea un receptor UA según *tus necesidades*. Esto incluye solo Orchard, Orchard + Sapling y, por último, Orchard + Sapling + Transparent. Ten en cuenta que puedes distinguir entre receptores por su longitud.
     
<img src="https://user-images.githubusercontent.com/81990132/202354319-2da6be33-ca95-4b6b-b29c-14805dcb9c21.png" alt="caracteres" width="200" height="100"/>


`zcash-cli z_getaddressforaccount 0 '["orchard"]'`
     
<img src="https://user-images.githubusercontent.com/81990132/202353642-c36b5fea-de8a-41f6-a27c-d9ff42a0c8d3.png" alt="uaOrchard" width="400" height="400"/>

<img src="https://user-images.githubusercontent.com/81990132/202355586-eaeb36e7-b000-4b99-8192-81e5002e6f11.png" alt="OrchQR" width="400" height="400"/>

`zcash-cli z_getaddressforaccount 0 '["orchard","sapling"]'`
     
<img src="https://user-images.githubusercontent.com/81990132/202353732-740828e3-77b8-4684-8cf8-fb14256b1e61.png" alt="uaOrchardSapling" width="400" height="400"/>
<img src="https://user-images.githubusercontent.com/81990132/202355596-c7b62854-9a9e-4627-ab5d-51091340de71.png" alt="OrchSapQR" width="300" height="200"/>


`zcash-cli z_getaddressforaccount 0 '["orchard","sapling","p2pkh"]'`
     
<img src="https://user-images.githubusercontent.com/81990132/202353793-3331c593-5286-4b84-93a7-adc4928839fd.png" alt="uaFull" width="400" height="400"/>
<img src="https://user-images.githubusercontent.com/81990132/202355607-75de0750-2a57-4e10-883b-e0a626ed892a.png" alt="FullQR" width="400" height="400"/>


¿Cómo envías ZEC usando una UA?

`zcash-cli z_sendmany "fromOaddress" "[{\"address\": \"dOrchardAddress\",\"amount\": 0.0001, \"memo\":\"yourMemoinHex\"}]" <minconf> <fee> <privacyPolicy>`

<img src="https://user-images.githubusercontent.com/81990132/202365280-c184f622-eb7e-4095-bc38-90795121c43c.png" alt="UAsuccess" width="400" height="400"/>
<img src="https://user-images.githubusercontent.com/81990132/202366758-40650460-aaeb-4e03-891f-b4bd08e18234.png" alt="pic" width="400" height="400"/>

    
##### Debe tenerse en cuenta que tanto las direcciones de *origen* como las de *destino* pueden ser transparent, sapling u orchard; sin embargo, puede que necesites ajustar la bandera privacyPolicy para que la transacción sea válida. (¡Algunas combinaciones no funcionarán si privacyPolicy no tiene sentido!)


¿Dónde puedo encontrar más información sobre las UA?

> Consulta la publicación de [Hanh](https://medium.com/@hanh425/transaction-privacy-78f80f9f175e) sobre privacidad de transacciones. También [esta](https://forum.zcashcommunity.com/t/unified-addresses-full-node-rpc-api/41980/2) publicación del foro de zcash.

> [Esta](https://github.com/zcash/zips/issues/470)

     
### Fuentes

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
