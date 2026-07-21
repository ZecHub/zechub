<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Transactions.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# 거래

ZEC은 지불에 널리 사용되는 디지털 자산으로, 친구에게 돈을 보내거나 구매나 기부와 같은 다양한 거래에 적합한 강력한 프라이버시 기능을 제공합니다. 프라이버시와 보안을 최대화하기 위해서는 Zcash 내에서 다양한 유형의 거래가 어떻게 작동하는지 이해하는 것이 중요합니다.

## 가상자산 보호 거래

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/bZM3o_eIovU"
    title="Zcash Explained: Zcash Shielded Transactions"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

---

보호 거래는 ZEC을 보호된 지갑으로 이동할 때 발생합니다. 보호된 지갑 주소는 U 또는 Z로 시작합니다. 보호 거래를 보내면, 당신과 거래하는 상대방 모두가 다른 P2P 결제 네트워크에서 불가능한 수준의 프라이버시를 유지하고 있음을 보장하게 됩니다. 보호 거래를 보내는 것은 매우 간단합니다. 다만 두 가지 사항에 주의하면 됩니다. 첫째, 올바른 유형의 지갑을 사용하는 것입니다. 올바른 유형의 지갑을 사용했는지 확인하는 가장 쉬운 방법은 [지갑](https://zechub.wiki/wallets)을 다운로드하는 것입니다. 둘째, ZEC을 보호된 지갑으로 이동하는 것이 중요합니다. 거래소에서 ZEC을 인출할 때에는 거래소가 보호 또는 투명한 인출을 지원하는지 알아야 합니다. 보호 인출을 지원한다면 단순히 보호 주소로 ZEC을 인출하면 됩니다. 만약 거래소가 투명 인출만 지원한다면 YWallet을 사용하고 ZEC이 수신되면 자동으로 보호를 적용해야 합니다. 보호된 거래만을 이용하여 자금을 송수신하는 것이 프라이버시를 유지하고 데이터 유출 위험을 줄이는 최선의 방법입니다.

## 투명한 거래

투명한 거래는 비슷하게 작동하지만, 프라이버시 보호 기능이 없어 블록체인 상에서 거래 세부 정보가 공개적으로 나타납니다. 프라이버시가 중요한 경우 투명한 거래를 피하는 것이 좋습니다. 참고로 ZIP-317에 따라 거래 복잡도 비례의 수수료가 요구되며, 기본 수수료는 거래 거부 또는 지연으로 이어질 수 있어 수수료 조정이 필수적입니다.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/R-krX1UpsIg"
    title="Learn 🛡️Zcash shielded wallets!"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

### 투명 거래 수수료 관리

ZIP-317 지침: 수수료 구조는 거래 복잡도에 따라 조정되어 표준 0.00001 ZEC 수수료를 넘어가야 합니다.
예시 계산: 간단한 하나의 노트 거래는 약 0.0001 ZEC 수수료가 필요할 수 있으며, 추가 노트당 약 0.00005 ZEC씩 증가합니다.

지갑에서 수수료 편집

Trust Wallet: 거래를 생성하는 동안 기어 아이콘을 탭하여 고급 설정에 접근하세요. Miner Tip Gwei 및 Max Fee Gwei 필드를 신중하게 조정하여 거래 실패를 피해야 합니다. Trust Wallet은 오직 네트워크 수수료만 부과합니다.
Coinomi 지갑: 네트워크 상태에 따라 Low, Normal, High의 세 가지 동적 수수료 옵션을 제공합니다. 수동 조정이 필요한 경우 지원되는 코인에서 Custom을 선택하거나 오른쪽 상단의 Change Fee를 사용하세요. 사용자는 바이트 또는 킬로바이트당 수수료를 설정할 수 있으며, 이는 확인 시간에 영향을 미칩니다. 확실하지 않다면 동적 옵션을 사용하는 것이 좋습니다.

이 버전은 Trust Wallet과 Coinomi에서 수수료 관리 지침, 동적 수수료 옵션 및 맞춤 설정 사항을 포함하여 사용자가 수수료 제어에 대한 포괄적인 정보를 제공합니다.

#### 자원

[ZIPS](https://zips.z.cash/)

#### 참고

ZEC을 사용하는 가장 안전한 방법은 보호 거래만 사용하는 것입니다. 일부 지갑은 [통합 주소](https://electriccoin.co/blog/unified-addresses-in-zcash-explained/#:~:text=The%20unified%20address%20(UA)%20is,within%20the%20broader%20Zcash%20ecosystem.)를 구현하는 과정에 있습니다. 통합 주소는 사용자와 거래소가 투명하고 보호된 주소를 함께 결합할 수 있도록 합니다.

## ZEC to ZAT 변환기
