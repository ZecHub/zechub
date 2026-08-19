<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/What_a_Block_Explorer_Can_See.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# 블록 탐색기가 Zcash에서 볼 수 있는 것

## 요약

- Bitcoin에서는 블록 탐색기가 모든 것을 보여줍니다: 송신자, 수신자, 그리고 금액.
- Zcash에서는 이는 투명(transparent, t-address) 활동에만 해당됩니다.
- 탐색기는 자금이 실드 풀로 들어오고 나가는 것은 볼 수 있지만, 그 안에서 무슨 일이 일어나는지는 볼 수 없습니다.
- 완전 실드(z에서 z로) 거래는 송신자도, 수신자도, 금액도 드러나지 않습니다.
- 공개된 어떤 "shield rate" 수치도 최저치일 뿐입니다. 완전히 비공개인 활동은 외부에서 보이지 않기 때문입니다.

---

## 두 가지 주소 유형

Zcash에는 두 종류의 주소가 있습니다.

**투명 주소**는 `t`로 시작하며 Bitcoin 주소처럼 작동합니다. 잔액과 결제 내역이 공개됩니다.

**실드 주소**는 `z`로 시작하며 영지식 증명으로 보호됩니다. 네트워크는 송신자, 수신자, 금액을 공개하지 않고도 실드 결제가 유효하다는 것을 확인할 수 있습니다.

주소 유형이 두 가지이기 때문에, 가치는 네 가지 방식으로 이동할 수 있습니다: 투명에서 투명으로(t에서 t로), 투명에서 실드로(t에서 z로, shielding이라고 함), 실드에서 투명으로(z에서 t로, deshielding이라고 함), 그리고 실드에서 실드로(z에서 z로, 완전 비공개).

## 탐색기가 볼 수 있는 것

[Blockchair](https://blockchair.com/zcash) 같은 공개 탐색기는 다음을 명확하게 읽을 수 있습니다:

- 완전히 투명한(t에서 t로) 모든 결제를 처음부터 끝까지.
- 자금이 실드 풀로 들어가는 것(투명한 쪽과 금액).
- 자금이 실드 풀에서 나오는 것(투명한 쪽과 금액).
- 각 실드 풀이 보유한 총 ZEC. 이는 네트워크가 아무것도 없는 상태에서 코인이 생성되지 않았음을 증명할 수 있도록 공개됩니다.

즉, 실드 풀의 경계는 보입니다. 가치가 안팎으로 이동하는 것은 지켜볼 수 있습니다.

## 탐색기가 볼 수 없는 것

공개 탐색기는 다음을 읽을 수 없습니다:

- 완전 실드(z에서 z로) 거래. 송신자, 수신자, 금액은 숨겨진 상태로 유지됩니다.
- 어떤 실드 결제 뒤에 있는 송신자나 수신자.
- 개별 실드 주소의 잔액.
- 자금이 풀 안에 들어간 뒤에 무슨 일이 일어나는지.

원시 데이터를 조회해도 실드된 송신자 및 수신자 필드는 비어 있는 채로 돌아옵니다. 탐색기가 일부러 이것을 숨기는 것이 아닙니다. 이 정보는 애초에 읽을 수 있는 형태로 공개 체인에 올라간 적이 없습니다. 정보는 암호화되어 있으며, 올바른 Viewing Key를 가진 사람만 읽을 수 있습니다.

## 왜 중요한가

**여러분의 프라이버시는 어떤 회사를 신뢰해서가 아니라 암호학에서 나옵니다.** 데이터 제공자는 원한다고 해도 실드 거래 내부를 들여다볼 수 없습니다.

**공개된 shield-rate 수치는 프라이버시를 과소집계합니다.** 연구자들은 공개 경계를 넘는 것만 측정할 수 있으므로, 실제 비공개 활동량은 그들이 보고하는 수치보다 적어도 같거나, 보통은 더 많습니다.

**더 큰 실드 풀은 모두를 보호합니다.** 더 많은 사람이 실드 주소를 사용할수록, 개별 비공개 결제가 숨을 수 있는 집단도 더 커집니다. 실드 주소를 사용하는 것은 자신뿐 아니라 풀 안의 다른 모든 사람을 보호하는 데도 도움이 됩니다.

## 실제로 활용하기

- 기본적으로 실드 주소를 사용하는 지갑을 사용하세요. 예: [Zodl](https://zodl.com) 또는 [Ywallet](https://ywallet.app/).
- 투명 주소로 ZEC를 받았다면, 사용하기 전에 실드 주소로 옮기세요.
- 가능한 경우 실드 주소로 결제하세요. 모든 투명 결제는 완전히 공개되지만, 실드 결제는 그렇지 않습니다.

## 자료

- [Zcash: 프라이버시 및 보안 권장 사항](https://z.cash/support/security/privacy-security-recommendations/)
- [실드 생태계 (Electric Coin Company)](https://electriccoin.co/blog/shielded-ecosystem/)
- [Zcash 기술의 작동 방식](https://z.cash/technology/)
- [Blockchair Zcash 탐색기](https://blockchair.com/zcash)

## 관련 페이지

- [Zcash 기초](/start-here/what-is-zec-and-zcash)
- [지갑](/using-zcash/wallets)
- [실드 풀](/using-zcash/shielded-pools)
- [ZK-SNARKs](/zcash-tech/zk-snarks)

---

*이 위키 페이지에 내용을 추가하거나 수정을 제안하고 싶다면, [ZecHub GitHub repo](https://github.com/ZecHub/zechub)로 가서 pull request를 제출해 주세요.*
