# Z3: (zebrad)(zaino)(zingo-cli)

**zebrad**    : nó completo da zcash

**zaino**     : indexador da blockchain zcash

**zingo-cli** : cliente zaino-proxy de linha de comando da zcash (subconjunto de Zingolib)

## Vídeo

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/b5dIuGstMvI"
    title="Uma introdução ao Zingolib + Zaino"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## Visão geral

[Arquitetura do sistema](https://github.com/zingolabs/zaino/blob/dev/docs/zaino_live_system_architecture.pdf)


- O usuário do Zcash instala/compila o Zingolib, que dá acesso ao zingo-cli. Ele pode enviar/receber ZEC conforme necessário.
- O Zingo-cli se conecta ao zaino localmente ou por meio de um canal seguro online (o usuário do Zcash não se importa com como isso funciona!)
- O Zaino permite acesso ao zebrad ou ao zcashd            
- O zebrad totalmente sincronizado é a fonte da verdade (não há mais carteiras aqui!)



## Instalação

Você precisará instalar 3 coisas para que isso funcione corretamente. Também recomendo o screen ou algo semelhante para ajudar no gerenciamento das telas

`sudo apt install screen`

### zebrad

```
git clone https://github.com/ZcashFoundation/zebra.git
cd zebra
cargo install --git https://github.com/ZcashFoundation/zebra --tag v2.0.1 zebrad
```

 
*opcional* (crie uma sessão screen para o zebrad)

```
screen -S zebra
zebrad start
```

nota: isso precisará sincronizar completamente! 

### zaino

```
git clone https://github.com/zingolabs/zaino.git
cd zaino
cargo build --release
PATH=$PATH:~/Desktop/zaino/target/release/
```


*opcional* (crie uma sessão screen para o zaino)

```
screen -S zaino
cd ~/zaino/zainod
nano zindexer.toml  => Ajuste a porta para 8232 na mainnet
zainod --config zindexer.toml
```


### zingo-cli

```
git clone https://github.com/zingolabs/zingolib.git
cd zingolib
cargo build --release --package zingo-cli
```

*opcional* (crie uma sessão screen para o zingo-cli)

```
screen -S zingo
./zingo-cli --server http://127.0.0.1:8137 --data-dir /media/zebra5/zebra/.cache/lightwalletd
```

nota: isso precisará sincronizar completamente, assim como o lightwalletd. Recomendo usar uma unidade externa para economizar tempo :)


## Execução

Se você estiver executando isso em screens, `screen -r` listará cada screen para que você possa alternar entre elas conforme necessário
