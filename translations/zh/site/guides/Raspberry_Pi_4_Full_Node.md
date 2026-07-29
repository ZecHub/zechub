<a href="https://github.com/zechub/zechub/edit/main/site/guides/Raspberry_Pi_4_Full_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="编辑页面"/>
</a>


# Raspberry Pi 4：*zcashd* 全节点指南


本指南旨在帮助有兴趣在低功耗 Raspberry Pi 4 上运行全节点的 Zcash 用户学习相关知识。

<img src="https://user-images.githubusercontent.com/81990132/197372541-dcd886ab-a3d0-4614-b490-0294ddf3ffae.png" alt="zcashd" width="700" height="700"/>


## 视频

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/SGYrzhs1l2k"
    title="如何在 Raspberry Pi 上编译 Zcash 节点！"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

## 支持

如果你觉得本指南有用，可考虑捐赠 ZEC 以支持 ZecHub：

`u1rl2zw85dmjc8m4dmqvtstcyvdjn23n0ad53u5533c97affg9jq208du0vf787vfx4vkd6cd0ma4pxkkuc6xe6ue4dlgjvn9dhzacgk9peejwxdn0ksw3v3yf0dy47znruqftfqgf6xpuelle29g2qxquudxsnnen3dvdx8az6w3tggalc4pla3n4jcs8vf4h29ach3zd8enxulush89`


## 你将学到什么

```markdown
* How to create a bootable Ubuntu Server microSD card
* How to setup internet connectivity on the Raspberry Pi 4
* How to access your Raspberry Pi 4 remotely
* How to install zcashd
* How to setup zcashd
* How to use zcashd
```


## 前置条件

> [8GB Raspberry Pi 4 Canakit](https://www.canakit.com/raspberry-pi-4-starter-max-kit.html) 或同等设备

> 一台带有 microSD 卡槽的电脑

> Wi-Fi 网络，或带有网络连接的以太网线

> 支持 USB3 的外置 SSD/HHD


##### 注意：保障你的服务器安全绝非易事。如果你有任何本指南未涵盖的技巧/建议/最佳实践，*请务必*创建一个 PR，帮助本指南尽可能保持最新。



### 准备 SD 卡

在这一步中，你将创建一张*可启动*的 SD 卡，使你的 Raspberry Pi 4 能够启动。将 microSD 卡插入电脑。你可能需要使用 Canakit 随附的适配器或其他同类适配器。为你的操作系统安装 Raspberry Pi Imager。下载你当前可用操作系统对应的版本。
     
     > [Ubuntu](https://downloads.raspberrypi.org/imager/imager_latest_amd64.deb)
     
     > [Windows](https://downloads.raspberrypi.org/imager/imager_latest.exe)
     
     > [macOS](https://downloads.raspberrypi.org/imager/imager_latest.dmg)

例如，在 linux 中，下载后你可以输入以下命令：

`sudo dpkg -i imager_latest_amd64.deb`

打开 Raspberry Pi Imager

`rpi-imager`

<img src="https://user-images.githubusercontent.com/81990132/197372069-fb9f7417-d320-42cf-ad65-38d630512985.png" alt="rpi imager" width="400" height="400"/>

选择操作系统和存储设备。由于 Raspberry Pi 4 是 64 位的，我建议选择 “Other general-purpose OS” => Ubuntu => Ubuntu Server 24.04.3 LTS (64 bit)。点击 Storage 并选择你的 SD 卡。在写入 SD 卡之前，点击右下角附近的白色齿轮图标，打开高级选项。


<img src="https://user-images.githubusercontent.com/81990132/197372159-1169c6f4-f6aa-4f44-9679-fe7aa542bbd3.png" alt="齿轮" width="200" height="200"/>



在这里你可以更新：

```markdown
* Hostname of your Raspberry Pi 4
* Enable SSH
* Create a username and pw
* Enable and configure your wi-fi if needed
```
 
<img src="https://user-images.githubusercontent.com/81990132/197372149-8b85bfac-e473-4808-87cd-f27f15d05de8.png" alt="高级选项" width="400" height="400"/>

 
完成后点击 Write


### 启动 Ubuntu Server

如果你有额外的显示器和键盘，现在就把它们接上。注意：这些都是可选的。将刚刚格式化好的 SD 卡插入 Raspberry Pi 4，并将外置 SSD/HHD 插入 USB3 端口。同时接上电源线并开机。

### 远程连接到你的 Raspberry Pi 4

现在我们需要连接到你的 Raspberry Pi 4。我们需要以下内容：

```markdown
* Username and pw (from previous step)
* IP address so we can use SSH
* Monitor, and keyboard (optional)
* If you have a monitor and keyboard connected directly to your pi, the rest of this section can be skipped.
```

查找 IP 地址有两种方式：通过路由器管理页面，或者使用 nmap。如果使用路由器，具体方式取决于厂商，这部分细节请自行快速 google 一下。对于 nmap，首先请确保它已安装：

     `sudo apt-get install nmap`
     
找到你当前电脑的 IP 地址，并记下前三段。这通常是 192.168.1.xxx 或 192.168.50.xxx。按如下方式将这些信息填入 nmap：
          
`sudo nmap -sn 192.168.50.0/24`

或

`sudo nmap -sn 192.168.1.0/24`

这将显示所有连接到你家庭网络的设备，其中应该能识别出你的 Raspberry Pi 4 的 IP 地址 / MAC 地址。使用你的用户名、pw 和 IP 地址，现在我们就可以通过 SSH 登录了。

```markdown
* ssh <username>@<ip address of your pi> note: you must plugin *your* username and *your* IP address, and *your* pw when prompted.
* For example: `ssh ubuntu@192.168.1.25 where the username is *ubuntu* and IP address is 192.168.1.25.
```


  <img src="https://user-images.githubusercontent.com/81990132/197372846-e1279388-eaaa-4fbb-8d5d-f9928cb45195.png" alt="ssh 登录" width="400" height="400"/>
       

如果你想确认自己使用的是哪个版本的 Raspberry Pi，可以试试这个命令：

     `cat /sys/firmware/devicetree/base/model ; echo`

  <img src="https://user-images.githubusercontent.com/81990132/197689888-367c8eb3-2667-4c8c-85b3-44d46afe07a7.png" alt="查看版本" width="700" height="400"/>
### 安装 *zcashd*

安装 zcashd 有两种方式：下载预编译二进制文件，或从源码编译 zcashd。我*强烈*推荐从源码编译。对于自行编译，强烈建议进行交叉编译。交叉编译是指在一个平台上构建可在另一个平台上运行的二进制文件。这样做的一个原因是 Raspberry Pi 4 性能较低，因此速度不快！你可以借助主电脑来完成这项工作。你可以在[这里](https://github.com/zcash/zcash/releases)获取最新版本。要进行交叉编译，我们需要确保安装了所需的软件包。请安装以下内容：

```bash
sudo apt-get install build-essential pkg-config libc6-dev m4 g++-multilib autoconf libtool ncurses-dev unzip git python3 python3-zmq zlib1g-dev curl bsdmainutils automake libtinfo5
sudo apt-get install gcc-aarch64-linux-gnu
```

接下来切换到刚刚下载的 zcashd 版本目录，并运行：

`HOST=aarch64-linux-gnu ./zcutil/build.sh`
          

### 设置 *zcashd*

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/9t2LX3HFldw"
    title="Zcashd 钱包工具 - 生成并导入私钥"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

---

现在我们需要将所有 zcashd 二进制文件传输到你的 Raspberry Pi 4。自 Zcashd v5.3 起，所需文件包括：

```markdown
zcashd
zcash-cli
zcash-tx
zcash-gtest
zcash-inspect
zcashd-wallet-tool
fetch-params.sh
```

如果你是自行编译的，这些文件位于你最新版本下载目录中的 /src 目录下。否则，预编译文件就在你下载它们的位置。完成传输有两种方式：使用 SFTP，或者使用外置硬盘。

#### SFTP

```bash
sftp username@<ip of RaspberryPi4>
put zcash*
```
   
#### 外置复制
     
只需先将文件复制到外置设备上，再把它插入 Raspberry Pi 4。如果你已经有一个同步完成的全节点并且想节省时间，也可以一并复制 blocks 和 chainstate 数据。
   
` cd ~/.zcash/`
     
直接运行：

```bash
tar -zcvf blocks.tar.gz /blocks
tar -zcvf chainstate.tar.gz /chainstate
```
     
将 blocks 和 chainstate 的 .gz 文件复制到你的外置 SSD/HHD。接下来把外置 SSD/HDD 挂载到 Media 文件夹中，这样你就能看到它：

```markdown
lsblk 将显示所有已连接的驱动器。多数会是 sda 这种格式
id 将显示你的用户和组 id。
```
          
<img src="https://user-images.githubusercontent.com/81990132/197372643-abef88fd-9177-4bf9-abda-3c221188cd10.png" alt="lsblk" width="400" height="400"/>


          
          `sudo mount -o umask=0077,gid=<groupid>,uid=<userid> /dev/sda1 /media/portableHD/`
          
注意查看文件夹/文件的所有者以及权限。

```bash
sudo chown -R <username>: portableHD
sudo chmod -R 600 portableHD/
```
     
如果你从另一台电脑复制了 blocks 和 chainstate 的 .gz 文件，现在就将它们解压。确保它们位于外置硬盘的 .zcash 文件夹中。

```bash
tar - xvzf blocks.tar.gz
tar - xvzf chainstate.tar.gz
```


设置 /media/portableHD/.zcash/zcash.conf

<img src="https://user-images.githubusercontent.com/81990132/197373699-18cc2c9f-b47d-44e9-9e6b-4c5cccf78d9e.png" alt="zconf" width="700" height="400"/>


 
注意我们已经把 datadir 移到了空间更大的外置 SSD/HDD。由于默认的 .zcash 文件夹位置已经改变，我们需要通过符号链接来告诉 *zcashd*：

```markdown
cp -rp ~/.zcash/* /new_dir         // 复制 datadir，或改为使用外置硬盘
rm -rf ~/.zcash                    // 删除默认文件夹
ln -s /media/portableHD/ ~/.zcash  // 将新的数据位置符号链接到默认位置，这样 zcashd 就能正常工作
```
   

运行 fetch-params.sh 脚本以下载 zcashd 所需的数据
   
    `./fetch-params.sh`


启动一个新的 'screen' [ linux 中的程序 ]。打开 zcashd 并设置 -datadir：

```bash
screen -S zcashScreen`     
./zcashd -datadir=/media/portableHD/.zcash/
```
     
分离 screen：

`Ctrl+a , Ctrl+d`


创建一个别名，这样你就不用输入这些额外的数据位置命令了

     `alias zcash-cli="./zcash-cli -datadir=/media/portableHD/.zcash/"`


可以开始使用了！

    `zcash-cli getblockchaininfo`

  <img src="https://user-images.githubusercontent.com/81990132/197373098-672aa228-d180-47ea-8a7c-c58dc3882426.png" alt="getblockchaininfo" width="400" height="400"/>



### 使用 *zcashd*

<iframe class="w-full h-auto md:h-96" src="https://www.youtube.com/embed/KNhd1KC0Bqk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

---

如何检查你的节点状态？

     `tail -n 500 <path to>/.zcash/debug.log`

  <img src="https://user-images.githubusercontent.com/81990132/197684416-9a083de4-4a62-4fe8-9cab-798781b38cd2.png" alt="status" width="700" height="400"/>


  
     
从日志中获取当前高度

     `tail -n 10 <path to>/.zcash/debug.log | grep -o  'height=[^b]*'`

  <img src="https://user-images.githubusercontent.com/81990132/199630447-6a6cd491-0cb3-47f8-95f0-45f6b6555870.png" alt="logHeight" width="500" height="400"/>


     
     `zcash-cli getinfo`
  
<img src="https://user-images.githubusercontent.com/81990132/199646508-132da0eb-899e-49a6-8b31-e9011e159700.png" alt="getInfo" width="400" height="400"/>

     
     
如何发送 memo？如[这里](https://zcash.readthedocs.io/en/latest/rtd_pages/memos.html)所示，下载 *ascii2hex* 和 *hex2ascii* 并赋予它们可执行权限 

`chmod +x ascii2hex hex2ascii`
          
创建一个 memo 并将其转换为 hex。你也可以再转回 ascii 来测试。
          
<img src="https://user-images.githubusercontent.com/81990132/199646812-782142d6-8846-443a-8dd9-4f332e49d3e9.png" alt="asciiGOOD" width="400" height="400"/>


  
使用上面 memo 的 hex 版本创建一笔 z2z 交易（Sapling）

`zcash-cli z_sendmany "ztestsapling1kg3u0y7szv6509732at34alct46cyn0g26kppgf2a7h5tpqxldtwm7cmhf8rqmhgt" "[{\"address\": \"ztestsapling2kg3u0y7szv6509732at34alct46cyn0g26kppgf2a7h5tpqxldtwm7cmhf8rqmhgtmpakcz5mdv\",\"amount\": 0.0001, \"memo\":\"5A656348756221\"}]"`

分离 zcashScreen 之后，如何恢复它？

`screen -r zcashScreen`
     
如何停止 *zcashd* ？

`zcash-cli stop`
     
如何创建一个 UA？

`zcash-cli z_getnewaccount`
     
  <img src="https://user-images.githubusercontent.com/81990132/202352436-04c17be2-e914-4b9b-95d1-00cf6fc496d3.png" alt="newAccount" width="400" height="400"/>

    
现在根据*你的需求*构建一个 UA 接收器。这包括仅 Orchard、Orchard + Sapling，最后是 Orchard + Sapling + Transparent。注意，你可以通过接收器的长度来区分它们。
     
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


如何使用 UA 发送 ZEC？

`zcash-cli z_sendmany "fromOaddress" "[{\"address\": \"dOrchardAddress\",\"amount\": 0.0001, \"memo\":\"yourMemoinHex\"}]" <minconf> <fee> <privacyPolicy>`

<img src="https://user-images.githubusercontent.com/81990132/202365280-c184f622-eb7e-4095-bc38-90795121c43c.png" alt="UAsuccess" width="400" height="400"/>
<img src="https://user-images.githubusercontent.com/81990132/202366758-40650460-aaeb-4e03-891f-b4bd08e18234.png" alt="pic" width="400" height="400"/>
##### 需要注意的是，*来源* 和 *目标* 地址都可以是 transparent、sapling 或 orchard 地址，不过你可能需要调整 `privacyPolicy` 标志，交易才能有效。（如果 `privacyPolicy` 不合理，某些组合将无法工作！）


我在哪里可以找到更多关于 UA 的信息？

> 请查看 [Hanh 的](https://medium.com/@hanh425/transaction-privacy-78f80f9f175e)这篇关于交易隐私的文章。另请参阅 zcash 论坛上的[这篇](https://forum.zcashcommunity.com/t/unified-addresses-full-node-rpc-api/41980/2)帖子。

> [这个](https://github.com/zcash/zips/issues/470)

     
### 来源

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
