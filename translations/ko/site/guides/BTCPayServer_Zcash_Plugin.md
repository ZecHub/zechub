# Zcash 지원 BTCPay Server: 전체 설치 및 통합 가이드

BTCPay Server를 사용하면 온라인 비즈니스가 중개자나 수탁자 없이 암호화폐 결제를 직접 받을 수 있습니다. 이 가이드는 Zcash 차폐 결제를 기본 지원하도록 BTCPay Server를 설정하는 전체 과정을 안내합니다.

> 이 문서는 BTCPay Server 인스턴스에 Zcash를 통합하는 데 중점을 둡니다.  
> **풀 노드 (Zebra)** 및 **lightwalletd 기반 설정**을 모두 지원합니다.

---

## 목차

- [Zcash와 함께 BTCPay Server를 사용하는 이유](#Why-Use-BTCPay-Server-with-Zcash)
- [BTCPay Server 작동 방식](#How-BTCPay-Server-Works)
- [자금은 어디에 저장되나요? 개인 키는 누가 제어하나요?](#Where-Are-Funds-Stored-Who-Controls-the-Private-Keys)
- [Zcash 결제를 받기 위한 BTCPay Server 설정 방법](#How-to-Set-Up-BTCPay-Server-for-Accepting-Zcash)
  - [Zcash 지원으로 BTCPay Server 배포하기](#Deploying-BTCPay-Server-with-Zcash-Support)
  - [자체 Zcash 풀 노드 실행하기 (Zebra + Lightwalletd)](#Running-Your-Own-Zcash-Full-Node)
  - [외부 lightwalletd 노드에 연결하기 (사용자 정의 구성)](#Connecting-to-an-External-Lightwalletd-Node)
  - [Cloudflare Tunnel을 사용해 집에서 BTCPay Server 호스팅하기](#Hosting-BTCPay-Server-at-Home-with-Cloudflare-Tunnel)
- [BTCPay Server 웹 인터페이스에서 Zcash 플러그인 구성하기](#Configuring-the-Zcash-Plugin-in-the-BTCPay-Server-Web-Interface)
- [웹사이트에 BTCPay Server 통합하기](#Integrating-BTCPay-Server-with-Your-Website)
  - [API 통합](#API-Integration)
    - [API 키 생성하기](#Generating-an-API-Key)
    - [예시: API를 통해 인보이스 생성하기](#Example-Creating-an-Invoice-via-API)
    - [Webhook 설정하기](#Setting-Up-a-Webhook-Optional)
  - [CMS 통합](#CMS-Integration)
  - [결제 버튼 또는 Iframe](#Payment-Button-or-Iframe-No-CMS-or-API-Needed)
- [결론](#Conclusion)
- [리소스](#Resources)


---

## Zcash와 함께 BTCPay Server를 사용하는 이유

온라인 상거래에서 암호화폐 결제를 점점 더 많이 수용하고 있습니다. 빠르고, 글로벌하며, 은행 없이 작동합니다. 이는 판매자와 고객 모두에게 이점이 됩니다. 하지만 많은 사람들이 간과하는 중요한 세부 사항이 있습니다.

주문을 할 때 고객은 일반적으로 이름, 배송 주소, 전화번호와 같은 개인정보를 제공합니다. 결제가 Bitcoin, Ethereum 또는 Ethereum이나 Tron 기반 스테이블코인처럼 공개 블록체인으로 이루어지면, 그 거래는 영구적으로 분석 가능한 상태로 남게 됩니다.

무엇을 주문했는지 모른다 하더라도 누구나 다음을 할 수 있습니다:

- 언제 얼마가 지불되었는지 확인할 수 있음  
- 자금이 어디서 왔고 어디로 갔는지 추적할 수 있음  
- 상관관계가 생기는 지점(예: 유출된 이메일이나 배송 이름)이 하나라도 있으면 암호화폐 주소를 실존 인물과 연결할 수 있음

이는 단 한 번의 구매만으로도 고객의 전체 금융 이력이 드러날 수 있음을 의미합니다.

그리고 이는 반대 방향으로도 마찬가지입니다. 판매자의 주소가 한 번이라도 온체인에 나타난 적이 있다면, 판매자 역시 노출됩니다. 경쟁업체와 제3자 관찰자는 결제 규모, 공급업체 활동, 비즈니스 자금 흐름의 구조를 추적할 수 있습니다.

### BTCPay Server와 Zcash의 조합은 이 문제를 해결할 수 있습니다.


BTCPay Server는 암호화폐 결제를 받기 위한 무료 분산형 시스템입니다.  
결제 중개자가 아니며 어떤 자금도 보관하지 않습니다. 모든 결제는 판매자의 지갑으로 직접 들어갑니다.  
이는 개인 지갑일 수도 있고 조직 내 멀티시그 설정일 수도 있습니다.

서버는 다음과 같은 조정 작업을 처리합니다:

- 각 주문마다 고유한 주소를 생성함  
- 결제가 수신되었는지 추적하고 이를 주문과 연결함  
- 영수증과 알림을 발행함  
- 고객에게 결제 인터페이스를 제공함  

모든 것은 서드파티 서비스에 의존하지 않고 상점 소유자의 통제 아래에서 실행됩니다.

Zcash는 영지식 증명 기반의 암호화폐입니다. 완전한 프라이버시 거래 모델을 지원합니다.  
차폐 주소(이하 간단히 “주소”)를 사용할 경우, 송신자, 수신자, 거래 금액이 블록체인에 공개되지 않습니다.

온라인 상점에 이것이 의미하는 바는 다음과 같습니다:

- 구매자는 자신의 금융 이력을 드러내지 않고 결제를 완료할 수 있음  
- 판매자는 자신의 주소, 판매량, 거래 구조를 노출하지 않고 대금을 받을 수 있음  
- 어떤 외부 관찰자도 결제를 주문이나 고객 데이터와 연결할 수 없음

### 실제 예시

사용자가 주문을 하고 결제 수단으로 Bitcoin 또는 USDT를 선택합니다.  
웹사이트는 결제 주소를 생성하고 금액을 표시합니다.  
결제가 이루어진 후 이 주소는 블록체인에 저장되며 공개 상태가 됩니다.  
공격자는 단 하나의 주문만 그 주소와 연결하면 그 주소의 전체 거래 이력을 장기적으로 들여다볼 수 있게 됩니다.

이제 같은 상황을 Zcash로 상상해 보세요.  
BTCPay Server는 차폐 주소를 생성합니다. 구매자가 결제를 보냅니다.  
블록체인 관점에서는 아무 일도 일어나지 않은 것처럼 보입니다. 분석할 수 있는 공개 데이터가 없습니다.  
서버는 확인을 받고, 이를 주문과 연결하고, 과정을 완료합니다.

외부인의 눈에는 아무 일도 일어나지 않은 것처럼 보입니다.  
모든 로직은 상점과 고객 사이에만 남습니다. 원래 그래야 하듯이 말입니다.

이 솔루션은 자동화나 사용성을 희생하지 않습니다.  
다른 암호화폐와 동일하게 작동하지만, 데이터 유출 위험만 없습니다.



## BTCPay Server 작동 방식

BTCPay Server는 전자상거래 플랫폼과 블록체인 사이의 결제 처리 브리지 역할을 합니다. 흐름은 다음과 같습니다:

1. **고객이 웹사이트에서 주문을 합니다** (예: WooCommerce, Magento 또는 BTCPay 통합이 있는 어떤 플랫폼이든).

2. **상점이 BTCPay Server에 결제 인보이스를 요청합니다.** 서버는 다음이 포함된 고유 인보이스를 생성합니다:
   - 주문 금액
   - 카운트다운 타이머
   - Zcash Unified Address (UA) - 예: `u1...` - 기본적으로 Orchard (차폐) 수신자를 포함합니다.

3. **고객이 결제 페이지를 보고** 제공된 주소로 ZEC를 보냅니다.

4. **BTCPay Server가 블록체인을 모니터링하며**, 결제를 다음 기준에 따라 확인합니다:
   - 예상 금액
   - 수신 주소
   - 인보이스 타임스탬프

5. **거래가 감지되고 확인되면**, BTCPay가 상점에 이를 알립니다.

6. **고객은 결제 확인을 받습니다.** 선택적으로 서버는 이메일로 영수증을 보낼 수 있습니다.

이 전체 과정은 **자동으로** 이루어지며, 중개자나 수탁자가 없습니다.  
BTCPay Server는 **자금을 보관하지 않으며** - 단지 주문 시스템을 블록체인에 안전하고 비공개적으로 연결할 뿐입니다.
## 자금은 어디에 저장되나요? 개인 키는 누가 제어하나요?

BTCPay Server는 **지갑이 아니며** **개인 키를 요구하지도 않습니다**.  
모든 자금은 **직접** 판매자의 지갑으로 들어갑니다. 보안은 **viewing key 기반 아키텍처**를 통해 보장됩니다.

### 작동 방식

- **지갑은 미리 생성됩니다.**  
  판매자는 [YWallet](https://ywallet.app/installation) 또는 [Zingo! Wallet](https://zingolabs.org/)처럼 viewing key를 지원하는 Zcash 지갑을 사용합니다.  
  전체 목록은 [ZecHub.wiki](https://zechub.wiki/wallets)에서 확인할 수 있습니다.

- **BTCPay Server는 viewing key를 통해 연결됩니다.**  
  Viewing key는 **읽기 전용 키**입니다. 수신 결제를 감지하고 새 수신 주소를 생성할 수는 있지만,  
  자금을 지출할 수는 없습니다. 서버는 시드 문구나 개인 키를 저장하지 않습니다.

- **블록체인 데이터는 `lightwalletd` 서버를 통해 접근합니다.**  
  `https://zec.rocks` 같은 공개 노드를 사용할 수도 있고, 완전한 자율성을 위해 자체 `Zebra + lightwalletd` 스택을 실행할 수도 있습니다.

- **각 주문에는 고유한 주소가 부여됩니다.**  
  Viewing key를 사용하면 서버가 각 인보이스마다 새로운 Zcash 차폐 주소를 파생할 수 있어,  
  안전한 결제 추적이 가능하고 주소 재사용을 방지할 수 있습니다.

- **자금에 대한 완전한 통제권은 여전히 사용자에게 있습니다.**  
  서버가 손상되더라도 누구도 당신의 자금을 훔칠 수는 없습니다 - 노출될 수 있는 것은 결제 메타데이터뿐입니다.

이 설계는 **인프라**와 **자산 통제**를 분리합니다.  
자금을 위험에 빠뜨리지 않고 BTCPay Server를 업데이트, 마이그레이션 또는 재설치할 수 있습니다.

## Zcash 결제를 받기 위한 BTCPay Server 설정 방법

앞선 섹션에서는 BTCPay Server가 Zcash와 함께 어떻게 작동하는지, 그리고 프라이버시 보호 결제에서 왜 중요한지를 설명했습니다. 이제 실제로 설정해 볼 차례입니다.

정확한 설정 방식은 몇 가지 요인에 따라 달라집니다:

- 이미 BTCPay Server 인스턴스를 보유하고 있나요?
- 공개 lightwalletd를 사용하고 싶나요, 아니면 자체 풀 노드를 실행하고 싶나요?
- 서버를 VPS에서 실행할 건가요, 아니면 집에서 실행할 건가요?

이 장에서는 최소 구성부터 완전한 자율 배포까지 현재 가능한 모든 구성 시나리오를 다룹니다.

다음 내용을 순서대로 살펴보겠습니다:

- 풀 노드 (Zebra)를 포함해 VPS에서 처음부터 모든 것을 배포하는 방법
- **Cloudflare Tunnel**을 사용해 IP를 숨기면서 집에서 BTCPay Server를 실행하는 방법
- BTCPay Server 웹 인터페이스 내부에서 Zcash 지원을 활성화하고 구성하는 방법
- 웹사이트 또는 온라인 상점에 BTCPay를 통합하는 방법


## Zcash 지원으로 BTCPay Server 배포하기

이제 실제 설정으로 넘어가겠습니다. 이 섹션에서는 새 VPS에 설치하거나 기존 인스턴스에 ZEC 지원을 추가하는 방식으로 Zcash 지원 BTCPay Server를 설치합니다.

이미 BTCPay Server가 실행 중이라면(예: BTC 또는 Lightning용) 모든 것을 다시 설치할 필요는 없습니다 - ZEC 플러그인만 활성화하면 됩니다.

공개 `lightwalletd` 노드를 사용하는 최소 구성부터 자체 풀 노드를 사용하는 완전 자율 설치까지 다양한 구성을 안내하겠습니다.  
가장 적합한 옵션은 서버 위치와 외부 인프라로부터 어느 정도 독립성을 원하는지에 따라 달라집니다.

> 공식 플러그인 문서:  
> [https://github.com/btcpay-zcash/btcpayserver-zcash-plugin](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
>
> **경고 - 인스턴스당 지갑 하나:**  
> Zcash 플러그인은 BTCPay 인스턴스의 **모든 상점**에서 **하나의 공유 지갑**을 사용합니다.  
> 하나의 인스턴스에 여러 개의 독립 상점을 호스팅하면 동일한 Zcash 지갑을 공유하게 됩니다.  
> 엄격한 지갑 분리가 필요하다면 별도의 인스턴스를 사용하세요.

---

### 권장 VPS 구성

설치 전에 다음이 준비되어 있는지 확인하세요:

- **Ubuntu 22.04+**가 설치된 VPS
- 서버의 IP 주소를 가리키는 도메인 이름 (DNS를 통해)
- 설치된 `git`, `docker`, `docker-compose`
- 서버에 대한 SSH 접근 권한

---

## 서버 준비하기 (숨김 섹션)

<details>
  <summary>펼치려면 클릭</summary>

Zcash 지원으로 BTCPay Server를 배포하려면 다음이 필요합니다:

### 1. Ubuntu 22.04 이상이 설치된 VPS

**Ubuntu Server 22.04 LTS**의 최소 설치를 권장합니다.  
전용 IP 주소를 제공하는 모든 VPS 제공업체를 사용할 수 있습니다.  

**최소 요구 사항**:  
- CPU 코어 2개  
- RAM 4 GB  
- 디스크 공간 40 GB  

이 구성은 Zcash에 lightwalletd를 사용하는 경우 충분합니다.  
**Zcash 풀 노드**를 실행할 계획이라면 **최소 300 GB**의 여유 디스크 공간이 필요합니다.

---

### 2. 서버를 가리키는 도메인 이름

DNS 제공업체의 대시보드에서 서브도메인에 대한 `A` 레코드를 생성해  
(예: `btcpay.example.com`) VPS IP 주소를 가리키도록 하세요.  

이 도메인은 브라우저에서 BTCPay Server에 접속하는 데 사용되며,  
Let's Encrypt를 통해 **무료 SSL 인증서**를 자동 생성하는 데에도 사용됩니다.

---

### 3. 서버에 대한 SSH 접근

BTCPay Server를 설치하려면 SSH를 통해 VPS에 연결해야 합니다.  
터미널에서 다음을 실행하세요:

`ssh root@YOUR_SERVER_IP`

macOS, Linux 또는 Windows의 WSL을 사용한다면 SSH는 이미 터미널에서 사용할 수 있습니다.
일반 Windows 환경에서는 **PuTTY** 같은 SSH 클라이언트를 사용하세요.

---

### 4. Git, Docker, Docker Compose 설치

SSH로 연결한 후 시스템 패키지를 업데이트하고 필요한 구성 요소를 설치하세요:

```
sudo apt update && sudo apt upgrade -y
sudo apt install git curl docker.io docker-compose-plugin -y
sudo systemctl enable docker
```

> Ubuntu 22.04 이상에서는 APT의 `docker-compose`가 더 이상 권장되지 않습니다.
> 권장 패키지는 `docker compose` 명령(하이픈 대신 공백 사용)을 제공하는 `docker-compose-plugin`입니다.

이제 서버 환경이 BTCPay Server 설치 준비를 마쳤습니다.

</details>

---

### 1단계: 저장소 클론하기

작업 디렉터리를 만들고 BTCPay Server Docker 배포판을 다운로드합니다:

```
mkdir BTCPayServer
cd BTCPayServer
git clone https://github.com/btcpayserver/btcpayserver-docker
cd btcpayserver-docker
```

---

### 2단계: 환경 변수 내보내기

`btcpay.example.com`을 실제 도메인으로 바꾸세요:

```
export BTCPAY_HOST="btcpay.example.com"
export NBITCOIN_NETWORK="mainnet"
export BTCPAYGEN_CRYPTO1="btc"
export BTCPAYGEN_CRYPTO2="zec"
export BTCPAYGEN_REVERSEPROXY="nginx"
export BTCPAYGEN_LIGHTNING="none"
```

> 나중에 Monero나 Litecoin을 추가할 계획이라면 지금 함께 포함할 수 있습니다:

```
export BTCPAYGEN_CRYPTO3="ltc"
export BTCPAYGEN_CRYPTO4="xmr"
```

적절한 변수를 내보내고 설정 스크립트를 다시 실행하면 언제든 새로운 코인을 추가할 수 있습니다:

`. ./btcpay-setup.sh -i`

이 가이드에서는 **Zcash만** 중점적으로 다루겠습니다.

---

### 3단계: 설치 프로그램 실행하기

설정 스크립트를 실행해 서버를 빌드하고 시작합니다:

`. ./btcpay-setup.sh -i`

스크립트는 의존성을 설치하고, `docker-compose.yml`을 생성하고, 서비스를 시작하며, `systemd`를 구성합니다.
이 과정에는 약 5분이 걸립니다.

완료되면 BTCPay Server 인스턴스는 다음 주소에서 사용할 수 있습니다:

`https://btcpay.example.com`

> 기존 설치를 수정하는 경우(예: ZEC 추가)에는 새 설정으로 서버를 중지했다가 다시 시작해야 합니다:

```
cd ~/BTCPayServer/btcpayserver-docker
btcpay-down.sh
. ./btcpay-setup.sh -i
```

그런 다음 다음 섹션으로 이동해 BTCPay Server 웹 인터페이스에서 Zcash를 구성하세요.



## 자체 Zcash 풀 노드 실행하기

공개 `lightwalletd` 노드에 의존하고 싶지 않다면, 동일한 서버에서 자체 Zcash 풀 노드와 Lightwalletd를 함께 배포할 수 있습니다.  
이렇게 하면 **완전한 자율성**을 얻을 수 있습니다 - 외부 의존성도, 신뢰도 필요 없습니다.

---

### 1단계: 충분한 디스크 공간 확보하기

풀 Zcash 노드 (Zebra + Lightwalletd)는 현재 **300+ GB**의 디스크 공간이 필요하며, 계속 증가하고 있습니다.

구성은 다음과 같습니다:

- Zebra 블록체인 데이터베이스: 약 260-270 GB
- Lightwalletd 인덱싱: 약 15-20 GB

#### 권장 저장소:

- 서버를 **오직** Zcash 결제에만 사용할 경우 **400 GB+**
- 서버에서 BTCPay Server, PostgreSQL, Nginx 등을 함께 실행할 경우 **800 GB+**

> 이상적으로는 **1 TB 용량**의 SSD/NVMe 디스크를 사용하세요. 특히 데이터를 정기적으로 프루닝할 계획이 없다면 더욱 그렇습니다.

---

### 2단계: 환경 변수 설정하기

풀 노드 구성을 활성화하려면 환경 설정에 다음을 추가하세요:

```
export BTCPAYGEN_EXCLUDE_FRAGMENTS="zcash"
export BTCPAYGEN_ADDITIONAL_FRAGMENTS="zcash-fullnode"
```

이렇게 하면 `zcash-fullnode` fragment가 포함되어 BTCPay Server 내부에서 `zebrad`와 `lightwalletd`가 모두 실행됩니다.

---

### 3단계: 설치 프로그램 다시 실행하기

`. ./btcpay-setup.sh -i`

스크립트는 다음을 수행합니다:

* Zebra와 Lightwalletd의 Docker 이미지를 다운로드
* BTCPay 스택 내부에 서비스를 설정
* Zcash 플러그인을 **로컬** `lightwalletd` 인스턴스에 연결

> **전체 블록체인 동기화에는 며칠이 걸릴 수 있으며**, 특히 저사양 VPS에서는 더 오래 걸릴 수 있습니다.
> 동기화가 완료되기 전까지 차폐 결제는 사용할 수 없습니다.


## 외부 Lightwalletd 노드에 연결하기

대부분의 경우 완전한 자율성은 필요하지 않으며, 판매자는 풀 Zcash 노드를 실행하는 데 시간과 디스크 공간을 쓰고 싶지 않을 수도 있습니다.  
기본적으로 BTCPay Server는 공개 `lightwalletd` 노드에 연결해 전체 블록체인을 다운로드하지 않고도 차폐 결제를 처리합니다.

기본 엔드포인트는 다음과 같습니다:

`https://zec.rocks:443`

하지만 BTCPay Server를 **어떤 외부 `lightwalletd` 노드**에도 연결하도록 구성할 수 있습니다. 예를 들어:

`https://lightwalletd.example:443`

이 섹션에서는 **사용자 정의 Docker fragment**를 사용해 이를 설정하는 방법을 보여줍니다.

> 모든 환경 변수가 포함된 전체 구성 예시는 [플러그인 저장소](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/zcash-lightwalletd.custom.yml)에서 확인할 수 있습니다.  
> 아래 단계는 최소한으로 동작하는 설정만 보여줍니다.

---

### 1단계: 사용자 정의 Docker Fragment 생성하기

BTCPayServer 프로젝트 디렉터리에서 사용자 정의 fragment 파일을 생성하세요:

```
cd ~/BTCPayServer/btcpayserver-docker
mkdir -p docker-compose-generator/docker-fragments
nano docker-compose-generator/docker-fragments/zcash-lightwalletd.custom.yml
```

다음 내용을 추가하세요:

```
exclusive:
- zcash
```

`exclusive` 지시어는 동일한 라벨(이 경우 `zcash`)을 가진 fragment가 한 번에 하나만 활성화되도록 보장합니다.
이렇게 하면 구성 충돌을 방지할 수 있습니다. 예를 들어 `zcash-fullnode` fragment와 이 사용자 정의 외부 `lightwalletd` fragment를 동시에 실행할 수 없습니다.
이를 `exclusive: zcash`로 표시하면 BTCPay Server가 기본 `zcash-fullnode`와 내부 `lightwalletd` 컨테이너를 자동으로 비활성화하므로, 대신 자신의 외부 노드에 연결할 수 있습니다.

---

### 2단계: 환경 변수 설정하기

터미널에서 다음을 실행하세요:

```
export BTCPAYGEN_EXCLUDE_FRAGMENTS="$BTCPAYGEN_EXCLUDE_FRAGMENTS;zcash"
export BTCPAYGEN_ADDITIONAL_FRAGMENTS="$BTCPAYGEN_ADDITIONAL_FRAGMENTS;zcash-lightwalletd.custom"
```

---

### 3단계: 외부 노드 주소 정의하기

`.env` 파일을 엽니다:

`nano .env`

선택한 엔드포인트 URL로 바꾸어 다음 줄을 추가하세요:

`ZCASH_LIGHTWALLETD=https://lightwalletd.example:443`

다음 중 하나를 사용할 수 있습니다:

* `https://lightwalletd.zcash-infra.com` 같은 **공개 노드**
* BTCPay Server와 별도로 배포한 자체 호스팅 노드

> 외부 `lightwalletd`가 사용할 수 없거나 과부하 상태가 되면 차폐 결제가 실패합니다.
> 중요한 서비스라면 **안정적이고 검증된 엔드포인트**(기본값인 `zec.rocks` 등)를 선택하세요.

> `lightwalletd`를 직접 호스팅하고 싶으신가요?
> [Zebra 저장소](https://github.com/ZcashFoundation/zebra/blob/main/docker/docker-compose.lwd.yml)의 `docker-compose.lwd.yml`을 사용할 수 있습니다.
> **경고:** 이 설정은 공식 문서화가 되어 있지 않으며 수동 TLS 설정, 포트 포워딩, 방화벽 구성이 필요합니다 - 고급 사용자에게만 권장됩니다.

---

### 4단계: 설치 프로그램 다시 실행하기

`. ./btcpay-setup.sh -i`

BTCPay Server가 사용자 정의 구성을 적용하고 지정한 `lightwalletd` 노드에 연결합니다.

이제부터 Zcash 플러그인은 해당 외부 엔드포인트를 사용해 차폐 거래를 처리합니다.


## Cloudflare Tunnel을 사용해 집에서 BTCPay Server 호스팅하기

정적 IP 없이 Raspberry Pi 5나 기타 로컬 서버 같은 가정용 장치에서 BTCPay Server를 호스팅하면서 Zcash 결제를 받고 싶으신가요?  
**Cloudflare Tunnel**을 사용하면 인스턴스를 인터넷에 안전하게 노출할 수 있습니다.

이 방법은 포트 포워딩을 피하고 실제 IP 주소를 공개로부터 숨기면서도 서버를 HTTPS로 접근 가능하게 해줍니다.

또한 암호화폐 결제가 비즈니스의 핵심이 아니라 선택 기능인 경우, **VPS 임대 비용을 피하는 데도 도움**이 됩니다.

---

### 1단계: Cloudflare Tunnel 설치하기

1. [cloudflare.com](https://www.cloudflare.com)에서 계정을 만들고 도메인을 추가하세요.
2. **홈 서버**에 Cloudflare Tunnel을 설치하세요:

```
sudo apt update
sudo apt install cloudflared --legacy
```

3. Cloudflare로 인증하세요:

`cloudflared tunnel login`

이 명령은 브라우저 창을 엽니다. 로그인한 뒤 도메인 접근 권한을 승인하세요.
Cloudflare는 서버에 토큰이 포함된 `credentials` 파일을 자동으로 생성합니다.

4. 새 터널을 생성하세요 (`btcpay` 또는 다른 이름으로 지정 가능):

`cloudflared tunnel create btcpay`

그러면 터널 ID와 자격 증명이 포함된 `btcpay.json` 파일이 생성됩니다 - 다음 단계에서 필요합니다.

---

### 2단계: 터널 구성 파일 생성하기

구성 디렉터리(없다면)를 만들고 config 파일을 엽니다:

```
sudo mkdir -p /etc/cloudflared
sudo nano /etc/cloudflared/config.yml
```

다음 구성을 붙여 넣으세요:

```
tunnel: btcpay    # your tunnel name
credentials-file: /root/.cloudflared/btcpay.json

ingress:
  - hostname: btcpay.example.com      # your domain
    service: http://127.0.0.1:80
  - service: http_status:404
```

#### 설명:

* `tunnel` - 앞서 생성한 터널의 이름
* `credentials-file` - `cloudflared tunnel login` 중 생성된 토큰 파일의 경로
* `hostname` - Cloudflare에 등록한 도메인 (예: `btcpay.example.com`)
* `service` - BTCPay Server의 로컬 주소 (일반적으로 Nginx용 `http://127.0.0.1:80`)

> Cloudflare는 홈 IP를 노출하지 않고도 트래픽을 로컬 서버로 안전하게 프록시합니다.


### 3단계: 터널용 DNS 레코드 추가하기

터널을 생성하면 Cloudflare가 보통 도메인에 대한 **CNAME DNS 레코드**를 자동으로 추가합니다. 다음과 같은 형태입니다:

`btcpay.example.com -> <UUID>.cfargotunnel.com`

자동으로 나타나지 않으면 수동으로 추가하세요:

1. [Cloudflare Dashboard](https://dash.cloudflare.com/)로 이동합니다
2. **DNS** 섹션으로 이동합니다
3. 새 CNAME 레코드를 추가합니다:
   - **Name**: `btcpay`
   - **Target**: `<UUID>.cfargotunnel.com`  
     정확한 값은 `btcpay.json` 파일에서 확인하거나 다음을 실행해 찾을 수 있습니다:
     
     `cloudflared tunnel list`
     
   - **Proxy status**: 활성화됨 (주황색 구름)

> 이 레코드는 `btcpay.example.com`으로 들어오는 모든 요청이 Cloudflare Tunnel을 통해 라우팅되도록 보장하여 실제 IP 주소를 공개로부터 숨깁니다.

---

### 4단계: 시스템 시작 시 터널 활성화하기

부팅 시 터널이 자동으로 실행되게 하려면 시스템 서비스로 설치하세요:

`sudo cloudflared service install`

그런 다음 서비스를 활성화하고 시작하세요:

```
sudo systemctl enable cloudflared
sudo systemctl start cloudflared
```

상태를 확인하세요:

`sudo systemctl status cloudflared`

`Active: active (running)` 같은 메시지와 함께 `btcpay.example.com`이 온라인 상태라는 확인이 보여야 합니다.

> 이제부터는 재부팅할 때마다 터널이 자동으로 시작되며, 실제 IP를 노출하지 않고 포트 포워딩 없이도 BTCPay Server에 공개적으로 접근할 수 있습니다.

---

### 5단계: BTCPay Server 설정 마무리하기

BTCPay Server를 처음 설치하려는 경우, 설정 스크립트를 실행하기 전에 도메인을 설정하세요:

`export BTCPAY_HOST="btcpay.example.com"`

이렇게 하면 **Nginx 구성**과 **SSL 인증서**를 생성할 때 올바른 도메인이 사용됩니다.

이미 BTCPay Server가 설치되어 있고 터널만 추가하는 경우:

```
cd ~/BTCPayServer/btcpayserver-docker
. ./btcpay-setup.sh -i
```

설정이 구성을 다시 생성하고 새 도메인을 적용합니다.
이제 다음 주소에서 서버에 접근할 수 있어야 합니다:

`https://btcpay.example.com`

> 공개 `lightwalletd`를 사용하든 자체 풀 노드를 사용하든, 이는 터널에 영향을 주지 않습니다.
> 중요한 것은 BTCPay Server가 로컬에서 `127.0.0.1:80`을 리슨하고 있다는 점뿐입니다.


## BTCPay Server 웹 인터페이스에서 Zcash 플러그인 구성하기

> **멀티 스토어 설정에 중요:**  
> 여기서 구성하는 Zcash 지갑은 인스턴스 전체에 대해 **전역**입니다. 별도의 BTCPay 인스턴스를 실행하지 않는 한 모든 상점이 이 지갑을 사용하게 됩니다.

BTCPay Server 인스턴스를 성공적으로 배포한 후에는 관리자 웹 인터페이스를 통해 몇 가지 기본 구성을 해야 합니다.  
공식 문서는 영어로 전체 지침을 제공하지만, 여기서는 핵심 단계만 안내하고 특히 Zcash 플러그인 구성에 집중하겠습니다.

---

### 1단계: 웹 인터페이스에 로그인하기

인스턴스를 다음 주소로 방문하세요:

`[https://btcpay.example.com](https://btcpay.example.com)`

- 관리자 로그인과 비밀번호를 입력하세요.
- 처음 로그인하는 경우 계정 생성을 요청받게 됩니다.
- 처음 등록하는 계정에는 자동으로 관리자 권한이 부여됩니다.

---

### 2단계: Zcash 플러그인 설치하기

1. 메인 메뉴에서 다음으로 이동하세요:

`Plugins -> Browse Plugins`

2. **Zcash (ZEC)** 플러그인을 찾으세요. 필요하면 검색창을 사용하세요.
3. **Install**을 클릭하고 확인하세요.

> 서버 구성 중 활성화한 다른 알트코인에 대해서도 이 과정을 반복하세요.

설치 후 **Restart Server**를 클릭해 활성화된 플러그인으로 인터페이스를 다시 로드하세요.


### 3단계: Viewing Key를 통해 지갑 연결하기

플러그인을 설치하면 설정 메뉴에 새로운 **Zcash** 섹션이 나타납니다.

1. 다음으로 이동하세요:

`Zcash -> Settings`

2. **Unified Full Viewing Key (UFVK)**를 붙여 넣으세요 - BTCPay는 각 인보이스에 대해 Unified Address를 파생하고 수신된 차폐 결제를 감지합니다.

> **참고:** 기존 Sapling viewing key도 지원되지만, Orchard/Unified Address를 사용하려면 **UFVK**를 제공해야 합니다.


   예시 형식:

`uview184syv9wftwngkay8d...`

3. Block height 필드에 값을 입력하세요

* **새 지갑(새 시드 문구)으로 처음 설정하는 경우:** 현재 Zcash 블록 높이를 입력하세요 (`3xpl.com/zcash`에서 확인 가능) - 이렇게 하면 초기 스캔 속도가 빨라집니다.
* **동일한 서버에서 기존 Sapling 전용 설정을 Unified Address / Orchard로 마이그레이션하는 경우:** 이 필드는 비워 두세요.
* **동일한 지갑/UFVK로 상점을 새 서버로 옮기는 경우:** birth height를 선택적으로 입력할 수 있습니다 - 대략적으로 상점의 첫 유료 주문 시점의 높이입니다 (3xpl에서 주문 날짜를 맞춰 스캔 범위를 좁히세요). 확실하지 않다면 비워 두세요.

> 아직 모든 지갑이 **Unified Full Viewing Key (UFVK)** 내보내기를 지원하는 것은 아닙니다.  
> 권장 옵션:  
> – [**YWallet**](https://ywallet.app/installation)  
> – [**Zingo! Wallet (PC 버전)**](https://zingolabs.org/)  
> 두 앱 모두 백업/내보내기 섹션에서 UFVK 내보내기 옵션을 찾을 수 있습니다.

이 키들은 **자동 주소 회전**을 지원하므로 다음이 가능합니다:
- 모든 고객이 **고유한** 결제 주소를 받음
- 사용자는 **하나의 통합된** 잔액만 확인하면 됨

더 폭넓은 호환성 목록은 [ZecHub -> 지갑](https://zechub.wiki/wallets)에서 확인할 수 있습니다.

모든 필드를 입력한 후 **Save**를 클릭하세요.

---

### ZEC 결제 흐름 테스트하기

축하합니다 - 이제 Zcash 지갑이 BTCPay Server에 연결되었습니다.

테스트를 진행해 봅시다:

1. 다음으로 이동하세요:

`Invoices -> Create New`

2. 소액의 ZEC로 테스트 인보이스를 생성하세요.
3. **다른 지갑**(BTCPay에 연결한 지갑이 아닌 것)에서 자금을 보내세요.
4. 거래가 감지되면 인보이스 페이지에 시각적 축하 효과가 표시됩니다.
5. 인보이스 상태가 **Paid**로 바뀌는지 확인하세요.

모든 것이 잘 작동한다면 이제 API 또는 CMS 플러그인을 사용해 웹사이트에 ZEC 결제를 통합할 준비가 된 것입니다.



## 웹사이트에 BTCPay Server 통합하기

Zcash 지갑이 BTCPay Server에 연결되면 웹사이트에 결제 시스템을 통합할 수 있습니다.  
직접 API에 접근하는 방법부터 인기 있는 CMS 플랫폼용 플러그인을 사용하는 방법까지 여러 방식이 있습니다.

---

### 통합 옵션

- **API 통합**  
  자체 구축 웹사이트나 CMS가 없는 시스템에 적합합니다.  
  인보이스 생성, 결제 추적, 알림을 자신의 인터페이스와 로직 안에서 완전히 제어할 수 있습니다.  
  기본적인 프로그래밍 지식이 필요하므로, 이 작업은 개발자가 처리하는 것이 가장 좋습니다.

- **CMS 플러그인**  
  **WooCommerce**, **PrestaShop** 등의 플랫폼에서 사용할 수 있습니다.  
  이 플러그인을 사용하면 코딩 없이 몇 분 안에 결제를 받을 수 있습니다.

- **결제 버튼 또는 Iframe**  
  가장 단순한 방법입니다.  
  랜딩 페이지, 개인 웹사이트 또는 기부 링크나 체크아웃 위젯만 삽입하고 싶은 모든 사이트에 적합합니다.

---

### API 통합

사용자 정의 플랫폼을 사용 중이거나 CMS를 전혀 사용하지 않는다면 API가 가장 좋은 선택입니다.  
완전한 유연성을 제공하므로 인보이스를 생성하고, 상태를 추적하고, 알림을 받고, 사용자 경험을 전적으로 제어할 수 있습니다.

> 참고: 일부 CMS 플러그인도 내부적으로 API를 사용하므로, 어떤 통합 방식을 선택하든 API 키 생성은 종종 **첫 번째 필수 단계**입니다.

다음 단계: 상점용 API 키를 생성하고 [Greenfield API](https://docs.btcpayserver.org/API/Greenfield/v1/)를 사용해 통합을 구축하세요.


### API 키 생성하기

웹사이트나 앱에 BTCPay Server를 통합하려면 API 키를 생성해야 합니다.

1. BTCPay Server에 로그인하고 **사용자 메뉴**(오른쪽 상단)를 엽니다
2. **API Keys**로 이동합니다
3. **Create a new API key**를 클릭합니다
4. 키 이름을 입력합니다
5. **Permissions** 섹션에서 다음을 활성화합니다:
   - `Can create invoice`
   - `Can view invoice`
   - *(선택 사항)* `Can modify store settings` - 상점 수준 관리가 필요할 때만

6. **Generate**를 클릭합니다. 개인 API 키가 표시되므로 복사해 안전하게 보관하세요.

> 이 키는 상점의 인보이스에 대한 접근 권한을 부여합니다.  
> 공개적으로 공유하거나 클라이언트 측 코드에 노출하지 마세요.

---

### 예시: API를 통해 인보이스 생성하기

**엔드포인트:**

```
POST /api/v1/stores/{storeId}/invoices
Authorization: token {apiKey}
Content-Type: application/json
```

**요청 본문:**

```
{
  "amount": 5,
  "currency": "ZEC",
  "checkout": {
    "speedPolicy": "HighSpeed",
    "paymentMethods": ["Zcash"]
  }
}
```

**응답:**

다음이 포함된 JSON 객체를 받게 됩니다:

* `invoiceId`
* 웹사이트에 삽입하거나 고객에게 보낼 수 있는 결제 URL

전체 문서 보기:
[Greenfield API – 인보이스 생성](https://docs.btcpayserver.org/API/Greenfield/v1/#operation/CreateInvoice)

---

### Webhook 설정하기 (선택 사항)

인보이스 상태가 변경될 때(예: 결제가 수신되었을 때) 실시간 알림을 받으려면:

1. 상점 설정으로 가서 **Webhooks**로 이동합니다
2. BTCPay Server의 `POST` 요청을 처리할 백엔드 엔드포인트의 URL을 추가합니다
3. 인보이스가 결제되거나 만료되면 BTCPay가 자동으로 알림을 전송합니다

Webhook payload와 재시도 로직은 [공식 webhook 문서](https://docs.btcpayserver.org/FAQ/General/#how-to-create-a-webhook-)에 설명되어 있습니다.

> 다양한 프로그래밍 언어용 예시 통합은 BTCPay 문서와 GitHub 저장소에서 확인할 수 있습니다.



### CMS 통합

BTCPay Server는 인기 있는 콘텐츠 관리 시스템(CMS)용 플러그인을 지원합니다.  
가장 성숙하고 널리 사용되는 통합은 **WordPress + WooCommerce**와의 연동으로, **코드를 작성하지 않고도** ZEC 결제를 쉽게 받을 수 있습니다.

---

#### WooCommerce (WordPress)

BTCPay Server는 WooCommerce용 플러그인을 공식 지원합니다.

통합 단계:

1. WordPress 플러그인 디렉터리 또는 GitHub에서 **BTCPay for WooCommerce** 플러그인을 설치합니다.
2. WordPress 관리자 패널에서 다음으로 이동합니다:

`WooCommerce -> Settings -> Payments`

3. 목록에서 **BTCPay**를 찾아 **Set up**을 클릭합니다
4. BTCPay Server URL을 입력하고 인증 지침을 따릅니다  
   (자동 API 키 생성 권장)
5. 결제 방법을 활성화하고 설정을 저장합니다

> 자세한 지침, 영상 튜토리얼, 문제 해결 가이드는 플러그인 문서에서 확인할 수 있습니다.

BTCPay 문서의 같은 섹션에서 다른 CMS 통합 옵션도 찾을 수 있습니다.

---

### 결제 버튼 또는 Iframe (CMS나 API 불필요)

CMS를 사용하지 않고 API도 다루고 싶지 않다면, ZEC 결제를 받는 가장 쉬운 방법은 **결제 링크 또는 위젯을 웹사이트에 직접 삽입하는 것**입니다.

이 방법은 다음에 이상적입니다:

- 랜딩 페이지
- 포트폴리오 사이트
- 블로그 또는 정적 페이지
- 백엔드 서버가 없는 프로젝트

---

#### 옵션 1: 결제 버튼 (링크)

1. BTCPay Server의 **Invoices** 섹션에서 인보이스를 수동으로 생성합니다
2. 다음과 같은 결제 링크를 복사합니다:

`[https://btcpay.example.com/i/abc123](https://btcpay.example.com/i/abc123)`

3. HTML에 링크를 추가합니다:

```
<a href="https://btcpay.example.com/i/abc123" target="_blank">
  Pay with ZEC
</a>
```

---

#### 옵션 2: 삽입형 인보이스 (Iframe)

사이트에 인보이스를 직접 표시하려면 iframe을 사용하세요:

`<iframe src="https://btcpay.example.com/i/abc123" width="600" height="350" frameborder="0"></iframe>`

> 버튼이나 iframe 컨테이너를 사이트 디자인에 맞게 스타일링할 수 있습니다 - BTCPay Server는 인보이스 페이지의 유연한 테마 구성을 지원합니다.

## 결론

이 가이드는 길었지만, BTCPay Server에 Zcash 결제를 통합하는 기초적인 측면만 다루었습니다.

BTCPay Server 인터페이스는 여기서 보여드린 것보다 훨씬 더 많은 기능을 제공합니다. 다행히 UI는 여러 언어(러시아어 포함)로 제공되므로, 더 깊이 탐색하고 실험하기가 쉽습니다.

BTCPay는 매우 유연한 도구입니다. 다음이 가능합니다:

* 하나의 인스턴스에서 여러 독립 상점을 호스팅
* 팀원을 위한 사용자 정의 역할과 권한 설정 - 주문 조회 전용부터 전체 관리자까지
* 자체 도메인과 브랜딩 사용
* Webhook, fallback 지갑, 심지어 Tor 접근까지 설정
* 세금 규칙, 할인 코드, 체크아웃 페이지 사용자 정의, 결제 수단 제한 등 고급 설정 구성

BTCPay는 중앙화된 결제 제공업체에 대한 오픈소스 대안으로 만들어졌습니다. 중개자 없이 비공개 ZEC 결제를 받고자 한다면, 이 플랫폼은 분명 주목할 가치가 있습니다.

BTCPay 생태계를 탐색하고 결제를 진정으로 자신의 것으로 만드는 여정에 성공이 함께하길 바랍니다.

## 리소스

* [BTCPay Server 공식 웹사이트](https://btcpayserver.org/)
* [BTCPay FAQ](https://docs.btcpayserver.org/FAQ/)
* [BTCPay Server GitHub 저장소](https://github.com/btcpayserver/btcpayserver)
* [BTCPay Server 메인넷 데모](https://mainnet.demo.btcpayserver.org/login?ReturnUrl=%2F)
* [BTCPay용 Zcash 플러그인 (GitHub)](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
* [Zcash 플러그인 설치 가이드](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/installation.md)
* [사용자 정의 zcash-lightwalletd.custom.yml 예시](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/zcash-lightwalletd.custom.yml)
* [Lightwalletd Docker Compose 파일 (Zebra)](https://github.com/ZcashFoundation/zebra/blob/main/docker/docker-compose.lwd.yml)
* [BTCPay API 키 문서 (Greenfield API)](https://docs.btcpayserver.org/API/Greenfield/v1/#tag/API-Keys)
* [Cloudflare Tunnel 만들기](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/get-started/create-remote-tunnel/)
* [Zcash 지갑 호환성 목록 (ZecHub)](https://zechub.wiki/wallets)
* [Raspberry Pi 5에서 Zebra + Lightwalletd 실행하기 (ZecHub)](https://free2z.com/ZecHub/zpage/zcash-101-zebra-lightwalletd-sync-journal-on-raspberry-pi-5)
