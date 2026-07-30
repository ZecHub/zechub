<a href="https://github.com/zechub/zechub/edit/main/site/guides/Raspberry_Pi_4_Full_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Raspberry Pi 4: *zcashd* フルノードガイド


このガイドの目的は、低消費電力のRaspberry Pi 4上でフルノードを実行することに関心を持つZcashユーザーに教育を提供することです。

<img src="https://user-images.githubusercontent.com/81990132/197372541-dcd886ab-a3d0-4614-b490-0294ddf3ffae.png" alt="zcashd" width="700" height="700"/>


## ビデオ

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

## サポート

このガイドが役に立つと感じたら、ZecHubをサポートするためにZECを寄付してください:

`u1rl2zw85dmjc8m4dmqvtstcyvdjn23n0ad53u5533c97affg9jq208du0vf787vfx4vkd6cd0ma4pxkkuc6xe6ue4dlgjvn9dhzacgk9peejwxdn0ksw3v3yf0dy47znruqftfqgf6xpuelle29g2qxquudxsnnen3dvdx8az6w3tggalc4pla3n4jcs8vf4h29ach3zd8enxulush89`


## 学ぶ内容

```markdown
* Ubuntu Server microSDカードを起動可能な状態にする方法
* Raspberry Pi 4でインターネット接続を設定する方法
* Raspberry Pi 4にリモートからアクセスする方法
* zcashdをインストールする方法
* zcashdを設定する方法
* zcashdを使用する方法
```


## 前提条件

> [8GB Raspberry Pi 4 Canakit](https://www.canakit.com/raspberry-pi-4-starter-max-kit.html)または同等のもの

> microSDカードドライブ付きのコンピュータ

> Wi-Fiネットワークまたはインターネット接続があるイーサネットケーブル

> USB3サポート付きの外部SSD/HDD


##### ノート: サーバーを安全に保つことは、このガイドで説明している以上の方法や推奨事項が存在するため、簡単ではありません。このガイドでは言及されていないすべてのヒント/推奨事項/ベストプラクティスについては、PRを作成し、このガイドを最新の状態に保つことをご協力ください。



### SDカードの準備

このステップでは、Raspberry Pi 4が起動できるようにするための*起動可能な*SDカードを作成します。microSDカードをコンピュータに挿入してください。Canakitに付属しているアダプタや同等のアダプタが必要になる場合があります。現在使用しているOS用のRaspberry Pi Imagerをインストールしてください。ダウンロードするには、以下のリンクを使用してください。
     
     > [Ubuntu](https://downloads.raspberrypi.org/imager/imager_latest_amd64.deb)
     
     > [Windows](https://downloads.raspberrypi.org/imager/imager_latest.exe)
     
     > [macOS](https://downloads.raspberrypi.org/imager/imager_latest.dmg)

Linuxを使用している場合、ダウンロード後には次のコマンドを入力します：

`sudo dpkg -i imager_latest_amd64.deb`

Raspberry Pi Imagerを開きます

`rpi-imager`

<img src="https://user-images.githubusercontent.com/81990132/197372069-fb9f7417-d320-42cf-ad65-38d630512985.png" alt="rpi imager" width="400" height="400"/>

OSとストレージデバイスを選択します。Raspberry Pi 4は64ビットなので、"Other general-purpose OS" => Ubuntu => Ubuntu Server 24.04.3 LTS (64 bit)をおすすめします。ストレージを選択するために「Storage」をクリックし、SDカードを選択してください。SDカードに書き込む前に、右下の白い歯車アイコンをクリックしてAdvanced options（高度なオプション）を開きます。


<img src="https://user-images.githubusercontent.com/81990132/197372159-1169c6f4-f6aa-4f44-9679-fe7aa542bbd3.png" alt="gear" width="200" height="200"/>



ここでは以下を更新できます：

```markdown
* Raspberry Pi 4のホスト名
* SSHを有効にする
* ユーザー名とパスワードを作成する
* 必要に応じてWi-Fiを有効にして構成する
```
 
<img src="https://user-images.githubusercontent.com/81990132/197372149-8b85bfac-e473-4808-87cd-f27f15d05de8.png" alt="advanced" width="400" height="400"/>

 
完了したら「Write」をクリックします。


### Ubuntu Serverの起動

余分なモニタとキーボードがある場合は、今すぐそれらを接続してください。注意: これらはオプションです。先ほどフォーマットしたSDカードをRaspberry Pi 4に挿入し、外部SSD/HDDもUSB3ポートに接続します。電源ケーブルを差し込み、電源を入れます。

### Raspberry Pi 4にリモートで接続する

今からRaspberry Pi 4に接続する必要があります。必要なものは以下の通りです：

```markdown
* ユーザー名とパスワード（前のステップで作成した）
* IPアドレスを使用してSSH接続できるようにする
* モニタ、キーボード（オプション）
* Raspberry Piに直接モニタとキーボードを接続している場合は、このセクションの残りは飛ばしてください。
```

IPアドレスを見つける方法には2通りあります。ルータの管理ページを使用するか、nmapを使用します。ルータを使用する場合、製造元によって異なりますので、Google検索で簡単に確認できます。nmapを使用する場合は、まずインストールされていることを確認してください：

     `sudo apt-get install nmap`
     
現在のコンピュータのIPアドレスを見つけ出し、最初の3つのセクションをメモしておきます。これは通常192.168.1.xxxまたは192.168.50.xxxです。これらの情報をnmapに以下のように入力します：
          
`sudo nmap -sn 192.168.50.0/24`

or

`sudo nmap -sn 192.168.1.0/24`

これにより、ホームネットワークに接続されているすべてのデバイスが表示され、Raspberry Pi 4のIPアドレス / MACアドレスが表示されます。ユーザー名、パスワード、およびIPアドレスを使用して今からSSHでログインできます。

```markdown
* ssh <username>@<ip address of your pi> ノート: *あなたの*ユーザー名と*あなたの* IPアドレス、およびプロンプトされたときに*あなたの*パスワードを入力する必要があります。
* 例: `ssh ubuntu@192.168.1.25` ここでユーザー名は *ubuntu*、IPアドレスは 192.168.1.25です。
```


  <img src="https://user-images.githubusercontent.com/81990132/197372846-e1279388-eaaa-4fbb-8d5d-f9928cb45195.png" alt="sshLogin" width="400" height="400"/>
       

Raspberry Piのバージョンが気になる場合は、このコマンドを試してください：

     `cat /sys/firmware/devicetree/base/model ; echo`

  <img src="https://user-images.githubusercontent.com/81990132/197689888-367c8eb3-2667-4c8c-85b3-44d46afe07a7.png" alt="which" width="700" height="400"/>

         

### *zcashd*のインストール

zcashdをインストールする方法には、事前にコンパイルされたバイナリをダウンロードするか、ソースからzcashdをコンパイルするという2つの方法があります。私は*強く推奨します*ソースからコンパイルすること。自分自身でコンパイルする場合は、クロスコンパイルすることを強くお勧めします。クロスコンパイルとは、1つのプラットフォーム上で動作するバイナリを別のプラットフォーム上で構築することです。その理由の一つは、Raspberry Pi 4が低消費電力であり、非常に高速ではないからです！メインコンピュータを利用してこの作業を補助してください。最新リリースはこちらから入手できます [here](https://github.com/zcash/zcash/releases)。クロスコンパイルするために必要なパッケージがあることを確認する必要があります。以下のものをインストールしてください：

```bash
sudo apt-get install build-essential pkg-config libc6-dev m4 g++-multilib autoconf libtool ncurses-dev unzip git python3 python3-zmq zlib1g-dev curl bsdmainutils automake libtinfo5
sudo apt-get install gcc-aarch64-linux-gnu
```

例えばLinuxでダウンロードした後、以下のコマンドを入力します：

`sudo dpkg -i imager_latest_amd64.deb`

Raspberry Pi Imagerを開きます

`rpi-imager`

<img src="https://user-images.githubusercontent.com/81990132/197372069-fb9f7417-d320-42cf-ad65-38d630512985.png" alt="rpi imager" width="400" height="400"/>

OSとストレージデバイスを選択します。Raspberry Pi 4は64ビットなので、"Other general-purpose OS" => Ubuntu => Ubuntu Server 24.04.3 LTS (64 bit)を選ぶことをお勧めします。StorageをクリックしてSDカードを選択してください。SDカードに書き込む前に、右下の白い歯車アイコンをクリックしてAdvanced optionsをクリックしてください。


<img src="https://user-images.githubusercontent.com/81990132/197372159-1169c6f4-f6aa-4f44-9679-fe7aa542bbd3.png" alt="gear" width="200" height="200"/>



ここでは以下を更新できます：

```markdown
* Raspberry Pi 4のホスト名
* SSHを有効にする
* ユーザー名とパスワードを作成する
* 必要に応じてWi-Fiを有効にして構成する
```
 
<img src="https://user-images.githubusercontent.com/81990132/197372149-8b85bfac-e473-4808-87cd-f27f15d05de8.png" alt="advanced" width="400" height="400"/>

 
完了したらWriteをクリックします。


### Ubuntu Serverの起動

余分なモニタとキーボードがある場合は今すぐそれらを接続してください。注意: これらはオプションです。先ほどフォーマットしたSDカードをRaspberry Pi 4に挿入し、外部SSD/HDDもUSB3ポートに接続します。電源ケーブルを差し込み、電源を入れます。

### Raspberry Pi 4にリモートで接続する

今からRaspberry Pi 4に接続する必要があります。必要なものは以下の通りです：

```markdown
* ユーザー名とパスワード（前のステップで作成した）
* IPアドレスを使用してSSH接続できるようにする
* モニタ、キーボード（オプション）
* Raspberry Piに直接モニタとキーボードを接続している場合は、このセクションの残りは飛ばしてください。
```

IPアドレスを見つける方法には2通りあります。ルータ管理ページを使用するか、nmapを使用します。ルータを使用する場合、製造元によって異なりますので、Google検索で簡単に確認できます。nmapを使用する場合は、まずインストールされていることを確認してください：

     `sudo apt-get install nmap`
     
現在のコンピュータのIPアドレスを見つけ出し、最初の3つのセクションをメモしておきます。これは通常192.168.1.xxxまたは192.168.50.xxxです。これらの情報をnmapに以下のように入力します：
          
`sudo nmap -sn 192.168.50.0/24`

or

`sudo nmap -sn 192.168.1.0/24`

これにより、ホームネットワークに接続されているすべてのデバイスが表示され、Raspberry Pi 4のIPアドレス / MACアドレスが表示されます。ユーザー名、パスワード、およびIPアドレスを使用して今からSSHでログインできます。

```markdown
* ssh <username>@<ip address of your pi> ノート: *あなたの*ユーザー名と*あなたの* IPアドレス、およびプロンプトされたときに*あなたの*パスワードを入力する必要があります。
* 例: `ssh ubuntu@192.168.1.25` ここでユーザー名は *ubuntu*、IPアドレスは 192.168.1.25です。
```


  <img src="https://user-images.githubusercontent.com/81990132/197372846-e1279388-eaaa-4fbb-8d5d-f9928cb45195.png" alt="sshLogin" width="400" height="400"/>
       

Raspberry Piのバージョンが気になる場合は、このコマンドを試してください：

     `cat /sys/firmware/devicetree/base/model ; echo`

  <img src="https://user-images.githubusercontent.com/81990132/197689888-367c8eb3-2667-4c8c-85b3-44d46afe07a7.png" alt="which" width="700" height="400"/>

         

### zcashdのインストール

zcashdをインストールする方法は2つあります。事前にコンパイルされたバイナリをダウンロードするか、ソースからzcashdをコンパイルするかです。私はソースからコンパイルすることを強くお勧めします。自分でコンパイルする場合はクロスコンパイルすることを強くお勧めします。クロスコンパイルとは、1つのプラットフォームで動作するバイナリを別のプラットフォームで構築することです。その理由の一つは、Raspberry Pi 4が低消費電力であり、非常に高速ではないからです！メインコンピュータを活用してこの作業を支援してください。最新版はこちらから入手できます [here](https://github.com/zcash/zcash/releases)。クロスコンパイルを行うには必要なパッケージを確認する必要があります。以下のものをインストールしてください：

```bash
sudo apt-get install build-essential pkg-config libc6-dev m4 g++-multilib autoconf libtool ncurses-dev unzip git python3 python3-zmq zlib1g-dev curl bsdmainutils automake libtinfo5
sudo apt-get install gcc-aarch64-linux-gnu
```

次に、最新リリースをダウンロードしたディレクトリに移動し、以下のコマンドを実行します：

`HOST=aarch64-linux-gnu ./zcutil/build.sh`
          

### zcashdの設定

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

今からzcashdのバイナリファイルをRaspberry Pi 4に転送する必要があります。Zcashd v5.3では必要なファイルは以下の通りです：

```markdown
zcashd
zcash-cli
zcash-tx
zcash-gtest
zcash-inspect
zcashd-wallet-tool
fetch-params.sh
```

これらのファイルは、自分でコンパイルした場合は最新リリースのダウンロード場所の/srcディレクトリにあります。それ以外の場合は、事前にコンパイルされたファイルが保存されている場所です。転送を達成する方法は2つあり、SFTPを使用するか、外部ドライブを使用するかです。

#### SFTP

```bash
sftp username@<ip of RaspberryPi4>
put zcash*
```
   
#### 外部コピー
     
単にファイルをRaspberry Pi 4に接続する前に外部ドライブにコピーします。すでにフルノードが同期しており時間を節約したい場合は、ブロックとchainstateデータもコピーできます。
   
` cd ~/.zcash/`
     
単に実行してください：

```bash
tar -zcvf blocks.tar.gz /blocks
tar -zcvf chainstate.tar.gz /chainstate
```
     
ブロックとchainstate .gzファイルを外部SSD/HDDにコピーします。次に、Mediaフォルダで外部SSD/HDDをマウントして表示できるようにしてください：

```markdown
lsblkは接続されたすべてのドライブを表示します。多くはsdaという形式です。
idはユーザーとグループIDを表示します。
```
          
<img src="https://user-images.githubusercontent.com/81990132/197372643-abef88fd-9177-4bf9-abda-3c221188cd10.png" alt="lsblk" width="400" height="400"/>


          
          `sudo mount -o umask=0077,gid=<groupid>,uid=<userid> /dev/sda1 /media/portableHD/`
          
所有者とファイルの権限に注意してください。

```bash
sudo chown -R <username>: portableHD
sudo chmod -R 600 portableHD/
```
     
他のコンピュータからブロックとchainstate .gzファイルをコピーした場合は、今すぐ解凍してください。それらが外部ドライブの.zcashフォルダ内にあることを確認してください。

```bash
tar - xvzf blocks.tar.gz
tar - xvzf chainstate.tar.gz
```


Setup /media/portableHD/.zcash/zcash.conf

<img src="https://user-images.githubusercontent.com/81990132/197373699-18cc2c9f-b47d-44e9-9e6b-4c5cccf78d9e.png" alt="zconf" width="700" height="400"/>


 
注意してください。datadirを外部SSD/HDDに移動しました。これは非常に多くの空き容量があります。デフォルトの.zcashフォルダの場所が変更されているため、zcashdにこれを伝えるためにシンボリックリンクを使用する必要があります：

```markdown
cp -rp ~/.zcash/* /new_dir         // Make copy of datadir or supply with an external HD
rm -rf ~/.zcash                    // Remove default folder
ln -s /media/portableHD/ ~/.zcash  // Symbolic link new data location to the default so zcashd is happy
```
   

fetch-params.shスクリプトを実行して、zcashdに必要なデータをダウンロードします

    `./fetch-params.sh`


新しい 'screen' [ linuxのプログラム ] を起動します。-datadirを設定してzcashdを開きます：

```bash
screen -S zcashScreen`     
./zcashd -datadir=/media/portableHD/.zcash/
```
     
画面から離れます:

`Ctrl+a , Ctrl+d`


エイリアスを作成して、これらの追加データロケーションコマンドをすべてタイプする必要がないようにします

     `alias zcash-cli="./zcash-cli -datadir=/media/portable汇/.zcash/"`


準備ができました！

    `zcash-cli getblockchaininfo`

  <img src="https://user-images.githubusercontent.com/81990132/197373098-672aa228-d180-47ea-8a7c-c58dc3882426.png" alt="getblockchaininfo" width="400" height="400"/>



### zcashdの使用

<iframe class="w-full h-auto md:h-96" src="https://www.youtube.com/embed/KNhd1KC0Bqk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

---

ノードの状態を確認するにはどうすればよいですか？

     `tail -n 500 <path to>/.zcash/debug.log`

  <img src="https://user-images.githubusercontent.com/81990132/197684416-9a083de4-4a62-4fe8-9cab-798781b38cd2.png" alt="status" width="700" height="400"/>


  
     
ログから現在の高さを取得するには

     `tail -n 10 <path to>/.zcash/debug.log | grep -o  'height=[^b]*'`

  <img src="https://user-images.githubusercontent.com/81990132/199630447-6a6cd491-0cb3-47f8-95f0-45f6b6555870.png" alt="logHeight" width="500" height="400"/>


     
     `zcash-cli getinfo`
  
<img src="https://user-images.githubusercontent.com/81990132/199646508-132da0eb-899e-49a6-8b31-e9011e159700.png" alt="getInfo" width="400" height="400"/>

     
     
メモを送るにはどうすればよいですか？[ここ](https://zcash.readthedocs.io/en/latest/rtd_pages/memos.html)に記載されているように、*ascii2hex* と *hex2ascii* をダウンロードし、実行可能ファイルにしてください 

`chmod +x ascii2hex hex2ascii`
          
メモを作成し、それを16進数に変換します。ASCIIに戻してテストすることもできます。
          
<img src="https://user-images.githubusercontent.com/81990132/199646812-782142d6-8846-443a-8dd9-4f332e49d3e9.png" alt="asciiGOOD" width="400" height="400"/>


  
上記のメモの16進数バージョンを使用してSaplingのz2zトランザクションを作成します

`zcash-cli z_sendmany "ztestsapling1kg3u0y7szv6509732at34alct46cyn0g26kppgf2a7h5tpqxldtwm7cmhf8rqmhgt" "[{\"address\": \"ztestsapling2kg3u0y7szv6509732at34alct46cyn0g26kppgf2a7h5tpqxldtwm7cmhf8rqmhgtmpakcz5mdv\",\"amount\": 0.0001, \"memo\":\"5A656348756221\"}]"`

画面から離れた後、zcashScreenを再開するにはどうすればよいですか？

`screen -r zcashScreen`
     
zcashdを停止するにはどうすればよいですか？

`zcash-cli stop`
     
UAを作成するにはどうすればよいですか？

`zcash-cli z_getnewaccount`
     
  <img src="https://user-images.githubusercontent.com/81990132/202352436-04c17be2-e914-4b9b-95d1-00cf6fc496d3.png" alt="newAccount" width="400" height="400"/>



あなたのニーズに応じてUAの受信者を作成します。これはOrchardのみ、Orchard + Sapling、および最後にOrchard + Sapling + Transparentです。注意してください、受信者の長さによって違いを確認できます。
     
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


UAを使用してZECを送るにはどうすればよいですか？

`zcash-cli z_sendmany "fromOaddress" "[{\"address\": \"dOrchardAddress\",\"amount\": 0.0001, \"memo\":\"yourMemoinHex\"}]" <minconf> <fee> <privacyPolicy>`

<img src="https://user-images.githubusercontent.com/81990132/202365280-c184f622-eb7e-4095-bc38-90795121c43c.png" alt="UAsuccess" width="400" height="400"/>
<img src="https://user-images.githubusercontent.com/81990132/202366758-40650460-aaeb-4e03-891f-b4bd08e18234.png" alt="pic" width="400" height="400"/>

    
##### また、*from* アドレスと *destination* アドレスの両方が透明、Sapling、またはOrchardアドレスであることに注意してください。ただし、トランザクションが有効になるようにprivacyPolicyフラグを調整する必要がある場合があります。(一部の組み合わせはprivacyPolicyが意味を持たない場合があります！)


UAについてさらに情報を得るにはどこにいけばよいですか？

> [Hanhの](https://medium.com/@hanh425/transaction-privacy-78f80f9f175e)トランザクションプライバシーに関する投稿を確認してください。また、[この](https://forum.zcashcommunity.com/t/unified-addresses-full-node-rpc-api/41980/2)投稿もzcashフォーラムから。

> [この](https://github.com/zcash/zips/issues/470)

     
### 出典

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
