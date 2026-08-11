<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Transactions.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="페이지 편집"/>
</a>


# 거래

ZEC는 결제에 널리 사용되는 디지털 자산으로, 강력한 프라이버시 기능을 제공하여 친구에게 돈을 보내거나, 물건을 구매하거나, 기부하는 등 다양한 거래에 적합합니다. 프라이버시와 보안을 극대화하려면 Zcash 내에서 서로 다른 유형의 거래가 어떻게 작동하는지 이해하는 것이 중요합니다.

## 요약

- Zcash는 두 종류의 거래를 지원합니다: 세부 정보를 비공개로 유지하는 **shielded** 거래와, 이를 공개적으로 기록하는 **transparent** 거래입니다.
- Shielded 주소는 `u` 또는 `z`로 시작합니다. Transparent 주소는 `t`로 시작하며 Bitcoin 주소와 매우 비슷하게 작동합니다.
- 모든 결제에서 어떤 방식을 쓸지는 당신이 선택합니다. 프라이버시는 다른 누군가가 대신 정하는 설정이 아니라, Zcash가 당신에게 제공하는 선택권입니다.
- 거래소에서 출금할 때 프라이버시를 잃는 경우가 가장 흔합니다. 거래소가 transparent 출금만 지원한다면, 자금이 도착한 뒤 직접 shield 처리하세요.
- 수수료는 [ZIP 317](https://zips.z.cash/zip-0317)을 따르며 거래 크기에 따라 증가합니다. 여전히 예전의 고정 수수료를 보내는 지갑은 거래가 지연될 수 있습니다.

## Shielded 거래

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/bZM3o_eIovU"
    title="Zcash 설명: Zcash Shielded 거래"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

---

Shielded 거래는 ZEC를 shielded 지갑으로 이동할 때 발생합니다. 당신의 shielded 지갑 주소는 U 또는 Z로 시작합니다. Shielded 거래를 보낼 때, 당신과 거래 상대방은 다른 P2P 결제 네트워크에서는 불가능한 수준의 프라이버시를 유지하게 됩니다. Shielded 거래를 보내는 것은 매우 쉽지만, 두 가지를 꼭 확인해야 합니다. 첫 번째는 올바른 유형의 지갑을 사용하고 있는지입니다. 올바른 유형의 지갑을 사용하고 있는지 확인하는 가장 쉬운 방법은 [지갑](https://zechub.wiki/wallets)을 다운로드하는 것입니다. 두 번째로 중요한 것은 ZEC를 shielded 지갑으로 옮기는 것입니다. 거래소에서 ZEC를 출금할 때는 해당 거래소가 shielded 출금과 transparent 출금 중 무엇을 지원하는지 알아야 합니다. 만약 shielded 출금을 지원한다면, ZEC를 당신의 shielded 주소로 바로 출금하면 됩니다. 거래소가 transparent 출금만 지원한다면, 받은 뒤 YWallet를 사용해 ZEC를 자동 shield 처리해야 합니다. 자금을 보내고 받을 때 shielded 거래만 사용하는 것이 프라이버시를 유지하고 데이터 유출 위험을 줄이는 가장 좋은 방법입니다.

## Transparent 거래

Transparent 거래도 비슷하게 작동하지만 프라이버시 보호가 없어 거래 세부 정보가 블록체인에 공개적으로 표시됩니다. 프라이버시가 중요하다면 transparent 거래는 피해야 합니다. 참고: Transparent 지갑은 거래 복잡도에 비례하는 수수료를 요구하는 ZIP-317 때문에 문제를 겪을 수 있습니다. 기본 수수료는 거래 거절이나 지연으로 이어질 수 있으므로, 수수료를 직접 조정하는 것이 매우 중요합니다.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/R-krX1UpsIg"
    title="🛡️Zcash shielded 지갑을 배워보세요!"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

## 쉽게 비유해 보면

Transparent 거래는 엽서와 같습니다. 우체부가 이를 전달하지만, 전달 과정에서 이를 다루는 누구나 내용을 읽을 수 있고, 누가 보냈는지와 누가 받는지도 볼 수 있습니다.

Shielded 거래는 봉인된 편지 봉투와 같습니다. 우편 시스템은 여전히 실제 우표가 붙은 실제 편지가 시스템을 통과했다는 사실을 확인하고, 누구도 그것을 위조하거나 같은 편지를 두 번 보낼 수 없습니다. 하지만 봉투 안의 내용은 발신자와 수신자 사이에만 남습니다.

중요한 점은 Zcash가 결제할 때마다 어느 쪽을 보낼지 당신이 직접 결정할 수 있게 해준다는 것입니다.

## Transparent 거래 수수료 관리

ZIP-317 안내: 수수료 구조는 거래 복잡도에 따라 증가하므로, 표준 0.00001 ZEC 수수료보다 더 높은 조정이 필요합니다.
계산 예시: 단순한 단일 note 거래에는 0.0001 ZEC 수수료가 필요할 수 있으며, note가 하나 추가될 때마다 대략 0.00005 ZEC씩 증가합니다.

지갑에서 수수료 편집하기

Trust Wallet: 거래를 생성하는 동안 톱니바퀴 아이콘을 눌러 고급 설정에 들어갑니다. 거래 실패를 피하기 위해 Miner Tip Gwei와 Max Fee Gwei 필드를 주의해서 조정하세요. Trust Wallet은 네트워크 수수료만 청구합니다.
Coinomi Wallet: 네트워크 상태에 따라 Low, Normal, High의 세 가지 동적 수수료 옵션을 제공합니다. 수동 조정을 하려면 지원되는 코인에서 Custom을 선택하거나, 오른쪽 상단의 Change Fee를 사용하세요. 사용자는 바이트 또는 킬로바이트당 수수료를 설정할 수 있으며, 이는 확인 시간에 영향을 줍니다. 확신이 없다면 동적 옵션을 사용하는 것이 권장됩니다.

## 흔한 실수

- **ZEC를 표시하는 어떤 지갑이든 비공개로 보낼 수 있다고 가정하는 것.** 여러 멀티코인 지갑은 Zcash의 transparent 측면만 지원합니다. 프라이버시 목적으로 사용하기 전에 그 지갑이 어떤 pool을 지원하는지 확인하세요. [지갑](https://zechub.wiki/using-zcash/wallets) 페이지에는 각 옵션별로 이 정보가 나와 있습니다.
- **Transparent 주소로 출금한 뒤 자금을 그대로 두는 것.** 출금 자체가 공개되며, 그 주소에서 이후에 일어나는 모든 이동도 계속 공개됩니다. 자금이 도착하면 shield 처리하세요.
- **프라이버시를 한 번 켜두면 되는 기능처럼 여기는 것.** 각 거래는 별개의 선택입니다. 오늘 shielded로 보냈다고 해서 지난주에 했던 transparent 결제가 되돌려지지는 않습니다.
- **하나의 transparent 주소를 모든 용도로 재사용하는 것.** Transparent 활동은 영구적으로 공개되기 때문에, 하나의 재사용된 주소는 원래 서로 연결될 이유가 없었던 결제들을 점점 서로 연결하게 만듭니다.
- **오래된 기본 수수료로 송금하는 것.** ZIP 317을 채택하지 않은 지갑은 여전히 예전의 고정 수수료를 보낼 수 있으며, 이 경우 거래가 확인되지 않은 채로 머물 수 있습니다.

## 참고

ZEC를 사용하는 가장 안전한 방법은 shielded 거래만 사용하는 것임을 유의하세요. 일부 지갑은 사용자가 transparent 주소와 shielded 주소를 함께 결합할 수 있게 해주는 [unified addresses](https://electriccoin.co/blog/unified-addresses-in-zcash-explained/#:~:text=The%20unified%20address%20(UA)%20is,within%20the%20broader%20Zcash%20ecosystem.)를 구현하는 과정에 있습니다.

## 리소스

[ZIPS](https://zips.z.cash/)

## 관련 페이지

- [지갑](/using-zcash/wallets) — 어떤 지갑이 shielded 송금을 지원하고, 어떤 지갑이 transparent 전용인지
- [Shielded Pools](/using-zcash/shielded-pools) — 당신의 shielded 자금이 존재하는 pool인 Sapling과 Orchard
- [메모](/using-zcash/memos) — shielded 거래와 함께 전송될 수 있는 암호화된 메시지
- [Transparent 거래소 주소](/using-zcash/transparent-exchange-addresses) — TEX 주소와 거래소가 이를 사용하는 이유
- [수탁형 거래소](/using-zcash/custodial-exchanges) — 어떤 거래소가 shielded 출금을 지원하는지

## ZEC to ZAT 변환기
