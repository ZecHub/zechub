<a href="https://github.com/zechub/zechub/edit/main/site/guides/Using_ZEC_Privately.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="페이지 편집"/>
</a>

# ZEC를 프라이버시를 지키며 사용하기

#### 거래정보 보호(비공개)와 투명

현재 Zcash에는 거래정보 보호 방식과 투명 방식의 주소와 거래 유형이 각각 2가지 있습니다. 거래정보 보호 방식과 투명 방식의 ZEC의 차이는 매우 간단합니다. 거래정보 보호 방식의 ZEC은(는) 잔액과 거래 정보를 비공개로 유지하지만, 투명 방식의 ZEC은(는) Bitcoin처럼 완전히 투명하게 작동합니다. 따라서 누군가 주소를 알고 있다면 잔액과 모든 거래 정보를 볼 수 있습니다.

처음 ZEC를 사용하는 사람들은 자신이 어떤 유형의 주소를 사용하고 있는지 모를 수 있습니다. 모든 거래소가 거래정보 보호 ZEC 및/또는 거래정보 보호 ZEC 출금을 지원하는 것은 아니기 때문입니다.

예를 들어 누군가 Coinbase를 사용해 ZEC를 구매하면 투명 ZEC를 구매하게 되며, 지갑의 투명 주소로만 해당 ZEC를 출금할 수 있습니다. [Zodl](https://zodl.com/) 같은 지갑은 투명 주소로 전송된 자금을 거래정보 보호 상태로 바꿔 이 문제를 해결할 수 있지만, 모든 사람이 이를 알고 있는 것은 아닙니다. 간단히 말해 많은 사람들은 거래소나 기본 지갑에서 허용하는 방식대로 ZEC를 사용합니다.

#### ZEC가 거래정보 보호 상태인지 확인하기

모든 분께 ZEC를 직접 보관하시기를 권장합니다. 즉, 거래소에서 지갑으로 ZEC를 옮기십시오. 거래정보 보호, 즉 비공개 ZEC를 사용 중인지 확인하는 가장 좋은 방법은 잔액이 보관된 주소를 살펴보는 것입니다. 주소가 “z” 또는 “u1”로 시작하면 잔액은 거래정보 보호 상태입니다. 주소가 “t”로 시작하면 잔액은 투명 상태입니다.

일반적으로 거래정보 보호 ZEC를 이용하는 방법은 2가지입니다.

**거래정보 보호** 출금을 지원하는 거래소에서 출금하는 경우:

  1. 거래소에서 ZEC를 구매합니다.
  2. 거래소에서 출금 절차를 시작합니다.
  3. 거래정보 보호 ZEC 지갑을 열고 수신 주소가 “u1” 또는 “z”로 시작하는지 확인합니다.
  4. 거래소에서 출금을 진행합니다.

**투명** 출금을 지원하는 거래소에서 출금하는 경우:


  1. 거래소에서 ZEC를 구매합니다.
  2. 거래소에서 출금 절차를 시작합니다.
  3. 자동으로 거래정보 보호 상태로 전환되는 ZEC 지갑을 열고 투명 수신 주소를 사용합니다.
  4. 거래소에서 출금을 진행합니다.
  5. 확인을 10회 기다린 다음, 투명 주소에서 거래정보 보호 주소로 ZEC를 옮겨 거래정보 보호 상태로 전환합니다.


거래소에서 ZEC를 출금하는 방법을 안내하는 튜토리얼입니다. 거래정보 보호 출금 방식임을 참고하십시오.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/REUbkLzK7J4"
    title="거래정보 보호 지갑으로 ZEC를 구매하고 Gemini에서 출금하기"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
    

---
투명 주소에서 거래정보 보호 주소로 ZEC를 옮겨 거래정보 보호 상태로 전환하는 방법을 안내하는 튜토리얼입니다.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/W2msuzrxr3s"
    title="투명 주소에서 거래정보 보호 주소로 ZEC를 옮기기"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


---
Coinbase에서 ZEC를 구매해 Zodl로 보내는 방법을 안내하는 튜토리얼입니다.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/Avweu5V9QRc"
    title="Coinbase + Zashi: Zcash를 구매하고 즉시 거래정보 보호 상태로 전환하기"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


#### 거래

ZEC가 거래정보 보호 주소를 지원하는 거래정보 보호 지갑에 있는지 확인한 후에는 해당 ZEC로 거래할지 결정할 수 있습니다. ZEC를 이용한 거래는 매우 간단합니다. 상대방의 선호에 따라 거래정보 보호 주소나 투명 주소로 ZEC를 보낼 수 있습니다. 다른 모든 금전 거래와 마찬가지로 정보가 유출될 가능성은 낮지만 존재합니다. ZEC는 정보 유출을 막는 데 가장 효과적이지만, 그렇다고 아무런 주의 없이 사용해도 된다는 뜻은 아닙니다. ZEC로 거래할 때 피해야 할 사항은 다음과 같습니다.

- 거래정보 보호 주소를 공개하는 행위
- 투명 주소 간 중계 용도로 거래정보 보호 주소를 사용하는 행위(즉, “믹싱”)
- 거래정보 보호 주소에서 투명 주소로 대량의 거래를 실행하고, 이를 공개하는 행위
- 거래정보 보호 ZEC를 어디에 쓰는지 사람들에게 자주 알리는 행위


기본적으로 ZEC를 거래정보 보호 지갑에 보관하고, 거래정보 보호 주소끼리 거래하며, 공공장소(예: 커피숍)에서 ZEC를 사용할 때 주의하는 것이 가장 좋습니다. 프라이버시를 보장하려면 어느 정도 책임감을 갖고 사용해야 합니다.

#### 자료

[Zcash 거래](https://zechub.wiki/using-zcash/transactions)
