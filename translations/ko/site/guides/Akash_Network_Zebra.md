# Akash 네트워크에서 Zebra 실행 방법

[Akash Console](https://console.akash.network)을 사용하여 Zcash 전체 노드를 배포하는 단계별 가이드입니다.

### 배포 중인 내용

다음과 같은 기능을 갖는 전체 Zebra 노드:

-> Zcash 블록체인 전체 동기화 (메인넷의 경우 100GB 이상, 테스트넷의 경우 약 40GB)

-> AKT 토큰 가격에 따라 월 약 $15 비용 발생

-> 완전히 동기화하는 데 수시간에서 수일이 소요됨

-> 메인넷의 경우 4 vCPU, 16GB RAM, 350GB 저장공간 또는 테스트넷의 경우 2 vCPU, 8GB RAM, 50GB 저장공간 사용


### 중요한 주의사항: Akash에서 포트 매핑

Akash에서 포트를 노출시키는 경우 (예: Zebra P2P용 포트 8233) **그 정확한 포트에 바인딩되지 않습니다**. 대신, 제공자는 랜덤 고포트(예: 31234 또는 42567)를 할당하고, 이를 컨테이너의 포트 8233로 역프록시합니다.

이는 설계상 특징입니다 - 제공자가 여러 배포를 실행하므로, 모두가 직접 포트 8233을 사용하면 충돌이 발생할 수 있습니다.

**당신에게 의미하는 바:**

-> SDL에서 포트 8233을 구성 (Zebra의 표준 P2P 포트)

-> Akash은 *provider.com:31234*와 같은 URI를 제공합니다

-> 다른 Zcash 노드는 *provider.com:31234*에 연결합니다

-> 컨테이너 내부에서는 Zebra가 여전히 8233 포트에서 수신 대기 상태입니다


이 작업은 자동으로 처리됩니다. Akash이 제공하는 URI를 사용하면 됩니다.

### 사전 조건

1. **Keplr Wallet** 브라우저 확장 프로그램 설치 (Chrome/Brave/Firefox)
2. **AKT 토큰** - Coinbase, Kraken, Osmosis 등에서 50-100 AKT 구매
3. **5분** - 콘솔 UI를 클릭하는 데 소요됨

#### 단계 1: 지갑 연결

-> [https://console.akash.network](https://console.akash.network)로 이동

-> 오른쪽 상단에 있는 **"Connect Wallet"**(지갑 연결)을 클릭

-> **Keplr** (또는 선호하는 Cosmos 지갑) 선택

-> Keplr이 팝업될 때 연결 승인


AKT 잔액이 오른쪽 상단에 표시됩니다. 0이라면 먼저 지갑을 충전해야 합니다.

#### 단계 2: 배포 생성

-> **"Deploy"**(배포) 버튼 클릭 (화면 중앙의 큰 파란색 버튼)

-> **"Build your template"**(템플릿 만들기) 선택 (또는 SDL 업로드로 바로 이동)


##### 옵션 A: SDL 파일 업로드 (추천)

[![Akash에서 배포](https://raw.githubusercontent.com/akash-network/console/refs/heads/main/apps/deploy-web/public/images/deploy-with-akash-btn.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zebra)

##### 옵션 B: SDL 편집기 사용

SDL 파일을 수동으로 붙여넣고 싶다면 [the SDL](https://github.com/akash-network/awesome-akash/blob/master/zcash-zebra/deploy.yaml)을 참조하세요:

-> *zebra-akash.yml*의 내용 복사

-> SDL 편집기에 붙여넣기

-> 필요에 따라 수정 (아래 구성 섹션 참조)

-> **"Create Deployment"**(배포 생성) 클릭


#### 단계 3: 배포 및 예치금 승인 검토

콘솔은 다음과 같은 정보를 표시합니다:

-> **배포 예치금**: 약 5 AKT (배포 종료 시 환불)

-> **예상 비용**: SDL 가격 기준으로 계산됨

Keplr에서 거래를 승인하고 **"Approve"**(승인)을 클릭합니다.

#### 단계 4: 제공자 선택

약 30초 후, 제공자의 입찰이 표시됩니다. 각 입찰은 다음과 같은 정보를 보여줍니다:

-> **블록당 가격** (AKT 또는 USDC로 표시)

-> **월별 예상 비용**

-> **제공자 세부정보** (업타임, 지역 등)


**가장 저렴한 제공자를 선택하지 마세요.** 확인해야 할 사항:

-> 업타임 % (95% 이상이 목표)

-> 지역 (근접할수록 지연 시간이 줄어들지만 블록체인 노드에는 큰 영향 없음)

-> 감사 상태 (녹색 체크마크 = 더 신뢰 가능)


선택한 제공자에서 **"Accept Bid"**(입찰 수락)을 클릭하고 Keplr에서 서명합니다.

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

```bash
zebra-8233: provider-hostname.com:31234
```

이것은 노드의 **공개 P2P 엔드포인트**입니다. 다른 Zcash 노드는 이 주소로 연결됩니다.

**포트 매핑 주의사항:** SDL에서 포트 8233을 구성했지만, Akash에서는 다른 공용 포트(예: 여기서는 31234)를 할당합니다. 이는 정상입니다 - 위에 있는 "Akash에서 포트 매핑" 섹션을 참조하세요. 노드는 Akash이 표시하는 포트에서 접근 가능하며, 반드시 8233일 필요는 없습니다.

RPC를 활성화했다면 (기본적으로 SDL에서 주석 처리됨), 여기서 RPC 엔드포인트와 해당 매핑된 포트도 볼 수 있습니다.

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

**포트 매핑 상기:** RPC를 전역으로 노출시키더라도 Akash는 랜덤 고포트(8232/18232가 아님)로 매핑합니다. 배포의 URIs를 확인하여 실제 공용 엔드포인트를 알아보세요. *global: false* (권장)이면 RPC 엔드포인트는 Akash 배포 네트워크 내부에서만 접근 가능하며, 공개 인터넷에서는 접근 불가합니다.

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

-> **"Update"**(업데이트) 클릭 및 Keplr에서 승인

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

-> 확인 및 Keplr에서 서명

5 AKT 예치금이 환불됩니다. **지속적 저장공간**은 제공자가 보존해야 하지만, 다른 클라우드 제공자와 마찬가지로 이를 의존하지 마세요.

### 문제 해결

#### "Insufficient funds" 오류

더 많은 AKT가 필요합니다. Keplr 지갑을 충전하세요.

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

콘솔에서 사용량을 모니터링하세요:

-> **My Deployments** -> 배포 -> "Cost per month" 예상값 표시

-> Keplr 지갑 잔액이 시간이 지남에 따라 감소합니다.


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

**Akash 콘솔**: [https://console.akash.network](https://console.akash.network)

**Akash 문서**: [https://akash.network/docs/](https://akash.network/docs/)

**Zebra 문서**: [https://zebra.zfnd.org/](https://zebra.zfnd.org/)

**Zcash 탐색기**: [https://zechub.wiki/using-zcash/blockchain-explorers](https://zechub.wiki/using-zcash/blockchain-explorers)

**Akash 디스코드**: [https://discord.akash.network](https://discord.akash.network) (제공자 문제에 대해)
