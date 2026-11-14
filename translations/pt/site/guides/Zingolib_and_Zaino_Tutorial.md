# Z3: (zebrad)(zaino)(zingo-cli)

**zebrad**    : nó integral do Zcash

**zaino**     : indexador da blockchain do Zcash

**zingo-cli** : cliente zaino-proxy de linha de comando do Zcash (subconjunto do Zingolib)

## Vídeo

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


## Visão geral

[Arquitetura do sistema](https://github.com/zingolabs/zaino/blob/dev/docs/zaino_live_system_architecture.pdf)


- Zcash O usuário instala/compila o Zingolib, que dá acesso ao zingo-cli. Ele pode enviar/receber ZEC conforme necessário.
- zingo-cli se conecta ao zaino localmente ou por um canal seguro online (o usuário do Zcash não se importa com o funcionamento disso!)
- Zaino permite acesso ao zebrad ou ao zcashd            
- O zebrad totalmente sincronizado é a fonte da verdade (sem mais carteiras aqui!)



## Instalação

Você precisará instalar 3 coisas para que isso funcione corretamente. Também recomendo o screen ou algo semelhante para ajudar no gerenciamento de telas

`sudo apt install screen`

### zebrad

```
git clone https://github.com/ZcashFoundation/zebra.git
cd zebra
cargo install --git https://github.com/ZcashFoundation/zebra --tag v7.0.0 zebrad
```

Use o Zebra 7.0.0 ou mais recente: o NU7 foi ativado na Mainnet no bloco 3.543.405, e versões mais antigas do `zebrad` não conseguem acompanhar a chain depois dessa altura ([notas de versão](https://github.com/ZcashFoundation/zebra/releases/tag/v7.0.0)).

 
*opcional* (crie uma sessão do screen para o zebrad)

```
screen -S zebra
zebrad start
```

observação: ele precisará sincronizar totalmente!

### zaino

```
git clone https://github.com/zingolabs/zaino.git
cd zaino
cargo build --release
PATH=$PATH:~/Desktop/zaino/target/release/
```


*opcional* (crie uma sessão do screen para o zaino)

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

*opcional* (crie uma sessão do screen para o zingo-cli)

```
screen -S zingo
./zingo-cli --server http://127.0.0.1:8137 --data-dir /media/zebra5/zebra/.cache/lightwalletd
```

observação: ele precisará sincronizar totalmente, assim como o lightwalletd fez. Recomendo usar um disco externo para economizar tempo :)


## Execução

Se você estiver executando esses programas em sessões do screen, o `screen -r` listará cada sessão para você alternar entre elas conforme necessário
