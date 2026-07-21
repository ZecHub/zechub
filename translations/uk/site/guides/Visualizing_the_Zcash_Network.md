<a href="https://github.com/zechub/zechub/edit/main/site/guides/Visualizing_the_Zcash_Network.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


#  Візуалізація мережі Zcash

Нижче наведено посібник про те, як запустити Crawler Ziggurat 3.0 для Zcash, а також пов’язані програми Crunchy і P2P-Viz на Ubuntu 22.04 для збору та візуалізації інформації про мережу Zcash.  
Відео за посиланням нижче демонструє той самий процес.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/Nq5cLiAHxPI"
    title="ziggurat 3.0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
    
----------------
## Встановлення вимог: 

Rust -> [https://rustup.rs/](https://rustup.rs/)

## Необов’язково:
jq -> [https://jqlang.github.io/jq/download/](https://jqlang.github.io/jq/download/)
(для відображення json-інформації в терміналі)

curl -> [https://everything.curl.dev/get/linux](https://everything.curl.dev/get/linux)
(для запитів до RPC Crawler)

npm (з nvm) -> [https://medium.com/@iam_vinojan/how-to-install-node-js-and-npm-using-node-version-manager-nvm-143165b16ce1](https://medium.com/@iam_vinojan/how-to-install-node-js-and-npm-using-node-version-manager-nvm-143165b16ce1)
(для відображення P2P-Viz у браузері)

----------------


----------------
Репозиторій Ziggurat 3.0 | [https://github.com/runziggurat](https://github.com/runziggurat)

Репозиторій Crawler | [https://github.com/runziggurat/zcash.git](https://github.com/runziggurat/zcash.git)

Репозиторій Crunchy | [https://github.com/runziggurat/crunchy.git](https://github.com/runziggurat/crunchy.git)

Репозиторій P2P-Viz | [https://github.com/runziggurat/p2p-viz.git](https://github.com/runziggurat/p2p-viz.git)

----------------

Почніть із застосування звичайних оновлень.

>  Виконайте такі команди:
```bash
sudo apt update
sudo apt upgrade
```

----------------

## Crawler мережі Zcash

Crawler для Zcash знаходиться всередині папки з назвою 'zcash', тому перед клонуванням Crawler (репозиторію runziggurat/zcash) може бути доцільно створити новий каталог.


>  Із каталогу /Home виконайте такі команди:
```bash
mkdir runziggurat
cd runziggurat
git clone https://github.com/runziggurat/zcash.git
cd zcash
```

Перейдіть у браузері до 
[https://github.com/runziggurat/zcash/blob/main/src/tools/crawler/README.md](https://github.com/runziggurat/zcash/blob/main/src/tools/crawler/README.md)

Або відкрийте readme за адресою 
'/runziggurat/zcash/src/tools/crawler/README.md'

Ця сторінка містить інформацію щодо конкретного використання. 

----------------


```bash
$ cargo run --release --features crawler --bin crawler -- --help

OPTIONS:
    -c, --crawl-interval <CRAWL_INTERVAL>
            The main crawling loop interval in seconds [default: 5]

    -h, --help
            Print help information

    -r, --rpc-addr <RPC_ADDR>
            If present, start an RPC server at the specified address

    -s, --seed-addrs <SEED_ADDRS>...
            A list of initial standalone IP addresses and/or DNS servers to connect to

    -n, --node-listening-port <NODE_LISTENING_PORT>
            Default port used for connecting to the nodes [default: 8233]

    -V, --version
            Print version information
```

`--seed-addrs` \ `--dns-seed` — це єдиний обов’язковий аргумент, і для запуску потрібно вказати щонайменше одну адресу.



----------------

Команда 'cargo run --release --features crawler --bin crawler -- --help' є буквальною командою запуску й виведе показане меню довідки.


>  Виконайте команду
```bash
cargo run --release --features crawler --bin crawler -- --help
```


Це скомпілює програму й переконається, що все працює належним чином.

Щоб запустити Crawler, потрібно додати прапорець '--seed-addrs' до команди запуску, вказавши щонайменше одну дійсну IP-адресу вузла Zcash. Щоб отримати точний результат, Crawler слід дати попрацювати достатній проміжок часу. Деякі приклади IP-адрес вузлів можна знайти на [https://zcashblockexplorer.com/nodes](https://zcashblockexplorer.com/nodes).

Щоб отримувати інформацію від Crawler під час його роботи, потрібно додати прапорець '--rpc-addr' до команди запуску. Це не обов’язково лише для самого запуску Crawler, але інакше для відображення будь-якої інформації доведеться зупинити Crawler (ctrl+c або SIGKILL).


>  Виконайте команду
```bash
cargo run --release --features crawler --bin crawler -- --seed-addrs 157.245.172.190:8233 194.135.81.61:8233 35.233.224.178:8233 --rpc-addr 127.0.0.1:54321
```

Crawler почне взаємодіяти з мережею (типово кожні 20 секунд) і збирати дані мережі. 
Інформацію від Crawler можна відобразити, використовуючи curl для запиту до вузла (для відображення цієї інформації потрібен jq). 
У цьому прикладі RPC-адресу Crawler встановлено як '127.0.0.1:54321'


>  В іншому терміналі виконайте команду
```bash
curl --data-binary '{"jsonrpc": "2.0", "id":0, "method": "getmetrics", "params": [] }' -H 'content-type: application/json' http://127.0.0.1:54321/ | jq .result.protocol_versions
```

Це відобразить поточні зібрані дані '.protocol_version', що містяться в полі '.result'. Поле '.result' дуже велике, тому корисно викликати натомість окремі його частини. Інші корисні типи даних — це '.num_known_nodes', '.num_good_nodes', '.user_agents' тощо. Дивіться розділ метрик [Тут](https://github.com/runziggurat/zcash/tree/main/src/tools/crawler#metrics)

----------------


----------------
Щоб запустити Crunchy і P2P-Viz, потрібно перенаправити '.result' у файл .json. 


>  Виконайте команду
```bash
curl --data-binary '{"jsonrpc": "2.0", "id":0, "method": "getmetrics", "params": [] }' -H 'content-type: application/json' http://127.0.0.1:54321/ > latest.json
```

Це створить файл 'latest.json' у поточному каталозі. Цей файл 'latest.json' буде використано з Crunchy. 

На цьому етапі Crawler можна зупинити за допомогою 'ctrl+c', якщо більше не потрібні додаткові дані. Crawler виведе в термінал звіт із корисною інформацією.


----------------

## Crunchy

Crunchy потрібен для агрегування вихідного json-файлу для використання з P2P-Viz.


Щоб зібрати Crunchy, перейдіть до вашої папки '/runziggurat' 

>  Щоб клонувати репозиторій Crunchy, виконайте такі команди
```bash
git clone https://github.com/runziggurat/crunchy.git
cd crunchy
```
Скопіюйте й вставте файл 'latest.json' до папки 'crunchy/testdata/'.

>  Виконайте такі команди 
```bash
cargo run --release -- -i testdata/latest.json -o testdata/state.json -g testdata/geoip-cache.json -f Zcash
```

Це створить відфільтрований за вузлами Zcash файл 'state.json' у папці 'crunchy/testdata/' для використання з P2P-Viz.

----------------

## P2P-Viz

Щоб зібрати P2P-Viz, потрібен npm. 


>  Щоб встановити npm за допомогою nvm, виконайте такі команди:
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
```

Закрийте термінал і запустіть його знову.


>  Виконайте команду:
```bash
nvm install --lts
```

перейдіть до вашої папки '/runziggurat'


>  Щоб клонувати репозиторій P2P-Viz і запустити його, виконайте такі команди
```bash
git clone https://github.com/runziggurat/p2p-viz.git
cd p2p-viz
npm i
npm run build
npm run start http
```

----------------

Відкрийте браузер за адресою [http://localhost:3000](http://localhost:3000). 

Виберіть 'Geolocation', а потім виберіть 'Choose state file'.

У спливаючому вікні файлового провідника виберіть файл 'state.json'. 

Карта світу в провіднику вузлів заповниться даними з файлу. Докладніше про параметри використання та налаштування дивіться у readme [Тут](https://github.com/runziggurat/p2p-viz#build-and-run-the-app).


----------------
ПОРАДИ! 

Ви можете налаштувати Crawler на обхід за таймером просто за допомогою команди 'timeout', яка надішле певну команду завершення після заданого проміжку часу. Виконайте 'timeout --help' для отримання додаткової інформації.
Наступна команда запустить Crawler і також автоматично зупинить його через 50 хвилин.

>  Виконайте команду
```bash
timeout --signal=2 50m cargo run --release --features crawler --bin crawler -- --seed-addrs 157.245.172.190:8233 194.135.81.61:8233 35.233.224.178:8233 --rpc-addr 127.0.0.1:54321
```

----------------
ПОРАДИ! 

Файл 'latest.json' можна викликати й записати безпосередньо в '/testdata', щоб вам не довелося копіювати та вставляти його вручну.

----------------
ПОРАДИ! 

Інформацію про IP-адреси можна зібрати з вихідних даних, а потім використати для повторного засівання Crawler під час запуску (--seed-addrs). Це зменшить час, потрібний для виконання повного обходу!
