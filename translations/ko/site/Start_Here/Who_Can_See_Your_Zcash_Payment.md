<a href="https://github.com/zechub/zechub/edit/main/site/Start_Here/Who_Can_See_Your_Zcash_Payment.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="페이지 편집"/>
</a>

# 누가 당신의 Zcash 결제를 볼 수 있나요?

## 요약

- Zcash에는 **두 종류의 주소**가 있습니다: 투명 주소(`t`)와 실드 주소(`z` 또는 `u`).
- 대중이 얼마나 많이 볼 수 있는지는 결제가 어떤 종류의 주소 사이에서 이동하는지에 따라 달라집니다.
- **실드 주소에서 실드 주소로** 가는 결제만 발신자, 수신자, 금액을 모두 숨깁니다.
- 실드 주소는 하나의 키가 아닙니다. 작은 키 집합으로 이루어져 있으며, **지출 권한을 넘기지 않고 읽기 전용 접근 권한**을 줄 수 있습니다.
- Viewing Key는 한 번 공유하면 **되돌릴 수 없습니다**.

---

## 먼저 이해해야 할 한 가지

대부분의 블록체인에서는 선택할 것이 없습니다. 당신이 보내는 모든 것은 누가 보든 영원히 공개됩니다.

하지만 Zcash는 선택권을 줍니다. 이 선택은 두 번 이루어집니다: **한 번은 어느 주소로 보낼지 고를 때, 또 한 번은 누가 당신의 기록을 읽을 수 있는 키를 받을지 결정할 때입니다.**

아래 그림은 이 두 가지를 모두 보여줍니다.

![Zcash key types and what a block explorer can see for each of the four transaction paths](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Start_Here/assets/who-can-see-your-zcash-payment.png)

---

## 첫 번째 선택: 어떤 주소인가

모든 Zcash 결제는 두 주소 사이에서 이동하며, 각 주소는 투명 주소이거나 실드 주소일 수 있습니다. 그래서 네 가지 경로가 생기고, 각각 서로 다른 정도의 정보가 드러납니다.

패턴은 보기보다 단순합니다: **투명 주소에 닿는 것은 무엇이든 공개됩니다.** 결제가 처음부터 끝까지 실드 풀 안에만 머무르면 수수료 외에는 아무것도 드러나지 않습니다.

이 점은 거래소에서 출금할 때 특히 중요합니다. 많은 거래소는 투명 주소로만 보낼 수 있기 때문에 출금 내역이 공개됩니다. 자금이 도착하면 사용하기 전에 먼저 직접 실드 처리하세요.

익스플로러가 정확히 무엇을 읽는지 더 자세히 보려면 [블록 익스플로러에서 볼 수 있는 것](/zcash-tech/what-a-block-explorer-can-see)을 참고하세요.

---

## 두 번째 선택: 누가 키를 받는가

절대 해제할 수 없는 프라이버시는 실용적이지 않습니다. 때로는 회계사, 감사인, 세무 당국에 무언가를 증명해야 할 수도 있습니다. Zcash는 통제권을 포기하지 않고도 이를 처리할 수 있게 해줍니다.

**Spending key.** 모든 것을 볼 수 있고 자금도 이동시킬 수 있습니다. 이것이 곧 돈입니다. 이 키는 당신만 보관하며, 어떤 이유로도 누구와도 공유하지 않습니다.

**Full viewing key.** 읽기 전용입니다. 입금과 출금 활동, 잔액을 보여주지만 단 한 개의 zatoshi도 쓸 수 없습니다. 감사인이나 회계사에게 전달하는 것은 이것입니다.

**Incoming viewing key.** 이보다 더 제한적이며, 들어오는 결제만 보여줍니다. 거래소나 상점은 이것으로 당신의 입금이 도착했는지 확인할 수 있고, Spending key는 인터넷에 절대 연결되지 않는 하드웨어에 그대로 보관할 수 있습니다.

순서가 중요합니다. 가지고 있는 키 중 가장 넓은 권한의 키가 아니라, 필요한 일을 해낼 수 있는 가장 좁은 키를 주세요.

---

## 초보자가 놓치는 부분

**Viewing Key는 취소할 수 없습니다.** "공유 취소" 버튼은 없습니다. 누군가가 그것을 갖게 되면 그 주소가 존재하는 한 계속 읽을 수 있습니다. 접근을 끊어야 한다면 자금을 새 주소로 옮겨야 합니다.

**완전히 실드된 결제에서도 수수료는 공개됩니다.** 금액은 숨겨지지만 수수료는 숨겨지지 않습니다.

**공개된 정보는 영구적입니다.** 체인이 오늘 보여주는 것은 20년 뒤에도 그대로 보입니다. 결제를 보낸 *뒤에* 실드 처리하기로 결정하는 것은 할 수 있는 일이 아닙니다.

---

## 실제로 적용하기

- [Zodl](https://zodl.com)이나 [Ywallet](https://ywallet.app/)처럼 기본적으로 실드 처리를 지원하는 지갑을 사용하세요.
- 거래소에서 자금이 도착하면 사용하기 전에 즉시 실드 처리하세요.
- 수신자가 지원한다면 가능한 한 실드 주소로 결제하세요.
- Viewing Key를 공유하기 전에, 지금 묻고 있는 질문에 답하기 위해 필요한 가장 작은 키가 무엇인지 먼저 물어보세요.

---

## 자료

- [Viewing Key 설명 (Electric Coin Company)](https://electriccoin.co/blog/explaining-viewing-keys/)
- [선택적 공개와 Viewing Key (Electric Coin Company)](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ZIP 310: Viewing Key](https://zips.z.cash/zip-0310)
- [Zcash 기술의 작동 방식](https://z.cash/technology/)

## 관련 페이지

- [Zcash 기초](/start-here/what-is-zec-and-zcash)
- [Zcash 신규 사용자 가이드](/start-here/new-user-guide)
- [블록 익스플로러에서 볼 수 있는 것](/zcash-tech/what-a-block-explorer-can-see)
- [Viewing Key](/zcash-tech/viewing-keys)
- [트랜잭션](/using-zcash/transactions)

---

*이 위키 페이지에 내용을 추가하거나 수정 제안을 하고 싶다면 [ZecHub GitHub 저장소](https://github.com/ZecHub/zechub)로 가서 pull request를 제출해 주세요.*
