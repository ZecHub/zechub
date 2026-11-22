# BTCPay Server와 Zcash 지원: 전체 설치 및 통합 안내서

BTCPay Server를 사용하면 온라인 사업자는 중개자나 수탁자 없이 암호화폐 결제를 직접 받을 수 있습니다. 이 가이드에서는 Zcash의 거래정보 보호 결제를 기본 지원하는 BTCPay Server를 설정하는 전체 과정을 안내합니다.

> 이 문서는 BTCPay Server 인스턴스에 Zcash를 통합하는 방법을 중점적으로 다룹니다.  
> **풀 노드(Zebra)**와 **lightwalletd 기반 설정**을 모두 지원합니다.

---

## 목차

- [BTCPay Server를 Zcash와 함께 사용해야 하는 이유](#why-use-btcpay-server-with-zcash)
- [BTCPay Server 작동 방식](#how-btcpay-server-works)
- [자금은 어디에 보관되나요? 개인 키는 누가 관리하나요?](#where-are-funds-stored-who-controls-the-private-keys)
- [BTCPay Server에서 Zcash을 받을 수 있도록 설정하는 방법](#how-to-set-up-btcpay-server-for-accepting-zcash)
  - [Zcash를 지원하는 BTCPay Server 배포하기](#deploying-btcpay-server-with-zcash-support)
  - [자체 Zcash 풀 노드 실행하기(Zebra + lightwalletd)](#running-your-own-zcash-full-node)
  - [외부 lightwalletd 노드에 연결하기(사용자 지정 설정)](#connecting-to-an-external-lightwalletd-node)
  - [Cloudflare Tunnel로 집에서 BTCPay Server 호스팅하기](#hosting-btcpay-server-at-home-with-cloudflare-tunnel)
- [웹 인터페이스에서 BTCPay Server 플러그인 설정하기Zcash](#configuring-the-zcash-plugin-in-the-btcpay-server-web-interface)
- [BTCPay Server를 웹사이트와 통합하기](#integrating-btcpay-server-with-your-website)
  - [API 통합](#api-integration)
    - [API 키 생성하기](#generating-an-api-key)
    - [예시: API로 인보이스 생성하기](#example-creating-an-invoice-via-api)
    - [웹훅 설정하기](#setting-up-a-webhook-optional)
  - [CMS 통합](#cms-integration)
  - [결제 버튼 또는 아이프레임](#payment-button-or-iframe-no-cms-or-api-needed)
- [결론](#conclusion)
- [자료](#resources)


---

## BTCPay Server를 Zcash와 함께 사용해야 하는 이유

온라인 상거래에서 암호화폐를 결제 수단으로 받는 경우가 점점 늘고 있습니다. 암호화폐 결제는 빠르고 전 세계에서 이용할 수 있으며 은행을 거치지 않습니다. 이는 판매자와 고객 모두에게 이점이 됩니다. 하지만 많은 사람이 간과하는 중요한 점이 있습니다.

고객은 주문할 때 보통 이름, 배송 주소, 전화번호 같은 개인정보를 제공합니다. 결제가 Bitcoin, Ethereum 또는 Ethereum이나 Tron의 스테이블코인처럼 공개 블록체인을 사용하는 경우, 거래 내역은 분석을 위해 영구적으로 공개됩니다.

무엇을 주문했는지 몰라도 누구나 다음을 확인할 수 있습니다.

- 결제 시점과 금액  
- 자금의 출처와 이동 경로  
- 상관관계가 드러나는 정보가 하나라도 있는 경우 암호화폐 주소와 실제 인물의 연결(예: 유출된 이메일이나 배송지 이름)

따라서 단 한 번의 구매로 고객의 금융 이력 전체가 드러날 수 있습니다.

반대의 경우도 마찬가지입니다. 판매자의 주소가 온체인에 한 번이라도 나타나면 판매자도 노출됩니다. 경쟁업체와 제3자는 결제량, 공급업체 활동, 비즈니스 자금 흐름의 구조를 추적할 수 있습니다.

### BTCPay Server와 Zcash를 함께 사용하면 이 문제를 해결할 수 있습니다.


BTCPay Server는 암호화폐 결제를 받을 수 있는 무료 탈중앙화 시스템입니다.  
결제 중개 서비스가 아니며 자금을 보관하지도 않습니다. 모든 결제는 판매자의 지갑으로 직접 전송됩니다.  
개인 지갑을 사용하거나 조직 내 다중 서명 설정을 이용할 수 있습니다.

서버는 다음과 같은 조정 작업을 처리합니다.

- 주문마다 고유한 주소 생성  
- 결제 수신 시점 추적 및 주문과 연결  
- 영수증과 알림 발송  
- 고객을 위한 결제 인터페이스 제공  

모든 과정은 제3자 서비스에 의존하지 않고 상점 소유자의 관리하에 실행됩니다.

Zcash는 영지식 증명을 기반으로 하는 암호화폐입니다. 완전한 프라이버시를 제공하는 거래 모델을 지원합니다.  
거래정보 보호 주소(이하 “주소”)를 사용하면 발신자, 수신자, 거래 금액이 블록체인에 공개되지 않습니다.

온라인 상점에서는 다음과 같은 의미가 있습니다.

- 구매자는 자신의 금융 이력을 공개하지 않고 결제를 완료할 수 있습니다.  
- 판매자는 주소, 매출액 또는 거래 구조를 노출하지 않고 결제를 받을 수 있습니다.  
- 외부 관찰자는 결제 내역을 주문이나 고객 데이터와 연결할 수 없습니다.

### 실제 사례

사용자가 주문한 뒤 Bitcoin 또는 USDT를 결제 수단으로 선택합니다.  
웹사이트는 결제 주소를 생성하고 금액을 표시합니다.  
결제가 이루어지면 이 주소가 블록체인에 기록되어 공개됩니다.  
공격자는 주문 하나와 주소를 연결하기만 하면 해당 주소의 전체 거래 이력을 장기간 추적할 수 있습니다.

이제 같은 상황에서 Zcash를 사용한다고 가정해 보겠습니다.  
BTCPay Server는 거래정보 보호 주소를 생성합니다. 구매자는 결제를 전송합니다.  
블록체인에서는 아무 일도 일어나지 않은 것처럼 보입니다. 분석할 공개 데이터가 없습니다.  
서버는 결제 확인을 받아 주문과 연결한 뒤 절차를 완료합니다.

외부인에게는 아무 일도 일어나지 않은 것처럼 보입니다.  
모든 처리는 상점과 고객 사이에서만 이루어집니다. 그래야 합니다.

이 솔루션은 자동화나 사용 편의성을 희생하지 않습니다.  
데이터 유출 위험만 없을 뿐, 다른 암호화폐를 사용할 때와 똑같이 작동합니다.



## BTCPay Server 작동 방식

BTCPay Server는 전자상거래 플랫폼과 블록체인 사이에서 결제 처리 브릿지 역할을 합니다. 결제 흐름은 다음과 같습니다.

1. **고객이 웹사이트에서 주문합니다**(예: WooCommerce, Magento 또는 BTCPay 통합을 지원하는 플랫폼).

2. **상점이 BTCPay Server에 결제 인보이스를 요청합니다.** 서버는 다음 정보를 포함한 고유한 인보이스를 생성합니다.
   - 주문 금액
   - 카운트다운 타이머
   - 기본적으로 Orchard(거래정보 보호) 수신자가 포함된 Zcash 통합 주소(UA)(예: `u1...`)

3. **고객에게 결제 페이지가 표시되고**, 고객은 제공된 주소로 ZEC를 전송합니다.

4. **BTCPay Server가 블록체인을 모니터링하며** 다음 항목을 기준으로 결제를 확인합니다.
   - 예상 금액
   - 수신 주소
   - 인보이스 타임스탬프

5. **거래가 감지되고 확인되면**, BTCPay가 상점에 알립니다.

6. **고객이 결제 확인을 받습니다.** 선택적으로 서버에서 이메일로 영수증을 보낼 수 있습니다.

이 모든 과정은 중개자나 수탁자 없이 **자동으로** 이루어집니다.  
BTCPay Server는 **자금을 보관하지 않습니다**. 주문 시스템을 블록체인에 안전하고 비공개로 연결할 뿐입니다.
## 자금은 어디에 보관되나요? 개인 키는 누가 관리하나요?

BTCPay Server는 지갑이 **아니며** 개인 키도 **필요하지 않습니다**.  
모든 자금은 판매자의 지갑으로 **직접** 전송됩니다. 보안은 **viewing key 기반 구조**를 사용해 유지됩니다.

### 작동 방식

- **지갑은 미리 생성합니다.**  
  판매자는 viewing key를 지원하는 Zcash 지갑을 사용합니다. 예를 들어 [Zkool](https://github.com/hhanh00/zkool2/) 또는 [Zingo! Wallet](https://zingolabs.org/)를 사용할 수 있습니다.  
  전체 목록은 [ZecHub.wiki](https://zechub.wiki/wallets)에서 확인할 수 있습니다.

- **BTCPay Server는 viewing key를 통해 연결됩니다.**  
  viewing key는 **읽기 전용 키**입니다. 수신 결제를 감지하고 새 수신 주소를 생성할 수는 있지만,  
  자금을 사용할 수는 없습니다. 서버는 seed phrase나 개인 키를 저장하지 않습니다.

- **블록체인 데이터는 `lightwalletd` 서버를 통해 액세스합니다.**  
  `https://zec.rocks`와 같은 공개 노드를 사용하거나, 완전한 주권을 위해 자체 `Zebra + lightwalletd` 스택을 실행할 수 있습니다.

- **주문마다 고유한 주소가 생성됩니다.**  
  viewing key를 사용하면 서버가 모든 인보이스에 대해 새 Zcash 거래정보 보호 주소를 생성할 수 있으므로,  
  결제를 안전하게 추적하고 주소 재사용을 방지할 수 있습니다.

- **자금에 대한 완전한 통제권은 판매자에게 있습니다.**  
  서버가 침해되더라도 누구도 자금을 훔칠 수 없습니다. 결제 메타데이터만 노출될 수 있습니다.

이 설계는 **인프라**와 **자산 통제**를 분리합니다.  
자금을 위험에 빠뜨리지 않고 BTCPay Server를 업데이트하거나 이전하거나 다시 설치할 수 있습니다.

## BTCPay Server에서 Zcash을 받을 수 있도록 설정하는 방법

앞 절에서는 BTCPay Server가 Zcash와 함께 작동하는 방식과 프라이버시를 보호하는 결제에서 중요한 이유를 설명했습니다. 이제 직접 설정해 보겠습니다.

구체적인 설정은 다음과 같은 여러 요인에 따라 달라집니다.

- 이미 BTCPay Server 인스턴스가 있나요?
- 공개 lightwalletd를 사용하시겠습니까, 아니면 자체 풀 노드를 실행하시겠습니까?
- 서버를 VPS에서 실행하시겠습니까, 아니면 집에서 실행하시겠습니까?

이 장에서는 최소한의 설정부터 완전한 주권을 갖춘 배포까지 현재 이용 가능한 모든 설정 시나리오를 다룹니다.

다음 내용을 살펴보겠습니다.

- 풀 노드(Zebra)를 포함해 VPS에서 처음부터 모두 배포하는 방법
- 집에서 **Cloudflare Tunnel**을 사용해 IP를 숨긴 채 BTCPay Server를 실행하는 방법
- BTCPay Server 웹 인터페이스에서 Zcash 지원을 활성화하고 설정하는 방법
- BTCPay를 웹사이트나 온라인 상점과 통합하는 방법


## BTCPay Server에 Zcash 지원을 추가해 배포하기

실제 설정을 시작하겠습니다. 이 절에서는 새 VPS에 BTCPay Server를 설치하거나 기존 인스턴스에 ZEC 지원을 추가해 Zcash 지원을 설정하는 방법을 설명합니다.

이미 BTC 또는 Lightning용으로 BTCPay Server를 실행 중이라면 모든 것을 다시 설치할 필요 없이 ZEC 플러그인만 활성화하면 됩니다.

공개 `lightwalletd` 노드를 사용하는 최소 설정부터 자체 풀 노드를 갖춘 완전한 주권형 설치까지 다양한 설정을 살펴보겠습니다.  
가장 적합한 방법은 서버 위치와 외부 인프라로부터 어느 정도 독립하기를 원하는지에 따라 달라집니다.

> 공식 플러그인 문서:  
> [https://github.com/btcpay-zcash/btcpayserver-zcash-plugin](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
>
> **경고 - 인스턴스당 지갑 1개:**  
> Zcash 플러그인은 BTCPay 인스턴스의 **모든 상점에서 하나의 공유 지갑**을 사용합니다.  
> 하나의 인스턴스에서 서로 독립된 상점을 여러 개 호스팅하면 모두 같은 Zcash 지갑을 공유하게 됩니다.  
> 지갑을 엄격하게 분리해야 한다면 별도의 인스턴스를 사용하세요.

---

### 권장 VPS 설정

설치하기 전에 다음을 준비하세요.

- **Ubuntu 22.04 이상**을 실행하는 VPS
- 서버 IP 주소를 가리키는 도메인 이름(DNS 설정)
- `git`, `docker`, `docker-compose` 설치
- 서버에 대한 SSH 액세스

---

## 서버 준비(접힌 부분)

<details>
  <summary>클릭하여 펼치기</summary>

Zcash 지원을 포함해 BTCPay Server를 배포하려면 다음이 필요합니다.

### 1. Ubuntu 22.04 이상을 실행하는 VPS

**Ubuntu Server 22.04 LTS** 최소 설치를 권장합니다.  
전용 IP 주소를 제공하는 VPS 업체라면 어디든 사용할 수 있습니다.

**최소 요구 사항**:  
- CPU 코어 2개  
- RAM 4 GB  
- 디스크 공간 40 GB  

Zcash에 lightwalletd를 사용하는 경우에는 이 설정으로 충분합니다.  
**Zcash 풀 노드**를 실행할 계획이라면 여유 디스크 공간이 **최소 300 GB** 필요합니다.

---

### 2. 서버를 가리키는 도메인 이름

DNS 제공업체의 대시보드에서 하위 도메인에 대한 `A` 레코드를 생성합니다.  
예를 들어 `btcpay.example.com`가 VPS IP 주소를 가리키도록 설정합니다.

이 도메인은 브라우저에서 BTCPay Server에 액세스하고  
Let's Encrypt를 통해 **무료 SSL 인증서**를 자동으로 생성하는 데 사용됩니다.

---

### 3. 서버에 대한 SSH 액세스

BTCPay Server를 설치하려면 SSH를 통해 VPS에 연결해야 합니다.  
터미널에서 다음을 실행합니다.

`ssh root@YOUR_SERVER_IP`

macOS, Linux 또는 Windows의 WSL을 사용하는 경우 SSH가 이미 터미널에서 제공됩니다.  
일반 Windows에서는 **PuTTY** 같은 SSH 클라이언트를 사용하세요.

---

### 4. Git, Docker, Docker Compose 설치

SSH로 연결한 뒤 시스템 패키지를 업데이트하고 필요한 구성 요소를 설치합니다.

```
sudo apt update && sudo apt upgrade -y
sudo apt install git curl docker.io docker-compose-plugin -y
sudo systemctl enable docker
```

> Ubuntu 22.04 이상에서는 APT의 `docker-compose`가 더 이상 사용되지 않습니다.  
> 권장 패키지는 `docker-compose-plugin`이며 `docker compose` 명령을 제공합니다(대시 대신 공백이 들어갑니다).

이제 서버 환경에서 BTCPay Server를 설치할 준비가 되었습니다.

</details>

---

### 1단계: 저장소 복제하기

작업 디렉터리를 만들고 BTCPay Server Docker 배포 파일을 다운로드합니다.

```
mkdir BTCPayServer
cd BTCPayServer
git clone https://github.com/btcpayserver/btcpayserver-docker
cd btcpayserver-docker
```

---

### 2단계: 환경 변수 내보내기

`btcpay.example.com`를 실제 도메인으로 바꿉니다.

```
export BTCPAY_HOST="btcpay.example.com"
export NBITCOIN_NETWORK="mainnet"
export BTCPAYGEN_CRYPTO1="btc"
export BTCPAYGEN_CRYPTO2="zec"
export BTCPAYGEN_REVERSEPROXY="nginx"
export BTCPAYGEN_LIGHTNING="none"
```

> 나중에 Monero나 Litecoin을 추가할 계획이라면 지금 함께 입력할 수 있습니다.

```
export BTCPAYGEN_CRYPTO3="ltc"
export BTCPAYGEN_CRYPTO4="xmr"
```

적절한 변수를 내보내고 설정 스크립트를 다시 실행하면 언제든지 코인을 추가할 수 있습니다.

`. ./btcpay-setup.sh -i`

이 안내서에서는 **Zcash만** 다룹니다.

---

### 3단계: 설치 프로그램 실행하기

설정 스크립트를 실행해 서버를 빌드하고 시작합니다.

`. ./btcpay-setup.sh -i`

스크립트가 종속 항목을 설치하고 `docker-compose.yml`를 생성한 뒤 서비스를 시작하고 `systemd`를 설정합니다.  
약 5분 정도 걸립니다.

완료되면 BTCPay Server 인스턴스에 다음 주소로 액세스할 수 있습니다.

`https://btcpay.example.com`

> 기존 설치를 수정하는 경우(예: ZEC 추가) 새 설정을 적용하려면 서버를 중지한 후 다시 시작해야 합니다.

```
cd ~/BTCPayServer/btcpayserver-docker
btcpay-down.sh
. ./btcpay-setup.sh -i
```

다음 절로 이동해 BTCPay Server 웹 인터페이스에서 Zcash를 설정합니다.

## 나만의 Zcash 풀 노드 실행하기

공개 `lightwalletd` 노드에 의존하고 싶지 않다면, 같은 서버에 lightwalletd와 함께 나만의 풀 Zcash 노드를 배포할 수 있습니다.  
이렇게 하면 **완전한 자율성**을 확보할 수 있습니다. 외부 의존성도 없고 신뢰할 대상도 필요하지 않습니다.

---

### 1단계: 충분한 디스크 공간 확보하기

풀 Zcash 노드(Zebra + lightwalletd)에는 현재 **300+ GB**의 디스크 공간이 필요하며, 용량은 계속 증가합니다.

세부 내역:

- Zebra 블록체인 데이터베이스: 약 260~270 GB
- lightwalletd 인덱싱: 약 15~20 GB

#### 권장 저장 공간:

- 서버를 Zcash 결제에만 사용하는 경우 **400 GB 이상**
- 서버에서 BTCPay Server, PostgreSQL, Nginx 등을 함께 실행하는 경우 **800 GB 이상**

> 이상적으로는 용량이 **1 TB**인 SSD/NVMe 디스크를 사용하세요. 특히 데이터를 정기적으로 프루닝할 계획이 없다면 더욱 그렇습니다.

---

### 2단계: 환경 변수 설정하기

풀 노드 설정을 활성화하려면 다음 내용을 환경 설정에 추가하세요.

```
export BTCPAYGEN_EXCLUDE_FRAGMENTS="zcash"
export BTCPAYGEN_ADDITIONAL_FRAGMENTS="zcash-fullnode"
```

여기에는 `zcash-fullnode` 프래그먼트가 포함되어, BTCPay Server 내부에서 `zebrad`와 `lightwalletd`를 모두 실행합니다.

---

### 3단계: 설치 프로그램 다시 실행하기

`. ./btcpay-setup.sh -i`

스크립트는 다음 작업을 수행합니다.

* Zebra 및 lightwalletd용 Docker 이미지를 다운로드합니다.
* BTCPay 스택 내부에 서비스를 설정합니다.
* Zcash 플러그인을 **로컬** `lightwalletd` 인스턴스에 연결합니다.

> **블록체인 전체를 동기화하는 데 며칠이 걸릴 수 있습니다.** 특히 리소스가 제한된 VPS 서버에서는 더 오래 걸릴 수 있습니다.
> 동기화가 완료될 때까지 거래정보 보호 결제를 사용할 수 없습니다.


## 외부 lightwalletd 노드에 연결하기

대부분의 경우 완전한 자율성까지는 필요하지 않으며, 판매자는 풀 Zcash 노드를 실행하는 데 시간과 디스크 공간을 들이고 싶지 않을 수 있습니다.  
기본적으로 BTCPay Server는 공개 `lightwalletd` 노드에 연결하여 전체 블록체인을 다운로드하지 않고 거래정보 보호 결제를 처리합니다.

기본 엔드포인트는 다음과 같습니다.

`https://zec.rocks:443`

하지만 BTCPay Server가 다음과 같은 **외부 `lightwalletd` 노드**에 연결되도록 설정할 수 있습니다.

`https://lightwalletd.example:443`

이 섹션에서는 **사용자 지정 Docker 프래그먼트**를 사용하여 설정하는 방법을 설명합니다.

> 모든 환경 변수가 포함된 전체 설정 예시는 [플러그인 저장소](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/zcash-lightwalletd.custom.yml)에서 확인할 수 있습니다.  
> 아래 단계에서는 최소한으로 작동하는 설정을 안내합니다.

---

### 1단계: 사용자 지정 Docker 프래그먼트 만들기

BTCPayServer 프로젝트 디렉터리에서 사용자 지정 프래그먼트 파일을 만드세요.

```
cd ~/BTCPayServer/btcpayserver-docker
mkdir -p docker-compose-generator/docker-fragments
nano docker-compose-generator/docker-fragments/zcash-lightwalletd.custom.yml
```

다음 내용을 추가하세요.

```
exclusive:
- zcash
```

`exclusive` 지시문을 사용하면 같은 레이블을 가진 프래그먼트(이 경우 `zcash`)는 한 번에 하나만 활성화할 수 있습니다.
이렇게 하면 설정 충돌을 방지할 수 있습니다. 예를 들어, `zcash-fullnode` 프래그먼트와 이 사용자 지정 외부 `lightwalletd` 프래그먼트를 동시에 실행할 수 없습니다.
이를 `exclusive: zcash`로 지정하면 BTCPay Server가 기본 `zcash-fullnode` 및 내부 `lightwalletd` 컨테이너를 자동으로 비활성화하므로, 대신 사용자의 외부 노드에 연결할 수 있습니다.

---

### 2단계: 환경 변수 설정하기

터미널에서 다음을 실행하세요.

```
export BTCPAYGEN_EXCLUDE_FRAGMENTS="$BTCPAYGEN_EXCLUDE_FRAGMENTS;zcash"
export BTCPAYGEN_ADDITIONAL_FRAGMENTS="$BTCPAYGEN_ADDITIONAL_FRAGMENTS;zcash-lightwalletd.custom"
```

---

### 3단계: 외부 노드 주소 지정하기

`.env` 파일을 여세요.

`nano .env`

URL을 선택한 엔드포인트로 바꾸어 다음 줄을 추가하세요.

`ZCASH_LIGHTWALLETD=https://lightwalletd.example:443`

다음 중 하나를 사용할 수 있습니다.

* `https://zec.rocks:443`와 같은 **공개 노드**
* BTCPay Server와 별도로 배포한 나만의 자체 호스팅 노드

> 외부 `lightwalletd`를 사용할 수 없게 되거나 과부하가 걸리면 거래정보 보호 결제가 실패합니다.
> 중요한 서비스를 운영하는 경우 기본 `zec.rocks`처럼 **안정성과 신뢰성이 입증된 엔드포인트**를 선택하세요.

> `lightwalletd`를 자체 호스팅하고 싶으신가요?
> [Zebra 저장소](https://github.com/ZcashFoundation/zebra/blob/main/docker/docker-compose.lwd.yml)의 `docker-compose.lwd.yml`를 사용할 수 있습니다.
> **경고:** 이 설정은 공식적으로 문서화되어 있지 않으며 TLS 설정, 포트 포워딩, 방화벽 구성을 수동으로 해야 합니다. 고급 사용자에게만 권장합니다.

---

### 4단계: 설치 프로그램 다시 실행하기

`. ./btcpay-setup.sh -i`

BTCPay Server가 사용자 지정 설정을 적용하고 지정된 `lightwalletd` 노드에 연결합니다.

이제부터 Zcash 플러그인은 거래정보 보호 거래를 처리할 때 해당 외부 엔드포인트를 사용합니다.


## Cloudflare Tunnel로 집에서 BTCPay Server 호스팅하기

Raspberry Pi 5나 로컬 서버처럼 **고정 IP가 없는** 집 안의 기기에서 BTCPay Server를 호스팅하면서 Zcash 결제를 받고 싶으신가요?  
**Cloudflare Tunnel**을 사용하면 인스턴스를 인터넷에 안전하게 공개할 수 있습니다.

이 방법은 포트 포워딩 없이 서버를 HTTPS로 접속할 수 있게 하면서, 실제 IP 주소가 외부에 노출되지 않도록 합니다.

또한 VPS 대여 비용을 **절약하는 데도 도움이 되므로**, 암호화폐 결제가 사업의 핵심이 아니라 선택 기능인 경우에 적합합니다.

---

### 1단계: Cloudflare Tunnel 설치하기

1. [cloudflare.com](https://www.cloudflare.com)에서 계정을 만들고 도메인을 추가하세요.
2. **홈 서버**에 Cloudflare의 공식 패키지 저장소를 사용해 Cloudflare Tunnel을 설치하세요.

```bash
sudo mkdir -p --mode=0755 /usr/share/keyrings
curl -fsSL https://pkg.cloudflare.com/cloudflare-main.gpg | sudo tee /usr/share/keyrings/cloudflare-main.gpg >/dev/null
echo "deb [signed-by=/usr/share/keyrings/cloudflare-main.gpg] https://pkg.cloudflare.com/cloudflared any main" | sudo tee /etc/apt/sources.list.d/cloudflared.list
sudo apt update
sudo apt install cloudflared
```

`apt install cloudflared`가 실패하면 대신 해당 `.deb`를 설치하세요.

```bash
# Raspberry Pi / ARM64
curl -L --output cloudflared.deb https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-arm64.deb
sudo dpkg -i cloudflared.deb
```

```bash
# x86_64
curl -L --output cloudflared.deb https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
sudo dpkg -i cloudflared.deb
```

3. Cloudflare에 인증하세요.

`cloudflared tunnel login`

이 명령을 실행하면 브라우저 창이 열립니다. 로그인한 다음 도메인에 대한 액세스를 승인하세요.
Cloudflare가 서버에 토큰이 포함된 `credentials` 파일을 자동으로 만듭니다.

4. 새 터널을 만드세요. 이름은 `btcpay` 또는 원하는 다른 이름으로 지정할 수 있습니다.

`cloudflared tunnel create btcpay`

터널 ID와 인증 정보가 포함된 `btcpay.json` 파일이 생성됩니다. 다음 단계에서 이 파일이 필요합니다.

---

### 2단계: 터널 설정 파일 만들기

설정 디렉터리를 만들고(없는 경우) 설정 파일을 여세요.

```
sudo mkdir -p /etc/cloudflared
sudo nano /etc/cloudflared/config.yml
```

다음 설정을 붙여 넣으세요.

```
tunnel: btcpay    # your tunnel name
credentials-file: /root/.cloudflared/btcpay.json

ingress:
  - hostname: btcpay.example.com      # your domain
    service: http://127.0.0.1:80
  - service: http_status:404
```

#### 설명:

* `tunnel` - 앞에서 만든 터널의 이름
* `credentials-file` - `cloudflared tunnel login` 중에 생성된 토큰 파일의 경로
* `hostname` - Cloudflare에 등록된 도메인(예: `btcpay.example.com`)
* `service` - BTCPay Server의 로컬 주소(Nginx의 경우 보통 `http://127.0.0.1:80`)

> Cloudflare가 집의 IP를 노출하지 않고 로컬 서버로 트래픽을 안전하게 프록시합니다.


### 3단계: 터널의 DNS 레코드 추가하기

터널을 만든 후 Cloudflare는 보통 도메인에 대한 CNAME DNS 레코드를 **자동으로 추가합니다**. 레코드는 다음과 같이 표시되어야 합니다.

`btcpay.example.com -> <UUID>.cfargotunnel.com`

자동으로 표시되지 않으면 직접 추가하세요.

1. [Cloudflare 대시보드](https://dash.cloudflare.com/)로 이동하세요.
2. **DNS** 섹션으로 이동하세요.
3. 새 CNAME 레코드를 추가하세요.
   - **이름**: `btcpay`
   - **대상**: `<UUID>.cfargotunnel.com`  
     정확한 값은 `btcpay.json` 파일에서 확인하거나 다음 명령을 실행해 찾을 수 있습니다.
     
     `cloudflared tunnel list`
     
   - **프록시 상태**: 활성화(주황색 구름)

> 이 레코드를 설정하면 `btcpay.example.com`로 들어오는 모든 요청이 Cloudflare Tunnel을 거치므로 실제 IP 주소가 외부에 노출되지 않습니다.

---

### 4단계: 시스템 시작 시 터널 활성화하기

시스템이 부팅될 때 터널이 자동으로 실행되도록 시스템 서비스로 설치하세요.

`sudo cloudflared service install`

그런 다음 서비스를 활성화하고 시작하세요.

```
sudo systemctl enable cloudflared
sudo systemctl start cloudflared
```

상태를 확인하세요.

`sudo systemctl status cloudflared`

`Active: active (running)`와 같은 메시지와 `btcpay.example.com`가 온라인 상태라는 확인 메시지가 표시되어야 합니다.

> 이제부터 시스템을 재부팅할 때마다 터널이 자동으로 시작되며, 포트 포워딩이나 실제 IP 노출 없이 BTCPay Server에 공개적으로 접속할 수 있습니다.

---

### 5단계: BTCPay Server 설정 마무리하기

BTCPay Server를 처음 설치하려는 경우 설정 스크립트를 실행하기 전에 도메인을 지정하세요.

`export BTCPAY_HOST="btcpay.example.com"`

이렇게 하면 **Nginx 설정**과 **SSL 인증서**를 생성할 때 올바른 도메인이 사용됩니다.

BTCPay Server가 이미 설치되어 있고 터널만 추가하려는 경우에는 다음을 실행하세요.

```
cd ~/BTCPayServer/btcpayserver-docker
. ./btcpay-setup.sh -i
```

설정이 구성을 다시 생성하고 새 도메인을 적용합니다.
이제 다음 주소에서 서버에 접속할 수 있습니다.

`https://btcpay.example.com`

> 공개 `lightwalletd`를 사용하든 나만의 풀 노드를 사용하든 터널에는 영향을 주지 않습니다.
> 중요한 것은 BTCPay Server가 로컬에서 `127.0.0.1:80`를 수신 대기하고 있는지 여부뿐입니다.


## Zcash 플러그인을 BTCPay Server 웹 인터페이스에서 설정하기

> **여러 상점을 사용하는 경우 중요:**  
> 여기서 설정한 Zcash 지갑은 인스턴스 전체에 적용됩니다. 별도의 BTCPay 인스턴스를 실행하지 않는 한 모든 상점이 이 지갑을 사용합니다.

BTCPay Server 인스턴스를 성공적으로 배포한 후에는 관리자 웹 인터페이스에서 기본 설정을 해야 합니다.  
공식 문서에는 영어로 전체 안내가 제공됩니다. 여기서는 필수 단계와 Zcash 플러그인 설정에 중점을 두고 설명합니다.

---

### 1단계: 웹 인터페이스에 로그인하기

다음 주소에서 인스턴스에 접속하세요.

`[https://btcpay.example.com](https://btcpay.example.com)`

- 관리자 로그인 정보와 비밀번호를 입력하세요.
- 처음 로그인하는 경우 계정을 만들라는 안내가 표시됩니다.
- 처음 등록하는 계정에는 자동으로 관리자 권한이 부여됩니다.

---

### 2단계: Zcash 플러그인 설치하기

1. 기본 메뉴에서 다음 항목으로 이동하세요.

`Plugins -> Browse Plugins`

2. **Zcash(ZEC)** 플러그인을 찾으세요. 필요한 경우 검색창을 사용하세요.
3. **설치**를 클릭하고 확인하세요.

> 서버 설정 중 활성화한 다른 알트코인 플러그인도 같은 방법으로 설치하세요.

설치한 후 **서버 다시 시작**을 클릭하여 플러그인이 활성화된 인터페이스를 다시 불러오세요.


### 3단계: Viewing Key로 지갑 연결하기

플러그인을 설치하면 설정 메뉴에 새로운 **Zcash** 섹션이 나타납니다.

1. 다음 항목으로 이동하세요.

`Zcash -> Settings`

2. **통합 Full Viewing Key(UFVK)**를 붙여 넣으세요. BTCPay는 각 인보이스에 대해 통합 주소를 만들고 거래정보 보호 결제의 입금을 감지합니다.

> **참고:** 기존 Sapling viewing key도 지원됩니다. 하지만 Orchard/통합 주소를 사용하려면 **UFVK**를 입력해야 합니다.


   형식 예시:

`uview184syv9wftwngkay8d...`

3. 블록 높이 필드에 값을 입력하세요.

* **새 지갑(seed phrase)으로 처음 설정하는 경우:** 현재 Zcash 블록 높이를 입력하세요(3xpl.com/zcash에서 확인할 수 있습니다). 이렇게 하면 초기 스캔 속도가 빨라집니다.
* **같은 서버에서 기존 Sapling 전용 설정을 통합 주소 / Orchard로 이전하는 경우:** 이 필드를 비워 두세요.
* **같은 지갑/UFVK를 사용해 상점을 새 서버로 옮기는 경우:** 선택 사항으로 생성 높이를 입력할 수 있습니다. 이는 상점에서 처음 결제된 주문의 대략적인 블록 높이입니다(스캔 범위를 좁히려면 3xpl에서 주문 날짜와 맞춰 보세요). 확실하지 않으면 비워 두세요.

> 아직 모든 지갑에서 **통합 Full Viewing Key(UFVK)** 내보내기를 지원하는 것은 아닙니다.  
> 권장 옵션:  
> – [**Zkool**](https://github.com/hhanh00/zkool2/)  
> – [**Zingo! 지갑(PC 버전)**](https://zingolabs.org/)  
> 두 앱 모두 백업/내보내기 섹션에서 UFVK 내보내기 기능을 찾으세요.

이 키는 **주소 자동 교체**를 지원합니다. 즉,
- 고객마다 **서로 다른** 결제 주소를 받습니다.
- 잔액은 **하나로 통합되어** 표시됩니다.

[ZecHub -> 지갑](https://zechub.wiki/wallets)에서 더 폭넓은 호환성 목록을 확인할 수 있습니다.

모든 필드에 값을 입력한 후 **저장**을 클릭하세요.

---

### ZEC 결제 흐름 테스트하기

축하합니다. 이제 Zcash 지갑이 BTCPay Server에 연결되었습니다.

테스트를 진행해 보세요.

1. 다음 항목으로 이동하세요.

`Invoices -> Create New`

2. ZEC로 소액 테스트 인보이스를 생성하세요.
3. **다른 지갑**(BTCPay에 연결한 지갑이 아닌 지갑)에서 자금을 보내세요.
4. 거래가 감지되면 인보이스 페이지에 축하 애니메이션이 표시됩니다.
5. 인보이스 상태가 **결제 완료**로 바뀌는지 확인하세요.

모든 과정이 제대로 작동한다면 API나 CMS 플러그인을 사용해 웹사이트에 ZEC 결제를 연동할 준비가 된 것입니다.



## BTCPay Server를 웹사이트에 연동하기

Zcash 지갑을 BTCPay Server에 연결하면 결제 시스템을 웹사이트에 연동할 수 있습니다.  
직접 API에 액세스하는 방법부터 널리 사용되는 CMS 플랫폼용 플러그인까지 여러 가지 방법이 있습니다.

---

### 연동 옵션

- **API 연동**  
  직접 구축한 웹사이트나 CMS가 없는 시스템에 적합합니다.  
  자체 인터페이스와 로직 안에서 인보이스 생성, 결제 추적, 알림을 모두 제어할 수 있습니다.  
  기본적인 프로그래밍 지식이 필요하므로 개발자가 담당하는 것이 좋습니다.

- **CMS 플러그인**  
  **WooCommerce**, **PrestaShop** 등의 플랫폼에서 사용할 수 있습니다.  
  이 플러그인을 사용하면 코딩 없이 몇 분 만에 결제를 받을 수 있습니다.

- **결제 버튼 또는 iframe**  
  가장 간단한 방법입니다.  
  랜딩 페이지, 개인 웹사이트 또는 기부 링크나 결제 위젯을 삽입하려는 사이트에 적합합니다.

---

### API 연동

사용자 지정 플랫폼을 사용하거나 CMS가 없다면 API를 사용하는 것이 가장 좋습니다.  
API를 사용하면 인보이스를 만들고, 상태를 추적하고, 알림을 받으며, 사용자 경험을 완전히 제어할 수 있습니다.

> 참고: 일부 CMS 플러그인도 내부적으로 API를 사용하므로 어떤 연동 방법을 선택하든 API 키를 만드는 것이 **첫 번째 필수 단계**인 경우가 많습니다.

다음 단계로, 상점의 API 키를 생성하고 [Greenfield API](https://docs.btcpayserver.org/API/Greenfield/v1/)를 사용해 연동 기능을 만들어 보세요.


### API 키 생성하기

BTCPay Server를 웹사이트나 앱에 연동하려면 API 키를 생성해야 합니다.

1. BTCPay Server에 로그인하고 **사용자 메뉴**(오른쪽 상단)를 여세요.
2. **API 키**로 이동하세요.
3. **새 API 키 만들기**를 클릭하세요.
4. 키 이름을 입력하세요.
5. **권한** 섹션에서 다음 권한을 활성화하세요.
   - `Can create invoice`
   - `Can view invoice`
   - *(선택 사항)* `Can modify store settings` - 상점 수준의 관리가 필요한 경우에만 선택하세요.

6. **생성**을 클릭하세요. 개인 API 키가 표시됩니다. 키를 복사하여 안전하게 보관하세요.

> 이 키를 사용하면 상점의 인보이스에 액세스할 수 있습니다.  
> 공개적으로 공유하거나 클라이언트 측 코드에 노출하지 **마세요**.

---

### 예시: API로 인보이스 만들기

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

다음 항목이 포함된 JSON 객체를 받게 됩니다.

* `invoiceId`
* 웹사이트에 삽입하거나 고객에게 보낼 수 있는 결제 URL

전체 문서는 다음을 참조하세요.  
[Greenfield API – 인보이스 만들기](https://docs.btcpayserver.org/API/Greenfield/v1/#operation/CreateInvoice)

---

### 웹훅 설정하기(선택 사항)

인보이스 상태가 바뀔 때(예: 결제를 받을 때) 실시간 알림을 받으려면 다음을 수행하세요.

1. 상점 설정 -> **웹훅**으로 이동하세요.
2. BTCPay Server에서 보내는 `POST` 요청을 처리할 백엔드 엔드포인트의 URL을 추가하세요.
3. 인보이스가 결제되거나 만료되면 BTCPay가 자동으로 알림을 보냅니다.

웹훅 페이로드와 재시도 로직은 [공식 웹훅 문서](https://docs.btcpayserver.org/FAQ/General/#how-to-create-a-webhook-)에 설명되어 있습니다.

> BTCPay 문서와 GitHub 저장소에서 여러 프로그래밍 언어로 작성된 연동 예시를 확인할 수 있습니다.



### CMS 연동

BTCPay Server는 널리 사용되는 콘텐츠 관리 시스템(CMS)용 플러그인을 지원합니다.  
가장 성숙하고 널리 사용되는 연동은 **WordPress + WooCommerce**입니다. 덕분에 **코드를 작성하지 않고도** ZEC 결제를 쉽게 받을 수 있습니다.

---

#### WooCommerce(WordPress)

BTCPay Server는 WooCommerce용 플러그인을 공식적으로 지원합니다.

연동 단계:

1. WordPress 플러그인 디렉터리 또는 GitHub에서 **BTCPay for WooCommerce** 플러그인을 설치하세요.
2. WordPress 관리자 패널에서 다음 항목으로 이동하세요.

`WooCommerce -> Settings -> Payments`

3. 목록에서 **BTCPay**를 찾아 **설정**을 클릭하세요.
4. BTCPay Server URL을 입력하고 인증 안내를 따르세요.  
   (API 키 자동 생성 옵션을 권장합니다.)
5. 결제 수단을 활성화하고 설정을 저장하세요.

> 플러그인 문서에서 자세한 안내, 동영상 튜토리얼, 문제 해결 가이드를 확인할 수 있습니다.

같은 BTCPay 문서 섹션에서 다른 CMS 연동 옵션도 확인할 수 있습니다.

---

### 결제 버튼 또는 iframe(CMS나 API 불필요)

CMS를 사용하지 않고 API도 다루고 싶지 않다면, ZEC 결제를 받는 가장 쉬운 방법은 **결제 링크나 위젯을 웹사이트에 직접 삽입하는 것**입니다.

이 방법은 다음에 적합합니다.

- 랜딩 페이지
- 포트폴리오 사이트
- 블로그 또는 정적 페이지
- 백엔드 서버가 없는 프로젝트

---

#### 옵션 1: 결제 버튼(링크)

1. BTCPay Server의 **인보이스** 섹션에서 인보이스를 직접 만드세요.
2. 다음과 같은 결제 링크를 복사하세요.

`[https://btcpay.example.com/i/abc123](https://btcpay.example.com/i/abc123)`

3. HTML에 링크를 추가하세요.

```
<a href="https://btcpay.example.com/i/abc123" target="_blank">
  Pay with ZEC
</a>
```

---

#### 옵션 2: 인보이스 삽입(iframe)

인보이스를 사이트에 직접 표시하려면 iframe을 사용하세요.

`<iframe src="https://btcpay.example.com/i/abc123" width="600" height="350" frameborder="0"></iframe>`

> 버튼이나 iframe 컨테이너의 스타일을 사이트 디자인에 맞게 조정할 수 있습니다. BTCPay Server를 사용하면 인보이스 페이지의 테마를 유연하게 설정할 수 있습니다.

## 결론

이 가이드는 길었지만, Zcash 결제를 BTCPay Server와 통합하는 기본적인 내용만 다룹니다.

BTCPay Server 인터페이스는 여기서 소개한 것보다 훨씬 다양한 기능을 제공합니다. 다행히 UI는 러시아어를 포함한 여러 언어로 제공되므로, 더 쉽게 살펴보고 기능을 시험해 볼 수 있습니다.

BTCPay는 유연성이 뛰어난 도구입니다. 다음과 같은 작업을 할 수 있습니다.

* 단일 인스턴스에서 서로 독립적인 스토어를 여러 개 호스팅
* 팀원의 역할과 권한을 직접 정의—주문 조회 전용부터 전체 관리자 권한까지 설정 가능
* 자체 도메인과 브랜딩 사용
* 웹훅, 대체 지갑, Tor 액세스까지 설정
* 세금 규칙, 할인 코드, 결제 페이지 맞춤 설정, 결제 수단 제한 등 고급 설정 구성

BTCPay는 중앙화된 결제 서비스의 오픈 소스 대안으로 만들어졌습니다. 중개자 없이 프라이빗 ZEC 결제를 받으려 한다면, 이 플랫폼을 꼭 살펴보시기 바랍니다.

BTCPay 생태계를 탐색하고 결제 방식을 원하는 대로 구성하는 데 성공하시기를 바랍니다.

## 참고 자료

* [BTCPay Server 공식 웹사이트](https://btcpayserver.org/)
* [BTCPay FAQ](https://docs.btcpayserver.org/FAQ/)
* [BTCPay Server GitHub 저장소](https://github.com/btcpayserver/btcpayserver)
* [BTCPay Server 메인넷 데모](https://mainnet.demo.btcpayserver.org/login?ReturnUrl=%2F)
* [Zcash BTCPay용 플러그인(GitHub)](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
* [Zcash 플러그인 설치 가이드](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/installation.md)
* [사용자 지정 zcash-lightwalletd.custom.yml 예시](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/zcash-lightwalletd.custom.yml)
* [lightwalletd Docker Compose 파일(Zebra)](https://github.com/ZcashFoundation/zebra/blob/main/docker/docker-compose.lwd.yml)
* [BTCPay API 키 문서(Greenfield API)](https://docs.btcpayserver.org/API/Greenfield/v1/#tag/API-Keys)
* [Cloudflare 터널 만들기](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/get-started/create-remote-tunnel/)
* [Zcash 지갑 호환성 목록(ZecHub)](https://zechub.wiki/wallets)
* [Zebra + lightwalletd Raspberry Pi 5에서 사용하기(ZecHub)](https://free2z.com/ZecHub/zpage/zcash-101-zebra-lightwalletd-sync-journal-on-raspberry-pi-5)
