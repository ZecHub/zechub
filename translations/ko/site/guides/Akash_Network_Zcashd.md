# 콘솔을 통해 zcashd를 Akash에 배포하기

> **지원이 종료된 문서입니다. 실제로 사용할 노드를 배포할 때 이 가이드를 따르지 마세요.**
>
> zcashd은 2026년 7월 18일 자동 지원 종료 중단 시점에 도달했습니다. 지금 zcashd 노드를 배포해도 체인의 최신 블록까지 동기화되지 않으므로, 매달 배포 비용만 들고 아무것도 얻지 못합니다.
>
> 대신 **Zebra**를 배포하세요. [Zebra를 Akash Network에서 실행하는 방법](/guides/akash-network-zebra)에서는 동일한 Akash Console 작업 흐름을 다루며, 디스크 용량은 대략 3분의 1만 필요합니다. 기존 설정을 옮기려면 [zcashd를 Zebra 및 Zallet로 마이그레이션하는 가이드](/guides/migration-guide-zcashd-to-zebrad-zallet)를 참조하세요.
>
> 이 페이지는 zcashd 배포에 관한 역사적 기록으로 보존되어 있습니다.

[Akash Console](https://console.akash.network)을 사용하여 zcashd Zcash 풀 노드(Electric Coin Co 구현)를 배포하는 가이드입니다. 아래에서 동영상 튜토리얼을 확인하실 수 있습니다. 더 자세한 가이드도 아래에서 확인할 수 있습니다.

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


## 배포 대상

다음과 같은 풀 zcashd 노드입니다.

-> Zcash 블록체인 전체를 동기화합니다(메인넷은 350GB 이상, 테스트넷은 약 40GB).

-> AKT 토큰 가격에 따라 월 약 $15의 비용이 듭니다.

-> 완전히 동기화하는 데 몇 시간에서 며칠까지 걸립니다.

-> 4 vCPU, 16GB RAM, 350GB 저장 공간(메인넷) 또는 2 vCPU, 8GB RAM, 50GB 저장 공간(테스트넷)을 사용합니다.

-> 처음 실행할 때 암호화 파라미터를 다운로드합니다(약 2GB, 1회).

**zcashd과 Zebra의 차이:**

-> zcashd는 Electric Coin Co이 개발한 최초의 Zcash 노드 구현이며, 2026년 7월 18일부터 중단된 상태입니다.

-> Zcash Foundation의 Zebra가 현재 사용되는 풀 노드입니다.

-> 현재 체인을 따라가는 것은 Zebra뿐이며, zcashd 노드는 최신 블록에 도달할 수 없습니다.

-> zcashd의 지갑은 [Zallet](/using-zcash/zallet-quick-reference-guide)로 대체되었습니다.

-> 지갑 기능이나 특정 RPC API가 필요하다면 zcashd를 사용하세요.


### **중요: Akash의 포트 매핑**

Akash에서 포트(예: zcashd P2P용 포트 8233)를 공개하더라도, 제공업체의 공용 IP에서 **해당 포트에 직접 바인딩되지는 않습니다**. 대신 제공업체가 임의의 높은 포트(예: 31234 또는 42567)를 할당하고, 이 포트를 컨테이너의 포트 8233으로 역방향 프록시합니다.

이는 의도된 동작입니다. 제공업체는 여러 배포를 운영하므로, 모두가 포트 8233을 직접 사용하려 하면 충돌이 발생합니다.

**이것이 의미하는 바:**

-> SDL에서 포트 8233을 설정합니다(zcashd의 표준 P2P 포트).

-> Akash에서 *provider.com:31234*와 같은 URI를 제공합니다.

-> 다른 Zcash 노드는 *provider.com:31234*로 연결합니다.

-> 컨테이너 내부에서는 zcashd가 계속 포트 8233에서 수신 대기합니다.


이 과정은 자동으로 처리됩니다. Akash에서 제공한 URI를 사용하세요.

## 사전 준비 사항

-> **Keplr Wallet** 브라우저 확장 프로그램 설치(Chrome/Brave/Firefox)

-> **AKT 토큰** — 거래소(Coinbase, Kraken, Osmosis)에서 50~100 AKT를 준비하세요.

-> Console UI에서 클릭을 진행하는 데 **5분**

## 1단계: 지갑 연결하기

-> [https://console.akash.network](https://console.akash.network)로 이동합니다.

-> 오른쪽 위의 **“Connect Wallet”**을 클릭합니다.

-> **Keplr**(또는 원하는 Cosmos 지갑)을 선택합니다.

-> Keplr 팝업이 나타나면 연결을 승인합니다.


오른쪽 위에 AKT 잔액이 표시되어야 합니다. 잔액이 0이라면 먼저 지갑에 자금을 입금하세요.

## 2단계: 배포 만들기

-> **“Deploy”** 버튼(페이지 중앙의 큰 파란색 버튼)을 클릭합니다.

-> **“Build your template”**을 선택합니다(SDL을 바로 업로드하려면 이 단계를 건너뛰어도 됩니다).

### 옵션 A: SDL 파일 업로드(권장)

> **이 버튼을 사용하면 중단된 노드가 배포됩니다.** 동기화할 수 없는 노드에 AKT 잔액이 청구됩니다. 대신 [Zebra 가이드](/guides/akash-network-zebra)를 사용하세요.

[![Deploy on Akash](/content-images/deploy-with-akash-btn-74abb88d44.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zcashd)

### 옵션 B: SDL 편집기 사용

SDL을 직접 붙여넣으려면 다음과 같이 하세요.

-> *zcashd-akash.yml*의 내용을 복사합니다.

-> SDL 편집기에 붙여넣습니다.

-> 필요에 따라 수정합니다(아래의 설정 섹션 참조).

-> **“Create Deployment”**를 클릭합니다.


## 3단계: 입금 검토 및 승인

Console에 다음 정보가 표시됩니다.

-> **배포 보증금**: 약 5 AKT(배포를 종료하면 돌려받습니다).

-> **예상 비용**: SDL 가격을 기준으로 합니다.


**“Approve”**를 클릭하고 Keplr에서 거래에 서명합니다.

## 4단계: 제공업체 선택하기

약 30초 후 제공업체의 입찰을 확인할 수 있습니다. 각 입찰에는 다음 정보가 표시됩니다.

-> **블록당 가격**(AKT 또는 USDC)

-> **월간 예상 비용**

-> **제공업체 정보**(가동 시간, 지역 등)


**가장 저렴한 곳만 고르지 마세요.** 다음을 확인하세요.

-> 가동 시간 비율(95% 초과를 목표로 하세요).

-> 지역(가까울수록 지연 시간이 짧지만 블록체인 노드에는 큰 차이가 없습니다).

-> 감사 여부(초록색 확인 표시는 더 신뢰할 수 있다는 뜻입니다).


선택한 제공업체의 **“Accept Bid”**를 클릭하고 Keplr에서 로그인합니다.

## 5단계: 배포 대기하기

Console에서 다음 작업을 수행합니다.

-> 선택한 제공업체와 임대를 생성합니다.

-> 매니페스트를 전송합니다(제공업체에 실행할 항목을 알립니다).

-> 컨테이너를 시작합니다.


이 과정은 1~2분 정도 걸립니다. UI에서 상태 업데이트를 확인할 수 있습니다.

## 6단계: 실행 여부 확인하기

배포가 완료되면 다음 항목이 표시됩니다.

-> **Services** 탭: 상태와 함께 *zcashd* 서비스가 표시됩니다.

-> **Logs** 탭: zcashd 노드의 실시간 로그가 표시됩니다.

-> **Leases** 탭: 배포 세부 정보(DSEQ, 제공업체, 비용)가 표시됩니다.


### 로그 확인하기

**Logs**를 클릭하면 zcashd의 시작 과정이 표시됩니다.

```bash
[zcashd]: ZCASHD_NETWORK=mainnet
[zcashd]: Starting: zcashd -printtoconsole -showmetrics=1
...
```

**처음 실행할 때 zcash-params(약 2GB)를 다운로드합니다.** 이 작업은 한 번만 수행되며, 제공업체의 대역폭에 따라 5~10분 정도 걸립니다. 이후 다시 시작할 때는 다운로드를 건너뜁니다.

네트워크에 따라 동기화에는 **몇 시간에서 며칠**이 걸립니다. 다음 항목을 확인하세요.

-> 블록 높이가 증가하는지 확인합니다.

-> 피어가 연결되는지 확인합니다(10~30개가 적당합니다).

-> 오류가 반복적으로 발생하지 않는지 확인합니다.


## 7단계: 노드 주소 가져오기

**Leases** 탭을 클릭한 다음 **URIs**를 클릭합니다.

다음과 같은 항목이 표시됩니다.

```
zcashd-8233: provider-hostname.com:31234
```

이것은 노드의 **공용 P2P 엔드포인트**입니다. 다른 Zcash 노드는 이 주소로 연결합니다.

**포트 매핑에 유의하세요:** SDL에서 포트 8233을 설정했지만 Akash에서 다른 공용 포트(이 예시에서는 31234)에 매핑했습니다. 이는 정상입니다. 혼란스럽다면 위의 “Akash의 포트 매핑” 섹션을 참조하세요. 노드는 반드시 8233 포트가 아니라 Akash에 표시된 포트에서 연결할 수 있습니다.

RPC를 활성화했다면(SDL에서는 기본적으로 주석 처리되어 있음), 여기에 별도로 매핑된 포트와 함께 RPC 엔드포인트도 표시됩니다.

## 설정 옵션

### 테스트넷으로 전환하기

SDL은 기본적으로 메인넷으로 설정되어 있습니다. 테스트넷을 사용하려면 다음과 같이 하세요.

-> ***env* 섹션에서 네트워크를 변경합니다.**

   ```yaml
   # - "ZCASHD_NETWORK=mainnet"
   - "ZCASHD_NETWORK=testnet"
   ```

-> ***expose* 섹션에서 공개 포트를 업데이트합니다.**

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

-> **선택 사항: 테스트넷의 리소스를 줄이려면** *profiles.compute.zcashd.resources*를 수정합니다.

   ```yaml
   cpu:
     units: 2  # Down from 4
   memory:
     size: 8Gi  # Down from 16Gi
   storage:
     - size: 50Gi  # Down from 150Gi
   ```

-> **선택 사항: 가격을 낮추려면** *profiles.placement.akash.pricing*을 수정합니다.

   ```yaml
   amount: 5000  # Down from 10000
   ```

> 가격을 낮추면 제공업체의 입찰이 줄어들 수 있습니다. 이 값을 조정해 보거나 제공업체 엔드포인트를 사용해 입찰 여부를 확인하세요. (제공업체 API 문서를 참조하세요.)

### RPC 액세스 활성화하기

보안을 위해 RPC는 기본적으로 비활성화되어 있습니다. 활성화하려면 다음과 같이 하세요.

**중요: 강력한 자격 증명을 설정하세요.** zcashd RPC는 HTTP(HTTPS가 아님)를 통해 사용자 이름과 비밀번호를 전송합니다. 보안상 영향을 이해하는 경우에만 RPC를 공개하세요.

-> *env* 섹션의 주석 처리를 해제합니다.

   ```yaml
   - "ZCASHD_RPCUSER=yourusername"
   - "ZCASHD_RPCPASSWORD=your_very_strong_password_here"  # Use a real password
   - "ZCASHD_RPCBIND=0.0.0.0"
   - "ZCASHD_RPCPORT=8232"  # Mainnet
   # - "ZCASHD_RPCPORT=18232"  # Testnet
   - "ZCASHD_ALLOWIP=0.0.0.0/0"  # Allow from anywhere (use with caution)
   ```

-> *expose*에서 RPC 포트의 주석 처리를 해제합니다.

   **메인넷의 경우:**

   ```yaml
   - port: 8232
     as: 8232
     to:
       - global: false  # Keep internal for security
     proto: tcp
   ```

   **테스트넷의 경우:**

   ```yaml
   - port: 18232
     as: 18232
     to:
       - global: false
     proto: tcp
   ```

**경고**: RPC에 *global: true*를 설정하면 기본 인증이 적용된 상태로 인터넷에 공개됩니다. 이는 좋지 않은 방법입니다. *global: false*를 사용하고 Akash의 내부 네트워크를 통해 RPC에 액세스하거나 보안 터널을 설정하세요.

**포트 매핑 알림**: RPC를 전역으로 공개하더라도 Akash에서 임의의 높은 포트에 매핑합니다(8232/18232가 아님). 배포의 URIs를 확인해 실제 공용 엔드포인트를 확인하세요. *global: false*(권장)인 경우 RPC 엔드포인트는 Akash 배포 네트워크 안에서만 액세스할 수 있으며, 공용 인터넷에서는 액세스할 수 없습니다.

### 거래 인덱스 활성화하기

거래 인덱스를 사용하면 RPC를 통해 ID로 거래를 조회할 수 있습니다. 저장 공간을 더 사용합니다(약 20% 증가).

*env*에서 주석 처리를 해제합니다.

```yaml
- "ZCASHD_TXINDEX=1"
```

**경고**: 이미 동기화된 노드에서 txindex를 활성화하면 블록체인 전체를 다시 인덱싱해야 하며, 이 작업에는 몇 시간이 걸립니다.

### Insight Explorer 활성화하기

Insight Explorer는 블록체인 데이터용 REST API 엔드포인트를 추가로 제공합니다(블록 탐색기에 유용합니다).

*env*에서 주석 처리를 해제합니다.

```yaml
- "ZCASHD_INSIGHTEXPLORER=1"
```

이 설정은 txindex를 자동으로 활성화하고 RPC 메서드를 추가합니다.

### Prometheus 메트릭 활성화하기

모니터링을 위해 메트릭을 수집하려면 다음과 같이 하세요.

-> *env*에서 주석 처리를 해제합니다.

   ```bash
   - "ZCASHD_PROMETHEUSPORT=9969"
   - "ZCASHD_METRICSIP=0.0.0.0/0"
   ```

-> *expose*에서 메트릭 포트의 주석 처리를 해제합니다.

   ```bash
   - port: 9969
     as: 9969
     to:
       - global: false
     proto: tcp
   ```
   
메트릭은 http://yourendpoint:9969/metrics에서 Prometheus 형식으로 제공됩니다.

### 리소스/가격 조정하기

입찰을 받지 못하거나 비용을 최적화하려면 다음과 같이 하세요.

**사양이 낮은 제공업체를 이용하려면** *profiles.compute.zcashd.resources* 섹션에서 다음 값을 줄입니다.

-> CPU: *units: 2*(적절한 동기화 속도를 위한 최소값)

-> 메모리: *size: 12Gi*(안정성을 위한 최소값)

-> 저장 공간: *size: 120Gi*(메인넷의 최소값)


**입찰을 더 많이 유도하려면** *profiles.placement.akash.pricing*의 값을 높입니다.

-> 메인넷: *amount: 15000* uakt/block을 시도해 보세요.

-> 테스트넷: *amount: 7500* uakt/block을 시도해 보세요.


SDL 값은 보수적으로 높게 설정되어 있습니다. 대부분의 제공업체는 이보다 낮은 가격으로 입찰합니다.

## 배포 업데이트하기

배포 후 설정을 변경해야 하나요?

-> Console에서 **My Deployments**로 이동합니다.

-> zcashd 배포를 찾습니다.

-> **“Update Deployment”**를 클릭합니다.

-> SDL을 편집합니다.

-> **“Update”**를 클릭하고 Keplr에서 승인합니다.


**참고**: 업데이트하면 컨테이너가 다시 시작됩니다. 노드는 저장된 상태(영구 저장 공간)에서 다시 시작되지만, 1~2분 동안 서비스가 중단될 수 있습니다.

## 모니터링

### Console 사용

-> **Logs 탭**: 컨테이너 로그를 실시간으로 표시합니다.

-> **Shell 탭**: 컨테이너 내부의 셸을 엽니다(디버깅에 유용합니다).

-> **Events 탭**: Kubernetes 이벤트를 표시합니다(문제가 발생한 경우가 아니라면 대부분 쓸모가 없습니다).


### RPC 사용(활성화한 경우)

RPC를 활성화했다면 일반 zcashd 풀 노드처럼 노드에 쿼리를 보낼 수 있습니다(실제로도 풀 노드입니다!).

### zcash-cli 대안

Console을 통해 셸에 액세스할 수 있다면 *zcash-cli*를 직접 사용할 수 있습니다.

```bash
# From the Shell tab in Console
zcash-cli getblockchaininfo
zcash-cli getpeerinfo
zcash-cli getinfo
```

## 배포 종료하기

사용을 마쳤거나 비용을 더 이상 지불하지 않으려면 다음과 같이 하세요.

-> **My Deployments**로 이동합니다.

-> zcashd 배포를 찾습니다.

-> **“Close Deployment”**를 클릭합니다.

-> Keplr에서 확인하고 서명합니다.


보증금 5 AKT가 환불됩니다. 제공업체가 **영구 저장 공간**을 보존해야 하지만, 이를 믿고 의존하지 마세요. 다른 클라우드 제공업체를 이용할 때처럼 취급하세요.

## 문제 해결

### “Insufficient funds” 오류

AKT가 더 필요합니다. Keplr 지갑에 자금을 입금하세요.

### 입찰이 표시되지 않는 경우

다음 중 하나일 수 있습니다.

-> 가격이 너무 낮습니다(SDL에서 *amount*를 높이세요).

-> 리소스 요구 사항이 이용 가능한 제공업체의 사양을 초과합니다(CPU/메모리/저장 공간을 줄이세요).

-> 더 기다려 보세요(입찰이 표시되기까지 60~90초가 걸리는 경우도 있습니다).


### 배포가 “pending” 상태에서 멈춘 경우

제공업체에 문제가 있을 수 있습니다. 배포를 종료하고 다른 제공업체를 이용해 보세요.

### zcashd 로그에 “No peers connected”가 표시되는 경우

2026년 7월 18일 지원 종료 중단 이후 이는 시작 지연이 아니라 예상된 영구 상태입니다. 아무리 기다리거나 다시 배포해도 해결되지 않습니다. 대신 [Zebra](/guides/akash-network-zebra)를 배포하세요.

### 로그에 “Out of memory” 오류가 표시되는 경우

RAM 비용을 지나치게 아끼셨습니다. 배포를 종료하고 메모리를 최소 12Gi(권장 16Gi)로 설정해 다시 배포하세요.

### 동기화가 너무 오래 걸리는 경우

“너무 오래”의 기준은 다음과 같습니다.

-> **몇 시간**: 정상입니다.

-> **며칠**: 메인넷을 처음부터 동기화하는 경우 역시 정상입니다.

-> **몇 주**: 문제가 있을 수 있으니 로그에서 오류를 확인하세요.


### “Error fetching zcash-params” 오류

제공업체의 네트워크에 문제가 있거나 대역폭이 느릴 수 있습니다. 일반적으로는 저절로 해결됩니다. 30분 넘게 지속되면 다른 제공업체로 다시 배포해 보세요.

### RPC 인증 실패

-> `ZCASHD_RPCUSER` 및 `ZCASHD_RPCPASSWORD`가 올바르게 설정되어 있는지 확인합니다.

-> 올바른 포트를 사용하고 있는지 확인합니다(메인넷은 8232, 테스트넷은 18232).

-> 포트는 Akash에서 매핑한다는 점을 기억하세요. 8232를 직접 사용하지 말고 배포의 URI를 사용하세요.


## 비용 관리

Console에서 지출을 모니터링하세요.

-> **My Deployments** -> 배포 선택 -> “Cost per month” 예상 비용 확인

-> Keplr 지갑 잔액은 시간이 지날수록 줄어듭니다.


잔액이 부족해지면 Akash에서 배포를 자동으로 종료합니다. **지갑을 주기적으로 충전**하거나 알림을 설정하세요.

### 비용 절감

-> **테스트넷 사용**: 프로덕션이 아닌 테스트에 사용하면 비용이 50% 저렴합니다.

-> 빠른 동기화가 필요하지 않다면 **CPU/메모리를 줄입니다**.

-> **저렴한 제공업체를 선택합니다**(항상 현명한 선택은 아닙니다. 가동 시간이 중요합니다).

-> AKT 가격 변동이 크다면 **AKT 대신 USDC 사용**을 고려하세요(SDL 가격 설정을 변경해야 합니다).

-> 필요하지 않다면 **txindex를 비활성화합니다**(저장 공간을 약 20% 절약합니다).


### 추가 자료

**Akash Console**: [https://console.akash.network](https://console.akash.network)

**Akash 문서**: [https://akash.network/docs/](https://akash.network/docs/)

**Zcash 블록 탐색기**: [https://zechub.wiki/guides/blockchain-explorers](https://zechub.wiki/guides/blockchain-explorers)

**Akash Discord**: [https://discord.akash.network](https://discord.akash.network)(제공업체 관련 문제)


## 마지막 안내

- **영구 저장 공간은 중요합니다.** *persistent: true*를 생략하거나 *beta2* 클래스를 사용하지 마세요. *beta3*를 사용하세요.
- **초기 동기화는 느립니다.** 기다려 주세요. 블록체인 노드에서는 정상입니다.
- **지갑에 잔액을 유지하세요.** AKT가 떨어지면 배포가 자동으로 종료됩니다.
- **백업은 자동으로 수행되지 않습니다.** 데이터가 중요하다면 데이터가 사라질 수 있다고 가정하고 적절히 대비하세요.
- **RPC 보안은 매우 중요합니다.** 적절한 보안 조치 없이 RPC를 인터넷에 공개하지 마세요.
- **zcash-params는 캐시됩니다.** 처음 실행할 때 암호화 파라미터 약 2GB를 다운로드합니다. 이는 정상이며 한 번만 발생합니다.
