
# ![raspi](https://user-images.githubusercontent.com/81990132/197372285-1f413bc5-13a0-4671-9c81-760eafdda926.png)Raspberry Pi 4: a *zcashd* Full node guide 


The purpose of this guide is to help educate Zcashers who are interested in running a full node on a low-powered Raspberry Pi 4.
![zcashdPI](https://user-images.githubusercontent.com/81990132/197372541-dcd886ab-a3d0-4614-b490-0294ddf3ffae.png)


If you find this guide useful, consider donating ZEC to support ZecHub:

`zs1t2fz22l7sw09ctwu7knymna60aa84fxap86rny6ul4nx007nh3pp5d4u7y4ucyvxwpgzyjz7vgx`

![zecHubQR](https://user-images.githubusercontent.com/81990132/197678815-f9092760-c43e-49fe-b15d-c145646bf783.png)


## What you’ll learn
* How to create a bootable Ubuntu Server microSD card
* How to setup internet connectivity on the Raspberry Pi 4
* How to access your Raspberry Pi 4 remotely
* How to install *zcashd*
* How to setup *zcashd*
* How to use *zcashd*


## Prerequisites
* [8GB Raspberry Pi 4 Canakit](https://www.canakit.com/raspberry-pi-4-starter-max-kit.html) or equivalent
* A computer with a microSD card drive
* A Wi-Fi network or an ethernet cable with an internet connection
* External SSD/HHD with USB3 support

##### note: keeping your server secure is *not* simple by any means. Any tips/recommendations/best pratices beyond what is talked about in this guide *please* create a PR and help keep this guide as up-to-date as possible.






## Contents:
* [Prepare the SD Card](https://github.com/dismad/zechub/blob/main/site/guides/RaspberryPi4FullNode.md#prepare-the-sd-card)
* [Boot Ubuntu Server](https://github.com/dismad/zechub/blob/main/site/guides/RaspberryPi4FullNode.md#boot-ubuntu-server)
* [Connect remotely to your Raspberry Pi 4](https://github.com/dismad/zechub/blob/main/site/guides/RaspberryPi4FullNode.md#connect-remotely-to-your-raspberry-pi-4)
* [Install *zcashd*](https://github.com/dismad/zechub/blob/main/site/guides/RaspberryPi4FullNode.md#installing-zcashd)
* [Setup *zcashd*](https://github.com/dismad/zechub/blob/main/site/guides/RaspberryPi4FullNode.md#setup-zcashd)
* [Using *zcashd*](https://github.com/dismad/zechub/blob/main/site/guides/RaspberryPi4FullNode.md#using-zcashd)
* [Sources](https://github.com/dismad/zechub/blob/main/site/guides/RaspberryPi4FullNode.md#sources)

### Prepare the SD Card

In this step you will create a *bootable* SD card that will allow your Raspberry Pi 4 to boot.

* Insert the microSD card into your computer. You may need to use the adapter that comes with the Canakit or any other equivalent adaptor.
* Install Raspberry Pi Imager for your operating system. Download the version for the OS you currently have access to.
     
     * [Ubuntu](https://downloads.raspberrypi.org/imager/imager_latest_amd64.deb)
     * [Windows](https://downloads.raspberrypi.org/imager/imager_latest.exe)
     * [macOS](https://downloads.raspberrypi.org/imager/imager_latest.dmg)

For example in linux you would type the following after downloading:

`sudo dpkg -i imager_latest_amd64.deb`

* Open Raspberry Pi Imager

`rpi-imager`


![rpi-imager](https://user-images.githubusercontent.com/81990132/197372069-fb9f7417-d320-42cf-ad65-38d630512985.png)

* Choose OS and Storage Device. Since Raspberry Pi 4's are 64 bit, I recommend choosing "Other general-purpose OS" => Ubuntu => Ubuntu Server 22.10 (64 bit). Click on Storage and select your SD Card

* Before writing to SD card, click on Advanced options by clicking on the white gear icon near the bottom right corner.


![gear](https://user-images.githubusercontent.com/81990132/197372159-1169c6f4-f6aa-4f44-9679-fe7aa542bbd3.png)


* Here you can update:

     * Hostname of your Raspberry Pi 4
     * Enable SSH
     * Create a username and pw
     * Enable and configure your wi-fi if needed
 
 ![advanced](https://user-images.githubusercontent.com/81990132/197372149-8b85bfac-e473-4808-87cd-f27f15d05de8.png)

 
* Once complete hit Write


### Boot Ubuntu Server

If you have an extra monitor and keyboard plug those in now. Note: these are optional


* Install the SD card you just formatted into the Raspberry Pi 4 and also plug in the External SSD/HHD into the USB3 port. Also plug in the power cord and turn it on.


### Connect remotely to your Raspberry Pi 4

* We now need to connect to your Raspberry Pi 4. Things we need:

     * Username and pw (from previous step)
     * IP address so we can use SSH
     * Monitor,and keyboard (optional)

* If you have a monitor and keyboard connected directly to your pi, the rest of this section can be skipped.

* Two ways to find your IP address are via your router admin page, or with nmap. If using the router, it depends on which manufactor and I'll defer those details to a quick google search.
 
     * For nmap, first make sure it is installed:

     `sudo apt-get install nmap`
     
     * Find the IP address of your current computer and note the first three sections. This is typically 192.168.1.xxx or 192.168.50.xxx
     * Plug these details into nmap as follows:
          
          * `sudo nmap -sn 192.168.50.0/24` or `sudo nmap -sn 192.168.1.0/24`
          * This will display all devices connected to your home network, which should reveal your Raspberry Pi 4's IP address / MAC address
          
* Using your username, pw, and IP address we can now login using SSH

     * `ssh <username>@<ip address of your pi>` note: you must plugin *your* username and *your* IP address, and *your* pw when prompted

     * For example: `ssh ubuntu@192.168.1.25` where the username is *ubuntu* and IP address is 192.168.1.25.


   ![sshLogin](https://user-images.githubusercontent.com/81990132/197372846-e1279388-eaaa-4fbb-8d5d-f9928cb45195.png)
       

* If your curious which version Raspberry Pi you are using, try this command:

     `cat /sys/firmware/devicetree/base/model ; echo`
     
     ![which](https://user-images.githubusercontent.com/81990132/197689888-367c8eb3-2667-4c8c-85b3-44d46afe07a7.png)
         

### Installing *zcashd*

* Two ways of installing zcashd include downloading a precompiled binary or compiling zcashd from source. I *highly* recommend compiling from source.

     * If downloading a precompiled binary one source is [adityapk00](https://github.com/adityapk00/zcash/releases) . Note that since we are running a 64 bit OS, we want zcash-linux-aarch64-v*.tar.gz. Also note that up-to-date versions of zcashd are rarely precompiled.

     * For compiling yourself it is highly recommended to cross-compile. Cross-compile is to build on one platform a binary that will run on another platform. One reason for this is Raspberry Pi 4's are low-powered and thus not very fast! Leverage your main computer to help with this. You can grab the latest release [here](https://github.com/zcash/zcash/releases).

     * To cross compile we need to make sure we have the needed packages. Install the following:

          * `sudo apt-get install build-essential pkg-config libc6-dev m4 g++-multilib autoconf libtool ncurses-dev unzip git python3 python3-zmq zlib1g-dev curl bsdmainutils automake libtinfo5`

          * `sudo apt-get install gcc-aarch64-linux-gnu`

     * Next change directory into the freshly downloaded zcashd release and run:

          `HOST=aarch64-linux-gnu ./zcutil/build.sh`

### Setup *zcashd*

*  We now need to transfer all the zcashd binary files to your Raspberry Pi 4. As of Zcashd v5.3 the needed files include:
     
     `zcashd`
     `zcash-cli`
     `zcash-tx`
     `zcash-gtest`
     `zcash-inspect`
     `zcashd-wallet-tool`
     `fetch-params.sh`

* These files are found in the /src directory of your latest release download location if you compiled them yourself. Otherwise, the precompiled files are where you downloaded them. 
         
* Two ways of achieving the tranfers are either using SFTP, or by using your External drive.

     *SFTP*

    `sftp username@<ip of RaspberryPi4>`
    
    
    `put zcashd`
    
    `put zcash-cli`
    
    `put zcash-tx`
    
    `put zcash-gtest`
    
    `put zcash-inspect`
    
    `put zcashd-wallet-tool`
    
    `put fetch-params.sh`
   
     *OR*
     
     Simply copy the files onto the External before you plug it into the Raspberry Pi 4.
     
* If you already have a full node synced and want to save time, you can also copy the blocks and chainstate data.
   
    ` cd ~/.zcash/`
     
    * Simply run:

     `tar -zcvf blocks.tar.gz /blocks`
     `tar -zcvf chainstate.tar.gz /chainstate` 
     
    * Copy the blocks and chainstate .gz files into your External SSD/HHD.   


     
 * Using External SSD/HHD on your Raspberry Pi 4

     * Mount the External SSD/HDD in the Media folder so you can see it:
     
          `lsblk` will display all drives connected. Most will be of the format sda
          
          `id` will show your user and group id's.
          
          ![lsblk](https://user-images.githubusercontent.com/81990132/197372643-abef88fd-9177-4bf9-abda-3c221188cd10.png)

          
          `sudo mount -o umask=0077,gid=<groupid>,uid=<userid> /dev/sda1 /media/portableHD/`
          
     * Keep an eye on both who owns the folders/files and also the permissions

          `sudo chown -R <username>: portableHD`
          `sudo chmod -R 700 portableHD/`
     
     * If you copied the blocks and chainstate .gz files from your other computer untar these now. Make sure they are in the .zcash folder on your External drive.

          `tar - xvzf blocks.tar.gz`
          `tar - xvzf chainstate.tar.gz`


* Setup /media/portableHD/.zcash/zcash.conf


![zconf](https://user-images.githubusercontent.com/81990132/197373699-18cc2c9f-b47d-44e9-9e6b-4c5cccf78d9e.png)

 
* notice how we moved the datadir to the External SSD/HDD which has much more space available.
     

* Since the default .zcash folder location has been moved, we need to tell *zcashd* this by using symbolic links:
  
   `cp -rp ~/.zcash/* /new_dir `            // Make copy of datadir or supply with an external HD
   
   `rm -rf ~/.zcash`                        // Remove default folder
   
   `ln -s /media/portableHD/ ~/.zcash`     // Symbolic link new data location to the default so zcashd is happy
   

* Run fetch-params.sh script to download needed data for zcashd
   
    `./fetch-params.sh`


* Start a new 'screen' [ program in linux ]. Open zcashd with -datadir set:

     * `screen -S zcashScreen`
     
     * `./zcashd -datadir=/media/portableHD/.zcash/`
     
     * Detach the screen. `Ctrl+a , Ctrl+d`


* Create an alias so you dont have to type out all these extra data location commands

     `alias zcash-cli="./zcash-cli -datadir=/media/portableHD/.zcash/"`


* Ready to use!

    `zcash-cli getblockchaininfo`
    
    ![getBlockchaininfo](https://user-images.githubusercontent.com/81990132/197373098-672aa228-d180-47ea-8a7c-c58dc3882426.png)


### Using *zcashd*

* How do you check the status of your node?

     `tail -n 500 <path to>/.zcash/debug.log`
     
     ![status](https://user-images.githubusercontent.com/81990132/197684416-9a083de4-4a62-4fe8-9cab-798781b38cd2.png)
     
* To get current height from your log

     `tail -n 10 <path to>/.zcash/debug.log | grep -o  'height=[^b]*'`
     
     ![logHeight](https://user-images.githubusercontent.com/81990132/199630447-6a6cd491-0cb3-47f8-95f0-45f6b6555870.png)

     
     `zcash-cli getinfo`
     
     
* How do you send a memo?

     * As seen [here](https://zcash.readthedocs.io/en/latest/rtd_pages/memos.html), download 

         `ascii2hex`
         
          and
          
         `hex2ascii`
         
          
     *  Make them executable 

          `chmod +x ascii2hex hex2ascii`
          
        ![goodd](https://user-images.githubusercontent.com/81990132/199645437-3adaf25d-6c2a-4f63-b33f-24202907a93e.png)
  
      

* How do you resume your zcashScreen after you detached it?

     `screen -r zcashScreen`
     
* How do you stop *zcashd* ?

     `zcash-cli stop`

### Sources

* https://ubuntu.com/tutorials/how-to-install-ubuntu-on-your-raspberry-pi#1-overview
* https://github.com/zcash/zcash
* https://zcash.readthedocs.io/en/latest/rtd_pages/Debian-Ubuntu-build.html
* https://zcash.readthedocs.io/en/latest/rtd_pages/memos.html
* https://en.wikipedia.org/wiki/Secure_Shell
* https://itsfoss.com/how-to-find-what-devices-are-connected-to-network-in-ubuntu/
* https://youtu.be/YS5Zh7KExvE
