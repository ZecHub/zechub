# Akash 네트워크에서 Zebra 실행 방법

Akash에서 Zebra Zcash 전체 노드를 배포하는 단계별 가이드입니다.

### 배포 중인 내용

다음과 같은 기능을 갖는 전체 Zebra 노드:

-> Zcash 블록체인 전체 동기화 (메인넷의 경우 100GB 이상, 테스트넷의 경우 약 40GB)

-> AKT 토큰 가격에 따라 월 약 $15 비용 발생

-> 완전히 동기화하는 데 수시간에서 수일이 소요됨

-> 메인넷의 경우 4 vCPU, 16GB RAM, 350GB 저장공간 또는 테스트넷의 경우 2 vCPU, 8GB RAM, 50GB 저장공간 사용


awesome-akash 템플릿은 이제 **Zebra 7.0.0**으로 고정합니다(`:latest`은 사용하지 않음). Prometheus(`9999`)와 health(`8080`)를 내부에서 활성화하고, gRPC **9067**을 사용하는 동일 위치의 **lightwalletd**용 JSON-RPC를 내부에서 활성화하며, 기능 플래그 `ENABLE_METRICS` / `ENABLE_HEALTH` / `ENABLE_RPC` / `ENABLE_LIGHTWALLETD`도 활성화합니다.

더 빠른 프루닝된 Mainnet 노드를 실행하려면 [Zakura을 Akash](/guides/akash-network-zakura)에서 실행하는 방법을 참고하세요. 일회용 Regtest 대시보드를 사용하려면 [Zakura를 Akash](/guides/thus-spoke-zakura-akash)에서 실행하는 방법을 참고하세요.

### Akash가 포트를 공개하는 방법

SDL의 숫자(`port` / `as`)는 **컨테이너 포트**입니다. Zebra는 여전히 **8233**에서 수신 대기하고, lightwalletd는 **9067**에서, 상태 확인은 **8080**에서 수신 대기합니다. 이 숫자는 프로세스와 동일한 배포 환경의 다른 서비스(`zebra:8232`)를 위한 것입니다.

이 포트는 제공업체의 공용 IP에 있는 포트가 **아닙니다**.

**기본값(이 템플릿):** 전용 IP가 없습니다. `global: true` TCP를 노출할 때마다 제공자는 공유 호스트의 **무작위 높은 포트**를 컨테이너 포트에 매핑합니다. 임대가 시작되면 Console/Air **Leases → URIs**에 실제 엔드포인트가 표시됩니다. 예를 들면:

```
zebra-8233: provider.example:31482
lightwalletd-9067: provider.example:32011
```

피어와 지갑은 **해당** 호스트:포트 값을 사용합니다. 필요한 노출 유형(P2P 또는 lightwalletd)의 URI를 복사하세요. `ZEBRA_NETWORK__EXTERNAL_ADDR`을 설정했다면 `…:8233`가 아니라 매핑된 P2P URI(`provider.example:31482`)로 설정하세요.

**HTTP**(`as: 80` 및 `http_options`을 사용하며 Thus Spoke 대시보드에서 사용): 많은 제공업체는 임의의 TCP 포트 대신 **인그레스 호스트 이름**(대개 80/443)을 게시합니다. 브라우저에서 해당 서비스의 URI를 여세요.

**내부**(`global: false` 또는 `to: service: lightwalletd`): 클러스터 DNS만 사용(`zebra:8232`). 공개 URI 없음.

**전용 IP**(SDL의 `endpoints` / `kind: ip`)는 **유료 추가 옵션**입니다. 공인 IP와 때로는 해당 IP의 `as` 포트를 고정할 수 있습니다. 이 템플릿은 전용 IP를 **요청하지 않습니다**. 안정적인 `host:8233`가 필요하다면 나중에 직접 추가하세요. 비용이 더 들고 입찰에 참여하는 제공업체가 줄어들 수 있습니다.

### 사용할 사이트 (결제)

SDL은 동일합니다. 두 Akash 웹 UI는 **결제 방식**이 다릅니다.

| 사이트 | 결제 | 지갑 |
| --- | --- | --- |
| [console.akash.network](https://console.akash.network) | 전통적인 웹 결제(카드 / Console에서 제공하는 법정화폐 결제망) | Console 계정 |
| [air.akash.network](https://air.akash.network) | 네이티브 Akash 체인 결제(AKT / ACT) | **Keplr** |

온체인에서 Keplr로 결제하려면 **Air**를 사용하세요. 일반적인 웹 결제 방식을 원한다면 **Console**을 사용하세요. Console에서는 Keplr 네이티브 결제를 지원할 거라고 기대하지 마세요.

### 사전 조건

**Console(웹 결제)에서 결제하는 경우**

1. [console.akash.network](https://console.akash.network)의 Console 계정
2. Console UI에서 허용되는 결제 수단
3. UI에서 몇 분 정도 소요됨

**Air에서 결제하는 경우 (네이티브 Akash / Keplr)**

1. **Keplr** 브라우저 확장 프로그램 (Chrome/Brave/Firefox)
2. 예치와 임대를 위해 Keplr에서 **AKT / ACT** 준비 (거래소 또는 IBC에서 가져오기)
3. [air.akash.network](https://air.akash.network) 열기

#### 1단계: 연결

**콘솔(웹 결제)**

-> [https://console.akash.network](https://console.akash.network)로 이동

-> 로그인하고 Console 계정 절차를 완료하세요

-> UI에 표시되는 체크아웃을 사용하세요(온체인 Keplr은 사용하지 마세요)

**Air (네이티브 Akash 결제)**

[https://air.akash.network](https://air.akash.network)로 이동하십시오

-> **"Connect Wallet"(지갑 연결)** 클릭

-> **Keplr**를 선택하고 연결을 승인합니다

-> 입금액과 임대료를 합한 금액을 충당할 만큼 AKT/ACT 잔액이 충분한지 확인하세요

#### 단계 2: 배포 생성

-> **"Deploy"**를 클릭하세요

-> **"Build your template"**(템플릿 만들기) 선택 (또는 SDL 업로드로 바로 이동)


##### 옵션 A: SDL 파일 업로드 (추천)

**웹 결제 (콘솔)**

[![Deploy on Akash Console](/content-images/deploy-with-akash-btn-74abb88d44.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zebra)

**Akash Keplr(Air)를 사용한 네이티브 결제**

[Air에서 이 템플릿 열기](https://air.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zebra)

##### 옵션 B: SDL 편집기 사용

SDL 파일을 수동으로 붙여넣고 싶다면 [the SDL](https://github.com/akash-network/awesome-akash/blob/master/zcash-zebra/deploy.yaml)을 참조하세요:

-> *zebra-akash.yml*의 내용 복사

-> SDL 편집기에 붙여넣기

-> 필요에 따라 수정 (아래 구성 섹션 참조)

-> **"Create Deployment"**(배포 생성) 클릭


#### 단계 3: 배포 및 예치금 승인 검토

UI에 다음이 표시됩니다:

-> **배포 예치금**: 약 5 AKT (배포 종료 시 환불)

-> **예상 비용**: SDL 가격 기준으로 계산됨

**Air**에서 **"승인"**을 클릭하고 **Keplr**에 로그인하세요. **Console**에서는 UI에 표시되는 웹 결제를 완료하세요.

#### 단계 4: 제공자 선택

약 30초 후, 제공자의 입찰이 표시됩니다. 각 입찰은 다음과 같은 정보를 보여줍니다:

-> **블록당 가격** (AKT 또는 USDC로 표시)

-> **월별 예상 비용**

-> **제공자 세부정보** (업타임, 지역 등)


**가장 저렴한 제공자를 선택하지 마세요.** 확인해야 할 사항:

-> 업타임 % (95% 이상이 목표)

-> 지역 (근접할수록 지연 시간이 줄어들지만 블록체인 노드에는 큰 영향 없음)

-> 감사 상태 (녹색 체크마크 = 더 신뢰 가능)


선택한 제공자에서 **"입찰 수락"**을 클릭합니다. On Air에서는 Keplr에서 로그인합니다. Console에서는 웹 결제 절차를 통해 확인합니다.

#### 단계 5: 배포 대기

콘솔은 다음과 같이 작동합니다:

-> 선택한 제공자와 임대 계약 생성

-> 매니페스트 전송 (제공자가 실행할 내용 알려줌)

-> 컨테이너 시작

1-2분 정도 소요됩니다. UI에서 상태 업데이트를 확인하세요.

#### 단계 6: 실행 확인

배포가 완료되면 다음과 같은 정보를 볼 수 있습니다:

-> **Services** 탭: *zebra* 서비스의 상태 표시

-> **Logs** 탭: 컨테이너 로그 실시간 보기

-> **Leases** 탭: 배포 세부정보 (DSEQ, 제공자, 비용 등)


##### 로그 확인

**Logs**를 클릭하면 Zebra가 시작되는 것을 볼 수 있습니다:

```bash
환경 변수에서 구성 파일 불러오는 중
메인넷 네트워크 선택됨
[::]:8233 포트에서 피어 연결 대기
초기 동기화 시작...
```

동기화는 **수시간에서 수일**이 걸릴 수 있습니다. 다음을 확인하세요:

-> 증가하는 블록 높이

-> 피어 연결 (10-30개의 피어)

-> 반복 오류 없음


#### 단계 7: 노드 주소 얻기

**Leases** 탭을 클릭한 후 **URIs**를 선택합니다.

다음과 같은 내용을 볼 수 있습니다:

```
zebra-8233: provider-hostname.com:31482
lightwalletd-9067: provider-hostname.com:32011
```

각 줄은 하나의 `global: true` 노드 노출입니다. 이름에는 SDL `as` 포트(8233, 9067)가 포함됩니다. 호스트 이름 뒤의 숫자는 임대 시 할당되는 **제공업체의 매핑 포트**입니다. 다른 Zcash 노드는 `provider-hostname.com:31482`로 연결합니다. 경량 지갑은 lightwalletd URI를 사용합니다(TLS를 직접 종료하지 않는 한 TLS는 꺼져 있습니다).

컨테이너는 여전히 8233 / 9067 포트에서 수신 대기합니다. 나중에 전용 IP를 추가하지 않는 한(이 템플릿에는 포함되지 않음), 공개 주소는 항상 URI입니다.

### 구성 옵션

#### 테스트넷으로 전환

SDL은 기본적으로 메인넷을 사용합니다. 테스트넷을 사용하려면:

-> *env* 섹션에서 **메인넷 구성 주석 처리**:

   ```yaml
   # - "ZEBRA_NETWORK__NETWORK=Mainnet"
   # - "ZEBRA_NETWORK__LISTEN_ADDR=[::]:8233"
   ```

-> **테스트넷 구성 해제**:

   ```yaml
   - "ZEBRA_NETWORK__NETWORK=Testnet"
   - "ZEBRA_NETWORK__LISTEN_ADDR=[::]:18233"
   ```

-> *expose* 섹션에서 **노출 포트 업데이트**:

   ```yaml
   # 메인넷 포트 주석 처리:
   # - port: 8233
   #   as: 8233
   #   to:
   #     - global: true
   #   proto: tcp

   # 테스트넷 포트 해제:
   - port: 18233
     as: 18233
     to:
       - global: true
     proto: tcp
   ```

-> *profiles.compute.zebra.resources*에서 **리소스 감소** (선택 사항):

   ```yaml
   cpu:
     units: 2  # 4에서 2로 줄임
   memory:
     size: 8Gi  # 16Gi에서 8Gi로 줄임
   storage:
     - size: 50Gi  # 150Gi에서 50Gi로 줌
   ```

-> *profiles.placement.akash.pricing*에서 **가격 감소** (선택 사항):

   ```yaml
   amount: 5000  # 10000에서 5000으로 줄임
   ```

#### RPC 액세스 활성화

보안상 기본적으로 RPC는 비활성화되어 있습니다. 활성화하려면:

**메인넷용:**

-> *env* 섹션에서 주석 해제:

   ```yaml
   - "ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:8232"
   - "ZEBRA_RPC__COOKIE_DIR=/home/zebra/.cache/zebra"
   ```

-> *expose* 섹션에서 메인넷 RPC 포트 주석 해제:

   ```yaml
   - port: 8232
     as: 8232
     to:
       - global: false  # 보안상 내부로 유지
     proto: tcp
   ```

**테스트넷용:**

-> *env* 섹션에서 주석 해제:

   ```yaml
   - "ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:18232"
   - "ZEBRA_RPC__COOKIE_DIR=/home/zebra/.cache/zebra"
   ```

-> *expose* 섹션에서 테스트넷 RPC 포트 주석 해제:

   ```yaml
   - port: 18232
     as: 18232
     to:
       - global: false
     proto: tcp
   ```

**경고**: RPC에 *global: true*를 설정하면 인터넷에 노출됩니다. Zebra는 기본적으로 쿠키 인증을 사용하지만, 이 작업은 자신이 무엇을 하고 있는지 잘 알고 있을 때만 수행해야 합니다.

`global: true`으로 RPC를 공개해도 공개 주소는 `host:8232`가 아니라 **리스 URI**(`host:&lt;random-high-port&gt;`)입니다. `global: false`(이 템플릿)을 사용하면 RPC는 배포 네트워크에 유지됩니다(lightwalletd의 경우 `zebra:8232`). 전용 IP 리스는 별도의 유료 옵션이며 SDL에는 포함되지 않습니다.

#### 메트릭스 활성화(Prometheus)

모니터링을 위해 메트릭스를 수집하려면:

-> *env*에서 주석 해제:

   ```yaml
   - "ZEBRA_METRICS__ENDPOINT_ADDR=0.0.0.0:9999"
   ```

-> *expose*에서 메트릭스 포트 주석 해제:

   ```yaml
   - port: 9999
     as: 9999
     to:
       - global: false
     proto: tcp
   ```

#### 리소스/가격 조정

배포 제안이 없거나 비용 최적화를 원한다면:

**저사양 제공자 선택 시**, *profiles.compute.zebra.resources* 섹션에서 줄임:

-> CPU: *units: 2* (합리적인 동기화 속도를 위한 최소값)

-> 메모리: *size: 12Gi* (안정성을 위한 최소값)

-> 저장공간: *size: 120Gi* (메인넷을 위한 최소값)

**더 많은 제안 유치를 위해**, *profiles.placement.akash.pricing* 섹션에서 증가:

-> 메인넷: *amount: 1000000* uakt/block 시도

-> 테스트넷: *amount: 1000000* uakt/block 시도

### 배포 업데이트

배포 후 구성 변경이 필요하다면?

-> 콘솔에서 **My Deployments**(내 배포)로 이동

-> Zebra 배포 찾기

-> **"Update Deployment"**(배포 업데이트) 클릭

-> SDL 편집

-> **"Update"**를 클릭합니다(Air: Keplr에 로그인, Console: 웹 결제 절차를 확인)

**참고**: 업데이트는 컨테이너를 재시작합니다. 노드는 저장된 상태(지속적 저장공간)에서 복구되지만, 1-2분의 다운타임을 예상해야 합니다.

### 모니터링

#### 콘솔을 통한 모니터링

-> **Logs tab**(로그 탭): 컨테이너 로그 실시간 보기

-> **Shell tab**(쉘 탭): 컨테이너 내부에서 쉘이 실행됨 (디버깅에 유용)

-> **Events tab**(이벤트 탭): Kubernetes 이벤트 (일반적으로 문제가 생기지 않는 한 거의 사용하지 않음)


#### RPC를 통한 모니터링(활성화 시)

RPC를 활성화했다면, 일반적인 zebrad 전체 노드처럼 자신의 노드를 쿼리할 수 있습니다.

### 배포 종료

완료했거나 더 이상 지불하고 싶지 않다면:

-> **My Deployments**(내 배포)로 이동

-> Zebra 배포 찾기

-> **"Close Deployment"**(배포 종료) 클릭

-> 확인 (Air: Keplr에서 로그인; Console: Console UI에서 확인)

5 AKT 예치금이 환불됩니다. **지속적 저장공간**은 제공자가 보존해야 하지만, 다른 클라우드 제공자와 마찬가지로 이를 의존하지 마세요.

### 문제 해결

#### "Insufficient funds" 오류

On Air에서는 AKT/ACT로 Keplr에 자금을 충전하세요. Console에서는 Console 결제 수단에 잔액을 충전하세요.

#### 제안이 표시되지 않음

다음 중 하나일 수 있습니다:

-> 가격이 너무 낮음 (SDL에서 *amount* 증가)

-> 제공자에게 요구하는 리소스가 너무 높음 (CPU/메모리/저장공간 감소)

-> 더 오래 기다림 (때로는 60-90초가 걸릴 수 있음)


#### 배포가 "pending" 상태에 멈춤

제공자가 문제가 있을 수 있습니다. 배포를 종료하고 다른 제공자를 시도하세요.

#### Zebra 로그에서 "No peers connected" 표시

처음 몇 분 동안 정상입니다. Zebra는 자동으로 피어를 발견합니다. 10분 이상 지나면 계속된다면 네트워킹 문제일 수 있습니다 (Akash에서는 거의 발생하지 않음).

#### 로그에 "Out of memory" 오류 표시

RAM을 절약하려 했습니다. 배포를 종료하고 최소 12Gi 메모리(16Gi 권장)로 재배포하세요.

#### 동기화가 영원히 지연됨

"영원"의 정의:

-> **시간**: 일반적

-> **일**: 메인넷에서 처음부터 시작하는 경우에도 일반적

-> **주**: 문제가 있음, 로그에서 오류 확인


### 비용 관리

Console 또는 Air에서 지출 내역을 확인하세요:

-> **My Deployments** -> 배포 -> "Cost per month" 예상값 표시

-> Air: Keplr AKT/ACT 잔액이 시간이 지남에 따라 감소합니다. Console: Console 결제 잔액이 감소합니다.

잔액이 낮아지면 Akash가 자동으로 배포를 종료합니다. **주기적으로 지갑을 충전하거나 알림 설정**하세요.

#### 비용 절감 방법

-> **테스트넷 사용**: 비생산 테스트 용 (50% 저렴)

-> **CPU/메모리 감소**: 빠른 동기화가 필요하지 않다면

-> **더 싼 제공자 선택**: 항상 좋은 선택은 아님 - 업타임 중요


### 메인넷 vs 테스트넷

```markdown
----------------------------------------------------------------------------------
|            | 메인넷 (기본값)               | 테스트넷                         |
---------------------------------------------------------------------------------|
| 목적      | 생산용 Zcash 블록체인        | 테스트 및 개발                   |
| 네트워크  | ZEBRA_NETWORK__NETWORK=Mainnet | ZEBRA_NETWORK__NETWORK=Testnet   |
| P2P 포트  | 8233                         | 18233                           |
| RPC 포트  | 8232                         | 18232                           |
| 동기화 시간 | 일                       | 시간                            |
| 저장공간  | 350GB+                       | 50GB                            |
| 리소스    | 4 CPU / 16GB RAM             | 2 CPU / 8GB RAM                 |
| 비용      | ~$15/월                      | ~$5/월                          |
----------------------------------------------------------------------------------
```

배포 프로세스를 테스트하고자 한다면, 위의 "테스트넷으로 전환" 섹션을 참조하여 테스트넷부터 시작하세요.

### 추가 자료

**Akash 콘솔** (웹 결제): [https://console.akash.network](https://console.akash.network)

**Akash Air** (네이티브 AKT/ACT + Keplr): [https://air.akash.network](https://air.akash.network)

**Akash 문서**: [https://akash.network/docs/](https://akash.network/docs/)

**Zebra 문서**: [https://zebra.zfnd.org/](https://zebra.zfnd.org/)

**Zcash 탐색기**: [https://zechub.wiki/guides/blockchain-explorers](https://zechub.wiki/guides/blockchain-explorers)

**Akash Discord**: [https://discord.akash.network](https://discord.akash.network) (제공자 문제에 대해)
