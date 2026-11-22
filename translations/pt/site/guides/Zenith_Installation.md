# Instalação da carteira de nó integral com interface gráfica Zenith

## Tutorial em vídeo

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

## Instale o Haskell

> curl --proto '=https' --tlsv1.2 -sSf https://get-ghcup.haskell.org | sh


## Instale o Rust

> curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh


## Instale o Zebra

> sudo apt install libclang-dev

> cargo install --git https://github.com/ZcashFoundation/zebra --tag v7.0.0 zebrad

Use o Zebra 7.0.0 ou mais recente: o NU7 foi ativado na Mainnet no bloco 3.543.405, e versões mais antigas do `zebrad` não conseguem acompanhar a chain além dessa altura ([notas de versão](https://github.com/ZcashFoundation/zebra/releases/tag/v7.0.0)). A versão do Zenith abaixo (0.7.2.0-beta) é antiga: a versão mais recente no momento em que este texto foi escrito é a 0.13.0.0-beta (jun 2026, com suporte ao NU6.2). Confira [as versões do Zenith](https://code.vergara.tech/Vergara_Tech/zenith/releases) para encontrar uma que suporte o NU7 antes de usá-lo na Mainnet.

> zebrad generate -o ~/.config/zebrad.toml

> nano ~/.config/zebrad.toml


#### Escutar consultas RPC no localhost

> listen_addr = "127.0.0.1:8232"

#### Usar automaticamente várias threads da CPU

parallel_cpu_threads = 0

enable_cookie_auth = false

## Instale o Zenith

**Baixe o arquivo tar.gz e extraia-o no seu diretório home**

> wget https://code.vergara.tech/Vergara_Tech/zenith/archive/0.7.2.0-beta.tar.gz

> tar -C ~ -xvzf 0.7.2.0-beta.tar.gz

> cd zenith

> rmdir zcash-haskell

> git clone https://code.vergara.tech/Vergara_Tech/zcash-haskell.git


### Instale as dependências

> sudo apt install libssl-dev libgmp-dev libsecp256k1-dev libtinfo-dev libsdl2-dev libfreetype-dev libglew-dev gdk-pixbuf-tests raspi-config
  
> cargo install cargo-c

> stack install c2hs

> mousepad ~/.bashrc

> export PATH="/home/zebra5/.local/bin:$PATH"

> source ~/.bashrc


### Ajuste o código-fonte para aarch64

> nano configure

**Altere o triple para: "aarch64-unknown-linux-gnu" nas duas linhas.**

> nano Setup.hs
 
 **Modifique o Setup.hs tanto na pasta zcash-haskell quanto na pasta zenith**

### Compile 

- ./configure

- cabal build

- mkdir ~/Zenith

- cd ~/Zenith

- mkdir assets  

- cp ~/zenith/dist-newstyle/build/aarch64-linux/ghc-9.6.5/zenith-0.7.2.0/build/zenith/zenith ~/Zenith

- cp ~/zenith/zenith.cfg ~/Zenith

- cp -r ~/zenith/assets ~/Zenith/assets


### Ajuste o zenith.cfg

nodeUser = yourusername

nodePwd = superSecret

nodePort = 8234

dbFileName = zenith.db

zebraHost = 127.0.0.1

zebraPort = 8232


> cd ~/Zenith

## Raspi-config

> [Baixe a versão mais recente do gldriver-test](https://archive.raspberrypi.org/debian/pool/main/g/gldriver-test/)
  
> sudo dpkg - gldriver-test_0.15_all.deb
  
> sudo raspi-config

  **Vá em advanced e selecione opengl => GL (Full KMS)**

  **Reinicie**



## Execute o zenith

 ./zenith gui
 ou
 ./zenith tui
 ou
 ./zenithserver

## RPCs

[Como fazer](https://github.com/ZecHub/zechub/blob/main/site/tutorials/zenithserver/zenithBeta.md)
