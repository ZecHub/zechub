<a href="https://github.com/zechub/zechub/edit/main/site/Start_Here/Who_Can_See_Your_Zcash_Payment.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="페이지 편집"/>
</a>

# 누가 내 Zcash 결제를 볼 수 있나요?

## 핵심 요약

- Zcash은 **2가지 주소 유형**을 제공합니다. 투명 주소(`t`)와 거래정보 보호 주소(`z` 또는 `u`)입니다.
- 대중에게 공개되는 정보의 양은 결제가 어떤 유형의 주소 사이에서 이동하는지에 따라 달라집니다.
- **거래정보 보호 주소에서 거래정보 보호 주소로** 이루어지는 결제만 발신자, 수신자, 금액을 숨깁니다.
- 거래정보 보호 주소는 키 하나로 이루어지지 않습니다. 작은 키 모음으로 이루어져 있으며, **자금을 사용할 권한을 넘기지 않고 읽기 전용 접근 권한을 제공할 수 있습니다.**
- viewing key는 **한번 공유하면 취소할 수 없습니다.**

---

## 먼저 알아야 할 한 가지

대부분의 블록체인에서는 선택의 여지가 없습니다. 보내는 모든 정보는 영원히 공개되어 누구나 볼 수 있습니다.

Zcash에서는 대신 선택할 수 있습니다. 이 선택은 두 번 이루어집니다. **한 번은 보낼 주소를 고를 때, 또 한 번은 내 거래 내역을 읽을 키를 누구에게 제공할지 정할 때입니다.**

아래 그림은 두 가지를 모두 설명합니다.

![Zcash key types and what a block explorer can see for each of the four transaction paths](/content-images/who-can-see-your-zcash-payment-04d41ac960.webp)

---

## 첫 번째 선택: 주소 유형

모든 Zcash 결제는 두 주소 사이에서 이루어지며, 각 주소는 투명 주소이거나 거래정보 보호 주소일 수 있습니다. 따라서 4가지 경로가 있으며, 경로마다 유출되는 정보의 양이 다릅니다.

원리는 보기보다 간단합니다. **투명 주소에 닿는 정보는 모두 공개됩니다.** 거래정보 보호 구역 안에서만 이루어지는 결제는 수수료 외에는 아무것도 드러내지 않습니다.

거래소에서 출금할 때 특히 중요합니다. 많은 거래소가 투명 주소로만 출금하므로 출금 내역은 공개됩니다. 자금이 도착하면 사용하기 전에 직접 거래정보를 보호하세요.

블록 탐색기에서 정확히 어떤 정보를 읽을 수 있는지 자세히 알아보려면 [블록 탐색기에서 볼 수 있는 정보](/zcash-tech/what-a-block-explorer-can-see)를 참조하세요.

---

## 두 번째 선택: 키를 받을 사람

절대로 해제할 수 없는 프라이버시는 쓸모가 없습니다. 때로는 회계사, 감사인 또는 세무 당국에 무언가를 증명해야 합니다. Zcash를 사용하면 통제권을 포기하지 않고도 이를 처리할 수 있습니다.

**spending key.** 모든 정보를 볼 수 있고 자금을 옮길 수 있습니다. 이 키는 자금 그 자체와 같습니다. 본인이 보관하고 어떤 이유로든 누구와도 공유하지 마세요.

**Full Viewing Key.** 읽기 전용입니다. 들어오고 나가는 거래 내역과 잔액을 보여주지만, 단 1 zatoshi도 사용할 수 없습니다. 감사인이나 회계사에게 제공하는 키입니다.

**Incoming Viewing Key.** 범위가 더 좁습니다. 들어오는 결제만 보여줍니다. 거래소나 판매자는 이 키를 사용해 입금이 도착했는지 확인할 수 있으며, spending key는 인터넷에 연결되지 않는 하드웨어에 보관할 수 있습니다.

키의 범위가 중요합니다. 가지고 있는 키 중 가장 넓은 키를 주지 말고, 필요한 작업을 수행할 수 있는 가장 제한적인 키를 제공하세요.

---

## 초보자가 놓치기 쉬운 점

**viewing key는 취소할 수 없습니다.** “공유 취소” 버튼은 없습니다. 누군가 키를 받으면 해당 주소가 존재하는 동안 계속 주소 내역을 읽을 수 있습니다. 접근을 차단해야 한다면 자금을 새 주소로 옮겨야 합니다.

**완전히 거래정보가 보호되는 결제에서도 수수료는 공개됩니다.** 금액은 숨겨지지만 수수료는 숨겨지지 않습니다.

**공개된 정보는 영구적으로 남습니다.** 오늘 체인에 표시된 정보는 20년 후에도 그대로 표시됩니다. 결제를 보낸 *후에* 거래정보를 보호하기로 결정해도 소용이 없습니다.

---

## 직접 실행해 보기

- 기본적으로 거래정보를 보호하는 지갑을 사용하세요. [ZODL](https://zodl.com) 또는 [Zingo!](https://www.zingolabs.org/) 등이 있습니다.
- 거래소에서 자금이 도착하면 사용하기 전에 바로 거래정보를 보호하세요.
- 수신자가 지원하는 경우에는 거래정보 보호 주소로 결제하세요.
- viewing key를 공유하기 전에, 요청받은 내용을 확인하기 위해 필요한 최소 범위의 키가 무엇인지 확인하세요.

---

## 자료

- [viewing key 설명(Electric Coin Company)](https://electriccoin.co/blog/explaining-viewing-keys/)
- [선택적 공개와 viewing key(Electric Coin Company)](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ZIP 310: viewing key](https://zips.z.cash/zip-0310)
- [Zcash 기술의 작동 방식](https://z.cash/technology/)

## 관련 페이지

- [Zcash 기본](/start-here/what-is-zec-and-zcash)
- [Zcash 신규 사용자 안내](/start-here/new-user-guide)
- [블록 탐색기에서 볼 수 있는 정보](/zcash-tech/what-a-block-explorer-can-see)
- [viewing key](/zcash-tech/viewing-keys)
- [거래](/using-zcash/transactions)

---

*이 위키 페이지에 수정 사항을 추가하거나 제안하려면 [ZecHub GitHub 저장소](https://github.com/ZecHub/zechub)로 이동해 pull request를 제출하세요.*
