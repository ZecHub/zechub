<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zcash_Stack.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="페이지 편집"/>
</a>

# Zcash Stack: Kubernetes 또는 Docker에서 라이트 지갑 서버 실행하기

[Zcash Stack](https://github.com/zecrocks/zcash-stack)은 zec.rocks 팀이 만든 오픈 소스 배포 키트입니다. Zcash 풀 노드, 라이트 지갑 서버와 선택 기능(Zaino, 블록 탐색기, Tor 히든 서비스, DNS 시더, zecd, 브라우저 지갑용 gRPC-web 프록시)을 패키징해 Kubernetes용 Helm 차트와 Docker Compose 파일로 제공합니다. zec.rocks lightwalletd 서버는 모두 이 차트에서 실행됩니다. 이 프로젝트는 [Zcash Community Grants](https://zcashcommunitygrants.org/)의 지원을 받습니다.

이 페이지에서는 키트가 배포하는 구성 요소, 설치 전에 준비해야 할 사항, 그리고 가장 중요한 설정을 요약합니다. 2026년 11월 13일에 출시된 차트 버전 **0.4.9**를 기준으로 합니다. 프로젝트의 [차트 README](https://github.com/zecrocks/zcash-stack/blob/main/charts/zcash-stack/README.md)와 [워크숍 메모](https://github.com/zecrocks/zcash-stack/tree/main/docs)가 참고 자료입니다. 운영 환경에서 실행하기 전에 먼저 읽어 보세요.

## 요약

- **두 가지 배포 방식.** Kubernetes용 Helm 차트(자체 NVMe 하드웨어에서 실행하는 k3s가 주요 대상이며, GKE Standard와 Autopilot도 지원)와 단일 머신용 Docker Compose 파일을 제공합니다. 서버 운영이 처음이라면 워크숍에서는 Docker을, 이미 서버 팜을 운영 중이라면 Kubernetes을 권장합니다.
- **체인 노드 1개와 라이트 지갑 서버.** 권장 구성은 Zebra + lightwalletd입니다. 백엔드로 Zakura을 사용하면 Zebra을 대체할 수 있고, Zaino는 lightwalletd를 대체하거나 함께 실행할 수 있습니다.
- **디스크 공간은 약 600 GiB를 준비하세요.** Zebra의 체인 상태는 2026년 6월 기준 약 260 GiB였으며 계속 증가하고 있습니다. 라이트 지갑 캐시에는 약 17 GiB가 추가로 필요합니다. 전체 동기화에는 며칠이 걸리므로 차트에서 공개 스냅샷을 복원할 수도 있습니다.
- **차트는 이미지 버전을 고정합니다.** 0.4.9에서는 Zebra 7.0.0(NU7를 따름), lightwalletd v0.6.1, Zakura 1.8.6, Zaino 0.8.0을 사용합니다. 네트워크 업그레이드 전에, 그리고 Zakura 릴리스가 지원 종료 블록 높이에 도달하기 전에 차트를 업데이트하세요.
- **서버를 등록하세요.** 공개 서버 운영자는 [hosh.zec.rocks](https://hosh.zec.rocks/zec) 모니터에 서버를 등록해 지갑과 사용자가 서버의 가동 여부를 확인할 수 있도록 할 수 있습니다.

## 배포되는 구성 요소

각 구성 요소는 차트의 [`values.yaml`](https://github.com/zecrocks/zcash-stack/blob/main/charts/zcash-stack/values.yaml)에서 켜고 끌 수 있습니다. 기본으로 켜져 있는 구성 요소는 lightwalletd뿐이며, 이 구성 요소에는 체인 노드가 필요합니다. 따라서 예제 파일에서는 Zebra도 켭니다.

| 구성 요소 | 차트 0.4.9의 이미지 | 기본값 | 기능 |
|:--|:--|:--|:--|
| Zebra | `zfnd/zebra:7.0.0` | 꺼짐 (예제에서는 켜짐) | 풀 노드. 체인을 검증하고 다른 모든 구성 요소에 RPC를 제공합니다 |
| Zakura | `zakuracore/zakura:1.8.6` | 꺼짐 | Zebra 포크. Zebra 대신 lightwalletd 또는 Zaino의 대체 백엔드로 사용할 수 있습니다 |
| lightwalletd | `electriccoinco/lightwalletd:v0.6.1` | 켜짐 | 모바일 및 데스크톱 지갑용 라이트 지갑 서버(gRPC) |
| Zaino | `zingodevops/zaino:0.8.0-no-tls` | 꺼짐 | 라이트 지갑에도 서비스를 제공하는 Rust 인덱서 |
| 블록 탐색기 | `emersonian/zcash-explorer:v0.0.6` | 꺼짐 | 노드의 JSON-RPC를 읽는 웹 탐색기(Zaino는 gRPC만 제공하므로 백엔드로 사용할 수 없음) |
| Tor | `osminogin/tor-simple:0.4.9.16` | 꺼짐 | lightwalletd 또는 Zaino을 `.onion` 서비스로 공개합니다 |
| DNS 시더 | `zfnd/dnsseeder:v1.8.0` | 꺼짐 | 새 노드가 피어를 찾도록 돕습니다 |
| zecd | `ghcr.io/zecrocks/zecd:0.6.3` | 꺼짐 | 거래정보 보호를 우선하는 지갑 서버입니다([zecd](/zcash-tech/zecd) 참고) |
| gRPC-web 프록시 | `envoyproxy/envoy:v1.40.2` | 꺼짐 | 브라우저에서는 일반 gRPC로 접속할 수 없는 lightwalletd와 브라우저 지갑을 연결합니다 |
| WebZjs 지갑 | `ghcr.io/zecrocks/webzjs-wallet` | 꺼짐 | 브라우저 지갑입니다. 같은 호스트에서 gRPC-web 프록시를 켜야 합니다 |

버전에 관한 참고 사항이 2가지 있습니다. Zaino의 최신 버전은 [0.10.1](https://github.com/zingolabs/zaino/releases)이지만, 차트에는 여전히 0.8.0 이미지가 포함되어 있습니다. 따라서 최신 Zaino 동작을 기대하기 전에 `values.yaml`를 확인하세요. 또한 Zakura 노드는 릴리스별 지원 종료 블록 높이에 도달하면 Mainnet에서 작동을 멈춥니다. 1.8.6의 경우 블록 높이 3,643,309로, 2026년 12월 5일경입니다. 1.8.0 이후의 x86-64 빌드는 BMI2와 ADX가 없는 CPU에서 시작되지 않습니다. 두 사항 모두 [Zakura Node](/zcash-tech/zakura-node) 페이지에서 다룹니다.

## Kubernetes: 설치 전 준비 사항

차트를 배포하려면 클러스터마다 한 번씩 다음 3가지를 설정해야 합니다.

1. **인그레스 컨트롤러.** 차트는 표준 Kubernetes `Ingress`를 만들며 기본적으로 `nginx` 클래스를 사용합니다. k3s와 GKE에서 gRPC를 동일한 방식으로 처리하는 ingress-nginx를 권장합니다. k3s에서는 `--disable traefik`을 사용해 k3s를 설치하거나, Traefik를 유지하면서 `ingress.className: traefik`와 `ingress.backendProtocol: GRPC`을 설정하세요. 이 경우 차트는 Traefik `IngressRoute`를 생성합니다. 일반 Ingress를 Traefik로 통과시키면 gRPC에서 HTTP 500 오류가 반환되기 때문입니다. GKE에서는 기본 제공되는 `gce` 인그레스 클래스로 lightwalletd 또는 Zaino에 gRPC를 전달할 수 없습니다.
2. **cert-manager와 ClusterIssuer.** Let's Encrypt 인증서를 자동으로 발급받으려면 필요합니다(`examples/cluster-issuer.yaml`; 먼저 스테이징 발급자를 대상으로 테스트하세요). GKE Autopilot에서는 `--set global.leaderElection.namespace=cert-manager`을 사용해 cert-manager를 설치하세요. 그렇지 않으면 발급자 생성 시 x509 “알 수 없는 인증 기관” 오류가 발생합니다. cert-manager를 사용하지 않고 `<service>.ingress.tls.secretName`에 자체 인증서를 지정해도 됩니다.
3. **StorageClass.** NVMe를 사용하는 k3s에서는 `local-path`이면 충분합니다. GKE에서는 Zebra에 프로비저닝된 IOPS 클래스를 지정하세요(저장소에 Hyperdisk 예제가 있습니다). 먼저 리전별 디스크 할당량도 늘려야 합니다. 새 GKE 프로젝트에는 리전당 SSD 500 GB와 Hyperdisk 500 GB만 허용되지만, 체인 노드에는 300~500 GB가 필요하므로 할당량을 늘리지 않으면 볼륨이 `Pending` 상태에서 `QUOTA_EXCEEDED`와 함께 멈춥니다. 기존 StatefulSet의 `storageClassName`은 볼륨을 다시 만들지 않고는 변경할 수 없습니다.

그런 다음 각 호스트 이름의 DNS 레코드가 인그레스 컨트롤러의 외부 IP를 가리키도록 설정하세요. 아직 DNS가 없다면 실제 호스트 이름과 함께 [sslip.io](https://sslip.io) 이름(예: `203-0-113-7.sslip.io`)을 등록하세요. 이 이름은 내장된 IP 주소로 해석되므로 인증서를 바로 발급받을 수 있습니다. 상시 운영하는 서버에는 실제 호스트 이름을 기본 이름으로 사용하세요.

## Kubernetes: 설치

```bash
helm repo add zcash https://zecrocks.github.io/zcash-stack
helm repo update
# copy an example from the repo's examples/ folder, set your hostnames and RPC credentials, then:
helm install zcash zcash/zcash-stack -f examples/zebra-mainnet.yaml
```

[`zebra-mainnet.yaml`](https://github.com/zecrocks/zcash-stack/blob/main/examples/zebra-mainnet.yaml) 예제는 Zebra을 켜고, lightwalletd를 여기에 연결하며, lightwalletd에 40 GiB 캐시와 TLS 인그레스를 설정합니다. 노드의 RPC는 클러스터 내부에만 둡니다. 설치 전에 예제의 RPC 사용자 이름과 비밀번호를 변경하세요. 다른 예제에는 테스트넷, GKE, 고가용성 구성의 GKE Autopilot, Tor 히든 서비스, sslip.io 초기 설정이 포함되어 있습니다.

업그레이드하려면 `helm repo update`을 실행하고, helm-diff 플러그인(`helm diff upgrade zcash zcash/zcash-stack -f values.yaml`)으로 변경 사항을 미리 확인한 다음 동일한 인수를 사용해 `helm upgrade`을 실행하세요. 0.0.x 차트에서 업그레이드하는 경우 먼저 [MIGRATION.md](https://github.com/zecrocks/zcash-stack/blob/main/charts/zcash-stack/MIGRATION.md)를 읽으세요. 0.1.0에서는 기존 Traefik 설정을 표준 Ingress와 cert-manager로 교체했고, values 구성이 변경되었습니다.

## 용량 계획

| | 상시 운영 | 초기 동기화 | 디스크 |
|:--|:--|:--|:--|
| Zebra | 약 0.1 vCPU, 1.6 GiB | CPU, IOPS 및 메모리 사용량이 많음 | 약 260 GiB(2026년 6월 기준)이며 계속 증가 중. 차트 기본값은 500 GiB |
| lightwalletd | 약 0.15 vCPU, 165 MiB | 블록 단위로 캐시 생성 | 약 17 GiB. 차트 기본값은 40 GiB |

전체 스택은 약 1.5 vCPU와 4.5 GiB 메모리를 요청합니다. 단일 머신의 경우 차트는 8 vCPU, RAM 32 GiB, NVMe 약 1 TB를 권장합니다(GKE에서는 Hyperdisk 또는 pd-ssd 볼륨 500 GiB를 사용하는 `n2-standard-8`). 기본 요청량은 GKE Autopilot의 최소 요구 사항을 이미 충족하며, 동기화 중 부하가 급증할 수 있도록 CPU 제한은 설정하지 않습니다.

## 알아 두면 좋은 설정

**스냅샷 복원.** `<chain>.initSnapshot.enabled: true`을 설정하고 `initSnapshot.url`, `gs://` 또는 `https://`을 지정하면 제네시스 블록부터 동기화하는 대신 공개 스냅샷에서 시작할 수 있습니다. 복원 과정은 진행 상태를 표시하고, 중단된 다운로드를 깔끔하게 다시 시작하며, 이전 설치에서 정상적으로 사용 중인 볼륨은 절대 초기화하지 않습니다. 스냅샷은 신뢰를 전제로 시간을 절약하는 방법입니다. 스냅샷 이후의 블록은 계속 검증되며, 잘못된 스냅샷은 검증에 실패하는 블록으로 드러납니다. 워크숍에 따르면 처음부터 동기화하면 약 10일, 스냅샷으로 시작하면 약 10시간이 걸립니다.

**스케일링과 무중단 운영.** lightwalletd과 Zaino는 노드 앞단에 위치한 경량 캐시이므로, 중단 없이 롤링 업데이트를 하려면 `replicas: 2`을 실행하세요(복제본이 1개를 초과하면 PodDisruptionBudget가 자동으로 추가됩니다). 체인 노드는 부하 분산용이 아닙니다. 복제본마다 별도의 볼륨을 사용하는 풀 노드가 추가되고 각자 동기화해야 하므로 1개만 실행하거나, 이중화를 위해 2개를 실행하세요.

**인바운드 피어.** 기본적으로 Zebra는 아웃바운드 연결만 만듭니다. `zebra.p2pPublic.enabled: true`은 포트 8233(테스트넷에서는 18233)에서 인바운드 피어를 받고 주소를 알립니다. 베어메탈과 k3s에서는 `externalAddrFrom: hostIP`을, 노드 자체 IP가 사설 IP인 클라우드에서는 `nodeExternalIP`을, GKE Autopilot에서 예약된 고정 IP를 사용할 때는 `loadBalancer`를 선택하세요.

**TLS와 gRPC.** TLS는 인그레스에서 종료되고 클러스터 내부에서는 일반 HTTP/2가 실행되므로 여러 호스트 이름이 하나의 lightwalletd을 가리킬 수 있습니다. gRPC 메서드 경로에 필요하므로 `path: /`에 `pathType: Prefix`를 설정하세요. HTTPS 리디렉션 때문에 첫 인증서 발급에 실패하면 스테이징 발급자를 사용하거나 일시적으로 `ingress.tls.sslRedirect: "false"`을 설정하세요.

**Tor 히든 서비스.** 클러스터에 공개 IP나 도메인이 없을 때 유용합니다.

```yaml
tor:
  enabled: true
  targetService: zaino   # or lightwalletd
  hiddenServicePort: 443
```

`kubectl exec -it tor-0 -- cat /var/lib/tor/hidden_service/hostname`으로 주소를 확인한 다음, 로컬 Tor 클라이언트에서 [zecping](https://github.com/zecrocks/zecping)을 사용해 테스트하세요. `./zecping -socks localhost:9150 -addr <address>.onion:443`.

**네트워크 업그레이드 전후.** Zebra는 이전 버전을 사용하는 피어를 차단할 수 있으며, 체인 업데이트가 중단되었다는 로그를 남기고 멈출 수 있습니다. 차단 목록은 메모리에 저장되므로 `kubectl delete pod zebra-0`을 실행하면 초기화됩니다. 파드는 동일한 체인 데이터로 다시 시작되며 재동기화하지 않습니다.

## Docker Compose

단일 머신에서는 저장소를 복제한 다음 `docker/` 폴더에서 기본 파일을 실행하세요.

```bash
git clone https://github.com/zecrocks/zcash-stack.git
cd zcash-stack/docker
docker compose up --detach
docker compose logs --follow
```

`compose.yaml`은 x86에서 Zebra, lightwalletd, [Watchtower](https://containrrr.dev/watchtower/)를 실행하고, `compose.arm.yaml`는 ARM 호스트에서 동일한 구성을 실행합니다. Watchtower는 새 이미지를 자동으로 가져오며, 기본 파일은 `zfnd/zebra:latest` 태그를 사용합니다. 따라서 노드는 수동으로 업그레이드하지 않아도 새로운 Zebra 릴리스를 따릅니다. `compose.zaino.yaml`는 lightwalletd을 Zaino로 바꾸지만 오래된 커뮤니티 이미지를 고정해 사용하므로(`emersonian/zcash-zaino:0.1.2-zr4`), 사용하기 전에 확인하세요. 다른 파일에는 Caddy TLS 프런트엔드, VPS 프록시, 집에 있는 노드용 autossh 터널이 추가됩니다.

`.env` 파일에서 `LIGHTWALLETD_DONATION_ADDRESS`를 자신의 통합 주소로 설정하면 해당 주소를 서버의 기부 주소로 공개할 수 있습니다. 첫 번째 `docker compose up` 전에 `docker/` 폴더에서 `./download-snapshot.sh`을 실행하면 처음부터 동기화하는 대신 체인 스냅샷을 다운로드합니다.

## 연결 및 모니터링

워크숍의 두 번째 수업에서는 서버를 외부에 공개하는 방법을 다룹니다. 공개 고정 IP 사용, SSH 터널을 통해 VPS나 Tailscale Funnel 뒤에 집의 IP를 숨기는 방법, 또는 Tor 전용 서버를 사용하는 방법입니다. 지갑에서 서버를 지정해 결과를 테스트하거나(ZODL의 고급 설정, [지갑에서 서버 변경](/zcash-tech/lightwallet-nodes) 참고), gRPC 클라이언트로 `GetLightdInfo`을 호출해 보세요.

모니터링을 다루는 세 번째 수업에서는 수동 Docker 명령을 소개하고, 공개 서버를 [hosh](https://hosh.zec.rocks/zec), 즉 zec.rocks 가동 시간 모니터에 등록하도록 권장합니다. 서버를 등록하려면 호스트 이름과 포트를 hosh 서버 목록에 추가하는 풀 리퀘스트를 제출해야 합니다. 각 단계에 대한 도움은 [zec.rocks 워크숍 포럼](https://workshops.zec.rocks)에서 받을 수 있습니다.

## 흔히 하는 실수

**체인 노드 없이 lightwalletd 설치하기.** lightwalletd는 Zebra(또는 Zakura)에서 데이터를 읽습니다. 둘 중 하나를 켜거나, 해당 구성이 이미 켜진 예제 파일로 시작하세요.

**예제 RPC 인증 정보를 그대로 두기.** 예제에는 자리표시자 값이 들어 있습니다. RPC가 클러스터 내부에서만 사용되더라도 반드시 변경하세요.

**GKE의 기본 디스크 할당량으로 체인 노드 실행하기.** 볼륨이 바인딩되지 않습니다. 설치 전에 리전별 할당량을 늘리세요.

**부하를 처리하려고 Zebra 스케일링하기.** Zebra 복제본을 추가할 때마다 풀 노드가 하나씩 추가되어 전체 동기화를 수행합니다. 대신 lightwalletd 또는 Zaino를 스케일링하세요.

**네트워크 업그레이드 중 오래된 차트 고정하기.** 업그레이드 전에 출시된 노드는 업그레이드 후 Mainnet을 계속 따라가지 못합니다(NU7 이후에는 Zebra 7.0.0 이상이 필요합니다). `helm repo update`을 실행하고 활성화 블록 높이와 Zakura 지원 종료 블록 높이에 도달하기 전에 차트를 업그레이드하세요.

## 관련 페이지

- [Zcash 라이트 지갑 노드](/zcash-tech/lightwallet-nodes): 라이트 지갑 서버가 볼 수 있는 정보와 볼 수 없는 정보, 공개 서버에 대해 알아봅니다.
- [Zebra 풀 노드](/zcash-tech/zebra-full-node): 이 스택에서 실행하는 검증자입니다.
- [Zakura 노드](/zcash-tech/zakura-node): 차트에서 실행할 수 있는 Zebra 포크입니다.
- [Zaino](/zcash-tech/zaino): Rust 인덱서입니다.
- [zecd](/zcash-tech/zecd): 차트에 추가할 수 있는 지갑 서버입니다.
- [Zcash 노드 RPC 및 인덱싱](/guides/zcash-node-rpc-and-indexing): Zebra RPC, Zallet 및 인덱서에 대해 알아봅니다.
- [Zebra을 Akash 네트워크에서 실행하는 방법](/guides/akash-network-zebra): 노드를 호스팅하는 또 다른 방법입니다.

## 자료

- [zecrocks/zcash-stack](https://github.com/zecrocks/zcash-stack) (저장소, 릴리스 및 예제)
- [Zcash Stack Helm 차트 README](https://github.com/zecrocks/zcash-stack/blob/main/charts/zcash-stack/README.md)
- [워크숍 메모: 동기화, 연결, 관찰](https://github.com/zecrocks/zcash-stack/tree/main/docs)
- [Docker README](https://github.com/zecrocks/zcash-stack/blob/main/docker/README.md)
- [Artifact Hub 목록](https://artifacthub.io/packages/search?repo=zcash)
- [hosh.zec.rocks](https://hosh.zec.rocks/zec) (공개 서버 모니터)

**마지막 업데이트:** 2026년 11월 (차트 0.4.9)
