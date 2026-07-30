<a href="https://github.com/zechub/zechub/edit/main/site/guides/Raspberry_Pi_4_Full_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>


# Raspberry Pi 4: um guia de nó completo *zcashd* 


O objetivo deste guia é ajudar a educar Zcashers que têm interesse em executar um nó completo em um Raspberry Pi 4 de baixo consumo.

<img src="https://user-images.githubusercontent.com/81990132/197372541-dcd886ab-a3d0-4614-b490-0294ddf3ffae.png" alt="zcashd" width="700" height="700"/>


## Vídeo

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/SGYrzhs1l2k"
    title="Como compilar um nó Zcash no Raspberry Pi!"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

## Suporte

Se você achar este guia útil, considere doar ZEC para apoiar o ZecHub:

`u1rl2zw85dmjc8m4dmqvtstcyvdjn23n0ad53u5533c97affg9jq208du0vf787vfx4vkd6cd0ma4pxkkuc6xe6ue4dlgjvn9dhzacgk9peejwxdn0ksw3v3yf0dy47znruqftfqgf6xpuelle29g2qxquudxsnnen3dvdx8az6w3tggalc4pla3n4jcs8vf4h29ach3zd8enxulush89`


## O que você vai aprender

```markdown
* How to create a bootable Ubuntu Server microSD card
* How to setup internet connectivity on the Raspberry Pi 4
* How to access your Raspberry Pi 4 remotely
* How to install zcashd
* How to setup zcashd
* How to use zcashd
```


## Pré-requisitos

> [Kit Canakit Raspberry Pi 4 de 8GB](https://www.canakit.com/raspberry-pi-4-starter-max-kit.html) ou equivalente

> Um computador com leitor de cartão microSD

> Uma rede Wi-Fi ou um cabo ethernet com conexão à internet

> SSD/HHD externo com suporte a USB3


##### nota: manter seu servidor seguro *não* é simples de forma alguma. Quaisquer dicas/recomendações/boas práticas além do que é abordado neste guia, *por favor*, crie um PR e ajude a manter este guia o mais atualizado possível.



### Preparar o cartão SD

Nesta etapa, você criará um cartão SD *inicializável* que permitirá ao seu Raspberry Pi 4 iniciar. Insira o cartão microSD no seu computador. Talvez seja necessário usar o adaptador que vem com o Canakit ou qualquer outro adaptador equivalente. Instale o Raspberry Pi Imager para o seu sistema operacional. Baixe a versão para o SO ao qual você tem acesso no momento.
     
     > [Ubuntu](https://downloads.raspberrypi.org/imager/imager_latest_amd64.deb)
     
     > [Windows](https://downloads.raspberrypi.org/imager/imager_latest.exe)
     
     > [macOS](https://downloads.raspberrypi.org/imager/imager_latest.dmg)

Por exemplo, no linux, você digitariam o seguinte após o download:

`sudo dpkg -i imager_latest_amd64.deb`

Abra o Raspberry Pi Imager

`rpi-imager`

<img src="https://user-images.githubusercontent.com/81990132/197372069-fb9f7417-d320-42cf-ad65-38d630512985.png" alt="Raspberry Pi Imager" width="400" height="400"/>

Escolha o SO e o dispositivo de armazenamento. Como os Raspberry Pi 4 são de 64 bits, recomendo escolher "Other general-purpose OS" => Ubuntu => Ubuntu Server 24.04.3 LTS (64 bit). Clique em Storage e selecione seu cartão SD. Antes de gravar no cartão SD, clique em Advanced options clicando no ícone de engrenagem branco perto do canto inferior direito.


<img src="https://user-images.githubusercontent.com/81990132/197372159-1169c6f4-f6aa-4f44-9679-fe7aa542bbd3.png" alt="engrenagem" width="200" height="200"/>



Aqui você pode atualizar:

```markdown
* Hostname of your Raspberry Pi 4
* Enable SSH
* Create a username and pw
* Enable and configure your wi-fi if needed
```
 
<img src="https://user-images.githubusercontent.com/81990132/197372149-8b85bfac-e473-4808-87cd-f27f15d05de8.png" alt="avançado" width="400" height="400"/>

 
Quando terminar, clique em Write


### Inicializar o Ubuntu Server

Se você tiver um monitor e teclado extras, conecte-os agora. Observação: eles são opcionais. Insira no Raspberry Pi 4 o cartão SD que você acabou de formatar e também conecte o SSD/HHD externo na porta USB3. Conecte também o cabo de alimentação e ligue-o.

### Conecte-se remotamente ao seu Raspberry Pi 4

Agora precisamos nos conectar ao seu Raspberry Pi 4. Coisas de que precisamos:

```markdown
* Username and pw (from previous step)
* IP address so we can use SSH
* Monitor, and keyboard (optional)
* If you have a monitor and keyboard connected directly to your pi, the rest of this section can be skipped.
```

Duas maneiras de encontrar seu endereço IP são pela página de administração do roteador ou com o nmap. Se for usar o roteador, isso depende do fabricante, então deixo esses detalhes para uma rápida busca no Google. Para o nmap, primeiro certifique-se de que ele está instalado:

     `sudo apt-get install nmap`
     
Encontre o endereço IP do seu computador atual e anote as três primeiras seções. Normalmente isso é 192.168.1.xxx ou 192.168.50.xxx. Insira esses detalhes no nmap da seguinte forma:
          
`sudo nmap -sn 192.168.50.0/24`

ou

`sudo nmap -sn 192.168.1.0/24`

Isso exibirá todos os dispositivos conectados à sua rede doméstica, o que deve revelar o endereço IP / endereço MAC do seu Raspberry Pi 4. Usando seu nome de usuário, pw e endereço IP, agora podemos fazer login usando SSH

```markdown
* ssh <username>@<ip address of your pi> note: you must plugin *your* username and *your* IP address, and *your* pw when prompted.
* For example: `ssh ubuntu@192.168.1.25 where the username is *ubuntu* and IP address is 192.168.1.25.
```


  <img src="https://user-images.githubusercontent.com/81990132/197372846-e1279388-eaaa-4fbb-8d5d-f9928cb45195.png" alt="login ssh" width="400" height="400"/>
       

Se você estiver curioso para saber qual versão do Raspberry Pi está usando, experimente este comando:

     `cat /sys/firmware/devicetree/base/model ; echo`

  <img src="https://user-images.githubusercontent.com/81990132/197689888-367c8eb3-2667-4c8c-85b3-44d46afe07a7.png" alt="qual" width="700" height="400"/>
### Instalando *zcashd*

Duas formas de instalar zcashd incluem baixar um binário pré-compilado ou compilar zcashd a partir do código-fonte. Eu *recomendo fortemente* compilar a partir do código-fonte. Para compilar por conta própria, é altamente recomendado fazer compilação cruzada. Compilação cruzada é construir em uma plataforma um binário que será executado em outra plataforma. Um motivo para isso é que os Raspberry Pi 4 têm baixo poder de processamento e, portanto, não são muito rápidos! Aproveite seu computador principal para ajudar com isso. Você pode obter a versão mais recente [aqui](https://github.com/zcash/zcash/releases). Para compilar de forma cruzada, precisamos garantir que temos os pacotes necessários. Instale o seguinte:

```bash
sudo apt-get install build-essential pkg-config libc6-dev m4 g++-multilib autoconf libtool ncurses-dev unzip git python3 python3-zmq zlib1g-dev curl bsdmainutils automake libtinfo5
sudo apt-get install gcc-aarch64-linux-gnu
```

Em seguida, mude o diretório para a versão do zcashd recém-baixada e execute:

`HOST=aarch64-linux-gnu ./zcutil/build.sh`
          

### Configuração do *zcashd*

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/9t2LX3HFldw"
    title="Ferramenta de Carteira Zcashd - Gerar e Importar Chave Privada"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

---

Agora precisamos transferir todos os arquivos binários do zcashd para o seu Raspberry Pi 4. A partir do Zcashd v5.3, os arquivos necessários incluem:

```markdown
zcashd
zcash-cli
zcash-tx
zcash-gtest
zcash-inspect
zcashd-wallet-tool
fetch-params.sh
```

Esses arquivos são encontrados no diretório /src do local de download da sua versão mais recente, se você os compilou por conta própria. Caso contrário, os arquivos pré-compilados estão onde você os baixou. Duas formas de realizar as transferências são usando SFTP ou usando sua unidade externa.

#### SFTP

```bash
sftp username@<ip of RaspberryPi4>
put zcash*
```
   
#### Cópia Externa
     
Basta copiar os arquivos para a unidade externa antes de conectá-la ao Raspberry Pi 4. Se você já tiver um nó completo sincronizado e quiser economizar tempo, também pode copiar os dados de blocks e chainstate.
   
` cd ~/.zcash/`
     
Basta executar:

```bash
tar -zcvf blocks.tar.gz /blocks
tar -zcvf chainstate.tar.gz /chainstate
```
     
Copie os arquivos .gz de blocks e chainstate para o seu SSD/HHD externo. Em seguida, monte o SSD/HDD externo na pasta Media para que você possa vê-lo:

```markdown
lsblk exibirá todas as unidades conectadas. A maioria estará no formato sda
id mostrará seu id de usuário e de grupo.
```
          
<img src="https://user-images.githubusercontent.com/81990132/197372643-abef88fd-9177-4bf9-abda-3c221188cd10.png" alt="lsblk" width="400" height="400"/>


          
          `sudo mount -o umask=0077,gid=<groupid>,uid=<userid> /dev/sda1 /media/portableHD/`
          
Fique de olho tanto em quem possui as pastas/arquivos quanto nas permissões.

```bash
sudo chown -R <username>: portableHD
sudo chmod -R 600 portableHD/
```
     
Se você copiou os arquivos .gz de blocks e chainstate do seu outro computador, descompacte-os agora. Certifique-se de que eles estejam na pasta .zcash na sua unidade externa.

```bash
tar - xvzf blocks.tar.gz
tar - xvzf chainstate.tar.gz
```


Configure /media/portableHD/.zcash/zcash.conf

<img src="https://user-images.githubusercontent.com/81990132/197373699-18cc2c9f-b47d-44e9-9e6b-4c5cccf78d9e.png" alt="zconf" width="700" height="400"/>


 
Observe como movemos o datadir para o SSD/HDD externo, que tem muito mais espaço disponível. Como o local padrão da pasta .zcash foi movido, precisamos informar isso ao *zcashd* usando links simbólicos:

```markdown
cp -rp ~/.zcash/* /new_dir         // Fazer uma cópia do datadir ou fornecê-lo com um HD externo
rm -rf ~/.zcash                    // Remover a pasta padrão
ln -s /media/portableHD/ ~/.zcash  // Vincular simbolicamente o novo local dos dados ao padrão para que o zcashd fique satisfeito
```
   

Execute o script fetch-params.sh para baixar os dados necessários para o zcashd
   
    `./fetch-params.sh`


Inicie um novo programa 'screen' [ programa no linux ]. Abra zcashd com -datadir definido:

```bash
screen -S zcashScreen`     
./zcashd -datadir=/media/portableHD/.zcash/
```
     
Desanexe a screen:

`Ctrl+a , Ctrl+d`


Crie um alias para que você não precise digitar todos esses comandos extras de localização de dados

     `alias zcash-cli="./zcash-cli -datadir=/media/portableHD/.zcash/"`


Pronto para usar!

    `zcash-cli getblockchaininfo`

  <img src="https://user-images.githubusercontent.com/81990132/197373098-672aa228-d180-47ea-8a7c-c58dc3882426.png" alt="getblockchaininfo" width="400" height="400"/>



### Usando *zcashd*

<iframe class="w-full h-auto md:h-96" src="https://www.youtube.com/embed/KNhd1KC0Bqk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

---

Como você verifica o status do seu nó?

     `tail -n 500 <path to>/.zcash/debug.log`

  <img src="https://user-images.githubusercontent.com/81990132/197684416-9a083de4-4a62-4fe8-9cab-798781b38cd2.png" alt="status" width="700" height="400"/>


  
     
Para obter a altura atual do seu log

     `tail -n 10 <path to>/.zcash/debug.log | grep -o  'height=[^b]*'`

  <img src="https://user-images.githubusercontent.com/81990132/199630447-6a6cd491-0cb3-47f8-95f0-45f6b6555870.png" alt="logHeight" width="500" height="400"/>


     
     `zcash-cli getinfo`
  
<img src="https://user-images.githubusercontent.com/81990132/199646508-132da0eb-899e-49a6-8b31-e9011e159700.png" alt="getInfo" width="400" height="400"/>

     
     
Como você envia um memo? Como visto [aqui](https://zcash.readthedocs.io/en/latest/rtd_pages/memos.html), baixe *ascii2hex* e *hex2ascii* e torne-os executáveis 

`chmod +x ascii2hex hex2ascii`
          
Crie um memo e converta-o para hex. Você pode converter de volta para ascii para testar.
          
<img src="https://user-images.githubusercontent.com/81990132/199646812-782142d6-8846-443a-8dd9-4f332e49d3e9.png" alt="asciiGOOD" width="400" height="400"/>


  
Crie uma transação z2z (Sapling) usando a versão hex do seu memo acima

`zcash-cli z_sendmany "ztestsapling1kg3u0y7szv6509732at34alct46cyn0g26kppgf2a7h5tpqxldtwm7cmhf8rqmhgt" "[{\"address\": \"ztestsapling2kg3u0y7szv6509732at34alct46cyn0g26kppgf2a7h5tpqxldtwm7cmhf8rqmhgtmpakcz5mdv\",\"amount\": 0.0001, \"memo\":\"5A656348756221\"}]"`

Como você retoma sua zcashScreen depois de desanexá-la?

`screen -r zcashScreen`
     
Como você para o *zcashd* ?

`zcash-cli stop`
     
Como você cria uma UA?

`zcash-cli z_getnewaccount`
     
  <img src="https://user-images.githubusercontent.com/81990132/202352436-04c17be2-e914-4b9b-95d1-00cf6fc496d3.png" alt="newAccount" width="400" height="400"/>

    
Agora construa um receptor UA de acordo com *suas necessidades*. Isso inclui somente Orchard, Orchard + Sapling e, por fim, Orchard + Sapling + Transparent. Note que você pode diferenciar os receptores pelo comprimento deles.
     
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


Como você envia ZEC usando uma UA?

`zcash-cli z_sendmany "fromOaddress" "[{\"address\": \"dOrchardAddress\",\"amount\": 0.0001, \"memo\":\"yourMemoinHex\"}]" <minconf> <fee> <privacyPolicy>`

<img src="https://user-images.githubusercontent.com/81990132/202365280-c184f622-eb7e-4095-bc38-90795121c43c.png" alt="UAsuccess" width="400" height="400"/>
<img src="https://user-images.githubusercontent.com/81990132/202366758-40650460-aaeb-4e03-891f-b4bd08e18234.png" alt="pic" width="400" height="400"/>
##### Deve-se notar que tanto os endereços de *origem* quanto os de *destino* podem ser endereços transparent, sapling ou orchard; no entanto, talvez seja necessário ajustar a flag privacyPolicy para que a transação seja válida. (Algumas combinações não funcionarão se a privacyPolicy não fizer sentido!)


Onde posso encontrar mais informações sobre UAs?

> Confira a publicação de [Hanh](https://medium.com/@hanh425/transaction-privacy-78f80f9f175e) sobre privacidade de transações. Também [esta](https://forum.zcashcommunity.com/t/unified-addresses-full-node-rpc-api/41980/2) publicação do fórum da zcash.

> [Isto](https://github.com/zcash/zips/issues/470)

     
### Fontes

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
