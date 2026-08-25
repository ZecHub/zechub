# Akash Console을 통해 zcashd 배포하기

> **지원 중단됨. 사용하려는 노드를 배포하기 위해 이 가이드를 따르지 마세요.**
>
> zcashd는 2026년 7월 18일에 자동 End-of-Support 중단 상태에 도달했습니다. 오늘 배포한 zcashd 노드는 체인 tip까지 동기화되지 않으므로, 배포는 매달 비용만 발생시키고 아무 결과도 만들어내지 않습니다.
>
> 대신 **Zebra**를 배포하세요: [Akash Network에서 Zebra 실행하는 방법](/guides/akash-network-zebra). 이 가이드는 동일한 Akash Console 워크플로를 다루며 디스크도 대략 3분의 1만 필요합니다. 기존 설정을 옮기는 경우 [zcashd에서 Zebra 및 Zallet로 마이그레이션 가이드](/guides/migration-guide-zcashd-to-zebrad-zallet)를 참고하세요.
>
> 이 페이지는 zcashd 배포에 대한 역사적 기록으로 유지됩니다.

[Akash Console](https://console.akash.network)을 사용해 zcashd Zcash 풀 노드(Electric Coin Co 구현)를 배포하는 가이드입니다. 아래에 비디오 튜토리얼이 있습니다. 더 자세한 가이드는 그 아래에서 확인할 수 있습니다.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/SVekeNU6_-g"
    title="Zcash Full Node setup on Akash Network"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## 배포할 내용

다음과 같은 zcashd 풀 노드입니다:

-> 전체 Zcash 블록체인을 동기화합니다(mainnet은 350GB+, testnet은 약 40GB)

-> AKT 토큰 가격에 따라 월 약 $15의 비용이 듭니다

-> 완전히 동기화되는 데 몇 시간에서 며칠이 걸립니다

-> 4 vCPU, 16GB RAM, 350GB 스토리지(mainnet) 또는 2 vCPU, 8GB RAM, 50GB(testnet)를 사용합니다

-> 첫 실행 시 암호학 파라미터를 다운로드합니다(~ 2GB, 1회)

**zcashd vs Zebra:**

-> zcashd는 Electric Coin Co가 만든 원래 Zcash 노드 구현이며, 2026년 7월 18일부터 중단되었습니다

-> Zcash Foundation의 Zebra가 오늘날 사용되는 풀 노드입니다

-> 현재 체인을 따라가는 것은 Zebra뿐이며, zcashd 노드는 tip에 도달할 수 없습니다

-> zcashd의 지갑은 [Zallet](/using-zcash/zallet-quick-reference-guide)로 대체되었습니다

-> 지갑 기능이나 특정 RPC API가 필요하다면 zcashd를 사용하세요


### **중요: Akash의 포트 매핑**

Akash에서 포트를 노출할 때(예: zcashd P2P용 포트 8233), 그 포트가 공급자의 공인 IP에서 **정확히 그 포트에 바인딩되지는 않습니다**. 대신 공급자가 임의의 높은 포트(예: 31234 또는 42567)를 할당하고, 이를 컨테이너의 포트 8233으로 리버스 프록시합니다.

이것은 설계상 의도된 동작입니다. 공급자는 여러 배포를 실행하므로, 모두가 포트 8233을 직접 사용하려 하면 충돌이 발생합니다.

**이것이 의미하는 바:**

-> SDL에서 포트 8233을 설정합니다(zcashd의 표준 P2P 포트)

-> Akash가 *provider.com:31234* 같은 URI를 제공합니다

-> 다른 Zcash 노드들은 *provider.com:31234*로 연결합니다

-> 컨테이너 내부에서는 zcashd가 여전히 8233에서 수신 대기합니다


이 과정은 자동으로 처리됩니다. Akash가 제공하는 URI만 사용하면 됩니다.

## 사전 준비 사항

-> **Keplr Wallet** 브라우저 확장 프로그램 설치(Chrome/Brave/Firefox)

-> **AKT 토큰** - 거래소(Coinbase, Kraken, Osmosis)에서 50-100 AKT를 준비하세요

-> Console UI를 클릭해 진행할 **5분**


## 1단계: 지갑 연결

-> [https://console.akash.network](https://console.akash.network)로 이동합니다

-> 오른쪽 상단의 **"Connect Wallet"**을 클릭합니다

-> **Keplr**(또는 선호하는 Cosmos 지갑)를 선택합니다

-> Keplr 팝업이 뜨면 연결을 승인합니다


오른쪽 상단에 AKT 잔액이 표시되어야 합니다. 0이라면 먼저 지갑에 자금을 넣으세요.

## 2단계: 배포 생성

-> **"Deploy"** 버튼(페이지 중앙의 큰 파란 버튼)을 클릭합니다

-> **"Build your template"**를 선택합니다(또는 바로 SDL 업로드로 건너뜁니다)

### 옵션 A: SDL 파일 업로드(권장)

> **이 버튼은 중단된 노드를 배포합니다.** 동기화할 수 없는 노드에 대해 AKT 잔액에서 비용이 청구됩니다. 대신 [Zebra 가이드](/guides/akash-network-zebra)를 사용하세요.

[![Akash에서 배포하기](/content-images/deploy-with-akash-btn-74abb88d44.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zcashd)

### 옵션 B: SDL 편집기 사용

SDL을 수동으로 붙여넣고 싶다면:

-> *zcashd-akash.yml*의 내용을 복사합니다

-> SDL 편집기에 붙여넣습니다

-> 필요에 따라 수정합니다(아래 설정 섹션 참고)

-> **"Create Deployment"**를 클릭합니다


## 3단계: 보증금 검토 및 승인

Console에는 다음이 표시됩니다:

-> **배포 보증금**: 약 5 AKT(배포를 닫을 때 돌려받습니다)

-> **예상 비용**: SDL 가격 설정에 따라 계산됨


**"Approve"**를 클릭하고 Keplr에서 트랜잭션에 서명하세요.

## 4단계: 공급자 선택

약 30초 후 공급자들의 입찰이 표시됩니다. 각 입찰에는 다음이 표시됩니다:

-> **블록당 가격**(AKT 또는 USDC)

-> **월간 예상 비용**

-> **공급자 세부 정보**(가동 시간, 지역 등)


**가장 저렴한 것만 고르지 마세요.** 다음을 확인하세요:

-> 가동 시간 % (> 95% 권장)

-> 지역 (가까울수록 지연 시간이 더 좋지만, 블록체인 노드에는 큰 차이가 없습니다)

-> 감사 완료 상태 (초록 체크 표시 = 더 신뢰할 수 있음)


선택한 공급자의 **"Accept Bid"**를 클릭하고 Keplr에서 서명하세요.

## 5단계: 배포 대기

Console은 다음을 수행합니다:

-> 선택한 공급자와 lease를 생성합니다

-> manifest를 전송합니다(공급자에게 무엇을 실행할지 알려줌)

-> 컨테이너를 시작합니다


이 과정은 1-2분 걸립니다. UI에서 상태 업데이트를 볼 수 있습니다.

## 6단계: 실행 확인

배포가 완료되면 다음이 표시됩니다:

-> **Services** 탭: 상태와 함께 *zcashd* 서비스를 표시합니다

-> **Logs** 탭: zcashd 노드의 실시간 로그

-> **Leases** 탭: 배포 세부 정보(DSEQ, 공급자, 비용)


### 로그 확인

**Logs**를 클릭하면 zcashd가 시작되는 것이 보여야 합니다:

```bash
[zcashd]: ZCASHD_NETWORK=mainnet
[zcashd]: Starting: zcashd -printtoconsole -showmetrics=1
...
```

**첫 실행 시 zcash-params(~2GB)를 다운로드합니다.** 이것은 1회성 작업이며 공급자의 대역폭에 따라 5-10분이 걸립니다. 이후 재시작에서는 이 과정을 건너뜁니다.

동기화에는 네트워크에 따라 **몇 시간에서 며칠**이 걸립니다. 다음을 확인하세요:

-> 블록 높이가 증가하는지

-> 피어 연결 수(10-30 피어 정도여야 함)

-> 반복되는 오류가 없는지


## 7단계: 노드 주소 확인

**Leases** 탭을 클릭한 다음 **URIs**를 클릭하세요.

다음과 비슷한 내용이 표시됩니다:

```
zcashd-8233: provider-hostname.com:31234
```

이것이 노드의 **공개 P2P 엔드포인트**입니다. 다른 Zcash 노드들이 이 주소로 연결합니다.

**포트 매핑 참고:** SDL에서는 포트 8233을 설정했지만, Akash는 이를 다른 공인 포트(이 예시에서는 31234)로 할당했습니다. 이것은 정상입니다. 헷갈린다면 상단의 "Akash의 포트 매핑" 섹션을 참고하세요. 노드는 반드시 8233이 아니라, 여기서 Akash가 보여주는 포트에서 접근 가능합니다.

RPC를 활성화했다면(SDL에서는 기본적으로 주석 처리됨), 고유한 매핑 포트와 함께 RPC 엔드포인트도 여기에 표시됩니다.

## 설정 옵션

### Testnet으로 전환

SDL 기본값은 Mainnet입니다. 대신 Testnet을 사용하려면:

-> *env* 섹션에서 **네트워크를 변경**합니다:

   ```yaml
   # - "ZCASHD_NETWORK=mainnet"
   - "ZCASHD_NETWORK=testnet"
   ```

-> *expose* 섹션에서 **노출 포트**를 업데이트합니다:

   ```yaml
   # Mainnet 포트를 주석 처리:
   # - port: 8233
   #   as: 8233
   #   to:
   #     - global: true
   #   proto: tcp

   # Testnet 포트의 주석 해제:
   - port: 18233
     as: 18233
     to:
       - global: true
     proto: tcp
   ```

-> 선택 사항: *profiles.compute.zcashd.resources*에서 Testnet용으로 **리소스를 줄입니다**:

   ```yaml
   cpu:
     units: 2  # 4에서 감소
   memory:
     size: 8Gi  # 16Gi에서 감소
   storage:
     - size: 50Gi  # 150Gi에서 감소
   ```

-> 선택 사항: *profiles.placement.akash.pricing*에서 **가격을 낮춥니다**:

   ```yaml
   amount: 5000  # 10000에서 감소
   ```

> 가격을 낮추면 공급자가 입찰하지 않도록 걸러질 수 있습니다. 이 값을 조정해 보거나, 공급자 endpoint를 사용해 입찰 여부를 확인하세요. (공급자 API 문서 검토)

### RPC 접근 활성화

보안을 위해 RPC는 기본적으로 비활성화되어 있습니다. 활성화하려면:

**중요: 강력한 자격 증명을 설정하세요.** zcashd RPC는 사용자 이름/비밀번호를 HTTP(HTTPS 아님)로 전송합니다. 보안상 의미를 이해하는 경우에만 RPC를 노출하세요.

-> *env* 섹션의 주석을 해제합니다:

   ```yaml
   - "ZCASHD_RPCUSER=yourusername"
   - "ZCASHD_RPCPASSWORD=your_very_strong_password_here"  # 실제 비밀번호 사용
   - "ZCASHD_RPCBIND=0.0.0.0"
   - "ZCASHD_RPCPORT=8232"  # Mainnet
   # - "ZCASHD_RPCPORT=18232"  # Testnet
   - "ZCASHD_ALLOWIP=0.0.0.0/0"  # 어디서나 허용 (주의해서 사용)
   ```

-> *expose*에서 RPC 포트의 주석을 해제합니다:

   **Mainnet용:**

   ```yaml
   - port: 8232
     as: 8232
     to:
       - global: false  # 보안을 위해 내부 유지
     proto: tcp
   ```

   **Testnet용:**

   ```yaml
   - port: 18232
     as: 18232
     to:
       - global: false
     proto: tcp
   ```

**경고**: RPC에 대해 *global: true*를 설정하면 기본 인증만 걸린 상태로 인터넷에 노출됩니다. 좋지 않은 방법입니다. *global: false*를 사용하고 Akash 내부 네트워크를 통해 RPC에 접근하거나 안전한 터널을 설정하세요.

**포트 매핑 다시 참고:** RPC를 전역으로 노출하더라도, Akash는 이를 임의의 높은 포트(8232/18232 아님)로 매핑합니다. 실제 공개 엔드포인트는 배포의 URIs에서 확인하세요. *global: false*(권장)의 경우 RPC 엔드포인트는 공용 인터넷이 아니라 Akash 배포 네트워크 내부에서만 접근 가능합니다.

### 트랜잭션 인덱스 활성화

트랜잭션 인덱스를 사용하면 RPC를 통해 ID로 모든 트랜잭션을 조회할 수 있습니다. 더 많은 스토리지를 사용합니다(~ 20% 증가).

*env*에서 주석을 해제하세요:

```yaml
- "ZCASHD_TXINDEX=1"
```

**경고**: 이미 동기화된 기존 노드에서 txindex를 활성화하면 전체 블록체인을 다시 인덱싱해야 하며, 몇 시간이 걸립니다.

### Insight Explorer 활성화

Insight Explorer는 블록체인 데이터용 추가 REST API 엔드포인트를 제공합니다(블록 탐색기에 유용함).

*env*에서 주석을 해제하세요:

```yaml
- "ZCASHD_INSIGHTEXPLORER=1"
```

이렇게 하면 txindex가 자동으로 활성화되고 추가 RPC 메서드가 추가됩니다.

### Prometheus 메트릭 활성화

모니터링을 위해 메트릭을 스크랩하려면:

-> *env*에서 주석을 해제합니다:

   ```bash
   - "ZCASHD_PROMETHEUSPORT=9969"
   - "ZCASHD_METRICSIP=0.0.0.0/0"
   ```

-> *expose*에서 메트릭 포트의 주석을 해제합니다:

   ```bash
   - port: 9969
     as: 9969
     to:
       - global: false
     proto: tcp
   ```
   
메트릭은 Prometheus 형식으로 http://yourendpoint:9969/metrics 에서 사용할 수 있습니다.

### 리소스/가격 조정

입찰이 들어오지 않거나 비용을 최적화하고 싶다면:

**사양이 낮은 공급자용으로**, *profiles.compute.zcashd.resources* 섹션에서 다음을 줄이세요:

-> CPU: *units: 2* (합리적인 동기화 속도를 위한 최소값)

-> 메모리: *size: 12Gi* (안정성을 위한 최소값)

-> 스토리지: *size: 120Gi* (mainnet용 최소값)


**더 많은 입찰을 유도하려면**, *profiles.placement.akash.pricing*에서 다음을 늘리세요:

-> Mainnet: *amount: 15000* uakt/block 시도

-> Testnet: *amount: 7500* uakt/block 시도


SDL 값은 보수적으로 높게 설정되어 있습니다. 대부분의 공급자는 더 낮은 가격으로 입찰합니다.

## 배포 업데이트

배포 후 설정을 변경해야 하나요?

-> Console에서 **My Deployments**로 이동합니다

-> zcashd 배포를 찾습니다

-> **"Update Deployment"**를 클릭합니다

-> SDL을 편집합니다

-> **"Update"**를 클릭하고 Keplr에서 승인합니다


**참고**: 업데이트하면 컨테이너가 재시작됩니다. 노드는 저장된 상태(영구 스토리지)에서 재개되지만, 1-2분의 다운타임은 예상하세요.

## 모니터링

### Console을 통해

-> **Logs 탭**: 실시간 컨테이너 로그

-> **Shell 탭**: 컨테이너 내부 셸 접근(디버깅에 유용)

-> **Events 탭**: Kubernetes 이벤트(문제가 생기지 않는 한 대부분 쓸모 없음)


### RPC를 통해(활성화한 경우)

RPC를 활성화했다면, 일반 zcashd 풀 노드처럼 노드를 조회할 수 있습니다(실제로 그렇기 때문입니다!)

### zcash-cli 대안

Console을 통해 셸에 접근할 수 있다면, *zcash-cli*를 직접 사용할 수 있습니다:

```bash
# Console의 Shell 탭에서
zcash-cli getblockchaininfo
zcash-cli getpeerinfo
zcash-cli getinfo
```

## 배포 종료

작업이 끝났거나 비용 지불을 중단하고 싶다면:

-> **My Deployments**로 이동합니다

-> zcashd 배포를 찾습니다

-> **"Close Deployment"**를 클릭합니다

-> 확인하고 Keplr에서 서명합니다


5 AKT 보증금은 환불됩니다. **영구 스토리지**는 공급자가 보존해야 하지만, 그것에 의존하지 마세요. 다른 클라우드 공급자와 마찬가지로 취급하세요.

## 문제 해결

### "Insufficient funds" 오류

AKT가 더 필요합니다. Keplr 지갑에 자금을 넣으세요.

### 입찰이 전혀 표시되지 않음

다음 중 하나입니다:

-> 가격이 너무 낮습니다(SDL에서 *amount* 증가)

-> 리소스 요구 사항이 가용 공급자에게 너무 높습니다(CPU/메모리/스토리지 감소)

-> 더 기다리세요(입찰이 나타나는 데 60-90초 걸리는 경우도 있습니다)


### 배포가 "pending" 상태에 멈춤

공급자에 문제가 있을 수 있습니다. 배포를 닫고 다른 공급자로 다시 시도하세요.

### zcashd 로그에 "No peers connected"가 표시됨

2026년 7월 18일 End-of-Support 중단 이후, 이것은 시작 지연이 아니라 예상되는 영구 상태이며, 기다리거나 다시 배포해도 해결되지 않습니다. 대신 [Zebra](/guides/akash-network-zebra)를 배포하세요.

### 로그에 "Out of memory" 오류

RAM을 너무 아꼈습니다. 배포를 닫고 최소 12Gi 메모리(권장 16Gi)로 다시 배포하세요.

### 동기화가 너무 오래 걸림

"너무 오래"의 기준:

-> **몇 시간**: 정상

-> **며칠**: mainnet을 처음부터 동기화할 때 역시 정상

-> **몇 주**: 문제가 있습니다. 로그에서 오류를 확인하세요


### "Error fetching zcash-params"

공급자의 네트워크 문제이거나 대역폭이 느릴 수 있습니다. 보통은 저절로 해결됩니다. 30분 이상 지속되면 다른 공급자로 다시 배포해 보세요.

### RPC 인증 실패

-> *ZCASHD_RPCUSER*와 *ZCASHD_RPCPASSWORD*가 올바르게 설정되었는지 확인하세요

-> 올바른 포트를 사용하고 있는지 확인하세요(mainnet은 8232, testnet은 18232)

-> 포트는 Akash가 매핑한다는 점을 기억하세요. 8232에 직접 연결하지 말고 배포의 URI를 사용하세요


## 비용 관리

Console에서 지출을 모니터링하세요:

-> **My Deployments** -> 해당 배포 -> "Cost per month" 예상치 표시

-> Keplr 지갑 잔액은 시간이 지나면서 감소합니다


잔액이 부족해지면 Akash가 배포를 자동 종료합니다. **정기적으로 지갑을 충전**하거나 알림을 설정하세요.

### 비용 절감

-> 프로덕션이 아닌 테스트에는 **Testnet 사용**(50% 더 저렴)

-> 빠른 동기화가 필요 없다면 **CPU/메모리 감소**

-> **더 저렴한 공급자 선택**(항상 현명한 것은 아님 - 가동 시간이 중요함)

-> AKT 가격 변동성이 크다면 **AKT 대신 USDC 사용**(SDL 가격 변경 필요)

-> 필요 없다면 **txindex 비활성화**(~ 20% 스토리지 절약)


### 추가 자료

**Akash Console**: [https://console.akash.network](https://console.akash.network)

**Akash 문서**: [https://akash.network/docs/](https://akash.network/docs/)

**Zcash 탐색기**: [https://zechub.wiki/using-zcash/blockchain-explorers](https://zechub.wiki/using-zcash/blockchain-explorers)

**Akash Discord**: [https://discord.akash.network](https://discord.akash.network) (공급자 문제용)

## 최종 참고 사항

- **영구 스토리지는 중요합니다.** *persistent: true*를 빼먹거나 *beta2* 클래스를 사용하지 마세요. *beta3*를 사용하세요.
- **초기 동기화는 느립니다.** 인내심을 가지세요. 블록체인 노드에서는 정상입니다.
- **지갑에 자금을 유지하세요.** AKT가 떨어지면 배포가 자동 종료됩니다.
- **백업은 자동이 아닙니다.** 데이터가 중요하다면 사라질 수 있다고 가정하고 대비하세요.
- **RPC 보안은 매우 중요합니다.** 적절한 보안 조치 없이 RPC를 인터넷에 노출하지 마세요.
- **zcash-params는 캐시됩니다.** 첫 실행 시 약 2GB의 암호학 파라미터를 다운로드합니다. 이는 정상이며 한 번만 발생합니다.
