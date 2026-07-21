<a href="https://github.com/zechub/zechub/edit/main/site/guides/Visualizing_the_Zcash_Network.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash 네트워크 시각화

다음은 Ubuntu 22.04에서 Ziggurat 3.0 Crawler를 실행하고 관련 프로그램인 Crunchy와 P2P-Viz를 사용하여 Zcash 네트워크 정보를 수집하고 시각화하는 방법에 대한 가이드입니다.
아래 링크된 동영상은 동일한 과정을 따릅니다.

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
## 요구사항 설치:

Rust -> [https://rustup.rs/](https://rustup.rs/)

## 선택 사항:
jq -> [https://jqlang.github.io/jq/download/](https://jqlang.github.io/jq/download/)
(터미널에서 JSON 정보를 표시하기 위해)

curl -> [https://everything.curl.dev/get/linux](https://everything.curl.dev/get/linux)
(크롤러 RPC를 쿼리하기 위해)

npm (nvm과 함께) -> [https://medium.com/@iam_vinojan/how-to-install-node-js-and-npm-using-node-version-manager-nvm-143165b16ce1](https://medium.com/@iam_vinojan/how-to-install-node-js-and-npm-using-node-version-manager-nvm-143165b16ce1)
(P2P-Viz를 브라우저에서 표시하기 위해)

----------------

----------------
Ziggurat 3.0 저장소 | [https://github.com/runziggurat](https://github.com/runziggurat)

크롤러 저장소 | [https://github.com/runziggurat/zcash.git](https://github.com/runziggurat/zcash.git)

Crunchy 저장소 | [https://github.com/runziggurat/crunchy.git](https://github.com/runziggurat/crunchy.git)

P2P-Viz 저장소 | [https://github.com/runziggurat/p2p-viz.git](https://github.com/runziggurat/p2p-viz.git)

----------------

먼저 일반적인 업데이트를 적용합니다.

> 다음 명령어를 실행하십시오:
```bash
sudo apt update
sudo apt upgrade
```

----------------

## Zcash 네트워크 크롤러

Zcash 크롤러는 'zcash'라는 이름의 폴더 안에 존재하기 때문에, 크롤러(runziggurat/zcash 저장소)를 복제하기 전에 새 디렉토리를 생성하는 것이 좋습니다.

> /Home 디렉토리에서 다음 명령어를 실행하십시오:
```bash
mkdir runziggurat
cd runziggurat
git clone https://github.com/runziggurat/zcash.git
cd zcash
```

브라우저에서 이동하여 
[https://github.com/runziggurat/zcash/blob/main/src/tools/crawler/README.md](https://github.com/runziggurat/zcash/blob/main/src/tools/crawler/README.md)

또는 readme를 열고 
'/runziggurat/zcash/src/tools/crawler/README.md'

이 페이지에는 특정 사용법에 대한 정보가 포함되어 있습니다.

----------------

```bash
$ cargo run --release --features crawler --bin crawler -- --help

OPTIONS:
    -c, --crawl-interval <CRAWL_INTERVAL>
            주요 크롤링 루프 간격(초 단위) [기본값: 5]

    -h, --help
            도움 정보 출력

    -r, --rpc-addr <RPC_ADDR>
            지정된 주소에서 RPC 서버를 시작합니다.

    -s, --seed-addrs <SEED_ADDRS>...
            연결할 초기 독립 IP 주소 및/또는 DNS 서버 목록

    -n, --node-listening-port <NODE_LISTENING_PORT>
            노드에 연결하는 데 사용되는 기본 포트 [기본값: 8233]

    -V, --version
            버전 정보 출력
```

`--seed-addrs` \ `--dns-seed`는 유일하게 필요한 인수이며 실행하려면 적어도 하나의 지정된 주소가 필요합니다.

----------------

명령어 'cargo run --release --features crawler --bin crawler -- --help'는 리터럴 실행 명령이며, 표시되는 도움 메뉴를 출력합니다.

> 다음 명령을 실행하십시오:
```bash
cargo run --release --features crawler --bin crawler -- --help
```

이 명령은 프로그램을 컴파일하고 모든 것이 정상적으로 작동하는지 확인합니다.

크롤러를 실행하려면 시작 명령에 '--seed-addrs' 플래그를 추가해야 하며, 이 플래그는 적어도 하나의 유효한 Zcash 노드 IP 주소를 포함해야 합니다. 크롤러가 충분히 오랜 시간 동안 실행되어야 정확한 결과를 얻을 수 있습니다. 일부 샘플 노드 IP 주소는 [https://zcashblockexplorer.com/nodes](https://zcashblockexplorer.com/nodes)에서 찾을 수 있습니다.

크롤러가 실행 중일 때 정보를 가져오려면 시작 명령에 '--rpc-addr' 플래그를 추가해야 합니다. 크롤러 자체만 실행하려는 경우 이 플래그는 필수적이지 않지만, 아무 정보도 표시하려면 크롤러를 중단해야 합니다 (ctrl+c 또는 SIGKILL).

> 다음 명령을 실행하십시오:
```bash
cargo run --release --features crawler --bin crawler -- --seed-addrs 157.245.172.190:8233 194.135.81.61:8233 35.233.224.178:8233 --rpc-addr 127.0.0.1:54321
```

크롤러는 네트워크와 통신(기본값은 20초 간격)하여 네트워크 데이터를 수집합니다.
크롤러에서 정보를 표시하려면 curl을 사용하여 노드에 쿼리해야 합니다 (이 작업에는 jq가 필요합니다). 이 예제의 크롤러 RPC 주소는 '127.0.0.1:54321'로 설정되어 있습니다.

> 다른 터미널에서 다음 명령을 실행하십시오:
```bash
curl --data-binary '{"jsonrpc": "2.0", "id":0, "method": "getmetrics", "params": [] }' -H 'content-type: application/json' http://127.0.0.1:54321/ | jq .result.protocol_versions
```

이 명령은 '.result' 필드에 포함된 현재 수집된 '.protocol_version' 데이터를 표시합니다. '.result' 필드는 매우 크기 때문에 특정 부분만 호출하는 것이 유용합니다. 다른 유용한 데이터 유형에는 '.num_known_nodes', '.num_good_nodes', '.user_agents' 등이 있습니다. 메트릭 섹션은 여기에서 확인할 수 있습니다 [Here](https://github.com/runziggurat/zcash/tree/main/src/tools/crawler#metrics)

----------------

----------------
Crunchy와 P2P-Viz를 실행하려면 '.result'를 .json 파일로 파이프해야 합니다.

> 다음 명령을 실행하십시오:
```bash
curl --data-binary '{"jsonrpc": "2.0", "id":0, "method": "getmetrics", "params": [] }' -H 'content-type: application/json' http://127.0.0.1:54321/ > latest.json
```

이 명령은 현재 디렉토리에 'latest.json' 파일을 생성합니다. 이 'latest.json' 파일은 Crunchy와 함께 사용됩니다.

이 시점에서 더 이상 데이터가 필요하지 않다면, 크롤러를 'ctrl+c'로 중지할 수 있습니다. 크롤러는 유용한 정보의 보고서를 터미널에 출력합니다.

----------------

## Crunchy

Crunchy는 P2P-Viz와 함께 사용하기 위해 출력 JSON 파일을 집계하는 데 필요합니다.

Crunchy를 빌드하려면 '/runziggurat' 폴더로 이동해야 합니다.

> Crunchy 저장소에 복제하려면 다음 명령어를 실행하십시오:
```bash
git clone https://github.com/runziggurat/crunchy.git
cd crunchy
```

'latest.json' 파일을 'crunchy/testdata/' 폴더로 복사하고 붙여넣으세요.

> 다음 명령을 실행하십시오:
```bash
cargo run --release -- -i testdata/latest.json -o testdata/state.json -g testdata/geoip-cache.json -f Zcash
```

이 명령은 'crunchy/testdata/' 폴더에 P2P-Viz와 함께 사용할 수 있는 Zcash 노드 필터된 'state.json' 파일을 생성합니다.

----------------

## P2P-Viz

P2P-Viz를 빌드하려면 npm이 필요합니다.

> nvm으로 npm을 설치하려면 다음 명령을 실행하십시오:
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
```

터미널을 닫고 다시 열어야 합니다.

> 다음 명령을 실행하십시오:
```bash
nvm install --lts
```

'/runziggurat' 폴더로 이동합니다.

> P2P-Viz 저장소에 복제하고 시작하려면 다음 명령을 실행하십시오:
```bash
git clone https://github.com/runziggurat/p2p-viz.git
cd p2p-viz
npm i
npm run build
npm run start http
```

----------------

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열고.

'Geolocation'을 선택한 후 'Choose state file'을 선택합니다.

파일 탐색기 팝업에서 'state.json' 파일을 선택합니다.

노드 탐색 세계 지도는 파일 데이터로 채워집니다. 사용 옵션 및 설정에 대한 자세한 내용은 여기에서 readme를 참조하십시오 [Here](https://github.com/runziggurat/p2p-viz#build-and-run-the-app).

----------------
팁!

'timeout' 명령을 사용하여 크롤러가 특정 시간 간격으로 작동하도록 설정할 수 있습니다. 이는 설정된 시간이 지나면 특정 종료 명령을 내립니다. 더 많은 정보를 얻으려면 'timeout --help'를 실행하십시오.
다음 명령은 50분 후 크롤러가 자동으로 시작되고 중지됩니다.

> 다음 명령을 실행하십시오:
```bash
timeout --signal=2 50m cargo run --release --features crawler --bin crawler -- --seed-addrs 157.245.172.190:8233 194.135.81.61:8233 35.233.224.178:8233 --rpc-addr 127.0.0.1:54321
```

----------------
팁!

'latest.json'은 '/testdata'에 자동으로 호출되고 쓰여질 수 있으므로, 수동으로 복사하고 붙여넣을 필요가 없습니다.

----------------
팁!

출력에서 IP 주소 정보를 수집하여 크롤러 시작 시 (--seed-addrs) 다시 시드할 수 있습니다. 이는 전체 크롤링에 필요한 시간을 줄일 수 있습니다!
