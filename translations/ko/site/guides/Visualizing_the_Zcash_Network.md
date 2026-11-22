<a href="https://github.com/zechub/zechub/edit/main/site/guides/Visualizing_the_Zcash_Network.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="페이지 편집"/>
</a>


#  Zcash 네트워크 시각화

다음은 Zcash용 Ziggurat 3.0 크롤러와 관련 프로그램인 Crunchy 및 P2P-Viz를 Ubuntu 22.04에서 실행하여 Zcash 네트워크 정보를 수집하고 시각화하는 방법을 안내합니다.  
아래에 링크된 동영상에서 같은 과정을 확인할 수 있습니다.

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
## 필수 구성 요소 설치:

Rust -> [https://rustup.rs/](https://rustup.rs/)

## 선택 사항:
jq -> [https://jqlang.github.io/jq/download/](https://jqlang.github.io/jq/download/)
(터미널에서 JSON 정보를 표시하는 데 사용)

curl -> [https://everything.curl.dev/install/linux.html](https://everything.curl.dev/install/linux.html)
(크롤러 RPC를 조회하는 데 사용)

npm (nvm 포함) -> [https://medium.com/@iam_vinojan/how-to-install-node-js-and-npm-using-node-version-manager-nvm-143165b16ce1](https://medium.com/@iam_vinojan/how-to-install-node-js-and-npm-using-node-version-manager-nvm-143165b16ce1)
(브라우저에서 P2P-Viz를 표시하는 데 사용)

----------------


----------------
Ziggurat 3.0 저장소 | [https://github.com/runziggurat](https://github.com/runziggurat)

크롤러 저장소 | [https://github.com/runziggurat/zcash.git](https://github.com/runziggurat/zcash.git)

Crunchy 저장소 | [https://github.com/runziggurat/crunchy.git](https://github.com/runziggurat/crunchy.git)

P2P-Viz 저장소 | [https://github.com/runziggurat/p2p-viz.git](https://github.com/runziggurat/p2p-viz.git)

----------------

먼저 일반 업데이트를 적용합니다.

>  다음 명령을 실행합니다:
```bash
sudo apt update
sudo apt upgrade
```

----------------

## Zcash 네트워크 크롤러

Zcash 크롤러는 'zcash'라는 폴더 안에 있으므로, 크롤러(runziggurat/zcash 저장소)를 복제하기 전에 새 디렉터리를 만드는 것이 좋습니다.


>  /Home 디렉터리에서 다음 명령을 실행합니다:
```bash
mkdir runziggurat
cd runziggurat
git clone https://github.com/runziggurat/zcash.git
cd zcash
```

브라우저에서 다음 주소로 이동합니다.
[https://github.com/runziggurat/zcash/blob/main/src/tools/crawler/README.md](https://github.com/runziggurat/zcash/blob/main/src/tools/crawler/README.md)

또는 다음 위치의 readme를 엽니다.
'/runziggurat/zcash/src/tools/crawler/README.md'

이 페이지에는 구체적인 사용 방법이 나와 있습니다.

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

`--seed-addrs` \ `--dns-seed`은(는) 유일한 필수 인수이며, 실행하려면 주소를 1개 이상 지정해야 합니다.



----------------

명령 'cargo run --release --features crawler --bin crawler -- --help'는 실제 실행 명령이며, 표시된 도움말 메뉴를 출력합니다.


>  다음 명령을 실행합니다.
```bash
cargo run --release --features crawler --bin crawler -- --help
```


이 명령은 프로그램을 컴파일하고 모든 것이 제대로 작동하는지 확인합니다.

크롤러를 실행하려면 시작 명령에 '--seed-addrs' 플래그를 추가하고, 유효한 Zcash 노드 IP 주소를 1개 이상 지정해야 합니다. 정확한 결과를 얻으려면 크롤러를 충분한 시간 동안 실행해야 합니다. 노드 IP 주소 예시는 [https://mainnet.zcashexplorer.app/nodes](https://mainnet.zcashexplorer.app/nodes).에서 확인할 수 있습니다.

크롤러 실행 중 정보를 확인하려면 시작 명령에 '--rpc-addr' 플래그를 추가해야 합니다. 크롤러만 실행하는 데 이 플래그가 필요한 것은 아니지만, 플래그를 지정하지 않으면 정보를 표시하려면 크롤러를 중지해야 합니다(ctrl+c 또는 SIGKILL).


>  다음 명령을 실행합니다.
```bash
cargo run --release --features crawler --bin crawler -- --seed-addrs 157.245.172.190:8233 194.135.81.61:8233 35.233.224.178:8233 --rpc-addr 127.0.0.1:54321
```

크롤러는 네트워크와 통신을 시작하고(기본적으로 20초마다) 네트워크 데이터를 수집합니다.
curl을 사용해 노드를 조회하면 크롤러의 정보를 표시할 수 있습니다(표시하려면 jq가 필요합니다).
이 예시에서 크롤러 RPC 주소는 '127.0.0.1:54321'로 설정되어 있습니다.


>  다른 터미널에서 다음 명령을 실행합니다.
```bash
curl --data-binary '{"jsonrpc": "2.0", "id":0, "method": "getmetrics", "params": [] }' -H 'content-type: application/json' http://127.0.0.1:54321/ | jq .result.protocol_versions
```

이 명령은 '.result' 필드에 포함된 현재 수집한 '.protocol_version' 데이터를 표시합니다. '.result' 필드는 매우 크므로, 필요한 특정 부분만 불러오는 것이 유용합니다. 그 밖에 유용한 데이터 유형으로는 '.num_known_nodes', '.num_good_nodes', '.user_agents' 등이 있습니다. 메트릭 섹션을 참조하세요. [여기](https://github.com/runziggurat/zcash/tree/main/src/tools/crawler#metrics)

----------------


----------------
Crunchy와 P2P-Viz를 실행하려면 '.result'를 .json 파일로 파이프해야 합니다.


>  다음 명령을 실행합니다.
```bash
curl --data-binary '{"jsonrpc": "2.0", "id":0, "method": "getmetrics", "params": [] }' -H 'content-type: application/json' http://127.0.0.1:54321/ > latest.json
```

현재 디렉터리에 'latest.json' 파일이 생성됩니다. 이 'latest.json' 파일은 Crunchy에서 사용됩니다.

이제 더 이상 데이터가 필요하지 않다면 'ctrl+c'를 눌러 크롤러를 중지할 수 있습니다. 크롤러는 유용한 정보가 담긴 보고서를 터미널에 출력합니다.


----------------

## Crunchy

P2P-Viz에서 사용하려면 출력 JSON 파일을 집계하는 데 Crunchy가 필요합니다.


Crunchy를 빌드하려면 '/runziggurat' 폴더로 이동합니다.

>  Crunchy 저장소를 복제하려면 다음 명령을 실행합니다.
```bash
git clone https://github.com/runziggurat/crunchy.git
cd crunchy
```
'latest.json' 파일을 'crunchy/testdata/' 폴더에 복사하여 붙여넣습니다.

>  다음 명령을 실행합니다.
```bash
cargo run --release -- -i testdata/latest.json -o testdata/state.json -g testdata/geoip-cache.json -f Zcash
```

이 명령은 P2P-Viz에서 사용할 Zcash 노드 필터링된 'state.json' 파일을 'crunchy/testdata/' 폴더에 생성합니다.

----------------

## P2P-Viz

P2P-Viz를 빌드하려면 npm이 필요합니다.


>  nvm으로 npm을 설치하려면 다음 명령을 실행합니다:
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
```

터미널을 닫았다가 다시 엽니다.


>  다음 명령을 실행합니다:
```bash
nvm install --lts
```

'/runziggurat' 폴더로 이동합니다.


>  P2P-Viz 저장소를 복제하고 시작하려면 다음 명령을 실행합니다.
```bash
git clone https://github.com/runziggurat/p2p-viz.git
cd p2p-viz
npm i
npm run build
npm run start http
```

----------------

브라우저에서 [http://localhost:3000](http://localhost:3000).을 엽니다.

'Geolocation'을 선택한 다음 'Choose state file'을 선택합니다.

파일 탐색기 팝업에서 'state.json' 파일을 선택합니다.

노드 탐색기의 세계 지도가 파일 데이터로 채워집니다. 사용 옵션 및 설정에 대한 자세한 내용은 readme [여기](https://github.com/runziggurat/p2p-viz#build-and-run-the-app)를 참조하세요.


----------------
팁!

'timeout' 명령을 사용하면 정해진 시간이 지난 뒤 특정 종료 명령을 실행하도록 하여 크롤러를 일정 시간 동안만 실행할 수 있습니다. 자세한 내용은 'timeout --help'를 실행하세요.
다음 명령은 크롤러를 시작하고 50분 후 자동으로 중지합니다.

>  다음 명령을 실행합니다.
```bash
timeout --signal=2 50m cargo run --release --features crawler --bin crawler -- --seed-addrs 157.245.172.190:8233 194.135.81.61:8233 35.233.224.178:8233 --rpc-addr 127.0.0.1:54321
```

----------------
팁!

'latest.json'을 불러와 '/testdata'에 기록하면 수동으로 복사하여 붙여넣을 필요가 없습니다.

----------------
팁!

출력에서 IP 주소 정보를 수집한 다음 크롤러 시작 시(--seed-addrs) 시드 주소로 사용할 수 있습니다. 이렇게 하면 전체 크롤링에 필요한 시간을 줄일 수 있습니다!
