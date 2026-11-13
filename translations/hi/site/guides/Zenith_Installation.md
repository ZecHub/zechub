# Zenith GUI फुल नोड वॉलेट (full node wallet) इंस्टॉलेशन  

## वीडियो ट्यूटोरियल

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/zu8nvr4FlXE"
    title="Zenith Full Node Wallet Installation & Demo"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


---

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/-gawirv0L_U"
    title="Using RPC's with Zebrad + Zenith"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

## Haskell इंस्टॉल करें

> curl --proto '=https' --tlsv1.2 -sSf https://get-ghcup.haskell.org | sh


## Rust इंस्टॉल करें

> curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh


## Zebra इंस्टॉल करें

> sudo apt install libclang-dev

> cargo install --git https://github.com/ZcashFoundation/zebra --tag v2.1.0 zebrad

> zebrad generate -o ~/.config/zebrad.toml

> nano ~/.config/zebrad.toml


#### localhost पर RPC क्वेरी के लिए सुनें

> listen_addr = "127.0.0.1:8232"

#### कई CPU थ्रेड का अपने-आप उपयोग करें

parallel_cpu_threads = 0

enable_cookie_auth = false

## Zenith इंस्टॉल करें

**tar.gz डाउनलोड करें और उसे अपनी होम डायरेक्टरी में अनटार करें**

> wget https://code.vergara.tech/Vergara_Tech/zenith/archive/0.7.2.0-beta.tar.gz

> tar -C ~ -xvzf 0.7.2.0-beta.tar.gz

> cd zenith

> rmdir zcash-haskell

> git clone https://code.vergara.tech/Vergara_Tech/zcash-haskell.git


### डिपेंडेंसी इंस्टॉल करें

> sudo apt install libssl-dev libgmp-dev libsecp256k1-dev libtinfo-dev libsdl2-dev libfreetype-dev libglew-dev gdk-pixbuf-tests raspi-config
  
> cargo install cargo-c

> stack install c2hs

> mousepad ~/.bashrc

> export PATH="/home/zebra5/.local/bin:$PATH"

> source ~/.bashrc


### aarch64 के लिए सोर्स में बदलाव करें

> nano configure

**दोनों पंक्तियों में triple को "aarch64-unknown-linux-gnu" में बदलें।**

> nano Setup.hs
 
 **zcash-haskell फ़ोल्डर और zenith फ़ोल्डर, दोनों में Setup.hs में बदलाव करें**

### कंपाइल 

- ./configure

- cabal build

- mkdir ~/Zenith

- cd ~/Zenith

- mkdir assets  

- cp ~/zenith/dist-newstyle/build/aarch64-linux/ghc-9.6.5/zenith-0.7.2.0/build/zenith/zenith ~/Zenith

- cp ~/zenith/zenith.cfg ~/Zenith

- cp -r ~/zenith/assets ~/Zenith/assets


### zenith.cfg में बदलाव करें

nodeUser = yourusername

nodePwd = superSecret

nodePort = 8234

dbFileName = zenith.db

zebraHost = 127.0.0.1

zebraPort = 8232


> cd ~/Zenith

## Raspi-config

> [नवीनतम gldriver-test डाउनलोड करें](https://archive.raspberrypi.org/debian/pool/main/g/gldriver-test/)
  
> sudo dpkg - gldriver-test_0.15_all.deb
  
> sudo raspi-config

  **एडवांस में जाएँ और opengl => GL (Full KMS) चुनें**

  **रीबूट करें**



## zenith चलाएँ

 ./zenith gui
 या
 ./zenith tui
 या
 ./zenithserver

## RPC

[कैसे करें](https://github.com/ZecHub/zechub/blob/main/site/tutorials/zenithserver/zenithBeta.md)
