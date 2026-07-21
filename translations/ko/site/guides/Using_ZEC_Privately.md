<a href="https://github.com/zechub/zechub/edit/main/site/guides/Using_ZEC_Privately.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# ZEC을 비공개로 사용하는 방법

#### 보호된(비공개) vs. 투명한

현재로서는 Zcash에 두 가지 주소와 거래 유형이 존재합니다: 보호된(비공개) 및 투명한. 보호된 ZEC과 투명한 ZEC의 차이는 매우 간단합니다. 보호된 ZEC는 당신의 자금과 거래를 비공개로 유지하지만, 투명한 ZEC는 비트코인처럼 완전히 투명하게 작동합니다. 이는 누군가 당신의 주소를 알고 있으면 귀하의 잔액 및 모든 거래 내역을 볼 수 있다는 의미입니다.

사람들이 처음으로 ZEC을 사용하기 시작할 때, 자신이 사용하는 주소 유형을 인식하지 못할 수도 있습니다. 이는 모든 거래소가 보호된 ZEC 및/또는 보호된 ZEC 출금을 지원하지 않기 때문입니다.

예를 들어, Coinbase를 사용하고 ZEC을 구매한 사람이라면 투명한 ZEC을 구매하게 되고, 그 ZEC은 지갑의 투명 주소로만 출금할 수 있습니다. [Zodl](https://zodl.com/)과 같은 지갑은 투명 주소에 보내진 자금을 보호된 상태로 전환하여 이 문제를 해결할 수 있지만, 이를 아는 사람은 많지 않습니다. 많은 사람들은 단순히 자신이 사용하는 거래소나 기본 지갑이 제공하는 방식으로 ZEC을 사용합니다.

#### ZEC이 보호되어 있는지 확인하기

우리는 모두가 자신의 ZEC을 직접 관리하도록 권장합니다. 즉, 거래소에서 지갑으로 ZEC을 이전해야 합니다. 자신이 보호된(비공개) ZEC을 사용하고 있는지 확인하는 가장 좋은 방법은 잔액이 저장된 주소를 살펴보는 것입니다. 주소가 "z" 또는 "u1"로 시작한다면, 귀하의 잔액은 보호되어 있습니다. 주소가 "t"로 시작한다면, 잔액은 투명한 상태입니다.

보호된 ZEC을 얻기 위해 일반적으로 두 가지 경로가 존재합니다.

**보호된 출금을 지원하는 거래소에서:**

  1. 거래소에서 ZEC을 구매
  2. 거래소에서 출금 절차를 시작
  3. 보호된 ZEC 지갑을 열고 수령 주소가 "u1" 또는 "z"로 시작하는지 확인
  4. 거래소에서 출금을 실행

**투명한 출금만 지원하는 거래소에서:**

  1. 거래소에서 ZEC을 구매
  2. 거래소에서 출금 절차를 시작
  3. 자동 보호 기능이 있는 ZEC 지갑을 열고 투명 수령 주소를 사용
  4. 거래소에서 출금을 실행
  5. 10개의 확인 후, 투명 주소에서 보호된 주소로 ZEC을 보호

거래소에서 ZEC을 출금하는 방법에 대한 튜토리얼입니다. 참고로 이는 보호된 출금입니다.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/REUbkLzK7J4"
    title="Buy and withdraw ZEC to a shielded wallet from Gemini"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
    

---
투명 주소에서 보호된 주소로 ZEC을 보호하는 방법에 대한 튜토리얼입니다.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/W2msuzrxr3s"
    title="Shield your ZEC from a transparent to shielded address"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


---
Coinbase에서 ZEC을 구매하고 Zashi로 보내는 방법에 대한 튜토리얼입니다.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/Avweu5V9QRc"
    title="Coinbase + Zashi: Buy Zcash & Shield Instantly"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


#### 거래

ZEC이 보호된 주소를 지원하는 지갑에 저장되어 있는지 확인한 후, 이제 그 ZEC을 사용하여 거래할지 결정할 수 있습니다. ZEC으로의 거래는 매우 간단합니다. 사람의 선호도에 따라 ZEC을 보호된 또는 투명한 주소로 보내면 됩니다. 모든 금전 거래와 마찬가지로, 사람들이 데이터를 유출할 가능성이 작지만 존재합니다. ZEC은 데이터 유출에 대항하는 데 최고이지만, 이는 ZEC을 무심코 사용해야 한다는 의미는 아닙니다. ZEC으로 거래할 때 피해야 할 몇 가지 사항이 있습니다.

- 보호된 주소를 공개하는 것
- 보호된 주소를 t-주소(즉, "믹싱")의 중간 지점으로 사용하는 것
- 많은 수의 보호된에서 투명한 거래를 실행하고 이를 공개하는 것
- 정기적으로 자신이 보호된 ZEC을 어디에 쓰는지 사람들에게 알리는 것

본질적으로, 귀하의 ZEC을 다루는 가장 좋은 방법은 보호된 지갑에서 보관하고, 보호된 주소 간에 거래하며, 공공 장소(예: 카페)에서 ZEC을 사용하는 방식에 대해 신중하게 접근하는 것입니다. 프라이버시를 보장하는 것은 일정한 책임이 따릅니다.

#### 자료

[Zcash 거래](https://zechub.wiki/using-zcash/transactions)
