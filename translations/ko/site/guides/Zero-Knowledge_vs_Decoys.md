<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zero-Knowledge_vs_Decoys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# 제로 지식 증명 vs 유인자 기반 시스템

"암호화폐는 은행 계좌처럼 트위터에 모든 지출 활동을 노출시켜 공개적으로 보여주기 때문에, 이 문제는 체인 상의 프라이버시를 채택함으로써 해결되어야 한다." - Ian Miers at [Devcon4](https://youtube.com/watch?v=9s3EbSKDA3o&feature=share9).

일부 암호화폐 프로젝트는 프라이버시 중심 접근 방식으로 인해 주목을 받았다. Zcash는 트랜잭션 금액과 주소를 보호하기 위해 제로 지식 증명(ZK)을 사용하여 유명하다. Monero는 블록체인에서 사용자 프라이버시를 달성하기 위해 다른 암호화 기법과 함께 유인자 기반 송신자의 암호화를 활용하여 독보적인 위치를 차지한다.


<a href="">
    <img src="https://user-images.githubusercontent.com/38798812/257773807-af8ae27d-0805-4a60-a5ba-749e2fea2490.png" alt="" width="400" height="300"/>
</a>


## 제로 지식 증명과 유인자 기반 시스템 이해

제로 지식 증명은 한 당사자(증명자)가 다른 당사자(검증자)에게 특정 진술의 유효성을 증명할 수 있는 암호학적 시스템으로, 진술 자체에 대한 *기초 정보를 전혀 노출시키지 않고* 유효성을 증명한다. Zcash의 경우, 제로 지식 증명은 트랜잭션의 유효성을 검증하는 동시에 송신자, 수신자 또는 트랜잭션 금액과 같은 트랜잭션 세부 정보를 노출시키지 않도록 사용된다.

**이러한 방식은 트랜잭션이 기밀 유지되면서도 유효성 검증을 통해 이루어지므로 사용자의 프라이버시가 보장된다. 이 기술은 Zcash 네트워크에서 금융 거래의 기밀성을 확보하도록 설계되었다.**

유인자 기반 시스템인 [RingCT](https://twitter.com/ZecHub/status/1636473585781948416)에서는 여러 트랜잭션이 결합되어 자금의 실제 출처와 목적지를 추적하는 것이 어렵거나 어려워진다. 알고리즘은 또한 사용된 입력 주소를 암호화하고 범위 증명을 통해 전송 금액이 지출 가능한지 검증하도록 트랜잭션에 유인자 입력 및 출력을 도입한다.

이 접근 방식은 트랜잭션 흐름을 암호화하여 숨긴다. 유인자 입력의 사용은 블록체인을 분석하는 누구라도 실제 송신자, 수신자 또는 트랜잭션 금액을 식별하기 어렵게 만든다.

**중요한 참고 사항**: 이 방식으로 체인 상에서 프라이버시를 보존하는 거래는 여전히 모든 사용자의 트랜잭션에 대한 (암호화된) 입력을 명확하게 노출한다. 네트워크 내 다른 사용자 간의 *거래 흐름*과 같은 메타데이터는 여전히 수집될 수 있다. 적대자가 네트워크에서 트랜잭션 생성에 적극적으로 참여한다면, 이는 다른 사용자의 유인자 입력을 효과적으로 익명화 해제하게 된다.


## 제로 지식 증명(ZK)의 유인자 기반 시스템 대비 장점

Zcash와 Monero 모두 프라이버시 중심 암호화폐이지만, 프라이버시를 달성하는 방식은 다르다.

Zcash의 제로 지식 증명(ZK)이 Monero의 유인자 시스템보다 다음과 같은 몇 가지 장점을 가지고 있다:

1) **선택적 공개**: Zcash의 ZK 기능 세트를 사용하면 사용자가 특정 당사자에게 트랜잭션 세부 정보를 공개할 수 있다 [ECC 블로그에서 선택적 공개에 대해 읽기](https://electriccoin.co/blog/viewing-keys-selective-disclosure/). Zcash에서는 암호화된 내용을 통해 특정 전송에서 데이터를 선택적으로 노출시킬 수 있으며, 또한 특정 암호화 주소와 연결된 모든 트랜잭션을 공개하기 위해 뷰잉 키를 제공할 수 있다. 이 기능은 네트워크 전체의 프라이버시를 해치지 않으면서도 규제 준수 및 감사 가능성과 같은 기능을 가능하게 한다.

Monero의 유인자 알고리즘(링 서명)은 프라이버시를 제공하지만, 동일한 방식으로 *선택적* 공개를 제공하지는 않는다.


<a href="">
    <img src="https://user-images.githubusercontent.com/38798812/257793324-2dcc6047-300e-4fa7-a28d-2e6cbbadf1df.png" alt="" width="400" height="80"/>
</a>


2) **선택적 가시성**: Zcash는 사용자가 투명(비프라이버시) 트랜잭션과 암호화(프라이버시) 트랜잭션 사이에서 선택할 수 있다. 이는 Zcash가 사용자에게 금융 정보를 프라이버시 보호(암호화)하거나, 대부분의 다른 블록체인처럼 공개적으로 제공하는 것과 같은 유연성을 제공한다는 것을 의미한다 [Zcash 공식 웹사이트](https://z.cash/learn/what-is-the-difference-between-shielded-and-transparent-zcash/)에 설명되어 있다. 이 선택적 프라이버시는 더 많은 유연성과 비즈니스 및 조직 관련 사용 사례를 가능하게 하며, 일부 트랜잭션은 공개 검토를 위해 덜한 프라이버시가 필요할 수 있고, 다른 트랜잭션은 강화된 프라이버시에 이점을 얻을 수 있다.


3) **익명 집합**: 제로 지식 암호화 풀의 [익명 집합](https://blog.wasabiwallet.io/what-is-the-difference-between-an-anonymity-set-and-an-anonymity-score/)은 *언제든지* 발생한 모든 트랜잭션을 포함한다. 이는 대부분의 다른 체인 상 기술과 비교하여 트랜잭션 비연결성을 달성하는 데 매우 유리하다. 참고로, 이는 동일한 암호화 풀 내부의 트랜잭션에만 적용된다.

유인자의 사용은 익명 집합을 증가시킨다. 그러나 이러한 접근 방식은 네트워크 상의 *실제* 사용자 수에 완전히 의존한다.


4) **신뢰 설정 없음**: Zcash의 Sprout 및 Sapling 설정은 "신뢰 설정 행사"라는 다 당사자 계산을 사용했다. 최근 NU5 업그레이드는 제로 지식 회로 설정의 무결성에 대한 신뢰가 필요하지 않았다 [ECC 블로그에서 NU5 읽기](https://electriccoin.co/blog/nu5-activates-on-mainnet-eliminating-trusted-setup-and-launching-a-new-era-for-zcash/).

5) **데이터 프라이버시**: Zcash의 암호화 풀에서 사용되는 [zk-SNARK 기술](https://wiki.zechub.xyz/zcash-technology)은 사용자에게 크게 강화된 보안을 제공한다. 체인 상 메타데이터 누출 감소는 잠재적 해커나 억압적인 국가 기관과 같은 적대자로부터 사용자를 보호한다.

Monero의 유인자 선택 알고리즘에 결함이 발견된 사례가 여러 번 있었다. 이러한 결함은 [Coindesk](https://coindesk.com/markets/2021/07/27/bug-found-in-decoy-algorithm-for-privacy-coin-monero)에서 보고한 바와 같이 사용자 지출을 노출시킬 수 있는 잠재적 위험을 야기했다.


요약하자면, Zooko가 [Orchid (priv8) AMA 라이브 세션](https://youtube.com/watch?v=XpRzKqEfpP4&feature=share9)에서 설명했듯이 사용자 정보 및 데이터 누출을 줄이거나 완전히 제거하는 것이 가장 중요하다.


<a href="">
    <img src="https://user-images.githubusercontent.com/38798812/257788813-509f1139-7daa-4f95-bbb4-c535641962f6.png" alt="" width="400" height="200"/>
</a>


____

***참고 링크***

https://z.cash/learn/

https://www.getmonero.org/get-started/what-is-monero/

https://youtu.be/9s3EbSKDA3o

https://electriccoin.co/blog/nu5-activates-on-mainnet-eliminating-trusted-setup-and-launching-a-new-era-for-zcash/

https://youtu.be/XpRzKqEfpP4

https://electriccoin.co/blog/zcash-evolution/

https://electriccoin.co/zcash-metrics/
https://electriccoin.co/blog/viewing-keys-selective-disclosure/
