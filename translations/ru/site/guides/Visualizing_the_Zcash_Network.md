<a href="https://github.com/zechub/zechub/edit/main/site/guides/Visualizing_the_Zcash_Network.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Редактировать страницу"/>
</a>


#  Визуализация сети Zcash

Ниже приведено руководство по запуску Ziggurat 3.0 Crawler для Zcash, а также связанных с ним программ Crunchy и P2P-Viz на Ubuntu 22.04 для сбора и визуализации информации о сети Zcash.  
Видео по ссылке ниже показывает тот же самый процесс.

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
## Установка необходимых компонентов: 

Rust -> [https://rustup.rs/](https://rustup.rs/)

## Необязательно:
jq -> [https://jqlang.github.io/jq/download/](https://jqlang.github.io/jq/download/)
(для отображения json-информации в терминале)

curl -> [https://everything.curl.dev/get/linux](https://everything.curl.dev/get/linux)
(для запросов к RPC crawler)

npm (с nvm) -> [https://medium.com/@iam_vinojan/how-to-install-node-js-and-npm-using-node-version-manager-nvm-143165b16ce1](https://medium.com/@iam_vinojan/how-to-install-node-js-and-npm-using-node-version-manager-nvm-143165b16ce1)
(для отображения P2P-Viz в браузере)

----------------


----------------
Репозиторий Ziggurat 3.0 | [https://github.com/runziggurat](https://github.com/runziggurat)

Репозиторий Crawler | [https://github.com/runziggurat/zcash.git](https://github.com/runziggurat/zcash.git)

Репозиторий Crunchy | [https://github.com/runziggurat/crunchy.git](https://github.com/runziggurat/crunchy.git)

Репозиторий P2P-Viz | [https://github.com/runziggurat/p2p-viz.git](https://github.com/runziggurat/p2p-viz.git)

----------------

Начните с установки стандартных обновлений.

>  Выполните следующие команды:
```bash
sudo apt update
sudo apt upgrade
```

----------------

## Crawler сети Zcash

Crawler для Zcash находится внутри папки с именем 'zcash', поэтому перед клонированием crawler (репозиторий runziggurat/zcash) может быть удобно создать новую директорию.


>  Из директории /Home выполните следующие команды:
```bash
mkdir runziggurat
cd runziggurat
git clone https://github.com/runziggurat/zcash.git
cd zcash
```

Откройте в браузере 
[https://github.com/runziggurat/zcash/blob/main/src/tools/crawler/README.md](https://github.com/runziggurat/zcash/blob/main/src/tools/crawler/README.md)

Или откройте readme по адресу 
'/runziggurat/zcash/src/tools/crawler/README.md'

Эта страница содержит информацию о конкретных вариантах использования. 

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

`--seed-addrs` \ `--dns-seed` — это единственный обязательный аргумент, и для запуска в нём должен быть указан как минимум один адрес.



----------------

Команда 'cargo run --release --features crawler --bin crawler -- --help' является буквальной командой запуска и выведет показанное меню справки.


>  Выполните команду
```bash
cargo run --release --features crawler --bin crawler -- --help
```


Это скомпилирует программу и убедится, что всё работает корректно.

Чтобы запустить Crawler, необходимо добавить к команде запуска флаг '--seed-addrs', содержащий как минимум один корректный IP-адрес узла Zcash. Для получения точного результата crawler следует дать поработать достаточное количество времени. Несколько примеров IP-адресов узлов можно найти на [https://zcashblockexplorer.com/nodes](https://zcashblockexplorer.com/nodes).

Чтобы получать информацию от Crawler во время его работы, необходимо добавить к команде запуска флаг '--rpc-addr'. Это не требуется только для самого запуска crawler, но иначе для вывода какой-либо информации вообще потребуется остановить crawler (ctrl+c или SIGKILL).


>  Выполните команду
```bash
cargo run --release --features crawler --bin crawler -- --seed-addrs 157.245.172.190:8233 194.135.81.61:8233 35.233.224.178:8233 --rpc-addr 127.0.0.1:54321
```

Crawler начнёт взаимодействовать с сетью (по умолчанию каждые 20 секунд) и собирать сетевые данные. 
Информацию из Crawler можно вывести с помощью curl, отправляя запросы к узлу (для отображения этой информации требуется jq). 
В этом примере RPC-адрес Crawler установлен на '127.0.0.1:54321'


>  В другом терминале выполните команду
```bash
curl --data-binary '{"jsonrpc": "2.0", "id":0, "method": "getmetrics", "params": [] }' -H 'content-type: application/json' http://127.0.0.1:54321/ | jq .result.protocol_versions
```

Это отобразит текущие собранные данные '.protocol_version', содержащиеся в поле '.result'. Поле '.result' очень большое, поэтому полезно запрашивать отдельные его части. Другие полезные типы данных: '.num_known_nodes', '.num_good_nodes', '.user_agents' и т. д. См. раздел metrics [здесь](https://github.com/runziggurat/zcash/tree/main/src/tools/crawler#metrics)

----------------


----------------
Для запуска Crunchy и P2P-Viz необходимо перенаправить '.result' в файл .json. 


>  Выполните команду
```bash
curl --data-binary '{"jsonrpc": "2.0", "id":0, "method": "getmetrics", "params": [] }' -H 'content-type: application/json' http://127.0.0.1:54321/ > latest.json
```

Это создаст файл 'latest.json' в текущей директории. Этот файл 'latest.json' будет использоваться вместе с Crunchy. 

На этом этапе Crawler можно остановить с помощью 'ctrl+c', если дополнительные данные больше не требуются. Crawler выведет в терминал отчёт с полезной информацией.


----------------

## Crunchy

Crunchy требуется для агрегирования выходного json-файла для использования с P2P-Viz.


Чтобы собрать Crunchy, перейдите в вашу папку '/runziggurat' 

>  Чтобы клонировать репозиторий Crunchy, выполните следующие команды
```bash
git clone https://github.com/runziggurat/crunchy.git
cd crunchy
```
Скопируйте и вставьте файл 'latest.json' в папку 'crunchy/testdata/'.

>  Выполните следующие команды 
```bash
cargo run --release -- -i testdata/latest.json -o testdata/state.json -g testdata/geoip-cache.json -f Zcash
```

Это создаст отфильтрованный по узлам Zcash файл 'state.json' в папке 'crunchy/testdata/' для использования с P2P-Viz.

----------------

## P2P-Viz

Для сборки P2P-Viz требуется npm. 


>  Чтобы установить npm с помощью nvm, выполните следующие команды:
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
```

Закройте и заново откройте терминал.


>  Выполните команду:
```bash
nvm install --lts
```

перейдите в вашу папку '/runziggurat'


>  Чтобы клонировать репозиторий P2P-Viz и запустить его, выполните следующие команды
```bash
git clone https://github.com/runziggurat/p2p-viz.git
cd p2p-viz
npm i
npm run build
npm run start http
```

----------------

Откройте браузер по адресу [http://localhost:3000](http://localhost:3000). 

Выберите 'Geolocation', а затем 'Choose state file'.

Во всплывающем окне проводника файлов выберите файл 'state.json'. 

Карта мира в обозревателе узлов заполнится данными из файла. Подробности о параметрах и настройках использования см. в readme [здесь](https://github.com/runziggurat/p2p-viz#build-and-run-the-app).


----------------
СОВЕТЫ! 

Вы можете запустить Crawler с ограничением по времени с помощью команды 'timeout', которая отправит определённую команду завершения через заданный промежуток времени. Выполните 'timeout --help' для получения дополнительной информации.
Следующая команда запустит crawler и автоматически остановит его через 50 минут.

>  Выполните команду
```bash
timeout --signal=2 50m cargo run --release --features crawler --bin crawler -- --seed-addrs 157.245.172.190:8233 194.135.81.61:8233 35.233.224.178:8233 --rpc-addr 127.0.0.1:54321
```

----------------
СОВЕТЫ! 

Файл 'latest.json' можно сразу создавать и записывать в '/testdata', чтобы не копировать и не вставлять его вручную.

----------------
СОВЕТЫ! 

Информацию об IP-адресах можно получить из выходных данных и затем использовать для повторной инициализации Crawler при запуске (--seed-addrs). Это сократит время, необходимое для выполнения полного crawl!
