# Raspberry Pi 4: a *zcashd* Full node guide

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

* Choose OS and Storage Device. Since Raspberry Pi 4's are 64 bit, I recommend choosing "Other general-purpose OS" => Ubuntu => Ubuntu Server 22.10 (64 bit). Click on Storage and select your SD Card

* Before writing to SD card, click on Advanced options by clicking on the white gear icon near the bottom right corner. Here you can update:

     * Hostname of your Raspberry Pi 4
     * Enable SSH
     * Create a username and pw
     * Enable and configure your wi-fi if needed
     
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

     * For compiling yourself it is highly recommended to cross-compile. Cross-compile is to build on one platform a binary that will run on another platform. One reason for this is Raspberry Pi 4's are low-powered and thus not very fast! Leverage your main computer to help with this.

     * To cross compile we need to make sure we have the needed packages. Install the following:

          * `sudo apt-get install build-essential pkg-config libc6-dev m4 g++-multilib autoconf libtool ncurses-dev unzip git python3 python3-zmq zlib1g-dev curl bsdmainutils automake libtinfo5`

          * `sudo apt-get install gcc-aarch64-linux-gnu`

     * Next we run:

          `HOST=aarch64-linux-gnu ./zcutil/build.sh`

### Setup *zcashd*

     If you cross-compiled your binaries on your main computer we now need to transfer them to your Raspberry Pi 4. The needed files include:
     
     `zcashd`
     `zcash-cli`
     `fetch-params.sh`
     
         
     * Using SFTP

    `sftp username@<ip of pi> 
     put zcashd
     put zcash-cli
     put fetch-params.sh`

3.) If you already have a fullnode synced and want to save time, copy the blocks and chainstate data. This is found in ~/.zcash/


tar -zcvf blocks.tar.gz , tar -zcvf chainstate.tar.gz  => transfer to PI via sftp or external HD (External much faster) . I untared into /media/portableHD/.zcash

4.) Setup zcash.conf

    addnode=mainnet.z.cash
    datadir=~/media/portableHD/.zcash
    server=1

5.) Since the default .zcash folder location has been moved, we need to work around this using symbolic links:
  
   $ cp -rp ~/.zcash/* /new_dir             // Make copy of datadir or supply with an external HD
   $ rm -rf ~/.zcash                        // Remove default folder
   $ ln -s /media/portableHD/ ~/.zcash      // Symbolic link new data location to the default so zcashd is happy

6.) Run fetch-params.sh script to download needed data for zcashd
   
    ./fetch-params.sh


7.) Start a new 'screen' [ program in linux ]. Open zcashd with -datadir set:
   
    
     ./zcashd -datadir=/media/portableHD/.zcash/




8.) Detach the screen. Ctrl+a , Ctrl+d


9.) Create an alias so you dont have to type out all these extra data location commands




      alias zcash-cli="./zcash-cli -datadir=/media/portableHD/.zcash/"


10.) Ready to use! try zcash-cli getblockchaininfo




