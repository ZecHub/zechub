# Akash를 통해 zcashd 배포하기 (콘솔을 이용한 방법)

Akash 콘솔을 사용하여 zcashd Zcash 전체 노드(Electric Coin Co 구현)를 배포하는 가이드입니다. 아래에 동영상 튜토리얼이 있습니다. 더 자세한 내용은 아래에서 확인할 수 있습니다.

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

## 배포하는 내용

전체 zcashd 노드로, 다음을 수행합니다:

-> Zcash 블록체인 전체 동기화 (메인넷의 경우 350GB 이상, 테스트넷은 약 40GB)

-> AKT 토큰 가격에 따라 월 $15 정도 비용 발생

-> 완전히 동기화하는 데 수시간에서 수일이 소요됩니다.

-> 메인넷의 경우 4 vCPU, 16GB RAM, 350GB 저장공간 또는 테스트넷의 경우 2 vCPU, 8GB RAM, 50GB 저장공간 사용

-> 최초 실행 시 암호화 파라미터 다운로드 (~2GB, 일회성)

**zcashd vs Zebra:**

-> zcashd는 Electric Coin Co가 개발한 원래의 Zcash 노드 구현입니다.

-> Zebra는 Zcash Foundation이 제공하는 대안적인 구현입니다.

-> 둘 다 Zcash 네트워크와 호환됩니다.

-> zcashd는 더 많은 기능을 제공합니다 (채굴, 지갑, Insight Explorer API)

-> 지갑 기능이나 특정 RPC API가 필요하다면 zcashd를 사용하세요


### **중요: Akash의 포트 매핑**

Akash에서 포트를 노출할 때(예: zcashd P2P용 8233포트), 이는 **제공자의 공개 IP에 정확한 포트로 바인딩되지 않습니다**. 대신, 제공자는 랜덤 고위 포트(예: 31234 또는 42567)를 할당하고 이를 컨테이너의 포트 8233로 역프록시합니다.

이는 의도된 설계입니다 - 제공자가 여러 배포물을 실행하고, 모두가 직접적으로 포트 8233을 사용하려 하면 충돌이 발생할 수 있기 때문입니다.

**당신에게 의미하는 바:**

-> SDL에서 포트 8233을 설정합니다(zcashd의 표준 P2P 포트)

-> Akash은 *provider.com:31234*와 같은 URI를 제공합니다

-> 다른 Zcash 노드는 *provider.com:31234*로 연결됩니다

-> 컨테이너 내부에서는 zcashd가 여전히 8233 포트를 듣고 있습니다


자동으로 처리됩니다. Akash이 제공하는 URI만 사용하면 됩니다.

## 사전 조건

-> **Keplr 지갑** 브라우저 확장 프로그램 설치 (Chrome/Brave/Firefox)

-> **AKT 토큰** - Coinbase, Kraken, Osmosis 등에서 50-100 AKT를 구매합니다.

-> **5분 정도** 콘솔 UI를 클릭하는 시간


## 단계 1: 지갑 연결

-> [https://console.akash.network](https://console.akash.network)로 이동

-> 오른쪽 상단에 있는 **"Connect Wallet"**을 클릭

-> **Keplr**(또는 선호하는 Cosmos 지갑)을 선택

-> Keplr이 팝업할 때 연결을 승인합니다


지갑의 AKT 잔액이 오른쪽 상단에 표시됩니다. 0이라면 먼저 지갑을 충전하세요.

## 단계 2: 배포 생성

-> **"Deploy"** 버튼(중앙에 있는 큰 파란색 버튼)을 클릭

-> **"Build your template"**(또는 SDL 업로드로 바로 이동)을 선택


### 옵션 A: SDL 파일 업로드 (추천)

[![Akash에서 배포](https://raw.githubusercontent.com/akash-network/console/refs/heads/main/apps/deploy-web/public/images/deploy-with-akash-btn.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zcashd)

### 옵션 B: SDL 편집기 사용

SDL을 수동으로 붙여넣고 싶다면:

-> *zcashd-akash.yml*의 내용을 복사합니다.

-> SDL 편집기에 붙여넣습니다.

-> 필요에 따라 수정(아래 구성 섹션 참조)

-> **"Create Deployment"**를 클릭


## 단계 3: 배포 검토 및 예치 승인

콘솔은 다음과 같은 정보를 표시합니다:

-> **배포 예치금**: 약 5 AKT (배포 종료 시 환불됨)

-> **예상 비용**: SDL 가격 기준으로 계산됨


**"Approve"**를 클릭하고 Keplr에서 트랜잭션을 서명합니다.

## 단계 4: 제공자 선택

약 30초 후에 제공자의 입찰이 표시됩니다. 각 입찰은 다음과 같은 정보를 보여줍니다:

-> **블록당 가격**(AKT 또는 USDC로)

-> **월간 예상 비용**

-> **제공자 세부정보**(운영 시간, 지역 등)


**가장 저렴한 것만 선택하지 마세요.** 확인해야 할 사항은 다음과 같습니다:

-> 운영 시간 % (95% 이상이 목표)

-> 지역 (근접할수록 지연 시간이 줄어들지만 블록체인 노드에 큰 영향은 없음)

-> 감사 상태 (녹색 체크마크 = 더 신뢰 가능)


선택한 제공자에게 **"Accept Bid"**를 클릭하고 Keplr에서 서명합니다.

## 단계 5: 배포 대기

콘솔은 다음과 같이 수행됩니다:

-> 선택한 제공자와 임대 계약을 생성합니다.

-> 매니페스트를 전송하여 제공자가 실행할 내용을 알려줍니다.

-> 컨테이너를 시작합니다


1-2분 정도 소요됩니다. UI에서 상태 업데이트가 표시됩니다.

## 단계 6: 실행 확인

배포 후 다음과 같은 정보를 볼 수 있습니다:

-> **Services** 탭: *zcashd* 서비스의 상태를 보여줍니다.

-> **Logs** 탭: zcashd 노드의 실시간 로그

-> **Leases** 탭: 배포에 대한 세부정보 (DSEQ, 제공자, 비용)


### 로그 확인

**Logs** 탭을 클릭하면 zcashd가 시작되는 것을 볼 수 있습니다:

```bash
[zcashd]: ZCASHD_NETWORK=mainnet
[zcashd]: Starting: zcashd -printtoconsole -showmetrics=1
...
```

**최초 실행 시 zcash-params (~2GB) 다운로드가 발생합니다.** 이는 일회성 작업이며, 제공자의 대역폭에 따라 5~10분이 소요됩니다. 이후 재시작은 이 과정을 건너뜁니다.

동기화는 **수시간에서 수일**이 걸릴 수 있습니다. 다음을 주의 깊게 확인하세요:

-> 블록 높이가 증가하는지

-> 피어 연결 (10~30개 피어 이상)

-> 반복 오류 없음


## 단계 7: 노드 주소 확인

**Leases** 탭을 클릭한 후 **URIs**를 선택합니다.

다음과 같은 내용이 표시됩니다:

```
zcashd-8233: provider-hostname.com:31234
```

이것은 당신의 노드의 **공개 P2P 엔드포인트**입니다. 다른 Zcash 노드는 이 주소로 연결됩니다.

**포트 매핑 주의:** SDL에서 포트 8233을 설정했지만, Akash에서는 다른 공개 포트(이 예시에서는 31234)를 할당했습니다. 이는 정상입니다 - 위에 있는 "Akash의 포트 매핑" 섹션을 참조하세요. 노드는 Akash에서 표시하는 포트로 접근 가능합니다, 반드시 8233일 필요는 없습니다.

RPC가 활성화된 경우(기본적으로 SDL에서 주석 처리됨), 여기서 RPC 엔드포인트와 해당 매핑 포트도 볼 수 있습니다.

## 구성 옵션

### 테스트넷으로 전환

SDL 기본값은 메인넷입니다. 테스트넷을 사용하려면:

-> **env 섹션에서 네트워크 변경:**

   ```yaml
   # - "ZCASHD_NETWORK=mainnet"
   - "ZCASHD_NETWORK=testnet"
   ```

-> **expose 섹션의 노출 포트 업데이트:**

   ```yaml
   # 메인넷 포트 주석 처리:
   # - port: 8233
   #   as: 8233
   #   to:
   #     - global: true
   #   proto: tcp

   # 테스트넷 포트 주석 해제:
   - port: 18233
     as: 18233
     to:
       - global: true
     proto: tcp
   ```

-> **필요 시 자원 감소** (profiles.compute.zcashd.resources에서 테스트넷을 위해):

   ```yaml
   cpu:
     units: 2  # 4에서 2로 줄임
   memory:
     size: 8Gi  # 16Gi에서 8Gi로 줄임
   storage:
     - size: 50Gi  # 150Gi에서 50Gi로 줄임
   ```

-> **필요 시 가격 감소** (profiles.placement.akash.pricing에서):

   ```yaml
   amount: 5000  # 10000에서 5000으로 줄임
   ```

> 주의: 가격을 낮추면 제공자가 입찰하지 않을 수 있습니다. 이 값을 실험하거나, 제공자 엔드포인트를 사용하여 그들이 입찰할지 확인하세요 (제공자 API 문서 참조)

### RPC 액세스 활성화

보안상 기본적으로 RPC는 비활성화되어 있습니다. 활성화하려면:

**중요: 강력한 자격 증명을 설정하세요.** zcashd RPC는 HTTP를 통해 사용자 이름/비밀번호를 전송합니다 (HTTPS가 아님). RPC를 노출시키기 전에 보안 영향을 이해해야 합니다.

-> env 섹션에서 주석 해제:

   ```yaml
   - "ZCASHD_RPCUSER=yourusername"
   - "ZCASHD_RPCPASSWORD=your_very_strong_password_here"  # 실제 비밀번호 사용
   - "ZCASHD_RPCBIND=0.0.0.0"
   - "ZCASHD_RPCPORT=8232"  # 메인넷
   # - "ZCASHD_RPCPORT=18232"  # 테스트넷
   - "ZCASHD_ALLOWIP=0.0.0.0/0"  # 모든 곳에서 허용 (주의 필요)
   ```

-> expose 섹션에서 RPC 포트 주석 해제:

   **메인넷을 위한:**

   ```yaml
   - port: 8232
     as: 8232
     to:
       - global: false  # 보안상 내부로 유지
     proto: tcp
   ```

   **테스트넷을 위한:**

   ```yaml
   - port: 18232
     as: 18232
     to:
       - global: false
     proto: tcp
   ```

**경고**: RPC에 *global: true*를 설정하면 인터넷에 기본 인증으로 노출됩니다. 이는 좋지 않습니다. *global: false*로 설정하고 Akash 내부 네트워크 또는 보안 터널을 통해 RPC에 액세스하세요.

**포트 매핑 상기:** RPC를 전역적으로 노출시키더라도 Akash은 랜덤 고위 포트(8232/18232가 아님)로 매핑합니다. 배포의 URIs에서 실제 공개 엔드포인트를 확인하세요. *global: false* (추천)이면 RPC 엔드포인트는 Akash 배포 네트워크 내부에서만 접근 가능하며, 공개 인터넷에서는 접근 불가합니다.

### 트랜잭션 인덱스 활성화

트랜잭션 인덱스를 사용하면 RPC를 통해 ID로 트랜잭션을 쿼리할 수 있습니다. 저장공간이 약 20% 증가합니다.

env 섹션에서 주석 해제:

```yaml
- "ZCASHD_TXINDEX=1"
```

**경고**: 기존에 동기화된 노드에서 txindex를 활성화하면 전체 블록체인을 재색인해야 하며, 이는 수시간이 걸립니다.

### Insight Explorer 활성화

Insight Explorer는 블록체인 데이터용 추가 REST API 엔드포인트를 제공합니다 (블록 탐색기 사용 시 유용).

env 섹션에서 주석 해제:

```yaml
- "ZCASHD_INSIGHTEXPLORER=1"
```

이것은 자동으로 txindex를 활성화하고 추가 RPC 메서드를 추가합니다.

### Prometheus 지표 활성화

모니터링을 위해 지표를 수집하려면:

-> env 섹션에서 주석 해제:

   ```bash
   - "ZCASHD_PROMETHEUSPORT=9969"
   - "ZCASHD_METRICSIP=0.0.0.0/0"
   ```

-> expose 섹션에서 지표 포트 주석 해제:

   ```bash
   - port: 9969
     as: 9969
     to:
       - global: false
     proto: tcp
   ```
   
지표는 http://yourendpoint:9969/metrics에서 Prometheus 형식으로 제공됩니다.

### 자원/가격 조정

배포 제안이 없거나 비용 최적화를 원한다면:

**저사양 제공자에게 맞춤 설정**을 위해 *profiles.compute.zcashd.resources* 섹션에서 감소시킵니다:

-> CPU: *units: 2* (합리적인 동기화 속도를 위한 최소)

-> 메모리: *size: 12Gi* (안정성을 위한 최소)

-> 저장공간: *size: 120Gi* (메인넷을 위한 최소)


**더 많은 제안을 받으려면**, *profiles.placement.akash.pricing* 섹션에서 증가시킵니다:

-> 메인넷: *amount: 15000* uakt/블록 시도

-> 테스트넷: *amount: 7500* uakt/블록 시도


SDL 값은 보수적으로 높게 설정되어 있습니다. 대부분의 제공자는 더 낮은 가격으로 입찰합니다.

## 배포 업데이트

배포 후 구성 변경이 필요하다면?

-> 콘솔에서 **My Deployments**로 이동

-> zcashd 배포를 찾습니다

-> **"Update Deployment"**를 클릭

-> SDL을 편집

-> **"Update"**를 클릭하고 Keplr에서 승인합니다


**참고**: 업데이트는 컨테이너를 재시작합니다. 노드는 저장된 상태(지속적 저장소)에서 계속 진행되지만, 1-2분의 다운타임을 예상해야 합니다.

## 모니터링

### 콘솔을 통해

-> **Logs 탭**: 실시간 컨테이너 로그

-> **Shell 탭**: 컨테이너 내부에서 쉘이 실행됩니다 (디버깅에 유용)

-> **Events 탭**: Kubernetes 이벤트 (일반적으로 문제가 없는 경우 무의미)


### RPC를 통해 (활성화된 경우)

RPC가 활성화되면 노드는 일반적인 zcashd 전체 노드로 작동합니다(이유: 바로 그 이유!).

### zcash-cli 대안

콘솔에서 쉘 액세스가 있다면 *zcash-cli*를 직접 사용할 수 있습니다:

```bash
# 콘솔의 Shell 탭에서
zcash-cli getblockchaininfo
zcash-cli getpeerinfo
zcash-cli getinfo
```

## 배포 종료

완료하거나 지불을 중단하려면:

-> **My Deployments**로 이동

-> zcashd 배포를 찾습니다

-> **"Close Deployment"**를 클릭

-> 확인하고 Keplr에서 서명합니다


5 AKT 예치금은 환불됩니다. **지속적 저장소**는 제공자가 보존해야 하지만, 이를 의존하지 마세요 - 다른 클라우드 제공자와 동일하게 처리하세요.

## 문제 해결

### "자금 부족" 오류

더 많은 AKT가 필요합니다. Keplr 지갑을 충전하세요.

### 제안이 나타나지 않음

다음 중 하나일 수 있습니다:

-> 가격이 너무 낮습니다 (SDL의 *amount*를 증가시켜 보세요)

-> 자원 요구사항이 제공자에게 너무 높습니다 (CPU/메모리/저장공간을 줄여보세요)

-> 더 오래 기다려보세요 (때로는 60-90초가 걸립니다)


### 배포가 "대기" 상태에 머물고 있음

제공자가 문제가 있을 수 있습니다. 배포를 종료하고 다른 제공자를 시도해 보세요.

### zcashd 로그에서 "연결된 피어 없음" 나타남

처음 몇 분 동안 정상입니다. zcashd는 자동으로 피어를 발견합니다. 10분 이상 지속되면 네트워크 문제일 수 있습니다 (Akash에서는 거의 발생하지 않음).

### 로그에 "메모리 부족" 오류 나타남

RAM을 너무 적게 설정했습니다. 배포를 종료하고 최소 12Gi 메모리(16Gi 추천)로 재배포하세요.

### 동기화가 영원히 지연됨

"영원"을 정의해 보세요:

-> **시간**: 일반적입니다

-> **일**: 메인넷에서 처음 시작하는 경우에도 일반적입니다

-> **주**: 문제가 있습니다. 로그를 확인하여 오류를 찾아보세요


### "zcash-params 가져오기 실패" 오류

제공자가 네트워크 문제나 느린 대역폭이 있을 수 있습니다. 이는 일반적으로 해결됩니다. 30분 이상 지속되면 다른 제공자로 재배포해 보세요.

### RPC 인증 실패

-> *ZCASHD_RPCUSER* 및 *ZCASHD_RPCPASSWORD*가 올바르게 설정되었는지 확인하세요

-> 메인넷의 경우 8232, 테스트넷의 경우 18232 포트를 사용하는지 확인하세요

-> Akash에서 포트 매핑을 기억하세요 - 배포의 URI를 사용하고 8232 직접 사용하지 마세요


## 비용 관리

콘솔에서 지출을 모니터링하세요:

-> **My Deployments** -> 배포 -> "월별 비용" 추정치 표시

-> Keplr 지갑 잔액은 시간이 지남에 따라 감소합니다


잔액이 낮아지면 Akash는 자동으로 배포를 종료합니다. **주기적으로 지갑을 충전하거나** 경고를 설정하세요.

### 비용 절감

-> **테스트넷 사용**: 비생산 테스트에 (50% 저렴)

-> **CPU/메모리 감소**: 빠른 동기화가 필요하지 않다면

-> **더 싼 제공자 선택**: 항상 현명한 것은 아님 - 가동 시간이 중요함

-> **AKT 대신 USDC 사용**: AKT 가격 변동성이 있다면 (SDL 가격 변경 필요)

-> **txindex 비활성화**: 필요하지 않으면 저장공간 약 20% 절감


### 추가 자료

**Akash 콘솔**: [https://console.akash.network](https://console.akash.network)

**Akash 문서**: [https://akash.network/docs/](https://akash.network/docs/)

**Zcash 탐색기**: [https://zechub.wiki/using-zcash/blockchain-explorers](https://zechub.wiki/using-zcash/blockchain-explorers)

**Akash 디스코드**: [https://discord.akash.network](https://discord.akash.network) (제공자 문제에 대해)


## 최종 주의사항

- **지속적 저장소는 중요합니다.** *persistent: true*를 건너뛰거나 *beta2* 클래스를 사용하지 마세요. *beta3*를 사용하세요.
- **초기 동기는 느립니다.** 인내심을 갖고 기다리세요. 이는 블록체인 노드에 일반적입니다.
- **지갑은 항상 충전되어 있어야 합니다.** AKT가 바닥나면 배포가 자동으로 종료됩니다.
- **백업은 자동화되지 않습니다.** 데이터를 중요하게 여기면 사라질 수 있다고 가정하고 대비하세요.
- **RPC 보안은 매우 중요합니다.** 인터넷에 RPC를 노출시키기 전에 적절한 보안 조치를 취하세요.
- **zcash-params는 캐시됩니다.** 처음 실행 시 약 2GB의 암호화 매개변수를 다운로드합니다. 이는 정상이며, 오직 한 번만 발생합니다.
