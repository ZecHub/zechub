# Z3: (zebrad)(zaino)(zingo-cli)

**zebrad**    : nodo completo de Zcash

**zaino**     : indexador de la blockchain de Zcash

**zingo-cli** : cliente zaino-proxy de línea de comandos de Zcash (subconjunto de Zingolib)

## Video

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/b5dIuGstMvI"
    title="Una introducción a Zingolib + Zaino"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## Panorama general

[Arquitectura del sistema](https://github.com/zingolabs/zaino/blob/dev/docs/zaino_live_system_architecture.pdf)


- El usuario de Zcash instala/compila Zingolib, lo que da acceso a zingo-cli. Puede enviar/recibir ZEC según lo necesite.
- Zingo-cli se conecta a zaino ya sea localmente o a través de un canal seguro en línea (¡al usuario de Zcash no le importa cómo funciona esto!)
- Zaino permite el acceso tanto a zebrad como a zcashd            
- zebrad completamente sincronizado es la fuente de verdad (¡ya no hay más billeteras aquí!)



## Instalación

Necesitarás instalar 3 cosas para que esto funcione correctamente. También recomiendo screen o algo similar para ayudar con la gestión de pantallas

`sudo apt install screen`

### zebrad

```
git clone https://github.com/ZcashFoundation/zebra.git
cd zebra
cargo install --git https://github.com/ZcashFoundation/zebra --tag v2.0.1 zebrad
```

 
*opcional* (crear una sesión de screen para zebrad)

```
screen -S zebra
zebrad start
```

nota: ¡esto tendrá que sincronizarse por completo! 

### zaino

```
git clone https://github.com/zingolabs/zaino.git
cd zaino
cargo build --release
PATH=$PATH:~/Desktop/zaino/target/release/
```


*opcional* (crear una sesión de screen para zaino)

```
screen -S zaino
cd ~/zaino/zainod
nano zindexer.toml  => Ajustar el puerto a 8232 para mainnet
zainod --config zindexer.toml
```


### zingo-cli

```
git clone https://github.com/zingolabs/zingolib.git
cd zingolib
cargo build --release --package zingo-cli
```

*opcional* (crear una sesión de screen para zingo-cli)

```
screen -S zingo
./zingo-cli --server http://127.0.0.1:8137 --data-dir /media/zebra5/zebra/.cache/lightwalletd
```

nota: esto tendrá que sincronizarse por completo, igual que lightwalletd. Recomiendo usar una unidad externa para ahorrar tiempo :)


## Ejecución

Si estás ejecutando esto en screens, `screen -r` enumerará cada screen para que puedas cambiar a la que necesites
