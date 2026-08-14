<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zcash_Shielded_Assets.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="페이지 편집"/>
</a>
<a href="">
    <img src="/content-images/image-2023-11-18-160742427-658dda69c0.webp" alt="" width="800" height="500"/>
</a>

# Zcash Shielded Assets

## 요약

Zcash Shielded Assets (ZSA)는 제안된 프로토콜 확장으로, **ZEC 이외의** 자산 — 스테이블코인, 거버넌스 토큰 또는 어떤 커스텀 자산이든 — Zcash의 쉴드 풀 내부에 존재할 수 있게 하며, 송신자, 수신자, 금액은 비공개로 유지됩니다.

- **무엇인가:** ERC-20 스타일의 커스텀 자산이지만, 기본적으로 쉴드됩니다.
- **누가 구축하고 있는가:** [QEDIT](https://qed-it.com/). [Zcash Foundation](https://zips.z.cash/zip-0226)의 그랜트를 받아 Electric Coin Company와 협력하여 개발 중입니다.
- **어떻게 명세되는가:** [ZIP 226](https://zips.z.cash/zip-0226) (전송 및 소각)과 [ZIP 227](https://zips.z.cash/zip-0227) (발행)을 함께 사용합니다.
- **상태:** 아직 메인넷에서 활성화되지 않았습니다. ZSA 프로토콜은 Network Upgrade 7 (NU7)에서 배포될 예정입니다.
- **수수료:** 이동하는 자산과 관계없이 항상 ZEC로 지불됩니다.

---

## 핵심 설명

Zcash Shielded Assets (ZSA)는 Zcash 프로토콜에 대한 제안된 개선 사항으로, Zcash 체인에서 커스텀 자산의 생성, 전송, 소각을 가능하게 합니다.

Ethereum 블록체인의 [ERC-20](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/) 토큰 표준에 익숙하다면, ZSA는 Zcash에 대해 ERC-20 토큰이 Ethereum에 대해 갖는 관계와 비슷합니다.

Zcash Shielded Assets는 Zcash 블록체인에서 커스텀 토큰의 생성을 가능하게 하여, [ZEC](/guides/using-zec-privately) 이외의 토큰도 Zcash 블록체인의 쉴드 거래가 제공하는 익명성과 프라이버시의 혜택을 누릴 수 있게 합니다.

ZSA의 주요 잠재적 활용 사례 중 하나는 Zcash 프로토콜에서 스테이블코인을 발행하는 것입니다. 스테이블코인은 미국 달러나 유로와 같은 법정화폐에 가치를 고정하는 암호화폐입니다. 현재 가장 널리 유통되는 스테이블코인 중 일부는 [USDC](https://www.circle.com/en/usdc), [Dai](https://docs.makerdao.com/)와 같은 ERC-20 토큰입니다.

또 다른 잠재적 활용 사례는 거버넌스 토큰 발행입니다. 예를 들어, Zechub(이 위키의 발행자)는 탈중앙화 자율 조직(DAO)이며, 제안과 거버넌스 결정에 대한 투표를 위해 구성원들에게 ZSA를 생성하고 발행할 수 있습니다.

ZSA는 [QEDIT](https://qed-it.com/)가 [Zcash Foundation](/zcash-organizations/zcash-foundation)의 대규모 그랜트를 받아 [Electric Coin Company](/zcash-organizations/electric-coin-company)와 협력하여 개발 중입니다. 이 프로젝트는 아직 활발히 개발되고 있으므로, 업데이트는 Zcash 포럼의 [이 스레드](https://forum.zcashcommunity.com/t/grant-update-zcash-shielded-assets-monthly-updates/41153)에 게시됩니다. QEDIT의 [ZSA 그랜트 신청서](https://zcashgrants.org/gallery/25215916-53ea-4041-a3b2-6d00c487917d/33106640/)는 Zcash Foundation 그랜트 웹사이트에서 확인할 수 있습니다.

---

## 시각적 비유 / 아날로지

### 봉인된 봉투

Zcash의 쉴드 거래를 공용 우편함에 넣는 평범한 봉인된 봉투라고 상상해 보세요. 누구나 봉투가 게시되었다는 사실은 볼 수 있습니다. 그러나 누가 보냈는지, 누가 수령하는지, 안에 무엇이 들어 있는지는 아무도 볼 수 없습니다 — 그리고 모든 봉투는 서로 완전히 똑같아 보입니다.

오늘날 Zcash 네트워크의 봉투는 오직 한 가지, 즉 ZEC만 담을 수 있습니다.

ZSA는 봉투 자체를 바꾸지 않습니다. 대신 **봉투 안에 무엇을 넣을 수 있는지**를 바꿉니다. ZSA 이후에는 같은 봉인된 봉투 안에 스테이블코인, DAO 거버넌스 토큰, 회사의 로열티 포인트를 담을 수 있으며, 겉으로 보기에는 여전히 네트워크의 다른 모든 봉투와 완전히 똑같아 보일 것입니다.

한 가지 기억해 둘 만한 세부사항이 있습니다: **우편요금은 봉투 안에 무엇이 들어 있든 항상 ZEC로 지불됩니다.**

### 외부 관찰자가 볼 수 있는 것

| 관찰자가 볼 수 있는 것... | Ethereum의 ERC-20 | Zcash의 ZSA |
| --- | --- | --- |
| 누가 보냈는가 | 공개 | 쉴드됨 |
| 누가 받았는가 | 공개 | 쉴드됨 |
| 얼마나 이동했는가 | 공개 | 쉴드됨 |
| 개별 잔액 | 공개 | 쉴드됨 |
| 자산의 총 공급량 | 공개 | **공개 — 의도적임** |
| 수수료를 지불하는 통화 | ETH | ZEC |

### 공급량 행이 버그가 아닌 이유

표의 아래 두 행이 바로 ZSA가 흥미로워지는 지점입니다.

ZIP 227은 의도적으로 **발행을 투명하게** 유지하여, 모든 자산의 유통 공급량을 온체인에서 추적할 수 있게 합니다. 개별 보유량과 개별 결제는 비공개로 유지되지만, 존재하는 토큰의 총수는 그렇지 않습니다.

스테이블코인 발행자에게 이 조합은 타협이 아니라 바로 핵심입니다. 준비금은 공개적으로 검증 가능한 공급량과 대조해 감사할 수 있고, 실제로 토큰을 사용하는 사람들은 자신의 잔액과 결제를 비공개로 유지할 수 있습니다.

### 하나의 자산, 하나의 정체성

모든 자산은 발행자의 발행 키와 자산에 대한 텍스트 설명으로부터 파생되는 고유한 **Asset Identifier**를 가집니다. 서로 다른 두 발행자가 같은 식별자를 만들어낼 수 없으며, 자산을 민팅하거나 변경하려면 그 발행자의 암호학적 승인이 필요합니다. 봉투 비유로 말하면, 누구나 봉투를 부칠 수는 있지만 특정 자산을 소유한 민트만 그 자산을 더 인쇄할 수 있습니다.

---

## 더 깊이 보기

### Zebra에서의 ZSA 데모

[![비디오 썸네일](/content-images/hqdefault-3ae84de424.webp)](https://youtu.be/1MZMGC9ViyA)

**직접 데모를 실행해 보세요!**

zcash-tx-tool 저장소를 클론하세요: <https://github.com/QED-it/zcash_tx_tool>

### Zcash Improvement Proposals (ZIPs)

- [ZIP 226](https://zips.z.cash/zip-0226): Zcash Shielded Assets의 전송 및 소각
- [ZIP 227](https://zips.z.cash/zip-0227): Zcash Shielded Assets의 발행
- [ZIP 230](https://zips.z.cash/zip-0230): 버전 6 거래 형식

> **ZIP 230에 대한 참고:** 이후 ZIP 230은 철회되었으며 배포되지 않습니다. 거래 버전 6은 이제 [ZIP 229](https://zips.z.cash/zip-0229)에 의해 정의됩니다. [ZIP 230](https://zips.z.cash/zip-0230) 페이지 상단의 공지를 참조하세요.

ZIP 226은 OrchardZSA 프로토콜을 정의합니다 — 커스텀 자산의 전송과 소각을 담는 Orchard 프로토콜의 확장입니다. ZIP 227은 이러한 자산이 애초에 어떻게 생성되는지를 정의하며, 반드시 ZIP 226과 함께만 구현되어야 합니다.

### ZSA 그랜트 제안서

Shielded Assets (ZSA/UDA)를 위한 ZSA 제안은 [QEDIT](https://qed-it.com/) 팀이 Zcash 블록체인에서 범용 쉴드 자산을 구축하기 위해 제시했습니다. 이는 보통 User Defined Assets (UDA) 또는 Zcash Shielded Assets (ZSA)라고 불립니다.

이 제안을 통해 [QEDIT](https://qed-it.com/) 팀은 Zcash 생태계에 DeFi를 도입하고, 동시에 기존 DeFi 생태계 안에서 최고의 프라이버시 기술을 사용할 수 있게 하려 합니다. 설문조사에서 팀이 질문했고, 커뮤니티는 [범용 쉴드 자산(ZSA/UDA)이 현재 가장 많이 요청되는 기능](https://twitter.com/BenarrochDaniel/status/1428327864034791429)이라고 답했습니다.

이 제안들은 기술적으로 [Zcash Improvement Proposal (ZIP)](https://zips.z.cash/zip-0000) 명세를 준수하며, ZIP 226 및 ZIP 227에 정의되어 있습니다.

1. [ZIP 226](https://zips.z.cash/zip-0226): Zcash Shielded Assets의 전송 및 소각
2. [ZIP 227](https://zips.z.cash/zip-0227): Zcash Shielded Assets의 발행

---

## 실질적인 의미

**ZEC를 보유하거나 사용하는 경우**

- ZSA는 Orchard("OrchardZSA")의 확장으로 정의되므로, ZEC가 이미 사용하는 쉴드 메커니즘을 공유하게 됩니다. 지갑이 이를 보유하거나 전송하려면 명시적인 ZSA 지원이 필요합니다.
- 항상 어느 정도의 ZEC를 보유하고 있어야 합니다. ZSA의 발행 및 전송 수수료는 자산 자체가 아니라 ZEC로 지불됩니다.
- 기존의 ZEC 거래에 관해서는 아무것도 바뀌지 않습니다.

**잠재적 발행자인 경우 — 스테이블코인, DAO, 회사**

- 자산 발행에는 발행 키에 연결된 암호학적 승인이 필요하므로, 자신의 자산을 민팅하거나 그 속성을 변경할 수 있는 주체는 오직 본인뿐입니다.
- 자산의 유통 공급량은 공개적으로 감사 가능하지만, 사용자의 잔액과 전송 내역은 그렇지 않습니다. 규제를 받는 발행자에게는 이것이 보통 정확히 필요한 조합입니다.
- 단일 발행 거래로 한 번에 둘 이상의 자산을 만들 수 있습니다.

**생태계 전체에 대해서**

- 모든 ZSA 수수료가 ZEC 단위로 책정되기 때문에, 향후 Zcash에서 발행되는 어떤 자산의 활동이든 ZEC 자체에 대한 수요를 만들어냅니다.

---

## 흔한 오해

| 흔한 믿음 | 실제로는 어떤가 |
| --- | --- |
| "ZSAs는 오늘날 이미 Zcash에서 활성화되어 있다." | 아닙니다. ZSA는 Network Upgrade 7 (NU7)에서 배포될 예정이며, 아직 검토와 테스트가 진행 중입니다. |
| "ZSA는 Zcash에 스마트 컨트랙트를 도입한다." | ZSA는 자산의 발행, 전송, 소각을 명세합니다. 범용 프로그래머블 계약 계층은 아닙니다. |
| "ZSA 수수료는 ZSA 토큰 자체로 낼 수 있다." | 수수료는 ZEC로 지불됩니다. |
| "쉴드된다면 토큰 공급량도 비밀이어야 한다." | ZIP 227은 의도적으로 발행을 투명하게 만들어 각 자산의 공급량을 공개적으로 추적할 수 있게 합니다. 잔액과 전송은 비공개로 유지되지만 공급량은 그렇지 않습니다. |
| "ZIP 230이 현재 버전 6 거래 형식이다." | ZIP 230은 철회되었습니다. 버전 6은 이제 ZIP 229에 의해 정의됩니다. |

---

## 관련 페이지

- [Halo](/zcash-tech/halo) — ZSA가 확장하는 프로토콜인 Orchard의 기반이 되는 증명 시스템
- [Zk-SNARKs](/zcash-tech/zk-snarks) — 내용을 공개하지 않고도 쉴드 전송을 검증할 수 있게 해주는 영지식 증명
- [Shielded Pools](/using-zcash/shielded-pools) — ZSA가 ZEC와 함께 존재하게 될 곳
- [Transactions](/using-zcash/transactions) — Zcash 거래가 어떻게 구성되는지
- [Zebra Full Node](/zcash-tech/zebra-full-node) — 위 ZSA 데모에서 사용된 노드 구현체
