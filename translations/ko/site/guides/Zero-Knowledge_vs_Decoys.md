<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zero-Knowledge_vs_Decoys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="페이지 편집"/>
</a>

# 영지식 시스템과 디코이 기반 시스템 비교

“암호화폐는 은행 계좌의 Twitter와 같기 때문에 모든 지출 활동을 대중에게 공개합니다. 이는 온체인 프라이버시를 도입하여 반드시 해결해야 할 큰 문제입니다.” - [Devcon4](https://youtube.com/watch?v=9s3EbSKDA3o&feature=share9)에서 Ian Miers.

일부 암호화폐 프로젝트는 프라이버시 중심 접근 방식으로 주목을 받았습니다. Zcash는 거래 금액과 주소를 보호하기 위해 영지식 증명(ZK)을 사용하는 것으로 잘 알려져 있습니다. Monero는 블록체인에서 사용자의 프라이버시를 실현하기 위해 다른 암호화 방식과 함께 디코이 기반 송신자 난독화를 활용하는 점이 두드러집니다.


<a href="">
    <img src="/content-images/257773807-af8ae27d-0805-4a60-a5ba-749e2f-cafd67320f.webp" alt="" width="400" height="300"/>
</a>


## 영지식 증명과 디코이 기반 시스템 이해하기

영지식 증명은 한 당사자(증명자)가 어떤 진술에 관한 *기초 정보를 전혀 공개하지 않고도* 다른 당사자(검증자)에게 그 진술이 타당함을 입증할 수 있게 하는 암호화 시스템입니다. Zcash에서 영지식 증명은 송신자, 수신자 또는 거래 금액과 같은 거래 세부 정보를 공개하지 않고 거래의 유효성을 검증하는 데 사용됩니다.

**이를 통해 거래가 검증되는 동안에도 기밀이 유지되어 사용자의 프라이버시를 보호합니다. 이 기술은 Zcash 네트워크에서 금융 거래의 기밀성을 보장하도록 설계되었습니다.**

[RingCT](https://twitter.com/ZecHub/status/1636473585781948416)와 같은 디코이 기반 시스템에서는 여러 거래를 결합해 자금의 실제 출처와 목적지를 추적하기 어렵게 만듭니다. 이 알고리즘은 거래에 디코이 입력과 출력을 추가하고, 입력으로 사용되는 주소를 암호화하며, 전송된 금액을 사용할 수 있는지 검증하기 위해 범위 증명을 사용합니다.

이 방식은 거래 경로를 난독화합니다. 디코이 입력을 사용하면 블록체인을 분석하는 누구든 실제 송신자, 수신자 또는 거래 금액을 식별하기 어려워집니다.

**중요 참고 사항**: 이 온체인 프라이버시 보호 거래 방식은 모든 사용자의 거래 입력을 암호화된 상태로 명시적으로 공개합니다. 네트워크에서 서로 다른 사용자 간의 *거래 흐름*과 같은 메타데이터는 여전히 수집될 수 있습니다. 적대자가 네트워크에서 거래 생성에 적극 참여하면 다른 사용자의 디코이 입력을 사실상 익명화할 수 있습니다.


## 디코이 기반 시스템보다 영지식 시스템이 갖는 장점

Zcash와 Monero는 모두 프라이버시 중심 암호화폐이지만, 서로 다른 방식으로 프라이버시를 구현합니다.

다음은 Zcash의 영지식 증명(ZK)이 Monero의 디코이 시스템보다 유리한 점입니다.

1) **선택적 공개**: Zcash의 ZK 기능을 사용하면 거래 세부 정보를 특정 당사자에게 공개할 수 있습니다. [ECC의 선택적 공개 관련 블로그](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)를 읽어 보세요. Zcash에서는 거래정보 보호 거래의 암호화된 내용을 통해 특정 송금의 데이터를 선택적으로 공개할 수 있습니다. 또한 특정 거래정보 보호 주소와 연결된 모든 거래를 공개하기 위해 viewing key를 제공할 수 있습니다. 이 기능을 사용하면 네트워크의 전반적인 프라이버시를 훼손하지 않으면서 규제 준수와 감사를 지원할 수 있습니다.

Monero의 디코이 알고리즘(링 서명)은 프라이버시 보호에 도움이 되지만, 같은 방식의 *선택적* 공개 기능은 제공하지 않습니다.


<a href="">
    <img src="/content-images/257793324-2dcc6047-300e-4fa7-a28d-2e6cbb-7242c98ea4.webp" alt="" width="400" height="80"/>
</a>


2) **선택적 가시성**: Zcash에서는 투명(비공개가 아닌) 거래와 거래정보 보호(비공개) 거래 중 하나를 선택할 수 있습니다. 즉, Zcash에서는 금융 정보를 비공개(거래정보 보호)로 유지하거나 투명하게 공개해 다른 대부분의 블록체인과 비슷하게 누구나 볼 수 있도록 할 수 있습니다. 자세한 내용은 [Zcash 공식 웹사이트](https://z.cash/learn/what-is-the-difference-between-shielded-and-transparent-zcash/)에서 확인할 수 있습니다. 이러한 선택형 프라이버시는 더 큰 유연성을 제공하며, 기업과 조직에 적합한 사용 사례를 지원합니다. 공개 검토를 위해 프라이버시가 덜 필요한 거래도 있고, 강화된 프라이버시가 유용한 거래도 있기 때문입니다.


3) **익명성 집합**: 영지식 거래정보 보호 구역의 [익명성 집합](https://docs.wasabiwallet.io/FAQ/FAQ-UseWasabi.html#what-is-the-difference-between-anonymity-set-and-anonymity-score)에는 *지금까지* 이루어진 모든 거래가 포함됩니다. 이는 거래 간 연결 불가능성을 달성하기 위한 대부분의 다른 온체인 기술보다 훨씬 큰 규모입니다. 참고: 이는 동일한 거래정보 보호 구역 내의 거래에만 적용됩니다.

디코이를 사용하면 익명성 집합이 커지기는 합니다. 그러나 이 방식은 네트워크의 *실제* 사용자 수에 전적으로 좌우됩니다.

4) **트러스트 셋업 불필요**: Zcash의 Sprout 및 Sapling 셋업에는 “트러스트 셋업 의식”으로 알려진 다자간 연산이 사용되었습니다. 최근 NU5 업그레이드에서는 영지식 회로의 셋업 무결성을 신뢰할 필요가 없었습니다. [ECC의 NU5 관련 블로그](https://electriccoin.co/blog/nu5-activates-on-mainnet-eliminating-trusted-setup-and-launching-a-new-era-for-zcash/)를 읽어 보세요.

5) **데이터 프라이버시**: [zk-SNARK 기술](https://zechub.wiki/zcash-tech/zk-snarks)은 Zcash의 거래정보 보호 구역에서 사용되어 사용자의 보안을 크게 강화합니다. 온체인 메타데이터 유출이 줄어들면 잠재적 해커나 억압적인 국가 기관과 같은 적대자로부터 사용자를 보호할 수 있습니다.

Monero의 디코이 선택 알고리즘에서 버그가 확인된 사례가 여러 차례 있었습니다. [CoinDesk](https://coindesk.com/markets/2021/07/27/bug-found-in-decoy-algorithm-for-privacy-coin-monero)의 보고서에 따르면 이러한 버그로 인해 사용자의 지출 내역이 드러날 가능성이 있었습니다.

요약하면, 가장 중요한 것은 사용자의 정보와 데이터 유출을 줄이거나 없애는 일입니다. [Orchid (priv8) AMA 라이브 세션](https://youtube.com/watch?v=XpRzKqEfpP4&feature=share9)에서 Zooko가 설명한 내용입니다.


<a href="">
    <img src="/content-images/257788813-509f1139-7daa-4f95-bbb4-c53564-f815d11477.webp" alt="" width="400" height="200"/>
</a>


____

***참고 링크***

https://z.cash/learn/

https://www.getmonero.org/get-started/what-is-monero/

https://youtu.be/9s3EbSKDA3o

https://electriccoin.co/blog/nu5-activates-on-mainnet-eliminating-trusted-setup-and-launching-a-new-era-for-zcash/

https://youtu.be/XpRzKqEfpP4

https://electriccoin.co/blog/zcash-evolution/

https://web.archive.org/web/20240327000137/https://electriccoin.co/zcash-metrics/
https://electriccoin.co/blog/viewing-keys-selective-disclosure/
