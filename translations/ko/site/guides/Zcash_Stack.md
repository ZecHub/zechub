<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zcash_Stack.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="페이지 편집"/>
</a>

# Zcash Stack: Kubernetes 또는 Docker에서 라이트 월렛 서버 실행하기

[Zcash Stack](https://github.com/zecrocks/zcash-stack)은 zec.rocks 팀이 만든 오픈 소스 배포 도구 모음입니다. Zcash 풀 노드, 라이트 월렛 서버와 선택 구성 요소(Zaino, 블록 탐색기, Tor 히든 서비스, DNS 시더, zecd, 브라우저 월렛용 gRPC-web 프록시)를 패키징해 Kubernetes용 Helm 차트와 Docker Compose 파일로 제공합니다. zec.rocks lightwalletd 서버는 모두 이 차트로 실행됩니다. 이 프로젝트는 [Zcash Community Grants](https://zcashcommunitygrants.org/)의 자금 지원을 받습니다.

이 페이지에서는 이 도구 모음이 배포하는 항목, 설치 전에 준비할 사항, 그리고 중요한 설정을 요약합니다. 차트 버전 **0.4.9**(2026년 11월 13일 출시)를 기준으로 합니다. 프로젝트의 [차트 README](https://github.com/zecrocks/zcash-stack/blob/main/charts/zcash-stack/README.md)와 [워크숍 노트](https://github.com/zecrocks/zcash-stack/tree/main/docs)가 참고 자료이므로, 프로덕션에서 실행하기 전에 읽어 보세요.

## 요약

- **두 가지 배포 방식.** Kubernetes용 Helm 차트(자체 NVMe 하드웨어에서 실행하는 k3s가 주 대상이며, GKE Standard와 Autopilot도 지원)와 단일 머신용 Docker Compose 파일을 제공합니다. 워크숍에서는 서버 운영이 처음이라면 Docker, 이미 서버 집합을 운영하고 있다면 Kubernetes을 권장합니다.
- **체인 노드 하나와 라이트 월렛 서버.** 권장 구성은 Zebra + lightwalletd입니다. 백엔드로 Zakura을 Zebra 대신 사용할 수 있고, Zaino는 lightwalletd를 대체하거나 함께 사용할 수 있습니다.
- **디스크 공간은 약 600 GiB를 계획하세요.** Zebra의 체인 상태는 2026년 6월 기준 약 260 GiB였으며 계속 늘어나고 있습니다. 라이트 월렛 캐시에는 약 17 GiB가 추가로 필요합니다. 전체 동기화에는 며칠이 걸리므로, 차트에서 공개된 스냅샷을 복원할 수도 있습니다.
- **차트에서 이미지 버전을 고정합니다.** 0.4.9에서는 Zebra 7.0.0(NU7을 따름), lightwalletd v0.6.1, Zakura 1.8.6, Zaino 0.8.0을 사용합니다. 네트워크 업그레이드 전과 Zakura 릴리스의 지원 종료 높이에 도달하기 전에 차트를 업데이트하세요.
- **서버를 등록하세요.** 공개 서버 운영자는 [hosh.zec.rocks](https://hosh.zec.rocks/zec) 모니터에 서버를 추가해 월렛과 사용자가 서버의 가동 여부를 확인할 수 있습니다.

## 배포되는 항목

각 구성 요소는 차트의 [`values.yaml`](https://github.com/zecrocks/zcash-stack/blob/main/charts/zcash-stack/values.yaml)에서 켜고 끌 수 있습니다. 기본적으로 lightwalletd만 켜져 있으며, 체인 노드가 필요하므로 예제 파일에서는 Zebra도 켭니다.

| 구성 요소 | 차트의 이미지 0.4.9 | 기본값 | 기능 |
|:--|:--|:--|:--|
| Zebra | `zfnd/zebra:7.0.0` | 꺼짐 (예시에서는 켜짐) | 전체 노드. 체인을 검증하고 다른 모든 구성 요소에 RPC를 제공함 |
| Zakura | `zakuracore/zakura:1.8.6` | 꺼짐 | Zebra 포크. Zebra 대신 lightwalletd 또는 Zaino의 대체 백엔드로 바로 사용할 수 있음 |
| lightwalletd | `electriccoinco/lightwalletd:v0.6.1` | 켜짐 | 모바일 및 데스크톱 지갑용 라이트 지갑 서버(gRPC) |
| Zaino | `zingodevops/zaino:0.8.0-no-tls` | 꺼짐 | 라이트 지갑에도 서비스를 제공하는 Rust 인덱서 |
| 블록 탐색기 | `emersonian/zcash-explorer:v0.0.6` | 꺼짐 | 노드의 JSON-RPC를 읽는 웹 탐색기 (Zaino은 gRPC만 제공하므로 백엔드로 사용할 수 없음) |
| Tor | `osminogin/tor-simple:0.4.9.16` | 꺼짐 | lightwalletd 또는 Zaino을 `.onion` 서비스로 게시함 |
| DNS 시더 | `zfnd/dnsseeder:v1.8.0` | 꺼짐 | 새 노드가 피어를 찾도록 도움 |
| zecd | `ghcr.io/zecrocks/zecd:0.6.3` | 꺼짐 | 실드 우선 지갑 서버 ([zecd](/zcash-tech/zecd) 참조) |
| gRPC-web 프록시 | `envoyproxy/envoy:v1.40.2` | 꺼짐 | 브라우저가 원시 gRPC로 연결할 수 없는 lightwalletd에 브라우저 지갑이 연결하도록 함 |
| WebZjs 지갑 | `ghcr.io/zecrocks/webzjs-wallet` | 꺼짐 | 브라우저 지갑. 같은 호스트에 gRPC-web 프록시가 필요함 |

버전에 관한 참고 사항 두 가지입니다. Zaino 업스트림 버전은 [0.10.1](https://github.com/zingolabs/zaino/releases)이지만 차트에는 여전히 0.8.0 이미지가 포함되어 있으므로, 최신 Zaino 동작에 의존하기 전에 `values.yaml`를 확인하세요. 또한 Zakura 노드는 릴리스별 지원 종료 높이에 도달하면 메인넷에서 작동을 멈춥니다. 1.8.6의 경우 해당 높이는 블록 3,643,309로, 2026년 12월 5일경입니다. 1.8.0 이후 x86-64 빌드는 BMI2 및 ADX가 없는 CPU에서 시작을 거부합니다. [Zakura 노드](/zcash-tech/zakura-node) 페이지에서 두 항목을 모두 다룹니다.

## Kubernetes: 설치 전 준비 사항

차트를 배포하려면 클러스터마다 한 번씩 다음 세 가지를 설정해야 합니다.

1. **인그레스 컨트롤러.** 차트는 표준 Kubernetes `Ingress`를 만들며 기본적으로 `nginx` 클래스를 사용합니다. k3s와 GKE에서 gRPC를 동일한 방식으로 처리하므로 ingress-nginx를 권장합니다. k3s에서는 `--disable traefik`를 사용해 k3s를 설치하거나, Traefik를 유지하면서 `ingress.className: traefik`와 `ingress.backendProtocol: GRPC`을 설정하세요(이 경우 차트가 Traefik `IngressRoute`를 생성합니다. Traefik를 통한 일반 Ingress는 gRPC에서 HTTP 500을 반환하기 때문입니다). GKE에 기본 제공되는 `gce` 인그레스 클래스는 gRPC를 lightwalletd 또는 Zaino로 라우팅할 수 없습니다.
2. **cert-manager와 ClusterIssuer**를 설정해 Let's Encrypt 인증서를 자동으로 발급받으세요(`examples/cluster-issuer.yaml`; 먼저 스테이징 발급자로 테스트하세요). GKE Autopilot에서는 `--set global.leaderElection.namespace=cert-manager`를 사용해 cert-manager를 설치하세요. 그렇지 않으면 발급자 생성이 x509 "unknown authority" 오류로 실패합니다. cert-manager를 생략하고 `<service>.ingress.tls.secretName`이 자체 인증서를 사용하도록 지정할 수도 있습니다.
3. **StorageClass.** NVMe를 사용하는 k3s에서는 `local-path`로 충분합니다. GKE에서는 Zebra에 프로비저닝된 IOPS 클래스를 지정하세요(저장소에 Hyperdisk 예제가 포함되어 있습니다). 먼저 리전별 디스크 할당량을 늘려야 합니다. 새 GKE 프로젝트의 리전별 SSD 한도는 500 GB, Hyperdisk 한도는 500 GB이며, 체인 노드에는 300~500 GB가 필요합니다. 따라서 볼륨이 `Pending` 상태에서 `QUOTA_EXCEEDED`와 함께 멈출 수 있습니다. 기존 StatefulSet의 `storageClassName`은 볼륨을 다시 만들지 않고는 변경할 수 없습니다.

그런 다음 각 호스트 이름의 DNS 레코드가 인그레스 컨트롤러의 외부 IP를 가리키도록 설정하세요. 아직 DNS가 없다면 실제 호스트 이름 옆에 [sslip.io](https://sslip.io) 이름(예: `203-0-113-7.sslip.io`)을 등록하세요. 이 이름은 포함된 IP로 해석되므로 인증서를 바로 발급할 수 있습니다. 장기 운영 서버에는 자체 호스트 이름을 기본 이름으로 사용하세요.

## Kubernetes: 설치

```bash
helm repo add zcash https://zecrocks.github.io/zcash-stack
helm repo update
# copy an example from the repo's examples/ folder, set your hostnames and RPC credentials, then:
helm install zcash zcash/zcash-stack -f examples/zebra-mainnet.yaml
```

[`zebra-mainnet.yaml`](https://github.com/zecrocks/zcash-stack/blob/main/examples/zebra-mainnet.yaml) 예제는 Zebra을 켜고 lightwalletd를 여기에 연결하며, lightwalletd에 40 GiB 캐시와 TLS 인그레스를 설정하고 노드의 RPC를 클러스터 내부에만 공개합니다. 설치 전에 예제의 RPC 사용자 이름과 비밀번호를 바꾸세요. 다른 예제에서는 테스트넷, GKE, 고가용성 구성의 GKE Autopilot, Tor 히든 서비스, sslip.io 초기 설정을 다룹니다.

업그레이드하려면 `helm repo update`을 실행하고 helm-diff 플러그인으로 변경 사항을 미리 확인한 다음(`helm diff upgrade zcash zcash/zcash-stack -f values.yaml`), 같은 인수로 `helm upgrade`을 실행하세요. 0.0.x 차트에서 업그레이드한다면 먼저 [MIGRATION.md](https://github.com/zecrocks/zcash-stack/blob/main/charts/zcash-stack/MIGRATION.md)를 읽으세요. 0.1.0에서 기존 Traefik 설정이 표준 Ingress와 cert-manager로 대체되었고 값 구성도 변경되었습니다.

## 용량 산정

| | 정상 상태 | 초기 동기화 | 디스크 |
|:--|:--|:--|:--|
| Zebra | 약 0.1 vCPU, 1.6 GiB | CPU, IOPS 및 메모리 사용량이 많음 | 약 260 GiB(2026년 6월 기준)이며 계속 증가 중. 차트 기본값은 500 GiB |
| lightwalletd | 약 0.15 vCPU, 165 MiB | 블록마다 캐시를 생성 | 약 17 GiB. 차트 기본값은 40 GiB |

전체 스택은 약 1.5 vCPU와 4.5 GiB 메모리를 요청합니다. 단일 머신에서 실행하려면 차트는 8 vCPU, RAM 32 GiB, NVMe 약 1 TB를 권장합니다(GKE에서는 500 GiB Hyperdisk 또는 pd-ssd 볼륨을 사용하는 `n2-standard-8`). 기본 리소스 요청량은 GKE Autopilot의 최소 요구량을 충족하며, 동기화 중 부하가 커질 수 있도록 CPU 제한은 설정하지 않습니다.

## 알아둘 설정

**스냅샷 복원.** `<chain>.initSnapshot.enabled: true`을 설정하고 `initSnapshot.url`, `gs://` 또는 `https://`을 사용하면 제네시스 블록부터 동기화하는 대신 공개된 스냅샷에서 시작할 수 있습니다. 복원 과정은 진행 상태를 기록하고, 중단된 다운로드를 깔끔하게 다시 수행하며, 이전 설치에서 정상 상태인 볼륨을 지우지 않습니다. 스냅샷은 신뢰를 일부 전제로 합니다. 스냅샷 이후의 블록은 계속 검증되며, 잘못된 스냅샷은 검증에 실패하는 블록으로 드러납니다. 워크숍에 따르면 처음부터 동기화하는 데 약 10일, 스냅샷에서 시작하면 약 10시간이 걸립니다.

**확장과 무중단 운영.** lightwalletd과 Zaino는 노드 앞단의 얇은 캐시이므로, 다운타임 없는 롤링 업데이트를 위해 `replicas: 2`을 실행하세요(복제본이 1개를 초과하면 PodDisruptionBudget가 자동으로 추가됩니다). 체인 노드는 부하 분산용이 아닙니다. 복제본마다 자체 볼륨을 가진 풀 노드가 추가되고 각자 동기화해야 하므로, 하나만 실행하거나 이중화를 위해 두 개를 실행하세요.

**인바운드 피어.** 기본적으로 Zebra는 아웃바운드 연결만 만듭니다. `zebra.p2pPublic.enabled: true`은 8233 포트(테스트넷에서는 18233)에서 인바운드 피어를 받고 자신의 주소를 알립니다. 베어메탈과 k3s에서는 `externalAddrFrom: hostIP`, 노드 자체 IP가 비공개인 클라우드에서는 `nodeExternalIP`, GKE Autopilot에서 예약된 고정 IP를 사용하려면 `loadBalancer`를 선택하세요.

**TLS와 gRPC.** TLS는 인그레스에서 종료되고 클러스터 내부에서는 일반 HTTP/2를 사용하므로, 여러 호스트 이름이 하나의 lightwalletd를 가리킬 수 있습니다. gRPC 메서드 경로에 필요한 `pathType: Prefix`와 함께 `path: /`을 유지하세요. HTTPS 리디렉션 때문에 첫 인증서 발급에 실패하면 스테이징 발급자를 사용하거나 일시적으로 `ingress.tls.sslRedirect: "false"`을 설정하세요.

**Tor 히든 서비스.** 클러스터에 공용 IP나 도메인이 없을 때 유용합니다.

```yaml
tor:
  enabled: true
  targetService: zaino   # or lightwalletd
  hiddenServicePort: 443
```

`kubectl exec -it tor-0 -- cat /var/lib/tor/hidden_service/hostname`으로 주소를 확인하고 [zecping](https://github.com/zecrocks/zecping)을 사용해 로컬 Tor 클라이언트로 테스트하세요. 주소는 다음과 같습니다: `./zecping -socks localhost:9150 -addr <address>.onion:443`.

**네트워크 업그레이드 전후.** Zebra는 이전 버전을 사용하는 피어를 차단할 수 있으며, 체인 업데이트가 멈췄다는 로그와 함께 동기화가 중단될 수 있습니다. 차단 목록은 메모리에 저장되므로 `kubectl delete pod zebra-0`으로 초기화할 수 있습니다. 파드는 재동기화 없이 같은 체인 데이터를 사용해 다시 시작됩니다.

## Docker Compose

단일 머신에서 실행하려면 저장소를 복제하고 `docker/` 폴더에서 기본 파일을 시작하세요.

```bash
git clone https://github.com/zecrocks/zcash-stack.git
cd zcash-stack/docker
docker compose up --detach
docker compose logs --follow
```

`compose.yaml`은 x86에서 Zebra, lightwalletd, [Watchtower](https://containrrr.dev/watchtower/)를 실행하고, `compose.arm.yaml`는 ARM 호스트에서 같은 구성을 실행합니다. Watchtower가 새 이미지를 자동으로 가져오며, 기본 파일은 `zfnd/zebra:latest` 태그를 사용하므로 수동 업그레이드 없이 노드가 새 Zebra 릴리스를 따릅니다. `compose.zaino.yaml`는 lightwalletd 대신 Zaino을 사용하지만 오래된 커뮤니티 이미지를 고정해 사용하므로(`emersonian/zcash-zaino:0.1.2-zr4`), 사용 전에 확인하세요. 다른 파일에는 Caddy TLS 프런트엔드, VPS 프록시, 집에 있는 노드를 위한 autossh 터널이 포함됩니다.

서버의 기부 주소로 공개할 자체 통합 주소를 `.env` 파일의 `LIGHTWALLETD_DONATION_ADDRESS`에 설정하세요. 첫 `docker compose up` 전에 `docker/` 폴더에서 `./download-snapshot.sh`을 실행하면 처음부터 동기화하는 대신 체인 스냅샷을 다운로드합니다.

## 연결 및 모니터링

워크숍의 두 번째 수업에서는 서버를 외부에 공개하는 방법을 다룹니다. 공용 고정 IP를 사용하거나, SSH 터널을 통해 집의 IP를 VPS 뒤에 숨기거나, Tailscale Funnel을 사용하거나, Tor 전용 서버를 운영할 수 있습니다. 월렛에서 서버를 지정해 결과를 테스트하거나(ZODL의 Advanced Settings를 사용하세요. [월렛에서 서버 변경하기](/zcash-tech/lightwallet-nodes) 참고), gRPC 클라이언트로 `GetLightdInfo`을 호출하세요.

모니터링을 다루는 세 번째 수업에서는 수동 Docker 명령어를 소개하고 공개 서버를 [hosh](https://hosh.zec.rocks/zec), zec.rocks 가동 시간 모니터에 등록하도록 권합니다. 등록하려면 hosh의 서버 목록에 호스트 이름과 포트를 추가하는 풀 리퀘스트를 제출하면 됩니다. 각 단계에 대한 도움은 [zec.rocks 워크숍 포럼](https://workshops.zec.rocks)에서 받을 수 있습니다.

## 흔한 실수

**체인 노드 없이 lightwalletd 설치하기.** lightwalletd는 Zebra(또는 Zakura)에서 데이터를 읽습니다. 둘 중 하나를 켜거나, 해당 구성 요소가 켜져 있는 예제 파일에서 시작하세요.

**예제 RPC 자격 증명을 그대로 두기.** 예제에는 자리표시자가 포함되어 있습니다. RPC는 클러스터 내부에서만 사용되지만, 그래도 자격 증명을 바꾸세요.

**GKE의 기본 디스크 할당량으로 체인 노드 실행하기.** 볼륨이 바인딩되지 않습니다. 설치 전에 리전별 할당량을 늘리세요.

**부하 분산을 위해 Zebra 확장하기.** Zebra 복제본마다 완전히 새로 동기화해야 합니다. 대신 lightwalletd 또는 Zaino를 확장하세요.

**네트워크 업그레이드 중 오래된 차트 유지하기.** 업그레이드보다 오래된 노드는 업그레이드 이후 메인넷을 따라가지 못합니다(NU7 이후에는 Zebra 7.0.0 이상이 필요합니다). `helm repo update`을 실행하고 활성화 높이에 도달하기 전에 차트를 업그레이드하세요. Zakura의 지원 종료 높이도 확인하세요.

## 관련 페이지

- [Zcash 라이트월렛 노드](/zcash-tech/lightwallet-nodes): 라이트 월렛 서버가 볼 수 있는 정보와 볼 수 없는 정보, 공개 서버에 관한 설명입니다.
- [Zebra 풀 노드](/zcash-tech/zebra-full-node): 이 스택에서 실행하는 검증자입니다.
- [Zakura 노드](/zcash-tech/zakura-node): 차트에서 대신 실행할 수 있는 Zebra 포크입니다.
- [Zaino](/zcash-tech/zaino): Rust 인덱서입니다.
- [zecd](/zcash-tech/zecd): 차트에 추가할 수 있는 월렛 서버입니다.
- [Zcash 노드 RPC 및 인덱싱](/guides/zcash-node-rpc-and-indexing): Zebra RPC, Zallet, 인덱서에 관한 설명입니다.
- [Zebra을 Akash 네트워크에서 실행하는 방법](/guides/akash-network-zebra): 노드를 호스팅하는 또 다른 방법입니다.

## 자료

- [zecrocks/zcash-stack](https://github.com/zecrocks/zcash-stack) (저장소, 릴리스 및 예제)
- [Zcash Stack Helm 차트 README](https://github.com/zecrocks/zcash-stack/blob/main/charts/zcash-stack/README.md)
- [워크숍 노트: 동기화, 연결, 관찰](https://github.com/zecrocks/zcash-stack/tree/main/docs)
- [Docker README](https://github.com/zecrocks/zcash-stack/blob/main/docker/README.md)
- [Artifact Hub 목록](https://artifacthub.io/packages/search?repo=zcash)
- [hosh.zec.rocks](https://hosh.zec.rocks/zec) (공개 서버 모니터)

**최종 업데이트:** 2026년 11월 (차트 0.4.9)
