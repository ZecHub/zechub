
# ![raspi](https://user-images.githubusercontent.com/81990132/197372285-1f413bc5-13a0-4671-9c81-760eafdda926.png)Raspberry Pi 4: a *zcashd* Full node guide ![zcashd](https://user-images.githubusercontent.com/81990132/197372224-9016d121-7bee-4e40-8f13-0ac8039486d1.png)


The purpose of this guide is to help educate Zcashers who are interested in running a full node on a low-powered Raspberry Pi 4.


## What you’ll learn
* How to create a bootable Ubuntu Server microSD card
* How to setup internet connectivity on the Raspberry Pi 4
* How to access your Raspberry Pi 4 remotely
* How to install *zcashd*
* How to use *zcashd*


## Prerequisites
* [8GB Raspberry Pi 4 Canakit](https://www.canakit.com/raspberry-pi-4-starter-max-kit.html) or equivalent
* A computer with a microSD card drive
* A Wi-Fi network or an ethernet cable with an internet connection
* External SSD/HHD with USB3 support

##### note: keeping your server secure is *not* simple by any means. Any tips/recommendations/best pratices beyond what is talked about in this guide *please* create a PR and help keep this guide as up-to-date as possible.






## Contents:
* Prepare the SD Card
* Boot Ubuntu Server
* Connect remotely to your Raspberry Pi 4
* Install *zcashd*
* Setup *zcashd*
* Using *zcashd*

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

If you have an extra monitor, mouse and keyboard plug those in now. Note: these are optional


* Install the SD card you just formatted into the Raspberry Pi 4 and also plug in the External SSD/HHD into the USB3 port. Also plug in the power cord and turn it on.


### Connect remotely to your Raspberry Pi 4

* We now need to connect to your Raspberry Pi 4. Things we need:

     * Username and pw (from previous step)
     * IP address so we can use SSH
     * Monitor,mouse and keyboard (optional)

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
          
         

### Installing *zcashd*

* Two ways of installing zcashd including downloading a precompiled binary or compiling zcashd from source. I *highly* recommend compiling from source.

     * If downloading a precompiled binary one source is [adityapk00](https://github.com/adityapk00/zcash/releases) . Note that since we are running a 64 bit OS, we want zcash-linux-aarch64-v*.tar.gz. Also note that up-to-date versions of zcashd are rarely precompiled.

     * For compiling yourself it is highly recommended to cross-compile. Cross-compile is to build on one platform a binary that will run on another platform. One reason for this is Raspberry Pi 4's are low-powered and thus not very fast! Leverage your main computer to help with this. You can grab the latest release [here](https://github.com/zcash/zcash/releases)

     * To cross compile we need to make sure we have the needed packages. Install the following:

          * `sudo apt-get install build-essential pkg-config libc6-dev m4 g++-multilib autoconf libtool ncurses-dev unzip git python3 python3-zmq zlib1g-dev curl bsdmainutils automake libtinfo5`

          * `sudo apt-get install gcc-aarch64-linux-gnu`

     * Next change directory into the freshly downloaded zcashd release and run:

          `HOST=aarch64-linux-gnu ./zcutil/build.sh`

### Setup *zcashd*

* If you cross-compiled binaries on your main computer we now need to transfer them to your Raspberry Pi 4. As of Zcashd v5.3 the needed files include:
     
     `zcashd`
     `zcash-cli`
     `zcash-tx`
     `zcash-gtest`
     `zcash-inspect`
     `zcashd-wallet-tool`
     `fetch-params.sh`

* These files are found in the /src directory of your latest release download location. 
         
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
     
* If you already have a fullnode synced and want to save time, you can also copy the blocks and chainstate data.
   
    ` cd ~/.zcash/`
     
    * Simply run:

     `tar -zcvf blocks.tar.gz`
     `tar -zcvf chainstate.tar.gz` 
     
    * Copy the blocks and chainstate .gz files into your External SSH/HHD.   


     
 * Using External SSH/HHD on your Raspberry Pi 4

     * Mount the External SSD/HDD in the Media folder so you can see it:
     
          `lsblk` will display all drives connected. Most will be of the format sda
          
          `sudo mount /dev/sda1 /media/portableHD/`
          
     * Keep an eye on both who owns the folders/files and also the permissions

          `sudo chown -R <username>: portableHD`
          `sudo chmod -R 700 portableHD/`


* Setup zcash.conf using nano:

     * `nano zcash.conf`

          `addnode=mainnet.z.cash`
          `datadir=~/media/portableHD/.zcash`
          `server=1`
          
     * notice how we moved the datadir to the External SSD/HDD which has much more space availible.
     

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


* Ready to use! try:

      `zcash-cli getblockchaininfo`

### Using *zcashd*



