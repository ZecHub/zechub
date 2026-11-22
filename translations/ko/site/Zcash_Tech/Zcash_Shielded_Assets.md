<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zcash_Shielded_Assets.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="페이지 편집"/>
</a>
<a href="">
    <img src="/content-images/image-2023-11-18-160742427-658dda69c0.webp" alt="" width="800" height="500"/>
</a>

# Zcash 거래정보 보호 자산

## 요약

Zcash 거래정보 보호 자산(ZSA)은 **ZEC 외의 자산**, 즉 스테이블코인, 거버넌스 토큰 또는 맞춤형 자산을 Zcash의 거래정보 보호 구역 안에서 사용할 수 있도록 하는 제안된 프로토콜 확장으로, 송신자와 수신자, 금액을 비공개로 유지합니다.

- **무엇인가요:** 기본적으로 거래정보가 보호되는 ERC-20 방식의 맞춤형 자산입니다.
- **누가 개발하나요:** [QEDIT](https://qed-it.com/)이 Zcash Foundation의 개발 지원금을 받아 Electric Coin Company과 협력해 개발하고 있습니다.
- **어떻게 명세되나요:** 전송과 소각은 [ZIP 226](https://zips.z.cash/zip-0226)에서, 발행은 [ZIP 227](https://zips.z.cash/zip-0227)에서 정의합니다.
- **상태:** 메인넷에서 아직 활성화되지 않았으며 네트워크 업그레이드 7(NU7)에 포함되지 않습니다. [ZIP 259](https://zips.z.cash/zip-0259)에는 NU7이 배포하는 모든 항목이 나열되어 있지만, ZIP 226이나 ZIP 227은 포함되어 있지 않으며 ZSA 활성화 날짜도 정해지지 않았습니다.
- **수수료:** 이동되는 자산과 관계없이 항상 ZEC으로 지불합니다.

---

## 핵심 설명

Zcash 거래정보 보호 자산(ZSA)은 Zcash 프로토콜을 개선하기 위해 제안된 것으로, Zcash 체인에서 맞춤형 자산을 생성하고 전송 및 소각할 수 있게 합니다.

Ethereum 블록체인의 [ERC-20](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/) 토큰 표준을 알고 계신다면, ZSA는 Zcash에서 ERC-20 토큰이 Ethereum에서 하는 역할과 같은 역할을 합니다.

Zcash 거래정보 보호 자산을 사용하면 Zcash 블록체인에서 맞춤형 토큰을 생성할 수 있으므로, [ZEC](/guides/using-zec-privately) 이외의 토큰도 Zcash 블록체인의 거래정보 보호 거래가 제공하는 익명성과 프라이버시의 혜택을 누릴 수 있습니다.

ZSA의 주요 잠재적 활용 사례는 Zcash 프로토콜에서 스테이블코인을 발행하는 것입니다. 스테이블코인은 미국 달러나 유로와 같은 법정화폐에 가치를 연동하는 암호화폐입니다. 현재 널리 유통되는 스테이블코인 중 일부는 [USDC](https://www.circle.com/en/usdc) 및 [Dai](https://docs.makerdao.com/)와 같은 ERC-20 토큰입니다.

ZSA의 또 다른 잠재적 활용 사례는 거버넌스 토큰 발행입니다. 예를 들어, ZecHub(이 위키의 발행자)는 탈중앙화 자율 조직(DAO)이며, 제안과 거버넌스 결정에 투표할 수 있도록 회원들에게 ZSA를 만들어 발행할 수 있습니다.

ZSA는 [QEDIT](https://qed-it.com/)이 [Zcash Foundation](/zcash-organizations/zcash-foundation)의 대규모 개발 지원금을 받아 [Electric Coin Company](/zcash-organizations/electric-coin-company)과 협력하여 개발하고 있습니다. 이 프로젝트는 아직 활발히 개발 중이므로 진행 상황은 Zcash 포럼의 [이 스레드](https://forum.zcashcommunity.com/t/grant-update-zcash-shielded-assets-monthly-updates/41153)에 게시됩니다. QEDIT이 제출한 [ZSA 개발 지원금 신청서](https://zcashgrants.org/gallery/25215916-53ea-4041-a3b2-6d00c487917d/33106640/)는 Zcash Foundation 개발 지원금 웹사이트에서 확인할 수 있습니다.

---

## 시각적 비유

### 봉인된 봉투

Zcash 거래정보 보호 거래를 공공 우편함에 넣는 평범한 봉인된 봉투라고 상상해 보세요. 누구나 봉투가 투입된 사실은 볼 수 있습니다. 하지만 누가 보냈는지, 누가 가져가는지, 안에 무엇이 들었는지는 아무도 알 수 없습니다. 봉투는 모두 서로 똑같이 보입니다.

현재 Zcash 네트워크의 봉투에는 한 가지만 담을 수 있습니다. ZEC입니다.

ZSA는 봉투를 바꾸지 않습니다. **봉투 안에 넣을 수 있는 것**을 바꿉니다. ZSA가 도입되면 같은 봉인된 봉투에 스테이블코인, DAO 거버넌스 토큰 또는 회사의 로열티 포인트를 담을 수 있습니다. 외부에서 볼 때는 네트워크의 다른 봉투와 똑같이 보입니다.

기억해 둘 점이 하나 있습니다. 봉투 안에 무엇이 들었든 **우편 요금은 항상 ZEC으로 지불합니다**.

### 외부 관찰자가 볼 수 있는 정보

| 관찰자가 볼 수 있는 정보... | Ethereum의 ERC-20 | Zcash의 ZSA |
| --- | --- | --- |
| 송신자 | 공개 | 거래정보 보호 |
| 수신자 | 공개 | 거래정보 보호 |
| 전송된 금액 | 공개 | 거래정보 보호 |
| 개별 잔액 | 공개 | 거래정보 보호 |
| 자산의 총공급량 | 공개 | **공개 — 의도된 설계입니다** |
| 수수료 지불 통화 | ETH | ZEC |

### 공급량 행이 버그가 아닌 이유

표의 아래쪽 두 행에서 ZSA의 특징이 드러납니다.

ZIP 227은 온체인에서 모든 자산의 유통 공급량을 추적할 수 있도록 **발행 정보를 의도적으로 투명하게** 유지합니다. 개별 보유량과 개별 결제는 비공개로 유지되지만, 존재하는 토큰의 총수는 공개됩니다.

스테이블코인 발행자에게 이 조합은 타협이 아니라 바로 필요한 조건입니다. 공개적으로 검증 가능한 공급량을 기준으로 준비금을 감사할 수 있고, 토큰을 실제로 사용하는 사람들은 자신의 잔액과 결제 정보를 비공개로 유지할 수 있습니다.

### 하나의 자산, 하나의 식별자

각 자산에는 고유한 **자산 식별자**가 부여됩니다. 이 식별자는 발행자의 발행 키와 자산에 대한 텍스트 설명을 바탕으로 생성됩니다. 서로 다른 발행자가 동일한 식별자를 만들 수 없으며, 자산을 발행하거나 변경하려면 해당 발행자의 암호학적 승인이 필요합니다. 봉투에 비유하면 누구나 봉투를 보낼 수 있지만, 특정 자산을 소유한 조폐 기관만 그 자산을 더 발행할 수 있습니다.

---

## 심층 살펴보기

### Zebra ZSA 데모

[![Video Thumbnail](/content-images/hqdefault-3ae84de424.webp)](https://youtu.be/1MZMGC9ViyA)

**직접 데모를 실행해 보세요!**

zcash-tx-tool 저장소를 복제하세요: [https://github.com/QED-it/zcash_tx_tool](https://github.com/QED-it/zcash_tx_tool)

### Zcash 개선 제안(ZIP)

- [ZIP 226](https://zips.z.cash/zip-0226): Zcash 거래정보 보호 자산의 전송과 소각
- [ZIP 227](https://zips.z.cash/zip-0227): Zcash 거래정보 보호 자산의 발행
- [ZIP 230](https://zips.z.cash/zip-0230): 버전 6 거래 형식

> **ZIP 230에 대한 참고:** ZIP 230은 이후 철회되어 배포되지 않습니다. 거래 버전 6은 현재 [ZIP 229](https://zips.z.cash/zip-0229)에서 정의합니다. [ZIP 230](https://zips.z.cash/zip-0230) 페이지 상단의 공지를 참조하세요.

ZIP 226은 맞춤형 자산의 전송과 소각을 지원하는 Orchard 프로토콜의 확장인 OrchardZSA 프로토콜을 정의합니다. ZIP 227은 해당 자산을 처음 생성하는 방법을 정의하며, 반드시 ZIP 226과 함께 구현해야 합니다.

### ZSA 개발 지원금 제안

[QEDIT](https://qed-it.com/) 팀은 Zcash 블록체인에서 일반적인 거래정보 보호 자산을 구축하기 위한 거래정보 보호 자산(ZSA/UDA) 제안서를 제출했습니다. 이러한 자산은 일반적으로 사용자 정의 자산(UDA) 또는 Zcash 거래정보 보호 자산(ZSA)이라고 부릅니다.

이 제안에 따라 [QEDIT](https://qed-it.com/) 팀은 DeFi를 Zcash 생태계에 도입하는 동시에 기존 DeFi 생태계에서 최고의 프라이버시 기술을 사용할 수 있도록 할 계획입니다. 설문조사에서 팀이 질문을 던졌고 커뮤니티는 [일반 거래정보 보호 자산(ZSA/UDA)이 현재 가장 많이 요청되는 기능이라고 답했습니다](https://twitter.com/BenarrochDaniel/status/1428327864034791429).

이 제안들은 기술적으로 [Zcash 개선 제안(ZIP)](https://zips.z.cash/zip-0000) 명세를 따르며, ZIP 226 및 ZIP 227에 정의되어 있습니다.

1. [ZIP 226](https://zips.z.cash/zip-0226): Zcash 거래정보 보호 자산의 전송과 소각
2. [ZIP 227](https://zips.z.cash/zip-0227): Zcash 거래정보 보호 자산의 발행

---

## 실제 활용에 미치는 영향

**ZEC을 보유하거나 사용하시는 경우**

- ZSA는 Orchard의 확장(“OrchardZSA”)으로 정의되므로, ZEC이 이미 사용하는 거래정보 보호 기능을 공유하게 됩니다. 지갑에서 ZSA를 보유하거나 전송하려면 지갑이 ZSA를 명시적으로 지원해야 합니다.
- ZEC을 항상 보유하고 있어야 합니다. ZSA 발행 및 전송 수수료는 ZEC으로 지불하며, 해당 자산 자체로 지불하지 않습니다.
- 기존 ZEC 거래에는 아무런 변화가 없습니다.

**잠재적 발행자—스테이블코인, DAO 또는 기업인 경우**

- 자산을 발행하려면 발행 키에 연결된 암호학적 승인이 필요하므로, 본인만 자신의 자산을 발행하거나 속성을 변경할 수 있습니다.
- 사용자들의 잔액과 전송 내역은 공개되지 않지만, 자산의 유통 공급량은 공개적으로 감사할 수 있습니다. 규제 대상 발행자에게는 보통 바로 이러한 조합이 필요합니다.
- 한 번의 발행 거래로 둘 이상의 자산을 생성할 수 있습니다.

**생태계에 미치는 영향**

- 모든 ZSA 수수료는 ZEC으로 책정되므로, Zcash에서 앞으로 어떤 자산이 발행되든 그 활동은 ZEC 자체에 대한 수요를 창출합니다.

---

## 흔한 오해

| 흔한 오해 | 실제 내용 |
| --- | --- |
| “ZSAs는 오늘 Zcash에서 사용 가능합니다.” | 그렇지 않습니다. ZSA는 네트워크 업그레이드 7(NU7)에 포함되지 않습니다. [ZIP 259](https://zips.z.cash/zip-0259)은 ZIP 226이나 ZIP 227 없이 업그레이드를 정의하며, ZSA는 아직 검토와 테스트를 진행 중입니다. |
| “ZSA는 Zcash에 스마트 컨트랙트를 도입합니다.” | ZSA는 자산의 발행, 전송 및 소각을 명세합니다. 범용 프로그래밍 가능 컨트랙트 계층은 아닙니다. |
| “ZSA 토큰 자체로 ZSA 수수료를 지불할 수 있습니다.” | 수수료는 ZEC으로 지불합니다. |
| “거래정보가 보호된다면 토큰 공급량도 비밀이어야 합니다.” | ZIP 227은 각 자산의 공급량을 공개적으로 추적할 수 있도록 발행 정보를 의도적으로 투명하게 만듭니다. 잔액과 전송 내역은 비공개로 유지되지만 공급량은 공개됩니다. |
| “ZIP 230은 현재 거래 버전 6 형식입니다.” | ZIP 230은 철회되었습니다. 버전 6은 현재 ZIP 229에서 정의합니다. |

---

## 관련 페이지

- [Halo](/zcash-tech/halo) — ZSA가 확장하는 프로토콜인 Orchard의 기반이 되는 증명 시스템
- [zk-SNARKs](/zcash-tech/zk-snarks) — 거래정보 보호 전송을 공개하지 않고도 검증할 수 있게 하는 영지식 증명
- [거래정보 보호 구역](/using-zcash/shielded-pools) — ZSA가 ZEC와 함께 자리하게 될 곳
- [거래](/using-zcash/transactions) — Zcash 거래를 구성하는 방법
- [Zebra 풀 노드](/zcash-tech/zebra-full-node) — 위의 ZSA 데모에서 사용하는 노드 구현체
