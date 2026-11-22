# Zebra를 Akash 네트워크에서 실행하는 방법

Akash에 Zebra Zcash 풀 노드를 배포하는 단계별 안내입니다.

### 배포 항목

다음 작업을 수행하는 풀 Zebra 노드입니다.

-> Zcash 블록체인 전체를 동기화합니다(메인넷은 100GB 이상, 테스트넷은 약 40GB).

-> AKT 토큰 가격에 따라 월 약 $15의 비용이 듭니다.

-> 완전히 동기화하는 데 몇 시간에서 며칠이 걸립니다.

-> vCPU 4개, RAM 16GB, 저장 공간 350GB(메인넷) 또는 vCPU 2개, RAM 8GB, 저장 공간 50GB(테스트넷)를 사용합니다.

awesome-akash 템플릿은 이제 **Zebra 7.0.0**을 고정 버전으로 사용합니다(`:latest`는 사용하지 않음). Prometheus(`9999`)와 상태 확인(`8080`)을 내부적으로 활성화하고, gRPC **9067**을 통해 같은 위치에 배포된 **lightwalletd**용 JSON-RPC도 내부적으로 활성화하며, 기능 플래그 `ENABLE_METRICS` / `ENABLE_HEALTH` / `ENABLE_RPC` / `ENABLE_LIGHTWALLETD`를 사용합니다.

더 빠른 가지치기 메인넷 노드는 [Zakura를 Akash에서 실행하는 방법](/guides/akash-network-zakura)을 참조하세요. 일회용 Regtest 대시보드는 [Thus Spoke Zakura를 Akash에서 실행하는 방법](/guides/thus-spoke-zakura-akash)을 참조하세요.


### Akash에서 포트를 공개하는 방식

SDL(`port` / `as`)에 지정된 숫자는 **컨테이너 포트**입니다. Zebra은 여전히 **8233**에서, lightwalletd은 **9067**에서, 상태 확인 서비스는 **8080**에서 수신 대기합니다. 이 포트는 프로세스와 동일한 배포 내 다른 서비스(`zebra:8232`)에 사용됩니다.

이 포트는 제공업체의 공인 IP에서 사용하는 포트가 **아닙니다**.

**기본 설정(이 템플릿):** 전용 IP가 없습니다. 각 `global: true` TCP 공개 설정에서 제공업체는 공유 호스트의 **무작위 고포트**를 컨테이너 포트에 매핑합니다. 임대가 시작되면 Console/Air의 **Leases → URIs**에 실제 엔드포인트가 표시됩니다. 예를 들면 다음과 같습니다.

```
zebra-8233: provider.example:31482
lightwalletd-9067: provider.example:32011
```

피어와 지갑에서는 **해당** 호스트:포트 값을 사용합니다. 원하는 공개 설정(P2P 또는 lightwalletd)의 URI를 복사하세요. `ZEBRA_NETWORK__EXTERNAL_ADDR`를 설정했다면 `…:8233`가 아니라 매핑된 P2P URI(`provider.example:31482`)로 설정하세요.

**HTTP**(`http_options`를 사용하는 `as: 80`, Thus Spoke 대시보드에서 사용): 많은 제공업체는 무작위 TCP 포트 대신 **수신 호스트 이름**(대개 80/443)을 공개합니다. 브라우저에서 해당 서비스의 URI를 여세요.

**내부**(`global: false` 또는 `to: service: lightwalletd`): 클러스터 DNS에서만 접근할 수 있습니다(`zebra:8232`). 공용 URI는 없습니다.

**전용 IP**(SDL의 `endpoints` / `kind: ip`)는 **유료 추가 옵션**입니다. 공인 IP를 고정할 수 있으며, 경우에 따라 해당 IP의 `as` 포트도 고정할 수 있습니다. 이 템플릿은 전용 IP를 요청하지 **않습니다**. 안정적인 `host:8233`이 필요하다면 나중에 직접 추가하세요. 추가 비용이 들고 입찰하는 제공업체가 줄어들 수 있습니다.

### 사용할 사이트(결제)

SDL은 동일합니다. 두 Akash 웹 UI는 **결제 방식**이 다릅니다.

| 사이트 | 결제 | 지갑 |
| --- | --- | --- |
| [console.akash.network](https://console.akash.network) | 일반 웹 결제(카드 / Console에서 제공하는 법정화폐 결제 수단) | Console 계정 |
| [air.akash.network](https://air.akash.network) | 네이티브 Akash 체인 결제(AKT / ACT) | **Keplr** |

Keplr를 온체인으로 결제하려면 **Air**를 사용하세요. 일반적인 웹 결제 절차를 이용하려면 **Console**을 사용하세요. Console에서 Keplr 네이티브 결제가 이루어질 것으로 기대하지 마세요.

### 준비 사항

**Console에서 결제하는 경우(웹 결제)**

1. [console.akash.network](https://console.akash.network)의 Console 계정
2. Console UI에서 허용하는 결제 수단
3. UI에서 작업할 몇 분의 시간

**Air에서 결제하는 경우(네이티브 Akash / Keplr)**

1. 브라우저 확장 프로그램 **Keplr**(Chrome/Brave/Firefox)
2. 보증금과 임대 비용을 위한 Keplr 내 **AKT / ACT**(거래소 또는 IBC를 통해 준비)
3. [air.akash.network](https://air.akash.network) 열기

#### 1단계: 연결

**Console(웹 결제)**

-> [https://console.akash.network](https://console.akash.network)로 이동합니다.

-> 로그인하거나 Console 계정 생성 절차를 완료합니다.

-> UI에 표시되는 결제 절차를 이용합니다(Keplr 온체인 결제 방식이 아님).

**Air(네이티브 Akash 결제)**

-> [https://air.akash.network](https://air.akash.network)로 이동합니다.

-> **“Connect Wallet”**을 클릭합니다.

-> **Keplr**을 선택하고 연결을 승인합니다.

-> AKT/ACT 잔액이 보증금과 임대 비용을 충당하기에 충분한지 확인합니다.

#### 2단계: 배포 생성

-> **“Deploy”**를 클릭합니다.

-> **“Build your template”**을 선택합니다(SDL 파일 업로드로 바로 이동해도 됩니다).

##### 옵션 A: SDL 파일 업로드(권장)

**웹 결제(Console)**

[![Deploy on Akash Console](/content-images/deploy-with-akash-btn-74abb88d44.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zebra)

**Akash 네이티브 결제(Keplr 사용, Air)**

[이 템플릿을 Air에서 여세요](https://air.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zebra)

##### 옵션 B: SDL 편집기 사용

[SDL](https://github.com/akash-network/awesome-akash/blob/master/zcash-zebra/deploy.yaml)을 직접 붙여넣으려면 다음과 같이 하세요.

-> *zebra-akash.yml*의 내용을 복사합니다.

-> SDL 편집기에 붙여넣습니다.

-> 필요에 따라 수정합니다(아래 설정 섹션 참조).

-> **“Create Deployment”**를 클릭합니다.


#### 3단계: 검토 및 보증금 승인

UI에 다음 정보가 표시됩니다.

-> **배포 보증금**: 약 5 AKT(배포를 종료하면 돌려받습니다)

-> **예상 비용**: SDL 가격 설정을 기준으로 산정됩니다.

**Air**에서는 **“Approve”**를 클릭하고 **Keplr**에서 서명합니다. **Console**에서는 UI에 표시되는 웹 결제 절차를 완료합니다.

#### 4단계: 제공업체 선택

약 30초 후 제공업체들의 입찰가가 표시됩니다. 각 입찰에는 다음 정보가 포함됩니다.

-> **블록당 가격**(AKT 또는 USDC)

-> **예상 월 비용**

-> **제공업체 세부 정보**(가동 시간, 지역 등)


**가장 저렴한 곳을 무조건 선택하지 마세요.** 다음 사항을 확인하세요.

-> 가동 시간 비율(95% 초과 권장)

-> 지역(가까울수록 지연 시간이 짧지만 블록체인 노드에는 큰 차이가 없습니다)

-> 감사 완료 여부(녹색 체크 표시가 있으면 더 신뢰할 수 있습니다)


원하는 제공업체에서 **“Accept Bid”**를 클릭합니다. Air에서는 Keplr에서 서명합니다. Console에서는 웹 결제 절차를 통해 확인합니다.

#### 5단계: 배포 대기

Console에서 다음 작업을 수행합니다.

-> 선택한 제공업체와 임대를 생성합니다.

-> 매니페스트를 전송합니다(제공업체가 실행할 항목을 지정합니다).

-> 컨테이너를 시작합니다.

1~2분 정도 걸립니다. UI에 상태 업데이트가 표시됩니다.

#### 6단계: 실행 확인

배포가 완료되면 다음 항목이 표시됩니다.

-> **Services** 탭: 상태와 함께 *zebra* 서비스가 표시됩니다.

-> **Logs** 탭: 컨테이너 로그가 실시간으로 표시됩니다.

-> **Leases** 탭: 배포 세부 정보(DSEQ, 제공업체, 비용)가 표시됩니다.


##### 로그 확인

**Logs**를 클릭하면 Zebra의 시작 과정이 표시됩니다.

```bash
Loading config from environment variables
Mainnet network selected
Listening for peer connections on [::]:8233
Starting initial sync...
```

네트워크에 따라 동기화에 **몇 시간에서 며칠**이 걸립니다. 다음 항목을 확인하세요.

-> 블록 높이가 증가하는지 확인합니다.

-> 피어 연결을 확인합니다(10~30개가 적당합니다).

-> 같은 오류가 반복되지 않는지 확인합니다.


#### 7단계: 노드 주소 확인

**Leases** 탭을 클릭한 다음 **URIs**를 클릭합니다.

다음과 같은 항목이 표시됩니다.

```
zebra-8233: provider-hostname.com:31482
lightwalletd-9067: provider-hostname.com:32011
```

각 줄은 `global: true` 공개 설정 하나에 해당합니다. 이름에는 SDL의 `as` 포트(8233, 9067)가 포함됩니다. 호스트 이름 뒤의 숫자는 임대 시 할당된 **제공업체 매핑 포트**입니다. 다른 Zcash 노드는 `provider-hostname.com:31482`에 연결합니다. 경량 지갑에서는 lightwalletd URI를 사용합니다(TLS를 직접 설정하지 않았다면 TLS는 꺼져 있습니다).

컨테이너는 여전히 8233 / 9067에서 수신 대기합니다. 나중에 전용 IP를 추가하지 않는 한(이 템플릿에는 포함되지 않음), 공용 주소는 항상 URI입니다.

### 설정 옵션

#### 테스트넷으로 전환

SDL의 기본값은 메인넷입니다. 테스트넷을 사용하려면 다음과 같이 하세요.

-> *env* 섹션의 메인넷 설정을 **주석 처리합니다**.

   ```yaml
   # - "ZEBRA_NETWORK__NETWORK=Mainnet"
   # - "ZEBRA_NETWORK__LISTEN_ADDR=[::]:8233"
   ```

-> 테스트넷 설정의 **주석을 해제합니다**.

   ```yaml
   - "ZEBRA_NETWORK__NETWORK=Testnet"
   - "ZEBRA_NETWORK__LISTEN_ADDR=[::]:18233"
   ```

-> *expose* 섹션의 공개 포트를 **변경합니다**.

   ```yaml
   # Comment out Mainnet port:
   # - port: 8233
   #   as: 8233
   #   to:
   #     - global: true
   #   proto: tcp

   # Uncomment Testnet port:
   - port: 18233
     as: 18233
     to:
       - global: true
     proto: tcp
   ```

-> **선택 사항: 테스트넷의 리소스를 줄입니다**(*profiles.compute.zebra.resources*).

   ```yaml
   cpu:
     units: 2  # Down from 4
   memory:
     size: 8Gi  # Down from 16Gi
   storage:
     - size: 50Gi  # Down from 150Gi
   ```

-> **선택 사항: 가격을 낮춥니다**(*profiles.placement.akash.pricing*).

   ```yaml
   amount: 5000  # Down from 10000
   ```

#### RPC 액세스 활성화

보안을 위해 RPC는 기본적으로 비활성화되어 있습니다. 활성화하려면 다음과 같이 하세요.

**메인넷:**

-> *env* 섹션의 주석을 해제합니다.

   ```yaml
   - "ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:8232"
   - "ZEBRA_RPC__COOKIE_DIR=/home/zebra/.cache/zebra"
   ```

-> *expose*에서 메인넷 RPC 포트의 주석을 해제합니다.

   ```yaml
   - port: 8232
     as: 8232
     to:
       - global: false  # Keep internal for security
     proto: tcp
   ```

**테스트넷:**

-> *env* 섹션의 주석을 해제합니다.

   ```yaml
   - "ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:18232"
   - "ZEBRA_RPC__COOKIE_DIR=/home/zebra/.cache/zebra"
   ```

-> *expose*에서 테스트넷 RPC 포트의 주석을 해제합니다.

   ```yaml
   - port: 18232
     as: 18232
     to:
       - global: false
     proto: tcp
   ```

**경고**: RPC에 *global: true*를 설정하면 인터넷에 공개됩니다. Zebra은 기본적으로 쿠키 인증을 사용하지만, 사용 방법을 정확히 알지 못한다면 이렇게 하지 마세요.

`global: true`으로 RPC를 공개하는 경우에도 공용 주소는 `host:8232`가 아니라 **임대 URI**(`host:&lt;random-high-port&gt;`)입니다. `global: false`(이 템플릿)를 사용하면 RPC는 배포 네트워크 내에 유지됩니다(lightwalletd용 `zebra:8232`). 전용 IP 임대는 별도의 유료 옵션이며 SDL에 포함되어 있지 않습니다.

#### 메트릭 활성화(Prometheus)

모니터링을 위해 메트릭을 수집하려면 다음과 같이 하세요.

-> *env*의 주석을 해제합니다.

   ```yaml
   - "ZEBRA_METRICS__ENDPOINT_ADDR=0.0.0.0:9999"
   ```

-> *expose*에서 메트릭 포트의 주석을 해제합니다.

   ```yaml
   - port: 9999
     as: 9999
     to:
       - global: false
     proto: tcp
   ```

#### 리소스/가격 조정

입찰을 받지 못하거나 비용을 최적화하려면 다음과 같이 하세요.

**사양이 낮은 제공업체를 이용하려면** *profiles.compute.zebra.resources* 섹션에서 다음 값을 낮춥니다.

-> CPU: *units: 2*(합리적인 동기화 속도를 위한 최소값)

-> 메모리: *size: 12Gi*(안정성을 위한 최소값)

-> 저장 공간: *size: 120Gi*(메인넷을 위한 최소값)

**입찰을 더 많이 받으려면** *profiles.placement.akash.pricing*에서 다음 값을 높입니다.

-> 메인넷: *amount: 1000000* uakt/block을 시도해 보세요.

-> 테스트넷: *amount: 1000000* uakt/block을 시도해 보세요.

### 배포 업데이트

배포 후 설정을 변경해야 하나요?

-> Console에서 **My Deployments**로 이동합니다.

-> Zebra 배포를 찾습니다.

-> **“Update Deployment”**를 클릭합니다.

-> SDL을 편집합니다.

-> **“Update”**를 클릭합니다(Air: Keplr에서 서명, Console: 웹 결제 절차를 통해 확인).

**참고**: 업데이트하면 컨테이너가 다시 시작됩니다. 노드는 저장된 상태(영구 저장소)에서 재개되지만, 1~2분 동안 서비스가 중단될 수 있습니다.

### 모니터링

#### Console에서 모니터링

-> **Logs 탭**: 컨테이너 로그가 실시간으로 표시됩니다.

-> **Shell 탭**: 컨테이너 내부의 셸을 엽니다(디버깅에 유용함).

-> **Events 탭**: Kubernetes 이벤트가 표시됩니다(문제가 발생하지 않았다면 대부분 쓸모가 없습니다).


#### RPC를 통한 모니터링(활성화된 경우)

RPC를 활성화했다면 일반적인 zebrad 풀 노드처럼 노드에 질의를 보낼 수 있습니다(실제로도 풀 노드입니다).

### 배포 종료

작업을 마쳤거나 비용 지불을 중지하려면 다음과 같이 하세요.

-> **My Deployments**로 이동합니다.

-> Zebra 배포를 찾습니다.

-> **“Close Deployment”**를 클릭합니다.

-> 확인합니다(Air: Keplr에서 서명, Console: Console UI에서 확인).

보증금 5 AKT가 환불됩니다. 제공업체가 **영구 저장소**를 보존해야 하지만, 이를 보장된 것으로 여기지 마세요. 다른 클라우드 제공업체와 마찬가지로 취급하세요.

### 문제 해결

#### “잔액 부족” 오류

Air에서는 Keplr에 AKT/ACT를 입금합니다. Console에서는 Console 결제 수단의 잔액을 충전합니다.

#### 입찰이 표시되지 않음

다음 중 하나일 수 있습니다.

-> 가격이 너무 낮습니다(SDL에서 *amount*를 높이세요).

-> 리소스 요구량이 사용 가능한 제공업체의 사양보다 높습니다(CPU/메모리/저장 공간을 줄이세요).

-> 더 기다려 보세요(입찰이 표시되기까지 60~90초가 걸리는 경우도 있습니다).


#### 배포가 “pending” 상태에서 멈춤

제공업체에 문제가 있을 수 있습니다. 배포를 종료하고 다른 제공업체를 선택하세요.

#### Zebra 로그에 “No peers connected”가 표시됨

처음 몇 분 동안은 정상입니다. Zebra이 자동으로 피어를 찾습니다. 10분 이상 지나도 계속되면 네트워크 문제가 있을 수 있습니다(Akash에서는 가능성이 낮음).

#### 로그에 “Out of memory” 오류가 표시됨

RAM을 너무 아끼셨습니다. 배포를 종료한 후 메모리를 최소 12Gi(권장 16Gi)로 설정해 다시 배포하세요.

#### 동기화가 너무 오래 걸림

“너무 오래”가 어느 정도인지 살펴보겠습니다.

-> **몇 시간**: 정상입니다.

-> **며칠**: 메인넷을 처음부터 동기화하는 경우 역시 정상입니다.

-> **몇 주**: 문제가 있을 수 있으니 로그에서 오류를 확인하세요.


### 비용 관리

Console 또는 Air에서 지출을 확인하세요.

-> **My Deployments** -> 배포 -> “Cost per month” 예상 비용을 확인합니다.

-> Air: Keplr의 AKT/ACT 잔액이 시간이 지나면서 줄어듭니다. Console: Console 결제 잔액이 줄어듭니다.


잔액이 부족해지면 Akash이 배포를 자동으로 종료합니다. **지갑을 주기적으로 충전**하거나 알림을 설정하세요.

#### 비용 절감

-> **테스트넷 사용**: 프로덕션이 아닌 테스트에 사용하면 비용이 50% 저렴합니다.

-> 빠른 동기화가 필요하지 않다면 **CPU/메모리를 낮춥니다**.

-> **더 저렴한 제공업체를 선택합니다**(항상 현명한 선택은 아닙니다. 가동 시간이 중요합니다).


### 메인넷과 테스트넷 비교

```markdown
----------------------------------------------------------------------------------
|            | Mainnet (default)               | Testnet                         |
---------------------------------------------------------------------------------|
| Purpose   | Production Zcash blockchain      | Testing and development         |
| Network   | ZEBRA_NETWORK__NETWORK=Mainnet   | ZEBRA_NETWORK__NETWORK=Testnet  |
| P2P Port  | 8233                             | 18233                           |
| RPC Port  | 8232                             | 18232                           |
| Sync time | Days                             | Hours                           |
| Storage   | 350GB+                           | 50GB                            |
| Resources | 4 CPU / 16GB RAM                 | 2 CPU / 8GB RAM                 |
| Cost      | ~$15/month                       | ~$5/month                       |
----------------------------------------------------------------------------------
```

배포 절차만 테스트하는 경우 테스트넷부터 시작하세요. 설정 방법은 위의 “테스트넷으로 전환” 섹션을 참조하세요.

### 추가 자료

**Akash Console**(웹 결제): [https://console.akash.network](https://console.akash.network)

**Akash Air**(네이티브 AKT/ACT + Keplr): [https://air.akash.network](https://air.akash.network)

**Akash 문서**: [https://akash.network/docs/](https://akash.network/docs/)

**Zebra 문서**: [https://zebra.zfnd.org/](https://zebra.zfnd.org/)

**Zcash 익스플로러**: [https://zechub.wiki/guides/blockchain-explorers](https://zechub.wiki/guides/blockchain-explorers)

**Akash Discord**: [https://discord.akash.network](https://discord.akash.network)(제공업체 문제 관련)
