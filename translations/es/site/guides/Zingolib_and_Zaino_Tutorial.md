# Z3: (zebrad)(zaino)(zingo-cli)

**zebrad**    : nodo completo de zcash [zcash full node]

**zaino**     : indexador de blockchain de zcash [zcash blockchain indexer]

**zingo-cli** : cliente de línea de comandos zaino-proxy de zcash [zcash command line zaino-proxy client] (subconjunto de Zingolib)

## Video

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/b5dIuGstMvI"
    title="An introduction to Zingolib + Zaino"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## Panorama general

[Arquitectura del sistema System Architecture](https://github.com/zingolabs/zaino/blob/dev/docs/zaino_live_system_architecture.pdf)


- Zcash El usuario instala/compila Zingolib, lo que da acceso a zingo-cli. Puede enviar/recibir ZEC según sea necesario.
- zingo-cli se conecta a zaino, ya sea localmente o mediante un canal seguro en línea (¡al usuario de Zcash no le importa cómo funciona esto!)
- Zaino permite acceder a zebrad o zcashd            
- zebrad completamente sincronizado es la fuente de verdad (¡ya no hay más billeteras [wallets] aquí!)



## Instalación

Necesitarás instalar 3 cosas para que esto funcione correctamente. También recomiendo screen o algo similar para ayudar con la gestión de pantallas.

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

nota [note]: ¡esto deberá sincronizarse por completo!

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
nano zindexer.toml  => Adjust port to 8232 for mainnet
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

nota: esto deberá sincronizarse por completo, tal como lo hizo lightwalletd. Recomiendo usar una unidad externa para ahorrar tiempo :)


## Ejecución

Si estás ejecutando estos en screens, `screen -r` enumerará cada pantalla para que puedas moverte entre ellas según sea necesario
