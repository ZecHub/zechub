# Raspberry Pi 4 *zcashd* Full node guide

## What you’ll learn

* How to create a bootable Ubuntu Server microSD card
* How to setup internet connectivity on the Raspberry Pi
* How to access your Raspberry Pi remotely
* How to install *zcashd*
* How to use *zcashd*


## Prerequisites

* [8GB Raspberry Pi 4 Canakit](https://www.canakit.com/raspberry-pi-4-starter-max-kit.html) or equivalent
* A computer with a microSD card drive
* A Wi-Fi network or an ethernet cable with an internet connection


### note: keeping your server secure is *not* simple by any means. Any tips/recommendations/best pratices beyond what is talked about in this guide *please* create a PR and help keep this guide as up-to-date as possible.







1.) https://github.com/adityapk00/zcash/releases

     If running 64 bit OS, we want zcash-linux-aarch64-v4.4.0.tar.gz

2.) We need to transfer zcashd,zcash-cli, and fetch-params.sh to your pi

    sftp username@<ip of pi> 
    
    put zcashd
    put zcash-cli
    put fetch-params.sh

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




