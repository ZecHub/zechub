# ![raspi](https://user-images.githubusercontent.com/81990132/197372285-1f413bc5-13a0-4671-9c81-760eafdda926.png) Raspberry Pi 4: Guia Para Full Node *ZcashD* 




O objetivo deste guia é ajudar a educar os Zchers interessados em executar um nó completo em um Raspberry Pi 4 de baixa potência.

![zcashdPI](https://user-images.githubusercontent.com/81990132/197372541-dcd886ab-a3d0-4614-b490-0294ddf3ffae.png)



Se você achar este guia útil, considere doar ZEC para apoiar o ZecHub:


`zs1txa9wzxsc46w4940c4t76wjlylhntyp7vcppsp8re32z02srqse038melgglew4jwsh3qes4m4n`



## O que você aprenderá

* Como criar um cartão microSD inicializável do Ubuntu Server

* Como configurar a conectividade da Internet no Raspberry Pi 4

* Como acessar seu Raspberry Pi 4 remotamente

* Como instalar * zcashd*

* Como configurar * zcashd*

* Como usar * zcashd*



## Pré-requisitos

* [8GB Raspberry Pi 4 Canakit](https://www.canakit.com/raspberry-pi-4-starter-max-kit.html) ou equivalente

* Um computador com uma unidade de cartão microSD

* Uma rede Wi-Fi ou um cabo Ethernet com conexão à Internet

* SSD / HD externo com suporte USB3


##### Nota: manter seu servidor seguro não é simples de qualquer maneira. Quaisquer dicas / recomendações / melhores práticas além do que é mencionado neste guia * crie um PR e ajude a manter este guia o mais atualizado possível.







## Conteúdo:

* [Prepare the SD Card](https://github.com/ZecHub/zechub/blob/main/site/guides/RaspberryPi4FullNode.md#prepare-the-sd-card)
* [Servidor Boot Ubuntu](https://github.com/ZecHub/zechub/blob/main/site/guides/RaspberryPi4FullNode.md#boot-ubuntu-server)
* [Conecte-se remotamente ao seu Raspberry Pi 4](https://github.com/ZecHub/zechub/blob/main/site/guides/RaspberryPi4FullNode.md#connect-remotely-to-your-raspberry-pi-4)
* [Instale *zcashd*](https://github.com/ZecHub/zechub/blob/main/site/guides/RaspberryPi4FullNode.md#installing-zcashd)
* [Configuração * zcashd *](https://github.com/ZecHub/zechub/blob/main/site/guides/RaspberryPi4FullNode.md#setup-zcashd)
* [Usando * zcashd * ](https://github.com/ZecHub/zechub/blob/main/site/guides/RaspberryPi4FullNode.md#using-zcashd)
* [Fontes](https://github.com/ZecHub/zechub/blob/main/site/guides/RaspberryPi4FullNode.md#sources)

### Prepare o cartão SD


Nesta etapa, você criará um cartão SD * inicializável * que permitirá inicializar o Raspberry Pi 4.


* Insira o cartão microSD no seu computador. Pode ser necessário usar o adaptador que acompanha o Canakit ou qualquer outro adaptador equivalente.

* Instale o Raspberry Pi Imager para o seu sistema operacional. Faça o download da versão para o sistema operacional ao qual você tem acesso atualmente.

     

     * [Ubuntu](https://downloads.raspberrypi.org/imager/imager_latest_amd64.deb)
     * [Windows](https://downloads.raspberrypi.org/imager/imager_latest.exe)
     * [macOS](https://downloads.raspberrypi.org/imager/imager_latest.dmg)


Por exemplo, no linux, você digitaria o seguinte após o download:


`sudo dpkg -i imager_latest_amd64.deb`


* Imager Pi de framboesa aberto


`rpi-imager`



![rpi-imager](https://user-images.githubusercontent.com/81990132/197372069-fb9f7417-d320-42cf-ad65-38d630512985.png)


* Escolha OS e dispositivo de armazenamento. Como os Raspberry Pi 4 são de 64 bits, recomendo escolher "Outro sistema operacional de uso geral" = > Ubuntu = > Ubuntu Server 22.10 ( 64 bits ). Clique em Armazenamento e selecione seu cartão SD


* Antes de escrever no cartão SD, clique nas opções Avançadas clicando no ícone de engrenagem branca próximo ao canto inferior direito.



![gear](https://user-images.githubusercontent.com/81990132/197372159-1169c6f4-f6aa-4f44-9679-fe7aa542bbd3.png)



* Aqui você pode atualizar:


     * Nome do host do seu Raspberry Pi 4

     * Ativar SSH

     * Crie um nome de usuário e pw

     * Habilite e configure seu wi-fi, se necessário

 

![advanced](https://user-images.githubusercontent.com/81990132/197372149-8b85bfac-e473-4808-87cd-f27f15d05de8.png)


 

* Uma vez concluído, clique em Escrever



### Boot Ubuntu Server


Se você tiver um monitor extra e um teclado, conecte-os agora. Nota: estes são opcionais.



* Instale o cartão SD que você acabou de formatar no Raspberry Pi 4 e também conecte o SSD / HD externo à porta USB3. Conecte também o cabo de alimentação e ligue-o.



### Conecte-se remotamente ao seu Raspberry Pi 4


* Agora precisamos nos conectar ao seu Raspberry Pi 4. Coisas que precisamos:


     * Nome de usuário e pw ( da etapa anterior )

     * Endereço IP para que possamos usar SSH

     * Monitor e teclado ( opcional )


* Se você possui um monitor e teclado conectados diretamente ao seu pi, o restante desta seção pode ser ignorado.


* Duas maneiras de encontrar seu endereço IP são através da página de administração do roteador ou com o nmap. Se estiver usando o roteador, depende de qual fabricação e vou adiar esses detalhes para uma rápida pesquisa no Google.

 

     * Para o nmap, primeiro verifique se ele está instalado:


     `sudo apt-get install nmap`

     

     * Encontre o endereço IP do seu computador atual e observe as três primeiras seções. Normalmente, é 192.168.1.xxx ou 192.168.50.xxx

     * Conecte esses detalhes ao nmap da seguinte maneira:

         

          * `sudo nmap -sn 192.168.50.0 / 24` ou `sudo nmap -sn 192.168.1.0 / 24`

          * Isso exibirá todos os dispositivos conectados à sua rede doméstica, que devem revelar o endereço IP / endereço MAC do Raspberry Pi 4

         

* Usando seu nome de usuário, pw e endereço IP, agora podemos fazer login usando SSH


     * `ssh < nome de usuário > @ < endereço IP da sua nota pi >`: você deve conectar * seu * nome de usuário e * seu * endereço IP e * seu * pw quando solicitado.


     * Por exemplo: `ssh ubuntu @ 192.168.1.25` onde o nome de usuário é * ubuntu * e o endereço IP é 192.168.1.25.



   ![sshLogin](https://user-images.githubusercontent.com/81990132/197372846-e1279388-eaaa-4fbb-8d5d-f9928cb45195.png)

       


* Se você estiver curioso sobre qual versão do Raspberry Pi está usando, tente este comando:


     `cat / sys / firmware / devicetree / base / modelo; echo`

     

      ![which](https://user-images.githubusercontent.com/81990132/197689888-367c8eb3-2667-4c8c-85b3-44d46afe07a7.png)

         


### Instalando * zcashd*


* Duas maneiras de instalar o zcashd incluem o download de um binário pré-compilado ou a compilação do zcashd da fonte. Eu * recomendo * compilar a partir da fonte.


     * Se o download de uma fonte binária pré-compilada for [adityapk00](https://github.com/adityapk00/zcash/releases) . Observe que, como estamos executando um sistema operacional de 64 bits, queremos zcash-linux-aarch64-v * .tar.gz. Observe também que as versões atualizadas do zcashd raramente são pré-compiladas.


     * Para se compilar, é altamente recomendável compilar cruzadamente. O compilação cruzada é construir em uma plataforma um binário que será executado em outra plataforma. Uma razão para isso é que os Raspberry Pi 4 são de baixa potência e, portanto, não são muito rápidos! Aproveite o seu computador principal para ajudar com isso. Você pode pegar a versão mais recente [here](https://github.com/zcash/zcash/releases)..


     * Para compilar cruzadamente, precisamos garantir que temos os pacotes necessários. Instale o seguinte:


          * `sudo apt-get install build-essential pkg-config libc6-dev m4 g + + -multilib autoconf libtool ncurses-dev unzip git python3 python3-zmq zlib1g-dev curl bsdmainutils automake libtinfo5`


          * `sudo apt-get install gcc-aarch64-linux-gnu`


     * Próximo diretório de alteração na versão zcashd baixada recentemente e execute:


          `HOST = aarch64-linux-gnu./zcutil/build.sh`

         

     * https://www.youtube.com/watch?v=MIgkTW9Rfzs


### Configuração * zcashd*


*  Agora precisamos transferir todos os arquivos binários do zcashd para o seu Raspberry Pi 4. A partir do Zcashd v5.3, os arquivos necessários incluem:

     

     `zcashd`

     `zcash-cli`

     `zcash-tx`

     `zcash-gtest`

     `zcash-inspect`

     `zcashd-wallet-tool`

     `fetch-params.sh`


* Esses arquivos são encontrados no diretório / src do seu local mais recente para download de versões, se você os compilou. Caso contrário, os arquivos pré-compilados são onde você os baixou.

         

* Duas maneiras de obter as transferências são usando SFTP ou usando sua unidade externa.


     *SFTP*


    `sftp username @ < ip de RaspberryPi4 >`

   

   

    `put zcashd`

   

    `put zcash-cli`

   

    `put zcash-tx`

   

    `put zcash-gtest`

   

    `put zcash-inspect`

   

    `put zcashd-wallet-tool`

   

    `put fetch-params.sh`

   

     *OU*

     

     Basta copiar os arquivos no External antes de conectá-lo ao Raspberry Pi 4.

     

* Se você já possui um nó completo sincronizado e deseja economizar tempo, também pode copiar os blocos e os dados do estado da cadeia.

   

    `cd ~ / .zcash /`

     

    * Basta executar:


     `tar -zcvf blocks.tar.gz / blocks`

     `tar -zcvf chainstate.tar.gz / chainstate`

     

    * Copie os blocos e arquivos .gz em estado de cadeia no seu SSD / HHD externo.  



     

 * Usando SSD / HD externo no seu Raspberry Pi 4


     * Monte o SSD / HDD externo na pasta Mídia para que você possa vê-lo:

     

          `lsblk` exibirá todas as unidades conectadas. A maioria será do formato sda

         

          `id` mostrará seus IDs de usuário e grupo.

         

          ![lsblk](https://user-images.githubusercontent.com/81990132/197372643-abef88fd-9177-4bf9-abda-3c221188cd10.png)


         

          `sudo mount -o umask = 0077, gid = < groupid >, uid = < userid > / dev / sda1 / media / portátilHD /`

         

     * Fique de olho em quem possui as pastas / arquivos e também nas permissões.


          `sudo chown -R < nome de usuário >: portátilHD`

          `sudo chmod -R 700 portátilHD /`

     

     * Se você copiou os blocos e os arquivos .gz do estado da cadeia do seu outro computador, desamarre-os agora. Verifique se eles estão na pasta .zcash na sua unidade externa.


          `tar - xvzf blocks.tar.gz`

          `tar - xvzf chainstate.tar.gz`



* Configuração / mídia / portátilHD / .zcash / zcash.conf



![zconf](https://user-images.githubusercontent.com/81990132/197373699-18cc2c9f-b47d-44e9-9e6b-4c5cccf78d9e.png)


 

* observe como movemos o datadir para o SSD / HDD externo, que tem muito mais espaço disponível.

     


* Como o local padrão da pasta .zcash foi movido, precisamos informar * zcashd * usando links simbólicos:

 

   `cp -rp ~ / .zcash / * / new_dir` // Faça uma cópia do datadir ou forneça um HD externo

   

   `rm -rf ~ / .zcash` // Remover pasta padrão

   

   `ln -s / media / portátilHD / ~ / .zcash` // Link simbólico novo local de dados para o padrão, para que o zcashd fique feliz

   


* Execute o script fetch-params.sh para baixar os dados necessários para o zcashd

   

    `./fetch-params.sh`



* Inicie um novo programa 'screen' [ no linux ]. Abra o zcashd com o conjunto -datadir:


     * `screen -S zcashScreen`

     

     * `./zcashd -datadir = /media/portableHD/.zcash/`

     

     * Desanexar a tela. `Ctrl + a, Ctrl + d`



* Crie um alias para que você não precise digitar todos esses comandos extras de localização de dados


     `alias zcash-cli = "./zcash-cli-datadir = / media / portátilHD / .zcash /"`



* Pronto para usar!


    `zcash-cli getblockchaininfo`

   

    ![getBlockchaininfo](https://user-images.githubusercontent.com/81990132/197373098-672aa228-d180-47ea-8a7c-c58dc3882426.png)




### Usando * zcashd*


* Como você verifica o status do seu nó?


     `tail -n 500 < caminho para > /.zcash/debug.log`

     

     ![status](https://user-images.githubusercontent.com/81990132/197684416-9a083de4-4a62-4fe8-9cab-798781b38cd2.png)

     

* Para obter a altura atual do seu log


     `tail -n 10 < caminho para > /.zcash/debug.log | grep -o 'altura = [ ^ b ] *'`

     

     ![logHeight](https://user-images.githubusercontent.com/81990132/199630447-6a6cd491-0cb3-47f8-95f0-45f6b6555870.png)


     

     `zcash-cli getinfo`

     

     ![getinfo](https://user-images.githubusercontent.com/81990132/199646508-132da0eb-899e-49a6-8b31-e9011e159700.png)


     

     

* Como você envia um memorando?


     * Como visto [aqui](https://zcash.readthedocs.io/en/latest/rtd_pages/memos.html), faça o download


         `ascii2hex`

         

          e

         

         `hex2ascii`

         

         

     *  Torne-os executáveis


          `chmod + x ascii2hex hex2ascii`

         

     * Crie um memorando e converta-o em hexadecimal. Você pode converter de volta para ascii para testar.

         

        ![asciiGOOD](https://user-images.githubusercontent.com/81990132/199646812-782142d6-8846-443a-8dd9-4f332e49d3e9.png)


 

     * Crie uma transação z2z ( Sapling ) usando a versão hexadecimal da sua nota acima


          `zcash-cli z_sendmany "ztestsapling1kg3u0y7szv6509732at34alct46cyn0g26kppf2a7h5tpqxldtwm7cmhf8rqmhgt" "[ { \" endereço ":


* Como você retoma o seu zcashScreen depois de destacá-lo?


     `screen -r zcashScreen`

     

* Como você para * zcashd* ?


     `zcash-cli stop`

     

* Como você cria um UA?


     `zcash-cli z_getnewaccount`

     

    ![newAccount](https://user-images.githubusercontent.com/81990132/202352436-04c17be2-e914-4b9b-95d1-00cf6fc496d3.png)
    

   

   * Agora construa um receptor UA de acordo com * suas necessidades*. Isso inclui apenas pomar, pomar + mudas e, finalmente, pomar + mudas + Transparente.

   

   * Observe que você pode dizer a diferença entre os receptores por quanto tempo eles são


     ![caracteres ](https://user-images.githubusercontent.com/81990132/202354319-2da6be33-ca95-4b6b-b29c-14805dcb9c21.png)



     `zcash-cli z_getaddressforaccount 0 '[ "orchard" ] '`

     

     ![uaOrchard ]( https://user-images.githubusercontent.com/81990132/202353642-c36b5fea-de8a-41f6-a27c-d9ff42a0c8d3.png)

     ![OrchQR ]( https://user-images.githubusercontent.com/81990132/202355586-eaeb36e7-b000-4b99-8192-81e5002e6f11.png)


     `zcash-cli z_getaddressforaccount 0 '[ "orchard", "sapling" ] '`

     

     ![uaOrchardSapling ]( https://user-images.githubusercontent.com/81990132/202353732-740828e3-77b8-4684-8cf8-fb14256b1e61.png)

     ![OrchSapQR ]( https://user-images.githubusercontent.com/81990132/202355596-c7b62854-9a9e-4627-ab5d-51091340de71.png)


     `zcash-cli z_getaddressforaccount 0 '[ "orchard", "sapling", "p2pkh" ] '`

     

     ![uaFull ]( https://user-images.githubusercontent.com/81990132/202353793-3331c593-5286-4b84-93a7-adc4928839fd.png)

     ![FullQR ]( https://user-images.githubusercontent.com/81990132/202355607-75de0750-2a57-4e10-883b-e0a626ed892a.png)



* Como você envia o ZEC usando um UA?


     `zcash-cli z_sendmany "fromOaddress" "[ { \" endereço \ ":" dOrchardAddress \ ", \" quantidade \ ": 0,0001, \" memorando \ ": \" yourMemoinHex \ " } ] <

     

    ![UAsuccess](https://user-images.githubusercontent.com/81990132/202365280-c184f622-eb7e-4095-bc38-90795121c43c.png)
    
    

   

    ![pic](https://user-images.githubusercontent.com/81990132/202366758-40650460-aaeb-4e03-891f-b4bd08e18234.png)


   

    ##### Deve-se notar que os dois endereços * from * AND * destination * podem ser transparentes, de sapling, ou endereços de pomar, no entanto, pode ser necessário ajustar a bandeira privacyPolicy para que a transação seja válida. ( Alguns combos não funcionam se a política de privacidade não fizer sentido! )



     

* Onde posso encontrar mais informações sobre UA's?


     * Confira a postagem [ Hanh's ]( https://medium.com/@hanh425/transaction-privacy-78f80f9f175e) sobre privacidade de transações. Também postou [ este ]( https://forum.zcashcommunity.com/t/unified-addresses-full-node-rpc-api/41980/2) do fórum zcash.

     * [ Este ]( https://github.com/zcash/zips/issues/470)


     



### Fontes


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

