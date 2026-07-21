# Z3: (zebrad)(zaino)(zingo-cli)

**zebrad**    : повний вузол zcash

**zaino**     : індексатор блокчейну zcash

**zingo-cli** : клієнт командного рядка zaino-proxy для zcash (підмножина Zingolib)

## Відео

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


## Загальна картина

[Архітектура системи](https://github.com/zingolabs/zaino/blob/dev/docs/zaino_live_system_architecture.pdf)


- Користувач Zcash встановлює/компілює Zingolib, що надає доступ до zingo-cli. За потреби він може надсилати/отримувати ZEC.
- Zingo-cli підключається до zaino або локально, або через захищений канал онлайн (користувача Zcash не хвилює, як саме це працює!)
- Zaino надає доступ або до zebrad, або до zcashd            
- Повністю синхронізований zebrad є джерелом істини (гаманців тут більше немає!)



## Встановлення

Щоб усе це працювало правильно, вам потрібно буде встановити 3 речі. Я також рекомендую `screen` або щось подібне для зручного керування екранами

`sudo apt install screen`

### zebrad

```
git clone https://github.com/ZcashFoundation/zebra.git
cd zebra
cargo install --git https://github.com/ZcashFoundation/zebra --tag v2.0.1 zebrad
```

 
*необов’язково* (створіть screen-сесію для zebrad)

```
screen -S zebra
zebrad start
```

примітка: це потрібно буде повністю синхронізувати! 

### zaino

```
git clone https://github.com/zingolabs/zaino.git
cd zaino
cargo build --release
PATH=$PATH:~/Desktop/zaino/target/release/
```


*необов’язково* (створіть screen-сесію для zaino)

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

*необов’язково* (створіть screen-сесію для zingo-cli)

```
screen -S zingo
./zingo-cli --server http://127.0.0.1:8137 --data-dir /media/zebra5/zebra/.cache/lightwalletd
```

примітка: це також потрібно буде повністю синхронізувати, так само, як і lightwalletd. Я рекомендую використовувати зовнішній диск, щоб заощадити час :)


## Запуск

Якщо ви запускаєте все це в screen-сесіях, `screen -r` покаже вам кожну сесію, щоб ви могли перейти до потрібної за потреби
