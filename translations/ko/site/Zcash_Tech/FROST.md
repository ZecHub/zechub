<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/FROST.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>
# FROST


## TL;DR

* FROST (Flexible Round-Optimised Schnorr Threshold Signatures)는 임계 서명 및 분산 키 생성 프로토콜입니다: 여러 서명자가 공통 비밀 키의 일부를 각각 보유하고, 일정 수의 서명자들이 협력하여 하나의 서명을 생성해야 합니다.
* 결과가 단일 Schnorr 서명이기 때문에, 이 방식으로 생성된 트랜잭션은 네트워크 상에서 일반적인 트랜잭션과 구분되지 않습니다.
* 최소한의 통신 라운드를 요구하며 병렬 처리가 가능하고, 부정행위자 인식 및 제거가 가능합니다.
* Zcash에 있어 이는 FROST가 여러 지리적으로 분산된 당사자가 보호된 ZEC의 사용 권한을 공동으로 관리할 수 있도록 합니다. 이는 보관, 예치금, 비보관 서비스, 그리고 Zcash 보호 자산(ZSA)에 유용합니다.
* Chelsea Komlo (Waterloo 대학교, Zcash Foundation)와 Ian Goldberg (Waterloo 대학교)가 개발했습니다.

## 핵심 설명

### Schnorr 서명이란 무엇인가?

Schnorr 디지털 서명은 알고리즘 세트: (KeyGen, Sign, Verify).

Schnorr 서명에는 여러 가지 장점이 있습니다. 중요한 장점 중 하나는 동일한 메시지를 여러 키로 서명할 때 생성된 서명을 단일 서명으로 결합할 수 있다는 점입니다. 이는 다중 서명 지갑 관련 트랜잭션의 크기를 크게 줄일 수 있습니다.

### FROST란 무엇인가?

**Flexible Round-Optimised Schnorr Threshold Signatures** -
*Chelsea Komlo (Waterloo 대학교, Zcash Foundation) & Ian Goldberg (Waterloo 대학교)에 의해 개발됨.*

FROST는 최소한의 통신 라운드를 요구하며 병렬 처리가 가능한 임계 서명 및 분산 키 생성 프로토콜입니다. FROST 프로토콜은 Schnorr 서명 방식의 임계 버전입니다.

단일 당사자 설정에서의 서명과 달리, 임계 서명은 일정 수의 서명자가 협력해야 하며, 각각이 공통 비밀 키의 일부를 보유하고 있습니다.

[임계 서명이란? Chelsea Komlo - Zcon3](https://youtu.be/cAfTTfblzoU?t=110)

결과적으로, 임계 설정에서 서명을 생성하는 것은 서명자들 간의 네트워크 라운드로 인해 오버헤드가 발생하며, 이는 제한된 네트워크 장치에 비밀 키를 저장하거나 불신할 수 있는 네트워크 상에서 조정이 이루어질 때 비용이 많이 들 수 있습니다.

서명 작업 중의 네트워크 오버헤드는 위조 공격을 방지하는 새로운 기술을 사용하여 줄일 수 있으며, 이는 다른 체계에도 적용 가능합니다.

FROST는 임계 서명 프로토콜을 개선하여 무한한 수의 서명 작업이 안전하게 병렬 처리(동시성)될 수 있도록 합니다.

2 라운드 프로토콜로 사용할 수 있으며, 서명자가 총 2개의 메시지를 전송 및 수신하거나, 사전 준비 단계를 포함한 최적화된 단일 라운드 서명 프로토콜로도 사용될 수 있습니다.

FROST는 불량한 참여자 존재 시 프로토콜을 중단하고 이를 식별하여 향후 작업에서 제외시킬 수 있어 효율성을 개선합니다.

FROST가 선택적 메시지 공격에 대해 보안성이 있고, 이산 로그 문제의 어려움을 가정하며 적대자가 임계값보다 더 많은 참여자를 통제하지 않는 한 안전하다는 보안 증명은 [여기](https://eprint.iacr.org/2020/852.pdf#page=16)에서 제공됩니다.

### FROST는 어떻게 작동하나요?

FROST 프로토콜에는 두 가지 중요한 구성 요소가 포함되어 있습니다:

첫째, n명의 참여자는 분산 키 생성(DKG) 프로토콜을 실행하여 공통 검증 키를 생성합니다. 마지막으로 각 참여자는 개인 비밀 키 셰어와 공개 검증 키 셰어를 얻습니다.

이후에는 t-out-of-n 참여자가 임계 서명 프로토콜을 실행하여 협력적으로 유효한 Schnorr 서명을 생성할 수 있습니다.

<a href="">
    <img src="https://static.cryptohopper.com/images/news/uploads/1634081807-frost-flexible-round-optimized-schnorr-threshold-signatures-1.jpg" alt="" width="400" height="300"/>
</a>

## 시각적 설명 / 비유

FROST를 생각해보면, 여러 인가된 열쇠 보유자가 함께 열쇠를 회전시켜야만 열리는 안전금고와 같습니다. 그러나 모든 열쇠 보유자가 필요하지는 않으며, 단지 일정 수의 열쇠(예: 5개 중 3개)가 필요합니다. 상자에 열린 후 외부 관찰자는 어떤 열쇠 보유자가 나타났는지, 아니면 한 명 이상이 참여했는지도 알 수 없습니다. 마찬가지로, 그룹은 Zcash 트랜잭션을 공동으로 승인할 수 있지만 네트워크에서는 단일의 일반적인 서명만 볼 수 있습니다.

## 심층 분석

**분산 키 생성(DKG)**

이 단계의 목표는 장기적으로 사용되는 비밀 키 셰어와 공동 검증 키를 생성하는 것입니다. 이 단계는 n명의 참여자에 의해 실행됩니다.

FROST는 Pedersen의 DKG(GJKR03)를 기반으로 자신의 키 생성 단계를 구축하며, 이는 Shamir의 비밀 공유 및 Feldman의 검증 가능한 비밀 공유 체계를 하위 루틴으로 사용합니다. 또한 각 참여자는 다른 참여자에게 자신의 비밀을 증명하기 위해 제로 지식 증명을 보내야 합니다. 이 자체가 Schnorr 서명입니다. 이 추가 단계는 t ≥ n/2일 때 로그 키 공격에 대응할 수 있도록 보호합니다.

DKG 프로토콜이 끝나면 공동 검증 키 vk가 생성됩니다. 각 참여자 Pᵢ는 (i, skᵢ)라는 장기적으로 사용되는 비밀 셰어와 검증 키 셰어 vkᵢ = skᵢ * G를 보유합니다. 참여자 Pᵢ의 검증 키 셰어 vkᵢ는 다른 참여자가 서명 단계에서 Pᵢ의 서명 셰어의 정확성을 확인하는 데 사용되며, 검증 키 vk는 외부 당사자가 그룹이 발행한 서명을 확인하는 데 사용됩니다.

**임계 서명**

이 단계는 덧셈 비밀 공유 및 셰어 전환을 사용하여 각 서명의 nonce를 비상호적으로 생성하는 알려진 기술에 기반합니다. 또한, 바인딩 기법을 활용하여 동시성을 제한하지 않고도 알려진 위조 공격을 피할 수 있습니다.

사전 준비 단계에서는 각 참여자가 이후 사용하기 위해 일정 수의 타원 곡선(EC) 포인트 쌍을 준비합니다. 이 단계는 여러 임계 서명 단계에 걸쳐 한 번만 실행됩니다.

<a href="">
    <img src="https://i.ibb.co/nQD1c3n/preprocess.png" alt="" width="400" height="300"/>
</a>

서명 라운드 1: 각 참여자 Pᵢ는 먼저 단일 비밀 nonce 쌍 (dᵢ, eᵢ) 및 해당 EC 포인트 쌍 (Dᵢ, Eᵢ)을 생성한 후 이 쌍의 포인트를 모든 다른 참여자에게 브로드캐스트합니다. 각 참여자는 이후 사용하기 위해 이러한 EC 포인트 쌍을 저장합니다. 서명 라운드 2 및 3은 t-out-of-n 참여자가 협력하여 유효한 Schnorr 서명을 생성하는 실제 작업입니다.

서명 라운드 2: 참여자들은 함께 유효한 Schnorr 서명을 생성합니다. 이 라운드의 핵심 기술은 t-out-of-t 덧셈 비밀 공유입니다.

이 단계는 위조 공격을 방지하는 데 도움이 됩니다. 공격자는 다른 서명 작업에서 서명 셰어를 결합하거나 각 서명자 및 해당 서명자의 출판 포인트 집합을 순열할 수 없습니다.

<a href="">
    <img src="https://i.ibb.co/b5rJbXx/sign.png" alt="" width="400" height="300"/>
</a>

도전 c를 계산한 후, 각 참여자는 단일 사용 비밀 nonce 및 장기적인 비밀 셰어를 사용하여 응답 zᵢ를 계산할 수 있습니다. 이는 그룹의 장기 키에 대한 t-out-of-n (t-1 차수) Shamir 비밀 공유입니다. 서명 라운드 2가 끝나면 각 참여자는 zᵢ를 다른 참여자에게 브로드캐스트합니다.

[전체 논문 읽기](https://eprint.iacr.org/2020/852.pdf)

### FROST의 보다 넓은 생태계에서의 사용

**[Coinbase](https://github.com/coinbase/kryptology/tree/master/pkg/dkg/frost)에 있는 FROST**

Coinbase의 임계 서명 시스템 효율성을 향상시키기 위해 그들은 FROST의 버전을 개발했습니다. 이 Coinbase 구현은 원래 FROST 초안과 약간 차이가 있습니다.

그들은 서명 집합 역할을 사용하지 않기로 선택했습니다. 대신, 각 참여자는 서명 집합 역할입니다. 이 설계는 보다 안전합니다: 프로토콜에 참여하는 모든 당사자가 다른 당사자의 계산을 검증하므로 보안 수준이 높아지고 위험도가 줄어듭니다. 일회성 사전 준비 단계를 제거하여 구현 속도를 높였으며, 대신 세 번째 서명 라운드를 사용했습니다.

---

**Blockstream의 [ROAST](https://eprint.iacr.org/2022/550.pdf)**

FROST에 대한 특정 응용 개선은 [Blockstream Liquid Sidechain](https://blog.blockstream.com/roast-robust-asynchronous-schnorr-threshold-signatures/)에서 사용하기 위해 제안되었습니다. 이는 비트코인을 위한 것입니다.

“ROAST는 FROST와 같은 임계 서명 체계에 간단한 래퍼입니다. 네트워크 연결이 임의로 높은 지연 시간이 있을 때, 예를 들어 Liquid 기관과 같은 정직한 서명자들의 다수결이 항상 유효한 서명을 얻을 수 있도록 보장합니다.”

---

**IETF에서의 FROST**

1986년에 설립된 인터넷 엔지니어링 작업 그룹(IETF)은 인터넷의 주요 표준 개발 기관입니다. IETF는 자발적인 표준을 개발하며, 이는 종종 인터넷 사용자, 네트워크 운영자 및 장비 제조사에 채택되어 인터넷의 방향을 형성합니다.

FROST 버전 11(두 라운드 변형)은 [IRTFF에 제출되었습니다](https://datatracker.ietf.org/doc/draft-irtf-cfrg-frost/11/). 이는 FROST가 인터넷, 하드웨어 장치 및 향후 몇 년 동안의 다른 서비스에서 사용할 수 있는 새로운 임계 서명 표준으로 평가되는 중요한 단계입니다.


## 실용적 의미

절대적으로 그렇습니다. Zcash에 FROST를 도입하면 지리적으로 분산된 여러 당사자가 보호된 ZEC의 사용 권한을 공동으로 관리할 수 있게 됩니다. 이 서명 체계로 방송되는 트랜잭션은 네트워크 상에서 다른 트랜잭션과 구분되지 않으며, 지불 추적에 대한 강력한 저항력을 유지하고 블록체인 데이터 분석을 위한 정보량을 제한합니다.

실제적으로 이는 다양한 새로운 응용 프로그램이 네트워크 상에서 구축될 수 있도록 합니다. 예를 들어, 예치금 제공자 및 기타 비보관 서비스 등입니다.

FROST는 또한 Zcash 보호 자산(ZSA)의 안전한 발행 및 관리에 필수적인 구성 요소가 될 것입니다. 이는 개발 조직 및 거래소와 같은 ZEC 보관자 내에서 지출 권한을 안전하게 관리할 수 있도록 하며, Zcash 사용자에게도 이러한 기능을 제공합니다.

## 일반적인 실수

**FROST를 전통적인 체인 상 다중 서명과 혼동하는 것.** 전통적인 다중 서명은 체인 상에서 여러 서명자 또는 여러 서명을 노출시킬 수 있습니다. FROST는 단일 결합된 Schnorr 서명을 생성하므로, 트랜잭션은 단일 서명 트랜잭션과 구분되지 않습니다.

**임계값보다 적은 수가 서명할 수 있다고 가정하는 것.** 임계값 수(t-out-of-n)의 참여자들이 협력해야만 유효한 서명을 생성할 수 있으며, 더 작은 그룹은 이를 할 수 없습니다.

**FROST가 체인 외부에서 모든 것을 숨긴다고 가정하는 것.** FROST는 체인 상의 서명을 보호하지만, 서명자 간의 협력은 여전히 체인 외부에서 발생하며 자체적인 프라이버시 및 보안 조치가 필요합니다.


## 관련 페이지

- [Halo](/zcash-tech/halo) — Zcash의 Orchard 풀에 사용되는 신뢰 없는 재귀 증명 시스템.
- [Viewing Keys](/zcash-tech/viewing-keys) — 보호된 트랜잭션을 위한 선택적 공개.
- [Zcash Shielded Assets](/zcash-tech/zcash-shielded-assets) — FROST가 지출/발행 권한 관리에 도움을 주는 곳.
- [Zcash Wallet Syncing](/zcash-tech/zcash-wallet-syncing) — Zcash 프라이버시 인프라의 또 다른 핵심 구성 요소.

## 추가 학습

[Coinbase Article - Threshold Signatures](https://www.coinbase.com/blog/threshold-digital-signatures)

[Shamir Secret Sharing - 설명 및 예제](https://www.geeksforgeeks.org/shamirs-secret-sharing-algorithm-cryptography/)

[Schnorr 디지털 서명에 대한 짧은 영상](https://youtu.be/r9hJiDrtukI?t=19)
