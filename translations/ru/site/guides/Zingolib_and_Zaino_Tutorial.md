# Z3: (zebrad)(zaino)(zingo-cli)

**zebrad**    : полная нода zcash

**zaino**     : индексатор блокчейна zcash

**zingo-cli** : клиент командной строки zaino-proxy для zcash (подмножество Zingolib)

## Видео

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


## Общая картина

[Архитектура системы](https://github.com/zingolabs/zaino/blob/dev/docs/zaino_live_system_architecture.pdf)


- Пользователь Zcash устанавливает/компилирует Zingolib, что даёт доступ к zingo-cli. Он может отправлять/получать ZEC по мере необходимости.
- Zingo-cli подключается к zaino либо локально, либо через защищённый канал онлайн (пользователю Zcash не важно, как это работает!)
- Zaino предоставляет доступ либо к zebrad, либо к zcashd            
- Полностью синхронизированный zebrad является источником истины (кошельков здесь больше нет!)



## Установка

Чтобы всё работало корректно, вам нужно установить 3 вещи. Я также рекомендую screen или что-то подобное для удобного управления экранами

`sudo apt install screen`

### zebrad

```
git clone https://github.com/ZcashFoundation/zebra.git
cd zebra
cargo install --git https://github.com/ZcashFoundation/zebra --tag v2.0.1 zebrad
```

 
*необязательно* (создайте сессию screen для zebrad)

```
screen -S zebra
zebrad start
```

примечание: для этого потребуется полная синхронизация! 

### zaino

```
git clone https://github.com/zingolabs/zaino.git
cd zaino
cargo build --release
PATH=$PATH:~/Desktop/zaino/target/release/
```


*необязательно* (создайте сессию screen для zaino)

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

*необязательно* (создайте сессию screen для zingo-cli)

```
screen -S zingo
./zingo-cli --server http://127.0.0.1:8137 --data-dir /media/zebra5/zebra/.cache/lightwalletd
```

примечание: для этого потребуется полная синхронизация, как и в случае с lightwalletd. Я рекомендую использовать внешний диск, чтобы сэкономить время :)


## Запуск

Если вы запускаете их в screen, `screen -r` покажет вам каждую сессию screen, чтобы вы могли при необходимости переключаться между ними
